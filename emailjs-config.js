// Configuración de EmailJS para DirectCita
const EmailJSConfig = {
    // Clave pública de EmailJS (reemplazar con tu clave real)
    publicKey: "topNg38j9LTlBzeSQ",
    
    // ID del servicio de EmailJS
    serviceId: "service_p8clbak",
    
    // ID del template de EmailJS
    templateId: "template_8dl1y4o",
    
    // Email de destino para recibir las solicitudes
    destinationEmail: "jomma.tech@gmail.com",
    
    // Configuración de notificaciones
    notifications: {
        success: "¡Información enviada con éxito! Te contactaremos pronto.",
        error: "Error al enviar la información. Por favor, inténtalo de nuevo.",
        loading: "Enviando información..."
    }
};

// Función para inicializar EmailJS
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EmailJSConfig.publicKey);
        console.log('EmailJS inicializado correctamente');
    } else {
        console.error('EmailJS no está cargado');
    }
}

// Función para enviar email
function sendContactEmail(formData) {
    return new Promise((resolve, reject) => {
        const templateParams = {
            from_name: formData.name,
            business_name: formData.business,
            contact_email: formData.email || 'No proporcionado',
            contact_phone: formData.phone || 'No proporcionado',
            contact_method: formData.contactMethod,
            to_email: EmailJSConfig.destinationEmail,
            message: `
                Nueva solicitud de información de DirectCita:
                
                Nombre: ${formData.name}
                Negocio: ${formData.business}
                Método de contacto: ${formData.contactMethod}
                ${formData.email ? `Email: ${formData.email}` : ''}
                ${formData.phone ? `Teléfono: ${formData.phone}` : ''}
                
                Fecha: ${new Date().toLocaleString('es-ES')}
            `
        };
        
        emailjs.send(EmailJSConfig.serviceId, EmailJSConfig.templateId, templateParams)
            .then(response => {
                console.log('Email enviado exitosamente:', response);
                resolve(response);
            })
            .catch(error => {
                console.error('Error enviando email:', error);
                reject(error);
            });
    });
}

// Exportar configuración
window.EmailJSConfig = EmailJSConfig;
window.initEmailJS = initEmailJS;
window.sendContactEmail = sendContactEmail;
