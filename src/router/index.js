import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout' // 布局组件
import Home from '../views/home' // 首页组件
import Question from '../views/home/question' // 首页组件
import Video from '../views/home/video' // 问答组件
import User from '../views/home/user' // 个人中心组件
import Profile from '../views/user/profile' // 编辑资料组件
import Chat from '../views/user/chat' // 小智同学组件
import Login from '../views/login' // 登录组件
import Search from '../views/search' // 搜索中心组件
import Result from '../views/search/result' // 搜索结果组件
import Article from '../views/article' // 文章详情组件
Vue.use(VueRouter)

const routes = [
  { path: '/',
    component: Layout,
    children: [ // 二级路由组件
      { path: '/', component: Home },
      { path: '/question', component: Question },
      { path: '/video', component: Video },
      { path: '/user', component: User }
    ]
  }, // 一级路由组件
  { path: '/user/profile', component: Profile },
  // 小智同学组件
  { path: '/user/chat', component: Chat },
  // 登陆组件
  { path: '/login', component: Login },
  { path: '/search', component: Search },
  { path: '/search/result', component: Result },
  { path: '/article', component: Article }

]

const router = new VueRouter({
  routes
})

export default router
