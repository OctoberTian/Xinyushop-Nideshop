package com.octber.shop.controller;

import com.octber.shop.entity.Orderview;
import com.octber.shop.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class NotifyController {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private GoodsService goodsService;

    private Integer id=0;
    private Integer maxWarning=0;

    @PostMapping("/admin/reset")
    public String reset(){
        maxWarning=0;
        return "success";
    }

    @PostMapping("/admin/warning")
    public String warning(Integer num){
        if(maxWarning<5) {
            maxWarning++;
            System.out.println("服务器负载过高！");
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("xinyusupermarket@163.com");
            message.setTo("925474088@qq.com");
            message.setSubject("主题：欣雨超市服务器负载过高！");
            message.setText("服务器负载过高，请留意!负载百分比：" + num + "%");

            SimpleMailMessage message2 = new SimpleMailMessage();
            message2.setFrom("xinyusupermarket@163.com");
            message2.setTo("3530621624@qq.com");
            message2.setSubject("主题：欣雨超市服务器负载过高！");
            message2.setText("服务器负载过高，请留意!负载百分比：" + num + "%,请联系维护人员！");

            mailSender.send(message);
            mailSender.send(message2);
            return "success";
        }else{
            return "success";
        }
    }

    @RequestMapping("/notify_again")
    public String xinyunotifyAgain(){
        Integer orderID = goodsService.getOrderId();
        if (id == 0 || !id.equals(orderID)) {
            //修改库存并修改下单时间
            if (!goodsService.changeNum(orderID)) {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom("xinyusupermarket@163.com");
                message.setTo("925474088@qq.com");
                message.setSubject("主题：BUG");
                message.setText("修改库存或修改销售量或修改下单时间有误！");
                mailSender.send(message);
            }
            id = orderID;
            try {
                Orderview orderview = goodsService.getById(orderID);
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom("xinyusupermarket@163.com");
                message.setTo("925474088@qq.com");
                message.setSubject("主题：欣雨超市新订单！");
                String msg = "用户:" + orderview.getUnickname() + "（ 用户电话：" + orderview.getTelephone() + " ）有新的订单，请及时处理！访问：http://blog.octber.xyz:8888/ 进行查看！";
                message.setText(msg);
                SimpleMailMessage message2 = new SimpleMailMessage();
                message2.setFrom("xinyusupermarket@163.com");
                message2.setTo("3530621624@qq.com");
                message2.setSubject("主题：欣雨超市新订单！");
                String msg2 = "用户:" + orderview.getUnickname() + "（ 用户电话：" + orderview.getTelephone() + " ）有新的订单，请及时处理！访问：http://blog.octber.xyz:8888/ 进行查看！";
                message2.setText(msg2);
                mailSender.send(message);
                mailSender.send(message2);
            }catch (Exception e){
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom("xinyusupermarket@163.com");
                message.setTo("925474088@qq.com");
                message.setSubject("主题：BUG");
                message.setText("xinyunotifyAgain() error！OrderView is Null！and order_id = "+orderID);
                mailSender.send(message);
            }
            return "<xml><return_code>SUCCESS</return_code></xml>";
        } else {
            System.out.println("避免重复发送短信：" + id);
            return "<xml><return_code>SUCCESS</return_code></xml>";
        }
    }

    @RequestMapping("/notify")
    public String xinyuNotify(){
        return "<xml><return_code>SUCCESS</return_code></xml>";
    }
}
