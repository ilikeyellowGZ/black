document.addEventListener('DOMContentLoaded', () => {
    const navbarElement = document.querySelector('.navigation');

    function smoothScrollToHash(hash) {
        if (!hash || hash === '#') return;
        const targetElement = document.querySelector(hash);
        if (!targetElement) return;
        const navbarOffset = navbarElement ? navbarElement.offsetHeight : 0;
        const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const scrollTop = Math.max(elementTop - navbarOffset, 0);
        window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }

    // Intercept in-page anchor clicks for smooth scrolling
    document.body.addEventListener('click', (event) => {
        const anchor = event.target.closest('a[href^="#"]');
        if (!anchor) return;
        const hash = anchor.getAttribute('href');
        if (!hash) return;
        const targetExists = document.querySelector(hash);
        if (!targetExists) return; // let default occur for non-existing targets
        event.preventDefault();
        smoothScrollToHash(hash);
    });

    // Buttons that should scroll to sections
    const seeHowButton = document.querySelector('.see-how-button');
    if (seeHowButton) {
        seeHowButton.addEventListener('click', () => smoothScrollToHash('#work'));
    }

    const navContactButton = document.querySelector('.contact-button');
    if (navContactButton) {
        navContactButton.addEventListener('click', () => smoothScrollToHash('#contact'));
    }

    const outlineContactButton = document.querySelector('.contact-outline-button');
    if (outlineContactButton) {
        outlineContactButton.addEventListener('click', () => smoothScrollToHash('#contact'));
    }

    const ctaContactButton = document.querySelector('.cta-button');
    if (ctaContactButton) {
        ctaContactButton.addEventListener('click', () => smoothScrollToHash('#contact'));
    }

    // Category filtering
    const filterButtons = Array.from(document.querySelectorAll('.filter-button'));
    const projectCards = Array.from(document.querySelectorAll('.project-card'));

    function applyFilter(category) {
        projectCards.forEach((card) => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = cardCategory === category;
            card.classList.toggle('hidden', !shouldShow);
        });
    }

    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const selectedCategory = button.getAttribute('data-filter');
                filterButtons.forEach((b) => b.classList.remove('active'));
                button.classList.add('active');
                applyFilter(selectedCategory);
            });
        });

        // Initialize with the active button's category
        const initiallyActive = document.querySelector('.filter-button.active');
        if (initiallyActive) {
            applyFilter(initiallyActive.getAttribute('data-filter'));
        }
    }
});