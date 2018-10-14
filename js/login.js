$(document).ready(function () {
  $('#form-login').on('submit', function (e) {
    e.preventDefault()
    var queryParams = $(this).serialize()
    $.ajax({
      method: "get",
      url: "/user",
      data: queryParams
    }).done(function (resp) {
      if (resp.status && resp.status == 200) {
        $('#signIn').toggleClass("hide")
        $('#signOut').toggleClass("hide")
      }
      $("#widget_10").toggleClass("hide")
    });

  })
  $('#signOut').on('click', function (e) {
    $('#signOut').toggleClass("hide")
    $('#signIn').toggleClass("hide")
    $.removeCookie("user_id")
  })
  $('#signIn').on('click', function (e) {
    $("#widget_10").toggleClass("hide")
  })
  $('#registration').on('click', function (e) {
    $("#form-action-login").toggleClass("hide")
    $("#form-action-registration").toggleClass("hide")
    $(".auth-another-action").toggleClass("hide")
    $("#form-control-age").toggleClass("hide").attr("required", "true");
    $(".form-control-sex").toggleClass("hide").attr("required", "true");
  })


    $(".header_burger").on("click", mobPopupFunc)
    $(".header_pop-bg").on("click", mobPopupFunc)
})


var body = document.querySelector('body');


var mobPopupFunc = function () {
    if (body.classList.contains('header_nav-open')) {
        body.classList.remove('header_nav-open')
        remove;
    }
    body.classList.add('header_nav-open')
}