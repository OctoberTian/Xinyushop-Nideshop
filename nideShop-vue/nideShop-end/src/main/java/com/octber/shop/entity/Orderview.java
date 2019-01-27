package com.octber.shop.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Orderview {
    private Integer oid;
    private Integer pid;
    private String otime;
    private Integer uid;
    private Double total;
    private String address;
    private String telephone;
    private Integer status;
    private String unickname;
    private String pname;
    private String pphoto;
    private Double pprice;
    private String ptype;
    private Integer pmount;
    private String orderSn;
}
