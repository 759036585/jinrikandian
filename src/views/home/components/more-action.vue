<template>
    <div class="more-action">
      <van-cell-group v-if="!isReport">
        <van-cell @click="$emit('dislike')">不感兴趣</van-cell>
        <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
        <van-cell>拉黑作者</van-cell>
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
        <van-cell v-for="item in reports" :key="item.value" @click="$emit('report', item.value)" >{{ item.label}}</van-cell>
      </van-cell-group>
    </div>
</template>

<script>
import { reports } from '../../../api/constants'
import eventBus from '../../../utils/eventBus'

export default {
  name: 'more-action',
  data () {
    return {
      isReport: false,
      reports
    }
  },
  created () {
    eventBus.$on('delArticle', () => (this.isReport = false)) // 重置状态
  }
}
</script>

<style scoped>
  .more-action {
    border-radius: 10px;
  }

</style>
