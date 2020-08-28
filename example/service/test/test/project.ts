import axios from "axios"
import qs from "qs"

const Services = {
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
}

export default Services