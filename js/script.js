var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var reviews = document.querySelector('.reviews');
if (reviews) {
  var reviewsItems = reviews.querySelectorAll('.reviews__item');
  var nextButton = reviews.querySelector('.reviews__button--next');
  var prevButton = reviews.querySelector('.reviews__button--prev');
}

var formModule = document.querySelector('.competition');
if (formModule) {
  var userSurname = formModule.querySelector('#user-surname');
  var userName = formModule.querySelector('#user-name');
  var userEmail = formModule.querySelector('#user-email');
  var userPhone = formModule.querySelector('#user-phone');
  var userPatronymic = formModule.querySelector('#user-patronymic-name');
}

var layer = document.querySelector(".modal-overlay");

var formSuccess = document.querySelector('.success');
if (formSuccess) {
  var buttonSuccess = formSuccess.querySelector('.success__button');
}

var formFailure = document.querySelector('.failure');
if (formFailure) {
  var buttonFailure = formFailure.querySelector('.failure__button');
}

var postPhoto = document.querySelector('.post-photo__add');
var postPhotoList = document.querySelector('.post-photo__control-list');

navMain.classList.remove('main-nav--nojs');

if (reviews) {
  reviews.classList.remove('reviews--nojs');

  var sliders = document.getElementsByName('reviews');
  var number;

  nextButton.addEventListener('click', function(event) {
    event.preventDefault();
    for (var i = 0; i < sliders.length; i++) {
      if (sliders[i].checked) {
        number = i;
        break;
      }
    }
    if (number < (sliders.length -1)) {
      sliders[number+1].checked = true;
      reviewsItems[number+1].classList.remove('slider__item--slide-right');
      reviewsItems[number+1].classList.remove('slider__item--slide-left');
      reviewsItems[number+1].classList.add('slider__item--slide-right');
    } else {
      sliders[0].checked = true;
      reviewsItems[0].classList.remove('slider__item--slide-right');
      reviewsItems[0].classList.remove('slider__item--slide-left');
      reviewsItems[0].classList.add('slider__item--slide-right');
    }
  });

  prevButton.addEventListener('click', function(event) {
    event.preventDefault();
    for (var i = 0; i < sliders.length; i++) {
      if (sliders[i].checked) {
        number = i;
        break;
      }
    }
    if (number < 1) {
      sliders[sliders.length-1].checked = true;
      reviewsItems[sliders.length-1].classList.remove('slider__item--slide-right');
      reviewsItems[sliders.length-1].classList.remove('slider__item--slide-left');
      reviewsItems[sliders.length-1].classList.add('slider__item--slide-left');
    } else {
      sliders[number-1].checked = true;
      reviewsItems[number-1].classList.remove('slider__item--slide-right');
      reviewsItems[number-1].classList.remove('slider__item--slide-left');
      reviewsItems[number-1].classList.add('slider__item--slide-left');
    }
  });
}

navToggle.addEventListener('click', function(event) {
  event.preventDefault();
  if (navMain.classList.contains('main-nav--show')) {
    navMain.classList.remove('main-nav--show');
  } else {
    navMain.classList.add('main-nav--show');
  }
});

if (formModule) {
  formModule.addEventListener("submit", function(event) {
    if (!userSurname.value || !userName.value || !userEmail.value) {
      event.preventDefault();
      layer.classList.add("modal-overlay--show");
      formFailure.classList.add("failure--show");
      if (!userSurname.value) {
        userSurname.classList.add('input-field--error');
      }
      if (!userName.value) {
        userName.classList.add('input-field--error');
      }
      if (!userEmail.value) {
        userEmail.classList.add('input-field--error');
      }
    } else {
      event.preventDefault();
      layer.classList.add("modal-overlay--show");
      formSuccess.classList.add("success--show");
      this.reset();
    }
  });

  formModule.addEventListener("focus", function() {
    if (document.activeElement.classList.contains('input-field--error')) {
      document.activeElement.classList.remove('input-field--error');
    }
  }, true);

  buttonSuccess.addEventListener("click", function(event) {
    event.preventDefault();
    formSuccess.classList.remove("success--show");
    layer.classList.remove("modal-overlay--show");
  });

  buttonFailure.addEventListener("click", function(event) {
    event.preventDefault();
    formFailure.classList.remove("failure--show");
    layer.classList.remove("modal-overlay--show");
  });

  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
      if (formSuccess.classList.contains("success--show")) {
        formSuccess.classList.remove("success--show");
      }
      if (formFailure.classList.contains("failure--show")) {
        formFailure.classList.remove("failure--show");
      }
      if (layer.classList.contains("modal-overlay--show")) {
        layer.classList.remove("modal-overlay--show");
      }
    }
  });
}

if (postPhoto) {
  postPhoto.addEventListener("submit", function(event) {
    event.preventDefault();
  });
}

if (postPhotoList) {
  function hidden(selectedLabel) {
    var activeContainer = selectedLabel.querySelector('.post-photo__control-item--active');
    var activeElement = selectedLabel.querySelector('.control-label--active');
    if (activeContainer) {
      activeContainer.classList.remove('post-photo__control-item--active');
    }
    if (activeElement) {
      activeElement.classList.remove('control-label--active');
    }
  }

  function show(selectedLabel) {
    var selectedContainer = selectedLabel.parentElement;

    if (!selectedLabel.classList.contains('control-label--active')) {
      selectedLabel.classList.add('control-label--active');
    }

    if (!selectedContainer.classList.contains('post-photo__control-item--active')) {
      selectedContainer.classList.add('post-photo__control-item--active');
    }
  }

  postPhotoList.onclick = function(event) {
    var target = event.target;

    if(!target) {
      return;
    }
    if (target.tagName != 'LABEL') {
      return;
    }
    hidden(target.parentElement.parentElement);
    show(target);
  }
}
