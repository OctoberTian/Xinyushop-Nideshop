$(document).ready(function () {
    $("#select-fruit").show();
    $("#select-snack").hide();
    $("#select-tea").hide();
    $("#ptype-input").change(function () {
        var ptype = $("#ptype-input").find("option:selected").val();
        if (ptype == "0") {
            $("#select-fruit").show();
            $("#select-snack").hide();
            $("#select-tea").hide();
        } else if (ptype === "1") {
            $("#select-fruit").hide();
            $("#select-snack").hide();
            $("#select-tea").show();
        } else if (ptype === "2") {
            $("#select-fruit").hide();
            $("#select-snack").show();
            $("#select-tea").hide();
        } else {
            layer.msg("出现异常错误！");
        }

    });
});

function addProduct() {
    var ptype = $("#ptype-input").val();
    var pname = $("#pname-input").val();
    var pquantity = $("#pquantity-input").val();
    var pstatus = $("#pstatus-input").val();
    var pprice0 = $("#pprice-fruit-0").val();
    var pprice1 = $("#pprice-fruit-1").val();
    var pprice2 = $("#pprice-fruit-2").val();
    var le = $("input[name = 'punit-fruit']:checked").length;
    var check_val = "";
    var one = -1;
    var two = -1;
    var three = -1;
    for (var i = 0; i < le; i++) {
        var del = $("input[name = 'punit-fruit']:checked:eq(" + i.toString() + ")").val();
        if (del === "0") {
            one = 1;
            if (pprice0 === "" || pprice0 == null) {
                layer.msg("销售方式填写格式错误！");
                return;
            }
        } else if (del === "1") {
            two = 1;
            if (pprice1 === "" || pprice1 == null) {
                layer.msg("销售方式填写格式错误！");
                return;
            }
        } else if (del === "2") {
            three = 1;
            if (pprice2 === "" || pprice2 == null) {
                layer.msg("销售方式填写格式错误！");
                return;
            }
        }
        check_val+=del;
        check_val+=","
    }
    check_val = check_val.substr(0, check_val.length - 1);
    if (pprice0 == null || pprice0 === "") {
        var pprice0 = "0";
    } else {
        if (one !== 1) {
            layer.msg("销售方式填写格式错误！");
            return;
        }
    }
    if (pprice1 == null || pprice1 === "") {
        var pprice1 = "0";
    } else {
        if (two !== 1) {
            layer.msg("销售方式填写格式错误！");
            return;
        }
    }
    if (pprice2 == null || pprice2 === "") {
        var pprice2 = "0";
    } else {
        if (three !== 1) {
            layer.msg("销售方式填写格式错误！");
            return;
        }
    }
    var pprice = pprice0 + "," + pprice1 + "," + pprice2;
    var pphoto = $("#pphoto-input").val();
    var pinfo = $("#pinfo-input").val();

    if (pphoto == null || pphoto === "") {
        pphoto = "/images/none.jpg";
    }
    if (ptype === "0") {
        if (pname == null || pname === "") {
            layer.msg("商品名称不能为空！");
        } else if (pquantity == null || pquantity === "") {
            layer.msg("库存数量不能为空！");
        } else if (check_val === "" || check_val == null) {
            layer.msg("请选择至少一种商品可提供方式！");
        } else {
            $.ajax({
                url: "/admin/addFruit",
                type: "post",    //数据发送方式
                async: false,  //是否异步请求
                dataType: "json",
                data: {
                    pname: pname, //json格式冒号前后加空格，用,最后一个不用加,
                    pquantity: pquantity,
                    ptype: ptype,
                    pstatus: pstatus,
                    psize: check_val,
                    pprice: pprice,
                    pphoto: pphoto,
                    pinfo: pinfo,
                    pcollect: 0
                },
                error: function () {
                    layer.msg("请求失败");
                },
                success: function (result) {
                    if (result.code === "0000") {
                        layer.msg("添加成功！");
                        //alert(content);
                    } else {
                        layer.msg("发生异常，请重试！");
                    }
                },
            });
        }
    } else if (ptype === "1") {
        alert(ptype);
    } else if (ptype === "2") {
        alert(ptype);
    } else {
        layer.msg("商品类型出现异常错误！")
    }
}