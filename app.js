const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

// Sidebar
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

let lastScrollTop = 0;
let scrollThreshold = 500; 
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (window.innerWidth > 700) { 
        if (scrollTop > lastScrollTop) {
            header.classList.add('header-hidden');
        } else if (lastScrollTop - scrollTop > scrollThreshold) {
            header.classList.remove('header-hidden');
        }
    } else {
        header.classList.remove('header-hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});



function adjustFooter() {
    const footerConnect = document.querySelector('.footer-connect');
    const footerBottom = document.querySelector('.footer-bottom');
    const footer = document.querySelector('.footer');

    if (window.innerWidth <= 768) {
        if (!footerConnect.parentNode.contains(footerBottom)) {
            footerConnect.insertAdjacentElement('afterend', footerBottom);
        }
    } else {
        if (footer.contains(footerBottom) && footerBottom.parentNode !== footer) {
            footer.appendChild(footerBottom);
        }
    }
}

adjustFooter();

window.addEventListener('resize', adjustFooter);
