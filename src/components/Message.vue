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
      // 触发 `update:show` 事件，更新 show
      // 组件内更新 props 值，不能直接修改，props 绑定的值是单向的（从父组件来的）
      // 需要更新 props 值，需要触发事件进行更新
      // 需要在组件内修改值，需要父组件监听事件处添加 `.sync` 修饰符,从而声明数据是双向绑定的，实质还是子组件触发事件传递新值
      // DESC: 例子
      // <Message :show.sync="msgShow"/>
      // 会被扩展为下面的形式：
      // <Message :show="msgShow" @update:show="val => msgShow = val" />
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped>
</style>
