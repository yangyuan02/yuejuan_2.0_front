 $(document).ready(function () {  
  if ($.cookie("login-remmeber") == "true") {  
      $("#login-remmeber").attr("checked", true);  
      $("#login-name").val($.cookie("login-name"));    
  }  
  var isLogin = localStorage.getItem("token");
  if(isLogin){
    window.location.href = "./index";
  }

     function IEVersion() {
         var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
         var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
         var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
         var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
         if(isIE) {
             var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
             reIE.test(userAgent);
             var fIEVersion = parseFloat(RegExp["$1"]);
             if(fIEVersion == 7) {
                 return 0;
             } else if(fIEVersion == 8) {
                 return 0;
             } else if(fIEVersion == 9) {
                 return 0;
             } else if(fIEVersion == 10) {
                 return 0;
             } else {
                 return 0;//IE版本<=7
             }
         } else if(isEdge) {
             return 0;//edge
         } else if(isIE11) {
             return 0; //IE11
         }else{
             return -1;//不是ie浏览器
         }
     }

     if(IEVersion()==0){//是否为ie浏览器
         alert("请下载谷歌浏览器或者360极速浏览器")
         return false
     }

  $(document).keyup(function(event){
      if(event.keyCode ==13){
        $(".login-btn").trigger("click");
      }
  })

  $('.login-btn').on('click', function(){

      if(IEVersion()==-1){//是否为ie浏览器
          alert("请下载谷歌浏览器或者360极速浏览器")
          return false
      }

    save();
    var password = $.base64.encode($("#login-pwd").val())
      $.ajax({
          type: "POST",
          url: ajaxIp+"/api/v2/login.json",
          data: {
            'username':$("#login-name").val(),
            'password': password
          },
          dataType: "JSON",
          success: function(data){
            console.log(data)
            if(data.action){
              console.log(data.action)
              // $('.login').hide();
              // $('.login-shadow').hide();
              // $('.login-animate').show();
              localStorage.setItem("token", data.token);
              localStorage.setItem("action", data.action);
              window.location.href = "./user_information";
              // setTimeout(function(){
              //   window.location.href = "./index";
              // },1000)

            }else if (data.token) {
              // $('.login').hide();
              // $('.login-shadow').hide();
              // $('.login-animate').show();
              localStorage.setItem("token", data.token);
              // setTimeout(function(){
              window.location.href = "./index";
              // },1000)
              
            }else{
              $('.login-propmt').show();
            } 
          },
          error: function(){
            alert('请稍后从新尝试登录或者联系管理员')
          }
      });
    });

    $('.login-input').focus(function(){
      $(this).parent().addClass('login-input-in')
      $('.login-propmt').hide();
    });
    $('.login-input').blur(function(){
      $(this).parent().removeClass('login-input-in')
      $('.login-propmt').hide();
    });
    
});
// 13761389705 
function save() {  
  if($("#login-remember.checked").length){  
      var loginName = $("#login-name").val();  
      $.cookie("login-remember", "true", { expires: 7 });
      $.cookie("login-name", loginName, { expires: 7 });  
  }else{  
      $.cookie("login-remember", "false", { expire: -1 });  
      $.cookie("login-name", "", { expires: -1 });  
  }  
}; 