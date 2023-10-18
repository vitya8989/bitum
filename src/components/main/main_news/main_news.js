const pressBlockSlider = document.querySelector('.main_news__slider');

if (pressBlockSlider) {
    new Swiper(pressBlockSlider, {
        speed: 400,
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            nextEl: `.main_news__slider_next`,
            prevEl: `.main_news__slider_prev`,
        },
        breakpoints: {
            1024: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 60,
            }
        }
    });
}