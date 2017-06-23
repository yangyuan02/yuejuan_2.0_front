$(function() {

	var list_page = 1;
	var exam_list;
	var on_checked =[];
	var isLogin = localStorage.getItem("token");
	first_list();
	function first_list() {
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/exams",
			data:{'page':list_page,'limit':10},
		  headers: {'Authorization': "Bearer " + isLogin},
		  dataType: "JSON",

		  success: function(data){
		  	if(data.length!=0){
					show_list(data);
		  	}
		   },
		   error: function(){
		      alert('请稍后从新尝试登录或者联系管理员');
	      	localStorage.clear();
	      	window.location.href = './login.html';
		  }
		});
	}


	function show_list (exam_list) {
		var a = exam_list.length;
		if (a!= 0) {
			for (var i = 0; i < a; i++) {
				var arr='<li class="" data-id='+exam_list[i].id+'><h6 class="name">' + exam_list[i].name + '</h6><p class="time">' + exam_list[i].created_at + '</p></li>'
				$('.list-ul').append(arr);
				$('.list-ul li').eq(0).addClass('active');
			};
		};
		show_test_cont($('.list-ul li').eq(0).data('id'));
	}



	// 显示考试信息
	function show_test_cont(exam_list_id){
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/exams/"+exam_list_id,
		  headers: {'Authorization': "Bearer " + isLogin},
		  dataType: "JSON",
		  success: function(data){
		   	console.log(data);
		    show_detail(data,exam_list_id);
		   },
		   error: function(){
		    alert('请稍后从新尝试登录或者联系管理员');
      	localStorage.clear();
      	window.location.href = './login.html';
		  }
		});
	}



	function show_detail(detail_data,test_id){
		$('#test-title').text(detail_data.name);
		$('#test-title').attr('data-id',test_id);
		$('.test-name').val(detail_data.name);//考试名称
		$('.test-name').attr('data-id',test_id);
		$('.test-grade').val(detail_data.grade.name);//考试班级
		$('.test-grade').attr('data-id',detail_data.grade.id);
		$('.range').val(detail_data.range);//查看范围
		// 班级信息
		$('#show-class').html('');
		var classrooms_length = detail_data.exam_classrooms.length;
		for (var i = 0; i < classrooms_length; i++) {
			var class_arr='<li class="on">'+ detail_data.exam_classrooms[i].name +'<i class="iconfont">&#xe619;</i></li>';
			$('#show-class').append(class_arr);
		};
		// 科目信息
		// detail_data.subjects.name;
		// $('#modal-list').html('');
		// var all_grade = '<li><div class="check-box"><input type="checkbox" value="0" id="modal-all" class="check" name="modal-subject"><label for="modal-all">全部</label></div></li>' ;
		// $('#modal-list').append(all_grade);
		$('.subject-list tbody').html('');
		on_checked =[];
		var subjects_length = detail_data.subjects.length;
		for (var i = 0; i < subjects_length; i++) {
			// 表格列表信息
			var list_tr='<tr><td exam_subject_id="'+detail_data.subjects[i].exam_subject_id+'"  data-id="'+detail_data.subjects[i].id+'" class="subject-name">'+ detail_data.subjects[i].name +'</td><td class="count">'+ detail_data.student_total +'</td><td class="operation"><a href="javascript:;" class="set"><i class="iconfont">&#xe60f;</i>试卷设置</a><a href="javascript:;" class="sign"><i class="iconfont">&#xe612;</i>权限分配</a><a href="javascript:;" class="dele"><i class="iconfont">&#xe616;</i>删除科目</a></td></tr>';
			$('.subject-list tbody').append(list_tr);
			on_checked[i] = detail_data.subjects[i].id;
		};
	}



	var height = $(window).height()-$('#header').height()-$('#footer').height()- $('.title-box').height()-100;
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
	// 搜索考试
	$('#search-test').on('change', function() {
		var str_name = $(this).val();
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/exams",
			data:{'keyword':str_name },
		  headers: {'Authorization': "Bearer " + isLogin},
		  success: function(data){
		  	console.log(data.id,data);
		   	// 显示已搜索到的考试信息
		   	$('.list-ul').html('');
		  	show_list (data);
		   },
		  error: function(){
	      alert('请稍后从新尝试登录或者联系管理员');
      	localStorage.clear();
      	window.location.href = './login.html';
		  }
		});
	});
	$('#search-btn').on('click',function() {
		$('#search-test').change();
	});
	// 下拉加载
	$('.list-ul').unbind('scroll').bind('scroll', function(){
    var sum = this.scrollHeight;
    if (sum <= $(this).scrollTop() + $(this).height()) {
      list_page++;
      console.log(list_page);
      first_list();
    }
  });




	// 新建考试
	$('#new-test').on('click', function(){
		$('.first-new').show().siblings().hide();
		$('#test-form')[0].reset();
	})

// 获取年级
		$.ajax({
	  	url:ajaxIp+"/api/v2/commons/school_grades",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	type:"get",
	  	dataType: "JSON",
	  	success:function(data){
	  		// console.log(data);
	  		show_grade(data);//显示所有年级
	  	},
		  error: function(){
	      alert('请稍后从新尝试登录或者联系管理员');
      	localStorage.clear();
      	window.location.href = './login.html';
		  }
	  });




  // 显示年级信息
  function show_grade (grade_list) {
  	console.log(grade_list)
  	var grade_length = grade_list.length;
  	for (var i = 0; i < grade_length; i++) {
  		var option_name = '<option data-id="'+ grade_list[i].id +'">'+ grade_list[i].name+'</option>';
  		$('#test-grade').append(option_name);
  	};
  	$('#test-grade').attr('data-id',grade_list[0].id);
  	show_class(grade_list[0].id);
  }

	// 获取班级
	function show_class(show_grade_id){
		console.log(show_grade_id)
		$.ajax({
	  	url:ajaxIp+"/api/v2/commons/"+ show_grade_id +"/grade_classrooms",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	dataType: "JSON",
	  	type:"get",
	  	success:function(data){
	  		console.log(data)
	  		show_class_detail(data);//显示所有班级
	  	},
	  	error: function(){
	      alert('请稍后从新尝试登录或者联系管理员');
      	localStorage.clear();
      	window.location.href = './login.html';
		  }
	  });
	  showSubjectModal(show_grade_id);//新建科目显示modal层的科目方法
	  showSubjectAll(show_grade_id);//新建考试信息的时候显示对应班级所有科目信息
	}


	//新建科目显示modal层的科目方法
	function showSubjectModal(show_grade_id){
		$.ajax({
	  	url:ajaxIp+"/api/v2/commons/"+ show_grade_id +"/grade_subjects",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	dataType: "JSON",
	  	type:"get",
	  	success:function(data){
	  		// console.log(data)
	  		show_subject_details(data);
	  	},
	  	error: function(){
	      alert('请稍后从新尝试登录或者联系管理员');
      	localStorage.clear();
      	window.location.href = './login.html';
		  }
	  });
	}

	// 新建考试信息的时候显示对应班级所有科目信息
	function showSubjectAll(show_grade_id){
		$.ajax({
	  	url:ajaxIp+"/api/v2/commons/"+ show_grade_id +"/grade_subjects",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	dataType: "JSON",
	  	type:"get",
	  	success:function(data){
	  		// console.log(data)
	  		show_subject_detail(data);
	  	},
	  	error: function(){
	      alert('请稍后从新尝试登录或者联系管理员');
      	localStorage.clear();
      	window.location.href = './login.html';
		  }
	  });
	}

	// 显示班级
	function show_class_detail(class_info){
		console.log(class_info);
		// console.log(class_info.length);
		for (var i = 0; i < class_info.length; i++) {
			var class_li ='<li><div class="check-box"><input id= "class-id'+ i +'" type="checkbox" value="'+ class_info[i].name +'" data-id="'+ class_info[i].id +'" class="check" name="check"><label for="class-id'+ i +'">'+ class_info[i].name +'</label></div></li>';
			$('#grade').append(class_li);
			// $('#modal-list').append(class_li);
		};
	}


	// 显示所有科目
	function show_subject_detail(subject_info){
		for (var i = 0; i < subject_info.length; i++) {
			var subject_li ='<li><div class="check-box"><input id= "subject-id'+ i +'" type="checkbox" value="'+ subject_info[i].name +'" data-id="'+ subject_info[i].id +'" class="check" name="subject-check"><label for="subject-id'+ i +'">'+ subject_info[i].name +'</label></div></li>';
			$('#subject').append(subject_li);
		};
	}
	// 显示弹窗科目
	function show_subject_details(subject_info){
		// $('#modal-list').html('');
		console.log(subject_info,on_checked);
		if(subject_info.length==on_checked.length){
			$('#modal-list').find('#modal-all').attr('checked', 'true');
		}
		for (var i = 0; i < subject_info.length; i++) {
			for (var j = 0; j < on_checked.length; j++) {
				if(subject_info[i].id==on_checked[j]){
						var subject_arr = '<li><div class="check-box"><input checked type="checkbox" data-id="'+ subject_info[i].id +'" value="'+ subject_info[i].name +'" id="modal-check'+ i +'" class="check" name="modal-check"><label for="modal-check'+ i +'">'+ subject_info[i].name +'</label></div></li>';
						break;
				}else{
					var subject_arr = '<li><div class="check-box"><input type="checkbox" data-id="'+ subject_info[i].id +'" value="'+ subject_info[i].name +'" id="modal-check'+ i +'" class="check" name="modal-check"><label for="modal-check'+ i +'">'+ subject_info[i].name +'</label></div></li>';
				}
			};
			$('#modal-list').append(subject_arr);
		};
	}
 // 考试年级选择事件
	$('body').on('change', '#test-grade', function() {
		var grade_name = $(this).find("option:selected").val();
		var grade_data_id = $(this).find("option:selected").data('id');
		console.log(grade_name,grade_data_id);
		$('#grade').html('');
		var all_grade = '<li class="all"><div class="check-box"><input type="checkbox" value="0" id="all" class="checkall" name="checkall"><label for="all">全部</label></div></li>' ;
		$('#grade').append(all_grade);
		$('#subject').html('');
		var all_subject = '<li class="all"><div class="check-box"><input type="checkbox" value="0" id="subject-all" class="checkall" name="checkall"><label for="subject-all">全部</label></div></li>' ;
		$('#subject').append(all_subject);
		show_class(grade_data_id);
	});


	// 提交新建考试表单
	$('#submit').on('click', function() {
		var school_name = $('input[name="school"]').val();
		var test_grade = $('#test-grade').find("option:selected").data('id');
		var test_range = $('#test-range').val();
		var test_class = $('#grade').find("input[type='checkbox']:checked").length;
		var test_subject = $('#subject').find("input[type='checkbox']:checked").length;
		var class_arr = [];
		var sub_arr = [];
		for (var i = 0; i < test_class; i++) {
			class_arr.push($($('#grade').find("input[type='checkbox']:checked")[i]).data('id'));
		};
		// console.log(class_arr)
		if($('#grade').find('#all').is(':checked')){
			class_arr.shift();
			class_arr;
		}
		for (var i = 0; i < test_subject; i++) {
			sub_arr.push($($('#subject').find("input[type='checkbox']:checked")[i]).data('id'));
		};
		if($('#subject').find('#subject-all').is(':checked')){
			sub_arr.shift();
			sub_arr;
		}
		if(!school_name){
			alert("请填写考试名称");
		}
		if(school_name && test_grade && test_range && test_class!=0 && test_subject!=0){
			var test_json ={
				'name': school_name,
				'grade_id': test_grade,
				'range': test_range,
				'exam_classrooms': class_arr,
				'subjects': sub_arr,
			}
			console.log(test_json);
			$.ajax({
		  	url:ajaxIp+"/api/v2/exams",
		  	headers: {'Authorization': "Bearer " + isLogin},
		  	data:test_json,
		  	type:"post",
		  	success:function(data){//ajax返回的数据
		  		$('.list-ul').html('');
		  		list_page = 1;
		  		first_list();
		  		$('.first-new').hide();
		  		$('.second-new').show();
		  	},
		  	error: function(){
		      alert('请稍后从新尝试登录或者联系管理员');
	      	localStorage.clear();
	      	window.location.href = './login.html';
			  }
		  });
		}
	});
	$('body').on('click', '#new-create', function() {
		console.log(on_checked);
		$('#modal-list').html('');
		var all_subject = '<li class="all"><div class="check-box"><input type="checkbox" value="0" id="modal-all" class="checkall" name="checkall"><label for="modal-all">全部</label></div></li>' ;
		$('#modal-list').append(all_subject);
		var grade_data_id = $('.test-grade').attr('data-id');
		console.log(grade_data_id);
		showSubjectModal(grade_data_id);
	});



	 // 新增科目
	$('body').on('click', '#confirm-sub', function() {
		var sub_arr = [];
		var test_subject = $('#modal-list').find("input[type='checkbox']:checked").length;
		for (var i = 0; i < test_subject; i++) {
			sub_arr.push($($('#modal-list').find("input[type='checkbox']:checked")[i]).data('id'));
		};
		if($('#modal-list').find('#modal-all').is(':checked')){
			sub_arr.shift();
			sub_arr;
		}
		console.log(sub_arr);
		var subject_json={'subjects': sub_arr};
		console.log(subject_json);
		var grade_data_id = $('.test-grade').attr('data-id');
		var test_id = $('.test-name').attr('data-id');
		$.ajax({
	  	url:ajaxIp+"/api/v2/exam_subjects",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	data:{'exam_id':test_id,'subject_ids':sub_arr},
	  	type:"POST",
	  	success:function(data){
	  		console.log(data);
	  		show_test_cont(test_id);
	  	},
	  	error: function(){
	      alert('请稍后从新尝试登录或者联系管理员');
      	localStorage.clear();
      	window.location.href = './login.html';
		  }
	  });
	});




	// 表单重置
	$('#cancel').on('click', function() {
		$("#test-form")[0].reset();
	});


	// 班级选择
	$('body').on('click', '#all', function() {
		$("input[name=check]").prop('checked', this.checked);
	});



	$('body').on('click', 'input[name="check"]', function() {
		var $graBox = $("input[name='check']");
		// $graBox.length=$("input[name='check']").length;
		console.log($("input[name='check']:checked").length,$graBox.length);
		$("#all").prop("checked",$graBox.length == $("input[name='check']:checked").length ? true : false);
	});


	// 科目选择
	$('body').on('click', '#subject-all', function() {
		$("input[name=subject-check]").prop('checked', this.checked);
	});
	$('body').on('click', 'input[name="subject-check"]', function() {
		var $subBox = $("input[name='subject-check']");
		$("#subject-all").prop("checked",$subBox.length == $("input[name='subject-check']:checked").length ? true : false);
	});



	// 科目选择2
	$('body').on('click', '#modal-all', function() {
		$("input[name=modal-check]").prop('checked', this.checked);
	});

	$('body').on('click', "input[name='modal-check']", function() {
		var $subBox = $("input[name='modal-check']");
		$("#modal-all").prop("checked",$subBox.length == $("input[name='modal-check']:checked").length ? true : false);
	});



	// 修改考试名称
	$('#edit').on('click',function(){
		$(this).prev().removeAttr("disabled").removeClass('finished');
		$(this).prev().addClass('border-focus');
	});
	// 保存修改后的考试名称
	$('body').on('blur', '#edit-name', function() {
		var new_name = $(this).val();
		$(this).removeClass('border-focus');
		// $('#test-title').text(new_name);
		var test_id = $(this).attr('data-id');
		$.ajax({
	  	url:ajaxIp+"/api/v2/exams/"+test_id,
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	type:"put",
	  	data:{'name': new_name },
	  	success:function(data){
	  		console.log(data);
	  		$('.list-ul').html('');
	  		list_page = 1;
	  		first_list();
	  	},
	  	error: function(){
	      alert('请稍后从新尝试登录或者联系管理员');
      	localStorage.clear();
      	window.location.href = './login.html';
		  }
	  });
	});


	// 新建科目
	$('#new-create').on('click', function() {
		$('.modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-shadow').animate({'opacity': .3},500);
		$('#new-modal').show();
	});


	// 删除科目
	$('body').on('click','.dele', function() {
		$('.modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-shadow').animate({'opacity': .3},500);
		$('#dele-modal').show();
		// 获取科目信息
		var subject_name = $(this).parents('tr').find('.subject-name').text();
		$('#dele-modal .dele-cont p a').text(subject_name);
		var subject_id = $(this).parents('tr').find('.subject-name').attr('exam_subject_id');
		$('#dele-modal .dele-cont p a').attr('exam_subject_id',subject_id)
	});
	$('body').on('click', '.confirm-dele', function() {
		var exam_subject_id = $('#dele-modal .dele-cont p a').attr('exam_subject_id');
		console.log(exam_subject_id);
		$.ajax({
	  	url:ajaxIp+"/api/v2/exam_subjects/"+exam_subject_id,
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	type:"DELETE",
	  	success:function(data){
	  		console.log(data);
	  		var test_id = $('.test-name').attr('data-id');
	  		show_test_cont(test_id);
	  	},
	  	error: function(){
	      alert('请稍后从新尝试登录或者联系管理员');
      	localStorage.clear();
      	window.location.href = './login.html';
		  }
	  });
	});
	// 删除考试
	$('body').on('click','#dele-test', function() {
		$('.modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-shadow').animate({'opacity': .3},500);
		$('#dele-testmodal').show();
		// 获取此次考试的信息
		var test_name = $(this).parents('.title-name').find('#test-title').text();
		$('#dele-testmodal .dele-cont p a').text(test_name);
		var test_id = $(this).parents('.title-name').find('#test-title').attr('data-id');
		$('#dele-testmodal .dele-cont p a').attr('data-id',test_id);
	});
	$('body').on('click', '.confirm-dele-test', function() {
		var test_id = $('#dele-testmodal .dele-cont p a').attr('data-id');
		console.log(test_id);
		$.ajax({
	  	url:ajaxIp+"/api/v2/exams/"+test_id,
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	type:"DELETE",
	  	success:function(data){
	  		console.log(data);
	  		$('.list-ul').html('');
	  		list_page = 1;
	  		first_list();
	  	},
	  	error: function(){
	      alert('请稍后从新尝试登录或者联系管理员');
      	localStorage.clear();
      	window.location.href = './login.html';
		  }
	  });
	});

	// 试卷设置
	$('body').on('click', '.set', function() {
		$('.paper-set').show().siblings().hide();
	});
})