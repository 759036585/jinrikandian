<template>
<!--    小智同学组件-->
  <div class="container">
    <van-nav-bar title="小智同学" fixed left-arrow @click-left="$router.back()"></van-nav-bar>
    <div class="chat-list" ref="myList">
      <div :class="{ left: item.name === 'xz', right: item.name!='xz' }" class="chat-item" v-for="(item, index) in list" :key="index">
        <van-image fit="cover" round :src="xzPhoto" v-if="item.name === 'xz'"/>
        <div class="chat-pao">{{ item.msg }}</div>
        <van-image fit="cover" round :src="photo" v-if="item.name !== 'xz'"/>
      </div>
    </div>
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="说点什么....">
        <van-loading v-if="loading" slot="button" type="spinner" size="16px"></van-loading>
        <span v-else @click="send()" slot="button" style="font-size: 12px;color: #999999">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import xzPhoto from '../../assets/xz.jpg'
import { mapState } from 'vuex'
import io from 'socket.io-client'

export default {
  computed: {
    ...mapState(['photo', 'user'])
  },
  name: 'chat',
  data () {
    return {
      value: '',
      loading: false,
      xzPhoto,
      list: []
    }
  },
  methods: {
    send () {
      if (!this.value) return false
      let obj = { name: 'self', msg: this.value, timestamp: Date.now() }
      this.socket.emit('message', obj)
      this.list.push(obj)
      this.value = ''
      this.scrollBottom()
    },
    scrollBottom () {
      this.$nextTick(() => {
        this.$refs.myList.scrollTop = this.$refs.myList.scrollHeight
      })
    }
  },
  created () {
    this.socket = io('http://ttapi.research.itcast.cn', { query: { token: this.user.token } })
    this.socket.on('connect', () => {
      console.log('和服务器建立连接成功')
      this.list.push({ msg: '小哥哥,你好啊', name: 'xz' })
    })
    this.socket.on('message', (date) => {
      this.list.push({ ...date, name: 'xz' })
      this.scrollBottom()
    })
  },
  beforeDestroy () {
    console.log('服务器关闭成功')
    this.socket.close()
  }
}
</script>

<style lang="less" scoped>
  .container {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    background:#fafafa;
    padding: 46px 0 50px 0;
    .chat-list {
      height: 100%;
      overflow-y: scroll;
      .chat-item{
        padding: 10px;
        .van-image{
          vertical-align: top;
          width: 40px;
          height: 40px;
        }
        .chat-pao{
          vertical-align: top;
          display: inline-block;
          min-width: 40px;
          max-width: 70%;
          min-height: 40px;
          line-height: 38px;
          border: 0.5px solid #c2d9ea;
          border-radius: 4px;
          position: relative;
          padding: 0 10px;
          background-color: #e0effb;
          word-break: break-all;
          font-size: 14px;
          color: #333;
          &::before{
            content: "";
            width: 10px;
            height: 10px;
            position: absolute;
            top: 12px;
            border-top:0.5px solid #c2d9ea;
            border-right:0.5px solid #c2d9ea;
            background: #e0effb;
          }
        }
      }
    }
  }
  .chat-item.right{
    text-align: right;
    .chat-pao{
      margin-left: 0;
      margin-right: 15px;
      &::before{
        right: -6px;
        transform: rotate(45deg);
      }
    }
  }
  .chat-item.left{
    text-align: left;
    .chat-pao{
      margin-left: 15px;
      margin-right: 0;
      &::before{
        left: -5px;
        transform: rotate(-135deg);
      }
    }
  }
  .reply-container {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 44px;
    width: 100%;
    background: #f5f5f5;
    z-index: 9999;
  }
</style>
