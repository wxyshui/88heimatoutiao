<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <el-form  :model="publishForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="publishForm.title" placeholder="文章名称" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <quill-editor v-model=" publishForm.content"
                ref="myQuillEditor"
                >
                </quill-editor>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select v-model="publishForm.channel_id" placeholder="请选择">
            <el-option
            :label=item.name
            :value=item.id
            v-for= 'item in publishChannels'
            :key = item.id
            >
            </el-option>

          </el-select>
        </el-form-item>
        <!-- <el-form-item label="封面">
          <el-radio-group v-model="publishForm.cover">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item> -->
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
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      publishForm: {
        name: '',
        content: '',
        channel_id: '',
        cover: {
          type: 0,
          images: []
        }
      },
      publishChannels: null
    }
  },
  methods: {
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        // console.log(res)
        this.publishChannels = res.data.data.channels
      })
    },
    onSubmit (draft) {
      // const token = window.localStorage.getItem('token')
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
      }).then(res => {
        // console.log(res)
        this.$router.push('/article')
      }).catch(err => {
        console.log(err, '保存失败')
      })
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style>
</style>
