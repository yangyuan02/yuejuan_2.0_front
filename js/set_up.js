$(function() {
	var isLogin = localStorage.getItem("token");
	var school_id;

	selectALl(null,null);
	selectGrades();

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
		var iDiv = $('<div></div>')
		iDiv.text(fileName);
		iDiv.css({'display':'inline-block','background':'#dcf5f0','padding':'0 10px','height':'26px','border-radius':'2px','margin-right':'5px'});
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
			$('#select-sujects').html('<option value="请选择科目">请选择科目</option>');
		}
		
	});

	$('#select-sujects').change(function(){
		if($(this).val()!=0 && $('#select-grade').val()!=0){
			var iData = [
				"grade_id",$('#select-grade').val(),
				"subject_id",$(this).val(),
			]
			selectALl(iData)
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
 		school_id = data[0].school.id;
 		// console.log(school_id)
 		// console.log(data)
 		$('.search-tabble tbody').html('');
 		for (var i = 0; i < data.length; i++) {
 			var iGreads = [];
			for (var j = 0; j < data[i].grades.length; j++) {
				iGreads[j] =data[i].grades[j].name
			}

			var iTr = '<tr style="border-bottom:1px solid #ccc;"><td>'+data[i].real_name+'</td><td style="width:140px">'+iGreads+'</td><td>'+(data[i].subject==undefined?"":data[i].subject.name)+'</td><td>'+data[i].email+'</td><td>'+data[i].phone+'</td><td>'+data[i].role+'</td><td class="table-modify"><span class="iconfont table-span">修改</span></td><td class="table-reset-password"><span class="iconfont table-span" data-id="'+data[i].id+'" data-name="'+data[i].real_name+'">重置密码</span></td><td class="table-delete iconfont"><span class="iconfont table-span" data-id="'+data[i].id+'" data-name="'+data[i].real_name+'">删除</span></td></tr>'
 			$('.search-tabble tbody').append(iTr)
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
			     	url: ajaxIp+"/api/v2/teachers/"+thatId+"/reset_password",
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	success: function(data){
			  			alert(data);
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
			     	url: ajaxIp+"/api/v2/teachers/"+thatId,
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	success: function(data){
			  			alert(data);
			        },
			        error: function(){
			        	// alert('请稍后从新尝试登录或者联系管理员');
			        	// localStorage.clear();
			        	// window.location.href = './login.html'
			        }
			    });
			})
		})

		
		$('.table-modify span').click(function(){
			$('.teachers-propmt-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
			$('.teachers-propmt-wrap .modal-shadow').animate({'opacity': .3},500);
			$('.teachers-propmt-wrap').show();

			$('.teachers-propmt-wrap .modal-title').text('删除老师');
			$('.teachers-propmt-wrap .small-type').text('删除');
			$('.teachers-propmt-wrap .small-prompt').text('删除后无法恢复');
			$('.teachers-propmt-wrap .small-xxx').text('');
			$('.reset-password-name').text($(this).data('name'));

			
			var thisId = $(this).data('id')
			$('.modal-wrap-small .determine').on('click', function(){
				$.ajax({
			     	type: "DELETE",
			     	url: ajaxIp+"/api/v2/teachers/"+thatId,
			    	dataType: "JSON",
			    	headers: {'Authorization': "Bearer " + isLogin},
			    	success: function(data){
			  			alert(data);
			        },
			        error: function(){
			        	// alert('请稍后从新尝试登录或者联系管理员');
			        	// localStorage.clear();
			        	// window.location.href = './login.html'
			        }
			    });
			})
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



















