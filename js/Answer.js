var m1 = angular.module("answer", []);

//设置控制器
m1.controller("answer", function ($scope, $timeout, $http) {

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


