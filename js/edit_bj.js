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
$(".p_top a").click(function(event) {
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
         console.log(b);
         UE.getEditor('container').setContent(''+a+'');
         //答案
         if(b!==undefined){
           UE.getEditor('container02').setContent(''+b+'');
         }
         //解析
          if(d!==undefined){
           UE.getEditor('container03').setContent(''+d+'');
         }
         //难度
         if(c!==undefined){
           $(".dif_input input").val(c);
         }
         },
         error: function() {

         }
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
         console.log(data);
          window.location.reload();

         },
         error: function() {

         }
     });
     alert(UE.getEditor('container').getContent());

 });
 //答案输入
$(".edit_li_btn01").click(function(event) {
          /* Act on the event */
          $(".edit_li_div01").slideDown(500);
});

$(".edit_li_div01_btn01").click(function(event) {
 
 $(".edit_li_div01").slideUp(500);

var a=UE.getEditor('container02').getContentTxt();

     $.ajax({
         type: "POST",
         url: ajaxIp + "/api/v2/question_banks/update_question",
         data: {
             'id':id,
             'answer': a,
         },
         headers: { 'Authorization': "Bearer " + isLogin },
         success: function(data) {
         console.log(data);
          window.location.reload();

         },
         error: function() {

         }
     });


 });
$(".edit_li_div01_btn02").click(function(event) {
 
 $(".edit_li_div01").slideUp(500);
 });
//答案解析
$(".edit_li_btn02").click(function(event) {
        
$(".edit_li_div02").slideDown(500);
});
$(".edit_li_div02_btn01").click(function(event) { 

var a=UE.getEditor('container03').getContent();

     $.ajax({
         type: "POST",
         url: ajaxIp + "/api/v2/question_banks/update_question",
         data: {
             'id':id,
             'analysis': a,
         },
         headers: { 'Authorization': "Bearer " + isLogin },
         success: function(data) {
         console.log(data);
         window.location.reload();


         },
         error: function() {

         }
     });


     $(".edit_li_div02").slideUp(500);
});
$(".edit_li_div02_btn02").click(function(event) {       
     $(".edit_li_div02").slideUp(500);
});
//////
// 设置难度
// $(".dif_btn").click(function(event) {
//   $(".dif_input").show();
//   $(".dif_btn").hide();
// });

// $(".dif_input button").click(function(event) {
//   var a=$(".dif_input input").val();

//      $.ajax({
//          type: "POST",
//          url: ajaxIp + "/api/v2/question_banks/update_question",
//          data: {
//              'id':id,
//              'difficulty_level': a,
//          },
//          headers: { 'Authorization': "Bearer " + isLogin },
//          success: function(data) {
//          console.log(data);
//          window.location.reload();

//          },
//          error: function() {

//          }
//      });
//       $(".dif_input").hide();
//       $(".dif_btn").show();
// });











})