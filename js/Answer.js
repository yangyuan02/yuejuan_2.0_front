var m1 = angular.module("pro",[]);
//设置控制器
m1.controller("demo",["$scope","$compile",function($scope,$compile){
	$scope.listObj=[];//定义全局数组保存所有题目
//	点击打印
	$scope.dayin = function(){};
//	点击回退
	$scope.backs =function(){};
//	点击撤销
	$scope.backt = function(){};
//	点击加粗
	$scope.strons = function(){};
//	点击倾斜
	$scope.slope = function(){};
//	点击添加下滑线
	$scope.unline = function(){};
	//	选中后加粗
	document.onmouseup=function(e){
				if (window.getSelection) {//一般浏览器 
					content = window.getSelection().toString();} 
				else if (document.selection) {//IE浏览器、Opera 
					content = document.selection.createRange().toString();}	
       			if(content!=''){
			      var	len=content.length;
		          var   target=e.target;
		          var  position=target.innerHTML.indexOf(content);
		          var  position2=position+len;
         		  var  tempstr1=target.innerHTML.substring(0,position);
			   	  var  tempstr2=target.innerHTML.substring(position2);	
			  		   content="<b>"+content+"</b>";
					   target.innerHTML=tempstr1+content+tempstr2;		
       		}}
	$scope.result={};//弹出框保存
//	点击显示
	$scope.add1 = function(){
		clear();
		var addQ1 = document.getElementById("addQ1");
		addQ1.style.display = "block";	
		if(addQ1.innerHTML == ''){
			var html1 = `<h3>添加题组<span class="fr cous" ng-click="gb1()">X</span></h3>
										<div class="pd">
											<p><span>题组名称</span><span class="Red">*</span>
											   <input class="mF" type="text" ng-model="result.name" placeholder="请输入题组名称"/>
											</p>
											<p><span>试题数量</span><input type="text" ng-model="result.numbel" placeholder="请输入试题数量"/></p>
											<p><span>试题类型</span>
												<input type="radio" ng-model="result.isradio" value="'0'" style="width: 20px;height: 20px;float: left;margin: 7px 10px 0 20px;" name="ra"／>
												<span style="float: left;margin-right: 20px;">单选题</span>
												<input type="radio" ng-model="result.isradio" value="'1'" style="width: 20px;height: 20px;float: left;margin: 7px 10px 0 ;" name="ra"／>
												<span style="float: left;">多选题</span>
											</p>
											<p><span>起始序号</span><input type="text" ng-model="result.no" placeholder="请输入起始序号"/></p>
											<p><span>每题分值</span><input type="text" ng-model="result.two" placeholder="请输入每题分值"/></p>
											<p><span>选项个数</span><input type="text" ng-model="result.thr" placeholder="请输入选项个数"/></p>
											
											<hr class="hr"/>
											<p><button ng-click="btn1()">确认添加</button></p>
										</div>`;
										
			var html2 = angular.element(html1);		
			var addEle = $compile(html2)($scope);
			$("#addQ1").append(addEle)						
//		$("#addQ1").append($compile(html2)($scope));
		}
	};
	
	$scope.add2 = function(){
		var addQ2 = document.getElementById("addQ2");
		addQ2.style.display = "block";	
		if(addQ2.innerHTML == ''){
			var html1 = `<h3>添加题组<span class="fr cous" ng-click="gb2()">X</span></h3>
										<div class="pd">
											<p><span>题组名称</span><span class="Red">*</span><input class="mF" type="text" placeholder="请输入题组名称"/></p>
											<p><span>试题数量</span><input type="text" placeholder="请输入试题数量"/></p>
											<p><span>起始序号</span><input type="text" placeholder="请输入起始序号"/></p>
											<p><span>所在页码</span><input type="text" placeholder="请输入所在页码"/></p>
											<p><span>每题分值</span><input type="text" placeholder="请输入每题分值"/></p>
											<p><span>多评人数</span><input type="text" placeholder="请输入多评人数"/></p>
											<p><span>多评误差</span><input type="text" placeholder="请输入多评误差"/></p>
											<hr class="hr"/>
											<p><button ng-click="btn2()">确认添加</button></p>
										</div>`;
										
			var html2 = angular.element(html1);		
			var addEle = $compile(html2)($scope);
			$("#addQ2").append(addEle)		
			
//		$("#addQ2").append($compile(html2)($scope));
		}
	};
	
	$scope.add3 = function(){
		var addQ3 = document.getElementById("addQ3");
		addQ3.style.display = "block";	
		if(addQ3.innerHTML == ''){
			var html1 = `<h3>添加题组<span class="fr cous" ng-click="gb3()">X</span></h3>
										<div class="pd">
											<p><span>题组名称</span><span class="Red">*</span><input class="mF" type="text" placeholder="请输入题组名称"/></p>
											<p><span>试题数量</span><input type="text" placeholder="请输入试题数量"/></p>
											<p><span>起始序号</span><input type="text" placeholder="请输入起始序号"/></p>
											<p><span>所在页码</span><input type="text" placeholder="请输入所在页码"/></p>
											<p><span>每题分值</span><input type="text" placeholder="请输入每题分值"/></p>
											<p><span>多评人数</span><input type="text" placeholder="请输入多评人数"/></p>
											<p><span>多评误差</span><input type="text" placeholder="请输入多评误差"/></p>
											<hr class="hr"/>
											<p><button ng-click="btn3()">确认添加</button></p>
										</div>`;
			var html2 = angular.element(html1);		
			var addEle = $compile(html2)($scope);
			$("#addQ3").append(addEle)
			
//	$("#addQ3").append($compile(html2)($scope));
		}
	
	};
	
	$scope.add4 = function(){
		var addQ4 = document.getElementById("addQ4");
		addQ4.style.display = "block";	
	};
	
	$scope.add5 = function(){
		var addQ5 = document.getElementById("addQ5");
		addQ5.style.display = "block";	
	};
	
//	关闭
	$scope.gb1 = function(){		
		var addQ1 = document.getElementById("addQ1");
		addQ1.style.display = "none"
	};
	
	$scope.gb2= function(){
		var addQ2 = document.getElementById("addQ2");
		addQ2.style.display = "none"
	};	
	
	$scope.gb3 = function(addEle){	
		var addQ3 = document.getElementById("addQ3");
		addQ3.style.display = "none";	
	};
	
	$scope.gb4 = function(){
		var addQ4 = document.getElementById("addQ4");
		addQ4.style.display = "none";	
	};
	
	$scope.gb5 = function(){
		var addQ5 = document.getElementById("addQ5");
		addQ5.style.display = "none";	
	};

//	确认添加
	$scope.btn1 = function(){		
	//添加选择题的存储
		var obj={};
		obj.thr=[];
		obj.no=[];
		addQ1.style.display = "none";
		var nub=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		$scope.nubarray=nub.slice(0,$scope.result.thr);//选项个数
		var totaltwo=parseInt($scope.result.numbel)*parseInt($scope.result.two)//总分数
		for(var i=0,noarray=[];i<$scope.result.numbel;i++){//多少个小题
			if(i<10){
			noarray.push('0'+(i+parseInt($scope.result.no)));	
			}else{
			noarray.push(i+parseInt($scope.result.no));	
			}	
		};
	
	obj={
			title:'',
			name:$scope.result.name,
			numbel:$scope.result.numbel,//试题数量
			isradio:$scope.result.isradio,//试题类型
			no:noarray,
			one:totaltwo,
		    two:$scope.result.two,//提分
		    thr:$scope.nubarray 
	};
 $scope.listObj.push(obj);
      //放入添加的题目编号
      var array=["一","二","三","四","五","六","七","八","九","十"];	
      for(var i=0;i<$scope.listObj.length;i++){
      		if(i<10){
      			 $scope.listObj[i].title=array[i];
      		}else if(10<=i<20){
      			$scope.listObj[i].title=array[9]+array[i-10];
      		}else if(20<=i<30){
      			$scope.listObj[i].title=array[1]+array[9]+array[i-20];
      		}else if(30<=i<40){
      			$scope.listObj[i].title=array[2]+array[9]+array[i-30];
      		}else if(40<=i<50){
      			$scope.listObj[i].title=array[3]+array[9]+array[i-40];
      		}
      };
    setTimeout(function(){
     var height = document.getElementById("A_Rone_child").offsetHeight;//获取每次生成模版的高度
    },1000)
 
	};

	//清空选择题的内容
	var clear=function(){
		$scope.result={
			name:'',numbel:'',isradio:'',
			no:'',one:'',two:'',	thr:'',
		};
	};
	$scope.btn2 = function(){	
		var addQ2 = document.getElementById("addQ2");
		addQ2.style.display = "none";
//		点击添加
		var cont =`<p>我是二段文字</p>`;	
		$("#AR").append(cont);
	};
	
	$scope.btn3 = function(){		
		var addQ3 = document.getElementById("addQ3");
		addQ3.style.display = "none";
//		点击添加
		var cont =`<p>我是3段文字</p>`;
		
		$("#AR").append(cont);
	};
	
	$scope.btn4 = function(){	
		var addQ4 = document.getElementById("addQ4");
		addQ4.style.display = "none";
//		点击添加
		var cont =`<p>我是4段文字</p>`;	
		$("#AR").append(cont);
	};
	
	$scope.btn5 = function(){	
		var addQ5 = document.getElementById("addQ5");
		addQ5.style.display = "none";
//		点击添加
		var cont =`<p>我是5段文字</p>`;	
		$("#AR").append(cont);
	};

}])

