$(function() {
	var isLogin = localStorage.getItem("token");

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
        	alert('请稍后从新尝试登录或者联系管理员');
        	localStorage.clear();
        	window.location.href = './login.html'
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
})



















