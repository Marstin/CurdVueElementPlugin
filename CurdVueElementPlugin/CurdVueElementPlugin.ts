import { Compiler } from 'webpack';
import { CurdVueElementPluginInterface } from './CurdVueElementPluginInterface'
import ServiceTemplate from './template/template'
import fs from 'fs'

export interface Options {

}



class CurdVueElementPlugin implements CurdVueElementPluginInterface {
  constructor(options :Options = {}){
    console.log("hello============")
  } 
  apply(compiler: Compiler){
    compiler.plugin('done', () => {
      this.createFile("./")
    });
  }
  createFile(path: string){
    let serviceTemplate = new ServiceTemplate({listUrl:"/project/list"})
    console.log("start writing")
    fs.writeFile("./src/service.ts", serviceTemplate.getListService(), 'utf8', function (error) {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        return false
      }
      // console.log(src, 'html重新写入成功')
     /*  if (src.indexOf('/index.html') === -1) {
        fs.unlink(src, function () {
          //  console.log(src, 'html删除成功')
        })
      } */
    })
  }
}
module.exports = CurdVueElementPlugin;



interface CUR {

}

export default CurdVueElementPlugin