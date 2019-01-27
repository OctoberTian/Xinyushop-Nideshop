package com.octber.shop.service;

import com.octber.shop.dao.GoodsMapper;
import com.octber.shop.entity.Message;
import com.octber.shop.entity.Order;
import com.octber.shop.entity.Order_goods;
import com.octber.shop.entity.Orderview;
import com.octber.shop.utils.ErrorCode;
import com.octber.shop.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class GoodsService {
    @Autowired
    private GoodsMapper goodsMapper;

    @Autowired
    private JavaMailSender mailSender;

    public static final String EMAIL="925474088@qq.com";
    public static final String BUG="异常问题";


    public void sendmessage(String sendTo, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("xinyusupermarket@163.com");
        message.setTo(sendTo);
        message.setSubject("主题："+subject);
        message.setText(text);
        mailSender.send(message);
    }

    public Message getAllOrderview(Boolean boo){
        try{
            List<Orderview> allOrderview= goodsMapper.getAllOrderview();
            List<Orderview> newOrder = new ArrayList<>();
            List<Orderview> oldOrder = new ArrayList<>();
            for(Orderview orderview:allOrderview){
                if(orderview.getStatus()==0){
                    newOrder.add(orderview);
                }else{
                    oldOrder.add(orderview);
                }
            }
            if(boo){
                return ResultUtil.success(newOrder);
            }else{
                return ResultUtil.success(oldOrder);
            }
        }catch (Exception e){
            sendmessage(EMAIL,BUG,e.getMessage());
            return ResultUtil.error("0001", ErrorCode.ERROR.get("0001"));
        }
    }

    public Message send(Integer id) {
        try{
            return ResultUtil.success(goodsMapper.send(id));
        }catch (Exception e){
            sendmessage(EMAIL,BUG,e.getMessage());
            return ResultUtil.error("0001", ErrorCode.ERROR.get("0001"));
        }
    }

    public Message del(Integer id) {
        try{
            Integer num1 = goodsMapper.delOrderGoods(id);
            Integer num2 = goodsMapper.delOrder(id);
            if(num1!=null && num2!=null) {
                return ResultUtil.success();
            }else{
                return ResultUtil.error("0001", ErrorCode.ERROR.get("0001"));
            }
        }catch (Exception e){
            sendmessage(EMAIL,BUG,e.getMessage());
            return ResultUtil.error("0001", ErrorCode.ERROR.get("0001"));
        }
    }

    public Integer getOrderId() {
        try{
            return goodsMapper.getId();
        }catch (Exception e){
            sendmessage(EMAIL,BUG,e.getMessage());
            return -1;
        }
    }

    public boolean changeNum(Integer oid) {
        try{
            //修改库存和销售量
            Order thisOrder = goodsMapper.getOrderById(oid);
            if(thisOrder.getOrderStatus()) {
                List<Order_goods> orderGoods = goodsMapper.getOrderGoodsById(oid);
                for (Order_goods order : orderGoods) {
                    goodsMapper.changeGoods(order.getGoodsId(), order.getNumber());
                    goodsMapper.changeProduct(order.getGoodsId(), order.getNumber());
                }
            }else{
                return false;
            }
            //修改下单时间：
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
            return goodsMapper.changeTime(oid, df.format(new Date())) != null;
        }catch (Exception e){
            sendmessage(EMAIL,BUG,e.getMessage());
        }
        return false;
    }

    public Orderview getById(Integer orderID) {
        try {
            return goodsMapper.getById(orderID);
        } catch (Exception e) {
            sendmessage(EMAIL, BUG, e.getMessage());
            return new Orderview();
        }
    }
}
