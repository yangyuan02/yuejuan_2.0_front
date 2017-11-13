$(document).ready(function () { 
	 $('.user-left .user-left-button').on('click', function() {
  	$(this).addClass('user-on').siblings().removeClass('user-on');
  	var index = $(this).index();
  	console.log(index);
  	$('.user-right').eq(index).show().siblings('.user-right').hide();
  });

	// 课程导入
	$('.course-import').click(function(){
		console.log(777)
		$('.import-course-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.import-course-wrap .modal-shadow').animate({'opacity': .3},500);
		$('.import-course-wrap').show();
		$('.table-template').attr('href', ajaxIp+'/template/课程导入（模板）.xlsx');
	})

	// 创建课程
	$('.add-course').click(function(){
		$('.modal-course-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.modal-course-wrap .modal-shadow').animate({'opacity': .3},500);
		$('.modal-course-wrap').show();
	})

	// 学生导入
	$('.stu-import').click(function(){
		$('.import-stu-wrap .modal-main').animate({'top': '50%','opacity': 1},500);
		$('.import-stu-wrap .modal-shadow').animate({'opacity': .3},500);
		$('.import-stu-wrap').show();
		$('.table-template').attr('href', ajaxIp+'/template/课程学生导入（模板）.xlsx');
	})
})