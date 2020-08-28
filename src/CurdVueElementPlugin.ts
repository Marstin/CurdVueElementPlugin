import { Compiler } from 'webpack';
import ServiceTemplate from './ServiceTemplate'
import fs from 'fs'
import Util from './util/util'

import { Options, CurdVueElementPluginInterface } from './Interface'

class CurdVueElementPlugin implements CurdVueElementPluginInterface {
  options: Options
  constructor(options: Options){
    this.options = Util.assign(this.defaultOption(),options)
  } 
  defaultOption(): Options{
    return {
      name:'test',
      baseDir: './src',
      serviceDir: '/service',
      componentDir: '/component',
      service:{
        list: {
        },
      },
      model: {
        primarykey:'id',
        item:[{
          text:'名称',
          name:'name'
        }]
      },
      searchModel: {

      },
      tree: {
        url: '',
        isSearchCondition: true,
        searchItem: 'id'
      }
    }
  }
  apply(compiler: Compiler){
    compiler.plugin('compilation', () => {
      this.excute(this.options.baseDir + this.options.serviceDir,this.options.name + '.ts')
    });
  }
  excute(dir: string,file: string){
    const path = dir + '/' + file;
    let serviceTemplate = new ServiceTemplate(this.options.service)
    Util.writeTemplate(dir,file,serviceTemplate.getTemplate())
  }
  
  
}
module.exports = CurdVueElementPlugin;