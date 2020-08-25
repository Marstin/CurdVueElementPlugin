import axios from 'axios'
function getList(){
  return new Promise((resolve: Function, reject: Function) => {
    axios({
      url:' /project/list ',
      method:'get'
    }).then((res: any) => {
      resolve(res.data.data.map((o: any ) =>  { return { value:o.id,text:o.projName} }))
    })
  })
}