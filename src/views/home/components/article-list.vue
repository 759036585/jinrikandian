<template>
    <div class="scroll-wrapper">
      <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
        <van-list v-model="upLoading" :finished="finished" @load="onLoad">
          <van-cell v-for="item in articles" :key="item.art_id.toString()" >
            <div class="article_item" >
              <h3 class="van-ellipsis">{{ item.title }}</h3>
              <div class="img_box" v-if="item.cover.type === 3">
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[0]" />
                <van-image lazy-load  class="w33" fit="cover" :src="item.cover.images[1]" />
                <van-image lazy-load  class="w33" fit="cover" :src="item.cover.images[2]" />
              </div>
              <div class="img_box" v-if="item.cover.type === 1">
                <van-image lazy-load  class="w100" fit="cover" :src="item.cover.images[0]"  />
              </div>
              <div class="info_box">
                <span>{{ item.aut_name }}</span>
                <span>{{ item.comm_count }}评论</span>
                <span>{{ item.pubdate | relTime }}</span>
                <span class="close" v-if="user.token" @click="$emit('showMoreAction', item.art_id.toString())">
                  <van-icon name="cross">
                  </van-icon>
                </span>
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
</template>

<script>
import eventBus from '../../../utils/eventBus'
import { getArticles } from '../../../api/article'
import { mapState } from 'vuex'
export default {
  name: 'article-list',
  props: {
    channel_id: {
      type: Number, // type是指定的类型
      default: null, // default 是默认值
      required: true // 要求必须传该props属性 否则报错
    }
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      upLoading: false, // 是否加载数据
      finished: false, // 加载是否完成
      downLoading: false, // 是否开启下拉刷新
      articles: [],
      refreshSuccessText: '',
      timestamp: null
    }
  },
  methods: {
    async onLoad () {
      await this.$sleep()
      let data = await getArticles({ channel_id: this.channel_id, timestamp: this.timestamp || Date.now() })
      // console.log(data)
      // 追加数据到队尾
      this.articles.push(...data.results)
      // 关闭加载状态
      this.upLoading = false
      if (data.pre_timestamp) {
        this.timestamp = data.pre_timestamp
      } else {
        this.finished = true // 没有数据了
      }
    },
    async onRefresh () {
      await this.$sleep()
      let data = await getArticles({ channel_id: this.channel_id, timestamp: Date.now() })
      this.downLoading = false // 关掉下拉状态
      if (data.results.length) {
        this.articles = data.results
        this.finished = false
        this.timestamp = data.pre_timestamp
        this.refreshSuccessText = '更新成功'
      } else {
        this.refreshSuccessText = '已是最新数据'
      }
    }
  },
  created () {
    eventBus.$on('delArticle', (articleId, channelId) => {
      if (this.channel_id === channelId) {
        let index = this.articles.findIndex(item => item.art_id.toString() === articleId)
        // 如果index大于-1 表示找到了 就要删除
        if (index > -1) {
          this.articles.splice(index, 1) // 删除不喜欢的文章
        }
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .article_item {
    h3 {
      font-weight: normal;
      line-height: 2;
    }
    .img_box {
      display: flex;
      justify-content: space-between;
      .w33 {
        width: 33%;
        height: 90px;
      }
      .w100 {
        width: 100%;
        height: 180px;
      }
    }
    .info_box {
      color: #999;
      line-height: 2;
      position: relative;
      font-size: 12px;
      span {
        padding-right: 10px;
        &.close {
          border: 1px solid #ddd;
          border-radius: 2px;
          line-height: 15px;
          height: 12px;
          width: 16px;
          text-align: center;
          padding-right: 0;
          font-size: 8px;
          position: absolute;
          right: 0;
          top: 7px;
        }
      }
    }
  }
</style>
