/**
 * CPL METAAL - Include Loader
 * Versie 2.0 - Volledig herschreven voor correcte JavaScript initialisatie
 * 
 * Dit script laadt automatisch de navigatie en footer op elke pagina
 * EN initialiseert de JavaScript functionaliteit correct
 */

// Functie om HTML includes te laden
function loadIncludes() {
    console.log('🔄 Loading includes...');
    
    // Laad navigatie
    fetch('/includes/navigation.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('✅ Navigation.html fetched successfully');
            return response.text();
        })
        .then(data => {
            const navPlaceholder = document.getElementById('navigation-placeholder');
            if (navPlaceholder) {
                console.log('✅ Navigation placeholder found, inserting HTML...');
                navPlaceholder.innerHTML = data;
                
                // KRITIEK: Wacht even tot de DOM volledig is bijgewerkt
                setTimeout(() => {
                    console.log('🔧 Initializing navigation...');
                    initializeNavigation();
                }, 10);
            } else {
                console.error('❌ Navigation placeholder not found');
            }
        })
        .catch(error => console.error('❌ Error loading navigation:', error));

    // Laad footer
    fetch('/includes/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
                console.log('✅ Footer loaded successfully');
            } else {
                console.warn('⚠️ Footer placeholder not found');
            }
        })
        .catch(error => console.error('❌ Error loading footer:', error));
}

// Functie om navigatie JavaScript te initialiseren
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    // Controleer of elementen bestaan
    if (!mobileMenuBtn) {
        console.error('Mobile menu button not found');
        return;
    }
    
    if (!navMenu) {
        console.error('Navigation menu not found');
        return;
    }
    
    // ===================================================================
    // HAMBURGERMENU TOGGLE
    // ===================================================================
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // ===================================================================
    // DROPDOWN ITEMS - MOBIEL
    // ===================================================================
    const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        
        if (link) {
            link.addEventListener('click', function(e) {
                // Alleen op mobiel: prevent default en toggle dropdown
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    
                    // Sluit andere dropdowns
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle huidige dropdown
                    item.classList.toggle('active');
                }
                // Op desktop: normale link werking
            });
        }
    });
    
    // ===================================================================
    // ACTIVE LINK HIGHLIGHTING
    // ===================================================================
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-menu a');
    
    navLinks.forEach(link => {
        if (!link.href) return;
        
        try {
            const linkPath = new URL(link.href).pathname;
            
            // Exact match voor homepage
            if (linkPath === '/' && currentPath === '/') {
                link.classList.add('active');
            }
            // Match voor andere pagina's
            else if (linkPath !== '/' && currentPath !== '/') {
                const normalizedCurrent = currentPath.replace(/\/$/, '');
                const normalizedLink = linkPath.replace(/\/$/, '');
                
                // Exact match of parent path match
                if (normalizedCurrent === normalizedLink || 
                    normalizedCurrent.startsWith(normalizedLink + '/')) {
                    link.classList.add('active');
                    
                    // Als het een dropdown item is, highlight ook de parent
                    const parentDropdown = link.closest('.nav-item-dropdown');
                    if (parentDropdown) {
                        const parentLink = parentDropdown.querySelector('.nav-link');
                        if (parentLink) {
                            parentLink.classList.add('active');
                        }
                    }
                }
            }
        } catch (e) {
            // Negeer ongeldige URLs
            console.warn('Invalid URL in navigation:', link.href);
        }
    });
    
    // ===================================================================
    // SLUIT MENU NA LINK CLICK (MOBIEL)
    // ===================================================================
    const menuLinks = document.querySelectorAll('.dropdown-menu a, .nav-menu > li > .nav-link');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Niet sluiten als het een dropdown parent link is op mobiel
            if (window.innerWidth <= 992 && 
                this.closest('.nav-item-dropdown') && 
                this === this.closest('.nav-item-dropdown').querySelector('.nav-link')) {
                return; // Dit is al gehandeld door de dropdown toggle hierboven
            }
            
            // Sluit menu na het klikken op een link (mobiel)
            if (window.innerWidth <= 992) {
                setTimeout(() => {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Sluit alle dropdowns
                    dropdownItems.forEach(item => item.classList.remove('active'));
                }, 200);
            }
        });
    });
    
    // ===================================================================
    // SLUIT DROPDOWN BIJ KLIK BUITEN (DESKTOP)
    // ===================================================================
    document.addEventListener('click', function(e) {
        // Alleen op desktop
        if (window.innerWidth > 992) {
            if (!e.target.closest('.nav-item-dropdown') && 
                !e.target.closest('.mobile-menu-btn')) {
                dropdownItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
        }
    });
    
    // ===================================================================
    // SLUIT MENU BIJ ESC TOETS (MOBIEL)
    // ===================================================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && window.innerWidth <= 992) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
                dropdownItems.forEach(item => item.classList.remove('active'));
            }
        }
    });
    
    // ===================================================================
    // WINDOW RESIZE HANDLER
    // ===================================================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Bij resize naar desktop: sluit mobiel menu
            if (window.innerWidth > 992) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
                dropdownItems.forEach(item => item.classList.remove('active'));
            }
        }, 250);
    });
    
    console.log('✅ Navigation initialized successfully');
}

// ===================================================================
// START ALLES OP
// ===================================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadIncludes);
} else {
    // DOMContentLoaded is al afgevuurd
    loadIncludes();
}
