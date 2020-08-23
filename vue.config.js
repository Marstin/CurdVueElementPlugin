const CurdVueElementPlugin = require ('./CurdVueElementPlugin/dist/CurdVueElementPlugin.js')
module.exports = {
  // 选项...
  configureWebpack: {
    plugins: [
      new CurdVueElementPlugin({options: true})
    ]
  }
}