 $(document).ready(function () {  
    if ($.cookie("login-remmeber") == "true") {  
        // $("#login-remmeber").attr("checked", true);  
        $("#login-name").val($.cookie("login-name"));  
        // $("#login-pwd").val($.cookie("login-pwd"));  
    }  
	$(document).keyup(function(event){ 
	    if(event.keyCode ==13){ 
	    	$(".login-btn").trigger("click"); 
	    } 
	});


    $('.login-btn').on('click', function(){

		save();
		var password = $.base64.encode($("#login-pwd").val())
   //  	$.ajax({
      //   	type: "GET",
      //   	url: "#",
      //   	data: {
      //   		'username':$("#login-name").val(), 
      //   		'password': password
      //   	},
      //   	dataType: "JSON",
      //   	success: function(data){
      //   		sessionStorage.setItem("isLogin", data);
      //       	save();
      //       },
      //       error: function(){
      //       	$('.login-propmt').show();
      //       }
     	// });
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
function save() {  
    if($("#login-remember.checked").length){  
        var loginName = $("#login-name").val();  
        // var loginPwd = $("#login-pwd").val();  
        $.cookie("login-remember", "true", { expires: 7 });
        $.cookie("login-name", loginName, { expires: 7 });  
        // $.cookie("login-pwd", loginPwd, { expires: 7 });  
        alert(1)
    }else{  
        $.cookie("login-remember", "false", { expire: -1 });  
        $.cookie("login-name", "", { expires: -1 });  
        // $.cookie("login-pwd", "", { expires: -1 });  
    }  
}; 