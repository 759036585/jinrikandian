<template>
<!--    首页组件-->
  <div class="container">
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <article-list @showMoreAction="openMoreAction" :channel_id="item.id"></article-list>
      </van-tab>
    </van-tabs>
    <span class="bar_btn" @click="showChannelEdit=true">
      <van-icon name="wap-nav"/>
    </span>
    <van-popup :style="{ width: '80%' }" v-model="showMoreAction">
<!--      <more-action @dislike="dislike" @report="report($event)"></more-action>-->
      <more-action @dislike="dislikeOrReport($event, 'dislike')" @report="dislikeOrReport($event, 'report')"></more-action>
    </van-popup>
    <van-action-sheet :round="false" title="编辑频道" v-model="showChannelEdit">
      <channel-edit :channels="channels" @selectChannel="selectChannel"></channel-edit>
    </van-action-sheet>
  </div>
</template>

<script>
import MoreAction from './components/more-action'
import ChannelEdit from './components/channel-edit'
import ArticleList from './components/article-list'
import { getMyChannels } from '../../api/channels'
import { disLikeArticle, reportArticle } from '../../api/article'
import eventBus from '../../utils/eventBus'
export default {
  components: {
    ArticleList,
    MoreAction,
    ChannelEdit
  },
  name: 'index',
  data () {
    return {
      active: 0,
      channels: [],
      showMoreAction: false, // 控制反馈组件显示隐藏
      articleId: null, // 定义一个值接受
      showChannelEdit: false
    }
  },
  methods: {
    selectChannel (id) {
      let index = this.channels.findIndex(item => item.id === id) // 获取切换频道的索引
      this.active = index // 将tabs激活标签切换到对应的标签下
      this.showChannelEdit = false // 关闭弹层
    },
    // async report (params) {
    //   try {
    //     if (this.articleId) {
    //       await reportArticle({
    //         target: this.articleId,
    //         type: params
    //       })
    //       this.$notify({ type: 'success', message: '操作成功' })
    //       eventBus.$emit('delArticle', this.articleId, this.channels[this.active].id)
    //       this.showMoreAction = false
    //     }
    //   } catch (error) {
    //     this.$notify({ type: 'danger', message: '操作失败' })
    //   }
    // },
    // async dislike () {
    //   try {
    //     if (this.articleId) {
    //       await disLikeArticle({
    //         target: this.articleId
    //       })
    //       this.$notify({ type: 'success', message: '操作成功' })
    //       eventBus.$emit('delArticle', this.articleId, this.channels[this.active].id)
    //       this.showMoreAction = false
    //     }
    //   } catch (error) {
    //     this.$notify({ type: 'danger', message: '操作失败' })
    //   }
    // },
    async dislikeOrReport (params, operatetype) {
      try {
        if (this.articleId) {
          operatetype === 'dislike' ? await disLikeArticle({
            target: this.articleId
          }) : await reportArticle({
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
