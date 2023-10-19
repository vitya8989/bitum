const aboutTop = document.querySelector('.about_top');

if (aboutTop) {
   const dateSlider = new Swiper('.date_slider', {
        effect: 'fade',
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        autoHeight: true,
        fadeEffect: {
            crossFade: true,
        },
        pagination: {
            el: '.date_slider__pagination',
            clickable: true
        }

    });

    dateSlider.slideTo(dateSlider.slides.length - 1, 0);
    setTimeout(() => {
        dateSlider.slideTo(0, 0);
        dateSlider.update();
    }, 10);

    const teamCardSlider = new Swiper('.team_card__slider', {
        spaceBetween: 13,
        slidesPerView: 'auto',
    });
}