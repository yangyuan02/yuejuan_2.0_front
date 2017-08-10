var m1 = angular.module("pro", []);
//设置控制器
m1.controller("demo", ["$scope", function ($scope) {
    $scope.listObj = [];//定义全局数组保存所有题目
    $scope.listObj2 = [];//定义全局数组保存所有题目
    $scope.result = {};//弹出框保存
//点击显示
    $scope.add = function (index) {
        $scope.index = index
        clear()
    };
    $scope.setNumber = function (obj,num) {
        //放入添加的题目编号
        var array = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
        for (var i = 0; i < obj.length; i++) {
            if (i < 10) {
                obj[i].title = array[i+num];
            } else if (10 <= i < 20) {
                obj[i].title = array[9] + array[i+num - 10];
            } else if (20 <= i < 30) {
                obj[i].title = array[1] + array[9] + array[i - 20];
            } else if (30 <= i < 40) {
                obj[i].title = array[2] + array[9] + array[i - 30];
            } else if (40 <= i < 50) {
                obj[i].title = array[3] + array[9] + array[i - 40];
            }
        }
    }
//确认添加
    $scope.btn1 = function () {
        //添加选择题的存储
        var obj = {};
        var noarray = []
        obj.thr = [];
        obj.no = [];
        var nub = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        $scope.nubarray = nub.slice(0, $scope.result.thr);//选项个数
        var totaltwo = parseInt($scope.result.numbel) * parseInt($scope.result.two)//总分数
        for (var i = 0; i < parseInt($scope.result.numbel); i++) {//多少个小题
            if (i <= 8) {
                noarray.push('0' + (i + parseInt($scope.result.no)));
            } else {
                noarray.push(i + parseInt($scope.result.no));
            }
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
            type:$scope.index//题目类型
        };
        // setTimeout(function () {//第一页620px
            var height = $(".A_Rone_child").get(0).offsetHeight;//获取每次生成模版的高度
            if(height>620){
                $scope.listObj2.push(obj);
                $scope.setNumber($scope.listObj2,$scope.listObj.length)
            }else{
                $scope.listObj.push(obj);
                $scope.setNumber($scope.listObj,0)
            }
        // }, 0)
        clear()
        close()
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
}])
m1.filter("noa", function () {
    return function (input) {
        if (Number(input) > 10 && Number(input) % 10 != 0) {
            return input.substring(1)
        }
        return input
    }
})

