<template>
  <el-menu ref="leftNav" v-bind:class="leftStyle" @open="handleOpen" @close="handleClose" :collapse="isCollapse" router unique-opened
           background-color="#272C33"
           text-color="#F5F5F5"
           active-text-color="#696969">
    <div class="logo-div">
      <img src="@/assets/mylogo2.png" alt="none" v-show="!isCollapse" class="logo-img"/>
      <img src="@/assets/flod.png" alt="none" @click="flod" v-bind:class="btnSmall"/>
    </div>
    <el-menu-item index="/home/main">
      <i class="el-icon-document"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu v-for="item in content" :key="item.id" :data="item" v-if="item.children.length>0&&item.level===1" :index="item.linkname">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">{{item.linkname}}</span>
      </template>
      <el-submenu v-for="child in item.children" :data="child" v-if="item.id===child.parentid&&child.children.length>0&&child.level===2" :key="child.id" :index="child.linkname">
        <span slot="title">{{child.linkname}}</span>
        <el-menu-item v-for="three in child.children" :data="three" v-if="child.id===three.parentid&&child.children.length!==0&&three.level===3" :key="three.id" :index="three.link">
          <span slot="title">{{three.linkname}}</span>
        </el-menu-item>
      </el-submenu>
      <!--2无子级显示-->
      <el-menu-item v-for="child in item.children" :data="child" v-if="item.id===child.parentid&&child.children.length===0&&child.level===2" :key="child.id" :index="child.link">
        <span slot="title">{{child.linkname}}</span>
      </el-menu-item>
    </el-submenu>
    <!--1无子级显示且不支持点击事件-->
    <el-menu-item v-for="item in content" :key="item.id" :data="item" v-if="item.children.length===0&&item.level===1" :index="item.linkname" :disabled="item.children.length===0 ? true : false ">
      <i class="el-icon-setting"></i>
      <span slot="title">{{item.linkname}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'leftBar',
  computed: {
    leftStyle () {
      if (!this.isCollapse) {
        return 'left-side'
      } else {
        return 'left-flod'
      }
    },
    btnSmall () {
      if (!this.isCollapse) {
        return 'btn-small'
      } else {
        return 'btn-small-flod'
      }
    }
  },
  data () {
    return {
      isCollapse: false,
      defaultProps: {
        children: 'children',
        label: 'linkname'
      },
      content: [
        {
          linkname: '商品管理',
          id: 1,
          level: 1,
          children: [
            {
              id: 1,
              level: 2,
              parentid: 1,
              linkname: '推荐',
              link: '/index',
              children: []
            },
            {
              id: 1,
              level: 2,
              parentid: 1,
              linkname: '水果',
              link: '/index',
              children: []
            },
            {
              id: 1,
              level: 2,
              parentid: 1,
              linkname: '饮料',
              link: '/index',
              children: []
            },
            {
              id: 1,
              level: 2,
              parentid: 1,
              linkname: '零食',
              link: '/index',
              children: []
            },
            {
              id: 1,
              level: 2,
              parentid: 1,
              linkname: '百货',
              link: '/index',
              children: []
            },
            {
              id: 1,
              level: 2,
              parentid: 1,
              linkname: '粮油',
              link: '/index',
              children: []
            }
          ]
        },
        {
          linkname: '订单管理',
          id: 2,
          level: 1,
          children: [
            {
              id: 2,
              level: 2,
              parentid: 2,
              linkname: '当前订单',
              link: '/index',
              children: []
            },
            {
              id: 2,
              level: 2,
              parentid: 2,
              linkname: '历史订单',
              link: '/index',
              children: []
            }
          ]
        }
      ]
    }
  },
  mounted () {
    // this.$fetch('/admin/lookCategory').then(response => {
    //   this.msg = response.data
    //   console.log('res', response)
    // })
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleNodeClick (content) {
      console.log(content)
    },
    flod () {
      this.isCollapse = !this.isCollapse
      this.$parent.flod()
    }
  }
}
</script>

<style lang="stylus" scoped>
span
  font-size .8rem
  font-family "Microsoft Sans Serif"
.left-side
  position absolute
  left 0
  top 0
  width 18%
  height 100%
.left-flod
  position absolute
  left 0
  top 0
  width 5%
  height 100%
.logo-img
  position relative
  margin 10% 15%
  width 11vw
.btn-small-flod
  background-color #E74C3C
  border-radius 10vh
  width 5.5vh
  height 5.5vh
  display flex
  justify-content center
  align-items center
  margin-top 10%
.logo-div
  display flex
  flex-direction row
  justify-content center
  align-items center
.btn-small
  background-color #E74C3C
  border-radius 10vh
  width 5.5vh
  height 5.5vh
  display flex
  justify-content center
  align-items center
  margin-right -10%
  margin-top 5%
</style>
