/* Content and contact links remain usable without JavaScript. */
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (!navbar || !hamburger || !navLinks) return;
    const updateNavbar = () => navbar.classList.toggle('scrolled', window.scrollY > 80);
    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
    const setMenu = (open, returnFocus = false) => {
        hamburger.classList.toggle('active', open);
        navLinks.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', String(open));
        hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.style.overflow = open ? 'hidden' : '';
        if (returnFocus) hamburger.focus();
    };
    hamburger.addEventListener('click', () => setMenu(hamburger.getAttribute('aria-expanded') !== 'true'));
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => {
        if (hamburger.getAttribute('aria-expanded') !== 'true') return;
        if (event.key === 'Escape') setMenu(false, true);
        if (event.key === 'Tab') {
            const first = navLinks.querySelector('a');
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault(); hamburger.focus();
            } else if (!event.shiftKey && document.activeElement === hamburger) {
                event.preventDefault(); first.focus();
            }
        }
    });
    const desktop = window.matchMedia('(min-width: 769px)');
    desktop.addEventListener('change', event => { if (event.matches) setMenu(false); });
});
