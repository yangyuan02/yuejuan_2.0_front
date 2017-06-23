$(function() {
	$('#header').load('header.html');
	$('#footer').load('footer.html');

	$.ajaxSetup ({
        cache: false
    });
	var isLogin = localStorage.getItem("token");
	var isAction = localStorage.getItem("action");
	console.log(window.location.pathname)
	

	

	if(!isLogin){
		window.location.href = './login.html'
	}else{
		var user_name,school_name;

		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/user_detail",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){
	    		console.log(data)
	    		if(data.user_name){
	    			user_name = data.user_name;
	        		school_name = data.school_name;
	        		$('.longin-username span').text(user_name+'('+school_name+')')

	        		if(isAction){
						if(window.location.pathname!='/yuejuan2.0_front/user_information.html')
						window.location.href = './user_information.html'
					}
	    		}else{
	    			alert('账号已在其他地方登录');
	    			localStorage.clear();
	        		window.location.href = './login.html'
	    		}
	        },
	        error: function(){
	        	alert('请稍后从新尝试登录或者联系管理员');
	        	localStorage.clear();
	        	window.location.href = './login.html'
	        }
	    });
	}

	$('.modal-exit').click(function(){
		$('.modal-main').animate({'top': '45%','opacity': 0},500);
		$('.modal-shadow').animate({'opacity': 0},500);
		setTimeout(function(){
			$('.modal-wrap').hide();
		},500);
	});

	$('.modal-start').click(function(){
		$('.modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-shadow').animate({'opacity': .3},500);
		$('.modal-wrap').show();
	});
})
