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
// $.ajax({
//    	type: "GET",
//    	url: ajaxIp+"/api/v2/question_banks?docx_id="+docx_id+"",
//   	dataType: "JSON",
//   	data:{'limit':null,'page':null},
//   	headers: {'Authorization': "Bearer " + isLogin},
//   	success: function(data){
//   		console.log(data);
//   		 var pp='<p>'+data[docx_num].content+'</p>';
//   		 console.log(pp);
//   		 UE.getEditor('container').setContent(''+pp+'');
  		
//     },
//     error: function(){
    
//     }
//   });
$(".main_back a").click(function(event) {
$(this).attr('href', 'edit_paper?docx_id='+docx_id+'&exam_subject_id='+exam_subject_id+'');

});
//获取题目内容，答案。。。
 $.ajax({
         type: "POST",
         url: ajaxIp + "/api/v2/question_banks/update_question",
         data: {
             'id':id,
            
         },
         headers: { 'Authorization': "Bearer " + isLogin },
         success: function(data) {
         console.log(data);
         var a=data.content;
         var b=data.answer;
         var c=data.difficulty_level;
         var d=data.analysis;
       
        $(".main_content").html(a);
         //答案
         if(b!==undefined){
             $(".list_ans").html(b);
         }
         //解析
          if(d!==undefined){
               $(".main_analysis_bottom").html(d);
         }
         //难度
         if(c!==undefined){
             $(".list_dif").html(c);
         }
         },
         error: function() {

         }
     });












})