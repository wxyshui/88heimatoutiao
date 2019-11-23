<template>
  <el-row type="flex" class="row-bg" justify="space-between">
    <el-col :span="8" class="left">
      <i class="el-icon-s-unfold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="3" class="right">
      <img :src="user.photo" alt />
      <el-dropdown trigger="click" style="cursor:pointer">
        <span class="el-dropdown-link">
         {{user.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <!-- 组件想注册原生js事件   要用native修饰符 -->
          <el-dropdown-item @click.native="onlogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../utils/event-bus.js'
export default {
  data () {
    return {
      user: {
        name: '',
        photo: ''
      }
    }
  },
  methods: {
    // 退出功能
    onlogout () {
      this.$confirm('确认退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除token
          window.localStorage.removeItem('token')
          // 跳转页面
          this.$router.push('/login')
          this.$message({

            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    },
    // 获取和人信息
    loadUser () {
      this.$axios({
        method: 'GET',
        url: 'user/profile'
      })
        .then(res => {
          console.log(res)
          this.user = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    // 获取个人信息
    this.loadUser()
    eventBus.$on('update-user', user => {
      this.user.name = user.name
      this.user.photo = user.photo
    })
  }
}
</script>

<style lang='less' scoped>
.left {
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  span {
    margin-left: 5px;
  }
}
.right {
  height: 60px;
  line-height: 60px;

  img {
    width: 35px;
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
  }
}
</style>
