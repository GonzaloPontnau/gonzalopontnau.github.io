# Mi Portafolio Web

Un portafolio web personal construido con Django y diseño responsive, para mostrar mis proyectos, habilidades y experiencia profesional.

## Características

- Diseño responsivo con animaciones y efectos visuales
- Secciones para información personal, proyectos y experiencia
- Formulario de contacto
- Animaciones con CSS y JavaScript
- Estilo moderno con gradientes y efectos visuales

## Tecnologías Utilizadas

- **Backend**: Django
- **Frontend**: HTML5, CSS3, JavaScript
- **Base de Datos**: SQLite (desarrollo)
- **Despliegue**: Vercel

## Estructura del Proyecto

- `main/` - Aplicación principal con vistas, modelos y templates
- `portfolio/` - Configuración del proyecto Django
- `main/static/` - Archivos estáticos (CSS, JS, imágenes)
- `main/templates/` - Plantillas HTML

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
   pip install Django Pillow
   ```

4. Ejecutar el servidor de desarrollo:
   ```
   python manage.py runserver
   ```

## Despliegue

Para despliegue en producción, asegúrate de instalar todos los paquetes, incluidos whitenoise y gunicorn:
```
pip install -r requirements.txt
```

Y configurar las variables de entorno apropiadas:
- `DJANGO_SECRET_KEY`: Una clave secreta segura
- `DJANGO_DEBUG`: "False" para producción
