//= libs/slick.min.js


(function () {

	var headerBurger = document.querySelector('.header_burger');
	var headerNav = document.querySelector('.header_nav');
	var body = document.querySelector('body');
	var headerPopBg = document.querySelector('.header_pop-bg');

	var mobPopupFunc = function () {
		if (body.classList.contains('header_nav-open')) {
			body.classList.remove('header_nav-open')
			remove;
		}
		body.classList.add('header_nav-open')
	}

	headerBurger.addEventListener('click', mobPopupFunc);

	headerPopBg.addEventListener('click', mobPopupFunc);

}())
$(document).ready(function () {
  $(".view_slide .view_cont-wrap").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    responsive: [{

      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      }

    }, {

      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      }

    }]
  });
})

//
// (function () {
//
// 	var typeModal = document.querySelectorAll('.type-modal')
// 	console.log(typeModal);
//
// 	for (i = 0; i < typeModal.length; i++) {
// 		var height = typeModal[i].offsetHeight;
// 		var width = typeModal[i].offsetWidth;
// 		var self = typeModal[i].style;
// 		console.log(height);
// 		console.log(width);
//
// 	}
//
// }())