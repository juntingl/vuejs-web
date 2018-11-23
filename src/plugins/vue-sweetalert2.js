import swal from 'sweetalert2'

export default {
  install: (Vue) => {
    // sweetalert2 设置, 默认配置的方法 最新 7.29.1 写法支持 mixin 替换 setDefault
    const extendSwal = swal.mixin({
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(140,212,245)',
      cancelButtonColor: 'rgb(193,193,193)'
    })

    // 添加全局方法
    Vue.swal = extendSwal
    // 添加实例方法
    Vue.prototype.$swal = extendSwal
  }
}
