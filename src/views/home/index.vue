<template>
<!--    首页组件-->
  <div class="container">
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <article-list @showMoreAction="openMoreAction" :channel_id="item.id"></article-list>
      </van-tab>
    </van-tabs>
    <span class="bar_btn">
      <van-icon name="wap-nav"/>
    </span>
    <van-popup :style="{ width: '80%' }" v-model="showMoreAction">
      <more-action @dislike="dislike" @report="report($event)"></more-action>
    </van-popup>
  </div>
</template>

<script>
import MoreAction from './components/more-action'
import ArticleList from './components/article-list'
import { getMyChannels } from '../../api/channels'
import { disLikeArticle, reportArticle } from '../../api/article'
import eventBus from '../../utils/eventBus'
export default {
  components: {
    ArticleList,
    MoreAction
  },
  name: 'index',
  data () {
    return {
      active: 0,
      channels: [],
      showMoreAction: false, // 控制反馈组件显示隐藏
      articleId: null // 定义一个值接受
    }
  },
  methods: {
    async report (params) {
      try {
        if (this.articleId) {
          await reportArticle({
            target: this.articleId,
            type: params
          })
          this.$notify({ type: 'success', message: '操作成功' })
          eventBus.$emit('delArticle', this.articleId, this.channels[this.active].id)
          this.showMoreAction = false
        }
      } catch (error) {
        this.$notify({ type: 'danger', message: '操作失败' })
      }
    },
    async dislike () {
      try {
        if (this.articleId) {
          await disLikeArticle({
            target: this.articleId
          })
          this.$notify({ type: 'success', message: '操作成功' })
          eventBus.$emit('delArticle', this.articleId, this.channels[this.active].id)
          this.showMoreAction = false
        }
      } catch (error) {
        this.$notify({ type: 'danger', message: '操作失败' })
      }
    },
    openMoreAction (artId) {
      this.showMoreAction = true
      this.articleId = artId
    },
    // 获取频道
    async getMyChannels () {
      let data = await getMyChannels()
      // console.log(data)
      this.channels = data.channels
    }
  },
  created () {
    this.getMyChannels()
  }
}
</script>

<style lang="less" scoped>
  .van-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
    /deep/ .van-tabs__wrap {
      height: 36px;
      padding-right: 36px;
      .van-tab {
        line-height: 36px;
      }
      .van-tab__line {
        background-color: #3296fa;
        height: 2px;
      }
    }
    /deep/ .van-tabs__content {
      flex: 1;
      overflow: hidden;
    }
    /deep/ .van-tab__pane {
      height: 100%;
      .scroll-wrapper {
        height: 100%;
        overflow-y: auto;
      }
    }
  }
  .bar_btn {
    width: 36px;
    height: 36px;
    position: absolute;
    top: 0;
    right: 0;
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 999;
      box-shadow: 0 0 10px #999;
      transform: scale(1,0.6);
    }
    .van-icon-wap-nav {
      width: 100%;
      height: 100%;
      background: #fff;
      text-align: center;
      line-height: 35px;
      position: relative;
      z-index: 1000;
      &::before {
        font-size: 20px;
      }
    }
  }

</style>
