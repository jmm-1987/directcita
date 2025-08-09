# Configuración del Formulario de Contacto - DirectCita

## Opción 1: EmailJS (Recomendado para empezar rápido)

### Pasos para configurar EmailJS:

1. **Crear cuenta en EmailJS**
   - Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
   - Regístrate para una cuenta gratuita

2. **Configurar el servicio de email**
   - En el dashboard de EmailJS, ve a "Email Services"
   - Añade un nuevo servicio (Gmail, Outlook, etc.)
   - Guarda el **Service ID** que se genera

3. **Crear un template de email**
   - Ve a "Email Templates"
   - Crea un nuevo template con este contenido:

```html
Nueva solicitud de información de DirectCita:

Nombre: {{from_name}}
Negocio: {{business_name}}
Método de contacto: {{contact_method}}
Email: {{contact_email}}
Teléfono: {{contact_phone}}

Fecha: {{date}}
```

4. **Obtener las credenciales**
   - Ve a "Account" → "API Keys"
   - Copia tu **Public Key**

5. **Configurar el archivo emailjs-config.js**
   - Abre el archivo `emailjs-config.js`
   - Reemplaza los valores con tus credenciales:

```javascript
const EmailJSConfig = {
    publicKey: "TU_PUBLIC_KEY_REAL",
    serviceId: "TU_SERVICE_ID_REAL", 
    templateId: "TU_TEMPLATE_ID_REAL",
    destinationEmail: "jomma.tech@gmail.com"
};
```

### Estructura de archivos actualizada:

```
directcita/
├── index.html (actualizado con EmailJS)
├── script.js (actualizado con lógica de envío)
├── emailjs-config.js (nuevo - configuración)
├── config.js
├── styles.css
└── CONFIGURACION_FORMULARIO.md (este archivo)
```

## Opción 2: Backend propio (Para más control)

Si prefieres tener más control, puedes crear un backend simple:

### Usando Node.js + Express:

```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
    try {
        // Configurar transporter de email
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: 'tu-email@gmail.com',
                pass: 'tu-password-app'
            }
        });

        const mailOptions = {
            from: req.body.email,
            to: 'jomma.tech@gmail.com',
            subject: 'Nueva solicitud DirectCita',
            text: `
                Nombre: ${req.body.name}
                Negocio: ${req.body.business}
                Método: ${req.body.contactMethod}
                Email: ${req.body.email}
                Teléfono: ${req.body.phone}
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});
```

### Usando PHP:

```php
<?php
// contact.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $to = 'jomma.tech@gmail.com';
    $subject = 'Nueva solicitud DirectCita';
    $message = "
        Nombre: {$data['name']}
        Negocio: {$data['business']}
        Método: {$data['contactMethod']}
        Email: {$data['email']}
        Teléfono: {$data['phone']}
    ";
    
    $headers = 'From: noreply@directcita.com';
    
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Error enviando email']);
    }
}
?>
```

## Opción 3: Servicios de formularios (Más simple)

### Formspree:
- Ve a [https://formspree.io/](https://formspree.io/)
- Crea un formulario
- Usa el endpoint que te proporcionan

### Netlify Forms:
- Si usas Netlify, añade `netlify` al formulario
- Los datos se envían automáticamente

## Pruebas del formulario

Para probar que el formulario funciona:

1. **Abre la consola del navegador** (F12)
2. **Llena el formulario** con datos de prueba
3. **Envía el formulario**
4. **Verifica en la consola** que no hay errores
5. **Revisa tu email** para confirmar que recibiste la solicitud

## Solución de problemas comunes

### Error: "EmailJS no está cargado"
- Verifica que la librería EmailJS esté incluida en el HTML
- Asegúrate de que la conexión a internet funcione

### Error: "Invalid API Key"
- Verifica que la Public Key sea correcta
- Asegúrate de que la cuenta de EmailJS esté activa

### Error: "Service not found"
- Verifica que el Service ID sea correcto
- Confirma que el servicio esté configurado en EmailJS

### Error: "Template not found"
- Verifica que el Template ID sea correcto
- Confirma que el template esté publicado en EmailJS

## Seguridad

- **Nunca expongas claves privadas** en el frontend
- **Usa HTTPS** en producción
- **Valida los datos** tanto en frontend como backend
- **Implementa rate limiting** para prevenir spam

## Costos

- **EmailJS**: Gratis hasta 200 emails/mes
- **Backend propio**: Costos de hosting
- **Servicios de formularios**: Varios planes disponibles
