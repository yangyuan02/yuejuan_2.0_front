
// 成绩生成
$(function(){
    // 考试科目下拉
   $(".main_right").children("div").eq(2).show().siblings().hide();


    $(".l_ul").on("click", "li", function(){  
        
       $(this).addClass('li_click').siblings().removeClass("li_click");
       $(".main_right").children("div").eq($(this).index()).show().siblings().hide();
    
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
});
$("#set_04").click(function(event) {
    /* Act on the event */
    $(".mart_set").hide();
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
        {
            type : 'pie',
            center : ['86%', '30%'],
            radius : radius,
            y: '55%',   // for funnel
            x:'80%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:89, itemStyle : labelBottom},
                {name:'Instagram', value:11,itemStyle : labelTop}
            ]
        }
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
    series : [
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
        },
        {
  
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
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value',
           // --min: 0,
           //max: 100,
          // interval:20,
        }
    ],
    series : [
        {
            name:'最高气温',
            type:'line',
            data:[11, 11, 15, 13, 12, 13, 10],
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
        },
        {
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
    series : [
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
        },
        {
  
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












});   
// 班级学情追踪  start


// <!--班级学情追踪 end-->












