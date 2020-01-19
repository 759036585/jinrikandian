<template>
<!--    登录组件-->
  <div class="container">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-cell-group>
      <van-field
        v-model.trim="loginForm.mobile"
        required
        :error-message="errorMessage.mobile"
        label="手机号"
        placeholder="请输入手机号"
        @blur="checkMobile"
      />
      <van-field
        v-model.trim="loginForm.code"
        required
        :error-message="errorMessage.code"
        label="短信验证码"
        placeholder="请输入短信验证码"
        @blur="checkCode"
      >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div style="padding: 0 10px;margin-top: 20px">
      <van-button type="primary" size="small" block style="border-radius: 20px" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '../../api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      loginForm: {
        mobile: null,
        code: null
      },
      errorMessage: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    checkMobile () {
      if (!this.loginForm.mobile) {
        this.errorMessage.mobile = '手机号不能为空'
        return false
      }
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errorMessage.mobile = '手机号码格式不正确'
        return false
      }
      this.errorMessage.mobile = ''
      return true
    },
    checkCode () {
      if (!this.loginForm.code) {
        this.errorMessage.code = '请输入验证码'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errorMessage.code = '验证码是6位数字'
        return false
      }
      this.errorMessage.code = ''
      return true
    },
    ...mapMutations(['updateUser']),
    async login () {
      if (this.checkMobile() && this.checkCode()) {
        // 表示验证通过 还要调用接口
        const data = await login(this.loginForm)
        // console.log(data)
        // 更新用户信息
        this.updateUser({ user: data })
        this.$notify({ type: 'success', message: '登录成功', duration: 800 })
        // 跳转
        let { redirectUrl } = this.$route.query // 结构当前的路由信息
        this.$router.push(redirectUrl || '/') // 短路表达式
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .van-cell-group {
    margin-top: 20px;
  }

</style>
