const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

// Sidebar elements //
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon')


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

// Sidebar elements //
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

// Sticky header on scroll up with threshold
let lastScrollTop = 0;
let scrollThreshold = 500; // Minimum scroll up distance to show header
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.classList.add('header-hidden');
    } else if (lastScrollTop - scrollTop > scrollThreshold) {
        // Scrolling up more than threshold
        header.classList.remove('header-hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

// Scroll down functionality //
const scrollDown = document.querySelector('.scroll-down');
const infoSection = document.querySelector('.info-section');

scrollDown.addEventListener("click", function(){
    infoSection.scrollIntoView({ behavior: 'smooth' });
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
    
    // Jalankan saat halaman dimuat
    showCardsOnScroll();
    
    // Jalankan saat scroll
    window.addEventListener('scroll', showCardsOnScroll);
    
    // Tambahkan efek hover yang lebih dinamis
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-header i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.color = '#fff';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-header i');
            if (icon) {
                icon.style.transform = 'scale(1)';
                icon.style.color = '#c084fc';
            }
        });
    });
});
// About Section End
