package com.octber.shop.dao;

import com.octber.shop.entity.Category;
import com.octber.shop.entity.Goods;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CategoryMapper {
    @Select("select * from nideshop_category where parent_id=0")
    List<Category> lookCategory();

    @Select("select * from nideshop_goods where category_id=#{id} order by id desc")
    List<Goods> categoryDetails(Integer id);

    @Select("select * from nideshop_goods where id=#{id}")
    Goods findProduct(int id);

    @Update("update nideshop_goods set primary_pic_url=#{url} where id=#{id}")
    Integer updatePrimaryPic(@Param("url") String url,@Param("id")Integer id);

    @Update("update nideshop_goods set list_pic_url=#{url} where id=#{id}")
    Integer updateListPic(@Param("url") String url, @Param("id") Integer id);

    @Update("update nideshop_goods set name=#{name},goods_number=#{goodsNumber},goods_brief=#{goodsBrief},is_on_sale=#{isOnSale},goods_unit=#{goodsUnit},retail_price=#{retailPrice},goods_desc=#{goodsDesc} where id=#{id}")
    Integer updateGood(Goods good);

    @Delete("delete from nideshop_goods where id=#{id}")
    Integer deleteGood(@Param("id")int id);

    @Insert("insert into nideshop_goods (id,category_id,name,goods_number,goods_brief,goods_desc,is_on_sale,goods_unit,retail_price) " +
            "values(null,#{categoryId},#{name},#{goodsNumber},#{goodsBrief},#{goodsDesc},#{isOnSale},#{goodsUnit},#{retailPrice})")
    Integer addPro(Goods good);

    @Select("select LAST_INSERT_ID();")
    Integer getId();

    @Update("update nideshop_freight set freight= #{num} where id=1;")
    Integer changeFreight(@Param("num") Integer num);

    @Select("select freight from nideshop_freight where id = 1;")
    Integer getFreight();

    @Update("update nideshop_product set goods_number = #{goodsNumber},retail_price = #{retailPrice} where goods_id = #{id};")
    Integer updateNumber(Goods good);

    @Update("update nideshop_goods_specification set value = #{goodsUnit} where goods_id = #{id};")
    Integer updateSpecification(Goods good);

    @Select("select list_pic_url from nideshop_goods;")
    List<String> getListPic();
}
