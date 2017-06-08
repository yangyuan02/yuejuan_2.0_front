$(function() {

	$('#header').load('header.html');
	$('#footer').load('footer.html');

	var isLogin = localStorage.getItem("token");
	if(!isLogin){
		window.location.href = './login.html'
	}else{
		var user_name,school_name;

		$.ajax({
	     	type: "GET",
	     	url: "http://192.168.1.121:8888/api/v2/user_detail",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){
	    		console.log(data)
	    		if(data.user_name){
	    			user_name = data.user_name;
	        		school_name = data.school_name;
	        		console.log(user_name+'+++'+school_name)
	        		$('.longin-username span').text(user_name+'('+school_name+')')
	    		}else{
	    			alert('账号已在其他地方登录');
	    			localStorage.clear();
	        		window.location.href = './login.html'
	    		}
	        },
	        error: function(){
	        	alert('账号已在其他地方登录');
	        	localStorage.clear();
	        	window.location.href = './login.html'
	        }
	    });
	}
})