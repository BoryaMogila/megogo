$(document).ready(function(){$("#search").on("keypress",function(i){$.get("/api/love-movie-search"+window.location.search+"&text="+$("#search").val(),function(i){var e=i.map(function(i,e){return'<input type="checkbox" name="films" value="'+i.id+'" class="view_itm-in" id="video_item_'+e+'">                <label for="video_item_'+e+'" class="view_itm">                            <div class="view_itm-img">                                <span class="view_itm-link">                                    <img src="'+i.image.small+'"                                         alt="" class="view_itm-img-cont">                                </span>                            </div>                            <p class="view_itm-title">                                '+i.title+'                            </p>                            <p class="view_itm-info"> '+i.year+",  "+i.genres[0]+"</p>                </label>"});$("#items").html(e)})})});