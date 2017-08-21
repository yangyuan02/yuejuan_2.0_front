angular.module("myApp.controller",[])
    .controller("form01Controller",function () { 
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
        var isLogin = localStorage.getItem("token");// 全部科目
        $.ajax({
            type: "GET",
            url: ajaxIp + "/api/v2/commons/grade_subjects",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            // data:,
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
            /* Act on the event */
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
                    "subject_id": c
                },
                success: function(date) {
                    // console.log(date[0].name);
                    console.log(date);
                    for (var i = 0; i < date.length; i++) {

                        $(".mark_02_ul").append('<li data-id="' + date[i].exam_id + '"><span>' + date[i].name + '<i class="iconfont" style="margin-left:11px;cursor: pointer;">&#xe622;</i><i class="iconfont" style="margin-left:11px;cursor: pointer;display:none;">&#xe624;</i></span></li><div class="mark_li_01"></div>')
                        var b = date[i].exam_subjects.length;

                        for (var a = 0; a < b; a++) {
                            // console.log(i);
                            $(".mark_02_ul div").eq(i).append('<ul><li>' + date[i].exam_subjects[a].name + '</li><li>' + date[i].exam_subjects[a].updated_at + '</li><li>' + date[i].exam_subjects[a].operator_id + '<button type="" data-id="' + date[i].exam_subjects[a].exam_subject_id + '" data-status="' + date[i].exam_subjects[a].status + '">分析</button></li></ul>');


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
            for (var i = 0; i < a; i++) {
                var c = i + 1;
                console.log($("#ul_iLabel li").eq(i).find('.level_01').val(), $("#ul_iLabel li").eq(i).find('.level_02').val());
                var d = "t[column_name_" + c + "]";
                var e = $("#ul_iLabel li").eq(i).find('.level_01').val();
                var f = "t[column_value_" + c + "]";
                var g = $("#ul_iLabel li").eq(i).find('.level_02').val();
                data_value[d] = e;
                data_value[f] = g;
            }
            console.log(data_value);
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/save_analysis_params",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: data_value,
                success: function(data) {
                    console.log(data);
                },
                error: function() {

                }
            });
        });


        $(".mark_02").on('click', ' button', function(event) {
            // $(this).parent().parent().prev().html();
            console.log($(this).parent().parent().parent().prev().attr("data-id"));
            console.log($(this).attr("data-id"));
            var a = $(this).parent().parent().parent().prev().attr("data-id");
            var b = $(this).attr("data-id");

            $(".mart_set_03").data("a1", a);
            $(".mart_set_04").data("b1", b);
            $(".mart_set").show();
            $(".mark_02").css("margin-bottom", "500px");
        $(".mask_layer").css("height",$(document).height());
        $(".mask_layer").show();


        });



        $("#set_04").click(function(event) {
            /* Act on the event */
            $(".mart_set").hide();
            $(".mark_02").css("margin-bottom", "0px");
            $(".mask_layer").hide();
        });
        $(".mart_set_03 button").click(function(event) {
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
   .controller("form02Controller",function () {
    $(".main_left a").eq(1).addClass('li_click').siblings().removeClass("li_click");
    $("#index_span").html($(".main_left a").eq(1).html());
    var isLogin = localStorage.getItem("token");
 $.ajax({
        type: "GET",
        url: ajaxIp + "/api/v2/reports/exams",
        // async:false,
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
                };

                $(".exam_name").change(function() {
                    // alert($(".exam_name").children('option:selected').attr("data-id"));
                    // console.log($(".exam_name").children('option:selected').index());

                    var c = $(this).children('option:selected').index()
                    var b = data[c].subjects.length;
                    $(".exam_sub").html('');
                    for (var a = 0; a < b; a++) {
                        $(".exam_sub").append('<option value="" data-id=' + data[c].subjects[a].subject_id + '>' + data[c].subjects[a].name + '</option>');
                    }

                });

            }
            kaoshizk();

        },
        error: function() {}

    });
    // 考试状况的选择事件
    $(".study_q_01_mark select").change(function(event) {
        kaoshizk();
        chengjifd(10);
    });

    // 考试状况的函数
    function kaoshizk() {
        var exam_id = parseInt($(".exam_name").children('option:selected').attr("data-id"));
        var sub_id = parseInt($(".exam_sub").children('option:selected').attr("data-id"));
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
                $(".r2_02_01").html(data.statistics_total);
                $(".r2_02_02").html(data.average);
                $(".r2_02_03").html(data.average_rate);
                $(".r2_02_04").html(data.pass_rate);
                $(".r2_02_05").html(data.fine_rate);
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
                        var mark_d = [];
                        // s
                        // console.log(data[0].rate);
                        for (var i = 0; i < data.socre_distributions.length; i++) {
                            mark_d.push(data.socre_distributions[i].count);
                        };
                        console.log(mark_d);
                        mark_fb(mark_d);
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
                $("#r5_11_tbody").html(' ');
                $("#r5_11_tbody02").html(' ');
                for (var i = 0; i < data.rise.length; i++) {

                    $("#r5_11_tbody").append(' <tr><td>' + data.rise[i].name + '</td><td>' + data.rise[i].grade_rank + '</td><td>' + data.rise[i].grade_ranking_change + '<i class="iconfont">&#xe627;</i></td></tr>');
                    $("#r5_11_tbody02").append(' <tr><td>' + data.decline[i].name + '</td><td>' + data.decline[i].grade_rank + '</td><td>' + data.decline[i].grade_ranking_change + '<i class="iconfont">&#xe628;</i></td></tr>');
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
                var a = [];
                var b = [];
                for (var i = 0; i < data.length; i++) {
                    var nub = "第" + (i + 1) + "考试"

                    a.push(nub);
                    b.push(data[i].average);
                }
                console.log(a);
                njxk(a, b)
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
    function mark_fb(a) {
        var myChart = echarts.init(document.getElementById('right_03'));

        var option = {

            tooltip: {
                trigger: 'axis'
            },
            grid: {
                x: 28,
                y: 40,
                x2: 5,
                y2: 25,
                borderWidth: 1
            },

            calculable: true,
            xAxis: [{
                type: 'category',
                data: ['0-10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', "140", "150"]
            }],
            yAxis: [{
                type: 'value',

            }],
            series: [{
                name: '人数',
                type: 'bar',
                data: a,
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
    function njxk(a,b){
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
            boundaryGap:false,
            data:a,
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
                data:b,
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
   .controller("form03Controller",function () {

// 最新班级学情追踪开始
    // 最新班级学情追踪默认事件
     $(".main_left a").eq(2).addClass('li_click').siblings().removeClass("li_click");
     $("#index_span").html($(".main_left a").eq(2).html());
    var isLogin = localStorage.getItem("token");
    $.ajax({
        type: "GET",
        // analyse:false,
        url: ajaxIp + "/api/v2/reports/exams",
        headers: {
            'Authorization': "Bearer " + isLogin
        },
        success: function(data) {

            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $(".study_q_km01").append('<option value="' + data[i].name +'" data-id=' + data[i].id + '>' + data[i].name + '</option>')
            };
            for (var i = 0; i < data[0].classrooms.length; i++) {
                $(".study_q_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')

            };
            for (var i = 0; i < data[0].subjects.length; i++) {
                $(".study_q_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')

            };
            banji();
            $(".study_q_km01").change(function(event) {
                /* Act on the event */
                var index01 = $(".study_q_km01").children('option:selected').index()
                var index02 = index01;
                // $(".study_q_km01 option").eq(0).remove();
                $(".study_q_km02 option").remove();
                $(".study_q_km03 option").remove();
                for (var i = 0; i < data[index02].classrooms.length; i++) {
                    $(".study_q_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>')

                }
                for (var i = 0; i < data[index02].subjects.length; i++) {
                    $(".study_q_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')

                }
                banji();
            });



        },

        error: function() {

        }
    });


    //最新班级学情追踪选择事件
    $(".study_q_km select").change(function(event) {
        $("#study_q_i_btn_05c tr").remove();
        banji();
    });

    //最新班级学情追踪函数

    function banji() {
        var exam_id = parseInt($(".study_q_km01").children('option:selected').attr("data-id"));
        var sub_id = parseInt($(".study_q_km03").children('option:selected').attr("data-id"));
        var class_id = parseInt($(".study_q_km02").children('option:selected').attr("data-id"));

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
                $(".study_q_zt td").eq(0).html(data.score_total);
                $(".study_q_zt td").eq(1).html(data.average);
                $(".study_q_zt td").eq(2).html(data.highest_score);
                $(".study_q_zt td").eq(3).html(data.lowest_score);
                $(".study_q_zt td").eq(4).html(data.pass_number);
                $(".study_q_zt td").eq(5).html(data.fine_number);
                $(".study_q_zt td").eq(6).html(data.student_total);
                $(".study_q_zt td").eq(7).html(data.absent_total);
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
                var mark_d = [];
                for (var i = 0; i < data.socre_distributions.length; i++) {

                    mark_d.push(data.socre_distributions[i].count);


                };
                study_q_fd(mark_d);



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
                for (var i = 0; i < 5; i++) {
                    var a = i + 1;
                    var c = $(".study_q_dfj tr").eq(a);
                    c.find('td').eq(1).html(data.rise[i].name);
                    c.find('td').eq(2).html(data.rise[i].class_rank);
                    c.find('td').eq(3).children('span').html(data.rise[i].class_ranking_change);
                    var d = $(".study_q_dft tr").eq(a);
                    d.find('td').eq(1).html(data.decline[i].name);
                    d.find('td').eq(2).html(data.decline[i].class_rank);
                    d.find('td').eq(3).children('span').html(data.decline[i].class_ranking_change);
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
                "classroom_id":class_id,
            },
            success: function(data) {
                console.log(data);
                for (var i = 0; i < 5; i++) {
                    var a = i + 1;
                    var c = $("#study_q_q5 tr").eq(a);
                    c.find('td').eq(1).html(data.top_five[i].name);
                    var d = $("#study_q_h5 tr").eq(a);
                    d.find('td').eq(1).html(data.after_five[i].name);
                }


            },
            error: function() {

            }

        });


        $.ajax({
            type: "get",
            url: ajaxIp + "/api/v2/reports/class_students",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            data: {
                "exam_id": exam_id,
                "subject_id": sub_id,
            },
            success: function(data) {
                console.log(data);
                for (var i = 0; i < data.exam_subjects.length; i++) {
                    $("#study_q_i_btn_05c").append('<tr><td>' + data.exam_subjects[i].name + '</td><td>' + data.exam_subjects[i].score + '</td><td>' + data.exam_subjects[i].level + '</td><td>' + data.exam_subjects[i].class_rank + '</td><td style="color:#fb7d8a">' + data.exam_subjects[i].class_ranking_change + '<i class="iconfont">&#xe627;</i></td><td><span>查看答题卡</span></td><td>点评</td></tr>');

                }
                // $(".study_q_i_btn_05").unbind("click");
                $(".study_q_i_btn_05").attr('a', '2');
            },
            error: function() {

            }


        });


          // 小题查看     
        $.ajax({
            type: "GET",
            url:  ajaxIp + "/api/v2/reports/class_answer_setting_statistic",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            data: {
                "exam_id":exam_id,
                "subject_id":sub_id,
                "classroom_id":class_id
            },
            success: function(data) {
                console.log(data);
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
            },
            error: function() {

            }


        });

    // 小题查看
    $(".study_q_05_tb").on('click', 'span', function(event) {
        // 切换页面
        $(".study_q_ck").show();
        $("#study_q_ck").hide();
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
                "exam_id":exam_id,
                "subject_id":sub_id,
                "classroom_id":class_id,
                "answer_setting_id":data_ans
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
    };

    // 分数段分布插件
    function study_q_fd(a) {
        var myChart = echarts.init(document.getElementById('study_q_03_02'));

        var option = {

            tooltip: {
                trigger: 'axis'
            },
            grid: {
                x: 28,
                y: 23,
                x2: 5,
                y2: 25,
                borderWidth: 1
            },

            calculable: true,
            xAxis: [{
                type: 'category',
                data: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', "140", "150"]
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '人数',
                type: 'bar',
                data: a,
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
    });



    $(".ans_01 i").click(function(event) {
        /* Act on the event */

        $(".ans").hide();
    });
    // <!--最新班级学情追踪 end-->








    
})
   .controller("form04Controller",function () {
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
    $(".study_k_left li").click(function(event) {
        /* Act on the event */
        $(this).css("color", "#31bc91").siblings().css("color", "#999999");
        $(".study_k_b").html($(this).html());
        $(".study_k_tab div").eq($(this).index()).show().siblings().hide();
        if($(this).index()=="2"||$(this).index()=="3"||$(this).index()=="4"){
          $(".study_k_101 span").eq(2).hide();
        }else{

             $(".study_k_101 span").eq(2).show();
        }
  // 导出按钮ID不同的值
      $(".study_k_101 button").attr("data-id",$(this).index());
    });
// 导出button点击 
    var ajaxUrl = "http://192.168.1.117:3000"
    $(".study_k_101").on('click', 'button', function(event) {

        var btn_id = $(this).attr("data-id");
        console.log(btn_id);
        switch (btn_id) {
            case "0":

                $.ajax({
                    type: "POST",
                    url: ajaxUrl + "/api/v2/reports/export_subject_integrated",
                    headers: {
                        'Authorization': "Bearer " + isLogin,
                    },
                    data: {
                        "exam_id":"134",
                        "subject_id":"13",
                        "classroom_id":"96",
                    },
                    success: function(data) {
                        console.log(data);
                        console.log(data.file_path);
                        $(".study_k_101 button").parent().attr("herf", ajaxIp+data.file_path);

                    },
                    error: function() {}

                });



                break;
            case "1":
                alert("1");
                break;
            case "2":
                // $.ajax({
                //     type: "POST",
                //     url: ajaxUrl + "/api/v2/reports/export_subject_integrated",
                //     headers: {
                //         'Authorization': "Bearer " + isLogin,
                //     },
                //     data: {
                //         "exam_id":"134",
                //         "subject_id":"13",
                //         "classroom_id":"96",
                //     },
                //     success: function(data) {
                //         console.log(data);
                //         console.log(data.file_path);
                //         $(".study_k_101 button").parent().attr("herf",' ');
                //         $(".study_k_101 button").parent().attr("herf", ajaxIp+data.file_path);

                //     },
                //     error: function() {}

                // });
                break;
            case "3":
                alert("3");
                break;
            case "4":
                alert("4");
                break;
            case "5":
                alert("5");
                break;

        }



    });





    // 最新学科综合分析
    // 科目
 $.ajax({
        type: "GET",
        // analyse:false,
        url: ajaxIp + "/api/v2/reports/exams",
        headers: {
            'Authorization': "Bearer " + isLogin
        },
        success: function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $(".study_k_km01").append('<option value="' + data[i].name +'" data-id=' + data[i].id + '>' + data[i].name + '</option>')
            };
            for (var i = 0; i < data[0].classrooms.length; i++) {
                $(".study_k_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')

            };
            for (var i = 0; i < data[0].subjects.length; i++) {
                $(".study_k_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')

            };
            study_k();
            $(".study_k_km01").change(function(event) {
                /* Act on the event */
                var index01 = $(".study_k_km01").children('option:selected').index()
                var index02 = index01;
                // $(".study_q_km01 option").eq(0).remove();
                $(".study_k_km02 option").remove();
                $(".study_k_km03 option").remove();
                for (var i = 0; i < data[index02].classrooms.length; i++) {
                    $(".study_k_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>')

                }
                for (var i = 0; i < data[index02].subjects.length; i++) {
                    $(".study_k_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')

                }
                study_k();
            });
        },

        error: function() {

        }
    });
   
// 科目 end
// 学科综合分析

    function study_k() {
        var exam_id = $(".study_k_km01").children('option:selected').attr("data-id");
        var sub_id = $(".study_k_km03").children('option:selected').attr("data-id");
        var class_id = $(".study_k_km02").children('option:selected').attr("data-id");
        $.ajax({
            type: "POST",
            url:  ajaxIp  + "/api/v2/reports/subject_integrated",
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
            url:  ajaxIp + "/api/v2/reports/total_points_and_ranking",
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
            url:  ajaxIp  + "/api/v2/reports/single_and_level",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            data: {
                "exam_id": exam_id,
                "classroom_id": class_id,
            },
            success: function(data) {
                console.log(data);
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
            url:  ajaxIp + "/api/v2/reports/all_subjects_ranking",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            data: {
                "exam_id": exam_id,
                "classroom_id": class_id,
            },
            success: function(data) {
                console.log(data);
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
            url:  ajaxIp  + "/api/v2/reports/chinese_math_english_ranking",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            data: {
                "exam_id": exam_id,
                "classroom_id": class_id,
            },
            success: function(data) {
                console.log(data);
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
            url:  ajaxIp  + "/api/v2/reports/student_details",
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
   .controller("form05Controller",function () {
     $(".main_left a").eq(4).addClass('li_click').siblings().removeClass("li_click");
     $("#index_span").html($(".main_left a").eq(4).html());
     $(".exam_z_101 span").eq(1).hide();
    $(".exam_z_101 span").eq(2).hide();
     $("#exam_z_left").css("margin-bottom", "130px");
        $(".exam_z_left").show();
        $("#exam_z_left").siblings("a").click(function(event) {
        /* Act on the event */
        $("#exam_z_left").css("margin-bottom", "15px");
        $(".exam_z_left").hide();
    });
    var isLogin = localStorage.getItem("token");
    $(".exam_z_left li").click(function(event) {
        /* Act on the event */

        $(this).css("color", "#31bc91").siblings().css("color", "#999999");
        $(".exam_z_b").html($(this).html());
        $(".exam_z_tab div").eq($(this).index()).show().siblings().hide();
        if($(this).index()==0){
           $(".exam_z_101 span").eq(1).hide();
        $(".exam_z_101 span").eq(2).hide(); 
        }

    });

    $("#exam_z_left_2l").click(function(event) {
        /* Act on the event */
        $(".exam_z_101 span").eq(1).show();
        $(".exam_z_101 span").eq(2).show();
    });

    $("#exam_z_left_3l").click(function(event) {
        /* Act on the event */
        $(".exam_z_101 span").eq(1).hide();
    });

// 科目
 $.ajax({
        type: "GET",
        // analyse:false,
        url: ajaxIp + "/api/v2/reports/exams",
        headers: {
            'Authorization': "Bearer " + isLogin
        },
        success: function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $(".exam_z_km01").append('<option value="' + data[i].name +'" data-id=' + data[i].id + '>' + data[i].name + '</option>')
            };
            for (var i = 0; i < data[0].classrooms.length; i++) {
                $(".exam_z_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')

            };
            for (var i = 0; i < data[0].subjects.length; i++) {
                $(".exam_z_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')

            };
            $(".exam_z_km01").change(function(event) {
                /* Act on the event */
                var index01 = $(".exam_z_km01").children('option:selected').index()
                var index02 = index01;
                // $(".study_q_km01 option").eq(0).remove();
                $(".exam_z_km02 option").remove();
                $(".exam_z_km03 option").remove();
                for (var i = 0; i < data[index02].classrooms.length; i++) {
                    $(".exam_z_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>')

                }
                for (var i = 0; i < data[index02].subjects.length; i++) {
                    $(".exam_z_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')

                }
            });
        },
        error: function() {
        }
    });
   
// 科目 end


// 试卷质量
var ajaxUrl="http://192.168.1.117:3000"
    $(".exam_z_101 button").click(function(event) {
        /* Act on the event */
        alert();
        $.ajax({
            type: "POST",
            url: ajaxUrl + "/api/v2/reports/paper_quality",
            headers: {
                'Authorization': "Bearer" + isLogin
            },
            data: {
                "exam_id":"138",
            },
            success: function(data) {
                console.log(data);
                for (var i = 0; i < data.titile.length; i++) {

                    $(".exam_z_102_he").append('<th>' + data.titile[i] + '</th>');
                };
               for (var i = 0; i < data.data.length;i++) {

                    $(".exam_z_102_bo").append('<td>' + data.data[i].subject_name + '</td><td>' + data.data[i].difficult + '</td><td>' +data.data[i].discrimination+ '</td><td>' + data.data[i].reliability + '</td><td>' + data.data[i].full_marks_count+ '</td>');
                };

            },
            error: function() {

            }

        });

    });








    // 难度系数变化图
    var myChart = echarts.init(document.getElementById('exam_z_303'));

    var option = {

        grid: {
            x: 28,
            y: 30,
            x2: 10,
            y2: 25,
            borderWidth: 1
        },
        tooltip: {
            trigger: 'axis'
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22']
        }],
        yAxis: [{
            type: 'value',
            data: ['0', '0.2', '0.4', '0.6', '0.8', '1']
        }],
        series: [{
                name: '试题难度',
                type: 'line',
                data: [0.5, 0.6, 0.7, 0.4, 0.3, 0.6, 0.3, 0.6, 0.7, 0.4, 0.3, 0.6, 0.3, 0.6, 0.7, 0.4, 0.3, 0.6, 0.3, 0.3, 0.6, 0.9],
                markPoint: {
                    data: [

                    ]
                }
            }

        ]
    };

    // 为echarts对象加载数据 
    myChart.setOption(option);



    // <!-- 考试质量追踪  end-->
    
})
   .controller("form06Controller",function () {
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
        // analyse:false,
        url: ajaxIp + "/api/v2/reports/exams",
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

            };
            for (var i = 0; i < data[0].subjects.length; i++) {
                $(".exam_h_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')

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

                }
                for (var i = 0; i < data[index02].subjects.length; i++) {
                    $(".exam_h_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')

                }
            });
        },
        error: function() {}
    });
   
// 科目 end
// 各班成绩
// 班级等级
var ajaxUrl="http://192.168.1.117:3000"
        $.ajax({
            type: "POST",
            url: ajaxUrl + "/api/v2/reports/class_level_distribute",
            headers: {
                'Authorization': "Bearer" + isLogin
            },
            data: {
                "exam_id":"138",
                // "classroom_id":
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
// 名次各班分布
 $(".exam_h_101 button").click(function(event) {
        /* Act on the event */
        alert();
        $.ajax({
            type: "POST",
            url: ajaxUrl + "/api/v2/reports/class_ranking_distribute",
            headers: {
                'Authorization': "Bearer" + isLogin
            },
            data: {
                "exam_id":"138",
                 "subject_id":"12"
            },
            success: function(data) {
                console.log(data);
                for(var i=0;i<data.length;i++){
                    $(".exam_h_402_bo").append('<tr><td>'+data[i].classroom_name+'</td><td>'+data[i].total_count+'</td></tr>')
                }
                
            },
            error: function() {

            }

        });

    });






    $(".exam_h_left li").click(function(event) {
        /* Act on the event */

        $(this).css("color", "#31bc91").siblings().css("color", "#999999");
        $(".exam_h_b").html($(this).html());
        $(".exam_h_tab").children("div").eq($(this).index()).show().siblings().hide();
    });
    // 控制select的数量
    $("#exam_h_left").click(function(event) {
        /* Act on the event */

        $(".exam_h_101 span").eq(2).hide();

    });
    $("#exam_h_left_1l").click(function(event) {
        /* Act on the event */
        $(".exam_h_101 span").eq(2).hide();

    });

    $("#exam_h_left_2l").click(function(event) {
        /* Act on the event */

        $(".exam_h_101 span").eq(2).show();

    });
    $("#exam_h_left_3l").click(function(event) {
        /* Act on the event */

        $(".exam_h_101 span").eq(2).show();

    });
    $("#exam_h_left_4l").click(function(event) {
        /* Act on the event */

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

        calculable: true,
        xAxis: [{
            type: 'category',
            data: ['150-200', '200-250', '250-300', '350-400', '400-450', '450-500', '500-550', '550-600', '650-700', '700-750']
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '本校',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
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
        }, {
            name: '本班',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint: {
                data: [{
                    name: '年最高',
                    value: 182.2,
                    xAxis: 7,
                    yAxis: 183,
                    symbolSize: 18
                }, {
                    name: '年最低',
                    value: 2.3,
                    xAxis: 11,
                    yAxis: 3
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
            data: ['高一1班', '高一2班', '高一3班', '高一4班', '高一5班']
        },

        calculable: true,
        series: [{
            name: '所占比例',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
                value: 335,
                name: '高一1班(13%)'
            }, {
                value: 310,
                name: '高一2班(12%)'
            }, {
                value: 234,
                name: '高一3班(9%)'
            }, {
                value: 135,
                name: '高一4班(5%)'
            }, {
                value: 1548,
                name: '高一5班(61%)'
            }, ]
        }]
    };


    // 为echarts对象加载数据 
    myChart.setOption(option);


    // <!-- 考试横向分析 end -->

    
})
   .controller("form07Controller",function () {
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
    $(".sc_left li").click(function(event) {
        /* Act on the event */
        $(this).css("color", "#31bc91").siblings().css("color", "#999999");
        $(".sc_b").html($(this).html());
        $(".sc_tab").children("div").eq($(this).index()).show().siblings().hide();
    });

    /*<!-- 跨校对比分析  end-->*/
    
})
   .controller("form08Controller",function () {
     $(".main_left a").eq(7).addClass('li_click').siblings().removeClass("li_click");
     $("#index_span").html($(".main_left a").eq(7).html());
    var isLogin = localStorage.getItem("token");
    
})