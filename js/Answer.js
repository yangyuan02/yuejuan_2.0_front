var m1 = angular.module("pro", []);
//设置控制器
m1.controller("demo", function ($scope, $timeout) {
    $scope.page_num = 0 //页数
    $scope.listObj = [];//定义全局数组保存所有题目
    $scope.listObj2 = [];//定义全局数组保存所有题目
    $scope.result = {};//弹出框保存
//点击显示
    $scope.add = function (index) {
        $scope.index = index
        clear()
    };
    $scope.Q_number = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十",'十一','十二','十三','十四','十五','十六','十七','十八','十九','二十']
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
    $scope.isLine = function (type,num,page_num) {//是否换行
        var type = parseInt(type)
        var num =  parseInt(num)
        var title_h = 40,item = 30;
        var page_top = page_num==0?290:0
        var page = 946
        var marking = (type==1||type==2)?0:40
        var page_prev = page_num==0?0:page_num*page
        var height = $(".A_Rone_child").get(page_num).offsetHeight;//获取每次生成模版的高度
        var isB = page-page_top-height-title_h-(Math.ceil(num/4)*item)-60-page_prev<0?true:false
        console.log(page-page_top-height-title_h-(Math.ceil(num/4)*item)-60-page_prev)
        return isB
    }
    $scope.append = function (obj) {//push数据
        if($scope.listObj2.length>0){
            $scope.page_num = 1
        }
        var isB = $scope.isLine($scope.index,$scope.result.numbel,$scope.page_num)
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
    function getItemLine(num1,num2){//获取多少行列
        var table = {}
        if(num2<=7){
            table.row = Math.ceil(num1/4)
            table.column = 4
        }else if(num2>7&&num2<=10){
            table.row = Math.ceil(num1/2)
            table.column = 2
        }else{
            table.row = num1
            table.column = 1
        }
        return table
    }
    function getQuestion(qNumer,answerNumber) {//获取每个题目
        var question = []
        var qNumer = parseInt(qNumer)
        // var getItemLine = getItemLine(qNumer,answerNumber)
        for(var i = 1;i<=qNumer;i++){//循环每个小题
            var itme_obj = {}
            itme_obj.no = i
            itme_obj.option = []
            question.push(itme_obj)
        }
        for(var i = 0;i<question.length;i++){
            var answerNumber = parseInt(answerNumber)//选项个数
            var dot = $(".position_TL span").eq(1).offset()//定标点
            var item_w = 17,item_h = 22,itemMarginLeft = 5,itemMarginTop = 12;
            var item = $(".A_Rone_child").eq(0).find("table").eq(0).find("b").eq(0).offset()//item坐标
            var option_point_x = parseInt(item.left)-parseInt(dot.left)
            var option_point_y = parseInt(item.top)-parseInt(dot.top)
            for(var j = 1;j<=answerNumber;j++){
                var itme_obj = {}
                itme_obj.no = j
                itme_obj.option_point_x = option_point_x+(item_w+itemMarginLeft)*j
                itme_obj.option_point_y = option_point_y//同行option_point_y都是一样的
                question[i].option.push(itme_obj)
            }
        }
        console.log(question)
    }
})


