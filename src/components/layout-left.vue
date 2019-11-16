<template>
  <el-menu
    background-color="#353b4e"
    text-color="#adafb5"
    active-text-color="#ffd04b"
    style="width:216px"
    router
     >
      <div class='menu-title'>
          <img src="../assets/img/logo_admin.png" alt="" >
      </div>
    <el-menu-item index="/">首页</el-menu-item>
    <el-submenu index='1'>
      <template slot='title'>内容管理</template>
      <el-menu-item index="/pulish">发布文章</el-menu-item>
      <el-menu-item index='/article'>内容列表</el-menu-item>
      <el-menu-item  index='/comment'>评论列表</el-menu-item>
      <el-menu-item index='/image'>素材管理</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot='title'>粉丝管理</template>
      <el-menu-item>图文数据</el-menu-item>
      <el-menu-item>粉丝概况</el-menu-item>
      <el-menu-item>粉丝画像</el-menu-item>
      <el-menu-item>粉丝列表</el-menu-item>
    </el-submenu>
    <el-menu-item index="/account">账户信息</el-menu-item>
  </el-menu>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.menu-title {
    background-color: #2e2f32;
    padding: 15px 0;
    text-align: center;

    img {
        height: 25px;
    }
}
</style>
