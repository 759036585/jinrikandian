<template>
<!--    布局组件-->
  <div class="container">
    <van-nav-bar
            title="今日看点"
            right-text="搜索"
            fixed
            v-if="showNavBar"
            @click-right="onClickRight"
    />
    <div class="my-wrapper" :class="{ noTop: !showNavBar}">
      <keep-alive>
        <transition :name="SkipSwitchName">
            <router-view class="position-div"></router-view>
<!--          <router-view></router-view>-->
        </transition>
      </keep-alive>
    </div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o" to="/question">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      active: 0,
      SkipSwitchName: ''
    }
  },
  computed: {
    showNavBar () {
      return this.$route.path !== '/user'
    }
  },
  methods: {
    onClickRight () {
      this.$router.push('/search')
    }
  },
  watch: {
    $route (to, from) {
      if (to.meta.tx < from.meta.tx) {
        this.SkipSwitchName = 'Skright'
      } else {
        this.SkipSwitchName = 'Skleft'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .position-div{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .Skright-enter-active,
  .Skright-leave-active,
  .Skleft-enter-active,
  .Skleft-leave-active{
    transition: all 600ms;
  }
  .Skright-enter{
    transform: translate3d(-100%, 0, 0);
  }
  .Skright-enter-leave-to{
    transform: translate3d(100%, 0, 0);
  }
  .Skleft-enter{
    transform: translate3d(100%, 0, 0);
  }
  .Skleft-enter-leave-to{
    transform: translate3d(-100%, 0, 0);
  }
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    .my-wrapper {
      width: 100%;
      height: 100%;
      overflow: hidden;
      padding-top: 46px;
      padding-bottom: 50px;
      box-sizing: border-box;
      &.noTop {
        padding-top: 0;
      }
    }
  }

</style>
