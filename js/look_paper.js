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
		  url: ajaxIp+"/api/v2/exam_subject_batches/"+bath_id+"/scanner_images",
		  headers: {'Authorization': "Bearer " + isLogin},
		  success: function(data){
		  	console.log(data);
		  	$('#num').text(data.total);
		   },
		   error: function(){
		      // alert('请稍后从新尝试登录或者联系管理员');
	      	// localStorage.clear();
	      	// window.location.href = './login.html';
		  }
		});
	}

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
        "height":img_height + 'px'
    });
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
      "height":img_height + 'px'
    });
  });
  // 左侧区域切换
  $('.left-op ul li.opp').on('click', function() {
  	$(this).addClass('active').siblings().removeClass('active');
  });
})