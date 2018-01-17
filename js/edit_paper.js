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
   var grade_name = getUrlParam(url,'grade_name');
  var exam_subject_id = getUrlParam(url,'exam_subject_id');
  var exam_name = getUrlParam(url,'exam_name');
  var subject_name = getUrlParam(url,'subject_name');
  var left_tab = getUrlParam(url,'left_tab');
  var exam_sub_name =exam_name+'&nbsp;&nbsp;('+subject_name+')'
  var storage=window.localStorage;
  storage.setItem("left_tab",left_tab);
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
   	url: ajaxIp+"/api/v2/question_banks?docx_id="+docx_id+"",
  	dataType: "JSON",
  	data:{'limit':null,'page':null},
  	headers: {'Authorization': "Bearer " + isLogin},
  	success: function(data){
  		console.log(data);
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
       
  			$('#item-ul').append('<li class="items" data-id="'+data[i].sort+'"  data-grade="'+data[i].grade_id+'" item-id="'+data[i].id+'"><i class="item-op "><a href="javascript:;" class="save-btn right"><i class="iconfont">&#xe653;</i>保存</a><a href="javascript:;" class="look-detail right"  data-num="'+i+'"  data-id="'+data[i].id+'"><i class="iconfont">&#xe699;</i>查看解析</a></i><div class="item-cont editor-enabled" contenteditable="true" data-id="'+data[i].id+'">'+pp+'</div><ul class="bottom-btn"><li><a class="item-edit" data-num="'+i+'"  data-id="'+data[i].id+'"><i class="iconfont">&#xe614;</i>题干编辑</a></li><li><a href="javascript:;" class="item-seg"><i class="iconfont">&#xe636;</i>分割试题</a></li><li><a href="javascript:;" class="item-insert"><i class="iconfont">&#xe601;</i>题组插入</a></li><li><a href="javascript:;" class="item-merge"><i class="iconfont">&#xe689;</i>向下合并</a></li><li style="display:none;"><a href="javascript:;" class="grade-set"><i class="iconfont">&#xe630;</i>设定分指</a></li><li><a href="javascript:;" class="item-up"><i class="iconfont">&#xe631;</i>上移</a></li><li><a href="javascript:;" class="item-down"><i class="iconfont">&#xe607;</i>下移</a></li><li><a href="javascript:;" class="item-dele" data-num="'+i+'" data-id="'+data[i].id+'"><i class="iconfont">&#xe616;</i>删除</a></li><li><a href="javascript:;" class="determine bind-item" data-id="'+data[i].id+'">绑定题组</a></li></ul></li>');
         
      
  		};
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
                   // var data('name', 'value')
                   console.log(data);
                   var data_length=data.length;
                   var a=$('#item-ul li').length;
                   for(var i1=0;i1<a;i1++){
                    var item_id=$("#item-ul li").eq(i1).attr("item-id");
                   for(var i=0;i<data_length;i++){
                     
                  
                      
                      if(item_id==data[i].question_bank_id){
                        // console.log(item_id);
                         $("#item-ul li").eq(i1).find('.bind-item').html("更换绑定");
                          $("#item-ul li").eq(i1).find('.bind-item').attr("relation_id",data[i].id);
                          $("#item-ul li").eq(i1).find('.bind-item').attr("answer_id",data[i].answer_id);
                      }
                   }
                   }
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
      $(".sub_bd_t").attr("data-answer"," ");
      $(".sub_bd_t").attr("data-question"," ")
       $(".sub_bd_t").attr("data-item"," ")
      $(".sub_bd_t").attr("data-type",$(this).html());
      $(".sub_bd_t").attr("relation_id",$(this).attr("relation_id"));
      var answer_id=$(this).attr("answer_id");
       $.ajax({
                  type: "POST",
                  url: ajaxIp+"/api/v2/answers/answers_for_exam_subject",
                  data:{'exam_subject_id':exam_subject_id},
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){
                   $(".sub_bd02_ul01").html(" ");
                   // $(".sub_bd02_ul02").html(" ");
                    console.log(data);
                    var a=data.length;
                    for(var i=0;i<a;i++){
                      if(answer_id==data[i].id){
                      $(".sub_bd02_ul01").append('<li class="sub_bd02_ul01_li" data-id="'+data[i].id+'" data-item="'+data[i].item+'"><a>'+data[i].name+'</a></li>');
                      
                      }else{
                        $(".sub_bd02_ul01").append('<li  data-id="'+data[i].id+'" data-item="'+data[i].item+'"><a>'+data[i].name+'</a></li>');
                      
                      }
                       
                       // $(".sub_bd02_ul02").append('<li data-id="'+data[i].id+'" data-item="'+data[i].item+'"><i class="iconfont" style="">&#xe64b;</i></li>');
                    
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
      var d=$(".sub_bd_t").attr("data-type");
      var relation_id=$(".sub_bd_t").attr("relation_id");
      if(d=="绑定题组"){
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
                  console.log(data);
                   again_bang();
                    
                  },
                error: function(){
    
                 }
               });
              $(".sub_bd").hide();
              $(".layer").hide();
      };

      }else{
      if(isNaN(a)){ //判断a是否等于nan只能用isNaN(a)；不能用a=NaN;
           alert("请选择题组？");
           }else{
            $.ajax({
                  type: "POST",
                  url: ajaxIp+"/api/v2/question_banks/change_bind_answer",
                  data:{'id':relation_id,
                  'answer_id':a,
                  'item':c,
                },
                headers: {'Authorization': "Bearer " + isLogin},
                success: function(data){
                  again_bang();
                   
                    
                  },
                error: function(){
    
                 }
               });
              $(".sub_bd").hide();
              $(".layer").hide();
      }
      }
      
   });
   //绑定取消
  $(".sub_bd_f").click(function(event) {
      $(".sub_bd").hide();
      $(".layer").hide();
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

                 for(var i=0;i<a;i++){
                  // if(data[i].answer.item=="单选题"){
                  //   data[i].answer.item=0;
                  // }else if(data[i].answer.item=="多选题"){
                  //    data[i].answer.item=1;
                  // }else if(data[i].answer.item=="填空题"){
                  //    data[i].answer.item=2;
                  // }else if(data[i].answer.item=="是非题"){
                  //    data[i].answer.item=3;
                  // }else if(data[i].answer.item=="其他题"){
                  //    data[i].answer.item=4;
                  // }else if(data[i].answer.item=="作文题"){
                  //    data[i].answer.item=5;
                  // }
                 
                    $(".sub_sz_ul02").append('<li data-name="'+data[i].answer.item+'" data-id="'+data[i].answer.id+'" data-sort="'+data[i].answer.sort+'" ><select data-name="'+data[i].answer.item+'" ><option>单选题</option><option>多选题</option><option>填空题</option><option>是非题</option><option>其他题</option><option>作文题</option></select><input type="" name="" value="'+data[i].answer.answer_name+'"><a class="all_score"></a><i class="iconfont" data-id="0">&#xe622;</i><div class="sub_sz_list" style="overflow: auto;"><button data-id="'+data[i].answer.id+'"  style="float: right;width: 50px;height: 25px;color: #31bc91;text-align: center;line-height: 25px;margin-right: 68px;margin-top: 10px;background: #ffffff;">保存</button></div></li>');
                  var qb_length=data[i].question_banks.length;
                  // console.log(data[2].question_banks.length);
                 if(data[i].answer.item=="单选题"||data[i].answer.item=="多选题"||data[i].answer.item==0||data[i].answer.item==5){
                 for(var q_b=0;q_b<qb_length;q_b++){
                  if(data[i].question_banks[q_b].score==undefined){
                    data[i].question_banks[q_b].score=0;
                    }
                    if(data[i].question_banks[q_b].type_count==undefined){
                    data[i].question_banks[q_b].type_count=0;
                    }
                  $(".sub_sz_ul02 li").eq(i).find('.sub_sz_list button').before('<p data-id="'+data[i].question_banks[q_b].id+'" style="padding-left: 40px;box-sizing: border-box;" data-question="'+data[i].question_banks[q_b].question_bank_id+'"><a style="">序号<input disabled="disabled"  style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].question_banks[q_b].sort+'"></a><a style="margin-left: 70px;">选项个数<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].question_banks[q_b].type_count+'"></a><a style="margin-left: 88px;">分值<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;"  value="'+data[i].question_banks[q_b].score+'"></a></p>');
                 };
                 }else if(data[i].answer.item=="填空题"||data[i].answer.item=="是非题"||data[i].answer.item=="其他题"||data[i].answer.item==1||data[i].answer.item==2||data[i].answer.item==3){
                 for(var q_b=0;q_b<qb_length;q_b++){
                   if(data[i].question_banks[q_b].score==undefined){
                    data[i].question_banks[q_b].score=0;
                    }
                  $(".sub_sz_ul02 li").eq(i).find('.sub_sz_list button').before('<p data-id="'+data[i].question_banks[q_b].id+'" data-question="'+data[i].question_banks[q_b].question_bank_id+'"><a style="margin-left: 40px;">序号<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" disabled="disabled"  value="'+data[i].question_banks[q_b].sort+'"></a><a style="margin-left: 237px;">分值<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].question_banks[q_b].score+'"></a></p>');
                 }                       
                }else if(data[i].answer.item=="作文题"||data[i].answer.item==4){
                  for(var q_b=0;q_b<qb_length;q_b++){
                    if(data[i].question_banks[q_b].score==undefined){
                    data[i].question_banks[q_b].score=0;
                    }
                  $(".sub_sz_ul02 li").eq(i).find('.sub_sz_list button').before('<p data-id="'+data[i].question_banks[q_b].id+'" style="padding-left:10px;" data-question="'+data[i].question_banks[q_b].question_bank_id+'"><select name="" class="sub_sz_xz_select" data-id="'+data[i].question_banks[q_b].template_format+'"><option value="">方格</option><option value="">行线</option><option value="">间隔线</option></select><a style="margin-left: 50px;">序号<input disabled="disabled"  style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].question_banks[q_b].sort+'"></a><a style="margin-left: 10pN">格数<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].question_banks[q_b].lattice_total+'"></a><a style="margin-left:60px;">分值<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].question_banks[q_b].score+'"></a></p>');
                 
                 }
                 var p_se_length=$(".sub_sz_ul02 li").eq(i).find('button').parent().find("p").length;
                 console.log($(".sub_sz_ul02 li").eq(i).find('button').parent().find("p").length);

                 console.log("zhao");
                 for(var p_se=0;p_se<p_se_length;p_se++){
                     var a_se=$(".sub_sz_ul02 li").eq(i).find('button').parent().find("p").eq(p_se).children('select').attr("data-id");
                     if(a_se==1){
                       var a_se01=0;
                       $(".sub_sz_ul02 li").eq(i).find('button').parent().find("p").eq(p_se).children('select').find('option').eq(a_se01).attr("selected","selected");
                     
                     }else if(a_se==2){
                       var a_se01=1;
                       $(".sub_sz_ul02 li").eq(i).find('button').parent().find("p").eq(p_se).children('select').find('option').eq(a_se01).attr("selected","selected");
                     
                     }else if(a_se==3){
                       var a_se01=2;
                       $(".sub_sz_ul02 li").eq(i).find('button').parent().find("p").eq(p_se).children('select').find('option').eq(a_se01).attr("selected","selected");
                     
                     }
                   

                 } 
                };
                all_score();
                // console.log("123456");
                 // var num_a=$(".sub_sz_ul02 li").eq(i).children('select').find("option:selected").val();
                 // console.log(num_a);
                // $(".sub_sz_ul02 li").eq(i).children('select').find("option[text='多选题']").attr("selected",true);
               
                if(data[i].answer.item=="单选题"){
                  var item_num=0;
                   
                  }else if(data[i].answer.item=="多选题"){
                     var item_num=1;
                  }else if(data[i].answer.item=="填空题"){
                     var item_num=2;
                  }else if(data[i].answer.item=="是非题"){
                     var item_num=3;
                  }else if(data[i].answer.item=="其他题"){
                     var item_num=4;
                  }else if(data[i].answer.item=="作文题"){
                     var item_num=5;
                  }
                 $(".sub_sz_ul02 li").eq(i).children('select').find('option').eq(item_num).attr("selected","selected"); 
                
                }
                // console.log(data[0].question_banks.length);                     
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
$(".sub_sz_ul02").on('change', 'select', function(event) {
 var a=$(this).children('option:selected').val();
     if(a=="单选题"){
                  var item_num=0;
                   
                  }else if(a=="多选题"){
                     var item_num=1;
                  }else if(a=="填空题"){
                     var item_num=2;
                  }else if(a=="是非题"){
                     var item_num=3;
                  }else if(a=="其他题"){
                     var item_num=4;
                  }else if(a=="作文题"){
                     var item_num=5;
                  }
$(this).find('option').eq(item_num).attr("selected","selected"); 
                
});
     function all_score(){
      var li_length=$('.sub_sz_ul02 li').length;
      for(var a=0;a<li_length;a++){
        var p_length=$('.sub_sz_ul02 li').eq(a).find('button').parent().find("p").length;
       var li_name=$('.sub_sz_ul02 li').eq(a).attr("data-name");
        var score=0;
        if(li_name=="单选题"||li_name=="多选题"||li_name=="作文题"){
      for(var i=0;i<p_length;i++){
        var list_score=parseInt($('.sub_sz_ul02 li').eq(a).find('button').parent().find("p").eq(i).find('input').eq(2).val());
        if(isNaN(list_score)){
          score=score+0;
        }else{
         score=score+list_score;
         
        }
        
        // console.log(list_score);
      }
     $('.sub_sz_ul02 li').eq(a).find('button').parent().parent().find('.all_score').html(score);
     }else if(li_name=="填空题"||li_name=="是非题"||li_name=="其他题"){
     for(var i=0;i<p_length;i++){
        var list_score=parseInt($('.sub_sz_ul02 li').eq(a).find('button').parent().find("p").eq(i).find('input').eq(1).val());
        if(isNaN(list_score)){
          score=score+0;
        }else{
         score=score+list_score;
         
        }
        
        // console.log(list_score);
      }
     $('.sub_sz_ul02 li').eq(a).find('button').parent().parent().find('.all_score').html(score);
    

     };


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
        $(this).parent().prev().html('&#xe622;'); 
        $(this).parent().prev().parent("li").removeClass('sub_i_li');
        $(this).parent().prev().next('div').hide();
        $(this).parent().prev().attr("data-id","0");
       var name=$(this).parents('li').attr("data-name");
      
      all_score();

      var p_length=$(this).parent().find("p").length;
      var a_num=[];
      if(name=="单选题"||name=="多选题"||name==0||name==5){
      for(var i=0;i<p_length;i++){
        var a={};      
        var score=parseInt($(this).parent().find("p").eq(i).find('input').eq(2).val());
        var type_count=parseInt($(this).parent().find("p").eq(i).find('input').eq(1).val());
        var sort=parseInt($(this).parent().find("p").eq(i).find('input').eq(0).val());
        var question_bank_id=parseInt($(this).parent().find("p").eq(i).attr("data-question"));
        var id=parseInt($(this).parent().find("p").eq(i).attr("data-id"));
        if(isNaN(id)){
          id=null;
        }
        var answer_id=parseInt($(this).attr("data-id"));
         var count=parseInt($(this).parent().find("p").length);
          a["score"]=score;
          a["type_count"]=type_count;
          a["question_bank_id"]=question_bank_id;
           a["id"]=id;
          a["sort"]=sort;
          a["num"]=sort;
          a["doc_answer_id"]=answer_id;
          a["exam_subject_id"]=exam_subject_id;
          a["count"]=count;
          a_num[i]=a;
      }
     console.log(a_num);
    //   var a=[{'question_bank_id':73,'sort':7,'type_count':4,'score':2,'answer_id':2192,'exam_subject_id':516,'num':7,'count':3,},
    // {'question_bank_id':74,'sort':8,'type_count':4,'score':2,'answer_id':2192,'exam_subject_id':516,'num':8,'count':3,}];
    //  // console.log(a);
     $.ajax({
                  type: "POST",
                  url: ajaxIp+"/api/v2/question_banks/save_answer_settings",
                  data:{'answer_settings':JSON.stringify(a_num)},
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){
                     console.log(data);
                     layer.msg('保存成功',{time:700});
                  },
                error: function(){
    
                 }
               });
   }else if(name=="填空题"||name=="是非题"||name=="其他题"||name==1||name==2||name==3){
     for(var i=0;i<p_length;i++){
        var a={};
    
        var score=parseInt($(this).parent().find("p").eq(i).find('input').eq(1).val());
        var sort=parseInt($(this).parent().find("p").eq(i).find('input').eq(0).val());
        var question_bank_id=parseInt($(this).parent().find("p").eq(i).attr("data-question"));
        var id=parseInt($(this).parent().find("p").eq(i).attr("data-id"));
        if(isNaN(id)){
          id=null;
        }
        var answer_id=parseInt($(this).attr("data-id"));
         var count=parseInt($(this).parent().find("p").length);
          a["score"]=score;
          a["question_bank_id"]=question_bank_id;
          a["id"]=id;
          a["sort"]=sort;
          a["num"]=sort;
          a["doc_answer_id"]=answer_id;
          a["exam_subject_id"]=exam_subject_id;
          a["count"]=count;
          a_num[i]=a;
      }
     console.log(a_num);
    //   var a=[{'question_bank_id':73,'sort':7,'type_count':4,'score':2,'answer_id':2192,'exam_subject_id':516,'num':7,'count':3,},
    // {'question_bank_id':74,'sort':8,'type_count':4,'score':2,'answer_id':2192,'exam_subject_id':516,'num':8,'count':3,}];
    //  // console.log(a);
     $.ajax({
                  type: "POST",
                  url: ajaxIp+"/api/v2/question_banks/save_answer_settings",
                  data:{'answer_settings':JSON.stringify(a_num)},
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){
                     console.log(data);
                     layer.msg('保存成功',{time:700});
                  },
                error: function(){
    
                 }
               });


   }else if(name=="作文题"||name==4){
    for(var i=0;i<p_length;i++){
        var a={};
     
        var score=parseInt($(this).parent().find("p").eq(i).find('input').eq(2).val());
        if(isNaN(score)){
          score=0;
        }
        var template_format=$(this).parent().find("p").eq(i).find('select').children('option:selected').html();
        if(template_format=="方格"){
          template_format=1;
        }else if(template_format=="行线"){
          template_format=2;
        }else if(template_format=="间隔线"){
          template_format=3;
        }
        var sort=parseInt($(this).parent().find("p").eq(i).find('input').eq(0).val());
        var lattice_total=parseInt($(this).parent().find("p").eq(i).find('input').eq(2).val());
        var question_bank_id=parseInt($(this).parent().find("p").eq(i).attr("data-question"));
        var id=parseInt($(this).parent().find("p").eq(i).attr("data-id"));
        if(isNaN(id)){
          id=null;
        }
        var answer_id=parseInt($(this).attr("data-id"));
         var count=parseInt($(this).parent().find("p").length);
          a["score"]=score;
          a["question_bank_id"]=question_bank_id;
          a["id"]=id;
          a["sort"]=sort;
          a["num"]=sort;
          a["doc_answer_id"]=answer_id;
          a["exam_subject_id"]=exam_subject_id;
          a["count"]=count;
          a["template_format"]=template_format;
          a["lattice_total"]=lattice_total;
          a_num[i]=a;
      }
     console.log(a_num);
    //   var a=[{'question_bank_id':73,'sort':7,'type_count':4,'score':2,'answer_id':2192,'exam_subject_id':516,'num':7,'count':3,},
    // {'question_bank_id':74,'sort':8,'type_count':4,'score':2,'answer_id':2192,'exam_subject_id':516,'num':8,'count':3,}];
    //  // console.log(a);
     $.ajax({
                  type: "POST",
                  url: ajaxIp+"/api/v2/question_banks/save_answer_settings",
                  data:{'answer_settings':JSON.stringify(a_num)},
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){
                     console.log(data);
                     layer.msg('保存成功',{time:700});
                  },
                error: function(){
    
                 }
               });


   }

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
          // $(".sub_li").children('input').val($(".sub_li").children('input').val());
          // alert($(".sub_li").children('input').val());
          // var a=$(".sub_li").html();
          // var b=$(".sub_li").prev().html();
          // $(".sub_li").prev().html(a);
          // $(".sub_li").html(b);
          // $(".sub_li").prev().addClass('sub_li').siblings().removeClass('sub_li');
        var a_change=[];
        var a=$(".sub_li").attr("data-id");
        var b=$(".sub_li").attr("data-sort");
        var c=$(".sub_li").children('input').val();
        var d=$(".sub_li").children('select').children('option:selected').val();
        var a_1=$(".sub_li").prev().attr("data-id");
        var b_1=$(".sub_li").prev().attr("data-sort");
        var c_1=$(".sub_li").prev().children('input').val();
        var d_1=$(".sub_li").prev().children('select').children('option:selected').val();
        var a_change01={};
        a_change01["id"]=a;
        a_change01["sort"]=b_1;
        a_change01["name"]=c;
        a_change01["item"]=d;
       
        var a_change02={};
        a_change02["id"]=a_1;
        a_change02["sort"]=b;
        a_change02["name"]=c_1;
        a_change02["item"]=d_1;
        a_change[0]= a_change01;
         a_change[1]= a_change02;
        console.log(a_change);
      $.ajax({
                  type: "POST",
                  async:false,
                  url: ajaxIp+"/api/v2/answers/change_answers",
                  data:{'answers':JSON.stringify(a_change)},
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){
                    again_tizhu();
                  },
                error: function(){
    
                 }
               });
          
                    
        });
        // 下移
        $(".sub_btm").click(function(event) {

          // var a=$(".sub_li").html();
          // var b=$(".sub_li").next().html();
          // // var c_01=$(".sub_li").attr("data-id");
          // // var c_02=$(".sub_li").next().attr("data-id");
          // $(".sub_li").next().html(a);
          // $(".sub_li").html(b);
          //  $(".sub_li").next().addClass('sub_li').siblings().removeClass('sub_li');
        var a_change=[];
        var a=$(".sub_li").attr("data-id");
        var b=$(".sub_li").attr("data-sort");
        var c=$(".sub_li").children('input').val();
        var d=$(".sub_li").children('select').children('option:selected').val();
        var a_1=$(".sub_li").next().attr("data-id");
        var b_1=$(".sub_li").next().attr("data-sort");
        var c_1=$(".sub_li").next().children('input').val();
        var d_1=$(".sub_li").next().children('select').children('option:selected').val();
        var a_change01={};
        a_change01["id"]=a;
        a_change01["sort"]=b_1;
        a_change01["name"]=c;
        a_change01["item"]=d;
       
        var a_change02={};
        a_change02["id"]=a_1;
        a_change02["sort"]=b;
        a_change02["name"]=c_1;
        a_change02["item"]=d_1;
        a_change[0]= a_change01;
         a_change[1]= a_change02;
        console.log(a_change);
      $.ajax({
                  type: "POST",
                  async:false,
                  url: ajaxIp+"/api/v2/answers/change_answers",
                  data:{'answers':JSON.stringify(a_change)},
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){
                    again_tizhu();
                  },
                error: function(){
    
                 }
               });
          
                    
      
        });
        //增加
        $(".sub_add").click(function(event) {
            var a="单选题";
           var b=null;
         $.ajax({
                  type: "POST",
                  async: false,
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
                  async: false,
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
       //重新访问题组
       again_tizhu();

        });
//重新访问题组
// function again_tizhu(){
//         $.ajax({
//                   type: "POST",
//                   async: false,
//                   url: ajaxIp+"/api/v2/question_banks/question_answers",
//                   data:{
//                   'exam_subject_id':exam_subject_id,
//                   },
//                 headers: {'Authorization': "Bearer " + isLogin},
//                 success: function(data){
//                   console.log(data);
//                   $(".sub_sz_ul02").html(" ");  
//                  var a=data.length;
          
//                  for(var i=0;i<a;i++){
                  
//                     $(".sub_sz_ul02").append('<li data-name="'+data[i].answer.item+'" data-id="'+data[i].answer.id+'"  data-sort="'+data[i].answer.sort+'" ><select data-name="'+data[i].answer.item+'" ><option>单选题</option><option>多选题</option><option>填空题</option><option>是非题</option><option>其他题</option><option>作文题</option></select><input type="" name="" value="'+data[i].answer.answer_name+'"><a class="all_score"></a><i class="iconfont" data-id="0">&#xe622;</i><div class="sub_sz_list" style="overflow: auto;"><button data-id="'+data[i].answer.id+'"  style="float: right;width: 50px;height: 25px;color: #31bc91;text-align: center;line-height: 25px;margin-right: 68px;margin-top: 10px;">保存</button></div></li>');
//                   var qb_length=data[i].question_banks.length;
//                  if(data[i].answer.item=="单选题"||data[i].answer.item=="多选题"){
//                  for(var q_b=0;q_b<qb_length;q_b++){
//                   if(data[i].question_banks[q_b].score==undefined){
//                     data[i].question_banks[q_b].score=0;
//                     }
//                     if(data[i].question_banks[q_b].type_count==undefined){
//                     data[i].question_banks[q_b].type_count=0;
//                     }
//                   $(".sub_sz_ul02 li").eq(i).find('.sub_sz_list button').before('<p data-id="'+data[i].question_banks[q_b].id+'" style="padding-left: 40px;box-sizing: border-box;" data-question="'+data[i].question_banks[q_b].question_bank_id+'"><a style="">序号<input disabled="disabled"  style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].question_banks[q_b].sort+'"></a><a style="margin-left: 70px;">选项个数<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].question_banks[q_b].type_count+'"></a><a style="margin-left: 88px;">分值<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;"  value="'+data[i].question_banks[q_b].score+'"></a></p>');
//                  };
//                  }else if(data[i].answer.item=="填空题"||data[i].answer.item=="是非题"||data[i].answer.item=="其他题"){
//                  for(var q_b=0;q_b<qb_length;q_b++){
//                    if(data[i].question_banks[q_b].score==undefined){
//                     data[i].question_banks[q_b].score=0;
//                     }
//                   $(".sub_sz_ul02 li").eq(i).find('.sub_sz_list button').before('<p data-id="'+data[i].question_banks[q_b].id+'" data-question="'+data[i].question_banks[q_b].question_bank_id+'"><a style="margin-left: 40px;">序号<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" disabled="disabled"  value="'+data[i].question_banks[q_b].sort+'"></a><a style="margin-left: 237px;">分值<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].question_banks[q_b].score+'"></a></p>');
//                  }                       
//                 }else if(data[i].answer.item=="作文题"){
//                   for(var q_b=0;q_b<qb_length;q_b++){
//                     if(data[i].question_banks[q_b].score==undefined){
//                     data[i].question_banks[q_b].score=0;
//                     }
//                   $(".sub_sz_ul02 li").eq(i).find('.sub_sz_list button').before('<p data-id="'+data[i].question_banks[q_b].id+'" style="padding-left:10px;" data-question="'+data[i].question_banks[q_b].question_bank_id+'"><select name="" class="sub_sz_xz_select"><option value="">方格</option><option value="">行线</option><option value="">间隔线</option></select><a style="margin-left: 50px;">序号<input disabled="disabled"  style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].question_banks[q_b].sort+'"></a><a style="margin-left: 10pN">格数<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].question_banks[q_b].lattice_total+'"></a><a style="margin-left:60px;">分值<input style="width: 25px;height: 25px;border-radius: 2px;border: 1px solid #ccc;margin-left: 5px;text-align: center;" value="'+data[i].question_banks[q_b].score+'"></a></p>');
//                  }
//                  var p_se_length=$(".sub_sz_ul02 li").eq(i).find('button').parent().find("p").length;
//                  console.log($(".sub_sz_ul02 li").eq(i).find('button').parent().find("p").length);

//                  console.log("zhao");
//                  for(var p_se=0;p_se<p_se_length;p_se++){
//                      var a_se=$(".sub_sz_ul02 li").eq(i).find('button').parent().find("p").eq(p_se).children('select').attr("data-id");
//                      if(a_se==1){
//                        var a_se01=0;
//                        $(".sub_sz_ul02 li").eq(i).find('button').parent().find("p").eq(p_se).children('select').find('option').eq(a_se01).attr("selected","selected");
                     
//                      }else if(a_se==2){
//                        var a_se01=1;
//                        $(".sub_sz_ul02 li").eq(i).find('button').parent().find("p").eq(p_se).children('select').find('option').eq(a_se01).attr("selected","selected");
                     
//                      }else if(a_se==3){
//                        var a_se01=2;
//                        $(".sub_sz_ul02 li").eq(i).find('button').parent().find("p").eq(p_se).children('select').find('option').eq(a_se01).attr("selected","selected");
                     
//                      }
                   

//                  }   
//                 };
//                 all_score();
//                 if(data[i].answer.item=="单选题"){
//                   var item_num=0;
                   
//                   }else if(data[i].answer.item=="多选题"){
//                      var item_num=1;
//                   }else if(data[i].answer.item=="填空题"){
//                      var item_num=2;
//                   }else if(data[i].answer.item=="是非题"){
//                      var item_num=3;
//                   }else if(data[i].answer.item=="其他题"){
//                      var item_num=4;
//                   }else if(data[i].answer.item=="作文题"){
//                      var item_num=5;
//                   }
//                  $(".sub_sz_ul02 li").eq(i).children('select').find('option').eq(item_num).attr("selected","selected"); 
                
//                 }
//                 // console.log(data[0].question_banks.length);                     
//                   },
//                 error: function(){
    
//                  }
//                }); 
// }
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
          var a=$(".sub_li").attr("data-id");
          $(".sub_li").remove();
          $(".sub_sz_remove").hide();  
          console.log(a);
          $.ajax({
                  type: "POST",
                  url: ajaxIp+"/api/v2/question_banks/delete_answer",
                  data:{'id':a},
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){
                   again_tizhu();
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
      var a_change=[];
      for(var i=0;i<li_length;i++){
        var a=$(".sub_sz_ul02 li").eq(i).attr("data-id");
        var b=i+1;
        console.log($(".sub_sz_ul02 li").eq(i).attr("data-id"));
        // ans_sort(a,b);
        
        var c=$(".sub_sz_ul02 li").eq(i).children('input').val();
        var d=$(".sub_sz_ul02 li").eq(i).children('select').children('option:selected').val();
        var a_change01={};
        a_change01["id"]=a;
        a_change01["sort"]=b;
        a_change01["name"]=c;
        a_change01["item"]=d;
        a_change[i]= a_change01;

      }
      console.log(a_change);
      $.ajax({
                  type: "POST",
                  url: ajaxIp+"/api/v2/answers/change_answers",
                  data:{'answers':JSON.stringify(a_change)},
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){
                     console.log(data);
                  },
                error: function(){
    
                 }
               });
     
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
  $(this).attr('href','edit_analysis?docx_id=' +docx_id+ '&number='+a+'&exam_subject_id='+exam_subject_id+'&id='+b+'');
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
       $.ajax({
                  type: "POST",
                  async:false,
                  url: ajaxIp+"/api/v2/question_banks",
                  data:{'content':nw_ary[0],
                         'docx_id':docx_id,
                         'sort':new_sort,
                         'grade_id':grade_id,
                  },
                  headers: {'Authorization': "Bearer " + isLogin},
                  success: function(data){                  
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