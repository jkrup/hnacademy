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
  $$($(".course-item")[index]).click();
};
// Swiper code
myApp.onPageInit("course", function(page) {
  /*var coverPage = function() {
    $(".toolbar").fadeOut("fast")
    $(".custom-navbar").fadeOut("fast")
  }*/
  var mySwiper = $('.swiper-container').swiper({
    mode:'horizontal',
    loop: false,
    onSlideChangeEnd: function(s,d) {
      $("#current_slide_num").html(s.activeIndex);
      /*if(s.activeIndex == 1 )
        {
          console.log("hi")
          $(".toolbar").fadeIn("slow")
          $(".custom-navbar").fadeIn("slow")
        }
      if(s.activeIndex == 0) {
        //cover_page();
        $(".toolbar").fadeOut("fast")
        $(".custom-navbar").fadeOut("fast")
      }*/
    }
  });
  window.swiper = mySwiper;
  //coverPage();

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
    .on('click', function() {
      var id = $$(this).data('id');
      $$(this).toggleClass('faved');
      localStorage.setItem("course-favs/"+pageUrlSlug+"/"+id, $$(this).is(".faved"));
      updateFavResult();
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



