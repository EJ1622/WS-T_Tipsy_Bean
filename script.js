class EJRCoffeeApp {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.cacheElements();
            this.bindGlobalEvents();
            this.initPageSpecific();
            this.initAnimations();
        });
    }

    cacheElements() {
        this.elements = {
            navbar: document.querySelector('.navbar'),
            navbarCollapse: document.querySelector('.navbar-collapse'),
            navLinks: document.querySelectorAll('.nav-link'),
            navbarToggler: document.querySelector('.navbar-toggler')
        };
    }

    // ========================================================================================================
    //                                      GLOBAL EVENT DELEGATION
    // ========================================================================================================
    bindGlobalEvents() {
        // Single document-level event delegation
        document.addEventListener('click', this.handleGlobalClicks.bind(this));
        document.addEventListener('input', this.handleGlobalInputs.bind(this));
        
        // Global scroll handler
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Global smooth scroll
        this.bindSmoothScroll();
    }

    handleGlobalClicks(e) {
        // Quantity controls (Home + Menu)
        if (e.target.matches('.qty-plus, .qty-minus, .bestseller-qty-btns button')) {
            this.handleQuantityChange(e.target);
        }
        
        // Add to Cart (Menu)
        else if (e.target.matches('.add-cart-btn') || e.target.closest('.add-cart-btn')) {
            this.handleAddToCart(e.target.closest('.add-cart-btn'));
        }
        
        // Form submissions
        else if (e.target.matches('#subscribeForm button[type="submit"], #contactForm button[type="submit"], #bookingForm button[type="submit"]')) {
            e.preventDefault();
            this.handleFormSubmit(e.target.closest('form'));
        }
        
        // Phone links
        else if (e.target.matches('a[href^="tel:"]')) {
            this.handlePhoneClick(e.target);
        }
        
        // Navbar links (mobile close)
        else if (e.target.matches('.nav-link')) {
            this.closeMobileMenu();
        }
    }

    handleGlobalInputs(e) {
        if (e.target.matches('.form-control, .form-select')) {
            this.handleFormInput(e.target);
        }
    }

    // ========================================================================================================
    //                                              NAVBAR & SCROLL
    // ========================================================================================================
    handleScroll() {
        const { navbar } = this.elements;
        if (!navbar) return;

        const scrollY = window.scrollY;
        
        // Navbar scrolled state
        navbar.classList.toggle('scrolled', scrollY > 50);
        
        // Hide/show on scroll direction
        if (scrollY > 100) {
            navbar.style.transform = scrollY > this.lastScroll ? 'translateY(-100%)' : 'translateY(0)';
        }
        this.lastScroll = scrollY;
    }

    closeMobileMenu() {
        const { navbarCollapse } = this.elements;
        if (window.innerWidth <= 991 && navbarCollapse?.classList.contains('show')) {
            new bootstrap.Collapse(navbarCollapse).hide();
        }
    }

    bindSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    // ========================================================================================================
    //                                     QUANTITY CONTROLS (Home + Menu)
    // ========================================================================================================
    handleQuantityChange(button) {
        const container = button.closest('.bestseller-qty-btns, .qty-group');
        const qtyDisplay = container.querySelector('.qty');
        const orderBtn = container.closest('.bestseller-info, .menu-info')?.querySelector('.bestseller-order-btn, .add-cart-btn');
        
        let qty = parseInt(qtyDisplay.textContent) || 1;
        
        if (button.textContent === '-' || button.classList.contains('qty-minus')) {
            qty = Math.max(1, qty - 1);
        } else {
            qty++;
        }
        
        // Update display
        qtyDisplay.textContent = qty;
        qtyDisplay.classList.add('fw-bold', 'text-warning');
        
        // Update button
        if (orderBtn) {
            if (qty > 0) {
                orderBtn.disabled = false;
                orderBtn.innerHTML = qty > 1 
                    ? `Add ${qty} to Cart <i class="fas fa-shopping-cart ms-2"></i>`
                    : `Add to Cart <i class="fas fa-shopping-cart ms-2"></i>`;
                orderBtn.dataset.quantity = qty;
            } else {
                orderBtn.disabled = true;
                orderBtn.innerHTML = 'Coming soon';
            }
        }
        
        // Visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => button.style.transform = '', 100);
    }

    handleAddToCart(cartBtn) {
        const qty = parseInt(cartBtn.dataset.quantity) || 1;
        cartBtn.innerHTML = `Added ${qty} ✅`;
        cartBtn.classList.add('btn-success');
        cartBtn.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            cartBtn.innerHTML = `Add to Cart 🛒`;
            cartBtn.classList.remove('btn-success');
            cartBtn.style.transform = '';
        }, 2000);
    }

    // ========================================================================================================
    //                                     FORM HANDLERS (Contacts + Events)
    // ========================================================================================================
    handleFormSubmit(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>' + 
            (form.id === 'subscribeForm' ? 'Subscribing...' : 
             form.id === 'bookingForm' ? 'Booking...' : 'Sending...');
        submitBtn.disabled = true;
        
        // Simulate API
        setTimeout(() => {
            this.handleFormSuccess(form, submitBtn, originalText);
        }, 2000);
    }

    handleFormSuccess(form, submitBtn, originalText) {
        const isSubscribe = form.id === 'subscribeForm';
        const name = document.getElementById('subscribeName')?.value;
        
        submitBtn.innerHTML = '<i class="fas fa-check-circle me-2 text-success"></i>' +
            (form.id === 'bookingForm' ? 'Booking Confirmed!' : 
             isSubscribe ? 'Subscribed!' : 'Message Sent!');
        submitBtn.classList.add('btn-success');
        submitBtn.classList.remove('btn-warning');
        
        setTimeout(() => {
            if (isSubscribe && name) {
                const alert = `
                    <div class="alert alert-success alert-dismissible fade show rounded-4 mt-3" role="alert">
                        <i class="fas fa-heart me-2"></i>
                        Welcome ${name.split(' ')[0]}! You've joined the EJR's Coffee community. ☕
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
                form.parentNode.insertAdjacentHTML('beforebegin', alert);
            } else if (form.id === 'contactForm') {
                form.outerHTML = `
                    <div class="alert alert-success alert-dismissible fade show rounded-4 mt-4 p-4" role="alert">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-check-circle fa-2x me-3 text-success"></i>
                            <div><h5 class="mb-2">Message Sent Successfully!</h5>
                            <p class="mb-0">We'll get back to you within 24 hours. ☕</p></div>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
                return;
            }
            
            // Reset form & button
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('btn-success');
            submitBtn.classList.add('btn-warning');
            submitBtn.disabled = false;
            
            // Auto-dismiss alerts
            setTimeout(() => {
                document.querySelectorAll('.alert').forEach(alert => alert.remove());
            }, 5000);
        }, 1500);
    }

    handleFormInput(input) {
        const parent = input.parentNode;
        if (input.value.trim()) {
            parent.classList.add('has-value');
        } else {
            parent.classList.remove('has-value');
        }
    }

    handlePhoneClick(phoneLink) {
        phoneLink.style.transform = 'scale(0.98)';
        setTimeout(() => phoneLink.style.transform = 'scale(1)', 150);
    }

    // ========================================================================================================
    //                                            ANIMATIONS
    // ========================================================================================================
    initAnimations() {
        // Universal card observer
        const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -100px 0px' };
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 200);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all cards
        document.querySelectorAll('.event-card, .contact-card, .journey-card, .value-card, .menu-item').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(60px) scale(0.95)';
            card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            cardObserver.observe(card);
        });

        // Gallery hover effects
        document.querySelectorAll('.gallery-item, .map-container').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-10px) scale(1.02)';
            });
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Universal button hovers
        document.querySelectorAll('.btn-warning, .btn-success, .btn-outline-warning').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-4px) scale(1.02)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // ========================================================================================================
    //                                    PAGE-SPECIFIC INITIALIZATION
    // ========================================================================================================
    initPageSpecific() {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        
        // Active nav highlighting
        this.elements.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === path || 
                (path.includes('event_') && href === 'events.html') ||
                (path.includes('story_') && href === 'about.html') ||
                (path === 'contacts.html' && href === 'contacts.html')) {
                link.classList.add('active');
            }
        });

        // Page-specific parallax
        if (document.querySelector('.story-hero, .event-hero')) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.story-hero, .event-hero');
                hero.style.transform = `translateY(${scrolled * -0.3}px)`;
            });
        }
    }
}

// Initialize app when page loads
new EJRCoffeeApp();

// External library check (LightGallery - Events only)
if (typeof lightGallery !== 'undefined' && document.getElementById('lightGallery')) {
    lightGallery(document.getElementById('lightGallery'), {
        speed: 500,
        download: false,
        zoom: true,
        scale: 1
    });
}

// Email validation utility
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
