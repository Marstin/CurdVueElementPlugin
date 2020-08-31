import { OptionInterface } from './Interface'
import Util from './util'
import ServiceTemplate from './ServiceTemplate'
import { DefaultOption } from './DefaultOptions'

class TemplateExecute {
  option: OptionInterface
  basedir: string
  name: string
  constructor(param: OptionInterface, basedir: string) {
    this.option = this.getOption(param)
    this.basedir = basedir
    this.name = Util.getName(this.option.name)
  }
  getOption(param: OptionInterface) {
    return Util.assign(DefaultOption, param)
  }
  writeService() {
    let serviceTemplate = new ServiceTemplate(this.option.service)
    Util.writeTemplate(this.basedir + '/' + this.option.serviceDir, this.name + '.ts', serviceTemplate.getTemplate())
  }
  writeView(dir: string) {

  }
  execute() {
    this.writeService();
  }
}

export default TemplateExecute;