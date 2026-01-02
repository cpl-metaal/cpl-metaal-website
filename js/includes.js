/**
 * CPL METAAL - Include Loader
 * Dit script laadt automatisch de navigatie en footer op elke pagina
 */

// Functie om HTML includes te laden
function loadIncludes() {
    // Laad navigatie
    fetch('/includes/navigation.html')
        .then(response => response.text())
        .then(data => {
            const navPlaceholder = document.getElementById('navigation-placeholder');
            if (navPlaceholder) {
                navPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading navigation:', error));

    // Laad footer
    fetch('/includes/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Laad includes wanneer de pagina klaar is
document.addEventListener('DOMContentLoaded', loadIncludes);
