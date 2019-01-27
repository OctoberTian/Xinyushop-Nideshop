package com.octber.shop.controller;

import com.octber.shop.entity.Admin;
import com.octber.shop.entity.Message;
import com.octber.shop.service.CategoryService;
import com.octber.shop.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@CrossOrigin
@RestController
public class AdminController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping("/adminlogin")
    public Message adminlogin(Admin admin, HttpSession session){
        session.setAttribute("admin",admin);
        System.out.println("登录用户为："+admin.toString());
        return ResultUtil.success();
    }

}
