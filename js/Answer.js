var m1 = angular.module("pro", []);
m1.config(function ($httpProvider) {
    // 跨域
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
//设置控制器
m1.controller("demo", function ($scope, $timeout, $http) {
    $scope.page_num = 0 //页数
    $scope.listObj = [];//定义全局数组保存所有题目
    $scope.listObj2 = [];//定义全局数组保存所有题目
    $scope.result = {};//弹出框保存
//点击显示
    $scope.add = function (index) {
        $scope.index = index
        clear()
    };
    $scope.Q_number = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十']
    // $scope.setNumber = function (obj, num) {//设置题目编号
    //     var array = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
    //     for (var i = 0; i < obj.length; i++) {
    //         if (i < 10) {
    //             obj[i].title = array[i + num];
    //         } else if (10 <= i < 20) {
    //             obj[i].title = array[9] + array[i + num - 10];
    //         } else if (20 <= i < 30) {
    //             obj[i].title = array    [1] + array[9] + array[i - 20];
    //         } else if (30 <= i < 40) {
    //             obj[i].title = array[2] + array[9] + array[i - 30];
    //         } else if (40 <= i < 50) {
    //             obj[i].title = array[3] + array[9] + array[i - 40];
    //         }
    //     }
    // }
    $scope.isLine = function (type, num, page_num) {//是否换行
        var type = parseInt(type)
        var num = parseInt(num)
        var title_h = 40, item = 30;
        var page_top = page_num == 0 ? 290 : 0
        var page = 946
        var marking = (type == 1 || type == 2) ? 0 : 40
        var page_prev = page_num == 0 ? 0 : page_num * page
        var height = $(".A_Rone_child").get(page_num).offsetHeight;//获取每次生成模版的高度
        var isB = page - page_top - height - title_h - (Math.ceil(num / 4) * item) - 60 - page_prev < 0 ? true : false
        console.log(page - page_top - height - title_h - (Math.ceil(num / 4) * item) - 60 - page_prev)
        return isB
    }
    $scope.append = function (obj) {//push数据
        if ($scope.listObj2.length > 0) {
            $scope.page_num = 1
        }
        var isB = $scope.isLine($scope.index, $scope.result.numbel, $scope.page_num)
        if (isB) {
            $scope.listObj2.push(obj);
            // $scope.setNumber($scope.listObj2, $scope.listObj.length)
        } else {
            $scope.listObj.push(obj);
            // $scope.setNumber($scope.listObj, 0)
        }
    }
//确认添加
    $scope.btn1 = function () {
        //添加选择题的存储
        var obj = {};
        var noarray = []//
        obj.thr = [];
        obj.no = [];
        var nub = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        $scope.nubarray = nub.slice(0, $scope.result.thr);//选项个数
        var totaltwo = parseInt($scope.result.numbel) * parseInt($scope.result.two)//总分数
        for (var i = 0; i < parseInt($scope.result.numbel); i++) {//多少个小题
            noarray.push(i + parseInt($scope.result.no));
        }
        ;
        obj = {
            title: '',
            name: $scope.result.name,//题组名称aaaa
            numbel: $scope.result.numbel,//试题数量
            isradio: $scope.result.isradio,//试题类型
            no: noarray,//序号
            one: totaltwo,//总分
            two: $scope.result.two,//提分
            thr: $scope.index == 1 ? $scope.nubarray : ['T', 'F'], //选项ABCD(选择题和判断题)
            type: $scope.index//题目类型
        };
        $scope.append(obj)
        clear()
        close()
        console.log($scope.listObj)
    };
//关闭
    var close = function () {
        clear();
        $scope.index = 6
    }
    $scope.close = close
//清空选择题的内容
    var clear = function () {
        $scope.result = {
            name: '', numbel: '', isradio: '',
            no: '', one: '', two: '', thr: '',
        };
    };

    function getItemLine(num1, num2) {//获取多少行列
        var table = {}
        if (num2 <= 7) {
            table.row = Math.ceil(num1 / 4)
            table.column = 4
        } else if (num2 > 7 && num2 <= 10) {
            table.row = Math.ceil(num1 / 2)
            table.column = 2
        } else {
            table.row = num1
            table.column = 1
        }
        return table
    }

    function getItemPost() {//第一个选项坐标
        var fristPost = []
        var dom = $(".A_Rone_child").eq(0).find("table").eq(0).find(".q_c")
        dom.each(function (i) {
            fristPost.push($(this).find("b").eq(0).offset())
        })
        return fristPost
    }

    function getQuestion(qNumer, answerNumber) {//获取每个小题目
        var question = []
        var qNumer = parseInt(qNumer)
        var answerNumber = parseInt(answerNumber)//选项个数
        var dot = $(".position_TL span").eq(1).offset();
        dot.left = dot.left + 7.5, dot.top = dot.top + 7.5//定标点
        var item_w = 17, item_h = 22, itemMarginLeft = 5, itemMarginTop = 12;
        for (var i = 1; i <= qNumer; i++) {//循环每个小题
            var itme_obj = {}
            itme_obj.no = i
            itme_obj.option = []
            question.push(itme_obj)
        }
        for (var i = 0; i < question.length; i++) {
            for (var j = 1; j <= answerNumber; j++) {
                var itme_obj = {}
                itme_obj.no = j
                itme_obj.is_right = 1
                itme_obj.option_point_x = parseInt(getItemPost()[i].left + 8.5) + (item_w + itemMarginLeft) * j - parseInt(dot.left)
                itme_obj.option_point_y = parseInt(getItemPost()[i].top + 11) - parseInt(dot.top)//同行option_point_y都是一样的
                question[i].option.push(itme_obj)
            }
        }
        return question
    }

    function getBigQuestion(bigNumber) {//获取大题
        var BigQuestion = []
        for (var i = 1; i <= bigNumber; i++) {
            var itme_obj = {}
            itme_obj.no = i
            itme_obj.score = 40
            itme_obj.string = "一、选择(共40分,每题2分)"
            itme_obj.question = []
            itme_obj.answer_id = 11
            itme_obj.one_score = 1
            itme_obj.answer_mode = 1
            itme_obj.block_width = 14
            itme_obj.total_score = 2
            itme_obj.block_height = 11
            itme_obj.current_page = 1
            itme_obj.num_question = 20
            itme_obj.num_of_option = 4
            itme_obj.region_rect_x = 54
            itme_obj.region_rect_y = 413
            itme_obj.region_rect_width = 591
            itme_obj.region_rect_height = 161
            BigQuestion.push(itme_obj)
        }
        for (var i = 0; i < BigQuestion.length; i++) {
            BigQuestion[i].question = getQuestion(10, 4)
        }
        return BigQuestion
    }

    function save() {
        // var  url = ajaxIp+'/api/v2/answer_regions';
        // console.log(url)
        // var isLogin = localStorage.getItem("token");
        // $http.post({
        //     method:'POST',
        //     url:url,
        //     headers: {'Authorization': "Bearer " + isLogin},
        //     data:{
        //         'region_info':JSON.stringify(getBigQuestion(4))
        //     }
        // }).then(function (data) {
        //     console.log(data)
        // },function () {
        //
        // })

        var isLogin = localStorage.getItem("token");
        $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/answer_regions",
                headers: {'Authorization': "Bearer " + isLogin},
                data: {
                    'region_info':JSON.stringify(getBigQuestion(4))
                },
                dataType: "JSON",
                success: function (data) {
                    console.log(data)
                }
            }
        )


    }

    $("#qweqqqq").click(function () {
        console.log(ajaxIp)
        save()
    })
})


