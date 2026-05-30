/**
 * Animación de resaltado de texto (Fibrón Fluo) con GSAP ScrollTrigger
 * 
 * Optimización:
 * Para evitar errores de posicionamiento con elementos inline (strong, span),
 * agrupamos los elementos por sus contenedores de bloque padres (p, li, h3, etc.)
 * y usamos dichos contenedores estáticos como triggers de la animación.
 */

// Almacén para los triggers de ScrollTrigger activos
let activeHighlightTriggers = [];
// Almacén para el IntersectionObserver en modo fallback
let activeHighlightObserver = null;

/**
 * Agrupa los elementos a resaltar por su contenedor de bloque padre
 * @returns {Map<Element, Element[]>} Mapa que asocia cada contenedor padre con sus hijos a resaltar
 */
function getParentContainersMap() {
  const elements = document.querySelectorAll('.main-container strong, .linkedin-more-container strong, .highlight, .tech-highlight');
  const parentMap = new Map();

  elements.forEach(el => {
    // Evitar elementos dentro de la navegación o menús
    if (el.closest('.navbar, .mobile-sidebar, .language-switcher, .social-nav')) {
      return;
    }

    // Encontrar el contenedor de bloque más cercano
    const parent = el.closest('p, li, h3, h4, .linkedin-badge-custom');
    if (parent) {
      if (!parentMap.has(parent)) {
        parentMap.set(parent, []);
      }
      parentMap.get(parent).push(el);
    }
  });

  return parentMap;
}

/**
 * Inicializa la animación usando GSAP ScrollTrigger (Online / Recomendado)
 */
function initHighlightAnimationsWithGSAP() {
  // Registrar el plugin de forma explícita
  gsap.registerPlugin(ScrollTrigger);

  // Limpiar triggers anteriores
  if (activeHighlightTriggers.length > 0) {
    activeHighlightTriggers.forEach(trigger => trigger.kill());
    activeHighlightTriggers = [];
  }

  const parentMap = getParentContainersMap();
  console.log(`[GSAP ScrollTrigger] Inicializando resaltado para ${parentMap.size} contenedores de bloque.`);

  parentMap.forEach((children, parent) => {
    // Resetear clase active en los hijos
    children.forEach(child => child.classList.remove('active'));

    // Crear ScrollTrigger usando el elemento de bloque padre como trigger
    const trigger = ScrollTrigger.create({
      trigger: parent,
      start: "top 78%", // Se activa cuando el contenedor entra un 22% en el viewport (muy visible)
      onEnter: () => {
        children.forEach(child => child.classList.add('active'));
      },
      // Si el usuario sube, quitamos la clase active para que la animación vuelva a suceder
      onLeaveBack: () => {
        children.forEach(child => child.classList.remove('active'));
      },
      // Verificar si ya pasó el punto de inicio en la carga inicial o al refrescar
      onRefresh: (self) => {
        if (self.progress > 0) {
          children.forEach(child => child.classList.add('active'));
        } else {
          children.forEach(child => child.classList.remove('active'));
        }
      }
    });

    activeHighlightTriggers.push(trigger);
  });
}

/**
 * Inicializa la animación usando IntersectionObserver (Offline / Fallback)
 */
function initHighlightAnimationsWithObserver() {
  // Limpiar observer anterior
  if (activeHighlightObserver) {
    activeHighlightObserver.disconnect();
  }

  const parentMap = getParentContainersMap();
  console.log(`[Observer Fallback] Inicializando resaltado para ${parentMap.size} contenedores de bloque.`);

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -22% 0px', // Equivale aproximadamente a top 78%
    threshold: 0.1
  };

  activeHighlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const parent = entry.target;
      const children = parentMap.get(parent);
      if (!children) return;

      if (entry.isIntersecting) {
        children.forEach(child => child.classList.add('active'));
      } else {
        if (entry.boundingClientRect.top > 0) {
          // Si el elemento está por debajo del área visible (usuario scrolleó hacia arriba): quitar resaltado
          children.forEach(child => child.classList.remove('active'));
        } else {
          // Si el elemento ya pasó hacia arriba del viewport: mantener/añadir resaltado
          children.forEach(child => child.classList.add('active'));
        }
      }
    });
  }, observerOptions);

  parentMap.forEach((children, parent) => {
    children.forEach(child => child.classList.remove('active'));
    activeHighlightObserver.observe(parent);
  });
}

/**
 * Función principal para iniciar las animaciones
 */
function startHighlight() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // Registrar el plugin antes de iniciar
    gsap.registerPlugin(ScrollTrigger);
    initHighlightAnimationsWithGSAP();
    // Forzar actualización de ScrollTrigger después de que todo se haya cargado y posicionado
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  } else {
    initHighlightAnimationsWithObserver();
  }
}

// Inicialización en el evento 'load' de window
// Esto asegura que todas las imágenes y hojas de estilo estén completamente cargadas,
// lo cual garantiza que los cálculos de coordenadas de ScrollTrigger sean 100% correctos.
if (document.readyState === "complete") {
  startHighlight();
} else {
  window.addEventListener('load', startHighlight);
}

// Escuchar cambios de idioma para re-inicializar
document.addEventListener("languageChanged", () => {
  console.log("Cambio de idioma detectado. Re-inicializando animaciones...");
  setTimeout(() => {
    startHighlight();
  }, 100);
});
