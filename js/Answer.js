var m1 = angular.module("pro",[]);
// m1.config(function ($httpProvider) {
//     $httpProvider.defaults.useXDomain = true;
//     delete $httpProvider.defaults.headers.common['X-Requested-With'];
// })
//设置控制器
m1.controller("demo", function ($scope, $timeout, $http) {
    var url = window.location;
    var isLogin = localStorage.getItem("token");
    $scope.subjectName = window.localStorage.getItem("test_name") + window.localStorage.getItem("subjectname")
    $(".Answer .A_Nav").width($(document).width())
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
    $scope.leftcardNum = [0,1,2,3,4]
    $scope.countScore = 0//总分
    $scope.infoLocation = 0//信息栏默认顶部
    $scope.infoBox = 0//信息框默认顶部
    $scope.page_num = 0 //页数
    $scope.listObj = [];//定义全局数组保存所有题目
    $scope.listObj2 = [];//定义全局数组保存所有题目
    $scope.listObj3 = [];
    $scope.listObj4 = [];
    $scope.candNumber = [0, 1, 2, 3, 4, 5, 6, 7], $scope.candlen = $scope.candNumber.length
    $scope.paperType = 1;//阅卷方式/0代表手工1代表网络默认0
    $scope.myPaper = ['手工阅卷', '网络阅卷'];
    $scope.myDayinType = 0
    $scope.myDayin = ['单面打印', '双面打印'];
    $scope.showItmeScoreType = 0
    $scope.showItmeScore = ['隐藏分数', '显示分数'];
    $scope.showTableLineTyep = 0
    $scope.showTableLine = ['有边框', '无边框'];
    $scope.discernType= 0
    $scope.discernList = ['识别考号', '识别条码'];
    $scope.examType= 0
    $scope.examList = ['普通考试', '特殊考试'];
    $scope.barInfo = {
        region_rect_x:0,
        region_rect_y:0,
        region_rect_width:0,
        region_rect_height:0,
        answer_mode : 6,
        current_page : 1,
        no : 0,
        score : 0,
        string : "条形码学号",
        block_width : 0,
        block_height : 0,
        num_question : 0,
        num_of_option : 0 
    }
    $scope.result = {};//弹出框保存
    var modelParam = []//存储请求参数
    var answer_id = []//大题answer_id
    var allHeight = [] //页面上所有table高度
    $scope.getAnswer = function () {//获取题目模板
        var isLogin = localStorage.getItem("token");
        $.ajax({
            type: "GET",
            url: "/api/v2/answer_regions/basic_info_region",
            headers: {'Authorization': "Bearer " + isLogin},
            data: {'exam_subject_id': getUrlParam(url, 'examubjeId')},
            async: false,
            success: function (data) {
                console.log(data)
                if (data.code == 200) {
                    $scope.listObj = data.message.page1 ? data.message.page1 : []
                    $scope.listObj2 = data.message.page2 ? data.message.page2 : []
                    $scope.listObj3 = data.message.page3 ? data.message.page3 : []
                    $scope.listObj4 = data.message.page4 ? data.message.page4 : []
                    $scope.listObj5 = data.message.page5 ? data.message.page5 : []
                    answer_id = data.message.answer_id
                    allHeight = data.message.allHeight ? data.message.allHeight : []
                    $scope.paperType = data.message.paperType ? data.message.paperType : 0
                    $scope.infoLocation = data.message.infoLocation ? data.message.infoLocation : 0
                    $scope.infoBox = data.message.infoBox ? data.message.infoBox : 0
                    $scope.discernType = data.message.discernType ? data.message.discernType : 0
                    $scope.examType = data.message.examType ? data.message.examType : 0
                    $scope.barInfo = data.message.barInfo ? data.message.barInfo : {}
                    $scope.leftcardNum = data.message.leftcardNum ? data.message.leftcardNum : 0
                    $scope.showTableLineTyep = data.message.showTableLineTyep ? data.message.showTableLineTyep : 0
                    $scope.myDayinType = data.message.myDayinType ? data.message.myDayinType : 0
                    $scope.showItmeScoreType = data.message.showItmeScoreType ? data.message.showItmeScoreType : 0
                    $scope.countScore = data.message.countScore ? data.message.countScore : 0
                    $scope.candNumber = data.message.candNumber ? data.message.candNumber : [0, 1, 2, 3, 4, 5, 6, 7]
                    $scope.candlen = $scope.candNumber.length
                }
            },
            error: function () {
                $scope.paperType = 0
            }
        });
    }
    $scope.getAnswer()
    //点击显示
    $scope.add = function (index) {
        if (index == 4) {
            $("#menu").css({"display": "none"})
        }
        $scope.index = index
        clear()
        $scope.result.isradio = 1//单选题、多选题
        $scope.result.otherisradio = 3//单选题、多选题
        $scope.result.writIsradio = 1//作文题
    };
    $scope.checkbox = function (index) {//切换单选多选
        $scope.result.isradio = index
        $scope.result.otherisradio = index
    }
    $scope.checkWrit = function (index) {
        $scope.result.writIsradio = index//作文题
    }
    //阅卷模式切换
    $scope.checkTestType = function (type) {
        if (type == 0) {//阅卷
            if ($scope.paperType == 0) {
                $scope.paperType = 1
            } else {
                $scope.paperType = 0
            }
        }
        if (type == 1) {//打印
            if ($scope.myDayinType == 0) {
                $scope.myDayinType = 1
            } else {
                $scope.myDayinType = 0
            }
        }
        if (type == 2) {
            if ($scope.showItmeScoreType == 0) {
                $scope.showItmeScoreType = 1
            } else {
                $scope.showItmeScoreType = 0
            }
        }
        if (type == 3) {
            if ($scope.showTableLineTyep == 0) {
                $scope.showTableLineTyep = 1
            } else {
                $scope.showTableLineTyep = 0
            }
        }
        if (type == 4) {
            if ($scope.discernType == 0) {
                $scope.discernType = 1
            } else {
                $scope.discernType = 0
            }
        }
        if (type == 5) {
            if ($scope.examType == 0) {
                $scope.examType = 1
            } else {
                $scope.examType = 0
            }
        }
    }
    $scope.Q_number = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十']
    var isLine = function (page_num) {//是否换行
        var outerBox = $(".A_Rone").outerHeight()//最外层距离
        var result;
        if ($(".A_Rone").eq(page_num).find("table:last").position()) {//不是第一次插入
            var lastTabPosi = $(".A_Rone").eq(page_num).find("table:last").position().top + $(".A_Rone").eq(page_num).find("table:last").height() + 30//已经占用高度
            var remain = outerBox - lastTabPosi
            var title_h = 40, padding = 0
            if ($scope.index == 1 || $scope.index == 2) {//选择题、判断题
                var rowItme_h = 27;//每行的高度
                if ($scope.result.thr <= 4) {//判断几个为一行
                    var row_h = 4
                } else if ($scope.result.thr > 4 && $scope.result.thr <= 11) {
                    var row_h = 2
                } else {
                    var row_h = 1
                }
                var row = Math.ceil($scope.result.numbel / row_h)
                result = remain - title_h - padding - row * rowItme_h > 0 ? true : false
            }
            if ($scope.index == 3) {//填空题
                var rowItme_h = 35, score_h = $scope.paperType == 0?40:20
                var row = Math.ceil($scope.result.numbel / 2)
                console.log(remain - title_h - padding - score_h - row * rowItme_h)
                result = remain - title_h - padding - score_h - row * rowItme_h > 0 ? true : false
            }
            if ($scope.index == 4) {//作文题
                var rowItme_h = 35, score_h = $scope.paperType == 0?40:20;
                /*语文试卷*/
                if ($scope.result.writIsradio == 1) {
                    var row = Math.ceil($scope.result.plaid / 21)
                    rowItme_h = 29
                    result = remain - title_h - padding - score_h - row * rowItme_h > 0 ? true : false
                    console.log('remain'+remain,'title_h'+title_h,'padding'+padding,'score_h'+score_h,'zonggong'+row * rowItme_h)
                } else if ($scope.result.writIsradio == 2) {
                    var row = parseInt($scope.result.enLine)
                    result = remain - title_h - padding - score_h - row * rowItme_h > 0 ? true : false
                } else {
                    var row = Math.ceil($scope.result.word / 8)
                    result = remain - title_h - padding - score_h - row * rowItme_h > 0 ? true : false
                    console.log(result + '111')
                }
            }
            if ($scope.index == 5) {//其他题
                if($scope.result.otherisradio==3){
                    var rowItme_h = 164;
                    var row = $scope.result.numbel
                    result = remain - title_h - padding - row * rowItme_h > 0 ? true : false
                }
                if($scope.result.otherisradio==4){
                    var rowItme_h = 20;
                    var row = $scope.result.numbel
                    result = remain  - row * rowItme_h > 0 ? true : false
                }
            }
        } else {//第一次添加
            return true
        }
        return result
    }
    var isNumber = function (value, index) {
        var tips = [
            "试题数量请输入整数",
            "起始序号请输入整数",
            "每题分值请输入整数",
            "请输入1-20之间的整数",
            "所在页码请输入整数",
            "作文总分请输入整数",
            "作文格数请输入整数",
            "格子行数请输入整数",
            "单词个数请输入整数",
        ]
        var patrn = /^(-)?\d+(\.\d+)?$/;
        if (patrn.exec(value) == null || value == "") {
            alert(tips[index])
            return false
        } else {
            return true
        }
    }
    var checkIsNumbers = function () {//检查是否为数字
        var inputInt = [
            {"type": $scope.result.numbel, "index": 0},
            {"type": $scope.result.no, "index": 1},
            {"type": $scope.result.itemcoreS, "index": 2},
            {"type": $scope.result.thr, "index": 3},
            {"type": $scope.result.page, "index": 4},
            {"type": $scope.result.writscore, "index": 5},
            {"type": $scope.result.plaid, "index": 6},
            {"type": $scope.result.enLine, "index": 7},
            {"type": $scope.result.word, "index": 8}
        ]
        var result = true
        var trimUndefined = []
        for (var i = 0; i < inputInt.length; i++) {
            if (typeof inputInt[i].type != 'undefined' && inputInt[i].type != '') {//去除undefined和为空的值
                trimUndefined.push(inputInt[i])
            }
        }
        for (var i = 0; i < trimUndefined.length; i++) {
            if (!isNumber(trimUndefined[i].type, trimUndefined[i].index)) {
                result = false
            }
        }
        return result
    }
    var checkIsNUll = function () {//判断是否为空
        var result = true
        var tips = [
            "题组名称不能为空",
            "试题数量不能为空",
            "起始序号不能为空",
            "每题分值不能为空",
            "选项个数不能为空",
            "所在页码不能为空",
            "作文总分不能为空",
            "作文格数不能为空",
            "格子行数不能为空",
            "单词个数不能为空",
            "横线数量不能为空",
        ]
        var checkIsEmpty = function (array) {//检测是否为空
            for (var i = 0; i < array.length; i++) {
                if (array[i].type == '') {
                    alert(tips[array[i].index])
                    result = false
                }
            }
        }
        if ($scope.index == 1) {
            var input = [
                {"type": $scope.result.name, "index": 0},//题组名称
                {"type": $scope.result.numbel, "index": 1},//试题数量
                {"type": $scope.result.no, "index": 2},//起始序号
                {"type": $scope.result.itemcoreS, "index": 3},//每题分值
                {"type": $scope.result.thr, "index": 4}//选项个数
            ]
            checkIsEmpty(input)
        }
        if ($scope.index == 2 || $scope.index == 3 || $scope.index == 5) {
            var input = [
                {"type": $scope.result.name, "index": 0},//题组名称
                {"type": $scope.result.numbel||$scope.result.Linenumbel, "index": 1},//试题数量
                {"type": $scope.result.no, "index": 2},//起始序号
                {"type": $scope.result.itemcoreS, "index": 3},//每题分值
                {"type": $scope.result.page, "index": 5}//所在页码
            ]
            checkIsEmpty(input)
        }
        if ($scope.index == 4) {
            var input = [
                {"type": $scope.result.name, "index": 0},//题组名称
                {"type": $scope.result.no, "index": 2},//起始序号
                {"type": $scope.result.page, "index": 5},//所在页码
                {"type": $scope.result.writscore, "index": 6},//作文总分
            ]
            if ($scope.result.writIsradio == 1) {
                input.push({"type": $scope.result.plaid, "index": 7})
            }
            if ($scope.result.writIsradio == 2) {
                input.push({"type": $scope.result.enLine, "index": 8})
            }
            if ($scope.result.writIsradio == 3) {
                input.push({"type": $scope.result.word, "index": 9})
            }
            checkIsEmpty(input)
        }
        return result
    }

    /**
     * 计算总分
     * @param itmeScore
     */
    var count = function (itmeScore) {
        $scope.countScore += itmeScore
    }
    $scope.append = function (obj) {//push数据
        if (isLine(0) && $scope.listObj2.length==0) {
            obj.current_page = 1
            $scope.listObj.push(obj);
        } else if (isLine(1) && $scope.listObj3.length==0) {
            obj.current_page = 1
            $scope.listObj2.push(obj);
        } else if ($scope.result.writIsradio==4||isLine(2) && $scope.listObj4.length==0) {
            console.log(obj)
            obj.current_page = 2
            console.log($scope.result.writIsradio)
            if($scope.result.writIsradio==4){
                console.log(111)
                obj.row = writLine(2)
                var rows = []
                for(var i = 0;i<writLine(2);i++){
                    rows.push(i)
                }
                obj.writIsradio = 4
                obj.articleType = 1
                obj.rows = rows
            }
            $scope.listObj3.push(obj);
            console.log($scope.listObj3)
        } else if (isLine(3)) {
            obj.current_page = 2
            $scope.listObj4.push(obj);
        }
    }
    var writLine = function (page_num) {//作文换行
        var outerBox = $(".A_Rone").outerHeight()//最外层距离
        var lastTabPosi = $(".A_Rone").eq(page_num).find("table:last").position()==undefined?0:$(".A_Rone").eq(page_num).find("table:last").position().top + $(".A_Rone").eq(page_num).find("table:last").height() + 30//已经占用高度
        var remain = outerBox - lastTabPosi
        var rowItme_h = 29,score_h = $scope.paperType == 0?40:20;
        var padding = $(".A_Rone").eq(page_num).find("table:last").position()==undefined?60:0
        var rows = Math.floor((remain - 40  - score_h-padding)/rowItme_h)
        $scope.listObj5 = []
        $scope.listObj5.push({
            plaids:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
            rows:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
            type:4,
            totalCores:10,
            itemCoresArr:['0'],
            articleType:1
        })
        return rows
    }
    $scope.createAsswer = function (data) {//添加题组
        var data = data
        var isLogin = localStorage.getItem("token");
        if (data.isradio == 2) {
            data.type = 6
        }
        var Q_type = ['单选题', '是非题', '填空题', '作文题', '其他题', '多选题']
        var param = {}
        param.answer = {}
        param.answer_settings = {}
        param.answer_settings.count = data.type == 4 ? 1 : data.numbel//试题数量 panduan
        param.answer_settings.num = data.startNo//起始序号
        param.answer_settings.score = data.type == 4 ? data.totalCores : data.itemCores//每题分值 panduan
        param.answer_settings.type_count = data.itemNumber//选项个数 panduan

        if (data.type == 4) {
            param.answer_settings.template_format = data.articleType//作文模版格式 panduan
            param.answer_settings.lattice_columns = data.row//格子列数 panduan
            param.answer_settings.lattice_total = data.plaid//格子总数 panduan
        }

        param.answer.exam_subject_id = getUrlParam(url, 'examubjeId')//考试科目id
        param.answer.item = Q_type[data.type - 1]//试题类型
        param.answer.name = data.name//题组名称

        modelParam.push(param)
        window.localStorage.setItem(getUrlParam(url, 'examubjeId'), JSON.stringify(modelParam))
        console.log(modelParam)
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
        var totaltwo = parseInt($scope.result.numbel) * Number($scope.result.itemcoreS)//总分数
        var otherHeight = []
        var fillWidth = []
        var childWidth = [230]
        var separator = []
        var childseparator = ['']
        var fillsNum = []
        var childNum = [0]
        var img = []
        for (var i = 0; i < parseInt($scope.result.numbel); i++) {//多少个小题
            noarray.push(i + parseInt($scope.result.no));
            if($scope.index==5){
                var obj = {}
                otherHeight.push(150)//其他题默认150px
                img.push(obj)
            }
            if($scope.index==3){
                fillWidth.push(childWidth)
                separator.push(childseparator)
                fillsNum.push(childNum)
            }
        }
        if ($scope.index == 2) {
            var itemNumber = 2
        } else if ($scope.index == 3 || $scope.index == 4 || $scope.index == 5) {
            var itemNumber = 1
        } else {
            var itemNumber = $scope.result.thr
        }
        if ($scope.result.writIsradio == 1) {
            var row = Math.ceil($scope.result.plaid / 21)
        }
        if ($scope.result.writIsradio == 2) {
            var row = $scope.result.enLine
        }
        if ($scope.result.writIsradio == 3) {
            var row = $scope.result.word
        }
        var rosItem = []
        for (var i = 0; i < row; i++) {
            rosItem.push(i)
        }
        if($scope.result.otherisradio==4){
            var Linenumbel  =[]
            for (var i = 0; i < $scope.result.Linenumbel; i++) {
                Linenumbel.push(i)
            }
        }
        if($scope.index==3){
            var verticalHeigth = 30
        }
        if($scope.index==4){
            var verticalHeigth = 35
        }
        if($scope.index==5){
            var verticalHeigth = 20
        }
        obj = {
            name: $scope.result.name,//题组名称
            numbel: $scope.index == 4 ||$scope.result.otherisradio==4 ? 1 : parseInt($scope.result.numbel),//试题数量
            isradio: $scope.result.isradio,//单选多选
            startNo: parseInt($scope.result.no),//起始序号
            // currentPage: $scope.result.page == undefined ? 1 : $scope.result.page,//所在页码
            no: noarray,//序号数组,
            itemNumber: itemNumber,//选项个数
            totalCores: $scope.index == 4 ? parseInt($scope.result.writscore) : totaltwo,//总分
            itemCores: Number($scope.result.itemcoreS),//每小题分
            thr: $scope.index == 1 ? $scope.nubarray : ['T', 'F'], //选项ABCD(选择题和判断题)
            type: $scope.result.isradio == 2 ? 6 : $scope.index,//题目类型
            otherHeight:otherHeight,//其他题高度
            fillWidth:fillWidth,//填空题宽度
            fillsNum:fillsNum,//填空题横线个数
            separator:separator,//填空题分隔符
            verticalHeigth:verticalHeigth,//题组行间距
            LineType:0,//线类型0代表实线非0虚线
            hideLineType:0,//线类型0代表显示非1隐藏
            Linenumbel:Linenumbel,//横线类数量
            img:img
        }
        var itemCoresArr = []//每题分数数组
        for (var i = 0; i < obj.numbel; i++) {
            itemCoresArr.push(obj.itemCores)
        }
        obj.itemCoresArr = $scope.result.otherisradio==4?[]:itemCoresArr
        if ($scope.index == 4) {
            obj.articleType = $scope.result.writIsradio
            obj.rows = rosItem
            obj.plaids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]//21长度
            obj.row = row
            obj.plaid = $scope.result.plaid
            obj.no = [$scope.result.no]
            obj.itemCoresArr = [$scope.result.writscore]
        }
        if($scope.index==5){
            obj.otherisradio = $scope.result.otherisradio
        }
        if (!checkIsNUll()) {
            return false
        }
        if (!checkIsNumbers()) {
            return false
        }
        $scope.append(obj)
        count(obj.totalCores)
        $scope.createAsswer(obj)
        clear()
        close()
        // $scope.listObj4.push(obj)
    };
    $scope.setItmeWidth = function (itemNumber) {
        $scope.setWidth
        if (itemNumber.length <= 4) {
            $scope.setWidth = 25 + '%'
        } else if (itemNumber.length > 4 && itemNumber.length <= 11) {
            $scope.setWidth = 50 + '%'
        } else {
            $scope.setWidth = 100 + '%'
        }
        return $scope.setWidth
    }
    $scope.setImgStyle = function (obj) {
        var ImgStyle = {
            "top":obj.top+'px',
            "left":obj.left+'px',
            "width":obj.width+'px',
            "height":obj.height+'px',
        }
        return ImgStyle
    }
    //关闭
    var close = function () {
        clear();
        $scope.index = -1
    }
    $scope.close = close
    //清空选择题的内容
    var clear = function () {
        $scope.result = {
            name: '', numbel: '', isradio: '',otherisradio:'',
            no: '', one: '', two: '', thr: '',
        };
    };
    
    function getStudentInfo() {//获取学号学生信息
        var itme_obj = {}
        var studentRegionRect = {}//学号区域信息
        var dot = $(".position_TL span").eq(1).offset();
        dot.left = dot.left + 15, dot.top = dot.top + 15//定标点
        var studentInfo = $scope.infoBox == 0?$(".student_L"):$(".candidate")
        studentRegionRect.region_rect_x = parseInt(studentInfo.offset().left - dot.left)
        studentRegionRect.region_rect_y = parseInt(studentInfo.offset().top - dot.top)
        studentRegionRect.region_rect_width = studentInfo.width()
        studentRegionRect.region_rect_height = studentInfo.height()
        var ulP = $scope.infoBox == 0?$(".student_number3"):$(".full_card_number")
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
        itme_obj.block_width = $scope.infoBox == 0?18:16
        itme_obj.block_height = 12
        itme_obj.num_question = parseInt(ulLen)
        itme_obj.num_of_option = parseInt(len)
        itme_obj.region_rect_x = studentRegionRect.region_rect_x - 10
        itme_obj.region_rect_y = 10
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
                b.option_point_x = parseInt(fristPost[i - 1].left + 9 - dot.left)
                b.option_point_y = parseInt(fristPost[i - 1].top + 6 + (12 + 9) * (j - 1) - dot.top)
                itme_obj.question[i - 1].option.push(b)
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
        scoreRect.score_rect_height = 20
        scoreRect.score_rect_x = parseInt(dom.left - dot.left)
        scoreRect.score_rect_y = parseInt(dom.top - dot.top)
        return scoreRect
    }

    function otherFillScoreRect(index, current_page) {//获得其他题打分区域坐标
        var otherScoreRect = []
        var otherListDom = []
        var dot = $(".position_TL span").eq(1).offset();
        dot.left = dot.left + 15, dot.top = dot.top + 15//定标点
        var dom = $(".conten").find("table").eq(index).find("tbody").find(".other").find(".other_h")
        dom.each(function () {
            otherListDom.push($(this).offset())
        })
        for (var i = 1; i <= dom.length; i++) {
            var scoreRect = {}
            scoreRect.no = i
            scoreRect.score_rect_x = otherListDom[i - 1].left - dot.left
            scoreRect.score_rect_y = otherListDom[i - 1].top - dot.top - 1200 * (current_page - 1)
            otherScoreRect.push(scoreRect)
        }
        return otherScoreRect
    }
    function otherFillScoreHeight(index, current_page) {//获得其他题每个小题高度
        var otherListDom = []
        var dom = $(".conten").find("table").eq(index).find("tbody").find(".other").find(".other_c")
        dom.each(function () {
            otherListDom.push($(this).height())
        })
        return otherListDom
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

    function fillScoreOptions(index, type, current_page) {//获得17个打分框坐标
        var fillScoreOptions = []
        var makrin = []
        var dot = $(".position_TL span").eq(1).offset();
        dot.left = dot.left + 15, dot.top = dot.top + 15//定标点
        if (type == 5) {//其他题打分框坐标
            var dom = $(".conten").find("table").eq(index).find("tbody").find(".other").find("a")
        } else {//填空题坐标
            var dom = $(".conten").find("table").eq(index).find("thead").find("tr").eq(1).find("a")
        }
        dom.each(function () {
            fillScoreOptions.push($(this).offset())
        })
        for (var i = 1; i <= fillScoreOptions.length; i++) {
            var obj = {}
            obj.no = i
            obj.option_point_x = fillScoreOptions[i - 1].left + 11.5 - dot.left
            obj.option_point_y = fillScoreOptions[i - 1].top + 6 - dot.top - 1200 * (current_page - 1)
            makrin.push(obj)
        }
        return makrin
    }

    /**
     * @param qNumer  小题个数
     * @param answerNumber 小题选项个数
     * @param Answerindex  $scope.listObj的索引
     * @param answerModeType 题目类型
     * @param itemCores 每小题分数
     * @param current_page 当前页面
     * @param startNo 起始序号
     * @returns {Array}
     */
    function getQuestion(qNumer, answerNumber, Answerindex, answerModeType, itemCores, current_page, startNo) {//获取每个小题目
        var question = []
        var qNumer = parseInt(qNumer)
        var answerNumber = parseInt(answerNumber)//选项个数
        var dot = $(".position_TL span").eq(1).offset();
        dot.left = dot.left + 15, dot.top = dot.top + 15//定标点
        var item_w = 16, itemMarginLeft = 11;
        for (var i = 1; i <= qNumer; i++) {//循环每个小题
            var itme_obj = {}
            itme_obj.no = startNo[i-1].toString()//作文没有起始序号
            itme_obj.one_score = parseInt(itemCores[i - 1])
            itme_obj.answer_setting_id = answer_id[Answerindex].answers.settings[i - 1].setting_id//小题id
            itme_obj.option = []
            if(answerModeType==5){
                itme_obj.region_rect_x = otherFillScoreRect(Answerindex,current_page)[i-1].score_rect_x
                itme_obj.region_rect_y = otherFillScoreRect(Answerindex,current_page)[i-1].score_rect_y - 30
                itme_obj.region_rect_height = otherFillScoreHeight(Answerindex,current_page)[i-1]
                itme_obj.region_rect_width = 698 - 14
                var start = (i-1)*17
                var end = start+17
                itme_obj.score_options = fillScoreOptions(Answerindex,5,current_page).slice(start,end)
            }
            if(answerModeType==4){
                itme_obj.region_rect_x = regionRect(Answerindex).region_rect_x + 8//题组区域的X坐标
                itme_obj.region_rect_y = regionRect(Answerindex).region_rect_y - 1200 * (current_page - 1) + 8//题组区域的Y坐标
                itme_obj.region_rect_height = 100
                itme_obj.region_rect_width = 698 - 14
                itme_obj.score_options = fillScoreOptions(Answerindex, 4, current_page)
            }
            question.push(itme_obj)
        }
        for (var i = 0; i < question.length; i++) {

            for (var j = 1; j <= answerNumber; j++) {
                var itme_obj = {}
                itme_obj.no = j//小题序号
                if (answerModeType == 1 || answerModeType == 2 || answerModeType == 6) {//单选题/多选题/判断题
                    itme_obj.option_point_x = getItemPost(Answerindex)[i].left + 7 + (item_w + itemMarginLeft) * (j - 1) - dot.left//选项框中心点x坐标
                    itme_obj.option_point_y = getItemPost(Answerindex)[i].top + 5.5 - dot.top - 1200 * (current_page - 1)//同行option_point_y都是一样的 选项框中心点y坐标
                } else if (answerModeType == 3) {
                    itme_obj.option_point_x = getFillPost(Answerindex)[i].left + 11.5 - dot.left
                    itme_obj.option_point_y = getFillPost(Answerindex)[i].top + 6 - dot.top - 1200 * (current_page - 1)
                }
                question[i].option.push(itme_obj)
            }
        }
        return question
    }

    function answerModeType(type) {//题目类型
        var answerModeType;
        if (type == 1) {//单选题
            answerModeType = 0
        }
        if (type == 6) {//多选题
            answerModeType = 1
        }
        if (type == 2) {//是非题
            answerModeType = 2
        }
        if (type == 3) {//分数框-填空题
            answerModeType = 5
        }
        if (type == 4 || type == 5) {//分数框（解答题写作题,其他题）
            answerModeType = 4
        }
        return answerModeType
    }

    function getBigQuestion(obj) {//获取大题
        var BigQuestion = []
        for (var i = 1; i <= obj.length; i++) {
            var itme_obj = {}
            itme_obj.no = i//大题编号
            itme_obj.total_score = parseInt(obj[i - 1].totalCores)//答题总分
            itme_obj.string = obj[i - 1].name//大题标题
            itme_obj.answer_id = answer_id[i - 1].answers.answer_id//题组ID
            itme_obj.answer_mode = answerModeType(obj[i - 1].type)//题目类型
            itme_obj.current_page = obj[i - 1].current_page//当前页面
            itme_obj.num_question = obj[i - 1].numbel//题目数量
            if(obj[i - 1].type != 5 || obj[i - 1].type != 4){
                itme_obj.region_rect_x = regionRect(i - 1).region_rect_x + 8//题组区域的X坐标
                itme_obj.region_rect_y = regionRect(i - 1).region_rect_y - 1200 * (itme_obj.current_page - 1) + 8//题组区域的Y坐标
                itme_obj.region_rect_width = 698 - 14//题组区域的宽度
            }
            if (obj[i - 1].type == 4) {//作文题
                // itme_obj.region_rect_height = 100//题组区域的高度
            } else {
                if(obj[i - 1].type != 5){
                    itme_obj.region_rect_height = regionRect(i - 1).region_rect_height - 8//题组区域的高度
                }
            }
            if (obj[i - 1].type == 1 || obj[i - 1].type == 6 || obj[i - 1].type == 2) {//单选题/多选题/判断题
                itme_obj.block_width = 14//选项宽度
                itme_obj.block_height = 11//选项高度
                itme_obj.answer_count = 1//答案个数
                itme_obj.num_of_option = parseInt(obj[i - 1].itemNumber)//选项个数
            } else if (obj[i - 1].type == 3) {//填空题
                itme_obj.block_width = 23//选项宽度
                itme_obj.block_height = 12//选项高度
                itme_obj.score_rect_x = fillScoreRect(i - 1).score_rect_x//打分框区域的x坐标
                itme_obj.score_rect_y = fillScoreRect(i - 1).score_rect_y - 1200 * (itme_obj.current_page - 1)//打分框区域的y坐标
                itme_obj.score_rect_width = fillScoreRect(i - 1).score_rect_width//打分框区域的宽度
                itme_obj.score_rect_height = fillScoreRect(i - 1).score_rect_height//打分框区域的高度
                itme_obj.score_options = fillScoreOptions(i - 1, obj[i - 1].type, obj[i - 1].current_page) //打分框坐标
            } else if (obj[i - 1].type == 5) {//其他题
                itme_obj.block_width = 23//选项宽度
                itme_obj.block_height = 12//选项高度
                // itme_obj.score_rect_options = otherFillScoreRect(i - 1, obj[i - 1].current_page)//打分框区域的x坐标
                itme_obj.score_rect_width = 690//打分框区域的宽度
                itme_obj.score_rect_height = 30//打分框区域的高度
                // itme_obj.score_options = fillScoreOptions(i - 1, obj[i - 1].type, obj[i - 1].current_page)
            } else {//作文题
                itme_obj.block_width = 23//选项宽度
                itme_obj.block_height = 12//选项高度
                itme_obj.score_rect_width = 690//打分框区域的宽度
                itme_obj.score_rect_height = 20//打分框区域的高度
                // itme_obj.score_options = fillScoreOptions(i - 1, obj[i - 1].type, obj[i - 1].current_page)
            }
            BigQuestion.push(itme_obj)
        }
        for (var i = 0; i < BigQuestion.length; i++) {
            if(obj[i].type == 5 || obj[i].type == 4){
                BigQuestion[i].questions = getQuestion(obj[i].numbel, obj[i].itemNumber, i, obj[i].type, obj[i].itemCoresArr, obj[i].current_page, obj[i].no)
            }else{
                BigQuestion[i].question = getQuestion(obj[i].numbel, obj[i].itemNumber, i, obj[i].type, obj[i].itemCoresArr, obj[i].current_page, obj[i].no)
            }
        }

        $scope.discernType == 0 ? BigQuestion.push(getStudentInfo()) : BigQuestion.push($scope.barInfo)  //识别考号/识别条码

        return BigQuestion
    }

    function getPostDot() {//获取四个大点左边位置
        var anchor = {}
        var relativePost = $(".A_R").offset()
        var dot1 = $(".position_TL span").eq(1).offset();
        var dot2 = $(".position_TR span").eq(1).offset();
        var dot3 = $(".position_BL span").eq(1).offset();
        var dot4 = $(".position_BR span").eq(1).offset();
        anchor.LeftTopX = $scope.examType ==0? parseInt(dot1.left + 15 - relativePost.left):0
        anchor.LeftTopY = $scope.examType ==0? parseInt(dot1.top + 15 - relativePost.top):0
        anchor.RightTopX = $scope.examType ==0? parseInt(dot2.left + 15 - relativePost.left):0
        anchor.RightTopY = $scope.examType ==0? parseInt(dot2.top + 15 - relativePost.top):0
        anchor.LeftBottomX = $scope.examType ==0? parseInt(dot3.left + 15 - relativePost.left):0
        anchor.LeftBottomY = $scope.examType ==0? parseInt(dot3.top + 15 - relativePost.top):0
        anchor.RightBottomX = $scope.examType ==0? parseInt(dot4.left + 15 - relativePost.left):0
        anchor.RightBottomY = $scope.examType ==0? parseInt(dot4.top + 15 - relativePost.top):0
        return anchor
    }

    function allPagePost() {//获取页面所有坐标点
        var allList = [];
        if ($scope.listObj4.length > 0) {
            allList = $scope.listObj.concat($scope.listObj2, $scope.listObj3, $scope.listObj4)
            return allList
        }
        if ($scope.listObj3.length > 0) {
            allList = $scope.listObj.concat($scope.listObj2, $scope.listObj3)
            return allList
        }
        if ($scope.listObj2.length > 0) {
            allList = $scope.listObj.concat($scope.listObj2)
            return allList
        }
        if ($scope.listObj.length > 0) {
            allList = $scope.listObj
            return allList
        }
    }


    function allList() {//获取所有题目
        var allList = {}
        allList.page1 = $scope.listObj
        allList.page2 = $scope.listObj2
        allList.page3 = $scope.listObj3
        allList.page4 = $scope.listObj4
        allList.page5 = $scope.listObj5
        allList.answer_id = answer_id
        allList.paperType = $scope.paperType
        allList.infoLocation = $scope.infoLocation
        allList.infoBox = $scope.infoBox
        allList.barInfo = $scope.barInfo
        allList.leftcardNum = $scope.leftcardNum
        allList.showTableLineTyep = $scope.showTableLineTyep
        allList.myDayinType = $scope.myDayinType
        allList.discernType = $scope.discernType
        allList.examType = $scope.examType
        allList.showItmeScoreType = $scope.showItmeScoreType
        allList.countScore = $scope.countScore
        allList.candNumber = $scope.candNumber
        return allList
    }

    //查找在那个全局变量
    function findScopeList(index, options) {
        var len1 = $scope.listObj.length, len2 = $scope.listObj2.length, len3 = $scope.listObj3.length, len4 = $scope.listObj4.length

        function setGroupInfo(obj) {
            if (obj.type == 0) {//修改标题
                obj.list[obj.index].name = obj.name
            }
            if (obj.type == 1) {//增加小题
                var childNum = [0]
                var childWidth = [230]
                var childseparator = ['']
                var a = {}
                obj.list[obj.index].no.push(obj.no)
                obj.list[obj.index].otherHeight.push(150)
                obj.list[obj.index].fillsNum.push(childNum)
                obj.list[obj.index].fillWidth.push(childWidth)
                obj.list[obj.index].separator.push(childseparator)

                obj.list[obj.index].img.push(a)
                obj.list[obj.index].itemCoresArr.push(obj.score)
                obj.list[obj.index].numbel++  //题目数量
                // obj.list[obj.index].itemCores = obj.score  //当前小题分值
                obj.list[obj.index].totalCores = obj.list[obj.index].totalCores + obj.score //当前答题总分
                $scope.countScore = $scope.countScore + obj.score  //总分
                console.log($scope.listObj)
            }
            if (obj.type == 2) {//删除小题
                obj.list[obj.index].numbel--
                obj.list[obj.index].no.pop()
                obj.list[obj.index].otherHeight.pop()
                obj.list[obj.index].fillWidth.pop()
                obj.list[obj.index].separator.pop()
                var delScore = obj.list[obj.index].itemCoresArr.pop()
                obj.list[obj.index].totalCores = obj.list[obj.index].totalCores - delScore
                $scope.countScore = $scope.countScore - delScore
                if(obj.list[obj.index].no.length==0){
                    obj.list.splice(obj.index,1)
                }
            }
            if (obj.type == 3) {//修改分数
                var oldScore = Number(obj.list[obj.index].itemCoresArr[obj.itmeIndex])//最开始的分数
                obj.list[obj.index].itemCoresArr[obj.itmeIndex] = Number(obj.score)
                obj.list[obj.index].totalCores = Number(obj.list[obj.index].totalCores) - oldScore + Number(obj.score)
                $scope.countScore = $scope.countScore - oldScore + Number(obj.score)
            }
            if (obj.type == 4) {//修改标题
                obj.list[obj.index].no[obj.itmeIndex] = obj.title_no
            }
        }

        function setAnswerGrounp(index) {
            var config = {}
            config.name = options.name
            config.title_no = options.title_no
            config.no = options.no
            config.type = options.type
            config.score = options.score
            config.itmeIndex = options.itmeIndex
            if (index <= len1 - 1) {
                config.index = index
                config.list = $scope.listObj
            }
            if (index >= len1 && index < len1 + len2) {
                config.index = index - len1
                config.list = $scope.listObj2
            }
            if (index >= len1 + len2 && index < len1 + len2 + len3) {
                config.index = index - len1 - len2
                config.list = $scope.listObj3
            }
            if (index >= len1 + len2 + len3 && index < len1 + len2 + len3 + len4) {
                config.index = index - len1 - len2 - len3
                config.list = $scope.listObj4
            }
            setGroupInfo(config)
        }

        setAnswerGrounp(index)
    }

    $scope.dayin = function () {//打印
        $("table").removeClass("table_focus")
        $(".student").removeClass("table_focus")
        $("img").removeClass("table_focus")
        $(".candidate").removeClass("table_focus")
        $(".A_Nav").css({"display": "none"})
        $(".cand").hide()
        $("#menu").css({"display": "none"})
        $(".Answer .A_L").css({"display": "none"})
        $(".Answer .A_B").css({"margin-top": 0, "margin-bottom": 0, "width": 1700})
        // $(".Answer .A_R").css({"border-width": 0})
        $(".Answer .A_R .A_Rone").css({"border-color": "black"})
        window.print()
        $(".A_Nav").css({"display": "block"})
        $(".Answer .A_L").css({"display": "block"})
        $(".Answer .A_B").css({"margin-top": 52, "margin-bottom": 52, "width": 1882})
        $(".Answer .A_R").css({"border-width": 4})
        $(".Answer .A_R .A_Rone").css({"border-color": "#ddd"})
        // return false;
    }
    $scope.start = 0, $scope.end = 1
    function getAnswerInfoTask(type) {//获取生成答题卡详情
        var isLogin = localStorage.getItem("token");
        $scope.nub = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        $scope.rightNub = ["T", "F"]
        $.ajax({
            type: "GET",
            url: "/api/v2/answers/" + getUrlParam(url, 'examubjeId'),
            headers: {'Authorization': "Bearer " + isLogin},
            async: false,
            success: function (data) {
                console.log(data)
                $scope.beforeBigAns = data.answers//没有过滤前
                if (type == 0) {
                    $scope.bigAnswer = data.answers.filter(function (ele) {//过滤出选择题是非题
                        return ele.item == '单选题' || ele.item == '是非题' || ele.item == '多选题'
                    })
                } else if (type == 2) {
                    $scope.bigAnswer = data.answers.filter(function (ele) {//过滤出主观题
                        return ele.item == '其他题' || ele.item == '填空题' || ele.item == '作文题'
                    })
                }
                else {
                    $scope.bigAnswer = data.answers
                }
                $scope.answers = $scope.bigAnswer.slice($scope.start, $scope.end)//设置答案弹窗数组
                console.log($scope.answers)
                $scope.AnsLen = $scope.answers.length > 0 ? $scope.answers[0].settings.length : 0
            },
            error: function () {

            }
        });
    }

    $scope.getAnswerInfo = function (type) {
        console.log(type)
        if ($scope.listObj.length <= 0) {
            alert("请添题组")
            return
        }
        if (modelParam.length > 0) {
            var r = confirm("请保存答题卡")
            if (r) {
                $scope.save()
            } else {
                return false
            }
        }
        getAnswerInfoTask(type)
        if (type == 0) {//设置答案
            if ($scope.answers.length == 0) {
                alert("暂无客观题")
                return false
            }
            $('.setAnswer .modal-main').animate({'top': '50%', 'opacity': 1}, 500);
            $('.setAnswer .modal-shadow').animate({'opacity': 0.3}, 500);
            $('.setAnswer').show();
        }
        if (type == 1) {
            var a = $scope.bigAnswer.length > 10 ? 600 : 'auto'
            $(".modal-scroll").height(a)
            $('.setSort .modal-main').animate({'top': '50%', 'opacity': 1}, 500);
            $('.setSort .modal-shadow').animate({'opacity': 0.3}, 500);
            $('.setSort').show();
        }
        if (type == 2) {
            console.log($scope.answers)
            if ($scope.answers.length == 0) {
                alert("暂无主观题")
                return false
            }
            $('.setubjec .modal-main').animate({'top': '50%', 'opacity': 1}, 500);
            $('.setubjec .modal-shadow').animate({'opacity': 0.3}, 500);
            $('.setubjec').show();
        }
    }
    $scope.closeAnswerModel = function () {//关闭窗口
        $('.modal-wrap').hide();
        $('.modal-main').css({"top": 0, "opacity": 0})
        $('.modal-shadow').css({"opacity": 0})
        var isLogin = localStorage.getItem("token");
        $scope.start = 0, $scope.end = 1
        $.ajax({//关闭的时候进行绑定
            type: "POST",
            url: "/api/v2/answer_regions/update_basic_info_region",
            headers: {'Authorization': "Bearer " + isLogin},
            data: {
                'exam_subject_id': getUrlParam(url, 'examubjeId'),
                'basic_info_region': JSON.stringify(allList())
            },
            async: false,
            success: function (data) {

            },
            error: function () {

            }
        });
    }
    $scope.showScore = false
    $scope.checkScore = function () {//切换分数框
        $scope.showScore = !$scope.showScore
    }
    $scope.pageData = function (type) {//翻页
        var len = $scope.bigAnswer.length
        if (type == 1) {//下一页
            if ($scope.end == len) {
                $scope.start = $scope.end - 1
                $scope.end = len
            } else {
                $scope.start++
                $scope.end++
            }
        }
        if (type == 2) {//上一页
            if ($scope.start == 0) {
                $scope.start = 0
                $scope.end = 1
            } else {
                $scope.start--
                $scope.end--
            }
        }
        $scope.answers = $scope.bigAnswer.slice($scope.start, $scope.end)
        $scope.AnsLen = $scope.answers[0].settings.length
    }
    $scope.addAnswer = function () {//新增小题答案
        var len = $scope.answers[0].settings.length
        var obj = {}
        obj.score = 1;
        obj.setting_num = parseInt($scope.answers[0].settings[len - 1].setting_num) + 1
        obj.type_count = parseInt($scope.answers[0].settings[len - 1].type_count)
        obj.answer_setting_page = $scope.answers[0].answer_setting_page
        var resultArr = []
        for (var i = 0; i < obj.type_count; i++) {
            resultArr.push(0)
        }
        obj.setting_result = resultArr.join(',')
        var param = {}
        param["answer_setting[answer_id]"] = $scope.answers[0].answer_id//题组id
        param["answer_setting[result]"] = obj.setting_result //答案选项
        param["answer_setting[num]"] = obj.setting_num//题号
        param["answer_setting[score]"] = obj.score//默认1分
        param["answer_setting[type_count]"] = obj.type_count  //选项个数
        param["answer_setting[sort]"] = obj.setting_num
        param["answer_setting[page]"] = obj.answer_setting_page
        param["answer_setting[exam_subject_id]"] = getUrlParam(url, 'examubjeId')
        $scope.AnsLen++
        var isLogin = localStorage.getItem("token");
        $.ajax({
            type: "POST",
            url: "/api/v2/answer_settings",
            headers: {'Authorization': "Bearer " + isLogin},
            data: param,
            async: false,
            success: function (data) {
                console.log(data)
                obj.setting_id = data.result.id
                obj.type_count = data.result.type_count
                $scope.answers[0].settings.push(obj)
            }
        })
        var options = {}
        options.type = 1
        options.no = obj.setting_num
        options.score = obj.score
        options.itmeIndex = obj.len
        var index;
        for (var i = 0; i < $scope.beforeBigAns.length; i++) {
            if (param["answer_setting[answer_id]"] == $scope.beforeBigAns[i].answer_id) {
                index = i
            }
        }
        answer_id[index].answers.settings.push(obj)
        findScopeList(index, options)
    }
    $scope.deleAnswer = function () {//删除小题
        var isLogin = localStorage.getItem("token");
        $scope.AnsLen--
        var setting_id = $scope.answers[0].settings[$scope.AnsLen].setting_id
        $.ajax({
            type: "POST",
            url: "/api/v2/answer_settings/" + setting_id + "/delete",
            headers: {'Authorization': "Bearer " + isLogin},
            async: false,
            success: function (data) {
                console.log(data)
                $scope.answers[0].settings.splice($scope.AnsLen, 1)
            },
            error: function () {

            }
        });
        var options = {}
        options.type = 2
        options.itmeIndex = $scope.AnsLen
        var index;
        for (var i = 0; i < $scope.beforeBigAns.length; i++) {
            if ($scope.answers[0].answer_id == $scope.beforeBigAns[i].answer_id) {
                index = i
            }
        }
        answer_id[index].answers.settings.pop()
        if(answer_id[index].answers.settings.length==0){
            answer_id.splice(index,1)
        }
        findScopeList(index, options)
    }
    $scope.sortIndex = 0
    $scope.selectBigQuestion = function (index) {//选中题目
        $scope.sortIndex = index
    }
    /**
     * 设置标题
     */
    $scope.setItmeTitle = function (index, name) {
        var answerId = $scope.bigAnswer[index].answer_id
        var options = {}
        options.type = 0
        options.name = name
        $.ajax({
                type: "POST",
                url: "/api/v2/answers/change_name",
                headers: {'Authorization': "Bearer " + isLogin},
                data: {"answer_id": answerId, "name": name},
                success: function (data) {
                    answer_id[index].answers.answer_name = name
                    findScopeList(index, options)
                }
            }
        )
    }
    //比较相邻的table高度大小
    function compare(index, type, page_num) {
        var outerBox = $(".A_Rone").outerHeight()//最外层距离
        var lastTabPosi = $(".A_Rone").eq(page_num).find("table:last").position().top + $(".A_Rone").eq(page_num).find("table:last").height() + 30
        var currenTatbleHeight = $("body").find("table").eq(index).height()
        var nextTatbleHeight = $("body").find("table").eq(index + 1).height()
        var prevTatbleHeight = $("body").find("table").eq(index - 1).height()
        var remain = outerBox - lastTabPosi
        console.log(currenTatbleHeight + 'currenTatbleHeight', prevTatbleHeight + 'prevTatbleHeight', nextTatbleHeight + 'nextTatbleHeight', remain + 'remain', outerBox + 'outerBox', lastTabPosi + 'lastTabPosi', page_num + 'page_num')
        if (type == 0) {//上移动
            var result = remain + prevTatbleHeight - currenTatbleHeight >= 0 ? true : false
        }
        if (type == 1) {//下移动
            var result = remain + nextTatbleHeight - currenTatbleHeight >= 0 ? true : false
        }
        return result

    }

    var allList_1 = allPagePost()
    // 交换数组元素
    var swapItems = function (arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    };

    /**
     * 重新渲染
     * @param allList  页面的page总和
     * @param index    当前移动的index
     */

    function render(allList, index) {
        var len1 = $scope.listObj.length, len2 = $scope.listObj2.length, len3 = $scope.listObj3.length, len4 = $scope.listObj4.length
        $scope.listObj = allList.slice(0, len1)
        $scope.listObj2 = allList.slice(len1, len1 + len2)
        $scope.listObj3 = allList.slice(len1 + len2, len1 + len2 + len3)
        $scope.listObj4 = allList.slice(len1 + len2 + len3, len1 + len2 + len3 + len4)
    }

    // /**
    //  * 获取切割节点
    //  * @param max  最大值
    //  * @param arr  当前数组
    //  * @returns {number} 节点索引
    //  */
    // function getSliceIndex(max, arr) {
    //     var sum = 0, index = 0
    //     for (var i = 0; i < arr.length; i++) {
    //         sum += arr[i]
    //         if (sum >= max) {
    //             index = i
    //             break
    //         } else {
    //             index = arr.length
    //         }
    //     }
    //     return index
    // }
    //
    // /**
    //  * 获取页面所有高度
    //  * @returns {Array}
    //  */
    // function getAllTableHeight() {
    //     var heights = []
    //     $("body").find("table").each(function () {
    //         heights.push($(this).height())
    //     })
    //     return heights
    // }
    //
    // /**
    //  * 获取最后的切割节点
    //  * @returns {Array}///
    //  */
    // function getAllIndex() {
    //     var indexList = []
    //     var allTableHeigh = getAllTableHeight()
    //     console.log(allTableHeigh)
    //     var index = getSliceIndex(525, allTableHeigh)
    //     var allTableHeigh2 = allTableHeigh.slice(index)
    //     var index2 = getSliceIndex(870, allTableHeigh2)
    //     var allTableHeigh3 = allTableHeigh2.slice(index2)
    //     var index3 = getSliceIndex(870, allTableHeigh3)
    //     var allTableHeigh4 = allTableHeigh3.slice(index3)
    //     var index4 = getSliceIndex(870, allTableHeigh4)
    //     // index = allTableHeigh[index-1]>=allTableHeigh2[0]?index:index-1
    //
    //     // index2 = allTableHeigh2[index2-1]>=allTableHeigh3[0]?index2:index2-1
    //
    //     // index3 = allTableHeigh3[index3-1]>=allTableHeigh4[0]?index3:index3-1
    //
    //     indexList = [index, index2, index3, index4]
    //     return indexList
    // }
    //
    // function deleRender(currentIndex) {
    //     allList_1.splice(currentIndex, 1)
    //     var index = getAllIndex()
    //     console.log(index)
    //     $scope.listObj = allList_1.slice(0, index[0])
    //     $scope.listObj2 = allList_1.slice(index[0], index[0] + index[1])
    //     $scope.listObj3 = allList_1.slice(index[0] + index[1], index[0] + index[1] + index[2])
    //     $scope.listObj4 = allList_1.slice(index[0] + index[1] + index[2], index[0] + index[1] + index[2] + index[3])
    // }

    //设置当前排序
    function setAnswerSor() {
        var answer_id_item = $scope.bigAnswer[$scope.sortIndex].answer_id
        var answer_sort = $scope.bigAnswer[$scope.sortIndex].answer_sort//排序sort
        var isLogin = localStorage.getItem("token");
        $.ajax({
            type: "POST",
            url: "/api/v2/answers/change_sort",
            headers: {'Authorization': "Bearer " + isLogin},
            data: {
                'answer_id': answer_id_item,
                'sort': $scope.sortIndex + 1
            },
            async: false,
            success: function (data) {
                console.log(data)
            },
            error: function () {

            }
        });
    }

    // 上移
    $scope.upRecord = function (arr, $index) {
        var len1 = $scope.listObj.length, len2 = $scope.listObj2.length, len3 = $scope.listObj3.length, len4 = $scope.listObj4.length
        var page_frist = 0, page2_frist = len1, page3_frist = len1 + len2, page4_frist = len1 + len2 + len3
        if ($index == 0) {
            return;
        }
        if ($index == page2_frist || $index == page3_frist || $index == page4_frist) {
            if ($index == page2_frist) {
                var page_num = 0
            } else if ($index == page3_frist) {
                var page_num = 1
            } else {
                var page_num = 2
            }
            if (compare($index, 0, page_num)) {
                $scope.sortIndex--
                swapItems(arr, $index, $index - 1);
                swapItems(answer_id, $index, $index - 1);
                swapItems(allList_1, $index, $index - 1);
                render(allList_1, $index)
                setAnswerSor()
                return false
            } else {
                alert("当前高度大于上一个高度")
                return false
            }
        }
        $scope.sortIndex--
        swapItems(arr, $index, $index - 1);
        swapItems(answer_id, $index, $index - 1);
        swapItems(allList_1, $index, $index - 1);
        render(allList_1, $index)
        setAnswerSor()
    };

    // 下移
    $scope.downRecord = function (arr, $index) {
        var len1 = $scope.listObj.length, len2 = $scope.listObj2.length, len3 = $scope.listObj3.length, len4 = $scope.listObj4.length
        var page_last = len1 - 1, page2_last = len1 + len2 - 1, page3_last = len1 + len2 + len3 - 1, page4_last = len1 + len2 + len3 + len4 - 1
        if ($index == arr.length - 1) {
            return;
        }
        if ($index == page_last || $index == page2_last || $index == page3_last) {
            if ($index == page_last) {
                var page_num = 1
            } else if ($index == page2_last) {
                var page_num = 2
            } else {
                var page_num = 3
            }
            if (compare($index, 1, page_num)) {
                $scope.sortIndex++
                swapItems(arr, $index, $index + 1);
                swapItems(answer_id, $index, $index + 1);
                swapItems(allList_1, $index, $index + 1);
                render(allList_1, $index)
                setAnswerSor()
                return false
            } else {
                alert("当前高度大于下一个高度")
                return false
            }
        }//
        $scope.sortIndex++
        swapItems(arr, $index, $index + 1);
        swapItems(answer_id, $index, $index + 1);
        swapItems(allList_1, $index, $index + 1);
        render(allList_1, $index)
        setAnswerSor()
    };
    //查找在那个全局变量删除元素
    function findScopeListDele(index) {
        var len1 = $scope.listObj.length, len2 = $scope.listObj2.length, len3 = $scope.listObj3.length, len4 = $scope.listObj4.length
        if (index <= len1 - 1) {
            console.log($scope.listObj)
            $scope.listObj.splice(index, 1)
            console.log("删除list1")
        }
        if (index >= len1 && index < len1 + len2) {
            $scope.listObj2.splice(index - len1, 1)
            console.log("删除list2")
        }
        if (index >= len1 + len2 && index < len1 + len2 + len3) {
            if($scope.listObj3[index - len1 - len2].writIsradio==4){
                $scope.listObj5 = []
            }
            $scope.listObj3.splice(index - len1 - len2, 1)
            console.log("删除list3")
        }
        if (index >= len1 + len2 + len3 && index < len1 + len2 + len3 + len4) {
            $scope.listObj4.splice(index - len1 - len2 - len3, 1)
            console.log("删除list4")
        }
        // deleRender(index)
    }

    //删除题组
    $scope.delAnswerGroup = function () {
        var answer_id_item = $scope.bigAnswer[$scope.sortIndex].answer_id
        var answer_score = $scope.bigAnswer[$scope.sortIndex].answer_score

        var isLogin = localStorage.getItem("token");
        var index;
        for (var i = 0; i < answer_id.length; i++) {
            if (answer_id[i].answers.answer_id == answer_id_item) {
                index = i
            }
        }
        $.ajax({
            type: "POST",
            url: "/api/v2/answers/delete",
            headers: {'Authorization': "Bearer " + isLogin},
            data: {'id': answer_id_item},
            async: false,
            success: function (data) {
                $scope.bigAnswer.splice($scope.sortIndex, 1)
                findScopeListDele($scope.sortIndex)
                answer_id.splice(index, 1)
                count(-parseInt(answer_score))
            },
            error: function () {

            }
        });
        if($scope.bigAnswer.length == 1){
            $scope.sortIndex = 0
        }
        if($scope.sortIndex==$scope.bigAnswer.length){
            $scope.sortIndex--
        }
        if ($scope.bigAnswer.length == 0) {
            $scope.closeAnswerModel()
        }
    }
    /**
     * 设置每题答案
     * @param outerIndex 最外层索引
     * @param parentIndex 父级索引
     * @param index 自己索引
     */
    $scope.setItemAnswer = function (outerIndex, parentIndex, index, setting_result, setting_id) {//设置每题答案
        var setting_result = setting_result.split(',')
        if (setting_result[index] == 0) {
            setting_result[index] = 1
        } else {
            setting_result[index] = 0
        }
        var result = setting_result.join(',')
        var isLogin = localStorage.getItem("token");
        $.ajax({
            type: "POST",
            url: "/api/v2/answer_settings/" + setting_id,
            headers: {'Authorization': "Bearer " + isLogin},
            data: {
                'answer_setting[result]': result
            },
            async: false,
            success: function (data) {
                $scope.answers[outerIndex].settings[parentIndex].setting_result = result
            },
            error: function () {

            }
        });
    }
    $scope.setItmeScore = function (setting_id, score, itmeIndex) {//设置每小题分数
        $.ajax({
            type: "POST",
            url: "/api/v2/answer_settings/" + setting_id,
            headers: {'Authorization': "Bearer " + isLogin},
            data: {
                'answer_setting[score]': score
            },
            async: false,
            success: function (data) {
                console.log(data)
                var options = {}
                options.type = 3
                options.score = score
                options.itmeIndex = itmeIndex
                var index;
                for (var i = 0; i < $scope.beforeBigAns.length; i++) {
                    if ($scope.answers[0].answer_id == $scope.beforeBigAns[i].answer_id) {
                        index = i
                    }
                }
                findScopeList(index, options)
            },
            error: function () {

            }
        })
    }
    $scope.setItmeNum = function (setting_id, title_no,itmeIndex) {//设置题目序号
        $timeout(function () {
            $.ajax({
                type: "POST",
                url: "/api/v2/answer_settings/" + setting_id,
                headers: {'Authorization': "Bearer " + isLogin},
                data: {
                    'answer_setting[num]': title_no
                },
                async: false,
                success: function (data) {
                    console.log(data)
                    var options = {}
                    options.type = 4
                    options.title_no = title_no
                    options.itmeIndex = itmeIndex
                    var index;
                    for (var i = 0; i < $scope.beforeBigAns.length; i++) {
                        if ($scope.answers[0].answer_id == $scope.beforeBigAns[i].answer_id) {
                            index = i
                        }
                    }
                    findScopeList(index, options)
                },
                error: function () {

                }
            });
        }, 500)
    }
    /**
     * 过滤手工阅卷还是网络阅卷
     * @param arr 题组的数组
     */
    function filtrAnswerMode(arr) {
        var filtrAnswer = arr.filter(function (ele) {
            return ele.answer_mode == 0 || ele.answer_mode == 1 || ele.answer_mode == 2 || ele.answer_mode == 3 || ele.answer_mode==6
        })
        return filtrAnswer
    }

    /**
     * 获取年级
     * @param is_extra
     */
    function getSchoolGrades(is_extra) {
        $.ajax({
            url: "/api/v2/commons/school_grades",
            type: "GET",
            async: false,
            headers: {'Authorization': "Bearer " + isLogin},
            data: {"is_extra": is_extra},
            success: function (data) {
                $scope.gradesList = data
                $scope.itmeGrades = $scope.gradesList[0]
                getGradeSubjects($scope.itmeGrades.id)
            }
        })
    }

    /**
     * 获取科目
     * @param id
     */
    function getGradeSubjects(id) {
        $.ajax({
            url: "/api/v2/commons/grade_subjects",
            type: "GET",
            async: false,
            headers: {'Authorization': "Bearer " + isLogin},
            data: {"grade_id": id},
            success: function (data) {
                $scope.subjects = data
                $scope.itmeSubject = $scope.subjects[0]
            }
        })
    }

    /**
     * 获取信息年级科目
     */
    $scope.getSchoolInfo = function (type) {
        getSchoolGrades(false)
        if (type == 0) {
            if ($scope.listObj.length == 0) {
                alert("页面暂无内容")
                return
            }
            $scope.add(6)
        } else {
            $scope.add(7)
            $scope.chanGetTemplate()
        }
    }

    /**
     * 联动科目
     * @param obj  年级id
     */
    $scope.changGrades = function (obj) {
        getGradeSubjects(obj.id)
    }

    /**
     * 另存为模板
     * @param subjectId   科目id
     * @param gradeId     年级id
     * @param name        模板名称
     * @param basicInfoRegion  json页面模板
     */
    function Template(subjectId, gradeId, name, basicInfoRegion) {
        $.ajax({
            url: "/api/v2/answer_region_templates/save_template",
            type: "POST",
            async: false,
            headers: {'Authorization': "Bearer " + isLogin},
            data: {
                "subject_id": subjectId,
                "grade_id": gradeId,
                "name": name,
                "basic_info_region": basicInfoRegion
            },
            success: function (data) {
                $scope.close()
                alert("存入模板成功!")
            }
        })
    }

    /**
     * 存为模板
     */
    $scope.saveTemplate = function () {
        if (!$scope.templateName) {
            alert("请输入模板名称")
            return
        }
        var obj = allList()
        delete obj.answer_id
        obj.modelParam = JSON.parse(window.localStorage.getItem(getUrlParam(url, 'examubjeId')))
        Template($scope.itmeSubject.id, $scope.itmeGrades.id, $scope.templateName, JSON.stringify(obj))
    }
    /**
     * 导入模板
     * @param templateId   模板id
     * @param subjectId    考试科目id
     */
    function importTemplate(templateId, subjectId) {
        $.ajax({
            url: "/api/v2/answer_region_templates/import_template",
            type: "POST",
            headers: {'Authorization': "Bearer " + isLogin},
            async: false,
            data: {
                "answer_region_template_id": templateId,
                "exam_subject_id": subjectId
            },
            success: function (data) {
                $scope.listObj = data.page1 ? data.page1 : []
                $scope.listObj2 = data.page2 ? data.page2 : []
                $scope.listObj3 = data.page3 ? data.page3 : []
                $scope.listObj4 = data.page4 ? data.page4 : []
                $scope.listObj5 = data.page5 ? data.page5 : []
                $scope.paperType = data.paperType ? data.paperType : 0
                $scope.infoLocation = data.infoLocation ? data.infoLocation : 0
                $scope.infoBox = data.infoBox ? data.infoBox : 0
                $scope.barInfo = data.barInfo ? data.barInfo : {}
                $scope.leftcardNum = data.leftcardNum ? data.leftcardNum : 0
                $scope.showTableLineTyep = data.showTableLineTyep ? data.showTableLineTyep : 0
                $scope.myDayinType = data.myDayinType ? data.myDayinType : 0
                $scope.discernType = data.discernType ? data.discernType : 0
                $scope.examType = data.examType ? data.examType : 0
                $scope.showItmeScoreType = data.showItmeScoreType ? data.showItmeScoreType : 0
                $scope.countScore = data.countScore ? data.countScore : 0
                $scope.candNumber = data.candNumber ? data.candNumber : [0, 1, 2, 3, 4, 5, 6, 7]
                $scope.candlen = $scope.candNumber.length
                modelParam = data.modelParam ? data.modelParam : []
                if (modelParam) {
                    modelParam.forEach(function (itme, index, arr) {//替换当前的examubjeId
                        arr[index].answer.exam_subject_id = getUrlParam(url, 'examubjeId')
                    })
                }
                $scope.close()
            }
        })
    }

    /**
     * 获取模板
     */
    $scope.chanGetTemplate = function () {
        $.ajax({
            url: "/api/v2/answer_region_templates",
            type: "GET",
            async: false,
            headers: {'Authorization': "Bearer " + isLogin},
            data: {"grade_id": $scope.itmeGrades.id, "subject_id": $scope.itmeSubject.id},
            success: function (data) {
                $scope.TemplateList = data
                $scope.itmeTemplate = $scope.TemplateList[0]
                console.log($scope.itmeTemplate)
            }
        })
    }

    $scope.importTemplate = function () {
        importTemplate($scope.itmeTemplate.id, $scope.itmeSubject.id)
    }

    /*****************************************************************************
     *定义右击功能
     * @returns {string}
     */
    var menu = document.getElementById("menu")
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault()
        if (event.target.className.toLowerCase() == 'meun_navbar') {
            return
        }
        if ($scope.showMenuFlag) {
            menu.style.display = 'block'
            menu.style.left = event.pageX + "px";
            menu.style.top = event.pageY + "px";
            $scope.LineTypeWord = $scope.LineTypeWord=='实线'?'虚线':'实线'
            $scope.LineTypeShow = $scope.LineTypeWord=='隐藏'?'显示':'隐藏'
        }
    }, false)
    menu.addEventListener("click", function (evevt) {
        evevt.stopPropagation()
    }, false)
    window.addEventListener("click", function (event) {
        menu.style.display = 'none'
    }, false)


    window.onbeforeunload = function () {//离开刷新提醒
        if (modelParam.length > 0) {
            return "您修改了内容,请保存答题卡"
        }
    }
    $scope.closeUteroBox = function () {//关闭离开
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
     * 设置考号
     * @param length  考号长度
     */
    $scope.showModel = function (className) {
        $("."+className).show()
        $("#menu").hide()
    }
    $scope.closeCand = function () {
        $(".cand").hide()
    }
    $scope.showCandNumer = function () {
        $(".cand_box").show()
        $("#menu").hide()
        $scope.candlen = $scope.infoBox==0?$scope.candNumber.length:$scope.leftcardNum.length
    }
    /**
     * 设置条码位置
     */
    $scope.showBar = function(){
        console.log(111)
        $(".cand_bar").show()
        $("#menu").hide()
    }
    $scope.setBar = function(obj){
        console.log(obj)
        $(".cand").hide()
    }
    $scope.setCandNumber = function (candlen) {
        var result = []
        for (var i = 0; i < candlen; i++) {
            result.push(i)
        }
        if($scope.infoBox==0){
            $scope.candNumber = result
        }
        if($scope.infoBox==1){
            if(candlen>5){
                alert("侧边最大考号为5位")
                return;
            }
            $scope.leftcardNum = result
        }
        $(".cand").hide()
    }
    /**
     * 聚焦table
     * @param parentIndex  $scope.list
     * @param index   题组索引
     */
    function getOBjList() {
        var obj
        if ($scope.tabParentIndex == 0) {
            obj = $scope.listObj
        }
        if ($scope.tabParentIndex == 1) {
            obj = $scope.listObj2
        }
        if ($scope.tabParentIndex == 2) {
            obj = $scope.listObj3
        }
        if ($scope.tabParentIndex == 3) {
            obj = $scope.listObj4
        }
        return obj
    }
    $scope.getTableIndex = function (tabParentIndex, tabIndex) {
        console.log(111)
        $scope.tabParentIndex = tabParentIndex
        $scope.tabIndex = tabIndex
        $scope.showMenuFlag = true
        if($scope.tabParentIndex!=-1){
            $scope.otherHeight = getOBjList()[$scope.tabIndex].otherHeight
            $scope.meunType = getOBjList()[$scope.tabIndex].type//右键菜单显示控制
            $scope.meunOtherisradio = getOBjList()[$scope.tabIndex].otherisradio//右键菜单显示控制
            $scope.meunrticleType = getOBjList()[$scope.tabIndex].articleType//右键菜单显示控制
        }
    }
    var eleFile = document.getElementById("imgOne")
    $scope.insertPic = function () {
        var formdata = new FormData()
        var file = eleFile.files[0]
        formdata.append("figures[]figure", file)
        $.ajax({
            type: "POST",
            headers: {'Authorization': "Bearer " + isLogin},
            url: "/api/v2/answer_regions/subject_image",
            async: false,
            data: formdata,
            processData: false,  // 不处理数据
            contentType: false,   // 不设置内容类型
            success: function (data) {
                getOBjList()[$scope.tabIndex].img[$scope.img_no-1].url = data[0].figure
                getOBjList()[$scope.tabIndex].img[$scope.img_no-1].top = 10
                getOBjList()[$scope.tabIndex].img[$scope.img_no-1].left = 0
                getOBjList()[$scope.tabIndex].img[$scope.img_no-1].height = 140
                getOBjList()[$scope.tabIndex].img[$scope.img_no-1].width = 'auto'
                $scope.closeCand()
            },

        })
    }
    /*设置题组高度*/
    $scope.setGroupHeigh = function (heights) {
        getOBjList()[$scope.tabIndex].otherHeight = heights.split(/[,，]/)
        $scope.closeCand()
    }
    /**设置填空题格式**/
    $scope.setFillQuestion= function () {
        $(".setFill_q").show()
        $("#menu").hide()
        getNo(getOBjList())
        function getNo(obj) {//获取当前答题有几个小题
            var len = obj[$scope.tabIndex].no.length
            var fillWidth = obj[$scope.tabIndex].fillWidth
            var separator = obj[$scope.tabIndex].separator
            var fillsNum = obj[$scope.tabIndex].fillsNum
            $scope.fillLists = []
            for(var i = 0;i< len;i++){
                var obj = {
                    "fill_num":fillsNum[i].length,
                    "fill_w":fillWidth[i],
                    "separator":separator[i].join("|"),
                    "no":i
                }
                $scope.fillLists.push(obj)
            }
            console.log($scope.fillLists)
        }
    }
    /*************确定**************/
    $scope.sureFillQuestion = function () {
        $scope.fillLists.forEach(function (item,index,arr) {
            if(arr[index].fill_w>668){
                alert("第"+(index+1)+'大于668,最大为668')
                return false
            }
            getOBjList()[$scope.tabIndex].fillWidth[index] = typeof arr[index].fill_w === 'string'?arr[index].fill_w.split(/[,，]/):arr[index].fill_w
            getOBjList()[$scope.tabIndex].separator[index] = typeof arr[index].separator === 'string'?arr[index].separator.split('|'):arr[index].separator
            getOBjList()[$scope.tabIndex].fillsNum[index] = getfillChildNums(arr[index].fill_num).resutl
            function getfillChildNums(num) {
                var resutl = []
                var itmeWidth = []
                for(var i = 0;i<num;i++){
                    resutl.push(i)
                }
                return {
                    resutl:resutl
                }
            }
            $scope.closeCand()
        })
    }
    /**
     * 设置横线间距
     */
    $scope.showVertical = function () {
        $(".vertical").show()
        $("#menu").hide()
        $scope.vertical = getOBjList()[$scope.tabIndex].verticalHeigth
    }
    $scope.setVertical = function (verticalHeigth) {
        getOBjList()[$scope.tabIndex].verticalHeigth = verticalHeigth
        $scope.closeCand()
    }
    /**
     * 切换实线和虚线转换
     */
    $scope.toggleLineType = function () {
        getOBjList()[$scope.tabIndex].LineType = !getOBjList()[$scope.tabIndex].LineType
        $("#menu").hide()
    }
    /**
     * 切换隐藏其他题横线
     */
    $scope.toggleLineDisplay = function () {
        getOBjList()[$scope.tabIndex].hideLineType = !getOBjList()[$scope.tabIndex].hideLineType
        $("#menu").hide()
    }

    /**
     * 获取图片格式
     */
    $scope.selectImg = function (index) {
        $scope.imgIndex = index
    }
    $scope.getImgFormat = function () {
        $scope.imgObj  = {}
        $scope.imgObj.topMargin = getOBjList()[$scope.tabIndex].img[$scope.imgIndex].top
        $scope.imgObj.leftMargin = getOBjList()[$scope.tabIndex].img[$scope.imgIndex].left
        $scope.imgObj.imgWidth = getOBjList()[$scope.tabIndex].img[$scope.imgIndex].width
        $scope.imgObj.imgHeight = getOBjList()[$scope.tabIndex].img[$scope.imgIndex].height
        $(".imgFormat").show()
        $("#menu").hide()
    }
    /**
     * 设置图片格式
     * @param index   图片索引
     * @param options
     */
    $scope.setImgFormat = function () {
        getOBjList()[$scope.tabIndex].img[$scope.imgIndex].top= $scope.imgObj.topMargin
        getOBjList()[$scope.tabIndex].img[$scope.imgIndex].left= $scope.imgObj.leftMargin
        getOBjList()[$scope.tabIndex].img[$scope.imgIndex].width= $scope.imgObj.imgWidth
        getOBjList()[$scope.tabIndex].img[$scope.imgIndex].height= $scope.imgObj.imgHeight
        $(".imgFormat").hide()
    }
    /**
     * 设置信息栏位置/顶部/左侧
     */
    $scope.setInfoLocation = function () {
        $("#menu").hide()
        $scope.infoLocation = $scope.infoLocation==0?1:0
    }
    /**
     * 设置信息框位置
     */
    $scope.setInfoBox = function () {
        $scope.infoBox = $scope.infoBox==0?1:0
        $("#menu").hide()
        if($scope.infoBox==1){//顶部
            if($scope.candNumber.length>=5){
                $scope.leftcardNum = []
                for(var i = 0;i<5;i++){
                    $scope.leftcardNum.push(i)
                }
            }else{
                $scope.leftcardNum = $scope.candNumber
            }
        }else{
            $scope.candNumber = $scope.leftcardNum
        }
    }
    /*******************************保存*************************************************/
    $scope.save = function () {//保存模板
        if ($scope.listObj.length <= 0) {
            alert("请添加题组")
            return
        }
        var isLogin = localStorage.getItem("token");
        function bindRegion() {
            var answer_ids = []
            for (var i = 0; i < answer_id.length; i++) {
                answer_ids.push(answer_id[i].answers.answer_id)
            }
            console.log(getBigQuestion(allPagePost()))
            if ($scope.paperType == 0) {//手工阅卷
                var allP = getBigQuestion(allPagePost())
            } else {
                var allP = filtrAnswerMode(getBigQuestion(allPagePost()))
            }
            $.ajax({
                    type: "POST",
                    url: "/api/v2/answer_regions",
                    headers: {'Authorization': "Bearer " + isLogin},
                    async: false,
                    data: {
                        'answer_region[exam_subject_id]': getUrlParam(url, 'examubjeId'),//科目ID
                        'answer_region[anchor]': JSON.stringify(getPostDot()),//四个锚点
                        'answer_region[region_info]': JSON.stringify(allP),//所有坐标信息
                        'answer_region[basic_info_region]': JSON.stringify(allList()),//存储页面题目
                        'page': $(".A_R").length
                    },
                    success: function (data) {//绑定题组以便刷新后删除没用的
                        var TemplateId = data.message
                        var bindData = new FormData()
                        bindData.append('exam_subject_id',getUrlParam(url, 'examubjeId'))
                        bindData.append('answer_region_id',TemplateId)
                        bindData.append('answer_ids',answer_ids.join(","))
                        $.ajax({
                                type: "POST",
                                url: "/api/v2/answer_region_binds",
                                headers: {'Authorization': "Bearer " + isLogin},
                                async: false,
                                data: bindData,
                                processData: false,  // 不处理数据
                                contentType: false,   // 不设置内容类型
                                // data: {
                                //     'exam_subject_id': getUrlParam(url, 'examubjeId'),//科目ID
                                //     'answer_region_id': TemplateId,//模板ID
                                //     'answer_ids': answer_ids.join(",")
                                // },
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
            if(question_bank_id.length>0){//点击过了导入试卷
                for(var i = 0;i < modelParam.length;i++){
                    modelParam[i].answer_settings.question_bank_id = question_bank_id[i]
                }
            }
            $.ajax({//获取answer_id
                    type: "POST",
                    url: "api/v2/answers/batch_create",
                    headers: {'Authorization': "Bearer " + isLogin},
                    data: {"answers": JSON.stringify(modelParam)},
                    async: false,
                    success: function (data) {
                        console.log(data)
                        answer_id = data
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
    /***************************************导入试卷********************************************************/
    var setResult = function (data) {//序列化请求参数
        $scope.result.name = data.name  //题组名称
        $scope.result.no = data.no      //起始序号

        if(data.answer_type==0){  //选择题
            $scope.result.numbel = data.number  //试题数量
            $scope.index = 1     //试题类型
            $scope.result.itemcoreS = data.score //每小题分数
            $scope.result.thr = data.count     //选项个数
            $scope.result.isradio = 1
        }

        if(data.answer_type==1){ //填空题
            $scope.result.numbel = data.number  //试题数量
            $scope.index = 3     //试题类型
            $scope.result.itemcoreS = data.score //每小题分数
        }

        if(data.answer_type==2){ //是非题
            $scope.result.numbel = data.number  //试题数量
            $scope.index = 2     //试题类型
            $scope.result.itemcoreS = data.score //每小题分数
        }

        if(data.answer_type==3){ //其他题
            $scope.result.numbel = data.number  //试题数量
            $scope.index = 5     //试题类型
            $scope.result.itemcoreS = data.score //每小题分数
            $scope.result.otherisradio = 3
        }

        if(data.answer_type==4){//作文题

        }
        if(data.answer_type==5){ //多选题
            $scope.result.numbel = data.number  //试题数量
            $scope.index = 1     //试题类型
            $scope.result.itemcoreS = data.score //每小题分数
            $scope.result.thr = data.count     //选项个数
            $scope.result.isradio = 2
        }
    }
    var getExamStatus = true
    var question_bank_id = []
    $scope.importExam = function () {
        if(getExamStatus){
            $.ajax({
                type: "POST",
                url: "api/v2/exam_subjects/answers_and_answer_settings",
                headers: {'Authorization': "Bearer " + isLogin},
                data: {"id": getUrlParam(url, 'examubjeId')},
                async: false,
                success: function (data) {
                    if(data.data.length==0){
                        alert("该科目没有绑定试卷")
                        return
                    }
                    if(data.exist){
                        alert("请勿重复导入")
                        return
                    }
                    getExamStatus = false
                    for(var i = 0;i<data.data.length;i++){
                        (function (i) {
                            $timeout(function () {
                                question_bank_id.push(data.data[i].question_bank_id)
                                console.log(question_bank_id)
                                setResult(data.data[i])
                                $scope.btn1()
                            },i*1000)
                        })(i)
                    }
                },
                error: function (data) {

                }

            })
        }else{
            alert("请勿重复点击")
        }
    }
    /********************************************************隐藏功能修改总分********************************/
    $scope.setCountScore = function () {
        $scope.countScore = Number($scope.countScore)
        $scope.closeCand()
    }
 })


