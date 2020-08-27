"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceTemplate {
    constructor(config) {
        this.templateFuncStack = this.getTemplateStack(config);
    }
    getTemplate() {
        let codeStr = "";
        this.templateFuncStack.forEach((f) => {
            codeStr += f.func.apply(this, [f.url]);
        });
        return this.getChunkCodeTemplate(codeStr);
    }
    getFuncName() {
        return this.templateFuncStack.map(f => f.func);
    }
    getTemplateStack(config) {
        const templateFuncStack = [];
        for (let key in config) {
            this[key + 'ServiceTemplate'] && templateFuncStack.push({ func: this[key + 'ServiceTemplate'], url: config[key].url });
        }
        return templateFuncStack;
    }
    getChunkCodeTemplate(funcCode) {
        return `import axios from "axios"
import qs from "qs"

const Services = {${funcCode}
}

export default Services`;
    }
    listServiceTemplate(url) {
        return `
  list(){
    return new Promise((resolve: Function, reject: Function) => {
      axios({
        url:'${url || ''}',
        method:'get'
      }).then((res: any) => {
        resolve(res.data.data.map((o: any ) =>  { return { value:o.id,text:o.projName} }))
      })
    })
  },`;
    }
    addServiceTemplate(url) {
        return `
  add(data: any) {
    return new Promise((resolve: Function,reject: Function) => {
      axios({
        url:'${url || ''}',
        method:'post',
        data:qs.stringify(data)
      }).then((res: any) => {
        resolve(res.data)
      }).catch((err: any) => {
        reject(err)
      });
    })
  },`;
    }
    updateServiceTemplate(url) {
        return `
  update(data: any) {
    return new Promise((resolve: Function,reject: Function) => {
      axios({
        url:'${url || ''}',
        method:'post',
        data:qs.stringify(data)
      }).then((res: any) => {
        resolve(res.data)
      }).catch((err: any) => {
        reject(err)
      });
    })
  },`;
    }
    deleteServiceTemplate(url) {
        return `
  delete(ids: any) {
    return new Promise((resolve: Function, reject: Function) => {
      axios({
        url:'${url || ''}',
        method:'get',
        params:{ids:ids}
      }).then((res: any) => {
        resolve(res.data)
      }).catch ((err) => {
        reject(err)
      })
    })
  },`;
    }
}
exports.default = ServiceTemplate;
