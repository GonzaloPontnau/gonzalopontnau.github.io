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
        'spinlabEngineer': {
          'role': 'Ingeniero de IA agéntica',
          'type': 'Spinlab',
          'location': 'Latam · Remoto',
          'period': 'Abr 2026 - Presente',
          'description1': 'Diseño y entrego soluciones empresariales de <strong>IA y automatización inteligente</strong> para clientes multinacionales mediante tecnologías Microsoft, traduciendo necesidades de negocio en flujos seguros y adoptables.',
          'stack_title': 'Pilares y capacidades principales:',
          'tech1': '<span class="tech-highlight">Desarrollo de Soluciones Empresariales:</span> Construcción de flujos inteligentes utilizando Power Automate, AI Builder, Azure AI Foundry, Microsoft 365, SharePoint, Power Apps y APIs empresariales personalizadas.',
          'tech2': '<span class="tech-highlight">Impacto Ejecutivo de Alta Visibilidad:</span> Entrega de una solución de IA de alta visibilidad para la oficina del Regional President, Latin America, en una compañía global de seguros.',
          'tech3': '<span class="tech-highlight">Seguridad y Gobernanza Corporativa:</span> Aplicación de controles de acceso, protección de datos, políticas DLP, gobernanza y esquemas de despliegue controlado en entornos corporativos.',
          'tech4': '<span class="tech-highlight">Adopción Empresarial de IA:</span> Impulso de la adopción corporativa de IA, ayudando a equipos de negocio a convertir prototipos y casos de uso iniciales en soluciones gobernadas incorporadas a sus operaciones diarias.'
        },
        'abbIntern': {
          'role': 'Pasante de Ingeniería de IA',
          'type': 'ABB · Pasante',
          'location': 'Buenos Aires, Argentina · Remoto',
          'period': 'Oct 2025 - Presente',
          'description1': 'Contribuyo al diseño y desarrollo de soluciones de <strong>IA agéntica</strong> para la ejecución de proyectos y operaciones de negocio, combinando orquestación multiagente, recuperación de conocimiento empresarial e inferencia local de modelos de lenguaje.',
          'stack_title': 'Arquitectura y componentes técnicos:',
          'tech1': '<span class="tech-highlight">Orquestación multiagente:</span> Diseño de arquitecturas modulares y multiagente con <strong>LangGraph</strong>, incluyendo enrutamiento de intenciones, agentes especializados, contexto compartido, ejecución de herramientas, validación y controles HITL.',
          'tech2': '<span class="tech-highlight">Pipelines de RAG y GraphRAG:</span> Definición e implementación de pipelines de <strong>RAG y GraphRAG</strong> para documentación y conocimiento empresarial, cubriendo ingesta, fragmentación, embeddings, búsqueda vectorial y generación fundamentada.',
          'tech3': '<span class="tech-highlight">Inferencia local de IA:</span> Diseño de arquitecturas de IA local utilizando <strong>vLLM, Qdrant, PostgreSQL, FastAPI</strong> y servicios contenerizados, evaluando privacidad, latencia, costos de infraestructura y ejecución sin conexión.',
          'tech4': '<span class="tech-highlight">Gobernanza y arquitectura empresarial:</span> Aplicación de Arquitectura Hexagonal, límites modulares, SSO, RBAC, guardrails, auditabilidad, validación de flujos de trabajo y puntos de aprobación <strong>Human-in-the-Loop</strong>.'
        },
        'aiQualityAnalyst': {
          'role': 'Analista de calidad de IA',
          'type': 'Outlier · Independiente',
          'location': 'Buenos Aires, Argentina · Remoto',
          'period': 'Jun 2025 - Dic 2025',
          'description1': 'Evaluación y mejora de modelos generativos de IA mediante <strong>RLHF (aprendizaje por refuerzo a partir de la retroalimentación humana)</strong>, diseño de prompts de sistema, escenarios de prueba complejos y rúbricas estructuradas de evaluación técnica.',
          'description2': 'Análisis y diagnóstico sistemático de respuestas de LLMs, evaluando seguimiento de instrucciones, veracidad, completitud, corrección, estilo y uso de herramientas como function calling, APIs y búsqueda para elevar la calidad y seguridad de los modelos.',
          'stack_title': 'Stack de QA y evaluación de LLMs:',
          'tech1': '<span class="tech-highlight">Evaluación de modelos y RLHF:</span> Diseño de rúbricas estructuradas y auditorías técnicas para guiar el ajuste fino y la alineación de modelos de lenguaje generativos.',
          'tech2': '<span class="tech-highlight">Herramientas y Function Calling:</span> Verificación de capacidades agénticas y uso correcto de herramientas externas (function calling, APIs corporativas y búsqueda).',
          'tech3': '<span class="tech-highlight">Métricas de calidad y seguridad:</span> Diagnóstico preciso de errores diferenciando entre fallos de lógica/correctitud e incumplimiento de restricciones del prompt.'
        }
      },
      'en': {
        'title': 'Work Experience',
        'spinlabEngineer': {
          'role': 'Agentic AI Engineer',
          'type': 'Spinlab',
          'location': 'Latam · Remote',
          'period': 'Apr 2026 - Present',
          'description1': 'I design and deliver <strong>enterprise AI and intelligent automation</strong> solutions for multinational clients using Microsoft technologies, translating business needs into secure and adoptable workflows.',
          'stack_title': 'Core Pillars & Capabilities:',
          'tech1': '<span class="tech-highlight">Enterprise Solutions Development:</span> Building intelligent workflows using Power Automate, AI Builder, Azure AI Foundry, Microsoft 365, SharePoint, Power Apps, and custom enterprise APIs.',
          'tech2': '<span class="tech-highlight">High-Visibility Executive Impact:</span> Delivered a high-visibility AI-enabled solution for the office of the Regional President, Latin America, at a global insurance company.',
          'tech3': '<span class="tech-highlight">Enterprise Security & Governance:</span> Applied access control, data protection, DLP policies, governance, and controlled deployment workflows in corporate environments.',
          'tech4': '<span class="tech-highlight">Enterprise AI Adoption:</span> Drove corporate AI adoption by helping business teams transition initial use cases and prototypes into governed operational solutions.'
        },
        'abbIntern': {
          'role': 'AI Engineer Intern',
          'type': 'ABB · Intern',
          'location': 'Buenos Aires, Argentina · Remote',
          'period': 'Oct 2025 - Present',
          'description1': 'I contribute to the design and development of <strong>Agentic AI</strong> solutions for project execution and business operations, combining multi-agent orchestration, enterprise knowledge retrieval, and local LLM inference.',
          'stack_title': 'Architecture & Technical Stack:',
          'tech1': '<span class="tech-highlight">Multi-Agent Orchestration:</span> Design modular multi-agent architectures using <strong>LangGraph</strong>, including intent routing, specialized agents, shared context, tool execution, validation, and HITL controls.',
          'tech2': '<span class="tech-highlight">RAG & GraphRAG Pipelines:</span> Define RAG and GraphRAG pipelines for project documentation and enterprise knowledge, covering ingestion, chunking, embeddings, vector search, and grounded response generation.',
          'tech3': '<span class="tech-highlight">Local AI Infrastructure:</span> Design local AI architectures using <strong>vLLM, Qdrant, PostgreSQL, FastAPI</strong>, and containerized services, evaluating privacy, latency, infrastructure costs, and offline execution.',
          'tech4': '<span class="tech-highlight">Governance & Enterprise Architecture:</span> Apply Hexagonal Architecture, modular boundaries, SSO, RBAC, guardrails, auditability, workflow validation, and <strong>Human-in-the-Loop</strong> approval points.'
        },
        'aiQualityAnalyst': {
          'role': 'AI Quality Analyst',
          'type': 'Outlier · Freelance',
          'location': 'Buenos Aires, Argentina · Remote',
          'period': 'Jun 2025 - Dec 2025',
          'description1': 'Evaluated and improved generative AI models through <strong>RLHF (Reinforcement Learning from Human Feedback)</strong>, designing prompts, test scenarios, and structured technical evaluation rubrics.',
          'description2': 'Reviewed tool usage, including function calls, APIs, and search, analyzing instruction following, truthfulness, completeness, correctness, style, and safety to refine evaluation guidelines and model outputs.',
          'stack_title': 'QA & LLM Evaluation Stack:',
          'tech1': '<span class="tech-highlight">Model Evaluation & RLHF:</span> Creation of technical evaluation rubrics and structured feedback to guide generative LLM fine-tuning and alignment.',
          'tech2': '<span class="tech-highlight">Tooling & Function Calling:</span> Verification of agentic execution capabilities and proper utilization of external tools (function calling, APIs, search).',
          'tech3': '<span class="tech-highlight">Quality & Safety Metrics:</span> Methodical diagnosis differentiating instruction following mistakes from correctness issues.'
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
        'bio2': 'Me apasiona <span class="highlight">hacer visible el impacto de la IA</span>: trabajo de cerca con diferentes áreas de negocio para entender sus necesidades, diseñar soluciones adoptables y demostrar con datos cómo la automatización mejora su operación. El futuro del software estará cada vez más ligado a servicios inteligentes capaces de resolver problemas de punta a punta, y quienes logren llevar esas ideas a la práctica serán quienes marquen la diferencia.',
        'bio3': 'La comunicación es una de mis principales fortalezas: soy extrovertido, trabajo muy bien en equipo y conecto fácilmente con personas diversas, algo clave cuando se construyen soluciones de IA que cruzan tecnología, negocio y usuarios finales.',
        'skillsTitle': 'Tecnologías'
      },
      'en': {
        'title': 'About Me',
        'bio1': 'Advanced Systems Engineering student (UTN.BA) specialized in <span class="highlight">AI Engineering</span>. I lead the creation of <span class="highlight">intelligent agents</span> and automated workflows that transform manual operations into efficient processes, saving time and reducing errors in the daily work of corporate teams.',
        'bio2': 'I\'m passionate about <span class="highlight">making AI impact visible</span>: I work closely with different business areas to understand their needs, design adoptable solutions, and demonstrate with data how automation improves their operations. The future of software will be increasingly connected to intelligent services capable of solving problems end to end, and those who turn these ideas into reality will be the ones who make the difference.',
        'bio3': 'Communication is one of my main strengths: I\'m extroverted, work very well in teams, and connect easily with diverse people, which is key when building AI solutions that bridge technology, business, and end users.',
        'skillsTitle': 'Technologies'
      }
    },
    // Projects section
    'projects': {
      'es': {
        'title': 'Mis Proyectos',
        'tenderCortex': {
          'title': 'TenderCortex - Multi-Agent Intelligence',
          'description': 'Sistema multi-agente avanzado para automatizar el analisis y respuesta a licitaciones. Implementa arquitectura de orquestacion con LangGraph, RAG pipeline con Qdrant, y sub-agentes especializados (Legal, Financiero, Tecnico, Timeline) con auditor de calidad integrado y refinamiento iterativo.'
        },
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
        'tenderCortex': {
          'title': 'TenderCortex - Multi-Agent Intelligence',
          'description': 'Advanced multi-agent system to automate tender analysis and response. Implements orchestration architecture with LangGraph, RAG pipeline with Qdrant, and specialized sub-agents (Legal, Financial, Technical, Timeline) with integrated quality auditor and iterative refinement.'
        },
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
        'mcp': {
          'institution': 'Model Context Protocol: Advanced Topics',
          'degree': 'MCP Engineering & Production Deployment',
          'period': '| Anthropic',
          'description': 'Inmersión profunda en las características avanzadas del protocolo <strong>MCP (Model Context Protocol)</strong>, el estándar que permite a modelos de IA interactuar con herramientas externas y fuentes de datos en producción. <strong>15 lecciones</strong>, cuestionarios y certificado de finalización.',
          'modules': [
            'Servidores MCP con herramientas, logging y notificaciones de progreso',
            'Comunicación bidireccional cliente-servidor MCP',
            'Transportes stdio & HTTP para despliegues locales y remotos',
            'Sampling callbacks para solicitudes LLM iniciadas por servidor',
            'Depuración con mensajes JSON-RPC y StreamableHTTP',
            'Despliegue de servidores MCP escalables en producción'
          ],
          'summary': 'Orientado a ingenieros que construyen servidores MCP para producción: manejo seguro de acceso al sistema de archivos con roots, configuraciones HTTP stateless y resolución de problemas en la transición de desarrollo a producción.'
        },
        'agentSkills': {
          'institution': 'Introduction to Agent Skills',
          'degree': 'Claude Code Skills & AI Agent Customization',
          'period': '| Anthropic',
          'description': 'Curso enfocado en construir, configurar y compartir <strong>Skills</strong> (instrucciones reutilizables en Markdown) dentro de <strong>Claude Code</strong>, permitiendo que el agente aplique automáticamente directrices a las tareas correctas.',
          'modules': [
            'Creación de skills con SKILL.md y divulgación progresiva',
            'Configuración avanzada con allowed-tools y scripts',
            'Skills vs. CLAUDE.md, hooks y subagentes',
            'Distribución de skills vía plugins y configuraciones enterprise',
            'Delegación experta con subagentes personalizados',
            'Troubleshooting: diagnóstico de activación y conflictos'
          ],
          'summary': 'Formación completa en la creación y gestión de Skills para Claude Code: desde la escritura de frontmatter efectivo hasta la distribución empresarial y la conexión con subagentes expertos aislados para delegar tareas especializadas.'
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
        'mcp': {
          'institution': 'Model Context Protocol: Advanced Topics',
          'degree': 'MCP Engineering & Production Deployment',
          'period': '| Anthropic',
          'description': 'Deep dive into the advanced features of the <strong>MCP (Model Context Protocol)</strong>, the standard that enables AI models to interact with external tools and data sources in production. <strong>15 lessons</strong>, quizzes and completion certificate.',
          'modules': [
            'MCP servers with tools, logging and progress notifications',
            'Bidirectional client-server MCP communication',
            'stdio & HTTP transports for local and remote deployments',
            'Sampling callbacks for server-initiated LLM requests',
            'Debugging with JSON-RPC messages and StreamableHTTP',
            'Deploying scalable MCP servers in production'
          ],
          'summary': 'Designed for engineers building production MCP servers: secure file system access handling with roots, stateless HTTP configurations and troubleshooting the transition from development to production.'
        },
        'agentSkills': {
          'institution': 'Introduction to Agent Skills',
          'degree': 'Claude Code Skills & AI Agent Customization',
          'period': '| Anthropic',
          'description': 'Course focused on building, configuring and sharing <strong>Skills</strong> (reusable Markdown instructions) within <strong>Claude Code</strong>, enabling the agent to automatically apply guidelines to the right tasks.',
          'modules': [
            'Creating skills with SKILL.md and progressive disclosure',
            'Advanced configuration with allowed-tools and scripts',
            'Skills vs. CLAUDE.md, hooks and subagents',
            'Distributing skills via plugins and enterprise configurations',
            'Expert delegation with custom subagents',
            'Troubleshooting: activation diagnosis and conflicts'
          ],
          'summary': 'Comprehensive training in creating and managing Skills for Claude Code: from writing effective frontmatter to enterprise distribution and connecting with isolated expert subagents to delegate specialized tasks.'
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
      'es': '2026 Gonzalo Pontnau',
      'en': '2026 Gonzalo Pontnau'
    },
    // Interface, accessibility and metadata labels not covered by section copy
    'ui': {
      'es': {
        'cvSelectorTitle': 'Descargar CV',
        'cvSelectorLabel': 'Opciones de descarga del CV',
        'cvSpanish': 'Español',
        'cvEnglish': 'Inglés',
        'openMenu': 'Abrir menú',
        'closeMenu': 'Cerrar menú',
        'githubProfile': 'Perfil de GitHub',
        'linkedinProfile': 'Perfil de LinkedIn',
        'email': 'Correo electrónico',
        'profileImageAlt': 'Foto de perfil de Gonzalo Pontnau - AI Engineer',
        'viewCertificate': 'Ver certificado',
        'viewCourse': 'Ver curso en Digital House',
        'confidentialCaseStudy': 'Caso de estudio confidencial empresarial',
        'privateProject': 'Proyecto corporativo privado',
        'githubRepository': 'Repositorio de GitHub',
        'liveDemo': 'Demo en vivo',
        'tenderCortexDemo': 'Demo del sistema multiagente de RFP TenderCortex',
        'gymDemo': 'Demo de GymAI',
        'agenticPlatformAlt': 'Diagrama de Enterprise Agentic AI Platform',
        'executiveAutomationAlt': 'Interfaz de Executive AI Automation',
        'notesAppAlt': 'Notes App - Sistema de Gestión de Notas',
        'distributedOsAlt': 'Sistema Operativo Distribuido en Go',
        'badgeDescription': 'AI Engineer | IA agéntica • RAG • Automatización empresarial • Ingeniería de Sistemas @ UTN.BA',
        'viewProfile': 'Ver perfil'
      },
      'en': {
        'cvSelectorTitle': 'Download CV',
        'cvSelectorLabel': 'CV download options',
        'cvSpanish': 'Spanish',
        'cvEnglish': 'English',
        'openMenu': 'Open menu',
        'closeMenu': 'Close menu',
        'githubProfile': 'GitHub Profile',
        'linkedinProfile': 'LinkedIn Profile',
        'email': 'Email',
        'profileImageAlt': 'Profile photo of Gonzalo Pontnau - AI Engineer',
        'viewCertificate': 'View certificate',
        'viewCourse': 'View course at Digital House',
        'confidentialCaseStudy': 'Confidential enterprise case study',
        'privateProject': 'Private corporate project',
        'githubRepository': 'GitHub Repository',
        'liveDemo': 'Live Demo',
        'tenderCortexDemo': 'TenderCortex - Multi-Agent RFP System Demo',
        'gymDemo': 'GymAI - Demo',
        'agenticPlatformAlt': 'Enterprise Agentic AI Platform Diagram',
        'executiveAutomationAlt': 'Executive AI Automation Interface',
        'notesAppAlt': 'Notes App - Note Management System',
        'distributedOsAlt': 'Distributed Operating System in Go',
        'badgeDescription': 'AI Engineer | Agentic AI • RAG • Enterprise Automation • Systems Engineering @ UTN.BA',
        'viewProfile': 'View profile'
      }
    },
    // Language button
    'languageBtn': {
      'es': {
        'text': 'ES',
        'label': 'Cambiar a ingl?s'
      },
      'en': {
        'text': 'EN',
        'label': 'Switch to Español'
      }
    }
  };

  // Actualizar el estado del botón para reflejar el idioma actual
  function updateDeclarativeTranslations() {
    document.querySelectorAll('[data-es][data-en]').forEach((element) => {
      if (element.matches('.about-bio')) return;
      const translatedValue = element.getAttribute(`data-${currentLang}`);
      if (translatedValue !== null) element.textContent = translatedValue;
    });
  }

  function updateStaticInterface() {
    const ui = translations.ui[currentLang];

    updateDeclarativeTranslations();

    const cvSelector = document.getElementById('cv-selector');
    if (cvSelector) {
      cvSelector.setAttribute('title', ui.cvSelectorTitle);
      cvSelector.setAttribute('aria-label', ui.cvSelectorLabel);
    }

    document.querySelectorAll('#cv-options-menu [data-cv-language]').forEach((link) => {
      link.textContent = link.getAttribute('data-cv-language') === 'es' ? ui.cvSpanish : ui.cvEnglish;
    });

    const mobileMenuButton = document.getElementById('mobile-menu-btn');
    if (mobileMenuButton) mobileMenuButton.setAttribute('aria-label', ui.openMenu);

    const sidebarCloseButton = document.getElementById('sidebar-close-btn');
    if (sidebarCloseButton) sidebarCloseButton.setAttribute('aria-label', ui.closeMenu);

    const githubProfileLink = document.querySelector('.social-links a[href*="github.com"]');
    if (githubProfileLink) githubProfileLink.setAttribute('aria-label', ui.githubProfile);

    const linkedinProfileLink = document.querySelector('.social-links a[href*="linkedin.com"]');
    if (linkedinProfileLink) linkedinProfileLink.setAttribute('aria-label', ui.linkedinProfile);

    const emailLink = document.querySelector('.about-social a[href^="mailto:"]');
    if (emailLink) emailLink.setAttribute('aria-label', ui.email);

    const profileImage = document.getElementById('profile-image');
    if (profileImage) profileImage.setAttribute('alt', ui.profileImageAlt);

    const badgeImage = document.querySelector('.linkedin-badge-custom .badge-avatar img');
    if (badgeImage) badgeImage.setAttribute('alt', ui.profileImageAlt);

    const badgeDescription = document.querySelector('.linkedin-badge-custom .badge-description');
    if (badgeDescription) badgeDescription.textContent = ui.badgeDescription;

    const badgeAction = document.querySelector('.linkedin-badge-custom .badge-action');
    if (badgeAction) badgeAction.textContent = ui.viewProfile;

    document.querySelectorAll('#projects .project-link[aria-label]').forEach((link) => {
      const isGithub = link.getAttribute('href')?.includes('github.com');
      link.setAttribute('aria-label', isGithub ? ui.githubRepository : ui.liveDemo);
    });

    const mediaLabels = [
      ['#tender-cortex video', ui.tenderCortexDemo],
      ['#gym-ai video', ui.gymDemo]
    ];
    mediaLabels.forEach(([selector, label]) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute('title', label);
    });
  }

  function updateLanguageButtonState() {
    if (currentLanguage) {
      currentLanguage.textContent = translations.languageBtn[currentLang].text;
      languageToggle.setAttribute('title', translations.languageBtn[currentLang].label);
      languageToggle.setAttribute('aria-label', translations.languageBtn[currentLang].label);
    }
  }

  // Inicializar estado del botón
  updateLanguageButtonState();
  updateStaticInterface();
  updateExperienceSection();

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
      updateStaticInterface();

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

      // Despachar evento personalizado indicando que el idioma ha cambiado
      document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));

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

    // Spinlab Engineer
    if (elementExists('#spinlab-engineer')) {
      const exp = translations.experience[currentLang].spinlabEngineer;
      const el = document.querySelector('#spinlab-engineer');
      if (el.querySelector('.experience-title')) el.querySelector('.experience-title').textContent = exp.role;
      if (el.querySelector('.experience-type')) el.querySelector('.experience-type').textContent = exp.type;
      if (el.querySelector('.experience-location')) el.querySelector('.experience-location').textContent = exp.location;
      if (el.querySelector('.date-pill')) el.querySelector('.date-pill').textContent = exp.period;

      const descs = el.querySelectorAll('.experience-description p');
      if (descs.length >= 1) descs[0].innerHTML = exp.description1;

      if (el.querySelector('.tech-stack-title')) el.querySelector('.tech-stack-title').textContent = exp.stack_title;

      const techTexts = el.querySelectorAll('.tech-text');
      if (techTexts.length >= 1) techTexts[0].innerHTML = exp.tech1;
      if (techTexts.length >= 2) techTexts[1].innerHTML = exp.tech2;
      if (techTexts.length >= 3) techTexts[2].innerHTML = exp.tech3;
      if (techTexts.length >= 4) techTexts[3].innerHTML = exp.tech4;
    }

    // ABB Intern
    if (elementExists('#abb-trainee')) {
      const exp = translations.experience[currentLang].abbIntern;
      const el = document.querySelector('#abb-trainee');
      if (el.querySelector('.experience-title')) el.querySelector('.experience-title').textContent = exp.role;
      if (el.querySelector('.experience-type')) el.querySelector('.experience-type').textContent = exp.type;
      if (el.querySelector('.experience-location')) el.querySelector('.experience-location').textContent = exp.location;
      if (el.querySelector('.date-pill')) el.querySelector('.date-pill').textContent = exp.period;

      const descs = el.querySelectorAll('.experience-description p');
      if (descs.length >= 1) descs[0].innerHTML = exp.description1;

      if (el.querySelector('.tech-stack-title')) el.querySelector('.tech-stack-title').textContent = exp.stack_title;

      const techTexts = el.querySelectorAll('.tech-text');
      if (techTexts.length >= 1) techTexts[0].innerHTML = exp.tech1;
      if (techTexts.length >= 2) techTexts[1].innerHTML = exp.tech2;
      if (techTexts.length >= 3) techTexts[2].innerHTML = exp.tech3;
      if (techTexts.length >= 4) techTexts[3].innerHTML = exp.tech4;
    }

    // AI Quality Analyst
    if (elementExists('#ai-quality-analyst')) {
      const exp = translations.experience[currentLang].aiQualityAnalyst;
      const el = document.querySelector('#ai-quality-analyst');
      if (el.querySelector('.experience-title')) el.querySelector('.experience-title').textContent = exp.role;
      if (el.querySelector('.experience-type')) el.querySelector('.experience-type').textContent = exp.type;
      if (el.querySelector('.experience-location')) el.querySelector('.experience-location').textContent = exp.location;
      if (el.querySelector('.date-pill')) el.querySelector('.date-pill').textContent = exp.period;

      const descs = el.querySelectorAll('.experience-description p');
      if (descs.length >= 1) descs[0].innerHTML = exp.description1;
      if (descs.length >= 2) descs[1].innerHTML = exp.description2;

      if (el.querySelector('.tech-stack-title')) el.querySelector('.tech-stack-title').textContent = exp.stack_title;

      const techTexts = el.querySelectorAll('.tech-text');
      if (techTexts.length >= 1) techTexts[0].innerHTML = exp.tech1;
      if (techTexts.length >= 2) techTexts[1].innerHTML = exp.tech2;
      if (techTexts.length >= 3) techTexts[2].innerHTML = exp.tech3;
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

    // TenderCortex
    if (elementExists('#tender-cortex .project-title')) {
      document.querySelector('#tender-cortex .project-title').textContent =
        translations.projects[currentLang].tenderCortex.title;
    }

    if (elementExists('#tender-cortex .project-description')) {
      document.querySelector('#tender-cortex .project-description').textContent =
        translations.projects[currentLang].tenderCortex.description;
    }

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

    // Distributed Operating System in Go
    const distributedOsTitle = [...projectTitles].find(title =>
      title.textContent.includes('Sistema Operativo Distribuido') ||
      title.textContent.includes('Distributed Operating System')
    );
    if (distributedOsTitle) {
      distributedOsTitle.textContent = translations.projects[currentLang]['sistema-operativo'].title;
    }

    const distributedOsDescription = [...projectDescriptions].find(desc =>
      desc.textContent.includes('Sistema operativo distribuido') ||
      desc.textContent.includes('Distributed operating system')
    );
    if (distributedOsDescription) {
      distributedOsDescription.textContent = translations.projects[currentLang]['sistema-operativo'].description;
    }

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
      // MCP Advanced Topics
      if (institution.textContent.includes('Model Context Protocol')) {
        institution.textContent = translations.education[currentLang].mcp.institution;

        const parentCard = institution.closest('.education-card');
        if (parentCard) {
          const degree = parentCard.querySelector('.education-degree');
          if (degree) {
            degree.innerHTML =
              translations.education[currentLang].mcp.degree +
              ' <span class="education-date">' +
              translations.education[currentLang].mcp.period +
              '</span>';
          }

          const certOverview = parentCard.querySelector('.certification-overview p');
          if (certOverview) {
            certOverview.innerHTML = translations.education[currentLang].mcp.description;
          }

          const certHighlight = parentCard.querySelector('.certification-highlight p');
          if (certHighlight) {
            certHighlight.textContent = translations.education[currentLang].mcp.summary;
          }

          const moduleSpans = parentCard.querySelectorAll('.certification-module span:not(.cert-module-icon)');
          if (moduleSpans.length > 0) {
            const modules = translations.education[currentLang].mcp.modules;
            moduleSpans.forEach((span, index) => {
              if (index < modules.length) {
                span.textContent = modules[index];
              }
            });
          }
        }
      }

      // Introduction to Agent Skills
      if (institution.textContent.includes('Agent Skills')) {
        institution.textContent = translations.education[currentLang].agentSkills.institution;

        const parentCard = institution.closest('.education-card');
        if (parentCard) {
          const degree = parentCard.querySelector('.education-degree');
          if (degree) {
            degree.innerHTML =
              translations.education[currentLang].agentSkills.degree +
              ' <span class="education-date">' +
              translations.education[currentLang].agentSkills.period +
              '</span>';
          }

          const certOverview = parentCard.querySelector('.certification-overview p');
          if (certOverview) {
            certOverview.innerHTML = translations.education[currentLang].agentSkills.description;
          }

          const certHighlight = parentCard.querySelector('.certification-highlight p');
          if (certHighlight) {
            certHighlight.textContent = translations.education[currentLang].agentSkills.summary;
          }

          const moduleSpans = parentCard.querySelectorAll('.certification-module span:not(.cert-module-icon)');
          if (moduleSpans.length > 0) {
            const modules = translations.education[currentLang].agentSkills.modules;
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

  // Activar el mismo cambio con Enter o Space sin depender del default del navegador.
  languageToggle.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const newLang = currentLang === 'es' ? 'en' : 'es';
      changeLanguage(newLang);
      saveLanguagePreference(newLang);
    }
  });

  // Detectar idioma preferido por el usuario si no hay una preferencia guardada
  function detectPreferredLanguage() {
    const savedLang = localStorage.getItem('preferredLanguage');

    if (savedLang === 'es' || savedLang === 'en') {
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
