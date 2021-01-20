var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");

navMain.classList.remove("main-nav--nojs");

navToggle.addEventListener("click", function() {
if (navMain.classList.contains("main-nav--closed")) {
navMain.classList.remove("main-nav--closed");
navMain.classList.add("main-nav--opened");
} else {
navMain.classList.add("main-nav--closed");
navMain.classList.remove("main-nav--opened");
}
});





var personalInformation = document.querySelector(".person__input");
var phoneNumber = document.querySelector(".contact-inf__input");
var popupSuccess = document.querySelector(".popup-success");
var popupFailure = document.querySelector(".popup-failure");
var successBtn = document.querySelector(".popup-success__btn");
var failureBtn = document.querySelector(".popup-failure__btn");
var formBtn = document.querySelector(".form__btn");
var form = document.querySelector(".form");

form.addEventListener("submit", function(event) {
  if (!personalInformation.value || !phoneNumber.value) {
    event.preventDefault();
    if (popupFailure.classList.contains("popup-failure--close")) {
      popupFailure.classList.remove("popup-failure--close");
      popupFailure.classList.add("popup-failure--open");
    };
    failureBtn.addEventListener("click", function(event) {
      event.preventDefault();
      if (popupFailure.classList.contains("popup-failure--open")) {
        popupFailure.classList.remove("popup-failure--open");
        popupFailure.classList.add("popup-failure--close");
      }
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
        popupSuccess.classList.remove("popup-success--open");
        popupSuccess.classList.add("popup-success--close");
      }
    });
  };
});
