( function( $ ) {
	"use strict";

	var count = 2;
	var total = ajax_blog_infinite_scroll_data.max_num;
	var flag = 1;

	$(window).on('scroll', function(){
	    if ( $(window).scrollTop() + $(window).height() >= $('.blog-infinite-scrolling').offset().top + $('.blog-infinite-scrolling').height() ) {
	        if ( count > total ) {
	            return false;
	        } else {
	        	if( flag == 1 ){
	            	loadContent(count);
	            }
	        }
	        if( flag == 1 ){
	        	flag = 0;
	        	count++;
	        }
	    }
	});

	function loadContent(pageNumber) {
	    $.ajax({
	        url: ajax_blog_infinite_scroll_data.url,
	        type:'POST',
	        data: "action=infinite_scroll_el&page_no="+ pageNumber + '&post_type=post' + '&page_id=' + ajax_blog_infinite_scroll_data.page_id + '&order_by=' + ajax_blog_infinite_scroll_data.order_by + '&order=' + ajax_blog_infinite_scroll_data.order + '&per_page=' + ajax_blog_infinite_scroll_data.per_page + '&source=' + ajax_blog_infinite_scroll_data.source + '&temp=' + ajax_blog_infinite_scroll_data.temp + '&cat_ids=' + ajax_blog_infinite_scroll_data.cat_ids + '&ajax_nonce=' + ajax_blog_infinite_scroll_data.ajax_nonce,
	        success: function(html){
	            var $html = $(html);
	            var $container = $('.blog-infinite-scrolling');

	            $html.imagesLoaded(function(){
								$container.append($html);
								$container.isotope('appended', $html );
								$container.isotope('layout');

								$('.scroll-animate').scrolla({
									once: true,
									mobile: true
								});
							});

	            flag = 1;
	        }
	    });
	    return false;
	}
} )( jQuery );
