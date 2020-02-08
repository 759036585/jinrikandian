<template>
<!--    编辑资料组件-->
  <div class="container">
    <van-nav-bar title="编辑资料" left-arrow right-text="保存"  @click-left="$router.back()" @click-right="editUserinfo"></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像" center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          @click="showPhoto=true"
          :src="user.photo"
        />
      </van-cell>
      <van-cell is-link title="名称" @click="showName=true" :value="user.name" />
      <van-cell is-link title="性别" @click="showGender=true" :value="user.gender === 0 ? '男' : '女' " />
      <van-cell is-link title="生日" @click="showDate" :value="user.birthday"  />
    </van-cell-group>
<!--选择头像-->
    <van-popup v-model="showPhoto" position="bottom">
      <van-cell is-link title="本地相册选择图片" @click="openFile" />
      <van-cell is-link title="拍照" />
    </van-popup>
    <van-popup v-model="showName" style="width: 80%;height: 10%">
      <van-field v-model="user.name" required placeholder="请输入用户名" />
    </van-popup>
    <van-popup v-model="showGender" position="bottom">
      <van-cell is-link title="男" @click="changeGender(0)" />
      <van-cell is-link title="女" @click="changeGender(1)" />
    </van-popup>
    <van-popup v-model="showBirthday" position="bottom">
      <van-datetime-picker v-model="currentDate" type="date" :max-date="maxDate" :min-date="minDate" @cancel="showBirthday=false" @confirm="confirmDate" />
    </van-popup>
    <input type="file" ref="myFile" style="display: none" @change="upload()" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { editUserInfo, editUserPhoto, getUserProfile } from '../../api/user'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      user: {
        photo: '',
        name: '',
        gender: 0,
        birthday: '2019-08-08'
      },
      showPhoto: false,
      showName: false,
      showGender: false,
      showBirthday: false,
      currentDate: new Date(),
      maxDate: new Date(),
      minDate: new Date('1900-01-01')
    }
  },
  methods: {
    ...mapMutations(['updatePhoto']),
    async upload () {
      let data = new FormData()
      data.append('photo', this.$refs.myFile.files[0])
      let results = await editUserPhoto(data)
      this.user.photo = results.photo
      this.showPhoto = false
      this.updatePhoto({ photo: results.photo })
      this.$notify({ type: 'success', message: '修改成功' })
    },
    openFile () {
      this.$refs.myFile.click()
    },
    changeGender (type) {
      this.user.gender = type
      this.showGender = false
    },
    showDate () {
      this.currentDate = new Date(this.user.birthday)
      this.showBirthday = true
    },
    confirmDate (value) {
      this.user.birthday = dayjs(value).format('YYYY-MM-DD')
      this.showBirthday = false
    },

    async getUserProfile () {
      const data = await getUserProfile()
      this.user.name = data.name
      this.user.photo = data.photo
      this.updatePhoto({ photo: data.photo })
    },
    async editUserinfo () {
      try {
        await editUserInfo({ ...this.user, photo: null })
        this.$notify({ type: 'success', message: '修改成功' })
      } catch (error) {
        this.$notify({ type: 'danger', message: '修改失败' })
      }
    }
  },
  created () {
    this.getUserProfile()
  }
}
</script>

<style scoped>

</style>
