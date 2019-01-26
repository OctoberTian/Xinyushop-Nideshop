$(document).ready(function () {
    var content = "";
    $.get("/admin/lookCategory", function (data) {
        if (data.code === "0000") {
            for (var i = 0; i < data.data.length; i++) {
                var name = data.data[i].name;
                content += '<option value="' + data.data[i].id + '">' + name + '</option>';
            }
        } else {
            content = "<option value='empty'>暂无分类</option>"
        }
        $("#good-fenlei").append(content);
    })
});
//上传图片选择文件改变后刷新预览图
var uploading = false;
$("#good-pic1").on("change", function (e) {
    //获取目标文件
    var file = e.target.files || e.dataTransfer.files;
    //如果目标文件存在
    if (file) {
        //定义一个文件阅读器
        var reader = new FileReader();
        //文件装载后将其显示在图片预览里
        reader.onload = function () {
            $("#img_preview1").attr("src", this.result);
        };
        //装载文件
        reader.readAsDataURL(file[0]);
    }
    if (uploading) {
        layer.msg("图片正在上传中，请稍候");
        return false;
    }
    var fileName = $(this).val();//获得文件名称
    var fileType = fileName.substr(fileName.length - 4, fileName.length);　　//截取文件类型,如(.xls)
    layer.msg();
    if (fileType === '.jpg' || fileType === '.png' || fileType === '.jpeg' || fileType === ".gif") {
        $("#goodpic1form").ajaxSubmit({
            type: "POST",
            url: "/admin/upload",
            dataType: "json",
            async: false,
            beforeSend: function () {
                uploading = true;
            },
            success: function (result) {
                if (result.code === "0000") {
                    layer.msg("主图修改成功");

                } else {
                    layer.msg("主图修改失败，请联系工作人员！");
                }
                uploading = false;
            }
        });
    }
    else {
        layer.msg('上传文件类型错误,支持类型: .jpg,.png,.jpeg,.gif');
    }
});

$("#good-pic2").on("change", function (e) {
    //获取目标文件
    var file = e.target.files || e.dataTransfer.files;
    //如果目标文件存在
    if (file) {
        //定义一个文件阅读器
        var reader = new FileReader();
        //文件装载后将其显示在图片预览里
        reader.onload = function () {
            $("#img_preview2").attr("src", this.result);
        };
        //装载文件
        reader.readAsDataURL(file[0]);
    }
    if (uploading) {
        layer.msg("图片正在上传中，请稍候");
        return false;
    }
    var fileName = $(this).val();//获得文件名称
    var fileType = fileName.substr(fileName.length - 4, fileName.length);　　//截取文件类型,如(.xls)
    if (fileType === '.jpg' || fileType === '.png' || fileType === '.jpeg' || fileType === ".gif") {
        $("#goodpic2form").ajaxSubmit({
            type: "POST",
            url: "/admin/upload",
            dataType: "json",
            async: false,
            beforeSend: function () {
                uploading = true;
            },
            success: function (result) {
                if (result.code === "0000") {
                    layer.msg("列表图修改成功");

                } else {
                    layer.msg("列表图修改失败，请联系工作人员！");
                }
                uploading = false;
            }
        });
    }
    else {
        layer.msg('上传文件类型错误,支持类型: .jpg,.png,.jpeg,.gif');
    }
});

function addGood() {
    let name = $("#good-name").val();
    let goodsNumber = $("#good-num").val();
    let isOnSale = $("#good-status").val();
    let goodsUnit = $("#good-unit").val();
    let retailPrice = $('#good-price').val();
    let goodsBrief = $('#good-brief').val();
    let goodsDesc = $('#good-desc').val();
    let categoryId = $('#good-fenlei').val();
    if (!(name && goodsUnit && goodsNumber && retailPrice && isOnSale && categoryId)) {
        layer.msg('信息输入不全，请核查！')
    } else {
        $.ajax({
            url: '/admin/addPro',
            async: false,
            dataType: 'json',
            type: 'post',
            data: {
                name: name,
                goodsNumber: goodsNumber,
                isOnSale: isOnSale,
                goodsBrief: goodsBrief,
                goodsDesc: goodsDesc,
                goodsUnit: goodsUnit,
                retailPrice: retailPrice,
                categoryId: categoryId
            },
            success: function (result) {
                if (result.code === '0000') {
                    layer.msg('添加商品成功！');
                    setTimeout(function(){
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                    },1000);
                } else {
                    layer.msg('添加失败');
                }
            },
            error: function () {
                layer.msg('发生异常错误！')
            }
        })
    }
}


function domain() {
    var content = "";
    $.ajax({
        url: "/admin/getProInfo",
        type: "post",    //数据发送方式
        async: false,
        dataType: "json",
        data: {
            id: $("#id").val()
        },
        error: function () {
            layer.msg("请求失败");
        },
        success: function (result) {
            if (result.code === "0000") {
                let id = result.data.id;
                let primary_pic_url = result.data.primaryPicUrl;
                let list_pic_url = result.data.listPicUrl;
                let name = result.data.name;
                let goodsNumber = result.data.goodsNumber;
                let isOnSale = result.data.isOnSale;
                let goodsUnit = result.data.goodsUnit;
                let retailPrice = result.data.retailPrice;
                let sellVolume = result.data.sellVolume;
                let goodsBrief = result.data.goodsBrief;
                let goodsDesc = result.data.goodsDesc;
                $("#good-id").val(id);
                //1:主图；2：列表图
                $("#picid1").val(id + "1");
                $("#picid2").val(id + "2");
                $("#good-name").val(name);
                $("#good-picture1").append('<br><img id="img_preview1" data-src="" src="' + primary_pic_url + '" data-holder-rendered="true" style="width: 100px; display: block;">');
                $("#good-picture2").append('<br><img id="img_preview2" data-src="" src="' + list_pic_url + '" data-holder-rendered="true" style="width: 100px; display: block;">');
                $("#good-num").val(goodsNumber);
                if (isOnSale) {
                    $("#good-status").append("<option value=\"1\">在售</option>\n" +
                        "                     <option value=\"0\">停售</option>");
                } else {
                    $("#good-status").append("<option value=\"0\">停售</option>\n" +
                        "                     <option value=\"1\">在售</option>");
                }
                $("#good-price").val(retailPrice);
                $("#good-unit").val(goodsUnit);
                $("#good-sell").val(sellVolume);
                $("#good-brief").val(goodsBrief);
                $("#good-desc").val(goodsDesc);
            } else {
                layer.msg(result.msg);
            }
        }
    });
}

function judge() {
    setTimeout(function () {
        if ($("#id").val() === null || $("#id").val() === "") {
            judge();
        } else {
            domain();
        }
    }, 20);
}

function updateGood() {
    var id = $("#good-id").val();
    var name = $("#good-name").val();
    var goodsNumber = $("#good-num").val();
    var goodsBrief = $("#good-brief").val();
    var isOnSale = $("#good-status option:selected").val();
    var goodsUnit = $("#good-unit").val();
    var retailPrice = $("#good-price").val();
    var goodsDesc = $("#good-desc").val();
    if (name === "" || name === null) {
        layer.msg("请输入商品名！");
    } else if (goodsNumber === "" || goodsNumber === null) {
        layer.msg("请输入库存量！");
    } else if (goodsUnit === "" || goodsUnit === null) {
        layer.msg("请输入销售单位！")
    } else if (retailPrice === "" || retailPrice === null) {
        layer.msg("请输入零售价！")
    } else {
        $.ajax({
            url: "/admin/updateGood",
            type: "POST",
            data: {
                id: id,
                name: name,
                goodsNumber: goodsNumber,
                goodsBrief: goodsBrief,
                isOnSale: isOnSale,
                goodsUnit: goodsUnit,
                retailPrice: retailPrice,
                goodsDesc: goodsDesc
            },
            async: false,
            dataType: "json",
            success: function (msg) {
                if (msg.code === "0000") {
                    layer.msg("修改成功！");
                    setTimeout(function () {
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                        window.parent.location.reload();
                    }, 1500);
                } else {
                    layer.msg("修改失败，请联系代码君！");
                }
            },
            error: function (msg) {
                lsyer.msg("修改失败，请联系代码君！");
            }
        });
    }
}
