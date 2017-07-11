$(function(){
	var isLogin = localStorage.getItem("token");
	// 获取当前页面的URL参数
	var url = window.location;
  function getUrlParam(url,name){
    var pattern = new RegExp("[?&]" + name +"\=([^&]+)","g");
    var matcher = pattern.exec(url);
    var items = null;
    if(matcher != null){
      try{
          items = decodeURIComponent(decodeURIComponent(matcher[1]));
      }catch(e){
          try{
              items = decodeURIComponent(matcher[1]);
          }catch(e){
              items = matcher[1];
          }
      }
    }
    return items;
  }
  // console.log(getUrlParam(url,'id')); // bath_id
  // console.log(getUrlParam(url,'test_id')); // bath_id
  // console.log(getUrlParam(url,'exam_name')); // exam_name
  // console.log(getUrlParam(url,'subject_name')); // subject_name
  var bath_id = getUrlParam(url,'id');
  var test_local_id = getUrlParam(url,'test_local_id');
  var exam_name = getUrlParam(url,'exam_name');
  var subject_name = getUrlParam(url,'subject_name');
  var exam_subject_id = getUrlParam(url,'exam_subject_id');

	$('#test-name').text(exam_name);
	//exam_subject_id
	$('#sub-name').attr('exam_subject_id', exam_subject_id);
	$('#sub-name em').text(subject_name);
	 var storage=window.localStorage;
   storage.setItem("id",bath_id);
   storage.setItem("test_local_id",test_local_id);
   storage.setItem("exam_name",exam_name);
   storage.setItem("subject_name",subject_name);
   console.log(storage["id"]);
   console.log(storage["test_local_id"]);
   console.log(storage["exam_name"]);
   console.log(storage["subject_name"]);
	$('body').on('click', '.back', function() {
		console.log(storage["id"]);
   	console.log(storage["exam_name"]);
   	console.log(storage["subject_name"]);
   	location.href=history.go(-1);
   	// show_test_cont(parseInt(localStorage.test_local_id));
	});
	get_info();
	// 获取消息
	function get_info(){
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/exam_subject_batches/"+bath_id+"/page_info",
		  headers: {'Authorization': "Bearer " + isLogin},
		  success: function(data){
		  	console.log(data);
		  	$('#num').text(data.total);
		  	page_info(data);
		   },
		   error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	}
	// 显示页数
	function page_info(info){
		var page_length = info.page;
		$('.page').html('');
		for (var i = 0; i < page_length; i++) {
			var page_a='<a href="javascript:;">'+(i+1)+'</a>';
			if(i==0){
				page_a='<a href="javascript:;" class="on">'+(i+1)+'</a>';
			}
			$('.page').append(page_a);
		};
		requst_ajax();
	}
	function requst_ajax(){
		var index = $('.jump-input').val();
		var page = $('.page a.on').text();
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/exam_subject_batches/"+bath_id+"/scanner_image",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'index':index,'page':page},
		  success: function(data){
		  	console.log(data);
		  	show_img(data);
		   },
		   error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	}
	// 显示图片
	function show_img(img_info){
		$('.img-box').html('');
		var img_url = img_info.image_uri;
		var img_id = img_info.id;
		var img_html = '<img data-id="'+img_id+'" id="img-'+img_id+'" src="'+ ajaxIp +''+img_url+'"><div class="bg-img"></div>';
		$('.img-box').append(img_html);

		if($('.has_bg').hasClass('active')){
			console.log(777);
			$('.bg-img').show();
			$(".bg-img").addClass('dd');
      drow_rect(".dd");
		}

	}
	// 点击页数切换
	$('.page').on('click', 'a', function() {
		$(this).addClass('on').siblings().removeClass('on');
		requst_ajax();
	});
	// 上一份
	$('.prev').on('click', function() {
		var value = $('.jump-input').val();
		if(value>1){
			value--;
		}else{
			alert('已经是第一张试卷了')
		}
		$('.jump-input').val(value);
		requst_ajax();
	});
	// 下一份
	$('.next').on('click', function() {
		var total = parseInt($('#num').text());
		var value = $('.jump-input').val();
		if(value<total){
			value++;
		}else{
			alert('已经是最后一张试卷');
		}
		$('.jump-input').val(value);
		requst_ajax();
	});
	// 跳转试卷
	$('.jump').on('click',function() {
		requst_ajax();
	});
	//放大
  $('#big').click(function(){
    var img_width = $('.img-box img').width();
    var img_height = $('.img-box img').height();
    img_width = img_width * 1.02;
    img_height = img_height * 1.02;
    $('.img-box img').css({
      "width":img_width + 'px',
      "height":img_height + 'px'
    });
    //背景区域放大
    $('.img-box .bg-img').css({
      "width":img_width + 'px',
      "height":img_height + 'px',
      "marginTop":-img_height + 'px'
    });
    // 区域块放大
    var select_area = $('.bg-img .select-area');
    for(var i=0;i<= select_area.length;i++){
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
  });
  //缩小
  $('#small').click(function(){
    var img_width = $('.img-box img').width();
    var img_height = $('.img-box img').height();
    img_width = img_width / 1.02;
    img_height = img_height / 1.02;
    $('.img-box img').css({
      "width":img_width + 'px',
      "height":img_height + 'px'
    });
    //背景区域缩小
    $('.img-box .bg-img').css({
      "width":img_width + 'px',
      "height":img_height + 'px',
      "marginTop":-img_height + 'px'
    });
   //区域块缩小
    var select_area = $('.bg-img .select-area');
    for(var i=0;i<= select_area.length;i++){
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
  });
  // 删除区域块
  $('body').on('click','.close',function(){
     $(this).parent().remove();
  })
  // 左侧区域切换
  $('.left-op ul li.opp').on('click', function() {
  	$(this).addClass('active').siblings().removeClass('active');
	  var index = $(this).index();
	  //判断是否为检查文件(没有遮罩层)
    if(index==0){
      $('.bg-img').hide();
    }else{
      $('.bg-img').show();
			// var arr5=
			// 	[{
	  //         "top":277,
	  //         "left":30,
	  //         "width":490,
	  //         "height":200
	  //     },
	  //     {
	  //         "top":485,
	  //         "left":30,
	  //         "width":490,
	  //         "height":124
	  //     },
	  //     {
	  //         "top":614,
	  //         "left":30,
	  //         "width":490,
	  //         "height":102
	  //     },
	  //     {
	  //         "top":63,
	  //         "left":530,
	  //         "width":490,
	  //         "height":570
	  //     }];
   //      append_select(4,arr5);
        $(".bg-img").addClass('dd');
        drow_rect(".dd");
    }
  });

 //添加区域块
  function append_select(eg,arr){
    $('.bg-img').html('');
    for(var i = 0;i < eg; i++){
    	var select_area_a='<div class="select-area"><a href="javascript:;" class="edit-item">编辑</a><i class="iconfont close">&#xe61b;</i></div>';
      $('.bg-img').append(select_area_a);
      //$('.bg-img div').eq(i).addClass('select-area');
      var select_area = $('.select-area');
      //添加区域块的id
      $(select_area[i]).attr('id', 'select-area' + i);
      //区域可拖动
      $(select_area[i]).draggable();
      //区域可各个方向缩放(上下左右四角)
      $('#select-area'+i).resizable({ handles: "n, e, s, w, ne, se, sw, nw" });
      //获取区域的位置
      // console.log(arr[i].width)
      var select_width = arr[i]['width'];
      var select_height = arr[i]['height'];//140
      var select_left = arr[i]['left'];
      var select_top = arr[i]['top'];
      //var select_width =  $(select-area[i]).width();//264
      //var select_height =  $(select-area[i]).height();//140
      //var select_left =  $(select-area[i]).position().left;//48
      //var select_top =  $(select-area[i]).position.top;//76

      //获取当前试卷的宽度和高度比例
      var l_width=$('.bg-img').width()/1044;
      var l_height=$('.bg-img').height()/734;
      //显示区域所在位置
      $(select_area[i]).css({
        "width": select_width*l_width + 'px',
        "height": select_height*l_height + 'px',
        "left": select_left*l_width + 'px',
        "top": select_top*l_height + 'px'
      });
    }
    //如果区域块的数量大于2，显示区域块的个数，添加span_title
      for(i = 0;i < eg;i++){
      var span_title="<span class='title' " + " style='background-color: red; color: rgb(255, 255, 255); opacity: 1; position: absolute; left: 20px; top: 0px;'>"+(i+1)+"</span>";
      $('.select-area').eq(i).append(span_title);
    }
  }


  // if($('.bg-img').children()){
		get_select_info();
  // }
	// 获取当前区域块信息
	function get_select_info(){
		// 获取图片id
		var scanner_image_id = $('.img-box img').attr('data-id');
	  // 获取当前页数
	  var current_page =parseInt($('.page .on').text());
	  console.log(scanner_image_id,current_page)
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/section_crops",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{
		  	'scanner_image_id':scanner_image_id,
		  	'exam_subject_batch_id':bath_id,
		  	'current_page':current_page
		  },
		  success: function(data){
		  	console.log(data);
		  	show_select_info(data);
		   },
		   error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	}
	// 显示区域块信息
	function show_select_info(select_info){
		$('.bg-img').html('');
		var select_info_length = select_info.length;
		var select_arr =[];
		for (var i = 0; i < select_info_length; i++) {
			select_arr.push(select_info[i].position);
		};
		console.log(select_arr)
		append_select(select_info_length,select_arr)
	}

	// 选择题型
	$('body').on('click','.edit-item',function() {
		$('.modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-shadow').animate({'opacity': 0},500);
		$('#change-modal').show();
		var p_width = $(this).parent().width();
		var p_height = $(this).parent().height();
		var p_left = $(this).parent().position().left;
		var p_top = $(this).parent().position().top;
		var span_num = parseInt($(this).siblings('.title').text());
		console.log(p_width,p_height,p_left,p_top)
		width = p_width;
		height = p_height;
		x = p_left;
		y = p_top;
		num_index = span_num;
	});



	// 获取试卷题号信息
  get_item_info();
  function get_item_info(){
  // 	// 题型信息
  	$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/section_crops/answer_by_exam_subject",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'exam_subject_id':exam_subject_id},
		  success: function(data){
		  	console.log(data);
		  	show_type_select(data);
		   },
		   error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
  }



  // 显示题型信息
	function show_type_select(type_info){
		$('#type-list').html('');
		var type_length = type_info.length;
		// var newArr = [];
// 		for (var i = 0; i < type_length; i++) {
// 			if(newArr.indexOf(type_info[i].name) == -1){
// 　　　　	newArr.push(type_info[i].name);
// 　　		}
// 		};
// 		console.log(newArr);
		for (var i = 0; i < type_length; i++) {
			var option_type = '<option data-id="'+ type_info[i].id+'" value="'+type_info[i].name+'">'+type_info[i].name+'</option>';
			$('#type-list').append(option_type);
		};
		var first_id = $('#type-list option').eq(0).attr('data-id');
		get_num_list(first_id);
	}
	 // 题型选择事件
	$('body').on('change', '#type-list', function() {
		$('#item-list').html('');
		var type_name = $(this).find("option:selected").val();
		var type_id = $(this).find("option:selected").attr('data-id');
		get_num_list(type_id);
	});

	// 显示题号列表
	function get_num_list(id){
	// 小题序号
		$.ajax({
		  type: "GET",
		  url: ajaxIp+"/api/v2/section_crops/answer_setting_by_answer",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'answer_id':id},
		  success: function(data){
		  	console.log(data);
		  	show_num_list(data);
		   },
		   error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	}


	function show_num_list(num_info){
		var all_change = '<li class="all"><div class="check-box"><input type="checkbox" id="all-num" class="checkall" name="checkall"><label for="all-num">全部</label></div></li>' ;
		$('#item-list').append(all_change);
		for (var i = 0; i < num_info.length; i++) {
			var all_num = '<li><div class="check-box"><input type="checkbox" data-id="'+num_info[i].id+'" value="'+num_info[i].num+'" id="num-check'+ i +'" class="check" name="num-check"><label for="num-check'+ i +'">'+num_info[i].num+'</label></div></li>';
			$('#item-list').append(all_num);
		};
	}

		// 题号全选
	$('body').on('click', '#all-num', function() {
		$("input[name='num-check']").prop('checked', this.checked);
	});

	$('body').on('click', 'input[name="num-check"]', function() {
		var $graBox = $("input[name='num-check']");
		$("#all-num").prop("checked",$graBox.length == $("input[name='num-check']:checked").length ? true : false);
	});

	var width;
	var height;
	var x;
	var y;
	var num_index;
	// 确认选择
	$('body').on('click', '#confirm-sub', function() {

		// 获取图片id
		var scanner_image_id = $('.img-box img').attr('data-id');
	  // 获取当前页数
	  var current_page =parseInt($('.page .on').text());
	  // 获取大题Id
	  var answer_id = $('#type-list').find("option:selected").attr('data-id');
	  // 题目类型考分区域
	  var crop_type = 4;
	  // 获取小题信息
	  var answer_setting_ids=[];
	  var items_all_num = $('#item-list').find("input[type='checkbox']:checked").length;

	  for (var i = 0; i < items_all_num; i++) {
			answer_setting_ids.push($($('#item-list').find("input[type='checkbox']:checked")[i]).data('id'));
		};
		// console.log(class_arr)
		if($('#item-list').find('#all-num').is(':checked')){
			answer_setting_ids.shift();
			answer_setting_ids;
		}
		console.log(answer_setting_ids)
	  // 新建区域
	  $.ajax({
		  type: "POST",
		  url: ajaxIp+"/api/v2/section_crops",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{
		  	'width':width,
		  	'height':height,
		  	'x':x,
		  	'y':y,
		  	'index':num_index,
		  	'exam_subject_batch_id':bath_id,
		  	'crop_type':crop_type,
		  	'current_page':current_page,
		  	'scanner_image_id':scanner_image_id,
		  	'exam_subject_id':exam_subject_id,
		  	'answer_id':answer_id,
		  	'answer_setting_ids':answer_setting_ids,
		  },
		  success: function(data){
		  	console.log(data);
		  	show_select_info(data);
		   },
		   error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	});


	// 画区域块
  function drow_rect(the_id){//theid表示用作画布的层
    var num=1;
    var x_down=0,y_down=0;
    var new_width=0,new_height=0;
    var x_original=0,y_original=0;
    var original_flag=true,down_flag=false;
    var x_point=0,y_point=0;
    var append_string;
    var MouseDown=function(e){
        down_flag=true;
        x_down=e.pageX;
        y_down=e.pageY;//记录鼠标的当前坐标
        if(original_flag){//如果是第一次点击,把起始点的坐标记录到 x_original 和 y_original中
            x_original=e.pageX;
            y_original=e.pageY;
            original_flag=false;
        }
    };
    var MouseMove=function(e){
      if(down_flag){//鼠标有移动
        x_down=e.pageX;
        y_down=e.pageY;
        x_point=x_original-280;
        y_point=y_original-100;
        new_width=x_down-x_original;
        if(new_width<0){//鼠标向左运动
            new_width=-new_width;
            x_point=x_down-280;
        }
        new_height=y_down-y_original;
        if(new_height<0){ //鼠标向右运动
            new_height=-new_height;
            y_point=y_down-100;
        }
        $("div[name='"+num+"']").remove();//把前面的层删除，并在后面的代码中生成新的层
        append_string="<div class='select-area' style='position: absolute;left:"+x_point+"px;top:"+y_point+"px;"+"width:"+new_width+"px;height:"
            +new_height+"px' name='"+num+"'><a href='javascript:;' class='edit-item'>编辑</a><i class='iconfont close'>&#xe61b;</i><span class='title' " +
        " style='background-color: red; color: rgb(255, 255, 255); opacity: 1; position: absolute; left: 6px; top: 2px;'>"+num+"</span>'</div>";
        $(the_id).append(append_string);
      }
    }
    $(the_id).bind("mousedown",MouseDown);
    $(the_id).bind("mousemove",MouseMove);//事件绑定
    console.log( $(".select-area").length);
    num=$(".select-area").length+1;
    $(".select-area").mousedown(function(){
        $(the_id).unbind("mousemove",MouseMove);//取消事件绑定
    });
    $(".select-area").mouseup(function(){
        $(the_id).bind("mousemove",MouseMove);//事件绑定
    });
    $(the_id).mouseup(function(e){//松开鼠标左键，初始化标志位
      down_flag=false;
      original_flag=true;
      $("div[name='"+num+"']").draggable();
      $("div[name='"+num+"']").resizable({ handles: "n, e, s, w, ne, se, sw, nw" });


      $("div[name='"+num+"']").mousedown(function(){
          $(the_id).unbind("mousemove",MouseMove);//取消事件绑定
      });
      $("div[name='"+num+"']").mouseup(function(){
          $(the_id).bind("mousemove",MouseMove);//事件绑定
      });
      //阻止区域块移动时，num也增加的情况（只有新建的时候才会增减num的值）;
      if($("div[name='"+num+"']").width()!=null){
          num++;
      }
    });
	}

})