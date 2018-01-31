$(function(){
  $.ajaxSetup({cache:false}); 
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
   var grade_name = getUrlParam(url,'grade_name');
  var exam_subject_id = getUrlParam(url,'exam_subject_id');
  var exam_name = getUrlParam(url,'exam_name');
  var subject_name = getUrlParam(url,'subject_name');
  var left_tab = getUrlParam(url,'left_tab');
  var exam_sub_name =exam_name+'&nbsp;&nbsp;('+subject_name+')'
  var storage=window.localStorage;
  storage.setItem("left_tab",left_tab);
  console.log(exam_name,exam_sub_name)
  $(".exam_name").html(exam_sub_name);
  console.log(docx_id)
    console.log(left_tab)
  $('.back').click(function(){
    console.log(999)
    console.log(left_tab)
    history.go(-1);
    return false;
  })
list_item();
function list_item(){
 	$.ajax({
   	type: "GET",
    async:false,
   	url: ajaxIp+"/api/v2/question_banks?docx_id="+docx_id+"&now="+new Date().getTime()+"",
  	dataType: "JSON",
  	data:{'limit':200,'page':null},
  	headers: {'Authorization': "Bearer " + isLogin},
  	success: function(data){
  		console.log(data);
      $(".mr20 a").html(data.length);
  		for (var i = 0; i < data.length; i++) {
        var nub=i+1;
  			// var pp='<p><a class="list_nub">'+nub+'.</a>'+data[i].content+'</p>';
        var str=data[i].content;
        // console.log(str);
        if(str==null){
           var str01=0;
         }else{
          var str01=str.substr(0,3);
         }
       
          // console.log(str01);
        if(str01=="<p>"){
         var pp=data[i].content;
        }else{
          var pp='<p>'+data[i].content+'</p>';
        }
       
  			$('#item-ul').append('<li class="items" data-id="'+data[i].sort+'"  data-grade="'+data[i].grade_id+'" item-id="'+data[i].id+'"><i class="item-op "><a style="color: #666;">'+data[i].sort+'</a><a href="javascript:;" class="save-btn right"><i class="iconfont">&#xe653;</i>保存</a><a href="javascript:;" class="look-detail right"  data-num="'+i+'"  data-id="'+data[i].id+'"><i class="iconfont">&#xe699;</i>查看解析</a></i><div class="item-cont editor-enabled" contenteditable="true" data-id="'+data[i].id+'">'+pp+'</div><ul class="bottom-btn"><li><a class="item-edit" data-num="'+i+'"  data-id="'+data[i].id+'"><i class="iconfont">&#xe614;</i>题干编辑</a></li><li><a href="javascript:;" class="item-seg"><i class="iconfont">&#xe636;</i>分割试题</a></li><li><a href="javascript:;" class="item-insert"><i class="iconfont">&#xe601;</i>题目插入</a></li><li><a href="javascript:;" class="item-merge"><i class="iconfont">&#xe689;</i>向下合并</a></li><li style="display:none;"><a href="javascript:;" class="grade-set"><i class="iconfont">&#xe630;</i>设定分指</a></li><li><a href="javascript:;" class="item-up"><i class="iconfont">&#xe631;</i>上移</a></li><li><a href="javascript:;" class="item-down"><i class="iconfont">&#xe607;</i>下移</a></li><li><a href="javascript:;" class="item-dele" data-num="'+i+'" data-id="'+data[i].id+'"><i class="iconfont">&#xe616;</i>删除</a></li><li><a class="bind-item-content"></a><a href="javascript:;" class="determine bind-item" data-id="'+data[i].id+'">绑定题组</a></li></ul></li>');
         
      
  		};
      again_bang();
    },
    error: function(){
    	
    }
  });
 }

 //判断绑定题组还是再次绑定
again_bang();
function again_bang(){ 
  
   $.ajax({
                  type: "POST",
                  async:false,
                  url: ajaxIp+"/api/v2/question_banks/bound_questions",
                  data:{'docx_id':docx_id},
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){
                   console.log(data);
                   var data_length=data.length;
                   var a=$('#item-ul li').length;
                  
                   for(var i=0;i<data_length;i++){
                      if(data[i].answer_setting_num.length!==0){
                         $("#item-ul").children('li').eq(i).find('.bind-item').html("更换绑定");
                         $("#item-ul").children('li').eq(i).find('.bind-item').css("background","#fb7d8a");
                         $("#item-ul").children('li').eq(i).find('.bind-item-content').html("已绑定：");
                         //删除隐藏
                         $("#item-ul").children('li').eq(i).find('.item-dele').hide();
                         for(var i1=0;i1<data[i].answer_setting_num.length;i1++){
                          var list_cont=data[i].answer_setting_num+","+'&nbsp';
                          // 题组查看
                          $('#look_id'+data[i].answer_setting_id[i1]+'').css("border","2px solid #fb7d8a");
                          $('#look_id'+data[i].answer_setting_id[i1]+'').css("color","#fb7d8a");
                           // 题组查看 end
                          $("#item-ul").children('li').eq(i).find('.bind-item-content').append('<i style="font-style: normal;" data-id="'+data[i].answer_setting_id[i1]+'">'+data[i].answer_setting_num[i1]+',</i>')
                          $('.list_a_'+data[i].answer_setting_num[i1]+'').attr("data-id","3");
                          $('.list_a_'+data[i].answer_setting_num[i1]+'').css({
                            background: '#31bc91',
                            opacity: '0.5',
                            cursor: 'not-allowed'
                          });; 
                         }  
                         // $("#item-ul").children('li').eq(i).find('.bind-item').prev().html('已绑定：'+list_cont+'');
                         
                      }else{
                           $("#item-ul").children('li').eq(i).find('.bind-item').html("绑定题目");
                         $("#item-ul").children('li').eq(i).find('.bind-item').css("background-image","linear-gradient(to right,#44d971,#31bc92)");
                         $("#item-ul").children('li').eq(i).find('.bind-item').prev().html(' ');
                         $("#item-ul").children('li').eq(i).find('.item-dele').show();
                      }

                   }
                     
                        // $("#item-ul li").eq(2).find('.bind-item').html("更换绑定");
                        //  $("#item-ul li").eq(2).find('.bind-item').css("background","#fb7d8a");
                      
                      // if(item_id==data[i].question_bank_id){
                      //   // console.log(item_id);
                      //    $("#item-ul li").eq(i1).find('.bind-item').html("更换绑定");
                      //    $("#item-ul li").eq(i1).find('.bind-item').css("background","#fb7d8a");
                      //     $("#item-ul li").eq(i1).find('.bind-item').attr("relation_id",data[i].id);
                      //     $("#item-ul li").eq(i1).find('.bind-item').attr("answer_id",data[i].doc_answer_id);
                      // }
                 
                  },
                error: function(){
    
                 }
               });

// for(){

// }
}
 //
     $("#item-ul").on('click', '.item-edit', function(event) {
       var a=$(this).attr("data-num");
        var b=$(this).attr("data-id");
       $(this).attr('href', 'edit_bj?docx_id=' +docx_id+ '&number='+a+'&exam_subject_id='+exam_subject_id+'&id='+b+'&exam_name='+exam_name+'&subject_name='+subject_name+'&grade_name='+grade_name+'');
     
     });
   $(document).on('click', '.save-btn', function(event) {
 var a_content=$(this).parent().next().html();
  var a_id=$(this).parent().next().attr("data-id");
  save(a_id,a_content)
   });
   //绑定题组
   //题组选择
    $(".sub_bd02_ul01 ").on('click', 'li', function(event) {
        $(".sub_bd_t").attr("data-answer",$(this).attr("data-id"));
        $(".sub_bd_t").attr("data-item",$(this).attr("data-item"));
         $(".sub_bd_t").attr("data-question",$(".sub_bd").attr("data-id"));

        $(this).addClass('sub_bd02_ul01_li').siblings().removeClass('sub_bd02_ul01_li');
        });
    $("#item-ul").on('click', '.bind-item', function(event) {
      $(".list_i").html(" ");
       $(".sub_bd").show(); 
       $(".layer").css("height", $(document).height());
       $(".layer").show();
       $(".sub_bd_t").attr('data-id', $(this).attr("data-id"));
       var bank_id=$(this).attr("data-id");

       if($(this).html()=="更换绑定"){
        var i_lenght=$(this).prev().find('i').length;
        console.log(i_lenght);
        var a=[];
       
        for(var i=0;i<i_lenght;i++){
        var b={};
         b["id"]=$(this).prev().find('i').eq(i).attr("data-id");
         b["question_bank_id"]=null;
         a.push(b)
        }
        console.log(a);
        $.ajax({
                  type: "POST",
                  async: false,
                  url: ajaxIp+"/api/v2/question_banks/bind_answer",
                  data:{
                  'answer_settings':JSON.stringify(a),
                  },
                headers: {'Authorization': "Bearer " + isLogin},
                success: function(data){
                 // layer.msg('绑定成功',{time:700});
                 // again_tizhu(); 
                 again_bang();  
                                 
                },
                error: function(){
                }
              });
       }
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
                   $(".sub_bd02 select").html(" ");
                    $(".sort_num_div").html(" ");
                  for(var i=0;i<data.length;i++){
                    $(".sub_bd02 select").append('<option value="">'+data[i].answer.answer_name+'</option>');
                  }
                  for(var i=0;i<data[0].answer_settings.length;i++){
                    $(".sort_num_div").append('<a data-id="0" class="list_a_'+data[0].answer_settings[i].num+'" data_num="'+data[0].answer_settings[i].num+'" list_id="'+data[0].answer_settings[i].id+'">'+data[0].answer_settings[i].num+'<i class="iconfont" style="font-size: 12px;margin-left: 5px;"></i></a>');
                  }
                  again_bang();
                },
                error: function(){
                }
              });

     });

    $(".sub_bd02 select").change(function(event) {
      /* Act on the event */
      var dex=$(this).children('option:selected').index();
      console.log(dex);
 $.ajax({
                  type: "POST",
                  async: false,
                  url: ajaxIp+"/api/v2/question_banks/question_answers",
                  data:{
                  'exam_subject_id':exam_subject_id,
                  },
                headers: {'Authorization': "Bearer " + isLogin},
                success: function(data){
                  
                 
                    $(".sort_num_div").html(" ");
                    console.log(data[dex].answer_settings.length);
                  for(var i=0;i<data[dex].answer_settings.length;i++){
                    $(".sort_num_div").append('<a data-id="0" class="list_a_'+data[dex].answer_settings[i].num+'" data_num="'+data[dex].answer_settings[i].num+'" list_id="'+data[dex].answer_settings[i].id+'">'+data[dex].answer_settings[i].num+'<i class="iconfont" style="font-size: 12px;margin-left: 5px;"></i></a>');
                  }
                  var a=$(".list_i i").length;
                  for(var i=0;i<a;i++){
                    $('.'+$(".list_i i").eq(i).attr('id')+'').attr('data-id', '1');
                    $('.'+$(".list_i i").eq(i).attr('id')+'').css('background', '#31bc91');
                }
                },
                error: function(){
                }
              });

    });

   $(".sub_bd_p_div").click(function(event) {
      $(".sub_bd").hide();
      $(".layer").hide();
   });
   //绑定确定
  $(".sub_bd_t").click(function(event) {                
$(".sub_bd").hide();
$(".layer").hide();
// again_bang();
var a=[];

for(var i=0;i<$(".list_i i").length;i++){
 var b={};
 b["id"]=$(".list_i i").eq(i).attr("data-id");
 b["question_bank_id"]=$(this).attr("data-id");
 a.push(b);
}
console.log(a);
$.ajax({
                  type: "POST",
                  async: false,
                  url: ajaxIp+"/api/v2/question_banks/bind_answer",
                  data:{
                  'answer_settings':JSON.stringify(a),
                  },
                headers: {'Authorization': "Bearer " + isLogin},
                success: function(data){
                 layer.msg('绑定成功',{time:700});
                 again_bang();                   
                },
                error: function(){
                }
              });

  
   });
   //绑定取消
  $(".sub_bd_f").click(function(event) {
      $(".sub_bd").hide();
      $(".layer").hide();
   });
  $(".sort_num_div ").on('click', 'a', function(event) {
    var id=$(this).attr("data-id");
    var class_id=$(this).attr("class");
    var num=$(this).attr("data_num");
    if(id==0){
    $(this).attr("data-id","1"); 
   $(this).css("background","#31bc91");
  $(".list_i").append('<i id="'+class_id+'" style="font-style:normal;" data-id="'+$(this).attr("list_id")+'">'+num+'，</i>') 
 }else if(id==1){
   $(this).attr("data-id","0"); 
   $(this).css("background","#cccccc");
   $('#'+$(this).attr("class")+'').remove();

 }
  });

    //题组设置
    function again_tizhu(){
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
                  $(".sub_sz_ul02").html(" ");
                 var a=data.length;
                   var  all_mark=0;
                 for(var i=0;i<a;i++){
                    $(".sub_sz_ul02").append('<li><a>'+data[i].answer.item+'</a><a>'+data[i].answer.answer_name+'</a><a class="all_score"></a><i class="iconfont" data-id="0">&#xe622;</i><div class="sub_sz_list" style="overflow: auto;"></div></li>');
                  var qb_length=data[i].answer_settings.length;
                
                 if(data[i].answer.item=="单选题"||data[i].answer.item=="多选题"||data[i].answer.item==0||data[i].answer.item==5){
                 var d_score=0;
                 for(var q_b=0;q_b<qb_length;q_b++){
                    d_score=d_score+Number(data[i].answer_settings[q_b].score);
                  $(".sub_sz_ul02 li").eq(i).find('.sub_sz_list').append('<p style="padding-left: 40px;box-sizing: border-box;"><a style="">序号<input disabled="disabled"  style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].answer_settings[q_b].num+'" id="look_id'+data[i].answer_settings[q_b].id+'"></a><a style="margin-left: 70px;">选项个数<input disabled="disabled" style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].answer_settings[q_b].type_count+'"></a><a style="margin-left: 88px;">分值<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;"  value="'+data[i].answer_settings[q_b].score+'" disabled="disabled"></a></p>');
                 };
                 $(".sub_sz_ul02 li").eq(i).find('.all_score').html(d_score);
                 

                 }else if(data[i].answer.item=="填空题"||data[i].answer.item=="是非题"||data[i].answer.item=="其他题"||data[i].answer.item==1||data[i].answer.item==2||data[i].answer.item==3){
                  var t_score=0;
                 for(var q_b=0;q_b<qb_length;q_b++){
                   t_score=t_score+Number(data[i].answer_settings[q_b].score);
                  $(".sub_sz_ul02 li").eq(i).find('.sub_sz_list').append('<p><a style="margin-left: 40px;">序号<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" disabled="disabled"  value="'+data[i].answer_settings[q_b].num+'"></a><a style="margin-left: 237px;">分值<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].answer_settings[q_b].score+'" disabled="disabled"></a></p>');
                 }
                  $(".sub_sz_ul02 li").eq(i).find('.all_score').html(t_score);                      
                }else if(data[i].answer.item=="作文题"||data[i].answer.item==4){
                  var x_score=0;
                  for(var q_b=0;q_b<qb_length;q_b++){
                     x_score=x_score+Number(data[i].answer_settings[q_b].score);
                  $(".sub_sz_ul02 li").eq(i).find('.sub_sz_list').append('<p style="padding-left:10px;"><a style="margin-left: 40px;">序号<input disabled="disabled"  style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].answer_settings[q_b].num+'"></a><a style="margin-left: 80px">数量<input disabled="disabled" style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].answer_settings[q_b].lattice_total+'"></a><a style="margin-left:70px;">分值<input disabled="disabled" style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].answer_settings[q_b].score+'"></a></p>');
                 
                 }
                
                  $(".sub_sz_ul02 li").eq(i).find('.all_score').html(x_score); 
                
                 
                };
                all_mark=all_mark+Number($(".sub_sz_ul02 li").eq(i).find('.all_score').html());
                
                
                
                
                }
                console.log(all_mark);
                $(".sub_score i").html(all_mark);
                again_bang();
                 },
                error: function(){
    
                 }
               }); 
    }
     $(".set-item").click(function(event) {
      $(".sub_sz_remove_t").removeAttr("data-id");
       $(".sub_sz_ul02").html(" ");
      $(".sub_sz").show();
      $(".layer").css("height", $(document).height());
      $(".layer").show();
       again_tizhu();

   });    
  //题组查看设置
    $(".sub_sz_ul02").on('click', 'li', function(event) {
          $(this).addClass('sub_li').siblings().removeClass('sub_li');
       
          
          $(".sub_sz_remove_t").attr("data-id",$(".sub_li").attr("data-id"))
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
   });
  //取消
  $(".sub_f").click(function(event) {
     $(".sub_sz").hide();
      $(".layer").hide();
   });
  //题目插入
  $("#item-ul").on('click', '.item-insert', function(event) {
       // $(".title_in").show(); 
       // $(".layer").css("height", $(document).height());
       // $(".layer").show();
       var  grade_id=$(this).parents(".items").attr("data-grade");
       var  sort=Number($(this).parents(".items").attr("data-id"))+0.5;
       console.log(sort);
      // console.log($(this).parents(".items").attr("data-grade"));
       $.ajax({
                  type: "POST",
                  async:false,
                  url: ajaxIp+"/api/v2/question_banks",
                  data:{'content':null,
                         'docx_id':docx_id,
                         'sort':sort,
                         'grade_id':grade_id,
                  },
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){ 
                  console.log(data);                 
                    // window.location.reload()
                     $("#item-ul").html(" ");
                    list_item();
                    // again_bang();11111
                  },
                error: function(){
    
                 }
               });
       
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
          layer.msg('保存成功',{time:700});
          // window.location.reload();
         },
         error: function() {

         }
     });
      }
           //上移
        
        $(".item-group-box").on('click', '.item-up', function(event) {
         
          // var a=$(this).parent().parent().prev().html();
          // var b=$(this).parent().parent().parent().prev().children('.item-cont').html();
          // var c=$(this).parent().parent().prev().attr("data-id");
          // var d=$(this).parent().parent().parent().prev().children('.item-cont').attr("data-id");
          

          // $(this).parent().parent().parent().prev().children('.item-cont').html(a);
          // $(this).parent().parent().prev().html(b);
          var id=$(this).parent().parent().prev().attr("data-id");
           var b=$(this).parent().parent().parent().prev().attr("data-id");
         
           var top_id=$(this).parent().parent().parent().prev().children('.item-cont').attr("data-id");
           var top_p=$(this).parent().parent().parent().attr("data-id");
           
           console.log(id);
           console.log(b);
           console.log(top_id);
           console.log(top_p);
           if(b==undefined){
             
           }else{
          $.ajax({
         type: "POST",
         async:false,
         url: ajaxIp + "/api/v2/question_banks/update_question",
         data: {
             'id':id,
             'sort':b,
         },
         headers: { 'Authorization': "Bearer " + isLogin },
         success: function(data) {
         console.log(data);
         
         },
         error: function() {

         }
     });
       $.ajax({
         type: "POST",
         async:false,
         url: ajaxIp + "/api/v2/question_banks/update_question",
         data: {
             'id':top_id,
             'sort':top_p,
         },
         headers: { 'Authorization': "Bearer " + isLogin },
         success: function(data) {
         console.log(data);
         $("#item-ul").html(" ");
          list_item();
         },
         error: function() {

         }
     });


           }
         
          });
          //下移
          $(".item-group-box").on('click', '.item-down', function(event) {
          // alert($(this).parent().parent().prev().html());
          // var a=$(this).parent().parent().prev().html();
          // var b=$(this).parent().parent().parent().next().children('.item-cont').html();
          // var c=$(this).parent().parent().prev().attr("data-id");
          // var d=$(this).parent().parent().parent().next().children('.item-cont').attr("data-id");
          
          // $(this).parent().parent().parent().next().children('.item-cont').html(a);
          // $(this).parent().parent().prev().html(b);
           var id=$(this).parent().parent().prev().attr("data-id");
           var b=$(this).parent().parent().parent().next().attr("data-id");
         
           var top_id=$(this).parent().parent().parent().next().children('.item-cont').attr("data-id");
           var top_p=$(this).parent().parent().parent().attr("data-id");
           
           console.log(id);
           console.log(b);
           console.log(top_id);
           console.log(top_p);
           if(top_id==undefined){
             
           }else{
          $.ajax({
         type: "POST",
         async:false,
         url: ajaxIp + "/api/v2/question_banks/update_question",
         data: {
             'id':id,
             'sort':b,
         },
         headers: { 'Authorization': "Bearer " + isLogin },
         success: function(data) {
         console.log(data);
          
         },
         error: function() {

         }
     });
       $.ajax({
         type: "POST",
         async:false,
         url: ajaxIp + "/api/v2/question_banks/update_question",
         data: {
             'id':top_id,
             'sort':top_p,
         },
         headers: { 'Authorization': "Bearer " + isLogin },
         success: function(data) {
        $("#item-ul").html(" ");
          list_item();
         },
         error: function() {

         }
     });


           }
         
                
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
                   
                  $("#item-ul").html(" ");
                  list_item();
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
            var old_id=$(this).parent().parent().prev().attr("data-id");
            var next_id=$(this).parent().parent().parent().next().children('.item-cont').attr("data-id");
            $(this).parent().parent().parent().next().children('.item-cont').append(a);
            var m_content=$(this).parent().parent().parent().next().children('.item-cont').html();
            $(this).parent().parent().parent().remove();
            console.log(old_id);
            console.log(next_id);
            //更新题目
            $.ajax({
                  type: "POST",
                  url: ajaxIp+"/api/v2/question_banks/update_question",
                  data:{'id':next_id,
                        'content':m_content,
                  },
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){                   
                    // window.location.reload()
                  },
                error: function(){
    
                 }
               });
            //删除合并前的题目
             $.ajax({
                  type: "POST",
                  url: ajaxIp+"/api/v2/question_banks/delete",
                  data:{'id':old_id,    
                  },
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){                   
                    // window.location.reload()
                  },
                error: function(){
    
                 }
               });
            // list_nub();
          });


//列表的操作end
//查看解析

$("#item-ul").on('click', '.look-detail', function(event) {
  var a=$(this).attr("data-num");
  var b=$(this).attr("data-id");
  $(this).attr('href','edit_analysis?docx_id=' +docx_id+ '&number='+a+'&exam_subject_id='+exam_subject_id+'&id='+b+'&exam_name='+exam_name+'&subject_name='+subject_name+'&grade_name='+grade_name+'');
})
//查看解析 end
// $(document).on('click', '.item-seg',function() {
//   console.log($(this).parent().parent().parent().attr("data-id")); 
//   console.log($(this).parent().parent().parent().next().attr("data-id"));
//   console.log($(this).parent().parent().parent().prev().attr("data-id")); 
// });
//切割
$("#item-ul").on('mouseup', 'p', function() {
 get_sel_range();

});
  $(function(){

    // 分割题目
    var slipt_up=$('.item-seg');
    $(document).on('click', '.item-seg',function() {
       var new_sort=$(this).parent().parent().parent().attr("data-id");
       var old_sort=$(this).parent().parent().parent().attr("data-id");
       var grade_id=$(this).parent().parent().parent().attr("data-grade");
       var timu_id=$(this).parent().parent().prev().attr("data-id");
       // console.log(timu_id);

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
        console.log(nw_ary);
       //list_number
       // console.log($("#item-ul .items").length);
       // var a =$("#item-ul .items").length-1;
      
      console.log(new_sort);
      var new_sorts=parseInt(new_sort)+0.5;
      console.log(new_sorts);
       $.ajax({
                  type: "POST",
                  async:false,
                  url: ajaxIp+"/api/v2/question_banks",
                  data:{'content':nw_ary[0],
                         'docx_id':docx_id,
                         'sort':new_sorts,
                         'grade_id':grade_id,
                  },
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){ 
                  console.log(data);                 
                    // window.location.reload()
                     // $("#item-ul").html(" ");
                     //  list_item();
                  },
                error: function(){
    
                 }
               });
       $.ajax({
                  type: "POST",
                  async:false,
                  url: ajaxIp+"/api/v2/question_banks/update_question",
                  data:{'id':timu_id,
                        'content':old_ary[0],
                  },
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){                   
                    // window.location.reload()
                     console.log(data);  
                     $("#item-ul").html(" ");
                      list_item();
                  },
                error: function(){
    
                 }
               });

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