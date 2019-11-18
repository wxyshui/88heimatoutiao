<template>
  <!-- 先定义一个大容器 -->
  <el-container>
    <!-- 先放置一个左侧 -->
   <div style="width:200px">
      <el-aside class="left" style="width:200px">
      <layout-left></layout-left>
    </el-aside>
   </div>
    <!-- 右侧大容器 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 顶栏组件 -->
        <layout-header></layout-header>
      </el-header>
      <!-- 中部区域 -->
      <el-main>
        <!-- 二级路由容器 -->
        <router-view :key='$route.path'></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutHeader from '../../components/layout-header'
import layoutLeft from '../../components/layout-left'
export default {
  components:
    {
      'layout-header': layoutHeader,
      'layout-left': layoutLeft
    }

}
</script>

<style lang='less' scoped >
.left {
  height: 100vh;
  background-color: #323745;
  overflow: hidden;
  position: fixed;
}
</style>
