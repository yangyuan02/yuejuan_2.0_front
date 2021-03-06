angular.module("myApp.controller", [])
    .controller("form01Controller", function() {

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
            var num = parseInt($(".num_color").html());
            console.log(num);
            markxl(mark_01_select_a, num);

        });



        // 成绩生成下拉函数
        markxl(null, 1);

        function markxl(c, num) {
            $.ajax({
                type: "GET",
                url: ajaxIp + "/api/v2/reports",
                async: false,
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "subject_id": c,
                    "page": num,
                },
                success: function(data) {
                    console.log(data.data);
                    console.log(data);
                    $(".mark_02_ul").html(" ");
                    $(".num_page").html(" ");
                    $(".num_page").append('<button type="" class="num_color">1</button>');
                    $(".page_div").attr("total_page", data.total_page);
                    var page_num = Math.ceil(data.total_count / 10);

                    for (var num_i = 1; num_i < page_num; num_i++) {
                        if (num_i < 5) {

                            $(".num_page").append('<button>' + (num_i + 1) + '</button>');
                        }
                    }
                    for (var i = 0; i < data.data.length; i++) {

                        $(".mark_02_ul").append('<li data-id="' + data.data[i].exam_id + '"><span>' + data.data[i].name + '<i class="iconfont" style="margin-left:11px;cursor: pointer;">&#xe622;</i><i class="iconfont" style="margin-left:11px;cursor: pointer;display:none;">&#xe624;</i></span><div class="mark_li_01"></div></li>')
                        var b = data.data[i].exam_subjects.length;

                        for (var a = 0; a < b; a++) {

                            var status_btn = data.data[i].exam_subjects[a].status;
                            console.log(status_btn);
                            if (status_btn == "finished" || status_btn == "analysed") {

                                $(".mark_02_ul div").eq(i).append('<ul><li>' + data.data[i].exam_subjects[a].name + '</li><li>' + data.data[i].exam_subjects[a].updated_at + '</li><li>' + data.data[i].exam_subjects[a].operator_id + '<button type="" data-id="' + data.data[i].exam_subjects[a].exam_subject_id + '" data-status="' + data.data[i].exam_subjects[a].status + '" data_a="1" data-sid="' + data.data[i].exam_subjects[a].subject_id + '">分析</button></li></ul>');


                            } else {

                                $(".mark_02_ul div").eq(i).append('<ul><li>' + data.data[i].exam_subjects[a].name + '</li><li>' + data.data[i].exam_subjects[a].updated_at + '</li><li>' + data.data[i].exam_subjects[a].operator_id + '<button type="" data-id="' + data.data[i].exam_subjects[a].exam_subject_id + '" data-status="' + data.data[i].exam_subjects[a].status + '" data_a="1" data-sid="' + data.data[i].exam_subjects[a].subject_id + '" style="display:none;">分析</button></li></ul>');


                            }

                        }
                    }
                },
                error: function() {

                }
            });
        }
        //page
        function markxl01(c, num) {
            $.ajax({
                type: "GET",
                url: ajaxIp + "/api/v2/reports",
                async: false,
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "subject_id": null,
                    "page": num,
                },
                success: function(data) {
                    console.log(data.data);
                    console.log(data);
                    $(".mark_02_ul").html(" ");


                    for (var i = 0; i < data.data.length; i++) {

                        $(".mark_02_ul").append('<li data-id="' + data.data[i].exam_id + '"><span>' + data.data[i].name + '<i class="iconfont" style="margin-left:11px;cursor: pointer;">&#xe622;</i><i class="iconfont" style="margin-left:11px;cursor: pointer;display:none;">&#xe624;</i></span><div class="mark_li_01"></div></li>')
                        var b = data.data[i].exam_subjects.length;

                        for (var a = 0; a < b; a++) {

                            var status_btn = data.data[i].exam_subjects[a].status;
                            console.log(status_btn);
                            if (status_btn == "finished" || status_btn == "analysed") {

                                $(".mark_02_ul div").eq(i).append('<ul><li>' + data.data[i].exam_subjects[a].name + '</li><li>' + data.data[i].exam_subjects[a].updated_at + '</li><li>' + data.data[i].exam_subjects[a].operator_id + '<button type="" data-id="' + data.data[i].exam_subjects[a].exam_subject_id + '" data-status="' + data.data[i].exam_subjects[a].status + '" data_a="1" data-sid="' + data.data[i].exam_subjects[a].subject_id + '">分析</button></li></ul>');


                            } else {

                                $(".mark_02_ul div").eq(i).append('<ul><li>' + data.data[i].exam_subjects[a].name + '</li><li>' + data.data[i].exam_subjects[a].updated_at + '</li><li>' + data.data[i].exam_subjects[a].operator_id + '<button type="" data-id="' + data.data[i].exam_subjects[a].exam_subject_id + '" data-status="' + data.data[i].exam_subjects[a].status + '" data_a="1" data-sid="' + data.data[i].exam_subjects[a].subject_id + '" style="display:none;">分析</button></li></ul>');


                            }

                        }
                    }
                },
                error: function() {

                }
            });
        }

        $(".mark_02_ul").on('click', 'span', function(event) {
            $(this).parent().find('div').toggle();
            $(this).find('i').toggle();
        });




        // 分析
        $(".mart_set_03_select").change(function(event) {
            var a = $(this).children('option:selected').attr("data-id");
            $(this).attr('data-id', a);

        });
        $(".btn_1").click(function(event) {

            $(".mart_set").hide();
            $(".load-bg").show();
            var class_name = $(this).attr("data_class");

            mark_fengxi(class_name);
        });

        function mark_fengxi(name) {

            $(".tf_dj a").remove();
            var ex_id = $(".mart_set_03").data("a1");
            var sub_id = $(".mart_set_04").data("b1");
            var sub_id1 = parseInt(sub_id);
            var ex_id1 = parseInt(ex_id);
            var jg_mark = $("#jg_mark").val();
            var yx_mark = $("#yx_mark").val();
            var z_mark = $("#z_mark").val();
            var a = $("#ul_iLabel li").length;
            var level = parseInt($(".mart_set_03_select").children('option:selected').attr("data-id"));
            var absent = parseInt($(".miss_exam01").attr("data-id"));
            var data_value = {

                "full_score": z_mark,
                "t[exam_subject_id]": sub_id1,
                "t[exam_id]": ex_id1,
                "exam_subject_id": sub_id1,
                "pass": jg_mark,
                "fine": yx_mark,
                't[level_type]': level,
                'absent': absent,
            };
            console.log(data_value);
            for (var i = 0; i < a; i++) {
                var c = i + 1;
                console.log($("#ul_iLabel li").eq(i).find('.level_01').val(), $("#ul_iLabel li").eq(i).find('.level_02').val());
                var type = $(".mart_set_03_select").children('option:selected').attr("data-id");
                var d = "t[column_name_" + c + "]";
                var f = "t[column_value_" + c + "]";
                if (type == 1) {

                    var e = $("#ul_iLabel li").eq(i).find('.level_01').val();

                    var g = $("#ul_iLabel li").eq(i).find('.level_02').val();
                    data_value[d] = e;
                    data_value[f] = g;
                } else {
                    var e = $("#ul_iLabel li").eq(i).find('.level_01').val();
                    if (i == 0) {
                        var g = $("#ul_iLabel li").eq(i).find('.level_02').val() + ',' + $("#z_mark").val();
                    } else {
                        var g = $("#ul_iLabel li").eq(i).find('.level_02').val() + ',' + $("#ul_iLabel li").eq(i - 1).find('.level_02').val();
                    }

                    data_value[d] = e;
                    data_value[f] = g;
                }
                $(".tf_dj").append('<a>' + e + '：' + g + '</a>')

            };
            console.log(data_value.fine);
            $(".tf_zf a").html(data_value.full_score);
            $(".tf_jg a").html(data_value.pass);
            $(".tf_yx a").html(data_value.fine);
            if (data_value.absent == 1) {
                $(".tf_absent a").html("是");
            } else if (data_value.absent == 2) {
                $(".tf_absent a").html("否");
            }

            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/save_analysis_params",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: data_value,

                success: function(data) {
                    console.log(data);

                    if (data.status == 5) {
                        $(".modal-exit").hide();
                        $(".t_f").show();
                        $(".modal-content").hide();
                        $(".load-bg").hide();
                        $('.modal-main').css('opacity', "1");
                        $('.modal-wrap').show();
                        $('.modal-content span').html("更新成功");
                    }
                    if (data.status == 6) {
                        $(".modal-exit").show();
                        $(".load-bg").show();
                        $('.' + name + '').hide();

                    }
                    if (data.status == 7) {
                        $('.' + name + '').hide();

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

                },

            });
        };


        function mark_hou() {
            var a = $(".t_f_btn01").attr("data-id");
            var b = $(".t_f_btn02").attr("data-sid");

            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/analysis_params",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": a,
                    "subject_id": b,
                },
                success: function(data) {
                    console.log(data);

                    if (data.error_code == 500) {
                        $("#ul_iLabel").html(" ");
                        $("#ul_iLabel").append('<li><input value="" class="level_01"><input value="" class="level_02"><button type="">-</button></li><li><input value="" class="level_01"><input value="" class="level_02"><button type="">-</button></li><li><input value="" class="level_01"><input value="" class="level_02"><button type="">-</button></li><li><input value="" class="level_01"><input value="" class="level_02"><button type="">-</button></li><li><input value="" class="level_01"><input value="" class="level_02"><button type="">-</button></li>');
                    }
                    var b01 = ["column_value_1", "column_value_2", "column_value_3", "column_value_4", "column_value_5", "column_value_6", "column_value_7", "column_value_8", "column_value_9", "column_value_10", "column_value_11"];
                    var b02 = ["column_name_1", "column_name_2", "column_name_3", "column_name_4", "column_name_5", "column_name_6", "column_name_7", "column_name_8", "column_name_9", "column_name_10", "column_name_11"];
                    var json = [];
                    for (var i01 = 0; i01 < data.lenght; i01++) {
                        var a = parseInt(data[b01[i01]]);

                        if (isNaN(a)) {

                        } else {
                            json[i01] = b01[i01];
                        }
                    }
                    console.log(json);
                    if (data.error_code !== 500) {

                        $("#ul_iLabel").html(" ");
                        console.log(data.lenght);
                        for (var i_li = 0; i_li < data.lenght; i_li++) {
                            $("#ul_iLabel").append('<li><input value="" class="level_01"><input value="" class="level_02"><button type="">-</button></li>');
                        }
                        $("#z_mark").val(data.full_score);
                        $("#jg_mark").val(data.pass);
                        $("#yx_mark").val(data.fine);
                        if (data.level_type == 1) {
                            $(".mart_set_03_select option").eq(0).attr("selected", "selected");
                            for (var i_l = 0; i_l < data.lenght; i_l++) {
                                $("#ul_iLabel li").eq(i_l).find('.level_01').val(data[b02[i_l]]);
                                $("#ul_iLabel li").eq(i_l).find('.level_02').val(data[b01[i_l]]);
                            }
                        } else if (data.level_type == 2) {
                            $(".mart_set_03_select option").eq(1).attr("selected", "selected");

                            for (var i_l = 0; i_l < data.lenght; i_l++) {
                                var b02_s = data[b02[i_l]].split(",");
                                var b01_s = data[b01[i_l]].split(",");
                                $("#ul_iLabel li").eq(i_l).find('.level_01').val(b02_s[0]);
                                $("#ul_iLabel li").eq(i_l).find('.level_02').val(b01_s[0]);
                            }

                        }
                        //判断缺考

                        if (data.absent == true) {
                            $(".a_absent i").css("color", "#31bc91");
                            $(".a_absent i").attr("data-id", "1");

                        } else if (data.absent == false) {
                            $(".a_absent i").css("color", "#666666");
                            $(".a_absent i").attr("data-id", "2");
                        }

                        var b = [data.column_name_6, data.column_name_7, data.column_name_8, data.column_name_9, data.column_name_10, data.column_name_11];
                        var b1 = [data.column_value_6, data.column_value_7, data.column_value_8, data.column_value_9, data.column_value_10, data.column_value_11];
                        if (json.lenght < 12) {
                            if (json.lenght > 5) {
                                console.log(data.lenght);
                                for (var i = 5; i < json.lenght; i++) {
                                    var c = i - 5;
                                    var a = i + 1;
                                    $("#ul_iLabel").append('<li><input value=""  class="level_01" ></input><input value="" class="level_02"></input><button type="">-</button></li>');
                                    $("#ul_iLabel li").eq(i).find('.level_01').val(b[i]);

                                    $("#ul_iLabel li").eq(i).find('.level_02').val(data[json[i]]);
                                    console.log(data[json[i]]);

                                }
                            }
                        }
                    }
                },
                error: function() {

                }
            });
        };

        $("#ul_iLabel").on('keyup', '.level_02', function(event) {
            var a = $(this).val().replace(/[^0-9%]/g, '')
            $(this).val(a);
        });

        $(".mart_set_02").on('keyup', 'input', function(event) {
            var a = $(this).val().replace(/[^0-9]/g, '')
            $(this).val(a);
        });
        /*分析数据的的确定*/
        mark_tf();

        function mark_tf() {
            $(".t_f_btn01").click(function(event) {

                $(".modal-wrap").hide();
                $(".mask_layer").hide();
                var class_name = $(this).attr("data_class");
                mark_fengxi(class_name);
            });

            $(".t_f_btn02").click(function(event) {

                $(".modal-wrap").hide();
                $(".mask_layer").hide();
                $(".tf_dj a").remove();

                $(".load-bg").hide();
            });
        };

        $(".modal-exit").click(function(event) {
            $(".mask_layer").hide();
        });

        $(".mark_02").on('click', ' button', function(event) {

            var class_name = "mark_02_btn" + $(this).attr("data-id");
            $(this).attr("class", class_name);
            console.log($(this).parent().parent().parent().parent().attr("data-id"));
            console.log($(this).attr("data-id"));
            $(".t_f").attr("data-id", $(this).attr("data-id"));
            var a = $(this).parent().parent().parent().parent().attr("data-id");
            var b = $(this).attr("data-id");
            var b1 = $(this).attr("data-sid");
            $(this).attr("data-s", a);
            $(this).attr("data-k", b);
            $(".t_f_btn01").attr("data-id", a);
            $(".t_f_btn01").attr("data_class", class_name);
            $(".btn_1").attr("data_class", class_name);
            $(".t_f_btn02").attr("data-sid", b1);
            $(".mart_set_03").data("a1", a);
            $(".mart_set_04").data("b1", b);
            $(".mart_set").show();
            $(".mark_02").css("margin-bottom", "500px");
            $(".mask_layer").css("height", $(document).height());
            $(".mask_layer").show();

            mark_hou();
            var faye = new Faye.Client(fayeIp + '/api/v2/events');
            faye.subscribe("/reports/" + b + "", function(data) {
                if (data.status == "analysed") {
                    $(".t_f").hide();
                    $(".modal-content").show();
                    $('.modal-main').css('opacity', "1");
                    $('.modal-wrap').show();
                    $(".mask_layer").show();
                    $(".load-bg").hide();
                    $('.modal-content span').html("更新成功");

                } else {
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

            $(".mart_set").hide();
            $(".mark_02").css("margin-bottom", "0px");
            $(".mask_layer").hide();
        });
        $(".mart_set_03").on('click', 'button', function(event) {


            var a = $(".mart_set_03").height();
            console.log(a);
            if (a > 234) {
                $(this).parent().remove();
            }
        });
        $(".mark_add").click(function(event) {

            var a = $(".mart_set_03").height();
            if (a < 607) {
                $('.mart_set_03 ul').append('<li><input class="level_01"></input><input class="level_02"></input><button type="" class="iLabel">-</button></li>');

            }
        })

        $(document).on('click', '.iLabel', function() {
            $(this).parent().hide();
        })
        //缺考走读
        $(".miss_exam01").click(function(event) {
            var a = $(this).attr("data-id");
            if (a == 2) {
                $(this).css("color", "#31bc91");
                $(this).attr("data-id", "1");
            } else {
                $(this).css("color", "#666666");
                $(this).attr("data-id", "2");
            }

        });
        //page//
        $(".next_page").click(function(event) {
            if ($(".num_color").html() == $(".page_div").attr("total_page")) {
                $(this).attr('id', 'disableClass');
                $(".end_page").attr('id', 'disableClass');

            } else {
                var a = $(".num_color").index();
                var page01 = Number($(".page_div").attr("total_page")) + 1;

                console.log(page01);
                $(".num_color").next().attr("class", "num_color").siblings().removeAttr("class");
                var page = Number($(".num_color").html()) + 1;
                //样式 button
                if ($(".num_color").html() == $(".page_div").attr("total_page")) {
                    $(".next_page").attr('id', 'disableClass');
                    $(".end_page").attr('id', 'disableClass');

                }
                if ($(".num_color").html() !== 1) {
                    $(".prev_page").removeAttr('id');
                    $(".start_page").removeAttr('id');
                }
                if (page < page01) {

                    if (a > 3) {
                        for (var i = 0; i < 5; i++) {
                            var b = page - 4 + i;
                            $(".num_page button").eq(i).html(b);
                        }
                    }
                }
                var mark_01_select_a = $("mark_01_select").children('option:selected').attr("data-id");

                var num = parseInt($(".num_color").html());
                markxl01(mark_01_select_a, num);

            }

        });

        $(".prev_page").click(function(event) {
            if ($(".num_color").html() == 1) {
                $(".prev_page").attr('id', 'disableClass');
                $(".start_page").attr('id', 'disableClass');
            } else {
                var a = $(".num_color").index();
                $(".num_color").prev().attr("class", "num_color").siblings().removeAttr("class");
                var a_num = Number($(".num_color").html());
                //样式 button
                if ($(".num_color").html() !== $(".page_div").attr("total_page")) {
                    $(".next_page").removeAttr('id');
                    $(".end_page").removeAttr('id');

                }
                if ($(".num_color").html() == 1) {
                    $(".prev_page").attr('id', 'disableClass');
                    $(".start_page").attr('id', 'disableClass');
                }

                var page = a_num - 1;
                if (a < 1) {
                    if (a_num > 1) {
                        for (var i = 0; i < 5; i++) {
                            var b = page + i;
                            $(".num_page button").eq(i).html(b);
                        }

                    }
                }
                var mark_01_select_a = $("mark_01_select").children('option:selected').attr("data-id");

                var num = parseInt($(".num_color").html());

                markxl01(mark_01_select_a, num);
            }

        });

        $(".start_page").click(function(event) {
            $(".prev_page").attr('id', 'disableClass');
            $(".start_page").attr('id', 'disableClass');
            if ($(".num_color").html() == 1) {

            } else {
                $(".num_page button").eq(0).attr("class", "num_color").siblings().removeAttr("class");
                var a = $(".num_page button").length;
                for (var i = 0; i < a; i++) {
                    var b = i + 1;
                    $(".num_page button").eq(i).html(b);
                }
                var mark_01_select_a = $("mark_01_select").children('option:selected').attr("data-id");

                var num = parseInt($(".num_color").html());
                markxl01(mark_01_select_a, num);

            }
            if ($(".num_color").html() !== $(".page_div").attr("total_page")) {
                $(".end_page").removeAttr('id');
                $(".next_page").removeAttr('id');

            }
        });
        $(".end_page").click(function(event) {
            $(this).attr('id', 'disableClass');
            $(".next_page").attr('id', 'disableClass');
            if ($(".num_color").html() !== 1) {
                $(".start_page").removeAttr('id');
                $(".prev_page").removeAttr('id');
            }
            if ($(".num_color").html() == $(".page_div").attr("total_page")) {

            } else {
                var a = Number($(".num_page button").length) - 1;
                $(".num_page button").eq(a).attr("class", "num_color").siblings().removeAttr("class");
                var page = Number($(".page_div").attr("total_page"));
                var a_long = Number($(".num_page button").length);

                if (a_long > 5 || a_long == 5) {

                    for (var i = 0; i < a_long; i++) {
                        var b = page - 4 + i;
                        console.log("123");
                        $(".num_page button").eq(i).html(b);
                    }
                }
                var mark_01_select_a = $("mark_01_select").children('option:selected').attr("data-id");
                var num = parseInt($(".num_color").html());
                markxl01(mark_01_select_a, num);

            }

        });
        $(".num_page").on('click', 'button', function(event) {
            if ($(this).attr("class") !== "num_color") {

                $(this).attr("class", "num_color").siblings().removeAttr("class");
                if ($(".num_color").html() !== 1) {
                    $(".prev_page").removeAttr('id');
                    $(".start_page").removeAttr('id');
                }
                var mark_01_select_a = $("mark_01_select").children('option:selected').attr("data-id");
                var num = parseInt($(".num_color").html());
                markxl01(mark_01_select_a, num);
            }
            if ($(".num_color").html() == 1) {
                $(".prev_page").attr('id', 'disableClass');
                $(".start_page").attr('id', 'disableClass');
                if ($(".num_color").html() != $(".page_div").attr("total_page")) {
                    $(".end_page").removeAttr('id');
                    $(".next_page").removeAttr('id');
                    $(".prev_page").attr('id', 'disableClass');
                    $(".start_page").attr('id', 'disableClass');
                } else {
                    $(".prev_page").attr('id', 'disableClass');
                    $(".start_page").attr('id', 'disableClass');
                    $(".end_page").attr('id', 'disableClass');
                    $(".next_page").attr('id', 'disableClass');

                }


            }
            if ($(".num_color").html() == $(".page_div").attr("total_page")) {
                if ($(".num_color").html() != 1) {
                    $(".prev_page").removeAttr('id');
                    $(".start_page").removeAttr('id');
                    $(".end_page").attr('id', 'disableClass');
                    $(".next_page").attr('id', 'disableClass');
                } else {
                    $(".prev_page").attr('id', 'disableClass');
                    $(".start_page").attr('id', 'disableClass');
                    $(".end_page").attr('id', 'disableClass');
                    $(".next_page").attr('id', 'disableClass');

                }


            }
            if ($(".num_color").html() != 1 && $(".num_color").html() != $(".page_div").attr("total_page")) {
                $(".prev_page").removeAttr('id');
                $(".start_page").removeAttr('id');
                $(".end_page").removeAttr('id');
                $(".next_page").removeAttr('id');
            }
        });

        if ($(".num_color").html() == 1) {
            $(".prev_page").attr('id', 'disableClass');
            $(".start_page").attr('id', 'disableClass');


        }
        if ($(".num_color").html() == $(".page_div").attr("total_page")) {
            $(".prev_page").attr('id', 'disableClass');
            $(".start_page").attr('id', 'disableClass');
            $(".end_page").attr('id', 'disableClass');
            $(".next_page").attr('id', 'disableClass');

        }

    })
    // 考试状况
    .controller("form02Controller", function() {
        $(".main_left a").eq(1).addClass('li_click').siblings().removeClass("li_click");
        $("#index_span").html($(".main_left a").eq(1).html());
        var isLogin = localStorage.getItem("token");
        $.ajax({
            type: "GET",
            url: ajaxIp + "/api/v2/reports/exams",
            async: false,
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
                        $(".exam_sub").attr("data-id", data[0].subjects[0].subject_id);
                    };
                    // 班级
                    var class_d = data[0].classrooms.length;
                    $("#mark_bj").html('');
                    for (var a = 0; a < class_d; a++) {
                        $("#mark_bj").append('<option value="" data-id=' + data[0].classrooms[a].classroom_id + '>' + data[0].classrooms[a].classroom_name + '</option>');
                        $("#mark_bj").attr("data-id", data[0].classrooms[0].classroom_id);
                    };
                    $(".exam_name").change(function() {

                        var c = $(this).children('option:selected').index()
                        var b = data[c].subjects.length;
                        var class_b = data[c].classrooms.length;
                        $(".exam_sub").html('');
                        $("#mark_bj").html('');
                        for (var a = 0; a < b; a++) {
                            $(".exam_sub").append('<option value="" data-id=' + data[c].subjects[a].subject_id + '>' + data[c].subjects[a].name + '</option>');
                            $(".exam_sub").attr("data-id", data[c].subjects[0].subject_id);
                        };
                        for (var a = 0; a < class_b; a++) {
                            $("#mark_bj").append('<option value="" data-id=' + data[c].classrooms[a].classroom_id + '>' + data[c].classrooms[a].classroom_name + '</option>');
                            $("#mark_bj").attr("data-id", data[c].classrooms[0].classroom_id);
                        };


                    });

                }

                var class_id = $("#mark_bj").children('option:selected').attr("data-id");
                kaoshizk02(class_id);
                kaoshizk(10);
            },
            error: function() {}

        });
        // 考试状况的选择事件11
        $(".study_q_01_mark select").change(function(event) {
            var a = $("#mark_bj").children('option:selected').attr("data-id");
            kaoshizk02(a);
            kaoshizk(10);
        });
        // 班级
        $("#mark_bj").change(function(event) {

            $(this).attr("data-id", $(this).children('option:selected').attr("data-id"));
            var a = $("#mark_bj").children('option:selected').attr("data-id");
            kaoshizk02(a);
        });
        // 考试状况的函数

        function kaoshizk(num_r) {
            var exam_id = parseInt($(".exam_name").children('option:selected').attr("data-id"));
            $(".exam_sub").attr("data-id", $(".exam_sub").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".exam_sub").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".exam_sub").attr("data-id"));
            }
            console.log(exam_id);
            console.log(sub_id);
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/grade_index",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "number": num_r,
                },
                success: function(data) {
                    console.log(data);
                    // 基本概况
                    if (data.error_code == 500) {
                        $(".right_02 img").hide();
                        $("#right_02_r").hide();
                        $("#right_03").html(' ');
                        $("#right_04").html(' ');
                        $("#r5_11_tbody").html(' ');
                        $("#r5_11_tbody02").html(' ');
                        $("#r5_11_tbody03").html(' ');
                        $("#r5_11_tbody04").html(' ');
                        $(".r2_02_01_i01").html("0");
                        $(".r2_02_01_i02").html(" ");
                        $(".r2_02_01_i02").append('(缺考0人)');
                        $(".r2_02_02").html("0");
                        $(".r2_02_06").html("0");
                        $(".r2_02_03").html("0");
                        $(".r2_02_04").html("0");
                        $(".r2_02_05").html("0");
                        $(".right_01").siblings().not(".right_01,.study_q_01").hide()
                        $("#tips").remove()
                        $("#main_right").append("<div id='tips' style='text-align: center;color:red'>该科目阅卷未分析完成</div>")
                        console.log(1111)
                        return false
                    } else {
                        $(".right_02 img").show();
                        $("#right_02_r").show();

                        $(".r2_02_01_i01").html(data.basic_situation.statistics_total);
                        $(".r2_02_01_i02").html(" ");
                        $(".r2_02_01_i02").append('(缺考' + data.basic_situation.absent_total + '人)');
                        $(".r2_02_02").html(data.basic_situation.average);
                        $(".r2_02_03").html(data.basic_situation.average_rate + "%");
                        $(".r2_02_04").html(data.basic_situation.pass_rate + "%");
                        $(".r2_02_05").html(data.basic_situation.fine_rate + "%");
                        $(".r2_02_06").html(data.basic_situation.standard_deviation);
                        var a = 100 - data.basic_situation.fine_rate;
                        var b = 100 - data.basic_situation.pass_rate;
                        var c = 100 - data.basic_situation.average_rate;
                        console.log(a, b);
                        basic_y(a, b, c);

                    }

                    // 分数段分布
                    var d = [];
                    var f = [];

                    if (data.error_code !== 500) {
                        for (var i = 0; i < data.socre_distribution.socre_distributions.length; i++) {
                            d.push(data.socre_distribution.socre_distributions[i].range_text);
                            f.push(data.socre_distribution.socre_distributions[i].count);
                        };
                        mark_fb(d, f);
                    };


                    // 年级成绩大幅变化
                    if (data.error_code !== 500) {
                        $("#r5_11_tbody").html(' ');
                        $("#r5_11_tbody02").html(' ');
                        $("#r5_11_tbody03").html(' ');
                        $("#r5_11_tbody04").html(' ');
                        if (data.grade_ranking_range.rise !== null) {
                            for (var i = 0; i < data.grade_ranking_range.rise.length; i++) {
                                if (data.grade_ranking_range.rise[i].grade_ranking_change == null) {
                                    data.grade_ranking_range.rise[i].grade_ranking_change = 0;
                                };

                                if (data.grade_ranking_range.rise[i].grade_ranking_change < 0) {
                                    var a = data.grade_ranking_range.rise[i].grade_ranking_change * (-1);
                                } else {
                                    var a = data.grade_ranking_range.rise[i].grade_ranking_change;
                                };
                                $("#r5_11_tbody").append(' <tr><td>' + data.grade_ranking_range.rise[i].name + '</td><td>' + data.grade_ranking_range.rise[i].grade_rank + '</td><td>' + a + '<i class="iconfont">&#xe627;</i></td></tr>');

                            }
                        };
                    }
                    // 大幅度退步
                    if (data.grade_ranking_range.decline !== null) {
                        for (var i = 0; i < data.grade_ranking_range.decline.length; i++) {

                            if (data.grade_ranking_range.decline[i].grade_ranking_change == null) {
                                data.grade_ranking_range.decline[i].grade_ranking_change = 0;
                            };
                            $("#r5_11_tbody02").append(' <tr><td>' + data.grade_ranking_range.decline[i].name + '</td><td>' + data.grade_ranking_range.decline[i].grade_rank + '</td><td>' + data.grade_ranking_range.decline[i].grade_ranking_change + '<i class="iconfont">&#xe628;</i></td></tr>');


                        };
                    };
                    // 年级前后10名
                    if (data.grade_rank_ten.top_ten !== null) {
                        for (var i = 0; i < data.grade_rank_ten.top_ten.length; i++) {
                            $("#r5_11_tbody03").append(' <tr><td>' + data.grade_rank_ten.top_ten[i].name + '</td><td>' + data.grade_rank_ten.top_ten[i].grade_rank + '</td><td>' + data.grade_rank_ten.top_ten[i].class_name + '</td></tr>');
                        };
                    };
                    if (data.grade_rank_ten.after_ten !== null) {
                        for (var i = 0; i < data.grade_rank_ten.after_ten.length; i++) {
                            $("#r5_11_tbody04").append(' <tr><td>' + data.grade_rank_ten.after_ten[i].name + '</td><td>' + data.grade_rank_ten.after_ten[i].grade_rank + '</td><td>' + data.grade_rank_ten.after_ten[i].class_name + '</td></tr>');

                        };
                    }
                },
                error: function() {

                }
            });

        };

        function kaoshizk02(class_id) {
            var exam_id = parseInt($(".exam_name").children('option:selected').attr("data-id"));
            $(".exam_sub").attr("data-id", $(".exam_sub").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".exam_sub").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".exam_sub").attr("data-id"));
            }
            console.log(exam_id);
            console.log(sub_id);
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/grade_index",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "classroom_id": class_id,
                },
                success: function(data) {

                    // 基本概况
                    if (data.error_code == 500) {

                    } else {

                        // 年级学科趋势
                        var nub_c = [];
                        var nub_m = [];
                        var nub_bj = [];
                        if (data.grade_socre_trend.grade_trend.length !== 0) {
                            $(".right_01").siblings().not(".right_01,.study_q_01").show()
                            $("#tips").remove()
                            for (var i = 0; i < data.grade_socre_trend.grade_trend.length; i++) {
                                var nub = "第" + (i + 1) + "次考试"
                                nub_c.push(nub);
                                nub_m.push(data.grade_socre_trend.grade_trend[i].average);

                            };
                            for (var i = 0; i < data.grade_socre_trend.class_trend.length; i++) {
                                nub_bj.push(data.grade_socre_trend.class_trend[i].average);

                            };
                            console.log(nub_c);
                            console.log(nub_bj);
                            njxk(nub_c, nub_m, nub_bj);
                        };
                    }
                },
                error: function() {

                }
            });

        };
        // 年级状况导出
        $(".mark_btn_01").click(function(event) {

            mark_btn_01($("#myselect").val());
        });
        $(".mark_btn_02").click(function(event) {
            mark_btn_02($("#myselect").val());
        });

        function mark_btn_01(nub) {
            var exam_id = parseInt($(".exam_name").children('option:selected').attr("data-id"));
            $(".exam_sub").attr("data-id", $(".exam_sub").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".exam_sub").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".exam_sub").attr("data-id"));
            }
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "api/v2/reports/export_grade_ranking_range",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "number": nub,
                },
                success: function(data) {
                    console.log(data);
                    $(".mark_btn_01").parent().attr("href", ajaxIp + data.file_path);
                },
                error: function() {

                }
            });

        }

        function mark_btn_02(nub) {
            var exam_id = parseInt($(".exam_name").children('option:selected').attr("data-id"));
            $(".exam_sub").attr("data-id", $(".exam_sub").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".exam_sub").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".exam_sub").attr("data-id"));
            }
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "api/v2/reports/export_grade_rank_ten",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "number": nub,
                },
                success: function(data) {
                    console.log(data);
                    $(".mark_btn_02").parent().attr("href", ajaxIp + data.file_path);
                },
                error: function() {

                }
            });

        }

        $(".sn_1").hide();
        $(".sn_2").hide();

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

            $(".r5_30 a").html($("#myselect").val());
            $(".r5_41 a").html($("#myselect").val());
            var a = $("#mark_bj").children('option:selected').attr("data-id");
            kaoshizk($("#myselect").val(), a);

        });

        // 基本情况
        function basic_y(a, b, c) {
            var a1 = 100 - a;
            var b1 = 100 - b;
            var c1 = 100 - c;

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
        function mark_fb(a, b) {
            var myChart = echarts.init(document.getElementById('right_03'));
            var option = {

                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    x: 28,
                    y: 40,
                    x2: 45,
                    y2: 45,
                    borderWidth: 1,
                },
                calculable: false,
                xAxis: [{
                    type: 'category',
                    data: a,
                    name: '分数段',
                    axisLabel: {
                        rotate: 40,
                        margin: 5,
                        textStyle: {
                            color: "666666",
                            align: 'left',
                            fontWeight: '300',
                            fontFamily: 'Arial',

                        }
                    },
                }],
                yAxis: [{
                    type: 'value',
                    name: '人数',
                    axisLabel: {
                        textStyle: {

                        }
                    },

                }],
                series: [{
                    name: '人数',
                    type: 'bar',
                    data: b,
                    itemStyle: { normal: { label: { show: true, position: 'top' } } },
                }]
            };
            // 为echarts对象加载数据 
            myChart.setOption(option);

        }


        // 年级学科趋势
        function njxk(a, b, d) {
            var myChart = echarts.init(document.getElementById('right_04'));

            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    x: 28,
                    y: 45,
                    x2: 30,
                    y2: 25,
                    borderWidth: 1
                },
                legend: {
                    data: ['年级平分数', '班级平分数']
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: a,
                    name: '考试',
                }],
                yAxis: [{

                    type: 'value',
                    name: '平均分',

                }],
                series: [{
                        name: '年级平分数',
                        type: 'line',
                        data: b,
                        itemStyle: { normal: { label: { show: true, position: 'bottom' } } },
                    },
                    {
                        name: '班级平分数',
                        type: 'line',
                        data: d,
                        itemStyle: { normal: { label: { show: true, position: 'bottom' } } },
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
            async: false,
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
                    $(".study_q_km02").attr("data-id", data[0].classrooms[0].classroom_id);
                };
                for (var i = 0; i < data[0].subjects.length; i++) {
                    $(".study_q_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                    $(".study_q_km03").attr("data-id", data[0].subjects[0].subject_id);
                };
                $(".study_q_km01").change(function(event) {

                    var index01 = $(".study_q_km01").children('option:selected').index()
                    var index02 = index01;

                    $(".study_q_km02 option").remove();
                    $(".study_q_km03 option").remove();
                    for (var i = 0; i < data[index02].classrooms.length; i++) {
                        $(".study_q_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>')
                        $(".study_q_km02").attr("data-id", data[index02].classrooms[0].classroom_id);
                    }
                    for (var i = 0; i < data[index02].subjects.length; i++) {
                        $(".study_q_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                        $(".study_q_km03").attr("data-id", data[index02].subjects[0].subject_id);
                    }

                });

                banji();
                // study_q_bb()

            },

            error: function() {

            }
        });
        //最新班级学情追踪选择事件
        $(".study_q_km select").change(function(event) {
            $("#study_q_i_btn_05c tr").remove();
            $(".study_q_i_btn_01").parent().removeAttr('href');
            $(".study_q_i_btn_02").parent().removeAttr('href');
            $(".study_q_i_btn_03").parent().removeAttr('href');
            $(".study_q_i_btn_04").parent().removeAttr('href');
            $(".study_q_i_btn_05").parent().removeAttr('href');
            $(".study_q_i_btn_06").parent().removeAttr('href');
            $(".all_study_q_i_btn").parent().removeAttr('href');
            banji();

        });
        $(".study_q_i_btn_01").click(function(event) {

            study_q_bb01();
        });

        $(".study_q_i_btn_02").click(function(event) {

            study_q_bb02();
        });
        $(".study_q_i_btn_03").click(function(event) {
            study_q_bb03();
        });
        $(".study_q_i_btn_04").click(function(event) {
            study_q_bb04();
        });
        $(".study_q_i_btn_05").click(function(event) {
            study_q_bb05();
        });
        $(".study_q_i_btn_06").click(function(event) {
            study_q_bb06();
        });

        $(".all_study_q_i_btn").click(function(event) {
            study_q_bb_all()
        });

        $(".study_q_qk03").click(function(event) {

            $(".study_q_qk").hide();
            $(".mask_layer").hide();
        });

        //最新班级学情追踪函数
        // 缺考人数
        $(".study_q_qkck").click(function(event) {
            $(".study_q_qk span").html(" ");
            $(".study_q_qk02").html(" ");
            $(".mask_layer").css("height", $(document).height());
            $(".study_q_qk").show();
            $(".mask_layer").show();
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


            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/absents",
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
                    $(".study_q_qk span").html(" ");
                    $(".study_q_qk02").html(" ");
                    $(".study_q_qk span").html(data[0].classroom_name + data[0].subject_name);

                    for (var i = 0; i < data.length; i++) {
                        $(".study_q_qk02").append('<a>' + data[i].name + '</a>')
                    }
                },
                error: function() {

                }

            });


        });

        $(".mark_num").change(function(event) {
            banji();
        });

        function banji() {
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
            var step_eq = parseInt($(".mark_num").children('option:selected').val());
            var sub_val = $(".study_q_km03").children('option:selected').html();
            $(".study_q_06_1 span").html(sub_val);
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/class_index",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "classroom_id": class_id,
                    "step_eq": step_eq,

                },
                success: function(data) {
                    console.log(data);
                    if (data.error_code == 500) {
                        $(".study_q_zhong").hide();
                        $(".study_q_zhong_p").html(data.error_message);
                        $(".study_q_zhong_p").show();
                        $(".study_q_04_bo").hide();
                        $(".study_q_02_bo").hide();
                        $("#study_q_03_02").html(" ");
                        $(".study_q_05_01").html(" ");
                        $(".qk_a").html("0"); //
                    } else {
                        $(".study_q_zhong").show();
                        $(".study_q_zhong_p").hide();
                        $(".study_q_04_bo").show();
                        $(".study_q_02_bo").show();
                        $(".study_q_zt td").eq(0).html(data.class_basic_situation.full_score);
                        $(".study_q_zt td").eq(1).html(data.class_basic_situation.average);
                        $(".study_q_zt td").eq(2).html(data.class_basic_situation.highest_score);
                        $(".study_q_zt td").eq(3).html(data.class_basic_situation.lowest_score);
                        $(".study_q_zt td").eq(4).html(data.class_basic_situation.pass_number);
                        $(".study_q_zt td").eq(5).html(data.class_basic_situation.fine_number);
                        $(".study_q_zt td").eq(6).html(data.class_basic_situation.student_total);
                        $(".qk_a").html(data.class_basic_situation.absent_total);
                        // 分数段分布 
                        var a1 = [];
                        var b1 = [];
                        for (var i = 0; i < data.socre_distribution.socre_distributions.length; i++) {
                            a1.push(data.socre_distribution.socre_distributions[i].range_text);
                            b1.push(data.socre_distribution.socre_distributions[i].count);
                        };
                        study_q_fd(a1, b1);
                    };
                    // 班级成绩大幅度变化
                    if (data.error_code !== 500) {
                        // 大幅度进步
                        if (data.class_ranking_range.rise !== null) {
                            for (var i = 0; i < data.class_ranking_range.rise.length; i++) {
                                var a = i + 1;
                                var c = $(".study_q_dfj tr").eq(a);
                                c.find('td').eq(1).html(data.class_ranking_range.rise[i].name);
                                c.find('td').eq(2).html(data.class_ranking_range.rise[i].class_rank);
                                // console.log(data.class_ranking_range.rise[0].class_ranking_change);
                                if (data.class_ranking_range.rise[i].class_ranking_change == null) {
                                    data.class_ranking_range.rise[i].class_ranking_change = 0;
                                };
                                if (data.class_ranking_range.rise[i].class_ranking_change < 0) {
                                    var a_rag = data.class_ranking_range.rise[i].class_ranking_change * (-1);
                                } else {
                                    var a_rag = data.class_ranking_range.rise[i].class_ranking_change;
                                };
                                c.find('td').eq(3).children('span').html(a_rag);

                            }
                        }
                        // 大幅度退步
                        if (data.class_ranking_range.decline !== null) {
                            for (var i = 0; i < data.class_ranking_range.decline.length; i++) {
                                var a = i + 1;
                                var d = $(".study_q_dft tr").eq(a);
                                d.find('td').eq(1).html(data.class_ranking_range.decline[i].name);
                                d.find('td').eq(2).html(data.class_ranking_range.decline[i].class_rank);
                                if (data.class_ranking_range.decline[i].class_ranking_change == null) {
                                    data.class_ranking_range.decline[i].class_ranking_change = 0;
                                };
                                d.find('td').eq(3).children('span').html(data.class_ranking_range.decline[i].class_ranking_change);
                            }
                        }
                    };
                    // 前后5名 
                    if (data.class_rank_five.top_five !== null) {
                        if (data.error_code !== 500) {
                            for (var i = 0; i < data.class_rank_five.top_five.length; i++) {
                                // var i1 = 3 - i;
                                var a = i + 1;
                                var c = $("#study_q_q5 tr").eq(a);
                                c.find('td').eq(0).html(data.class_rank_five.top_five[i].class_rank);
                                c.find('td').eq(1).html(data.class_rank_five.top_five[i].name);

                            }
                        };
                    };
                    // 后五
                    if (data.class_rank_five.after_five !== null) {
                        if (data.error_code !== 500) {
                            var nub = data.class_rank_five.after_five.length - 1;
                            for (var i = 0; i < data.class_rank_five.after_five.length; i++) {
                                var i1 = nub - i;
                                var a = i + 1;

                                var d = $("#study_q_h5 tr").eq(a);
                                d.find('td').eq(0).html(data.class_rank_five.after_five[i1].class_rank);
                                d.find('td').eq(1).html(data.class_rank_five.after_five[i1].name);
                            }
                        };
                    };
                    // 小得分详情
                    if (data.error_code !== 500) {
                        var x_zhe = ["选项A", "选项B", "选项C", "选项D", "选项E", "选项F", "选项G", "选项H", "选项I", "选项J", "选项K", "选项L", "选项M", "选项N", "选项O"];
                        var x_value = ["column_value_1", "column_value_2", "column_value_3", "column_value_4", "column_value_5", "column_value_6", "column_value_7", "column_value_8", "column_value_9", "column_value_10", "column_value_11", "column_value_12", "column_value_13", "column_value_14", "column_value_15"];

                        var p_duan = ["T", "F"];
                        var tab_th = [];
                        var tab_th1 = {};
                        var tab_bo = [];
                        var tab_bo1 = {};
                        var bo_td = [];
                        var bo_td1 = {};
                        var tab = [];
                        var tab1 = {};
                        $(".study_q_05_01").html(" ");
                        for (var i = 0; i < data.class_answer_setting_statistic.length; i++) {
                            var tab_th1 = new Object();
                            tab_th1 = "tab_th0" + i;
                            tab_th.push(tab_th1);
                            var tab_bo1 = new Object();
                            tab_bo1 = "tab_bo0" + i;
                            tab_bo.push(tab_bo1);
                            tab1 = "tab0" + i;
                            tab.push(tab1);

                            var td_nub = 0;
                            td_nub = data.class_answer_setting_statistic[i].content.length;

                            $(".study_q_05_01").append('<table cellspacing="0" border="1" bordercolor="#cccccc" id="' + tab[i] + '"><thead><tr><th>题型</th><th>平均分</th><th>题号</th><th id="' + tab_th[i] + '">正确答案</th><th>正确率</th><th>详情</th></tr></thead><tbody id="' + tab_bo[i] + '"></tbody></table>');

                            if (data.class_answer_setting_statistic[i].content[0].item == "单选题") {
                                for (var a = 0; a < data.class_answer_setting_statistic[i].content[0].size; a++) {
                                    $('#' + tab_th[i] + '').before('<th>' + x_zhe[a] + '</th>');
                                    console.log(data.class_answer_setting_statistic[0].content[0].average);
                                }
                            };
                            if (data.class_answer_setting_statistic[i].content[0].item == "是非题") {
                                $('#' + tab_th[i] + '').before('<th>T</th><th>F</th>');
                            };
                            if (data.class_answer_setting_statistic[i].content[0].item == 0) {
                                for (var a = 0; a < data.class_answer_setting_statistic[i].content[0].size; a++) {
                                    $('#' + tab_th[i] + '').before('<th>' + x_zhe[a] + '</th>');
                                    console.log(data.class_answer_setting_statistic[0].content[0].average);
                                }
                            };
                            if (data.class_answer_setting_statistic[i].content[0].item == 2) {
                                $('#' + tab_th[i] + '').before('<th>T</th><th>F</th>');
                            };
                            for (var c = 0; c < td_nub; c++) {

                                $('#' + tab_bo[i] + '').append('<tr></tr>');

                                var zq_rate = Math.round(data.class_answer_setting_statistic[i].content[c].correct_rate * 100) + "%";
                                if (c == 0) {
                                    console.log(c);
                                    $('#' + tab_bo[i] + ' tr').eq(c).append('<td style="border:0px;">' + data.class_answer_setting_statistic[i].answer_name + '</td><td>' + data.class_answer_setting_statistic[i].content[c].average + '</td><td>' + data.class_answer_setting_statistic[i].content[c].num + '</td><td>' + data.class_answer_setting_statistic[i].content[c].correct + '</td><td>' + zq_rate + '</td><td data-itm="' + data.class_answer_setting_statistic[i].content[c].item + '"><span data_ans="' + data.class_answer_setting_statistic[i].content[c].answer_setting_id + '"  data-id="' + data.class_answer_setting_statistic[i].content[c].num + '">查看</span></td></tr>');

                                } else {
                                    $('#' + tab_bo[i] + ' tr').eq(c).append('<td style="border:0px;"></td><td>' + data.class_answer_setting_statistic[i].content[c].average + '</td><td>' + data.class_answer_setting_statistic[i].content[c].num + '</td><td>' + data.class_answer_setting_statistic[i].content[c].correct + '</td><td>' + zq_rate + '</td><td data-itm="' + data.class_answer_setting_statistic[i].content[c].item + '"><span data_ans="' + data.class_answer_setting_statistic[i].content[c].answer_setting_id + '"  data-id="' + data.class_answer_setting_statistic[i].content[c].num + '">查看</span></td></tr>');
                                }
                                //选项
                                for (var d = 0; d < data.class_answer_setting_statistic[i].content[0].size; d++) {
                                    var f = data.class_answer_setting_statistic[i].content[0].size - 1 - d;
                                    var a_var = x_value[f];
                                    if (data.class_answer_setting_statistic[i].content[c][a_var] == undefined) {
                                        data.class_answer_setting_statistic[i].content[c][a_var] = 0;

                                    };
                                    $('#' + tab_bo[i] + ' tr').eq(c).find("td").eq(2).after('<td style=" color:' + data.class_answer_setting_statistic[i].content[c].result[f] + '">' + data.class_answer_setting_statistic[i].content[c][a_var] + '</td>');
                                }

                            }

                        }
                        for (var i = 0; i < data.class_answer_setting_statistic.length; i++) {
                            FixTable('' + tab[i] + '', 1, 936, 200);
                        }
                    };

                    if (data.error_code !== 500) {
                        $("#study_q_i_btn_05c").html(" ");
                        for (var i = 0; i < data.class_students.exam_subjects.length; i++) {
                            if (data.class_students.exam_subjects[i].class_ranking_change == null) {
                                data.class_students.exam_subjects[i].class_ranking_change = 0;
                            };
                            if (data.class_students.exam_subjects[i].class_ranking_change < 0) {
                                var a_rang = data.class_students.exam_subjects[i].class_ranking_change * (-1);
                                $("#study_q_i_btn_05c").append('<tr><td>' + data.class_students.exam_subjects[i].exam_no + '</td><td>' + data.class_students.exam_subjects[i].name + '</td><td>' + data.class_students.exam_subjects[i].score + '</td><td>' + data.class_students.exam_subjects[i].level + '</td><td>' + data.class_students.exam_subjects[i].class_rank + '</td><td style="color:#fb7d8a" id="class_rang0' + i + '">' + a_rang + '<i class="iconfont">&#xe627;</i></td><td><span data-exno="' + data.class_students.exam_subjects[i].exam_no + '">查看答题卡</span></td><td>点评</td></tr>');

                            } else {
                                $("#study_q_i_btn_05c").append('<tr><td>' + data.class_students.exam_subjects[i].exam_no + '</td><td>' + data.class_students.exam_subjects[i].name + '</td><td>' + data.class_students.exam_subjects[i].score + '</td><td>' + data.class_students.exam_subjects[i].level + '</td><td>' + data.class_students.exam_subjects[i].class_rank + '</td><td style="color:#31bc91">' + data.class_students.exam_subjects[i].class_ranking_change + '<i class="iconfont">&#xe628;</i></td><td><span data-exno="' + data.class_students.exam_subjects[i].exam_no + '">查看答题卡</span></td><td>点评</td></tr>');

                            }

                        }

                        $(".study_q_i_btn_05").attr('a', '2');
                    }



                },
                error: function() {

                }

            });
        };
        // 小题查看
        $(".study_q_05_01").on('click', 'span', function(event) {

            // 切换页面//
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
            $(".study_q_ck_a2").attr("data_ans", $(this).parents().prev().prev().html());
            $(".xiaoti_mark").attr("data-itm", $(this).parents().attr("data-itm"));


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
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + "/api/v2/reports/class_student_answer_setting_statistic",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "classroom_id": class_id,
                    "answer_setting_id": data_ans,
                },
                success: function(data) {
                    console.log(data);
                    console.log(data.student_answer_setting_infos.A);
                    var da_ans = $(".study_q_ck_a2").attr("data_ans");
                    var da_ans01 = da_ans.split(",");
                    console.log(da_ans01);
                    $(".xiaoti_mark").html(" ");
                    var x_zhe = [];

                    var jsons = data.student_answer_setting_infos;

                    for (var key in jsons) {
                        console.log(key);

                        x_zhe.push(key);
                    }
                    // }
                    console.log(x_zhe);
                    console.log(x_zhe.length);
                    //去掉为空的
                    var rem_null = [];
                    var rem_null_num = 0;
                    for (var i = 0; i < x_zhe.length; i++) {

                        var jsons01 = data.student_answer_setting_infos[x_zhe[i]];

                        if (jsons01 !== null) {

                            rem_null[rem_null_num] = jsons01;
                            rem_null_num++;
                        }


                    }

                    console.log(rem_null);
                    for (var i = 0; i < rem_null.length; i++) {
                        var a = x_zhe[i];
                        var tda_id = "x_" + a;
                        $(".xiaoti_mark").append('<tr id="' + tda_id + '"><td>' + a + '</td><td></td></tr>')

                        var b = rem_null[i].length;
                        console.log(rem_null[i]);
                        console.log(b);
                        for (var c = 0; c < b; c++) {

                            $('#' + tda_id + ' td').eq(1).append('<a>' + rem_null[i][c].real_name + '</a>');


                        }
                        for (var a_i = 0; a_i < da_ans01.length; a_i++) {

                            if (x_zhe[i] == da_ans01[a_i]) {
                                $('#' + tda_id + '').find('a').css("background", "#fb7d8a");
                                console.log(tda_id);
                            }
                        }
                    };
                },
                error: function() {

                }


            });
        });

        // 班级学情追中的导出报表

        function study_q_bb01() {
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
                async: false,
                url: ajaxIp + "/api/v2/reports/export_class_basic_situation",
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
                    $(".study_q_i_btn_01").parent().attr("href", ajaxIp + data.file_path);
                },
                error: function() {}
            });
        };
        // 第二个导出
        function study_q_bb02() {
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
            var step_eq = parseInt($(".mark_num").children('option:selected').val());
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/export_socre_distribution",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "classroom_id": class_id,
                    "step_eq": step_eq,
                },
                success: function(data) {
                    console.log(data);
                    $(".study_q_i_btn_02").parent().attr("href", ajaxIp + data.file_path);
                },
                error: function() {}
            });
        };
        // 第三个导出
        function study_q_bb03() {
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
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/export_class_ranking_range",
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
                    $(".study_q_i_btn_03").parent().attr("href", ajaxIp + data.file_path);
                },
                error: function() {}
            });
        };
        // 第四个导出
        function study_q_bb04() {
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
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/export_class_rank_five",
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
                    $(".study_q_i_btn_04").parent().attr("href", ajaxIp + data.file_path);
                },
                error: function() {}
            });
        };
        // 第6个导出
        function study_q_bb06() {
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
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/export_class_students",
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
                    $(".study_q_i_btn_06").parent().attr("href", ajaxIp + data.file_path);
                },
                error: function() {}
            });
        };

        function study_q_bb_all() {
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
            var step_eq = parseInt($(".mark_num").children('option:selected').val());
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/basic_report",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "classroom_id": class_id,
                    "step_eq": step_eq,
                },
                success: function(data) {
                    console.log(data);
                    $(".all_study_q_i_btn").parent().attr("href", ajaxIp + data.file_path);
                },
                error: function() {}
            });
        };

        // 分数段分布插件
        function study_q_fd(a, b) {
            var myChart = echarts.init(document.getElementById('study_q_03_02'));

            var option = {

                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    x: 28,
                    y: 23,
                    x2: 50,
                    y2: 45,
                    borderWidth: 1,
                },
                calculable: false,
                xAxis: [{
                    type: 'category',
                    name: '分数段',
                    // boundaryGap : false,
                    data: a,
                    axisLabel: {
                        rotate: 40,
                        margin: 5,
                        textStyle: {
                            color: "666666",
                            align: 'left',
                            fontWeight: '300',
                            fontFamily: 'Arial',
                            // fontStyle: 'normal',
                        }
                    },
                }],

                yAxis: [{
                    type: 'value',
                    name: '人数',
                }],
                series: [{
                    name: '人数',
                    type: 'bar',
                    data: b,
                    itemStyle: { normal: { label: { show: true, position: 'top' } } },
                }]
            };
            // 为echarts对象加载数据 
            myChart.setOption(option);
        };

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

        //查看答题卡
        $(".study_q_06_tab").on('click', 'span', function(event) {
            $(".mask_layer02").css("height", $(document).height());
            $(".mask_layer02").show();
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
            var exon_id = $(this).attr("data-exno")
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/scanner_images/student_scanner_images",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
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
            $(".mask_layer02").hide();
        });
        // <!--最新班级学情追踪 end-->
        function FixTable(TableID, FixColumnNumber, width, height) {

            if ($("#" + TableID + "_tableLayout").length != 0) {
                $("#" + TableID + "_tableLayout").before($("#" + TableID));
                $("#" + TableID + "_tableLayout").empty();
            } else {
                $("#" + TableID).after("<div id='" + TableID + "_tableLayout' style='overflow:hidden;height:230px;width:" + width + "px;'></div>");
            }
            $('<div id="' + TableID + '_tableFix"></div>' + '<div id="' + TableID + '_tableHead"></div>' + '<div id="' + TableID + '_tableColumn"></div>' + '<div id="' + TableID + '_tableData"></div>').appendTo("#" + TableID + "_tableLayout");
            var oldtable = $("#" + TableID);
            var tableFixClone = oldtable.clone(true);
            tableFixClone.attr("id", TableID + "_tableFixClone");
            $("#" + TableID + "_tableFix").append(tableFixClone);
            var tableHeadClone = oldtable.clone(true);
            tableHeadClone.attr("id", TableID + "_tableHeadClone");
            $("#" + TableID + "_tableHead").append(tableHeadClone);
            var tableColumnClone = oldtable.clone(true);
            tableColumnClone.attr("id", TableID + "_tableColumnClone");
            $("#" + TableID + "_tableColumn").append(tableColumnClone);
            $("#" + TableID + "_tableData").append(oldtable);
            $("#" + TableID + "_tableLayout table").each(function() {
                $(this).css("margin", "0");
            });
            var HeadHeight = $("#" + TableID + "_tableHead thead").height();
            HeadHeight += 2;
            $("#" + TableID + "_tableHead").css("height", HeadHeight);
            $("#" + TableID + "_tableFix").css("height", HeadHeight);
            var ColumnsWidth = 0;
            var ColumnsNumber = 0;
            $("#" + TableID + "_tableColumn tr:last td:lt(" + FixColumnNumber + ")").each(function() {
                ColumnsWidth += $(this).outerWidth(true);
                ColumnsNumber++;
            });
            ColumnsWidth += 2;
            if ($.support.msie) {
                switch ($.support.version) {
                    case "7.0":
                        if (ColumnsNumber >= 3) ColumnsWidth--;
                        break;
                    case "8.0":
                        if (ColumnsNumber >= 2) ColumnsWidth--;
                        break;
                }
            }
            $("#" + TableID + "_tableColumn").css("width", "325px");
            $("#" + TableID + "_tableFix").css("width", "325px");

            $("#" + TableID + "_tableData").scroll(function() {
                $("#" + TableID + "_tableHead").scrollLeft($("#" + TableID + "_tableData").scrollLeft());
                $("#" + TableID + "_tableColumn").scrollTop($("#" + TableID + "_tableData").scrollTop());
            });
            $("#" + TableID + "_tableFix").css({
                "overflow": "hidden",
                "position": "relative",
                "z-index": "50",
                "background-color": "#fff"
            });
            $("#" + TableID + "_tableHead").css({
                "overflow": "hidden",
                "width": width - 17,
                "position": "relative",
                "z-index": "45",
                "background-color": "#fff"
            });
            $("#" + TableID + "_tableColumn").css({
                "overflow": "hidden",
                "height": height - 17,
                "position": "relative",
                "z-index": "40",
                "background-color": "#fff"
            });
            $("#" + TableID + "_tableData").css({
                "overflow": "scroll",
                "width": width,
                "height": height,
                "position": "relative",
                "z-index": "35"
            });
            if ($("#" + TableID + "_tableHead").width() > $("#" + TableID + "_tableFix table").width()) {
                $("#" + TableID + "_tableHead").css("width", $("#" + TableID + "_tableFix table").width());
                $("#" + TableID + "_tableData").css("width", $("#" + TableID + "_tableFix table").width() + 17);
            }
            if ($("#" + TableID + "_tableColumn").height() > $("#" + TableID + "_tableColumn table").height()) {
                $("#" + TableID + "_tableColumn").css("height", $("#" + TableID + "_tableColumn table").height());
                $("#" + TableID + "_tableData").css("height", $("#" + TableID + "_tableColumn table").height() + 17);
            }
            $("#" + TableID + "_tableFix").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableHead").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableColumn").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableData").offset($("#" + TableID + "_tableLayout").offset());
        }



    })
    .controller("form04Controller", function() {
        $(".main_left a").eq(3).addClass('li_click').siblings().removeClass("li_click");
        $("#index_span").html($(".main_left a").eq(3).html());
        $("#study_k_left").css("margin-bottom", "250px");
        $(".study_k_left").show();
        $("#study_k_left").siblings("a").click(function(event) {
            /* Act on the event */
            $("#study_k_left").css("margin-bottom", "15px");
            $(".study_k_left").hide();
        });
        var isLogin = localStorage.getItem("token");
        // <!--最新学科追踪分析 start-->
        $(".study_k_left li").eq(0).css("color", "#31bc91").siblings().css("color", "#999999");
        $(".study_k_left li").click(function(event) {
            $(this).css("color", "#31bc91").siblings().css("color", "#999999");
            $(".study_k_b").html($(this).html());
            $(".study_k_tab").children('div').eq($(this).index()).show().siblings().hide();


        });


        function study_k_bb01() {
            var exam_id = $(".study_k_102_km01").children('option:selected').attr("data-id");
            $(".study_k_102_km02").attr("data-id", $(".study_k_102_km02").children('option:selected').attr("data-id"));
            var class_id = $(".study_k_102_km02").attr("data-id");
            if (class_id == null) {
                var class_id = $(".study_k_102_km02").attr("data-id");
            }
            $(".study_k_102_km03").attr("data-id", $(".study_k_102_km03").children('option:selected').attr("data-id"));
            var sub_id = $(".study_k_102_km03").attr("data-id");
            if (sub_id == null) {
                var sub_id = $(".study_k_102_km03").attr("data-id");
            };
            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            if (class_id == 11111) {
                var class_id = null;
            }
            if (sub_id == 22222) {
                var sub_id = null;
            }

            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/export_subject_integrated",
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
                    $(".study_k_102_101 button").parent().attr("href", ajaxIp + data.file_path);

                },
                error: function() {}

            });

        };


        function study_k_bb02() {
            var exam_id = parseInt($(".study_k_201_km01").children('option:selected').attr("data-id"));
            $(".study_k_201_km02").attr("data-id", $(".study_k_201_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".study_k_201_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".study_k_201_km02").attr("data-id"));
            }
            $(".study_k_201_km03").attr("data-id", $(".study_k_201_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".study_k_201_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".study_k_201_km03").attr("data-id"));
            }
            if (class_id == 11111) {
                var class_id = null;
            }
            if (sub_id == 22222) {
                var sub_id = null;
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
                    $(".study_k_201_101 button").parent().attr("href", ajaxIp + data.file_path);
                },
                error: function() {

                }

            });

        };

        function study_k_bb03() {
            var exam_id = parseInt($(".study_k_301_km01").children('option:selected').attr("data-id"));
            $(".study_k_301_km02").attr("data-id", $(".study_k_301_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".study_k_301_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".study_k_301_km02").attr("data-id"));
            }
            $(".study_k_301_km03").attr("data-id", $(".study_k_301_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".study_k_301_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".study_k_301_km03").attr("data-id"));
            }
            if (class_id == 11111) {
                var class_id = null;
            }
            if (sub_id == 22222) {
                var sub_id = null;
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
                    $(".study_k_301_101 button").parent().attr("href", ajaxIp + data.file_path);

                },
                error: function() {

                }

            });

        };

        function study_k_bb04() {
            var exam_id = parseInt($(".study_k_401_km01").children('option:selected').attr("data-id"));
            $(".study_k_401_km02").attr("data-id", $(".study_k_401_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".study_k_401_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".study_k_401_km02").attr("data-id"));
            }
            $(".study_k_401_km03").attr("data-id", $(".study_k_401_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".study_k_401_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".study_k_401_km03").attr("data-id"));
            }
            if (class_id == 11111) {
                var class_id = null;
            }
            if (sub_id == 22222) {
                var sub_id = null;
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
                    "subject_id": sub_id,
                },
                success: function(data) {
                    console.log(data);
                    console.log(data.file_path);
                    $(".study_k_401_101 button").parent().attr("href", ajaxIp + data.file_path);

                },
                error: function() {

                }

            });
        };

        function study_k_bb05() {
            var exam_id = parseInt($(".study_k_501_km01").children('option:selected').attr("data-id"));
            $(".study_k_501_km02").attr("data-id", $(".study_k_501_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".study_k_501_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".study_k_501_km02").attr("data-id"));
            }
            $(".study_k_501_km03").attr("data-id", $(".study_k_501_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".study_k_501_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".study_k_501_km03").attr("data-id"));
            }
            if (class_id == 11111) {
                var class_id = null;
            }
            if (sub_id == 22222) {
                var sub_id = null;
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
                    $(".study_k_501_101 button").parent().attr("href", ajaxIp + data.file_path);

                },
                error: function() {

                }

            });

        };

        function study_k_bb06() {
            var exam_id = parseInt($(".study_k_601_km01").children('option:selected').attr("data-id"));
            $(".study_k_601_km02").attr("data-id", $(".study_k_601_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".study_k_601_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".study_k_601_km02").attr("data-id"));
            }
            $(".study_k_601_km03").attr("data-id", $(".study_k_601_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".study_k_601_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".study_k_601_km03").attr("data-id"));
            }
            if (class_id == 11111) {
                var class_id = null;
            }
            if (sub_id == 22222) {
                var sub_id = null;
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
                    $(".study_k_601_101 button").parent().attr("href", ajaxIp + data.file_path);

                },
                error: function() {

                }

            });

        };

        function study_k_bb07() {
            var exam_id = parseInt($(".study_k_701_km01").children('option:selected').attr("data-id"));
            $(".study_k_701_km02").attr("data-id", $(".study_k_701_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".study_k_701_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".study_k_701_km02").attr("data-id"));
            }
            $(".study_k_701_km03").attr("data-id", $(".study_k_701_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".study_k_701_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".study_k_701_km03").attr("data-id"));
            }
            if (class_id == 11111) {
                var class_id = null;
            }
            if (sub_id == 22222) {
                var sub_id = null;
            }
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/export_all_subjects_score",
                headers: {
                    'Authorization': "Bearer " + isLogin,
                },
                data: {
                    "exam_id": exam_id,
                    "classroom_id": class_id,

                },
                success: function(data) {
                    console.log(data);
                    console.log(data.titile);
                    $(".study_k_701_101 button").parent().attr("href", ajaxIp + data.titile);

                },
                error: function() {

                }

            });
        };

        // 最新学科综合分析
        // 科目
        //科目1
        study_k_top01();

        function study_k_top01() {
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + "/api/v2/reports/exams",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                success: function(data) {
                    console.log(data);
                    $(".study_k_102_km01").html(" ");
                    $(".study_k_102_km02").html(" ");
                    $(".study_k_102_km03").html(" ");
                    for (var i = 0; i < data.length; i++) {
                        $(".study_k_102_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                    };
                    $(".study_k_102_km02").append('<option value="" data-id="11111">全部班级</option>');
                    $(".study_k_102_km03").append('<option value="" data-id="22222">全部科目</option>');
                    for (var i = 0; i < data[0].classrooms.length; i++) {
                        $(".study_k_102_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                        $(".study_k_102_km02").attr("data-id", data[0].classrooms[0].classroom_id);
                    };
                    for (var i = 0; i < data[0].subjects.length; i++) {
                        $(".study_k_102_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                        $(".study_k_102_km03").attr("data-id", data[0].subjects[0].subject_id);
                    };

                    $(".study_k_102_km01").change(function(event) {
                        var index01 = $(".study_k_102_km01").children('option:selected').index();
                        var index02 = index01;
                        $(".study_k_102_km02 option").remove();
                        $(".study_k_102_km03 option").remove();
                        $(".study_k_102_km02").append('<option value="" data-id="11111">全部班级</option>');
                        $(".study_k_102_km03").append('<option value="" data-id="22222">全部科目</option>');

                        for (var i = 0; i < data[index02].classrooms.length; i++) {
                            $(".study_k_102_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>');

                        }
                        for (var i = 0; i < data[index02].subjects.length; i++) {
                            $(".study_k_102_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                            $(".study_k_102_km03").attr("data-id", data[index02].subjects[0].subject_id);
                        }

                    });
                    study_k01();
                },

                error: function() {

                }
            });
        }
        //科目2
        function study_k_top02() {
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + "/api/v2/reports/exams",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                success: function(data) {
                    console.log(data);
                    $(".study_k_201_km01").html(" ");
                    $(".study_k_201_km02").html(" ");
                    $(".study_k_201_km03").html(" ");
                    for (var i = 0; i < data.length; i++) {
                        $(".study_k_201_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                    };
                    $(".study_k_201_km02").append('<option value="" data-id="11111">全部班级</option>');
                    $(".study_k_201_km03").append('<option value="" data-id="22222">全部科目</option>');
                    for (var i = 0; i < data[0].classrooms.length; i++) {
                        $(".study_k_201_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                        $(".study_k_201_km02").attr("data-id", data[0].classrooms[0].classroom_id);
                    };
                    for (var i = 0; i < data[0].subjects.length; i++) {
                        $(".study_k_201_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                        $(".study_k_201_km03").attr("data-id", data[0].subjects[0].subject_id);
                    };

                    $(".study_k_201_km01").change(function(event) {

                        var index01 = $(".study_k_201_km01").children('option:selected').index();
                        var index02 = index01;

                        $(".study_k_201_km02 option").remove();
                        $(".study_k_201_km03 option").remove();
                        $(".study_k_201_km02").append('<option value="" data-id="11111">全部班级</option>');
                        $(".study_k_201_km03").append('<option value="" data-id="22222">全部科目</option>');
                        $(".study_k_201_km02").attr("data-id", $(".study_k201_km02 option").eq(0).attr("data-id"));
                        $(".study_k_201_km03").attr("data-id", $(".study_k_201_km03 option").eq(0).attr("data-id"));
                        for (var i = 0; i < data[index02].classrooms.length; i++) {
                            $(".study_k_201_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>');

                        }
                        for (var i = 0; i < data[index02].subjects.length; i++) {
                            $(".study_k_201_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                            $(".study_k_201_km03").attr("data-id", data[index02].subjects[0].subject_id);
                        }

                    });

                },

                error: function() {

                }
            });
        }
        //科目3
        function study_k_top03() {
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + "/api/v2/reports/exams",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                success: function(data) {
                    console.log(data);
                    $(".study_k_301_km01").html(" ");
                    $(".study_k_301_km02").html(" ");
                    $(".study_k_301_km03").html(" ");
                    for (var i = 0; i < data.length; i++) {
                        $(".study_k_301_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                    };
                    $(".study_k_301_km02").append('<option value="" data-id="11111">全部班级</option>');
                    $(".study_k_301_km03").append('<option value="" data-id="22222">全部科目</option>');
                    for (var i = 0; i < data[0].classrooms.length; i++) {
                        $(".study_k_301_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                        $(".study_k_301_km02").attr("data-id", data[0].classrooms[0].classroom_id);
                    };
                    for (var i = 0; i < data[0].subjects.length; i++) {
                        $(".study_k_301_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                        $(".study_k_301_km03").attr("data-id", data[0].subjects[0].subject_id);
                    };

                    $(".study_k_301_km01").change(function(event) {

                        var index01 = $(".study_k_301_km01").children('option:selected').index();
                        var index02 = index01;

                        $(".study_k_301_km02 option").remove();
                        $(".study_k_301_km03 option").remove();
                        $(".study_k_301_km02").append('<option value="" data-id="11111">全部班级</option>');
                        $(".study_k_301_km03").append('<option value="" data-id="22222">全部科目</option>');
                        for (var i = 0; i < data[index02].classrooms.length; i++) {
                            $(".study_k_301_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>');

                        }
                        for (var i = 0; i < data[index02].subjects.length; i++) {
                            $(".study_k_301_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                            $(".study_k_301_km03").attr("data-id", data[index02].subjects[0].subject_id);
                        }

                    });

                },

                error: function() {

                }
            });
        }
        //科目4
        function study_k_top04() {
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + "/api/v2/reports/exams",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                success: function(data) {
                    console.log(data);
                    $(".study_k_401_km01").html(" ");
                    $(".study_k_401_km02").html(" ");
                    $(".study_k_401_km03").html(" ");
                    for (var i = 0; i < data.length; i++) {
                        $(".study_k_401_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                    };

                    for (var i = 0; i < data[0].classrooms.length; i++) {
                        $(".study_k_401_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                        $(".study_k_401_km02").attr("data-id", data[0].classrooms[0].classroom_id);
                    };
                    for (var i = 0; i < data[0].subjects.length; i++) {
                        $(".study_k_401_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                        $(".study_k_401_km03").attr("data-id", data[0].subjects[0].subject_id);
                    };

                    $(".study_k_401_km01").change(function(event) {

                        var index01 = $(".study_k_401_km01").children('option:selected').index();
                        var index02 = index01;
                        $(".study_k_401_km02 option").remove();
                        $(".study_k_401_km03 option").remove();

                        for (var i = 0; i < data[index02].classrooms.length; i++) {
                            $(".study_k_401_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>');
                            $(".study_k_km03").attr("data-id", data[index02].classrooms[0].subject_id);

                        }
                        for (var i = 0; i < data[index02].subjects.length; i++) {
                            $(".study_k_401_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                            $(".study_k_401_km03").attr("data-id", data[index02].subjects[0].subject_id);
                        }

                    });
                },

                error: function() {

                }
            });
        }
        //科目5
        function study_k_top05() {
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + "/api/v2/reports/exams",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                success: function(data) {
                    console.log(data);
                    $(".study_k_501_km01").html(" ");
                    $(".study_k_501_km02").html(" ");
                    $(".study_k_501_km03").html(" ");
                    for (var i = 0; i < data.length; i++) {
                        $(".study_k_501_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                    };
                    $(".study_k_501_km02").append('<option value="" data-id="11111">全部班级</option>');
                    $(".study_k_501_km03").append('<option value="" data-id="22222">全部科目</option>');
                    for (var i = 0; i < data[0].classrooms.length; i++) {
                        $(".study_k_501_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                        $(".study_k_501_km02").attr("data-id", data[0].classrooms[0].classroom_id);
                    };
                    for (var i = 0; i < data[0].subjects.length; i++) {
                        $(".study_k_501_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                        $(".study_k_501_km03").attr("data-id", data[0].subjects[0].subject_id);
                    };

                    $(".study_k_501_km01").change(function(event) {

                        var index01 = $(".study_k_501_km01").children('option:selected').index();
                        var index02 = index01;

                        $(".study_k_501_km02 option").remove();
                        $(".study_k_501_km03 option").remove();
                        $(".study_k_501_km02").append('<option value="" data-id="11111">全部班级</option>');
                        $(".study_k_501_km03").append('<option value="" data-id="22222">全部科目</option>');

                        for (var i = 0; i < data[index02].classrooms.length; i++) {
                            $(".study_k_501_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>');

                        }
                        for (var i = 0; i < data[index02].subjects.length; i++) {
                            $(".study_k_501_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                            $(".study_k_501_km03").attr("data-id", data[index02].subjects[0].subject_id);
                        }

                    });

                },

                error: function() {

                }
            });
        }

        //科目6
        function study_k_top06() {
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + "/api/v2/reports/exams",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                success: function(data) {
                    console.log(data);
                    $(".study_k_601_km01").html(" ");
                    $(".study_k_601_km02").html(" ");
                    $(".study_k_601_km03").html(" ");
                    for (var i = 0; i < data.length; i++) {
                        $(".study_k_601_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                    };
                    $(".study_k_601_km02").append('<option value="" data-id="11111">全部班级</option>');

                    for (var i = 0; i < data[0].classrooms.length; i++) {
                        $(".study_k_601_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                        $(".study_k_601_km02").attr("data-id", data[0].classrooms[0].classroom_id);
                    };
                    for (var i = 0; i < data[0].subjects.length; i++) {
                        $(".study_k_601_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                        $(".study_k_601_km03").attr("data-id", data[0].subjects[0].subject_id);
                    };

                    $(".study_k_601_km01").change(function(event) {

                        var index01 = $(".study_k_601_km01").children('option:selected').index();
                        var index02 = index01;
                        $(".study_k_601_km02 option").remove();
                        $(".study_k_601_km03 option").remove();
                        $(".study_k_601_km02").append('<option value="" data-id="11111">全部班级</option>');

                        $(".study_k_km02").attr("data-id", $(".study_k_km02 option").eq(0).attr("data-id"));
                        for (var i = 0; i < data[index02].classrooms.length; i++) {
                            $(".study_k_601_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>');

                        }
                        for (var i = 0; i < data[index02].subjects.length; i++) {
                            $(".study_k_601_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                            $(".study_k_601_km03").attr("data-id", data[index02].subjects[0].subject_id);
                        }

                    });

                },

                error: function() {

                }
            });
        }
        //科目7
        function study_k_top07() {
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + "/api/v2/reports/exams",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                success: function(data) {
                    console.log(data);
                    $(".study_k_701_km01").html(" ");
                    $(".study_k_701_km02").html(" ");
                    $(".study_k_701_km03").html(" ");
                    for (var i = 0; i < data.length; i++) {
                        $(".study_k_701_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                    };
                    $(".study_k_701_km02").append('<option value="" data-id="11111">全部班级</option>');

                    for (var i = 0; i < data[0].classrooms.length; i++) {
                        $(".study_k_701_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                        $(".study_k_701_km02").attr("data-id", data[0].classrooms[0].classroom_id);
                    };
                    for (var i = 0; i < data[0].subjects.length; i++) {
                        $(".study_k_701_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                        $(".study_k_701_km03").attr("data-id", data[0].subjects[0].subject_id);
                    };

                    $(".study_k_701_km01").change(function(event) {
                        var index01 = $(".study_k_701_km01").children('option:selected').index();
                        var index02 = index01;

                        $(".study_k_701_km02 option").remove();
                        $(".study_k_701_km03 option").remove();
                        $(".study_k_701_km02").append('<option value="" data-id="11111">全部班级</option>');
                        $(".study_k_701_km02").attr("data-id", $(".study_k_701_km02 option").eq(0).attr("data-id"));
                        for (var i = 0; i < data[index02].classrooms.length; i++) {
                            $(".study_k_701_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>');
                        }
                        for (var i = 0; i < data[index02].subjects.length; i++) {
                            $(".study_k_701_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                            $(".study_k_701_km03").attr("data-id", data[index02].subjects[0].subject_id);
                        }

                    });

                },

                error: function() {

                }
            });
        }
        // 科目 end
        // 学科综合分析
        $(".study_k_left_ul").on('click', 'li', function(event) {
            $(".study_k_601").html(" ");
            $(".study_k_701").html(" ");
            $(".study_k_102_101 button").parent('a').removeAttr('href');
            $(".study_k_201_101 button").parent('a').removeAttr('href');
            $(".study_k_301_101 button").parent('a').removeAttr('href');
            $(".study_k_401_101 button").parent('a').removeAttr('href');
            $(".study_k_501_101 button").parent('a').removeAttr('href');
            $(".study_k_601_101 button").parent('a').removeAttr('href');
            $(".study_k_701_101 button").parent('a').removeAttr('href');
            var btn_id = $(this).index();
            // alert(btn_id);  
            if (btn_id == 0) {

                study_k_top01();
                study_k01();
            }
            if (btn_id == 1) {

                study_k_top02();
                study_k02();
            }
            if (btn_id == 2) {

                study_k_top03();
                study_k03();
            }
            if (btn_id == 3) {

                study_k_top04();
                study_k04();
            }
            if (btn_id == 4) {

                study_k_top05();
                study_k05();
            }
            if (btn_id == 5) {

                study_k_top06();
                study_k06();
            }
            if (btn_id == 6) {

                study_k_top07();
                study_k07();
            }

        });

        $(".study_k_102_101 select").change(function(event) {
            study_k01();
        });
        $(".study_k_201_101 select").change(function(event) {
            study_k02();
        });
        $(".study_k_301_101 select").change(function(event) {
            study_k03();
        });

        $(".study_k_401_101 select").change(function(event) {
            study_k04();
        });
        $(".study_k_501_101 select").change(function(event) {
            study_k05();
        });
        $(".study_k_601_101 select").change(function(event) {
            $(".study_k_601").html(" ");
            study_k06();
        });
        $(".study_k_701_101 select").change(function(event) {
            study_k07();
        });

        $(".study_k_102_101 button").click(function(event) {
            study_k_bb01();
        });

        $(".study_k_201_101 button").click(function(event) {
            study_k_bb02();
        });
        $(".study_k_301_101 button").click(function(event) {
            study_k_bb03();
        });

        $(".study_k_401_101 button").click(function(event) {
            study_k_bb04();
        });
        $(".study_k_501_101 button").click(function(event) {

            study_k_bb05();
        });
        $(".study_k_601_101 button").click(function(event) {

            study_k_bb06();
        });
        $(".study_k_701_101 button").click(function(event) {

            study_k_bb07();
        });

        function study_k01() {
            var exam_id = parseInt($(".study_k_102_km01").children('option:selected').attr("data-id"));
            $(".study_k_102_km02").attr("data-id", $(".study_k_102_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".study_k_102_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".study_k_102_km02").attr("data-id"));
            }
            $(".study_k_102_km03").attr("data-id", $(".study_k_102_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".study_k_102_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".study_k_102_km03").attr("data-id"));
            }
            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            if (class_id == 11111) {
                var class_id = null;
            }
            if (sub_id == 22222) {
                var sub_id = null;
            }


            $.ajax({
                type: "POST",
                async: false,
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
                    $(".study_k_102").html(" ");
                    $(".study_k_102").append('<table id="MyTable_all" style="width: 960px;font-size: medium;" border="1" cellspacing="0" cellpadding="0" bordercolor="#cccccc"><thead><tr><th>班级</th><th>学科</th><th>平均分</th><th >最高分</th><th>最低分</th><th>全距</th><th>优秀人数</th><th>优秀率</th><th>及格人数</th><th>及格率</th><th>不及格人数</th><th>标准差</th></tr></thead><tbody class="study_k_102_bo"></tbody></table>');
                    for (var i = 0; i < data.length; i++) {
                        var a_pass_rate = data[i].pass_rate + "%";
                        $(".study_k_102_bo").append('<tr><td>' + data[i].class_name + '</td><td>' + data[i].subject_name + '</td><td>' + data[i].average + '</td><td>' + data[i].highest_score + '</td><td>' + data[i].lowest_score + '</td><td>' + data[i].range + '</td><td>' + data[i].fine_number + '</td><td>' + data[i].fine_rate + '</td><td>' + data[i].pass_number + '</td><td>' + a_pass_rate + '</td><td>' + data[i].fail_number + '</td><td>' + data[i].standard_deviation + '</td></tr>');
                    }

                    FixTable("MyTable_all", 1, 900, 500);
                },
                error: function() {}

            });

        };



        // 总分排名
        function study_k02() {
            var exam_id = parseInt($(".study_k_201_km01").children('option:selected').attr("data-id"));
            $(".study_k_201_km02").attr("data-id", $(".study_k_201_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".study_k_201_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".study_k_201_km02").attr("data-id"));
            }
            $(".study_k_201_km03").attr("data-id", $(".study_k_201_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".study_k_201_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".study_k_201_km03").attr("data-id"));
            }
            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            if (class_id == 11111) {
                var class_id01 = null;
            } else {
                var class_id01 = class_id;
            }
            if (sub_id == 22222) {
                var sub_id = null;
            }


            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/total_points_and_ranking",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "classroom_id": class_id01,
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
                            if (class_id == 11111) {
                                if (c == 6) {
                                    a[c] = "-";
                                }
                            }
                            $(".study_k_201_bo tr").eq(i).append('<td>' + a[c] + '</td>');
                        }

                    }


                },
                error: function() {

                }

            });
        };


        // 单科等级
        function study_k03() {
            var exam_id = parseInt($(".study_k_301_km01").children('option:selected').attr("data-id"));
            $(".study_k_301_km02").attr("data-id", $(".study_k_301_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".study_k_301_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".study_k_301_km02").attr("data-id"));
            }
            $(".study_k_301_km03").attr("data-id", $(".study_k_301_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".study_k_301_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".study_k_301_km03").attr("data-id"));
            }
            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            if (class_id == 11111) {
                var class_id = null;
            }
            if (sub_id == 22222) {
                var sub_id = null;
            }

            $.ajax({
                type: "POST",
                async: false,
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
                    $(".study_k_301").html(" ");
                    $(".study_k_301").append('<table id="MyTable_dan" style="width: 960px;font-size: medium;" border="1" cellspacing="0" cellpadding="0" bordercolor="#cccccc"><thead><tr class="study_k_301_he"></tr></tr></thead><tbody class="study_k_301_bo"></tbody></table>');

                    for (var i = 0; i < data.titile.length; i++) {

                        $(".study_k_301_he").append('<th>' + data.titile[i] + '</th>');
                    };


                    for (var i = 0; i < data.data.length; i++) {
                        var a = data.data[i];
                        $(".study_k_301_bo").append('<tr></tr>');
                        for (var c = 0; c < a.length; c++) {
                            if (a[c] == 0) {
                                a[c] = "-";
                            }
                            $(".study_k_301_bo tr").eq(i).append('<td>' + a[c] + '</td>');
                        }

                    }

                    FixTable("MyTable_dan", 1, 900, 500);
                },
                error: function() {}

            });
        };
        // 各科成绩名次
        function study_k04() {
            var exam_id = parseInt($(".study_k_401_km01").children('option:selected').attr("data-id"));
            $(".study_k_401_km02").attr("data-id", $(".study_k_401_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".study_k_401_km02").attr("data-id"));

            if (class_id == null) {

            }
            $(".study_k_401_km03").attr("data-id", $(".study_k_401_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".study_k_401_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".study_k_401_km03").attr("data-id"));
            }
            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);

            var class_id = parseInt($(".study_k_401_km02").attr("data-id"));
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/all_subjects_ranking",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "classroom_id": class_id,
                    "subject_id": sub_id,
                },
                success: function(data) {
                    console.log(data);
                    $(".study_k_401").html(" ");
                    $(".study_k_401").append('<table id="MyTable_ever" style="width: 960px;font-size: medium;" border="1" cellspacing="0" cellpadding="0" bordercolor="#cccccc"><thead><tr class="study_k_401_he"></tr></tr></thead><tbody class="study_k_401_bo"></tbody></table>');

                    for (var i = 0; i < data.titile.length; i++) {

                        $(".study_k_401_he").append('<th>' + data.titile[i] + '</th>');
                    };


                    for (var i = 0; i < data.data.length; i++) {
                        var a = data.data[i];
                        $(".study_k_401_bo").append('<tr></tr>');

                        for (var c = 0; c < a.length; c++) {

                            if (c == 5 || c == 6) {
                                var c_num = Math.round(a[c]);
                                $(".study_k_401_bo tr").eq(i).append('<td>' + c_num + '</td>');
                            } else {
                                $(".study_k_401_bo tr").eq(i).append('<td>' + a[c] + '</td>');
                            }
                        }

                    }
                    FixTable("MyTable_ever", 1, 900, 500);

                },
                error: function() {}

            });
        };
        // 语数外综合名次
        function study_k05() {
            var exam_id = parseInt($(".study_k_501_km01").children('option:selected').attr("data-id"));
            $(".study_k_501_km02").attr("data-id", $(".study_k_501_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".study_k_501_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".study_k_501_km02").attr("data-id"));
            }
            $(".study_k_501_km03").attr("data-id", $(".study_k_501_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".study_k_501_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".study_k_501_km03").attr("data-id"));
            }
            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            if (class_id == 11111) {
                var class_id = null;
            }
            if (sub_id == 22222) {
                var sub_id = null;
            }

            $.ajax({
                type: "POST",
                async: false,
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
        }
        // 学生详细成绩单
        function study_k06() {
            $(".mask_layer").css("height", $(document).height());
            var exam_id = parseInt($(".study_k_601_km01").children('option:selected').attr("data-id"));
            $(".study_k_601_km02").attr("data-id", $(".study_k_601_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".study_k_601_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".study_k_601_km02").attr("data-id"));
            }
            $(".study_k_601_km03").attr("data-id", $(".study_k_601_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".study_k_601_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".study_k_601_km03").attr("data-id"));
            }
            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            if (class_id == 11111) {
                var class_id = null;
            }
            if (sub_id == 22222) {
                var sub_id = null;
            }

            $.ajax({
                type: "POST",
                // async:false,
                url: ajaxIp + "/api/v2/reports/student_details",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "classroom_id": class_id,
                },
                beforeSend: function() {
                    $(".mask_layer").show();
                    $(".load-bg").show();
                },

                success: function(data) {
                    console.log(data);

                    $(".study_k_601").html(" ");
                    $(".study_k_601").append('<table id="MyTable" style="width: 960px;font-size: medium;" border="1" cellspacing="0" cellpadding="0" bordercolor="#cccccc"><thead><tr class="study_k_601_he"></tr></tr></thead><tbody class="study_k_601_bo"></tbody></table>');

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
                    FixTable("MyTable", 1, 900, 500);

                },
                complete: function() {
                    $(".mask_layer").hide();
                    $(".load-bg").hide();
                },
                error: function() {
                    $(".mask_layer").hide();
                }

            });

        }

        //各科详细成绩单
        function study_k07() {
            var exam_id = parseInt($(".study_k_701_km01").children('option:selected').attr("data-id"));
            $(".study_k_701_km02").attr("data-id", $(".study_k_701_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".study_k_701_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".study_k_701_km02").attr("data-id"));
            }
            $(".study_k_701_km03").attr("data-id", $(".study_k_701_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".study_k_701_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".study_k_701_km03").attr("data-id"));
            }
            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            if (class_id == 11111) {
                var class_id = null;
            }
            if (sub_id == 22222) {
                var sub_id = null;
            }

            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/all_subjects_score",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "classroom_id": class_id,
                },
                success: function(data) {
                    console.log(data);
                    $(".study_k_701").html(" ");
                    $(".study_k_701").append('<table id="MyTable01" style="width: 960px;font-size: medium;" border="1" cellspacing="0" cellpadding="0" bordercolor="#cccccc"><thead><tr class="study_k_701_he"></tr></tr></thead><tbody class="study_k_701_bo"></tbody></table>');
                    for (var i = 0; i < data.titile.length; i++) {
                        $(".study_k_701_he").append('<th>' + data.titile[i] + '</th>');
                    }
                    for (var i = 0; i < data.data.length; i++) {
                        $(".study_k_701_bo").append('<tr></tr>');
                        for (var a = 0; a < data.data[0].length; a++) {
                            $(".study_k_701_bo tr").eq(i).append('<td>' + data.data[i][a] + '</td>');
                        }

                    }
                    FixTable("MyTable01", 1, 900, 500);
                },
                error: function() {

                }

            });

        }

        function FixTable(TableID, FixColumnNumber, width, height) {

            if ($("#" + TableID + "_tableLayout").length != 0) {
                $("#" + TableID + "_tableLayout").before($("#" + TableID));
                $("#" + TableID + "_tableLayout").empty();
            } else {
                $("#" + TableID).after("<div id='" + TableID + "_tableLayout' style='overflow:hidden;width:" + width + "px;'></div>");
            }
            $('<div id="' + TableID + '_tableFix"></div>' + '<div id="' + TableID + '_tableHead"></div>' + '<div id="' + TableID + '_tableColumn"></div>' + '<div id="' + TableID + '_tableData"></div>').appendTo("#" + TableID + "_tableLayout");
            var oldtable = $("#" + TableID);
            var tableFixClone = oldtable.clone(true);
            tableFixClone.attr("id", TableID + "_tableFixClone");
            $("#" + TableID + "_tableFix").append(tableFixClone);
            var tableHeadClone = oldtable.clone(true);
            tableHeadClone.attr("id", TableID + "_tableHeadClone");
            $("#" + TableID + "_tableHead").append(tableHeadClone);
            var tableColumnClone = oldtable.clone(true);
            tableColumnClone.attr("id", TableID + "_tableColumnClone");
            $("#" + TableID + "_tableColumn").append(tableColumnClone);
            $("#" + TableID + "_tableData").append(oldtable);
            $("#" + TableID + "_tableLayout table").each(function() {
                $(this).css("margin", "0");
            });
            var HeadHeight = $("#" + TableID + "_tableHead thead").height();
            HeadHeight += 2;
            $("#" + TableID + "_tableHead").css("height", HeadHeight);
            $("#" + TableID + "_tableFix").css("height", HeadHeight);
            var ColumnsWidth = 0;
            var ColumnsNumber = 0;
            $("#" + TableID + "_tableColumn tr:last td:lt(" + FixColumnNumber + ")").each(function() {
                ColumnsWidth += $(this).outerWidth(true);
                ColumnsNumber++;
            });
            ColumnsWidth += 2;
            if ($.support.msie) {
                switch ($.support.version) {
                    case "7.0":
                        if (ColumnsNumber >= 3) ColumnsWidth--;
                        break;
                    case "8.0":
                        if (ColumnsNumber >= 2) ColumnsWidth--;
                        break;
                }
            }
            $("#" + TableID + "_tableColumn").css("width", "325px");
            $("#" + TableID + "_tableFix").css("width", "325px");

            $("#" + TableID + "_tableData").scroll(function() {
                $("#" + TableID + "_tableHead").scrollLeft($("#" + TableID + "_tableData").scrollLeft());
                $("#" + TableID + "_tableColumn").scrollTop($("#" + TableID + "_tableData").scrollTop());
            });
            $("#" + TableID + "_tableFix").css({
                "overflow": "hidden",
                "position": "relative",
                "z-index": "50",
                "background-color": "#fff"
            });
            $("#" + TableID + "_tableHead").css({
                "overflow": "hidden",
                "width": width - 17,
                "position": "relative",
                "z-index": "45",
                "background-color": "#fff"
            });
            $("#" + TableID + "_tableColumn").css({
                "overflow": "hidden",
                "height": height - 17,
                "position": "relative",
                "z-index": "40",
                "background-color": "#fff"
            });
            $("#" + TableID + "_tableData").css({
                "overflow": "scroll",
                "width": width,
                "height": height,
                "position": "relative",
                "z-index": "35"
            });
            if ($("#" + TableID + "_tableHead").width() > $("#" + TableID + "_tableFix table").width()) {
                $("#" + TableID + "_tableHead").css("width", $("#" + TableID + "_tableFix table").width());
                $("#" + TableID + "_tableData").css("width", $("#" + TableID + "_tableFix table").width() + 17);
            }
            if ($("#" + TableID + "_tableColumn").height() > $("#" + TableID + "_tableColumn table").height()) {
                $("#" + TableID + "_tableColumn").css("height", $("#" + TableID + "_tableColumn table").height());
                $("#" + TableID + "_tableData").css("height", $("#" + TableID + "_tableColumn table").height() + 17);
            }
            $("#" + TableID + "_tableFix").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableHead").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableColumn").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableData").offset($("#" + TableID + "_tableLayout").offset());
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


        });
        $("#exam_z_left_1l").click(function(event) {
            $(".exam_z_101 span").eq(1).hide();

        });

        $("#exam_z_left_2l").click(function(event) {

            $(".exam_z_101 span").eq(1).show();
            $(".exam_z_101 span").eq(2).show();
        });

        $("#exam_z_left_3l").click(function(event) {

            $(".exam_z_301").show().siblings().hide();

            $(".exam_z_101 span").eq(1).hide();
            $(".exam_z_101 span").eq(2).show();
        });

        // 科目
        $.ajax({
            type: "GET",
            async: false,
            url: ajaxIp + "/api/v2/reports/exams",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
                console.log(data);

                for (var i = 0; i < data.length; i++) {
                    $(".exam_z_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                };

                for (var i = 0; i < data[0].classrooms.length; i++) {
                    $(".exam_z_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                    $(".exam_z_km02").attr("data-id", data[0].classrooms[0].classroom_id);
                };
                for (var i = 0; i < data[0].subjects.length; i++) {
                    $(".exam_z_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                    $(".exam_z_km03").attr("data-id", data[0].subjects[0].subject_id);
                };
                exam_z01();
                $(".exam_z_km01").change(function(event) {

                    var index01 = $(".exam_z_km01").children('option:selected').index();
                    var index02 = index01;

                    $(".exam_z_km02 option").remove();
                    $(".exam_z_km03 option").remove();
                    for (var i = 0; i < data[index02].classrooms.length; i++) {
                        $(".exam_z_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>')
                        $(".exam_z_km02").attr("data-id", data[index02].classrooms[0].classroom_id);
                    }
                    for (var i = 0; i < data[index02].subjects.length; i++) {
                        $(".exam_z_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                        $(".exam_z_km03").attr("data-id", data[index02].subjects[0].subject_id);
                    }

                });
            },
            error: function() {}
        });

        // 科目 end
        $(".exam_z_101 select").change(function(event) {

            $(".exam_z_102_he").html(" ");
            $(".exam_z_201_he").html(" ");
            $(".exam_z_102_bo").html(" ");
            $(".exam_z_201_bo").html(" ");
            $(".exam_z_301_bo").html(" ");

            var a = $(".exam_z_101 button").attr("data-id");
            if (a == 0) {
                exam_z01();

            };
            if (a == 1) {
                exam_z02();

            };
            if (a == 2) {
                exam_z03();

            };
        });
        $(".exam_z_left_ul").on('click', 'li', function(event) {

            $(".exam_z_101 button").attr("data-id", $(this).index());
            $(".exam_z_101 a").removeAttr("href");
            var a = $(this).index();
            if (a == 0) {
                $(".exam_z_101 button").show();
                exam_z01();

            };
            if (a == 1) {
                $(".exam_z_101 button").show();
                exam_z02();

            };
            if (a == 2) {
                $(".exam_z_101 button").hide();
                exam_z03();
            };
        });
        $(".exam_z_101 button").click(function(event) {

            if ($(this).attr("data-id") == 0) {
                exam_z_bb01();
            };
            if ($(this).attr("data-id") == 1) {
                exam_z_bb02();
            };

        });


        function exam_z01() {
            // 试卷质量
            var exam_id = $(".exam_z_km01").children('option:selected').attr("data-id");
            $(".exam_z_km02").attr("data-id", $(".exam_z_km02").children('option:selected').attr("data-id"));
            var class_id = $(".exam_z_km02").attr("data-id");
            if (class_id == null) {
                var class_id = $(".exam_z_km02").attr("data-id");
            }
            $(".exam_z_km03").attr("data-id", $(".exam_z_km03").children('option:selected').attr("data-id"));
            var sub_id = $(".exam_z_km03").attr("data-id");

            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/paper_quality",
                headers: {
                    'Authorization': "Bearer " + isLogin

                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                },
                success: function(data) {
                    $(".exam_z_102_he").html(" ");
                    $(".exam_z_102_bo").html(" ");
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
        };

        // 各科逐题质量分析
        function exam_z02() {
            // 试卷质量
            var exam_id = $(".exam_z_km01").children('option:selected').attr("data-id");
            $(".exam_z_km02").attr("data-id", $(".exam_z_km02").children('option:selected').attr("data-id"));
            var class_id = $(".exam_z_km02").attr("data-id");
            if (class_id == null) {
                var class_id = $(".exam_z_km02").attr("data-id");
            }
            $(".exam_z_km03").attr("data-id", $(".exam_z_km03").children('option:selected').attr("data-id"));
            var sub_id = $(".exam_z_km03").attr("data-id");

            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/answer_quality",
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
                    $(".exam_z_201_he").html(" ");
                    $(".exam_z_201_bo").html(" ");
                    for (var i = 0; i < data.titile.length; i++) {

                        $(".exam_z_201_he").append('<th>' + data.titile[i] + '</th>');
                    };
                    for (var i = 0; i < data.data.length; i++) {
                        $(".exam_z_201_bo").append('<tr><td>' + data.data[i].name + '</td><td>' + data.data[i].num + '</td><td>' + data.data[i].score + '</td><td>' + data.data[i].correct_count + '</td><td>' + data.data[i].error_count + '</td><td>' + data.data[i].class_average + '</td><td>' + data.data[i].class_correct_rate + '</td><td>' + data.data[i].grade_average + '</td><td>' + data.data[i].grade_correct_rate + '</td><td>' + data.data[i].score_range + '</td><td>' + data.data[i].difficulty + '</td><td>' + data.data[i].range + '</td></tr>');
                    };
                    FixTable("MyTable", 1, 936, 500);

                },
                error: function() {

                }

            });
        };
        // 难度系数
        function exam_z03() {
            // 试卷质量
            var exam_id = $(".exam_z_km01").children('option:selected').attr("data-id");
            $(".exam_z_km02").attr("data-id", $(".exam_z_km02").children('option:selected').attr("data-id"));
            var class_id = $(".exam_z_km02").attr("data-id");
            if (class_id == null) {
                var class_id = $(".exam_z_km02").attr("data-id");
            }
            $(".exam_z_km03").attr("data-id", $(".exam_z_km03").children('option:selected').attr("data-id"));
            var sub_id = $(".exam_z_km03").attr("data-id");

            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            $("#exam_z_303").html(" ");

            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/degree_of_difficulty",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                },
                success: function(data) {
                    console.log(data);
                    var a = [];
                    var b = [];

                    for (var i = 0; i < data.length; i++) {
                        a.push(data[i].num);
                        b.push(data[i].difficulty);

                    }
                    var c = a[a.length - 1];
                    console.log(c);
                    kaishi_zhi(a, b, c);

                },
                error: function() {

                }

            });

        };
        // 导出报表
        // exam_z_bb01();

        function exam_z_bb01() {
            var exam_id = $(".exam_z_km01").children('option:selected').attr("data-id");
            $(".exam_z_km02").attr("data-id", $(".exam_z_km02").children('option:selected').attr("data-id"));
            var class_id = $(".exam_z_km02").attr("data-id");
            if (class_id == null) {
                var class_id = $(".exam_z_km02").attr("data-id");
            }
            $(".exam_z_km03").attr("data-id", $(".exam_z_km03").children('option:selected').attr("data-id"));
            var sub_id = $(".exam_z_km03").attr("data-id");
            if (sub_id == null) {
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
                    "subject_id": sub_id,
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
            $(".exam_z_km02").attr("data-id", $(".exam_z_km02").children('option:selected').attr("data-id"));
            var class_id = $(".exam_z_km02").attr("data-id");
            if (class_id == null) {
                var class_id = $(".exam_z_km02").attr("data-id");
            }
            $(".exam_z_km03").attr("data-id", $(".exam_z_km03").children('option:selected').attr("data-id"));
            var sub_id = $(".exam_z_km03").attr("data-id");
            if (sub_id == null) {
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
                    "classroom_id": class_id

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

        // 难度系数变化图
        function kaishi_zhi(a, b, c) {
            var myChart = echarts.init(document.getElementById('exam_z_303'));

            var option = {

                grid: {
                    x: 68,
                    y: 30,
                    x2: 35,
                    y2: 25,
                    borderWidth: 1
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: { show: true }
                    }
                },
                calculable: false,
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: a,
                    name: '题号',
                }],
                yAxis: [{
                    type: 'value',
                    name: '难度系数',
                    min: 0,
                    max: 1
                }],

                series: [{
                        name: '试题难度',
                        type: 'line',
                        data: b,
                        itemStyle: { normal: { label: { show: true, position: 'bottom' } } },
                        markLine: {

                            data: [
                                [{ value: 0.4, xAxis: 0, yAxis: 0.4, itemStyle: { normal: { color: '#31bc92' } } },
                                    { xAxis: c, yAxis: 0.4, itemStyle: { normal: { color: '#31bc92' } } },
                                ],
                                [{ value: 0.7, xAxis: 0, yAxis: 0.7, itemStyle: { normal: { color: '#31bc92' } } },
                                    { xAxis: c, yAxis: 0.7, itemStyle: { normal: { color: '#31bc92' } } },
                                ],
                            ]
                        },

                    }

                ]
            };
            // 为echarts对象加载数据 
            myChart.setOption(option);

        }

        // <!-- 考试质量追踪  end-->

        function FixTable(TableID, FixColumnNumber, width, height) {

            if ($("#" + TableID + "_tableLayout").length != 0) {
                $("#" + TableID + "_tableLayout").before($("#" + TableID));
                $("#" + TableID + "_tableLayout").empty();
            } else {
                $("#" + TableID).after("<div id='" + TableID + "_tableLayout' style='overflow:hidden;width:" + width + "px;'></div>");
            }
            $('<div id="' + TableID + '_tableFix"></div>' + '<div id="' + TableID + '_tableHead"></div>' + '<div id="' + TableID + '_tableColumn"></div>' + '<div id="' + TableID + '_tableData"></div>').appendTo("#" + TableID + "_tableLayout");
            var oldtable = $("#" + TableID);
            var tableFixClone = oldtable.clone(true);
            tableFixClone.attr("id", TableID + "_tableFixClone");
            $("#" + TableID + "_tableFix").append(tableFixClone);
            var tableHeadClone = oldtable.clone(true);
            tableHeadClone.attr("id", TableID + "_tableHeadClone");
            $("#" + TableID + "_tableHead").append(tableHeadClone);
            var tableColumnClone = oldtable.clone(true);
            tableColumnClone.attr("id", TableID + "_tableColumnClone");
            $("#" + TableID + "_tableColumn").append(tableColumnClone);
            $("#" + TableID + "_tableData").append(oldtable);
            $("#" + TableID + "_tableLayout table").each(function() {
                $(this).css("margin", "0");
            });
            var HeadHeight = $("#" + TableID + "_tableHead thead").height();
            HeadHeight += 2;
            $("#" + TableID + "_tableHead").css("height", HeadHeight);
            $("#" + TableID + "_tableFix").css("height", HeadHeight);
            var ColumnsWidth = 0;
            var ColumnsNumber = 0;
            $("#" + TableID + "_tableColumn tr:last td:lt(" + FixColumnNumber + ")").each(function() {
                ColumnsWidth += $(this).outerWidth(true);
                ColumnsNumber++;
            });
            ColumnsWidth += 2;
            if ($.support.msie) {
                switch ($.support.version) {
                    case "7.0":
                        if (ColumnsNumber >= 3) ColumnsWidth--;
                        break;
                    case "8.0":
                        if (ColumnsNumber >= 2) ColumnsWidth--;
                        break;
                }
            }
            $("#" + TableID + "_tableColumn").css("width", "325px");
            $("#" + TableID + "_tableFix").css("width", "325px");
            $("#" + TableID + "_tableData").scroll(function() {
                $("#" + TableID + "_tableHead").scrollLeft($("#" + TableID + "_tableData").scrollLeft());
                $("#" + TableID + "_tableColumn").scrollTop($("#" + TableID + "_tableData").scrollTop());
            });
            $("#" + TableID + "_tableFix").css({
                "overflow": "hidden",
                "position": "relative",
                "z-index": "50",
                "background-color": "#fff"
            });
            $("#" + TableID + "_tableHead").css({
                "overflow": "hidden",
                "width": width - 17,
                "position": "relative",
                "z-index": "45",
                "background-color": "#fff"
            });
            $("#" + TableID + "_tableColumn").css({
                "overflow": "hidden",
                "height": height - 17,
                "position": "relative",
                "z-index": "40",
                "background-color": "#fff"
            });
            $("#" + TableID + "_tableData").css({
                "overflow": "scroll",
                "width": width,
                "height": height,
                "position": "relative",
                "z-index": "35"
            });
            if ($("#" + TableID + "_tableHead").width() > $("#" + TableID + "_tableFix table").width()) {
                $("#" + TableID + "_tableHead").css("width", $("#" + TableID + "_tableFix table").width());
                $("#" + TableID + "_tableData").css("width", $("#" + TableID + "_tableFix table").width() + 17);
            }
            if ($("#" + TableID + "_tableColumn").height() > $("#" + TableID + "_tableColumn table").height()) {
                $("#" + TableID + "_tableColumn").css("height", $("#" + TableID + "_tableColumn table").height());
                $("#" + TableID + "_tableData").css("height", $("#" + TableID + "_tableColumn table").height() + 17);
            }
            $("#" + TableID + "_tableFix").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableHead").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableColumn").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableData").offset($("#" + TableID + "_tableLayout").offset());
        }

    })
    .controller("form06Controller", function() {

        $(".main_left a").eq(5).addClass('li_click').siblings().removeClass("li_click");
        $("#index_span").html($(".main_left a").eq(5).html());
        $("#exam_h_left").css("margin-bottom", "230px");
        $(".exam_h_left").show();
        $("#exam_h_left").siblings("a").click(function(event) {
            $("#exam_h_left").css("margin-bottom", "15px");
            $(".exam_h_left").hide();
        });
        var isLogin = localStorage.getItem("token");

        // <!-- 考试横向分析 start -->
        // 科目
        exam_h_top01();

        function exam_h_top01() {
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + "/api/v2/reports/exams",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                success: function(data) {
                    console.log(data);
                    $(".exam_h_102_km01").html(" ");
                    $(".exam_h_102_km02").html(" ");
                    $(".exam_h_102_km03").html(" ");

                    for (var i = 0; i < data.length; i++) {
                        $(".exam_h_102_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                    };

                    for (var i = 0; i < data[0].classrooms.length; i++) {

                        $(".exam_h_102_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                        $(".exam_h_102_km02").attr("data-id", data[0].classrooms[0].classroom_id);
                    };
                    for (var i = 0; i < data[0].subjects.length; i++) {
                        $(".exam_h_102_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                        $(".exam_h_102_km03").attr("data-id", data[0].subjects[0].subject_id);
                    };
                    $(".exam_h_102_km01").change(function(event) {

                        var index01 = $(".exam_h_102_km01").children('option:selected').index()
                        var index02 = index01;

                        $(".exam_h_102_km02 option").remove();
                        $(".exam_h_102_km03 option").remove();

                        for (var i = 0; i < data[index02].classrooms.length; i++) {
                            $(".exam_h_102_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>')
                            $(".exam_h_102_km02").attr("data-id", data[index02].classrooms[0].classroom_id);
                        }
                        for (var i = 0; i < data[index02].subjects.length; i++) {
                            $(".exam_h_102_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                            $(".exam_h_102_km03").attr("data-id", data[index02].subjects[0].subject_id);
                        }
                    });
                    heng_zhong01();
                },
                error: function() {

                }

            });
        }
        // 科目2
        function exam_h_top02() {
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + "/api/v2/reports/exams",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                success: function(data) {
                    console.log(data);
                    $(".exam_h_201_km01").html(" ");
                    $(".exam_h_201_km02").html(" ");
                    $(".exam_h_201_km03").html(" ");

                    for (var i = 0; i < data.length; i++) {
                        $(".exam_h_201_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                    };
                    for (var i = 0; i < data[0].classrooms.length; i++) {

                        $(".exam_h_201_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                        $(".exam_h_201_km02").attr("data-id", data[0].classrooms[0].classroom_id);
                    };
                    for (var i = 0; i < data[0].subjects.length; i++) {
                        $(".exam_h_201_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                        $(".exam_h_201_km03").attr("data-id", data[0].subjects[0].subject_id);
                    };
                    $(".exam_h_201_km01").change(function(event) {

                        var index01 = $(".exam_h_201_km01").children('option:selected').index()
                        var index02 = index01;

                        $(".exam_h_201_km02 option").remove();
                        $(".exam_h_201_km03 option").remove();

                        for (var i = 0; i < data[index02].classrooms.length; i++) {
                            $(".exam_h_201_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>')
                            $(".exam_h_201_km02").attr("data-id", data[index02].classrooms[0].classroom_id);
                        }
                        for (var i = 0; i < data[index02].subjects.length; i++) {
                            $(".exam_h_201_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                            $(".exam_h_201_km03").attr("data-id", data[index02].subjects[0].subject_id);
                        }
                    });

                },
                error: function() {

                }

            });
        }
        // 科目3
        function exam_h_top03() {
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + "/api/v2/reports/exams",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                success: function(data) {
                    console.log(data);
                    $(".exam_h_301_km01").html(" ");
                    $(".exam_h_301_km02").html(" ");
                    $(".exam_h_301_km03").html(" ");

                    for (var i = 0; i < data.length; i++) {
                        $(".exam_h_301_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                    };
                    $(".exam_h_301_km03").append('<option value="" data-id="22222" >全部科目</option>');
                    for (var i = 0; i < data[0].classrooms.length; i++) {

                        $(".exam_h_301_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                        $(".exam_h_301_km02").attr("data-id", data[0].classrooms[0].classroom_id);
                    };
                    for (var i = 0; i < data[0].subjects.length; i++) {
                        $(".exam_h_301_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                        $(".exam_h_301_km03").attr("data-id", data[0].subjects[0].subject_id);
                    };
                    $(".exam_h_301_km01").change(function(event) {
                        var index01 = $(".exam_h_301_km01").children('option:selected').index()
                        var index02 = index01;
                        $(".exam_h_301_km02 option").remove();
                        $(".exam_h_301_km03 option").remove();
                        $(".exam_h_301_km03").append('<option value="" data-id="22222">全部科目</option>');
                        for (var i = 0; i < data[index02].classrooms.length; i++) {
                            $(".exam_h_301_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>')
                            $(".exam_h_301_km02").attr("data-id", data[index02].classrooms[0].classroom_id);
                        }
                        for (var i = 0; i < data[index02].subjects.length; i++) {
                            $(".exam_h_301_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                            $(".exam_h_301_km03").attr("data-id", data[index02].subjects[0].subject_id);
                        }
                    });

                },
                error: function() {

                }

            });
        }
        // 科目4
        function exam_h_top04() {
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + "/api/v2/reports/exams",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                success: function(data) {
                    console.log(data);
                    $(".exam_h_401_km01").html(" ");
                    $(".exam_h_401_km02").html(" ");
                    $(".exam_h_401_km03").html(" ");

                    for (var i = 0; i < data.length; i++) {
                        $(".exam_h_401_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                    };

                    for (var i = 0; i < data[0].classrooms.length; i++) {

                        $(".exam_h_401_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                        $(".exam_h_401_km02").attr("data-id", data[0].classrooms[0].classroom_id);
                    };
                    for (var i = 0; i < data[0].subjects.length; i++) {
                        $(".exam_h_401_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                        $(".exam_h_401_km03").attr("data-id", data[0].subjects[0].subject_id);
                    };
                    $(".exam_h_401_km01").change(function(event) {

                        var index01 = $(".exam_h_401_km01").children('option:selected').index()
                        var index02 = index01;

                        $(".exam_h_401_km02 option").remove();
                        $(".exam_h_401_km03 option").remove();

                        for (var i = 0; i < data[index02].classrooms.length; i++) {
                            $(".exam_h_401_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>')
                            $(".exam_h_401_km02").attr("data-id", data[index02].classrooms[0].classroom_id);
                        }
                        for (var i = 0; i < data[index02].subjects.length; i++) {
                            $(".exam_h_401_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                            $(".exam_h_401_km03").attr("data-id", data[index02].subjects[0].subject_id);
                        }
                    });

                },
                error: function() {

                }

            });
        }
        // 科目5
        function exam_h_top05() {
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + "/api/v2/reports/exams",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                success: function(data) {
                    console.log(data);
                    $(".exam_h_501_km01").html(" ");
                    $(".exam_h_501_km02").html(" ");
                    $(".exam_h_501_km03").html(" ");

                    for (var i = 0; i < data.length; i++) {
                        $(".exam_h_501_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                    };
                    $(".exam_h_501_km03").append('<option value="" data-id="22222" >全部科目</option>');
                    for (var i = 0; i < data[0].classrooms.length; i++) {

                        $(".exam_h_501_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                        $(".exam_h_501_km02").attr("data-id", data[0].classrooms[0].classroom_id);
                    };
                    for (var i = 0; i < data[0].subjects.length; i++) {
                        $(".exam_h_501_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                        $(".exam_h_501_km03").attr("data-id", data[0].subjects[0].subject_id);
                    };
                    $(".exam_h_501_km01").change(function(event) {

                        var index01 = $(".exam_h_501_km01").children('option:selected').index()
                        var index02 = index01;

                        $(".exam_h_501_km02 option").remove();
                        $(".exam_h_501_km03 option").remove();
                        $(".exam_h_501_km03").append('<option value="" data-id="22222">全部科目</option>');

                        for (var i = 0; i < data[index02].classrooms.length; i++) {
                            $(".exam_h_501_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>')
                            $(".exam_h_501_km02").attr("data-id", data[index02].classrooms[0].classroom_id);
                        }
                        for (var i = 0; i < data[index02].subjects.length; i++) {
                            $(".exam_h_501_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                            $(".exam_h_501_km03").attr("data-id", data[index02].subjects[0].subject_id);
                        }
                    });

                },
                error: function() {

                }

            });
        }
        // 科目6
        function exam_h_top06() {
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + "/api/v2/reports/exams",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                success: function(data) {
                    console.log(data);
                    $(".exam_h_601_km01").html(" ");
                    $(".exam_h_601_km02").html(" ");
                    $(".exam_h_601_km03").html(" ");

                    for (var i = 0; i < data.length; i++) {
                        $(".exam_h_601_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                    };
                    $(".exam_h_601_km03").append('<option value="" data-id="22222" >全部科目</option>');
                    for (var i = 0; i < data[0].classrooms.length; i++) {

                        $(".exam_h_601_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>')
                        $(".exam_h_601_km02").attr("data-id", data[0].classrooms[0].classroom_id);
                    };
                    for (var i = 0; i < data[0].subjects.length; i++) {
                        $(".exam_h_601_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                        $(".exam_h_601_km03").attr("data-id", data[0].subjects[0].subject_id);
                    };
                    $(".exam_h_601_km01").change(function(event) {

                        var index01 = $(".exam_h_601_km01").children('option:selected').index()
                        var index02 = index01;

                        $(".exam_h_601_km02 option").remove();
                        $(".exam_h_601_km03 option").remove();
                        $(".exam_h_601_km03").append('<option value="" data-id="22222">全部科目</option>');

                        for (var i = 0; i < data[index02].classrooms.length; i++) {
                            $(".exam_h_601_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>')
                            $(".exam_h_601_km02").attr("data-id", data[index02].classrooms[0].classroom_id);
                        }
                        for (var i = 0; i < data[index02].subjects.length; i++) {
                            $(".exam_h_601_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                            $(".exam_h_601_km03").attr("data-id", data[index02].subjects[0].subject_id);
                        }
                    });

                },
                error: function() {

                }

            });
        }

        // 科目 end
        // 各班成绩
        // 横向总函数
        // 

        $(".exam_h_101 select").change(function(event) {

            $(".exam_h_102_he").html(" ");
            $(".exam_h_201_he").html(" ");
            $(".exam_h_102_bo").html(" ");
            $(".exam_h_201_bo").html(" ");
            $(".exam_h_301_bo").html(" ");
            $(".exam_h_402_bo").html(" ");
            $(".exam_h_501_he").html(" ");
            $(".exam_h_501_bo").html(" ");
            $(".exam_h_601_he").html(" ");
            $(".exam_h_601_bo").html(" ");
            $(".exam_h_601").html(" ");
            $("#manyColumn").html(" ");
            var a = $(".exam_h_101 button").attr("data-id");
            if (a == 0) {

                heng_zhong01();
            };
            if (a == 1) {

                heng_zhong02();

            };
            if (a == 2) {
                heng_zhong03();
            };
            if (a == 3) {
                var exam_h_nub = $(".exam_h_rs").children('option:selected').val();
                heng_zhong04(exam_h_nub);
            };
            if (a == 4) {
                heng_zhong05();
            };
            if (a == 5) {
                heng_zhong06();
            };
        });


        $(".exam_h_101 button").click(function(event) {
            /* Act on the event */
            var a = $(".exam_h_101 button").attr("data-id");
            if (a == 0) {
                exam_h_bb01();
            };
            if (a == 1) {
                exam_h_bb02();

            };

        });
        $(".exam_h_102_101 select").change(function(event) {

            $(".exam_h_102_he").html(" ");
            $(".exam_h_102_bo").html(" ");
            heng_zhong01();
        });
        $(".exam_h_201_101 select").change(function(event) {

            $(".exam_h_201_he").html(" ");
            $(".exam_h_201_bo").html(" ");
            heng_zhong02();
        });
        $(".exam_h_301_101 select").change(function(event) {

            heng_zhong03();
        });
        $(".exam_h_401_101 select").change(function(event) {

            var exam_h_nub = $(".exam_h_rs").children('option:selected').val();
            heng_zhong04(exam_h_nub);
        });
        $(".exam_h_501_101 select").change(function(event) {

            heng_zhong05();
        });
        $(".exam_h_601_101 select").change(function(event) {

            heng_zhong06();
        });

        $(".exam_h_102_101 button").click(function(event) {
            exam_h_bb01();
        });

        $(".exam_h_201_101 button").click(function(event) {
            exam_h_bb02();
        });
        $(".exam_h_left_ul").on('click', 'li', function(event) {

            $(".exam_h_201_101 a").removeAttr('href');
            $(".exam_h_102_101 a").removeAttr('href');
            var a = $(this).index();
            if (a == 0) {
                exam_h_top01();
                heng_zhong01();
            };
            if (a == 1) {
                exam_h_top02();
                heng_zhong02();


            };
            if (a == 2) {
                exam_h_top03();
                heng_zhong03();
            };
            if (a == 3) {
                exam_h_top04();
                var exam_h_nub = $(".exam_h_rs").children('option:selected').val();
                heng_zhong04(exam_h_nub);
            };
            if (a == 4) {
                exam_h_top05();
                heng_zhong05();
            };
            if (a == 5) {
                exam_h_top06();
                heng_zhong06();

            };
        });


        function heng_zhong01() {
            var exam_id = parseInt($(".exam_h_102_km01").children('option:selected').attr("data-id"));
            $(".exam_h_102_km02").attr("data-id", $(".exam_h_102_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".exam_h_102_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".exam_h_102_km02").attr("data-id"));
            }
            $(".exam_h_102_km03").attr("data-id", $(".exam_h_102_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".exam_h_102_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = $(".exam_h_102_km03").attr("data-id");
            }
            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            if (sub_id == 22222) {
                var sub_id = null;
            }

            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/class_overall_contrast",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                },
                success: function(data) {
                    console.log(data);
                    $(".exam_h_102").html("  ");
                    $(".exam_h_102").append('<table id="MyTable_102"  cellspacing="0" border="1" bordercolor="#cccccc" class="exam_h_601_tab"><thead><tr class="exam_h_102_he"> </tr></thead><tbody class="exam_h_102_bo"></tbody></table>');

                    var a = data[0];
                    var b = data[1];
                    for (var i = 0; i < a.length; i++) {
                        $(".exam_h_102_he").append('<th>' + a[i] + '</th>');
                    }
                    for (var i = 0; i < b.length; i++) {
                        $(".exam_h_102_bo").append('<tr><td>' + b[i].class_name + '</td><td>' + b[i].subject_name + '</td><td>' + b[i].class_average + '</td><td>' + b[i].ranking + '</td><td>' + b[i].highest_score + '</td><td>' + b[i].lowest_score + '</td><td>' + b[i].standard_deviation + '</td><td>' + b[i].standard_score + '</td><td>' + b[i].average_range + '</td></tr>');
                    }
                    FixTable("MyTable_102", 1, 930, 500);

                },
                error: function(data) {


                },
            });
        };
        // 班级等级
        function heng_zhong02() {

            var exam_id = parseInt($(".exam_h_201_km01").children('option:selected').attr("data-id"));
            $(".exam_h_201_km02").attr("data-id", $(".exam_h_201_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".exam_h_201_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".exam_h_201_km02").attr("data-id"));
            }
            $(".exam_h_201_km03").attr("data-id", $(".exam_h_201_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".exam_h_201_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".exam_h_201_km03").attr("data-id"));
            }

            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);

            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/class_level_distribute",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                },
                success: function(data) {
                    console.log(data);
                    $("#manyColumn").html(" ");
                    $(".exam_h_201_he").html(" ");
                    $(".exam_h_201_bo").html(" ");
                    var columName = [];
                    for (var i = 0; i < data.titile.length; i++) {

                        $(".exam_h_201_he").append('<th>' + data.titile[i] + '</th>');

                    };
                    for (var i = 0; i < data.data.length; i++) {
                        var a = data.data[i];
                        $(".exam_h_201_bo").append('<tr></tr>');

                        for (var c = 0; c < a.length; c++) {
                            $(".exam_h_201_bo tr").eq(i).append('<td>' + a[c] + '</td>');
                        }

                    };
                    // 图表
                    var columName = [];
                    var columLabel = [];
                    var arrData = [];
                    var columName_lengh = data.titile.length;
                    for (var i = 2; i < columName_lengh; i++) {
                        columName.push(data.titile[i]);

                    };
                    console.log(columName);
                    for (var i = 0; i < data.data.length; i++) {
                        var a = data.data[i];
                        columLabel.push(a[0]);
                    };
                    console.log(columLabel);

                    for (var i = 0; i < data.data.length; i++) {
                        var a = data.data[i];
                        var arrData01 = [];
                        for (var c = 2; c < a.length; c++) {
                            arrData01.push(a[c]);

                        }
                        arrData.push(arrData01);
                    };
                    console.log(arrData);
                    buildData(columLabel, columName, arrData);

                },
                error: function() {

                }

            });
        };

        // 总分分数段
        function heng_zhong03() {
            var exam_id = parseInt($(".exam_h_301_km01").children('option:selected').attr("data-id"));
            $(".exam_h_301_km02").attr("data-id", $(".exam_h_301_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".exam_h_301_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".exam_h_301_km02").attr("data-id"));
            }
            $(".exam_h_301_km03").attr("data-id", $(".exam_h_301_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".exam_h_301_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".exam_h_301_km03").attr("data-id"));
            }

            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/total_section_contrast",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "classroom_id": class_id,
                },
                success: function(data) {
                    console.log(data);
                    if (data.length !== 0) {
                        var a = [];
                        var b = [];
                        var c = [];
                        for (var i = 0; i < data.length; i++) {
                            a.push(data[i].range_text);
                            if (data[i].grade_rate == null) {
                                data[i].grade_rate = 0;
                            }
                            if (data[i].class_rate == null) {
                                data[i].class_rate = 0;
                            }
                            b.push(data[i].grade_rate);
                            c.push(data[i].class_rate);
                        }
                        heng_z(a, b, c);
                        console.log(a);
                        console.log(b);
                        console.log(c);
                    }
                },
                error: function() {
                    var a = [];
                    var b = [];
                    var c = [];
                    heng_z(a, b, c);
                }

            });

        };

        // 名次各班分布

        /* Act on the event */
        function heng_zhong04(nub) {

            var exam_id = parseInt($(".exam_h_401_km01").children('option:selected').attr("data-id"));
            $(".exam_h_401_km02").attr("data-id", $(".exam_h_401_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".exam_h_401_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".exam_h_401_km02").attr("data-id"));
            }
            $(".exam_h_401_km03").attr("data-id", $(".exam_h_401_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".exam_h_401_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".exam_h_401_km03").attr("data-id"));
            }
            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/class_ranking_distribute",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "number": nub
                },
                success: function(data) {
                    console.log(data);
                    $(".exam_h_402_bo").html(" ");
                    var a = [];
                    var b = [];
                    var c = {};
                    for (var i = 0; i < data.length; i++) {
                        var c = new Object();
                        $(".exam_h_402_bo").append('<tr><td>' + data[i].classroom_name + '</td><td>' + data[i].total_count + '</td></tr>')
                        a.push(data[i].classroom_name);

                        c["value"] = data[i].total_count;
                        c["name"] = data[i].classroom_name;

                        b.push(c);

                    }
                    var exam_h_nub = $(".exam_h_rs").children('option:selected').val();
                    heng_m(a, b, exam_h_nub);
                },
                error: function() {
                    var a = [];
                    var b = [];
                    var exam_h_nub = $(".exam_h_rs").children('option:selected').val();
                    heng_m(a, b, exam_h_nub);
                }

            });

        };
        //班级等级比例
        function heng_zhong05() {

            var exam_id = parseInt($(".exam_h_501_km01").children('option:selected').attr("data-id"));
            $(".exam_h_501_km02").attr("data-id", $(".exam_h_501_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".exam_h_501_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".exam_h_501_km02").attr("data-id"));
            }
            $(".exam_h_501_km03").attr("data-id", $(".exam_h_501_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".exam_h_501_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".exam_h_501_km03").attr("data-id"));
            }
            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/class_level_ratio",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,

                    "classroom_id": class_id,
                },
                success: function(data) {
                    console.log(data);
                    $(".exam_h_501_he").html(" ");
                    $(".exam_h_501_bo").html(" ");
                    var a = data[0].length;
                    var b = data[1].length;
                    var c = data[1][0].length;

                    for (var i = 0; i < a; i++) {
                        $(".exam_h_501_he").append('<th>' + data[0][i] + '</th>');
                    }
                    for (var i = 0; i < b; i++) {
                        $(".exam_h_501_bo").append('<tr></tr>');
                        for (var x = 0; x < c; x++) {
                            if (x !== 0) {
                                var str = 0;
                                str = data[1][i][x];

                                var strs = new Array();
                                strs = str.split("\n");
                                $(".exam_h_501_bo tr").eq(i).append('<td>' + strs[0] + '人</br>' + strs[1] + '%</td>');
                            } else {
                                $(".exam_h_501_bo tr").eq(i).append('<td>' + data[1][i][x] + '</td>');
                            }
                        }
                    }



                },
                error: function() {

                }

            });

        };

        function heng_zhong06() {

            var exam_id = parseInt($(".exam_h_601_km01").children('option:selected').attr("data-id"));
            $(".exam_h_601_km02").attr("data-id", $(".exam_h_601_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".exam_h_601_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".exam_h_601_km02").attr("data-id"));
            }
            $(".exam_h_601_km03").attr("data-id", $(".exam_h_601_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".exam_h_601_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".exam_h_601_km03").attr("data-id"));
            }

            if (sub_id == 22222) {
                var sub_id = null;
            }
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/subject_level_assessment_ratio",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "classroom_id": null,
                },
                success: function(data) {
                    console.log(data);
                    $(".exam_h_601").html(" ");
                    $(".exam_h_601").append('<table id="MyTable"  cellspacing="0" border="1" bordercolor="#cccccc" class="exam_h_601_tab"><thead><tr class="exam_h_601_he"> </tr></thead><tbody class="exam_h_601_bo"></tbody></table>');

                    var a = data[0].length;
                    var b = data[1].length;
                    var c = data[1][0].length;
                    var c_nub = data[1][0].length - 1;
                    for (var i = 0; i < a; i++) {
                        $(".exam_h_601_he").append('<th style="min-width: 80px;">' + data[0][i] + '</th>')
                    }
                    for (var i = 0; i < b; i++) {
                        $(".exam_h_601_bo").append('<tr></tr>');

                        for (var x = 0; x < c; x++) {

                            if (7 < x && x < 10) {
                                $(".exam_h_601_bo tr").eq(i).append('<td style="min-width: 80px;">' + data[1][i][x] + '%</td>');

                            } else {
                                if (9 < x && x < c_nub) {
                                    var str = 0;
                                    str = data[1][i][x];

                                    var strs = new Array();
                                    strs = str.split("\n");

                                    $(".exam_h_601_bo tr").eq(i).append('<td style="min-width: 80px;">' + strs[0] + '人</br>' + strs[1] + '%</td>');
                                } else {
                                    $(".exam_h_601_bo tr").eq(i).append('<td style="min-width: 80px;">' + data[1][i][x] + '</td>');
                                }

                            }

                        }
                    }
                    FixTable("MyTable", 1, 930, 500);

                },
                error: function() {

                }

            });
        };
        // 导出报表
        // exam_h_bb01();

        function exam_h_bb01() {
            var exam_id = $(".exam_h_102_km01").children('option:selected').attr("data-id");
            $(".exam_h_102_km02").attr("data-id", $(".exam_h_102_km02").children('option:selected').attr("data-id"));
            var class_id = $(".exam_h_102_km02").attr("data-id");
            if (class_id == null) {
                var class_id = $(".exam_h_102_km02").attr("data-id");
            }
            $(".exam_h_102_km03").attr("data-id", $(".exam_h_102_km03").children('option:selected').attr("data-id"));
            var sub_id = $(".exam_h_102_km03").attr("data-id");
            if (sub_id == null) {
                var sub_id = $(".exam_h_102_km03").attr("data-id");
            }
            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            if (sub_id == 22222) {
                var sub_id = null;
            }
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/export_class_overall_contrast",
                headers: {
                    'Authorization': "Bearer " + isLogin,
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                },
                success: function(data) {
                    console.log(data);

                    console.log(data.file_path);
                    $(".exam_h_102_101 button").parent().attr("href", ajaxIp + data.file_path);

                },
                error: function() {

                }

            });

        };

        function exam_h_bb02() {
            var exam_id = $(".exam_h_201_km01").children('option:selected').attr("data-id");
            $(".exam_h_201_km02").attr("data-id", $(".exam_h_201_km02").children('option:selected').attr("data-id"));
            var class_id = $(".exam_h_201_km02").attr("data-id");
            if (class_id == null) {
                var class_id = $(".exam_h_201_km02").attr("data-id");
            }
            $(".exam_h_201_km03").attr("data-id", $(".exam_h_201_km03").children('option:selected').attr("data-id"));
            var sub_id = $(".exam_h_201_km03").attr("data-id");
            if (sub_id == null) {
                var sub_id = $(".exam_h_201_km03").attr("data-id");
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
                    "subject_id": sub_id,

                },
                success: function(data) {
                    console.log(data);
                    console.log(data.file_path);
                    $(".exam_h_201_101 button").parent().attr("href", ajaxIp + data.file_path);

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

        });
        // 控制select的数量

        $(".exam_h_101 span").eq(1).hide();
        $(".exam_h_101 span").eq(3).hide();

        $("#exam_h_left_1l").click(function(event) {
            $(".exam_h_101 span").eq(1).hide();

        });

        $("#exam_h_left_2l").click(function(event) {
            $(".exam_h_101 span").eq(1).hide();
            $(".exam_h_101 span").eq(2).show();
            $(".exam_h_101 span").eq(3).hide();

        });
        $("#exam_h_left_3l").click(function(event) {
            $(".exam_h_101 span").eq(1).show();
            $(".exam_h_101 span").eq(2).hide();
            $(".exam_h_101 span").eq(3).hide();

        });
        $("#exam_h_left_4l").click(function(event) {

            $(".exam_h_101 span").eq(1).hide();
            $(".exam_h_101 span").eq(2).show();
            $(".exam_h_101 span").eq(3).show();

        });

        $("#exam_h_left_5l").click(function(event) {

            $(".exam_h_101 span").eq(1).show();
            $(".exam_h_101 span").eq(2).hide();
            $(".exam_h_101 span").eq(3).hide();

        });
        $("#exam_h_left_6l").click(function(event) {

            $(".exam_h_101 span").eq(1).hide();
            $(".exam_h_101 span").eq(2).show();
            $(".exam_h_101 span").eq(3).hide();

        });
        // 班级等级分布详细

        $(".exam_h_201 tr span").click(function(event) {
            $(".exam_h_x01").hide();
            $(".exam_h_201_x").show();
        });
        $("#exam_h_201_x_i").click(function(event) {
            $(".exam_h_x01").show();
            $(".exam_h_201_x").hide();

        });



        // 总分分段对比

        function heng_z(a, b, c) {
            var myChart = echarts.init(document.getElementById('exam_h_301'));
            // 指定图表的配置项和数据
            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['本校', '本班']
                },
                grid: {

                    x2: 50,
                    y2: 55,
                    borderWidth: 1
                },

                calculable: false,
                xAxis: [{
                    type: 'category',
                    data: a,
                    name: '分数段',
                    axisLabel: {
                        rotate: 40,
                        margin: 5,
                        textStyle: {
                            color: "666666",
                            align: 'left',
                            fontWeight: '300',
                            fontFamily: 'Arial',
                            // fontStyle: 'normal',
                        }
                    },
                }],
                yAxis: [{
                    type: 'value',
                    name: '百分比%',
                }],
                series: [{
                    name: '本校',
                    type: 'bar',
                    data: b,
                    itemStyle: { normal: { label: { show: true, position: 'top' } } },
                }, {
                    name: '本班',
                    type: 'bar',
                    data: c,
                    itemStyle: { normal: { label: { show: true, position: 'top' } } },
                }]
            };


            // 为echarts对象加载数据 
            myChart.setOption(option);
        };

        function heng_m(a, b, c) {
            // 名次各班分布
            var myChart = echarts.init(document.getElementById('exam_h_402'));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '前' + c + '名各个班级的分布情况',
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

                calculable: false,
                series: [{
                    name: '所占比例',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: b,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                formatter: '{b} : {c}人({d}%)'
                            },
                            labelLine: { show: true }
                        }
                    }
                }]
            };
            // 为echarts对象加载数据 
            myChart.setOption(option);

        };


        //生成数据
        function buildData(columLabel, columName, arrData) {
            var columnValue = new Array();
            for (var i = 0; i < columLabel.length; i++) {
                columnValue.push(eval('(' + ("{'name':'" + columLabel[i] + "','type':'bar','data':[" + arrData[i] + "],'itemStyle':{normal:{label:{show:true,position:'top'}}}} ") + ')'));
            }

            buildChart(columLabel, columName, columnValue);
        }
        //生成图形
        function buildChart(columLabel, columName, columnValue) {
            var chart = document.getElementById('manyColumn');
            var echart = echarts.init(chart);
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: columLabel
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    min: 0,
                    type: 'category',
                    data: columName,
                    name: '等级',
                }],
                yAxis: [{
                    min: 0,
                    type: 'value',
                    name: '人数',
                }],
                series: columnValue
            };

            echart.setOption(option);
        }
        // <!-- 考试横向分析 end -->
        function FixTable(TableID, FixColumnNumber, width, height) {

            if ($("#" + TableID + "_tableLayout").length != 0) {
                $("#" + TableID + "_tableLayout").before($("#" + TableID));
                $("#" + TableID + "_tableLayout").empty();
            } else {
                $("#" + TableID).after("<div id='" + TableID + "_tableLayout' style='overflow:hidden;width:" + width + "px;'></div>");
            }
            $('<div id="' + TableID + '_tableFix"></div>' + '<div id="' + TableID + '_tableHead"></div>' + '<div id="' + TableID + '_tableColumn"></div>' + '<div id="' + TableID + '_tableData"></div>').appendTo("#" + TableID + "_tableLayout");
            var oldtable = $("#" + TableID);
            var tableFixClone = oldtable.clone(true);
            tableFixClone.attr("id", TableID + "_tableFixClone");
            $("#" + TableID + "_tableFix").append(tableFixClone);
            var tableHeadClone = oldtable.clone(true);
            tableHeadClone.attr("id", TableID + "_tableHeadClone");
            $("#" + TableID + "_tableHead").append(tableHeadClone);
            var tableColumnClone = oldtable.clone(true);
            tableColumnClone.attr("id", TableID + "_tableColumnClone");
            $("#" + TableID + "_tableColumn").append(tableColumnClone);
            $("#" + TableID + "_tableData").append(oldtable);
            $("#" + TableID + "_tableLayout table").each(function() {
                $(this).css("margin", "0");
            });
            var HeadHeight = $("#" + TableID + "_tableHead thead").height();
            HeadHeight += 2;
            $("#" + TableID + "_tableHead").css("height", HeadHeight);
            $("#" + TableID + "_tableFix").css("height", HeadHeight);
            var ColumnsWidth = 0;
            var ColumnsNumber = 0;
            $("#" + TableID + "_tableColumn tr:last td:lt(" + FixColumnNumber + ")").each(function() {
                ColumnsWidth += $(this).outerWidth(true);
                ColumnsNumber++;
            });
            ColumnsWidth += 2;
            if ($.support.msie) {
                switch ($.support.version) {
                    case "7.0":
                        if (ColumnsNumber >= 3) ColumnsWidth--;
                        break;
                    case "8.0":
                        if (ColumnsNumber >= 2) ColumnsWidth--;
                        break;
                }
            }
            $("#" + TableID + "_tableColumn").css("width", "325px");
            $("#" + TableID + "_tableFix").css("width", "325px");

            $("#" + TableID + "_tableData").scroll(function() {
                $("#" + TableID + "_tableHead").scrollLeft($("#" + TableID + "_tableData").scrollLeft());
                $("#" + TableID + "_tableColumn").scrollTop($("#" + TableID + "_tableData").scrollTop());
            });
            $("#" + TableID + "_tableFix").css({
                "overflow": "hidden",
                "position": "relative",
                "z-index": "50",
                "background-color": "#fff"
            });
            $("#" + TableID + "_tableHead").css({
                "overflow": "hidden",
                "width": width - 17,
                "position": "relative",
                "z-index": "45",
                "background-color": "#fff"
            });
            $("#" + TableID + "_tableColumn").css({
                "overflow": "hidden",
                "height": height - 17,
                "position": "relative",
                "z-index": "40",
                "background-color": "#fff"
            });
            $("#" + TableID + "_tableData").css({
                "overflow": "scroll",
                "width": width,
                "height": height,
                "position": "relative",
                "z-index": "35"
            });
            if ($("#" + TableID + "_tableHead").width() > $("#" + TableID + "_tableFix table").width()) {
                $("#" + TableID + "_tableHead").css("width", $("#" + TableID + "_tableFix table").width());
                $("#" + TableID + "_tableData").css("width", $("#" + TableID + "_tableFix table").width() + 17);
            }
            if ($("#" + TableID + "_tableColumn").height() > $("#" + TableID + "_tableColumn table").height()) {
                $("#" + TableID + "_tableColumn").css("height", $("#" + TableID + "_tableColumn table").height());
                $("#" + TableID + "_tableData").css("height", $("#" + TableID + "_tableColumn table").height() + 17);
            }
            $("#" + TableID + "_tableFix").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableHead").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableColumn").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableData").offset($("#" + TableID + "_tableLayout").offset());
        }






    })
    .controller("form07Controller", function() {

        $(".main_left a").eq(6).addClass('li_click').siblings().removeClass("li_click");
        $("#index_span").html($(".main_left a").eq(6).html());
        var isLogin = localStorage.getItem("token");
        $("#form_special").css("margin-bottom", "49px");
        $(".form_special").show();
        $("#form_special").siblings("a").click(function(event) {
            $("#form_special").css("margin-bottom", "15px");
            $(".form_special").hide();
        });
        $(".form_special li").eq(0).css("color", "#31bc91").siblings().css("color", "#999999");

        //调整参数
        $(".form_special_p01 button").click(function(event) {
            $(".mask_layer").css("height", $(document).height());
            $(".mask_layer").css("z-index", "110");
            $(".mask_layer").show();
            $(".special_change").show();
        });
        $(".special_change_p02 button").click(function(event) {

            $(".special_change").hide();
            $(".mask_layer").hide();
            $(".mask_layer").css("z-index", "0");
        });

        $(".add_up01").click(function(event) {
            var val = $(".special_change02_input01").val();
            if (val < 100) {
                var a = parseInt($(".special_change02_input01").val()) + 1;
                $(".special_change02_input01").val(a);
            }
        });
        $(".add_down01").click(function(event) {
            var val = $(".special_change02_input01").val();
            if (val > 0) {
                var a = parseInt($(".special_change02_input01").val()) - 1;
                $(".special_change02_input01").val(a);
            }
        });
        $(".add_up02").click(function(event) {
            var val = $(".special_change02_input02").val();
            if (val < 100) {
                var a = parseInt($(".special_change02_input02").val()) + 1;
                $(".special_change02_input02").val(a);
            }
        });
        $(".add_down02").click(function(event) {
            var val = $(".special_change02_input02").val();
            if (val > 0) {
                var a = parseInt($(".special_change02_input02").val()) - 1;
                $(".special_change02_input02").val(a);
            }
        });

        $(".add_up03").click(function(event) {
            var val = $(".special_change02_input03").val();
            if (val < 100) {
                var a = parseInt($(".special_change02_input03").val()) + 1;
                $(".special_change02_input03").val(a);
            }
        });
        $(".add_down03").click(function(event) {
            var val = $(".special_change02_input03").val();
            if (val > 0) {
                var a = parseInt($(".special_change02_input03").val()) - 1;
                $(".special_change02_input03").val(a);
            }
        });
        $(".add_up04").click(function(event) {
            var val = $(".special_change02_input04").val();
            if (val < 100) {
                var a = parseInt($(".special_change02_input04").val()) + 1;
                $(".special_change02_input04").val(a);
            }
        });
        $(".add_down04").click(function(event) {
            var val = $(".special_change02_input04").val();
            if (val > 0) {
                var a = parseInt($(".special_change02_input04").val()) - 1;
                $(".special_change02_input04").val(a);
            }
        });
        $(".special_change_p02 button").click(function(event) {

            $(".form_special_p02_i01").html($(".special_change02_input01").val());
            $(".form_special_p02_i02").html($(".special_change02_input02").val());
            $(".form_special_p02_i03").html($(".special_change02_input03").val());
            $(".form_special_p02_i04").html($(".special_change02_input04").val());
            var front_ratio = parseInt($(".special_change02_input01").val());
            var front_score = parseInt($(".special_change02_input02").val());
            var back_ratio = parseInt($(".special_change02_input03").val());
            var back_score = parseInt($(".special_change02_input04").val());
            var exam_id = parseInt($(".form_special_km01").children('option:selected').attr("data-id"));
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/exams/exam_pretty_score_params",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "front_ratio": front_ratio,
                    "front_score": front_score,
                    "back_ratio": back_ratio,
                    "back_score": back_score,
                    "id": exam_id,

                },
                success: function(data) {
                    console.log(data);
                },
                error: function() {

                }
            });

        });

        //科目
        form_special_top01();

        function form_special_top01() {
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + "/api/v2/reports/exams",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                success: function(data) {
                    console.log(data);
                    $(".form_special_km01").html(" ");
                    $(".form_special_km02").html(" ");
                    $(".form_special_km03").html(" ");

                    for (var i = 0; i < data.length; i++) {
                        $(".form_special_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                    };
                    $(".form_special_km02").append('<option value="" data-id="11111" >全部班级</option>');
                    $(".form_special_km03").append('<option value="" data-id="22222" >全部科目</option>');

                    for (var i = 0; i < data[0].classrooms.length; i++) {

                        $(".form_special_km02").append('<option value="" data-id=' + data[0].classrooms[i].classroom_id + '>' + data[0].classrooms[i].classroom_name + '</option>');
                    };
                    for (var i = 0; i < data[0].subjects.length; i++) {
                        $(".form_special_km03").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')

                    };
                    $(".form_special_km01").change(function(event) {

                        var index01 = $(".form_special_km01").children('option:selected').index()
                        var index02 = index01;
                        $(".form_special_km02 option").remove();
                        $(".form_special_km03 option").remove();
                        $(".form_special_km02").append('<option value="" data-id="11111" >全部班级</option>');
                        $(".form_special_km03").append('<option value="" data-id="22222">全部科目</option>');

                        for (var i = 0; i < data[index02].classrooms.length; i++) {
                            $(".form_special_km02").append('<option value="" data-id=' + data[index02].classrooms[i].classroom_id + '>' + data[index02].classrooms[i].classroom_name + '</option>')

                        }
                        for (var i = 0; i < data[index02].subjects.length; i++) {
                            $(".form_special_km03").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')

                        }
                    });

                },
                error: function() {

                }

            });
        }

        //导出
        $(".form_special_p02_btn01").click(function(event) {
            $(".form_special_p02_btn01").parent().removeAttr('href');
            form_special_bb01();
        });
        //分析
        $(".form_special_p02_btn02").click(function(event) {
            $(".mask_layer").css("height", $(document).height());
            $(".mask_layer").css("z-index", "110");


            form_special01();
        });

        function form_special01() {

            var exam_id = parseInt($(".form_special_km01").children('option:selected').attr("data-id"));
            $(".form_special_km02").attr("data-id", $(".form_special_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".form_special_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".form_special_km02").attr("data-id"));
            }
            $(".form_special_km03").attr("data-id", $(".form_special_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".form_special_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".form_special_km03").attr("data-id"));
            }
            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            if (class_id == 11111) {
                var class_id = null;
            }
            if (sub_id == 22222) {
                var sub_id = null;
            }
            $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/reports/all_subjects_pretty_scores",
                headers: {
                    'Authorization': "Bearer " + isLogin
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id,
                    "classroom_id": class_id,
                },
                beforeSend: function() {
                    $(".mask_layer").show();
                    $(".load-bg").show();
                },
                success: function(data) {
                    console.log(data);
                    $(".pecial_change_101_table").html(" ");
                    $(".pecial_change_101_table").append('<table id="pecial_change_MyTable" style="width: 936px;font-size: medium;" cellspacing="0" border="1" bordercolor="#cccccc"><thead><tr class="pecial_change_101_he"> </tr></thead><tbody class="pecial_change_101_bo"></tbody></table>');
                    for (var i = 0; i < data.titile.length; i++) {
                        $(".pecial_change_101_he").append('<th>' + data.titile[i] + '</th>')
                    }
                    for (var i = 0; i < data.data.length; i++) {
                        $(".pecial_change_101_bo").append('<tr></tr>');
                        for (var a = 0; a < data.data[0].length; a++) {
                            $(".pecial_change_101_bo tr").eq(i).append('<td>' + data.data[i][a] + '</td>');
                        }
                    }
                    FixTable("pecial_change_MyTable", 1, 930, 500);

                },
                complete: function() {
                    $(".mask_layer").css("z-index", "0");
                    $(".mask_layer").hide();
                    $(".load-bg").hide();
                },
                error: function() {

                }

            });

        };

        //导出

        function form_special_bb01() {
            var exam_id = parseInt($(".form_special_km01").children('option:selected').attr("data-id"));
            $(".form_special_km02").attr("data-id", $(".form_special_km02").children('option:selected').attr("data-id"));
            var class_id = parseInt($(".form_special_km02").attr("data-id"));
            if (class_id == null) {
                var class_id = parseInt($(".form_special_km02").attr("data-id"));
            }
            $(".form_special_km03").attr("data-id", $(".form_special_km03").children('option:selected').attr("data-id"));
            var sub_id = parseInt($(".form_special_km03").attr("data-id"));
            if (sub_id == null) {
                var sub_id = parseInt($(".form_special_km03").attr("data-id"));
            }
            console.log(exam_id);
            console.log(class_id);
            console.log(sub_id);
            if (class_id == 11111) {
                var class_id = null;
            }
            if (sub_id == 22222) {
                var sub_id = null;
            }
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/export_all_subjects_pretty_scores",
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
                    $(".form_special_p02_btn01").parent().attr("href", ajaxIp + data.file_path);

                },
                error: function() {

                }

            });

        };









        function FixTable(TableID, FixColumnNumber, width, height) {

            if ($("#" + TableID + "_tableLayout").length != 0) {
                $("#" + TableID + "_tableLayout").before($("#" + TableID));
                $("#" + TableID + "_tableLayout").empty();
            } else {
                $("#" + TableID).after("<div id='" + TableID + "_tableLayout' style='overflow:hidden;width:" + width + "px;'></div>");
            }
            $('<div id="' + TableID + '_tableFix"></div>' + '<div id="' + TableID + '_tableHead"></div>' + '<div id="' + TableID + '_tableColumn"></div>' + '<div id="' + TableID + '_tableData"></div>').appendTo("#" + TableID + "_tableLayout");
            var oldtable = $("#" + TableID);
            var tableFixClone = oldtable.clone(true);
            tableFixClone.attr("id", TableID + "_tableFixClone");
            $("#" + TableID + "_tableFix").append(tableFixClone);
            var tableHeadClone = oldtable.clone(true);
            tableHeadClone.attr("id", TableID + "_tableHeadClone");
            $("#" + TableID + "_tableHead").append(tableHeadClone);
            var tableColumnClone = oldtable.clone(true);
            tableColumnClone.attr("id", TableID + "_tableColumnClone");
            $("#" + TableID + "_tableColumn").append(tableColumnClone);
            $("#" + TableID + "_tableData").append(oldtable);
            $("#" + TableID + "_tableLayout table").each(function() {
                $(this).css("margin", "0");
            });
            var HeadHeight = $("#" + TableID + "_tableHead thead").height();
            HeadHeight += 2;
            $("#" + TableID + "_tableHead").css("height", HeadHeight);
            $("#" + TableID + "_tableFix").css("height", HeadHeight);
            var ColumnsWidth = 0;
            var ColumnsNumber = 0;
            $("#" + TableID + "_tableColumn tr:last td:lt(" + FixColumnNumber + ")").each(function() {
                ColumnsWidth += $(this).outerWidth(true);
                ColumnsNumber++;
            });
            ColumnsWidth += 2;
            if ($.support.msie) {
                switch ($.support.version) {
                    case "7.0":
                        if (ColumnsNumber >= 3) ColumnsWidth--;
                        break;
                    case "8.0":
                        if (ColumnsNumber >= 2) ColumnsWidth--;
                        break;
                }
            }
            $("#" + TableID + "_tableColumn").css("width", "370px");
            $("#" + TableID + "_tableFix").css("width", "370px");

            $("#" + TableID + "_tableData").scroll(function() {
                $("#" + TableID + "_tableHead").scrollLeft($("#" + TableID + "_tableData").scrollLeft());
                $("#" + TableID + "_tableColumn").scrollTop($("#" + TableID + "_tableData").scrollTop());
            });
            $("#" + TableID + "_tableFix").css({
                "overflow": "hidden",
                "position": "relative",
                "z-index": "50",
                "background-color": "#fff"
            });
            $("#" + TableID + "_tableHead").css({
                "overflow": "hidden",
                "width": width - 17,
                "position": "relative",
                "z-index": "45",
                "background-color": "#fff"
            });
            $("#" + TableID + "_tableColumn").css({
                "overflow": "hidden",
                "height": height - 17,
                "position": "relative",
                "z-index": "40",
                "background-color": "#fff"
            });
            $("#" + TableID + "_tableData").css({
                "overflow": "scroll",
                "width": width,
                "height": height,
                "position": "relative",
                "z-index": "35"
            });
            if ($("#" + TableID + "_tableHead").width() > $("#" + TableID + "_tableFix table").width()) {
                $("#" + TableID + "_tableHead").css("width", $("#" + TableID + "_tableFix table").width());
                $("#" + TableID + "_tableData").css("width", $("#" + TableID + "_tableFix table").width() + 17);
            }
            if ($("#" + TableID + "_tableColumn").height() > $("#" + TableID + "_tableColumn table").height()) {
                $("#" + TableID + "_tableColumn").css("height", $("#" + TableID + "_tableColumn table").height());
                $("#" + TableID + "_tableData").css("height", $("#" + TableID + "_tableColumn table").height() + 17);
            }
            $("#" + TableID + "_tableFix").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableHead").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableColumn").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableData").offset($("#" + TableID + "_tableLayout").offset());
        }



    })
    .controller("form08Controller", function() {
        $(".main_left a").eq(7).addClass('li_click').siblings().removeClass("li_click");
        $("#index_span").html($(".main_left a").eq(7).html());
        $("#sc_left").css("margin-bottom", "150px");
        $(".sc_left").show();
        $("#sc_left").siblings("a").click(function(event) {
            $("#sc_left").css("margin-bottom", "15px");
            $(".sc_left").hide();
        });
        var isLogin = localStorage.getItem("token");
        // 科目
        $.ajax({
            type: "GET",
            async: false,
            url: ajaxIp + "/api/v2/reports/exams",
            headers: {
                'Authorization': "Bearer " + isLogin
            },
            success: function(data) {
                console.log(data);


                for (var i = 0; i < data.length; i++) {
                    $(".sc_km01").append('<option value="' + data[i].name + '" data-id=' + data[i].id + '>' + data[i].name + '</option>')
                };
                for (var i = 0; i < data[0].subjects.length; i++) {
                    $(".sc_km02").append('<option value="" data-id=' + data[0].subjects[i].subject_id + '>' + data[0].subjects[i].name + '</option>')
                    $(".sc_km02").attr("data-id", data[0].subjects[0].subject_id);
                };
                $(".sc_km01").change(function(event) {
                    var index01 = $(".sc_km01").children('option:selected').index()
                    var index02 = index01;

                    $(".sc_km02 option").remove();
                    for (var i = 0; i < data[index02].subjects.length; i++) {
                        $(".sc_km02").append('<option value="" data-id=' + data[index02].subjects[i].subject_id + '>' + data[index02].subjects[i].name + '</option>')
                        $(".sc_km02").attr("data-id", data[index02].subjects[0].subject_id);
                    }
                });
                kx01();
            },
            error: function() {

            }

        });
        // 科目 end
        // 横向对比
        function kx01() {
            var exam_id = $(".sc_km01").children('option:selected').attr("data-id");
            $(".sc_km02").attr("data-id", $(".sc_km02").children('option:selected').attr("data-id"));
            var sub_id = $(".sc_km02").attr("sc_km02");
            if (sub_id == null) {
                var sub_id = $(".sc_km02").attr("data-id");
            }
            console.log(exam_id);
            console.log(sub_id);
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/overall_comparison",
                headers: {
                    'Authorization': "Bearer " + isLogin,
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id

                },
                success: function(data) {
                    console.log(data);
                    $(".sc_102_he").html(" ");
                    $(".sc_102_bo").html(" ");
                    if (data.titile !== null) {
                        for (var i = 0; i < data.titile.length; i++) {
                            $(".sc_102_he").append('<th>' + data.titile[i] + '</th>');
                        }
                    };
                    if (data.data !== null) {
                        for (var i = 0; i < data.data.length; i++) {
                            $(".sc_102_bo").append('<tr></tr>');
                            for (var a = 0; a < data.data[i].length; a++) {
                                $(".sc_102_bo tr").eq(i).append('<td>' + data.data[i][a] + '</td>');
                            }
                        }
                    };
                },
                error: function() {

                }

            });
        }

        function kx_bb01() {
            var exam_id = $(".sc_km01").children('option:selected').attr("data-id");
            $(".sc_km02").attr("data-id", $(".sc_km02").children('option:selected').attr("data-id"));
            var sub_id = $(".sc_km02").attr("sc_km02");
            if (sub_id == null) {
                var sub_id = $(".sc_km02").attr("data-id");
            }
            console.log(exam_id);
            console.log(sub_id);
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/export_overall_comparison",
                headers: {
                    'Authorization': "Bearer " + isLogin,
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id

                },
                success: function(data) {
                    console.log(data);
                    console.log(data.file_path);
                    $(".sc_101 button").parent().attr("href", ajaxIp + data.file_path);

                },
                error: function() {

                }

            });

        };
        // 等级人数对比
        function kx02() {
            var exam_id = $(".sc_km01").children('option:selected').attr("data-id");
            $(".sc_km02").attr("data-id", $(".sc_km02").children('option:selected').attr("data-id"));
            var sub_id = $(".sc_km02").attr("sc_km02");
            if (sub_id == null) {
                var sub_id = $(".sc_km02").attr("data-id");
            }
            console.log(exam_id);
            console.log(sub_id);
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/rank_comparison",
                headers: {
                    'Authorization': "Bearer " + isLogin,
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id

                },
                success: function(data) {
                    console.log(data);
                    $(".sc_201_he").html(" ");
                    $(".sc_201_bo").html(" ");
                    for (var i = 0; i < data.titile.length; i++) {
                        $(".sc_201_he").append('<th>' + data.titile[i] + '</th>');
                    }
                    for (var i = 0; i < data.data.length; i++) {
                        $(".sc_201_bo").append('<tr></tr>');
                        for (var a = 0; a < data.data[i].length; a++) {
                            $(".sc_201_bo tr").eq(i).append('<td>' + data.data[i][a] + '</td>');
                        }
                    }
                },
                error: function() {

                }

            });
        }

        function kx_bb02() {
            var exam_id = $(".sc_km01").children('option:selected').attr("data-id");
            $(".sc_km02").attr("data-id", $(".sc_km02").children('option:selected').attr("data-id"));
            var sub_id = $(".sc_km02").attr("sc_km02");
            if (sub_id == null) {
                var sub_id = $(".sc_km02").attr("data-id");
            }
            console.log(exam_id);
            console.log(sub_id);
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + "/api/v2/reports/export_rank_comparison",
                headers: {
                    'Authorization': "Bearer " + isLogin,
                },
                data: {
                    "exam_id": exam_id,
                    "subject_id": sub_id

                },
                success: function(data) {
                    console.log(data);
                    console.log(data.file_path);
                    $(".sc_101 button").parent().attr("href", ajaxIp + data.file_path);

                },
                error: function() {

                }

            });

        };
        /*<!-- 跨校对比分析  start-->*/
        $(".sc_left li").eq(0).css("color", "#31bc91").siblings().css("color", "#999999");
        $(".sc_left li").click(function(event) {
            /* Act on the event */
            $(this).css("color", "#31bc91").siblings().css("color", "#999999");
            $(".sc_b").html($(this).html());
            $(".sc_tab").children("div").eq($(this).index()).show().siblings().hide();
            $(".sc_101 button").attr("data-id", $(this).index());
            if ($(this).index() == 0) {
                kx01();
            };
            if ($(this).index() == 1) {
                kx02();
            };

        });

        $(".sc_101 select").change(function(event) {
            /* Act on the event */
            $(".sc_102_he").html(" ");
            $(".sc_102_bo").html(" ");
            $(".sc_201_he").html(" ");
            $(".sc_201_bo").html(" ");
            var a = $(".sc_101 button").attr("data-id");
            if (a == 0) {
                kx01();
            };
            if (a == 1) {
                kx02();
            };

        });

        $(".sc_101 button").click(function(event) {
         
            var a = $(this).attr("data-id");
            if (a == 0) {
                kx_bb01();
            };
            if (a == 1) {
                kx_bb02();
            };
        });


        /*<!-- 跨校对比分析  end-->*/

    })
    .controller("form09Controller", function() {

        //  $(".main_left a").eq(6).addClass('li_click').siblings().removeClass("li_click");
        // $("#index_span").html($(".main_left a").eq(6).html());
        // var isLogin = localStorage.getItem("token");
        // $("#form_special").css("margin-bottom", "49px");
        // $(".form_special").show();
        // $("#form_special").siblings("a").click(function(event) {
        //     $("#form_special").css("margin-bottom", "15px");
        //     $(".form_special").hide();
        // });

    })