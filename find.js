var find = require("find");
var params = process.argv.splice(2);
var domain = params[0];
var funcRegExp = require("./funcRegExp");
var readfile = require("./readfile");
var log4js = require("log4js");
var logger = log4js.getLogger("touch-zepto");
var fs = require("fs");
var _ = require("underscore");
var mkdirp = require("mkdirp");
if(!domain) {
    console.log("路径错误");
    return;
}
var files = params[1] || "js";
var filename = params[2] || "output";
var filesRegexp = new RegExp("\\.(" + files.split(" ").join("|") + ")$");
var result = {};
find.eachfile(filesRegexp, domain, function(file) {
    readfile(file, function(err, code, file, linecount) {
        if(err === null) {
            //文件读取成功
            var list = (code + "").match(funcRegExp);
            if(Array.isArray(list)) {
                list.forEach(function(v) {
                    if(!result[v]) {
                        result[v] = [];
                    }
                    var data = {};
                    data.filename = file;
                    data.linecount = linecount;
                    data.contentcode = code;
                    data.func = v;
                    result[v].push(data);
                    data = null;
                })
            }
        } else {
            //文件读取失败
            logger.error(err);
        }
    });
}).end(function() {
    var counts = {};
    _.forEach(result, function(v, k) {
        counts[k] = {
            count : v.length,
            func  : k
        }
    });
    mkdirp.async("./output");
    var filePath = "./output/" + filename;
    fs.writeFile( filePath + "-count.json", formatToJsonStr(counts), "utf8", function() {
        logger.info("数据量文件生成成功");
    });
    fs.writeFile( filePath + "-detail.json", formatToJsonStr(result), "utf8", function() {
        logger.info("详细文件生成成功");
    });
    result = null;
});

function formatToJsonStr(data) {
    return JSON.stringify(data, null, '\t');
}
