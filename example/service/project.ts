import axios from "axios"
import qs from "qs"

const Services = {
  list(){
    return new Promise((resolve: Function, reject: Function) => {
      axios({
        url:'/list',
        method:'get'
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
        data:qs.stringify(data)
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
        data:qs.stringify(data)
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