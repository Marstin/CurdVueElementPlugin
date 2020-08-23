const CurdVueElementPlugin = require ('./dist/CurdVueElementPlugin.js')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 选项...
  outputDir:'example/dist',
  pages: {
    index: {
      entry : 'example/main.ts',
      template : 'example/public/index.html'
    }
  },
  configureWebpack: {
    plugins: [
      new CurdVueElementPlugin({servicePath: 'example/service.ts'})
    ]
  },
  chainWebpack:config => {
    config.resolve.alias
      .set('@', resolve('example'))
  }
}