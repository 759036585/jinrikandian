<template>
<!--    搜索结果组件-->
  <div class="container">
    <van-nav-bar title="搜索结果" @click-left="$router.back()" left-arrow></van-nav-bar>
    <van-list v-model="upLoading" :finished="finished" @load="onLoad">
      <van-cell-group>
        <van-cell v-for="item in articles" :key="item.art_id.toString()">
          <div class="article_item">
            <h3 class="van-ellipsis">{{ item.title }}</h3>
            <div class="img_box" v-if="item.cover.type === 3">
              <van-image class="w33" fit="cover" :src="item.cover.images[0]" />
              <van-image class="w33" fit="cover" :src="item.cover.images[1]" />
              <van-image class="w33" fit="cover" :src="item.cover.images[2]" />
            </div>
            <div class="img_box" v-if="item.cover.type === 1">
              <van-image class="w33" fit="cover" :src="item.cover.images[0]" />
            </div>
            <div class="info_box">
              <span>{{ item.aut_name }}</span>
              <span>{{ item.comm_count }}评论</span>
              <span>{{ item.pubdate | relTime }}</span>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import { searchArticle } from '../../api/article'

export default {
  name: 'result',
  data () {
    return {
      upLoading: false,
      finished: false,
      articles: [],
      page: {
        page: 1,
        per_page: 10
      }
    }
  },
  methods: {
    async onLoad () {
      let { q } = this.$route.query // 从地址栏解析查询参数
      let data = await searchArticle({ ...this.page, q })
      this.articles.push(...data.results)
      this.upLoading = false
      if (data.results.length) {
        this.page.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    padding-top: 46px;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
  }
  .article_item{
    h3{
      font-weight: normal;
      line-height: 2;
    }
    .img_box{
      display: flex;
      justify-content: space-between;
      .w33{
        width: 33.33%;
        height: 90px;
      }
      .w100{
        height: 180px;
        width: 100%;
      }
    }
    .info_box{
      color: #999999;
      line-height: 2;
      position: relative;
      span{
        padding-right: 10px;
      }
    }
  }
</style>
