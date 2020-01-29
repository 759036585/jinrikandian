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
              <van-tag plain @click="showReply=true">{{ comment.reply_count }}回复</van-tag>
            </p>
          </div>
        </div>
      </van-list>
      <div class="reply-container van-hairline--top">
        <van-field v-model="value" placeholder="写评论...">
          <van-loading v-if="submiting" slot="button" type="spinner" size="16px"></van-loading>
          <span class="submit" v-else slot="button">提交</span>
        </van-field>
      </div>
    </div>
</template>

<script>
import { getComments } from '../../../api/article'

export default {
  name: 'index',
  data () {
    return {
      loading: false,
      finished: false,
      value: '',
      submiting: false,
      comments: []
    }
  },
  methods: {
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
        this.offset = this.last_id
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .comment{
    margin-top: 10px;
    /deep/ .item{
      display: flex;
      padding: 10px 0;
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
  .reply-container{
    position: fixed;
    left: 0;
    bottom: 0;
    height: 44px;
    width: 100%;
    background: #f5f5;
    z-index: 999;
    .submit{
      font-size: 12px;
      color: #3296fa;
    }
  }

</style>
