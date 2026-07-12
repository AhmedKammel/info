/* ═══════════════════════════════════════════
   AHMED KAMEL — Professional Portfolio
   JavaScript — Interactions & Animations
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ═══════════════════════════════════════
  // LOADING SCREEN
  // ═══════════════════════════════════════
  const loadingScreen = document.getElementById('loadingScreen');
  const loaderFill = document.getElementById('loaderFill');
  const loaderPercent = document.getElementById('loaderPercent');
  const loaderText = document.getElementById('loaderText');

  const loadingMessages = [
    'Loading modules...',
    'Building interface...',
    'Compiling assets...',
    'Rendering UI...',
    'Almost ready...',
  ];

  let loadProgress = 0;
  let msgIndex = 0;

  function updateLoader() {
    loadProgress += Math.random() * 15 + 5;
    if (loadProgress > 100) loadProgress = 100;

    loaderFill.style.width = loadProgress + '%';
    loaderPercent.textContent = Math.round(loadProgress) + '%';

    if (loadProgress < 100) {
      if (loadProgress > (msgIndex + 1) * 20 && msgIndex < loadingMessages.length - 1) {
        msgIndex++;
        loaderText.textContent = loadingMessages[msgIndex];
      }
      setTimeout(updateLoader, 200 + Math.random() * 200);
    } else {
      loaderText.textContent = 'Ready!';
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = '';
        initAfterLoad();
      }, 400);
    }
  }

  document.body.style.overflow = 'hidden';
  setTimeout(updateLoader, 300);


  // ═══════════════════════════════════════
  // CUSTOM CURSOR
  // ═══════════════════════════════════════
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let mouseX = -100, mouseY = -100;
  let cursorX = -100, cursorY = -100;
  let dotX = -100, dotY = -100;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add('visible');
    cursorDot.classList.add('visible');
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('visible');
    cursorDot.classList.remove('visible');
  });

  function animateCursor() {
    const ease = 0.12;
    const dotEase = 0.45;

    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;
    dotX += (mouseX - dotX) * dotEase;
    dotY += (mouseY - dotY) * dotEase;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover detection
  function setupCursorHover() {
    const hoverTargets = document.querySelectorAll(
      'a, button, .skill-card, .app-card, .project-card, .info-card, .btn-primary, .btn-secondary'
    );
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }


  // ═══════════════════════════════════════
  // PARTICLES
  // ═══════════════════════════════════════
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particleCount = Math.min(60, Math.floor(window.innerWidth / 25));

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > w) this.speedX *= -1;
        if (this.y < 0 || this.y > h) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(61, 220, 132, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(61, 220, 132, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawLines();
      requestAnimationFrame(animate);
    }
    animate();
  }


  // ═══════════════════════════════════════
  // TYPING EFFECT
  // ═══════════════════════════════════════
  function initTypingEffect() {
    const output = document.getElementById('typingOutput');
    if (!output) return;

    const phrases = [
      'Android Developer',
      'Kotlin Expert',
      'UI/UX Designer',
      'Google Play Publisher',
      'Ahmed Kamel',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 100;

    function type() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        output.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        speed = 50;
      } else {
        output.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        speed = 100;
      }

      if (!isDeleting && charIndex === current.length) {
        speed = 2500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
      }

      setTimeout(type, speed);
    }

    setTimeout(type, 1200);
  }


  // ═══════════════════════════════════════
  // COUNTER ANIMATION
  // ═══════════════════════════════════════
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'));
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const value = Math.round(eased * target);

              el.textContent = value.toLocaleString() + suffix;

              if (progress < 1) {
                requestAnimationFrame(update);
              }
            }

            requestAnimationFrame(update);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => observer.observe(c));
  }


  // ═══════════════════════════════════════
  // SCROLL REVEAL
  // ═══════════════════════════════════════
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    reveals.forEach((el) => observer.observe(el));
  }


  // ═══════════════════════════════════════
  // SKILL BARS
  // ═══════════════════════════════════════
  function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill[data-width]');
    const percents = document.querySelectorAll('.skill-bar-percent[data-target]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.skill-bar-fill');
            const percent = entry.target.querySelector('.skill-bar-percent');

            if (fill) {
              const width = fill.getAttribute('data-width');
              setTimeout(() => {
                fill.style.width = width + '%';
              }, 200);
            }

            if (percent) {
              const target = parseInt(percent.getAttribute('data-target'));
              const duration = 1200;
              const startTime = performance.now();

              function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                percent.textContent = Math.round(eased * target) + '%';

                if (progress < 1) {
                  requestAnimationFrame(update);
                }
              }

              setTimeout(() => requestAnimationFrame(update), 200);
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('.skill-bar-item').forEach((item) => {
      observer.observe(item);
    });
  }


  // ═══════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════
  function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-links a[data-section]');
    const mobileLinks = document.querySelectorAll('[data-mobile-link]');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');
    const scrollIndicator = document.getElementById('scrollIndicator');

    // Scroll effects
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      // Nav background
      if (scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Scroll progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollY / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';

      // Back to top
      if (scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }

      // Hide scroll indicator
      if (scrollY > 100 && scrollIndicator) {
        scrollIndicator.classList.add('hidden');
      }

      // Active nav link
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((section) => {
        const top = section.offsetTop - 100;
        if (scrollY >= top) {
          current = section.getAttribute('id');
        }
      });

      // Also check footer
      const footer = document.getElementById('contact');
      if (footer) {
        const footerTop = footer.offsetTop - 200;
        if (scrollY >= footerTop) {
          current = 'contact';
        }
      }

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
          link.classList.add('active');
        }
      });

      lastScroll = scrollY;
    });

    // Hamburger menu
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Back to top
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ═══════════════════════════════════════
  // 3D TILT CARDS
  // ═══════════════════════════════════════
  function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }


  // ═══════════════════════════════════════
  // MAGNETIC BUTTONS
  // ═══════════════════════════════════════
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

    buttons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }


  // ═══════════════════════════════════════
  // SMOOTH ANCHOR SCROLLING
  // ═══════════════════════════════════════
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }


  // ═══════════════════════════════════════
  // INIT AFTER LOAD
  // ═══════════════════════════════════════
  function initAfterLoad() {
    setupCursorHover();
    initParticles();
    initTypingEffect();
    initCounters();
    initScrollReveal();
    initSkillBars();
    initNavigation();
    initTiltCards();
    initMagneticButtons();
    initSmoothScroll();
  }

  // Fallback: ensure loading screen goes away
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (!loadingScreen.classList.contains('hidden')) {
        loadProgress = 100;
        loaderFill.style.width = '100%';
        loaderPercent.textContent = '100%';
        loaderText.textContent = 'Ready!';
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          document.body.style.overflow = '';
          initAfterLoad();
        }, 300);
      }
    }, 4000);
  });
})();
