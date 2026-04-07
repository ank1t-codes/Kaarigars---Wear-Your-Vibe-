/* ============================================================
   VALORÉ — Script
   script.js
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Init Feather Icons ──────────────────────────────────
  if (typeof feather !== 'undefined') {
    feather.replace({ 'stroke-width': 1.5 });
  }

  // ── Navbar scroll effect ────────────────────────────────
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ── Mobile Menu Toggle ──────────────────────────────────
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  let menuOpen = false;

  mobileMenuBtn?.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu?.classList.toggle('hidden', !menuOpen);
    menuIcon?.classList.toggle('hidden', menuOpen);
    closeIcon?.classList.toggle('hidden', !menuOpen);
    feather?.replace({ 'stroke-width': 1.5 });
  });

  // ── Close mobile menu when clicking outside ─────────────
  document.addEventListener('click', (e) => {
    if (menuOpen && !navbar?.contains(e.target)) {
      menuOpen = false;
      mobileMenu?.classList.add('hidden');
      menuIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
      feather?.replace({ 'stroke-width': 1.5 });
    }
  });

  // ── Parallax effect ─────────────────────────────────────
  const heroBg = document.getElementById('hero-parallax');
  let ticking = false;

  const updateParallax = () => {
    if (!heroBg) return;
    const scrollY = window.scrollY;
    // Subtle parallax: move hero background at 40% scroll speed
    heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // ── AI Stylist Modal ─────────────────────────────────────
  const btnAiStylist = document.getElementById('btn-ai-stylist');
  const aiModal = document.getElementById('ai-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');

  const openModal = () => {
    aiModal?.classList.remove('hidden');
    aiModal?.classList.add('flex');
    document.body.style.overflow = 'hidden';
    feather?.replace({ 'stroke-width': 1.5 });
  };

  const closeModal = () => {
    aiModal?.classList.add('hidden');
    aiModal?.classList.remove('flex');
    document.body.style.overflow = '';
  };

  btnAiStylist?.addEventListener('click', openModal);
  modalOverlay?.addEventListener('click', closeModal);
  modalClose?.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ── Intersection Observer — feature cards ────────────────
  const featureCards = document.querySelectorAll('.feature-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, i * 120);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    featureCards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.7s cubic-bezier(0.23,1,0.32,1), transform 0.7s cubic-bezier(0.23,1,0.32,1)';
      observer.observe(card);
    });
  }

  // ── Cart count animation ─────────────────────────────────
  const cartBtns = document.querySelectorAll('#btn-cart');
  cartBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.add('scale-110');
      setTimeout(() => btn.classList.remove('scale-110'), 300);
    });
  });

  // ── Smooth anchor scrolling ──────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Floating cards micro-animation on load ───────────────
  const cards = document.querySelectorAll('.float-card');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${0.7 + i * 0.15}s`;
  });

  // ── Cursor glow effect (desktop only) ───────────────────
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139,105,20,0.08) 0%, transparent 70%);
      pointer-events: none;
      z-index: 1;
      transition: transform 0.12s ease;
      transform: translate(-50%, -50%);
      top: 0; left: 0;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });
  }

  // ── Thumbnail image hover preview popup ─────────────────
  const popup = document.createElement('div');
  popup.id = 'thumb-preview-popup';
  popup.innerHTML = '<img src="" alt="Preview" />';
  document.body.appendChild(popup);
  const popupImg = popup.querySelector('img');
  let popupTimeout;

  document.querySelectorAll('[data-preview]').forEach((thumb) => {
    thumb.addEventListener('mouseenter', (e) => {
      clearTimeout(popupTimeout);
      popupImg.src = thumb.dataset.preview;
      popup.classList.add('visible');
      positionPopup(e);
    });

    thumb.addEventListener('mousemove', (e) => {
      positionPopup(e);
    });

    thumb.addEventListener('mouseleave', () => {
      popup.classList.remove('visible');
      popupTimeout = setTimeout(() => { popupImg.src = ''; }, 400);
    });
  });

  function positionPopup(e) {
    const margin = 16;
    const pw = popup.offsetWidth || 200;
    const ph = popup.offsetHeight || 280;
    let x = e.clientX + margin;
    let y = e.clientY - ph / 2;
    // Keep inside viewport
    if (x + pw > window.innerWidth - margin) x = e.clientX - pw - margin;
    if (y < margin) y = margin;
    if (y + ph > window.innerHeight - margin) y = window.innerHeight - ph - margin;
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
  }

  console.log('%cKAAIGARS — Wear Your Vibe', 'font-size: 18px; font-family: Georgia, serif; color: #c9a87c; font-weight: 300; letter-spacing: 0.3em;');
});
