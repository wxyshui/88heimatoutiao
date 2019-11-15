<template>
  <el-row type="flex" class="row-bg" justify="space-between" >
    <el-col :span="8" class='left'>
      <i class="el-icon-s-unfold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="3" class='right'>
      <img src="../assets/img/avatar.jpg" alt />
      <el-dropdown trigger="click" style="cursor:pointer">
        <span class="el-dropdown-link">
          昵称
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >个人信息</el-dropdown-item>
          <el-dropdown-item >git地址</el-dropdown-item>
          <el-dropdown-item >退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {}
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
     border-radius: 50%
  }
}
</style>
