package com.octber.shop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class ViewController {

    @GetMapping("/admin/categoryDetails")
    public String categoryDetails(String id, HttpSession session){
        session.setAttribute("category",id);
        return "product-category";
    }

    @GetMapping("/admin/showCate")
    public String showCate(){
        return "show-now-order";
    }

    @GetMapping("/admin/showOldCate")
    public String showOldCate(){
        return "show-old-order";
    }

    @GetMapping("/admin/newGood")
    public String newGood(){
        return "newGood";
    }

    @GetMapping("/admin/getProInfo")
    public String getProInfo(){
        return "productCard";
    }

    @GetMapping("/admin/addProInfo")
    public String addProInfo() {
        return "add_productCard";
    }

    @RequestMapping({"/admin","/admin/index"})
    public String homepage(HttpSession session){
        return "index";
    }
    @RequestMapping({"/","/login"})
    public String loginpage(){
        return "login";
    }

    @RequestMapping("/admin/welcome")
    public String welcome(){
        return "index";
    }

    @GetMapping("/admin/addProduct")
    public String addProduct(){ return "product-add"; }

    @GetMapping("/admin/productlist")
    public String showproducts(){
        return "product-list";
    }

    @GetMapping("/admin/fruitlist")
    public String showfruits(){return "fruit-list";}

    @GetMapping("/admin/productadd")
    public String addproduct(){return "product-add";}

    @GetMapping("/admin/noworderlist")
    public String shownoworders(){return "now-order-list";}

    @GetMapping("/admin/oldorderlist")
    public String showoldorders(){return "old-order-list";}

    @GetMapping("/admin/tealist")
    public String showteas(){return "tea-list";}

    @GetMapping("/admin/snacklist")
    public String showsnacks(){return "snack-list";}
}
