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
		  type: "POST",
		  url: ajaxIp+"/api/v2/exam_subjects/school_exam_subjects",
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
		console.log(nums+'条数据')
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
				var page_data = {'page':nums, 'limit': 10};

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
		$('#test-list-change tbody').html('');
		for (var i = 0; i < test_length; i++) {
			var tr_test ='<tr class="parent-tr"><td class="test-name" width="320" exam-id="'+test_info.exam_subjects[i].exam_id+'" data-id="'+test_info.exam_subjects[i].exam_subject_id+'">'+ test_info.exam_subjects[i].name +'</td><td class="test-grade">'+ test_info.exam_subjects[i].grade_name +'</td><td class="test-subject">'+ test_info.exam_subjects[i].subject_name +'</td><td class="test-on"> <p class="num">'+ test_info.exam_subjects[i].paper_revise_progress+'%</p><div class="bar"><div style="width:'+ test_info.exam_subjects[i].paper_revise_progress+'%;"></div></div></td><td class="test-num">'+ test_info.exam_subjects[i].answers_total_count+'</td><td class="test-operation"><a href="javascript:;">显示题组<i class="iconfont bottom">&#xe622;</i><i class="iconfont up none">&#xe624;</i></a></td></tr><tr class="child-tr none"><td colspan="6"><div class="child-box"><ul class="child-title"><li>题组</li><li>阅卷进度</li><li>多评异常</li><li>问题试卷</li><li>生成日期</li><li></li></ul><ul class="child-cont"></ul></div></td></tr>';
			$('#test-list-change tbody').append(tr_test);
		};
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
	});


// 显示题组信息

	function show_item_info(item_info,parnt_info){
		console.log(parnt_info)
		parnt_info.next().find('.child-cont').html('');
		var item_info_length = item_info.length;
		for (var i = 0; i < item_info_length; i++) {
			var child_li = '<li class="li-'+i+'"><div style="width:100%"><div class="item-name">'+item_info[i].name+'</div><div class="item-on">'+item_info[i].revise_progress+'</div><div class="more-num">'+item_info[i].multiple_error_count+'</div><div class="bug-num">'+item_info[i].issue_paper_count+'</div><div class="item-time">'+item_info[i].finish_date+'</div><div class="item-op" style="display:none">hhhhhh</div></div><div style="width:100%"><ul class="last-ul"></ul></div></li>'
			parnt_info.next().find('.child-cont').append(child_li);
			$('.li-'+i+'').children('.last-ul').html('');
			var item_last = item_info[i].section_crops;
			var item_last_length = item_last.length;
			console.log(item_last_length)
			for (var j = 0; j < item_last_length; j++) {
				var item_li ='<li><div class="item-name" data-id="'+item_last[j].id+'">'+item_last[j].name+'</div><div class="item-on">'+item_last[j].progress+'</div><div class="more-num" style="visibility: hidden;">test</div><div class="bug-num" style="visibility: hidden;">test</div><div class="item-time" style="visibility: hidden;">test</div><div class="item-op"><a href="javascript:;" class="mark-btn determine">阅卷</a><a href="javascript:;" class="check-btn">审核</a></div></li>';
			  $('.li-'+i+'').find('.last-ul').append(item_li);
			};

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
	function get_paper_info(id){
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/section_crop_images/total_page",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'section_crop_id':id},
		  success: function(data){
		  	console.log(data);
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
		  	s_c_id = data.section_crop_id;
		  	s_c_i_id = data.section_crop_image_id;
		  	a_settings = [];
		  	for (var i = 0; i < data.answer_settings.length; i++) {
		  		a_settings.push(data.answer_settings[i]);
		  	};
		  	console.log(a_settings);
		  	s_i_id = data.scanner_image_id;
		  	e_s_id = data.exam_subject_id;
		  	current_index = data.finished_count;
		  	show_img_info(data,name,index);
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

		}else{
			var img_url = img_info.scanner_image_uri;
			var img_id = img_info.scanner_image_id;
			var img_html = '<img dta-id="'+img_id+'" id="img-'+img_id+'" src="'+ ajaxIp +''+img_url+'">';
		}
		$('.move-paper').append(img_html);
		if(index!=null){
			$('.on-num').text(index);
		}else{
			$('.on-num').text(img_info.finished_count+1);
		}//当前第几份试卷
		$('.paper-item-name').text(section_crop_name);//题组名称
		$('.paper-item-name').attr('section_crop_id',img_info.section_crop_id);
		$('.mark-model').text(img_info.pattern)//改卷模式
		$('.finished').text(img_info.finished_count);
		$('.pop-1').find('span').text(img_info.teacher_name);
		// 显示题号
		$('.p-table tbody').html('');
		var answer_settings = img_info.answer_settings;
		var answer_settings_length = answer_settings.length;
		for (var i = 0; i < answer_settings_length; i++) {
			var item_tr = '<tr><td class="item-num">'+answer_settings[i].num+'</td><td class="input-p"><input type="text" class="yuejuan_score" data-id="'+answer_settings[i].answer_setting_score_id+'" value="'+answer_settings[i].answer_setting_score+'" data-num = "'+answer_settings[i].num+'" data-fen="'+answer_settings[i].total_score+'"></td><td class="all-grade">'+answer_settings[i].total_score+'分</td></tr>';
			$('.p-table tbody').append(item_tr);
		};

	}

  // 显示原试卷
  $('.show-pre').click(function(){
		var section_crop_id = $('.paper-item-name').attr('section_crop_id');
		get_info_request(section_crop_id);
  })



	// 返回试卷
	$('.back-paper').click(function(){
		var section_crop_id = $('.paper-item-name').attr('section_crop_id');
		var section_crop_name = $('.paper-item-name').text();
		get_info_request(section_crop_id,section_crop_name);
	})

	// 第一卷
	$('.show-first').click(function(){
		if($('.on-num').text()!=1){
			var index = 1;
			var section_crop_id = $('.paper-item-name').attr('section_crop_id');
			var section_crop_name = $('.paper-item-name').text();
			get_info_request(section_crop_id,section_crop_name,index);
		}else{
			alert("已经是第一张试卷了")
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
  	if(index < current_index+1){
			var section_crop_id = $('.paper-item-name').attr('section_crop_id');
			var section_crop_name = $('.paper-item-name').text();
			get_info_request(section_crop_id,section_crop_name,index);
  	}else{
			alert("不能选择未批改的试卷，请点击返回试卷");
		}
		if(current_index==all_num){
			alert('已经是最后一张试卷')
		}
  })

	// 提交打分
	$('.con-btn').click(function(){
		var name = $('.paper-item-name').text();
		a_settings.answer_setting_score;
		var input_value = $('.p-table tbody').children().find('.yuejuan_score');
		console.log(input_value)
		var input_length = input_value.length;
		for (var i = 0; i < input_length; i++) {
			var value = $(input_value[i]).val();
			a_settings[i].answer_setting_score=value;
		};
		console.log(a_settings);
		var data_value={
			'section_crop_id': s_c_id,
			'section_crop_image_id': s_c_i_id,
			'answer_settings': a_settings,
			'scanner_image_id': s_i_id,
			'exam_subject_id': e_s_id
		}
		if(input_value.val() != ""){
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
		}else{
			alert('请输入得分后再提交');
		}
	})





	// 阅卷相关详情
	var aBigH = 18;//默认输入框高度
	var bMoveL = false;
	var coordinateArr =[];
	var oMoveNum = $('.move-papere input').length;//标志变量，长度取决批注数量
	var inputDiv = $('.popline_text');//输入框div
	var prompt_1 = '提示：您所给的分数不在规定范围内，请看清分值给分！';
	var prompt_i = $('#i_two');//提示框元素


	// 关闭试卷
	$('.close').click(function() {
		$(this).parents('.marking-paper-box').siblings('#wrap').show();
		$(this).parents('.marking-paper-box').hide();
	});
	// 试卷拖拽
	$('.move-paper').draggable();
	// 试卷放大缩小
	//放大
  $('#big').click(function(){
    var img_width = $('.move-paper img').width();
    var img_height = $('.move-paper img').height();
    oMoveNum = $('.move-paper .popline_text').length;
   	zoomIn(img_width,img_height,true);

		console.log(img_height)
    if(oMoveNum<=0){
			console.log(oMoveNum);
			return;
		}else{
			console.log(img_height)
			poplineText2(img_height,true);
		}
  });
  //缩小
  $('#small').click(function(){
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
		}else{
			img_width = img_width / 1.02;
	    img_height = img_height / 1.02;
	    $('.move-paper img').css({
	      "width":img_width + 'px',
	      "height":img_height + 'px'
	    });
		}
  }

	// 全屏显示
	$('#all-screen').click(function(){
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
		// oMoveNum = $('.oMove .popline_text').length;
		// oMoveNum = $('.oMove input').length;
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
		// oMoveNum = $('.move-paper .popline_text').length;
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

		var iNum = $(this).attr('data-number');
		console.log(iNum)
		var score = i_on_blur.val();
		if(score != '' && iNum == 0.5){
			console.log(i_on_blur);
			score=parseFloat(score)+0.5;
		}else if(iNum == 'k11' || iNum == 'k22'){
			return;
		}else{
			if(score==0 && iNum==0){
				score=0;
			}else if(score==0 && iNum!=0){
				score=iNum;
			}else{
				score+=iNum;
			}
			// score+=iNum;
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
		var fen = $(this).attr('data-fen');
		var score = $(this).val();
		console.log(score)
		if(score>fen || score < 0 && score!=''){
			iTwo(prompt_i,prompt_1);
			$(this).val('');
		}
	});


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



})