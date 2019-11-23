<template>
  <div>
    <el-card class="box-card" style="padding-left:30px">
      <div slot="header" class="clearfix">
        <span>账号信息</span>
      </div>
      <el-row type="flex" class="row-bg1" justify="space-between" style=" min-height:140px">
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-avatar shape="circle" :size="80" :src="user.photo"></el-avatar>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :http-request="onUpload"
            >
              <el-button type="text" style="margin-left:10px">更换头像</el-button>
            </el-upload>
          </div>
        </el-col>
        <el-col :span="21">
          <div class="grid-content bg-purple-light">
            <el-form ref="form" label-width="80px" v-if="seen">
              <el-form-item label="名称">
                <el-input v-model="user.name" style="width:180px"></el-input>
              </el-form-item>
              <el-form-item label="简介">
                <el-input v-model="user.intro" style="width:180px"></el-input>
              </el-form-item>

              <el-form-item size="large">
                <el-button type="primary" @click="onSaveName(1)">保存</el-button>
                <el-button @click="onCancel(1)">取消</el-button>
              </el-form-item>
            </el-form>
            <div v-else style="margin-top:10px">
              <p style="font-size:20px; margin:0px">{{user.name}}</p>
              <span style="font-size:14px">{{user.intro}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <el-button type="text" v-if="!seen" @click="onAmendStatus(1)">修改</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg2" justify="space-between">
        <el-col :span="3">
          <div class="grid-content bg-purple">账号信息</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple-light">头条号类型</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">个人</div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg3" justify="space-between">
        <el-col :span="3">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple-light">头条号ID</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">{{user.id}}</div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg4" justify="space-between">
        <el-col :span="3">
          <div class="grid-content bg-purple">登录方式</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple-light">绑定手机</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">{{user.mobile}}</div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg5" justify="space-between" style=" min-height:140px">
        <el-col :span="3">
          <div class="grid-content bg-purple">邮箱</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-light">
            <el-form ref="form" label-width="80px" v-if="ccc">
              <el-form-item label="邮箱">
                <el-input v-model="user.email" style="width:180px"></el-input>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" @click="onSaveName(2)">保存</el-button>
                <el-button @click="onCancel(2)">取消</el-button>
              </el-form-item>
            </el-form>
            <span v-else>{{user.email}}</span>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <el-button type="text" @click="onAmendStatus(2)">修改邮箱</el-button>
          </div>
        </el-col>
      </el-row>
      <div></div>
    </el-card>
  </div>
</template>

<script>
import eventBus from '../../utils/event-bus.js'
export default {
  data () {
    return {
      user: {
        email: '', // 邮箱
        intro: '', // 简介
        mobile: '', // 手机号
        name: '', // 昵称
        photo: '', // 头像
        id: '' // 用户id
      },
      seen: false,
      ccc: false
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    // 获取和人信息
    loadUser () {
      this.$axios({
        method: 'GET',
        url: 'user/profile'
      })
        .then(res => {
          console.log(res)
          this.user = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 点击修改状态
    onAmendStatus (status) {
      if (status === 1) {
        this.seen = !this.seen
      } else {
        this.ccc = !this.ccc
      }
    },
    // 点击保存
    onSaveName (status) {
      const { name, intro, email } = this.user
      this.$axios({
        method: 'PATCH',
        url: 'user/profile',
        data: {
          name,
          intro,
          email
        }
      }).then(() => {
        this.onAmendStatus(status)
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        eventBus.$emit('update-user', this.user)
      })
    },
    // 点击取消
    onCancel (status) {
      this.onAmendStatus(status)
      // this.loadUser()
    },
    // 上传头像
    onUpload (config) {
      const fd = new FormData()

      fd.append('photo', config.file)

      this.$axios({
        method: 'PATCH',
        url: '/user/photo',
        data: fd
      })
        .then(res => {
          // 更新图片地址
          this.user.photo = res.data.data.photo
          eventBus.$emit('update-user', this.user)
        })
        .catch(err => {
          console.log(err)
          this.$message.error('上传失败')
        })
    }
  }
}
</script>

<style lang='less' scope>
.row-bg1 {
  border-bottom: 1px solid #ccc;
}
.row-bg2 {
  height: 70px;
  line-height: 70px;
  .bg-purple-light {
    border-bottom: 1px solid #ccc;
  }
}
.row-bg3 {
  height: 70px;
  line-height: 70px;
  border-bottom: 1px solid #ccc;
}
.row-bg4 {
  height: 80px;
  line-height: 80px;
  border-bottom: 1px solid #ccc;
}
.row-bg5 {
  margin-top: 50px;
}
</style>
