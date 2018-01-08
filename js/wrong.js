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
     $(".grade_list_move_a").click(function(event) {
     
     	$(this).parent().parent().remove();
     	//题号排序
     	var a = $(".grade_list").children('div').length;
     	if(a<10){
     		var a_nub=1;
     		for(var i=0;i<a;i++){
              var a_num="0"+a_nub;
               $(".grade_list").children('div').eq(i).find('.grade_list_number a').html(a_num);
                a_nub++;
     		}
     	}
     	
     });
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
               $(".grade_exam").append('<option value="" data-id="'+data[i].id+'">'+data[i].name+'</option>');

               
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
   data_num.length
    if($(".type_ever a").eq(0).attr("data-id")==1){
    data_num[0]=0;
    data_num[1]=5;
    }
    if($(".type_ever a").eq(1).attr("data-id")==1){
      
      if(data_num.length==0){
       data_num[0]=1;
      }else{
        data_num[data_num.length]=1;
      }
    
    }
    if($(".type_ever a").eq(2).attr("data-id")==1){
      if(data_num.length==0){
       data_num[0]=2;
      }else{
        data_num[data_num.length]=2;
      }
    }
    if($(".type_ever a").eq(3).attr("data-id")==1){
      if(data_num.length==0){
       data_num[0]=3;
      }else{
        data_num[data_num.length]=3;
      }
    }
    if($(".type_ever a").eq(4).attr("data-id")==1){
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
              for(var i=0;i<data.length;i++){
                var scoring_rate=Math.floor(data[i].scoring_rate*100)+"%";
                console.log(scoring_rate);
                 var tags="";
                 //知识点
                for(var i1=0;i1<data[i].tags.length;i1++){
                     tags= tags+data[i].tags;
                     
                }
                console.log(tags);
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
              $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#31bc91;">'+num+'</a>');
             }else if(a_rate>=0.8&&a_rate<0.95){
               $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#f7c07c;">'+num+'</a>');
             
             }else if(a_rate>=0.6&&a_rate<0.8){
               $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#5fa3ed;">'+num+'</a>');
             
             }else if(a_rate>=0&&a_rate<0.6){
               $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#fb7d8a;">'+num+'</a>');
             
             }

                $(".grade_list_ul").append('<li><div class="grade_list_main"><div class="grade_list_body">'+data[i].content+'</div><p class="grade_list_lable"><a>年级得分率:<i>'+scoring_rate+'</i></a><a>年级平均分:<i>'+data[i].average_score+'分</i></a><a>知识点:<i>'+tags+'</i></a><a class="grade_list_dif">难度系数:'+difficulty_body+'</a></p><div class="grade_list_move"><a class="grade_list_body_ans"  data-ans="'+data[i].answer+'"  data-anal="'+data[i].analysis+'"><i class="iconfont" style="margin-right:5px;">&#xe61e;</i>查看答案和解析</a><a  class="grade_list_move_a">移除</a></div><div class="grade_list_number"><p><i class="iconfont" style="font-size:45px;color:#31bc91;">&#xe63f;</i><a>'+num+'</a></p></div><div class="grade_list_form">试题来源:<a>'+source+'</a></div></div></li>');
              }


            },
            error:function() {
               
            },
        });
    });
       // var data_num=[0,5];
      // $.ajax({
      //       type: "POST",
      //       url: ajaxIp + "/api/v2/wrong_questions/grade_index",
      //       async: false,
      //       data:{
      //           "exam_id":343,
      //            "subject_id":12,
      //            "item":data_num,
      //            "rate":0.90,
      //       },
      //       headers: {
      //           'Authorization': "Bearer " + isLogin
      //       },
      //       success: function(data) {
      //           console.log(data);
      //         for(var i=0;i<data.length;i++){
      //           var scoring_rate=Math.floor(data[i].scoring_rate*100)+"%";
      //           console.log(scoring_rate);
      //            var tags="";
      //            //知识点
      //           for(var i1=0;i1<data[i].tags.length;i1++){
      //                tags= tags+data[i].tags;
                     
      //           }
      //           console.log(tags);
      //         //难度系数
      //         var difficulty_level=Number(data[i].difficulty_level);
      //         console.log(difficulty_level);
      //         if(difficulty_level==0){
      //           var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
      //         }else if(difficulty_level>=0.86){

      //          var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
      //         }else if(difficulty_level>=0.71&&difficulty_level<0.86){
      //          var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
      //         }else if(difficulty_level>=0.61&&difficulty_level<0.71){
      //            var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
      //         }else if(difficulty_level>=0.41&&difficulty_level<0.61){
      //            var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
              
      //         }else if(difficulty_level>0&&difficulty_level<0.41){
      //            var difficulty_body='<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i>';
              
      //         }
      //         //考试来源
      //         var source=data[i].source;
      //         //序号
      //         var num=Number(data[i].question_bank_id);
      //         if(num<10){
      //             var num='0'+Number(data[i].question_bank_id);
      //         }
      //         //小题上标(得分率)
      //         var a_rate=Number(data[i].scoring_rate);
      //         if(a_rate>=0.86){
      //         $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#31bc91;">'+num+'</a>');
      //        }else if(a_rate>=0.8&&a_rate<0.95){
      //          $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#f7c07c;">'+num+'</a>');
             
      //        }else if(a_rate>=0.6&&a_rate<0.8){
      //          $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#5fa3ed;">'+num+'</a>');
             
      //        }else if(a_rate>=0&&a_rate<0.6){
      //          $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#fb7d8a;">'+num+'</a>');
             
      //        }

      //           $(".grade_list_ul").append('<li><div class="grade_list_main"><div class="grade_list_body">'+data[i].content+'</div><p class="grade_list_lable"><a>年级得分率:<i>'+scoring_rate+'</i></a><a>年级平均分:<i>'+data[i].average_score+'分</i></a><a>知识点:<i>'+tags+'</i></a><a class="grade_list_dif">难度系数:'+difficulty_body+'</a></p><div class="grade_list_move"><a class="grade_list_body_ans"  data-ans="'+data[i].answer+'"  data-anal="'+data[i].analysis+'"><i class="iconfont" style="margin-right:5px;">&#xe61e;</i>查看答案和解析</a><a  class="grade_list_move_a">移除</a></div><div class="grade_list_number"><p><i class="iconfont" style="font-size:45px;color:#31bc91;">&#xe63f;</i><a>'+num+'</a></p></div><div class="grade_list_form">试题来源:<a>'+source+'</a></div></div></li>');
      //         }


      //       },
      //       error:function() {
               
      //       },
      //   });

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