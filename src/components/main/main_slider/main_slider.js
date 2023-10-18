const mainSliderSection = document.querySelector('.main_slider');

if (mainSliderSection) {

    const mainSlider = mainSliderSection.querySelector('.js_main_slider');
    const mainSliderWrapper = mainSliderSection.querySelector('.main_slider__wrapper');

    new Swiper(mainSlider, {
        slidesPerView: 1,
        effect: 'fade',
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        fadeEffect: {
            crossFade: true,
        },
        pagination: {
            el: ".main_slider__pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return (`
                        <div class="${className}">
                            <div class="main_slider__pagination_inner">${index + 1}</div>
                        </div>`);
            },
        }
    });
    if (window.pageYOffset >= mainSliderSection.offsetHeight) {
        setTimeout(() => {
            mainSliderWrapper.classList.add('hide');
            let evt = document.createEvent('CustomEvent');
            evt.initCustomEvent('slider-hide', false, false, {});
            document.dispatchEvent(evt);
        }, 500);
    }
    window.addEventListener('scroll', () => {
        if (window.pageYOffset >= mainSliderSection.offsetHeight) {
            mainSliderWrapper.classList.add('hide');
            let evt = document.createEvent('CustomEvent');
            evt.initCustomEvent('slider-hide', false, false, {});
            document.dispatchEvent(evt);
        } else {
            mainSliderWrapper.classList.remove('hide');
            let evt = document.createEvent('CustomEvent');
            evt.initCustomEvent('slider-show', false, false, {});
            document.dispatchEvent(evt);
        }
    })

    const mainSliderArrowBtn = document.querySelector('.js_main_slider_arrow_btn');
    mainSliderArrowBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const scrollTarget = document.querySelector('.main');
        let topOffset = -1;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;
        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
}