history.scrollRestoration = "manual";
window.addEventListener("DOMContentLoaded", function () {
    window.scrollTo(0, 0);
});

window.addEventListener("load", function () {
    window.scrollTo(0, 0);
});

const video1 = document.getElementById("projectVideo1");
const video2 = document.getElementById("projectVideo2");

// Sidebar
document.addEventListener("DOMContentLoaded", function () {
    const sideBar = document.querySelector(".sidebar");
    const menu = document.querySelector(".menu-icon");
    const closeIcon = document.querySelector(".close-icon");

    menu.addEventListener("click", function () {
        sideBar.classList.remove("close-sidebar");
        sideBar.classList.add("open-sidebar");
    });
    closeIcon.addEventListener("click", function () {
        sideBar.classList.remove("open-sidebar");
        sideBar.classList.add("close-sidebar");
    });
    document.addEventListener("click", function (event) {
        if (
            !sideBar.contains(event.target) &&
            !menu.contains(event.target) &&
            sideBar.classList.contains("open-sidebar")
        ) {
            sideBar.classList.remove("open-sidebar");
            sideBar.classList.add("close-sidebar");
        }
    });
});

const hoverSign = document.querySelector(".hover-sign");
// Removed hover functionality for videos to allow autoplay

let lastScrollTop = 0;
let scrollThreshold = 500;
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (window.innerWidth > 700) {
        if (scrollTop > lastScrollTop) {
            header.classList.add("header-hidden");
        } else if (lastScrollTop - scrollTop > scrollThreshold) {
            header.classList.remove("header-hidden");
        }
    } else {
        header.classList.remove("header-hidden");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

window.addEventListener("load", function () {
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }
    window.scrollTo(0, 0);
});

const scrollDown = document.getElementById("scroll-down");

if (scrollDown) {
    console.log("Scroll down element found");
    scrollDown.addEventListener("click", function () {
        console.log("Scroll down button clicked");
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            console.log("About section found, scrolling to about section");
            aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            console.log("About section not found");
        }
    });
} else {
    console.log("Scroll down element not found");
}

function adjustFooter() {
    const footerConnect = document.querySelector(".footer-connect");
    const footerBottom = document.querySelector(".footer-bottom");
    const footer = document.querySelector(".footer");
    if (window.innerWidth <= 768) {
        if (!footerConnect.parentNode.contains(footerBottom)) {
            footerConnect.insertAdjacentElement("afterend", footerBottom);
        }
    } else {
        if (footer.contains(footerBottom) && footerBottom.parentNode !== footer) {
            footer.appendChild(footerBottom);
        }
    }
}

adjustFooter();
window.addEventListener("resize", adjustFooter);

// About Section Start
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight * 0.85 &&
            rect.bottom >= window.innerHeight * 0.15
        );
    }

    function showCardsOnScroll() {
        cards.forEach((card, index) => {
            if (isElementInViewport(card)) {
                setTimeout(() => {
                    card.classList.add("visible");
                }, index * 150);
            }
        });
    }
    showCardsOnScroll();
    window.addEventListener("scroll", showCardsOnScroll);
    cards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
            const icon = this.querySelector(".card-header i");
            if (icon) {
                icon.style.transform = "scale(1.2)";
            }
        });

        card.addEventListener("mouseleave", function () {
            const icon = this.querySelector(".card-header i");
            if (icon) {
                icon.style.transform = "scale(1)";
                icon.style.color = "#c084fc";
            }
        });
    });
});
// About Section End

// Project Section Start
// Simple and direct filter implementation
function initProjectFilters() {
    console.log('Initializing project filters...');

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('#projects .projects-list .project-card');

    console.log('Found', filterButtons.length, 'filter buttons');
    console.log('Found', projectCards.length, 'project cards');

    // Function to filter projects
    function filterProjects(filterValue) {
        console.log('Filtering by:', filterValue);

        // Update button states
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');

        // Filter cards
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });

        // Adjust grid for single project
        const visibleCards = Array.from(projectCards).filter(card => card.style.display === 'block');
        const projectsGrid = document.querySelector('.projects-grid');
        if (visibleCards.length === 1) {
            projectsGrid.classList.add('single-project');
        } else {
            projectsGrid.classList.remove('single-project');
        }
    }

    // Add events for both desktop and mobile
    filterButtons.forEach(button => {
        // Always add click event (works on both desktop and mobile)
        button.addEventListener('click', function(event) {
            const filterValue = this.getAttribute('data-filter');
            console.log('Filter button clicked:', filterValue);
            filterProjects.call(this, filterValue);
        });

        // Add touch events for mobile (prevent default to avoid double firing)
        if (window.innerWidth <= 768) {
            button.addEventListener('touchend', function(event) {
                event.preventDefault();
                const filterValue = this.getAttribute('data-filter');
                console.log('Filter button touched on mobile:', filterValue);
                filterProjects.call(this, filterValue);
            });
        }
    });

    // Set initial state - show all projects
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === 'all') {
            btn.classList.add('active');
        }
    });

    console.log('Project filters initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectFilters);
} else {
    initProjectFilters();
}
// Section Project End

// Section Skills Start
// ========== EXPERTISE SECTION ANIMATIONS ==========

document.addEventListener('DOMContentLoaded', function () {
    // Animate skill bars on scroll
    function animateSkillBars() {
        const skillCategories = document.querySelectorAll('.skill-category');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';

                        setTimeout(() => {
                            bar.style.width = width;
                        }, 300);
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillCategories.forEach(category => {
            observer.observe(category);
        });
    }

    // Animate counter for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                            if (counter.parentElement.classList.contains('stat-box')) {
                                counter.textContent = target + (target === 95 ? '%' : '+');
                            }
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Initialize animations
    animateSkillBars();
    animateCounters();

    // Add hover effects for skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function () {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });

        category.addEventListener('mouseleave', function () {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-10px) scale(1)';
            }
        });

        // Mobile touch feedback
        category.addEventListener('touchstart', function () {
            if (window.innerWidth <= 768) {
                this.style.transform = 'scale(0.98)';
            }
        });

        category.addEventListener('touchend', function () {
            if (window.innerWidth <= 768) {
                this.style.transform = 'scale(1)';
            }
        });
    });
});

// Re-animate on window resize for responsive
let resizeTimeout2;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout2);
    resizeTimeout2 = setTimeout(() => {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            bar.style.transition = 'none';
            setTimeout(() => {
                bar.style.transition = 'width 1.5s cubic-bezier(0.65, 0, 0.35, 1)';
            }, 50);
        });
    }, 250);
});
// Section Skills End
