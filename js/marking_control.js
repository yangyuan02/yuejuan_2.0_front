$(function(){
	var isLogin = localStorage.getItem("token");
	var height = $(window).height()-$('#header').height()-$('#footer').height()-180;
	$('.marking-control-box').css({
		'min-height': height
	})

	// 获取考试列表
	get_test_list(null,null);

	function get_test_list(page_data_info){
		console.log(page_data_info)
		var page_data = {'page':1, 'limit': 10};
		if(page_data_info!=null){
			for (var i = 0; i < page_data_info.length; i+=2) {
				page_data[page_data_info[i]] = page_data_info[i+1];
			}
			console.log(page_data)
		}
		$.ajax({
		  type: "POST",
		  url: ajaxIp+"/api/v2/exam_subjects/school_exam_subjects",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:page_data,
		  success: function(data){
		  	console.log(data);
		  	// show_test_info(data);
		  	page_test_list(data.total_count,page_data_info);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	}

	function page_test_list(nums,page_data_info){

		var ii_nums;
		console.log(nums+'条数据')
		if(nums==0){
			ii_nums=1;
		}else if(nums>0 && nums<10){
			ii_nums=1;
		}else{
			ii_nums=Math.ceil(nums/10);
		}
		//分页
		$.jqPaginator('#pagination', {
		  totalPages: ii_nums,//设置分页的总页数
	    visiblePages: 5,//设置最多显示的页码数
	    currentPage: 1,//设置当前的页码
	    disableClass: 'disableClass',//设置首页，上一页，下一页，末页的“禁用状态”样式
	    activeClass:'activeClass',//设置当前页码样式
		  prev: '<li class="prev"><a href="javascript:;" class="pagination-color">上一页</a></li>',
		  next: '<li class="next"><a href="javascript:;" class="pagination-color">下一页</a></li>',
		  first: '<li class="prev"><a href="javascript:;" class="pagination-color">首页</a></li>',
		  last: '<li class="next"><a href="javascript:;" class="pagination-color">尾页</a></li>',
		  page: '<li class="page"><a href="javascript:;" class="pagination-color">{{page}}</a></li>',
	    onPageChange: function (nums) {
	    	console.log(page_data_info)
				var page_data = {'page':nums, 'limit': 10};
				if(page_data_info!=null){
					for (var i = 0; i < page_data_info.length; i+=2) {
						page_data[page_data_info[i]] = page_data_info[i+1];
					}
				}

				$.ajax({
				  type: "POST",
				  url: ajaxIp+"/api/v2/exam_subjects/school_exam_subjects",
				  headers: {'Authorization': "Bearer " + isLogin},
				  data:page_data,
				  success: function(data){
				  	console.log(data);
				  	show_test_info(data);
				  	// page_test_list(data.total_count,page_data_info);
				  },
				  error: function(){
				      // alert('请稍后从新尝试登录或者联系管理员');
			      	// localStorage.clear();
			      	// window.location.href = './login.html';
				  }
				});
	    }
	  });
	}

  // 显示考试列表
	function show_test_info(test_info){
		var test_length = test_info.exam_subjects.length;
		$('#test-list tbody').html('');
		for (var i = 0; i < test_length; i++) {
			var tr_test ='<tr class="parent-tr"><td class="test-name" width="320" exam-id="'+test_info.exam_subjects[i].exam_id+'" data-id="'+test_info.exam_subjects[i].exam_subject_id+'">'+ test_info.exam_subjects[i].name +'</td><td class="test-grade">'+ test_info.exam_subjects[i].grade_name +'</td><td class="test-subject">'+ test_info.exam_subjects[i].subject_name +'</td><td class="test-num">'+ test_info.exam_subjects[i].answers_total_count+'</td><td class="test-on"> <p class="num">'+ test_info.exam_subjects[i].paper_revise_progress+'%</p><div class="bar"><div style="width:'+ test_info.exam_subjects[i].paper_revise_progress+'%;"></div></div></td><td class="test-model"><select id="select-'+i+'" class="grade-model" value="'+test_info.exam_subjects[i].correct_pattern+'"><option value="null">选择模式</option><option value="1">得分模式</option><option value="0">扣分模式</option></select></td><td id="test-status-'+i+'" class="test-status" value="'+test_info.exam_subjects[i].status+'"><div class="modify-paper edit-paper determine on" value="1"><span class="text left ml13">改卷</span><span class="cir right"></span></div><div class="modify-paper edit-paper stop-paper" value="0"><span class="cir left"></span><span class="text right mr13">暂停</span></div><div class="modify-paper end-paper" value="5" style="cursor: not-allowed; color: rgb(102, 102, 102);"><span class="cir left"></span><span class="text right mr13">结束</span></div></td><td class="test2-operation"><a href="javascript:;">查看进度<i class="iconfont"></i></a></td></tr>';
			$('#test-list tbody').append(tr_test);
			// 判断改卷模式
			var par_value=test_info.exam_subjects[i].correct_pattern;
			if(par_value!=null){
				$('#select-'+i+'').attr("disabled","disabled");
				$('#select-'+i+'').css({
					'color': '#999',
					'cursor': 'not-allowed'
				});
				var child_list = $('#select-'+i+'').children();
				for (var j = 0; j < child_list.length; j++) {
					if(par_value == $(child_list[j]).val()){
						$(child_list[j]).attr('selected',true);
					}
				};
			}
			// 判断阅卷状态
			var par_status = test_info.exam_subjects[i].status;
		  var child_status = $('#test-status-'+i+'').children();
		  for (var z = 0; z < child_status.length; z++) {
			  if(par_status == $(child_status[z]).attr('value')){
			  	$(child_status[z]).show().siblings().hide();
			  }
			  // 判断不是 0,1,2,5,的时候都为结束状态
			  if(par_status!=0&&par_status!=1&par_status!=2&&par_status!=5){
					$('#test-status-'+i+'').find('.end-paper').show();
					$('#test-status-'+i+'').find('.end-paper').siblings().hide();
			  }
		  };
		};
	}



	// 获取学校列表
	get_school_list();


	function get_school_list(){
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/invite_schools/schools_with_invite",
		  headers: {'Authorization': "Bearer " + isLogin},
		  success: function(data){
		  	console.log(data);
		  	show_school_info(data);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	}

	// 显示考试学校
	function show_school_info(school_info){
		var school_length = school_info.length;
		var all_school ='<option value="0">请选择学校</option>';
		$('#select-school').html('');
		$('#select-school').append(all_school);
		for (var i = 0; i < school_length; i++) {
			var option_school = '<option value="'+school_info[i].id+'" data-id="'+school_info[i].id+'">'+school_info[i].name+'</option>'
			$('#select-school').append(option_school);
		};
	}

	// 获取考试年级列表
	$('#select-school').on('change', function() {
		var school_id = $(this).val();
		if(school_id != 0){
			get_grade_list(school_id);
			get_test_list(["school_id",school_id]);
		}else{
			get_test_list(null,null);
		}
	});

	function get_grade_list (id) {
		$.ajax({
		  type: "POST",
		  url: ajaxIp+"/api/v2/grades/correct_grades",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'school_id': id},
		  success: function(data){
		  	console.log(data);
		  	show_grade_info(data);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	}
	// 显示考试班级
	function show_grade_info(grade_info){
		var grade_length = grade_info.length;
		var all_grade ='<option value="0">请选择班级</option>';
		$('#select-grade').html('');
		$('#select-grade').append(all_grade);
		for (var i = 0; i < grade_length; i++) {
			var option_grade = '<option value="'+grade_info[i].id+'">'+grade_info[i].name+'</option>'
			$('#select-grade').append(option_grade);
		};
	}

	// 获取选择考试科目
	$('#select-grade').on('change', function() {
		var grade_id = $(this).val();
		var school_id = $('#select-school').val();
		if(grade_id != 0 && school_id != 0){
			get_sub_list(grade_id);
			var page_data_info = [
				"school_id",school_id,
				"grade_id",grade_id
			]
			console.log(page_data_info);
			get_test_list(page_data_info);
		}else if(grade_id == 0 && school_id != 0){
			get_test_list(["school_id",school_id]);
		}
	});
  function get_sub_list(id){
		$.ajax({
		  type: "POST",
		  url: ajaxIp+"/api/v2/subjects/correct_subjects",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'grade_id': id},
		  success: function(data){
		  	console.log(data);
		  	show_sub_info(data);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
  }
  // 显示考试科目
  function show_sub_info(sub_info){
		var sub_length = sub_info.length;
		var all_sub ='<option value="0">请选择科目</option>';
		$('#select-sub').html('');
		$('#select-sub').append(all_sub);
		for (var i = 0; i < sub_length; i++) {
			var option_sub = '<option value="'+sub_info[i].id+'">'+sub_info[i].name+'</option>'
			$('#select-sub').append(option_sub);
		};
  }

  	// 获取选择考试科目
	$('#select-sub').on('change', function() {
		var sub_id = $(this).val();
		var grade_id = $('#select-grade').val();
		var school_id = $('#select-school').val();
		if(grade_id != 0 && sub_id != 0){
			var page_data_info = [
				"school_id",school_id,
				"grade_id",grade_id,
				"subject_id",sub_id
			]
			console.log(page_data_info);
			get_test_list(page_data_info);
		}else if(sub_id == 0 && school_id != 0){
			get_test_list(["school_id",school_id,"grade_id",grade_id,]);
		}
	});

	// 搜索考试
	$('.search-test').click(function(){
		if($('#search-test').val()!='')
		var test_name = $('#search-test').val();
		console.log(test_name)
		get_test_list(["exam_name",test_name]);
	})
	$('#search-test').on('change',function() {
		$('.search-test').click();
	});



	// 选择改卷模式
	$('body').on('change', '.grade-model', function() {
		var select_value = $(this).val();
		var exam_id =$(this).parents('.parent-tr').find('.test-name').attr('data-id');
		$.ajax({
		  type: "POST",
		   async:false,
		  url: ajaxIp+"/api/v2/exam_subjects/change_correct_pattern",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'id': exam_id,'correct_pattern':select_value},
		  success: function(data){
		  	console.log(data)
		  	// $(this).attr('value', select_value);
		  	// $(this).attr("disabled","disabled");
		  	edit_info(select_value,exam_id);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	});



	// 更新修改改卷模式
	function edit_info(value,id){
		var list_cont = $('#test-list').find('.parent-tr');
		for (var i = 0; i < list_cont.length; i++) {
			var list_id = $(list_cont[i]).find('.test-name').attr('data-id');
			if(id==list_id){
				$(list_cont[i]).find('.grade-model').attr('value', value);
				$(list_cont[i]).find('.grade-model').attr("disabled","disabled");
				$(list_cont[i]).find('.grade-model').css({
					'color': '#999',
					'cursor': 'not-allowed'
				});
			}
		};
	}


	// 修改阅卷状态

	$('body').on('click', '.edit-paper', function() {
		var status;
		var exam_id =$(this).parents('.parent-tr').find('.test-name').attr('data-id');
		var bar_num = $(this).parents('tr').children('td.test-on').find('.num').text();
		bar_num = bar_num.substring(0,bar_num.length-1);
		

		if($(this).hasClass('stop-paper')){
			$(this).prev().show();
			$(this).hide();
			status=1;

		}
		if($(this).hasClass('on')){
			$(this).next().show();
			$(this).hide();
			status=0;
			if(bar_num==100){
				console.log('yes');
				status=5;
				$(this).next().find('.text').text('结束');
				$(this).next().css({
					'cursor': 'not-allowed',
					'color': '#666'
				});
				$(this).next().removeClass('edit-paper');
				$.ajax({
				  type: "PATCH",
				  url: ajaxIp+"/api/v2/exam_subjects/"+exam_id+"/finished_review_paper",
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
			}
		}
		console.log(status)
		$.ajax({
		  type: "POST",
		  // async:false,
		  url: ajaxIp+"/api/v2/exam_subjects/change_correct_status",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'id': exam_id,'status':status},
		  success: function(data){
		  	console.log(data)
		  	edit_status(exam_id,status);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	});

	// 显示修改后的阅卷状态
	function edit_status(id,status){
		var list_cont = $('#test-list').find('.parent-tr');
		for (var i = 0; i < list_cont.length; i++) {
			var list_id = $(list_cont[i]).find('.test-name').attr('data-id');
			if(id==list_id){
				$(list_cont[i]).find('.test-status').attr('value', status);
				if(status==0){
					$(list_cont[i]).find('.stop-paper').show();
					$(list_cont[i]).find('.on').hide();
				}
				if(status==1){
					$(list_cont[i]).find('.stop-paper').hide();
					$(list_cont[i]).find('.on').show();
				}
			}
		};
	}


	// 查看进度test2-operation
	$('body').on('click', '.test2-operation a', function() {
		$('.progress-box').show();
		$(this).parents('.content-box').hide();
		var exam_name = $(this).parents('.parent-tr').find('.test-name').text();
		var exam_subject_id = $(this).parents('.parent-tr').find('.test-name').attr('data-id');
		var exam_id = $(this).parents('.parent-tr').find('.test-name').attr('exam-id');
		get_progress_info(exam_name,exam_subject_id,exam_id);
		
	});



	function get_progress_info(name,id,exam_id){
		console.log(id)
		var page_data = {'page':1, 'limit': 10};
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/correct_progress?exam_subject_id="+id+"",
		  headers: {'Authorization': "Bearer " + isLogin},
			data:page_data,
		  success: function(data){
		  	console.log(data);
		  	// show_progress_info(data,name);
		  	page_item_info(data.total_count,id,name,exam_id);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	}

// 查看进度页面

	function page_item_info(nums,id,name,exam_id){
		var ii_nums;
		console.log(nums+'条数据')
		if(nums==0){
			ii_nums=1;
		}else if(nums>0 && nums<10){
			ii_nums=1;
		}else{
			ii_nums=Math.ceil(nums/10);
		}

		//分页
		$.jqPaginator('#pagination-progress', {
		  totalPages: ii_nums,//设置分页的总页数
	    visiblePages: 5,//设置最多显示的页码数
	    currentPage: 1,//设置当前的页码
	    disableClass: 'disableClass',//设置首页，上一页，下一页，末页的“禁用状态”样式
	    activeClass:'activeClass',//设置当前页码样式
		  prev: '<li class="prev"><a href="javascript:;" class="pagination-color">上一页</a></li>',
		  next: '<li class="next"><a href="javascript:;" class="pagination-color">下一页</a></li>',
		  first: '<li class="prev"><a href="javascript:;" class="pagination-color">首页</a></li>',
		  last: '<li class="next"><a href="javascript:;" class="pagination-color">尾页</a></li>',
		  page: '<li class="page"><a href="javascript:;" class="pagination-color">{{page}}</a></li>',
	    onPageChange: function (nums) {
	    	// console.log(page_data_info)
				var page_data = {'page':nums, 'limit': 10};

				$.ajax({
				  type: "GET",
				  url: ajaxIp+"/api/v2/correct_progress?exam_subject_id="+id+"",
				  headers: {'Authorization': "Bearer " + isLogin},
					data:page_data,
				  success: function(data){
				  	console.log(data);
				  	show_progress_info(data,id,name,exam_id);
				  },
				  error: function(){
				      // alert('请稍后从新尝试登录或者联系管理员');
			      	// localStorage.clear();
			      	// window.location.href = './login.html';
				  }
				});
	    }
	  });
	}

		// 显示批阅详情
	$('body').on('click', '.test-operation a', function() {
		var child_tr = $(this).parents('.parent-tr').next('.child-tr');
		child_tr.toggle()
	});
// 返回上一页面
	$('.back-pre').on('click', function() {
		$(this).parents('.progress-box').hide();
		$('.content-box').show();
	});

	function show_progress_info(progress_info,id,name,exam_id){
		$('.test-pro-name').text(name);
		$('.test-pro-name').attr('data-id',id);
		$('.test-pro-name').attr('exam-id',exam_id);
		var progress_info_length = progress_info.answers.length;
		$('#test-pro-list tbody').html('');
		for (var i = 0; i < progress_info_length; i++) {
			var pro_tr = '<tr class="parent-tr pr-'+i+'"><td class="item-name" width="15%" data-id="'+progress_info.answers[i].answer_id+'">'+progress_info.answers[i].name+'</td><td class="item-count">'+progress_info.answers[i].answer_count+'</td><td class="item-people">'+progress_info.answers[i].correct_teacher_count+'</td><td class="item-averge">'+progress_info.answers[i].average+'</td><td class="test-on"> <p class="num">'+progress_info.answers[i].revise_progress+'%</p><div class="bar"><div style="width: '+progress_info.answers[i].revise_progress+'%;"></div></div></td><td class="test-operation"></td><td class="more-count"><input type="text" value="'+progress_info.answers[i].multiple_people+'"></td><td class="more-error"><input type="text" value="'+progress_info.answers[i].multiple_error+'"></td><td class="look-teacher examination" teacher-type="examination" id="examination-'+i+'"><ul style="display:none"></ul><span class="look-num">'+progress_info.answers[i].correct_teacher_count+'</span>人<a href="javascript:;" class="add add-one" id="examination-add-' + i + '"><i class="iconfont">&#xe61a;</i>添加</a></td><td class="check-teacher reviewed" teacher-type="reviewed" id="reviewed-'+i+'"><ul style="display:none"></ul><span class="check-num">'+progress_info.answers[i].reviewed_teachers_count+'</span>人<a href="javascript:;" class="add add-one" id="reviewed-add-' + i + '"><i class="iconfont">&#xe61a;</i>添加</a></td></tr>';
			$('#test-pro-list tbody').append(pro_tr);

			$('#examination-'+i+' ul').html('');
			var exam_teacter = progress_info.answers[i].correct_teachers;
			var exam_teacter_length = exam_teacter.length;
			for (var j = 0; j < exam_teacter_length; j++) {
				var exam_li = '<li data-id='+exam_teacter[j].teacher_id+'>'+exam_teacter[j].name+'</li>'
				$('#examination-'+i+' ul').append(exam_li);
			};

			$('#reviewed-'+i+' ul').html('');
			var reviewed_teacter = progress_info.answers[i].reviewed_teachers;
			var reviewed_teacter_length = reviewed_teacter.length;
			for (var z = 0; z < reviewed_teacter_length; z++) {
				var reviewed_li = '<li data-id='+reviewed_teacter[z].teacher_id+'>'+reviewed_teacter[z].name+'</li>'
				$('#reviewed-'+i+' ul').append(reviewed_li);
			};
			var par_id = $('.pr-'+i+'');
			get_section_info(progress_info.answers[i].answer_id,par_id);
		};
	}

	// 多评人数
	$('body').on('input', '.more-count input', function() {
		var multiple_people = $(this).val();
		console.log(multiple_people)
		if(multiple_people < 0 ||multiple_people==0){
			var prompt_1 = '提示：请输入大于零的数！';
			var prompt_i = $('#i_two');//提示框元素
			iTwo(prompt_i,prompt_1);
			$(this).val('');
		}else{
			var answer_id =$(this).parents('.parent-tr').find('.item-name').attr('data-id');
			var data_value ={'answer_id':answer_id,'multiple_people':multiple_people}
			$.ajax({
			  type: "POST",
			  url: ajaxIp+"/api/v2/correct_progress/change_multiple_people",
			  headers: {'Authorization': "Bearer " + isLogin},
				data:data_value,
			  success: function(data){
			  	console.log(data);
			  },
			  error: function(){
			      // alert('请稍后从新尝试登录或者联系管理员');
		      	// localStorage.clear();
		      	// window.location.href = './login.html';
			  }
			});
		}
	});

	function iTwo(i,k){
		$('.modal-main').animate({'top': '30%','opacity': 1},500);
		$('.modal-shadow').animate({'opacity': 0},500);
		i.show();
		$('.prompt').text(k);
		setTimeout(function(){
			$('#i_two').hide();
		},1000);
	};


	// 多评误差
	$('body').on('input', '.more-error input', function() {
		var multiple_error = $(this).val();
		console.log(multiple_error)
		var answer_id =$(this).parents('.parent-tr').find('.item-name').attr('data-id');
		var data_value ={'answer_id':answer_id,'multiple_error':multiple_error}
		$.ajax({
		  type: "POST",
		  url: ajaxIp+"/api/v2/correct_progress/change_multiple_error",
		  headers: {'Authorization': "Bearer " + isLogin},
			data:data_value,
		  success: function(data){
		  	console.log(data);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
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
				console.log(data)
				show_modal_grade(data); //显示所有年级
				request_teacher();
			},
			error: function() {
				//  alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
		if (!$('.modal-bottom-button').hasClass('confirm-teacher')) {
			$('.modal-bottom-button').addClass('confirm-teacher').removeClass('key-confirm');
		}
		// 已选择的老师显示在teacher－list中
		if ($(this).hasClass('add')) {
			var click_add = $(this).attr('id');
			var answer_id = $(this).parents('tr').find('.item-name').attr('data-id');
			var teacher_type = $(this).parent().attr('teacher-type');
			console.log(click_add,answer_id,teacher_type)
			$('.modal-shadow').attr('data-id', click_add);
			$('.modal-shadow').attr('answer-id', answer_id);
			$('.modal-shadow').attr('teacher-type', teacher_type);
			aaa($('#' + click_add + ''));
		};
	})




	function aaa(bb) {
		var li_list = bb.prev().prev().children();
		var ll = li_list.length;
		var all_list = $('body').find('.teacher-left-list li');
		var all_ll = all_list.length;
		$('.teacher-right-list').html('');
		if (ll == all_ll) {
			$('.teacher-title').find('input').prop('checked', true);
		}
		for (var i = 0; i < ll; i++) {
			var arr_text = $(li_list[i]).text();
			var arr_id = $(li_list[i]).data('id');
			for (var j = 0; j < all_ll; j++) {
				var teacher_name = $(all_list[j]).find('.teacher-name').text();
				var teacher_id = $(all_list[j]).find('.teacher-name').data('id');
				if (arr_id == teacher_id) {
					$(all_list[j]).find('input').prop('checked', true);
					var rigth_li = '<li><span data-id="' + arr_id + '">' + arr_text + '</span><i class="iconfont">&#xe61b;</i></li>';
					$('.teacher-right-list').append(rigth_li);
				};
			};
		};
	}


	function show_modal_grade(modal_grade) {
		$('#change-grade').html('');
		var grade_length = modal_grade.length;
		var option_first = '<option data-id="all-grade" >所有年级</option>';
		$('#change-grade').append(option_first);
		for (var i = 0; i < grade_length; i++) {
			var option_name = '<option data-id="' + modal_grade[i].id + '">' + modal_grade[i].name + '</option>';
			$('#change-grade').append(option_name);
		};
		$('#change-grade').attr('data-id', 'all-grade');
		show_modal_subject(modal_grade[0].id);
	}


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
		$('#change-subject').html('');
		var s_length = subject_detail.length;
		var option_first = '<option data-id="all-subject" >所有科目</option>';
		$('#change-subject').append(option_first);
		for (var i = 0; i < s_length; i++) {
			var subject_option = '<option data-id=' + subject_detail[i].id + '>' + subject_detail[i].name + '</option>';
			$('#change-subject').append(subject_option);
		};
		$('#change-subject').attr('data-id', 'all-subject');
	}
	// 显示教师列表
	function show_modal_teacher_list(teacher_detail) {
		console.log(teacher_detail)
		$('.teacher-title .all-box').html('');
		var all_check = '<span>全选 </span><div class="check_box"><input type="checkbox" value="" id="all-teacher" class="all-teacher" name="all-teacher"><label for="all-teacher" class="show_school"></label></div>';
		$('.teacher-title .all-box').append(all_check);
		$('.teacher-left-list').html('');
		var list_length = teacher_detail.total_entries;
		for (var i = 0; i < list_length; i++) {
			var teacher_li = '<li class="clear"><span class="left"><span class="teacher-name" data-id="' + teacher_detail.teachers[i].id + '">' + teacher_detail.teachers[i].real_name + '</span>@<span class="shcool-name" data-id="' + teacher_detail.teachers[i].school.id + '">' + teacher_detail.teachers[i].school.name + '</span></span><div class="check_box right"><input type="checkbox" value="" id="teacher' + i + '" class="" name="teacher-name"><label for="teacher' + i + '"></label></div></li>';
			$('.teacher-left-list').append(teacher_li);
		};
	}

	// 考试年级选择事件
	$('body').on('change', '#change-grade', function() {
		var grade_name = $(this).find("option:selected").val();
		var grade_data_id = $(this).find("option:selected").data('id');
		if (grade_data_id !== 'all-grade') {
			$('#change-subject').html('');
			show_modal_subject(grade_data_id);
			$('.teacher-left-list').html('');
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
	$('body').on('change', '#change-subject', function() {
		var subject_name = $(this).find("option:selected").val();
		var gg_id = $('#change-grade').find("option:selected").data('id');
		var subject_data_id = $(this).find("option:selected").data('id');
		console.log(subject_name, subject_data_id);
		$('.teacher-left-list').html('');
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
			$('body').find('#all-teacher').prop('checked', true);
		} else {
			$('body').find('#all-teacher').prop('checked', false);
		}
	}

		// 教师全选
	$('body').on('click', '#all-teacher', function() {
		$("input[name=teacher-name]").prop('checked', this.checked);
		if (this.checked) {
			var left_all_li = $('.teacher-left-list li');
			var left_all_length = left_all_li.length;
			$('.teacher-right-list').html('');
			for (var i = 0; i < left_all_length; i++) {
				var text_name = $(left_all_li[i]).find('.teacher-name').text();
				var text_id = $(left_all_li[i]).find('.teacher-name').data('id');
				var rigth_li = '<li><span data-id="' + text_id + '">' + text_name + '</span><i class="iconfont">&#xe61b;</i></li>';
				$('.teacher-right-list').append(rigth_li);
			};
		} else {
			$('.teacher-right-list').html('');
		};
	});

	$('body').on('click', 'input[name="teacher-name"]', function() {
		var $graBox = $("input[name='teacher-name']");
		// $graBox.length=$("input[name='teacher-name']").length;
		// console.log($("input[name='teacher-name']:checked").length,$graBox.length);
		$("#all-teacher").prop("checked", $graBox.length == $("input[name='teacher-name']:checked").length ? true : false);
		var this_text = $(this).parents('li').find('.teacher-name').text();
		var this_id = $(this).parents('li').find('.teacher-name').data('id');
		if (this.checked) {
			var rigth_li = '<li><span data-id="' + this_id + '">' + this_text + '</span><i class="iconfont">&#xe61b;</i></li>';
			$('.teacher-right-list').append(rigth_li);
		} else {
			var t_li = $('.teacher-right-list li');
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
	$('body').on('click', '.teacher-right-list li i', function() {
		var teacher_id = $(this).prev().attr('data-id');
		var teacher_left_li = $('.teacher-left-list li');
		var teacher_left_length = teacher_left_li.length;
		for (var i = 0; i < teacher_left_length; i++) {
			var left_id = $(teacher_left_li[i]).find('.teacher-name').attr('data-id');
			if (teacher_id == left_id) {
				$(teacher_left_li[i]).find('input').prop('checked', false);
			};
		};
		$('body').find('#all-teacher').prop('checked', false);
		$(this).parent().remove();
	});
	// 确认添加老师
	$('body').on('click', '.confirm-teacher', function() {
		var exam_subject_id =	parseInt($('.test-pro-name').attr('data-id'));
		var exam_id = parseInt($('.test-pro-name').attr('exam-id'));
		var answer_id = parseInt($('.modal-shadow').attr('answer-id'));
		var teacher_type = $('.modal-shadow').attr('teacher-type');
		console.log(exam_id, exam_subject_id, teacher_type)
		var teacher_info = $('.teacher-right-list li');
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
				console.log(exam_subject_id);
				var name = $('.test-pro-name').text();
				get_progress_info(name,exam_subject_id,exam_id);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	});

	// 搜索老师
	$('#search-teacher').on('change', function() {
		var str_name = $(this).val();
		console.log(str_name)
		var teacher_list = $('.teacher-left-list li');
		var teacher_length = teacher_list.length;
		for (var i = 0; i < teacher_length; i++) {
			$(teacher_list[i]).addClass('hide');
			var teacher_name = $(teacher_list[i]).find('.teacher-name').text();
			if (teacher_name.indexOf(str_name) != -1) {
				$(teacher_list[i]).removeClass('hide');
			};
		};
	});
	$('.search-teacher').on('click', function() {
		$('#search-teacher').change();
	});

	// 获取切割列表

	function get_section_info(answer_id,par_id){
		console.log(answer_id,par_id)
		$.ajax({
			url: ajaxIp + "/api/v2/correct_progress/answer_section_crops",
			headers: {
				'Authorization': "Bearer " + isLogin
			},
			type: "POST",
			data: {
				'answer_id': answer_id,
			},
			success: function(data){
				console.log(data);
				show_section_info(data,par_id);
			},
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login.html';
			}
		});
	}


	 // 显示小题名称
	function show_section_info(select_info,id){
		$(id).after('');
		var select_info_length = select_info.length;
		console.log(select_info_length)
		for (var i = select_info_length-1; i >= 0; i--) {
			var child_tr = '<tr class="child-trs child-trs-'+i+'" style="background:#fafafa" answer-id="'+select_info[i].answer_id+'" answers="'+select_info[i].answer_setting_ids+'"><td colspan="5" data-id="'+select_info[i].id+'"><a class="key-answer" href="javascript:;"><i class="iconfont">&#xe62a;</i>解锁试卷</a><a class="clear-items" style="display:none" href="javascript:;"><i class="iconfont">&#xe616;</i>清空题组</a>'+select_info[i].name+'</td><td colspan="5" class="test-operation"><a href="javascript:;"><span>批阅详情</span><i class="iconfont bottom">&#xe622;</i><i class="iconfont up none">&#xe624;</i></a></td></tr><tr class="child-tr none"><td colspan="10" style="text-align: center"><div class="child-box"><ul class="child-title"><li>阅卷老师</li><li>所在学校</li><li>批改数量</li><li>批阅速度</li><li>平均分</li></ul><ul class="child-cont"></ul></div></td></tr>';
			$(id).after(child_tr);
			// var par_id = $('.child-trs-'+i+'');
			// console.log(par_id)
			// 根据用户身份判断是否可以清空题组权限
			var role_name = $('#role-name').val();
			console.log(role_name)
			if(role_name=="超级管理员"){
				$('.clear-items').show();
			}
		};
	}


	// 点击批阅详情显示进度
	$('body').on('click', '.test-operation a', function() {
		if (!$(this).children('.bottom').hasClass('none')) {
			$(this).children('.up').removeClass('none');
			$(this).children('.bottom').addClass('none');
		}else{
			$(this).children('.up').addClass('none');
			$(this).children('.bottom').removeClass('none');
		}

		$(this).parents('.child-trs').next().toggle();


		var answer_id = $(this).parents('.child-trs').attr('answer-id');
		var answer_setting_ids = $(this).parents('.child-trs').attr('answers');
		var parent_info = $(this).parents('.child-trs');

		if($(this).children('.bottom').hasClass('none')){
			$.ajax({
				url: ajaxIp + "/api/v2/correct_progress/answer_correct_details",
				headers: {
					'Authorization': "Bearer " + isLogin
				},
				type: "POST",
				data: {
					'answer_id': answer_id,
					'answer_setting_ids': answer_setting_ids,
				},
				success: function(data){
					console.log(data);
					show_detail_info(data,parent_info);
				},
				error: function() {
					// alert('请稍后从新尝试登录或者联系管理员');
					// localStorage.clear();
					// window.location.href = './login.html';
				}
			});
		}
	});





	// 显示批阅详情
	function show_detail_info(detail_info,parent_info){
		parent_info.next().find('.child-cont').html('');
		var detail_info_length = detail_info.length;
		for (var i = 0 ; i < detail_info_length; i++) {
			var child_tr = '<li><div class="teacher-name">'+detail_info[i].teacher_name+'</div><div class="school-name">'+detail_info[i].school_name+'</div><div class="on-num">'+detail_info[i].correct_total_count+'</div><div class="on-speed">'+detail_info[i].speed+'/min</div><div class="on-averge">'+detail_info[i].correct_average_score+'</div></li>';
			parent_info.next().find('.child-cont').append(child_tr);
		};
	}







	// 解锁试卷弹出框
	$('body').on('click', '.key-answer', function() {
		$('.modal-main').css('width', '765px');
		$('.modal-main').animate({
			'top': '50%',
			'opacity': 1
		}, 500);
		$('.modal-shadow').animate({
			'opacity': .3
		}, 500);
		$('#key-paper').show();

		var id = $(this).parent().attr('data-id');
		$('.modal-content').attr('data-id',id);
	});

	$('body').on('click', '.confirm-key', function() {
		var section_crop_id = $(this).parents('.modal-content').attr('data-id');
		console.log(section_crop_id)
		$.ajax({
		  type: "POST",
		  url: ajaxIp+"/api/v2/section_crops/"+section_crop_id+"/unlock_paper",
		  headers: {'Authorization': "Bearer " + isLogin},
		  dataType: "JSON",
		  success: function(data){
		  	console.log(data);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	});

	// 清空题组

	$('body').on('click', '.clear-items', function() {
		$('.modal-main').css('width', '765px');
		$('.modal-main').animate({
			'top': '50%',
			'opacity': 1
		}, 500);
		$('.modal-shadow').animate({
			'opacity': .3
		}, 500);
		$('#clear-paper').show();

		var id = $(this).parent().attr('data-id');
		$('.modal-content').attr('data-id',id);
		console.log(id)
		// var exam_name = $('.test-pro-name').text();
		// var exam_subject_id = $('.test-pro-name').attr('data-id');
		// var exam_id = $('.test-pro-name').attr('exam-id');
		// $('#text-name').val(exam_name);
		// $('#text-id').val(exam_id);
		// $('#text-s-id').val(exam_subject_id);
	});


	$('body').on('click', '.clear-key', function() {
		var section_crop_id = $(this).parents('.modal-content').attr('data-id');
		console.log(section_crop_id);
		var exam_name = $('.test-pro-name').text();
		var exam_subject_id = $('.test-pro-name').attr('data-id');
		var exam_id = $('.test-pro-name').attr('exam-id');
		// console.log(exam_name,exam_subject_id,exam_id)
		$.ajax({
		  type: "POST",
		  url: ajaxIp+"/api/v2/section_crops/"+section_crop_id+"/redis_clear",
		  headers: {'Authorization': "Bearer " + isLogin},
		  dataType: "JSON",
		  success: function(data){
		  	console.log(data);
		  	get_progress_info(exam_name,exam_subject_id,exam_id);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	});
})