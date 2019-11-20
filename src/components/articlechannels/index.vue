<template>

 <el-select
    placeholder="请选择频道"
    :value='value'
    @input="$emit('input',$event)">
    <el-option label='所有频道' :value="null" v-if="coldeAll"></el-option>
            <el-option
            :label=item.name
            :value=item.id
            v-for= 'item in articleChannels'
            :key = item.id
            >
            </el-option>

          </el-select>

</template>

<script>
export default {
  data () {
    return {
      // 频道数据
      articleChannels: null
    }
  },
  props: {
    value: {
      type: [String, Number, null]
    },
    coldeAll: {
      type: Boolean,
      default: true

    }

  },
  methods: {
    // 文章频道的加载
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        // console.log(res)
        this.articleChannels = res.data.data.channels
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
