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
        <el-form-item label="活动区域">
          <el-select v-model="formData.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择:">
          <el-date-picker
            v-model="rangeDate"
            type="daterange"
            align="right"
            unlink-panels
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy--MM--dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain>查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 文章列表 -->
    <el-card style="margin-top:20px">
      <div slot="header" class="clearfix">
        <span style="margin-right:20px">共找到60077条符合条件的内容</span>
      </div>
      <el-table :data="tableData" style="width: 100%" class="table">
        <el-table-column prop="date" label="封面" width="180">
          <!-- 自定义组件 -->
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" alt width="50" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="status" label="发布状态">
          <template slot-scope="scope">
            <el-tag
              :type="articlestatus[scope.row.status].type"
            >{{ articlestatus[scope.row.status].label}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template>
            <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="sorter">
        <el-pagination background
          style="margin-top20px"
          :total=totalCount
          @current-change='onPageChange'
       ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'abc',
  data () {
    return {
      formData: {
        region: '',
        status: '' // 查询状态
      },
      rangeDate: '', // 时间参数
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
      totalCount: 0
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles (page) {
      const token = window.localStorage.getItem('token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: {
          Authorization: `Bearer ${token}`
        },
        // Qurey 参数用params 传递
        params: {
          page, // 页数
          per_page: 10// 每页数量
        }
      })
        .then(res => {
          // console.log(res)
          this.tableData = res.data.data.results
          this.totalCount = res.data.data.total_count
        })
        .catch(err => console.log(err, '获取失败'))
    },
    onPageChange (page) {
      this.loadArticles(page)
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
