package com.octber.shop.utils;

import com.octber.shop.entity.Message;

/**
 * @author lihaotian
 * @data 2018/10/14 21:17
 */
public class ResultUtil {

    public ResultUtil() {
    }

    /**
     * 接口请求成功返回
     *
     * @param object
     * @return
     */
    public static Message success(Object object) {
        Message message = new Message();
        message.setCode("0000");
        message.setMsg("调用成功");
        message.setData(object);
        return message;
    }

    /**
     * 接口请求成功返回
     *
     * @return
     */
    public static Message success() {
        return success(null);
    }

    /**
     * 接口请求失败返回
     *
     * @param code
     * @param resultMessage
     * @return
     */
    public static Message error(String code, String resultMessage) {
        Message message = new Message();
        message.setCode(code);
        message.setMsg(resultMessage);
        return message;
    }
}
