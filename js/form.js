
// 成绩生成
$(function(){
    // 考试科目下拉
   $(".main_right").children("div").eq(6).show().siblings().hide();


    $(".l_ul").on("click", "li", function(){  
       
       $(this).addClass('li_click').siblings().removeClass("li_click");
       $(".main_right").children("div").eq($(this).index()).show().siblings().hide();
       
    
    });
    // 学科追踪分析下拉
    $("#study_k_left").click(function(event) {
        /* Act on the event */
        $(this).css("margin-bottom","220px");
        $(".study_k_left").show();
    });
$("#study_k_left").siblings("li").click(function(event) {
        /* Act on the event */
        $("#study_k_left").css("margin-bottom","15px");
       $(".study_k_left").hide();
    });
// 考试质量追踪下拉
 $("#exam_z_left").click(function(event) {
        /* Act on the event */
        $(this).css("margin-bottom","130px");
        $(".exam_z_left").show();
    });
$("#exam_z_left").siblings("li").click(function(event) {
        /* Act on the event */
        $("#exam_z_left").css("margin-bottom","15px");
       $(".exam_z_left").hide();
    });
// 考试横向分析下拉
 $("#exam_h_left").click(function(event) {
        /* Act on the event */
        $(this).css("margin-bottom","150px");
        $(".exam_h_left").show();
    });
$("#exam_h_left").siblings("li").click(function(event) {
        /* Act on the event */
        $("#exam_h_left").css("margin-bottom","15px");
       $(".exam_h_left").hide();
    });









    $("#mark_02_ul i").click(function(event) {
    /* Act on the event */
    $(this).parent().next().toggle();
    $(this).hide();
    $(this).siblings().show();
}); 
// 分析
$(".mark_02 button").click(function(event) {
    /* Act on the event */
    $(".mart_set").show();
    $(".mark_02").css("margin-bottom","1500px");
});
$("#set_04").click(function(event) {
    /* Act on the event */
    $(".mart_set").hide();
    $(".mark_02").css("margin-bottom","0px");
});
$(".mart_set_03 button").click(function(event) {
    /* Act on the event */
    $(this).parent().hide();
});
$(".mark_add").click(function(event) {
    /* Act on the event */
    $('.mart_set_03 ul').append('<li><input></input><input></input><button type="" class="iLabel">-</button></li>');
});

$(document).on('click','.iLabel',function(){
    $(this).parent().hide();
});
   
//考时状况
// 选择考试下拉
$(".i1").html("上师大高二期末考试");
$(".i2").html("数学");
$(".sn_1").hide();
$(".sn_2").hide();
$(document).ready(function(){
  $("#i_1").click(function(){
  $(".sn_1").toggle();
  $(".sn_2").hide();
  });
  $("#i_2").click(function(){
  $(".sn_2").toggle();
  $(".sn_1").hide();
});
$(".u_1").on("click","li",  function(){  
        var c = $(this).html();
         $(".i1").html(c);
         $(".sn_1").hide();
      
});  
  $(".u_2").on( "click","li", function(){  
        var c = $(this).html();
         $(".i2").html(c);
         $(".sn_2").hide();
      
});  
  
});
        








// 基本情况插件
var myChart = echarts.init(document.getElementById('right_02_r')); 
var labelTop = {
    normal : {
        label : {
            show : true,
            position : 'center',
            formatter : '{b}',
            textStyle: {
                baseline : 'bottom'
            }
        },
        labelLine : {
            show : false
        }
    }
};
var labelFromatter = {
    normal : {
        label : {
            formatter : function (params){
                return 100 - params.value + '%'
            },
            textStyle: {
                baseline : 'top'
            }
        }
    },
}
var labelBottom = {
    normal : {
        color: '#ccc',
        label : {
            show : true,
            position : 'center'
        },
        labelLine : {
            show : false
        }
    },
    emphasis: {
        color: 'rgba(0,0,0,0)'
    }
};
var radius = [40, 55];
option = {
    legend: {
        x : 'center',
        y : 'center',
        data:[ 
        ]
    },  
    series: [
        {
            type : 'pie',
            center : ['12%', '30%'],
            radius : radius,
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:46, itemStyle : labelBottom},
                {name:'GoogleMaps', value:54,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['37%', '30%'],
            radius : radius,
            x:'20%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:56, itemStyle : labelBottom},
                {name:'Facebook', value:44,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['62%', '30%'],
            radius : radius,
            x:'40%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:65, itemStyle : labelBottom},
                {name:'Youtube', value:35,itemStyle : labelTop}
            ]
        },
        
    ]
};
                    

 myChart.setOption(option);










// 分数分布插件
 var myChart = echarts.init(document.getElementById('right_03')); 
        
        var option = {
    
    tooltip : {
        trigger: 'axis'
    },
    grid:{
                    x:28,
                    y:23,
                    x2:5,
                    y2:25,
                    borderWidth:1
                },
    
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['10','20','30','40','50','60','70','80','90','100','110','120','130',"140","150"]
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series: [
        {
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        }
    ]
};
        // 为echarts对象加载数据 
        myChart.setOption(option); 







// 年级学科趋势
var myChart = echarts.init(document.getElementById('right_04')); 
        
       var option = {
    tooltip : {
        trigger: 'axis'
    },
    grid:{
                    x:28,
                    y:30,
                    x2:10,
                    y2:25,
                    borderWidth:1
                },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['上海一模拟考试','上海一模拟考试','上海一模拟考试','上海一模拟考试','上海一模拟考试','上海一模拟考试','']
        }
    ],
    yAxis : [
        {
           
            type : 'category',
            boundaryGap : false,
            data : ['0','30','60','90','120','150']
           // --min: 0,
           //max: 100,
          // interval:20,
        }
    ],
    series : [
        {
            name:'最高分数',
            type:'line',
            data:[60, 90, 110, 120, 130, 150, 140],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        }
        
    ]
};
                    
        // 为echarts对象加载数据 
        myChart.setOption(option); 





// 年级成绩大幅变化
$("#myselect").change(function(event) {
        /* Act on the event */
        var nub=$("#myselect").find("option:selected").text();
        console.log(nub);
        if(nub==20||nub==40){
$("#right_5").css("height","228px")
$("#main_right").css("height","1540px")
        }else{
            $("#right_5").css("height","387px")
      $("#main_right").css("height","1650px")
        }
        
    });
// 班级学情追踪
var myChart = echarts.init(document.getElementById('study_q_03_02')); 
        
 var option = {
    
    tooltip : {
        trigger: 'axis'
    },
    grid:{
                    x:28,
                    y:23,
                    x2:5,
                    y2:25,
                    borderWidth:1
                },
    
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['10','20','30','40','50','60','70','80','90','100','110','120','130',"140","150"]
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series: [
        {
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        }
    ]
};
        // 为echarts对象加载数据 
        myChart.setOption(option); 







// 班级学情追踪  start

// 小题查看
$(".study_q_05_01 td span").click(function(event) {
        /* Act on the event */
        $("#study_q_ck").hide();
        $(".ck_1").show();
    });


// <!--班级学情追踪 end-->

// <!--学科追踪分析 start-->
$(".study_k_left li").click(function(event) {
    /* Act on the event */
   $(this).css("color","#31bc91").siblings().css("color","#999999");
   $(".study_k_b").html($(this).html());
   $(".study_k_tab div").eq($(this).index()).show().siblings().hide();

});





/*<!--学科追踪分析 end-->*/
// <!-- 考试质量追踪  start-->




$(".exam_z_left li").click(function(event) {
    /* Act on the event */

   $(this).css("color","#31bc91").siblings().css("color","#999999");
   $(".exam_z_b").html($(this).html());
   $(".exam_z_tab div").eq($(this).index()).show().siblings().hide();

});


$("#exam_z_left").click(function(event) {
    /* Act on the event */
    $(".exam_z_101 span").eq(1).hide();
    $(".exam_z_101 span").eq(2).hide();
});
$("#exam_z_left_2l").click(function(event) {
    /* Act on the event */
    $(".exam_z_101 span").eq(1).show();
    $(".exam_z_101 span").eq(2).show();
});

$("#exam_z_left_3l").click(function(event) {
    /* Act on the event */
    $(".exam_z_101 span").eq(1).hide();
});



// 难度系数变化图
var myChart = echarts.init(document.getElementById('exam_z_303')); 
        
       var option = {
    
    grid:{
                    x:28,
                    y:30,
                    x2:10,
                    y2:25,
                    borderWidth:1
                },
    tooltip : {
        trigger: 'axis'
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['1','2','3','4','5','6','7','8','9','10','11','12','13','14'
                   ,'15','16','17','18','19','20','21','22']
        }
    ],
    yAxis : [
        {   
          type : 'value',
            data : ['0','0.2','0.4','0.6','0.8','1'] 
        }
    ],
    series : [
        {
            name:'试题难度',
            type:'line',
            data:[0.5, 0.6, 0.7,0.4, 0.3, 0.6, 0.3, 0.6, 0.7,0.4, 0.3, 0.6, 0.3
                 , 0.6, 0.7,0.4, 0.3, 0.6, 0.3, 0.3, 0.6, 0.9],
            markPoint : {
                data : [
                  
                ]
            }
        }
        
    ]
};
                    
        // 为echarts对象加载数据 
        myChart.setOption(option); 












// <!-- 考试质量追踪  end-->
// <!-- 考试横向分析 start -->

$(".exam_h_left li").click(function(event) {
    /* Act on the event */
    
   $(this).css("color","#31bc91").siblings().css("color","#999999");
   $(".exam_h_b").html($(this).html());
   $(".exam_h_tab").children("div").eq($(this).index()).show().siblings().hide();
});
// 控制select的数量
$("#exam_h_left").click(function(event) {
    /* Act on the event */

$(".exam_h_101 span").eq(2).hide();

});
$("#exam_h_left_1l").click(function(event) {
    /* Act on the event */
$(".exam_h_101 span").eq(2).hide();

});

$("#exam_h_left_2l").click(function(event) {
    /* Act on the event */

$(".exam_h_101 span").eq(2).show();

});
$("#exam_h_left_3l").click(function(event) {
    /* Act on the event */

$(".exam_h_101 span").eq(2).show();

});
$("#exam_h_left_4l").click(function(event) {
    /* Act on the event */

$(".exam_h_101 span").eq(2).show();

});


// 班级等级分布详细

$(".exam_h_201 tr span").click(function(event) {
    /* Act on the event */
$(".exam_h_x01").hide();
$(".exam_h_201_x").show();

});
$("#exam_h_201_x_i").click(function(event) {
    /* Act on the event */
$(".exam_h_x01").show();
$(".exam_h_201_x").hide();

});



// 总分分段对比
var myChart = echarts.init(document.getElementById('exam_h_301'));

        // 指定图表的配置项和数据
     var option = {
    title : {
        subtext: '百分比%'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['本校','本班']
    }, 
    grid:{
                   
                    x2:50,
                    y2:35,
                    borderWidth:1
                },
    
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['150-200','200-250','250-300','350-400','400-450','450-500','500-550','550-600','650-700','700-750']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'本校',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'本班',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint : {
                data : [
                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            }
        }
    ]
};
                    
                    
        // 为echarts对象加载数据 
        myChart.setOption(option); 
// 名次各班分布

var myChart = echarts.init(document.getElementById('exam_h_402'));

        // 指定图表的配置项和数据
     var option = {
    title : {
        text: '前100名各个班级的分布情况',
        subtext: '相当对于整个考试',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['高一1班','高一2班','高一3班','高一4班','高一5班']
    },
   
    calculable : true,
    series : [
        {
            name:'所占比例',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'高一1班'},
                {value:310, name:'高一2班'},
                {value:234, name:'高一3班'},
                {value:135, name:'高一4班'},
                {value:1548, name:'高一5班'}
            ]
        }
    ]
};
                    
                    
                    
        // 为echarts对象加载数据 
        myChart.setOption(option); 


// <!-- 考试横向分析 end -->
/*<!-- 跨校对比分析  start-->*/







});   











