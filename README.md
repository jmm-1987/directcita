# DirectCita - Panel de Control

Una web estática moderna que permite visualizar y controlar aplicaciones web embebidas en dos contenedores separados: uno para la versión móvil y otro para el panel de control en tamaño PC.

## Características

- 🎨 **Diseño moderno y responsive** con gradientes y animaciones
- 📱 **Contenedor móvil** con simulación de dispositivo móvil
- 🖥️ **Panel de control desktop** para gestión completa
- ⚡ **Carga rápida** y optimizada
- 🎯 **Interactividad** con efectos hover y animaciones
- ⌨️ **Atajos de teclado** para navegación rápida

## Estructura del Proyecto

```
directcita/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript
├── logo.png           # Logo de la aplicación (añadir)
└── README.md          # Este archivo
```

## Configuración

### 1. URLs de las Aplicaciones

Edita el archivo `index.html` y actualiza las URLs de los iframes:

```html
<!-- Para la aplicación móvil -->
<iframe src="https://tu-app-movil.com" title="Aplicación Móvil"></iframe>

<!-- Para el panel de control -->
<iframe src="https://tu-panel-control.com" title="Panel de Control"></iframe>
```

### 2. Logo

Añade tu logo:
- Coloca el archivo `logo.png` en la raíz del proyecto
- O actualiza la ruta en `index.html` línea 15

### 3. Personalización de Colores

Edita `styles.css` para cambiar los colores del tema:

```css
body {
    background: linear-gradient(135deg, #tu-color-1 0%, #tu-color-2 100%);
}
```

## Uso

### Atajos de Teclado

- `Ctrl/Cmd + 1`: Enfocar aplicación móvil
- `Ctrl/Cmd + 2`: Enfocar panel de control
- `F5`: Recargar ambos iframes

### Funciones JavaScript Disponibles

```javascript
// Actualizar URLs de los iframes
DirectCitaApp.updateIframeUrls('nueva-url-movil', 'nueva-url-desktop');

// Redimensionar iframes
DirectCitaApp.resizeIframes();

// Mostrar información de estado
DirectCitaApp.showStatusInfo();
```

## Responsive Design

La web se adapta automáticamente a diferentes tamaños de pantalla:

- **Desktop (>1200px)**: Layout de dos columnas
- **Tablet (768px-1200px)**: Layout de una columna
- **Móvil (<768px)**: Layout optimizado para móviles

## Despliegue

### Opción 1: Servidor Local

```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve .

# Con PHP
php -S localhost:8000
```

### Opción 2: Servicios de Hosting

- **GitHub Pages**: Sube a un repositorio y activa GitHub Pages
- **Netlify**: Arrastra la carpeta al dashboard de Netlify
- **Vercel**: Conecta tu repositorio a Vercel

### Opción 3: Servidor Web

Sube los archivos a tu servidor web (Apache, Nginx, etc.)

## Personalización Avanzada

### Cambiar Tema

```javascript
// Cambiar a tema oscuro
document.body.classList.add('dark-theme');

// Cambiar a tema claro
document.body.classList.remove('dark-theme');
```

### Añadir Nuevas Funcionalidades

Edita `script.js` para añadir nuevas características:

```javascript
// Ejemplo: Añadir notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'notification';
    document.body.appendChild(notification);
}
```

## Solución de Problemas

### Iframes No Se Cargan

1. Verifica que las URLs sean correctas
2. Asegúrate de que los dominios permitan ser embebidos
3. Revisa la consola del navegador para errores

### Problemas de CORS

Si las aplicaciones no permiten ser embebidas:

1. Configura los headers CORS en el servidor de las aplicaciones
2. O usa un proxy para evitar restricciones de CORS

### Problemas de Rendimiento

1. Optimiza las imágenes
2. Minimiza los archivos CSS y JS
3. Usa un CDN para recursos externos

## Tecnologías Utilizadas

- HTML5
- CSS3 (Grid, Flexbox, Animaciones)
- JavaScript ES6+
- Diseño responsive
- Gradientes CSS

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Soporte

Para soporte técnico o preguntas, contacta con el equipo de desarrollo.

---

**DirectCita** - Panel de Control Web Estático 