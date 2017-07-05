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
			$('.user-information-right #select-sujects').html('<option value="0">全部科目</option>');
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
			selectSubjects($(this).val());
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
			studentSelectSubjects($(this).val());
			students_selectALl(["grade_id",$('.user-change-password #select-grade').val()])
		}
	});

	function selectALl(iData){
		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/teachers",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	data:{'page':1, 'limit': 10},
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
		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/students",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	data:{'page':1, 'limit': 10},
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
		if(num==0){
			return;
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
		$.jqPaginator('#students-pagination', {
	        totalPages: Math.ceil(num/10),
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
		for (var i = 0; i < data.length; i++) {
			var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
			console.log(i)
			$(name+' #select-grade').append(iOption);
		}
	}

	function selectSubjects(id){
		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/commons/"+id+"/grade_subjects",
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
		for (var i = 0; i < data.length; i++) {
			var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
			$(name+' #select-sujects').append(iOption);
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

			var iTr = '<tr style="border-bottom:1px solid #ccc;"><td>'+data[i].exam_no+'</td><td>'+data[i].real_name+'</td><td style="">'+(data[i].id_card_no==undefined?"":data[i].id_card_no)+'</td><td>'+(data[i].gender==undefined?"":data[i].gender)+'</td><td>'+(data[i].classroom.name==undefined?"":data[i].classroom.name)+'</td><td>'+(data[i].is_classroom_count?"是":"否")+'</td><td>'+(data[i].is_grade_count?"是":"否")+'</td><td class="table-modify"><span class="iconfont table-span" data-id="'+data[i].id+'">&#xe614;&nbsp;修改</span></td><td class="table-delete iconfont"><span class="iconfont table-span" data-id="'+data[i].id+'" data-name="'+data[i].real_name+'">&#xe616;&nbsp;删除</span></td></tr>'
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

		var i_is_classroom_count = $('.student-radio-grade').is(':checked');
		var i_is_grade_count = $('.student-radio-class').is(':checked');

		var i_data = {
			'real_name':i_student_name,
			'phone':'',
			'email':'',
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

	$('.user-information').on('click', function(){
		$('.change-password').removeClass('user-on');
		$('.user-information').addClass('user-on');
		$('.user-information-right').show();
		$('.user-change-password').hide();
	})

	$('.change-password').on('click', function(){
		$('.change-password').addClass('user-on');
		$('.user-information').removeClass('user-on');
		$('.user-information-right').hide();
		$('.user-change-password').show();
	})


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
})



















