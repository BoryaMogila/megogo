$(document).ready(function () {
  $('#search').on('keypress', function (e) {
    $.get('/api/love-movie-search' + window.location.search + '&text=' + $('#search').val(), function (res) {
      var items = res.map(function (video, i) {
        return '<input type="checkbox" name="films" value="' + video.id + '" class="view_itm-in" id="video_item_' + i + '">\
                <label for="video_item_' + i + '" class="view_itm">\
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
                </label>'
      });
      $('#items').html(items)
    })
  })
});