package com.octber.shop.dao;

import com.octber.shop.entity.Order;
import com.octber.shop.entity.Order_goods;
import com.octber.shop.entity.Orderview;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface GoodsMapper {

    @Select("select max(id) from nideshop_order;")
    Integer getId();

    @Select("select * from nideshop_order where id = #{id} limit 1;")
    Order getOrderById(@Param("id")Integer id);

    @Select("select * from nideshop_order_goods where order_id = #{id};")
    List<Order_goods> getOrderGoodsById(@Param("id")Integer id);

    @Select("select * from order_view order by oid desc;")
    List<Orderview> getAllOrderview();

    @Update("update nideshop_order set shipping_status = 1 where id = #{id};")
    Integer send(@Param("id") Integer id);

    @Delete("delete from nideshop_order where id=#{id}")
    Integer delOrder(@Param("id")Integer id);

    @Delete("delete from nideshop_order_goods where order_id=#{id}")
    Integer delOrderGoods(@Param("id")Integer id);

    @Select("select * from order_view where oid = #{oid} limit 1;")
    Orderview getById(@Param("oid") Integer oid);

    @Update("update nideshop_goods set goods_number = goods_number - #{num} , sell_volume = sell_volume + #{num} where id = #{id}; ")
    Integer changeGoods(@Param("id") Integer goodsId,@Param("num")Integer number);

    @Update("update nideshop_product set goods_number = goods_number - #{num} where goods_id = #{id}; ")
    Integer changeProduct(@Param("id") Integer goodsId,@Param("num")Integer number);

    @Update("update nideshop_order set order_time = #{format} where id = #{oid};")
    Integer changeTime(@Param("oid") Integer oid, @Param("format") String format);
}
