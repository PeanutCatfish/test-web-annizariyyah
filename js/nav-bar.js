// Navigation bar functionality
function initializeNavigation() {
    // Remove any existing event listeners
    const existingHamburger = document.querySelector('.hamburger-menu');
    const existingCloseBtn = document.querySelector('.close-btn');
    if (existingHamburger) {
        const newHamburger = existingHamburger.cloneNode(true);
        existingHamburger.parentNode.replaceChild(newHamburger, existingHamburger);
    }
    if (existingCloseBtn) {
        const newCloseBtn = existingCloseBtn.cloneNode(true);
        existingCloseBtn.parentNode.replaceChild(newCloseBtn, existingCloseBtn);
    }

    // Initialize navigation elements
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.querySelector('.menu-overlay');
    const submenuTriggers = document.querySelectorAll('.mobile-menu .has-submenu');
    const mainLogo = document.querySelector('.header .logo');
    const mainSearch = document.querySelector('.header .header-kanan');

    // Add transition properties
    if (mainLogo && mainSearch) {
        mainLogo.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
        mainSearch.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    }

    // Toggle mobile menu
    hamburgerMenu?.addEventListener('click', function() {
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

    // Close menu function
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
    }

    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);

    // Submenu handlers
    submenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            const icon = this.querySelector('i');
            if (submenu && icon) {
                submenu.classList.toggle('show');
                icon.style.transform = submenu.classList.contains('show') 
                    ? 'rotate(180deg)' 
                    : 'rotate(0)';
            }
        });
    });
}

// Export the function
window.initializeNavigation = initializeNavigation;
