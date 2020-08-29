import { Options } from './Interface'

const DefaultOptions: Options = {
  name:'test',
  baseDir: './src',
  serviceDir: '/service',
  componentDir: '/component',
  service:['list'],
  model: {
    primarykey:'id',
    item:[{
      text:'名称',
      name:'name'
    }]
  },
  searchModel: {

  },
  tree: {
    url: '',
    isSearchCondition: true,
    searchItem: 'id'
  }
}
export default DefaultOptions;