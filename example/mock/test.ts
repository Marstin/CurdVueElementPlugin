export default [
  {
    url:RegExp('/list.*'),
    type:'get',
    data: {
      "list|10":[
        {
          "id":"@guid",
          "name":"@cname",
          "sex":"@character('男女')",
          "email":"@email",
          "age|1-100":20,
          "address":"@county(true)",
          "telephone":"@telephone"
        }
      ],
      "total|10-100":20
    }
  }
]