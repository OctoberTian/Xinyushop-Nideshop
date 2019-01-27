$(document).ready(function () {
    var content="";
    var y = new Date().getFullYear();
    var dates = [];
    var sids = [];
    $.ajax({
        url: "/admin/getProductList",
        type: "post",    //数据发送方式
        async: false,
        dataType: "json",
        data: {},
        error: function () {
            layer.msg("请求失败");
        },
        success: function (result) {
            if (result.code === "0000") {
                if (result.data.length !== 0) {
                    for (var i = 0; i < result.data.length; i++) {
                        let id = result.data[i].id;
                        let primary_pic_url = result.data[i].primaryPicUrl;
                        let list_pic_url = result.data[i].listPicUrl;
                        let name = result.data[i].name;
                        let goodsNumber = result.data[i].goodsNumber;
                        let isOnSale = result.data[i].isOnSale;
                        let goodsUnit = result.data[i].goodsUnit;
                        let retailPrice = result.data[i].retailPrice;
                        let sellVolume = result.data[i].sellVolume;
                        if(isOnSale){
                            isOnSale="在售";
                        }else{
                            isOnSale="停售"
                        }
                        sids.push(id);
                        //批量删除的代码，先不加：<td><input type='checkbox' name='feeds' class=\"checkOne\" onclick=\"clickOne()\" id='select' value='" + id + "'></td>
                        content += "<tr id='tr_" + id + "'>";
                        content += "<td>" + id + "</td>";
                        content += "<td><img style='width: 70px;height: 70px;' src='" + primary_pic_url + "'></td>";
                        content += "<td><img style='width: 70px;height: 70px;' src='" + list_pic_url + "'></td>";
                        content += "<td>" + name + "</td>";
                        content += "<td>" + goodsNumber + "</td>";
                        content += "<td>" + isOnSale + "</td>";
                        content += "<td>" + goodsUnit + "</td>";
                        content += "<td>" + retailPrice + "</td>";
                        content += "<td>" + sellVolume + "</td>";
                        content += "<td><button onclick='showProInfo(" + id + ")' class='btn btn-success btn-sm'>详情</button><button onclick='deletes(" + id + ")' class='btn btn-danger btn-sm'>删除</button></td></tr>"
                    }
                } else {
                    layer.msg(result.msg);
                }
                $("#categoryBody").append(content);
            }
        }
    });
    //propertychange监听input里面的字符变化,属性改变事件
    $('.aa').bind('input propertychange', function() {
        var $this = $(this);
        var text_length = $this.val().length;//获取当前文本框的长度
        var current_width = parseInt(text_length) *16+40;//该16是改变前的宽度除以当前字符串的长度,算出每个字符的长度
        $this.css("width",current_width+"px");
    });
    table();
    for(var k=0;k<sids.length;k++){
        for (var i = (y-50); i <= (y+4); i++) {
            if(i === dates[k]){
                $("#date_"+sids[k]).append("<option value='"+ i +"' selected=\"selected\">"+ i +"</option");
            }else{
                $("#date_"+sids[k]).append("<option value='"+ i +"'>"+ i +"</option");
            }
        }
    }
});
var open=false;
function sao() {
    if(open) {
        $("#saogongneng").show();
        open=true;
    }else{
        $("#saogongneng").hide();
        open=false;
    }
}
function showProInfo(id){
    layer.open({
        skin: 'layui-layer-lan',
        type: 2,
        title: '商品信息',
        area: ['850px', '550px'],
        shade: 0,
        maxmin: true,
        content: ['/admin/getProInfo', 'yes'],
        success: function (layero, index) {
            var body = layer.getChildFrame('body', index);//建立父子联系
            var iframeWin = window[layero.find('iframe')[0]['name']];
            var inputList = body.find('input[name="hideid"]');
            $(inputList).val(id);
        }
    });
}


function clickAll(){
    $(".checkOne").prop("checked",$(".checkAll").prop("checked"));
}

function clickOne(){
    var allChecked = true;
    $(".checkOne").each(function(){
        if($(this).prop("checked") == false){
            allChecked = false;
        };
    });
    if(allChecked){
        $(".checkAll").prop("checked",true);
    } else {
        $(".checkAll").prop("checked",false);
    }
}


function newGood() {
    layer.open({
        skin: 'layui-layer-lan',
        type: 2,
        title: '添加商品信息',
        area: ['400px', '300px'],
        shade: 0,
        maxmin: true,
        content: ["/admin/newGood","yes"],
    });
}

function pifu(fid) {
    layer.open({
        skin: 'layui-layer-lan',
        type: 2,
        title: '学生信息',
        area: ['450px', '250px'],
        shade: 0,
        maxmin: true,
        content: ["/leader/feedBackCard","no"],
        success: function(layero, index) {
            var body = layer.getChildFrame('body', index);//建立父子联系
            var iframeWin = window[layero.find('iframe')[0]['name']];
            var inputList = body.find("input:text[id='id']");
            $(inputList).val(fid);
        }
    });
}
function table() {
    // /assets/js/lib/data-table/datatables-init.js
    $('#bootstrap-data-table-export').DataTable();
    //  "use strict";
    /*  Data Table
    -------------*/
    $('#bootstrap-data-table').DataTable({
        lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "All"]],
    });

    $('#bootstrap-data-table-export').DataTable({
        dom: 'lBfrtip',
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
    $('#row-select').DataTable( {
        initComplete: function () {
            this.api().columns().every( function () {
                var column = this;
                var select = $('<select class="form-control"><option value=""></option></select>')
                    .appendTo( $(column.footer()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );
        }
    } );
}
function deletes(id){
     $.ajax({
         url: "/admin/deleteGood",
         type: "post",    //数据发送方式
         async: true,
         dataType: "json",
         data: {"id": id},
         error: function () {
             layer.msg("请求失败");
         },
         success: function (result) {
             if (result.code === "0000") {
                 layer.msg("删除成功！");
                 setTimeout(function () {
                     window.location.reload();//刷新当前页面.
                 }, 1000);
             } else {
                 layer.msg("操作失败，请联系代码君！");
             }
         }
     });
}
function operSelected() {
    var le = $("input[name = 'feeds']:checked").length;
    var check_val = new Array;
    for(var i=0;i<le;i++){
        var del = $("input[name = 'feeds']:checked:eq("+i.toString()+")").val();
        check_val.push(del);
    }
    if(check_val==null||check_val==""){
        layer.msg("您未选择要处理的信息！");
    }else {
        $.ajax({
            url: "/manager/deleteSelectedStu?checkVal="+check_val,
            type: "get",    //数据发送方式
            async: true,
            dataType: "json",
            error: function () {
                layer.msg("请求失败");
            },
            success: function (result) {
                if(result.code==="0000"){
                    layer.msg("操作成功！");
                    setTimeout(function(){
                        window.location.reload();//刷新当前页面.
                    },2000);
                }else{
                    layer.msg("操作失败，请重试！")
                }
            }
        });
    }
}




