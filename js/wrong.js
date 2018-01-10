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
     // $(".grate_wrong_make").click(function(event) {
     // 	var a = $(".grade_list").children('div').eq(1).find('.grade_list_number a').html("18");
     // 	alert(a);
     // });
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
     //年级 ajax  end
     //班级错题
     $(".wrong_class_li").click(function(event) {
         /* Act on the event */
     });
     // var wrong=[{time:"最近一周",grade:[{id:11,name:"高一",},{id:12,name:"高二",}],class:[{id:11,name:"一",},{id:12,name:"二",}],subject:[{id:21,name:"数学",},{id:22,name:"英文",}]},
     // {time:"最近一月",grade:[{id:12,name:"高二",},{id:11,name:"高一",}],class:[{id:12,name:"二",},{id:11,name:"一",}],subject:[{id:45,name:"物理",},{id:46,name:"化学",}]}];
     // console.log(wrong);
     //   console.log(wrong.length);
       $(".grade_rate").change(function(event) {
        var a=$(this).children('option:selected').val();
         $(this).attr("rate-id",a);
       });


    $(".grade_sur").click(function(event) {
     var rate=$(".grade_rate").attr("rate-id");
    // console.log($(".type_ever a").eq(0).html()); 
   // var data_num=[];
   var data_num=[];
    if($(this).parent().prev().find('a').eq(0).attr("data-id")==1){
    data_num[0]=0;
    data_num[1]=5;
    }
    if($(this).parent().prev().find('a').eq(1).attr("data-id")==1){
      
      if(data_num.length==0){
       data_num[0]=1;
      }else{
        data_num[data_num.length]=1;
      }
    
    }
    if($(this).parent().prev().find('a').eq(2).attr("data-id")==1){
      if(data_num.length==0){
       data_num[0]=2;
      }else{
        data_num[data_num.length]=2;
      }
    }
    if($(this).parent().prev().find('a').eq(3).attr("data-id")==1){
      if(data_num.length==0){
       data_num[0]=3;
      }else{
        data_num[data_num.length]=3;
      }
    }
    if($(this).parent().prev().find('a').eq(4).attr("data-id")==1){
    if(data_num.length==0){
       data_num[0]=4;
      }else{
        data_num[data_num.length]=4;
      }
    }
   console.log(data_num);
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
            },
            headers: {
                'Authorization': "Bearer " + isLogin
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
              var num=Number(data[i].question_bank_id);
              if(num<10){
                  var num='0'+Number(data[i].question_bank_id);
              }
              //小题上标(得分率)
              var a_rate=Number(data[i].scoring_rate);
              if(a_rate>=0.86){
              $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#31bc91;" scoring_rate="'+data[i].scoring_rate+'" bank_id="'+data[i].question_bank_id+'" average_score="'+data[i].average_score+'" exam_subject_id="'+data[i].exam_subject_id+'" total_score="'+data[i].total_score+'" item="'+data[i].item+'">'+num+'</a>');
              var num_color="#31bc91";
             }else if(a_rate>=0.8&&a_rate<0.95){
               $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#f7c07c;" scoring_rate="'+data[i].scoring_rate+'" bank_id="'+data[i].question_bank_id+'" average_score="'+data[i].average_score+'" exam_subject_id="'+data[i].exam_subject_id+'" total_score="'+data[i].total_score+'" item="'+data[i].item+'">'+num+'</a>');
             var num_color="#f7c07c";
             }else if(a_rate>=0.6&&a_rate<0.8){
               $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#5fa3ed;" scoring_rate="'+data[i].scoring_rate+'" bank_id="'+data[i].question_bank_id+'" average_score="'+data[i].average_score+'" exam_subject_id="'+data[i].exam_subject_id+'" total_score="'+data[i].total_score+'" item="'+data[i].item+'">'+num+'</a>');
             var num_color="#5fa3ed";
             }else if(a_rate>=0&&a_rate<0.6){
               $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#fb7d8a;" scoring_rate="'+data[i].scoring_rate+'" bank_id="'+data[i].question_bank_id+'" average_score="'+data[i].average_score+'" exam_subject_id="'+data[i].exam_subject_id+'" total_score="'+data[i].total_score+'" item="'+data[i].item+'">'+num+'</a>');
             var num_color="#fb7d8a";
             }

                $(".grade_list_ul").append('<li><div class="grade_list_main"><div class="grade_list_body">'+data[i].content+'</div><p class="grade_list_lable"><a>年级得分率:<i>'+scoring_rate+'</i></a><a>年级平均分:<i>'+data[i].average_score+'分</i></a><a>知识点:<i>'+tags+'</i></a><a class="grade_list_dif">难度系数:'+difficulty_body+'</a></p><div class="grade_list_move"><a class="grade_list_body_ans"  data-ans="'+data[i].answer+'"  data-anal="'+data[i].analysis+'"><i class="iconfont" style="margin-right:5px;">&#xe61e;</i>查看答案和解析</a><a  class="grade_list_move_a">移除</a></div><div class="grade_list_number"><p><i class="iconfont" style="font-size:45px;color:'+num_color+';">&#xe63f;</i><a>'+num+'</a></p></div><div class="grade_list_form">试题来源:<a>'+source+'</a></div></div></li>');
              }


            },
            error:function() {
               
            },
        });
    });
 // 考试生成错题本

 
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

    grade_wrongs[i]=grade_wrong;
  }
console.log(grade_wrongs);
$.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/wrong_questions",
            async: false,
            data:{
                "wrong_questions":JSON.stringify(grade_wrongs),
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
               console.log(data);
            },
            error: function(data) {

            },
        })


});
 
   //班级
$(".class_select_time").change(function(event) {
     near_exam();
});
 function near_exam(){
  var time_type=$(".class_select_time").attr("data-id");
  var id=$(".class_select_grate").attr("data-id");
  $.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/wrong_questions/lately_exams",
            async: false,
            data:{
                "time_type":time_type,
                 "grade_id":id,
        
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
                $(".class_sur").attr("exam_id"," ");
                $(".class_sur").attr("exam_length"," ");
                var exam_id=[];
                for(var i=0;i<data.length;i++){
                 exam_id[i]=data[i].id;
                }
                $(".class_sur").attr("exam_id",exam_id);
                $(".class_sur").attr("exam_length",exam_id.length);
              
            },
            error:function(){

            },
        });
 }    

$(".class_sur").click(function(event) {
console.log($(this).attr("exam_id"));
var exam_id=$(this).attr("exam_id");
var exam_length=$(this).attr("exam_length");
var words = exam_id.split(',');
var word =[];
for(var length=0;length<exam_length;length++){
     word[length]=parseInt(words[length]);
}
console.log(word);
//类型
 var data_num=[];
    if($(this).parent().prev().find('a').eq(0).attr("data-id")==1){
    data_num[0]=0;
    data_num[1]=5;
    }
    if($(this).parent().prev().find('a').eq(1).attr("data-id")==1){
      
      if(data_num.length==0){
       data_num[0]=1;
      }else{
        data_num[data_num.length]=1;
      }
    
    }
    if($(this).parent().prev().find('a').eq(2).attr("data-id")==1){
      if(data_num.length==0){
       data_num[0]=2;
      }else{
        data_num[data_num.length]=2;
      }
    }
    if($(this).parent().prev().find('a').eq(3).attr("data-id")==1){
      if(data_num.length==0){
       data_num[0]=3;
      }else{
        data_num[data_num.length]=3;
      }
    }
    if($(this).parent().prev().find('a').eq(4).attr("data-id")==1){
    if(data_num.length==0){
       data_num[0]=4;
      }else{
        data_num[data_num.length]=4;
      }
    }
   console.log(data_num);
  var rate=$(".class_select_rate").attr("data-id");
  var class_id=$(".class_select_class").attr("data-id");
  var sub_id=$(".class_select_sub").attr("data-id");
  if(class_id==undefined){
    alert("班级不能为空");
  }
  if(sub_id==undefined){
    alert("考试科目不能为空");
  }
   console.log(sub_id);
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
        
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
                console.log(data);
                 $(".class_list_ul").html(" ");
                $(".class_sur").attr("school_id",data[0][0].school_id);
               for(var i=0;i<data.length;i++){
                $(".class_topic_ever_ul").append('<li><p>'+data[i][i].source+'</p></li>')
                 for(var i_1=0;i_1<data[i].length;i_1++){
                    //  console.log(i_1);
                    // console.log(data[i][i_1].content);
                var scoring_rate=Math.floor(data[i][i_1].scoring_rate*100)+"%";

                 //知识点 
                 var tags=data[i][i_1].tags;
                 //考试来源
                 var source=data[i][i_1].source;
                //序号
                var num=Number(data[i][i_1].question_bank_id);
                if(num<10){
                  var num='0'+Number(data[i][i_1].question_bank_id);
                }   
              //小题上标(得分率)
              var a_rate=Number(data[i][i_1].scoring_rate);
              if(a_rate>=0.86){
               $(".class_topic_ever_ul li").eq(i).append('<a class="class_topic_ever" id="wrong_class_li'+data[i][i_1].question_bank_id+'"  style="background:#31bc91;">'+num+'</a>');
              
              var num_color="#31bc91";
             }else if(a_rate>=0.8&&a_rate<0.95){
                $(".class_topic_ever_ul li").eq(i).append('<a class="class_topic_ever" id="wrong_class_li'+data[i][i_1].question_bank_id+'"  style="background:#f7c07c;">'+num+'</a>');
             
             var num_color="#f7c07c";
                 }else if(a_rate>=0.6&&a_rate<0.8){
                $(".class_topic_ever_ul li").eq(i).append('<a class="class_topic_ever" id="wrong_class_li'+data[i][i_1].question_bank_id+'"  style="background:#5fa3ed;">'+num+'</a>');
             
             var num_color="#5fa3ed";
             }else if(a_rate>=0&&a_rate<0.6){
                $(".class_topic_ever_ul li").eq(i).append('<a class="class_topic_ever" id="wrong_class_li'+data[i][i_1].question_bank_id+'"  style="background:#fb7d8a;">'+num+'</a>');
             
             var num_color="#fb7d8a";
             }
            //难度系数
              var difficulty_level=Number(data[i][i_1].difficulty_level);
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
                  
                 $(".class_list_ul").append(' <li class="wrong_class_li'+data[i][i_1].question_bank_id+'" bank_id="'+data[i][i_1].question_bank_id+'" total_score="'+data[i][i_1].total_score+'"  average_score="'+data[i][i_1].average_score+'" scoring_rate="'+data[i][i_1].scoring_rate+'"  item="'+data[i][i_1].item+'" exam_subject_id="'+data[i][i_1].exam_subject_id+'"><div class="class_list_main"><div class="class_list_body">'+data[i][i_1].content+'</div><p class="class_list_lable"><a>年级得分率:<i>'+scoring_rate+'</i></a><a>年级平均分:<i>'+data[i][i_1].average_score+'分</i></a><a>知识点:<i>'+tags+'</i></a><a class="class_list_dif">难度系数:'+difficulty_body+'</a></p><div class="class_list_move"><a class="class_list_body_ans"   data-ans="'+data[i][i_1].answer+'"  data-anal="'+data[i][i_1].analysis+'"><i class="iconfont" style="margin-right:10px;"></i>查看答案和解析</a><a  class="class_list_move_a">移除</a></div><div class="class_list_number"><p><i class="iconfont" style="font-size:45px;color:'+num_color+';"></i><a>'+num+'</a></p></div><div class="class_list_form">试题来源:<a>'+source+'</a></div></div></li>');
                  }

               }
             
            },
            error:function(){

            },
        });





})

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
    console.log(class_wrongs);
    $.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/wrong_questions",
            async: false,
            data:{
                "wrong_questions":JSON.stringify(class_wrongs),
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
               console.log(data);
            },
            error: function(data) {

            },
        })


});

//班级年级
$.ajax({
            type: "GET",
            url: ajaxIp + "/api/v2/commons/school_grades",
            async: false,
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
                console.log(data);
                 $(".class_select_grate").html(" ");
                  $(".class_select_grade").attr("data-id"," ");
                 if(data.length!==0){
                 $(".class_select_grate").attr("data-id",data[0].id);
                for(var i=0;i<data.length;i++){
                   $(".class_select_grate").append('<option value="" data-id='+data[i].id+'>'+data[i].name+'</option>');
                }
            }
            },
            error:function(){

            },
        });
function grade_get_class(grade_id){
$.ajax({
            type: "GET",
            url: ajaxIp + '/api/v2/commons/'+grade_id+'/grade_classrooms',
            async: false,
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
                console.log(data);
                 $(".class_select_class").html(" ");
                  $(".class_select_class").attr("data-id"," ");
                 if(data.length!==0){
                 $(".class_select_class").attr("data-id",data[0].id);
                 for(var i=0;i<data.length;i++){
                   $(".class_select_class").append('<option value="" data-id='+data[i].id+'>'+data[i].name+'</option>');
                 }
               }
            },
            error:function(){

            },
        });

$.ajax({
            type: "GET",
            url: ajaxIp + '/api/v2/commons/grade_subjects',
            async: false,
            data:{
                'grade_id':grade_id,
            },
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
                console.log(data);
                $(".class_select_sub").attr("data-id"," ");
                 $(".class_select_sub").html(" ");
                 if(data.length!==0){
                 $(".class_select_sub").attr("data-id",data[0].id);
                 for(var i=0;i<data.length;i++){
                   $(".class_select_sub").append('<option value="" data-id='+data[i].id+'>'+data[i].name+'</option>');
                 }
             }
               
            },
            error:function(){

            },
        });


};
//根据班级获取年级
$(".wrong_class_li").click(function(event) {
   var grade_id=$(".class_select_grate").children('option:selected').attr("data-id");
   grade_get_class(grade_id);
   near_exam();

});
 $(".class_select_grate").change(function(event) {
   var grade_id=$(this).children('option:selected').attr("data-id");
   grade_get_class(grade_id);



 });


 //班级select
 $(".class_select_top select").change(function(event) {
    $(this).attr("data-id",$(this).children('option:selected').attr("data-id"));

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
    $(".grade_ans01").html($(this).attr("data-ans"));
    $(".grade_ans02").html($(this).attr("data-anal"));
 $(".grade_ans_tc").show();

});
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
    $(".class_ans01").html($(this).attr("data-ans"));
    $(".class_ans02").html($(this).attr("data-anal"));
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
      //移除
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
        //生成变式训练
        $(".per_make_change").click(function(event) {
        $(".per_list_ans_train_top01").show();
         $(".per_list_ans_train_01").show();
        });
     //重点追踪学生
     $(".students_key_box_p02").on('click', 'a', function(event){
      $(this).css("border-color","#31bc91").siblings().css("border-color","#cccccc");
      $(this).css("background","#ffffff").siblings().css("background","#f5f5f5");
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




 })