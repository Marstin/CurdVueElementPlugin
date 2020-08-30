import Mock from "mockjs"
import test from "./test"

Mock.Random.extend({
  telephone: function () {
    const phonePrefixs = ['132', '135', '189','133','130','150'] // 自己写前缀哈
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
  }
})

const mock = [
  ...test
]

mock.forEach( m => {
  Mock.mock(m.url,m.type,m.data);
})