;(function () {
    //Variants
    let variants = document.querySelectorAll('.aside__variant');
    let genders = document.querySelectorAll('.aside__form-input_short');  
    let overlay = document.querySelector('.block__overlay');
    let resultBtn = document.querySelector('.aside__btn_orange');
    let result = document.querySelector('.block__result30');
    let resultSymbol = document.querySelector('.block__result-letter');

    function selections(elements, activeClass, callback) {
        elements.forEach((elem, index) => {
            elem.dataset.variant = index;
            elem.addEventListener('click', event => {
                let element = event.currentTarget;
                let variant = element.dataset.variant;
                elements.forEach(btn => btn.classList.remove(activeClass));
                element.classList.add(activeClass);
                callback(variant);
            })
        })
    }

    function resultInner(prosent, letter) {
        result.innerHTML = prosent;
        resultSymbol.innerHTML = letter;
    }

    selections(variants, 'aside__variant_active', variant => {
        console.log(variant);
        overlay.classList.remove('disable');
        resultBtn.classList.remove('hidden');
    
        if (variant == 0) {
            resultInner("10%", "A");   
        } else if (variant == 1) {
            resultInner("30%", "Б");
        } else {
            resultInner("67%", "В");
        }
    });


    // Slider
    let slides = document.querySelectorAll('[data-slide-item]');
    let next = document.querySelectorAll('[data-next]');
    let slideIndex = 1;
    showSlides(slideIndex);
    function plusSlides() {
        showSlides(slideIndex += 1);
    }

    function showSlides(n) {
        if (n > slides.length) {slideIndex = 1} 
        if (n < 1) {slideIndex = slides.length}
        slides.forEach(slider => slider.style.display = "none");
        slides[slideIndex-1].style.display = 'flex'; 
    }

    next.forEach(elt => elt.addEventListener('click', plusSlides, false));



    //Validation
    let form = document.querySelector('[data-form]');
    let name = document.querySelector('#name');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let inputs = document.querySelectorAll('[data-input]');
    let checkbox = document.querySelector('#checkbox');
    let submitBtn = document.querySelector('[data-submit-btn]');
    let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let passwordRegex = /.{8,}/;


    function submitDisabled() {
        checkbox.checked = false;
        submitBtn.setAttribute('disabled', true);
    }

    function errorMessage(el, message) {
        el.placeholder = message;
        el.value = '';
        el.classList.add('aside__form-input_error');
        submitDisabled();
    }

    function clear(el) {
        el.classList.remove('aside__form-input_error');
    }


    checkbox.addEventListener('click', function () {
        if (checkbox.checked) {
            submitBtn.removeAttribute('disabled');
        }
        else {
            submitBtn.setAttribute('disabled', true);
        } 
    });
    
    selections(genders, 'aside__form-input_active', variant => console.log (variant));

    function validate(event) {
        event.preventDefault();
        let result = 0;
        //gender
        if (!genders[0].classList.contains('aside__form-input_active') && !genders[1].classList.contains('aside__form-input_active')) {
            genders.forEach(gender => gender.classList.add('aside__form-input_error')); 
            result = 1;
        } else {
            genders.forEach(gender => gender.classList.remove('aside__form-input_error'));
           
        }

        // name
        if (name.value.length == 0) {
            errorMessage(name, 'Введите свое имя'); 
            result = 2;
        } else {
            clear(name);
          
        }

        // email
        if (email.value.length == 0) {
            errorMessage(email, 'Введите свой email');
            result = 3;
        } else if (!emailRegex.test(email.value)) {
            errorMessage(email, 'Неверный формат email');
            result = 4;
        } else {
            clear(email);
        }

        //password
        if (password.value.length == 0) {
            errorMessage(password, 'Придумайте новый пароль');
            result = 5;
        } else if (!passwordRegex.test(password.value)) {
            errorMessage(password, 'Паль должен содержать не меньше 8 знаков');
            result = 6;
        } else {
            clear(password);
        }
        if (result == 0) {
            inputs.forEach(input => {
                input.value = '';
                input.placeholder = '';
            });
            genders.forEach(gender => gender.classList.remove('aside__form-input_active'));
            submitDisabled();
            alert("Thank you!");
        }
    }

    form.addEventListener('submit', validate);
   
})();