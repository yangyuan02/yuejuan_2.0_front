$(function(){
	var height = $(window).height()-$('#header').height()-$('#footer').height()-180;
	$('.marking-box').css({
		// 'height': height,
		'min-height': height
	});
	$('.marking-change-box').css({
		'min-height': height
	})
	$('.marking-control-box').css({
		'min-height': height
	})
})