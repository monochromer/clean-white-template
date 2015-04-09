(function($, undefined) {

	var $body = $('body'),
		$animScrollEl = $('.scroll-anim'),
		offsetTop = 150,
		timer;

	function disablePointerEvents() {
		clearTimeout(timer);

		if (!$body.hasClass('scrolling')) {
			$body.addClass('scrolling')
		}

		timer = setTimeout(function() {
			$body.removeClass('scrolling')
		}, 150);
	}

	function scrollAnimation() {
		var scroll_top = $(window).scrollTop();
		$animScrollEl.each( function () {

			var elem = $(this),
				elemTop = elem.offset().top - $(window).height(),
				elemBottom = elem.height() + elemTop;

			if ( scroll_top > elemTop + offsetTop /*&& scroll_top < elemBottom*/ ) {
				elem.removeClass( 'scroll-anim--hide' );
				elem.addClass( 'scroll-anim--show' );
			} else {
				elem.removeClass( 'scroll-anim--show' );
				elem.addClass( 'scroll-anim--hide' );
			};
		});
	}

	$(function() {

		// nav scroll
		$(".header__nav-link, .hero__link-more").click(function (e) {
			e.preventDefault();
			var h = $(".header").height();
			$('html, body').animate({
			  scrollTop: $(this.hash).offset().top - h},
			1200);
			return false;
		});


		$('.scroll-anim').addClass('scroll-anim--hide');


		// Maps
		function initialize() {

			var myLatlng = new google.maps.LatLng(65.736788, 24.564398);

			var mapOptions = {
				zoom: 14,
				center: myLatlng
			}

			var map = new google.maps.Map(document.getElementById('map'), mapOptions);

			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				title: 'Welcome!'
			});
		}

		google.maps.event.addDomListener(window, 'load', initialize);

	});



	$(window).scroll( function() {
		disablePointerEvents();
		// scrollAnimation();
		(!window.requestAnimationFrame) ? scrollAnimation() : window.requestAnimationFrame(scrollAnimation);
	});

})(jQuery);
