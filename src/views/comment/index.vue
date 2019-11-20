<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
     >
      <el-table-column
        prop="title"
        label="标题"
        width="180"
        align='center'
        >
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数"
        width="180"
        align='center'>
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数"
        width="180"
        align='center'>
      </el-table-column>
      <el-table-column
        label="评论状态"
         align='center'>
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change='ChangeStatus(scope.row)'>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
         align='center'>
        <template slot-scope="scope">
          <el-button
          type="primary"
          size='mini'
          @click='$router.push(`/comment/${scope.row.id}`)'
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total= totalCount
      class="sorter"
      @current-change='changePage'
      :disabled = loading
      >
    </el-pagination>
    <!-- <template>
      <el-button :plain="true" @click="open1">成功</el-button>
      <el-button :plain="true" @click="open2">警告</el-button>
    </template> -->
  </div>
</template>

<script>
export default {
  name: 'comment',
  data () {
    return {
      tableData: [],
      loading: false,
      totalCount: null
    }
  },
  methods: {
    // 加载评论列表
    loadComment (page) {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: 'articles',
        params: {
          response_type: 'comment',
          page
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.data.results
        this.totalCount = res.data.data.total_count
      }).catch(err => {
        console.log(err, '获取失败')
      }).finally(() => {
        this.loading = false
      })
    },
    // 分页器改变
    changePage (page) {
      this.loadComment(page)
    },
    // 状态改变
    ChangeStatus (obj) {
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: obj.id.toString()
        },
        data: {
          allow_comment: obj.comment_status
        }
      }).then(res => {
        this.$message({
          message: `${obj.comment_status ? '启用' : '关闭'}成功`,
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.loadComment()
  }

}
</script>

<style lang='less' scope>
.sorter {
text-align: center;
margin-top: 30px;
}
</style>
