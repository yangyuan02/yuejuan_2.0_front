 $(document).ready(function () {  
	$(document).on('click',function(){
		$('.dropdown').hide();
	});

	$('.longin-username').on('click',function(){
		$('.dropdown').toggle();
		var userWidth = $('.longin-username').width();
		$('.dropdown ul').width(userWidth);
		return false;
	});


	$('.exit').on('click',function(){
		localStorage.clear();
		window.location.href = './login.html'
	});
})


