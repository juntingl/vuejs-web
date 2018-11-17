<template>
  <div class="blog-container">
    <div class="blog-pages">
      <div class="col-md-12 panel">
        <div class="panel-body">
          <h2 class="text-center">创作文章</h2>
          <hr>
          <div data-validator-form>
            <div class="form-group">
              <input v-validator.required="{ title: '标题' }" type="text" class="form-control" placeholder="请填写标题">
            </div>
            <div class="form-group">
              <textarea id="editor"></textarea>
            </div>
            <br>
            <div class="form-group">
              <button class="btn btn-primary" type="submit">发 布</button>
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

// 添加全局变量
window.hljs = hljs;

export default {
  name: "Create",
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
    })
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
