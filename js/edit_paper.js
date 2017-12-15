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
                       $(".sub_bd02_ul01").append('<li><input value="'+data[i].name+'" disabled="disabled"></li>');
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
      $(".sub_sz_remove_t").removeAttr("data-id");
       $(".sub_sz_ul02").html(" ");
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
                 var a=data.length;
                 for(var i=0;i<a;i++){
                     $(".sub_sz_ul02").append('<li><select  data-id="'+data[i].answer.id+'"><option>单选题</option><option>多选题</option><option>填空题</option><option>是非题</option><option>其他题</option><option>作文题</option></select><input type="" name="" value="'+data[i].answer.answer_name+'"><input type="" name="" value="10"><i class="iconfont" data-id="0">&#xe622;</i><div class="sub_sz_list" style="overflow: auto;"></div>');
                  var qb_length=data[i].question_banks.length;
                 if(data[i].answer.item=="单选题"||data[i].answer.item=="多选题"){
                 for(var q_b=0;q_b<qb_length;q_b++){
                  $(".sub_sz_ul02 li").eq(i).find('.sub_sz_list').append('<p style="padding-left: 40px;box-sizing: border-box;"><a style="">序号<input disabled="disabled"  style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].question_banks[q_b].sort+'"></a><a style="margin-left: 70px;">选项个数<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="4"></a><a style="margin-left: 88px;">分值<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;"  value="2"></a></p>');
                 };
                 }else if(data[i].answer.item=="填空题"||data[i].answer.item=="是非题"||data[i].answer.item=="其他题"){
                 for(var q_b=0;q_b<qb_length;q_b++){
                  $(".sub_sz_ul02 li").eq(i).find('.sub_sz_list').append('<p><a style="margin-left: 40px;">序号<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" disabled="disabled"  value="'+data[i].question_banks[q_b].sort+'"></a><a style="margin-left: 237px;">分值<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;"></a></p>');
                 }                       
                }else if(data[i].answer.item=="作文题"){
                  for(var q_b=0;q_b<qb_length;q_b++){
                  $(".sub_sz_ul02 li").eq(i).find('.sub_sz_list').append('<p style="padding-left:10px;"><select name="" class="sub_sz_xz_select"><option value="">方格</option><option value="">行线</option><option value="">间隔线</option></select><a style="margin-left: 50px;">序号<input disabled="disabled"  style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].question_banks[q_b].sort+'"></a><a style=""><i  class="sub_sz_xz_i" style="font-style:normal;color: #666;font-size: 12px;margin-left: 5px;">格数</i><input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;"></a><a style="margin-left:60px;">分值<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;"></a></p>');
                 }  
                };
                
                }

                // console.log(data[0].question_banks.length); 
                    
                  },
                error: function(){
    
                 }
               }); 

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
          var a=$(".sub_li select").attr("data-id");
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
        var a=$(".sub_sz_ul02 li").eq(i).find('select').attr("data-id");
        var b=i+1;
        console.log($(".sub_sz_ul02 li").eq(i).find('select').attr("data-id"));
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
                  url: ajaxIp+"/api/v2/question_banks/add_answer",
                  data:{
                  'exam_subject_id':exam_subject_id,
                  'item':a,
                  'name':b,
                   // 'sort':6,
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