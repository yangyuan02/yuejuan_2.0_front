$(function() {

	var list_page = 1;
	var limit = 10;
	var exam_list;
	var on_checked = [];
	var isLogin = localStorage.getItem("token");
	var back_page = parseInt(localStorage.this_page);
	if(back_page){
		limit = back_page*10;
	}
	first_list(list_page);
	localStorage.removeItem("this_page");


	function first_list(list_page) {
		console.log(list_page)
		$.ajax({
			type: "GET",
			url: ajaxIp + "/api/v2/exams",
			data: {
				'page': list_page,
				'limit': limit
			},
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			dataType: "JSON",

			success: function(data) {
				console.log(data,list_page)
				if (data.length != 0) {
					show_list(data,list_page);
				}
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	}


	// show_test_cont(local_id);
	// localStorage.removeItem("test_local_id");
	function show_list(exam_list,list_page) {
		console.log(exam_list)
		var a = exam_list.length;
		console.log(a)
		if (a != 0) {
			for (var i = 0; i < a; i++) {
				var arr = '<li data-page="'+list_page+'" class="exam-' + exam_list[i].id + '" data-id=' + exam_list[i].id + '><h6 class="name">' + exam_list[i].name + '</h6><p class="time">' + exam_list[i].created_at + '</p></li>'
				$('.list-ul').append(arr);
				// 判断没有选中的列表，默认第一个选中，并显示详情
				// var first_id = $('.list-ul li').eq(0).data('id');
				// console.log(first_id)
				if (!$('.list-ul li').hasClass('active')) {
					$('.list-ul li').eq(0).addClass('active');
					show_test_cont($('.list-ul li').eq(0).data('id'),$('.list-ul li').eq(0).attr('data-page'));
				}
			};
		};
		var local_id = parseInt(localStorage.test_local_id);
		console.log(local_id,back_page);
		if (local_id) {
			show_test_cont(local_id,back_page);
			var local_li = $('body').find('.list-ul li');
			var local_li_length = local_li.length;
			for (var i = 0; i < local_li_length; i++) {
				if (local_id == $(local_li[i]).attr('data-id')) {
					$(local_li[i]).addClass('active').siblings().removeClass('active');
				}
			};
		}
		localStorage.removeItem("test_local_id");
		// show_test_cont($('.list-ul li').eq(0).data('id'));
	}



	// 显示考试信息
	function show_test_cont(exam_list_id,data_page) {
		$.ajax({
			type: "GET",
			url: ajaxIp + "/api/v2/exams/" + exam_list_id,
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			dataType: "JSON",
			success: function(data) {
				console.log(data);
				window.localStorage.setItem("test_name",data.name)
				show_detail(data, exam_list_id,data_page);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// 	localStorage.clear();
				// 	window.location.href = './login.html';
			}
		});
	}



	function show_detail(detail_data, test_id,data_page) {
		$('#test-title').text(detail_data.name);
		$('#test-title').attr('data-id', test_id);
		$('#test-title').attr('data-page', data_page);
		$('.test-name').val(detail_data.name); //考试名称
		$('.test-name').attr('data-id', test_id);
		// $('.test-grade').val(detail_data.grade.name); //考试班级
		// $('.test-grade').attr('data-id', detail_data.grade.id);
		$('.range').val(detail_data.range); //查看范围
		// 班级信息
		// $('#show-class').html('');
		// var classrooms_length = detail_data.exam_classrooms.length;
		// for (var i = 0; i < classrooms_length; i++) {
		// 	var class_arr = '<li class="on">' + detail_data.exam_classrooms[i].name + '<i class="iconfont">&#xe619;</i></li>';
		// 	$('#show-class').append(class_arr);
		// };
		// 科目信息
		// detail_data.subjects.name;
		// $('#modal-list').html('');
		// var all_grade = '<li><div class="check-box"><input type="checkbox" value="0" id="modal-all" class="check" name="modal-subject"><label for="modal-all">全部</label></div></li>' ;
		// $('#modal-list').append(all_grade);
		$('.subject-list tbody').html('');
		on_checked = [];
		var subjects_length = detail_data.subjects.length;
		for (var i = 0; i < subjects_length; i++) {
			// 表格列表信息
			var list_tr = '<tr><td exam_subject_id="' + detail_data.subjects[i].exam_subject_id + '" batch-id="' + detail_data.subjects[i].batch_id + '" data-id="' + detail_data.subjects[i].id + '" class="subject-name">' + detail_data.subjects[i].name + '</td><td class="count">' + detail_data.student_total + '</td><td class="operation"><a href="javascript:(0);" class="set setAnswer"><i class="iconfont">&#xe60f;</i>试卷设置</a><a href="javascript:;" class="sign"><i class="iconfont">&#xe612;</i>权限分配</a><a href="javascript:;" class="dele"><i class="iconfont">&#xe616;</i>删除科目</a><a class="look-paper"><i class="iconfont">&#xe61e;</i>查看试卷</a></td></tr>';
			$('.subject-list tbody').append(list_tr);
			on_checked[i] = detail_data.subjects[i].id;
		};
		// 考试角色判断是否有权限操作修改删除功能
		console.log(!detail_data.is_modify)
		if (!detail_data.is_modify) {
			// $('.dele').hide();
			// $('#edit').hide();
			// $('#new-create').hide();
			$('#operation-th').hide();
			$('.operation').hide();
			$('.request-school').hide();
			$('#dele-test').hide();
		} else {
			$('.operation').show();
			$('#operation-th').show();
			$('.request-school').show();
			$('#dele-test').show();
		}
	}



	var height = $(window).height() - $('#header').height() - $('#footer').height() - $('.title-box').height() - 100;
	$('.list-ul').css({
		'height': height,
		'max-height': height
	});

	// 考试列表切换
	$('body').on('click', '.list-ul li', function() {
		$('.first-new').hide();
		$('.teacher-set').hide();
		$('.second-new').show();
		$(this).addClass('active').siblings().removeClass('active');
		// console.log($(this).data('id'));
		show_test_cont($(this).data('id'),$(this).attr('data-page'));
	})
		// 搜索考试
	$('#search-test').on('change', function() {
		var str_name = $(this).val();
		$.ajax({
			type: "GET",
			url: ajaxIp + "/api/v2/exams",
			data: {
				'keyword': str_name
			},
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			success: function(data) {
				console.log(data.id, data);
				// 显示已搜索到的考试信息
				if (data.length) {
					$('.list-ul').html('');
					show_list(data);
					$('.second-new').show();
				} else {
					$('.list-ul').html('');
					$('.list-ul').html('<div style="text-align: center;color: #999;margin: 25px;">没有搜到相关考试，请重新搜索...</div>')
					$('.second-new').hide();
				}
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	});
	$('#search-btn').on('click', function() {
		$('#search-test').change();
	});
	// 下拉加载
	$('.list-ul').unbind('scroll').bind('scroll', function() {
		var sum = this.scrollHeight;
		// console.log(sum,$(this).scrollTop(),$(this).height())
		if (sum <= $(this).scrollTop() + $(this).height()) {
			list_page++;
			// console.log(list_page);
			first_list(list_page);
		}
	});



	// 新建考试
	$('#new-test').on('click', function() {
		$('.first-new').show().siblings().hide();
		$('#test-form')[0].reset();
		showSubjectAll();
	})

	// 获取年级
	// $.ajax({
	// 	url: ajaxIp + "/api/v2/commons/school_grades",
	// 	headers: {
	// 		'Authorization': "Bearer " + isLogin
	// 	},
	// 	type: "get",
	// 	dataType: "JSON",
	// 	success: function(data) {
	// 		// console.log(data);
	// 		show_grade(data); //显示所有年级
	// 	},
	// 	error: function() {
	// 		//  alert('请稍后从新尝试登录或者联系管理员');
	// 		// localStorage.clear();
	// 		// window.location.href = './login.html';
	// 	}
	// });



	// 显示年级信息
	// function show_grade(grade_list) {
	// 	// console.log(grade_list)
	// 	var grade_length = grade_list.length;
	// 	for (var i = 0; i < grade_length; i++) {
	// 		var option_name = '<option data-id="' + grade_list[i].id + '">' + grade_list[i].name + '</option>';
	// 		$('#test-grade').append(option_name);
	// 	};
	// 	$('#test-grade').attr('data-id', grade_list[0].id);
	// 	show_class(grade_list[0].id);
	// }

	// 获取班级
	// function show_class(show_grade_id) {
	// 	// console.log(show_grade_id)
	// 	$.ajax({
	// 		url: ajaxIp + "/api/v2/commons/" + show_grade_id + "/grade_classrooms",
	// 		headers: {
	// 			'Authorization': "Bearer " + isLogin
	// 		},
	// 		dataType: "JSON",
	// 		type: "get",
	// 		success: function(data) {
	// 			// console.log(data)
	// 			show_class_detail(data); //显示所有班级
	// 		},
	// 		error: function() {
	// 			// alert('请稍后从新尝试登录或者联系管理员');
	// 			// localStorage.clear();
	// 			// window.location.href = './login.html';
	// 		}
	// 	});
	// 	// showSubjectModal(show_grade_id);//新建科目显示modal层的科目方法
	// 	showSubjectAll(show_grade_id); //新建考试信息的时候显示对应班级所有科目信息
	// }


	//新建科目显示modal层的科目方法
	function showSubjectModal() {
		$.ajax({
			url: ajaxIp + "/api/v2/commons/grade_subjects",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			// data:{'grade_id':show_grade_id},
			dataType: "JSON",
			type: "get",
			success: function(data) {
				console.log(data)
				show_subject_details(data);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	}

	// 新建考试信息的时候显示对应班级所有科目信息
	function showSubjectAll() {
		$.ajax({
			url: ajaxIp + "/api/v2/commons/grade_subjects",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			// data:{'grade_id':show_grade_id},
			dataType: "JSON",
			type: "get",
			success: function(data) {
				console.log(data)
				show_subject_detail(data);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	}

	// 显示班级
	// function show_class_detail(class_info) {
	// 	// console.log(class_info);
	// 	// console.log(class_info.length);
	// 	for (var i = 0; i < class_info.length; i++) {
	// 		var class_li = '<li><div class="check-box"><input id= "class-id' + i + '" type="checkbox" value="' + class_info[i].name + '" data-id="' + class_info[i].id + '" class="check" name="check"><label for="class-id' + i + '">' + class_info[i].name + '</label></div></li>';
	// 		$('#grade').append(class_li);
	// 		// $('#modal-list').append(class_li);
	// 	};
	// }


	// 显示所有科目
	function show_subject_detail(subject_info) {
		$('#subject').html('');
		for (var i = 0; i < subject_info.length; i++) {
			var subject_li = '<li><div class="check-box"><input id= "subject-id' + i + '" type="checkbox" value="' + subject_info[i].name + '" data-id="' + subject_info[i].id + '" class="check" name="subject-check"><label for="subject-id' + i + '">' + subject_info[i].name + '</label></div></li>';
			$('#subject').append(subject_li);
		};
	}
	// 显示弹窗科目
	function show_subject_details(subject_info) {
		$('#onchecked-modal-list').html('');
		// $('#modal-list').html('');
		console.log(subject_info.length, on_checked.length);
		if (subject_info.length == on_checked.length) {
			$('#modal-list').find('.all').hide();
		}
		var subject_list = $('.subject-list').find('.subject-name');
		var subject_length = subject_list.length;
		for (var i = 0; i < subject_length; i++) {
			var subject_arr = '<li class="finished" id="ll-' + i + '" data-id="' + $(subject_list[i]).attr('data-id') + '">' + $(subject_list[i]).text() + '<i class="iconfont">&#xe619;</i></li>';
			$('#onchecked-modal-list').append(subject_arr);
		};
		var arr_gg = [];
		for (var i = 0; i < subject_info.length; i++) {
			var flag = true;
			for (var j = 0; j < on_checked.length; j++) {
				if (subject_info[i].id == on_checked[j]) {
					flag = false;
				}
			};
			if (flag) {
				arr_gg.push(subject_info[i]);
				console.log(arr_gg);
				var subject_arr = '<li><div class="check-box"><input type="checkbox" data-id="' + subject_info[i].id + '" value="' + subject_info[i].name + '" id="modal-check' + i + '" class="check" name="modal-check"><label for="modal-check' + i + '">' + subject_info[i].name + '</label></div></li>';
				$('#modal-list').append(subject_arr);
			}
		}
	}
	// 考试年级选择事件
	// $('body').on('change', '#test-grade', function() {
	// 	var grade_name = $(this).find("option:selected").val();
	// 	var grade_data_id = $(this).find("option:selected").data('id');
	// 	// console.log(grade_name,grade_data_id);
	// 	$('#grade').html('');
	// 	var all_grade = '<li class="all"><div class="check-box"><input type="checkbox" value="0" id="all" class="checkall" name="checkall"><label for="all">全部</label></div></li>';
	// 	$('#grade').append(all_grade);
	// 	$('#subject').html('');
	// 	var all_subject = '<li class="all"><div class="check-box"><input type="checkbox" value="0" id="subject-all" class="checkall" name="checkall"><label for="subject-all">全部</label></div></li>';
	// 	$('#subject').append(all_subject);
	// 	show_class(grade_data_id);
	// });


	// 提交新建考试表单
	$('#submit').on('click', function() {
		var school_name = $('input[name="school"]').val();
		// var test_grade = $('#test-grade').find("option:selected").data('id');
		var test_range = $('#test-range').val();
		// var test_class = $('#grade').find("input[type='checkbox']:checked").length;
		var test_subject = $('#subject').find("input[type='checkbox']:checked").length;
		// var class_arr = [];
		var sub_arr = [];
		// for (var i = 0; i < test_class; i++) {
		// 	class_arr.push($($('#grade').find("input[type='checkbox']:checked")[i]).data('id'));
		// };
		// // console.log(class_arr)
		// if ($('#grade').find('#all').is(':checked')) {
		// 	class_arr.shift();
		// 	class_arr;
		// }
		for (var i = 0; i < test_subject; i++) {
			sub_arr.push($($('#subject').find("input[type='checkbox']:checked")[i]).data('id'));
		};
		if ($('#subject').find('#subject-all').is(':checked')) {
			sub_arr.shift();
			sub_arr;
		}
		if (!school_name) {
			alert("请填写考试名称");
		}
		if (school_name && test_range && test_subject != 0) {
			var test_json = {
					'name': school_name,
					// 'grade_id': test_grade,
					'range': test_range,
					// 'exam_classrooms': class_arr,
					'subjects': sub_arr,
				}
				// console.log(test_json);
			$.ajax({
				url: ajaxIp + "/api/v2/exams",
				headers: {
					'Authorization': "Bearer " + isLogin
				},
				data: test_json,
				type: "post",
				success: function(data) { //ajax返回的数据
					$('.list-ul').html('');
					list_page = 1;
					first_list(list_page);
					$('.first-new').hide();
					$('.second-new').show();
				},
				error: function() {
					// alert('请稍后从新尝试登录或者联系管理员');
					// localStorage.clear();
					// window.location.href = './login.html';
				}
			});
		}
	});
	// 新建科目点击事件
	$('body').on('click', '#new-create', function() {
		console.log(on_checked);
		$('#modal-list').html('');
		var all_subject = '<li class="all"><div class="check-box"><input type="checkbox" value="0" id="modal-all" class="checkall" name="checkall"><label for="modal-all">全部</label></div></li>';
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
		if ($('#modal-list').find('#modal-all').is(':checked')) {
			sub_arr.shift();
			sub_arr;
		}
		console.log(sub_arr);
		var subject_json = {
			'subjects': sub_arr
		};
		// console.log(subject_json);
		var grade_data_id = $('.test-grade').attr('data-id');
		var test_id = $('.test-name').attr('data-id');
		$.ajax({
			url: ajaxIp + "/api/v2/exam_subjects",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			data: {
				'exam_id': test_id,
				'subject_ids': sub_arr
			},
			type: "POST",
			success: function(data) {
				console.log(data);
				show_test_cont(test_id);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
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
		// console.log($("input[name='check']:checked").length,$graBox.length);
		$("#all").prop("checked", $graBox.length == $("input[name='check']:checked").length ? true : false);
	});


	// 科目选择
	$('body').on('click', '#subject-all', function() {
		$("input[name=subject-check]").prop('checked', this.checked);
	});
	$('body').on('click', 'input[name="subject-check"]', function() {
		var $subBox = $("input[name='subject-check']");
		$("#subject-all").prop("checked", $subBox.length == $("input[name='subject-check']:checked").length ? true : false);
	});



	// 科目选择2
	$('body').on('click', '#modal-all', function() {
		$("input[name=modal-check]").prop('checked', this.checked);
	});

	$('body').on('click', "input[name='modal-check']", function() {
		var $subBox = $("input[name='modal-check']");
		$("#modal-all").prop("checked", $subBox.length == $("input[name='modal-check']:checked").length ? true : false);
	});



	// 修改考试名称
	$('#edit').on('click', function() {
		$(this).prev().removeAttr("disabled").removeClass('finished');
		$(this).prev().addClass('border-focus');
	});
	// 保存修改后的考试名称
	$('body').on('blur', '#edit-name', function() {
		var new_name = $(this).val();
		$(this).removeClass('border-focus').attr('disabled', true);
		// $('#test-title').text(new_name);
		var test_id = $(this).attr('data-id');
		$('.exam-' + test_id + '').find('.name').text(new_name);
		$.ajax({
			url: ajaxIp + "/api/v2/exams/" + test_id,
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "put",
			data: {
				'name': new_name
			},
			success: function(data) {
				// console.log(data);
				// $('.list-ul').html('');
				// list_page = 1;
				// first_list();
				show_test_cont(test_id);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	});


	// 新建科目
	$('#new-create').on('click', function() {
		$('.modal-main').animate({
			'top': '50%',
			'opacity': 1
		}, 500);
		$('.modal-shadow').animate({
			'opacity': .3
		}, 500);
		$('#new-modal').show();
	});
	// 添加学生
	$('#new-student').on('click', function() {
		$('.modal-main').animate({
			'top': '50%',
			'opacity': 1,
			// 'width': '765px'
		}, 500);
		$('.modal-shadow').animate({
			'opacity': .3
		}, 500);
		$('#student-modal').show();
	});


	// 删除科目
	$('body').on('click', '.dele', function() {
		$('.modal-main').animate({
			'top': '50%',
			'opacity': 1
		}, 500);
		$('.modal-shadow').animate({
			'opacity': .3
		}, 500);
		$('#dele-modal').show();
		// 获取科目信息
		var subject_name = $(this).parents('tr').find('.subject-name').text();
		$('#dele-modal .dele-cont p a').text(subject_name);
		var subject_id = $(this).parents('tr').find('.subject-name').attr('exam_subject_id');
		$('#dele-modal .dele-cont p a').attr('exam_subject_id', subject_id)
	});
	$('body').on('click', '.confirm-dele', function() {
		var exam_subject_id = $('#dele-modal .dele-cont p a').attr('exam_subject_id');
		// console.log(exam_subject_id);
		$.ajax({
			url: ajaxIp + "/api/v2/exam_subjects/" + exam_subject_id,
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "DELETE",
			success: function(data) {
				// console.log(data);
				var test_id = $('.test-name').attr('data-id');
				show_test_cont(test_id);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	});
	// 删除考试
	$('body').on('click', '#dele-test', function() {
		$('.modal-main').animate({
			'top': '50%',
			'opacity': 1
		}, 500);
		$('.modal-shadow').animate({
			'opacity': .3
		}, 500);
		$('#dele-testmodal').show();
		// 获取此次考试的信息
		var test_name = $(this).parents('.title-name').find('#test-title').text();
		$('#dele-testmodal .dele-cont p a').text(test_name);
		var test_id = $(this).parents('.title-name').find('#test-title').attr('data-id');
		$('#dele-testmodal .dele-cont p a').attr('data-id', test_id);
	});
	$('body').on('click', '.confirm-dele-test', function() {
		var test_id = $('#dele-testmodal .dele-cont p a').attr('data-id');
		// console.log(test_id);
		$.ajax({
			url: ajaxIp + "/api/v2/exams/" + test_id,
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "DELETE",
			success: function(data) {
				// console.log(data);
				$('.list-ul').html('');
				list_page = 1;
				first_list(list_page);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
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
		$('.teacher-set .title-name').find('#subject-title').attr('exam-id', exam_id);
		$('.teacher-set .title-name').find('#subject-title').attr('exam_subject_id', exam_subject_id);
		$('.teacher-set .title-name').find('#subject-title').attr('data-id', subject_id);
		$('.teacher-set').show().siblings().hide();
		show_item_group(exam_subject_id);
	});
	var item_groups;
	// 显示该考试的题组
	function show_item_group(exam_subject_id) {
		$.ajax({
			url: ajaxIp + "/api/v2/exam_subjects/" + exam_subject_id + "/subjective_item",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "GET",
			success: function(data) {
				console.log(data);
				item_groups = data;
				var exam_id = $('#test-title').attr('data-id');
				show_check_teacher(exam_id, exam_subject_id);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	}
	// function show_html_item(item_group,data_teacher){
	// 	console.log(item_group);
	// 	console.log(data_teacher)
	// 	var item_length = item_group.length;
	// 	for (var i = 0; i < item_length; i++) {
	// 		console.log(item_group[i].id);
	// 	};
	// }
	// 显示当前科目考试的审核老师
	function show_check_teacher(exam_id, exam_subject_id) {
		$('.look-table tbody').html('');
		$.ajax({
			url: ajaxIp + "/api/v2/exam_subjects/relation_teacher",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "GET",
			data: {
				'exam_id': exam_id,
				'exam_subject_id': exam_subject_id
			},
			success: function(data) {
				show_item_detail(data);
				var data_teacher = data;
				console.log(data_teacher);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	}

	function show_item_detail(data_teacher) {
		console.log(data_teacher)
		var items_length = item_groups.length;
		var teacher_length = data_teacher.length;
		for (var i = 0; i < items_length; i++) {
			var arr_num = [];
			for (var j = 0; j < teacher_length; j++) {
				if (item_groups[i].id == data_teacher[j].answer_id) {
					arr_num.push(j);
					var item_li = '<tr><td width="80"  class="item-name" data-id="' + item_groups[i].id + '">' + item_groups[i].name + '</td><td width="375"><ul class="teacher-list examination examination_' + item_groups[i].id + '" teacher-type="examination"></ul><a class="add add-one" id="examination-add-' + i + '" href="javascript:;"><i class="iconfont">&#xe61a;</i>添加</a></td><td width="375"><ul class="teacher-list reviewed reviewed_' + item_groups[i].id + '" teacher-type="reviewed"></ul><a class="add add-one" id="reviewed-add-' + i + '" href="javascript:;"><i class="iconfont">&#xe61a;</i>添加</a></td></tr>';
				}
			};
			$('.look-table tbody').append(item_li);
			console.log(arr_num, i, j);
			for (var z = 0; z < arr_num.length; z++) {
				// console.log(data_teacher[arr_num[z]].name);
				// console.log(data_teacher[arr_num[z]].type);
				var li_cont = '<li class="on" answer-id="' + data_teacher[arr_num[z]].answer_id + '"><span data-id="' + data_teacher[arr_num[z]].id + '">' + data_teacher[arr_num[z]].name + '</span></li>'; //<i class="iconfont">&#xe61b;</i>
				// 判断是否为阅卷老师
				if (data_teacher[arr_num[z]].type == 'examination') {
					$('.examination_' + item_groups[i].id + '').append(li_cont);
				}
				// 判断是否为审核老师
				if (data_teacher[arr_num[z]].type == 'reviewed') {
					$('.reviewed_' + item_groups[i].id + '').append(li_cont);
				}
			};
		};
		// 如果没有老师，只显示题组
		if (!teacher_length && items_length) {
			for (var i = 0; i < items_length; i++) {
				var item_li = '<tr><td width="80"  class="item-name" data-id="' + item_groups[i].id + '">' + item_groups[i].name + '</td><td width="375"><ul class="teacher-list examination" teacher-type="examination"></ul><a class="add add-one" id="examination-add-' + i + '" href="javascript:;"><i class="iconfont">&#xe61a;</i>添加</a></td><td width="375"><ul class="teacher-list reviewed " teacher-type="reviewed"></ul><a class="add add-one" id="reviewed-add-' + i + '" href="javascript:;"><i class="iconfont">&#xe61a;</i>添加</a></td></tr>';
				$('.look-table tbody').append(item_li);
			};

		}
		if (items_length == 0) {
			$('.key-add').removeClass('add-one').css({
				color: '#999',
				borderColor: '#999'
			});
		} else {
			$('.key-add').addClass('add-one').css({
				color: '#5fa3ed',
				borderColor: '#5fa3ed'
			});
		}
	}

	// 添加学生功能
	$('#new-student').on('click', function() {
		var exam_id = $('#test-title').attr('data-id');
		$('#student-modal').attr('data-id',exam_id);
		var is_id = $('#change-student-all').val();
		if(is_id==1){
			is_id = true;
		}
		if(is_id==0){
			is_id = false;
		}
		get_student_grade(is_id);
		var grade_id = $('#change-student-grade').attr('data-id');
		get_student_info(grade_id);
		get_on_student(exam_id);
	});




	// 获取已经有的学生列表
	function get_on_student(id){
		$.ajax({
			url: ajaxIp + "/api/v2/exams/"+id+"/get_exam_classrooms",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "GET",
			dataType: "JSON",
			success: function(data) {
				console.log(data)
				show_on_student(data);
			},
			error: function() {
				//  alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	}


	// 显示已有学生信息
	function show_on_student(on_info){
		var is_extra = on_info.is_extra;
		var grade_id = on_info.grade_id;
		if(is_extra==true){
			is_extra=1;
		}
		if(is_extra==false){
			is_extra=0;
		}
		console.log(is_extra,grade_id);

		if(on_info){
			var is_all = $('#change-student-all option');
			for (var z = 0; z < is_all.length; z++) {
				if(is_extra==$(is_all[z]).attr('value')){
					$(is_all[z]).attr('selected', true);
					// get_student_grade(is_extra);
				}
			};


			var grade_all = $('#change-student-grade option');
			for (var m = 0; m < grade_all.length; m++) {
				if(grade_id==$(grade_all[m]).attr('data-id')){
					$(grade_all[m]).attr('selected', true);
					get_student_info(grade_id);
				}
			};


			var on_info_length = on_info.classrooms.length;
			if(on_info_length == $('#student-left-list li').length){
				$('.teacher-title').find('#all-student').prop('checked', true);
			}


			$('#student-modal #student-right-list').html('');
			for (var i = 0; i <on_info_length; i++) {
				var on_id = on_info.classrooms[i].id;
				var studen_list = $('#student-left-list li');
				for (var j = 0; j < studen_list.length; j++) {
					var s_id = $(studen_list[j]).find('.student-name').attr('data-id');
					var s_name = $(studen_list[j]).find('.student-name').text();
					var c_name = $(studen_list[j]).find('.count-name').text();
					if(on_id==s_id){
						$(studen_list[j]).find('input').prop('checked',true);
						var rigth_li = '<li><span data-id="' + s_id + '">' + s_name + '</span><span class="count-name">'+c_name+'</span><i class="iconfont">&#xe61b;</i></li>';
						$('#student-modal #student-right-list').append(rigth_li);
					}
				};
			};
		}
		checked_all_student();
	}

	function checked_all_student() {
		var checked_length = $("input[name='student-name']:checked").length;
		var all_length = $("input[name='student-name']").length;
		console.log(checked_length, all_length)
		if (checked_length == all_length && checked_length > 0 && all_length > 0) {
			$('body').find('#student-modal #all-student').prop('checked', true);
		} else {
			$('body').find('#student-modal #all-student').prop('checked', false);
		}
	}



	// 获取年级信息
	function get_student_grade (id){
		$.ajax({
			url: ajaxIp + "/api/v2/commons/school_grades",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "GET",
			dataType: "JSON",
			data: {'is_extra':id},
			success: function(data) {
				console.log(data)
				show_all_grade(data); //显示所有年级
			},
			error: function() {
				//  alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	}
	// 获取学生班级列表
 	function get_student_info(g_id){
 		$.ajax({
			url: ajaxIp + "/api/v2/commons/"+g_id+"/grade_classrooms",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "GET",
			dataType: "JSON",
			async: false,
			success: function(data) {
				console.log(data);
				show_student_info(data);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
 	}

 	// 显示年级
 	function show_all_grade(info){
 		$('#student-modal #change-student-grade').html('');
		var grade_length = info.length;
		if(grade_length>0){
			for (var i = 0; i < grade_length; i++) {
				var option_name = '<option data-id="' + info[i].id + '">' + info[i].name + '</option>';
				$('#student-modal #change-student-grade').append(option_name);
			};
			$('#student-modal #change-student-grade').attr('data-id', info[0].id);
			// show_modal_subject(modal_grade[0].id);
		}
 	}

 	// 显示班级列表
 	function show_student_info(student){
		$('#student-modal .teacher-title .all-box').html('');
		var all_check = '<span>全选 </span><div class="check_box"><input type="checkbox" value="" id="all-student" class="all-student" name="all-student"><label for="all-student" class="show_school"></label></div>';
		$('#student-modal .teacher-title .all-box').append(all_check);
		$('#student-modal #student-left-list').html('');
 		for (var i = 0; i < student.length; i++) {
			var student_li = '<li class="clear"><span class="left"><span class="student-name" data-id="' + student[i].id + '">' + student[i].name + '</span><span class="count-name">(' + student[i].count + '人)</span></span><div class="check_box right"><input type="checkbox" value="" id="student' + i + '" class="" name="student-name"><label for="student' + i + '"></label></div></li>';
 			$('#student-modal #student-left-list').append(student_li);
 		};
 	}
  // 学生库选择事件
	$('body').on('change', '#student-modal #change-student-all', function() {
		var is_id = $(this).val();
		if(is_id==1){
			is_id = true;
		}
		if(is_id==0){
			is_id = false;
		}
		var grade_id = $('#change-student-grade').attr('data-id');
		var exam_id = $('#student-modal').attr('data-id');
		get_student_grade(is_id);
		get_on_student(exam_id);
	});
	// 年级选择事件
	$('body').on('change', '#student-modal #change-student-grade', function() {
		var grade_id = $(this).find("option:selected").data('id');
		$(this).attr('data-id',grade_id);
		get_student_info(grade_id);
		$('#student-modal #student-right-list').html('');
		var exam_id = $('#student-modal').attr('data-id');
		get_on_student(exam_id);
	});



	// 学生全选
	$('body').on('click', '#student-modal #all-student', function() {
		$("input[name=student-name]").prop('checked', this.checked);
		if (this.checked) {
			var left_all_li = $('#student-modal #student-left-list li');
			var left_all_length = left_all_li.length;
			$('#student-modal #student-right-list').html('');
			for (var i = 0; i < left_all_length; i++) {
				var text_name = $(left_all_li[i]).find('.student-name').text();
				var text_id = $(left_all_li[i]).find('.student-name').data('id');
				var stu_count = $(left_all_li[i]).find('.count-name').text();
				var rigth_li = '<li><span data-id="' + text_id + '">' + text_name + '</span><span class="count-name">'+stu_count+'</span><i class="iconfont">&#xe61b;</i></li>';
				$('#student-modal #student-right-list').append(rigth_li);
			};
		} else {
			$('#student-modal #student-right-list').html('');
		};
	});

	$('body').on('click', 'input[name="student-name"]', function() {
		var $graBox = $("input[name='student-name']");
		// $graBox.length=$("input[name='student-name']").length;
		// console.log($("input[name='student-name']:checked").length,$graBox.length);
		$("#student-modal #all-student").prop("checked", $graBox.length == $("input[name='student-name']:checked").length ? true : false);
		var this_text = $(this).parents('li').find('.student-name').text();
		var this_id = $(this).parents('li').find('.student-name').data('id');
		var stu_count = $(this).parents('li').find('.count-name').text();
		if (this.checked) {
			var rigth_li = '<li><span data-id="' + this_id + '">' + this_text + '</span><span class="count-name">'+stu_count+'</span><i class="iconfont">&#xe61b;</i></li>';
			$('#student-modal #student-right-list').append(rigth_li);
		} else {
			var t_li = $('#student-modal #student-right-list li');
			var t_length = t_li.length;
			for (var i = 0; i < t_length; i++) {
				var t_id = $(t_li[i]).find('span').attr('data-id');
				if (this_id == t_id) {
					$(t_li[i]).remove();
				};
			};
		};
	});

	// 删除已经选择的学生
	$('body').on('click', '#student-modal #student-right-list li i', function() {
		var student_id = $(this).prev().prev().attr('data-id');
		var student_left_li = $('#student-modal #student-left-list li');
		var student_left_length = student_left_li.length;
		for (var i = 0; i < student_left_length; i++) {
			var left_id = $(student_left_li[i]).find('.student-name').attr('data-id');
			if (student_id == left_id) {
				$(student_left_li[i]).find('input').prop('checked', false);
			};
		};
		$('body').find('#student-modal #all-student').prop('checked', false);
		$(this).parent().remove();
	});
	

	// 确认添加学生
	$('body').on('click', '.confirm-student', function() {
		var exam_id = $('#student-modal').attr('data-id');
		var classroom_ids = [];
		var student_info = $('#student-modal #student-right-list li');
		var student_info_length = student_info.length;
		for (var i = 0; i < student_info_length; i++) {
			classroom_ids.push(parseInt($(student_info[i]).find('span').eq(0).attr('data-id')));
		};
		// var data_value = {'exam_id':exam_id,'classroom_ids':classroom_ids};
		add_student_info(exam_id,classroom_ids);
		// console.log(exam_id)
		show_test_cont(exam_id);
	});

	function add_student_info(id,value){
		$.ajax({
			url: ajaxIp + "/api/v2/exams/"+id+"/add_exam_classrooms",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "POST",
			dataType: "JSON",
			data: {'classroom_ids':value},
			success: function(data) {
				console.log(data);
				// show_student_info(data);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
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
	$('body').on('click', '.add-one', function() {
		$('.modal-main').css('width', '765px');
		$('.modal-main').animate({
			'top': '50%',
			'opacity': 1
		}, 500);
		$('.modal-shadow').animate({
			'opacity': .3
		}, 500);
		$('#teacher-modal').show();
		// 获取年级
		$.ajax({
			url: ajaxIp + "/api/v2/commons/school_grades",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "get",
			async: false,
			dataType: "JSON",
			success: function(data) {
				show_modal_grade(data); //显示所有年级
				request_teacher();
			},
			error: function() {
				//  alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
		if (!$('.determine').hasClass('confirm-teacher')) {
			$('.determine').addClass('confirm-teacher').removeClass('key-confirm');
		}
		// 已选择的老师显示在teacher－list中
		if ($(this).hasClass('add')) {
			var click_add = $(this).attr('id');
			var answer_id = $(this).parents('tr').find('.item-name').attr('data-id');
			var teacher_type = $(this).prev().attr('teacher-type');
			$('.modal-shadow').attr('data-id', click_add);
			$('.modal-shadow').attr('answer-id', answer_id);
			$('.modal-shadow').attr('teacher-type', teacher_type);
			aaa($('#' + click_add + ''));
		};
	});

	function aaa(bb) {
		var li_list = bb.prev().children();
		var ll = li_list.length;
		var all_list = $('body').find('#teacher-modal .teacher-left-list li');
		var all_ll = all_list.length;
		$('#teacher-modal .teacher-right-list').html('');
		if (ll == all_ll) {
			$('.teacher-title').find('input').prop('checked', true);
		}
		for (var i = 0; i < ll; i++) {
			var arr_text = $(li_list[i]).find('span').text();
			var arr_id = $(li_list[i]).find('span').data('id');
			for (var j = 0; j < all_ll; j++) {
				var teacher_name = $(all_list[j]).find('.teacher-name').text();
				var teacher_id = $(all_list[j]).find('.teacher-name').data('id');
				if (arr_id == teacher_id) {
					$(all_list[j]).find('input').prop('checked', true);
					var rigth_li = '<li><span data-id="' + arr_id + '">' + arr_text + '</span><i class="iconfont">&#xe61b;</i></li>';
					$('#teacher-modal .teacher-right-list').append(rigth_li);
				};
			};
		};
	}

	// var teachr_list_page = 1;
	function request_teacher(grade_id, subject_id) {
		if (grade_id == undefined && subject_id == undefined) {
			$.ajax({
				url: ajaxIp + "/api/v2/teachers",
				headers: {
					'Authorization': "Bearer " + isLogin
				},
				dataType: "JSON",
				type: "get",
				async: false,
				data: {
					'page': 1,
					'limit': 2000,
				},
				success: function(data) {
					console.log(grade_id, data);
					show_modal_teacher_list(data);
				},
				error: function() {
					// alert('请稍后从新尝试登录或者联系管理员');
					// localStorage.clear();
					// window.location.href = './login.html';
				}
			});
		} else {
			console.log(grade_id, subject_id)
				// teachr_list_page=1
			$.ajax({
				url: ajaxIp + "/api/v2/teachers",
				headers: {
					'Authorization': "Bearer " + isLogin
				},
				dataType: "JSON",
				type: "get",
				async: false,
				data: {
					'page': 1,
					'limit': 2000,
					'grade_id': grade_id,
					'subject_id': subject_id
				},
				success: function(data) {
					console.log(grade_id, data);
					show_modal_teacher_list(data);
				},
				error: function() {
					// alert('请稍后从新尝试登录或者联系管理员');
					// localStorage.clear();
					// window.location.href = './login.html';
				}
			});
		}
	}

	function show_modal_grade(modal_grade) {
		$('#teacher-modal #change-grade').html('');
		var grade_length = modal_grade.length;
		var option_first = '<option data-id="all-grade" >所有年级</option>';
		$('#teacher-modal #change-grade').append(option_first);
		for (var i = 0; i < grade_length; i++) {
			var option_name = '<option data-id="' + modal_grade[i].id + '">' + modal_grade[i].name + '</option>';
			$('#teacher-modal #change-grade').append(option_name);
		};
		$('#teacher-modal #change-grade').attr('data-id', 'all-grade');
		show_modal_subject(modal_grade[0].id);
	}

	function show_modal_subject(show_grade_id) {
		$.ajax({
			url: ajaxIp + "/api/v2/commons/grade_subjects",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			data:{'grade_id':show_grade_id},
			dataType: "JSON",
			type: "get",
			success: function(data) {
				console.log(data)
				show_modal_subject_detail(data);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	}

	function show_modal_subject_detail(subject_detail) {
		$('#teacher-modal #change-subject').html('');
		var s_length = subject_detail.length;
		var option_first = '<option data-id="all-subject" >所有科目</option>';
		$('#teacher-modal #change-subject').append(option_first);
		for (var i = 0; i < s_length; i++) {
			var subject_option = '<option data-id=' + subject_detail[i].id + '>' + subject_detail[i].name + '</option>';
			$('#teacher-modal #change-subject').append(subject_option);
		};
		$('#teacher-modal #change-subject').attr('data-id', 'all-subject');
	}
	// 显示教师列表
	function show_modal_teacher_list(teacher_detail) {
		console.log(teacher_detail)
		$('.teacher-title .all-box').html('');
		var all_check = '<span>全选 </span><div class="check_box"><input type="checkbox" value="" id="all-teacher" class="all-teacher" name="all-teacher"><label for="all-teacher" class="show_school"></label></div>';
		$('.teacher-title .all-box').append(all_check);
		$('#teacher-modal .teacher-left-list').html('');
		var list_length = teacher_detail.total_entries;
		for (var i = 0; i < list_length; i++) {
			var teacher_li = '<li class="clear"><span class="left"><span class="teacher-name" data-id="' + teacher_detail.teachers[i].id + '">' + teacher_detail.teachers[i].real_name + '</span>@<span class="shcool-name" data-id="' + teacher_detail.teachers[i].school.id + '">' + teacher_detail.teachers[i].school.name + '</span></span><div class="check_box right"><input type="checkbox" value="" id="teacher' + i + '" class="" name="teacher-name"><label for="teacher' + i + '"></label></div></li>';
			$('#teacher-modal .teacher-left-list').append(teacher_li);
		};
	}
	// 考试年级选择事件
	$('body').on('change', '#teacher-modal #change-grade', function() {
		var grade_name = $(this).find("option:selected").val();
		var grade_data_id = $(this).find("option:selected").data('id');
		if (grade_data_id !== 'all-grade') {
			$('#teacher-modal #change-subject').html('');
			show_modal_subject(grade_data_id);
			$('#teacher-modal .teacher-left-list').html('');
			request_teacher(grade_data_id);
			var m_id = $('.modal-shadow').attr('data-id');
			var click_add = $('body').find('#' + m_id + '');
			console.log(click_add)
			aaa(click_add);
			all_checked();
		} else {
			request_teacher();
			var m_id = $('.modal-shadow').attr('data-id');
			var click_add = $('body').find('#' + m_id + '');
			console.log(click_add)
			aaa(click_add);
			all_checked();
		}
	});
	// 考试科目选择事件
	$('body').on('change', '#teacher-modal #change-subject', function() {
		var subject_name = $(this).find("option:selected").val();
		var gg_id = $('#teacher-modal #change-grade').find("option:selected").data('id');
		var subject_data_id = $(this).find("option:selected").data('id');
		console.log(subject_name, subject_data_id);
		$('#teacher-modal .teacher-left-list').html('');
		request_teacher(gg_id, subject_data_id);
		var m_id = $('.modal-shadow').attr('data-id');
		var click_add = $('body').find('#' + m_id + '');
		console.log(click_add)
		aaa(click_add);
		all_checked()
		if (subject_data_id == 'all-subject') {
			request_teacher(gg_id);
			var m_id = $('.modal-shadow').attr('data-id');
			var click_add = $('body').find('#' + m_id + '');
			console.log(click_add)
			aaa(click_add);
			all_checked();
		};
	});

	function all_checked() {
		var checked_length = $("input[name='teacher-name']:checked").length;
		var all_length = $("input[name='teacher-name']").length;
		console.log(checked_length, all_length)
		if (checked_length == all_length && checked_length > 0 && all_length > 0) {
			$('body').find('#teacher-modal #all-teacher').prop('checked', true);
		} else {
			$('body').find('#teacher-modal #all-teacher').prop('checked', false);
		}
	}

	// 教师列表下拉加载
	// $('#teacher-modal .teacher-left-list').unbind('scroll').bind('scroll', function(){
	//    var sum = this.scrollHeight;
	//    if (sum <= $(this).scrollTop() + $(this).height()) {
	//      teachr_list_page++;
	//      var grade_id = $('#teacher-modal #change-grade').find("option:selected").data('id');
	// 		var subject_id = $('#teacher-modal #change-subject').find("option:selected").data('id');
	// 		console.log(grade_id,subject_id)
	// 		if(grade_id =='all-grade' && subject_id =='all-subject'){
	// 			request_teacher();
	// 		}
	// 		if(grade_id !=='all-grade' && subject_id =='all-subject'){
	// 			request_teacher(grade_id);
	// 		}
	// 		if(grade_id !=='all-grade' && subject_id !=='all-subject'){
	// 			request_teacher(grade_id,subject_id);
	// 		}
	//    }
	//  });
	// 教师全选
	$('body').on('click', '#teacher-modal #all-teacher', function() {
		$("input[name=teacher-name]").prop('checked', this.checked);
		if (this.checked) {
			var left_all_li = $('#teacher-modal .teacher-left-list li');
			var left_all_length = left_all_li.length;
			$('#teacher-modal .teacher-right-list').html('');
			for (var i = 0; i < left_all_length; i++) {
				var text_name = $(left_all_li[i]).find('.teacher-name').text();
				var text_id = $(left_all_li[i]).find('.teacher-name').data('id');
				var rigth_li = '<li><span data-id="' + text_id + '">' + text_name + '</span><i class="iconfont">&#xe61b;</i></li>';
				$('#teacher-modal .teacher-right-list').append(rigth_li);
			};
		} else {
			$('#teacher-modal .teacher-right-list').html('');
		};
	});

	$('body').on('click', 'input[name="teacher-name"]', function() {
		var $graBox = $("input[name='teacher-name']");
		// $graBox.length=$("input[name='teacher-name']").length;
		// console.log($("input[name='teacher-name']:checked").length,$graBox.length);
		$("#teacher-modal #all-teacher").prop("checked", $graBox.length == $("input[name='teacher-name']:checked").length ? true : false);
		var this_text = $(this).parents('li').find('.teacher-name').text();
		var this_id = $(this).parents('li').find('.teacher-name').data('id');
		if (this.checked) {
			var rigth_li = '<li><span data-id="' + this_id + '">' + this_text + '</span><i class="iconfont">&#xe61b;</i></li>';
			$('#teacher-modal .teacher-right-list').append(rigth_li);
		} else {
			var t_li = $('#teacher-modal .teacher-right-list li');
			var t_length = t_li.length;
			for (var i = 0; i < t_length; i++) {
				var t_id = $(t_li[i]).find('span').attr('data-id');
				if (this_id == t_id) {
					$(t_li[i]).remove();
				};
			};
		};
	});



	// 删除已经选择的老师
	$('body').on('click', '#teacher-modal .teacher-right-list li i', function() {
		var teacher_id = $(this).prev().attr('data-id');
		var teacher_left_li = $('#teacher-modal .teacher-left-list li');
		var teacher_left_length = teacher_left_li.length;
		for (var i = 0; i < teacher_left_length; i++) {
			var left_id = $(teacher_left_li[i]).find('.teacher-name').attr('data-id');
			if (teacher_id == left_id) {
				$(teacher_left_li[i]).find('input').prop('checked', false);
			};
		};
		$('body').find('#teacher-modal #all-teacher').prop('checked', false);
		$(this).parent().remove();
	});
	// 确认添加老师
	$('body').on('click', '.confirm-teacher', function() {
		if ($(this).hasClass('key-confirm')) {
			$('body').find('#teacher-modal .teacher-right-list').html('');
		}
		var exam_id = parseInt($('#subject-title').attr('exam-id'));
		var exam_subject_id = parseInt($('#subject-title').attr('exam_subject_id'));
		var answer_id = parseInt($('.modal-shadow').attr('answer-id'));
		var teacher_type = $('.modal-shadow').attr('teacher-type');
		console.log(exam_id, exam_subject_id, teacher_type)
		var teacher_info = $('#teacher-modal .teacher-right-list li');
		var teacher_info_length = teacher_info.length;
		var teacher_info_ids = [];
		for (var i = 0; i < teacher_info_length; i++) {
			teacher_info_ids.push(parseInt($(teacher_info[i]).find('span').attr('data-id')));
		};
		console.log({
			'exam_id': exam_id,
			'exam_subject_id': exam_subject_id,
			'teacher_info_ids': teacher_info_ids,
			'answer_id': answer_id,
			'type': teacher_type
		})
		$.ajax({
			url: ajaxIp + "/api/v2/exam_subjects/create_relation_teacher",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "POST",
			data: {
				'exam_id': exam_id,
				'exam_subject_id': exam_subject_id,
				'teacher_info_ids': teacher_info_ids,
				'answer_id': answer_id,
				'type': teacher_type
			},
			success: function(data) {
				console.log(data);
				show_item_group(exam_subject_id);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	});
	// 一键添加
	$('body').on('click', '.key-add', function() {
		$('.determine').removeClass('confirm-teacher').addClass('key-confirm');
		$('#teacher-modal .teacher-right-list').html('');
		var teacher_type = $(this).parent().attr('teacher-type');
		$('.modal-shadow').attr('teacher-type', teacher_type);
	});
	$('body').on('click', '.key-confirm', function() {
		var exam_id = parseInt($('#subject-title').attr('exam-id'));
		var exam_subject_id = parseInt($('#subject-title').attr('exam_subject_id'));
		var teacher_type = $('.modal-shadow').attr('teacher-type');
		console.log(exam_id, exam_subject_id, teacher_type)
		var teacher_info = $('#teacher-modal .teacher-right-list li');
		var teacher_info_length = teacher_info.length;
		var teacher_info_ids = [];
		for (var i = 0; i < teacher_info_length; i++) {
			teacher_info_ids.push(parseInt($(teacher_info[i]).find('span').attr('data-id')));
		};
		$.ajax({
			url: ajaxIp + "/api/v2/exam_subjects/create_relation_teacher",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "POST",
			data: {
				'exam_id': exam_id,
				'exam_subject_id': exam_subject_id,
				'teacher_info_ids': teacher_info_ids,
				'type': teacher_type
			},
			success: function(data) {
				console.log(data);
				show_item_group(exam_subject_id);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	});

	// 搜索老师
	$('#teacher-modal #search-teacher').on('change', function() {
		var str_name = $(this).val();
		var teacher_list = $('#teacher-modal .teacher-left-list li');
		var teacher_length = teacher_list.length;
		for (var i = 0; i < teacher_length; i++) {
			$(teacher_list[i]).addClass('hide');
			var teacher_name = $(teacher_list[i]).find('.teacher-name').text();
			if (teacher_name.indexOf(str_name) != -1) {
				$(teacher_list[i]).removeClass('hide');
			};
		};
	});
	$('#teacher-modal .search-teacher').on('click', function() {
		$('#teacher-modal #search-teacher').change();
	});
	// 权限分配页面功能－－end
	// 查看邀请学校
	$('body').on('click', '.look-school', function() {
		$('.modal-main').css('width', '765px');
		$('.modal-main').animate({
			'top': '50%',
			'opacity': 1
		}, 500);
		$('.modal-shadow').animate({
			'opacity': .3
		}, 500);
		$('#look-modal').show();
		var exam_id = $('#test-title').attr('data-id');
		$.ajax({
			url: ajaxIp + "/api/v2/exams/" + exam_id + "/invite_schools",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "GET",
			success: function(data) {
				console.log(data);
				show_on_school(data);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	});

	function show_on_school(on_school) {
		var on_school_length = on_school.length;
		$('#look-school-list').html('');
		for (var i = 0; i < on_school_length; i++) {
			if (on_school[i].result == null && on_school[i].reply_date == null) {
				var on_school_tr = '<tr data-id="' + on_school[i].school_id + '"><td class="school-name">' + on_school[i].school_name + '</td><td>' + on_school[i].created_at + '</td><td>未答复</td><td>未答复</td></tr>';
				$('#look-school-list').append(on_school_tr);
			}
			if (on_school[i].result == 1) {
				var on_school_tr = '<tr data-id="' + on_school[i].school_id + '"><td class="school-name">' + on_school[i].school_name + '</td><td>' + on_school[i].created_at + '</td><td>' + on_school[i].reply_date + '</td><td>已同意</td></tr>';
				$('#look-school-list').append(on_school_tr);
			}
			if (on_school[i].result == 0) {
				var on_school_tr = '<tr data-id="' + on_school[i].school_id + '"><td class="school-name">' + on_school[i].school_name + '</td><td>' + on_school[i].created_at + '</td><td>' + on_school[i].reply_date + '</td><td>已拒绝</td></tr>';
				$('#look-school-list').append(on_school_tr);
			}
		};
	}
	// 邀请学校
	$('body').on('click', '.request-school', function() {
		$('.modal-main').css('width', '765px');
		$('.modal-main').animate({
			'top': '50%',
			'opacity': 1
		}, 500);
		$('.modal-shadow').animate({
			'opacity': .3
		}, 500);
		$('#school-modal').show();
		$('.school-right-list').html('');
		$.ajax({
			url: ajaxIp + "/api/v2/commons/provinces",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "GET",
			success: function(data) {
				show_province(data);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	});
	// 显示所有省份
	function show_province(all_province) {
		var all_length = all_province.length;
		$('#change-province').html('');
		for (var i = 0; i < all_length; i++) {
			var option_province = '<option value="' + all_province[i] + '">' + all_province[i] + '</option>';
			$('#change-province').append(option_province);
		};
		get_county(all_province[0]); //默认显示第一个省份
		var first_province = $('#change-province option').eq(0).val();
		request_school(first_province); //默认显示第一个省份的学校

	}
	// 获取省份的区县
	function get_county(province) {
		console.log(province)
		$.ajax({
			url: ajaxIp + "/api/v2/commons/counties?province=" + province + "",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "GET",
			success: function(data) {
				show_county(data, province);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	}
	// 显示省份的区县
	function show_county(counties, province) {
		var counties_length = counties.length;
		$('#change-county').html('');
		var option_first = '<option val="所有区域" province-name="' + province + '">所有区域</option>';
		$('#change-county').append(option_first);
		for (var i = 0; i < counties_length; i++) {
			var option_county = '<option value="' + counties[i] + '" province-name="' + province + '">' + counties[i] + '</option>';
			$('#change-county').append(option_county);
		};
	}
	// 获取学校
	function request_school(province, county) {
		var exam_id = $('#test-title').attr('data-id');
		if (county == '所有区域') {
			$.ajax({
				url: ajaxIp + "/api/v2/invite_schools/get_schools",
				headers: {
					'Authorization': "Bearer " + isLogin
				},
				type: "GET",
				data: {
					'province': province,
					'exam_id': exam_id
				},
				success: function(data) {
					show_school_detail(data)
				},
				error: function() {
					// alert('请稍后从新尝试登录或者联系管理员');
					// localStorage.clear();
					// window.location.href = './login.html';
				}
			});
		} else {
			$.ajax({
				url: ajaxIp + "/api/v2/invite_schools/get_schools",
				headers: {
					'Authorization': "Bearer " + isLogin
				},
				type: "GET",
				data: {
					'province': province,
					'county': county,
					'exam_id': exam_id
				},
				success: function(data) {
					show_school_detail(data)
				},
				error: function() {
					// alert('请稍后从新尝试登录或者联系管理员');
					// localStorage.clear();
					// window.location.href = './login.html';
				}
			});
		}
	}
	// 显示学校
	function show_school_detail(schools) {
		console.log(schools)
		$('.school-title .all-box').html('');
		var all_check = '<span>全选 </span><div class="check_box"><input type="checkbox" value="" id="all-school" class="all-teacher" name="all-school"><label for="all-school" class="show_school"></label></div>';
		$('.school-title .all-box').append(all_check);
		var schools_length = schools.length;
		$('.school-left-list').html('');
		for (var i = 0; i < schools_length; i++) {
			var school_li = '<li class="clear"><span class="left"><span class="school-name" data-id="' + schools[i].id + '">' + schools[i].name + '</span></span><div class="check_box right"><input type="checkbox" value="" id="school' + i + '" class="" name="school-name"><label for="school' + i + '"></label></div></li>';
			$('.school-left-list').append(school_li);
		};
	}


	// 省份选择事件
	$('body').on('change', '#change-province', function() {
		var province_name = $(this).find("option:selected").val();
		get_county(province_name);
		request_school(province_name);
	});


	// 区县选择事件
	$('body').on('change', '#change-county', function() {
		var county_name = $(this).find("option:selected").val();
		var province_name = $(this).find("option:selected").attr('province-name')
		request_school(province_name, county_name);
		if (county_name == '所有区域') {
			request_school(province_name);
		} else {
			request_school(province_name, county_name);
		}
	});

	// 学校全选
	$('body').on('click', '#all-school', function() {
		$("input[name=school-name]").prop('checked', this.checked);
		if (this.checked) {
			var left_all_li = $('.school-left-list li');
			var left_all_length = left_all_li.length;
			$('.school-right-list').html('');
			for (var i = 0; i < left_all_length; i++) {
				var text_name = $(left_all_li[i]).find('.school-name').text();
				var text_id = $(left_all_li[i]).find('.school-name').data('id');
				var rigth_li = '<li><span data-id="' + text_id + '">' + text_name + '</span><i class="iconfont">&#xe61b;</i></li>';
				$('.school-right-list').append(rigth_li);
			};
		} else {
			$('.school-right-list').html('');
		};
	});
	// 学校列表选择
	$('body').on('click', 'input[name="school-name"]', function() {
		var $graBox = $("input[name='school-name']");
		$("#all-school").prop("checked", $graBox.length == $("input[name='school-name']:checked").length ? true : false);
		var this_text = $(this).parents('li').find('.school-name').text();
		var this_id = $(this).parents('li').find('.school-name').data('id');
		if (this.checked) {
			var rigth_li = '<li><span data-id="' + this_id + '">' + this_text + '</span><i class="iconfont">&#xe61b;</i></li>';
			$('.school-right-list').append(rigth_li);
		} else {
			var t_li = $('.school-right-list li');
			var t_length = t_li.length;
			for (var i = 0; i < t_length; i++) {
				var t_id = $(t_li[i]).find('span').attr('data-id');
				if (this_id == t_id) {
					$(t_li[i]).remove();
				};
			};
		};
	});


	// 右侧列表取消已经选择的学校
	$('body').on('click', '.school-right-list li i', function() {
		var school_id = $(this).prev().attr('data-id');
		var school_left_li = $('.school-left-list li');
		var school_left_length = school_left_li.length;
		for (var i = 0; i < school_left_length; i++) {
			var left_id = $(school_left_li[i]).find('.school-name').attr('data-id');
			if (school_id == left_id) {
				$(school_left_li[i]).find('input').prop('checked', false);
			};
		};
		$('body').find('#all-school').prop('checked', false);
		$(this).parent().remove();
	});


	// 确认添加学校
	$('body').on('click', '.confirm-school', function() {
		var exam_id = parseInt($('#test-title').attr('data-id'));
		var school_info = $('.school-right-list li');
		var school_info_length = school_info.length;
		var school_info_ids = [];
		for (var i = 0; i < school_info_length; i++) {
			school_info_ids.push(parseInt($(school_info[i]).find('span').attr('data-id')));
		};
		console.log({
			'exam_id': exam_id,
			'terms': school_info_ids,
		});
		$.ajax({
			url: ajaxIp + "/api/v2/invite_schools",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "POST",
			data: {
				'exam_id': exam_id,
				'terms': school_info_ids,
			},
			success: function(data) {
				console.log(data);
				show_on_school(data);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	});

	// 搜索学校
	$('#search-school').on('change', function() {
		var str_name = $(this).val();
		var province_name = $('#change-province').find("option:selected").val();
		var county_name = $('#change-county').find("option:selected").val();
		var exam_id = $('#test-title').attr('data-id');
		data = {
			'name': str_name,
			'exam_id': exam_id,
			'province': province_name
		};
		if (county_name !== "所有区域") {
			data['county'] = county_name;
		}
		$.ajax({
			type: "GET",
			url: ajaxIp + "/api/v2/invite_schools/get_schools",
			data: data,
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			success: function(data) {
				console.log(data);
				// 显示已搜索到的考试信息
				$('.school-left-list').html('');
				show_school_detail(data);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	});
	$('.search-school').on('click', function() {
		$('#search-school').change();
	});
	// 查看试卷
	// href="'+ajaxIp+'/api/v2/exam_subject_batches/'+detail_data.subjects[i].batch_id+'/scanner_images"
	$('body').on('click', '.look-paper', function() {
		var $_this = $(this);
		var this_page = $('#test-title').attr('data-page');
		var batch_id = $_this.parents('tr').find('.subject-name').attr('batch-id');
		var test_id = $('#test-title').attr('data-id');
		var exam_name = $('#test-title').text();
		var exam_subject_id = $_this.parents('tr').find('.subject-name').attr('exam_subject_id');
		var subject_name = $_this.parents('tr').find('.subject-name').text();
		$_this.attr('href', 'look_paper.html?id=' + batch_id + '&test_local_id=' + test_id + '&exam_name=' + exam_name + '&subject_name=' + subject_name + '&exam_subject_id=' + exam_subject_id + '&this_page='+this_page+'');
	});
	$('body').on('click', '.setAnswer', function() {
		var $_this = $(this);
		var examubjeId = $_this.parents('tr').find('.subject-name').attr('exam_subject_id');
		var subjectName = $_this.parents('tr').find('.subject-name').text()
		window.localStorage.setItem("subjectname",subjectName)
		$_this.attr('href', 'answer.html?examubjeId=' + examubjeId);
	});
})