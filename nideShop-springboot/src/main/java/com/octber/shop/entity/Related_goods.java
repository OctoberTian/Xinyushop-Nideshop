package com.octber.shop.entity;

public class Related_goods {
    private Integer id;

    private Integer goodsId;

    private Integer relatedGoodsId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Integer goodsId) {
        this.goodsId = goodsId;
    }

    public Integer getRelatedGoodsId() {
        return relatedGoodsId;
    }

    public void setRelatedGoodsId(Integer relatedGoodsId) {
        this.relatedGoodsId = relatedGoodsId;
    }
}