var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
if (navMain.classList.contains('main-nav--closed')) {
navMain.classList.remove('main-nav--closed');
navMain.classList.add('main-nav--opened');
} else {
navMain.classList.add('main-nav--closed');
navMain.classList.remove('main-nav--opened');
}
});





var personalInformation = document.querySelector(".person__input");
var phoneNumber = document.querySelector(".contact-inf__input");
var popupSuccess = document.querySelector(".popup-success");
var popupFalure = document.querySelector(".popup-falure");
var successBtn = document.querySelector(".popup-success__btn");
var falureBtn = document.querySelector(".popup-falure__btn");
var formBtn = document.querySelector(".form__btn");
var form = document.querySelector(".form");

form.addEventListener("submit", function(event) {
  if (!personalInformation.value || !phoneNumber.value) {
    event.preventDefault();
    if (popupFalure.classList.contains("popup-falure--close")) {
      popupFalure.classList.remove("popup-falure--close");
      popupFalure.classList.add("popup-falure--open")
    };
    falureBtn.addEventListener("click", function(event) {
      event.preventDefault();
      if (popupFalure.classList.contains("popup-falure--open")) {
        popupFalure.classList.remove("popup-falure--open");
        popupFalure.classList.add("popup-falure--close");
      };
    })
  }
  else {
    event.preventDefault();
    formBtn.addEventListener("click", function(event) {
      event.preventDefault();
      if (popupSuccess.classList.contains("popup-success--close")) {
        popupSuccess.classList.remove("popup-success--close");
        popupSuccess.classList.add("popup-success--open");
      };
    });
    successBtn.addEventListener("click", function(event) {
      event.preventDefault();
      if (popupSuccess.classList.contains("popup-success--open")) {
        popupSuccess.classList.remove("popup-success--open")
        popupSuccess.classList.add("popup-success--close");
      };
    });
  };
});
