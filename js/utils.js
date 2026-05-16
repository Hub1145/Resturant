export function initTheme() {
    const html = document.documentElement;

    // Apply saved preference (or default to dark)
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        html.classList.remove('dark');
    } else {
        html.classList.add('dark');
    }

    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    _updateIcon(toggle, html.classList.contains('dark'));

    toggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        _updateIcon(toggle, isDark);
    });
}

function _updateIcon(btn, isDark) {
    btn.innerHTML = isDark
        ? `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-width="2"
               d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707
                  m12.728 0-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/>
           </svg>`
        : `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-width="2"
               d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9.003
                  9.003 0 0 0 8.354-5.646z"/>
           </svg>`;
}
