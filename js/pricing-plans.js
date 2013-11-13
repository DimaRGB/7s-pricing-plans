(function ($) {

var imgPath = '/wp-content/uploads/2013/10/'
,	defaultIndex = 0
,	opacity = 0.3
,	blockWidth
,	colorClass = ['junior', 'middle', 'senior']
,	pricingPlans = [
		{
			title: 'Fresh starter'
		,	desc: 'Start building your project at a minimal cost.'
		,	price: 3000
		,	experts: [[1], [1], [], [], [], []]
		}, {
			title: 'Blue rare'
		,	desc: 'Gives you more flexibility and visual impression.'
		,	price: 5000
		,	experts: [[1, 0], [1], [0], [], [0], []]
		}, {
			title: 'Rare'
		,	desc: 'Giving you full control over new feaures.'
		,	price: 7000
		,	experts: [[2, 0], [1], [0], [1], [1], []]
		}, {
			title: 'Medium rare'
		,	desc: 'Boosting your development ratio.'
		,	price: 9000
		,	experts: [[2, 1], [1], [0], [1], [1], []]
		}, {
			title: 'Medium'
		,	desc: 'Start feeling what a development team is.'
		,	price: 12000
		,	experts: [[2, 1, 0], [2], [1], [1], [1], [1]]
		}, {
			title: 'Medium well'
		,	desc: 'High level team and powerful management'
		,	price: 15000
		,	experts: [[2, 1, 1], [2], [1], [2], [2], [1]]
		}, {
			title: 'Well done'
		,	desc: 'Best offer on the maket, fully loaded team.'
		,	price: 19000
		,	experts: [[2, 2, 1], [2], [2], [2], [2], [2]]
		}
	];

jQuery(function($) {
	var eventName = $.isMobile ? 'click touchstart touchend' : 'mouseenter';
	var $circles = $('#pricing-plans .scrollpanel .circles');
	blockWidth = $('#pricing-plans').width() / pricingPlans.length;
	$.each(pricingPlans, function(index, value) {
		var $wrapCircle = $('<div class="wrap-large-circle" />');
		$('<div class="large-circle" data-index="' + index + '"></div>')
			.append('<div class="title">' + value.title + '</div>')
			.on(eventName, function() {
				activePricingPlan($(this));
			})
			.appendTo($wrapCircle);
		$wrapCircle.appendTo($circles);
	});
	activePricingPlan($circles.find('.large-circle').eq(defaultIndex));
});

jQuery.fn.setLeft = function(index) {
	this
		.stop()
		.animate({
			'left': index * blockWidth + (blockWidth - $(this).outerWidth()) / 2 - 1
		}, 300);
	return this;
}

function renderDiagram(experts) {
	var $experts = $('#pricing-plans .diagram .expert');
	$experts.each(function(i, el) {
		var $img = $(el).find('img');
		var $text = $(el).find('.text');
		var $smallCircles = $(el).find('.small-circles');
		var text = $text.data('text');
		var expert = experts[i];
		var n = expert.length;

		$smallCircles.empty();
		$text.text(text);
		if( n ) {
			$img.attr('src', imgPath + 'face' + n + '.png');
			if( n > 1 )
				$text.text(n + ' ' + text + 's');
			for( var i in expert )
				$smallCircles.append('<div class="small-circle ' + colorClass[expert[i]] + '">')
			
		} else
			$img.attr('src', imgPath + 'face1.png');
		$(el)
			.stop()
			.fadeTo(300, n ? 1 : opacity);
	});
}

function activePricingPlan($circle) {
	if( $circle.hasClass('active') )
		return;
	var index = parseInt($circle.data('index'));
	var pricingPlan = pricingPlans[index];
	var desc = pricingPlan.desc;
	var price = pricingPlan.price;
	var experts = pricingPlan.experts;

	$('.large-circle').removeClass('active');
	$circle.addClass('active');

	$('.scrollpanel .desc')
		.setLeft(index)
		.text(desc);
	$('.scrollpanel .scrollbar .handler')
		.setLeft(index)
		.text(price + '$/m');
	renderDiagram(experts);
}

})(jQuery);