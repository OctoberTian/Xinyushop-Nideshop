
jQuery(document).ready(function($) {

    $("#register").click(function() {
        layer.open({
            skin: 'layui-layer-lan',
            type: 2,
            title: '注册新用户',
            area: ['450px', '700px'],
            shade: 0,
            maxmin: true,
            content: ['/public/register', 'yes'],
            success: function(layero, index) {
                var body = layer.getChildFrame('body', index);//建立父子联系
                var inputList = body.find('input');
            }
        });
    });
    var flag=false;
    $("#tid").blur(function(){
        var param=$("#tid").val();
        $.post("/public/lookuptid",{tid:param},
            function(result){
                if (param==null||param==undefined||param==""){
                    $("#tip1").html("<p style='color:red; '>  请输入用户名</p>");
                    flag=false;
                }
                else if(param==result.data){
                    $("#tip1").html("<p style='color:red; '>  用户名已存在</p>");
                    flag=false;
                }  else if(param<6&&param>=1){
                    $("#tip2").html("<p style='color:red; '>  密码过短</p>");
                    flag=false;
                }
                else if(param>18){
                    $("#tip2").html("<p style='color:red; '>  密码过长</p>");
                    flag=false;
                }
                else{
                    $("#tip1").empty();
                    flag=true;
                }
            }
        );
    });
    $("#password1").blur(function(){
        var num=$("#password1").val().length;
        var pass1=$("#password1").val();
        if (pass1==null||pass1==undefined||pass1==""){
            $("#tip2").html("<p style='color:red; '>  不能为空</p>");
            flag=false;
        }
        else if(num<6&&num>=1){
            $("#tip2").html("<p style='color:red; '>  密码过短</p>");
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
        else if($("#password1").val()!=pass2){
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
    $("#tname").blur(function(){
        var num=$("#tname").val().length;
        var tname=$("#tname").val();
        if (tname==null||tname==undefined||tname==""){
            $("#tip4").html("<p style='color:red; '>  不能为空</p>");
            flag=false;
        }
        else{
            $("#tip4").empty();
            flag=true;
        }
    }) ;
    $("#tunit").blur(function(){
        var num=$("#tunit").val().length;
        var tunit=$("#tunit").val();
        if (tunit==null||tunit==undefined||tunit==""){
            $("#tip5").html("<p style='color:red; '>  不能为空</p>");
            flag=false;
        }
        else{
            $("#tip5").empty();
            flag=true;
        }
    }) ;
    $("#btn").click(function(){
        if(flag){

            $.post("/public/registerteacherout",{tid:$("#tid").val(),tname:$("#tname").val()
                ,tunit:$("#tunit").val()},
                function(result){
                    if (result.code=="0000") {
                        alert("注册成功");
                        parent.window.location.reload();
                        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                        parent.layer.close(index);
                    }
                    else{
                        alert("注册失败");
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
