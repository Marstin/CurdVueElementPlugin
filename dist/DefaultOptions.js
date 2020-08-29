"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultOptions = {
    name: 'test',
    baseDir: './src',
    serviceDir: '/service',
    componentDir: '/component',
    service: ['list'],
    model: {
        primarykey: 'id',
        item: [{
                text: '名称',
                name: 'name'
            }]
    },
    searchModel: {},
    tree: {
        url: '',
        isSearchCondition: true,
        searchItem: 'id'
    }
};
exports.default = DefaultOptions;
