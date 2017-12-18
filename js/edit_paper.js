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
  			$('#item-ul').append('<li class="items" data-id="'+data[i].sort+'"><i class="item-op "><a href="javascript:;" class="save-btn right"><i class="iconfont">&#xe653;</i>保存</a><a href="javascript:;" class="look-detail right"  data-num="'+i+'"  data-id="'+data[i].id+'"><i class="iconfont">&#xe699;</i>查看解析</a></i><div class="item-cont editor-enabled" contenteditable="true" data-id="'+data[i].id+'">'+data[i].content+'</div><ul class="bottom-btn"><li><a class="item-edit" data-num="'+i+'"  data-id="'+data[i].id+'"><i class="iconfont">&#xe614;</i>题干编辑</a></li><li><a href="javascript:;" class="item-seg"><i class="iconfont">&#xe636;</i>分割试题</a></li><li><a href="javascript:;" class="item-insert"><i class="iconfont">&#xe601;</i>题组插入</a></li><li><a href="javascript:;" class="item-merge"><i class="iconfont">&#xe689;</i>向下合并</a></li><li><a href="javascript:;" class="grade-set"><i class="iconfont">&#xe630;</i>设定分指</a></li><li><a href="javascript:;" class="item-up"><i class="iconfont">&#xe631;</i>上移</a></li><li><a href="javascript:;" class="item-down"><i class="iconfont">&#xe607;</i>下移</a></li><li><a href="javascript:;" class="item-dele" data-num="'+i+'" data-id="'+data[i].id+'"><i class="iconfont">&#xe616;</i>删除</a></li><li><a href="javascript:;" class="determine bind-item" data-id="'+data[i].id+'">绑定题组</a></li></ul></li>');
         
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
        $(".sub_bd_t").attr("data-item",$(this).attr("data-item"));
         $(".sub_bd_t").attr("data-question",$(".sub_bd").attr("data-id"));

        $(this).addClass('sub_bd02_li').siblings().removeClass('sub_bd02_li');
        });
    $("#item-ul").on('click', '.bind-item', function(event) {
      $(".sub_bd_t").attr("data-answer"," ");
      $(".sub_bd_t").attr("data-question"," ")
       $(".sub_bd_t").attr("data-item"," ")
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
                       $(".sub_bd02_ul01").append('<li><input value="'+data[i].name+'" disabled="disabled"></li>');
                       $(".sub_bd02_ul02").append('<li data-id="'+data[i].id+'" data-item="'+data[i].item+'"><i class="iconfont" style="">&#xe64b;</i></li>');
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
      var c=$(".sub_bd_t").attr("data-item");
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
                  'item':c,
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
      $(".sub_sz_remove_t").removeAttr("data-id");
       $(".sub_sz_ul02").html(" ");
      $(".sub_sz").show();
      $(".layer").css("height", $(document).height());
      $(".layer").show();
       $.ajax({
                  type: "POST",
                  async: false,
                  url: ajaxIp+"/api/v2/question_banks/question_answers",
                  data:{
                  'exam_subject_id':exam_subject_id,
                  },
                headers: {'Authorization': "Bearer " + isLogin},
                success: function(data){
                  console.log(data);
                 var a=data.length;

                 for(var i=0;i<a;i++){
                     $(".sub_sz_ul02").append('<li><input data-id="'+data[i].answer.id+'" type="" name="" value="'+data[i].answer.item+'" disabled="disabled"><input type="" name="" value="'+data[i].answer.answer_name+'" disabled="disabled"><input class="all_score" type="" name="" value="" disabled="disabled"><i class="iconfont" data-id="0">&#xe622;</i><div class="sub_sz_list" style="overflow: auto;"><button style="float: right;width: 50px;height: 25px;color: #31bc91;text-align: center;line-height: 25px;margin-right: 68px;margin-top: 10px;">保存</button></div></li>');
                  var qb_length=data[i].question_banks.length;
                 if(data[i].answer.item=="单选题"||data[i].answer.item=="多选题"){
                 for(var q_b=0;q_b<qb_length;q_b++){
                  $(".sub_sz_ul02 li").eq(i).find('.sub_sz_list button').before('<p data-id="'+data[i].question_banks[q_b].id+'" style="padding-left: 40px;box-sizing: border-box;"><a style="">序号<input disabled="disabled"  style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].question_banks[q_b].sort+'"></a><a style="margin-left: 70px;">选项个数<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="4"></a><a style="margin-left: 88px;">分值<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;"  value="2"></a></p>');
                 };
                 }else if(data[i].answer.item=="填空题"||data[i].answer.item=="是非题"||data[i].answer.item=="其他题"){
                 for(var q_b=0;q_b<qb_length;q_b++){
                  $(".sub_sz_ul02 li").eq(i).find('.sub_sz_list button').before('<p data-id="'+data[i].question_banks[q_b].id+'" ><a style="margin-left: 40px;">序号<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" disabled="disabled"  value="'+data[i].question_banks[q_b].sort+'"></a><a style="margin-left: 237px;">分值<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;"></a></p>');
                 }                       
                }else if(data[i].answer.item=="作文题"){
                  for(var q_b=0;q_b<qb_length;q_b++){
                  $(".sub_sz_ul02 li").eq(i).find('.sub_sz_list button').before('<p data-id="'+data[i].question_banks[q_b].id+'" style="padding-left:10px;"><select name="" class="sub_sz_xz_select"><option value="">方格</option><option value="">行线</option><option value="">间隔线</option></select><a style="margin-left: 50px;">序号<input disabled="disabled"  style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].question_banks[q_b].sort+'"></a><a style=""><i  class="sub_sz_xz_i" style="font-style:normal;color: #666;font-size: 12px;margin-left: 5px;">格数</i><input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;"></a><a style="margin-left:60px;">分值<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;"></a></p>');
                 }  
                };
                all_score();
                }

                // console.log(data[0].question_banks.length); 
                    
                  },
                error: function(){
    
                 }
               }); 

   });
     function all_score(){
      var li_length=$('.sub_sz_ul02 li').length;
      for(var a=0;a<li_length;a++){
        var p_length=$('.sub_sz_ul02 li').eq(a).find('button').parent().find("p").length;
        // console.log(p_length);
        var score=0;
      for(var i=0;i<p_length;i++){
        var list_score=parseInt($('.sub_sz_ul02 li').eq(a).find('button').parent().find("p").eq(i).find('input').eq(2).val());
        if(isNaN(list_score)){
          score=score+0;
        }else{
         score=score+list_score;
         
        }
        
        // console.log(list_score);
      }
     $('.sub_sz_ul02 li').eq(a).find('button').parent().parent().find('.all_score').val(score);
      }
     };


     $(".sub_sz_ul02 ").on('click', 'button', function(event) {
     //  console.log($(this).parent().find("p").length);
     //  var p_length=$(this).parent().find("p").length;
     //  var score=0;
     //  for(var i=0;i<p_length;i++){
     //      score=score+parseInt($(this).parent().find("p").eq(i).find('input').eq(2).val());
     //  }
     // $(this).parent().parent().find('.all_score').val(score);
     //  console.log(score);
       // console.log($(this).parent().find("p").eq(0).find('input').eq(2).val());
       all_score();
      var p_length=$(this).parent().find("p").length;
      var a_num=[];
      for(var i=0;i<p_length;i++){
        var a={};
         var score=parseInt($(this).parent().find("p").eq(i).find('input').eq(2).val());
         var type_count=parseInt($(this).parent().find("p").eq(i).find('input').eq(1).val());
         var question_bank_id=parseInt($(this).parent().find("p").eq(i).attr("data-id"));
          a["score"]=score;
          a["type_count"]=type_count;
          a["question_bank_id"]=question_bank_id;
          a_num[i]=a;
      }
     console.log(a_num);
      var a=[{'question_bank_id':73,'sort':7,'type_count':4,'score':2,'answer_id':2192,'exam_subject_id':516,'num':7,'count':3,},
    {'question_bank_id':74,'sort':8,'type_count':4,'score':2,'answer_id':2192,'exam_subject_id':516,'num':8,'count':3,}];
     console.log(a);
     // $.ajax({
     //              type: "POST",
     //              url: ajaxIp+"/api/v2/question_banks/save_answer_settings",
     //              data:{'answer_settings':JSON.stringify(a)},
     //              headers: {'Authorization': "Bearer " + isLogin},
     //              success: function(data){
     //                 console.log(data);
     //              },
     //            error: function(){
    
     //             }
     //           });

     });
     $(".sub_sz_ul02 ").on('change', 'select', function(event) {
      //alert();
      var a=$(this).children('option:selected').html();
      console.log($(this).children('option:selected').html());
       if(a=="行线"){
       $(this).next().next().find(".sub_sz_xz_i").html("行数");
       }else if(a=="方格"){
        $(this).next().next().find(".sub_sz_xz_i").html("格数");
       }else if(a=="间隔线"){
       $(this).next().next().find(".sub_sz_xz_i").html("单词数");
       }

     });
//题组设置
$(".sub_sz_ul02").on('click', 'li', function(event) {
          $(this).addClass('sub_li').siblings().removeClass('sub_li');
       
          
          $(".sub_sz_remove_t").attr("data-id",$(".sub_li").attr("data-id"))
        });
        // 上移
        $(".sub_top").click(function(event) {
          var a=$(".sub_li").html();
          var b=$(".sub_li").prev().html();
          $(".sub_li").prev().html(a);
          $(".sub_li").html(b);
          $(".sub_li").prev().addClass('sub_li').siblings().removeClass('sub_li');
          
                    
        });
        // 下移
        $(".sub_btm").click(function(event) {
          var a=$(".sub_li").html();
          var b=$(".sub_li").next().html();
          // var c_01=$(".sub_li").attr("data-id");
          // var c_02=$(".sub_li").next().attr("data-id");
          $(".sub_li").next().html(a);
          $(".sub_li").html(b);
          
          //
          // var d_01=$(".sub_li input").eq(0).val();
          //  var d_02=$(".sub_li").next().find('input').eq(0).val();
           // console.log(d_01);
           // console.log(d_02)
        
           
        
             // $.ajax({
             //      type: "POST",
             //      async: false,
             //      url: ajaxIp+"/api/v2/answers/change_sort",
             //      data:{'answer_id':2180,
             //            'sort':5,
             //    },
             //      headers: {'Authorization': "Bearer " + isLogin},
             //      success: function(data){
                   
                  
             //      },
             //    error: function(){
    
             //     }
             //   });
           $(".sub_li").next().addClass('sub_li').siblings().removeClass('sub_li');
        });
        // 删除
        $(".sub_hide").click(function(event) {
          $(".sub_sz_remove").show();
          $(".sub_sz_remove_p03 a").html($(".sub_li input").eq(1).val());
          console.log($("#item-ul .items").length);

        });
        $(".sub_sz_remove_x").click(function(event) {
          $(".sub_sz_remove").hide();
        });
        $(".sub_sz_remove_t").click(function(event) {
          var a=$(".sub_li input").eq(0).attr("data-id");
          $(".sub_li").remove();
          $(".sub_sz_remove").hide();  
          console.log(a);
          $.ajax({
                  type: "POST",
                  url: ajaxIp+"/api/v2/answers/delete",
                  data:{'id':a},
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){
                   
                    // window.location.reload();
                  },
                error: function(){
    
                 }
               });
        });
        $(".sub_sz_remove_f").click(function(event) {
          $(".sub_sz_remove").hide();
        });
        // 下拉
        $(".sub_sz_ul02").on('click', 'i', function(event) {
          
        // click(function(event) {
          
          if($(this).attr("data-id")==0){
          $(this).html('&#xe624;'); 
          $(this).parent("li").addClass('sub_i_li');
          $(this).next('div').show();
          $(this).attr("data-id","1");
        }else{
          $(this).html('&#xe622;'); 
          $(this).parent("li").removeClass('sub_i_li');
          $(this).next('div').hide();
          $(this).attr("data-id","0");
        }
        });
$(".sub_sz_p_div").click(function(event) {
      $(".sub_sz").hide();
      $(".layer").hide();
   });

//确定
function ans_sort(a,b){
   $.ajax({
                  type: "POST",
                  async: false,
                  url: ajaxIp+"/api/v2/answers/change_sort",
                  data:{'answer_id':a,
                        'sort':b,
                },
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){
                   
                  
                  },
                error: function(){
    
                 }
               });
}

  $(".sub_t").click(function(event) {
     $(".sub_sz").hide();
      $(".layer").hide();
      var li_length=$(".sub_sz_ul02 li").length;
      console.log($(".sub_sz_ul02 li").length);
      for(var i=0;i<li_length;i++){
        var a=$(".sub_sz_ul02 li").eq(i).find('input').eq(0).attr("data-id");
        var b=i+1;
        console.log($(".sub_sz_ul02 li").eq(i).find('input').eq(0).attr("data-id"));
        ans_sort(a,b);
      }
   });
  //取消
  $(".sub_f").click(function(event) {
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
                  url: ajaxIp+"/api/v2/answers/answers_for_exam_subject",
                  data:{'exam_subject_id':exam_subject_id},
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){
                  
                   
                    var a_num=data.length+1;
                    console.log(a_num);
                   t_zhu(a_num,a,b);
                   
                  },
                error: function(){
    
                 }
               });
    function t_zhu(a_num,a,b){
       $.ajax({
                  type: "POST",
                  url: ajaxIp+"/api/v2/question_banks/add_answer",
                  data:{
                  'exam_subject_id':exam_subject_id,
                  'item':a,
                  'name':b,
                   'sort':a_num,
                  },
                headers: {'Authorization': "Bearer " + isLogin},
                success: function(data){
                  console.log(data);
                   
                    
                  },
                error: function(){
    
                 }
               });
       }
    //            console.log(); 
    

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
          // save(c,b);
          // save(d,a);
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
          // save(c,b);
          // save(d,a);
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

//切割
$("#item-ul").on('mouseup', 'p', function() {
 get_sel_range();

});
  $(function(){

    // 分割题目
    var slipt_up=$('.item-seg');
    $(document).on('click', '.item-seg',function() {
      

      if (sel_range == null){
        alert('分割位置错误');
        return;
      }
      else{
        var pos = sel_range;
        var focusnode=sel_range.endContainer;
        var $node = $(focusnode);
        var parent = $node.parents('.editor-enabled');
        if (!parent) {
          alert('请将光标放置在正确分割位置');
          return;
        }
          // console.log(focusnode);
        var range = sel_range;
        var tmp = document.createRange();
        tmp.setEnd(range.startContainer,range.startOffset);
        tmp.setStartBefore(parent[0].childNodes[0]);
        var rect1 = tmp.getBoundingClientRect();
        range.setEndAfter(parent[0].childNodes[parent[0].childNodes.length-1]);
        var rect = range.getBoundingClientRect();
        if (rect.width==0 || rect.height==0 || rect1.width==0 || rect1.height==0) {
          alert('分割题目位置错误');
          return;
        }
        var newnode = range.extractContents();
        var div = document.createElement('div');
        div.appendChild(newnode);
        var content = div.innerHTML;
        var nc = parent[0].innerHTML;
        nc = retriveImg(nc);
        var newitem=$(this).parents('.items').clone();
        newitem.children('div').children().remove();
        newitem.children('div').append(content);
        $(this).parents('.items').after(newitem);
       
       var old_word = $(this).parents('.items').find('.editor-enabled p');
       var new_word = $(this).parents('.items').next().find('.editor-enabled p');
       var old_ary = [];
       var nw_ary = [];

       for (var i = 0; i <old_word.length; i++) {
          if($(old_word[i]).html().trim().length > 0){
               old_ary.push($(old_word[i]).html());
          }

       };
      for (var i = 0; i <new_word.length; i++) {
        if($(new_word[i]).html().trim().length > 0){
          nw_ary.push($(new_word[i]).html());
        }
       //list_number
       console.log($("#item-ul .items").length);
       var a =$("#item-ul .items").length-1;
       
     //    for(var i=0;i<a;i++){
     //   var nub=i+1;
     //   $("#item-ul .items").eq(i).find('.item-edit').attr("data-a",i);
     //  $("#item-ul .items").eq(i).find('.list_nub').html(''+nub+'.');
     // }
     //
       };
      }
    });
  });



  var sel_range=null;
  function get_sel_range() {
    if (window.getSelection) {
     sel_range = window.getSelection().getRangeAt(0);
    }else if (document.selection && document.selection.type != "Control") {
      sel_range = document.selection.createRange();
    }
  }
    var browser = {
    chrome: navigator.userAgent.match(/chrome/i) ? true : false,
    safari: navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) ? true : false,
    firefox: navigator.userAgent.match(/firefox/i) ? true : false,
    opera: navigator.userAgent.match(/opera/i) ? true : false,
    ie: navigator.userAgent.match(/msie|trident\/.*rv:/i) ? true : false,
    webkit: navigator.userAgent.match(/webkit/i) ? true : false,
    ieVersion: function() {
      var rv = -1; // Return value assumes failure.
      var ua = navigator.userAgent;
      var re  = new RegExp("(MSIE |rv:)([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) !== null) {
        rv = parseFloat(RegExp.$2);
      }
      return rv;
    }
  };

  var ieLtIE8 = function() {
    return browser.ie && browser.ieVersion() < 8;
  }

  var ieLtIE9 = function() {
    return browser.ie && browser.ieVersion() < 9;
  }

  
  var retriveImg = function(html) {
    return html.replace(/\/web1\/ckupload\/quessIImage/gi, 'quessIImage');
  }









})