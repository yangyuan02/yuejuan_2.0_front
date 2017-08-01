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
			// console.log(item_info[i].section_crops)
			// var 
			$('.li-'+i+'').children('.last-ul').html('');
			var item_last = item_info[i].section_crops;
			var item_last_length = item_last.length;
			console.log(item_last_length)
			for (var j = 0; j < item_last_length; j++) {
				var item_li ='<li><div class="item-name" data-id="'+item_last[j].id+'">'+item_last[j].name+'</div><div class="item-on">10/10</div><div class="more-num" style="visibility: hidden;">test</div><div class="bug-num" style="visibility: hidden;">test</div><div class="item-time" style="visibility: hidden;">test</div><div class="item-op"><a href="javascript:;" class="mark-btn determine">阅卷</a><a href="javascript:;" class="check-btn">审核</a></div></li>';
			  $('.li-'+i+'').find('.last-ul').append(item_li);
			};

		};
	}







	// 阅卷相关功能
	$('body').on('click', '.mark-btn', function() {
		$(this).parents('#wrap').siblings('.marking-paper-box').show();
		$(this).parents('#wrap').hide();

		var section_crop_id = $(this).parent().parent().find('.item-name').attr('data-id');
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/section_crop_images/get_section_crop_image",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'section_crop_id':section_crop_id},
		  success: function(data){
		  	console.log(data);
		  	show_img_info(data);
		  },
		  error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	});



	// 显示阅卷图片
	function show_img_info(img_info){
		$('.move-paper').html('');
		var img_url = img_info.section_crop_image_uri;
		var img_id = img_info.section_crop_image_id;
		var img_html = '<img data-id="'+img_id+'" id="img-'+img_id+'" src="'+ ajaxIp +''+img_url+'">';
		$('.move-paper').append(img_html);
		$('.on-num').text(img_info.finished_count+1);
	}



	// 阅卷相关详情
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
    img_width = img_width * 1.02;
    img_height = img_height * 1.02;
    $('.move-paper img').css({
      "width":img_width + 'px',
      "height":img_height + 'px'
    });
  });
  //缩小
  $('#small').click(function(){
    var img_width = $('.move-paper img').width();
    var img_height = $('.move-paper img').height();
    img_width = img_width / 1.02;
    img_height = img_height / 1.02;
    $('.move-paper img').css({
      "width":img_width + 'px',
      "height":img_height + 'px'
    });
  });

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
	var bMoveL = false;
	var coordinateArr =[];
	var oMoveNum = $('.oMove input').length;//标志变量，长度取决批注数量
	var inputDiv = $('.popline_text');//输入框div

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

				onInputDivX = onInputDivX/$('.move-paper').width();
				onInputDivY = onInputDivY/$('.move-paper').height();
				// oMoveInDiv.children('span').html(onInputDivX + ',' + onInputDivY);
				var inputInp = oMoveInDiv.children('input');

				oMoveInDiv.show();
				inputInp.focus();
				poplineText(inputInp,oMoveInDiv);
				// var bPP = inputInp.on('blur' , function(){
				// 	if($(this).text() == ''){
				// 		console.log(1);
				// 		return true;
				// 	}
				// });
				// if(bPP){
				// 	return;
				// }


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
				onInputDivX = onInputDivX/$('.move-paper').width();
				onInputDivY = onInputDivY/$('.move-paper').height();
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
				onInputDivX = onInputDivX/$('.move-paper').width();
				onInputDivY = onInputDivY/$('.move-paper').height();
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
		oMoveNum = $('.move-paper .popline_text').length;
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
	        sensor.remove();
	        return width;
	    };
	    iInput.on('input', function(){
	        $(this).css('width',textWidth($(this).val()));
	    });
	}




})