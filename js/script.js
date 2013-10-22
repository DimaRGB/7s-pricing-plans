var opacity = 0.2, blockWidth;
var colorClass = ['junior', 'middle', 'senior'];
var pricingPlans = [
	{
		title: 'Fresh starter'
	,	desc: 'Fresh starter.'
	,	price: 3000
	,	experts: [[1], [1], [], [], [], []]
	}, {
		title: 'Blue rare'
	,	desc: 'Blue rare.'
	,	price: 4000
	,	experts: [[1, 0], [1], [0], [], [0], []]
	}, {
		title: 'Rare'
	,	desc: 'Rare.'
	,	price: 6000
	,	experts: [[2, 0], [1], [0], [1], [1], []]
	}, {
		title: 'Medium rare'
	,	desc: 'Medium rare.'
	,	price: 8000
	,	experts: [[2, 1], [1], [0], [1], [1], []]
	}, {
		title: 'Medium'
	,	desc: 'Medium. Start feeling what a development team is.'
	,	price: 10000
	,	experts: [[2, 1, 0], [2], [1], [1], [1], [1]]
	}, {
		title: 'Medium well'
	,	desc: 'Medium well.'
	,	price: 12000
	,	experts: [[2, 1, 1], [2], [1], [2], [2], [1]]
	}, {
		title: 'Well done'
	,	desc: 'Well done.'
	,	price: 15000
	,	experts: [[2, 2, 1], [2], [2], [2], [2], [2]]
	}
];

jQuery(function($) {
	var $circles = $('#pricing-plans .scrollpanel .circles');
	blockWidth = $('#pricing-plans').width() / pricingPlans.length;
	$.each(pricingPlans, function(index, value) {
		var $wrapCircle = $('<div class="wrap-large-circle" />');
		$('<div class="large-circle" data-index="' + index + '"></div>')
			.append('<div class="title">' + value.title + '</div>')
			.on('mouseenter', function() {
				activePricingPlan($(this));
			})
			.appendTo($wrapCircle);
		$wrapCircle.appendTo($circles);
	});
	activePricingPlan($circles.find('.large-circle').first());
});

function getLeft(el, index) {
	return index * blockWidth + (blockWidth - $(el).outerWidth()) / 2 - 1;
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
			$img.attr('src', './img/face' + n + '.png');
			if( n > 1 )
				$text.text(n + ' ' + text + 's');
			for( var i in expert )
				$smallCircles.append('<div class="small-circle ' + colorClass[expert[i]] + '">')
			
		} else
			$img.attr('src', './img/face1.png');
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
		.css('left', function() { return getLeft(this, index); })
		.text(desc);
	$('.scrollpanel .scrollbar .handler')
		.css('left', function() { return getLeft(this, index); })
		.text(price + '$/m');
	renderDiagram(experts);
}
