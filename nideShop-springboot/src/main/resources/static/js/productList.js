$(document).ready(function () {
    var content="";
    layui.use('laydate', function(){
        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#start' //指定元素
        });

        //执行一个laydate实例
        laydate.render({
            elem: '#end' //指定元素
        });
    });
    var id=sessionStorage.getItem('category');
    $.ajax({
        url: "/admin/getProductList",
        type: "post",    //数据发送方式
        async: false,  //是否异步请求
        dataType: "json",
        data: {id : id},
        error: function () {
            layer.msg("请求失败");
        },
        success: function (result) {
            if(result.code==="0000"){
                for(var i = 0 ; i < result.data.length; i ++){
                    var id = result.data[i].id;
                    var name = result.data[i].name;
                    var photo = result.data[i].banner_url;
                    var desc = result.data[i].front_desc;
                    content+="<tr>\n" +
                        "            <td>\n" +
                        "              <div class=\"layui-unselect layui-form-checkbox\" lay-skin=\"primary\" data-id='2'><i class=\"layui-icon\">&#xe605;</i></div>\n" +
                        "            </td>\n" +
                        "            <td>"+id+"</td>\n" +
                        "            <td>"+name+"</td>\n" +
                        "            <td><img style='width: 50px;height: 50px;' src=\""+photo+"\"/></td>\n" +
                        "            <td>"+desc+"</td>\n" +
                        "            <td class=\"td-status\">\n" +
                        "              <span class=\"layui-btn layui-btn-normal layui-btn-mini\">已启用</span></td>\n" +
                        "            <td class=\"td-manage\">\n" +
                        "              <a onclick=\"member_stop(this,'10001')\" href=\"javascript:;\"  title=\"启用\">\n" +
                        "                <i class=\"layui-icon\">&#xe601;</i>\n" +
                        "              </a>\n" +
                        "              <a title=\"编辑\"  onclick=\"x_admin_show('编辑','member-edit.html',600,400)\" href=\"javascript:;\">\n" +
                        "                <i class=\"layui-icon\">&#xe642;</i>\n" +
                        "              </a>\n" +
                        "              <a onclick=\"x_admin_show('修改密码','member-password.html',600,400)\" title=\"修改密码\" href=\"javascript:;\">\n" +
                        "                <i class=\"layui-icon\">&#xe631;</i>\n" +
                        "              </a>\n" +
                        "              <a title=\"删除\" onclick=\"member_del(this,'要删除的id')\" href=\"javascript:;\">\n" +
                        "                <i class=\"layui-icon\">&#xe640;</i>\n" +
                        "              </a>\n" +
                        "            </td>\n" +
                        "          </tr>"
                }
                //alert(content);
                $("#datanumber").append("共有数据："+result.data.length+" 条");
                $("#mainBody").append(content);
            }else{
                layer.msg("发生异常，请重试！");
            }
        }
    });
});

/*用户-停用*/
function member_stop(obj,id){
    layer.confirm('确认要停用吗？',function(index){

        if($(obj).attr('title')=='启用'){

            //发异步把用户状态进行更改
            $(obj).attr('title','停用')
            $(obj).find('i').html('&#xe62f;');

            $(obj).parents("tr").find(".td-status").find('span').addClass('layui-btn-disabled').html('已停用');
            layer.msg('已停用!',{icon: 5,time:1000});

        }else{
            $(obj).attr('title','启用')
            $(obj).find('i').html('&#xe601;');

            $(obj).parents("tr").find(".td-status").find('span').removeClass('layui-btn-disabled').html('已启用');
            layer.msg('已启用!',{icon: 5,time:1000});
        }

    });
}

/*用户-删除*/
function member_del(obj,id){
    layer.confirm('确认要删除吗？',function(index){
        //发异步删除数据
        $(obj).parents("tr").remove();
        layer.msg('已删除!',{icon:1,time:1000});
    });
}



function delAll (argument) {

    var data = tableCheck.getData();

    layer.confirm('确认要删除吗？'+data,function(index){
        //捉到所有被选中的，发异步进行删除
        layer.msg('删除成功', {icon: 1});
        $(".layui-form-checked").not('.header').parents('tr').remove();
    });
}