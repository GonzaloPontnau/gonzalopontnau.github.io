/**
 * Gestión del menú desplegable para seleccionar versión del CV
 */
document.addEventListener("DOMContentLoaded", function() {
  const cvSelector = document.getElementById('cv-selector');
  const cvOptionsMenu = document.getElementById('cv-options-menu');

  if (cvSelector && cvOptionsMenu) {
    // Abrir/cerrar el menú al hacer click en el selector
    cvSelector.addEventListener('click', function(event) {
      event.preventDefault();
      const isExpanded = cvSelector.getAttribute('aria-expanded') === 'true';
      
      // Alternar la visibilidad del menú
      cvOptionsMenu.classList.toggle('show');
      
      // Actualizar el atributo aria-expanded para accesibilidad
      cvSelector.setAttribute('aria-expanded', !isExpanded);
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener('click', function(event) {
      if (!cvSelector.contains(event.target) && !cvOptionsMenu.contains(event.target)) {
        cvOptionsMenu.classList.remove('show');
        cvSelector.setAttribute('aria-expanded', 'false');
      }
    });

    // Permitir navegación con teclado para accesibilidad
    cvSelector.addEventListener('keydown', function(event) {
      // Abrir el menú con Enter o Space
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const isExpanded = cvSelector.getAttribute('aria-expanded') === 'true';
        cvOptionsMenu.classList.toggle('show');
        cvSelector.setAttribute('aria-expanded', !isExpanded);
      }
      
      // Cerrar con Escape
      if (event.key === 'Escape' && cvOptionsMenu.classList.contains('show')) {
        cvOptionsMenu.classList.remove('show');
        cvSelector.setAttribute('aria-expanded', 'false');
        cvSelector.focus();
      }
    });

    // Navegación por teclado dentro del menú
    cvOptionsMenu.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        cvOptionsMenu.classList.remove('show');
        cvSelector.setAttribute('aria-expanded', 'false');
        cvSelector.focus();
      }
    });
  }
});