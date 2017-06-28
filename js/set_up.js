$(function() {
	var isLogin = localStorage.getItem("token");
	var school_id;
	// var school_grades_array = [];

	selectALl(null,null);
	students_selectALl(null,null);
	selectGrades();
	batch_export();
	// schoolGrades();
	$('#inPath').change(function(){
		inputFlileName()
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

	


	$('.batch-import').click(function(){
		console.log(1)
		$('.import-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.import-wrap .modal-shadow').animate({'opacity': .3},500);
		$('.import-wrap').show();
	});

	$('.search-button').click(function(){
		if($('.search-input').val()!='')
			console.log(1)
		selectALl(["keyword", $('.search-input').val()])
	})


	$('#select-grade').change(function(){
		if($(this).val()!=0){
			selectSubjects($(this).val());
			selectALl(["grade_id",$(this).val()])
		}else{
			selectALl(null,null);
			$('#select-sujects').html('<option value="0">全部科目</option>');
		}
		
	});

	$('#select-sujects').change(function(){
		if($(this).val()!=0 && $('#select-grade').val()!=0){
			var iData = [
				"grade_id",$('#select-grade').val(),
				"subject_id",$(this).val(),
			]
			selectALl(iData)
		}else if($(this).val()==0 && $('#select-grade').val()!=0){
			selectSubjects($(this).val());
			selectALl(["grade_id",$(this).val()])
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
		$.jqPaginator('#pagination', {
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
	

	function selectGrades(){
		$.ajax({
	     	type: "GET",
	     	url: ajaxIp+"/api/v2/commons/school_grades",
	    	dataType: "JSON",
	    	headers: {'Authorization': "Bearer " + isLogin},
	    	success: function(data){
	  			selectGradesList(data);
	        },
	        error: function(){
	        	// alert('请稍后从新尝试登录或者联系管理员');
	        	// localStorage.clear();
	        	// window.location.href = './login.html'
	        }
	    });
	}

	function selectGradesList(data){
		for (var i = 0; i < data.length; i++) {
			var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
			$('#select-grade').append(iOption);
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
	  			selectSubjectsList(data);
	        },
	        error: function(){
	        	alert('请稍后从新尝试登录或者联系管理员');
	        	localStorage.clear();
	        	window.location.href = './login.html'
	        }
	    });
	}

	function selectSubjectsList(data){
		$('#select-sujects').html('<option value="请选择科目">请选择科目</option>');
		for (var i = 0; i < data.length; i++) {
			var iOption = '<option value="'+data[i].id+'">'+data[i].name+'</option>'
			$('#select-sujects').append(iOption);
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

		$('.add-teacher').click(function(){
			$('.teachers-propmt-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
			$('.teachers-propmt-wrap .modal-shadow').animate({'opacity': .3},500);
			$('.teachers-propmt-wrap').show();

			$('.teachers-propmt-wrap .modal-title').text('新增老师');
			$('.teachers-propmt-wrap #teachers-name').val('');
			$('.teachers-propmt-wrap #teachers-email').val('');
			$('.teachers-propmt-wrap #teachers-number').val();
			$('.teachers-propmt-wrap #teachers-role').val('');
		})
		
		$('.table-modify span').click(function(){
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
		    		console.log(data.phone)
					$('.teachers-propmt-wrap #teachers-name').val(data.real_name);
					$('.teachers-propmt-wrap #teachers-email').val(data.email);
					$('.teachers-propmt-wrap #teachers-number').val(data.phone);
					$('.teachers-propmt-wrap #teachers-role').val(data.role);
					// $('.teachers-propmt-wrap #teachers-subject').val(data.subject.name);
					$('.teachers-propmt-wrap #teachers-grade').val(data.grades.name);
					iDataGrades = data.grades;
					console.log(iDataGrades)
					$('#teachers-grade').text('')
					
					$.ajax({
				     	type: "GET",
				     	url: ajaxIp+"/api/v2/commons/school_grades",
				    	dataType: "JSON",
				    	headers: {'Authorization': "Bearer " + isLogin},
				    	success: function(data){
							if(data.length == iDataGrades.length){
								var thisDiv='<div class="allNew newTeacher newTeacherBack">全部<i class="iconfont gradesname" style="position:absolute;right:10px;top:0;">&#xe619;</i></div>';
							}else{
								var thisDiv='<div class="allNew newTeacher">全部<i class="iconfont gradesname" style="position:absolute;right:10px;top:0;">&#xe619;</i></div>';
							}
				    		
				    		console.log(iDataGrades.length)
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
				    				console.log('ccccccccc')
									$('.allNew').addClass('newBack');
				    			}else{
				    				$('.allNew').removeClass('newBack');
				    			}
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
				    		})
				        }
				    });


		        },
		    });

		})
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

		$('.add-teacher').click(function(){
			$('.teachers-propmt-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
			$('.teachers-propmt-wrap .modal-shadow').animate({'opacity': .3},500);
			$('.teachers-propmt-wrap').show();

			$('.teachers-propmt-wrap .modal-title').text('新增老师');
			$('.teachers-propmt-wrap #teachers-name').val('');
			$('.teachers-propmt-wrap #teachers-email').val('');
			$('.teachers-propmt-wrap #teachers-number').val();
			$('.teachers-propmt-wrap #teachers-role').val('');
		})
		
		$('.table-modify span').click(function(){
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
		    		console.log(data.phone)
					$('.teachers-propmt-wrap #teachers-name').val(data.real_name);
					$('.teachers-propmt-wrap #teachers-email').val(data.email);
					$('.teachers-propmt-wrap #teachers-number').val(data.phone);
					$('.teachers-propmt-wrap #teachers-role').val(data.role);
					// $('.teachers-propmt-wrap #teachers-subject').val(data.subject.name);
					$('.teachers-propmt-wrap #teachers-grade').val(data.grades.name);
					iDataGrades = data.grades;
					console.log(iDataGrades)
					$('#teachers-grade').text('')
					
					$.ajax({
				     	type: "GET",
				     	url: ajaxIp+"/api/v2/commons/school_grades",
				    	dataType: "JSON",
				    	headers: {'Authorization': "Bearer " + isLogin},
				    	success: function(data){
							if(data.length == iDataGrades.length){
								var thisDiv='<div class="allNew newTeacher newTeacherBack">全部<i class="iconfont gradesname" style="position:absolute;right:10px;top:0;">&#xe619;</i></div>';
							}else{
								var thisDiv='<div class="allNew newTeacher">全部<i class="iconfont gradesname" style="position:absolute;right:10px;top:0;">&#xe619;</i></div>';
							}
				    		
				    		console.log(iDataGrades.length)
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
				    				console.log('ccccccccc')
									$('.allNew').addClass('newBack');
				    			}else{
				    				$('.allNew').removeClass('newBack');
				    			}
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
				    		})
				        }
				    });


		        },
		    });

		})
 	}

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
})



















