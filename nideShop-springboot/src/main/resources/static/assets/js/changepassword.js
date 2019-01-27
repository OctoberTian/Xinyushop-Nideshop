
jQuery(document).ready(function($) {

    $("#changepassdword").click(function() {
        layer.open({
            skin: 'layui-layer-lan',
            type: 2,
            title: '修改个人密码',
            area: ['550px', '550px'],
            shade: 0,
            maxmin: true,
            content: ['/public/changepasswords', 'yes'],
            success: function(layero, index) {
                var body = layer.getChildFrame('body', index);//建立父子联系
                var inputList = body.find('input');
                $(inputList).val(id);
            }
        });
    });
    var flag=false;
    $("#oldpassword").blur(function(){
        var param=$("#oldpassword").val();
        $.get("/public/lookuppassword",
            function(result){
                if (param==null||param==undefined||param==""){

                    $("#tip1").html("<p style='color:red; '>  请输入当前密码</p>");
                    flag=false;
                }
                else if(param==result.data){

                    $("#tip1").html("<p style='color:green; '>  密码正确</p>");
                    flag=true;
                }
                else{

                    $("#tip1").html("<p style='color:red; '>  密码错误</p>");
                    flag=false;
                }
            }
        );
    });
    $("#password1").blur(function(){
        var num=$("#password1").val().length;
        var pass1=$("#password1").val();
        var param=$("#oldpassword").val();
        if (pass1==null||pass1==undefined||pass1==""){
            $("#tip2").html("<p style='color:red; '>  不能为空</p>");
            flag=false;
        }
        else if(num<6&&num>=1){
            $("#tip2").html("<p style='color:red; '>  密码过短</p>");
            flag=false;
        }
        else if(pass1==param){
            $("#tip2").html("<p style='color:red; '>  不能与旧密码相同</p>");
            flag=false;
        }
        else if(num>18){
            $("#tip2").html("<p style='color:red; '>  密码过长</p>");
            flag=false;
        }
        else{
            $("#tip2").empty();
            flag=true;
        }
    }) ;
    $("#password2").blur(function(){
        var pass2=$("#password2").val();
        var num=$("#password2").val().length;
        if (pass2==null||pass2==undefined||pass2==""){
            $("#tip3").html("<p style='color:red; '>  不能为空</p>");
            flag=false;
        }
        else if($("#password2").val()!=pass2){
            $("#tip3").html("<p style='color:red; '>  两次输入密码不同</p>");
            flag=false;
        }
        else if(num>=6&&num<=18){
                $("#tip3").empty();
                flag=true;
            }else{
                $("#tip3").html("<p style='color:red; '>  密码格式错误</p>");
                flag=false;
            }

    });
    $("#btn").click(function(){
        if(flag){

            $.post("/public/changepassword",{password:$("#password1").val()},
                function(result){
                    if (result.code=="0000") {
                        alert("修改成功");
                        $("#oldpassword").val("");
                        $("#password1").val("");
                        $("#password2").val("");
                        $("#tip1").empty();
                        $("#tip2").empty();
                        $("#tip3").empty();
                    }
                    else{
                        alert("修改失败");
                    }
                }
            );
        }
        else{
            alert("修改失败,请确认输入信息无误");
        }
    });
    $("#return").click(function() {
        parent.window.location.reload();
        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index);
    });
});
