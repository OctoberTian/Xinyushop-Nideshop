function resetNum() {
    $.ajax({
        url: "/admin/reset",
        type: "post",    //数据发送方式
        async: false,  //是否异步请求
        dataType: "text",
        data: {},
        success: function (data) {
            if(data==="success"){
                layer.msg("开发者设置：重置发送短信次数成功！");
            }else{
                layer.msg("开发者设置：重置发送短信次数失败！");
            }
        },
        error: function (data) {
            layer.msg("开发者设置：重置发送短信次数失败,处理后台！")
        }
    });
}