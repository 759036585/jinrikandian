<template>
<!--    搜索中心组件-->
  <div class="container">
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <van-search v-model.trim="q" placeholder="请输入搜索关键词" shape="round"></van-search>
    <van-cell-group class="suggest-box" v-if="q">
      <van-cell icon="search" v-for="(item,index) in suggestList" :key="index" @click="toSearchResult(item)">
        <span>{{ item }}</span>
      </van-cell>
    </van-cell-group>
    <div class="history-box" v-else-if="historyList.length">
      <div class="head">
        <span>历史记录</span>
        <van-icon name="delete" @click="clear"></van-icon>
      </div>
      <van-cell-group>
        <van-cell v-for="(item,index) in historyList" :key="index" @click="toSearchResult(item)">
          <a class="word_btn">{{ item }}</a>
          <van-icon class="close_btn" slot="right-icon" name="cross" @click="delHistory(index)"></van-icon>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { suggestion } from '../../api/article'

const key = 'hm-91-toutiao-history'
export default {
  name: 'index',
  watch: {
    // 通过函数防抖来进行联想搜索
    // q () {
    //   clearTimeout(this.timer)
    //   this.timer = setTimeout(async () => {
    //     if (!this.q) {
    //       this.suggestList = []
    //       return
    //     }
    //     let data = await suggestion({ q: this.q })
    //     this.suggestList = data.options
    //   })
    // }
    // 通过函数节流来进行联想搜索
    q () {
      if (!this.timer) {
        this.timer = setTimeout(async () => {
          this.timer = null
          if (!this.q) {
            this.suggestList = []
            return false
          }
          let data = await suggestion({ q: this.q })
          // console.log(data)
          this.suggestList = data.options
        }, 300)
      }
    }
  },
  data () {
    return {
      q: '',
      historyList: [],
      suggestList: null
    }
  },
  created () {
    this.historyList = JSON.parse(localStorage.getItem(key) || '[]')
  },
  methods: {
    delHistory (index) {
      this.historyList.splice(index, 1)
      localStorage.setItem(key, JSON.stringify(this.historyList))
    },
    toSearchResult (text) {
      // 放入历史记录
      let obj = new Set(this.historyList) // 生成一个set变量 set对象自动去重
      obj.add(text)
      this.historyList = Array.from(obj) // 将set转回数组
      localStorage.setItem(key, JSON.stringify(this.historyList)) // 重新写入缓存
      this.$router.push({ path: '/search/result', query: { q: text } })
    },
    clear () {
      this.historyList = []
      localStorage.setItem(key, '[]')
    }
  }
}
</script>

<style lang="less" scoped>
  .history-box{
    padding: 0 20px;
    .head{
      line-height: 36px;
      color: #999;
      .van-icon{
        font-size: 16px;
        float: right;
        margin-top: 10px;
      }
    }
    .van-cell{
      padding: 10px 0;
    }
    .word_btn{
      color: #3296fa;
    }
    .close_btn{
      margin-top: 5px;
      color: #999999;
    }
  }
  .suggest-box{
    /deep/ .van-cell{
      padding: 10px 20px;
      color: #999999;
      p{
        span{
          color: red;
        }
      }
    }
  }

</style>
