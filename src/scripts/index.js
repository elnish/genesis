//Variants
let variants = document.querySelectorAll('[data-variant]');
let overlay = document.querySelector('.block__overlay');
let orangeBtn = document.querySelector('.aside__btn_orange');
for(let i = 0; i < variants.length; i++) {
    variants[i].addEventListener('click', function(){
        if(this.classList.contains('aside__variant_active') == false) {
           this.classList.add('aside__variant_active')
           overlay.classList.remove('disable');
           orangeBtn.classList.remove('hidden');
        } 
    })
}


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


// Slider
// let slides = document.querySelectorAll('[data-slide-item]');
// let slideIndex = 1;
// showSlides(slideIndex);
// function plusSlides() {
//   showSlides(slideIndex += 1);
// }
// function minusSlides() {
//     showSlides(slideIndex -= 1);
// }
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }
// function showSlides(n) {
//   let i;
//   if (n > slides.length) {slideIndex = 1} 
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none"; 
//   }
//   slides[slideIndex-1].style.display = 'flex'; 
// }
// document.querySelector('[data-next]').addEventListener('click', plusSlides, false);

//Validate

let form = document.querySelector('[data-form]');
let name = document.querySelector('[data-name]');
let email = document.querySelector('[data-email]');
let password = document.querySelector('[data-password]');
let btn = document.querySelector('[data-submit-btn]');
let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
let re2 = /[A-Z]/;

function errorMessage(el, message) {
    el.value = message;
    el.classList.add('aside__form-input_error');
}

function successMessage(el) {
    el.classList.add('aside__form-input_success');
}

function onfocus(el) {
    el.addEventListener('focus', function() {
        el.value = '';
        el.classList.remove('aside__form-input_error');
    })
}

function validate(event) {
    event.preventDefault();
    if (name.value.length == 0) {
        errorMessage(name, 'Введите свое имя');
        onfocus(name);  
    } else {
        successMessage(name);
    }

    if (email.value.length == 0) {
        errorMessage(email, 'Введите свой email');
        onfocus(email);
        
    } else if (!re.test(email.value)) {
        errorMessage(email, 'Неверный формат email');
        onfocus(email);
    } else {
        successMessage(email);
    }

    if (password.value.length == 0) {
        errorMessage(password, 'Придумайте новый пароль');
        onfocus(password);
    } else if (!re2.test(password.value)) {
        errorMessage(password, 'Должна быть большая буква');
        onfocus(password);
    } else {
        successMessage(password);
    }
}

form.addEventListener('submit', validate);