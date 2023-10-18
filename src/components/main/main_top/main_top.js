const mainTopArrowBtn = document.querySelector('.js_main_top_arrow_btn');
if (mainTopArrowBtn) {
    mainTopArrowBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const scrollTarget = document.getElementById('main_video');
        let topOffset = 0;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;
        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
}
