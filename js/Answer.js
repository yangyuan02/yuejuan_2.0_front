var m1 = angular.module("answer", []);

//设置控制器
m1.controller("answer", function ($scope, $timeout, $http) {

    $scope.marks = ['0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','.5','']//打分框

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

    var isLogin = localStorage.getItem("token"); //token

    var examubjeId = getUrlParam(window.location,'examubjeId') //examubjeId

    $scope.model = {} //弹窗数据
    /** 
     * 点击添加题组
    */
    $scope.showQuestioModel = function(index){
        $scope.showIndex = index
        $(".sub_menu").css({"display":"block"})
    }
    /** 
     * 关闭添加题组弹窗
    */
    $scope.cloesQuestionMode = function(){
        $(".sub_menu").css({"display":"none"})
    }

    $scope.data = {} //整个页面数据
    $scope.data.pages = [{},{},{},{}] //多少页数
    $scope.data.pages[0].pageA = []
    $scope.data.pages[0].pageB = []


    console.log($scope.data)
    /** 打印*/
    $scope.print = function(){
        window.print()
    }

})


