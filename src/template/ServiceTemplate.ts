interface ServiceTemplateInterface {
  config:ServiceOptions
}

interface ServiceOptions {
  listUrl?:string;
}

class ServiceTemplate implements ServiceTemplateInterface {
  config: ServiceOptions
  constructor(config: ServiceOptions){
    this.config = config;
  }
  getTemplate(){
    
  }
  getChunkCode(){
    return `import axios from 'axios;`
  }
  getListServiceTemplate(url?: string): string {
    return `
function list(){
  return new Promise((resolve: Function, reject: Function) => {
    axios({
      url:'${ url||''}',
      method:'get'
    }).then((res: any) => {
      resolve(res.data.data.map((o: any ) =>  { return { value:o.id,text:o.projName} }))
    })
  })
}`
  }
  getAddServiceTemplate(url?: string): string {
    return `
update(data: any) {
  return new Promise((resolve: Function,reject: Function) => {
    axios({
      url:'${ url||''}',
      method:'post',
      data:qs.stringify(data)
    }).then((res: any) => {
      resolve(res.data)
    }).catch((err: any) => {
      reject(err)
    });
  })
}`
  }
  getUpdateServiceTemplate(url?: string): string {
    return `
update(data: any) {
  return new Promise((resolve: Function,reject: Function) => {
    axios({
      url:'${ url||''}',
      method:'post',
      data:qs.stringify(data)
    }).then((res: any) => {
      resolve(res.data)
    }).catch((err: any) => {
      reject(err)
    });
  })
}`
  }
  getDeleteServiceTemplate(url?: string): string {
    return `
delete(ids: any) {
  return new Promise((resolve: Function, reject: Function) => {
    axios({
      url:'${ url||''}',
      method:'get',
      params:{ids:ids}
    }).then((res: any) => {
      resolve(res.data)
    }).catch ((err) => {
      reject(err)
    })
  })
}`
  }
  
}


export default ServiceTemplate