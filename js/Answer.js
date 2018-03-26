var m1 = angular.module("answer", []);

//设置控制器
m1.controller("answer", function ($scope, $timeout, $http) {

    $scope.marks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '1', '2', '3', '4', '5', '.5', '']//打分框

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
            isInfoBox: 0,//考号是否在顶部 填图部分
            isInfoBar: 0//学生填写区域是否在顶部 手写部分
        },
        pages: [//最外层page页
            {
                listA: [],
                listB: []
            }
        ],
        list: []//所有的页面数据
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

        $scope.model.current_page = 1  //这个值需要后期调整

        if ($scope.model.type == 0) {//单选选择题
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
            if ($scope.model.isradio == 4 || $scope.model.isradio == 5) {//英语横线/单词间隔
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

        if ($scope.model.type == 0 || $scope.model.type == 1 || $scope.model.type == 5) {//设置选择题宽度
            if ($scope.model.count <= 5) {
                $scope.model.StyleWidth = {
                    "width": "25%"
                }
            } else if ($scope.model.count > 5 && $scope.model.count <= 11) {
                $scope.model.StyleWidth = {
                    "width": "50%"
                }
            } else {
                $scope.model.StyleWidth = {
                    "width": "100%"
                }
            }
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

        if ($scope.model.type == 3) {
            param.answer_settings.template_format = $scope.model.isradio//作文模版格式 panduan
            param.answer_settings.lattice_columns = $scope.model.repeatLine.length//格子列数 panduan
            param.answer_settings.lattice_total = $scope.model.gridnumber//格子总数 panduan
        }

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
        $scope.data.list.push($scope.model)
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
     * 获取题组区域左上角顶点位置和题组高度宽度
     * @param {题组索引} index 
     */
    function regionRect(index) {
        var regionRect = {}
        var dom = $(".question").eq(index).offset()
        regionRect.region_rect_x = parseInt(dom.left - getPoint().left)
        regionRect.region_rect_y = parseInt(dom.top - getPoint().top)
        regionRect.region_rect_height = $(".question").eq(index).height()
        return regionRect
    }
    /**获取17个打分框坐标 */
    function fillScoreOptions(index, current_page) {
        var fillScoreOptions = []
        var makrin = []

        var dom = $(".question").eq(index).find(".mark").find("span")

        dom.each(function () {
            fillScoreOptions.push($(this).offset())
        })
        for (var i = 1; i <= fillScoreOptions.length; i++) {
            var obj = {}
            obj.no = i
            obj.option_point_x = fillScoreOptions[i - 1].left + 11.5 - getPoint().left
            obj.option_point_y = fillScoreOptions[i - 1].top + 6 - getPoint().top - 1200 * (current_page - 1)
            makrin.push(obj)
        }
        return makrin
    }
    /**
     * 获得其他题小题左上角坐标和小题高度
     * @param {*} index 
     * @param {*} current_page 
     */
    function otherFillScoreRect(index, current_page) {
        var otherScoreRect = []
        var otherListDom = []
        var dom = $(".question").eq(index).find(".other")
        dom.each(function () {
            otherListDom.push({
                left: $(this).offset().left,
                top: $(this).offset().top,
                height: $(this).height()
            })
        })
        for (var i = 1; i <= dom.length; i++) {
            var scoreRect = {}
            scoreRect.no = i
            scoreRect.score_rect_x = otherListDom[i - 1].left - getPoint().left
            scoreRect.score_rect_y = otherListDom[i - 1].top - getPoint().top - 1200 * (current_page - 1)
            scoreRect.score_height = otherListDom[i - 1].height
            otherScoreRect.push(scoreRect)
        }
        return otherScoreRect
    }
    /**
     * 添加修改 answerModeType
     * @param {题目类型} type 
     */
    function answerModeType(type) {
        var answerModeType;
        if (type == 0) {//单选题
            answerModeType = 0
        }
        if (type == 5) {//多选题
            answerModeType = 1
        }
        if (type == 1) {//是非题
            answerModeType = 2
        }
        if (type == 2) {//分数框-填空题
            answerModeType = 5
        }
        if (type == 3 || type == 4) {//分数框（解答题写作题,其他题）
            answerModeType = 4
        }
        return answerModeType
    }
    /**
     * @param qNumer  小题个数
     * @param answerNumber 小题选项个数
     * @param Answerindex  $scope.listObj的索引
     * @param answerModeType 题目类型
     * @param itemCores 数组 每小题分数
     * @param current_page 当前页面
     * @param startNo 起始序号数组
     * @returns {Array}
     */
    function getQuestion(qNumer, answerNumber, Answerindex, answerModeType, itemCores, current_page, startNo) {//获取每个小题目
        var question = []
        var qNumer = parseInt(qNumer)
        var answerNumber = parseInt(answerNumber)//选项个数
        var item_w = 16, itemMarginLeft = 10;
        for (var i = 1; i <= qNumer; i++) {//循环每个小题
            var itme_obj = {}
            itme_obj.no = startNo[i - 1].toString()//起始序号客户端显示小题
            itme_obj.one_score = parseInt(itemCores[i - 1])//小题分值
            itme_obj.answer_setting_id = $scope.data.answer_id[Answerindex].answers.settings[i - 1].setting_id//小题id
            itme_obj.option = []
            if (answerModeType == 4) {//其他题
                itme_obj.region_rect_x = otherFillScoreRect(Answerindex, current_page)[i - 1].score_rect_x
                itme_obj.region_rect_y = otherFillScoreRect(Answerindex, current_page)[i - 1].score_rect_y - 30
                itme_obj.region_rect_height = otherFillScoreRect(Answerindex, current_page)[i - 1].score_height
                itme_obj.region_rect_width = 698 - 14
                var start = (i - 1) * 17
                var end = start + 17
                itme_obj.score_options = fillScoreOptions(Answerindex, current_page).slice(start, end)
            }
            if (answerModeType == 3) {//作文题
                itme_obj.region_rect_x = regionRect(Answerindex).region_rect_x + 8//题组区域的X坐标
                itme_obj.region_rect_y = regionRect(Answerindex).region_rect_y - 1200 * (current_page - 1) + 8//题组区域的Y坐标
                itme_obj.region_rect_height = 100
                itme_obj.region_rect_width = 698 - 14
                itme_obj.score_options = fillScoreOptions(Answerindex, current_page)
            }
            question.push(itme_obj)
        }
        for (var i = 0; i < question.length; i++) {

            for (var j = 1; j <= answerNumber; j++) {
                var itme_obj = {}
                itme_obj.no = j//小题序号
                if (answerModeType == 0 || answerModeType == 5 || answerModeType == 1) {//单选题/多选题/判断题
                    itme_obj.option_point_x = getItemPost(Answerindex)[i].left + 7 + (item_w + itemMarginLeft) * (j - 1) - getPoint().left//选项框中心点x坐标
                    itme_obj.option_point_y = getItemPost(Answerindex)[i].top + 6 - getPoint().top - 1200 * (current_page - 1)//同行option_point_y都是一样的 选项框中心点y坐标
                } else if (answerModeType == 2) {//填空题
                    itme_obj.option_point_x = getFillPost(Answerindex)[i].left + 11.5 - getPoint().left
                    itme_obj.option_point_y = getFillPost(Answerindex)[i].top + 6 - getPoint().top - 1200 * (current_page - 1)
                }
                question[i].option.push(itme_obj)
            }
        }
        return question
    }
    /**
     * 循环题型数组
     * @param {所有题型数组} obj 
     */
    function getBigQuestion(obj) {
        var BigQuestion = []
        for (var i = 1; i <= obj.length; i++) {
            var itme_obj = {}
            itme_obj.no = i//大题编号
            itme_obj.total_score = parseInt(obj[i - 1].totalCores)//答题总分
            itme_obj.string = obj[i - 1].name//大题标题
            itme_obj.answer_id = $scope.data.answer_id[i - 1].answers.answer_id//题组ID
            itme_obj.answer_mode = answerModeType(obj[i - 1].type)//题目类型
            itme_obj.current_page = obj[i - 1].current_page//当前页面
            itme_obj.num_question = obj[i - 1].number//题目数量

            if (obj[i - 1].type == 0 || obj[i - 1].type == 5 || obj[i - 1].type == 1) {//单选题/多选题/判断题
                itme_obj.block_width = 14//选项宽度
                itme_obj.block_height = 12//选项高度
                itme_obj.answer_count = 1//答案个数
                itme_obj.num_of_option = parseInt(obj[i - 1].count)//选项个数
            }

            if (obj[i - 1].type == 2) {//填空题
                //     itme_obj.block_width = 23//选项宽度
                //     itme_obj.block_height = 12//选项高度
                //     itme_obj.score_rect_x = fillScoreRect(i - 1).score_rect_x//打分框区域的x坐标
                //     itme_obj.score_rect_y = fillScoreRect(i - 1).score_rect_y - 1200 * (itme_obj.current_page - 1)//打分框区域的y坐标
                //     itme_obj.score_rect_width = fillScoreRect(i - 1).score_rect_width//打分框区域的宽度
                //     itme_obj.score_rect_height = fillScoreRect(i - 1).score_rect_height//打分框区域的高度
                //     itme_obj.score_options = fillScoreOptions(i - 1, obj[i - 1].type, obj[i - 1].current_page) //打分框坐标
            }

            if (obj[i - 1].type == 3) {//作文题
                itme_obj.block_width = 22//选项宽度
                itme_obj.block_height = 12//选项高度
                itme_obj.score_rect_width = 690//打分框区域的宽度
                itme_obj.score_rect_height = 20//打分框区域的高度
            }

            if (obj[i - 1].type == 4) {//其他题
                itme_obj.block_width = 22//选项宽度
                itme_obj.block_height = 12//选项高度
                itme_obj.score_rect_width = 690//打分框区域的宽度
                itme_obj.score_rect_height = 30//打分框区域的高度
            }

            if (obj[i - 1].type != 4 || obj[i - 1].type != 3) { //其他题/作文题
                itme_obj.region_rect_x = regionRect(i - 1).region_rect_x + 8//题组区域的X坐标
                itme_obj.region_rect_y = regionRect(i - 1).region_rect_y - 1200 * (itme_obj.current_page - 1) + 8//题组区域的Y坐标
                itme_obj.region_rect_width = 698 - 14//题组区域的宽度
            }

            if (obj[i - 1].type != 4) {
                itme_obj.region_rect_height = regionRect(i - 1).region_rect_height - 8//题组区域的高度
            }

            BigQuestion.push(itme_obj)
        }
        for (var i = 0; i < BigQuestion.length; i++) {
            if (obj[i].type == 4 || obj[i].type == 3) {
                BigQuestion[i].questions = getQuestion(obj[i].number, obj[i].count, i, obj[i].type, obj[i].itemscoreS, obj[i].current_page, obj[i].arrStartnNmber)
            } else {
                BigQuestion[i].question = getQuestion(obj[i].number, obj[i].count, i, obj[i].type, obj[i].itemscoreS, obj[i].current_page, obj[i].arrStartnNmber)
            }
        }

        $scope.data.state.recogniType == 0 ? BigQuestion.push(getStudentInfo()) : BigQuestion.push(getBarCode())  //识别考号/识别条码

        return BigQuestion
    }
    /** 
    *获取四个锚点坐标 
    */
    function getPostDot() {
        var anchor = {}
        var relativePost = $(".page").eq(0).offset()//相对点

        var dot1 = $(".content").find(".page").eq(0).find(".point").eq(0).find("span").eq(0).offset()
        var dot2 = $(".content").find(".page").eq(0).find(".point").eq(2).find("span").eq(0).offset();
        var dot3 = $(".content").find(".page").eq(0).find(".point").eq(1).find("span").eq(0).offset();
        var dot4 = $(".content").find(".page").eq(0).find(".point").eq(3).find("span").eq(0).offset();

        anchor.LeftTopX = $scope.data.state.examType == 0 ? parseInt(dot1.left + 15 - relativePost.left) : 0 //特殊考试的时候锚点为0
        anchor.LeftTopY = $scope.data.state.examType == 0 ? parseInt(dot1.top + 15 - relativePost.top) : 0
        anchor.RightTopX = $scope.data.state.examType == 0 ? parseInt(dot2.left + 15 - relativePost.left) : 0
        anchor.RightTopY = $scope.data.state.examType == 0 ? parseInt(dot2.top + 15 - relativePost.top) : 0
        anchor.LeftBottomX = $scope.data.state.examType == 0 ? parseInt(dot3.left + 15 - relativePost.left) : 0
        anchor.LeftBottomY = $scope.data.state.examType == 0 ? parseInt(dot3.top + 15 - relativePost.top) : 0
        anchor.RightBottomX = $scope.data.state.examType == 0 ? parseInt(dot4.left + 15 - relativePost.left) : 0
        anchor.RightBottomY = $scope.data.state.examType == 0 ? parseInt(dot4.top + 15 - relativePost.top) : 0
        return anchor
    }
    /**
     * 
     * @param {过滤手工阅卷} arr 
     */
    function filtrAnswerMode(arr) {
        var filtrAnswer = arr.filter(function (ele) {
            return ele.answer_mode == 0 || ele.answer_mode == 1 || ele.answer_mode == 2 || ele.answer_mode == 3 || ele.answer_mode == 6
        })
        return filtrAnswer
    }
    /**
    *保存 
    */
    $scope.save = function () {//保存模板
        if ($scope.data.pages[0].listA.length <= 0) {
            alert("请添加题组")
            return
        }
        function bindRegion() {
            var answer_ids = []
            for (var i = 0; i < $scope.data.answer_id.length; i++) {
                answer_ids.push($scope.data.answer_id[i].answers.answer_id)
            }
            if ($scope.data.state.readType == 0) {//网络阅卷、只有选择题、多选题、判断题坐标
                var allP = filtrAnswerMode(getBigQuestion($scope.data.list))
            } else {
                var allP = getBigQuestion($scope.data.list)
            }
            $.ajax({
                type: "POST",
                url: "/api/v2/answer_regions",
                headers: { 'Authorization': "Bearer " + isLogin },
                async: false,
                data: {
                    'answer_region[exam_subject_id]': examubjeId,//科目ID
                    'answer_region[anchor]': JSON.stringify(getPostDot()),//四个锚点
                    'answer_region[region_info]': JSON.stringify(allP),//所有坐标信息
                    'answer_region[basic_info_region]': JSON.stringify($scope.data),//存储页面题目
                    'page': $(".page").length
                },
                success: function (data) {//绑定题组以便刷新后删除没用的
                    var TemplateId = data.message
                    var bindData = new FormData()
                    bindData.append('exam_subject_id', examubjeId)
                    bindData.append('answer_region_id', TemplateId)
                    bindData.append('answer_ids', answer_ids.join(","))
                    $.ajax({
                        type: "POST",
                        url: "/api/v2/answer_region_binds",
                        headers: { 'Authorization': "Bearer " + isLogin },
                        async: false,
                        data: bindData,
                        processData: false,  // 不处理数据
                        contentType: false,   // 不设置内容类型
                        success: function (data) {
                            alert("保存成功")
                            modelParam.length = 0
                            console.log(data)
                            $("#menu").hide()
                        }
                    }
                    )
                }
            }
            )
        }

        if (modelParam.length > 0) {
            $.ajax({//获取answer_id
                type: "POST",
                url: "api/v2/answers/batch_create",
                headers: { 'Authorization': "Bearer " + isLogin },
                data: { "answers": JSON.stringify(modelParam) },
                async: false,
                success: function (data) {
                    console.log(data)
                    $scope.data.answer_id = data
                    bindRegion()
                },
                error: function (data) {
                    console.log(data)
                }
            }
            )
        } else {
            bindRegion()
        }
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
    /*****************************************************右键部分******************************************* */
    /** 
    *聚焦题组
    */
    $scope.questionFocus = function (index) {
        $scope.FocusIndex = index
        console.log($scope.FocusIndex)
    }
    /**
     * 显示弹窗
     * @param {弹窗的class} id 
     */
    $scope.showDialog = function (id) {
        $("."+id).show()
    }
    /**
    *设置考号 
    */
    $scope.setCandNumber = function(){
        $scope.creatExamNum($scope.data.student.examNumber)
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


