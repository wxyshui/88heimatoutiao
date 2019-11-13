<template>
  <div class="login">
    <!-- card卡片 -->
    <el-card class="login-card">
      <!-- 卡片内容 -->
      <div class="logo">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 -->
      <el-form style="margin-top:30px">
        <el-form-item>
          <!-- 手机号 -->
          <el-input placeholder="请您输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 验证码  -->
          <el-input style="width:280px " placeholder="请您输入验证码"></el-input>
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- 勾选框 -->
          <el-checkbox>
            我已阅读并同意用户协议及条款
          </el-checkbox>
        </el-form-item>
         <el-form-item>
          <!-- 登录按钮 -->
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
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
