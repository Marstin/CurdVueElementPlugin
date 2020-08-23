# CurdVueElementPlugin

## 初始化项目
```
npm install
```

### 打包插件
```
tsc -b tsconfig.buildplugin.json
```

### 测试插件
```
npm run test
```

### 插件入口
```
dist/CurdVueElementPlugin.js
```

### 例子
`vue.config.js` 或 `webapck.config.js` 中使用
```
const CurdVueElementPlugin = require ('./dist/CurdVueElementPlugin.js')

module.exports = {
  // 选项...
  configureWebpack: {
    plugins: [
      new CurdVueElementPlugin({servicePath: 'example/service.ts'})
    ]
  }
}
```

### 相关文档
[Webpack Plugin API](https://www.webpackjs.com/api/plugins/).