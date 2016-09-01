
(function ($) {
	
	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$('a.toBottom').bind('click', function(event) {
			var $anchor = $(this);
			var nav = $($anchor.attr('href'));
			if (nav.length) {
			$('html, body').stop().animate({				
				scrollTop: $($anchor.attr('href')).offset().top				
			}, 1500, 'easeInOutExpo');
			
			event.preventDefault();
			}
		});
	});
	
})(jQuery);

jQuery(function($) {
    var $win = $(window),
        $item = $('.item'),
        itemArray = [];

    $item.each(function(i) {
        var $this = $(this),
            from = $this.data('from'),
            to = $this.data('to'),
            scroll = $this.data('scroll');

        $this.css(from || {});

        itemArray.push({
            o: $this,
            mx: from.left != undefined ? to.left - from.left : 0,
            my: from.top != undefined ? to.top - from.top : 0,
            mw: from.width != undefined ? to.width - from.width : 0,
            mh: from.height != undefined ? to.height - from.height : 0,
//            mo: from.opacity != undefined ? to.opacity - from.opacity : 0,
            w: $this.width(),
            h: $this.height(),
            from: from,
            to: to,
            scroll: scroll
        });
    });

    $win.on('scroll', function() {
        var scrollTop = $win.scrollTop();
        for (var i = 0; i < itemArray.length; i++) {
            var p = itemArray[i],
                winScroll = scrollTop < p.scroll.start ? p.scroll.start : scrollTop < p.scroll.end ? scrollTop : p.scroll.end,
                mr = (winScroll - p.scroll.start) / (p.scroll.end - p.scroll.start);

            p.o.css({
                left: Math.floor(p.from.left + p.mx * mr),
                top: Math.floor(p.from.top + p.my * mr),
                width: p.from.width != undefined ? p.from.width + p.mw * mr : p.w,
                height: p.from.height != undefined ? p.from.height + p.mh * mr : p.h
//                op‘‘“‘“acity: p.from.opacity != undefined ? p.from.opacity + p.mo * mr : 1
            });
        }
    }).trigger('scroll');
});