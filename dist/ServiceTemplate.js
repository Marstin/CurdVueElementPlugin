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
        config.forEach(c => {
            if (c && typeof c === 'string') {
                this[c + 'ServiceTemplate'] && templateFuncStack.push({ func: this[c + 'ServiceTemplate'] });
            }
            else {
                let obj = c;
                this[obj.func + 'ServiceTemplate'] && templateFuncStack.push({ ...obj, func: this[obj.func + 'ServiceTemplate'] });
            }
        });
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
    listServiceTemplate(url = '/list') {
        return `
  list(data: any){
    return new Promise((resolve: Function, reject: Function) => {
      axios({
        url:'${url}',
        method:'get',
        params:data
      }).then((res: any) => {
        resolve(res.data)
      }).catch((err: any) => {
        reject(err)
      })
    })
  },`;
    }
    addServiceTemplate(url = '/add') {
        return `
  add(data: any) {
    return new Promise((resolve: Function,reject: Function) => {
      axios({
        url:'${url}',
        method:'post',
        data:data
      }).then((res: any) => {
        resolve(res.data)
      }).catch((err: any) => {
        reject(err)
      });
    })
  },`;
    }
    updateServiceTemplate(url = '/update') {
        return `
  update(data: any) {
    return new Promise((resolve: Function,reject: Function) => {
      axios({
        url:'${url}',
        method:'post',
        data:data
      }).then((res: any) => {
        resolve(res.data)
      }).catch((err: any) => {
        reject(err)
      });
    })
  },`;
    }
    delServiceTemplate(url = '/delete') {
        return `
  del(ids: any) {
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
  },`;
    }
}
exports.default = ServiceTemplate;
