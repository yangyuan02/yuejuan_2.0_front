$(function() {
	$('#header').load('header');
	$('#footer').load('footer');

	$.ajaxSetup ({
        cache: true
    });
	var isLogin = localStorage.getItem("token");
	var isAction = localStorage.getItem("action");
	console.log(window.location.pathname)

console.log(isLogin);

	// 获取当前页面的URL参数
	var url = window.location;
  function getUrlParam(url,name){
    var pattern = new RegExp("[?&]" + name +"\=([^&]+)","g");
    var matcher = pattern.exec(url);
    var items = null;
    if(matcher != null){
      try{
          items = decodeURIComponent(decodeURIComponent(matcher[1]));
      }catch(e){
          try{
              items = decodeURIComponent(matcher[1]);
          }catch(e){
              items = matcher[1];
          }
      }
    }
    return items;
  }

  // console.log(getUrlParam(url,'id')); // bath_id
  // console.log(getUrlParam(url,'test_id')); // bath_id
  // console.log(getUrlParam(url,'exam_name')); // exam_name
  // console.log(getUrlParam(url,'subject_name')); // subject_name
  var isLogin2 = getUrlParam(url,'isLogin');
  console.log(isLogin2)


	var role_name;

	if(!isLogin && !isLogin2){
		window.location.href = './login'
	}else if(isLogin || isLogin2){
		var user_name,school_name;

		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/user_detail",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){
	    		console.log(111111111111111111);
	    		role_name = data.role_name
	    		// console.log(role_name)
	    		console.log(role_name);
	    		$('#role-name').val(role_name);
              // 成绩生成控制代码 end
	    		console.log(data)
	    		if(data.error){
					alert('登录已过期，请从新登录！');
	    			localStorage.clear();
	        		window.location.href = './login'
	    		}else if(data.user_name){
	    			user_name = data.user_name;
	    			$('#teacher-name').val(user_name);
	        		school_name = data.school_name;
	        		$('.longin-username span').text(user_name+'('+school_name+')');
	        		$('.longin-username').attr('customer_id',data.customer_id);
	        		$('#wrap').attr('customer_id',data.customer_id);

	        		if(isAction){
	        			console.log(isAction)
						if(window.location.pathname!='/user_information'){
							window.location.href = './user_information'
						}
					}
	    		}else{
	    			alert('账号已在其他地方登录');
	    			localStorage.clear();
	        		window.location.href = './login'
	    		}
	        },
	        error: function(){
	        	alert('登录已过期，请从新登录！');
    			localStorage.clear();
        		window.location.href = './login'
	        }
	    });
	}

	// 根据用户身份判断阅卷进入的页面
	$('#mark-head').click(function(){
		console.log(role_name)
		if(role_name=="教师"){
			$(this).attr('href','./marking_change');
		}else{
			$(this).attr('href','./marking');
		}
	})
	$('body').on('click','#mark-top',function(){
		if(role_name=="教师"){
			$(this).attr('href','./marking_change');
		}else{
			$(this).attr('href','./marking');
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

