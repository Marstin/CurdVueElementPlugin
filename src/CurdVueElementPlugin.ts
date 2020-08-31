import { Compiler } from 'webpack';
import TemplateExecute from './TemplateExecute'
import Util from './util'
import { PluginParamInterface, CurdVueElementPluginInterface } from './Interface'
import { DefaultPluginParam } from './DefaultOptions'

class CurdVueElementPlugin implements CurdVueElementPluginInterface {
  PluginParam: PluginParamInterface
  constructor(PluginParam: PluginParamInterface) {
    this.PluginParam = this.getOption(PluginParam)
  }
  apply(compiler: Compiler) {
    compiler.plugin('environment', () => {
      this.execute()
    });
  }
  getOption(param: PluginParamInterface) {
    return Util.assign(DefaultPluginParam, param)
  }
  execute() {
    for (let opt of this.PluginParam.options) {
      let curdObj = new TemplateExecute(opt, this.PluginParam.baseDir)
      curdObj.execute()
    }
  }
}
module.exports = CurdVueElementPlugin;