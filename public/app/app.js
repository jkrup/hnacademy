// Initialize app
var myApp = new Framework7({
  pushState: true,
});
 
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Framework7.$;
 
// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: false,
  swipeBackPage: false
});
window.mainView = mainView;


window.goToCourseIndex = function(index) {
  //window.mainView.loadPage("/");
  $$("#to_index_btn").click();
  setTimeout(function() {$$($(".course-item")[index]).click()}, 750);
};
// Swiper code
myApp.onPageInit("course", function(page) {
  $("#fast-forward").click(function(e) {
    console.log("FF");
    window.swiper.swipeTo(parseInt($("#swiper").attr('data-email')),750)
    e.stopPropagation();
    return false;
  });
  var hammertime = new Hammer($("body")[0], {});
  hammertime.on('tap', function(ev) {
    console.log("tapped");
    $(".custom-navbar").fadeToggle("fast")
  });
  var mySwiper = $('.swiper-container').swiper({
    mode:'horizontal',
    loop: false,
    onSlideChangeEnd: function(s,d) {
      $("#current_slide_num").html(s.activeIndex);
    }
  });
  window.swiper = mySwiper;

  loadFaves(page);
});

function loadFaves(page) {
  var $page = $$(page.container);
  var pageUrlSlug = $page.data('urlslug');
  window.pageUrlSlug = pageUrlSlug;

  $page.find(".fav-button")
    .each(function() {
      var id = $$(this).data('id');
      var data = localStorage.getItem("course-favs/"+pageUrlSlug+"/"+id);
      if (data === 'true')
        $$(this).addClass('faved');
      else
        $$(this).removeClass('faved');
    })
    .on('click', function(e) {
      var id = $$(this).data('id');
      $$(this).toggleClass('faved');
      localStorage.setItem("course-favs/"+pageUrlSlug+"/"+id, $$(this).is(".faved"));
      updateFavResult();
      e.stopPropogation();
      return false;
    });
  updateFavResult();
}

function updateFavResult() {
  var res = [];
  for (var i = 0; i < swiper.slides.length; i++) {
    var $slide = $$(swiper.slides[i]);
    var $favBtn = $slide.find(".fav-button");
    if ($favBtn.length > 0) {
      var id = $favBtn.data('id');
      var data = localStorage.getItem("course-favs/"+pageUrlSlug+"/"+id);
      if (data === 'true')
        res.push("<div class='fav-result'>"+$slide.find(".title").html()+"</div>");
    }
  }
  $$(".slide-results").html(res.join(""));
}



