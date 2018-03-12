$(function() {
	var isLogin = localStorage.getItem("token");
	var isAction = localStorage.getItem("action");

	if(isAction){
		$('.change-password').addClass('user-on');
		$('.user-information').removeClass('user-on');
		$('.user-information-right').hide();
		$('.user-change-password').show();
		$('.prompt-password').show();
		// alert('密码为默认密码，请进行修改！');
	}
	
	$.ajax({
     	type: "GET",
     	url: ajaxIp+"/api/v2/user_info",
    	dataType: "JSON",
    	headers: {'Authorization': "Bearer " + isLogin},
    	success: function(data){
    		console.log(data)
    		$('#user-school').val(data.school_name);
		 	$('#user-name').val(data.name);
		 	$('#user-grade').val(data.grade_name);
		 	$('#user-subject').val(data.subject_name);
		 	$('#user-number').val(data.phone);
		 	$('#user-email').val(data.email);
    		
        },
        error: function(){
        	console.log(11111111111)
        	// alert('请稍后从新尝试登录或者联系管理员');
        	// localStorage.clear();
        	// window.location.href = './login'
        }
    });

 	

	$('.user-information').on('click', function(){
		$('.change-password').removeClass('user-on');
		$('.user-information').addClass('user-on');
		$('.user-information-right').show();
		$('.user-change-password').hide();
	})
	$('.change-password').on('click', function(){
		$('.change-password').addClass('user-on');
		$('.user-information').removeClass('user-on');
		$('.user-information-right').hide();
		$('.user-change-password').show();
	})
	$('.user-save').on('click', function(){
 		
		var userPassword = $('#user-password').val();
 		var newUserPassword = $('#user-new-password').val();
 		var newUserPassword2 = $('#user-new-password2').val();

 		if( newUserPassword.length < 8 ){
 			alert('密码长度不能小于8');
 		}else if(newUserPassword != newUserPassword2 && newUserPassword!=''&& newUserPassword2!=''){
 			alert('两次密码不一致');
 		}else if (newUserPassword == 88888888) {
			alert('密码不能为默认密码')
 		}else{
 			changPassword(userPassword, newUserPassword);
 		}
	})

	var changPassword = function(old_password, new_password){
		$.ajax({
	     	type: "PUT",
	     	url: ajaxIp+"/api/v2/modify_password",
	    	dataType: "JSON",
	    	data:{
	    		'old_password': old_password,
	    		'new_password': new_password,
	    	},
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){
	    		if(data.success){
	    			alert('修改成功');
	    			$('#user-password').val('');
			 		$('#user-new-password').val('');
			 		$('#user-new-password2').val('');
					localStorage.removeItem('action');
					$('.prompt-password').hide();
	    		}else{
	    			alert('原密码错误！');
	    		}
	    		
	        },
	        error: function(){
	        	// alert('请稍后从新尝试或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login'
	        }
	    });
	}



	$('.user-password-input').on('input', function(){

		var userPassword = $('#user-password').val();
 		var newUserPassword = $('#user-new-password').val();
 		var newUserPassword2 = $('#user-new-password2').val();
 		if( newUserPassword.length < 8 ){
 			$(this).siblings('div').show();
 			var newDiv = $(this).siblings('div');
			newDiv.find('span').text('密码不长度不能小于8');
			$(newDiv).animate({'top':0, 'opacity': 1}, 500);
 		}else if(newUserPassword != newUserPassword2 && newUserPassword!=''&& newUserPassword2!=''){
 			$(this).siblings('div').show();
 			var newDiv = $(this).siblings('div');
			newDiv.find('span').text('两次密码不一致');
			$(newDiv).animate({'top':0, 'opacity': 1}, 500);
 		}else{
 			var newDiv = $('.user-prompt');
 			$(newDiv).animate({'top':'-20px', 'opacity': .3}, 500);
 			setTimeout(function(){
 				newDiv.hide();
 			},500)
 		}


		// console.log($(this).val())
		// var newDiv = $(this).siblings('div');
		// console.log(newDiv)
		// $(newDiv).animate({'top':0, 'opacity': 1}, 500);
	})
})



















