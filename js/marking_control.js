$(function(){
	var isLogin = localStorage.getItem("token");
	var height = $(window).height()-$('#header').height()-$('#footer').height()-180;
	$('.marking-control-box').css({
		'min-height': height
	})

	$('body').on('click', '.modify-paper', function() {
		$(this).next().show();
		$(this).hide();
	});
	$('body').on('click', '.modify-paper', function() {
		$(this).prev().show();
		$(this).hide();
	});
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
		console.log(nums+'2222222222222222222222')
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
			var tr_test ='<tr class="parent-tr"><td class="test-name" width="320">'+ test_info.exam_subjects[i].name +'</td><td class="test-grade">'+ test_info.exam_subjects[i].grade_name +'</td><td class="test-subject">'+ test_info.exam_subjects[i].subject_name +'</td><td class="test-num">'+ test_info.exam_subjects[i].answers_total_count+'</td><td class="test-on"> <p class="num">'+ test_info.exam_subjects[i].paper_revise_progress+'%</p><div class="bar"><div style="width:'+ test_info.exam_subjects[i].paper_revise_progress+'%;"></div></div></td><td class="test-model"><select><option>得分模式</option><option>扣分模式</option></select></td><td class="test-status"><div class="modify-paper determine"><span class="text left ml13">改卷</span><span class="cir right"></span></div><div class="modify-paper stop-paper"><span class="cir left"></span><span class="text right mr13">暂停</span></div></td><td class="test2-operation"><a href="#">查看进度<i class="iconfont"></i></a></td></tr>';
			$('#test-list tbody').append(tr_test);
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
	$('#search-btn').on('click',function() {
		$('#search-test').change();
	});

})