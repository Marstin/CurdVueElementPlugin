const CurdVueElementPlugin = require('curd-vue-element-plugin')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 选项...
  outputDir: 'src/dist',
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'src/public/index.html'
    }
  },
  configureWebpack: {
    plugins: [
      new CurdVueElementPlugin({
        baseDir: './src',
        options: [{
          name: 'project',
          service: ['list', 'add', 'update', 'del'],
          component: {
            primaryKey: 'id',
            model: [{
              name: 'name',
              text: '姓名',
              isSearch: true
            }, {
              name: 'sex',
              text: '性别'
            }, {
              name: 'telephone',
              text: '手机号码',
              isSearch: true
            }, {
              name: 'email',
              text: '邮箱'
            }, {
              name: 'address',
              text: '地址',
              isEdit: false
            }]
          }
        }]
      })
    ]
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  }
}