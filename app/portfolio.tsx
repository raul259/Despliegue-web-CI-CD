"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoLoop from "../components/LogoLoop";
import ProfileCard from "../components/ProfileCard";
import IntroLoader from "../components/IntroLoader";

// Registrar el plugin ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Portfolio useEffect ejecutándose...");

    // No ejecutar nada hasta que termine el loader
    if (isLoading) return;

    // Crear cuadrados de fondo
    function createBackgroundSquares() {
      const container = document.getElementById("bgSquares");
      if (!container) return;

      for (let i = 0; i < 20; i++) {
        const square = document.createElement("div");
        square.className = "bg-square";
        const size = Math.random() * 40 + 20;
        square.style.width = `${size}px`;
        square.style.height = `${size}px`;
        square.style.left = `${Math.random() * 100}%`;
        square.style.top = `${Math.random() * 100}%`;
        square.style.animationDuration = `${Math.random() * 20 + 15}s`;
        square.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(square);

        gsap.set(square, { opacity: 0, scale: 0 });

        gsap.to(square, {
          opacity: Math.random() * 0.3 + 0.1,
          scale: 1,
          duration: Math.random() * 2 + 1,
          delay: Math.random() * 3,
          ease: "power2.out"
        });

        gsap.to(square, {
          y: Math.random() * 100 - 50,
          x: Math.random() * 100 - 50,
          rotation: Math.random() * 360,
          duration: Math.random() * 10 + 10,
          ease: "none",
          repeat: -1,
          yoyo: true
        });
      }
    }

    // Renderizar habilidades
    function renderSkills() {
      console.log("Ejecutando renderSkills...");
      
      const skillCategories = [
        {
          title: "Frontend",
          color: "blue",
          skills: ["React", "Next.js", "JavaScript (ES6+)", "HTML5/CSS3", "Tailwind CSS"]
        },
        {
          title: "Backend & DB",
          color: "purple",
          skills: ["Node.js", "PHP (Basic)", "MySQL", "Supabase"]
        },
        {
          title: "Herramientas",
          color: "emerald",
          skills: ["Git & GitHub", "VS Code", "Postman"]
        }
      ];
    
      const container = document.getElementById("skillsGrid");
      console.log("Skills container:", container);
      if (!container) {
        console.error("No se encontró el container skillsGrid");
        return;
      }
    
      container.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4";
      container.innerHTML = "";
    
      skillCategories.forEach((category, categoryIndex) => {
        const card = document.createElement("div");
        card.className = `skill-category-card group`;
        
        let cardClasses = "";
        let titleClasses = "";
        let dotClasses = "";
        let badgeClasses = "";
        
        if (category.color === "blue") {
          cardClasses = "h-full p-6 rounded-2xl bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40 border backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10";
          titleClasses = "text-xl font-bold text-blue-400 mb-4 flex items-center gap-2";
          dotClasses = "inline-block w-2 h-2 rounded-full bg-blue-400";
          badgeClasses = "px-4 py-2 rounded-full bg-blue-500/10 border-blue-500/30 border hover:bg-blue-500/20 hover:border-blue-400/50 text-gray-200 text-sm font-medium transition-all duration-200 hover:scale-105 cursor-default";
        } else if (category.color === "purple") {
          cardClasses = "h-full p-6 rounded-2xl bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40 border backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10";
          titleClasses = "text-xl font-bold text-purple-400 mb-4 flex items-center gap-2";
          dotClasses = "inline-block w-2 h-2 rounded-full bg-purple-400";
          badgeClasses = "px-4 py-2 rounded-full bg-purple-500/10 border-purple-500/30 border hover:bg-purple-500/20 hover:border-purple-400/50 text-gray-200 text-sm font-medium transition-all duration-200 hover:scale-105 cursor-default";
        } else if (category.color === "emerald") {
          cardClasses = "h-full p-6 rounded-2xl bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40 border backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10";
          titleClasses = "text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2";
          dotClasses = "inline-block w-2 h-2 rounded-full bg-emerald-400";
          badgeClasses = "px-4 py-2 rounded-full bg-emerald-500/10 border-emerald-500/30 border hover:bg-emerald-500/20 hover:border-emerald-400/50 text-gray-200 text-sm font-medium transition-all duration-200 hover:scale-105 cursor-default";
        }
    
        card.innerHTML = `
          <div class="${cardClasses}">
            <h3 class="${titleClasses}">
              <span class="${dotClasses}"></span>
              ${category.title}
            </h3>
            <div class="flex flex-wrap gap-3">
              ${category.skills.map(skill => `
                <span class="${badgeClasses}">
                  ${skill}
                </span>
              `).join('')}
            </div>
          </div>
        `;
        
        container.appendChild(card);
    
        gsap.set(card, { opacity: 0, y: 50, scale: 0.95 });
    
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: categoryIndex * 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
    
        const badges = card.querySelectorAll('span[class*="px-4"]');
        badges.forEach((badge, badgeIndex) => {
          gsap.set(badge, { opacity: 0, scale: 0 });
          gsap.to(badge, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: categoryIndex * 0.15 + badgeIndex * 0.05 + 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });
        });
      });
    }

    // Renderizar proyectos
    function renderProjects() {
      console.log("Ejecutando renderProjects...");
      const projects = [
        {
          title: "Landing Bio",
          description: "Página de perfil personal con diseño moderno, enlaces personalizados y animaciones suaves.",
          tags: ["Next.js", "React", "CSS"],
          image: "/bio core.png",
          url: "https://landing-bio-core-1qxk.vercel.app"
        },
        {
          title: "SUDÁN FREE",
          description: "Landing page moderna sobre la crisis humanitaria en Sudán con diseño impactante y responsive.",
          tags: ["React", "Next.js", "CSS"],
          image: "/Sudan Free.png",
          url: "https://landing-sud-n-git-main-raul259s-projects.vercel.app/"
        },
        {
          title: "LLM Chat  AI",
          description: "Aplicación de chat con inteligencia artificial usando modelos de lenguaje avanzados.",
          tags: ["Next.js", "TypeScript", "AI"],
          image: "/llm-chat.png",
          url: "https://llm-chat-ruby.vercel.app"
        },
      ];

      const container = document.getElementById("projectsGrid");
      console.log("Projects container:", container);
      if (!container) {
        console.error("No se encontró el container projectsGrid");
        return;
      }

      container.innerHTML = "";
      projects.forEach((project, index) => {
        const card = document.createElement("div");
        card.className = "project-card";
        if (project.url) {
          card.style.cursor = "pointer";
          card.addEventListener("click", () => {
            window.open(project.url, "_blank", "noopener,noreferrer");
          });
        }
        card.innerHTML = `
          <div class="project-image">${project.image ? `<img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">` : ''}</div>
          <div class="project-content">
            <div class="project-title">${project.title}</div>
            <div class="project-description">${project.description}</div>
            <div class="project-tags">
              ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
          </div>
        `;
        container.appendChild(card);

        gsap.set(card, { opacity: 0, y: 60, rotateY: 15 });

        gsap.to(card, {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.05, y: -10, duration: 0.3, ease: "power2.out" });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
        });
      });
    }

    // Función para inicializar animaciones GSAP
    function initGSAPAnimations() {
      const heroTitle = document.querySelector('.hero-title');
      const heroSubtitle = document.querySelector('.hero-subtitle');
      const scrollIndicator = document.querySelector('.scroll-indicator');

      if (heroTitle) {
        gsap.fromTo(heroTitle,
          { opacity: 0, y: 100, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
        );
      }

      if (heroSubtitle) {
        gsap.fromTo(heroSubtitle,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.8 }
        );
      }

      if (scrollIndicator) {
        gsap.fromTo(scrollIndicator,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "bounce.out", delay: 1.3 }
        );

        gsap.to(scrollIndicator, {
          y: 10,
          duration: 1,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1
        });
      }

      const sectionTitles = document.querySelectorAll('.section-title');
      sectionTitles.forEach((title) => {
        gsap.fromTo(title,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      const aboutText = document.querySelector('#sobreMiTexto');
      if (aboutText) {
        const text = aboutText.textContent || '';
        aboutText.textContent = '';
        aboutText.style.opacity = '1';
        
        const chars = text.split('');
        let charIndex = 0;
        
        ScrollTrigger.create({
          trigger: aboutText,
          start: "top 85%",
          onEnter: () => {
            const typeInterval = setInterval(() => {
              if (charIndex < chars.length) {
                aboutText.textContent += chars[charIndex];
                charIndex++;
              } else {
                clearInterval(typeInterval);
              }
            }, 20);
          },
          once: true
        });
      }

      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
        gsap.fromTo(item,
          { opacity: 0, x: -80, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );

        item.addEventListener('mouseenter', () => {
          gsap.to(item, { x: 15, scale: 1.02, duration: 0.3, ease: "power2.out" });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, { x: 0, scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });

      const logoLoopContainer = document.querySelector('.logo-loop-container');
      if (logoLoopContainer) {
        gsap.fromTo(logoLoopContainer,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: logoLoopContainer,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }

    setTimeout(() => {
      console.log("Ejecutando funciones después del timeout...");
      createBackgroundSquares();
      renderSkills();
      renderProjects();
      initGSAPAnimations();
    }, 100);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading]);

  // Manejar el fin del loader
  const handleLoaderFinish = () => {
    setIsLoading(false);
  };

  // Mostrar el loader mientras isLoading sea true
  if (isLoading) {
    return <IntroLoader onFinish={handleLoaderFinish} />;
  }

  return (
    <div>
      <div className="background-squares" id="bgSquares"></div>
      <div className="content-wrapper">
        <header className="hero">
          <div className="hero-content-right">
            <h1 className="hero-title" id="nombreCompleto">
              RAÚL SUÁREZ
            </h1>
            <p className="hero-subtitle" id="subtitulo">
              Desarrollador Full Stack en formación. Especializado en crear experiencias web rápidas con Next.js y Supabase.
            </p>
            <div className="hero-buttons">
              <button 
                className="hero-btn hero-btn-primary"
                onClick={() => document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Proyectos
              </button>
              <button 
                className="hero-btn hero-btn-secondary"
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contáctame
              </button>
            </div>
          </div>
          <div className="scroll-indicator">
            <svg viewBox="0 0 24 24">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            </svg>
          </div>
        </header>
        <section id="sobre-mi">
          <h2 className="section-title">Sobre Mí</h2>
          <div className="about-content">
            <div className="about-text">
              <p id="sobreMiTexto">
Desarrollador junior y estudiante de 2º de DAW. He desarrollado proyectos como una Pokedéx web, sistemas CRUD y aplicaciones responsive. Manejo JavaScript, PHP, MySQL, Bootstrap y GSAP, y actualmente profundizo en tecnologías modernas como Node.js, React, Next.js, Vercel e integración con IA. Mi objetivo es crear soluciones web sólidas, limpias y escalables.
              </p>
            </div>
          </div>
        </section>
        <section id="habilidades">
          <h2 className="section-title">Habilidades Técnicas</h2>
          <div className="skills-grid" id="skillsGrid"></div>
        </section>
        <section id="proyectos">
          <h2 className="section-title">Proyectos Destacados</h2>
          <div className="projects-grid" id="projectsGrid"></div>
        </section>
        <section id="formacion">
          <h2 className="section-title">Formación</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2024 - 2026</div>
              <div className="timeline-title">Desarrollo de Aplicaciones Web (DAW)</div>
              <div className="timeline-description">
                Ciclo Formativo de Grado Superior enfocado en el desarrollo de aplicaciones web frontend y backend.
                Formación en JavaScript, PHP, MySQL, HTML, CSS, Bootstrap, GSAP, consumo de APIs, despliegue web y fundamentos de programación.
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2024 - 2025</div>
              <div className="timeline-title">Desarrollo con Frameworks Modernos</div>
              <div className="timeline-description">
                Aprendizaje práctico y continuo de Node.js, React, Next.js, Vercel, integración con APIs, automatización de procesos e interacción con Inteligencia Artificial.
                Enfocado en construir aplicaciones funcionales, modernas y escalables.
              </div>
            </div>
          </div>
        </section>

        <section id="contacto">
          <h2 className="section-title">Contáctame</h2>
          <p className="contact-description">
            ¿Tienes alguna propuesta interesante o quieres colaborar en un proyecto? No dudes en contactarme a través de cualquiera de estos medios.
          </p>
          <div className="contact-info-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00d4ff" width="48px" height="48px">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <h3>Email</h3>
              <p>raulsume891@gmail.com</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00d4ff" width="48px" height="48px">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <h3>GitHub</h3>
              <p>
                <a href="https://github.com/raul259" target="_blank" rel="noopener noreferrer">
                  github.com/raul259
                </a>
              </p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <img src="/linkedin.svg" alt="LinkedIn Icon" width="48" height="48" />
              </div>
              <h3>LinkedIn</h3>
              <p>
                <a href="https://www.linkedin.com/in/ra%C3%BAl-suarez-mendoza-753294362/" target="_blank" rel="noopener noreferrer">
                  Mi Perfil de LinkedIn
                </a>
              </p>
            </div>
          </div>

          <div className="logo-loop-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '60px' }}>
            <LogoLoop
              logos={[
                {
                  node: (
                    <div className="tech-logo">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26" />
                      </svg>
                    </div>
                  ),
                  title: "HTML5"
                },
                {
                  node: (
                    <div className="tech-logo">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" fill="#1572B6" />
                      </svg>
                    </div>
                  ),
                  title: "CSS3"
                },
                {
                  node: (
                    <div className="tech-logo">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4" />
                      </svg>
                    </div>
                  ),
                  title: "Tailwind CSS"
                },
                {
                  node: (
                    <div className="tech-logo">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#F7DF1E" />
                      </svg>
                    </div>
                  ),
                  title: "JavaScript"
                },
                {
                  node: (
                    <div className="tech-logo">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.01-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.778-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.01 1.36-.034-.44.572-.895 1.095-1.36 1.56-.455-.467-.91-.991-1.36-1.56z" fill="#61DAFB" />
                      </svg>
                    </div>
                  ),
                  title: "React"
                },
                {
                  node: (
                    <div className="tech-logo">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.24l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L2.46,6.681C2.376,6.729,2.324,6.825,2.324,6.921v10.15c0,0.097,0.053,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.275-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" fill="#339933" />
                      </svg>
                    </div>
                  ),
                  title: "Node.js"
                },
                {
                  node: (
                    <div className="tech-logo">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.721.721 1.884 0 2.609-.719.719-1.881.719-2.609 0-.539-.541-.67-1.337-.396-1.781L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.609-.719.719-1.884.719-2.609 0-.719-.719-.719-1.881 0-2.609.182-.18.387-.316.605-.407V8.835c-.215-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-1.781L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0L23.546 13.12c.603-.603.603-1.582 0-2.188" fill="#F1502F" />
                      </svg>
                    </div>
                  ),
                  title: "Git"
                },
                {
                  node: (
                    <div className="tech-logo">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="#FFFFFF" />
                      </svg>
                    </div>
                  ),
                  title: "GitHub"
                },
                {
                  node: (
                    <div className="tech-logo">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <ellipse cx="12" cy="12" rx="10" ry="6" fill="none" stroke="#777BB4" strokeWidth="2" />
                        <text x="12" y="16" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#777BB4">PHP</text>
                        <circle cx="7" cy="8" r="1" fill="#777BB4" />
                        <circle cx="17" cy="8" r="1" fill="#777BB4" />
                      </svg>
                    </div>
                  ),
                  title: "PHP"
                }
              ]}
              speed={50}
              direction="left"
              pauseOnHover={true}
              fadeOut={false}
              scaleOnHover={true}
              logoHeight={80}
              gap={48}
              className="tech-logo-loop"
              ariaLabel="Tecnologías que domino"
            />
          </div>
        </section>
      </div>
    </div>
  );
}