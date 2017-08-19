var m1 = angular.module("pro", []);
//设置控制器
m1.controller("demo", function ($scope, $timeout, $http) {
    var url = window.location;

    function getUrlParam(url, name) {//获取页面参数
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

    $scope.page_num = 0 //页数
    $scope.listObj = [];//定义全局数组保存所有题目
    $scope.listObj2 = [];//定义全局数组保存所有题目
    $scope.result = {};//弹出框保存
    $scope.result.isradio = 1
    //点击显示
    $scope.add = function (index) {
        $scope.index = index
        clear()
        $scope.result.isradio = 1
    };
    $scope.checkbox = function (index) {//切换单选多选
        $scope.result.isradio = index
    }
    $scope.Q_number = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十']
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
        return isB
    }
    $scope.append = function (obj) {//push数据
        if ($scope.listObj2.length > 0) {
            $scope.page_num = 1
        }
        var isB = $scope.isLine($scope.index, $scope.result.numbel, $scope.page_num)
        if (isB) {
            $scope.listObj2.push(obj);
            window.localStorage.setItem("answer2", JSON.stringify($scope.listObj2))
            // $scope.setNumber($scope.listObj2, $scope.listObj.length)
        } else {
            $scope.listObj.push(obj);
            window.localStorage.setItem("answer", JSON.stringify($scope.listObj))
            // $scope.setNumber($scope.listObj, 0)
        }
    }
    var answer_id = []//大题answer_id
    $scope.createAsswer = function (data) {//添加题组
        var data = data
        var isLogin = localStorage.getItem("token");
        if (data.isradio == 2) {
            data.type = 6
        }
        var Q_type = ['单选题', '是非题', '填空题', '作文题', '其他题', '多选题']
        $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/answers",
                headers: {'Authorization': "Bearer " + isLogin},
                data: {
                    'answer[exam_subject_id]': getUrlParam(url, 'examubjeId'),
                    'answer[item]': Q_type[data.type - 1],
                    'answer[name]': data.name,
                    'answer_setting[count]': data.numbel,
                    'answer_setting[num]': data.startNo,
                    'answer_setting[page]': data.currentPage == undefined ? 1 : data.currentPage,
                    'answer_setting[score]': data.itemCores,
                    'answer_setting[type_count]': data.itemNumber
                },
                success: function (data) {
                    answer_id.push(data)
                }
            }
        )
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
        var totaltwo = parseInt($scope.result.numbel) * parseInt($scope.result.itemcoreS)//总分数
        for (var i = 0; i < parseInt($scope.result.numbel); i++) {//多少个小题
            noarray.push(i + parseInt($scope.result.no));
        }
        if($scope.index==2){
            var itemNumber = 2
        }else if($scope.index==3){
            var itemNumber = 1
        }else {
            var itemNumber = $scope.result.thr
        }
        obj = {
            name: $scope.result.name,//题组名称
            numbel: $scope.result.numbel,//试题数量
            isradio: $scope.result.isradio,//单选多选
            startNo: $scope.result.no,//起始序号
            currentPage: $scope.result.page==undefined?1:$scope.result.page,//所在页码
            no: noarray,//选项个数数组,
            itemNumber: itemNumber,//选项个数
            totalCores: totaltwo,//总分
            itemCores: $scope.result.itemcoreS,//每小题分
            thr: $scope.index == 1 ? $scope.nubarray : ['T', 'F'], //选项ABCD(选择题和判断题)
            type: $scope.result.isradio==2?6:$scope.index//题目类型
        };
        $scope.append(obj)
        $scope.createAsswer(obj)
        clear()
        close()
    };
    function getAnswer() {//获取
        if (window.localStorage.getItem("answer")) {
            $scope.listObj = JSON.parse(window.localStorage.getItem("answer"))
        }
        if (window.localStorage.getItem("answer2")) {
            $scope.listObj2 = JSON.parse(window.localStorage.getItem("answer2"))
        }
    }

    // getAnswer()
    //关闭
    var close = function () {
        clear();
        $scope.index = -1
    }
    $scope.close = close
    //清空选择题的内容
    var clear = function () {
        $scope.result = {
            name: '', numbel: '', isradio: '',
            no: '', one: '', two: '', thr: '',
        };
    };
    function getStudentInfo() {//获取学号学生信息
        var itme_obj = {}
        var studentRegionRect = {}//学号区域信息
        var dot = $(".position_TL span").eq(1).offset();
        dot.left = dot.left + 15, dot.top = dot.top + 15//定标点
        var studentInfo = $(".student_number3")
        studentRegionRect.region_rect_x = parseInt(studentInfo.offset().left - dot.left)
        studentRegionRect.region_rect_y = parseInt(studentInfo.offset().top - dot.top)
        studentRegionRect.region_rect_width = studentInfo.width()
        studentRegionRect.region_rect_height = studentInfo.height()
        var ulItem = studentInfo.find("ul"),ulLen = ulItem.length
        var len;
        var fristPost = []//第一个itme坐标
        ulItem.each(function () {
            fristPost.push($(this).find("li").eq(0).offset())
            len = $(this).find("li").length
        })
        itme_obj.answer_mode = 3
        itme_obj.no = 0
        itme_obj.score = 0
        itme_obj.string = "学号"
        itme_obj.block_width = 18
        itme_obj.block_height = 12
        itme_obj.num_question = parseInt(ulLen)
        itme_obj.num_of_option = parseInt(len)
        itme_obj.region_rect_x = studentRegionRect.region_rect_x
        itme_obj.region_rect_y = studentRegionRect.region_rect_y
        itme_obj.region_rect_width = studentRegionRect.region_rect_width
        itme_obj.region_rect_height = studentRegionRect.region_rect_height
        itme_obj.question = []
        for(var i = 1;i<=ulLen;i++){
            var a = {}
            a.no = i
            a.option = []
            itme_obj.question.push(a)
            for(var j = 1;j<=len;j++){
                var b = {}
                b.no = j
                b.option_point_x = parseInt(fristPost[i-1].left+9-dot.left)
                b.option_point_y = parseInt(fristPost[i-1].top+6+(12+9)*(j-1)-dot.top)
                itme_obj.question[i-1].option.push(b)
            }
        }
        return itme_obj
    }
    function getItemPost(index) {//第一个选项坐标
        var fristPost = []
        var dom = $(".conten").find("table").eq(index).find(".q_c")
        dom.each(function (i) {
            fristPost.push($(this).find("b").eq(0).offset())
        })
        return fristPost
    }

    function regionRect(index) {//获取题组区域坐标和高度
        var regionRect = {}
        var dot = $(".position_TL span").eq(1).offset();
        dot.left = dot.left + 15, dot.top = dot.top + 15//定标点
        var dom = $(".conten").find("table").eq(index).offset()
        regionRect.region_rect_x = parseInt(dom.left - dot.left)
        regionRect.region_rect_y = parseInt(dom.top - dot.top)
        regionRect.region_rect_height = $(".conten").find("table").eq(index).height()
        return regionRect
    }
    function fillScoreRect(index) {//获得填空题打分区域坐标
        var scoreRect = {}
        var dot = $(".position_TL span").eq(1).offset();
        dot.left = dot.left + 15, dot.top = dot.top + 15//定标点
        var dom = $(".conten").find("table").eq(index).find("thead").find("tr").eq(1).offset()
        scoreRect.score_rect_width = 698
        scoreRect.score_rect_height = 40
        scoreRect.score_rect_x = parseInt(dom.left-dot.left)
        scoreRect.score_rect_y = parseInt(dom.top-dot.top)
        return scoreRect
    }
    function getFillPost(index) {//获得填空题小题坐标
        var fillItemPost = []
        var dot = $(".position_TL span").eq(1).offset();
        dot.left = dot.left + 15, dot.top = dot.top + 15//定标点
        var dom = $(".conten").find("table").eq(index).find(".q_c")
        dom.each(function () {
            fillItemPost.push($(this).find("a").eq(0).offset())
        })
        return fillItemPost
    }
    function fillScoreOptions(index) {//获得17个打分框坐标
        var fillScoreOptions = []
        var makrin = []
        var dot = $(".position_TL span").eq(1).offset();
        dot.left = dot.left + 15, dot.top = dot.top + 15//定标点
        var dom = $(".conten").find("table").eq(index).find("thead").find("tr").eq(1).find("a")
        dom.each(function () {
            fillScoreOptions.push($(this).offset())
        })
        for(var i = 1 ;i<=fillScoreOptions.length;i++){
            var obj = {}
            obj.no = i
            obj.option_point_x = parseInt(fillScoreOptions[i-1].left+12-dot.left)
            obj.option_point_y = parseInt(fillScoreOptions[i-1].top+7-dot.top)
            makrin.push(obj)
        }
        return makrin
    }

    /**
     * @param qNumer  小题个数
     * @param answerNumber 小题选项个数
     * @param Answerindex  $scope.listObj的索引
     * @param answerModeType 题目类型
     * @returns {Array}
     */
    function getQuestion(qNumer, answerNumber, Answerindex,answerModeType) {//获取每个小题目
        var question = []
        var qNumer = parseInt(qNumer)
        var answerNumber = parseInt(answerNumber)//选项个数
        var dot = $(".position_TL span").eq(1).offset();
        dot.left = dot.left + 15, dot.top = dot.top + 15//定标点
        var item_w = 16, itemMarginLeft = 14;
        for (var i = 1; i <= qNumer; i++) {//循环每个小题
            var itme_obj = {}
            itme_obj.no = i
            itme_obj.answer_setting_id = answer_id[Answerindex].answers.settings[i - 1].setting_id//小题id
            itme_obj.option = []
            question.push(itme_obj)
        }
        for (var i = 0; i < question.length; i++) {
            for (var j = 1; j <= answerNumber; j++) {
                var itme_obj = {}
                itme_obj.no = j//小题序号
                if(answerModeType==1||answerModeType==2||answerModeType==6){//单选题/多选题/判断题
                    itme_obj.option_point_x = parseInt(getItemPost(Answerindex)[i].left + 8 + (item_w + itemMarginLeft) * (j-1) - dot.left)//选项框中心点x坐标
                    itme_obj.option_point_y = parseInt(getItemPost(Answerindex)[i].top + 6 - dot.top)//同行option_point_y都是一样的 选项框中心点y坐标
                }else{
                    itme_obj.option_point_x = parseInt(getFillPost(Answerindex)[i].left+12-dot.left)
                    itme_obj.option_point_y = parseInt(getFillPost(Answerindex)[i].top+7-dot.top)
                }
                question[i].option.push(itme_obj)
            }
        }
        return question
    }
    function answerModeType(type) {//题目类型
        var answerModeType;
        if(type==1){//单选题
            answerModeType = 0
        }
        if(type==6){//多选题
            answerModeType = 1
        }
        if(type==2){//是非题
            answerModeType = 2
        }
        if(type==3){//分数框-填空题
            answerModeType = 5
        }
        if(type==4||type==5){//分数框（解答题写作题,其他题）
            answerModeType = 4
        }
        return answerModeType
    }
    function getBigQuestion(obj) {//获取大题
        var BigQuestion = []
        for (var i = 1; i <= obj.length; i++) { //标题有问题,最后一个选题只存了一个选项,16个打分框及坐标不对
            var itme_obj = {}
            itme_obj.no = i//大题编号
            itme_obj.score = obj[i - 1].totalCores//答题总分
            itme_obj.string = answer_id[i - 1].answers.answer_name//大题标题
            itme_obj.answer_id = answer_id[i - 1].answers.answer_id//题组ID
            itme_obj.answer_mode = answerModeType(obj[i - 1].type)//题目类型
            itme_obj.current_page = 1//当前页面
            itme_obj.num_question = parseInt(obj[i - 1].numbel)//题目数量
            itme_obj.region_rect_x = regionRect(i - 1).region_rect_x//题组区域的X坐标
            itme_obj.region_rect_y = regionRect(i - 1).region_rect_y//题组区域的Y坐标
            itme_obj.region_rect_width = 698//题组区域的宽度
            itme_obj.region_rect_height = regionRect(i - 1).region_rect_height//题组区域的高度
            itme_obj.question = []
            if(obj[i - 1].type==1||obj[i - 1].type==6||obj[i - 1].type==2){//单选题/多选题/判断题
                itme_obj.block_width = 16//选项宽度
                itme_obj.block_height = 13//选项高度
                itme_obj.answer_count = 1//答案个数
                itme_obj.num_of_option = parseInt(obj[i - 1].itemNumber)//选项个数
            }else{//填空题
                itme_obj.block_width = 25//选项宽度
                itme_obj.block_height = 14//选项高度
                itme_obj.score_rect_x = fillScoreRect(i - 1).score_rect_x//打分框区域的x坐标
                itme_obj.score_rect_y = fillScoreRect(i - 1).score_rect_y//打分框区域的y坐标
                itme_obj.score_rect_width = fillScoreRect(i - 1).score_rect_width//打分框区域的宽度
                itme_obj.score_rect_height = fillScoreRect(i - 1).score_rect_height//打分框区域的高度
                itme_obj.score_options = fillScoreOptions(i-1)
            }
            BigQuestion.push(itme_obj)
        }
        for (var i = 0; i < BigQuestion.length; i++) {
            BigQuestion[i].question = getQuestion(obj[i].numbel, obj[i].itemNumber,i,obj[i].type)
        }
        BigQuestion.push(getStudentInfo())//添加考生信息
        return BigQuestion
    }

    function getPostDot() {//获取四个大点左边位置
        var anchor = {}
        var relativePost = $(".A_R").offset()
        var dot1 = $(".position_TL span").eq(1).offset();
        var dot2 = $(".position_TR span").eq(1).offset();
        var dot3 = $(".position_BL span").eq(1).offset();
        var dot4 = $(".position_BR span").eq(1).offset();
        anchor.LeftTopX = parseInt(dot1.left + 15 -relativePost.left)
        anchor.LeftTopY = parseInt(dot1.top + 15 - relativePost.top)
        anchor.RightTopX = parseInt(dot2.left + 15 - relativePost.left)
        anchor.RightTopY = parseInt(dot2.top + 15- relativePost.top)
        anchor.LeftBottomX = parseInt(dot3.left + 15 - relativePost.left)
        anchor.LeftBottomY = parseInt(dot3.top + 15 - relativePost.top)
        anchor.RightBottomX = parseInt(dot4.left + 15 - relativePost.left)
        anchor.RightBottomY = parseInt(dot4.top + 15 - relativePost.top)
        return anchor
    }
    function allPagePost() {//获取页面所有坐标点
        var allPagePost = []
        var allList;
        if($scope.listObj2.length>0){
            allList = $scope.listObj.concat($scope.listObj2)
            allPagePost = getBigQuestion(allList)
        }else {
            allPagePost = getBigQuestion($scope.listObj)
        }
        return allPagePost
    }
    $scope.save = function () {//保存模板
        var isLogin = localStorage.getItem("token");
        console.log(JSON.stringify(allPagePost()))
        // $.ajax({
        //         type: "POST",
        //         url: ajaxIp + "/api/v2/answer_regions",
        //         headers: {'Authorization': "Bearer " + isLogin},
        //         data: {
        //             'answer_region[exam_subject_id]': getUrlParam(url, 'examubjeId'),//科目ID
        //             'answer_region[anchor]': JSON.stringify(getPostDot()),//四个锚点
        //             'answer_region[region_info]': JSON.stringify(getBigQuestion($scope.listObj)),//所有坐标信息
        //             'answer_region[basic_info_region]':''//保存的题目内容
        //         },
        //         dataType: "JSON",
        //         success: function (data) {
        //         }
        //     }
        // )


    }
    $scope.dayin = function () {//打印
        $(".A_Nav").css({"display": "none"})
        $(".Answer .A_L").css({"display": "none"})
        $(".Answer .A_B").css({"margin-top": 0, "margin-bottom": 0, "width": 1596})
        $(".Answer .A_R").css({"border-width": 0})
        $(".Answer .A_R .A_Rone").css({"border-color": "black"})
        window.print()
        $(".A_Nav").css({"display": "block"})
        $(".Answer .A_L").css({"display": "block"})
        $(".Answer .A_B").css({"margin-top": 52, "margin-bottom": 52, "width": 1882})
        $(".Answer .A_R").css({"border-width": 4})
        $(".Answer .A_R .A_Rone").css({"border-color": "#ddd"})
        // return false;
    }
})


