/**
 * Neural Void — Ambient Particle System
 * Organic drifting constellations with cursor-reactive luminance
 * Colors: Electric Cyan → Indigo → Violet (matching Neural Void palette)
 * Performance: requestAnimationFrame with visibility pause
 */
(function () {
  const CONFIG = {
    particleCount: {
      desktop: 50,
      mobile: 20
    },

    // Neutral base tones — barely visible dots in the void
    colors: [
      'rgba(180, 195, 210,',
      'rgba(160, 175, 195,',
      'rgba(200, 210, 225,'
    ],

    // Activated colors near cursor — Neural Void accent palette
    gradientColors: [
      'rgba(0, 229, 255,',     // Electric cyan (#00e5ff)
      'rgba(0, 124, 240,',     // Deep blue (#007cf0)
      'rgba(153, 69, 255,',    // Violet (#9945ff)
      'rgba(0, 180, 216,'      // Teal
    ],

    opacity: {
      min: 0.03,
      max: 0.12,
      nearMouse: 0.7
    },

    // Slower, more organic drift
    speed: {
      min: 0.08,
      max: 0.35
    },

    size: {
      min: 1.5,
      max: 4
    },

    mouse: {
      radius: 200,
      attractForce: 0.3,   // Gentle attraction instead of repulsion
      enabled: true
    },

    connections: {
      enabled: true,
      distance: 120,
      opacity: 0.06,
      mouseDistance: 200,   // Connect particles near cursor at larger range
      mouseOpacity: 0.15,
      color: 'rgba(180, 195, 210,'
    },

    // Organic sine-wave drift
    drift: {
      enabled: true,
      amplitude: 0.3,
      frequency: 0.002
    }
  };

  function initParticleSystem() {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) {
      if (document.readyState === 'loading') {
        setTimeout(initParticleSystem, 1);
        return;
      }
      return;
    }

    const ctx = canvas.getContext("2d");
    const isMobile = window.innerWidth <= 767;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const mouse = {
      x: null,
      y: null,
      radius: CONFIG.mouse.radius
    };

    let animationRunning = true;
    let animationFrame = null;
    let time = 0;

    const particleCount = isMobile ? CONFIG.particleCount.mobile : CONFIG.particleCount.desktop;
    const particles = [];

    class Particle {
      constructor() {
        this.reset();
        this.vx = (Math.random() - 0.5) * CONFIG.speed.max;
        this.vy = (Math.random() - 0.5) * CONFIG.speed.max;
        this.gradientColor = CONFIG.gradientColors[Math.floor(Math.random() * CONFIG.gradientColors.length)];
        // Unique phase offset for organic movement
        this.phase = Math.random() * Math.PI * 2;
        this.driftSpeed = CONFIG.drift.frequency * (0.5 + Math.random());
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * (CONFIG.size.max - CONFIG.size.min) + CONFIG.size.min;
        this.baseAlpha = Math.random() * (CONFIG.opacity.max - CONFIG.opacity.min) + CONFIG.opacity.min;
        this.alpha = this.baseAlpha;
        this.baseColor = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
        this.color = this.baseColor;
        // Pulsing: each particle breathes at its own rate
        this.pulseSpeed = 0.003 + Math.random() * 0.005;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      draw() {
        // Soft glow effect for activated particles
        if (this.alpha > 0.2) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `${this.color} ${this.alpha * 0.15})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color} ${this.alpha})`;
        ctx.fill();
      }

      update(time) {
        // Organic sine-wave drift
        if (CONFIG.drift.enabled) {
          this.x += this.vx + Math.sin(time * this.driftSpeed + this.phase) * CONFIG.drift.amplitude;
          this.y += this.vy + Math.cos(time * this.driftSpeed * 0.7 + this.phase) * CONFIG.drift.amplitude;
        } else {
          this.x += this.vx;
          this.y += this.vy;
        }

        // Subtle breathing pulse
        const pulse = Math.sin(time * this.pulseSpeed + this.pulsePhase);
        const basePulseAlpha = this.baseAlpha + pulse * 0.02;

        // Wrap around edges (seamless, no bounce)
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.y > canvas.height + 10) this.y = -10;
        if (this.y < -10) this.y = canvas.height + 10;

        // Mouse interaction: gentle attraction + illumination
        if (CONFIG.mouse.enabled && mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);

            // Gentle attraction toward cursor
            this.x -= Math.cos(angle) * force * CONFIG.mouse.attractForce;
            this.y -= Math.sin(angle) * force * CONFIG.mouse.attractForce;

            // Illuminate with gradient color
            this.color = this.gradientColor;
            // Smooth cubic falloff for natural glow
            const intensity = force * force * force;
            this.alpha = Math.min(CONFIG.opacity.nearMouse, basePulseAlpha + intensity * 0.6);
          } else {
            this.color = this.baseColor;
            this.alpha = basePulseAlpha;
          }
        } else {
          this.alpha = basePulseAlpha;
        }
      }
    }

    function connectParticles() {
      if (!CONFIG.connections.enabled) return;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Check if either particle is near the mouse for enhanced connections
          let maxDist = CONFIG.connections.distance;
          let maxOpacity = CONFIG.connections.opacity;

          if (mouse.x !== null && mouse.y !== null) {
            const dxMouse1 = particles[i].x - mouse.x;
            const dyMouse1 = particles[i].y - mouse.y;
            const distMouse1 = Math.sqrt(dxMouse1 * dxMouse1 + dyMouse1 * dyMouse1);

            const dxMouse2 = particles[j].x - mouse.x;
            const dyMouse2 = particles[j].y - mouse.y;
            const distMouse2 = Math.sqrt(dxMouse2 * dxMouse2 + dyMouse2 * dyMouse2);

            if (distMouse1 < CONFIG.connections.mouseDistance && distMouse2 < CONFIG.connections.mouseDistance) {
              maxDist = CONFIG.connections.mouseDistance;
              maxOpacity = CONFIG.connections.mouseOpacity;
            }
          }

          if (distance < maxDist) {
            const opacity = (1 - distance / maxDist) * maxOpacity;

            // Use gradient color for connections near mouse
            let lineColor = CONFIG.connections.color;
            if (maxOpacity > CONFIG.connections.opacity) {
              lineColor = particles[i].gradientColor;
            }

            ctx.strokeStyle = `${lineColor} ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function initParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      if (!animationRunning) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      connectParticles();

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(time);
        particles[i].draw();
      }

      animationFrame = requestAnimationFrame(animate);
    }

    // Event listeners
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('touchmove', (event) => {
      if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
      }
    });

    window.addEventListener('touchend', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function handleVisibilityChange() {
      if (document.hidden) {
        animationRunning = false;
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }
      } else {
        if (!animationRunning) {
          animationRunning = true;
          animationFrame = requestAnimationFrame(animate);
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles.forEach(particle => particle.reset());
      }, 200);
    });

    const navbar = document.querySelector(".navbar");
    if (navbar) {
      let scrollTimeout;
      window.addEventListener("scroll", function () {
        if (!scrollTimeout) {
          scrollTimeout = setTimeout(() => {
            if (window.scrollY > 50) {
              navbar.classList.add("navbar-scrolled");
            } else {
              navbar.classList.remove("navbar-scrolled");
            }
            scrollTimeout = null;
          }, 100);
        }
      });
    }

    initParticles();
    animationFrame = requestAnimationFrame(animate);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticleSystem);
  } else {
    initParticleSystem();
  }
})();