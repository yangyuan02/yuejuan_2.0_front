$(function(){
var isLogin = localStorage.getItem("token");
	
	var height = $(window).height()-$('#header').height()-$('#footer').height()-180;
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

 
  var docx_id = getUrlParam(url,'docx_id');
  var id = getUrlParam(url,'id');
  var docx_num = getUrlParam(url,'number');
  var exam_subject_id = getUrlParam(url,'exam_subject_id');
  console.log(docx_id);
  console.log(docx_num);
$.ajax({
   	type: "GET",
   	url: ajaxIp+"/api/v2/question_banks?docx_id="+docx_id+"",
  	dataType: "JSON",
  	data:{'limit':null,'page':null},
  	headers: {'Authorization': "Bearer " + isLogin},
  	success: function(data){
  		console.log(data);
  		 var pp='<p>'+data[docx_num].content+'</p>';
  		 console.log(pp);
  		 UE.getEditor('container').setContent(''+pp+'');
  		 // $('#container').append(pp);
  		// for (var i = 0; i < data.length; i++) {
  			
  			// $('#item-ul').append('<li class="items"><i class="item-op "><a href="javascript:;" class="save-btn right"><i class="iconfont">&#xe653;</i>保存</a><a href="javascript:;" class="look-detail right"><i class="iconfont">&#xe699;</i>查看解析</a></i><div class="item-cont editor-enabled" contenteditable="true"><p>'+data[i].content+'</p></div><ul class="bottom-btn"><li><a class="item-edit" data-num="'+i+'"><i class="iconfont">&#xe614;</i>题干编辑</a></li><li><a href="javascript:;" class="item-seg"><i class="iconfont">&#xe636;</i>分割试题</a></li><li><a href="javascript:;" class="item-insert"><i class="iconfont">&#xe601;</i>题组插入</a></li><li><a href="javascript:;" class="item-merge"><i class="iconfont">&#xe689;</i>向下合并</a></li><li><a href="javascript:;" class="grade-set"><i class="iconfont">&#xe630;</i>设定分指</a></li><li><a href="javascript:;" class="item-up"><i class="iconfont">&#xe631;</i>上移</a></li><li><a href="javascript:;" class="item-down"><i class="iconfont">&#xe607;</i>下移</a></li><li><a href="javascript:;" class="item-dele"><i class="iconfont">&#xe616;</i>删除</a></li><li><a href="javascript:;" class="determine bind-item">绑定题组</a></li></ul></li>');
         
         // 
  		// };
    },
    error: function(){
    	// alert('请稍后从新尝试登录或者联系管理员');
    	// localStorage.clear();
    	// window.location.href = './login'
    }
  });
$(".p_top a").click(function(event) {
$(this).attr('href', 'edit_paper?docx_id='+docx_id+'&exam_subject_id='+exam_subject_id+'');

});
//保存题目内容
 $(".edit_bj_btn01").click(function(event) {
  var a=UE.getEditor('container').getContent();
     $.ajax({
         type: "POST",
         url: ajaxIp + "/api/v2/question_banks/update_question",
         data: {
             'id':id,
             'content': a,
         },
         headers: { 'Authorization': "Bearer " + isLogin },
         success: function(data) {



         },
         error: function() {

         }
     });
     alert(UE.getEditor('container').getContent());

 });




})