module.exports = {
  outputDir: undefined,
  baseUrl: process.env.NODE_ENV === 'production'
  ? '/vuejs-web/dist/'
  : '/',
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
}
