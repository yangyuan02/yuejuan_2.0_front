function(){
     $.ajax({
            type: "GET",
            url: ajaxIp + "/api/v2/commons/grade_subjects",
            headers: {
                'Authorization': "Bearer " + isLogin
            },

            success: function(data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    $(".mark_01_select").append('<option value ="' + data[i].name + '" data-id="' + data[i].id + '">' + data[i].name + '</option>')
                }
            },
            error: function() {

            }
        });
}