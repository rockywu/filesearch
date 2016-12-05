var _ = require("underscore");
var func = {
    base : "$.camelCase $.contains $.each $.extend $.fn $.grep $.inArray $.isArray $.isFunction $.isNumeric $.isPlainObject $.isWindow $.map $.noop $.parseJSON $.trim $.type",
    dom : "add addClass after append appendTo attr before children clone closest concat contents css data each empty eq filter find first forEach get has hasClass height hide html index indexOf insertAfter insertBefore is last map next not offset offsetParent parent parents pluck position prepend prependTo prev prop push ready reduce remove removeAttr removeClass removeProp replaceWith scrollLeft scrollTop show siblings size slice text toggle toggleClass unwrap val width wrap wrapAll wrapInner",
    event : "$.Event $.proxy bind delegate die live off on one trigger triggerHandler unbind undelegate",
    ajax : "$.ajax $.ajaxJSONP $.ajaxSettings $.get $.getJSON $.param $.post load",
    form : "serialize serializeArray submit"
};

/**
 * 替换占位符
 * @param str
 * @return {string}
 */
function placeholder(str) {
    return (str + "").replace(/(\$|\.|\(|\))/gi, function(val) {
        return "\\" + val + "\\s*";
    });
}

/**
 * 格式化成查询正则
 */
function getRegExp() {
    var keywords = [];
    _.forEach(func, function(v, k) {
        v.replace(/([\$\.\(\)]*)(\w+)/gi, function(val) {
            keywords.push(RegExp.$2);
        });
    });
    return new RegExp("(?!=[\\$\\.]+\\s*)("+keywords.join("|")+")(?=\\s*\\()", "gi");
}
module.exports = getRegExp();
