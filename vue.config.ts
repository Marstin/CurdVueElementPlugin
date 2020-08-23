import CurdVueElementPlugin from './CurdVueElementPlugin/CurdVueElementPlugin'
console.log(CurdVueElementPlugin);
module.exports = {
  // 选项...
  configureWebpack: {
    plugins: [
      new CurdVueElementPlugin({options: true})
    ]
  }
}