<template>
  <div class="login">
    <!-- card卡片 -->
    <el-card class="login-card">
      <!-- 卡片内容 -->
      <div class="logo">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 -->
      <!-- model 属性  要绑定表单数据对象 -->
      <el-form style="margin-top:30px" :model="formData" :rules="rules" ref="formObj">
        <el-form-item prop="mobile">
          <!-- 手机号 -->
          <el-input placeholder="请您输入手机号" v-model="formData.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 验证码  -->
          <el-input style="width:280px " placeholder="请您输入验证码" v-model="formData.code"></el-input>
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <!-- 勾选框 -->
          <el-checkbox v-model="formData.checked">我已阅读并同意用户协议及条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <!-- 登录按钮 -->
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 验证的数据
      formData: {
        mobile: '',
        code: '',
        checked: false
      },
      rules: {
        // 校验的字段名 : 校验的规则为数组  可多条或者一条或者没有
        mobile: [
          { required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ],
        checked: [
          {
            validator: function (rule, value, callback) {
              // rule 代表当前的规则  无意义
              // value 代表当前的值 checked的值
              // callback  为回调函数
              if (value) {
                // 为真  执行 回调函数执行
                callback()
              } else {
                callback(new Error('您未同意用户协议及条款'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.formObj.validate(isOk => {
        if (isOk) {
          // 成功调用接口
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.formData
          }).then(res => {
            window.localStorage.setItem('token', res.data.data.token)
            // 编程式导航
            this.$router.push('/')
          }).catch(() => {
            this.$message({
              message: '手机号或验证码错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 360px;
    .logo {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>
