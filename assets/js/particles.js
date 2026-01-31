/**
 * Sistema de animación de partículas mejorado
 * Características: Interactivo, sutil, con conexiones entre partículas
 * Optimizado para rendimiento y legibilidad del contenido
 */
(function () {
  // ==================== CONFIGURACIÓN ====================
  const CONFIG = {
    // Cantidad de partículas (optimizado para rendimiento 60fps)
    particleCount: {
      desktop: 35,
      mobile: 15
    },

    // Colores de las partículas (muy sutiles para no interferir)
    colors: [
      'rgba(200, 200, 210,', // Gris claro
      'rgba(180, 180, 190,', // Gris medio
      'rgba(220, 220, 230,'  // Gris muy claro
    ],

    // Colores del gradiente para cuando el mouse está cerca (mismo gradiente que el nombre)
    gradientColors: [
      'rgba(79, 47, 255,',   // Púrpura (#4f2fffd2)
      'rgba(3, 127, 243,',   // Azul (#037ff3)
      'rgba(3, 240, 180,',   // Turquesa (#03f0b4)
      'rgba(157, 241, 0,'    // Verde lima (#9df100)
    ],

    // Opacidad de las partículas (muy baja para sutileza)
    opacity: {
      min: 0.05,
      max: 0.15,
      nearMouse: 0.85  // Opacidad alta cuando está cerca del mouse (efecto notorio)
    },

    // Velocidad de movimiento
    speed: {
      min: 0.2,
      max: 0.8
    },

    // Tamaño de las partículas (aumentado para mayor visibilidad)
    size: {
      min: 2,
      max: 5
    },

    // Interacción con el mouse
    mouse: {
      radius: 150,           // Radio de interacción
      repelForce: 0.8,       // Fuerza de repulsión (positivo = alejar)
      enabled: true
    },

    // Conexiones entre partículas
    connections: {
      enabled: true,
      distance: 80,          // Distancia máxima para conectar (optimizado)
      opacity: 0.08,         // Opacidad de las líneas
      color: 'rgba(200, 200, 210,'
    }
  };

  // ==================== INICIALIZACIÓN ====================
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

    // Configurar canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Limpiar canvas con el color de fondo
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Estado del mouse
    const mouse = {
      x: null,
      y: null,
      radius: CONFIG.mouse.radius
    };

    // Estado de la animación
    let animationRunning = true;
    let animationFrame = null;

    // Array de partículas
    const particleCount = isMobile ? CONFIG.particleCount.mobile : CONFIG.particleCount.desktop;
    const particles = [];

    // ==================== CLASE PARTÍCULA ====================
    class Particle {
      constructor() {
        this.reset();
        // Velocidad en ambas direcciones (x, y)
        this.vx = (Math.random() - 0.5) * (CONFIG.speed.max - CONFIG.speed.min) + CONFIG.speed.min;
        this.vy = (Math.random() - 0.5) * (CONFIG.speed.max - CONFIG.speed.min) + CONFIG.speed.min;
        // Asignar un color del gradiente específico a esta partícula
        this.gradientColor = CONFIG.gradientColors[Math.floor(Math.random() * CONFIG.gradientColors.length)];
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * (CONFIG.size.max - CONFIG.size.min) + CONFIG.size.min;
        this.baseAlpha = Math.random() * (CONFIG.opacity.max - CONFIG.opacity.min) + CONFIG.opacity.min;
        this.alpha = this.baseAlpha;

        // Color base (gris neutro)
        this.baseColor = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
        this.color = this.baseColor;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color} ${this.alpha})`;
        ctx.fill();
      }

      update() {
        // Movimiento base
        this.x += this.vx;
        this.y += this.vy;

        // Rebote en los bordes
        if (this.x > canvas.width || this.x < 0) {
          this.vx = -this.vx;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.vy = -this.vy;
        }

        // Interacción con el mouse
        if (CONFIG.mouse.enabled && mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            // Calcular fuerza basada en la distancia
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);

            // Aplicar repulsión (alejar partículas del cursor)
            this.x += Math.cos(angle) * force * CONFIG.mouse.repelForce;
            this.y += Math.sin(angle) * force * CONFIG.mouse.repelForce;

            // Cambiar a color del gradiente y aumentar muchísimo la opacidad
            this.color = this.gradientColor;
            this.alpha = Math.min(CONFIG.opacity.nearMouse, this.baseAlpha + force * 0.8);
          } else {
            // Restaurar color y opacidad originales
            this.color = this.baseColor;
            this.alpha = this.baseAlpha;
          }
        }
      }
    }

    // ==================== CONEXIONES ENTRE PARTÍCULAS ====================
    function connectParticles() {
      if (!CONFIG.connections.enabled) return;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONFIG.connections.distance) {
            // Opacidad basada en distancia (más cerca = más opaco)
            const opacity = (1 - distance / CONFIG.connections.distance) * CONFIG.connections.opacity;

            ctx.strokeStyle = `${CONFIG.connections.color} ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // ==================== INICIALIZAR PARTÍCULAS ====================
    function initParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    // ==================== ANIMACIÓN PRINCIPAL ====================
    function animate() {
      if (!animationRunning) return;

      // Limpiar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar conexiones primero (van detrás de las partículas)
      connectParticles();

      // Actualizar y dibujar partículas
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrame = requestAnimationFrame(animate);
    }

    // ==================== EVENT LISTENERS ====================

    // Seguimiento del mouse
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    // Limpiar posición del mouse al salir
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Soporte táctil para móviles
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

    // Page Visibility API - pausar cuando no está visible
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

    // Redimensionamiento con debounce
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles.forEach(particle => particle.reset());
      }, 200);
    });

    // Manejo de scroll para navbar (solo si existe)
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

    // ==================== INICIAR ====================
    initParticles();
    animationFrame = requestAnimationFrame(animate);
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticleSystem);
  } else {
    initParticleSystem();
  }
})();