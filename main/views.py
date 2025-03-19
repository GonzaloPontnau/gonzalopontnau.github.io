from django.shortcuts import render
from django.core.mail import EmailMessage
from django.conf import settings
from django.http import JsonResponse

def home(request):
    if request.method == 'POST' and request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        try:
            # Obtener datos del formulario
            name = request.POST.get('name', '')
            email = request.POST.get('email', '')
            subject = request.POST.get('subject', '')
            message = request.POST.get('message', '')
            
            # Construir el cuerpo del mensaje
            email_body = f"Nombre: {name}\nEmail: {email}\n\nMensaje:\n{message}"
            
            # Para depuración - imprimir en consola
            print(f"Intentando enviar correo a: {settings.CONTACT_EMAIL}")
            print(f"Usando cuenta: {settings.EMAIL_HOST_USER}")
            
            # Crear objeto EmailMessage para tener más control sobre los encabezados
            email_message = EmailMessage(
                subject=f"Contacto portfolio de {name}: {subject}",
                body=email_body,
                from_email=f"{name} <{settings.EMAIL_HOST_USER}>",
                to=[settings.CONTACT_EMAIL],
                reply_to=[email]  # Configurar reply-to con el email del remitente
            )
            
            # Enviar el correo
            email_message.send(fail_silently=False)
            
            # Si llegamos aquí, el envío fue exitoso
            print("¡Correo enviado exitosamente!")
            
            return JsonResponse({
                'success': True,
                'message': f'Gracias {name}, tu mensaje ha sido enviado correctamente.'
            })
        except Exception as e:
            print(f"Error al enviar correo: {str(e)}")
            return JsonResponse({
                'success': False,
                'message': f'Error al enviar el mensaje: {str(e)}'
            })
    
    return render(request, 'main/home.html')

def projects(request):
    projects_list = [
        {
            "title": "API para Clínica Priory",
            "tech": ["Java", "Spring Boot", "JWT"],
            "description": "API RESTful con seguridad JWT y despliegue en la nube.",
            "github": "https://github.com/PontnauGonzalo/API-REST-priorymed.api"
        },
        {
            "title": "Sistema de Tareas con Django",
            "tech": ["Python", "Django", "PostgreSQL"],
            "description": "Aplicación web con autenticación y CRUD.",
            "github": "https://github.com/PontnauGonzalo/money-manager-python"
        }
    ]
    return render(request, 'main/projects.html', {'projects': projects_list})