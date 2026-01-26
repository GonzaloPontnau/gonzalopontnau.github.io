/**
 * Sistema de cambio de idioma
 * Implementado con datos estructurados y cache de traducciones para mejor rendimiento
 */
document.addEventListener("DOMContentLoaded", function () {
  const languageToggle = document.getElementById('language-toggle');
  const currentLanguage = document.getElementById('current-language');

  // Verificar que existan los elementos necesarios
  if (!languageToggle || !currentLanguage) return;

  // Idioma inicial
  let currentLang = 'es';

  // Función auxiliar para comprobar si un elemento existe
  function elementExists(selector) {
    return document.querySelector(selector) !== null;
  }

  // Diccionario de traducciones
  const translations = {
    // Navbar
    'nav': {
      'es': {
        'about': 'Sobre mí',
        'experience': 'Experiencia',
        'projects': 'Proyectos',
        'education': 'Educación',
        'contact': 'Contacto'
      },
      'en': {
        'about': 'About me',
        'experience': 'Experience',
        'projects': 'Projects',
        'education': 'Education',
        'contact': 'Contact'
      }
    },
    // Sección de experiencia
    'experience': {
      'es': {
        'title': 'Experiencia Laboral',
        'abbTrainee': {
          'role': 'AI Engineer Trainee',
          'type': 'ABB · Trainee',
          'location': 'Buenos Aires, Argentina · Remoto',
          'period': 'Oct 2025 - Presente',
          'description1': 'Lideré la creación de <strong>agentes inteligentes internos</strong> con arquitectura de <strong>orquestación multi-agente</strong> para eficientizar operaciones en diferentes áreas de negocio. Diseñé e implementé un ecosistema de <strong>Agentic AI</strong> con <strong>sub-agentes verticales</strong> desplegados en <strong>Azure</strong>, entregando MVPs en fases iterativas con adopción real por equipos corporativos.',
          'stack_title': 'Stack & Skills:',
          'tech1': '<span class="tech-highlight">Agentic Architecture & Orchestration:</span> Diseño de <strong>orquestador multi-agente</strong> con <strong>LangGraph</strong> que coordina sub-agentes especializados (knowledge retrieval, task monitoring, feedback loop) expuestos vía <strong>FastAPI</strong> y desplegados en <strong>Azure App Service</strong>. Implementación de <strong>state management</strong>, <strong>conditional routing</strong> y <strong>tool calling</strong> para flujos conversacionales complejos.',
          'tech2': '<span class="tech-highlight">RAG Pipelines & Vector Search:</span> Implementación de pipelines <strong>RAG</strong> end-to-end con <strong>Azure AI Search</strong> y <strong>Pinecone</strong> como vector stores. Estrategias de <strong>chunking</strong> (recursive, semantic), generación de <strong>embeddings</strong> con Azure OpenAI, <strong>hybrid search</strong> (keyword + semantic), <strong>reranking</strong> con cross-encoders y <strong>query expansion</strong>. Controles de calidad con <strong>hallucination detection</strong> y fallbacks.',
          'tech3': '<span class="tech-highlight">M365 Automation & Integration:</span> Creación de flujos con <strong>Power Automate</strong> que generan <strong>minutas</strong>, decisiones y acciones a partir de reuniones en Teams; publicación en <strong>SharePoint/OneDrive/Teams</strong> y creación/actualización de tareas en <strong>Planner</strong> mediante <strong>Microsoft Graph API</strong>.'
        },
        'aiQualityAnalyst': {
          'role': 'AI Quality Analyst',
          'type': 'Outlier · Freelance',
          'location': 'Buenos Aires, Argentina · Remoto',
          'period': 'Jun 2025 - Presente',
          'description1': 'Diseño de frameworks de evaluación técnica (rúbricas) para validar la calidad de código generado por modelos de IA en múltiples lenguajes de programación, interpretando requisitos explícitos e implícitos de cada prompt. Elaboración de system prompts y user prompts estratégicos para simular flujos conversacionales complejos, evaluando capacidades agénticas del modelo.',
          'description2': 'Análisis y diagnóstico de fallos en respuestas de modelos LLM, utilizando métricas precisas para diferenciar entre errores de Correctness (bugs lógicos, información factual incorrecta) y de Instruction Following (incumplimiento de restricciones), manteniendo coherencia contextual en interacciones multi-turn.',
          'stack_title': 'QA & AI stack:',
          'tech1': '<span class="tech-highlight">Testing & Evaluation</span>: Creación de escenarios de prueba complejos y frameworks de evaluación técnica para código AI-generado en Python (Flask, FastAPI), Java y JavaScript/TypeScript.',
          'tech2': '<span class="tech-highlight">AI Model Analysis</span>: Auditorías técnicas del código generado evaluando calidad, escalabilidad y legibilidad, proporcionando feedback estructurado que guía el proceso de fine-tuning de modelos LLM.',
          'tech3': '<span class="tech-highlight">Quality Assurance</span>: Metodologías de QA aplicadas a IA, diferenciando entre errores lógicos y de seguimiento de instrucciones, con métricas exactas para alinear modelos con estándares de alta calidad.'
        },
        'backendDeveloper': {
          'role': 'Back End Developer',
          'type': 'Freelance',
          'location': 'Buenos Aires, Argentina · Remoto',
          'period': 'Mar 2023 - Jul 2025',
          'description1': 'Desarrollo de aplicaciones web seguras y escalables, diseño de APIs RESTful y microservicios, implementación de bases de datos relacionales, integración de sistemas externos y desarrollo de soluciones de software.',
          'description2': 'Recopilación de requerimientos funcionales y no funcionales; modelado UML de situaciones de uso, clases y secuencias; creación de esquemas de arquitectura (MVC/MVT) y determinación de flujos de datos.',
          'stack_title': 'Backend stack:',
          'tech1': '<span class="tech-highlight">APIs REST</span> utilizando Django REST y Flask: generación de accesos, organización de páginas, autenticación JWT y administración de permisos.',
          'tech2': '<span class="tech-highlight">Microservicios</span> en FastAPI y Go: gestión de concurrencia a través de goroutines, transferencia de información HTTP/JSON, transformación de servicios en contenedores.',
          'tech3': '<span class="tech-highlight">Bases de datos relacionales</span> (PostgreSQL, SQLite, MySQL): organización de esquemas, optimización de consultas, operaciones mediante ORM, uso de UUIDs y funciones ACID.'
        }
      },
      'en': {
        'title': 'Work Experience',
        'abbTrainee': {
          'role': 'AI Engineer Trainee',
          'type': 'ABB · Trainee',
          'location': 'Buenos Aires, Argentina · Remote',
          'period': 'Oct 2025 - Present',
          'description1': 'I led the creation of <strong>internal intelligent agents</strong> with <strong>multi-agent orchestration</strong> architecture to streamline operations across different business areas. I designed and implemented an <strong>Agentic AI</strong> ecosystem with <strong>vertical sub-agents</strong> deployed on <strong>Azure</strong>, delivering MVPs in iterative phases with real adoption by corporate teams.',
          'stack_title': 'Stack & Skills:',
          'tech1': '<span class="tech-highlight">Agentic Architecture & Orchestration:</span> Design of <strong>multi-agent orchestrator</strong> with <strong>LangGraph</strong> that coordinates specialized sub-agents (knowledge retrieval, task monitoring, feedback loop) exposed via <strong>FastAPI</strong> and deployed on <strong>Azure App Service</strong>. Implementation of <strong>state management</strong>, <strong>conditional routing</strong> and <strong>tool calling</strong> for complex conversational flows.',
          'tech2': '<span class="tech-highlight">RAG Pipelines & Vector Search:</span> Implementation of end-to-end <strong>RAG</strong> pipelines with <strong>Azure AI Search</strong> and <strong>Pinecone</strong> as vector stores. <strong>Chunking</strong> strategies (recursive, semantic), <strong>embeddings</strong> generation with Azure OpenAI, <strong>hybrid search</strong> (keyword + semantic), <strong>reranking</strong> with cross-encoders and <strong>query expansion</strong>. Quality controls with <strong>hallucination detection</strong> and fallbacks.',
          'tech3': '<span class="tech-highlight">M365 Automation & Integration:</span> Creation of flows with <strong>Power Automate</strong> that generate <strong>meeting minutes</strong>, decisions, and actions from Teams meetings; publication to <strong>SharePoint/OneDrive/Teams</strong> and task creation/updates in <strong>Planner</strong> via <strong>Microsoft Graph API</strong>.'
        },
        'aiQualityAnalyst': {
          'role': 'AI Quality Analyst',
          'type': 'Outlier · Freelance',
          'location': 'Buenos Aires, Argentina · Remote',
          'period': 'Jun 2025 - Present',
          'description1': 'Design of technical evaluation frameworks (rubrics) to validate the quality of AI-generated code across multiple programming languages, interpreting explicit and implicit requirements of each prompt. Creation of strategic system prompts and user prompts to simulate complex conversational flows, evaluating the model\'s agentic capabilities.',
          'description2': 'Analysis and diagnosis of failures in LLM responses, using precise metrics to differentiate between Correctness errors (logical bugs, incorrect factual information) and Instruction Following errors (non-compliance with restrictions), maintaining contextual coherence in multi-turn interactions.',
          'stack_title': 'QA & AI stack:',
          'tech1': '<span class="tech-highlight">Testing & Evaluation</span>: Complex test scenario creation and technical evaluation frameworks for AI-generated code in Python (Flask, FastAPI), Java, and JavaScript/TypeScript.',
          'tech2': '<span class="tech-highlight">AI Model Analysis</span>: Technical audits of generated code evaluating quality, scalability, and readability, providing structured feedback that guides the LLM fine-tuning process.',
          'tech3': '<span class="tech-highlight">Quality Assurance</span>: QA methodologies applied to AI, differentiating between logical errors and instruction-following issues, with exact metrics to align models with high-quality standards.'
        },
        'backendDeveloper': {
          'role': 'Back End Developer',
          'type': 'Freelance',
          'location': 'Buenos Aires, Argentina · Remote',
          'period': 'Mar 2023 - Jul 2025',
          'description1': 'Developed secure and scalable web applications, designed RESTful APIs and microservices, implemented relational databases, integrated external systems, and delivered comprehensive software solutions.',
          'description2': 'Gathered functional and non-functional requirements; created UML models for use cases, classes, and sequences; designed architectural schemas (MVC/MVT) and defined data flow patterns.',
          'stack_title': 'Backend stack:',
          'tech1': '<span class="tech-highlight">REST APIs</span> using Django REST and Flask: endpoint generation, route organization, JWT authentication, and permission management.',
          'tech2': '<span class="tech-highlight">Microservices</span> in FastAPI and Go: concurrency management through goroutines, HTTP/JSON data transfer, containerization of services.',
          'tech3': '<span class="tech-highlight">Relational databases</span> (PostgreSQL, SQLite, MySQL): schema organization, query optimization, ORM operations, UUID implementation, and ACID functionality.'
        }
      }
    },
    // Hero section
    'hero': {
      'es': {
        'greeting': 'Hola 👋🏼, soy',
        'role': 'AI Engineer | Agentic Systems',
        'btnExperience': 'Experiencia',
        'btnProjects': 'Proyectos',
        'btnEducation': 'Educación',
        'btnContact': 'Contactame'
      },
      'en': {
        'greeting': 'Hello 👋🏼, I am',
        'role': 'AI Engineer | Agentic Systems',
        'btnExperience': 'Experience',
        'btnProjects': 'Projects',
        'btnEducation': 'Education',
        'btnContact': 'Contact me'
      }
    },
    // About section
    'about': {
      'es': {
        'title': 'Sobre Mí',
        'bio1': 'Estudiante avanzado en Ingeniería en Sistemas (UTN.BA) especializado en <span class="highlight">AI Engineering</span>. Lidero la creación de <span class="highlight">agentes inteligentes</span> y workflows automatizados que transforman operaciones manuales en procesos eficientes, ahorrando tiempo y reduciendo errores en el día a día de equipos corporativos.',
        'bio2': 'Me apasiona <span class="highlight">hacer visible el impacto de la IA</span>: trabajo de cerca con diferentes áreas de negocio para entender sus necesidades, diseñar soluciones adoptables y demostrar con datos cómo la automatización mejora su operación.',
        'bio3': 'La comunicación es una de mis principales fortalezas: soy extrovertido, trabajo muy bien en equipo y conecto fácilmente con personas diversas, algo clave cuando se construyen soluciones de IA que cruzan tecnología, negocio y usuarios finales.',
        'skillsTitle': 'Tecnologías'
      },
      'en': {
        'title': 'About Me',
        'bio1': 'Advanced Systems Engineering student (UTN.BA) specialized in <span class="highlight">AI Engineering</span>. I lead the creation of <span class="highlight">intelligent agents</span> and automated workflows that transform manual operations into efficient processes, saving time and reducing errors in the daily work of corporate teams.',
        'bio2': 'I\'m passionate about <span class="highlight">making AI impact visible</span>: I work closely with different business areas to understand their needs, design adoptable solutions, and demonstrate with data how automation improves their operations.',
        'bio3': 'Communication is one of my main strengths: I\'m extroverted, work very well in teams, and connect easily with diverse people, which is key when building AI solutions that bridge technology, business, and end users.',
        'skillsTitle': 'Technologies'
      }
    },
    // Projects section
    'projects': {
      'es': {
        'title': 'Mis Proyectos',
        'moneyManager': {
          'title': 'Money Manager',
          'description': 'Aplicación web de gestión financiera personal con dashboard interactivo y seguimiento de transacciones. Con autenticación de usuario y almacenamiento seguro de datos.'
        },
        'GymAI': {
          'title': 'GymAI - Tu personal TrAIner',
          'description': 'Aplicación web que utiliza IA (Google Gemini) para crear rutinas de entrenamiento personalizadas y generar modificaciones mediante chat en tiempo real. (Por favor espere unos segundos apenas se ingrese al sitio web.)'
        },
        'cryptoViewer': {
          'title': 'Visualizador de Precios de Criptomonedas',
          'description': 'Aplicación web que muestra en tiempo real los precios de las 10 principales criptomonedas utilizando la API de CoinMarketCap. Incluye datos detallados como capitalización de mercado, volumen de 24h y cambio porcentual a través del endpoint'
        },
        'notesApp': {
          'title': 'Notes App - Sistema de Gestión de Notas',
          'description': 'Aplicación web completa para gestión de notas personales, con funcionalidades para crear, editar, archivar y filtrar notas por categorías. Desarrollada con arquitectura REST, frontend moderno responsive y backend robusto.'
        },
        'Go-web-api': {
          'title': 'GO Web API REST',
          'description': 'API REST en Go que implementa los principios SOLID y clean architecture. Estructurada en capas (Repository, Service, Controller) con gestión de contexts, autenticación JWT y manejo estandarizado de errores HTTP.'
        },
        'sistema-operativo': {
          'title': 'Sistema Operativo Distribuido en Go',
          'description': 'Sistema operativo distribuido desarrollado en Go que simula los componentes principales de un SO moderno. Implementa gestión de procesos, memoria virtual con paginación multinivel, planificadores de corto/mediano/largo plazo, TLB con algoritmos FIFO/LRU y sistema de I/O asíncrono.'
        },
      },
      'en': {
        'title': 'My Projects',
        'moneyManager': {
          'title': 'Money Manager',
          'description': 'Personal finance management web application with interactive dashboard and transaction tracking. Features user authentication and secure data storage.'
        },
        'GymAI': {
          'title': 'GymAI - Your Personal TrAIner',
          'description': 'Web application that uses AI (Google Gemini) to create personalized workout routines and generate modifications via real-time chat. (Please wait a few seconds after entering the website.)'
        },
        'cryptoViewer': {
          'title': 'Cryptocurrency Price Viewer',
          'description': 'Web application that displays real-time prices of the top 10 cryptocurrencies using the CoinMarketCap API. Includes detailed data such as market capitalization, 24h volume, and percentage change through the endpoint.'
        },
        'notesApp': {
          'title': 'Notes App - Note Management System',
          'description': 'Complete web application for personal note management, with features to create, edit, archive, and filter notes by categories. Developed with REST architecture, modern responsive frontend, and robust backend.'
        },
        'Go-web-api': {
          'title': 'GO Web API REST',
          'description': 'REST API in Go that implements SOLID principles and clean architecture. Structured in layers (Repository, Service, Controller) with context management, JWT authentication, and standardized HTTP error handling.'
        },
        'sistema-operativo': {
          'title': 'Distributed Operating System in Go',
          'description': 'Distributed operating system developed in Go that simulates the main components of a modern OS. Implements process management, virtual memory with multilevel paging, short/medium/long-term schedulers, TLB with FIFO/LRU algorithms, and asynchronous I/O system.'
        },
      }
    },
    // Education section
    'education': {
      'es': {
        'title': 'Educación y Certificaciones',
        'more': 'Si quieres ver más información, casos reales y certificados adicionales, te dejo mi perfil de LinkedIn. Allí cuento cómo diseño automatizaciones con IA (RAG, chatbots, agentes) en ABB, el impacto en productividad y cómo combino Ingeniería con proyectos aplicados.',
        'skillsTitle': 'Tecnologías',
        'utn': {
          'institution': 'Universidad Tecnológica Nacional',
          'degree': 'Ingeniería de Sistemas',
          'period': '| 2022 - Presente',
          'programmingTitle': 'Formación en programación',
          'programmingContent': 'Dominio de C/C++, Go, Java, bases de datos MySQL y diseño de sistemas operativos. Destaco el desarrollo de un sistema operativo distribuido en Go, integrando módulos como Kernel, CPU, Memoria y File System. Implementé APIs HTTP para comunicación modular, configuración JSON y logs estructurados. Además, diseñé un analizador léxico, sintáctico y semántico en C usando Flex/Bison y expresiones regulares (regex), aplicado en la interpretación de pseudocódigo para programación.',
          'methodologiesTitle': 'Metodologías y enfoque',
          'methodologiesContent': 'Dominio en análisis de requisitos tanto funcionales como no funcionales, con capacidad para traducir necesidades del cliente en especificaciones técnicas precisas. Modelado UML para visualización y documentación de sistemas complejos. Implementación efectiva de metodologías ágiles, especialmente Scrum, facilitando entregas incrementales de valor y adaptación a cambios de requisitos.'
        },
        'django': {
          'institution': 'Curso Completo de Django',
          'degree': 'Desarrollo Web Backend',
          'period': '| Platzi',
          'description': 'Formación completa en desarrollo web con Django, abarcando desde fundamentos hasta despliegue avanzado con REST API y AWS.',
          'modules': [
            'Fundamentos de Django',
            'Modelos y Bases de Datos',
            'Relaciones entre Modelos',
            'Queries y Filtros Avanzados',
            'URLs y Vistas',
            'Django REST Framework'
          ],
          'summary': 'Curso completo que abarca tanto arquitectura MVT como desarrollo avanzado de APIs con Django REST Framework y despliegue en producción.'
        },
        'go': {
          'institution': 'Fundamentos de GO',
          'degree': 'Desarrollo Backend',
          'period': '| Digital House',
          'description': 'Formación técnica en Go para desarrollo de back end y microservicios, enfocada en sintaxis avanzada (structs, interfaces, generics), concurrencia nativa (Goroutines/Channels) y manejo de errores (Panic/Recover). Incluye diseño de APIs RESTful con arquitectura por capas (controlador, servicio, repositorio), integración con bases de datos y herramientas como Gin Gonic. Aplicación de paquetes clave (UUID, OS, log) y principios SOLID en proyectos escalables. Metodología práctica con evaluación basada en checkpoints y desarrollo de microservicios funcionales, priorizando integración en entornos Spring Cloud y gestión eficiente de recursos para big data.',
          'summary': 'Enfoque práctico y profesional en Go para el desarrollo de APIs y microservicios escalables con arquitectura limpia y patrones de concurrencia avanzados.',
          'skillsTitle': 'Tecnologías',
          'skills': ['Go', 'APIs RESTful', 'Gin Gonic', 'Goroutines', 'Concurrencia', 'SOLID', 'Microservicios']
        }
      },
      'en': {
        'title': 'Education and Certifications',
        'more': 'If you want to see more details, real cases, and additional certificates, check my LinkedIn profile. There I share how I design AI automations (RAG, chatbots, agents) at ABB, the productivity impact, and how I blend my engineering background with applied projects.',
        'skillsTitle': 'Technologies',
        'utn': {
          'institution': 'National Technological University',
          'degree': 'Systems Engineering',
          'period': '| 2022 - Present',
          'programmingTitle': 'Programming Training',
          'programmingContent': 'Proficiency in C/C++, Go, Java, MySQL databases, and operating system design. Highlights include developing a distributed operating system in Go, integrating modules such as Kernel, CPU, Memory, and File System. Implemented HTTP APIs for modular communication, JSON configuration, and structured logging. Additionally, designed a lexical, syntactic, and semantic analyzer in C using Flex/Bison and regular expressions (regex), applied in pseudocode interpretation for programming.',
          'methodologiesTitle': 'Methodologies and approach',
          'methodologiesContent': 'Expertise in analyzing both functional and non-functional requirements, with the ability to translate client needs into precise technical specifications. UML modeling for visualization and documentation of complex systems. Effective implementation of agile methodologies, especially Scrum, facilitating incremental value delivery and adaptation to changing requirements.'
        },
        'django': {
          'institution': 'Complete Django Course',
          'degree': 'Web Backend Development',
          'period': '| Platzi',
          'description': 'Comprehensive training in web development with Django, covering from fundamentals to advanced deployment with REST API and AWS.',
          'modules': [
            'Django Fundamentals',
            'Models and Databases',
            'Model Relationships',
            'Advanced Queries and Filters',
            'URLs and Views',
            'Django REST Framework'
          ],
          'summary': 'Complete course covering both MVT architecture and advanced API development with Django REST Framework and production deployment.'
        },
        'go': {
          'institution': 'GO Fundamentals',
          'degree': 'Backend Development',
          'period': '| Digital House',
          'description': 'Technical training in Go for backend and microservices development, focused on advanced syntax (structs, interfaces, generics), native concurrency (Goroutines/Channels) and error handling (Panic/Recover). Includes design of RESTful APIs with layered architecture (controller, service, repository), database integration and tools like Gin Gonic. Application of key packages (UUID, OS, log) and SOLID principles in scalable projects. Practical methodology with assessment based on checkpoints and development of functional microservices, prioritizing integration in Spring Cloud environments and efficient resource management for big data.',
          'summary': 'Practical and professional approach to Go for the development of scalable APIs and microservices with clean architecture and advanced concurrency patterns.',
          'skillsTitle': 'Technologies',
          'skills': ['Go', 'RESTful APIs', 'Gin Gonic', 'Goroutines', 'Concurrency', 'SOLID', 'Microservices']
        }
      }
    },
    // Contact section
    'contact': {
      'es': {
        'title': 'Contactame',
        'description': 'Si quieres contactarte conmigo puedes mandarme un mail completando el formulario o conectar directamente desde el badge de LinkedIn. ¡Gracias!',
        'form': {
          'name': 'Nombre',
          'email': 'Correo electrónico',
          'subject': 'Asunto',
          'message': 'Mensaje',
          'send': 'Enviar mensaje'
        }
      },
      'en': {
        'title': 'Contact Me',
        'description': 'If you want to contact me, you can send me an email by filling out the form or connect directly through the LinkedIn badge. Thanks!',
        'form': {
          'name': 'Name',
          'email': 'Email',
          'subject': 'Subject',
          'message': 'Message',
          'send': 'Send message'
        }
      }
    },
    // Footer
    'footer': {
      'es': '2025 Gonzalo Pontnau',
      'en': '2025 Gonzalo Pontnau'
    },
    // Language button
    'languageBtn': {
      'es': {
        'text': 'ES',
        'label': 'Cambiar a English'
      },
      'en': {
        'text': 'EN',
        'label': 'Switch to Español'
      }
    }
  };

  // Actualizar el estado del botón para reflejar el idioma actual
  function updateLanguageButtonState() {
    if (currentLanguage) {
      currentLanguage.textContent = translations.languageBtn[currentLang].text;
      languageToggle.setAttribute('title', translations.languageBtn[currentLang].label);
      languageToggle.setAttribute('aria-label', translations.languageBtn[currentLang].label);
    }
  }

  // Inicializar estado del botón
  updateLanguageButtonState();

  // Función para cambiar el idioma con medición de rendimiento
  function changeLanguage(lang) {
    // Medir rendimiento
    const startTime = performance.now();

    // Actualizar idioma actual
    currentLang = lang;
    console.log(`Cambiando idioma a: ${lang}`);

    try {
      // Actualizar el botón de idioma
      updateLanguageButtonState();

      // Actualizar el atributo lang de la etiqueta html
      document.documentElement.lang = lang;

      // === Navbar ===
      updateNavigation();

      // === Hero section ===
      updateHeroSection();

      // === About section ===
      updateAboutSection();

      // === Experience section ===
      updateExperienceSection();

      // === Projects section ===
      updateProjectsSection();

      // === Education section ===
      updateEducationSection();

      // === Contact section ===
      updateContactSection();

      // === Footer ===
      updateFooter();

      // Medir tiempo total de cambio
      const endTime = performance.now();
      console.log(`Idioma cambiado a ${lang} en ${(endTime - startTime).toFixed(2)}ms`);

    } catch (error) {
      console.error(`Error al cambiar el idioma a ${lang}:`, error);
    }
  }

  // Funciones específicas para actualizar cada sección (modularización)
  function updateNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks.length >= 5) {
      navLinks[0].textContent = translations.nav[currentLang].about;
      navLinks[1].textContent = translations.nav[currentLang].experience;
      navLinks[2].textContent = translations.nav[currentLang].projects;
      navLinks[3].textContent = translations.nav[currentLang].education;
      navLinks[4].textContent = translations.nav[currentLang].contact;
    }
  }

  function updateHeroSection() {
    if (elementExists('.greeting')) {
      document.querySelector('.greeting').textContent = translations.hero[currentLang].greeting;
    }

    if (elementExists('.hero .title')) {
      document.querySelector('.hero .title').textContent = translations.hero[currentLang].role;
    }

    const heroButtons = document.querySelectorAll('.hero .button-container .btn');
    if (heroButtons.length >= 4) {
      heroButtons[0].textContent = translations.hero[currentLang].btnExperience;
      heroButtons[1].textContent = translations.hero[currentLang].btnProjects;
      heroButtons[2].textContent = translations.hero[currentLang].btnEducation;
      heroButtons[3].textContent = translations.hero[currentLang].btnContact;
    }
  }

  function updateAboutSection() {
    if (elementExists('#about .section-title')) {
      document.querySelector('#about .section-title').textContent = translations.about[currentLang].title;
    }

    const aboutBios = document.querySelectorAll('.about-bio');
    if (aboutBios.length >= 1) aboutBios[0].innerHTML = translations.about[currentLang].bio1;
    if (aboutBios.length >= 2) aboutBios[1].innerHTML = translations.about[currentLang].bio2;
    if (aboutBios.length >= 3) aboutBios[2].innerHTML = translations.about[currentLang].bio3;
    if (aboutBios.length >= 4) aboutBios[3].innerHTML = translations.about[currentLang].bio4;

    if (elementExists('.skills-title')) {
      document.querySelector('.skills-title').textContent = translations.about[currentLang].skillsTitle;
    }
  }

  function updateExperienceSection() {
    if (elementExists('#experience .section-title')) {
      document.querySelector('#experience .section-title').textContent =
        translations.experience[currentLang].title;
    }

    // ABB Trainee experience
    if (elementExists('#abb-trainee .experience-title')) {
      document.querySelector('#abb-trainee .experience-title').textContent =
        translations.experience[currentLang].abbTrainee.role;
    }

    if (elementExists('#abb-trainee .experience-type')) {
      document.querySelector('#abb-trainee .experience-type').textContent =
        translations.experience[currentLang].abbTrainee.type;
    }

    if (elementExists('#abb-trainee .experience-location')) {
      document.querySelector('#abb-trainee .experience-location').textContent =
        translations.experience[currentLang].abbTrainee.location;
    }

    if (elementExists('#abb-trainee .date-pill')) {
      document.querySelector('#abb-trainee .date-pill').textContent =
        translations.experience[currentLang].abbTrainee.period;
    }

    const abbDescriptions = document.querySelectorAll('#abb-trainee .experience-description p');
    if (abbDescriptions.length >= 1) abbDescriptions[0].innerHTML = translations.experience[currentLang].abbTrainee.description1;
    if (abbDescriptions.length >= 2) abbDescriptions[1].innerHTML = translations.experience[currentLang].abbTrainee.description2;
    if (abbDescriptions.length >= 3) abbDescriptions[2].innerHTML = translations.experience[currentLang].abbTrainee.description3;

    if (elementExists('#abb-trainee .tech-stack-title')) {
      document.querySelector('#abb-trainee .tech-stack-title').textContent =
        translations.experience[currentLang].abbTrainee.stack_title;
    }

    const abbTechTexts = document.querySelectorAll('#abb-trainee .tech-text');
    if (abbTechTexts.length >= 6) {
      abbTechTexts[0].innerHTML = translations.experience[currentLang].abbTrainee.tech1;
      abbTechTexts[1].innerHTML = translations.experience[currentLang].abbTrainee.tech2;
      abbTechTexts[2].innerHTML = translations.experience[currentLang].abbTrainee.tech3;
      abbTechTexts[3].innerHTML = translations.experience[currentLang].abbTrainee.tech4;
      abbTechTexts[4].innerHTML = translations.experience[currentLang].abbTrainee.tech5;
      abbTechTexts[5].innerHTML = translations.experience[currentLang].abbTrainee.tech6;
    }

    // AI Quality Analyst experience
    if (elementExists('#ai-quality-analyst .experience-title')) {
      document.querySelector('#ai-quality-analyst .experience-title').textContent =
        translations.experience[currentLang].aiQualityAnalyst.role;
    }

    if (elementExists('#ai-quality-analyst .experience-type')) {
      document.querySelector('#ai-quality-analyst .experience-type').textContent =
        translations.experience[currentLang].aiQualityAnalyst.type;
    }

    if (elementExists('#ai-quality-analyst .experience-location')) {
      document.querySelector('#ai-quality-analyst .experience-location').textContent =
        translations.experience[currentLang].aiQualityAnalyst.location;
    }

    if (elementExists('#ai-quality-analyst .date-pill')) {
      document.querySelector('#ai-quality-analyst .date-pill').textContent =
        translations.experience[currentLang].aiQualityAnalyst.period;
    }

    const aiDescriptions = document.querySelectorAll('#ai-quality-analyst .experience-description p');
    if (aiDescriptions.length >= 2) {
      aiDescriptions[0].textContent = translations.experience[currentLang].aiQualityAnalyst.description1;
      aiDescriptions[1].textContent = translations.experience[currentLang].aiQualityAnalyst.description2;
    }

    if (elementExists('#ai-quality-analyst .tech-stack-title')) {
      document.querySelector('#ai-quality-analyst .tech-stack-title').textContent =
        translations.experience[currentLang].aiQualityAnalyst.stack_title;
    }

    const aiTechTexts = document.querySelectorAll('#ai-quality-analyst .tech-text');
    if (aiTechTexts.length >= 3) {
      aiTechTexts[0].innerHTML = translations.experience[currentLang].aiQualityAnalyst.tech1;
      aiTechTexts[1].innerHTML = translations.experience[currentLang].aiQualityAnalyst.tech2;
      aiTechTexts[2].innerHTML = translations.experience[currentLang].aiQualityAnalyst.tech3;
    }

    // Backend Developer experience
    if (elementExists('#backend-developer .experience-title')) {
      document.querySelector('#backend-developer .experience-title').textContent =
        translations.experience[currentLang].backendDeveloper.role;
    }

    if (elementExists('#backend-developer .experience-type')) {
      document.querySelector('#backend-developer .experience-type').textContent =
        translations.experience[currentLang].backendDeveloper.type;
    }

    if (elementExists('#backend-developer .experience-location')) {
      document.querySelector('#backend-developer .experience-location').textContent =
        translations.experience[currentLang].backendDeveloper.location;
    }

    if (elementExists('#backend-developer .date-pill')) {
      document.querySelector('#backend-developer .date-pill').textContent =
        translations.experience[currentLang].backendDeveloper.period;
    }

    const backendDescriptions = document.querySelectorAll('#backend-developer .experience-description p');
    if (backendDescriptions.length >= 2) {
      backendDescriptions[0].textContent = translations.experience[currentLang].backendDeveloper.description1;
      if (backendDescriptions[1]) {
        backendDescriptions[1].textContent = translations.experience[currentLang].backendDeveloper.description2;
      }
    }

    if (elementExists('#backend-developer .tech-stack-title')) {
      document.querySelector('#backend-developer .tech-stack-title').textContent =
        translations.experience[currentLang].backendDeveloper.stack_title;
    }

    const backendTechTexts = document.querySelectorAll('#backend-developer .tech-text');
    if (backendTechTexts.length >= 3) {
      backendTechTexts[0].innerHTML = translations.experience[currentLang].backendDeveloper.tech1;
      backendTechTexts[1].innerHTML = translations.experience[currentLang].backendDeveloper.tech2;
      backendTechTexts[2].innerHTML = translations.experience[currentLang].backendDeveloper.tech3;
    }
  }

  function updateProjectsSection() {
    if (elementExists('#projects .section-title')) {
      document.querySelector('#projects .section-title').textContent =
        translations.projects[currentLang].title;
    }

    // Declaración de variables usadas en toda la función
    const projectTitles = document.querySelectorAll('.project-title');
    const projectDescriptions = document.querySelectorAll('.project-description');

    // Money Manager
    if (elementExists('#money-manager .project-title')) {
      document.querySelector('#money-manager .project-title').textContent =
        translations.projects[currentLang].moneyManager.title;
    }

    if (elementExists('#money-manager .project-description')) {
      document.querySelector('#money-manager .project-description').textContent =
        translations.projects[currentLang].moneyManager.description;
    }

    // GymAI
    if (elementExists('#gym-ai .project-title')) {
      document.querySelector('#gym-ai .project-title').textContent =
        translations.projects[currentLang].GymAI.title;
    }

    if (elementExists('#gym-ai .project-description')) {
      document.querySelector('#gym-ai .project-description').textContent =
        translations.projects[currentLang].GymAI.description;
    }

    // Notes App
    projectTitles.forEach(title => {
      if (title.textContent.includes('Notes App') ||
        title.textContent.includes('Sistema de Gestión de Notas') ||
        title.textContent.includes('Note Management System')) {
        title.textContent = translations.projects[currentLang].notesApp.title;
      }
    });

    projectDescriptions.forEach(desc => {
      if (desc.textContent.includes('gestión de notas') ||
        desc.textContent.includes('note management')) {
        desc.textContent = translations.projects[currentLang].notesApp.description;
      }
    });

    // Crypto Viewer
    projectTitles.forEach(title => {
      if (title.textContent.includes('Criptomonedas') || title.textContent.includes('Cryptocurrency')) {
        title.textContent = translations.projects[currentLang].cryptoViewer.title;
      }
    });

    projectDescriptions.forEach(desc => {
      if (desc.textContent.includes('CoinMarketCap')) {
        desc.textContent = translations.projects[currentLang].cryptoViewer.description;
      }
    });

    // GO Web API REST
    projectTitles.forEach(title => {
      if (title.textContent.includes('GO Web API') || title.textContent.includes('Web API REST')) {
        title.textContent = translations.projects[currentLang]['Go-web-api'].title;
      }
    });

    projectDescriptions.forEach(desc => {
      if (desc.textContent.includes('clean architecture') ||
        desc.textContent.includes('SOLID') && desc.textContent.includes('REST') &&
        desc.textContent.includes('Go')) {
        desc.textContent = translations.projects[currentLang]['Go-web-api'].description;
      }
    });

    // API RESTful Clínica Médica Priory
    projectTitles.forEach(title => {
      if (title.textContent.includes('Clínica Médica') || title.textContent.includes('Priory')) {
        title.textContent = translations.projects[currentLang]['API-RESTful-java'].title;
      }
    });

    projectDescriptions.forEach(desc => {
      if (desc.textContent.includes('Spring Boot') ||
        desc.textContent.includes('MySQL') && desc.textContent.includes('Flyway')) {
        desc.textContent = translations.projects[currentLang]['API-RESTful-java'].description;
      }
    });

    // Detector de Líneas Blancas
    projectTitles.forEach(title => {
      if (title.textContent.includes('Detector') ||
        title.textContent.includes('White Line')) {
        title.textContent = translations.projects[currentLang]['python-lineas-blancas'].title;
      }
    });

    projectDescriptions.forEach(desc => {
      if (desc.textContent.includes('visión artificial') ||
        desc.textContent.includes('Machine vision')) {
        desc.textContent = translations.projects[currentLang]['python-lineas-blancas'].description;
      }
    });
  }

  function updateEducationSection() {
    if (elementExists('#education .section-title')) {
      document.querySelector('#education .section-title').textContent =
        translations.education[currentLang].title;
    }

    if (elementExists('.linkedin-more-text')) {
      document.querySelector('.linkedin-more-text').textContent =
        translations.education[currentLang].more;
    }

    // UTN
    if (elementExists('#utn-education .education-institution')) {
      document.querySelector('#utn-education .education-institution').textContent =
        translations.education[currentLang].utn.institution;
    }

    if (elementExists('#utn-education .education-degree')) {
      const degreeElement = document.querySelector('#utn-education .education-degree');
      degreeElement.innerHTML =
        translations.education[currentLang].utn.degree +
        ' <span class="education-date">' +
        translations.education[currentLang].utn.period +
        '</span>';
    }

    // Títulos y contenidos de los párrafos educativos
    const paragraphTitles = document.querySelectorAll('.paragraph-title');
    const paragraphContents = document.querySelectorAll('.paragraph-content');

    paragraphTitles.forEach(title => {
      if (title.textContent.includes('programación') ||
        title.textContent.includes('Programming')) {
        title.textContent = translations.education[currentLang].utn.programmingTitle;
      }
      if (title.textContent.includes('Metodologías') ||
        title.textContent.includes('Methodologies')) {
        title.textContent = translations.education[currentLang].utn.methodologiesTitle;
      }
    });

    paragraphContents.forEach(content => {
      if (content.textContent.includes('C/C++') &&
        content.textContent.includes('Go')) {
        content.textContent = translations.education[currentLang].utn.programmingContent;
      }
      if (content.textContent.includes('requisitos') ||
        content.textContent.includes('UML') ||
        content.textContent.includes('requirements')) {
        content.textContent = translations.education[currentLang].utn.methodologiesContent;
      }
    });

    // Curso de Django y Go mediante instituciones
    updateEducationCards();
  }

  function updateEducationCards() {
    const educationInstitutions = document.querySelectorAll('.education-institution');

    educationInstitutions.forEach(institution => {
      // Django
      if (institution.textContent.includes('Django')) {
        institution.textContent = translations.education[currentLang].django.institution;

        const parentCard = institution.closest('.education-card');
        if (parentCard) {
          // Titulo
          const degree = parentCard.querySelector('.education-degree');
          if (degree) {
            degree.innerHTML =
              translations.education[currentLang].django.degree +
              ' <span class="education-date">' +
              translations.education[currentLang].django.period +
              '</span>';
          }

          // Descripciones (overview y summary)
          const certOverview = parentCard.querySelector('.certification-overview p');
          if (certOverview) {
            certOverview.textContent = translations.education[currentLang].django.description;
          }

          const certHighlight = parentCard.querySelector('.certification-highlight p');
          if (certHighlight) {
            certHighlight.textContent = translations.education[currentLang].django.summary;
          }

          // Módulos específicos
          const moduleSpans = parentCard.querySelectorAll('.certification-module span:not(.cert-module-icon)');
          if (moduleSpans.length > 0) {
            const modules = translations.education[currentLang].django.modules;
            moduleSpans.forEach((span, index) => {
              if (index < modules.length) {
                span.textContent = modules[index];
              }
            });
          }
        }
      }

      // Go
      if (institution.textContent.includes('GO') ||
        institution.textContent.includes('Fundamentos de GO')) {
        institution.textContent = translations.education[currentLang].go.institution;

        const parentCard = institution.closest('.education-card');
        if (parentCard) {
          // Titulo
          const degree = parentCard.querySelector('.education-degree');
          if (degree) {
            degree.innerHTML =
              translations.education[currentLang].go.degree +
              ' <span class="education-date">' +
              translations.education[currentLang].go.period +
              '</span>';
          }

          // Buscar párrafos principales - por longitud del texto
          const certOverview = parentCard.querySelector('.certification-overview p');
          if (certOverview) {
            certOverview.textContent = translations.education[currentLang].go.description;
          }

          const certHighlight = parentCard.querySelector('.certification-highlight p');
          if (certHighlight) {
            certHighlight.textContent = translations.education[currentLang].go.summary;
          }

          // Título de habilidades
          const skillsTitle = parentCard.querySelector('.certification-skills-title');
          if (skillsTitle) {
            skillsTitle.textContent = translations.education[currentLang].go.skillsTitle;
          }

          // Etiquetas de habilidades - Mantener como están ya que son las mismas en ambos idiomas
        }
      }
    });
  }

  function updateContactSection() {
    if (elementExists('#contact .contact-title')) {
      document.querySelector('#contact .contact-title').textContent =
        translations.contact[currentLang].title + '.';
    }

    if (elementExists('.contact-description')) {
      document.querySelector('.contact-description').textContent =
        translations.contact[currentLang].description;
    }

    // Formulario
    if (elementExists('#name')) {
      document.querySelector('#name').placeholder = translations.contact[currentLang].form.name;
    }

    if (elementExists('#email')) {
      document.querySelector('#email').placeholder = translations.contact[currentLang].form.email;
    }

    if (elementExists('#subject')) {
      document.querySelector('#subject').placeholder = translations.contact[currentLang].form.subject;
    }

    if (elementExists('#message')) {
      document.querySelector('#message').placeholder = translations.contact[currentLang].form.message;
    }

    if (elementExists('.submit-btn')) {
      document.querySelector('.submit-btn').textContent = translations.contact[currentLang].form.send;
    }
  }

  function updateFooter() {
    if (elementExists('.footer p')) {
      document.querySelector('.footer p').textContent = translations.footer[currentLang];
    }
  }

  // Event listener para el botón de cambio de idioma
  languageToggle.addEventListener('click', function () {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    changeLanguage(newLang);
  });

  // Event listener para teclas de accesibilidad
  languageToggle.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const newLang = currentLang === 'es' ? 'en' : 'es';
      changeLanguage(newLang);
    }
  });

  // Detectar idioma preferido por el usuario si no hay una preferencia guardada
  function detectPreferredLanguage() {
    const savedLang = localStorage.getItem('preferredLanguage');

    if (savedLang) {
      // Si hay un idioma guardado, úsalo
      return savedLang;
    } else {
      // Detectar idioma del navegador 
      const browserLang = navigator.language || navigator.userLanguage;

      // Simplificar a solo 'en' o 'es'
      return browserLang.startsWith('es') ? 'es' : 'en';
    }
  }

  // Almacenar la preferencia de idioma
  function saveLanguagePreference(lang) {
    localStorage.setItem('preferredLanguage', lang);
  }

  // Configurar idioma inicial basado en preferencias
  const initialLang = detectPreferredLanguage();
  if (initialLang !== currentLang) {
    changeLanguage(initialLang);
  }

  // Guardar preferencia cuando el idioma cambia
  languageToggle.addEventListener('click', function () {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    saveLanguagePreference(newLang);
  });
});
