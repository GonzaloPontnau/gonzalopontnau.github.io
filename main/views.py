from django.shortcuts import render

def home(request):
    return render(request, 'main/home.html')

def projects(request):
    projects_list = [
        {
            "title": "API para Clínica Priory",
            "tech": ["Java", "Spring Boot", "JWT"],
            "description": "API RESTful con seguridad JWT y despliegue en la nube.",
            "github": "https://github.com/tuusuario/priory-api"
        },
        {
            "title": "Sistema de Tareas con Django",
            "tech": ["Python", "Django", "PostgreSQL"],
            "description": "Aplicación web con autenticación y CRUD.",
            "github": "https://github.com/tuusuario/task-manager"
        }
    ]
    return render(request, 'main/projects.html', {'projects': projects_list})