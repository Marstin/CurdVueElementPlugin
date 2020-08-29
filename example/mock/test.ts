export default [
  {
    url:'/add',
    type:'post',
    data: {
      "array|1-10":[
        {
          "id":"@guid",
          "name":"@cname",
          "sex":"@character('男女')",
          "email":"@email",
          "age|1-100":20,
          "address":"@county(true)",
          "telephone":"@telephone"
        }
      ]
    }
  }
]