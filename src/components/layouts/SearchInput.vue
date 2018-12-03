<template>
  <div class="navbar-form navbar-left hidden-sm">
    <div class="form-group">
      <input
        v-model.trim="searchValue"
        @keyup.enter="search"
        @input="updateSearchValue"
        type="text"
        class="form-control search-input mac-style"
        placeholder="搜索"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      value: ''
    }
  },
  computed: {
    searchValue: {
      get() {
        return this.$store.state.searchValue
      },
      set(newValue) {
        this.value = newValue
      }
    }
  },
  methods: {
    search() {
      const value = this.value;

      if (value !== '') {
        this.$router.push({
          name: 'Search',
          query: {
            q: value
          }
        })
      }
    },
    updateSearchValue() {
      this.$store.commit('UPDATE_SEARCH_VALUE', this.value)
    }
  }
}
</script>

<style scoped>
.search-input {
  background-image: url('../../assets/images/icon-search.png')
}
</style>
