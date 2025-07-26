// app-improved.js
// Enhanced portfolio script with floating shapes, gravity effects, and improved animations

(async function() {
    try {
        const data = await fetch('portfolio-data.json').then(r => r.json());

        // Create floating shapes
        createFloatingShapes();
        
        // ===== Populate Navigation =====
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            data.navigation.forEach(item => {
                const li = document.createElement('li');
                li.role = 'none';
                const a = document.createElement('a');
                a.href = item.href;
                a.className = 'nav-link';
                a.textContent = item.label;
                a.role = 'menuitem';
                li.appendChild(a);
                navMenu.appendChild(li);
            });
        }

        // ===== Hero Section =====
        const heroName = document.getElementById('hero-name');
        const heroSubtitle = document.getElementById('hero-subtitle');
        if (heroName) heroName.textContent = data.personal.name;
        if (heroSubtitle) heroSubtitle.textContent = data.personal.subtitle;

        // ===== About Section =====
        const aboutIntro = document.getElementById('about-intro');
        if (aboutIntro) {
            aboutIntro.innerHTML = `
                ${data.personal.bio}
                <div class="experience-highlights">
                    <h4>🌟 Career Highlights</h4>
                    <div class="highlight-item">
                        <span class="highlight-icon">🚀</span>
                        <span>5+ years of full-stack development experience</span>
                    </div>
                    <div class="highlight-item">
                        <span class="highlight-icon">⚡</span>
                        <span>50+ successful projects delivered</span>
                    </div>
                    <div class="highlight-item">
                        <span class="highlight-icon">🎯</span>
                        <span>Led development teams of 5-10 developers</span>
                    </div>
                    <div class="highlight-item">
                        <span class="highlight-icon">🏆</span>
                        <span>Specialized in modern web technologies</span>
                    </div>
                </div>
            `;
        }

        // Update the skills container population in app-improved.js
        const skillsContainer = document.getElementById('skills-container');
        if (skillsContainer) {
            data.skills.forEach((skill, index) => {
                const item = document.createElement('div');
                item.className = 'skill-item';
                item.style.animationDelay = `${index * 0.1}s`;
                item.innerHTML = `
                    <div class="skill-icon">${skill.icon}</div>
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-percentage">${skill.level}%</div>
                `;
                skillsContainer.appendChild(item);
            });

            // Simple intersection observer for skills (no progress bar animation needed)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            });
            observer.observe(skillsContainer);
        }


        // ===== Technologies Section =====
        const techContainer = document.getElementById('tech-container');
        if (techContainer) {
            Object.keys(data.technologies).forEach((category, categoryIndex) => {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'tech-category';
                categoryDiv.style.animationDelay = `${categoryIndex * 0.2}s`;
                categoryDiv.innerHTML = `
                    <h3 class="tech-category-title">${category}</h3>
                    <div class="tech-grid">
                        ${data.technologies[category].map((tech, index) => 
                            `<div class="tech-item" style="animation-delay: ${(categoryIndex * 0.1) + (index * 0.05)}s">${tech}</div>`
                        ).join('')}
                    </div>
                `;
                techContainer.appendChild(categoryDiv);
            });
        }

        // ===== Projects Section =====
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer) {
            data.projects.forEach((project, index) => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.style.animationDelay = `${index * 0.2}s`;
                card.innerHTML = `
                    <div class="project-header">
                        <h3 class="project-title">${project.title}</h3>
                        <span class="project-type">${project.type}</span>
                    </div>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('')}
                    </div>
                    <div class="project-actions">
                        <a href="${project.demoUrl}" class="btn btn--outline" target="_blank">Live Demo</a>
                        <a href="${project.githubUrl}" class="btn btn--secondary" target="_blank">View Code</a>
                    </div>
                `;
                projectsContainer.appendChild(card);
            });
        }

        // ===== Services Section =====
        const servicesContainer = document.getElementById('services-container');
        if (servicesContainer) {
            data.services.forEach((service, index) => {
                const card = document.createElement('div');
                card.className = 'service-card';
                card.style.animationDelay = `${index * 0.15}s`;
                card.innerHTML = `
                    <div class="service-icon">${service.icon}</div>
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-description">${service.description}</p>
                `;
                servicesContainer.appendChild(card);
            });
        }

        // ===== Experience Section =====
        const expContainer = document.getElementById('experience-container');
        if (expContainer && data.experience) {
            data.experience.forEach((exp, index) => {
                const item = document.createElement('div');
                item.className = 'mission-item';
                item.style.animationDelay = `${index * 0.3}s`;
                item.innerHTML = `
                    <div class="mission-star">
                        <div class="star-core"></div>
                        <div class="star-glow"></div>
                    </div>
                    <div class="mission-card">
                        <div class="mission-header">
                            <div class="mission-badge">${exp.position}</div>
                            <div class="mission-date">${exp.startDate} - ${exp.endDate}</div>
                        </div>
                        <h3 class="mission-title">${exp.company} – ${exp.location}</h3>
                        <p class="mission-description">${exp.description}</p>
                        <div class="mission-achievements">
                            ${exp.achievements.map((achievement, achIndex) => 
                                `<div class="achievement" style="animation-delay: ${(index * 0.3) + (achIndex * 0.1)}s">
                                    <span class="achievement-icon">🎯</span>
                                    <span>${achievement}</span>
                                </div>`
                            ).join('')}
                        </div>
                    </div>
                `;
                expContainer.appendChild(item);
            });
        }

        // ===== Contact Form =====
        const contactForm = document.getElementById('contact-form');
        if (contactForm && data.contact) {
            data.contact.form_fields.forEach((field, index) => {
                const formGroup = document.createElement('div');
                formGroup.className = 'form-group';
                formGroup.style.animationDelay = `${index * 0.1}s`;
                
                const label = document.createElement('label');
                label.className = 'form-label';
                label.textContent = field.label;
                label.setAttribute('for', field.name);
                
                let input;
                if (field.type === 'textarea') {
                    input = document.createElement('textarea');
                    input.rows = 4;
                } else {
                    input = document.createElement('input');
                    input.type = field.type;
                }
                
                input.id = field.name;
                input.name = field.name;
                input.className = 'form-control';
                input.required = field.required;
                
                formGroup.appendChild(label);
                formGroup.appendChild(input);
                contactForm.appendChild(formGroup);
            });
            
            // Add submit button
            const submitBtn = document.createElement('button');
            submitBtn.type = 'submit';
            submitBtn.className = 'btn btn--primary btn--full-width';
            submitBtn.innerHTML = 'Send Message 🚀';
            submitBtn.style.animationDelay = '0.5s';
            contactForm.appendChild(submitBtn);

            // Handle form submission
            contactForm.addEventListener('submit', handleFormSubmission);
        }

        // ===== Initialize Animations =====
        initializeAnimations();
        initializeParallax();
        
    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
})();

document.addEventListener('DOMContentLoaded', initializeTerminalTyping);


// Create floating geometric shapes
function createFloatingShapes() {
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'floating-shapes';
    document.body.appendChild(shapesContainer);

    const shapes = [
        { type: 'code', count: 8 },
        { type: 'bracket', count: 6 },
        { type: 'function', count: 4 },
        { type: 'arrow', count: 5 },
        { type: 'binary', count: 10 },
        { type: 'hex', count: 6 },
        { type: 'triangle', count: 4 },
        { type: 'circle', count: 5 },
        { type: 'square', count: 4 }
    ];

    shapes.forEach(shapeType => {
        for (let i = 0; i < shapeType.count; i++) {
            const shape = document.createElement('div');
            shape.className = `floating-shape shape-${shapeType.type}`;
            
            // Random positioning
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';
            
            // Random animation duration and delay
            shape.style.animationDuration = (15 + Math.random() * 10) + 's';
            shape.style.animationDelay = Math.random() * 5 + 's';
            
            // Random size variation
            const scale = 0.5 + Math.random() * 0.5;
            shape.style.transform = `scale(${scale})`;
            
            shapesContainer.appendChild(shape);
        }
    });

    // Add mouse interaction to shapes
    shapesContainer.addEventListener('mousemove', (e) => {
        const shapes = shapesContainer.querySelectorAll('.floating-shape');
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        shapes.forEach(shape => {
            const rect = shape.getBoundingClientRect();
            const shapeX = rect.left + rect.width / 2;
            const shapeY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - shapeX, 2) + Math.pow(mouseY - shapeY, 2)
            );
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                const angle = Math.atan2(mouseY - shapeY, mouseX - shapeX);
                const pushX = Math.cos(angle) * force * 20;
                const pushY = Math.sin(angle) * force * 20;
                
                shape.style.transform += ` translate(${-pushX}px, ${-pushY}px)`;
                shape.style.opacity = 0.3 + force * 0.4;
            }
        });
    });
}

// Enhanced animation functions
function initializeAnimations() {
    // Smooth scrolling for navigation links
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

    // Enhanced Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('skill-item')) {
                    setTimeout(() => {
                        const progressBar = entry.target.querySelector('.skill-progress');
                        if (progressBar) {
                            progressBar.style.width = progressBar.dataset.level + '%';
                        }
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.project-card, .service-card, .tech-category, .mission-item, .skill-item, .about-text, .skills-constellation').forEach(el => {
        observer.observe(el);
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            mobileToggle.classList.toggle('active');
        });
    }

    // Add gravity effect to interactive elements
    addGravityEffects();
    
    // Initialize particle cursor
    initializeParticleCursor();
    setTimeout(initializeTerminal, 1000);
    setTimeout(enhanceContactTerminal, 2000);
}

// Enhanced terminal animation in app-improved.js
function initializeTerminal() {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;

    // Clear existing content
    terminalBody.innerHTML = '';

    // Create terminal session
    const commands = [
        {
            command: 'whoami',
            output: ['alex-cosmic'],
            delay: 0
        },
        {
            command: 'pwd',
            output: ['/home/alex-cosmic/projects/portfolio'],
            delay: 100
        },
        {
            command: 'ls -la',
            output: [
                'total 256',
                'drwxr-xr-x  8 alex-cosmic staff   256 Jul 26 13:23 .',
                'drwxr-xr-x  3 alex-cosmic staff    96 Jul 26 13:23 ..',
                '-rw-r--r--  1 alex-cosmic staff  2048 Jul 26 13:23 .gitignore',
                // '-rw-r--r--  1 alex-cosmic staff  4096 Jul 26 13:23 README.md',
                // 'drwxr-xr-x  5 alex-cosmic staff   160 Jul 26 13:23 src/',
                // 'drwxr-xr-x  3 alex-cosmic staff    96 Jul 26 13:23 assets/',
                // '-rw-r--r--  1 alex-cosmic staff  1024 Jul 26 13:23 package.json'
            ],
            delay: 200
        },
        {
            command: 'npm run dev',
            output: [
                '<span class="status-indicator status-info"></span>Starting development server...',
                '<span class="status-indicator status-warning"></span>Compiling modules...',
                '<div class="terminal-progress"><div class="terminal-progress-bar"></div></div>',
                '<span class="status-indicator status-success"></span>✓ Compilation successful!',
                '<span class="status-indicator status-success"></span>🚀 Server running on http://localhost:3000',
                '<span class="status-indicator status-info"></span>🌌 Ready to explore the cosmos!',
            ],
            delay: 2000
        }
    ];

    let currentCommandIndex = 0;
    let isTyping = false;

    function typeCommand(command, callback) {
        if (isTyping) return;
        isTyping = true;

        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        const prompt = document.createElement('span');
        prompt.className = 'terminal-prompt';
        prompt.textContent = 'alex-cosmic@portfolio:~$ ';
        
        const commandSpan = document.createElement('span');
        commandSpan.className = 'terminal-command';
        
        line.appendChild(prompt);
        line.appendChild(commandSpan);
        terminalBody.appendChild(line);

        // Typing animation
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < command.length) {
                commandSpan.textContent += command[i];
                i++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    isTyping = false;
                    if (callback) callback();
                }, 300);
            }
        }, 50 + Math.random() * 50);
    }

    function showOutput(outputs, callback) {
        let outputIndex = 0;
        
        function showNextOutput() {
            if (outputIndex < outputs.length) {
                const outputLine = document.createElement('div');
                outputLine.className = 'output-line';
                outputLine.innerHTML = outputs[outputIndex];
                terminalBody.appendChild(outputLine);
                
                // Scroll to bottom
                terminalBody.scrollTop = terminalBody.scrollHeight;
                
                outputIndex++;
                setTimeout(showNextOutput, 200 + Math.random() * 300);
            } else {
                if (callback) callback();
            }
        }
        
        setTimeout(showNextOutput, 300);
    }

    function executeNextCommand() {
        if (currentCommandIndex < commands.length) {
            const cmd = commands[currentCommandIndex];
            
            setTimeout(() => {
                typeCommand(cmd.command, () => {
                    showOutput(cmd.output, () => {
                        currentCommandIndex++;
                        executeNextCommand();
                    });
                });
            }, cmd.delay);
        } else {
            // Add final cursor
            const finalLine = document.createElement('div');
            finalLine.className = 'terminal-line';
            finalLine.innerHTML = `
                <span class="terminal-prompt">alex-cosmic@portfolio:~$ </span>
                <span class="cursor">█</span>
            `;
            terminalBody.appendChild(finalLine);
        }
    }

    // Start the terminal session
    executeNextCommand();
}

function createTypingEffect(element, text, speed = 50) {
  element.innerHTML = '';
  element.style.opacity = '1';
  element.style.width = 'auto';
  element.style.borderRight = '2px solid currentColor';
  
  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
      // Remove cursor after typing is complete
      setTimeout(() => {
        element.style.borderRight = 'none';
      }, 500);
    }
  }, speed);
}

function initializeTerminalTyping() {
  const outputLines = document.querySelectorAll('.output-line');
  const texts = [
    '> Initializing cosmic development environment...',
    '> Loading stellar frameworks and libraries...',
    '> Connecting to the digital universe...',
    '> Optimizing warp drive performance...',
    '> Ready to launch amazing projects! 🚀'
  ];
  
  outputLines.forEach((line, index) => {
    if (texts[index]) {
      // Clear existing content and hide line
      line.innerHTML = '';
      line.style.opacity = '0';
      line.style.width = '0';
      
      // Start typing after delay
      setTimeout(() => {
        createTypingEffect(line, texts[index], 30 + Math.random() * 40);
      }, (index * 1700) + 800);
    }
  });
}

// Enhanced terminal in contact section
function enhanceContactTerminal() {
    const contactTerminal = document.querySelector('.contact .terminal-screen');
    if (!contactTerminal) return;

    // Add system monitoring
    const monitoringData = [
        { label: 'CPU Usage', value: '23%', status: 'success' },
        { label: 'Memory', value: '4.2GB / 16GB', status: 'info' },
        { label: 'Network', value: '↑ 125 KB/s ↓ 2.1 MB/s', status: 'success' },
        { label: 'Disk I/O', value: '45 MB/s', status: 'warning' }
    ];

    const monitoringSection = document.createElement('div');
    monitoringSection.className = 'system-monitoring';
    monitoringSection.innerHTML = `
        <div class="monitoring-title">
            <span class="status-indicator status-success"></span>
            System Status
        </div>
        ${monitoringData.map(item => `
            <div class="monitoring-item">
                <span class="monitoring-label">${item.label}:</span>
                <span class="monitoring-value status-${item.status}">${item.value}</span>
            </div>
        `).join('')}
    `;

    const screenContent = contactTerminal.querySelector('.screen-content');
    if (screenContent) {
        screenContent.appendChild(monitoringSection);
    }
}

// Add gravity-like effects to elements
function addGravityEffects() {
    const gravitationalElements = document.querySelectorAll('.project-card, .service-card, .tech-item, .skill-item');
    
    gravitationalElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.05)';
            this.style.zIndex = '10';
            
            // Create gravitational pull effect on nearby elements
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            gravitationalElements.forEach(other => {
                if (other !== this) {
                    const otherRect = other.getBoundingClientRect();
                    const otherCenterX = otherRect.left + otherRect.width / 2;
                    const otherCenterY = otherRect.top + otherRect.height / 2;
                    
                    const distance = Math.sqrt(
                        Math.pow(centerX - otherCenterX, 2) + 
                        Math.pow(centerY - otherCenterY, 2)
                    );
                    
                    if (distance < 300) {
                        const force = (300 - distance) / 300;
                        const angle = Math.atan2(centerY - otherCenterY, centerX - otherCenterX);
                        const pullX = Math.cos(angle) * force * 10;
                        const pullY = Math.sin(angle) * force * 10;
                        
                        other.style.transform += ` translate(${pullX}px, ${pullY}px)`;
                    }
                }
            });
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(/scale\([^)]*\)/, '');
            this.style.zIndex = 'auto';
            
            // Reset other elements
            gravitationalElements.forEach(other => {
                if (other !== this) {
                    other.style.transform = other.style.transform.replace(/translate\([^)]*\)/, '');
                }
            });
        });
    });
}

// Initialize parallax effects
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shape');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform += ` translateY(${yPos}px)`;
        });
    });
}

// Particle cursor effect
function initializeParticleCursor() {
    const particles = [];
    const particleCount = 15;
    
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `hsl(${180 + Math.random() * 60}, 70%, 60%)`;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.01;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            this.size *= 0.98;
        }
        
        draw(ctx) {
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(ctx);
            
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
    
    document.addEventListener('mousemove', (e) => {
        for (let i = 0; i < 2; i++) {
            particles.push(new Particle(e.clientX, e.clientY));
        }
        
        if (particles.length > particleCount) {
            particles.splice(0, particles.length - particleCount);
        }
    });
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Animate button
    submitBtn.innerHTML = '🚀 Launching...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '✅ Message Sent!';
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
}
