$(function() {


	var exam_list;
	var isLogin = localStorage.getItem("token");

	$.ajax({
	  type: "GET",
	  url: "http://192.168.1.121:8888/api/v2/exams",
		data:{'page':1,'limit':4},
	  headers: {'Authorization': "Bearer " + isLogin},
	  dataType: "JSON",

	  success: function(data){
	  	if(data.length!=0){
				show_list(data);
	  	}
	   },
	   error: function(){
	      console.log(123123123)
	  }
	});
	function show_list (exam_list) {
		var a = exam_list.length;
		if (a!= 0) {
			for (var i = 0; i < a; i++) {
				var arr='<li class="" data-id='+exam_list[i].id+'><h6 class="name">' + exam_list[i].name + '</h6><p class="time">' + exam_list[i].created_at + '</p></li>'
				$('.list-ul').append(arr);
				$('.list-ul li').eq(0).addClass('active');
			};
		};
		show_test_cont(exam_list[0].id);
	}
	// 显示考试信息
	function show_test_cont(exam_list_id){
		$.ajax({
		  type: "GET",
		  url: "http://192.168.1.121:8888/api/v2/exams/"+exam_list_id,
		  headers: {'Authorization': "Bearer " + isLogin},
		  dataType: "JSON",
		  success: function(data){
		   	console.log(data);
		    show_detail(data);
		   },
		   error: function(){
		    console.log(123123123);
		  }
		});
	}
	function show_detail(detail_data){
		$('.test-name').val(detail_data.name);//考试名称
		$('.test-grade').val(detail_data.grade_id);//考试班级
		$('.range').val(detail_data.range);//查看范围
		// 班级信息
		$('#show-class').html('');
		var classrooms_length = detail_data.exam_classrooms.length;
		for (var i = 0; i < classrooms_length; i++) {
			var class_arr='<li class="on">'+ detail_data.exam_classrooms[i] +'<i class="iconfont">&#xe619;</i></li>';
			$('#show-class').append(class_arr);
		};
		// 科目信息
		$('#show-subject').html('');
		$('.subject-list tbody').html('');
		var subjects_length = detail_data.subjects.length;
		for (var i = 0; i < subjects_length; i++) {
			var class_arr='<li class="on">'+ detail_data.subjects[i] +'<i class="iconfont">&#xe619;</i></li>';
			$('#show-subject').append(class_arr);
			var list_tr='<tr><td class="subject-name">'+ detail_data.subjects[i] +'</td><td class="count">'+ detail_data.subjects[i].student_total +'</td><td class="operation"><a href="javascript:;" class="set"><i class="iconfont">&#xe60f;</i>试卷设置</a><a href="javascript:;" class="sign"><i class="iconfont">&#xe612;</i>权限分配</a><a href="javascript:;" class="dele"><i class="iconfont">&#xe616;</i>删除考试</a></td></tr>';
			$('.subject-list tbody').append(list_tr);
		};

		// 列表信息
		$('.count').text(detail_data.student_total);
	}

	var height = $(window).height()-$('#header').height()-$('#footer').height()- $('.title-box').height()-200;
	console.log(height)
	$('.list-ul').css({
		'height': height,
		'max-height': height
	});

	// 考试列表切换
	$('body').on('click','.list-ul li',function(){
		$('.first-new').hide();
		$('.second-new').show();
		$(this).addClass('active').siblings().removeClass('active');
		console.log($(this).data('id'));
		show_test_cont($(this).data('id'));
	})
	// 下拉加载
	$('.list-ul').unbind('scroll').bind('scroll', function(e){
    var sum = this.scrollHeight;
    if (sum <= $(this).scrollTop() + $(this).height()) {
      $('.list-ul').append($('.list-ul li').clone());
    }
  });
	// 新建考试
	$('#new-test').on('click', function(){
		$('.first-new').show().siblings().hide();
	})
	// 班级选择
	$('#all').on('click', function() {
		$("input[name=check]").prop('checked', this.checked);
	});
	var $graBox = $("input[name='check']");
	$graBox.on('click', function() {
		$("#all").prop("checked",$graBox.length == $("input[name='check']:checked").length ? true : false);
	});
	// 科目选择
	$('#subject-all').on('click', function() {
		$("input[name=subject-check]").prop('checked', this.checked);
	});
	var $subBox = $("input[name='subject-check']");
	$subBox.on('click', function() {
		$("#subject-all").prop("checked",$subBox.length == $("input[name='subject-check']:checked").length ? true : false);
	});
	// 科目选择2
	$('#modal-all').on('click', function() {
		$("input[name=modal-check]").prop('checked', this.checked);
	});
	var $subBox = $("input[name='modal-check']");
	$subBox.on('click', function() {
		$("#modal-all").prop("checked",$subBox.length == $("input[name='modal-check']:checked").length ? true : false);
	});
	// 修改考试名称
	$('#edit').on('click',function(){
		$(this).prev().removeAttr("disabled").removeClass('finished');
	});
})