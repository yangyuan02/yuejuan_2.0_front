 $(document).ready(function() {
     var isLogin = localStorage.getItem("token");

     //切换模块
     $(".wrong_left_ul li").click(function(event) {
         var a = $(this).index();
         $(this).attr("id", 'wrong_left_li').siblings().attr("id", '');
         $(".wrong_top").html($(this).html());
         $(".wrong_main").children('div').eq(a).show().siblings().hide();

     });
     //全部题型1
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
     $(".grade_list_ul").on('click', '.grade_list_move_a', function(event) {
         for (var i = 0; i < $(".grade_list_ul li").length; i++) {
             $(".grade_list_ul li").eq(i).find('.grade_list_move_a').attr("data-id", i);
         }
         $(this).parents('li').remove();
         var index = parseInt($(this).attr("data-id"));
         console.log(index);
         $(".grate_topic_ever_box a").eq(index).remove();

     });

     ///

     //题号排序

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
         $(".main").css("width", "100%");
         $(".main").css("margin-top", "0px");
         $(".grade_list").css("padding", "0px");
         $(".wrong_right").css("width", "100%");
         $(".wrong_right").css("padding", "0");
         $(".grade_list_main").css("width", "100%");
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
         $(".main").css("width", "1200px");
         $(".wrong_right").css("width", "1000px");
         $(".grade_list_main").css("width", "923px");
         $(".main").css("margin-top", "45px");
         $(".grade_list").css("padding", "20px 0px 100px 0px");
         $(".wrong_right").css("padding", "43px 40px 100px 35px");
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
         $(".main").css("width", "100%");
         $(".main").css("margin-top", "0px");
         $(".class_list").css("padding", "0px");
         $(".wrong_right").css("width", "100%");
         $(".wrong_right").css("padding", "0");
         $(".class_list_main").css("width", "100%");
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
         $(".main").css("width", "1200px");
         $(".wrong_right").css("width", "1000px");
         $(".class_list_main").css("width", "923px");
         $(".main").css("margin-top", "45px");
         $(".class_list").css("padding", "20px 0px 100px 0px");
         $(".wrong_right").css("padding", "43px 40px 100px 35px");
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
         $(".main").css("width", "100%");
         $(".main").css("margin-top", "0px");
         $(".per_list").css("padding", "0px");
         $(".wrong_right").css("width", "100%");
         $(".wrong_right").css("padding", "0");
         $(".per_list_main").css("width", "100%");
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
         $(".main").css("width", "1200px");
         $(".wrong_right").css("width", "1000px");
         $(".per_list_main").css("width", "923px");
         $(".main").css("margin-top", "45px");
         $(".per_list").css("padding", "20px 0px 100px 0px");
         $(".wrong_right").css("padding", "43px 40px 100px 35px");
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
             var exam_length = data.length;
             for (var i = 0; i < exam_length; i++) {
                 $(".grade_exam").attr("data-id", data[0].id);
                 $(".grade_exam").attr("grade_id", data[0].grade_id);
                 $(".grade_exam").attr("school_id", data[0].school_id);

                 $(".grade_exam").append('<option value="" data-id="' + data[i].id + '" grade_id="' + data[i].grade_id + '" school_id="' + data[i].school_id + '">' + data[i].name + '</option>');

             }

             var sub_length = data[0].subjects.length;
             var sub = data[0].subjects;
             $(".grade_exam").change(function(event) {
                 var in_dex = parseInt($(this).children('option:selected').index());
                 sub_length = data[in_dex].subjects.length;
                 sub = data[in_dex].subjects;
                 $(".grade_sub").html(" ");
                 for (var a = 0; a < sub_length; a++) {
                     console.log(in_dex);
                     $(".grade_sub").attr("data-id", data[in_dex].subjects[0].subject_id);
                     $(".grade_sub").append('<option value="" data-id="' + sub[a].subject_id + '">' + sub[a].name + '</option>')
                 }

             });
             for (var a = 0; a < sub_length; a++) {
                 $(".grade_sub").attr("data-id", data[0].subjects[0].subject_id);
                 $(".grade_sub").append('<option value="" data-id="' + sub[a].subject_id + '">' + sub[a].name + '</option>')
             }



         },
         error: function() {

         }

     });
     $(".grade_exam").change(function(event) {
         $(this).attr("data-id", $(this).children('option:selected').attr("data-id"));
         $(this).attr("grade_id", $(this).children('option:selected').attr("grade_id"));
         $(this).attr("school_id", $(this).children('option:selected').attr("school_id"));
         console.log($(this).children('option:selected').attr("data-id"));
     });
     $(".grade_sub").change(function(event) {
         $(this).attr("data-id", $(this).children('option:selected').attr("data-id"));
         console.log($(this).children('option:selected').attr("data-id"));
     });
     $(".grade_select_top select").change(function(event) {
         $(".grade_ans").hide();
     });
     //年级 ajax  end
     //班级错题


     $(".grade_rate").change(function(event) {
         var a = $(this).children('option:selected').val();
         $(this).attr("rate-id", a);
     });
     $(".grade_sort").change(function(event) {
         $(this).attr("data-id", $(this).children('option:selected').attr("data-id"));
         grade_list();
     });
     $(".class_sort").change(function(event) {
         $(this).attr("data-id", $(this).children('option:selected').attr("data-id"));
         class_list();
     });
     $(".grade_sur").click(function(event) {
         grade_list();
         console.log($(".grate_topic a").length);

     });
     // 考试生成错题本
     function grade_list() {
         var rate = $(".grade_rate").attr("rate-id");

         var data_num = [];
         if ($(".grade_sur").parent().prev().find('a').eq(0).attr("data-id") == 1) {
             data_num[0] = 0;
             data_num[1] = 5;
         }
         if ($(".grade_sur").parent().prev().find('a').eq(1).attr("data-id") == 1) {

             if (data_num.length == 0) {
                 data_num[0] = 1;
             } else {
                 data_num[data_num.length] = 1;
             }

         }
         if ($(".grade_sur").parent().prev().find('a').eq(2).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 2;
             } else {
                 data_num[data_num.length] = 2;
             }
         }
         if ($(".grade_sur").parent().prev().find('a').eq(3).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 3;
             } else {
                 data_num[data_num.length] = 3;
             }
         }
         if ($(".grade_sur").parent().prev().find('a').eq(4).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 4;
             } else {
                 data_num[data_num.length] = 4;
             }
         }
         console.log(data_num);
         var sort = $(".grade_sort").attr("data-id");
         var grade_exam = parseInt($(".grade_exam").attr("data-id"));
         var grade_sub = parseInt($(".grade_sub").attr("data-id"));
         console.log(grade_exam);
         console.log(grade_sub);
         $.ajax({
             type: "POST",
             url: ajaxIp + "/api/v2/wrong_questions/grade_index",
             async: false,
             data: {
                 "exam_id": grade_exam,
                 "subject_id": grade_sub,
                 "item": data_num,
                 "rate": rate,
                 "sort": sort,
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             beforeSend: function() {
                 $(".load-bg").show();
             },
             success: function(data) {
                 console.log(data);
                 $(".grade_list_ul").html(" ");
                 $(".grate_topic_ever_box").html(" ");
                 for (var i = 0; i < data.length; i++) {
                     var scoring_rate = Math.floor(data[i].scoring_rate * 100) + "%";

                     var tags = data[i].tags;
                     //知识点

                     //难度系数
                     var difficulty_level = Number(data[i].difficulty_level);

                     if (difficulty_level == 0) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
                     } else if (difficulty_level >= 0.86) {

                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level >= 0.71 && difficulty_level < 0.86) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level >= 0.61 && difficulty_level < 0.71) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level >= 0.41 && difficulty_level < 0.61) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level > 0 && difficulty_level < 0.41) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i>';

                     }
                     //考试来源
                     var source = data[i].source;
                     //序号
                     var num = data[i].num;

                     //小题上标(得分率)
                     var a_rate = Number(data[i].scoring_rate);
                     if (a_rate >= 0.86) {
                         $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#31bc91;" scoring_rate="' + data[i].scoring_rate + '" bank_id="' + data[i].question_bank_id + '" average_score="' + data[i].average_score + '" exam_subject_id="' + data[i].exam_subject_id + '" total_score="' + data[i].total_score + '" item="' + data[i].item + '" classroom_id="' + data[i].classroom_id + '" href="#grade_list_move' + data[i].question_bank_id + '" difficulty_id="' + data[i].difficulty + '">' + num + '</a>');
                         var num_color = "#31bc91";
                     } else if (a_rate >= 0.8 && a_rate < 0.95) {
                         $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#f7c07c;" scoring_rate="' + data[i].scoring_rate + '" bank_id="' + data[i].question_bank_id + '" average_score="' + data[i].average_score + '" exam_subject_id="' + data[i].exam_subject_id + '" total_score="' + data[i].total_score + '" item="' + data[i].item + '" classroom_id="' + data[i].classroom_id + '" href="#grade_list_move' + data[i].question_bank_id + '" difficulty_id="' + data[i].difficulty + '">' + num + '</a>');
                         var num_color = "#f7c07c";
                     } else if (a_rate >= 0.6 && a_rate < 0.8) {
                         $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#5fa3ed;" scoring_rate="' + data[i].scoring_rate + '" bank_id="' + data[i].question_bank_id + '" average_score="' + data[i].average_score + '" exam_subject_id="' + data[i].exam_subject_id + '" total_score="' + data[i].total_score + '" item="' + data[i].item + '" classroom_id="' + data[i].classroom_id + '" href="#grade_list_move' + data[i].question_bank_id + '" difficulty_id="' + data[i].difficulty + '">' + num + '</a>');
                         var num_color = "#5fa3ed";
                     } else if (a_rate >= 0 && a_rate < 0.6) {
                         $(".grate_topic_ever_box").append('<a class="grate_topic_ever" style="background:#fb7d8a;" scoring_rate="' + data[i].scoring_rate + '" bank_id="' + data[i].question_bank_id + '" average_score="' + data[i].average_score + '" exam_subject_id="' + data[i].exam_subject_id + '" total_score="' + data[i].total_score + '" item="' + data[i].item + '" classroom_id="' + data[i].classroom_id + '" href="#grade_list_move' + data[i].question_bank_id + '" difficulty_id="' + data[i].difficulty + '">' + num + '</a>');
                         var num_color = "#fb7d8a";
                     }

                     $(".grade_list_ul").append('<li id="grade_list_move' + data[i].question_bank_id + '"><div class="grade_list_main"><div class="grade_list_body">' + data[i].content + '</div><p class="grade_list_lable"><a>年级得分率:<i>' + scoring_rate + '</i></a><a>年级平均分:<i>' + data[i].average_score + '分</i></a><a>知识点:<i>' + tags + '</i></a><a class="grade_list_dif">难度系数:' + difficulty_body + '（实测难度：' + data[i].difficulty + '）</a></p><div class="grade_list_move"><a class="grade_list_body_ans"  data-id="' + i + '"><i class="iconfont" style="margin-right:5px;">&#xe61e;</i>查看答案和解析</a><a  class="grade_list_move_a">移除</a></div><div class="grade_list_number"><p><i class="iconfont" style="font-size:45px;color:' + num_color + ';">&#xe63f;</i><a>' + num + '</a></p></div><div class="grade_list_form">试题来源:<a>' + source + '</a></div></div></li>');
                 }
                 $(".grate_topic_ever_box").append('<div style="margin-top: 10px;color: #ccc;clear: both;"><i class="iconfont" style="font-size: 14px;color: #31bc91;margin-right: 5px;">&#xe646;</i>小提示：点击题号可以定位到相应题目</div>');

             },
             complete: function() {

                 $(".load-bg").hide();

             },
             error: function() {
                 $(".load-bg").hide();
             },
         });
     }

     $(".grade_make_wrong").click(function(event) {
         var sub_id = $(".grade_sub").attr("data-id");

         var grade_id = $(".grade_exam").attr("grade_id");
         var school_id = $(".grade_exam").attr("school_id");
         var a_long = $(".grate_topic_ever_box a").length;
         console.log(a_long);
         console.log($(".grate_topic_ever_box a").eq(0).html());
         // var li_long=$(".grade_list_main");

         var grade_wrongs = [];
         for (var i = 0; i < a_long; i++) {
             var grade_wrong = {};
             grade_wrong["subject_id"] = sub_id;
             grade_wrong["grade_id"] = grade_id;
             grade_wrong["school_id"] = school_id;
             grade_wrong["scoring_rate"] = $(".grate_topic_ever_box a").eq(i).attr("scoring_rate");
             grade_wrong["average_score"] = $(".grate_topic_ever_box a").eq(i).attr("average_score");
             grade_wrong["exam_subject_id"] = $(".grate_topic_ever_box a").eq(i).attr("exam_subject_id");
             grade_wrong["total_score"] = $(".grate_topic_ever_box a").eq(i).attr("total_score");
             grade_wrong["item"] = $(".grate_topic_ever_box a").eq(i).attr("item");
             grade_wrong["question_bank_id"] = $(".grate_topic_ever_box a").eq(i).attr("bank_id");
             grade_wrong["classroom_id"] = $(".grate_topic_ever_box a").eq(i).attr("classroom_id");
             grade_wrong["difficulty"] = $(".grate_topic_ever_box a").eq(i).attr("difficulty_id");

             grade_wrongs[i] = grade_wrong;
         }
         var exam_subject_id = $(".grate_topic_ever_box a").eq(0).attr("exam_subject_id");
         console.log($(".grade_exam").children('option:selected').text());
         console.log($(".grade_sub").children('option:selected').text());
         console.log($(".grade_rate").children('option:selected').text());
         var title = $(".grade_exam").children('option:selected').text() + '-' + $(".grade_sub").children('option:selected').text() + '-' + $(".grade_rate").children('option:selected').text();
         console.log(grade_wrongs);
         console.log(title);
         $.ajax({
             type: "POST",
             url: ajaxIp + "/api/v2/wrong_questions",
             async: false,
             data: {
                 "wrong_questions": JSON.stringify(grade_wrongs),
                 "type": "grade",
                 "title": title,
                 "exam_subject_id": exam_subject_id,

             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 console.log(data);
                 layer.msg('生成成功', { time: 700 });
             },
             error: function(data) {

             },
         })


     });

     //班级错题集
     $(".wrong_left_ul li").eq(1).click(function(event) {
         $.ajax({
             type: "GET",
             url: ajaxIp + "/api/v2/reports/exams",
             async: false,
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 console.log("1122");
                 console.log(data);
                 // 班级考试
                 $(".class_exam").html(" ");
                 $(".class_class").html(" ");
                 $(".class_sub").html(" ");
                 $(".class_exam").attr("data-id", data[0].id);
                 $(".class_class").attr("data-id", data[0].classrooms[0].classroom_id);
                 $(".class_sub").attr("data-id", data[0].subjects[0].subject_id);
                 for (var i = 0; i < data.length; i++) {
                     $(".class_exam").append('<option data-id="' + data[i].id + '">' + data[i].name + '</option>');

                 }
                 for (var a = 0; a < data[0].classrooms.length; a++) {
                     $(".class_class").append('<option data-id="' + data[0].classrooms[a].classroom_id + '">' + data[0].classrooms[a].classroom_name + '</option>');
                 }
                 for (var b = 0; b < data[0].subjects.length; b++) {
                     $(".class_sub").append('<option data-id="' + data[0].subjects[b].subject_id + '">' + data[0].subjects[b].name + '</option>');
                 }


                 $(".class_exam").change(function(event) {
                     $(".class_class").html(" ");
                     $(".class_sub").html(" ");

                     var index = $(this).children('option:selected').index();
                     $(".class_class").attr("data-id", data[index].classrooms[0].classroom_id);
                     $(".class_sub").attr("data-id", data[index].subjects[0].subject_id);
                     for (var a = 0; a < data[index].classrooms.length; a++) {
                         $(".class_class").append('<option data-id="' + data[index].classrooms[a].classroom_id + '">' + data[index].classrooms[a].classroom_name + '</option>');
                     }
                     for (var b = 0; b < data[index].subjects.length; b++) {
                         $(".class_sub").append('<option data-id="' + data[index].subjects[b].subject_id + '">' + data[index].subjects[b].name + '</option>');
                     }
                 });

             },
             error: function() {

             },
         })


     });


     $(".class_sur").click(function(event) {
         class_list();
     })

     function class_list() {

         var word = $(".class_exam").attr("data-id");

         //类型
         var data_num = [];
         if ($(".class_sur").parent().prev().find('a').eq(0).attr("data-id") == 1) {
             data_num[0] = 0;
             data_num[1] = 5;
         }
         if ($(".class_sur").parent().prev().find('a').eq(1).attr("data-id") == 1) {

             if (data_num.length == 0) {
                 data_num[0] = 1;
             } else {
                 data_num[data_num.length] = 1;
             }

         }
         if ($(".class_sur").parent().prev().find('a').eq(2).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 2;
             } else {
                 data_num[data_num.length] = 2;
             }
         }
         if ($(".class_sur").parent().prev().find('a').eq(3).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 3;
             } else {
                 data_num[data_num.length] = 3;
             }
         }
         if ($(".class_sur").parent().prev().find('a').eq(4).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 4;
             } else {
                 data_num[data_num.length] = 4;
             }
         }
         console.log(data_num);
         var rate = $(".class_select_rate").attr("data-id");
         var class_id = $(".class_class").attr("data-id");
         var sub_id = $(".class_sub").attr("data-id");

         console.log(sub_id);
         var sort = $(".class_sort").attr("data-id");
         $.ajax({
             type: "POST",
             url: ajaxIp + "/api/v2/wrong_questions/class_index",
             async: false,
             data: {
                 "exam_id": word,
                 "subject_id": sub_id,
                 "classroom_id": class_id,
                 "rate": rate,
                 "item": data_num,
                 "sort": sort,

             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             beforeSend: function() {
                 $(".load-bg").show();
             },
             success: function(data) {
                 console.log(data);
                 $(".class_list_ul").html(" ");
                 $(".class_topic_ever_box").html(" ");

                 for (var i = 0; i < data.length; i++) {

                     var scoring_rate = Math.floor(data[i].scoring_rate * 100) + "%";

                     //知识点 
                     var tags = data[i].tags;
                     //考试来源
                     var source = data[i].source;
                     //序号
                     var num = data[i].num;

                     //小题上标(得分率)
                     var a_rate = Number(data[i].scoring_rate);
                     if (a_rate >= 0.86) {
                         $(".class_topic_ever_box").append('<a class="class_topic_ever" id="wrong_class_li' + data[i].question_bank_id + '"  style="background:#31bc91;" href="#a_wrong_class_li' + data[i].question_bank_id + '">' + num + '</a>');

                         var num_color = "#31bc91";
                     } else if (a_rate >= 0.8 && a_rate < 0.95) {
                         $(".class_topic_ever_box").append('<a class="class_topic_ever" id="wrong_class_li' + data[i].question_bank_id + '"  style="background:#f7c07c;" href="#a_wrong_class_li' + data[i].question_bank_id + '">' + num + '</a>');

                         var num_color = "#f7c07c";
                     } else if (a_rate >= 0.6 && a_rate < 0.8) {
                         $(".class_topic_ever_box").append('<a class="class_topic_ever" id="wrong_class_li' + data[i].question_bank_id + '"  style="background:#5fa3ed;" href="#a_wrong_class_li' + data[i].question_bank_id + '">' + num + '</a>');
                         var num_color = "#5fa3ed";
                     } else if (a_rate >= 0 && a_rate < 0.6) {
                         $(".class_topic_ever_box").append('<a class="class_topic_ever" id="wrong_class_li' + data[i].question_bank_id + '"  style="background:#fb7d8a;" href="#a_wrong_class_li' + data[i].question_bank_id + '">' + num + '</a>');
                         var num_color = "#fb7d8a";
                     }
                     //难度系数
                     var difficulty_level = Number(data[i].difficulty_level);
                     console.log(difficulty_level);
                     if (difficulty_level == 0) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
                     } else if (difficulty_level >= 0.86) {

                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level >= 0.71 && difficulty_level < 0.86) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level >= 0.61 && difficulty_level < 0.71) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level >= 0.41 && difficulty_level < 0.61) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level > 0 && difficulty_level < 0.41) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i>';

                     }
                     if (data[i].score_rate_difference == undefined) {
                         data[i].score_rate_difference = 0;
                     }
                     $(".class_list_ul").append(' <li id="a_wrong_class_li' + data[i].question_bank_id + '" class="wrong_class_li' + data[i].question_bank_id + '" bank_id="' + data[i].question_bank_id + '" total_score="' + data[i].total_score + '"  average_score="' + data[i].average_score + '" scoring_rate="' + data[i].scoring_rate + '"  item="' + data[i].item + '" exam_subject_id="' + data[i].exam_subject_id + '" difficulty_id="' + data[i].difficulty + '"><div class="class_list_main"><div class="class_list_body">' + data[i].content + '</div><p class="class_list_lable"><a>班级得分率:<i>' + scoring_rate + '</i></a><a>班-级得分率差:<i>' + Math.round(parseFloat(data[i].score_rate_difference) * 100) / 100 + '</i></a><a>班级平均分:<i>' + data[i].average_score + '分</i></a><a>知识点:<i>' + tags + '</i></a><a class="class_list_dif">难度系数:' + difficulty_body + '（实测难度：' + data[i].difficulty + '）</a></p><div class="class_list_move"><a class="class_list_body_ans"   data-id="' + i + '"  data-id01="' + i + '"><i class="iconfont" style="margin-right:10px;"></i>查看答案和解析</a><a  class="class_list_move_a">移除</a></div><div class="class_list_number"><p><i class="iconfont" style="font-size:45px;color:' + num_color + ';"></i><a>' + num + '</a></p></div><div class="class_list_form">试题来源:<a>' + source + '</a></div></div></li>');
                 }

                 // }
                 $(".class_topic_ever_box").append('<div style="margin-top: 10px;color: #ccc;clear: both;"><i class="iconfont" style="font-size: 14px;color: #31bc91;margin-right: 5px;">&#xe646;</i>小提示：点击题号可以定位到相应题目</div>');


             },
             complete: function() {
                 $(".load-bg").hide();
             },
             error: function() {
                 // $(".load-bg").hide();
             },
         });

     }

     function class_list_ans(num, num01) {
         var word = $(".class_exam").attr("data-id");

         //类型
         var data_num = [];
         if ($(".class_sur").parent().prev().find('a').eq(0).attr("data-id") == 1) {
             data_num[0] = 0;
             data_num[1] = 5;
         }
         if ($(".class_sur").parent().prev().find('a').eq(1).attr("data-id") == 1) {

             if (data_num.length == 0) {
                 data_num[0] = 1;
             } else {
                 data_num[data_num.length] = 1;
             }

         }
         if ($(".class_sur").parent().prev().find('a').eq(2).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 2;
             } else {
                 data_num[data_num.length] = 2;
             }
         }
         if ($(".class_sur").parent().prev().find('a').eq(3).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 3;
             } else {
                 data_num[data_num.length] = 3;
             }
         }
         if ($(".class_sur").parent().prev().find('a').eq(4).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 4;
             } else {
                 data_num[data_num.length] = 4;
             }
         }
         console.log(data_num);
         var rate = $(".class_select_rate").attr("data-id");
         var class_id = $(".class_class").attr("data-id");
         var sub_id = $(".class_sub").attr("data-id");

         console.log(sub_id);
         var sort = $(".class_sort").attr("data-id");
         $.ajax({
             type: "POST",
             url: ajaxIp + "/api/v2/wrong_questions/class_index",
             async: false,
             data: {
                 "exam_id": word,
                 "subject_id": sub_id,
                 "classroom_id": class_id,
                 "rate": rate,
                 "item": data_num,
                 "sort": sort,

             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             beforeSend: function() {
                 $(".load-bg").show();
             },
             success: function(data) {
                 console.log(data);
                 $(".class_ans01").html(data[num].answer);
                 $(".class_ans02").html(data[num].analysis);


             },
             complete: function() {
                 $(".load-bg").hide();
             },
             error: function() {
                 // $(".load-bg").hide();
             },
         });

     }


     //     班级删除
     $(".class_list_ul").on('click', '.class_list_move_a', function(event) {
         $(this).parents("li").remove();
         $('#' + $(this).parents("li").attr("class") + '').remove();
     });
     //班级生成错题本
     $(".class_make_wrong").click(function(event) {
         var li_long = $(".class_list_ul li").length;
         var school_id = $(".class_sur").attr("school_id");
         var grade_id = $(".class_select_grate").attr("data-id");
         var classroom_id = $(".class_select_class").attr("data-id");
         var subject_id = $(".class_select_sub").attr("data-id");
         var class_wrongs = [];
         for (var li = 0; li < li_long; li++) {
             var class_wrong = {};
             class_wrong["school_id"] = school_id;
             class_wrong["grade_id"] = grade_id;
             class_wrong["classroom_id"] = classroom_id;
             class_wrong["subject_id"] = subject_id;
             class_wrong["question_bank_id"] = $(".class_list_ul li").eq(li).attr("bank_id");
             class_wrong["item"] = $(".class_list_ul li").eq(li).attr("item");
             class_wrong["exam_subject_id"] = $(".class_list_ul li").eq(li).attr("exam_subject_id");
             class_wrong["average_score"] = $(".class_list_ul li").eq(li).attr("average_score");
             class_wrong["total_score"] = $(".class_list_ul li").eq(li).attr("total_score");
             class_wrong["scoring_rate"] = $(".class_list_ul li").eq(li).attr("scoring_rate");
             class_wrong["difficulty"] = $(".class_list_ul li").eq(li).attr("difficulty_id");
             class_wrongs[li] = class_wrong;

         }
         var exam_subject_id = $(".class_list_ul li").eq(0).attr("exam_subject_id");
         var title01 = $(".class_exam").children('option:selected').text();
         var title02 = $(".class_class").children('option:selected').text();
         var title03 = $(".class_sub").children('option:selected').text();
         var title04 = $(".class_select_rate").children('option:selected').text();
         var title = title01 + "-" + title02 + "-" + title03 + "-" + title04;
         console.log(title);
         console.log(class_wrongs);
         $.ajax({
             type: "POST",
             url: ajaxIp + "/api/v2/wrong_questions",
             async: false,
             data: {
                 "wrong_questions": JSON.stringify(class_wrongs),
                 "type": "class",
                 "title": title,
                 "exam_subject_id": exam_subject_id,
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 console.log(data);
                 layer.msg('生成成功', { time: 700 });
             },
             error: function(data) {

             },
         })


     });
     //班级select
     $(".class_select_top select").change(function(event) {
         $(this).attr("data-id", $(this).children('option:selected').attr("data-id"));
         $(".class_ans").hide();

     });
     $(".class_select_rate").change(function(event) {
         $(this).attr("data-id", $(this).children('option:selected').val());
     });



     //grade查看详情
     $(".grade_list_ul").on('click', '.grade_list_body_ans', function(event) {
         $(".grade_ans01").html(" ");
         $(".grade_ans02").html(" ");
         $(".layer").css("height", $(document).height());
         $(".layer").show();

         var num = parseInt($(this).attr("data-id"));
         grade_list_ans(num);

         $(".grade_ans_tc").show();

     });

     function grade_list_ans(num) {
         var rate = $(".grade_rate").attr("rate-id");

         var data_num = [];
         if ($(".grade_sur").parent().prev().find('a').eq(0).attr("data-id") == 1) {
             data_num[0] = 0;
             data_num[1] = 5;
         }
         if ($(".grade_sur").parent().prev().find('a').eq(1).attr("data-id") == 1) {

             if (data_num.length == 0) {
                 data_num[0] = 1;
             } else {
                 data_num[data_num.length] = 1;
             }

         }
         if ($(".grade_sur").parent().prev().find('a').eq(2).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 2;
             } else {
                 data_num[data_num.length] = 2;
             }
         }
         if ($(".grade_sur").parent().prev().find('a').eq(3).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 3;
             } else {
                 data_num[data_num.length] = 3;
             }
         }
         if ($(".grade_sur").parent().prev().find('a').eq(4).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 4;
             } else {
                 data_num[data_num.length] = 4;
             }
         }
         console.log(data_num);
         var sort = $(".grade_sort").attr("data-id");
         var grade_exam = parseInt($(".grade_exam").attr("data-id"));
         var grade_sub = parseInt($(".grade_sub").attr("data-id"));
         console.log(grade_exam);
         console.log(grade_sub);
         $.ajax({
             type: "POST",
             url: ajaxIp + "/api/v2/wrong_questions/grade_index",
             // async: false,
             data: {
                 "exam_id": grade_exam,
                 "subject_id": grade_sub,
                 "item": data_num,
                 "rate": rate,
                 "sort": sort,
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             beforeSend: function() {
                 $(".load-bg").show();
             },
             success: function(data) {
                 console.log(data);
                 $(".grade_ans01").html(data[num].answer);
                 $(".grade_ans02").html(data[num].analysis);

             },
             complete: function() {

                 $(".load-bg").hide();
             },
             error: function() {
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
         $(".layer").css("height", $(document).height());
         $(".layer").show();
         // $(".class_ans01").html($(this).attr("data-ans"));
         // $(".class_ans02").html($(this).attr("data-anal"));
         var num = parseInt($(this).attr("data-id"));
         var num01 = parseInt($(this).attr("data-id01"));
         class_list_ans(num, num01);
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
         var a = $(this).attr("data-id");
         if (a == 0) {
             $(".class_topic_ever_ul").slideDown('1000');
             $(".class_topic_ever_top i").html("&#xe606;")
             $(this).attr("data-id", "1");
         } else {
             $(".class_topic_ever_ul").slideUp('1000');
             $(".class_topic_ever_top i").html("&#xe605;")
             $(this).attr("data-id", "0");
         }

     });

     //学生错题
     //获得考试科目
     $(".wrong_per_li").click(function(event) {
         $.ajax({
             type: "GET",
             url: ajaxIp + "/api/v2/reports/exams",
             async: false,
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 $(".per_time").html(" ");
                 $(".per_sub").html(" ");
                 for (var i = 0; i < data.length; i++) {
                     $(".per_time").append('<option value="' + data[i].name + '"  data-id="' + data[i].id + '">' + data[i].name + '</option>');



                 }
                 for (var i = 0; i < data[0].subjects.length; i++) {
                     $(".per_sub").append('<option value="' + data[0].subjects[i].name + '" data-id="' + data[0].subjects[i].subject_id + '">' + data[0].subjects[i].name + '</option>');
                 }


             },
             error: function() {

             },
         })
     });

     $(".per_time").change(function(event) {
         $.ajax({
             type: "GET",
             url: ajaxIp + "/api/v2/reports/exams",
             async: false,
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 $(".per_sub").html(" ");
                 var a = parseInt($(".per_time").children('option:selected').index());
                 for (var i = 0; i < data[a].subjects.length; i++) {

                     $(".per_sub").append('<option value="' + data[a].subjects[i].name + '" data-id="' + data[a].subjects[i].subject_id + '">' + data[a].subjects[i].name + '</option>');
                 }
             },
             error: function() {

             },
         })

     });
     //per个人list
     function per_list() {

         var word = $(".per_time").attr("data-id");
         //类型
         var data_num = [];
         if ($(".per_sur").parent().prev().find('a').eq(0).attr("data-id") == 1) {
             data_num[0] = 0;
             data_num[1] = 5;
         }
         if ($(".per_sur").parent().prev().find('a').eq(1).attr("data-id") == 1) {

             if (data_num.length == 0) {
                 data_num[0] = 1;
             } else {
                 data_num[data_num.length] = 1;
             }

         }
         if ($(".per_sur").parent().prev().find('a').eq(2).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 2;
             } else {
                 data_num[data_num.length] = 2;
             }
         }
         if ($(".per_sur").parent().prev().find('a').eq(3).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 3;
             } else {
                 data_num[data_num.length] = 3;
             }
         }
         if ($(".per_sur").parent().prev().find('a').eq(4).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 4;
             } else {
                 data_num[data_num.length] = 4;
             }
         }
         console.log(data_num);
         var exam_id = $(".per_time").children('option:selected').attr("data-id");
         var sub_id = $(".per_sub").children('option:selected').attr("data-id");
         var rate = $(".per_rate").children('option:selected').val();
         var student_id = parseInt($(".students_key_box_p02_choose").attr("data-id"));
         var sort = $(".per_sort").children('option:selected').val()
         console.log($(".per_sort").children('option:selected').val());
         console.log(sub_id);
         $.ajax({
             type: "POST",
             url: ajaxIp + "/api/v2/wrong_questions/student_index",
             async: false,
             data: {
                 "exam_id": exam_id,
                 "subject_id": sub_id,
                 "item": data_num,
                 "rate": rate,
                 "student_info_id": student_id,
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 if (data.length !== 0) {
                     time();
                 } else {
                     mark_time();
                 }
                 console.log(data.length);
             },
             error: function() {
                 // $(".load-bg").hide();
             },
         });

         function mark_time() {
             $.ajax({
                 type: "POST",
                 url: ajaxIp + '/api/v2/wrong_questions/generate_student_wrong_questions',
                 async: false,
                 data: {
                     "exam_id": exam_id,
                     "subject_id": sub_id,
                     "student_info_id": student_id,
                 },
                 headers: {
                     'Authorization': "Bearer " + isLogin
                 },
                 beforeSend: function() {
                     $(".load-bg").show();
                     $(".layer").show();
                 },
                 success: function(data) {
                     setTimeout(time, 5000);
                 },
                 error: function() {},
             });
         }
         // 个人学生错题列表
         function time() {
             var classroom_id = $(".per_wrong_make").attr("classroom_id");
             $.ajax({
                 type: "POST",
                 url: ajaxIp + "/api/v2/wrong_questions/student_index",
                 async: false,
                 data: {
                     "exam_id": exam_id,
                     "subject_id": sub_id,
                     "item": data_num,
                     "rate": rate,
                     "student_info_id": student_id,
                     "classroom_id": classroom_id,
                     "sort": sort,
                 },
                 headers: {
                     'Authorization': "Bearer " + isLogin
                 },
                 beforeSend: function() {
                     $(".load-bg").show();
                 },
                 success: function(data) {
                     console.log(data);
                     $(".per_list_ul").html(" ");
                     $(".per_topic_ever_box").html(" ");

                     for (var i = 0; i < data.length; i++) {

                         var scoring_rate = Math.floor(data[i].scoring_rate * 100) + "%";

                         //知识点 
                         var tags = data[i].tags;
                         //考试来源
                         var source = data[i].source;
                         //序号
                         var num = data[i].num;

                         //小题上标(得分率)
                         var a_rate = Number(data[i].scoring_rate);
                         if (a_rate >= 0.86) {
                             $(".per_topic_ever_box").append('<a class="class_topic_ever" id="wrong_class_li' + data[i].question_bank_id + '"  style="background:#31bc91;" href="#a_wrong_per_li' + data[i].question_bank_id + '">' + num + '</a>');

                             var num_color = "#31bc91";
                         } else if (a_rate >= 0.8 && a_rate < 0.95) {
                             $(".per_topic_ever_box").append('<a class="class_topic_ever" id="wrong_class_li' + data[i].question_bank_id + '"  style="background:#f7c07c;" href="#a_wrong_per_li' + data[i].question_bank_id + '">' + num + '</a>');

                             var num_color = "#f7c07c";
                         } else if (a_rate >= 0.6 && a_rate < 0.8) {
                             $(".per_topic_ever_box").append('<a class="class_topic_ever" id="wrong_class_li' + data[i].question_bank_id + '"  style="background:#5fa3ed;" href="#a_wrong_per_li' + data[i].question_bank_id + '">' + num + '</a>');
                             var num_color = "#5fa3ed";
                         } else if (a_rate >= 0 && a_rate < 0.6) {
                             $(".per_topic_ever_box").append('<a class="class_topic_ever" id="wrong_class_li' + data[i].question_bank_id + '"  style="background:#fb7d8a;" href="#a_wrong_per_li' + data[i].question_bank_id + '">' + num + '</a>');
                             var num_color = "#fb7d8a";
                         }
                         //难度系数
                         var difficulty_level = Number(data[i].difficulty_level);
                         console.log(difficulty_level);
                         if (difficulty_level == 0) {
                             var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
                         } else if (difficulty_level >= 0.86) {

                             var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                         } else if (difficulty_level >= 0.71 && difficulty_level < 0.86) {
                             var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                         } else if (difficulty_level >= 0.61 && difficulty_level < 0.71) {
                             var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                         } else if (difficulty_level >= 0.41 && difficulty_level < 0.61) {
                             var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                         } else if (difficulty_level > 0 && difficulty_level < 0.41) {
                             var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i>';

                         }

                         if (data[i].score_rate_difference == undefined) {
                             data[i].score_rate_difference = 0;
                         }
                         var wrong_answer="";
                         var wrong_image="";
                          if(data[i].wrong_image.length ==0){
                           wrong_answer=data[i].wrong_answer
                           answer_main=data[i].wrong_answer
                           console.log(answer_main);
                          }else{
                            wrong_answer="";
                            answer_main="";
                            for(var w=0;w<data[i].wrong_image.length;w++){
                            wrong_image=wrong_image+","+data[i].wrong_image[w]
                            answer_main=answer_main+'<p><img src="'+ data[i].wrong_image[w] +'" alt=""></p>'
                          }
                          }
                         
                         $(".per_list_ul").append('<li  id="a_wrong_per_li' + data[i].question_bank_id + '" bank_id="' + data[i].question_bank_id + '" item="' + data[i].item + '" exam_subject_id="' + data[i].exam_subject_id + '" scoring_rate="' + data[i].scoring_rate + '" difficulty="' + data[i].difficulty + '" scoring_rate_difference="' + data[i].scoring_rate_difference + '"   average_score="' + data[i].average_score + '" total_score="' + data[i].total_score + '" wrong_answer="' + data[i].answer + '" wrong_image="' +wrong_image+ '"  ct_z="' + data[i].ct_z + '"  ct_fz="' + data[i].ct_fz + '"><div class="per_list_main" style=""><div class="per_list_body">' + data[i].content + '</div><p class="per_list_lable"><a>个人得分率:<i>' + data[i].scoring_rate + '</i></a><a>个—班级得分率差:<i>' + data[i].scoring_rate_difference + '</i></a><a>知识点:<i>' + data[i].tags + '</i></a><a class="per_list_dif">难度系数:' + difficulty_body + '(实测难度:' + data[i].difficulty + ')</a></p><div class="per_list_move"><a class="per_list_body_ans" data-id="'+i+'"><i class="iconfont" style="margin-right:5px;"></i>查看答案和解析</a><a class="per_list_move_a">移除</a></div><div class="per_list_number"><p><i class="iconfont" style="font-size:45px;color:' + num_color + ';"></i><a>' + num + '</a></p></div><div class="per_list_form">试题来源:<a>' + data[i].source + '</a></div><div class="per_list_ans"><p class="per_list_ans_top">你的错误解答:</p>'+answer_main+'</div><p class="per_list_ans_be_top">错因CT:</p><div class="per_list_ans_be"><p class="per_list_ans_be01">智力因素 Z :</p> <p class="per_list_ans_be02">非智力因素 FZ :</p></div><p class="per_list_ans_train_top">错题重练:</p><div class="per_list_ans_train"><p>请在此区域内纠正错题，并归纳解题心得。</p></div><p class="per_list_ans_train_top01">变式训练:</p><div class="per_list_ans_train_01"></div></div></li>');
                         for (var cf = 0; cf < data[i].ct_fz.length; cf++) {
                             $(".per_list_ul li").eq(i).find('.per_list_ans_be02').append('<a>' + data[i].ct_fz[cf] + '</a>');

                         }
                         for (var ct = 0; ct < data[i].ct_z.length; ct++) {
                             $(".per_list_ul li").eq(i).find('.per_list_ans_be01').append('<a>' + data[i].ct_z[ct] + '</a>');

                         }
                     }

                     // }
                     $(".per_topic_ever_box").append('<div style="margin-top: 10px;color: #ccc;clear: both;"><i class="iconfont" style="font-size: 14px;color: #31bc91;margin-right: 5px;">&#xe646;</i>小提示：点击题号可以定位到相应题目</div>');


                 },
                 complete: function() {
                     $(".load-bg").hide();
                     $(".layer").hide();
                 },
                 error: function() {
                     // $(".load-bg").hide();
                 },
             });
         }


     }
     $(".per_sort").change(function(event) {
         per_list();
     });
    $(".per_list_ul").on('click', '.per_list_body_ans', function(event) {     
      $(".layer").css("height", $(document).height());
      $(".layer").show();
      $(".per_ans_tc").show();
     var a=$(this). attr("data-id");
     per_list_ans(a)
    });
    $(".per_ans_tc button").click(function(event) {
        $(".layer").hide();
        $(".per_ans_tc").hide();
    });
     function per_list_ans(a) {
          $(".per_ans01").html(" ");
          $(".per_ans02").html(" ");
         var word = $(".per_time").attr("data-id");
         //类型
         var data_num = [];
         if ($(".per_sur").parent().prev().find('a').eq(0).attr("data-id") == 1) {
             data_num[0] = 0;
             data_num[1] = 5;
         }
         if ($(".per_sur").parent().prev().find('a').eq(1).attr("data-id") == 1) {

             if (data_num.length == 0) {
                 data_num[0] = 1;
             } else {
                 data_num[data_num.length] = 1;
             }

         }
         if ($(".per_sur").parent().prev().find('a').eq(2).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 2;
             } else {
                 data_num[data_num.length] = 2;
             }
         }
         if ($(".per_sur").parent().prev().find('a').eq(3).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 3;
             } else {
                 data_num[data_num.length] = 3;
             }
         }
         if ($(".per_sur").parent().prev().find('a').eq(4).attr("data-id") == 1) {
             if (data_num.length == 0) {
                 data_num[0] = 4;
             } else {
                 data_num[data_num.length] = 4;
             }
         }
         console.log(data_num);
         var exam_id = $(".per_time").children('option:selected').attr("data-id");
         var sub_id = $(".per_sub").children('option:selected').attr("data-id");
         var rate = $(".per_sort").children('option:selected').val();
         var student_id = parseInt($(".students_key_box_p02_choose").attr("data-id"));
         console.log($(".per_sort").children('option:selected').val());
         console.log(sub_id);
         $.ajax({
             type: "POST",
             url: ajaxIp + "/api/v2/wrong_questions/student_index",
             async: false,
             data: {
                 "exam_id": exam_id,
                 "subject_id": sub_id,
                 "item": data_num,
                 "rate": rate,
                 "student_info_id": student_id,
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 $(".per_ans01").html(data[a].answer);
                 $(".per_ans02").html(data[a].analysis);
             },
             error: function() {
                 // $(".load-bg").hide();
             },
         });
     }
     // 个人select
     $(".per_wrong_select select").change(function(event) {
         $(".per_ans").hide();
         $(".per_list_ul").html(" ");
     });



     $(".stu_wrong_tc_sub").change(function(event) {
         per_g_class()
     });

     function per_g_class() {
         var id = parseInt($(".stu_wrong_tc_sub").children('option:selected').attr("data-id"));
         $.ajax({
             type: "GET",
             url: ajaxIp + '/api/v2/commons/' + id + '/grade_classrooms',
             async: false,
             data: {

             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 $(".stu_wrong_tc_class").html(" ");
                 for (var i = 0; i < data.length; i++) {
                     $(".stu_wrong_tc_class").append('<option data-id=' + data[i].id + '>' + data[i].name + '</option>');
                 }
             },
             error: function() {},
         });
     }
     //获得学生
     function students() {

         var id = parseInt($(".stu_wrong_tc_sub").children('option:selected').attr("data-id"));
         var class_id = parseInt($(".stu_wrong_tc_class").children('option:selected').attr("data-id"));
         $.ajax({
             type: "GET",
             url: ajaxIp + '/api/v2/students',
             async: false,
             data: {
                 "grade_id": id,
                 "classroom_id": class_id
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 console.log(data.students);
                 $(".stu_wrong_tc_ul").html(" ");
                 $(".search_ul").html(" ");
                 for (var i = 0; i < data.students.length; i++) {
                     $(".stu_wrong_tc_ul").append('<li class="stu_' + data.students[i].id + '" data-id="0"><a data-id="' + data.students[i].id + '">' + data.students[i].real_name + '</a><i class="iconfont">&#xe64b;</i></li>');
                     $(".search_ul").append('<li search_id="' + i + '">' + data.students[i].real_name + '</li>')
                 }
                 stu_gain_list()
             },
             error: function() {},
         })
     }
     $(".stu_wrong_tc_select select").change(function(event) {
         students();
     });
     $(".per_sur").click(function(event) {
         $(".per_ans").slideDown('1000');
         per_list();
     });
     //移除
     $(".per_list_ul").on('click', '.per_list_move_a', function(event) {
        var index =$(this).parent().parent().index();
         $(this).parent().parent().remove();
         console.log(index)
         $(".per_topic_ever_box a").eq(index).remove();
         
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
     $(".per_topic_ever_top").click(function(event) {
         var a = $(this).attr("data-id");
         if (a == 0) {
             $(".per_topic_ever_ul").slideDown('1000');
             $(".per_topic_ever_top i").html("&#xe606;")
             $(this).attr("data-id", "1");
         } else {
             $(".per_topic_ever_ul").slideUp('1000');
             $(".per_topic_ever_top i").html("&#xe605;")
             $(this).attr("data-id", "0");
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
     $(".students_key_box_p02").on('click', 'a', function(event) {
         // $(".per_ans").hide();
         $(this).addClass('students_key_box_p02_choose').siblings().removeClass();
         $(this).css("color", "#ffffff").siblings().css("color", "#333333");
         $(this).css("background", "#31bc91").siblings().css("background", "#f5f5f5");
          per_list();
     });
     $(".stu_wrong_tc_ul").on('click', 'li', function(event) {
         var a = $(this).attr("data-id");
         if (a == 0) {
             $(this).children('i').addClass('stu_wrong_tc_i');
             $(this).attr("data-id", "1");
             $(".choice_stus").append('<a id="' + $(this).attr("class") + '"  data-id="' + $(this).children('a').attr("data-id") + '"style="background: #31bc91;color: #f5f5f5;margin: 10px;display:inline-block;line-height: 30px;padding: 0px 7px;float:left;"><i style="font-style: normal;">' + $(this).children('a').html() + '</i><i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe61b;</i></a>');
         } else {
             $(this).children('i').removeClass('stu_wrong_tc_i');
             $(this).attr("data-id", "0");
             $('#' + $(this).attr("class") + '').remove();
         }
         $(".choice_all").removeClass('stu_wrong_tc_i');
     });
     $(".choice_stus").on('click', 'a', function(event) {
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
             for (var i = 0; i < $(".stu_wrong_tc_ul li").length; i++) {
                 $(".choice_stus").append('<a id="' + $(".stu_wrong_tc_ul li").eq(i).attr("class") + '"  data-id="' + $(".stu_wrong_tc_ul li").eq(i).find('a').attr("data-id") + '"  style="background: #31bc91;color: #f5f5f5;margin: 10px;display:inline-block;line-height: 30px;padding: 0px 7px;float:left;"><i style="font-style: normal;">' + $(".stu_wrong_tc_ul li").eq(i).children('a').html() + '</i><i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe61b;</i></a>');
             }
         } else {
             $(this).removeClass('stu_wrong_tc_i');
             $(this).attr("data-id", "0");
             $(".stu_wrong_tc_ul li").attr("data-id", "0");
             $(".stu_wrong_tc_ul li").children('i').removeClass('stu_wrong_tc_i');
             $(".choice_stus a").remove();
         }
     });
     $(".stu_wrong_tc_button_back").click(function(event) {
         $(".stu_wrong_tc").hide();
         $(".layer").hide();
     });
     $(".wrong_back_x").click(function(event) {
         $(".stu_wrong_tc").hide();
         $(".layer").hide();
     });
     $(".stu_choice_btn").click(function(event) {
         $(".stu_wrong_tc").show();
         $(".layer").css("height", $(document).height());
         $(".layer").show();
         //获得年级
         $.ajax({
             type: "GET",
             url: ajaxIp + "/api/v2/commons/school_grades",
             async: false,
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 // console.log("zhao");
                 console.log(data);
                 $(".stu_wrong_tc_sub").html(" ");
                 for (var i = 0; i < data.length; i++) {
                     $(".stu_wrong_tc_sub").append('<option data-id=' + data[i].id + '>' + data[i].name + '</option>');
                 }
                 per_g_class();
                 students();
             },
             error: function() {},
         });

     });
     //获得重点追踪学生
     function stu_gain() {
         var id = parseInt($(".stu_wrong_tc_sub").children('option:selected').attr("data-id"));
         var class_id = parseInt($(".stu_wrong_tc_class").children('option:selected').attr("data-id"));
         $.ajax({
             type: "POST",
             url: ajaxIp + '/api/v2/wrong_questions/get_wrong_students',
             async: false,
             data: {
                 "grade_id": id,
                 "classroom_id": class_id
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },

             success: function(data) {
                 $(".students_key_box_p02").html(" ");
                 console.log(data.result);
                 console.log(data.result.students);

                 for (var a in data.result.students) {
                     console.log(a);
                     $(".students_key_box_p02").append('<a style="color: rgb(51, 51, 51); background: rgb(245, 245, 245);" data-id="' + a + '">' + data.result.students[a] + '</a>')
                 }
                 $(".students_key_box_p02 a").eq(0).addClass('students_key_box_p02_choose');
                 $(".students_key_box_p02 a").eq(0).css("color", "rgb(255, 255, 255)");
                 $(".students_key_box_p02 a").eq(0).css("background", "rgb(49, 188, 145)");
                 $(".per_make_wrong").attr("school_id", data.result.school_id);
                 $(".per_make_wrong").attr("grade_id", data.result.grade_id);
                 $(".per_make_wrong").attr("classroom_id", data.result.classroom_id);
             },
             error: function() {},
         })
     }

     function stu_gain_list() {
         var id = parseInt($(".stu_wrong_tc_sub").children('option:selected').attr("data-id"));
         var class_id = parseInt($(".stu_wrong_tc_class").children('option:selected').attr("data-id"));
         $.ajax({
             type: "POST",
             url: ajaxIp + '/api/v2/wrong_questions/get_wrong_students',
             async: false,
             data: {
                 "grade_id": id,
                 "classroom_id": class_id
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },

             success: function(data) {
                 $(".choice_stus").html(" ");
                 console.log(data.result);
                 // console.log(data.result.students);
                 if (data.result !== null) {
                     for (var a in data.result.students) {
                         console.log(a);
                         $(".choice_stus").append('<a id="stu_' + a + '"  style="background: #31bc91;color: #f5f5f5;margin: 10px;display:inline-block;line-height: 30px;padding: 0px 7px;float:left;" data-id="' + a + '"><i style="font-style: normal;">' + data.result.students[a] + '</i><i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe61b;</i></a>')
                         $('.stu_' + a + '').attr("data-id", "1");
                         $('.stu_' + a + ' i').addClass('stu_wrong_tc_i');
                     }
                 }
             },
             error: function() {},
         })
     }

     ///生成学生错题本
     $(".per_make_wrong").click(function(event) {
         var li_long = $(".per_list_ul li").length;
         var school_id = $(this).attr("school_id");
         var grade_id = $(this).attr("grade_id");
         var classroom_id = $(this).attr("classroom_id");
         var subject_id = $(".per_sub").children('option:selected').attr("data-id");
         var per_wrongs = [];
         for (var li = 0; li < li_long; li++) {
             var per_wrong = {};
            var ct_z=$(".per_list_ul li").eq(li).attr("ct_z").split(",");
            var ct_fz=$(".per_list_ul li").eq(li).attr("ct_fz").split(",");
            var wrong_image=$(".per_list_ul li").eq(li).attr("wrong_image").split(",");
             per_wrong["school_id"] = school_id;
             per_wrong["grade_id"] = grade_id;
             per_wrong["classroom_id"] = classroom_id;
             per_wrong["subject_id"] = subject_id;
             per_wrong["question_bank_id"] = $(".per_list_ul li").eq(li).attr("bank_id");
             per_wrong["item"] = $(".per_list_ul li").eq(li).attr("item");
             per_wrong["exam_subject_id"] = $(".per_list_ul li").eq(li).attr("exam_subject_id");
             per_wrong["average_score"] = $(".per_list_ul li").eq(li).attr("average_score");
             per_wrong["total_score"] = $(".per_list_ul li").eq(li).attr("total_score");
             per_wrong["scoring_rate"] = $(".per_list_ul li").eq(li).attr("scoring_rate");
             per_wrong["difficulty"] = $(".per_list_ul li").eq(li).attr("difficulty");
             per_wrong["scoring_rate_difference"] = $(".per_list_ul li").eq(li).attr("scoring_rate_difference");
             per_wrong["wrong_answer"] = $(".per_list_ul li").eq(li).attr("wrong_answer");
            per_wrong["wrong_image"] =wrong_image;
            per_wrong["ct_z"] = ct_z;
            per_wrong["ct_fz"] =ct_fz;
             per_wrongs[li] = per_wrong;

         }
         var student_id = $(".students_key_box_p02_choose").attr("data-id");
         var exam_subject_id = $(".per_list_ul li").eq(0).attr("exam_subject_id");
         var title01 = $(".students_key_box_p02_choose").html();
         var title02 = $(".per_sub").children('option:selected').val();
         var title03 = $(".per_rate").children('option:selected').text();
         var title = title01 + "-"+title02+"-"+ title03;
         console.log(title);
         console.log(title02);
         console.log(per_wrongs);
         $.ajax({
             type: "POST",
             url: ajaxIp + "/api/v2/wrong_questions",
             async: false,
             data: {
                 "wrong_questions": JSON.stringify(per_wrongs),
                 "type": "student",
                 "title": title,
                 "exam_subject_id": exam_subject_id,
                 "classroom_id": classroom_id,
                 "student_info_id": student_id,
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 console.log(data);
                 layer.msg('生成成功', { time: 700 });
             },
             error: function(data) {

             },
         })

     });
     $(".search_input").keyup(function() {
         var me = $(this),
             v = me.val().replace(/^\s+\s+$/g, "");
         var trs = $(".search_ul").find("li");
         if (v == "") {
             trs.filter(":hidden").show();
             $(".search_div").hide();
         } else {
             $(".search_div").show();
             trs.hide().filter(":contains('" + me.val() + "')").show();
         }
     });
     $(".search_ul").on('click', 'li', function(event) {
         $(".search_input").val($(this).html());
         $(".search_input").attr("scroll-id", $(this).attr("search_id"));
         $(".search_div").hide();
     });
     $(".stu_wrong_tc_input i").click(function(event) {
         var a_num = $(".search_input").attr("scroll-id");
         var container = $('.stu_wrong_tc_div'),
             scrollTo = $('.' + $(".stu_wrong_tc_ul").children('li').eq(a_num).attr("class") + '');

         container.scrollTop(
             scrollTo.offset().top - container.offset().top + container.scrollTop()
         )


         container.animate({
             scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
         })
     });
     $(".stu_wrong_tc_button_sure").click(function(event) {
         var a = $(".choice_stus a").length;
         console.log(a);
         var stus = {};
         for (var i = 0; i < a; i++) {
             var b = $(".choice_stus a").eq(i).attr("data-id");
             stus[b] = $(".choice_stus a").eq(i).children('i').eq(0).html();
             // stu[1]=$(".choice_stus a").eq(i).children('i').eq(0).html();
             // stus[i]=stu;
         }
         console.log(stus);
         if (a == 0) {
             layer.msg('请选择学生', { time: 700 });
         } else {
             var id = parseInt($(".stu_wrong_tc_sub").children('option:selected').attr("data-id"));
             var class_id = parseInt($(".stu_wrong_tc_class").children('option:selected').attr("data-id"));
             $.ajax({
                 type: "POST",
                 url: ajaxIp + "/api/v2/wrong_questions/save_wrong_students",
                 async: false,
                 data: {
                     'grade_id': id,
                     'classroom_id': class_id,
                     'students': JSON.stringify(stus),
                 },
                 headers: {
                     'Authorization': "Bearer " + isLogin
                 },
                 success: function(data) {
                    console.log(data);
                 },
                 error: function() {

                 },
             })
             $(".stu_wrong_tc").hide();
             $(".layer").hide();

             $(".students_key").show();
             $(".students_key_box").show();
             $(".per_sur_a").show();
             stu_gain();
         }

     });
     $(".per_off").click(function(event) {
         $(".per_ans").hide();

     });
     //年级错题管理
     $(".grade_admin_li").click(function(event) {
         $.ajax({
             type: "GET",
             url: ajaxIp + "/api/v2/reports/exams",
             async: false,
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 $(".g_wrong_admin_exam").html(" ");
                 $(".g_wrong_admin_sub").html(" ");
                 $(".g_wrong_admin_exam").attr("data-id", data[0].id);
                 $(".g_wrong_admin_sub").attr("data-id", data[0].subjects[0].subject_id);
                 for (var i = 0; i < data.length; i++) {
                     $(".g_wrong_admin_exam").append('<option value="" g-exam-id="' + data[i].id + '">' + data[i].name + '</option>');



                 }
                 for (var i = 0; i < data[0].subjects.length; i++) {
                     $(".g_wrong_admin_sub").append('<option value="" g-exam-id="' + data[0].subjects[i].subject_id + '">' + data[0].subjects[i].name + '</option>');
                 }

                 g_wrong_list();

             },
             error: function() {

             },
         })
     });

     //年级管理考试选择
     $(".g_wrong_admin_exam").change(function(event) {
         $(this).attr("data-id", $(this).find('option:selected').attr("g-exam-id"));
         var a = $(this).find('option:selected').index();
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
                 $(".g_wrong_admin_sub").attr("data-id", data[a].subjects[0].subject_id);
                 for (var i = 0; i < data[a].subjects.length; i++) {
                     $(".g_wrong_admin_sub").append('<option value="" g-exam-id="' + data[a].subjects[i].subject_id + '">' + data[a].subjects[i].name + '</option>');
                 }


                 g_wrong_list();
             },
             error: function() {

             },
         })
     });

     $(".g_wrong_admin_sub").change(function(event) {
         $(this).attr("data-id", $(this).find('option:selected').attr("g-exam-id"));
         g_wrong_list();
     });








     $(".g_wrong_list").on('click', '.g_wrong_list_look', function(event) {
         $(".g_list_ul").html(" ");
         $(".g_topic_ever_box").html(" ");
         $(".g_font_div").hide();
         $(".g_look").show();
         console.log();
         $(".wrong_top").html('<i class="g_back_font  iconfont" style="margin-right:10px;cursor: pointer;">&#xe61c;</i>' + $(this).parents("li").find('a').eq(0).html());
        $(".g_list_top").html($(this).parents("li").find('a').eq(0).html())
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
         $(".layer").css("height", $(document).height());
         $(".layer").show();
         var a = $(".wrong_top").attr("data-id");
         var b = $(this).attr("data-id");
         $.ajax({
             type: "POST",
             url: ajaxIp + '/api/v2/wrong_books/book_questions',
             async: false,
             data: {
                 'id': a,
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 $(".g_ans01").html(data[b].answer);
                 $(".g_ans02").html(data[b].analysis);
             },
             error: function() {

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
         $(".main").css("width", "100%");
         $(".main").css("margin-top", "0px");
         $(".g_list").css("padding", "0px");
         $(".wrong_right").css("width", "100%");
         $(".wrong_right").css("padding", "0");
         $(".g_list_main").css("width", "100%");
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
         $(".main").css("width", "1200px");
         $(".wrong_right").css("width", "1000px");
         $(".g_list_main").css("width", "923px");
         $(".main").css("margin-top", "45px");
         $(".g_list").css("padding", "20px 0px 100px 0px");
         $(".wrong_right").css("padding", "43px 40px 100px 35px");
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
         $(".layer").css("height", $(document).height());
         $(".layer").show();
         // $(".g_ans01").html($(this).attr("data-ans"));
         // $(".g_ans02").html($(this).attr("data-anal"));
         var a = $(".wrong_top").attr("data-id");
         var b = $(this).attr("data-id");
         $.ajax({
             type: "POST",
             url: ajaxIp + '/api/v2/wrong_books/book_questions',
             async: false,
             data: {
                 'id': a,
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 $(".c_ans01").html(data[b].answer);
                 $(".c_ans02").html(data[b].analysis);
             },
             error: function() {

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
         $(".main").css("width", "100%");
         $(".main").css("margin-top", "0px");
         $(".c_list").css("padding", "0px");
         $(".wrong_right").css("width", "100%");
         $(".wrong_right").css("padding", "0");
         $(".c_list_main").css("width", "100%");
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
         $(".main").css("width", "1200px");
         $(".wrong_right").css("width", "1000px");
         $(".c_list_main").css("width", "923px");
         $(".main").css("margin-top", "45px");
         $(".c_list").css("padding", "20px 0px 100px 0px");
         $(".wrong_right").css("padding", "43px 40px 100px 35px");
     });
     $(".class_admin_li").click(function(event) {
         $(".c_font_div").show();
         $(".c_look").hide();
     });
     //考试错题集管理
     function g_wrong_list() {

         var exam_id = $(".g_wrong_admin_exam").attr("data-id");
         var subject_id = $(".g_wrong_admin_sub").attr("data-id");
         $.ajax({
             type: "POST",
             url: ajaxIp + '/api/v2/wrong_books/grade_books',
             async: false,
             data: {
                 'exam_id': exam_id,
                 'subject_id': subject_id,
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 $(".g_wrong_list").html(" ");
                 for (var i = 0; i < data.length; i++) {
                     $(".g_wrong_list").append('<li><a style="width: 32%;" class="g_wrong_list_name" data-id="' + data[i].id + '">' + data[i].title + '</a></a><a style="">' + data[i].count + '</a><a style="">' + data[i].author + '</a><a style="">' + data[i].created_at + '</a><a style=""><button data-id="' + data[i].id + '" class="g_wrong_list_look">查看</button><button data-id="' + data[i].id + '" class="g_wrong_list_rem" style="color: #fb7d8a;border-color: #fb7d8a;">删除</button></a></li>');
                 }



             },
             error: function() {

             },
         });




     }

     //查看
     $(".g_wrong_list").on('click', '.g_wrong_list_look', function(event) {
         var a = parseInt($(this).attr("data-id"));
         $(".wrong_top").attr("data-id", a);
         $.ajax({
             type: "POST",
             url: ajaxIp + '/api/v2/wrong_books/book_questions',
             async: false,
             data: {
                 'id': a,
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 $(".g_topic_ever_box").html(" ");
                 for (var i = 0; i < data.length; i++) {
                     var tag = "";
                     for (var i_tag = 0; i_tag < data[i].tags.length; i_tag++) {
                         tag = tag + data[i].tags[i_tag];
                     }
                     console.log(tag);
                     var s_rate = Math.round(Number(data[i].scoring_rate) * 100);
                     console.log(data[i].scoring_rate)

                     //难度系数
                     var difficulty_level = Number(data[i].difficulty_level);
                     console.log(difficulty_level);
                     if (difficulty_level == 0) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
                     } else if (difficulty_level >= 0.86) {

                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level >= 0.71 && difficulty_level < 0.86) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level >= 0.61 && difficulty_level < 0.71) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level >= 0.41 && difficulty_level < 0.61) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level > 0 && difficulty_level < 0.41) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i>';

                     }
                     //小题上标(得分率)
                     var num = data[i].question_bank_id;
                     var a_rate = Number(data[i].scoring_rate);

                     if (num < 10) {
                         var num = '0' + Number(data[i].question_bank_id);
                     }
                     if (a_rate >= 0.86) {
                         $(".g_topic_ever_box").append('<a class="grate_topic_ever" style="background:#31bc91;" href="#g_a' + data[i].question_bank_id + '">' + num + '</a>');

                     } else if (a_rate >= 0.8 && a_rate < 0.95) {
                         $(".g_topic_ever_box").append('<a class="grate_topic_ever"  style="background:#f7c07c;" href="#g_a' + data[i].question_bank_id + '">' + num + '</a>');

                     } else if (a_rate >= 0.6 && a_rate < 0.8) {
                         $(".g_topic_ever_box").append('<a class="grate_topic_ever"  style="background:#5fa3ed;" href="#g_a' + data[i].question_bank_id + '">' + num + '</a>');

                     } else if (a_rate >= 0 && a_rate < 0.6) {
                         $(".g_topic_ever_box").append('<a class="grate_topic_ever"  style="background:#fb7d8a;" href="#g_a' + data[i].question_bank_id + '">' + num + '</a>');

                     }

                     $(".g_list_ul").append('<li id="g_a' + data[i].question_bank_id + '"><div class="g_list_main"><div class="g_list_body">' + data[i].content + '</div><p class="g_list_lable"><a>年级得分率:<i style="font-style: normal;">' + s_rate + '%</i></a><a>年级平均分:<i style="font-style: normal;">' + data[i].average_score + '分</i></a><a>知识点:<i style="font-style: normal;">' + tag + '</i></a><a class="g_list_dif">难度系数:' + difficulty_body + '（实测难度：' + data[i].difficulty + '）</a></p><div class="g_list_move"><a class="g_list_body_ans"  data-id="' + i + '"><i class="iconfont" style="margin-right:10px;"></i>查看答案和解析</a></div></div></li>');

                 }

                 $(".g_topic_ever_box").append('<div style="margin-top: 10px;color: #ccc;clear: both;"><i class="iconfont" style="font-size: 14px;color: #31bc91;margin-right: 5px;">&#xe646;</i>小提示：点击题号可以定位到相应题目</div>');

             },
             error: function() {

             },
         });

     });

     //班级错题集管理

     $(".c_wrong_admin_exam").change(function(event) {
         var a = $(this).children('option:selected').index();
         $(this).attr("data-id", $(this).children('option:selected').attr("c-data-id"));
         $.ajax({
             type: "GET",
             url: ajaxIp + "/api/v2/reports/exams",
             async: false,
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 $(".c_wrong_admin_sub").html(" ");
                 $(".c_wrong_admin_grade").html(" ");
                 $(".c_wrong_admin_class").html(" ");

                 $(".c_wrong_admin_sub").attr("data-id", data[a].subjects[0].subject_id);
                 $(".c_wrong_admin_grade").attr("data-id", data[a].grade.grade_id);
                 $(".c_wrong_admin_class").attr("data-id", data[a].classrooms[0].classroom_id);
                 //  //考试

                 //科目
                 for (var i = 0; i < data[a].subjects.length; i++) {
                     $(".c_wrong_admin_sub").append('<option value="" c-data-id="' + data[a].subjects[i].subject_id + '">' + data[a].subjects[i].name + '</option>');
                 }
                 //年级

                 $(".c_wrong_admin_grade").append('<option value="" c-data-id="' + data[a].grade.grade_id + '">' + data[a].grade.name + '</option>');
                 //班级
                 for (var i = 0; i < data[a].classrooms.length; i++) {
                     $(".c_wrong_admin_class").append('<option value="" c-data-id="' + data[a].classrooms[i].classroom_id + '">' + data[a].classrooms[i].classroom_name + '</option>');
                 }
                 c_list();
             },
             error: function() {

             },

         });


     });
     $(".c_wrong_admin_top select").change(function(event) {

         $(this).attr("data-id", $(this).children('option:selected').attr("c-data-id"));
         c_list();


     });

     function c_list() {
         var exam_id = $(".c_wrong_admin_exam").attr("data-id");
         var subject_id = $(".c_wrong_admin_sub").attr("data-id");
         $.ajax({
             type: "POST",
             url: ajaxIp + '/api/v2/wrong_books/class_books',
             async: false,
             data: {
                 'exam_id': exam_id,
                 'subject_id': subject_id,
                 'classroom_id': 156,

             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 $(".c_wrong_list").html(" ");
                 for (var i = 0; i < data.length; i++) {
                     $(".c_wrong_list").append('<li><a data-id="' + data[i].id + '" style="width: 32%;" class="c_wrong_list_name">' + data[i].title + '</a></a><a style="">' + data[i].count + '</a><a style="">' + data[i].author + '</a><a style="">' + data[i].created_at + '</a><a style=""><button data-id="' + data[i].id + '" class="c_wrong_list_look">查看</button><button style="color: #fb7d8a;border-color:#fb7d8a;" class="c_wrong_list_rem" data-id="' + data[i].id + '">删除</button></a></li>');
                 }

             },
             error: function() {

             },
         });
     }


     $(".class_admin_li").click(function(event) {
         $.ajax({
             type: "GET",
             url: ajaxIp + "/api/v2/reports/exams",
             async: false,
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {

                 console.log(data);
                 $(".c_wrong_admin_exam").html(" ");
                 $(".c_wrong_admin_sub").html(" ");
                 $(".c_wrong_admin_grade").html(" ");
                 $(".c_wrong_admin_class").html(" ");
                 $(".c_wrong_admin_exam").attr("data-id", data[0].id);
                 $(".c_wrong_admin_sub").attr("data-id", data[0].subjects[0].subject_id);
                 $(".c_wrong_admin_grade").attr("data-id", data[0].grade.grade_id);
                 $(".c_wrong_admin_class").attr("data-id", data[0].classrooms[0].classroom_id);
                 //考试
                 for (var i = 0; i < data.length; i++) {
                     $(".c_wrong_admin_exam").append('<option value="" c-data-id="' + data[i].id + '">' + data[i].name + '</option>');

                 }
                 //科目
                 for (var i = 0; i < data[0].subjects.length; i++) {
                     $(".c_wrong_admin_sub").append('<option value="" c-data-id="' + data[0].subjects[i].subject_id + '">' + data[0].subjects[i].name + '</option>');
                 }
                 //年级

                 $(".c_wrong_admin_grade").append('<option value="" c-data-id="' + data[0].grade.grade_id + '">' + data[0].grade.name + '</option>');

                 //班级
                 for (var i = 0; i < data[0].classrooms.length; i++) {
                     $(".c_wrong_admin_class").append('<option value="" c-data-id="' + data[0].classrooms[i].classroom_id + '">' + data[0].classrooms[i].classroom_name + '</option>');
                 }

                 c_list();

             },
             error: function() {

             },
         })

     });
     $(".c_wrong_list").on('click', '.c_wrong_list_look', function(event) {
         $(".c_topic_ever_box").html(" ");
         $(".c_list_ul").html(" ");
         $(".c_font_div").hide();
         $(".c_look").show();
         $(".wrong_top").html('<i class="c_back_font  iconfont" style="margin-right:10px;cursor: pointer;">&#xe61c;</i>' + $(this).parents("li").find('a').eq(0).html());
         $(".c_list_top").html($(this).parents("li").find('a').eq(0).html())
         var id = $(this).attr("data-id");
         $(".wrong_top").attr("data-id", id);
         console.log(id);


         $.ajax({
             type: "POST",
             url: ajaxIp + '/api/v2/wrong_books/book_questions',
             async: false,
             data: {
                 'id': id,
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 $(".c_topic_ever_box").html(" ");
                 $(".c_list_ul").html(" ");

                 console.log(data);

                 for (var i = 0; i < data.length; i++) {
                     var tag = "";
                     for (var i_tag = 0; i_tag < data[i].tags.length; i_tag++) {
                         tag = tag + data[i].tags[i_tag];
                     }
                     console.log(tag);
                     var s_rate = Math.round(Number(data[i].scoring_rate) * 100);
                     console.log(data[i].scoring_rate)

                     //难度系数
                     var difficulty_level = Number(data[i].difficulty_level);
                     console.log(difficulty_level);
                     if (difficulty_level == 0) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
                     } else if (difficulty_level >= 0.86) {

                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level >= 0.71 && difficulty_level < 0.86) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level >= 0.61 && difficulty_level < 0.71) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level >= 0.41 && difficulty_level < 0.61) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level > 0 && difficulty_level < 0.41) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i>';

                     }
                     //小题上标(得分率)
                     var num = data[i].question_bank_id;
                     var a_rate = Number(data[i].scoring_rate);

                     if (num < 10) {
                         var num = '0' + Number(data[i].question_bank_id);
                     }
                     if (a_rate >= 0.86) {
                         $(".c_topic_ever_box").append('<a class="class_topic_ever" style="background:#31bc91;" href="#c_a' + data[i].question_bank_id + '">' + num + '</a>');

                         // var num_color="#31bc91";
                     } else if (a_rate >= 0.8 && a_rate < 0.95) {
                         $(".c_topic_ever_box").append('<a class="class_topic_ever"  style="background:#f7c07c;" href="#c_a' + data[i].question_bank_id + '">' + num + '</a>');

                         // var num_color="#f7c07c";
                     } else if (a_rate >= 0.6 && a_rate < 0.8) {
                         $(".c_topic_ever_box").append('<a class="class_topic_ever"  style="background:#5fa3ed;" href="#c_a' + data[i].question_bank_id + '">' + num + '</a>');
                         // var num_color="#5fa3ed";
                     } else if (a_rate >= 0 && a_rate < 0.6) {
                         $(".c_topic_ever_box").append('<a class="class_topic_ever"  style="background:#fb7d8a;" href="#c_a' + data[i].question_bank_id + '">' + num + '</a>');
                         // var num_color="#fb7d8a";
                     }
                     $(".c_list_ul").append('<li id="c_a' + data[i].question_bank_id + '"><div class="c_list_main"><div class="c_list_body">' + data[i].content + '</div><p class="c_list_lable"><a>班级得分率:<i style="font-style: normal;">' + s_rate + '%</i></a><a>班级平均分:<i style="font-style: normal;">' + data[i].average_score + '分</i></a><a>知识点:<i style="font-style: normal;">' + tag + '</i></a><a class="c_list_dif">难度系数:' + difficulty_body + '（实测难度：' + data[i].difficulty + '）</a></p><div class="c_list_move"><a class="c_list_body_ans" data-id="' + i + '"><i class="iconfont" style="margin-right:10px;"></i>查看答案和解析</a></div></div></li>');

                 }

                 $(".c_topic_ever_box").append('<div style="margin-top: 10px;color: #ccc;clear: both;"><i class="iconfont" style="font-size: 14px;color: #31bc91;margin-right: 5px;">&#xe646;</i>小提示：点击题号可以定位到相应题目</div>');


             },
             error: function() {

             },
         });

     });



     $(".c_wrong_list").on('click', '.c_wrong_list_name', function(event) {
         $(".layer").css("height", $(document).height());
         $(".layer").show();
         $(".c_wrong_change_name").show();
         $(".c_wrong_change_name_input").val($(this).html());
         $(".c_wrong_change_name_t").attr("data-id", $(this).attr("data-id"));
     });

     $(".c_wrong_change_name_t").click(function(event) {

         var title = $(".c_wrong_change_name_input").val();
         var id = $(this).attr("data-id");
         console.log(title.length);
         if (title.length == 0) {
             layer.msg('名称不能为空', { time: 700 });
         } else {
             $(".layer").hide();
             $(".c_wrong_change_name").hide();
             $.ajax({
                 type: "POST",
                 url: ajaxIp + '/api/v2/wrong_books/update_title',
                 async: false,
                 data: {
                     'id': id,
                     'title': title,
                 },
                 headers: {
                     'Authorization': "Bearer " + isLogin
                 },
                 success: function(data) {
                     console.log(data);
                     c_list();
                 },
                 error: function() {
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
         var id = $(this).attr("data-id");
         $.ajax({
             type: "POST",
             url: ajaxIp + '/api/v2/wrong_books/delete',
             async: false,
             data: {
                 'id': id,

             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 console.log(data);
                 c_list();
                 layer.msg('删除成功', { time: 700 });
             },
             error: function() {
                 /* Act on the event */
             }
         });

     });
     //年级管理
     $(".g_wrong_list").on('click', '.g_wrong_list_name', function(event) {
         $(".layer").css("height", $(document).height());
         $(".layer").show();
         $(".g_wrong_change_name").show();
         $(".g_wrong_change_name_input").val($(this).html());
         $(".g_wrong_change_name_t").attr("data-id", $(this).attr("data-id"));
     });

     $(".g_wrong_change_name_t").click(function(event) {
         $(".layer").hide();
         $(".g_wrong_change_name").hide();
         var title = $(".g_wrong_change_name_input").val();
         var id = $(this).attr("data-id");
         console.log(title.length);
         if (title.length == 0) {
             alert("名称不能为空");
         } else {
             $.ajax({
                 type: "POST",
                 url: ajaxIp + '/api/v2/wrong_books/update_title',
                 async: false,
                 data: {
                     'id': id,
                     'title': title,
                 },
                 headers: {
                     'Authorization': "Bearer " + isLogin
                 },
                 success: function(data) {
                     console.log(data);
                     g_wrong_list();
                 },
                 error: function() {
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
         var id = $(this).attr("data-id");
         $.ajax({
             type: "POST",
             url: ajaxIp + '/api/v2/wrong_books/delete',
             async: false,
             data: {
                 'id': id,

             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 console.log(data);
                 g_wrong_list();
                 layer.msg('删除成功', { time: 700 });
             },
             error: function() {
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
         $(".p_list_main").css("width", "100%");
         $(".main").css("width", "100%");
         $(".main").css("margin-top", "0px");
         $(".wrong_right").css("width", "100%");
         $(".content").css("padding-bottom", "0px");
         $(".p_list_main_analy_show").hide();
         $(".p_list_ul .p_list_main_analy").show()
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
         $(".p_list_main").css("width", "923px");
         $(".main").css("width", "1200px");
         $(".main").css("margin-top", "45px");
         $(".wrong_right").css("width", "1000px");
         $(".content").css("padding-bottom", "100px");
         $(".p_list_main_analy_show").show();
         $(".p_list_ul .p_list_main_analy").hide();
     });
     // 个人错题1集
     $(".per_admin_li").click(function(event) {
         $(".per_wrong_list_look_box").hide();
         $(".per_wrong_admin_main_box").show();
         $.ajax({
             type: "GET",
             url: '/api/v2/reports/exams',
             async: false,
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 $(".per_exam").html(" ");
                 for (var i = 0; i < data.length; i++) {
                     $(".per_exam").append('<option data-id="' + data[i].id + '">' + data[i].name + '</option>')
                 }
                 $(".per_class").html(" ");
                 $(".per_sub").html(" ");
                 for (var a = 0; a < data[0].classrooms.length; a++) {
                     $(".per_class").append('<option data-id="' + data[0].classrooms[a].classroom_id + '">' + data[0].classrooms[a].classroom_name + '</option>')
                 }
                 for (var b = 0; b < data[0].subjects.length; b++) {
                     $(".per_sub").append('<option data-id="' + data[0].subjects[b].subject_id + '" value="'+data[0].subjects[b].name+'">' + data[0].subjects[b].name + '</option>')
                 }
                 p_students();
                 p_students_two(0) 
             },
             error: function() {
                 /* Act on the event */
             }
         });

     });

     function p_students() {
         var exam_id = $(".per_exam").find('option:selected').attr("data-id");
         var subject_id = $(".per_sub").find('option:selected').attr("data-id");
         var classroom_id = $(".per_class").find('option:selected').attr("data-id");
         $(".per_wrong_list").html(" ");
         $(".per_wrong_admin_students_p02").html(" ");
         $.ajax({
             type: "POST",
             url: '/api/v2/wrong_books/student_books',
             async: false,
             data: {
                 'exam_id': exam_id,
                 'subject_id': subject_id,
                 'classroom_id': classroom_id,

             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 console.log(data);

                 for (var i = 0; i < data.length; i++) {
                     for (var item in data[i][0]) {
                         console.log(data[i][0][item]);
                         $(".per_wrong_admin_students_p02").append('<a data-id="' + i + '">' + data[i][0][item] + '</a>');
                         for (var a = 0; a < data[0][1].length; a++) {
                             $(".per_wrong_list").append('<li><a style="width: 32%;" class="p_wrong_list_name" data-id="' + data[0][1][a].id + '">' + data[0][1][a].title + '</a><a style="">' + data[0][1][a].count + '</a><a style="">' + data[0][1][a].author + '</a><a style="">' + data[0][1][a].created_at + '</a><a style=""><button class="per_wrong_list_look">查看</button><button class="per_wrong_list_rem">删除</button></a></li>');
                         }
                     }
                 }
                 $(".per_wrong_admin_students_p02 a").eq(0).attr("class","p_student_color");
             },
             error: function() {
                 /* Act on the event */
             }
         });
     }

     function p_students_two(e) {
         var exam_id = $(".per_exam").find('option:selected').attr("data-id");
         var subject_id = $(".per_sub").find('option:selected').attr("data-id");
         var classroom_id = $(".per_class").find('option:selected').attr("data-id");
         $(".per_wrong_list").html(" ");
         $.ajax({
             type: "POST",
             url: '/api/v2/wrong_books/student_books',
             async: false,
             data: {
                 'exam_id': exam_id,
                 'subject_id': subject_id,
                 'classroom_id': classroom_id,

             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 console.log(data);
                 for (var item in data[e][0]) {
                     for (var a = 0; a < data[e][1].length; a++) {
                         $(".per_wrong_list").append('<li><a style="width: 32%;" class="p_wrong_list_name" data-id="' + data[e][1][a].id + '">' + data[e][1][a].title + '</a><a style="">' + data[e][1][a].count + '</a><a style="">' + data[e][1][a].author + '</a><a style="">' + data[e][1][a].created_at + '</a><a style=""><button class="per_wrong_list_look">查看</button><button class="per_wrong_list_rem">删除</button></a></li>');
                     }
                 }
             },
             error: function() {
                 /* Act on the event */
             }
         });
     }
     //选择考试改变班级科目

     $(".per_exam").change(function(event) {
         var index = $(".per_exam").find('option:selected').index();
         $.ajax({
             type: "GET",
             url: '/api/v2/reports/exams',
             async: false,
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 $(".per_class").html(" ");
                 $(".per_sub").html(" ");
                 for (var a = 0; a < data[index].classrooms.length; a++) {
                     $(".per_class").append('<option data-id="' + data[index].classrooms[a].classroom_id + '">' + data[index].classrooms[a].classroom_name + '</option>')
                 }
                 for (var i = 0; i < data[index].subjects.length; i++) {
                     $(".per_sub").append('<option data-id="' + data[index].subjects[i].subject_id + '" value="'+data[index].subjects[i].name+'">' + data[index].subjects[i].name + '</option>')
                 }
             },
             error: function() {
                 /* Act on the event */
             }
         });
     });
     $(".per_select_top select").change(function(event) {
         p_students();
     });
     $(".per_wrong_admin_students_p02").on('click', 'a', function(event) {
         $(this).addClass('p_student_color').siblings().removeClass('p_student_color');
         var a = $(this).attr("data-id");
         p_students_two(a);
     });
     // 删除
     $(".per_wrong_list").on('click', '.per_wrong_list_rem', function(event) {
         // $(this).parents('li').remove();
         var id = $(this).parents('li').find(".p_wrong_list_name").attr("data-id");
         console.log(id);
         $.ajax({
             type: "POST",
             url: '/api/v2/wrong_books/delete',
             async: false,
             data: {
                 'id': id,
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 var e = $(".p_student_color").attr("data-id");
                 p_students_two(e);
                 layer.msg('删除成功', { time: 700 });
             },
             error: function() {
                 /* Act on the event */
             }
         });
     });
     $(".per_wrong_list").on('click', '.per_wrong_list_look', function(event) {
         $(".per_wrong_admin_main_box").hide();
         $(".per_wrong_list_look_box").show();
         $(".wrong_top").html('<i class="c_back_font  iconfont" style="margin-right:10px;cursor: pointer;"></i>' + $(this).parents('li').find('.p_wrong_list_name').html() + '');
         $(".p_list_top").html($(this).parents('li').find('.p_wrong_list_name').html());
         var id = $(this).parents('li').find(".p_wrong_list_name").attr("data-id");
         $.ajax({
             type: "POST",
             url: '/api/v2/wrong_books/book_questions',
             async: false,
             data: {
                 'id': id,
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 console.log(data);
                 $(".p_topic_ever_box").html(" ");
                 for (var i = 0; i < data.length; i++) {
                     var tag = "";
                     for (var i_tag = 0; i_tag < data[i].tags.length; i_tag++) {
                         tag = tag + data[i].tags[i_tag];
                     }
                     console.log(tag);
                     var s_rate = Math.round(Number(data[i].scoring_rate) * 100);
                     console.log(data[i].scoring_rate)

                     //难度系数
                     var difficulty_level = Number(data[i].difficulty_level);
                     console.log(difficulty_level);
                     if (difficulty_level == 0) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';
                     } else if (difficulty_level >= 0.86) {

                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level >= 0.71 && difficulty_level < 0.86) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level >= 0.61 && difficulty_level < 0.71) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level >= 0.41 && difficulty_level < 0.61) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe639;</i>';

                     } else if (difficulty_level > 0 && difficulty_level < 0.41) {
                         var difficulty_body = '<i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i><i class="iconfont" style="margin-left:2px;">&#xe600;</i>';

                     }
                     //小题上标(得分率)
                     var num = data[i].question_bank_id;
                     var a_rate = Number(data[i].scoring_rate);

                     if (num < 10) {
                         var num = '0' + Number(data[i].question_bank_id);
                     }
                     if (a_rate >= 0.86) {
                         $(".p_topic_ever_box").append('<a class="class_topic_ever" style="background:#31bc91;" href="#p_a' + data[i].question_bank_id + '">' + num + '</a>');

                     } else if (a_rate >= 0.8 && a_rate < 0.95) {
                         $(".p_topic_ever_box").append('<a class="class_topic_ever"  style="background:#f7c07c;" href="#p_a' + data[i].question_bank_id + '">' + num + '</a>');

                     } else if (a_rate >= 0.6 && a_rate < 0.8) {
                         $(".p_topic_ever_box").append('<a class="class_topic_ever"  style="background:#5fa3ed;" href="#p_a' + data[i].question_bank_id + '">' + num + '</a>');

                     } else if (a_rate >= 0 && a_rate < 0.6) {
                         $(".p_topic_ever_box").append('<a class="class_topic_ever"  style="background:#fb7d8a;" href="#p_a' + data[i].question_bank_id + '">' + num + '</a>');

                     }
                     var answer_main=""
                     if(data[i].wrong_image==0){
                        answer_main=answer_main
                     }else{
                        var answer_main=""
                        for(var w=0;w<data[i].wrong_image.length;w++){
                             answer_main=answer_main+'<a href="'+data[i].wrong_image[w]+'"></a>'
                        }
                     }

                     $(".p_list_ul").append('<li id="p_a' + data[i].question_bank_id + '"><div class="p_list_main" style=""><div class="p_list_body">' + data[i].content + '</div><div class="p_list_move"><a class="p_list_body_ans" data-in="' + i + '" data-id="' + id + '"><i class="iconfont" style="margin-right:5px;"></i>查看答案和解析</a></div><div class="p_list_number"><p><i class="iconfont" style="font-size:45px;color:#fb7d8a;"></i><a>' + num + '</a></p></div><div class="p_list_form">试题来源:<a>' + data[i].source + '</a></div><p class="p_list_main_analy_show"><i class="iconfont" style="" data-id="0">&#xe624;</i></p><div class="p_list_main_analy"><p class="p_list_lable" style="margin-top: 10px;"><a>个人得分率:<i>' + a_rate + '</i></a><a>个-班级得分率差<i>' + data[i].scoring_rate_difference + '</i></a><a>知识点:' + tag + '</a><a class="p_list_dif">难度系数:' + difficulty_body + '（实测难度：' + data[i].difficulty + '）</a></p><div class="p_list_ans"><p class="per_list_ans_top" style="color: #ccc">你的错误解答:</p><p class="per_list_ans_top">'+answer_main+'</p></div><p class="p_list_ans_be_top">错因CT:</p><div class="p_list_ans_be"><p class="p_list_ans_be01">智力因素 Z :</p><p class="p_list_ans_be02">非智力因素 FZ :</p></div><p class="p_list_ans_train_top">错题重练:</p><div class="p_list_ans_train"><p>请在此区域内纠正错题，并归纳解题心得。</p></div><p class="p_list_ans_train_top01">变式训练:</p><div class="p_list_ans_train_01"></div></div></div>');
                     for (var cf = 0; cf < data[i].ct_fz.length; cf++) {
                             $(".p_list_ul li").eq(i).find('.p_list_ans_be02').append('<a>' + data[i].ct_fz[cf] + '</a>');

                         }
                         for (var ct = 0; ct < data[i].ct_z.length; ct++) {
                             $(".p_list_ul li").eq(i).find('.p_list_ans_be01').append('<a>' + data[i].ct_z[ct] + '</a>');
                         }
                 }

                 $(".p_topic_ever_box").append('<div style="margin-top: 10px;color: #ccc;clear: both;"><i class="iconfont" style="font-size: 14px;color: #31bc91;margin-right: 5px;">&#xe646;</i>小提示：点击题号可以定位到相应题目</div>');

             },
             error: function() {

             },
         });

     });
     $(".wrong_top").on('click', 'i', function(event) {
         $(".per_wrong_admin_main_box").show();
         $(".per_wrong_list_look_box").hide();
         $(".wrong_top").html('个人错题集管理');
     });
     //弹出修改框
     $(".per_wrong_list").on('click', '.p_wrong_list_name', function(event) {
         $(".layer").css("height", $(document).height());
         $(".layer").show();
         $(".p_wrong_change_name").show();
         $(".p_wrong_change_name_input").val($(this).html());
         $(".p_wrong_change_name_t").attr("data-id", $(this).attr("data-id"));
     });
     //个人错题集名字修改框
     $(".p_wrong_change_name_t").click(function(event) {

         var id = $(this).attr("data-id");
         var title = $(".p_wrong_change_name_input").val();
         if (title.length == 0) {
             layer.msg('不能为空', { time: 700 });
         } else {
             $(".p_wrong_change_name").hide();
             $(".layer").hide();
             $.ajax({
                 type: "POST",
                 url: ajaxIp + '/api/v2/wrong_books/update_title',
                 async: false,
                 data: {
                     'id': id,
                     'title': title,
                 },
                 headers: {
                     'Authorization': "Bearer " + isLogin
                 },
                 success: function(data) {
                     console.log(data);
                     var e = $(".p_student_color").attr("data-id");
                     p_students_two(e);
                     layer.msg('修改成功', { time: 700 });
                 },
                 error: function() {
                     /* Act on the event */
                 }
             });
         }
         // $(".p_wrong_list_name").html($(".p_wrong_change_name_input").val());
     });
     $(".p_wrong_change_name_f").click(function(event) {
         $(".p_wrong_change_name").hide();
         $(".layer").hide();

     });
     $(".p_wrong_change_name_back").click(function(event) {
         $(".p_wrong_change_name").hide();
         $(".layer").hide();
     });
     $(".p_list_ul").on('click', '.p_list_main_analy_show', function(event) {

         var a = $(".p_list_main_analy_show i").attr("data-id");
         if (a == 0) {
             $(".p_list_main_analy_show i").attr("data-id", "1");
             $(".p_list_main_analy_show i").html('&#xe622;');
             $(this).next(".p_list_main_analy").slideDown(500);
         } else if (a == 1) {
             $(".p_list_main_analy_show i").attr("data-id", "0");
             $(".p_list_main_analy_show i").html('&#xe624;');
             $(this).next(".p_list_main_analy").slideUp(500);
         }
     });
     //查看答案
     $(".p_list_ul").on('click', '.p_list_body_ans', function(event) {

         $(".layer").css("height", $(document).height());
         $(".layer").show();
         $(".p_ans_tc").show();
         var a = $(this).attr("data-id");
         var b = $(this).attr("data-in");
         $.ajax({
             type: "POST",
             url: '/api/v2/wrong_books/book_questions',
             async: false,
             data: {
                 'id': a,
             },
             headers: {
                 'Authorization': "Bearer " + isLogin
             },
             success: function(data) {
                 $(".p_ans01").html(data[b].answer);
                 $(".p_ans02").html(data[b].analysis);
             },
             error: function() {

             },
         });
     });
     $(".p_ans_tc button").click(function(event) {


         $(".layer").css("height", $(document).height());
         $(".layer").hide();
         $(".p_ans_tc").hide();
     });
//年
 $(".grade_wrong_back_x").click(function(event) {
         $(".grade_ans_tc").hide();
         $(".layer").hide();
     });
 $(".class_wrong_back_x").click(function(event) {
         $(".class_ans_tc").hide();
         $(".layer").hide();
     });
 $(".per_wrong_back_x").click(function(event) {
         $(".per_ans_tc").hide();
         $(".layer").hide();
     });

 })