$(document).ready(function () {
    var content = "";
    $.ajax({
        url: "/admin/showOrder",
        type: "post",    //数据发送方式
        async: false,  //是否异步请求
        dataType: "json",
        data: {boo: true},
        error: function () {
            layer.msg("请求失败");
        },
        success: function (result) {
            console.log("resule:",result);
            if(result.code==="0000"){
                var orderNumber  = [];//存储每个订单号对应的结束位
                var ordernew = [];//ordernew.length得到订单数目,ordernew[]中存放所有订单号
                var first = result.data[0].oid;
                ordernew[0] = result.data[0].oid;
                for(var i = 1;i < result.data.length;i++){
                    if (result.data[i].oid !== first) {
                        //alert("result.data[i]: " + result.data[i]);
                        ordernew[ordernew.length] = result.data[i].oid;
                        first = result.data[i].oid;
                        orderNumber[orderNumber.length] = i - 1;
                    }
                }
                orderNumber[orderNumber.length] = result.data.length-1;
                for(var i = 0 ; i < ordernew.length; i ++){
                    var oid = result.data[orderNumber[i]].oid;
                    var orderSn = result.data[orderNumber[i]].orderSn;
                    var otime = result.data[orderNumber[i]].otime;
                    var uid = result.data[orderNumber[i]].uid;
                    var total = result.data[orderNumber[i]].total;
                    var address = result.data[orderNumber[i]].address;
                    var telephone = result.data[orderNumber[i]].telephone;
                    var status = result.data[orderNumber[i]].status;
                    var onote = result.data[orderNumber[i]].onote;
                    var unickname = result.data[orderNumber[i]].unickname;
                    var urealname = result.data[orderNumber[i]].urealname;
                    //alert(result.data[]);

                    content+="<tr>\n" +
                        "          <td colspan=\"5\">\n" +
                        "          <span>下单时间：" + otime +
                        "          </span> " +
                        "          &emsp;&emsp;\n" +
                        "          已付款 " +
                        "          &emsp;&emsp;\n" +
                        "          未发货 " +
                        "          &emsp;&emsp;\n" +
                        "          订单号: " + orderSn +
                        "          &emsp;&emsp;\n" +
                        "          用户名：" + unickname +
                        "          </td>\n" +
                        "        </tr>\n";

                    if(i === 0)
                        first = 0;
                    else
                        first = orderNumber[i-1]+1;
                    var pname = result.data[first].pname;
                    var pphoto = result.data[first].pphoto;
                    var pprice = result.data[first].pprice;
                    var pamount = result.data[first].pmount;
                    var ptotal = pprice*pamount;
                    var pid = result.data[first].pid;
                    var ptype = result.data[first].ptype;
                    var rowsnum = orderNumber[i]-first+1;
                    content+="   <tr>\n" +
                        "         <td><div>\n" +
                        "          <div >\n" +
                        "            <div class=\"col-lg-4 col-md-4 col-sm-4\">\n" +
                        "              <img src=\""+pphoto+"\" style=\"height: 80px;width: 80px;\" alt=\"\">\n" +
                        "            </div>\n" +
                        "            <div class=\"col-lg-6 col-md-10 col-sm-8\">\n" +
                        "                <strong style='margin-top: 5px'>"+pname+"</strong>"+
                        "                <div style='margin-top: 7px;margin-bottom: 7px;'><i class='fa fa-tag'></i> 规格：<span style='color: #C9302C'>"+ptype+"</span></div><div><i class='fa fa-th-large'></i> 数量：<span style='color: #C9302C'>"+pamount+"</span></div>"+
                        "                <span><i class='fa fa-dollar'></i> 小计：<span style='color: #C9302C'>"+ptotal+"</span></span>"+
                        "            </div>\n" +
                        "          </div>\n" +
                        "        </div></td>"+
                        "          <td style=\"display:table-cell; vertical-align:middle\" rowspan='"+rowsnum+"'>总金额：" + total + "</td>\n" +
                        "          <td style=\"display:table-cell; vertical-align:middle\" rowspan='"+rowsnum+"'>实际付款：" + total + "</td>\n" +
                        "          <td style=\"display:table-cell; vertical-align:middle\" rowspan='"+rowsnum+"'>线上支付</td>\n" +
                        "          <td style=\"display:table-cell; vertical-align:middle\" width='180px' rowspan='"+rowsnum+"'><button onclick='send("+oid+")' class='btn btn-success btn-sm'>发货</button>&emsp;<button onclick='del("+oid+")' class='btn btn-danger btn-sm'>取消订单</button></td>\n" +
                        "          </tr>\n";

                    for(var j = first+1;j < orderNumber[i]+1;j++){
                        var lid = result.data[j].lid;
                        var pprice = result.data[j].pprice;
                        var pamount = result.data[j].pmount;
                        var ptotal = pprice*pamount;
                        var pphoto = result.data[j].pphoto;
                        var pname = result.data[j].pname;
                        content+="<tr><td><div>\n" +
                            "          <div>\n" +
                            "            <div class=\"col-lg-4 col-md-4 col-sm-4\">\n" +
                            "              <img src=\""+pphoto+"\" style=\"height: 80px;width: 80px;\" alt=\"\">\n" +
                            "            </div>\n" +
                            "            <div class=\"col-lg-6 col-md-10 col-sm-8\" `>\n" +
                            "                <strong style='margin-top: 5px'>"+pname+"</strong>"+
                            "                <div style='margin-top: 7px;margin-bottom: 7px;'><i class='fa fa-tag'></i> 规格：<span style='color: #C9302C'>"+ptype+"</span></div><div><i class='fa fa-th-large'></i> 数量：<span style='color: #C9302C'>"+pamount+"</span></div>"+
                            "                <span><i class='fa fa-dollar'></i> 小计：<span style='color: #C9302C'>"+ptotal+"</span></span>"+
                            "            </div>\n" +
                            "          </div>\n" +
                            "        </div></td></tr>";
                    }
                    content += "        <tr>\n" +
                        "               <td colspan=\"5\">\n" +
                        "               <span>联系电话：" + telephone +
                        "               </span>" +
                        "               &emsp;&emsp;&emsp;\n" +
                        "               <span>收货地址：" + address +
                        "               </span>" +
                        "               &emsp;&emsp;&emsp;\n" +
                        "               </td>\n" +
                        "               </tr>\n" +
                        "               <tr><td colspan=\"5\"></td></tr>";

                }
                $("#tablebody").append(content);
            }else{
                layer.msg("发生异常，请重试！");
                alert("发生异常，请重试！");
            }
        }
    });
});

function send(oid) {
    $.ajax({
        url: "/admin/send",
        type: "post",    //数据发送方式
        async: false,  //是否异步请求
        dataType: "json",
        data: {
            oid : oid,
        },
        error: function () {
            layer.msg("请求失败");
        },
        success: function (result) {
            if (result.code === "0000") {
                layer.msg("发货成功！");
                setTimeout(function () {
                    window.location.reload();
                },1000);
            } else {
                layer.msg("发生异常，请重试！");
            }
        },
    });
}

function del(oid) {
    $.ajax({
        url: "/admin/del",
        type: "post",  //数据发送方式
        async: false,  //是否异步请求
        dataType: "json",
        data: {
            oid : oid,
        },
        error: function () {
            layer.msg("请求失败");
        },
        success: function (result) {
            if (result.code === "0000") {
                layer.msg("取消成功！请从商户页面手动退款给客户！");
                setTimeout(function () {
                    window.location.reload();
                },1000);
            } else {
                layer.msg("发生异常，请重试！");
            }
        },
    });
}

