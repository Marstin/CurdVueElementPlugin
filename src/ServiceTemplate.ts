import { ServiceOptions, ServiceTemplateInterface } from './Interface'

class ServiceTemplate implements ServiceTemplateInterface {
  templateFuncStack: Array<{func:Function,url:string}>
  constructor(config: ServiceOptions){
    this.templateFuncStack = this.getTemplateStack(config)
  }
  getTemplate(){
    let codeStr:string = "";
    this.templateFuncStack.forEach((f)=> {
      codeStr += f.func.apply(this,[f.url])
    })
    return this.getChunkCodeTemplate(codeStr)
  }
  getFuncName() {
    return this.templateFuncStack.map(f => f.func);
  }
  getTemplateStack(config:ServiceOptions):Array<{func:Function,url:string}> {
    const templateFuncStack:Array<{func:Function,url:string}> = []
    for(let key in config){
      (this as any)[key + 'ServiceTemplate'] && templateFuncStack.push({func:(this as any)[key + 'ServiceTemplate'],url:(config as any)[key].url})
    }
    return templateFuncStack;
  }
  getChunkCodeTemplate(funcCode: string){
    return `import axios from "axios"
import qs from "qs"

const Services = {${funcCode}
}

export default Services`
  }
  listServiceTemplate(url: string = '/list'): string {
    return `
  list(){
    return new Promise((resolve: Function, reject: Function) => {
      axios({
        url:'${url}',
        method:'get'
      }).then((res: any) => {
        resolve(res.data.data.map((o: any ) =>  { return { value:o.id,text:o.projName} }))
      })
    })
  },`
  }
  addServiceTemplate(url: string = '/add'): string {
    return `
  add(data: any) {
    return new Promise((resolve: Function,reject: Function) => {
      axios({
        url:'${url}',
        method:'post',
        data:qs.stringify(data)
      }).then((res: any) => {
        resolve(res.data)
      }).catch((err: any) => {
        reject(err)
      });
    })
  },`
  }
  updateServiceTemplate(url: string = '/update'): string {
    return `
  update(data: any) {
    return new Promise((resolve: Function,reject: Function) => {
      axios({
        url:'${url}',
        method:'post',
        data:qs.stringify(data)
      }).then((res: any) => {
        resolve(res.data)
      }).catch((err: any) => {
        reject(err)
      });
    })
  },`
  }
  deleteServiceTemplate(url: string = '/delete'): string {
    return `
  delete(ids: any) {
    return new Promise((resolve: Function, reject: Function) => {
      axios({
        url:'${url}',
        method:'get',
        params:{ids:ids}
      }).then((res: any) => {
        resolve(res.data)
      }).catch ((err) => {
        reject(err)
      })
    })
  },`
  }
  
}


export default ServiceTemplate