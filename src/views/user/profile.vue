<template>
<!--    编辑资料组件-->
  <div class="container">
    <van-nav-bar title="编辑资料" left-arrow right-text="保存" @click-left="$router.back()"></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像" center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          src=""
        />
      </van-cell>
      <van-cell is-link title="名称" @click="showName=true" :value="user.name" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: []
    }
  }
}
</script>

<style scoped>

</style>
