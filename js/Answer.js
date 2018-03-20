var m1 = angular.module("answer", []);

//设置控制器
m1.controller("answer", function ($scope, $timeout, $http) {

    $scope.marks = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '1', '2', '3', '4', '5', '.5', '']//打分框

    var options = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'H']

    var isLogin = localStorage.getItem("token"); //token

    var examubjeId = getUrlParam(window.location, 'examubjeId') //examubjeId

    $scope.model = {} //弹窗数据
    var modelParam = [] //请求参数数组

    $scope.data = {
        subject: {//项目信息
            name: window.localStorage.getItem("test_name") + window.localStorage.getItem("subjectname"),
            examId: examubjeId
        },
        countScore: 0,//总分
        state: {
            examType: 0,//考试类型 默认普通考试
            recogniType: 0,//识别类型 默认识别考号
            isBorder: 0,//是否有边框 默认有边框
            readType: 0,//阅卷类型 默认网络阅卷
            isScore: 0,//隐藏分数 默认隐藏分数
            printType: 0//打印类型 默认单面打印
        },
        student: {
            examNumber: 8,//考号位数
            isInfoBox: 0,//考号是否在顶部
            isInfoBar: 0//学生填写区域是否在顶部
        },
        pages: [//最外层page页
            {
                listA: [],
                listB: []
            }
        ]
    }
    /**
     * toolbar工具栏功能
     */
    $scope.toolbar = function (type) {

        $scope.data.state[type] = $scope.data.state[type] == 0 ? 1 : 0

        console.log($scope.data)

    }
    /*******************************************************************全局变量 */
    /**
     * 获取url参数
     */
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
    /** 
    *获取答题卡内容 
    */
    $scope.getAnswer = function () {
        $.ajax({
            type: "GET",
            url: "/api/v2/answer_regions/basic_info_region",
            headers: { 'Authorization': "Bearer " + isLogin },
            data: { 'exam_subject_id': examubjeId },
            async: false,
            success: function (data) {
                console.log(data)
                if (data.code == 200) {
                    $scope.data = data.message
                }
            }
        })
    }
    /** 
    *生成考号 
    */
    $scope.creatExamNum = function (number) {
        $scope.examNum = []
        for (var i = 0; i < number; i++) {
            $scope.examNum.push(i)
        }
    }
    /***********************************************************初始化部分 */
    $scope.getAnswer()

    $scope.creatExamNum($scope.data.student.examNumber)
    /************************************************************初始化部分 */
    /** 
     * 点击显示题组弹窗
    */
    $scope.showQuestioModel = function (index) {
        $scope.model = {}
        if (index == 0) {
            $scope.model.isradio = 1
        }
        if (index == 3) {
            $scope.model.isradio = 3
        }
        $scope.showIndex = index
        $scope.model.type = index
        $(".sub_menu").css({ "display": "block" })
    }
    /** 
     * 关闭添加题组弹窗
    */
    $scope.cloesQuestionMode = function () {
        $(".sub_menu").css({ "display": "none" })
    }
    /**
     * 切换/单选题/多选题/作文格式
     * @param {*} index 
     */
    $scope.checkbox = function (index) {
        if (index == 2) {
            $scope.model.type = 5 //多选题
        }
        $scope.model.isradio = index
    }
    /** 
     * 序列化为html模板格式
    */
    $scope.formatTemplateHtml = function () {
        $scope.model.arrStartnNmber = [] //小题序号数组
        $scope.model.itemscoreS = [] //小题分值数组
        $scope.model.totalCores = parseInt($scope.model.number) * parseInt($scope.model.itemscore)//总分数

        if ($scope.model.type == 0) {//单选选择题/多项选择题
            $scope.model.options = options.slice(0, $scope.model.count)
        }
        if ($scope.model.type == 1) {//判断题
            $scope.model.options = ['T', 'F']
            $scope.model.count = 2
        }
        if ($scope.model.type == 2) {//填空题
            $scope.model.count = 1
        }
        if ($scope.model.type == 3) {//作文题
            $scope.model.number = 1
            $scope.model.count = 1
            $scope.model.itemscore = parseInt($scope.model.w_totalscore)
            $scope.model.totalCores = parseInt($scope.model.w_totalscore)

            if ($scope.model.isradio == 3) {//作文格
                $scope.model.repeatLine = []
                var line = Math.floor($scope.model.gridnumber / 22)
                for (var i = 0; i < line; i++) {
                    $scope.model.repeatLine.push(i)
                }
            }
            if ($scope.model.isradio == 4 || $scope.model.isradio == 5) {//英语横线
                var data = $scope.model.linenumber || $scope.model.wordnumber
                $scope.model.repeatLine = []
                for (var i = 0; i < data; i++) {
                    $scope.model.repeatLine.push(i)
                }
            }
        }
        if ($scope.model.type == 4) {//其他题
            $scope.model.count = 1
        }
        if ($scope.model.type == 5) {//多选题
            $scope.model.options = options.slice(0, $scope.model.count)
        }
        for (var i = 0; i < parseInt($scope.model.number); i++) {
            $scope.model.arrStartnNmber.push(i + parseInt($scope.model.startnumber));
            $scope.model.itemscoreS.push($scope.model.itemscore)
        }
        console.log($scope.model)
    }
    /** 
     * 生成请求参数
    */
    $scope.createParam = function () {
        var Q_type = ['单选题', '是非题', '填空题', '作文题', '其他题', '多选题']
        var param = {}
        param.answer = {}
        param.answer_settings = {}
        param.answer_settings.count = $scope.model.number //试题数量 panduan
        param.answer_settings.num = $scope.model.startnumber//起始序号
        param.answer_settings.score = $scope.model.itemscore//每题分值 panduan
        param.answer_settings.type_count = $scope.model.count //选项个数 panduan

        // if (data.type == 4) {
        //     param.answer_settings.template_format = data.articleType//作文模版格式 panduan
        //     param.answer_settings.lattice_columns = data.row//格子列数 panduan
        //     param.answer_settings.lattice_total = data.plaid//格子总数 panduan
        // }

        param.answer.exam_subject_id = examubjeId//考试科目id
        param.answer.item = Q_type[$scope.model.type]//试题类型
        param.answer.name = $scope.model.name//题组名称

        modelParam.push(param)
        window.localStorage.setItem(examubjeId, JSON.stringify(modelParam))

    }
    /**
    *是否生成一个page页
    */
    $scope.insertPageData = function () {
        $scope.data.pages.push({
            listA: [],
            listB: [],
        })
    }
    /**
    *插入题组
    */
    $scope.insertQuesTionData = function () {
        $scope.data.pages[0].listA.push($scope.model)
        console.log($scope.data)
    }
    /** 
    *计算分数 
    */
    $scope.count = function () {
        $scope.data.countScore += $scope.model.totalCores
    }
    /** 
    *计算是否换行 
    */
    $scope.isLine = function () {

    }
    /**
     *添加按钮
     */
    $scope.add = function () {
        $scope.formatTemplateHtml()
        $scope.insertQuesTionData()
        $scope.createParam()
        $scope.count()
        $scope.cloesQuestionMode()
    }
    /************************************************计算坐标部分****************************************** */
    /**
     * 获取参考点位置坐标
     */
    var getPoint = function () {
        return {
            left: $(".content").find(".page").eq(0).find(".point").eq(0).find("span").eq(0).offset().left + 15,
            top: $(".content").find(".page").eq(0).find(".point").eq(0).find("span").eq(0).offset().top + 15
        }
    }
    /**
     * 获取条形码
     */
    function getBarCode() {
        var itme_obj = {}
        itme_obj.answer_mode = 6
        itme_obj.current_page = 1
        itme_obj.no = 0
        itme_obj.score = 0
        itme_obj.string = "条形码学号"
        itme_obj.block_width = 0
        itme_obj.block_height = 0
        itme_obj.num_question = 0
        itme_obj.num_of_option = 0
        itme_obj.region_rect_x = $(".code_box_dashed").offset().left - getPoint().left
        itme_obj.region_rect_y = $(".code_box_dashed").offset().top - getPoint().top
        itme_obj.region_rect_width = $(".code_box_dashed").outerWidth()
        itme_obj.region_rect_height = $(".code_box_dashed").outerHeight()
        return itme_obj
    }
    /**
     * 获取学号学生信息/信息栏位于顶部
     */
    function getStudentInfo() {
        var itme_obj = {}
        var studentRegionRect = {}//学号区域信息
        var studentInfo = $(".student_daub_l")
        studentRegionRect.region_rect_x = parseInt(studentInfo.offset().left - getPoint().left)
        studentRegionRect.region_rect_y = parseInt(studentInfo.offset().top - getPoint().top)
        studentRegionRect.region_rect_width = studentInfo.width()
        studentRegionRect.region_rect_height = studentInfo.height()
        var ulP = $(".candidate_daub")
        var ulItem = ulP.find("ul"), ulLen = ulItem.length
        var len;
        var fristPost = []//第一个itme坐标
        ulItem.each(function () {
            fristPost.push($(this).find("li").eq(0).offset())
            len = $(this).find("li").length
        })
        itme_obj.answer_mode = 3
        itme_obj.current_page = 1
        itme_obj.no = 0
        itme_obj.score = 0
        itme_obj.string = "学号"
        itme_obj.count = ulLen
        itme_obj.block_width = 18
        itme_obj.block_height = 12
        itme_obj.num_question = parseInt(ulLen)
        itme_obj.num_of_option = parseInt(len)
        itme_obj.region_rect_x = studentRegionRect.region_rect_x - 10 //扩大客户端可视范围
        itme_obj.region_rect_y = 10 //扩大客户端可视范围
        itme_obj.region_rect_width = 698
        itme_obj.region_rect_height = studentRegionRect.region_rect_height + 8 + 180//框选个人信息框
        itme_obj.question = []
        for (var i = 1; i <= ulLen; i++) {
            var a = {}
            a.no = i.toString()
            a.option = []
            itme_obj.question.push(a)
            for (var j = 1; j <= len; j++) {
                var b = {}
                b.no = j
                b.option_point_x = parseInt(fristPost[i - 1].left + 9 - getPoint().left)
                b.option_point_y = parseInt(fristPost[i - 1].top + 6 + (12 + 7) * (j - 1) - getPoint().top)//12+7是元素高度+margin值
                itme_obj.question[i - 1].option.push(b)
            }
        }
        return itme_obj
    }
    /**
     * 获取单选题/多选题/判断题/第一个选项A坐标
     * @param {题组索引} index 
     */
    function getItemPost(index) {
        var fristPost = []
        var dom = $(".question").eq(index).find(".xuze")
        dom.each(function (i) {
            fristPost.push($(this).find("span").eq(0).offset())
        })
        return fristPost
    }
    /**
    *保存 
    */
    $scope.save = function () {
        console.log(getBarCode())
        console.log(getStudentInfo())
    }
    /**
    *关闭答题卡窗口 
    */
    $scope.closeWindow = function () {
        if (modelParam.length > 0) {
            var r = confirm("请保存答题卡")
            if (r) {
                $scope.save()
            } else {
                window.location.href = 'paper_generate'
            }
        } else {
            window.location.href = 'paper_generate'
        }
    }
    /** 
    *聚焦题组
    */
    $scope.questionFocus = function (index) {
        $scope.FocusIndex = index
    }
    /**
    *设置选择题/多选题/判断题答案 
    */
    $scope.setItemAnswer = function () {

    }
    /** 打印*/
    $scope.print = function () {
        window.print()
    }

})


