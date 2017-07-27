$(function(){
	var isLogin = localStorage.getItem("token");
	var height = $(window).height()-$('#header').height()-$('#footer').height()-180;
	$('.marking-box').css({
		// 'height': height,
		'min-height': height
	});
	$('.marking-change-box').css({
		'min-height': height
	})
	// 显示题组
	$('body').on('click', '.test-operation a', function() {
		var child_tr = $(this).parents('.parent-tr').next('.child-tr');
		child_tr.toggle()
	});

	// 获取角色信息
	// 	$.ajax({
	//   type: "GET",
	//   url: ajaxIp+"/api/v2/commons/roles",
	//   headers: {'Authorization': "Bearer " + isLogin},
	//   success: function(data){
	//   console.log(data);
	//    },
	//    error: function(){
	//       // alert('请稍后从新尝试登录或者联系管理员');
 //      	// localStorage.clear();
 //      	// window.location.href = './login.html';
	//   }
	// });
	// 获取学校列表
	$.ajax({
	  type: "GET",
	  url: ajaxIp+"/api/v2/invite_schools/schools_with_invite",
	  headers: {'Authorization': "Bearer " + isLogin},
	  success: function(data){
	  	console.log(data)
	  },
	  error: function(){
	      // alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html';
	  }
	});

	// 获取考试列表
	var list_page = 1;
	$.ajax({
	  type: "GET",
	  url: ajaxIp+"/api/v2/exams",
	  data:{'page':list_page,'limit':10},
	  headers: {'Authorization': "Bearer " + isLogin},
	  dataType: "JSON",

	  success: function(data){
	  	console.log(data)
	  },
	  error: function(){
	      // alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html';
	  }
	});
})