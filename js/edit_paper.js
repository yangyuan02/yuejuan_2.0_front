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

  var docx_id = getUrlParam(url,'docx_id');
  var exam_subject_id = getUrlParam(url,'exam_subject_id');
  console.log(docx_id)


 	$.ajax({
   	type: "GET",
   	url: ajaxIp+"/api/v2/question_banks?docx_id="+docx_id+"",
  	dataType: "JSON",
  	data:{'limit':null,'page':null},
  	headers: {'Authorization': "Bearer " + isLogin},
  	success: function(data){
  		console.log(data);
  		for (var i = 0; i < data.length; i++) {
        var nub=i+1;
  			// var pp='<p><a class="list_nub">'+nub+'.</a>'+data[i].content+'</p>';
        // var pp='<p>'+data[i].content+'</p>';
  			$('#item-ul').append('<li class="items"><i class="item-op "><a href="javascript:;" class="save-btn right"><i class="iconfont">&#xe653;</i>保存</a><a href="javascript:;" class="look-detail right"  data-num="'+i+'"  data-id="'+data[i].id+'"><i class="iconfont">&#xe699;</i>查看解析</a></i><div class="item-cont editor-enabled" contenteditable="true" data-id="'+data[i].id+'">'+data[i].content+'</div><ul class="bottom-btn"><li><a class="item-edit" data-num="'+i+'"  data-id="'+data[i].id+'"><i class="iconfont">&#xe614;</i>题干编辑</a></li><li><a href="javascript:;" class="item-seg"><i class="iconfont">&#xe636;</i>分割试题</a></li><li><a href="javascript:;" class="item-insert"><i class="iconfont">&#xe601;</i>题组插入</a></li><li><a href="javascript:;" class="item-merge"><i class="iconfont">&#xe689;</i>向下合并</a></li><li><a href="javascript:;" class="grade-set"><i class="iconfont">&#xe630;</i>设定分指</a></li><li><a href="javascript:;" class="item-up"><i class="iconfont">&#xe631;</i>上移</a></li><li><a href="javascript:;" class="item-down"><i class="iconfont">&#xe607;</i>下移</a></li><li><a href="javascript:;" class="item-dele" data-num="'+i+'" data-id="'+data[i].id+'"><i class="iconfont">&#xe616;</i>删除</a></li><li><a href="javascript:;" class="determine bind-item" data-id="'+data[i].id+'">绑定题组</a></li></ul></li>');
         
         // $('#item-ul').append(pp);
  		};
    },
    error: function(){
    	// alert('请稍后从新尝试登录或者联系管理员');
    	// localStorage.clear();
    	// window.location.href = './login'
    }
  });
     $("#item-ul").on('click', '.item-edit', function(event) {
       var a=$(this).attr("data-num");
        var b=$(this).attr("data-id");
       $(this).attr('href', 'edit_bj?docx_id=' +docx_id+ '&number='+a+'&exam_subject_id='+exam_subject_id+'&id='+b+'');
     
     });

   //绑定题组
   //题组选择
    $(".sub_bd02_ul02 ").on('click', 'li', function(event) {
        $(".sub_bd_t").attr("data-answer",$(this).attr("data-id"));
         $(".sub_bd_t").attr("data-question",$(".sub_bd").attr("data-id"));

        $(this).addClass('sub_bd02_li').siblings().removeClass('sub_bd02_li');
        });
    $("#item-ul").on('click', '.bind-item', function(event) {
      $(".sub_bd_t").attr("data-answer"," ");
      $(".sub_bd_t").attr("data-question"," ")
       $.ajax({
                  type: "POST",
                  url: ajaxIp+"/api/v2/answers/answers_for_exam_subject",
                  data:{'exam_subject_id':exam_subject_id},
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){
                   $(".sub_bd02_ul01").html(" ");
                   $(".sub_bd02_ul02").html(" ");
                    console.log(data);
                    var a=data.length;
                    for(var i=0;i<a;i++){
                       $(".sub_bd02_ul01").append('<li><input value="'+data[i].name+'"></li>');
                       $(".sub_bd02_ul02").append('<li data-id="'+data[i].id+'"><i class="iconfont" style="">&#xe64b;</i></li>');
                    }
                  },
                error: function(){
    
                 }
               });
       $(".sub_bd").attr("data-id",$(this).attr("data-id")); 
       $(".sub_bd").show(); 
       $(".layer").css("height", $(document).height());
       $(".layer").show();

     });
   $(".sub_bd_p_div").click(function(event) {
      $(".sub_bd").hide();
      $(".layer").hide();
   });
   //绑定确定
  $(".sub_bd_t").click(function(event) {
      var a=parseInt($(".sub_bd_t").attr("data-answer"));
      var b=parseInt($(".sub_bd_t").attr("data-question"));
      if(isNaN(a)){ //判断a是否等于nan只能用isNaN(a)；不能用a=NaN;
           alert("请选择题组？");
           }else{
            $.ajax({
                  type: "POST",
                  url: ajaxIp+"/api/v2/question_banks/bind_answer",
                  data:{'docx_id':docx_id,
                  'answer_id':a,
                  'question_bank_id':b,
                  'exam_subject_id':exam_subject_id,
                },
                headers: {'Authorization': "Bearer " + isLogin},
                success: function(data){
                  
                   
                    
                  },
                error: function(){
    
                 }
               });
              $(".sub_bd").hide();
              $(".layer").hide();
      }
   });
   //绑定取消
  $(".sub_bd_f").click(function(event) {
      $(".sub_bd").hide();
      $(".layer").hide();
   });
    //题组设置
     $(".set-item").click(function(event) {
      $(".sub_sz").show();
      $(".layer").css("height", $(document).height());
      $(".layer").show();
       $.ajax({
                  type: "POST",
                  url: ajaxIp+"/api/v2/question_banks/question_answers",
                  data:{
                  'exam_subject_id':exam_subject_id,
                  },
                headers: {'Authorization': "Bearer " + isLogin},
                success: function(data){
                  console.log(data);
                   
                    
                  },
                error: function(){
    
                 }
               }); 






   });

$(".sub_sz_p_div").click(function(event) {
      $(".sub_sz").hide();
      $(".layer").hide();
   });
  $(".sub_sz_p02 button").click(function(event) {
     $(".sub_sz").hide();
      $(".layer").hide();
   });
  //题组插入
  $("#item-ul").on('click', '.item-insert', function(event) {
       $(".title_in").show(); 
       $(".layer").css("height", $(document).height());
       $(".layer").show();

     });
  $(".title_on").click(function(event) {
    var a=$(".title_in_p02 select").children('option:selected').html();
    var b=$(".title_in_p03 input").val();
    $.ajax({
                  type: "POST",
                  url: ajaxIp+"/api/v2/question_banks/add_answer",
                  data:{
                  'exam_subject_id':exam_subject_id,
                  'item':a,
                  'name':b,
                  },
                headers: {'Authorization': "Bearer " + isLogin},
                success: function(data){
                  console.log(data);
                   
                    
                  },
                error: function(){
    
                 }
               });
               console.log(); 
    

  });

   $(".title_in_div").click(function(event) {
         $(".title_in").hide();
         $(".layer").hide();
   });
  $(".title_in_p04 button").click(function(event) {
     $(".title_in").hide();
      $(".layer").hide();
   });
  //设定分值
  $("#item-ul").on('click', '.grade-set', function(event) {
       $(".score_change").show(); 
       $(".layer").css("height", $(document).height());
       $(".layer").show();

     });

$(".score_change_div").click(function(event) {
     $(".score_change").hide();
      $(".layer").hide();
   });
  $(".score_change_p04 button").click(function(event) {
     $(".score_change").hide();
      $(".layer").hide();
   });
  //
$(".edit-save").click(function(event) {
    
  // list_nub()
   });
function list_nub(){
 var a =$("#item-ul .items").length-1;
    console.log(a);   
    for(var i=0;i<a;i++){
      var nub=i+1;
      $("#item-ul .items").eq(i).find('.item-edit').attr("data-a",i);
      $("#item-ul .items").eq(i).find('.list_nub').html(''+nub+'.');
    }
}
//列表的操作
function save(id,main){
 $.ajax({
         type: "POST",
         url: ajaxIp + "/api/v2/question_banks/update_question",
         data: {
             'id':id,
             'content':main,
         },
         headers: { 'Authorization': "Bearer " + isLogin },
         success: function(data) {
         console.log(data);
          // window.location.reload();
         },
         error: function() {

         }
     });
      }
           //上移
        
        $(".item-group-box").on('click', '.item-up', function(event) {
          // alert($(this).parent().parent().prev().html());
          var a=$(this).parent().parent().prev().html();
          var b=$(this).parent().parent().parent().prev().children('.item-cont').html();
          var c=$(this).parent().parent().prev().attr("data-id");
          var d=$(this).parent().parent().parent().prev().children('.item-cont').attr("data-id");
          

          $(this).parent().parent().parent().prev().children('.item-cont').html(a);
          $(this).parent().parent().prev().html(b);
          save(c,b);
          save(d,a);
           // list_nub();
          });
          //下移
          $(".item-group-box").on('click', '.item-down', function(event) {
          // alert($(this).parent().parent().prev().html());
          var a=$(this).parent().parent().prev().html();
          var b=$(this).parent().parent().parent().next().children('.item-cont').html();
          var c=$(this).parent().parent().prev().attr("data-id");
          var d=$(this).parent().parent().parent().next().children('.item-cont').attr("data-id");
          
          $(this).parent().parent().parent().next().children('.item-cont').html(a);
          $(this).parent().parent().prev().html(b);
          save(c,b);
          save(d,a);
          // list_nub();        
            });

          //删除
          $(".item-group-box").on('click', '.item-dele', function(event) {
          
            $(".layer").css("height", $(document).height());
            $(".layer").show();

            $(".list_remover").show();
            $(".list_remover").attr("data-num",$(this).attr("data-num"));
             $(".list_remover").attr("data-id",$(this).attr("data-id"));
            // $(this).parent().parent().parent().remove();
            // 
          });
          //确定
         
          $(".list_remover_on").click(function(event) {
            var a=parseInt($(".list_remover").attr("data-num"));
            var b=parseInt($(".list_remover").attr("data-id"));
             $("#item-ul li").eq(a).remove();
              $(".layer").hide();
            $(".list_remover").hide();

             $.ajax({
                  type: "POST",
                  url: ajaxIp+"/api/v2/question_banks/delete",
                  data:{'id':b},
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){
                   
                    window.location.reload()
                  },
                error: function(){
    
                 }
               });
       
            //list_again();
            //list_nub();
            
          });
          //取消
           $(".list_remover_off").click(function(event) {
           $(".layer").hide();
            $(".list_remover").hide();
          });
          //向下合并
        $(".item-group-box").on('click', '.item-merge', function(event) {
            var a=$(this).parent().parent().prev().html();
            
            $(this).parent().parent().parent().next().children('.item-cont').append(a);
            $(this).parent().parent().parent().remove(); 
            // list_nub();
          });


//列表的操作end
//查看解析

$("#item-ul").on('click', '.look-detail', function(event) {
  var a=$(this).attr("data-num");
  var b=$(this).attr("data-id");
  $(this).attr('href','edit_analysis?docx_id=' +docx_id+ '&number='+a+'&exam_subject_id='+exam_subject_id+'&id='+b+'');
})
//查看解析 end









})