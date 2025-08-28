/**
 * Sistema de animación de partículas
 * Optimizado para carga instantánea
 */
(function() {
  // Función que se ejecuta inmediatamente o cuando el DOM esté listo
  function initParticleSystem() {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) {
      // Si el canvas no existe aún, intentar de nuevo en el próximo frame
      if (document.readyState === 'loading') {
        setTimeout(initParticleSystem, 1);
        return;
      }
      return;
    }

    const ctx = canvas.getContext("2d");

    // Configuración básica inmediata
    const isMobile = window.innerWidth <= 767;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Limpiar canvas inmediatamente con el color de fondo
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Estado de la animación
    let animationRunning = true;
    let animationFrame = null;

    // Número de partículas optimizado para dispositivos móviles
    const particleCount = isMobile ? 50 : 100;
    const particles = [];

    // Clase Partícula mejorada
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2.5 + 0.5;
        this.speed = Math.random() * 0.5 + 0.2;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.color = Math.random() > 0.7
          ? 'rgba(120, 180, 255,' // Azul suave (30%)
          : (Math.random() > 0.5
            ? 'rgba(220, 220, 230,' // Gris azulado muy claro (35%)
            : 'rgba(200, 200, 210,'); // Gris más neutro (35%)
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // Sombra sutil para efecto de brillo
        ctx.shadowBlur = this.radius * 1.5;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.2)';
        
        // Color con opacidad personalizada
        ctx.fillStyle = `${this.color} ${this.alpha})`;
        ctx.fill();
        
        // Restaurar configuración de sombra
        ctx.shadowBlur = 0;
      }

      update() {
        this.y -= this.speed;
        if (this.y < -10) this.reset();
      }
    }

    // Inicializar partículas inmediatamente
    function initParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    // Función de animación principal con RequestAnimationFrame
    function animate() {
      if (!animationRunning) return;

      // Limpiar con el color de fondo en lugar de clearRect para mejor rendimiento
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrame = requestAnimationFrame(animate);
    }

    // Implementación de Page Visibility API para pausar cuando la página no está visible
    function handleVisibilityChange() {
      if (document.hidden) {
        // Pausar la animación cuando la página no es visible
        animationRunning = false;
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }
      } else {
        // Reanudar la animación cuando la página vuelve a ser visible
        if (!animationRunning) {
          animationRunning = true;
          animationFrame = requestAnimationFrame(animate);
        }
      }
    }

    // Optimización para redimensionamiento con debounce
    function handleResize() {
      let resizeTimeout;
      return function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          // Redesplegar las partículas en el nuevo tamaño
          particles.forEach(particle => particle.reset());
        }, 200);
      };
    }

    // Registrar event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize());

    // Inicializar y comenzar la animación inmediatamente
    initParticles();
    
    // Render inicial inmediato
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => particle.draw());
    
    // Comenzar animación
    requestAnimationFrame(animate);

    // Manejar evento de scroll para la navbar (solo si existe)
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      let scrollTimeout;
      window.addEventListener("scroll", function() {
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
  }

  // Ejecutar inmediatamente si el DOM ya está listo, sino esperar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticleSystem);
  } else {
    initParticleSystem();
  }
})();