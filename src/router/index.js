import Vue from 'vue'
import VueRouter from 'vue-router'
// 登录组件
import Login from '../views/login'
// 结构组件
import Layout from '../views/layout'
// 首页组件
import Home from '@/views/home'
// 发表文章组件
import Pulish from '@/views/publish'
// 文章列表组件
import Article from '@/views/article'
// 评论列表组件
import Comment from '@/views/comment'
// 账户设置组件
import Account from '@/views/account'
// 素材管理组件
import Image from '@/views/images'
// @  是  vuecli 中提供的一种特殊路径规则  他直接指向  src 目录

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: '/pulish',
        component: Pulish
      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/comment',
        component: Comment
      },
      {
        path: '/account',
        component: Account
      },
      {
        path: '/image',
        component: Image
      }
    ]
  }, {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// 路由拦截器    让我们没登录就不可以访问 别的页面
// to  表示去哪里的路由信息
// from 表示来自哪里的路由信息
// next  他是一个方法  用于路由放行
// 判断用户的登录状态  有就通过  没有就不通过
router.beforeEach((to, from, next) => {
  // 登录页面 直接放行
  console.log(to)
  if (to.path === '/login') {
    next()
    return
  }
  // 非登录页面  判断token
  const token = window.localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
