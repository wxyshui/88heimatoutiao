<template>
  <div>
    <!-- 筛选 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="margin-right:20px">全部图文</span>
      </div>
      <el-form :model="formData" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="formData.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表:">
          <!-- 频道列表组件 -->
          <article-channels  v-model="formData.channel_id"></article-channels>
        </el-form-item>
        <el-form-item label="时间选择:">
          <el-date-picker
            v-model="rangeDate"
            type="daterange"
            align="right"
            unlink-panels
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='loadArticles()'>查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 文章列表 -->
    <el-card style="margin-top:20px">
      <div slot="header" class="clearfix">
        <span style="margin-right:20px">共找到{{totalCount}}条符合条件的内容</span>
      </div>
      <el-table :data="tableData" style="width: 100%" class="table"  v-loading="loading">
        <el-table-column prop="date" label="封面" width="180" align='center'>
          <!-- 自定义组件 -->
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" alt width="50" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180" align='center'></el-table-column>
        <el-table-column prop="status" label="发布状态" align='center'>
          <template slot-scope="scope">
            <el-tag
              :type="articlestatus[scope.row.status].type"
            >{{ articlestatus[scope.row.status].label}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期" align='center'></el-table-column>
        <el-table-column prop="address" label="操作" align='center'>
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click='$router.push(`/publish/${scope.row.id}`)'></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click='onDelete(scope.row.id)'></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="sorter">
        <el-pagination background
          style="margin-top20px"
          :total=totalCount
          @current-change='onPageChange'
          :disabled = loading
          :current-page= page
       ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import ArticleChannels from '../../components/articlechannels'
export default {
  name: 'abc',
  components: {
    ArticleChannels
  },
  data () {
    return {
      loading: false,
      formData: {
        channel_id: null, // 频道id
        status: null // 查询状态
      },
      rangeDate: null, // 时间参数
      tableData: [], // 文章列表
      articlestatus: [
        // 状态数组
        {
          label: '草稿',
          type: 'info'
        },
        {
          label: '待审核',
          type: 'warning'
        },
        {
          label: '审核通过',
          type: 'success'
        },
        {
          label: '审核失败',
          type: 'danger'
        },
        {
          label: '已删除',
          type: ''
        }
      ],
      // 文章的数据个数
      totalCount: 0,
      // 当前页
      page: null
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    // 页面加载
    loadArticles (page) {
      this.loading = true
      // const token = window.localStorage.getItem('token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
        // Qurey 参数用params 传递
        params: {
          page, // 页数
          per_page: 10, // 每页数量
          status: this.formData.status, // 状态
          channel_id: this.formData.channel_id, // 频道id
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始时间
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null// 结束时间
        }
      })
        .then(res => {
          // console.log(res)
          this.tableData = res.data.data.results
          this.totalCount = res.data.data.total_count
          this.page = res.data.data.page
        })
        .catch(err => console.log(err, '获取失败'))
        .finally(() => {
          this.loading = false
        })
    },
    // 点击分页 页面跳转
    onPageChange (page) {
      this.loadArticles(page)
    },

    // 文章的删除
    onDelete (targrt) {
      // const token = window.localStorage.getItem('token')
      this.$axios({
        method: 'DELETE',
        url: `/articles/${targrt}`
        // headers: {
        //   Authorization: `Bearer ${token}`
        // }
      }).then(res => {
        // console.log(res)
        this.loadArticles(this.page)
      }).catch(err => {
        console.log(err, '删除失败')
      })
    }
  }
}
</script>

<style lang='less' scoped>
.sorter {
  margin-top: 20px;
  text-align: center;
}
</style>
