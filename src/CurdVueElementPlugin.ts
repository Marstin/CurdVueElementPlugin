import { Compiler } from 'webpack';
import ServiceTemplate from './template/template'
import fs from 'fs'

export interface Options {
  servicePath?: string
}

export interface DefaultOption {
  servicePath: string
}

export interface CurdVueElementPluginInterface {
  config?: any
  apply(compiler: Compiler): any
  createFile(path: string): any
}



class CurdVueElementPlugin implements CurdVueElementPluginInterface {
  config:any
  constructor(options :Options = {}){
    this.config = options
  } 
  apply(compiler: Compiler){
    compiler.plugin('done', () => {
      this.createFile(this.config.servicePath)
    });
  }
  createFile(path: string){
    let serviceTemplate = new ServiceTemplate({listUrl:"/project/list"})
    console.log("start writing")
    fs.writeFile(path, serviceTemplate.getListService(), 'utf8', function (error) {
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