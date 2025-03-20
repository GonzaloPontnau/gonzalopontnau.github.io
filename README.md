# Mi Portafolio Web

Un portafolio web personal construido con Django y diseño responsive, para mostrar mis proyectos, habilidades y experiencia profesional.

## Características

- Diseño responsivo con animaciones y efectos visuales
- Secciones para información personal, proyectos, educación y experiencia
- Formulario de contacto funcional con EmailJS
- Animaciones con CSS puro
- Estilo moderno con gradientes y efectos visuales

## Tecnologías Utilizadas

- **Backend**: Django
- **Frontend**: HTML5, CSS3, JavaScript
- **Base de Datos**: SQLite (desarrollo)
- **Formulario de Contacto**: EmailJS
- **Despliegue**: Vercel

## Estructura del Proyecto

```
mi-portafolio-web/myPortfolio/
│
├── .env                    # Variables de entorno (claves API, configuración email)
├── .gitignore              # Archivos ignorados por Git
├── README.md               # Documentación del proyecto
├── requirements.txt        # Dependencias del proyecto Django
├── index.html              # Archivo HTML principal del portafolio
│
├── assets/                 # Archivos estáticos
│   ├── css/
│   │   └── style.css       # Estilos CSS del sitio
│   │
│   ├── favicon/            # Iconos del sitio
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   └── site.webmanifest
│   │
│   └── images/             # Imágenes del portafolio
│       ├── CV.pdf 
│       ├── demo-cryptoAPI-python.gif
│       ├── demo-money-manager.gif
│       ├── detector-linea.gif
│       ├── fundamentos-GO.pdf 
│       ├── go-rest-api.png
│       ├── imagenPerfil.png
│       ├── pdp.jpg
│       └── RESTful-API-java.jpg
```

## Instalación y Ejecución

1. Clonar el repositorio
2. Crear un entorno virtual:
   ```
   python -m venv venv
   venv\Scripts\activate  # En Windows
   source venv/bin/activate  # En Linux/Mac
   ```
3. Instalar dependencias:
   ```
   pip install -r requirements.txt
   ```
   
   Para desarrollo solo se necesitan los paquetes básicos:
   ```
   pip install Django==5.1.6 Pillow==10.1.0 python-dotenv==1.0.1
   ```

4. Configurar variables de entorno:
   - Crea un archivo `.env` en el directorio raíz con las siguientes variables:
   ```
   DJANGO_DEBUG=True
   DJANGO_SECRET_KEY=tu_clave_secreta
   EMAIL_HOST_USER=tu_email
   EMAIL_HOST_PASSWORD=tu_contraseña_de_aplicacion
   TU_CLAVE_PUBLICA_EMAILJS=tu_clave_emailjs
   TU_SERVICE_ID=tu_service_id_emailjs
   TU_TEMPLATE_ID=tu_template_id_emailjs
   ```

5. Ejecutar el servidor de desarrollo:
   ```
   python manage.py runserver
   ```

## Configuración del Formulario de Contacto

El formulario de contacto utiliza EmailJS para enviar correos electrónicos sin necesidad de backend:

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/)
2. Configura un servicio de email y una plantilla
3. Obtén tus credenciales (Public Key, Service ID, Template ID)
4. Coloca estas credenciales en tu archivo `.env`

## Despliegue

Para despliegue en producción, asegúrate de instalar todos los paquetes, incluidos whitenoise y gunicorn:
```
pip install -r requirements.txt
```

Y configurar las variables de entorno apropiadas:
- `DJANGO_SECRET_KEY`: Una clave secreta segura
- `DJANGO_DEBUG`: "False" para producción
- Variables para EmailJS y otras credenciales necesarias

## Responsive Design

El diseño está optimizado para diferentes tamaños de pantalla:
- Escritorio
- Tablet 
- Móvil

Incluye ajustes específicos para dispositivos con orientación landscape y pantallas muy pequeñas.
