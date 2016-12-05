var find = require("find");
var readline = require("linebyline");
var iconv = require("iconv-lite");
var params = process.argv.splice(2);
var domain = params[0];
var funcRegExp = require("./funcRegExp");
var readfile = require("./readfile");
var async = require("async");
if(!domain) {
    console.log("路径错误");
    return;
}
var files = params[1] || "js";
var filesRegexp = new RegExp("\\.(" + files.split(" ").join("|") + ")$");
var funcList = {};
find.eachfile(filesRegexp, domain, function(file) {
    readfile(file, function(data, file, linecount) {
        var list = (data + "").match(funcRegExp);
        if(Array.isArray(list)) {
            list.forEach(function(v) {
                funcList[v] = true;
            })
        }
        list = null;
    });
});
