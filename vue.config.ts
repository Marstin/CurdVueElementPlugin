import CurdVueElementPlugin from './CurdVueElementPlugin/CurdVueElementPlugin'
console.log(CurdVueElementPlugin);
export default {
  // 选项...
  configureWebpack: {
    plugins: [
      new CurdVueElementPlugin({options: true})
    ]
  }
}