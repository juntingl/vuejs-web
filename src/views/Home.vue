<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg" />
    <!-- 帖子列表 Start -->
    <div class="col-md-9 topics-index main-col"><!-- 过滤帖子方式列表 Start -->
      <div class="panel panel-default">
        <div class="panel-heading">
          <ul class="list-inline topic-filter">
            <li v-for="item in filters" :key="item.name">
              <router-link
                v-title="item.title"
                :class="{ active: filter === item.filter }"
                :to="`/topics?filter=${item.filter}`"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="panel-body remove-padding-horizontal">
          <ul class="list-group row topic-list">
            <li v-for="article in articles" :key="article.articleId" class="list-group-item">
              <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="reply_count_area hidden-xs pull-right">
                <div class="count_set">
                  <span class="count_of_votes" title="投票数">{{ article.likeUsers ? article.likeUsers.length : 0 }}</span>
                  <span class="count_seperator">/</span>
                  <span class="count_of_replies" title="回复数">{{ article.comments ? article.comments.length : 0 }}</span>
                  <span class="count_seperator">|</span>
                  <abbr class="timeago">{{ article.date | moment('from') }}</abbr>
                </div>
              </router-link>
              <router-link :to="`/${article.uname}`" class="avatar pull-left">
                <img :src="article.uavatar" class="media-object img-thumbnail avatar avatar-middle">
              </router-link>
              <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="infos">
                <div class="media-heading">
                  {{ article.title }}
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="panel-footer text-right remove-padding-horizontal pager-footer">
          <Pagination :currentPage="currentPage" :total="total" :pageSize="pageSize" :onPageChange="changePage"/>
        </div>
      </div>
    </div><!-- 过滤帖子方式列表 End -->
    <!-- 帖子列表 End -->
    <TheSidebar/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TheSidebar from '@/components/layouts/TheSidebar';

export default {
  name: 'Home',
  components: {
    TheSidebar
  },
  data() {
    return {
      msg: '',
      msgType: '',
      msgShow: false,
      articles: [],
      filter: 'default', // 默认过滤方式
      filters: [ // 过滤方式列表
        { filter: 'default', name: '活跃', title: '最后回复排序' },
        { filter: 'excellent', name: '精华', title: '只看加精的话题' },
        { filter: 'vote', name: '投票', title: '点赞数排序'},
        { filter: 'recent', name: '最近', title: '发布时间排序'},
        { filter: 'noreply', name: '零回复', title: '无人问津的话题'}
      ],
      total: 0, // 文章总数
      pageSize: 10, // 每页条数
    };
  },
  // 组件内的路由导航守卫，在确认渲染该组件的对应路由前调用。
  // 该守卫不能访问 this，但我们通过传一个回调给 next，就可以使用上面的 vm 来访问组件实例。
  beforeRouteEnter(to, from, next) {
    // 路由的名称，对应路由配置中的 name
    const fromName = from.name;
    const logout = to.params.logout;

    // 确认导航
    next(vm => {
      // 通过 vm 参数访问组件实例，已登录时，评估路由名称
      if (vm.$store.state.auth) {
        switch (fromName) {
          // 如果从注册页面跳转过来
          case 'Register':
            vm.showMsg('注册成功');
            break;
          case 'Login':
            vm.showMsg('登录成功');
            break;
        }
      } else if (logout) {
        vm.showMsg('操作成功');
      }

      // 确认渲染该组件的对应路由时，设置相关数据
      vm.setDataByFilter(to.query.filter)
    });
  },
  computed: {
    ...mapState([
      'auth',
      'user'
    ]),
    // 当前页，从查询参数 page 返回
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    }
  },
  watch: {
    // 首页退出时 `beforeRouteEnter` 不会被调用
    // 监听下 auth 的值
    auth(newValue) {
      if (!newValue) {
        this.showMsg('操作成功');
      }
    },
    '$route'(to) {
      this.setDataByFilter(to.query.filter)
    }
  },
  methods: {
    showMsg(msg, type = 'success') {
      this.msg = msg;
      this.msgType = type;
      this.msgShow = true;
    },
    setDataByFilter(filter = 'default') {
      // 每页条数
      const pageSize = this.pageSize;
      // 当前页
      const currentPage = this.currentPage;
      // 设置当前过滤方式为查询参数的 filter
      this.filter = filter;
      // 设置文章列表为过滤后的所有文章
      const allArticles = this.$store.getters.getArticlesByFilter(filter);
      // 文章总数
      this.total = allArticles.length;
      // 当前页的文章
      this.articles = allArticles.slice(pageSize * (currentPage - 1), pageSize * currentPage);
    },
    // 回调，组件的当前页改变时调用
    changePage(page) {
      // 在查询参数中混入 page, 并跳转到该地址
      // 混入部分等价于 Object.assgin({}, this.$route.query, { page: page })
      this.$router.push({ query: { ...this.$route.query, page } });
    }
  }
};
</script>

<style scoped>
</style>
