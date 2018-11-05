/**
 * 对 sweetalert2 进行封装, 封装成 vue 可用的插件
 * @fileOverview
 * @author pycoder.Junting
 * @email: 342766475@qq.com
 * @Date: 2018-11-05 22:36:27
 * @Last Modified by: pycoder.Junting
 * @Last Modified time: 2018-11-05 22:42:31
 */

 import swal from 'sweetalert2';

 export default {
   // Vue 插件扩展公开方法
   install: (Vue) => {
    //  sweetalert2 设置，默认配置的方法
    swal.setDefaults({
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(140, 212, 245)',
      cancelButtonColor: 'rgb(193, 193, 193)'
    })

    // 添加全局的方法
    Vue.swal = swal;
    // 添加实例的方法
    Vue.prototype.$swal = swal
   }
 }
