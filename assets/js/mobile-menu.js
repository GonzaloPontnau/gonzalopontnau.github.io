// Mobile Sidebar Menu JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarOverlay = document.getElementById('mobile-sidebar-overlay');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    // Función para abrir el sidebar
    function openSidebar() {
        mobileSidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        mobileMenuBtn.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }

    // Función para cerrar el sidebar
    function closeSidebar() {
        mobileSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restaurar scroll del body
    }

    // Toggle del sidebar al hacer click en el botón hamburguesa
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            if (mobileSidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    // Cerrar sidebar al hacer click en el botón de cierre
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', closeSidebar);
    }

    // Cerrar sidebar al hacer click en el overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Cerrar sidebar al hacer click en cualquier link de navegación
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            closeSidebar();

            // Smooth scroll a la sección
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300); // Esperar a que se cierre el sidebar
                }
            }
        });
    });

    // Cerrar sidebar al presionar la tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileSidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    // Prevenir scroll en el sidebar cuando se alcanza el final
    if (mobileSidebar) {
        mobileSidebar.addEventListener('touchmove', function (e) {
            e.stopPropagation();
        }, { passive: false });
    }
});
