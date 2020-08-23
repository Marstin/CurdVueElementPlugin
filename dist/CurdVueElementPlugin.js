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
        fs_1.default.writeFile(path, serviceTemplate.getListService(), 'utf8', function (error) {
            if (error) {
                // eslint-disable-next-line no-console
                console.log(error);
                return false;
            }
            // console.log(src, 'html重新写入成功')
            /*  if (src.indexOf('/index.html') === -1) {
               fs.unlink(src, function () {
                 //  console.log(src, 'html删除成功')
               })
             } */
        });
    }
}
module.exports = CurdVueElementPlugin;
//# sourceMappingURL=CurdVueElementPlugin.js.map