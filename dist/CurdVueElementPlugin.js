"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const template_1 = tslib_1.__importDefault(require("./template/template"));
const fs_1 = tslib_1.__importDefault(require("fs"));
class CurdVueElementPlugin {
    constructor(options = {}) {
        this.config = options;
    }
    apply(compiler) {
        compiler.plugin('done', () => {
            this.createFile(this.config.servicePath);
        });
    }
    createFile(path) {
        let serviceTemplate = new template_1.default({ listUrl: "/project/list" });
        console.log("start writing");
        fs_1.default.writeFile(path, serviceTemplate.getListServiceTemplate(), 'utf8', function (error) {
            if (error) {
                console.log(error);
                return false;
            }
        });
    }
}
module.exports = CurdVueElementPlugin;
