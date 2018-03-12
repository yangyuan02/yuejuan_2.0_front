$(function(){
	var height = $(window).height()-$('#header').height()-$('#footer').height()-180;
	$('.message-box').css({
		// 'height': height,
		'min-height': height
	});
	var isLogin = localStorage.getItem("token");
	get_info();
	var result;
	// 获取消息
	function get_info(){
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/system_messages",
		  headers: {'Authorization': "Bearer " + isLogin},
		  success: function(data){
		  	console.log(data);
		  	show_info(data);
		  	result=data.result;
		   },
		   error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login';
		  }
		});
	}
	// 显示消息
	function show_info(detail_info){
		var detail_length = detail_info.length;
		// if (detail_length) {
		// 	$('.m-count').show();
		// };
		$('.message-list').html('');
		console.log(cur_port)
		var limg;
		if(cur_port==8899){
			limg = '<img src="img/img89.png">';
		}else{
			limg = '<img src="img/img.png">';
		}
		for (var i = 0; i < detail_length; i++) {
			if(detail_info[i].result==null){
				var message_li = '<li result="'+detail_info[i].result+'" m-type="'+detail_info[i].m_type+'" invite-school-id="'+detail_info[i].invite_school_id+'"><div class="left img">'+limg+'</div><div class="left text"><h6>系统消息</h6><span class="time">'+detail_info[i].created_at+'</span><p class="text-cont"><span class="operation-name">'+detail_info[i].operator_name+'@'+detail_info[i].school_name+'</span>在<span class="exam-name">'+detail_info[i].exam_name+'</span>中选择了贵校一起参加此次考试。</p><div class="result-btn"><a href="javascript:;" class="agree-btn">同意</a><a href="javascript:;" class="refuse-btn">拒绝</a></div></div></li>';
				$('.message-list').append(message_li);
			}
			if(detail_info[i].result==1){
				var message_li = '<li result="'+detail_info[i].result+'" m-type="'+detail_info[i].m_type+'" invite-school-id="'+detail_info[i].invite_school_id+'"><div class="left img">'+limg+'</div><div class="left text"><h6>系统消息</h6><span class="time">'+detail_info[i].created_at+'</span><p class="text-cont"><span class="operation-name">'+detail_info[i].operator_name+'@'+detail_info[i].school_name+'</span>在<span class="exam-name">'+detail_info[i].exam_name+'</span>中选择了贵校一起参加此次考试。</p><div class="result-btn"><a href="javascript:;" class="on">已经同意</a></div></div></li>';
				$('.message-list').append(message_li);
			}
			if(detail_info[i].result==0){
				var message_li = '<li result="'+detail_info[i].result+'" m-type="'+detail_info[i].m_type+'" invite-school-id="'+detail_info[i].invite_school_id+'"><div class="left img">'+limg+'</div><div class="left text"><h6>系统消息</h6><span class="time">'+detail_info[i].created_at+'</span><p class="text-cont"><span class="operation-name">'+detail_info[i].operator_name+'@'+detail_info[i].school_name+'</span>在<span class="exam-name">'+detail_info[i].exam_name+'</span>中选择了贵校一起参加此次考试。</p><div class="result-btn"><a href="javascript:;" class="on">已经拒绝</a></div></div></li>';
				$('.message-list').append(message_li);
			}
		};
	}
	// 同意
	$('body').on('click', '.message-list li .agree-btn', function() {
		$(this).text('已经同意').addClass('on');
		$(this).next().hide();
		result=1;
		var invite_school_id =$(this).parents('li').attr('invite-school-id');
		result_cont(invite_school_id,result);
	});
	// 拒绝
	$('body').on('click', '.message-list li .refuse-btn', function() {
		$(this).text('已经拒绝').addClass('on');
		$(this).prev().hide();
		result=0;
		var invite_school_id =$(this).parents('li').attr('invite-school-id');
		result_cont(invite_school_id,result);
	});
	function result_cont(invite_school_id,result){
		$.ajax({
		  type: "PUT",
		  url: ajaxIp+"/api/v2/invite_schools/"+invite_school_id+"/choose",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'result':result},
		  success: function(data){
		  	console.log(data);
		   },
		   error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login';
		  }
		});
	}
})