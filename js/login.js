 $(document).ready(function () {  
  if ($.cookie("login-remmeber") == "true") {  
      $("#login-remmeber").attr("checked", true);  
      $("#login-name").val($.cookie("login-name"));    
  }  
  var isLogin = localStorage.getItem("token");
  if(isLogin){
    window.location.href = "./index";
  }

  $(document).keyup(function(event){
      if(event.keyCode ==13){
        $(".login-btn").trigger("click");
      }
  })

  $('.login-btn').on('click', function(){
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