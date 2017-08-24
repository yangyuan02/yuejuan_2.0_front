$(function(){
	var isLogin = localStorage.getItem("token");
	var height = $(window).height()-$('#header').height()-$('#footer').height()-180;
	$('.marking-box').css({
		// 'height': height,
		'min-height': height
	});
	$('.marking-change-box').css({
		'min-height': height
	})
	$('.paper-operation').css({
		'min-height': height
	})

	var all_width = ($(window).width()-1200)/4;
	$('.close').css('right', all_width);






	get_test_list();

	function get_test_list(){
		var page_data = {'page':1, 'limit': 10};
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/exam_subjects/reading_selection",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:page_data,
		  success: function(data){
		  	console.log(data);
		  	// show_test_info(data);
		  	console.log(data)
		  	page_test_list(data.total_count,data);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	}



	function page_test_list(nums,data){

		var ii_nums;
		// console.log(nums+'条数据')
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
				var page_data = {'page':nums, 'limit': 10, 'choice':true};

				$.ajax({
				  type: "GET",
				  url: ajaxIp+"/api/v2/exam_subjects/reading_selection",
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

	// <td class="test-on"> <p class="num">'+ test_info.exam_subjects[i].paper_revise_progress+'%</p><div class="bar"><div style="width:'+ test_info.exam_subjects[i].paper_revise_progress+'%;"></div></div></td><td class="test-num">'+ test_info.exam_subjects[i].answers_total_count+'</td>
  // 显示考试列表
	function show_test_info(test_info){
		var test_length = test_info.exam_subjects.length;
		$('#test-list-change tbody').html('');
		for (var i = 0; i < test_length; i++) {
			var tr_test ='<tr class="parent-tr p-'+i+'"><td class="test-name" width="320" exam-id="'+test_info.exam_subjects[i].exam_id+'" data-id="'+test_info.exam_subjects[i].exam_subject_id+'">'+ test_info.exam_subjects[i].name +'</td><td class="test-grade">'+ test_info.exam_subjects[i].grade_name +'</td><td class="test-subject">'+ test_info.exam_subjects[i].subject_name +'</td><td class="test-operation"><a href="javascript:;">显示题组<i class="iconfont bottom">&#xe622;</i><i class="iconfont up none">&#xe624;</i></a></td></tr><tr class="child-tr none"><td colspan="6"><div class="child-box"><ul class="child-title"><li>题组</li><li>阅卷进度</li><li>多评异常</li><li>问题试卷</li><li>生成日期</li><li></li></ul><ul class="child-cont"></ul></div></td></tr>';
			$('#test-list-change tbody').append(tr_test);
		};
		// 判断是老师时候，不显示阅卷
		console.log($('#role-name').val());
		var role_name = $('#role-name').val();
		if(role_name=="教师"){
			$('#yuejuan-link').next().hide();
			$('#yuejuan-link').hide();
		}
	}



	// 获取题组信息
	$('body').on('click', '.test-operation a', function() {
		if (!$(this).children('.bottom').hasClass('none')) {
			$(this).children('.up').removeClass('none');
			$(this).children('.bottom').addClass('none');
		}else{
			$(this).children('.up').addClass('none');
			$(this).children('.bottom').removeClass('none');
		}
		var child_tr = $(this).parents('.parent-tr').next('.child-tr');
		child_tr.toggle();
		// child_tr.show();
		// $(this).parents('.parent-tr').siblings('.parent-tr').next('.child-tr').hide();
		var parnt_info = $(this).parents('.parent-tr')
		var id = parnt_info.find('.test-name').attr('data-id');
		if($(this).children('.bottom').hasClass('none')){
			$.ajax({
			  type: "POST",
			  url: ajaxIp+"/api/v2/exam_subjects/answer_group_details_for_exam_subject",
			  headers: {'Authorization': "Bearer " + isLogin},
			  data:{'id':id},
			  success: function(data){
			  	console.log(data);
			  	show_item_info(data,parnt_info);
			  },
			  error: function(){
			      // alert('请稍后从新尝试登录或者联系管理员');
		      	// localStorage.clear();
		      	// window.location.href = './login.html';
			  }
			});
		}
	});


// 显示题组信息
// <div class="item-on">'+item_info[i].revise_progress+'</div><div class="more-num">'+item_info[i].multiple_error_count+'</div><div class="bug-num">'+item_info[i].issue_paper_count+'</div><div class="item-time">'+item_info[i].finish_date+'</div>
	function show_item_info(item_info,parnt_info){
		console.log(parnt_info)
		parnt_info.next().find('.child-cont').html('');
		var item_info_length = item_info.length;
		for (var i = 0; i < item_info_length; i++) {
			var child_li = '<li class="li-'+i+'"><div style="width:100%"><div class="item-name">'+item_info[i].name+'</div><div class="item-op" style="display:none">hhhhhh</div></div><div style="width:100%"><ul class="last-ul"></ul></div></li>'
			parnt_info.next().find('.child-cont').append(child_li);
			var item_last = item_info[i].section_crops;
			var item_last_length = item_last.length;
			console.log(item_last_length)
			if(item_last_length){
				parnt_info.next().find('.child-cont .li-'+i+'').children('.last-ul').html('');
				// $('.child-cont .li-'+i+'').children('.last-ul').html('');
				for (var j = 0; j < item_last_length; j++) {
					var item_li ='<li><div class="item-name" data-id="'+item_last[j].id+'">'+item_last[j].name+'</div><div class="item-on">'+item_last[j].revise_progress+'</div><div class="more-num">'+item_last[j].multiple_error_count+'</div><div class="bug-num">'+item_last[j].issue_paper_count+'</div><div class="item-time">'+item_last[j].finish_date+'</div><div class="item-op"><a href="javascript:;" class="mark-btn determine mark-'+item_last[j].id+'" data-status="'+item_last[j].examination+'">阅卷</a><a href="javascript:;" class="check-btn check-'+item_last[j].id+'" id="check-btn" data-status="'+item_last[j].reviewed+'">审核</a></div></li>';
				  parnt_info.next().find('.child-cont .li-'+i+'').find('.last-ul').append(item_li);
					// 判断是否有阅卷权限
					if(item_last[j].examination){
						$('.mark-'+item_last[j].id+'').show();
					}else{
						// console.log('.mark-'+item_last[j].id+'')
						$('.mark-'+item_last[j].id+'').hide();
					}
					// 判断是否有审核权限
					if(item_last[j].reviewed){
						$('.check-'+item_last[j].id+'').show();
					}else{
						// console.log('.check-'+item_last[j].id+'')
						$('.check-'+item_last[j].id+'').hide();
					}
				};
			}
			

		};
	}



	// 阅卷相关功能
	var s_c_id;
	var s_c_i_id;
	var a_settings=[];
	var s_i_id;
	var e_s_id;
	var current_index;
	$('body').on('click', '.mark-btn', function() {
		$(this).parents('#wrap').siblings('.marking-paper-box').show();
		$(this).parents('#wrap').hide();
		// 获取题组信息ID,name
		var section_crop_id = $(this).parent().parent().find('.item-name').attr('data-id');
		var section_crop_name = $(this).parent().parent().find('.item-name').text();
		get_info_request(section_crop_id,section_crop_name,null);
		get_paper_info(section_crop_id);
		
	});


	// 获取试卷总数信息
	var total_paper;
	function get_paper_info(id){
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/section_crop_images/total_page",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'section_crop_id':id},
		  success: function(data){
		  	console.log(data);
		  	total_paper=data.total_count;
		  	console.log(total_paper)
		  	$('.all-paper').text(data.total_count);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});

	}

	// 获取当前试卷所有信息
	function get_info_request(id,name,index){
		if(index!==null){
			var data_value = {'section_crop_id':id,'index':index};
			console.log(data_value)
		}else{
			var data_value = {'section_crop_id':id};
		}
		$.ajax({
		  type: "GET",
		  async:false,
		  url: ajaxIp+"/api/v2/section_crop_images/get_section_crop_image",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:data_value,
		  success: function(data){
		  	console.log(data);
		  	console.log(data.ok=="完成阅卷！")
		  	if(data.ok=="完成阅卷！"){
		  		var cur_index = parseInt($('.finished').text());
		  		get_info_request(id,name,cur_index);
		  	}else{
		  		s_c_id = data.section_crop_id;
			  	s_c_i_id = data.section_crop_image_id;
			  	a_settings = [];
			  	if(data.answer_settings){
			  		for (var i = 0; i < data.answer_settings.length; i++) {
			  			a_settings.push(data.answer_settings[i]);
			  		};
			  	}
			  	console.log(a_settings);
			  	s_i_id = data.scanner_image_id;
			  	e_s_id = data.exam_subject_id;
			  	current_index = data.finished_count;
			  	show_img_info(data,name,index);
		  	}
		  	
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});

	}



	// 显示阅卷图片
	function show_img_info(img_info,section_crop_name,index){
		$('.move-paper').html('');
		if(section_crop_name){
			var img_url = img_info.section_crop_image_uri;
			var img_id = img_info.section_crop_image_id;
			var img_html = '<img data-id="'+img_id+'" id="img-'+img_id+'" src="'+ ajaxIp +''+img_url+'">';
		}
		$('.move-paper').append(img_html);
			console.log(total_paper)
			if(img_info.personal){
				$('.move-paper img').css({
					'width': img_info.personal.paper_data_width+'px',
					'height': img_info.personal.paper_data_height+'px'
				});
			}
	
			$('.on-num').text(img_info.index);
		// }else{
		// 	$('.on-num').text(img_info.finished_count);
		// }//当前第几份试卷
		// console.log($('.all-paper').text())
		// if(img_info.finished_count==parseInt($('.all-paper').text())){
		// 	$('.on-num').text(img_info.finished_count);
		// }
		

		// 显示批注信息
		
		if(img_info.mark){
			console.log(img_info.mark);
			var mark_infos = img_info.mark;
			$('.move-paper img').after('');
			for (var z = 0; z < mark_infos.length; z++) {
				mark_infos[z].x = mark_infos[z].x * mark_infos[z].moveWidth;
				mark_infos[z].y = mark_infos[z].y * mark_infos[z].moveHeight;
				var mark_info = '<div class="oMoveInDiv'+z+' popline_text popline_text_div iconfont" style="left: '+mark_infos[z].x+'px; top: '+mark_infos[z].y+'px; position: absolute; cursor: pointer; color: rgb(255, 0, 0); margin-left: -15px; margin-top: -15px; font-size: 24px; display: block;" data-type="'+mark_infos[z].type+'"></div>'
				$('.move-paper img').after(mark_info);
				$('.oMoveInDiv'+z+'').draggable();
				if(mark_infos[z].type=='ok'){
					$('.oMoveInDiv'+z+'').html('&#xe619;')
				}
				if(mark_infos[z].type=='error'){
					$('.oMoveInDiv'+z+'').html('&#xe61b;')
				}
				if(mark_infos[z].type=='input'){
					var input_info = '<input style="width:'+mark_infos[z].inputWidth+'px;height:'+mark_infos[z].inputHeight+'px;" value="'+mark_infos[z].text+'">';
					$('.oMoveInDiv'+z+'').html(input_info);
					$('.oMoveInDiv'+z+'').removeClass('popline_text_div');
					$('.oMoveInDiv'+z+'').css({
						'marginTop': 0,
						'marginLeft': 0
					});
				}
			};
		}



		$('.paper-item-name').text(section_crop_name);//题组名称
		$('.paper-item-name').attr('section_crop_id',img_info.section_crop_id);
		$('.paper-item-name').attr('exam_subject_id',img_info.exam_subject_id);
		$('.paper-item-name').attr('scanner_image_id',img_info.scanner_image_id);
		$('.paper-item-name').attr('current_page',img_info.current_page);
		//改卷模式
		if(img_info.pattern){
			$('.mark-model').text('得分模式');
		}else{
			$('.mark-model').text('扣分模式');
		}
		$('.finished').text(img_info.finished_count);
		console.log(img_info.examination_teacher_name)
		if(img_info.examination_teacher_name){
			$('.pop-1').find('span').text(img_info.examination_teacher_name);
		}else{
			var user_name = $('#teacher-name').val();
			$('.pop-1').find('span').text(user_name);
		}
		// $('.pop-1').find('span').text(img_info.teacher_name);
		// 显示题号
		$('#p-table tbody').html('');
		var answer_settings = img_info.answer_settings;
		if(answer_settings){
			var answer_settings_length = answer_settings.length;
			for (var i = 0; i < answer_settings_length; i++) {
				var item_tr = '<tr><td class="item-num">'+answer_settings[i].num+'</td><td class="input-p"><input type="text" class="yuejuan_score" data-id="'+answer_settings[i].answer_setting_score_id+'" value="'+answer_settings[i].answer_setting_score+'" data-num = "'+answer_settings[i].num+'" data-fen="'+answer_settings[i].total_score+'"></td><td class="all-grade">'+answer_settings[i].total_score+'分</td></tr>';
				$('#p-table tbody').append(item_tr);
				$($('.yuejuan_score')[0]).focus();
			};
		}
		

	}

  // 显示原试卷
 $('body').on('click','.show-pre',function(){
  	$(this).addClass('hide-pre').removeClass('show-pre');
  	$(this).text('隐藏原试卷');
		var exam_subject_id = $('.paper-item-name').attr('exam_subject_id');
		var scanner_image_id = $('.paper-item-name').attr('scanner_image_id');
		var current_page = $('.paper-item-name').attr('current_page');
		get_pre_info_request(exam_subject_id,scanner_image_id,current_page);
  })
  $('body').on('click','.hide-pre',function(){
  	$(this).addClass('show-pre').removeClass('hide-pre');
  	$(this).text('显示原试卷');
		var section_crop_id = $('.paper-item-name').attr('section_crop_id');
		var section_crop_name = $('.paper-item-name').text();
		var index = parseInt($('.on-num').text());
		console.log($('.finished').text())
		console.log(section_crop_id,section_crop_name,index)
		if($('.yuejuan_score').val()){
			get_info_request(section_crop_id,section_crop_name,index);
		}else{
			get_info_request(section_crop_id,section_crop_name,null);
		}
  })

  function get_pre_info_request(exam_subject_id,scanner_image_id,current_page){
		var data_value = {'exam_subject_id':exam_subject_id,'scanner_image_id':scanner_image_id,'current_page':current_page};
  	$.ajax({
		  type: "GET",
		  async:false,
		  url: ajaxIp+"/api/v2/section_crop_images/scanner_image",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:data_value,
		  success: function(data){
		  	console.log(data);
		  	show_pre_img(data);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});

  }

  function show_pre_img(pre_img){
		$('.move-paper').html('');
		var img_url = pre_img.scanner_image_uri;
		var img_html = '<img  src="'+ ajaxIp +''+img_url+'">';
		$('.move-paper').append(img_html);
		console.log(pre_img.section_crops.length)
		var section_crops = pre_img.section_crops;
		var paper_width = $('.move-paper img').width();
		var paper_height = $('.move-paper img').height();
		console.log(paper_width,paper_height);
		for (var i = 0; i < section_crops.length; i++) {
			section_crops[i].position.width =(section_crops[i].position.width/section_crops[i].position.w)*paper_width;
			section_crops[i].position.height =(section_crops[i].position.height/section_crops[i].position.h)*paper_height;
			section_crops[i].position.x =(section_crops[i].position.x/section_crops[i].position.w)*paper_width;
			section_crops[i].position.y =(section_crops[i].position.y/section_crops[i].position.h)*paper_height;
			console.log(section_crops[i].position.width)
			var section_info = '<div class="section_crop" style="background:#fff;width:'+section_crops[i].position.width+'px; height:'+section_crops[i].position.height+'px;position:absolute;left:'+section_crops[i].position.x+'px;top:'+section_crops[i].position.y+'px"></div>'
			$('.move-paper').append(section_info);
		};
  }



	// 返回试卷
	$('.back-paper').click(function(){
		var section_crop_id = $('.paper-item-name').attr('section_crop_id');
		var section_crop_name = $('.paper-item-name').text();
		var finished_count = parseInt($('.finished').text());
		var all_count = parseInt($('.all-paper').text());
		console.log(finished_count,all_count)
		if(finished_count==all_count){
			alert('试卷已经改完');
			get_info_request(section_crop_id,section_crop_name,finished_count);
		}else{
			get_info_request(section_crop_id,section_crop_name);
		}
	})

	// 第一卷
	$('.show-first').click(function(){
		if($('.on-num').text()!=1){
			var index = 1;
			var section_crop_id = $('.paper-item-name').attr('section_crop_id');
			var section_crop_name = $('.paper-item-name').text();
			get_info_request(section_crop_id,section_crop_name,index);
		}else{
			alert("已经是第一张试卷了");
		}
	})

  // 上一试卷
  $('#pre').click(function(){
  	var index = parseInt($('.on-num').text())-1;
  	console.log(index)
  	if(index!=0){
			var section_crop_id = $('.paper-item-name').attr('section_crop_id');
			var section_crop_name = $('.paper-item-name').text();
			get_info_request(section_crop_id,section_crop_name,index);
			$('.on-num').text(index);
  	}else{
			alert("已经是第一张试卷了")
		}
  })

  // 下一试卷
  $('#next').click(function(){
  	console.log(current_index)
  	var index = parseInt($('.on-num').text())+1;
  	var all_num = parseInt($('.all-paper').text());
  	console.log(index,all_num)
  	if(index <= current_index){
			var section_crop_id = $('.paper-item-name').attr('section_crop_id');
			var section_crop_name = $('.paper-item-name').text();
			get_info_request(section_crop_id,section_crop_name,index);
  	}else if(index-1<all_num){
			alert("不能选择未批改的试卷，请点击返回试卷");
		}
		if(index-1==all_num){
			alert('已经是最后一张试卷')
		}
  })

  // 提交问题试卷
  $('.show-error').click(function(){
  	var name = $('.paper-item-name').text();
		a_settings.answer_setting_score;
		var input_value = $('#p-table tbody').children().find('.yuejuan_score');
		console.log(input_value)
		var input_length = input_value.length;
		for (var i = 0; i < input_length; i++) {
			var value = $(input_value[i]).val();
			a_settings[i].answer_setting_score=value;
		};
		console.log(a_settings);

		var coordinateArr = [];
		var dataNum = $('.move-paper .popline_text').length
		var dataInput = $('.move-paper input');
		var dataMove = $('.move-paper img');
		console.log($('.move-paper .popline_text').length);
		
		for (var j = 0; j < dataNum; j++) {
			console.log(dataNum)
			coordinateArr[j] = {};
			coordinateArr[j]['x'] = $($('.move-paper .popline_text')[j]).position().left/dataMove.width();
			coordinateArr[j]['y'] = $($('.move-paper .popline_text')[j]).position().top/dataMove.height();
			coordinateArr[j]['moveWidth'] = dataMove.width();
			coordinateArr[j]['moveHeight'] = dataMove.height();
			if($($('.move-paper .popline_text')[j]).find('input').val()!=undefined){
				// console.log($('.move-paperInDiv'+i).find('input').val())
				coordinateArr[j]['inputWidth'] = $($('.move-paper .popline_text')[j]).find('input').width();
				coordinateArr[j]['inputHeight'] = $($('.move-paper .popline_text')[j]).find('input').height();
				coordinateArr[j]['text'] = $($('.move-paper .popline_text')[j]).find('input').val();
				coordinateArr[j]['type'] = 'input';
			}else if($($('.move-paper .popline_text')[j]).data('type') == 'ok'){
				coordinateArr[j]['type'] = 'ok';
			}else if($($('.move-paper .popline_text')[j]).data('type') == 'error'){
				coordinateArr[j]['type'] = 'error';
			}
			
		}
		// console.log(coordinateArr);
		// $('.saveData').val(JSON.stringify(coordinateArr));
		// oMoveNum = 0;
		console.log(coordinateArr)



		// 最终数据
		var data_value={
			'section_crop_id': s_c_id,
			'section_crop_image_id': s_c_i_id,
			'answer_settings': a_settings,
			'scanner_image_id': s_i_id,
			'exam_subject_id': e_s_id,
			'mark':coordinateArr,
			'blur':true
		}



		$.ajax({
		  type: "POST",
		  url: ajaxIp+"/api/v2/section_crop_images/manual_mark",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:data_value,
		  success: function(data){
		  	console.log(data);
		  	get_info_request(s_c_id,name);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});


  })

	// 提交打分
	$('.con-btn').click(function(){
		var name = $('.paper-item-name').text();
		a_settings.answer_setting_score;
		var input_value = $('#p-table tbody').children().find('.yuejuan_score');
		console.log(input_value)
		var input_length = input_value.length;
		for (var i = 0; i < input_length; i++) {
			var value = $(input_value[i]).val();
			a_settings[i].answer_setting_score=value;
		};
		console.log(a_settings);

		var coordinateArr = [];
		var dataNum = $('.move-paper .popline_text').length
		var dataInput = $('.move-paper input');
		var dataMove = $('.move-paper img');
		console.log($('.move-paper .popline_text').length);
		for (var j = 0; j < dataNum; j++) {
			console.log(dataNum)
			coordinateArr[j] = {};
			coordinateArr[j]['x'] = $($('.move-paper .popline_text')[j]).position().left/dataMove.width();
			coordinateArr[j]['y'] = $($('.move-paper .popline_text')[j]).position().top/dataMove.height();
			coordinateArr[j]['moveWidth'] = dataMove.width();
			coordinateArr[j]['moveHeight'] = dataMove.height();
			if($($('.move-paper .popline_text')[j]).find('input').val()!=undefined){
				// console.log($('.move-paperInDiv'+i).find('input').val())
				coordinateArr[j]['inputWidth'] = $($('.move-paper .popline_text')[j]).find('input').width();
				coordinateArr[j]['inputHeight'] = $($('.move-paper .popline_text')[j]).find('input').height();
				coordinateArr[j]['text'] = $($('.move-paper .popline_text')[j]).find('input').val();
				coordinateArr[j]['type'] = 'input';
			}else if($($('.move-paper .popline_text')[j]).data('type') == 'ok'){
				coordinateArr[j]['type'] = 'ok';
			}else if($($('.move-paper .popline_text')[j]).data('type') == 'error'){
				coordinateArr[j]['type'] = 'error';
			}
			
		}
		// console.log(coordinateArr);
		// $('.saveData').val(JSON.stringify(coordinateArr));
		// oMoveNum = 0;
		console.log(coordinateArr)

		var paper_data_width = $('.move-paper img').width();
		var paper_data_height = $('.move-paper img').height();

		console.log(paper_data_width,paper_data_height)

		// 最终数据
		var data_value={
			'section_crop_id': s_c_id,
			'section_crop_image_id': s_c_i_id,
			'answer_settings': a_settings,
			'scanner_image_id': s_i_id,
			'exam_subject_id': e_s_id,
			'mark':coordinateArr,
			'personal':{paper_data_width,paper_data_height}
		}
		var a = parseInt($('.on-num').text());
		var b = parseInt($('.all-paper').text());
		console.log(a,b);

		var iD_if_null = false;
		for (var h = 0; h < $('.yuejuan_score').length; h++) {
		 	if($('.yuejuan_score')[h].value == "")
			 {
				 iD_if_null = true;
			 }
		};


		if(!iD_if_null){
			$('.load-bg').show();
			$.ajax({
			  type: "POST",
			  url: ajaxIp+"/api/v2/section_crop_images/manual_mark",
			  headers: {'Authorization': "Bearer " + isLogin},
			  data:data_value,
			  success: function(data){
			  	console.log(data);
			  	if(data){
			  		$('.load-bg').hide();
			  	}
			  	console.log(a_settings[0].answer_setting_score_id);
			  	if(a<b &&a_settings[0].answer_setting_score_id==null){
			  		get_info_request(s_c_id,name);
			  	}
			  	if(a_settings[0].answer_setting_score_id){
			  		alert('修改成功');
			  	}
			  	if(a==b){
			  		if(a_settings[0].answer_setting_score_id){
			  			alert('修改成功');
			  			alert('试卷已经批改完毕');
			  		}else{
			  			alert('试卷已经批改完毕');
			  			var index = parseInt($('.all-paper').text());
			  			get_info_request(s_c_id,name,index);
			  		}
			  	}
			  },
			  error: function(){
			      // alert('请稍后从新尝试登录或者联系管理员');
		      	// localStorage.clear();
		      	// window.location.href = './login.html';
			  }
			});
		}else{
      alert('请输入得分后再提交');
		}
	})





	// 阅卷相关详情
	var aBigH = 18;//默认输入框高度
	var bMoveL = false;
	var coordinateArr =[];
	var oMoveNum = $('.move-paper input').length;//标志变量，长度取决批注数量
	var inputDiv = $('.popline_text');//输入框div
	var prompt_1 = '提示：您所给的分数不在规定范围内，请看清分值给分！';
	var prompt_i = $('#i_two');//提示框元素
	var prompt_2 = '提示：您所给的分数不合法，请输入合法分数！';


	// 关闭试卷
	$('.marking-paper-box .close').click(function() {
		$(this).parents('.marking-paper-box').siblings('#wrap').show();
		$(this).parents('.marking-paper-box').hide();
	});
	// 试卷拖拽
	$('.move-paper').draggable();
	// 试卷放大缩小
	//放大
  $('.big').click(function(){
  	console.log(99)
    var img_width = $('.move-paper img').width();
    var img_height = $('.move-paper img').height();
    oMoveNum = $('.move-paper .popline_text').length;
   	zoomIn(img_width,img_height,true);

		console.log(img_height)
    if(oMoveNum<=0){
			console.log(oMoveNum);
			return;
		}else{
			console.log(oMoveNum);
			console.log(img_height)
			poplineText2(img_height,true);
		}
  });
  //缩小
  $('.small').click(function(){
    var img_width = $('.move-paper img').width();
    var img_height = $('.move-paper img').height();
    oMoveNum = $('.move-paper .popline_text').length;
		zoomIn(img_width,img_height,false);


    if(oMoveNum<=0){
			console.log(oMoveNum);
			return;
		}else{
			poplineText2(img_height,false);
		}
  });


  function zoomIn(img_width,img_height,ch){
		if(ch){
			img_width = img_width * 1.02;
	    img_height = img_height * 1.02;
	    $('.move-paper img').css({
	      "width":img_width + 'px',
	      "height":img_height + 'px'
	    });


	     // 区域块放大
	    var select_area = $('.move-paper .section_crop');
	    for(var i=0;i<= select_area.length-1;i++){
	      var width = $(select_area[i]).width();
	      var height = $(select_area[i]).height();
	      var left_value = $(select_area[i]).position().left;
	      var top_value = $(select_area[i]).position().top;
	      width = width * 1.02;
	      height = height * 1.02;
	      left_value = left_value * 1.02;
	      top_value = top_value * 1.02;
	      $(select_area[i]).css({
	        "width": width + 'px',
	        "height": height + 'px',
	        "left": left_value + 'px',
	        "top": top_value + 'px'
	      })
	    }



		}else{
			img_width = img_width / 1.02;
	    img_height = img_height / 1.02;
	    $('.move-paper img').css({
	      "width":img_width + 'px',
	      "height":img_height + 'px'
	    });



	    //区域块缩小
	    var select_area = $('.move-paper .section_crop');
	    for(var i=0;i<= select_area.length-1;i++){
	      var width = $(select_area[i]).width();
	      var height = $(select_area[i]).height();
	      var left_value = $(select_area[i]).position().left;
	      var top_value = $(select_area[i]).position().top;
	      width = width / 1.02;
	      height = height / 1.02;
	      left_value = left_value / 1.02;
	      top_value = top_value /1.02;
	      $(select_area[i]).css({
	        "width": width + 'px',
	        "height": height + 'px',
	        "left": left_value + 'px',
	        "top": top_value + 'px'
	      });
	    }
		}
  }





  //作文排版
	// var oMoveShowHide = false
	// $('#article-count').on('click',function(){
	// 	$('.oMove_hide').toggleClass('oMoveShowHide')
	// 	if($('.oMove_hide').hasClass('oMoveShowHide')){
	// 		console.log(oMoveShowHide)
	// 	}
	// 	var zuowen = $(".oMove_3").position();
	// 	var zuowen_x = $(".oMove_3").height()+zuowen.top;
	// 	var zuowen_y = zuowen.left-$(".oMove_3").width()/2;
	// 	$(".oMove_2").css({
	// 		'top':zuowen_x+'px',
	// 		'left':zuowen_y+'px'
	// 	});

	// });

	// 全屏显示
	$('.all-screen').click(function(){
		var docElm = document.documentElement;
		//W3C
		if (docElm.requestFullscreen) {
		    docElm.requestFullscreen();
		}
		//FireFox
		else if (docElm.mozRequestFullScreen) {
		    docElm.mozRequestFullScreen();
		}
		//Chrome等
		else if (docElm.webkitRequestFullScreen) {
		    docElm.webkitRequestFullScreen();
		}
		//IE11
		else if (elem.msRequestFullscreen) {
			elem.msRequestFullscreen();
		}
	})


	// 批注列表可拖动
	$('.popline').draggable();
	// 点击批注，列表显示或隐藏
	$('#pizhu').on('click',function(){
		if ($(this).hasClass('text-color')) {
			$(this).removeClass('text-color');
		}else{
			$(this).addClass('text-color');
		}
		$('.move-paper .popline_text').unbind('click');
		$('.popline_hover_0').removeClass('popline_hover');
		$('.move-paper').unbind('click');
		if ($('.popline').css('display') == 'none') {
			$('.popline').show();
		} else {
			$('.popline').hide();
		}
	});



	// 点击评分统计
	$('#score-count').on('click', function() {
		$(this).addClass('text-color');
		$('.modal-main').animate({'top': '40%','opacity': 1},500);
		$('.modal-shadow').animate({'opacity': 0},500);
		$('#score-list').show();
		var section_crop_id = $('.paper-item-name').attr('section_crop_id');
		get_score_statistics(section_crop_id);
	});
	$('#score-list .modal-exit').on('click', function() {
		$('#score-count').removeClass('text-color');
	});




	function get_score_statistics(section_crop_id){
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/section_crop_images/score_statistics",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'section_crop_id':section_crop_id},
		  success: function(data){
		  	console.log(data);
		  	show_score_statistics(data);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
  }



  function show_score_statistics(score_info){
		$('#score-list').find('.score-table tbody').html('');
		for (var i = 0; i < score_info.length; i++) {
			var score_tr = '<tr><td>'+score_info[i].num+'</td><td>'+score_info[i].max_score+'</td><td>'+score_info[i].min_score+'</td><td>'+score_info[i].avg_score+'</td><td>'+score_info[i].variance+'</td></tr>';
			$('#score-list').find('.score-table tbody').append(score_tr);
		};
  }



	// 点击批注列表


	$('.popline_hover_0').on('click',function(){
		$('.popline_hover_0').removeClass('popline_hover');
		$(this).addClass('popline_hover');
		$('.move-paper .popline_text').unbind('click');

		var iVal = $(this).data('action');

		if(iVal == 'text'){

			$('.move-paper').unbind('click').bind('click' , function(event){
				if($('.move-paper .popline_text').length>19){
					alert('最多20个');
					return;
				}

				var iThis = $(this);
				var event = event || window.event;
				var onInputDivX = event.pageX - iThis.offset().left;

				var onInputDivY = event.pageY - iThis.offset().top;

				if(bMoveL){
					coordinateArr = [];
					oMoveNum = 0;

					bMoveL = false;
				}

				oMoveInDiv = creatInput(iThis,onInputDivX,onInputDivY);

				onInputDivX = onInputDivX/$('.move-paper img').width();
				onInputDivY = onInputDivY/$('.move-paper img').height();
				// oMoveInDiv.children('span').html(onInputDivX + ',' + onInputDivY);
				var inputInp = oMoveInDiv.children('input');

				oMoveInDiv.show();
				inputInp.focus();
				inputInp.focus(function(){
					$('.move-paper').unbind('click');
				});
				inputInp.blur(function(){
					console.log('ioioiioi')
					$('.move-paper').unbind('click').bind('click');
				})
				poplineText(inputInp,oMoveInDiv);
				


				coordinateArr[oMoveNum] = {'x' : onInputDivX , 'y' : onInputDivY,'type' : 'input'};

				$(oMoveInDiv).draggable();//批注
				oMoveNum++;
				// $('.move-paper').unbind('click');
			});
			$('.popline_text').bind('click' , function(){
				$('.move-paper').unbind('click');
				$('.popline_text').unbind('click');
			});


		}else if(iVal == 'ok'){
			$('.move-paper').unbind('click').bind('click' , function(event){
				if($('.move-paper .popline_text').length>19){
					alert('最多20个');
					return;
				}
				ok = '&#xe619;';
				var iThis = $(this);
				var event = event || window.event;
				var onInputDivX = event.pageX - iThis.offset().left;

				var onInputDivY = event.pageY - iThis.offset().top;

				if(bMoveL){
					coordinateArr = [];
					console.log(coordinateArr)
					oMoveNum = 0;

					bMoveL = false;
				}

				oMoveInDiv = creatOkError(iThis,onInputDivX,onInputDivY,ok);
				onInputDivX = onInputDivX/$('.move-paper img').width();
				onInputDivY = onInputDivY/$('.move-paper img').height();
				oMoveInDiv.attr('data-type','ok');
				oMoveInDiv.show();



				coordinateArr[oMoveNum] = {'x' : onInputDivX , 'y' : onInputDivY, 'type' : 'ok'};

				$(oMoveInDiv).draggable();//批注
				oMoveNum++;
			});
		}else if(iVal == 'error'){
			$('.move-paper').unbind('click').bind('click' , function(event){
				if($('.move-paper .popline_text').length>19){
					alert('最多20个');
					return;
				}
				ok = '&#xe61b;';
				var iThis = $(this);
				var event = event || window.event;
				var onInputDivX = event.pageX - iThis.offset().left;

				var onInputDivY = event.pageY - iThis.offset().top;

				if(bMoveL){
					coordinateArr = [];
					oMoveNum = 0;

					bMoveL = false;
				}

				oMoveInDiv = creatOkError(iThis,onInputDivX,onInputDivY,ok);
				onInputDivX = onInputDivX/$('.move-paper img').width();
				onInputDivY = onInputDivY/$('.move-paper img').height();
				oMoveInDiv.attr('data-type','error');
				oMoveInDiv.show();



				coordinateArr[oMoveNum] = {'x' : onInputDivX , 'y' : onInputDivY, 'type' : 'error'};
				console.log(coordinateArr[oMoveNum])
				$(oMoveInDiv).draggable();//批注a
				oMoveNum++;
			});
		}else if(iVal == 'delete'){
			$('.move-paper').unbind('click');
			$('.move-paper .popline_text').click(function(){
				$(this).remove();
			});
			// oMoveNum=0;ss
		}else{
			$('.move-paper').unbind('click');
		}
	});


  //批注输入框生成
	function creatInput(iThis,onInputDivX,onInputDivY){
		var aInputDiv = inputDiv.clone(true);
		oMoveNum = $('.move-paper .popline_text').length;
		// oMoveNum = $('.oMove input').length;
		console.log(oMoveNum)
		var oMoveDivNum = 'oMoveInDiv'+oMoveNum;
		aInputDiv.addClass(oMoveDivNum);
		var oMoveDiv = $(oMoveDivNum);
		iThis.append(aInputDiv);
		var oMoveInDiv = $('.move-paper .'+oMoveDivNum);
		var inputInp = oMoveInDiv.children('input');
		inputInp.css({'width':'10px'});
		oMoveInDiv.css({
			'left':onInputDivX+'px',
			'top':onInputDivY-10+'px',
			'border-left':'20px solid rgba(255,0,0,.2)'
		});
		return oMoveInDiv;
	}

	function creatOkError(iThis,onInputDivX,onInputDivY,ok){
		console.log(onInputDivX,onInputDivY,ok)
		var aInputDiv = document.createElement('div');
		aInputDiv = $(aInputDiv);
		// aInputDiv.css({'font-size':20,'height':'50px','width':'50px','background':'red'});
		oMoveNum = $('.move-paper .popline_text').length;
		console.log(oMoveNum);
		var oMoveDivNum = 'oMoveInDiv'+oMoveNum;
		aInputDiv.addClass(oMoveDivNum);

		aInputDiv.addClass('popline_text');
		aInputDiv.addClass('popline_text_div');
		aInputDiv.addClass('iconfont');
		aInputDiv.html(ok);
		var oMoveDiv = $(oMoveDivNum);
		iThis.append(aInputDiv);
		var oMoveInDiv = $('.move-paper .'+oMoveDivNum);
		var inputInp = oMoveInDiv.children('input');
		// inputInp.css({'width':'10px'});
		oMoveInDiv.css({
			'left':onInputDivX+'px',
			'top':onInputDivY-10+'px',
			'position':'absolute',
			'cursor':'pointer',
			'color':'red',
			// 'background':'blue',
			'margin-left':'-15px',
			'margin-top':'-15px',
			'font-size':'24px'
		});
		return oMoveInDiv;
	}

		//批注文字
	function poplineText(iInput,iDiv){
		var textWidth = function(text){
			var mNum = $('.move-paper input').length;
			if(mNum>0){
				aBigH = $('.move-paper input').css('fontSize');
			}
      var sensor = $('<pre>1'+ text +'</pre>').css({display: 'none','font-size':aBigH});
      iDiv.append(sensor);
      var width = sensor.width();
      	  console.log(width)

      sensor.remove();
      return width;
	  };
    iInput.on('input', function(){
        $(this).css('width',textWidth($(this).val()));
    });
	}


	//批注文字放大缩小
	function poplineText2(img_height,dx){
		var popIn = $('.move-paper input');
		aBigH = popIn.height()*($('.move-paper img').height()/img_height);
		var iiii = $('.popline_text');
		for(var i=0 ; i <= iiii.length-1 ; i++){
			var xx = $('.oMoveInDiv'+i).position().left;
			var yy = $('.oMoveInDiv'+i).position().top;
			if(dx){
				xx=xx*1.02;
				yy=yy*1.02;
				$('.oMoveInDiv'+i).css({
					left: xx + 'px',
					top: yy + 'px'
				});
			}else{
				xx=xx/1.02;
				yy=yy/1.02;
				$('.oMoveInDiv'+i).css({
					left: xx + 'px',
					top: yy + 'px'
				});
			}
		}
		// console.log(aBigH)

		popIn.height(aBigH+'px');

		popIn.css({
			'height': aBigH+'px',
			'line-height':aBigH+'px',
			'font-size':aBigH+'px'
		});
		var textWidth2 = function(text){
	  	var sensor2 = $('<pre>1'+ text +'</pre>').css({display: 'none','line-height':aBigH+'px','font-size':aBigH-4+'px'});
      $('.oMoveInDiv0').append(sensor2);
      var width2 = sensor2.width();
      sensor2.remove();
      return width2;
	  };
    for (var i = 0; i < $('.move-paper input').length; i++) {
    	$('.oMoveInDiv'+i+' input').css('width',textWidth2($('.oMoveInDiv'+i+' input').val()));
    }
	}


	// 判分框拖动
  $('.yuejuan-pop').draggable();
	$('.pop-key-board').draggable();

  	// 点击批注，列表显示或隐藏
	$('#keyboard').on('click',function(){
		if ($(this).hasClass('text-color')) {
			$(this).removeClass('text-color');
		}else{
			$(this).addClass('text-color');
		}
		$('.pop-key-board').toggle();
	});
	$('.key-close').click(function() {
		$(this).parents('.pop-key-board').hide();
		$('#keyboard').removeClass('text-color');
	});





//小键盘
	var i_on_blur=999;
	$('body').on('blur', '.yuejuan_score', function() {
		console.log(1);
		i_on_blur = $(this);
		console.log(i_on_blur)
		// i_on_blur.val('');
	});

	$('.key-btn').unbind('click').click(function(){
		// console.log(111);
		if(i_on_blur == 999){
			console.log(i_on_blur);

			return;
		}

		var iNum = parseFloat($(this).attr('data-number'));
		console.log(iNum)
		var score = i_on_blur.val();
		if(score != '' && iNum == 0.5){
			score=parseFloat(score)+0.5;
		}else if(iNum == 'k11' || iNum == 'k22'){
			return;
		}else{
			if(score==0 && iNum==0){
				score=0;
			}else if(score==0 && iNum!=0){
				score=iNum;
			}else{
				score=iNum;
			}
			// score+=iNum;
		}
		console.log(score)
		i_on_blur.val(score);
		var fen = i_on_blur.attr('data-fen');
		var num = i_on_blur.attr('data-num');
		if(isNaN(score) || score>fen || score < 0 && score!=''){
			iTwo(prompt_i,prompt_1);
			i_on_blur.val('');

		}
	});

	$('.key-btn_1').on('click',function(){
		console.log(i_on_blur)
		var inputs = $(".pop-2").find(".yuejuan_score");
 		var idx = inputs.index(i_on_blur);
 		if(idx==0){
 			return;
 		}
 		i_on_blur = $(inputs[idx-1]);
 		console.log(i_on_blur.val());

 		i_on_blur.focus();
 		i_on_blur.select();
	});
	$('.key-btn_2').on('click',function(){
		var inputs = $(".pop-2").find(".yuejuan_score");
 		var idx = inputs.index(i_on_blur);
 		if(idx==inputs.length-1){
 			return;
 		}
 		i_on_blur = $(inputs[idx+1]);
 		console.log(i_on_blur.val());

 		i_on_blur.focus();
 		i_on_blur.select();
	});

		//分数判定
	$('body').on('input' , '.yuejuan_score', function(){
		var str_score = $(this).val();

		var fen = parseFloat($(this).attr('data-fen'));
		var score = parseFloat($(this).val());
		console.log(score,fen)

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

	// 点击回车键进入下一个input,最后一个点击提交
	$('body').on('focus','.yuejuan_score', function(){
		var that= this;
		$(document).unbind('keydown').keydown(function(event){
			if(event.keyCode == 13){
				if(that==$('.yuejuan_score')[$('.yuejuan_score').length-1]){
					$('.con-btn').click();
				}else{
					$(that).blur();
					$(that).parents('tr').next().find('.yuejuan_score').focus();
				}
			}
		})
	})


	//显示提示框
	function iTwo(i,k){
		$('.modal-main').animate({'top': '30%','opacity': 1},500);
		$('.modal-shadow').animate({'opacity': 0},500);
		i.show();
		$('.prompt').text(k);
		setTimeout(function(){
			$('#i_two').hide();
		},1000);
	};








	// 审核页面相关功能
	$('body').on('click', '#check-btn', function() {
		$('.check-paper-box').show();
		$('#wrap').hide();
		var section_crop_id = $(this).parent().parent().find('.item-name').attr('data-id');
		$('.check-paper-box').attr('section_crop_id',section_crop_id);
		var paper_type = 2;
		get_check_info(section_crop_id,paper_type);

	});





	function get_check_info(id,type){
		console.log(id)
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/section_crop_images/review_paper",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'section_crop_id':id,'type':type},
		  dataType: "JSON",
		  success: function(data){
		  	console.log(data);
		  	show_check_info(data);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	}

	var text_list;//第一个老师的阅卷信息
	var reviewed_teacher_name;
	function show_check_info(check_info){

		// 原阅卷老师信息仅供查看，不可修改

		$('.check-pop').css({
			'opacity': .5,
			'cursor': 'not-allowed'
		});
		$('#check-btns').css({'cursor': 'not-allowed'});
		$('#check-btns').siblings().css({'cursor': 'not-allowed'});





		reviewed_teacher_name = check_info.reviewed_teacher_name;
		$('.check-paper').html('');
		var img_id = check_info.section_crop_image_id;
		var img_url = check_info.section_crop_image_uri;
		var check_img = '<img data-id="'+img_id+'" id="img-'+img_id+'" src="'+ ajaxIp +''+img_url+'">';
		$('.check-paper').append(check_img);
		if(!img_id){
			$('.check-paper').html('').append('<div style="background:#fff;color:#fd97a3;font-size:16px;line-height:400px;text-align:center;vertical-align: middle;">试卷已经审核完毕</div>');
			$('.check-pop').hide();
			$('.check-teacher-pop').hide();
		}else{
			$('.check-pop').show();
			$('.check-teacher-pop').show();
		}

		// 已经处理数目
		$('.on-check').text(check_info.treated);
		// 未处理数目
		$('.off-check').text(check_info.untreated);


		$('.check-teacher-list').attr('student_info_id',check_info.student_info_id);

		// 阅卷老师名字
		var section_crop_info = check_info.section_crop_images;
		// console.log(section_crop_info.length);
		$('.check-teacher-list').html('');
		$('#check-table tbody').html('');
		$('.grade-th').remove();
		var b_input=[];//分值input
		// 获取每位老师的阅卷分数
		if(section_crop_info && section_crop_info.length > 0){
			for (var j = 0; j < section_crop_info.length; j++) {
				var grade_th = '<th class="grade-th grade-th-'+j+'">分值</th>';
				$('.num-th').after(grade_th);
				var teacher_name = '<a><span>阅卷老师:</span><span class="check-teacher" data-id="'+section_crop_info[j].examination_teacher_id+'">'+section_crop_info[j].customer_name+'</span></a>';
				$('.check-teacher-list').append(teacher_name);
				// 审核题目信息
				text_list = section_crop_info[0].answer_setting_scores;
				var check_item_infos = section_crop_info[j].answer_setting_scores;
				for (var z = 0; z < check_item_infos.length; z++) {
					var td_input='<td class="input-p"><input data-id="'+check_item_infos[z].answer_setting_score_id+'" disabled style="width:45px" type="text" class="yuejuan_score" value="'+check_item_infos[z].answer_setting_score+'"/></td>';
					b_input.push(td_input);
				};
			};
		}
		
		// console.log(text_list)
		// console.log(b_input)
		// 根据第一个老师获取题号信息和总分值信息
		if(text_list && text_list.length>0){
			for (var m = 0; m < text_list.length; m++) {
				var text_info = '<tr><td class="item-num" dta-id="'+text_list[m].answer_setting_id+'">'+text_list[m].num+'</td>'+b_input+'<td class="all-grade">'+text_list[m].total_score+'</td></tr>';
				$('#check-table tbody').append(text_info);
			};
		}
		



		// 获取审核信息框的高度
		var pp_height = $('.check-pop').height()+100;
		console.log(pp_height)
		$('.check-teacher-pop').css({
			'top': pp_height+'px',
		});

		// 获取审核老师的信息
		console.log(text_list);
		$('.checkd-teacher').text(reviewed_teacher_name);
		$('#check-teacher-table tbody').html('');
		if(text_list && text_list.length>0){
			for (var i = 0; i < text_list.length; i++) {
				var item_tr = '<tr><td class="item-num" data-id="'+text_list[i].answer_setting_id+'">'+text_list[i].num+'</td><td class="input-p"><input type="text" class="yuejuan_score" data-fen="'+text_list[i].total_score+'" /></td><td class="all-grade">'+text_list[i].total_score+'</td></tr>';
				$('#check-teacher-table').append(item_tr);
			};
		}
		var score_infos = check_info.answer_setting_scores;

		if(score_infos && score_infos.length>0){
			$('#check-teacher-table tbody').html('');
			for (var n = 0; n < score_infos.length; n++) {
				var score_info = '<tr><td class="item-num" data-id="'+score_infos[n].answer_setting_id+'">'+score_infos[n].num+'</td><td class="input-p"><input type="text" class="yuejuan_score" value="'+score_infos[n].score+'" data-fen="8"></td><td class="all-grade">'+score_infos[n].total_socre+'</td></tr>';
				$('#check-teacher-table tbody').append(score_info);
			};


		}
	}



	// 审核提交
	$('body').on('click', '#last-check-btn', function() {

		var section_crop_id = $('.check-paper-box').attr('section_crop_id');
		var section_crop_image_id = $('.check-paper img').attr('data-id');
		var student_info_id = $('.check-teacher-list').attr('student_info_id');
		var answer_setting_scores=[];
		var answer_obj = new Object();
		var input_info = $(this).parent().siblings('#check-teacher-table').find('.yuejuan_score');
		for (var i = 0; i <input_info.length; i++) {
			var itme_id = $(input_info[i]).parent().prev().attr('data-id');
			var input_value = $(input_info[i]).val();
			answer_obj['answer_setting_id'] = itme_id;
			answer_obj['score'] = input_value;
			answer_setting_scores[i] = answer_obj;
		};
		console.log(answer_setting_scores)

		var data_all ={
			'section_crop_id':section_crop_id,
			'student_info_id':student_info_id,
			'answer_setting_scores':answer_setting_scores
		}
		console.log(data_all)

		if(answer_obj['score'] != ""){
			$.ajax({
			  type: "PATCH",
			  url: ajaxIp+"/api/v2/section_crop_images/"+section_crop_image_id+"/decision",
			  headers: {'Authorization': "Bearer " + isLogin},
			  data:data_all,
			  dataType: "JSON",
			  success: function(data){
			  	console.log(data);
			  	var type = $('.change-paper-type').val();
			  	$('.no-deal').addClass('on').siblings('.on-deal').removeClass('on');
			  	if($('.off-check').text()==1){
			  		alert('审核试卷完毕');
			  		var deal_type;
						var type_id = $('.change-paper-type').val();
						if(type_id==2){
							deal_type=3;
						}
						if(type_id==4){
							deal_type=5;
						}
						var paper_index;
						var on_deal_total = parseInt($('.on-check').text());
						paper_index = on_deal_total;
			  		get_deal_paper(section_crop_id,deal_type,paper_index);

			  	}
			  	get_check_info(section_crop_id,type);
			  },
			  error: function(){
			      // alert('请稍后从新尝试登录或者联系管理员');
		      	// localStorage.clear();
		      	// window.location.href = './login.html';
			  }
			});
		}else{
			alert('请输入得分后再提交');
		}

	});

	// 试卷类型选择事件
	$('.change-paper-type').on('change', function() {
		var type_id = $(this).val();
		var section_crop_id = $('.check-paper-box').attr('section_crop_id');
		get_check_info(section_crop_id,type_id);
		$('.no-deal').addClass('on').siblings('.on-deal').removeClass('on');
		$('.check-num-list').hide();

	});


	// 第一卷
	$('.check-show-first').on('click',function() {
		var deal_type;
		var type_id = $('.change-paper-type').val();
		if(type_id==2){
			deal_type=3;
		}
		if(type_id==4){
			deal_type=5;
		}
		var section_crop_id = $('.check-paper-box').attr('section_crop_id');
		var index = 1;
		if($('.check-on-num').text()==1){
			alert('已经是第一张试卷了')
		}else{
			$('.check-on-num').text(index);
			get_deal_paper(section_crop_id,deal_type,index);
		}
	});
		// 上一卷
	$('#check-pre').on('click',function() {
		var deal_type;
		var type_id = $('.change-paper-type').val();
		if(type_id==2){
			deal_type=3;
		}
		if(type_id==4){
			deal_type=5;
		}
		var section_crop_id = $('.check-paper-box').attr('section_crop_id');
		var index = parseInt($('.check-on-num').text())-1;
		if(index==0){
			alert('已经是第一张试卷了')
		}else{
			$('.check-on-num').text(index);
			get_deal_paper(section_crop_id,deal_type,index);
		}
	});

		// 下一卷
	$('#check-next').on('click',function() {
		var deal_type;
		var type_id = $('.change-paper-type').val();
		if(type_id==2){
			deal_type=3;
		}
		if(type_id==4){
			deal_type=5;
		}
		var section_crop_id = $('.check-paper-box').attr('section_crop_id');
		var index = parseInt($('.check-on-num').text())+1;
		var all = parseInt($('.on-check').text());
		if(index==all+1){
			alert('已经是最后一张试卷了')
		}else{
			$('.check-on-num').text(index);
			get_deal_paper(section_crop_id,deal_type,index);
		}
	});





	// 返回审核
	$('.check-back-paper').on('click',function() {
		var type_id = $('.change-paper-type').val();
		var section_crop_id = $('.check-paper-box').attr('section_crop_id');
		get_check_info(section_crop_id,type_id);
	});




	// 关闭试卷
	$('.check-paper-box .close').click(function() {
		$(this).parents('.check-paper-box').siblings('#wrap').show();
		$(this).parents('.check-paper-box').hide();
	});

	// 处理未处理切换
	$('.check-ul li').click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		var section_crop_id = $('.check-paper-box').attr('section_crop_id');
		// 获取试卷类型
		var deal_type;
		var type_id = $('.change-paper-type').val();
		if(type_id==2){
			deal_type=3;
		}
		if(type_id==4){
			deal_type=5;
		}
		if($(this).hasClass('on-deal')){
			$('.check-num-list').show();
			$('.check-pop').show();
			$('.check-teacher-pop').show();
			var paper_index;
			var on_deal_total = parseInt($('.on-check').text());
			if(on_deal_total>0){
				paper_index = on_deal_total;
				$('.check-on-num').text(paper_index);
				get_deal_paper(section_crop_id,deal_type,paper_index);

			}else{
				alert('还未开始处理试卷，请处理相关试卷！');
				$('.no-deal').addClass('on').siblings('.on-deal').removeClass('on');
				$('.check-num-list').hide();
			}

		}else{
			$('.check-num-list').hide();
			get_check_info(section_crop_id,type_id);
		}
	})

	// 获取处理试卷信息
	function get_deal_paper (id,type,index) {
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/section_crop_images/reviewed_paper",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'section_crop_id':id,'type':type,'index':index},
		  dataType: "JSON",
		  success: function(data){
		  	console.log(data);
		  	show_check_info(data);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	}



	// 解锁试卷弹出框
	$('body').on('click', '#article-count', function() {
		if ($(this).hasClass('text-color')) {
			$(this).removeClass('text-color');
		}else{
			$(this).addClass('text-color');
		}
		$('.modal-main').css('width', '765px');
		$('.modal-main').animate({
			'top': '50%',
			'opacity': 1
		}, 500);
		$('.modal-shadow').animate({
			'opacity': .3
		}, 500);
		$('#key-paper').show();

	});

	$('body').on('click', '.key-closed', function() {
		$('#article-count').removeClass('text-color');
	});

	$('body').on('click', '.confirm-key', function() {
		$('#article-count').removeClass('text-color');
		var section_crop_id = $('.paper-item-name').attr('section_crop_id');
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



})