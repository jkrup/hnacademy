// Initialize app
var myApp = new Framework7();
 
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Framework7.$;
 
// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});



var template = Handlebars.compile($('#slide-template').html());

var data = [
	{
		"title": "How to Win Hackathons",
		"urlSlug": "hack",
		"author": "Yury Lifshits",
		"slides": [
			{
				"type": "cover"
			},
			{
				"type": "statement",
				"title": "Rules",
				"text": "There are 50 tips in this course \nAdd tips you intend to implement and get a summary by email"
			},
			{
				"type": "section-cover",
				"title": "General tips"
			},
			{
				"type": "tip",
				"tip": "Prepare your hosting and backend infrastructure.",
				"hint": "This will save you a ton of time."
			}
		]
	}

];

var html = '';
$.each(data[0].slides, function(index, element){
	html += template(element);
});

$('#swiper').append(html)