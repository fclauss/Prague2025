// prague-main.js
document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // Mobile Menu Toggle
    // ====================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // ====================
    // Countdown Timer
    // ====================
    function updateCountdown() {
        // Set your event date here (year, month-1, day, hour, min)
        const eventDate = new Date(2025, 4, 23, 13, 0, 0); // 23 May 2025, 13:00
        const now = new Date();
        const diff = eventDate - now;

        if (diff <= 0) {
            document.getElementById('countdown').innerHTML = "<span class='text-xl'>C'est parti !</span>";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    if (document.getElementById('countdown')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ====================
    // Gallery Tabs
    // ====================
    const tabs = document.querySelectorAll('.gallery-tab');
    const galleryContents = document.querySelectorAll('.gallery-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all gallery contents
            galleryContents.forEach(content => content.classList.add('hidden'));
            
            // Show corresponding gallery content
            const day = tab.getAttribute('data-day');
            const activeContent = document.querySelector(`.gallery-content[data-day="${day}"]`);
            if (activeContent) {
                activeContent.classList.remove('hidden');
            }
        });
    });

    // ====================
    // Smooth Scrolling for Anchor Links
    // ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // ====================
    // Animate on Scroll Effect (simple version)
    // ====================
    const animateElements = document.querySelectorAll('.card, .timeline-point');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-fade-in');
            }
        });
    }
    
    // Add initial fade-in animation class
    document.querySelectorAll('.animate-fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Check on initial load
});
