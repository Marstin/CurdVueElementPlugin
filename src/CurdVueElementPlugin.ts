import { Compiler } from 'webpack';
import ServiceTemplate from './ServiceTemplate'
import Util from './util/util'
import { Options, CurdVueElementPluginInterface } from './Interface'
import DefaultOptions from './DefaultOptions'

class CurdVueElementPlugin implements CurdVueElementPluginInterface {
  options: Options
  constructor(options: Options){
    this.options = Util.assign(this.defaultOption(),options)
  } 
  defaultOption = ():Options => ({ ...DefaultOptions })
  apply(compiler: Compiler){
    compiler.plugin('compilation', () => {
      this.excute(this.options.baseDir + this.options.serviceDir, this.options.name + '.ts')
    });
  }
  excute(dir: string,file: string){
    const path = dir + '/' + file;
    let serviceTemplate = new ServiceTemplate(this.options.service)
    Util.writeTemplate(dir,file,serviceTemplate.getTemplate())
  }
  
}
module.exports = CurdVueElementPlugin;