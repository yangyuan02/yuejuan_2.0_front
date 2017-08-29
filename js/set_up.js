$(function() {
	var isLogin = localStorage.getItem("token");
	var school_id;
	// var school_grades_array = [];
	var isTrueFalse = true;
	var isAdd = true;
	var isStudent = true;
	selectALl(null,null);
	students_selectALl(null,null);
	selectGrades('.user-information-right');
	selectGrades('.user-change-password');
	batch_export();
	// schoolGrades();
	$('#inPath').change(function(){
		inputFlileName()
	})


	$('.create-class').click(function(){
		$('.modal-wrap-class .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-wrap-class .modal-shadow').animate({'opacity': .3},500);
		$('.modal-wrap-class').show();

		$('.modal-wrap-class .modal-title').text('创建班级');
		$('.modal-wrap-class #add-class-grade').html('');
		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/commons/school_grades",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){
	  			for (var i = 0; i < data.length; i++) {
					var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
					$('.modal-wrap-class #add-class-grade').append(iOption);
				}
	        },
	        error: function(){
	        	// alert('请稍后从新尝试登录或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login.html'
	        }
	    });

	    $('.modal-wrap-class .determine').on('click' , function(){
	    	var new_grade = $('#add-class-grade').val();
	    	var class_count = $('#class-name').val();

	    	$.ajax({
		     	type: "POST",
		     	url: ajaxIp+"/api/v2/students/add_classroom",
		    	dataType: "JSON",
		    	headers: {'Authorization': "Bearer " + isLogin},
		    	data:{
		    		'grade_id':new_grade,
		    		'count':class_count,
		    	},
		    	success: function(data){
		    		console.log(data)
		  			if (data.success) {
		  				alert(data.message)
		  			}else{
		  				alert(data.message)
		  			}
		        },
		        error: function(){
		        	// alert('请稍后从新尝试登录或者联系管理员');
		        	// localStorage.clear();
		        	// window.location.href = './login.html'
		        }
		    });
	    })

	})



	$('.student-supervise').click(function(){
		$('.modal-wrap-class-management .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-wrap-class-management .modal-shadow').animate({'opacity': .3},500);
		$('.modal-wrap-class-management').show();

		$('.modal-wrap-class-management .modal-title').text('班级管理');
		$('#add-class-grade').html('');

		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/commons/school_grades",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){
	    		$('.modal-wrap-class-management #add-class-grade').html('')
	  			for (var i = 0; i < data.length; i++) {
					var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
					$('.modal-wrap-class-management #add-class-grade').append(iOption);
				}

				$.ajax({
			     	type: "GET",
			     	url: ajaxIp+"/api/v2/commons/"+$('.modal-wrap-class-management #add-class-grade').val()+"/grade_classrooms",
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	success: function(data){
			    		console.log(data)
			    		$('.modal-wrap-class-management #del-class-name').html('');
			  			for (var i = 0; i < data.length; i++) {
							var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
							$('.modal-wrap-class-management #del-class-name').append(iOption);
						}
			        },
			        error: function(){
			        	// alert('请稍后从新尝试登录或者联系管理员');
			        	// localStorage.clear();
			        	// window.location.href = './login.html'
			        }
			    });
	        },
	        error: function(){
	        	// alert('请稍后从新尝试登录或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login.html'
	        }
	    });

	    $('.modal-wrap-class-management #add-class-grade').change(function(){
	    	$('.modal-wrap-class-management #del-class-name').html('');
	    	$.ajax({
		     	type: "GET",
		     	url: ajaxIp+"/api/v2/commons/"+$(this).val()+"/grade_classrooms",
		    	dataType: "JSON",
		    	headers: {'Authorization': "Bearer " + isLogin},
		    	success: function(data){
		    		console.log(data)
		    		$('.modal-wrap-class-management #select-sujects').html('');
		  			for (var i = 0; i < data.length; i++) {
						var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
						$('.modal-wrap-class-management #del-class-name').append(iOption);
					}
		        },
		        error: function(){
		        	// alert('请稍后从新尝试登录或者联系管理员');
		        	// localStorage.clear();
		        	// window.location.href = './login.html'
		        }
		    });
	    });


		$('.modal-wrap-class-management .clear-students').unbind().on('click', function(){
			var del_grade = $('.modal-wrap-class-management #add-class-grade').val();
			var del_name = $('.modal-wrap-class-management #del-class-name').val();

			$.ajax({
		     	type: "DELETE",
		     	url: ajaxIp+"/api/v2/students/destroy_classroom_students",
		    	dataType: "JSON",
		    	headers: {'Authorization': "Bearer " + isLogin},
		    	data:{
		    		'grade_id':del_grade,
		    		'classroom_id':del_name,
		    	},
		    	success: function(data){
		    		console.log(data)
		  			if (data.success) {
		  				alert(data.message)
		  				$('.modal-main').animate({'top': '45%','opacity': 0},500);
						$('.modal-shadow').animate({'opacity': 0},500);
						setTimeout(function(){
							$('.modal-wrap').hide();
						},500);
		  			}else{
		  				alert(data.message)
		  				$('.modal-main').animate({'top': '45%','opacity': 0},500);
						$('.modal-shadow').animate({'opacity': 0},500);
						setTimeout(function(){
							$('.modal-wrap').hide();
						},500);
		  			}
		        },
		        error: function(){
		        	// alert('请稍后从新尝试登录或者联系管理员');
		        	// localStorage.clear();
		        	// window.location.href = './login.html'
		        }
		    });
		})



	    $('.modal-wrap-class-management .determine').on('click' , function(){
	    	var del_grade = $('.modal-wrap-class-management #del-class-name').val();
	    	// var class_count = $('#class-name').val();

	    	$.ajax({
		     	type: "DELETE",
		     	url: ajaxIp+"/api/v2/students/destroy_classroom",
		    	dataType: "JSON",
		    	headers: {'Authorization': "Bearer " + isLogin},
		    	data:{
		    		'classroom_id':del_grade,
		    	},
		    	success: function(data){
		    		console.log(data)
		  			if (data.success) {
		  				alert(data.message)
		  			}else{
		  				alert(data.message)
		  			}
		        },
		        error: function(){
		        	// alert('请稍后从新尝试登录或者联系管理员');
		        	// localStorage.clear();
		        	// window.location.href = './login.html'
		        }
		    });
	    })

	})

	function inputFlileName(){
		var file = $("#inPath").val();
		var fileName = getFileName(file);
		$("#upfile").html('未选择任何文件');
		function getFileName(o){
		    var pos=o.lastIndexOf("\\");
		    return o.substring(pos+1);
		}
		if(($("#upfile div").length)==0){
			$("#upfile").html('');
		}
		var iDiv = $('<div data-url='+file+'></div>')
		iDiv.text(fileName);
		// iDiv.data('url',file);
		iDiv.css({'display':'inline-block','color':'#666','background':'#dcf5f0','padding':'0 10px','height':'26px','border-radius':'2px','margin-right':'5px'});
		$('#upfile').append(iDiv);

	}


	$('.import-wrap .determine').click(function(){
		var formData = new FormData();
		formData.append("import_student",$("#inPath")[0].files[0]);
		console.log(isStudent)
		var i_string = $('#upfile div').html();
		i_string_i = i_string.lastIndexOf(".");
		i_string = i_string.substring(i_string_i+1);
		console.log(i_string+'aaaaaaaaaaaaaaaaaaaa')
		console.log(formData)
		if(i_string!='xlsx' && i_string!='xls'){
			alert('文件格式不对，请选择xlsx或者xls文件！')
		}

		if(isStudent=='1'){
			$.ajax({
				url : ajaxIp+"/api/v2/students/batch_import",
				type : 'POST',
				data : formData,
				headers: {'Authorization': "Bearer " + isLogin},
				processData : false,
				contentType : false,
				beforeSend:function(){
					console.log("正在进行，请稍候");
				},
				success : function(data) {
					console.log(data)
					alert(data.message)
					$('.modal-main').animate({'top': '45%','opacity': 0},500);
					$('.modal-shadow').animate({'opacity': 0},500);
					setTimeout(function(){
						$('.modal-wrap').hide();
					},500);
				},
				error : function() {
					console.log("error");
				}
			});
		}else{
			$.ajax({
				url : ajaxIp+"/api/v2/teachers/batch_import",
				type : 'POST',
				data : formData,
				headers: {'Authorization': "Bearer " + isLogin},
				processData : false,
				contentType : false,
				beforeSend:function(){
					console.log("正在进行，请稍候");
				},
				success : function(data) {
					console.log(data)
				},
				error : function() {
					console.log("error");
				}
			});
		}

	})

	$('.batch-import').click(function(){
		isStudent = $(this).attr('data-name');
		$('#upfile').html('未选择任何文件');
		$('.import-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.import-wrap .modal-shadow').animate({'opacity': .3},500);
		$('.import-wrap').show();
		$('.import-wrap').removeClass('import-grade-wrap');
		if(isStudent=='1'){
			$('.table-template').attr('href', ajaxIp+'/template/学生信息表格.xlsx');
		}else{
			$('.table-template').attr('href', ajaxIp+'/template/老师信息表格.xlsx');
		}
	});

	$('.search-button').click(function(){
		if($('.search-input').val()!='')
			console.log(1)
		selectALl(["keyword", $('.search-input').val()])
	})

	$('.student-search-button').click(function(){
		if($('.student-search-input').val()!='')
		students_selectALl(["keyword", $('.student-search-input').val()])
	})


	$('.user-information-right #select-grade').change(function(){
		if($(this).val()!=0){
			// $('.user-information-right #select-sujects').html('<option value="0">全部科目</option>');
			selectSubjects($(this).val());
			selectALl(["grade_id",$(this).val()])
		}else{
			selectALl(null,null);
			$('.user-information-right #select-sujects').html('<option value="0">全部科目</option>');
		}

	});

	$('.user-change-password #select-grade').change(function(){

		if($(this).val()!=0){
			$('.user-change-password #select-sujects').html('<option value="0">全部班级</option>');
			studentSelectSubjects($(this).val());
			students_selectALl(["grade_id",$(this).val()])
		}else{
			students_selectALl(null,null);
			$('.user-change-password #select-sujects').html('<option value="0">全部班级</option>');
		}

	});

	$('.user-information-right #select-sujects').change(function(){
		if($(this).val()!=0 && $('.user-information-right #select-grade').val()!=0){
			var iData = [
				"grade_id",$('.user-information-right #select-grade').val(),
				"subject_id",$(this).val(),
			]
			selectALl(iData)
		}else if($(this).val()==0 && $('.user-information-right #select-grade').val()!=0){
			$('.user-information-right #select-sujects').html('<option value="0">全部科目</option>');
			selectSubjects($('.user-information-right #select-grade').val());
			selectALl(["grade_id",$('.user-information-right #select-grade').val()])
		}
	});

	$('.user-change-password #select-sujects').change(function(){
		if($(this).val()!=0 && $('.user-change-password #select-grade').val()!=0){
			var iData = [
				"grade_id",$('.user-change-password #select-grade').val(),
				"classroom_id",$(this).val(),
			]
			students_selectALl(iData)
		}else if($(this).val()==0 && $('.user-change-password #select-grade').val()!=0){
			$('.user-change-password #select-sujects').html('<option value="0">全部年级</option>');
			studentSelectSubjects($('.user-change-password #select-grade').val());
			students_selectALl(["grade_id",$('.user-change-password #select-grade').val()])
		}
	});

	function selectALl(iData){
		var iDataI = {'page':1, 'limit': 10};
		if(iData!=null){
			for (var i = 0; i < iData.length; i+=2) {
				iDataI[iData[i]] = iData[i+1];
			}
		}
		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/teachers",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	data:iDataI,
	    	success: function(data){
	    		console.log(data)
	  			teachersList(data.total_entries, iData)
	        },
	        error: function(){
	        	// alert('请稍后从新尝试登录或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login.html'
	        }
	    });
	}

	function students_selectALl(iData){
		var iDataI = {'page':1, 'limit': 10};
		if(iData!=null){
			for (var i = 0; i < iData.length; i+=2) {
				iDataI[iData[i]] = iData[i+1];
			}
		}
		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/students",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	data:iDataI,
	    	success: function(data){
	    		console.log(data)

	  			studentsList(data.total_entries, iData)
	        },
	        error: function(){
	        	// alert('请稍后从新尝试登录或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login.html'
	        }
	    });
	}

	function batch_export(){
		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/teachers/batch_export",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){

	    		console.log(data)
	  			if(data.filepath){
	  				$('.Lead-in-teacher a').attr('href', ajaxIp+data.filepath);
	  			}
	        },
	        error: function(){
	        	// alert('请稍后从新尝试登录或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login.html'
	        }
	    });

	    $.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/students/batch_export",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){

	    		console.log(data)
	  			if(data.filepath){
	  				$('.Lead-in-student a').attr('href', ajaxIp+data.filepath);
	  			}
	        },
	        error: function(){
	        	// alert('请稍后从新尝试登录或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login.html'
	        }
	    });
	}



	function schoolGrades(){
		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/commons/school_grades",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){
	    		console.log(data)
	        }
	    });
	}

	function teachersList(num, iData){
		var ii_num;
		console.log(num+'2222222222222222222222')
		if(num==0){
			ii_num=1;
		}else if(num>0 && num<10){
			ii_num=1;
		}else{
			ii_num=Math.ceil(num/10);
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
	        	console.log(iData)
				var iDataI = {'page':num, 'limit': 10};
				if(iData!=null){
					for (var i = 0; i < iData.length; i+=2) {
						iDataI[iData[i]] = iData[i+1];
					}
				}
	            $.ajax({
			     	type: "GET",
			     	url: ajaxIp+"/api/v2/teachers",
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	data: iDataI,
			    	success: function(data){
			    		console.log(data)
			  			teachers_list(data.teachers);
			        },
			        error: function(){
			        	// alert('请稍后从新尝试登录或者联系管理员');
			        	// localStorage.clear();
			        	// window.location.href = './login.html'
			        }
			    });
	        }
	    });
	}


	function studentsList(num, iData){
		if(num==0){
			ii_num=1;
		}else if(num>0 && num<10){
			ii_num=1;
		}else{
			ii_num=Math.ceil(num/10);
		}
		$.jqPaginator('#students-pagination', {
	        totalPages:ii_num,
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
	        	console.log(iData)
				var iDataI = {'page':num, 'limit': 10};
				if(iData!=null){
					for (var i = 0; i < iData.length; i+=2) {
						iDataI[iData[i]] = iData[i+1];
					}
				}
	            $.ajax({
			     	type: "GET",
			     	url: ajaxIp+"/api/v2/students",
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	data: iDataI,
			    	success: function(data){
			    		console.log(data)
			    		console.log(1111111111111111111)
			  			students_list(data.students);
			        },
			        error: function(){
			        	// alert('请稍后从新尝试登录或者联系管理员');
			        	// localStorage.clear();
			        	// window.location.href = './login.html'
			        }
			    });
	        }
	    });
	}


	function selectGrades(name){
		console.log(1)

		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/commons/school_grades",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){
	    		console.log(data)
	  			selectGradesList(data, name);
	        },
	        error: function(){
	        	// alert('请稍后从新尝试登录或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login.html'
	        }
	    });
	}

	function selectGradesList(data, name){
		console.log(data)
		$(name+' #select-grade').html('<option value="0">全部年级</option>');
		for (var i = 0; i < data.length; i++) {
			var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
			console.log(i)
			$(name+' #select-grade').append(iOption);
		}
	}

	function selectSubjects(id){
		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/commons/grade_subjects",
	     	data:{'grade_id':id},
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){
	    		console.log(data)
	  			selectSubjectsList(data , '.user-information-right');
	        },
	        error: function(){
	        	// alert('请稍后从新尝试登录或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login.html'
	        }
	    });
	}

	function studentSelectSubjects(id){
		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/commons/"+id+"/grade_classrooms",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){
	    		console.log(data)
	    		console.log(111111111111111)
	  			selectSubjectsList(data , '.user-change-password');
	        },
	        error: function(){
	        	// alert('请稍后从新尝试登录或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login.html'
	        }
	    });
	}

	function selectSubjectsList(data , name){
		$('#select-sujects').html('<option value="0">全部科目</option>');
		if(name == '.user-change-password'){
			for (var i = 0; i < data.length; i++) {
				var iOption = '<option value="'+data[i].id+'">'+data[i].name+'('+data[i].count+')</option>'
				$(name+' #select-sujects').append(iOption);
			}
		}else{
			for (var i = 0; i < data.length; i++) {
				var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
				$(name+' #select-sujects').append(iOption);
			}
		}

	}


 	function teachers_list(data){
 		// school_id = data[0].school.id;
 		// console.log(school_id)
 		console.log(data)
 		$('.teachers-tabble tbody').html('');
 		for (var i = 0; i < data.length; i++) {
 			var iGreads = [];
			for (var j = 0; j < data[i].grades.length; j++) {
				iGreads[j] =data[i].grades[j].name
			}

			var iTr = '<tr style="border-bottom:1px solid #ccc;"><td>'+data[i].real_name+'</td><td style="width:140px">'+iGreads+'</td><td>'+(data[i].subject==undefined?"":data[i].subject.name)+'</td><td>'+data[i].email+'</td><td>'+data[i].phone+'</td><td>'+data[i].role+'</td><td class="table-modify"><span class="iconfont table-span" data-id="'+data[i].id+'">&#xe614;&nbsp;修改</span></td><td class="table-reset-password"><span class="iconfont table-span" data-id="'+data[i].id+'" data-name="'+data[i].real_name+'">&#xe60d;&nbsp;重置密码</span></td><td class="table-delete iconfont"><span class="iconfont table-span" data-id="'+data[i].id+'" data-name="'+data[i].real_name+'">&#xe616;&nbsp;删除</span></td></tr>'
 			$('.teachers-tabble tbody').append(iTr)
 		}
 		// 根据用户身份判断是否可以修改密码
			var role_name = $('#role-name').val();
			console.log(role_name)
			if(role_name=="教师"){
				$('body').find('.table-span').css('visibility', 'hidden');
			}

		$('.table-reset-password span').click(function(){
			$('.modal-wrap-small .modal-main').animate({'top': '50%','opacity': 1},500);
			$('.modal-wrap-small .modal-shadow').animate({'opacity': .3},500);
			$('.modal-wrap-small').show();

			$('.modal-wrap-small .modal-title').text('重置密码');
			$('.modal-wrap-small .small-type').text('重置');
			$('.modal-wrap-small .small-xxx').text('的密码');
			$('.modal-wrap-small .small-prompt').text('重置后密码将恢复为88888888');
			$('.reset-password-name').text($(this).data('name'));


			var thisId = $(this).data('id')
			$('.modal-wrap-small .determine').on('click', function(){
				$.ajax({
			     	type: "PUT",
			     	url: ajaxIp+"/api/v2/teachers/"+thisId+"/reset_password",
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	success: function(data){
			  			if(data.success){
			  				alert(data.message);
							selectALl(null,null);
							$('.user-information-right #select-sujects').html('<option value="0">全部科目</option>');
							$('.user-information-right #select-grade').html('<option value="0">全部年级</option>');
			    		}else{
			    			alert(data.message);
			    		}
			        },
			        error: function(){
			        	// alert('请稍后从新尝试登录或者联系管理员');
			        	// localStorage.clear();
			        	// window.location.href = './login.html'
			        }
			    });
			})
		})

		$('.table-delete span').click(function(){
			$('.modal-wrap-small .modal-main').animate({'top': '50%','opacity': 1},500);
			$('.modal-wrap-small .modal-shadow').animate({'opacity': .3},500);
			$('.modal-wrap-small').show();

			$('.modal-wrap-small .modal-title').text('删除老师');
			$('.modal-wrap-small .small-type').text('删除');
			$('.modal-wrap-small .small-prompt').text('删除后无法恢复');
			$('.modal-wrap-small .small-xxx').text('');
			$('.reset-password-name').text($(this).data('name'));


			var thisId = $(this).data('id')
			$('.modal-wrap-small .determine').on('click', function(){
				$.ajax({
			     	type: "DELETE",
			     	url: ajaxIp+"/api/v2/teachers/"+thisId,
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	success: function(data){
			    		console.log(data)
			    		if(data.success){
							selectALl(null,null)
			    		}
			        },
			        error: function(){
			        	// alert('请稍后从新尝试登录或者联系管理员');
			        	// localStorage.clear();
			        	// window.location.href = './login.html'
			        }
			    });
			})
		})


		$('.user-information-right .table-modify span').click(function(){
			isTrueFalse = true;
			$('.teachers-propmt-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
			$('.teachers-propmt-wrap .modal-shadow').animate({'opacity': .3},500);
			$('.teachers-propmt-wrap').show();

			$('.teachers-propmt-wrap .modal-title').text('编辑老师信息');
			// $('.teachers-propmt-wrap .small-prompt').text('删除后无法恢复');
			// $('.teachers-propmt-wrap .small-xxx').text('');
			// $('.reset-password-name').text($(this).data('name'));


			var thisId = $(this).data('id')
			var iDataGrades;
			$.ajax({
		     	type: "GET",
		     	url: ajaxIp+"/api/v2/teachers/"+thisId,
		    	dataType: "JSON",
		    	headers: {'Authorization': "Bearer " + isLogin},
		    	success: function(data){
		    		console.log(data)
					$('.teachers-propmt-wrap #teachers-name').val(data.real_name);
					$('.teachers-propmt-wrap #teachers-name').attr('data-id', data.id);
					$('.teachers-propmt-wrap #teachers-email').val(data.email);
					$('.teachers-propmt-wrap #teachers-number').val(data.phone);
					$('.teachers-propmt-wrap #teachers-role').val(data.role);
					// $('.teachers-propmt-wrap #teachers-subject').val(data.subject.name);
					$('.teachers-propmt-wrap #teachers-grade').val(data.grades.name);
					console.log(data.grades.name+'11111111111111111')
					iDataGrades = data.grades;
					defaultId = data.subject.id;
					defaultRole = data.role;
					$('#teachers-grade').html('')

					var grade_ids = [];
					for (var i = 0; i < iDataGrades.length; i++) {
						grade_ids[i] = iDataGrades[i].id;
					}
					grade_ids = grade_ids.join(',');
					console.log(grade_ids)

					$.ajax({
				     	type: "GET",
				     	url: ajaxIp+"/api/v2/teachers/find_subject_by_grade",
				    	dataType: "JSON",
				    	headers: {'Authorization': "Bearer " + isLogin},
				    	data:{grade_ids},
				    	success: function(data){
				    		console.log(defaultId+'==================')
				    		var iOption_s;
				  			for (var i = 0; i < data.length; i++) {
				  				if(defaultId == data[i].id){
				  					iOption_s+= '<option value="'+data[i].id+'" selected>'+data[i].name+'</option>';
				  				}else{
				  					iOption_s+= '<option value="'+data[i].id+'">'+data[i].name+'</option>';
				  				}

				  				// $(iOption_s).attr('id', data.id);
				  				// $(iOption_s).attr('value', data.name);
				  				// $(iOption_s).text(data.name);
				  			}
				  			$('#teachers-subject').html(iOption_s);
				        },
				        error: function(){
				        	// alert('请稍后从新尝试登录或者联系管理员');
				        	// localStorage.clear();
				        	// window.location.href = './login.html'
				        }
				    });

				    $.ajax({
				     	type: "GET",
				     	url: ajaxIp+"/api/v2/commons/roles",
				    	dataType: "JSON",
				    	headers: {'Authorization': "Bearer " + isLogin},
				    	success: function(data){
				    		console.log(data)
				    		var iOption_s;
				  			for (var i = 0; i < data.length; i++) {
				  				if(defaultRole == data[i]){
				  					iOption_s+= '<option value="'+data[i]+'" selected>'+data[i]+'</option>';
				  				}else{
				  					iOption_s+= '<option value="'+data[i]+'">'+data[i]+'</option>';
				  				}

				  				// $(iOption_s).attr('id', data.id);
				  				// $(iOption_s).attr('value', data.name);
				  				// $(iOption_s).text(data.name);
				  			}
				  			$('#teachers-role').html(iOption_s);
				        },
				        error: function(){
				        	// alert('请稍后从新尝试登录或者联系管理员');
				        	// localStorage.clear();
				        	// window.location.href = './login.html'
				        }
				    });

					$.ajax({
				     	type: "GET",
				     	url: ajaxIp+"/api/v2/commons/school_grades",
				    	dataType: "JSON",
				    	headers: {'Authorization': "Bearer " + isLogin},
				    	success: function(data){
				    		$('#teachers-grade').html('');
							if(data.length == iDataGrades.length){
								var thisDiv='<div class="allNew newTeacherBack">全部<i class="iconfont gradesname" style="position:absolute;right:10px;top:0;">&#xe619;</i></div>';
							}else{
								var thisDiv='<div class="allNew">全部<i class="iconfont gradesname" style="position:absolute;right:10px;top:0;">&#xe619;</i></div>';
							}

				    		console.log(iDataGrades)
				    		var isTrue=true;
				    		for (var i = 0; i < data.length; i++) {
				    			for (var j = 0; j < iDataGrades.length; j++) {
				    				if (iDataGrades[j].id == data[i].id ) {
										isTrue = true;
										break;
				    				}else{
										isTrue = false;
				    				}
				    			}
				    			if (isTrue) {
									thisDiv+='<div class="newTeacher newTea newTeacherBack" data-id="'+data[i].id+'">'+data[i].name+'<i class="iconfont gradesname" style="position:absolute;right:10px;top:0;">&#xe619;</i></div>'
			    				}else{
			    					thisDiv+='<div class="newTeacher newTea" data-id="'+data[i].id+'">'+data[i].name+'<i class="iconfont gradesname" style="position:absolute;right:10px;top:0;">&#xe619;</i></div>'
			    				}

				    		}
				    		$('#teachers-grade').append(thisDiv);
				    		$('.newTeacher').on('click' , function(){
				    			$(this).toggleClass('newTeacherBack');
				    			if($('.newTeacherBack').length == (data.length)){
									$('.allNew').addClass('newBack');
				    				$('.allNew').removeClass('newTeacherBack');

				    			}else{
				    				$('.allNew').removeClass('newBack');
				    				// $('.allNew').removeClass('newTeacherBack');

				    			}
							    var grade_ids = [];
								if($('#teachers-grade .newBack').length==0){
									for (var i = 0; i < $('.newTeacherBack').length; i++) {
										grade_ids[i] = $($('.newTeacherBack')[i]).attr('data-id');
									}
								}else{
									for (var i = 0; i < $('.newTeacherBack').length; i++) {
										grade_ids[i] = $($('.newTeacherBack')[i]).attr('data-id');
									}
								}


								grade_ids = grade_ids.join(',');

				    			$.ajax({
							     	type: "GET",
							     	url: ajaxIp+"/api/v2/teachers/find_subject_by_grade",
							    	dataType: "JSON",
							    	headers: {'Authorization': "Bearer " + isLogin},
							    	data:{grade_ids},
							    	success: function(data){
							    		console.log(data)
							    		var iOption_s;
							  			for (var i = 0; i < data.length; i++) {
							  				if(defaultId == data[i].id){
							  					iOption_s+= '<option value="'+data[i].id+'" selected>'+data[i].name+'</option>';
							  				}else{
							  					iOption_s+= '<option value="'+data[i].id+'">'+data[i].name+'</option>';
							  				}

							  				// $(iOption_s).attr('id', data.id);
							  				// $(iOption_s).attr('value', data.name);
							  				// $(iOption_s).text(data.name);
							  			}
							  			$('#teachers-subject').html(iOption_s);
							        },
							        error: function(){
							        	// alert('请稍后从新尝试登录或者联系管理员');
							        	// localStorage.clear();
							        	// window.location.href = './login.html'
							        }
							    });
				    		})

				    		$('.allNew').on('click' , function(){
				    			$(this).toggleClass('newBack');
				    			if($(this).hasClass('newBack')){
									for (var i = 0; i < $('.newTea').length; i++) {
										$($('.newTea')[i]).addClass('newTeacherBack');
									}
				    			}else{
									for (var i = 0; i < $('.newTea').length; i++) {
										$($('.newTea')[i]).removeClass('newTeacherBack');
									}
				    			}

				    			var grade_ids = [];
								if($('#teachers-grade .newBack').length==0){
									for (var i = 0; i < $('.newTeacherBack').length; i++) {
										grade_ids[i] = $($('.newTeacherBack')[i]).data('id');
									}
								}else{
									for (var i = 0; i < $('.newTeacherBack').length; i++) {
										grade_ids[i] = $($('.newTeacherBack')[i]).data('id');
									}
								}
								grade_ids = grade_ids.join(',');
								console.log(grade_ids)
				    			$.ajax({
							     	type: "GET",
							     	url: ajaxIp+"/api/v2/teachers/find_subject_by_grade",
							    	dataType: "JSON",
							    	headers: {'Authorization': "Bearer " + isLogin},
							    	data:{grade_ids},
							    	success: function(data){
							    		console.log(data)
							    		var iOption_s='';
							  			for (var i = 0; i < data.length; i++) {
							  				if(defaultId == data[i].id){
							  					iOption_s+= '<option value="'+data[i].id+'" selected>'+data[i].name+'</option>';
							  				}else{
							  					iOption_s+= '<option value="'+data[i].id+'">'+data[i].name+'</option>';
							  				}

							  				// $(iOption_s).attr('id', data.id);
							  				// $(iOption_s).attr('value', data.name);
							  				// $(iOption_s).text(data.name);
							  			}
							  			$('#teachers-subject').html(iOption_s);
							        },
							        error: function(){
							        	// alert('请稍后从新尝试登录或者联系管理员');
							        	// localStorage.clear();
							        	// window.location.href = './login.html'
							        }
							    });
				    		})
				        }
				    });


		        },
		    });


		})

		$('.teachers-propmt-wrap .determine').unbind().on('click' , function(){

			var teachers_name = $('.teachers-propmt-wrap #teachers-name').val();
			var teachers_idn = $('.teachers-propmt-wrap #teachers-name').attr('data-id');
			var teachers_email = $('.teachers-propmt-wrap #teachers-email').val();
			var teachers_number = $('.teachers-propmt-wrap #teachers-number').val();
			var teachers_role = $('.teachers-propmt-wrap #teachers-role').val();
			var teachers_subject = $('.teachers-propmt-wrap #teachers-subject').val();
			var i_grade_ids = [];
			if($('#teachers-grade .newBack').length==0){
				for (var i = 0; i < $('.newTeacherBack').length; i++) {
					i_grade_ids[i] = $($('.newTeacherBack')[i]).data('id');
				}
			}else{
				for (var i = 1; i < $('.newTeacherBack').length; i++) {
					i_grade_ids[i-1] = $($('.newTeacherBack')[i]).data('id');
				}
			}
			// grade_ids = i_grade_ids.join(',');
			var iDatas = {
				'phone':teachers_number,
				'real_name':teachers_name,
				'email':teachers_email,
				'customer_role':teachers_role,
				'grade_ids':i_grade_ids,
				'subject_id':teachers_subject,
	    	}

			console.log(iDatas)
			if(isTrueFalse){
				$.ajax({
			     	type: "PUT",
			     	url: ajaxIp+"/api/v2/teachers/"+teachers_idn,
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	data:{
						'phone':teachers_number,
						'real_name':teachers_name,
						'email':teachers_email,
						'customer_role':teachers_role,
						'grade_ids':i_grade_ids,
						'subject_id':teachers_subject,
			    	},
			    	success: function(data){
			    		$('.modal-main').animate({'top': '45%','opacity': 0},500);
						$('.modal-shadow').animate({'opacity': 0},500);
						setTimeout(function(){
							$('.modal-wrap').hide();
						},500);
			    		console.log(data)
			    		setTimeout(function(){
							alert('修改成功！')
						},500);

			    		selectALl(null,null);
			        },
			        error: function(){
			        	// alert('修改失败！请尝试从新登录或者联系管理员');
			        	// localStorage.clear();
			        	// window.location.href = './login.html'
			        }
			    });
			}else{
				$.ajax({
			     	type: "POST",
			     	url: ajaxIp+"/api/v2/teachers",
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	data:{
						'phone':teachers_number,
						'real_name':teachers_name,
						'email':teachers_email,
						'customer_role':teachers_role,
						'grade_ids':i_grade_ids,
						'subject_id':teachers_subject,
			    	},
			    	success: function(data){
			    		$('.modal-main').animate({'top': '45%','opacity': 0},500);
						$('.modal-shadow').animate({'opacity': 0},500);
						setTimeout(function(){
							$('.modal-wrap').hide();
						},500);
			    		console.log(data)
			    		setTimeout(function(){
							alert('添加成功！')
						},500);

			    		selectALl(null,null);
			        },
			        error: function(){
			        	// alert('修改失败！请尝试从新登录或者联系管理员');
			        	// localStorage.clear();
			        	// window.location.href = './login.html'
			        }
			    });
			}





		});
 	}

 	function students_list(data){
 		// school_id = data[0].school.id;
 		// console.log(school_id)
 		console.log(data)
 		$('.students-tabble tbody').html('');
 		for (var i = 0; i < data.length; i++) {
 		// 	var iGreads = [];
			// for (var j = 0; j < data[i].grades.length; j++) {
			// 	iGreads[j] =data[i].grades[j].name
			// }

			var iTr = '<tr style="border-bottom:1px solid #ccc;"><td>'+data[i].exam_no+'</td><td>'+data[i].real_name+'</td><td style="">'+(data[i].id_card_no==undefined?"":data[i].id_card_no)+'</td><td>'+(data[i].gender==undefined?"":data[i].gender)+'</td><td>'+(data[i].classroom==undefined?"":data[i].classroom.name)+'</td><td>'+(data[i].is_classroom_count?"是":"否")+'</td><td>'+(data[i].is_grade_count?"是":"否")+'</td><td class="table-modify"><span class="iconfont table-span" data-id="'+data[i].id+'">&#xe614;&nbsp;修改</span></td><td class="table-delete iconfont"><span class="iconfont table-span" data-id="'+data[i].id+'" data-name="'+data[i].real_name+'">&#xe616;&nbsp;删除</span></td></tr>'
 			$('.students-tabble tbody').append(iTr)
 		}

		$('.user-change-password .table-modify span').click(function(){
			$('.modal-wrap-student-info .modal-main').animate({'top': '50%','opacity': 1},500);
			$('.modal-wrap-student-info .modal-shadow').animate({'opacity': .3},500);
			$('.modal-wrap-student-info').show();

			$('.modal-wrap-student-info .modal-title').text('编辑学生信息');
			isAdd = false;
			var student_id = $(this).attr('data-id');
			var data_student;
			$.ajax({
		     	type: "GET",
		     	url: ajaxIp+"/api/v2/students/"+student_id,
		    	dataType: "JSON",
		    	headers: {'Authorization': "Bearer " + isLogin},
		    	success: function(data){
		    		console.log(data)
		    		data_student = data;
		    		$('.student-code').val(data.student_code);
		    		$('.exam-no').val(data.exam_no);
		    		$('.student-name').val(data.real_name);
		    		$('.student-name').attr('data-id', data.id);
		    		$('.id-number').val(data.id_card_no);
		    		$('.student-email').val(data.email);
		    		if(data.gender == '男'){
		    			console.log(data.gender+'=============1')
						$($('.student-gender option')[1]).attr('selected', 'selected');
						$($('.student-gender option')[2]).removeAttr('selected');
						$($('.student-gender option')[0]).removeAttr('selected');
		    		}else if(data.gender == '女'){
		    			console.log(data.gender+'=============2')
						$($('.student-gender option')[2]).attr('selected', 'selected');
						$($('.student-gender option')[1]).removeAttr('selected');
						$($('.student-gender option')[0]).removeAttr('selected');
		    		}else{
		    			console.log(data.gender+'=============3')
						$($('.student-gender option')[0]).attr('selected', 'selected');
						$($('.student-gender option')[1]).removeAttr('selected');
						$($('.student-gender option')[2]).removeAttr('selected');
		    		}
		    		if(data.is_classroom_count){
						$('.student-radio-grade').attr('checked', true)
		    		}else{
						$('.student-radio-grade').attr('checked', false)
		    		}
		    		if(data.is_grade_count){
						$('.student-radio-class').attr('checked', true)
		    		}else{
						$('.student-radio-class').attr('checked', false)
		    		}

		    		$.ajax({
				     	type: "GET",
				     	url: ajaxIp+"/api/v2/commons/school_grades",
				    	dataType: "JSON",
				    	headers: {'Authorization': "Bearer " + isLogin},
				    	success: function(data){
				    		$('.modal-wrap-student-info .current-grade').html('');
				  			for (var i = 0; i < data.length; i++) {
				  				if(data[i].id == data_student.grade.id){
									var iOption = '<option value="'+data[i].id+'" selected>'+data[i].name+'</option>'
				  				}else{
									var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
				  				}
								$('.modal-wrap-student-info .current-grade').append(iOption);
							}

							$.ajax({
						     	type: "GET",
						     	url: ajaxIp+"/api/v2/commons/"+$('.modal-wrap-student-info .current-grade').val()+"/grade_classrooms",
						    	dataType: "JSON",
						    	headers: {'Authorization': "Bearer " + isLogin},
						    	success: function(data){

						    		$('.modal-wrap-student-info .current-class').html('');
						  			for (var i = 0; i < data.length; i++) {
						  				if(data_student.classroom.id == data[i].id){
											var iOption = '<option value="'+data[i].id+'" selected>'+data[i].name+'</option>'
						  				}else{
											var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
						  				}

										$('.modal-wrap-student-info .current-class').append(iOption);
									}


						        },
						        error: function(){
						        	// alert('请稍后从新尝试登录或者联系管理员');
						        	// localStorage.clear();
						        	// window.location.href = './login.html'
						        }
						    });
				        },
				        error: function(){
				        	// alert('请稍后从新尝试登录或者联系管理员');
				        	// localStorage.clear();
				        	// window.location.href = './login.html'
				        }
				    });
		        },
		        error: function(){
		        	// alert('请稍后从新尝试登录或者联系管理员');
		        	// localStorage.clear();
		        	// window.location.href = './login.html'
		        }
		    });



			$('.current-grade').change(function(){
				$.ajax({
			     	type: "GET",
			     	url: ajaxIp+"/api/v2/commons/"+$('.modal-wrap-student-info .current-grade').val()+"/grade_classrooms",
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	success: function(data){

			    		$('.modal-wrap-student-info .current-class').html('');
			  			for (var i = 0; i < data.length; i++) {
							var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
							$('.modal-wrap-student-info .current-class').append(iOption);
						}

			        },
			        error: function(){
			        	// alert('请稍后从新尝试登录或者联系管理员');
			        	// localStorage.clear();
			        	// window.location.href = './login.html'
			        }
			    });
			});


		})

		$('.table-delete span').click(function(){
			$('.modal-wrap-small .modal-main').animate({'top': '50%','opacity': 1},500);
			$('.modal-wrap-small .modal-shadow').animate({'opacity': .3},500);
			$('.modal-wrap-small').show();

			$('.modal-wrap-small .modal-title').text('删除学生');
			$('.modal-wrap-small .small-type').text('删除');
			$('.modal-wrap-small .small-prompt').text('删除后无法恢复');
			$('.modal-wrap-small .small-xxx').text('');
			$('.reset-password-name').text($(this).data('name'));


			var thisId = $(this).data('id')
			$('.modal-wrap-small .determine').on('click', function(){
				$.ajax({
			     	type: "DELETE",
			     	url: ajaxIp+"/api/v2/students/"+thisId,
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	success: function(data){
			    		if(data.success){
			    			alert(data.message)
							students_selectALl(null,null);
			    		}else{
			    			alert(data.message)
							students_selectALl(null,null);
			    		}
			        },
			        error: function(){
			        	// alert('请稍后从新尝试登录或者联系管理员');
			        	// localStorage.clear();
			        	// window.location.href = './login.html'
			        }
			    });
			})
		})

		$('.add-teacher').click(function(){
			isTrueFalse = false;
			$('.teachers-propmt-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
			$('.teachers-propmt-wrap .modal-shadow').animate({'opacity': .3},500);
			$('.teachers-propmt-wrap').show();

			$('.teachers-propmt-wrap .modal-title').text('新增老师');
			$('.teachers-propmt-wrap #teachers-name').val('');
			$('.teachers-propmt-wrap #teachers-email').val('');
			$('.teachers-propmt-wrap #teachers-number').val('');
			$('.teachers-propmt-wrap #teachers-role').val('');
			$('.teachers-propmt-wrap #teachers-subject').html('');
			$('.teachers-propmt-wrap #teachers-grade').html('');

			$.ajax({
				type: "GET",
				url: ajaxIp+"/api/v2/commons/roles",
				dataType: "JSON",
				headers: {'Authorization': "Bearer " + isLogin},
				success: function(data){
					console.log(data)
					var iOption_s;
						for (var i = 0; i < data.length; i++) {
							iOption_s+= '<option value="'+data[i]+'">'+data[i]+'</option>';

							// $(iOption_s).attr('id', data.id);
							// $(iOption_s).attr('value', data.name);
							// $(iOption_s).text(data.name);
						}
						$('#teachers-role').html(iOption_s);
				},
				error: function(){
					// alert('请稍后从新尝试登录或者联系管理员');
					// localStorage.clear();
					// window.location.href = './login.html'
				}
			});

			$.ajax({
		     	type: "GET",
		     	url: ajaxIp+"/api/v2/commons/school_grades",
		    	dataType: "JSON",
		    	headers: {'Authorization': "Bearer " + isLogin},
		    	success: function(data){
					console.log(data)
					$('.teachers-propmt-wrap #teachers-grade').html('');
					var thisDiv='<div class="allNew">全部<i class="iconfont gradesname" style="position:absolute;right:10px;top:0;">&#xe619;</i></div>';
		    		for (var i = 0; i < data.length; i++) {
    					thisDiv+='<div class="newTeacher newTea" data-id="'+data[i].id+'">'+data[i].name+'<i class="iconfont gradesname" style="position:absolute;right:10px;top:0;">&#xe619;</i></div>'
		    		}
		    		$('#teachers-grade').append(thisDiv);

	    			$('.newTeacher').on('click' , function(){
		    			$(this).toggleClass('newTeacherBack');
		    			if($('.newTeacherBack').length == (data.length)){
							$('.allNew').addClass('newBack');
		    				$('.allNew').removeClass('newTeacherBack');

		    			}else{
		    				$('.allNew').removeClass('newBack');
		    				// $('.allNew').removeClass('newTeacherBack');

		    			}
					    var grade_ids = [];
						if($('#teachers-grade .newBack').length==0){
							for (var i = 0; i < $('.newTeacherBack').length; i++) {
								grade_ids[i] = $($('.newTeacherBack')[i]).attr('data-id');
							}
						}else{
							for (var i = 0; i < $('.newTeacherBack').length; i++) {
								grade_ids[i] = $($('.newTeacherBack')[i]).attr('data-id');
							}
						}


						grade_ids = grade_ids.join(',');

		    			$.ajax({
					     	type: "GET",
					     	url: ajaxIp+"/api/v2/teachers/find_subject_by_grade",
					    	dataType: "JSON",
					    	headers: {'Authorization': "Bearer " + isLogin},
					    	data:{grade_ids},
					    	success: function(data){
					    		console.log(data)
					    		var iOption_s;
					  			for (var i = 0; i < data.length; i++) {
					  					iOption_s+= '<option value="'+data[i].id+'">'+data[i].name+'</option>';

					  				// $(iOption_s).attr('id', data.id);
					  				// $(iOption_s).attr('value', data.name);
					  				// $(iOption_s).text(data.name);
					  			}
					  			$('#teachers-subject').html(iOption_s);
					        },
					        error: function(){
					        	// alert('请稍后从新尝试登录或者联系管理员');
					        	// localStorage.clear();
					        	// window.location.href = './login.html'
					        }
					    });
		    		})
				}
		    })

		})
 	}


 	$('.modal-wrap-student-info .determine').on('click', function(){
		var i_grade = $('.current-grade').val();
		var i_class = $('.current-class').val();

		var i_student_code = $('.student-code').val();
		var i_exam_no = $('.exam-no').val();
		var i_student_name = $('.student-name').val();
		var i_id_number = $('.id-number').val();
		var i_student_gender = $('.student-gender').val();
		var i_student_email = $('.student-email').val();

		var i_is_classroom_count = $('.student-radio-grade').is(':checked');
		var i_is_grade_count = $('.student-radio-class').is(':checked');

		var i_data = {
			'real_name':i_student_name,
			'phone':'',
			'email':i_student_email,
			'exam_no':i_exam_no,
			'gender':i_student_gender,
			'id_card_no':i_id_number,
			'student_code':i_student_code,
			'grade_id':i_grade,
			'classroom_id':i_class,
			'is_grade_count':i_is_grade_count,
			'is_classroom_count':i_is_classroom_count,
		}
		console.log(i_data)
		if(i_grade==''||i_class==''||i_exam_no==''||i_student_name==''){
			alert('所在年级、所在班级、考试编号、学生姓名为必填项！')
		}else if(isAdd){
			$.ajax({
		     	type: "POST",
		     	url: ajaxIp+"/api/v2/students",
		    	dataType: "JSON",
		    	headers: {'Authorization': "Bearer " + isLogin},
		    	data:i_data,
		    	success: function(data){
		    		console.log(data)
		    		if(data.success){
		    			alert(data.message)
		    			students_selectALl(null,null);
		    			selectGrades('.user-change-password');
		    		}else{
		    			alert(data.message)
		    		}

		    		$('.modal-main').animate({'top': '45%','opacity': 0},500);
					$('.modal-shadow').animate({'opacity': 0},500);
					setTimeout(function(){
						$('.modal-wrap').hide();
					},500);
		        },
		        error: function(){
		        	// alert('请稍后从新尝试登录或者联系管理员');
		        	// localStorage.clear();
		        	// window.location.href = './login.html'
		        }
		    });
		}else{
			var i_student_id = $('.student-name').attr('data-id');
			$.ajax({
		     	type: "PUT",
		     	url: ajaxIp+"/api/v2/students/"+i_student_id,
		    	dataType: "JSON",
		    	headers: {'Authorization': "Bearer " + isLogin},
		    	data:i_data,
		    	success: function(data){
		    		console.log(data)
		    		if(data.success){
		    			alert(data.message)
						students_selectALl(null,null);
						selectGrades('.user-change-password');
		    		}else{
		    			alert(data.message)
		    		}
		    		$('.modal-main').animate({'top': '45%','opacity': 0},500);
					$('.modal-shadow').animate({'opacity': 0},500);
					setTimeout(function(){
						$('.modal-wrap').hide();
					},500);
		        },
		        error: function(){
		        	// alert('请稍后从新尝试登录或者联系管理员');
		        	// localStorage.clear();
		        	// window.location.href = './login.html'
		        }
		    });
		}
 	});

 	$('.add-student').on('click', function(){
 		isAdd = true;
 		$('.modal-wrap-student-info .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-wrap-student-info .modal-shadow').animate({'opacity': .3},500);
		$('.modal-wrap-student-info').show();

		$('.modal-wrap-student-info .modal-title').text('添加学生');

		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/commons/school_grades",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){
	    		$('.modal-wrap-student-info .current-grade').html('')
	  			for (var i = 0; i < data.length; i++) {
					var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
					$('.modal-wrap-student-info .current-grade').append(iOption);
				}

				$.ajax({
			     	type: "GET",
			     	url: ajaxIp+"/api/v2/commons/"+$('.modal-wrap-student-info .current-grade').val()+"/grade_classrooms",
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	success: function(data){
			    		console.log(data)
			    		$('.modal-wrap-student-info .current-class').html('');
			  			for (var i = 0; i < data.length; i++) {
							var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
							$('.modal-wrap-student-info .current-class').append(iOption);
						}
			        },
			        error: function(){
			        	// alert('请稍后从新尝试登录或者联系管理员');
			        	// localStorage.clear();
			        	// window.location.href = './login.html'
			        }
			    });
	        },
	        error: function(){
	        	// alert('请稍后从新尝试登录或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login.html'
	        }
	    });

	    $('.current-grade').change(function(){
			$.ajax({
		     	type: "GET",
		     	url: ajaxIp+"/api/v2/commons/"+$('.modal-wrap-student-info .current-grade').val()+"/grade_classrooms",
		    	dataType: "JSON",
		    	headers: {'Authorization': "Bearer " + isLogin},
		    	success: function(data){

		    		$('.modal-wrap-student-info .current-class').html('');
		  			for (var i = 0; i < data.length; i++) {
						var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
						$('.modal-wrap-student-info .current-class').append(iOption);
					}

		        },
		        error: function(){
		        	// alert('请稍后从新尝试登录或者联系管理员');
		        	// localStorage.clear();
		        	// window.location.href = './login.html'
		        }
		    });
		});

		$('.stuent-code').val('');
		$('.exam-no').val('');
		$('.student-name').val('');
		$('.id-number').val('');

		$('.student-radio-grade').attr('checked', false)
		$('.student-radio-class').attr('checked', false)


 	});
  $('.user-left .user-left-button').on('click', function() {
  	$(this).addClass('user-on').siblings().removeClass('user-on');
  	var index = $(this).index();
  	$('.user-right').eq(index).show().siblings('.user-right').hide();
  });

	// $('.user-information').on('click', function(){
	// 	$('.change-password').removeClass('user-on');
	// 	$('.user-information').addClass('user-on');
	// 	$('.user-information-right').show();
	// 	$('.user-change-password').hide();
	// })

	// $('.change-password').on('click', function(){
	// 	$('.change-password').addClass('user-on');
	// 	$('.user-information').removeClass('user-on');
	// 	$('.user-information-right').hide();
	// 	$('.user-change-password').show();
	// })


	$('.export-bar-code').on('click' , function(){
		printBarcode();
	})

	function printBarcode() {
	    var colNum=4;
	    var rowNum=17;
	    var stdW=200;
	    var margin=25;
	    var iframe = document.body.querySelector('#printfbarcode');
	    var idoc;
	    if (iframe) {
	      idoc = iframe.contentDocument.body;
	      idoc.innerHTML = '';
	    } else {
	      iframe = document.createElement('iframe');
	      iframe.setAttribute('id', 'printfbarcode');
	      iframe.setAttribute('name', 'printfbarcode');
	      iframe.style.position = 'fixed';
	      iframe.style['z-index'] = '1000000000000000';
	      iframe.style.top = '0px';
	      iframe.style.left = '0px';
	      iframe.style.width = '100%';
	      iframe.style.height = '100%';
	      iframe.style['background-color'] = '#fff';
	      iframe.style.visibility = 'hidden';
	      document.body.appendChild(iframe);
	      var headEl = iframe.contentDocument.getElementsByTagName('head')[0];
	      var style = document.createElement('style');
	      style.innerHTML='@page{margin:20px;}';
	      headEl.appendChild(style);
	      idoc = iframe.contentDocument.body;
	    }
	    var blockW=stdW+2*margin;
	    var grade_id = $(".user-change-password #select-grade").val();
	    var classroom_id = $(".user-change-password #select-sujects").val();
	    //获取用户
	    if (grade_id != 0 && classroom_id != 0){
	      // $.ajax({
	      //   url: "<%= get_print_students_system_manage_students_path %>",
	      //   data: JSON.stringify({grade_id: grade_id, classroom_id: classroom_id}),
	      //   type: "POST",
	      //   dataType: "json",
	      //   contentType: 'application/json; charset=UTF-8',
	      //   success: function(data){
	      //    if(data.alert != ""){
	      //     alert(data.alert);
	      //     return;
	      //    }else{
	      //       createCode(0, data.students);
	      //     }
	      //   }
	    	$.ajax({
		     	type: "GET",
		     	url: ajaxIp+"/api/v2/students/student_barcode",
		    	dataType: "JSON",
		    	headers: {'Authorization': "Bearer " + isLogin},
		    	data:{
		    		'grade_id':grade_id,
		    		'classroom_id':classroom_id,
		    	},
		    	success: function(data){
		    		console.log(data)
		    		createCode(0, data);
		        },
		        error: function(){
		        	// alert('请稍后从新尝试登录或者联系管理员');
		        	// localStorage.clear();
		        	// window.location.href = './login.html'
		        }
	      })}else{
	      alert('请先选择年级和班级');
	      return;
	    }

	    function createCode(i,list){
	      if(list.length == i){
	        setTimeout(function(){
	          window.frames["printfbarcode"].focus();
	          window.frames["printfbarcode"].print();
	          return;
	        }, 100);
	        return;
	      }
	      setTimeout(function(){
	        var pageDIV=document.createElement('div');
	        pageDIV.style['margin-left']="auto";
	        pageDIV.style['margin-right']="auto";
	        pageDIV.style['margin-top']="40px";
	        if(i<list.length-1)
	          pageDIV.style.pageBreakAfter="always";
	        var bmp=document.createElement('div');
	        var text = document.createElement('div');
	        var barCode=document.createElement('span');
	        barCode.style.display = 'inline-block';
	        barCode.style.width=stdW+'px';
	        barCode.style['padding-left']=margin+"px";
	        barCode.style['padding-right']=margin+"px";
	        str = list[i];
	        $(bmp).barcode(str, "code128",{barWidth:1, barHeight:30,showHRI:false,output:'bmp'});
	        var w=parseInt(bmp.style.width);
	        var wscale=stdW/w;
	        bmp.style.transform="scale("+wscale+",1)";
	        barCode.appendChild(bmp);
	        text.style['font-size'] = '8px';
	        text.innerText = str + ' ';
	        text.style['white-space']='nowrap';
	        barCode.appendChild(text);
	        var rowDIV=document.createElement('div');
	        rowDIV.style['margin-left']="auto";
	        rowDIV.style['margin-right']="auto";
	        rowDIV.style.width=(colNum*blockW)+'px';
	        rowDIV.style.height='80px';
	        rowDIV.appendChild(barCode);
	        pageDIV.appendChild(rowDIV);
	        idoc.appendChild(pageDIV);
	        var bmpPX=bmp.scrollWidth;
	        if(bmpPX>stdW){
	          bmp.style['margin-left']=(((stdW-bmpPX)/2)|0)+'px';
	        }else{
	          bmp.style['margin-left']='auto';
	          bmp.style['margin-right']='auto';
	        }
	        var fontPX=text.scrollWidth;
	        if(fontPX>stdW){
	          text.style.transform="scale("+(stdW/fontPX)+",1)";
	          text.style['margin-left']=(((stdW-fontPX)/2)|0)+'px';
	          text.style.width=fontPX+'px';
	        }else{
	          text.style['text-align'] = 'center';
	        }
	        for(var k=1;k<colNum;k++){
	          rowDIV.appendChild(barCode.cloneNode(true));
	        }
	        for (var j=1;j<rowNum;j++){
	          pageDIV.appendChild(rowDIV.cloneNode(true));
	        }
	        createCode(i+1, list);
	      },20);
	    }
	  }





	// 删除分数
  $('.dele-button').on('click', function() {
  	$('.modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-shadow').animate({'opacity': 0.3},500);
		$('.modal-wrap-dele').show();
  });




  // 修改分数
	$('body').on('click', '.edit-btn',function() {
		$('.modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-shadow').animate({'opacity': 0.3},500);
		$('.edit-score-wrap').show();
	});

  // 导入成绩
  $('.import-button').on('click', function() {
		$('.modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-shadow').animate({'opacity': 0.3},500);
		$('.import-grade-wrap').show();
  });
 // 设置分值
  $('body').on('click', '.set', function() {
		$('.modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-shadow').animate({'opacity': 0.3},500);
		$('.set-score-wrap').show();
  });



	// 成绩修改主要功能
	// 1,获取考试列表
	$('.score-edit').click(function(){
		// 获取考试列表
		get_exam_list();
		get_subject_list();

	})

	// 获取考试列表--函数
	function get_exam_list(){
		$.ajax({
	   	type: "GET",
	   	url: ajaxIp+"/api/v2/exams",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	success: function(data){
	  		console.log(data)
				show_exam_list(data);
      },
      error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
      }
	  });
	}
	// 显示考试列表
	function show_exam_list(exam){
		var exam_length = exam.length;
		$('.score-edit-right #select-exam').html('');
		for (var i = 0; i < exam_length; i++) {
			var exam_option = '<option data-id="'+exam[i].id+'">'+exam[i].name+'</option>';
			$('.score-edit-right #select-exam').append(exam_option);
		};
		$('.score-edit-right #select-exam').attr('data-id',exam[0].id);

	}


	// 获取科目列表
	function get_subject_list(){
		$.ajax({
	   	type: "GET",
	   	url: ajaxIp+"/api/v2/commons/grade_subjects",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	success: function(data){
	  		console.log(data)
				show_subject_list(data);
      },
      error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
      }
	  });
	}
	// 显示科目列表
	function show_subject_list(subject){
		var subject_length = subject.length;
		$('.score-edit-right #select-sujects').html('');
		$('.score-edit-right #select-sujects').append('<option data-id="0">所有科目</option>');
		for (var i = 0; i < subject_length; i++) {
			var subject_option = '<option data-id="'+subject[i].id+'">'+subject[i].name+'</option>';
			$('.score-edit-right #select-sujects').append(subject_option);
		};
		var first_id = $('.score-edit-right #select-sujects option').eq(0).attr('data-id');
		$('.score-edit-right #select-sujects').attr('data-id',first_id);
	}

	$('.score-edit-right #select-exam').change(function(){
		var exam_id = $(this).find("option:selected").data('id');
		$(this).attr('data-id',exam_id);
	})
	$('.score-edit-right #select-sujects').change(function(){
		var sub_id = $(this).find("option:selected").data('id');
		$(this).attr('data-id',sub_id);
	})

	// 获取考生区域列表
	$('.score-edit-right #search-num').on('change', function() {
		var exam_no = $(this).val();
		var exam_id = $('.score-edit-right #select-exam').attr('data-id');
		var subject_id = $('.score-edit-right #select-sujects').attr('data-id');
		if(subject_id!=0){
			get_person_info(exam_id,subject_id,exam_no);
		}
	});
	$('.score-edit-right .student-search-button').click(function(){
		$('.score-edit-right #search-num').change();
	})

	// 获取考生区域列表－－函数
	function get_person_info(e_id,s_id,e_no){
	 	$.ajax({
	   	type: "GET",
	   	url: ajaxIp+"/api/v2/modify_score_infos",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	data:{'exam_id':e_id,'subject_id':s_id,'exam_no':e_no},
	  	success: function(data){
	  		console.log(data)
				show_person_info(data);
      },
      error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
      }
	  });
	}

  // 显示考生区域列表
  function show_person_info(person){
		var person_length = person.length;
		$('.scores-tabble tbody').html('');
		for (var i = 0; i < person_length; i++) {
			var person_tr = '<tr section_crop_image_id="'+person[i].section_crop_image_id+'" class="p-tr'+i+'"style="border-bottom:1px solid #ccc;" data-type="'+person[i].type+'"><td class="exam-no">'+person[i].exam_no+'</td><td style="width:250px;word-wrap:break-word; word-break:break-all;">'+person[i].section_crop_name+'</td><td class="creator">'+person[i].creator+'</td><td class="pre-score" style="width:80px;word-wrap:break-word; word-break:break-all;"></td><td class="cur-score" style="width:80px;word-wrap:break-word; word-break:break-all;"></td><td class="modifier">'+person[i].modifier+'</td><td><a href="javascript:;" class="edit-btn"><i class="iconfont">&#xe614;</i>修改成绩</a></td></tr>';
			$('.scores-tabble tbody').append(person_tr);
			var pre_score = person[i].answer_setting_scores;
			$('.p-tr'+i+'').find('.pre-score').html('');
			$('.p-tr'+i+'').find('.cur-score').html('');
			for (var j = 0; j < pre_score.length; j++) {
				var pre_list ='<i data-id="'+pre_score[j].id+'" style="font-style:normal">'+pre_score[j].score+',</i>';
				$('.p-tr'+i+'').find('.pre-score').append(pre_list);
			};
			for (var z = 0; z < pre_score.length; z++) {
				var cur_list ='<i data-id="'+pre_score[z].id+'" style="font-style:normal">'+pre_score[z].final_score+',</i>';
				$('.p-tr'+i+'').find('.cur-score').append(cur_list);
			};
			var e_creator = person[i].creator;
			if(!e_creator){
				$('.p-tr'+i+'').find('.creator').text('---');
				$('.p-tr'+i+'').find('.pre-score').text('---');
			}
			var e_modifier = person[i].modifier;
			if(!e_modifier){
				$('.p-tr'+i+'').find('.modifier').text('---');
				$('.p-tr'+i+'').find('.cur-score').text('---');
			}
		};
  }


  // 删除考试成绩
  $('.dele-button').click(function(){
  	var exam_no = $('.score-edit-right #search-num').val();
		var exam_id = $('.score-edit-right #select-exam').attr('data-id');
		var subject_id = $('.score-edit-right #select-sujects').attr('data-id');
		$('#dele-exam-id').val(exam_id);
		$('#dele-sub-id').val(subject_id);
		$('#dele-exam-no').val(exam_no);
  })
  $('body').on('click', '.modal-wrap-dele .dele-gade', function() {
  	var exam_no = $('#dele-exam-no').val();
  	var exam_id = $('#dele-exam-id').val();
  	var subject_id = $('#dele-sub-id').val();
  	console.log(exam_no,exam_id,subject_id)
  	if(subject_id!=0){
			dele_person_info(exam_id,subject_id,exam_no);
		}
  });
	// 删除考试成绩--函数
  function dele_person_info(e_id,s_id,e_no){
		$.ajax({
	   	type: "DELETE",
	   	url: ajaxIp+"/api/v2/modify_score_infos/destroy_score",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	data:{'exam_id':e_id,'subject_id':s_id,'exam_no':e_no},
	  	success: function(data){
	  		console.log(data)
	  		var exam_no = $('.score-edit-right #search-num').val();
				var exam_id = $('.score-edit-right #select-exam').attr('data-id');
				var subject_id = $('.score-edit-right #select-sujects').attr('data-id');
	  		get_person_info(exam_id,subject_id,exam_no);
	      },
	      error: function(){
	      	// alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html'
	      }
	  });
  }

	// 修改分数
  $('body').on('click', '.edit-btn',function() {
		var s_image_id = $(this).parents('tr').attr('section_crop_image_id');
		var exam_no = $(this).parents('tr').find('.exam-no').text();
		var type = $(this).parents('tr').attr('data-type');
		get_every_info(s_image_id,exam_no,type);
  })

  // 获取单个区域信息
  function get_every_info(s_i_id,e_no,e_type){
		$.ajax({
	   	type: "GET",
	   	url: ajaxIp+"/api/v2/modify_score_infos/edit_score",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	data:{'section_crop_image_id':s_i_id,'exam_no':e_no,'type':e_type},
	  	success: function(data){
	  		console.log(data)
	  		show_every_info(data,e_no,e_type);
      },
      error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
      }
	  });
  }

  // 显示单个区域信息
  function show_every_info(every,no,type){
  	$('.edit-score-wrap').attr('data-type',type);
  	$('.edit-score-wrap .edit-stu-num span').text(no);
		$('.edit-score-wrap .edit-item-name span').text(every.answer_name);
		if(every.answer_settings[0].result){
			$('.edit-score-wrap .modal-title').find('span').text('客观题');
		}else{
			$('.edit-score-wrap .modal-title').find('span').text('主观题');
		}
		if(every.pattern){
			$('.edit-score-wrap .modal-title').find('em').text('得分模式');
		}else{
			$('.edit-score-wrap .modal-title').find('em').text('扣分模式');
		}
		$('.edit-score-wrap .edit-item-img').html('');
		var img_url = '<img data-id="'+every.scanner_image_id+'" src="'+ ajaxIp +''+every.image_uri+'" />';
		$('.edit-score-wrap .edit-item-img').append(img_url);

		$('.edit-score-wrap .edit-ul').html('');
		var item_list = every.answer_settings;
		for (var i = 0; i <item_list.length; i++) {
			var item_li = '<li><div><span>'+item_list[i].num+'</span><span class="change-answer none">'+item_list[i].result+'</span><input data-id ="'+item_list[i].answer_setting_score_id+'" type="text" class="answer-input" data-fen="'+item_list[i].full_score+'" value="'+item_list[i].score+'"><span>分</span></div></li>';
			$('.edit-score-wrap .edit-ul').append(item_li);
			if(!item_list[0].score){
				$('.answer-input').val('')
			}
			if(item_list[i].result){
				$('.change-answer').show();
			}else{
				$('.change-answer').hide();
			}
		};
		$($('.edit-ul input')[0]).focus();
		get_key_ops('.edit-ul');
  }


	//分数判定
	var prompt_1 = '提示：您所给的分数不在规定范围内，请看清分值给分！';
	var prompt_i = $('#i_two');//提示框元素
	var prompt_2 = '提示：您所给的分数不合法，请输入合法分数！';
	$('body').on('input' , '.answer-input', function(){
		var str_score = $(this).val();

		var fen = parseFloat($(this).attr('data-fen'));
		var score = parseFloat($(this).val());
		console.log(score,fen)

		var re = /^\d+[.]?\d*$/;
		if(!re.test(str_score)){
			iTwo(prompt_i,prompt_2);
			$(this).val('');
		}


		if(String(str_score).length>1&&String(str_score)[0]=='0'&&String(str_score)[1]!='.'){
			iTwo(prompt_i,prompt_2);
			$(this).val('');
		}
		if(String(str_score)[0]=='.'){
			iTwo(prompt_i,prompt_2);
			$(this).val('');
		}

		console.log(String(str_score).split('.').length-1);
		var str_score_length = String(str_score).split('.').length-1;
		if(str_score_length>1){
			iTwo(prompt_i,prompt_2);
			$(this).val('');
		}

		if(score > fen || score < 0 && score!=''){
			console.log(9900)
			iTwo(prompt_i,prompt_1);
			$(this).val('');
		}
	});

		//显示提示框
	function iTwo(i,k){
		$('#i_two .modal-main').animate({'top': '30%','opacity': 1},500);
		$('#i_two .modal-shadow').animate({'opacity': 0},500);
		i.show();
		$('#i_two .prompt').text(k);
		setTimeout(function(){
			$('#i_two').hide();
		},1000);
	};
  

  // 点击回车键进入下一个input,最后一个点击提交
	$('body').on('focus','.answer-input', function(){
		var that= this;
		$(document).unbind('keydown').keydown(function(event){
			if(event.keyCode == 13){
				if(that==$('.answer-input')[$('.answer-input').length-1]){
					$('.edit-score-wrap .btn-edit').click();
				}else{
					$(that).blur();
					$(that).parents('li').next().find('.answer-input').focus();
				}
			}
		})
	})


  // 确认修改分数
  $('body').on('click', '.edit-score-wrap .btn-edit', function() {
  	var type = $('.edit-score-wrap').attr('data-type');
  	var answer_settings = [];
  	var input_value = $('.edit-ul').children().find('.answer-input');
		var input_length = input_value.length;
		for (var i = 0; i < input_length; i++) {
			var obj = new Object();
			var value = $(input_value[i]).val();
			var id = $(input_value[i]).attr('data-id');
			obj['final_score']=value;
			obj['answer_setting_score_id']=id;
			answer_settings[i]=obj;
		};
		// answer_settings = JSON.stringify(answer_settings);
		console.log(answer_settings)
		var data_all={'type':type,'answer_settings':answer_settings};
		
		var iD_if_null = false;
		for (var h = 0; h < $('.answer-input').length; h++) {
		 	if($('.answer-input')[h].value == "")
			 {
				 iD_if_null = true;
			 }
		};


		if(!iD_if_null){
			get_all_value(data_all);
		}else{
      alert('请输入得分后再提交');
		}

  });

  // 获取所有分数
  function get_all_value(data_info){
  	$.ajax({
	   	type: "PATCH",
	   	url: ajaxIp+"/api/v2/modify_score_infos/modify",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	data:data_info,
	  	success: function(data){
	  		console.log(data)
	  		var exam_no = $('.score-edit-right #search-num').val();
				var exam_id = $('.score-edit-right #select-exam').attr('data-id');
				var subject_id = $('.score-edit-right #select-sujects').attr('data-id');
	  		get_person_info(exam_id,subject_id,exam_no);
      },
      error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
      }
	  });
  }



  // 查看全卷
  $('body').on('click', '.edit-score-wrap .look-all-peper', function() {
  	$('.paper-all-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.paper-all-wrap .modal-shadow').animate({'opacity': 0.3},500);
		$('.paper-all-wrap').show();
		var scanner_image_id = $(this).parents('.edit-score-wrap').find('.edit-item-img img').attr('data-id');
  	get_paper_all(scanner_image_id);
  });
  $('.modal-exit-paper').click(function(){
		$('.paper-all-wrap .modal-main').animate({'top': '45%','opacity': 0},500);
		$('.paper-all-wrap .modal-shadow').animate({'opacity': 0},500);
		setTimeout(function(){
			console.log(9090)
			$('.paper-all-wrap').hide();
		},500);
	});

  // 获取整个试卷
  function get_paper_all(id){
  	$.ajax({
	   	type: "GET",
	   	url: ajaxIp+"/api/v2/modify_score_infos/scanner_image",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	data:{'scanner_image_id':id},
	  	success: function(data){
	  		console.log(data);
	  		$('.paper-all-wrap .paper-box').html('');
	  		var img_url = '<img src="'+ajaxIp+''+data.image_uri+'" />';
	  		$('.paper-all-wrap .paper-box').append(img_url);
      },
      error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
      }
	  });
  }




  // 成绩导入所有功能


  // 1,获取考试列表
	$('.score-import').click(function(){
		// 获取考试列表
		get_grade_all_list(null,null);
		gets_exam_list();
		gets_subject_list();
	})



	// 获取成绩列表

  function get_grade_all_list(page_data_info){
  	console.log(page_data_info)
  	var page_data = {'page':1, 'limit': 10};
  	if(page_data_info!=null){
			for (var i = 0; i < page_data_info.length; i+=2) {
				page_data[page_data_info[i]] = page_data_info[i+1];
			}
			console.log(page_data)
		}
		$.ajax({
	   	type: "GET",
	   	url: ajaxIp+"/api/v2/import_student_scores",
	  	dataType: "JSON",
	  	data:page_data,
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	success: function(data){
	  		console.log(data)
				page_grade_all_list(data.total_entries,page_data_info);
      },
      error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
      }
	  });
  }



  function page_grade_all_list(nums,page_data_info){
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
		$.jqPaginator('#scores-pagination', {
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
				  type: "GET",
				  url: ajaxIp+"/api/v2/import_student_scores",
				  headers: {'Authorization': "Bearer " + isLogin},
				  data:page_data,
				  success: function(data){
				  	console.log(data);
				  	show_grade_info(data);
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

  function show_grade_info(info){
  	$('.scores-in-tabble tbody').html('');
  	for (var i = 0; i < info.import_scores.length; i++) {
  		var in_tr = '<tr data-id="'+info.import_scores[i].id+'" class="tr-'+info.import_scores[i].id+'" style="border-bottom:1px solid #ccc;"><td  class="test-name" data-id="'+info.import_scores[i].exam_id+'">'+info.import_scores[i].exam_name+'</td><td class="test-subject" data-id="'+info.import_scores[i].subject_id+'">'+info.import_scores[i].subject_name+'</td><td colspan="2"><a href="javascript:;" class="determine set">设置</a><a href="javascript:;" class="deal">处理</a></td><td>'+info.import_scores[i].updated_at+'</td><td>'+info.import_scores[i].operator_id+'</td><td><span class="status"></span></td></tr>';
			$('.scores-in-tabble tbody').append(in_tr);
			var in_status = info.import_scores[i].status;
			if(in_status=="init"){
				$('.tr-'+info.import_scores[i].id+'').find('.status').addClass('no-deal').text('未处理');
			}
			if(in_status=="finished"){
				$('.tr-'+info.import_scores[i].id+'').find('.status').addClass('success-deal').text('已完成');
				$('.tr-'+info.import_scores[i].id+'').find('.deal').hide();
			}
			if(in_status=="executing"){
				$('.tr-'+info.import_scores[i].id+'').find('.status').addClass('on-deal').text('处理中');
			}
  	};
  }

	// 获取考试列表--函数
	function gets_exam_list(){
		$.ajax({
	   	type: "GET",
	   	url: ajaxIp+"/api/v2/exams",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	success: function(data){
	  		console.log(data)
				shows_exam_list(data);
      },
      error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
      }
	  });
	}
	// 显示考试列表
	function shows_exam_list(exam){
		var exam_length = exam.length;
		$('.score-import-right #select-exam').html('');
		for (var i = 0; i < exam_length; i++) {
			var exam_option = '<option data-id="'+exam[i].id+'">'+exam[i].name+'</option>';
			$('.score-import-right #select-exam').append(exam_option);
		};
		$('.score-import-right #select-exam').attr('data-id',exam[0].id);

	}


	// 获取科目列表
	function gets_subject_list(){
		$.ajax({
	   	type: "GET",
	   	url: ajaxIp+"/api/v2/commons/grade_subjects",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	success: function(data){
	  		console.log(data)
				shows_subject_list(data);
      },
      error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
      }
	  });
	}
	// 显示科目列表
	function shows_subject_list(subject){
		var subject_length = subject.length;
		$('.score-import-right #select-sujects').html('');
		$('.score-import-right #select-sujects').append('<option data-id="0">所有科目</option>');
		for (var i = 0; i < subject_length; i++) {
			var subject_option = '<option data-id="'+subject[i].id+'">'+subject[i].name+'</option>';
			$('.score-import-right #select-sujects').append(subject_option);
		};
		var first_id = $('.score-import-right #select-sujects option').eq(0).attr('data-id');
		$('.score-import-right #select-sujects').attr('data-id',first_id);
	}

	$('.score-import-right #select-exam').change(function(){
		var exam_id = $(this).find("option:selected").data('id');
		$(this).attr('data-id',exam_id);
	})
	$('.score-import-right #select-sujects').change(function(){
		var sub_id = $(this).find("option:selected").data('id');
		$(this).attr('data-id',sub_id);
	})


	// 搜索考试名称
	$('.score-import-right #search-num').change(function() {
		var exam_name = $(this).val();
		console.log(exam_name)
		get_grade_all_list(["score_search",exam_name]);
	});
	$('.score-import-right .student-search-button').click(function(){
		$('.score-import-right #search-num').change();
	})

	// 导入成绩按钮
	$('.import-button').click(function(){
		$('.modal-title').text('导入学生excel成绩');
		$('#upfiles').html('未选择任何文件');
		$('.import-grade-wrap .table-template').attr('href', ajaxIp+'/template/成绩导入模板.xlsx');
		
	})
	$('#inPaths').change(function(){
		inputFlileNames()
	})

	function inputFlileNames(){
		var file = $("#inPaths").val();
		var fileName = getFileName(file);
		$("#upfiles").html('未选择任何文件');
		function getFileName(o){
		    var pos=o.lastIndexOf("\\");
		    return o.substring(pos+1);
		}
		if(($("#upfiles div").length)==0){
			$("#upfiles").html('');
		}
		var iDiv = $('<div data-url='+file+'></div>')
		iDiv.text(fileName);
		// iDiv.data('url',file);
		iDiv.css({'display':'inline-block','color':'#666','background':'#dcf5f0','padding':'0 10px','height':'26px','border-radius':'2px','margin-right':'5px'});
		$('#upfiles').append(iDiv);

	}


	// 确定导入成绩
	$('.import-grade-wrap .determine').on('click', function() {
		$('.import-grade-wrap').hide();
		console.log(999999)
		var exam_id = $('.score-import-right #select-exam').attr('data-id');
		var subject_id = $('.score-import-right #select-sujects').attr('data-id');
		var formData = new FormData();
		formData.append("import_score_file",$("#inPaths")[0].files[0]);
		var i_string = $('.import-grade-wrap #upfiles div').html();
		i_string_i = i_string.lastIndexOf(".");
		i_string = i_string.substring(i_string_i+1);
		if(i_string!='xlsx' && i_string!='xls'){
			alert('文件格式不对，请选择xlsx或者xls文件！')
		}
		console.log(exam_id,subject_id,formData)
		get_file_path(exam_id,subject_id,formData);
	});


	function get_file_path(e_id,s_id,formData){
		console.log(e_id,s_id,formData);
		if(s_id!=0){
			$.ajax({
		   	type: "POST",
		   	url: ajaxIp+"/api/v2/import_student_scores/import_excel?exam_id="+e_id+"&subject_id="+s_id+"",
		  	dataType: "JSON",
		  	data: formData,
		  	// data:({'exam_id':e_id,'subject_id':s_id,'import_score':formData}),
		  	// data: formData,
		  	headers: {'Authorization': "Bearer " + isLogin},
		  	processData : false,
				contentType : false,
		  	beforeSend:function(){
						console.log("正在进行，请稍候");
				},
				success : function(data) {
					console.log(data);
					get_grade_all_list(null,null);
				},
				error : function() {
					console.log("error");
				}
		  });
	  }else{
	  	alert('请选择科目后再导入');
	  }
	}



	// 设置总分值
	$('body').on('click', '.set', function() {
		var import_score_id = $(this).parents('tr').attr('data-id');
		var exam_id = $(this).parents('tr').find('.test-name').attr('data-id');
		var subject_id = $(this).parents('tr').find('.test-subject').attr('data-id');
		// 获取题组信息
		get_item_group(exam_id,subject_id,import_score_id);
  });

  function get_item_group(e_id,s_id,import_score_id){
		$.ajax({
	   	type: "GET",
	   	url: ajaxIp+"/api/v2/import_student_scores/edit_answer_each_score",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	data:{'exam_id':e_id,'subject_id':s_id},
	  	success: function(data){
	  		console.log(data);
	  		show_item_group(data,import_score_id);
      },
      error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login.html'
      }
	  });
  }


  function show_item_group(item,import_score_id){
		$('.set-score-wrap .set-table tbody').html('');
		$('.set-score-wrap .set-table').attr('data-id',import_score_id);
		for (var i = 0; i < item.length; i++) {
			var set_li = '<tr class="item-tr-'+i+'"><td width="88%">'+item[i].answer_name+'</td><td><input type="text" value="'+item[i].score+'" data-id="'+item[i].answer_id+'"></td></tr>'
			$('.set-score-wrap .set-table tbody').append(set_li);
			if(!item[i].score){
				console.log(77)
				$('.item-tr-'+i+'').find('input').val('');
			}
		};
		$($('.set-table input')[0]).focus();
		get_key_op('.set-score-wrap .set-table');
  }


  // 设置题组总分
  $('body').on('click', '.set-score-wrap .determine', function() {
  	var import_score_id = $(this).parents('.set-score-wrap').find('.set-table').attr('data-id');
  	var answer_each_score = [];
  	var all_input = $(this).parents('.set-score-wrap').find('.set-table').find('input');
  	for (var i = 0; i < all_input.length; i++) {
  		var obj = new Object();
  		obj['answer_id'] = $(all_input[i]).attr('data-id');
  		obj['score'] = $(all_input[i]).val();
  		answer_each_score.push(obj);
  	};
  	var data_all = {'import_score_id':import_score_id,'answer_each_score':answer_each_score};
  	
		var iD_if_null = false;
		for (var h = 0; h < $('.set-table input').length; h++) {
		 	if($('.set-table input')[h].value == "")
			 {
				 iD_if_null = true;
			 }
		};

  	if(!iD_if_null){
			$.ajax({
		   	type: "PATCH",
		   	url: ajaxIp+"/api/v2/import_student_scores/set_answer_full_score",
		  	dataType: "JSON",
		  	headers: {'Authorization': "Bearer " + isLogin},
		  	data:data_all,
		  	success: function(data){
		  		console.log(data);
	      },
	      error: function(){
	      	// alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html'
	      }
		  });
  	}else{
  		alert("请输入得分后再提交");
  	}
  });
	$('body').on('input' , '.set-table input', function(){
		var str_score = $(this).val();

		var fen = parseFloat($(this).attr('data-fen'));
		var score = parseFloat($(this).val());
		console.log(score,fen)
		
		var re = /^\d+[.]?\d*$/;
		if(!re.test(str_score)){
			iTwo(prompt_i,prompt_2);
			$(this).val('');
		}


		if(String(str_score).length>1&&String(str_score)[0]=='0'&&String(str_score)[1]!='.'){
			iTwo(prompt_i,prompt_2);
			$(this).val('');
		}
		if(String(str_score)[0]=='.'){
			iTwo(prompt_i,prompt_2);
			$(this).val('');
		}

		console.log(String(str_score).split('.').length-1);
		var str_score_length = String(str_score).split('.').length-1;
		if(str_score_length>1){
			iTwo(prompt_i,prompt_2);
			$(this).val('');
		}
	});
	// 点击回车键进入下一个input,最后一个点击提交
	$('body').on('focus','.set-table input', function(){
		var that= this;
		$(document).unbind('keydown').keydown(function(event){
			if(event.keyCode == 13){
				if(that==$('input')[$('input').length-1]){
					$('.set-score-wrap .determine').click();
				}else{
					$(that).blur();
					$(that).parents('tr').next().find('input').focus();
					$(that).parents('tr').next().find('input').select();
				}
			}
		});
	})

	// 上下键功能
	function get_key_op(parent){
		// 上下左右键控制input
		var baseIndex = 100;
		$(parent).find("tr").each(function(r) {
			$(this).find("td").each(function(c) {
				$(this).find("input").attr("tabindex", r * 100 + c + baseIndex).addClass("cGridInput");
			});
		});
		$(parent).find(".cGridInput").on("keydown", function(event) {
			var tabIndex = parseInt($(this).attr("tabindex"));
			switch (event.keyCode) {
				case 38: //上
					tabIndex -= 100;
					break;
				case 40: //下
					tabIndex += 100;
					break;
				case 37: //左
					tabIndex = tabIndex - 1;
					break;
				case 39: //右
					tabIndex = tabIndex + 1;
					break;
				default:
					return;
			}
			if (tabIndex > 0) {
				$(".cGridInput[tabindex=" + tabIndex + "]").focus();
				$(".cGridInput[tabindex=" + tabIndex + "]").select();
					return false;
			}
			return true;
		});

	}
	function get_key_ops(parent){
		// 上下左右键控制input
		var baseIndex = 100;
		$(parent).find("li").each(function(r) {
			$(this).find("span").each(function(c) {
				$(this).parent().find("input").attr("tabindex", r * 100 + c + baseIndex).addClass("cGridInput");
			});
		});
		$(parent).find(".cGridInput").on("keydown", function(event) {
			var tabIndex = parseInt($(this).attr("tabindex"));
			switch (event.keyCode) {
				case 38: //上
					tabIndex -= 100;
					break;
				case 40: //下
					tabIndex += 100;
					break;
				case 37: //左
					tabIndex -= 100;
					break;
				case 39: //右
					tabIndex += 100;
					break;
				default:
					return;
			}
			if (tabIndex > 0) {
				$(".cGridInput[tabindex=" + tabIndex + "]").focus();
				$(".cGridInput[tabindex=" + tabIndex + "]").select();
					return false;
			}
			return true;
		});

	}

	// 处理
	$('body').on('click', '.deal', function() {
		var import_score_id = $(this).parents('tr').attr('data-id');
		$.ajax({
		   	type: "POST",
		   	url: ajaxIp+"/api/v2/import_student_scores/deal_import_student_score",
		  	dataType: "JSON",
		  	headers: {'Authorization': "Bearer " + isLogin},
		  	data: {'import_score_id':import_score_id},
		  	success: function(data){
		  		console.log(data);
			  	$('.load-bg').show();
			  	var customer_id = $('#wrap').attr('customer_id');
			  	console.log(customer_id)
		  	  var faye = new Faye.Client('http://192.168.1.127:9292/api/v2/events');
			    faye.subscribe("/import_score/"+ customer_id +"" , function (data) {
		        console.log(222222)
		        console.log(data)
		        if(data.message=='ok'){
							$('.load-bg').hide();
							get_grade_all_list(null,null);
		        }
			    });
	      },
	      error: function(){
	      	// alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html'
	      }
		  });
	});



})



















