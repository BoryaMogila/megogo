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

$( document ).ready(function() {
    $('#signIn').on('click', function (e) {
        $("#widget_10").toggleClass("hide")
    })
    $('#registration').on('click', function (e) {
        $("#form-action-login").toggleClass("hide")
        $("#form-action-registration").toggleClass("hide")
        $(".auth-another-action").toggleClass("hide")
        $("#form-control-age").toggleClass("hide")
        $(".form-control-sex").toggleClass("hide")
    })
})