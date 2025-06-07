// Smooth scrolling için navigation linkleri
document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Navigation linklerini kapat (mobil)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Scroll olayında navbar'ı güncelle
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Intersection Observer ile animasyonlar
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animasyon için elementleri gözlemle
    document.querySelectorAll('.timeline-item, .experience-card, .gallery-item, .radio-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Form gönderimi
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form verilerini al
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basit form doğrulaması
        if (!name || !email || !subject || !message) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }
        
        // Email doğrulaması
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Lütfen geçerli bir e-posta adresi girin.');
            return;
        }
        
        // Submit butonunu güncelle
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Gönderiliyor...';
        submitBtn.disabled = true;
        
        // Simüle edilmiş form gönderimi (gerçek projelendiriniz backend ile değiştirin)
        setTimeout(() => {
            alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Modern Galeri Lightbox Sistemi
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryImages = [
        { src: 'assets/photo1.jpg', alt: 'Emine Özkurt Fotoğraf 1' },
        { src: 'assets/photo2.jpg', alt: 'Emine Özkurt Fotoğraf 2' },
        { src: 'assets/photo3.jpg', alt: 'Emine Özkurt Fotoğraf 3' },
        { src: 'assets/photo4.jpg', alt: 'Emine Özkurt Fotoğraf 4' },
        { src: 'assets/photo5.jpg', alt: 'Emine Özkurt Fotoğraf 5' },
        { src: 'assets/photo6.jpg', alt: 'Emine Özkurt Fotoğraf 6' },
        { src: 'assets/photo7.jpg', alt: 'Emine Özkurt Fotoğraf 7' },
        { src: 'assets/photo8.jpg', alt: 'Emine Özkurt Fotoğraf 8' },
        { src: 'assets/photo9.jpg', alt: 'Emine Özkurt Fotoğraf 9' },
        { src: 'assets/photo10.jpg', alt: 'Emine Özkurt Fotoğraf 10' },
        { src: 'assets/photo11.jpg', alt: 'Emine Özkurt Fotoğraf 11' }
    ];
    
    let currentImageIndex = 0;
    let lightboxElement = null;
    let isTransitioning = false;
    
    function createModernLightbox(index) {
        if (lightboxElement) return;
        
        currentImageIndex = index;
        isTransitioning = false;
        
        // Ana lightbox container
        lightboxElement = document.createElement('div');
        lightboxElement.className = 'modern-lightbox';
        
        lightboxElement.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-container">
                <div class="lightbox-header">
                    <div class="lightbox-title">${galleryImages[index].alt}</div>
                    <button class="lightbox-close" aria-label="Kapat">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                
                <div class="lightbox-content">
                    <button class="lightbox-nav lightbox-prev" aria-label="Önceki">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15,18 9,12 15,6"></polyline>
                        </svg>
                    </button>
                    
                    <div class="lightbox-image-wrapper">
                        <img class="lightbox-image" src="${galleryImages[index].src}" alt="${galleryImages[index].alt}">
                    </div>
                    
                    <button class="lightbox-nav lightbox-next" aria-label="Sonraki">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9,18 15,12 9,6"></polyline>
                        </svg>
                    </button>
                </div>
                
                <div class="lightbox-footer">
                    <div class="lightbox-counter">
                        <span class="current-image">${index + 1}</span>
                        <span class="separator">/</span>
                        <span class="total-images">${galleryImages.length}</span>
                    </div>
                    
                    <div class="lightbox-thumbnails">
                        ${galleryImages.map((img, i) => `
                            <div class="thumbnail ${i === index ? 'active' : ''}" data-index="${i}">
                                <img src="${img.src}" alt="${img.alt}">
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // Stilleri ekle
        addLightboxStyles();
        
        // DOM'a ekle
        document.body.appendChild(lightboxElement);
        document.body.style.overflow = 'hidden';
        
        // Global klavye event listener'ı ekle
        document.addEventListener('keydown', globalKeyHandler);
        
        // Animasyonlu açılış
        requestAnimationFrame(() => {
            lightboxElement.classList.add('active');
        });
        
        // Event listener'ları ekle
        setupModernLightboxEvents();
        
        // İlk resmi yükle
        setTimeout(() => {
            loadImage(index);
        }, 100);
    }
    
    function addLightboxStyles() {
        if (!document.getElementById('modern-lightbox-styles')) {
            const style = document.createElement('style');
            style.id = 'modern-lightbox-styles';
            style.textContent = `
                .modern-lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 10000;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .modern-lightbox.active {
                    opacity: 1;
                    visibility: visible;
                }
                
                .lightbox-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    backdrop-filter: blur(20px);
                }
                
                .lightbox-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 20px;
                    box-sizing: border-box;
                }
                
                .lightbox-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 0 20px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .lightbox-title {
                    color: white;
                    font-size: 1.2rem;
                    font-weight: 500;
                }
                
                .lightbox-close {
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    border-radius: 50%;
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }
                
                .lightbox-close:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: scale(1.1);
                }
                
                .lightbox-content {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    padding: 20px 0;
                    min-height: 0;
                }
                
                .lightbox-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    border-radius: 50%;
                    width: 56px;
                    height: 56px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    backdrop-filter: blur(10px);
                    z-index: 10001;
                }
                
                .lightbox-prev {
                    left: 20px;
                }
                
                .lightbox-next {
                    right: 20px;
                }
                
                .lightbox-nav:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-50%) scale(1.1);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                }
                
                .lightbox-nav:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                    transform: translateY(-50%) scale(0.9);
                }
                
                .lightbox-image-wrapper {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    max-width: 85%;
                    max-height: 85%;
                }
                
                .lightbox-image {
                    max-width: 100%;
                    max-height: 100%;
                    width: auto;
                    height: auto;
                    object-fit: contain;
                    border-radius: 12px;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    opacity: 0;
                    transform: scale(0.9);
                }
                
                /* Dikey resim optimizasyonu */
                .lightbox-image[data-orientation="portrait"] {
                    max-height: 65vh;
                    max-width: 90%;
                }
                
                /* Yatay resim optimizasyonu */
                .lightbox-image[data-orientation="landscape"] {
                    max-width: 85%;
                    max-height: 70vh;
                }
                
                /* Kare resim optimizasyonu */
                .lightbox-image[data-orientation="square"] {
                    max-width: 75%;
                    max-height: 70vh;
                }
                
                .lightbox-image.loaded {
                    opacity: 1;
                    transform: scale(1);
                }
                
                .lightbox-image.transitioning {
                    opacity: 0;
                    transform: scale(0.95);
                    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .lightbox-loader {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1;
                    display: none;
                }
                
                .loader-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-top: 3px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .lightbox-footer {
                    padding: 20px 0 0 0;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .lightbox-counter {
                    text-align: center;
                    color: white;
                    font-size: 1rem;
                    margin-bottom: 20px;
                    font-weight: 500;
                }
                
                .lightbox-counter .current-image {
                    color: #667eea;
                    font-weight: 600;
                }
                
                .lightbox-thumbnails {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    overflow-x: auto;
                    padding: 0 20px;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                
                .lightbox-thumbnails::-webkit-scrollbar {
                    display: none;
                }
                
                .thumbnail {
                    flex-shrink: 0;
                    width: 60px;
                    height: 60px;
                    border-radius: 8px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                    opacity: 0.6;
                }
                
                .thumbnail:hover {
                    opacity: 0.8;
                    transform: scale(1.05);
                }
                
                .thumbnail.active {
                    border-color: #667eea;
                    opacity: 1;
                    box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
                }
                
                .thumbnail img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                /* Responsive Design */
                @media (max-width: 768px) {
                    .lightbox-container {
                        padding: 15px;
                    }
                    
                    .lightbox-nav {
                        width: 48px;
                        height: 48px;
                    }
                    
                    .lightbox-prev {
                        left: 10px;
                    }
                    
                    .lightbox-next {
                        right: 10px;
                    }
                    
                    .lightbox-image-wrapper {
                        max-width: 95%;
                        max-height: 75%;
                    }
                    
                    .lightbox-image[data-orientation="portrait"] {
                        max-height: 55vh;
                        max-width: 95%;
                    }
                    
                    .lightbox-image[data-orientation="landscape"] {
                        max-width: 90%;
                        max-height: 60vh;
                    }
                    
                    .thumbnail {
                        width: 50px;
                        height: 50px;
                    }
                    
                    .lightbox-title {
                        font-size: 1rem;
                    }
                    
                    .lightbox-thumbnails {
                        gap: 6px;
                        padding: 0 10px;
                    }
                }
                
                @media (max-width: 480px) {
                    .lightbox-container {
                        padding: 10px;
                    }
                    
                    .lightbox-header {
                        padding: 0 0 15px 0;
                    }
                    
                    .lightbox-footer {
                        padding: 15px 0 0 0;
                    }
                    
                    .lightbox-image-wrapper {
                        max-width: 95%;
                        max-height: 65%;
                    }
                    
                    .lightbox-image[data-orientation="portrait"] {
                        max-height: 50vh;
                        max-width: 95%;
                    }
                    
                    .thumbnail {
                        width: 45px;
                        height: 45px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function loadImage(index) {
        if (!lightboxElement) return;
        
        const img = lightboxElement.querySelector('.lightbox-image');
        const title = lightboxElement.querySelector('.lightbox-title');
        const counter = lightboxElement.querySelector('.current-image');
        
        // Daha hızlı transition
        img.classList.add('transitioning');
        img.classList.remove('loaded');
        
        // Yeni resmi yükle
        const newImg = new Image();
        newImg.onload = () => {
            // Resim boyutlarını kontrol et ve orientation belirle
            const aspectRatio = newImg.width / newImg.height;
            let orientation;
            
            if (aspectRatio > 1.2) {
                orientation = 'landscape';
            } else if (aspectRatio < 0.8) {
                orientation = 'portrait';
            } else {
                orientation = 'square';
            }
            
            // Hızlı geçiş - 100ms
            setTimeout(() => {
                img.src = newImg.src;
                img.alt = galleryImages[index].alt;
                img.setAttribute('data-orientation', orientation);
                
                title.textContent = galleryImages[index].alt;
                counter.textContent = index + 1;
                
                // Thumbnail'ları güncelle
                updateThumbnails(index);
                
                // Hızlı göster
                setTimeout(() => {
                    img.classList.remove('transitioning');
                    img.classList.add('loaded');
                    // Transition tamamlandı, flag'i sıfırla
                    isTransitioning = false;
                }, 20);
            }, 100);
        };
        
        newImg.onerror = () => {
            console.error('Resim yüklenemedi:', galleryImages[index].src);
            img.classList.remove('transitioning');
            isTransitioning = false;
        };
        
        newImg.src = galleryImages[index].src;
    }
    
    function updateThumbnails(activeIndex) {
        const thumbnails = lightboxElement.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === activeIndex);
        });
        
        // Aktif thumbnail'ı görünür alanda tut
        const activeThumbnail = thumbnails[activeIndex];
        if (activeThumbnail) {
            activeThumbnail.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }
    
    function navigateToImage(direction) {
        if (isTransitioning) {
            console.log('Navigation blocked - transitioning');
            return;
        }
        
        isTransitioning = true;
        console.log('Navigate:', direction, 'From index:', currentImageIndex);
        
        if (direction === 'next') {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        } else if (direction === 'prev') {
            currentImageIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
        }
        
        console.log('New index:', currentImageIndex);
        loadImage(currentImageIndex);
        
        // Güvenlik için timeout - eğer loadImage tamamlanmazsa
        setTimeout(() => {
            if (isTransitioning) {
                console.log('Forcing isTransitioning reset');
                isTransitioning = false;
            }
        }, 500);
    }
    
    function setupModernLightboxEvents() {
        if (!lightboxElement) return;
        
        const closeBtn = lightboxElement.querySelector('.lightbox-close');
        const prevBtn = lightboxElement.querySelector('.lightbox-prev');
        const nextBtn = lightboxElement.querySelector('.lightbox-next');
        const overlay = lightboxElement.querySelector('.lightbox-overlay');
        const thumbnails = lightboxElement.querySelectorAll('.thumbnail');
        
        // Buton events
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeLightbox();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Prev button clicked');
                navigateToImage('prev');
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Next button clicked');
                navigateToImage('next');
            });
        }
        
        if (overlay) {
            overlay.addEventListener('click', closeLightbox);
        }
        
        // Thumbnail events
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (index !== currentImageIndex && !isTransitioning) {
                    currentImageIndex = index;
                    loadImage(index);
                }
            });
        });
    }
    
    function closeLightbox() {
        if (!lightboxElement) return;
        
        // Keyboard event listener'ı temizle
        document.removeEventListener('keydown', globalKeyHandler);
        
        lightboxElement.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            if (lightboxElement && lightboxElement.parentNode) {
                document.body.removeChild(lightboxElement);
            }
            lightboxElement = null;
            isTransitioning = false;
        }, 400);
    }
    
    // Global klavye event handler
    function globalKeyHandler(e) {
        // Sadece lightbox açıkken çalışsın
        if (!lightboxElement || !lightboxElement.classList.contains('active')) {
            return;
        }
        
        console.log('Global key pressed:', e.key); // Debug
        
        switch(e.key) {
            case 'Escape':
                e.preventDefault();
                closeLightbox();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                console.log('Arrow left - navigating prev');
                navigateToImage('prev');
                break;
            case 'ArrowRight':
                e.preventDefault();
                console.log('Arrow right - navigating next');
                navigateToImage('next');
                break;
        }
    }
    
    // Galeri öğelerine tıklama events
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            createModernLightbox(index);
        });
    });
    
    // Scroll yukarı butonu
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        z-index: 1000;
        transition: transform 0.3s ease, opacity 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Scroll pozisyonuna göre butonu göster/gizle
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'flex';
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 500) {
                    scrollTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Yukarı scroll işlevi
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// goToTop fonksiyonu - menü logosu için
function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    window.history.pushState({}, '', '#');
} 