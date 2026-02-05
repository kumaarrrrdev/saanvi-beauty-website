/* ============================================
   SAANVI BEAUTY - MAIN MODULE
   Navigation, scroll effects, mobile menu
   ============================================ */

const App = {
    // Initialize all modules
    init() {
        this.Navigation.init();
        this.ScrollEffects.init();
        this.MobileMenu.init();
        this.BackToTop.init();
        
        console.log('Saanvi Beauty app initialized 🙏');
    },
    
    // Navigation Module
    Navigation: {
        init() {
            this.navbar = document.querySelector('.navbar');
            this.bindEvents();
        },
        
        bindEvents() {
            window.addEventListener('scroll', () => {
                if (!this.navbar) return;
                
                // Add shadow on scroll
                if (window.scrollY > 100) {
                    this.navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
                } else {
                    this.navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                }
            });
        }
    },
    
    // Scroll Effects Module
    ScrollEffects: {
        init() {
            this.reveals = document.querySelectorAll('.reveal');
            this.bindEvents();
            this.checkReveal(); // Check on load
        },
        
        bindEvents() {
            window.addEventListener('scroll', () => this.checkReveal());
            window.addEventListener('resize', () => this.checkReveal());
        },
        
        checkReveal() {
            const windowHeight = window.innerHeight;
            const elementVisible = 150;
            
            this.reveals.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }
    },
    
    // Mobile Menu Module
    MobileMenu: {
        init() {
            this.menuBtn = document.querySelector('.mobile-menu');
            this.mobileNav = document.getElementById('mobileNav');
            this.links = document.querySelectorAll('.mobile-nav a');
            
            if (this.menuBtn && this.mobileNav) {
                this.bindEvents();
            }
        },
        
        bindEvents() {
            // Toggle menu
            this.menuBtn.addEventListener('click', () => {
                this.mobileNav.classList.toggle('active');
                this.updateIcon();
            });
            
            // Close on link click
            this.links.forEach(link => {
                link.addEventListener('click', () => {
                    this.close();
                });
            });
        },
        
        open() {
            this.mobileNav.classList.add('active');
            this.updateIcon();
        },
        
        close() {
            this.mobileNav.classList.remove('active');
            this.updateIcon();
        },
        
        updateIcon() {
            const icon = this.menuBtn.querySelector('i');
            if (this.mobileNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    },
    
    // Back to Top Module
    BackToTop: {
        init() {
            this.button = document.getElementById('backToTop');
            if (!this.button) return;
            
            this.bindEvents();
        },
        
        bindEvents() {
            window.addEventListener('scroll', () => this.toggleVisibility());
            
            this.button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        },
        
        toggleVisibility() {
            if (window.scrollY > 300) {
                this.button.style.display = 'flex';
            } else {
                this.button.style.display = 'none';
            }
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}