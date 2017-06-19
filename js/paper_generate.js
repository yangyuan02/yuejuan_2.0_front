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
		console.log(exam_list)
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
		$('.teacher-set').hide();
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
    // console.log(sum,$(this).scrollTop(),$(this).height())
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
	// 权限分配
	$('body').on('click', '.sign', function() {
		var subject_name = $(this).parents('tr').find('.subject-name').text();
		// 考试id
		var exam_id = $('#test-title').attr('data-id');
		// 考试科目ID
		var exam_subject_id = $(this).parents('tr').find('.subject-name').attr('exam_subject_id');

		var subject_id = $(this).parents('tr').find('.subject-name').attr('data-id');
		$('.teacher-set .title-name').find('#subject-title').text(subject_name);
		$('.teacher-set .title-name').find('#subject-title').attr('exam-id',exam_id);
		$('.teacher-set .title-name').find('#subject-title').attr('exam_subject_id',exam_subject_id);
		$('.teacher-set .title-name').find('#subject-title').attr('data-id',subject_id);
		$('.teacher-set').show().siblings().hide();
		show_item_group(exam_subject_id);
	});
	var item_groups;
	// 显示该考试的题组
	function show_item_group(exam_subject_id){
		$.ajax({
	  	url:ajaxIp+"/api/v2/exam_subjects/"+exam_subject_id+"/subjective_item",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	type:"GET",
	  	success:function(data){
	  		console.log(data);
	  		item_groups = data;
	  		var exam_id = $('#test-title').attr('data-id');
	  		show_check_teacher(exam_id,exam_subject_id);
	  		// show_html_item(data);
	  	},
	  	error: function(){
	      alert('请稍后从新尝试登录或者联系管理员');
      	localStorage.clear();
      	window.location.href = './login.html';
		  }
	  });
	}
	function show_html_item(item_group,data_teacher){
		console.log(item_group);
		console.log(data_teacher)
		var item_length = item_group.length;
		for (var i = 0; i < item_length; i++) {
			console.log(item_group[i].id);
		};
	}
	// 显示当前科目考试的审核老师
	function show_check_teacher(exam_id,exam_subject_id){
		$('.look-table tbody').html('');
		$.ajax({
	  	url:ajaxIp+"/api/v2/exam_subjects/relation_teacher",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	type:"GET",
	  	data:{'exam_id':exam_id,'exam_subject_id':exam_subject_id},
	  	success:function(data){
	  		show_item_detail(data);
	  		var data_teacher = data;
	  		console.log(data_teacher);
	  	},
	  	error: function(){
	      alert('请稍后从新尝试登录或者联系管理员');
      	localStorage.clear();
      	window.location.href = './login.html';
		  }
	  });
	}
	function show_item_detail(data_teacher){
 		var items_length = item_groups.length;
		var teacher_length = data_teacher.length;
		for (var i = 0; i < items_length; i++) {
			var arr_num =[];
			for (var j = 0; j < teacher_length; j++) {
				if(item_groups[i].id == data_teacher[j].answer_id){
					arr_num.push(j);
					console.log(item_groups[i].id,data_teacher[j].name);
					var item_li ='<tr><td width="80" data-id="'+item_groups[i].id+'">'+item_groups[i].name +'</td><td width="375"><ul class="teacher-list examination_'+item_groups[i].id +'"></ul><a class="add" href="javascript:;"><i class="iconfont">&#xe61a;</i>添加</a></td><td width="375"><ul class="teacher-list reviewed_'+item_groups[i].id +'"></ul><a class="add" href="javascript:;"><i class="iconfont">&#xe61a;</i>添加</a></td></tr>';
				}
			};
			$('.look-table tbody').append(item_li);
			console.log(arr_num,i,j);
			for (var z = 0; z < arr_num.length; z++) {
				console.log(data_teacher[arr_num[z]].name);
				console.log(data_teacher[arr_num[z]].type);
				var li_cont = '<li class="on" anser-id="'+data_teacher[arr_num[z]].answer_id+'"><span data-id="'+data_teacher[arr_num[z]].id+'">' + data_teacher[arr_num[z]].name +'</span> <i class="iconfont">&#xe61b;</i></li>';
				// 判断是否为阅卷老师
				if (data_teacher[arr_num[z]].type=='examination') {
					$('.examination_'+item_groups[i].id +'').append(li_cont);
				}
				// 判断是否为审核老师
				if (data_teacher[arr_num[z]].type=='reviewed') {
					$('.reviewed_'+item_groups[i].id +'').append(li_cont);
				}
			};

		};
	}


	// 权限分配页面功能－－start
	// 返回功能
	$('body').on('click', '#sign-subject .back', function() {
		var exam_id = $('#subject-title').attr('exam-id');
		show_test_cont(exam_id);
		$('.teacher-set').hide();
		$('.second-new').show();
	});
	// 添加老师
	$('body').on('click','.add', function() {
		$('.modal-main').css('width','765px');
		$('.modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-shadow').animate({'opacity': .3},500);
		$('#teacher-modal').show();
		// 获取年级
		$.ajax({
	  	url:ajaxIp+"/api/v2/commons/school_grades",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	type:"get",
	  	dataType: "JSON",
	  	success:function(data){
	  		console.log(data);
	  		show_modal_grade(data);//显示所有年级
	  	},
		  error: function(){
	      alert('请稍后从新尝试登录或者联系管理员');
	    	localStorage.clear();
	    	window.location.href = './login.html';
		  }
	  });
	  request_teacher();
	});

	var teachr_list_page = 1;
	function request_teacher(grade_id,subject_id){
		if (grade_id == undefined && subject_id == undefined) {
			$.ajax({
		  	url:ajaxIp+"/api/v2/teachers",
		  	headers: {'Authorization': "Bearer " + isLogin},
		  	dataType: "JSON",
		  	type:"get",
		  	data:{'page':teachr_list_page,'limit':10,},
		  	success:function(data){
		  		console.log(grade_id,data);
		  		show_modal_teacher_list(data);
		  	},
		  	error: function(){
		      alert('请稍后从新尝试登录或者联系管理员');
	      	localStorage.clear();
	      	window.location.href = './login.html';
			  }
		  });
		}else{
			console.log(grade_id,subject_id)
			teachr_list_page=1
			$.ajax({
		  	url:ajaxIp+"/api/v2/teachers",
		  	headers: {'Authorization': "Bearer " + isLogin},
		  	dataType: "JSON",
		  	type:"get",
		  	data:{'page':teachr_list_page,'limit':10,'grade_id':grade_id,'subject_id':subject_id},
		  	success:function(data){
		  		console.log(grade_id,data);
		  		show_modal_teacher_list(data);
		  	},
		  	error: function(){
		      alert('请稍后从新尝试登录或者联系管理员');
	      	localStorage.clear();
	      	window.location.href = './login.html';
			  }
		  });
	  }
	}
	function show_modal_grade(modal_grade){
		$('#change-grade').html('');
  	var grade_length = modal_grade.length;
  	var option_first = '<option data-id="all-grade" >所有年级</option>';
  	$('#change-grade').append(option_first);
  	for (var i = 0; i < grade_length; i++) {
  		var option_name = '<option data-id="'+ modal_grade[i].id +'">'+ modal_grade[i].name+'</option>';
  		$('#change-grade').append(option_name);
  	};
  	$('#change-grade').attr('data-id','all-grade');
  	show_modal_subject(modal_grade[0].id);
	}

	function show_modal_subject(show_grade_id){
		$.ajax({
	  	url:ajaxIp+"/api/v2/commons/"+ show_grade_id +"/grade_subjects",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	dataType: "JSON",
	  	type:"get",
	  	success:function(data){
	  		console.log(data)
	  		show_modal_subject_detail(data);
	  	},
	  	error: function(){
	      alert('请稍后从新尝试登录或者联系管理员');
      	localStorage.clear();
      	window.location.href = './login.html';
		  }
	  });
	}
	function show_modal_subject_detail(subject_detail){
		var s_length = subject_detail.length;
		var option_first = '<option data-id="all-subject" >所有科目</option>';
  	$('#change-subject').append(option_first);
		for (var i = 0; i < s_length; i++) {
			var subject_option = '<option data-id='+subject_detail[i].id+'>'+subject_detail[i].name+'</option>';
			$('#change-subject').append(subject_option);
		};
		$('#change-subject').attr('data-id','all-subject');
	}
		// 显示教师列表
	function show_modal_teacher_list(teacher_detail){
		console.log(teacher_detail.length);
		if (teacher_detail.length != 0 && teacher_detail.length < 10) {
			$('.teacher-left-list').html('');
			var list_length = teacher_detail.length;
			for (var i = 0; i < list_length; i++) {
				var teacher_li = '<li class="clear"><span class="left"><span data-id="'+teacher_detail[i].id+'">'+teacher_detail[i].real_name+'</span>@<span data-id="'+teacher_detail[i].school.id+'">'+teacher_detail[i].school.name+'</span></span><div class="check_box right"><input type="checkbox" value="" id="teacher'+i+'" class="" name="teacher-name"><label for="teacher'+i+'"></label></div></li>';
				$('.teacher-left-list').append(teacher_li);
			};
		}else if(teacher_detail.length >= 10){
			var list_length = teacher_detail.length;
			for (var i = 0; i < list_length; i++) {
				var teacher_li = '<li class="clear"><span class="left"><span data-id="'+teacher_detail[i].id+'">'+teacher_detail[i].real_name+'</span>@<span data-id="'+teacher_detail[i].school.id+'">'+teacher_detail[i].school.name+'</span></span><div class="check_box right"><input type="checkbox" value="" id="teacher'+i+'" class="" name="teacher-name"><label for="teacher'+i+'"></label></div></li>';
				$('.teacher-left-list').append(teacher_li);
			};
		}
	}

	 // 考试年级选择事件
	$('body').on('change', '#change-grade', function() {
		var grade_name = $(this).find("option:selected").val();
		var grade_data_id = $(this).find("option:selected").data('id');
		if(grade_data_id !== 'all-grade'){
			$('#change-subject').html('');
			show_modal_subject(grade_data_id);
			$('.teacher-left-list').html('');
			request_teacher(grade_data_id);
		}else{
			request_teacher();
		}
	});
	// 考试科目选择事件
	$('body').on('change', '#change-subject', function() {
		var subject_name = $(this).find("option:selected").val();
		var gg_id = $('#change-grade').find("option:selected").data('id');
		var subject_data_id = $(this).find("option:selected").data('id');
		console.log(subject_name,subject_data_id);
		$('.teacher-left-list').html('');
		request_teacher(gg_id,subject_data_id);
		if (subject_data_id =='all-subject') {
			request_teacher(gg_id);
		};
	});

	// 教师列表下拉加载
	$('.teacher-left-list').unbind('scroll').bind('scroll', function(){
    var sum = this.scrollHeight;
    if (sum <= $(this).scrollTop() + $(this).height()) {
      teachr_list_page++;
      var grade_id = $('#change-grade').find("option:selected").data('id');
			var subject_id = $('#change-subject').find("option:selected").data('id');
			console.log(grade_id,subject_id)
			if(grade_id =='all-grade' && subject_id =='all-subject'){
				request_teacher();
			}
			if(grade_id !=='all-grade' && subject_id =='all-subject'){
				request_teacher(grade_id);
			}
			if(grade_id !=='all-grade' && subject_id !=='all-subject'){
				request_teacher(grade_id,subject_id);
			}
    }
  });
	// 教师全选
	$('body').on('click', '#all-teacher', function() {
		$("input[name=teacher-name]").prop('checked', this.checked);
	});

	$('body').on('click', 'input[name="teacher-name"]', function() {
		var $graBox = $("input[name='teacher-name']");
		// $graBox.length=$("input[name='teacher-name']").length;
		console.log($("input[name='teacher-name']:checked").length,$graBox.length);
		$("#all-teacher").prop("checked",$graBox.length == $("input[name='teacher-name']:checked").length ? true : false);
	});


	// 权限分配页面功能－－end
})