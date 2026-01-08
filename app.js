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

})

// Scroll down functionality //
const scrollDown = document.querySelector('.scroll-down');
const infoSection = document.querySelector('.info-section');

scrollDown.addEventListener("click", function(){
    infoSection.scrollIntoView({ behavior: 'smooth' });
});

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
