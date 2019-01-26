package com.octber.shop.utils;

import java.util.HashMap;
import java.util.Map;

public class ErrorCode {
    public final static Map<String, String> ERROR = new HashMap<>();
    static {
        ERROR.put("0001", "Category error");
    }
}
