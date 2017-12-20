$(function() {
	var hh = document.body.scrollHeight;
	console.log(hh);
	$('.load-bg').css('height', hh+'px');
	var isLogin = localStorage.getItem("token");
	var school_id;
	// var school_grades_array = [];
	var isTrueFalse = true;
	var isAdd = true;
	var isStudent = true;
	selectALl(null,null);
	// students_selectALl(null,null);
	selectGrades('.user-information-right');
	selectGrades('.user-change-password');
	selectGrades('.temporary-student-right');

	// 导出老师
	$('.Lead-in-teacher a').click(function(){
		var grade_id = $('.user-information-right #select-grade').val();
		var subject_id = $('.user-information-right #select-sujects').val();
		if(grade_id == 0 && subject_id==0){
			batch_export('.user-information-right',null);
		}
		if(grade_id!=0){
			batch_export('.user-information-right',["grade_id",grade_id]);
		}

		if(subject_id!=0 && grade_id!=0){
			var iData = [
				"grade_id",grade_id,
				"subject_id",subject_id,
			]
			batch_export('.user-information-right',iData);
		}else if(subject_id==0 && grade_id!=0){
			batch_export('.user-information-right',["grade_id",grade_id]);
		}
	})
	// batch_export('.user-information-right',null);

	// 导出学生
	$('.user-change-password .Lead-in-student a').click(function(){
		var grade_id = $('.user-change-password #select-grade').val();
		var classroom_id = $('.user-change-password #select-sujects').val();
		console.log(grade_id,classroom_id)

		if(grade_id == 0 && classroom_id==0){
			batch_export('.user-change-password',null);
		}

		if(grade_id!=0){
			batch_export('.user-change-password',["grade_id",grade_id]);
		}

		if(classroom_id!=0 && grade_id!=0){
			var iData = [
				"grade_id",grade_id,
				"classroom_id",classroom_id,
			]
			batch_export('.user-change-password',iData);
		}else if(classroom_id==0 && grade_id!=0){
			batch_export('.user-change-password',["grade_id",grade_id]);
		}
	})
	// batch_export('.user-change-password',null);

		// 导出临时学生
	$('.temporary-student-right .Lead-in-student a').click(function(){
		var grade_id = $('.temporary-student-right #select-grade').val();
		var classroom_id = $('.temporary-student-right #select-sujects').val();
		console.log(grade_id,classroom_id)

		if(grade_id == 0 && classroom_id==0){
			batch_export('.temporary-student-right',null);
		}

		if(grade_id!=0){
			batch_export('.temporary-student-right',["grade_id",grade_id]);
		}

		if(classroom_id!=0 && grade_id!=0){
			var iData = [
				"grade_id",grade_id,
				"classroom_id",classroom_id,
			]
			batch_export('.temporary-student-right',iData);
		}else if(classroom_id==0 && grade_id!=0){
			batch_export('.temporary-student-right',["grade_id",grade_id]);
		}
	})
	// batch_export('.temporary-student-right',null);
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
		$('#class-name').val('')
		var is_extra;
		if ($(this).parents('.user-right').hasClass('user-change-password')) {
			is_extra = false;
		};
		if ($(this).parents('.user-right').hasClass('temporary-student-right')) {
			is_extra = true;
		};
		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/commons/school_grades",
	    	dataType: "JSON",
	    	data: {'is_extra':is_extra},
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){
	    		console.log(data)
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

	})

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



	$('.student-supervise').click(function(){
		$('.modal-wrap-class-management .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-wrap-class-management .modal-shadow').animate({'opacity': .3},500);
		$('.modal-wrap-class-management').show();

		$('.modal-wrap-class-management .modal-title').text('班级管理');
		$('#add-class-grade').html('');
		var is_extra;
		if ($(this).parents('.user-right').hasClass('user-change-password')) {
			is_extra = false;
			$('.modal-wrap-class-management').attr('is_extra',0);
		};
		if ($(this).parents('.user-right').hasClass('temporary-student-right')) {
			is_extra = true;
			$('.modal-wrap-class-management').attr('is_extra',1);
		};

		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/commons/school_grades",
	    	dataType: "JSON",
	    	data: {'is_extra':is_extra},
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
			var is_extra = $('.modal-wrap-class-management').attr('is_extra')
			if(is_extra==0){
				is_extra = false;
			}
			if(is_extra==1){
				is_extra = true;
			}

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
		  				students_selectALl(['is_extra',is_extra]);
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

	})

	 $('.modal-wrap-class-management .determine').on('click' , function(){
	    	var del_grade = $('.modal-wrap-class-management #del-class-name').val();
	    	// var class_count = $('#class-name').val();
	    	var is_extra = $('.modal-wrap-class-management').attr('is_extra')
				if(is_extra==0){
					is_extra = false;
				}
				if(is_extra==1){
					is_extra = true;
				}

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
		  				students_selectALl(['is_extra',is_extra]);
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
		var is_extra = $('.import-wrap').attr('is_extra');
		if(is_extra == 0){
			is_extra = false;
		}
		if(is_extra == 1){
			is_extra = true;
		}

		if(isStudent=='1'){
			console.log(is_extra)
			$.ajax({
				url : ajaxIp+"/api/v2/students/batch_import?is_extra="+is_extra+"",
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
			var formData = new FormData();
			formData.append("import_teacher",$("#inPath")[0].files[0]);
			console.log(formData)
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
					console.log(data);
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
		}

	})

	$('.batch-import').click(function(){
		isStudent = $(this).attr('data-name');
		console.log(isStudent)
		$('#upfile').html('未选择任何文件');
		$('.import-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.import-wrap .modal-shadow').animate({'opacity': .3},500);
		$('.import-wrap').show();
		$('.import-wrap').removeClass('import-grade-wrap');
		var is_extra;
		if ($(this).parents('.user-right').hasClass('user-change-password')) {
			is_extra = false;
			$('.import-wrap').attr('is_extra',0);
		};
		if ($(this).parents('.user-right').hasClass('temporary-student-right')) {
			is_extra = true;
			$('.import-wrap').attr('is_extra',1);
		};
		// console.log(is_extra)
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

	$('.user-change-password .student-search-button').click(function(){
		if($('.student-search-input').val()!='')
		students_selectALl(["keyword", $('.student-search-input').val()])
	})
	$('.temporary-student-right .student-search-button').click(function(){
		if($('.student-search-input').val()!=''){
			var iData = [
				"keyword",$('.student-search-input').val(),
				"is_extra",true,
			]
			console.log(iData)
			students_selectALl(iData);

		}
	})



	$('.user-information-right #select-grade').change(function(){
		if($(this).val()!=0){
			// $('.user-information-right #select-sujects').html('<option value="0">全部科目</option>');
			selectSubjects($(this).val());
			selectALl(["grade_id",$(this).val()]);
			// batch_export('.user-information-right',["grade_id",$(this).val()]);
		}else{
			selectALl(null,null);
			// batch_export('.user-information-right',null);
			$('.user-information-right #select-sujects').html('<option value="0">全部科目</option>');
		}

	});

	$('.user-change-password #select-grade').change(function(){

		if($(this).val()!=0){
			$('.user-change-password #select-sujects').html('<option value="0">全部班级</option>');
			studentSelectSubjects($(this).val(),'.user-change-password');
			students_selectALl(["grade_id",$(this).val()]);
			// batch_export('.user-change-password',["grade_id",$(this).val()]);
		}else{
			students_selectALl(null,null);
			// batch_export('.user-change-password',null);
			$('.user-change-password #select-sujects').html('<option value="0">全部班级</option>');
		}

	});

	$('.temporary-student-right #select-grade').change(function(){

		if($(this).val()!=0){
			$('.temporary-student-right #select-sujects').html('<option value="0">全部班级</option>');
			studentSelectSubjects($(this).val(),'.temporary-student-right');
			var iData = [
				"is_extra",true,
				"grade_id",$(this).val(),
			]
			students_selectALl(iData);
			// batch_export('.temporary-student-right',["grade_id",$(this).val()]);
		}else{
			students_selectALl(["is_extra",true]);
			// batch_export('.temporary-student-right',null);
			$('.temporary-student-right #select-sujects').html('<option value="0">全部班级</option>');
		}

	});

	$('.user-information-right #select-sujects').change(function(){
		if($(this).val()!=0 && $('.user-information-right #select-grade').val()!=0){
			var iData = [
				"grade_id",$('.user-information-right #select-grade').val(),
				"subject_id",$(this).val(),
			]
			selectALl(iData);
			// batch_export('.user-information-right',iData);
		}else if($(this).val()==0 && $('.user-information-right #select-grade').val()!=0){
			$('.user-information-right #select-sujects').html('<option value="0">全部科目</option>');
			selectSubjects($('.user-information-right #select-grade').val());
			selectALl(["grade_id",$('.user-information-right #select-grade').val()]);
			// batch_export('.user-information-right',["grade_id",$('.user-information-right #select-grade').val()]);
		}
	});

	$('.user-change-password #select-sujects').change(function(){
		if($(this).val()!=0 && $('.user-change-password #select-grade').val()!=0){
			var iData = [
				"grade_id",$('.user-change-password #select-grade').val(),
				"classroom_id",$(this).val(),
			]
			students_selectALl(iData);
			// batch_export('.user-change-password',iData);
		}else if($(this).val()==0 && $('.user-change-password #select-grade').val()!=0){
			$('.user-change-password #select-sujects').html('<option value="0">全部年级</option>');
			studentSelectSubjects($('.user-change-password #select-grade').val(),'.user-change-password');
			students_selectALl(["grade_id",$('.user-change-password #select-grade').val()]);
			// batch_export('.user-change-password',["grade_id",$('.user-change-password #select-grade').val()]);
		}
	});

	$('.temporary-student-right #select-sujects').change(function(){
		if($(this).val()!=0 && $('.temporary-student-right #select-grade').val()!=0){
			var iData = [
				"is_extra",true,
				"grade_id",$('.temporary-student-right #select-grade').val(),
				"classroom_id",$(this).val(),
			]
			students_selectALl(iData);
			// batch_export('.temporary-student-right',["grade_id",$('.temporary-student-right #select-grade').val(),
				// "classroom_id",$(this).val()]);
		}else if($(this).val()==0 && $('.temporary-student-right #select-grade').val()!=0){
			$('.temporary-student-right #select-sujects').html('<option value="0">全部年级</option>');
			studentSelectSubjects($('.temporary-student-right #select-grade').val(),'.temporary-student-right');
			var iData = [
				"is_extra",true,
				"grade_id",$('.temporary-student-right #select-grade').val(),
			]
			students_selectALl(iData);
			// batch_export('.temporary-student-right',["grade_id",$('.temporary-student-right #select-grade').val()]);
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
	  			teachersList(data.total_entries, iData,data)
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

	  			studentsList(data.total_entries, iData,data)
	        },
	        error: function(){
	        	// alert('请稍后从新尝试登录或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login.html'
	        }
	    });
	}

	function batch_export(name,value){

		if(name=='.user-information-right'){

			var data_value = {};
			if(value!=null){
				for (var i = 0; i < value.length; i+=2) {
					data_value[value[i]] = value[i+1];
				}
			}
			console.log(data_value)
			$.ajax({
	     	type: "GET",
	     	async:false,
	     	url: ajaxIp+"/api/v2/teachers/batch_export",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	data: data_value,
	    	success: function(data){

	    		console.log(data,data_value)
	  			if(data.filepath){
	  				$('.Lead-in-teacher a').attr('href', ajaxIp+data.filepath);
	  				// $('.Lead-in-teacher a',this).click();
	  				// $(".Lead-in-teacher a strong").trigger("click");
	  				console.log(99)
	  			}
	        },
	        error: function(){
	        	// alert('请稍后从新尝试登录或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login.html'
	        }
	    });
		}
		
		var is_extra;
		var data_all;
		if(name=='.user-change-password'){
			is_extra = false;
			data_all={'is_extra':is_extra};
			if(value!=null){
				for (var i = 0; i < value.length; i+=2) {
					data_all[value[i]] = value[i+1];
				}
			}
		}
		if(name=='.temporary-student-right'){
			is_extra = true;
			data_all={'is_extra':is_extra};
			if(value!=null){
				for (var i = 0; i < value.length; i+=2) {
					data_all[value[i]] = value[i+1];
				}
			}
		}

    $.ajax({
     	type: "GET",
     	async:false,
     	url: ajaxIp+"/api/v2/students/batch_export",
    	dataType: "JSON",
    	data: data_all,
    	headers: {'Authorization': "Bearer " + isLogin},
    	success: function(data){

    		console.log(data,data_all)
  			if(data.filepath){
  				$(''+ name +' .Lead-in-student a').attr('href', ajaxIp+data.filepath);
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

	function teachersList(num, iData,f_data){
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
	        	console.log(iData,f_data)
				var iDataI = {'page':num, 'limit': 10};
				console.log(iData,iDataI)
				if(iData!=null){
					for (var i = 0; i < iData.length; i+=2) {
						iDataI[iData[i]] = iData[i+1];
					}
				}

				if(num==1){
					teachers_list(f_data.teachers);
				}
				if(num>1){
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
	      }
	    });
	}


	function studentsList(num, iData,f_data){
		console.log(num)
		if(num==0){
			ii_num=1;
		}else if(num>0 && num<10){
			ii_num=1;
		}else{
			ii_num=Math.ceil(num/10);
		}
		if(iData[0]==true){
			console.log('truetrue');
			$.jqPaginator('#temporary-pagination', {
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
				if(num==1){
					students_list(f_data.students);
				}
				if(num>1){
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
	     	}
	    });
		}else{
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
				if(num==1){
					students_list(f_data.students);
				}
				if(num>1){
	            $.ajax({
			     	type: "GET",
			     	url: ajaxIp+"/api/v2/students",
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	data: iDataI,
			    	success: function(data){
			    		console.log(data,iDataI)
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
	       }
	    });
		}


	}


	function selectGrades(name){
		// console.log(1)
		var is_extra;
		if(name=='.user-change-password'){
			// console.log('xuesheng1');
			is_extra = false;
		}
		if(name=='.temporary-student-right'){
			// console.log('xuesheng2');
			is_extra = true;
		}

		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/commons/school_grades",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	data: {'is_extra':is_extra},
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
			// console.log(i)
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

	function studentSelectSubjects(id,name){
		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/commons/"+id+"/grade_classrooms",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){
	    		console.log(data)
	    		console.log(111111111111111)
	  			selectSubjectsList(data , name);
	  			// selectSubjectsList(data , '.temporary-student-right');

	        },
	        error: function(){
	        	// alert('请稍后从新尝试登录或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login.html'
	        }
	    });
	}

	function selectSubjectsList(data , name){
		// $('#select-sujects').html('');
		$('#select-sujects').html('<option value="0">全部科目</option>');
		if(name == '.user-change-password' || name == '.temporary-student-right'){
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

		// if(name == '.temporary-student-right'){
		// 	for (var i = 0; i < data.length; i++) {
		// 		var iOption = '<option value="'+data[i].id+'">'+data[i].name+'('+data[i].count+')</option>'
		// 		$(name+' #select-sujects').append(iOption);
		// 	}
		// }

	}


 	function teachers_list(data){
 		// school_id = data[0].school.id;
 		// console.log(school_id)
 		console.log(data)
 		$('.teachers-tabble tbody').html('');
 		for (var i = 0; i < data.length; i++) {
 			var iGreads = [];
			for (var j = 0; j < data[i].teacher_subjects.length; j++) {
				iGreads[j] =data[i].teacher_subjects[j].name
			}

			var iTr = '<tr class="tr-'+i+'" style="border-bottom:1px solid #ccc;"><td>'+data[i].real_name+'</td><td style="width:140px">'+iGreads+'</td><td>'+data[i].email+'</td><td>'+data[i].phone+'</td><td>'+data[i].role+'</td><td class="table-modify"><span class="iconfont table-span" data-id="'+data[i].id+'">&#xe614;&nbsp;修改</span></td><td class="table-reset-password"><span class="iconfont table-span" data-id="'+data[i].id+'" data-name="'+data[i].real_name+'">&#xe60d;&nbsp;重置密码</span></td><td class="table-delete iconfont"><span class="iconfont table-span" data-id="'+data[i].id+'" data-name="'+data[i].real_name+'">&#xe616;&nbsp;删除</span></td></tr>'
 			$('.teachers-tabble tbody').append(iTr)
 			if(data[i].role=="超级管理员"){
				$('.tr-'+i+'').find('.table-span').css('visibility', 'hidden');
 			}
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
			    			alert(data.message);
								selectALl(null,null)
			    		}
			        },
			        error: function(){
			        	// alert('请稍后从新尝试登录或者联系管理员');
			        	// localStorage.clear();
			        	// window.location.href = './login.html'
			        }
			    });
				return false;
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
			// $('.first-div .add-list .teachers-grade').html('')

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
					// $('.teachers-propmt-wrap #teachers-grade').val(data.teacher_subjects[0].name);
					// console.log(data.grades.name+'11111111111111111')
					iDataGrades = data.teacher_subjects;
					defaultRole = data.role;
					$('.first-div > .add-list .teachers-grade').html('')
					$('.first-div > .add-cont').html('');

					var grade_ids = [];
					if(iDataGrades.length==1){
						grade_ids=iDataGrades[0].grade_id;
						defaultId = data.teacher_subjects[0].subject_id;
						classroom_id = data.teacher_subjects[0].classroom_id;
						console.log(999999)
						$.ajax({
				     	type: "GET",
				     	url: ajaxIp+"/api/v2/commons/school_grades",
				    	dataType: "JSON",
				    	headers: {'Authorization': "Bearer " + isLogin},
				    	success: function(data){
				    		console.log(data);
				    		$('.first-div > .add-list .teachers-grade').html('');
								for (var gg = 0; gg < data.length; gg++) {
									var child_gg = '<option value="'+data[gg].id+'">'+data[gg].name+'</option>';
									$('.first-div > .add-list .teachers-grade').append(child_gg);
									if(iDataGrades[0].grade_id==data[gg].id){
										console.log(gg)
										$($('.first-div > .add-list .teachers-grade option').eq(gg)).attr('selected',true);
									}
								};
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
						  				$('.first-div > .add-list .teachers-subject').html(iOption_s);

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
						     	url: ajaxIp+"/api/v2/commons/"+grade_ids+"/grade_classrooms",
						    	dataType: "JSON",
						    	headers: {'Authorization': "Bearer " + isLogin},
						    	success: function(data){
						    		console.log(classroom_id)
						    		console.log(data)
						    		$('.first-div > .add-list .teachers-class').html('');
						    		var iOption;
						  			for (var i = 0; i < data.length; i++) {
						  				if(classroom_id==data[i].id){
												iOption = '<option value="'+data[i].id+'" selected>'+data[i].name+'（'+data[i].count+'）</option>'

						  				}else{
												iOption = '<option value="'+data[i].id+'">'+data[i].name+'（'+data[i].count+'）</option>'
											}
											$('.first-div > .add-list .teachers-class').append(iOption);
									}
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
					if(iDataGrades.length>1){
						$('.first-div > .add-cont').html('');
						for (var rr = 0; rr < iDataGrades.length; rr++) {
							if(rr==0){
								grade_ids=iDataGrades[0].grade_id;
								defaultId = data.teacher_subjects[0].subject_id;
								classroom_id = data.teacher_subjects[0].classroom_id;
								console.log(999999)
								$.ajax({
						     	type: "GET",
						     	url: ajaxIp+"/api/v2/commons/school_grades",
						    	dataType: "JSON",
						    	async:false,
						    	headers: {'Authorization': "Bearer " + isLogin},
						    	success: function(data){
						    		console.log(data);
						    		$('.first-div > .add-list .teachers-grade').html('');
										for (var gg = 0; gg < data.length; gg++) {
											var child_gg = '<option value="'+data[gg].id+'">'+data[gg].name+'</option>';
											$('.first-div > .add-list .teachers-grade').append(child_gg);
											if(iDataGrades[0].grade_id==data[gg].id){
												console.log(gg)
												$($('.first-div > .add-list .teachers-grade option').eq(gg)).attr('selected',true);
											}
										};
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
								  				$('.first-div > .add-list .teachers-subject').html(iOption_s);

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
								     	url: ajaxIp+"/api/v2/commons/"+grade_ids+"/grade_classrooms",
								    	dataType: "JSON",
								    	headers: {'Authorization': "Bearer " + isLogin},
								    	success: function(data){
								    		console.log(classroom_id)
								    		console.log(data)
								    		$('.first-div > .add-list .teachers-class').html('');
								    		var iOption;
								  			for (var i = 0; i < data.length; i++) {
								  				if(classroom_id==data[i].id){
														iOption = '<option value="'+data[i].id+'" selected>'+data[i].name+'（'+data[i].count+'）</option>'

								  				}else{
														iOption = '<option value="'+data[i].id+'">'+data[i].name+'（'+data[i].count+'）</option>'
													}
													$('.first-div > .add-list .teachers-class').append(iOption);
											}
								        },
								        error: function(){
								        	// alert('请稍后从新尝试登录或者联系管理员');
								        	// localStorage.clear();
								        	// window.location.href = './login.html'
								        }
								    });


						       }
						    });
							}else{
								console.log(88)
								var child_div = '<div class="add-list add-list-'+rr+'" style="border-bottom:1px solid #ccc;"><div class="teachers-input-wrap" style="position: relative;height: 30px;margin-bottom: 10px;"><label class="teachers-label" style="position: absolute;top: 4px;left: 8px;" for="teachers-grade">年&nbsp;&nbsp;&nbsp;级</label><select id="teachers-grade" class="teachers-grade" style="display: inline-block;width: 140px;height:30px;line-height: 30px;text-align: left; position: absolute;top: -3px;left: 60px;"></select><label class="teachers-label" style="position: absolute;top: 4px;left: 224px;" for="teachers-class">班&nbsp;&nbsp;&nbsp;级</label><select class="teachers-class" style="width: 140px; position: absolute;top: -3px;left:274px;height: 30px;line-height: 30px;"></select></div><div class="teachers-input-wrap" style="margin-bottom: 20px;"><label class="teachers-label" for="teachers-subject" style="left:-24px">科&nbsp;&nbsp;&nbsp;目</label><select id="teachers-subject" class="teachers-input teachers-subject" style="width: 356px;margin-left: -10px;"></select><a href="javascript:" class="dele-t"><i class="iconfont">&#xe616;</i>删除</a></div></div>';
								$('.first-div > .add-cont').append(child_div);
								console.log(77777)
								var gg_id = iDataGrades[rr].grade_id;
								console.log(gg_id)
								$.ajax({
						     	type: "GET",
						     	url: ajaxIp+"/api/v2/commons/school_grades",
						    	dataType: "JSON",
						    	async:false,
						    	headers: {'Authorization': "Bearer " + isLogin},
						    	success: function(data){
						    		console.log(data,rr,gg_id);
						    		$('.first-div .add-cont .add-list-'+rr+'').find('.teachers-grade').html('');
						    		var child_qq;
										for (var qq = 0; qq < data.length; qq++) {
											if(gg_id==data[qq].id){
												// console.log(gg_id,data[qq].id,qq)
												child_qq = '<option value="'+data[qq].id+'" selected>'+data[qq].name+'</option>';
											}else{
												// console.log(qq)
												child_qq = '<option value="'+data[qq].id+'">'+data[qq].name+'</option>';
											}
											// console.log(child_qq,rr)

											$('.first-div .add-cont .add-list-'+rr+'').find('.teachers-grade').append(child_qq);
										};
										console.log(rr)

					       }
					    	});

					    	grade_ids=gg_id;
								var ss_id = iDataGrades[rr].subject_id;
								console.log(rr)
								$.ajax({
						     	type: "GET",
						     	async:false,
						     	url: ajaxIp+"/api/v2/teachers/find_subject_by_grade",
						    	dataType: "JSON",
						    	headers: {'Authorization': "Bearer " + isLogin},
						    	data:{grade_ids},
						    	success: function(data){
						    		console.log(data,rr)
						    		var iOption_s;
						    		console.log(ss_id);
						    		$('.first-div .add-cont .add-list-'+rr+'').find('.teachers-subject').html('');
						  			for (var jj = 0; jj < data.length; jj++) {
						  				if(ss_id == data[jj].id){
						  					console.log(jj)
						  					iOption_s= '<option value="'+data[jj].id+'" selected>'+data[jj].name+'</option>';
						  				}else{
						  					iOption_s= '<option value="'+data[jj].id+'">'+data[jj].name+'</option>';
						  				}
						  				console.log(iOption_s,rr)
						  				// console.log($('.first-div .add-cont .add-list-'+rr+''))
						  				$('.first-div .add-cont .add-list-'+rr+'').find('.teachers-subject').append(iOption_s);
						  			}
						      },
						      error: function(){
						        	// alert('请稍后从新尝试登录或者联系管理员');
						        	// localStorage.clear();
						        	// window.location.href = './login.html'
						      }
						    });
								var cc_id = iDataGrades[rr].classroom_id;
						    $.ajax({
						     	type: "GET",
						     	url: ajaxIp+"/api/v2/commons/"+grade_ids+"/grade_classrooms",
						    	dataType: "JSON",
						    	async: false,
						    	headers: {'Authorization': "Bearer " + isLogin},
						    	success: function(data){
						    		console.log(cc_id)
						    		console.log(data)
						    		$('.first-div .add-cont .add-list-'+rr+'').find('.teachers-class').html('');
						    		var iOption;
						  			for (var mm = 0; mm < data.length; mm++) {
						  				if(cc_id==data[mm].id){
												iOption = '<option value="'+data[mm].id+'" selected>'+data[mm].name+'（'+data[mm].count+'）</option>'

						  				}else{
												iOption = '<option value="'+data[mm].id+'">'+data[mm].name+'（'+data[mm].count+'）</option>'
											}
											$('.first-div .add-cont .add-list-'+rr+'').find('.teachers-class').append(iOption);
										}
						      },
						      error: function(){
						        	// alert('请稍后从新尝试登录或者联系管理员');
						        	// localStorage.clear();
						        	// window.location.href = './login.html'
						        }
						    });
							}
						}
					}
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

		    },
		  });


		})

		// 添加列表
		$('body').find('#add-t').off("click").on('click',function() {
			console.log(8888)
			console.log($('.add-cont .add-list').length)
			var l_length = $('.add-cont .add-list').length;
			var child_div = '<div class="add-list add-list-'+(l_length+1)+'" style="border-bottom:1px solid #ccc;"><div class="teachers-input-wrap" style="position: relative;height: 30px;margin-bottom: 10px;"><label class="teachers-label" style="position: absolute;top: 4px;left: 8px;" for="teachers-grade">年&nbsp;&nbsp;&nbsp;级</label><select id="teachers-grade" class="teachers-grade" style="display: inline-block;width: 140px;height:30px;line-height: 30px;text-align: left; position: absolute;top: -3px;left: 60px;"></select><label class="teachers-label" style="position: absolute;top: 4px;left: 224px;" for="teachers-class">班&nbsp;&nbsp;&nbsp;级</label><select class="teachers-class" style="width: 140px; position: absolute;top: -3px;left:274px;height: 30px;line-height: 30px;"></select></div><div class="teachers-input-wrap" style="margin-bottom: 20px;"><label class="teachers-label" for="teachers-subject" style="left:-24px">科&nbsp;&nbsp;&nbsp;目</label><select id="teachers-subject" class="teachers-input teachers-subject" style="width: 356px;margin-left: -10px;"></select><a href="javascript:" class="dele-t"><i class="iconfont">&#xe616;</i>删除</a></div></div>';
			$(this).parents('.add-list').siblings('.add-cont').append(child_div);
			var $this = $(this);
			$.ajax({
		     	type: "GET",
		     	url: ajaxIp+"/api/v2/commons/school_grades",
		    	dataType: "JSON",
		    	headers: {'Authorization': "Bearer " + isLogin},
		    	success: function(data){
						console.log(data)
						$this.parents('.add-list').siblings('.add-cont').children('.add-list-'+(l_length+1)+'').find('.teachers-grade').html('');
					// var thisDiv='<div class="allNew">全部<i class="iconfont gradesname" style="position:absolute;right:10px;top:0;">&#xe619;</i></div>';
		    		// for (var i = 0; i < data.length; i++) {
    				// 	thisDiv+='<div class="newTeacher newTea" data-id="'+data[i].id+'">'+data[i].name+'<i class="iconfont gradesname" style="position:absolute;right:10px;top:0;">&#xe619;</i></div>'
		    		// }
		    		for (var i = 0; i < data.length; i++) {
		    			var thisDiv = '<option value="'+data[i].id+'">'+data[i].name+'</option>';
		    			$this.parents('.add-list').siblings('.add-cont').children('.add-list-'+(l_length+1)+'').find('.teachers-grade').append(thisDiv);
		    			$this.parents('.add-list').siblings('.add-cont').children('.add-list-'+(l_length+1)+'').find('.teachers-grade').val(data[0].id)
		    		};
		    		var grade_ids = $this.parents('.add-list').siblings('.add-cont').children('.add-list-'+(l_length+1)+'').find('.teachers-grade').val();
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
					  			}
					  			$('.add-list-'+(l_length+1)+' .teachers-subject').html(iOption_s);
					        },
					        error: function(){
					        	// alert('请稍后从新尝试登录或者联系管理员');
					        	// localStorage.clear();
					        	// window.location.href = './login'
					        }
					  });
		    		$.ajax({
				     	type: "GET",
				     	url: ajaxIp+"/api/v2/commons/"+grade_ids+"/grade_classrooms",
				    	dataType: "JSON",
				    	headers: {'Authorization': "Bearer " + isLogin},
				    	success: function(data){
				    		console.log(data)
				    		$this.parents('.add-list').siblings('.add-cont').children('.add-list-'+(l_length+1)+'').find('.teachers-class').html('');
				  			for (var i = 0; i < data.length; i++) {
								var iOption = '<option value="'+data[i].id+'">'+data[i].name+'（'+data[i].count+'）</option>'
								$this.parents('.add-list').siblings('.add-cont').children('.add-list-'+(l_length+1)+'').find('.teachers-class').append(iOption);
							}
				        },
				        error: function(){
				        	// alert('请稍后从新尝试登录或者联系管理员');
				        	// localStorage.clear();
				        	// window.location.href = './login.html'
				        }
				    });

	    			// $('.newTeacher').on('click' , function(){
	    			$('.add-list .teachers-grade').on('change' , function(){
	    				var grade_ids = $(this).val();
	    				console.log(grade_ids)


				    var class_info = $(this).parent().find('.teachers-class');
						$.ajax({
				     	type: "GET",
				     	url: ajaxIp+"/api/v2/commons/"+grade_ids+"/grade_classrooms",
				    	dataType: "JSON",
				    	headers: {'Authorization': "Bearer " + isLogin},
				    	success: function(data){
				    		console.log(data);
				    		console.log(class_info.html())
				    		class_info.html('');
				    		// $('.teachers-propmt-wrap .add-list .teachers-class').html('');
				  			for (var i = 0; i < data.length; i++) {
								var iOption = '<option value="'+data[i].id+'">'+data[i].name+'（'+data[i].count+'）</option>'
								class_info.append(iOption);
							}
				        },
				        error: function(){
				        	// alert('请稍后从新尝试登录或者联系管理员');
				        	// localStorage.clear();
				        	// window.location.href = './login.html'
				        }
				    });
					  var subject_info = $(this).parents('.add-list').find('.teachers-subject');

		    		$.ajax({
				     	type: "GET",
				     	url: ajaxIp+"/api/v2/teachers/find_subject_by_grade",
				    	dataType: "JSON",
				    	headers: {'Authorization': "Bearer " + isLogin},
				    	data:{grade_ids},
				    	success: function(data){
				    		console.log(data)
				    		var iOption_s;
				    		// console.log(subject_info.html())
			    			subject_info.html('');
				  			for (var i = 0; i < data.length; i++) {
				  					iOption_s+= '<option value="'+data[i].id+'">'+data[i].name+'</option>';

				  				// $(iOption_s).attr('id', data.id);
				  				// $(iOption_s).attr('value', data.name);
				  				// $(iOption_s).text(data.name);
				  			}
				  			subject_info.html(iOption_s);
				        },
				        error: function(){
				        	// alert('请稍后从新尝试登录或者联系管理员');
				        	// localStorage.clear();
				        	// window.location.href = './login'
				        }
				    });
		    	})

					}
		    })
			return false;
		});
		// 删除列表
		$('body').on('click', '.dele-t', function() {
			$(this).parents('.add-list').remove();
		});

		$('.teachers-propmt-wrap .determine').unbind().on('click' , function(){

			var teachers_name = $('.teachers-propmt-wrap #teachers-name').val();
			var teachers_idn = $('.teachers-propmt-wrap #teachers-name').attr('data-id');
			var teachers_email = $('.teachers-propmt-wrap #teachers-email').val();
			var teachers_number = $('.teachers-propmt-wrap #teachers-number').val();
			var teachers_role = $('.teachers-propmt-wrap #teachers-role').val();
			// var teachers_subject = $('.teachers-propmt-wrap #teachers-subject').val();
			// var i_grade_ids = [];
			// if($('#teachers-grade .newBack').length==0){
			// 	for (var i = 0; i < $('.newTeacherBack').length; i++) {
			// 		i_grade_ids[i] = $($('.newTeacherBack')[i]).data('id');
			// 	}
			// }else{
			// 	for (var i = 1; i < $('.newTeacherBack').length; i++) {
			// 		i_grade_ids[i-1] = $($('.newTeacherBack')[i]).data('id');
			// 	}
			// }
			var teacher_subjects=[];
			var all_id_info = $(this).parents('.teachers-propmt-wrap').find('.add-list');
			for (var ll = 0; ll < all_id_info.length; ll++) {
				var obj = new Object();
				var g_ids = $(all_id_info[ll]).find('.teachers-grade').val();
				var c_ids = $(all_id_info[ll]).find('.teachers-class').val();
				var s_ids = $(all_id_info[ll]).find('.teachers-subject').val();
				obj={'grade_id':g_ids,'classroom_id': c_ids, 'subject_id': s_ids};
				teacher_subjects.push(obj);
				JSON.stringify(teacher_subjects)
			};
			// grade_ids = i_grade_ids.join(',');
			var iDatas = {
				'phone':teachers_number,
				'real_name':teachers_name,
				'email':teachers_email,
				'customer_role':teachers_role,
				'teacher_subjects':JSON.stringify(teacher_subjects)
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
						'teacher_subjects':JSON.stringify(teacher_subjects)
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
				// teacher_subjects	是	array	[{grade_id: 1, classroom_id: 1, subject_id: 1}]
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
						// 'grade_ids':i_grade_ids,
						// 'subject_id':teachers_subject,
						'teacher_subjects':JSON.stringify(teacher_subjects),
			    	},
			    	success: function(data){
			    		$('.modal-main').animate({'top': '45%','opacity': 0},500);
						$('.modal-shadow').animate({'opacity': 0},500);
						setTimeout(function(){
							$('.modal-wrap').hide();
						},500);
			    		console.log(data)
			    		setTimeout(function(){
							alert(data.message)
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
			var is_extra = 0;
			$('.modal-wrap-student-info').attr('is_extra',is_extra);

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

		$('.temporary-student-right .table-modify span').click(function(){
			$('.modal-wrap-student-info .modal-main').animate({'top': '50%','opacity': 1},500);
			$('.modal-wrap-student-info .modal-shadow').animate({'opacity': .3},500);
			$('.modal-wrap-student-info').show();
			var is_extra = 1;
			$('.modal-wrap-student-info').attr('is_extra',is_extra);

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
						        	// window.location.href = './login'
						        }
						    });
				        },
				        error: function(){
				        	// alert('请稍后从新尝试登录或者联系管理员');
				        	// localStorage.clear();
				        	// window.location.href = './login'
				        }
				    });
		        },
		        error: function(){
		        	// alert('请稍后从新尝试登录或者联系管理员');
		        	// localStorage.clear();
		        	// window.location.href = './login'
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
			        	// window.location.href = './login'
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
			var is_extra;
			if ($(this).parents('.user-right').hasClass('temporary-student-right')) {
				is_extra = true;
			};
			if ($(this).parents('.user-right').hasClass('user-change-password')) {
				is_extra = false;
			};


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
							students_selectALl(["is_extra",true]);
			    		}else{
			    			alert(data.message)
							students_selectALl(["is_extra",true]);
			    		}
			        },
			        error: function(){
			        	// alert('请稍后从新尝试登录或者联系管理员');
			        	// localStorage.clear();
			        	// window.location.href = './login'
			        }
			    });
			})
		})
 	}


		$('.add-teacher').on('click',function(){
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
					// window.location.href = './login'
				}
			});

			$.ajax({
		     	type: "GET",
		     	url: ajaxIp+"/api/v2/commons/school_grades",
		    	dataType: "JSON",
		    	headers: {'Authorization': "Bearer " + isLogin},
		    	success: function(data){
					console.log(data)
					$('.teachers-propmt-wrap .add-list .teachers-grade').html('');
					// var thisDiv='<div class="allNew">全部<i class="iconfont gradesname" style="position:absolute;right:10px;top:0;">&#xe619;</i></div>';
		    		// for (var i = 0; i < data.length; i++) {
    				// 	thisDiv+='<div class="newTeacher newTea" data-id="'+data[i].id+'">'+data[i].name+'<i class="iconfont gradesname" style="position:absolute;right:10px;top:0;">&#xe619;</i></div>'
		    		// }
		    		for (var i = 0; i < data.length; i++) {
		    			var thisDiv = '<option value="'+data[i].id+'">'+data[i].name+'</option>';
		    			$('.add-list .teachers-grade').append(thisDiv);
		    			$('.add-list .teachers-grade').val(data[0].id)
		    		};
		    		var grade_ids = $('.add-list .teachers-grade').val();
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
					  			$('.add-list .teachers-subject').html(iOption_s);
					        },
					        error: function(){
					        	// alert('请稍后从新尝试登录或者联系管理员');
					        	// localStorage.clear();
					        	// window.location.href = './login'
					        }
					    });
		    		$.ajax({
				     	type: "GET",
				     	url: ajaxIp+"/api/v2/commons/"+grade_ids+"/grade_classrooms",
				    	dataType: "JSON",
				    	headers: {'Authorization': "Bearer " + isLogin},
				    	success: function(data){
				    		console.log(data)
				    		$('.teachers-propmt-wrap .add-list .teachers-class').html('');
				  			for (var i = 0; i < data.length; i++) {
								var iOption = '<option value="'+data[i].id+'">'+data[i].name+'（'+data[i].count+'）</option>'
								$('.teachers-propmt-wrap .add-list .teachers-class').append(iOption);
							}
				        },
				        error: function(){
				        	// alert('请稍后从新尝试登录或者联系管理员');
				        	// localStorage.clear();
				        	// window.location.href = './login.html'
				        }
				    });

	    			// $('.newTeacher').on('click' , function(){
	    			$('.add-list .teachers-grade').on('change' , function(){
	    				var grade_ids = $(this).val();
	    				console.log(grade_ids)
		    // 			$(this).toggleClass('newTeacherBack');
		    // 			if($('.newTeacherBack').length == (data.length)){
						// 	$('.allNew').addClass('newBack');
		    // 				$('.allNew').removeClass('newTeacherBack');

		    // 			}else{
		    // 				$('.allNew').removeClass('newBack');
		    // 				// $('.allNew').removeClass('newTeacherBack');

		    // 			}
					 //    var grade_ids = [];
						// if($('#teachers-grade .newBack').length==0){
						// 	for (var i = 0; i < $('.newTeacherBack').length; i++) {
						// 		grade_ids[i] = $($('.newTeacherBack')[i]).attr('data-id');
						// 	}
						// }else{
						// 	for (var i = 0; i < $('.newTeacherBack').length; i++) {
						// 		grade_ids[i] = $($('.newTeacherBack')[i]).attr('data-id');
						// 	}
						// }


						// grade_ids = grade_ids.join(',');
				    var class_info = $(this).parent().find('.teachers-class');
						$.ajax({
				     	type: "GET",
				     	url: ajaxIp+"/api/v2/commons/"+grade_ids+"/grade_classrooms",
				    	dataType: "JSON",
				    	headers: {'Authorization': "Bearer " + isLogin},
				    	success: function(data){
				    		console.log(data);
				    		console.log(class_info.html())
				    		class_info.html('');
				    		// $('.teachers-propmt-wrap .add-list .teachers-class').html('');
				  			for (var i = 0; i < data.length; i++) {
								var iOption = '<option value="'+data[i].id+'">'+data[i].name+'（'+data[i].count+'）</option>'
								class_info.append(iOption);
							}
				        },
				        error: function(){
				        	// alert('请稍后从新尝试登录或者联系管理员');
				        	// localStorage.clear();
				        	// window.location.href = './login.html'
				        }
				    });
					  	var subject_info = $(this).parents('.add-list').find('.teachers-subject');

		    			$.ajax({
					     	type: "GET",
					     	url: ajaxIp+"/api/v2/teachers/find_subject_by_grade",
					    	dataType: "JSON",
					    	headers: {'Authorization': "Bearer " + isLogin},
					    	data:{grade_ids},
					    	success: function(data){
					    		console.log(data)
					    		var iOption_s;
					    		// console.log(subject_info.html())
				    			subject_info.html('');
					  			for (var i = 0; i < data.length; i++) {
					  					iOption_s+= '<option value="'+data[i].id+'">'+data[i].name+'</option>';

					  				// $(iOption_s).attr('id', data.id);
					  				// $(iOption_s).attr('value', data.name);
					  				// $(iOption_s).text(data.name);
					  			}
					  			subject_info.html(iOption_s);
					        },
					        error: function(){
					        	// alert('请稍后从新尝试登录或者联系管理员');
					        	// localStorage.clear();
					        	// window.location.href = './login'
					        }
					    });
		    		})
						// $('.allNew').on('click' , function(){
				  //   			$(this).toggleClass('newBack');
				  //   			if($(this).hasClass('newBack')){
						// 				for (var i = 0; i < $('.newTea').length; i++) {
						// 					$($('.newTea')[i]).addClass('newTeacherBack');
						// 				}
				  //   			}else{
						// 				for (var i = 0; i < $('.newTea').length; i++) {
						// 					$($('.newTea')[i]).removeClass('newTeacherBack');
						// 				}
				  //   			}

				  //   			var grade_ids = [];
						// 		if($('#teachers-grade .newBack').length==0){
						// 			for (var i = 0; i < $('.newTeacherBack').length; i++) {
						// 				grade_ids[i] = $($('.newTeacherBack')[i]).data('id');
						// 			}
						// 		}else{
						// 			for (var i = 0; i < $('.newTeacherBack').length; i++) {
						// 				grade_ids[i] = $($('.newTeacherBack')[i]).data('id');
						// 			}
						// 		}
						// 		grade_ids = grade_ids.join(',');
						// 		console.log(grade_ids)
				  //   			$.ajax({
						// 	     	type: "GET",
						// 	     	url: ajaxIp+"/api/v2/teachers/find_subject_by_grade",
						// 	    	dataType: "JSON",
						// 	    	headers: {'Authorization': "Bearer " + isLogin},
						// 	    	data:{grade_ids},
						// 	    	success: function(data){
						// 	    		console.log(data)
						// 	    		var iOption_s='';
						// 	  			for (var i = 0; i < data.length; i++) {
						// 	  					iOption_s+= '<option value="'+data[i].id+'">'+data[i].name+'</option>';

						// 	  				// $(iOption_s).attr('id', data.id);
						// 	  				// $(iOption_s).attr('value', data.name);
						// 	  				// $(iOption_s).text(data.name);
						// 	  			}
						// 	  			$('#teachers-subject').html(iOption_s);
						// 	        },
						// 	        error: function(){
						// 	        	// alert('请稍后从新尝试登录或者联系管理员');
						// 	        	// localStorage.clear();
						// 	        	// window.location.href = './login'
						// 	        }
						// 	    });
				  //   		})

				}
		    })

		})


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

		var is_extra = $('.modal-wrap-student-info').attr('is_extra');
		if(is_extra == 0){
			is_extra = false;
		}
		if(is_extra == 1){
			is_extra = true;
		}

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
			'is_extra':is_extra
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
		    			if(is_extra==false){
								students_selectALl(["is_extra",false]);
			    			selectGrades('.user-change-password');
		    			}
		    			if(is_extra==true){
		    				students_selectALl(["is_extra",true]);
			    			selectGrades('.temporary-student-right');
		    			}
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
		        	// window.location.href = './login'
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
		    		console.log(data,i_data,is_extra)
		    		if(data.success){
		    			alert(data.message)
		    			console.log('is_extra',is_extra)
						if(is_extra==false){
								students_selectALl(["is_extra",false]);
			    			selectGrades('.user-change-password');
		    			}
		    			if(is_extra==true){
		    				students_selectALl(["is_extra",true]);
			    			selectGrades('.temporary-student-right');
		    			}
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
		        	// window.location.href = './login'
		        }
		    });
		}
 	});

 	$('.add-student').on('click', function(){
 		isAdd = true;
 		var is_extra;
 		if($(this).parents('.user-right').hasClass('user-change-password')){
			is_extra = 0;
			$('.modal-wrap-student-info').attr('is_extra',is_extra);
 		}
 		if($(this).parents('.user-right').hasClass('temporary-student-right')){
			is_extra = 1;
			$('.modal-wrap-student-info').attr('is_extra',is_extra);
 		}
 		$('.modal-wrap-student-info .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-wrap-student-info .modal-shadow').animate({'opacity': .3},500);
		$('.modal-wrap-student-info').show();

		$('.modal-wrap-student-info .modal-title').text('添加学生');
		var is_last;
		if($('.modal-wrap-student-info').attr('is_extra')==0){
			is_last = false;
		}
		if($('.modal-wrap-student-info').attr('is_extra')==1){
			is_last = true;
		}

		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/commons/school_grades",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	data: {'is_extra':is_last},
	    	success: function(data){
	    		console.log(data,is_extra)
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
			        	// window.location.href = './login'
			        }
			    });
	        },
	        error: function(){
	        	// alert('请稍后从新尝试登录或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login'
	        }
	    });

	    $('.current-grade').change(function(){
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
		        	// window.location.href = './login'
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
  	console.log(index);
  	$('.user-right').eq(index).show().siblings('.user-right').hide();
  	if($(this).hasClass('temporary-student')){
  		students_selectALl(["is_extra",true]);
  		// batch_export('.temporary-student-right',null);
  	}
  	if($(this).hasClass('change-password')){
  		students_selectALl(["is_extra",false]);
  		// batch_export('.user-change-password',null)
  	}
  	if($(this).hasClass('word-import')){
  		get_all_word_exam();
  		var faye = new Faye.Client(fayeIp+'/api/v2/events');
  		console.log(fayeIp,faye)
		    faye.subscribe("/docx/questions" , function (data) {
	        console.log(data)
	        if(data.message=='done'){
						$('.load-bg').hide();
						get_all_word_exam();
	        }
		    });
  	}
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
		var is_extra;
		if ($(this).parents('.user-right').hasClass('temporary-student-right')) {
			is_extra = true;
		}; 
		if ($(this).parents('.user-right').hasClass('user-change-password')) {
			is_extra = false;
		};
		
		var gg=$(this).parents('.set-up-search').find('#select-grade  option:selected').text();
		var ss=$(this).parents('.set-up-search').find('#select-sujects  option:selected').text().substr(0,2);
		// alert(ss);
		document.title = $('#school-name').val()+gg+ss;
		printBarcode(is_extra,gg,ss);
	})


	function printBarcode(is_extra,gg,ss) {
	    var colNum=6;
	    var rowNum=24;
	    var stdW=170;
	    var margin=5;
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
	      style.innerHTML='@page{margin:25px;}';
	      headEl.appendChild(style);
	      idoc = iframe.contentDocument.body;
	    }
	    var blockW=stdW+2*margin;
	    if(is_extra==false){
		    var grade_id = $(".user-change-password #select-grade").val();
		    var classroom_id = $(".user-change-password #select-sujects").val();
	    }
	    if(is_extra==true){
		    var grade_id = $(".temporary-student-right #select-grade").val();
		    var classroom_id = $(".temporary-student-right #select-sujects").val();
	    }
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
		    		'is_extra':is_extra
		    	},
		    	success: function(data){
		    		console.log(data)
		    		createCode(0, data);
		        },
		        error: function(){
		        	// alert('请稍后从新尝试登录或者联系管理员');
		        	// localStorage.clear();
		        	// window.location.href = './login'
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
	        pageDIV.style['margin-top']="0px";
	        // pageDIV.style['border']="1px solid #31bc91";
	        if(i<list.length-1)
	          pageDIV.style.pageBreakAfter="always";
	        var bmp=document.createElement('div');
	        var text = document.createElement('div');
	        var barCode=document.createElement('span');
	        barCode.style.display = 'inline-block';
	        barCode.style.width=stdW+'px';
	        barCode.style['padding-left']=margin+"px";
	        barCode.style['padding-right']=margin+"px";
	        barCode.style['padding-top']=margin+"px";
	        str = list[i];
	        $(bmp).barcode(str.exam_no, "code128",{barWidth:1, barHeight:30,showHRI:false,output:'bmp'});
	        var w=parseInt(bmp.style.width);
	        var wscale=stdW/w;
	        bmp.style.transform="scale("+wscale+",1)";
	        barCode.appendChild(bmp);
	        text.style['font-size'] = '8px';
	        text.innerText =gg+' '+ss+' '+str.name+' '+str.exam_no + ' ';
	        text.style['white-space']='nowrap';
	        text.style['padding-top']='6px';
	        barCode.appendChild(text);
	        var rowDIV=document.createElement('div');
	        rowDIV.style['margin-left']="auto";
	        rowDIV.style['margin-right']="auto";
	        rowDIV.style.width=(colNum*blockW)+'px';
	        rowDIV.style.height='67px';
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
  	var exam_id = $('.score-import-right #select-exam').attr('data-id');
  	var subject_id = $('.score-import-right #select-sujects').attr('data-id');
		if(exam_id&&subject_id!=0){
			$('.modal-main').animate({'top': '50%','opacity': 1},500);
			$('.modal-shadow').animate({'opacity': 0.3},500);
			$('.import-grade-wrap').show();
			get_score_info(exam_id,subject_id);
			$('.set-box').show();
		}
		if(subject_id==0){
			alert('请先选择科目');
		}
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
      	// window.location.href = './login'
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
      	// window.location.href = './login'
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
      	// window.location.href = './login'
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
	      	// window.location.href = './login'
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
      	// window.location.href = './login'
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

		var re = /^[\+\-]?\d*?\.?\d{0,1}$/;
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
      	// window.location.href = './login'
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
      	// window.location.href = './login'
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
				page_grade_all_list(data.total_entries,page_data_info,data);
      },
      error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login'
      }
	  });
  }



  function page_grade_all_list(nums,page_data_info,f_data){
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
				if(nums==1){
					show_grade_info(f_data);
				}
				if(nums>1){


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
				      	// window.location.href = './login';
					  }
					});
				}
	    }
	  });

  }

  function show_grade_info(info){
  	$('.scores-in-tabble tbody').html('');
  	for (var i = 0; i < info.import_scores.length; i++) {
  		var in_tr = '<tr data-id="'+info.import_scores[i].id+'" class="tr-'+info.import_scores[i].id+'" style="border-bottom:1px solid #ccc;"><td  class="test-name" data-id="'+info.import_scores[i].exam_id+'">'+info.import_scores[i].exam_name+'</td><td class="test-subject" data-id="'+info.import_scores[i].subject_id+'" exam_subject_id="'+info.import_scores[i].exam_subject_id+'">'+info.import_scores[i].subject_name+'</td><td colspan="3"><a href="javascript:;" class="determine set">设置</a><a href="javascript:;" class="deal">处理</a><a href="javascript:;" class="determine dele">删除</a></td><td>'+info.import_scores[i].updated_at+'</td><td>'+info.import_scores[i].operator_id+'</td><td><span class="status"></span></td></tr>';
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
      	// window.location.href = './login'
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
      	// window.location.href = './login'
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

	// 查看试卷结构
	// $('body').on('click','.look-button',function(){
	// 	$('.look-score-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
	// 	$('.look-score-wrap .modal-shadow').animate({'opacity': 0.3},500);
	// 	$('.look-score-wrap').show();
	// 	var exam_id = $('.score-import-right #select-exam').attr('data-id');
	// 	var subject_id = $('.score-import-right #select-sujects').attr('data-id');
	// 	get_score_info(exam_id,subject_id)
	// })

	function get_score_info(e_id,s_id){
		$.ajax({
	   	type: "GET",
	   	url: ajaxIp+"/api/v2/import_student_scores/edit_answer_each_score",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	data:{'exam_id':e_id,'subject_id':s_id},
	  	success: function(data){
	  		console.log(data,e_id,s_id);
	  		look_infos=data;
	  		show_scroe_group(data);
      },
      error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login'
      }
	  });
	}

	function show_scroe_group(item){
		$('.import-wrap .set-table tbody').html('');
		for (var i = 0; i < item.length; i++) {
			var set_li = '<tr class="item-tr-'+i+'"><td width="50%">'+item[i].answer_name+'</td><td width="30%">'+item[i].answer_item+'</td><td width="20%">'+item[i].score+'</td></tr>'
			$('.import-wrap .set-table tbody').append(set_li);
			if(!item[i].score){
				$('.item-tr-'+i+'').find('input').val('');
			}
		};
	}


	// 搜索考试名称
	$('.score-import-right #search-num').change(function() {
		var exam_name = $(this).val();
		console.log(exam_name)
		get_grade_all_list(["score_search",exam_name]);
	});
	$('.score-import-right .student-search-button').click(function(){
		$('.score-import-right #search-num').change();
	})
	// var look_infos;

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
		console.log(look_infos);
		var import_type;
		if(look_infos.length>0){
			import_type='half';
		}else{
			import_type='full';
		}
		console.log(import_type)
		var exam_id = $('.score-import-right #select-exam').attr('data-id');
		var subject_id = $('.score-import-right #select-sujects').attr('data-id');
		var formData = new FormData();
		formData.append("import_score_file",$("#inPaths")[0].files[0]);
		formData.append("exam_id",exam_id);
		formData.append("subject_id",subject_id);
		formData.append("import_type",import_type);
		var i_string = $('.import-grade-wrap #upfiles div').html();
		i_string_i = i_string.lastIndexOf(".");
		i_string = i_string.substring(i_string_i+1);
		if(i_string!='xlsx' && i_string!='xls'){
			alert('文件格式不对，请选择xlsx或者xls文件！')
		}
		console.log(exam_id,subject_id,formData)
		get_file_path(formData);
	});


	function get_file_path(formData){
		console.log(formData);
		if(formData){
			$.ajax({
		   	type: "POST",
		   	url: ajaxIp+"/api/v2/import_student_scores/import_excel",
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

  // 清空导入信息
  $('body').on('click', '.dele', function() {
  	$('.modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-shadow').animate({'opacity': 0.3},500);
		$('.modal-wrap-grade-dele').show();
		var import_score_id = $(this).parents('tr').attr('data-id');
		var exam_subject_id = $(this).parents('tr').find('.test-subject').attr('exam_subject_id');
		$('.modal-wrap-grade-dele').attr('data-id',import_score_id);
		$('.modal-wrap-grade-dele').attr('exam_subject_id',exam_subject_id);
  });

  // 确认清除
  $('body').on('click', '.modal-wrap-grade-dele .determine', function() {
  	var import_score_id = $(this).parents('.modal-wrap-grade-dele').attr('data-id');
  	var exam_subject_id = $(this).parents('.modal-wrap-grade-dele').attr('exam_subject_id');
  		$.ajax({
	   	type: "DELETE",
	   	url: ajaxIp+"/api/v2/import_student_scores/"+import_score_id+"",
	  	dataType: "JSON",
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	data:{'exam_subject_id':exam_subject_id},
	  	success: function(data){
	  		console.log(data);
	  		get_grade_all_list(null,null);
      },
      error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login'
      }
	  });
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
      	// window.location.href = './login'
      }
	  });
  }


  function show_item_group(item,import_score_id){
		$('.set-score-wrap .set-table tbody').html('');
		$('.set-score-wrap .set-table').attr('data-id',import_score_id);
		var total_num = $('.set-score-wrap').find('.total-num');
		// total_num.text('');
		var num=0;
		for (var i = 0; i < item.length; i++) {
			var set_li = '<tr class="parent-tr item-tr-'+i+'" data-id="'+item[i].answer_id+'"><td width="50%">'+item[i].answer_name+'<a href="javascript:;"><i class="iconfont bottom">&#xe622;</i><i class="iconfont up none">&#xe624;</i></a></td><td width="30%"><select name="" class="set-select"><option value="单选题">单选题</option><option value="多选题">多选题</option><option value="填空题">填空题</option><option value="是非题">是非题</option><option value="作文题">作文题</option><option value="其他题">其他题</option></select></td><td width="20%"><span data-id="'+item[i].answer_id+'">'+item[i].score+'</span></td></tr><tr class="child-tr none"><td colspan="3"><div class="child-box"><ul class="child-title"><li style="width:50%">题号</li><li style="width:30%">&nbsp;</li><li style="width:20%">总分值</li></ul><ul class="child-cont"></ul></div></td></tr>'
			$('.set-score-wrap .set-table tbody').append(set_li);
			if(!item[i].score){
				$('.item-tr-'+i+'').find('span').val('');
			}
			if(item[i].answer_item){
				var all_select = $('.item-tr-'+i+'').find('.set-select option');
				for (var j = 0; j < all_select.length; j++) {
					if(item[i].answer_item==$(all_select[j]).val()){
						$(all_select[j]).attr('selected',true);
					}
				};
			}
			num = num + parseFloat(item[i].score);
		};
		total_num.text(num);
		$($('.set-table input')[0]).focus();
		get_key_op('.set-score-wrap .set-table');
  }
	// 获取小题信息
	$('body').on('click', '.set-table tr a', function() {
		if (!$(this).children('.bottom').hasClass('none')) {
			$(this).children('.up').removeClass('none');
			$(this).children('.bottom').addClass('none');
		}else{
			$(this).children('.up').addClass('none');
			$(this).children('.bottom').removeClass('none');
		}
		var child_tr = $(this).parents('.parent-tr').next('.child-tr');
		// child_tr.toggle();
		if(child_tr.hasClass('none')){
			child_tr.removeClass('none');
			child_tr.siblings('.child-tr').addClass('none');
		}else{
			child_tr.addClass('none');
		}
		var parnt_info = $(this).parents('.parent-tr');
		var id = parnt_info.attr('data-id');
		if($(this).children('.bottom').hasClass('none')){

			get_item_info(id,parnt_info);
		}
	});


	// 获取小题分值
	function get_item_info(id,info){
		$.ajax({
		  type: "GET",
		  async: false,
		  url: ajaxIp+"/api/v2/import_student_scores/answer_settings_by_answer",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'answer_id':id},
		  success: function(data){
		  	console.log(data);
		  	show_item_info(data,info);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login';
		  }
		});
	}

	function show_item_info(item_info,parnt_info){
		console.log(parnt_info)
		parnt_info.next().find('.child-cont').html('');
		var item_info_length = item_info.length;
		for (var i = 0; i < item_info_length; i++) {
			var child_li = '<li class="child-li li-'+i+'" data-id="'+item_info[i].answer_setting_id+'"><div style="width:100%"><div class="item-name">'+item_info[i].num+'</div><div class="item-op">&nbsp;</div><div class="item-score"><input type="text" value="'+(item_info[i].score==null?0:item_info[i].score)+'" /></div></li>'
			parnt_info.next().find('.child-cont').append(child_li);
		};
	}

// [{
// 	answer_id: 1,
// 	item: ‘单选题’,
// 	answer_settings: [{
// 		answer_setting_id: 1,
// 		num: ‘2-1’,
// 		score: ‘2.0’
// 	}]
// }]


  // 设置题组总分
  $('body').on('click', '.set-score-wrap .determine', function() {
  	var import_score_id = $(this).parents('.set-score-wrap').find('.set-table').attr('data-id');
  	var answers = [];
  	var all_input = $(this).parents('.set-score-wrap').find('.set-table').find('.parent-tr');
  	for (var i = 0; i < all_input.length; i++) {
  		var obj = new Object();
  		obj['answer_id'] = $(all_input[i]).attr('data-id');
  		obj['answer_item'] = $(all_input[i]).find('.set-select').find('option:selected').val();
  		obj['answer_settings'] = [];
  		var next_child = $(all_input[i]).next().find('.child-cont li');
  		for (var j = 0; j < next_child.length; j++) {
  			var l_obj = new Object();
  			l_obj['answer_setting_id']=$(next_child[j]).attr('data-id');
  			l_obj['num']=$(next_child[j]).find('.item-name').text();
  			l_obj['score']=$(next_child[j]).find('input').val();
  			obj['answer_settings'].push(l_obj);
  		};
  		answers.push(obj);
  	};
  	var data_all = {'import_score_id':import_score_id,'answers':JSON.stringify(answers)};
  	
		var iD_if_null = false;
		for (var h = 0; h < $('.set-table input').length; h++) {
		 	if($('.set-table input')[h].value == "")
			 {
				 iD_if_null = true;
			 }
		};
		console.log(data_all)

  	if(!iD_if_null){
			$.ajax({
		   	type: "PATCH",
		   	url: ajaxIp+"/api/v2/import_student_scores/set_answers",
		  	dataType: "JSON",
		  	headers: {'Authorization': "Bearer " + isLogin},
		  	data:data_all,
		  	success: function(data){
		  		console.log(data);
	      },
	      error: function(){
	      	// alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login'
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
		
		var re = /^[\+\-]?\d*?\.?\d{0,1}$/;
		if(!re.test(str_score)){
			console.log(77)
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
	// 精度计算浮点数相加
	Math.formatFloat = function(f, digit) {
    var m = Math.pow(10, digit);
    return parseInt(f * m, 10) / m;
	}
	// alert(Math.formatFloat(numA + numB, 1) === 0.3);
	$('body').on('input', '.set-table .child-tr input', function() {
		var total = $(this).parents('.child-tr').prev().find('span');
		var value = parseFloat($(this).val());
		var siblings_input = $(this).parents('.child-li').siblings('li').find('input');
		var num =value;
		for (var i = 0; i < siblings_input.length; i++) {
			num=num+parseFloat($(siblings_input[i]).val());
		};
		total.text(Math.formatFloat(num,1));
		var parent_total = $(this).parents('.set-table').next().find('.total-num');
		parent_total.text('');
		var all_num = 0;
		var item = $(this).parents('.set-table').find('.parent-tr').find('span');
		for (var j = 0; j < item.length; j++) {
			all_num = all_num + parseFloat($(item[j]).text());
		};
		parent_total.text(all_num);
	});

	// 点击回车键进入下一个input,最后一个点击提交
	$('body').on('focus','.set-table input', function(){
		var that= this;
		$(document).unbind('keydown').keydown(function(event){
			if(event.keyCode == 13){
				if(that==$('input')[$('input').length-1]){
					if($(that).parents('.child-tr').next().hasClass('parent-tr')){
						console.log($(that).parents('.child-tr').next())
						$(that).parents('.child-tr').next().find('a').click();
						$($(that).parents('.child-tr').next().next().find('input')[0]).focus();
					}else{
						$('.set-score-wrap .determine').click();
					}
				}else{
					$(that).blur();
					$(that).parents('li').next().find('input').focus();
					$(that).parents('li').next().find('input').select();
				}
			}
		});
	})

	// 上下键功能
	function get_key_op(parent){
		// 上下左右键控制input
		var baseIndex = 100;
		$(parent).find(".child-li").each(function(r) {
			$(this).find(".item-score").each(function(c) {
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
		  	  var faye = new Faye.Client(fayeIp+'/api/v2/events');
			    faye.subscribe("/import_score/"+ customer_id +"" , function (data) {
		        console.log(222222);
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
	      	// window.location.href = './login'
	      }
		  });
	});


//mrzhao
  // 导入word试卷
  $('.import-word-button').on('click', function() {
		$('.import-word-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.import-word-wrap .modal-shadow').animate({'opacity': 0.3},500);
		$('.import-word-wrap').show();
		$('.import-word-wrap #paper-exam').html('');
		$('.import-word-wrap #paper-grade').html('<option value="0">全部年级</option>');
		// 获取所有年级
		$.ajax({
     	type: "GET",
     	url: ajaxIp+"/api/v2/commons/school_grades",
    	dataType: "JSON",
    	headers: {'Authorization': "Bearer " + isLogin},
    	success: function(data){
    		console.log(data)
  			for (var i = 0; i < data.length; i++) {
					var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
					$('.import-word-wrap #paper-grade').append(iOption);
					$('.import-word-wrap #paper-subject').html('<option value="0">全部科目</option>');
				}
       },
        error: function(){
        	// alert('请稍后从新尝试登录或者联系管理员');
        	// localStorage.clear();
        	// window.location.href = './login.html'
        }
    });

		
  });
	$('body').on('change', '#paper-subject', function() {
		// 获取可以绑定的考试科目列表
		var exam_type = $('#paper-type').val();
		var grade_id = $('#paper-grade').val();
		var subject_id = $('#paper-subject').val();
		if(grade_id!=0&&subject_id!=0){
			$.ajax({
		   	type: "POST",
		   	url: ajaxIp+"/api/v2/exam_subjects/doc_exam_subjects",
		  	dataType: "JSON",
		  	data:{'grade_id':grade_id,'subject_id':subject_id,'exam_type':exam_type},
		  	headers: {'Authorization': "Bearer " + isLogin},
		  	success: function(data){
		  		console.log(data);
		  		show_exams_list(data);
	      },
	      error: function(){
	      	// alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login'
	      }
		  });
	  }
	});

			// 显示考试列表
	function show_exams_list(exam){
		console.log(exam)
		var exam_length = exam.length;
		$('.import-word-wrap #paper-exam').html('');
		for (var i = 0; i < exam_length; i++) {
			var exam_option = '<option value="'+exam[i].exam_subject_id+'">'+exam[i].exam_name+'</option>';
			$('.import-word-wrap #paper-exam').append(exam_option);
		};
		if(exam.length>0){
			$('.import-word-wrap #paper-exam').attr('value',exam[0].id);
		}

		}
  // 根据年级获取科目
  $('.import-word-wrap #paper-grade').change(function(){
  	console.log(222)
  	$('.import-word-wrap #paper-subject').html('<option value="0">全部科目</option>');
		if($(this).val()!=0){
			$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/commons/grade_subjects",
	     	data:{'grade_id':$(this).val()},
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){
	    		console.log(data);
	    		for (var i = 0; i < data.length; i++) {
						var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
						$('.import-word-wrap #paper-subject').append(iOption);
					}
	      },
	      error: function(){
	        	// alert('请稍后从新尝试登录或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login.html'
	      }
	    });
		}else{
			// batch_export('.user-information-right',null);
			$('.import-word-wrap #paper-subject').html('<option value="0">全部科目</option>');
		}
	});





	// 确认导入试卷
	$('body').on('click', '.import-word-btn', function() {
		var formData = new FormData();
		formData.append("name",$("#inPathw")[0].files[0]);
		var i_string = $('#upfilew div').html();
		i_string_i = i_string.lastIndexOf(".");
		i_string = i_string.substring(i_string_i+1);
		console.log(i_string+'aaaaaaaaaaaaaaaaaaaa')
		console.log(formData)
		if(i_string!='docx' && i_string!='doc'){
			alert('文件格式不对，请选择docx或者doc文件！')
		}
		var grade_id = $('#paper-grade').val();
		var subject_id = $('#paper-subject').val();
		var exam_subject_id = $('#paper-exam').val();
		formData.append("exam_subject_id",exam_subject_id);
		formData.append("subject_id",subject_id);
		formData.append("grade_id",grade_id);
		console.log(grade_id,subject_id,exam_subject_id);
		get_word_info(formData,exam_subject_id);
		$('.import-word-wrap').hide();
	});

	function get_word_info (formData,exam_subject_id) {
		$.ajax({
	   	type: "POST",
	   	url: ajaxIp+"/api/v2/ddocxes?token=TOKEN",
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
				$('.load-bg').show();
			},
			error : function() {
				console.log("error");
			}
	  });
	}


	$('#inPathw').change(function(){
		console.log(22)
		inputFlileNamew()
	})

	function inputFlileNamew(){
		var file = $("#inPathw").val();
		var fileName = getFileName(file);
		$("#upfilew").html('未选择任何文件');
		function getFileName(o){
		    var pos=o.lastIndexOf("\\");
		    return o.substring(pos+1);
		}
		if(($("#upfilew div").length)==0){
			$("#upfilew").html('');
		}
		var iDiv = $('<div data-url='+file+'></div>')
		iDiv.text(fileName);
		// iDiv.data('url',file);
		iDiv.css({'display':'inline-block','color':'#666','background':'#dcf5f0','padding':'0 10px','height':'26px','border-radius':'2px','margin-right':'5px'});
		$('#upfilew').append(iDiv);

	}

	 // 获取试卷列表
	function get_all_word_exam(){
		var docx_id=25;
	 	$.ajax({
	   	type: "GET",
	   	// url: ajaxIp+"/api/v2/question_banks?docx_id="+docx_id+"",
	   	url: ajaxIp+"/api/v2/ddocxes",
	  	dataType: "JSON",
	  	data:{'limit':10,'page':1},
	  	headers: {'Authorization': "Bearer " + isLogin},
	  	success: function(data){
	  		console.log(data);
	  		// for (var i = 0; i < data.length; i++) {
	  		// 	var pp='<p>'+data[i].content+'</p>';
	  		// 	$('.word-import-right').append(pp);

	  		// };
	  		word_exam_list(data);
      },
      error: function(){
      	// alert('请稍后从新尝试登录或者联系管理员');
      	// localStorage.clear();
      	// window.location.href = './login'
      }
	  });
	}

	function word_exam_list(exam_info){
		var num = exam_info.length;
		var ii_num;
		console.log(num+'2222222222222222222222')
		if(num==0){
			ii_num=1;
		}else if(num>0 && num<10){
			ii_num=1;
		}else{
			ii_num=Math.ceil(num/10);
		}
		$.jqPaginator('#exams-pagination', {
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
				var iDataI = {'page':num, 'limit': 10};
				if(num==1){
					show_word_exam_list(exam_info)
				}
				if(num>1){
	        $.ajax({
			     	type: "GET",
			     	url: ajaxIp+"/api/v2/ddocxes",
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	data: iDataI,
			    	success: function(data){
			    		console.log(data)
			  			show_word_exam_list(data);
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

	function show_word_exam_list(exam_info){
		$('.words-in-tabble tbody').html('');
		if(exam_info){
			for (var i = 0; i < exam_info.length; i++) {
				var exam_tr='<tr style="border-bottom:1px solid #ccc;" docx_id="'+exam_info[i].docx_id+'" exam_subject_id="'+exam_info[i].exam_subject_id+'"><td>'+exam_info[i].exam_name+'</td><td>'+exam_info[i].exam_type_text+'</td><td>'+exam_info[i].grade_name+'</td><td>'+exam_info[i].subject_name+'</td><td><ul class="word-operation"><li><a href="javascript:;" class="a-btn look-btn look-paper-btn"><i class="iconfont">&#xe61e;</i>编辑试卷</a></li><li><a href="javascript:;" class="a-btn up-btn up-two-btn"><i class="iconfont">&#xe6a7;</i>上传双细</a></li><li><a href="javascript:;" class="a-btn look-two-btn">	<i class="iconfont">&#xe66d;</i>查看双细</a></li></ul><ul class="word-operation">	<li><a href="javascript:;" class="a-btn up-btn up-answer-btn">		<i class="iconfont">&#xe632;</i>上传答案</a>	</li>	<li><a href="javascript:;" class="a-btn look-btn look-answer-btn">		<i class="iconfont">&#xe683;</i>查看答案</a>	</li>	<li><a href="javascript:;" class="a-btn dele-btn"><i class="iconfont">&#xe616;</i>删除</a>	</li></ul></td></tr>';
				$('.words-in-tabble tbody').append(exam_tr);
			};
		}
	}









    //删除
      $('body').on('click', '.dele-btn', function(){
      	
     // $(this).parents('tr').remove();
     var id=$(this).parents('tr').attr("docx_id");
        $.ajax({
			     	type: "POST",
			     	url: ajaxIp+"/api/v2/ddocxes/delete",
			     	async:false,
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	data: {'id':id},
			    	success: function(data){
			    		
                           // $(".search-tabble").html(data);
			        },
			        error: function(){
			        	// alert();
			        }
			    });
        $.ajax({
			     	type: "GET",
			     	url: ajaxIp+"/api/v2/ddocxes",
			     	async:false,
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	success: function(data){
			    		console.log(data)
			  			show_word_exam_list(data);
			        },
			        error: function(){
			        	// alert('请稍后从新尝试登录或者联系管理员');
			        	// localStorage.clear();
			        	// window.location.href = './login.html'
			        }
			    });
      });


	// 编辑试卷
	 $('body').on('click', '.look-paper-btn', function() {
	 	var docx_id = $(this).parents('tr').attr('docx_id');
	 	var exam_subject_id = $(this).parents('tr').attr('exam_subject_id');
  	$(this).attr('href', 'edit_paper?docx_id=' + docx_id + '&exam_subject_id='+exam_subject_id+'');
  	console.log(99)

  });



})



















