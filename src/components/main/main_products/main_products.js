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


}