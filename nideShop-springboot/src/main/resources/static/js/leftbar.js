$(document).ready(function () {
    // var content="";
    // $.get("/admin/lookCategory",function(data){
    //     if(data.code==="0000"){
    //         for(var i=0;i<data.data.length;i++){
    //             var href = "/admin/categoryDetails?id="+data.data[i].id;
    //             var name = data.data[i].name;
    //             content+='<li><i class="fa fa-tag"></i><a href="'+href+'">'+name+'</a></li>';
    //         }
    //     }else{
    //         content="<li><i class=\"fa fa-tag\"></i>暂无分类</li>"
    //     }
    //     $("#category").append(content);
    // })
});

function addProduct() {
    layer.open({
        skin: 'layui-layer-lan',
        type: 2,
        title: '添加商品',
        area: ['850px', '550px'],
        shade: 0,
        maxmin: true,
        content: ['/admin/addProInfo', 'yes'],
        success: function (layero, index) {

        },
        error: function (e) {
            layer.msg("请求失败，请联系代码君 ^_^ ");
        }
    });
}