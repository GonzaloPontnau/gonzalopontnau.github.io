/**
 * Sistema de animaciones con IntersectionObserver
 * Optimiza el rendimiento activando las animaciones solo cuando los elementos están visibles
 */
document.addEventListener("DOMContentLoaded", function() {
  // Seleccionar todos los elementos con clases de animación
  const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-in-right, .slide-in-left, .zoom-in, .stagger-item'
  );
  
  // Si no hay elementos para animar, terminamos
  if (animatedElements.length === 0) return;

  // Opciones para el IntersectionObserver
  // rootMargin positivo para activar ligeramente antes que el elemento entre en la pantalla
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px 0px -15% 0px', // margen para activar un poco antes
    threshold: 0.1 // 10% del elemento visible es suficiente para activar
  };

  // Crear el observador de intersección
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Si el elemento es visible
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Añadir la clase 'show' para activar la animación
        element.classList.add('show');
        
        // Una vez activada la animación, ya no necesitamos observar el elemento
        observer.unobserve(element);
      }
    });
  }, observerOptions);

  // Empezar a observar cada elemento
  animatedElements.forEach(element => {
    observer.observe(element);
  });

  // Para elementos que ya deberían ser visibles al cargar la página (por encima del fold)
  // realizamos una verificación inicial
  checkInitialVisibility();

  function checkInitialVisibility() {
    animatedElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      // Si el elemento ya está en la pantalla al cargar
      if (rect.top <= window.innerHeight * 0.85) {
        element.classList.add('show');
        observer.unobserve(element);
      }
    });
  }

  // Optimización especial para la imagen de perfil
  const profileImage = document.getElementById('profile-image');
  if (profileImage) {
    // Verificar si la imagen ya está cargada
    if (profileImage.complete && profileImage.naturalHeight > 0) {
      profileImage.style.opacity = '1';
    } else {
      // Si no está cargada, esperamos a que se cargue completamente
      profileImage.addEventListener('load', function() {
        this.style.opacity = '1';
      });
      
      // Timeout de seguridad en caso de error
      setTimeout(() => {
        if (profileImage.style.opacity !== '1') {
          profileImage.style.opacity = '1';
        }
      }, 2000);
    }
  }

  // Manejar animaciones para elementos que no usan el observador
  // (por ejemplo, elementos que siempre deberían animarse al cargar)
  const immediateElements = document.querySelectorAll('.animate-immediate');
  
  if (immediateElements.length > 0) {
    immediateElements.forEach(element => {
      // Pequeño retraso para asegurar que los elementos se animan después de estar completamente cargados
      setTimeout(() => {
        element.classList.add('show');
      }, 100);
    });
  }
});