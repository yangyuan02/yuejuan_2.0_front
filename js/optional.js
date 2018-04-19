$(document).ready(function () {
	var isLogin = localStorage.getItem("token");
	// 左侧列表切换
	$('.user-left .user-left-button').on('click', function() {
  	$(this).addClass('user-on').siblings().removeClass('user-on');
  	var index = $(this).index();
  	console.log(index);
  	$('.user-right').eq(index).show().siblings('.user-right').hide();
  	if(index==0){
  		 get_grade_list('.courses-main');
  	}
  	if(index==1){
  		 get_grade_list('.stu-main');
  		 get_all_student(null);

  	}
  	if(index==2){
 			get_grade_list('.stu-course-main');
 			get_all_set(null);
  	}
  	if(index==3){
  		show_exam_info(all_info);
  		var exam_id = $('.score-grade-main').find('#select-exam').val();
  		var course_id =  $('.score-grade-main').find('#select-courses').val();
  		var sort =  $('.score-grade-main').find('#select-ranges').val();
  		get_course_list(exam_id,course_id,sort);
  	}
  	if(index==4){
  		show_exam_info(all_info);
  		var exam_id = $('.item-score-main').find('#select-exam').val();
  		var subject_id =  $('.item-score-main').find('#select-sujects').val();
  		get_item_score(exam_id,subject_id);
  	}
  	if(index==5){
  		show_exam_info(all_info);
  		var exam_id = $('.course-average-main').find('#select-exam').val();
  		var subject_id =  $('.course-average-main').find('#select-sujects').val();
  		console.log(exam_id,subject_id)
  		get_average_info(exam_id,subject_id);
  	}
  });

  // 年级，科目，班级
  get_grade_list('.courses-main');
  function get_grade_list(name){
  	$.ajax({
	   	type: "GET",
	   	async:false,
	   	url: ajaxIp+"/api/v2/commons/school_grades",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	success: function(data){
	  		console.log(data);
	  		show_grade_list(data,name);
	    },
			error: function() {
				// alert('请稍后从新尝试登录或者联系管理员');
				// localStorage.clear();
				// window.location.href = './login';
			}
		});
  }
  function show_grade_list(info,name){
  	$(name).find('#select-grade').html('');
  	$(name).find('#select-grade').append('<option value="0">全部年级</option>');
  	for (var i = 0; i < info.length; i++) {
  		var list_op = '<option value="'+info[i].id+'">'+info[i].name+'</option>';
  		$(name).find('#select-grade').append(list_op);
  	};
  	if($(name).find('#select-grade').val()!=0){
  		if(name=='.stu-course-main'){
				get_class_list($('#select-grade').val(),name);
  		}else{
  		get_subject_list($('#select-grade').val(),name);}
  	}
  	if($(name).find('#select-grade').val()==0){
			$(name).find('#select-subjects').html('');
			$(name).find('#select-subjects').append('<option value="0">全部科目</option>');
			$(name).find('#select-sujects').html('');
			$(name).find('#select-sujects').append('<option value="0">全部班级</option>');
  	}
  }

  function get_subject_list(val,name){
  	var grade_ids = val;
 		$.ajax({
     	type: "GET",
     	async:false,
     	url: ajaxIp+"/api/v2/teachers/find_subject_by_grade",
    	dataType: "JSON",
    	headers: {'Authorization': "Bearer " + isLogin},
    	data:{grade_ids},
    	success: function(data){
    		console.log(data);
    		show_subject_by_grade(data,name)
      },
      error: function(){
        	// alert('请稍后从新尝试登录或者联系管理员');
        	// localStorage.clear();
        	// window.location.href = './login.html'
      }
    });
  }
	function show_subject_by_grade(info,name){
		console.log(name)
		$(name).find('#select-subjects').html('');
  	$(name).find('#select-subjects').append('<option value="0">全部科目</option>');
  	for (var i = 0; i < info.length; i++) {
  		var list_op = '<option value="'+info[i].id+'">'+info[i].name+'</option>';
  		$(name).find('#select-subjects').append(list_op);
  	};
 	}

 	function get_class_list(val,name){
		$.ajax({
	   	type: "GET",
	   	url: ajaxIp+"/api/v2/commons/"+val+"/grade_classrooms",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	success: function(data){
	  		console.log(data);
	  		show_class_info(data,name);
	    },
	    error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
	    }
	  });
 	}

 	function show_class_info(info,name){
		$(name).find('#select-sujects').html('');
		$(name).find('#select-sujects').append('<option value="0">全部班级</option>');
		for (var i = 0; i < info.length; i++) {
			var l_op = '<option value="'+info[i].id+'">'+info[i].name+'('+info[i].count+')</option>';
			$(name).find('#select-sujects').append(l_op);
		};
 	}

 	// 课程导入全部功能
	// 课程管理年级选择
 	$('.courses-main #select-grade').on('change', function() {
 		var value = $(this).val();
 		console.log(value)
 		if(value!=0){
 			get_subject_list(value,'.courses-main');
 			var iData = ["grade_id",value];
 			get_all_course(iData);
 		}else{
 			$('.courses-main #select-subjects').html('');
 			$('.courses-main #select-subjects').append('<option value="0">全部科目</option>');
 			get_all_course(null);
 		}
 	});

 	// 课程管理科目选择
 	$('.courses-main #select-subjects').on('change', function() {
 		var g_value = $(this).parents('.set-up-search').find('#select-grade').val();
 		var s_value = $(this).val();
 		console.log(g_value,s_value)
 		if(s_value!=0){
 			var iData = ["grade_id",g_value,"subject_id",s_value];
 		}else{
 			var iData = ["grade_id",g_value];
 		}
 		get_all_course(iData);
 	});



	// 获取课程列表
	get_all_course(null);
	// 获取所有课程
	function get_all_course(iData){
		var all_data={'page':1, 'limit': 10};
		if(iData!=null){
			for (var i = 0; i < iData.length; i+=2) {
				all_data[iData[i]] = iData[i+1];
			}
		}
		$.ajax({
	   	type: "GET",
	   	url: ajaxIp+"/api/v2/courses",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	data:all_data,
	  	success: function(data){
	  		console.log(data);
	  		all_course_list(data,iData);
	    },
	    error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
	    }
	  });
	}
	// 课程列表
	function all_course_list(all,iData){
		var ii_num;
		if(all.total_count==0){
			ii_num=1;
		}else if(all.total_count>0 && all.total_count<10){
			ii_num=1;
		}else{
			ii_num=Math.ceil(all.total_count/10);
		}
		$.jqPaginator('#pagination', {
	  	totalPages: ii_num,
	    visiblePages: 5,
	    currentPage: 1,
	    disableClass: 'disableClass',
	    activeClass:'activeClass',
	    prev: '<li class="prev"><a href="javascript:;" class="pagination-color">上一页</a></li>',
	    next: '<li class="next"><a href="javascript:;" class="pagination-color">下一页</a></li>',
	    first: '<li class="prev"><a href="javascript:;" class="pagination-color">首页</a></li>',
	    last: '<li class="next"><a href="javascript:;" class="pagination-color">尾页</a></li>',
	    page: '<li class="page"><a href="javascript:;" class="pagination-color">{{page}}</a></li>',
	    onPageChange: function (num,type) {
	    	console.log(iData,all)
				var iDataI = {'page':num, 'limit': 10};
				console.log(iData,iDataI)
				if(iData!=null){
					for (var i = 0; i < iData.length; i+=2) {
						iDataI[iData[i]] = iData[i+1];
					}
				}

				if(type=='init'){
					show_all_course(all.courses)
				}
				if(type=='change'){
	      	$.ajax({
			    	type: "GET",
			     	url: ajaxIp+"/api/v2/courses",
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	data: iDataI,
			    	success: function(data){
			    		console.log(data)
			  			show_all_course(data.courses);
			      },
			      error: function(){
		        	// alert('请稍后从新尝试登录或者联系管理员');
		        	// localStorage.clear();
		        	// window.location.href = './login.html'
			      }
			    });
	      }
	    }
	  });
	}
	// 显示课程
	function show_all_course(course_info){
		// console.log(info,info.total_count)
		$('.courses-tabble tbody').html('');
		for (var i = 0; i < course_info.length; i++) {
			var t_tr =
					'<tr style="border-bottom:1px solid #ccc;">'+
						'<td class="c_name" colspan="3" data-id="'+course_info[i].id+'">'+course_info[i].name+'</td>'+
						'<td>'+course_info[i].letter+'</td>'+
						'<td>'+course_info[i].subject_name+'</td>'+
						'<td>'+course_info[i].grade_name+'</td>'+
						'<td>'+course_info[i].teacher_info_name+'</td>'+
						'<td>'+course_info[i].amount+'</td>'+
						'<td>'+
							'<a href="javascript:;" class="edit"><i class="iconfont">&#xe614;</i>修改</a>'+
							'<a href="javascript:;" class="delet"><i class="iconfont">&#xe616;</i>删除</a>'+
						'</td>'+
					'</tr>';
			$('.courses-tabble tbody').append(t_tr);
		};
	}
	// 课程导入弹框
	$('.course-import').click(function(){
		$('.import-course-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.import-course-wrap .modal-shadow').animate({'opacity': .3},500);
		$('.import-course-wrap').show();
		$('#upfile').html('未选择任何文件');
		$('.table-template').attr('href', ajaxIp+'/template/课程导入（模板）.xlsx');
	})

	$('#inPath').change(function(){
		inputFlileNames('#inPath');
	})

	function inputFlileNames(name){
		console.log(99)
		var file = $(name).val();
		var fileName = getFileName(file);

		$(name).prev().html('未选择任何文件');
		function getFileName(o){
		    var pos=o.lastIndexOf("\\");
		    return o.substring(pos+1);
		}
		if($(name).prev().find('div').length==0){
			$(name).prev().html('');
		}
		var iDiv = $('<div data-url='+file+'></div>')
		iDiv.text(fileName);
		iDiv.css({'display':'inline-block','color':'#666','background':'#dcf5f0','padding':'0 10px','height':'26px','border-radius':'2px','margin-right':'5px'});
		$(name).prev().append(iDiv);
	}

	// 确定导入课程
	$('body').on('click', '.import-course-wrap .determine', function() {
		var formData = new FormData();
		formData.append("course_file",$("#inPath")[0].files[0]);
		var i_string = $('#upfile div').html();
		i_string_i = i_string.lastIndexOf(".");
		i_string = i_string.substring(i_string_i+1);
		console.log(i_string+'aaaaaaaaaaaaaaaaaaaa')
		console.log(formData)
		if(i_string!='xlsx' && i_string!='xls'){
			alert('文件格式不对，请选择xlsx或者xls文件！')
		}
		$('.import-course-wrap').hide();
		$.ajax({
	   	type: "POST",
	   	url: ajaxIp+"/api/v2/courses/import",
	  	dataType: "JSON",
	  	data: formData,
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	processData : false,
			contentType : false,
	  	beforeSend:function(){
					console.log("正在进行，请稍候");
			},
			success : function(data) {
				console.log(data);
				if(data.ok==1){
					get_all_course(null);
				}
			},
			error : function() {
				console.log("error");
			}
	  });
	});

	// 创建课程弹框
	$('.add-course').click(function(){
		$('.modal-course-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-course-wrap .modal-shadow').animate({'opacity': .3},500);
		$('.modal-course-wrap').show();
		$('.modal-course-wrap').find('input').val('');
		$('.modal-course-wrap').find('#select-teachers').html('');
		$('.modal-course-wrap').removeAttr('data-id');
		$('.modal-course-wrap').find('.course-num').attr('disabled',false);
		$('.modal-course-wrap').find('.course-num').css({
			'opacity': 1,
		});
		$('.modal-course-wrap').find('#select-grade').attr('disabled',false);
		$('.modal-course-wrap').find('#select-grade').css({
			'opacity': 1,
		});
		$('.modal-course-wrap').find('#select-subjects').attr('disabled',false);
		$('.modal-course-wrap').find('#select-subjects').css({
			'opacity': 1,
		});
		get_grade_list('.modal-course-wrap');
	})
	// 创建课程弹框年级选择
 	$('.modal-course-wrap #select-grade').on('change', function() {
 		var value = $(this).val();
 		console.log(value)
 		if(value!=0){
 			get_subject_list(value,'.modal-course-wrap');
 		}else{
 			$('.modal-course-wrap #select-subjects').html('');
 			$('.modal-course-wrap #select-subjects').append('<option value="0">全部科目</option>');
 			$('.modal-course-wrap #select-teachers').html('');
 		}
 	});

 	// 创建课程弹框科目选择
 	$('.modal-course-wrap #select-subjects').on('change', function() {
 		var g_value = $(this).prev().prev().val();
 		var s_value = $(this).val();
 		console.log(g_value,s_value)
 		if(s_value!=0){
 			var iData = ["grade_id",g_value,"subject_id",s_value];
 			get_teacher_info(iData);
 		}
 	});
	// 获取教师信息
 	function get_teacher_info(iData){
 		var data_all = {'page':1,'limit':100};
 		if(iData!=null){
			for (var i = 0; i < iData.length; i+=2) {
				data_all[iData[i]] = iData[i+1];
			}
		}
 		$.ajax({
     	type: "GET",
     	url: ajaxIp+"/api/v2/teachers",
    	dataType: "JSON",
    	headers: {'Authorization': "Bearer " + isLogin},
    	data:data_all,
    	success: function(data){
    		console.log(data);
    		show_teacher_info(data.teachers);
      },
      error: function(){
        	// alert('请稍后从新尝试登录或者联系管理员');
        	// localStorage.clear();
        	// window.location.href = './login.html'
      }
    });
 	}
 	// 显示教师信息
 	function show_teacher_info(teachers){
 		$('.modal-course-wrap #select-teachers').html('');
 		for (var i = 0; i < teachers.length; i++) {
 			var l_op = '<option value="'+teachers[i].id+'">'+teachers[i].real_name+'</option>';
 			$('.modal-course-wrap #select-teachers').append(l_op);
 		};
 	}

	// 确认创建课程
 	$('body').on('click', '.modal-course-wrap .determine', function() {
 		if($('.modal-course-wrap').attr('data-id')){
 			var course_id = $('.modal-course-wrap').attr('data-id');
 			var name = $('.course-name').val();
	 		var teacher_info_id = $('.modal-course-wrap').find('#select-teachers').val();
	 		var amount = parseInt($('.student-code').val());
	 		var data_all={
	 			'name':name,
	 			'teacher_info_id':teacher_info_id,
	 			'amount':amount,
	 		};
	 		if(!name){
	 			alert('请输入课程名称');
	 		}
	 		if(name&&!amount){
	 			alert('请输入名额');
	 		}
	 		if(name&&amount){
	 			$('.modal-course-wrap').hide();
		 		$.ajax({
		     	type: "PATCH",
		     	url: ajaxIp+"/api/v2/courses/"+course_id+"",
		    	dataType: "JSON",
		    	headers: {'Authorization': "Bearer " + isLogin},
		    	data:data_all,
		    	success: function(data){
		    		console.log(data);
		    		get_all_course(null);
		      },
		      error: function(){
		        	// alert('请稍后从新尝试登录或者联系管理员');
		        	// localStorage.clear();
		        	// window.location.href = './login.html'
		      }
		    });
	 		}
 		}else{
	 		var name = $('.course-name').val();
	 		var letter = $('.course-num').val();
	 		var grade_id = $('.modal-course-wrap').find('#select-grade').val();
	 		var subject_id = $('.modal-course-wrap').find('#select-subjects').val();
	 		var teacher_info_id = $('.modal-course-wrap').find('#select-teachers').val();
	 		var amount = parseInt($('.student-code').val());
	 		var data_all={
	 			'name':name,
	 			'letter':letter,
	 			'grade_id':grade_id,
	 			'subject_id':subject_id,
	 			'teacher_info_id':teacher_info_id,
	 			'amount':amount,
	 		};
	 		if(!name){
	 			alert('请输入课程名称');
	 		}
	 		if(name&&!letter){
	 			alert('请输入课程代码');
	 		}
	 		if(name&&letter&&grade_id==0){
	 			alert('请选择年级');
	 		}
	 		if(name&&letter&&grade_id!=0&&subject_id==0){
	 			alert('请选择科目');
	 		}
	 		if(name&&letter&&grade_id!=0&&subject_id!=0&&!teacher_info_id){
	 			alert('请选择教师');
	 		}
	 		if(name&&letter&&grade_id!=0&&subject_id!=0&&teacher_info_id&&!amount){
	 			alert('请输入名额');
	 		}
	 		if(name&&letter&&grade_id!=0&&subject_id!=0&&teacher_info_id&&amount){
	 			$('.modal-course-wrap').hide();
		 		$.ajax({
		     	type: "POST",
		     	url: ajaxIp+"/api/v2/courses",
		    	dataType: "JSON",
		    	headers: {'Authorization': "Bearer " + isLogin},
		    	data:data_all,
		    	success: function(data){
		    		console.log(data);
		    		get_all_course(null);
		      },
		      error: function(){
		        	// alert('请稍后从新尝试登录或者联系管理员');
		        	// localStorage.clear();
		        	// window.location.href = './login.html'
		      }
		    });
	    }
    }
 	});
	// 导出当前课程列表
	$('body').on('click', '.lead-out-course', function() {
		var grade_id = $(this).parents('.set-up-search').find('#select-grade').val();
		var subject_id = $(this).parents('.set-up-search').find('#select-subjects').val();
		if(grade_id==0&&subject_id==0){
			var data_all={};
		}
		if(grade_id!=0&&subject_id==0){
			var data_all={'grade_id':grade_id};
		}
		if(grade_id!=0&&subject_id!=0){
			var data_all={'grade_id':grade_id,'subject_id':subject_id};
		}
		var $this = $(this);
		$.ajax({
     	type: "GET",
     	async:false,
     	url: ajaxIp+"/api/v2/courses/export",
    	dataType: "JSON",
    	data:data_all,
    	headers: {'Authorization': "Bearer " + isLogin},
    	success: function(data){
    		console.log(data);
    		if(data.filepath){
    			$this.children().attr('href', ajaxIp+data.filepath);
    		}
      },
      error: function(){
        	// alert('请稍后从新尝试登录或者联系管理员');
        	// localStorage.clear();
        	// window.location.href = './login.html'
      }
    });
	});




	// 删除单个课程信息
	$('body').on('click', '.delet', function() {
		$('.modal-wrap-dele .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-wrap-dele .modal-shadow').animate({'opacity': .3},500);
		$('.modal-wrap-dele').show();
		var dele_id = $(this).parents('tr').find('.c_name').attr('data-id');
		console.log(dele_id)
		$('.modal-wrap-dele').attr('data-id',dele_id);
		var name = $(this).parents('tr').find('.c_name').text();
		$('.dele-name').text(name);

	});
	// 确认删除单个课程信息
	$('.modal-wrap-dele').on('click', '.determine', function() {
		var course_id = $(this).parents('.modal-wrap-dele').attr('data-id');
		$.ajax({
     	type: "DELETE",
     	url: ajaxIp+"/api/v2/courses/"+course_id+"",
    	dataType: "JSON",
    	headers: {'Authorization': "Bearer " + isLogin},
    	success: function(data){
    		console.log(data);
    		get_all_course(null);
      },
      error: function(){
        	// alert('请稍后从新尝试登录或者联系管理员');
        	// localStorage.clear();
        	// window.location.href = './login.html'
      }
    });
	});

	// 更新课程信息弹框并获取信息
	$('body').on('click', '.edit', function() {
		$('.modal-course-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-course-wrap .modal-shadow').animate({'opacity': .3},500);
		$('.modal-course-wrap').show();
		get_grade_list('.modal-course-wrap');
		var course_id = $(this).parents('tr').find('.c_name').attr('data-id');
		$('.modal-course-wrap').attr('data-id',course_id);
		var info = {};
		var name = $(this).parents('tr').find();
		$.ajax({
     	type: "GET",
     	url: ajaxIp+"/api/v2/courses/"+course_id+"",
    	dataType: "JSON",
    	headers: {'Authorization': "Bearer " + isLogin},
    	success: function(data){
    		console.log(data);
    		show_single_info(data,course_id);
      },
      error: function(){
        	// alert('请稍后从新尝试登录或者联系管理员');
        	// localStorage.clear();
        	// window.location.href = './login.html'
      }
    });
	});

	function show_single_info(info,course_id){
		if(course_id==$('.modal-course-wrap').attr('data-id')){


		$('.modal-course-wrap').find('.course-name').val(info.name);
		$('.modal-course-wrap').find('.course-num').val(info.letter);
		$('.modal-course-wrap').find('.course-num').attr('disabled',true);
		$('.modal-course-wrap').find('.course-num').css({
			'opacity': 0.5,
		});
		$('.modal-course-wrap').find('#select-grade').attr('disabled',true);
		$('.modal-course-wrap').find('#select-grade').css({
			'opacity': 0.5,
		});
		$('.modal-course-wrap').find('#select-subjects').attr('disabled',true);
		$('.modal-course-wrap').find('#select-subjects').css({
			'opacity': 0.5,
		});
		$('.modal-course-wrap').find('.student-code').val(info.amount);
		console.log(info.grade_id)
		console.log(info.subject_id)
		console.log(info.teacher_info_id)
		// 显示年级
		var grade_list = $('.modal-course-wrap').find('#select-grade').children();
		for (var i = 0; i < grade_list.length; i++) {
			if(info.grade_id==$(grade_list[i]).val()){
				$(grade_list[i]).attr('selected', true);
			}
		};
		// 显示科目
		get_subject_list(info.grade_id,'.modal-course-wrap');
		var subject_list = $('.modal-course-wrap').find('#select-subjects').children();
		for (var i = 0; i < subject_list.length; i++) {
			if(info.subject_id==$(subject_list[i]).val()){
				$(subject_list[i]).attr('selected', true);
			}
		};

		// 显示教师
		var iData = ["grade_id",info.grade_id,"subject_id",info.subject_id];
 		get_teacher_info(iData);
		var teacher_list = $('.modal-course-wrap').find('#select-teachers').children();
		for (var i = 0; i < teacher_list.length; i++) {
			if(info.teacher_info_id==$(teacher_list[i]).val()){
				$(teacher_list[i]).attr('selected', true);
			}
		};
		}
	}

	// 清除课程弹框
	$('.courses-main #clear').on('click', function() {
		var grade_id = $(this).parents('.set-up-search').find('#select-grade').val();
		var subject_id = $(this).parents('.set-up-search').find('#select-subjects').val();
		if(grade_id==0){
			alert('请选择年级');
		}
		if(grade_id!=0&&subject_id==0){
			alert('请选择科目');
		}
		if(grade_id!=0&&subject_id!=0){
			var g_name = $(this).parents('.set-up-search').find('#select-grade option:selected').text();
			var s_name = $(this).parents('.set-up-search').find('#select-subjects option:selected').text();
			$('.modal-wrap-clear .modal-main').animate({'top': '50%','opacity': 1},500);
			$('.modal-wrap-clear .modal-shadow').animate({'opacity': .3},500);
			$('.modal-wrap-clear').show();
			console.log(s_name)
			$('.modal-wrap-clear .clear-g-name').text(g_name);
			$('.modal-wrap-clear .clear-s-name').text(s_name);
			$('.modal-wrap-clear #grade_input').val(grade_id);
			$('.modal-wrap-clear #subject_input').val(subject_id);
		}
	});
	// 确认清除课程
	$('.modal-wrap-clear').on('click', '.determine', function() {
		var grade_id=$('.modal-wrap-clear #grade_input').val();
		var subject_id=$('.modal-wrap-clear #subject_input').val();
		$.ajax({
     	type: "DELETE",
     	url: ajaxIp+"/api/v2/courses/destroy_by_grade_subject",
    	dataType: "JSON",
    	data:{'grade_id':grade_id,'subject_id':subject_id},
    	headers: {'Authorization': "Bearer " + isLogin},
    	success: function(data){
    		console.log(data);
    		get_all_course(null);
      },
      error: function(){
        	// alert('请稍后从新尝试登录或者联系管理员');
        	// localStorage.clear();
        	// window.location.href = './login.html'
      }
    });
	});







	// 学生列表
	// 获取所有学生
	function get_all_student(iData){
		var all_data={'page':1, 'limit': 10};
		if(iData!=null){
			for (var i = 0; i < iData.length; i+=2) {
				all_data[iData[i]] = iData[i+1];
			}
		}
		$.ajax({
	   	type: "GET",
	   	url: ajaxIp+"/api/v2/students/list_by_course",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	data:all_data,
	  	success: function(data){
	  		console.log(data);
	  		all_student_list(data,iData);
	    },
	    error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
	    }
	  });
	}
	// 学生列表
	function all_student_list(all,iData){
		var ii_num;
		if(all.total_count==0){
			ii_num=1;
		}else if(all.total_count>0 && all.total_count<10){
			ii_num=1;
		}else{
			ii_num=Math.ceil(all.total_count/10);
		}
		$.jqPaginator('#students-pagination', {
	  	totalPages: ii_num,
	    visiblePages: 5,
	    currentPage: 1,
	    disableClass: 'disableClass',
	    activeClass:'activeClass',
	    prev: '<li class="prev"><a href="javascript:;" class="pagination-color">上一页</a></li>',
	    next: '<li class="next"><a href="javascript:;" class="pagination-color">下一页</a></li>',
	    first: '<li class="prev"><a href="javascript:;" class="pagination-color">首页</a></li>',
	    last: '<li class="next"><a href="javascript:;" class="pagination-color">尾页</a></li>',
	    page: '<li class="page"><a href="javascript:;" class="pagination-color">{{page}}</a></li>',
	    onPageChange: function (num,type) {
	    	console.log(iData,all)
				var iDataI = {'page':num, 'limit': 10};
				console.log(iData,iDataI)
				if(iData!=null){
					for (var i = 0; i < iData.length; i+=2) {
						iDataI[iData[i]] = iData[i+1];
					}
				}

				if(type=='init'){
					show_all_student(all.students)
				}
				if(type=='change'){
	      	$.ajax({
			    	type: "GET",
			     	url: ajaxIp+"/api/v2/students/list_by_course",
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	data: iDataI,
			    	success: function(data){
			    		console.log(data)
			  			show_all_student(data.students);
			      },
			      error: function(){
		        	// alert('请稍后从新尝试登录或者联系管理员');
		        	// localStorage.clear();
		        	// window.location.href = './login.html'
			      }
			    });
	      }
	    }
	  });
	}
	// 显示学生
	function show_all_student(student_info){
		console.log(student_info)
		$('.stu-tabble tbody').html('');
		for (var i = 0; i < student_info.length; i++) {
			var t_tr =
					'<tr style="border-bottom:1px solid #ccc;">'+
						'<td>'+student_info[i].classroom_id+'</td>'+
						'<td>'+student_info[i].real_name+'</td>'+
						'<td>'+student_info[i].exam_no+'</td>'+
						'<td>'+student_info[i].course_name+'</td>'+
					'</tr>';
			$('.stu-tabble tbody').append(t_tr);
		};
	}
	// 学生列表年级选择
 	$('.stu-main #select-grade').on('change', function() {
 		$('.stu-main').find('#select-courses').html('');
 		var value = $(this).val();
 		console.log(value)
 		if(value!=0){
 			get_subject_list(value,'.stu-main');
 			var iData = ["grade_id",value];
 			get_all_student(iData);
 		}else{
 			$('.stu-main #select-subjects').html('');
 			$('.stu-main #select-subjects').append('<option value="0">全部科目</option>');
 			get_all_student(null);
 		}
 	});
 		// 学生列表科目选择
 	$('.stu-main #select-subjects').on('change', function() {
 		var g_value = $(this).parents('.set-up-search').find('#select-grade').val();
 		var s_value = $(this).val();
 		console.log(g_value,s_value)
 		if(s_value!=0){
 			var iData = ["grade_id",g_value,"subject_id",s_value];
 			get_select_course(iData);
 			get_all_student(iData);
 		}else{
 			var iData = ["grade_id",g_value];
 			$('.stu-main').find('#select-courses').html('');
 			get_all_student(iData);
 		}
 	});

 	$('.stu-main #select-courses').on('change', function() {
 		var g_value = $(this).parents('.set-up-search').find('#select-grade').val();
 		var s_value = $(this).parents('.set-up-search').find('#select-subjects').val();
 		var c_value = $(this).val();
 		console.log(g_value,s_value)
 		if(c_value!=0){
 			var iData = ["grade_id",g_value,"subject_id",s_value,'course_id',c_value];
 			get_all_student(iData);
 		}else{
 			var iData = ["grade_id",g_value,"subject_id",s_value,];
 			get_all_student(iData);
 		}
 	});


	// 获取课程列表
	function get_select_course(iData){
		var all_data={'page':1, 'limit': 100};
		if(iData!=null){
			for (var i = 0; i < iData.length; i+=2) {
				all_data[iData[i]] = iData[i+1];
			}
		}
		$.ajax({
	   	type: "GET",
	   	url: ajaxIp+"/api/v2/courses",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	data:all_data,
	  	success: function(data){
	  		console.log(data);
	  		if(data.courses.length>0){
	  			show_select_list(data.courses)
	  		}else{
	  			$('.stu-main').find('#select-courses').html('');
	  		}
	    },
	    error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
	    }
	  });
	}

	function show_select_list(info){
		$('.stu-main').find('#select-courses').html('');
		$('.stu-main').find('#select-courses').append('<option value="0">全部课程</option>');
		for (var i = 0; i < info.length; i++) {
			var c_op = '<option value="'+info[i].id+'">'+info[i].name+'</option>';
			$('.stu-main').find('#select-courses').append(c_op);
		};

	}
 	// 学生导入弹框
	$('.stu-import').click(function(){
		$('.import-stu-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.import-stu-wrap .modal-shadow').animate({'opacity': .3},500);
		$('.import-stu-wrap').show();
		$('#upfiles').html('未选择任何文件');
		$('.table-template').attr('href', ajaxIp+'/template/课程学生导入（模板）.xlsx');
	})
	$('#inPaths').change(function(){
		inputFlileNames('#inPaths');
	})
	// 确定导入学生
	$('body').on('click', '.import-stu-wrap .determine', function() {
		var formData = new FormData();
		formData.append("student_file",$("#inPaths")[0].files[0]);
		var i_string = $('#upfiles div').html();
		i_string_i = i_string.lastIndexOf(".");
		i_string = i_string.substring(i_string_i+1);
		console.log(i_string+'aaaaaaaaaaaaaaaaaaaa')
		console.log(formData)
		if(i_string!='xlsx' && i_string!='xls'){
			alert('文件格式不对，请选择xlsx或者xls文件！')
		}
		$('.import-stu-wrap').hide();
		$.ajax({
	   	type: "POST",
	   	url: ajaxIp+"/api/v2/students/import_by_course",
	  	dataType: "JSON",
	  	data: formData,
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	processData : false,
			contentType : false,
	  	beforeSend:function(){
					console.log("正在进行，请稍候");
			},
			success : function(data) {
				console.log(data);
				if(data.ok==1){
					get_all_student(null);
				}
			},
			error : function() {
				console.log("error");
			}
	  });
	});

	// 导出当前学生列表
	$('body').on('click', '.lead-out-student', function() {
		var grade_id = $(this).parents('.set-up-search').find('#select-grade').val();
		var subject_id = $(this).parents('.set-up-search').find('#select-subjects').val();
		var course_id = $(this).parents('.set-up-search').find('#select-courses').val();
		if(grade_id==0&&subject_id==0&&course_id==0){
			var data_all={};
		}
		if(grade_id!=0&&subject_id==0&&course_id==0){
			var data_all={'grade_id':grade_id};
		}
		if(grade_id!=0&&subject_id!=0&&course_id==0){
			var data_all={'grade_id':grade_id,'subject_id':subject_id};
		}
		if(grade_id!=0&&subject_id!=0&&course_id!=0){
			var data_all={'grade_id':grade_id,'subject_id':subject_id,'course_id':course_id};
		}
		var $this = $(this);
		$.ajax({
     	type: "GET",
     	async:false,
     	url: ajaxIp+"/api/v2/students/export_by_course",
    	dataType: "JSON",
    	data:data_all,
    	headers: {'Authorization': "Bearer " + isLogin},
    	success: function(data){
    		console.log(data);
    		if(data.filepath){
    			$this.children().attr('href', ajaxIp+data.filepath);
    		}
      },
      error: function(){
        	// alert('请稍后从新尝试登录或者联系管理员');
        	// localStorage.clear();
        	// window.location.href = './login.html'
      }
    });
	});

	// 清除学生
	// 清除学生弹框
	$('.stu-main #clear').on('click', function() {
		var grade_id = $(this).parents('.set-up-search').find('#select-grade').val();
		var subject_id = $(this).parents('.set-up-search').find('#select-subjects').val();
		var course_id = $(this).parents('.set-up-search').find('#select-courses').val();
		if(grade_id==0){
			alert('请选择年级');
		}
		if(grade_id!=0&&subject_id==0){
			alert('请选择科目');
		}
		if(grade_id!=0&&subject_id!=0&&course_id==0){
			alert('请选择课程');
		}
		if(grade_id!=0&&subject_id!=0&&course_id!=0){
			var g_name = $(this).parents('.set-up-search').find('#select-grade option:selected').text();
			var s_name = $(this).parents('.set-up-search').find('#select-subjects option:selected').text();
			var c_name = $(this).parents('.set-up-search').find('#select-courses option:selected').text();
			$('.modal-wrap-stu-clear .modal-main').animate({'top': '50%','opacity': 1},500);
			$('.modal-wrap-stu-clear .modal-shadow').animate({'opacity': .3},500);
			$('.modal-wrap-stu-clear').show();
			console.log(s_name)
			$('.clear-g-name').text(g_name);
			$('.clear-s-name').text(s_name);
			$('.clear-c-name').text(c_name);
			$('.modal-wrap-stu-clear #grade_input').val(grade_id);
			$('.modal-wrap-stu-clear #subject_input').val(subject_id);
			$('.modal-wrap-stu-clear #course_input').val(course_id);
		}
	});
	// 确认清除学生
	$('.modal-wrap-stu-clear').on('click', '.determine', function() {
		var grade_id=$('.modal-wrap-stu-clear #grade_input').val();
		var subject_id=$('.modal-wrap-stu-clear #subject_input').val();
		var course_id=$('.modal-wrap-stu-clear #course_input').val();
		$.ajax({
     	type: "DELETE",
     	url: ajaxIp+"/api/v2/students/destroy_by_course",
    	dataType: "JSON",
    	data:{'course_id':course_id},
    	headers: {'Authorization': "Bearer " + isLogin},
    	success: function(data){
    		console.log(data);
    		get_all_student(null);
      },
      error: function(){
        	// alert('请稍后从新尝试登录或者联系管理员');
        	// localStorage.clear();
        	// window.location.href = './login.html'
      }
    });
	});








 	// 学生课程设置
 	// 获取所有学生学生课程设置
	function get_all_set(iData){
		var all_data={'page':1, 'limit': 10};
		if(iData!=null){
			for (var i = 0; i < iData.length; i+=2) {
				all_data[iData[i]] = iData[i+1];
			}
		}
		$.ajax({
	   	type: "GET",
	   	url: ajaxIp+"/api/v2/courses/students_by_classroom",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	data:all_data,
	  	success: function(data){
	  		console.log(data);
	  		all_set_list(data,iData);
	    },
	    error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
	    }
	  });
	}
	// 学生课程设置列表
	function all_set_list(all,iData){
		var ii_num;
		if(all.total_count==0){
			ii_num=1;
		}else if(all.total_count>0 && all.total_count<10){
			ii_num=1;
		}else{
			ii_num=Math.ceil(all.total_count/10);
		}
		$.jqPaginator('#temporary-pagination', {
	  	totalPages: ii_num,
	    visiblePages: 5,
	    currentPage: 1,
	    disableClass: 'disableClass',
	    activeClass:'activeClass',
	    prev: '<li class="prev"><a href="javascript:;" class="pagination-color">上一页</a></li>',
	    next: '<li class="next"><a href="javascript:;" class="pagination-color">下一页</a></li>',
	    first: '<li class="prev"><a href="javascript:;" class="pagination-color">首页</a></li>',
	    last: '<li class="next"><a href="javascript:;" class="pagination-color">尾页</a></li>',
	    page: '<li class="page"><a href="javascript:;" class="pagination-color">{{page}}</a></li>',
	    onPageChange: function (num,type) {
	    	console.log(iData,all)
				var iDataI = {'page':num, 'limit': 10};
				console.log(iData,iDataI)
				if(iData!=null){
					for (var i = 0; i < iData.length; i+=2) {
						iDataI[iData[i]] = iData[i+1];
					}
				}

				if(type=='init'){
					show_all_set(all.student_infos)
				}
				if(type=='change'){
	      	$.ajax({
			    	type: "GET",
			     	url: ajaxIp+"/api/v2/courses/students_by_classroom",
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	data: iDataI,
			    	success: function(data){
			    		console.log(data)
			  			show_all_set(data.student_infos);
			      },
			      error: function(){
		        	// alert('请稍后从新尝试登录或者联系管理员');
		        	// localStorage.clear();
		        	// window.location.href = './login.html'
			      }
			    });
	      }
	    }
	  });
	}
	// 显示学生课程设置
	function show_all_set(student_info){
		console.log(student_info)
		$('.stu-course-tabble tbody').html('');
		for (var i = 0; i < student_info.length; i++) {
			var t_tr =
					'<tr class="tr_'+student_info[i].id+'" style="border-bottom:1px solid #ccc;" data-id="'+student_info[i].id+'">'+
						'<td>'+student_info[i].grade_name+''+student_info[i].classroom_name+'</td>'+
						'<td>'+student_info[i].real_name+'</td>'+
						'<td>'+student_info[i].exam_no+'</td>'+
						'<td class="all_change_course"><ul></ul></td>'+
					'</tr>';
			$('.stu-course-tabble tbody').append(t_tr);

			// 显示班级课程
			$('.tr_'+student_info[i].id+'').find('.all_change_course ul').html('');
			var classroom_info =student_info[i].classroom_courses;
			var classroom_checked_info =student_info[i].student_courses;
			for (var j = 0; j < classroom_info.length; j++) {
				var c_children = '<li class="li_'+j+'" data-id="'+classroom_info[j].id+'" subject_id="'+classroom_info[j].subject_id+'">'+
														'<span class="c_name">'+classroom_info[j].name+'</span>'+
														'<div class="check_box">'+
															'<input type="checkbox" value="" id="exam_'+student_info[i].id+'_'+classroom_info[j].id+'" class="" name="classroom-name">'+
															'<label for="exam_'+student_info[i].id+'_'+classroom_info[j].id+'"></label>'+
														'</div>'+
													'</li>';
				$('.tr_'+student_info[i].id+'').find('.all_change_course ul').append(c_children);
				for (var z = 0; z < classroom_checked_info.length; z++) {
					if(classroom_checked_info[z].id==classroom_info[j].id){
						$('.tr_'+student_info[i].id+'').find('.all_change_course ul').find('.li_'+j+' input').attr('checked',true);
					}
				};
			};
		};
	}
 	// 学生课程设置年级选择
 	$('.stu-course-main #select-grade').on('change', function() {
 		var value = $(this).val();
 		console.log(value)
 		if(value!=0){
 			get_class_list(value,'.stu-course-main');
 			var iData = ["grade_id",value];
 			get_all_set(iData);
 		}else{
 			$('.stu-course-main #select-sujects').html('');
 			$('.stu-course-main #select-sujects').append('<option value="0">全部班级</option>');
 			get_all_set(null);
 		}
 	});
 	// 学生课程设置班级选择
 	$('.stu-course-main #select-sujects').on('change', function() {
 		var g_value = $(this).parents('.set-up-search').find('#select-grade').val();
 		var s_value = $(this).val();
 		console.log(g_value,s_value)
 		if(s_value!=0){
 			var iData = ["grade_id",g_value,"classroom_id",s_value];
 			get_all_set(iData);
 		}else{
 			var iData = ["grade_id",g_value];
 			get_all_set(iData);
 		}
 	});

 	// 课程选择弹框
 	$('#course-select').on('click',  function() {
 		var g_value = $(this).parents('.set-up-search').find('#select-grade').val();
 		var class_value = $(this).parents('.set-up-search').find('#select-sujects').val();
 		if(g_value==0){
 			alert('请选择年级')
 		}
 		if(g_value!=0&&class_value==0){
 			alert('请选择班级')
 		}
 		if(g_value!=0&&class_value!=0){
 			$('.modal-wrap-course-change .modal-main').animate({'top': '50%','opacity': 1},500);
			$('.modal-wrap-course-change .modal-shadow').animate({'opacity': .3},500);
			$('.modal-wrap-course-change').show();
			get_subject_list(g_value,'.modal-wrap-course-change');
			$('.modal-wrap-course-change').attr('data-id',g_value);
			$('.modal-wrap-course-change').attr('classroom-id',class_value);
			$('.modal-wrap-course-change #course-left-list').html('');
			$('.modal-wrap-course-change #course-right-list').html('');
 		}
 	});

 	$('.modal-wrap-course-change').on('change', '#select-subjects', function() {
 		var g_value = $('.modal-wrap-course-change').attr('data-id');
 		var s_value = $(this).val();
 		console.log(g_value,s_value)
 		if(s_value!=0){
 			var iData = ["grade_id",g_value,"subject_id",s_value];
 		}else{
 			var iData = ["grade_id",g_value];
 		}
 		get_tk_course(iData);
 	});

	function get_tk_course(iData){
		var all_data={'page':1, 'limit': 100};
		if(iData!=null){
			for (var i = 0; i < iData.length; i+=2) {
				all_data[iData[i]] = iData[i+1];
			}
		}
		$.ajax({
	   	type: "GET",
	   	url: ajaxIp+"/api/v2/courses",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	data:all_data,
	  	success: function(data){
	  		console.log(data);
	  		if(data.courses.length>0){
	  			show_tk_list(data.courses)
	  		}
	  		if(data.courses.length==0){
	  			$('#course-left-list').html('');
	  		}
	    },
	    error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
	    }
	  });
	}

	function show_tk_list(info){
		console.log(info)
		$('#course-left-list').html('');
		for (var i = 0; i < info.length; i++) {
			var l_li = '<li class="clear">'+
						'<span class="left exam-name" data-id="'+info[i].id+'">'+info[i].name+'</span>'+
						'<div class="check_box right">'+
	          	'<input type="checkbox" value="" id="exam_'+info[i].id+'" class="" name="exam-name">'+
	          	'<label for="exam_'+info[i].id+'"></label>'+
	        	'</div>'+
					'</li>';
			$('#course-left-list').append(l_li);
		};
		// 是否被选中
		var c_r_li = $('.modal-wrap-course-change #course-right-list li');
		var c_l_li = $('.modal-wrap-course-change #course-left-list li');
		for (var m = 0; m < c_l_li.length; m++) {
			for (var i = 0; i < c_r_li.length; i++) {
				if($(c_r_li[i]).find('span').attr('data-id')==$(c_l_li[m]).find('.exam-name').attr('data-id')){
					$(c_l_li[m]).find('input').attr('checked',true);
				}
			};
		};
	}

	// 点击科目
  $('body').on('click', 'input[name="exam-name"]', function() {
		var $graBox = $("input[name='exam-name']");
		var this_text = $(this).parents('li').find('.exam-name').text();
		var this_id = $(this).parents('li').find('.exam-name').data('id');
		if (this.checked) {
			var rigth_li = '<li class="add-left"><span data-id="' + this_id + '">' + this_text + '</span></span><i class="iconfont">&#xe61b;</i></li>';
			$('.modal-wrap-course-change #course-right-list').append(rigth_li);
		} else {
			var t_li = $('.modal-wrap-course-change #course-right-list li');
			var t_length = t_li.length;
			for (var i = 0; i < t_length; i++) {
				var t_id = $(t_li[i]).find('span').attr('data-id');
				if (this_id == t_id) {
					$(t_li[i]).remove();
				};
			};
		};
	});

	//删除已经选择的科目
	$('body').on('click', '.modal-wrap-course-change #course-right-list li i', function() {
		var c_id = $(this).prev().attr('data-id');
		var course_left_li = $('.modal-wrap-course-change #course-left-list li');
		var course_left_length = course_left_li.length;
		for (var i = 0; i < course_left_length; i++) {
			var left_id = $(course_left_li[i]).find('.exam-name').attr('data-id');
			console.log(c_id,left_id)
			if (c_id == left_id) {
				$(course_left_li[i]).find('input').prop('checked', false);
			};
		};
		$(this).parent().remove();
	});

	// 确认添加班级课程
	$('.modal-wrap-course-change').on('click', '.confirm-change', function() {
		var classroom_id = $('.modal-wrap-course-change').attr('classroom-id');
		var c_r_li = $('.modal-wrap-course-change #course-right-list li');

		var g_value = $('.stu-course-main').find('#select-grade').val();
		var iData = ["grade_id",g_value,"classroom_id",classroom_id];
		var course_ids=[];
		for (var i = 0; i < c_r_li.length; i++) {
			var course_id = $(c_r_li[i]).find('span').attr('data-id');
			course_ids.push(course_id);
		};
		console.log(course_ids)
		$.ajax({
	   	type: "POST",
	   	url: ajaxIp+"/api/v2/courses/classroom_add_course",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	data:{'classroom_id':classroom_id,'course_ids':course_ids},
	  	success: function(data){
	  		console.log(data);
	  		get_all_set(iData);
	    },
	    error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
	    }
	  });
	});


	// 学生课程选择和移除
	$('body').on('click', '.all_change_course input', function() {
		var $this = $(this);
		var course_id = $this.parents('li').attr('data-id');
		var student_info_id = $this.parents('tr').attr('data-id');
		var num = parseInt($('#temporary-pagination .activeClass').text());
		if($this.prop('checked')){
			console.log(333)
			$.ajax({
		   	type: "POST",
		   	url: ajaxIp+"/api/v2/courses/student_add_course",
		  	dataType: "JSON",
		  	headers: {'Authorization': "Bearer " + isLogin},
		  	data:{'course_id':course_id,'student_info_id':student_info_id},
		  	success: function(data){
		  		console.log(data);
		  		if(num==1){
		  			// show_first_info(data)
		  		}
		    },
		    error: function(){
	      	// alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html'
		    }
		  });
		}else{
			$.ajax({
		   	type: "DELETE",
		   	url: ajaxIp+"/api/v2/courses/student_remove_course",
		  	dataType: "JSON",
		  	headers: {'Authorization': "Bearer " + isLogin},
		  	data:{'course_id':course_id,'student_info_id':student_info_id},
		  	success: function(data){
		  		console.log(data);
		    },
		    error: function(){
	      	// alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html'
		    }
		  });
		}
	});




	// 课程考分列表
	// 获取考试信息
	get_exam_info();
	var all_info;
	function get_exam_info(){
		$.ajax({
	   	type: "GET",
	   	async: false,
	   	url: ajaxIp+"/api/v2/special_reports/exams",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	success: function(data){
	  		console.log(data);
	  		all_info=data;
	  		show_exam_info(data);
	    },
	    error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
	    }
	  });
	}


	// 显示考试列表
	function show_exam_info(info){
		$('.score-grade-main').find('#select-exam').html('');
		$('.item-score-main').find('#select-exam').html('');
		$('.course-average-main').find('#select-exam').html('');
		if(info.length>0){
			// 显示考试下拉框
			for (var i = 0; i < info.length; i++) {
				var l_op = '<option value="'+info[i].id+'">'+info[i].name+'</option>';
				$('.score-grade-main #select-exam').append(l_op);
				$('.item-score-main #select-exam').append(l_op);
				$('.course-average-main #select-exam').append(l_op);
			};
			var subjects_info = info[0].subjects;
			console.log(subjects_info)
			// 显示第一场考试科目下拉框
			$('.score-grade-main').find('#select-sujects').html('');
			$('.item-score-main').find('#select-sujects').html('');
			$('.course-average-main').find('#select-sujects').html('');
			for (var j = 0; j < subjects_info.length; j++) {
				var sub_op = '<option value="'+subjects_info[j].subject_id+'">'+subjects_info[j].name+'</option>';
				$('.score-grade-main').find('#select-sujects').append(sub_op);
				$('.item-score-main').find('#select-sujects').append(sub_op);
				$('.course-average-main').find('#select-sujects').append(sub_op);
			};

			// 显示课程选择
			var course_info = info[0].subjects[0].courses;
			console.log(course_info)
			$('.score-grade-main').find('#select-courses').html('');
			for (var z = 0; z < course_info.length; z++) {
				var course_op = '<option value="'+course_info[z].id+'" letter="'+course_info[z].letter+'">'+course_info[z].name+'</option>';
				$('.score-grade-main').find('#select-courses').append(course_op);
			};

		}
	}

	// 课程考分列表考试选择
	$('.score-grade-main ').on('change', '#select-exam', function() {
		console.log(all_info);
		var exam_id = $(this).val();
		for (var i = 0; i < all_info.length; i++) {
			if(exam_id==all_info[i].id){
				var first_subject = all_info[i].subjects[0];
				show_subject_info('.score-grade-main',all_info[i].subjects);
			}
		};
		console.log(first_subject)

		show_course_info('.score-grade-main',first_subject.courses);
		var course_id = $(this).parents('.set-up-search').find('#select-courses').val();
		var sort = $(this).parents('.set-up-search').find('#select-ranges').val();
		console.log(exam_id,course_id,sort)
		get_course_list(exam_id,course_id,sort);
	});

	function show_subject_info(name,subjects){
		console.log(subjects)
		$(name).find('#select-sujects').html('');
		for (var i = 0; i < subjects.length; i++) {
			var sub_op = '<option value="'+subjects[i].subject_id+'">'+subjects[i].name+'</option>';
			$(name).find('#select-sujects').append(sub_op);
		};
	}

	function show_course_info(name,courses){
		console.log(courses)
		$(name).find('#select-courses').html('');
		for (var i = 0; i < courses.length; i++) {
			var sub_op = '<option value="'+courses[i].id+'" letter="'+courses[i].letter+'">'+courses[i].name+'</option>';
			$(name).find('#select-courses').append(sub_op);
		};
	}

		// 课程考分列表科目选择
	$('.score-grade-main ').on('change', '#select-sujects', function() {
		console.log(all_info);
		var sub_id = $(this).val();
		var exam_id = $(this).parents('.set-up-search').find('#select-exam').val();
		for (var i = 0; i < all_info.length; i++) {
			if(exam_id==all_info[i].id){
				for (var j = 0; j < all_info[i].subjects.length; j++) {
					if(sub_id==all_info[i].subjects[j].subject_id){
						show_course_info('.score-grade-main',all_info[i].subjects[j].courses);
					}
				};
			}
		};
		var course_id = $(this).parents('.set-up-search').find('#select-courses').val();
		var sort = $(this).parents('.set-up-search').find('#select-ranges').val();
		console.log(exam_id,course_id,sort)
		get_course_list(exam_id,course_id,sort);
	});

		// 课程考分列表课程选择
	$('.score-grade-main ').on('change', '#select-courses', function() {
		var course_id = $(this).val();
		var exam_id = $(this).parents('.set-up-search').find('#select-exam').val();
		var sort = $(this).parents('.set-up-search').find('#select-ranges').val();
		console.log(exam_id,course_id,sort)
		get_course_list(exam_id,course_id,sort);
	});
		// 课程考分列表排名顺序选择
	$('.score-grade-main ').on('change', '#select-ranges', function() {
		var sort = $(this).val();
		var exam_id = $(this).parents('.set-up-search').find('#select-exam').val();
		var course_id = $(this).parents('.set-up-search').find('#select-courses').val();
		get_course_list(exam_id,course_id,sort);
	});

	// 获取课程考分列表
	function get_course_list(e_id,c_id,sort){
		$('#score-grade-box').html('');
		var fixed_html='<table id="score-grade-tabble"class="search-tabble score-grade-tabble" cellpadding="0" cellspacing="0" style="width:900px;border-collapse:collapse;margin-bottom: 15px">'+
					'<thead>'+
						'<tr>'+
							'<th>序号</th>'+
							'<th>班级</th>'+
							'<th>考号</th>'+
							'<th>姓名</th>'+
							'<th>分数</th>'+
							'<th>标准分</th>'+
							'<th>等级</th>'+
							'<th>考试排名</th>'+
							'<th>学校排名</th>'+
						'</tr>'+
					'</thead>'+
					'<tbody></tbody>';
		$('#score-grade-box').append(fixed_html);
		if(e_id&&c_id){
			$.ajax({
		   	type: "POST",
		   	url: ajaxIp+"/api/v2/special_reports/course_socres",
		  	dataType: "JSON",
		  	headers: {'Authorization': "Bearer " + isLogin},
		  	data:{'exam_id':e_id,'course_id':c_id,'sort':sort},
		  	success: function(data){
		  		console.log(data);
		  		show_course_list(data);
		    },
		    error: function(){
	      	// alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html'
		    }
		  });
	  }
	}


	function show_course_list(info){
		console.log(info.data.length);
		if(info.data.length>0){
			for (var i = 0; i < info.data.length; i++) {
				var l_tr = '<tr style="border-bottom:1px solid #ccc;">'+
							'<td>'+info.data[i][0]+'</td>'+
							'<td>'+info.data[i][1]+'</td>'+
							'<td>'+info.data[i][2]+'</td>'+
							'<td>'+info.data[i][3]+'</td>'+
							'<td>'+info.data[i][4]+'</td>'+
							'<td>'+info.data[i][5]+'</td>'+
							'<td>'+info.data[i][6]+'</td>'+
							'<td>'+info.data[i][7]+'</td>'+
							'<td>'+info.data[i][8]+'</td>'+
						'</tr>';
				$('#score-grade-tabble tbody').append(l_tr);
			};
			FixTable("score-grade-tabble", 1, 960, 600);

		}

	}

	// 导出课程考分列表
	$('.score-grade-main').on('click', '.Lead-out-score', function() {
		var sort = $(this).parents('.set-up-search').find('#select-ranges').val();
		var exam_id = $(this).parents('.set-up-search').find('#select-exam').val();
		var course_id = $(this).parents('.set-up-search').find('#select-courses').val();
		get_score_excel(exam_id,course_id,sort);
	});

	function get_score_excel(e_id,c_id,sort){
		console.log(e_id,c_id)
		if(e_id&&c_id){
			$.ajax({
		   	type: "POST",
		   	async: false,
		   	url: ajaxIp+"/api/v2/special_reports/export_course_socres",
		  	dataType: "JSON",
		  	headers: {'Authorization': "Bearer " + isLogin},
		  	data:{'exam_id':e_id,'course_id':c_id,'sort':sort},
		  	success: function(data){
		  		console.log(data);
		  		$('.score-grade-main .Lead-out-score a').attr('href', ajaxIp+data.file_path);
		    },
		    error: function(){
	      	// alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html'
		    }
		  });
		}

	}





	// 小题得分对比
	// 小题得分对比考试选择
	$('.item-score-main ').on('change', '#select-exam', function() {
		console.log(all_info);
		var exam_id = $(this).val();
		for (var i = 0; i < all_info.length; i++) {
			if(exam_id==all_info[i].id){
				show_subject_info('.item-score-main ',all_info[i].subjects);
			}
		};
		var subject_id = $(this).parents('.set-up-search').find('#select-sujects').val();
		get_item_score(exam_id,subject_id)
	});

	// 小题得分对比科目选择
	$('.item-score-main ').on('change', '#select-sujects', function() {
		console.log(all_info);
		var subject_id = $(this).val();
		var exam_id = $(this).parents('.set-up-search').find('#select-exam').val();
		get_item_score(exam_id,subject_id)
	});

	// 获取小题得分对比列表
	function get_item_score(e_id,sub_id){
		$('.item-score-box').html('');
		var fixed_html = '<table id="item-score-tabble" class="search-tabble item-score-tabble" cellpadding="0" cellspacing="0" style="width:966px;border-collapse:collapse;margin-bottom: 15px">'+
						'<thead>'+
							'<tr class="first-tr">'+
							'</tr>'+
							'<tr class="second-tr"></tr>'+
						'</thead>'+
						'<tbody></tbody>';
		$('.item-score-box').append(fixed_html);
		if(e_id&&sub_id){
			$.ajax({
		   	type: "POST",
		   	url: ajaxIp+"/api/v2/special_reports/course_answer_contrast",
		  	dataType: "JSON",
		  	headers: {'Authorization': "Bearer " + isLogin},
		  	data:{'exam_id':e_id,'subject_id':sub_id},
		  	success: function(data){
		  		console.log(data);
		  		show_item_score(data);
		    },
		    error: function(){
	      	// alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html'
		    }
		  });
		}

	}

	// 显示小题得分列表
	function show_item_score(info){
		$('#item-score-tabble').find('.first-tr').html('');
		$('#item-score-tabble').find('.second-tr').html('');
		// $('#item-score-tabble').find('.tbody').html('');
		$('#item-score-tabble').find('.first-tr').append('<th rowspan="2">题目</th><th rowspan="2">题分</th>');
		for (var i = 0; i < info.colums_name.length; i++) {
			var first_tr = '<th colspan="2">'+info.colums_name[i]+'</th>';
			var second_tr = '<th class="th-'+i+'">平均分</th><th class="th-'+i+'">得分率</th>';
			$('#item-score-tabble').find('.first-tr').append(first_tr);
			$('#item-score-tabble').find('.second-tr').append(second_tr);
		};
		if( info.data.length>0){

			for (var j = 0; j < info.data.length; j++) {
				var t_tr = '<tr class="tr-'+j+'"></tr>';
				$('#item-score-tabble').find('tbody').append(t_tr);
				// console.log(info.data[0].length)
				var all_length = info.data[0].length;
				for (var z = 0; z < all_length; z++) {
					var t_td ='<td>'+info.data[j][z]+'</td>';
					$('#item-score-tabble tbody').find('.tr-'+j+'').append(t_td);
				};
			};
		}
		FixTable("item-score-tabble", 2, 960, 600);
	}


	// 导出小题得分

	$('.item-score-main').on('click', '.Lead-out-item', function() {
		var exam_id = $(this).parents('.set-up-search').find('#select-exam').val();
		var subject_id = $(this).parents('.set-up-search').find('#select-sujects').val();
		get_item_excel(exam_id,subject_id);
	});

	function get_item_excel(e_id,sub_id){
		console.log(e_id,sub_id)
		if(e_id&&sub_id){
			$.ajax({
		   	type: "POST",
		   	async: false,
		   	url: ajaxIp+"/api/v2/special_reports/export_course_answer_contrast",
		  	dataType: "JSON",
		  	headers: {'Authorization': "Bearer " + isLogin},
		  	data:{'exam_id':e_id,'subject_id':sub_id},
		  	success: function(data){
		  		console.log(data);
		  		$('.item-score-main .Lead-out-item a').attr('href', ajaxIp+data.file_path);
		    },
		    error: function(){
	      	// alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html'
		    }
		  });
		}

	}














	// 课程均分统计
	// 课程均分统计考试选择
	$('.course-average-main ').on('change', '#select-exam', function() {
		console.log(all_info);
		var exam_id = $(this).val();
		for (var i = 0; i < all_info.length; i++) {
			if(exam_id==all_info[i].id){
				show_subject_info('.course-average-main ',all_info[i].subjects);
			}
		};
		var subject_id = $(this).parents('.set-up-search').find('#select-sujects').val();
		get_average_info(exam_id,subject_id);
	});

	// 课程均分统计科目选择
	$('.course-average-main ').on('change', '#select-sujects', function() {
		var subject_id = $(this).val();
		var exam_id = $(this).parents('.set-up-search').find('#select-exam').val();
		get_average_info(exam_id,subject_id);
	});

	// 获取平均分
	function get_average_info(e_id,sub_id){
		$('.course-average-box').html('');
		var fixed_html='<table id="course-average-tabble" class="search-tabble course-average-tabble" cellpadding="0" cellspacing="0" style="width:966px;border-collapse:collapse;margin-bottom: 15px">'+
						'<thead>'+
							'<tr>'+
								'<th>课程</th>'+
								'<th>教师</th>'+
								'<th>平均分</th>'+
								'<th>名次</th>'+
								'<th>优良率</th>'+
								'<th>合格率</th>'+
								'<th>去随班/实考/应考</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody></tbody>';
		$('.course-average-box').append(fixed_html);
		if(e_id&&sub_id){
			$.ajax({
		   	type: "POST",
		   	url: ajaxIp+"/api/v2/special_reports/course_average_statistics",
		  	dataType: "JSON",
		  	headers: {'Authorization': "Bearer " + isLogin},
		  	data:{'exam_id':e_id,'subject_id':sub_id},
		  	success: function(data){
		  		console.log(data);
		  		show_average_info(data);
		    },
		    error: function(){
	      	// alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html'
		    }
		  });
		}

	}
	// 显示平均分
	function show_average_info(info){
		console.log(info.data.length);
		if(info.data.length>0){
			for (var i = 0; i < info.data.length; i++) {
				var l_tr = '<tr style="border-bottom:1px solid #ccc;">'+
							'<td>'+info.data[i][0]+'</td>'+
							'<td>'+info.data[i][1]+'</td>'+
							'<td>'+info.data[i][2]+'</td>'+
							'<td>'+info.data[i][3]+'</td>'+
							'<td>'+info.data[i][4]+'</td>'+
							'<td>'+info.data[i][5]+'</td>'+
							'<td>'+info.data[i][6]+'</td>'+
						'</tr>';
				$('#course-average-tabble tbody').append(l_tr);
			};
			FixTable("course-average-tabble", 2, 960, 600);
		}
	}


	// 导出平均分
	$('.course-average-main').on('click', '.Lead-out-average', function() {
		var exam_id = $(this).parents('.set-up-search').find('#select-exam').val();
		var subject_id = $(this).parents('.set-up-search').find('#select-sujects').val();
		get_average_excel(exam_id,subject_id);
	});

	function get_average_excel(e_id,sub_id){
		console.log(e_id,sub_id)
		if(e_id&&sub_id){
			$.ajax({
		   	type: "POST",
		   	async: false,
		   	url: ajaxIp+"/api/v2/special_reports/export_course_average_statistics",
		  	dataType: "JSON",
		  	headers: {'Authorization': "Bearer " + isLogin},
		  	data:{'exam_id':e_id,'subject_id':sub_id},
		  	success: function(data){
		  		console.log(data);
		  		$('.course-average-main .Lead-out-average a').attr('href', ajaxIp+data.file_path);
		    },
		    error: function(){
	      	// alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html'
		    }
		  });
		}

	}




	//锁定表头和列
	function FixTable(TableID, FixColumnNumber, width, height) {
    if ($("#" + TableID + "_tableLayout").length != 0) {
        $("#" + TableID + "_tableLayout").before($("#" + TableID));
        $("#" + TableID + "_tableLayout").empty();
    }
    else {
        $("#" + TableID).after("<div id='" + TableID + "_tableLayout' style='overflow:hidden;height:" + height + "px; width:" + width + "px;'></div>");
    }
    $('<div id="' + TableID + '_tableFix"></div>'
            + '<div id="' + TableID + '_tableHead"></div>'
            + '<div id="' + TableID + '_tableColumn"></div>'
            + '<div id="' + TableID + '_tableData"></div>').appendTo("#" + TableID + "_tableLayout");
    var oldtable = $("#" + TableID);
    var tableFixClone = oldtable.clone(true);
    tableFixClone.attr("id", TableID + "_tableFixClone");
    $("#" + TableID + "_tableFix").append(tableFixClone);
    var tableHeadClone = oldtable.clone(true);
    tableHeadClone.attr("id", TableID + "_tableHeadClone");
    $("#" + TableID + "_tableHead").append(tableHeadClone);
    var tableColumnClone = oldtable.clone(true);
    tableColumnClone.attr("id", TableID + "_tableColumnClone");
    $("#" + TableID + "_tableColumn").append(tableColumnClone);
    $("#" + TableID + "_tableData").append(oldtable);
    $("#" + TableID + "_tableLayout table").each(function () {
        $(this).css("margin", "0");
    });
    var HeadHeight = $("#" + TableID + "_tableHead thead").height();
    HeadHeight += 2;
    $("#" + TableID + "_tableHead").css("height", HeadHeight);
    $("#" + TableID + "_tableFix").css("height", HeadHeight);
    var ColumnsWidth = 0;
    var ColumnsNumber = 0;
    $("#" + TableID + "_tableColumn tr:last td:lt(" + FixColumnNumber + ")").each(function () {
        ColumnsWidth += $(this).outerWidth(true);
        ColumnsNumber++;
    });
    ColumnsWidth += 2;
    if ($.support.msie) {
        switch ($.support.version) {
            case "7.0":
                if (ColumnsNumber >= 3) ColumnsWidth--;
                break;
            case "8.0":
                if (ColumnsNumber >= 2) ColumnsWidth--;
                break;
        }
    }
    $("#" + TableID + "_tableColumn").css("width", ColumnsWidth);
    $("#" + TableID + "_tableFix").css("width", ColumnsWidth);
    $("#" + TableID + "_tableData").scroll(function () {
        $("#" + TableID + "_tableHead").scrollLeft($("#" + TableID + "_tableData").scrollLeft());
        $("#" + TableID + "_tableColumn").scrollTop($("#" + TableID + "_tableData").scrollTop());
    });
    $("#" + TableID + "_tableFix").css({ "overflow": "hidden", "position": "relative", "z-index": "50", "background-color": "#fff" });
    $("#" + TableID + "_tableHead").css({ "overflow": "hidden", "width": width - 17, "position": "relative", "z-index": "45", "background-color": "#fff" });
    $("#" + TableID + "_tableColumn").css({ "overflow": "hidden", "height": height - 17, "position": "relative", "z-index": "40", "background-color": "#fff" });
    $("#" + TableID + "_tableData").css({ "overflow": "scroll", "width": width, "height": height, "position": "relative", "z-index": "35" });
    if ($("#" + TableID + "_tableHead").width() > $("#" + TableID + "_tableFix table").width()) {
        $("#" + TableID + "_tableHead").css("width", $("#" + TableID + "_tableFix table").width());
        $("#" + TableID + "_tableData").css("width", $("#" + TableID + "_tableFix table").width() + 17);
    }
    if ($("#" + TableID + "_tableColumn").height() > $("#" + TableID + "_tableColumn table").height()) {
        $("#" + TableID + "_tableColumn").css("height", $("#" + TableID + "_tableColumn table").height());
        $("#" + TableID + "_tableData").css("height", $("#" + TableID + "_tableColumn table").height() + 17);
    }
    $("#" + TableID + "_tableFix").offset($("#" + TableID + "_tableLayout").offset());
    $("#" + TableID + "_tableHead").offset($("#" + TableID + "_tableLayout").offset());
    $("#" + TableID + "_tableColumn").offset($("#" + TableID + "_tableLayout").offset());
    $("#" + TableID + "_tableData").offset($("#" + TableID + "_tableLayout").offset());
	}





})