
function initThemeToggle() {
    const input = document.getElementById('darkMode');
    if (!input) return;
   

    const darkMode = localStorage.getItem('darkMode') === 'true';
    input.checked = darkMode;
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
    
    
    input.addEventListener('change', () => {
        if (input.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });
}


if (document.readyState === 'loading') {
    window.addEventListener('load', initThemeToggle);
} else {
    initThemeToggle();
}