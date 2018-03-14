var m1 = angular.module("answer", []);

//设置控制器
m1.controller("answer", function ($scope, $timeout, $http) {

    $scope.marks = ['0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','.5','']//打分框
    
    var options = ['A','B','C','D','E','F','G','H','I','J','K','H']
    
    var isLogin = localStorage.getItem("token"); //token

    var examubjeId = getUrlParam(window.location,'examubjeId') //examubjeId

    $scope.model = {} //弹窗数据

    $scope.data = {} //整个页面数据
    $scope.data.pages = [{},{},{},{}] //多少页数
    $scope.data.pages[0].pageA = []
    $scope.data.pages[0].pageB = []
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
     * 点击显示题组弹窗
    */
    $scope.showQuestioModel = function(index){
        $scope.model = {}
        if(index==0){
            $scope.model.isradio = 1
        }
        if(index==3){
            $scope.model.isradio = 3
        }
        $scope.showIndex = index
        $scope.model.type = index
        $(".sub_menu").css({"display":"block"})
    }
    /** 
     * 关闭添加题组弹窗
    */
    $scope.cloesQuestionMode = function(){
        $(".sub_menu").css({"display":"none"})
    }
    /**
     * 切换/单选题/多选题/作文格式
     * @param {*} index 
     */
    $scope.checkbox = function(index){
        if(index==2){
            $scope.model.type = 5 //多选题
        }
        $scope.model.isradio = index
    }
    /** 
     * 序列化为html模板格式
    */
    $scope.formatTemplateHtml = function(){
        $scope.model.arrStartnNmber = [] //小题序号数组
        $scope.model.itemscoreS = [] //小题分值数组
        $scope.model.totalCores = parseInt($scope.model.number) * parseInt($scope.model.itemscore)//总分数

        if($scope.model.type == 0){//单选选择题
            $scope.model.options = options.slice(0,$scope.model.count)
        }

        if($scope.model.type == 1){//判断题
            $scope.model.options = ['T','F']
        }

        if($scope.model.type == 3){//作文题
            $scope.model.number = 1
            $scope.model.totalCores = parseInt($scope.model.w_totalscore)
        }

        for (var i = 0; i < parseInt($scope.model.number); i++) {
            $scope.model.arrStartnNmber.push(i + parseInt($scope.model.startnumber));
            $scope.model.itemscoreS.push(parseInt($scope.model.type==3?$scope.model.w_totalscore:$scope.model.itemscore))
        }
        console.log($scope.model)
    }
    /**
     *添加按钮
     */
    $scope.add = function(){
        $scope.formatTemplateHtml()
        $scope.cloesQuestionMode()
    }
    
    /** 打印*/
    $scope.print = function(){
        window.print()
    }

})


