import { ServiceOptionsInterface, TemplateInterface } from '../Interface'

class ServiceTemplate implements TemplateInterface {
  templateFuncStack: Array<{ opt: string, url?: string, funcName?: string }>
  constructor(config: Array<string | ServiceOptionsInterface>) {
    this.templateFuncStack = this.getTemplateStack(config)
    this.hasOpt('list')||this.templateFuncStack.push({opt:'list'})
  }

  async getTemplate() {
    let codeStr: string = "";
    for (let f of this.templateFuncStack) {
      await import('./' + f.opt)
        .then(module => {
          codeStr += module.getTemplate(f.url)
          f.funcName = module.funcName;
        })
        .catch(err => {
          console.warn(`${f.opt} 未定义`)
        });
    }
    return this.getChunkCodeTemplate(codeStr);
  }

  hasOpt(opt: string): boolean {
    return (this.templateFuncStack as any).some((s: any) => s.opt === s.opt)
  }

  getAllFunc() {
    return this.templateFuncStack.map((s: any) => s.funcName)
  }

  getFunc(opt: string) {
    let func = this.templateFuncStack.find((s: any) => s.opt === opt);
    return func&&func.funcName
  }

  getTemplateStack(config: Array<string | ServiceOptionsInterface>): Array<{ opt: string, url?: string, funcName?: string }> {
    const templateFuncStack: Array<{ opt: string, url?: string }> = []
    config.forEach(c => {
      if (c && typeof c === 'string') {
        templateFuncStack.push({ opt: c })
      } else {
        let obj: ServiceOptionsInterface = <ServiceOptionsInterface>c;

        templateFuncStack.push({ opt: obj.func, url: obj.url })
      }
    })
    return templateFuncStack;
  }

  getChunkCodeTemplate(funcCode: string) {
    return `import axios from "axios"

const Services = {${funcCode}
}

export default Services`

  }
}

export default ServiceTemplate