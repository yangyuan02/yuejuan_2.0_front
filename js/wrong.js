 $(document).ready(function() {
    var isLogin = localStorage.getItem("token");    
    
     //切换模块
     $(".wrong_left_ul li").click(function(event) {
         var a = $(this).index();
         $(this).attr("id", 'wrong_left_li').siblings().attr("id", '');
         $(".wrong_top").html($(this).html());
         $(".wrong_main").children('div').eq(a).show().siblings().hide();
         // $(".wrong_main").children('div').eq(a).show().siblings().children('.ans').hide();
     
     });
     //全部题型
     $(".type_all").click(function(event) {
         var a = $(this).attr('data-id');
         if (a == 0) {
             $(this).css("background", "#31bc91");
             $(".type_ever a").css("background", "#31bc91");
             $(".type_ever a").attr('data-id', '1');
             $(this).attr('data-id', '1');
         } else {
             $(this).css("background", "#cccccc");
             $(".type_ever a").css("background", "#cccccc");
             $(".type_ever a").attr('data-id', '0');
             $(this).attr('data-id', '0');
         }
     });
     //每个题型
     $(".type_ever a").click(function(event) {
         var a = $(this).attr('data-id');
         if (a == 0) {
             $(this).css("background", "#31bc91");
             $(this).attr('data-id', '1');

         }else{
             $(this).css("background", "#cccccc");
             $(this).attr('data-id', '0');
             $(".type_all").css("background", "#cccccc");

         }

     });

     //考试错题
     $(".grade_sur").click(function(event) {
         $(".grade_ans").slideDown('1000');
     });
     $(".grade_off").click(function(event) {
         $(".grade_ans").slideUp('1000');
     });
     $(".wrong_left_ul li").eq(0).click(function(event) {
         $(".wrong_main").children('div').eq(1).children('.class_ans').hide();
         $(".wrong_main").children('div').eq(2).children('.per_ans').hide();
     });
     //移除
     $(".grade_list_ul").on('click', '.grade_list_move_a', function(event) {
         for(var i=0;i<$(".grade_list_ul li").length;i++){
          $(".grade_list_ul li").eq(i).find('.grade_list_move_a').attr("data-id",i);
       }
       $(this).parents('li').remove();
       var index=parseInt($(this).attr("data-id"));
       console.log(index);
       $(".grate_topic_ever_box a").eq(index).remove();
      
     });

    ///
     	
     	//题号排序
     	// var a = $(".grade_list").children('div').length;
     	// if(a<10){
     	// 	var a_nub=1;
     	// 	for(var i=0;i<a;i++){
      //         var a_num="0"+a_nub;
      //          $(".grade_list").children('div').eq(i).find('.grade_list_number a').html(a_num);
      //           a_nub++;
     	// 	}
     	// }
     	
     // });
     $(".grade_print").click(function(event) {
     $("#footer").hide();
     $(".ans_result").hide();
     $(".wrong_left_ul").hide();
     $(".grade_list_move").hide();
     $(".q_type").hide();
     $(".grade_select_top").hide();
     $(".grate_topic").hide();
      $("#header").hide();
      $(".title-box").hide();
       $(".wrong_top").hide();
       $(".ans_news").hide();
     $(".main").css("width","100%");
      $(".main").css("margin-top","0px");
       $(".grade_list").css("padding","0px");
      $(".wrong_right").css("width","100%");
      $(".wrong_right").css("padding","0");
     $(".grade_list_main").css("width","100%");
      window.print();
       $("#footer").show();
     $(".ans_result").show();
     $(".wrong_left_ul").show();
     $(".grade_list_move").show();
     $(".q_type").show();
     $(".grade_select_top").show();
     $(".grate_topic").show();
      $("#header").show();
      $(".title-box").show();
       $(".wrong_top").show();
       $(".ans_news").show();
     $(".main").css("width","1200px");
      $(".wrong_right").css("width","1000px");
     $(".grade_list_main").css("width","923px");
      $(".main").css("margin-top","45px");
       $(".grade_list").css("padding","20px 0px 100px 0px");
     $(".wrong_right").css("padding","43px 40px 100px 35px");
     });
       $(".class_print").click(function(event) {
     $("#footer").hide();
     $(".ans_result").hide();
     $(".wrong_left_ul").hide();
     $(".class_list_move").hide();
     $(".q_type").hide();
     $(".class_select_top").hide();
     $(".class_topic").hide();
      $("#header").hide();
      $(".title-box").hide();
       $(".wrong_top").hide();
       $(".ans_news").hide();
     $(".main").css("width","100%");
      $(".main").css("margin-top","0px");
       $(".class_list").css("padding","0px");
      $(".wrong_right").css("width","100%");
      $(".wrong_right").css("padding","0");
     $(".class_list_main").css("width","100%");
      window.print();
       $("#footer").show();
     $(".ans_result").show();
     $(".wrong_left_ul").show();
     $(".class_list_move").show();
     $(".q_type").show();
     $(".class_select_top").show();
     $(".class_topic").show();
      $("#header").show();
      $(".title-box").show();
       $(".wrong_top").show();
       $(".ans_news").show();
     $(".main").css("width","1200px");
      $(".wrong_right").css("width","1000px");
     $(".class_list_main").css("width","923px");
      $(".main").css("margin-top","45px");
       $(".class_list").css("padding","20px 0px 100px 0px");
     $(".wrong_right").css("padding","43px 40px 100px 35px");
     });
       $(".per_print").click(function(event) {
     $("#footer").hide();
     $(".ans_result").hide();
      $(".students_key").hide();
       $(".students_key_box").hide();
     $(".wrong_left_ul").hide();
     $(".per_list_move").hide();
     $(".q_type").hide();
     $(".per_select_top").hide();
     $(".per_topic").hide();
      $("#header").hide();
      $(".title-box").hide();
       $(".wrong_top").hide();
       $(".ans_news").hide();
     $(".main").css("width","100%");
      $(".main").css("margin-top","0px");
       $(".per_list").css("padding","0px");
      $(".wrong_right").css("width","100%");
      $(".wrong_right").css("padding","0");
     $(".per_list_main").css("width","100%");
     $(".per_wrong_select").hide();
      window.print();
       $("#footer").show();
        $(".per_wrong_select").show();
     $(".ans_result").show();
      $(".students_key_box").show();
       $(".students_key").show();
     $(".wrong_left_ul").show();
     $(".per_list_move").show();
     $(".q_type").show();
     $(".per_select_top").show();
     $(".per_topic").show();
      $("#header").show();
      $(".title-box").show();
       $(".wrong_top").show();
       $(".ans_news").show();
     $(".main").css("width","1200px");
      $(".wrong_right").css("width","1000px");
     $(".per_list_main").css("width","923px");
      $(".main").css("margin-top","45px");
       $(".per_list").css("padding","20px 0px 100px 0px");
     $(".wrong_right").css("padding","43px 40px 100px 35px");
     });
     
     // 考试ajax
     $.ajax({
            type: "GET",
            url: ajaxIp + "/api/v2/reports/exams",
            async: false,
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
                console.log(data);
             var exam_length=data.length;
             for(var i=0;i<exam_length;i++){
              $(".grade_exam").attr("data-id",data[0].id);
              $(".grade_exam").attr("grade_id",data[0].grade_id);
              $(".grade_exam").attr("school_id",data[0].school_id);
              // var class_id=[];
              // for(var class_i=0;class_i<data[i].classrooms.length;class_i++){
              //    class_id[class_i]=data[i].classrooms[class_i].classroom_id;
              //    console.log(class_id);
              // }

               $(".grade_exam").append('<option value="" data-id="'+data[i].id+'" grade_id="'+data[i].grade_id+'" school_id="'+data[i].school_id+'">'+data[i].name+'</option>');  
             
             }
              
             var sub_length=data[0].subjects.length;
             var sub=data[0].subjects;
              $(".grade_exam").change(function(event) {
                var in_dex=parseInt($(this).children('option:selected').index());
                 sub_length=data[in_dex].subjects.length;
                  sub=data[in_dex].subjects;
               $(".grade_sub").html(" ");
               for(var a=0;a<sub_length;a++){
                console.log(in_dex);
                $(".grade_sub").attr("data-id",data[in_dex].subjects[0].subject_id);
               $(".grade_sub").append('<option value="" data-id="'+sub[a].subject_id+'">'+sub[a].name+'</option>')
               }
               
               });
               for(var a=0;a<sub_length;a++){
                 $(".grade_sub").attr("data-id",data[0].subjects[0].subject_id);
               $(".grade_sub").append('<option value="" data-id="'+sub[a].subject_id+'">'+sub[a].name+'</option>')
               }
             
               
             
            },
            error: function() {
                
            }

        });
     $(".grade_exam").change(function(event) {
        $(this).attr("data-id",$(this).children('option:selected').attr("data-id"));
         $(this).attr("grade_id",$(this).children('option:selected').attr("grade_id"));
         $(this).attr("school_id",$(this).children('option:selected').attr("school_id"));
        console.log($(this).children('option:selected').attr("data-id"));
     });
      $(".grade_sub").change(function(event) {
        $(this).attr("data-id",$(this).children('option:selected').attr("data-id"));
        console.log($(this).children('option:selected').attr("data-id"));
     });
      $(".grade_select_top select").change(function(event) {
        $(".grade_ans").hide();
      });
     //年级 ajax  end
     //班级错题

     // var wrong=[{time:"最近一周",grade:[{id:11,name:"高一",},{id:12,name:"高二",}],class:[{id:11,name:"一",},{id:12,name:"二",}],subject:[{id:21,name:"数学",},{id:22,name:"英文",}]},
     // {time:"最近一月",grade:[{id:12,name:"高二",},{id:11,name:"高一",}],class:[{id:12,name:"二",},{id:11,name:"一",}],subject:[{id:45,name:"物理",},{id:46,name:"化学",}]}];
     // console.log(wrong);
     //   console.log(wrong.length);
       $(".grade_rate").change(function(event) {
        var a=$(this).children('option:selected').val();
         $(this).attr("rate-id",a);
       });
      $(".grade_sort").change(function(event) {
       $(this).attr("data-id",$(this).children('option:selected').attr("data-id"));
       grade_list();
      });
     $(".class_sort").change(function(event) {
       $(this).attr("data-id",$(this).children('option:selected').attr("data-id"));
       class_list();
      });
    $(".grade_sur").click(function(event) {
    grade_list();
    console.log($(".grate_topic a").length);
    // if(){

    // }
    });
 // 考试生成错题本
  function grade_list(){
     var rate=$(".grade_rate").attr("rate-id");
    
   var data_num=[];
    if($(".grade_sur").parent().prev().find('a').eq(0).attr("data-id")==1){
    data_num[0]=0;
    data_num[1]=5;
    }
    if($(".grade_sur").parent().prev().find('a').eq(1).attr("data-id")==1){
      
      if(data_num.length==0){
       data_num[0]=1;
      }else{
        data_num[data_num.length]=1;
      }
    
    }
    if($(".grade_sur").parent().prev().find('a').eq(2).attr("data-id")==1){
      if(data_num.length==0){
       data_num[0]=2;
      }else{
        data_num[data_num.length]=2;
      }
    }
    if($(".grade_sur").parent().prev().find('a').eq(3).attr("data-id")==1){
      if(data_num.length==0){
       data_num[0]=3;
      }else{
        data_num[data_num.length]=3;
      }
    }
    if($(".grade_sur").parent().prev().find('a').eq(4).attr("data-id")==1){
    if(data_num.length==0){
       data_num[0]=4;
      }else{
        data_num[data_num.length]=4;
      }
    }
   console.log(data_num);
   var sort =$(".grade_sort").attr("data-id");
   var grade_exam=parseInt($(".grade_exam").attr("data-id"));
   var grade_sub=parseInt($(".grade_sub").attr("data-id"));
    console.log(grade_exam);
     console.log(grade_sub);
      $.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/wrong_questions/grade_index",
            async: false,
            data:{
                "exam_id":grade_exam,
                 "subject_id":grade_sub,
                 "item":data_num,
                 "rate":rate,
                  "sort":sort,
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            beforeSend: function(){
                $(".load-bg").show();
                },
            success: function(data) {
                console.log(data);
                 $(".grade_list_ul").html(" ");
                 $(".grate_topic_ever_box").html(" ");
              for(var i=0;i<data.length;i++){
                var scoring_rate=Math.floor(data[i].scoring_rate*100)+"%";
                // console.log(scoring_rate);
                 var tags=data[i].tags;
                 //知识点
                // for(var i1=0;i1<data[i].tags.length;i1++){
                     // tags= tags+data[i].tags;
                     
                // }
                // console.log(tags);
              //难度系数
              var difficulty_level=Number(data[i].difficulty_level);
              // console.log(difficulty_level);
              if(difficulty_level==0){
                var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              }else if(difficulty_level>=0.86){

               var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
              }else if(difficulty_level>=0.71&&difficulty_level<0.86){
               var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
              }else if(difficulty_level>=0.61&&difficulty_level<0.71){
                 var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
              }else if(difficulty_level>=0.41&&difficulty_level<0.61){
                 var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
              }else if(difficulty_level>0&&difficulty_level<0.41){
                 var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i>';
              
              }
              //考试来源
              var source=data[i].source;
              //序号
              var num=data[i].num;
              // if(num<10){
              //     var num='0'+Number(data[i].num);
              // }
              //小题上标(得分率)
              var a_rate=Number(data[i].scoring_rate);
              if(a_rate>=0.86){
              $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#31bc91;" scoring_rate="'+data[i].scoring_rate+'" bank_id="'+data[i].question_bank_id+'" average_score="'+data[i].average_score+'" exam_subject_id="'+data[i].exam_subject_id+'" total_score="'+data[i].total_score+'" item="'+data[i].item+'" classroom_id="'+data[i].classroom_id+'" href="#grade_list_move'+data[i].question_bank_id+'">'+num+'</a>');
              var num_color="#31bc91";
             }else if(a_rate>=0.8&&a_rate<0.95){
               $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#f7c07c;" scoring_rate="'+data[i].scoring_rate+'" bank_id="'+data[i].question_bank_id+'" average_score="'+data[i].average_score+'" exam_subject_id="'+data[i].exam_subject_id+'" total_score="'+data[i].total_score+'" item="'+data[i].item+'" classroom_id="'+data[i].classroom_id+'" href="#grade_list_move'+data[i].question_bank_id+'">'+num+'</a>');
             var num_color="#f7c07c";
             }else if(a_rate>=0.6&&a_rate<0.8){
               $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#5fa3ed;" scoring_rate="'+data[i].scoring_rate+'" bank_id="'+data[i].question_bank_id+'" average_score="'+data[i].average_score+'" exam_subject_id="'+data[i].exam_subject_id+'" total_score="'+data[i].total_score+'" item="'+data[i].item+'" classroom_id="'+data[i].classroom_id+'" href="#grade_list_move'+data[i].question_bank_id+'">'+num+'</a>');
             var num_color="#5fa3ed";
             }else if(a_rate>=0&&a_rate<0.6){
               $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#fb7d8a;" scoring_rate="'+data[i].scoring_rate+'" bank_id="'+data[i].question_bank_id+'" average_score="'+data[i].average_score+'" exam_subject_id="'+data[i].exam_subject_id+'" total_score="'+data[i].total_score+'" item="'+data[i].item+'" classroom_id="'+data[i].classroom_id+'" href="#grade_list_move'+data[i].question_bank_id+'">'+num+'</a>');
             var num_color="#fb7d8a";
             }

                $(".grade_list_ul").append('<li id="grade_list_move'+data[i].question_bank_id+'"><div class="grade_list_main"><div class="grade_list_body">'+data[i].content+'</div><p class="grade_list_lable"><a>年级得分率:<i>'+scoring_rate+'</i></a><a>年级平均分:<i>'+data[i].average_score+'分</i></a><a>知识点:<i>'+tags+'</i></a><a class="grade_list_dif">难度系数:'+difficulty_body+'</a></p><div class="grade_list_move"><a class="grade_list_body_ans"  data-id="'+i+'"><i class="iconfont" style="margin-right:5px;">&#xe61e;</i>查看答案和解析</a><a  class="grade_list_move_a">移除</a></div><div class="grade_list_number"><p><i class="iconfont" style="font-size:45px;color:'+num_color+';">&#xe63f;</i><a>'+num+'</a></p></div><div class="grade_list_form">试题来源:<a>'+source+'</a></div></div></li>');
              }
             $(".grate_topic_ever_box").append('<div style="margin-top: 10px;color: #ccc;clear: both;"><i class="iconfont" style="font-size: 14px;color: #31bc91;margin-right: 5px;">&#xe646;</i>小提示：点击题号可以定位到相应题目</div>');

            },
            complete: function(){

                  $(".load-bg").hide();

                },
            error:function() {
               $(".load-bg").hide();
            },
        });
}
 
$(".grade_make_wrong").click(function(event) {
    var sub_id=$(".grade_sub").attr("data-id");
   
    var grade_id=$(".grade_exam").attr("grade_id");
    var school_id=$(".grade_exam").attr("school_id");
    var a_long=$(".grate_topic_ever_box a").length;
    console.log(a_long);
     console.log($(".grate_topic_ever_box a").eq(0).html());
    // var li_long=$(".grade_list_main");
    
     var grade_wrongs=[];
  for(var i=0;i<a_long;i++){
    var grade_wrong={};
    grade_wrong["subject_id"]=sub_id;
    grade_wrong["grade_id"]=grade_id;
    grade_wrong["school_id"]=school_id;
    grade_wrong["scoring_rate"]=$(".grate_topic_ever_box a").eq(i).attr("scoring_rate");
    grade_wrong["average_score"]=$(".grate_topic_ever_box a").eq(i).attr("average_score");
    grade_wrong["exam_subject_id"]=$(".grate_topic_ever_box a").eq(i).attr("exam_subject_id");
    grade_wrong["total_score"]=$(".grate_topic_ever_box a").eq(i).attr("total_score");
    grade_wrong["item"]=$(".grate_topic_ever_box a").eq(i).attr("item");
    grade_wrong["question_bank_id"]=$(".grate_topic_ever_box a").eq(i).attr("bank_id");
     grade_wrong["classroom_id"]=$(".grate_topic_ever_box a").eq(i).attr("classroom_id");

    grade_wrongs[i]=grade_wrong;
  }
  var exam_subject_id=$(".grate_topic_ever_box a").eq(0).attr("exam_subject_id");
  console.log($(".grade_exam").children('option:selected').text());
  console.log($(".grade_sub").children('option:selected').text());
  console.log($(".grade_rate").children('option:selected').text());
  var title=$(".grade_exam").children('option:selected').text()+'-'+$(".grade_sub").children('option:selected').text()+'-'+$(".grade_rate").children('option:selected').text();
   console.log(grade_wrongs);
   console.log(title);
$.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/wrong_questions",
            async: false,
            data:{
                "wrong_questions":JSON.stringify(grade_wrongs),
                 "type":"grade",
                 "title":title,
                 "exam_subject_id":exam_subject_id,

            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
               console.log(data);
                layer.msg('生成成功',{time:700});
            },
            error: function(data) {

            },
        })


});
 
   //班级错题集
$(".wrong_left_ul li").eq(1).click(function(event){
   $.ajax({
            type: "GET",
            url: ajaxIp + "/api/v2/reports/exams",
            async: false,
            headers:{
                'Authorization':"Bearer "+ isLogin
            },
            success: function(data) {
            console.log("1122");
             console.log(data);
             // 班级考试
             $(".class_exam").html(" ");
             $(".class_class").html(" ");
             $(".class_sub").html(" ");
             $(".class_exam").attr("data-id",data[0].id);
             $(".class_class").attr("data-id",data[0].classrooms[0].classroom_id);
             $(".class_sub").attr("data-id",data[0].subjects[0].subject_id);
             for(var i=0;i<data.length;i++){
             $(".class_exam").append('<option data-id="'+data[i].id+'">'+data[i].name+'</option>');

             }
          for(var a=0;a<data[0].classrooms.length;a++){
             $(".class_class").append('<option data-id="'+data[0].classrooms[a].classroom_id+'">'+data[0].classrooms[a].classroom_name+'</option>');
             }
            for(var b=0;b<data[0].subjects.length;b++){
             $(".class_sub").append('<option data-id="'+data[0].subjects[b].subject_id+'">'+data[0].subjects[b].name+'</option>');
             }
           

        $(".class_exam").change(function(event) {
              $(".class_class").html(" ");
              $(".class_sub").html(" ");

            var index=$(this).children('option:selected').index();
             $(".class_class").attr("data-id",data[index].classrooms[0].classroom_id);
             $(".class_sub").attr("data-id",data[index].subjects[0].subject_id);
          for(var a=0;a<data[index].classrooms.length;a++){
             $(".class_class").append('<option data-id="'+data[index].classrooms[a].classroom_id+'">'+data[index].classrooms[a].classroom_name+'</option>');
             }
            for(var b=0;b<data[index].subjects.length;b++){
             $(".class_sub").append('<option data-id="'+data[index].subjects[b].subject_id+'">'+data[index].subjects[b].name+'</option>');
             }
            });

            },
            error:function(){

            },
          })


 });
// $(".class_select_time").change(function(event) {
// $(".class_select_time").attr("data-id",$(".class_select_time").children('option:selected').attr("data-id"));
//      near_exam();
// });
//  $(".wrong_class_li").click(function(event) {
//          /* Act on the event */
//          near_exam();
//      });
//  function near_exam(){
//   var time_type=$(".class_select_time").attr("data-id");
//   var id=$(".class_select_grate").attr("data-id");
//   console.log(time_type);
//   $.ajax({
//             type: "POST",
//             url: ajaxIp + "/api/v2/wrong_questions/lately_exams",
//             async: false,
//             data:{
//                 "time_type":time_type,
//                  "grade_id":id,
        
//             },
//             headers: {
//                 'Authorization': "Bearer " + isLogin
//             },
//             success: function(data) {
//                 $(".class_sur").attr("exam_id"," ");
//                 $(".class_sur").attr("exam_length"," ");
//                 var exam_id=[];
//                 for(var i=0;i<data.length;i++){
//                  exam_id[i]=data[i].id;
//                 }
//                 $(".class_sur").attr("exam_id",exam_id);
//                 $(".class_sur").attr("exam_length",exam_id.length);
              
//             },
//             error:function(){

//             },
//         });
//  }    

$(".class_sur").click(function(event) {
  class_list();
})
function class_list(){
// console.log($(".class_sur").attr("exam_id"));
// var exam_id=$(".class_sur").attr("exam_id");
// var exam_length=$(".class_sur").attr("exam_length");
// console.log(exam_id);
// if(exam_id!==undefined){
// var words = exam_id.split(',');
// }
var word =$(".class_exam").attr("data-id");
// for(var length=0;length<exam_length;length++){
//      word[length]=parseInt(words[length]);
// }
// console.log(word);
//类型
 var data_num=[];
    if($(".class_sur").parent().prev().find('a').eq(0).attr("data-id")==1){
    data_num[0]=0;
    data_num[1]=5;
    }
    if($(".class_sur").parent().prev().find('a').eq(1).attr("data-id")==1){
      
      if(data_num.length==0){
       data_num[0]=1;
      }else{
        data_num[data_num.length]=1;
      }
    
    }
    if($(".class_sur").parent().prev().find('a').eq(2).attr("data-id")==1){
      if(data_num.length==0){
       data_num[0]=2;
      }else{
        data_num[data_num.length]=2;
      }
    }
    if($(".class_sur").parent().prev().find('a').eq(3).attr("data-id")==1){
      if(data_num.length==0){
       data_num[0]=3;
      }else{
        data_num[data_num.length]=3;
      }
    }
    if($(".class_sur").parent().prev().find('a').eq(4).attr("data-id")==1){
    if(data_num.length==0){
       data_num[0]=4;
      }else{
        data_num[data_num.length]=4;
      }
    }
   console.log(data_num);
  var rate=$(".class_select_rate").attr("data-id");
  var class_id=$(".class_class").attr("data-id");
  var sub_id=$(".class_sub").attr("data-id");
  // if(class_id==undefined){
  //   alert("班级不能为空");
  // }
  // if(sub_id==undefined){
  //   alert("考试科目不能为空");
  // }
   console.log(sub_id);
   var sort=$(".class_sort").attr("data-id");
$.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/wrong_questions/class_index",
            async: false,
            data:{
                "exam_id":word,
                "subject_id":sub_id,
                "classroom_id":class_id,
                "rate":rate,
                "item":data_num,
                "sort":sort,
        
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
             beforeSend: function(){
                   $(".load-bg").show();
                },
            success: function(data) {
                console.log(data);
                 $(".class_list_ul").html(" ");
                 $(".class_topic_ever_box").html(" ");
                 // if(data.length!==0){
                 //  $(".class_sur").attr("school_id",data[0][0].school_id);
                 // }
                
               for(var i=0;i<data.length;i++){
                // $(".class_topic_ever_ul").append('<li><p>'+data[i].source+'</p></li>')
                 // for(var i_1=0;i_1<data.length;i_1++){
                    //  console.log(i_1);
                    // console.log(data[i][i_1].content);
                var scoring_rate=Math.floor(data[i].scoring_rate*100)+"%";

                 //知识点 
                 var tags=data[i].tags;
                 //考试来源
                 var source=data[i].source;
                //序号
                var num=data[i].num;
                // if(num<10){
                //   var num='0'+Number(data[i][i_1].num);
                // }   
              //小题上标(得分率)
              var a_rate=Number(data[i].scoring_rate);
              if(a_rate>=0.86){
               $(".class_topic_ever_box").append('<a class="class_topic_ever" id="wrong_class_li'+data[i].question_bank_id+'"  style="background:#31bc91;" href="#a_wrong_class_li'+data[i].question_bank_id+'">'+num+'</a>');
              
              var num_color="#31bc91";
             }else if(a_rate>=0.8&&a_rate<0.95){
                $(".class_topic_ever_box").append('<a class="class_topic_ever" id="wrong_class_li'+data[i].question_bank_id+'"  style="background:#f7c07c;" href="#a_wrong_class_li'+data[i].question_bank_id+'">'+num+'</a>');
             
             var num_color="#f7c07c";
                 }else if(a_rate>=0.6&&a_rate<0.8){
                $(".class_topic_ever_box").append('<a class="class_topic_ever" id="wrong_class_li'+data[i].question_bank_id+'"  style="background:#5fa3ed;" href="#a_wrong_class_li'+data[i].question_bank_id+'">'+num+'</a>');
                  var num_color="#5fa3ed";
             }else if(a_rate>=0&&a_rate<0.6){
                $(".class_topic_ever_box").append('<a class="class_topic_ever" id="wrong_class_li'+data[i].question_bank_id+'"  style="background:#fb7d8a;" href="#a_wrong_class_li'+data[i].question_bank_id+'">'+num+'</a>');
                var num_color="#fb7d8a";
             }
            //难度系数
              var difficulty_level=Number(data[i].difficulty_level);
              console.log(difficulty_level);
              if(difficulty_level==0){
                var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              }else if(difficulty_level>=0.86){

               var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
              }else if(difficulty_level>=0.71&&difficulty_level<0.86){
               var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
              }else if(difficulty_level>=0.61&&difficulty_level<0.71){
                 var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
              }else if(difficulty_level>=0.41&&difficulty_level<0.61){
                 var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
              }else if(difficulty_level>0&&difficulty_level<0.41){
                 var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i>';
              
              }   
                  if(data[i].score_rate_difference==undefined){
                    data[i].score_rate_difference=0;
                  }
                 $(".class_list_ul").append(' <li id="a_wrong_class_li'+data[i].question_bank_id+'" class="wrong_class_li'+data[i].question_bank_id+'" bank_id="'+data[i].question_bank_id+'" total_score="'+data[i].total_score+'"  average_score="'+data[i].average_score+'" scoring_rate="'+data[i].scoring_rate+'"  item="'+data[i].item+'" exam_subject_id="'+data[i].exam_subject_id+'"><div class="class_list_main"><div class="class_list_body">'+data[i].content+'</div><p class="class_list_lable"><a>班级得分率:<i>'+scoring_rate+'</i></a><a>班-级得分率差:<i>'+Math.round(parseFloat(data[i].score_rate_difference)*100)/100+'</i></a><a>班级平均分:<i>'+data[i].average_score+'分</i></a><a>知识点:<i>'+tags+'</i></a><a class="class_list_dif">难度系数:'+difficulty_body+'</a></p><div class="class_list_move"><a class="class_list_body_ans"   data-id="'+i+'"  data-id01="'+i+'"><i class="iconfont" style="margin-right:10px;"></i>查看答案和解析</a><a  class="class_list_move_a">移除</a></div><div class="class_list_number"><p><i class="iconfont" style="font-size:45px;color:'+num_color+';"></i><a>'+num+'</a></p></div><div class="class_list_form">试题来源:<a>'+source+'</a></div></div></li>');
                  }

               // }
                $(".class_topic_ever_box").append('<div style="margin-top: 10px;color: #ccc;clear: both;"><i class="iconfont" style="font-size: 14px;color: #31bc91;margin-right: 5px;">&#xe646;</i>小提示：点击题号可以定位到相应题目</div>');

             
            },
            complete: function(){
                   $(".load-bg").hide();
                },
            error:function(){
                 // $(".load-bg").hide();
            },
        });

}
function class_list_ans(num,num01){
var word =$(".class_exam").attr("data-id");
// for(var length=0;length<exam_length;length++){
//      word[length]=parseInt(words[length]);
// }
// console.log(word);
//类型
 var data_num=[];
    if($(".class_sur").parent().prev().find('a').eq(0).attr("data-id")==1){
    data_num[0]=0;
    data_num[1]=5;
    }
    if($(".class_sur").parent().prev().find('a').eq(1).attr("data-id")==1){
      
      if(data_num.length==0){
       data_num[0]=1;
      }else{
        data_num[data_num.length]=1;
      }
    
    }
    if($(".class_sur").parent().prev().find('a').eq(2).attr("data-id")==1){
      if(data_num.length==0){
       data_num[0]=2;
      }else{
        data_num[data_num.length]=2;
      }
    }
    if($(".class_sur").parent().prev().find('a').eq(3).attr("data-id")==1){
      if(data_num.length==0){
       data_num[0]=3;
      }else{
        data_num[data_num.length]=3;
      }
    }
    if($(".class_sur").parent().prev().find('a').eq(4).attr("data-id")==1){
    if(data_num.length==0){
       data_num[0]=4;
      }else{
        data_num[data_num.length]=4;
      }
    }
   console.log(data_num);
  var rate=$(".class_select_rate").attr("data-id");
  var class_id=$(".class_class").attr("data-id");
  var sub_id=$(".class_sub").attr("data-id");
  // if(class_id==undefined){
  //   alert("班级不能为空");
  // }
  // if(sub_id==undefined){
  //   alert("考试科目不能为空");
  // }
   console.log(sub_id);
   var sort=$(".class_sort").attr("data-id");
$.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/wrong_questions/class_index",
            async: false,
            data:{
                "exam_id":word,
                "subject_id":sub_id,
                "classroom_id":class_id,
                "rate":rate,
                "item":data_num,
                "sort":sort,
        
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
             beforeSend: function(){
                   $(".load-bg").show();
                },
            success: function(data) {
                console.log(data);
              $(".class_ans01").html(data[num].answer);
               $(".class_ans02").html(data[num].analysis);
               
             
            },
            complete: function(){
                   $(".load-bg").hide();
                },
            error:function(){
                 // $(".load-bg").hide();
            },
        });

}


 //     班级删除
 $(".class_list_ul").on('click', '.class_list_move_a', function(event) {
  $(this).parents("li").remove();
  $('#'+$(this).parents("li").attr("class")+'').remove();
 });
 //班级生成错题本
$(".class_make_wrong").click(function(event) {
    var li_long=$(".class_list_ul li").length;
    var school_id=$(".class_sur").attr("school_id");
    var grade_id=$(".class_select_grate").attr("data-id");
    var classroom_id=$(".class_select_class").attr("data-id");
    var subject_id=$(".class_select_sub").attr("data-id");
    var class_wrongs=[];  
    for(var li=0;li<li_long;li++){
    var class_wrong={}; 
    class_wrong["school_id"]=school_id;
    class_wrong["grade_id"]=grade_id;
    class_wrong["classroom_id"]=classroom_id;
    class_wrong["subject_id"]=subject_id;
    class_wrong["question_bank_id"]=$(".class_list_ul li").eq(li).attr("bank_id");
    class_wrong["item"]=$(".class_list_ul li").eq(li).attr("item");
    class_wrong["exam_subject_id"]=$(".class_list_ul li").eq(li).attr("exam_subject_id");
    class_wrong["average_score"]=$(".class_list_ul li").eq(li).attr("average_score");
    class_wrong["total_score"]=$(".class_list_ul li").eq(li).attr("total_score");
    class_wrong["scoring_rate"]=$(".class_list_ul li").eq(li).attr("scoring_rate");
    
    class_wrongs[li]=class_wrong;

    }
    var exam_subject_id=$(".class_list_ul li").eq(0).attr("exam_subject_id");
    var title01=$(".class_exam").children('option:selected').text();
    var title02=$(".class_class").children('option:selected').text();
    var title03=$(".class_sub").children('option:selected').text();
    var title04=$(".class_select_rate").children('option:selected').text();
    var title=title01+"-"+title02+"-"+title03+"-"+title04;
    console.log(title);
    console.log(class_wrongs);
    $.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/wrong_questions",
            async: false,
            data:{
                "wrong_questions":JSON.stringify(class_wrongs),
                 "type":"class",
                 "title":title,
                 "exam_subject_id":exam_subject_id,
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
               console.log(data);
                layer.msg('生成成功',{time:700});
            },
            error: function(data) {

            },
        })


});

//班级年级
// $.ajax({
//             type: "GET",
//             url: ajaxIp + "/api/v2/commons/school_grades",
//             async: false,
//             headers: {
//                 'Authorization': "Bearer " + isLogin
//             },
//             success: function(data) {
//                 console.log(data);
//                  $(".class_select_grate").html(" ");
//                   $(".class_select_grade").attr("data-id"," ");
//                  if(data.length!==0){
//                  $(".class_select_grate").attr("data-id",data[0].id);
//                 for(var i=0;i<data.length;i++){
//                    $(".class_select_grate").append('<option value="" data-id='+data[i].id+'>'+data[i].name+'</option>');
//                 }
//             }
//             },
//             error:function(){

//             },
//         });
// function grade_get_class(grade_id){
// $.ajax({
//             type: "GET",
//             url: ajaxIp + '/api/v2/commons/'+grade_id+'/grade_classrooms',
//             async: false,
//             headers: {
//                 'Authorization': "Bearer " + isLogin
//             },
//             success: function(data) {
//                 console.log(data);
//                  $(".class_select_class").html(" ");
//                   $(".class_select_class").attr("data-id"," ");
//                  if(data.length!==0){
//                  $(".class_select_class").attr("data-id",data[0].id);
//                  for(var i=0;i<data.length;i++){
//                    $(".class_select_class").append('<option value="" data-id='+data[i].id+'>'+data[i].name+'</option>');
//                  }
//                }
//             },
//             error:function(){

//             },
//         });

// $.ajax({
//             type: "GET",
//             url: ajaxIp + '/api/v2/commons/grade_subjects',
//             async: false,
//             data:{
//                 'grade_id':grade_id,
//             },
//             headers: {
//                 'Authorization': "Bearer " + isLogin
//             },
//             success: function(data) {
//                 console.log(data);
//                 $(".class_select_sub").attr("data-id"," ");
//                  $(".class_select_sub").html(" ");
//                  if(data.length!==0){
//                  $(".class_select_sub").attr("data-id",data[0].id);
//                  for(var i=0;i<data.length;i++){
//                    $(".class_select_sub").append('<option value="" data-id='+data[i].id+'>'+data[i].name+'</option>');
//                  }
//              }
               
//             },
//             error:function(){

//             },
//         });


// };

//根据班级获取年级
// $(".wrong_class_li").click(function(event) {
//    var grade_id=$(".class_select_grate").children('option:selected').attr("data-id");
//    // grade_get_class(grade_id);
//    near_exam();

// });
//  $(".class_select_grate").change(function(event) {
//    var grade_id=$(this).children('option:selected').attr("data-id");
// $(this).attr("data-id",$(this).children('option:selected').attr("data-id"));
//    // grade_get_class(grade_id);
//     near_exam();


//  });


 //班级select
 $(".class_select_top select").change(function(event) {
    $(this).attr("data-id",$(this).children('option:selected').attr("data-id"));
    $(".class_ans").hide();

 });
$(".class_select_rate").change(function(event) {
  $(this).attr("data-id",$(this).children('option:selected').val());
});



//grade查看详情
$(".grade_list_ul").on('click', '.grade_list_body_ans', function(event) {
      $(".grade_ans01").html(" ");
    $(".grade_ans02").html(" ");
    $(".layer").css("height",$(document).height());
     $(".layer").show();
    // $(".grade_ans01").html($(this).attr("data-ans"));
    // $(".grade_ans02").html($(this).attr("data-anal"));
    var num =parseInt($(this).attr("data-id"));
    grade_list_ans(num);

 $(".grade_ans_tc").show();

});
 function grade_list_ans(num){
     var rate=$(".grade_rate").attr("rate-id");
    
   var data_num=[];
    if($(".grade_sur").parent().prev().find('a').eq(0).attr("data-id")==1){
    data_num[0]=0;
    data_num[1]=5;
    }
    if($(".grade_sur").parent().prev().find('a').eq(1).attr("data-id")==1){
      
      if(data_num.length==0){
       data_num[0]=1;
      }else{
        data_num[data_num.length]=1;
      }
    
    }
    if($(".grade_sur").parent().prev().find('a').eq(2).attr("data-id")==1){
      if(data_num.length==0){
       data_num[0]=2;
      }else{
        data_num[data_num.length]=2;
      }
    }
    if($(".grade_sur").parent().prev().find('a').eq(3).attr("data-id")==1){
      if(data_num.length==0){
       data_num[0]=3;
      }else{
        data_num[data_num.length]=3;
      }
    }
    if($(".grade_sur").parent().prev().find('a').eq(4).attr("data-id")==1){
    if(data_num.length==0){
       data_num[0]=4;
      }else{
        data_num[data_num.length]=4;
      }
    }
   console.log(data_num);
   var sort =$(".grade_sort").attr("data-id");
   var grade_exam=parseInt($(".grade_exam").attr("data-id"));
   var grade_sub=parseInt($(".grade_sub").attr("data-id"));
    console.log(grade_exam);
     console.log(grade_sub);
      $.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/wrong_questions/grade_index",
            // async: false,
            data:{
                "exam_id":grade_exam,
                 "subject_id":grade_sub,
                 "item":data_num,
                 "rate":rate,
                  "sort":sort,
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            beforeSend: function(){
                $(".load-bg").show();
                },
            success: function(data) {
                console.log(data);
               $(".grade_ans01").html(data[num].answer);
               $(".grade_ans02").html(data[num].analysis);

            },
            complete: function(){

                  $(".load-bg").hide();
                },
            error:function() {
               $(".load-bg").hide();
            },
        });
}



$(".grade_ans_tc").on('click', 'button', function(event) {
 $(".grade_ans_tc").hide();
 $(".layer").hide();
});
//class查看详情
$(".class_list_ul").on('click', '.class_list_body_ans', function(event) {
    $(".class_ans01").html(" ");
    $(".class_ans02").html(" ");
    $(".layer").css("height",$(document).height());
    $(".layer").show();
    // $(".class_ans01").html($(this).attr("data-ans"));
    // $(".class_ans02").html($(this).attr("data-anal"));
    var num =parseInt($(this).attr("data-id"));
     var num01 =parseInt($(this).attr("data-id01"));
    class_list_ans(num,num01);
    $(".class_ans_tc").show();

});
$(".class_ans_tc").on('click', 'button', function(event) {
 $(".class_ans_tc").hide();
 $(".layer").hide();
});



     $(".class_sur").click(function(event) {
         $(".class_ans").slideDown('1000');
     });
      $(".class_off").click(function(event) {
         $(".class_ans").slideUp('1000');
     });
     $(".wrong_left_ul li").eq(1).click(function(event) {
         $(".wrong_main").children('div').eq(0).children('.grade_ans').hide();
         $(".wrong_main").children('div').eq(2).children('.per_ans').hide();
     });
      //移除11
     $(".class_list_move_a").click(function(event) {
     	$(this).parent().parent().remove();
     });
       $(".class_topic_ever_top").click(function(event) {
       	var a=$(this).attr("data-id");
       	if(a==0){
           $(".class_topic_ever_ul").slideDown('1000');
           $(".class_topic_ever_top i").html("&#xe606;")
           $(this).attr("data-id","1");
       	}else{
            $(".class_topic_ever_ul").slideUp('1000');
           $(".class_topic_ever_top i").html("&#xe605;")
           $(this).attr("data-id","0");
       	}

       });

     //学生错题
     $(".per_sur").click(function(event) {
         $(".per_ans").slideDown('1000');
     });
      //移除
     $(".per_list_move_a").click(function(event) {
     	$(this).parent().parent().remove();
     });
     $(".wrong_left_ul li").eq(2).click(function(event) {
         $(".wrong_main").children('div').eq(0).children('.grade_ans').hide();
         $(".wrong_main").children('div').eq(1).children('.class_ans').hide();
         $(".students_key").show();
    	$(".students_key_box").show();
    	// $(".stu_choice_btn").hide();
     });
      $(".wrong_left_ul li").click(function(event) {
         $(".students_key").hide();
    	$(".students_key_box").hide();
    	// $(".stu_choice_btn").show();

      });
      // $(".per_topic_ever_top")

//       function xiang(a,b){
//         $('.'+a+'').click(function(event) {
//        	var a=$(this).attr("data-id");
//        	if(a==0){
//            $('.'+b+'').slideDown('1000');
//            $('.'+a+' i').html("&#xe606;")
//            $(this).attr("data-id","1");
//        	}else{
//             $('.'+b+'').slideUp('1000');
//            $('.'+a+' i').html("&#xe605;")
//            $(this).attr("data-id","0");
//        	}

//        });
//       }
//       
// xiang("per_topic_ever_top","per_topic_ever_ul");
        $(".per_topic_ever_top").click(function(event) {
       	var a=$(this).attr("data-id");
       	if(a==0){
           $(".per_topic_ever_ul").slideDown('1000');
           $(".per_topic_ever_top i").html("&#xe606;")
           $(this).attr("data-id","1");
       	}else{
            $(".per_topic_ever_ul").slideUp('1000');
           $(".per_topic_ever_top i").html("&#xe605;")
           $(this).attr("data-id","0");
       	}

       });
        $(".wrong_per_li").click(function(event) {
           // Act on the event
           $(".per_ans").hide();
        });
        //生成变式训练
        // $(".per_make_change").click(function(event) {
        // $(".per_list_ans_train_top01").show();
        //  $(".per_list_ans_train_01").show();
        // });
     //重点追踪学生
     $(".students_key_box_p02").on('click', 'a', function(event){
      $(this).css("color","#ffffff").siblings().css("color","#333333");
      $(this).css("background","#31bc91").siblings().css("background","#f5f5f5");
     });
     $(".stu_wrong_tc_ul li").click(function(event) {
         var a = $(this).attr("data-id");
         if (a == 0) {
             $(this).children('i').addClass('stu_wrong_tc_i');
             $(this).attr("data-id", "1"); 
             $(".choice_stu").append('<a id="' + $(this).attr("class") + '"  style="background: #31bc91;color: #f5f5f5;margin: 10px;display:inline-block;line-height: 30px;padding: 0px 7px;float:left;">' + $(this).children('a').html() + '<i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe61b;</i></a>');
         } else {
             $(this).children('i').removeClass('stu_wrong_tc_i');
             $(this).attr("data-id", "0");
             $('#' + $(this).attr("class") + '').remove();
         }
         $(".choice_all").removeClass('stu_wrong_tc_i');
     });
     $(".choice_stu").on('click', 'a', function(event) {
         // alert();
         $(this).remove();
         $('.' + $(this).attr("id") + '').children('i').removeClass('stu_wrong_tc_i');
         $(".choice_all").removeClass('stu_wrong_tc_i');
     });

     $(".choice_all").click(function(event) {
         var a = $(this).attr("data-id");
         if (a == 0) {
             $(this).addClass('stu_wrong_tc_i');
             $(this).attr("data-id", "1");
             $(".stu_wrong_tc_ul li").attr("data-id", "1");
             $(".stu_wrong_tc_ul li").children('i').addClass('stu_wrong_tc_i');
             for (var i = 0; i < 3; i++) {
                 $(".choice_stu").append('<a id="' + $(".stu_wrong_tc_ul li").eq(i).attr("class") + '"  style="background: #31bc91;color: #f5f5f5;margin: 10px;display:inline-block;line-height: 30px;padding: 0px 7px;float:left;">' + $(".stu_wrong_tc_ul li").eq(i).children('a').html() + '<i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe61b;</i></a>');
             }
         } else {
             $(this).removeClass('stu_wrong_tc_i');
             $(this).attr("data-id", "0");
             $(".stu_wrong_tc_ul li").attr("data-id", "0");
             $(".stu_wrong_tc_ul li").children('i').removeClass('stu_wrong_tc_i');
             $(".choice_stu a").remove();
         }
     });
     $(".stu_wrong_tc_btn button").click(function(event) {
         $(".stu_wrong_tc").hide();
     });
     $(".wrong_back_x").click(function(event) {
         $(".stu_wrong_tc").hide();
     });
     $(".stu_choice_btn").click(function(event) {
         $(".stu_wrong_tc").show();
     });
    
    $(".stu_wrong_tc_button_sure").click(function(event) {
    	$(".students_key").show();
    	$(".students_key_box").show();
    	$(".per_sur_a").show();
    	// $(".stu_choice_btn").hide();
     });
//年级错题管理
$(".grade_admin_li").click(function(event) {
  $.ajax({
            type: "GET",
            url: ajaxIp + "/api/v2/reports/exams",
            async: false,
            headers:{
                'Authorization':"Bearer "+ isLogin
            },
            success: function(data) {
            $(".g_wrong_admin_exam").html(" ");
            $(".g_wrong_admin_sub").html(" ");
            $(".g_wrong_admin_exam").attr("data-id",data[0].id);
             $(".g_wrong_admin_sub").attr("data-id",data[0].subjects[0].subject_id);
            for(var i=0;i<data.length;i++){
               $(".g_wrong_admin_exam").append('<option value="" g-exam-id="'+data[i].id+'">'+data[i].name+'</option>');
              


            }
            for(var i=0;i<data[0].subjects.length;i++){
             $(".g_wrong_admin_sub").append('<option value="" g-exam-id="'+data[0].subjects[i].subject_id+'">'+data[0].subjects[i].name+'</option>');
            }
           
             g_wrong_list();

            },
            error:function(){

            },
          })
});
 
 //年级管理考试选择
$(".g_wrong_admin_exam").change(function(event) {
  $(this).attr("data-id",$(this).find('option:selected').attr("g-exam-id"));
  var a=$(this).find('option:selected').index();
  console.log(a);
 $.ajax({
            type: "GET",
            url: ajaxIp + "/api/v2/reports/exams",
            async: false,
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
            $(".g_wrong_admin_sub").html(" ");
            $(".g_wrong_admin_sub").attr("data-id",data[a].subjects[0].subject_id);
            for(var i=0;i<data[a].subjects.length;i++){
             $(".g_wrong_admin_sub").append('<option value="" g-exam-id="'+data[a].subjects[i].subject_id+'">'+data[a].subjects[i].name+'</option>');
            }
           

             g_wrong_list();
            },
            error:function(){

            },
          })
});

$(".g_wrong_admin_sub").change(function(event) {
  $(this).attr("data-id",$(this).find('option:selected').attr("g-exam-id"));
   g_wrong_list();
});








$(".g_wrong_list").on('click', '.g_wrong_list_look', function(event) {
   $(".g_list_ul").html(" ");
  $(".g_topic_ever_box").html(" ");
  $(".g_font_div").hide();
  $(".g_look").show();
  console.log();
  $(".wrong_top").html('<i class="g_back_font  iconfont" style="margin-right:10px;cursor: pointer;">&#xe61c;</i>'+$(this).parents("li").find('a').eq(0).html());
 
});
$(".wrong_top").on('click', '.g_back_font', function(event) {
  
$(".g_font_div").show();
$(".g_look").hide();
$(".wrong_top").html("考试错题集管理");

});
//查看
$(".g_list_ul").on('click', '.g_list_body_ans', function(event) {
    $(".g_ans01").html(" ");
    $(".g_ans02").html(" ");
    $(".layer").css("height",$(document).height());
    $(".layer").show();
    // $(".g_ans01").html($(this).attr("data-ans"));
    // $(".g_ans02").html($(this).attr("data-ana"));
    var a=$(".wrong_top").attr("data-id");
    var b=$(this).attr("data-id");
  $.ajax({
            type: "POST",
            url: ajaxIp + '/api/v2/wrong_books/book_questions',
            async: false,
            data:{
                'id':a,
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
              $(".g_ans01").html(data[b].answer);
             $(".g_ans02").html(data[b].analysis);
            },
            error:function(){

            },
          });
    $(".g_ans_tc").show();

});
$(".g_ans_tc").on('click', 'button', function(event) {
 $(".g_ans_tc").hide();
 $(".layer").hide();
});
//打印
$(".g_print").click(function(event) {
     $("#footer").hide();
     $(".ans_result").hide();
     $(".wrong_left_ul").hide();
     $(".g_list_move").hide();
     $(".g_topic").hide();
      $("#header").hide();
      $(".title-box").hide();
       $(".wrong_top").hide();
       $(".ans_news").hide();
     $(".main").css("width","100%");
      $(".main").css("margin-top","0px");
       $(".g_list").css("padding","0px");
      $(".wrong_right").css("width","100%");
      $(".wrong_right").css("padding","0");
     $(".g_list_main").css("width","100%");
      window.print();
       $("#footer").show();
     $(".ans_result").show();
     $(".wrong_left_ul").show();
     $(".g_list_move").show();
     $(".g_topic").show();
      $("#header").show();
      $(".title-box").show();
       $(".wrong_top").show();
       $(".ans_news").show();
     $(".main").css("width","1200px");
      $(".wrong_right").css("width","1000px");
     $(".g_list_main").css("width","923px");
      $(".main").css("margin-top","45px");
       $(".g_list").css("padding","20px 0px 100px 0px");
     $(".wrong_right").css("padding","43px 40px 100px 35px");
     });
$(".grade_admin_li").click(function(event) { 
$(".g_font_div").show();
$(".g_look").hide();
});

 



$(".wrong_top").on('click', '.c_back_font', function(event) {
  
$(".c_font_div").show();
$(".c_look").hide();
$(".wrong_top").html("班级错题集管理");

});
//查看
$(".c_list_ul").on('click', '.c_list_body_ans', function(event) {
    $(".c_ans01").html(" ");
    $(".c_ans02").html(" ");
    $(".layer").css("height",$(document).height());
    $(".layer").show();
    // $(".g_ans01").html($(this).attr("data-ans"));
    // $(".g_ans02").html($(this).attr("data-anal"));
  var a=$(".wrong_top").attr("data-id");
  var b=$(this).attr("data-id");
  $.ajax({
            type: "POST",
            url: ajaxIp + '/api/v2/wrong_books/book_questions',
            async: false,
            data:{
                'id':a,
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
              $(".c_ans01").html(data[b].answer);
             $(".c_ans02").html(data[b].analysis);
            },
            error:function(){

            },
          });



    $(".c_ans_tc").show();

});
$(".c_ans_tc").on('click', 'button', function(event) {
 $(".c_ans_tc").hide();
 $(".layer").hide();
});
//打印
$(".c_print").click(function(event) {
     $("#footer").hide();
     $(".ans_result").hide();
     $(".wrong_left_ul").hide();
     $(".c_list_move").hide();
     $(".c_topic").hide();
      $("#header").hide();
      $(".title-box").hide();
       $(".wrong_top").hide();
       $(".ans_news").hide();
     $(".main").css("width","100%");
      $(".main").css("margin-top","0px");
       $(".c_list").css("padding","0px");
      $(".wrong_right").css("width","100%");
      $(".wrong_right").css("padding","0");
     $(".c_list_main").css("width","100%");
      window.print();
       $("#footer").show();
     $(".ans_result").show();
     $(".wrong_left_ul").show();
     $(".c_list_move").show();
     $(".c_topic").show();
      $("#header").show();
      $(".title-box").show();
       $(".wrong_top").show();
       $(".ans_news").show();
     $(".main").css("width","1200px");
      $(".wrong_right").css("width","1000px");
     $(".c_list_main").css("width","923px");
      $(".main").css("margin-top","45px");
       $(".c_list").css("padding","20px 0px 100px 0px");
     $(".wrong_right").css("padding","43px 40px 100px 35px");
     });
$(".class_admin_li").click(function(event) { 
$(".c_font_div").show();
$(".c_look").hide();
});
//考试错题集管理
function g_wrong_list(){
 
  var exam_id=$(".g_wrong_admin_exam").attr("data-id");
  var subject_id=$(".g_wrong_admin_sub").attr("data-id");
$.ajax({
            type: "POST",
            url: ajaxIp + '/api/v2/wrong_books/grade_books',
            async: false,
            data:{
                'exam_id':exam_id,
                'subject_id':subject_id,
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
              $(".g_wrong_list").html(" ");
             for(var i=0;i<data.length;i++){
                  $(".g_wrong_list").append('<li><a style="width: 32%;" class="g_wrong_list_name" data-id="'+data[i].id+'">'+data[i].title+'</a></a><a style="">'+data[i].count+'</a><a style="">'+data[i].author+'</a><a style="">'+data[i].created_at+'</a><a style=""><button data-id="'+data[i].id+'" class="g_wrong_list_look">查看</button><button data-id="'+data[i].id+'" class="g_wrong_list_rem" style="color: #fb7d8a;border-color: #fb7d8a;">删除</button></a></li>');
              }
            

               
            },
            error:function(){
           
        },
        });




}

  //查看
$(".g_wrong_list").on('click', '.g_wrong_list_look', function(event) {
var a=parseInt($(this).attr("data-id"));
$(".wrong_top").attr("data-id",a);
$.ajax({
            type: "POST",
            url: ajaxIp + '/api/v2/wrong_books/book_questions',
            async: false,
            data:{
                'id':a,
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
            $(".g_topic_ever_box").html(" ");
             for(var i=0;i<data.length;i++){
            var tag="";
            for(var i_tag=0;i_tag<data[i].tags.length;i_tag++){
             tag=tag+data[i].tags[i_tag];
            }
            console.log(tag);
            var s_rate=Math.round(Number(data[i].scoring_rate)*100);
            console.log(data[i].scoring_rate)
          
          //难度系数
              var difficulty_level=Number(data[i].difficulty_level);
              console.log(difficulty_level);
              if(difficulty_level==0){
                var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              }else if(difficulty_level>=0.86){

               var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
              }else if(difficulty_level>=0.71&&difficulty_level<0.86){
               var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
              }else if(difficulty_level>=0.61&&difficulty_level<0.71){
                 var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
              }else if(difficulty_level>=0.41&&difficulty_level<0.61){
                 var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
              }else if(difficulty_level>0&&difficulty_level<0.41){
                 var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i>';
              
              }
              //小题上标(得分率)
              var num =data[i].question_bank_id;
              var a_rate=Number(data[i].scoring_rate);

                if(num<10){
                  var num='0'+Number(data[i].question_bank_id);
                }   
              if(a_rate>=0.86){
               $(".g_topic_ever_box").append('<a class="grate_topic_ever" style="background:#31bc91;" href="#g_a'+data[i].question_bank_id+'">'+num+'</a>');
              
              // var num_color="#31bc91";
             }else if(a_rate>=0.8&&a_rate<0.95){
                $(".g_topic_ever_box").append('<a class="grate_topic_ever"  style="background:#f7c07c;" href="#g_a'+data[i].question_bank_id+'">'+num+'</a>');
             
             // var num_color="#f7c07c";
                 }else if(a_rate>=0.6&&a_rate<0.8){
                $(".g_topic_ever_box").append('<a class="grate_topic_ever"  style="background:#5fa3ed;" href="#g_a'+data[i].question_bank_id+'">'+num+'</a>');
                  // var num_color="#5fa3ed";
             }else if(a_rate>=0&&a_rate<0.6){
                $(".g_topic_ever_box").append('<a class="grate_topic_ever"  style="background:#fb7d8a;" href="#g_a'+data[i].question_bank_id+'">'+num+'</a>');
                // var num_color="#fb7d8a";
             }

              $(".g_list_ul").append('<li id="g_a'+data[i].question_bank_id+'"><div class="g_list_main"><div class="g_list_body">'+data[i].content+'</div><p class="g_list_lable"><a>年级得分率:<i style="font-style: normal;">'+s_rate+'%</i></a><a>年级平均分:<i style="font-style: normal;">'+data[i].average_score+'分</i></a><a>知识点:<i style="font-style: normal;">'+tag+'</i></a><a class="g_list_dif">难度系数:'+difficulty_body+'</a></p><div class="g_list_move"><a class="g_list_body_ans"  data-id="'+i+'"><i class="iconfont" style="margin-right:10px;"></i>查看答案和解析</a></div></div></li>');
  
          }   

            $(".g_topic_ever_box").append('<div style="margin-top: 10px;color: #ccc;clear: both;"><i class="iconfont" style="font-size: 14px;color: #31bc91;margin-right: 5px;">&#xe646;</i>小提示：点击题号可以定位到相应题目</div>');
   
            },
            error:function(){
             
        },
        });

});

//班级错题集管理

$(".c_wrong_admin_exam").change(function(event) {
  var a=$(this).children('option:selected').index();
  $(this).attr("data-id",$(this).children('option:selected').attr("c-data-id"));
  $.ajax({
            type: "GET",
            url: ajaxIp + "/api/v2/reports/exams",
            async: false,
            headers:{
                'Authorization':"Bearer "+ isLogin
            },
            success: function(data) {
            $(".c_wrong_admin_sub").html(" ");
            $(".c_wrong_admin_grade").html(" ");
            $(".c_wrong_admin_class").html(" ");

             $(".c_wrong_admin_sub").attr("data-id",data[a].subjects[0].subject_id);
             $(".c_wrong_admin_grade").attr("data-id",data[a].grade.grade_id);
             $(".c_wrong_admin_class").attr("data-id",data[a].classrooms[0].classroom_id);
            //  //考试
            // for(var i=0;i<data.length;i++){
            //    $(".c_wrong_admin_exam").append('<option value="" c-data-id="'+data[i].id+'">'+data[i].name+'</option>');
            
            // }
            //科目
            for(var i=0;i<data[a].subjects.length;i++){
             $(".c_wrong_admin_sub").append('<option value="" c-data-id="'+data[a].subjects[i].subject_id+'">'+data[a].subjects[i].name+'</option>');
            }
            //年级
            // for(var i=0;i<data[0].grade.length;i++){
             $(".c_wrong_admin_grade").append('<option value="" c-data-id="'+data[a].grade.grade_id+'">'+data[a].grade.name+'</option>');
            // }
            //班级
            for(var i=0;i<data[a].classrooms.length;i++){
             $(".c_wrong_admin_class").append('<option value="" c-data-id="'+data[a].classrooms[i].classroom_id+'">'+data[a].classrooms[i].classroom_name+'</option>');
            }
             c_list();
            },
            error:function(){

            },

          });


});
$(".c_wrong_admin_top select").change(function(event) {

 $(this).attr("data-id",$(this).children('option:selected').attr("c-data-id"));
 c_list();


});
function c_list(){
 var exam_id=$(".c_wrong_admin_exam").attr("data-id");
 var subject_id=$(".c_wrong_admin_sub").attr("data-id");
 $.ajax({
            type: "POST",
            url: ajaxIp + '/api/v2/wrong_books/class_books',
            async: false,
            data:{
                'exam_id':exam_id,
                'subject_id':subject_id,
                'classroom_id':156,

            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
             $(".c_wrong_list").html(" ");
              for(var i=0;i<data.length;i++){
                  $(".c_wrong_list").append('<li><a data-id="'+data[i].id+'" style="width: 32%;" class="c_wrong_list_name">'+data[i].title+'</a></a><a style="">'+data[i].count+'</a><a style="">'+data[i].author+'</a><a style="">'+data[i].created_at+'</a><a style=""><button data-id="'+data[i].id+'" class="c_wrong_list_look">查看</button><button style="color: #fb7d8a;border-color:#fb7d8a;" class="c_wrong_list_rem" data-id="'+data[i].id+'">删除</button></a></li>');
              }
               
            },
            error:function(){
       
        },
        });
}


$(".class_admin_li").click(function(event) {
 $.ajax({
            type: "GET",
            url: ajaxIp + "/api/v2/reports/exams",
            async: false,
            headers:{
                'Authorization':"Bearer "+ isLogin
            },
            success: function(data) {

              console.log(data);
            $(".c_wrong_admin_exam").html(" ");
            $(".c_wrong_admin_sub").html(" ");
            $(".c_wrong_admin_grade").html(" ");
            $(".c_wrong_admin_class").html(" ");
            $(".c_wrong_admin_exam").attr("data-id",data[0].id);
             $(".c_wrong_admin_sub").attr("data-id",data[0].subjects[0].subject_id);
             $(".c_wrong_admin_grade").attr("data-id",data[0].grade.grade_id);
             $(".c_wrong_admin_class").attr("data-id",data[0].classrooms[0].classroom_id);
             //考试
            for(var i=0;i<data.length;i++){
               $(".c_wrong_admin_exam").append('<option value="" c-data-id="'+data[i].id+'">'+data[i].name+'</option>');
            
            }
            //科目
            for(var i=0;i<data[0].subjects.length;i++){
             $(".c_wrong_admin_sub").append('<option value="" c-data-id="'+data[0].subjects[i].subject_id+'">'+data[0].subjects[i].name+'</option>');
            }
            //年级
            // for(var i=0;i<data[0].grade.length;i++){
             $(".c_wrong_admin_grade").append('<option value="" c-data-id="'+data[0].grade.grade_id+'">'+data[0].grade.name+'</option>');
            // }
            //班级
            for(var i=0;i<data[0].classrooms.length;i++){
             $(".c_wrong_admin_class").append('<option value="" c-data-id="'+data[0].classrooms[i].classroom_id+'">'+data[0].classrooms[i].classroom_name+'</option>');
            }
            //  g_wrong_list();
             c_list();

            },
            error:function(){

            },
          })       

});
  $(".c_wrong_list").on('click', '.c_wrong_list_look', function(event) {
  $(".c_topic_ever_box").html(" ");
  $(".c_list_ul").html(" ");
  $(".c_font_div").hide();
  $(".c_look").show(); 
$(".wrong_top").html('<i class="c_back_font  iconfont" style="margin-right:10px;cursor: pointer;">&#xe61c;</i>'+$(this).parents("li").find('a').eq(0).html());
 var id=$(this).attr("data-id");
$(".wrong_top").attr("data-id",id);
console.log(id);


$.ajax({
            type: "POST",
            url: ajaxIp + '/api/v2/wrong_books/book_questions',
            async: false,
            data:{
                'id':id,
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
              $(".c_topic_ever_box").html(" ");
              $(".c_list_ul").html(" ");
            
            console.log(data);           

          for(var i=0;i<data.length;i++){
            var tag="";
            for(var i_tag=0;i_tag<data[i].tags.length;i_tag++){
             tag=tag+data[i].tags[i_tag];
            }
            console.log(tag);
            var s_rate=Math.round(Number(data[i].scoring_rate)*100);
             console.log(data[i].scoring_rate)
          
          //难度系数
              var difficulty_level=Number(data[i].difficulty_level);
              console.log(difficulty_level);
              if(difficulty_level==0){
                var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              }else if(difficulty_level>=0.86){

               var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
              }else if(difficulty_level>=0.71&&difficulty_level<0.86){
               var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
              }else if(difficulty_level>=0.61&&difficulty_level<0.71){
                 var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
              }else if(difficulty_level>=0.41&&difficulty_level<0.61){
                 var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
              }else if(difficulty_level>0&&difficulty_level<0.41){
                 var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i>';
              
              }
              //小题上标(得分率)
              var num =data[i].question_bank_id;
              var a_rate=Number(data[i].scoring_rate);

                if(num<10){
                  var num='0'+Number(data[i].question_bank_id);
                }   
              if(a_rate>=0.86){
               $(".c_topic_ever_box").append('<a class="class_topic_ever" style="background:#31bc91;" href="#c_a'+data[i].question_bank_id+'">'+num+'</a>');
              
              // var num_color="#31bc91";
             }else if(a_rate>=0.8&&a_rate<0.95){
                $(".c_topic_ever_box").append('<a class="class_topic_ever"  style="background:#f7c07c;" href="#c_a'+data[i].question_bank_id+'">'+num+'</a>');
             
             // var num_color="#f7c07c";
                 }else if(a_rate>=0.6&&a_rate<0.8){
                $(".c_topic_ever_box").append('<a class="class_topic_ever"  style="background:#5fa3ed;" href="#c_a'+data[i].question_bank_id+'">'+num+'</a>');
                  // var num_color="#5fa3ed";
             }else if(a_rate>=0&&a_rate<0.6){
                $(".c_topic_ever_box").append('<a class="class_topic_ever"  style="background:#fb7d8a;" href="#c_a'+data[i].question_bank_id+'">'+num+'</a>');
                // var num_color="#fb7d8a";
             }
              $(".c_list_ul").append('<li id="c_a'+data[i].question_bank_id+'"><div class="c_list_main"><div class="c_list_body">'+data[i].content+'</div><p class="c_list_lable"><a>班级得分率:<i style="font-style: normal;">'+s_rate+'%</i></a><a>班级平均分:<i style="font-style: normal;">'+data[i].average_score+'分</i></a><a>知识点:<i style="font-style: normal;">'+tag+'</i></a><a class="c_list_dif">难度系数:'+difficulty_body+'</a></p><div class="c_list_move"><a class="c_list_body_ans" data-id="'+i+'"><i class="iconfont" style="margin-right:10px;"></i>查看答案和解析</a></div></div></li>');  
            
            }
  
           $(".c_topic_ever_box").append('<div style="margin-top: 10px;color: #ccc;clear: both;"><i class="iconfont" style="font-size: 14px;color: #31bc91;margin-right: 5px;">&#xe646;</i>小提示：点击题号可以定位到相应题目</div>');

               
            },
            error:function(){
            
        },
        });

});

// $.ajax({
//             type: "POST",
//             url: ajaxIp + '/api/v2/wrong_books/delete',
//             async: false,
//             data:{
//                 'id':7,
//                 // 'title':"何俊111",
//             },
//             headers: {
//                 'Authorization': "Bearer " + isLogin
//             },
//             success: function(data) {
//              console.log(data);
//              },
//              error:function() {
//                /* Act on the event */
//              }
//            });
            

$(".c_wrong_list").on('click', '.c_wrong_list_name', function(event) {
$(".layer").css("height",$(document).height());
$(".layer").show();
$(".c_wrong_change_name").show();
$(".c_wrong_change_name_input").val($(this).html());
$(".c_wrong_change_name_t").attr("data-id",$(this).attr("data-id"));
});

$(".c_wrong_change_name_t").click(function(event) {
  $(".layer").hide();
$(".c_wrong_change_name").hide();
var title=$(".c_wrong_change_name_input").val();
var id=$(this).attr("data-id");
console.log(title.length);
if(title.length==0){
  alert("名称不能为空");
}else{
$.ajax({
            type: "POST",
            url: ajaxIp + '/api/v2/wrong_books/update_title',
            async: false,
            data:{
                'id':id,
                'title':title,
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
             console.log(data);
             c_list();
             },
             error:function() {
               /* Act on the event */
             }
           });
}

});
$(".c_wrong_change_name_f").click(function(event) {
  $(".layer").hide();
$(".c_wrong_change_name").hide();
});
$(".c_wrong_change_name_back").click(function(event) {
  $(".layer").hide();
$(".c_wrong_change_name").hide();
});
// 班级删除
$(".c_wrong_list").on('click', '.c_wrong_list_rem', function(event) {
var id=$(this).attr("data-id");
$.ajax({
            type: "POST",
            url: ajaxIp + '/api/v2/wrong_books/delete',
            async: false,
            data:{
                'id':id,
              
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
             console.log(data);
             c_list();
             layer.msg('删除成功',{time:700});
             },
             error:function() {
               /* Act on the event */
             }
           });
  
});
//年级管理
$(".g_wrong_list").on('click', '.g_wrong_list_name', function(event) {
$(".layer").css("height",$(document).height());
$(".layer").show();
$(".g_wrong_change_name").show();
$(".g_wrong_change_name_input").val($(this).html());
$(".g_wrong_change_name_t").attr("data-id",$(this).attr("data-id"));
});

$(".g_wrong_change_name_t").click(function(event) {
  $(".layer").hide();
$(".g_wrong_change_name").hide();
var title=$(".g_wrong_change_name_input").val();
var id=$(this).attr("data-id");
console.log(title.length);
if(title.length==0){
  alert("名称不能为空");
}else{
$.ajax({
            type: "POST",
            url: ajaxIp + '/api/v2/wrong_books/update_title',
            async: false,
            data:{
                'id':id,
                'title':title,
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
             console.log(data);
              g_wrong_list();
             },
             error:function() {
               /* Act on the event */
             }
           });
}

});
$(".g_wrong_change_name_f").click(function(event) {
  $(".layer").hide();
$(".g_wrong_change_name").hide();
});
$(".g_wrong_change_name_back").click(function(event) {
  $(".layer").hide();
$(".g_wrong_change_name").hide();
});
// 年级删除
$(".g_wrong_list").on('click', '.g_wrong_list_rem', function(event) {
var id=$(this).attr("data-id");
$.ajax({
            type: "POST",
            url: ajaxIp + '/api/v2/wrong_books/delete',
            async: false,
            data:{
                'id':id,
              
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
             console.log(data);
            g_wrong_list();
            layer.msg('删除成功',{time:700});
             },
             error:function() {
               /* Act on the event */
             }
           });
  
});
// $(".layer").show();
//个人错题本管理
$(".p_print").click(function(event) {
     $(".wrong_left_ul").hide();
     $("#header").hide();
     $(".title-box").hide();
      $(".ans_result").hide();
       $(".wrong_top").hide();
        $(".ans_news").hide();
       $(".p_topic_ever_box_par").hide();
       $(".p_list_body_ans").hide();
       $("#footer").hide();
        $(".p_list_main").css("width","100%");
         $(".main").css("width","100%");
          $(".main").css("margin-top","0px");
        $(".wrong_right").css("width","100%");
         $(".content").css("padding-bottom","0px");
      window.print();
      $(".wrong_left_ul").show();
     $("#header").show();
     $(".title-box").show();
      $(".ans_result").show();
       $(".wrong_top").show();
        $(".ans_news").show();
       $(".p_topic_ever_box_par").show();
       $(".p_list_body_ans").show();
       $("#footer").show();
       $(".p_list_main").css("width","923px");
         $(".main").css("width","1200px");
          $(".main").css("margin-top","45px");
        $(".wrong_right").css("width","1000px");
         $(".content").css("padding-bottom","100px");
      
     });
     


$(".per_wrong_admin_students_p02").on('click', 'a', function(event){
      $(this).css("color","#ffffff").siblings().css("color","#333333");
      $(this).css("background","#31bc91").siblings().css("background","#f5f5f5");
     });
// 删除
$(".per_wrong_list").on('click', '.per_wrong_list_rem', function(event) {
 $(this).parents('li').remove();
});
$(".per_wrong_list").on('click', '.per_wrong_list_look', function(event) {
 $(".per_wrong_admin_main_box").hide();
 $(".per_wrong_list_look_box").show();
 $(".wrong_top").html('<i class="c_back_font  iconfont" style="margin-right:10px;cursor: pointer;"></i>'+$(this).parents('li').find('.p_wrong_list_name').html()+'');
});
$(".wrong_top").on('click', 'i', function(event) {
 $(".per_wrong_admin_main_box").show();
 $(".per_wrong_list_look_box").hide();
 $(".wrong_top").html('个人错题集管理');
});




 })