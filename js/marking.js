$(function(){
	var isLogin = localStorage.getItem("token");
	var height = $(window).height()-$('#header').height()-$('#footer').height()-180;
	$('.marking-box').css({
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
		  	console.log(data)
		  	page_test_list(data.total_count,data);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login';
		  }
		});
	}



	function page_test_list(nums,f_data){
		console.log(f_data)
		var ii_nums;
		if(nums==0){
			ii_nums=1;
		}else if(nums>0 && nums<10){
			ii_nums=1;
		}else{
			ii_nums=Math.ceil(nums/10);
		}
		console.log(ii_nums)
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
	    	console.log(nums)
				var page_data = {'page':nums, 'limit': 10, 'choice':true};
				if(nums==1){
					show_test_info(f_data);
				}
				if(nums>1){
					$.ajax({
					  type: "GET",
					  url: ajaxIp+"/api/v2/exam_subjects/reading_selection",
					  headers: {'Authorization': "Bearer " + isLogin},
					  data:page_data,
					  success: function(data){
					  	console.log(data);
					  	show_test_info(data);
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
		var parnt_info = $(this).parents('.parent-tr')
		var id = parnt_info.find('.test-name').attr('data-id');
		if($(this).children('.bottom').hasClass('none')){
			get_item_info(id,parnt_info);
		}
	});

	function get_item_info(id,parnt_info){
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
	      	// window.location.href = './login';
		  }
		});
	}

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
						$('.mark-'+item_last[j].id+'').hide();
					}
					// 判断是否有审核权限
					if(item_last[j].reviewed){
						$('.check-'+item_last[j].id+'').show();
					}else{
						$('.check-'+item_last[j].id+'').hide();
					}
					// 如果是审核老师权限，但是没有阅卷权限，则阅卷进度不显示
					if(item_last[j].reviewed && !item_last[j].examination){
						$('.check-'+item_last[j].id+'').parents('tr').find('.item-on').hide();
						$('.check-'+item_last[j].id+'').parents('.child-cont').prev().children().eq(1).hide();
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
	var parent_infos;
	$('body').on('click', '.mark-btn', function() {
		$(this).parents('#wrap').siblings('.marking-paper-box').show();
		$(this).parents('#wrap').hide();
		parent_infos = $(this).parents('.child-tr').prev('.parent-tr');
		var id = parent_infos.find('.test-name').attr('data-id');
		$(this).parents('#wrap').siblings('.marking-paper-box').attr('data-id',id);
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
	      	// window.location.href = './login';
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
		  	if(data.ok){
		  		alert(data.ok);
		  	}
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
			  	if(data.exam_subject_id){
				  	s_i_id = data.scanner_image_id[0];
				  	e_s_id = data.exam_subject_id;
				  	current_index = data.finished_count;
				  	show_img_info(data,name,index);
			  	}
		  	}
		  	
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login';
		  }
		});

	}



	// 显示阅卷图片
	function show_img_info(img_info,section_crop_name,index){
		$('.move-paper').html('');
		if(section_crop_name){
			console.log(section_crop_name)
			var img_url = img_info.section_crop_image_uri;
			var img_id = img_info.section_crop_image_id;
			if(img_url){
				for (var ww = 0; ww < img_url.length; ww++) {
					var img_html = '<img data-id="'+img_id+'" style="transform: rotate(0deg); transform-origin: 50% 50% 0px;" id="img-'+img_id+'" src="'+ ajaxIp +''+img_url[ww]+'">';
					$('.move-paper').append(img_html);
				};
			}
		}
			console.log(total_paper)
			if(img_info.personal){
				$('.move-paper img').css({
					'width': img_info.personal.paper_data_width+'px',
					'height': img_info.personal.paper_data_height+'px'
				});
			}
	
			$('.on-num').text(img_info.index);
		

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
		// 显示题号
		$('#p-table tbody').html('');
		var answer_settings = img_info.answer_settings;
		if(answer_settings){
			var answer_settings_length = answer_settings.length;
			for (var i = 0; i < answer_settings_length; i++) {
				var item_tr = '<tr><td class="item-num">'+answer_settings[i].num+'</td><td class="input-p"><input type="text" class="yuejuan_score" data-id="'+answer_settings[i].answer_setting_score_id+'" value="'+answer_settings[i].answer_setting_score+'" data-num = "'+answer_settings[i].num+'" data-fen="'+answer_settings[i].total_score+'"></td><td class="all-grade" data-all="'+answer_settings[i].total_score+'">'+answer_settings[i].total_score+'分</td></tr>';
				$('#p-table tbody').append(item_tr);
			};
			$($('.yuejuan_score')[0]).focus();
			get_key_op('#p-table');
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
	      	// window.location.href = './login';
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
		var imgSrc = $(".move-paper img").attr("src");
		// var paper_height;
		getImageWidth(imgSrc,function(w,h){
			var ww=w;
			var hh=h;
			console.log(ww,hh)
			var pp = 697/ww*hh;
			console.log(pp)
			var paper_height =pp;

		var paper_width = $('.move-paper img').width();
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
		});
  }
	function getImageWidth(url,callback){
		var img = new Image();
		img.src = url;
		// 如果图片被缓存，则直接返回缓存数据
		if(img.complete){
		    callback(img.width, img.height);
		}else{
          // 完全加载完毕的事件
    	img.onload = function(){
				callback(img.width, img.height);
    	}
    }
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
		$('.hide-pre').removeClass('hide-pre').addClass('show-pre').text('显示原试卷');
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
			$('.hide-pre').removeClass('hide-pre').addClass('show-pre').text('显示原试卷');
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
			$('.hide-pre').removeClass('hide-pre').addClass('show-pre').text('显示原试卷');
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
			$('.hide-pre').removeClass('hide-pre').addClass('show-pre').text('显示原试卷');
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
		  	get_info_request(s_c_id,name);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login';
		  }
		});


  })

	// 全对
	$('#all-right').click(function(){
		var all_total_list = $('#p-table').find('.input-p .yuejuan_score');
		for (var i = 0; i < all_total_list.length; i++) {
			var all_total_value = $(all_total_list[i]).attr('data-fen');
			// console.log(i+'----',all_total_value)
			$(all_total_list[i]).val(all_total_value);
		};
		$($('.yuejuan_score')[all_total_list.length-1]).focus();
	})
	// 全错
	$('#all-error').click(function(){
		var all_total_list = $('#p-table').find('.input-p .yuejuan_score');
		var all_total_value = 0;
		for (var i = 0; i < all_total_list.length; i++) {
			$(all_total_list[i]).val(all_total_value);
		};
		$($('.yuejuan_score')[all_total_list.length-1]).focus();
	})

	// 提交打分
	$('.con-btn').click(function(){
		var name = $('.paper-item-name').text();
		a_settings.answer_setting_score;
		var input_value = $('#p-table tbody').children().find('.yuejuan_score');
		console.log(input_value,a_settings.length)
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
		var a = parseInt($('.finished').text());
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
		      	// window.location.href = './login';
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
		var id = $('.marking-paper-box').attr('data-id');
		get_item_info(id,parent_infos)
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

  // 左旋转
  var left_value;
  $('.left-roa').click(function(){
  	var obj=$('.move-paper img');
  	var deg=eval('get'+obj.css('transform'));//构造getmatrix函数,返回上次旋转度数
  	console.log(obj.css('transform'),deg);
  	if(deg!=0){
			left_value=deg-1;
  	}else{
			left_value=359;
  	}
  	console.log(left_value)
		obj.rotate({angle: left_value});
		left_value--;
		console.log(left_value)
		obj.css({
			'transform': 'rotate('+left_value+')deg)',
		});
  })
  // 右旋转
  var right_value;
  $('.right-roa').click(function(){
  	var obj=$('.move-paper img');
  	var deg=eval('get'+obj.css('transform'));//构造getmatrix函数,返回上次旋转度数
  	console.log(obj.css('transform'),deg);
  	if(deg!=0){
			right_value=deg+1;
  	}else{
  		right_value=1;
  	}
		obj.rotate({angle: right_value});
		right_value++;
		console.log(right_value)
		obj.css({
			'transform': 'rotate('+right_value+')deg)',
		});


  })

   function getmatrix(a,b,c,d,e,f){
        var aa=Math.round(180*Math.asin(a)/ Math.PI);
        var bb=Math.round(180*Math.acos(b)/ Math.PI);
        var cc=Math.round(180*Math.asin(c)/ Math.PI);
        var dd=Math.round(180*Math.acos(d)/ Math.PI);
        var deg=0;
        if(aa==bb||-aa==bb){
            deg=dd;
        }else if(-aa+bb==180){
            deg=180+cc;
        }else if(aa+bb==180){
            deg=360-cc||360-dd;
        }
        return deg>=360?0:deg;
    }


  function zoomIn(img_width,img_height,ch){
		if(ch){
			img_width = img_width * 1.25;
	    img_height = img_height * 1.25;
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
	      width = width * 1.25;
	      height = height * 1.25;
	      left_value = left_value * 1.25;
	      top_value = top_value * 1.25;
	      $(select_area[i]).css({
	        "width": width + 'px',
	        "height": height + 'px',
	        "left": left_value + 'px',
	        "top": top_value + 'px'
	      })
	    }



		}else{
			img_width = img_width / 1.25;
	    img_height = img_height / 1.25;
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
	      width = width / 1.25;
	      height = height / 1.25;
	      left_value = left_value / 1.25;
	      top_value = top_value /1.25;
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
	      	// window.location.href = './login';
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
				xx=xx*1.25;
				yy=yy*1.25;
				$('.oMoveInDiv'+i).css({
					left: xx + 'px',
					top: yy + 'px'
				});
			}else{
				xx=xx/1.25;
				yy=yy/1.25;
				$('.oMoveInDiv'+i).css({
					left: xx + 'px',
					top: yy + 'px'
				});
			}
		}

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
		i_on_blur = $(this);
		console.log(i_on_blur)
	});

	$('.key-btn').unbind('click').click(function(){
		if(i_on_blur == 999){
			console.log(i_on_blur);
			return;
		}

		var iNum = $(this).attr('data-number');
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
		}
		i_on_blur.val(score);
		var fen = i_on_blur.attr('data-fen');
		var num = i_on_blur.attr('data-num');
		if(isNaN(score) || score>fen || score < 0 && score!=''){
			iTwo(prompt_i,prompt_1);
			i_on_blur.val('');

		}
	});

	$('.key-btn_1').on('click',function(){
		var inputs = $(".pop-2").find(".yuejuan_score");
 		var idx = inputs.index(i_on_blur);
 		if(idx==0){
 			return;
 		}
 		console.log('idx',idx);
 		i_on_blur = $(inputs[idx-1]);
 		i_on_blur.focus().select();
	});
	$('.key-btn_2').on('click',function(){
		console.log(i_on_blur)
		var inputs = $(".pop-2").find(".yuejuan_score");
 		var idx = inputs.index(i_on_blur);
 		if(idx==inputs.length-1){
 			return;
 		}
 		console.log('idx',idx);
 		i_on_blur = $(inputs[idx+1]);
 		console.log(i_on_blur);

 		i_on_blur.focus();
	});

		//分数判定
	$('body').on('input' , '.yuejuan_score', function(){
		var str_score = $(this).val();
		var fen = parseFloat($(this).attr('data-fen'));
		var score = parseFloat($(this).val());
		console.log(str_score,score,fen)


		var re = /^[\+\-]?\d*?\.?\d{0,1}$/;
		if(!re.test(str_score)){
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
	$('body').on('focus','#p-table .yuejuan_score', function(){
		var that= this;
		$(document).unbind('keydown').keydown(function(event){
			if(event.keyCode == 13){
				if(that==$('.yuejuan_score')[$('.yuejuan_score').length-1]){
					$(that).parents('table').next().find('.determine').click();
				}else{
					$(that).blur();
					$(that).parents('tr').next().find('.yuejuan_score').focus();
					$(that).parents('tr').next().find('.yuejuan_score').select();
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
		console.log(id,type)
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/section_crop_images/review_paper",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'section_crop_id':id,'type':type},
		  dataType: "JSON",
		  success: function(data){
		  	console.log(data);
		  	if(data.message=="审核完成！"){
		  		console.log(data.message)
		  	}
		  	show_check_info(data);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login';
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
		var exam_subject_id = check_info.exam_subject_id;
		var scanner_image_id = check_info.scanner_image_id;
		var current_page = check_info.current_page;
		$('.check-paper').attr({
			'exam_subject_id': exam_subject_id,
			'scanner_image_id': scanner_image_id,
			'current_page': current_page
		});;
		var img_id = check_info.section_crop_image_id;
		var img_url = check_info.section_crop_image_uri;
		console.log(img_id,img_url)
		if(img_id){
			var check_img = '<img data-id="'+img_id+'" id="img-'+img_id+'" src="'+ ajaxIp +''+img_url+'">';
			$('.check-paper').append(check_img);
		}
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
		$('.check-teacher-list').html('');
		$('#check-table tbody').html('');
		$('.grade-th').remove();
		var b_input=[];//分值input
		// 获取每位老师的阅卷分数
		if(section_crop_info && section_crop_info.length > 0){
			console.log(section_crop_info.length)
			for (var j = 0; j < section_crop_info.length; j++) {
				var grade_th = '<th class="grade-th grade-th-'+j+'">分值</th>';
				$('.num-th').after(grade_th);
				var teacher_name = '<a><span>阅卷老师:</span><span class="check-teacher" data-id="'+section_crop_info[j].examination_teacher_id+'">'+section_crop_info[j].customer_name+'</span></a>';
				$('.check-teacher-list').append(teacher_name);
				// 审核题目信息
				text_list = section_crop_info[0].answer_setting_scores;
				var check_item_infos = section_crop_info[j].answer_setting_scores;
				console.log(check_item_infos)
				for (var z = 0; z < check_item_infos.length; z++) {
					var td_input='<td class="input-p"><input answer-id="'+check_item_infos[z].answer_setting_id+'" data-id="'+check_item_infos[z].answer_setting_score_id+'" disabled style="width:45px" type="text" class="yuejuan_score" value="'+check_item_infos[z].answer_setting_score+'"/></td>';
					b_input.push(td_input);
				};
			};
		}
		
		// 根据第一个老师获取题号信息和总分值信息
		if(text_list && text_list.length>0){
			for (var m = 0; m < text_list.length; m++) {
				var text_info = '<tr><td class="item-num" data-id="'+text_list[m].answer_setting_id+'">'+text_list[m].num+'</td><td class="all-grade">'+text_list[m].total_score+'</td></tr>';
				$('#check-table tbody').append(text_info);
			};
			if($('#check-table').width()>204){
				$(this).parent().css('overflow-x','scroll');
			}
		}


		var num_input = $('#check-table tbody').find('.item-num');
		for (var p = num_input.length-1; p >= 0; p--) {
			var num_id = $(num_input[p]).attr('data-id');
			for (var q = b_input.length-1; q >= 0; q--) {
				var all_id = $(b_input[q]).find('input').attr('answer-id');
				if(num_id==all_id){
					console.log(p,q)
					$(num_input[p]).after($(b_input[q]));

				}
			};
		};





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
				console.log(text_list[i].total_score)
				var item_tr = '<tr><td class="item-num" data-id="'+text_list[i].answer_setting_id+'">'+text_list[i].num+'</td><td class="input-p"><input type="text" class="yuejuan_score" data-fen="'+text_list[i].total_score+'" /></td><td class="all-grade">'+text_list[i].total_score+'</td></tr>';
				console.log(item_tr)
				$('#check-teacher-table').append(item_tr);
			};
		}
		var score_infos = check_info.answer_setting_scores;

		if(score_infos && score_infos.length>0){
			$('#check-teacher-table tbody').html('');
			for (var n = 0; n < score_infos.length; n++) {
				var score_info = '<tr><td class="item-num" data-id="'+score_infos[n].answer_setting_id+'">'+score_infos[n].num+'</td><td class="input-p"><input type="text" class="yuejuan_score" value="'+score_infos[n].score+'" data-fen="'+score_infos[n].total_socre+'"></td><td class="all-grade">'+score_infos[n].total_socre+'</td></tr>';
				$('#check-teacher-table tbody').append(score_info);
			};
			$($('.yuejuan_score')[0]).focus();
			get_key_op('#check-teacher-table');

		}
	}


   // 显示原试卷
	 $('body').on('click','.check-show-pre',function(){
	  	$(this).addClass('check-hide-pre').removeClass('check-show-pre');
	  	$(this).text('隐藏原试卷');
			var exam_subject_id = $('.check-paper').attr('exam_subject_id');
			var scanner_image_id = $('.check-paper').attr('scanner_image_id');
			var current_page = $('.check-paper').attr('current_page');
			get_pre_info_request(exam_subject_id,scanner_image_id,current_page);
	  })
	  $('body').on('click','.check-hide-pre',function(){
	  	$(this).addClass('check-show-pre').removeClass('check-hide-pre');
	  	$(this).text('显示原试卷');
	  	var type_id = $('.change-paper-type').val();
			var section_crop_id = $('.check-paper-box').attr('section_crop_id');
			get_check_info(section_crop_id,type_id);
	  })


	// 点击回车键进入下一个input,最后一个点击提交
	$('body').on('focus','#check-teacher-table .yuejuan_score', function(){
		var that= this;
		$(document).unbind('keydown').keydown(function(event){
			if(event.keyCode == 13){
				if(that==$('.yuejuan_score')[$('.yuejuan_score').length-1]){
					$(that).parents('table').next().find('.determine').click();
				}else{
					$(that).blur();
					$(that).parents('tr').next().find('.yuejuan_score').focus();
					$(that).parents('tr').next().find('.yuejuan_score').select();
				}
			}
		});
	})


	// 审核提交
	$('body').on('click', '#last-check-btn', function() {

		var section_crop_id = $('.check-paper-box').attr('section_crop_id');
		var section_crop_image_id = $('.check-paper img').attr('data-id');
		var student_info_id = $('.check-teacher-list').attr('student_info_id');
		var answer_setting_scores=[];
		var input_info = $(this).parent().siblings('#check-teacher-table').find('.yuejuan_score');
		for (var i = 0; i <input_info.length; i++) {
			var answer_obj = new Object();
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
		      	// window.location.href = './login';
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
		if(type_id==2){
			$('.check-ul').next('.btn-on').show();
		}else{
			$('.check-ul').next('.btn-on').hide();
		}

	});


	// 第一卷
	$('.check-show-first').on('click',function() {
		$('.check-hide-pre').removeClass('check-hide-pre').addClass('check-show-pre').text('显示原试卷');

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
		$('.check-hide-pre').removeClass('check-hide-pre').addClass('check-show-pre').text('显示原试卷');
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
		$('.check-hide-pre').removeClass('check-hide-pre').addClass('check-show-pre').text('显示原试卷');
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
		$('.check-hide-pre').removeClass('check-hide-pre').addClass('check-show-pre').text('显示原试卷');
	});




	// 关闭试卷
	$('.check-paper-box .close').click(function() {
		$(this).parents('.check-paper-box').siblings('#wrap').show();
		$(this).parents('.check-paper-box').hide();
	});

	// 处理未处理切换
	$('.check-ul li').click(function(){
		$('.check-hide-pre').removeClass('check-hide-pre').addClass('check-show-pre').text('显示原试卷');
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
	      	// window.location.href = './login';
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
	      	// window.location.href = './login';
		  }
		});
	});



})