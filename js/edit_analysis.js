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
$(".list_dif").html(" ");
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
         var c=data.difficulty_level
        
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
           var dif_num=Number(c);
           console.log(dif_num);
             // $(".list_dif").append('<ul></ul>');
             if(dif_num>0.86){
              var a=1;
             }
             if(dif_num>0.71&&dif_num<0.86){
              var a=2;
             }
             if(dif_num>0.61&&dif_num<0.71){
              var a=3;
             }
             if(dif_num>0.41&&dif_num<0.61){
              var a=4;
             }
             if(dif_num<0.41){
              var a=5;
             }
             console.log(a);
             for(var i=0;i<5;i++){
                if(i<a){
                 $(".list_dif").append('<i class="iconfont" style="font-size:20px;">&#xe600;</i>')
                }else if(a<i||a==i){
                  $(".list_dif").append('<i class="iconfont"  style="font-size:20px;">&#xe639;</i>')
                }
             }

         }
         },
         error: function() {

         }
     });












})