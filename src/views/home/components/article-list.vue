<template>
    <div class="scroll-wrapper">
      <van-list v-model="upLoading" :finished="finished" @load="onLoad">
        <van-cell v-for="article in articles" :key="article" :title="article"></van-cell>
      </van-list>
    </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false, // 是否加载数据
      finished: false, // 加载是否完成
      articles: []
    }
  },
  methods: {
    onLoad () {
      // console.log('开始加载数据')
      setTimeout(() => {
        if (this.articles.length === 50) {
          this.finished = true
        } else {
          let arr = Array.from(Array(10), (value, index) => index + this.articles.length + 1)
          this.articles.push(...arr)
          this.upLoading = false
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>
