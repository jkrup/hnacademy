// Initialize app
var myApp = new Framework7();
 
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Framework7.$;
 
// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: false
});

// Swiper code
myApp.onPageInit("course", function(page) {

  var mySwiper = $('.swiper-container').swiper({
    mode:'horizontal',
    loop: false,
    onSlideChangeEnd: function(s,d) {
      $("#current_slide_num").html(s.activeIndex);
      console.log("HIT");
    }

  });
});
