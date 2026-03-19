/* ============================================
   HARRELL GARAGE DOORS — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const scrollThreshold = 80;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // --- Mobile Hamburger Menu ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for sibling elements
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // --- Smooth Scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Contact Form Handling ---
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Basic validation
            const name = form.querySelector('#form-name').value.trim();
            const phone = form.querySelector('#form-phone').value.trim();
            const service = form.querySelector('#form-service').value;

            if (!name || !phone || !service) {
                return;
            }

            // Show loading state
            submitBtn.innerHTML = `
                <svg class="btn-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;animation:spin 1s linear infinite">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="40 20"/>
                </svg>
                Sending...
            `;
            submitBtn.disabled = true;

            // Submit using Web3Forms
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                });

                const jsonResponse = await response.json();

                if (response.status == 200) {
                    form.innerHTML = `
                        <div class="form-success show">
                            <div style="font-size:3rem;margin-bottom:16px;color:#4ade80">✓</div>
                            <h3>Thank You!</h3>
                            <p>We've received your request. Our team will contact you shortly to discuss your garage door needs.</p>
                            <p style="margin-top:16px"><a href="tel:6622230748" style="color:var(--color-accent);font-weight:600">Or call us now: (662) 223-0748</a></p>
                        </div>
                    `;
                } else {
                    console.log(response);
                    submitBtn.innerHTML = 'Send Request';
                    submitBtn.disabled = false;
                    alert("Something went wrong! Please try calling us instead.");
                }
            } catch (error) {
                console.log(error);
                submitBtn.innerHTML = 'Send Request';
                submitBtn.disabled = false;
                alert("Something went wrong! Please try calling us instead.");
            }
        });
    }

    // --- Add spin animation ---
    const style = document.createElement('style');
    style.textContent = '@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
    document.head.appendChild(style);

    // --- Active nav highlighting ---
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = navLinks.querySelector(`a[href="#${id}"]`);
            
            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.style.color = 'var(--color-white)';
                } else {
                    link.style.color = '';
                }
            }
        });
    }, { passive: true });

});
