document.addEventListener('DOMContentLoaded', () => {
    // Defines
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');

    // Mobile Menu Toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            // Only toggle the translation class for slide mechanism
            mobileMenu.classList.toggle('-translate-x-full');
            // Animate hamburger icon if needed
        });
    }

    // Theme Toggle
    // Check local storage
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        });
    });

    // Scroll Animation Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });

    // Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        let isActive = false;

        // Check if href matches current path (handling internal page jumps too if needed, but simple match is fine here)
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            isActive = true;
        }

        // Check if any child link in the dropdown (if exists) matches active path
        // Structure: div.group > a.nav-link + div.absolute > ... a
        const parentGroup = link.closest('.group');
        if (parentGroup) {
            const dropdownLinks = parentGroup.querySelectorAll('a');
            dropdownLinks.forEach(dropLink => {
                const dropHref = dropLink.getAttribute('href');
                if (dropHref === currentPath) {
                    isActive = true;
                }
            });
        }

        if (isActive) {
            // Add active styles (using Tailwind utility classes that mimic the original active state)
            link.classList.add('text-accent', 'relative', 'after:content-[\'\']', 'after:absolute', 'after:bottom-[-4px]', 'after:left-0', 'after:w-full', 'after:h-0.5', 'after:bg-accent');
            link.classList.remove('hover:text-accent', 'text-gray-500'); // Remove potential inactive headers
        }
    });
});
