history.scrollRestoration = "manual";
window.addEventListener("DOMContentLoaded", function () {
    window.scrollTo(0, 0);
});

window.addEventListener("load", function () {
    window.scrollTo(0, 0);
});

const video1 = document.getElementById("projectVideo1");
const video2 = document.getElementById("projectVideo2");
const video3 = document.getElementById("projectVideo3");

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
const videoList = [video1, video2, video3];
videoList.forEach(function (video) {
    if (video) {
        video.addEventListener("mouseover", function () {
            video.play();
            if (hoverSign) hoverSign.classList.add("active");
        });
        video.addEventListener("mouseout", function () {
            video.pause();
            if (hoverSign) hoverSign.classList.remove("active");
        });
    }
});

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
function initProjectsSection() {
    console.log('Initializing Projects Section...');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    console.log('Found', filterButtons.length, 'filter buttons');
    console.log('Found', projectCards.length, 'project cards');
    projectCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.transition = 'all 0.3s ease';
    });
    filterButtons.forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });
    const freshButtons = document.querySelectorAll('.filter-btn');
    freshButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Filter clicked:', this.textContent);
            const filterValue = this.getAttribute('data-filter');
            freshButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    void card.offsetWidth;
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
        button.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.95)';
        });
        button.addEventListener('touchend', function () {
            this.style.transform = 'scale(1)';
        });
    });
    const stats = document.querySelector('.project-stats');
    if (stats) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = document.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        if (text.includes('+')) {
                            const finalValue = parseInt(text.replace('+', ''));
                            let current = 0;
                            const increment = finalValue / 20;
                            const counter = setInterval(() => {
                                current += increment;
                                if (current >= finalValue) {
                                    stat.textContent = finalValue + '+';
                                    clearInterval(counter);
                                } else {
                                    stat.textContent = Math.floor(current);
                                }
                            }, 50);
                        }
                    });
                    observer.unobserve(stats);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(stats);
    }
    if (window.innerWidth <= 768) {
        document.body.style.overflowX = 'hidden';
        projectCards.forEach(card => {
            card.classList.add('mobile-touch');
        });
        setTimeout(() => {
            projectCards.forEach(card => {
                card.style.width = '100%';
                card.style.maxWidth = '100%';
                card.style.margin = '0 auto';
            });
        }, 100);
    }
}
document.addEventListener('DOMContentLoaded', initProjectsSection);
let resizeTimeout;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.project-card').forEach(card => {
                card.style.width = '100%';
                card.style.maxWidth = '100%';
            });
        }
    }, 250);
});
window.addEventListener('load', function () {
    if (window.innerWidth <= 768) {
        const filters = document.querySelector('.project-filters');
        if (filters) {
            filters.style.gap = '8px';
            filters.style.padding = '0 5px';
        }
        const grid = document.querySelector('.projects-grid');
        if (grid) {
            grid.style.gap = '15px';
            grid.style.padding = '0';
        }
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'none';
            card.style.display = 'block';
        });
    }
    initProjectsSection();
});
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    function initProjectCards() {
        projectCards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.classList.add('visible');
        });
    }
    filterButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const filterValue = this.getAttribute('data-filter');
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.opacity = '0.7';
            });
            this.classList.add('active');
            this.style.opacity = '1';
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else if (category === filterValue) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            if (window.innerWidth > 768) {
                const icon = this.querySelector('.project-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.2)';
                }
            }
        });
        card.addEventListener('mouseleave', function () {
            if (window.innerWidth > 768) {
                const icon = this.querySelector('.project-icon');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                }
            }
        });
        card.addEventListener('touchstart', function () {
            if (window.innerWidth <= 768) {
                this.style.transform = 'scale(0.98)';
            }
        });
        card.addEventListener('touchend', function () {
            if (window.innerWidth <= 768) {
                this.style.transform = 'scale(1)';
            }
        });
    });
    function animateStats() {
        const stats = document.querySelector('.project-stats');
        if (!stats) return;

        const statNumbers = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        if (!text.includes('+')) return;
                        const finalValue = text.replace('+', '');
                        stat.textContent = '0';
                        let current = 0;
                        const increment = parseInt(finalValue) / 30;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= parseInt(finalValue)) {
                                stat.textContent = finalValue + '+';
                                clearInterval(timer);
                            } else {
                                stat.textContent = Math.floor(current);
                            }
                        }, 50);
                    });
                    observer.unobserve(stats);
                }
            });
        }, {
            threshold: 0.3
        });
        observer.observe(stats);
    }
    initProjectCards();
    animateStats();
    const projectLinks = document.querySelectorAll('a[href="#projects"]');
    projectLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                // Close sidebar if open on mobile
                const sideBar = document.querySelector('.sidebar');
                if (sideBar && sideBar.classList.contains('open-sidebar')) {
                    sideBar.classList.remove('open-sidebar');
                    sideBar.classList.add('close-sidebar');
                }
                projectsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
window.addEventListener('load', function () {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.add('visible');
        });
    }
});
// Section Project End

// Section Skills Start

// Section Skills End
