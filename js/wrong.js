 $(document).ready(function(){
      //切换模块
    $(".wrong_left_ul li").click(function(event) {
   var a=$(this).index();
    $(this).attr("id",'wrong_left_li').siblings().attr("id",'');
    $(".wrong_top").html($(this).html());
    $(".wrong_main").children('div').eq(a).show().siblings().hide();
    $(".wrong_main").children('div').eq(a).show().siblings().children('.ans').hide();
     });

})