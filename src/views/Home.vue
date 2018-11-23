<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg" />
    <!-- 帖子列表 Start -->
    <div class="col-md-9 topics-index main-col"><!-- 过滤帖子方式列表 Start -->
      <div class="panel panel-default">
        <div class="panel-heading">
          <ul class="list-inline topic-filter">
            <li><a href="/topics?filter=default" class="active">活跃</a></li>
            <li><a href="/topics?filter=excellent">精华</a></li>
            <li><a href="/topics?filter=vote">投票</a></li>
            <li><a href="/topics?filter=recent">最近</a></li>
            <li><a href="/topics?filter=noreply">零回复</a></li>
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
              <router-link v-if="user" :to="`/${user.name}`" class="avatar pull-left">
                <img :src="user.avatar" class="media-object img-thumbnail avatar avatar-middle">
              </router-link>
              <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="infos">
                <div class="media-heading">
                  {{ article.title }}
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div><!-- 过滤帖子方式列表 End -->
    <!-- 帖子列表 End -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      msg: '',
      msgType: '',
      msgShow: false
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
    });
  },
  computed: {
    ...mapState([
      'auth',
      'user',
      'articles'
    ])
  },
  watch: {
    // 首页退出时 `beforeRouteEnter` 不会被调用
    // 监听下 auth 的值
    auth(newValue) {
      if (!newValue) {
        this.showMsg('操作成功');
      }
    }
  },
  methods: {
    showMsg(msg, type = 'success') {
      this.msg = msg;
      this.msgType = type;
      this.msgShow = true;
    }
  }
};
</script>

<style scoped>
</style>
