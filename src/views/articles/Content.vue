<template>
  <div class="blog-container" style="margin-top:20px">
    <div class="blog-pages">
      <div class="col-md-9 left-col pull-right">
        <div class="panel article-body content-body">
          <h1 class="text-center">{{ title }}</h1>
          <div class="article-meta text-center">
            <i class="fa fa-clock-o"></i>
            <abbr>{{ date | moment('from', { startOf: 'minute' })}}</abbr>
          </div>
          <div class="entry-content">
            <div class="content-body entry-content panel-body ">
              <div class="markdown-body" v-html="content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde';
import hljs from 'highlight.js';
import emoji from 'node-emoji';

export default {
  name: 'Content',
  data() {
    return {
      title: '', // 文章标题
      content: '', // 文章内容
      date: '' // 创建时间
    }
  },
  // 在实例创建完成后,给属性值赋予初始化值
  created() {
    const articleId = this.$route.params.articleId
    const article = this.$store.getters.getArticleById(articleId)

    if (article) {
      let { title, content, date } = article;

      this.title = title;
      // 使用编辑器的 markdown 方法将 Markdown 内容转成 HTML
      // 为 => 先使用 emojify 方法解析 emoji 字符串标识，name => name 表示不认识的就返回原值
      this.content = SimpleMDE.prototype.markdown(emoji.emojify(content, name => name));
      this.date = date;

      this.$nextTick(() => {
        // 遍历当前实例下的 'pre code' 元素
        this.$el.querySelectorAll('pre code').forEach((el) => {
          // 使用 highlight.js 的 highlightBlock 方法进行高亮
          hljs.highlightBlock(el)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
