'use strict';

// Mobile navigation: keep the button state and menu visibility in sync.
const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');

function closeMenu() {
  if (!menuToggle || !navLinks) return;
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    navLinks.classList.toggle('open', !isOpen);
  });

  // Close the mobile menu after a visitor chooses a section.
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Allow keyboard users to dismiss the open menu with Escape.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  // Restore the desktop navigation layout when the viewport becomes wide.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) closeMenu();
  });
}

// Keep the copyright year current without manually editing the page.
const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

// Reveal sections as they enter the viewport; show everything if unsupported.
const revealItems = document.querySelectorAll('[data-reveal]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
