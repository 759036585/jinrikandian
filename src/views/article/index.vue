<template>
<!--    文章详情-->
  <div class="container">
    <van-nav-bar :title="article.title" fixed left-arrow @click-left="$router.back()" />
    <div class="detail">
      <h3 class="title">{{ article.title }}</h3>
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src=" article.aut_photo " />
        <div class="text">
          <p class="name">{{ article.aut_name }}</p>
          <p class="time">{{ article.pubdate | relTime }}</p>
        </div>
        <van-button round size="small" type="info" @click="follow()">{{ article.is_followed ? '已关注' : '+ 关注' }}</van-button>
      </div>
      <div class="content" v-html="article.content">
      </div>
      <div class="zan">
        <van-button  round size="small" :class="{active: article.attitude === 1 }" plain icon="like-o">点赞</van-button>
        <van-button  round size="small" :class="{active: article.attitude === 0 }" plain icon="delete">不喜欢</van-button>
      </div>
    </div>
    <comment></comment>
  </div>
</template>

<script>
import { getArticleInfo } from '../../api/article'
import { followUser, unFollowUser } from '../../api/user'
import Comment from './components/index'

export default {
  components: {
    Comment
  },
  data () {
    return {
      article: {}
    }
  },
  methods: {
    async follow () {
      try {
        if (this.article.is_followed) {
          await unFollowUser(this.article.aut_id)
        } else {
          await followUser({ target: this.article.aut_id })
        }
        this.article.is_followed = !this.article.is_followed
        if (this.article.is_followed) {
          this.$notify({ type: 'success', message: '关注成功' })
        } else {
          this.$notify({ type: 'danger', message: '取消关注成功' })
        }
      } catch (error) {
        this.$notify({ type: 'danger', message: '操作失败' })
      }
    },
    async getArticleInfo () {
      let { articleId } = this.$route.query
      this.article = await getArticleInfo(articleId)
    }
  },
  created () {
    this.getArticleInfo()
  }
}
</script>

<style lang="less" scoped>
  .container{
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
  }
  .detail{
    padding: 46px 10px 44px;
    .title{
      font-size: 18px;
      line-height: 2;
    }
    .zan{
      text-align: center;
      padding: 10px 0;
      .active{
        border-color: red;
        color: red;
      }
    }
    .author{
      padding: 10px 0;
      display: flex;
      position: sticky;
      background-color: #fff;
      top: 46px;
      .text{
        flex: 1;
        padding-left: 10px;
        line-height: 1.5;
        .name{
          font-size: 14px;
          margin: 0;
        }
        .time{
          margin: 0;
          font-size: 12px;
          color: #999999;
        }
      }
    }
    .content{
      padding: 20px 0;
      overflow: hidden;
      white-space: pre-wrap;
      word-break: break-all;
      /deep/ img{
        max-width: 100%;
        background: #f9f9f9;
      }
      /deep/ code{
        white-space: pre-wrap;
      }
    }
  }
</style>
