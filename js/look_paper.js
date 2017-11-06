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
  var this_page = getUrlParam(url,'this_page');

	$('#test-name').text(exam_name);
	//exam_subject_id
	$('#sub-name').attr('exam_subject_id', exam_subject_id);
	$('#sub-name em').text(subject_name);
	 var storage=window.localStorage;
   storage.setItem("id",bath_id);
   storage.setItem("test_local_id",test_local_id);
   storage.setItem("exam_name",exam_name);
   storage.setItem("subject_name",subject_name);
   storage.setItem("this_page",this_page);
   console.log(storage["id"]);
   console.log(storage["test_local_id"]);
   console.log(storage["exam_name"]);
   console.log(storage["subject_name"]);
   console.log(storage["this_page"]);
	$('body').on('click', '.back', function() {
		console.log(storage["id"]);
   	console.log(storage["exam_name"]);
   	console.log(storage["subject_name"]);
   	console.log(storage["this_page"]);
   	// location.href=history.go(-1);
   	history.go(-1);
   	return false;
   	// show_test_cont(parseInt(localStorage.test_local_id));
	});
	get_info();
	var is_arr;
	var index_id=$('#sub-name').attr('exam_subject_id');
	console.log(index_id)
	var is_arr_info = JSON.parse(localStorage.getItem("data_arr"+index_id+""));
	console.log(is_arr_info)
	if (is_arr_info) {
			localStorage.removeItem("data_arr"+index_id+"");
	};
	var is_arr_num = JSON.parse(localStorage.getItem("data_arr_num"+index_id+""));
	console.log(is_arr_num)
	if(is_arr_num){
		localStorage.removeItem("data_arr_num"+index_id+"");
	}
	var is_on = JSON.parse(localStorage.getItem("data_arr_on"+index_id+""));
	console.log(is_on)
	// localStorage.removeItem("data_arr_on"+index_id+"");
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
	      	// window.location.href = './login';
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
		  async:false,
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
	      	// window.location.href = './login';
		  }
		});
	}
	// 显示图片
	function show_img(img_info){
		$('.img-box').html('');
		if(img_info){
			var img_url = img_info.image_uri;
			var img_id = img_info.id;
			var img_html = '<img data-id="'+img_id+'" id="img-'+img_id+'" src="'+ ajaxIp +''+img_url+'"><div class="bg-img"><div class="crop">题组切割</div></div>';
			$('.img-box').append(img_html);
		}
		console.log(index_id)

		if($('.has-bg').hasClass('active')){
			$('.bg-img').show();
			$('.bg-img').addClass('bg-type-sec');
			$(".bg-img").addClass('dd');
				 is_arr = JSON.parse(localStorage.getItem("data_arr"+index_id+""));
				 is_arr_num = JSON.parse(localStorage.getItem("data_arr_num"+index_id+""));
				console.log(is_arr,is_arr_num)
				if(is_arr&&is_arr.length>0){
					get_select_info();
					console.log(99)
					// append_first(is_arr);
					drow_rect('.dd')

				}else{
					get_select_info();
					drow_rect('.dd')
				}

			// if(is_arr&&is_arr.length>0){
			// 	console.log(99)
			// 	append_first(is_arr);
			// 	$(".bg-img").addClass('dd');
			// 	drow_rect('.dd')
			// }
	
      // get_select_info();
		}
		if($('.hide-sec').hasClass('active')){
			$('.bg-img').show();
			// $(".bg-img").addClass('dd');
      get_select_info();
      drow_rect('.dd');
		}

	}
	function append_first(arr){
		var current_page =parseInt($('.page .on').text());
		console.log(on_checked_info)
		$('body').find('#all-section-list').html('');
		var new_arr = new Array();
		for (var j = 0; j < arr.length; j++) {
			if(current_page==parseInt(arr[j].current_page)){
				new_arr.push(arr[j])
    }
    var jj_html = '<li id="'+arr[j].id+'" sec_num = "'+arr[j].current_page+'_'+arr[j].num+'"><input type="hidden" width="'+arr[j].width+'" height="'+arr[j].height+'" w="'+arr[j].w+'" h="'+arr[j].h+'" x="'+arr[j].x+'" y="'+arr[j].y+'" current_page="'+arr[j].current_page+'" /><span>'+arr[j].num+'</span>( 第<em>'+arr[j].current_page+'</em>页 )</li>';
    	$('body').find('#all-section-list').append(jj_html);
    }
    console.log(new_arr);
    if(on_checked_info){
    	var new_info=[];
    	for (var dd = 0; dd < on_checked_info.length; dd++) {
    		if (current_page==on_checked_info[dd].current_page) {
					new_info.push(on_checked_info[dd]);
    		};

    	};
    	// append_select(on_checked_info.length,on_checked_info);
			for (var i = 0; i < (new_arr.length); i++) {
	    	var l_width=new_arr[i].w/1044;
		    var l_height=new_arr[i].h/734;
		    // console.log(new_arr[i].w,l_width,l_height)
				var first_string="<div class='select-area' style='position: absolute;left:"+(new_arr[i].x/l_width)+"px;top:"+(new_arr[i].y/l_height)+"px;"+"width:"+(new_arr[i].width/l_width)+"px;height:"
			      +(new_arr[i].height/l_height)+"px' id='select-area"+(i+new_info.length+1)+"' name='"+(i+new_info.length+1)+"'><a href='javascript:;' class='edit-item'>编辑</a><i class='iconfont close'>&#xe61b;</i><span class='title' " +
			  		" style='background-color: red; color: rgb(255, 255, 255); opacity: 1; position: absolute; left: 6px; top: 2px;'>"+(i+new_info.length+1)+"</span>'</div>";
	  		$('.bg-img').append(first_string);
	  		$(".select-area").draggable({containment: ".bg-img", scroll: false });;
	      $(".select-area").resizable({ handles: "n, e, s, w, ne, se, sw, nw" });
	    };
    }else{
    	console.log(99)
    	$('.bg-img').html('');
			$('.bg-img').append('<div class="crop">题组切割</div>');
    	for (var i = 0; i < new_arr.length; i++) {
	    	var l_width=new_arr[i].w/1044;
		    var l_height=new_arr[i].h/734;
		    // console.log(new_arr[i].w,l_width,l_height)
				var first_string="<div class='select-area' style='position: absolute;left:"+(new_arr[i].x/l_width)+"px;top:"+(new_arr[i].y/l_height)+"px;"+"width:"+(new_arr[i].width/l_width)+"px;height:"
			      +(new_arr[i].height/l_height)+"px' id='select-area"+(i+1)+"' name='"+i+"'><a href='javascript:;' class='edit-item'>编辑</a><i class='iconfont close'>&#xe61b;</i><span class='title' " +
			  		" style='background-color: red; color: rgb(255, 255, 255); opacity: 1; position: absolute; left: 6px; top: 2px;'>"+(i+1)+"</span>'</div>";
	  		$('.bg-img').append(first_string);
	  		$(".select-area").draggable({containment: ".bg-img", scroll: false });;
	      $(".select-area").resizable({ handles: "n, e, s, w, ne, se, sw, nw" });
	    };
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
    img_width = img_width * 1.25;
    img_height = img_height * 1.25;
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
  });
  //缩小
  $('#small').click(function(){
    var img_width = $('.img-box img').width();
    var img_height = $('.img-box img').height();
    img_width = img_width / 1.25;
    img_height = img_height / 1.25;
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
  });



  // 左侧区域切换
  $('.left-op ul li.opp').on('click', function() {
  	var type_num;
  	$(this).addClass('active').siblings().removeClass('active');
	  var opp_index = $(this).index();
	  //判断是否为检查文件(没有遮罩层)
    if(opp_index==0){
    	$(".bg-img").removeClass('dd');
    	$('.bg-img').hide();
    	requst_ajax();
    }else{
    	 requst_ajax();
    	 $('.bg-img').show();
    	 // $(".bg-img").addClass('dd');
    	 // get_select_info();
    }
  });

 //添加区域块
  function append_select(eg,arr){
  	console.log(eg,arr);
  	var is_arr_info = JSON.parse(localStorage.getItem("data_arr"+index_id+""));
		console.log(is_arr_info)
    $('.bg-img').html('');
    if(arr.length && arr[eg-1].crop_type==1){
    	$('.bg-img').html('');
    }
    if(arr.length && arr[eg-1].crop_type==4){
    	if(is_arr_info){
			console.log(is_arr_info,is_arr_info.length)
			var current_page =parseInt($('.page .on').text());
			var new_is_arr=[];
			for (var ff = 0; ff < is_arr_info.length; ff++) {
				if(current_page==is_arr_info[ff].current_page){
					new_is_arr.push(is_arr_info[ff])
				}
			};
			append_first(new_is_arr);
    	}
    	// else{
    	// 	$('.bg-img').html('');
    	// }
    }
    if(arr.length==0&&$('.has-bg').hasClass('active')){
    	if(is_arr_info){
			console.log(is_arr_info,is_arr_info.length)
			var current_page =parseInt($('.page .on').text());
			var new_is_arr=[];
			for (var ff = 0; ff < is_arr_info.length; ff++) {
				if(current_page==is_arr_info[ff].current_page){
					new_is_arr.push(is_arr_info[ff])
				}
			};
			append_first(new_is_arr);
    	}

    }
    var current_page =parseInt($('.page .on').text());
    console.log(current_page);
    var new_arr=[];
    for(var i = 0;i < eg; i++){
    	if(current_page==arr[i].current_page){
    		console.log(i)
    		new_arr.push(arr[i]);
    		console.log(new_arr);
    		console.log(new_arr.length)

    	}
    }
		for (var j = 0; j < new_arr.length; j++) {
  		if(arr[eg-1].crop_type==4){
  			var select_area_a='<div id="select-area'+(j+1)+'" style="width:'+(new_arr[j].width)/(new_arr[j].w/1044)+'px;height:'+(new_arr[j].height)/(new_arr[j].h/734)+'px;left:'+(new_arr[j].x)/(new_arr[j].w/1044)+'px;top:'+(new_arr[j].y)/(new_arr[j].h/734)+'px" class="select-area" name="'+(j+1)+'" answer-id="'+new_arr[j].answer_id+'" data-id="'+new_arr[j].id+'"><a href="javascript:;" class="edit-item">编辑</a><i class="iconfont close">&#xe61b;</i><span class="title" style="background-color: red; color: rgb(255, 255, 255); opacity: 1; position: absolute; left: 6px; top: 0px;">'+new_arr[j].index+'</span></div>';
  		}
  		if(arr[eg-1].crop_type==1){
				var select_area_a='<div id="select-area'+(j+1)+'" style="width:'+(new_arr[j].width)/(new_arr[j].w/1044)+'px;height:'+(new_arr[j].height)/(new_arr[j].h/734)+'px;left:'+(new_arr[j].x)/(new_arr[j].w/1044)+'px;top:'+(new_arr[j].y)/(new_arr[j].h/734)+'px" class="select-area" name="'+(j+1)+'" answer-id="'+new_arr[j].answer_id+'" data-id="'+new_arr[j].id+'"><i class="iconfont close">&#xe61b;</i><span class="title" style="background-color: red; color: rgb(255, 255, 255); opacity: 1; position: absolute; left: 6px; top: 0px;">'+new_arr[j].index+'</span></div>';
			}
			$('.bg-img').append(select_area_a);
			//$('.bg-img div').eq(i).addClass('select-area');
      var select_area = $('.select-area');
      //添加区域块的id
      // $(select_area[j]).attr('id', 'select-area' + (j+1));
      //区域可拖动
      console.log($(select_area[j]))
      select_area.draggable({containment: ".bg-img", scroll: false });
      //区域可各个方向缩放(上下左右四角)
      select_area.resizable({ handles: "n, e, s, w, ne, se, sw, nw" });
      //获取区域的位置
      // console.log(arr[j].width)
      // var select_width = new_arr[j]['width'];
      // var select_height = new_arr[j]['height'];//140
      // var select_left = new_arr[j]['x'];
      // var select_top = new_arr[j]['y'];
			// $('.img-box img, .bg-img').css({
			// 	'width': arr[0].w+'px',
			// 	'height': arr[0].h+'px'
			// });
			// $('.img-box .bg-img').css('marginTop', -arr[0].h+'px');

      // //获取当前试卷的宽度和高度比例
      // var l_width=new_arr[j].w/1044;
      // var l_height=new_arr[j].h/734;
      // console.log(l_width,l_height)
      // //显示区域所在位置
      // $(select_area[j]).css({
      //   "width": select_width/l_width + 'px',
      //   "height": select_height/l_height + 'px',
      //   "left": select_left/l_width + 'px',
      //   "top": select_top/l_height + 'px'
      // });

		};
    //如果区域块的数量大于2，显示区域块的个数，添加span_title
    // for(i = 0;i < eg;i++){
    //   var span_title="<span class='title' " + " style='background-color: red; color: rgb(255, 255, 255); opacity: 1; position: absolute; left: 6px; top: 0px;'>"+(i+1)+"</span>";
    //   $('.select-area').eq(i).append(span_title);
    // }
  }

	// 获取当前区域块信息
	function get_select_info(){
		// 获取图片id
		// var scanner_image_id = $('.img-box img').attr('data-id');
	  // 获取当前页数
	  var current_page=[];
	  var page_list = $('.page a');
	  for (var pp = 0; pp < page_list.length; pp++) {
	  	var page_a_num = parseInt($(page_list[pp]).text());
	  	current_page.push(page_a_num)
	  };
	  // var current_page =parseInt($('.page .on').text());
	  // 获取区域类型
	  var crop_type;
	  if($('.hide-sec').hasClass('active')){
			crop_type=1;
	  }
	  if($('.has-bg').hasClass('active')){
			crop_type=4;
	  }
		$.ajax({
		  type: "GET",
		  async:false,
		  url: ajaxIp+"/api/v2/section_crops",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{
		  	'crop_type':crop_type,
		  	'exam_subject_batch_id':bath_id,
		  	'current_page':current_page
		  },
		  success: function(data){
		  	console.log(data,crop_type);
		  	on_checked_info = data;
		  	show_select_info(data);
		  	if(crop_type==1){
		  		// $('.bg-img').hide();
		  		// $('.bg-img').show();
    			$('.bg-img').addClass('bg-type-hide').removeClass('bg-type-sec');
    			if(!$('.bg-img').hasClass('dd')){
						$('.bg-img').addClass('dd');
    			}
					// drow_rect(".bg-type-hide");
		  	}
		  	if(crop_type==4){
		  		// $('.bg-img').hide();
		  		// $('.bg-img').show();
		    	$('.bg-img').addClass('bg-type-sec').removeClass('bg-type-hide');
					$('.bg-img').append('<div class="crop">题组切割</div>');
					// if(!$('.bg-img').hasClass('dd')){
					// 	$('.bg-img').addClass('dd');
    	// 		}
					// drow_rect(".bg-type-sec");

		  	}
		  	// drow_rect(".dd")
		   },
		   error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login';
		  }
		});
	}
	// 显示区域块信息
	function show_select_info(select_info){
		console.log(select_info,select_info.length);
		// $('.bg-img').html('');
		var select_info_length = select_info.length;
		var select_arr =[];
		for (var i = 0; i < select_info_length; i++) {
			select_arr.push(select_info[i].position);
			select_arr[i].id=select_info[i].id;
			select_arr[i].answer_id=select_info[i].answer_id;
			select_arr[i].answer_setting_ids=select_info[i].answer_setting_ids;
			select_arr[i].index=select_info[i].index;
			select_arr[i].crop_type=select_info[i].crop_type;
			select_arr[i].current_page=select_info[i].current_page;
		};
		console.log(select_arr)
		append_select(select_info_length,select_arr);
	}
	
	var on_checked_info;
	// var check_all_info;
	// 选择题型
	$('body').on('dblclick', '.select-area', function() {
		$(this).find('.edit-item').click();
	});
	$('body').on('click','.edit-item',function() {
		$('.modal-main').animate({'top': '50%','opacity': 1});
		$('.modal-shadow').animate({'opacity': 0},500);
		$('#change-modal').show();
		var p_id = $(this).parent().attr('id');
		var answer_id = $(this).parent().attr('answer-id');
		$('.modal-main').attr('id', p_id);
		$('.modal-main').attr('answer_id', answer_id);
		var parent_id = $(this).parent().attr('data-id');
		console.log(parent_id);
		$('#change-modal').attr('data-id', parent_id);
		if(parent_id==undefined){
			un_id='undefined'
			$('#change-modal').attr('data-id', un_id);

		}

		var p_width = $(this).parent().width();
		var p_height = $(this).parent().height();
		var p_left = $(this).parent().position().left;
		var p_top = $(this).parent().position().top;
		var span_num = parseInt($(this).siblings('.title').text());
		width = p_width;
		height = p_height;
		x = p_left;
		y = p_top;
		num_index = span_num;
		console.log(parent_id)
		if(parent_id){
			console.log(on_checked_info)
			var is_arr = JSON.parse(localStorage.getItem("data_arr"+index_id+""));
			console.log(is_arr)
			// if(!on_checked_info){
			// 	// console.log(89898)
			// 	get_select_info();
			// }
			console.log(on_checked_info);
			$.ajax({
			  type: "GET",
			  async:false,
			  url: ajaxIp+"/api/v2/section_crops/"+parent_id+"",
			  headers: {'Authorization': "Bearer " + isLogin},
			  success: function(data){
			  	console.log(data);
			  	$('.bg-img').removeClass('dd');
					get_select_info();
					drow_rect('.dd');
			  	// check_all_info=data;
			  	show_onchecked_info(data,parent_id);
			   },
			   error: function(){
			      // alert('请稍后从新尝试登录或者联系管理员');
		      	// localStorage.clear();
		      	// window.location.href = './login';
			  }
			});
		}else{
			console.log('iiii')
			$('#item-list').html('');
			get_item_info();
			var is_arr_num = JSON.parse(localStorage.getItem("data_arr_num"+index_id+""));
			var is_on = JSON.parse(localStorage.getItem("data_arr_on"+index_id+""));
			console.log(is_arr_num,is_on)
			if(is_arr_num){
				append_section(is_arr_num);
			}
			// if(is_arr_num&&is_on){
			// 	append_section(is_on);
			// 	// append_section(is_arr_num);
			// }
			$('#type-list').prop("disabled",false);
				$('#type-list').css({
					'opacity': 1,
					'cursor': 'pointer'
				});
		}
		return false;
	// 显示所选择的信息
		// console.log(on_checked_info);
		// var answer_id = $(this).parent().attr('answer-id');
		// console.log(answer_id)
	});
	function show_onchecked_info(info,parent_id){
		console.log(on_checked_info)
		console.log(info,parent_id)
		var answer_id = info.answer_id;
		var li_op = $('#type-list option');
		for (var m = 0; m < li_op.length; m++) {
			var li_op_id = $(li_op[m]).attr('data-id');
			console.log(answer_id,li_op_id)
			// 显示已选的题型和小题号
			if(answer_id==li_op_id){
				console.log(88)
				$('#item-list').html('');
				console.log(m);
				$(li_op[m]).attr('selected', true);
				$(li_op[m]).siblings().attr('selected', false);
				$('#type-list').prop("disabled","disabled");
				$('#type-list').css({
					'opacity': .5,
					'cursor': 'not-allowed'
				});
				get_num_list(answer_id);
				// var on_checked_info_length = on_checked_info.length;
				// var new_arr = [];
				// for (var i = 0; i < on_checked_info_length; i++) {
				// 	if(parent_id==on_checked_info[i].id){
				// 		console.log(on_checked_info[i].answer_setting_ids);
				// 		new_arr=on_checked_info[i].answer_setting_ids;
				// 	}
				// };
				// console.log(new_arr);
				// console.log(new_arr,new_arr.length,typeof(new_arr));
				for (var z = 0; z < info.answer_setting_ids.length; z++) {
					var ll_li = $('#item-list li.num_li');
					var ll_li_length = ll_li.length;
					console.log(ll_li_length,info.answer_setting_ids.length)
					for (var j = 0; j < ll_li_length; j++) {
						var li_id = $(ll_li[j]).find('input').attr('data-id');
						if(info.answer_setting_ids[z] == li_id){
							$(ll_li[j]).find('input').attr('checked', true);
						}
					};
					if(info.answer_setting_ids.length==ll_li_length){
							$('#item-list .all').find('input').attr('checked', true);
						}
				};
			}
		};
		var is_arr_num = JSON.parse(localStorage.getItem("data_arr_num"+index_id+""));
		var is_on = JSON.parse(localStorage.getItem("data_arr_on"+index_id+""));
		console.log(is_arr_num,is_on)
		if(is_arr_num){
			append_section(is_arr_num);
		}else{
			append_section(is_on);
		}
		if (!is_on) {
			console.log(99999);
			append_section_on(on_checked_info);
		};
		var a_answer_id = $('.modal-main').attr('answer_id');
		console.log(a_answer_id,info.answer_setting_ids)
		var new_num_arr=[];
		for (var kk = 0; kk < on_checked_info.length; kk++) {
			if(a_answer_id==on_checked_info[kk].answer_id&&info.answer_setting_ids.sort().toString()==on_checked_info[kk].answer_setting_ids.sort().toString()){
				console.log(88)
				var obb= new Object();
				obb={'sec_num':on_checked_info[kk].current_page +'_'+ on_checked_info[kk].index};
				new_num_arr.push(obb);
			}
		};
		console.log(on_checked_info,new_num_arr);
		var all_list = $('body').find('#all-section-list li')
		for (var ll = 0; ll < new_num_arr.length; ll++) {
			for (var nn = 0; nn < all_list.length; nn++) {
				if(new_num_arr[ll].sec_num==$(all_list[nn]).attr('sec_num')){
					$(all_list[nn]).addClass('on');
				}
			};
		};

		// 获取所有区域块

	}

	function append_section (arr) {
		console.log(arr)
		if(arr){
			$('body').find('#all-section-list').html('');
			for (var j = 0; j < arr.length; j++) {
	    	var jj_html = '<li id="'+arr[j].id+'" sec_num = "'+arr[j].current_page+'_'+arr[j].num+'"><input type="hidden" width="'+arr[j].width+'" height="'+arr[j].height+'" w="'+arr[j].w+'" h="'+arr[j].h+'" x="'+arr[j].x+'" y="'+arr[j].y+'" current_page="'+arr[j].current_page+'" /><span>'+arr[j].num+'</span>( 第<em>'+arr[j].current_page+'</em>页 )</li>';
	    	$('body').find('#all-section-list').append(jj_html);
	    }
    }
	}

	function append_section_on(info){
		if(info){
			$('body').find('#all-section-list').html('');
			for (var j = 0; j < info.length; j++) {
	    	var jj_html = '<li id="'+info[j].id+'" sec_num = "'+info[j].current_page+'_'+info[j].index+'"><input type="hidden" width="'+info[j].position.width+'" height="'+info[j].position.height+'" w="'+info[j].position.w+'" h="'+info[j].position.h+'" x="'+info[j].position.x+'" y="'+info[j].position.y+'" current_page="'+info[j].current_page+'" /><span>'+info[j].index+'</span>( 第<em>'+info[j].current_page+'</em>页 )</li>';
	    	$('body').find('#all-section-list').append(jj_html);
	    }
		}
	}

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
	      	// window.location.href = './login';
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
		console.log(check_all_info)
		var parent_id = $(this).parents('#change-modal').attr('data-id');
		$('#item-list').html('');
		var type_name = $(this).find("option:selected").val();
		var type_id = $(this).find("option:selected").attr('data-id');
		get_num_list(type_id);
		var parent_id = $(this).parents('#change-modal').attr('data-id');
		console.log(parent_id)
		var check_all_info;
		if(parent_id!="undefined"){
			$.ajax({
			  type: "GET",
			  async:false,
			  url: ajaxIp+"/api/v2/section_crops/"+parent_id+"",
			  headers: {'Authorization': "Bearer " + isLogin},
			  success: function(data){
			  	console.log(data);
			  	check_all_info=data;
			   },
			   error: function(){
			      // alert('请稍后从新尝试登录或者联系管理员');
		      	// localStorage.clear();
		      	// window.location.href = './login';
			  }
			});
		}
		if(check_all_info){
		console.log(check_all_info);
		for (var z = 0; z < check_all_info.answer_setting_ids.length; z++) {
			var ll_li = $('#item-list li.num_li');
			var ll_li_length = ll_li.length;
			console.log(ll_li_length,check_all_info.answer_setting_ids.length)
			for (var j = 0; j < ll_li_length; j++) {
				var li_id = $(ll_li[j]).find('input').attr('data-id');
				if(check_all_info.answer_setting_ids[z] == li_id){
					$(ll_li[j]).find('input').attr('checked', true);
				}
			};
			if(check_all_info.answer_setting_ids.length==ll_li_length){
					$('#item-list .all').find('input').attr('checked', true);
				}
		};}
	});

	// 显示题号列表
	function get_num_list(id){
	// 小题序号
		$.ajax({
		  type: "GET",
		  async:false,
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
	      	// window.location.href = './login';
		  }
		});
	}


	function show_num_list(num_info){
		var all_change = '<li class="all"><div class="check-box"><input type="checkbox" id="all-num" class="checkall" name="checkall"><label for="all-num">全部</label></div></li>' ;
		$('#item-list').append(all_change);
		for (var i = 0; i < num_info.length; i++) {
			var all_num = '<li class="num_li num_li_'+i+'"><div class="check-box"><input type="checkbox" data-id="'+num_info[i].id+'" value="'+num_info[i].num+'" id="num-check'+ i +'" class="check" name="num-check"><label for="num-check'+ i +'">'+num_info[i].num+'</label></div></li>';
			$('#item-list').append(all_num);
			if(!num_info[i].choose){
				console.log(999)
				$('.num_li_'+i+'').find('input').removeAttr('name');
				$('.num_li_'+i+'').find('input').prop("disabled","disabled");
				$('.num_li_'+i+'').find('label').css({
					'opacity': .5,
					'cursor': 'not-allowed'
				});
			}
		};


		var disabled_length = $('#item-list').find("input:disabled").length;
		if(num_info.length == disabled_length){
			$('#item-list .all').find('#all-num').prop("disabled","disabled");
			$('#item-list .all').find('label').css({
				'opacity': .5,
				'cursor': 'not-allowed'
			});
		}
	}

		// 题号全选
	$('body').on('click', '#all-num', function() {
		$("input[name='num-check']").prop('checked', this.checked);
	});

	$('body').on('click', 'input[name="num-check"]', function() {
		var $graBox = $("input[name='num-check']");
		$("#all-num").prop("checked",$graBox.length == $("input[name='num-check']:checked").length ? true : false);
	});

	// 选择每题区域块
	$('body').on('click','#all-section-list li',function(){
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
		}else{
			$(this).addClass('on');
		};
	})

	var width;
	var height;
	var x;
	var y;
	var num_index;
	// 确认选择
	$('body').on('click', '#confirm-sub', function() {
		var p_id = $(this).parents('.modal-main').attr('id');
		var w = $('.img-box img').width();
    var h = $('.img-box img').height();
		// 获取图片id
		// var scanner_image_id = $('.img-box img').attr('data-id');
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
		console.log(answer_setting_ids);

		// 所有区域
		var section_ul=[];
		var section_li_length = $('#all-section-list').find(".on").length;
		for (var j = 0; j < section_li_length; j++) {
			section_ul.push($($('#all-section-list').find(".on")[j]).attr('id'));
		};
		// 区域id
		var select_id = $(this).parents('#change-modal').attr('data-id');
		console.log(select_id);
		var positions = [];
		var $section = $('#all-section-list .on');
		for (var mm = 0; mm < $section.length; mm++) {
			var result = $($section[mm]).find('input');
			var s_obj = new Object();
			s_obj['w']=result.attr('w'),
			s_obj['h']=result.attr('h'),
			s_obj['width']=result.attr('width'),
			s_obj['height']=result.attr('height'),
			s_obj['x']=result.attr('x'),
			s_obj['y']=result.attr('y'),
			s_obj['current_page']=result.attr('current_page'),
			positions.push(s_obj)
		};
		var data_arr={
			'positions':JSON.stringify(positions),
	  	'index':num_index,
	  	'exam_subject_batch_id':bath_id,
	  	'crop_type':crop_type,
	  	// 'scanner_image_id':scanner_image_id,
	  	'exam_subject_id':exam_subject_id,
	  	'answer_id':answer_id,
	  	'answer_setting_ids':answer_setting_ids,
	  	'section_ul':section_ul
		}
		console.log(data_arr);

	  // 新建区域
	  if(select_id!='undefined'){
	  	console.log(typeof(select_id));
	  	var position={'w':w,'h':h,'width':width,'height':height,'x':x,'y':y,};
	  	data_arr={
			'position':position,
	  	'index':num_index,
	  	'exam_subject_batch_id':bath_id,
	  	'crop_type':crop_type,
	  	'current_page':current_page,
	  	// 'scanner_image_id':scanner_image_id,
	  	'exam_subject_id':exam_subject_id,
	  	'answer_id':answer_id,
	  	'answer_setting_ids':answer_setting_ids,
	  	'section_ul':section_ul
		}
			update_select_info(select_id,data_arr);
	  }
	  if(select_id=='undefined'){

		  console.log(select_id,!position,!answer_setting_ids.length,!section_ul)
		  if(answer_setting_ids.length && section_ul.length){
		  	console.log(data_arr)
		  	$.ajax({
				  "type": "POST",
				  "async":false,
				  "url": ajaxIp+"/api/v2/section_crops",
				  "headers": {'Authorization': "Bearer " + isLogin},
				  "data": data_arr,
				  success: function(data){
				  	console.log(data,section_ul);
				  	show_id_info(data,section_ul,is_arr);
				   },
				   error: function(){
				      // alert('请稍后从新尝试登录或者联系管理员');
			      	// localStorage.clear();
			      	// window.location.href = './login';
				  }
				});
		  }
		  if(!answer_setting_ids.length){
				alert('请选择题号');
		  }else if(!section_ul.length){
				alert('请选择区域块');
		  }
	  }
	});
	var is_on_info=[];
	function show_id_info(id_info,id_area,is_arr){
		var is_arr = JSON.parse(localStorage.getItem("data_arr"+index_id+""));
		console.log(is_arr)
		var is_on = JSON.parse(localStorage.getItem("data_arr_on"+index_id+""));
		if(is_on){
			is_on_info=is_on;
		}
		for (var i = 0; i < id_info.length; i++) {
			for (var j = 0; j < id_area.length; j++) {
				if(i==j){
					$('#'+id_area[j]+'').attr('data-id',id_info[i].id);
					console.log(id_area[j],id_info[i].id)
					$('#'+id_area[j]+'').attr('answer-id',id_info[i].answer_id);
					for (var q = 0; q < is_arr.length; q++) {
						if(is_arr[q].id==id_area[j]&&is_arr[q].current_page==id_info[i].current_page){
							 is_on_info.push(is_arr[q]);
							 is_arr.splice(q,1);
						}
						console.log(is_arr,is_on_info)
						var storage=window.localStorage;
						storage.setItem("data_arr"+index_id+"",JSON.stringify(is_arr));
						storage.setItem("data_arr_on"+index_id+"",JSON.stringify(is_on_info));
					};
				}
			};
		};
		var is_arr_num = JSON.parse(localStorage.getItem("data_arr_num"+index_id+""));
		console.log(is_arr_num)
	}




	// 删除区域块
	$('body').on('click', '.close', function() {
		$(this).parent().remove();
		num--;
    var current_page =parseInt($('.page .on').text());
    var c_id = $(this).parent().attr('id');
    if($('.bg-img').hasClass('bg-type-sec')){
			var is_arr = JSON.parse(localStorage.getItem("data_arr"+index_id+""));
			console.log('select-num',num,is_arr)
			if(is_arr){
				for (var i = 0; i < is_arr.length; i++) {
					if(c_id==is_arr[i].id&&current_page==is_arr[i].current_page){
						is_arr.splice(i,1);
					}
					var storage=window.localStorage;
					storage.setItem("data_arr"+index_id+"",JSON.stringify(is_arr));
				};
			}
			data_arr_all=is_arr;
			console.log(data_arr_all)


			var is_arr_num = JSON.parse(localStorage.getItem("data_arr_num"+index_id+""));
			console.log('select-num',num,is_arr_num)
			if(is_arr_num){
				for (var i = 0; i < is_arr_num.length; i++) {
					if(c_id==is_arr_num[i].id&&current_page==is_arr_num[i].current_page){
						is_arr_num.splice(i,1);
					}
					var storage=window.localStorage;
					storage.setItem("data_arr_num"+index_id+"",JSON.stringify(is_arr_num));
				};
			}
			data_arr_num=is_arr_num;
			console.log(data_arr_num)
	}


	 	var select_id = $(this).parent().attr('data-id');
	 	console.log(select_id);
	 	if(select_id){
		 	$.ajax({
			  type: "DELETE",
			  async: false,
			  url: ajaxIp+"/api/v2/section_crops/"+ select_id +"",
			  headers: {'Authorization': "Bearer " +  isLogin},
			  success: function(data){
			  	console.log(data);

			  	// 删除储存区域的信息
			  	if($('.bg-img').hasClass('bg-type-sec')){
			  	var is_on = JSON.parse(localStorage.getItem("data_arr_on"+index_id+""));
					console.log('select-num',num,is_on)
					if(is_on){
						console.log(c_id)
						for (var i = 0; i < is_on.length; i++) {
							if(c_id==is_on[i].id&&current_page==is_on[i].current_page){
								is_on.splice(i,1);
								// console.log(c_id,is_on[i].id)
							}
							console.log(is_on);
							var storage=window.localStorage;
							storage.setItem("data_arr_on"+index_id+"",JSON.stringify(is_on));
						};
					}
					data_arr_num=is_on;
					console.log(is_on)
						console.log(88)
						get_select_info();
					}

			   },
			   error: function(){
			      // alert('请稍后从新尝试登录或者联系管理员');
		      	// localStorage.clear();
		      	// window.location.href = './login';
			  }
			});
		}
		return false;
	 });


  var num;
	// 画区域块
	var data_arr_all=[];
	var data_arr_num=[];
	$('body').find('#all-section-list').html('');
  function drow_rect(the_id){//theid表示用作画布的层
    var x_down=0,y_down=0;
    var new_width=0,new_height=0;
    var x_original=0,y_original=0;
    var original_flag=true,down_flag=false;
    var x_point=0,y_point=0;
    var append_string;
    num=$('.bg-img').find(".select-area").length+1;
    console.log(num)
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
        x_point=x_original-$('.bg-img').position().left;
        y_point=y_original-100;
        new_width=x_down-x_original;
        if(new_width<0){//鼠标向左运动
            new_width=-new_width;
            x_point=x_down-$('.bg-img').position().left;
        }
        new_height=y_down-y_original;
        if(new_height<0){ //鼠标向右运动
            new_height=-new_height;
            y_point=y_down-100;
        }
       	$("div[name='"+num+"']").remove();//把前面的层删除，并在后面的代码中生成新的层
     	 	if($('.has-bg').hasClass('active')){
					append_string="<div class='select-area' style='position: absolute;left:"+x_point+"px;top:"+y_point+"px;"+"width:"+new_width+"px;height:"
	          +new_height+"px' id='select-area"+(num)+"' name='"+num+"'><a href='javascript:;' class='edit-item'>编辑</a><i class='iconfont close'>&#xe61b;</i><span class='title' " +
	      	" style='background-color: red; color: rgb(255, 255, 255); opacity: 1; position: absolute; left: 6px; top: 2px;'>"+num+"</span>'</div>";
     	 	}
       	if($('.hide-sec').hasClass('active')){
       	 	append_string="<div class='select-area' style='position: absolute;left:"+x_point+"px;top:"+y_point+"px;"+"width:"+new_width+"px;height:"
            +new_height+"px' id='select-area"+(num)+"' name='"+num+"'><i class='iconfont close'>&#xe61b;</i><span class='title' " +
        	" style='background-color: red; color: rgb(255, 255, 255); opacity: 1; position: absolute; left: 6px; top: 2px;'>"+num+"</span>'</div>";
       	}
        $(the_id).append(append_string);

      }
    }
    console.log(num)

    $(the_id).bind("mousedown",MouseDown);
    $(the_id).bind("mousemove",MouseMove);//事件绑定

    $(".select-area").mousedown(function(){
        $(the_id).unbind("mousemove",MouseMove);//取消事件绑定
    });
    $(".select-area").mouseup(function(){
        $(the_id).bind("mousemove",MouseMove);//事件绑定
    });
    $(the_id).mouseup(function(e){//松开鼠标左键，初始化标志位
      down_flag=false;
      original_flag=true;
      $("div[name='"+num+"']").draggable({containment: ".bg-img", scroll: false });
      $("div[name='"+num+"']").resizable({ handles: "n, e, s, w, ne, se, sw, nw" });


      $("div[name='"+num+"']").mousedown(function(){
      	 	$(the_id).unbind("mousedown",MouseDown);
          $(the_id).unbind("mousemove",MouseMove);//取消事件绑定
          console.log(11111)
      });
      $("div[name='"+num+"']").mouseup(function(){
      	 $(the_id).bind("mousedown",MouseDown);
         $(the_id).bind("mousemove",MouseMove);//事件绑定
         console.log(10000)
      });
      // num++;
      //阻止区域块移动时，num也增加的情况（只有新建的时候才会增减num的值）;
      if($("div[name='"+num+"']").width()!=null){
      	console.log(999)
          num++;
          console.log(num)

      // 如果是题组切割设置

      if($(the_id).hasClass('bg-type-sec')){
      	var w = $('.img-box img').width();
      	var h = $('.img-box img').height();
      	var current_page =parseInt($('.page .on').text());
      	var crop_type = 4;
      	var all_page = $('.page').children().length;
	      // 获取所有区域块
	   		// $('body').find('#all-section-list').html('');
	      var current_page =parseInt($('.page .on').text());

	      $("div[name='"+(num-1)+"']").each(function(){

			    var arr_obj = new Object();
	      	arr_obj['width']=$("div[name='"+(num-1)+"']").width();
	      	arr_obj['height']=$("div[name='"+(num-1)+"']").height();
	      	arr_obj['w']=w;
	      	arr_obj['h']=h;
	      	arr_obj['x']=$("div[name='"+(num-1)+"']").position().left;
	      	arr_obj['y']=$("div[name='"+(num-1)+"']").position().top;
	      	arr_obj['current_page']=current_page;
	      	arr_obj['crop_type']=crop_type;
	      	arr_obj['id']='select-area'+(num-1)+'';
	      	arr_obj['num']=parseInt(num-1);
			  	data_arr_all.push(arr_obj);
			  	console.log(data_arr_all)
			  	var jj_html = '<li id="select-area'+(num-1)+'" sec_num = "'+current_page+'_'+(num-1)+'"><input type="hidden" width="'+$("div[name='"+(num-1)+"']").width()+'" height="'+$("div[name='"+(num-1)+"']").height()+'" w="'+w+'" h="'+h+'" x="'+$("div[name='"+(num-1)+"']").position().left+'" y="'+$("div[name='"+(num-1)+"']").position().top+'" current_page="'+current_page+'" /><span>'+(num-1)+'</span>( 第<em>'+current_page+'</em>页 )</li>';
	      	console.log(jj_html)
	      	$('body').find('#all-section-list').append(jj_html);
	      	// console.log(index_id);
	      	console.log(is_arr_num)
	      	if(is_arr_num){
	      		console.log('is_arr')
	      		data_arr_num=is_arr_num;
	      	}
	      	// var is_on = JSON.parse(localStorage.getItem("data_arr_on"+index_id+""));
	      	// console.log(is_on.length);
	      	if(!is_arr_num&&is_on){
	      		console.log('is_on',is_on)
	      		data_arr_num=is_on;
	      	}
	      	data_arr_num.push(arr_obj);
	      	console.log(data_arr_num)
			  	var storage=window.localStorage;
					storage.setItem("data_arr"+index_id+"",JSON.stringify(data_arr_all));
					storage.setItem("data_arr_num"+index_id+"",JSON.stringify(data_arr_num));
			  });
	            			  	// console.log(data_arr_all)

      }
      }
      // 如果是信息遮蔽设置
      if($(the_id).hasClass('bg-type-hide')){
      	// 获取区域块信息
      	console.log(num)
      	var width = $("div[name='"+(num-1)+"']").width();
      	var height = $("div[name='"+(num-1)+"']").height();
      	console.log(width,height)
      	var p_id =  $("div[name='"+(num-1)+"']").attr('id');
      	var w = $('.img-box img').width();
      	var h = $('.img-box img').height();
      	var x = $("div[name='"+(num-1)+"']").position().left;
      	var y = $("div[name='"+(num-1)+"']").position().top;
      	// var num_index = parseInt($("div[name='"+(num-1)+"']").children('.title').text());
      	var current_page =parseInt($('.page .on').text());
      	var crop_type = 1;
      	var positions=[];
      	var objj = {'w':w,'h':h,'width':width,'height':height,'x':x,'y':y,'current_page':current_page};
				positions.push(objj)
      	var data_arr={
      		'positions':JSON.stringify(positions),
        	// 'index':num_index,
        	'exam_subject_batch_id':bath_id,
        	'crop_type':crop_type,
        	'exam_subject_id':exam_subject_id,
      	}
      	var data_id = $("div[name='"+(num-1)+"']").attr('data-id');
      	console.log(num,data_id,data_arr)
      	if(data_id){
      		console.log(data_id)
					// update_select_info(data_id,data_arr);
      	}else{
      		console.log(data_arr)
	      	$.ajax({
	      	  type: "POST",
	      	  async:false,
	      	  url: ajaxIp+"/api/v2/section_crops",
	      	  headers: {'Authorization': "Bearer " + isLogin},
	      	  data: data_arr,
	      	  success: function(data){
	      	  	console.log(data,data[0].id,p_id);
	      	  	show_hide_info(data,p_id);
	      	   },
	      	   error: function(){
	      	      // alert('请稍后从新尝试登录或者联系管理员');
	            	// localStorage.clear();
	            	// window.location.href = './login';
	      	  }
	      	});
      	}
      }
      // console.log(data_arr_all)

		
    });
	}

	function show_hide_info(info_id,area_id){
		var answer_id =info_id[0].answer_id;
		var data_id = info_id[0].id;
		$('#'+area_id+'').attr('answer-id',answer_id);
		$('#'+area_id+'').attr('data-id',data_id);
	}

	var items_all_info;
	$(document).on('mouseup', '.bg-type-sec .select-area', function() {
		console.log(8888)
		// event.stopPropagation()
		// 更新区域块信息
		var update_select_id = $(this).attr('data-id');
		get_update_show_info(update_select_id);
		var position={};
		var width = $(this).width();
		var height = $(this).height();
		var w = $('.img-box img').width();
    var h = $('.img-box img').height();
		var x = $(this).position().left;
		var y = $(this).position().top;
		var position={'w':w,'h':h,'width':width,'height':height,'x':x,'y':y,};
		var num_index = parseInt($(this).children('.title').text());
		var current_page =parseInt($('.page .on').text());
		var answer_id = $(this).attr('answer-id');
		// var scanner_image_id = $('.img-box img').attr('data-id');
	  var answer_setting_ids=[];
	 //  var items_all_num = items_all_info.length;
		// console.log(items_all_num)
	 //  for (var i = 0; i < items_all_num; i++) {
		// 	answer_setting_ids.push($($('#item-list').find("input[type='checkbox']:checked")[i]).data('id'));
		// };
		// // console.log(class_arr)
		// if($('#item-list').find('#all-num').is(':checked')){
		// 	answer_setting_ids.shift();
		// 	answer_setting_ids;
		// }
		// console.log(answer_setting_ids);
		var crop_type=4;
		var data_arr={
			'position':position,
	  	'index':num_index,
	  	'exam_subject_batch_id':bath_id,
	  	'crop_type':crop_type,
	  	'current_page':current_page,
	  	// 'scanner_image_id':scanner_image_id,
	  	'exam_subject_id':exam_subject_id,
	  	'answer_id':answer_id,
	  	'answer_setting_ids':items_all_info
		}
		console.log(update_select_id)
		if(update_select_id){
			var pre_info;
			$.ajax({
			  type: "GET",
			  async:false,
			  url: ajaxIp+"/api/v2/section_crops/"+update_select_id+"",
			  headers: {'Authorization': "Bearer " + isLogin},
			  success: function(data){
			  	console.log(data);
			  	pre_info = data;
			   },
			   error: function(){
			      // alert('请稍后从新尝试登录或者联系管理员');
		      	// localStorage.clear();
		      	// window.location.href = './login';
			  }
			});
			console.log(data_arr);
			var pre_width = pre_info.position.width;
			var pre_height = pre_info.position.height;
			var pre_x = pre_info.position.x;
			var pre_y = pre_info.position.y;
			if(width-pre_width!=0 || height-pre_height!=0 || x-pre_x!=0 || y-pre_y!=0){
				update_select_info(update_select_id,data_arr);
			}
		}else{
			var c_id=$(this).attr('id');
			var new_data={'num':num_index,'crop_type':crop_type,'id':c_id,'w':w,'h':h,'width':width,'x':x,'y':y,'height':height,'current_page':current_page}
			var is_arr = JSON.parse(localStorage.getItem("data_arr"+index_id+""));
			console.log(is_arr)
			if(is_arr){
			for (var i = 0; i < is_arr.length; i++) {
				if(c_id==is_arr[i].id&&current_page==is_arr[i].current_page){
					is_arr.splice(i,1,new_data);
				}
				var storage=window.localStorage;
				storage.setItem("data_arr"+index_id+"",JSON.stringify(is_arr));
			};
		}
		data_arr_all=is_arr;

		}
	});



	// 遮蔽区域更新
	$(document).on('mouseup', '.bg-type-hide .select-area', function() {
		// event.stopPropagation()
		console.log(999999999)
		// 更新区域块信息
		var update_select_id = $(this).attr('data-id');
		var width = $(this).width();
		var height = $(this).height();
		var w = $('.img-box img').width();
    var h = $('.img-box img').height();
		var x = $(this).position().left;
		var y = $(this).position().top;
		var current_page =parseInt($('.page .on').text());
  	var crop_type = 1;
  	var position={'w':w,'h':h,'width':width,'height':height,'x':x,'y':y,};

  	var data_arr={
  		'position':position,
    	'exam_subject_batch_id':bath_id,
    	'crop_type':crop_type,
    	'current_page':current_page,
    	'exam_subject_id':exam_subject_id,
  	}
		console.log(update_select_id)
		if(update_select_id){
			console.log(data_arr);
			var pre_info;
			$.ajax({
			  type: "GET",
			  async:false,
			  url: ajaxIp+"/api/v2/section_crops/"+update_select_id+"",
			  headers: {'Authorization': "Bearer " + isLogin},
			  success: function(data){
			  	console.log(data);
			  	pre_info = data;
			   },
			   error: function(){
			      // alert('请稍后从新尝试登录或者联系管理员');
		      	// localStorage.clear();
		      	// window.location.href = './login';
			  }
			});
			console.log(data_arr);
			var pre_width = pre_info.position.width;
			var pre_height = pre_info.position.height;
			var pre_x = pre_info.position.x;
			var pre_y = pre_info.position.y;
			if(width-pre_width!=0 || height-pre_height!=0 || x-pre_x!=0 || y-pre_y!=0){
				update_select_info(update_select_id,data_arr);
			}
		}
	});


	function update_select_info(up_id,up_arr){
		console.log(up_arr)
		$.ajax({
		  type: "PUT",
		  url: ajaxIp+"/api/v2/section_crops/"+ up_id +"",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:up_arr,
		  success: function(data){
		  	console.log(data);
		  	// update_show_info(data,select_id);
		   },
		   error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login';
		  }
		});
	}
	function get_update_show_info(select_id){
		if(select_id){
			$.ajax({
			  type: "GET",
			  async:false,
			  url: ajaxIp+"/api/v2/section_crops/"+ select_id +"",
			  headers: {'Authorization': "Bearer " + isLogin},
			  success: function(data){
			  	console.log(data);
			  	items_all_info = data.answer_setting_ids;
			  	console.log(items_all_info)
			   },
			   error: function(){
			      // alert('请稍后从新尝试登录或者联系管理员');
		      	// localStorage.clear();
		      	// window.location.href = './login';
			  }
			});
		}
	}

	// 点击题组切割
	$('body').on('click', '.crop', function() {
		$('.modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-shadow').animate({'opacity': 0},500);
		$('#section-modal').show();
		// var sections = $
		$.ajax({
		  type: "GET",
		  async:false,
		  url: ajaxIp+"/api/v2/section_crops/page_and_section",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'exam_subject_batch_id':bath_id,'crop_type':4},
		  success: function(data){
		  	console.log(data);
		  	show_section_list(data);
		   },
		   error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login';
		  }
		});
	});

	function show_section_list(section_info){
		$('#num-list').html('');
		var section_info_length = section_info.length;
		for (var i = 0; i < section_info_length; i++) {
			var page_num = '<li ><span class="current-left">当前第<a class="on-page">'+section_info[i].current_page+'</a>页：</span><ul class="section-list"></ul></li>'
			$('#num-list').append(page_num);
			$('.section-list').eq(i).html('');
			var num_all = '<li class="all-section"><div class="check-box"><input type="checkbox" id="all-section'+i+'" class="checkall" name="checkall"><label for="all-section'+i+'">全部</label></div></li>';
			$('.section-list').eq(i).append(num_all);
			var section_num = section_info[i].index;
			for (var j = 0; j < section_num.length; j++) {
				var section_page = '<li class="section-li"><div class="check-box"><input type="checkbox" value="'+section_num[j]+'" id="section-check'+ (i*10+j) +'" class="check" name="section-check"><label for="section-check'+ (i*10+j) +'">'+section_num[j]+'</label></div></li>';
				$('.section-list').eq(i).append(section_page);
			};
		};
		// 区域块全选
		$('.section-list li .checkall').click(function() {
			$(this).parents('.all-section').siblings().find("input[name='section-check']").prop('checked', this.checked);
		});

		$('.section-list li.section-li input[name="section-check"]').click(function() {
			var $graBox = $(this).parents('.section-list').find('input[name="section-check"]');

			var checked_length = $(this).parents('.section-list').find("input[name='section-check']:checked").length;

			$(this).parents('.section-li').siblings('.all-section').find('.checkall').prop("checked",$graBox.length == checked_length ? true : false);


			if(checked_length){
				var on_page = $(this).parents('.section-list').parent().find('.on-page').text();
				console.log(on_page)
			}

			if($(this).prop('checked')){
				var label_value = $(this).next().text();
				console.log(label_value)
			}
		
		});
	}


 $("button").click(function(){
		var name;
    $("li").each(function(){
      if($(this).html()){
        alert($(this).text())
        name=$(this).text();
      }
    });
    console.log(name,name.length)
  });




	// 确认题组切割
	$('body').on('click', '#confirm-section', function() {
		var on_page;
		var label_value;
		var tests = [];
		var all_test = [];
		// $('.section-list').each(function(i){
		// 	var obj = new Object();
		// 	var label_values=[];
		// 	if($(this).children('li.section-li').find('input[name="section-check"]:checked')){
		// 		 label_value = $(this).children('li.section-li').find('input[name="section-check"]:checked').next().text();
		// 		 on_page = parseInt($(this).parent().find('.on-page').text());
		// 	}
		// 	label_values=label_value.split("");
		// 	label_values;
		// 	console.log(label_values,on_page)
		// 	obj['current_page']=on_page;
		// 	obj['index']=label_values;
		// 	console.log(obj);
		// 	// tests=obj;
		// 	// console.log(i)
		// 	all_test[i]=obj;
		// 	console.log(all_test)
		// })
		// var sections = all_test;
		// console.log(sections)
		
		var section_list = $('.section-list');
		for (var i = 0; i < section_list.length; i++) {
			var obj = new Object();
			var label_values=[];
			var check_list = $(section_list[i]).children('li.section-li').find('input[name="section-check"]:checked');
			for (var j = 0; j < check_list.length; j++) {
				 label_value = $(check_list[j]).next().text();
				 label_values.push(label_value);
			};
			on_page = $(section_list[i]).parent().find('.on-page').text();
			// console.log(label_values,on_page)
			obj['current_page']=on_page;
			obj['index']=label_values;
			console.log(obj)
			all_test[i]=obj;
			console.log(all_test)

		};
		var sections = all_test;
		console.log(sections)
		$.ajax({
		  type: "POST",
		  url: ajaxIp+"/api/v2/section_crops/cut_images",
		  headers: {'Authorization': "Bearer " + isLogin},
		  data:{'exam_subject_batch_id':bath_id,'sections':sections,'crop_type':4},
		  success: function(data){
		  	console.log(data);
		  	$('.load-bg').show();
		  	var customer_id = $('#wrap').attr('customer_id');
		  	console.log(customer_id)
	  	  var faye = new Faye.Client(fayeIp+'/api/v2/events');
		    faye.subscribe("/cut_images/"+ customer_id +"" , function (data) {
	        console.log(data)
	        if(data.message=='ok'){
						$('.load-bg').hide();
	        }
		    });
		   },
		   error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login';
		  }
		});
	});


})