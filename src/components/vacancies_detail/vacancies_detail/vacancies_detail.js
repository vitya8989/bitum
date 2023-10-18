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
}