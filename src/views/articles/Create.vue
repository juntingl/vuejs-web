<template>
  <div class="blog-container">
    <div class="blog-pages">
      <div class="col-md-12 panel">
        <div class="panel-body">
          <h2 class="text-center">创作文章</h2>
          <hr>
          <div data-validator-form>
            <div class="form-group">
              <input
                v-model.trim="title"
                v-validator.required="{ title: '标题' }"
                @input="saveTitle"
                type="text"
                class="form-control"
                placeholder="请填写标题"
              >
            </div>
            <div class="form-group">
              <textarea id="editor"></textarea>
            </div>
            <br>
            <div class="form-group">
              <button @click="post" class="btn btn-primary" type="submit">发 布</button>
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
import ls from '@/utils/localStorage';

// 添加全局变量
window.hljs = hljs;

export default {
  name: "Create",
  data () {
    return {
      title: '', // 文章标题
      content: '' // 文章内容
    }
  },
  // 元素挂载到实例之后调用
  mounted() {
    const simplemde = new SimpleMDE({
      // 绑定的 textarea 元素
      element: document.querySelector('#editor'),
      // 占位符
      placeholder: '请使用 Markdown 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。',
      // 禁用拼写检查
      spellChecker: false,
      // 不用自动下载 FontAwesome，因为我们刚好有使用 FontAwesome，所以不用自动下载
      autoDownloadFontAwesome: false,
      // 启用自动保存，uniqueId 是一个用于区别于其他站点的标识
      autosave: {
        enabled: true,
        uniqueId: 'vuejs-web'
      },
      // 启用代码高亮，需要引入 highlight.js
      renderingConfig: {
        codeSyntaxHighlighting: true
      }
    });

    // 监听编辑器的 change 事件
    simplemde.codemirror.on('change', () => {
      this.content = simplemde.value()
    })
    // 将 simplemde 添加到当前实例，以在其他地方调用
    this.simplemde = simplemde;
    // 初始化标题和内容
    this.fillContent();
  },
  methods: {
    saveTitle() {
      ls.setItem('smde_title', this.title)
    },
    fillContent() {
      const simplemde = this.simplemde;
      const title = ls.getItem('smde_title');

      // 如果 localStorage 有标题数据，使用它作为文章标题
      if (title !== null) {
        this.title = title
      }
      // 使用编辑器的内容作为文章内容
      this.content = simplemde.value();
    },
    post() {
      const title = this.title;
      const content = this.content;

      if (title !== '' && content.trim() !== '') {
        const article = {
          title,
          content
        };

        this.$store.dispatch('post', { article })
        this.clearData();
      }
    },
    clearData() {
      this.ttile = '';
      ls.removeItem('smde_title');
      // 清除编辑的内容
      this.simplemde.value('');
      // 清除编辑器自动保存的内容
      this.simplemde.clearAutosavedValue();
    }
  }
};
</script>

<style scoped>
.blog-container {
  max-width: 980px;
  margin: 0 auto;
  margin-top: 20px;
}
textarea {
  height: 200px;
}
</style>
