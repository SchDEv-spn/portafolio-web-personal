// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== PARTÍCULAS PARA EL HERO =====
function createHeroParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'hero-particles';
    document.querySelector('#hero').appendChild(particlesContainer);

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Tamaño aleatorio
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Animación aleatoria
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ===== CONTADORES ANIMADOS PARA LA FRAJA =====
// ===== CONTADORES ANIMADOS - VERSIÓN CORREGIDA =====
function animateCounters() {
    const counters = document.querySelectorAll('.fraja p');
    
    counters.forEach(counter => {
        // Guardar el HTML ORIGINAL con los spans
        const originalHTML = counter.innerHTML;
        
        // Extraer solo el número y el texto del span
        const numberMatch = originalHTML.match(/(\d+)\+/);
        const spanMatch = originalHTML.match(/<span[^>]*>(.*?)<\/span>/);
        
        if (numberMatch && spanMatch) {
            const target = parseInt(numberMatch[1]);
            const spanText = spanMatch[1]; // Texto dentro del span
            let current = 0;
            
            const updateCounter = () => {
                current += target / 30;
                if (current < target) {
                    // Mantener la estructura con el span
                    counter.innerHTML = Math.ceil(current) + '+ <span>' + spanText + '</span>';
                    setTimeout(updateCounter, 1500 / 30);
                } else {
                    // Restaurar el HTML original exacto
                    counter.innerHTML = originalHTML;
                }
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        }
    });
}

// ===== SMOOTH SCROLL PARA NAVEGACIÓN =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== TYPING EFFECT PARA EL TÍTULO =====
function initTypingEffect() {
    const title = document.querySelector('#hero h1');
    const originalText = title.innerHTML;
    
    // Reset para la animación
    title.style.opacity = '0';
    
    setTimeout(() => {
        title.style.opacity = '1';
    }, 300);
}

// ===== INICIALIZAR TODO AL CARGAR =====
document.addEventListener('DOMContentLoaded', function() {
    initNavbarScroll();
    createHeroParticles();
    animateCounters();
    initSmoothScroll();
    initTypingEffect();
});

// ===== EFECTO DE MAQUINA DE ESCRIBIR (OPCIONAL) =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
// ===== ANIMACIÓN MEJORADA DE HABILIDADES RADIALES =====
function initSkillsAnimation() {
    const radialElements = document.querySelectorAll('.radial');
    
    // Crear partículas para cada habilidad
    radialElements.forEach((el, index) => {
        createSkillParticles(el);
        addWaveEffect(el);
        addSkillBadge(el);
    });
    
    // Animación de porcentajes con Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const radial = entry.target;
                animateRadialPercentage(radial);
                observer.unobserve(radial);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    radialElements.forEach(el => observer.observe(el));
}

function animateRadialPercentage(el) {
    const target = Math.max(0, Math.min(100, Number(el.dataset.value || 0)));
    const duration = 1800;
    const start = performance.now();
    const centerSpan = el.querySelector('.center span');
    
    // Efecto de sonido visual (opcional)
    el.style.setProperty('--glow-color', 'rgba(186, 253, 0, 0.8)');
    
    function frame(now) {
        const t = Math.min(1, (now - start) / duration);
        const current = Math.round(t * target);
        
        // Easing function para animación más natural
        const easeOutQuart = 1 - Math.pow(1 - t, 4);
        const easedValue = Math.round(easeOutQuart * target);
        
        el.style.setProperty('--percent', easedValue + '%');
        centerSpan.textContent = easedValue + '%';
        
        // Efecto de pulso en el porcentaje final
        if (easedValue === target) {
            centerSpan.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                centerSpan.style.animation = '';
            }, 500);
        }
        
        if (t < 1) {
            requestAnimationFrame(frame);
        } else {
            // Efecto final cuando completa la animación
            el.style.boxShadow = 
                '0 0 0 2px #BAFD00, 0 0 40px rgba(186, 253, 0, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.5)';
        }
    }
    requestAnimationFrame(frame);
}

// ===== PARTÍCULAS PARA CADA HABILIDAD =====
function createSkillParticles(radialElement) {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'skill-particles';
    radialElement.appendChild(particlesContainer);
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'skill-particle';
        
        // Posición inicial alrededor del círculo
        const angle = (i / 8) * Math.PI * 2;
        const radius = 70; // radio del radial
        
        particle.style.left = `calc(50% + ${Math.cos(angle) * radius}px)`;
        particle.style.top = `calc(50% + ${Math.sin(angle) * radius}px)`;
        
        // Animación aleatoria
        particle.style.animationDelay = `${i * 0.5}s`;
        particle.style.animationDuration = `${3 + Math.random() * 2}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// ===== EFECTO DE ONDAS =====
function addWaveEffect(radialElement) {
    const wave = document.createElement('div');
    wave.className = 'radial-wave';
    radialElement.appendChild(wave);
    
    // Crear múltiples ondas
    for (let i = 1; i <= 2; i++) {
        const additionalWave = wave.cloneNode();
        additionalWave.style.animationDelay = `${i * 0.7}s`;
        radialElement.appendChild(additionalWave);
    }
}

// ===== BADGE DE HABILIDAD =====
function addSkillBadge(radialElement) {
    const skillName = radialElement.nextElementSibling?.textContent || 'Skill';
    const badge = document.createElement('div');
    badge.className = 'skill-badge';
    badge.textContent = skillName.split('/')[0]; // Tomar solo la primera parte
    badge.title = `Nivel: ${radialElement.dataset.value}%`;
    
    radialElement.appendChild(badge);
}

// ===== EFECTO HOVER MEJORADO =====
function initSkillHoverEffects() {
    const skillCards = document.querySelectorAll('.habilidades .col-lg-3');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const radial = this.querySelector('.radial');
            const skillName = this.querySelector('h5');
            
            // Efecto de elevación
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
            
            // Efecto de brillo en el nombre
            skillName.style.textShadow = '0 0 15px rgba(186, 253, 0, 0.7)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const skillName = this.querySelector('h5');
            skillName.style.textShadow = 'none';
        });
    });
}

// ===== INICIALIZAR HABILIDADES =====
document.addEventListener('DOMContentLoaded', function() {
    initSkillsAnimation();
    initSkillHoverEffects();
    
    // Agregar estilos dinámicos para animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        .radial.animated {
            animation: radialEntrance 1s ease-out;
        }
        
        @keyframes radialEntrance {
            from {
                transform: scale(0) rotate(-180deg);
                opacity: 0;
            }
            to {
                transform: scale(1) rotate(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});

// ===== REINICIAR ANIMACIONES AL VOLVER A VER =====
function resetSkillsOnView() {
    const skillsSection = document.querySelector('.habilidades');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reiniciar animaciones si es necesario
                const radials = entry.target.querySelectorAll('.radial');
                radials.forEach(radial => {
                    radial.style.animation = 'none';
                    setTimeout(() => {
                        radial.style.animation = '';
                    }, 10);
                });
            }
        });
    });
    
    observer.observe(skillsSection);
}
// Datos de proyectos
const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "Plataforma de comercio electrónico completa con carrito de compras, pasarela de pago y panel de administración.",
        image: "../img/proyecto1.png",
        category: "web",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        demoLink: "#",
        codeLink: "#",
        featured: true
    },
    {
        id: 2,
        title: "Fitness Mobile App",
        description: "Aplicación móvil para seguimiento de ejercicios, nutrición y progreso con sistema de gamificación.",
        image: "../img/proyecto1.png",
        category: "mobile",
        technologies: ["React Native", "Firebase", "Redux"],
        demoLink: "#",
        codeLink: "#",
        featured: true
    },
    {
        id: 3,
        title: "Brand Identity",
        description: "Sistema de diseño completo incluyendo logo, paleta de colores y guías de estilo para startup tecnológica.",
        image: "../img/proyecto1.png",
        category: "design",
        technologies: ["Figma", "Illustrator", "Photoshop"],
        demoLink: "#",
        codeLink: "#",
        featured: false
    },
    {
        id: 4,
        title: "Analytics Dashboard",
        description: "Panel de control interactivo con visualización de datos en tiempo real y reportes avanzados.",
        image: "../img/proyecto1.png",
        category: "web",
        technologies: ["Vue.js", "D3.js", "Express", "MySQL"],
        demoLink: "#",
        codeLink: "#",
        featured: true
    },
    {
        id: 5,
        title: "Banking UI/UX",
        description: "Rediseño completo de aplicación bancaria móvil con enfoque en accesibilidad y experiencia de usuario.",
        image: "../img/proyecto1.png",
        category: "design",
        technologies: ["Figma", "Principle", "After Effects"],
        demoLink: "#",
        codeLink: "#",
        featured: false
    },
    {
        id: 6,
        title: "FullStack Social App",
        description: "Aplicación social completa con chat en tiempo real, publicaciones y sistema de amigos.",
        image: "../img/proyecto1.png",
        category: "fullstack",
        technologies: ["React", "Socket.io", "PostgreSQL", "Redis"],
        demoLink: "#",
        codeLink: "#",
        featured: true
    },
    {
        id: 7,
        title: "Task Manager",
        description: "Aplicación de gestión de tareas con colaboración en equipo y notificaciones en tiempo real.",
        image: "../img/proyecto1.png",
        category: "web",
        technologies: ["Vue.js", "Node.js", "Socket.io", "MongoDB"],
        demoLink: "#",
        codeLink: "#",
        featured: false
    },
    {
        id: 8,
        title: "Weather App",
        description: "Aplicación meteorológica con pronósticos detallados y alertas personalizadas.",
        image: "../img/proyecto1.png",
        category: "mobile",
        technologies: ["React Native", "API Integration", "Redux"],
        demoLink: "#",
        codeLink: "#",
        featured: false
    }
];

let currentProjectIndex = 0;
let filteredProjects = [...projects];
let autoPlayInterval;
const visibleCards = 4; // Mostrar 4 tarjetas visibles

// ===== INICIALIZACIÓN =====
function initPortfolio() {
    renderProjects();
    setupEventListeners();
    createParticles();
    startAutoPlay();
    updateProjectCounter();
}

// ===== RENDERIZAR PROYECTOS =====
function renderProjects() {
    const track = document.getElementById('portfolioTrack');
    const indicators = document.getElementById('portfolioIndicators');
    
    if (!track || !indicators) return;
    
    track.innerHTML = '';
    indicators.innerHTML = '';
    
    // Calcular índices para mostrar 4 tarjetas centradas
    let startIndex = calculateStartIndex();
    const endIndex = Math.min(startIndex + visibleCards, filteredProjects.length);
    const visibleProjects = filteredProjects.slice(startIndex, endIndex);
    
    // Renderizar tarjetas visibles
    visibleProjects.forEach((project, index) => {
        const absoluteIndex = startIndex + index;
        const projectCard = document.createElement('div');
        projectCard.className = `project-card ${absoluteIndex === currentProjectIndex ? 'active' : ''}`;
        projectCard.setAttribute('data-category', project.category);
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                ${project.featured ? '<div class="project-badge">Destacado</div>' : ''}
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                
                <div class="project-actions">
                    <a href="${project.demoLink}" class="btn-project btn-primary" target="_blank">
                        Ver Demo
                    </a>
                    <a href="${project.codeLink}" class="btn-project btn-outline" target="_blank">
                        Código
                    </a>
                </div>
            </div>
        `;
        
        // Agregar evento click a la tarjeta
        projectCard.addEventListener('click', () => goToProject(absoluteIndex));
        track.appendChild(projectCard);
    });
    
    // Crear indicadores para todos los proyectos
    filteredProjects.forEach((project, index) => {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === currentProjectIndex ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToProject(index));
        indicators.appendChild(indicator);
    });
    
    updateProjectCounter();
}

// ===== CÁLCULO DE ÍNDICES =====
function calculateStartIndex() {
    if (filteredProjects.length <= visibleCards) {
        return 0;
    }
    
    // Centrar la tarjeta activa cuando sea posible
    let startIndex = currentProjectIndex - Math.floor(visibleCards / 2);
    
    // Ajustar si nos salimos por el inicio
    if (startIndex < 0) {
        startIndex = 0;
    }
    
    // Ajustar si nos salimos por el final
    if (startIndex + visibleCards > filteredProjects.length) {
        startIndex = filteredProjects.length - visibleCards;
    }
    
    return startIndex;
}

// ===== NAVEGACIÓN =====
function nextProject() {
    if (currentProjectIndex < filteredProjects.length - 1) {
        currentProjectIndex++;
    } else {
        currentProjectIndex = 0; // Volver al inicio
    }
    renderProjects();
    resetAutoPlay();
}

function prevProject() {
    if (currentProjectIndex > 0) {
        currentProjectIndex--;
    } else {
        currentProjectIndex = filteredProjects.length - 1; // Ir al final
    }
    renderProjects();
    resetAutoPlay();
}

function goToProject(index) {
    if (index >= 0 && index < filteredProjects.length) {
        currentProjectIndex = index;
        renderProjects();
        resetAutoPlay();
    }
}

// ===== FILTROS =====
function setupEventListeners() {
    // Filtros por categoría
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Actualizar botones activos
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar proyectos
            const filter = this.getAttribute('data-filter');
            applyFilter(filter);
        });
    });
    
    // Navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevProject();
        if (e.key === 'ArrowRight') nextProject();
    });
    
    // Touch swipe para móviles
    setupTouchSwipe();
    
    // Pausar autoplay al interactuar con el carrusel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
        carouselContainer.addEventListener('touchstart', stopAutoPlay);
    }
}

function applyFilter(filter) {
    if (filter === 'all') {
        filteredProjects = [...projects];
    } else {
        filteredProjects = projects.filter(project => project.category === filter);
    }
    
    // Resetear al primer proyecto después de filtrar
    currentProjectIndex = 0;
    renderProjects();
    resetAutoPlay();
}

// ===== SWIPE PARA MÓVILES =====
function setupTouchSwipe() {
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Solo procesar si es un swipe horizontal significativo
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextProject();
            } else {
                prevProject();
            }
        }
    });
}

// ===== AUTOPLAY =====
function startAutoPlay() {
    stopAutoPlay(); // Limpiar cualquier intervalo existente
    autoPlayInterval = setInterval(() => {
        nextProject();
    }, 5000); // Cambiar cada 5 segundos
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// ===== CONTADOR DE PROYECTOS =====
function updateProjectCounter() {
    const currentElement = document.getElementById('currentProject');
    const totalElement = document.getElementById('totalProjects');
    
    if (currentElement && totalElement) {
        currentElement.textContent = currentProjectIndex + 1;
        totalElement.textContent = filteredProjects.length;
    }
}

// ===== PARTÍCULAS DECORATIVAS =====
function createParticles() {
    const container = document.querySelector('.portfolio-section');
    if (!container) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'portfolio-particles';
    container.appendChild(particlesContainer);
    
    // Crear partículas
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Tamaño aleatorio
        const size = Math.random() * 2 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Animación aleatoria
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ===== FUNCIONES GLOBALES PARA HTML =====
// Estas funciones se llaman desde los botones en el HTML
window.nextProject = nextProject;
window.prevProject = prevProject;

// ===== INICIALIZAR AL CARGAR LA PÁGINA =====
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que la sección esté en el DOM
    if (document.getElementById('portafolio-section')) {
        initPortfolio();
    }
});

// ===== REINICIAR AL HACER SCROLL A LA SECCIÓN =====
function initPortfolioObserver() {
    const portfolioSection = document.getElementById('portafolio-section');
    if (!portfolioSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reiniciar autoplay cuando la sección sea visible
                resetAutoPlay();
            } else {
                // Pausar autoplay cuando no sea visible
                stopAutoPlay();
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(portfolioSection);
}

// Inicializar observer cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initPortfolio();
    initPortfolioObserver();
});

// ===== EXPORTAR FUNCIONES PARA USO GLOBAL =====
// Esto permite que las funciones sean accesibles desde la consola del navegador
if (typeof window !== 'undefined') {
    window.portfolio = {
        nextProject,
        prevProject,
        goToProject,
        applyFilter,
        getCurrentProject: () => filteredProjects[currentProjectIndex],
        getFilteredProjects: () => filteredProjects
    };
}
// ===== ESTUDIOS - VERSIÓN SUPER SEGURA =====
function initStudiesSuperSafe() {
    console.log('Inicializando sección Estudios de forma segura...');
    
    // 1. Tooltips básicos (muy seguro)
    try {
        const icons = document.querySelectorAll('.skills-cards .list-inline-item');
        icons.forEach((icon, index) => {
            const img = icon.querySelector('img');
            if (img) {
                icon.style.position = 'relative';
                icon.style.cursor = 'pointer';
                
                icon.addEventListener('mouseenter', function() {
                    img.style.transform = 'scale(1.2)';
                    img.style.transition = 'transform 0.3s ease';
                });
                
                icon.addEventListener('mouseleave', function() {
                    img.style.transform = 'scale(1)';
                });
            }
        });
    } catch (error) {
        console.log('Error en tooltips:', error);
    }
    
    // 2. Partículas (opcional, puedes comentar si causa problemas)
    try {
        createStudiesParticlesSimple();
    } catch (error) {
        console.log('Error en partículas:', error);
    }
    
    // 3. Hover effects básicos en tarjetas
    try {
        const cards = document.querySelectorAll('.skills-cards, #estudios .card.shadow-sm');
        cards.forEach(card => {
            card.style.transition = 'all 0.3s ease';
            
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            });
        });
    } catch (error) {
        console.log('Error en hover effects:', error);
    }
}

function createStudiesParticlesSimple() {
    const container = document.getElementById('estudios');
    if (!container) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'studies-particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    container.appendChild(particlesContainer);
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #BAFD00;
            border-radius: 50%;
            opacity: 0;
            animation: studyFloatSimple 8s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 8}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Agregar keyframes simples
    const style = document.createElement('style');
    style.textContent = `
        @keyframes studyFloatSimple {
            0%, 100% {
                transform: translate(0, 0);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            50% {
                transform: translate(50px, -30px);
            }
        }
    `;
    document.head.appendChild(style);
}

// INICIALIZACIÓN MÁS SEGURA
document.addEventListener('DOMContentLoaded', function() {
    // Usar la versión super segura
    initStudiesSuperSafe();
    
    // O comentar la línea de arriba y usar esta para desactivar completamente:
    // console.log('Estudios: JavaScript desactivado temporalmente');
});

// ===== GUSTOS PERSONALES MEJORADO =====
// function initGustosSection() {
//     addTooltipsToGustos();
//     createGustosParticles();
//     setupGustosHoverEffects();
//     initGustosScrollAnimation();
// }

// ===== TOOLTIPS PARA GUSTOS =====
// function addTooltipsToGustos() {
//     const gustosItems = document.querySelectorAll('#gustos .gustos .col-4');
//     const tooltips = [
//         '💻 Programación y desarrollo web',
//         '✈️ Viajar y conocer nuevas culturas', 
//         '🎬 Cine y series de ciencia ficción',
//         '🎵 Música electrónica y rock',
//         '📚 Lectura de tecnología y ciencia',
//         '⚽ Fútbol y deportes al aire libre'
//     ];
    
//     gustosItems.forEach((item, index) => {
//         if (item && tooltips[index]) {
//             item.setAttribute('data-tooltip', tooltips[index]);
//         }
//     });
// }

// ===== PARTÍCULAS DECORATIVAS =====
function createGustosParticles() {
    const container = document.getElementById('gustos');
    if (!container) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'gustos-particles';
    container.appendChild(particlesContainer);
    
    // Crear partículas
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'gusto-particle';
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Tamaño aleatorio
        const size = Math.random() * 2 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Animación aleatoria
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ===== EFECTOS HOVER AVANZADOS =====
function setupGustosHoverEffects() {
    const gustosItems = document.querySelectorAll('#gustos .gustos .col-4');
    
    gustosItems.forEach((item, index) => {
        const iconSpan = item.querySelector('span');
        const iconImg = item.querySelector('img');
        const text = item.querySelector('p');
        
        item.addEventListener('mouseenter', function() {
            // Efecto de iluminación secuencial
            setTimeout(() => {
                if (iconSpan) {
                    iconSpan.style.transform = 'scale(1.2) rotate(15deg)';
                    iconSpan.style.boxShadow = '0 0 40px rgba(186, 253, 0, 0.6)';
                }
                if (iconImg) {
                    iconImg.style.filter = 'brightness(0) invert(0.7) sepia(1) hue-rotate(80deg) saturate(5)';
                    iconImg.style.transform = 'scale(1.3) rotate(-15deg)';
                }
                if (text) {
                    text.style.color = '#BAFD00';
                    text.style.transform = 'translateY(-8px)';
                    text.style.textShadow = '0 0 20px rgba(186, 253, 0, 0.7)';
                }
            }, index * 50);
        });
        
        item.addEventListener('mouseleave', function() {
            // Resetear efectos
            if (iconSpan) {
                iconSpan.style.transform = 'scale(1) rotate(0deg)';
                iconSpan.style.boxShadow = 'none';
            }
            if (iconImg) {
                iconImg.style.filter = 'brightness(0) invert(1)';
                iconImg.style.transform = 'scale(1) rotate(0deg)';
            }
            if (text) {
                text.style.color = '';
                text.style.transform = 'translateY(0)';
                text.style.textShadow = 'none';
            }
        });
    });
    
    // Efectos para detalles personales
    const detallesRow = document.querySelector('#gustos .detalles .row');
    if (detallesRow) {
        detallesRow.addEventListener('mouseenter', function() {
            const h3Elements = this.querySelectorAll('h3');
            h3Elements.forEach((h3, index) => {
                setTimeout(() => {
                    h3.style.transform = 'translateX(10px)';
                    h3.style.color = '#ffffff';
                }, index * 100);
            });
        });
        
        detallesRow.addEventListener('mouseleave', function() {
            const h3Elements = this.querySelectorAll('h3');
            h3Elements.forEach((h3, index) => {
                setTimeout(() => {
                    h3.style.transform = 'translateX(0)';
                    if (index < 4) {
                        h3.style.color = '#BAFD00';
                    } else {
                        h3.style.color = '#ffffff';
                    }
                }, index * 50);
            });
        });
    }
}

// ===== ANIMACIÓN AL SCROLL =====
function initGustosScrollAnimation() {
    const gustosSection = document.getElementById('gustos');
    
    if (!gustosSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Activar animaciones cuando la sección sea visible
                const gustosItems = entry.target.querySelectorAll('#gustos .gustos .col-4');
                
                gustosItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animationPlayState = 'running';
                    }, index * 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    observer.observe(gustosSection);
}

// ===== INICIALIZACIÓN SEGURA =====
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('gustos')) {
        initGustosSection();
        
        // Agregar estilos CSS dinámicos
        const styles = document.createElement('style');
        styles.textContent = `
            #gustos .gustos .col-4 {
                animation-play-state: paused;
            }
        `;
        document.head.appendChild(styles);
    }
});
// ===== CORRECCIÓN DINÁMICA PARA EL EMAIL =====
function fixEmailDisplay() {
    const emailElement = document.querySelector('#gustos .detalles .col-6:last-child h3:nth-child(2)');
    if (!emailElement) return;
    
    const email = 'schneider.manrique@gmail.com';
    
    function adjustEmailDisplay() {
        const containerWidth = emailElement.parentElement.offsetWidth;
        
        if (containerWidth < 300) {
            // Para pantallas muy pequeñas, dividir el email
            emailElement.innerHTML = `
                <span style="display: block;">schneider.manrique</span>
                <span style="display: block;">@gmail.com</span>
            `;
            emailElement.style.lineHeight = '1.2';
        } else if (containerWidth < 400) {
            // Para pantallas pequeñas, reducir tamaño de fuente
            emailElement.style.fontSize = '0.85rem';
            emailElement.textContent = email;
        } else {
            // Para pantallas normales, tamaño normal
            emailElement.style.fontSize = '';
            emailElement.textContent = email;
        }
    }
    
    // Ajustar al cargar y al redimensionar
    adjustEmailDisplay();
    window.addEventListener('resize', adjustEmailDisplay);
}

// Inicializar la corrección
document.addEventListener('DOMContentLoaded', function() {
    fixEmailDisplay();
});




