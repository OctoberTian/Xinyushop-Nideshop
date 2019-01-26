package com.octber.shop.controller;

import com.octber.shop.entity.Goods;
import com.octber.shop.entity.Message;
import com.octber.shop.service.CategoryService;
import com.octber.shop.service.GoodsService;
import com.octber.shop.utils.ResultUtil;
import com.octber.shop.utils.UploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private GoodsService goodsService;

    @PostMapping("/admin/changeFreight")
    public Message changeFreight(Integer num) {
        return categoryService.changeFreight(num);
    }

    @PostMapping("/admin/getFreight")
    public Integer getFreight() {
        return categoryService.getFreight();
    }

    @PostMapping("/admin/showOrder")
    public Message showOrder(Boolean boo) {
        return goodsService.getAllOrderview(boo);
    }

    @PostMapping("/admin/send")
    public Message send(Integer oid) {
        return goodsService.send(oid);
    }

    @PostMapping("/admin/del")
    public Message del(Integer oid) {
        return goodsService.del(oid);
    }

    @GetMapping("/admin/lookCategory")
    public Message lookCategory() {
        return categoryService.lookCategory();
    }

    @PostMapping("/admin/getProductList")
    public Message categoryDetails(HttpSession session) {
        Integer id = Integer.parseInt((String) session.getAttribute("category"));
        return categoryService.categoryDetails(id);
    }

    @PostMapping("/admin/getProInfo")
    public Message getProInfo(String id) {
        int pid = Integer.parseInt(id);
        return categoryService.findProduct(pid);
    }

    @PostMapping("/admin/upload")
    public Message upload(@RequestParam(value = "file", required = false) MultipartFile file, String picid) {
        try {
            if (file.isEmpty()) {
                return ResultUtil.error("1111", "文件为空");
            } else {
                //String id= UUID.randomUUID().toString();//生成的id942cd30b-16c8-449e-8dc5-028f38495bb5中间含有横杠，<span style="color: rgb(75, 75, 75); font-family: Verdana, Arial, Helvetica, sans-serif; line-height: 20.7999992370605px;">用来生成数据库的主键id是很实用的。</span>
                //id=id.replace("-", "");//替换掉中间的那个斜杠
                String uploadDir = UploadUtil.LOCATION;
                File dir = new File(uploadDir);
                if (!dir.exists()) {
                    dir.mkdirs();
                }

                String filename = System.currentTimeMillis() + file.getOriginalFilename();
                File serverFile = new File(uploadDir + "/" + filename);
                file.transferTo(serverFile);
                //修改数据库
                String str = picid.substring(picid.length() - 1, picid.length());
                picid = picid.substring(0, picid.length() - 1);
                if (str.equals("1")) {
                    return ResultUtil.success(categoryService.updatePrimaryPic(UploadUtil.URL + filename, picid));
                } else {
                    return ResultUtil.success(categoryService.updateListPic(UploadUtil.URL + filename, picid));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResultUtil.error("1111", "文件操作异常");
        }
    }

    @PostMapping("/admin/addPro")
    public Message addPro(Goods good) {
        return categoryService.addPro(good);
    }

    @PostMapping("/admin/updateGood")
    public Message updateGood(Goods good) {
        return categoryService.updateGood(good);
    }

    @PostMapping("/admin/deleteGood")
    public Message deleteGood(String id) {
        return categoryService.deleteGood(Integer.parseInt(id));
    }

    @GetMapping("/downloadListPic")
    public String downloadListPic() throws Exception {
        List<String> urls = categoryService.getListPic();
        for (String str : urls) {
            //new一个URL对象
            URL url = new URL(str);
            //打开链接
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            //设置请求方式为"GET"
            conn.setRequestMethod("GET");
            //超时响应时间为5秒
            conn.setConnectTimeout(5 * 1000);
            //通过输入流获取图片数据
            InputStream inStream = conn.getInputStream();
            //得到图片的二进制数据，以二进制封装得到数据，具有通用性
            byte[] data = readInputStream(inStream);
            //new一个文件对象用来保存图片，默认保存当前工程根目录
            String[] strs = str.split("/");
            String filename = strs[strs.length-1];
            File imageFile = new File(UploadUtil.DOWNLOAD+filename);
            //创建输出流
            FileOutputStream outStream = new FileOutputStream(imageFile);
            //写入数据
            outStream.write(data);
            //关闭输出流
            outStream.close();
        }
        return"success";
    }

    public static byte[] readInputStream (InputStream inStream) throws Exception {
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        //创建一个Buffer字符串
        byte[] buffer = new byte[1024];
        //每次读取的字符串长度，如果为-1，代表全部读取完毕
        int len = 0;
        //使用一个输入流从buffer里把数据读取出来
        while ((len = inStream.read(buffer)) != -1) {
            //用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度
            outStream.write(buffer, 0, len);
        }
        //关闭输入流
        inStream.close();
        //把outStream里的数据写入内存
        return outStream.toByteArray();
    }
}
