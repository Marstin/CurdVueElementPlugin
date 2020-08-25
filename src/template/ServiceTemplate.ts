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
  getListServiceTemplate(url?: string): string {
    return `import axios from 'axios'
function getList(){
  return new Promise((resolve: Function, reject: Function) => {
    axios({
      url:' ${ url||'/project/list'} ',
      method:'get'
    }).then((res: any) => {
      resolve(res.data.data.map((o: any ) =>  { return { value:o.id,text:o.projName} }))
    })
  })
}`
  }
  getAddService(url?: string): string {
    return `updateProject(data: any) {
  return new Promise((resolve: Function,reject: Function) => {
    axios({
      url:'/app/projectManage/updateSelective',
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
}


export default ServiceTemplate