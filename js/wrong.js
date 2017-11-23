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
     // $(".grate_wrong_make").click(function(event) {
     // 	var a = $(".grade_list").children('div').eq(1).find('.grade_list_number a').html("18");
     // 	alert(a);
     // });
     //班级错题
     $(".class_sur").click(function(event) {
         $(".class_ans").slideDown('1000');
     });
     $(".wrong_left_ul li").eq(1).click(function(event) {
         $(".wrong_main").children('div').eq(0).children('.grade_ans').hide();
         $(".wrong_main").children('div').eq(2).children('.per_ans').hide();
     });
      //移除
     $(".class_list_move_a").click(function(event) {
     	$(this).parent().parent().remove();
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
    	$(".stu_choice_btn").hide();
     });
      $(".wrong_left_ul li").click(function(event) {
         $(".students_key").hide();
    	$(".students_key_box").hide();
    	$(".stu_choice_btn").show();

      });
     //重点追踪学生
     $(".students_key_box").on('click', 'a', function(event){
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
    	$(".stu_choice_btn").hide();
     });




 })