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
  	}
  	if(index==2){
 			get_grade_list('.stu-course-main');
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
	    onPageChange: function (num) {
	    	console.log(iData,all)
				var iDataI = {'page':num, 'limit': 10};
				console.log(iData,iDataI)
				if(iData!=null){
					for (var i = 0; i < iData.length; i+=2) {
						iDataI[iData[i]] = iData[i+1];
					}
				}

				if(num==1){
					show_all_course(all.courses)
				}
				if(num>1){
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
	$('#inPaths').change(function(){
		inputFlileNames('#inPaths')
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
		// $(name).prev().find('div').length
		if($(name).prev().find('div').length==0){
			$(name).prev().html('');
		}
		var iDiv = $('<div data-url='+file+'></div>')
		iDiv.text(fileName);
		// iDiv.data('url',file);
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
		// $('.modal-course-wrap').find('#select-grade').val(info.grade_id);
		// $('.modal-course-wrap').find('#select-subjects').val(info.subject_id);
		// $('.modal-course-wrap').find('#select-teachers').val(info.teacher_info_id);
		$('.modal-course-wrap').find('.student-code').val(info.amount);
		// console.log($('.modal-course-wrap').find('#select-grade').html());
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
 		get_teacher_info(iData,);
		var teacher_list = $('.modal-course-wrap').find('#select-teachers').children();
		for (var i = 0; i < teacher_list.length; i++) {
			if(info.teacher_info_id==$(teacher_list[i]).val()){
				$(teacher_list[i]).attr('selected', true);
			}
		};
		}
	}

	// 清除课程弹框
	$('#clear').on('click', function() {
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
			$('.clear-g-name').text(g_name);
			$('.clear-s-name').text(s_name);
			$('#grade_input').val(grade_id);
			$('#subject_input').val(subject_id);
		}
	});
	// 确认清除课程
	$('.modal-wrap-clear').on('click', '.determine', function() {
		var grade_id=$('#grade_input').val();
		var subject_id=$('#subject_input').val();
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
	// 学生列表年级选择
 	$('.stu-main #select-grade').on('change', function() {
 		var value = $(this).val();
 		console.log(value)
 		if(value!=0){
 			get_subject_list(value,'.stu-main');
 		}else{
 			$('.stu-main #select-subjects').html('');
 			$('.stu-main #select-subjects').append('<option value="0">全部科目</option>');
 		}
 	});

 		// 学生导入弹框
	$('.stu-import').click(function(){
		$('.import-stu-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.import-stu-wrap .modal-shadow').animate({'opacity': .3},500);
		$('.import-stu-wrap').show();
		$('.table-template').attr('href', ajaxIp+'/template/课程学生导入（模板）.xlsx');
	})


 	// 学生课程设置
 	// 学生课程设置年级选择
 	$('.stu-course-main #select-grade').on('change', function() {
 		var value = $(this).val();
 		console.log(value)
 		if(value!=0){
 			get_class_list(value,'.stu-course-main');
 		}else{
 			$('.stu-course-main #select-sujects').html('');
 			$('.stu-course-main #select-sujects').append('<option value="0">全部班级</option>');
 		}
 	});




})