/**
 * Simple HTML includes for static pages
 * Usage: <div data-include="shared/nav.html"></div>
 */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-include]').forEach(async (el) => {
        const file = el.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (response.ok) {
                el.outerHTML = await response.text();
            }
        } catch (e) {
            console.error(`Failed to include ${file}:`, e);
        }
    });
});
