/**
 * CPL METAAL - Include Loader
 * Versie 2.2 - GEFIXTE VERSIE met verbeterde mobile dropdown en debugging
 * 
 * Dit script laadt automatisch de navigatie en footer op elke pagina
 * EN initialiseert de JavaScript functionaliteit correct
 * 
 * FIXES:
 * - Verbeterde dropdown toggle op mobiel
 * - Extra debug logging
 * - Betere event handling
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
        console.error('❌ Mobile menu button not found');
        return;
    }
    
    if (!navMenu) {
        console.error('❌ Navigation menu not found');
        return;
    }
    
    console.log('✅ Navigation elements found');
    
    // ===================================================================
    // HAMBURGERMENU TOGGLE
    // ===================================================================
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        console.log(isActive ? '📖 Menu opened' : '📕 Menu closed');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            
            // Sluit ook alle dropdowns bij het sluiten van menu
            document.querySelectorAll('.nav-item-dropdown').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    // ===================================================================
    // DROPDOWN ITEMS - MOBIEL & DESKTOP
    // ===================================================================
    const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
    console.log(`✅ Found ${dropdownItems.length} dropdown items`);
    
    dropdownItems.forEach((item, index) => {
        const link = item.querySelector('.nav-link');
        
        if (!link) {
            console.error(`❌ No link found in dropdown item ${index}`);
            return;
        }
        
        console.log(`✅ Setting up dropdown ${index}: ${link.textContent.trim()}`);
        
        link.addEventListener('click', function(e) {
            const isMobile = window.innerWidth <= 992;
            
            console.log(`🖱️ Click on: ${this.textContent.trim()}, Mobile: ${isMobile}`);
            
            // Alleen op mobiel: prevent default en toggle dropdown
            if (isMobile) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('📱 Mobile: Preventing default and toggling dropdown');
                
                // Check huidige state
                const wasActive = item.classList.contains('active');
                console.log(`Current state: ${wasActive ? 'active' : 'inactive'}`);
                
                // Sluit andere dropdowns
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherLink = otherItem.querySelector('.nav-link');
                        console.log(`🔽 Closing: ${otherLink ? otherLink.textContent.trim() : 'unknown'}`);
                    }
                });
                
                // Toggle huidige dropdown
                item.classList.toggle('active');
                const isNowActive = item.classList.contains('active');
                console.log(`${isNowActive ? '🔼' : '🔽'} ${isNowActive ? 'Opening' : 'Closing'}: ${this.textContent.trim()}`);
                
                // Check of dropdown menu bestaat en zichtbaar is
                const dropdownMenu = item.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    const styles = window.getComputedStyle(dropdownMenu);
                    console.log(`Dropdown menu styles:`, {
                        display: styles.display,
                        maxHeight: styles.maxHeight,
                        visibility: styles.visibility,
                        opacity: styles.opacity
                    });
                } else {
                    console.error('❌ Dropdown menu not found!');
                }
            } else {
                console.log('🖥️ Desktop: Normal link behavior (going to page)');
                // Op desktop: normale link werking (gaat naar de pagina)
            }
        });
    });
    
    // ===================================================================
    // ACTIVE LINK HIGHLIGHTING
    // ===================================================================
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-menu a');
    
    console.log(`🔍 Current path: ${currentPath}`);
    console.log(`✅ Found ${navLinks.length} navigation links to check`);
    
    navLinks.forEach(link => {
        if (!link.href) return;
        
        try {
            const linkPath = new URL(link.href).pathname;
            
            // Exact match voor homepage
            if (linkPath === '/' && currentPath === '/') {
                link.classList.add('active');
                console.log(`✅ Active: ${link.textContent.trim()} (homepage)`);
            }
            // Match voor andere pagina's
            else if (linkPath !== '/' && currentPath !== '/') {
                const normalizedCurrent = currentPath.replace(/\/$/, '');
                const normalizedLink = linkPath.replace(/\/$/, '');
                
                // Exact match of parent path match
                if (normalizedCurrent === normalizedLink || 
                    normalizedCurrent.startsWith(normalizedLink + '/')) {
                    link.classList.add('active');
                    console.log(`✅ Active: ${link.textContent.trim()}`);
                    
                    // Als het een dropdown item is, highlight ook de parent
                    const parentDropdown = link.closest('.nav-item-dropdown');
                    if (parentDropdown) {
                        const parentLink = parentDropdown.querySelector('.nav-link');
                        if (parentLink) {
                            parentLink.classList.add('active');
                            console.log(`✅ Active parent: ${parentLink.textContent.trim()}`);
                        }
                    }
                }
            }
        } catch (e) {
            // Negeer ongeldige URLs
            console.warn('⚠️ Invalid URL in navigation:', link.href);
        }
    });
    
    // ===================================================================
    // SLUIT MENU NA LINK CLICK (MOBIEL)
    // ===================================================================
    const menuLinks = document.querySelectorAll('.dropdown-menu a, .nav-menu > li > .nav-link');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const isMobile = window.innerWidth <= 992;
            
            // Niet sluiten als het een dropdown parent link is op mobiel
            if (isMobile && 
                this.closest('.nav-item-dropdown') && 
                this === this.closest('.nav-item-dropdown').querySelector('.nav-link')) {
                console.log('📱 Dropdown parent clicked, not closing menu');
                return; // Dit is al gehandeld door de dropdown toggle hierboven
            }
            
            // Sluit menu na het klikken op een link (mobiel)
            if (isMobile) {
                console.log('📱 Link clicked, closing menu in 200ms');
                setTimeout(() => {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Sluit alle dropdowns
                    dropdownItems.forEach(item => item.classList.remove('active'));
                    
                    console.log('✅ Menu closed');
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
                    if (item.classList.contains('active')) {
                        item.classList.remove('active');
                        console.log('🖥️ Closed dropdown (click outside)');
                    }
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
                console.log('✅ Menu closed (ESC key)');
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
                console.log('🖥️ Resized to desktop, closed mobile menu');
            }
        }, 250);
    });
    
    console.log('✅ Navigation initialized successfully');
    console.log('📊 Navigation stats:', {
        dropdownItems: dropdownItems.length,
        menuLinks: menuLinks.length,
        navLinks: navLinks.length
    });
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

console.log('📝 includes.js loaded - Version 2.2 (FIXED)');
