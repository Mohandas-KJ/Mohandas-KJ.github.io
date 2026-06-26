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

// Background animation states
let isBgAnimationPaused = false;
let activeVideo = null;
let crossfadeInterval = null;

// Premium loader boot console logs
const bootLogs = [
  { text: "Initializing portfolio kernel connection...", type: "info" },
  { text: "Host: mohan@arch-cyber // Connection secure", type: "info" },
  { text: "Loading base CPU microcode & packages... DONE", type: "success" },
  { text: "Mounting partition: /dev/sda1 (ext4)... OK", type: "success" },
  { text: "Starting System Log daemon... NOMINAL", type: "success" },
  { text: "Loading cyber threat intelligence matrices...", type: "info" },
  { text: "SSL link established: port 443/tcp open", type: "success" },
  { text: "Connecting to GitHub API modules...", type: "info" },
  { text: "Auth: GitHub developer token verified", type: "success" },
  { text: "Caching static project repository endpoints...", type: "info" },
  { text: "Projects: 10+ featured & solutions LOADED", type: "success" },
  { text: "Starting F1 telemetry data feed parser...", type: "info" },
  { text: "F1 feed: established on socket /var/run/f1.sock", type: "success" },
  { text: "Calibrating custom mouse aiming crosshairs... DONE", type: "success" },
  { text: "Core security integrity verification... 100% SECURE", type: "success" }
];

const loaderBody = document.querySelector("#loader-body");
const loaderPercent = document.querySelector("#loader-percent");
const loaderProgressSpan = document.querySelector("#loader-progress-span");
const loaderAccess = document.querySelector("#loader-access");

let logIndex = 0;
let progressPercent = 0;
let bootSafetyTimeout = null;
let bootSequenceTimeout = null;

function runBootSequence() {
  if (logIndex < bootLogs.length) {
    const log = bootLogs[logIndex];
    const row = document.createElement("div");
    row.className = `loader-row ${log.type}`;
    row.textContent = log.text;
    if (loaderBody) {
      loaderBody.appendChild(row);
      loaderBody.scrollTop = loaderBody.scrollHeight;
    }

    logIndex++;
    progressPercent = Math.floor((logIndex / bootLogs.length) * 100);
    if (loaderPercent) loaderPercent.textContent = `${progressPercent}%`;
    if (loaderProgressSpan) loaderProgressSpan.style.width = `${progressPercent}%`;

    const delay = log.type === "success" ? 60 : 110;
    bootSequenceTimeout = window.setTimeout(runBootSequence, delay);
  } else {
    if (bootSafetyTimeout) {
      window.clearTimeout(bootSafetyTimeout);
      bootSafetyTimeout = null;
    }
    if (loaderAccess) loaderAccess.classList.add("visible");
    window.setTimeout(() => {
      if (loader) loader.classList.add("is-hidden");
      document.body.classList.remove("no-scroll");
      // Trigger background video load and play
      initBackgroundVideo();
      enableAutoPlayResume();
      // Trigger terminal card typing
      startTerminalTyping();
    }, 1000);
  }
}

function enableAutoPlayResume() {
  const resumePlay = () => {
    if (activeVideo && activeVideo.paused && !isBgAnimationPaused) {
      activeVideo.play()
        .then(() => {
          console.log("Video successfully resumed on user interaction.");
          document.removeEventListener("click", resumePlay);
          document.removeEventListener("keydown", resumePlay);
          document.removeEventListener("touchstart", resumePlay);
        })
        .catch(err => console.log("Failed to resume video on interaction:", err));
    }
  };
  document.addEventListener("click", resumePlay);
  document.addEventListener("keydown", resumePlay);
  document.addEventListener("touchstart", resumePlay);
}

// Start boot sequence on window load
window.addEventListener("load", () => {
  bootSequenceTimeout = window.setTimeout(runBootSequence, 300);
});

// Backup safety timer in case load event takes too long
bootSafetyTimeout = window.setTimeout(() => {
  if (bootSequenceTimeout) {
    window.clearTimeout(bootSequenceTimeout);
    bootSequenceTimeout = null;
  }
  if (loader && !loader.classList.contains("is-hidden")) {
    loader.classList.add("is-hidden");
    document.body.classList.remove("no-scroll");
    initBackgroundVideo();
    enableAutoPlayResume();
    startTerminalTyping();
  }
}, 4000);

if (year) year.textContent = new Date().getFullYear();

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  if (!typingText) return;
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

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (siteNav) siteNav.classList.remove("is-open");
    if (navToggle) {
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
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

// Dynamic hover coordinate glows for cards/widgets
document.querySelectorAll(".skill-card, .project-card, .solution-card, .github-cta, .contact-panel, .dashboard-widget, .terminal-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--glow-x", `${x}%`);
    card.style.setProperty("--glow-y", `${y}%`);
  });
});

// Custom Cursor reticle follow logic
if (motionAllowed && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let cursorX = window.innerWidth / 2;
  let cursorY = window.innerHeight / 2;
  let ringX = cursorX;
  let ringY = cursorY;

  window.addEventListener("pointermove", (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    if (cursorDot) {
      cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    }
  });

  // Scale/rotate cursor ring on hover of interactive elements
  document.querySelectorAll("a, button, .project-card, .dashboard-widget, .social-button, .skill-card").forEach((element) => {
    element.addEventListener("pointerenter", () => {
      if (cursorRing) cursorRing.classList.add("is-link");
    });
    element.addEventListener("pointerleave", () => {
      if (cursorRing) cursorRing.classList.remove("is-link");
    });
  });

  function animateCursor() {
    ringX += (cursorX - ringX) * 0.16;
    ringY += (cursorY - ringY) * 0.16;
    if (cursorRing) {
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    }
    window.requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

// Arch Linux Terminal typing logic
const terminalData = [
  { cmd: "whoami", out: "Cybersecurity Enthusiast & Linux Power User" },
  { cmd: "favorite_os", out: "Arch Linux (btw)" },
  { cmd: "current_focus", out: "• Cybersecurity\n• Networking\n• Formula 1 Analytics" },
  { cmd: "projects", out: "• ShadowGram\n• Slipstream F1\n• LAN Media Server" },
  { cmd: "uptime", out: "Learning Every Day" }
];

let currentLineIndex = 0;
let isTerminalTypingStarted = false;
const terminalBody = document.querySelector("#terminal-body");

function startTerminalTyping() {
  if (!terminalBody || isTerminalTypingStarted) return;
  isTerminalTypingStarted = true;
  executeNextCommandLine();
}

function executeNextCommandLine() {
  if (currentLineIndex >= terminalData.length) {
    // Hold completion state for 12 seconds, then restart typing loop
    window.setTimeout(() => {
      terminalBody.innerHTML = '<div class="terminal-line"><span class="terminal-prompt">[mohan@arch-cyber ~]$ </span><span class="terminal-cursor"></span></div>';
      currentLineIndex = 0;
      executeNextCommandLine();
    }, 12000);
    return;
  }

  const item = terminalData[currentLineIndex];
  const lines = terminalBody.querySelectorAll(".terminal-line");
  const activeLine = lines[lines.length - 1];
  const cmdSpan = document.createElement("span");
  cmdSpan.className = "terminal-cmd";
  activeLine.insertBefore(cmdSpan, activeLine.querySelector(".terminal-cursor"));

  let charIdx = 0;
  function typeChar() {
    if (charIdx < item.cmd.length) {
      cmdSpan.textContent += item.cmd.charAt(charIdx);
      charIdx++;
      window.setTimeout(typeChar, 60 + Math.random() * 40);
    } else {
      // Finished typing command
      const cursor = activeLine.querySelector(".terminal-cursor");
      if (cursor) cursor.remove();

      window.setTimeout(() => {
        const outDiv = document.createElement("div");
        outDiv.className = "terminal-out";
        outDiv.textContent = item.out;
        terminalBody.appendChild(outDiv);

        currentLineIndex++;
        const nextLine = document.createElement("div");
        nextLine.className = "terminal-line";
        nextLine.innerHTML = '<span class="terminal-prompt">[mohan@arch-cyber ~]$ </span><span class="terminal-cursor"></span>';
        terminalBody.appendChild(nextLine);

        terminalBody.scrollTop = terminalBody.scrollHeight;

        window.setTimeout(executeNextCommandLine, 800);
      }, 300);
    }
  }
  window.setTimeout(typeChar, 400);
}

function sizeCanvas(canvas, context) {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

// Global ticker for animations synchronization
let globalTick = 0;

// F1 Lap Telemetry simulation profile
function getLapTelemetry(lapPercent) {
  let speed, gear, rpm, throttle, brake;
  
  if (lapPercent < 0.15) { // Straight
    throttle = 100; brake = 0;
    speed = 280 + (lapPercent / 0.15) * 52;
    gear = 8;
    rpm = 11200 + (lapPercent / 0.15) * 1600;
  } else if (lapPercent < 0.22) { // Hard braking Turn 1
    throttle = 0; brake = 100;
    speed = 332 - ((lapPercent - 0.15) / 0.07) * 242;
    gear = 2;
    rpm = 12800 - ((lapPercent - 0.15) / 0.07) * 4400;
  } else if (lapPercent < 0.38) { // Tech corners
    throttle = 60 + Math.sin(lapPercent * 100) * 35;
    brake = throttle > 60 ? 0 : 20;
    speed = 90 + ((lapPercent - 0.22) / 0.16) * 115;
    gear = 4;
    rpm = 8400 + ((lapPercent - 0.22) / 0.16) * 2100;
  } else if (lapPercent < 0.5) { // Twisties
    throttle = 40 + Math.sin(lapPercent * 120) * 40;
    brake = throttle > 45 ? 0 : 35;
    speed = 205 - ((lapPercent - 0.38) / 0.12) * 85;
    gear = 3;
    rpm = 9600 - ((lapPercent - 0.38) / 0.12) * 1400;
  } else if (lapPercent < 0.7) { // Sweeper acceleration
    throttle = 100; brake = 0;
    speed = 120 + ((lapPercent - 0.5) / 0.20) * 165;
    gear = 7;
    rpm = 9100 + ((lapPercent - 0.5) / 0.2) * 2700;
  } else if (lapPercent < 0.78) { // Braking Turn 15
    throttle = 0; brake = 85;
    speed = 285 - ((lapPercent - 0.7) / 0.08) * 155;
    gear = 3;
    rpm = 11900 - ((lapPercent - 0.7) / 0.08) * 2900;
  } else { // Launching onto straight
    throttle = 90 + Math.random() * 10; brake = 0;
    speed = 130 + ((lapPercent - 0.78) / 0.22) * 150;
    gear = 6;
    rpm = 9400 + ((lapPercent - 0.78) / 0.22) * 1600;
  }
  
  // Adding small organic noise
  rpm += Math.floor((Math.random() - 0.5) * 80);
  speed += (Math.random() - 0.5) * 0.8;
  
  return {
    speed: Math.floor(speed),
    gear,
    rpm: Math.floor(rpm),
    throttle: Math.floor(throttle),
    brake: Math.floor(brake)
  };
}

// Particle network simulation with hexagons, circuit layout and packets
function createParticles() {
  const canvas = document.querySelector("#particle-canvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  let particles = [];

  function drawHexagon(ctx, x, y, r) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
    }
    ctx.closePath();
    ctx.fill();
  }

  function drawCircuitLine(ctx, x1, y1, x2, y2, opacity) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const offset = Math.min(Math.abs(dx), Math.abs(dy));
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + offset * Math.sign(dx), y1 + offset * Math.sign(dy));
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw glowing data packets flowing along the traces
    if (opacity > 0.04) {
      const packetProgress = (globalTick * 0.007) % 1;
      const midX = x1 + offset * Math.sign(dx);
      const midY = y1 + offset * Math.sign(dy);

      let px, py;
      if (packetProgress < 0.5) {
        const t = packetProgress * 2;
        px = x1 * (1 - t) + midX * t;
        py = y1 * (1 - t) + midY * t;
      } else {
        const t = (packetProgress - 0.5) * 2;
        px = midX * (1 - t) + x2 * t;
        py = midY * (1 - t) + y2 * t;
      }
      ctx.fillStyle = `rgba(0, 255, 136, ${opacity * 2.2})`;
      ctx.fillRect(px - 1.5, py - 1.5, 3, 3);
    }
  }

  function resetParticles() {
    sizeCanvas(canvas, context);
    const count = Math.min(84, Math.max(34, Math.floor(window.innerWidth / 18)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      radius: Math.random() * 2 + 1,
      hue: Math.random() > 0.65 ? "0, 255, 136" : Math.random() > 0.4 ? "0, 212, 255" : "123, 97, 255"
    }));
  }

  function draw() {
    if (isBgAnimationPaused) {
      window.requestAnimationFrame(draw);
      return;
    }
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

      context.beginPath();
      context.fillStyle = `rgba(${particle.hue}, 0.55)`;
      drawHexagon(context, particle.x, particle.y, particle.radius * 1.5);

      for (let i = index + 1; i < particles.length; i += 1) {
        const other = particles[i];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const opacity = 0.12 * (1 - distance / 120);
          drawCircuitLine(context, particle.x, particle.y, other.x, other.y, opacity);
        }
      }
    });

    window.requestAnimationFrame(draw);
  }

  resetParticles();
  draw();
  window.addEventListener("resize", resetParticles);
}

// Advanced telemetry console screen background
function createTelemetry() {
  const canvas = document.querySelector("#telemetry-canvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");

  // Speed values history queue for sparkline and telemetry traces
  const speedHistory = Array(120).fill(150);

  function resize() {
    sizeCanvas(canvas, context);
  }

  // Draw a grid with cyber coordinate tags
  function drawDashboardGrid() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    context.strokeStyle = "rgba(255, 255, 255, 0.015)";
    context.lineWidth = 1;

    // Horizontal Grid Lines
    for (let y = 80; y < h; y += 90) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(w, y);
      context.stroke();

      if (w > 768 && y % 180 === 80) {
        context.fillStyle = "rgba(0, 212, 255, 0.12)";
        context.font = "8px 'JetBrains Mono', monospace";
        context.fillText(`REF_MARK_${y}_PX`, 15, y - 4);
      }
    }

    // Vertical Grid Lines
    for (let x = 120; x < w; x += 150) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, h);
      context.stroke();
    }
  }

  // Draw scrolling telemetry graph traces
  function drawTelemetryTrace(yBase, history, scale, color, label) {
    context.beginPath();
    const step = Math.max(2, Math.floor(window.innerWidth / history.length));
    
    for (let i = 0; i < history.length; i++) {
      const x = i * step;
      // Procedural distortion and scaling of values
      const y = yBase - (history[i] - 100) * scale + Math.sin(i * 0.15 + globalTick * 0.05) * 5;

      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }
    context.strokeStyle = color;
    context.lineWidth = 1.5;
    context.stroke();

    // Trace label HUD
    if (window.innerWidth > 768) {
      context.fillStyle = color;
      context.font = "9px 'JetBrains Mono', monospace";
      context.fillText(label, 20, yBase - 15);
    }
  }

  // Draw HUD data readout overlays
  function drawHUD(data, lapProgress) {
    if (window.innerWidth < 768) return;

    const drsEnabled = data.speed > 270;
    const deltaVal = (-0.218 + Math.sin(globalTick * 0.015) * 0.03).toFixed(3);

    // Sector calculations
    let s1Text = "--.---";
    let s2Text = "--.---";
    let s3Text = "--.---";
    let s1Color = "rgba(255, 255, 255, 0.4)";
    let s2Color = "rgba(255, 255, 255, 0.4)";
    let s3Color = "rgba(255, 255, 255, 0.4)";

    if (lapProgress < 0.33) {
      s1Text = ((lapProgress / 0.33) * 28.218).toFixed(3) + "s";
      s1Color = "#00d4ff"; // active cyan/blue
    } else {
      s1Text = "28.218s";
      s1Color = "#7b61ff"; // purple (fastest)
      
      if (lapProgress < 0.66) {
        s2Text = (((lapProgress - 0.33) / 0.33) * 31.456).toFixed(3) + "s";
        s2Color = "#00d4ff";
      } else {
        s2Text = "31.456s";
        s2Color = "#00ff88"; // green (personal best)
        
        s3Text = (((lapProgress - 0.66) / 0.34) * 24.112).toFixed(3) + "s";
        s3Color = "#00d4ff";
      }
    }

    // Top Left HUD Readout
    context.fillStyle = "rgba(0, 212, 255, 0.7)";
    context.font = "10px 'JetBrains Mono', monospace";
    context.fillText(`SYS_TELEM_CORE: ACTIVE_STREAM`, 24, 110);
    context.fillStyle = "rgba(255, 255, 255, 0.85)";
    context.font = "14px 'JetBrains Mono', monospace";
    context.fillText(`SPEED: ${data.speed} KM/H`, 24, 130);
    context.fillText(`RPM:   ${data.rpm} RPM`, 24, 150);
    context.fillText(`GEAR:  [ ${data.gear} ]`, 24, 170);

    // DRS Status
    context.fillStyle = "rgba(255, 255, 255, 0.85)";
    context.fillText(`DRS:   `, 24, 190);
    context.fillStyle = drsEnabled ? "#00ff88" : "rgba(255, 255, 255, 0.4)";
    context.fillText(drsEnabled ? "ENABLED" : "DISABLED", 80, 190);

    // Delta
    context.fillStyle = "rgba(255, 255, 255, 0.85)";
    context.fillText(`DELTA: `, 24, 210);
    context.fillStyle = "#00ff88"; // Green for negative delta
    context.fillText(`${deltaVal}s`, 80, 210);

    // Top Right HUD Readout
    const rightAlignX = window.innerWidth - 340;
    context.fillStyle = "rgba(0, 255, 136, 0.7)";
    context.font = "10px 'JetBrains Mono', monospace";
    context.fillText(`SYSTEM_INTEGRITY: NOMINAL`, rightAlignX, 110);

    // Throttle progress bar
    context.fillStyle = "rgba(255, 255, 255, 0.4)";
    context.font = "14px 'JetBrains Mono', monospace";
    context.fillText(`THROTTLE: `, rightAlignX, 130);
    context.fillStyle = "#00ff88";
    const thBars = Math.floor(data.throttle / 10);
    context.fillText(`|`.repeat(thBars) + `.`.repeat(10 - thBars) + ` ${data.throttle}%`, rightAlignX + 80, 130);

    // Brake progress bar
    context.fillStyle = "rgba(255, 255, 255, 0.4)";
    context.fillText(`BRAKE:    `, rightAlignX, 150);
    context.fillStyle = "#ff3747";
    const brBars = Math.floor(data.brake / 10);
    context.fillText(`|`.repeat(brBars) + `.`.repeat(10 - brBars) + ` ${data.brake}%`, rightAlignX + 80, 150);

    // Network & Uptime
    context.fillStyle = "rgba(255, 255, 255, 0.4)";
    context.fillText(`NET:      `, rightAlignX, 170);
    context.fillStyle = "#00d4ff";
    context.fillText("SSH_SECURE", rightAlignX + 80, 170);

    context.fillStyle = "rgba(255, 255, 255, 0.4)";
    context.fillText(`UPTIME:   `, rightAlignX, 190);
    context.fillStyle = "rgba(255, 255, 255, 0.85)";
    context.fillText("Learning Every Day", rightAlignX + 80, 190);

    // Sectors
    context.fillStyle = "rgba(255, 255, 255, 0.4)";
    context.fillText(`SECTORS:  `, rightAlignX, 215);

    context.fillStyle = s1Color;
    context.fillText(`S1: ${s1Text}`, rightAlignX + 80, 215);
    context.fillStyle = s2Color;
    context.fillText(`S2: ${s2Text}`, rightAlignX + 165, 215);
    context.fillStyle = s3Color;
    context.fillText(`S3: ${s3Text}`, rightAlignX + 250, 215);
  }

  // Draw F1 widget sparkline canvas
  function drawWidgetSparkline(data) {
    const sparkCanvas = document.querySelector("#widget-sparkline");
    if (!sparkCanvas) return;
    const sparkCtx = sparkCanvas.getContext("2d");
    
    // Clear canvas
    sparkCtx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
    
    // Sparkline history drawing
    sparkCtx.beginPath();
    const step = sparkCanvas.width / speedHistory.length;
    for (let i = 0; i < speedHistory.length; i++) {
      const x = i * step;
      // map speed range 90-340 to sparkline height
      const ratio = (speedHistory[i] - 90) / 250;
      const y = sparkCanvas.height - (ratio * (sparkCanvas.height - 6) + 3);
      if (i === 0) {
        sparkCtx.moveTo(x, y);
      } else {
        sparkCtx.lineTo(x, y);
      }
    }
    sparkCtx.strokeStyle = "rgba(0, 255, 136, 0.8)";
    sparkCtx.lineWidth = 1.5;
    sparkCtx.stroke();
  }

  function draw() {
    if (isBgAnimationPaused) {
      window.requestAnimationFrame(draw);
      return;
    }
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Get current F1 telemetry state based on global progress
    const lapProgress = (globalTick * 0.00032) % 1;
    const telemetryData = getLapTelemetry(lapProgress);

    // Update F1 speed readout inside the HTML widget
    const widgetSpeedEl = document.querySelector("#widget-f1-val");
    if (widgetSpeedEl) {
      widgetSpeedEl.textContent = `${telemetryData.speed} km/h`;
    }

    // Keep speed history queue updated
    speedHistory.push(telemetryData.speed);
    if (speedHistory.length > 120) speedHistory.shift();

    // Render background grid
    drawDashboardGrid();

    // Render HUD data readouts
    drawHUD(telemetryData, lapProgress);

    // Draw telemetry trace lines
    const h = window.innerHeight;
    drawTelemetryTrace(h * 0.28, speedHistory, 0.45, "rgba(0, 212, 255, 0.25)", "CHANNEL_01 // VEHICLE_SPEED_TELEMETRY");
    
    // Procedural RPM history derived from speed
    const rpmHistory = speedHistory.map(spd => {
      // Simulating gear changes and correlation
      const gearSim = spd > 280 ? 8 : spd > 200 ? 6 : spd > 120 ? 4 : 2;
      return spd * 32 + (10000 / gearSim);
    });
    drawTelemetryTrace(h * 0.72, rpmHistory, 0.007, "rgba(0, 255, 136, 0.2)", "CHANNEL_02 // ENGINE_RPM_TELEMETRY");

    // Render widget sparkline canvas
    drawWidgetSparkline(telemetryData);

    globalTick += 1;
    window.requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
}

// Wireframe F1 car glance zoom animation trigger
const carEl = document.querySelector("#f1-car-wireframe");
function triggerF1Car() {
  if (!carEl || isBgAnimationPaused) return;
  const randomTop = Math.floor(Math.random() * 40) + 30; // Between 30% and 70% viewport height
  carEl.style.top = `${randomTop}%`;
  carEl.classList.add("animate");
  
  carEl.addEventListener("animationend", () => {
    carEl.classList.remove("animate");
  }, { once: true });
}

// Loop car animation every 18 seconds, starting 6 seconds after load
window.setInterval(triggerF1Car, 18000);
window.setTimeout(triggerF1Car, 6000);

// Initialize background video loop with native loop
function initBackgroundVideo() {
  const container = document.querySelector("#hero-video-bg");
  if (!container) return;

  const isMobile = window.innerWidth < 768;
  const videoSrc = isMobile ? "rb22-mobile.mp4" : "rb22-desktop.mp4";

  // Create a single video element
  const video = document.createElement("video");
  video.className = "bg-video-element";
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.autoplay = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("loop", "");
  video.setAttribute("autoplay", "");
  video.style.position = "absolute";
  video.style.inset = "0";
  video.style.width = "100%";
  video.style.height = "100%";
  video.style.objectFit = "cover";
  video.style.opacity = "0.45";
  
  video.src = videoSrc;
  video.load();
  container.appendChild(video);

  video.play().catch(e => console.log("Video autoplay blocked or failed: ", e));
  activeVideo = video;

  // Bind Pause button events
  const pauseBtn = document.querySelector("#pause-bg-btn");
  if (pauseBtn) {
    pauseBtn.addEventListener("click", () => {
      isBgAnimationPaused = !isBgAnimationPaused;
      pauseBtn.classList.toggle("paused", isBgAnimationPaused);

      const btnText = pauseBtn.querySelector(".btn-text");
      
      if (isBgAnimationPaused) {
        video.pause();
        if (btnText) btnText.textContent = "PLAY BG ANIMATION";
      } else {
        video.play().catch(err => console.log("Play error on resume:", err));
        if (btnText) btnText.textContent = "PAUSE BG ANIMATION";
      }
    });
  }
}

if (motionAllowed) {
  createParticles();
  createTelemetry();
}
