<template>
    <div class="comment">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="item van-hairline--bottom van-hairline--top" v-for="comment in comments" :key="comment.com_id.toString()">
          <van-image round width="1rem" height="1rem" fit="fill" :src="comment.aut_photo" />
          <div class="info">
            <p>
              <span class="name">{{ comment.aut_name }}</span>
              <span style="float: right">
                <span class="van-icon van-icon-good-job-o zan"></span>
                <span class="count">{{ comment.like_count }}</span>
              </span>
            </p>
            <p>{{ comment.content }}</p>
            <p>
              <span class="time">{{ comment.pubdate | relTime }}</span>&nbsp;
              <van-tag plain @click="openReply(comment.com_id.toString())">{{ comment.reply_count }}回复</van-tag>
            </p>
          </div>
        </div>
      </van-list>
      <div class="reply-container van-hairline--top">
        <van-field v-model="value" placeholder="写评论...">
          <van-loading v-if="submiting" slot="button" type="spinner" size="16px"></van-loading>
          <span class="submit" @click="submit()" v-else slot="button">提交</span>
        </van-field>
      </div>
<!--      评论回复-->
      <van-action-sheet :round="false" v-model="showReply" @closed="reply.commentId=null" class="reply_dailog" title="回复评论">
        <van-list v-model="reply.loading" :finished="reply.finished" finished-text="没有更多了" @load="getReplys()" :immediate-check="false">
          <div class="item van-hairline--bottom van-hairline--top" v-for="item in reply.list" :key="item.com_id.toString()">
            <van-image round width="1rem" height="1rem" fit="fill" :src="item.aut_photo" />
            <div class="info">
              <p><span class="name">{{ item.aut_name }}</span></p>
              <p>{{ item.content }}</p>
              <p><span class="time">{{ item.pubdate | relTime }}</span></p>
            </div>
          </div>
        </van-list>
      </van-action-sheet>
    </div>
</template>

<script>
import { commentOrReply, getComments } from '../../../api/article'

export default {
  name: 'index',
  data () {
    return {
      loading: false,
      finished: false,
      value: '',
      submiting: false,
      comments: [],
      showReply: false,
      reply: {
        commentId: null,
        loading: false,
        finished: false,
        offset: null,
        list: []
      }
    }
  },
  methods: {
    async submit () {
      if (!this.value) return false
      this.submiting = true
      await this.$sleep()
      if (this.reply.commentId) {
        const data = await commentOrReply(this.reply.commentId, this.value, this.$route.query.articleId)
        this.reply.list.unshift(data.new_obj)
        const comment = this.comments.find(item => item.com_id.toString() === this.reply.commentId.toString())
        comment && comment.reply_count++
        this.value = ''
        this.submiting = false
      } else {
        const data = await commentOrReply(this.$route.query.articleId, this.value)
        this.comments.unshift(data.new_obj)
        this.value = ''
        this.submiting = false
      }
    },
    async onLoad () {
      let data = await getComments({
        type: 'a',
        offset: this.offset, // 偏移量
        source: this.$route.query.articleId // 获取文章id
      })
      this.comments.push(...data.results)
      this.loading = false
      this.finished = data.last_id === data.end_id // 是否一请求到最后一页
      if (!this.finished) {
        this.offset = data.last_id
      }
    },
    openReply (commentId) {
      this.showReply = true
      this.reply.commentId = commentId
      this.reply.list = []
      this.reply.offset = null
      this.reply.finished = false
      this.reply.loading = true
      this.getReplys()
    },
    async getReplys () {
      await this.$sleep()
      const data = await getComments({
        type: 'c',
        offset: this.reply.offset,
        source: this.reply.commentId
      })
      this.reply.list.push(...data.results)
      this.reply.loading = false
      this.reply.finished = data.end_id === data.last_id
      if (!this.reply.finished) {
        this.reply.offset = data.last_id
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .comment{
    margin-top: 10px;
    /deep/ .item {
      display: flex;
      padding: 10px 0;
      .van-image{
        padding-left: 10px;
      }
      .info{
          flex: 1;
          padding-left: 10px;
          .name{
            color: #069;
          }
          .zan{
            vertical-align: middle;
            padding-right: 2px;
          }
          .count{
            vertical-align: middle;
            font-size: 10px;
            color: #666;
          }
          .time{
            color: #666666;
          }
          p{
            padding: 5px 0;
            margin: 0 10px 0 0;
          }
        }
    }
    /deep/ .van-button:active::before{
      background: transparent;
    }
  }
  .reply_dailog{
    height: 100%;
    max-height: 100%;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    .van-action-sheet__header{
      background: #3296fa;
      color: #fff;
      .van-icon-close{
        color: #fff;
      }
    }
    .van-action-sheet__content{
      flex: 1;
      overflow-y: auto;
      padding: 0 10px 44px;
    }
  }
  .reply-container{
    position: fixed;
    left: 0;
    bottom: 0;
    height: 44px;
    width: 100%;
    background: #f5f5;
    z-index: 99999;
    .submit{
      font-size: 12px;
      color: #3296fa;
    }
  }

</style>
