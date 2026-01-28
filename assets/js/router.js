document.addEventListener('DOMContentLoaded', () => {
    // Interceptar clicks en enlaces locales
    document.body.addEventListener('click', e => {
        // Buscar el enlace más cercano (por si clickea en un span dentro del a)
        const link = e.target.closest('a');

        // Si no es un enlace, o es externo, o abre en nueva pestaña -> ignorar
        if (!link ||
            !link.href.startsWith(window.location.origin) ||
            link.target === '_blank' ||
            link.getAttribute('href').endsWith('.pdf') // Dejar que los PDFs se abran normal
        ) {
            return;
        }

        e.preventDefault();
        const url = link.href;

        // Navegar
        navigateTo(url);
    });

    // Manejar botones atrás/adelante del navegador
    window.addEventListener('popstate', () => {
        navigateTo(window.location.href, false);
    });
});

async function navigateTo(url, pushToHistory = true) {
    // 1. Mostrar estado de carga (opcional)
    const container = document.querySelector('.container');
    container.style.opacity = '0.5';
    container.style.transition = 'opacity 0.2s ease';

    try {
        // 2. Fetch del contenido
        const response = await fetch(url);
        const html = await response.text();

        // 3. Parsear el HTML recibido
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // 4. Extraer el nuevo contenido
        const newContent = doc.querySelector('.container').innerHTML;
        const newTitle = doc.title;

        // 5. Reemplazar contenido
        document.querySelector('.container').innerHTML = newContent;
        document.title = newTitle;

        // 6. Actualizar URL
        if (pushToHistory) {
            window.history.pushState({}, '', url);
        }

        // 7. Actualizar menú activo
        updateActiveLink(url);

        // 8. Reinicializar scripts si es necesario
        // Si cargamos la página de exámenes, ejecutar la lógica de renderizado
        if (url.includes('examens.html') && window.loadExams) {
            window.loadExams();
        }

    } catch (error) {
        console.error('Error cargando la página:', error);
        window.location.href = url; // Fallback: carga normal si falla AJAX
    } finally {
        // 9. Restaurar opacidad
        container.style.opacity = '1';
    }
}

function updateActiveLink(url) {
    const currentPath = new URL(url).pathname;
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        // Normalizar paths para comparar (quitar / al principio si es necesario)
        const linkPath = new URL(link.href).pathname;

        if (linkPath === currentPath || (currentPath.endsWith('/') && linkPath.endsWith('index.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Cerrar menú móvil si está abierto
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
}
