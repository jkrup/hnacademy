// Initialize app
var myApp = new Framework7();
 
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
  parseInt(index);
  $$($(".course-item")[0]).click();
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
});
