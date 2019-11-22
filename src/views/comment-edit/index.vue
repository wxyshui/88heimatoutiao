<template>
  <div>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-button style=" padding: 3px 0" type="text">返回全部图文</el-button>
  </div>
  <el-table :data="comment" style="width: 100%" class="table">
        <el-table-column prop="date" label="头像" width="180" align='center'>
          <!-- 自定义组件 -->
          <template slot-scope="scope">
            <img :src="scope.row.aut_photo" alt width="50" />
          </template>
        </el-table-column>
        <el-table-column prop="content" label="评论内容" width="180" align='center'>

        </el-table-column>
        <el-table-column prop="name" label="点赞" align='center'>
           <template slot-scope="scope">
            {{ scope.row.is_liking === 1 ? '取消点赞' : '点赞' }}

          </template>
        </el-table-column>
        <el-table-column prop="like_count" label="点赞数量" align='center'>

        </el-table-column>
        <el-table-column
          label="评论日期"
          align='center'
          >
          <template slot-scope="scope">
            {{scope.row.pubdate | dateformat}}
          </template>
        </el-table-column>
         <el-table-column
          prop="reply_count"
          label="回复数量"
          width="180"
          align='center'>
        </el-table-column>
         <el-table-column
          prop="is_top"
          label="是否推荐"
          width="180"
          align='center'>

            <template slot-scope="scope">
             <el-button
              type="text"
              @click="Top(scope.row)"
              >
              {{ scope.row.is_top == 1 ? '取消推荐' : '推荐' }}
              </el-button>

          </template>

        </el-table-column>
      </el-table>
</el-card>
  </div>
</template>

<script>
// 时间优化
// import moment from 'moment'
export default {
  // 除了this.$route.params 获取路由参数
  // 组件间的数据传递  获取路由参数
  // 在 路由上设置 props为true  组件props接受  （映射）
  name: 'aaa',
  data () {
    return {
      comment: []
    }
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  methods: {
    // 加载指定文章的评论
    loadCommentEdit () {
      this.$axios({
        method: 'GET',
        url: 'comments',
        params: {
          type: 'a',
          source: this.articleId
        }
      }).then(res => {
        console.log(res)
        const comment = res.data.data.results
        // comment.forEach(item => {
        //   // moment(指定时间).format(日期格式)
        //   item.pubdate = moment(item.pubdate).format('YYYY-MM-DD  HH:mm:ss')
        // })
        this.comment = comment
      }).catch(err => {
        console.log(err, '获取失败了')
      })
    },
    // 修改评论置顶
    Top (comment) {
      this.$axios({
        method: 'PUT',
        url: `comments/${comment.com_id}/sticky`,
        data: {
          sticky: !comment.is_top
        }
      }).then(res => {
        console.log(res)
        comment.is_top = !comment.is_top
      }).catch(err => {
        console.log(err)
        this.$message.error('获取数据失败')
      })
    }
  },
  created () {
    this.loadCommentEdit()
  },
  watch: {}

  //    局部 过滤器实例选项过滤器    过滤器函数可以直接在模板使用
  // 调用方式  {{ 数据 | 函数}}
  // filters: {
  //   dateformat (value) {
  //     return moment(value).format('YYYY-MM-DD HH:mm:ss')
  //   }
  // }

}
</script>

<style>

</style>
