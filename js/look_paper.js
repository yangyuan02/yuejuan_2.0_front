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

	$('#test-name').text(exam_name);
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
		var img_html = '<img id="img-'+img_id+'" src="'+ ajaxIp +''+img_url+'"><div class="bg-img"></div>';
		$('.img-box').append(img_html);

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
			var arr5=
				[{
	          "top":277,
	          "left":30,
	          "width":490,
	          "height":200
	      },
	      {
	          "top":485,
	          "left":30,
	          "width":490,
	          "height":124
	      },
	      {
	          "top":614,
	          "left":30,
	          "width":490,
	          "height":102
	      },
	      {
	          "top":63,
	          "left":530,
	          "width":490,
	          "height":570
	      }];
        append_select(4,arr5);
        $(".bg-img").addClass('dd');
        drow_rect(".dd");
    }
  });

 //添加区域块
  function append_select(eg,arr){
    $('.bg-img').children().remove();
    for(var i = 0;i < eg; i++){
      $('.bg-img').append('<div class="select-area"><i class="iconfont close">&#xe61b;</i></div>');
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
        x_point=x_original;
        y_point=y_original-100;
        new_width=x_down-x_original;
        if(new_width<0){//鼠标向左运动
            new_width=-new_width;
            x_point=x_down;
        }
        new_height=y_down-y_original;
        if(new_height<0){ //鼠标向右运动
            new_height=-new_height;
            y_point=y_down-100;
        }
        $("div[name='"+num+"']").remove();//把前面的层删除，并在后面的代码中生成新的层
        append_string="<div class='select-area' style='position: absolute;left:"+x_point+"px;top:"+y_point+"px;"+"width:"+new_width+"px;height:"
            +new_height+"px' name='"+num+"'> '<i class='iconfont close'>&#xe61b;</i>' '<span class='title' " +
        " style='background-color: red; color: rgb(255, 255, 255); opacity: 1; position: absolute; left: 20px; top: 0px;'>"+num+"</span>'</div>";
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