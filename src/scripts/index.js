;(function () {
//Variants
let variants = document.querySelectorAll('.aside__variant');
let genders = document.querySelectorAll('.aside__form-input_short');  
let overlay = document.querySelector('.block__overlay');
let orangeBtn = document.querySelector('.aside__btn_orange');
let result = document.querySelector('.block__result30');
let resultSimbol = document.querySelector('.block__result-letter');

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
    resultSimbol.innerHTML = letter;
}

selections(variants, 'aside__variant_active', variant => {
    console.log(variant);
    overlay.classList.remove('disable');
    orangeBtn.classList.remove('hidden');
 
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




//form checkbox
let checkbox = document.querySelector('[data-checkbox]');
let submitBtn = document.querySelector('[data-submit-btn]');

checkbox.addEventListener('click', function () {
    if (checkbox.checked) {
        submitBtn.removeAttribute('disabled');
    }
    else {
        submitBtn.setAttribute('disabled', true);
    } 
})


//Validation
let form = document.querySelector('[data-form]');
let name = document.querySelector('[data-name]');
let email = document.querySelector('[data-email]');
let password = document.querySelector('[data-password]');
let btn = document.querySelector('[data-submit-btn]');
let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
let passwordRegex = /.{8,}/;

function errorMessage(el, message) {
    el.placeholder = message;
    el.classList.add('aside__form-input_error');
}


selections(genders, 'aside__form-input_active', variant => console.log(variant));

function validate(event) {
    event.preventDefault();
    //name
    if (name.value.length == 0) {
        errorMessage(name, 'Введите свое имя');
        // onfocus(name);  
    } else {
        successMessage(name);
    }
    //email
    if (email.value.length == 0) {
        errorMessage(email, 'Введите свой email');
        // onfocus(email);
        
    } else if (!emailRegex.test(email.value)) {
        errorMessage(email, 'Неверный формат email');
        // onfocus(email);
    } 
    //password
    if (password.value.length == 0) {
        errorMessage(password, 'Придумайте новый пароль');
        // onfocus(password);
    } else if (!passwordRegex.test(password.value)) {
        errorMessage(password, 'Паль должен содержать не меньше 8 знаков');
        // onfocus(password);
    } else {
        successMessage(password);
    }
}

form.addEventListener('submit', validate);
})();