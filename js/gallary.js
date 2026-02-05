/* ============================================
   SAANVI BEAUTY - GALLERY MODULE
   Lightbox functionality and image handling
   ============================================ */

const Gallery = {
    // Configuration
    images: [
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200',
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200',
        'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200',
        'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200',
        'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200',
        'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1200'
    ],
    
    currentIndex: 0,
    
    // Initialize gallery
    init() {
        this.bindEvents();
        console.log('Gallery initialized');
    },
    
    // Bind keyboard and click events
    bindEvents() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen()) return;
            
            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.prev();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
            }
        });
        
        // Close on background click
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) this.close();
            });
        }
    },
    
    // Open lightbox
    open(index) {
        this.currentIndex = index;
        const img = document.getElementById('lightbox-img');
        const lightbox = document.getElementById('lightbox');
        
        if (img && lightbox) {
            img.src = this.images[index];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },
    
    // Close lightbox
    close() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    },
    
    // Check if lightbox is open
    isOpen() {
        const lightbox = document.getElementById('lightbox');
        return lightbox && lightbox.classList.contains('active');
    },
    
    // Next image
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    },
    
    // Previous image
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    },
    
    // Update displayed image
    updateImage() {
        const img = document.getElementById('lightbox-img');
        if (img) {
            // Add fade effect
            img.style.opacity = '0.5';
            setTimeout(() => {
                img.src = this.images[this.currentIndex];
                img.style.opacity = '1';
            }, 150);
        }
    }
};

// Global functions for HTML onclick attributes
function openLightbox(index) {
    Gallery.open(index);
}

function closeLightbox() {
    Gallery.close();
}

function changeImage(direction) {
    if (direction > 0) {
        Gallery.next();
    } else {
        Gallery.prev();
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Gallery.init());
} else {
    Gallery.init();
}