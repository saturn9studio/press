// ROT13 decoder for email obfuscation
function rot13(str) {
    return str.replace(/[a-zA-Z]/g, function(c) {
        return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
}

// Decode and set email link on page load
document.addEventListener('DOMContentLoaded', function() {
    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        const encoded = 'iynqevf@bhgybbx.pbz';
        const decoded = rot13(encoded);
        emailLink.href = 'mailto:' + decoded;
    }
});

// Mark the nav item for the section the visitor jumped to
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.site-header nav a');

    function markCurrent() {
        const hash = location.hash || '#books';
        navLinks.forEach(function(link) {
            if (link.getAttribute('href') === hash) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    window.addEventListener('hashchange', markCurrent);
    markCurrent();
});

// Day/Night toggle. Follows the system until the visitor picks one.
document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;

    const root = document.documentElement;
    const systemNight = window.matchMedia('(prefers-color-scheme: dark)');

    function current() {
        return root.dataset.theme || (systemNight.matches ? 'night' : 'day');
    }

    function update() {
        const mode = current();
        button.dataset.mode = mode;
        button.setAttribute('aria-label', mode === 'night' ? 'Switch to light mode' : 'Switch to dark mode');
    }

    button.addEventListener('click', function() {
        const next = current() === 'night' ? 'day' : 'night';
        root.dataset.theme = next;
        try {
            localStorage.setItem('s9-theme', next);
        } catch (e) {}
        update();
    });

    systemNight.addEventListener('change', update);
    button.hidden = false;
    update();
});
