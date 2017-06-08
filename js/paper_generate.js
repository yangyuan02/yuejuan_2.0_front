$(function() {
	// var a={
	//   "exams": [
	//     {
	//       "id": 172,
	//       "name": "上海师范大学第四附属中学2017届高三考前适应性考试20170522",
	//       "created_at": "2017-05-22 12:47:41 UTC"
	//     },
	//     {
	//       "id": 138,
	//       "name": "上海师范大学第四附属中学2016学年高三三模20170515",
	//       "created_at": "2017-05-02 13:40:41 UTC"
	//     },
	//     {
	//       "id": 183,
	//       "name": "hahaha",
	//       "created_at": "2017-06-08 06:33:33 UTC"
	//     },
	//     {
	//       "id": 181,
	//       "name": "1233333",
	//       "created_at": "2017-06-08 06:23:10 UTC"
	//     },
	//     {
	//       "id": 134,
	//       "name": "上海师范大学第四附属中学2016学年高二期中考试",
	//       "created_at": "2017-04-17 12:46:47 UTC"
	//     },
	//     {
	//       "id": 131,
	//       "name": "上海师范大学第四附属中学2016学年第二学期期中考试",
	//       "created_at": "2017-04-17 11:15:57 UTC"
	//     }
	//   ]
	// }
	var exam_list;
	var isLogin = localStorage.getItem("token");

	$.ajax({
	  type: "GET",
	  url: "http://192.168.1.121:8888/api/v2/exams",
		data:{'page':1,'limit':4},
	  headers: {'Authorization': "Bearer " + isLogin},
	  dataType: "JSON",

	  success: function(data){
	  	exam_list = data;
	   	console.log(data)
	   	console.log(exam_list.length)
	   },
	   error: function(){
	      console.log(123123123)
	  }
	});
	   var a = exam_list.length;
	if (a!= 0) {
		for (var i = 1; i < a; i++) {
			console.log(exam_list[i].name)
			// var arr='<li class="active"><h6 class="name">' + exam_list[i].name + '</h6><p class="time">' + exam_list[i].created_at + '</p></li>'
			// $('.list_ul').append(arr)
		};
	};
	
})