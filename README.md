# CurdVueElementPlugin

## 初始化项目
```
npm install
```

### 配置插件
`vue.config.js` 或 `webapck.config.js` 中使用
```
const CurdVueElementPlugin = require('curd-vue-element-plugin')

module.exports = {
  // 选项...
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
  }
}
```

### 测试插件
```
npm run test
```
`./src/services/project.ts`和`./src/views/project.vue`均已生成

访问 (http://localhost:8080/test)[http://localhost:8080/test] 可看到自动生成的页面

### 相关文档
[Webpack Plugin API](https://www.webpackjs.com/api/plugins/).