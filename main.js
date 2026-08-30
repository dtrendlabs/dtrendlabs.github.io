/* ═══════════════════════════════════════════════════════
   DTrend Services — Main JavaScript (main.js)
   Site-wide interactions, theme, scroll, and animations
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── THEME TOGGLE ──
  const ThemeManager = {
    init() {
      const saved = localStorage.getItem('dtrend-theme');
      if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
      }
      this.updateIcon();
      document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', () => this.toggle());
      });
    },

    toggle() {
      const current = document.documentElement.getAttribute('data-theme');
      const isDark = current === 'dark' || (!current && window.matchMedia('(prefers-color-scheme: dark)').matches);
      const next = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('dtrend-theme', next);
      this.updateIcon();
    },

    updateIcon() {
      const theme = document.documentElement.getAttribute('data-theme');
      const isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.textContent = isDark ? '☀️' : '🌙';
        btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      });
    }
  };

  // ── NAVBAR ──
  const Navbar = {
    init() {
      this.navbar = document.querySelector('.navbar');
      this.burger = document.querySelector('.navbar__burger');
      this.mobileMenu = document.querySelector('.navbar__mobile');

      if (!this.navbar) return;

      // Scroll shrink
      window.addEventListener('scroll', () => this.onScroll(), { passive: true });

      // Mobile menu toggle
      if (this.burger) {
        this.burger.addEventListener('click', () => this.toggleMobile());
      }

      // Close mobile menu on link click
      if (this.mobileMenu) {
        this.mobileMenu.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => this.closeMobile());
        });
      }

      // Scroll spy
      this.initScrollSpy();
    },

    onScroll() {
      if (window.scrollY > 80) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
    },

    toggleMobile() {
      this.burger.classList.toggle('open');
      this.mobileMenu.classList.toggle('open');
      document.body.style.overflow = this.mobileMenu.classList.contains('open') ? 'hidden' : '';
    },

    closeMobile() {
      if (this.burger) this.burger.classList.remove('open');
      if (this.mobileMenu) this.mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    },

    initScrollSpy() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.navbar__link[href^="#"]');

      if (sections.length === 0 || navLinks.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
          }
        });
      }, { threshold: 0.3, rootMargin: '-100px 0px -40% 0px' });

      sections.forEach(section => observer.observe(section));
    }
  };

  // ── SCROLL REVEAL ANIMATIONS ──
  const ScrollReveal = {
    init() {
      const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
      if (elements.length === 0) return;

      // Check prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elements.forEach(el => el.classList.add('visible'));
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      elements.forEach(el => observer.observe(el));
    }
  };

  // ── COUNT-UP ANIMATION ──
  const CountUp = {
    init() {
      const elements = document.querySelectorAll('[data-count]');
      if (elements.length === 0) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elements.forEach(el => {
          el.textContent = el.getAttribute('data-count');
        });
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      elements.forEach(el => observer.observe(el));
    },

    animate(el) {
      const target = el.getAttribute('data-count');
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const isFloat = target.includes('.');
      const targetNum = parseFloat(target);
      const duration = 2000;
      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out curve
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * targetNum;

        el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }
  };

  // ── FAQ ACCORDION ──
  const Accordion = {
    init() {
      document.querySelectorAll('.accordion__trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
          const item = trigger.closest('.accordion__item');
          const isOpen = item.classList.contains('open');

          // Close all siblings (optional: single-open mode)
          const accordion = item.closest('.accordion');
          if (accordion && accordion.hasAttribute('data-single')) {
            accordion.querySelectorAll('.accordion__item.open').forEach(openItem => {
              if (openItem !== item) openItem.classList.remove('open');
            });
          }

          item.classList.toggle('open', !isOpen);
        });
      });
    }
  };

  // ── PRICING TOGGLE ──
  const PricingToggle = {
    init() {
      const toggle = document.querySelector('.pricing-toggle__switch');
      const labels = document.querySelectorAll('.pricing-toggle__label');

      if (!toggle) return;

      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        const isYearly = toggle.classList.contains('active');

        labels.forEach(label => {
          label.classList.toggle('active', label.getAttribute('data-period') === (isYearly ? 'yearly' : 'monthly'));
        });

        // Update prices
        document.querySelectorAll('[data-price-monthly]').forEach(el => {
          const monthly = el.getAttribute('data-price-monthly');
          const yearly = el.getAttribute('data-price-yearly');
          el.textContent = isYearly ? yearly : monthly;
        });
      });
    }
  };

  // ── MULTI-STEP FORM ──
  const FormWizard = {
    init() {
      this.form = document.querySelector('.form-wizard');
      if (!this.form) return;

      this.panels = this.form.querySelectorAll('.form-wizard__panel');
      this.indicators = this.form.querySelectorAll('.form-wizard__step-indicator');
      this.lines = this.form.querySelectorAll('.form-wizard__step-line');
      this.currentStep = 0;

      // Option cards (click to select)
      this.form.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
          const group = card.closest('.option-grid');
          group.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
        });
      });

      // Next/Prev buttons
      this.form.querySelectorAll('[data-action="next"]').forEach(btn => {
        btn.addEventListener('click', () => this.next());
      });

      this.form.querySelectorAll('[data-action="prev"]').forEach(btn => {
        btn.addEventListener('click', () => this.prev());
      });

      // Submit
      this.form.querySelectorAll('[data-action="submit"]').forEach(btn => {
        btn.addEventListener('click', () => this.submit());
      });
    },

    goTo(step) {
      this.panels.forEach((p, i) => p.classList.toggle('active', i === step));
      this.indicators.forEach((ind, i) => {
        ind.classList.remove('active', 'completed');
        if (i < step) ind.classList.add('completed');
        if (i === step) ind.classList.add('active');
      });
      this.lines.forEach((line, i) => {
        line.classList.toggle('completed', i < step);
      });
      this.currentStep = step;
    },

    next() {
      if (this.currentStep < this.panels.length - 1) {
        this.goTo(this.currentStep + 1);
      }
    },

    prev() {
      if (this.currentStep > 0) {
        this.goTo(this.currentStep - 1);
      }
    },

    submit() {
      // Show success panel
      const successPanel = this.form.querySelector('.form-wizard__success');
      if (successPanel) {
        this.panels.forEach(p => p.classList.remove('active'));
        successPanel.style.display = 'block';
        this.indicators.forEach(ind => {
          ind.classList.remove('active');
          ind.classList.add('completed');
        });
        this.lines.forEach(line => line.classList.add('completed'));
      }
      Toast.show('Message Sent!', 'We\'ll get back to you within 24 hours.', '✅');
    }
  };

  // ── FILTER / SEARCH (Apps page) ──
  const AppFilter = {
    init() {
      this.searchInput = document.querySelector('#app-search');
      this.chips = document.querySelectorAll('.filter-chip');
      this.cards = document.querySelectorAll('.app-card');
      this.activeFilter = 'all';

      if (!this.searchInput || this.cards.length === 0) return;

      this.searchInput.addEventListener('input', () => this.filter());

      this.chips.forEach(chip => {
        chip.addEventListener('click', () => {
          this.chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          this.activeFilter = chip.getAttribute('data-filter');
          this.filter();
        });
      });
    },

    filter() {
      const query = this.searchInput ? this.searchInput.value.toLowerCase().trim() : '';
      let visibleCount = 0;

      this.cards.forEach(card => {
        const name = (card.getAttribute('data-name') || '').toLowerCase();
        const category = (card.getAttribute('data-category') || '').toLowerCase();
        const desc = (card.getAttribute('data-desc') || '').toLowerCase();

        const matchesSearch = !query || name.includes(query) || desc.includes(query) || category.includes(query);
        const matchesFilter = this.activeFilter === 'all' || category === this.activeFilter;

        const visible = matchesSearch && matchesFilter;
        card.style.display = visible ? '' : 'none';
        if (visible) visibleCount++;
      });

      // Show/hide empty state
      const emptyState = document.querySelector('.apps-empty');
      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }
  };

  // ── TOAST NOTIFICATIONS ──
  const Toast = {
    show(title, message, icon = '🔔', duration = 4000) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `
        <span class="toast__icon">${icon}</span>
        <div class="toast__content">
          <div class="toast__title">${title}</div>
          <div class="toast__message">${message}</div>
        </div>
        <div class="toast__progress"></div>
      `;
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.classList.add('leaving');
        setTimeout(() => toast.remove(), 400);
      }, duration);
    }
  };

  // Make Toast globally available
  window.DTrend = window.DTrend || {};
  window.DTrend.Toast = Toast;

  // ── COOKIE CONSENT ──
  const CookieConsent = {
    init() {
      const banner = document.querySelector('.cookie-banner');
      if (!banner) return;

      if (localStorage.getItem('dtrend-cookies') === 'accepted') return;

      setTimeout(() => banner.classList.add('visible'), 2000);

      banner.querySelector('[data-action="accept"]')?.addEventListener('click', () => {
        localStorage.setItem('dtrend-cookies', 'accepted');
        banner.classList.remove('visible');
      });

      banner.querySelector('[data-action="reject"]')?.addEventListener('click', () => {
        localStorage.setItem('dtrend-cookies', 'rejected');
        banner.classList.remove('visible');
      });
    }
  };

  // ── MAGNETIC CTA HOVER ──
  const MagneticHover = {
    init() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if ('ontouchstart' in window) return; // Skip on touch devices

      document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          const maxShift = 6;
          const shiftX = (x / rect.width) * maxShift;
          const shiftY = (y / rect.height) * maxShift;
          btn.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
        });

        btn.addEventListener('mouseleave', () => {
          btn.style.transform = '';
        });

        btn.addEventListener('mousedown', () => {
          btn.style.transform = 'scale(0.97)';
        });

        btn.addEventListener('mouseup', () => {
          btn.style.transform = '';
        });
      });
    }
  };

  // ── SMOOTH SCROLL for anchor links ──
  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }
  };

  // ── INITIALIZE ALL ──
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    Navbar.init();
    ScrollReveal.init();
    CountUp.init();
    Accordion.init();
    PricingToggle.init();
    FormWizard.init();
    AppFilter.init();
    CookieConsent.init();
    MagneticHover.init();
    SmoothScroll.init();
  });

})();
