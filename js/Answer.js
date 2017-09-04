var m1 = angular.module("pro", []);
// m1.config(function ($httpProvider) {
//     $httpProvider.defaults.useXDomain = true;
//     delete $httpProvider.defaults.headers.common['X-Requested-With'];
// })
//设置控制器
m1.controller("demo", function ($scope, $timeout, $http) {
    var url = window.location;
    $scope.subjectName = window.localStorage.getItem("test_name") + window.localStorage.getItem("subjectname")
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
    $scope.listObj3 = [];
    $scope.listObj4 = [];
    $scope.result = {};//弹出框保存
    var answer_id = []//大题answer_id
    $scope.getAnswer = function() {//获取题目模板
        var isLogin = localStorage.getItem("token");
        $.ajax({
            type: "GET",
            url: ajaxIp+"/api/v2/answer_regions/basic_info_region",
            headers: {'Authorization': "Bearer " + isLogin},
            data:{'exam_subject_id':getUrlParam(url, 'examubjeId')},
            async: false,
            success: function(data){
                if(data.code==200){
                    $scope.listObj = data.message.page1?data.message.page1:[]
                    $scope.listObj2 = data.message.page2?data.message.page2:[]
                    $scope.listObj3 = data.message.page3?data.message.page3:[]
                    $scope.listObj4 = data.message.page4?data.message.page4:[]
                    answer_id = data.message.answer_id
                }
            },
            error: function(){

            }
        });
    }
    $scope.getAnswer()
    $scope.oldAnswerLen = answer_id.length
    //点击显示
    $scope.add = function (index) {
        $scope.index = index
        clear()
        $scope.result.isradio = 1//单选题、多选题
        $scope.result.writIsradio = 1//作文题
    };
    $scope.checkbox = function (index) {//切换单选多选
        $scope.result.isradio = index
    }
    $scope.checkWrit = function (index) {
        $scope.result.writIsradio = index//作文题
    }
    $scope.checkTestTypeModel = true
    $scope.checkTestType = function () {//阅卷模式切换
        $scope.checkTestTypeModel = !$scope.checkTestTypeModel
    }
    $scope.Q_number = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十']
    var isLine = function (page_num) {//是否换行
        var outerBox = $(".A_Rone").outerHeight()//最外层距离
        var result;
        if($(".A_Rone").eq(page_num).find("table:last").position()){//不是第一次插入
            var lastTabPosi = $(".A_Rone").eq(page_num).find("table:last").position().top+$(".A_Rone").eq(page_num).find("table:last").height()+30//已经占用高度
            var remain = outerBox - lastTabPosi
            var title_h = 45,padding = 10
            if($scope.index==1||$scope.index==2){//选择题、判断题
                var rowItme_h = 27;
                if($scope.result.thr<=4){//判断几个为一行
                    var row_h = 4
                }else if($scope.result.thr>4 && $scope.result.thr<=10){
                    var row_h =2
                }else {
                    var row_h = 1
                }
                var row = Math.ceil($scope.result.numbel/row_h)
                result = remain- title_h - padding - row*rowItme_h>0?true:false
            }
            if($scope.index==3){//填空题
                var rowItme_h = 27,score_h = 38
                var row = Math.ceil($scope.result.numbel/2)
                console.log(remain- title_h - padding - score_h - row*rowItme_h)
                result = remain- title_h - padding - score_h - row*rowItme_h>0?true:false
            }
            if($scope.index==4){//作文题
                var rowItme_h = 36,score_h = 35;
                if($scope.result.writIsradio==1){
                    var row = Math.ceil($scope.result.plaid/20)
                    result = remain- title_h - padding - score_h - row*rowItme_h>0?true:false
                }else if($scope.result.writIsradio==2){
                    var row = parseInt($scope.result.enLine)
                    result = remain- title_h - padding - score_h - row*rowItme_h>0?true:false
                }else {
                    var row = Math.ceil($scope.result.word/8)
                    result = remain- title_h - padding - score_h - row*rowItme_h>0?true:false
                }
            }
            if($scope.index==5){//其他题
                var rowItme_h = 164;
                var row = $scope.result.numbel
                result = remain- title_h - padding - row*rowItme_h>0?true:false
            }
        }else {//第一次添加
            console.log("第一添加")
            return true
        }
        return result
    }
    var isNumber = function (value,index) {
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
            {"type":$scope.result.numbel,"index":0},
            {"type":$scope.result.no,"index":1},
            {"type":$scope.result.itemcoreS,"index":2},
            {"type":$scope.result.thr,"index":3},
            {"type":$scope.result.page,"index":4},
            {"type":$scope.result.writscore,"index":5},
            {"type":$scope.result.plaid,"index":6},
            {"type":$scope.result.enLine,"index":7},
            {"type":$scope.result.word,"index":8}
        ]
        var result = true
        var trimUndefined = []
        for(var i = 0;i<inputInt.length;i++){
            if(typeof inputInt[i].type!='undefined'&&inputInt[i].type!=''){//去除undefined和为空的值
                trimUndefined.push(inputInt[i])
            }
        }
        for(var i = 0;i<trimUndefined.length;i++){
            if(!isNumber(trimUndefined[i].type,trimUndefined[i].index)){
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
        ]
        var checkIsEmpty = function (array) {//检测是否为空
            for(var i = 0;i<array.length;i++){
                if(array[i].type==''){
                    alert(tips[array[i].index])
                    result = false
                }
            }
        }
        if($scope.index==1){
            var input = [
                {"type":$scope.result.name,"index":0},//题组名称
                {"type":$scope.result.numbel,"index":1},//试题数量
                {"type":$scope.result.no,"index":2},//起始序号
                {"type":$scope.result.itemcoreS,"index":3},//每题分值
                {"type":$scope.result.thr,"index":4}//选项个数
            ]
            checkIsEmpty(input)
        }
        if($scope.index==2||$scope.index==3||$scope.index==5){
            var input = [
                {"type":$scope.result.name,"index":0},//题组名称
                {"type":$scope.result.numbel,"index":1},//试题数量
                {"type":$scope.result.no,"index":2},//起始序号
                {"type":$scope.result.itemcoreS,"index":3},//每题分值
                {"type":$scope.result.page,"index":5}//所在页码
            ]
            checkIsEmpty(input)
        }
        if($scope.index==4){
            var input = [
                {"type":$scope.result.name,"index":0},//题组名称
                {"type":$scope.result.no,"index":2},//起始序号
                {"type":$scope.result.page,"index":5},//所在页码
                {"type":$scope.result.writscore,"index":6},//作文总分
            ]
            if($scope.result.writIsradio==1){
                input.push({"type":$scope.result.plaid,"index":7})
            }
            if($scope.result.writIsradio==2){
                input.push({"type":$scope.result.enLine,"index":8})
            }
            if($scope.result.writIsradio==3){
                input.push({"type":$scope.result.word,"index":9})
            }
            checkIsEmpty(input)
        }
        return result
    }
    $scope.append = function (obj) {//push数据
        if(isLine(0)){
            obj.current_page = 1
            $scope.listObj.push(obj);
        }else if(isLine(1)){
            obj.current_page = 1
            $scope.listObj2.push(obj);
        }else if(isLine(2)){
            obj.current_page = 2
            $scope.listObj3.push(obj);
        }else if(isLine(3)){
            obj.current_page = 2
            $scope.listObj4.push(obj);
        }
    }
    $scope.createAsswer = function (data) {//添加题组
        var data = data
        var isLogin = localStorage.getItem("token");
        if (data.isradio == 2) {
            data.type = 6
        }
        var Q_type = ['单选题', '是非题', '填空题', '作文题', '其他题', '多选题']
        var param = {}
        param["answer[exam_subject_id]"] = getUrlParam(url, 'examubjeId')//考试科目id
        param["answer[item]"] = Q_type[data.type - 1]//试题类型
        param["answer[name]"] = data.name//题组名称
        param["answer_setting[count]"] = data.type ==4?1:data.numbel//试题数量 panduan
        param["answer_setting[num]"] = data.startNo//起始序号
        param["answer_setting[page]"] = data.currentPage == undefined ? 1 : data.currentPage//所在页码
        param["answer_setting[score]"] = data.type==4?data.totalCores:data.itemCores//每题分值 panduan
        param["answer_setting[type_count]"] = data.itemNumber//选项个数 panduan
        if(data.type==4){
            param["answer_setting[template_format]"] = data.articleType//作文模版格式 panduan
            param["answer_setting[lattice_columns]"] = data.row//格子列数 panduan
            param["answer_setting[lattice_total]]"] = data.plaid//格子总数 panduan
        }
        $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/answers",
                headers: {'Authorization': "Bearer " + isLogin},
                data: param,
                success: function (data) {
                    answer_id.push(data)
                    $scope.newAnswerLen = answer_id.length
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
        }else if($scope.index==3||$scope.index==4||$scope.index==5){
            var itemNumber = 1
        }else {
            var itemNumber = $scope.result.thr
        }
        if($scope.result.writIsradio==1){
            var row = Math.ceil($scope.result.plaid/20)
        }
        if($scope.result.writIsradio==2){
            var row = $scope.result.enLine
        }
        if($scope.result.writIsradio==3){
            var row = $scope.result.word
        }
        var rosItem = []
        for(var i = 0;i<row;i++){
            rosItem.push(i)
        }
        obj = {
            name: $scope.result.name,//题组名称
            numbel: $scope.index==4?1:parseInt($scope.result.numbel),//试题数量
            isradio: $scope.result.isradio,//单选多选
            startNo: parseInt($scope.result.no),//起始序号
            currentPage: $scope.result.page==undefined?1:$scope.result.page,//所在页码
            no: noarray,//选项个数数组,
            itemNumber: itemNumber,//选项个数
            totalCores: $scope.index==4?parseInt($scope.result.writscore):totaltwo,//总分
            itemCores: $scope.result.itemcoreS,//每小题分
            thr: $scope.index == 1 ? $scope.nubarray : ['T', 'F'], //选项ABCD(选择题和判断题)
            type: $scope.result.isradio==2?6:$scope.index//题目类型
        }
        if($scope.index==4){
            obj.articleType = $scope.result.writIsradio
            obj.rows = rosItem
            obj.plaids = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
            obj.row = row
            obj.plaid = $scope.result.plaid
        }
        if(!checkIsNUll()){
            return false
        }
        if(!checkIsNumbers()){
            return false
        }
        $scope.append(obj)
        $scope.createAsswer(obj)
        clear()
        close()
    };
    $scope.setItmeWidth = function (itemNumber) {
        $scope.setWidth
        if(itemNumber.length<=4){
            $scope.setWidth = 25+'%'
        }else if(itemNumber.length>4&&itemNumber.length<=10){
            $scope.setWidth = 50+'%'
        }else{
            $scope.setWidth = 100+'%'
        }
        return $scope.setWidth
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
            name: '', numbel: '', isradio:'',
            no: '', one: '', two: '', thr: '',
        };
    };
    function getStudentInfo() {//获取学号学生信息
        var itme_obj = {}
        var studentRegionRect = {}//学号区域信息
        var dot = $(".position_TL span").eq(1).offset();
        dot.left = dot.left + 15, dot.top = dot.top + 15//定标点
        var studentInfo = $(".student_L")
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
        itme_obj.current_page = 1
        itme_obj.no = 0
        itme_obj.score = 0
        itme_obj.string = "学号"
        itme_obj.block_width = 18
        itme_obj.block_height = 12
        itme_obj.num_question = parseInt(ulLen)
        itme_obj.num_of_option = parseInt(len)
        itme_obj.region_rect_x = studentRegionRect.region_rect_x-10
        itme_obj.region_rect_y = studentRegionRect.region_rect_y-8
        itme_obj.region_rect_width = studentRegionRect.region_rect_width+10
        itme_obj.region_rect_height = studentRegionRect.region_rect_height+8
        itme_obj.question = []
        for(var i = 1;i<ulLen;i++){
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
    function otherFillScoreRect(index,current_page) {//获得其他题打分区域坐标
        var otherScoreRect = []
        var otherListDom = []
        var dot = $(".position_TL span").eq(1).offset();
        dot.left = dot.left + 15, dot.top = dot.top + 15//定标点
        var dom = $(".conten").find("table").eq(index).find("tbody").find(".other").find(".other_h")
        dom.each(function () {
            otherListDom.push($(this).offset())
        })
        for(var i = 1;i<=dom.length;i++){
            var scoreRect = {}
            scoreRect.no = i
            scoreRect.score_rect_x = otherListDom[i-1].left-dot.left
            scoreRect.score_rect_y = otherListDom[i-1].top-dot.top - 1126*(current_page-1)
            otherScoreRect.push(scoreRect)
        }
        return otherScoreRect
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
    function fillScoreOptions(index,type,current_page) {//获得17个打分框坐标
        var fillScoreOptions = []
        var makrin = []
        var dot = $(".position_TL span").eq(1).offset();
        dot.left = dot.left + 15, dot.top = dot.top + 15//定标点
        if(type==5){//其他题打分框坐标
            var dom = $(".conten").find("table").eq(index).find("tbody").find(".other").find("a")
        }else{//填空题坐标
            var dom = $(".conten").find("table").eq(index).find("thead").find("tr").eq(1).find("a")
        }
        dom.each(function () {
            fillScoreOptions.push($(this).offset())
        })
        for(var i = 1 ;i<=fillScoreOptions.length;i++){
            var obj = {}
            obj.no = i
            obj.option_point_x = parseInt(fillScoreOptions[i-1].left+12-dot.left)
            obj.option_point_y = parseInt(fillScoreOptions[i-1].top+7-dot.top-1126*(current_page-1))
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
    function getQuestion(qNumer, answerNumber, Answerindex,answerModeType,itemCores,current_page,startNo) {//获取每个小题目
        var question = []
        var qNumer = parseInt(qNumer)
        var answerNumber = parseInt(answerNumber)//选项个数
        var dot = $(".position_TL span").eq(1).offset();
        dot.left = dot.left + 15, dot.top = dot.top + 15//定标点
        var item_w = 16, itemMarginLeft = 13;
        for (var i = 1; i <= qNumer; i++) {//循环每个小题
            var itme_obj = {}
            itme_obj.no = startNo+i-1
            itme_obj.one_score = parseInt(itemCores)
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
                    itme_obj.option_point_y = parseInt(getItemPost(Answerindex)[i].top + 6 - dot.top - 1126*(current_page-1))//同行option_point_y都是一样的 选项框中心点y坐标
                }else if(answerModeType==3){
                    itme_obj.option_point_x = parseInt(getFillPost(Answerindex)[i].left+12-dot.left)
                    itme_obj.option_point_y = parseInt(getFillPost(Answerindex)[i].top+7-dot.top - 1126*(current_page-1))
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
            itme_obj.total_score = parseInt(obj[i - 1].totalCores)//答题总分
            itme_obj.string = answer_id[i - 1].answers.answer_name//大题标题
            itme_obj.answer_id = answer_id[i - 1].answers.answer_id//题组ID
            itme_obj.answer_mode = answerModeType(obj[i - 1].type)//题目类型
            itme_obj.current_page = obj[i - 1].current_page//当前页面
            itme_obj.num_question = parseInt(obj[i - 1].numbel)//题目数量
            itme_obj.region_rect_x = regionRect(i - 1).region_rect_x//题组区域的X坐标
            itme_obj.region_rect_y = regionRect(i - 1).region_rect_y - 1126*(itme_obj.current_page-1)//题组区域的Y坐标
            itme_obj.region_rect_width = 698//题组区域的宽度
            if(obj[i - 1].type==4){//作文题
                itme_obj.region_rect_height = 100//题组区域的高度
            }else {
                itme_obj.region_rect_height = regionRect(i - 1).region_rect_height//题组区域的高度
            }
            itme_obj.question = []
            if(obj[i - 1].type==1||obj[i - 1].type==6||obj[i - 1].type==2){//单选题/多选题/判断题
                itme_obj.block_width = 16//选项宽度
                itme_obj.block_height = 13//选项高度
                itme_obj.answer_count = 1//答案个数
                itme_obj.num_of_option = parseInt(obj[i - 1].itemNumber)//选项个数
            }else if(obj[i - 1].type==3){//填空题
                itme_obj.block_width = 25//选项宽度
                itme_obj.block_height = 14//选项高度
                itme_obj.score_rect_x = fillScoreRect(i - 1).score_rect_x//打分框区域的x坐标
                itme_obj.score_rect_y = fillScoreRect(i - 1).score_rect_y - 1126*(itme_obj.current_page-1)//打分框区域的y坐标
                itme_obj.score_rect_width = fillScoreRect(i - 1).score_rect_width//打分框区域的宽度
                itme_obj.score_rect_height = fillScoreRect(i - 1).score_rect_height//打分框区域的高度
                itme_obj.score_options = fillScoreOptions(i-1,obj[i - 1].type,obj[i - 1].current_page) //打分框坐标
            }else if(obj[i - 1].type==5){//其他题
                itme_obj.block_width = 25//选项宽度
                itme_obj.block_height = 14//选项高度
                itme_obj.score_rect_options = otherFillScoreRect(i - 1,obj[i - 1].current_page)//打分框区域的x坐标
                itme_obj.score_rect_width = 690//打分框区域的宽度
                itme_obj.score_rect_height = 40//打分框区域的高度
                itme_obj.score_options = fillScoreOptions(i-1,obj[i - 1].type,obj[i - 1].current_page)
            }else {//作文题
                itme_obj.block_width = 25//选项宽度
                itme_obj.block_height = 14//选项高度
                itme_obj.score_rect_width = 690//打分框区域的宽度
                itme_obj.score_rect_height = 40//打分框区域的高度
                itme_obj.score_options = fillScoreOptions(i-1,obj[i - 1].type,obj[i - 1].current_page)
            }
            BigQuestion.push(itme_obj)
        }
        for (var i = 0; i < BigQuestion.length; i++) {
            BigQuestion[i].question = getQuestion(obj[i].numbel, obj[i].itemNumber,i,obj[i].type,obj[i].itemCores,obj[i].current_page,obj[i].startNo)
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
        var allList = [];
        if($scope.listObj4.length>0){
            allList = $scope.listObj.concat($scope.listObj2,$scope.listObj3,$scope.listObj4)
            return allList
        }
        if($scope.listObj3.length>0){
            allList = $scope.listObj.concat($scope.listObj2,$scope.listObj3)
            return allList
        }
        if($scope.listObj2.length>0){
            allList = $scope.listObj.concat($scope.listObj2)
            return allList
        }
        if($scope.listObj.length>0){
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
        allList.answer_id = answer_id
        return allList
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
    $scope.start = 0,$scope.end = 1
    function getAnswerInfoTask(type) {//获取生成答题卡
        var isLogin = localStorage.getItem("token");
        $scope.nub = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        $scope.rightNub = ["T","F"]
        $.ajax({
            type: "GET",
            url: ajaxIp+"/api/v2/answers/"+getUrlParam(url, 'examubjeId'),
            headers: {'Authorization': "Bearer " + isLogin},
            async: false,
            success: function(data){
                if(type==0){
                    $scope.bigAnswer = data.answers.filter(function (ele) {//过滤出选择题是非题
                        return ele.type=='xz'||ele.type=='sf'||ele.type=='dx'
                    })
                }else{
                    $scope.bigAnswer = data.answers
                }
                $scope.answers = $scope.bigAnswer.slice($scope.start,$scope.end)//设置答案弹窗数组
                $scope.AnsLen = $scope.answers[0].settings.length
            },
            error: function(){

            }
        });
    }
    $scope.getAnswerInfo = function (type) {
        if($scope.listObj.length<=0){
            alert("请添加客观题")
            return
        }
        if($scope.newAnswerLen>$scope.oldAnswerLen){
            var r=confirm("请保存答题卡")
            if(r){
                $scope.save()
            }else {
                return false
            }
        }
        getAnswerInfoTask(type)
        console.log($scope.bigAnswer)
        if(type==0){//设置答案
            if(!$scope.answers){
                alert("暂无主观题")
                return false
            }
            $('.setAnswer .modal-main').animate({'top': '50%','opacity': 1},500);
            $('.setAnswer .modal-shadow').animate({'opacity': 0.3},500);
            $('.setAnswer').show();
        }
        if(type==1){
            $('.setSort .modal-main').animate({'top': '50%','opacity': 1},500);
            $('.setSort .modal-shadow').animate({'opacity': 0.3},500);
            $('.setSort').show();
        }
    }
    $scope.closeAnswerModel =  function () {//关闭窗口
        $('.modal-wrap').hide();
        $('.modal-main').css({"top":0,"opacity":0})
        $('.modal-shadow').css({"opacity":0})
    }
    $scope.showScore = false
    $scope.checkScore = function () {//切换分数框
        $scope.showScore = !$scope.showScore
    }
    $scope.pageData = function (type) {//翻页
        var len = $scope.bigAnswer.length
        if(type==1){//下一页
            if($scope.end==len){
                $scope.start = $scope.end-1
                $scope.end = len
            }else{
                $scope.start++
                $scope.end++
            }
        }
        if(type==2){//上一页
            if($scope.start==0){
                $scope.start = 0
                $scope.end = 1
            }else{
                $scope.start--
                $scope.end--
            }
        }
        $scope.answers = $scope.bigAnswer.slice($scope.start,$scope.end)
        $scope.AnsLen = $scope.answers[0].settings.length
    }
    $scope.addAnswer = function () {//新增小题答案
        var len = $scope.answers[0].settings.length
        var obj = {}
        obj.score = 1;
        obj.setting_num = parseInt($scope.answers[0].settings[len-1].setting_num)+1
        if($scope.answers[0].type=='xz'){
            obj.setting_result = "0,0,0,0"
        }else{
            obj.setting_result = "0,0"
        }
        var param = {}
        param["answer_setting[answer_id]"] =$scope.answers[0].answer_id//题组id
        param["answer_setting[result]"] =obj.setting_result //答案选项
        param["answer_setting[num]"] =obj.setting_num//题号
        param["answer_setting[score]"] =obj.score//默认1分
        param["answer_setting[type_count]"] = $scope.answers[0].type=='xz'?4:2  //选项个数
        param["answer_setting[sort]"] = obj.setting_num
        param["answer_setting[exam_subject_id]"] = getUrlParam(url, 'examubjeId')
        $scope.AnsLen++
        var isLogin = localStorage.getItem("token");
        $.ajax({
            type:"POST",
            url: ajaxIp+"/api/v2/answer_settings",
            headers: {'Authorization': "Bearer " + isLogin},
            data:param,
            async: false,
            success:function (data) {
                console.log(data)
                obj.setting_id = data.result.id
                $scope.answers[0].settings.push(obj)
            }
        })
    }
    $scope.deleAnswer = function () {//删除小题
        var isLogin = localStorage.getItem("token");
        $scope.AnsLen--
        var setting_id = $scope.answers[0].settings[$scope.AnsLen].setting_id
        $.ajax({
            type: "POST",
            url: ajaxIp+"/api/v2/answer_settings/"+setting_id+"/delete",
            headers: {'Authorization': "Bearer " + isLogin},
            async: false,
            success: function(data){
                console.log(data)
                $scope.answers[0].settings.splice($scope.AnsLen,1)
            },
            error: function(){

            }
        });
    }
    $scope.selectBigQuestion = function (index) {//选中题目
        $scope.sortIndex = index
    }
    // 交换数组元素
    var swapItems = function(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    };

    // 上移
    $scope.upRecord = function(arr, $index) {
        if($index == 0) {
            return;
        }
        $scope.sortIndex--
        swapItems(arr, $index, $index - 1);
        swapItems(answer_id, $index, $index - 1);
        swapItems($scope.listObj, $index, $index - 1);
    };

    // 下移
    $scope.downRecord = function(arr, $index) {
        if($index == arr.length -1) {
            return;
        }
        $scope.sortIndex++
        swapItems(arr, $index, $index + 1);
        swapItems(answer_id, $index, $index + 1);
        swapItems($scope.listObj, $index, $index + 1);
    };

    //比较相邻的table高度大小
    function compare(index) {
        var currenTatble = $("body").find("table").eq(index)//当前table
        var currenTatbleHeight = currenTatble.height()
        var nextTatbleHeight = currenTatble.next().height()
        var result = currenTatbleHeight - currenTatbleHeight > 0?true:false
        return result

    }
<<<<<<< HEAD
    //查找每个Scope最多中有table
    function findScopeList() {
        var Scon
        var dom = $(".A_Rone")
        dom.each(function () {
            console.log($(this).find("table").length)
        })
=======
    //查找在那个全局变量删除元素
    function findScopeList(index) {
        var len1 = $scope.listObj.length,len2 = $scope.listObj2.length,len3 = $scope.listObj3.length,len4 = $scope.listObj4.length
        if(index<len1){
            $scope.listObj.splice(index,1)
            console.log("删除list1")
        }
        if(index>=len1&&index<len1+len2){
            $scope.listObj2.splice(index-len1,1)
            console.log("删除list2")
        }
        if(index>=len1+len2&&index<len1+len2+len3){
            $scope.listObj3.splice(index-len1-len2,1)
            console.log("删除list3")
        }
        if(index>=len1+len2+len3&&index<len1+len2+len3+len4){
            $scope.listObj4.splice(index-len1-len2-len3,1)
            console.log("删除list4")
        }
        console.log(len1,len2,len3,len4,index)
>>>>>>> develop
    }
    //删除题组
    $scope.delAnswerGroup = function () {
        var answer_id_item = $scope.bigAnswer[$scope.sortIndex].answer_id
        var answer_sort = $scope.bigAnswer[$scope.sortIndex].answer_sort-1//排序sort
        var isLogin = localStorage.getItem("token");
        var allListData = allList()
        var allListId = allListData.answer_id
        for(var i = 0;i<allListId.length;i++){
            if(allListId[i].answers.answer_id==answer_id_item){
                var index = i
            }
        }
        $scope.bigAnswer.splice($scope.sortIndex,1)
        findScopeList($scope.sortIndex)
        allListId.splice(index,1)
        // $.ajax({
        //     type: "POST",
        //     url: ajaxIp+"/api/v2/answers/delete",
        //     headers: {'Authorization': "Bearer " + isLogin},
        //     data:{'id':answer_id_item},
        //     async: false,
        //     success: function(data){
        //         console.log(data)
        //         $scope.bigAnswer.splice($scope.sortIndex,1)
        //
        //         findScopeList($scope.sortIndex)
        //         $.ajax({
        //             type: "POST",
        //             url: ajaxIp+"/api/v2/answer_regions/update_basic_info_region",
        //             headers: {'Authorization': "Bearer " + isLogin},
        //             data:{
        //                 'exam_subject_id':getUrlParam(url, 'examubjeId'),
        //                 'basic_info_region':JSON.stringify(allListData)
        //             },
        //             async: false,
        //             success: function(data){
        //
        //             },
        //             error: function(){
        //
        //             }
        //         });
        //     },
        //     error: function(){
        //
        //     }
        // });
    }
    /**
     * 设置每题答案
     * @param outerIndex 最外层索引
     * @param parentIndex 父级索引
     * @param index 自己索引
     */
    $scope.setItemAnswer = function (outerIndex,parentIndex,index,setting_result,setting_id) {//设置每题答案
        var setting_result= setting_result.split(',')
        if(setting_result[index]==0){
            setting_result[index] = 1
        }else{
            setting_result[index] = 0
        }
        var result = setting_result.join(',')
        var isLogin = localStorage.getItem("token");
        $.ajax({
            type: "POST",
            url: ajaxIp+"/api/v2/answer_settings/"+setting_id,
            headers: {'Authorization': "Bearer " + isLogin},
            data:{
                'answer_setting[result]':result
            },
            async: false,
            success: function(data){
                $scope.answers[outerIndex].settings[parentIndex].setting_result = result
            },
            error: function(){

            }
        });
    }
    $scope.setItmeScore = function (setting_id,score) {//设置每小题分数
        var isLogin = localStorage.getItem("token");
        $timeout(function () {
            $.ajax({
                type: "POST",
                url: ajaxIp+"/api/v2/answer_settings/"+setting_id,
                headers: {'Authorization': "Bearer " + isLogin},
                data:{
                    'answer_setting[score]':score
                },
                async: false,
                success: function(data){
                    console.log(data)
                },
                error: function(){

                }
            });
        },500)
    }
    $scope.setItmeNum = function (setting_id,num) {//设置题目序号
        var isLogin = localStorage.getItem("token");
        $timeout(function () {
            $.ajax({
                type: "POST",
                url: ajaxIp+"/api/v2/answer_settings/"+setting_id,
                headers: {'Authorization': "Bearer " + isLogin},
                data:{
                    'answer_setting[num]':num
                },
                async: false,
                success: function(data){
                    console.log(data)
                },
                error: function(){

                }
            });
        },500)
    }
    $scope.save = function () {//保存模板
        if($scope.listObj.length<=0){
            alert("请添加题组")
           return
        }
        var isLogin = localStorage.getItem("token");
        var answer_ids = []
        // console.log(getBigQuestion(allPagePost()))
        for(var i = 0;i<answer_id.length;i++){
            answer_ids.push(answer_id[i].answers.answer_id)
        }
        $.ajax({
                type: "POST",
                url: ajaxIp + "/api/v2/answer_regions",
                headers: {'Authorization': "Bearer " + isLogin},
                async: false,
                data: {
                    'answer_region[exam_subject_id]': getUrlParam(url, 'examubjeId'),//科目ID
                    'answer_region[anchor]': JSON.stringify(getPostDot()),//四个锚点
                    'answer_region[region_info]': JSON.stringify(getBigQuestion(allPagePost())),//所有坐标信息
                    'answer_region[basic_info_region]':JSON.stringify(allList()),//存储页面题目
                    'page':$(".A_R").length
                },
                success: function (data) {//绑定题组以便刷新后删除没用的
                    $scope.oldAnswerLen = answer_id.length
                    $.ajax({
                            type: "POST",
                            url: ajaxIp + "/api/v2/answer_region_binds",
                            headers: {'Authorization': "Bearer " + isLogin},
                            async: false,
                            data: {
                                'exam_subject_id': getUrlParam(url, 'examubjeId'),//科目ID
                                'answer_region_id': data.message,
                                'answer_ids':answer_ids.join(",")
                            },
                            success: function (data) {
                                alert("保存成功")
                                console.log(data)
                            }
                        }
                    )
                }
            }
        )
    }
    window.onbeforeunload = function(){//离开刷新提醒
        if($scope.newAnswerLen>$scope.oldAnswerLen){
            return "您修改了内容,请保存答题卡"
        }
    }
    $scope.closeUteroBox = function () {//关闭离开
        if($scope.newAnswerLen>$scope.oldAnswerLen){
            var r=confirm("请保存答题卡")
            if(r){
                $scope.save()
            }else{
                window.location.href = 'paper_generate.html'
            }
        }else{
            window.location.href = 'paper_generate.html'
        }
    }

})


