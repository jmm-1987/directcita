// Funcionalidad para la web estática
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener referencias a los iframes
    const mobileIframe = document.querySelector('.mobile-iframe');
    const desktopIframe = document.querySelector('.desktop-iframe');
    
    // Función para mostrar estado de carga
    function showLoading(iframe) {
        const frame = iframe.parentElement;
        frame.innerHTML = '<div class="loading">Cargando...</div>';
    }
    
    // Función para manejar errores de carga
    function handleIframeError(iframe, fallbackUrl) {
        iframe.onerror = function() {
            console.log('Error cargando iframe');
            iframe.src = fallbackUrl || 'about:blank';
        };
    }
    
    // Función para actualizar URLs de los iframes
    function updateIframeUrls(mobileUrl, desktopUrl) {
        if (mobileUrl && mobileIframe) {
            mobileIframe.src = mobileUrl;
        }
        
        if (desktopUrl && desktopIframe) {
            desktopIframe.src = desktopUrl;
        }
    }
    
    // Función para redimensionar iframes automáticamente
    function resizeIframes() {
        const mobileFrame = document.querySelector('.mobile-frame');
        const desktopFrame = document.querySelector('.desktop-frame');
        
        if (window.innerWidth <= 768) {
            // En móviles, ajustar altura
            mobileFrame.style.height = '400px';
            desktopFrame.style.height = '400px';
        } else {
            // En desktop, altura completa
            mobileFrame.style.height = '600px';
            desktopFrame.style.height = '600px';
        }
    }
    
    // Event listener para redimensionamiento
    window.addEventListener('resize', resizeIframes);
    
    // Inicializar redimensionamiento
    resizeIframes();
    
    // Función para añadir efectos de hover mejorados
    function addHoverEffects() {
        const containers = document.querySelectorAll('.mobile-container, .desktop-container');
        
        containers.forEach(container => {
            container.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            container.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Función para manejar la comunicación entre iframes
    function setupIframeCommunication() {
        // Escuchar mensajes de los iframes
        window.addEventListener('message', function(event) {
            // Aquí puedes manejar la comunicación entre iframes
            console.log('Mensaje recibido:', event.data);
        });
    }
    
    // Función para mostrar información de estado
    function showStatusInfo() {
        const statusDiv = document.createElement('div');
        statusDiv.className = 'status-info';
        statusDiv.innerHTML = `
            <div style="position: fixed; top: 10px; right: 10px; background: rgba(0,0,0,0.8); color: white; padding: 10px; border-radius: 5px; font-size: 12px; z-index: 1000;">
                <div>Estado: Conectado</div>
                <div>Última actualización: ${new Date().toLocaleTimeString()}</div>
            </div>
        `;
        document.body.appendChild(statusDiv);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            statusDiv.style.opacity = '0';
            setTimeout(() => statusDiv.remove(), 500);
        }, 3000);
    }
    
    // Función para añadir teclas de acceso rápido
    function addKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + 1: Enfocar aplicación móvil
            if ((e.ctrlKey || e.metaKey) && e.key === '1') {
                e.preventDefault();
                mobileIframe.focus();
            }
            
            // Ctrl/Cmd + 2: Enfocar panel de control
            if ((e.ctrlKey || e.metaKey) && e.key === '2') {
                e.preventDefault();
                desktopIframe.focus();
            }
            
            // F5: Recargar ambos iframes
            if (e.key === 'F5') {
                e.preventDefault();
                mobileIframe.src = mobileIframe.src;
                desktopIframe.src = desktopIframe.src;
            }
        });
    }
    
    // Función para añadir indicadores de carga
    function addLoadingIndicators() {
        const iframes = document.querySelectorAll('iframe');
        
        iframes.forEach(iframe => {
            iframe.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            iframe.addEventListener('loadstart', function() {
                this.style.opacity = '0.5';
            });
        });
    }
    
    // Función para manejar el selector de vista
    function setupViewSelector() {
        const viewButtons = document.querySelectorAll('.view-btn');
        const desktopFrame = document.querySelector('.desktop-frame');
        
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover clase active de todos los botones
                viewButtons.forEach(btn => btn.classList.remove('active'));
                
                // Añadir clase active al botón clickeado
                this.classList.add('active');
                
                const view = this.getAttribute('data-view');
                
                // Cambiar el estilo del frame según la vista
                if (view === 'mobile') {
                    desktopFrame.style.maxWidth = '350px';
                    desktopFrame.style.margin = '0 auto';
                    desktopFrame.style.borderRadius = '20px';
                    desktopFrame.style.position = 'relative';
                } else {
                    desktopFrame.style.maxWidth = '100%';
                    desktopFrame.style.margin = '0';
                    desktopFrame.style.borderRadius = '15px';
                    desktopFrame.style.position = 'relative';
                }
            });
        });
    }
    
    // Inicializar todas las funcionalidades
    function init() {
        addHoverEffects();
        setupIframeCommunication();
        addKeyboardShortcuts();
        addLoadingIndicators();
        setupViewSelector();
        showStatusInfo();
        
        // Configurar URLs de ejemplo (cambiar por las URLs reales)
        // updateIframeUrls('https://tu-app-movil.com', 'https://tu-panel-control.com');
    }
    
    // Ejecutar inicialización
    init();
    
    // Exponer funciones para uso externo
    window.DirectCitaApp = {
        updateIframeUrls,
        resizeIframes,
        showStatusInfo
    };
    
});

// Función para detectar si los iframes están cargados
function checkIframeStatus() {
    const iframes = document.querySelectorAll('iframe');
    let loadedCount = 0;
    
    iframes.forEach(iframe => {
        try {
            // Intentar acceder al contenido del iframe
            if (iframe.contentWindow && iframe.contentWindow.document) {
                loadedCount++;
            }
        } catch (e) {
            // Error de CORS - iframe no accesible
            console.log('Iframe no accesible por CORS');
        }
    });
    
    return loadedCount === iframes.length;
}

// Función para recargar iframes
function reloadIframes() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.src = iframe.src;
    });
}

// Función para cambiar el tema (claro/oscuro)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
} 