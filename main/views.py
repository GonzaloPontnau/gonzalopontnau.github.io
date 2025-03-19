from django.shortcuts import render
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.http import JsonResponse

def home(request):
    if request.method == 'POST' and request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Procesar formulario de contacto AJAX
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        subject = request.POST.get('subject', '')
        message = request.POST.get('message', '')
        
        # Construir el cuerpo del mensaje
        email_body = f"Has recibido un mensaje de {name}:\n\n{message}"
        
        try:
            # Crear un objeto EmailMultiAlternatives para tener más control sobre los headers
            email_message = EmailMultiAlternatives(
                f"Mensaje de contacto: {subject}",  # Asunto
                email_body,  # Cuerpo del mensaje
                f"{name} <{email}>",  # From (nombre y correo del remitente del formulario)
                [settings.CONTACT_EMAIL],  # Para
            )
            
            # Establecer cabeceras adicionales para manejar la autenticación correctamente
            email_message.extra_headers = {
                'From': f"{name} <{email}>",
                'Reply-To': email,
                'Sender': settings.EMAIL_HOST_USER,  # Necesario para autenticación SMTP
            }
            
            # Enviar el correo
            email_message.send(fail_silently=False)
            
            return JsonResponse({'success': True, 'message': 'Mensaje enviado correctamente.'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': f'Error al enviar el mensaje: {str(e)}'})
    
    # Renderizar la página principal
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