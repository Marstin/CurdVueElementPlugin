"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const qs_1 = tslib_1.__importDefault(require("qs"));
const Services = {
    add(data) {
        return new Promise((resolve, reject) => {
            axios_1.default({
                url: '/add',
                method: 'post',
                data: qs_1.default.stringify(data)
            }).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    list() {
        return new Promise((resolve, reject) => {
            axios_1.default({
                url: '/list',
                method: 'get'
            }).then((res) => {
                resolve(res.data.data.map((o) => { return { value: o.id, text: o.projName }; }));
            });
        });
    },
    delete(ids) {
        return new Promise((resolve, reject) => {
            axios_1.default({
                url: '/delete',
                method: 'get',
                params: { ids: ids }
            }).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    update(data) {
        return new Promise((resolve, reject) => {
            axios_1.default({
                url: '/update',
                method: 'post',
                data: qs_1.default.stringify(data)
            }).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            });
        });
    },
};
exports.default = Services;
