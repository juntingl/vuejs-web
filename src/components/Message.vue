<template>
  <div v-show="show" :class="`alert alert-${type} alert-dismissible`">
    <!-- 当使用 .close 按钮时，它必须是 .alert-dismissible 的第一个子元素，并且在它之前不能有任何文本内容。 -->
    <button @click="close" type="button" class="close"><span>×</span></button>
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    // 是否显示消息框
    show: {
      type: Boolean,
      default: false
    },
    // 消息框类型
    type: {
      type: String,
      default: 'success'
    },
    // 消息
    msg: {
      type: String,
      default: ''
    }
  },
  watch: {
    show(value) {
      if (value) {
        this.$nextTick(() => {
          // 当前的元素滚动到浏览器窗口的可视区域内, 实验中的功能
          this.$el.scrollIntoView(true)
        })
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped>
</style>
