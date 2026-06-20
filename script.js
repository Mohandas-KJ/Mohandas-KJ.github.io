const roles = [
  "Cybersecurity Enthusiast",
  "Linux Explorer",
  "Networking Learner",
  "Python Developer",
  "Formula 1 Data Analyst"
];

const typingText = document.querySelector("#typing-text");
const loader = document.querySelector("#loader");
const year = document.querySelector("#year");
const navToggle = document.querySelector("#nav-toggle");
const siteNav = document.querySelector("#site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.body.classList.add("no-scroll");

function releaseLoader() {
  window.setTimeout(() => {
    loader.classList.add("is-hidden");
    document.body.classList.remove("no-scroll");
  }, 720);
}

if (document.readyState === "complete") {
  releaseLoader();
} else {
  window.addEventListener("load", releaseLoader, { once: true });
}

window.setTimeout(() => {
  if (!loader.classList.contains("is-hidden")) {
    loader.classList.add("is-hidden");
    document.body.classList.remove("no-scroll");
  }
}, 1800);

year.textContent = new Date().getFullYear();

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];
  const speed = isDeleting ? 42 : 72;
  typingText.textContent = currentRole.slice(0, charIndex);

  if (!isDeleting && charIndex < currentRole.length) {
    charIndex += 1;
  } else if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    window.setTimeout(typeRole, 1350);
    return;
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
  } else {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  window.setTimeout(typeRole, speed);
}

typeRole();

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16,
  rootMargin: "0px 0px -60px 0px"
});

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll("section[id]")];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, {
  threshold: 0.35
});

sections.forEach((section) => sectionObserver.observe(section));

document.querySelectorAll(".skill-card, .project-card, .solution-card, .github-cta, .contact-panel").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--glow-x", `${x}%`);
    card.style.setProperty("--glow-y", `${y}%`);
  });
});

if (motionAllowed && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let cursorX = window.innerWidth / 2;
  let cursorY = window.innerHeight / 2;
  let ringX = cursorX;
  let ringY = cursorY;

  window.addEventListener("pointermove", (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
  });

  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("pointerenter", () => cursorRing.classList.add("is-link"));
    element.addEventListener("pointerleave", () => cursorRing.classList.remove("is-link"));
  });

  function animateCursor() {
    ringX += (cursorX - ringX) * 0.2;
    ringY += (cursorY - ringY) * 0.2;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    window.requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

function sizeCanvas(canvas, context) {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function createParticles() {
  const canvas = document.querySelector("#particle-canvas");
  const context = canvas.getContext("2d");
  let particles = [];

  function resetParticles() {
    sizeCanvas(canvas, context);
    const count = Math.min(96, Math.max(42, Math.floor(window.innerWidth / 16)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.34,
      vy: (Math.random() - 0.5) * 0.34,
      radius: Math.random() * 1.6 + 0.5,
      hue: Math.random() > 0.66 ? "0, 255, 136" : Math.random() > 0.42 ? "0, 212, 255" : "123, 97, 255"
    }));
  }

  function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(${particle.hue}, 0.58)`;
      context.fill();

      for (let i = index + 1; i < particles.length; i += 1) {
        const other = particles[i];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 118) {
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = `rgba(0, 212, 255, ${0.12 * (1 - distance / 118)})`;
          context.lineWidth = 1;
          context.stroke();
        }
      }
    });

    window.requestAnimationFrame(draw);
  }

  resetParticles();
  draw();
  window.addEventListener("resize", resetParticles);
}

function createTelemetry() {
  const canvas = document.querySelector("#telemetry-canvas");
  const context = canvas.getContext("2d");
  let tick = 0;

  function resize() {
    sizeCanvas(canvas, context);
  }

  function traceLine(yBase, amplitude, speed, color, phase) {
    context.beginPath();

    for (let x = 0; x <= window.innerWidth; x += 9) {
      const y = yBase
        + Math.sin((x * 0.018) + tick * speed + phase) * amplitude
        + Math.sin((x * 0.055) + tick * speed * 0.72) * amplitude * 0.24;

      if (x === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }

    context.strokeStyle = color;
    context.lineWidth = 1.4;
    context.shadowColor = color;
    context.shadowBlur = 12;
    context.stroke();
    context.shadowBlur = 0;
  }

  function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.globalAlpha = 0.6;

    for (let y = 80; y < window.innerHeight; y += 92) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(window.innerWidth, y);
      context.strokeStyle = "rgba(255, 255, 255, 0.025)";
      context.lineWidth = 1;
      context.stroke();
    }

    traceLine(window.innerHeight * 0.25, 14, 0.026, "rgba(0, 212, 255, 0.42)", 0);
    traceLine(window.innerHeight * 0.62, 22, 0.018, "rgba(0, 255, 136, 0.34)", 1.4);
    traceLine(window.innerHeight * 0.82, 10, 0.038, "rgba(255, 55, 71, 0.22)", 2.6);

    const pulseX = (tick * 3.4) % (window.innerWidth + 140) - 70;
    const gradient = context.createLinearGradient(pulseX - 80, 0, pulseX + 80, 0);
    gradient.addColorStop(0, "rgba(0, 212, 255, 0)");
    gradient.addColorStop(0.5, "rgba(0, 255, 136, 0.16)");
    gradient.addColorStop(1, "rgba(0, 212, 255, 0)");
    context.fillStyle = gradient;
    context.fillRect(pulseX - 80, 0, 160, window.innerHeight);

    tick += 1;
    window.requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
}

if (motionAllowed) {
  createParticles();
  createTelemetry();
}
