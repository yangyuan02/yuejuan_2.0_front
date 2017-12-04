 $(document).ready(function() {
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

         } else {
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
     //   $(".class_print").click(function(event) {
     // $("#footer").hide();
     // $(".ans_result").hide();
     // $(".wrong_left_ul").hide();
     // $(".class_list_move").hide();
     // $(".q_type").hide();
     // $(".class_select_top").hide();
     // $(".class_topic").hide();
     //  $("#header").hide();
     //  $(".title-box").hide();
     //   $(".wrong_top").hide();
     //   $(".ans_news").hide();
     // $(".main").css("width","100%");
     //  $(".main").css("margin-top","0px");
     //   $(".class_list").css("padding","0px");
     //  $(".wrong_right").css("width","100%");
     //  $(".wrong_right").css("padding","0");
     // $(".class_list_main").css("width","100%");
     //  window.print();
     //   $("#footer").show();
     // $(".ans_result").show();
     // $(".wrong_left_ul").show();
     // $(".class_list_move").show();
     // $(".q_type").show();
     // $(".class_select_top").show();
     // $(".class_topic").show();
     //  $("#header").show();
     //  $(".title-box").show();
     //   $(".wrong_top").show();
     //   $(".ans_news").show();
     // $(".main").css("width","1200px");
     //  $(".wrong_right").css("width","1000px");
     // $(".class_list_main").css("width","923px");
     //  $(".main").css("margin-top","45px");
     //   $(".class_list").css("padding","20px 0px 100px 0px");
     // $(".wrong_right").css("padding","43px 40px 100px 35px");
     // });
     //   $(".per_print").click(function(event) {
     // $("#footer").hide();
     // $(".ans_result").hide();
     //  $(".students_key").hide();
     //   $(".students_key_box").hide();
     // $(".wrong_left_ul").hide();
     // $(".per_list_move").hide();
     // $(".q_type").hide();
     // $(".per_select_top").hide();
     // $(".per_topic").hide();
     //  $("#header").hide();
     //  $(".title-box").hide();
     //   $(".wrong_top").hide();
     //   $(".ans_news").hide();
     // $(".main").css("width","100%");
     //  $(".main").css("margin-top","0px");
     //   $(".per_list").css("padding","0px");
     //  $(".wrong_right").css("width","100%");
     //  $(".wrong_right").css("padding","0");
     // $(".per_list_main").css("width","100%");
     //  window.print();
     //   $("#footer").show();
     // $(".ans_result").show();
     //  $(".students_key_box").show();
     //   $(".students_key").show();
     // $(".wrong_left_ul").show();
     // $(".per_list_move").show();
     // $(".q_type").show();
     // $(".per_select_top").show();
     // $(".per_topic").show();
     //  $("#header").show();
     //  $(".title-box").show();
     //   $(".wrong_top").show();
     //   $(".ans_news").show();
     // $(".main").css("width","1200px");
     //  $(".wrong_right").css("width","1000px");
     // $(".per_list_main").css("width","923px");
     //  $(".main").css("margin-top","45px");
     //   $(".per_list").css("padding","20px 0px 100px 0px");
     // $(".wrong_right").css("padding","43px 40px 100px 35px");
     // });
     // $(".grate_wrong_make").click(function(event) {
     // 	var a = $(".grade_list").children('div').eq(1).find('.grade_list_number a').html("18");
     // 	alert(a);
     // });
     //班级错题
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