const mainAbout = document.querySelector('.main_about');

if (mainAbout) {
    let scrollPerSlide = 400;
    const mainAboutWrapper = mainAbout.querySelector('.main_about__wrapper');
    const mainAboutTextSliderSlides = mainAbout.querySelectorAll('.main_about__text_slider_slide');

    mainAboutTextSliderSlides.forEach((slide, index) => {
       const mobNum = slide.querySelector('.main_about__text_slider_mob_num');
       mobNum.textContent = ++index;
    });

    let mainAboutTextSliderInstance;

    const mainAboutImgSliderInstance = new Swiper('.main_about__img_slider', {
        slidesPerView: 1,
        spaceBetween: 160,
        centerMode: true,
        allowTouchMove: false,
        breakpoints: {
            1400: {
                slidesPerView: 1,
                spaceBetween: 280,
                centerMode: true,
                allowTouchMove: false,
            }
        }
    });
    if (window.innerWidth > 1024) {
        mainAboutTextSliderInstance = new Swiper('.main_about__text_slider', {
            slidesPerView: 1,
            direction: 'vertical',
            allowTouchMove: false,
            pagination: {
                el: ".main_about__text_slider_pagination",
                type: 'bullets',
                clickable: false,
            },
        });
        mainAbout.style.height = `${mainAboutWrapper.offsetHeight + (mainAboutTextSliderSlides.length + 1) * scrollPerSlide}px`;
    } else {
        mainAboutTextSliderInstance = new Swiper('.main_about__text_slider', {
            slidesPerView: 1,
            direction: 'horizontal',
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            pagination: {
                el: ".main_about__text_slider_pagination",
                type: 'bullets',
                clickable: true,
            },
        });
    }
    mainAboutTextSliderInstance.controller.control = mainAboutImgSliderInstance;

    let startAboutSliderPoint = mainAbout.getBoundingClientRect().top + window.pageYOffset + scrollPerSlide;
    let endAboutSliderPoint = mainAbout.getBoundingClientRect().top + window.pageYOffset + mainAbout.offsetHeight - mainAboutWrapper.offsetHeight;
    let aboutSliderScrollDiapason = endAboutSliderPoint - startAboutSliderPoint - scrollPerSlide;
    let aboutSliderChangePoints = [];

    for (let i = 0; i < mainAboutTextSliderSlides.length; i++) {
        aboutSliderChangePoints.push(aboutSliderScrollDiapason / (mainAboutTextSliderSlides.length - 1) * i + startAboutSliderPoint);
    }
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 1024 && window.pageYOffset > startAboutSliderPoint && window.pageYOffset < endAboutSliderPoint) {
            for (let i = 0; i < aboutSliderChangePoints.length; i++) {
                if (aboutSliderChangePoints[i + 1]) {
                    if (window.pageYOffset >= aboutSliderChangePoints[i] && window.pageYOffset < aboutSliderChangePoints[i + 1]) {
                        mainAboutTextSliderInstance.slideTo(i);
                    }
                } else {
                    if (window.pageYOffset >= aboutSliderChangePoints[i] && window.pageYOffset < endAboutSliderPoint) {
                        mainAboutTextSliderInstance.slideTo(i);
                    }
                }
            }
        }
    });


    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1400) {
            mainAboutImgSliderInstance.update();
            mainAboutTextSliderInstance.update();
        }
        if (window.innerWidth < 1400 && window.innerWidth > 1024) {
            mainAboutImgSliderInstance.update();
            mainAboutTextSliderInstance.update();
        }
        if (window.innerWidth > 1024) {
            startAboutSliderPoint = mainAbout.getBoundingClientRect().top + window.pageYOffset + scrollPerSlide;
            endAboutSliderPoint = mainAbout.getBoundingClientRect().top + window.pageYOffset + mainAbout.offsetHeight - mainAboutWrapper.offsetHeight;
            aboutSliderScrollDiapason = endAboutSliderPoint - startAboutSliderPoint - scrollPerSlide;
            aboutSliderChangePoints = [];

            for (let i = 0; i < mainAboutTextSliderSlides.length; i++) {
                aboutSliderChangePoints.push(aboutSliderScrollDiapason / (mainAboutTextSliderSlides.length - 1) * i + startAboutSliderPoint);
            }
        } else {
            mainAboutTextSliderInstance.update();
            mainAbout.style.height = `auto`;
        }
    });
}