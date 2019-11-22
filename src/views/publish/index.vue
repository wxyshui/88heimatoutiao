<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{$route.params.articleId ? '编辑文章':'发表文章'}}</span>
      </div>
      <el-form :model="publishForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="publishForm.title" placeholder="文章名称" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <quill-editor v-model="publishForm.content" style="width:900px"></quill-editor>
        </el-form-item>
        <el-form-item label="频道列表:">
          <!-- 频道列表组件 -->
          <article-channels v-model="publishForm.channel_id" :colde-all="false"></article-channels>
        </el-form-item>
        <!-- <el-form-item label="封面">
           <el-radio-group v-model="publishForm.cover">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发表</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// require styles
// 富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
// 频道列表插件
import ArticleChannels from '../../components/articlechannels'
export default {
  components: {
    quillEditor,
    ArticleChannels
  },
  name: 'abd',
  data () {
    return {
      publishForm: {
        title: '',
        content: '',
        channel_id: '',
        cover: {
          type: 0,
          images: []
        }
      }
    }
  },
  methods: {
    // 发布功能
    onSubmit (draft) {
      if (this.$route.params.articleId) {
        this.editArticle(draft)
      } else {
        this.publishArticle(draft)
      }
    },
    // 获取指定文章
    loadArticle () {
      this.$axios({
        method: 'GET',
        url: `articles/${this.$route.params.articleId}`
      }).then(res => {
        // console.log(res)
        this.publishForm = res.data.data
      })
    },
    // 发表文章
    publishArticle (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
        params: {
          draft
        },
        data: this.publishForm
      })
        .then(res => {
          // console.log(res)
          this.$router.push('/article')
        })
        .catch(err => {
          console.log(err, '保存失败')
        })
    },
    // 编辑文章
    editArticle (draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.articleId}`,
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
        params: {
          draft
        },
        data: this.publishForm
      })
        .then(res => {
          // console.log(res)
          this.$router.push('/article')
        })
        .catch(err => {
          console.log(err, '保存失败')
        })
    }
  },
  created () {
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
  }
}
</script>

<style lang='less' scope>
.ql-editor {
  min-height: 200px;

}
</style>
