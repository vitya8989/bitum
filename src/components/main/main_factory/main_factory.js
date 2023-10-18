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
}