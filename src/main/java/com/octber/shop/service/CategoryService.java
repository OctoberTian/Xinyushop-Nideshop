package com.octber.shop.service;

import com.octber.shop.dao.CategoryMapper;
import com.octber.shop.entity.Goods;
import com.octber.shop.entity.Message;
import com.octber.shop.utils.ErrorCode;
import com.octber.shop.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryMapper categoryMapper;
    
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
    
    public Message lookCategory(){
        try{
            return ResultUtil.success(categoryMapper.lookCategory());
        }catch (Exception e){
            sendmessage(EMAIL,BUG,e.getMessage());
            return ResultUtil.error("0001", ErrorCode.ERROR.get("0001"));
        }
    }

    public Message categoryDetails(Integer id) {
        try{
            return ResultUtil.success(categoryMapper.categoryDetails(id));
        }catch (Exception e){
            sendmessage(EMAIL,BUG,e.getMessage());
            return ResultUtil.error("0001", ErrorCode.ERROR.get("0001"));
        }
    }

    public Message findProduct(int id) {
        try{
            return ResultUtil.success(categoryMapper.findProduct(id));
        }catch (Exception e){
            sendmessage(EMAIL,BUG,e.getMessage());
            return ResultUtil.error("0001", ErrorCode.ERROR.get("0001"));
        }
    }

    public Message updatePrimaryPic(String url,String picid) {
        try{
            return ResultUtil.success(categoryMapper.updatePrimaryPic(url,Integer.parseInt(picid)));
        }catch (Exception e){
            sendmessage(EMAIL,BUG,e.getMessage());
            return ResultUtil.error("0001", ErrorCode.ERROR.get("0001"));
        }
    }

    public Message updateListPic(String url, String picid) {
        try{
            return ResultUtil.success(categoryMapper.updateListPic(url,Integer.parseInt(picid)));
        }catch (Exception e){
            sendmessage(EMAIL,BUG,e.getMessage());
            return ResultUtil.error("0001", ErrorCode.ERROR.get("0001"));
        }
    }

    public Message updateGood(Goods good) {
        try{
            Integer num = categoryMapper.updateNumber(good);
            Integer num2 = categoryMapper.updateSpecification(good);
            if(num!=null && num2!=null) {
                return ResultUtil.success(categoryMapper.updateGood(good));
            }else{
                sendmessage(EMAIL,BUG,"CategoryService():updateGood:修改货物信息同时更新到nideshop_product表时失败！或者：修改货物分类错误！");
                return ResultUtil.success();
            }
        }catch (Exception e){
            sendmessage(EMAIL,BUG,e.getMessage());
            return ResultUtil.error("0001", ErrorCode.ERROR.get("0001"));
        }
    }

    public Message deleteGood(int id) {
        try{
            return ResultUtil.success(categoryMapper.deleteGood(id));
        }catch (Exception e){
            sendmessage(EMAIL,BUG,e.getMessage());
            return ResultUtil.error("0001", ErrorCode.ERROR.get("0001"));
        }
    }

    public Message addPro(Goods good) {
        try {
            if (categoryMapper.addPro(good) != null) {
                //Integer proId = categoryMapper.getId();
                //Goods thisGood = categoryMapper.findProduct(proId);
                return ResultUtil.success(categoryMapper.getId());
            } else {
                return ResultUtil.error("0001", ErrorCode.ERROR.get("0001"));
            }
        } catch (Exception e) {
            sendmessage(EMAIL,BUG,e.getMessage());
            return ResultUtil.error("0001", ErrorCode.ERROR.get("0001"));
        }
    }

    public Message changeFreight(Integer num) {
        try {
            return ResultUtil.success(categoryMapper.changeFreight(num));
        } catch (Exception e) {
            sendmessage(EMAIL,BUG,e.getMessage());
            return ResultUtil.error("0001", ErrorCode.ERROR.get("0001"));
        }
    }

    public Integer getFreight() {
        try {
            return categoryMapper.getFreight();
        } catch (Exception e) {
            sendmessage(EMAIL,BUG,e.getMessage());
            return -1;
        }
    }

    public List<String> getListPic() {
        return categoryMapper.getListPic();
    }
}
