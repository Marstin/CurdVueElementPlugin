import axios from "axios"
import qs from "qs"

const Services = {
  add(data: any) {
    return new Promise((resolve: Function,reject: Function) => {
      axios({
        url:'/add',
        method:'post',
        data:qs.stringify(data)
      }).then((res: any) => {
        resolve(res.data)
      }).catch((err: any) => {
        reject(err)
      });
    })
  },
  list(){
    return new Promise((resolve: Function, reject: Function) => {
      axios({
        url:'/list',
        method:'get'
      }).then((res: any) => {
        resolve(res.data.data.map((o: any ) =>  { return { value:o.id,text:o.projName} }))
      })
    })
  },
  delete(ids: any) {
    return new Promise((resolve: Function, reject: Function) => {
      axios({
        url:'/delete',
        method:'get',
        params:{ids:ids}
      }).then((res: any) => {
        resolve(res.data)
      }).catch ((err) => {
        reject(err)
      })
    })
  },
  update(data: any) {
    return new Promise((resolve: Function,reject: Function) => {
      axios({
        url:'/update',
        method:'post',
        data:qs.stringify(data)
      }).then((res: any) => {
        resolve(res.data)
      }).catch((err: any) => {
        reject(err)
      });
    })
  },
}

export default Services