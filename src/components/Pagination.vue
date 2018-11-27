<template>
  <ul v-if="totalPage > 1" class="pagination">
    <li :class="{ disabled: internalCurrentPage === 1 }">
      <a href="javascript:;" @click="changePage(internalCurrentPage - 1)">«</a>
    </li>
    <li v-for="n in totalPage" :class="{ active: internalCurrentPage === n }" :key="`page_${n}`">
      <a href="javascript:;" @click="changePage(n)">{{ n }}</a>
    </li>
    <li :class="{ disabled: internalCurrentPage === totalPage }">
      <a href="javascript:;" @click="changePage(internalCurrentPage + 1)">»</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 数据总数
    total: {
      type: Number,
      required: true // 必须传入数据
    },
    pageSize: {
      type: Number,
      default: 10,
      validator: value => value > 0 // 自定义验证函数，验证 prop
    },
    // 当前页改变后的回调
    onPageChange: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      // 组件内的当前页
      internalCurrentPage: 1
    }
  },
  computed: {
    // 总页数
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    }
  },
  watch: {
    currentPage: { // 该回调将会在侦听开始之后被立即调用，去立即更新 internalCurrentPage 的值，
    // 如果只使用简单的监听回调，需要 currentPage 的当前值改变后才会触发，更新 internalCurrentPage 的值
      immediate: true,
      handler(page) {
        // 更新组件内的当前页，为父组件上 currentPage 的当前值
        this.internalCurrentPage = page;
      }
    }
  },
  methods: {
    changePage(page) {
      if (page === this.internalCurrentPage || page < 1 || page > this.totalPage) return
      // 点击的不是当前页时，触发 onPageChange 回调
      this.onPageChange(page)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
