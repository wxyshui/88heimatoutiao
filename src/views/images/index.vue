<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>图文管理</span>
      </div>
      <el-radio-group v-model="type" size="small" @change='onFind'>
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
      <el-button type="success" style="float:right" @click="onUpload">上传图片</el-button>
      <input type="file" ref="file" hidden @change="onFileChange" />
      <el-row :gutter="20" style="margin-top:30px">
        <el-col
        :xs="24"
        :sm="12"
        :md="6"
        v-for="item in images"
        :key = item.id
        class="col-item"
        >
          <el-card :body-style="{ padding: '0px'}">
            <img :src=item.url   width="100%" height="200px"/>
            <div class="icon" v-show="type === '全部'">
              <i :class="{
                'el-icon-star-off':!item.is_collected,
               ' el-icon-star-on':item.is_collected
              }"
              style="cursor:pointer" @click="onCollect(item)"></i>
              <i class="el-icon-delete-solid" style="cursor:pointer" @click='onDelete(item.id)'></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="sorter">
        <el-pagination background
          :total=totalCount
          @current-change='onPageChange'
          :current-page= page
       ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'images',
  data () {
    return {
      type: '全部',
      images: [],
      totalCount: null,
      page: 1
    }
  },
  methods: {
    onUpload () {
      this.$refs.file.click()
    },
    // 上传图片
    onFileChange () {
      // 获取用户选择的文件对象
      const flieObj = this.$refs.file.files[0]

      // 创建数据表单
      const formData = new FormData()

      // 手动往表单数据中添加成员
      formData.append('image', flieObj)

      // 请求上传
      this.$axios({
        method: 'POST',
        url: 'user/images',
        data: formData
      })
        .then(res => {
          // console.log(res)
          this.loadImage(false)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 加载图片
    loadImage (isCollect, page) {
      this.$axios({
        method: 'GET',
        url: 'user/images',
        params: {
          collect: isCollect, // 是否获取收藏图片
          page,
          per_page: 10
        }
      })
        .then(res => {
          // console.log(res)
          this.images = res.data.data.results
          this.totalCount = res.data.data.total_count
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 点击全部收藏切换
    onFind () {
      this.loadImage(this.type === '收藏')
    },
    // 点击分页器
    onPageChange (page) {
      this.loadImage(this.type === '收藏', page)
    },
    // 点击删除
    onDelete (imageId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'DELETE',
          url: `user/images/${imageId}`
        }).then(res => {
          // console.log(res)
          this.loadImage(this.type === '收藏', this.page)
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 收藏状态的改变
    onCollect (collect) {
      this.$axios({
        method: 'PUT',
        url: `user/images/${collect.id}`,
        data: {
          collect: !collect.is_collected
        }
      }).then(res => {
        collect.is_collected = !collect.is_collected
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.loadImage()
  }
}
</script>

<style scope lang='less'>
.col-item {
 margin-bottom: 20px;
}
.box-card{
  width: 1100px;
  .icon {
    background-color: #eee;
    font-size: 24px;
    padding: 14px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
