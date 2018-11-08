import MessageComponent from '@/components/Message';

export default {
  install: (Vue) => {
    // Vue.extend 用来创建一个新『子类』,其参数是一个包含组件选项的对象，对应我们这里的 Message 组件；
    const Message = Vue.extend(MessageComponent);
    // 创建一个新的实例， 未挂载状态
    const vm = new Message();
    // 使用 vm.$mount() 手动地挂载一个未挂载的实例，并返回当前实例，此时我们能从实例获取 $el;
    const $el = vm.$mount().$el;

    Vue.nextTick(() => {
      // 在下一次 DOM 更新后，将实例目标添加到 #main-container 元素内部的最前面
      document.querySelector('#main-container').prepend($el)
    })

    // 添加一个监听事件
    vm.$on('update:show', value => {
      vm.show = value;
    })

    // 添加 show 和 hide 方法来显示和关闭提示框
    const message = {
      show(msg = '', type = 'success') {
        vm.msg = msg;
        vm.type = type;
        vm.show = false;

        Vue.nextTick(() => {
          vm.show = true;
        })
      },
      hide() {
        Vue.nextTick(() => {
          vm.show = false;
        })
      }
    };

    // 添加实例方法
    Vue.prototype.$message = message;
  }
}
