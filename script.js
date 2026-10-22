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
