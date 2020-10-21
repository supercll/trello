// loader其实就是个函数，但是不能使用箭头函数
/* 
source: 引入的源代码
*/
module.exports = function (source) {
    return source.replace("LC", "supercll");
};
/* 
this.callback(
    err: Error | null,
    content: string | Buffer,
    sourceMap?: SourceMap,
    meta?: any
); 
*/
