"use strict";
/**
 * Created by rocky on 16/12/2.
 */
var readline = require("linebyline");
/**
 * 文件行读取
 * @param file
 * @param callback
 */
function readfile(file, callback) {
    var rl = readline(file);
    rl.on("line", function (data, linecount) {
        callback(data, file, linecount);
    });
    rl.on("error", function(e) {
        console.log(file, e);
    });
}
module.exports = readfile;

