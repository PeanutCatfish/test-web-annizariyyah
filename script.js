// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async function() {
    // First load the navigation
    await loadNavigation();
    
    // Then initialize all other components
    initializeComponents();

    // Add scroll event for parallax effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const parallaxSpeed = 0.05; // Adjust this value for speed
        const tentangYayasan = document.querySelector('.tentang-yayasan');

        // Change background position based on scroll
        tentangYayasan.style.backgroundPositionY = (scrollPosition * parallaxSpeed) + 'px';
    });

    const sliderContainer = document.querySelector(".draggable-slider-container");
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    // Mouse Events
    sliderContainer.addEventListener("mousedown", (e) => {
        isDragging = true;
        sliderContainer.classList.add("dragging");
        startX = e.pageX - sliderContainer.offsetLeft;
        scrollLeft = sliderContainer.scrollLeft;
    });

    sliderContainer.addEventListener("mouseleave", () => {
        isDragging = false;
        sliderContainer.classList.remove("dragging");
    });

    sliderContainer.addEventListener("mouseup", () => {
        isDragging = false;
        sliderContainer.classList.remove("dragging");
    });

    sliderContainer.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - sliderContainer.offsetLeft;
        const walk = (x - startX) * 2; // Multiplier for sensitivity
        sliderContainer.scrollLeft = scrollLeft - walk;
    });

    // Touch Events (for mobile devices)
    sliderContainer.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - sliderContainer.offsetLeft;
        scrollLeft = sliderContainer.scrollLeft;
    });

    sliderContainer.addEventListener("touchend", () => {
        isDragging = false;
    });

    sliderContainer.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - sliderContainer.offsetLeft;
        const walk = (x - startX) * 2; // Multiplier for sensitivity
        sliderContainer.scrollLeft = scrollLeft - walk;
    });
});

// Function to load navigation
async function loadNavigation() {
    try {
        const isSubPage = window.location.pathname.includes('/page-lain/');
        const navPath = isSubPage ? '../page-komponen/nav-bar.html' : 'page-komponen/nav-bar.html';
        
        const response = await fetch(navPath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        
        const navContainer = document.getElementById('navigation-container');
        if (!navContainer) throw new Error('Navigation container not found');
        
        navContainer.innerHTML = html;
        initializeNavigationListeners();
    } catch (error) {
        console.error('Error loading navigation:', error);
    }
}

// Function to initialize navigation event listeners
function initializeNavigationListeners() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.querySelector('.menu-overlay');
    const mobileSubmenuTriggers = document.querySelectorAll('.mobile-menu .has-submenu');
    const mainLogo = document.querySelector('.header .logo');
    const mainSearch = document.querySelector('.header .header-kanan');
    
    if (!hamburgerMenu || !mobileMenu || !closeBtn || !overlay) {
        console.error('Navigation elements not found');
        return;
    }
    
    // Toggle mobile menu
    hamburgerMenu.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (mainLogo && mainSearch) {
            mainLogo.style.opacity = '0';
            mainSearch.style.opacity = '0';
            setTimeout(() => {
                mainLogo.style.visibility = 'hidden';
                mainSearch.style.visibility = 'hidden';
            }, 300);
        }
    });
    
    // Close mobile menu
    function closeMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        if (mainLogo && mainSearch) {
            mainLogo.style.visibility = 'visible';
            mainSearch.style.visibility = 'visible';
            mainLogo.style.opacity = '1';
            mainSearch.style.opacity = '1';
        }
        
        // Close all submenus
        const openSubmenus = mobileMenu.querySelectorAll('.sub-menu.show, .sub-sub-menu.show');
        openSubmenus.forEach(submenu => {
            submenu.classList.remove('show');
            const icon = submenu.parentElement.querySelector('.fa-chevron-down');
            if (icon) icon.style.transform = 'rotate(0deg)';
        });
    }
    
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Toggle mobile submenus
    mobileSubmenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            console.log('Submenu trigger clicked'); // Debug log
            e.preventDefault();
            e.stopPropagation();
            
            const submenu = this.nextElementSibling;
            const icon = this.querySelector('.fa-chevron-down');
            
            if (submenu) {
                console.log('Found submenu:', submenu); // Debug log
                
                // Close sibling submenus
                const siblings = submenu.parentElement.parentElement.querySelectorAll('.sub-menu.show, .sub-sub-menu.show');
                siblings.forEach(sibling => {
                    if (sibling !== submenu) {
                        sibling.classList.remove('show');
                        const siblingIcon = sibling.parentElement.querySelector('.fa-chevron-down');
                        if (siblingIcon) siblingIcon.style.transform = 'rotate(0deg)';
                    }
                });
                
                // Toggle clicked submenu
                submenu.classList.toggle('show');
                if (icon) {
                    icon.style.transform = submenu.classList.contains('show') 
                        ? 'rotate(180deg)' 
                        : 'rotate(0deg)';
                }
            }
        });
    });
}

// Slider Configuration for different pages
const sliderConfig = {
    'bws.html': {
        images: [
            "../image/BWS.png"
        ]
    },
    'dapur.html': {
        images: [
            "../image/Kontak 1.jpg",
            "../image/Kontak 2.jpg",
            "../image/Kontak 3.jpg"
        ]
    },
    'sdit.html': {
        images: [
            "../image/SDIT Slide 1.jpg",
            "../image/SDIT Slide 2.jpg",
            "../image/SDIT Slide 3.jpg"
        ]
    },
    'ppdb.html': {
        images: [
            "../image/SDIT Slide 1.jpg",
            "../image/SDIT Slide 2.jpg",
            "../image/SDIT Slide 3.jpg"
        ]
    },
    'tkit1.html': {
        images: [
            "../image/TKIT Sholahuddin 1.jpg",
            "./galeri-tkit1/Gambar 6.jpg",
            "./galeri-tkit1/Gambar 9.jpg"
        ]
    },
    'tkit2.html': {
        images: [
            "../image/TKIT SH 2 Slide 1.jpg",
            "./galeri-tkit2/Slide 1.jpg",
            "./galeri-tkit2/Slide 2.jpg"
        ]
    },
    'tentang.html': {
        images: [
            "../image/TKIT Sholahuddin 1.jpg",
            "../image/SDIT Slide 1.jpg",
            "../image/Gambar Slide 2.jpg"
        ]
    },
    'kontak.html': {
        images: [
            "../image/Kontak 1.jpg",
            "../image/Kontak 2.jpg",
            "../image/Kontak 3.jpg"
        ]
    },
    'kbihu.html': {
        images: [
            "../image/KBIHU Slide 1.jpg"
        ]
    }
};

// Function to initialize other components
function initializeComponents() {
    // Configuration for other components
    const componentsToLoad = [
        { 
            containerId: 'footer-container', 
            fileName: 'footer.html',
            errorMessage: 'Footer container not found'
        }
    ];
    
    // Load other components
    componentsToLoad.forEach(loadComponent);
    
    // Initialize the appropriate slider based on page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html') {
        // Initialize the complex slider for index.html
        setTimeout(() => {
            initializeSlider();
        }, 100);
    } else {
        // Initialize the simple slider for other pages
        setTimeout(() => {
            initializeHeroSlider();
        }, 100);
    }
}

// Function to load a component
async function loadComponent(component) {
    try {
        const isSubPage = window.location.pathname.includes('/page-lain/');
        const componentPath = isSubPage 
            ? `../page-komponen/${component.fileName}`
            : `page-komponen/${component.fileName}`;
            
        const response = await fetch(componentPath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        
        const container = document.getElementById(component.containerId);
        if (!container) throw new Error(component.errorMessage);
        
        container.innerHTML = html;
        
        if (component.onLoad) {
            setTimeout(() => component.onLoad(), 0);
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Initialize slider functionality (for index.html)
function initializeSlider() {
    const slider = document.querySelector('.slider');
    const slidesContainer = document.querySelector('.slider');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderDots = document.querySelector('.slider-dots');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    let isTransitioning = false;

    // Clone first and last slides for seamless looping
    function setupInfiniteCarousel() {
        const firstSlideClone = slides[0].cloneNode(true);
        const lastSlideClone = slides[totalSlides - 1].cloneNode(true);

        // Add clones to the beginning and end of the slider
        slidesContainer.insertAdjacentElement('afterbegin', lastSlideClone);
        slidesContainer.appendChild(firstSlideClone);

        // Update slides array to include clones
        const updatedSlides = Array.from(document.querySelectorAll('.slide'));
        
        // Set initial position to first real slide
        slider.style.transition = 'none';
        slider.style.transform = `translateX(-100%)`;
        
        // Reflow to ensure initial transform is applied
        slider.offsetHeight;
        
        // Re-enable transitions
        slider.style.transition = 'transform 0.5s ease';
    }

    // Create dynamic navigation dots
    function createNavigationDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        });
    }

    // Reset auto-slide timer
    function resetAutoSlideTimer() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    // Update active dot
    function updateDots() {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Go to specific slide
    function goToSlide(slideIndex) {
        // Prevent multiple simultaneous transitions
        if (isTransitioning) return;
        
        isTransitioning = true;
        currentSlide = slideIndex;
        
        // Adjust for cloned slides (add 1 to account for the prepended last slide clone)
        const transformValue = `-${(currentSlide + 1) * 100}%`;
        slider.style.transform = `translateX(${transformValue})`;
        
        updateDots();
        
        // Reset transition flag after animation
        setTimeout(() => {
            isTransitioning = false;
            
            // Handle wrap-around for first and last slides
            if (currentSlide === -1) {
                slider.style.transition = 'none';
                slider.style.transform = `translateX(-${totalSlides * 100}%)`;
                currentSlide = totalSlides - 1;
                
                // Reflow to ensure transform is applied
                slider.offsetHeight;
                
                // Re-enable transitions
                slider.style.transition = 'transform 0.5s ease';
            } else if (currentSlide === totalSlides) {
                slider.style.transition = 'none';
                slider.style.transform = `translateX(-100%)`;
                currentSlide = 0;
                
                // Reflow to ensure transform is applied
                slider.offsetHeight;
                
                // Re-enable transitions
                slider.style.transition = 'transform 0.5s ease';
            }
        }, 500);
        
        resetAutoSlideTimer();
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        if (!isTransitioning) nextSlide();
    });

    prevBtn.addEventListener('click', () => {
        if (!isTransitioning) prevSlide();
    });

    // Setup infinite carousel
    setupInfiniteCarousel();

    // Initialize auto-slide
    resetAutoSlideTimer();

    // Initialize navigation dots
    createNavigationDots();
}

// Initialize hero slider (for other pages)
function initializeHeroSlider() {
    const slider = document.getElementById("slider");
    if (!slider) return; // Exit if no slider found

    // Get current page name from URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Get images for current page
    let images = [];
    
    // First try to get images from data attribute
    const dataImages = slider.dataset.images;
    if (dataImages) {
        try {
            images = JSON.parse(dataImages);
        } catch (e) {
            console.error('Error parsing slider data-images:', e);
        }
    }
    
    // If no data attribute images, try config
    if (images.length === 0 && sliderConfig[currentPage]) {
        images = sliderConfig[currentPage].images;
    }
    
    // If still no images, use defaults
    if (images.length === 0) {
        console.warn('No slider images found for page:', currentPage);
        return;
    }

    // Clear existing images
    slider.innerHTML = '';

    // Create image elements dynamically
    images.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Slider Image";
        slider.appendChild(img);
    });

    let currentIndex = 0;

    function updateSlider() {
        if (slider && typeof slider.style !== 'undefined') {
            slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
        }
    }

    // Initial update
    updateSlider();

    // Automatic sliding
    const slideInterval = setInterval(() => {
        if (document.getElementById("slider")) { // Check if slider still exists
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
        } else {
            clearInterval(slideInterval); // Clean up if slider is removed
        }
    }, 7000); // 7 seconds delay
}