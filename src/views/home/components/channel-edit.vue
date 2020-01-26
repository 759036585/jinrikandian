<template>
    <div class="channel-edit">
      <div class="channel">
        <div class="tit">
          我的频道:
          <span class="tip">点击可进入频道</span>
          <van-button v-if="!editing" @click="editing=true" size="mini" type="info" plain>编辑</van-button>
          <van-button v-else @click="editing=false" size="mini" type="danger" plain>完成</van-button>
        </div>
        <van-grid class="van-hairline--left">
          <van-grid-item v-for="(index,i) in channels" :key="index.id">
            <span :class="{red: i===active}" class="f12" @click="$emit('selectChannel',index.id)">{{ index.name }}</span>
            <van-icon class="btn" name="cross" v-if="i !== 0" @click="$emit('delChannel',index.id)"></van-icon>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="channel">
        <div class="tit">可选频道:</div>
        <van-grid class="van-hairline--left">
          <van-grid-item v-for="index in optionalChannels" :key="index.id">
            <span class="f12">{{ index.name }}</span>
            <van-icon class="btn" name="plus"></van-icon>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
</template>

<script>
import { getAllChannels } from '../../../api/channels'

export default {
  props: ['channels', 'active'],
  name: 'channel-edit',
  computed: {
    optionalChannels () {
      return this.allChannels.filter(item => !this.channels.some(o => o.id === item.id))
    }
  },
  data () {
    return {
      editing: false,
      allChannels: [] // 所有频道
    }
  },
  methods: {
    async getAllChannels () {
      let data = await getAllChannels()
      this.allChannels = data.channels
    }
  },
  created () {
    this.getAllChannels()
  }
}
</script>

<style lang="less" scoped>
  .channel-edit {
    .channel {
      padding: 10px;
      .tit {
        line-height: 3;
        .tip {
          font-size: 10px;
          color: #999;
        }
      }
      .van-button {
        float: right;
        margin-top: 7px;
      }
      .btn {
        position: absolute;
        bottom: 0;
        right: 0;
        background: #ddd;
        font-size: 12px;
        color: #fff;
      }
      .f12 {
        font-size: 12px;
        color: #555;
      }
      .red {
        color: red;
      }
    }
  }

</style>
