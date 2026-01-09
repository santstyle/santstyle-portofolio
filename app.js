const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

// Sidebar elements //
document.addEventListener('DOMContentLoaded', function() {
    const sideBar = document.querySelector('.sidebar');
    const menu = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');

    menu.addEventListener("click", function(){
        sideBar.classList.remove("close-sidebar")
        sideBar.classList.add("open-sidebar")
    });

    closeIcon.addEventListener("click", function(){
        sideBar.classList.remove("open-sidebar");
        sideBar.classList.add("close-sidebar");
    });

    // Close sidebar when clicking outside
    document.addEventListener("click", function(event){
        if (!sideBar.contains(event.target) && !menu.contains(event.target) && sideBar.classList.contains("open-sidebar")) {
            sideBar.classList.remove("open-sidebar");
            sideBar.classList.add("close-sidebar");
        }
    });
});

const hoverSign = document.querySelector('.hover-sign');

const videoList =[video1, video2, video3];

videoList.forEach (function(video){
    video.addEventListener("mouseover", function(){
        video.play()
        hoverSign.classList.add("active")
    })
    video.addEventListener("mouseout", function(){
    video.pause();
    hoverSign.classList.remove("active")
})
})

// Sticky header on scroll up with threshold
let lastScrollTop = 0;
let scrollThreshold = 500; // Minimum scroll up distance to show header
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (window.innerWidth > 700) { // Only hide header on desktop
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.classList.add('header-hidden');
        } else if (lastScrollTop - scrollTop > scrollThreshold) {
            // Scrolling up more than threshold
            header.classList.remove('header-hidden');
        }
    } else {
        // On mobile, ensure header is always visible
        header.classList.remove('header-hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});



// Move footer-bottom after footer-connect on mobile
function adjustFooter() {
    const footerConnect = document.querySelector('.footer-connect');
    const footerBottom = document.querySelector('.footer-bottom');
    const footer = document.querySelector('.footer');

    if (window.innerWidth <= 768) {
        // Move footer-bottom after footer-connect inside footer-content
        if (!footerConnect.parentNode.contains(footerBottom)) {
            footerConnect.insertAdjacentElement('afterend', footerBottom);
        }
    } else {
        // Move back to original position if not mobile
        if (footer.contains(footerBottom) && footerBottom.parentNode !== footer) {
            footer.appendChild(footerBottom);
        }
    }
}

// Initial adjustment
adjustFooter();

// Adjust on resize
window.addEventListener('resize', adjustFooter);

// About Section Start
// Animasi scroll untuk cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    // Fungsi untuk mengecek apakah elemen terlihat di viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight * 0.85) &&
            rect.bottom >= (window.innerHeight * 0.15)
        );
    }
    
    // Fungsi untuk menampilkan card dengan animasi berurutan
    function showCardsOnScroll() {
        cards.forEach((card, index) => {
            if (isElementInViewport(card)) {
                // Delay animasi untuk setiap card agar muncul berurutan
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 150); // Delay 150ms untuk setiap card
            }
        });
    }
    

});
// About Section End

// Section Project Start
// Projects Section Animation & Filter
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Animasi muncul saat scroll
    function animateProjectsOnScroll() {
        projectCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.85) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 150);
            }
        });
    }
    
    // Filter projects berdasarkan kategori
    function filterProjects(category) {
        projectCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Setup filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter projects
            const filter = this.dataset.filter;
            filterProjects(filter);
        });
    });
    
    // Animate projects on load
    animateProjectsOnScroll();
    
    // Animate on scroll
    window.addEventListener('scroll', animateProjectsOnScroll);
    
    // Add hover effects to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.project-badge');
            if (badge) {
                badge.style.transform = 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.project-badge');
            if (badge) {
                badge.style.transform = 'translateY(0)';
            }
        });
    });
});
// Section Project End
