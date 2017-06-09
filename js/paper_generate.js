$(function() {
 var grade_info=['六年级','七年级','八年级','九年级','高一','高二','高三']



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
				var arr='<li class=""><h6 class="name">' + exam_list[i].name + '</h6><p class="time">' + exam_list[i].created_at + '</p></li>'
				$('.list_ul').append(arr);
			};
		};
		$.ajax({
		  type: "GET",
		  url: "http://192.168.1.121:8888/api/v2/exams/"+exam_list[0].id,
		  headers: {'Authorization': "Bearer " + isLogin},
		  dataType: "JSON",
		  success: function(data){
		   	console.log(data)
		    show_detail(data);
		   },
		   error: function(){
		      console.log(123123123)
		  }
		});
	}

	function show_detail(detail_data){
		$('.test_name').val(detail_data.name);//考试名称
		// $('.test_grade').val(detail_data.grade_id);//考试班级
		$('.range').val(detail_data.range);//查看范围
		$.ajax({
		  type: "GET",
		  url: "http://192.168.1.121:8888/api/v2/commons/school_grades",
		  headers: {'Authorization': "Bearer " + isLogin},
		  dataType: "JSON",
		  success: function(data){
		   	console.log(data);
		   	// for (var i = 0; i < data.length; i++) {
		   	// 	if(data[i]['id']== detail_data.grade_id){
		   	// 		$('.test_grade').val(data[i].name);
		   	// 	}
		   	// };
		   	$('.test_grade').val(data[i].name)
		   },
		   error: function(){
		      console.log(123123123)
		  }
		});
	}

	var height = $(window).height()-$('#header').height()-$('#footer').height()- $('.title_box').height()-200;
	console.log(height)
	$('.list_ul').css({
		'height': height,
		'max-height': height
	});
	// 新建考试
	$('#new_test').on('click', function(){
		$('.first_new').show().siblings().hide();
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
	$('#subject_all').on('click', function() {
		$("input[name=subject_check]").prop('checked', this.checked);
	});
	var $subBox = $("input[name='subject_check']");
	$subBox.on('click', function() {
		$("#subject_all").prop("checked",$subBox.length == $("input[name='subject_check']:checked").length ? true : false);
	});
	// 修改考试名称
	$('#edit').on('click',function(){
		$(this).prev().removeAttr("disabled").removeClass('finished');
	});
})