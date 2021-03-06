$(function() {
    var isLogin = localStorage.getItem("token");
    var height = $(window).height() - $('#header').height() - $('#footer').height() - 180;
    var url = window.location;

    function getUrlParam(url, name) {
        var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
        var matcher = pattern.exec(url);
        var items = null;
        if (matcher != null) {
            try {
                items = decodeURIComponent(decodeURIComponent(matcher[1]));
            } catch (e) {
                try {
                    items = decodeURIComponent(matcher[1]);
                } catch (e) {
                    items = matcher[1];
                }
            }
        }
        return items;
    }


    var docx_id = getUrlParam(url, 'docx_id');
    var id = getUrlParam(url, 'id');
    var docx_num = getUrlParam(url, 'number');
    var exam_subject_id = getUrlParam(url, 'exam_subject_id');
    var exam_name = getUrlParam(url, 'exam_name');
    var subject_name = getUrlParam(url, 'subject_name');
    var grade_name = getUrlParam(url, 'grade_name');

    $(".p_top a").click(function(event) {

        history.go(-1);
        return false;
    });

    $.ajax({
        type: "GET",
        url: ajaxIp + '/api/v2/exam_subjects/' + exam_subject_id + '',
        headers: { 'Authorization': "Bearer " + isLogin },
        success: function(data) {
            console.log(data);
            $(".edit_li_div03").attr("subject_id", data.subject_id);
        },
        error: function(data) {

        },
    });
    //获取题目内容，答案。。。
    $.ajax({
        type: "GET",
        url: ajaxIp + '/api/v2/question_banks/' + id + '',
        async: false,
        data: {
            // 'id':id,

        },
        headers: { 'Authorization': "Bearer " + isLogin },
        success: function(data) {
            console.log(data);
            var a = data.content;
            var b = data.answer;
            var c = data.difficulty_level;
            var d = data.analysis;
            var desc_length = data.desc.length;
            console.log(a.length);
            console.log(typeof b);
            console.log(!d);
            $(".edit_li_div03").attr("data-id", data.id);
            $(".edit_li_div03").attr("grade-id", data.grade_id);

            UE.getEditor('container').addListener("ready", function() {

                UE.getEditor('container').setContent(a);

            });
            //答案

            UE.getEditor('container02').addListener("ready", function() {
                if (b !== undefined) {
                    if (!b) {

                    } else {
                        UE.getEditor('container02').setContent(b);
                    }
                }
            });

            //解析
            var d01 = typeof d;

            UE.getEditor('container03').addListener("ready", function() {

                if (d !== undefined) {

                    if (!d) {

                    } else {
                        UE.getEditor('container03').setContent(d);
                    }

                }
            });

            //难度
            if (c !== undefined) {
                $(".dif_input input").val(c);
            }
            //添加标签
            for (var i = 0; i < desc_length; i++) {
                $(".edit_li_btn06_div").append('<a class="delete_' + data.desc[i].id + '"  style="background: #31bc91;color: #f5f5f5;margin: 10px;display:inline-block;line-height: 30px;padding: 0px 7px;float:left;" data-id="' + data.desc[i].id + '"><i style="font-style:normal;">' + data.desc[i].name + '</i><i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe61b;</i></a>');

            }

        },
        error: function() {

        }
    });
    //保存题目内容
    $(".edit_bj_btn01").click(function(event) {
        var a = UE.getEditor('container').getContent();

        $.ajax({
            type: "POST",
            async: false,
            url: ajaxIp + "/api/v2/question_banks/update_question",
            data: {
                'id': id,
                'content': a,
            },
            headers: { 'Authorization': "Bearer " + isLogin },
            success: function(data) {
                console.log(data);
                layer.msg('保存成功', { time: 700 });

            },
            error: function() {

            }
        });

    });
    //答案输入
    $(".edit_li_btn01").click(function(event) {

        var a = $(this).attr("data-id");
        if (a == 0) {
            $(".edit_li_div01").slideDown(500);
            $(this).attr("data-id", "1");
        } else {
            $(".edit_li_div01").slideUp(500);
            $(this).attr("data-id", "0");
        }

    });

    $(".edit_li_div01_btn01").click(function(event) {

        $(".edit_li_div01").slideUp(500);

        var a = UE.getEditor('container02').getContent();

        $.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/question_banks/update_question",
            data: {
                'id': id,
                'answer': a,
            },
            headers: { 'Authorization': "Bearer " + isLogin },
            success: function(data) {
                console.log(data);

                layer.msg('保存成功', { time: 700 });

            },
            error: function() {

            }
        });


    });
    $(".edit_li_div01_btn02").click(function(event) {

        $(".edit_li_div01").slideUp(500);
    });
    //答案解析
    $(".edit_li_btn02").click(function(event) {
        var a = $(this).attr("data-id");
        if (a == 0) {
            $(".edit_li_div02").slideDown(500);
            $(this).attr("data-id", "1");
        } else {
            $(".edit_li_div02").slideUp(500);
            $(this).attr("data-id", "0");
        }

    });
    $(".edit_li_div02_btn01").click(function(event) {

        var a = UE.getEditor('container03').getContent();

        $.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/question_banks/update_question",
            data: {
                'id': id,
                'analysis': a,
            },
            headers: { 'Authorization': "Bearer " + isLogin },
            success: function(data) {
                console.log(data);

                layer.msg('保存成功', { time: 700 });

            },
            error: function() {

            }
        });


        $(".edit_li_div02").slideUp(500);
    });
    $(".edit_li_div02_btn02").click(function(event) {
        $(".edit_li_div02").slideUp(500);
    });
    // 设置难度
    $(".dif_btn").click(function(event) {
        $(".dif_input").show();
        $(".dif_btn").hide();
    });

    $(".dif_input button").click(function(event) {
        var a = $(".dif_input input").val();

        $.ajax({
            type: "POST",
            url: ajaxIp + "/api/v2/question_banks/update_question",
            data: {
                'id': id,
                'difficulty_level': a,
            },
            headers: { 'Authorization': "Bearer " + isLogin },
            success: function(data) {
                console.log(data);

                layer.msg('保存成功', { time: 700 });
            },
            error: function() {

            }
        });
        $(".dif_input").hide();
        $(".dif_btn").show();
    });
    //添加知识点


    $(".edit_zs").on('click', 'li  i', function(event) {

        $(this).parent('li').children('ul').toggle();
    });

    $('.edit_li03_box01').on('click', '.edit_li03_box_a_i', function(event) {

        $(this).parent("a").remove();

        $('.' + $(this).parent("a").attr("id") + '').children('i').css("color", "#999999");
        $('.' + $(this).parent("a").attr("id") + '').children('i').attr("data-id", "0");

    });
    $(".edit_li_div03_btn01").click(function(event) {

        $(".edit_li_div03").slideUp(500);
        $(".edit_li_btn03").attr("data-id", "0");

    });
    $(".edit_li_div03_btn02").click(function(event) {

        $(".edit_li_div03").slideUp(500);
        $(".edit_li_btn03").attr("data-id", "0");
    });
    $(".edit_li_btn03").click(function(event) {

        var a = $(this).attr("data-id");
        if (a == 0) {
            $(".edit_li_div03").slideDown(500);
            $(this).attr("data-id", "1");
            var grade_id = parseInt($(".edit_li_div03").attr("grade-id"));
            var subject_id = parseInt($(".edit_li_div03").attr("subject_id"));
            console.log(grade_id);
            $(".edit_li_div03").slideDown(500);
            var version = $(".edit_li_div03_p02_ban select").children('option:selected').val();
            if (version == "人教A版") {
                var type = "standard_edition_A";
            } else if (version == "沪教版") {
                var type = "shanghai_edition";
            } else if (version == "人教B版") {
                var type = "standard_edition_B";
            }
            var versions = $(".edit_li_div03_p02_mo select").children('option:selected').val();
            
            console.log("11111");
            console.log(type);
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + "/api/v2/sync_knowledge_points",
                data: {
                    'grade_id': grade_id,
                    'subject_id': subject_id,
                    'version':type,
                    's_type':versions,
                },
                headers: { 'Authorization': "Bearer " + isLogin },
                success: function(data) {
                    console.log(data);
                    $(".edit_zs").html(" ");
                    $(".search_ul").html(" ");
                    var a_length = data.length;

                    for (var i = 0; i < data.length; i++) {
                        $(".edit_zs").append('<li class="choose_li' + data[i].id + '" style="border:none;line-height:38px;color: #999999;"><i class="iconfont" style="margin-left:10px;margin-right:10px;">&#xe6ca;</i>' + data[i].name + '</li>')
                        $(".search_ul").append('<li data-id="' + data[i].id + '" scroll-id="' + i + '">' + data[i].name + '</li>');
                        if (data[i].children !== undefined) {
                            $(".edit_zs").children('li').eq(i).append('<ul style="display: none;"></ul>');

                            for (var i1 = 0; i1 < data[i].children.length; i1++) {
                                $(".edit_zs").children('li').eq(i).children('ul').append('<li class="choose_li' + data[i].children[i1].id + '" data-id="' + data[i].children[i1].id + '" style="border:none;line-height:20px;padding-left:12px;color: #999999;"><i class="iconfont" style="margin-left:10px;margin-right:10px;" data-id="0">&#xe6ca;</i><a>' + data[i].children[i1].name + '</a></li>');
                                $(".search_ul").append('<li data-id="' + data[i].children[i1].id + '" scroll-id="' + i + '">' + data[i].children[i1].name + '</li>');

                                if (data[i].children[i1].children !== undefined) {
                                    $(".edit_zs").children('li').eq(i).children('ul').children('li').eq(i1).append('<ul style="display: none;"></ul>');

                                    for (var i2 = 0; i2 < data[i].children[i1].children.length; i2++) {
                                        $(".edit_zs").children('li').eq(i).children('ul').children('li').eq(i1).children('ul').append('<li class="choose_li' + data[i].children[i1].children[i2].id + '"  data-id="' + data[i].children[i1].children[i2].id + '"  style="border:none;line-height:20px;padding-left:30px;color: #999999;"><i class="iconfont choose_i" style="margin-left:10px;margin-right:10px;" data-id="0">&#xe64b;</i><a>' + data[i].children[i1].children[i2].name + '</a></li>');
                                        $(".search_ul").append('<li data-id="' + data[i].children[i1].children[i2].id + '" scroll-id="' + i + '">' + data[i].children[i1].children[i2].name + '</li>');

                                    }
                                } else {
                                    $(".edit_zs").children('li').eq(i).children('ul').children('li').children('i').attr("class", "iconfont choose_i");
                                    $(".edit_zs").children('li').eq(i).children('ul').children('li').children('i').html("&#xe64b;");

                                };

                            }
                        }
                    }
                },
                error: function() {

                }


            });


            //获取选中
            var question_bank_id = parseInt($(".edit_li_div03").attr("data-id"));
            $.ajax({
                type: "GET",
                async: false,
                url: ajaxIp + '/api/v2/question_banks/' + question_bank_id + '/selected_sync_know_ledge_points',
                data: {
                    'question_bank_id': question_bank_id,
                },
                headers: { 'Authorization': "Bearer " + isLogin },
                success: function(data) {
                    console.log(data);
                    $(".edit_li03_box01").html(" ");
                    for (var i = 0; i < data.length; i++) {
                        $(".edit_li03_box01").append('<a id="choose_li' + data[i].id + '"  data-id="' + data[i].id + '" style="height:29px;background:#31bc91;display: block;line-height: 29px;text-align:center;margin:12px 0px 0px 12px;float:left;color:#f5f5f5;cursor: pointer;padding-left:5px;padding-right:5px;box-sizing: border-box;">' + data[i].name + '<i class="edit_li03_box_a_i iconfont" style="font-size: 12px;margin-left:12px;">&#xe61b;</i></a>');
                    }

                },
                error: function() {

                }
            });

        } else {
            $(".edit_li_div03").slideUp(500);
            $(this).attr("data-id", "0");

        }

    });

    $(".edit_li_div03_p02 select").change(function(event) {
        var version = $(".edit_li_div03_p02_ban select").children('option:selected').val();
        if (version == "人教A版") {
            var type = "standard_edition_A";
        } else if (version == "沪教版") {
            var type = "shanghai_edition";
        } else if (version == "人教B版") {
            var type = "standard_edition_B";
        }
         var versions = $(".edit_li_div03_p02_mo select").children('option:selected').val();
        var grade_id = parseInt($(".edit_li_div03").attr("grade-id"));
        var subject_id = parseInt($(".edit_li_div03").attr("subject_id"));
        console.log(grade_id);
        $(".edit_li_div03").slideDown(500);

        $.ajax({
            type: "GET",
            async: false,
            url: ajaxIp + "/api/v2/sync_knowledge_points",
            data: {
                'grade_id': grade_id,
                'subject_id': subject_id,
                'version': type,
                 's_type':versions,
            },
            headers: { 'Authorization': "Bearer " + isLogin },
            success: function(data) {
                console.log(data);

                $(".edit_zs").html(" ");
                $(".search_ul").html(" ");
                var a_length = data.length;

                for (var i = 0; i < data.length; i++) {
                    $(".edit_zs").append('<li class="choose_li' + data[i].id + '" style="border:none;line-height:38px;color: #999999;"><i class="iconfont" style="margin-left:10px;margin-right:10px;">&#xe6ca;</i>' + data[i].name + '</li>')
                    $(".search_ul").append('<li data-id="' + data[i].id + '" scroll-id="' + i + '">' + data[i].name + '</li>');
                    if (data[i].children !== undefined) {
                        $(".edit_zs").children('li').eq(i).append('<ul style="display: none;"></ul>');

                        for (var i1 = 0; i1 < data[i].children.length; i1++) {
                            $(".edit_zs").children('li').eq(i).children('ul').append('<li class="choose_li' + data[i].children[i1].id + '" data-id="' + data[i].children[i1].id + '" style="border:none;line-height:20px;padding-left:12px;color: #999999;"><i class="iconfont" style="margin-left:10px;margin-right:10px;" data-id="0">&#xe6ca;</i><a>' + data[i].children[i1].name + '</a></li>');
                            $(".search_ul").append('<li data-id="' + data[i].children[i1].id + '" scroll-id="' + i + '">' + data[i].children[i1].name + '</li>');

                            if (data[i].children[i1].children !== undefined) {
                                $(".edit_zs").children('li').eq(i).children('ul').children('li').eq(i1).append('<ul style="display: none;"></ul>');

                                for (var i2 = 0; i2 < data[i].children[i1].children.length; i2++) {
                                    $(".edit_zs").children('li').eq(i).children('ul').children('li').eq(i1).children('ul').append('<li class="choose_li' + data[i].children[i1].children[i2].id + '"  data-id="' + data[i].children[i1].children[i2].id + '"  style="border:none;line-height:20px;padding-left:30px;color: #999999;"><i class="iconfont choose_i" style="margin-left:10px;margin-right:10px;" data-id="0">&#xe64b;</i><a>' + data[i].children[i1].children[i2].name + '</a></li>');
                                    $(".search_ul").append('<li data-id="' + data[i].children[i1].children[i2].id + '" scroll-id="' + i + '">' + data[i].children[i1].children[i2].name + '</li>');

                                }
                            } else {

                                $(".edit_zs").children('li').eq(i).children('ul').children('li').children('i').attr("class", "iconfont choose_i");
                                $(".edit_zs").children('li').eq(i).children('ul').children('li').children('i').html("&#xe64b;");

                            };

                        }
                    }

                }

            },
            error: function() {

            }


        });


        //获取选中
        var question_bank_id = parseInt($(".edit_li_div03").attr("data-id"));
        $.ajax({
            type: "GET",
            async: false,
            url: ajaxIp + '/api/v2/question_banks/' + question_bank_id + '/selected_sync_know_ledge_points',
            data: {
                'question_bank_id': question_bank_id,
            },
            headers: { 'Authorization': "Bearer " + isLogin },
            success: function(data) {
                console.log(data);
                $(".edit_li03_box01").html(" ");
                for (var i = 0; i < data.length; i++) {
                    $(".edit_li03_box01").append('<a id="choose_li' + data[i].id + '"  data-id="' + data[i].id + '" style="height:29px;background:#31bc91;display: block;line-height: 29px;text-align:center;margin:12px 0px 0px 12px;float:left;color:#f5f5f5;cursor: pointer;padding-left:5px;padding-right:5px;box-sizing: border-box;">' + data[i].name + '<i class="edit_li03_box_a_i iconfont" style="font-size: 12px;margin-left:12px;">&#xe61b;</i></a>');

                }

            },
            error: function() {

            }
        });

        console.log(type);
    });






    $(".search_input").keyup(function() {
        var me = $(this),
            v = me.val().replace(/^\s+\s+$/g, "");
        var trs = $(".search_ul").find("li");
        if (v == "") {
            trs.filter(":hidden").show();
        } else {
            $(".search").show();
            trs.hide().filter(":contains('" + me.val() + "')").show();
        }
    });




    $(".search").on('click', 'li', function(event) {
        $(".search_input").val($(this).html());
        $(".search_input").attr("scroll-id", $(this).attr("scroll-id"));

    });
    $(".edit_li_div03_p02_a").click(function(event) {
        var a_num = $(".search_input").attr("scroll-id");
        console.log($(".edit_zs").children('li').eq(a_num).attr("class"));
        var container = $('.edit_zs_div'),
            scrollTo = $('.' + $(".edit_zs").children('li').eq(a_num).attr("class") + '');

        container.scrollTop(
            scrollTo.offset().top - container.offset().top + container.scrollTop()
        )


        container.animate({
            scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
        })
        $(".edit_zs ul").css("display", "none");
        $('.' + $(".edit_zs").children('li').eq(a_num).attr("class") + '').find("ul").css("display", "block");

    });
    $(document).click(function() {
        $(".search").hide();
    });

    $(".edit_zs").on('click', '.choose_i', function(event) {

        var a = $('#' + $(this).parent().attr("class") + '').html();
        var a_co = $(this).attr("data-id");

        if (a_co == 0) {
            $(this).css("color", "#31bc92");
            $(this).attr("data-id", "1");
        } else if (a_co == 1) {
            $(this).css("color", "#999999");
            $(this).attr("data-id", "0");
            $('#' + $(this).parent().attr("class") + '').remove();
        }
        if (a == undefined) {
            $(".edit_li03_box01").append('<a id="' + $(this).parent().attr("class") + '"  data-id="' + $(this).parent().attr("data-id") + '" style="height:29px;background:#31bc91;display: block;line-height: 29px;text-align:center;margin:12px 0px 0px 12px;float:left;color:#f5f5f5;cursor: pointer;padding-left:5px;padding-right:5px;box-sizing: border-box;">' + $(this).next().text() + '<i data-id="' + $(this).parent("li").attr("class") + '"class="edit_li03_box_a_i iconfont" style="font-size: 12px;margin-left:12px;">&#xe61b;</i></a>');

        }


    });
    $(".edit_li_div03_btn01").click(function(event) {
        console.log($(".edit_li03_box01 a").length);
        var a_length = $(".edit_li03_box01 a").length;
        var question_bank_id = parseInt($(".edit_li_div03").attr("data-id"));
        var a_num = [];
        for (var i = 0; i < a_length; i++) {
            a_num[i] = $(".edit_li03_box01 a").eq(i).attr("data-id");
        }
        console.log(a_num);
        $.ajax({
            type: "PUT",
            async: false,
            url: ajaxIp + '/api/v2/question_banks/' + question_bank_id + '/update_sync_know_ledge_points',
            data: {
                'sync_know_ledge_point_ids': a_num,
            },
            headers: { 'Authorization': "Bearer " + isLogin },
            success: function(data) {

                layer.msg('保存成功', { time: 700 });

            },
            error: function() {

            }
        });


    });
    //能力
    $(".edit_li_btn04").click(function(event) {
        var a = $(this).attr("data-id");
        if (a == 0) {
            $(".nengli_box").slideDown(500);
            $(this).attr("data-id", "1");
            var grade_id = parseInt($(".edit_li_div03").attr("grade-id"));
            var subject_id = parseInt($(".edit_li_div03").attr("subject_id"));
            console.log(grade_id);
            $.ajax({
                type: "GET",
                url: ajaxIp + '/api/v2/labels/ability_labels',
                data: {
                    'grade_id': grade_id,
                    'subject_id': subject_id,
                },
                headers: { 'Authorization': "Bearer " + isLogin },
                success: function(data) {
                    console.log(data);
                    $(".neng_box_choose01").html(" ");
                    for (var i = 0; i < data.length; i++) {
                        $(".neng_box_choose01").append('<a class="nengli_choose' + data[i].id + '" data-id="' + data[i].id + '"  a_id="0" style="height: 29px;display: block;line-height: 29px;background: #cccccc;text-align: center;margin: 12px 0px 0px 12px;float: left;color: #f5f5f5;cursor: pointer;padding-left: 5px;padding-right: 5px;box-sizing: border-box;"><i>' + data[i].name + '</i><i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe619;</i></a>');

                    }

                },
                error: function() {

                }
            });
            //获取已经选择的能力
            var question_bank_id = parseInt($(".edit_li_div03").attr("data-id"));
            $.ajax({
                type: "GET",
                url: ajaxIp + '/api/v2/question_banks/' + question_bank_id + '/selected_ability_labels',
                data: {
                    'question_bank_id': question_bank_id,
                },
                headers: { 'Authorization': "Bearer " + isLogin },
                success: function(data) {
                    console.log(data);
                    $(".neng_box_choose02").html(" ");

                    for (var i = 0; i < data.length; i++) {
                        $(".neng_box_choose02").append('<a id="nengli_choose' + data[i].id + '"  style="background: #31bc91;color: #f5f5f5;margin: 10px;display:inline-block;line-height: 30px;padding: 0px 7px;float:left;" data-id="' + data[i].id + '"><i>' + data[i].name + '</i><i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe61b;</i></a>');
                        $('.nengli_choose' + data[i].id + '').css("background", "#31bc91");
                    }

                },
                error: function() {

                }
            });
        } else if (a == 1) {
            $(".nengli_box").slideUp(500);
            $(this).attr("data-id", "0");
        }


    });
    $(".neng_box_choose01").on('click', 'a', function(event) {
        console.log($(this).children('i').eq(0).html());
        var a_id = $(this).attr("a_id");
        var a = $('#' + $(this).attr("class") + '').html();

        if (a_id == 0) {
            $(this).css("background", "#31bc92");
            $(this).attr("a_id", "1");
        } else if (a_id == 1) {
            $(this).css("background", "#cccccc");
            $(this).attr("a_id", "0");
            $('#' + $(this).attr("class") + '').remove();
        }
        if (a == undefined) {
            $(".neng_box_choose02").append('<a id="' + $(this).attr("class") + '"  style="background: #31bc91;color: #f5f5f5;margin: 10px;display:inline-block;line-height: 30px;padding: 0px 7px;float:left;" data-id="' + $(this).attr("data-id") + '"><i>' + $(this).children('i').eq(0).html() + '</i><i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe61b;</i></a>');

        }
        var a_length02 = parseInt($('.neng_box_choose02 a').length);
        var a_length01 = parseInt($('.neng_box_choose01 a').length);
        if (a_length01 > a_length02) {
            $(".nengl_quan").css("color", "#666666");
            $(".nengl_quan").attr("data-id", "0");
        }
    });
    $(".neng_box_choose02").on('click', 'a', function(event) {
        $(this).remove();
        $('.' + $(this).attr("id") + '').css("background", "#cccccc");
        $('.' + $(this).attr("id") + '').attr("a_id", "0");

    });
    $(".neng_btn01").click(function(event) {
        var a_length = $(".neng_box_choose02 a").length;
        var question_bank_id = parseInt($(".edit_li_div03").attr("data-id"));
        var a_num = [];
        for (var i = 0; i < a_length; i++) {
            a_num[i] = $(".neng_box_choose02 a").eq(i).attr("data-id");
        }
        console.log(a_num);
        $.ajax({
            type: "PUT",
            url: ajaxIp + '/api/v2/question_banks/' + question_bank_id + '/update_ability_labels',
            data: {
                'ability_label_ids': a_num,
            },
            headers: { 'Authorization': "Bearer " + isLogin },
            success: function(data) {
                console.log(data);
                layer.msg('保存成功', { time: 700 });

            },
            error: function() {

            }
        });



    });
    $(".nengl_quan").click(function(event) {
        var a = $(".nengl_quan").attr("data-id");
        var a_length01 = $(".neng_box_choose01 a").length;
        var a_length02 = $(".neng_box_choose02 a").length;
        if (a == 0) {
            $(this).css("color", "#31bc91");
            $(this).attr("data-id", "1");
            $(".neng_box_choose01 a").css("background", "#31bc91");
            $(".neng_box_choose02").html(" ");
            for (var i = 0; i < a_length01; i++) {
                $(".neng_box_choose02").append('<a id="' + $(".neng_box_choose01 a").eq(i).attr("class") + '"  style="background: #31bc91;color: #f5f5f5;margin: 10px;display:inline-block;line-height: 30px;padding: 0px 7px;float:left;" data-id="' + $(".neng_box_choose01 a").eq(i).attr("data-id") + '"><i>' + $(".neng_box_choose01 a").eq(i).children('i').eq(0).html() + '</i><i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe61b;</i></a>');

            }
        } else if (a == 1) {
            $(this).css("color", "#666666");
            $(this).attr("data-id", "0");
            $(".neng_box_choose01 a").css("background", "#cccccc");
            $(".neng_box_choose02").html(" ");
        }

    });

    $(".neng_btn01").click(function(event) {

        $(".nengli_box").slideUp(500);
        $(".edit_li_btn04").attr("data-id", "0");
    });
    $(".neng_btn02").click(function(event) {

        $(".nengli_box").slideUp(500);
        $(".edit_li_btn04").attr("data-id", "0");
    });
    //错因
    $(".edit_li_btn05").click(function(event) {

        var a = $(this).attr("data-id");
        if (a == 0) {
            $(".wrong_box").slideDown(500);
            $(this).attr("data-id", "1");
            var grade_id = parseInt($(".edit_li_div03").attr("grade-id"));
            var subject_id = parseInt($(".edit_li_div03").attr("subject_id"));
            console.log(grade_id);
            $.ajax({
                type: "GET",
                url: ajaxIp + '/api/v2/labels/reason_labels',
                data: {
                    'grade_id': grade_id,
                    'subject_id': subject_id,
                },
                headers: { 'Authorization': "Bearer " + isLogin },
                success: function(data) {
                    console.log(data);

                    $(".wrong_z_01").html(" ");
                    $(".wrong_fz_01").html(" ");
                    for (var i = 0; i < data.z_reason_labels.length; i++) {
                        $(".wrong_z_01").append('<a class="wrong_choose' + data.z_reason_labels[i].id + '"  style="background: #cccccc;color: #f5f5f5;margin: 10px;display:inline-block;line-height: 30px;padding: 0px 7px;float:left;" data-id="0" num-id="' + data.z_reason_labels[i].id + '"><i style="font-style: normal;">' + data.z_reason_labels[i].name + '</i><i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe619;</i></a>');
                    }
                    for (var i = 0; i < data.fz_reason_labels.length; i++) {
                        $(".wrong_fz_01").append('<a class="wrong_choose' + data.fz_reason_labels[i].id + '"  style="background: #cccccc;color: #f5f5f5;margin: 10px;display:inline-block;line-height: 30px;padding: 0px 7px;float:left;" data-id="0" num-id="' + data.fz_reason_labels[i].id + '"><i style="font-style: normal;">' + data.fz_reason_labels[i].name + '</i><i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe619;</i></a>');
                    }
                },
                error: function() {

                }
            });
            // 获取
            var question_bank_id = parseInt($(".edit_li_div03").attr("data-id"));
            $.ajax({
                type: "GET",
                url: ajaxIp + '/api/v2/question_banks/' + question_bank_id + '/selected_reason_labels',
                data: {
                    'question_bank_id': question_bank_id,

                },
                headers: { 'Authorization': "Bearer " + isLogin },
                success: function(data) {
                    console.log(data);
                    $(".wrong_z_02").html(" ");
                    $(".wrong_fz_02").html(" ");
                    for (var i = 0; i < data.z_reason_labels.length; i++) {
                        $(".wrong_z_02").append('<a id="wrong_choose' + data.z_reason_labels[i].id + '"  style="background: #31bc91;color: #f5f5f5;margin: 10px;display:inline-block;line-height: 30px;padding: 0px 7px;float:left;" data-id="0" num-id="' + data.z_reason_labels[i].id + '"><i style="font-style: normal;">' + data.z_reason_labels[i].name + '</i><i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe61b;</i></a>');
                        $('.wrong_choose' + data.z_reason_labels[i].id + '').css("background", "#31bc92");
                        $('.wrong_choose' + data.z_reason_labels[i].id + '').attr("data-id", "1");
                    }
                    for (var i = 0; i < data.fz_reason_labels.length; i++) {
                        $(".wrong_fz_02").append('<a id="wrong_choose' + data.fz_reason_labels[i].id + '"  style="background: #31bc91;color: #f5f5f5;margin: 10px;display:inline-block;line-height: 30px;padding: 0px 7px;float:left;" data-id="0" num-id="' + data.fz_reason_labels[i].id + '"><i style="font-style: normal;">' + data.fz_reason_labels[i].name + '</i><i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe61b;</i></a>');
                        $('.wrong_choose' + data.fz_reason_labels[i].id + '').css("background", "#31bc92");
                        $('.wrong_choose' + data.fz_reason_labels[i].id + '').attr("data-id", "1");
                    }

                },
                error: function() {

                }
            });

        } else {
            $(".wrong_box").slideUp(500);
            $(this).attr("data-id", "0");
        }


    });
    //z
    $(".wrong_z_01").on('click', 'a', function(event) {
        var a = $(this).attr("data-id");
        if (a == 0) {
            $(this).css("background", "#31bc92");
            $(this).attr("data-id", "1");
            $(".wrong_z_02").append('<a id="' + $(this).attr("class") + '"  style="background: #31bc91;color: #f5f5f5;margin: 10px;display:inline-block;line-height: 30px;padding: 0px 7px;float:left;" num-id="' + $(this).attr("num-id") + '"><i>' + $(this).find('i').eq(0).html() + '</i><i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe61b;</i></a>');
        } else if (a == 1) {
            $(this).css("background", "#cccccc");
            $(this).attr("data-id", "0");
            $('#' + $(this).attr("class") + '').remove();
        }
    });
    $(".wrong_z_02").on('click', 'a', function(event) {
        $(this).remove();
        $('.' + $(this).attr("id") + '').css("background", "#cccccc");
        $('.' + $(this).attr("id") + '').attr("data-id", "0");


    })

    //fz
    $(".wrong_fz_01").on('click', 'a', function(event) {
        var a = $(this).attr("data-id");
        if (a == 0) {
            $(this).css("background", "#31bc92");
            $(this).attr("data-id", "1");
            $(".wrong_fz_02").append('<a id="' + $(this).attr("class") + '"  style="background: #31bc91;color: #f5f5f5;margin: 10px;display:inline-block;line-height: 30px;padding: 0px 7px;float:left;" num-id="' + $(this).attr("num-id") + '"><i>' + $(this).find('i').eq(0).html() + '</i><i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe61b;</i></a>');

        } else if (a == 1) {
            $(this).css("background", "#cccccc");
            $(this).attr("data-id", "0");
            $('#' + $(this).attr("class") + '').remove();
        }
    });
    $(".wrong_fz_02").on('click', 'a', function(event) {
        $(this).remove();
        $('.' + $(this).attr("id") + '').css("background", "#cccccc");
        $('.' + $(this).attr("id") + '').attr("data-id", "0");


    });

    $(".wrong_box_btn01").click(function(event) {
        var question_bank_id = parseInt($(".edit_li_div03").attr("data-id"));
        var a_length01 = $(".wrong_z_02 a").length;
        var a_length02 = $(".wrong_fz_02 a").length;
        var a_num01 = [];
        for (var i01 = 0; i01 < a_length01; i01++) {
            a_num01[i01] = $(".wrong_z_02 a").eq(i01).attr("num-id");
        }
        var a_num02 = [];
        for (var i02 = 0; i02 < a_length02; i02++) {
            a_num02[i02] = $(".wrong_fz_02 a").eq(i02).attr("num-id");
        }
        console.log(a_num01);
        console.log(a_num02);
        var num = a_num01.concat(a_num02);
        console.log(num);
        $.ajax({
            type: "PUT",
            async: false,
            url: ajaxIp + '/api/v2/question_banks/' + question_bank_id + '/update_reason_labels',
            data: {
                'reason_label_ids': num,
            },
            headers: { 'Authorization': "Bearer " + isLogin },
            success: function(data) {
                console.log(data);

                layer.msg('保存成功', { time: 700 });

            },
            error: function() {

            }
        });

    });

    $(".wrong_box_btn01").click(function(event) {
        $(".wrong_box").slideUp(500);
        $(".edit_li_btn05").attr("data-id", "0");
    });
    $(".wrong_box_btn02").click(function(event) {
        $(".wrong_box").slideUp(500);
        $(".edit_li_btn05").attr("data-id", "0");
    });
    //添加新标签
    $(".edit_li_btn06_add").click(function(event) {
        var a_val = $(".edit_li_btn06_input").val();
        var question_bank_id = parseInt($(".edit_li_div03").attr("data-id"));
        console.log(question_bank_id);
        if ($(".edit_li_btn06_input").val().length == 0) {
            alert("标签内容不能为空");
        } else {
            $.ajax({
                type: "POST",
                async: false,
                url: ajaxIp + '/api/v2/question_banks/' + question_bank_id + '/add_desc',
                data: {
                    'question_bank_id': question_bank_id,
                    'name': a_val,
                },
                headers: { 'Authorization': "Bearer " + isLogin },
                success: function(data) {
                    console.log(data);

                    layer.msg('保存成功', { time: 700 });
                    $(".edit_li_btn06_div").append('<a class="delete_' + data.id + '" style="background: #31bc91;color: #f5f5f5;margin: 10px;display:inline-block;line-height: 30px;padding: 0px 7px;float:left;" data-id="' + data.id + '"><i style="font-style:normal;">' + data.name + '</i><i class="iconfont" style="font-size: 12px;margin-left: 5px;">&#xe61b;</i></a>');

                },
                error: function() {

                }
            });
        }





    });
    $(".edit_li_btn06_div").on('click', '.iconfont', function(event) {
        var id = parseInt($(this).parent().attr("data-id"));
        $.ajax({
            type: "DELETE",
            async: false,
            url: ajaxIp + '/api/v2/question_banks/remove_desc',
            data: {
                'question_bank_describe_id': id,

            },
            headers: { 'Authorization': "Bearer " + isLogin },
            success: function(data) {
                console.log(data);
                $('.delete_' + id + '').remove();
            },
            error: function() {

            }
        });


    });











})