package com.octber.shop.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author lihaotian
 * @data 2018/10/14 21:14
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Message<T> {
    private String code;
    private String msg;
    private T data;
}
