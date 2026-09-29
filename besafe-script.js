/**
 * ══════════════════════════════════════════════
 * BESAFE 2026 — Mechanics / JavaScript
 * besafe-script.js
 * ══════════════════════════════════════════════
 */

'use strict';

/* ─────────────────────────────────────────────
   1. ACTIVE NAV LINK (IntersectionObserver)
   Highlights the nav link matching the section
   currently visible in the viewport.
───────────────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], .hero[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((s) => observer.observe(s));
})();


/* ─────────────────────────────────────────────
   2. SCROLL REVEAL
   Cards and list items fade + slide up as they
   enter the viewport. Requires .reveal class in
   CSS (already included in besafe-style.css).
───────────────────────────────────────────── */
(function initScrollReveal() {
  const selector = [
    '.topic-card',
    '.speaker-card',
    '.org-card',
    '.schedule-item',
    '.date-item',
  ].join(', ');

  const targets = document.querySelectorAll(selector);
  if (!targets.length) return;

  // Mark elements as hidden initially
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger items that share a parent row
    el.style.transitionDelay = (i % 3) * 80 + 'ms';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
})();


/* ─────────────────────────────────────────────
   3. SMOOTH SCROLL (fallback for older browsers)
   Native CSS scroll-behavior handles modern
   browsers; this is a polyfill for anything
   that doesn't support it.
───────────────────────────────────────────── */
(function initSmoothScroll() {
  if (CSS.supports('scroll-behavior', 'smooth')) return; // already handled by CSS

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();


/* ─────────────────────────────────────────────
   4. HEADER SHADOW ON SCROLL
   Adds a subtle elevation shadow to the sticky
   header once the user has scrolled down.
───────────────────────────────────────────── */
(function initHeaderShadow() {
  const header = document.querySelector('header');
  if (!header) return;

  const update = () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(0,0,0,0.4)'
      : 'none';
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
})();
