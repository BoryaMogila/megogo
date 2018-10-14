$(document).ready(function () {
  $('#search').on('change', function (e) {
    console.log(window.location)
    $.get('/api/love-movie-search' + window.location.search + '&text=' + e.target.value, function (res) {
      var items = res.map(function (video, i) {
        return '<input type="checkbox" value="" class="view_itm-in" id="video_item_' + i + '">\
                <label for="video_item_' + i + '">\
                        <articl class="view_itm">\
                            <div class="view_itm-img">\
                                <span class="view_itm-link">\
                                    <img src="' + video.image.small + '"\
                                         alt="" class="view_itm-img-cont">\
                                </span>\
                            </div>\
                            <p class="view_itm-title">\
                                ' + video.title + '\
                            </p>\
                            <p class="view_itm-info"> ' + video.year + ',  ' + video.genres[0] + '</p>\
                        </articl>\
                </label>'
      });
      console.log(items)
      $('#items').html(items)
    })
  })
});