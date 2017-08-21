angular.module("myApp", ["ui.router","myApp.controller"])
    .config(function($stateProvider, $urlRouterProvider) {
        var isLogin = localStorage.getItem("token");
        $.ajax({
        async:false,
        type: "GET",
        url: ajaxIp + "/api/v2/user_detail",
        dataType: "JSON",
        headers: {
            'Authorization': "Bearer " + isLogin
        },
        success: function(data) {
            role_name = data.role_name
            if (role_name == "教师") {
                $(".main_left a").eq(0).hide();
                $(".main_left a").eq(0).removeClass('li_click');
              $(".main_left a").eq(1).addClass('li_click');
                $("#index_span").html($(".main_left a").eq(1).html());
                $(".study_k_left").css("top", "190px");
                $(".exam_z_left").css("top", "260px");
                $(".exam_h_left").css("top", "328px");
                $(".sc_left").css("top", "397px");

                var a=$(".li_click").attr("ui-sref");
                console.log('/'+a);
                // window.location.reload($urlRouterProvider.otherwise('/'+a))
                $urlRouterProvider.otherwise('/'+a);
                // window.onload=function(){
                // $urlRouterProvider.otherwise('/'+a);
                // }

            }else{
               $urlRouterProvider.otherwise("/form01");
            }
        },
        error: function() {

        }
    });
        $stateProvider
            .state("form01", {
                url: "/form01",
                templateUrl: "views/form01.html",
                controller:"form01Controller"
            })
            .state("form02", {
                url: "/form02",
                templateUrl: "views/form02.html",
                controller:"form02Controller"
            })
            .state("form03", {
                url: "/form03",
                templateUrl: "views/form03.html",
                controller:"form03Controller" 
            })
            .state("form04", {
                url: "/form04",
                templateUrl: "views/form04.html",
                controller:"form04Controller"
            })
            .state("form05", {
                url: "/form05",
                templateUrl: "views/form05.html",
                controller:"form05Controller"
            })
            .state("form06", {
                url: "/form06",
                templateUrl: "views/form06.html",
                controller:"form06Controller"
            })
            .state("form07", {
                url: "/form07",
                templateUrl: "views/form07.html",
                controller:"form07Controller"
            })
    });