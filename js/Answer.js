var m1 = angular.module("pro",[]);
//设置控制器
m1.controller("demo",["$scope","$compile",function($scope,$compile){
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
	
//	点击显示
	$scope.add1 = function(){
		var addQ1 = document.getElementById("addQ1");
		addQ1.style.display = "block";	
		if(addQ1.innerHTML == ''){
			var html1 = `<h3>添加题组<span class="fr cous" ng-click="gb1()">X</span></h3>
										<div class="pd">
											<p><span>题组名称</span><span class="Red">*</span>
											   <input class="mF" type="text" placeholder="请输入题组名称"/>
											</p>
											<p><span>试题数量</span><input type="text" placeholder="请输入试题数量"/></p>
											<p><span>试题类型</span>
												<input type="radio" style="width: 20px;height: 20px;float: left;margin: 7px 10px 0 20px;" name="ra"／>
												<span style="float: left;margin-right: 20px;">单选题</span>
												<input type="radio" style="width: 20px;height: 20px;float: left;margin: 7px 10px 0 ;" name="ra"／>
												<span style="float: left;">多选题</span>
											</p>
											<p><span>起始序号</span><input type="text" placeholder="请输入起始序号"/></p>
											<p><span>每题分值</span><input type="text" placeholder="请输入每题分值"/></p>
											<p><span>选项个数</span><input type="text" placeholder="请输入选项个数"/></p>
											
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
		
		var addQ1 = document.getElementById("addQ1");
		addQ1.style.display = "none";
//		点击添加
		var cont =`<p>我是一段文字</p>`;
		$("#AR").append(cont);
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

