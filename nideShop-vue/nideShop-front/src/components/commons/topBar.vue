<template>
  <el-row>
    <!-- 注意：这里就是topNavState作用之处，根据当前路由所在根路由的type值判断显示不同顶部导航菜单 -->
    <!--v-show="$store.state.topNavState==='home'"-->
    <el-col :span="24">
      <el-menu :default-active="$route.paths" class="el-menu-top" mode="horizontal" @select="handleSelect" :router="true">
        <el-menu-item><img src="@/assets/xinyu2.jpg" alt="none" class="logo-img"/></el-menu-item>
        <el-menu-item index="/">工作台</el-menu-item>
        <el-menu-item index="/enterpriseManager">添加商品</el-menu-item>
        <el-menu-item index="/orderManager">修改运费</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'topBar'
}
</script>

<style scoped lang="stylus">
li
  font-size 1vw
.logo-img
  width 3vw
  height 6.5vh
  border-radius 5vh
  margin-left 2vw
.el-menu-top
  background-color #F5F5F5
  -webkit-box-shadow 0 0 20px #8B8B8B
  -moz-box-shadow 0 0 20px #d1c7e7
  box-shadow 0 0 20px #d1c7e7
  -o-box-shadow 0 0 20px #d1c7e7
  border-radius 2vh
</style>
