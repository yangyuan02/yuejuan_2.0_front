angular.module("myApp.controller", [])
    .controller("form01Controller", function() {
        // mark();
        // markxl(null);
        // $(".main_left a").eq(0).click(function(event) {
        /* Act on the event */
        // if($(this).attr("data-id")==1){
        // mark();
        // $(this).attr("data-id","2")
        // }else{

        // }
        // });
        $(".main_left a").eq(0).addClass('li_click').siblings().removeClass("li_click");
        $("#index_span").html($(".main_left a").eq(0).html());
        var isLogin = localStorage.getItem("token"); // 全部科目
        
        $.ajax({
            type: "GET",
            url: ajaxIp + "/api/v2/commons/grade_subjects",
            headers: {
                'Authorization': "Bearer " + isLogin
            },

            success: function(data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    $(".mark_01_select").append('<option value ="' + data[i].name + '" data-id="' + data[i].id + '">' + data[i].name + '</option>')
                }
            },
            error: function() {

            }
        });


        $(".mark_01_select").change(function(event) {
            $("#mark_02_ul ul li").remove();
            $("#mark_02_ul div").remove();

            var mark_01_select_a = $(this).children('option:selected').attr("data-id");
            // $(this).attr('a', mark_01_select_a);
            markxl(mark_01_select_a);

        });
        // $(".mark_01_select option").eq(0).click(function(event) {
        //     /* Act on the event */
        //     alert();
        // });



        // 成绩生成下拉函数
        markxl(null);

        function markxl(c) {
            $.ajax({
                type: "GET",
                url: ajaxIp + "/api/v2/reports",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "subject_id": c,
                },
                success: function(date) {
                    console.log(date);
                    for (var i = 0; i < date.length; i++) {

                        $(".mark_02_ul").append('<li data-id="' + date[i].exam_id + '"><span>' + date[i].name + '<i class="iconfont" style="margin-left:11px;cursor: pointer;">&#xe622;</i><i class="iconfont" style="margin-left:11px;cursor: pointer;display:none;">&#xe624;</i></span></li><div class="mark_li_01"></div>')
                        var b = date[i].exam_subjects.length;

                        for (var a = 0; a < b; a++) {
                            // console.log(i);
                            $(".mark_02_ul div").eq(i).append('<ul><li>' + date[i].exam_subjects[a].name + '</li><li>' + date[i].exam_subjects[a].updated_at + '</li><li>' + date[i].exam_subjects[a].operator_id + '<button type="" data-id="' + date[i].exam_subjects[a].exam_subject_id + '" data-status="' + date[i].exam_subjects[a].status + '" data_a="1" data-sid="'+ date[i].exam_subjects[a].subject_id+ '">分析</button></li></ul>');


                            var status_btn = $(".mark_li_01 ul").eq(a).find("button").attr("data-status");

                            if (status_btn == "finished" || status_btn == "analyse" || status_btn == "analyseing" || status_btn == "analysed" || status_btn == "reanalyse") {
                                $(".mark_li_01 ul").eq(a).find("button").show();
                            } else {
                                $(".mark_li_01 ul").eq(a).find("button").hide();
                            }

                        }
                    }
                },
                error: function() {

                }
            });
        }


        $(".mark_02_ul").on('click', 'span', function(event) {
            $(this).parent().next().toggle();
            $(this).find('i').toggle();
        });



        //     $("#mark_02_ul i").click(function(event) {
        //     /* Act on the event */
        //     $(this).parent().next().toggle();
        //     $(this).hide();
        //     $(this).siblings().show();
        // }); 
        // 分析
        $(".btn_1").click(function(event) {

            $(".mart_set").hide();
            $(".load-bg").show();
            mark_fengxi();
  });      
function mark_fengxi(){
             $(".tf_dj a").remove();
            var ex_id = $(".mart_set_03").data("a1");
            var sub_id = $(".mart_set_04").data("b1");
            var sub_id1 = parseInt(sub_id);
            var ex_id1 = parseInt(ex_id);
            var jg_mark = $("#jg_mark").val();
            var yx_mark = $("#yx_mark").val();
            var z_mark = $("#z_mark").val();
            var a = $("#ul_iLabel li").length;
            var data_value = {
                // 't[column_name_1]':"A",
                // "t[column_value_1]":"10",
                "full_score": z_mark,
                "t[exam_subject_id]": sub_id1,
                "t[exam_id]": ex_id1,
                "exam_subject_id": sub_id1,
                "pass": jg_mark,
                "fine": yx_mark,
            };
            console.log(data_value);
            for (var i = 0;i < a; i++) {
                var c = i + 1;
                console.log($("#ul_iLabel li").eq(i).find('.level_01').val(),$("#ul_iLabel li").eq(i).find('.level_02').val());
                var d = "t[column_name_" + c + "]";
                var e = $("#ul_iLabel li").eq(i).find('.level_01').val();
                var f = "t[column_value_" + c + "]";
                var g = $("#ul_iLabel li").eq(i).find('.level_02').val();
                data_value[d] = e;
                data_value[f] = g;
                $(".tf_dj").append('<a>'+e+'：'+g+'</a>')

            };
              console.log(data_value.fine); 
              $(".tf_zf a").html(data_value.full_score);
              $(".tf_jg a").html(data_value.pass);
              $(".tf_yx a").html(data_value.fine);
           
            $.ajax({
                type: "POST",
                async:false,
                url: ajaxIp + "/api/v2/reports/save_analysis_params",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data:data_value,
                success: function(data) {
                    console.log(data);
                  
                        if(data.status==5){
                      $(".modal-exit").hide();
                       $(".t_f").show();
                        $(".modal-content").hide();
                        $(".load-bg").hide();
                        $('.modal-main').css('opacity', "1");
                        $('.modal-wrap').show();
                        $('.modal-content span').html("更新成功");
                        }
                        if(data.status==6){ 
                         $(".modal-exit").show(); 
                          $(".load-bg").show();
                        
                        }
                    if (data.error_code == 500) {
                       $(".modal-content").show();
                       $(".modal-exit").show();
                        $(".load-bg").show();
                        $(".t_f").hide();
                        $(".load-bg").hide();
                        $('.modal-main').css('opacity', "1");
                        $('.modal-content span').html(data.error_message);
                        $('.modal-wrap').show();
                    }
                },
                error: function() {

                }
           
            });           
        };
function mark_fengxi01(){     
            var ex_id = $(".mart_set_03").data("a1");
            var sub_id = $(".mart_set_04").data("b1");
            var sub_id1 = parseInt(sub_id);
            var ex_id1 = parseInt(ex_id);
            var jg_mark = $("#jg_mark").val();
            var yx_mark = $("#yx_mark").val();
            var z_mark = $("#z_mark").val();
            var a = $("#ul_iLabel li").length;
            var data_value = {
                "full_score": z_mark,
                "t[exam_subject_id]": sub_id1,
                "t[exam_id]": ex_id1,
                "exam_subject_id": sub_id1,
                "pass": jg_mark,
                "fine": yx_mark,
            };
            console.log(data_value);
            for (var i = 0;i < a; i++) {
                var c = i + 1;
                console.log($("#ul_iLabel li").eq(i).find('.level_01').val(),$("#ul_iLabel li").eq(i).find('.level_02').val());
                var d = "t[column_name_" + c + "]";
                var e = $("#ul_iLabel li").eq(i).find('.level_01').val();
                var f = "t[column_value_" + c + "]";
                var g = $("#ul_iLabel li").eq(i).find('.level_02').val();
                data_value[d] = e;
                data_value[f] = g;
                $(".tf_dj").append('<a>'+e+'：'+g+'</a>')

            };
              console.log(data_value.fine); 
              $(".tf_zf a").html(data_value.full_score);
              $(".tf_jg a").html(data_value.pass);
              $(".tf_yx a").html(data_value.fine);
           
            $.ajax({
                type: "POST",
                async:false,
                url: ajaxIp + "/api/v2/reports/save_analysis_params",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data:data_value,
                success: function(data) {
                    console.log(data);
                   if (data.error_code == 500) {
                        $(".modal-content").show();
                        $(".load-bg").show();
                        $('.modal-main').css('opacity', "1");
                        $('.modal-content span').html(data.error_message);
                        $('.modal-wrap').show();
                        $(".modal-exit").show();
                    }
                        if(data.status==5){
                         $(".modal-exit").hide();
                         $(".t_f").show();
                        $(".modal-content").hide();
                        $(".load-bg").hide();
                        // $('.modal-content span').html("更新成功");
                        }
                        if(data.status==6){ 
                          $(".load-bg").hide();
                          $(".modal-content").hide();
                          $(".modal-exit").show();
                          $('.modal-content span').html("取消成功");
                        }
                    
                },
                error: function() {

                }
           
            });           
        };
function mark_hou(){
    var a=$(".t_f_btn01").attr("data-id");
     var b=$(".t_f_btn02").attr("data-sid");
$.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/analysis_params",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data:{"exam_id":a,
                    "subject_id":b,
            },
                success: function(data) {
                      console.log(data);
                      if(data.error_code!==500){
                      // $(".tf_span").html(data.full_score);
                      $("#z_mark").val(data.full_score);
                      $("#jg_mark").val(data.pass);
                      $("#yx_mark").val(data.fine);
                      $("#ul_iLabel li").eq(0).find('.level_01').val(data.column_name_1);
                      $("#ul_iLabel li").eq(0).find('.level_02').val(data.column_value_1);
                      $("#ul_iLabel li").eq(1).find('.level_01').val(data.column_name_2);
                      $("#ul_iLabel li").eq(1).find('.level_02').val(data.column_value_2);
                      $("#ul_iLabel li").eq(2).find('.level_01').val(data.column_name_3);
                      $("#ul_iLabel li").eq(2).find('.level_02').val(data.column_value_3);
                      $("#ul_iLabel li").eq(3).find('.level_01').val(data.column_name_4);
                      $("#ul_iLabel li").eq(3).find('.level_02').val(data.column_value_4);
                      $("#ul_iLabel li").eq(4).find('.level_01').val(data.column_name_5);
                      $("#ul_iLabel li").eq(4).find('.level_02').val(data.column_value_5);
                      var b=[data.column_name_6,data.column_name_7,data.column_name_8,data.column_name_9,data.column_name_10,data.column_name_11];
                      var b1=[data.column_value_6,data.column_value_7,data.column_value_8,data.column_value_9,data.column_value_10,data.column_value_11];
                      if(data.lenght<12){
                      if(data.lenght>5){
                        console.log(data.lenght);     
                        for(var i=5;i<data.lenght;i++){
                            var c=i-5;
                            var a=i+1;
                         $("#ul_iLabel").append('<li><input value=""  class="level_01"></input><input value="" class="level_02"></input><button type="">-</button></li>');        
                          $("#ul_iLabel li").eq(i).find('.level_01').val(b[i]);
                          $("#ul_iLabel li").eq(i).find('.level_02').val(b1[i]);
                        }
                        }
                      }
                  }
                },
                error: function() {

                }
            });
};

/*分析数据的的确定*/
  mark_tf();
  function mark_tf() {
    $(".t_f_btn01").click(function(event) {
      /* Act on the event */
      $(".modal-wrap").hide();
      $(".mask_layer").hide();
      mark_fengxi();
    });

    $(".t_f_btn02").click(function(event) {
      /* Act on the event */
      $(".modal-wrap").hide();
      $(".mask_layer").hide();
      $(".tf_dj a").remove();
      // mark_fengxi01();
      $(".load-bg").hide();
    });
  };

        $(".modal-exit").click(function(event) {
            /* Act on the event */
            $(".mask_layer").hide();
        });

  $(".mark_02").on('click', ' button', function(event) {
    // $(this).parent().parent().prev().html();
    console.log($(this).parent().parent().parent().prev().attr("data-id"));
    console.log($(this).attr("data-id"));
     $(".t_f").attr("data-id",$(this).attr("data-id"));
    var a = $(this).parent().parent().parent().prev().attr("data-id");
    var b = $(this).attr("data-id");
    var b1 = $(this).attr("data-sid");
    $(this).attr("data-s", a);
    $(this).attr("data-k", b);
    $(".t_f_btn01").attr("data-id", a);
    $(".t_f_btn02").attr("data-sid", b1);
    $(".mart_set_03").data("a1", a);
    $(".mart_set_04").data("b1", b);
    $(".mart_set").show();
    $(".mark_02").css("margin-bottom", "500px");
    $(".mask_layer").css("height", $(document).height());
    $(".mask_layer").show();
    // mark_hou(a,b);
    mark_hou();
    var faye = new Faye.Client(fayeIp+'/api/v2/events');
    faye.subscribe("/reports/" + b + "", function(data) {
      if (data.status == "analysed") {
        $(".t_f").hide();
        $(".modal-content").show();
        $('.modal-main').css('opacity', "1");
        $('.modal-wrap').show();
        $(".mask_layer").show();
        $(".load-bg").hide();
        $('.modal-content span').html("更新成功");

      }else{
        $(".t_f").hide();
        $(".modal-content").show();
        $('.modal-main').css('opacity', "1");
        $('.modal-wrap').show();
        $(".mask_layer").show();
        $(".load-bg").hide();
        $('.modal-content span').html("分析失败");
      }
      console.log(data);
    });

  });
        $("#set_04").click(function(event) {
            /* Act on the event */
            $(".mart_set").hide();
            $(".mark_02").css("margin-bottom", "0px");
            $(".mask_layer").hide();
        });
        $(".mart_set_03").on('click', 'button', function(event) {
            /* Act on the event */

            var a = $(".mart_set_03").height();
            console.log(a);
            if (a > 234) {
                $(this).parent().remove();
            }
        });
        $(".mark_add").click(function(event) {
            /* Act on the event */
            var a = $(".mart_set_03").height();
            if (a < 577) {
                $('.mart_set_03 ul').append('<li><input class="level_01"></input><input class="level_02"></input><button type="" class="iLabel">-</button></li>');

            }
        })

        $(document).on('click', '.iLabel', function() {
            $(this).parent().hide();
        })


    })
    // 考试状况
    .controller("form02Controller", function() {
        $(".main_left a").eq(1).addClass('li_click').siblings().removeClass("li_click");
        $("#index_span").html($(".main_left a").eq(1).html());
        var isLogin = localStorage.getItem("token");
        $.ajax({
            type: "GET",
            url: ajaxIp + "/api/v2/reports/exams",
            async:false,
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
                console.log(data);

                for (var i = 0; i < data.length; i++) {
                    $(".exam_name").append('<option value="" data-id=' + data[i].id + '>' + data[i].name + '</option>');
                    var d = data[0].subjects.length;
                    $(".exam_sub").html('');
                    for (var a = 0; a < d; a++) {
                        $(".exam_sub").append('<option value="" data-id=' + data[0].subjects[a].subject_id + '>' + data[0].subjects[a].name + '</option>');
                        $(".exam_sub").attr("data-id",data[0].subjects[0].subject_id);

                    };

                    $(".exam_name").change(function() {
                        // alert($(".exam_name").children('option:selected').attr("data-id"));
                        // console.log($(".exam_name").children('option:selected').index());

                        var c = $(this).children('option:selected').index()
                        var b = data[c].subjects.length;
                        $(".exam_sub").html('');
                        for (var a = 0; a < b; a++) {
                            $(".exam_sub").append('<option value="" data-id=' + data[c].subjects[a].subject_id + '>' + data[c].subjects[a].name + '</option>');
                              $(".exam_sub").attr("data-id",data[c].subjects[0].subject_id);
                        }

                    });

                }
                kaoshizk();
                chengjifd(10);

            },
            error: function() {}

        });
        // 考试状况的选择事件
        $(".study_q_01_mark select").change(function(event) {
             kaoshizk();
            chengjifd(10);
        });
        // 考试状况的函数
        function kaoshizk(){
          var exam_id = parseInt($(".exam_name").children('option:selected').attr("data-id"));
             $(".exam_sub").attr("data-id",$(".exam_sub").children('option:selected').attr("data-id"));
             var sub_id = parseInt($(".exam_sub").attr("data-id"));
             if(sub_id==null){
                 var sub_id = parseInt($(".exam_sub").attr("data-id"));
             }          
            console.log(exam_id);
            console.log(sub_id);          
            $.ajax({
                type: "GET",
                url: ajaxIp + "/api/v2/reports/basic_situation",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id
                },
                success: function(data) {
                    console.log(data);

                    if(data.error_code==500){
                   $(".right_02 img").hide();
                 }else{
                     $(".right_02 img").show();
                 }
                
                    $(".r2_02_01").html(data.statistics_total);
                    $(".r2_02_02").html(data.average);
                    if(data.average_rate==undefined){
                         $(".r2_02_03").html("0");
                     }else{
                         $(".r2_02_03").html(data.average_rate+"%");
                     }
                    if(data.average_rate==undefined){
                         $(".r2_02_04").html("0");
                     }else{
                        $(".r2_02_04").html(data.pass_rate+"%");
                     }
                   if(data.average_rate==undefined){
                         $(".r2_02_05").html("0");
                     }else{
                        $(".r2_02_05").html(data.fine_rate+"%");
                     }
                   
                    $(".r2_02_06").html(data.standard_deviation);
                    var a = 100 - data.fine_rate;
                    var b = 100 - data.pass_rate;
                    var c = 100 - data.average_rate;
                    console.log(a, b);
                    basic_y(a, b, c)

                    $.ajax({
                        type: "GET",
                        url: ajaxIp + "/api/v2/reports/socre_distribution",
                        headers: {
                            'Authorization': "Bearer " + isLogin
                        },
                        data: {
                            "exam_id": exam_id,
                            "subject_id": sub_id,
                            "step_eq": 10,
                        },
                        success: function(data) {
                            console.log(data);
                            var a = [];
                            // s
                            // console.log(data[0].rate);
                            var b = [];
                            
                            if(data.error_code!==500){
                            for (var i = 0; i < data.socre_distributions.length; i++) {
                                a.push(data.socre_distributions[i].range_text);
                                b.push(data.socre_distributions[i].count);
                            };
                             }
                            mark_fb(a,b);
                            if(data.error_code==500){
                             mark_fb(a,b);
                            };
                       
                        },
                        error: function() {

                        }


                    });


                },
                error: function() {

                }


            });

        };

        // $(".i1").html($(".u_1 li").eq(0).html());
        // $(".i2").html("数学");
        $(".sn_1").hide();
        $(".sn_2").hide();
        // $(document).ready(function(){
        $(".span_1").click(function() {

            $(".sn_1").toggle();
            $(".sn_2").hide();
        });
        $(".span_2").click(function() {
            $(".sn_2").toggle();
            $(".sn_1").hide();
        });


        $(".u_1").on("click", "li", function() {
            var c = $(this).html();
            $(".i1").html(c);
            $(".sn_1").hide();
            $(".sn_2 ul").eq($(this).index()).show().siblings().hide();
            $(".i2").html($(".sn_2 ul").eq($(this).index()).find('li').eq(0).html());

            $(".span_1").attr('data-id', $(this).attr("data-id"));


            var exam = parseInt($(".span_1").attr('data-id'));
            var sub_id = parseInt($(".span_2").attr("data-id"));

        });

        // 年级成绩大幅变化
        $("#myselect").change(function(event) {
            /* Act on the event */
            chengjifd($("#myselect").val());
        });

        function chengjifd(a) {


            var exam_id = parseInt($(".exam_name").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".exam_sub").children('option:selected').attr("data-id"));
            var num_r = parseInt(a);
            $.ajax({
                type: "GET",
                url: ajaxIp + "/api/v2/reports/grade_ranking_range",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "number": num_r
                },
                success: function(data) {
                    console.log(data);
                    if(data.error_code!==500){
                         $("#r5_11_tbody").html(' ');
                    $("#r5_11_tbody02").html(' ');
                    for (var i = 0; i < data.rise.length; i++) {
                        if(data.rise[i].grade_ranking_change==null){
                           data.rise[i].grade_ranking_change=0;
                        };
                         if(data.decline[i].grade_ranking_change==null){
                            data.decline[i].grade_ranking_change=0;
                        };
                        $("#r5_11_tbody").append(' <tr><td>' + data.rise[i].name + '</td><td>' + data.rise[i].grade_rank + '</td><td>' + data.rise[i].grade_ranking_change + '<i class="iconfont">&#xe627;</i></td></tr>');
                        $("#r5_11_tbody02").append(' <tr><td>' + data.decline[i].name + '</td><td>' + data.decline[i].grade_rank + '</td><td>' + data.decline[i].grade_ranking_change + '<i class="iconfont">&#xe628;</i></td></tr>');
                    }
                    }
                   
                },
                error: function() {

                }
            });
            // 年级学科趋势
            $.ajax({
                type: "get",
                // analyse:false,
                url: ajaxIp + "/api/v2/reports/grade_socre_trend",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id
                },
                success: function(data) {

                    console.log(data);
                    if(data.length!==0){
                    var a = [];
                    var b = [];
                    for (var i = 0; i < data.length; i++) {
                        var nub = "第" + (i + 1) + "考试"

                        a.push(nub);
                        b.push(data[i].average);
                    }
                    console.log(a);

                    njxk(a,b);
                }
                },
                error: function() {
                    /* Act on the event */
                }


            });
        }



        // 基本情况
        function basic_y(a, b, c) {
            var a1 = 100 - a;
            var b1 = 100 - b;
            var c1 = 100 - c;
            // var c2=c1.toFixed(0);
            var myChart = echarts.init(document.getElementById('right_02_r'));
            var labelTop = {
                normal: {
                    label: {
                        show: false,
                        position: 'center',
                        formatter: '{b}',
                        textStyle: {
                            baseline: 'bottom'
                        }
                    },
                    labelLine: {
                        show: false
                    }
                }
            };
            var labelFromatter = {
                normal: {
                    label: {
                        show: false,
                        position: 'center'
                    }

                },
            }
            var labelBottom = {
                normal: {
                    color: '#ccc',
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    }
                },
                emphasis: {
                    color: 'rgba(0,0,0,0)'
                }
            };
            var radius = [40, 55];
            option = {
                legend: {
                    x: 'center',
                    y: 'center',
                    data: []
                },
                series: [{
                        type: 'pie',
                        center: ['12%', '30%'],
                        radius: radius,
                        x: '0%', // for funnel
                        itemStyle: labelFromatter,
                        data: [{
                            name: 'other',
                            value: c,
                            itemStyle: labelBottom
                        }, {
                            name: 'GoogleMaps',
                            value: c1,
                            itemStyle: labelTop
                        }]
                    }, {
                        type: 'pie',
                        center: ['37%', '30%'],
                        radius: radius,
                        x: '20%', // for funnel
                        itemStyle: labelFromatter,
                        data: [{
                            name: 'other',
                            value: b,
                            itemStyle: labelBottom
                        }, {
                            name: 'Facebook',
                            value: b1,
                            itemStyle: labelTop
                        }]
                    }, {
                        type: 'pie',
                        center: ['62%', '30%'],
                        radius: radius,
                        x: '40%', // for funnel
                        itemStyle: labelFromatter,
                        data: [{
                            name: 'other',
                            value: a,
                            itemStyle: labelBottom
                        }, {
                            name: 'Youtube',
                            value: a1,
                            itemStyle: labelTop
                        }]
                    },

                ]
            };


            myChart.setOption(option);

        }
        // 分数分布插件
        function mark_fb(a,b) {
            var myChart = echarts.init(document.getElementById('right_03'));
            var option = {

                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    x: 28,
                    y: 40,
                    x2: 5,
                    y2: 45,
                    borderWidth:1,
                },

                calculable:false,
                xAxis: [{
                    type: 'category',
                     data:a,
                    axisLabel:{
                     rotate: 40,
                      margin:5,
                      textStyle:{
                        color:"666666",
                        align:'left',
                        fontWeight: '300',
                        fontFamily: 'Arial',
                        // fontStyle: 'normal',
                      }    
                     },
                }],
                yAxis: [{
                    type: 'value',

                }],
                series: [{
                    name: '人数',
                    type: 'bar',
                    data: b,
                    markPoint: {
                        data: [{
                            type: 'max',
                            name: '最大值'
                        }, {
                            type: 'min',
                            name: '最小值'
                        }]
                    },
                    markLine: {
                        data: [{
                            type: 'average',
                            name: '平均值'
                        }]
                    }
                }]
            };
            // 为echarts对象加载数据 
            myChart.setOption(option);

        }


        // 年级学科趋势
        function njxk(a, b) {
            var myChart = echarts.init(document.getElementById('right_04'));

            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    x: 28,
                    y: 45,
                    x2: 20,
                    y2: 25,
                    borderWidth: 1
                },
                // calculable: true,
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: a,
                }],
                yAxis: [{

                    type: 'value',
                    // --min: 0,
                    //max: 100,
                    // interval:20,
                }],
                series: [{
                        name: '最高分数',
                        type: 'line',
                        data: b,
                        markPoint: {
                            data: [{
                                type: 'max',
                                name: '最大值'
                            }]
                        }
                    }

                ]
            };

            // 为echarts对象加载数据 
            myChart.setOption(option);
        }



    })
    .controller("form03Controller", function() {

        // 最新班级学情追踪开始
        // 最新班级学情追踪默认事件
        $(".main_left a").eq(2).addClass('li_click').siblings().removeClass("li_click");
        $("#index_span").html($(".main_left a").eq(2).html());
        var isLogin = localStorage.getItem("token");
        $.ajax({
            type: "GET",
            async:false,
            url: ajaxIp + "/api/v2/reports/exams",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {

                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    $(".study_q_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                };
                for (var i = 0; i < data[0].classrooms.length; i++) {
                    $(".study_q_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                    $(".study_q_km02").attr("data-id",data[0].classrooms[0].classroom_id);
                };
                for (var i = 0; i < data[0].subjects.length; i++) {
                    $(".study_q_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                    $(".study_q_km03").attr("data-id",data[0].subjects[0].subject_id);
                };
                $(".study_q_km01").change(function(event) {
                    /* Act on the event */
                    var index01 = $(".study_q_km01").children('option:selected').index()
                    var index02 = index01;
                    // $(".study_q_km01 option").eq(0).remove();
                    $(".study_q_km02 option").remove();
                    $(".study_q_km03 option").remove();
                    for (var i = 0; i < data[index02].classrooms.length; i++) {
                        $(".study_q_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>')
                        $(".study_q_km02").attr("data-id",data[index02].classrooms[0].classroom_id);
                    }
                    for (var i = 0; i < data[index02].subjects.length; i++) {
                        $(".study_q_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                         $(".study_q_km03").attr("data-id",data[index02].subjects[0].subject_id);
                    }
                     
                });

               banji();
               study_q_bb()

            },

            error: function() {

            }
        });


        //最新班级学情追踪选择事件
        $(".study_q_km select").change(function(event) {
            $("#study_q_i_btn_05c tr").remove();
             banji();
            study_q_bb();
            
        });


        $(".study_q_qk03").click(function(event) {
            /* Act on the event */
            $(".study_q_qk").hide();
           $(".mask_layer").hide();
        });

        //最新班级学情追踪函数
        // 缺考人数
$(".study_q_zt").on('click', 'span', function(event) {
$(".mask_layer").css("height", $(document).height());
$(".study_q_qk").show();
$(".mask_layer").show();
          var exam_id = parseInt($(".study_q_km01").children('option:selected').attr("data-id"));
             $(".study_q_km02").attr("data-id",$(".study_q_km02").children('option:selected').attr("data-id"));
             var class_id = parseInt($(".study_q_km02").attr("data-id"));
             if(class_id==null){
                 var class_id = parseInt($(".study_q_km02").attr("data-id"));
             } 
             $(".study_q_km03").attr("data-id",$(".study_q_km03").children('option:selected').attr("data-id"));
             var sub_id = parseInt($(".study_q_km03").attr("data-id"));
            if(sub_id==null){
                 var sub_id = parseInt($(".study_q_km03").attr("data-id"));
             } 

            console.log(exam_id);
            console.log(class_id);  
            console.log(sub_id); 

// var a="http://192.168.1.117:3000";
  $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/absents",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id":exam_id,
                    "subject_id":sub_id,
                     "classroom_id":class_id,
                     // "name":"厉吴巍"
                },
                success: function(data) {
                    console.log(data);
                    $(".study_q_qk span").html(data[0].classroom_name+data[0].subject_name);
                      $(".study_q_qk02").html(" ");
                    for(var i=0;i<data.length;i++){
                      $(".study_q_qk02").append('<a>'+data[i].name+'</a>')
                    }   
                },
                error: function() {

                }

            });


});


        function banji() {
            var exam_id = parseInt($(".study_q_km01").children('option:selected').attr("data-id"));
             $(".study_q_km02").attr("data-id",$(".study_q_km02").children('option:selected').attr("data-id"));
             var class_id = parseInt($(".study_q_km02").attr("data-id"));
             if(class_id==null){
                 var class_id = parseInt($(".study_q_km02").attr("data-id"));
             } 
             $(".study_q_km03").attr("data-id",$(".study_q_km03").children('option:selected').attr("data-id"));
             var sub_id = parseInt($(".study_q_km03").attr("data-id"));
            if(sub_id==null){
                 var sub_id = parseInt($(".study_q_km03").attr("data-id"));
             } 

            console.log(exam_id);
            console.log(class_id);  
            console.log(sub_id);    
            var sub_val= $(".study_q_km03").children('option:selected').html();
             $(".study_q_06_1 span").html(sub_val);
            $.ajax({
                type: "GET",
                url: ajaxIp + "/api/v2/reports/class_basic_situation",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "classroom_id": class_id
                },
                success: function(data) {
                    console.log(data); 
                    if(data.error_code==500){
                     
                   $(".study_q_04_bo").hide();
                   $(".study_q_02_bo").hide();
                 }else{
                    $(".study_q_04_bo").show();
                   $(".study_q_02_bo").show();
                 }
                    $(".study_q_zt td").eq(0).html(data.full_score);
                    $(".study_q_zt td").eq(1).html(data.average);
                    $(".study_q_zt td").eq(2).html(data.highest_score);
                    $(".study_q_zt td").eq(3).html(data.lowest_score);
                    $(".study_q_zt td").eq(4).html(data.pass_number);
                    $(".study_q_zt td").eq(5).html(data.fine_number);
                    $(".study_q_zt td").eq(6).html(data.student_total);
                    // $(".study_q_zt td").eq(7).append('<span>查看</span>')
                },
                error: function() {

                }

            });
            // 分数段分布 
            $.ajax({
                type: "GET",
                url: ajaxIp + "/api/v2/reports/socre_distribution",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "classroom_id": class_id,
                    "step_eq": 10
                },
                success: function(data) {
                    console.log(data);
                    var a = [];
                    var b = [];
                    if(data.error_code!==500){
                    for (var i = 0; i < data.socre_distributions.length; i++) {
                        a.push(data.socre_distributions[i].range_text);
                        b.push(data.socre_distributions[i].count);
                    };
                   

                    }
                    // study_q_fd(a,b);
                  study_q_fd(a,b);
                },
                error: function() {

                }

            });


            $.ajax({
                type: "GET",
                url: ajaxIp + "/api/v2/reports/class_ranking_range",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "classroom_id": class_id,
                    "number": 5,
                },
                success: function(data) {
                    console.log(data);
                    if(data.error_code!==500){
                    for (var i = 0; i < 5; i++) {
                        var a = i + 1;
                        var c = $(".study_q_dfj tr").eq(a);
                        c.find('td').eq(1).html(data.rise[i].name);
                        c.find('td').eq(2).html(data.rise[i].class_rank);
                        if(data.rise[i].class_ranking_change==null){
                          data.rise[i].class_ranking_change=0;
                        };
                        c.find('td').eq(3).children('span').html(data.rise[i].class_ranking_change);
                        var d = $(".study_q_dft tr").eq(a);
                        d.find('td').eq(1).html(data.decline[i].name);
                        d.find('td').eq(2).html(data.decline[i].class_rank);
                        if(data.decline[i].class_ranking_change==null){
                          data.decline[i].class_ranking_change=0;
                        };
                        d.find('td').eq(3).children('span').html(data.decline[i].class_ranking_change);
                    }
                }

                },
                error: function() {

                }

            });
            // 班级成绩大幅度变化
            $.ajax({
                type: "GET",
                url: ajaxIp + "/api/v2/reports/class_rank_five",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "classroom_id": class_id,
                },
                success: function(data) {
                    console.log(data);
                    if(data.error_code!==500){
                    for (var i = 0; i < 5; i++) {
                        var i1=4-i;
                        var a = i + 1;
                        var c = $("#study_q_q5 tr").eq(a);
                         c.find('td').eq(0).html(data.top_five[i].class_rank);
                        c.find('td').eq(1).html(data.top_five[i].name);
                        var d = $("#study_q_h5 tr").eq(a);
                        d.find('td').eq(0).html(data.after_five[i1].class_rank);
                        d.find('td').eq(1).html(data.after_five[i1].name);
                    }
                   }

                },
                error: function() {

                }

            });

          // 成绩单
            $.ajax({
                type: "get",
                url: ajaxIp + "/api/v2/reports/class_students",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id":sub_id,
                    "classroom_id":class_id,
                },
                success: function(data) {
                    console.log(data);
                    if(data.error_code!==500){
                     $("#study_q_i_btn_05c").html(" ");
                    for (var i = 0; i < data.exam_subjects.length; i++) {
                        if(data.exam_subjects[i].class_ranking_change==null){
                            data.exam_subjects[i].class_ranking_change=0;
                        }
                        $("#study_q_i_btn_05c").append('<tr><td>' + data.exam_subjects[i].name + '</td><td>' + data.exam_subjects[i].score + '</td><td>' + data.exam_subjects[i].level + '</td><td>' + data.exam_subjects[i].class_rank + '</td><td style="color:#fb7d8a">' + data.exam_subjects[i].class_ranking_change + '<i class="iconfont">&#xe627;</i></td><td><span data-exno="'+ data.exam_subjects[i].exam_no +'">查看答题卡</span></td><td>点评</td></tr>');

                    }
                    // $(".study_q_i_btn_05").unbind("click");
                    $(".study_q_i_btn_05").attr('a', '2');
                }
                },
                error: function() {

                }


            });


            // 小题查看     
            $.ajax({
                type: "GET",
                url: ajaxIp + "/api/v2/reports/class_answer_setting_statistic",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "classroom_id": class_id,
                    "item":"0",

                },
                success: function(data) {
                console.log(data);
                 if(data.error_code!==500){
                     $(".study_q_05_tb").html(" ");
                    var c = Math.round((data[0].correct_rate * 100)) + "%";
                    $(".study_q_05_tb").append('<tr><td rowspan="' + data.length + '">一、选择题</td><td>' + data[0].average + '</td><td>' + data[0].num + '</td><td>' + data[0].column_value_1 + '</td><td>' + data[0].column_value_2 + '</td><td>' + data[0].column_value_3 + '</td><td>' + data[0].column_value_4 + '</td><td>' + data[0].correct + '</td><td>' + c + '</td><td><span data-id="1" data_ans="' + data[0].answer_setting_id + '">查看</span></td></tr>');
                    switch (data[0].correct) {
                        case "A":
                            $(".study_q_05_tb tr").eq(0).find("td").eq(3).css("color", "#fb7d8a");
                            break;
                        case "B":
                            $(".study_q_05_tb tr").eq(0).find("td").eq(4).css("color", "#fb7d8a");
                            break;
                        case "C":
                            $(".study_q_05_tb tr").eq(0).find("td").eq(5).css("color", "#fb7d8a");
                            break;
                        case "D":
                            $(".study_q_05_tb tr").eq(0).find("td").eq(6).css("color", "#fb7d8a");
                            break;
                    }



                    for (var i = 1; i < data.length; i++) {
                        var a = i + 1;
                        var b = Math.round((data[i].correct_rate * 100)) + "%";

                        $(".study_q_05_tb").append('<tr><td>' + data[i].average + '</td><td>' + data[i].num + '</td><td>' + data[i].column_value_1 + '</td><td>' + data[i].column_value_2 + '</td><td>' + data[i].column_value_3 + '</td><td>' + data[i].column_value_4 + '</td><td>' + data[i].correct + '</td><td>' + b + '</td><td><span data-id="' + a + '" data_ans="' + data[i].answer_setting_id + '">查看</span></td></tr>');

                        switch (data[i].correct) {
                            case "A":
                                $(".study_q_05_tb tr").eq(i).find("td").eq(2).css("color", "#fb7d8a");
                                break;
                            case "B":
                                $(".study_q_05_tb tr").eq(i).find("td").eq(3).css("color", "#fb7d8a");
                                break;
                            case "C":
                                $(".study_q_05_tb tr").eq(i).find("td").eq(4).css("color", "#fb7d8a");
                                break;
                            case "D":
                                $(".study_q_05_tb tr").eq(i).find("td").eq(5).css("color", "#fb7d8a");
                                break;
                        }

                    }
                }
                },
                error: function() {

                }


            });

            // 小题查看
            $(".study_q_05_tb").on('click', 'span', function(event) {
                // 切换页面
                $(".study_q_ck").show();
                $("#study_q_ck").hide();
                 $(".xiaoti_mark02").hide();
                 $(".xiaoti_mark").show();
                $("#study_q_ck_i").click(function(event) {
                    /* Act on the event */
                    $(".study_q_ck").hide();
                    $("#study_q_ck").show();

                });

                // 切换页面 end
                $(".study_q_xuan_a").html(" ");
                $(".study_q_xuan_b").html(" ");
                $(".study_q_xuan_c").html(" ");
                $(".study_q_xuan_d").html(" ");
                var data_ans = $(this).attr("data_ans");


                var a = $(".study_q_km01").children('option:selected').val();
                $(".study_q_ck_biao").html(a);
                // alert();
                $(".study_q_ck_a1").html($(this).attr("data-id"));
                var xuan_z = $(this).parents().prev().prev().html();
                console.log(xuan_z);
                $(".study_q_ck_a2").html("正确答案" + $(this).parents().prev().prev().html());
                $.ajax({
                    type: "GET",
                    url: ajaxIp + "/api/v2/reports/class_student_answer_setting_statistic",
                    headers: {
                        'Authorization': "Bearer " + isLogin
                    },
                    data: {
                        "exam_id": exam_id,
                        "subject_id": sub_id,
                        "classroom_id": class_id,
                        "answer_setting_id": data_ans
                    },
                    success: function(data) {
                        console.log(data);
                        var a = data.student_answer_setting_infos;
                        for (var i = 0; i < a[0].A.length; i++) {
                            $(".study_q_xuan_a").append('<a>' + a[0].A[i].real_name + '</a>')
                        }
                        for (var i = 0; i < a[1].B.length; i++) {
                            $(".study_q_xuan_b").append('<a>' + a[1].B[i].real_name + '</a>')
                        }
                        for (var i = 0; i < a[2].C.length; i++) {
                            $(".study_q_xuan_c").append('<a>' + a[2].C[i].real_name + '</a>')
                        }
                        for (var i = 0; i < a[3].D.length; i++) {
                            $(".study_q_xuan_d").append('<a>' + a[3].D[i].real_name + '</a>')
                        }

                        switch (xuan_z) {
                            case "A":
                                $(".xiaoti_mark tr").eq(0).find("td").eq(1).find("a").css("background", "#fb7d8a");
                                break;
                            case "B":
                                $(".xiaoti_mark tr").eq(1).find("td").eq(1).find("a").css("background", "#fb7d8a");
                                break;
                            case "C":
                                $(".xiaoti_mark tr").eq(2).find("td").eq(1).find("a").css("background", "#fb7d8a");
                                break;
                            case "D":
                                $(".xiaoti_mark tr").eq(3).find("td").eq(1).find("a").css("background", "#fb7d8a");
                                break;
                        }
                    },
                    error: function() {

                    }


                });
            });

            // 小题查看结束
// 小题判断题
        $.ajax({
            type: "GET",
            url: ajaxIp +"/api/v2/reports/class_answer_setting_statistic",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            data: {
                "exam_id": exam_id,
                "subject_id": sub_id,
                "classroom_id": class_id,
                "item":"2",
            },
            success: function(data) {
              console.log(data);
               $(".study_q_05_tb02").html(" ");
              var a = Math.round((data[0].correct_rate * 100)) + "%";
               $(".study_q_05_tb02").append('<tr><td rowspan="'+data.length+'">二、判断题</td><td>'+data[0].average+'</td><td>'+data[0].num+'</td><td>'+data[0].column_value_1+'</td><td>'+data[0].column_value_2+'</td><td>'+data[0].correct+'</td><td>'+a+'</td><td><span>查看</span></td></tr>')

              for(var i=1;i<data.length;i++){
             var c = Math.round((data[i].correct_rate * 100)) + "%";
              $(".study_q_05_tb02").append('<tr><td>'+data[i].average+'</td><td>'+data[i].num+'</td><td>'+data[i].column_value_1+'</td><td>'+data[i].column_value_2+'</td><td>'+data[i].correct+'</td><td>'+c+'</td><td><span>查看</span></td></tr>')

              }
            },
            error: function() {

            }
        });
    


        };

    
    // 判断题查看
    $(".study_q_05_tb02").on('click', 'span', function(event) {
        // 切换页面
        $(".study_q_ck").show();
        $("#study_q_ck").hide();
        $(".xiaoti_mark").hide();
        $(".xiaoti_mark02").show();
        $("#study_q_ck_i").click(function(event) {
            /* Act on the event */
            $(".study_q_ck").hide();
            $("#study_q_ck").show();

        });

        $.ajax({
            type: "GET",
            url: ajaxIp + "/api/v2/reports/class_student_answer_setting_statistic",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            data: {
                "exam_id": "1",
                "subject_id": "13",
                "classroom_id": "102",
                "item":"2",
                // "answer_setting_id": "9980"
            },
            success: function(data) {
                console.log(data);
            },
            error: function() {
                /* Act on the event */
            }
        });



    });

// 班级学情追中的导出报表
    function study_q_bb() {
        var exam_id = parseInt($(".study_q_km01").children('option:selected').attr("data-id"));
        $(".study_q_km02").attr("data-id", $(".study_q_km02").children('option:selected').attr("data-id"));
        var class_id = parseInt($(".study_q_km02").attr("data-id"));
        if (class_id == null) {
            var class_id = parseInt($(".study_q_km02").attr("data-id"));
        }
        $(".study_q_km03").attr("data-id", $(".study_q_km03").children('option:selected').attr("data-id"));
        var sub_id = parseInt($(".study_q_km03").attr("data-id"));
        if (sub_id == null) {
            var sub_id = parseInt($(".study_q_km03").attr("data-id"));
        }

        console.log(exam_id);
        console.log(class_id);
        console.log(sub_id);
        // 第一个导出
        $.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/reports/export_class_basic_situation",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            data: {
                "exam_id": exam_id,
                "subject_id":sub_id,
                "classroom_id":class_id,
            },
            success: function(data) {
                console.log(data);
                $(".study_q_i_btn_01").parent().attr("href", ajaxIp + data.file_path);
            },
            error: function() {}
        });
        // 第二个导出
        $.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/reports/export_socre_distribution",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            data: {
                 "exam_id": exam_id,
                "subject_id":sub_id,
                "classroom_id":class_id,
            },
            success: function(data) {
                console.log(data);
                $(".study_q_i_btn_02").parent().attr("href", ajaxIp + data.file_path);
            },
            error: function() {}
        });
        // 第三个导出
        $.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/reports/export_class_ranking_range",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            data: {
                 "exam_id": exam_id,
                "subject_id":sub_id,
                "classroom_id":class_id,
            },
            success: function(data) {
                console.log(data);
                $(".study_q_i_btn_03").parent().attr("href", ajaxIp + data.file_path);
            },
            error: function() {}
        });
        // 第四个导出
        $.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/reports/export_class_rank_five",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            data: {
                 "exam_id": exam_id,
                "subject_id":sub_id,
                "classroom_id":class_id,
            },
            success: function(data) {
                console.log(data);
                $(".study_q_i_btn_04").parent().attr("href", ajaxIp + data.file_path);
            },
            error: function() {}
        });
        // 第6个导出
        $.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/reports/export_class_students",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            data: {
                 "exam_id": exam_id,
                "subject_id":sub_id,
                "classroom_id":class_id,
            },
            success: function(data) {
                console.log(data);
                $(".study_q_i_btn_06").parent().attr("href", ajaxIp + data.file_path);
            },
            error: function() {}
        });
    };















        // 分数段分布插件
        function study_q_fd(a,b) {
            var myChart = echarts.init(document.getElementById('study_q_03_02'));

            var option = {

                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    x: 28,
                    y: 23,
                    x2:30,
                    y2: 45,
                    borderWidth: 1,
                },

                calculable:false,
                xAxis: [{
                    type: 'category',
                    // boundaryGap : false,
                    data:a,
                     axisLabel:{
                     rotate: 40,
                      margin:5,
                      textStyle:{
                        color:"666666",
                        align:'left',
                        fontWeight: '300',
                        fontFamily: 'Arial',
                        // fontStyle: 'normal',
                      }    
                     },
                }],

                yAxis: [{
                    type: 'value',
                }],
                series: [{
                    name: '人数',
                    type: 'bar',
                    data:b,
                    markPoint: {
                        data: [{
                            type: 'max',
                            name: '最大值'
                        }, {
                            type: 'min',
                            name: '最小值'
                        }]
                    },
                    markLine: {
                        data: [{
                            type: 'average',
                            name: '平均值'
                        }]
                    }
                }]
            };
            // 为echarts对象加载数据 
            myChart.setOption(option);
        };



        // 查看答题卡
        //  $.ajax({
        //     type: "POST",
        //     url: ajaxIp + "/api/v2/scanner_images/student_scanner_images",
        //     headers: {
        //         'Authorization': "Bearer " + isLogin
        //     },
        //     data: {
        //          "exam_id": exam_id,
        //         "subject_id":sub_id,
        //         "classroom_id":class_id,
        //     },
        //     success: function(data) {
        //         console.log(data);
        //     },
        //     error: function() {}
        // });





        $("#img_add").click(function(event) {
            /* Act on the event */
            var a = $("#ans_img").height();
            var b = $("#ans_img").width();
            a2 = a + 20;
            b2 = b + 20;
            $("#ans_img").height(a2);
            $("#ans_img").width(b2);

        });

        $("#img_up").click(function(event) {
            /* Act on the event */

            var a = $("#ans_img").height();
            var b = $("#ans_img").width();
            a2 = a - 20;
            b2 = b - 20;

            $("#ans_img").height(a2);
            $("#ans_img").width(b2);
        });
        $(function() {
            $("#ans_img").draggable();
        });


  $(".study_q_06_tab").on('click', 'span', function(event) {
    $(".ans").show();
    var exam_id = parseInt($(".study_q_km01").children('option:selected').attr("data-id"));
    $(".study_q_km02").attr("data-id", $(".study_q_km02").children('option:selected').attr("data-id"));
    var class_id = parseInt($(".study_q_km02").attr("data-id"));
    if (class_id == null) {
      var class_id = parseInt($(".study_q_km02").attr("data-id"));
    }
    $(".study_q_km03").attr("data-id", $(".study_q_km03").children('option:selected').attr("data-id"));
    var sub_id = parseInt($(".study_q_km03").attr("data-id"));
    if (sub_id == null) {
      var sub_id = parseInt($(".study_q_km03").attr("data-id"));
    }
    var exon_id=$(this).attr("data-exno")
    $.ajax({
      type: "POST",
      url: ajaxIp + "/api/v2/scanner_images/student_scanner_images",
      headers: {
        'Authorization': "Bearer " + isLogin
      },
      data: {
        "exam_id":exam_id,
        "subject_id":sub_id,
        "exam_no": exon_id,
      },
      success: function(data) {
        console.log(data);
        $(".ans_02 a").remove();
        for (var i = 0; i < data.length; i++) {
          var a = i + 1
          $(".ans_02").append('<a>' + a + '</a>');
        }
        $(".ans_02 a").eq(0).addClass('ye_a');
        $("#ans_img").attr("src", ajaxIp + data[0].done_image_url);
        $(".ans_02").on('click', 'a', function(event) {
          $(this).addClass('ye_a').siblings().removeClass('ye_a');
          var b = $(this).index() - 1;
          $("#ans_img").attr("src", ajaxIp + data[b].done_image_url);
        });
      },
      error: function() {}
    });

  });


        $(".ans_01 i").click(function(event) {
            /* Act on the event */

            $(".ans").hide();
        });
        // <!--最新班级学情追踪 end-->



    })
    .controller("form04Controller", function() {
        $(".main_left a").eq(3).addClass('li_click').siblings().removeClass("li_click");
        $("#index_span").html($(".main_left a").eq(3).html());
        $("#study_k_left").css("margin-bottom", "220px");
        $(".study_k_left").show();
        $("#study_k_left").siblings("a").click(function(event) {
            /* Act on the event */
            $("#study_k_left").css("margin-bottom", "15px");
            $(".study_k_left").hide();
        });
        var isLogin = localStorage.getItem("token");
        // <!--最新学科追踪分析 start-->
            $(".study_k_left li").eq(0).css("color","#31bc91").siblings().css("color", "#999999");
            $(".study_k_left li").click(function(event) {
            $(this).css("color", "#31bc91").siblings().css("color", "#999999");
            $(".study_k_b").html($(this).html());
            $(".study_k_tab div").eq($(this).index()).show().siblings().hide();
            if ($(this).index() == "2" || $(this).index() == "3" || $(this).index() == "4" || $(this).index() == "1") {
                $(".study_k_101 span").eq(2).hide();
            } else {

                $(".study_k_101 span").eq(2).show();
            }
            // 导出按钮ID不同的值
            $(".study_k_101 button").attr("data-id", $(this).index());


        });
        // 导出button点击 /download/学科综合分析_20170825110502.xlsx
        // var ajaxUrl = "http://192.168.1.117:3000"
        // 学科追踪分析第一个导出报表
     

    function study_k_bb01(){
        var exam_id =$(".study_k_km01").children('option:selected').attr("data-id");
        $(".study_k_km02").attr("data-id", $(".study_k_km02").children('option:selected').attr("data-id"));
        var class_id =$(".study_k_km02").attr("data-id");
        if (class_id == null) {
            var class_id =$(".study_k_km02").attr("data-id");
        }
        $(".study_k_km03").attr("data-id", $(".study_k_km03").children('option:selected').attr("data-id"));
        var sub_id =$(".study_k_km03").attr("data-id");
        if (sub_id == null) {
            var sub_id =$(".study_k_km03").attr("data-id");
        };
        console.log(exam_id);
        console.log(class_id);
        console.log(sub_id);
        $.ajax({
            type:"POST",
            async:false,
            url: ajaxIp + "/api/v2/reports/export_subject_integrated",
            headers: {
                'Authorization': "Bearer " + isLogin,
            },
            data:{
                "exam_id":exam_id,
                "subject_id":sub_id,
                "classroom_id":class_id,
            },
            success: function(data) {
                console.log(data);
                console.log(data.file_path);
                $(".study_k_101 button").parent().attr("href",ajaxIp + data.file_path);

            },
            error: function() {}

        });

    };


    function study_k_bb02() {
        var exam_id = parseInt($(".study_k_km01").children('option:selected').attr("data-id"));
        $(".study_k_km02").attr("data-id", $(".study_k_km02").children('option:selected').attr("data-id"));
        var class_id = parseInt($(".study_k_km02").attr("data-id"));
        if (class_id == null) {
            var class_id = parseInt($(".study_k_km02").attr("data-id"));
        }
        $(".study_k_km03").attr("data-id", $(".study_k_km03").children('option:selected').attr("data-id"));
        var sub_id = parseInt($(".study_k_km03").attr("data-id"));
        if (sub_id == null) {
            var sub_id = parseInt($(".study_k_km03").attr("data-id"));
        }
        $.ajax({
            type: "POST",
            async: false,
            url: ajaxIp + "/api/v2/reports/export_total_points_and_ranking",
            headers: {
                'Authorization': "Bearer " + isLogin,
            },
            data: {
                "exam_id": exam_id,
                "subject_id": sub_id,
                "classroom_id": class_id,
            },
            success: function(data) {
                console.log(data);
                console.log(data.file_path);
                $(".study_k_101 button").parent().attr("href", ajaxIp + data.file_path);

            },
            error: function() {

            }

        });

    };

    function study_k_bb03() {
        var exam_id = parseInt($(".study_k_km01").children('option:selected').attr("data-id"));
        $(".study_k_km02").attr("data-id", $(".study_k_km02").children('option:selected').attr("data-id"));
        var class_id = parseInt($(".study_k_km02").attr("data-id"));
        if (class_id == null) {
            var class_id = parseInt($(".study_k_km02").attr("data-id"));
        }
        $(".study_k_km03").attr("data-id", $(".study_k_km03").children('option:selected').attr("data-id"));
        var sub_id = parseInt($(".study_k_km03").attr("data-id"));
        if (sub_id == null) {
            var sub_id = parseInt($(".study_k_km03").attr("data-id"));
        }
        $.ajax({
            type: "POST",
            async: false,
            url: ajaxIp + "/api/v2/reports/export_single_and_level",
            headers: {
                'Authorization': "Bearer " + isLogin,
            },
            data: {
                "exam_id": exam_id,
                "classroom_id": class_id,
            },
            success: function(data) {
                console.log(data);
                console.log(data.file_path);
                $(".study_k_101 button").parent().attr("href", ajaxIp + data.file_path);

            },
            error: function() {

            }

        });

    };

    function study_k_bb04() {
        var exam_id = parseInt($(".study_k_km01").children('option:selected').attr("data-id"));
        $(".study_k_km02").attr("data-id", $(".study_k_km02").children('option:selected').attr("data-id"));
        var class_id = parseInt($(".study_k_km02").attr("data-id"));
        if (class_id == null) {
            var class_id = parseInt($(".study_k_km02").attr("data-id"));
        }
        $(".study_k_km03").attr("data-id", $(".study_k_km03").children('option:selected').attr("data-id"));
        var sub_id = parseInt($(".study_k_km03").attr("data-id"));
        if (sub_id == null) {
            var sub_id = parseInt($(".study_k_km03").attr("data-id"));
        }
        $.ajax({
            type: "POST",
            async: false,
            url: ajaxIp + "/api/v2/reports/export_all_subjects_ranking",
            headers: {
                'Authorization': "Bearer " + isLogin,
            },
            data: {
                "exam_id": exam_id,
                "classroom_id": class_id,
            },
            success: function(data) {
                console.log(data);
                console.log(data.file_path);
                $(".study_k_101 button").parent().attr("href", ajaxIp + data.file_path);

            },
            error: function() {

            }

        });

    };
    function study_k_bb05() {
        var exam_id = parseInt($(".study_k_km01").children('option:selected').attr("data-id"));
        $(".study_k_km02").attr("data-id", $(".study_k_km02").children('option:selected').attr("data-id"));
        var class_id = parseInt($(".study_k_km02").attr("data-id"));
        if (class_id == null) {
            var class_id = parseInt($(".study_k_km02").attr("data-id"));
        }
        $(".study_k_km03").attr("data-id", $(".study_k_km03").children('option:selected').attr("data-id"));
        var sub_id = parseInt($(".study_k_km03").attr("data-id"));
        if (sub_id == null) {
            var sub_id = parseInt($(".study_k_km03").attr("data-id"));
        }
        $.ajax({
            type: "POST",
            async: false,
            url: ajaxIp + "/api/v2/reports/export_chinese_math_english_ranking",
            headers: {
                'Authorization': "Bearer " + isLogin,
            },
            data: {
                "exam_id": exam_id,
                "classroom_id": class_id,
            },
            success: function(data) {
                console.log(data);
                console.log(data.file_path);
                $(".study_k_101 button").parent().attr("href", ajaxIp + data.file_path);

            },
            error: function() {

            }

        });

    };

    function study_k_bb06() {
        var exam_id = parseInt($(".study_k_km01").children('option:selected').attr("data-id"));
        $(".study_k_km02").attr("data-id", $(".study_k_km02").children('option:selected').attr("data-id"));
        var class_id = parseInt($(".study_k_km02").attr("data-id"));
        if (class_id == null) {
            var class_id = parseInt($(".study_k_km02").attr("data-id"));
        }
        $(".study_k_km03").attr("data-id", $(".study_k_km03").children('option:selected').attr("data-id"));
        var sub_id = parseInt($(".study_k_km03").attr("data-id"));
        if (sub_id == null) {
            var sub_id = parseInt($(".study_k_km03").attr("data-id"));
        }
        $.ajax({
            type: "POST",
            async: false,
            url: ajaxIp + "/api/v2/reports/export_student_details",
            headers: {
                'Authorization': "Bearer " + isLogin,
            },
            data: {
                "exam_id": exam_id,
                "subject_id": sub_id,
                "classroom_id": class_id,
            },
            success: function(data) {
                console.log(data);
                console.log(data.file_path);
                $(".study_k_101 button").parent().attr("href", ajaxIp + data.file_path);

            },
            error: function() {

            }

        });

    };
    $(".study_k_left_ul").on('click', 'li', function(event) {
        var btn_id = $(".study_k_101 button").attr("data-id");

        console.log(btn_id);
        switch (btn_id) {
            case "0":
                study_k_bb01();
                break;
            case "1":
                study_k_bb02();

                break;
            case "2":
                study_k_bb03();

                break;
            case "3":
                study_k_bb04();

                
                break;
            case "4":
                study_k_bb05();

                break;
            case "5":
                study_k_bb06();

                break;

        }



    });

        // 最新学科综合分析
        // 科目
        $.ajax({
            type: "GET",
            async:false,
            url: ajaxIp + "/api/v2/reports/exams",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    $(".study_k_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                };
                for (var i = 0; i < data[0].classrooms.length; i++) {
                    $(".study_k_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                     $(".study_k_km02").attr("data-id",data[0].classrooms[0].classroom_id);
                };
                for (var i = 0; i < data[0].subjects.length; i++) {
                    $(".study_k_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                    $(".study_k_km03").attr("data-id",data[0].subjects[0].subject_id);
                };

                $(".study_k_km01").change(function(event) {
                    /* Act on the event */
                    var index01 = $(".study_k_km01").children('option:selected').index()
                    var index02 = index01;
                    // $(".study_q_km01 option").eq(0).remove();
                    $(".study_k_km02 option").remove();
                    $(".study_k_km03 option").remove();
                    for (var i = 0; i < data[index02].classrooms.length; i++) {
                        $(".study_k_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>')
                        $(".study_k_km02").attr("data-id",data[index02].classrooms[0].classroom_id);
                    }
                    for (var i = 0; i < data[index02].subjects.length; i++) {
                        $(".study_k_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                        $(".study_k_km03").attr("data-id",data[index02].subjects[0].subject_id);
                    }
                 
                });
                 study_k();
                 study_k_bb01();
            },

            error: function() {

            }
        });

        // 科目 end
        // 学科综合分析

    $(".study_k_101 select").change(function(event) {
        /* Act on the event */
        $(".study_k_102_bo").html(" ");
        $(".study_k_201_bo").html(" ");
        $(".study_k_301_bo").html(" ");
        $(".study_k_401_bo").html(" ");
        $(".study_k_501_bo").html(" ");
        $(".study_k_601_bo").html(" ");
        study_k();
// 导出报表
var a=$(".study_k_101 button").attr("data-id");
        if(a==0){
         study_k_bb01();
        };
        if(a==1){
         study_k_bb02();
        };
        if(a==2){
         study_k_bb03();
        };
        if(a==3){
         study_k_bb04();
        };
        if(a==4){
         study_k_bb05();
        };
       if(a==5){
         study_k_bb06();
        };
    });

        function study_k() {
            var exam_id = parseInt($(".study_k_km01").children('option:selected').attr("data-id"));
             $(".study_k_km02").attr("data-id",$(".study_k_km02").children('option:selected').attr("data-id"));
             var class_id = parseInt($(".study_k_km02").attr("data-id"));
             if(class_id==null){
                 var class_id = parseInt($(".study_k_km02").attr("data-id"));
             } 
             $(".study_k_km03").attr("data-id",$(".study_k_km03").children('option:selected').attr("data-id"));
             var sub_id = parseInt($(".study_k_km03").attr("data-id"));
            if(sub_id==null){
                 var sub_id = parseInt($(".study_k_km03").attr("data-id"));
             } 
            console.log(exam_id);
            console.log(class_id);  
            console.log(sub_id); 
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/subject_integrated",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "classroom_id": class_id,
                },
                success: function(data) {
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        $(".study_k_102_bo").append('<tr><td>' + data[i].id + '</td><td>' + data[i].class_name + '</td><td>' + data[i].subject_name + '</td><td>' + data[i].id + '</td><td>' + data[i].average + '</td><td>' + data[i].highest_score + '</td><td>' + data[i].lowest_score + '</td><td>' + data[i].range + '</td><td>' + data[i].fine_number + '</td><td>' + data[i].fine_rate + '</td><td>' + data[i].pass_number + '</td><td>' + data[i].pass_rate + '</td><td>' + data[i].fail_number + '</td><td>' + data[i].standard_deviation + '</td></tr>');
                    }


                },
                error: function() {}

            });
            // 导出



            // 总分排名

            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/total_points_and_ranking",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "classroom_id": class_id,
                },
                success: function(data) {
                    console.log(data);
                    $(".study_k_201_he").html(" ");
                      $(".study_k_201_bo").html(" ");
                    for (var i = 0; i < data.titile.length; i++) {

                        $(".study_k_201_he").append('<th>' + data.titile[i] + '</th>');
                    };


                    for (var i = 0; i < data.data.length; i++) {
                        var a = data.data[i];
                        $(".study_k_201_bo").append('<tr></tr>');

                        for (var c = 0; c < a.length; c++) {
                            $(".study_k_201_bo tr").eq(i).append('<td>' + a[c] + '</td>');
                        }

                    }

                },
                error: function() {

                }

            });



            // 单科等级
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/single_and_level",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "classroom_id": class_id,
                },
                success: function(data) {
                    console.log(data);
                    $(".study_k_301_he").html(" ");
                      $(".study_k_301_bo").html(" ");
                    for (var i = 0; i < data.titile.length; i++) {

                        $(".study_k_301_he").append('<th>' + data.titile[i] + '</th>');
                    };


                    for (var i = 0; i < data.data.length; i++) {
                        var a = data.data[i];
                        $(".study_k_301_bo").append('<tr></tr>');

                        for (var c = 0; c < a.length; c++) {
                            $(".study_k_301_bo tr").eq(i).append('<td>' + a[c] + '</td>');
                        }

                    }


                },
                error: function() {}

            });
            // 各科成绩名次

            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/all_subjects_ranking",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "classroom_id": class_id,
                },
                success: function(data) {
                    console.log(data);
                    $(".study_k_401_he").html(" ");
                      $(".study_k_401_bo").html(" ");
                    for (var i = 0; i < data.titile.length; i++) {

                        $(".study_k_401_he").append('<th>' + data.titile[i] + '</th>');
                    };


                    for (var i = 0; i < data.data.length; i++) {
                        var a = data.data[i];
                        $(".study_k_401_bo").append('<tr></tr>');

                        for (var c = 0; c < a.length; c++) {
                            $(".study_k_401_bo tr").eq(i).append('<td>' + a[c] + '</td>');
                        }

                    }


                },
                error: function() {}

            });
            // 语数外综合名次

            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/chinese_math_english_ranking",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "classroom_id": class_id,
                },
                success: function(data) {
                    console.log(data);
                    $(".study_k_501_he").html(" ");
                      $(".study_k_501_bo").html(" ");
                    for (var i = 0; i < data.titile.length; i++) {

                        $(".study_k_501_he").append('<th>' + data.titile[i] + '</th>');
                    };


                    for (var i = 0; i < data.data.length; i++) {
                        var a = data.data[i];
                        $(".study_k_501_bo").append('<tr></tr>');

                        for (var c = 0; c < a.length; c++) {
                            $(".study_k_501_bo tr").eq(i).append('<td>' + a[c] + '</td>');
                        }

                    }


                },
                error: function() {

                }

            });
            // 学生详细成绩单

            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/student_details",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "classroom_id": class_id,
                },
                success: function(data) {
                    console.log(data);
                    $(".study_k_601_he").html(" ");
                      $(".study_k_601_bo").html(" ");
                    for (var i = 0; i < data.titile.length; i++) {

                        $(".study_k_601_he").append('<th>' + data.titile[i] + '</th>');
                    };


                    for (var i = 0; i < data.data.length; i++) {
                        var a = data.data[i];
                        $(".study_k_601_bo").append('<tr></tr>');

                        for (var c = 0; c < a.length; c++) {
                            $(".study_k_601_bo tr").eq(i).append('<td>' + a[c] + '</td>');
                        }

                    }


                },
                error: function() {

                }

            });

        }
        /*<!--最新学科追踪分析 end-->*/

    })
    .controller("form05Controller", function() {
        $(".main_left a").eq(4).addClass('li_click').siblings().removeClass("li_click");
        $("#index_span").html($(".main_left a").eq(4).html());
        $(".exam_z_101 span").eq(1).hide();
        $("#exam_z_left").css("margin-bottom", "130px");
        $(".exam_z_left").show();
        $("#exam_z_left").siblings("a").click(function(event) {
            /* Act on the event */
            $("#exam_z_left").css("margin-bottom", "15px");
            $(".exam_z_left").hide();
        });
        var isLogin = localStorage.getItem("token");
        

        $(".exam_z_left li").eq(0).css("color", "#31bc91").siblings().css("color", "#999999");
        $(".exam_z_left li").click(function(event) {
            /* Act on the event */

            $(this).css("color", "#31bc91").siblings().css("color", "#999999");
            $(".exam_z_b").html($(this).html());
            $(".exam_z_tab div").eq($(this).index()).show().siblings().hide();
            if ($(this).index() == 0) {
                $(".exam_z_101 span").eq(1).hide();
                // $(".exam_z_101 span").eq(2).hide();
            };

        });

        $("#exam_z_left_2l").click(function(event) {
            /* Act on the event */
            $(".exam_z_101 span").eq(1).show();
            $(".exam_z_101 span").eq(2).show();
        });

        $("#exam_z_left_3l").click(function(event) {
            /* Act on the event */
            $(".exam_z_101 span").eq(1).hide();
             $(".exam_z_101 span").eq(2).show();
        });

        // 科目
        $.ajax({
            type: "GET",
            async:false,
            url: ajaxIp + "/api/v2/reports/exams",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
                console.log(data);
                 $(".exam_z_km03").append('<option value="全部科目" data-id="">全部科目</option>'); 
                for (var i = 0; i < data.length; i++) {
                    $(".exam_z_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                };

                for (var i = 0; i < data[0].classrooms.length; i++) {
                    $(".exam_z_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                     $(".exam_z_km02").attr("data-id",data[0].classrooms[0].classroom_id);
                };
                for (var i = 0; i < data[0].subjects.length; i++) {
                    $(".exam_z_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                    $(".exam_z_km03").attr("data-id",data[0].subjects[0].subject_id);
                };
                exam_z();
                $(".exam_z_km01").change(function(event) {
                    /* Act on the event */
                    var index01 = $(".exam_z_km01").children('option:selected').index();
                    var index02 = index01;
                    // $(".study_q_km01 option").eq(0).remove();
                    $(".exam_z_km02 option").remove();
                    $(".exam_z_km03 option").remove();
                    $(".exam_z_km03").append('<option value="全部科目" data-id="">全部科目</option>');
                    for (var i = 0; i < data[index02].classrooms.length; i++) {
                        $(".exam_z_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>')
                         $(".exam_z_km02").attr("data-id",data[index02].classrooms[0].classroom_id);
                    }
                    for (var i = 0; i < data[index02].subjects.length; i++) {
                        $(".exam_z_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                        $(".exam_z_km03").attr("data-id",data[index02].subjects[0].subject_id);
                    }
    
                });
            },
            error: function() {}
        });

        // 科目 end
    $(".exam_z_101 select").change(function(event) {
        /* Act on the event */
        $(".exam_z_102_he").html(" ");
        $(".exam_z_201_he").html(" ");
        $(".exam_z_102_bo").html(" ");
        $(".exam_z_201_bo").html(" ");
        $(".exam_z_301_bo").html(" ");
        exam_z();
        var a=$(".exam_z_101 button").attr("data-id");
        if(a==0){
         exam_z_bb01();
        };
        if(a==1){
         exam_z_bb02();
        };
    });
function exam_z(){
        // 试卷质量
           var exam_id = $(".exam_z_km01").children('option:selected').attr("data-id");
             $(".exam_z_km02").attr("data-id",$(".exam_z_km02").children('option:selected').attr("data-id"));
             var class_id =$(".exam_z_km02").attr("data-id");
             if(class_id==null){
                 var class_id = $(".exam_z_km02").attr("data-id");
             } 
             $(".exam_z_km03").attr("data-id",$(".exam_z_km03").children('option:selected').attr("data-id"));
             var sub_id = $(".exam_z_km03").attr("data-id");
            // if(sub_id==null){
            //      var sub_id = $(".exam_z_km03").attr("data-id");
            //  } 
            console.log(exam_id);
            console.log(class_id);  
            console.log(sub_id);    
            $.ajax({
                type: "POST",
                url:ajaxIp + "/api/v2/reports/paper_quality",
                headers: {
                    'Authorization': "Bearer " + isLogin

                },
                data: {
                    "exam_id":exam_id,
                    "subject_id":sub_id,
                },
                success: function(data) {
                    console.log(data);
                    for (var i = 0; i < data.titile.length; i++) {

                        $(".exam_z_102_he").append('<th>' + data.titile[i] + '</th>');
                    };
                    for (var i = 0; i < data.data.length; i++) {

                        $(".exam_z_102_bo").append('<tr><td>' + data.data[i].subject_name + '</td><td>' + data.data[i].difficult + '</td><td>' + data.data[i].discrimination + '</td><td>' + data.data[i].reliability + '</td><td>' + data.data[i].full_marks_count + '</td></tr>');
                    };

                },
                error: function() {

                }

            });

// 各科逐题质量分析
        $.ajax({
            type: "POST",
            url:ajaxIp + "/api/v2/reports/answer_quality",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            data: {
                "exam_id":exam_id,
                "subject_id":sub_id,
                "classroom_id":class_id,
            },
            success: function(data) {
                console.log(data);
                 for (var i = 0; i < data.titile.length; i++) {

                        $(".exam_z_201_he").append('<th>' + data.titile[i] + '</th>');
                    };
                      for (var i = 0;i< data.data.length;i++) {
                        $(".exam_z_201_bo").append('<tr><td>' + data.data[i].name + '</td><td>' + data.data[i].num + '</td><td>' + data.data[i].score + '</td><td>' + data.data[i].correct_count + '</td><td>' + data.data[i].error_count + '</td><td>' + data.data[i].class_average + '</td><td>' + data.data[i].class_correct_rate + '</td><td>' + data.data[i].grade_average + '</td><td>' + data.data[i].grade_correct_rate + '</td><td>' + data.data[i].score_range + '</td><td>' + data.data[i].difficulty + '</td><td>' + data.data[i].range + '</td></tr>');
                    };

            },
            error: function() {

            }

        });

// 难度系数
   kaishi_zhi(0,0);
        /* Act on the event */
        $.ajax({
            type: "POST",
            url:ajaxIp+ "/api/v2/reports/degree_of_difficulty",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            data: {
                "exam_id":exam_id,
                "subject_id":sub_id,
            },
            success: function(data) {
                console.log(data);
                var a=[];
                var b=[];
                for(var i=0;i<data.length;i++){
                    a.push(data[i].num);
                    b.push(data[i].difficulty);
                }
              console.log(b);
              kaishi_zhi(a,b);

            },
            error: function() {

            }

        });

};
// 导出报表
exam_z_bb01();
 function exam_z_bb01() {
        var exam_id = $(".exam_z_km01").children('option:selected').attr("data-id");
             $(".exam_z_km02").attr("data-id",$(".exam_z_km02").children('option:selected').attr("data-id"));
             var class_id =$(".exam_z_km02").attr("data-id");
             if(class_id==null){
                 var class_id = $(".exam_z_km02").attr("data-id");
             } 
             $(".exam_z_km03").attr("data-id",$(".exam_z_km03").children('option:selected').attr("data-id"));
             var sub_id = $(".exam_z_km03").attr("data-id");
            if(sub_id==null){
                 var sub_id = $(".exam_z_km03").attr("data-id");
             } 
            console.log(exam_id);
            console.log(class_id);  
            console.log(sub_id);    
            $.ajax({
            type: "POST",
            async: false,
            url: ajaxIp + "/api/v2/reports/export_paper_quality",
            headers: {
                'Authorization': "Bearer " + isLogin,
            },
            data: {
                "exam_id": exam_id,
                "subject_id":sub_id,
            },
            success: function(data) {
                console.log(data);
                console.log(data.file_path);
                $(".exam_z_101 button").parent().attr("href", ajaxIp + data.file_path);

            },
            error: function() {

            }

        });

    };
 function exam_z_bb02() {
        var exam_id = $(".exam_z_km01").children('option:selected').attr("data-id");
             $(".exam_z_km02").attr("data-id",$(".exam_z_km02").children('option:selected').attr("data-id"));
             var class_id =$(".exam_z_km02").attr("data-id");
             if(class_id==null){
                 var class_id = $(".exam_z_km02").attr("data-id");
             } 
             $(".exam_z_km03").attr("data-id",$(".exam_z_km03").children('option:selected').attr("data-id"));
             var sub_id = $(".exam_z_km03").attr("data-id");
            if(sub_id==null){
                 var sub_id = $(".exam_z_km03").attr("data-id");
             } 

            console.log(exam_id);
            console.log(class_id);  
            console.log(sub_id);    
            $.ajax({
            type: "POST",
            async: false,
            url: ajaxIp + "/api/v2/reports/export_answer_quality",
            headers: {
                'Authorization': "Bearer " + isLogin,
            },
            data: {
                "exam_id": exam_id,
                "subject_id": sub_id,
                "classroom_id":class_id 

            },
            success: function(data) {
                console.log(data);
                console.log(data.file_path);
                $(".exam_z_101 button").parent().attr("href", ajaxIp + data.file_path);

            },
            error: function() {

            }

        });

    };




$(".exam_z_left_ul").on('click', 'li', function(event) {

  $(".exam_z_101 button").attr("data-id",$(this).index());

        var ul_id = $(this).index();

       if(ul_id==0){
        exam_z_bb01();
       };
       if(ul_id==1){
            exam_z_bb02();
       };
    });




// 难度系数变化图
function kaishi_zhi(a,b){
        var myChart = echarts.init(document.getElementById('exam_z_303'));

        var option = {

            grid: {
                x: 68,
                y: 30,
                x2: 10,
                y2: 25,
                borderWidth: 1
            },
            tooltip: {
                trigger: 'axis'
            },
            calculable:false,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data:a,
            }],
            yAxis: [{
                type: 'value',

               
            }],
            series: [{
                    name: '试题难度',
                    type: 'line',
                    data:b,
                    markPoint: {
                        data: [

                        ]
                    }
                }

            ]
        };

        // 为echarts对象加载数据 
        myChart.setOption(option);

}

        // <!-- 考试质量追踪  end-->

    })
    .controller("form06Controller", function() {

        $(".main_left a").eq(5).addClass('li_click').siblings().removeClass("li_click");
        $("#index_span").html($(".main_left a").eq(5).html());
        $("#exam_h_left").css("margin-bottom", "150px");
        $(".exam_h_left").show();
        $("#exam_h_left").siblings("a").click(function(event) {
            /* Act on the event */
            $("#exam_h_left").css("margin-bottom", "15px");
            $(".exam_h_left").hide();
        });
        var isLogin = localStorage.getItem("token");

        // <!-- 考试横向分析 start -->
        // 科目
        $.ajax({
            type: "GET",
            async:false,
            url: ajaxIp +"/api/v2/reports/exams",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
                console.log(data);
                

                for (var i = 0; i < data.length; i++) {
                    $(".exam_h_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                };
                for (var i = 0; i < data[0].classrooms.length; i++) {
                    $(".exam_h_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                    $(".exam_h_km02").attr("data-id",data[0].classrooms[0].classroom_id);
                };
                for (var i = 0; i < data[0].subjects.length; i++) {
                    $(".exam_h_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                    $(".exam_h_km03").attr("data-id",data[0].subjects[0].subject_id);
                };
                $(".exam_h_km01").change(function(event) {
                    /* Act on the event */
                    var index01 = $(".exam_h_km01").children('option:selected').index()
                    var index02 = index01;
                    // $(".study_q_km01 option").eq(0).remove();
                    $(".exam_h_km02 option").remove();
                    $(".exam_h_km03 option").remove();
                    for (var i = 0; i < data[index02].classrooms.length; i++) {
                        $(".exam_h_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>')
                        $(".exam_h_km02").attr("data-id",data[index02].classrooms[0].classroom_id);
                    }
                    for (var i = 0; i < data[index02].subjects.length; i++) {
                        $(".exam_h_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                       $(".exam_h_km03").attr("data-id",data[index02].subjects[0].subject_id);
                    }
                });
                 heng_zhong();
            },
            error: function() {
               
            }         

        });

        // 科目 end
        // 各班成绩
        // 横向总函数
        // 
        //     /* Act on the event */
        //     heng_zhong();
        // });
    $(".exam_h_101 select").change(function(event) {
        /* Act on the event */
        $(".exam_h_102_he").html(" ");
        $(".exam_h_201_he").html(" ");
        $(".exam_h_102_bo").html(" ");
        $(".exam_h_201_bo").html(" ");
        $(".exam_h_301_bo").html(" ");
        $(".exam_h_402_bo").html(" ");
        heng_zhong();
        var a=$(".exam_h_101 button").attr("data-id");
        if (a==0) {
            exam_h_bb01();
        };
        if (a==1) {
            exam_h_bb02();
        };
    });
        function heng_zhong() {
           var exam_id = parseInt($(".exam_h_km01").children('option:selected').attr("data-id"));
             $(".exam_h_km02").attr("data-id",$(".sexam_h_km02").children('option:selected').attr("data-id"));
             var class_id = parseInt($(".exam_h_km02").attr("data-id"));
             if(class_id==null){
                 var class_id = parseInt($(".exam_h_km02").attr("data-id"));
             } 
             $(".exam_h_km03").attr("data-id",$(".exam_h_km03").children('option:selected').attr("data-id"));
             var sub_id = parseInt($(".exam_h_km03").attr("data-id"));
            if(sub_id==null){
                 var sub_id = parseInt($(".exam_h_km03").attr("data-id"));
             } 

            console.log(exam_id);
            console.log(class_id);  
            console.log(sub_id);    
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/class_overall_contrast",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id":exam_id,
                },
                success: function(data) {
                    console.log(data);
                    var a = data[0];
                    var b = data[1];
                    for (var i = 0; i < a.length; i++) {
                        $(".exam_h_102_he").append('<th>' + a[i] + '</th>');
                    }
                    for (var i = 0; i < b.length; i++) {
                        $(".exam_h_102_bo").append('<tr><td>' + b[i].id + '</td><td>' + b[i].class_name + '</td><td>' + b[i].subject_name + '</td><td>' + b[i].class_average + '</td><td>' + b[i].ranking+ '</td><td>' + b[i].highest_score + '</td><td>' + b[i].lowest_score + '</td><td>' + b[i].standard_deviation + '</td><td>' + b[i].average_range + '</td></tr>');
                    }
                },
                error: function(data) { 
                    
                   
                },



            });
            // 班级等级
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/class_level_distribute",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id":exam_id,
                    // "classroom_id":class_id,
                },
                success: function(data) {
                    console.log(data);
                    for (var i = 0; i < data.titile.length; i++) {

                        $(".exam_h_201_he").append('<th>' + data.titile[i] + '</th>');
                    };
                    for (var i = 0; i < data.data.length; i++) {
                        var a = data.data[i];
                        $(".exam_h_201_bo").append('<tr></tr>');

                        for (var c = 0; c < a.length; c++) {
                            $(".exam_h_201_bo tr").eq(i).append('<td>' + a[c] + '</td>');
                        }

                    }

                },
                error: function() {

                }

            });


            // 总分分数段
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/total_section_contrast",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id":exam_id,
                    "classroom_id":class_id,
                },
                success: function(data) {
                    console.log(data);
                    if(data.length!==0){
                    var a = [];
                    var b = [];
                    var c = [];
                    for (var i = 0; i < data.length; i++) {
                        a.push(data[i].range_text);
                        b.push(data[i].grade_rate);
                        c.push(data[i].class_rate);
                    }
                    heng_z(a, b, c);
                }
                },
                error: function() {
                     var a = [];
                    var b = [];
                    var c = [];
                  heng_z(a, b, c);
                }

            });



            // 名次各班分布

            /* Act on the event */
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/class_ranking_distribute",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id":sub_id
                },
                success: function(data) {
                    console.log(data);
                    var a = [];
                    var b = [];
                    var c = {};
                    for (var i = 0; i < data.length; i++) {
                        var c = new Object();
                        $(".exam_h_402_bo").append('<tr><td>' + data[i].classroom_name + '</td><td>' + data[i].total_count + '</td></tr>')
                        a.push(data[i].classroom_name);
                        // for(var i=0;i<data.length;i++){
                        c["value"] = data[i].total_count;
                        c["name"] = data[i].classroom_name;
                        // }
                        b.push(c);

                    }

                    heng_m(a, b);
                },
                error: function() {
                     var a = [];
                     var b = [];
                    heng_m(a, b);
                }

            });

        };
// 导出报表
exam_h_bb01();
 function exam_h_bb01() {
        var exam_id = $(".exam_h_km01").children('option:selected').attr("data-id");
             $(".exam_h_km02").attr("data-id",$(".sexam_h_km02").children('option:selected').attr("data-id"));
             var class_id =$(".exam_h_km02").attr("data-id");
             if(class_id==null){
                 var class_id =$(".exam_h_km02").attr("data-id");
             } 
             $(".exam_h_km03").attr("data-id",$(".exam_h_km03").children('option:selected').attr("data-id"));
             var sub_id = $(".exam_h_km03").attr("data-id");
            if(sub_id==null){
                 var sub_id =$(".exam_h_km03").attr("data-id");
             } 
            console.log(exam_id);
            console.log(class_id);  
            console.log(sub_id);    
            $.ajax({
            type: "POST",
            async: false,
            url: ajaxIp + "/api/v2/reports/export_class_overall_contrast",
            headers: {
                'Authorization': "Bearer " + isLogin,
            },
            data: {
                "exam_id": exam_id,
            },
            success: function(data) {
                console.log(data);
               
                console.log(data.file_path);
                $(".exam_h_101 button").parent().attr("href", ajaxIp + data.file_path);

            },
            error: function() {
        
            }

        });

    };
 function exam_h_bb02() {
       var exam_id = $(".exam_h_km01").children('option:selected').attr("data-id");
             $(".exam_h_km02").attr("data-id",$(".sexam_h_km02").children('option:selected').attr("data-id"));
             var class_id =$(".exam_h_km02").attr("data-id");
             if(class_id==null){
                 var class_id =$(".exam_h_km02").attr("data-id");
             } 
             $(".exam_h_km03").attr("data-id",$(".exam_h_km03").children('option:selected').attr("data-id"));
             var sub_id = $(".exam_h_km03").attr("data-id");
            if(sub_id==null){
                 var sub_id =$(".exam_h_km03").attr("data-id");
             } 
            console.log(exam_id);
            console.log(class_id);  
            console.log(sub_id);    
            $.ajax({
            type: "POST",
            async: false,
            url: ajaxIp + "/api/v2/reports/export_class_level_distribute",
            headers: {
                'Authorization': "Bearer " + isLogin,
            },
            data: {
                "exam_id": exam_id,
                "classroom_id":class_id 

            },
            success: function(data) {
                console.log(data);
                console.log(data.file_path);
                $(".exam_h_101 button").parent().attr("href", ajaxIp + data.file_path);

            },
            error: function() {

            }

        });

    };
    $(".exam_h_left_ul li").eq(0).css("color", "#31bc91").siblings().css("color", "#999999");
    $(".exam_h_left_ul").on('click', 'li', function(event) {
        //切换不同的页面
        $(this).css("color", "#31bc91").siblings().css("color", "#999999");
        $(".exam_h_b").html($(this).html());
        $(".exam_h_tab").children("div").eq($(this).index()).show().siblings().hide();
        $(".exam_h_101 button").attr("data-id", $(this).index());
        var ul_id = $(this).index();
        if (ul_id == 0) {
            exam_h_bb01();
        };
        if (ul_id == 1) {
            exam_h_bb02();
        };
    });

        // $(".exam_h_left li").click(function(event) {
        //     /* Act on the event */

        //     $(this).css("color", "#31bc91").siblings().css("color", "#999999");
        //     $(".exam_h_b").html($(this).html());
        //     $(".exam_h_tab").children("div").eq($(this).index()).show().siblings().hide();
        // });
        // 控制select的数量
        
          $(".exam_h_101 span").eq(1).hide();
            $(".exam_h_101 span").eq(2).hide();

        $("#exam_h_left_1l").click(function(event) {
            /* Act on the event */
            $(".exam_h_101 span").eq(1).hide();
            $(".exam_h_101 span").eq(2).hide();

        });

        $("#exam_h_left_2l").click(function(event) {
            /* Act on the event */
            $(".exam_h_101 span").eq(1).hide();
            $(".exam_h_101 span").eq(2).show();

        });
        $("#exam_h_left_3l").click(function(event) {
            /* Act on the event */
             $(".exam_h_101 span").eq(1).show();
            $(".exam_h_101 span").eq(2).hide();
            // $(".exam_h_101 span").eq(2).show();

        });
        $("#exam_h_left_4l").click(function(event) {
            /* Act on the event */
             $(".exam_h_101 span").eq(1).hide();
            $(".exam_h_101 span").eq(2).show();

        });


        // 班级等级分布详细

        $(".exam_h_201 tr span").click(function(event) {
            /* Act on the event */
            $(".exam_h_x01").hide();
            $(".exam_h_201_x").show();

        });
        $("#exam_h_201_x_i").click(function(event) {
            /* Act on the event */
            $(".exam_h_x01").show();
            $(".exam_h_201_x").hide();

        });



        // 总分分段对比

        function heng_z(a,b,c) {
            var myChart = echarts.init(document.getElementById('exam_h_301'));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    subtext: '百分比%'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['本校', '本班']
                },
                grid: {

                    x2: 50,
                    y2: 35,
                    borderWidth: 1
                },

                calculable:false,
                xAxis: [{
                    type: 'category',
                    data: a,
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                    name: '本校',
                    type: 'bar',
                    data: b,
                    markLine: {
                        data: [{
                            type: 'average',
                            name: '平均值'
                        }]
                    }
                }, {
                    name: '本班',
                    type: 'bar',
                    data:c,
                    markLine: {
                        data: [{
                            type: 'average',
                            name: '平均值'
                        }]
                    }
                }]
            };


            // 为echarts对象加载数据 
            myChart.setOption(option);
        };

        function heng_m(a, b) {
            // 名次各班分布
            var myChart = echarts.init(document.getElementById('exam_h_402'));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '前100名各个班级的分布情况',
                    subtext: '相当对于整个考试',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: a,
                },

                calculable:false,
                series: [{
                    name: '所占比例',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: b,
                }]
            };


            // 为echarts对象加载数据 
            myChart.setOption(option);

        };
        // <!-- 考试横向分析 end -->


    })
    .controller("form07Controller", function() {
        $(".main_left a").eq(6).addClass('li_click').siblings().removeClass("li_click");
        $("#index_span").html($(".main_left a").eq(6).html());
        $("#sc_left").css("margin-bottom", "150px");
        $(".sc_left").show();
        $("#sc_left").siblings("a").click(function(event) {
            /* Act on the event */
            $("#sc_left").css("margin-bottom", "15px");
            $(".sc_left").hide();
        });
        var isLogin = localStorage.getItem("token");
        /*<!-- 跨校对比分析  start-->*/
        $(".sc_left li").eq(0).css("color", "#31bc91").siblings().css("color", "#999999");
        $(".sc_left li").click(function(event) {
            /* Act on the event */
            $(this).css("color", "#31bc91").siblings().css("color", "#999999");
            $(".sc_b").html($(this).html());
            $(".sc_tab").children("div").eq($(this).index()).show().siblings().hide();
        });

        /*<!-- 跨校对比分析  end-->*/

    })
    .controller("form08Controller", function() {
        $(".main_left a").eq(7).addClass('li_click').siblings().removeClass("li_click");
        $("#index_span").html($(".main_left a").eq(7).html());
        var isLogin = localStorage.getItem("token");

    })