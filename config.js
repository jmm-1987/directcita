// Configuración de DirectCita Panel de Control
const DirectCitaConfig = {
    // URLs de las aplicaciones
    urls: {
        mobile: 'https://modelo-barber.onrender.com',  // BarberShop app móvil
        desktop: 'https://modelo-barber.onrender.com/panel'  // BarberShop panel de control
    },
    
    // Configuración del logo
    logo: {
        src: 'logo.png',  // Ruta del logo
        alt: 'DirectCita Logo',
        text: 'DirectCita'  // Texto del logo
    },
    
    // Configuración de títulos de contenedores
    titles: {
        mobile: 'BarberShop App',
        desktop: 'BarberShop Panel'
    },
    
    // Configuración de colores
    colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#f8f9fa',
        text: '#333',
        white: '#ffffff'
    },
    
    // Configuración de dimensiones
    dimensions: {
        mobile: {
            width: '400px',
            height: '600px'
        },
        desktop: {
            width: '100%',
            height: '600px'
        }
    },
    
    // Configuración de animaciones
    animations: {
        enabled: true,
        duration: '0.3s',
        easing: 'ease'
    },
    
    // Configuración de atajos de teclado
    shortcuts: {
        mobile: 'Ctrl+1',
        desktop: 'Ctrl+2',
        reload: 'F5'
    },
    
    // Configuración de responsive
    responsive: {
        breakpoints: {
            mobile: 768,
            tablet: 1200
        }
    },
    
    // Configuración de notificaciones
    notifications: {
        enabled: true,
        duration: 3000,
        position: 'top-right'
    },
    
    // Configuración de carga
    loading: {
        showIndicator: true,
        fallbackText: 'Cargando...'
    },
    
    // Configuración de seguridad
    security: {
        allowCrossOrigin: true,
        sandbox: 'allow-same-origin allow-scripts allow-forms allow-popups'
    }
};

// Función para aplicar la configuración
function applyConfig() {
    // Aplicar URLs
    const mobileIframe = document.querySelector('.mobile-iframe');
    const desktopIframe = document.querySelector('.desktop-iframe');
    
    if (mobileIframe && DirectCitaConfig.urls.mobile) {
        mobileIframe.src = DirectCitaConfig.urls.mobile;
    }
    
    if (desktopIframe && DirectCitaConfig.urls.desktop) {
        desktopIframe.src = DirectCitaConfig.urls.desktop;
    }
    
    // Aplicar configuración del logo
    const logoImg = document.querySelector('.logo-img');
    const logoText = document.querySelector('.logo-text');
    
    if (logoImg) {
        logoImg.src = DirectCitaConfig.logo.src;
        logoImg.alt = DirectCitaConfig.logo.alt;
    }
    
    if (logoText) {
        logoText.textContent = DirectCitaConfig.logo.text;
    }
    
    // Aplicar colores
    document.documentElement.style.setProperty('--primary-color', DirectCitaConfig.colors.primary);
    document.documentElement.style.setProperty('--secondary-color', DirectCitaConfig.colors.secondary);
    document.documentElement.style.setProperty('--accent-color', DirectCitaConfig.colors.accent);
    document.documentElement.style.setProperty('--text-color', DirectCitaConfig.colors.text);
    document.documentElement.style.setProperty('--white-color', DirectCitaConfig.colors.white);
    
    // Aplicar dimensiones
    const mobileFrame = document.querySelector('.mobile-frame');
    const desktopFrame = document.querySelector('.desktop-frame');
    
    if (mobileFrame) {
        mobileFrame.style.maxWidth = DirectCitaConfig.dimensions.mobile.width;
        mobileFrame.style.height = DirectCitaConfig.dimensions.mobile.height;
    }
    
    if (desktopFrame) {
        desktopFrame.style.width = DirectCitaConfig.dimensions.desktop.width;
        desktopFrame.style.height = DirectCitaConfig.dimensions.desktop.height;
    }
    
    // Aplicar títulos de contenedores
    const mobileTitle = document.querySelector('.mobile-container h2');
    const desktopTitle = document.querySelector('.desktop-container h2');
    
    if (mobileTitle && DirectCitaConfig.titles.mobile) {
        mobileTitle.textContent = DirectCitaConfig.titles.mobile;
    }
    
    if (desktopTitle && DirectCitaConfig.titles.desktop) {
        desktopTitle.textContent = DirectCitaConfig.titles.desktop;
    }
    
    // Aplicar configuración de seguridad
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.setAttribute('sandbox', DirectCitaConfig.security.sandbox);
    });
}

// Función para actualizar configuración dinámicamente
function updateConfig(newConfig) {
    Object.assign(DirectCitaConfig, newConfig);
    applyConfig();
}

// Función para obtener configuración
function getConfig() {
    return DirectCitaConfig;
}

// Función para validar configuración
function validateConfig() {
    const errors = [];
    
    if (!DirectCitaConfig.urls.mobile) {
        errors.push('URL de aplicación móvil no configurada');
    }
    
    if (!DirectCitaConfig.urls.desktop) {
        errors.push('URL de panel de control no configurada');
    }
    
    if (!DirectCitaConfig.logo.src) {
        errors.push('Logo no configurado');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Exportar configuración para uso global
window.DirectCitaConfig = DirectCitaConfig;
window.applyConfig = applyConfig;
window.updateConfig = updateConfig;
window.getConfig = getConfig;
window.validateConfig = validateConfig;

// Aplicar configuración cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const validation = validateConfig();
    
    if (!validation.isValid) {
        console.warn('Configuración incompleta:', validation.errors);
    }
    
    applyConfig();
}); 