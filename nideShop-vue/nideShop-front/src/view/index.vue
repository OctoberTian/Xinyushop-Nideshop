<template>
  <div class="index-container">
    <top-side v-bind:class="topNav"></top-side>
    <left-side></left-side>
    <router-view/>
  </div>
</template>

<script>
import leftSide from '@/components/commons/leftBar'
import topSide from '@/components/commons/topBar'
export default {
  name: 'index',
  data () {
    return {
      isFlod: false
    }
  },
  computed: {
    topNav () {
      if (!this.isFlod) {
        return 'top-side'
      } else {
        return 'top-side-flod'
      }
    }
  },
  components: { leftSide: leftSide, topSide: topSide },
  methods: {
    flod () {
      this.isFlod = !this.isFlod
    }
  }
}
</script>

<style scoped lang="stylus">
.index-container
  display -webkit-flex; /* Safari */
  display flex
  flex-direction column
.top-side
  position absolute
  top 0
  left 18%
  width 82%
.top-side-flod
  position absolute
  top 0
  left 5%
  width 95%
</style>
