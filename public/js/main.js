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