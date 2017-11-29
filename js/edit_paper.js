$(function(){
	var isLogin = localStorage.getItem("token");
	
	var height = $(window).height()-$('#header').height()-$('#footer').height()-180;
	$('.edit-paper-cont').css({
		// 'height': height,
		'min-height': height
	});

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

  var docx_id = getUrlParam(url,'id');
  console.log(docx_id)

 	$.ajax({
   	type: "GET",
   	url: ajaxIp+"/api/v2/question_banks?docx_id="+docx_id+"",
  	dataType: "JSON",
  	data:{'limit':10,'page':1},
  	headers: {'Authorization': "Bearer " + isLogin},
  	success: function(data){
  		console.log(data);
  		// for (var i = 0; i < data.length; i++) {
  		// 	var pp='<p>'+data[i].content+'</p>';
  		// 	$('.word-import-right').append(pp);

  		// };
    },
    error: function(){
    	// alert('请稍后从新尝试登录或者联系管理员');
    	// localStorage.clear();
    	// window.location.href = './login'
    }
  });
})