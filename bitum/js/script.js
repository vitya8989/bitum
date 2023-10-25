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
};
const header = document.querySelector('.header');

if (header) {
    let scrollPos = 0;
    const openSecondMenuLink = header.querySelector('.js_open_second_menu');
    const secondMenu = header.querySelector('.js_second_menu');

    openSecondMenuLink.addEventListener('click', () => {
        secondMenu.classList.toggle('show');
        openSecondMenuLink.classList.toggle('active');

        if (window.innerWidth <= 1023) {
            if (secondMenu.classList.contains('show')) {
                secondMenu.style.maxHeight = `${secondMenu.scrollHeight}px`;
            } else {
                secondMenu.style.maxHeight = '';
            }
        }
    });
    document.addEventListener('click', (e) => {
        if (window.innerWidth > 1023) {
            if (!e.target.closest('.js_open_second_menu') && !e.target.closest('.js_second_menu')) {
                secondMenu.classList.remove('show');
                openSecondMenuLink.classList.remove('active');
            }
        }
    });

    if (document.querySelector('.wrapper.this--main')) {
        document.addEventListener('slider-hide', () => {
            setTimeout(() => {
                window.addEventListener('scroll', toggleHeader);
            }, 500);
        });
        document.addEventListener('slider-show', () => {
            window.removeEventListener('scroll', toggleHeader);
        });
    } else if (document.querySelector('.wrapper.orange_header')) {
        window.addEventListener('scroll', toggleHeader);
        if (window.pageYOffset > 0) {
            header.classList.remove('this--transparent')
        } else {
            header.classList.add('this--transparent');
        }
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 0) {
                header.classList.remove('this--transparent')
            } else {
                header.classList.add('this--transparent')
            }
        });
    } else {
        window.addEventListener('scroll', toggleHeader);
    }


    function toggleHeader () {
        if (scrollPos > window.pageYOffset) {
            header.classList.remove('small');
        } else {
            header.classList.add('small');
        }
        scrollPos = window.pageYOffset;
    }

    const headerTopLinks = header.querySelector('.header__top_links');
    const headerTopLinksGroup = header.querySelector('.header__top_links_group');
    const headerMenu = header.querySelector('.header__menu');

    if (window.innerWidth <= 1023) {
        headerMenu.append(headerTopLinksGroup);
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1023) {
            headerMenu.append(headerTopLinksGroup);
        } else {
            headerTopLinks.append(headerTopLinksGroup);
        }
    });

    const burger = header.querySelector('.header__burger');
    const headerMenuClose = header.querySelector('.header__menu_close');

    burger.addEventListener('click', () => {
        headerMenu.classList.add('show');
        document.body.classList.add('this--overflow');
    });

    headerMenuClose.addEventListener('click', () => {
        headerMenu.classList.remove('show');
        document.body.classList.remove('this--overflow');

        if (window.innerWidth <= 1023) {
            setTimeout(() => {
                secondMenu.classList.remove('show');
                openSecondMenuLink.classList.remove('active');
                secondMenu.style.maxHeight = '';
            }, 300);
        }
    });

};
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
;
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
};
const mainProducts = document.querySelector('.main_products');

if (mainProducts) {
    let scrollPerSlide = 400;
    const mainProductsWrapper = mainProducts.querySelector('.main_products__wrapper');
    const mainProductsImgSliderSlides = mainProducts.querySelectorAll('.main_products__img_slide');
    let mainProductsImgSliderInstance;
    if (window.innerWidth > 1024) {
        mainProductsImgSliderInstance = new Swiper('.main_products__img_slider', {
            slidesPerView: 1,
            spaceBetween: 160,
            centerMode: true,
            allowTouchMove: false,
            pagination: {
                el: ".main_products__slider_pagination",
                type: 'bullets',
                clickable: false,
            },
            breakpoints: {
                1400: {
                    slidesPerView: 1,
                    spaceBetween: 280,
                    centerMode: true,
                    allowTouchMove: false,
                }
            }
        });
    } else {
        mainProductsImgSliderInstance = new Swiper('.main_products__img_slider', {
            slidesPerView: 1,
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            allowTouchMove: false,
        });
    }

    if (window.innerWidth > 1024) {
        mainProducts.style.height = `${mainProductsWrapper.offsetHeight + (mainProductsImgSliderSlides.length + 1) * scrollPerSlide}px`;
    }

    const productsAccordions = mainProducts.querySelectorAll('.js_product_accordion');

    productsAccordions.forEach((accordion) => {
       const accordionHead = accordion.querySelector('.js_product_accordion_head');

        accordionHead.addEventListener('click', function () {
            this.classList.toggle('open');
            mainProductsImgSliderInstance.slideTo(accordion.dataset.accordion);
            if (this.classList.contains('open')) {
                this.nextElementSibling.style.maxHeight = `${this.nextElementSibling.scrollHeight}px`;
            } else {
                this.nextElementSibling.style.maxHeight = '';
            }
            productsAccordions.forEach((accordion) => {
                const accordionHead = accordion.querySelector('.js_product_accordion_head');
                if (accordionHead !== this) {
                    accordionHead.classList.remove('open');
                    accordionHead.nextElementSibling.style.maxHeight = '';
                }
            });
        });
    });

    let startProductsSliderPoint = mainProducts.getBoundingClientRect().top + window.pageYOffset + scrollPerSlide;
    let endProductsSliderPoint = mainProducts.getBoundingClientRect().top + window.pageYOffset + mainProducts.offsetHeight - mainProductsWrapper.offsetHeight;
    let productsSliderScrollDiapason = endProductsSliderPoint - startProductsSliderPoint - scrollPerSlide;
    let productsSliderChangePoints = [];

    for (let i = 0; i < mainProductsImgSliderSlides.length; i++) {
        productsSliderChangePoints.push(productsSliderScrollDiapason / (mainProductsImgSliderSlides.length - 1) * i + startProductsSliderPoint);
    }
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 1024 && window.pageYOffset < startProductsSliderPoint) {
            productsAccordions.forEach((accordion) => {
                const accordionHead = accordion.querySelector('.js_product_accordion_head');
                accordionHead.classList.remove('open');
                accordionHead.nextElementSibling.style.maxHeight = '';
            });
        }
        if (window.innerWidth > 1024 && window.pageYOffset > startProductsSliderPoint && window.pageYOffset < endProductsSliderPoint) {
            for (let i = 0; i < productsSliderChangePoints.length; i++) {
                if (productsSliderChangePoints[i + 1]) {
                    if (window.pageYOffset >= productsSliderChangePoints[i] && window.pageYOffset < productsSliderChangePoints[i + 1]) {
                        productsAccordions.forEach((accordion) => {
                           if (+accordion.dataset.accordion === i) {
                               const accordionHead = accordion.querySelector('.js_product_accordion_head');
                               accordionHead.classList.add('open');
                               accordionHead.nextElementSibling.style.maxHeight = `${accordionHead.nextElementSibling.scrollHeight}px`;
                           } else {
                               const accordionHead = accordion.querySelector('.js_product_accordion_head');
                               accordionHead.classList.remove('open');
                               accordionHead.nextElementSibling.style.maxHeight = '';
                           }
                        });
                        mainProductsImgSliderInstance.slideTo(i);
                    }
                } else {
                    if (window.pageYOffset >= productsSliderChangePoints[i] && window.pageYOffset < endProductsSliderPoint) {
                        productsAccordions.forEach((accordion) => {
                            if (+accordion.dataset.accordion === i) {
                                const accordionHead = accordion.querySelector('.js_product_accordion_head');
                                accordionHead.classList.add('open');
                                accordionHead.nextElementSibling.style.maxHeight = `${accordionHead.nextElementSibling.scrollHeight}px`;
                            } else {
                                const accordionHead = accordion.querySelector('.js_product_accordion_head');
                                accordionHead.classList.remove('open');
                                accordionHead.nextElementSibling.style.maxHeight = '';
                            }
                        });
                        mainProductsImgSliderInstance.slideTo(i);
                    }
                }
            }
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1400) {
            mainProductsImgSliderInstance.update();
        }
        if (window.innerWidth < 1400 && window.innerWidth > 1024) {
            mainProductsImgSliderInstance.update();
        }
        if (window.innerWidth > 1024) {
            mainProducts.style.height = `${mainProductsWrapper.offsetHeight + (mainProductsImgSliderSlides.length + 1) * scrollPerSlide}px`;

            startProductsSliderPoint = mainProducts.getBoundingClientRect().top + window.pageYOffset + scrollPerSlide;
            endProductsSliderPoint = mainProducts.getBoundingClientRect().top + window.pageYOffset + mainProducts.offsetHeight - mainProductsWrapper.offsetHeight;
            productsSliderScrollDiapason = endProductsSliderPoint - startProductsSliderPoint - scrollPerSlide;
            productsSliderChangePoints = [];

            for (let i = 0; i < mainProductsImgSliderSlides.length; i++) {
                productsSliderChangePoints.push(productsSliderScrollDiapason / (mainProductsImgSliderSlides.length - 1) * i + startProductsSliderPoint);
            }
        } else {
            productsAccordions.forEach((accordion) => {
                const accordionHead = accordion.querySelector('.js_product_accordion_head');
                accordionHead.classList.remove('open');
                accordionHead.nextElementSibling.style.maxHeight = '';
            });
            mainProducts.style.height = `auto`;
        }
    });


};
const mainFactory = document.querySelector('.main_factory');

if (mainFactory) {
    const mainFactoryWrapper = mainFactory.querySelector('.main_factory__wrapper');
    const mainFactoryImg = mainFactory.querySelector('.js_factory_img');
    const mainFactoryRight = mainFactory.querySelector('.main_factory__right');
    window.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth > 1024) {
            mainFactory.style.height = `${mainFactoryImg.scrollHeight}px`;
        } else {
            mainFactory.style.height = `${mainFactoryWrapper.offsetHeight + mainFactoryImg.scrollHeight - mainFactoryRight.offsetHeight + 20}px`;
        }

        let startFactorySliderPoint = mainFactory.getBoundingClientRect().top + window.pageYOffset;
        let endFactorySliderPoint = mainFactory.getBoundingClientRect().top + window.pageYOffset + mainFactory.offsetHeight - mainFactoryWrapper.offsetHeight;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > startFactorySliderPoint && window.pageYOffset < endFactorySliderPoint) {
                mainFactoryImg.style.top = `-${window.pageYOffset - startFactorySliderPoint}px`;
            }
        });
        window.addEventListener('resize', () => {
            startFactorySliderPoint = mainFactory.getBoundingClientRect().top + window.pageYOffset;
            endFactorySliderPoint = mainFactory.getBoundingClientRect().top + window.pageYOffset + mainFactory.offsetHeight - mainFactoryWrapper.offsetHeight;
            if (window.innerWidth > 1024) {
                mainFactory.style.height = `${mainFactoryImg.scrollHeight}px`;
            } else {
                mainFactory.style.height = `${mainFactoryWrapper.offsetHeight + mainFactoryImg.scrollHeight - mainFactoryRight.offsetHeight + 20}px`;
            }
        });
    });
};
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
};
const timeNode = document.querySelector('.js_footer_time');

if (timeNode) {
    let timeZone = new Date().getTimezoneOffset();

    function getCurrentTimeString(dots, correction) {
        let date = new Date();
        date.setMinutes(date.getMinutes() + timeZone + correction);
        return date.toTimeString().replace(/:[0-9]{2,2} .*/, '');
    }

    setInterval(function() {
            timeNode.innerHTML = getCurrentTimeString(Math.round(Date.now() / 1000) % 2, 300);
        }, 1000);
}

const footer = document.querySelector('.footer');

if (footer) {
    window.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('.trading-list')) {
            let id = setInterval(() => {
                if (document.querySelector('.trading-list').offsetHeight > 300) {
                    console.log(document.querySelector('.trading-list').offsetHeight)
                    clearInterval(id);
                    let startMove = footer.getBoundingClientRect().top + window.pageYOffset + footer.getBoundingClientRect().height / 2 - window.innerHeight;
                    window.addEventListener('scroll', () => {
                        if (window.pageYOffset >= startMove && window.innerWidth > 1023) {
                            footer.style.top = `${(window.pageYOffset - startMove) / 2}px`;
                        }
                    });
                    window.addEventListener('resize', () => {
                        startMove = footer.getBoundingClientRect().top + window.pageYOffset + footer.getBoundingClientRect().height / 2 - window.innerHeight;
                    });
                }
            }, 700);
        } else {
            setTimeout(() => {
                let startMove = footer.getBoundingClientRect().top + window.pageYOffset + footer.getBoundingClientRect().height / 2 - window.innerHeight;
                window.addEventListener('scroll', () => {
                    if (window.pageYOffset >= startMove && window.innerWidth > 1023) {
                        footer.style.top = `${(window.pageYOffset - startMove) / 2}px`;
                    }
                });
                window.addEventListener('resize', () => {
                    startMove = footer.getBoundingClientRect().top + window.pageYOffset + footer.getBoundingClientRect().height / 2 - window.innerHeight;
                });
            }, 500);
        }
    });
};
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
};
const onlyRus = document.querySelectorAll('.js_only_rus');
const onlyEng = document.querySelectorAll('.js_only_eng');

if (onlyRus.length > 0) {
    for (let i = 0; i < onlyRus.length; i++) {
        onlyRus[i].addEventListener('input', function () {
            this.value = this.value.replace(/[\w]/g, '');
        });
    }
}
if (onlyEng.length > 0) {
    for (let i = 0; i < onlyEng.length; i++) {
        onlyEng[i].addEventListener('input', function () {
            this.value = this.value.replace(/[а-яА-ЯёЁ]/g, '');
        });
    }
}

if (document.querySelector('.js_tel_mask')) {
    $('.js_tel_mask').inputmask({
        mask: '+7 (999) 999-9999',
        showMaskOnHover: false
    });
}

const vacanciesDetailForm = document.querySelector('.js_vacancies_detail_form');

if (vacanciesDetailForm) {
    const vacanciesDetailFormReqInputs = vacanciesDetailForm.querySelectorAll('.js_required_input');

    vacanciesDetailFormReqInputs.forEach((input) => {
        input.addEventListener('focus', () => {
            if (input.classList.contains('error')) {
                input.classList.remove('error');
            }
        });
    });

    const vacanciesDetailFormFile = vacanciesDetailForm.querySelector('.js_vacancies_detail_form_file');
    const vacanciesDetailFormFileClear = vacanciesDetailForm.querySelector('.js_vacancies_detail_form_file_clear');
    vacanciesDetailFormFile.addEventListener('change', () => {
        vacanciesDetailFormFile.nextElementSibling.classList.add('active');
        vacanciesDetailFormFile.nextElementSibling.textContent = `файл: ${vacanciesDetailFormFile.files[0].name}`
        vacanciesDetailFormFileClear.classList.add('show');
    });

    vacanciesDetailFormFileClear.addEventListener('click', (e) => {
        e.stopPropagation();
        vacanciesDetailFormFile.value = '';
        vacanciesDetailFormFile.nextElementSibling.classList.remove('active');
        vacanciesDetailFormFileClear.classList.remove('show');
        vacanciesDetailFormFile.nextElementSibling.innerHTML = `<svg width="29" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.3842 19.1925V9.88477M15.3842 9.88477L17.9226 12.0002M15.3842 9.88477L12.8457 12.0002" stroke="#A5A5A5"/>
                            <path d="M20.4615 19.1923H24.0577C26.5111 19.1923 28.5 17.2034 28.5 14.75V14.75C28.5 12.2966 26.5111 10.3077 24.0577 10.3077H23V8.61539C23 4.40953 19.5905 1 15.3846 1H14.5385C10.7999 1 7.76923 4.03069 7.76923 7.76923V7.76923H6.71154C3.55714 7.76923 1 10.3264 1 13.4808V13.4808C1 16.6352 3.55714 19.1923 6.71154 19.1923H10.7308" stroke="#A5A5A5"/>
                        </svg>

                            прикрепите резюме <br>(формат: pdf , макс. размер: 2 Гб)`
    });

    vacanciesDetailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateForm(vacanciesDetailForm)) {
            return;
        }
        // Отправка формы
            //
        vacanciesDetailForm.reset();
    });

    function validateForm (form) {
        let valid = true;
        const validateInputs = form.querySelectorAll('.js_required_input');

        validateInputs.forEach((input) => {
            if (input.value === '') {
                valid = false;
                input.classList.add('error');
            }
            if (input.classList.contains('js_tel_mask') && input.value.indexOf('_') !== -1) {
                valid = false;
                input.classList.add('error');
            }
        });

        return valid;
    }
};
const contactsMap = document.querySelector('.js_contacts_map');

if (contactsMap) {
    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("map", {
                center: [53.436317, 55.876828],
                zoom: 17,
                controls: [],
            }),

        myPlacemark = new ymaps.Placemark([53.436317, 55.876828], {}, {
            iconLayout: 'default#image',
            iconImageHref: '../img/contacts/blue_map_point.svg',
            iconImageSize: [32, 47],
            iconImageOffset: [-16, -47]
        });

        myMap.geoObjects.add(myPlacemark);

        myPlacemark = new ymaps.Placemark([ 53.436907, 55.877862], {}, {
            iconLayout: 'default#image',
            iconImageHref: '../img/contacts/yellow_map_point.svg',
            iconImageSize: [31, 46],
            iconImageOffset: [-16, -47]
        })

        myMap.geoObjects.add(myPlacemark);

        myPlacemark = new ymaps.Placemark([ 53.436497, 55.877090], {}, {
            iconLayout: 'default#image',
            iconImageHref: '../img/contacts/green_map_point.svg',
            iconImageSize: [31, 46],
            iconImageOffset: [-16, -47]
        })

        myMap.geoObjects.add(myPlacemark);

        myMap.controls.add(new ymaps.control.ZoomControl({options: { position: { right: 30, top: 60 }}}));
    };
};
const tenderSearchInput = document.querySelector('.js_tender_search_input');
const tenderSearchClear = document.querySelector('.jc_tender_search_clear');

if (tenderSearchInput && tenderSearchClear) {
    tenderSearchInput.addEventListener('input', () => {
        if (tenderSearchInput.value !== '') {
            tenderSearchClear.classList.add('show');
        } else {
            tenderSearchClear.classList.remove('show');
        }
    });
    tenderSearchClear.addEventListener('click', () => {
        tenderSearchInput.value = '';
        tenderSearchClear.classList.remove('show');
    });
}

if (document.querySelector('.trading-list')) {
    $( document ).ready(function() {
        $(".trading-list").tradingList({
            "domainUrl": "http://www.tender.pro",
            "autoLoad": true,
            "holding": false,
            "transparent": false,
            "params": {
                "set_type_id": "1",
                "types": "1, 5, 2, 4, 6, 3, 8, 7, 9",
                "max_rows": "30",
                "_key": "7b56c77b9f70220c3d5d4ce6477674ea",
                "set_id": "381087"
            }
        });
    });
}

;
