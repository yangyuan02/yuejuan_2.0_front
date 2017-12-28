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
  var exam_name = getUrlParam(url,'exam_name');
  var subject_name = getUrlParam(url,'subject_name');
  // var left_tab = getUrlParam(url,'left_tab');
  // console.log(docx_id);
  // console.log(docx_num);
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
// $(this).attr('href', 'edit_paper?docx_id='+docx_id+'&exam_subject_id='+exam_subject_id+'&exam_name='+exam_name+'&subject_name='+subject_name+'&left_tab='+left_tab+'');
 history.go(-1);
    return false;
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
  // var a=UE.getEditor('container').getContentTxt();
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
          alert("保存成功");
          // window.location.reload();
         },
         error: function() {

         }
     });
     // alert(UE.getEditor('container').getContent());

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
          // window.location.reload();

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
         // window.location.reload();


         },
         error: function() {

         }
     });


     $(".edit_li_div02").slideUp(500);
});
$(".edit_li_div02_btn02").click(function(event) {       
     $(".edit_li_div02").slideUp(500);
});
// 设置难度
$(".dif_btn").click(function(event) {
  $(".dif_input").show();
  $(".dif_btn").hide();
});

$(".dif_input button").click(function(event) {
  var a=$(".dif_input input").val();

     $.ajax({
         type: "POST",
         url: ajaxIp + "/api/v2/question_banks/update_question",
         data: {
             'id':id,
             'difficulty_level': a,
         },
         headers: { 'Authorization': "Bearer " + isLogin },
         success: function(data) {
         console.log(data);
         // window.location.reload();

         },
         error: function() {

         }
     });
      $(".dif_input").hide();
      $(".dif_btn").show();
});
//添加知识点
$(".edit_zs li i").click(function(event) {
 $(this).parent('li').children('ul').toggle();
});
// var a_edit_zs =$(".edit_zs").children('li');
//             a_edit_zs.children('i').click(function(event) {
              
//               $(this).children('i').toggle();
//             });
//             var b_edit_zs02 =$(".edit_zs").children('li').children('li');
//            b_edit_zs02.children('i').click(function(event) {
             
//               $(".edit_zs03").toggle();
//             });
//             var c_edit_zs03 =$(".edit_zs").children('li').children('li').children('li');
//            c_edit_zs03.children('i').click(function(event) {
//               /* Act on the event */
//               // $(this).html("&#xe6ca;");
//               // $(this).addClass('box01');
//               // alert($(this).attr("id"));
//               if($(this).attr("id")==undefined){
//                        $(this).attr("id","i_class");
//                       // $(this).attr("class");
//                        $(".edit_li03_box").append('<a id="'+$(this).parent("li").attr("class")+'"style="width:82px;height:29px;background:#31bc91;display: block;line-height: 29px;text-align:center;margin:12px 0px 0px 12px;float:left;color:#f5f5f5;cursor: pointer;">'+$(this).next().text()+'<i data-id="'+$(this).parent("li").attr("class")+'"class="edit_li03_box_a_i iconfont" style="font-size: 12px;margin-left:12px;">&#xe61b;</i></a>')
//               }else{
//                        $(this).removeAttr("id");
//                         // alert($(this).parent("li").attr("class"));
//                        $('#'+$(this).parent("li").attr("class")+'').remove();
//               }
              
//               // alert($(this).next().text());
              
              
//             });
            $('.edit_li03_box').on('click', '.edit_li03_box_a_i', function(event) {
              // alert();
              $(this).parent("a").remove();
              // alert($('.'+$(this).attr("data-id")+'').text());
              $('.'+$(this).attr("data-id")+'').children('i').removeAttr("id");
              
            });
            $(".edit_li_div03_btn01").click(function(event) {
              /* Act on the event */
              $(".edit_li_div03").slideUp(500);
            });
            $(".edit_li_btn03").click(function(event) {
              /* Act on the event */
              $(".edit_li_div03").slideDown(500);
              var type="standard_edition";
          $.ajax({
         type: "GET",
         url: ajaxIp + "/api/v2/sync_knowledge_points",
         data: {
             'grade_id':14,
             'subject_id': 11,
              'version':type,
         },
         headers: { 'Authorization': "Bearer " + isLogin },
         success: function(data) {
         console.log(data);
         // window.location.reload();
         var a_length=data.length;
         for(var i=0;i<data.length;i++){
           $(".edit_zs").append('<li style="border:none;line-height:38px;color: #999999;"><i class="iconfont" style="margin-left:10px;margin-right:10px;">&#xe6ca;</i>'+data[i].name+'</li>')
           if(data[i].children!==undefined){
            $(".edit_zs li").eq(i).append('<ul></ul>');
            // for(var i1=0;i1<data.length;i1++){

            // }
           }
         }
         // console.log(data[0].children[0].children[0].children);
         },
         error: function() {

         }


     });

            });










})