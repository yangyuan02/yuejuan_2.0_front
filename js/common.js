$(function() {
	$('#header').load('header.html');
	$('#footer').load('footer.html');

	$.ajaxSetup ({
        cache: false
    });
	var isLogin = localStorage.getItem("token");
	var isAction = localStorage.getItem("action");
	console.log(window.location.pathname)
	

	var role_name;

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
	    		console.log(111111111111111111);
	    		role_name = data.role_name
	    		console.log(role_name);
	    		$('#role-name').val(role_name);

	    		console.log(data)
	    		if(data.error){
					alert('登录已过期，请从新登录！');
	    			localStorage.clear();
	        		window.location.href = './login.html'
	    		}else if(data.user_name){
	    			user_name = data.user_name;
	    			$('#teacher-name').val(user_name);
	        		school_name = data.school_name;
	        		$('.longin-username span').text(user_name+'('+school_name+')');
	        		$('.longin-username').attr('customer_id',data.customer_id);
	        		$('#wrap').attr('customer_id',data.customer_id);

	        		if(isAction){
						if(window.location.pathname!='/yuejuan2.0_front/user_information.html'){
							window.location.href = './user_information.html'
						}	
					}
	    		}else{
	    			alert('账号已在其他地方登录');
	    			localStorage.clear();
	        		window.location.href = './login.html'
	    		}
	        },
	        error: function(){
	        	alert('登录已过期，请从新登录！');
    			localStorage.clear();
        		window.location.href = './login.html'
	        }
	    });
	}

	// 根据用户身份判断阅卷进入的页面
	$('#mark-head').click(function(){
		if(role_name=="教师"){
			$(this).attr('href','./marking_change.html');
		}else{
			$(this).attr('href','./marking.html');
		}
	})
	$('body').on('click','#mark-top',function(){
		if(role_name=="教师"){
			$(this).attr('href','./marking_change.html');
		}else{
			$(this).attr('href','./marking.html');
		}
	})

	



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

