<template>
  <div>
    <!-- .self 事件修饰符，当 event.target 是当前元素自身时触发事件处理函数 -->
    <div v-show="show" @click.self="close" class="modal" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button @click="close" class="close">X</button>
            <h4 class="modal-title">
              <slot name="title"></slot>
            </h4>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>

    <div v-show="show" @click="close" class="modal-backdrop fade in"></div>
  </div>
</template>

<script>
export  default {
  name: 'Modal',
  props: {
    // 是否显示隐藏
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      // 触发事件关闭弹窗
      this.$emit('update:show', false);
    }
  },
  watch: {
    show(value) {
      // 监听 show 值，来切换 body 上 modal-open 类
      const bodyClassList = document.body.classList;

      if (value) {
        bodyClassList.add('modal-open');
      } else {
        bodyClassList.remove('modal-open')
      }
    }
  }
}
</script>

<style scoped>

</style>
