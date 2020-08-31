import axios from "axios"
import qs from "qs"

const Services = {
  list(data: any){
    return new Promise((resolve: Function, reject: Function) => {
      axios({
        url:'/list',
        method:'get',
        params:data
      }).then((res: any) => {
        resolve(res.data)
      }).catch((err: any) => {
        reject(err)
      })
    })
  },
  add(data: any) {
    return new Promise((resolve: Function,reject: Function) => {
      axios({
        url:'/add',
        method:'post',
        data:data
      }).then((res: any) => {
        resolve(res.data)
      }).catch((err: any) => {
        reject(err)
      });
    })
  },
  update(data: any) {
    return new Promise((resolve: Function,reject: Function) => {
      axios({
        url:'/update',
        method:'post',
        data:data
      }).then((res: any) => {
        resolve(res.data)
      }).catch((err: any) => {
        reject(err)
      });
    })
  },
  del(ids: any) {
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
}

export default Services