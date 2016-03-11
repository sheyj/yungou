(function (window, $, undefined) {

    //  定义 字符串对象(String) 扩展对象基元
    var coreString = function () { return String.apply(this, arguments); };
    //  定义 日期对象(Date) 扩展对象基元
    var coreDate = function () { return Date.apply(this, arguments); };
    //  定义 数值对象(Number) 扩展对象基元
    var coreNumber = function () { return Number.apply(this, arguments); };
    //  定义 数组对象(Array) 扩展对象基元
    var coreArray = function () { return Array.apply(this, arguments); };
    //  定义 布尔值对象(Boolean) 扩展对象基元
    var coreBoolean = function () { return Boolean.apply(this, arguments); };
    //  定义 通用工具方法 扩展对象基元
    var coreUtil = function () { return Object.apply(this, arguments); };
    //  定义 空值 集合基元
    var coreNullable = {};
    //  定义 jQuery 扩展对象基元
    var coreJquery = function () { return $.apply(this, arguments); };
    //  定义 HTML5 工具组件对象基元
    var coreHtml5 = {};

    coreString.fn = coreString.prototype = {};
    coreDate.fn = coreDate.prototype = {};
    coreNumber.fn = coreNumber.prototype = {};
    coreArray.fn = coreArray.prototype = {};
    coreBoolean.fn = coreBoolean.prototype = {};
    coreUtil.fn = coreUtil.prototype = {};
    coreJquery.fn = coreJquery.prototype = {};

    coreNullable.String = new String();
    coreNullable.Function = new Function();
    coreNullable.Date = new Date();
    coreNullable.Bool = new Boolean();
    coreNullable.Object = new Object();
    coreNullable.Number = new Number();

    coreJquery.string = coreString;
    coreJquery.date = coreDate;
    coreJquery.number = coreNumber;
    coreJquery.array = coreArray;
    //coreJquery.boolean = coreBoolean;
    coreJquery.util = coreUtil;
    coreJquery.nullable = coreNullable;
    coreJquery.html5 = coreHtml5;



    var document = coreUtil.document = window.document,
        location = coreUtil.location = window.location,
        docElem = coreUtil.docElem = document.documentElement,
        history = coreUtil.history = window.history,
        parent = coreUtil.parent = window.parent,
        top = coreUtil.top = window.top;
    var $$ = coreJquery.emptyJquery = coreJquery.empty$ = coreJquery.$$ = coreUtil.emptyJquery = coreUtil.empty$ = coreUtil.$$ = $();
    var version = "2013-10-06",
        core_array = [],
        core_trim = version.trim,
        core_push = core_array.push,
        core_slice = core_array.slice,
        core_splice = core_array.splice,
        core_sort = core_array.sort,
        core_isArray = Array.isArray;

    /////////////////////////////////////////////////////////////////////////////////////////////// 
    //  javascript 工具，提供常用的 js 工具方法。
    //  包括解析和判断对象的类型、url 解析等功能。
    ///////////////////////////////////////////////////////////////////////////////////////////////


    //  获取指定对象的类型。
    coreUtil.type = $.type;

    //  测试对象是否是窗口（有可能是Frame）。
    coreUtil.isWindow = $.isWindow;

    //  测试对象是否是布尔（Boolean）类型值。
    coreUtil.isBoolean = function (obj) { return coreUtil.type(obj) == "boolean"; };

    //  测试对象是否是字符串（String）类型值。
    coreUtil.isString = function (obj) { return coreUtil.type(obj) == "string"; };

    //  测试对象是否是日期（Date）类型值。
    coreUtil.isDate = function (obj) { return coreUtil.type(obj) == "date"; };

    //  测试对象是否是正则表达式（RegExp）。
    coreUtil.isRegExp = function (obj) { return coreUtil.type(obj) == "regexp"; };

    //  测试传入的参数是否是一个 javscript 对象；
    coreUtil.isObject = function (obj) { return coreUtil.type(obj) == "object"; };

    //  测试对象是否是数组（Array）。
    coreUtil.isArray = $.isArray;

    //  测试对象是否是函数。
    //  注意：在IE浏览器里，浏览器提供的函数比如'alert'还有 DOM 元素的方法比如 'getAttribute' 将不认为是函数。

    coreUtil.isFunction = $.isFunction;

    //  测试对象是否是数字。
    //  方法检查它的参数是否代表一个数值。如果是这样，它返回 true。否则，它返回false。该参数可以是任何类型的。
    coreUtil.isNumeric = $.isNumeric;

    //  测试对象是否是空对象（不包含任何属性）。
    //  这个方法既检测对象本身的属性，也检测从原型继承的属性（因此没有使用hasOwnProperty）。
    coreUtil.isEmptyObject = $.isEmptyObject;

    //  测试对象是否为空（不包含任何属性的空对象、null、undefined、空字符串、全空格）。
    //  这个方法既检测对象本身的属性，也检测从原型继承的属性（因此没有使用hasOwnProperty）。
    coreUtil.isEmptyObjectOrNull = function (obj) {
        switch (coreUtil.type(obj)) {
            case "string":
                return coreString.isNullOrWhiteSpace(obj);
            case "array":
                return obj.length == 0;
            case "date":
                return Date.parse(obj) == 0;
            case "object":
                return coreUtil.isEmptyObject(obj);
        }
        return obj == null || obj == undefined;
    };

    //  测试对象是否是纯粹的对象（通过 "{}" 或者 "new Object" 创建的）。
    coreUtil.isPlainObject = $.isPlainObject;

    //  测试对象是否是 jQuery 对象。
		coreUtil.isJqueryObject = function (obj) { return obj != null && obj != undefined && ((obj.jquery ? true : false) || obj.constructor === $$.constructor); };

    //  判断对象是否是一个空的 jQuery 对象(不包含任何 DOM 元素，即 length = 0)。
    coreUtil.isEmptyJquery = coreUtil.isEmptyJqueryObject = function (obj) { return coreUtil.isJqueryObject(obj) && !obj.length; };
		

    //  定义一个空函数
    coreUtil.noop = coreUtil.isFunction($.noop) ? $.noop : function () { };

    //  判断传入的字符串是否为Null或者为空字符串或者全是空格。
    coreUtil.trim = $.trim;

    //  将一个 DOM 对象或者表达式解析为 jQuery 对象；
    //  如果该对象本身就已经是一个 jQuery 对象，则直接将其返回。
    coreUtil.parseJqueryObject = coreUtil.parseJquery = function (obj) { return coreUtil.isJqueryObject(obj) ? obj : $(obj); };

    //  检测一个对象是否为一个数组对象或者类似于数组对（具有数组的访问方式：具有 length 属性、且具有属性名为数字的索引访问器）
    //  注意：此方法传入 字符串 时执行，也会返回 true，因为 字符串 是一个字符数组。
    coreUtil.likeArray = function (obj) {
        if (obj == null || obj == undefined) { return false; }
        var length = obj.length, type = coreUtil.type(obj);
        if (coreUtil.isWindow(obj)) { return false; }
        if (obj.nodeType === 1 && length) { return true; }
        return type === "array" || type !== "function" && coreUtil.isNumeric(length) && length >= 0;
    };

    //  获取当前页面 url 参数。
    //  返回值：该方法返回一个数组，数组中的每个元素都是一个 JSON 对象，该 JSON 对象包含如下属性：
    //      name:   表示 url 参数的名称；
    //      value:  表示 url 参数的值；
    //  也可以通过数组访问器快速访问某个特定名称的参数值，方法如：coreUtil.getRequest()["id"]。
    coreUtil.getRequest = function () {
        var search = window.location.search;
        if (search.substr(0, 1) == "?") { search = search.substr(1, search.length - 1); }
        var result = [];
        if (search.length > 0) {
            var params = search.split("&");
            for (var i = 0; i < params.length; i++) {
                var param = params[i];
                var pos = param.indexOf("=");
                var name = param.substring(0, pos);
                var value = param.substr(pos + 1);
                result.push({ name: name, value: value });
                result[name] = value;
            }
        }
        return result;
    };
    coreUtil.request = coreUtil.getRequest();

    //  生成一个 Guid(全球唯一标识符) 值；该函数定义如下参数：
    //      format: String 类型值，一个单格式说明符，它指示如何格式化此 Guid 的值。‎format 参数可以是：
    //          "N":    返回值的格式 32 位(xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)
    //          "D":    返回值的格式 由连字符分隔的 32 位数字(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
    //          "B":    返回值的格式 括在大括号中、由连字符分隔的 32 位数字({xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx})
    //          "P":    返回值的格式 括在圆括号中、由连字符分隔的 32 位数字((xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx))
    //          如果 format 为 null 或空字符串 ("")，则使用 "D"。
    //      length: Number 类型值，表示返回字符串的长度；如果不定义该参数，则全部返回。
    coreUtil.guid = function (format, length) {
        format = coreUtil.isString(format) ? format.toLowerCase() : "d";
        var ret = "";
        for (var i = 1; i <= 32; i++) {
            ret += Math.floor(Math.random() * 16.0).toString(16);
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) { ret += "-"; }
        }
        switch (format) {
            case "n": ret = coreString.replaceAll(ret, "-", ""); break;
            case "b": ret = "{" + ret + "}"; break;
            case "p": ret = "(" + ret + ")"; break;
            case "d": default: break;
        }
        return coreUtil.isNumeric(length) && length > 0 && length <= ret.length ? coreString.left(ret, length) : ret;
    };

    //  获取当前应用程序的完整主机地址部分，返回的结果格式如( http://127.0.0.1 )
    coreUtil.getHostPath = function () {
        var href = window.location.href;
        var pathname = window.location.pathname;
        return href.substr(0, href.lastIndexOf(pathname));
    };
    coreUtil.hostPath = coreUtil.getHostPath();

    //  返回当前页面不带参数的完整路径。
    coreUtil.currentUri = coreUtil.hostPath + window.location.pathname;

    //  返回当前页面所在目录的完整路径。
    coreUtil.currentPath = coreUtil.currentUri.substr(0, coreUtil.currentUri.lastIndexOf("/"));

    //  表示当前应用程序所嵌套的虚拟目录的层数。默认为 0，表示未嵌套虚拟目录。
    coreUtil.rootDegree = 0;

    //  返回当前应用程序（含站点名或者虚拟目录路径）的完整根路径。
    //  该方法依赖于全局参数 coreUtil.rootDegree 的值。
    //  coreUtil.rootDegree 该全局参数表示 虚拟目录 的层数。
    //  coreUtil.rootDegree 参数设置正确，该方法方能返回正确的结果。
    //  coreUtil.rootDegree 默认值为 0，即应用程序没有设置虚拟目录。
    coreUtil.getRootPath = function () {
        var result = coreUtil.hostPath;
        var pathname = window.location.pathname;
        if (pathname.indexOf("/") > -1) {
            var paths = pathname.split("/");
            var temps = new Array();
            for (var i = 0; i < paths.length; i++) { if (paths[i].length > 0) { temps.push(paths[i]); } }
            for (var i = 0; i < coreUtil.rootDegree && i < temps.length; i++) { result += "/" + temps[i]; }
        }
        return result;
    }
    coreUtil.rootPath = coreUtil.getRootPath();

    //  根据传入的 uri 地址返回该 uri 相对于应用程序的完整客户端访问url地址。
    //  传入的 uri 地址应为相对于应用程序根路径的完整地址。
    //  该方法依赖于当前文件的 coreUtil.rootPath 属性。
    coreUtil.resolveClientUrl = coreUtil.resolveUrl = function (url) {
        url = String(url);
        if (coreString.isNullOrEmpty(url)) { return url; }
        if (coreString.isUrl(url)) { return url; }
        url = coreString.replaceAll(url, "\\", "/");
        while (url.substring(0, 2) == "./" || url.substring(0, 1) == "/") { url = url.substring(1, url.length); }
        var tmps1 = coreUtil.rootPath.split("/");
        var tmps2 = url.split("/");
        while (tmps1.length > 3 && tmps2.length > 1 && tmps2[0] == "..") { tmps1.pop(); tmps2.shift(); }
        while (tmps2.length > 1 && tmps2[0] == "..") { tmps2.shift(); }
        return tmps1.join("/") + "/" + tmps2.join("/");
    };

    //  在不弹出关闭提示确认的情况下直接关闭当前浏览器窗口。
    coreUtil.closeWindowNoConfirm = function () {
        coreUtil.top.opener = null;
        coreUtil.top.open('', '_self', '');
        coreUtil.top.close();
    };

    //  关闭当前浏览器窗口，同 window.close。
    coreUtil.closeWindow = window.close;

    //  屏蔽当前页面的 HTML 源代码。
    //  有 bug，不建议使用。
    coreUtil.shieldSourceCode = function () {
        var source = document.body.innerHTML;  //获取文档的原有内容
        document.open();                 //打开文档
        document.close();                //关闭文档
        document.body.innerHTML = source;  //重新写入旧内容
    };

    //  屏蔽当前页面的鼠标右键默认事件，而调用指定的回调函数。
    //  如果回调函数为空，则点击鼠标右键没有任何反应。
    coreUtil.shieldContxtMenuEvent = function (callback) {
        document.oncontextmenu = function (e) {
            e.preventDefault();
            if (callback && coreUtil.type(callback) == "function") { callback.apply(this, arguments); }
        };
    };


    function _loadJs(url, callback) {
        url = coreUtil.resolveUrl(url);
        var heads = document.getElementsByTagName("head");
        var scripts = heads[0].getElementsByTagName("script");
        var isFunc = coreUtil.isFunction(callback);
        for (var i = 0; i < scripts.length; i++) {
            var s = scripts[i];
            if (s.src == url) { if (isFunc) { callback.call(s); } return; }
        }
        var done = false;
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.language = "javascript";
        script.src = url;
        script.onload = script.onreadystatechange = function () {
            if (!done && (!script.readyState || script.readyState == "loaded" || script.readyState == "complete")) {
                done = true;
                script.onload = script.onreadystatechange = null;
                if (isFunc) { callback.call(script); }
            }
        };
        heads[0].appendChild(script);
    }
    function _loadCss(url, callback) {
        url = coreUtil.resolveUrl(url);
        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.type = "text/css";
        link.media = "screen";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
        var isFunc = coreUtil.isFunction(callback);
        if (isFunc) { callback.call(link); }
    }

    //  动态引入一个或多个 javascript 脚本文件至当前页面文档，并在引入成功后调用指定的回调函数。
    //  参数 url 表示需要载入的 javascript 脚本路径；如果需要一次性载入多个脚本，则 url 可以是一个数组，数组中每个元素表示 javascript 脚本路径。
    coreUtil.loadJs = function (url, callback) {
        if (coreUtil.likeArray(url) && !coreUtil.isString(url)) {
            for (var i = 0; i < url.length; i++) {
                var fn = (i == url.length - 1) ? callback : null;
                _loadJs(url[i], fn);
            }
        } else { _loadJs(url, callback); }
    };

    //  一次性执行某个 javascript 脚本文件，并在执行成功后调用指定的回调函数。
    coreUtil.runJs = function (url, callback) {
        var isFunc = coreUtil.isFunction(callback);
        _loadJs(url, function () {
            document.getElementsByTagName("head")[0].removeChild(this);
            if (isFunc) { callback(); }
        });
    };

    //  动态引入一个或多个 css 样式表文件至当前页面文档，并在引入成功后调用指定的回调函数。
    coreUtil.loadCss = function (url, callback) {
        if (coreUtil.likeArray(url) && !coreUtil.isString(url)) {
            for (var i = 0; i < url.length; i++) {
                var fn = (i == url.length - 1) ? callback : null;
                _loadCss(url, fn);
            }
        } else {
            _loadCss(url, callback);
        }
    };

    //  对某个对象及其所有可见属性进行多次嵌套递归循环调用某个方法；该函数定义如下参数：
    //      obj:    目标对象
    //      call:   要被针对目标对象循环调用的方法
    //      times:  嵌套的层数
    coreUtil.eachCall = function (obj, call, times) {
        if (!coreUtil.isFunction(call)) { return; }
        if (obj == undefined) { obj = coreNullable.Object; }
        if (times == undefined || times < 0) { times = 1; }
        if (times == 0) { return obj; }
        call.call(this, obj);
        for (var i = 1; i <= times; i++) { for (var key in obj) { coreUtil.eachCall.call(this, obj[key], call, times - 1); } }
    };

    //  阻止向对象添加新属性。
    //  模拟 Object.preventExtensions 方法；
    coreUtil.preventExtensions = function (obj, times) {
        coreUtil.eachCall.call(this, obj, Object.preventExtensions, times);
    };
    //  阻止修改现有属性的特性，并阻止添加新属性。
    //  模拟 Object.seal 方法；
    coreUtil.seal = function (obj, times) {
        coreUtil.eachCall.call(this, obj, Object.seal, times);
    };
    //  阻止修改现有属性的特性和值，并阻止添加新属性。
    //  模拟 Object.freeze 方法；
    coreUtil.freeze = function (obj, times) {
        coreUtil.eachCall.call(this, obj, Object.freeze, times);
    };

    //  在指定的毫秒数后调用函数或计算表达式；该函数定义如下参数：
    //      code:       必需。要调用的函数后要执行的 JavaScript 代码串。
    //      millisec:   可选。在执行代码前需等待的毫秒数。
    //  模拟 setTimeout/setImmediate 方法。
    //  备注：如果不传入参数 millisec 或该参数值为 0，则自动调用 setImmediate(该方法可以有效降低浏览器资源开销) 方法；
    coreUtil.call = function (code, millisec) {
        if (coreUtil.isString(code) && coreString.isNullOrWhiteSpace(code)) { return; }
        if (millisec == null || millisec == undefined) { millisec = 0; }
        return millisec == 0 && window.setImmediate ? window.setImmediate(code) : window.setTimeout(code, millisec);
    };



    var _matched, _browser;
    var _userAgentMatch = function (userAgent) {
        userAgent = userAgent.toLowerCase();
        var match = /(chrome)[ \/]([\w.]+)/.exec(userAgent) ||
		    /(webkit)[ \/]([\w.]+)/.exec(userAgent) ||
		    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(userAgent) ||
		    /(msie) ([\w.]+)/.exec(userAgent) ||
		    userAgent.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(userAgent) || [];
        return { browser: match[1] || "", version: match[2] || "0" };
    };
    _matched = _userAgentMatch(window.navigator.userAgent);
    _browser = {};
    if (_matched.browser) { _browser[_matched.browser] = true; _browser.version = _matched.version; }
    if (_browser.chrome) { _browser.webkit = true; } else if (_browser.webkit) { _browser.safari = true; }

    //  获取浏览器的名称以及版本号。
    //  判断浏览器版本示例：判断浏览器是否为IE：  coreUtil.browser.msie == true，判断浏览器是否为 Chrome：window.browser.chrome == true
    //  判断浏览器版本号：coreUtil.browser.version，IE下可能的值为 6.0/7.0/8.0/9.0/10.0 等等。
    coreUtil.browser = _browser;




    //  定义默认的对象比较函数，该函数返回一个 bool 值表示传入的两个对象是否等值。
    coreUtil.equalsCompare = function (item1, item2) { return item1 == item2; };

    //  定义默认的数值比较函数，该函数返回一个 int 值，该返回值的意义如下：
    //      如果大于 0，则表示 a > b；
    //      如果小于 0，则表示 a < b；
    //      如果等于 0，则表示 a == b。
    coreUtil.numericCompare = function (a, b) {
        if (!coreUtil.isNumeric(a) && coreString.isNumeric(a)) { a = parseFloat(a, 10); }
        if (!coreUtil.isNumeric(b) && coreString.isNumeric(b)) { b = parseFloat(b, 10); }
        if (a > b) { return 1; } else if (a < b) { return -1; } else { return 0; }
    };

    //  确认两个 javascript 对象是否等值，该函数定义如下参数:
    //      item1: 待比较的对象1；
    //      item2: 待比较的对象2，用于和对象1进行比较；
    //      compare: 用于比较运算的函数，该函数用于比较 item1 是否与 item2 等值；该函数返回一个 bool 值；这是一个可选参数。
    //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
    //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
    //  返回值：如果 item1 与 item2 等值，则返回 true，否则返回 false。
    coreUtil.equals = function (item1, item2, compare) {
        var isFunc = coreUtil.isFunction(compare);
        if (!isFunc) { compare = coreUtil.equalsCompare; }
        return compare.call(this, item1, item2) == true;
    };

    //  比较两个 javascript 对象的大小，该函数定义如下参数：
    //      item1: 待比较的对象1；
    //      item2: 待比较的对象2，用于和对象1进行比较；
    //      compare: 比较函数，该函数被循环调用，用于比较 array 中没两项的大小；这是一个可选参数；
    //          该函数的签名为 function (a, b) { }，参数 a、b 分别表示源数组中的待比较大小的项；该函数必须返回一个数值表示比较后的结果；
    //              如果 a > b ，则返回一个 大于 0 的值；
    //              如果 a < b ，则返回一个 小于 0 的值；
    //              如果 a == b，则返回 0；
    //          如果不定义该参数，则默认将 array 中的每一项当作数字来进行比较。
    //  返回值：如果 item1 > item2 ，则返回一个 大于 0 的值；
    //          如果 item1 < item2 ，则返回一个 小于 0 的值；
    //          如果 item1 == item2，则返回 0；
    coreUtil.compare = function (item1, item2, compare) {
        var isFunc = coreUtil.isFunction(compare);
        if (!isFunc) { compare = coreUtil.numericCompare; }
        return compare.call(this, item1, item2);
    };









    /////////////////////////////////////////////////////////////////////////////////////////////// 
    //  javascript 字符(串)函数功能扩充
    /////////////////////////////////////////////////////////////////////////////////////////////// 

    //  判断传入的对象是否是一个字符串。
    coreString.isString = coreUtil.isString;

    //  判断传入的字符串是否为Null或者为空字符串。
    coreString.isNullOrEmpty = function (str) { return str === undefined || str === null || str === ""; };
    coreString.prototype.isNullOrEmpty = function () { return coreString.isNullOrEmpty(this); };

    //  判断传入的字符串是否为Null或者为空字符串或者全是空格。
    coreString.isNullOrWhiteSpace = function (str) { return coreString.isNullOrEmpty(str) || coreString.trim(String(str)) === ""; };
    coreString.prototype.isNullOrWhiteSpace = function () { return coreString.isNullOrWhiteSpace(this); };

    //  判断传入的字符串是否为 HTML 代码段。
    coreString.isHtmlText = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return str.length >= 3 && str.charAt(0) === "<" && str.charAt(str.length - 1) === ">";
    };
    coreString.prototype.isHtmlText = function () { return coreString.isHtmlText(this); };

    //  用新字符串替换与给定字符串匹配的所有子串；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
    coreString.replaceAll = function (str, substr, replacement, ignoreCase) {
        if (!substr || !replacement || substr == replacement) { return str; }
        var regexp = coreUtil.isRegExp(substr) ? substr : new RegExp(String(substr), ignoreCase ? "gm" : "igm");
        return str.replace(regexp, replacement);
    };
    coreString.prototype.replaceAll = function (substr, replacement) { return coreString.replaceAll(this, substr, replacement); };

    //  格式化字符串，类似于 .NET 中的 string.format 函数功能
    //  使用方法：coreString.format('字符串{0}字符串{1}字符串','第一个变量','第二个变量','第三个变量', ...'第 N 个变量');
    //  该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
    coreString.format = function (str, arg1, arg2, arg3, argn) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        var isArray = coreUtil.likeArray(arg1),
            data = (isArray && !coreUtil.isString(arg1)) || coreUtil.isObject(arg1) ? arg1 : coreArray.range(arguments, 1);
        if (isArray) {
            for (var i = 0; i < data.length; i++) {
                value = data[i] ? data[i] : "";
                str = str.replace(new RegExp("\\{" + i + "}", "gm"), value);
            }
        } else {
            for (var key in data) {
                var value = proxy.call(data, key);
                value = (value == null || value == undefined) ? "" : value;
                str = str.replace(new RegExp("\\{" + key + "}", "gm"), value);
            }
        }
        return str;
        function proxy(key) { try { return eval("this[\"" + key + "\"]"); } catch (ex) { return ""; } }
    };
    coreString.prototype.format = function (arg1, arg2, arg3, argn) {
        arguments = coreArray.insert(arguments, 0, this);
        return coreString.format.apply(this, arguments);
    };

    //  判断当前字符串对象是否包含指定的字符串内容。
    coreString.contains = function (str, val) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return String(str).indexOf(val) > -1;
    };
    coreString.prototype.contains = function (val) { return coreString.contains(this, val); };

    //  字符串反转；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
    coreString.reverse = function (str) {
        var charArray = [];
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        for (var i = str.length - 1; i > -1; i--) { charArray.push(str[i]); }
        return charArray.join("");
    };
    coreString.prototype.reverse = function () { return coreString.reverse(this); };

    //  去除字符串左边的空格；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
    coreString.ltrim = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return str.replace(/(^\s*)/g, "");
    };
    coreString.prototype.ltrim = function () { return coreString.ltrim(this); };

    //  去除字符串右边的空格；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
    coreString.rtrim = function () {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return str.replace(/(\s*$)/g, "");
    };
    coreString.prototype.rtrim = function () { return coreString.rtrim(this); };

    //  去除字符串左右两边的空格；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
    coreString.trim = coreUtil.trim;
    coreString.prototype.trim = function () { return coreString.trim(this); };

    //  返回一个新字符串，该字符串通过在此实例中的字符左侧填充空格或指定字符来来达到指定的总长度，从而使这些字符右对齐。
    coreString.padLeft = function (str, len, paddingChar) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        paddingChar = coreString.isNullOrEmpty(paddingChar) || !paddingChar.length ? " " : paddingChar;
        len = coreUtil.isNumeric(len) ? len : str.length;
        if (str.length < len) { for (; str.length < len; str = paddingChar + str) { } }
        return str;
    };
    coreString.prototype.padLeft = function (len, paddingChar) { return coreString.padLeft(this, len, paddingChar); };

    //  返回一个新字符串，该字符串通过在此字符串中的字符右侧填充空格或指定字符来达到指定的总长度，从而使这些字符左对齐
    coreString.padRight = function (str, len, paddingChar) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        paddingChar = coreString.isNullOrEmpty(paddingChar) || !paddingChar.length ? " " : paddingChar;
        len = coreUtil.isNumeric(len) ? len : str.length;
        if (str.length < len) { for (; str.length < len; str += paddingChar) { } }
        return str;
    };
    coreString.prototype.padRight = function (len, paddingChar) { return coreString.padRight(this, len, paddingChar); };

    //  返回字符串中的的字符，注意从 0 开始。
    coreString.mid = function (str, start, len) {
        if (!start) { start = 0; }
        if (!len) { len = 0; }
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return str.substr(start, len)
    };
    coreString.prototype.mid = function (start, len) { return coreString.mid(this, start, len); };

    //  计算字符串的打印长度。
    coreString.lengthOfPrint = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return str.replace(/[^\x00-\xff]/g, "**").length;
    };
    coreString.prototype.lengthOfPrint = function () { return coreString.lengthOfPrint(this); };

    //  判断当前 String 对象是否以指定的字符串开头。
    coreString.startsWith = function (str, val) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return str.substr(0, val.length) == val
    };
    coreString.prototype.startsWith = function (val) { return coreString.startsWith(this, val); };

    //  判断当前 String 对象是否以指定的字符串结尾。
    coreString.endsWith = function (str, val) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return str.substr(str.length - val.length) == val;
    };
    coreString.prototype.endsWith = function (val) { return coreString.endsWith(this, val); };

    //  截取当前字符串左边的指定长度内容。
    coreString.left = function (str, len) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        if (!coreUtil.isNumeric(len)) { len = parseInt(len, 10); }
        if (len < 0 || len > str.length) { len = str.length; }
        return str.substr(0, len);
    };
    coreString.prototype.left = function (len) { return coreString.left(this, len); };

    //  截取当前字符串右边的指定长度内容。
    coreString.right = function (str, len) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        if (!coreUtil.isNumeric(len)) { len = parseInt(len, 10); }
        if (len < 0 || len > str.length) { len = str.length; }
        return str.substring(str.length - len, str.length);
    };
    coreString.prototype.right = function (len) { return coreString.right(this, len); };

    //  判断当前 String 对象是否是正确的长日期格式。
    coreString.isLongDate = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        var r = str.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
        if (r == null) { return false; }
        var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
    };
    coreString.prototype.isLongDate = function () { return coreString.isLongDate(this); };

    //  判断当前 String 对象是否是正确的段日期格式。
    coreString.isShortDate = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        var r = str.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (r == null) { return false; }
        var d = new Date(r[1], r[3] - 1, r[4]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
    };
    coreString.prototype.isShortDate = function () { return coreString.isShortDate(this); };

    //  判断当前 String 对象是否是正确的日期格式。
    coreString.isDate = function (str) {
        return coreString.isLongDate(str) || coreString.isShortDate(str);
    };
    coreString.prototype.isDate = function () { return coreString.isDate(this); };

    //  判断当前 String 独享是否是正确的电话号码格式(中国)。
    coreString.isTel = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(str);
    };
    coreString.prototype.isTel = function () { return coreString.isTel(this); };

    //  判断当前 String 对象是否是正确的手机号码格式(中国)。
    coreString.isMobile = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^(13|15|18)\d{9}$/i.test(str);
    };
    coreString.prototype.isMobile = function () { return coreString.isMobile(this); };

    //  判断当前 String 对象是否是正确的电话号码或者手机号码格式(中国)
    coreString.isTelOrMobile = function (str) {
        return coreString.isTel(str) || coreString.isMobile(str);
    };
    coreString.prototype.isTelOrMobile = function () { return coreString.isTelOrMobile(this); };

    //  判断当前 String 对象是否是正确的传真号码格式
    coreString.isFax = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(str);
    };
    coreString.prototype.isFax = function () { return coreString.isFax(this); };

    //  判断当前 String 对象是否是正确的 电子邮箱地址(Email) 格式。
    coreString.isEmail = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(str);
    };
    coreString.prototype.isEmail = function () { return coreString.isEmail(this); };

    //  判断当前 String 对象是否是正确的 邮政编码(中国) 格式。
    coreString.isZipCode = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^[\d]{6}$/.test(str);
    };
    coreString.prototype.isZipCode = function () { return coreString.isZipCode(this); };

    //  判断当前 String 对象是否是否存在汉字字符。
    coreString.existChinese = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        //[\u4E00-\u9FA5]為漢字﹐[\uFE30-\uFFA0]為全角符號
        return /^[\x00-\xff]*$/.test(str);
    };
    coreString.prototype.existChinese = function () { return coreString.existChinese(this); };

    //  验证中文
    coreString.isChinese = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^[\u0391-\uFFE5]+$/i.test(str);
    };
    coreString.prototype.isChinese = function () { return coreString.isChinese(this); };

    //  验证英文
    coreString.isEnglish = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^[A-Za-z]+$/i.test(str);
    };
    coreString.prototype.isEnglish = function () { return coreString.isEnglish(this); };

    //  判断当前 String 对象是否是正确的 文件名称(路径) 格式。
    coreString.isFileName = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        //return !/[\\\/\*\?\|:"<>]/g.test(str);
        return !/[\\\/\*\?\|:<>]/g.test(str);
    };
    coreString.prototype.isFileName = function () { return coreString.isFileName(this); };

    //  判断当前 String 对象是否是正确的 IPv4 地址格式。
    coreString.isIPv4 = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
        if (reSpaceCheck.test(str)) {
            str.match(reSpaceCheck);
            if (RegExp.$1 <= 255 && RegExp.$1 >= 0
                    && RegExp.$2 <= 255 && RegExp.$2 >= 0
                    && RegExp.$3 <= 255 && RegExp.$3 >= 0
                    && RegExp.$4 <= 255 && RegExp.$4 >= 0) {
                return true;
            } else { return false; }
        } else { return false; }
    };
    coreString.prototype.isIPv4 = function () { return coreString.isIPv4(this); };

    //  判断当前 String 对象是否是正确的 url 格式。
    coreString.isUrl = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        //        var strRegex = "^((https|http|ftp|rtsp|mms)?:               //)"
        //    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?"    //ftp的user@
        //          + "(([0-9]{1,3}\.){3}[0-9]{1,3}"                          // IP形式的URL- 199.194.52.184
        //          + "|"                                                     // 允许IP和DOMAIN（域名）
        //          + "([0-9a-z_!~*'()-]+\.)*"                                // 域名- www.
        //          + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\."                  // 二级域名
        //          + "[a-z]{2,6})"                                           // first level domain- .com or .museum
        //          + "|"                                                     // 允许为本机
        //          + "localhost|127.0.0.1"                                   // 允许为本机地址
        //          + "(:[0-9]{1,4})?"                                        // 端口- :80
        //          + "((/?)|"                                                // a slash isn't required if there is no file name
        //          + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        var strRegex = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
        var re = new RegExp(strRegex);
        return re.test(str);
    };
    coreString.prototype.isUrl = function () { return coreString.isUrl(this); };

    //  判断是否为合法的 ipv4 或者 url 格式
    coreString.isUrlOrIPv4 = function (str) {
        return coreString.isUrl(str) || coreString.isIP(str);
    };
    coreString.prototype.isUrlOrIPv4 = function () { return coreString.isUrlOrIPv4(this); };

    //  判断是否为合法的货币格式
    coreString.isCurrency = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^-\d|\d+(\.\d+)?$/i.test(str);
    };
    coreString.prototype.isCurrency = function () { return coreString.isCurrency(this); };

    //  判断是否为合法的 QQ 号码格式
    coreString.isQQ = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^[1-9]\d{4,11}$/i.test(str);
    };
    coreString.prototype.isQQ = function () { return coreString.isQQ(this); };

    //  判断是否为合法的 MSN 帐号格式
    coreString.isMSN = function (str) {
        return coreString.isEmail(str);
    };
    coreString.prototype.isMSN = function () { return coreString.isMSN(this); };

    //  验证是否包含空格和非法字符Z
    coreString.isUnNormal = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /.+/i.test(str);
    };
    coreString.prototype.isUnNormal = function () { return coreString.isUnNormal(this); };

    //  验证是否为合法的车牌号码
    coreString.isCarNo = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/.test(str);
    };
    coreString.prototype.isCarNo = function () { return coreString.isCarNo(this); };

    //  验证是否为合法的汽车发动机序列号
    coreString.isCarEngineNo = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^[a-zA-Z0-9]{16}$/.test(str);
    };
    coreString.prototype.isCarEngineNo = function () { return coreString.isCarEngineNo(this); };

    //  验证是否可以作为合法的用户名字符(字母开头，允许6-16字节，允许字母数字下划线)
    coreString.isUserName = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(str);
    };
    coreString.prototype.isUserName = function () { return coreString.isUserName(this); };

    //  判断当前 String 对象是否是正确的 身份证号码(中国) 格式。
    coreString.isIDCard = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        var iSum = 0;
        var info = "";
        var sId = str;
        var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
        if (!/^\d{17}(\d|x)$/i.test(sId)) { return false; }
        sId = sId.replace(/x$/i, "a");
        //非法地区
        if (aCity[parseInt(sId.substr(0, 2), 10)] == null) { return false; }
        var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"))
        //非法生日
        if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) { return false; }
        for (var i = 17; i >= 0; i--) { iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11); }
        if (iSum % 11 != 1) { return false; }
        return true;
    };
    coreString.prototype.isIDCard = function () { return coreString.isIDCard(this); };

    //  验证是否为整数格式
    coreString.isInteger = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^[+]?[1-9]+\d*$/i.test(str);
    };
    coreString.prototype.isInteger = function () { return coreString.isInteger(this); };

    //  判断当前 String 对象是否是正确的 数字 格式。
    coreString.isNumeric = function (str, flag) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        //验证是否是数字
        if (isNaN(str)) { return false; }
        if (arguments.length == 0) { return false; }
        switch (flag) {
            case "":
                return true;
            case "+":        //正数
                return /(^\+?|^\d?)\d*\.?\d+$/.test(str);
            case "-":        //负数
                return /^-\d*\.?\d+$/.test(str);
            case "i":        //整数
                return /(^-?|^\+?|\d)\d+$/.test(str);
            case "+i":        //正整数
                return /(^\d+$)|(^\+?\d+$)/.test(str);
            case "-i":        //负整数
                return /^[-]\d+$/.test(str);
            case "f":        //浮点数
                return /(^-?|^\+?|^\d?)\d*\.\d+$/.test(str);
            case "+f":        //正浮点数
                return /(^\+?|^\d?)\d*\.\d+$/.test(str);
            case "-f":        //负浮点数
                return /^[-]\d*\.\d$/.test(str);
            default:        //缺省
                return true;
        }
    };
    coreString.prototype.isNumeric = function (flag) { return coreString.isNumeric(this, flag); };

    //  判断当前 String 对象是否是正确的 颜色(#FFFFFF形式) 格式。
    coreString.isColor = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        if (str == "") { return true };
        if (str.length != 7) { return false };
        return (str.search(/\#[a-fA-F0-9]{6}/) != -1);
    };
    coreString.prototype.isColor = function () { return coreString.isColor(this); };

    //  判断当前 String 对象是否可以作为安全密码字符(由字符和数字组成，至少 6 位).
    coreString.isSafePassword = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return !(/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/.test(str));
    };
    coreString.prototype.isSafePassword = function () { return coreString.isSafePassword(this); };

    //  转换成全角
    coreString.toCase = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        var tmp = "";
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255) { tmp += String.fromCharCode(str.charCodeAt(i) + 65248); }
            else { tmp += String.fromCharCode(str.charCodeAt(i)); }
        }
        return tmp
    };
    coreString.prototype.toCase = function () { return coreString.toCase(this); };

    //  对字符串进行Html编码。
    coreString.toHtmlEncode = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        var temp = str;
        temp = temp.replace(/&/g, "&amp;");
        temp = temp.replace(/</g, "&lt;");
        temp = temp.replace(/>/g, "&gt;");
        temp = temp.replace(/\'/g, "&apos;");
        temp = temp.replace(/\"/g, "&quot;");
        temp = temp.replace(/\n/g, "<br>");
        temp = temp.replace(/\ /g, "&nbsp;");
        temp = temp.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
        return temp;
    };
    coreString.prototype.toHtmlEncode = function () { return coreString.toHtmlEncode(this); };

    //  转换成日期。
    coreString.toDate = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        try { return new Date(str.replace(/-/g, "\/")); }
        catch (e) { return null; }
    };
    coreString.prototype.toDate = function () { return coreString.toDate(this); };

    //  将字符串对象转换成 布尔(boolean) 值
    coreString.toBoolean = function (str) {
        if (typeof str == "boolean") { return str; }
        str = coreString.isNullOrEmpty(str) ? "" : String(str).toLowerCase();
        str = coreString.trim(str);
        return str == "true" || str == "yes" || str == "y" || str == "t" || str == "1";
    };
    coreString.prototype.toBoolean = function () { return coreString.toBoolean(this); };

    //  将字符串对象转换成 整数(int) 值
    coreString.toInteger = function (str) { return parseInt(str); };
    coreString.prototype.toInteger = function () { return coreString.toInteger(this); };

    //  将字符串对象转换成 数值(Number)。
    coreString.toNumber = function (str) { return coreString.toFloat(str); };
    coreString.prototype.toNumber = function () { return coreString.toNumber(this); };

    //  将字符串对象转换成 浮点数(float) 值
    coreString.toFloat = function (str) { return parseFloat(str); };
    coreString.prototype.toFloat = function () { return coreString.toFloat(this); };

    //  将字符串对象转换成 数值
    coreString.toNumeric = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        str = coreString.trim(str);
        return str.indexOf(".") > -1 ? coreString.toFloat(str) : coreString.toInteger(str);
    };
    coreString.prototype.toNumeric = function () { return coreString.toNumeric(this); };

    //  将字符串对象转换成 对象(Object) 值
    coreString.toObject = function (str) { return JSON.parse(str); };
    coreString.prototype.toObject = function () { return coreString.toObject(this); };

    coreString.toJSONString = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        str = coreString.trim(str);
        return str.charAt(0) === "<" && str.charAt(str.length - 1) === ">" && str.length >= 3 ? $(str).text() : str;
    };

    //  将字符串对象转换成 函数(function) 值
    coreString.toFunction = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        str = coreString.trim(str);
        if (!str.startsWith("function")) { str = "function(){" + str + "}"; }
        str = "{ \"func\": " + str + " }";
        return coreString.toObject(str).func;
    };
    coreString.prototype.toFunction = function () { return coreString.toFunction(this); };




    /////////////////////////////////////////////////////////////////////////////////////////////// 
    //  javascript 的数值(Number)函数功能扩充。
    /////////////////////////////////////////////////////////////////////////////////////////////// 

    //  判断对象是否是一个数值
    coreNumber.isNumber = coreUtil.isNumeric;

    //  把一个数字/浮点数舍入为指定精度的数值；该函数定义如下参数：
    //      num:    需要进行舍入计算的数值;
    //      precision:  舍入操作保留的精度(意即保留多少为小数)，默认为 0;
    coreNumber.round = function (num, precision) {
        if (!$.isNumeric(num)) { throw "传入的参数 num 必须是一个数值"; }
        precision = $.isNumeric(precision) ? precision : 0;
        var str = new Number(num).toFixed(precision);
        return precision ? parseFloat(str) : parseInt(str);
    };
    coreNumber.prototype.round = function (precision) { return coreNumber.round(this, precision); };

    //  获取或设置数值对象的精度；该函数定义如下重载：
    //      重载一：function(num)，该重载用于获取数值的精度，该重载定义如下参数：
    //              num:    需要获取精度的数值。
    //          返回值：返回数值 num 的精度(小数位数)。
    //      重载二：function(num, precision)，该重载用于设置数值的精度(即进行数值舍入操作)，该重载定义如下参数：
    //              num:    需要设置精度的数值。
    //              precision: 需要设置的精度。
    //          返回值：返回数值 num 按照指定的精度进行舍入操作后的值；
    //          备注：该重载会调用函数 coreNumber.round 进行数值舍入操作。
    coreNumber.precision = function (num, precision) {
        if (!$.isNumeric(num)) { throw "传入的参数 num 必须是一个数值"; }
        if ($.isNumeric(precision)) { return coreNumber.round(num, precision); } else {
            var str = String(num), i = str.indexOf(".");
            return i == -1 ? 0 : str.length - str.indexOf(".") - 1;
        }
    };

    //  判断传入的数值是否是一个奇数；该函数定义如下参数：
    //      num:    需要判断的数值；
    //  返回值：如果传入的参数 num 是一个奇数，则返回 true，否则返回 false。
    coreNumber.isOdd = function (num) {
        return (num % 2) == 1;
    };
    coreNumber.prototype.isOdd = function () { return coreNumber.isOdd(this); };

    //  判断传入的数值是否是一个偶数；该函数定义如下参数：
    //      num:    需要判断的数值；
    //  返回值：如果传入的参数 num 是一个偶数，则返回 true，否则返回 false。
    coreNumber.isEven = function (num) {
        return (num % 2) == 0;
    };
    coreNumber.prototype.isEven = function () { return coreNumber.isEven(this); };




    /////////////////////////////////////////////////////////////////////////////////////////////// 
    //  javascript 的数组函数功能扩充。
    /////////////////////////////////////////////////////////////////////////////////////////////// 

    //  判断对象是否是一个数组
    coreArray.isArray = core_isArray ? core_isArray : function (array) { return coreUtil.type(array) === "array"; };
    coreUtil.isArray = $.isArray = coreArray.isArray;

    //  检测一个对象是否为一个数组对象或者类似于数组对象，同 coreUtil.likeArray
    coreArray.likeArray = coreUtil.likeArray;

    //  判断传入的 数组 是否为 Null 或者为空数组。
    coreArray.isNullOrEmpty = function (array) { return !coreArray.likeArray(array) || !array.length; };
    coreArray.prototype.isNullOrEmpty = function () { return coreArray.isNullOrEmpty(this); };

    //  往数组中添加一个新项；该函数定义如下参数:
    //      array:  要添加新项的数组对象；
    //      item:   被添加的新项；
    //  返回值：返回该数组添加新项后的长度；
    coreArray.push = function (array, item) {
        if (!coreArray.likeArray(array)) { throw "传入的参数 array 不是一个数组对象。"; }
        return core_push.call(array, item);
    };
    coreArray.prototype.push = function (item) { return coreArray.push(this, item); };

    //  复制数组内的所有项到一个新的数组中，该函数定义如下参数：
    //      source: 源数据数组，该数组内的所有项将被赋值到目标数组 target 中；
    //      target: 目标数组，源数组 source 中的所有项将被赋值到该数组中；
    //  该方法会改变目标数组 target 中的元素数量。
    //  返回值：源数组数据复制过来后的目标数组 target。
    coreArray.copy = function (source, target) {
        var l = source.length, i = 0;
        if (coreUtil.isNumeric(l)) {
            while (i < l) { core_push.call(target, source[i++]); };
        } else {
            while (source[i] !== undefined) { core_push.call(target, source[i++]); }
        }
        return target;
    };
    coreArray.prototype.copy = function (source) { return coreArray.copy(source, this); };
    coreArray.prototype.copyTo = function (target) { return coreArray.copy(this, target); };

    //  创建一个和当前数组对象相同的数组并返回
    coreArray.clone = function (source) { return coreArray.copy(source, []); };
    coreArray.prototype.clone = function () { return coreArray.clone(this); };

    //  确认数组中是否包含指定的元素。该函数定义如下参数：
    //      array: 被检测的数组；
    //      item: 被检测的元素，判断该元素是否存在于数组 array 中；
    //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
    //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
    //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
    coreArray.contains = function (array, item, compare) {
        return coreArray.some(array, function (val) { return coreUtil.equals(val, item, compare); });
    };
    coreArray.prototype.contains = function (item, compare) { return coreArray.contains(this, item, compare); };

    //  颠倒数组中元素的顺序。
    //  返回值：返回传入的参数 array 本身；如果传入的参数 array 不是一个数组，则返回一个新创建的空数组对象。
    //  注意：该方法会改变原来的数组，而不会创建新的数组。
    coreArray.reverse = function (array) {
        array = coreArray.likeArray(array) ? array : [];
        if (coreArray.isArray(array)) { array.reverse(); return array; }
        var len = array.length, l = len / 2, j;
        for (var i = 0; i < l; i++) {
            j = len - i - 1;
            var a = array[i];
            var b = array[j];
            array[i] = b;
            array[j] = a;
        }
        return array;
    };

    //  在数组中搜索指定的项，并返回整个数组中第一个匹配项的从零开始的索引，该函数定义如下参数：
    //      array: 源数据数组；
    //      item:  要搜索的项；
    //      startIndex: 从零开始的搜索的起始索引，空列表中 0（零）为有效值；该参数可选；如果该参数未定义则从 0 开始；
    //      count: 要搜索的部分中的元素数；该参数可选，如果该参数未定义则搜索至数组的末尾；
    //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
    //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
    //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
    //  返回值：如果在数组中从 startIndex 开始并包含 count 个元素的元素范围内找到 item 的第一个匹配项，则为该项的从零开始的索引；否则为 -1。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679977(v=vs.94).aspx
    coreArray.indexOf = function (array, item, startIndex, count, compare) {
        array = coreArray.likeArray(array) ? array : [];
        var result = -1;
        if (!array.length) { return result; }
        if (arguments.length > 2) {
            var c = arguments[arguments.length - 1];
            compare = coreUtil.isFunction(c) ? c : null;
            var s = arguments[2];
            startIndex = coreUtil.isNumeric(s) ? s : 0;
            if (startIndex < 0 || array.length < startIndex) { return result; }
            if (arguments.length > 3) {
                c = arguments[3];
                count = coreUtil.isNumeric(c) ? c : array.length - startIndex;
            } else {
                count = array.length - startIndex;
            }
            if (count < 0 || startIndex + count > array.length) { return result; }
        } else {
            startIndex = 0;
            count = array.length - startIndex;
            compare = null;
        }
        var stopIndex = startIndex + count;
        for (var i = startIndex; i < stopIndex; i++) {
            if (coreUtil.equals(array[i], item, compare)) { result = i; break; }
        }
        return result;
    };
    coreArray.prototype.indexOf = function (item, startIndex, count, compare) { return coreArray.indexOf(this, item, startIndex, count, compare); };

    //  在数组中搜索指定的项，并返回整个数组中最后一个匹配项的从零开始的索引。
    //      array: 源数据数组；
    //      item:  要搜索的项；
    //      startIndex: 向后搜索的从零开始的起始索引；该参数可选；如果该参数未定义则从数组末尾开始；
    //      count: 要搜索的部分中的元素数；该参数可选，如果该参数未定义则搜索至数组的起始位置；
    //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
    //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
    //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
    //  返回值：如果在数组中包含 count 个元素、在 startIndex 处结尾的元素范围内找到 item 的最后一个匹配项，则为该项的从零开始的索引；否则为 -1。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679972(v=vs.94).aspx
    coreArray.lastIndexOf = function (array, item, startIndex, count, compare) {
        array = coreArray.likeArray(array) ? array : [];
        var result = -1;
        if (!array.length) { return result; }
        if (arguments.length > 2) {
            var c = arguments[arguments.length - 1];
            compare = coreUtil.isFunction(c) ? c : null;
            var s = arguments[2];
            startIndex = coreUtil.isNumeric(s) ? s : 0;
            if (startIndex < 0 || array.length < startIndex) { return result; }
            if (arguments.length > 3) {
                c = arguments[3];
                count = coreUtil.isNumeric(c) ? c : array.length - startIndex;
            } else {
                count = array.length - startIndex;
            }
            if (count < 0 || startIndex + count > array.length) { return result; }
        } else {
            startIndex = 0;
            count = array.length - startIndex;
            compare = null;
        }
        var stopIndex = startIndex + count;
        var begin = array.length - startIndex - 1;
        var end = begin - count;
        for (var i = begin; i > end; i--) {
            if (coreUtil.equals(array[i], item, compare)) { result = i; break; }
        }
        return result;
    };
    coreArray.prototype.lastIndexOf = function (item, startIndex, count, compare) { return coreArray.lastIndexOf(this, item, startIndex, count, compare); };

    //  提取指定数组中介于两个指定索引号之间的元素构成的一个新的数组；该函数定义如下参数：
    //      array: 源数据数组；
    //      startIndex: 必需。一个大于或等于 0 的整数，规定从何处开始选取，从 0 开始计数。
    //      stopIndex: 可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 startIndex 到数组结束的所有元素。
    //  返回值：返回一个新的数组，包含从 startIndex 到 stopIndex （不包括该元素）的 arrayObject 中的元素。
    coreArray.range = function (array, startIndex, stopIndex) {
        array = coreArray.likeArray(array) ? array : [];
        startIndex = coreUtil.isNumeric(startIndex) ? startIndex : 0;
        stopIndex = coreUtil.isNumeric(stopIndex) ? stopIndex : array.length;
        return core_slice.call(array, startIndex, stopIndex);
    };
    coreArray.prototype.range = function (startIndex, stopIndex) { return coreArray.range(this, startIndex, stopIndex); };

    //  提取指定数组中从 startIndex 位置开始后指定数量的元素构成的一个新的数组；该函数定义如下参数：
    //      array: 源数据数组；
    //      startIndex: 一个非负的整数，规定要提取的起始位置的索引号；
    //      length: 一个非负的整数，规定要提取的元素的数量；该参数可选，如果不定义该参数，则一直提取到数组的末尾；
    //  返回值：返回一个新的数组，包含从 startIndex 处开始后长度为 length 的所有元素。
    coreArray.rangeLen = function (array, startIndex, length) {
        startIndex = coreUtil.isNumeric(startIndex) ? startIndex : 0;
        length = coreUtil.isNumeric(length) ? length : array.length;
        var stopIndex = startIndex + length;
        return coreArray.range(array, startIndex, stopIndex);
    };
    coreArray.prototype.rangeLen = function (startIndex, length) { return coreArray.rangeLen(this, startIndex, length); };

    //  对指定的数组进行分页处理，并返回分页后的结果；该函数定义如下参数：
    //      array: 源数据数组；
    //      pageIndex: 一个非负整数，表示要返回的数据所在页面的索引号，从 0 开始计算；该参数可选，如果未定义该参数或不合法，则默认为 0；
    //      pageSize: 一个非负整数，表示每一个分页页面的尺寸，即每页有多少行记录；该参数可选，如果未定义该参数或不合法，则默认为 10；
    //          sortby: 用于排序的比较函数，该函数被循环调用，用于比较 array 中没两项的大小；这是一个可选参数；
    //              该函数的签名为 function (a, b) { }，参数 a、b 分别表示源数组中的待比较大小的项；该函数必须返回一个数值表示比较后的结果；
    //              如果 a > b ，则返回一个 大于 0 的值；
    //              如果 a < b ，则返回一个 小于 0 的值；
    //              如果 a == b，则返回 0；
    //          如果不定义该参数，则默认将 array 中的每一项当作数字来进行比较。
    //  该函数返回一个具有如下属性的 JSON 对象：
    //      pageSize:   一个非负整数，表示每一个分页页面的尺寸，即每页有多少行记录；
    //      pageIndex:  一个非负整数，表示返回的数据所在页面的索引号，从 0 开始计算；
    //      rowCount:   一个非负整数，表示返回的数据的未分页前的总行数；
    //      data:       一个数组，为传入的参数 array 的子集，表示分页后的页面数据；
    //      pageCount:  一个非负整数，表示源数据数组分页后的总页面数量；
    //      pageNumber: 一个非负整数，表示返回的数据所在的页面的序号，从 1 开始计算；同 pageIndex + 1；
    //      total:      一个非负整数，同 rowCount。
    coreArray.splitPage = function (array, pageIndex, pageSize, sortby) {
        array = coreArray.likeArray(array) ? array : [];
        if (!pageIndex || !coreUtil.isNumeric(pageIndex) || pageIndex < 0) { pageIndex = 0; }
        if (!pageSize || !coreUtil.isNumeric(pageSize) || pageSize < 1) { pageSize = 10; }
        var isFunc = coreUtil.isFunction(sortby);
        array = isFunc ? coreArray.clone(array).sort(sortby) : array;
        var startIndex = pageIndex * pageSize;
        var stopIndex = (pageIndex + 1) * pageSize;
        var data = coreArray.range(array, startIndex, stopIndex);
        var rowCount = array.length;
        var pageCount = Math.ceil(parseFloat(rowCount) / pageSize);
        var pageNumber = pageIndex + 1;
        var total = rowCount;
        return { pageSize: pageSize, pageIndex: pageIndex, rowCount: rowCount, data: data, pageCount: pageCount, pageNumber: pageNumber, total: total };
    };
    coreArray.prototype.splitPage = function (pageIndex, pageSize, sortby) { return coreArray.splitPage(this, pageIndex, pageSize, sortby); };

    //  从数组中移除一定范围的元素，该函数定义如下参数：
    //      array: 源数据数组；
    //      index: 要移除的元素的范围从零开始的起始索引；该参数可选，如果不定义该参数则默认为 0；
    //      count: 要移除的元素数；该参数可选，如果不定义该参数则默认为从 index 起始位置一直到数组的末尾，可以为 0。
    //  注意：该方法会改变现有的数组。
    coreArray.removeRange = function (array, index, count) {
        if (!coreArray.likeArray(array)) { throw "传入的参数 array 必须是一个数组"; }
        index = coreUtil.isNumeric(index) ? index : 0;
        count = coreUtil.isNumeric(count) && count >= 0 ? count : array.length;
        core_splice.call(array, index, count);
        return array;
    };
    coreArray.prototype.removeRange = function (index, count) { return coreArray.removeRange(this, index, count); };

    //  移除数组中的指定索引位置的项；该函数定义如下参数：
    //      array: 源数据数组，被移除的项包含在该数组中；
    //      index: 指定的索引位置，当检测到源数据数组中存在该索引项时，则移除源数据中的该索引项。
    //  注意：该方法会改变现有的数组。
    coreArray.removeAt = function (array, index) { return coreArray.removeRange(array, index, 1); };
    coreArray.prototype.removeAt = function (index) { return coreArray.removeAt(this, index); };

    //  移除数组中的指定项；该函数定义如下参数：
    //      array: 源数据数组，被移除的项包含在该数组中；
    //      item: 被移除的项，当检测到源数据数组中存在该项时，则移除源数据中的该项；
    //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
    //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
    //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
    //  注意：该方法会改变现有的数组。
    coreArray.remove = function (array, item, compare) {
        var index = coreArray.indexOf(array, item, compare);
        if (index < 0) { return array; }
        return coreArray.removeAt(array, index);
    };
    coreArray.prototype.remove = function (item, compare) { return coreArray.remove(this, item, compare); };

    //  将另一个数组插入到当前数组的指定索引处；该方法定义如下参数：
    //      array: 源数据数组；
    //      index: 应插入 item 的位置的零始索引；
    //      collect:  包含要插入的元素的数组；该值可以为 null。
    //  返回值：返回插入元素后的数组对象本身；如果传入的参数 array 不是一个数组，则返回一个新创建的空数组对象。
    //  注意：该方法会改变现有的数组。
    coreArray.insertRange = function (array, index, collect) {
        if (!coreArray.likeArray(array)) { throw "传入的参数 array 必须是一个数组"; }
        collect = coreArray.likeArray(collect) ? collect : [];
        if (!coreUtil.isNumeric(index) || index < 0 || index > array.length) { throw "ArgumentOutOfRangeException: 传入的索引号 index 超出数组 array 的范围。"; }
        var part = coreArray.range(array, index);
        coreArray.removeRange(array, index);
        coreArray.copy(collect, array);

        coreArray.copy(part, array);
        return array;
    };
    coreArray.prototype.insertRange = function (index, collect) { return coreArray.insertRange(this, index, collect); };

    //  将元素插入数组的指定索引处；该方法定义如下参数：
    //      array: 源数据数组；
    //      index: 应插入 item 的位置的零始索引；
    //      item:  要插入的元素；该值可以为 null。
    //  返回值：返回插入元素后的数组对象本身；如果传入的参数 array 不是一个数组，则返回一个新创建的空数组对象。
    //  注意：该方法会改变现有的数组。
    coreArray.insert = function (array, index, item) {
        var collect = [item];
        return coreArray.insertRange(array, index, collect);
    };
    coreArray.prototype.insert = function (index, item) { return coreArray.insert(this, index, item); };

    //  将另一数组中的元素复制到当前数组中一定范围的元素上；该函数定义如下参数：
    //      array: 源数据数组；
    //      index: 从 0 开始的数组索引，从该位置开始赋值 collect 元素；该参数可选，如果不定义该参数，则默认为数组的末尾；
    //      collect: 要将其元素赋值到 array 中，该数组本身不能为 null，但它可以包含为null 的元素。
    //  返回值：返回设置元素后的数组对象本身；如果传入的参数 array 不是一个数组，则返回一个新创建的空数组对象。
    //  注意：该方法会改变现有数组中的项。
    coreArray.setRange = function (array, index, collect) {
        if (!coreArray.likeArray(array)) { throw "传入的参数 array 必须是一个数组"; }
        index = coreUtil.isNumeric(index) ? index : 0;
        if (index < 0 || array.length < index) { throw "ArgumentOutOfRangeException: 传入的索引号 index 超出数组 array 的范围。"; }
        collect = coreArray.likeArray(collect) ? collect : [];
        coreArray.removeRange(array, collect.length);
        return coreArray.insertRange(array, index, collect);
    };
    coreArray.prototype.setRange = function (index, collect) { return coreArray.setRange(this, index, collect); }

    //  如果源数组中不存在指定的项，则将该项添加到源数组中；该方法提供如下参数：
    //      array: 源数据数组；
    //      item: 将要被合并到源数组中的项，如果源数组中不存在该项，则将其添加至源数组；
    //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
    //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
    //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
    //  返回值：返回添加元素后的数组对象本身。
    //  注意：该方法会改变现有的数组。
    coreArray.attach = function (array, item, compare) {
        if (!coreArray.contains(array, item, compare)) { array.push(item); }
        return array;
    };
    coreArray.prototype.attach = function (item, compare) { return coreArray.attach(this, item, compare); };

    //  去除数组中重复项；该方法提供如下参数:
    //      array: 源数据数组；
    //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
    //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
    //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
    //  返回值：返回去除重复元素后的数组对象本身。
    //  注意：该方法会改变现有的数组。
    coreArray.distinct = function (array, compare) {
        if (!coreArray.likeArray(array)) { throw "传入的参数 array 必须是一个数组对象。"; }
        var temps = [];
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            if (i == 0) { temps.push(item); } else { coreArray.attach(temps, item, compare); }
        }
        coreArray.removeRange(array, 0);
        coreArray.copy(temps, array);
        return array;
    };
    coreArray.prototype.distinct = function (compare) { return coreArray.distinct(this, compare); };

    //  合并两个或多个数组；该方法提供如下参数:
    //      array: 初始源数组，之后所有的项都将被合并入该数组；
    //      item1: 第 1 个待合并项；
    //      item2: 第 2 个待合并项；
    //      item3: 第 3 个待合并项；
    //      itemn... 第 n 个待合并项；
    //  如果要进行 merge 操作的参数是数组，那么添加的是数组中的元素，而不是数组。
    //  返回值：返回合并多个数组(元素)后的数组对象本身。
    //  注意：该方法会改变现有的数组，item1、item2、item3、itemn...等所有的参数项将被合并入 array 数组。
    coreUtil.merge = coreArray.merge = function (array, item1, item2, itemn) {
        if (!coreArray.likeArray(array)) { throw "传入的参数 array 必须是一个数组对象。"; }
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                var arg = arguments[i];
                arg = coreArray.likeArray(arg) && !coreUtil.isString(arg) ? arg : [arg];
                coreArray.copy(arg, array);
            }
        }
        return array;
    };
    coreArray.prototype.merge = function () { return coreArray.merge(this, arguments); };

    //  合并两个或多个数组，重复项将不会被合并；该方法提供如下参数:
    //      array: 初始源数组；
    //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
    //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
    //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
    //      item1: 第 1 个待合并项；
    //      item2: 第 2 个待合并项；
    //      item3: 第 3 个待合并项；
    //      itemn... 第 n 个待合并项；
    //  如果要进行 unique 操作的参数是数组，那么添加的是数组中的元素，而不是数组。
    //  返回值：返回合并多个数组(元素)后的数组对象本身。
    //  注意：该方法会改变现有的数组，item1、item2、item3、itemn...等所有的参数项将被合并入 array 数组。
    //  该方法与 coreArray.merge 方法的区别在于：
    //      merge 方法会将源数组与所有的 item 进行合并；
    //      unique 方法会判断源数组中是否存在相应的 item，如果存在则不合并；并且如果源数组中本身的元素如果存在重复，也会进行 distinct 处理。
    coreUtil.unique = coreArray.unique = function (array, compare, item1, item2, itemn) {
        var args = coreArray.clone(arguments);
        args.callee = arguments.callee;
        if (coreUtil.isFunction(compare)) { coreArray.removeAt(args, 1); }
        coreArray.merge.apply(this, args);
        coreArray.distinct(array, compare);
        return array;
    };
    coreArray.prototype.unique = function (compare, item1, item2, itemn) {
        var args = coreArray.clone(arguments);
        args.callee = arguments.callee;
        coreArray.insert(args, 0, this);
        return coreArray.unique.apply(this, args);
    };

    //  过滤查找当前数组中的元素，并返回查找的结果；返回的查找结果是一个新的数组；该函数定义如下参数：
    //      array: 必需。 一个数组对象。
    //      compare: 必需。 一个接受最多三个参数的函数。 对于数组中的每个元素， filter 方法都会调用 callbackfn 函数一次。
    //          该回调函数的语法如：function callbackfn(value, index, array)；
    //          如果该回调函数返回 true，则该元素将被包含在返回的集合当中。
    //  返回值：一个包含回调函数为其返回 true 的所有值的新数组。 如果回调函数为 array 的所有元素返回 false，则新数组的长度为 0。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679973(v=vs.94).aspx
    coreArray.filter = function (array, compare, thisArg) {
        array = coreArray.likeArray(array) ? array : [];
        if (!coreUtil.isFunction(compare)) { return array; }
        var temps = [];
        for (var i = 0; i < array.length; i++) {
            if (compare.call(thisArg, array[i], i, array) == true) { temps.push(array[i]); }
        }
        return temps;
    };
    coreArray.prototype.filter = function (compare) { return coreArray.filter(this, compare); };

    //  对数组的每个元素调用定义的回调函数并返回包含结果的数组；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback:   必需。 一个接受最多三个参数的函数。 对于数组中的每个元素， map 方法都会调用 callbackfn 函数一次。
    //          该回调函数语法如：function callbackfn(value, index, array1)；
    //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
    //  返回值：其中的每个元素均为关联的原始数组元素的回调函数返回值的新数组。
    //  备注：对于数组中的每个元素， map 方法都会调用 callbackfn 函数一次（采用升序索引顺序）。 不为数组中缺少的元素调用该回调函数。
    //      除了数组对象之外， map 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679976(v=vs.94).aspx
    coreArray.map = function (array, callback, thisArg) {
        array = coreArray.likeArray(array) ? array : [];
        if (!coreUtil.isFunction(callback)) { throw "传入的参数 callback 不是一个函数。"; }
        var temps = [];
        for (var i = 0; i < array.length; i++) {
            var item = callback.call(thisArg, array[i], i, array);
            temps.push(item);
        }
        return temps;
    };
    coreArray.prototype.map = function (callback, thisArg) { return coreArray.map(this, callback, thisArg); };

    //  对数组进行格式转换，将数组中的每一项转换成新的格式，然后合并成一个新的数组并返回；该函数定义如下参数：
    //  该方法同 coreArray.map
    coreArray.cast = coreArray.map;
    coreArray.prototype.cast = function (convert) { return coreArray.cast(this, convert); };

    //  获取数组中最大值的项；该函数定义如下参数:
    //      array: 待查找的源数组；
    //      compare: 比较函数，该函数被循环调用，用于比较 array 中没两项的大小；这是一个可选参数；
    //          该函数的签名为 function (a, b) { }，参数 a、b 分别表示源数组中的待比较大小的项；该函数必须返回一个数值表示比较后的结果；
    //              如果 a > b ，则返回一个 大于 0 的值；
    //              如果 a < b ，则返回一个 小于 0 的值；
    //              如果 a == b，则返回 0；
    //      如果不定义该参数，则默认将 array 中的每一项当作数字来进行比较。
    coreArray.max = function (array, compare) {
        array = coreArray.likeArray(array) ? array : [];
        if (array.length == 0) { return undefined; }
        if (array.length == 1) { return array[0]; }
        return coreArray.reduce(coreArray.range(array, 1), function (prev, current, index, array) {
            return coreUtil.compare(prev, current, compare) >= 0 ? prev : current;
        }, array[0]);
    };
    coreArray.prototype.max = function (compare) { return coreArray.max(this, compare); };

    //  获取数组中值等于最大值的集合数组；该函数的参数定义和 coreArray.max 相同；
    //  该函数返回的是一个新的数组，即使查找到的结果只有一项；
    coreArray.maxs = function (array, compare) {
        array = coreArray.likeArray(array) ? array : [];
        var max = coreArray.max(array, compare);
        return coreArray.filter(array, function (item) {
            return coreUtil.compare(item, max, compare) == 0;
        });
    };
    coreArray.prototype.maxs = function (compare) { return coreArray.maxs(this, compare); };

    //  获取数组中最小值的项；该函数的参数定义和 coreArray.max 相同；
    coreArray.min = function (array, compare) {
        array = coreArray.likeArray(array) ? array : [];
        if (array.length == 0) { return undefined; }
        if (array.length == 1) { return array[0]; }
        return coreArray.reduce(coreArray.range(array, 1), function (prev, current, index, array) {
            return coreUtil.compare(current, prev, compare) >= 0 ? prev : current;
        }, array[0]);
    };
    coreArray.prototype.min = function (compare) { return coreArray.min(this, compare); };

    //  获取数组中值等于最小值的集合；该函数的参数定义和 coreArray.max 相同；
    //  该函数返回的是一个新的数组，即使查找到的结果只有一项；
    coreArray.mins = function (array, compare) {
        array = coreArray.likeArray(array) ? array : [];
        var min = coreArray.min(array, compare);
        return coreArray.filter(array, function (item) {
            return coreUtil.compare(item, min, compare) == 0;
        });
    };
    coreArray.prototype.mins = function (compare) { return coreArray.mins(this, compare); };

    //  计算数组中各项累加后的合计值；该函数定义如下参数:
    //      array:  源数据数组
    //      callback: 转换函数，该函数被循环调用，用于将 array 中的每一项转换成一个新的数值并输出；如果定义该函数，则其必须返回一个数值；该参数可选；
    //          该函数的签名应该是 function (item) { }，参数 item 表示源数组中的项；
    //          如果不定义该参数，则默认将 array 中的每一项直接相加。
    //      thisArg:    可选。 可在 callback 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
    coreArray.sum = function (array, callback, thisArg) {
        var isFunc = coreUtil.isFunction(callback);
        var fn = function (previous, current) {
            return previous + (isFunc ? callback.call(thisArg, current) : current);
        };
        return coreArray.reduce(array, fn, 0);
    };
    coreArray.prototype.sum = function (convert) { return coreArray.sum(this, convert); };

    //  计算数组中各项累积后的平均值；该函数参数的定义和 coreArray.sum 一样；
    coreArray.avg = function (array, callback, thisArg) {
        array = coreArray.likeArray(array) ? array : [];
        var sum = coreArray.sum(array, callback, thisArg);
        var avg = parseFloat(sum) / array.length;
        return avg;
    };
    coreArray.prototype.avg = function (convert) { return coreArray.avg(this, convert); };

    //  从数组的开头返回指定数量的连续元素构成的新数组；该函数定义如下参数:
    //      array: 源数据数组；
    //      count: 要提取的元素项的数量，必须是一个正整数；该参数可选；如果不传入该参数或传入的值超出范围，则默认为 1。
    coreArray.take = function (array, count) {
        array = coreArray.likeArray(array) ? array : [];
        if (!$.isNumeric(count) || count < 1) { count = 1; }
        var temps = [];
        for (var i = 0; i < array.length; i++) { if (i < count) { temps.push(array[i]); } }
        return temps;
    };
    coreArray.prototype.take = function (count) { return coreArray.take(this, count); };

    //  跳过数组中指定数量的元素，然后返回剩余元素构成的新数组；该函数定义如下参数：
    //      array: 源数据数组；
    //      count: 返回剩余元素前要跳过的元素数量，必须是一个非负整数；该参数可选；如果不传入该参数或传入的值为负数，则默认为 0。
    coreArray.skip = function (array, count) {
        array = coreArray.likeArray(array) ? array : [];
        if (!coreUtil.isNumeric(count) || count < 0) { count = 0; }
        var temps = [];
        for (var i = count; i < array.length; i++) { temps.push(array[i]); }
        return temps;
    };
    coreArray.prototype.skip = function (count) { return coreArray.skip(this, count); };

    // 为数组中的每个元素执行指定操作；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback:   必需。 一个接受最多三个参数的函数。 对于数组中的每个元素， forEach 都会调用 callbackfn 函数一次。
    //          该函数语法如：function callbackfn(value, index, array)；
    //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
    //  返回值：返回传入的参数 array 本身。
    //  备注：对于数组中的每个元素， forEach 方法都会调用 callbackfn 函数一次（采用升序索引顺序）。
    //      如果需要退出 each 循环可使回调函数返回 false，其它返回值将被忽略。
    //      除了数组对象之外， forEach 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679980(v=vs.94).aspx
    coreArray.forEach = function (array, callback, thisArg) {
        var isArray = coreArray.likeArray(array), temps = isArray ? array : [], i = 0, length = temps.length;
        if (temps.length == 0) { return; }
        if (!coreUtil.isFunction(callback)) { throw "传入的参数 callback 不是一个函数。"; }
        if (isArray) {
            for (; i < length; i++) { if (callback.call(thisArg, temps[i], i, temps) == false) { break; } }
        } else {
            for (i in temps) { if (callback.call(thisArg, temps[i], i, temps) == false) { break; } }
        }
        return array;
    };
    coreArray.prototype.forEach = function (callback, thisArg) { return coreArray.forEach(this, callback, thisArg); };

    //  对数组中的所有元素调用指定的回调函数。 该回调函数的返回值为累积结果，并且此返回值在下一次调用该回调函数时作为参数提供；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback:   必需。 一个接受最多四个参数的函数。 对于数组中的每个元素， reduce 方法都会调用 callbackfn 函数一次。
    //          该回调函数语法如：function callbackfn(previousValue, currentValue, currentIndex, array)
    //      initialValue:可选。 如果指定 initialValue，则它将用作初始值来启动累积。 第一次调用 callbackfn 函数会将此值作为参数而非数组值提供。
    //  返回值：通过最后一次调用回调函数获得的累积结果。
    //  异常：当满足下列任一条件时，将引发 TypeError 异常：
    //      1、callbackfn 参数不是函数对象。
    //      2、数组不包含元素，且未提供 initialValue。
    //  备注：如果提供了 initialValue，则 reduce 方法会对数组中的每个元素调用一次 callbackfn 函数（按升序索引顺序）。
    //      如果未提供 initialValue，则 reduce 方法会对从第二个元素开始的每个元素调用 callbackfn 函数。
    //      回调函数的返回值在下一次调用回调函数时作为 previousValue 参数提供。 最后一次调用回调函数获得的返回值为 reduce 方法的返回值。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679975(v=vs.94).aspx
    coreArray.reduce = function (array, callback, initialValue) {
        if (!coreUtil.isFunction(callback)) { throw "传入的参数 callback 不是一个函数。"; }
        array = coreArray.likeArray(array) ? array : [];
        if (array.length == 0 && (initialValue === undefined)) { throw "数组不包含元素，且未提供 initialValue。"; }
        var index = 0;
        if (initialValue === undefined) { initialValue = array[0]; index = 1; }
        for (var i = index; i < array.length; i++) {
            initialValue = callback.call(this, initialValue, array[i], i, array);
        }
        return initialValue;
    };
    coreArray.prototype.reduce = function (callback, initialValue) { return coreArray.reduce(this, callback, initialValue); };

    //  按降序顺序对数组中的所有元素调用指定的回调函数。 该回调函数的返回值为累积结果，并且此返回值在下一次调用该回调函数时作为参数提供；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback:   必需。 一个接受最多四个参数的函数。 对于数组中的每个元素， reduce 方法都会调用 callbackfn 函数一次。
    //          该回调函数语法如：function callbackfn(previousValue, currentValue, currentIndex, array)
    //      initialValue:可选。 如果指定 initialValue，则它将用作初始值来启动累积。 第一次调用 callbackfn 函数会将此值作为参数而非数组值提供。
    //  返回值：通过最后一次调用回调函数获得的累积结果。
    //  异常：当满足下列任一条件时，将引发 TypeError 异常：
    //      1、callbackfn 参数不是函数对象。
    //      2、数组不包含元素，且未提供 initialValue。
    //  备注：如果提供了 initialValue，则 reduceRight 方法会按降序索引顺序对数组中的每个元素调用一次 callbackfn 函数。
    //      如果未提供 initialValue，则 reduceRight 方法会按降序索引顺序对每个元素（从倒数第二个元素开始）调用 callbackfn 函数。
    //      回调函数的返回值在下一次调用回调函数时作为 previousValue 参数提供。 最后一次调用回调函数获得的返回值为 reduceRight 方法的返回值。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679979(v=vs.94).aspx
    coreArray.reduceRight = function (array, callback, initialValue) {
        if (!coreUtil.isFunction(callback)) { throw "传入的参数 callback 不是一个函数。"; }
        array = coreArray.likeArray(array) ? array : [];
        if (array.length == 0 && (initialValue === undefined)) { throw "数组不包含元素，且未提供 initialValue。"; }
        var index = array.length - 1;
        if (initialValue === undefined) { initialValue = array[array.length - 1]; index = array.length - 2; }
        for (var i = index; i > -1; i--) {
            initialValue = callback.call(this, initialValue, array[i], i, array);
        }
        return initialValue;
    };
    coreArray.prototype.reduceRight = function (callback, initialValue) { return coreArray.reduceRight(this, callback, initialValue); };

    //  确定数组的所有成员是否满足指定的测试；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback:   必需。 一个接受最多三个参数的函数。 every 方法会为 array1 中的每个元素调用 callbackfn 函数，直到 callbackfn 返回 false，或直到到达数组的结尾。
    //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
    //  返回值：如果 callbackfn 函数为所有数组元素返回 true，则为 true；否则为 false。 如果数组没有元素，则 every 方法将返回 true。
    //  备注：除了数组对象之外， every 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679981(v=vs.94).aspx
    coreArray.every = function (array, callback, thisArg) {
        array = coreArray.likeArray(array) ? array : [];
        if (array.length == 0) { return true; }
        if (!coreUtil.isFunction(callback)) { throw "传入的参数 callback 不是一个函数。"; }
        for (var i = 0; i < array.length; i++) {
            if (callback.call(thisArg, array[i], i, array) == false) { return false; }
        }
        return true;
    };
    coreArray.prototype.every = function (callback, thisArg) { return coreArray.every(this, callback, thisArg); };

    //  确定指定的回调函数是否为数组中的任何元素均返回 true；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback:   必需。 一个接受最多三个参数的函数。 some 方法会为 array1 中的每个元素调用 callbackfn 函数，直到 callbackfn 返回 true，或直到到达数组的结尾。
    //          该函数语法如：function callbackfn(value, index, array1)
    //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
    //  返回值：如果 callbackfn 函数为任何数组元素均返回 true，则为 true；否则为 false。
    //  异常：如果 callbackfn 参数不是函数对象，则将引发 TypeError 异常。
    //  备注：some 方法会按升序索引顺序对每个数组元素调用 callbackfn 函数，直到 callbackfn 函数返回 true。 如果找到导致 callbackfn 返回 true 的元素，则 some 方法会立即返回 true。 如果回调不对任何元素返回 true，则 some 方法会返回 false。
    //      除了数组对象之外， some 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679978(v=vs.94).aspx
    coreArray.some = function (array, callback, thisArg) {
        array = coreArray.likeArray(array) ? array : [];
        if (!coreUtil.isFunction(callback)) { throw "传入的参数 callback 不是一个函数。"; }
        for (var i = 0; i < array.length; i++) {
            if (callback.call(thisArg, array[i], i, array) == true) { return true; }
        }
        return false;
    };
    coreArray.prototype.some = function (callback, thisArg) { return coreArray.some(this, callback, thisArg); };

    //  查找指定数组中第一个符合条件判定的项会将其返回；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback:   可选。 一个接受最多三个参数的函数。 first 方法会为 array 中的每个元素调用 callbackfn 函数，直到 callbackfn 返回 true，或直到到达数组的结尾。
    //          该函数语法如：function callbackfn(value, index, array1)
    //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
    //  返回值：如果定义了参数 callbackfn ，返回 array 中第一个导致回调函数 callback 返回 true 的项目；
    //      如果未定义参数 callback，则返回 array 中的第一个元素；
    //      如果数组 array 不包含任何元素，或者 callback 回调函数遍历完 array 中所有元素后始终未返回 true 值，则 first 方法返回 null。
    //  备注：first 方法会按升序索引顺序对每个数组元素调用 callbackfn 函数，直到 callbackfn 函数返回 true。 如果找到导致 callbackfn 返回 true 的元素，则 first 方法会立即返回该元素。 如果回调不对任何元素返回 true，则 first 方法会返回 null。
    //      除了数组对象之外， first 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
    coreArray.first = function (array, callback, thisArg) {
        array = coreArray.likeArray(array) ? array : [];
        if (!coreUtil.isFunction(callback)) { return array.length ? array[0] : null; }
        for (var i = 0; i < array.length; i++) {
            if (callback.call(thisArg, array[i], i, array) == true) { return array[i]; }
        }
        return null;
    };
    coreArray.prototype.first = function (callback, thisArg) { return coreArray.first(this, callback, thisArg); };

    //  查找指定数组中最后一个符合条件判定的项会将其返回；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback:   可选。 一个接受最多三个参数的函数。 last 方法会从 array 的结束位置其为它的每个元素调用 callbackfn 函数，直到 callbackfn 返回 true，或直到到达数组的起始位置。
    //          该函数语法如：function callbackfn(value, index, array1)
    //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
    //  返回值：如果定义了参数 callbackfn ，返回 array 中最后一个导致回调函数 callback 返回 true 的项目；
    //      如果未定义参数 callback，则返回 array 中的最后一个元素；
    //      如果数组 array 不包含任何元素，或者 callback 回调函数遍历完 array 中所有元素后始终未返回 true 值，则 last 方法返回 null。
    //  备注：last 方法会按降序索引顺序对每个数组元素调用 callbackfn 函数，直到 callbackfn 函数返回 true。 如果找到导致 callbackfn 返回 true 的元素，则 last 方法会立即返回该元素。 如果回调不对任何元素返回 true，则 last 方法会返回 null。
    //      除了数组对象之外， last 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
    coreArray.last = function (array, callback, thisArg) {
        array = coreArray.likeArray(array) ? array : [];
        if (!coreUtil.isFunction(callback)) { return array.length ? array[array.length - 1] : null; }
        for (var i = array.length - 1; i >= 0; i--) {
            if (callback.call(thisArg, array[i], i, array) == true) { return array[i]; }
        }
        return null;
    };
    coreArray.prototype.last = function (callback, thisArg) { return coreArray.last(this, callback, thisArg); };

    //  对数组的元素进行排序；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback: 比较函数，该函数被循环调用，用于比较 array 中没两项的大小；这是一个可选参数；
    //          该函数的签名为 function (a, b) { }，参数 a、b 分别表示源数组中的待比较大小的项；该函数必须返回一个数值表示比较后的结果；
    //              如果 a > b ，则返回一个 大于 0 的值；
    //              如果 a < b ，则返回一个 小于 0 的值；
    //              如果 a == b，则返回 0；
    //  返回值：返回排序处理后的数组对象本身。
    //  备注：如果调用该方法时没有使用参数，将按字母顺序对数组中的元素进行排序，说得更精确点，是按照字符编码的顺序进行排序。
    //      要实现这一点，首先应把数组的元素都转换成字符串（如有必要），以便进行比较。
    //      如果想按照其他标准进行排序，就需要提供比较函数，该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。
    //  注意：该方法会改变现有的数组。
    coreArray.sort = function (array, callback) {
        var temps = coreArray.likeArray(array) ? array : [];
        core_sort.call(temps, callback);
        return array;
    }
    coreArray.prototype.sort = function (callback) { return coreArray.sort(this, callback); };

    //  获取指定数组的前 N 项元素所构成的一个新数组；该函数定义如下参数：
    //      array:  必需。 一个数组对象。
    //      length: 必须。 一个 Number 类型值，表示要获取的项的数量；
    //  返回值：返回指定的数组对象 array 的前面长度为 length 的元素所构成的一个新的数组。
    //      如果 length 的值为 0，则返回一个空数组；
    //      如果 length 的值大于 array.length，则返回 array 的一个副本；
    coreArray.left = function (array, length) {
        array = coreArray.likeArray(array) ? array : [];
        if (!length || !$.isNumeric(length) || length < 0) { return []; }
        if (length > array.length) { return coreArray.clone(array); }
        return coreArray.range(array, 0, length);
    };
    coreArray.prototype.left = function (length) { return coreArray.left(this, length); };

    //  获取指定数组的后 N 项元素所构成的一个新数组；该函数定义如下参数：
    //      array:  必需。 一个数组对象。
    //      length: 必须。 一个 Number 类型值，表示要获取的项的数量；
    //  返回值：返回指定的数组对象 array 的后面长度为 length 的元素所构成的一个新的数组。
    //      如果 length 的值为 0，则返回一个空数组；
    //      如果 length 的值大于 array.length，则返回 array 的一个副本；
    coreArray.right = function (array, length) {
        array = coreArray.likeArray(array) ? array : [];
        if (!length || !$.isNumeric(length) || length < 0) { return []; }
        if (length > array.length) { return coreArray.clone(array); }
        return coreArray.range(array, array.length + 1 - length);
    };
    coreArray.prototype.right = function (length) { return coreArray.right(this, length); };








    /////////////////////////////////////////////////////////////////////////////////////////////// 
    //  javascript 的日期函数功能扩充。
    /////////////////////////////////////////////////////////////////////////////////////////////// 

    //  判断指定的对象是否为合法的日期(Date)格式对象；传入的参数可以为日期格式字符串。
    coreDate.isDate = function (date) { return coreUtil.isDate(date) || coreString.isDate(date); };

    //  判断指定的日期字符串是否是合法的长日期格式；
    //  该函数依赖于 coreString.isLongDate 函数。
    coreDate.isLongDate = function (date) { return coreString.isLongDate(date); };

    //  判断指定的日期字符串是否是合法的短日期格式；
    //  该函数依赖于 coreString.isShortDate 函数。
    coreDate.isShortDate = function (date) { return coreString.isShortDate(date); };

    //  判断指定的日期是否为闰年；该函数定义如下参数：
    //      date: 可以是一个 日期(Date) 对象，也可以是表示日期的字符串，或者是一个表示年份的数字。
    //  返回值：如果指定的日期是闰年，则返回 true，否则返回 false。
    coreDate.isLeapYear = function (date) {
        var y = 0;
        if (coreDate.isDate(date)) {
            y = new Date(date).getYear();
        } else if (window.isNumeric(date)) {
            y = date;
        } else {
            throw "传入的参数 date 的数据类型必须为 Date、String 或者 Number。";
        }
        var b = false;
        if (y >= 0) {
            b = (y % 4 == 0 && y % 100 != 0) || (y % 400 == 0);
        } else {
            b = (y % 4 == 1 && y % 100 != 0) || (y % 400 == 1);
        }
        return b;
    };
    coreDate.prototype.isLeapYear = function () { return coreDate.isLeapYear(this); };

    //  创建一个新的 日期(Date) 对象，返回的值与当前 日期对象 的值相同；
    coreDate.clone = function (date) {
        var d = 0;
        if (coreDate.isDate(date)) {
            d = new Date(date).getTime();
        } else if (window.isNumeric(date)) {
            d = date;
        } else {
            throw "传入的参数 date 的数据类型必须为 Date、String 或者 Number。";
        }
        return new Date(d);
    };
    coreDate.prototype.clone = function () { return coreDate.clone(this); };

    //  比较两个日期对象的大小；该函数定义如下参数：
    //      date1: 第 1 个待比较的日期对象；
    //      date2: 第 2 个待比较的日期对象；
    //  返回值：如果 date1 > date2，则返回一个大于 0 的值；
    //      如果 date1 < date2，则返回一个小于 0 的值；
    //      如果 date1 == date2，则返回 0。
    coreDate.compare = function (date1, date2) {
        date1 = coreUtil.isDate(date1) ? date1 : new Date(date1);
        date2 = coreUtil.isDate(date2) ? date1 : new Date(date2);
        var d1 = date1.getTime();
        var d2 = date2.getTime();
        return coreUtil.compare(d1, d2);
    };
    coreDate.prototype.compareTo = function (date) { return coreDate.compare(this, date); };
    coreDate.prototype.equals = function (date) { return coreDate.compare(this, date) == 0; };

    //  获取指定日期对象当前表示的季度（0 - 3）
    coreDate.getQuarter = function (date) {
        date = coreUtil.isDate(date) ? date : new Date(date);
        var m = date.getMonth();
        var q = 0;
        if (m >= 0 && m < 3) {
            q = 0;
        } else if (m >= 3 && m < 6) {
            q = 1;
        } else if (m >= 6 && m < 9) {
            q = 2;
        } else if (m >= 9 && m < 12) {
            q = 3;
        }
        return q;
    };
    coreDate.prototype.getQuarter = function () { return coreDate.getQuarter(this); };

    //  获取当前日期对象表示所在周的星期几（0 - 6）
    coreDate.getDayOfWeek = function (date) {
        date = coreUtil.isDate(date) ? date : new Date(date);
        return date.getDay();
    };
    coreDate.prototype.getDayOfWeek = function () { return coreDate.getDayOfWeek(this); }

    //  获取当前日期对象所在年的第几周计数。
    coreDate.getWeek = function (date, weekStart) {
        date = coreUtil.isDate(date) ? date : new Date(date);
        weekStart = (weekStart || 0) - 0;
        if (!coreUtil.isNumeric(weekStart) || weekStart > 6) { weekStart = 0; }
        var year = date.getFullYear();
        var firstDay = new Date(year, 0, 1);
        var firstWeekDays = 7 - firstDay.getDay() + weekStart;
        var dayOfYear = (((new Date(year, date.getMonth(), date.getDate())) - firstDay) / (24 * 3600 * 1000)) + 1;
        return Math.ceil((dayOfYear - firstWeekDays) / 7) + 1;
    };
    coreDate.prototype.getWeek = function (weekStart) { return coreDate.getWeek(this, weekStart); };

    //  获取当前日期对象所在月的第几周计数。
    coreDate.getWeekOfMonth = function (date, weekStart) {
        date = coreUtil.isDate(date) ? date : new Date(date);
        weekStart = (weekStart || 0) - 0;
        if (!coreUtil.isNumeric(weekStart) || weekStart > 6) { weekStart = 0; }
        var dayOfWeek = date.getDay();
        var day = date.getDate();
        return Math.ceil((day - dayOfWeek - 1) / 7) + ((dayOfWeek >= weekStart) ? 1 : 0);
    };
    coreDate.prototype.getWeekOfMonth = function (weekStart) { return coreDate.getWeekOfMonth(this, weekStart); };

    //  给指定日期对象添加指定的毫秒数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      millisec: 要添加的毫秒数，可以是一个负数。
    //  返回值：date 添加指定毫秒数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addTime = function (date, millisec) {
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(millisec)) { millisec = Date.parse(millisec); }
        return new Date(d + millisec);
    };
    coreDate.prototype.addTime = function (millisec) { return coreDate.addTime(this, millisec); };

    //  给指定日期对象添加指定的天数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      days: 要添加的天数，可以是一个负数。
    //  返回值：date 添加指定天数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addDays = function (date, days) {
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(days)) { return new Date(d); }
        var millisec = 86400000 * days;
        return new Date(d + millisec);
    };
    coreDate.prototype.addDays = function (days) { return coreDate.addDays(this, days); };

    //  给指定日期对象添加指定的小时数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      hours: 要添加的小时数，可以是一个负数。
    //  返回值：date 添加指定小时数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addHours = function (date, hours) {
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(hours)) { return new Date(d); }
        var millisec = 3600000 * hours;
        return new Date(d + millisec);
    };
    coreDate.prototype.addHours = function (hours) { return coreDate.addHours(this, hours); };

    //  给指定日期对象添加指定的毫秒数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      millisec: 要添加的毫秒数，可以是一个负数。
    //  返回值：date 添加指定毫秒数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addMilliseconds = function (date, millisec) {
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(millisec)) { return new Date(d); }
        return new Date(d + millisec);
    };
    coreDate.prototype.addMilliseconds = function (millisec) { return coreDate.addMilliseconds(this, millisec); };

    //  给指定日期对象添加指定的分钟数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      minutes: 要添加的分钟数，可以是一个负数。
    //  返回值：date 添加指定分钟数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addMinutes = function (date, minutes) {
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(minutes)) { return new Date(d); }
        var millisec = 60000 * minutes;
        return new Date(d + millisec);
    };
    coreDate.prototype.addMinutes = function (minutes) { return coreDate.addMinutes(this, minutes); };

    //  给指定日期对象添加指定的星期周数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      weeks: 要添加的星期周数，可以是一个负数。
    //  返回值：date 添加指定星期周数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addWeeks = function (date, weeks) {
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(weeks)) { return new Date(d); }
        var millisec = 86400000 * 7 * weeks;
        return new Date(d + millisec);
    };
    coreDate.prototype.addWeeks = function (weeks) { return coreDate.addWeeks(this, weeks); };

    //  给指定日期对象添加指定的月数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      months: 要添加的月数，可以是一个负数。
    //  返回值：date 添加指定月数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addMonths = function (date, months) {
        if (!coreUtil.isDate(date)) { date = new Date(date); }
        if (!coreUtil.isNumeric(months)) { months = 0; }
        return new Date(date.getFullYear(), date.getMonth() + months, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    };
    coreDate.prototype.addMonths = function (months) { return coreDate.addMonths(this, months); };

    //  给指定日期对象添加指定的秒数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      seconds: 要添加的秒数，可以是一个负数。
    //  返回值：date 添加指定秒数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addSeconds = function (date, seconds) {
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(seconds)) { return new Date(d); }
        var millisec = 1000 * seconds;
        return new Date(d + millisec);
    };
    coreDate.prototype.addSeconds = function (seconds) { return coreDate.addSeconds(this, seconds); };

    //  给指定日期对象添加指定的百纳秒数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      ticks: 要添加的百纳秒数，可以是一个负数。
    //  返回值：date 添加指定百纳秒数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addTicks = function (date, ticks) {
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(ticks)) { return new Date(d); }
        var millisec = 0.000001 * ticks;
        return new Date(d + millisec);
    };
    coreDate.prototype.addTicks = function (ticks) { return coreDate.addTicks(this, ticks); };

    //  给指定日期对象添加指定的年数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      years: 要添加的年数，可以是一个负数。
    //  返回值：date 添加指定年数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addYears = function (date, years) {
        if (!coreUtil.isDate(date)) { date = new Date(date); }
        if (!coreUtil.isNumeric(years)) { years = 0; }
        return new Date(date.getFullYear() + years, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    };
    coreDate.prototype.addYears = function (years) { return coreDate.addYears(this, years); };

    //  给指定日期对象添加指定的季度数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      quarters: 要添加的季度数，可以是一个负数。
    //  返回值：date 添加指定季度数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addQuarters = function (date, quarters) {
        if (!coreUtil.isDate(date)) { date = new Date(date); }
        if (!coreUtil.isNumeric(quarters)) { quarters = 0; }
        return new Date(date.getFullYear(), date.getMonth() + quarters * 3, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    };
    coreDate.prototype.addQuarters = function (quarters) { return coreDate.addQuarters(this, quarters); };

    //  给指定日期对象添加指定日期部分的指定数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      datepart: 指定的日期部分，字符串格式，可选的值限定为：
    //          yy 或 yyyy:  表示年；
    //          qq 或 q:     表示季度；
    //          mm 或 m:     表示月；
    //          dd 或 d:     表示日(天)；
    //          wk 或 ww:    表示周；
    //          hh:          表示小时；
    //          mi 或 n:     表示分钟；
    //          ss 或 s:     表示秒；
    //          ms:          表示毫秒；
    //      number: 要添加的指定日期部分的指定数量，可以是一个负数；
    //  返回值：date 添加指定日期部分的指定数后的一个新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.add = function (date, datepart, number) {
        if (!coreUtil.isString(datepart)) { return date; }
        if (!coreUtil.isNumeric(number)) { return date; }
        datepart = datepart.toLowerCase();
        var d = null;
        switch (datepart) {
            case "yy":
            case "yyyy":
                d = coreDate.addYears(date, number);
                break;
            case "qq":
            case "q":
                d = coreDate.addQuarters(date, number);
                break;
            case "mm":
            case "m":
                d = coreDate.addMonths(date, number);
                break;
            case "dd":
            case "d":
                d = coreDate.addDays(date, number);
                break;
            case "wk":
            case "ww":
                d = coreDate.addWeeks(date, number);
                break;
            case "hh":
                d = coreDate.addHours(date, number);
                break;
            case "mi":
            case "n":
                d = coreDate.addMinutes(date, number);
                break;
            case "ss":
            case "s":
                d = coreDate.addSeconds(date, number);
                break;
            case "ms":
                d = coreDate.addMilliseconds(date, number);
                break;
            default:
                throw "传入的参数 datepart 为不可识别的值。";
                break;
        }
        return d;
    };
    coreDate.prototype.add = function (datepart, number) { return coreDate.add(this, datepart, number); };

    //  比较两个日期对象指定部分的差，并返回比较结果；该函数定义如下参数：
    //      date: 源日期对象；
    //      datepart: 指定的日期部分，字符串格式，可选的值限定为：
    //          yy 或 yyyy:  表示年；
    //          qq 或 q:     表示季度；
    //          mm 或 m:     表示月；
    //          dd 或 d:     表示日(天)；
    //          wk 或 ww:    表示周；
    //          hh:          表示小时；
    //          mi 或 n:     表示分钟；
    //          ss 或 s:     表示秒；
    //          ms:          表示毫秒；
    //      value: 要比较的日期对象；
    //  返回值：返回 date 日期对象 和 value 日期对象 指定部分的数值的差。
    coreDate.diff = function (date, datepart, value) {
        if (!coreUtil.isString(datepart)) { return null; }
        value = coreUtil.isDate(value) ? value : new Date(value);
        datepart = datepart.toLowerCase();
        var d = null;
        switch (datepart) {
            case "yy":
            case "yyyy":
                d = value.getFullYear() - date.getFullYear();
                break;
            case "qq":
            case "q":
                var quarter = coreDate.getQuarter(value);
                d = quarter + ((value.getFullYear() - date.getFullYear()) * 3) - quarter;
                break;
            case "mm":
            case "m":
                d = (value.getMonth() + 1) + ((value.getFullYear() - date.getFullYear()) * 12) - (date.getMonth() + 1);
                break;
            case "dd":
            case "d":
                d = parseInt((value - date) / 86400000);
                break;
            case "wk":
            case "ww":
                d = parseInt((value - date) / (86400000 * 7));
                break;
            case "hh":
                d = parseInt((value - date) / 3600000);
                break;
            case "mi":
            case "n":
                d = parseInt((value - date) / 60000);
                break;
            case "ss":
            case "s":
                d = parseInt((value - date) / 1000);
                break;
            case "ms":
                d = value - date;
                break;
            default:
                throw "传入的参数 datepart 为不可识别的值。";
                break;
        }
        return d;
    };
    coreDate.prototype.diff = function (datepart, value) { return coreDate.diff(this, datepart, value); };

    //  返回指定日期对象的指定部分的值；该函数定义如下参数：
    //      date: 源日期对象；
    //      datepart: 指定的日期部分，字符串格式，可选的值限定为：
    //          yy 或 yyyy:  表示年；
    //          qq 或 q:     表示季度；
    //          mm 或 m:     表示月；
    //          dd 或 d:     表示日(天)；
    //          wk 或 ww:    表示周；
    //          hh:          表示小时；
    //          mi 或 n:     表示分钟；
    //          ss 或 s:     表示秒；
    //          ms:          表示毫秒；
    //  返回值：返回指定日期对象的指定部分的值；
    coreDate.part = function (date, datepart) {
        if (!coreUtil.isString(datepart)) { return null; }
        date = coreUtil.isDate(date) ? date : new Date(date);
        datepart = datepart.toLowerCase();
        var d = null;
        switch (datepart) {
            case "yy":
            case "yyyy":
                d = date.getFullYear();
                break;
            case "qq":
            case "q":
                d = coreDate.getQuarter(date);
                break;
            case "mm":
            case "m":
                d = date.getMonth();
                break;
            case "dd":
            case "d":
                d = date.getDate();
                break;
            case "wk":
            case "ww":
                d = date.getWeek();
                break;
            case "hh":
                d = date.getHours();
                break;
            case "mi":
            case "n":
                d = date.getMinutes();
                break;
            case "ss":
            case "s":
                d = date.getSeconds();
                break;
            case "ms":
                d = date.getMilliseconds();
                break;
            default:
                throw "传入的参数 datepart 为不可识别的值。";
                break;
        }
        return d;
    };
    coreDate.prototype.part = function (datepart) { return coreDate.part(this, datepart); };

    //  返回当前日期对象的格式化字符值；该函数定义如下参数：
    //      date:   要进行格式化的日期对象
    //      format: 返回字符串格式定义
    coreDate.format = function (date, format) {
        if (!coreUtil.isDate(date)) { return null; };
        format = coreString.isNullOrWhiteSpace(format) ? format : "yyyy-MM-dd";
        switch (typeof date) {
            case "string":
                date = new Date(date.replace(/-/, "/"));
                break;
            case "number":
                date = new Date(date);
                break;
        }
        var dict = {
            "yyyy": date.getFullYear(),
            "M": date.getMonth() + 1,
            "d": date.getDate(),
            "H": date.getHours(),
            "m": date.getMinutes(),
            "s": date.getSeconds(),
            "MM": ("" + (date.getMonth() + 101)).substr(1),
            "dd": ("" + (date.getDate() + 100)).substr(1),
            "HH": ("" + (date.getHours() + 100)).substr(1),
            "mm": ("" + (date.getMinutes() + 100)).substr(1),
            "ss": ("" + (date.getSeconds() + 100)).substr(1)
        };
        return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
            return dict[arguments[0]];
        });
    };
    coreDate.prototype.format = function (format) { return coreDate.format(this, format); };

    //  获取当前日期时间的长字符串格式，返回的日期时间字符串格式如 “2013年05月16日 星期四 夏季, 下午 15:38:11”
    coreDate.toLongDateTimeString = function (date) {
        date = coreUtil.isDate(date) ? date : new Date(date);
        var year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            week = date.getDay(),
            quarter = coreDate.getQuarter(date),
            hoursArray = ["午夜", "凌晨", "早上", "上午", "中午", "下午", "傍晚", "晚上"],
            weekArray = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            quarterArray = ["春", "夏", "秋", "冬"],
            hourSpan = hoursArray[Math.floor(parseFloat(hours) / 3)],
            weekSpan = weekArray[week],
            monthSpan = monthArray[month],
            quarterSpan = quarterArray[quarter];
        return coreString.format(
            "{0}年{1}月{2}日 {3}  {5} {6}:{7}:{8}",
            year,
            ("" + (month + 101)).substr(1),
            ("" + (day + 100)).substr(1),
            weekSpan,
            quarterSpan,
            hourSpan,
            ("" + (hours + 100)).substr(1),
            ("" + (minutes + 100)).substr(1),
            ("" + (seconds + 100)).substr(1));
    };
    coreDate.prototype.toLongDateTimeString = function () { return coreDate.toLongDateTimeString(this); };





    var _html5ValidateCache = {};
    //  测试指定的 html 标签是否具备相应的属性；该函数定义如下参数：
    //      propName:   待测试的属性名；
    //      tagName:    被测试的 html 标签名。
    //  返回值：如果指定的标签名(tagName)所表示的 html 标签具备相应的属性名 propName，则返回 true，否则返回 false。
    coreHtml5.testProp = function (propName, tagName) {
        propName = coreString.trim(propName);
        tagName = coreString.trim(tagName);
        if (propName) { propName = propName.toLowerCase(); }
        if (tagName) { tagName = tagName.toLowerCase(); }
        var tag = _html5ValidateCache[tagName];
        if (!tag) { _html5ValidateCache[tagName] = tag = document.createElement(tagName); }
        return propName in tag ? true : false;
    };



    //  判断指定的对象是否为一个 HTML-DOM 对象；该函数定义如下参数：
    //      obj：    要判断的对象；
    //      doc：    该参数可选；表示 obj 所在页面的 document；如果不定义该参数，则默认使用当前页面的 document；
    //  返回值：如果 obj 是一个 HTML-DOM 对象且存在于指定的 document 中，则返回 true；否则返回 false。
    coreUtil.isDOM = function (obj, doc) {
        if (!obj) { return false; }
        doc = doc || document;
        return obj.nodeName && obj.nodeType == 1 && obj.ownerDocument == doc;
    };



    //  该属性表示是否启用浏览器自动给所有 DOM 元素增加唯一标识符的功能。
    var _enableUniqueID = false;
    //  该属性表示浏览器自动给所有 DOM 元素增加的唯一标识符的名称。
    coreUtil.uniqueIdName = "uniqueID";

    //  获取 HTML DOM 对象的 GUID 值；该函数定义如下参数：
    //      element:    必须，表示需要获取 uniqueID 属性的 DOM 对象；
    //  返回值：返回 element 元素的 uniqueID 值；如果该元素未定义该值，则返回 undefined。
    coreUtil.getElementUniqueID = function (element) {
        return element != undefined && element != null && element.getAttribute ? element.getAttribute(coreUtil.uniqueIdName) : null;
    };

    //  判断 HTML DOM 对象是否具有 uniqueID 属性；该函数定义如下参数：
    //      element:    必须，表示需要判断是否具有 uniqueID 属性的 DOM 对象。
    //  返回值：如果 element 元素具有 uniqueID 属性，则返回 true，否则返回 false。
    coreUtil.hasUniqueID = function (element) {
        return !coreString.isNullOrWhiteSpace(coreUtil.getElementUniqueID(element));
    };

    //  给 HTML DOM 对象设置一个新的 uniqueID 值；该函数定义如下参数：
    //      element:    必须，表示需要设置 uniqueID 属性的 DOM 对象；
    //      uniqueID:   可选，表示要给 element 元素设置的 uniqueID 值；如果不定义该值，则会调用 coreUtil.guid 方法自动生成一个 uniqueID 值。
    coreUtil.setElementUniqueID = function (element, uniqueID) {
        if (element == undefined || element == null || !element.setAttribute) { return; }
        var nodeName = (element.nodeName || coreUtil.uniqueIdName) + "_";
        uniqueID = coreString.isNullOrWhiteSpace(uniqueID) ? nodeName + coreUtil.guid("N") : uniqueID;
        element.setAttribute(coreUtil.uniqueIdName, uniqueID, 0);
    };

    //  初始化 HTML DOM 对象的 uniqueID 值；该函数定义如下参数：
    //      element:    必须，表示需要初始化 uniqueID 属性的 DOM 对象；
    //  备注：该方法判断 element 元素是否具有 uniqueID 属性值，如果有则不进行任何更改；如果没有则为期设置一个新的 uniqueID 值。
    coreUtil.initElementUniqueID = function (element) {
        if (!coreUtil.hasUniqueID(element)) { coreUtil.setElementUniqueID(element) }
    };

    coreUtil._createElement = document.createElement;
    coreUtil._createDocumentFragment = document.createDocumentFragment;

    //  重写 document.createElement 方法，使之在创建 dom 对象的同时还给对象添加一个唯一标识符 uniqueID。
    coreUtil.createElement = function () {
        var element = coreUtil._createElement.apply(this, arguments);
        if (!_enableUniqueID) { return element; }
        coreUtil.initElementUniqueID(element);
        return element;
    };

    //  重写 document.createDocumentFragment 方法，使之在创建文档碎片并向文档碎片添加子节点时向子节点添加一个唯一标识符 uniqueID。
    coreUtil.createDocumentFragment = function () {
        var documentFragment = coreUtil._createDocumentFragment.apply(this, arguments);
        if (!_enableUniqueID) { return documentFragment; }
        var appendChild = documentFragment.appendChild;
        documentFragment.appendChild = function (child) {
            $("*", child).add(child).each(function () { coreUtil.initElementUniqueID(this); });
            return appendChild.apply(this, arguments);
        };
        return documentFragment;
    };

    //  启用或者禁用浏览器自动给 DOM 元素设置全局唯一标识符功能；该函数定义如下参数：
    //      enableUniqueID；必须，布尔类型值，表示启用或禁用该功能；
    coreUtil.setEnableUniqueID = function (enableUniqueID) {
        enableUniqueID = coreUtil.isBoolean(enableUniqueID) ? enableUniqueID : false;
        _enableUniqueID = enableUniqueID;
        if (enableUniqueID) {
            document.createElement = coreUtil.createElement;
            document.createDocumentFragment = coreUtil.createDocumentFragment;
            $("*").each(function () { coreUtil.initElementUniqueID(this); });
        } else {
            document.createElement = coreUtil._createElement;
            document.createDocumentFragment = coreUtil._createDocumentFragment;
        }
    };

    //  启用浏览器自动给 DOM 元素设置全局唯一标识符功能；
    coreUtil.enableUniqueID = function () { coreUtil.setEnableUniqueID(true); };

    //  禁用浏览器自动给 DOM 元素设置全局唯一标识符功能；
    coreUtil.disableUniqueID = function () { coreUtil.setEnableUniqueID(false); };

    //  获取浏览器是否启用了自动给 DOM 元素设置全局唯一标识符功能；
    coreUtil.getEnableUniqueID = function () { return _enableUniqueID; };



    //  判断指定的 window 对象是否具有可访问的父级页面；
    //  返回值：返回一个 Boolean 值；
    //      当前页面在一个 FRAME/IFRAME 中且父级页面和当前页面同域，则返回 true；
    //      当前页面不是在一个 FRAME/IFRAME 中或父级页面和当前页面不同域，则返回 false。
    coreUtil.hasParentWindow = function (win) {
        var ret = false;
        try {
            var p = win.parent;
            ret = p && coreUtil.isWindow(p) && coreUtil.isObject(p.document) ? true : false;
        } catch (ex) { }
        return ret;
    };
    //  获取当前页面的可访问(同域)的顶级页面；
    //  返回值：返回一个 window 对象；
    coreUtil.getTop = function () {
        var w = window;
        while (coreUtil.hasParentWindow(w) && w != w.parent) { w = w.parent; }
        return w;
    };
    //  获取当前页面的可访问(同域)的父级页面；
    //  返回值：返回一个 window 对象；
    coreUtil.getParent = function () {
        var w = window;
        if (coreUtil.hasParentWindow(w) && w != w.parent) { w = w.parent; }
        return w;
    };

    //  获取当前页面所在父级页面的 window 对象；如果父级页面不可访问，则返回当前页面的 window 对象；
    //  如果当前页面为顶级页面或当前页面的父级页面和当前页面不在同一个域下，则返回当前页面的 window 对象。
    parent = coreUtil.parent = coreUtil.getParent();

    //  获取当前页面所在顶级页面的 window 对象；如果顶级页面不可访问，则返回次级页面的 window 对象；以此类推。
    //  如果当前页面为顶级页面或当前页面的父级页面和当前页面不在同一个域下，则返回当前页面的 window 对象。
    top = coreUtil.top = coreUtil.getTop();

    //  判断当前浏览器窗口是否为顶级窗口。
    coreUtil.isTopMost = coreUtil.isTop = (window == window.top);

    coreUtil.hasParentJquery = function (win) {
        var ret = false;
        try {
            var p = win.parent;
            ret = p && coreUtil.isWindow(p) && coreUtil.isObject(p.document) && coreUtil.isFunction(p.jQuery) ? true : false;
        } catch (ex) { }
        return ret;
    };
    coreUtil.getTopJquery = function () {
        if (coreUtil.isTopMost) { return $; }
        var w = window;
        while (coreUtil.hasParentJquery(w) && w != w.parent) { w = w.parent; }
        return w.jQuery;
    };
    var topJquery = coreUtil.isTopMost ? $ : coreUtil.getTopJquery();

    //  获取当前页面所在顶级窗口的 jQuery 对象；如果顶级窗口不存在 jQuery 对象或者 jQuery 对象无法访问(例如跨域情况下) 则返回次级 jQuery 对象；以此类推；
    coreUtil.$ = coreUtil.jQuery = coreUtil.topJquery = topJquery;

    //  获取包含当前页面的 iframe 对象。
    //  如果当前页面为顶级页面或当前页面的父级页面和当前页面不在同一个域下，则返回 null。
    coreUtil.currentFrame = null;

    //  获取包含当前页面的 iframe 对象的 id。
    //  如果当前页面为顶级页面或当前页面的父级页面和当前页面不在同一个域下，则返回 null。
    coreUtil.currentFrameId = null;

    //  获取包含当前页面的 iframe 对象的 uniqueID。
    //  如果当前页面为顶级页面或当前页面的父级页面和当前页面不在同一个域下，则返回 null。
    coreUtil.currentFrameUniqueID = null;
    coreUtil.getCurrentFrame = function () {
        if (coreUtil.isTopMost) { return null; }
        var result = null;
        var frames = coreArray.merge([], top.document.getElementsByTagName("iframe"), top.document.getElementsByTagName("frame"));
        var find = function (frame) {
            var win = frame.contentWindow;
            if (win === window) { return frame; }
            try {
                if (!win || !coreUtil.isObject(win.document)) { return null; }
                var fs = coreArray.merge([], win.document.getElementsByTagName("iframe"), win.document.getElementsByTagName("frame"));
                $.each(fs, function () { result = find(this); return result == null; });
            } catch (ex) { }
            return result;
        };
        $.each(frames, function () { result = find(this); return result == null; });
        return result;
    };
    if (!coreUtil.isTopMost) { coreUtil.currentFrame = coreUtil.getCurrentFrame(); }
    if (coreUtil.currentFrame != null) { coreUtil.currentFrameId = coreUtil.currentFrame.id; }
    if (coreUtil.currentFrame != null) { coreUtil.currentFrameUniqueID = coreUtil.getElementUniqueID(coreUtil.currentFrame); }

    //  获取当前焦点对象；
    coreUtil.getActiveElement = function () { return $(document.activeElement); };

    //  获取或设置当前 window 窗体的大小；
    coreUtil.windowSize = function () {
        var length = arguments.length, arg1, arg2, arg1Type, arg2Type,
            getSize = function () {
                var win = $(window);
                return { width: window.innerWidth ? window.innerWidth : win.width(), height: window.innerHeight ? window.innerHeight : win.height() };
            },
            size = getSize();
        if (length == 0) { return size; }
        arg1 = arguments[0];
        arg1Type = coreUtil.type(arg1);
        if (length == 1) {
            arg1 = arguments[0];
            if (arg1Type == "string") { return size[arg1]; }
            if (coreUtil.isPlainObject(arg1) || arg1Type == "function") { coreUtil.windowSize(arg1.width || size.width, arg1.height || size.height); }
        }
        if (length >= 2) {
            arg2 = arguments[1];
            arg2Type = coreUtil.type(arg2);
            if (arg1Type == "string" && arg2Type == "number") {
                var newSize = $.extend({}, size);
                newSize[arg1] = arg2;
                if (size.width != newSize.width || size.height != newSize.height) { window.resizeTo(newSize.width, newSize.height); }
            }
            if (arg1Type == "number" && arg2Type == "number") { window.resizeTo(arg1, arg2); }
        }
    };

    //  获取或设置当前 window 窗体的位置；
    coreUtil.windowOffset = function () {
        var length = arguments.length, arg1, arg2, arg1Type, arg2Type,
            getOffset = function () { return { left: window.screenLeft || window.screenX, top: window.screenTop || window.screenY }; },
            offset = getOffset();
        if (length == 0) { return offset; }
        arg1 = arguments[0];
        arg1Type = coreUtil.type(arg1);
        if (length == 1) {
            arg1 = arguments[0];
            if (arg1Type == "string") { return offset[arg1]; }
            if (coreUtil.isPlainObject(arg1) || arg1Type == "function") { coreUtil.windowOffset(arg1.left || offset.left, arg1.top || offset.top); }
        }
        if (length >= 2) {
            arg2 = arguments[1];
            arg2Type = coreUtil.type(arg2);
            if (arg1Type == "string" && arg2Type == "number") {
                var newOffset = $.extend({}, offset);
                newOffset[arg1] = arg2;
                if (offset.left != newOffset.left || offset.top != newOffset.top) { window.moveTo(newSize.left, newSize.top); }
            }
            if (arg1Type == "number" && arg2Type == "number") { window.moveTo(arg1, arg2); }
        }
    };

    //  获取或设置当前 window 窗体的大小和位置；
    coreUtil.windowPosition = function () {
        var length = arguments.length, arg1, arg2, arg3, arg4, arg1Type, arg2Type,
            getPosition = function () { return $.extend(coreUtil.windowSize(), coreUtil.windowOffset()); },
            position = getPosition();
        if (length == 0) { return position; }
        arg1 = arguments[0];
        arg1Type = coreUtil.type(arg1);
        if (length == 1) {
            arg1 = arguments[0];
            if (arg1Type == "string") { return position[arg1]; }
            if (coreUtil.isPlainObject(arg1) || arg1Type == "function") { coreUtil.position(arg1.width || position.width, arg1.height || position.height, arg1.left || position.left, arg1.top || position.top); }
        }
        if (length == 2) {
            arg2 = arguments[1];
            arg2Type = coreUtil.type(arg2);
            if (arg1Type == "string" && arg2Type == "number") {
                var newPosition = $.extend({}, position);
                newPosition[arg1] = arg2;
                if (position.width != newPosition.width || position.height != newPosition.height || position.left != newPosition.left || position.top != newPosition.top) {
                    window.moveTo(newSize.left, newSize.top);
                    coreUtil.windowPosition(newPosition.width, newPosition.height, newPosition.left, newPosition.top);
                }
            }
            if (arg1Type == "number" && arg2Type == "number") { coreUtil.windowSize(arg1, arg2); }
        }
        if (length >= 3) {
            arg2 = arguments[1];
            arg3 = arguments[2];
            arg4 = arguments.length > 3 ? arguments[3] : null;
            coreUtil.windowSize(arg1, arg2);
            coreUtil.windowOffset(arg3, arg4);
        }
    };

    //  解析函数的运行值并返回；该函数定义如下参数：
    //      callback:   需要解析的函数，可以是一个值，也可以是函数；如果是函数，则该方法返回该函数的运行值；
    //      args:       表示需要传入函数 callback 的参数，是一个数组对象，该参数可选；
    //      thisArg:    表示传入函数 callback 包内的 this 引用对象，该参数可选。
    //  返回值：如果参数 callback 是一个函数，则进行 callback.apply(thisArg, args) 运算后并将其返回；否则直接将其返回。
    coreUtil.parseFunction = function (callback, args, thisArg) {
        var val = callback, obj = { length: 0 };
        if (coreUtil.isFunction(callback)) {
            if (coreUtil.likeArray(args) && thisArg) {
                coreArray.copy(args, obj);
                obj.callee = callback;
                val = callback.apply(thisArg, obj);
            } else {
                val = callback();
            }
        }
        return val;
    };

    //  解析键值对格式对象中键值格式为 key: function 的 JSON 格式对象的函数运算值并返回解析后的数据；该函数定义如下参数：
    //  返回值：返回对象中所有的 key: function 中的 function 运算后的结果与 key 序列组合成的新的对象副本；
    //  示例： var obj = { arg: 20, sex: function () { return "男"; } };
    //         coreUtil.parseMapFunction(obj); 
    //      此时，obj 的值为：{ arg: 20, sex: "男" }。
    coreUtil.parseMapFunction = function (obj) {
        var val = {};
        var type = coreUtil.type(obj);
        if (type == "object" || type == "function") {
            for (var key in obj) { val[key] = coreUtil.parseFunction(obj[key]); }
        }
        return val;
    };

    //  将通过 SOA(例如 ASP.NET 一般处理程序 或者 WebService) 方式返回的数据转换成 JSON 格式数据。
    coreUtil.parseJSON = function (data) {
        var val = null;
        var isString = coreUtil.isString(data);
        if (coreUtil.isPlainObject(data) || (coreUtil.likeArray(data) && !isString)) {
            val = coreUtil.isPlainObject(data.d) ? coreUtil.parseJSON(data.d) : data;
        } else {
            val = $.parseJSON(isString ? coreString.toJSONString(data) : $(data).text());
        }
        return val;
    };

    //  采用同步发送 ajax 请求的方式，以指定的参数请求远程数据并返回；该函数定义如下参数：
    //      url:    请求的远程服务地址；
    //      args:   发送至远程服务的数据，在发送数据之前该参数将会被序列化；
    //  返回值：返回远程请求的数据；
    //  备注：该方法为 $.ajax 方法的快捷调用，采用 post 方式提交，并且 async 属性设置为 false；
    //      如果需要更加丰富的 ajax 调用，请使用 $.ajax 方法。
    coreUtil.requestAjaxData = function (url, args) {
        var val = null;
        args = coreUtil.parseMapFunction(args);
        $.ajax({
            url: url, type: "POST", data: args, async: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                throw XMLHttpRequest.responseText;
            }, success: function (data, textStatus, jqXHR) { val = data; }
        });
        return val;
    };

    //  采用同步发送 ajax 请求的方式，以指定的参数请求远程布尔类型数据并返回；该函数定义如下参数：
    //      url:    请求的远程服务地址；
    //      args:   发送至远程服务的数据，在发送数据之前该参数将会被序列化；
    //  返回值：返回远程请求的布尔数据；
    //  备注：该方法为 $.ajax 方法的快捷调用，采用 post 方式提交，并且 async 属性设置为 false；
    //      如果需要更加丰富的 ajax 调用，请使用 $.ajax 方法。
    coreUtil.requestAjaxBoolean = function (url, args) {
        var data = coreUtil.requestAjaxData(url, args), type = typeof data;
        if (type == "object" || (type == "string" && data.charAt(0) === "<" && data.charAt(data.length - 1) === ">" && data.length >= 3)) { data = $(data).text(); }
        return coreString.toBoolean(data);
    };

    //  采用同步发送 ajax 请求的方式，以指定的参数请求远程数据并将其转换成 JSON 格式后返回；该函数定义如下参数：
    //      url:    请求的远程服务地址；
    //      args:   发送至远程服务的数据，在发送数据之前该参数将会被序列化；
    //  返回值：返回转换成 JSON 格式后的远程请求的数据；
    //  备注：该方法为 $.ajax 方法的快捷调用，采用 post 方式提交，并且 async 属性设置为 false；
    //      如果需要更加丰富的 ajax 调用，请使用 $.ajax 方法。
    coreUtil.requestAjaxJson = function (url, args) {
        var data = coreUtil.requestAjaxData(url, args);
        return coreUtil.parseJSON(data);
    };

    //  以指定的 CSS 内容创建一个 CSS 对象；该函数定义如下参数：
    //      context: 表示 css 内容；
    //      target:  该参数可选；表示包含该 css 的 style 标签被添加到的目标位置，可以是一个 DOM 对象或者 jQuery 对象。
    //  返回值：返回创建的 CSS 标签的 jQuery DOM 对象；
    //  备注：该方法会在 target 表示的 DOM 对象或当前页面的 head 中添加一个 <style type="text/css"></style> 标签，标签中的内容即为传入的 context 值。
    coreUtil.addCss = function (context, target) {
        return $("<style>" + context + "</style>").attr("type", "text/css").appendTo(target ? target : "head");
    };

    //  通过 javascript 前端本地方式导出 Excel 数据；该函数定义如下参数：
    //      options: JSON Object 类型；定义导出数据的参数信息，该对象定义如下属性：
    //          file:   String 类型，表示要导出的文件名；
    //          columns: Array 类型，表示要导出的 Excel 数据的列信息，该数组中每一个元素都是一个 JSON Object，该 Object 定义如下属性：
    //              field:  表示数据参数 rows 中对应的列字段名；
    //              title:  表示 field 对应的列的标题(导出后显示的名称)，默认为 field 的值；
    //              width:  表示 field 对应的列的列宽(单位：像素)，默认为 140；
    //              type:   表示 field 对应的列的数据类型，可选的值有 "boolean", "number", "string", "date"，默认为 "string"。
    //              formatter:  表示 field 对应的列数据导出时的格式化函数；导出的结果显示内容为该函数运算后返回的结果，Function 类型，定义参数列表如下：
    //                  field:
    //                  rowIndex:
    //                  rowData:
    //                  array:
    //                  默认值为 function (field, rowIndex, rowData, array) { return rowData[field]; }
    //          data: 实际要导出的数据；是一个数组对象，数组中的每一个元素都是一个 JSON Object 对象，表示一行数据；该 JSON Object 中的每一个属性都表示一个列字段值；
    //              关于数据的列字段属性信息由 columns 参数定义；
    //  返回值：
    //  注意：该函数不支持 ie6。
    coreUtil.exportExcel = function (options) { $.error("未实现"); };






    //  获取当前表达式匹配到的所有元素中的第一个元素是否具有 uniqueID 属性值；
    //  返回值：如果当当前表达式匹配到的所有元素中的第一个元素具有 uniqueID 属性值，则返回 true，否则返回 false。
    coreJquery.prototype.hasUniqueID = function () { return this.length ? coreUtil.hasUniqueID(this[0]) : false; };

    //  获取当前表达式匹配到的所有元素中的第一个元素的 uniqueID 属性值；
    //  返回值：如果当前表达式没有匹配的元素，则返回 null；否则返回 所有元素中的第一个元素的 uniqueID 属性值；
    coreJquery.prototype.getUniqueID = function () { return this.length ? coreUtil.getElementUniqueID(this[0]) : null; };

    //  设置当前表达式匹配到的所有元素的 uniqueID 属性值；该函数定义如下参数：
    //      uniqueID: 可选，表示要设置为的 uniqueID 属性值；如果不定义该值，则默认用 coreUtil.guid() 为其创建一个随机值。
    //  返回值：返回当前 jquery 对象的引用。
    coreJquery.prototype.setUniqueID = function (uniqueID) { return this.each(function () { coreUtil.setElementUniqueID(this, uniqueID); }); };

    //  初始化当前表达式匹配到的所有元素的 uniqueID 属性值；
    //  返回值：返回当前 jquery 对象的引用。
    //  备注：该方法循环判断每一个元素是否具有 uniqueID 属性值，如果有则不进行任何更改；如果没有则其期设置一个新的 uniqueID 值。
    coreJquery.prototype.initUniqueID = function () { return this.each(function () { coreUtil.initElementUniqueID(this); }); };

    //  获取或设置当前表达式元素的 uniqueID 属性值；该函数定义如下重载：
    //      1、function()；该重载表示：获取当前表达式匹配到的所有元素中第一个元素的 uniqueID 属性值；等效于 coreJquery.prototype.getUniqueID 函数；
    //      2、function(uniqueID)；该重载表示：设置当前表达式匹配到的所有元素的 uniqueID 属性值；等效于 coreJquery.prototype.setUniqueID 函数；
    coreJquery.prototype.uniqueID = function (uniqueID) {
        return arguments.length == 0 ? this.getUniqueID() : this.setUniqueID(uniqueID);
    };

    //  判断当前匹配到的元素是否具有焦点；
    coreJquery.prototype.isFocus = function () {
        var elements = $("*", this).add(this);
        for (var i = 0; i < elements.length; i++) { if (document.activeElement == elements[i]) { return true; } }
        return false;
    };

    //  测试当前 jQuery 对象是否包含另一个 DOM 对象；该函数定义如下参数：
    //      this: 方法体内的 this 对象引用，表示当前 jQuery 对象；
    //      item: DOM节点，可能被其他元素所包含
    //  返回值：如果 item DOM节点包含在 this 指向的当前 jQuery 对象中，则返回 true，否则返回 false。
    coreJquery.prototype.contains = function (item) {
        var b = false;
        this.each(function () { if ($.contains(this, item)) { b = true; return false; } });
        return b;
    };

    //  如果当前 jQuery 对象不包含指定表达式匹配的元素，则把与表达式匹配的元素添加到jQuery对象中。这个函数可以用于连接分别与两个表达式匹配的元素结果集；该函数定义如下参数：
    //      this: 方法体内的 this 对象引用，表示当前 jQuery 对象；
    //      其他参数同 jQuery 的官方 API 方法 jQuery.fn.add 相同；
    //  返回值：返回处理后的 this 的引用。
    coreJquery.prototype.attach = function () {
        var t = this;
        $.apply(this, arguments).each(function () {
            if (!t.contains(this)) { core_push.call(t, this); }
        });
        return t;
    };

    //  获取匹配元素相对滚动条顶部的偏移百分比
    coreJquery.prototype.scrollTopP = function () {
        var height = this.height();
        height = height <= 0 ? parseFloat(height) : parseFloat(1);
        return this.scrollTop() / height;
    };

    //  获取匹配元素相对滚动条左侧的偏移百分比
    coreJquery.prototype.scrollLeftP = function () {
        var width = this.width();
        width = width <= 0 ? parseFloat(width) : parseFloat(1);
        return this.scrollLeft() / width;
    };

    //  将当前表达式匹配到的所有元素及其子元素序列化成 JSON 对象并返回；该函数定义如下类型的重载方式：
    //      1、Function(Object)：其中参数 Object 对象定义如下属性：
    //          onlyEnabled:    表示返回的结果数据中是否仅包含启用(disabled == false)的 HTML 表单控件；Boolean 类型值，默认为 false。
    //          transcript :    表示当范围内存在重名(name 相同时)的 DOM 元素时，对重复元素的取值规则；
    ///                 这是一个 String 类型值，可选的值限定在以下范围：
    //              cover  :    覆盖方式，只取后面元素 的值，丢弃前面元素的值；默认值；
    //              discard:    丢弃后面元素的值，只取前面元素的值；
    //              overlay:    将所有元素的值进行叠加；
    //          overtype   :    元素叠加方式，当 transcript 的值定义为 "overlay" 时，此属性方有效；
    //                  这是一个 String 类型值，可选的值限定在以下范围：
    //              array  :    将所有重复的元素叠加为一个数组；
    //              append :    将所有的重复元素叠加为一个字符串；默认值；
    //          separator  :    元素叠加的分隔符，定义将所有重名元素叠加为一个字符串时用于拼接字符串的分隔符；
    //                  这是一个 String 类型值，默认为 ","；当 transcript 的值定义为 "overlay" 且 overtype 的值定义为 "append" 时，此属性方有效。
    //      2、Function(String)：其中参数 String 表示当范围内存在重名(name 相同时)的 DOM 元素时，对重复元素的取值规则；
    //          其取值范围和当参数格式为 JSON-Object 时的属性 transcript 一样。
    //  返回值：该方法返回一个 JSON Object，返回对象中的每个数据都表示一个表单控件值。
    coreJquery.prototype.serializeObject = function (options) {
        var rCRLF = /\r?\n/g,
	        rsubmitterTypes = /^(?:submit|button|image|reset)$/i,
	        rsubmittable = /^(?:input|select|textarea|keygen)/i,
            rsubmittable_radio = /^(?:radio)$/i,
            rsubmittable_checkbox = /^(?:checkbox)$/i,
            rsubmittable_radiocheckbox = /^(?:checkbox|radio)$/i,
            list, names, ret = {};
        options = options || {};
        var defaults = { onlyEnabled: false, transcript: "cover", overtype: "append", separator: "," },
            opts = $.extend({}, defaults, (typeof options == "string") ? { transcript: options} : options);
        if (!coreArray.contains(["cover", "discard", "overlay"], opts.transcript)) { opts.transcript = defaults.transcript; }
        if (!coreArray.contains(["array", "append"], opts.overtype)) { opts.overtype = defaults.overtype; }

        list = this.map(function () {
            var elements = jQuery.prop(this, "elements"), ret = [];
            $.merge(ret, elements ? $.makeArray(elements) : $(this).find("*"));
            return ret;
        }).filter(function () {
            var type = this.type;
            return this.name && (!opts.onlyEnabled || !$(this).is(":disabled")) &&
				rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type);
        }).map(function (i, elem) {
            var name = elem.name, type = this.type, val = $(this).val(),
                checked = this.checked == undefined || this.checked == null ? null : this.checked;
            return {
                name: name, type: type, checked: checked,
                val: $.isArray(val) ? $.map(val, function (val) { return val ? val.replace(rCRLF, "\r\n") : val; })
                    : (val ? val.replace(rCRLF, "\r\n") : val)
            };
        });
        names = coreArray.distinct(list.map(function (i, elem) { return elem.name; }));
        $.each(names, function (i, name) {
            var elems = list.filter(function (i, elem) { return elem.name == name; }),
                val = elems.length == 1 ? getElemVal(elems[0]) : getElemsVal(elems);
            ret[name] = (val == undefined || val == null) ? null : val;
        });
        function getElemVal(elem) {
            return rsubmittable_radiocheckbox.test(elem.type) ? elem.checked : elem.val;
        };
        function getElemsVal(elems) {
            var items = coreArray.filter(elems, function (elem) {
                return (rsubmittable_radiocheckbox.test(elem.type) && elem.checked == true) || !rsubmittable_radiocheckbox.test(elem.type);
            });
            var values = coreArray.map(items, function (val) { return val.val; });
            switch (opts.transcript) {
                case "cover": return values[values.length - 1];
                case "discard": return values[0];
                case "overlay":
                    return opts.overtype == "array"
                        ? (values.length > 1 ? values : values[0])
                        : values.join(opts.separator);
                default: return values[0];
            }
        };
        return ret;
    };


    //  创建或定义命名空间；该函数定义如下参数：
    //      namespace:  要创建的命名空间，不同级别的命名请用符号 "." 隔开，请不要包含任何空格；
    //      callback:   可选，创建完命名空间后执行的回调函数；
    //      thisArg:    可选，同参数 callback 一起定义；表示 callback 回调函数执行中的 this 对象
    coreUtil.namespace = function (namespace, callback, thisArg) {
        var ret = window;
        if (!namespace) { return ret; }
        var names = String(namespace).split(".");
        for (var i = 0; i < names.length; i++) {
            names[i] = coreString.trim(names[i]);
            if (!names[i]) { coreArray.remove(names, names[i--]); }
        }
        $.each(names, function (i, name) {
            ret = (ret[name] == null || ret[name] == undefined) ? (ret[name] = {}) : ret[name];
        });
        if (coreUtil.isFunction(callback)) { callback.call(thisArg); }
        return ret;
    };

    //  获取指定全名称的 JavaScript 类型函数对象；该函数定义如下参数：
    //      className   : 要获取的类的类名称，对应命名空间限定名用符号 "." 隔开，请不要包含任何空格；
    //  返回值：
    //      如果 className 指定的类型函数存在，则返回该类型函数对象；
    //      如果 className 指定的类型函数不存在，className 值为空字符串或者 null/undefined，否则返回 null。
    coreUtil.getDefined = function (className) {
        if (!className) { return null; }
        var names = String(className).split("."), ret = window;
        for (var i = 0; i < names.length; i++) {
            names[i] = coreString.trim(names[i]);
            if (!names[i]) { coreArray.remove(names, names[i--]); }
        }
        $.each(names, function (i, name) {
            ret = (ret == null || ret == undefined || ret[name] == null || ret[name] == undefined) ? null : ret[name];
        });
        return ret;
    };

    //  创建或定义一个 JavaScript 类；该函数定义如下参数：
    //      className   : 要创建的类的类名，对应命名空间限定名用符号 "." 隔开，请不要包含任何空格；
    //      data        : 可选；被创建的类型默认定义的成员属性或方法(即 prototype)；
    //      createFn    : 可选；被创建的类型的默认构造函数；
    //  返回值：返回被创建的类型的 Function 对象；
    //  注意：
    //      如果传入的参数 className 的值为 null，则创建的这个 JavaScript 类为匿名类；
    //      如果指定此定义函数时，className 所指定的对象已经存在，则该对象将会被覆盖；
    //      可以用 coreUtil.getDefined(className) 来判断 className 所指定的对象是否已经存在；
    coreUtil.define = function (className, data, createFn) {
        if (coreUtil.isFunction(data)) { createFn = data; }
        var p, name, func;
        if (className) {
            var names = String(className).split(".");
            for (var i = 0; i < names.length; i++) {
                names[i] = coreString.trim(names[i]);
                if (!names[i]) { coreArray.remove(names, names[i--]); }
            }
            if (names[0] != "window") { names.splice(0, 0, "window"); }
            if (names.length > 1) {
                p = coreUtil.namespace(names.slice(0, names.length - 1).join("."));
                name = names[names.length - 1];
            }
        }
        var constructor = coreUtil.isFunction(createFn) ? createFn : function () { };
        func = function (options) { return new constructor(options); };
        func.defaults = func.prototype = constructor.prototype;
        $.extend(func, { extend: $.extend, union: coreJquery.union });
        $.extend(func.defaults, data, { extend: $.extend, union: coreJquery.union });
        if (p && name) {
            var old = p[name];
            p[name] = func;
            if (old) { coreJquery.union(func, old); }
        }
        return func;
    };

    //  以指定的参数创建一个指定类型的对象；该函数定义如下参数：
    //      className   : 必须，String 类型值，指定的类型函数名称；
    //      options     : 可选，JSON-Object 类型值；构造 className 类型对象所用的参数，默认为 null；
    //      thisArgs    : 可选，任意类型值；表示指定 className 类型函数时指定函数内部的 this 对象引用。
    //  返回值：
    //      如果 className 指定的类型函数存在，则返回该函数通过 options 参数和 thisArgs 参数所构造的对象；
    //      如果 className 指定的类型函数不存在，则返回 null。
    coreUtil.create = function (className, options) {
        var type = coreUtil.getDefined(className);
        return coreUtil.isFunction(type) ? type(options) : null;
    };
		
		
		//  下段代码提供 javascript 控制浏览器 进入/退出 全屏模式的 API。
    var fullScreen = {
        supports: false, eventName: "", prefix: "", prefixes: "webkit moz o ms khtml".split(" "),
        isFullScreen: function () { }, requestFullScreen: function () { }, cancelFullScreen: function () { }
    };
    if (typeof document.cancelFullScreen != "undefined") {
        fullScreen.supports = true;
    } else {
        for (var i = 0; i < fullScreen.prefixes.length; i++) {
            fullScreen.prefix = fullScreen.prefixes[i];
            if (typeof document[fullScreen.prefix + "CancelFullScreen"] != "undefined") {
                fullScreen.supports = true;
                break;
            }
        }
    }
    if (fullScreen.supports) {
        fullScreen.eventName = fullScreen.prefix + "fullscreenchange";
        fullScreen.isFullScreen = function () {
            switch (this.prefix) {
                case "": return document.fullScreen;
                case "webkit": return document.webkitIsFullScreen;
                default: return document[this.prefix + "FullScreen"];
            }
        };
        fullScreen.requestFullScreen = function (elem) {
            return (this.prefix === "") ? elem.requestFullScreen() : elem[this.prefix + "RequestFullScreen"]();
        };
        fullScreen.cancelFullScreen = function (elem) {
            return (this.prefix === "") ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]();
        };
    }
    coreUtil.requestFullScreen = coreJquery.requestFullScreen = function (selector) {
        if (selector == null || selector == undefined) { selector = document.documentElement; }
        selector = coreUtil.parseJquery(selector);
        return selector.each(function () {
            if (fullScreen.supports) { fullScreen.requestFullScreen(this); }
        });
    };
    coreJquery.prototype.requestFullScreen = function () { return coreJquery.requestFullScreen(this); };
    coreUtil.cancelFullScreen = coreJquery.cancelFullScreen = function (selector) {
        if (selector == null || selector == undefined) { selector = document.documentElement; }
        selector = coreUtil.parseJquery(selector);
        return selector.each(function () {
            if (fullScreen.supports) { fullScreen.cancelFullScreen(this); }
        });
    };
    coreJquery.prototype.cancelFullScreen = function () { return coreJquery.cancelFullScreen(this); };
    coreUtil.supportsFullScreen = fullScreen.supports;
    coreUtil.fullScreen = fullScreen;



    //  元素闪动的默认时间间隔（毫秒）；该属性仅限于被方法 coreJquery.prototype.shine 调用；
    coreJquery.shineInterval = 100;
    //  元素闪动的默认次数；该属性仅限于被方法 coreJquery.prototype.shine 调用；
    coreJquery.shineTimes = 10;
    //  使元素闪动
    coreJquery.shine = function (selector, interval, times) {
        if (selector == null || selector == undefined) { return selector; }
        selector = coreUtil.parseJquery(selector);
        if (!coreUtil.isNumeric(interval) || interval <= 40) { interval = coreJquery.shineInterval; }
        if (!coreUtil.isNumeric(times) || times < 4) { times = coreJquery.shineTimes; }
        var a = function () { selector.addClass("jdirk-shine"); };
        var b = function () { selector.removeClass("jdirk-shine"); };
        var run = function () {
            coreUtil.call(a, interval / 2);
            coreUtil.call(b, interval);
            times--;
            if (times > 0) { coreUtil.call(run, interval); }
        };
        coreUtil.call(run);
        return selector;
    };
    coreJquery.prototype.shine = function (interval, times) { return coreJquery.shine(this, interval, times); };

    //  用一个或多个其他对象来扩展一个对象，返回被扩展的对象；该函数定义如下参数：
    //      deep:   可选；如果设为 true，则递归合并；
    //      target: 可选；一个对象，如果附加的对象被传递给这个方法将那么它将接收新的属性，如果它是唯一的参数将扩展jQuery的命名空间；
    //      object1:待合并到 target 的对象；
    //      object2:待合并到 target 的对象；
    //      objectN:待合并到 target 的对象；
    //      ...
    //  参考 jquery-2.0.0.js 中关于 jQuery.extend 以及 jQuery.fn.extend 方法的定义；
    //  注意：该方法与 jQuery.extend 以及 jQuery.fn.extend 的不同之处在于：
    //      jQuery.extend 以及 jQuery.fn.extend：无论 target 对象中是否存在 object1、object2、objectN 等待合并对象中相应的属性，待合并对象中的相应属性都将会合并到 target 中；
    //      union: 如果 target 对象中存在 object1、object2、objectN 等待合并对象中相应的属性，则该属性将不会被合并到 target 中。
    var union = coreJquery.union = coreJquery.prototype.union = function () {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === "boolean") { deep = target; target = arguments[1] || {}; i = 2; }
        if (typeof target !== "object" && !coreUtil.isFunction(target)) { target = {}; }
        if (length === i) { target = this; --i; }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) { continue; }
                    if (deep && copy && (coreUtil.isPlainObject(copy) || (copyIsArray = coreUtil.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && coreUtil.isArray(src) ? src : [];
                        } else {
                            clone = src && coreUtil.isPlainObject(src) ? src : {};
                        }
                        target[name] = union(deep, clone, copy);
                    } else if (copy !== undefined && copy !== null && (src === undefined || src === null)) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };



    union($, coreJquery);
    union($.fn, coreJquery.prototype);

    union(String, coreString);
    union(String.prototype, coreString.fn);
    union(Date, coreDate);
    union(Date.prototype, coreDate.fn);
    union(Number, coreNumber);
    union(Number.prototype, coreNumber.fn);
    union(Array, coreArray);
    union(Array.prototype, coreArray.fn);
    union(Boolean, coreBoolean);
    union(Boolean.prototype, coreBoolean.fn);

    union($.fn, Array.prototype);

    coreUtil.addCss(".jdirk-shine { filter: alpha(opacity=40); opacity: 0.4; }");

    //  _enableUniqueID = true;
    //  初始化浏览器的自动给 DOM 元素创建全局唯一标识符 uniqueID 功能；
    if (_enableUniqueID) {
        $(function () {
            if (!coreUtil.isTopMost && coreUtil.currentFrame && coreUtil.currentFrame != null) { coreUtil.initElementUniqueID(coreUtil.currentFrame); }
            coreUtil.setEnableUniqueID(_enableUniqueID);
        });
    }




    ///////////////////////////////////////////////////////////////////////////////////////////////
    //  初始化 JSON 对象（兼容 IE 6、7、8 使之支持 JSON 对象）
    //  json2.js 2013-05-26
    //  Public Domain. NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
    //  See http://www.JSON.org/js.html
    ///////////////////////////////////////////////////////////////////////////////////////////////
    if (typeof JSON !== 'object') { JSON = {}; }
    function f(n) { return n < 10 ? '0' + n : n; }
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate()) + 'T' +
                    f(this.getUTCHours()) + ':' +
                    f(this.getUTCMinutes()) + ':' +
                    f(this.getUTCSeconds()) + 'Z'
                : null;
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () { return this.valueOf(); };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' },
        rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') { value = value.toJSON(key); }
        if (typeof rep === 'function') { value = rep.call(holder, key, value); }
        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) { return 'null'; }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || 'null'; }
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }
    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) { indent += ' '; }
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', { '': value });
        };
    }
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k); if (v !== undefined) { value[k] = v; } else { delete value[k]; }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) { return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); });
            }
            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({ '': j }, '') : j;
            }
            throw new SyntaxError('JSON.parse');
        };
    }

})(window, jQuery);

/**
 * parser - jQuery EasyUI
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 * 
 */

(function($){
	$.parser = {
		auto: true,
		onComplete: function(context){},
		plugins:['draggable','droppable','resizable','pagination','tooltip',
		         'linkbutton','menu','menubutton','splitbutton','progressbar',
				 'tree','combobox','combotree','combogrid','numberbox','validatebox','searchbox',
				 'numberspinner','timespinner','calendar','datebox','datetimebox','slider',
				 'layout','panel','datagrid','propertygrid','treegrid','tabs','accordion','window','dialog'
		],
		parse: function(context){
			var aa = [];
			for(var i=0; i<$.parser.plugins.length; i++){
				var name = $.parser.plugins[i];
				var r = $('.easyui-' + name, context);
				if (r.length){
					if (r[name]){
						r[name]();
					} else {
						aa.push({name:name,jq:r});
					}
				}
			}
			if (aa.length && window.easyloader){
				var names = [];
				for(var i=0; i<aa.length; i++){
					names.push(aa[i].name);
				}
				easyloader.load(names, function(){
					for(var i=0; i<aa.length; i++){
						var name = aa[i].name;
						var jq = aa[i].jq;
						jq[name]();
					}
						$.parser.onComplete.call($.parser, context);
				
				});
			} else {
				$.parser.onComplete.call($.parser, context);
			}
		},
		
		/**
		 * parse options, including standard 'data-options' attribute.
		 * 
		 * calling examples:
		 * $.parser.parseOptions(target);
		 * $.parser.parseOptions(target, ['id','title','width',{fit:'boolean',border:'boolean'},{min:'number'}]);
		 */
		parseOptions: function(target, properties){
			var t = $(target);
			var options = {};
			
			var s = $.trim(t.attr('data-options'));
			if (s){
//				var first = s.substring(0,1);
//				var last = s.substring(s.length-1,1);
//				if (first != '{') s = '{' + s;
//				if (last != '}') s = s + '}';
				if (s.substring(0, 1) != '{'){
					s = '{' + s + '}';
				}
				options = (new Function('return ' + s))();
			}
				
			if (properties){
				var opts = {};
				for(var i=0; i<properties.length; i++){
					var pp = properties[i];
					if (typeof pp == 'string'){
						if (pp == 'width' || pp == 'height' || pp == 'left' || pp == 'top'){
							opts[pp] = parseInt(target.style[pp]) || undefined;
						} else {
							opts[pp] = t.attr(pp);
						}
					} else {
						for(var name in pp){
							var type = pp[name];
							if (type == 'boolean'){
								opts[name] = t.attr(name) ? (t.attr(name) == 'true') : undefined;
							} else if (type == 'number'){
								opts[name] = t.attr(name)=='0' ? 0 : parseFloat(t.attr(name)) || undefined;
							}
						}
					}
				}
				$.extend(options, opts);
			}
			return options;
		}
	};
	$(function(){
		var d = $('<div style="position:absolute;top:-1000px;width:100px;height:100px;padding:5px"></div>').appendTo('body');
		d.width(100);
		$._boxModel = parseInt(d.width()) == 100;
		d.remove();
		
		if (!window.easyloader && $.parser.auto){
			$.parser.parse();
		}
	});
	
	/**
	 * extend plugin to set box model width
	 */
	$.fn._outerWidth = function(width){
		if (width == undefined){
			if (this[0] == window){
				return this.width() || document.body.clientWidth;
			}
			return this.outerWidth()||0;
		}
		return this.each(function(){
			if ($._boxModel){
				$(this).width(width - ($(this).outerWidth() - $(this).width()));
			} else {
				$(this).width(width);
			}
		});
	};
	
	/**
	 * extend plugin to set box model height
	 */
	$.fn._outerHeight = function(height){
		if (height == undefined){
			if (this[0] == window){
				return this.height() || document.body.clientHeight;
			}
			return this.outerHeight()||0;
		}
		return this.each(function(){
			if ($._boxModel){
				$(this).height(height - ($(this).outerHeight() - $(this).height()));
			} else {
				$(this).height(height);
			}
		});
	};
	
	$.fn._scrollLeft = function(left){
		if (left == undefined){
			return this.scrollLeft();
		} else {
			return this.each(function(){$(this).scrollLeft(left)});
		}
	}
	
	$.fn._propAttr = $.fn.prop || $.fn.attr;
	
	/**
	 * set or unset the fit property of parent container, return the width and height of parent container
	 */
	$.fn._fit = function(fit){
		fit = fit == undefined ? true : fit;
		var t = this[0];
		var p = (t.tagName == 'BODY' ? t : this.parent()[0]);
		var fcount = p.fcount || 0;
		if (fit){
			if (!t.fitted){
				t.fitted = true;
				p.fcount = fcount + 1;
				$(p).addClass('panel-noscroll');
				if (p.tagName == 'BODY'){
					$('html').addClass('panel-fit');
				}
			}
		} else {
			if (t.fitted){
				t.fitted = false;
				p.fcount = fcount - 1;
				if (p.fcount == 0){
					$(p).removeClass('panel-noscroll');
					if (p.tagName == 'BODY'){
						$('html').removeClass('panel-fit');
					}
				}
			}
		}
		return {
			width: $(p).width(),
			height: $(p).height()
		}
	}
	
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
$.fn.resizable=function(_1,_2){
if(typeof _1=="string"){
return $.fn.resizable.methods[_1](this,_2);
}
function _3(e){
var _4=e.data;
var _5=$.data(_4.target,"resizable").options;
if(_4.dir.indexOf("e")!=-1){
var _6=_4.startWidth+e.pageX-_4.startX;
_6=Math.min(Math.max(_6,_5.minWidth),_5.maxWidth);
_4.width=_6;
}
if(_4.dir.indexOf("s")!=-1){
var _7=_4.startHeight+e.pageY-_4.startY;
_7=Math.min(Math.max(_7,_5.minHeight),_5.maxHeight);
_4.height=_7;
}
if(_4.dir.indexOf("w")!=-1){
var _6=_4.startWidth-e.pageX+_4.startX;
_6=Math.min(Math.max(_6,_5.minWidth),_5.maxWidth);
_4.width=_6;
_4.left=_4.startLeft+_4.startWidth-_4.width;
}
if(_4.dir.indexOf("n")!=-1){
var _7=_4.startHeight-e.pageY+_4.startY;
_7=Math.min(Math.max(_7,_5.minHeight),_5.maxHeight);
_4.height=_7;
_4.top=_4.startTop+_4.startHeight-_4.height;
}
};
function _8(e){
var _9=e.data;
var t=$(_9.target);
t.css({left:_9.left,top:_9.top});
if(t.outerWidth()!=_9.width){
t._outerWidth(_9.width);
}
if(t.outerHeight()!=_9.height){
t._outerHeight(_9.height);
}
};
function _a(e){
$.fn.resizable.isResizing=true;
$.data(e.data.target,"resizable").options.onStartResize.call(e.data.target,e);
return false;
};
function _b(e){
_3(e);
if($.data(e.data.target,"resizable").options.onResize.call(e.data.target,e)!=false){
_8(e);
}
return false;
};
function _c(e){
$.fn.resizable.isResizing=false;
_3(e,true);
_8(e);
$.data(e.data.target,"resizable").options.onStopResize.call(e.data.target,e);
$(document).unbind(".resizable");
$("body").css("cursor","");
return false;
};
return this.each(function(){
var _d=null;
var _e=$.data(this,"resizable");
if(_e){
$(this).unbind(".resizable");
_d=$.extend(_e.options,_1||{});
}else{
_d=$.extend({},$.fn.resizable.defaults,$.fn.resizable.parseOptions(this),_1||{});
$.data(this,"resizable",{options:_d});
}
if(_d.disabled==true){
return;
}
$(this).bind("mousemove.resizable",{target:this},function(e){
if($.fn.resizable.isResizing){
return;
}
var _f=_10(e);
if(_f==""){
$(e.data.target).css("cursor","");
}else{
$(e.data.target).css("cursor",_f+"-resize");
}
}).bind("mouseleave.resizable",{target:this},function(e){
$(e.data.target).css("cursor","");
}).bind("mousedown.resizable",{target:this},function(e){
var dir=_10(e);
if(dir==""){
return;
}
function _11(css){
var val=parseInt($(e.data.target).css(css));
if(isNaN(val)){
return 0;
}else{
return val;
}
};
var _12={target:e.data.target,dir:dir,startLeft:_11("left"),startTop:_11("top"),left:_11("left"),top:_11("top"),startX:e.pageX,startY:e.pageY,startWidth:$(e.data.target).outerWidth(),startHeight:$(e.data.target).outerHeight(),width:$(e.data.target).outerWidth(),height:$(e.data.target).outerHeight(),deltaWidth:$(e.data.target).outerWidth()-$(e.data.target).width(),deltaHeight:$(e.data.target).outerHeight()-$(e.data.target).height()};
$(document).bind("mousedown.resizable",_12,_a);
$(document).bind("mousemove.resizable",_12,_b);
$(document).bind("mouseup.resizable",_12,_c);
$("body").css("cursor",dir+"-resize");
});
function _10(e){
var tt=$(e.data.target);
var dir="";
var _13=tt.offset();
var _14=tt.outerWidth();
var _15=tt.outerHeight();
var _16=_d.edge;
if(e.pageY>_13.top&&e.pageY<_13.top+_16){
dir+="n";
}else{
if(e.pageY<_13.top+_15&&e.pageY>_13.top+_15-_16){
dir+="s";
}
}
if(e.pageX>_13.left&&e.pageX<_13.left+_16){
dir+="w";
}else{
if(e.pageX<_13.left+_14&&e.pageX>_13.left+_14-_16){
dir+="e";
}
}
var _17=_d.handles.split(",");
for(var i=0;i<_17.length;i++){
var _18=_17[i].replace(/(^\s*)|(\s*$)/g,"");
if(_18=="all"||_18==dir){
return dir;
}
}
return "";
};
});
};
$.fn.resizable.methods={options:function(jq){
return $.data(jq[0],"resizable").options;
},enable:function(jq){
return jq.each(function(){
$(this).resizable({disabled:false});
});
},disable:function(jq){
return jq.each(function(){
$(this).resizable({disabled:true});
});
}};
$.fn.resizable.parseOptions=function(_19){
var t=$(_19);
return $.extend({},$.parser.parseOptions(_19,["handles",{minWidth:"number",minHeight:"number",maxWidth:"number",maxHeight:"number",edge:"number"}]),{disabled:(t.attr("disabled")?true:undefined)});
};
$.fn.resizable.defaults={disabled:false,handles:"n, e, s, w, ne, se, sw, nw, all",minWidth:10,minHeight:10,maxWidth:10000,maxHeight:10000,edge:5,onStartResize:function(e){
},onResize:function(e){
},onStopResize:function(e){
}};
$.fn.resizable.isResizing=false;
})(jQuery);


/*
[toolbar]
*/
(function ($) {
	function init(target) {
		var opt = $.data(target, "toolbar").options;
		
		$.each($(target).children(), function () {
			var itemOpt = parseOptions($(this));
			opt.items.push(itemOpt);
		});
		
		if (!opt.items){
			return;
		}
			
		$(target).empty();
		
		if (opt.randerTo) {
			$(target).appendTo(opt.randerTo);
		}
		
		$(target).css({
			height: 28,
			background: '#f4f4f4',
			padding: '2px 5px 1px 5px',
			'border-bottom':'1px solid #ddd'
		});
		
		
		$.each(opt.items, function () {
			var items = this;
			/*if (typeof items[0] === 'string' && items[0] === "-")*/
			if (items.length==1) {
				$('<div/>').appendTo(target).css({
					height: 24,
					borderLeft: '1px solid #CCC',
					borderRight: '1px solid white',
					margin: '2px 1px'
				});
			}else{
				items.type = items.type || 'button';
				items = $.extend(items,{plain : true});
				var btn = $("<a/>");
				if(!items.href){
					items.href =  "javascript:void(0)";
				}
				btn.attr("href", "javascript:void(0)");
				
				if(items.onclick){
					items.href =  "javascript:void(0)";
					btn.attr("onclick", items.onclick);
				}else if(items.handler && typeof items.handler === 'function'){
				  if(!items.disabled){
						btn.click(items.handler);
					}
					
				}
				
			
				btn.appendTo(target);
				
				if (items.type == 'button') {
					btn.linkbutton(items);
				} else if (items.type == 'menubutton') {
					btn.menubutton(items);
				}
			}
		});
		if(opt.align=="right"){
			$(target).children().css("float","right");
		}else{
			$(target).children().css("float","left");
		}
		
		function parseOptions(t) {
			var opt = {
				id : t.attr("id"),
				disabled : (t.attr("disabled") ? true : undefined),
				plain : true,
				text : $.trim(t.html()),
				iconCls : (t.attr("icon") || t.attr("iconCls")),
				type : 'button',
				href:t.attr("href"),
				align:'left',
				onclick:t.attr("onclick")
			};
			if (t.attr("type") && t.attr("type") != 'button' || t.attr("menu")) {
				opt = $.extend(opt, {
						menu : t.attr("menu"),
						duration : t.attr("duration"),
						type : 'menubutton'
					});
			}
			return opt;
		}
	}
	
	$.fn.toolbar = function (options, params) {
		if (typeof options === 'string') {
			return $(this).toolbar.methods[options].call(this,params);
		}
		
		options = options || {};
		return this.each(function () {
			var opt = $.data(this, "toolbar");
			if (opt) {
				$.extend(opt.options, options);
			} else {
				$.data(this, "toolbar", {
					options : $.extend({}, $.fn.toolbar.defaults, options)
				});
				init(this);
			}
		});
	};
	
	$.fn.toolbar.methods = {
		options : function () {
			return this.data().toolbar.options;
		},
		select:function(index){
			return this.each(function(){
				var items = $(this).data().toolbar.options.items;
				var target = $(this);
				target.children().removeClass('l-btn-plain-selected').removeClass('l-btn-selected');
				var ld = target.children().eq(index);
				var v=items[index];
				if(v.type == 'menubutton'){
							ld.menubutton('select',index);
					}else{
						ld.linkbutton('select',index);
				}
				
			/*	$.each(items,function(i,v){
						
						if(v != "-"){
							if(v.type == 'menubutton'){
								ld.menubutton('select',index);
							}else{
								ld.linkbutton('select',index);
							}
							if(v.handler){
								ld.unbind('click');
							}
						}
				})*/
			});
		},
		disabledALl:function(){
			return this.each(function(){
				var items = $(this).data().toolbar.options.items;
				var target = $(this);
				$.each(items,function(i,v){
						var ld = target.children().eq(i);
						if(v != "-"){
							if(v.type == 'menubutton'){
								ld.menubutton('disable');
							}else{
								ld.linkbutton('disable');
							}
							if(v.handler){
								ld.unbind('click');
							}
						}
				})
			});
		},
		enableAll:function(){
			return this.each(function(){
				var items = $(this).data().toolbar.options.items;
				var target = $(this);
				$.each(items,function(i,v){
						var ld = target.children().eq(i);
						if(v != "-"){
							if(v.type == 'menubutton'){
								ld.menubutton('enable');
							}else{
								ld.linkbutton('enable');
							}
							
							if(v.handler){
								ld.click(v.handler);
							}
						}
				})
			});
		},
		disabled:function(text){
			return this.each(function(){
				var items = $(this).data().toolbar.options.items;
				var target = $(this);
				$.each(items,function(i,v){
					if(v.text == text){
						var ld = target.children().eq(i);
						if(v.type == 'menubutton'){
							ld.menubutton('disable');
						}else{
							ld.linkbutton('disable');
						}
						if(v.handler){
							ld.unbind('click');
						}
					}
				})
			});
		},
		enable:function(text){
			return this.each(function(){
				var items = $(this).data().toolbar.options.items;
				var target = $(this);
				$.each(items,function(i,v){
					if(v.text == text){
						var ld = target.children().eq(i);
						if(v.type == 'menubutton'){
							ld.menubutton('enable');
						}else{
							ld.linkbutton('enable');
						}
						if(v.handler){
							ld.click(v.handler);
						}
					}
				})
			});
		}
	};
	
	$.fn.toolbar.defaults = {
		randerTo : null,
		items : []
	};
	
	if ($.parser) {
		$.parser.plugins.push('toolbar');
	}
})(jQuery);
/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
$.fn._remove=function(){
return this.each(function(){
$(this).remove();
try{
this.outerHTML="";
}
catch(err){
}
});
};
function _1(_2){
_2._remove();
};
function _3(_4,_5){
var _6=$.data(_4,"panel").options;
var _7=$.data(_4,"panel").panel;
var _8=_7.children("div.panel-header");
var _9=_7.children("div.panel-body");
if(_5){
$.extend(_6,{width:_5.width,height:_5.height,left:_5.left,top:_5.top});
}
_6.fit?$.extend(_6,_7._fit()):_7._fit(false);
_7.css({left:_6.left,top:_6.top});
if(!isNaN(_6.width)){
_7._outerWidth(_6.width);
}else{
_7.width("auto");
}
_8.add(_9)._outerWidth(_7.width());
if(!isNaN(_6.height)){
_7._outerHeight(_6.height);
_9._outerHeight(_7.height()-_8._outerHeight());
}else{
_9.height("auto");
}
_7.css("height","");
_6.onResize.apply(_4,[_6.width,_6.height]);
$(_4).find(">div,>form>div").triggerHandler("_resize");
};
function _a(_b,_c){
var _d=$.data(_b,"panel").options;
var _e=$.data(_b,"panel").panel;
if(_c){
if(_c.left!=null){
_d.left=_c.left;
}
if(_c.top!=null){
_d.top=_c.top;
}
}
_e.css({left:_d.left,top:_d.top});
_d.onMove.apply(_b,[_d.left,_d.top]);
};
function _f(_10){
$(_10).addClass("panel-body");
var _11=$("<div class=\"panel\"></div>").insertBefore(_10);
_11[0].appendChild(_10);
_11.bind("_resize",function(){
var _12=$.data(_10,"panel").options;
if(_12.fit==true){
_3(_10);
}
return false;
});
return _11;
};
function _13(_14){
var _15=$.data(_14,"panel").options;
var _16=$.data(_14,"panel").panel;
if(_15.tools&&typeof _15.tools=="string"){
_16.find(">div.panel-header>div.panel-tool .panel-tool-a").appendTo(_15.tools);
}
_1(_16.children("div.panel-header"));
if(_15.title&&!_15.noheader|| _15.minSplit){
var _17=$("<div class=\"panel-header\"><div class=\"panel-title\">"+_15.title+"</div></div>").prependTo(_16);
if(_15.iconCls){
_17.find(".panel-title").addClass("panel-with-icon");
$("<div class=\"panel-icon\"></div>").addClass(_15.iconCls).appendTo(_17);
}
var _18=$("<div class=\"panel-tool\"></div>").appendTo(_17);
_18.bind("click",function(e){
e.stopPropagation();
});
if(_15.tools){
if($.isArray(_15.tools)){
for(var i=0;i<_15.tools.length;i++){
var t=$("<a href=\"javascript:void(0)\"></a>").addClass(_15.tools[i].iconCls).appendTo(_18);
if(_15.tools[i].handler){
t.bind("click",eval(_15.tools[i].handler));
}
}
}else{
$(_15.tools).children().each(function(){
$(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(_18);
});
}
}
if(_15.collapsible){
$("<a class=\"panel-tool-collapse\" href=\"javascript:void(0)\"></a>").appendTo(_18).bind("click",function(){
if(_15.collapsed==true){
_3c(_14,true);
}else{
_2c(_14,true);
}
return false;
});
}
if(_15.minimizable){
$("<a class=\"panel-tool-min\" href=\"javascript:void(0)\"></a>").appendTo(_18).bind("click",function(){
_47(_14);
return false;
});
}
if(_15.maximizable){
$("<a class=\"panel-tool-max\" href=\"javascript:void(0)\"></a>").appendTo(_18).bind("click",function(){
if(_15.maximized==true){
_4b(_14);
}else{
_2b(_14);
}
return false;
});
}
if(_15.closable){
$("<a class=\"panel-tool-close\" href=\"javascript:void(0)\"></a>").appendTo(_18).bind("click",function(){
_19(_14);
return false;
});
}
_16.children("div.panel-body").removeClass("panel-body-noheader");
}else{
_16.children("div.panel-body").addClass("panel-body-noheader");
}
};
function _1a(_1b){
var _1c=$.data(_1b,"panel");
var _1d=_1c.options;
if(_1d.href){
if(!_1c.isLoaded||!_1d.cache){
if(_1d.onBeforeLoad.call(_1b)==false){
return;
}
_1c.isLoaded=false;
_1e(_1b);
if(_1d.loadingMessage){
$(_1b).html($("<div class=\"panel-loading\"></div>").html(_1d.loadingMessage));
}
$.ajax({url:_1d.href,cache:false,dataType:"html",success:function(_1f){
_20(_1d.extractor.call(_1b,_1f));
_1d.onLoad.apply(_1b,arguments);
_1c.isLoaded=true;
}});
}
}else{
if(_1d.content){
if(!_1c.isLoaded){
_1e(_1b);
_20(_1d.content);
_1c.isLoaded=true;
}
}
}
function _20(_21){
$(_1b).html(_21);
if($.parser){
$.parser.parse($(_1b));
}
};
};
function _1e(_22){
var t=$(_22);
t.find(".combo-f").each(function(){
$(this).combo("destroy");
});
t.find(".m-btn").each(function(){
$(this).menubutton("destroy");
});
t.find(".s-btn").each(function(){
$(this).splitbutton("destroy");
});
t.find(".tooltip-f").each(function(){
$(this).tooltip("destroy");
});
};
function _23(_24){
$(_24).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible").each(function(){
$(this).triggerHandler("_resize",[true]);
});
};
function _25(_26,_27){
var _28=$.data(_26,"panel").options;
var _29=$.data(_26,"panel").panel;
if(_27!=true){
if(_28.onBeforeOpen.call(_26)==false){
return;
}
}
_29.show();
_28.closed=false;
_28.minimized=false;
var _2a=_29.children("div.panel-header").find("a.panel-tool-restore");
if(_2a.length){
_28.maximized=true;
}
_28.onOpen.call(_26);
if(_28.maximized==true){
_28.maximized=false;
_2b(_26);
}
if(_28.collapsed==true){
_28.collapsed=false;
_2c(_26);
}
if(!_28.collapsed){
_1a(_26);
_23(_26);
}
};
function _19(_2d,_2e){
var _2f=$.data(_2d,"panel").options;
var _30=$.data(_2d,"panel").panel;
if(_2e!=true){
if(_2f.onBeforeClose.call(_2d)==false){
return;
}
}
_30._fit(false);
_30.hide();
_2f.closed=true;
_2f.onClose.call(_2d);
};
function _31(_32,_33){
var _34=$.data(_32,"panel").options;
var _35=$.data(_32,"panel").panel;
if(_33!=true){
if(_34.onBeforeDestroy.call(_32)==false){
return;
}
}
_1e(_32);
_1(_35);
_34.onDestroy.call(_32);
};
function _2c(_36,_37){
var _38=$.data(_36,"panel").options;
var _39=$.data(_36,"panel").panel;
var _3a=_39.children("div.panel-body");
var _3b=_39.children("div.panel-header").find("a.panel-tool-collapse");
if(_38.collapsed==true){
return;
}
_3a.stop(true,true);
if(_38.onBeforeCollapse.call(_36)==false){
return;
}
_3b.addClass("panel-tool-expand");
if(_37==true){
_3a.slideUp("normal",function(){
_38.collapsed=true;
_38.onCollapse.call(_36);
});
}else{
_3a.hide();
_38.collapsed=true;
_38.onCollapse.call(_36);
}
};
function _3c(_3d,_3e){
var _3f=$.data(_3d,"panel").options;
var _40=$.data(_3d,"panel").panel;
var _41=_40.children("div.panel-body");
var _42=_40.children("div.panel-header").find("a.panel-tool-collapse");
if(_3f.collapsed==false){
return;
}
_41.stop(true,true);
if(_3f.onBeforeExpand.call(_3d)==false){
return;
}
_42.removeClass("panel-tool-expand");
if(_3e==true){
_41.slideDown("normal",function(){
_3f.collapsed=false;
_3f.onExpand.call(_3d);
_1a(_3d);
_23(_3d);
});
}else{
_41.show();
_3f.collapsed=false;
_3f.onExpand.call(_3d);
_1a(_3d);
_23(_3d);
}
};
function _2b(_43){
var _44=$.data(_43,"panel").options;
var _45=$.data(_43,"panel").panel;
var _46=_45.children("div.panel-header").find("a.panel-tool-max");
if(_44.maximized==true){
return;
}
_46.addClass("panel-tool-restore");
if(!$.data(_43,"panel").original){
$.data(_43,"panel").original={width:_44.width,height:_44.height,left:_44.left,top:_44.top,fit:_44.fit};
}
_44.left=0;
_44.top=0;
_44.fit=true;
_3(_43);
_44.minimized=false;
_44.maximized=true;
_44.onMaximize.call(_43);
};
function _47(_48){
var _49=$.data(_48,"panel").options;
var _4a=$.data(_48,"panel").panel;
_4a._fit(false);
_4a.hide();
_49.minimized=true;
_49.maximized=false;
_49.onMinimize.call(_48);
};
function _4b(_4c){
var _4d=$.data(_4c,"panel").options;
var _4e=$.data(_4c,"panel").panel;
var _4f=_4e.children("div.panel-header").find("a.panel-tool-max");
if(_4d.maximized==false){
return;
}
_4e.show();
_4f.removeClass("panel-tool-restore");
$.extend(_4d,$.data(_4c,"panel").original);
_3(_4c);
_4d.minimized=false;
_4d.maximized=false;
$.data(_4c,"panel").original=null;
_4d.onRestore.call(_4c);
};
function _50(_51){
var _52=$.data(_51,"panel").options;
var _53=$.data(_51,"panel").panel;
var _54=$(_51).panel("header");
var _55=$(_51).panel("body");
_53.css(_52.style);
_53.addClass(_52.cls);
if(_52.border){
_54.removeClass("panel-header-noborder");
_55.removeClass("panel-body-noborder");
}else{
_54.addClass("panel-header-noborder");
_55.addClass("panel-body-noborder");
}
_54.addClass(_52.headerCls);
_55.addClass(_52.bodyCls);
if(_52.id){
$(_51).attr("id",_52.id);
}else{
$(_51).attr("id","");
}
};

function setFitWidth(){		
/*panel宽度自适应扩展*/			
var fitPanel=$("body").find('.fit-width');
if(fitPanel[0]){
	var panel=fitPanel.parent().parent();
	setTimeout(function(){
	var _w=panel.width()-2;
	fitPanel.width(_w);
	fitPanel.prev(0).width(_w-10);
	},0);
}
/*panel宽度自适应扩展 end*/	
	
}
function _56(_57,_58){
$.data(_57,"panel").options.title=_58;
$(_57).panel("header").find("div.panel-title").html(_58);
};
var TO=false;
var _59=true;
$(window).unbind(".panel").bind("resize.panel",function(){
if(!_59){
return;
}
if(TO!==false){
clearTimeout(TO);
}
TO=setTimeout(function(){
_59=false;
setFitWidth();
var _5a=$("body.layout");
if(_5a.length){
_5a.layout("resize");
}else{
$("body").children("div.panel,div.accordion,div.tabs-container,div.layout").triggerHandler("_resize");
}
_59=true;
TO=false;
},200);
});
$.fn.panel=function(_5b,_5c){
if(typeof _5b=="string"){
return $.fn.panel.methods[_5b](this,_5c);
}
_5b=_5b||{};
return this.each(function(){
var _5d=$.data(this,"panel");
var _5e;
if(_5d){
_5e=$.extend(_5d.options,_5b);
_5d.isLoaded=false;
}else{
_5e=$.extend({},$.fn.panel.defaults,$.fn.panel.parseOptions(this),_5b);
$(this).attr("title","");
_5d=$.data(this,"panel",{options:_5e,panel:_f(this),isLoaded:false});
}
_13(this);
_50(this);
if(_5e.doSize==true){
_5d.panel.css("display","block");
_3(this);
}
if(_5e.closed==true||_5e.minimized==true){
_5d.panel.hide();
}else{
_25(this);
}
});
};
$.fn.panel.methods={options:function(jq){
return $.data(jq[0],"panel").options;
},panel:function(jq){
return $.data(jq[0],"panel").panel;
},header:function(jq){
return $.data(jq[0],"panel").panel.find(">div.panel-header");
},body:function(jq){
return $.data(jq[0],"panel").panel.find(">div.panel-body");
},setTitle:function(jq,_5f){
return jq.each(function(){
_56(this,_5f);
});
},open:function(jq,_60){
return jq.each(function(){
_25(this,_60);
});
},close:function(jq,_61){
return jq.each(function(){
_19(this,_61);
});
},destroy:function(jq,_62){
return jq.each(function(){
_31(this,_62);
});
},refresh:function(jq,_63){
return jq.each(function(){
$.data(this,"panel").isLoaded=false;
if(_63){
$.data(this,"panel").options.href=_63;
}
_1a(this);
});
},resize:function(jq,_64){
return jq.each(function(){
_3(this,_64);
});
},move:function(jq,_65){
return jq.each(function(){
_a(this,_65);
});
},maximize:function(jq){
return jq.each(function(){
_2b(this);
});
},minimize:function(jq){
return jq.each(function(){
_47(this);
});
},restore:function(jq){
return jq.each(function(){
_4b(this);
});
},collapse:function(jq,_66){
return jq.each(function(){
_2c(this,_66);
});
},expand:function(jq,_67){
return jq.each(function(){
_3c(this,_67);
});
}};
$.fn.panel.parseOptions=function(_68){
var t=$(_68);
return $.extend({},$.parser.parseOptions(_68,["id","width","height","left","top","title","iconCls","cls","headerCls","bodyCls","tools","href",{cache:"boolean",fit:"boolean",border:"boolean",noheader:"boolean"},{collapsible:"boolean",minimizable:"boolean",maximizable:"boolean"},{closable:"boolean",collapsed:"boolean",minimized:"boolean",maximized:"boolean",closed:"boolean"}]),{loadingMessage:(t.attr("loadingMessage")!=undefined?t.attr("loadingMessage"):undefined)});
};
$.fn.panel.defaults={id:null,title:null,iconCls:null,width:"auto",height:"auto",left:null,top:null,cls:null,headerCls:null,bodyCls:null,style:{},href:null,cache:true,fit:false,border:true,doSize:true,noheader:false,content:null,collapsible:false,minimizable:false,maximizable:false,closable:false,collapsed:false,minimized:false,maximized:false,closed:false,tools:null,href:null,loadingMessage:"Loading...",extractor:function(_69){
var _6a=/<body[^>]*>((.|[\n\r])*)<\/body>/im;
var _6b=_6a.exec(_69);
if(_6b){
return _6b[1];
}else{
return _69;
}
},onBeforeLoad:function(){
},onLoad:function(){
},onBeforeOpen:function(){
},onOpen:function(){
},onBeforeClose:function(){
},onClose:function(){
},onBeforeDestroy:function(){
},onDestroy:function(){
},onResize:function(_6c,_6d){
},onMove:function(_6e,top){
},onMaximize:function(){
},onRestore:function(){
},onMinimize:function(){
},onBeforeCollapse:function(){
},onBeforeExpand:function(){
},onCollapse:function(){
},onExpand:function(){
}};
})(jQuery);
/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 **********
 自定义：minWidth:0,minHeight:0,splitWidth=5;
 minspit扩展
 */
(function($){
var _1=false;
function _2(_3){
var _4=$.data(_3,"layout");
var _5=_4.options;
var _6=_4.panels;
var cc=$(_3);
if(_3.tagName=="BODY"){
cc._fit();
}else{
_5.fit?cc.css(cc._fit()):cc._fit(false);
}
var _7={top:0,left:0,width:cc.width(),height:cc.height()};
_8(_9(_6.expandNorth)?_6.expandNorth:_6.north,"n");
_8(_9(_6.expandSouth)?_6.expandSouth:_6.south,"s");
_a(_9(_6.expandEast)?_6.expandEast:_6.east,"e");
_a(_9(_6.expandWest)?_6.expandWest:_6.west,"w");
_6.center.panel("resize",_7);
function _b(pp){
var _c=pp.panel("options");
return Math.min(Math.max(_c.height,_c.minHeight),_c.maxHeight);
};
function _d(pp){
var _e=pp.panel("options");
return Math.min(Math.max(_e.width,_e.minWidth),_e.maxWidth);
};
function _8(pp,_f){
if(!pp.length){
return;
}
var _10=pp.panel("options");
var _11=_b(pp);
pp.panel("resize",{width:cc.width(),height:_11,left:0,top:(_f=="n"?0:cc.height()-_11)});
if(pp.panel('panel').is(":visible")){
_7.height-=_11;
}
if(_f=="n" &&pp.panel('panel').is(":visible")){
_7.top+=_11;
if(!_10.split&&_10.border&&!_10.minSplit){
_7.top--;
}
}
if(!_10.split&&_10.border&&!_10.minSplit){
_7.height++;
}
};
function _a(pp,_12){
if(!pp.length){
return;
}
var _13=pp.panel("options");
var _14=_d(pp);
pp.panel("resize",{width:_14,height:_7.height,left:(_12=="e"?cc.width()-_14:0),top:_7.top});
if(pp.panel('panel').is(":visible")){
_7.width-=_14;
}
if(_12=="w"&&pp.panel('panel').is(":visible")){
_7.left+=_14;
if(!_13.split&&_13.border&&!_13.minSplit){
_7.left--;
}
}
if(!_13.split&&_13.border&&!_13.minSplit){
_7.width++;
}
};
};
function _15(_16){
var cc=$(_16);
cc.addClass("layout");
function _17(cc){
cc.children("div").each(function(){
var _18=$.fn.layout.parsePanelOptions(this);
if("north,south,east,west,center".indexOf(_18.region)>=0){
_1b(_16,_18,this);
}
});
};
cc.children("form").length?_17(cc.children("form")):_17(cc);
cc.append("<div class=\"layout-split-proxy-h\"></div><div class=\"layout-split-proxy-v\"></div>");
cc.bind("_resize",function(e,_19){
var _1a=$.data(_16,"layout").options;
if(_1a.fit==true||_19){
_2(_16);
}
return false;
});
};
function _1b(_1c,_1d,el){
_1d.region=_1d.region||"center";
var _1e=$.data(_1c,"layout").panels;
var cc=$(_1c);
var dir=_1d.region;
if(_1e[dir].length){
return;
}
var pp=$(el);
if(!pp.length){
pp=$("<div></div>").appendTo(cc);
}
var _1f=$.extend({},$.fn.layout.paneldefaults,{width:(pp.length?parseInt(pp[0].style.width)||pp.outerWidth():"auto"),height:(pp.length?parseInt(pp[0].style.height)||pp.outerHeight():"auto"),doSize:false,collapsible:true,cls:("layout-panel layout-panel-"+dir),bodyCls:"layout-body",onOpen:function(){
var _20=$(this).panel("header").children("div.panel-tool");
_20.children("a.panel-tool-collapse").hide();
var _21={north:"up",south:"down",east:"right",west:"left"};
if(!_21[dir]){
return;
}
var _22="layout-button-"+_21[dir];
var t=_20.children("a."+_22);
if(!t.length){
t=$("<a href=\"javascript:void(0)\"></a>").addClass(_22).appendTo(_20);
t.bind("click",{dir:dir},function(e){
_2f(_1c,e.data.dir);
return false;
});
}
$(this).panel("options").collapsible?t.show():t.hide();
}},_1d);
pp.panel(_1f);
_1e[dir]=pp;



if(pp.panel("options").split || pp.panel("options").minSplit){

//min-split 扩展
var panel = pp.panel("panel");
panel.addClass("layout-split-" + dir);
if(pp.panel("options").minSplit){
	panel.addClass("layout-min-split");
	panel.append('<a class="layout-button-left" href="javascript:void(0)"></a>');
}
//min-split 扩展 end

var _23=pp.panel("panel");
_23.addClass("layout-split-"+dir);
var _24="";
if(dir=="north"){
_24="s";
}
if(dir=="south"){
_24="n";
}
if(dir=="east"){
_24="w";
}
if(dir=="west"){
_24="e";
}
$('.layout-button-left,.layout-button-right,.layout-button-down,.layout-button-up').mousedown(function(){
	return false;
});
_23.resizable($.extend({},{handles:_24,onStartResize:function(e){
_1=true;
if(dir=="north"||dir=="south"){
var _25=$(">div.layout-split-proxy-v",_1c);
}else{
var _25=$(">div.layout-split-proxy-h",_1c);
}
var top=0,_26=0,_27=0,_28=0;
var pos={display:"block"};
if(dir=="north"){
pos.top=parseInt(_23.css("top"))+_23.outerHeight()-_25.height();
pos.left=parseInt(_23.css("left"));
pos.width=_23.outerWidth();
pos.height=_25.height();
}else{
if(dir=="south"){
pos.top=parseInt(_23.css("top"));
pos.left=parseInt(_23.css("left"));
pos.width=_23.outerWidth();
pos.height=_25.height();
}else{
if(dir=="east"){
pos.top=parseInt(_23.css("top"))||0;
pos.left=parseInt(_23.css("left"))||0;
pos.width=_25.width();
pos.height=_23.outerHeight();
}else{
if(dir=="west"){
pos.top=parseInt(_23.css("top"))||0;
pos.left=_23.outerWidth()-_25.width();
pos.width=_25.width();
pos.height=_23.outerHeight();
}
}
}
}
_25.css(pos);
$("<div class=\"layout-mask\"></div>").css({left:0,top:0,width:cc.width(),height:cc.height()}).appendTo(cc);
},onResize:function(e){
if(dir=="north"||dir=="south"){
var _29=$(">div.layout-split-proxy-v",_1c);
_29.css("top",e.pageY-$(_1c).offset().top-_29.height()/2);
}else{
var _29=$(">div.layout-split-proxy-h",_1c);
_29.css("left",e.pageX-$(_1c).offset().left-_29.width()/2);
}
return false;
},onStopResize:function(e){
cc.children("div.layout-split-proxy-v,div.layout-split-proxy-h").hide();
pp.panel("resize",e.data);
_2(_1c);
_1=false;
cc.find(">div.layout-mask").remove();
}},_1d));
}
};
function _2a(_2b,_2c){
var _2d=$.data(_2b,"layout").panels;
if(_2d[_2c].length){
_2d[_2c].panel("destroy");
_2d[_2c]=$();
var _2e="expand"+_2c.substring(0,1).toUpperCase()+_2c.substring(1);
if(_2d[_2e]){
_2d[_2e].panel("destroy");
_2d[_2e]=undefined;
}
}
};
function _2f(_30,_31,_32){
if(_32==undefined){
_32=150;
}
var _33=$.data(_30,"layout").panels;
var p=_33[_31];
var _34=p.panel("options");
if(_34.onBeforeCollapse.call(p)==false){
return;
}
var _35="expand"+_31.substring(0,1).toUpperCase()+_31.substring(1);
if(!_33[_35]){
_33[_35]=_36(_31);
_33[_35].panel("panel").bind("click",function(){
var _37=_38();
p.panel("expand",false).panel("open").panel("resize",_37.collapse);
p.panel("panel").animate(_37.expand,function(){
$(this).unbind(".layout").bind("mouseleave.layout",{region:_31},function(e){
if(_1==true){
return;
}
_2f(_30,e.data.region);
});
});
return false;
});
}
var _39=_38();
if(!_9(_33[_35])){
_33.center.panel("resize",_39.resizeC);
}
p.panel("panel").animate(_39.collapse,_32,function(){
p.panel("collapse",false).panel("close");
_33[_35].panel("open").panel("resize",_39.expandP);
$(this).unbind(".layout");
});
function _36(dir){
var _3a;
if(dir=="east"){
_3a="layout-button-left";
}else{
if(dir=="west"){
_3a="layout-button-right";
}else{
if(dir=="north"){
_3a="layout-button-down";
}else{
if(dir=="south"){
_3a="layout-button-up";
}
}
}
}
var p=$("<div></div>").appendTo(_30);

p.panel($.extend({},$.fn.layout.paneldefaults,{cls:("layout-expand layout-expand-"+dir),title:"&nbsp;",closed:true,doSize:false,tools:[{iconCls:_3a,handler:function(){
_3c(_30,_31);
return false;
}}]}));
if(_33[_31].panel("options").minSplit){
	p.panel("panel").addClass('layout-min-split layout-expand-'+_31);
}
p.panel("panel").hover(function(){
$(this).addClass("layout-expand-over");
},function(){
$(this).removeClass("layout-expand-over");
});
return p;
};
function _38(){
var splitWidth=28;
var cc=$(_30);
var _3b=_33.center.panel("options");
if(_31=="east"){
var _opts = _33["east"].panel("options");
if(_opts.minSplit){
	splitWidth=5;
}
var ww=_3b.width+_34.width-splitWidth;
if(_34.split||!_34.border || _34.minSplit){
ww++;
}
return {resizeC:{width:ww},expand:{left:cc.width()-_34.width},expandP:{top:_3b.top,left:cc.width()-splitWidth,width:splitWidth,height:_3b.height},collapse:{left:cc.width(),top:_3b.top,height:_3b.height}};
}else{
if(_31=="west"){
var _opts = _33["west"].panel("options");
if(_opts.minSplit){
	splitWidth=5;
}
var ww=_3b.width+_34.width-splitWidth;
if(_34.split||!_34.border || _34.minSplit){
ww++;
}
return {resizeC:{width:ww,left:splitWidth},expand:{left:0},expandP:{left:0,top:_3b.top,width:splitWidth,height:_3b.height},collapse:{left:-_34.width,top:_3b.top,height:_3b.height}};
}else{
if(_31=="north"){
var hh=_3b.height;
if(!_9(_33.expandNorth)){
hh+=_34.height-splitWidth+((_34.split||!_34.border)?1:0);
}
_33.east.add(_33.west).add(_33.expandEast).add(_33.expandWest).panel("resize",{top:splitWidth,height:hh});
return {resizeC:{top:splitWidth,height:hh},expand:{top:0},expandP:{top:0,left:0,width:cc.width(),height:splitWidth},collapse:{top:-_34.height,width:cc.width()}};
}else{
if(_31=="south"){
var _opts = _33["south"].panel("options");
if(_opts.minSplit){
	splitWidth=5;
}
var hh=_3b.height;
if(!_9(_33.expandSouth)){
hh+=_34.height-splitWidth+((_34.split||!_34.border)?1:0);
}
_33.east.add(_33.west).add(_33.expandEast).add(_33.expandWest).panel("resize",{height:hh});
return {resizeC:{height:hh},expand:{top:cc.height()-_34.height},expandP:{top:cc.height()-splitWidth,left:0,width:cc.width(),height:splitWidth},collapse:{top:cc.height(),width:cc.width()}};
}
}
}
}
};
};
function _3c(_3d,_3e){
var _3f=$.data(_3d,"layout").panels;
var p=_3f[_3e];
var _40=p.panel("options");
if(_40.onBeforeExpand.call(p)==false){
return;
}
var _41=_42();
var _43="expand"+_3e.substring(0,1).toUpperCase()+_3e.substring(1);
if(_3f[_43]){
_3f[_43].panel("close");
p.panel("panel").stop(true,true);
p.panel("expand",false).panel("open").panel("resize",_41.collapse);
p.panel("panel").animate(_41.expand,function(){
_2(_3d);
});
}
function _42(){
var cc=$(_3d);
var _44=_3f.center.panel("options");
if(_3e=="east"&&_3f.expandEast){
return {collapse:{left:cc.width(),top:_44.top,height:_44.height},expand:{left:cc.width()-_3f["east"].panel("options").width}};
}else{
if(_3e=="west"&&_3f.expandWest){
return {collapse:{left:-_3f["west"].panel("options").width,top:_44.top,height:_44.height},expand:{left:0}};
}else{
if(_3e=="north"&&_3f.expandNorth){
return {collapse:{top:-_3f["north"].panel("options").height,width:cc.width()},expand:{top:0}};
}else{
if(_3e=="south"&&_3f.expandSouth){
return {collapse:{top:cc.height(),width:cc.width()},expand:{top:cc.height()-_3f["south"].panel("options").height}};
}
}
}
}
};
};
function _9(pp){
if(!pp){
return false;
}
if(pp.length){
return pp.panel("panel").is(":visible");
}else{
return false;
}
};
function _45(_46){
var _47=$.data(_46,"layout").panels;
if(_47.east.length&&_47.east.panel("options").collapsed){
_2f(_46,"east",0);
}
if(_47.west.length&&_47.west.panel("options").collapsed){
_2f(_46,"west",0);
}
if(_47.north.length&&_47.north.panel("options").collapsed){
_2f(_46,"north",0);
}
if(_47.south.length&&_47.south.panel("options").collapsed){
_2f(_46,"south",0);
}
};
$.fn.layout=function(_48,_49){
if(typeof _48=="string"){
return $.fn.layout.methods[_48](this,_49);
}
_48=_48||{};
return this.each(function(){
var _4a=$.data(this,"layout");
if(_4a){
$.extend(_4a.options,_48);
}else{
var _4b=$.extend({},$.fn.layout.defaults,$.fn.layout.parseOptions(this),_48);
$.data(this,"layout",{options:_4b,panels:{center:$(),north:$(),south:$(),east:$(),west:$()}});
_15(this);
}
_2(this);
_45(this);
});
};
$.fn.layout.methods={resize:function(jq){
return jq.each(function(){
_2(this);
});
},panel:function(jq,_4c){
return $.data(jq[0],"layout").panels[_4c];
},collapse:function(jq,_4d){
return jq.each(function(){
_2f(this,_4d);
});
},expand:function(jq,_4e){
return jq.each(function(){
_3c(this,_4e);
});
},add:function(jq,_4f){
return jq.each(function(){
_1b(this,_4f);
_2(this);
if($(this).layout("panel",_4f.region).panel("options").collapsed){
_2f(this,_4f.region,0);
}
});
},remove:function(jq,_50){
return jq.each(function(){
_2a(this,_50);
_2(this);
});
}};
$.fn.layout.parseOptions=function(_51){
return $.extend({},$.parser.parseOptions(_51,[{fit:"boolean"}]));
};
$.fn.layout.defaults={fit:false};
$.fn.layout.parsePanelOptions=function(_52){
var t=$(_52);
return $.extend({},$.fn.panel.parseOptions(_52),$.parser.parseOptions(_52,["region",{split:"boolean",minWidth:"number",minHeight:"number",maxWidth:"number",maxHeight:"number"}]));
};
$.fn.layout.paneldefaults=$.extend({},$.fn.panel.defaults,{region:null,split:false,minWidth:0,minHeight:0,maxWidth:10000,maxHeight:10000});
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"linkbutton").options;
var t=$(_2);
t.addClass("l-btn").removeClass("l-btn-plain l-btn-selected l-btn-plain-selected");
if(_3.plain){
t.addClass("l-btn-plain");
}
if(_3.selected){
t.addClass(_3.plain?"l-btn-selected l-btn-plain-selected":"l-btn-selected");
}
t.attr("group",_3.group||"");
t.attr("id",_3.id||"");
t.html("<span class=\"l-btn-left\">"+"<span class=\"l-btn-text\"></span>"+"</span>");
if(_3.text){
t.find(".l-btn-text").html(_3.text);
if(_3.iconCls){
t.find(".l-btn-text").addClass(_3.iconCls).addClass(_3.iconAlign=="left"?"l-btn-icon-left":"l-btn-icon-right");
}
}else{
t.find(".l-btn-text").html("<span class=\"l-btn-empty\">&nbsp;</span>");
if(_3.iconCls){
t.find(".l-btn-empty").addClass(_3.iconCls);
}
}
t.unbind(".linkbutton").bind("focus.linkbutton",function(){
if(!_3.disabled){
$(this).find(".l-btn-text").addClass("l-btn-focus");
}
}).bind("blur.linkbutton",function(){
$(this).find(".l-btn-text").removeClass("l-btn-focus");
});
if(_3.toggle&&!_3.disabled){
t.bind("click.linkbutton",function(){
if(_3.selected){
$(this).linkbutton("unselect");
}else{
$(this).linkbutton("select");
}
});
}
_4(_2,_3.selected);
_5(_2,_3.disabled);
};
function _4(_6,_7){
var _8=$.data(_6,"linkbutton").options;
if(_7){
if(_8.group){
$("a.l-btn[group=\""+_8.group+"\"]").each(function(){
var o=$(this).linkbutton("options");
if(o.toggle){
$(this).removeClass("l-btn-selected l-btn-plain-selected");
o.selected=false;
}
});
}
$(_6).addClass(_8.plain?"l-btn-selected l-btn-plain-selected":"l-btn-selected");
_8.selected=true;
}else{
if(!_8.group){
$(_6).removeClass("l-btn-selected l-btn-plain-selected");
_8.selected=false;
}
}
};
function _5(_9,_a){
var _b=$.data(_9,"linkbutton");
var _c=_b.options;
$(_9).removeClass("l-btn-disabled l-btn-plain-disabled");
if(_a){
_c.disabled=true;
var _d=$(_9).attr("href");
if(_d){
_b.href=_d;
$(_9).attr("href","javascript:void(0)");
}
if(_9.onclick){
_b.onclick=_9.onclick;
_9.onclick=null;
}
_c.plain?$(_9).addClass("l-btn-disabled l-btn-plain-disabled"):$(_9).addClass("l-btn-disabled");
}else{
_c.disabled=false;
if(_b.href){
$(_9).attr("href",_b.href);
}
if(_b.onclick){
_9.onclick=_b.onclick;
}
}
};
$.fn.linkbutton=function(_e,_f){
if(typeof _e=="string"){
return $.fn.linkbutton.methods[_e](this,_f);
}
_e=_e||{};
return this.each(function(){
var _10=$.data(this,"linkbutton");
if(_10){
$.extend(_10.options,_e);
}else{
$.data(this,"linkbutton",{options:$.extend({},$.fn.linkbutton.defaults,$.fn.linkbutton.parseOptions(this),_e)});
$(this).removeAttr("disabled");
}
_1(this);
});
};
$.fn.linkbutton.methods={options:function(jq){
return $.data(jq[0],"linkbutton").options;
},enable:function(jq){
return jq.each(function(){
_5(this,false);
});
},disable:function(jq){
return jq.each(function(){
_5(this,true);
});
},select:function(jq){
return jq.each(function(){
_4(this,true);
});
},unselect:function(jq){
return jq.each(function(){
_4(this,false);
});
}};
$.fn.linkbutton.parseOptions=function(_11){
var t=$(_11);
return $.extend({},$.parser.parseOptions(_11,["id","iconCls","iconAlign","group",{plain:"boolean",toggle:"boolean",selected:"boolean"}]),{disabled:(t.attr("disabled")?true:undefined),text:$.trim(t.html()),iconCls:(t.attr("icon")||t.attr("iconCls"))});
};
$.fn.linkbutton.defaults={id:null,disabled:false,toggle:false,selected:false,group:null,plain:false,text:"",iconCls:null,iconAlign:"left"};
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"pagination");
var _4=_3.options;
var bb=_3.bb={};
var _5=$(_2).addClass("pagination").html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr></tr></table>");
var tr=_5.find("tr");
var aa=$.extend([],_4.layout);
if(!_4.showPageList){
_6(aa,"list");
}
if(!_4.showRefresh){
_6(aa,"refresh");
}
if(aa[0]=="sep"){
aa.shift();
}
if(aa[aa.length-1]=="sep"){
aa.pop();
}
for(var _7=0;_7<aa.length;_7++){
var _8=aa[_7];
if(_8=="list"){
var ps=$("<select class=\"pagination-page-list\"></select>");
ps.bind("change",function(){
_4.pageSize=parseInt($(this).val());
_4.onChangePageSize.call(_2,_4.pageSize);
_10(_2,_4.pageNumber);
});
for(var i=0;i<_4.pageList.length;i++){
$("<option></option>").text(_4.pageList[i]).appendTo(ps);
}
$("<td></td>").append(ps).appendTo(tr);
}else{
if(_8=="sep"){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
}else{
if(_8=="first"){
bb.first=_9("first");
}else{
if(_8=="prev"){
bb.prev=_9("prev");
}else{
if(_8=="next"){
bb.next=_9("next");
}else{
if(_8=="last"){
bb.last=_9("last");
}else{
if(_8=="manual"){
$("<span style=\"padding-left:6px;\"></span>").html(_4.beforePageText).appendTo(tr).wrap("<td></td>");
bb.num=$("<input class=\"pagination-num\" type=\"text\" value=\"1\" size=\"2\">").appendTo(tr).wrap("<td></td>");
bb.num.unbind(".pagination").bind("keydown.pagination",function(e){
if(e.keyCode==13){
var _a=parseInt($(this).val())||1;
_10(_2,_a);
return false;
}
});
bb.after=$("<span style=\"padding-right:6px;\"></span>").appendTo(tr).wrap("<td></td>");
}else{
if(_8=="refresh"){
bb.refresh=_9("refresh");
}else{
if(_8=="links"){
$("<td class=\"pagination-links\"></td>").appendTo(tr);
}
}
}
}
}
}
}
}
}
}
if(_4.buttons){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
if($.isArray(_4.buttons)){
for(var i=0;i<_4.buttons.length;i++){
var _b=_4.buttons[i];
if(_b=="-"){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
var a=$("<a href=\"javascript:void(0)\"></a>").appendTo(td);
a[0].onclick=eval(_b.handler||function(){
});
a.linkbutton($.extend({},_b,{plain:true}));
}
}
}else{
var td=$("<td></td>").appendTo(tr);
$(_4.buttons).appendTo(td).show();
}
}
$("<div class=\"pagination-info\"></div>").appendTo(_5);
$("<div style=\"clear:both;\"></div>").appendTo(_5);
function _9(_c){
var _d=_4.nav[_c];
var a=$("<a href=\"javascript:void(0)\"></a>").appendTo(tr);
a.wrap("<td></td>");
a.linkbutton({iconCls:_d.iconCls,plain:true}).unbind(".pagination").bind("click.pagination",function(){
_d.handler.call(_2);
});
return a;
};
function _6(aa,_e){
var _f=$.inArray(_e,aa);
if(_f>=0){
aa.splice(_f,1);
}
return aa;
};
};
function _10(_11,_12){
var _13=$.data(_11,"pagination").options;
_14(_11,{pageNumber:_12});
_13.onSelectPage.call(_11,_13.pageNumber,_13.pageSize);
};
function _14(_15,_16){
var _17=$.data(_15,"pagination");
var _18=_17.options;
var bb=_17.bb;
$.extend(_18,_16||{});
var ps=$(_15).find("select.pagination-page-list");
if(ps.length){
ps.val(_18.pageSize+"");
_18.pageSize=parseInt(ps.val());
}
var _19=Math.ceil(_18.total/_18.pageSize)||1;
if(_18.pageNumber<1){
_18.pageNumber=1;
}
if(_18.pageNumber>_19){
_18.pageNumber=_19;
}
if(bb.num){
bb.num.val(_18.pageNumber);
}
if(bb.after){
bb.after.html(_18.afterPageText.replace(/{pages}/,_19));
}
var td=$(_15).find("td.pagination-links");
if(td.length){
td.empty();
var _1a=_18.pageNumber-Math.floor(_18.links/2);
if(_1a<1){
_1a=1;
}
var _1b=_1a+_18.links-1;
if(_1b>_19){
_1b=_19;
}
_1a=_1b-_18.links+1;
if(_1a<1){
_1a=1;
}
for(var i=_1a;i<=_1b;i++){
var a=$("<a class=\"pagination-link\" href=\"javascript:void(0)\"></a>").appendTo(td);
a.linkbutton({plain:true,text:i});
if(i==_18.pageNumber){
a.linkbutton("select");
}else{
a.unbind(".pagination").bind("click.pagination",{pageNumber:i},function(e){
_10(_15,e.data.pageNumber);
});
}
}
}
var _1c=_18.displayMsg;
_1c=_1c.replace(/{from}/,_18.total==0?0:_18.pageSize*(_18.pageNumber-1)+1);
_1c=_1c.replace(/{to}/,Math.min(_18.pageSize*(_18.pageNumber),_18.total));
_1c=_1c.replace(/{total}/,_18.total);
$(_15).find("div.pagination-info").html(_1c);
if(bb.first){
bb.first.linkbutton({disabled:(_18.pageNumber==1)});
}
if(bb.prev){
bb.prev.linkbutton({disabled:(_18.pageNumber==1)});
}
if(bb.next){
bb.next.linkbutton({disabled:(_18.pageNumber==_19)});
}
if(bb.last){
bb.last.linkbutton({disabled:(_18.pageNumber==_19)});
}
_1d(_15,_18.loading);
};
function _1d(_1e,_1f){
var _20=$.data(_1e,"pagination");
var _21=_20.options;
_21.loading=_1f;
if(_21.showRefresh&&_20.bb.refresh){
_20.bb.refresh.linkbutton({iconCls:(_21.loading?"pagination-loading":"pagination-load")});
}
};
$.fn.pagination=function(_22,_23){
if(typeof _22=="string"){
return $.fn.pagination.methods[_22](this,_23);
}
_22=_22||{};
return this.each(function(){
var _24;
var _25=$.data(this,"pagination");
if(_25){
_24=$.extend(_25.options,_22);
}else{
_24=$.extend({},$.fn.pagination.defaults,$.fn.pagination.parseOptions(this),_22);
$.data(this,"pagination",{options:_24});
}
_1(this);
_14(this);
});
};
$.fn.pagination.methods={options:function(jq){
return $.data(jq[0],"pagination").options;
},loading:function(jq){
return jq.each(function(){
_1d(this,true);
});
},loaded:function(jq){
return jq.each(function(){
_1d(this,false);
});
},refresh:function(jq,_26){
return jq.each(function(){
_14(this,_26);
});
},select:function(jq,_27){
return jq.each(function(){
_10(this,_27);
});
}};
$.fn.pagination.parseOptions=function(_28){
var t=$(_28);
return $.extend({},$.parser.parseOptions(_28,[{total:"number",pageSize:"number",pageNumber:"number",links:"number"},{loading:"boolean",showPageList:"boolean",showRefresh:"boolean"}]),{pageList:(t.attr("pageList")?eval(t.attr("pageList")):undefined)});
};
$.fn.pagination.defaults={total:1,pageSize:10,pageNumber:1,pageList:[10,20,30,50],loading:false,buttons:null,showPageList:true,showRefresh:true,links:10,layout:["list","sep","first","prev","sep","manual","sep","next","last","sep","refresh"],onSelectPage:function(_29,_2a){
},onBeforeRefresh:function(_2b,_2c){
},onRefresh:function(_2d,_2e){
},onChangePageSize:function(_2f){
},beforePageText:"Page",afterPageText:"of {pages}",displayMsg:"Displaying {from} to {to} of {total} items",nav:{first:{iconCls:"pagination-first",handler:function(){
var _30=$(this).pagination("options");
if(_30.pageNumber>1){
$(this).pagination("select",1);
}
}},prev:{iconCls:"pagination-prev",handler:function(){
var _31=$(this).pagination("options");
if(_31.pageNumber>1){
$(this).pagination("select",_31.pageNumber-1);
}
}},next:{iconCls:"pagination-next",handler:function(){
var _32=$(this).pagination("options");
var _33=Math.ceil(_32.total/_32.pageSize);
if(_32.pageNumber<_33){
$(this).pagination("select",_32.pageNumber+1);
}
}},last:{iconCls:"pagination-last",handler:function(){
var _34=$(this).pagination("options");
var _35=Math.ceil(_34.total/_34.pageSize);
if(_34.pageNumber<_35){
$(this).pagination("select",_35);
}
}},refresh:{iconCls:"pagination-refresh",handler:function(){
var _36=$(this).pagination("options");
if(_36.onBeforeRefresh.call(this,_36.pageNumber,_36.pageSize)!=false){
$(this).pagination("select",_36.pageNumber);
_36.onRefresh.call(this,_36.pageNumber,_36.pageSize);
}
}}}};
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
var _1=0;
function _2(a,o){
for(var i=0,_3=a.length;i<_3;i++){
if(a[i]==o){
return i;
}
}
return -1;
};
function _4(a,o,id){
if(typeof o=="string"){
for(var i=0,_5=a.length;i<_5;i++){
if(a[i][o]==id){
a.splice(i,1);
return;
}
}
}else{
var _6=_2(a,o);
if(_6!=-1){
a.splice(_6,1);
}
}
};
function _7(a,o,r){
for(var i=0,_8=a.length;i<_8;i++){
if(a[i][o]==r[o]){
return;
}
}
a.push(r);
};
function _9(_a){
var cc=_a||$("head");
var _b=$.data(cc[0],"ss");
if(!_b){
_b=$.data(cc[0],"ss",{cache:{},dirty:[]});
}
return {add:function(_c){
var ss=["<style type=\"text/css\">"];
for(var i=0;i<_c.length;i++){
_b.cache[_c[i][0]]={width:_c[i][1]};
}
var _d=0;
for(var s in _b.cache){
var _e=_b.cache[s];
_e.index=_d++;
ss.push(s+"{width:"+_e.width+"}");
}
ss.push("</style>");
$(ss.join("\n")).appendTo(cc);
setTimeout(function(){
cc.children("style:not(:last)").remove();
},0);
},getRule:function(_f){
var _10=cc.children("style:last")[0];
var _11=_10.styleSheet?_10.styleSheet:(_10.sheet||document.styleSheets[document.styleSheets.length-1]);
var _12=_11.cssRules||_11.rules;
return _12[_f];
},set:function(_13,_14){
var _15=_b.cache[_13];
if(_15){
_15.width=_14;
var _16=this.getRule(_15.index);
if(_16){
_16.style["width"]=_14;
}
}
},remove:function(_17){
var tmp=[];
for(var s in _b.cache){
if(s.indexOf(_17)==-1){
tmp.push([s,_b.cache[s].width]);
}
}
_b.cache={};
this.add(tmp);
},dirty:function(_18){
if(_18){
_b.dirty.push(_18);
}
},clean:function(){
for(var i=0;i<_b.dirty.length;i++){
this.remove(_b.dirty[i]);
}
_b.dirty=[];
}};
};
function _19(_1a,_1b){
var _1c=$.data(_1a,"datagrid").options;
var _1d=$.data(_1a,"datagrid").panel;
if(_1b){
if(_1b.width){
_1c.width=_1b.width;
}
if(_1b.height){
_1c.height=_1b.height;
}
}
if(_1c.fit==true){
var p=_1d.panel("panel").parent();
_1c.width=p.width();
_1c.height=p.height();
}
_1d.panel("resize",{width:_1c.width,height:_1c.height});
};
function _1e(_1f){
var _20=$.data(_1f,"datagrid").options;
var dc=$.data(_1f,"datagrid").dc;
var _21=$.data(_1f,"datagrid").panel;
var _22=_21.width();
var _23=_21.height();
var _24=dc.view;
var _25=dc.view1;
var _26=dc.view2;
var _27=_25.children("div.datagrid-header");
var _28=_26.children("div.datagrid-header");
var _29=_27.find("table");
var _2a=_28.find("table");
_24.width(_22);
var _2b=_27.children("div.datagrid-header-inner").show();
_25.width(_2b.find("table").width());
if(!_20.showHeader){
_2b.hide();
}
_26.width(_22-_25._outerWidth());
_25.children("div.datagrid-header,div.datagrid-body,div.datagrid-footer").width(_25.width());
_26.children("div.datagrid-header,div.datagrid-body,div.datagrid-footer").width(_26.width());
var hh;
_27.css("height","");
_28.css("height","");
_29.css("height","");
_2a.css("height","");
hh=Math.max(_29.height(),_2a.height());
_29.height(hh);
_2a.height(hh);
_27.add(_28)._outerHeight(hh);
if(_20.height!="auto"){
var _2c=_23-_26.children("div.datagrid-header")._outerHeight()-_26.children("div.datagrid-footer")._outerHeight()-_21.children("div.datagrid-toolbar")._outerHeight();
_21.children("div.datagrid-pager").each(function(){
_2c-=$(this)._outerHeight();
});
dc.body1.add(dc.body2).children("table.datagrid-btable-frozen").css({position:"absolute",top:dc.header2._outerHeight()});
var _2d=dc.body2.children("table.datagrid-btable-frozen")._outerHeight();
_25.add(_26).children("div.datagrid-body").css({marginTop:_2d,height:(_2c-_2d)});
}
_24.height(_26.height());
};
function _2e(_2f,_30,_31){
var _32=$.data(_2f,"datagrid").data.rows;
var _33=$.data(_2f,"datagrid").options;
var dc=$.data(_2f,"datagrid").dc;
if(!dc.body1.is(":empty")&&(!_33.nowrap||_33.autoRowHeight||_31)){
if(_30!=undefined){
var tr1=_33.finder.getTr(_2f,_30,"body",1);
var tr2=_33.finder.getTr(_2f,_30,"body",2);
_34(tr1,tr2);
}else{
var tr1=_33.finder.getTr(_2f,0,"allbody",1);
var tr2=_33.finder.getTr(_2f,0,"allbody",2);
_34(tr1,tr2);
if(_33.showFooter){
var tr1=_33.finder.getTr(_2f,0,"allfooter",1);
var tr2=_33.finder.getTr(_2f,0,"allfooter",2);
_34(tr1,tr2);
}
}
}
_1e(_2f);
if(_33.height=="auto"){
var _35=dc.body1.parent();
var _36=dc.body2;
var _37=_38(_36);
var _39=_37.height;
if(_37.width>_36.width()){
_39+=18;
}
_35.height(_39);
_36.height(_39);
dc.view.height(dc.view2.height());
}
dc.body2.triggerHandler("scroll");
function _34(_3a,_3b){
for(var i=0;i<_3b.length;i++){
var tr1=$(_3a[i]);
var tr2=$(_3b[i]);
tr1.css("height","");
tr2.css("height","");
var _3c=Math.max(tr1.height(),tr2.height());
tr1.css("height",_3c);
tr2.css("height",_3c);
}
};
function _38(cc){
var _3d=0;
var _3e=0;
$(cc).children().each(function(){
var c=$(this);
if(c.is(":visible")){
_3e+=c._outerHeight();
if(_3d<c._outerWidth()){
_3d=c._outerWidth();
}
}
});
return {width:_3d,height:_3e};
};
};
function _3f(_40,_41){
var _42=$.data(_40,"datagrid");
var _43=_42.options;
var dc=_42.dc;
if(!dc.body2.children("table.datagrid-btable-frozen").length){
dc.body1.add(dc.body2).prepend("<table class=\"datagrid-btable datagrid-btable-frozen\" cellspacing=\"0\" cellpadding=\"0\"></table>");
}
_44(true);
_44(false);
_1e(_40);
function _44(_45){
var _46=_45?1:2;
var tr=_43.finder.getTr(_40,_41,"body",_46);
(_45?dc.body1:dc.body2).children("table.datagrid-btable-frozen").append(tr);
};
};
function _47(_48,_49){
function _4a(){
var _4b=[];
var _4c=[];
$(_48).children("thead").each(function(){
var opt=$.parser.parseOptions(this,[{frozen:"boolean"}]);
$(this).find("tr").each(function(){
var _4d=[];
$(this).find("th").each(function(){
var th=$(this);
var col=$.extend({},$.parser.parseOptions(this,["field","align","halign","order",{sortable:"boolean",checkbox:"boolean",resizable:"boolean",fixed:"boolean"},{rowspan:"number",colspan:"number",width:"number"}]),{title:(th.html()||undefined),hidden:(th.attr("hidden")?true:undefined),formatter:(th.attr("formatter")?eval(th.attr("formatter")):undefined),styler:(th.attr("styler")?eval(th.attr("styler")):undefined),sorter:(th.attr("sorter")?eval(th.attr("sorter")):undefined)});
if(th.attr("editor")){
var s=$.trim(th.attr("editor"));
if(s.substr(0,1)=="{"){
col.editor=eval("("+s+")");
}else{
col.editor=s;
}
}
_4d.push(col);
});
opt.frozen?_4b.push(_4d):_4c.push(_4d);
});
});
return [_4b,_4c];
};
var _4e=$("<div class=\"datagrid-wrap\">"+"<div class=\"datagrid-view\">"+"<div class=\"datagrid-view1\">"+"<div class=\"datagrid-header\">"+"<div class=\"datagrid-header-inner\"></div>"+"</div>"+"<div class=\"datagrid-body\">"+"<div class=\"datagrid-body-inner\"></div>"+"</div>"+"<div class=\"datagrid-footer\">"+"<div class=\"datagrid-footer-inner\"></div>"+"</div>"+"</div>"+"<div class=\"datagrid-view2\">"+"<div class=\"datagrid-header\">"+"<div class=\"datagrid-header-inner\"></div>"+"</div>"+"<div class=\"datagrid-body\"></div>"+"<div class=\"datagrid-footer\">"+"<div class=\"datagrid-footer-inner\"></div>"+"</div>"+"</div>"+"</div>"+"</div>").insertAfter(_48);
_4e.panel({doSize:false});
_4e.panel("panel").addClass("datagrid").bind("_resize",function(e,_4f){
var _50=$.data(_48,"datagrid").options;
if(_50.fit==true||_4f){
_19(_48);
setTimeout(function(){
if($.data(_48,"datagrid")){
_51(_48);
}
},0);
}
return false;
});
$(_48).hide().appendTo(_4e.children("div.datagrid-view"));
var cc=_4a();
var _52=_4e.children("div.datagrid-view");
var _53=_52.children("div.datagrid-view1");
var _54=_52.children("div.datagrid-view2");
var _55=_4e.closest("div.datagrid-view");
if(!_55.length){
_55=_52;
}
var ss=_9(_55);
return {panel:_4e,frozenColumns:cc[0],columns:cc[1],dc:{view:_52,view1:_53,view2:_54,header1:_53.children("div.datagrid-header").children("div.datagrid-header-inner"),header2:_54.children("div.datagrid-header").children("div.datagrid-header-inner"),body1:_53.children("div.datagrid-body").children("div.datagrid-body-inner"),body2:_54.children("div.datagrid-body"),footer1:_53.children("div.datagrid-footer").children("div.datagrid-footer-inner"),footer2:_54.children("div.datagrid-footer").children("div.datagrid-footer-inner")},ss:ss};
};
function _56(_57){
var _58=$.data(_57,"datagrid");
var _59=_58.options;
var dc=_58.dc;
var _5a=_58.panel;
_5a.panel($.extend({},_59,{id:null,doSize:false,onResize:function(_5b,_5c){
setTimeout(function(){
if($.data(_57,"datagrid")){
_1e(_57);
_8d(_57);
_59.onResize.call(_5a,_5b,_5c);
}
},0);
},onExpand:function(){
_2e(_57);
_59.onExpand.call(_5a);
}}));
_58.rowIdPrefix="datagrid-row-r"+(++_1);
_58.cellClassPrefix="datagrid-cell-c"+_1;
_5d(dc.header1,_59.frozenColumns,true);
_5d(dc.header2,_59.columns,false);
_5e();
dc.header1.add(dc.header2).css("display",_59.showHeader?"block":"none");
dc.footer1.add(dc.footer2).css("display",_59.showFooter?"block":"none");
if(_59.toolbar){
if($.isArray(_59.toolbar)){
$("div.datagrid-toolbar",_5a).remove();
var tb=$("<div class=\"datagrid-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(_5a);
var tr=tb.find("tr");
for(var i=0;i<_59.toolbar.length;i++){
var btn=_59.toolbar[i];
if(btn=="-"){
$("<td><div class=\"datagrid-btn-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
var _5f=$("<a href=\"javascript:void(0)\"></a>").appendTo(td);
_5f[0].onclick=eval(btn.handler||function(){
});
_5f.linkbutton($.extend({},btn,{plain:true}));
}
}
}else{
$(_59.toolbar).addClass("datagrid-toolbar").prependTo(_5a);
$(_59.toolbar).show();
}
}else{
$("div.datagrid-toolbar",_5a).remove();
}
$("div.datagrid-pager",_5a).remove();
if(_59.pagination){
var _60=$("<div class=\"datagrid-pager\"></div>");
if(_59.pagePosition=="bottom"){
_60.appendTo(_5a);
}else{
if(_59.pagePosition=="top"){
_60.addClass("datagrid-pager-top").prependTo(_5a);
}else{
var _61=$("<div class=\"datagrid-pager datagrid-pager-top\"></div>").prependTo(_5a);
_60.appendTo(_5a);
_60=_60.add(_61);
}
}
_60.pagination({total:(_59.pageNumber*_59.pageSize),pageNumber:_59.pageNumber,pageSize:_59.pageSize,pageList:_59.pageList,onSelectPage:function(_62,_63){
_59.pageNumber=_62;
_59.pageSize=_63;
_60.pagination("refresh",{pageNumber:_62,pageSize:_63});
_16b(_57);
}});
_59.pageSize=_60.pagination("options").pageSize;
}
function _5d(_64,_65,_66){
if(!_65){
return;
}
$(_64).show();
$(_64).empty();
var _67=[];
var _68=[];
if(_59.sortName){
_67=_59.sortName.split(",");
_68=_59.sortOrder.split(",");
}
var t=$("<table class=\"datagrid-htable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody></tbody></table>").appendTo(_64);
for(var i=0;i<_65.length;i++){
var tr=$("<tr class=\"datagrid-header-row\"></tr>").appendTo($("tbody",t));
var _69=_65[i];
for(var j=0;j<_69.length;j++){
var col=_69[j];
var _6a="";
if(col.rowspan){
_6a+="rowspan=\""+col.rowspan+"\" ";
}
if(col.colspan){
_6a+="colspan=\""+col.colspan+"\" ";
}
var td=$("<td "+_6a+"></td>").appendTo(tr);
if(col.checkbox){
td.attr("field",col.field);
$("<div class=\"datagrid-header-check\"></div>").html("<input type=\"checkbox\"/>").appendTo(td);
}else{
if(col.field){
td.attr("field",col.field);
td.append("<div class=\"datagrid-cell\"><span></span><span class=\"datagrid-sort-icon\"></span></div>");
$("span",td).html(col.title);
$("span.datagrid-sort-icon",td).html("&nbsp;");
var _6b=td.find("div.datagrid-cell");
var pos=_2(_67,col.field);
if(pos>=0){
_6b.addClass("datagrid-sort-"+_68[pos]);
}
if(col.resizable==false){
_6b.attr("resizable","false");
}
if(col.width){
_6b._outerWidth(col.width);
col.boxWidth=parseInt(_6b[0].style.width);
}else{
col.auto=true;
}
_6b.css("text-align",(col.halign||col.align||""));
col.cellClass=_58.cellClassPrefix+"-"+col.field.replace(/[\.|\s]/g,"-");
_6b.addClass(col.cellClass).css("width","");
}else{
$("<div class=\"datagrid-cell-group\"></div>").html(col.title).appendTo(td);
}
}
if(col.hidden){
td.hide();
}
}
}
if(_66&&_59.rownumbers){
var td=$("<td rowspan=\""+_59.frozenColumns.length+"\"><div class=\"datagrid-header-rownumber\"></div></td>");
if($("tr",t).length==0){
td.wrap("<tr class=\"datagrid-header-row\"></tr>").parent().appendTo($("tbody",t));
}else{
td.prependTo($("tr:first",t));
}
}
};
function _5e(){
var _6c=[];
var _6d=_6e(_57,true).concat(_6e(_57));
for(var i=0;i<_6d.length;i++){
var col=_6f(_57,_6d[i]);
if(col&&!col.checkbox){
_6c.push(["."+col.cellClass,col.boxWidth?col.boxWidth+"px":"auto"]);
}
}
_58.ss.add(_6c);
_58.ss.dirty(_58.cellSelectorPrefix);
_58.cellSelectorPrefix="."+_58.cellClassPrefix;
};
};
function _70(_71){
var _72=$.data(_71,"datagrid");
var _73=_72.panel;
var _74=_72.options;
var dc=_72.dc;
var _75=dc.header1.add(dc.header2);
_75.find("input[type=checkbox]").unbind(".datagrid").bind("click.datagrid",function(e){
if(_74.singleSelect&&_74.selectOnCheck){
return false;
}
if($(this).is(":checked")){
_106(_71);
}else{
_10c(_71);
}
e.stopPropagation();
});
var _76=_75.find("div.datagrid-cell");
_76.closest("td").unbind(".datagrid").bind("mouseenter.datagrid",function(){
if(_72.resizing){
return;
}
$(this).addClass("datagrid-header-over");
}).bind("mouseleave.datagrid",function(){
$(this).removeClass("datagrid-header-over");
}).bind("contextmenu.datagrid",function(e){
var _77=$(this).attr("field");
_74.onHeaderContextMenu.call(_71,e,_77);
});
_76.unbind(".datagrid").bind("click.datagrid",function(e){
var p1=$(this).offset().left+5;
var p2=$(this).offset().left+$(this)._outerWidth()-5;
if(e.pageX<p2&&e.pageX>p1){
var _78=$(this).parent().attr("field");
var col=_6f(_71,_78);
if(!col.sortable||_72.resizing){
return;
}
var _79=[];
var _7a=[];
if(_74.sortName){
_79=_74.sortName.split(",");
_7a=_74.sortOrder.split(",");
}
var pos=_2(_79,_78);
var _7b=col.order||"asc";
if(pos>=0){
$(this).removeClass("datagrid-sort-asc datagrid-sort-desc");
var _7c=_7a[pos]=="asc"?"desc":"asc";
if(_74.multiSort&&_7c==_7b){
_79.splice(pos,1);
_7a.splice(pos,1);
}else{
_7a[pos]=_7c;
$(this).addClass("datagrid-sort-"+_7c);
}
}else{
if(_74.multiSort){
_79.push(_78);
_7a.push(_7b);
}else{
_79=[_78];
_7a=[_7b];
_76.removeClass("datagrid-sort-asc datagrid-sort-desc");
}
$(this).addClass("datagrid-sort-"+_7b);
}
_74.sortName=_79.join(",");
_74.sortOrder=_7a.join(",");
if(_74.remoteSort){
_16b(_71);
}else{
var _7d=$.data(_71,"datagrid").data;
_c6(_71,_7d);
}
_74.onSortColumn.call(_71,_74.sortName,_74.sortOrder);
}
}).bind("dblclick.datagrid",function(e){
var p1=$(this).offset().left+5;
var p2=$(this).offset().left+$(this)._outerWidth()-5;
var _7e=_74.resizeHandle=="right"?(e.pageX>p2):(_74.resizeHandle=="left"?(e.pageX<p1):(e.pageX<p1||e.pageX>p2));
if(_7e){
var _7f=$(this).parent().attr("field");
var col=_6f(_71,_7f);
if(col.resizable==false){
return;
}
$(_71).datagrid("autoSizeColumn",_7f);
col.auto=false;
}
});
var _80=_74.resizeHandle=="right"?"e":(_74.resizeHandle=="left"?"w":"e,w");
_76.each(function(){
$(this).resizable({handles:_80,disabled:($(this).attr("resizable")?$(this).attr("resizable")=="false":false),minWidth:525,onStartResize:function(e){
_72.resizing=true;
_75.css("cursor",$("body").css("cursor"));
if(!_72.proxy){
_72.proxy=$("<div class=\"datagrid-resize-proxy\"></div>").appendTo(dc.view);
}
_72.proxy.css({left:e.pageX-$(_73).offset().left-1,display:"none"});
setTimeout(function(){
if(_72.proxy){
_72.proxy.show();
}
},500);
},onResize:function(e){
_72.proxy.css({left:e.pageX-$(_73).offset().left-1,display:"block"});
return false;
},onStopResize:function(e){
_75.css("cursor","");
$(this).css("height","");
$(this)._outerWidth($(this)._outerWidth());
var _81=$(this).parent().attr("field");
var col=_6f(_71,_81);
col.width=$(this)._outerWidth();
col.boxWidth=parseInt(this.style.width);
col.auto=undefined;
$(this).css("width","");
_51(_71,_81);
_72.proxy.remove();
_72.proxy=null;
if($(this).parents("div:first.datagrid-header").parent().hasClass("datagrid-view1")){
_1e(_71);
}
_8d(_71);
_74.onResizeColumn.call(_71,_81,col.width);
setTimeout(function(){
_72.resizing=false;
},0);
}});
});
dc.body1.add(dc.body2).unbind().bind("mouseover",function(e){
if(_72.resizing){
return;
}
var tr=$(e.target).closest("tr.datagrid-row");
if(!_82(tr)){
return;
}
var _83=_84(tr);
_eb(_71,_83);
e.stopPropagation();
}).bind("mouseout",function(e){
var tr=$(e.target).closest("tr.datagrid-row");
if(!_82(tr)){
return;
}
var _85=_84(tr);
_74.finder.getTr(_71,_85).removeClass("datagrid-row-over");
e.stopPropagation();
}).bind("click",function(e){
var tt=$(e.target);
var tr=tt.closest("tr.datagrid-row");
if(!_82(tr)){
return;
}
var _86=_84(tr);
if(tt.parent().hasClass("datagrid-cell-check")){
if(_74.singleSelect&&_74.selectOnCheck){
if(!_74.checkOnSelect){
_10c(_71,true);
}
_f8(_71,_86);
}else{
if(tt.is(":checked")){
_f8(_71,_86);
}else{
_100(_71,_86);
}
}
}else{
var row=_74.finder.getRow(_71,_86);
var td=tt.closest("td[field]",tr);
if(td.length){
var _87=td.attr("field");
_74.onClickCell.call(_71,_86,_87,row[_87]);
}
if(_74.singleSelect==true){
_f0(_71,_86);
}else{
if(tr.hasClass("datagrid-row-selected")){
_f9(_71,_86);
}else{
_f0(_71,_86);
}
}
_74.onClickRow.call(_71,_86,row);
}
e.stopPropagation();
}).bind("dblclick",function(e){
var tt=$(e.target);
var tr=tt.closest("tr.datagrid-row");
if(!_82(tr)){
return;
}
var _88=_84(tr);
var row=_74.finder.getRow(_71,_88);
var td=tt.closest("td[field]",tr);
if(td.length){
var _89=td.attr("field");
_74.onDblClickCell.call(_71,_88,_89,row[_89]);
}
_74.onDblClickRow.call(_71,_88,row);
e.stopPropagation();
}).bind("contextmenu",function(e){
var tr=$(e.target).closest("tr.datagrid-row");
if(!_82(tr)){
return;
}
var _8a=_84(tr);
var row=_74.finder.getRow(_71,_8a);
_74.onRowContextMenu.call(_71,e,_8a,row);
e.stopPropagation();
});
dc.body2.bind("scroll",function(){
var b1=dc.view1.children("div.datagrid-body");
b1.scrollTop($(this).scrollTop());
var c1=dc.body1.children(":first");
var c2=dc.body2.children(":first");
if(c1.length&&c2.length){
var _8b=c1.offset().top;
var _8c=c2.offset().top;
if(_8b!=_8c){
b1.scrollTop(b1.scrollTop()+_8b-_8c);
}
}
dc.view2.children("div.datagrid-header,div.datagrid-footer")._scrollLeft($(this)._scrollLeft());
dc.body2.children("table.datagrid-btable-frozen").css("left",-$(this)._scrollLeft());
});
function _84(tr){
if(tr.attr("datagrid-row-index")){
return parseInt(tr.attr("datagrid-row-index"));
}else{
return tr.attr("node-id");
}
};
function _82(tr){
return tr.length&&tr.parent().length;
};
};
function _8d(_8e){
var _8f=$.data(_8e,"datagrid");
var _90=_8f.options;
var dc=_8f.dc;
//dc.body2.css("overflow-x",_90.fitColumns?"auto":"");
if(!_90.fitColumns){
return;
}
if(!_8f.leftWidth){
_8f.leftWidth=0;
}
var _91=dc.view2.children("div.datagrid-header");
var _92=0;
var _93;
var _94=_6e(_8e,false);
for(var i=0;i<_94.length;i++){
var col=_6f(_8e,_94[i]);
if(_95(col)){
_92+=col.width;
_93=col;
}
}
if(!_92){
return;
}
if(_93){
_96(_93,-_8f.leftWidth);
}
var _97=_91.children("div.datagrid-header-inner").show();
var _98=_91.width()-_91.find("table").width()-_90.scrollbarSize+_8f.leftWidth;
var _99=_98/_92;
if(!_90.showHeader){
_97.hide();
}
for(var i=0;i<_94.length;i++){
var col=_6f(_8e,_94[i]);
if(_95(col)){
var _9a=parseInt(col.width*_99);
_96(col,_9a);
_98-=_9a;
}
}
_8f.leftWidth=_98;
if(_93){
_96(_93,_8f.leftWidth);
}
_51(_8e);
function _96(col,_9b){
col.width+=_9b;
col.boxWidth+=_9b;
var _w=60;
if(col.minWidth){
	_w=col.minWidth;
}
if(col.boxWidth<_w){
	col.boxWidth=_w;
}
};
function _95(col){
if(!col.hidden&&!col.checkbox&&!col.auto&&!col.fixed){
return true;
}
};
};
function _9c(_9d,_9e){
var _9f=$.data(_9d,"datagrid");
var _a0=_9f.options;
var dc=_9f.dc;
var tmp=$("<div class=\"datagrid-cell\" style=\"position:absolute;left:-9999px\"></div>").appendTo("body");
if(_9e){
_19(_9e);
if(_a0.fitColumns){
_1e(_9d);
_8d(_9d);
}
}else{
var _a1=false;
var _a2=_6e(_9d,true).concat(_6e(_9d,false));
for(var i=0;i<_a2.length;i++){
var _9e=_a2[i];
var col=_6f(_9d,_9e);
if(col.auto){
_19(_9e);
_a1=true;
}
}
if(_a1&&_a0.fitColumns){
_1e(_9d);
_8d(_9d);
}
}
tmp.remove();
function _19(_a3){
var _a4=dc.view.find("div.datagrid-header td[field=\""+_a3+"\"] div.datagrid-cell");
_a4.css("width","");
var col=$(_9d).datagrid("getColumnOption",_a3);
col.width=undefined;
col.boxWidth=undefined;
col.auto=true;
$(_9d).datagrid("fixColumnSize",_a3);
var _a5=Math.max(_a6("header"),_a6("allbody"),_a6("allfooter"));
_a4._outerWidth(_a5);
col.width=_a5;
col.boxWidth=parseInt(_a4[0].style.width);
_a4.css("width","");
$(_9d).datagrid("fixColumnSize",_a3);
_a0.onResizeColumn.call(_9d,_a3,col.width);
function _a6(_a7){
var _a8=0;
if(_a7=="header"){
_a8=_a9(_a4);
}else{
_a0.finder.getTr(_9d,0,_a7).find("td[field=\""+_a3+"\"] div.datagrid-cell").each(function(){
var w=_a9($(this));
if(_a8<w){
_a8=w;
}
});
}
return _a8;
function _a9(_aa){
return _aa.is(":visible")?_aa._outerWidth():tmp.html(_aa.html())._outerWidth();
};
};
};
};
function _51(_ab,_ac){
var _ad=$.data(_ab,"datagrid");
var _ae=_ad.options;
var dc=_ad.dc;
var _af=dc.view.find("table.datagrid-btable,table.datagrid-ftable");
_af.css("table-layout","fixed");
if(_ac){
fix(_ac);
}else{
var ff=_6e(_ab,true).concat(_6e(_ab,false));
for(var i=0;i<ff.length;i++){
fix(ff[i]);
}
}
_af.css("table-layout","auto");
_b0(_ab);
setTimeout(function(){
_2e(_ab);
_b5(_ab);
},0);
function fix(_b1){
var col=_6f(_ab,_b1);
if(!col.checkbox){
_ad.ss.set("."+col.cellClass,col.boxWidth?col.boxWidth+"px":"auto");
}
};
};
function _b0(_b2){
var dc=$.data(_b2,"datagrid").dc;
dc.body1.add(dc.body2).find("td.datagrid-td-merged").each(function(){
var td=$(this);
var _b3=td.attr("colspan")||1;
var _b4=_6f(_b2,td.attr("field")).width;
for(var i=1;i<_b3;i++){
td=td.next();
_b4+=_6f(_b2,td.attr("field")).width+1;
}
$(this).children("div.datagrid-cell")._outerWidth(_b4);
});
};
function _b5(_b6){
var dc=$.data(_b6,"datagrid").dc;
dc.view.find("div.datagrid-editable").each(function(){
var _b7=$(this);
var _b8=_b7.parent().attr("field");
var col=$(_b6).datagrid("getColumnOption",_b8);
_b7._outerWidth(col.width);
var ed=$.data(this,"datagrid.editor");
if(ed.actions.resize){
ed.actions.resize(ed.target,_b7.width());
}
});
};
function _6f(_b9,_ba){
function _bb(_bc){
if(_bc){
for(var i=0;i<_bc.length;i++){
var cc=_bc[i];
for(var j=0;j<cc.length;j++){
var c=cc[j];
if(c.field==_ba){
return c;
}
}
}
}
return null;
};
var _bd=$.data(_b9,"datagrid").options;
var col=_bb(_bd.columns);
if(!col){
col=_bb(_bd.frozenColumns);
}
return col;
};
function _6e(_be,_bf){
var _c0=$.data(_be,"datagrid").options;
var _c1=(_bf==true)?(_c0.frozenColumns||[[]]):_c0.columns;
if(_c1.length==0){
return [];
}
var _c2=[];
function _c3(_c4){
var c=0;
var i=0;
while(true){
if(_c2[i]==undefined){
if(c==_c4){
return i;
}
c++;
}
i++;
}
};
function _c5(r){
var ff=[];
var c=0;
for(var i=0;i<_c1[r].length;i++){
var col=_c1[r][i];
if(col.field){
ff.push([c,col.field]);
}
c+=parseInt(col.colspan||"1");
}
for(var i=0;i<ff.length;i++){
ff[i][0]=_c3(ff[i][0]);
}
for(var i=0;i<ff.length;i++){
var f=ff[i];
_c2[f[0]]=f[1];
}
};
for(var i=0;i<_c1.length;i++){
_c5(i);
}
return _c2;
};
function _c6(_c7,_c8){
var _c9=$.data(_c7,"datagrid");
var _ca=_c9.options;
var dc=_c9.dc;
_c8=_ca.loadFilter.call(_c7,_c8);
_c8.total=parseInt(_c8.total);
_c9.data=_c8;
if(_c8.footer){
_c9.footer=_c8.footer;
}
if(!_ca.remoteSort&&_ca.sortName){
var _cb=_ca.sortName.split(",");
var _cc=_ca.sortOrder.split(",");
_c8.rows.sort(function(r1,r2){
var r=0;
for(var i=0;i<_cb.length;i++){
var sn=_cb[i];
var so=_cc[i];
var col=_6f(_c7,sn);
var _cd=col.sorter||function(a,b){
return a==b?0:(a>b?1:-1);
};
r=_cd(r1[sn],r2[sn])*(so=="asc"?1:-1);
if(r!=0){
return r;
}
}
return r;
});
}
if(_ca.view.onBeforeRender){
_ca.view.onBeforeRender.call(_ca.view,_c7,_c8.rows);
}
_ca.view.render.call(_ca.view,_c7,dc.body2,false);
_ca.view.render.call(_ca.view,_c7,dc.body1,true);
if(_ca.showFooter){
_ca.view.renderFooter.call(_ca.view,_c7,dc.footer2,false);
_ca.view.renderFooter.call(_ca.view,_c7,dc.footer1,true);
}
if(_ca.view.onAfterRender){
_ca.view.onAfterRender.call(_ca.view,_c7);
}
_c9.ss.clean();
_ca.onLoadSuccess.call(_c7,_c8);
var _ce=$(_c7).datagrid("getPager");
if(_ce.length){
var _cf=_ce.pagination("options");
if(_cf.total!=_c8.total){
_ce.pagination("refresh",{total:_c8.total});
if(_ca.pageNumber!=_cf.pageNumber){
_ca.pageNumber=_cf.pageNumber;
_16b(_c7);
}
}
}
_2e(_c7);
dc.body2.triggerHandler("scroll");
_d0();
$(_c7).datagrid("autoSizeColumn");
function _d0(){
if(_ca.idField){
for(var i=0;i<_c8.rows.length;i++){
var row=_c8.rows[i];
if(_d1(_c9.selectedRows,row)){
_ca.finder.getTr(_c7,i).addClass("datagrid-row-selected");
}
if(_d1(_c9.checkedRows,row)){
_ca.finder.getTr(_c7,i).find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
}
}
}
function _d1(a,r){
for(var i=0;i<a.length;i++){
if(a[i][_ca.idField]==r[_ca.idField]){
a[i]=r;
return true;
}
}
return false;
};
};
};
function _d2(_d3,row){
var _d4=$.data(_d3,"datagrid");
var _d5=_d4.options;
var _d6=_d4.data.rows;
if(typeof row=="object"){
return _2(_d6,row);
}else{
for(var i=0;i<_d6.length;i++){
if(_d6[i][_d5.idField]==row){
return i;
}
}
return -1;
}
};
function _d7(_d8){
var _d9=$.data(_d8,"datagrid");
var _da=_d9.options;
var _db=_d9.data;
if(_da.idField){
return _d9.selectedRows;
}else{
var _dc=[];
_da.finder.getTr(_d8,"","selected",2).each(function(){
var _dd=parseInt($(this).attr("datagrid-row-index"));
_dc.push(_db.rows[_dd]);
});
return _dc;
}
};
function _de(_df){
var _e0=$.data(_df,"datagrid");
var _e1=_e0.options;
if(_e1.idField){
return _e0.checkedRows;
}else{
var _e2=[];
_e1.finder.getTr(_df,"","checked",2).each(function(){
_e2.push(_e1.finder.getRow(_df,$(this)));
});
return _e2;
}
};
function _e3(_e4,_e5){
var _e6=$.data(_e4,"datagrid");
var dc=_e6.dc;
var _e7=_e6.options;
var tr=_e7.finder.getTr(_e4,_e5);
if(tr.length){
if(tr.closest("table").hasClass("datagrid-btable-frozen")){
return;
}
var _e8=dc.view2.children("div.datagrid-header")._outerHeight();
var _e9=dc.body2;
var _ea=_e9.outerHeight(true)-_e9.outerHeight();
var top=tr.position().top-_e8-_ea;
if(top<0){
_e9.scrollTop(_e9.scrollTop()+top);
}else{
if(top+tr._outerHeight()>_e9.height()-18){
_e9.scrollTop(_e9.scrollTop()+top+tr._outerHeight()-_e9.height()+18);
}
}
}
};
function _eb(_ec,_ed){
var _ee=$.data(_ec,"datagrid");
var _ef=_ee.options;
_ef.finder.getTr(_ec,_ee.highlightIndex).removeClass("datagrid-row-over");
_ef.finder.getTr(_ec,_ed).addClass("datagrid-row-over");
_ee.highlightIndex=_ed;
};
function _f0(_f1,_f2,_f3){
var _f4=$.data(_f1,"datagrid");
var dc=_f4.dc;
var _f5=_f4.options;
var _f6=_f4.selectedRows;
if(_f5.singleSelect){
_f7(_f1);
_f6.splice(0,_f6.length);
}
if(!_f3&&_f5.checkOnSelect){
_f8(_f1,_f2,true);
}
var row=_f5.finder.getRow(_f1,_f2);
if(_f5.idField){
_7(_f6,_f5.idField,row);
}
_f5.finder.getTr(_f1,_f2).addClass("datagrid-row-selected");
_f5.onSelect.call(_f1,_f2,row);
_e3(_f1,_f2);
};
function _f9(_fa,_fb,_fc){
var _fd=$.data(_fa,"datagrid");
var dc=_fd.dc;
var _fe=_fd.options;
var _ff=$.data(_fa,"datagrid").selectedRows;
if(!_fc&&_fe.checkOnSelect){
_100(_fa,_fb,true);
}
_fe.finder.getTr(_fa,_fb).removeClass("datagrid-row-selected");
var row=_fe.finder.getRow(_fa,_fb);
if(_fe.idField){
_4(_ff,_fe.idField,row[_fe.idField]);
}
_fe.onUnselect.call(_fa,_fb,row);
};
function _101(_102,_103){
var _104=$.data(_102,"datagrid");
var opts=_104.options;
var rows=_104.data.rows;
var _105=$.data(_102,"datagrid").selectedRows;
if(!_103&&opts.checkOnSelect){
_106(_102,true);
}
opts.finder.getTr(_102,"","allbody").addClass("datagrid-row-selected");
if(opts.idField){
for(var _107=0;_107<rows.length;_107++){
_7(_105,opts.idField,rows[_107]);
}
}
opts.onSelectAll.call(_102,rows);
};
function _f7(_108,_109){
var _10a=$.data(_108,"datagrid");
var opts=_10a.options;
var rows=_10a.data.rows;
var _10b=$.data(_108,"datagrid").selectedRows;
if(!_109&&opts.checkOnSelect){
_10c(_108,true);
}
opts.finder.getTr(_108,"","selected").removeClass("datagrid-row-selected");
if(opts.idField){
for(var _10d=0;_10d<rows.length;_10d++){
_4(_10b,opts.idField,rows[_10d][opts.idField]);
}
}
opts.onUnselectAll.call(_108,rows);
};
function _f8(_10e,_10f,_110){
var _111=$.data(_10e,"datagrid");
var opts=_111.options;
if(!_110&&opts.selectOnCheck){
_f0(_10e,_10f,true);
}
var tr=opts.finder.getTr(_10e,_10f).addClass("datagrid-row-checked");
var ck=tr.find("div.datagrid-cell-check input[type=checkbox]");
ck._propAttr("checked",true);
tr=opts.finder.getTr(_10e,"","checked",2);
if(tr.length==_111.data.rows.length){
var dc=_111.dc;
var _112=dc.header1.add(dc.header2);
_112.find("input[type=checkbox]")._propAttr("checked",true);
}
var row=opts.finder.getRow(_10e,_10f);
if(opts.idField){
_7(_111.checkedRows,opts.idField,row);
}
opts.onCheck.call(_10e,_10f,row);
};
function _100(_113,_114,_115){
var _116=$.data(_113,"datagrid");
var opts=_116.options;
if(!_115&&opts.selectOnCheck){
_f9(_113,_114,true);
}
var tr=opts.finder.getTr(_113,_114).removeClass("datagrid-row-checked");
var ck=tr.find("div.datagrid-cell-check input[type=checkbox]");
ck._propAttr("checked",false);
var dc=_116.dc;
var _117=dc.header1.add(dc.header2);
_117.find("input[type=checkbox]")._propAttr("checked",false);
var row=opts.finder.getRow(_113,_114);
if(opts.idField){
_4(_116.checkedRows,opts.idField,row[opts.idField]);
}
opts.onUncheck.call(_113,_114,row);
};
function _106(_118,_119){
var _11a=$.data(_118,"datagrid");
var opts=_11a.options;
var rows=_11a.data.rows;
if(!_119&&opts.selectOnCheck){
_101(_118,true);
}
var dc=_11a.dc;
var hck=dc.header1.add(dc.header2).find("input[type=checkbox]");
var bck=opts.finder.getTr(_118,"","allbody").addClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
hck.add(bck)._propAttr("checked",true);
if(opts.idField){
for(var i=0;i<rows.length;i++){
_7(_11a.checkedRows,opts.idField,rows[i]);
}
}
opts.onCheckAll.call(_118,rows);
};
function _10c(_11b,_11c){
var _11d=$.data(_11b,"datagrid");
var opts=_11d.options;
var rows=_11d.data.rows;
if(!_11c&&opts.selectOnCheck){
_f7(_11b,true);
}
var dc=_11d.dc;
var hck=dc.header1.add(dc.header2).find("input[type=checkbox]");
var bck=opts.finder.getTr(_11b,"","checked").removeClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
hck.add(bck)._propAttr("checked",false);
if(opts.idField){
for(var i=0;i<rows.length;i++){
_4(_11d.checkedRows,opts.idField,rows[i][opts.idField]);
}
}
opts.onUncheckAll.call(_11b,rows);
};
function _11e(_11f,_120){
var opts=$.data(_11f,"datagrid").options;
var tr=opts.finder.getTr(_11f,_120);
var row=opts.finder.getRow(_11f,_120);
if(tr.hasClass("datagrid-row-editing")){
return;
}
if(opts.onBeforeEdit.call(_11f,_120,row)==false){
return;
}
tr.addClass("datagrid-row-editing");
_121(_11f,_120);
_b5(_11f);
tr.find("div.datagrid-editable").each(function(){
var _122=$(this).parent().attr("field");
var ed=$.data(this,"datagrid.editor");
ed.actions.setValue(ed.target,row[_122]);
});
_123(_11f,_120);
};
function _124(_125,_126,_127){
var opts=$.data(_125,"datagrid").options;
var _128=$.data(_125,"datagrid").updatedRows;
var _129=$.data(_125,"datagrid").insertedRows;
var tr=opts.finder.getTr(_125,_126);
var row=opts.finder.getRow(_125,_126);
if(!tr.hasClass("datagrid-row-editing")){
return;
}
if(!_127){
if(!_123(_125,_126)){
return;
}
var _12a=false;
var _12b={};
tr.find("div.datagrid-editable").each(function(){
var _12c=$(this).parent().attr("field");
var ed=$.data(this,"datagrid.editor");
var _12d=ed.actions.getValue(ed.target);
if(row[_12c]!=_12d){
row[_12c]=_12d;
_12a=true;
_12b[_12c]=_12d;
}
});
if(_12a){
if(_2(_129,row)==-1){
if(_2(_128,row)==-1){
_128.push(row);
}
}
}
}
tr.removeClass("datagrid-row-editing");
_12e(_125,_126);
$(_125).datagrid("refreshRow",_126);
if(!_127){
opts.onAfterEdit.call(_125,_126,row,_12b);
}else{
opts.onCancelEdit.call(_125,_126,row);
}
};
function _12f(_130,_131){
var opts=$.data(_130,"datagrid").options;
var tr=opts.finder.getTr(_130,_131);
var _132=[];
tr.children("td").each(function(){
var cell=$(this).find("div.datagrid-editable");
if(cell.length){
var ed=$.data(cell[0],"datagrid.editor");
_132.push(ed);
}
});
return _132;
};
function _133(_134,_135){
var _136=_12f(_134,_135.index!=undefined?_135.index:_135.id);
for(var i=0;i<_136.length;i++){
if(_136[i].field==_135.field){
return _136[i];
}
}
return null;
};
function _121(_137,_138){
var opts=$.data(_137,"datagrid").options;
var tr=opts.finder.getTr(_137,_138);
tr.children("td").each(function(){
var cell=$(this).find("div.datagrid-cell");
var _139=$(this).attr("field");
var col=_6f(_137,_139);
if(col&&col.editor){
var _13a,_13b;
if(typeof col.editor=="string"){
_13a=col.editor;
}else{
_13a=col.editor.type;
_13b=col.editor.options;
}
var _13c=opts.editors[_13a];
if(_13c){
var _13d=cell.html();
var _13e=cell._outerWidth();
cell.addClass("datagrid-editable");
cell._outerWidth(_13e);
cell.html("<table border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tr><td></td></tr></table>");
cell.children("table").bind("click dblclick contextmenu",function(e){
e.stopPropagation();
});
$.data(cell[0],"datagrid.editor",{actions:_13c,target:_13c.init(cell.find("td"),_13b),field:_139,type:_13a,oldHtml:_13d});
}
}
});
_2e(_137,_138,true);
};
function _12e(_13f,_140){
var opts=$.data(_13f,"datagrid").options;
var tr=opts.finder.getTr(_13f,_140);
tr.children("td").each(function(){
var cell=$(this).find("div.datagrid-editable");
if(cell.length){
var ed=$.data(cell[0],"datagrid.editor");
if(ed.actions.destroy){
ed.actions.destroy(ed.target);
}
cell.html(ed.oldHtml);
$.removeData(cell[0],"datagrid.editor");
cell.removeClass("datagrid-editable");
cell.css("width","");
}
});
};
function _123(_141,_142){
var tr=$.data(_141,"datagrid").options.finder.getTr(_141,_142);
if(!tr.hasClass("datagrid-row-editing")){
return true;
}
var vbox=tr.find(".validatebox-text");
vbox.validatebox("validate");
vbox.trigger("mouseleave");
var _143=tr.find(".validatebox-invalid");
return _143.length==0;
};
function _144(_145,_146){
var _147=$.data(_145,"datagrid").insertedRows;
var _148=$.data(_145,"datagrid").deletedRows;
var _149=$.data(_145,"datagrid").updatedRows;
if(!_146){
var rows=[];
rows=rows.concat(_147);
rows=rows.concat(_148);
rows=rows.concat(_149);
return rows;
}else{
if(_146=="inserted"){
return _147;
}else{
if(_146=="deleted"){
return _148;
}else{
if(_146=="updated"){
return _149;
}
}
}
}
return [];
};
function _14a(_14b,_14c){
var _14d=$.data(_14b,"datagrid");
var opts=_14d.options;
var data=_14d.data;
var _14e=_14d.insertedRows;
var _14f=_14d.deletedRows;
$(_14b).datagrid("cancelEdit",_14c);
var row=data.rows[_14c];
if(_2(_14e,row)>=0){
_4(_14e,row);
}else{
_14f.push(row);
}
_4(_14d.selectedRows,opts.idField,data.rows[_14c][opts.idField]);
_4(_14d.checkedRows,opts.idField,data.rows[_14c][opts.idField]);
opts.view.deleteRow.call(opts.view,_14b,_14c);
if(opts.height=="auto"){
_2e(_14b);
}
$(_14b).datagrid("getPager").pagination("refresh",{total:data.total});
};
function _150(_151,_152){
var data=$.data(_151,"datagrid").data;
var view=$.data(_151,"datagrid").options.view;
var _153=$.data(_151,"datagrid").insertedRows;
view.insertRow.call(view,_151,_152.index,_152.row);
_153.push(_152.row);
$(_151).datagrid("getPager").pagination("refresh",{total:data.total});
};
function _154(_155,row){
var data=$.data(_155,"datagrid").data;
var view=$.data(_155,"datagrid").options.view;
var _156=$.data(_155,"datagrid").insertedRows;
view.insertRow.call(view,_155,null,row);
_156.push(row);
$(_155).datagrid("getPager").pagination("refresh",{total:data.total});
};
function _157(_158){
var _159=$.data(_158,"datagrid");
var data=_159.data;
var rows=data.rows;
var _15a=[];
for(var i=0;i<rows.length;i++){
_15a.push($.extend({},rows[i]));
}
_159.originalRows=_15a;
_159.updatedRows=[];
_159.insertedRows=[];
_159.deletedRows=[];
};
function _15b(_15c){
var data=$.data(_15c,"datagrid").data;
var ok=true;
for(var i=0,len=data.rows.length;i<len;i++){
if(_123(_15c,i)){
_124(_15c,i,false);
}else{
ok=false;
}
}
if(ok){
_157(_15c);
}
};
function _15d(_15e){
var _15f=$.data(_15e,"datagrid");
var opts=_15f.options;
var _160=_15f.originalRows;
var _161=_15f.insertedRows;
var _162=_15f.deletedRows;
var _163=_15f.selectedRows;
var _164=_15f.checkedRows;
var data=_15f.data;
function _165(a){
var ids=[];
for(var i=0;i<a.length;i++){
ids.push(a[i][opts.idField]);
}
return ids;
};
function _166(ids,_167){
for(var i=0;i<ids.length;i++){
var _168=_d2(_15e,ids[i]);
if(_168>=0){
(_167=="s"?_f0:_f8)(_15e,_168,true);
}
}
};
for(var i=0;i<data.rows.length;i++){
_124(_15e,i,true);
}
var _169=_165(_163);
var _16a=_165(_164);
_163.splice(0,_163.length);
_164.splice(0,_164.length);
data.total+=_162.length-_161.length;
data.rows=_160;
_c6(_15e,data);
_166(_169,"s");
_166(_16a,"c");
_157(_15e);
};
function _16b(_16c,_16d){
var opts=$.data(_16c,"datagrid").options;
if(_16d){
opts.queryParams=_16d;
}
var _16e=$.extend({},opts.queryParams);
if(opts.pagination){
$.extend(_16e,{page:opts.pageNumber,rows:opts.pageSize});
}
if(opts.sortName){
$.extend(_16e,{sort:opts.sortName,order:opts.sortOrder});
}
if(opts.onBeforeLoad.call(_16c,_16e)==false){
return;
}
$(_16c).datagrid("loading");
setTimeout(function(){
_16f();
},0);
function _16f(){
var _170=opts.loader.call(_16c,_16e,function(data){
setTimeout(function(){
$(_16c).datagrid("loaded");
},0);
_c6(_16c,data);
setTimeout(function(){
_157(_16c);
},0);
},function(){
setTimeout(function(){
$(_16c).datagrid("loaded");
},0);
opts.onLoadError.apply(_16c,arguments);
});
if(_170==false){
$(_16c).datagrid("loaded");
}
};
};
function _171(_172,_173){
var opts=$.data(_172,"datagrid").options;
_173.rowspan=_173.rowspan||1;
_173.colspan=_173.colspan||1;
if(_173.rowspan==1&&_173.colspan==1){
return;
}
var tr=opts.finder.getTr(_172,(_173.index!=undefined?_173.index:_173.id));
if(!tr.length){
return;
}
var row=opts.finder.getRow(_172,tr);
var _174=row[_173.field];
var td=tr.find("td[field=\""+_173.field+"\"]");
td.attr("rowspan",_173.rowspan).attr("colspan",_173.colspan);
td.addClass("datagrid-td-merged");
for(var i=1;i<_173.colspan;i++){
td=td.next();
td.hide();
row[td.attr("field")]=_174;
}
for(var i=1;i<_173.rowspan;i++){
tr=tr.next();
if(!tr.length){
break;
}
var row=opts.finder.getRow(_172,tr);
var td=tr.find("td[field=\""+_173.field+"\"]").hide();
row[td.attr("field")]=_174;
for(var j=1;j<_173.colspan;j++){
td=td.next();
td.hide();
row[td.attr("field")]=_174;
}
}
_b0(_172);
};
$.fn.datagrid=function(_175,_176){
if(typeof _175=="string"){
return $.fn.datagrid.methods[_175](this,_176);
}
_175=_175||{};
return this.each(function(){
var _177=$.data(this,"datagrid");
var opts;
if(_177){
opts=$.extend(_177.options,_175);
_177.options=opts;
}else{
opts=$.extend({},$.extend({},$.fn.datagrid.defaults,{queryParams:{}}),$.fn.datagrid.parseOptions(this),_175);
$(this).css("width","").css("height","");
var _178=_47(this,opts.rownumbers);
if(!opts.columns){
opts.columns=_178.columns;
}
if(!opts.frozenColumns){
opts.frozenColumns=_178.frozenColumns;
}
opts.columns=$.extend(true,[],opts.columns);
opts.frozenColumns=$.extend(true,[],opts.frozenColumns);
opts.view=$.extend({},opts.view);
$.data(this,"datagrid",{options:opts,panel:_178.panel,dc:_178.dc,ss:_178.ss,selectedRows:[],checkedRows:[],data:{total:0,rows:[]},originalRows:[],updatedRows:[],insertedRows:[],deletedRows:[]});
}
_56(this);
if(opts.data){
_c6(this,opts.data);
_157(this);
}else{
var data=$.fn.datagrid.parseData(this);
if(data.total>0){
_c6(this,data);
_157(this);
}
}
_19(this);
_16b(this);
_70(this);
});
};
var _179={text:{init:function(_17a,_17b){
var _17c=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_17a);
return _17c;
},getValue:function(_17d){
return $(_17d).val();
},setValue:function(_17e,_17f){
$(_17e).val(_17f);
},resize:function(_180,_181){
$(_180)._outerWidth(_181)._outerHeight(22);
}},textarea:{init:function(_182,_183){
var _184=$("<textarea class=\"datagrid-editable-input\"></textarea>").appendTo(_182);
return _184;
},getValue:function(_185){
return $(_185).val();
},setValue:function(_186,_187){
$(_186).val(_187);
},resize:function(_188,_189){
$(_188)._outerWidth(_189);
}},checkbox:{init:function(_18a,_18b){
var _18c=$("<input type=\"checkbox\">").appendTo(_18a);
_18c.val(_18b.on);
_18c.attr("offval",_18b.off);
return _18c;
},getValue:function(_18d){
if($(_18d).is(":checked")){
return $(_18d).val();
}else{
return $(_18d).attr("offval");
}
},setValue:function(_18e,_18f){
var _190=false;
if($(_18e).val()==_18f){
_190=true;
}
$(_18e)._propAttr("checked",_190);
}},numberbox:{init:function(_191,_192){
var _193=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_191);
_193.numberbox(_192);
return _193;
},destroy:function(_194){
$(_194).numberbox("destroy");
},getValue:function(_195){
$(_195).blur();
return $(_195).numberbox("getValue");
},setValue:function(_196,_197){
$(_196).numberbox("setValue",_197);
},resize:function(_198,_199){
$(_198)._outerWidth(_199)._outerHeight(22);
}},validatebox:{init:function(_19a,_19b){
var _19c=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_19a);
_19c.validatebox(_19b);
return _19c;
},destroy:function(_19d){
$(_19d).validatebox("destroy");
},getValue:function(_19e){
return $(_19e).val();
},setValue:function(_19f,_1a0){
$(_19f).val(_1a0);
},resize:function(_1a1,_1a2){
$(_1a1)._outerWidth(_1a2)._outerHeight(22);
}},datebox:{init:function(_1a3,_1a4){
var _1a5=$("<input type=\"text\">").appendTo(_1a3);
_1a5.datebox(_1a4);
return _1a5;
},destroy:function(_1a6){
$(_1a6).datebox("destroy");
},getValue:function(_1a7){
return $(_1a7).datebox("getValue");
},setValue:function(_1a8,_1a9){
$(_1a8).datebox("setValue",_1a9);
},resize:function(_1aa,_1ab){
$(_1aa).datebox("resize",_1ab);
}},combobox:{init:function(_1ac,_1ad){
var _1ae=$("<input type=\"text\">").appendTo(_1ac);
_1ae.combobox(_1ad||{});
return _1ae;
},destroy:function(_1af){
$(_1af).combobox("destroy");
},getValue:function(_1b0){
var opts=$(_1b0).combobox("options");
if(opts.multiple){
return $(_1b0).combobox("getValues").join(opts.separator);
}else{
return $(_1b0).combobox("getValue");
}
},setValue:function(_1b1,_1b2){
var opts=$(_1b1).combobox("options");
if(opts.multiple){
if(_1b2){
$(_1b1).combobox("setValues",_1b2.split(opts.separator));
}else{
$(_1b1).combobox("clear");
}
}else{
$(_1b1).combobox("setValue",_1b2);
}
},resize:function(_1b3,_1b4){
$(_1b3).combobox("resize",_1b4);
}},combotree:{init:function(_1b5,_1b6){
var _1b7=$("<input type=\"text\">").appendTo(_1b5);
_1b7.combotree(_1b6);
return _1b7;
},destroy:function(_1b8){
$(_1b8).combotree("destroy");
},getValue:function(_1b9){
return $(_1b9).combotree("getValue");
},setValue:function(_1ba,_1bb){
$(_1ba).combotree("setValue",_1bb);
},resize:function(_1bc,_1bd){
$(_1bc).combotree("resize",_1bd);
}}};
$.fn.datagrid.methods={options:function(jq){
var _1be=$.data(jq[0],"datagrid").options;
var _1bf=$.data(jq[0],"datagrid").panel.panel("options");
var opts=$.extend(_1be,{width:_1bf.width,height:_1bf.height,closed:_1bf.closed,collapsed:_1bf.collapsed,minimized:_1bf.minimized,maximized:_1bf.maximized});
return opts;
},getPanel:function(jq){
return $.data(jq[0],"datagrid").panel;
},getPager:function(jq){
return $.data(jq[0],"datagrid").panel.children("div.datagrid-pager");
},getColumnFields:function(jq,_1c0){
return _6e(jq[0],_1c0);
},getColumnOption:function(jq,_1c1){
return _6f(jq[0],_1c1);
},resize:function(jq,_1c2){
return jq.each(function(){
_19(this,_1c2);
});
},load:function(jq,_1c3){
return jq.each(function(){
var opts=$(this).datagrid("options");
opts.pageNumber=1;
var _1c4=$(this).datagrid("getPager");
_1c4.pagination("refresh",{pageNumber:1});
_16b(this,_1c3);
});
},reload:function(jq,_1c5){
return jq.each(function(){
_16b(this,_1c5);
});
},reloadFooter:function(jq,_1c6){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
var dc=$.data(this,"datagrid").dc;
if(_1c6){
$.data(this,"datagrid").footer=_1c6;
}
if(opts.showFooter){
opts.view.renderFooter.call(opts.view,this,dc.footer2,false);
opts.view.renderFooter.call(opts.view,this,dc.footer1,true);
if(opts.view.onAfterRender){
opts.view.onAfterRender.call(opts.view,this);
}
$(this).datagrid("fixRowHeight");
}
});
},loading:function(jq){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
$(this).datagrid("getPager").pagination("loading");
if(opts.loadMsg){
var _1c7=$(this).datagrid("getPanel");
if(!_1c7.children("div.datagrid-mask").length){
$("<div class=\"datagrid-mask\" style=\"display:block\"></div>").appendTo(_1c7);
var msg=$("<div class=\"datagrid-mask-msg\" style=\"display:block;left:50%\"></div>").html(opts.loadMsg).appendTo(_1c7);
msg._outerHeight(40);
msg.css({marginLeft:(-msg.outerWidth()/2),lineHeight:(msg.height()+"px")});
}
}
});
},loaded:function(jq){
return jq.each(function(){
$(this).datagrid("getPager").pagination("loaded");
var _1c8=$(this).datagrid("getPanel");
var opts=$(this).datagrid("options");
_1c8.children("div.datagrid-mask-msg").remove();
_1c8.children("div.datagrid-mask").remove();
if($(this).datagrid("getRows").length<=0 && opts.emptyMsg!=""){
$(this).before('<div class="datagrid-empty-msg">'+opts.emptyMsg+'</div>');
}else{
$('.datagrid-empty-msg',_1c8).remove();
}
});
},fitColumns:function(jq){
return jq.each(function(){
_8d(this);
});
},fixColumnSize:function(jq,_1c9){
return jq.each(function(){
_51(this,_1c9);
});
},fixRowHeight:function(jq,_1ca){
return jq.each(function(){
_2e(this,_1ca);
});
},freezeRow:function(jq,_1cb){
return jq.each(function(){
_3f(this,_1cb);
});
},autoSizeColumn:function(jq,_1cc){
return jq.each(function(){
_9c(this,_1cc);
});
},loadData:function(jq,data){
return jq.each(function(){
_c6(this,data);
_157(this);
});
},getData:function(jq){
return $.data(jq[0],"datagrid").data;
},getRows:function(jq){
return $.data(jq[0],"datagrid").data.rows;
},getFooterRows:function(jq){
return $.data(jq[0],"datagrid").footer;
},getRowIndex:function(jq,id){
return _d2(jq[0],id);
},getChecked:function(jq){
return _de(jq[0]);
},getSelected:function(jq){
var rows=_d7(jq[0]);
return rows.length>0?rows[0]:null;
},getSelections:function(jq){
return _d7(jq[0]);
},clearSelections:function(jq){
return jq.each(function(){
var _1cd=$.data(this,"datagrid").selectedRows;
_1cd.splice(0,_1cd.length);
_f7(this);
});
},clearChecked:function(jq){
return jq.each(function(){
var _1ce=$.data(this,"datagrid").checkedRows;
_1ce.splice(0,_1ce.length);
_10c(this);
});
},scrollTo:function(jq,_1cf){
return jq.each(function(){
_e3(this,_1cf);
});
},highlightRow:function(jq,_1d0){
return jq.each(function(){
_eb(this,_1d0);
_e3(this,_1d0);
});
},selectAll:function(jq){
return jq.each(function(){
_101(this);
});
},unselectAll:function(jq){
return jq.each(function(){
_f7(this);
});
},selectRow:function(jq,_1d1){
return jq.each(function(){
_f0(this,_1d1);
});
},selectRecord:function(jq,id){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
if(opts.idField){
var _1d2=_d2(this,id);
if(_1d2>=0){
$(this).datagrid("selectRow",_1d2);
}
}
});
},unselectRow:function(jq,_1d3){
return jq.each(function(){
_f9(this,_1d3);
});
},checkRow:function(jq,_1d4){
return jq.each(function(){
_f8(this,_1d4);
});
},uncheckRow:function(jq,_1d5){
return jq.each(function(){
_100(this,_1d5);
});
},checkAll:function(jq){
return jq.each(function(){
_106(this);
});
},uncheckAll:function(jq){
return jq.each(function(){
_10c(this);
});
},beginEdit:function(jq,_1d6){
return jq.each(function(){
_11e(this,_1d6);
});
},endEdit:function(jq,_1d7){
return jq.each(function(){
_124(this,_1d7,false);
});
},cancelEdit:function(jq,_1d8){
return jq.each(function(){
_124(this,_1d8,true);
});
},getEditors:function(jq,_1d9){
return _12f(jq[0],_1d9);
},getEditor:function(jq,_1da){
return _133(jq[0],_1da);
},refreshRow:function(jq,_1db){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
opts.view.refreshRow.call(opts.view,this,_1db);
});
},validateRow:function(jq,_1dc){
return _123(jq[0],_1dc);
},updateRow:function(jq,_1dd){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
opts.view.updateRow.call(opts.view,this,_1dd.index,_1dd.row);
});
},appendRow:function(jq,row){
return jq.each(function(){
_154(this,row);
});
},insertRow:function(jq,_1de){
return jq.each(function(){
_150(this,_1de);
});
},deleteRow:function(jq,_1df){
return jq.each(function(){
_14a(this,_1df);
});
},getChanges:function(jq,_1e0){
return _144(jq[0],_1e0);
},acceptChanges:function(jq){
return jq.each(function(){
_15b(this);
});
},rejectChanges:function(jq){
return jq.each(function(){
_15d(this);
});
},mergeCells:function(jq,_1e1){
return jq.each(function(){
_171(this,_1e1);
});
},showColumn:function(jq,_1e2){
return jq.each(function(){
var _1e3=$(this).datagrid("getPanel");
_1e3.find("td[field=\""+_1e2+"\"]").show();
$(this).datagrid("getColumnOption",_1e2).hidden=false;
$(this).datagrid("fitColumns");
});
},hideColumn:function(jq,_1e4){
return jq.each(function(){
var _1e5=$(this).datagrid("getPanel");
_1e5.find("td[field=\""+_1e4+"\"]").hide();
$(this).datagrid("getColumnOption",_1e4).hidden=true;
$(this).datagrid("fitColumns");
});
}};
$.fn.datagrid.parseOptions=function(_1e6){
var t=$(_1e6);
return $.extend({},$.fn.panel.parseOptions(_1e6),$.parser.parseOptions(_1e6,["url","toolbar","idField","sortName","sortOrder","pagePosition","resizeHandle",{fitColumns:"boolean",autoRowHeight:"boolean",striped:"boolean",nowrap:"boolean"},{rownumbers:"boolean",singleSelect:"boolean",checkOnSelect:"boolean",selectOnCheck:"boolean"},{pagination:"boolean",pageSize:"number",pageNumber:"number"},{multiSort:"boolean",remoteSort:"boolean",showHeader:"boolean",showFooter:"boolean"},{scrollbarSize:"number"}]),{pageList:(t.attr("pageList")?eval(t.attr("pageList")):undefined),loadMsg:(t.attr("loadMsg")!=undefined?t.attr("loadMsg"):undefined),rowStyler:(t.attr("rowStyler")?eval(t.attr("rowStyler")):undefined)});
};
$.fn.datagrid.parseData=function(_1e7){
var t=$(_1e7);
var data={total:0,rows:[]};
var _1e8=t.datagrid("getColumnFields",true).concat(t.datagrid("getColumnFields",false));
t.find("tbody tr").each(function(){
data.total++;
var row={};
$.extend(row,$.parser.parseOptions(this,["iconCls","state"]));
for(var i=0;i<_1e8.length;i++){
row[_1e8[i]]=$(this).find("td:eq("+i+")").html();
}
data.rows.push(row);
});
return data;
};
var _1e9={render:function(_1ea,_1eb,_1ec){
var _1ed=$.data(_1ea,"datagrid");
var opts=_1ed.options;
var rows=_1ed.data.rows;
var _1ee=$(_1ea).datagrid("getColumnFields",_1ec);
if(_1ec){
if(!(opts.rownumbers||(opts.frozenColumns&&opts.frozenColumns.length))){
return;
}
}
var _1ef=["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<rows.length;i++){
var css=opts.rowStyler?opts.rowStyler.call(_1ea,i,rows[i]):"";
var _1f0="";
var _1f1="";
if(typeof css=="string"){
_1f1=css;
}else{
if(css){
_1f0=css["class"]||"";
_1f1=css["style"]||"";
}
}
var cls="class=\"datagrid-row "+(i%2&&opts.striped?"datagrid-row-alt ":" ")+_1f0+"\"";
var _1f2=_1f1?"style=\""+_1f1+"\"":"";
var _1f3=_1ed.rowIdPrefix+"-"+(_1ec?1:2)+"-"+i;
_1ef.push("<tr id=\""+_1f3+"\" datagrid-row-index=\""+i+"\" "+cls+" "+_1f2+">");
_1ef.push(this.renderRow.call(this,_1ea,_1ee,_1ec,i,rows[i]));
_1ef.push("</tr>");
}
_1ef.push("</tbody></table>");
$(_1eb).html(_1ef.join(""));
},renderFooter:function(_1f4,_1f5,_1f6){
var opts=$.data(_1f4,"datagrid").options;
var rows=$.data(_1f4,"datagrid").footer||[];
var _1f7=$(_1f4).datagrid("getColumnFields",_1f6);
var _1f8=["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<rows.length;i++){
_1f8.push("<tr class=\"datagrid-row\" datagrid-row-index=\""+i+"\">");
_1f8.push(this.renderRow.call(this,_1f4,_1f7,_1f6,i,rows[i]));
_1f8.push("</tr>");
}
_1f8.push("</tbody></table>");
$(_1f5).html(_1f8.join(""));
},renderRow:function(_1f9,_1fa,_1fb,_1fc,_1fd){
var opts=$.data(_1f9,"datagrid").options;
var cc=[];
if(_1fb&&opts.rownumbers){
var _1fe=_1fc+1;
if(opts.pagination){
_1fe+=(opts.pageNumber-1)*opts.pageSize;
}
cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">"+_1fe+"</div></td>");
}
for(var i=0;i<_1fa.length;i++){
var _1ff=_1fa[i];
var col=$(_1f9).datagrid("getColumnOption",_1ff);
if(col){
var _200=_1fd[_1ff];
var css=col.styler?(col.styler(_200,_1fd,_1fc)||""):"";
var _201="";
var _202="";
if(typeof css=="string"){
_202=css;
}else{
if(cc){
_201=css["class"]||"";
_202=css["style"]||"";
}
}
var cls=_201?"class=\""+_201+"\"":"";
var _203=col.hidden?"style=\"display:none;"+_202+"\"":(_202?"style=\""+_202+"\"":"");
cc.push("<td field=\""+_1ff+"\" "+cls+" "+_203+">");
if(col.checkbox){
var _203="";
}else{
var _203=_202;
if(col.align){
_203+=";text-align:"+col.align+";";
}
if(!opts.nowrap){
_203+=";white-space:normal;height:auto;";
}else{
if(opts.autoRowHeight){
_203+=";height:auto;";
}
}
}
cc.push("<div style=\""+_203+"\" ");
cc.push(col.checkbox?"class=\"datagrid-cell-check\"":"class=\"datagrid-cell "+col.cellClass+"\"");
cc.push(">");
if(col.checkbox){
cc.push("<input type=\"checkbox\" name=\""+_1ff+"\" value=\""+(_200!=undefined?_200:"")+"\">");
}else{
if(col.formatter){
cc.push(col.formatter(_200,_1fd,_1fc));
}else{
cc.push(_200);
}
}
cc.push("</div>");
cc.push("</td>");
}
}
return cc.join("");
},refreshRow:function(_204,_205){
this.updateRow.call(this,_204,_205,{});
},updateRow:function(_206,_207,row){
var opts=$.data(_206,"datagrid").options;
var rows=$(_206).datagrid("getRows");
$.extend(rows[_207],row);
var css=opts.rowStyler?opts.rowStyler.call(_206,_207,rows[_207]):"";
var _208="";
var _209="";
if(typeof css=="string"){
_209=css;
}else{
if(css){
_208=css["class"]||"";
_209=css["style"]||"";
}
}
var _208="datagrid-row "+(_207%2&&opts.striped?"datagrid-row-alt ":" ")+_208;
function _20a(_20b){
var _20c=$(_206).datagrid("getColumnFields",_20b);
var tr=opts.finder.getTr(_206,_207,"body",(_20b?1:2));
var _20d=tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
tr.html(this.renderRow.call(this,_206,_20c,_20b,_207,rows[_207]));
tr.attr("style",_209).attr("class",tr.hasClass("datagrid-row-selected")?_208+" datagrid-row-selected":_208);
if(_20d){
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
}
};
_20a.call(this,true);
_20a.call(this,false);
$(_206).datagrid("fixRowHeight",_207);
},insertRow:function(_20e,_20f,row){
var _210=$.data(_20e,"datagrid");
var opts=_210.options;
var dc=_210.dc;
var data=_210.data;
if(_20f==undefined||_20f==null){
_20f=data.rows.length;
}
if(_20f>data.rows.length){
_20f=data.rows.length;
}
function _211(_212){
var _213=_212?1:2;
for(var i=data.rows.length-1;i>=_20f;i--){
var tr=opts.finder.getTr(_20e,i,"body",_213);
tr.attr("datagrid-row-index",i+1);
tr.attr("id",_210.rowIdPrefix+"-"+_213+"-"+(i+1));
if(_212&&opts.rownumbers){
var _214=i+2;
if(opts.pagination){
_214+=(opts.pageNumber-1)*opts.pageSize;
}
tr.find("div.datagrid-cell-rownumber").html(_214);
}
if(opts.striped){
tr.removeClass("datagrid-row-alt").addClass((i+1)%2?"datagrid-row-alt":"");
}
}
};
function _215(_216){
var _217=_216?1:2;
var _218=$(_20e).datagrid("getColumnFields",_216);
var _219=_210.rowIdPrefix+"-"+_217+"-"+_20f;
var tr="<tr id=\""+_219+"\" class=\"datagrid-row\" datagrid-row-index=\""+_20f+"\"></tr>";
if(_20f>=data.rows.length){
if(data.rows.length){
opts.finder.getTr(_20e,"","last",_217).after(tr);
}else{
var cc=_216?dc.body1:dc.body2;
cc.html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"+tr+"</tbody></table>");
}
}else{
opts.finder.getTr(_20e,_20f+1,"body",_217).before(tr);
}
};
_211.call(this,true);
_211.call(this,false);
_215.call(this,true);
_215.call(this,false);
data.total+=1;
data.rows.splice(_20f,0,row);
this.refreshRow.call(this,_20e,_20f);
},deleteRow:function(_21a,_21b){
var _21c=$.data(_21a,"datagrid");
var opts=_21c.options;
var data=_21c.data;
function _21d(_21e){
var _21f=_21e?1:2;
for(var i=_21b+1;i<data.rows.length;i++){
var tr=opts.finder.getTr(_21a,i,"body",_21f);
tr.attr("datagrid-row-index",i-1);
tr.attr("id",_21c.rowIdPrefix+"-"+_21f+"-"+(i-1));
if(_21e&&opts.rownumbers){
var _220=i;
if(opts.pagination){
_220+=(opts.pageNumber-1)*opts.pageSize;
}
tr.find("div.datagrid-cell-rownumber").html(_220);
}
if(opts.striped){
tr.removeClass("datagrid-row-alt").addClass((i-1)%2?"datagrid-row-alt":"");
}
}
};
opts.finder.getTr(_21a,_21b).remove();
_21d.call(this,true);
_21d.call(this,false);
data.total-=1;
data.rows.splice(_21b,1);
},onBeforeRender:function(_221,rows){
},onAfterRender:function(_222){
var opts=$.data(_222,"datagrid").options;
if(opts.showFooter){
var _223=$(_222).datagrid("getPanel").find("div.datagrid-footer");
_223.find("div.datagrid-cell-rownumber,div.datagrid-cell-check").css("visibility","hidden");
}
}};
$.fn.datagrid.defaults=$.extend({},$.fn.panel.defaults,{border:false,frozenColumns:undefined,columns:undefined,fit:true,fitColumns:false,resizeHandle:"right",autoRowHeight:true,toolbar:null,striped:false,method:"post",nowrap:true,idField:null,url:null,data:null,loadMsg:"数据加载中，请稍后...",emptyMsg:"暂无数据",rownumbers:false,singleSelect:true,selectOnCheck:true,checkOnSelect:false,pagination:true,pagePosition:"bottom",pageNumber:1,pageSize:20,pageList:[10,20,30,40,50],queryParams:{},sortName:null,sortOrder:"asc",multiSort:false,remoteSort:true,showHeader:true,showFooter:false,scrollbarSize:18,rowStyler:function(_224,_225){
},loader:function(_226,_227,_228){
var opts=$(this).datagrid("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_226,dataType:"json",success:function(data){
_227(data);
},error:function(){
_228.apply(this,arguments);
}});
},loadFilter:function(data){
if(typeof data.length=="number"&&typeof data.splice=="function"){
return {total:data.length,rows:data};
}else{
return data;
}
},editors:_179,finder:{getTr:function(_229,_22a,type,_22b){
type=type||"body";
_22b=_22b||0;
var _22c=$.data(_229,"datagrid");
var dc=_22c.dc;
var opts=_22c.options;
if(_22b==0){
var tr1=opts.finder.getTr(_229,_22a,type,1);
var tr2=opts.finder.getTr(_229,_22a,type,2);
return tr1.add(tr2);
}else{
if(type=="body"){
var tr=$("#"+_22c.rowIdPrefix+"-"+_22b+"-"+_22a);
if(!tr.length){
tr=(_22b==1?dc.body1:dc.body2).find(">table>tbody>tr[datagrid-row-index="+_22a+"]");
}
return tr;
}else{
if(type=="footer"){
return (_22b==1?dc.footer1:dc.footer2).find(">table>tbody>tr[datagrid-row-index="+_22a+"]");
}else{
if(type=="selected"){
return (_22b==1?dc.body1:dc.body2).find(">table>tbody>tr.datagrid-row-selected");
}else{
if(type=="highlight"){
return (_22b==1?dc.body1:dc.body2).find(">table>tbody>tr.datagrid-row-over");
}else{
if(type=="checked"){
return (_22b==1?dc.body1:dc.body2).find(">table>tbody>tr.datagrid-row-checked");
}else{
if(type=="last"){
return (_22b==1?dc.body1:dc.body2).find(">table>tbody>tr[datagrid-row-index]:last");
}else{
if(type=="allbody"){
return (_22b==1?dc.body1:dc.body2).find(">table>tbody>tr[datagrid-row-index]");
}else{
if(type=="allfooter"){
return (_22b==1?dc.footer1:dc.footer2).find(">table>tbody>tr[datagrid-row-index]");
}
}
}
}
}
}
}
}
}
},getRow:function(_22d,p){
var _22e=(typeof p=="object")?p.attr("datagrid-row-index"):p;
return $.data(_22d,"datagrid").data.rows[parseInt(_22e)];
}},view:_1e9,onBeforeLoad:function(_22f){
},onLoadSuccess:function(){
},onLoadError:function(){
},onClickRow:function(_230,_231){
},onDblClickRow:function(_232,_233){
},onClickCell:function(_234,_235,_236){
},onDblClickCell:function(_237,_238,_239){
},onSortColumn:function(sort,_23a){
},onResizeColumn:function(_23b,_23c){
},onSelect:function(_23d,_23e){
},onUnselect:function(_23f,_240){
},onSelectAll:function(rows){
},onUnselectAll:function(rows){
},onCheck:function(_241,_242){
},onUncheck:function(_243,_244){
},onCheckAll:function(rows){
},onUncheckAll:function(rows){
},onBeforeEdit:function(_245,_246){
},onAfterEdit:function(_247,_248,_249){
},onCancelEdit:function(_24a,_24b){
},onHeaderContextMenu:function(e,_24c){
},onRowContextMenu:function(e,_24d,_24e){
}});
})(jQuery);

/*[detailview]
*/
 var detailview = $.extend({}, $.fn.datagrid.defaults.view, {
	render: function(target, container, frozen){
		var state = $.data(target, 'datagrid');
		var opts = state.options;
		if (frozen){
			if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))){
				return;
			}
		}
		var rows = state.data.rows;
		var fields = $(target).datagrid('getColumnFields', frozen);
		var table = [];
		table.push('<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>');
		for(var i=0; i<rows.length; i++) {
			// get the class and style attributes for this row
			var css = opts.rowStyler ? opts.rowStyler.call(target, i, rows[i]) : '';
			var classValue = '';
			var styleValue = '';
			if (typeof css == 'string'){
				styleValue = css;
			} else if (css){
				classValue = css['class'] || '';
				styleValue = css['style'] || '';
			}
			
			var cls = 'class="datagrid-row ' + (i % 2 && opts.striped ? 'datagrid-row-alt ' : ' ') + classValue + '"';
			var style = styleValue ? 'style="' + styleValue + '"' : '';
			var rowId = state.rowIdPrefix + '-' + (frozen?1:2) + '-' + i;
			table.push('<tr id="' + rowId + '" datagrid-row-index="' + i + '" ' + cls + ' ' + style + '>');
			table.push(this.renderRow.call(this, target, fields, frozen, i, rows[i]));
			table.push('</tr>');
			
			table.push('<tr style="display:none;">');
			if (frozen){
				table.push('<td colspan=' + (fields.length+2) + ' style="border-right:0">');
			} else {
				table.push('<td style="vertical-align:top;padding-right:10px;" colspan=' + (fields.length) + '>');
			}
			table.push('<div class="datagrid-row-detail">');
			if (frozen){
				table.push('&nbsp;');
			} else {
				table.push(opts.detailFormatter.call(target, i, rows[i]));
			}
			table.push('</div>');
			table.push('</td>');
			table.push('</tr>');
			
		}
		table.push('</tbody></table>');
		
		$(container).html(table.join(''));
	},
	
	renderRow: function(target, fields, frozen, rowIndex, rowData){
		var opts = $.data(target, 'datagrid').options;
		
		var cc = [];
		if (frozen && opts.rownumbers){
			var rownumber = rowIndex + 1;
			if (opts.pagination){
				rownumber += (opts.pageNumber-1)*opts.pageSize;
			}
			cc.push('<td class="datagrid-td-rownumber"><div class="datagrid-cell-rownumber">'+rownumber+'</div></td>');
		}
		for(var i=0; i<fields.length; i++){
			var field = fields[i];
			var col = $(target).datagrid('getColumnOption', field);
			if (col){
				var value = rowData[field];	// the field value
				var css = col.styler ? (col.styler(value, rowData, rowIndex)||'') : '';
				var classValue = '';
				var styleValue = '';
				if (typeof css == 'string'){
					styleValue = css;
				} else if (cc){
					classValue = css['class'] || '';
					styleValue = css['style'] || '';
				}
				var cls = classValue ? 'class="' + classValue + '"' : '';
				var style = col.hidden ? 'style="display:none;' + styleValue + '"' : (styleValue ? 'style="' + styleValue + '"' : '');
				
				cc.push('<td field="' + field + '" ' + cls + ' ' + style + '>');
				
				if (col.checkbox){
					style = '';
				} else if (col.expander){
					style = "text-align:center;height:16px;";
				} else {
					style = styleValue;
					if (col.align){style += ';text-align:' + col.align + ';'}
					if (!opts.nowrap){
						style += ';white-space:normal;height:auto;';
					} else if (opts.autoRowHeight){
						style += ';height:auto;';
					}
				}
				
				cc.push('<div style="' + style + '" ');
				if (col.checkbox){
					cc.push('class="datagrid-cell-check ');
				} else {
					cc.push('class="datagrid-cell ' + col.cellClass);
				}
				cc.push('">');
				
				if (col.checkbox){
					cc.push('<input type="checkbox" name="' + field + '" value="' + (value!=undefined ? value : '') + '">');
				} else if (col.expander) {
					//cc.push('<div style="text-align:center;width:16px;height:16px;">');
					cc.push('<span class="datagrid-row-expander datagrid-row-expand" style="display:inline-block;width:16px;height:16px;cursor:pointer;" />');
					//cc.push('</div>');
				} else if (col.formatter){
					cc.push(col.formatter(value, rowData, rowIndex));
				} else {
					cc.push(value);
				}
				
				cc.push('</div>');
				cc.push('</td>');
			}
		}
		return cc.join('');
	},
	
	insertRow: function(target, index, row){
		var opts = $.data(target, 'datagrid').options;
		var dc = $.data(target, 'datagrid').dc;
		var panel = $(target).datagrid('getPanel');
		var view1 = dc.view1;
		var view2 = dc.view2;
		
		var isAppend = false;
		var rowLength = $(target).datagrid('getRows').length;
		if (rowLength == 0){
			$(target).datagrid('loadData',{total:1,rows:[row]});
			return;
		}
		
		if (index == undefined || index == null || index >= rowLength) {
			index = rowLength;
			isAppend = true;
			this.canUpdateDetail = false;
		}
		
		$.fn.datagrid.defaults.view.insertRow.call(this, target, index, row);
		
		_insert(true);
		_insert(false);
		
		this.canUpdateDetail = true;
		
		function _insert(frozen){
			var v = frozen ? view1 : view2;
			var tr = v.find('tr[datagrid-row-index='+index+']');
			
			if (isAppend){
				var newDetail = tr.next().clone();
			} else {
				var newDetail = tr.next().next().clone();
			}
			newDetail.insertAfter(tr);
			newDetail.hide();
			if (!frozen){
				newDetail.find('div.datagrid-row-detail').html(opts.detailFormatter.call(target, index, row));
			}
			
		}
	},
	
	deleteRow: function(target, index){
		var opts = $.data(target, 'datagrid').options;
		var dc = $.data(target, 'datagrid').dc;
		var tr = opts.finder.getTr(target, index);
		tr.next().remove();
		$.fn.datagrid.defaults.view.deleteRow.call(this, target, index);
		dc.body2.triggerHandler('scroll');
	},
	
	updateRow: function(target, rowIndex, row){
		var dc = $.data(target, 'datagrid').dc;
		var opts = $.data(target, 'datagrid').options;
		var cls = $(target).datagrid('getExpander', rowIndex).attr('class');
		$.fn.datagrid.defaults.view.updateRow.call(this, target, rowIndex, row);
		$(target).datagrid('getExpander', rowIndex).attr('class',cls);
		
		// update the detail content
		if (this.canUpdateDetail){
			var row = $(target).datagrid('getRows')[rowIndex];
			var detail = $(target).datagrid('getRowDetail', rowIndex);
			detail.html(opts.detailFormatter.call(target, rowIndex, row));
		}
	},
	
	bindEvents: function(target){
		var state = $.data(target, 'datagrid');
		var dc = state.dc;
		var opts = state.options;
		var body = dc.body1.add(dc.body2);
		var clickHandler = ($.data(body[0],'events')||$._data(body[0],'events')).click[0].handler;
		body.unbind('click').bind('click', function(e){
			var tt = $(e.target);
			var tr = tt.closest('tr.datagrid-row');
			if (!tr.length){return}
			if (tt.hasClass('datagrid-row-expander')){
				var rowIndex = parseInt(tr.attr('datagrid-row-index'));
				$(target).datagrid('selectRow',rowIndex);
				if (tt.hasClass('datagrid-row-expand')){
					for(var i=0;i<$(target).datagrid('getRows').length;i++){
						$('#ddv-'+i).empty();
						$(target).datagrid('collapseRow', i);
					}
					
					$(window).resize(function(){
						if($('#ddv-'+rowIndex)[0]){
							var _w=$(window).width()-50;
							$('#ddv-'+rowIndex).width(_w);	
						}
					});
					
					$(target).datagrid('expandRow', rowIndex);
				} else {
					$(target).datagrid('collapseRow', rowIndex);
				}
				$(target).datagrid('fixRowHeight');
				
			} else {
				clickHandler(e);
			}
			e.stopPropagation();
		});
	},
	
	onBeforeRender: function(target){
		var state = $.data(target, 'datagrid');
		var opts = state.options;
		var dc = state.dc;
		var t = $(target);
		var hasExpander = false;
		var fields = t.datagrid('getColumnFields',true).concat(t.datagrid('getColumnFields'));
		for(var i=0; i<fields.length; i++){
			var col = t.datagrid('getColumnOption', fields[i]);
			if (col.expander){
				hasExpander = true;
				break;
			}
		}
		if (!hasExpander){
			if (opts.frozenColumns && opts.frozenColumns.length){
				opts.frozenColumns[0].splice(0,0,{field:'_expander',expander:true,width:24,resizable:false,fixed:true});
			} else {
				opts.frozenColumns = [[{field:'_expander',expander:true,width:24,resizable:false,fixed:true}]];
			}
			
			var t = dc.view1.children('div.datagrid-header').find('table');
			var td = $('<td rowspan="'+opts.frozenColumns.length+'"><div class="datagrid-header-expander" style="width:24px;"></div></td>');
			if ($('tr',t).length == 0){
				td.wrap('<tr></tr>').parent().appendTo($('tbody',t));
			} else if (opts.rownumbers){
				td.insertAfter(t.find('td:has(div.datagrid-header-rownumber)'));
			} else {
				td.prependTo(t.find('tr:first'));
			}
		}
		
		var that = this;
		setTimeout(function(){
			that.bindEvents(target);
		},0);
	},
	
	onAfterRender: function(target){
		var that = this;
		var state = $.data(target, 'datagrid');
		var dc = state.dc;
		var opts = state.options;
		var panel = $(target).datagrid('getPanel');
		
		$.fn.datagrid.defaults.view.onAfterRender.call(this, target);
		
		if (!state.onResizeColumn){
			state.onResizeColumn = opts.onResizeColumn;
		}
		if (!state.onResize){
			state.onResize = opts.onResize;
		}
		function setBodyTableWidth(){
			var columnWidths = dc.view2.children('div.datagrid-header').find('table').width();
			dc.body2.children('table').width(columnWidths);
		}
		
		opts.onResizeColumn = function(field, width){
			setBodyTableWidth();
			var rowCount = $(target).datagrid('getRows').length;
			for(var i=0; i<rowCount; i++){
				$(target).datagrid('fixDetailRowHeight', i);
			}
			
			// call the old event code
			state.onResizeColumn.call(target, field, width);
		};
		opts.onResize = function(width, height){
			setBodyTableWidth();
			state.onResize.call(panel, width, height);
		};
		
		this.canUpdateDetail = true;	// define if to update the detail content when 'updateRow' method is called;
		
		dc.footer1.find('span.datagrid-row-expander').css('visibility', 'hidden');
		$(target).datagrid('resize');
	}
});

$.extend($.fn.datagrid.methods, {
	fixDetailRowHeight: function(jq, index){
		return jq.each(function(){
			var opts = $.data(this, 'datagrid').options;
			if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))){
			//	return;
			}
			var dc = $.data(this, 'datagrid').dc;
			var tr1 = opts.finder.getTr(this, index, 'body', 1).next();
			var tr2 = opts.finder.getTr(this, index, 'body', 2).next();
			// fix the detail row height
			if (tr2.is(':visible')){
				tr1.css('height', 150);
				tr2.css('height', '');
					var height = Math.max(tr1.height(), tr2.height());
					tr1.css('height', height);
					tr2.css('height', height);
			}
			dc.body2.triggerHandler('scroll');
		});
	},
	getExpander: function(jq, index){	// get row expander object
		var opts = $.data(jq[0], 'datagrid').options;
		return opts.finder.getTr(jq[0], index).find('span.datagrid-row-expander');
	},
	// get row detail container
	getRowDetail: function(jq, index){
		var opts = $.data(jq[0], 'datagrid').options;
		var tr = opts.finder.getTr(jq[0], index, 'body', 2);
		return tr.next().find('div.datagrid-row-detail');
	},
	expandRow: function(jq, index){
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			var dc = $.data(this, 'datagrid').dc;
			var expander = $(this).datagrid('getExpander', index);
			if (expander.hasClass('datagrid-row-expand')){
				expander.removeClass('datagrid-row-expand').addClass('datagrid-row-collapse');
				var tr1 = opts.finder.getTr(this, index, 'body', 1).next();
				var tr2 = opts.finder.getTr(this, index, 'body', 2).next();
				tr1.show().height(150);
				tr2.show();
				$(this).datagrid('fixDetailRowHeight', index);
				if (opts.onExpandRow){
					var row = $(this).datagrid('getRows')[index];
					opts.onExpandRow.call(this, index, row);
				}
			}
		});
	},
	collapseRow: function(jq, index){
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			var dc = $.data(this, 'datagrid').dc;
			var expander = $(this).datagrid('getExpander', index);
			if (expander.hasClass('datagrid-row-collapse')){
				expander.removeClass('datagrid-row-collapse').addClass('datagrid-row-expand');
				var tr1 = opts.finder.getTr(this, index, 'body', 1).next();
				var tr2 = opts.finder.getTr(this, index, 'body', 2).next();
				tr1.hide();
				tr2.hide();
				dc.body2.triggerHandler('scroll');
				if (opts.onCollapseRow){
					var row = $(this).datagrid('getRows')[index];
					opts.onCollapseRow.call(this, index, row);
				}
			}
		});
	}
});
/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
$(_2).appendTo("body");
$(_2).addClass("menu-top");
$(document).unbind(".menu").bind("mousedown.menu",function(e){
var _3=$("body>div.menu:visible");
var m=$(e.target).closest("div.menu",_3);
if(m.length){
return;
}
$("body>div.menu-top:visible").menu("hide");
});
var _4=_5($(_2));
for(var i=0;i<_4.length;i++){
_6(_4[i]);
}
function _5(_7){
var _8=[];
_7.addClass("menu");
_8.push(_7);
if(!_7.hasClass("menu-content")){
_7.children("div").each(function(){
var _9=$(this).children("div");
if(_9.length){
_9.insertAfter(_2);
this.submenu=_9;
var mm=_5(_9);
_8=_8.concat(mm);
}
});
}
return _8;
};
function _6(_a){
var _b=$.parser.parseOptions(_a[0],["width"]).width;
if(_a.hasClass("menu-content")){
_a[0].originalWidth=_b||_a._outerWidth();
}else{
_a[0].originalWidth=_b||0;
_a.children("div").each(function(){
var _c=$(this);
var _d=$.extend({},$.parser.parseOptions(this,["name","iconCls","href",{separator:"boolean"}]),{disabled:(_c.attr("disabled")?true:undefined)});
if(_d.separator){
_c.addClass("menu-sep");
}
if(!_c.hasClass("menu-sep")){
_c[0].itemName=_d.name||"";
_c[0].itemHref=_d.href||"";
var _e=_c.addClass("menu-item").html();
_c.empty().append($("<div class=\"menu-text\"></div>").html(_e));
if(_d.iconCls){
$("<div class=\"menu-icon\"></div>").addClass(_d.iconCls).appendTo(_c);
}
if(_d.disabled){
_f(_2,_c[0],true);
}
if(_c[0].submenu){
$("<div class=\"menu-rightarrow\"></div>").appendTo(_c);
}
_10(_2,_c);
}
});
$("<div class=\"menu-line\"></div>").prependTo(_a);
}
_11(_2,_a);
_a.hide();
_12(_2,_a);
};
};
function _11(_13,_14){
var _15=$.data(_13,"menu").options;
var _16=_14.attr("style");
_14.css({display:"block",left:-10000,height:"auto",overflow:"hidden"});
var _17=0;
_14.find("div.menu-text").each(function(){
if(_17<$(this)._outerWidth()){
_17=$(this)._outerWidth();
}
$(this).closest("div.menu-item")._outerHeight($(this)._outerHeight()+2);
});
_17+=65;
_14._outerWidth(Math.max((_14[0].originalWidth||0),_17,_15.minWidth));
_14.children("div.menu-line")._outerHeight(_14.outerHeight());
_14.attr("style",_16);
};
function _12(_18,_19){
var _1a=$.data(_18,"menu");
_19.unbind(".menu").bind("mouseenter.menu",function(){
if(_1a.timer){
clearTimeout(_1a.timer);
_1a.timer=null;
}
}).bind("mouseleave.menu",function(){
if(_1a.options.hideOnUnhover){
_1a.timer=setTimeout(function(){
_1b(_18);
},100);
}
});
};
function _10(_1c,_1d){
if(!_1d.hasClass("menu-item")){
return;
}
_1d.unbind(".menu");
_1d.bind("click.menu",function(){
if($(this).hasClass("menu-item-disabled")){
return;
}
if(!this.submenu){
_1b(_1c);
var _1e=$(this).attr("href");
if(_1e){
location.href=_1e;
}
}
var _1f=$(_1c).menu("getItem",this);
$.data(_1c,"menu").options.onClick.call(_1c,_1f);
}).bind("mouseenter.menu",function(e){
_1d.siblings().each(function(){
if(this.submenu){
_22(this.submenu);
}
$(this).removeClass("menu-active");
});
_1d.addClass("menu-active");
if($(this).hasClass("menu-item-disabled")){
_1d.addClass("menu-active-disabled");
return;
}
var _20=_1d[0].submenu;
if(_20){
$(_1c).menu("show",{menu:_20,parent:_1d});
}
}).bind("mouseleave.menu",function(e){
_1d.removeClass("menu-active menu-active-disabled");
var _21=_1d[0].submenu;
if(_21){
if(e.pageX>=parseInt(_21.css("left"))){
_1d.addClass("menu-active");
}else{
_22(_21);
}
}else{
_1d.removeClass("menu-active");
}
});
};
function _1b(_23){
var _24=$.data(_23,"menu");
if(_24){
if($(_23).is(":visible")){
_22($(_23));
_24.options.onHide.call(_23);
}
}
return false;
};
function _25(_26,_27){
var _28,top;
_27=_27||{};
var _29=$(_27.menu||_26);
if(_29.hasClass("menu-top")){
var _2a=$.data(_26,"menu").options;
$.extend(_2a,_27);
_28=_2a.left;
top=_2a.top;
if(_2a.alignTo){
var at=$(_2a.alignTo);
_28=at.offset().left;
top=at.offset().top+at._outerHeight();
}
if(_28+_29.outerWidth()>$(window)._outerWidth()+$(document)._scrollLeft()){
_28=$(window)._outerWidth()+$(document).scrollLeft()-_29.outerWidth()-5;
}
if(top+_29.outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
top=$(window)._outerHeight()+$(document).scrollTop()-_29.outerHeight()-5;
}
}else{
var _2b=_27.parent;
_28=_2b.offset().left+_2b.outerWidth()-2;
if(_28+_29.outerWidth()+5>$(window)._outerWidth()+$(document).scrollLeft()){
_28=_2b.offset().left-_29.outerWidth()+2;
}
var top=_2b.offset().top-3;
if(top+_29.outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
top=$(window)._outerHeight()+$(document).scrollTop()-_29.outerHeight()-5;
}
}
_29.css({left:_28,top:top});
_29.show(0,function(){
if(!_29[0].shadow){
_29[0].shadow=$("<div class=\"menu-shadow\"></div>").insertAfter(_29);
}
_29[0].shadow.css({display:"block",zIndex:$.fn.menu.defaults.zIndex++,left:_29.css("left"),top:_29.css("top"),width:_29.outerWidth(),height:_29.outerHeight()});
_29.css("z-index",$.fn.menu.defaults.zIndex++);
if(_29.hasClass("menu-top")){
$.data(_29[0],"menu").options.onShow.call(_29[0]);
}
});
};
function _22(_2c){
if(!_2c){
return;
}
_2d(_2c);
_2c.find("div.menu-item").each(function(){
if(this.submenu){
_22(this.submenu);
}
$(this).removeClass("menu-active");
});
function _2d(m){
m.stop(true,true);
if(m[0].shadow){
m[0].shadow.hide();
}
m.hide();
};
};
function _2e(_2f,_30){
var _31=null;
var tmp=$("<div></div>");
function _32(_33){
_33.children("div.menu-item").each(function(){
var _34=$(_2f).menu("getItem",this);
var s=tmp.empty().html(_34.text).text();
if(_30==$.trim(s)){
_31=_34;
}else{
if(this.submenu&&!_31){
_32(this.submenu);
}
}
});
};
_32($(_2f));
tmp.remove();
return _31;
};
function _f(_35,_36,_37){
var t=$(_36);
if(!t.hasClass("menu-item")){
return;
}
if(_37){
t.addClass("menu-item-disabled");
if(_36.onclick){
_36.onclick1=_36.onclick;
_36.onclick=null;
}
}else{
t.removeClass("menu-item-disabled");
if(_36.onclick1){
_36.onclick=_36.onclick1;
_36.onclick1=null;
}
}
};
function _38(_39,_3a){
var _3b=$(_39);
if(_3a.parent){
if(!_3a.parent.submenu){
var _3c=$("<div class=\"menu\"><div class=\"menu-line\"></div></div>").appendTo("body");
_3c.hide();
_3a.parent.submenu=_3c;
$("<div class=\"menu-rightarrow\"></div>").appendTo(_3a.parent);
}
_3b=_3a.parent.submenu;
}
if(_3a.separator){
var _3d=$("<div class=\"menu-sep\"></div>").appendTo(_3b);
}else{
var _3d=$("<div class=\"menu-item\"></div>").appendTo(_3b);
$("<div class=\"menu-text\"></div>").html(_3a.text).appendTo(_3d);
}
if(_3a.iconCls){
$("<div class=\"menu-icon\"></div>").addClass(_3a.iconCls).appendTo(_3d);
}
if(_3a.id){
_3d.attr("id",_3a.id);
}
if(_3a.name){
_3d[0].itemName=_3a.name;
}
if(_3a.href){
_3d[0].itemHref=_3a.href;
}
if(_3a.onclick){
if(typeof _3a.onclick=="string"){
_3d.attr("onclick",_3a.onclick);
}else{
_3d[0].onclick=eval(_3a.onclick);
}
}
if(_3a.handler){
_3d[0].onclick=eval(_3a.handler);
}
if(_3a.disabled){
_f(_39,_3d[0],true);
}
_10(_39,_3d);
_12(_39,_3b);
_11(_39,_3b);
};
function _3e(_3f,_40){
function _41(el){
if(el.submenu){
el.submenu.children("div.menu-item").each(function(){
_41(this);
});
var _42=el.submenu[0].shadow;
if(_42){
_42.remove();
}
el.submenu.remove();
}
$(el).remove();
};
_41(_40);
};
function _43(_44){
$(_44).children("div.menu-item").each(function(){
_3e(_44,this);
});
if(_44.shadow){
_44.shadow.remove();
}
$(_44).remove();
};
$.fn.menu=function(_45,_46){
if(typeof _45=="string"){
return $.fn.menu.methods[_45](this,_46);
}
_45=_45||{};
return this.each(function(){
var _47=$.data(this,"menu");
if(_47){
$.extend(_47.options,_45);
}else{
_47=$.data(this,"menu",{options:$.extend({},$.fn.menu.defaults,$.fn.menu.parseOptions(this),_45)});
_1(this);
}
$(this).css({left:_47.options.left,top:_47.options.top});
});
};
$.fn.menu.methods={options:function(jq){
return $.data(jq[0],"menu").options;
},show:function(jq,pos){
return jq.each(function(){
_25(this,pos);
});
},hide:function(jq){
return jq.each(function(){
_1b(this);
});
},destroy:function(jq){
return jq.each(function(){
_43(this);
});
},setText:function(jq,_48){
return jq.each(function(){
$(_48.target).children("div.menu-text").html(_48.text);
});
},setIcon:function(jq,_49){
return jq.each(function(){
var _4a=$(this).menu("getItem",_49.target);
if(_4a.iconCls){
$(_4a.target).children("div.menu-icon").removeClass(_4a.iconCls).addClass(_49.iconCls);
}else{
$("<div class=\"menu-icon\"></div>").addClass(_49.iconCls).appendTo(_49.target);
}
});
},getItem:function(jq,_4b){
var t=$(_4b);
var _4c={target:_4b,id:t.attr("id"),text:$.trim(t.children("div.menu-text").html()),disabled:t.hasClass("menu-item-disabled"),name:_4b.itemName,href:_4b.itemHref,onclick:_4b.onclick};
var _4d=t.children("div.menu-icon");
if(_4d.length){
var cc=[];
var aa=_4d.attr("class").split(" ");
for(var i=0;i<aa.length;i++){
if(aa[i]!="menu-icon"){
cc.push(aa[i]);
}
}
_4c.iconCls=cc.join(" ");
}
return _4c;
},findItem:function(jq,_4e){
return _2e(jq[0],_4e);
},appendItem:function(jq,_4f){
return jq.each(function(){
_38(this,_4f);
});
},removeItem:function(jq,_50){
return jq.each(function(){
_3e(this,_50);
});
},enableItem:function(jq,_51){
return jq.each(function(){
_f(this,_51,false);
});
},disableItem:function(jq,_52){
return jq.each(function(){
_f(this,_52,true);
});
}};
$.fn.menu.parseOptions=function(_53){
return $.extend({},$.parser.parseOptions(_53,["left","top",{minWidth:"number",hideOnUnhover:"boolean"}]));
};
$.fn.menu.defaults={zIndex:110000,left:0,top:0,minWidth:120,hideOnUnhover:true,onShow:function(){
},onHide:function(){
},onClick:function(_54){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"menubutton").options;
var _4=$(_2);
_4.removeClass(_3.cls.btn1+" "+_3.cls.btn2).addClass("m-btn");
_4.linkbutton($.extend({},_3,{text:_3.text+"<span class=\""+_3.cls.arrow+"\">&nbsp;</span>"}));
if(_3.menu){
$(_3.menu).menu();
var _5=$(_3.menu).menu("options");
var _6=_5.onShow;
var _7=_5.onHide;
$.extend(_5,{onShow:function(){
var _8=$(this).menu("options");
var _9=$(_8.alignTo);
var _a=_9.menubutton("options");
_9.addClass((_a.plain==true)?_a.cls.btn2:_a.cls.btn1);
_6.call(this);
},onHide:function(){
var _b=$(this).menu("options");
var _c=$(_b.alignTo);
var _d=_c.menubutton("options");
_c.removeClass((_d.plain==true)?_d.cls.btn2:_d.cls.btn1);
_7.call(this);
}});
}
_e(_2,_3.disabled);
};
function _e(_f,_10){
var _11=$.data(_f,"menubutton").options;
_11.disabled=_10;
var btn=$(_f);
var t=btn.find("."+_11.cls.trigger);
if(!t.length){
t=btn;
}
t.unbind(".menubutton");
if(_10){
btn.linkbutton("disable");
}else{
btn.linkbutton("enable");
var _12=null;
t.bind("click.menubutton",function(){
_13(_f);
return false;
}).bind("mouseenter.menubutton",function(){
_12=setTimeout(function(){
_13(_f);
},_11.duration);
return false;
}).bind("mouseleave.menubutton",function(){
if(_12){
clearTimeout(_12);
}
});
}
};
function _13(_14){
var _15=$.data(_14,"menubutton").options;
if(_15.disabled||!_15.menu){
return;
}
$("body>div.menu-top").menu("hide");
var btn=$(_14);
var mm=$(_15.menu);
if(mm.length){
mm.menu("options").alignTo=btn;
mm.menu("show",{alignTo:btn});
}
btn.blur();
};
$.fn.menubutton=function(_16,_17){
if(typeof _16=="string"){
var _18=$.fn.menubutton.methods[_16];
if(_18){
return _18(this,_17);
}else{
return this.linkbutton(_16,_17);
}
}
_16=_16||{};
return this.each(function(){
var _19=$.data(this,"menubutton");
if(_19){
$.extend(_19.options,_16);
}else{
$.data(this,"menubutton",{options:$.extend({},$.fn.menubutton.defaults,$.fn.menubutton.parseOptions(this),_16)});
$(this).removeAttr("disabled");
}
_1(this);
});
};
$.fn.menubutton.methods={options:function(jq){
var _1a=jq.linkbutton("options");
var _1b=$.data(jq[0],"menubutton").options;
_1b.toggle=_1a.toggle;
_1b.selected=_1a.selected;
return _1b;
},enable:function(jq){
return jq.each(function(){
_e(this,false);
});
},disable:function(jq){
return jq.each(function(){
_e(this,true);
});
},destroy:function(jq){
return jq.each(function(){
var _1c=$(this).menubutton("options");
if(_1c.menu){
$(_1c.menu).menu("destroy");
}
$(this).remove();
});
}};
$.fn.menubutton.parseOptions=function(_1d){
var t=$(_1d);
return $.extend({},$.fn.linkbutton.parseOptions(_1d),$.parser.parseOptions(_1d,["menu",{plain:"boolean",duration:"number"}]));
};
$.fn.menubutton.defaults=$.extend({},$.fn.linkbutton.defaults,{plain:true,menu:null,duration:100,cls:{btn1:"m-btn-active",btn2:"m-btn-plain-active",arrow:"m-btn-downarrow",trigger:"m-btn"}});
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
$(_2).addClass("searchbox-f").hide();
var _3=$("<span class=\"searchbox\"></span>").insertAfter(_2);
var _4=$("<input type=\"text\" class=\"searchbox-text\">").appendTo(_3);
$("<span><span class=\"searchbox-button\"></span></span>").appendTo(_3);
var _5=$(_2).attr("name");
if(_5){
_4.attr("name",_5);
$(_2).removeAttr("name").attr("searchboxName",_5);
}
return _3;
};
function _6(_7,_8){
var _9=$.data(_7,"searchbox").options;
var sb=$.data(_7,"searchbox").searchbox;
if(_8){
_9.width=_8;
}
sb.appendTo("body");
if(isNaN(_9.width)){
_9.width=sb._outerWidth();
}
var _a=sb.find("span.searchbox-button");
var _b=sb.find("a.searchbox-menu");
var _c=sb.find("input.searchbox-text");
sb._outerWidth(_9.width)._outerHeight(_9.height);
_c._outerWidth(sb.width()-_b._outerWidth()-_a._outerWidth());
_c.css({height:sb.height()+"px",lineHeight:sb.height()+"px"});
_b._outerHeight(sb.height());
_a._outerHeight(sb.height());
var _d=_b.find("span.l-btn-left");
_d._outerHeight(sb.height());
_d.find("span.l-btn-text,span.m-btn-downarrow").css({height:_d.height()+"px",lineHeight:_d.height()+"px"});
sb.insertAfter(_7);
};
function _e(_f){
var _10=$.data(_f,"searchbox");
var _11=_10.options;
if(_11.menu){
_10.menu=$(_11.menu).menu({onClick:function(_12){
_13(_12);
}});
var _14=_10.menu.children("div.menu-item:first");
_10.menu.children("div.menu-item").each(function(){
var _15=$.extend({},$.parser.parseOptions(this),{selected:($(this).attr("selected")?true:undefined)});
if(_15.selected){
_14=$(this);
return false;
}
});
_14.triggerHandler("click");
}else{
_10.searchbox.find("a.searchbox-menu").remove();
_10.menu=null;
}
function _13(_16){
_10.searchbox.find("a.searchbox-menu").remove();
var mb=$("<a class=\"searchbox-menu\" href=\"javascript:void(0)\"></a>").html(_16.text);
mb.prependTo(_10.searchbox).menubutton({menu:_10.menu,iconCls:_16.iconCls});
_10.searchbox.find("input.searchbox-text").attr("name",_16.name||_16.text);
_6(_f);
};
};
function _17(_18){
var _19=$.data(_18,"searchbox");
var _1a=_19.options;
var _1b=_19.searchbox.find("input.searchbox-text");
var _1c=_19.searchbox.find(".searchbox-button");
_1b.unbind(".searchbox").bind("blur.searchbox",function(e){
_1a.value=$(this).val();
if(_1a.value==""){
$(this).val(_1a.prompt);
$(this).addClass("searchbox-prompt");
}else{
$(this).removeClass("searchbox-prompt");
}
}).bind("focus.searchbox",function(e){
if($(this).val()!=_1a.value){
$(this).val(_1a.value);
}
$(this).removeClass("searchbox-prompt");
}).bind("keydown.searchbox",function(e){
if(e.keyCode==13){
e.preventDefault();
_1a.value=$(this).val();
_1a.searcher.call(_18,_1a.value,_1b._propAttr("name"));
return false;
}
});
_1c.unbind(".searchbox").bind("click.searchbox",function(){
_1a.searcher.call(_18,_1a.value,_1b._propAttr("name"));
}).bind("mouseenter.searchbox",function(){
$(this).addClass("searchbox-button-hover");
}).bind("mouseleave.searchbox",function(){
$(this).removeClass("searchbox-button-hover");
});
};
function _1d(_1e){
var _1f=$.data(_1e,"searchbox");
var _20=_1f.options;
var _21=_1f.searchbox.find("input.searchbox-text");
if(_20.value==""){
_21.val(_20.prompt);
_21.addClass("searchbox-prompt");
}else{
_21.val(_20.value);
_21.removeClass("searchbox-prompt");
}
};
$.fn.searchbox=function(_22,_23){
if(typeof _22=="string"){
return $.fn.searchbox.methods[_22](this,_23);
}
_22=_22||{};
return this.each(function(){
var _24=$.data(this,"searchbox");
if(_24){
$.extend(_24.options,_22);
}else{
_24=$.data(this,"searchbox",{options:$.extend({},$.fn.searchbox.defaults,$.fn.searchbox.parseOptions(this),_22),searchbox:_1(this)});
}
_e(this);
_1d(this);
_17(this);
_6(this);
});
};
$.fn.searchbox.methods={options:function(jq){
return $.data(jq[0],"searchbox").options;
},menu:function(jq){
return $.data(jq[0],"searchbox").menu;
},textbox:function(jq){
return $.data(jq[0],"searchbox").searchbox.find("input.searchbox-text");
},getValue:function(jq){
return $.data(jq[0],"searchbox").options.value;
},setValue:function(jq,_25){
return jq.each(function(){
$(this).searchbox("options").value=_25;
$(this).searchbox("textbox").val(_25);
$(this).searchbox("textbox").blur();
});
},getName:function(jq){
return $.data(jq[0],"searchbox").searchbox.find("input.searchbox-text").attr("name");
},selectName:function(jq,_26){
return jq.each(function(){
var _27=$.data(this,"searchbox").menu;
if(_27){
_27.children("div.menu-item[name=\""+_26+"\"]").triggerHandler("click");
}
});
},destroy:function(jq){
return jq.each(function(){
var _28=$(this).searchbox("menu");
if(_28){
_28.menu("destroy");
}
$.data(this,"searchbox").searchbox.remove();
$(this).remove();
});
},resize:function(jq,_29){
return jq.each(function(){
_6(this,_29);
});
}};
$.fn.searchbox.parseOptions=function(_2a){
var t=$(_2a);
return $.extend({},$.parser.parseOptions(_2a,["width","height","prompt","menu"]),{value:t.val(),searcher:(t.attr("searcher")?eval(t.attr("searcher")):undefined)});
};
$.fn.searchbox.defaults={width:"auto",height:22,prompt:"",value:"",menu:null,searcher:function(_2b,_2c){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
$(_2).addClass("tooltip-f");
};
function _3(_4){
var _5=$.data(_4,"tooltip").options;
$(_4).unbind(".tooltip").bind(_5.showEvent+".tooltip",function(e){
_10(_4,e);
}).bind(_5.hideEvent+".tooltip",function(e){
_17(_4,e);
}).bind("mousemove.tooltip",function(e){
if(_5.trackMouse){
_5.trackMouseX=e.pageX;
_5.trackMouseY=e.pageY;
_6(_4);
}
});
};
function _7(_8){
var _9=$.data(_8,"tooltip");
if(_9.showTimer){
clearTimeout(_9.showTimer);
_9.showTimer=null;
}
if(_9.hideTimer){
clearTimeout(_9.hideTimer);
_9.hideTimer=null;
}
};
function _6(_a){
var _b=$.data(_a,"tooltip");
if(!_b||!_b.tip){
return;
}
var _c=_b.options;
var _d=_b.tip;
if(_c.trackMouse){
t=$();
var _e=_c.trackMouseX+_c.deltaX;
var _f=_c.trackMouseY+_c.deltaY;
}else{
var t=$(_a);
var _e=t.offset().left+_c.deltaX;
var _f=t.offset().top+_c.deltaY;
}
switch(_c.position){
case "right":
_e+=t._outerWidth()+12+(_c.trackMouse?12:0);
_f-=(_d._outerHeight()-t._outerHeight())/2;
break;
case "left":
_e-=_d._outerWidth()+12+(_c.trackMouse?12:0);
_f-=(_d._outerHeight()-t._outerHeight())/2;
break;
case "top":
_e-=(_d._outerWidth()-t._outerWidth())/2;
_f-=_d._outerHeight()+12+(_c.trackMouse?12:0);
break;
case "bottom":
_e-=(_d._outerWidth()-t._outerWidth())/2;
_f+=t._outerHeight()+12+(_c.trackMouse?12:0);
break;
}
if(!$(_a).is(":visible")){
_e=-100000;
_f=-100000;
}
_d.css({left:_e,top:_f,zIndex:(_c.zIndex!=undefined?_c.zIndex:($.fn.window?$.fn.window.defaults.zIndex++:""))});
_c.onPosition.call(_a,_e,_f);
};
function _10(_11,e){
var _12=$.data(_11,"tooltip");
var _13=_12.options;
var tip=_12.tip;
if(!tip){
tip=$("<div tabindex=\"-1\" class=\"tooltip\">"+"<div class=\"tooltip-content\"></div>"+"<div class=\"tooltip-arrow-outer\"></div>"+"<div class=\"tooltip-arrow\"></div>"+"</div>").appendTo("body");
_12.tip=tip;
_14(_11);
}
tip.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-"+_13.position);
_7(_11);
_12.showTimer=setTimeout(function(){
_6(_11);
tip.show();
_13.onShow.call(_11,e);
var _15=tip.children(".tooltip-arrow-outer");
var _16=tip.children(".tooltip-arrow");
var bc="border-"+_13.position+"-color";
_15.add(_16).css({borderTopColor:"",borderBottomColor:"",borderLeftColor:"",borderRightColor:""});
_15.css(bc,tip.css(bc));
_16.css(bc,tip.css("backgroundColor"));
},_13.showDelay);
};
function _17(_18,e){
var _19=$.data(_18,"tooltip");
if(_19&&_19.tip){
_7(_18);
_19.hideTimer=setTimeout(function(){
_19.tip.hide();
_19.options.onHide.call(_18,e);
},_19.options.hideDelay);
}
};
function _14(_1a,_1b){
var _1c=$.data(_1a,"tooltip");
var _1d=_1c.options;
if(_1b){
_1d.content=_1b;
}
if(!_1c.tip){
return;
}
var cc=typeof _1d.content=="function"?_1d.content.call(_1a):_1d.content;
_1c.tip.children(".tooltip-content").html(cc);
_1d.onUpdate.call(_1a,cc);
};
function _1e(_1f){
var _20=$.data(_1f,"tooltip");
if(_20){
_7(_1f);
var _21=_20.options;
if(_20.tip){
_20.tip.remove();
}
if(_21._title){
$(_1f).attr("title",_21._title);
}
$.removeData(_1f,"tooltip");
$(_1f).unbind(".tooltip").removeClass("tooltip-f");
_21.onDestroy.call(_1f);
}
};
$.fn.tooltip=function(_22,_23){
if(typeof _22=="string"){
return $.fn.tooltip.methods[_22](this,_23);
}
_22=_22||{};
return this.each(function(){
var _24=$.data(this,"tooltip");
if(_24){
$.extend(_24.options,_22);
}else{
$.data(this,"tooltip",{options:$.extend({},$.fn.tooltip.defaults,$.fn.tooltip.parseOptions(this),_22)});
_1(this);
}
_3(this);
_14(this);
});
};
$.fn.tooltip.methods={options:function(jq){
return $.data(jq[0],"tooltip").options;
},tip:function(jq){
return $.data(jq[0],"tooltip").tip;
},arrow:function(jq){
return jq.tooltip("tip").children(".tooltip-arrow-outer,.tooltip-arrow");
},show:function(jq,e){
return jq.each(function(){
_10(this,e);
});
},hide:function(jq,e){
return jq.each(function(){
_17(this,e);
});
},update:function(jq,_25){
return jq.each(function(){
_14(this,_25);
});
},reposition:function(jq){
return jq.each(function(){
_6(this);
});
},destroy:function(jq){
return jq.each(function(){
_1e(this);
});
}};
$.fn.tooltip.parseOptions=function(_26){
var t=$(_26);
var _27=$.extend({},$.parser.parseOptions(_26,["position","showEvent","hideEvent","content",{deltaX:"number",deltaY:"number",showDelay:"number",hideDelay:"number"}]),{_title:t.attr("title")});
t.attr("title","");
if(!_27.content){
_27.content=_27._title;
}
return _27;
};
$.fn.tooltip.defaults={position:"bottom",content:null,trackMouse:false,deltaX:0,deltaY:0,showEvent:"mouseenter",hideEvent:"mouseleave",showDelay:200,hideDelay:100,onShow:function(e){
},onHide:function(e){
},onUpdate:function(_28){
},onPosition:function(_29,top){
},onDestroy:function(){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
$(_2).addClass("validatebox-text");
};
function _3(_4){
var _5=$.data(_4,"validatebox");
_5.validating=false;
if(_5.timer){
clearTimeout(_5.timer);
}
$(_4).tooltip("destroy");
$(_4).unbind();
$(_4).remove();
};
function _6(_7){
var _8=$(_7);
var _9=$.data(_7,"validatebox");
_8.unbind(".validatebox");
if(_9.options.novalidate){
return;
}
_8.bind("focus.validatebox",function(){
_9.validating=true;
_9.value=undefined;
(function(){
if(_9.validating){
if(_9.value!=_8.val()){
_9.value=_8.val();
if(_9.timer){
clearTimeout(_9.timer);
}
_9.timer=setTimeout(function(){
$(_7).validatebox("validate");
},_9.options.delay);
}else{
_f(_7);
}
setTimeout(arguments.callee,200);
}
})();
}).bind("blur.validatebox",function(){
if(_9.timer){
clearTimeout(_9.timer);
_9.timer=undefined;
}
_9.validating=false;
_a(_7);
}).bind("mouseenter.validatebox",function(){
if(_8.hasClass("validatebox-invalid")){
_b(_7);
}
}).bind("mouseleave.validatebox",function(){
if(!_9.validating){
_a(_7);
}
});
};
function _b(_c){
var _d=$.data(_c,"validatebox");
var _e=_d.options;
$(_c).tooltip($.extend({},_e.tipOptions,{content:_d.message,position:_e.tipPosition,deltaX:_e.deltaX})).tooltip("show");
_d.tip=true;
};
function _f(_10){
var _11=$.data(_10,"validatebox");
if(_11&&_11.tip){
$(_10).tooltip("reposition");
}
};
function _a(_12){
var _13=$.data(_12,"validatebox");
_13.tip=false;
$(_12).tooltip("hide");
};
function _14(_15){
var _16=$.data(_15,"validatebox");
var _17=_16.options;
var box=$(_15);
var _18=box.val();
function _19(msg){
_16.message=msg;
};
function _1a(_1b){
var _1c=/([a-zA-Z_]+)(.*)/.exec(_1b);
var _1d=_17.rules[_1c[1]];
if(_1d&&_18){
var _1e=eval(_1c[2]);
if(!_1d["validator"](_18,_1e)){
box.addClass("validatebox-invalid");
var _1f=_1d["message"];
if(_1e){
for(var i=0;i<_1e.length;i++){
_1f=_1f.replace(new RegExp("\\{"+i+"\\}","g"),_1e[i]);
}
}
_19(_17.invalidMessage||_1f);
if(_16.validating){
_b(_15);
}
return false;
}
}
return true;
};
box.removeClass("validatebox-invalid");
_a(_15);
if(_17.novalidate||box.is(":disabled")){
return true;
}
if(_17.required){
if(_18==""){
box.addClass("validatebox-invalid");
_19(_17.missingMessage);
if(_16.validating){
_b(_15);
}
return false;
}
}
if(_17.validType){
if(typeof _17.validType=="string"){
if(!_1a(_17.validType)){
return false;
}
}else{
for(var i=0;i<_17.validType.length;i++){
if(!_1a(_17.validType[i])){
return false;
}
}
}
}
return true;
};
function _20(_21,_22){
var _23=$.data(_21,"validatebox").options;
if(_22!=undefined){
_23.novalidate=_22;
}
if(_23.novalidate){
$(_21).removeClass("validatebox-invalid");
_a(_21);
}
_6(_21);
};
$.fn.validatebox=function(_24,_25){
if(typeof _24=="string"){
return $.fn.validatebox.methods[_24](this,_25);
}
_24=_24||{};
return this.each(function(){
var _26=$.data(this,"validatebox");
if(_26){
$.extend(_26.options,_24);
}else{
_1(this);
$.data(this,"validatebox",{options:$.extend({},$.fn.validatebox.defaults,$.fn.validatebox.parseOptions(this),_24)});
}
_20(this);
//_14(this);
});
};
$.fn.validatebox.methods={options:function(jq){
return $.data(jq[0],"validatebox").options;
},destroy:function(jq){
return jq.each(function(){
_3(this);
});
},validate:function(jq){
return jq.each(function(){
_14(this);
});
},isValid:function(jq){
return _14(jq[0]);
},enableValidation:function(jq){
return jq.each(function(){
_20(this,false);
});
},disableValidation:function(jq){
return jq.each(function(){
_20(this,true);
});
}};
$.fn.validatebox.parseOptions=function(_27){
var t=$(_27);
return $.extend({},$.parser.parseOptions(_27,["validType","missingMessage","invalidMessage","tipPosition",{delay:"number",deltaX:"number"}]),{required:(t.attr("required")?true:undefined),novalidate:(t.attr("novalidate")!=undefined?true:undefined)});
};
$.fn.validatebox.defaults={required:false,validType:null,delay:200,missingMessage:"This field is required.",invalidMessage:null,tipPosition:"right",deltaX:0,novalidate:false,tipOptions:{showEvent:"none",hideEvent:"none",showDelay:0,hideDelay:0,zIndex:"",onShow:function(){
$(this).tooltip("tip").css({color:"#000",borderColor:"#CC9933",backgroundColor:"#FFFFCC"});
},onHide:function(){
$(this).tooltip("destroy");
}},rules:{email:{validator:function(_28){
return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_28);
},message:"Please enter a valid email address."},url:{validator:function(_29){
return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_29);
},message:"Please enter a valid URL."},length:{validator:function(_2a,_2b){
var len=$.trim(_2a).length;
return len>=_2b[0]&&len<=_2b[1];
},message:"Please enter a value between {0} and {1}."},remote:{validator:function(_2c,_2d){
var _2e={};
_2e[_2d[1]]=_2c;
var _2f=$.ajax({url:_2d[0],dataType:"json",data:_2e,async:false,cache:false,type:"post"}).responseText;
return _2f=="true";
},message:"Please fix this field."}}};
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2,_3){
var _4=$.data(_2,"combo");
var _5=_4.options;
var _6=_4.combo;
var _7=_4.panel;
if(_3){
_5.width=_3;
}
if(isNaN(_5.width)){
var c=$(_2).clone();
c.css("visibility","hidden");
c.appendTo("body");
_5.width=$(_2).outerWidth();
c.remove();
}
_6.appendTo("body");
var _8=_6.find("input.combo-text");
var _9=_6.find(".combo-arrow");
var _a=_5.hasDownArrow?_9._outerWidth():0;
_6._outerWidth(_5.width)._outerHeight(_5.height);
_8._outerWidth(_6.width()-_a);
_8.css({height:_6.height()+"px",lineHeight:_6.height()+"px"});
_9._outerHeight(_6.height());
_7.panel("resize",{width:(_5.panelWidth?_5.panelWidth:_6.outerWidth()),height:_5.panelHeight});
_6.insertAfter(_2);
};
function _b(_c){
$(_c).addClass("combo-f").hide();
var _d=$("<span class=\"combo\">"+"<input type=\"text\" class=\"combo-text\" autocomplete=\"off\">"+"<span><span class=\"combo-arrow\"></span></span>"+"<input type=\"hidden\" class=\"combo-value\">"+"</span>").insertAfter(_c);
var _e=$("<div class=\"combo-panel\"></div>").appendTo("body");
_e.panel({doSize:false,closed:true,cls:"combo-p",style:{position:"absolute",zIndex:10},onOpen:function(){
$(this).panel("resize");
},onClose:function(){
var _f=$.data(_c,"combo");
if(_f){
_f.options.onHidePanel.call(_c);
}
}});
var _10=$(_c).attr("name");
if(_10){
_d.find("input.combo-value").attr("name",_10);
$(_c).removeAttr("name").attr("comboName",_10);
}
return {combo:_d,panel:_e};
};
function _11(_12){
var _13=$.data(_12,"combo");
var _14=_13.options;
var _15=_13.combo;
if(_14.hasDownArrow){
_15.find(".combo-arrow").show();
}else{
_15.find(".combo-arrow").hide();
}
_16(_12,_14.disabled);
_17(_12,_14.readonly);
};
function _18(_19){
var _1a=$.data(_19,"combo");
var _1b=_1a.combo.find("input.combo-text");
_1b.validatebox("destroy");
_1a.panel.panel("destroy");
_1a.combo.remove();
$(_19).remove();
};
function _1c(_1d){
$(_1d).find(".combo-f").each(function(){
var p=$(this).combo("panel");
if(p.is(":visible")){
p.panel("close");
}
});
};
function _1e(_1f){
var _20=$.data(_1f,"combo");
var _21=_20.options;
var _22=_20.panel;
var _23=_20.combo;
var _24=_23.find(".combo-text");
var _25=_23.find(".combo-arrow");
$(document).unbind(".combo").bind("mousedown.combo",function(e){
var p=$(e.target).closest("span.combo,div.combo-p");
if(p.length){
_1c(p);
return;
}
$("body>div.combo-p>div.combo-panel:visible").panel("close");
});
_24.unbind(".combo");
_25.unbind(".combo");
if(!_21.disabled&&!_21.readonly){
_24.bind("click.combo",function(e){
if(!_21.editable){
_26.call(this);
}else{
var p=$(this).closest("div.combo-panel");
$("div.combo-panel:visible").not(_22).not(p).panel("close");
}
}).bind("keydown.combo",function(e){
switch(e.keyCode){
case 38:
_21.keyHandler.up.call(_1f,e);
break;
case 40:
_21.keyHandler.down.call(_1f,e);
break;
case 37:
_21.keyHandler.left.call(_1f,e);
break;
case 39:
_21.keyHandler.right.call(_1f,e);
break;
case 13:
e.preventDefault();
_21.keyHandler.enter.call(_1f,e);
return false;
case 9:
case 27:
_27(_1f);
break;
default:
if(_21.editable){
if(_20.timer){
clearTimeout(_20.timer);
}
_20.timer=setTimeout(function(){
var q=_24.val();
if(_20.previousValue!=q){
_20.previousValue=q;
$(_1f).combo("showPanel");
_21.keyHandler.query.call(_1f,_24.val(),e);
$(_1f).combo("validate");
}
},_21.delay);
}
}
});
_25.bind("click.combo",function(){
_26.call(this);
}).bind("mouseenter.combo",function(){
$(this).addClass("combo-arrow-hover");
}).bind("mouseleave.combo",function(){
$(this).removeClass("combo-arrow-hover");
});
}
function _26(){
if(_22.is(":visible")){
_1c(_22);
_27(_1f);
}else{
var p=$(this).closest("div.combo-panel");
$("div.combo-panel:visible").not(_22).not(p).panel("close");
$(_1f).combo("showPanel");
}
_24.focus();
};
};
function _28(_29){
var _2a=$.data(_29,"combo").options;
var _2b=$.data(_29,"combo").combo;
var _2c=$.data(_29,"combo").panel;
if($.fn.window){
_2c.panel("panel").css("z-index",$.fn.window.defaults.zIndex++);
}
_2c.panel("move",{left:_2b.offset().left,top:_2d()});
if(_2c.panel("options").closed){
_2c.panel("open");
_2a.onShowPanel.call(_29);
}
(function(){
if(_2c.is(":visible")){
_2c.panel("move",{left:_2e(),top:_2d()});
setTimeout(arguments.callee,200);
}
})();
function _2e(){
var _2f=_2b.offset().left;
if(_2f+_2c._outerWidth()>$(window)._outerWidth()+$(document).scrollLeft()){
_2f=$(window)._outerWidth()+$(document).scrollLeft()-_2c._outerWidth();
}
if(_2f<0){
_2f=0;
}
return _2f;
};
function _2d(){
var top=_2b.offset().top+_2b._outerHeight();
if(top+_2c._outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
top=_2b.offset().top-_2c._outerHeight();
}
if(top<$(document).scrollTop()){
top=_2b.offset().top+_2b._outerHeight();
}
return top;
};
};
function _27(_30){
var _31=$.data(_30,"combo").panel;
_31.panel("close");
};
function _32(_33){
var _34=$.data(_33,"combo").options;
var _35=$(_33).combo("textbox");
_35.validatebox($.extend({},_34,{deltaX:(_34.hasDownArrow?_34.deltaX:(_34.deltaX>0?1:-1))}));
};
function _16(_36,_37){
var _38=$.data(_36,"combo");
var _39=_38.options;
var _3a=_38.combo;
if(_37){
_39.disabled=true;
$(_36).attr("disabled",true);
_3a.find(".combo-value").attr("disabled",true);
_3a.find(".combo-text").attr("disabled",true);
}else{
_39.disabled=false;
$(_36).removeAttr("disabled");
_3a.find(".combo-value").removeAttr("disabled");
_3a.find(".combo-text").removeAttr("disabled");
}
};
function _17(_3b,_3c){
var _3d=$.data(_3b,"combo");
var _3e=_3d.options;
_3e.readonly=_3c==undefined?true:_3c;
var _3f=_3e.readonly?true:(!_3e.editable);
_3d.combo.find(".combo-text").attr("readonly",_3f).css("cursor",_3f?"pointer":"");
};
function _40(_41){
var _42=$.data(_41,"combo");
var _43=_42.options;
var _44=_42.combo;
if(_43.multiple){
_44.find("input.combo-value").remove();
}else{
_44.find("input.combo-value").val("");
}
_44.find("input.combo-text").val("");
};
function _45(_46){
var _47=$.data(_46,"combo").combo;
return _47.find("input.combo-text").val();
};
function _48(_49,_4a){
var _4b=$.data(_49,"combo");
var _4c=_4b.combo.find("input.combo-text");
if(_4c.val()!=_4a){
_4c.val(_4a);
$(_49).combo("validate");
_4b.previousValue=_4a;
}
};
function _4d(_4e){
var _4f=[];
var _50=$.data(_4e,"combo").combo;
_50.find("input.combo-value").each(function(){
_4f.push($(this).val());
});
return _4f;
};
function _51(_52,_53){
var _54=$.data(_52,"combo").options;
var _55=_4d(_52);
var _56=$.data(_52,"combo").combo;
_56.find("input.combo-value").remove();
var _57=$(_52).attr("comboName");
for(var i=0;i<_53.length;i++){
var _58=$("<input type=\"hidden\" class=\"combo-value\">").appendTo(_56);
if(_57){
_58.attr("name",_57);
}
_58.val(_53[i]);
}
var tmp=[];
for(var i=0;i<_55.length;i++){
tmp[i]=_55[i];
}
var aa=[];
for(var i=0;i<_53.length;i++){
for(var j=0;j<tmp.length;j++){
if(_53[i]==tmp[j]){
aa.push(_53[i]);
tmp.splice(j,1);
break;
}
}
}
if(aa.length!=_53.length||_53.length!=_55.length){
if(_54.multiple){
_54.onChange.call(_52,_53,_55);
}else{
_54.onChange.call(_52,_53[0],_55[0]);
}
}
};
function _59(_5a){
var _5b=_4d(_5a);
return _5b[0];
};
function _5c(_5d,_5e){
_51(_5d,[_5e]);
};
function _5f(_60){
var _61=$.data(_60,"combo").options;
var fn=_61.onChange;
_61.onChange=function(){
};
if(_61.multiple){
if(_61.value){
if(typeof _61.value=="object"){
_51(_60,_61.value);
}else{
_5c(_60,_61.value);
}
}else{
_51(_60,[]);
}
_61.originalValue=_4d(_60);
}else{
_5c(_60,_61.value);
_61.originalValue=_61.value;
}
_61.onChange=fn;
};
$.fn.combo=function(_62,_63){
if(typeof _62=="string"){
var _64=$.fn.combo.methods[_62];
if(_64){
return _64(this,_63);
}else{

return this.each(function(){
var _65=$(this).combo("textbox");
_65.validatebox(_62,_63);
});
}
}
_62=_62||{};
return this.each(function(){
var _66=$.data(this,"combo");
if(_66){
$.extend(_66.options,_62);
}else{
var r=_b(this);
_66=$.data(this,"combo",{options:$.extend({},$.fn.combo.defaults,$.fn.combo.parseOptions(this),_62),combo:r.combo,panel:r.panel,previousValue:null});
$(this).removeAttr("disabled");
}
_11(this);
_1(this);
_1e(this);
_32(this);
_5f(this);
});
};
$.fn.combo.methods={options:function(jq){
return $.data(jq[0],"combo").options;
},panel:function(jq){
return $.data(jq[0],"combo").panel;
},textbox:function(jq){
return $.data(jq[0],"combo").combo.find("input.combo-text");
},destroy:function(jq){
return jq.each(function(){
_18(this);
});
},resize:function(jq,_67){
return jq.each(function(){
_1(this,_67);
});
},showPanel:function(jq){
return jq.each(function(){
_28(this);
});
},hidePanel:function(jq){
return jq.each(function(){
_27(this);
});
},disable:function(jq){
return jq.each(function(){
_16(this,true);
_1e(this);
});
},enable:function(jq){
return jq.each(function(){
_16(this,false);
_1e(this);
});
},readonly:function(jq,_68){
return jq.each(function(){
_17(this,_68);
_1e(this);
});
},isValid:function(jq){
var _69=$.data(jq[0],"combo").combo.find("input.combo-text");
return _69.validatebox("isValid");
},clear:function(jq){
return jq.each(function(){
_40(this);
});
},reset:function(jq){
return jq.each(function(){
var _6a=$.data(this,"combo").options;
if(_6a.multiple){
$(this).combo("setValues",_6a.originalValue);
}else{
$(this).combo("setValue",_6a.originalValue);
}
});
},getText:function(jq){
return _45(jq[0]);
},setText:function(jq,_6b){
return jq.each(function(){
_48(this,_6b);
});
},getValues:function(jq){
return _4d(jq[0]);
},setValues:function(jq,_6c){
return jq.each(function(){
_51(this,_6c);
var _65=$.data(this,"combo").options;
$(this).next('.combo').find('.combo-value').attr('defaultValue',_65.originalValue);
});
},getValue:function(jq){
return _59(jq[0]);
},setValue:function(jq,_6d){
return jq.each(function(){
_5c(this,_6d);
});
}};
$.fn.combo.parseOptions=function(_6e){
var t=$(_6e);
return $.extend({},$.fn.validatebox.parseOptions(_6e),$.parser.parseOptions(_6e,["width","height","separator",{panelWidth:"number",editable:"boolean",hasDownArrow:"boolean",delay:"number",selectOnNavigation:"boolean"}]),{panelHeight:(t.attr("panelHeight")=="auto"?"auto":parseInt(t.attr("panelHeight"))||undefined),multiple:(t.attr("multiple")?true:undefined),disabled:(t.attr("disabled")?true:undefined),readonly:(t.attr("readonly")?true:undefined),value:(t.val()||undefined)});
};
$.fn.combo.defaults=$.extend({},$.fn.validatebox.defaults,{width:"auto",height:22,panelWidth:null,panelHeight:'auto',multiple:false,prompt:'请选择...',selectOnNavigation:true,separator:",",editable:true,disabled:false,readonly:false,hasDownArrow:true,value:"",delay:200,deltaX:19,keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
},query:function(q,e){
}},onShowPanel:function(){
},onHidePanel:function(){
},onChange:function(_6f,_70){
}});
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2,_3,_4,_5){
var _6=$.data(_2,"combobox");
var _7=_6.options;
if(_5){
return _8(_6.groups,_4,_3);
}else{
return _8(_6.data,(_4?_4:_6.options.valueField),_3);
}
function _8(_9,_a,_b){
for(var i=0;i<_9.length;i++){
var _c=_9[i];
if(_c[_a]==_b){
return _c;
}
}
return null;
};
};
function _d(_e,_f){
var _10=$(_e).combo("panel");
var row=_1(_e,_f);
if(row){
var _11=$("#"+row.domId);
if(_11.position().top<=0){
var h=_10.scrollTop()+_11.position().top;
_10.scrollTop(h);
}else{
if(_11.position().top+_11.outerHeight()>_10.height()){
var h=_10.scrollTop()+_11.position().top+_11.outerHeight()-_10.height();
_10.scrollTop(h);
}
}
}
};
function nav(_12,dir){
var _13=$.data(_12,"combobox").options;
var _14=$(_12).combobox("panel");
var _15=_14.children("div.combobox-item-hover");
if(!_15.length){
_15=_14.children("div.combobox-item-selected");
}
_15.removeClass("combobox-item-hover");
var _16="div.combobox-item:visible:not(.combobox-item-disabled):first";
var _17="div.combobox-item:visible:not(.combobox-item-disabled):last";
if(!_15.length){
_15=_14.children(dir=="next"?_16:_17);
}else{
if(dir=="next"){
_15=_15.nextAll(_16);
if(!_15.length){
_15=_14.children(_16);
}
}else{
_15=_15.prevAll(_16);
if(!_15.length){
_15=_14.children(_17);
}
}
}
if(_15.length){
_15.addClass("combobox-item-hover");
var row=_1(_12,_15.attr("id"),"domId");
if(row){
_d(_12,row[_13.valueField]);
if(_13.selectOnNavigation){
_18(_12,row[_13.valueField]);
}
}
}
};
function _18(_19,_1a){
var _1b=$.data(_19,"combobox").options;
var _1c=$(_19).combo("getValues");
if($.inArray(_1a+"",_1c)==-1){
if(_1b.multiple){
_1c.push(_1a);
}else{
_1c=[_1a];
}
_1d(_19,_1c);
_1b.onSelect.call(_19,_1(_19,_1a));
}
};
function _1e(_1f,_20){
var _21=$.data(_1f,"combobox").options;
var _22=$(_1f).combo("getValues");
var _23=$.inArray(_20+"",_22);
if(_23>=0){
_22.splice(_23,1);
_1d(_1f,_22);
_21.onUnselect.call(_1f,_1(_1f,_20));
}
};
function _1d(_24,_25,_26){
var _27=$.data(_24,"combobox").options;
var _28=$(_24).combo("panel");
_28.find("div.combobox-item-selected").removeClass("combobox-item-selected");
var vv=[],ss=[];
for(var i=0;i<_25.length;i++){
var v=_25[i];
var s=v;
var row=_1(_24,v);
if(row){
s=row[_27.textField];
$("#"+row.domId).addClass("combobox-item-selected");
}
vv.push(v);
ss.push(s);
}
$(_24).combo("setValues",vv);
if(!_26){
$(_24).combo("setText",ss.join(_27.separator));
}
};
var _29=1;
function _2a(_2b,_2c,_2d){
var _2e=$.data(_2b,"combobox");
var _2f=_2e.options;
_2e.data=_2f.loadFilter.call(_2b,_2c);
_2e.groups=[];
_2c=_2e.data;
var _30=$(_2b).combobox("getValues");
var dd=[];
var _31=undefined;
for(var i=0;i<_2c.length;i++){
var row=_2c[i];
var v=row[_2f.valueField]+"";
var s=row[_2f.textField];
var g=row[_2f.groupField];
if(g){
if(_31!=g){
_31=g;
var _32={value:g,domId:("_easyui_combobox_"+_29++)};
_2e.groups.push(_32);
dd.push("<div id=\""+_32.domId+"\" class=\"combobox-group\">");
dd.push(_2f.groupFormatter?_2f.groupFormatter.call(_2b,g):g);
dd.push("</div>");
}
}else{
_31=undefined;
}
var cls="combobox-item"+(row.disabled?" combobox-item-disabled":"")+(g?" combobox-gitem":"");
row.domId="_easyui_combobox_"+_29++;
dd.push("<div id=\""+row.domId+"\" class=\""+cls+"\">");
dd.push(_2f.formatter?_2f.formatter.call(_2b,row):s);
dd.push("</div>");
if(row["selected"]&&$.inArray(v,_30)==-1){
_30.push(v);
}
}
$(_2b).combo("panel").html(dd.join(""));
if(_2f.multiple){
_1d(_2b,_30,_2d);
}else{
_1d(_2b,_30.length?[_30[_30.length-1]]:[],_2d);
}
_2f.onLoadSuccess.call(_2b,_2c);
};
function _33(_34,url,_35,_36){
var _37=$.data(_34,"combobox").options;
if(url){
_37.url=url;
}
_35=_35||{};
if(_37.onBeforeLoad.call(_34,_35)==false){
return;
}
_37.loader.call(_34,_35,function(_38){
_2a(_34,_38,_36);
},function(){
_37.onLoadError.apply(this,arguments);
});
};
function _39(_3a,q){
var _3b=$.data(_3a,"combobox");
var _3c=_3b.options;
if(_3c.multiple&&!q){
_1d(_3a,[],true);
}else{
_1d(_3a,[q],true);
}
if(_3c.mode=="remote"){
_33(_3a,null,{q:q},true);
}else{
var _3d=$(_3a).combo("panel");
_3d.find("div.combobox-item,div.combobox-group").hide();
var _3e=_3b.data;
var _3f=undefined;
for(var i=0;i<_3e.length;i++){
var row=_3e[i];
if(_3c.filter.call(_3a,q,row)){
var v=row[_3c.valueField];
var s=row[_3c.textField];
var g=row[_3c.groupField];
var _40=$("#"+row.domId).show();
if(s.toLowerCase()==q.toLowerCase()){
_1d(_3a,[v]);
_40.addClass("combobox-item-selected");
}
if(_3c.groupField&&_3f!=g){
var _41=_1(_3a,g,"value",true);
if(_41){
$("#"+_41.domId).show();
}
_3f=g;
}
}
}
}
};
function _42(_43){
var t=$(_43);
var _44=t.combobox("options");
var _45=t.combobox("panel");
var _46=_45.children("div.combobox-item-hover");
if(!_46.length){
_46=_45.children("div.combobox-item-selected");
}
if(!_46.length){
return;
}
var row=_1(_43,_46.attr("id"),"domId");
if(!row){
return;
}
var _47=row[_44.valueField];
if(_44.multiple){
if(_46.hasClass("combobox-item-selected")){
t.combobox("unselect",_47);
}else{
t.combobox("select",_47);
}
}else{
t.combobox("select",_47);
t.combobox("hidePanel");
}
var vv=[];
var _48=t.combobox("getValues");
for(var i=0;i<_48.length;i++){
if(_1(_43,_48[i])){
vv.push(_48[i]);
}
}
t.combobox("setValues",vv);
};
function _49(_4a){
var _4b=$.data(_4a,"combobox").options;
$(_4a).addClass("combobox-f");
$(_4a).combo($.extend({},_4b,{onShowPanel:function(){
$(_4a).combo("panel").find("div.combobox-item,div.combobox-group").show();
_d(_4a,$(_4a).combobox("getValue"));
_4b.onShowPanel.call(_4a);
}}));
$(_4a).combo("panel").unbind().bind("mouseover",function(e){
$(this).children("div.combobox-item-hover").removeClass("combobox-item-hover");
var _4c=$(e.target).closest("div.combobox-item");
if(!_4c.hasClass("combobox-item-disabled")){
_4c.addClass("combobox-item-hover");
}
e.stopPropagation();
}).bind("mouseout",function(e){
$(e.target).closest("div.combobox-item").removeClass("combobox-item-hover");
e.stopPropagation();
}).bind("click",function(e){
var _4d=$(e.target).closest("div.combobox-item");
if(!_4d.length||_4d.hasClass("combobox-item-disabled")){
return;
}
var row=_1(_4a,_4d.attr("id"),"domId");
if(!row){
return;
}
var _4e=row[_4b.valueField];
if(_4b.multiple){
if(_4d.hasClass("combobox-item-selected")){
_1e(_4a,_4e);
}else{
_18(_4a,_4e);
}
}else{
_18(_4a,_4e);
$(_4a).combo("hidePanel");
}
e.stopPropagation();
});
};
$.fn.combobox=function(_4f,_50){
if(typeof _4f=="string"){
var _51=$.fn.combobox.methods[_4f];
if(_51){
return _51(this,_50);
}else{
return this.combo(_4f,_50);
}
}
_4f=_4f||{};
return this.each(function(){
var _52=$.data(this,"combobox");
if(_52){
$.extend(_52.options,_4f);
_49(this);
}else{
_52=$.data(this,"combobox",{options:$.extend({},$.fn.combobox.defaults,$.fn.combobox.parseOptions(this),_4f),data:[]});
_49(this);
var _53=$.fn.combobox.parseData(this);
if(_53.length){
_2a(this,_53);
}
}
if(_52.options.data){
_52.options.data = $.extend(true, [], _52.options.data);
_2a(this,_52.options.data);
}
_33(this);
});
};
$.fn.combobox.methods={options:function(jq){
var _54=jq.combo("options");
return $.extend($.data(jq[0],"combobox").options,{originalValue:_54.originalValue,disabled:_54.disabled,readonly:_54.readonly});
},getData:function(jq){
return $.data(jq[0],"combobox").data;
},setValues:function(jq,_55){
return jq.each(function(){
_1d(this,_55);
});
},setValue:function(jq,_56){
return jq.each(function(){
_1d(this,[_56]);
$(this).combo("options").originalValue=[_56];
$(this).next('.combo').find('.combo-value').attr('defaultValue',[_56]);
});
},clear:function(jq){
return jq.each(function(){
$(this).combo("clear");
var _57=$(this).combo("panel");
_57.find("div.combobox-item-selected").removeClass("combobox-item-selected");
});
},reset:function(jq){
return jq.each(function(){
var _58=$(this).combobox("options");
if(_58.multiple){
$(this).combobox("setValues",_58.originalValue);
}else{
$(this).combobox("setValue",_58.originalValue);
}
});
},loadData:function(jq,_59){
return jq.each(function(){
_2a(this,_59);
});
},reload:function(jq,url){
return jq.each(function(){
_33(this,url);
});
},select:function(jq,_5a){
return jq.each(function(){
_18(this,_5a);
});
},unselect:function(jq,_5b){
return jq.each(function(){
_1e(this,_5b);
});
}};
$.fn.combobox.parseOptions=function(_5c){
var t=$(_5c);
return $.extend({},$.fn.combo.parseOptions(_5c),$.parser.parseOptions(_5c,["valueField","textField","groupField","mode","method","url"]));
};
$.fn.combobox.parseData=function(_5d){
var _5e=[];
var _5f=$(_5d).combobox("options");
$(_5d).children().each(function(){
if(this.tagName.toLowerCase()=="optgroup"){
var _60=$(this).attr("label");
$(this).children().each(function(){
_61(this,_60);
});
}else{
_61(this);
}
});
return _5e;
function _61(el,_62){
var t=$(el);
var row={};
row[_5f.valueField]=t.attr("value")!=undefined?t.attr("value"):t.html();
row[_5f.textField]=t.html();
row["selected"]=t.is(":selected");
row["disabled"]=t.is(":disabled");
if(_62){
_5f.groupField=_5f.groupField||"group";
row[_5f.groupField]=_62;
}
_5e.push(row);
};
};
$.fn.combobox.defaults=$.extend({},$.fn.combo.defaults,{valueField:"value",textField:"text",groupField:null,groupFormatter:function(_63){
return _63;
},mode:"local",method:"post",url:null,data:null,keyHandler:{up:function(e){
nav(this,"prev");
e.preventDefault();
},down:function(e){
nav(this,"next");
e.preventDefault();
},left:function(e){
},right:function(e){
},enter:function(e){
_42(this);
},query:function(q,e){
_39(this,q);
}},filter:function(q,row){
var _64=$(this).combobox("options");
return row[_64.textField].toLowerCase().indexOf(q.toLowerCase())==0;
},formatter:function(row){
var _65=$(this).combobox("options");
return row[_65.textField];
},loader:function(_66,_67,_68){
var _69=$(this).combobox("options");
if(!_69.url){
return false;
}
$.ajax({type:_69.method,url:_69.url,data:_66,dataType:"json",success:function(_6a){
_67(_6a);
},error:function(){
_68.apply(this,arguments);
}});
},loadFilter:function(_6b){
return _6b;
},onBeforeLoad:function(_6c){
},onLoadSuccess:function(){
},onLoadError:function(){
},onSelect:function(_6d){
},onUnselect:function(_6e){
}});
})(jQuery);


/**
[my97]
*/
var $dp,WdatePicker;(function(){var $={
$langList:[
 {name:"en",charset:"UTF-8"},
 {name:"zh-cn",charset:"UTF-8"},
 {name:"zh-tw",charset:"UTF-8"}],
$skinList:[
 {name:"default",charset:"gb2312"},
 {name:"whyGreen",charset:"gb2312"},
 {name:"blue",charset:"gb2312"},
 {name:"ext",charset:"gb2312"},
 {name:"twoer",charset:"gb2312"}],
$wdate:true,
$crossFrame:true,
$preLoad:false,
//$dpPath:"../assets/js/libs/my97/",
doubleCalendar:false,
enableKeyboard:true,
enableInputMask:true,
autoUpdateOnChanged:null,
weekMethod:"ISO8601",
position:{},
lang:"auto",
skin:"blue",
dateFmt:"yyyy-MM-dd",
realDateFmt:"yyyy-MM-dd",
realTimeFmt:"HH:mm:ss",
realFullFmt:"%Date %Time",
minDate:"1900-01-01 00:00:00",
maxDate:"2099-12-31 23:59:59",
startDate:"",
alwaysUseStartDate:false,
yearOffset:1911,
firstDayOfWeek:0,
isShowWeek:false,
highLineWeekDay:true,
isShowClear:true,
isShowToday:true,
isShowOK:true,
isShowOthers:true,
readOnly:false,
errDealMode:0,
autoPickDate:null,
qsEnabled:true,
autoShowQS:false,

specialDates:null,specialDays:null,disabledDates:null,disabledDays:null,opposite:false,onpicking:null,onpicked:null,onclearing:null,oncleared:null,ychanging:null,ychanged:null,Mchanging:null,Mchanged:null,dchanging:null,dchanged:null,Hchanging:null,Hchanged:null,mchanging:null,mchanged:null,schanging:null,schanged:null,eCont:null,vel:null,elProp:"",errMsg:"",quickSel:[],has:{},getRealLang:function(){var _=$.$langList;for(var A=0;A<_.length;A++)if(_[A].name==this.lang)return _[A];return _[0]}};WdatePicker=T;var X=window,S={innerHTML:""},M="document",H="documentElement",C="getElementsByTagName",U,A,R,G,a,W=navigator.appName;if(W=="Microsoft Internet Explorer")R=true;else if(W=="Opera")a=true;else G=true;A=$.$dpPath||J();U=X;if($.$crossFrame){try{while(U.parent!=U&&U.parent[M][C]("frameset").length==0)U=U.parent}catch(N){}}if(!U.$dp)U.$dp={ff:G,ie:R,opera:a,status:0,defMinDate:$.minDate,defMaxDate:$.maxDate};B();if($.$preLoad&&$dp.status==0)E(X,"onload",function(){T(null,true)});if(!X[M].docMD){E(X[M],"onmousedown",D);X[M].docMD=true}if(!U[M].docMD){E(U[M],"onmousedown",D);U[M].docMD=true}E(X,"onunload",function(){if($dp.dd)O($dp.dd,"none")});function B(){try{U[M],U.$dp=U.$dp||{}}catch($){U=X;$dp=$dp||{}}var A={win:X,$:function($){return(typeof $=="string")?X[M].getElementById($):$},$D:function($,_){return this.$DV(this.$($).value,_)},$DV:function(_,$){if(_!=""){this.dt=$dp.cal.splitDate(_,$dp.cal.dateFmt);if($)for(var B in $)if(this.dt[B]===undefined)this.errMsg="invalid property:"+B;else{this.dt[B]+=$[B];if(B=="M"){var C=$["M"]>0?1:0,A=new Date(this.dt["y"],this.dt["M"],0).getDate();this.dt["d"]=Math.min(A+C,this.dt["d"])}}if(this.dt.refresh())return this.dt}return""},show:function(){var A=U[M].getElementsByTagName("div"),$=100000;for(var B=0;B<A.length;B++){var _=parseInt(A[B].style.zIndex);if(_>$)$=_}this.dd.style.zIndex=$+2;O(this.dd,"block")},hide:function(){O(this.dd,"none")},attachEvent:E};for(var _ in A)U.$dp[_]=A[_];$dp=U.$dp}function E(A,$,_){if(R)A.attachEvent($,_);else if(_){var B=$.replace(/on/,"");_._ieEmuEventHandler=function($){return _($)};A.addEventListener(B,_._ieEmuEventHandler,false)}}function J(){var _,A,$=X[M][C]("script");for(var B=0;B<$.length;B++){_=$[B].getAttribute("src")||"";_=_.substr(0,_.toLowerCase().indexOf("boot.js"));A=_.lastIndexOf("/");if(A>0)_=_.substring(0,A+1);if(_)break} return _+'assets/js/libs/my97/';}function K(A,$,B){var D=X[M][C]("HEAD").item(0),_=X[M].createElement("link");if(D){_.href=A;_.rel="stylesheet";_.type="text/css";if($)_.title=$;if(B)_.charset=B;D.appendChild(_)}}function F($){$=$||U;var A=0,_=0;while($!=U){var D=$.parent[M][C]("iframe");for(var F=0;F<D.length;F++){try{if(D[F].contentWindow==$){var E=V(D[F]);A+=E.left;_+=E.top;break}}catch(B){}}$=$.parent}return{"leftM":A,"topM":_}}function V(G,F){if(G.getBoundingClientRect)return G.getBoundingClientRect();else{var A={ROOT_TAG:/^body|html$/i,OP_SCROLL:/^(?:inline|table-row)$/i},E=false,I=null,_=G.offsetTop,H=G.offsetLeft,D=G.offsetWidth,B=G.offsetHeight,C=G.offsetParent;if(C!=G)while(C){H+=C.offsetLeft;_+=C.offsetTop;if(Q(C,"position").toLowerCase()=="fixed")E=true;else if(C.tagName.toLowerCase()=="body")I=C.ownerDocument.defaultView;C=C.offsetParent}C=G.parentNode;while(C.tagName&&!A.ROOT_TAG.test(C.tagName)){if(C.scrollTop||C.scrollLeft)if(!A.OP_SCROLL.test(O(C)))if(!a||C.style.overflow!=="visible"){H-=C.scrollLeft;_-=C.scrollTop}C=C.parentNode}if(!E){var $=Z(I);H-=$.left;_-=$.top}D+=H;B+=_;return{"left":H,"top":_,"right":D,"bottom":B}}}function L($){$=$||U;var B=$[M],A=($.innerWidth)?$.innerWidth:(B[H]&&B[H].clientWidth)?B[H].clientWidth:B.body.offsetWidth,_=($.innerHeight)?$.innerHeight:(B[H]&&B[H].clientHeight)?B[H].clientHeight:B.body.offsetHeight;return{"width":A,"height":_}}function Z($){$=$||U;var B=$[M],A=B[H],_=B.body;B=(A&&A.scrollTop!=null&&(A.scrollTop>_.scrollTop||A.scrollLeft>_.scrollLeft))?A:_;return{"top":B.scrollTop,"left":B.scrollLeft}}function D($){try{var _=$?($.srcElement||$.target):null;if($dp.cal&&!$dp.eCont&&$dp.dd&&_!=$dp.el&&$dp.dd.style.display=="block")$dp.cal.close()}catch($){}}function Y(){$dp.status=2}var P,_;function T(N,F){if(!$dp)return;B();N=N||{};for(var K in $)if(K.substring(0,1)!="$"&&N[K]===undefined)N[K]=$[K];if(F){if(!L()){_=_||setInterval(function(){if(U[M].readyState=="complete")clearInterval(_);T(null,true)},50);return}if($dp.status==0){$dp.status=1;N.el=S;I(N,true)}else return}else if(N.eCont){N.eCont=$dp.$(N.eCont);N.el=S;N.autoPickDate=true;N.qsEnabled=false;I(N)}else{if($.$preLoad&&$dp.status!=2)return;var J=H();if(X.event===J||J){N.srcEl=J.srcElement||J.target;J.cancelBubble=true}N.el=N.el=$dp.$(N.el||N.srcEl);if(!N.el||N.el["My97Mark"]===true||N.el.disabled||($dp.dd&&O($dp.dd)!="none"&&$dp.dd.style.left!="-970px")){try{if(N.el["My97Mark"])N.el["My97Mark"]=false}catch(C){}return}if(J&&N.el.nodeType==1&&N.el["My97Mark"]===undefined){var A,D;if(J.type=="focus")E(N.el,"onclick",function(){T(N)});else E(N.el,"onfocus",function(){T(N)})}I(N)}function L(){if(R&&U!=X&&U[M].readyState!="complete")return false;return true}function H(){if(G){func=H.caller;while(func!=null){var $=func.arguments[0];if($&&($+"").indexOf("Event")>=0)return $;func=func.caller}return null}return event}}function Q(_,$){return _.currentStyle?_.currentStyle[$]:document.defaultView.getComputedStyle(_,false)[$]}function O(_,$){if(_)if($!=null)_.style.display=$;else return Q(_,"display")}function I(G,_){var D=G.el?G.el.nodeName:"INPUT";if(_||G.eCont||new RegExp(/input|textarea|div|span|p|a/ig).test(D))G.elProp=D=="INPUT"?"value":"innerHTML";else return;if(G.lang=="auto")G.lang=R?navigator.browserLanguage.toLowerCase():navigator.language.toLowerCase();if(!G.eCont)for(var C in G)$dp[C]=G[C];if(!$dp.dd||G.eCont||($dp.dd&&(G.getRealLang().name!=$dp.dd.lang||G.skin!=$dp.dd.skin))){if(G.eCont)E(G.eCont,G);else{$dp.dd=U[M].createElement("DIV");$dp.dd.style.cssText="position:absolute";U[M].body.appendChild($dp.dd);E($dp.dd,G);if(_)$dp.dd.style.left=$dp.dd.style.top="-970px";else{$dp.show();B($dp)}}}else if($dp.cal){$dp.show();$dp.cal.init();if(!$dp.eCont)B($dp)}function E(I,H){var G=X[M].domain,E=false;I.innerHTML="<iframe hideFocus=true width=9 height=7 frameborder=0 border=0 scrolling=no src=\"about:blank\"></iframe>";var _=$.$langList,C=$.$skinList,F;try{F=I.lastChild.contentWindow[M]}catch(D){E=true;I.lastChild.src="javascript:void((function(){document.open();document.domain='"+G+"';})())";F=I.lastChild.contentWindow[M]}var K=H.getRealLang();I.lang=K.name;I.skin=H.skin;var J=["<head><script>","","var $d, $dp, $cfg=document.cfg, $pdp = parent.$dp, $dt, $tdt, $sdt, $lastInput, $IE=$pdp.ie, $FF = $pdp.ff,$OPERA=$pdp.opera, $ny, $cMark = false;","if($cfg.eCont){$dp = {};for(var p in $pdp)$dp[p]=$pdp[p];}else{$dp=$pdp;};for(var p in $cfg){$dp[p]=$cfg[p];}","document.oncontextmenu=function(){try{$c._fillQS(!$dp.has.d,1);showB($d.qsDivSel);}catch(e){};return false;};","</script><script src=",A,"lang/",K.name,".js charset=",K.charset,"></script>"];if(E)J[1]="document.domain=\""+G+"\";";for(var L=0;L<C.length;L++)if(C[L].name==H.skin)J.push("<link rel=\"stylesheet\" type=\"text/css\" href=\""+A+"skin/"+C[L].name+"/datepicker.css\" charset=\""+C[L].charset+"\"/>");J.push("<script type=\"text/javascript\" src=\""+A+"calendar.js?\"+Math.random()+\"\"></script>");J.push("</head><body leftmargin=\"0\" topmargin=\"0\" tabindex=0></body></html>");J.push("<script>var t;t=t||setInterval(function(){if(document.ready){new My97DP();$cfg.onload();$c.autoSize();$cfg.setPos($dp);clearInterval(t);}},20);</script>");H.setPos=B;H.onload=Y;F.write("<html>");F.cfg=H;F.write(J.join(""));F.close()}function B(J){var H=J.position.left,C=J.position.top,D=J.el;if(D==S)return;if(D!=J.srcEl&&(O(D)=="none"||D.type=="hidden"))D=J.srcEl;var I=V(D),$=F(X),E=L(U),B=Z(U),G=$dp.dd.offsetHeight,A=$dp.dd.offsetWidth;if(isNaN(C))C=0;if(($.topM+I.bottom+G>E.height)&&($.topM+I.top-G>0))C+=B.top+$.topM+I.top-G-2;else{C+=B.top+$.topM+I.bottom;var _=C-B.top+G-E.height;if(_>0)C-=_}if(isNaN(H))H=0;H+=B.left+Math.min($.leftM+I.left,E.width-A-5)-(R?2:0);J.dd.style.top=C+"px";J.dd.style.left=H+"px"}}})();
(function ($) {
	$.fn.datebox = function (options, params) {
		if (typeof options == "string") {
			return $.fn.datebox.methods[options](this, params);
		}
		options = options || {};
		if (!WdatePicker) {
			alert("未引入My97js包！");
			return;
		}
		return this.each(function () {
			var data = $.data(this, "datebox");
			var newOptions;
		
			if (data) {
				newOptions = $.extend(data.options, options);
				data.opts = newOptions;
			} else {
				newOptions = $.extend({}, $.fn.datebox.defaults, $.fn.datebox.parseOptions(this), options);
				$.data(this, "datebox", {
					options : newOptions
				});
			}
			
			if(newOptions.disabled){
				$(this).addClass('disabled').attr('disabled',true);
			}
			
			if(newOptions.maxDate){
				newOptions.maxDate="#F{$dp.$D(\\'"+newOptions.maxDate+"\\')}";
			}
			
			if(newOptions.minDate){
				newOptions.minDate="#F{$dp.$D(\\'"+newOptions.minDate+"\\')}";
			}
			
			$(this).addClass('Wdate').click(function () {
				WdatePicker(newOptions);
			});
			if(options.width){
				$(this).width(options.width);
			}
		});
	};
	$.fn.datebox.methods = {
		setValue : function (target, params) {
			target.val(params);
		},
		getValue : function (target) {
			return target.val();
		},
		clearValue : function (target) {
			target.val('');
		},
		disable:function(target){
			target.addClass('readonly').attr('disabled',true);
		},
		enable:function(target){
			target.removeClass('readonly').attr('disabled',false);
		}
	};
	$.fn.datebox.parseOptions = function (target) {
		return $.extend({}, $.parser.parseOptions(target, ["el", "vel", "weekMethod", "lang", "skin", "dateFmt", "realDateFmt", "realTimeFmt", "realFullFmt", "minDate", "maxDate", "startDate", {
						doubleCalendar : "boolean",
						enableKeyboard : "boolean",
						enableInputMask : "boolean",
						autoUpdateOnChanged : "boolean",
						firstDayOfWeek : "number",
						isShowWeek : "boolean",
						highLineWeekDay : "boolean",
						isShowClear : "boolean",
						isShowToday : "boolean",
						isShowOthers : "boolean",
						readOnly : "boolean",
						errDealMode : "boolean",
						autoPickDate : "boolean",
						qsEnabled : "boolean",
						autoShowQS : "boolean",
						opposite : "boolean"
					}
				]));
	};
	$.fn.datebox.defaults = {
		dateFmt : 'yyyy-MM-dd'
	};

//$.parser.plugins.push('datebox');
})(jQuery);
/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
var _3=$("<span class=\"spinner\">"+"<span class=\"spinner-arrow\">"+"<span class=\"spinner-arrow-up\"></span>"+"<span class=\"spinner-arrow-down\"></span>"+"</span>"+"</span>").insertAfter(_2);
$(_2).addClass("spinner-text spinner-f").prependTo(_3);
return _3;
};
function _4(_5,_6){
var _7=$.data(_5,"spinner").options;
var _8=$.data(_5,"spinner").spinner;
if(_6){
_7.width=_6;
}
var _9=$("<div style=\"display:none\"></div>").insertBefore(_8);
_8.appendTo("body");
if(isNaN(_7.width)){
_7.width=$(_5).outerWidth();
}
var _a=_8.find(".spinner-arrow");
_8._outerWidth(_7.width)._outerHeight(_7.height);
$(_5)._outerWidth(_8.width()-_a.outerWidth());
$(_5).css({height:_8.height()+"px",lineHeight:_8.height()+"px"});
_a._outerHeight(_8.height());
_a.find("span")._outerHeight(_a.height()/2);
_8.insertAfter(_9);
_9.remove();
};
function _b(_c){
var _d=$.data(_c,"spinner").options;
var _e=$.data(_c,"spinner").spinner;
_e.find(".spinner-arrow-up,.spinner-arrow-down").unbind(".spinner");
if(!_d.disabled){
_e.find(".spinner-arrow-up").bind("mouseenter.spinner",function(){
$(this).addClass("spinner-arrow-hover");
}).bind("mouseleave.spinner",function(){
$(this).removeClass("spinner-arrow-hover");
}).bind("click.spinner",function(){
_d.spin.call(_c,false);
_d.onSpinUp.call(_c);
$(_c).validatebox("validate");
});
_e.find(".spinner-arrow-down").bind("mouseenter.spinner",function(){
$(this).addClass("spinner-arrow-hover");
}).bind("mouseleave.spinner",function(){
$(this).removeClass("spinner-arrow-hover");
}).bind("click.spinner",function(){
_d.spin.call(_c,true);
_d.onSpinDown.call(_c);
$(_c).validatebox("validate");
});
}
};
function _f(_10,_11){
var _12=$.data(_10,"spinner").options;
if(_11){
_12.disabled=true;
$(_10).attr("disabled",true);
}else{
_12.disabled=false;
$(_10).removeAttr("disabled");
}
};
$.fn.spinner=function(_13,_14){
if(typeof _13=="string"){
var _15=$.fn.spinner.methods[_13];
if(_15){
return _15(this,_14);
}else{
return this.validatebox(_13,_14);
}
}
_13=_13||{};
return this.each(function(){
var _16=$.data(this,"spinner");
if(_16){
$.extend(_16.options,_13);
}else{
_16=$.data(this,"spinner",{options:$.extend({},$.fn.spinner.defaults,$.fn.spinner.parseOptions(this),_13),spinner:_1(this)});
$(this).removeAttr("disabled");
}
_16.options.originalValue=_16.options.value;
$(this).val(_16.options.value);
$(this).attr("readonly",!_16.options.editable);
_f(this,_16.options.disabled);
_4(this);
$(this).validatebox(_16.options);
_b(this);
});
};
$.fn.spinner.methods={options:function(jq){
var _17=$.data(jq[0],"spinner").options;
return $.extend(_17,{value:jq.val()});
},destroy:function(jq){
return jq.each(function(){
var _18=$.data(this,"spinner").spinner;
$(this).validatebox("destroy");
_18.remove();
});
},resize:function(jq,_19){
return jq.each(function(){
_4(this,_19);
});
},enable:function(jq){
return jq.each(function(){
_f(this,false);
_b(this);
});
},disable:function(jq){
return jq.each(function(){
_f(this,true);
_b(this);
});
},getValue:function(jq){
return jq.val();
},setValue:function(jq,_1a){
return jq.each(function(){
var _1b=$.data(this,"spinner").options;
_1b.value=_1a;
$(this).val(_1a);
});
},clear:function(jq){
return jq.each(function(){
var _1c=$.data(this,"spinner").options;
_1c.value="";
$(this).val("");
});
},reset:function(jq){
return jq.each(function(){
var _1d=$(this).spinner("options");
$(this).spinner("setValue",_1d.originalValue);
});
}};
$.fn.spinner.parseOptions=function(_1e){
var t=$(_1e);
return $.extend({},$.fn.validatebox.parseOptions(_1e),$.parser.parseOptions(_1e,["width","height","min","max",{increment:"number",editable:"boolean"}]),{value:(t.val()||undefined),disabled:(t.attr("disabled")?true:undefined)});
};
$.fn.spinner.defaults=$.extend({},$.fn.validatebox.defaults,{width:"auto",height:22,deltaX:19,value:"",min:null,max:null,increment:1,editable:true,disabled:false,spin:function(_1f){
},onSpinUp:function(){
},onSpinDown:function(){
}});
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(e){
var _2=$.data(e.data.target,"draggable");
var _3=_2.options;
var _4=_2.proxy;
var _5=e.data;
var _6=_5.startLeft+e.pageX-_5.startX;
var _7=_5.startTop+e.pageY-_5.startY;
if(_4){
if(_4.parent()[0]==document.body){
if(_3.deltaX!=null&&_3.deltaX!=undefined){
_6=e.pageX+_3.deltaX;
}else{
_6=e.pageX-e.data.offsetWidth;
}
if(_3.deltaY!=null&&_3.deltaY!=undefined){
_7=e.pageY+_3.deltaY;
}else{
_7=e.pageY-e.data.offsetHeight;
}
}else{
if(_3.deltaX!=null&&_3.deltaX!=undefined){
_6+=e.data.offsetWidth+_3.deltaX;
}
if(_3.deltaY!=null&&_3.deltaY!=undefined){
_7+=e.data.offsetHeight+_3.deltaY;
}
}
}
if(e.data.parent!=document.body){
_6+=$(e.data.parent).scrollLeft();
_7+=$(e.data.parent).scrollTop();
}
if(_3.axis=="h"){
_5.left=_6;
}else{
if(_3.axis=="v"){
_5.top=_7;
}else{
_5.left=_6;
_5.top=_7;
}
}
};
function _8(e){
var _9=$.data(e.data.target,"draggable");
var _a=_9.options;
var _b=_9.proxy;
if(!_b){
_b=$(e.data.target);
}
_b.css({left:e.data.left,top:e.data.top});
$("body").css("cursor",_a.cursor);
};
function _c(e){
$.fn.draggable.isDragging=true;
var _d=$.data(e.data.target,"draggable");
var _e=_d.options;
var _f=$(".droppable").filter(function(){
return e.data.target!=this;
}).filter(function(){
var _10=$.data(this,"droppable").options.accept;
if(_10){
return $(_10).filter(function(){
return this==e.data.target;
}).length>0;
}else{
return true;
}
});
_d.droppables=_f;
var _11=_d.proxy;
if(!_11){
if(_e.proxy){
if(_e.proxy=="clone"){
_11=$(e.data.target).clone().insertAfter(e.data.target);
}else{
_11=_e.proxy.call(e.data.target,e.data.target);
}
_d.proxy=_11;
}else{
_11=$(e.data.target);
}
}
_11.css("position","absolute");
_1(e);
_8(e);
_e.onStartDrag.call(e.data.target,e);
return false;
};
function _12(e){
var _13=$.data(e.data.target,"draggable");
_1(e);
if(_13.options.onDrag.call(e.data.target,e)!=false){
_8(e);
}
var _14=e.data.target;
_13.droppables.each(function(){
var _15=$(this);
if(_15.droppable("options").disabled){
return;
}
var p2=_15.offset();
if(e.pageX>p2.left&&e.pageX<p2.left+_15.outerWidth()&&e.pageY>p2.top&&e.pageY<p2.top+_15.outerHeight()){
if(!this.entered){
$(this).trigger("_dragenter",[_14]);
this.entered=true;
}
$(this).trigger("_dragover",[_14]);
}else{
if(this.entered){
$(this).trigger("_dragleave",[_14]);
this.entered=false;
}
}
});
return false;
};
function _16(e){
$.fn.draggable.isDragging=false;
_12(e);
var _17=$.data(e.data.target,"draggable");
var _18=_17.proxy;
var _19=_17.options;
if(_19.revert){
if(_1a()==true){
$(e.data.target).css({position:e.data.startPosition,left:e.data.startLeft,top:e.data.startTop});
}else{
if(_18){
var _1b,top;
if(_18.parent()[0]==document.body){
_1b=e.data.startX-e.data.offsetWidth;
top=e.data.startY-e.data.offsetHeight;
}else{
_1b=e.data.startLeft;
top=e.data.startTop;
}
_18.animate({left:_1b,top:top},function(){
_1c();
});
}else{
$(e.data.target).animate({left:e.data.startLeft,top:e.data.startTop},function(){
$(e.data.target).css("position",e.data.startPosition);
});
}
}
}else{
$(e.data.target).css({position:"absolute",left:e.data.left,top:e.data.top});
_1a();
}
_19.onStopDrag.call(e.data.target,e);
$(document).unbind(".draggable");
setTimeout(function(){
$("body").css("cursor","");
},100);
function _1c(){
if(_18){
_18.remove();
}
_17.proxy=null;
};
function _1a(){
var _1d=false;
_17.droppables.each(function(){
var _1e=$(this);
if(_1e.droppable("options").disabled){
return;
}
var p2=_1e.offset();
if(e.pageX>p2.left&&e.pageX<p2.left+_1e.outerWidth()&&e.pageY>p2.top&&e.pageY<p2.top+_1e.outerHeight()){
if(_19.revert){
$(e.data.target).css({position:e.data.startPosition,left:e.data.startLeft,top:e.data.startTop});
}
$(this).trigger("_drop",[e.data.target]);
_1c();
_1d=true;
this.entered=false;
return false;
}
});
if(!_1d&&!_19.revert){
_1c();
}
return _1d;
};
return false;
};
$.fn.draggable=function(_1f,_20){
if(typeof _1f=="string"){
return $.fn.draggable.methods[_1f](this,_20);
}
return this.each(function(){
var _21;
var _22=$.data(this,"draggable");
if(_22){
_22.handle.unbind(".draggable");
_21=$.extend(_22.options,_1f);
}else{
_21=$.extend({},$.fn.draggable.defaults,$.fn.draggable.parseOptions(this),_1f||{});
}
var _23=_21.handle?(typeof _21.handle=="string"?$(_21.handle,this):_21.handle):$(this);
$.data(this,"draggable",{options:_21,handle:_23});
if(_21.disabled){
$(this).css("cursor","");
return;
}
_23.unbind(".draggable").bind("mousemove.draggable",{target:this},function(e){
if($.fn.draggable.isDragging){
return;
}
var _24=$.data(e.data.target,"draggable").options;
if(_25(e)){
$(this).css("cursor",_24.cursor);
}else{
$(this).css("cursor","");
}
}).bind("mouseleave.draggable",{target:this},function(e){
$(this).css("cursor","");
}).bind("mousedown.draggable",{target:this},function(e){
if(_25(e)==false){
return;
}
$(this).css("cursor","");
var _26=$(e.data.target).position();
var _27=$(e.data.target).offset();
var _28={startPosition:$(e.data.target).css("position"),startLeft:_26.left,startTop:_26.top,left:_26.left,top:_26.top,startX:e.pageX,startY:e.pageY,offsetWidth:(e.pageX-_27.left),offsetHeight:(e.pageY-_27.top),target:e.data.target,parent:$(e.data.target).parent()[0]};
$.extend(e.data,_28);
var _29=$.data(e.data.target,"draggable").options;
if(_29.onBeforeDrag.call(e.data.target,e)==false){
return;
}
$(document).bind("mousedown.draggable",e.data,_c);
$(document).bind("mousemove.draggable",e.data,_12);
$(document).bind("mouseup.draggable",e.data,_16);
});
function _25(e){
var _2a=$.data(e.data.target,"draggable");
var _2b=_2a.handle;
var _2c=$(_2b).offset();
var _2d=$(_2b).outerWidth();
var _2e=$(_2b).outerHeight();
var t=e.pageY-_2c.top;
var r=_2c.left+_2d-e.pageX;
var b=_2c.top+_2e-e.pageY;
var l=e.pageX-_2c.left;
return Math.min(t,r,b,l)>_2a.options.edge;
};
});
};
$.fn.draggable.methods={options:function(jq){
return $.data(jq[0],"draggable").options;
},proxy:function(jq){
return $.data(jq[0],"draggable").proxy;
},enable:function(jq){
return jq.each(function(){
$(this).draggable({disabled:false});
});
},disable:function(jq){
return jq.each(function(){
$(this).draggable({disabled:true});
});
}};
$.fn.draggable.parseOptions=function(_2f){
var t=$(_2f);
return $.extend({},$.parser.parseOptions(_2f,["cursor","handle","axis",{"revert":"boolean","deltaX":"number","deltaY":"number","edge":"number"}]),{disabled:(t.attr("disabled")?true:undefined)});
};
$.fn.draggable.defaults={proxy:null,revert:false,cursor:"move",deltaX:null,deltaY:null,handle:null,disabled:false,edge:0,axis:null,onBeforeDrag:function(e){
},onStartDrag:function(e){
},onDrag:function(e){
},onStopDrag:function(e){
}};
$.fn.draggable.isDragging=false;
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
$(_2).addClass("droppable");
$(_2).bind("_dragenter",function(e,_3){
$.data(_2,"droppable").options.onDragEnter.apply(_2,[e,_3]);
});
$(_2).bind("_dragleave",function(e,_4){
$.data(_2,"droppable").options.onDragLeave.apply(_2,[e,_4]);
});
$(_2).bind("_dragover",function(e,_5){
$.data(_2,"droppable").options.onDragOver.apply(_2,[e,_5]);
});
$(_2).bind("_drop",function(e,_6){
$.data(_2,"droppable").options.onDrop.apply(_2,[e,_6]);
});
};
$.fn.droppable=function(_7,_8){
if(typeof _7=="string"){
return $.fn.droppable.methods[_7](this,_8);
}
_7=_7||{};
return this.each(function(){
var _9=$.data(this,"droppable");
if(_9){
$.extend(_9.options,_7);
}else{
_1(this);
$.data(this,"droppable",{options:$.extend({},$.fn.droppable.defaults,$.fn.droppable.parseOptions(this),_7)});
}
});
};
$.fn.droppable.methods={options:function(jq){
return $.data(jq[0],"droppable").options;
},enable:function(jq){
return jq.each(function(){
$(this).droppable({disabled:false});
});
},disable:function(jq){
return jq.each(function(){
$(this).droppable({disabled:true});
});
}};
$.fn.droppable.parseOptions=function(_a){
var t=$(_a);
return $.extend({},$.parser.parseOptions(_a,["accept"]),{disabled:(t.attr("disabled")?true:undefined)});
};
$.fn.droppable.defaults={accept:null,disabled:false,onDragEnter:function(e,_b){
},onDragOver:function(e,_c){
},onDragLeave:function(e,_d){
},onDrop:function(e,_e){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"splitbutton").options;
$(_2).menubutton(_3);
};
$.fn.splitbutton=function(_4,_5){
if(typeof _4=="string"){
var _6=$.fn.splitbutton.methods[_4];
if(_6){
return _6(this,_5);
}else{
return this.menubutton(_4,_5);
}
}
_4=_4||{};
return this.each(function(){
var _7=$.data(this,"splitbutton");
if(_7){
$.extend(_7.options,_4);
}else{
$.data(this,"splitbutton",{options:$.extend({},$.fn.splitbutton.defaults,$.fn.splitbutton.parseOptions(this),_4)});
$(this).removeAttr("disabled");
}
_1(this);
});
};
$.fn.splitbutton.methods={options:function(jq){
var _8=jq.menubutton("options");
var _9=$.data(jq[0],"splitbutton").options;
$.extend(_9,{disabled:_8.disabled,toggle:_8.toggle,selected:_8.selected});
return _9;
}};
$.fn.splitbutton.parseOptions=function(_a){
var t=$(_a);
return $.extend({},$.fn.linkbutton.parseOptions(_a),$.parser.parseOptions(_a,["menu",{plain:"boolean",duration:"number"}]));
};
$.fn.splitbutton.defaults=$.extend({},$.fn.linkbutton.defaults,{plain:true,menu:null,duration:100,cls:{btn1:"s-btn-active",btn2:"s-btn-plain-active",arrow:"s-btn-downarrow",trigger:"s-btn-downarrow"}});
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
$(_2).addClass("progressbar");
$(_2).html("<div class=\"progressbar-text\"></div><div class=\"progressbar-value\"><div class=\"progressbar-text\"></div></div>");
return $(_2);
};
function _3(_4,_5){
var _6=$.data(_4,"progressbar").options;
var _7=$.data(_4,"progressbar").bar;
if(_5){
_6.width=_5;
}
_7._outerWidth(_6.width)._outerHeight(_6.height);
_7.find("div.progressbar-text").width(_7.width());
_7.find("div.progressbar-text,div.progressbar-value").css({height:_7.height()+"px",lineHeight:_7.height()+"px"});
};
$.fn.progressbar=function(_8,_9){
if(typeof _8=="string"){
var _a=$.fn.progressbar.methods[_8];
if(_a){
return _a(this,_9);
}
}
_8=_8||{};
return this.each(function(){
var _b=$.data(this,"progressbar");
if(_b){
$.extend(_b.options,_8);
}else{
_b=$.data(this,"progressbar",{options:$.extend({},$.fn.progressbar.defaults,$.fn.progressbar.parseOptions(this),_8),bar:_1(this)});
}
$(this).progressbar("setValue",_b.options.value);
_3(this);
});
};
$.fn.progressbar.methods={options:function(jq){
return $.data(jq[0],"progressbar").options;
},resize:function(jq,_c){
return jq.each(function(){
_3(this,_c);
});
},getValue:function(jq){
return $.data(jq[0],"progressbar").options.value;
},setValue:function(jq,_d){
if(_d<0){
_d=0;
}
if(_d>100){
_d=100;
}
return jq.each(function(){
var _e=$.data(this,"progressbar").options;
var _f=_e.text.replace(/{value}/,_d);
var _10=_e.value;
_e.value=_d;
$(this).find("div.progressbar-value").width(_d+"%");
$(this).find("div.progressbar-text").html(_f);
if(_10!=_d){
_e.onChange.call(this,_d,_10);
}
});
}};
$.fn.progressbar.parseOptions=function(_11){
return $.extend({},$.parser.parseOptions(_11,["width","height","text",{value:"number"}]));
};
$.fn.progressbar.defaults={width:"auto",height:22,value:0,text:"{value}%",onChange:function(_12,_13){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
var _3=$(_2);
_3.addClass("tree");
return _3;
};
function _4(_5){
var _6=$.data(_5,"tree").options;
$(_5).unbind().bind("mouseover",function(e){
var tt=$(e.target);
var _7=tt.closest("div.tree-node");
if(!_7.length){
return;
}
_7.addClass("tree-node-hover");
if(tt.hasClass("tree-hit")){
if(tt.hasClass("tree-expanded")){
tt.addClass("tree-expanded-hover");
}else{
tt.addClass("tree-collapsed-hover");
}
}
e.stopPropagation();
}).bind("mouseout",function(e){
var tt=$(e.target);
var _8=tt.closest("div.tree-node");
if(!_8.length){
return;
}
_8.removeClass("tree-node-hover");
if(tt.hasClass("tree-hit")){
if(tt.hasClass("tree-expanded")){
tt.removeClass("tree-expanded-hover");
}else{
tt.removeClass("tree-collapsed-hover");
}
}
e.stopPropagation();
}).bind("click",function(e){
var tt=$(e.target);
var _9=tt.closest("div.tree-node");
if(!_9.length){
return;
}
if(tt.hasClass("tree-hit")){
_7e(_5,_9[0]);
return false;
}else{
if(tt.hasClass("tree-checkbox")){
_32(_5,_9[0],!tt.hasClass("tree-checkbox1"));
return false;
}else{
_d6(_5,_9[0]);
_6.onClick.call(_5,_c(_5,_9[0]));
}
}
e.stopPropagation();
}).bind("dblclick",function(e){
var _a=$(e.target).closest("div.tree-node");
if(!_a.length){
return;
}
_d6(_5,_a[0]);
_6.onDblClick.call(_5,_c(_5,_a[0]));
e.stopPropagation();
}).bind("contextmenu",function(e){
var _b=$(e.target).closest("div.tree-node");
if(!_b.length){
return;
}
_6.onContextMenu.call(_5,e,_c(_5,_b[0]));
e.stopPropagation();
});
};
function _d(_e){
var _f=$.data(_e,"tree").options;
_f.dnd=false;
var _10=$(_e).find("div.tree-node");
_10.draggable("disable");
_10.css("cursor","pointer");
};
function _11(_12){
var _13=$.data(_12,"tree");
var _14=_13.options;
var _15=_13.tree;
_13.disabledNodes=[];
_14.dnd=true;
_15.find("div.tree-node").draggable({disabled:false,revert:true,cursor:"pointer",proxy:function(_16){
var p=$("<div class=\"tree-node-proxy\"></div>").appendTo("body");
p.html("<span class=\"tree-dnd-icon tree-dnd-no\">&nbsp;</span>"+$(_16).find(".tree-title").html());
p.hide();
return p;
},deltaX:15,deltaY:15,onBeforeDrag:function(e){
if(_14.onBeforeDrag.call(_12,_c(_12,this))==false){
return false;
}
if($(e.target).hasClass("tree-hit")||$(e.target).hasClass("tree-checkbox")){
return false;
}
if(e.which!=1){
return false;
}
$(this).next("ul").find("div.tree-node").droppable({accept:"no-accept"});
var _17=$(this).find("span.tree-indent");
if(_17.length){
e.data.offsetWidth-=_17.length*_17.width();
}
},onStartDrag:function(){
$(this).draggable("proxy").css({left:-10000,top:-10000});
_14.onStartDrag.call(_12,_c(_12,this));
var _18=_c(_12,this);
if(_18.id==undefined){
_18.id="easyui_tree_node_id_temp";
_54(_12,_18);
}
_13.draggingNodeId=_18.id;
},onDrag:function(e){
var x1=e.pageX,y1=e.pageY,x2=e.data.startX,y2=e.data.startY;
var d=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
if(d>3){
$(this).draggable("proxy").show();
}
this.pageY=e.pageY;
},onStopDrag:function(){
$(this).next("ul").find("div.tree-node").droppable({accept:"div.tree-node"});
for(var i=0;i<_13.disabledNodes.length;i++){
$(_13.disabledNodes[i]).droppable("enable");
}
_13.disabledNodes=[];
var _19=_c9(_12,_13.draggingNodeId);
if(_19&&_19.id=="easyui_tree_node_id_temp"){
_19.id="";
_54(_12,_19);
}
_14.onStopDrag.call(_12,_19);
}}).droppable({accept:"div.tree-node",onDragEnter:function(e,_1a){
if(_14.onDragEnter.call(_12,this,_c(_12,_1a))==false){
_1b(_1a,false);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
$(this).droppable("disable");
_13.disabledNodes.push(this);
}
},onDragOver:function(e,_1c){
if($(this).droppable("options").disabled){
return;
}
var _1d=_1c.pageY;
var top=$(this).offset().top;
var _1e=top+$(this).outerHeight();
_1b(_1c,true);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
if(_1d>top+(_1e-top)/2){
if(_1e-_1d<5){
$(this).addClass("tree-node-bottom");
}else{
$(this).addClass("tree-node-append");
}
}else{
if(_1d-top<5){
$(this).addClass("tree-node-top");
}else{
$(this).addClass("tree-node-append");
}
}
if(_14.onDragOver.call(_12,this,_c(_12,_1c))==false){
_1b(_1c,false);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
$(this).droppable("disable");
_13.disabledNodes.push(this);
}
},onDragLeave:function(e,_1f){
_1b(_1f,false);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
_14.onDragLeave.call(_12,this,_c(_12,_1f));
},onDrop:function(e,_20){
var _21=this;
var _22,_23;
if($(this).hasClass("tree-node-append")){
_22=_24;
_23="append";
}else{
_22=_25;
_23=$(this).hasClass("tree-node-top")?"top":"bottom";
}
if(_14.onBeforeDrop.call(_12,_21,_c2(_12,_20),_23)==false){
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
return;
}
_22(_20,_21,_23);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
}});
function _1b(_26,_27){
var _28=$(_26).draggable("proxy").find("span.tree-dnd-icon");
_28.removeClass("tree-dnd-yes tree-dnd-no").addClass(_27?"tree-dnd-yes":"tree-dnd-no");
};
function _24(_29,_2a){
if(_c(_12,_2a).state=="closed"){
_72(_12,_2a,function(){
_2b();
});
}else{
_2b();
}
function _2b(){
var _2c=$(_12).tree("pop",_29);
$(_12).tree("append",{parent:_2a,data:[_2c]});
_14.onDrop.call(_12,_2a,_2c,"append");
};
};
function _25(_2d,_2e,_2f){
var _30={};
if(_2f=="top"){
_30.before=_2e;
}else{
_30.after=_2e;
}
var _31=$(_12).tree("pop",_2d);
_30.data=_31;
$(_12).tree("insert",_30);
_14.onDrop.call(_12,_2e,_31,_2f);
};
};
function _32(_33,_34,_35){
var _36=$.data(_33,"tree").options;
if(!_36.checkbox){
return;
}
var _37=_c(_33,_34);
if(_36.onBeforeCheck.call(_33,_37,_35)==false){
return;
}
var _38=$(_34);
var ck=_38.find(".tree-checkbox");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_35){
ck.addClass("tree-checkbox1");
}else{
ck.addClass("tree-checkbox0");
}
if(_36.cascadeCheck){
_39(_38);
_3a(_38);
}
_36.onCheck.call(_33,_37,_35);
function _3a(_3b){
var _3c=_3b.next().find(".tree-checkbox");
_3c.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_3b.find(".tree-checkbox").hasClass("tree-checkbox1")){
_3c.addClass("tree-checkbox1");
}else{
_3c.addClass("tree-checkbox0");
}
};
function _39(_3d){
var _3e=_89(_33,_3d[0]);
if(_3e){
var ck=$(_3e.target).find(".tree-checkbox");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_3f(_3d)){
ck.addClass("tree-checkbox1");
}else{
if(_40(_3d)){
ck.addClass("tree-checkbox0");
}else{
ck.addClass("tree-checkbox2");
}
}
_39($(_3e.target));
}
function _3f(n){
var ck=n.find(".tree-checkbox");
if(ck.hasClass("tree-checkbox0")||ck.hasClass("tree-checkbox2")){
return false;
}
var b=true;
n.parent().siblings().each(function(){
if(!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox1")){
b=false;
}
});
return b;
};
function _40(n){
var ck=n.find(".tree-checkbox");
if(ck.hasClass("tree-checkbox1")||ck.hasClass("tree-checkbox2")){
return false;
}
var b=true;
n.parent().siblings().each(function(){
if(!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox0")){
b=false;
}
});
return b;
};
};
};
function _41(_42,_43){
var _44=$.data(_42,"tree").options;
if(!_44.checkbox){
return;
}
var _45=$(_43);
if(_46(_42,_43)){
var ck=_45.find(".tree-checkbox");
if(ck.length){
if(ck.hasClass("tree-checkbox1")){
_32(_42,_43,true);
}else{
_32(_42,_43,false);
}
}else{
if(_44.onlyLeafCheck){
$("<span class=\"tree-checkbox tree-checkbox0\"></span>").insertBefore(_45.find(".tree-title"));
}
}
}else{
var ck=_45.find(".tree-checkbox");
if(_44.onlyLeafCheck){
ck.remove();
}else{
if(ck.hasClass("tree-checkbox1")){
_32(_42,_43,true);
}else{
if(ck.hasClass("tree-checkbox2")){
var _47=true;
var _48=true;
var _49=_4a(_42,_43);
for(var i=0;i<_49.length;i++){
if(_49[i].checked){
_48=false;
}else{
_47=false;
}
}
if(_47){
_32(_42,_43,true);
}
if(_48){
_32(_42,_43,false);
}
}
}
}
}
};
function _4b(_4c,ul,_4d,_4e){
var _4f=$.data(_4c,"tree");
var _50=_4f.options;
var _51=$(ul).prevAll("div.tree-node:first");
_4d=_50.loadFilter.call(_4c,_4d,_51[0]);
var _52=_53(_4c,"domId",_51.attr("id"));
if(!_4e){
_52?_52.children=_4d:_4f.data=_4d;
$(ul).empty();
}else{
if(_52){
_52.children?_52.children=_52.children.concat(_4d):_52.children=_4d;
}else{
_4f.data=_4f.data.concat(_4d);
}
}
_50.view.render.call(_50.view,_4c,ul,_4d);
if(_50.dnd){
_11(_4c);
}
if(_52){
_54(_4c,_52);
}
var _55=[];
var _56=[];
for(var i=0;i<_4d.length;i++){
var _57=_4d[i];
if(!_57.checked){
_55.push(_57);
}
}
_58(_4d,function(_59){
if(_59.checked){
_56.push(_59);
}
});
if(_55.length){
_32(_4c,$("#"+_55[0].domId)[0],false);
}
for(var i=0;i<_56.length;i++){
_32(_4c,$("#"+_56[i].domId)[0],true);
}
setTimeout(function(){
_5a(_4c,_4c);
},0);
_50.onLoadSuccess.call(_4c,_52,_4d);
};
function _5a(_5b,ul,_5c){
var _5d=$.data(_5b,"tree").options;
if(_5d.lines){
$(_5b).addClass("tree-lines");
}else{
$(_5b).removeClass("tree-lines");
return;
}
if(!_5c){
_5c=true;
$(_5b).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
$(_5b).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
var _5e=$(_5b).tree("getRoots");
if(_5e.length>1){
$(_5e[0].target).addClass("tree-root-first");
}else{
if(_5e.length==1){
$(_5e[0].target).addClass("tree-root-one");
}
}
}
$(ul).children("li").each(function(){
var _5f=$(this).children("div.tree-node");
var ul=_5f.next("ul");
if(ul.length){
if($(this).next().length){
_60(_5f);
}
_5a(_5b,ul,_5c);
}else{
_61(_5f);
}
});
var _62=$(ul).children("li:last").children("div.tree-node").addClass("tree-node-last");
_62.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");
function _61(_63,_64){
var _65=_63.find("span.tree-icon");
_65.prev("span.tree-indent").addClass("tree-join");
};
function _60(_66){
var _67=_66.find("span.tree-indent, span.tree-hit").length;
_66.next().find("div.tree-node").each(function(){
$(this).children("span:eq("+(_67-1)+")").addClass("tree-line");
});
};
};
function _68(_69,ul,_6a,_6b){
var _6c=$.data(_69,"tree").options;
_6a=_6a||{};
var _6d=null;
if(_69!=ul){
var _6e=$(ul).prev();
_6d=_c(_69,_6e[0]);
}
if(_6c.onBeforeLoad.call(_69,_6d,_6a)==false){
return;
}
var _6f=$(ul).prev().children("span.tree-folder");
_6f.addClass("tree-loading");
var _70=_6c.loader.call(_69,_6a,function(_71){
_6f.removeClass("tree-loading");
_4b(_69,ul,_71);
if(_6b){
_6b();
}
},function(){
_6f.removeClass("tree-loading");
_6c.onLoadError.apply(_69,arguments);
if(_6b){
_6b();
}
});
if(_70==false){
_6f.removeClass("tree-loading");
}
};
function _72(_73,_74,_75){
var _76=$.data(_73,"tree").options;
var hit=$(_74).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
var _77=_c(_73,_74);
if(_76.onBeforeExpand.call(_73,_77)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var ul=$(_74).next();
if(ul.length){
if(_76.animate){
ul.slideDown("normal",function(){
_77.state="open";
_76.onExpand.call(_73,_77);
if(_75){
_75();
}
});
}else{
ul.css("display","block");
_77.state="open";
_76.onExpand.call(_73,_77);
if(_75){
_75();
}
}
}else{
var _78=$("<ul style=\"display:none\"></ul>").insertAfter(_74);
_68(_73,_78[0],{id:_77.id},function(){
if(_78.is(":empty")){
_78.remove();
}
if(_76.animate){
_78.slideDown("normal",function(){
_77.state="open";
_76.onExpand.call(_73,_77);
if(_75){
_75();
}
});
}else{
_78.css("display","block");
_77.state="open";
_76.onExpand.call(_73,_77);
if(_75){
_75();
}
}
});
}
};
function _79(_7a,_7b){
var _7c=$.data(_7a,"tree").options;
var hit=$(_7b).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
var _7d=_c(_7a,_7b);
if(_7c.onBeforeCollapse.call(_7a,_7d)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
var ul=$(_7b).next();
if(_7c.animate){
ul.slideUp("normal",function(){
_7d.state="closed";
_7c.onCollapse.call(_7a,_7d);
});
}else{
ul.css("display","none");
_7d.state="closed";
_7c.onCollapse.call(_7a,_7d);
}
};
function _7e(_7f,_80){
var hit=$(_80).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
_79(_7f,_80);
}else{
_72(_7f,_80);
}
};
function _81(_82,_83){
var _84=_4a(_82,_83);
if(_83){
_84.unshift(_c(_82,_83));
}
for(var i=0;i<_84.length;i++){
_72(_82,_84[i].target);
}
};
function _85(_86,_87){
var _88=[];
var p=_89(_86,_87);
while(p){
_88.unshift(p);
p=_89(_86,p.target);
}
for(var i=0;i<_88.length;i++){
_72(_86,_88[i].target);
}
};
function _8a(_8b,_8c){
var c=$(_8b).parent();
while(c[0].tagName!="BODY"&&c.css("overflow-y")!="auto"){
c=c.parent();
}
var n=$(_8c);
var _8d=n.offset().top;
if(c[0].tagName!="BODY"){
var _8e=c.offset().top;
if(_8d<_8e){
c.scrollTop(c.scrollTop()+_8d-_8e);
}else{
if(_8d+n.outerHeight()>_8e+c.outerHeight()-18){
c.scrollTop(c.scrollTop()+_8d+n.outerHeight()-_8e-c.outerHeight()+18);
}
}
}else{
c.scrollTop(_8d);
}
};
function _8f(_90,_91){
var _92=_4a(_90,_91);
if(_91){
_92.unshift(_c(_90,_91));
}
for(var i=0;i<_92.length;i++){
_79(_90,_92[i].target);
}
};
function _93(_94,_95){
var _96=$(_95.parent);
var _97=_95.data;
if(!_97){
return;
}
_97=$.isArray(_97)?_97:[_97];
if(!_97.length){
return;
}
var ul;
if(_96.length==0){
ul=$(_94);
}else{
if(_46(_94,_96[0])){
var _98=_96.find("span.tree-icon");
_98.removeClass("tree-file").addClass("tree-folder tree-folder-open");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_98);
if(hit.prev().length){
hit.prev().remove();
}
}
ul=_96.next();
if(!ul.length){
ul=$("<ul></ul>").insertAfter(_96);
}
}
_4b(_94,ul[0],_97,true);
_41(_94,ul.prev());
};
function _99(_9a,_9b){
var ref=_9b.before||_9b.after;
var _9c=_89(_9a,ref);
var _9d=_9b.data;
if(!_9d){
return;
}
_9d=$.isArray(_9d)?_9d:[_9d];
if(!_9d.length){
return;
}
_93(_9a,{parent:(_9c?_9c.target:null),data:_9d});
var li=$();
for(var i=0;i<_9d.length;i++){
li=li.add($("#"+_9d[i].domId).parent());
}
if(_9b.before){
li.insertBefore($(ref).parent());
}else{
li.insertAfter($(ref).parent());
}
};
function _9e(_9f,_a0){
var _a1=del(_a0);
$(_a0).parent().remove();
if(_a1){
if(!_a1.children||!_a1.children.length){
var _a2=$(_a1.target);
_a2.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
_a2.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(_a2);
_a2.next().remove();
}
_54(_9f,_a1);
_41(_9f,_a1.target);
}
_5a(_9f,_9f);
function del(_a3){
var id=$(_a3).attr("id");
var _a4=_89(_9f,_a3);
var cc=_a4?_a4.children:$.data(_9f,"tree").data;
for(var i=0;i<cc.length;i++){
if(cc[i].domId==id){
cc.splice(i,1);
break;
}
}
return _a4;
};
};
function _54(_a5,_a6){
var _a7=$.data(_a5,"tree").options;
var _a8=$(_a6.target);
var _a9=_c(_a5,_a6.target);
var _aa=_a9.checked;
if(_a9.iconCls){
_a8.find(".tree-icon").removeClass(_a9.iconCls);
}
$.extend(_a9,_a6);
_a8.find(".tree-title").html(_a7.formatter.call(_a5,_a9));
if(_a9.iconCls){
_a8.find(".tree-icon").addClass(_a9.iconCls);
}
if(_aa!=_a9.checked){
_32(_a5,_a6.target,_a9.checked);
}
};
function _ab(_ac){
var _ad=_ae(_ac);
return _ad.length?_ad[0]:null;
};
function _ae(_af){
var _b0=$.data(_af,"tree").data;
for(var i=0;i<_b0.length;i++){
_b1(_b0[i]);
}
return _b0;
};
function _4a(_b2,_b3){
var _b4=[];
var n=_c(_b2,_b3);
var _b5=n?n.children:$.data(_b2,"tree").data;
_58(_b5,function(_b6){
_b4.push(_b1(_b6));
});
return _b4;
};
function _89(_b7,_b8){
var p=$(_b8).closest("ul").prevAll("div.tree-node:first");
return _c(_b7,p[0]);
};
function _b9(_ba,_bb){
_bb=_bb||"checked";
if(!$.isArray(_bb)){
_bb=[_bb];
}
var _bc=[];
for(var i=0;i<_bb.length;i++){
var s=_bb[i];
if(s=="checked"){
_bc.push("span.tree-checkbox1");
}else{
if(s=="unchecked"){
_bc.push("span.tree-checkbox0");
}else{
if(s=="indeterminate"){
_bc.push("span.tree-checkbox2");
}
}
}
}
var _bd=[];
$(_ba).find(_bc.join(",")).each(function(){
var _be=$(this).parent();
_bd.push(_c(_ba,_be[0]));
});
return _bd;
};
function _bf(_c0){
var _c1=$(_c0).find("div.tree-node-selected");
return _c1.length?_c(_c0,_c1[0]):null;
};
function _c2(_c3,_c4){
var _c5=_c(_c3,_c4);
if(_c5&&_c5.children){
_58(_c5.children,function(_c6){
_b1(_c6);
});
}
return _c5;
};
function _c(_c7,_c8){
return _53(_c7,"domId",$(_c8).attr("id"));
};
function _c9(_ca,id){
return _53(_ca,"id",id);
};
function _53(_cb,_cc,_cd){
var _ce=$.data(_cb,"tree").data;
var _cf=null;
_58(_ce,function(_d0){
if(_d0[_cc]==_cd){
_cf=_b1(_d0);
return false;
}
});
return _cf;
};
function _b1(_d1){
var d=$("#"+_d1.domId);
_d1.target=d[0];
_d1.checked=d.find(".tree-checkbox").hasClass("tree-checkbox1");
return _d1;
};
function _58(_d2,_d3){
var _d4=[];
for(var i=0;i<_d2.length;i++){
_d4.push(_d2[i]);
}
while(_d4.length){
var _d5=_d4.shift();
if(_d3(_d5)==false){
return;
}
if(_d5.children){
for(var i=_d5.children.length-1;i>=0;i--){
_d4.unshift(_d5.children[i]);
}
}
}
};
function _d6(_d7,_d8){
var _d9=$.data(_d7,"tree").options;
var _da=_c(_d7,_d8);
if(_d9.onBeforeSelect.call(_d7,_da)==false){
return;
}
$(_d7).find("div.tree-node-selected").removeClass("tree-node-selected");
$(_d8).addClass("tree-node-selected");
_d9.onSelect.call(_d7,_da);
};
function _46(_db,_dc){
return $(_dc).children("span.tree-hit").length==0;
};
function _dd(_de,_df){
var _e0=$.data(_de,"tree").options;
var _e1=_c(_de,_df);
if(_e0.onBeforeEdit.call(_de,_e1)==false){
return;
}
$(_df).css("position","relative");
var nt=$(_df).find(".tree-title");
var _e2=nt.outerWidth();
nt.empty();
var _e3=$("<input class=\"tree-editor\">").appendTo(nt);
_e3.val(_e1.text).focus();
_e3.width(_e2+20);
_e3.height(document.compatMode=="CSS1Compat"?(18-(_e3.outerHeight()-_e3.height())):18);
_e3.bind("click",function(e){
return false;
}).bind("mousedown",function(e){
e.stopPropagation();
}).bind("mousemove",function(e){
e.stopPropagation();
}).bind("keydown",function(e){
if(e.keyCode==13){
_e4(_de,_df);
return false;
}else{
if(e.keyCode==27){
_ea(_de,_df);
return false;
}
}
}).bind("blur",function(e){
e.stopPropagation();
_e4(_de,_df);
});
};
function _e4(_e5,_e6){
var _e7=$.data(_e5,"tree").options;
$(_e6).css("position","");
var _e8=$(_e6).find("input.tree-editor");
var val=_e8.val();
_e8.remove();
var _e9=_c(_e5,_e6);
_e9.text=val;
_54(_e5,_e9);
_e7.onAfterEdit.call(_e5,_e9);
};
function _ea(_eb,_ec){
var _ed=$.data(_eb,"tree").options;
$(_ec).css("position","");
$(_ec).find("input.tree-editor").remove();
var _ee=_c(_eb,_ec);
_54(_eb,_ee);
_ed.onCancelEdit.call(_eb,_ee);
};
$.fn.tree=function(_ef,_f0){
if(typeof _ef=="string"){
return $.fn.tree.methods[_ef](this,_f0);
}
var _ef=_ef||{};
return this.each(function(){
var _f1=$.data(this,"tree");
var _f2;
if(_f1){
_f2=$.extend(_f1.options,_ef);
_f1.options=_f2;
}else{
_f2=$.extend({},$.fn.tree.defaults,$.fn.tree.parseOptions(this),_ef);
$.data(this,"tree",{options:_f2,tree:_1(this),data:[]});
var _f3=$.fn.tree.parseData(this);
if(_f3.length){
_4b(this,this,_f3);
}
}
_4(this);
if(_f2.data){
_4b(this,this,_f2.data);
}
_68(this,this);
});
};
$.fn.tree.methods={options:function(jq){
return $.data(jq[0],"tree").options;
},loadData:function(jq,_f4){
return jq.each(function(){
_4b(this,this,_f4);
});
},getNode:function(jq,_f5){
return _c(jq[0],_f5);
},getData:function(jq,_f6){
return _c2(jq[0],_f6);
},reload:function(jq,_f7){
return jq.each(function(){
if(_f7){
var _f8=$(_f7);
var hit=_f8.children("span.tree-hit");
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_f8.next().remove();
_72(this,_f7);
}else{
$(this).empty();
_68(this,this);
}
});
},getRoot:function(jq){
return _ab(jq[0]);
},getRoots:function(jq){
return _ae(jq[0]);
},getParent:function(jq,_f9){
return _89(jq[0],_f9);
},getChildren:function(jq,_fa){
return _4a(jq[0],_fa);
},getChecked:function(jq,_fb){
return _b9(jq[0],_fb);
},getSelected:function(jq){
return _bf(jq[0]);
},isLeaf:function(jq,_fc){
return _46(jq[0],_fc);
},find:function(jq,id){
return _c9(jq[0],id);
},select:function(jq,_fd){
return jq.each(function(){
_d6(this,_fd);
});
},check:function(jq,_fe){
return jq.each(function(){
_32(this,_fe,true);
});
},uncheck:function(jq,_ff){
return jq.each(function(){
_32(this,_ff,false);
});
},collapse:function(jq,_100){
return jq.each(function(){
_79(this,_100);
});
},expand:function(jq,_101){
return jq.each(function(){
_72(this,_101);
});
},collapseAll:function(jq,_102){
return jq.each(function(){
_8f(this,_102);
});
},expandAll:function(jq,_103){
return jq.each(function(){
_81(this,_103);
});
},expandTo:function(jq,_104){
return jq.each(function(){
_85(this,_104);
});
},scrollTo:function(jq,_105){
return jq.each(function(){
_8a(this,_105);
});
},toggle:function(jq,_106){
return jq.each(function(){
_7e(this,_106);
});
},append:function(jq,_107){
return jq.each(function(){
_93(this,_107);
});
},insert:function(jq,_108){
return jq.each(function(){
_99(this,_108);
});
},remove:function(jq,_109){
return jq.each(function(){
_9e(this,_109);
});
},pop:function(jq,_10a){
var node=jq.tree("getData",_10a);
jq.tree("remove",_10a);
return node;
},update:function(jq,_10b){
return jq.each(function(){
_54(this,_10b);
});
},enableDnd:function(jq){
return jq.each(function(){
_11(this);
});
},disableDnd:function(jq){
return jq.each(function(){
_d(this);
});
},beginEdit:function(jq,_10c){
return jq.each(function(){
_dd(this,_10c);
});
},endEdit:function(jq,_10d){
return jq.each(function(){
_e4(this,_10d);
});
},cancelEdit:function(jq,_10e){
return jq.each(function(){
_ea(this,_10e);
});
}};
$.fn.tree.parseOptions=function(_10f){
var t=$(_10f);
return $.extend({},$.parser.parseOptions(_10f,["url","method",{checkbox:"boolean",cascadeCheck:"boolean",onlyLeafCheck:"boolean"},{animate:"boolean",lines:"boolean",dnd:"boolean"}]));
};
$.fn.tree.parseData=function(_110){
var data=[];
_111(data,$(_110));
return data;
function _111(aa,tree){
tree.children("li").each(function(){
var node=$(this);
var item=$.extend({},$.parser.parseOptions(this,["id","iconCls","state"]),{checked:(node.attr("checked")?true:undefined)});
item.text=node.children("span").html();
if(!item.text){
item.text=node.html();
}
var _112=node.children("ul");
if(_112.length){
item.children=[];
_111(item.children,_112);
}
aa.push(item);
});
};
};
var _113=1;
var _114={render:function(_115,ul,data){
var opts=$.data(_115,"tree").options;
var _116=$(ul).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;
var cc=_117(_116,data);
$(ul).append(cc.join(""));
function _117(_118,_119){
var cc=[];
for(var i=0;i<_119.length;i++){
var item=_119[i];
if(item.state!="open"&&item.state!="closed"){
item.state="open";
}
item.domId="_easyui_tree_"+_113++;
cc.push("<li>");
cc.push("<div id=\""+item.domId+"\" class=\"tree-node\">");
for(var j=0;j<_118;j++){
cc.push("<span class=\"tree-indent\"></span>");
}
if(item.state=="closed"){
cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
cc.push("<span class=\"tree-icon tree-folder "+(item.iconCls?item.iconCls:"")+"\"></span>");
}else{
if(item.children&&item.children.length){
cc.push("<span class=\"tree-hit tree-expanded\"></span>");
cc.push("<span class=\"tree-icon tree-folder tree-folder-open "+(item.iconCls?item.iconCls:"")+"\"></span>");
}else{
cc.push("<span class=\"tree-indent\"></span>");
cc.push("<span class=\"tree-icon tree-file "+(item.iconCls?item.iconCls:"")+"\"></span>");
}
}
if(opts.checkbox){
if((!opts.onlyLeafCheck)||(opts.onlyLeafCheck&&(!item.children||!item.children.length))){
cc.push("<span class=\"tree-checkbox tree-checkbox0\"></span>");
}
}
cc.push("<span class=\"tree-title\">"+opts.formatter.call(_115,item)+"</span>");
cc.push("</div>");
if(item.children&&item.children.length){
var tmp=_117(_118+1,item.children);
cc.push("<ul style=\"display:"+(item.state=="closed"?"none":"block")+"\">");
cc=cc.concat(tmp);
cc.push("</ul>");
}
cc.push("</li>");
}
return cc;
};
}};
$.fn.tree.defaults={url:null,method:"post",animate:false,checkbox:false,cascadeCheck:true,onlyLeafCheck:false,lines:false,dnd:false,data:null,formatter:function(node){
return node.text;
},loader:function(_11a,_11b,_11c){
var opts=$(this).tree("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_11a,dataType:"json",success:function(data){
_11b(data);
},error:function(){
_11c.apply(this,arguments);
}});
},loadFilter:function(data,_11d){
return data;
},view:_114,onBeforeLoad:function(node,_11e){
},onLoadSuccess:function(node,data){
},onLoadError:function(){
},onClick:function(node){
},onDblClick:function(node){
},onBeforeExpand:function(node){
},onExpand:function(node){
},onBeforeCollapse:function(node){
},onCollapse:function(node){
},onBeforeCheck:function(node,_11f){
},onCheck:function(node,_120){
},onBeforeSelect:function(node){
},onSelect:function(node){
},onContextMenu:function(e,node){
},onBeforeDrag:function(node){
},onStartDrag:function(node){
},onStopDrag:function(node){
},onDragEnter:function(_121,_122){
},onDragOver:function(_123,_124){
},onDragLeave:function(_125,_126){
},onBeforeDrop:function(_127,_128,_129){
},onDrop:function(_12a,_12b,_12c){
},onBeforeEdit:function(node){
},onAfterEdit:function(node){
},onCancelEdit:function(node){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"combotree").options;
var _4=$.data(_2,"combotree").tree;
$(_2).addClass("combotree-f");
$(_2).combo(_3);
var _5=$(_2).combo("panel");
if(!_4){
_4=$("<ul></ul>").appendTo(_5);
$.data(_2,"combotree").tree=_4;
}
_4.tree($.extend({},_3,{checkbox:_3.multiple,onLoadSuccess:function(_6,_7){
var _8=$(_2).combotree("getValues");
if(_3.multiple){
var _9=_4.tree("getChecked");
for(var i=0;i<_9.length;i++){
var id=_9[i].id;
(function(){
for(var i=0;i<_8.length;i++){
if(id==_8[i]){
return;
}
}
_8.push(id);
})();
}
}
$(_2).combotree("setValues",_8);
_3.onLoadSuccess.call(this,_6,_7);
},onClick:function(_a){
_d(_2);
$(_2).combo("hidePanel");
_3.onClick.call(this,_a);
},onCheck:function(_b,_c){
_d(_2);
_3.onCheck.call(this,_b,_c);
}}));
};
function _d(_e){
var _f=$.data(_e,"combotree").options;
var _10=$.data(_e,"combotree").tree;
var vv=[],ss=[];
if(_f.multiple){
var _11=_10.tree("getChecked");
for(var i=0;i<_11.length;i++){
vv.push(_11[i].id);
ss.push(_11[i].text);
}
}else{
var _12=_10.tree("getSelected");
if(_12){
vv.push(_12.id);
ss.push(_12.text);
}
}
$(_e).combo("setValues",vv).combo("setText",ss.join(_f.separator));
};
function _13(_14,_15){
var _16=$.data(_14,"combotree").options;
var _17=$.data(_14,"combotree").tree;
_17.find("span.tree-checkbox").addClass("tree-checkbox0").removeClass("tree-checkbox1 tree-checkbox2");
var vv=[],ss=[];
for(var i=0;i<_15.length;i++){
var v=_15[i];
var s=v;
var _18=_17.tree("find",v);
if(_18){
s=_18.text;
_17.tree("check",_18.target);
_17.tree("select",_18.target);
}
vv.push(v);
ss.push(s);
}
$(_14).combo("setValues",vv).combo("setText",ss.join(_16.separator));
};
$.fn.combotree=function(_19,_1a){
if(typeof _19=="string"){
var _1b=$.fn.combotree.methods[_19];
if(_1b){
return _1b(this,_1a);
}else{
return this.combo(_19,_1a);
}
}
_19=_19||{};
return this.each(function(){
var _1c=$.data(this,"combotree");
if(_1c){
$.extend(_1c.options,_19);
}else{
$.data(this,"combotree",{options:$.extend({},$.fn.combotree.defaults,$.fn.combotree.parseOptions(this),_19)});
}
_1(this);
});
};
$.fn.combotree.methods={options:function(jq){
var _1d=jq.combo("options");
return $.extend($.data(jq[0],"combotree").options,{originalValue:_1d.originalValue,disabled:_1d.disabled,readonly:_1d.readonly});
},tree:function(jq){
return $.data(jq[0],"combotree").tree;
},loadData:function(jq,_1e){
return jq.each(function(){
var _1f=$.data(this,"combotree").options;
_1f.data=_1e;
var _20=$.data(this,"combotree").tree;
_20.tree("loadData",_1e);
});
},reload:function(jq,url){
return jq.each(function(){
var _21=$.data(this,"combotree").options;
var _22=$.data(this,"combotree").tree;
if(url){
_21.url=url;
}
_22.tree({url:_21.url});
});
},setValues:function(jq,_23){
return jq.each(function(){
_13(this,_23);
});
},setValue:function(jq,_24){
return jq.each(function(){
_13(this,[_24]);
});
},clear:function(jq){
return jq.each(function(){
var _25=$.data(this,"combotree").tree;
_25.find("div.tree-node-selected").removeClass("tree-node-selected");
var cc=_25.tree("getChecked");
for(var i=0;i<cc.length;i++){
_25.tree("uncheck",cc[i].target);
}
$(this).combo("clear");
});
},reset:function(jq){
return jq.each(function(){
var _26=$(this).combotree("options");
if(_26.multiple){
$(this).combotree("setValues",_26.originalValue);
}else{
$(this).combotree("setValue",_26.originalValue);
}
});
}};
$.fn.combotree.parseOptions=function(_27){
return $.extend({},$.fn.combo.parseOptions(_27),$.fn.tree.parseOptions(_27));
};
$.fn.combotree.defaults=$.extend({},$.fn.combo.defaults,$.fn.tree.defaults,{editable:true});
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"combogrid");
var _4=_3.options;
var _5=_3.grid;
$(_2).addClass("combogrid-f").combo(_4);
var _6=$(_2).combo("panel");
if(!_5){
_5=$("<table></table>").appendTo(_6);
_3.grid=_5;
}
_5.datagrid($.extend({},_4,{border:false,fit:true,singleSelect:(!_4.multiple),onLoadSuccess:function(_7){
var _8=$(_2).combo("getValues");
var _9=_4.onSelect;
_4.onSelect=function(){
};
_1a(_2,_8,_3.remainText);
_4.onSelect=_9;
_4.onLoadSuccess.apply(_2,arguments);
},onClickRow:_a,onSelect:function(_b,_c){
_d();
_4.onSelect.call(this,_b,_c);
},onUnselect:function(_e,_f){
_d();
_4.onUnselect.call(this,_e,_f);
},onSelectAll:function(_10){
_d();
_4.onSelectAll.call(this,_10);
},onUnselectAll:function(_11){
if(_4.multiple){
_d();
}
_4.onUnselectAll.call(this,_11);
}}));
function _a(_12,row){
_3.remainText=false;
_d();
if(!_4.multiple){
$(_2).combo("hidePanel");
}
_4.onClickRow.call(this,_12,row);
};
function _d(){
var _13=_5.datagrid("getSelections");
var vv=[],ss=[];
for(var i=0;i<_13.length;i++){
vv.push(_13[i][_4.idField]);
ss.push(_13[i][_4.textField]);
}
if(!_4.multiple){
$(_2).combo("setValues",(vv.length?vv:[""]));
}else{
$(_2).combo("setValues",vv);
}
if(!_3.remainText){
$(_2).combo("setText",ss.join(_4.separator));
}
};
};
function nav(_14,dir){
var _15=$.data(_14,"combogrid");
var _16=_15.options;
var _17=_15.grid;
var _18=_17.datagrid("getRows").length;
if(!_18){
return;
}
var tr=_16.finder.getTr(_17[0],null,"highlight");
if(!tr.length){
tr=_16.finder.getTr(_17[0],null,"selected");
}
var _19;
if(!tr.length){
_19=(dir=="next"?0:_18-1);
}else{
var _19=parseInt(tr.attr("datagrid-row-index"));
_19+=(dir=="next"?1:-1);
if(_19<0){
_19=_18-1;
}
if(_19>=_18){
_19=0;
}
}
_17.datagrid("highlightRow",_19);
if(_16.selectOnNavigation){
_15.remainText=false;
_17.datagrid("selectRow",_19);
}
};
function _1a(_1b,_1c,_1d){
var _1e=$.data(_1b,"combogrid");
var _1f=_1e.options;
var _20=_1e.grid;
var _21=_20.datagrid("getRows");
var ss=[];
var _22=$(_1b).combo("getValues");
var _23=$(_1b).combo("options");
var _24=_23.onChange;
_23.onChange=function(){
};
_20.datagrid("clearSelections");
for(var i=0;i<_1c.length;i++){
var _25=_20.datagrid("getRowIndex",_1c[i]);
if(_25>=0){
_20.datagrid("selectRow",_25);
ss.push(_21[_25][_1f.textField]);
}else{
ss.push(_1c[i]);
}
}
$(_1b).combo("setValues",_22);
_23.onChange=_24;
$(_1b).combo("setValues",_1c);
if(!_1d){
var s=ss.join(_1f.separator);
if($(_1b).combo("getText")!=s){
$(_1b).combo("setText",s);
}
}
};
function _26(_27,q){
var _28=$.data(_27,"combogrid");
var _29=_28.options;
var _2a=_28.grid;
_28.remainText=true;
if(_29.multiple&&!q){
_1a(_27,[],true);
}else{
_1a(_27,[q],true);
}
if(_29.mode=="remote"){
_2a.datagrid("clearSelections");
_2a.datagrid("load",$.extend({},_29.queryParams,{q:q}));
}else{
if(!q){
return;
}
var _2b=_2a.datagrid("getRows");
for(var i=0;i<_2b.length;i++){
if(_29.filter.call(_27,q,_2b[i])){
_2a.datagrid("clearSelections");
_2a.datagrid("selectRow",i);
return;
}
}
}
};
function _2c(_2d){
var _2e=$.data(_2d,"combogrid");
var _2f=_2e.options;
var _30=_2e.grid;
var tr=_2f.finder.getTr(_30[0],null,"highlight");
if(!tr.length){
tr=_2f.finder.getTr(_30[0],null,"selected");
}
if(!tr.length){
return;
}
_2e.remainText=false;
var _31=parseInt(tr.attr("datagrid-row-index"));
if(_2f.multiple){
if(tr.hasClass("datagrid-row-selected")){
_30.datagrid("unselectRow",_31);
}else{
_30.datagrid("selectRow",_31);
}
}else{
_30.datagrid("selectRow",_31);
$(_2d).combogrid("hidePanel");
}
};
$.fn.combogrid=function(_32,_33){
if(typeof _32=="string"){
var _34=$.fn.combogrid.methods[_32];
if(_34){
return _34(this,_33);
}else{
return $.fn.combo.methods[_32](this,_33);
}
}
_32=_32||{};
return this.each(function(){
var _35=$.data(this,"combogrid");
if(_35){
$.extend(_35.options,_32);
}else{
_35=$.data(this,"combogrid",{options:$.extend({},$.fn.combogrid.defaults,$.fn.combogrid.parseOptions(this),_32)});
}
_1(this);
});
};
$.fn.combogrid.methods={options:function(jq){
var _36=jq.combo("options");
return $.extend($.data(jq[0],"combogrid").options,{originalValue:_36.originalValue,disabled:_36.disabled,readonly:_36.readonly});
},grid:function(jq){
return $.data(jq[0],"combogrid").grid;
},setValues:function(jq,_37){
return jq.each(function(){
_1a(this,_37);
});
},setValue:function(jq,_38){
return jq.each(function(){
_1a(this,[_38]);
});
},clear:function(jq){
return jq.each(function(){
$(this).combogrid("grid").datagrid("clearSelections");
$(this).combo("clear");
});
},reset:function(jq){
return jq.each(function(){
var _39=$(this).combogrid("options");
if(_39.multiple){
$(this).combogrid("setValues",_39.originalValue);
}else{
$(this).combogrid("setValue",_39.originalValue);
}
});
}};
$.fn.combogrid.parseOptions=function(_3a){
var t=$(_3a);
return $.extend({},$.fn.combo.parseOptions(_3a),$.fn.datagrid.parseOptions(_3a),$.parser.parseOptions(_3a,["idField","textField","mode"]));
};
$.fn.combogrid.defaults=$.extend({},$.fn.combo.defaults,$.fn.datagrid.defaults,{panelHeight:350,loadMsg:null,idField:null,textField:null,mode:"local",keyHandler:{up:function(e){
nav(this,"prev");
e.preventDefault();
},down:function(e){
nav(this,"next");
e.preventDefault();
},left:function(e){
},right:function(e){
},enter:function(e){
_2c(this);
},query:function(q,e){
_26(this,q);
}},filter:function(q,row){
var _3b=$(this).combogrid("options");
return row[_3b.textField].indexOf(q)==0;
}});
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
$(_2).addClass("numberbox-f");
var v=$("<input type=\"hidden\">").insertAfter(_2);
var _3=$(_2).attr("name");
if(_3){
v.attr("name",_3);
$(_2).removeAttr("name").attr("numberboxName",_3);
}
return v;
};
function _4(_5){
var _6=$.data(_5,"numberbox").options;
var fn=_6.onChange;
_6.onChange=function(){
};
_7(_5,_6.parser.call(_5,_6.value));
_6.onChange=fn;
_6.originalValue=_8(_5);
};
function _8(_9){
return $.data(_9,"numberbox").field.val();
};
function _7(_a,_b){
var _c=$.data(_a,"numberbox");
var _d=_c.options;
var _e=_8(_a);
_b=_d.parser.call(_a,_b);
_d.value=_b;
_c.field.val(_b);
$(_a).val(_d.formatter.call(_a,_b));
if(_e!=_b){
_d.onChange.call(_a,_b,_e);
}
};
function _f(_10){
var _11=$.data(_10,"numberbox").options;
$(_10).unbind(".numberbox").bind("keypress.numberbox",function(e){
return _11.filter.call(_10,e);
}).bind("blur.numberbox",function(){
_7(_10,$(this).val());
$(this).val(_11.formatter.call(_10,_8(_10)));
}).bind("focus.numberbox",function(){
var vv=_8(_10);
if(vv!=_11.parser.call(_10,$(this).val())){
$(this).val(_11.formatter.call(_10,vv));
}
});
};
function _12(_13){
if($.fn.validatebox){
var _14=$.data(_13,"numberbox").options;
$(_13).validatebox(_14);
}
};
function _15(_16,_17){
var _18=$.data(_16,"numberbox").options;
if(_17){
_18.disabled=true;
$(_16).attr("disabled",true);
}else{
_18.disabled=false;
$(_16).removeAttr("disabled");
}
};
$.fn.numberbox=function(_19,_1a){
if(typeof _19=="string"){
var _1b=$.fn.numberbox.methods[_19];
if(_1b){
return _1b(this,_1a);
}else{
return this.validatebox(_19,_1a);
}
}
_19=_19||{};
return this.each(function(){
var _1c=$.data(this,"numberbox");
if(_1c){
$.extend(_1c.options,_19);
}else{
_1c=$.data(this,"numberbox",{options:$.extend({},$.fn.numberbox.defaults,$.fn.numberbox.parseOptions(this),_19),field:_1(this)});
$(this).removeAttr("disabled");
$(this).css({imeMode:"disabled"});
}
_15(this,_1c.options.disabled);
_f(this);
_12(this);
_4(this);
});
};
$.fn.numberbox.methods={options:function(jq){
return $.data(jq[0],"numberbox").options;
},destroy:function(jq){
return jq.each(function(){
$.data(this,"numberbox").field.remove();
$(this).validatebox("destroy");
$(this).remove();
});
},disable:function(jq){
return jq.each(function(){
_15(this,true);
});
},enable:function(jq){
return jq.each(function(){
_15(this,false);
});
},fix:function(jq){
return jq.each(function(){
_7(this,$(this).val());
});
},setValue:function(jq,_1d){
return jq.each(function(){
_7(this,_1d);
});
},getValue:function(jq){
return _8(jq[0]);
},clear:function(jq){
return jq.each(function(){
var _1e=$.data(this,"numberbox");
_1e.field.val("");
$(this).val("");
});
},reset:function(jq){
return jq.each(function(){
var _1f=$(this).numberbox("options");
$(this).numberbox("setValue",_1f.originalValue);
});
}};
$.fn.numberbox.parseOptions=function(_20){
var t=$(_20);
return $.extend({},$.fn.validatebox.parseOptions(_20),$.parser.parseOptions(_20,["decimalSeparator","groupSeparator","suffix",{min:"number",max:"number",precision:"number"}]),{prefix:(t.attr("prefix")?t.attr("prefix"):undefined),disabled:(t.attr("disabled")?true:undefined),value:(t.val()||undefined)});
};
$.fn.numberbox.defaults=$.extend({},$.fn.validatebox.defaults,{disabled:false,value:"",min:null,max:null,precision:0,decimalSeparator:".",groupSeparator:"",prefix:"",suffix:"",filter:function(e){
var _21=$(this).numberbox("options");
if(e.which==45){
return ($(this).val().indexOf("-")==-1?true:false);
}
var c=String.fromCharCode(e.which);
if(c==_21.decimalSeparator){
return ($(this).val().indexOf(c)==-1?true:false);
}else{
if(c==_21.groupSeparator){
return true;
}else{
if((e.which>=48&&e.which<=57&&e.ctrlKey==false&&e.shiftKey==false)||e.which==0||e.which==8){
return true;
}else{
if(e.ctrlKey==true&&(e.which==99||e.which==118)){
return true;
}else{
return false;
}
}
}
}
},formatter:function(_22){
if(!_22){
return _22;
}
_22=_22+"";
var _23=$(this).numberbox("options");
var s1=_22,s2="";
var _24=_22.indexOf(".");
if(_24>=0){
s1=_22.substring(0,_24);
s2=_22.substring(_24+1,_22.length);
}
if(_23.groupSeparator){
var p=/(\d+)(\d{3})/;
while(p.test(s1)){
s1=s1.replace(p,"$1"+_23.groupSeparator+"$2");
}
}
if(s2){
return _23.prefix+s1+_23.decimalSeparator+s2+_23.suffix;
}else{
return _23.prefix+s1+_23.suffix;
}
},parser:function(s){
s=s+"";
var _25=$(this).numberbox("options");
if(parseFloat(s)!=s){
if(_25.prefix){
s=$.trim(s.replace(new RegExp("\\"+$.trim(_25.prefix),"g"),""));
}
if(_25.suffix){
s=$.trim(s.replace(new RegExp("\\"+$.trim(_25.suffix),"g"),""));
}
if(_25.groupSeparator){
s=$.trim(s.replace(new RegExp("\\"+_25.groupSeparator,"g"),""));
}
if(_25.decimalSeparator){
s=$.trim(s.replace(new RegExp("\\"+_25.decimalSeparator,"g"),"."));
}
s=s.replace(/\s/g,"");
}
var val=parseFloat(s).toFixed(_25.precision);
if(isNaN(val)){
val="";
}else{
if(typeof (_25.min)=="number"&&val<_25.min){
val=_25.min.toFixed(_25.precision);
}else{
if(typeof (_25.max)=="number"&&val>_25.max){
val=_25.max.toFixed(_25.precision);
}
}
}
return val;
},onChange:function(_26,_27){
}});
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"timespinner").options;
$(_2).addClass("timespinner-f");
$(_2).spinner(_3);
$(_2).unbind(".timespinner");
$(_2).bind("click.timespinner",function(){
var _4=0;
if(this.selectionStart!=null){
_4=this.selectionStart;
}else{
if(this.createTextRange){
var _5=_2.createTextRange();
var s=document.selection.createRange();
s.setEndPoint("StartToStart",_5);
_4=s.text.length;
}
}
if(_4>=0&&_4<=2){
_3.highlight=0;
}else{
if(_4>=3&&_4<=5){
_3.highlight=1;
}else{
if(_4>=6&&_4<=8){
_3.highlight=2;
}
}
}
_7(_2);
}).bind("blur.timespinner",function(){
_6(_2);
});
};
function _7(_8){
var _9=$.data(_8,"timespinner").options;
var _a=0,_b=0;
if(_9.highlight==0){
_a=0;
_b=2;
}else{
if(_9.highlight==1){
_a=3;
_b=5;
}else{
if(_9.highlight==2){
_a=6;
_b=8;
}
}
}
if(_8.selectionStart!=null){
_8.setSelectionRange(_a,_b);
}else{
if(_8.createTextRange){
var _c=_8.createTextRange();
_c.collapse();
_c.moveEnd("character",_b);
_c.moveStart("character",_a);
_c.select();
}
}
$(_8).focus();
};
function _d(_e,_f){
var _10=$.data(_e,"timespinner").options;
if(!_f){
return null;
}
var vv=_f.split(_10.separator);
for(var i=0;i<vv.length;i++){
if(isNaN(vv[i])){
return null;
}
}
while(vv.length<3){
vv.push(0);
}
return new Date(1900,0,0,vv[0],vv[1],vv[2]);
};
function _6(_11){
var _12=$.data(_11,"timespinner").options;
var _13=$(_11).val();
var _14=_d(_11,_13);
if(!_14){
_12.value="";
$(_11).val("");
return;
}
var _15=_d(_11,_12.min);
var _16=_d(_11,_12.max);
if(_15&&_15>_14){
_14=_15;
}
if(_16&&_16<_14){
_14=_16;
}
var tt=[_17(_14.getHours()),_17(_14.getMinutes())];
if(_12.showSeconds){
tt.push(_17(_14.getSeconds()));
}
var val=tt.join(_12.separator);
_12.value=val;
$(_11).val(val);
function _17(_18){
return (_18<10?"0":"")+_18;
};
};
function _19(_1a,_1b){
var _1c=$.data(_1a,"timespinner").options;
var val=$(_1a).val();
if(val==""){
val=[0,0,0].join(_1c.separator);
}
var vv=val.split(_1c.separator);
for(var i=0;i<vv.length;i++){
vv[i]=parseInt(vv[i],10);
}
if(_1b==true){
vv[_1c.highlight]-=_1c.increment;
}else{
vv[_1c.highlight]+=_1c.increment;
}
$(_1a).val(vv.join(_1c.separator));
_6(_1a);
_7(_1a);
};
$.fn.timespinner=function(_1d,_1e){
if(typeof _1d=="string"){
var _1f=$.fn.timespinner.methods[_1d];
if(_1f){
return _1f(this,_1e);
}else{
return this.spinner(_1d,_1e);
}
}
_1d=_1d||{};
return this.each(function(){
var _20=$.data(this,"timespinner");
if(_20){
$.extend(_20.options,_1d);
}else{
$.data(this,"timespinner",{options:$.extend({},$.fn.timespinner.defaults,$.fn.timespinner.parseOptions(this),_1d)});
_1(this);
}
});
};
$.fn.timespinner.methods={options:function(jq){
var _21=$.data(jq[0],"timespinner").options;
return $.extend(_21,{value:jq.val(),originalValue:jq.spinner("options").originalValue});
},setValue:function(jq,_22){
return jq.each(function(){
$(this).val(_22);
_6(this);
});
},getHours:function(jq){
var _23=$.data(jq[0],"timespinner").options;
var vv=jq.val().split(_23.separator);
return parseInt(vv[0],10);
},getMinutes:function(jq){
var _24=$.data(jq[0],"timespinner").options;
var vv=jq.val().split(_24.separator);
return parseInt(vv[1],10);
},getSeconds:function(jq){
var _25=$.data(jq[0],"timespinner").options;
var vv=jq.val().split(_25.separator);
return parseInt(vv[2],10)||0;
}};
$.fn.timespinner.parseOptions=function(_26){
return $.extend({},$.fn.spinner.parseOptions(_26),$.parser.parseOptions(_26,["separator",{showSeconds:"boolean",highlight:"number"}]));
};
$.fn.timespinner.defaults=$.extend({},$.fn.spinner.defaults,{separator:":",showSeconds:false,highlight:0,spin:function(_27){
_19(this,_27);
}});
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
var _3=$("<div class=\"slider\">"+"<div class=\"slider-inner\">"+"<a href=\"javascript:void(0)\" class=\"slider-handle\"></a>"+"<span class=\"slider-tip\"></span>"+"</div>"+"<div class=\"slider-rule\"></div>"+"<div class=\"slider-rulelabel\"></div>"+"<div style=\"clear:both\"></div>"+"<input type=\"hidden\" class=\"slider-value\">"+"</div>").insertAfter(_2);
var t=$(_2);
t.addClass("slider-f").hide();
var _4=t.attr("name");
if(_4){
_3.find("input.slider-value").attr("name",_4);
t.removeAttr("name").attr("sliderName",_4);
}
return _3;
};
function _5(_6,_7){
var _8=$.data(_6,"slider");
var _9=_8.options;
var _a=_8.slider;
if(_7){
if(_7.width){
_9.width=_7.width;
}
if(_7.height){
_9.height=_7.height;
}
}
if(_9.mode=="h"){
_a.css("height","");
_a.children("div").css("height","");
if(!isNaN(_9.width)){
_a.width(_9.width);
}
}else{
_a.css("width","");
_a.children("div").css("width","");
if(!isNaN(_9.height)){
_a.height(_9.height);
_a.find("div.slider-rule").height(_9.height);
_a.find("div.slider-rulelabel").height(_9.height);
_a.find("div.slider-inner")._outerHeight(_9.height);
}
}
_b(_6);
};
function _c(_d){
var _e=$.data(_d,"slider");
var _f=_e.options;
var _10=_e.slider;
var aa=_f.mode=="h"?_f.rule:_f.rule.slice(0).reverse();
if(_f.reversed){
aa=aa.slice(0).reverse();
}
_11(aa);
function _11(aa){
var _12=_10.find("div.slider-rule");
var _13=_10.find("div.slider-rulelabel");
_12.empty();
_13.empty();
for(var i=0;i<aa.length;i++){
var _14=i*100/(aa.length-1)+"%";
var _15=$("<span></span>").appendTo(_12);
_15.css((_f.mode=="h"?"left":"top"),_14);
if(aa[i]!="|"){
_15=$("<span></span>").appendTo(_13);
_15.html(aa[i]);
if(_f.mode=="h"){
_15.css({left:_14,marginLeft:-Math.round(_15.outerWidth()/2)});
}else{
_15.css({top:_14,marginTop:-Math.round(_15.outerHeight()/2)});
}
}
}
};
};
function _16(_17){
var _18=$.data(_17,"slider");
var _19=_18.options;
var _1a=_18.slider;
_1a.removeClass("slider-h slider-v slider-disabled");
_1a.addClass(_19.mode=="h"?"slider-h":"slider-v");
_1a.addClass(_19.disabled?"slider-disabled":"");
_1a.find("a.slider-handle").draggable({axis:_19.mode,cursor:"pointer",disabled:_19.disabled,onDrag:function(e){
var _1b=e.data.left;
var _1c=_1a.width();
if(_19.mode!="h"){
_1b=e.data.top;
_1c=_1a.height();
}
if(_1b<0||_1b>_1c){
return false;
}else{
var _1d=_32(_17,_1b);
_1e(_1d);
return false;
}
},onBeforeDrag:function(){
_18.isDragging=true;
},onStartDrag:function(){
_19.onSlideStart.call(_17,_19.value);
},onStopDrag:function(e){
var _1f=_32(_17,(_19.mode=="h"?e.data.left:e.data.top));
_1e(_1f);
_19.onSlideEnd.call(_17,_19.value);
_19.onComplete.call(_17,_19.value);
_18.isDragging=false;
}});
_1a.find("div.slider-inner").unbind(".slider").bind("mousedown.slider",function(e){
if(_18.isDragging){
return;
}
var pos=$(this).offset();
var _20=_32(_17,(_19.mode=="h"?(e.pageX-pos.left):(e.pageY-pos.top)));
_1e(_20);
_19.onComplete.call(_17,_19.value);
});
function _1e(_21){
var s=Math.abs(_21%_19.step);
if(s<_19.step/2){
_21-=s;
}else{
_21=_21-s+_19.step;
}
_22(_17,_21);
};
};
function _22(_23,_24){
var _25=$.data(_23,"slider");
var _26=_25.options;
var _27=_25.slider;
var _28=_26.value;
if(_24<_26.min){
_24=_26.min;
}
if(_24>_26.max){
_24=_26.max;
}
_26.value=_24;
$(_23).val(_24);
_27.find("input.slider-value").val(_24);
var pos=_29(_23,_24);
var tip=_27.find(".slider-tip");
if(_26.showTip){
tip.show();
tip.html(_26.tipFormatter.call(_23,_26.value));
}else{
tip.hide();
}
if(_26.mode=="h"){
var _2a="left:"+pos+"px;";
_27.find(".slider-handle").attr("style",_2a);
tip.attr("style",_2a+"margin-left:"+(-Math.round(tip.outerWidth()/2))+"px");
}else{
var _2a="top:"+pos+"px;";
_27.find(".slider-handle").attr("style",_2a);
tip.attr("style",_2a+"margin-left:"+(-Math.round(tip.outerWidth()))+"px");
}
if(_28!=_24){
_26.onChange.call(_23,_24,_28);
}
};
function _b(_2b){
var _2c=$.data(_2b,"slider").options;
var fn=_2c.onChange;
_2c.onChange=function(){
};
_22(_2b,_2c.value);
_2c.onChange=fn;
};
function _29(_2d,_2e){
var _2f=$.data(_2d,"slider");
var _30=_2f.options;
var _31=_2f.slider;
if(_30.mode=="h"){
var pos=(_2e-_30.min)/(_30.max-_30.min)*_31.width();
if(_30.reversed){
pos=_31.width()-pos;
}
}else{
var pos=_31.height()-(_2e-_30.min)/(_30.max-_30.min)*_31.height();
if(_30.reversed){
pos=_31.height()-pos;
}
}
return pos.toFixed(0);
};
function _32(_33,pos){
var _34=$.data(_33,"slider");
var _35=_34.options;
var _36=_34.slider;
if(_35.mode=="h"){
var _37=_35.min+(_35.max-_35.min)*(pos/_36.width());
}else{
var _37=_35.min+(_35.max-_35.min)*((_36.height()-pos)/_36.height());
}
return _35.reversed?_35.max-_37.toFixed(0):_37.toFixed(0);
};
$.fn.slider=function(_38,_39){
if(typeof _38=="string"){
return $.fn.slider.methods[_38](this,_39);
}
_38=_38||{};
return this.each(function(){
var _3a=$.data(this,"slider");
if(_3a){
$.extend(_3a.options,_38);
}else{
_3a=$.data(this,"slider",{options:$.extend({},$.fn.slider.defaults,$.fn.slider.parseOptions(this),_38),slider:_1(this)});
$(this).removeAttr("disabled");
}
var _3b=_3a.options;
_3b.min=parseFloat(_3b.min);
_3b.max=parseFloat(_3b.max);
_3b.value=parseFloat(_3b.value);
_3b.step=parseFloat(_3b.step);
_3b.originalValue=_3b.value;
_16(this);
_c(this);
_5(this);
});
};
$.fn.slider.methods={options:function(jq){
return $.data(jq[0],"slider").options;
},destroy:function(jq){
return jq.each(function(){
$.data(this,"slider").slider.remove();
$(this).remove();
});
},resize:function(jq,_3c){
return jq.each(function(){
_5(this,_3c);
});
},getValue:function(jq){
return jq.slider("options").value;
},setValue:function(jq,_3d){
return jq.each(function(){
_22(this,_3d);
});
},clear:function(jq){
return jq.each(function(){
var _3e=$(this).slider("options");
_22(this,_3e.min);
});
},reset:function(jq){
return jq.each(function(){
var _3f=$(this).slider("options");
_22(this,_3f.originalValue);
});
},enable:function(jq){
return jq.each(function(){
$.data(this,"slider").options.disabled=false;
_16(this);
});
},disable:function(jq){
return jq.each(function(){
$.data(this,"slider").options.disabled=true;
_16(this);
});
}};
$.fn.slider.parseOptions=function(_40){
var t=$(_40);
return $.extend({},$.parser.parseOptions(_40,["width","height","mode",{reversed:"boolean",showTip:"boolean",min:"number",max:"number",step:"number"}]),{value:(t.val()||undefined),disabled:(t.attr("disabled")?true:undefined),rule:(t.attr("rule")?eval(t.attr("rule")):undefined)});
};
$.fn.slider.defaults={width:"auto",height:"auto",mode:"h",reversed:false,showTip:false,disabled:false,value:0,min:0,max:100,step:1,rule:[],tipFormatter:function(_41){
return _41;
},onChange:function(_42,_43){
},onSlideStart:function(_44){
},onSlideEnd:function(_45){
},onComplete:function(_46){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
var _1;
function _2(_3){
var _4=$.data(_3,"propertygrid");
var _5=$.data(_3,"propertygrid").options;
$(_3).datagrid($.extend({},_5,{cls:"propertygrid",view:(_5.showGroup?_5.groupView:_5.view),onClickRow:function(_6,_7){
if(_1!=this){
_a(_1);
_1=this;
}
if(_5.editIndex!=_6&&_7.editor){
var _8=$(this).datagrid("getColumnOption","value");
_8.editor=_7.editor;
_a(_1);
$(this).datagrid("beginEdit",_6);
$(this).datagrid("getEditors",_6)[0].target.focus();
_5.editIndex=_6;
}
_5.onClickRow.call(_3,_6,_7);
},loadFilter:function(_9){
_a(this);
return _5.loadFilter.call(this,_9);
}}));
$(document).unbind(".propertygrid").bind("mousedown.propertygrid",function(e){
var p=$(e.target).closest("div.datagrid-view,div.combo-panel");
if(p.length){
return;
}
_a(_1);
_1=undefined;
});
};
function _a(_b){
var t=$(_b);
if(!t.length){
return;
}
var _c=$.data(_b,"propertygrid").options;
var _d=_c.editIndex;
if(_d==undefined){
return;
}
var ed=t.datagrid("getEditors",_d)[0];
if(ed){
ed.target.blur();
if(t.datagrid("validateRow",_d)){
t.datagrid("endEdit",_d);
}else{
t.datagrid("cancelEdit",_d);
}
}
_c.editIndex=undefined;
};
$.fn.propertygrid=function(_e,_f){
if(typeof _e=="string"){
var _10=$.fn.propertygrid.methods[_e];
if(_10){
return _10(this,_f);
}else{
return this.datagrid(_e,_f);
}
}
_e=_e||{};
return this.each(function(){
var _11=$.data(this,"propertygrid");
if(_11){
$.extend(_11.options,_e);
}else{
var _12=$.extend({},$.fn.propertygrid.defaults,$.fn.propertygrid.parseOptions(this),_e);
_12.frozenColumns=$.extend(true,[],_12.frozenColumns);
_12.columns=$.extend(true,[],_12.columns);
$.data(this,"propertygrid",{options:_12});
}
_2(this);
});
};
$.fn.propertygrid.methods={options:function(jq){
return $.data(jq[0],"propertygrid").options;
}};
$.fn.propertygrid.parseOptions=function(_13){
return $.extend({},$.fn.datagrid.parseOptions(_13),$.parser.parseOptions(_13,[{showGroup:"boolean"}]));
};
var _14=$.extend({},$.fn.datagrid.defaults.view,{render:function(_15,_16,_17){
var _18=[];
var _19=this.groups;
for(var i=0;i<_19.length;i++){
_18.push(this.renderGroup.call(this,_15,i,_19[i],_17));
}
$(_16).html(_18.join(""));
},renderGroup:function(_1a,_1b,_1c,_1d){
var _1e=$.data(_1a,"datagrid");
var _1f=_1e.options;
var _20=$(_1a).datagrid("getColumnFields",_1d);
var _21=[];
_21.push("<div class=\"datagrid-group\" group-index="+_1b+">");
_21.push("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"height:100%\"><tbody>");
_21.push("<tr>");
if((_1d&&(_1f.rownumbers||_1f.frozenColumns.length))||(!_1d&&!(_1f.rownumbers||_1f.frozenColumns.length))){
_21.push("<td style=\"border:0;text-align:center;width:25px\"><span class=\"datagrid-row-expander datagrid-row-collapse\" style=\"display:inline-block;width:16px;height:16px;cursor:pointer\">&nbsp;</span></td>");
}
_21.push("<td style=\"border:0;\">");
if(!_1d){
_21.push("<span class=\"datagrid-group-title\">");
_21.push(_1f.groupFormatter.call(_1a,_1c.value,_1c.rows));
_21.push("</span>");
}
_21.push("</td>");
_21.push("</tr>");
_21.push("</tbody></table>");
_21.push("</div>");
_21.push("<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>");
var _22=_1c.startIndex;
for(var j=0;j<_1c.rows.length;j++){
var css=_1f.rowStyler?_1f.rowStyler.call(_1a,_22,_1c.rows[j]):"";
var _23="";
var _24="";
if(typeof css=="string"){
_24=css;
}else{
if(css){
_23=css["class"]||"";
_24=css["style"]||"";
}
}
var cls="class=\"datagrid-row "+(_22%2&&_1f.striped?"datagrid-row-alt ":" ")+_23+"\"";
var _25=_24?"style=\""+_24+"\"":"";
var _26=_1e.rowIdPrefix+"-"+(_1d?1:2)+"-"+_22;
_21.push("<tr id=\""+_26+"\" datagrid-row-index=\""+_22+"\" "+cls+" "+_25+">");
_21.push(this.renderRow.call(this,_1a,_20,_1d,_22,_1c.rows[j]));
_21.push("</tr>");
_22++;
}
_21.push("</tbody></table>");
return _21.join("");
},bindEvents:function(_27){
var _28=$.data(_27,"datagrid");
var dc=_28.dc;
var _29=dc.body1.add(dc.body2);
var _2a=($.data(_29[0],"events")||$._data(_29[0],"events")).click[0].handler;
_29.unbind("click").bind("click",function(e){
var tt=$(e.target);
var _2b=tt.closest("span.datagrid-row-expander");
if(_2b.length){
var _2c=_2b.closest("div.datagrid-group").attr("group-index");
if(_2b.hasClass("datagrid-row-collapse")){
$(_27).datagrid("collapseGroup",_2c);
}else{
$(_27).datagrid("expandGroup",_2c);
}
}else{
_2a(e);
}
e.stopPropagation();
});
},onBeforeRender:function(_2d,_2e){
var _2f=$.data(_2d,"datagrid");
var _30=_2f.options;
_31();
var _32=[];
for(var i=0;i<_2e.length;i++){
var row=_2e[i];
var _33=_34(row[_30.groupField]);
if(!_33){
_33={value:row[_30.groupField],rows:[row]};
_32.push(_33);
}else{
_33.rows.push(row);
}
}
var _35=0;
var _36=[];
for(var i=0;i<_32.length;i++){
var _33=_32[i];
_33.startIndex=_35;
_35+=_33.rows.length;
_36=_36.concat(_33.rows);
}
_2f.data.rows=_36;
this.groups=_32;
var _37=this;
setTimeout(function(){
_37.bindEvents(_2d);
},0);
function _34(_38){
for(var i=0;i<_32.length;i++){
var _39=_32[i];
if(_39.value==_38){
return _39;
}
}
return null;
};
function _31(){
if(!$("#datagrid-group-style").length){
$("head").append("<style id=\"datagrid-group-style\">"+".datagrid-group{height:25px;overflow:hidden;font-weight:bold;border-bottom:1px solid #ccc;}"+"</style>");
}
};
}});
$.extend($.fn.datagrid.methods,{expandGroup:function(jq,_3a){
return jq.each(function(){
var _3b=$.data(this,"datagrid").dc.view;
var _3c=_3b.find(_3a!=undefined?"div.datagrid-group[group-index=\""+_3a+"\"]":"div.datagrid-group");
var _3d=_3c.find("span.datagrid-row-expander");
if(_3d.hasClass("datagrid-row-expand")){
_3d.removeClass("datagrid-row-expand").addClass("datagrid-row-collapse");
_3c.next("table").show();
}
$(this).datagrid("fixRowHeight");
});
},collapseGroup:function(jq,_3e){
return jq.each(function(){
var _3f=$.data(this,"datagrid").dc.view;
var _40=_3f.find(_3e!=undefined?"div.datagrid-group[group-index=\""+_3e+"\"]":"div.datagrid-group");
var _41=_40.find("span.datagrid-row-expander");
if(_41.hasClass("datagrid-row-collapse")){
_41.removeClass("datagrid-row-collapse").addClass("datagrid-row-expand");
_40.next("table").hide();
}
$(this).datagrid("fixRowHeight");
});
}});
$.fn.propertygrid.defaults=$.extend({},$.fn.datagrid.defaults,{singleSelect:true,remoteSort:false,fitColumns:true,loadMsg:"",frozenColumns:[[{field:"f",width:16,resizable:false}]],columns:[[{field:"name",title:"Name",width:100,sortable:true},{field:"value",title:"Value",width:100,resizable:false}]],showGroup:false,groupView:_14,groupField:"group",groupFormatter:function(_42,_43){
return _42;
}});
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"treegrid");
var _4=_3.options;
$(_2).datagrid($.extend({},_4,{url:null,data:null,loader:function(){
return false;
},onBeforeLoad:function(){
return false;
},onLoadSuccess:function(){
},onResizeColumn:function(_5,_6){
_20(_2);
_4.onResizeColumn.call(_2,_5,_6);
},onSortColumn:function(_7,_8){
_4.sortName=_7;
_4.sortOrder=_8;
if(_4.remoteSort){
_1f(_2);
}else{
var _9=$(_2).treegrid("getData");
_39(_2,0,_9);
}
_4.onSortColumn.call(_2,_7,_8);
},onBeforeEdit:function(_a,_b){
if(_4.onBeforeEdit.call(_2,_b)==false){
return false;
}
},onAfterEdit:function(_c,_d,_e){
_4.onAfterEdit.call(_2,_d,_e);
},onCancelEdit:function(_f,row){
_4.onCancelEdit.call(_2,row);
},onSelect:function(_10){
_4.onSelect.call(_2,_41(_2,_10));
},onUnselect:function(_11){
_4.onUnselect.call(_2,_41(_2,_11));
},onSelectAll:function(){
_4.onSelectAll.call(_2,$.data(_2,"treegrid").data);
},onUnselectAll:function(){
_4.onUnselectAll.call(_2,$.data(_2,"treegrid").data);
},onCheck:function(_12){
_4.onCheck.call(_2,_41(_2,_12));
},onUncheck:function(_13){
_4.onUncheck.call(_2,_41(_2,_13));
},onCheckAll:function(){
_4.onCheckAll.call(_2,$.data(_2,"treegrid").data);
},onUncheckAll:function(){
_4.onUncheckAll.call(_2,$.data(_2,"treegrid").data);
},onClickRow:function(_14){
_4.onClickRow.call(_2,_41(_2,_14));
},onDblClickRow:function(_15){
_4.onDblClickRow.call(_2,_41(_2,_15));
},onClickCell:function(_16,_17){
_4.onClickCell.call(_2,_17,_41(_2,_16));
},onDblClickCell:function(_18,_19){
_4.onDblClickCell.call(_2,_19,_41(_2,_18));
},onRowContextMenu:function(e,_1a){
_4.onContextMenu.call(_2,e,_41(_2,_1a));
}}));
if(!_4.columns){
var _1b=$.data(_2,"datagrid").options;
_4.columns=_1b.columns;
_4.frozenColumns=_1b.frozenColumns;
}
_3.dc=$.data(_2,"datagrid").dc;
if(_4.pagination){
var _1c=$(_2).datagrid("getPager");
_1c.pagination({pageNumber:_4.pageNumber,pageSize:_4.pageSize,pageList:_4.pageList,onSelectPage:function(_1d,_1e){
_4.pageNumber=_1d;
_4.pageSize=_1e;
_1f(_2);
}});
_4.pageSize=_1c.pagination("options").pageSize;
}
};
function _20(_21,_22){
var _23=$.data(_21,"datagrid").options;
var dc=$.data(_21,"datagrid").dc;
if(!dc.body1.is(":empty")&&(!_23.nowrap||_23.autoRowHeight)){
if(_22!=undefined){
var _24=_25(_21,_22);
for(var i=0;i<_24.length;i++){
_26(_24[i][_23.idField]);
}
}
}
$(_21).datagrid("fixRowHeight",_22);
function _26(_27){
var tr1=_23.finder.getTr(_21,_27,"body",1);
var tr2=_23.finder.getTr(_21,_27,"body",2);
tr1.css("height","");
tr2.css("height","");
var _28=Math.max(tr1.height(),tr2.height());
tr1.css("height",_28);
tr2.css("height",_28);
};
};
function _29(_2a){
var dc=$.data(_2a,"datagrid").dc;
var _2b=$.data(_2a,"treegrid").options;
if(!_2b.rownumbers){
return;
}
dc.body1.find("div.datagrid-cell-rownumber").each(function(i){
$(this).html(i+1);
});
};
function _2c(_2d){
var dc=$.data(_2d,"datagrid").dc;
var _2e=dc.body1.add(dc.body2);
var _2f=($.data(_2e[0],"events")||$._data(_2e[0],"events")).click[0].handler;
dc.body1.add(dc.body2).bind("mouseover",function(e){
var tt=$(e.target);
var tr=tt.closest("tr.datagrid-row");
if(!tr.length){
return;
}
if(tt.hasClass("tree-hit")){
tt.hasClass("tree-expanded")?tt.addClass("tree-expanded-hover"):tt.addClass("tree-collapsed-hover");
}
e.stopPropagation();
}).bind("mouseout",function(e){
var tt=$(e.target);
var tr=tt.closest("tr.datagrid-row");
if(!tr.length){
return;
}
if(tt.hasClass("tree-hit")){
tt.hasClass("tree-expanded")?tt.removeClass("tree-expanded-hover"):tt.removeClass("tree-collapsed-hover");
}
e.stopPropagation();
}).unbind("click").bind("click",function(e){
var tt=$(e.target);
var tr=tt.closest("tr.datagrid-row");
if(!tr.length){
return;
}
if(tt.hasClass("tree-hit")){
_30(_2d,tr.attr("node-id"));
}else{
_2f(e);
}
e.stopPropagation();
});
};
function _31(_32,_33){
var _34=$.data(_32,"treegrid").options;
var tr1=_34.finder.getTr(_32,_33,"body",1);
var tr2=_34.finder.getTr(_32,_33,"body",2);
var _35=$(_32).datagrid("getColumnFields",true).length+(_34.rownumbers?1:0);
var _36=$(_32).datagrid("getColumnFields",false).length;
_37(tr1,_35);
_37(tr2,_36);
function _37(tr,_38){
$("<tr class=\"treegrid-tr-tree\">"+"<td style=\"border:0px\" colspan=\""+_38+"\">"+"<div></div>"+"</td>"+"</tr>").insertAfter(tr);
};
};
function _39(_3a,_3b,_3c,_3d){
var _3e=$.data(_3a,"treegrid");
var _3f=_3e.options;
var dc=_3e.dc;
_3c=_3f.loadFilter.call(_3a,_3c,_3b);
var _40=_41(_3a,_3b);
if(_40){
var _42=_3f.finder.getTr(_3a,_3b,"body",1);
var _43=_3f.finder.getTr(_3a,_3b,"body",2);
var cc1=_42.next("tr.treegrid-tr-tree").children("td").children("div");
var cc2=_43.next("tr.treegrid-tr-tree").children("td").children("div");
if(!_3d){
_40.children=[];
}
}else{
var cc1=dc.body1;
var cc2=dc.body2;
if(!_3d){
_3e.data=[];
}
}
if(!_3d){
cc1.empty();
cc2.empty();
}
if(_3f.view.onBeforeRender){
_3f.view.onBeforeRender.call(_3f.view,_3a,_3b,_3c);
}
_3f.view.render.call(_3f.view,_3a,cc1,true);
_3f.view.render.call(_3f.view,_3a,cc2,false);
if(_3f.showFooter){
_3f.view.renderFooter.call(_3f.view,_3a,dc.footer1,true);
_3f.view.renderFooter.call(_3f.view,_3a,dc.footer2,false);
}
if(_3f.view.onAfterRender){
_3f.view.onAfterRender.call(_3f.view,_3a);
}
_3f.onLoadSuccess.call(_3a,_40,_3c);
if(!_3b&&_3f.pagination){
var _44=$.data(_3a,"treegrid").total;
var _45=$(_3a).datagrid("getPager");
if(_45.pagination("options").total!=_44){
_45.pagination({total:_44});
}
}
_20(_3a);
_29(_3a);
$(_3a).treegrid("autoSizeColumn");
};
function _1f(_46,_47,_48,_49,_4a){
var _4b=$.data(_46,"treegrid").options;
var _4c=$(_46).datagrid("getPanel").find("div.datagrid-body");
if(_48){
_4b.queryParams=_48;
}
var _4d=$.extend({},_4b.queryParams);
if(_4b.pagination){
$.extend(_4d,{page:_4b.pageNumber,rows:_4b.pageSize});
}
if(_4b.sortName){
$.extend(_4d,{sort:_4b.sortName,order:_4b.sortOrder});
}
var row=_41(_46,_47);
if(_4b.onBeforeLoad.call(_46,row,_4d)==false){
return;
}
var _4e=_4c.find("tr[node-id=\""+_47+"\"] span.tree-folder");
_4e.addClass("tree-loading");
$(_46).treegrid("loading");
var _4f=_4b.loader.call(_46,_4d,function(_50){
_4e.removeClass("tree-loading");
$(_46).treegrid("loaded");
_39(_46,_47,_50,_49);
if(_4a){
_4a();
}
},function(){
_4e.removeClass("tree-loading");
$(_46).treegrid("loaded");
_4b.onLoadError.apply(_46,arguments);
if(_4a){
_4a();
}
});
if(_4f==false){
_4e.removeClass("tree-loading");
$(_46).treegrid("loaded");
}
};
function _51(_52){
var _53=_54(_52);
if(_53.length){
return _53[0];
}else{
return null;
}
};
function _54(_55){
return $.data(_55,"treegrid").data;
};
function _56(_57,_58){
var row=_41(_57,_58);
if(row._parentId){
return _41(_57,row._parentId);
}else{
return null;
}
};
function _25(_59,_5a){
var _5b=$.data(_59,"treegrid").options;
var _5c=$(_59).datagrid("getPanel").find("div.datagrid-view2 div.datagrid-body");
var _5d=[];
if(_5a){
_5e(_5a);
}else{
var _5f=_54(_59);
for(var i=0;i<_5f.length;i++){
_5d.push(_5f[i]);
_5e(_5f[i][_5b.idField]);
}
}
function _5e(_60){
var _61=_41(_59,_60);
if(_61&&_61.children){
for(var i=0,len=_61.children.length;i<len;i++){
var _62=_61.children[i];
_5d.push(_62);
_5e(_62[_5b.idField]);
}
}
};
return _5d;
};
function _63(_64){
var _65=_66(_64);
if(_65.length){
return _65[0];
}else{
return null;
}
};
function _66(_67){
var _68=[];
var _69=$(_67).datagrid("getPanel");
_69.find("div.datagrid-view2 div.datagrid-body tr.datagrid-row-selected").each(function(){
var id=$(this).attr("node-id");
_68.push(_41(_67,id));
});
return _68;
};
function _6a(_6b,_6c){
if(!_6c){
return 0;
}
var _6d=$.data(_6b,"treegrid").options;
var _6e=$(_6b).datagrid("getPanel").children("div.datagrid-view");
var _6f=_6e.find("div.datagrid-body tr[node-id=\""+_6c+"\"]").children("td[field=\""+_6d.treeField+"\"]");
return _6f.find("span.tree-indent,span.tree-hit").length;
};
function _41(_70,_71){
var _72=$.data(_70,"treegrid").options;
var _73=$.data(_70,"treegrid").data;
var cc=[_73];
while(cc.length){
var c=cc.shift();
for(var i=0;i<c.length;i++){
var _74=c[i];
if(_74[_72.idField]==_71){
return _74;
}else{
if(_74["children"]){
cc.push(_74["children"]);
}
}
}
}
return null;
};
function _75(_76,_77){
var _78=$.data(_76,"treegrid").options;
var row=_41(_76,_77);
var tr=_78.finder.getTr(_76,_77);
var hit=tr.find("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
if(_78.onBeforeCollapse.call(_76,row)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
row.state="closed";
tr=tr.next("tr.treegrid-tr-tree");
var cc=tr.children("td").children("div");
if(_78.animate){
cc.slideUp("normal",function(){
$(_76).treegrid("autoSizeColumn");
_20(_76,_77);
_78.onCollapse.call(_76,row);
});
}else{
cc.hide();
$(_76).treegrid("autoSizeColumn");
_20(_76,_77);
_78.onCollapse.call(_76,row);
}
};
function _79(_7a,_7b){
var _7c=$.data(_7a,"treegrid").options;
var tr=_7c.finder.getTr(_7a,_7b);
var hit=tr.find("span.tree-hit");
var row=_41(_7a,_7b);
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
if(_7c.onBeforeExpand.call(_7a,row)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var _7d=tr.next("tr.treegrid-tr-tree");
if(_7d.length){
var cc=_7d.children("td").children("div");
_7e(cc);
}else{
_31(_7a,row[_7c.idField]);
var _7d=tr.next("tr.treegrid-tr-tree");
var cc=_7d.children("td").children("div");
cc.hide();
var _7f=$.extend({},_7c.queryParams||{});
_7f.id=row[_7c.idField];
_1f(_7a,row[_7c.idField],_7f,true,function(){
if(cc.is(":empty")){
_7d.remove();
}else{
_7e(cc);
}
});
}
function _7e(cc){
row.state="open";
if(_7c.animate){
cc.slideDown("normal",function(){
$(_7a).treegrid("autoSizeColumn");
_20(_7a,_7b);
_7c.onExpand.call(_7a,row);
});
}else{
cc.show();
$(_7a).treegrid("autoSizeColumn");
_20(_7a,_7b);
_7c.onExpand.call(_7a,row);
}
};
};
function _30(_80,_81){
var _82=$.data(_80,"treegrid").options;
var tr=_82.finder.getTr(_80,_81);
var hit=tr.find("span.tree-hit");
if(hit.hasClass("tree-expanded")){
_75(_80,_81);
}else{
_79(_80,_81);
}
};
function _83(_84,_85){
var _86=$.data(_84,"treegrid").options;
var _87=_25(_84,_85);
if(_85){
_87.unshift(_41(_84,_85));
}
for(var i=0;i<_87.length;i++){
_75(_84,_87[i][_86.idField]);
}
};
function _88(_89,_8a){
var _8b=$.data(_89,"treegrid").options;
var _8c=_25(_89,_8a);
if(_8a){
_8c.unshift(_41(_89,_8a));
}
for(var i=0;i<_8c.length;i++){
_79(_89,_8c[i][_8b.idField]);
}
};
function _8d(_8e,_8f){
var _90=$.data(_8e,"treegrid").options;
var ids=[];
var p=_56(_8e,_8f);
while(p){
var id=p[_90.idField];
ids.unshift(id);
p=_56(_8e,id);
}
for(var i=0;i<ids.length;i++){
_79(_8e,ids[i]);
}
};
function _91(_92,_93){
var _94=$.data(_92,"treegrid").options;
if(_93.parent){
var tr=_94.finder.getTr(_92,_93.parent);
if(tr.next("tr.treegrid-tr-tree").length==0){
_31(_92,_93.parent);
}
var _95=tr.children("td[field=\""+_94.treeField+"\"]").children("div.datagrid-cell");
var _96=_95.children("span.tree-icon");
if(_96.hasClass("tree-file")){
_96.removeClass("tree-file").addClass("tree-folder tree-folder-open");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_96);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_39(_92,_93.parent,_93.data,true);
};
function _97(_98,_99){
var ref=_99.before||_99.after;
var _9a=$.data(_98,"treegrid").options;
var _9b=_56(_98,ref);
_91(_98,{parent:(_9b?_9b[_9a.idField]:null),data:[_99.data]});
_9c(true);
_9c(false);
_29(_98);
function _9c(_9d){
var _9e=_9d?1:2;
var tr=_9a.finder.getTr(_98,_99.data[_9a.idField],"body",_9e);
var _9f=tr.closest("table.datagrid-btable");
tr=tr.parent().children();
var _a0=_9a.finder.getTr(_98,ref,"body",_9e);
if(_99.before){
tr.insertBefore(_a0);
}else{
var sub=_a0.next("tr.treegrid-tr-tree");
tr.insertAfter(sub.length?sub:_a0);
}
_9f.remove();
};
};
function _a1(_a2,_a3){
var _a4=$.data(_a2,"treegrid").options;
var tr=_a4.finder.getTr(_a2,_a3);
tr.next("tr.treegrid-tr-tree").remove();
tr.remove();
var _a5=del(_a3);
if(_a5){
if(_a5.children.length==0){
tr=_a4.finder.getTr(_a2,_a5[_a4.idField]);
tr.next("tr.treegrid-tr-tree").remove();
var _a6=tr.children("td[field=\""+_a4.treeField+"\"]").children("div.datagrid-cell");
_a6.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
_a6.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(_a6);
}
}
_29(_a2);
function del(id){
var cc;
var _a7=_56(_a2,_a3);
if(_a7){
cc=_a7.children;
}else{
cc=$(_a2).treegrid("getData");
}
for(var i=0;i<cc.length;i++){
if(cc[i][_a4.idField]==id){
cc.splice(i,1);
break;
}
}
return _a7;
};
};
$.fn.treegrid=function(_a8,_a9){
if(typeof _a8=="string"){
var _aa=$.fn.treegrid.methods[_a8];
if(_aa){
return _aa(this,_a9);
}else{
return this.datagrid(_a8,_a9);
}
}
_a8=_a8||{};
return this.each(function(){
var _ab=$.data(this,"treegrid");
if(_ab){
$.extend(_ab.options,_a8);
}else{
_ab=$.data(this,"treegrid",{options:$.extend({},$.fn.treegrid.defaults,$.fn.treegrid.parseOptions(this),_a8),data:[]});
}
_1(this);
if(_ab.options.data){
$(this).treegrid("loadData",_ab.options.data);
}
_1f(this);
_2c(this);
});
};
$.fn.treegrid.methods={options:function(jq){
return $.data(jq[0],"treegrid").options;
},resize:function(jq,_ac){
return jq.each(function(){
$(this).datagrid("resize",_ac);
});
},fixRowHeight:function(jq,_ad){
return jq.each(function(){
_20(this,_ad);
});
},loadData:function(jq,_ae){
return jq.each(function(){
_39(this,_ae.parent,_ae);
});
},load:function(jq,_af){
return jq.each(function(){
$(this).treegrid("options").pageNumber=1;
$(this).treegrid("getPager").pagination({pageNumber:1});
$(this).treegrid("reload",_af);
});
},reload:function(jq,id){
return jq.each(function(){
var _b0=$(this).treegrid("options");
var _b1={};
if(typeof id=="object"){
_b1=id;
}else{
_b1=$.extend({},_b0.queryParams);
_b1.id=id;
}
if(_b1.id){
var _b2=$(this).treegrid("find",_b1.id);
if(_b2.children){
_b2.children.splice(0,_b2.children.length);
}
_b0.queryParams=_b1;
var tr=_b0.finder.getTr(this,_b1.id);
tr.next("tr.treegrid-tr-tree").remove();
tr.find("span.tree-hit").removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_79(this,_b1.id);
}else{
_1f(this,null,_b1);
}
});
},reloadFooter:function(jq,_b3){
return jq.each(function(){
var _b4=$.data(this,"treegrid").options;
var dc=$.data(this,"datagrid").dc;
if(_b3){
$.data(this,"treegrid").footer=_b3;
}
if(_b4.showFooter){
_b4.view.renderFooter.call(_b4.view,this,dc.footer1,true);
_b4.view.renderFooter.call(_b4.view,this,dc.footer2,false);
if(_b4.view.onAfterRender){
_b4.view.onAfterRender.call(_b4.view,this);
}
$(this).treegrid("fixRowHeight");
}
});
},getData:function(jq){
return $.data(jq[0],"treegrid").data;
},getFooterRows:function(jq){
return $.data(jq[0],"treegrid").footer;
},getRoot:function(jq){
return _51(jq[0]);
},getRoots:function(jq){
return _54(jq[0]);
},getParent:function(jq,id){
return _56(jq[0],id);
},getChildren:function(jq,id){
return _25(jq[0],id);
},getSelected:function(jq){
return _63(jq[0]);
},getSelections:function(jq){
return _66(jq[0]);
},getLevel:function(jq,id){
return _6a(jq[0],id);
},find:function(jq,id){
return _41(jq[0],id);
},isLeaf:function(jq,id){
var _b5=$.data(jq[0],"treegrid").options;
var tr=_b5.finder.getTr(jq[0],id);
var hit=tr.find("span.tree-hit");
return hit.length==0;
},select:function(jq,id){
return jq.each(function(){
$(this).datagrid("selectRow",id);
});
},unselect:function(jq,id){
return jq.each(function(){
$(this).datagrid("unselectRow",id);
});
},collapse:function(jq,id){
return jq.each(function(){
_75(this,id);
});
},expand:function(jq,id){
return jq.each(function(){
_79(this,id);
});
},toggle:function(jq,id){
return jq.each(function(){
_30(this,id);
});
},collapseAll:function(jq,id){
return jq.each(function(){
_83(this,id);
});
},expandAll:function(jq,id){
return jq.each(function(){
_88(this,id);
});
},expandTo:function(jq,id){
return jq.each(function(){
_8d(this,id);
});
},append:function(jq,_b6){
return jq.each(function(){
_91(this,_b6);
});
},insert:function(jq,_b7){
return jq.each(function(){
_97(this,_b7);
});
},remove:function(jq,id){
return jq.each(function(){
_a1(this,id);
});
},pop:function(jq,id){
var row=jq.treegrid("find",id);
jq.treegrid("remove",id);
return row;
},refresh:function(jq,id){
return jq.each(function(){
var _b8=$.data(this,"treegrid").options;
_b8.view.refreshRow.call(_b8.view,this,id);
});
},update:function(jq,_b9){
return jq.each(function(){
var _ba=$.data(this,"treegrid").options;
_ba.view.updateRow.call(_ba.view,this,_b9.id,_b9.row);
});
},beginEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("beginEdit",id);
$(this).treegrid("fixRowHeight",id);
});
},endEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("endEdit",id);
});
},cancelEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("cancelEdit",id);
});
}};
$.fn.treegrid.parseOptions=function(_bb){
return $.extend({},$.fn.datagrid.parseOptions(_bb),$.parser.parseOptions(_bb,["treeField",{animate:"boolean"}]));
};
var _bc=$.extend({},$.fn.datagrid.defaults.view,{render:function(_bd,_be,_bf){
var _c0=$.data(_bd,"treegrid").options;
var _c1=$(_bd).datagrid("getColumnFields",_bf);
var _c2=$.data(_bd,"datagrid").rowIdPrefix;
if(_bf){
if(!(_c0.rownumbers||(_c0.frozenColumns&&_c0.frozenColumns.length))){
return;
}
}
var _c3=0;
var _c4=this;
var _c5=_c6(_bf,this.treeLevel,this.treeNodes);
$(_be).append(_c5.join(""));
function _c6(_c7,_c8,_c9){
var _ca=["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_c9.length;i++){
var row=_c9[i];
if(row.state!="open"&&row.state!="closed"){
row.state="open";
}
var css=_c0.rowStyler?_c0.rowStyler.call(_bd,row):"";
var _cb="";
var _cc="";
if(typeof css=="string"){
_cc=css;
}else{
if(css){
_cb=css["class"]||"";
_cc=css["style"]||"";
}
}
var cls="class=\"datagrid-row "+(_c3++%2&&_c0.striped?"datagrid-row-alt ":" ")+_cb+"\"";
var _cd=_cc?"style=\""+_cc+"\"":"";
var _ce=_c2+"-"+(_c7?1:2)+"-"+row[_c0.idField];
_ca.push("<tr id=\""+_ce+"\" node-id=\""+row[_c0.idField]+"\" "+cls+" "+_cd+">");
_ca=_ca.concat(_c4.renderRow.call(_c4,_bd,_c1,_c7,_c8,row));
_ca.push("</tr>");
if(row.children&&row.children.length){
var tt=_c6(_c7,_c8+1,row.children);
var v=row.state=="closed"?"none":"block";
_ca.push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+(_c1.length+(_c0.rownumbers?1:0))+"><div style=\"display:"+v+"\">");
_ca=_ca.concat(tt);
_ca.push("</div></td></tr>");
}
}
_ca.push("</tbody></table>");
return _ca;
};
},renderFooter:function(_cf,_d0,_d1){
var _d2=$.data(_cf,"treegrid").options;
var _d3=$.data(_cf,"treegrid").footer||[];
var _d4=$(_cf).datagrid("getColumnFields",_d1);
var _d5=["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_d3.length;i++){
var row=_d3[i];
row[_d2.idField]=row[_d2.idField]||("foot-row-id"+i);
_d5.push("<tr class=\"datagrid-row\" node-id=\""+row[_d2.idField]+"\">");
_d5.push(this.renderRow.call(this,_cf,_d4,_d1,0,row));
_d5.push("</tr>");
}
_d5.push("</tbody></table>");
$(_d0).html(_d5.join(""));
},renderRow:function(_d6,_d7,_d8,_d9,row){
var _da=$.data(_d6,"treegrid").options;
var cc=[];
if(_d8&&_da.rownumbers){
cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">0</div></td>");
}
for(var i=0;i<_d7.length;i++){
var _db=_d7[i];
var col=$(_d6).datagrid("getColumnOption",_db);
if(col){
var css=col.styler?(col.styler(row[_db],row)||""):"";
var _dc="";
var _dd="";
if(typeof css=="string"){
_dd=css;
}else{
if(cc){
_dc=css["class"]||"";
_dd=css["style"]||"";
}
}
var cls=_dc?"class=\""+_dc+"\"":"";
var _de=col.hidden?"style=\"display:none;"+_dd+"\"":(_dd?"style=\""+_dd+"\"":"");
cc.push("<td field=\""+_db+"\" "+cls+" "+_de+">");
if(col.checkbox){
var _de="";
}else{
var _de=_dd;
if(col.align){
_de+=";text-align:"+col.align+";";
}
if(!_da.nowrap){
_de+=";white-space:normal;height:auto;";
}else{
if(_da.autoRowHeight){
_de+=";height:auto;";
}
}
}
cc.push("<div style=\""+_de+"\" ");
if(col.checkbox){
cc.push("class=\"datagrid-cell-check ");
}else{
cc.push("class=\"datagrid-cell "+col.cellClass);
}
cc.push("\">");
if(col.checkbox){
if(row.checked){
cc.push("<input type=\"checkbox\" checked=\"checked\"");
}else{
cc.push("<input type=\"checkbox\"");
}
cc.push(" name=\""+_db+"\" value=\""+(row[_db]!=undefined?row[_db]:"")+"\"/>");
}else{
var val=null;
if(col.formatter){
val=col.formatter(row[_db],row);
}else{
val=row[_db];
}
if(_db==_da.treeField){
for(var j=0;j<_d9;j++){
cc.push("<span class=\"tree-indent\"></span>");
}
if(row.state=="closed"){
cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
cc.push("<span class=\"tree-icon tree-folder "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
if(row.children&&row.children.length){
cc.push("<span class=\"tree-hit tree-expanded\"></span>");
cc.push("<span class=\"tree-icon tree-folder tree-folder-open "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
cc.push("<span class=\"tree-indent\"></span>");
cc.push("<span class=\"tree-icon tree-file "+(row.iconCls?row.iconCls:"")+"\"></span>");
}
}
cc.push("<span class=\"tree-title\">"+val+"</span>");
}else{
cc.push(val);
}
}
cc.push("</div>");
cc.push("</td>");
}
}
return cc.join("");
},refreshRow:function(_df,id){
this.updateRow.call(this,_df,id,{});
},updateRow:function(_e0,id,row){
var _e1=$.data(_e0,"treegrid").options;
var _e2=$(_e0).treegrid("find",id);
$.extend(_e2,row);
var _e3=$(_e0).treegrid("getLevel",id)-1;
var _e4=_e1.rowStyler?_e1.rowStyler.call(_e0,_e2):"";
function _e5(_e6){
var _e7=$(_e0).treegrid("getColumnFields",_e6);
var tr=_e1.finder.getTr(_e0,id,"body",(_e6?1:2));
var _e8=tr.find("div.datagrid-cell-rownumber").html();
var _e9=tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
tr.html(this.renderRow(_e0,_e7,_e6,_e3,_e2));
tr.attr("style",_e4||"");
tr.find("div.datagrid-cell-rownumber").html(_e8);
if(_e9){
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
}
};
_e5.call(this,true);
_e5.call(this,false);
$(_e0).treegrid("fixRowHeight",id);
},onBeforeRender:function(_ea,_eb,_ec){
if($.isArray(_eb)){
_ec={total:_eb.length,rows:_eb};
_eb=null;
}
if(!_ec){
return false;
}
var _ed=$.data(_ea,"treegrid");
var _ee=_ed.options;
if(_ec.length==undefined){
if(_ec.footer){
_ed.footer=_ec.footer;
}
if(_ec.total){
_ed.total=_ec.total;
}
_ec=this.transfer(_ea,_eb,_ec.rows);
}else{
function _ef(_f0,_f1){
for(var i=0;i<_f0.length;i++){
var row=_f0[i];
row._parentId=_f1;
if(row.children&&row.children.length){
_ef(row.children,row[_ee.idField]);
}
}
};
_ef(_ec,_eb);
}
var _f2=_41(_ea,_eb);
if(_f2){
if(_f2.children){
_f2.children=_f2.children.concat(_ec);
}else{
_f2.children=_ec;
}
}else{
_ed.data=_ed.data.concat(_ec);
}
this.sort(_ea,_ec);
this.treeNodes=_ec;
this.treeLevel=$(_ea).treegrid("getLevel",_eb);
},sort:function(_f3,_f4){
var _f5=$.data(_f3,"treegrid").options;
if(!_f5.remoteSort&&_f5.sortName){
var _f6=_f5.sortName.split(",");
var _f7=_f5.sortOrder.split(",");
_f8(_f4);
}
function _f8(_f9){
_f9.sort(function(r1,r2){
var r=0;
for(var i=0;i<_f6.length;i++){
var sn=_f6[i];
var so=_f7[i];
var col=$(_f3).treegrid("getColumnOption",sn);
var _fa=col.sorter||function(a,b){
return a==b?0:(a>b?1:-1);
};
r=_fa(r1[sn],r2[sn])*(so=="asc"?1:-1);
if(r!=0){
return r;
}
}
return r;
});
for(var i=0;i<_f9.length;i++){
var _fb=_f9[i].children;
if(_fb&&_fb.length){
_f8(_fb);
}
}
};
},transfer:function(_fc,_fd,_fe){
var _ff=$.data(_fc,"treegrid").options;
var rows=[];
for(var i=0;i<_fe.length;i++){
rows.push(_fe[i]);
}
var _100=[];
for(var i=0;i<rows.length;i++){
var row=rows[i];
if(!_fd){
if(!row._parentId){
_100.push(row);
rows.splice(i,1);
i--;
}
}else{
if(row._parentId==_fd){
_100.push(row);
rows.splice(i,1);
i--;
}
}
}
var toDo=[];
for(var i=0;i<_100.length;i++){
toDo.push(_100[i]);
}
while(toDo.length){
var node=toDo.shift();
for(var i=0;i<rows.length;i++){
var row=rows[i];
if(row._parentId==node[_ff.idField]){
if(node.children){
node.children.push(row);
}else{
node.children=[row];
}
toDo.push(row);
rows.splice(i,1);
i--;
}
}
}
return _100;
}});
$.fn.treegrid.defaults=$.extend({},$.fn.datagrid.defaults,{treeField:null,animate:false,singleSelect:true,view:_bc,loader:function(_101,_102,_103){
var opts=$(this).treegrid("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_101,dataType:"json",success:function(data){
_102(data);
},error:function(){
_103.apply(this,arguments);
}});
},loadFilter:function(data,_104){
return data;
},finder:{getTr:function(_105,id,type,_106){
type=type||"body";
_106=_106||0;
var dc=$.data(_105,"datagrid").dc;
if(_106==0){
var opts=$.data(_105,"treegrid").options;
var tr1=opts.finder.getTr(_105,id,type,1);
var tr2=opts.finder.getTr(_105,id,type,2);
return tr1.add(tr2);
}else{
if(type=="body"){
var tr=$("#"+$.data(_105,"datagrid").rowIdPrefix+"-"+_106+"-"+id);
if(!tr.length){
tr=(_106==1?dc.body1:dc.body2).find("tr[node-id=\""+id+"\"]");
}
return tr;
}else{
if(type=="footer"){
return (_106==1?dc.footer1:dc.footer2).find("tr[node-id=\""+id+"\"]");
}else{
if(type=="selected"){
return (_106==1?dc.body1:dc.body2).find("tr.datagrid-row-selected");
}else{
if(type=="highlight"){
return (_106==1?dc.body1:dc.body2).find("tr.datagrid-row-over");
}else{
if(type=="checked"){
return (_106==1?dc.body1:dc.body2).find("tr.datagrid-row-checked");
}else{
if(type=="last"){
return (_106==1?dc.body1:dc.body2).find("tr:last[node-id]");
}else{
if(type=="allbody"){
return (_106==1?dc.body1:dc.body2).find("tr[node-id]");
}else{
if(type=="allfooter"){
return (_106==1?dc.footer1:dc.footer2).find("tr[node-id]");
}
}
}
}
}
}
}
}
}
},getRow:function(_107,p){
var id=(typeof p=="object")?p.attr("node-id"):p;
return $(_107).treegrid("find",id);
}},onBeforeLoad:function(row,_108){
},onLoadSuccess:function(row,data){
},onLoadError:function(){
},onBeforeCollapse:function(row){
},onCollapse:function(row){
},onBeforeExpand:function(row){
},onExpand:function(row){
},onClickRow:function(row){
},onDblClickRow:function(row){
},onClickCell:function(_109,row){
},onDblClickCell:function(_10a,row){
},onContextMenu:function(e,row){
},onBeforeEdit:function(row){
},onAfterEdit:function(row,_10b){
},onCancelEdit:function(row){
}});
})(jQuery);


/**
 * tabs - jQuery EasyUI
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 * Dependencies:
 * 	 panel
 *   linkbutton
 * 
 */
(function($){
	
	/**
	 * set the tabs scrollers to show or not,
	 * dependent on the tabs count and width
	 */
	function setScrollers(container) {
		var opts = $.data(container, 'tabs').options;
		if (opts.tabPosition == 'left' || opts.tabPosition == 'right' || !opts.showHeader){return}
		
		var header = $(container).children('div.tabs-header');
		var tool = header.children('div.tabs-tool');
		var sLeft = header.children('div.tabs-scroller-left');
		var sRight = header.children('div.tabs-scroller-right');
		var wrap = header.children('div.tabs-wrap');
		
		// set the tool height
		var tHeight = header.outerHeight();
		if (opts.plain){
			tHeight -= tHeight - header.height();
		}
		tool._outerHeight(tHeight);
		
		var tabsWidth = 0;
		$('ul.tabs li', header).each(function(){
			tabsWidth += $(this).outerWidth(true);
		});
		var cWidth = header.width() - tool._outerWidth();
		
		if (tabsWidth > cWidth) {
			sLeft.add(sRight).show()._outerHeight(tHeight);
			if (opts.toolPosition == 'left'){
				tool.css({
					left: sLeft.outerWidth(),
					right: ''
				});
				wrap.css({
					marginLeft: sLeft.outerWidth() + tool._outerWidth(),
					marginRight: sRight._outerWidth(),
					width: cWidth - sLeft.outerWidth() - sRight.outerWidth()
				});
			} else {
				tool.css({
					left: '',
					right: sRight.outerWidth()
				});
				wrap.css({
					marginLeft: sLeft.outerWidth(),
					marginRight: sRight.outerWidth() + tool._outerWidth(),
					width: cWidth - sLeft.outerWidth() - sRight.outerWidth()
				});
			}
		} else {
			sLeft.add(sRight).hide();
			if (opts.toolPosition == 'left'){
				tool.css({
					left: 0,
					right: ''
				});
				wrap.css({
					marginLeft: tool._outerWidth(),
					marginRight: 0,
					width: cWidth
				});
			} else {
				tool.css({
					left: '',
					right: 0
				});
				wrap.css({
					marginLeft: 0,
					marginRight: tool._outerWidth(),
					width: cWidth
				});
			}
		}
	}
	
	function addTools(container){
		var opts = $.data(container, 'tabs').options;
		var header = $(container).children('div.tabs-header');
		if (opts.tools) {
			if (typeof opts.tools == 'string'){
				$(opts.tools).addClass('tabs-tool').appendTo(header);
				$(opts.tools).show();
			} else {
				header.children('div.tabs-tool').remove();
				var tools = $('<div class="tabs-tool"><table cellspacing="0" cellpadding="0" style="height:100%"><tr></tr></table></div>').appendTo(header);
				var tr = tools.find('tr');
				for(var i=0; i<opts.tools.length; i++){
					var td = $('<td></td>').appendTo(tr);
					var tool = $('<a href="javascript:void(0);"></a>').appendTo(td);
					tool[0].onclick = eval(opts.tools[i].handler || function(){});
					tool.linkbutton($.extend({}, opts.tools[i], {
						plain: true
					}));
				}
			}
		} else {
			header.children('div.tabs-tool').remove();
		}
	}
	
	function setSize(container) {
		var state = $.data(container, 'tabs');
		var opts = state.options;
		var cc = $(container);
		
		opts.fit ? $.extend(opts, cc._fit()) : cc._fit(false);
		cc.width(opts.width).height(opts.height);
		
		var header = $(container).children('div.tabs-header');
		var panels = $(container).children('div.tabs-panels');
		var wrap = header.find('div.tabs-wrap');
		var ul = wrap.find('.tabs');
		
		for(var i=0; i<state.tabs.length; i++){
			var p_opts = state.tabs[i].panel('options');
			var p_t = p_opts.tab.find('a.tabs-inner');
			var width = parseInt(p_opts.tabWidth || opts.tabWidth) || undefined;
			if (width){
				p_t._outerWidth(width);
			} else {
				p_t.css('width', '');
			}
			p_t._outerHeight(opts.tabHeight);
			p_t.css('lineHeight', p_t.height()+'px');
		}
		if (opts.tabPosition == 'left' || opts.tabPosition == 'right'){
			header._outerWidth(opts.showHeader ? opts.headerWidth : 0);
			panels._outerWidth(cc.width() - header.outerWidth());
			header.add(panels)._outerHeight(opts.height);
			wrap._outerWidth(header.width());
			ul._outerWidth(wrap.width()).css('height','');
		} else {
			var lrt = header.children('div.tabs-scroller-left,div.tabs-scroller-right,div.tabs-tool');
			header._outerWidth(opts.width).css('height','');
			if (opts.showHeader){
				header.css('background-color','');
				wrap.css('height','');
				lrt.show();
			} else {
				header.css('background-color','transparent');
				header._outerHeight(0);
				wrap._outerHeight(0);
				lrt.hide();
			}
			ul._outerHeight(opts.tabHeight).css('width','');
			
			setScrollers(container);
			
			var height = opts.height;
			if (!isNaN(height)) {
				panels._outerHeight(height - header.outerHeight());
			} else {
				panels.height('auto');
			}
			var width = opts.width;
			if (!isNaN(width)){
				panels._outerWidth(width);
			} else {
				panels.width('auto');
			}
		}
	}
	
	/**
	 * set selected tab panel size
	 */
	function setSelectedSize(container){
		var opts = $.data(container, 'tabs').options;
		var tab = getSelectedTab(container);
		if (tab){
			var panels = $(container).children('div.tabs-panels');
			var width = opts.width=='auto' ? 'auto' : panels.width();
			var height = opts.height=='auto' ? 'auto' : panels.height();
			tab.panel('resize', {
				width: width,
				height: height
			});
		}
	}
	
	/**
	 * wrap the tabs header and body
	 */
	function wrapTabs(container) {
		var tabs = $.data(container, 'tabs').tabs;
		var cc = $(container);
		cc.addClass('tabs-container');
		var pp = $('<div class="tabs-panels"></div>').insertBefore(cc);
		cc.children('div').each(function(){
			pp[0].appendChild(this);
		});
		cc[0].appendChild(pp[0]);
//		cc.wrapInner('<div class="tabs-panels"/>');
		$('<div class="tabs-header">'
				+ '<div class="tabs-scroller-left"></div>'
				+ '<div class="tabs-scroller-right"></div>'
				+ '<div class="tabs-wrap">'
				+ '<ul class="tabs"></ul>'
				+ '</div>'
				+ '</div>').prependTo(container);
		
		cc.children('div.tabs-panels').children('div').each(function(i){
			var opts = $.extend({}, $.parser.parseOptions(this), {
				selected: ($(this).attr('selected') ? true : undefined)
			});
			var pp = $(this);
			tabs.push(pp);
			createTab(container, pp, opts);
		});
		
		cc.children('div.tabs-header').find('.tabs-scroller-left, .tabs-scroller-right').hover(
				function(){$(this).addClass('tabs-scroller-over');},
				function(){$(this).removeClass('tabs-scroller-over');}
		);
		cc.bind('_resize', function(e,force){
			var opts = $.data(container, 'tabs').options;
			if (opts.fit == true || force){
				setSize(container);
				setSelectedSize(container);
			}
			return false;
		});
	}
	
	function bindEvents(container){
		var state = $.data(container, 'tabs')
		var opts = state.options;
		$(container).children('div.tabs-header').unbind().bind('click', function(e){
			if ($(e.target).hasClass('tabs-scroller-left')){
				$(container).tabs('scrollBy', -opts.scrollIncrement);
			} else if ($(e.target).hasClass('tabs-scroller-right')){
				$(container).tabs('scrollBy', opts.scrollIncrement);
			} else {
				var li = $(e.target).closest('li');
				if (li.hasClass('tabs-disabled')){return;}
				var a = $(e.target).closest('a.tabs-close');
				if (a.length){
					closeTab(container, getLiIndex(li));
				} else if (li.length){
//					selectTab(container, getLiIndex(li));
					var index = getLiIndex(li);
					var popts = state.tabs[index].panel('options');
					if (popts.collapsible){
						popts.closed ? selectTab(container, index) : unselectTab(container, index);
					} else {
						selectTab(container, index);
					}
				}
			}
		}).bind('contextmenu', function(e){
			var li = $(e.target).closest('li');
			if (li.hasClass('tabs-disabled')){return;}
			if (li.length){
				opts.onContextMenu.call(container, e, li.find('span.tabs-title').html(), getLiIndex(li));
			}
		});
		
		function getLiIndex(li){
			var index = 0;
			li.parent().children('li').each(function(i){
				if (li[0] == this){
					index = i;
					return false;
				}
			});
			return index;
		}
	}
	
	function setProperties(container){
		var opts = $.data(container, 'tabs').options;
		var header = $(container).children('div.tabs-header');
		var panels = $(container).children('div.tabs-panels');
		
		header.removeClass('tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right');
		panels.removeClass('tabs-panels-top tabs-panels-bottom tabs-panels-left tabs-panels-right');
		if (opts.tabPosition == 'top'){
			header.insertBefore(panels);
		} else if (opts.tabPosition == 'bottom'){
			header.insertAfter(panels);
			header.addClass('tabs-header-bottom');
			panels.addClass('tabs-panels-top');
		} else if (opts.tabPosition == 'left'){
			header.addClass('tabs-header-left');
			panels.addClass('tabs-panels-right');
		} else if (opts.tabPosition == 'right'){
			header.addClass('tabs-header-right');
			panels.addClass('tabs-panels-left');
		}
		
		if (opts.plain == true) {
			header.addClass('tabs-header-plain');
		} else {
			header.removeClass('tabs-header-plain');
		}
		if (opts.border == true){
			header.removeClass('tabs-header-noborder');
			panels.removeClass('tabs-panels-noborder');
		} else {
			header.addClass('tabs-header-noborder');
			panels.addClass('tabs-panels-noborder');
		}
	}
	
	function createTab(container, pp, options) {
		var state = $.data(container, 'tabs');
		options = options || {};
		
		// create panel
		pp.panel($.extend({}, options, {
			border: false,
			noheader: true,
			closed: true,
			doSize: false,
			iconCls: (options.icon ? options.icon : undefined),
			onLoad: function(){
				if (options.onLoad){
					options.onLoad.call(this, arguments);
				}
				state.options.onLoad.call(container, $(this));
			}
		}));
		
		var opts = pp.panel('options');
		
		var tabs = $(container).children('div.tabs-header').find('ul.tabs');
		
		opts.tab = $('<li></li>').appendTo(tabs);	// set the tab object in panel options
		opts.tab.append(
				'<a href="javascript:void(0)" class="tabs-inner">' +
				'<span class="tabs-title"></span>' +
				'<span class="tabs-icon"></span>' +
				'</a>'
		);
		
		$(container).tabs('update', {
			tab: pp,
			options: opts
		});
	}
	
	function addTab(container, options) {
		var opts = $.data(container, 'tabs').options;
		var tabs = $.data(container, 'tabs').tabs;
		if (options.selected == undefined) options.selected = true;
		
		var pp = $('<div></div>').appendTo($(container).children('div.tabs-panels'));
		tabs.push(pp);
		createTab(container, pp, options);
		
		opts.onAdd.call(container, options.title, tabs.length-1);
		
//		setScrollers(container);
		setSize(container);
		if (options.selected){
			selectTab(container, tabs.length-1);	// select the added tab panel
		}
	}
	
	/**
	 * update tab panel, param has following properties:
	 * tab: the tab panel to be updated
	 * options: the tab panel options
	 */
	function updateTab(container, param){
		var selectHis = $.data(container, 'tabs').selectHis;
		var pp = param.tab;	// the tab panel
		var oldTitle = pp.panel('options').title; 
		pp.panel($.extend({}, param.options, {
			iconCls: (param.options.icon ? param.options.icon : undefined)
		}));
		
		var opts = pp.panel('options');	// get the tab panel options
		var tab = opts.tab;
		
		var s_title = tab.find('span.tabs-title');
		var s_icon = tab.find('span.tabs-icon');
		s_title.html(opts.title);
		s_icon.attr('class', 'tabs-icon');
		
		tab.find('a.tabs-close').remove();
		if (opts.closable){
			s_title.addClass('tabs-closable');
			$('<a href="javascript:void(0)" class="tabs-close"></a>').appendTo(tab);
		} else{
			s_title.removeClass('tabs-closable');
		}
		if (opts.iconCls){
			s_title.addClass('tabs-with-icon');
			s_icon.addClass(opts.iconCls);
		} else {
			s_title.removeClass('tabs-with-icon');
		}
		
		if (oldTitle != opts.title){
			for(var i=0; i<selectHis.length; i++){
				if (selectHis[i] == oldTitle){
					selectHis[i] = opts.title;
				}
			}
		}
		
		tab.find('span.tabs-p-tool').remove();
		if (opts.tools){
			var p_tool = $('<span class="tabs-p-tool"></span>').insertAfter(tab.find('a.tabs-inner'));
			if ($.isArray(opts.tools)){
				for(var i=0; i<opts.tools.length; i++){
					var t = $('<a href="javascript:void(0)"></a>').appendTo(p_tool);
					t.addClass(opts.tools[i].iconCls);
					if (opts.tools[i].handler){
						t.bind('click', {handler:opts.tools[i].handler}, function(e){
							if ($(this).parents('li').hasClass('tabs-disabled')){return;}
							e.data.handler.call(this);
						});
					}
				}
			} else {
				$(opts.tools).children().appendTo(p_tool);
			}
			var pr = p_tool.children().length * 12;
			if (opts.closable) {
				pr += 8;
			} else {
				pr -= 3;
				p_tool.css('right','5px');
			}
			s_title.css('padding-right', pr+'px');
		}
		
//		setProperties(container);
//		setScrollers(container);
		setSize(container);
		
		$.data(container, 'tabs').options.onUpdate.call(container, opts.title, getTabIndex(container, pp));
	}
	
	/**
	 * close a tab with specified index or title
	 */
	function closeTab(container, which) {
		var opts = $.data(container, 'tabs').options;
		var tabs = $.data(container, 'tabs').tabs;
		var selectHis = $.data(container, 'tabs').selectHis;
		
		if (!exists(container, which)) return;
		
		var tab = getTab(container, which);
		var title = tab.panel('options').title;
		var index = getTabIndex(container, tab);
		
		if (opts.onBeforeClose.call(container, title, index) == false) return;
		
		var tab = getTab(container, which, true);
		tab.panel('options').tab.remove();
		tab.panel('destroy');
		
		opts.onClose.call(container, title, index);
		
//		setScrollers(container);
		setSize(container);
		
		// remove the select history item
		for(var i=0; i<selectHis.length; i++){
			if (selectHis[i] == title){
				selectHis.splice(i, 1);
				i --;
			}
		}
		
		// select the nearest tab panel
		var hisTitle = selectHis.pop();
		if (hisTitle){
			selectTab(container, hisTitle);
		} else if (tabs.length){
			selectTab(container, 0);
		}
	}
	
	/**
	 * get the specified tab panel
	 */
	function getTab(container, which, removeit){
		var tabs = $.data(container, 'tabs').tabs;
		if (typeof which == 'number'){
			if (which < 0 || which >= tabs.length){
				return null;
			} else {
				var tab = tabs[which];
				if (removeit) {
					tabs.splice(which, 1);
				}
				return tab;
			}
		}
		for(var i=0; i<tabs.length; i++){
			var tab = tabs[i];
			if (tab.panel('options').title == which){
				if (removeit){
					tabs.splice(i, 1);
				}
				return tab;
			}
		}
		return null;
	}
	
	function getTabIndex(container, tab){
		var tabs = $.data(container, 'tabs').tabs;
		for(var i=0; i<tabs.length; i++){
			if (tabs[i][0] == $(tab)[0]){
				return i;
			}
		}
		return -1;
	}
	
	function getSelectedTab(container){
		var tabs = $.data(container, 'tabs').tabs;
		for(var i=0; i<tabs.length; i++){
			var tab = tabs[i];
			if (tab.panel('options').closed == false){
				return tab;
			}
		}
		return null;
	}
	
	/**
	 * do first select action, if no tab is setted the first tab will be selected.
	 */
	function doFirstSelect(container){
		var state = $.data(container, 'tabs')
		var tabs = state.tabs;
		for(var i=0; i<tabs.length; i++){
			if (tabs[i].panel('options').selected){
				selectTab(container, i);
				return;
			}
		}
//		if (tabs.length){
//			selectTab(container, 0);
//		}
		selectTab(container, state.options.selected);
	}
	
	function selectTab(container, which){
		var state = $.data(container, 'tabs');
		var opts = state.options;
		var tabs = state.tabs;
		var selectHis = state.selectHis;
		
		if (tabs.length == 0) {return;}
		
		var panel = getTab(container, which); // get the panel to be activated
		if (!panel){return}
		
		var selected = getSelectedTab(container);
		if (selected){
			if (panel[0] == selected[0]){return}
			unselectTab(container, getTabIndex(container, selected));
			if (!selected.panel('options').closed){return}
		}
		
		panel.panel('open');
		var title = panel.panel('options').title;	// the panel title
		selectHis.push(title);	// push select history
		
		var tab = panel.panel('options').tab;	// get the tab object
		tab.addClass('tabs-selected');
		
		// scroll the tab to center position if required.
		var wrap = $(container).find('>div.tabs-header>div.tabs-wrap');
		var left = tab.position().left;
		var right = left + tab.outerWidth();
		if (left < 0 || right > wrap.width()){
			var deltaX = left - (wrap.width()-tab.width()) / 2;
			$(container).tabs('scrollBy', deltaX);
		} else {
			$(container).tabs('scrollBy', 0);
		}
		
		setSelectedSize(container);
		
		opts.onSelect.call(container, title, getTabIndex(container, panel));
	}
	
	function unselectTab(container, which){
		var state = $.data(container, 'tabs');
		var p = getTab(container, which);
		if (p){
			var opts = p.panel('options');
			if (!opts.closed){
				p.panel('close');
				if (opts.closed){
					opts.tab.removeClass('tabs-selected');
					state.options.onUnselect.call(container, opts.title, getTabIndex(container, p));
				}
			}
		}
	}
	
	function exists(container, which){
		return getTab(container, which) != null;
	}
	
	function showHeader(container, visible){
		var opts = $.data(container, 'tabs').options;
		opts.showHeader = visible;
		$(container).tabs('resize');
	}
	
	
	$.fn.tabs = function(options, param){
		if (typeof options == 'string') {
			return $.fn.tabs.methods[options](this, param);
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'tabs');
			var opts;
			if (state) {
				opts = $.extend(state.options, options);
				state.options = opts;
			} else {
				$.data(this, 'tabs', {
					options: $.extend({},$.fn.tabs.defaults, $.fn.tabs.parseOptions(this), options),
					tabs: [],
					selectHis: []
				});
				wrapTabs(this);
			}
			
			addTools(this);
			setProperties(this);
			setSize(this);
			bindEvents(this);
			
			doFirstSelect(this);
		});
	};
	
	$.fn.tabs.methods = {
		options: function(jq){
			var cc = jq[0];
			var opts = $.data(cc, 'tabs').options;
			var s = getSelectedTab(cc);
			opts.selected = s ? getTabIndex(cc, s) : 0;
			return opts;
		},
		tabs: function(jq){
			return $.data(jq[0], 'tabs').tabs;
		},
		resize: function(jq){
			return jq.each(function(){
				setSize(this);
				setSelectedSize(this);
			});
		},
		add: function(jq, options){
			return jq.each(function(){
				addTab(this, options);
			});
		},
		close: function(jq, which){
			return jq.each(function(){
				closeTab(this, which);
			});
		},
		getTab: function(jq, which){
			return getTab(jq[0], which);
		},
		getTabIndex: function(jq, tab){
			return getTabIndex(jq[0], tab);
		},
		getSelected: function(jq){
			return getSelectedTab(jq[0]);
		},
		select: function(jq, which){
			return jq.each(function(){
				selectTab(this, which);
			});
		},
		unselect: function(jq, which){
			return jq.each(function(){
				unselectTab(this, which);
			});
		},
		exists: function(jq, which){
			return exists(jq[0], which);
		},
		update: function(jq, options){
			return jq.each(function(){
				updateTab(this, options);
			});
		},
		enableTab: function(jq, which){
			return jq.each(function(){
				$(this).tabs('getTab', which).panel('options').tab.removeClass('tabs-disabled');
			});
		},
		disableTab: function(jq, which){
			return jq.each(function(){
				$(this).tabs('getTab', which).panel('options').tab.addClass('tabs-disabled');
			});
		},
		showHeader: function(jq){
			return jq.each(function(){
				showHeader(this, true);
			});
		},
		hideHeader: function(jq){
			return jq.each(function(){
				showHeader(this, false);
			});
		},
		scrollBy: function(jq, deltaX){	// scroll the tab header by the specified amount of pixels
			return jq.each(function(){
				var opts = $(this).tabs('options');
				var wrap = $(this).find('>div.tabs-header>div.tabs-wrap');
				var pos = Math.min(wrap._scrollLeft() + deltaX, getMaxScrollWidth());
				wrap.animate({scrollLeft: pos}, opts.scrollDuration);
				
				function getMaxScrollWidth(){
					var w = 0;
					var ul = wrap.children('ul');
					ul.children('li').each(function(){
						w += $(this).outerWidth(true);
					});
					return w - wrap.width() + (ul.outerWidth() - ul.width());
				}
			});
		}
	};
	
	$.fn.tabs.parseOptions = function(target){
		return $.extend({}, $.parser.parseOptions(target, [
			'width','height','tools','toolPosition','tabPosition',
			{fit:'boolean',border:'boolean',plain:'boolean',headerWidth:'number',tabWidth:'number',tabHeight:'number',selected:'number',showHeader:'boolean'}
		]));
	};
	
	$.fn.tabs.defaults = {
		width: 'auto',
		height: 'auto',
		headerWidth: 150,	// the tab header width, it is valid only when tabPosition set to 'left' or 'right' 
		tabWidth: 'auto',	// the tab width
		tabHeight: 27,		// the tab height
		selected: 0,		// the initialized selected tab index
		showHeader: true,
		plain: false,
		fit: false,
		border: true,
		tools: null,
		toolPosition: 'right',	// left,right
		tabPosition: 'top',		// possible values: top,bottom
		scrollIncrement: 100,
		scrollDuration: 400,
		onLoad: function(panel){},
		onSelect: function(title, index){},
		onUnselect: function(title, index){},
		onBeforeClose: function(title, index){},
		onClose: function(title, index){},
		onAdd: function(title, index){},
		onUpdate: function(title, index){},
		onContextMenu: function(e, title, index){}
	};
})(jQuery);

/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"accordion");
var _4=_3.options;
var _5=_3.panels;
var cc=$(_2);
_4.fit?$.extend(_4,cc._fit()):cc._fit(false);
if(!isNaN(_4.width)){
cc._outerWidth(_4.width);
}else{
cc.css("width","");
}
var _6=0;
var _7="auto";
var _8=cc.find(">div.panel>div.accordion-header");
if(_8.length){
_6=$(_8[0]).css("height","")._outerHeight();
}
if(!isNaN(_4.height)){
cc._outerHeight(_4.height);
_7=cc.height()-_6*_8.length;
}else{
cc.css("height","");
}
_9(true,_7-_9(false)+1);
function _9(_a,_b){
var _c=0;
for(var i=0;i<_5.length;i++){
var p=_5[i];
var h=p.panel("header")._outerHeight(_6);
if(p.panel("options").collapsible==_a){
var _d=isNaN(_b)?undefined:(_b+_6*h.length);
p.panel("resize",{width:cc.width(),height:(_a?_d:undefined)});
_c+=p.panel("panel").outerHeight()-_6;
}
}
return _c;
};
};
function _e(_f,_10,_11,all){
var _12=$.data(_f,"accordion").panels;
var pp=[];
for(var i=0;i<_12.length;i++){
var p=_12[i];
if(_10){
if(p.panel("options")[_10]==_11){
pp.push(p);
}
}else{
if(p[0]==$(_11)[0]){
return i;
}
}
}
if(_10){
return all?pp:(pp.length?pp[0]:null);
}else{
return -1;
}
};
function _13(_14){
return _e(_14,"collapsed",false,true);
};
function _15(_16){
var pp=_13(_16);
return pp.length?pp[0]:null;
};
function _17(_18,_19){
return _e(_18,null,_19);
};
function _1a(_1b,_1c){
var _1d=$.data(_1b,"accordion").panels;
if(typeof _1c=="number"){
if(_1c<0||_1c>=_1d.length){
return null;
}else{
return _1d[_1c];
}
}
return _e(_1b,"title",_1c);
};
function _1e(_1f){
var _20=$.data(_1f,"accordion").options;
var cc=$(_1f);
if(_20.border){
cc.removeClass("accordion-noborder");
}else{
cc.addClass("accordion-noborder");
}
};
function _21(_22){
var _23=$.data(_22,"accordion");
var cc=$(_22);
cc.addClass("accordion");
_23.panels=[];
cc.children("div").each(function(){
var _24=$.extend({},$.parser.parseOptions(this),{selected:($(this).attr("selected")?true:undefined)});
var pp=$(this);
_23.panels.push(pp);
_27(_22,pp,_24);
});
cc.bind("_resize",function(e,_25){
var _26=$.data(_22,"accordion").options;
if(_26.fit==true||_25){
_1(_22);
}
return false;
});
};
function _27(_28,pp,_29){
var _2a=$.data(_28,"accordion").options;
pp.panel($.extend({},{collapsible:true,minimizable:false,maximizable:false,closable:false,doSize:false,collapsed:true,headerCls:"accordion-header",bodyCls:"accordion-body"},_29,{onBeforeExpand:function(){
if(_29.onBeforeExpand){
if(_29.onBeforeExpand.call(this)==false){
return false;
}
}
if(!_2a.multiple){
var all=$.grep(_13(_28),function(p){
return p.panel("options").collapsible;
});
for(var i=0;i<all.length;i++){
_35(_28,_17(_28,all[i]));
}
}
var _2b=$(this).panel("header");
_2b.addClass("accordion-header-selected");
_2b.find(".accordion-collapse").removeClass("accordion-expand");
},onExpand:function(){
if(_29.onExpand){
_29.onExpand.call(this);
}
_2a.onSelect.call(_28,$(this).panel("options").title,_17(_28,this));
},onBeforeCollapse:function(){
if(_29.onBeforeCollapse){
if(_29.onBeforeCollapse.call(this)==false){
return false;
}
}
var _2c=$(this).panel("header");
_2c.removeClass("accordion-header-selected");
_2c.find(".accordion-collapse").addClass("accordion-expand");
},onCollapse:function(){
if(_29.onCollapse){
_29.onCollapse.call(this);
}
_2a.onUnselect.call(_28,$(this).panel("options").title,_17(_28,this));
}}));
var _2d=pp.panel("header");
var _2e=_2d.children("div.panel-tool");
_2e.children("a.panel-tool-collapse").hide();
var t=$("<a href=\"javascript:void(0)\"></a>").addClass("accordion-collapse accordion-expand").appendTo(_2e);
t.bind("click",function(){
var _2f=_17(_28,pp);
if(pp.panel("options").collapsed){
_30(_28,_2f);
}else{
_35(_28,_2f);
}
return false;
});
pp.panel("options").collapsible?t.show():t.hide();
_2d.click(function(){
$(this).find("a.accordion-collapse:visible").triggerHandler("click");
return false;
});
};
function _30(_31,_32){
var p=_1a(_31,_32);
if(!p){
return;
}
_33(_31);
var _34=$.data(_31,"accordion").options;
p.panel("expand",_34.animate);
};
function _35(_36,_37){
var p=_1a(_36,_37);
if(!p){
return;
}
_33(_36);
var _38=$.data(_36,"accordion").options;
p.panel("collapse",_38.animate);
};
function _39(_3a){
var _3b=$.data(_3a,"accordion").options;
var p=_e(_3a,"selected",true);
if(p){
_3c(_17(_3a,p));
}else{
_3c(_3b.selected);
}
function _3c(_3d){
var _3e=_3b.animate;
_3b.animate=false;
_30(_3a,_3d);
_3b.animate=_3e;
};
};
function _33(_3f){
var _40=$.data(_3f,"accordion").panels;
for(var i=0;i<_40.length;i++){
_40[i].stop(true,true);
}
};
function add(_41,_42){
var _43=$.data(_41,"accordion");
var _44=_43.options;
var _45=_43.panels;
if(_42.selected==undefined){
_42.selected=true;
}
_33(_41);
var pp=$("<div></div>").appendTo(_41);
_45.push(pp);
_27(_41,pp,_42);
_1(_41);
_44.onAdd.call(_41,_42.title,_45.length-1);
if(_42.selected){
_30(_41,_45.length-1);
}
};
function _46(_47,_48){
var _49=$.data(_47,"accordion");
var _4a=_49.options;
var _4b=_49.panels;
_33(_47);
var _4c=_1a(_47,_48);
var _4d=_4c.panel("options").title;
var _4e=_17(_47,_4c);
if(!_4c){
return;
}
if(_4a.onBeforeRemove.call(_47,_4d,_4e)==false){
return;
}
_4b.splice(_4e,1);
_4c.panel("destroy");
if(_4b.length){
_1(_47);
var _4f=_15(_47);
if(!_4f){
_30(_47,0);
}
}
_4a.onRemove.call(_47,_4d,_4e);
};
$.fn.accordion=function(_50,_51){
if(typeof _50=="string"){
return $.fn.accordion.methods[_50](this,_51);
}
_50=_50||{};
return this.each(function(){
var _52=$.data(this,"accordion");
if(_52){
$.extend(_52.options,_50);
}else{
$.data(this,"accordion",{options:$.extend({},$.fn.accordion.defaults,$.fn.accordion.parseOptions(this),_50),accordion:$(this).addClass("accordion"),panels:[]});
_21(this);
}
_1e(this);
_1(this);
_39(this);
});
};
$.fn.accordion.methods={options:function(jq){
return $.data(jq[0],"accordion").options;
},panels:function(jq){
return $.data(jq[0],"accordion").panels;
},resize:function(jq){
return jq.each(function(){
_1(this);
});
},getSelections:function(jq){
return _13(jq[0]);
},getSelected:function(jq){
return _15(jq[0]);
},getPanel:function(jq,_53){
return _1a(jq[0],_53);
},getPanelIndex:function(jq,_54){
return _17(jq[0],_54);
},select:function(jq,_55){
return jq.each(function(){
_30(this,_55);
});
},unselect:function(jq,_56){
return jq.each(function(){
_35(this,_56);
});
},add:function(jq,_57){
return jq.each(function(){
add(this,_57);
});
},remove:function(jq,_58){
return jq.each(function(){
_46(this,_58);
});
}};
$.fn.accordion.parseOptions=function(_59){
var t=$(_59);
return $.extend({},$.parser.parseOptions(_59,["width","height",{fit:"boolean",border:"boolean",animate:"boolean",multiple:"boolean",selected:"number"}]));
};
$.fn.accordion.defaults={width:"auto",height:"auto",fit:false,border:true,animate:true,multiple:false,selected:0,onSelect:function(_5a,_5b){
},onUnselect:function(_5c,_5d){
},onAdd:function(_5e,_5f){
},onBeforeRemove:function(_60,_61){
},onRemove:function(_62,_63){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(el,_2,_3,_4){
var _5=$(el).window("window");
if(!_5){
return;
}
switch(_2){
case null:
_5.show();
break;
case "slide":
_5.slideDown(_3);
break;
case "fade":
_5.fadeIn(_3);
break;
case "show":
_5.show(_3);
break;
}
var _6=null;
if(_4>0){
_6=setTimeout(function(){
_7(el,_2,_3);
},_4);
}
_5.hover(function(){
if(_6){
clearTimeout(_6);
}
},function(){
if(_4>0){
_6=setTimeout(function(){
_7(el,_2,_3);
},_4);
}
});
};
function _7(el,_8,_9){
if(el.locked==true){
return;
}
el.locked=true;
var _a=$(el).window("window");
if(!_a){
return;
}
switch(_8){
case null:
_a.hide();
break;
case "slide":
_a.slideUp(_9);
break;
case "fade":
_a.fadeOut(_9);
break;
case "show":
_a.hide(_9);
break;
}
setTimeout(function(){
$(el).window("destroy");
},_9);
};
function _b(_c){
var _d=$.extend({},$.fn.window.defaults,{collapsible:false,minimizable:false,maximizable:false,shadow:false,draggable:false,resizable:false,closed:true,style:{left:"",top:"",right:0,zIndex:$.fn.window.defaults.zIndex++,bottom:-document.body.scrollTop-document.documentElement.scrollTop},onBeforeOpen:function(){
_1(this,_d.showType,_d.showSpeed,_d.timeout);
return false;
},onBeforeClose:function(){
_7(this,_d.showType,_d.showSpeed);
return false;
}},{title:"",width:250,height:100,showType:"slide",showSpeed:600,msg:"",timeout:4000},_c);
_d.style.zIndex=$.fn.window.defaults.zIndex++;
var _e=$("<div class=\"messager-body\"></div>").html(_d.msg).appendTo("body");
_e.window(_d);
_e.window("window").css(_d.style);
_e.window("open");
return _e;
};
function _f(_10,_11,_12){
var win=$("<div class=\"messager-body\"></div>").appendTo("body");
win.append(_11);
if(_12){
var tb=$("<div class=\"messager-button\"></div>").appendTo(win);
for(var _13 in _12){
$("<a></a>").attr("href","javascript:void(0)").text(_13).css("margin-left",10).bind("click",eval(_12[_13])).appendTo(tb).linkbutton();
}
}
win.window({title:_10,noheader:(_10?false:true),width:300,height:"auto",modal:true,collapsible:false,minimizable:false,maximizable:false,resizable:false,onClose:function(){
setTimeout(function(){
win.window("destroy");
},100);
}});
win.window("window").addClass("messager-window");
win.children("div.messager-button").children("a:first").focus();
return win;
};
$.messager={show:function(_14){
return _b(_14);
},alert:function(_15,msg,_16,fn){
var _17="<div>"+msg+"</div>";
switch(_16){
case "error":
_17="<div class=\"messager-icon messager-error\"></div>"+_17;
break;
case "info":
_17="<div class=\"messager-icon messager-info\"></div>"+_17;
break;
case "question":
_17="<div class=\"messager-icon messager-question\"></div>"+_17;
break;
case "warning":
_17="<div class=\"messager-icon messager-warning\"></div>"+_17;
break;
}
_17+="<div style=\"clear:both;\"/>";
var _18={};
_18[$.messager.defaults.ok]=function(){
win.window("close");
if(fn){
fn();
return false;
}
};
var win=_f(_15,_17,_18);
return win;
},confirm:function(_19,msg,fn){
var _1a="<div class=\"messager-icon messager-question\"></div>"+"<div>"+msg+"</div>"+"<div style=\"clear:both;\"/>";
var _1b={};
_1b[$.messager.defaults.ok]=function(){
win.window("close");
if(fn){
fn(true);
return false;
}
};
_1b[$.messager.defaults.cancel]=function(){
win.window("close");
if(fn){
fn(false);
return false;
}
};
var win=_f(_19,_1a,_1b);
return win;
},prompt:function(_1c,msg,fn){
var _1d="<div class=\"messager-icon messager-question\"></div>"+"<div>"+msg+"</div>"+"<br/>"+"<div style=\"clear:both;\"/>"+"<div><input class=\"messager-input\" type=\"text\"/></div>";
var _1e={};
_1e[$.messager.defaults.ok]=function(){
win.window("close");
if(fn){
fn($(".messager-input",win).val());
return false;
}
};
_1e[$.messager.defaults.cancel]=function(){
win.window("close");
if(fn){
fn();
return false;
}
};
var win=_f(_1c,_1d,_1e);
win.children("input.messager-input").focus();
return win;
},progress:function(_1f){
var _20={bar:function(){
return $("body>div.messager-window").find("div.messager-p-bar");
},close:function(){
var win=$("body>div.messager-window>div.messager-body:has(div.messager-progress)");
if(win.length){
win.window("close");
}
}};
if(typeof _1f=="string"){
var _21=_20[_1f];
return _21();
}
var _22=$.extend({title:"",msg:"",text:undefined,interval:300},_1f||{});
var _23="<div class=\"messager-progress\"><div class=\"messager-p-msg\"></div><div class=\"messager-p-bar\"></div></div>";
var win=_f(_22.title,_23,null);
win.find("div.messager-p-msg").html(_22.msg);
var bar=win.find("div.messager-p-bar");
bar.progressbar({text:_22.text});
win.window({closable:false,onClose:function(){
if(this.timer){
clearInterval(this.timer);
}
$(this).window("destroy");
}});
if(_22.interval){
win[0].timer=setInterval(function(){
var v=bar.progressbar("getValue");
v+=10;
if(v>100){
v=0;
}
bar.progressbar("setValue",v);
},_22.interval);
}
return win;
}};
$.messager.defaults={ok:"Ok",cancel:"Cancel"};
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2,_3){
var _4=$.data(_2,"window").options;
if(_3){
$.extend(_4,_3);
}
$(_2).panel("resize",_4);
};
function _5(_6,_7){
var _8=$.data(_6,"window");
if(_7){
if(_7.left!=null){
_8.options.left=_7.left;
}
if(_7.top!=null){
_8.options.top=_7.top;
}
}
$(_6).panel("move",_8.options);
if(_8.shadow){
_8.shadow.css({left:_8.options.left,top:_8.options.top});
}
};
function _9(_a,_b){
var _c=$.data(_a,"window");
var _d=_c.options;
var _e=_d.width;
if(isNaN(_e)){
_e=_c.window._outerWidth();
}
if(_d.inline){
var _f=_c.window.parent();
_d.left=(_f.width()-_e)/2+_f.scrollLeft();
}else{
_d.left=($(window)._outerWidth()-_e)/2+$(document).scrollLeft();
}
if(_b){
_5(_a);
}
};
function _10(_11,_12){
var _13=$.data(_11,"window");
var _14=_13.options;
var _15=_14.height;
if(isNaN(_15)){
_15=_13.window._outerHeight();
}
if(_14.inline){
var _16=_13.window.parent();
_14.top=(_16.height()-_15)/2+_16.scrollTop();
}else{
_14.top=($(window)._outerHeight()-_15)/2+$(document).scrollTop();
}
if(_12){
_5(_11);
}
};
function _17(_18){
var _19=$.data(_18,"window");
var win=$(_18).panel($.extend({},_19.options,{border:false,doSize:true,closed:true,cls:"window",headerCls:"window-header",bodyCls:"window-body "+(_19.options.noheader?"window-body-noheader":""),onBeforeDestroy:function(){
if(_19.options.onBeforeDestroy.call(_18)==false){
return false;
}
if(_19.shadow){
_19.shadow.remove();
}
if(_19.mask){
_19.mask.remove();
}
},onClose:function(){
if(_19.shadow){
_19.shadow.hide();
}
if(_19.mask){
_19.mask.hide();
}
_19.options.onClose.call(_18);
},onOpen:function(){
if(_19.mask){
_19.mask.css({display:"block",zIndex:$.fn.window.defaults.zIndex++});
}
if(_19.shadow){
_19.shadow.css({display:"block",zIndex:$.fn.window.defaults.zIndex++,left:_19.options.left,top:_19.options.top,width:_19.window._outerWidth(),height:_19.window._outerHeight()});
}
_19.window.css("z-index",$.fn.window.defaults.zIndex++);
_19.options.onOpen.call(_18);
},onResize:function(_1a,_1b){
var _1c=$(this).panel("options");
$.extend(_19.options,{width:_1c.width,height:_1c.height,left:_1c.left,top:_1c.top});
if(_19.shadow){
_19.shadow.css({left:_19.options.left,top:_19.options.top,width:_19.window._outerWidth(),height:_19.window._outerHeight()});
}
_19.options.onResize.call(_18,_1a,_1b);
},onMinimize:function(){
if(_19.shadow){
_19.shadow.hide();
}
if(_19.mask){
_19.mask.hide();
}
_19.options.onMinimize.call(_18);
},onBeforeCollapse:function(){
if(_19.options.onBeforeCollapse.call(_18)==false){
return false;
}
if(_19.shadow){
_19.shadow.hide();
}
},onExpand:function(){
if(_19.shadow){
_19.shadow.show();
}
_19.options.onExpand.call(_18);
}}));
_19.window=win.panel("panel");
if(_19.mask){
_19.mask.remove();
}
if(_19.options.modal==true){
_19.mask=$("<div class=\"window-mask\"></div>").insertAfter(_19.window);
_19.mask.css({width:(_19.options.inline?_19.mask.parent().width():_1d().width),height:(_19.options.inline?_19.mask.parent().height():_1d().height),display:"none"});
}
if(_19.shadow){
_19.shadow.remove();
}
if(_19.options.shadow==true){
_19.shadow=$("<div class=\"window-shadow\"></div>").insertAfter(_19.window);
_19.shadow.css({display:"none"});
}
if(_19.options.left==null){
_9(_18);
}
if(_19.options.top==null){
_10(_18);
}
_5(_18);
if(_19.options.closed==false){
win.window("open");
}
};
function _1e(_1f){
var _20=$.data(_1f,"window");
_20.window.draggable({handle:">div.panel-header>div.panel-title",disabled:_20.options.draggable==false,onStartDrag:function(e){
if(_20.mask){
_20.mask.css("z-index",$.fn.window.defaults.zIndex++);
}
if(_20.shadow){
_20.shadow.css("z-index",$.fn.window.defaults.zIndex++);
}
_20.window.css("z-index",$.fn.window.defaults.zIndex++);
if(!_20.proxy){
_20.proxy=$("<div class=\"window-proxy\"></div>").insertAfter(_20.window);
}
_20.proxy.css({display:"none",zIndex:$.fn.window.defaults.zIndex++,left:e.data.left,top:e.data.top});
_20.proxy._outerWidth(_20.window._outerWidth());
_20.proxy._outerHeight(_20.window._outerHeight());
setTimeout(function(){
if(_20.proxy){
_20.proxy.show();
}
},500);
},onDrag:function(e){
_20.proxy.css({display:"block",left:e.data.left,top:e.data.top});
return false;
},onStopDrag:function(e){
_20.options.left=e.data.left;
_20.options.top=e.data.top;
$(_1f).window("move");
_20.proxy.remove();
_20.proxy=null;
}});
_20.window.resizable({disabled:_20.options.resizable==false,onStartResize:function(e){
_20.pmask=$("<div class=\"window-proxy-mask\"></div>").insertAfter(_20.window);
_20.pmask.css({zIndex:$.fn.window.defaults.zIndex++,left:e.data.left,top:e.data.top,width:_20.window._outerWidth(),height:_20.window._outerHeight()});
if(!_20.proxy){
_20.proxy=$("<div class=\"window-proxy\"></div>").insertAfter(_20.window);
}
_20.proxy.css({zIndex:$.fn.window.defaults.zIndex++,left:e.data.left,top:e.data.top});
_20.proxy._outerWidth(e.data.width);
_20.proxy._outerHeight(e.data.height);
},onResize:function(e){
_20.proxy.css({left:e.data.left,top:e.data.top});
_20.proxy._outerWidth(e.data.width);
_20.proxy._outerHeight(e.data.height);
return false;
},onStopResize:function(e){
$.extend(_20.options,{left:e.data.left,top:e.data.top,width:e.data.width,height:e.data.height});
_1(_1f);
_20.pmask.remove();
_20.pmask=null;
_20.proxy.remove();
_20.proxy=null;
}});
};
function _1d(){
if(document.compatMode=="BackCompat"){
return {width:Math.max(document.body.scrollWidth,document.body.clientWidth),height:Math.max(document.body.scrollHeight,document.body.clientHeight)};
}else{
return {width:Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth),height:Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight)};
}
};
$(window).resize(function(){
$("body>div.window-mask").css({width:$(window)._outerWidth(),height:$(window)._outerHeight()});
setTimeout(function(){
$("body>div.window-mask").css({width:_1d().width,height:_1d().height});
},50);
});
$.fn.window=function(_21,_22){
if(typeof _21=="string"){
var _23=$.fn.window.methods[_21];
if(_23){
return _23(this,_22);
}else{
return this.panel(_21,_22);
}
}
_21=_21||{};
return this.each(function(){
var _24=$.data(this,"window");
if(_24){
$.extend(_24.options,_21);
}else{
_24=$.data(this,"window",{options:$.extend({},$.fn.window.defaults,$.fn.window.parseOptions(this),_21)});
if(!_24.options.inline){
document.body.appendChild(this);
}
}
_17(this);
_1e(this);
});
};
$.fn.window.methods={options:function(jq){
var _25=jq.panel("options");
var _26=$.data(jq[0],"window").options;
return $.extend(_26,{closed:_25.closed,collapsed:_25.collapsed,minimized:_25.minimized,maximized:_25.maximized});
},window:function(jq){
return $.data(jq[0],"window").window;
},resize:function(jq,_27){
return jq.each(function(){
_1(this,_27);
});
},move:function(jq,_28){
return jq.each(function(){
_5(this,_28);
});
},hcenter:function(jq){
return jq.each(function(){
_9(this,true);
});
},vcenter:function(jq){
return jq.each(function(){
_10(this,true);
});
},center:function(jq){
return jq.each(function(){
_9(this);
_10(this);
_5(this);
});
}};
$.fn.window.parseOptions=function(_29){
return $.extend({},$.fn.panel.parseOptions(_29),$.parser.parseOptions(_29,[{draggable:"boolean",resizable:"boolean",shadow:"boolean",modal:"boolean",inline:"boolean"}]));
};
$.fn.window.defaults=$.extend({},$.fn.panel.defaults,{zIndex:9000,draggable:true,resizable:true,shadow:true,modal:false,inline:false,title:"New Window",collapsible:true,minimizable:true,maximizable:true,closable:true,closed:false});
})(jQuery);


/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
var cp=document.createElement("div");
while(_2.firstChild){
cp.appendChild(_2.firstChild);
}
_2.appendChild(cp);
var _3=$(cp);
_3.attr("style",$(_2).attr("style"));
$(_2).removeAttr("style").css("overflow","hidden");
_3.panel({border:false,doSize:false,bodyCls:"dialog-content"});
return _3;
};
function _4(_5){
var _6=$.data(_5,"dialog").options;
var _7=$.data(_5,"dialog").contentPanel;
if(_6.toolbar){
if($.isArray(_6.toolbar)){
$(_5).find("div.dialog-toolbar").remove();
var _8=$("<div class=\"dialog-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(_5);
var tr=_8.find("tr");
for(var i=0;i<_6.toolbar.length;i++){
var _9=_6.toolbar[i];
if(_9=="-"){
$("<td><div class=\"dialog-tool-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
var _a=$("<a href=\"javascript:void(0)\"></a>").appendTo(td);
_a[0].onclick=eval(_9.handler||function(){
});
_a.linkbutton($.extend({},_9,{plain:true}));
}
}
}else{
$(_6.toolbar).addClass("dialog-toolbar").prependTo(_5);
$(_6.toolbar).show();
}
}else{
$(_5).find("div.dialog-toolbar").remove();
}
if(_6.buttons){
if($.isArray(_6.buttons)){
$(_5).find("div.dialog-button").remove();
var _b=$("<div class=\"dialog-button\"></div>").appendTo(_5);
for(var i=0;i<_6.buttons.length;i++){
var p=_6.buttons[i];
var _c=$("<a href=\"javascript:void(0)\"></a>").appendTo(_b);
if(p.handler){
_c[0].onclick=p.handler;
}
_c.linkbutton(p);
}
}else{
$(_6.buttons).addClass("dialog-button").appendTo(_5);
$(_6.buttons).show();
}
}else{
$(_5).find("div.dialog-button").remove();
}
var _d=_6.href;
var _e=_6.content;
_6.href=null;
_6.content=null;
_7.panel({closed:_6.closed,cache:_6.cache,href:_d,content:_e,onLoad:function(){
if(_6.height=="auto"){
$(_5).window("resize");
}
_6.onLoad.apply(_5,arguments);
}});
$(_5).window($.extend({},_6,{onOpen:function(){
if(_7.panel("options").closed){
_7.panel("open");
}
if(_6.onOpen){
_6.onOpen.call(_5);
}
},onResize:function(_f,_10){
var _11=$(_5);
_7.panel("panel").show();
_7.panel("resize",{width:_11.width(),height:(_10=="auto")?"auto":_11.height()-_11.children("div.dialog-toolbar")._outerHeight()-_11.children("div.dialog-button")._outerHeight()});
if(_6.onResize){
_6.onResize.call(_5,_f,_10);
}
}}));
_6.href=_d;
_6.content=_e;
};
function _12(_13,_14){
var _15=$.data(_13,"dialog").contentPanel;
_15.panel("refresh",_14);
};
$.fn.dialog=function(_16,_17){
if(typeof _16=="string"){
var _18=$.fn.dialog.methods[_16];
if(_18){
return _18(this,_17);
}else{
return this.window(_16,_17);
}
}
_16=_16||{};
return this.each(function(){
var _19=$.data(this,"dialog");
if(_19){
$.extend(_19.options,_16);
}else{
$.data(this,"dialog",{options:$.extend({},$.fn.dialog.defaults,$.fn.dialog.parseOptions(this),_16),contentPanel:_1(this)});
}
_4(this);
});
};
$.fn.dialog.methods={options:function(jq){
var _1a=$.data(jq[0],"dialog").options;
var _1b=jq.panel("options");
$.extend(_1a,{closed:_1b.closed,collapsed:_1b.collapsed,minimized:_1b.minimized,maximized:_1b.maximized});
var _1c=$.data(jq[0],"dialog").contentPanel;
return _1a;
},dialog:function(jq){
return jq.window("window");
},refresh:function(jq,_1d){
return jq.each(function(){
_12(this,_1d);
});
}};
$.fn.dialog.parseOptions=function(_1e){
return $.extend({},$.fn.window.parseOptions(_1e),$.parser.parseOptions(_1e,["toolbar","buttons"]));
};
$.fn.dialog.defaults=$.extend({},$.fn.window.defaults,{title:"New Dialog",collapsible:false,minimizable:false,maximizable:false,resizable:false,toolbar:null,buttons:null});
})(jQuery);


(function($) {
    ygDialog = function(opts) {
        var win;
        opts = opts || {};
        var target;
        var winOpts = $.extend({},
        {
            isFrame: false,
            locate: 'document',
            data: undefined,
            width: 'auto',
            height: 'auto',
            cache: false,
            minimizable: false,
            maximizable: false,
            collapsible: false,
            resizable: false,
            modal: true,
						closed:false,
            loadMsg: $.fn.datagrid.defaults.loadMsg,
            showMask: true,
            onClose: function() {
							if(winOpts.target){
								$('.validatebox-invalid',winOpts.target).removeClass('validatebox-invalid');
							}
							if(!winOpts.target){
                target.dialog('destroy');
							}
            }
        },
        opts);

        function getTop(w, options) {
            var _doc;
            try {
                _doc = w['top'].document;
                _doc.getElementsByTagName;
            } catch(e) {
                return w;
            }

            if (options.locate == 'document' || _doc.getElementsByTagName('frameset').length > 0) {
                return w;
            }

            return w['top'];
        }

        function setWindowSize(w, options) {
            var _top = getTop(w, options);
            var wHeight = $(_top).height(),
            wWidth = $(_top).width();
            if (options.locate == 'top' || options.locate == 'document') {
                if (options.height == 'auto') {
                    options.height = wHeight * 0.8
                }

                if (options.width == 'auto') {
                    options.width = wWidth * 0.8
                }
            } else {
                var locate = /^#/.test(options.locate) ? options.locate: '#' + options.locate;
                if (options.height == 'auto') {
                    options.height = $(locate).height() * 0.8
                }

                if (options.width == 'auto') {
                    options.width = $(locate).width() * 0.8
                }
            }
        }

        var iframe = null;
        if (winOpts.isFrame && !winOpts.target) {
            iframe = $('<iframe>').attr('height', '100%').attr('width', '100%').attr('marginheight', 0).attr('marginwidth', 0).attr('frameborder', 0);
						iframe.css({'visibility':'hidden'});
            iframe.attr('src', winOpts.href);
            delete winOpts.content;
        }

        var selfRefrence = {
            getData: function(name) {
                return winOpts.data ? winOpts.data[name] : null;
            },
            close: function() {
                target.panel('close');
            }
        };

        var _top = getTop(window, winOpts);

        var warpHandler = function(handler) {
            if (typeof handler == 'function') {
                return function() {
                    handler(selfRefrence);
                };
            }

            if (typeof handler == 'string' && winOpts.isFrame) {
                return function() {
                    iframe[0].contentWindow[handler](selfRefrence);
                }
            }

            if (typeof handler == 'string') {
                return function() {
                    eval(_top[handler])(selfRefrence);
                }
            }
        }

        setWindowSize(window, winOpts);

        //包装toolbar中各对象的handler
        if (winOpts.toolbar && $.isArray(winOpts.toolbar)) {
            $.each(winOpts.toolbar,
            function(i, button) {
                button.handler = warpHandler(button.handler);
            });
        }

        //包装buttons中各对象的handler
        if (winOpts.buttons && $.isArray(winOpts.buttons)) {
            $.each(winOpts.buttons,
            function(i, button) {
                button.handler = warpHandler(button.handler);
            });
        }

        var onLoadCallback = winOpts.onLoad;
        winOpts.onLoad = function() {
            onLoadCallback && onLoadCallback.call(this, selfRefrence, _top);
						
        }

        if (winOpts.locate == 'top' || winOpts.locate == 'document') {
            if (winOpts.isFrame && iframe && !winOpts.target) {
								winOpts.href='';
                if (winOpts.showMask) {
                    winOpts.onBeforeOpen = function() {
												var body = $(this);
												$.mask({target: body});
                    }
                }
								 target = _top.$('<div>').css({
                    'overflow': 'hidden'
                }).append(iframe).dialog(winOpts);
								function iframeLoaded(){
									onLoadCallback && onLoadCallback.call(iframe, selfRefrence, iframe[0].contentWindow);
									_top.$('.dialog-button').show();
									target.panel('body').children("div.datagrid-mask-msg").remove();
                  target.panel('body').children("div.datagrid-mask").remove();
									iframe.css({'visibility':'visible'});
								}
								
							iframe.bind('load', function(){
									iframeLoaded();
							});
								
            }else if(winOpts.target){
							target=winOpts.target;
							target.dialog(winOpts);
							_top.$('.dialog-button').show();
							target.panel('body').children("div.datagrid-mask-msg").remove();
              target.panel('body').children("div.datagrid-mask").remove();
						} else{
                target = _top.$('<div>').dialog(winOpts);
								setTimeout(function(){
									_top.$('.dialog-button').show();
								},2);
            }
        } else {
            var locate = /^#/.test(winOpts.locate) ? winOpts.locate: '#' + winOpts.locate;
            target = $('<div>').appendTo(locate).dialog($.extend({},
            winOpts, {
                inline: true
            }));
							
        }

        return target;

    }

    /*    var showModalDialog = function(opts) {
        var defaults = $.extend({},
        opts, {
            modal: true,
            minimizable: false,
            maximizable: false,
            resizable: false,
            collapsible: false
        });
        ygDialog.open(defaults);
    }*/
})(jQuery);
(function($) {
  function createInputFile(target) {
			if($(target).hasClass('jqfile')) return;
			var w=$(target).width();
      var wrapper = $("<div>").addClass('file-button')
			var filename = $('<input class="ipt">').addClass($(target).attr("class")).css({"display": "inline","float":"left",width: w + "px"});
      $(target).before(filename);
			//$(wrapper).append('<a class=button style="margin-left:2px;"><span>浏览</span></a>');
      $(target).wrap(wrapper);
      $(target).css({"float":"left","position": "relative","cursor": "pointer","opacity": "0.0"}).addClass('jqfile');
      $(target).css({"margin-left":-w+50+'px'});
      $(target).bind("change", function () {
      		filename.val($(target).val());
       });
  }

  $.fn.inputfile = function(options, param) {
    if (typeof options === 'string') {
      return $(this).inputfile.methods[options].call(this, params);
    }
    options = options || {};
    return this.each(function() {
      var _this = this;
      var opt = $.data(_this, "inputfile");
      if (opt) {
        $.extend(opt.options, options);
      } else {
        $.data(_this, "inputfile", {
          options: $.extend({},
          $.fn.inputfile.defaults, $.fn.inputfile.parseOptions(_this), options)
        });
        createInputFile(_this);
      }
    });
  };

  $.fn.inputfile.methods = {
    options: function(jq) {
      return $.data(jq[0], 'inputfile').options;
    }
  };

  $.fn.inputfile.parseOptions = function(target) {
    var t = $(target);
    return $.extend({},
    $.parser.parseOptions(target, ['id']));
  };

  $.fn.inputfile.defaults = {
    id: null
  };
  if ($.parser) {
    $.parser.plugins.push('inputfile');
  }
})(jQuery);
(function($){
	
	function creatDistrict(target){
		var opts = $.data(target, 'district').options;
    var t = $(target);
		var pSelect=$('<select>').attr('id','ProvinceSelect');
		var cSelect=$('<select>').attr('id','CitySelect');
		var aSelect=$('<select>').attr('id','AreaSelect');
		t.append(pSelect);
		
		pSelect.combobox({
			data:[{value:'',text:'请选择'},{value:'1',text:'广东省'},{value:'2',text:'广西省'}],
			textField:'text',
			valueField:'value',
			width:100,
			onChange:function(value){
				if($('#CitySelect',target)[0]){
					cSelect.combobox({
						disabled:false,
						value:'1'
					});
				}
			}
		});
		
		if(opts.level>1){
				t.append(cSelect);
				cSelect.combobox({
				data:[{value:'',text:'请选择'},{value:'1',text:'广州市'},{value:'2',text:'深圳市'}],
				textField:'text',
				valueField:'value',
				style:'margin-left:5px;',
				disabled:true,
				width:120,
				onChange:function(value){
					if($('#AreaSelect',target)[0]){
						aSelect.combobox({
							disabled:false,
							value:'1'
						});
					}
				}
			});
		}
		
		if(opts.level>2){
				t.append(aSelect);
				aSelect.combobox({
				data:[{value:'',text:'请选择'},{value:'1',text:'天河区'},{value:'2',text:'越秀区'},{value:'3',text:'白云区'}],
				textField:'text',
				valueField:'value',
				style:'margin-left:5px;',
				disabled:true,
				width:120
			});
		}

	}
	
	$.fn.district = function(options, param) {
		
		if (typeof options == 'string'){
			var method = $.fn.district.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this.combo(options, param);
			}
		}
		
		options=options||{};
		return this.each(function() {
      var _this = this;
      var opt = $.data(_this, "district");
      if (opt) {
        $.extend(opt.options, options);
      } else {
        $.data(_this, "district", {
          options: $.extend({},
          $.fn.district.defaults, $.fn.district.parseOptions(_this), options)
        });
        creatDistrict(_this);
      }
    });
	}
	
	$.fn.district.methods = {
    options: function(jq) {
      return $.data(jq[0], 'district').options;
    },
		getValue: function(jq){
			var p=$('#ProvinceSelect',jq).combobox('getValue');
			var c=$('#CitySelect',jq).combobox('getValue');
			var a=$('#AreaSelect',jq).combobox('getValue');
			return {"p":p,"c":c,"a":a};
		},
		setValue:function(jq,param){
			var p=param.p;
			var c=param.c;
			var a=param.a;
			if(p){
				$('#ProvinceSelect',jq).combobox('setValue',p)
			}
			if(c){
				$('#CitySelect',jq).combobox('setValue',c);
			}
			if(a){
				$('#AreaSelect',jq).combobox({disabled:false}).combobox('setValue',a);
			}
		}
  };
	
	
	$.fn.district.parseOptions = function(target) {
    var t = $(target);
    return $.extend({},
    $.parser.parseOptions(target, ['level']));
  };
	
	
	$.fn.district.defaults = {
    id: null,
    level:3
  };
	
  if ($.parser) {
    $.parser.plugins.push('district');
  }
	
})(jQuery);
/**
 * jQuery EasyUI 1.3.5
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2,_3){
_3=_3||{};
var _4={};
if(_3.onSubmit){
if(_3.onSubmit.call(_2,_4)==false){
return;
}
}
var _5=$(_2);
if(_3.url){
_5.attr("action",_3.url);
}
var _6="easyui_frame_"+(new Date().getTime());
var _7=$("<iframe id="+_6+" name="+_6+"></iframe>").attr("src",window.ActiveXObject?"javascript:false":"about:blank").css({position:"absolute",top:-1000,left:-1000});
var t=_5.attr("target"),a=_5.attr("action");
_5.attr("target",_6);
var _8=$();
try{
_7.appendTo("body");
_7.bind("load",cb);
for(var n in _4){
var f=$("<input type=\"hidden\" name=\""+n+"\">").val(_4[n]).appendTo(_5);
_8=_8.add(f);
}
_9();
_5[0].submit();
}
finally{
_5.attr("action",a);
t?_5.attr("target",t):_5.removeAttr("target");
_8.remove();
}
function _9(){
var f=$("#"+_6);
if(!f.length){
return;
}
try{
var s=f.contents()[0].readyState;
if(s&&s.toLowerCase()=="uninitialized"){
setTimeout(_9,100);
}
}
catch(e){
cb();
}
};
var _a=10;
function cb(){
var _b=$("#"+_6);
if(!_b.length){
return;
}
_b.unbind();
var _c="";
try{
var _d=_b.contents().find("body");
_c=_d.html();
if(_c==""){
if(--_a){
setTimeout(cb,100);
return;
}
}
var ta=_d.find(">textarea");
if(ta.length){
_c=ta.val();
}else{
var _e=_d.find(">pre");
if(_e.length){
_c=_e.html();
}
}
}
catch(e){
}
if(_3.success){
_3.success(_c);
}
setTimeout(function(){
_b.unbind();
_b.remove();
},100);
};
};
function _f(_10,_11){
if(!$.data(_10,"form")){
$.data(_10,"form",{options:$.extend({},$.fn.form.defaults)});
}
var _12=$.data(_10,"form").options;
if(typeof _11=="string"){
var _13={};
if(_12.onBeforeLoad.call(_10,_13)==false){
return;
}
$.ajax({url:_11,data:_13,dataType:"json",success:function(_14){
_15(_14);
},error:function(){
_12.onLoadError.apply(_10,arguments);
}});
}else{
_15(_11);
}
function _15(_16){
var _17=$(_10);
for(var _18 in _16){
var val=_16[_18];
var rr=_19(_18,val);
if(!rr.length){
var _1a=_1b(_18,val);
if(!_1a){
$("input[name=\""+_18+"\"]",_17).val(val);
$("textarea[name=\""+_18+"\"]",_17).val(val);
$("select[name=\""+_18+"\"]",_17).val(val);
}
}
_1c(_18,val);
}
_12.onLoadSuccess.call(_10,_16);
_28(_10);
};
function _19(_1d,val){
var rr=$(_10).find("input[name=\""+_1d+"\"][type=radio], input[name=\""+_1d+"\"][type=checkbox]");
rr._propAttr("checked",false);
rr.each(function(){
var f=$(this);
if(f.val()==String(val)||$.inArray(f.val(),$.isArray(val)?val:[val])>=0){
f._propAttr("checked",true);
}
});
return rr;
};
function _1b(_1e,val){
var _1f=0;
var pp=["numberbox","slider"];
for(var i=0;i<pp.length;i++){
var p=pp[i];
var f=$(_10).find("input["+p+"Name=\""+_1e+"\"]");
if(f.length){
f[p]("setValue",val);
_1f+=f.length;
}
}
return _1f;
};
function _1c(_20,val){
var _21=$(_10);
var cc=["combobox","combotree","combogrid","datetimebox","datebox","combo"];
var c=_21.find("[comboName=\""+_20+"\"]");
if(c.length){
for(var i=0;i<cc.length;i++){
var _22=cc[i];
if(c.hasClass(_22+"-f")){
if(c[_22]("options").multiple){
c[_22]("setValues",val);
}else{
c[_22]("setValue",val);
}
return;
}
}
}
};
};
function _23(_24){
if($('.easyui-editor',_24)[0]){
$('.easyui-editor',_24).editor('clearValue');
$('.easyui-editor',_24).editor('setValue','请填写内容');
}
$("input,select,textarea",_24).each(function(){
var t=this.type,tag=this.tagName.toLowerCase();
if(t=="text"||t=="password"||tag=="textarea"){
this.value="";
}else{
if(t=="file"){
var _25=$(this);
_25.after(_25.clone().val(""));
_25.remove();
}else{
if(t=="checkbox"||t=="radio"){
this.checked=false;
}else{
if(tag=="select"){
this.selectedIndex=-1;
}
}
}
}
});
var t=$(_24);
var _26=["combo","combobox","combotree","combogrid","slider"];
for(var i=0;i<_26.length;i++){
var _27=_26[i];
var r=t.find("."+_27+"-f");
if(r.length&&r[_27]){
r[_27]("clear");
}
}
//_28(_24); 默认不开启验证
};
function _29(_2a){
_2a.reset();
var t=$(_2a);
var _2b=["combo","combobox","combotree","combogrid","datebox","datetimebox","spinner","timespinner","numberbox","numberspinner","slider"];
for(var i=0;i<_2b.length;i++){
var _2c=_2b[i];
var r=t.find("."+_2c+"-f");
if(r.length&&r[_2c]){
r[_2c]("reset");
}
}
_28(_2a);
};
function _2d(_2e){
var _2f=$.data(_2e,"form").options;
var _30=$(_2e);
_30.unbind(".form").bind("submit.form",function(){
setTimeout(function(){
_1(_2e,_2f);
},0);
return false;
});
};
function _28(_31){
if($.fn.validatebox){
var t=$(_31);
t.find(".validatebox-text:not(:disabled)").validatebox("validate");
var _32=t.find(".validatebox-invalid");
_32.filter(":not(:disabled):first").focus();
return _32.length==0;
}
return true;
};
function _33(_34,_35){
$(_34).find(".validatebox-text:not(:disabled)").validatebox(_35?"disableValidation":"enableValidation");
};
$.fn.form=function(_36,_37){
if(typeof _36=="string"){
return $.fn.form.methods[_36](this,_37);
}
_36=_36||{};
return this.each(function(){
if(!$.data(this,"form")){
$.data(this,"form",{options:$.extend({},$.fn.form.defaults,_36)});
}
_2d(this);
});
};
$.fn.form.methods={submit:function(jq,_38){
return jq.each(function(){
_1(this,$.extend({},$.fn.form.defaults,_38||{}));
});
},load:function(jq,_39){
return jq.each(function(){
_f(this,_39);
});
},clear:function(jq){
return jq.each(function(){
_23(this);
});
},reset:function(jq){
return jq.each(function(){
_29(this);
});
},validate:function(jq){
return _28(jq[0]);
},disableValidation:function(jq){
return jq.each(function(){
_33(this,true);
});
},enableValidation:function(jq){
return jq.each(function(){
_33(this,false);
});
}};
$.fn.form.defaults={url:null,onSubmit:function(_3a){
return $(this).form("validate");
},success:function(_3b){
},onBeforeLoad:function(_3c){
},onLoadSuccess:function(_3d){
},onLoadError:function(){
}};
})(jQuery);


(function (window, undefined) {
	if (window.KindEditor) {
		return;
	}
if (!window.console) {
	window.console = {};
}
if (!console.log) {
	console.log = function () {};
}
var _VERSION = '4.1.7 (2013-04-21)',
	_ua = navigator.userAgent.toLowerCase(),
	_IE = _ua.indexOf('msie') > -1 && _ua.indexOf('opera') == -1,
	_GECKO = _ua.indexOf('gecko') > -1 && _ua.indexOf('khtml') == -1,
	_WEBKIT = _ua.indexOf('applewebkit') > -1,
	_OPERA = _ua.indexOf('opera') > -1,
	_MOBILE = _ua.indexOf('mobile') > -1,
	_IOS = /ipad|iphone|ipod/.test(_ua),
	_QUIRKS = document.compatMode != 'CSS1Compat',
	_matches = /(?:msie|firefox|webkit|opera)[\/:\s](\d+)/.exec(_ua),
	_V = _matches ? _matches[1] : '0',
	_TIME = new Date().getTime();
function _isArray(val) {
	if (!val) {
		return false;
	}
	return Object.prototype.toString.call(val) === '[object Array]';
}
function _isFunction(val) {
	if (!val) {
		return false;
	}
	return Object.prototype.toString.call(val) === '[object Function]';
}
function _inArray(val, arr) {
	for (var i = 0, len = arr.length; i < len; i++) {
		if (val === arr[i]) {
			return i;
		}
	}
	return -1;
}
function _each(obj, fn) {
	if (_isArray(obj)) {
		for (var i = 0, len = obj.length; i < len; i++) {
			if (fn.call(obj[i], i, obj[i]) === false) {
				break;
			}
		}
	} else {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (fn.call(obj[key], key, obj[key]) === false) {
					break;
				}
			}
		}
	}
}
function _trim(str) {
	return str.replace(/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, '');
}
function _inString(val, str, delimiter) {
	delimiter = delimiter === undefined ? ',' : delimiter;
	return (delimiter + str + delimiter).indexOf(delimiter + val + delimiter) >= 0;
}
function _addUnit(val, unit) {
	unit = unit || 'px';
	return val && /^\d+$/.test(val) ? val + unit : val;
}
function _removeUnit(val) {
	var match;
	return val && (match = /(\d+)/.exec(val)) ? parseInt(match[1], 10) : 0;
}
function _escape(val) {
	return val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function _unescape(val) {
	return val.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
}
function _toCamel(str) {
	var arr = str.split('-');
	str = '';
	_each(arr, function(key, val) {
		str += (key > 0) ? val.charAt(0).toUpperCase() + val.substr(1) : val;
	});
	return str;
}
function _toHex(val) {
	function hex(d) {
		var s = parseInt(d, 10).toString(16).toUpperCase();
		return s.length > 1 ? s : '0' + s;
	}
	return val.replace(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/ig,
		function($0, $1, $2, $3) {
			return '#' + hex($1) + hex($2) + hex($3);
		}
	);
}
function _toMap(val, delimiter) {
	delimiter = delimiter === undefined ? ',' : delimiter;
	var map = {}, arr = _isArray(val) ? val : val.split(delimiter), match;
	_each(arr, function(key, val) {
		if ((match = /^(\d+)\.\.(\d+)$/.exec(val))) {
			for (var i = parseInt(match[1], 10); i <= parseInt(match[2], 10); i++) {
				map[i.toString()] = true;
			}
		} else {
			map[val] = true;
		}
	});
	return map;
}
function _toArray(obj, offset) {
	return Array.prototype.slice.call(obj, offset || 0);
}
function _undef(val, defaultVal) {
	return val === undefined ? defaultVal : val;
}
function _invalidUrl(url) {
	return !url || /[<>"]/.test(url);
}
function _addParam(url, param) {
	return url.indexOf('?') >= 0 ? url + '&' + param : url + '?' + param;
}
function _extend(child, parent, proto) {
	if (!proto) {
		proto = parent;
		parent = null;
	}
	var childProto;
	if (parent) {
		var fn = function () {};
		fn.prototype = parent.prototype;
		childProto = new fn();
		_each(proto, function(key, val) {
			childProto[key] = val;
		});
	} else {
		childProto = proto;
	}
	childProto.constructor = child;
	child.prototype = childProto;
	child.parent = parent ? parent.prototype : null;
}
function _json(text) {
	var match;
	if ((match = /\{[\s\S]*\}|\[[\s\S]*\]/.exec(text))) {
		text = match[0];
	}
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	cx.lastIndex = 0;
	if (cx.test(text)) {
		text = text.replace(cx, function (a) {
			return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		});
	}
	if (/^[\],:{}\s]*$/.
	test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
	replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
	replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
		return eval('(' + text + ')');
	}
	throw 'JSON parse error';
}
var _round = Math.round;
var K = {
	DEBUG : false,
	VERSION : _VERSION,
	IE : _IE,
	GECKO : _GECKO,
	WEBKIT : _WEBKIT,
	OPERA : _OPERA,
	V : _V,
	TIME : _TIME,
	each : _each,
	isArray : _isArray,
	isFunction : _isFunction,
	inArray : _inArray,
	inString : _inString,
	trim : _trim,
	addUnit : _addUnit,
	removeUnit : _removeUnit,
	escape : _escape,
	unescape : _unescape,
	toCamel : _toCamel,
	toHex : _toHex,
	toMap : _toMap,
	toArray : _toArray,
	undef : _undef,
	invalidUrl : _invalidUrl,
	addParam : _addParam,
	extend : _extend,
	json : _json
};
var _INLINE_TAG_MAP = _toMap('a,abbr,acronym,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,img,input,ins,kbd,label,map,q,s,samp,select,small,span,strike,strong,sub,sup,textarea,tt,u,var'),
	_BLOCK_TAG_MAP = _toMap('address,applet,blockquote,body,center,dd,dir,div,dl,dt,fieldset,form,frameset,h1,h2,h3,h4,h5,h6,head,hr,html,iframe,ins,isindex,li,map,menu,meta,noframes,noscript,object,ol,p,pre,script,style,table,tbody,td,tfoot,th,thead,title,tr,ul'),
	_SINGLE_TAG_MAP = _toMap('area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed'),
	_STYLE_TAG_MAP = _toMap('b,basefont,big,del,em,font,i,s,small,span,strike,strong,sub,sup,u'),
	_CONTROL_TAG_MAP = _toMap('img,table,input,textarea,button'),
	_PRE_TAG_MAP = _toMap('pre,style,script'),
	_NOSPLIT_TAG_MAP = _toMap('html,head,body,td,tr,table,ol,ul,li'),
	_AUTOCLOSE_TAG_MAP = _toMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr'),
	_FILL_ATTR_MAP = _toMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected'),
	_VALUE_TAG_MAP = _toMap('input,button,textarea,select');
function _getBasePath() {
	var els = document.getElementsByTagName('script'), src;
	for (var i = 0, len = els.length; i < len; i++) {
		src = els[i].src || '';
		if (/kindeditor[\w\-\.]*\.js/.test(src)) {
			return src.substring(0, src.lastIndexOf('/') + 1);
		}
	}
	return '';
}
K.basePath =_getBasePath();

K.options = {
	designMode : true,
	fullscreenMode : false,
	filterMode : true,
	wellFormatMode : true,
	shadowMode : true,
	loadStyleMode : true,
	basePath : K.basePath,
	themesPath : K.basePath + 'themes/',
	langPath : K.basePath + 'lang/',
	pluginsPath : K.basePath + 'plugins/',
	themeType : 'default',
	langType : 'zh_CN',
	urlType : '',
	newlineTag : 'p',
	resizeType : 2,
	syncType : 'form',
	pasteType : 2,
	dialogAlignType : 'page',
	useContextmenu : true,
	fullscreenShortcut : false,
	bodyClass : 'ke-content',
	indentChar : '\t',
	cssPath : '',
	cssData : '',
	minWidth : 250,
	minHeight : 100,
	minChangeSize : 50,
	zIndex : 811213,
	items : [
		'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
		'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
		'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
		'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
		'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
		'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
		'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
		'anchor', 'link', 'unlink', '|', 'about'
	],
	noDisableItems : ['source', 'fullscreen'],
	colorTable : [
		['#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500'],
		['#009900', '#006600', '#99BB00', '#B8D100', '#60D978', '#00D5FF'],
		['#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE'],
		['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000']
	],
	fontSizeTable : ['9px', '10px', '12px', '14px', '16px', '18px', '24px', '32px'],
	htmlTags : {
		font : ['id', 'class', 'color', 'size', 'face', '.background-color'],
		span : [
			'id', 'class', '.color', '.background-color', '.font-size', '.font-family', '.background',
			'.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.line-height'
		],
		div : [
			'id', 'class', 'align', '.border', '.margin', '.padding', '.text-align', '.color',
			'.background-color', '.font-size', '.font-family', '.font-weight', '.background',
			'.font-style', '.text-decoration', '.vertical-align', '.margin-left'
		],
		table: [
			'id', 'class', 'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'bordercolor',
			'.padding', '.margin', '.border', 'bgcolor', '.text-align', '.color', '.background-color',
			'.font-size', '.font-family', '.font-weight', '.font-style', '.text-decoration', '.background',
			'.width', '.height', '.border-collapse'
		],
		'td,th': [
			'id', 'class', 'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor',
			'.text-align', '.color', '.background-color', '.font-size', '.font-family', '.font-weight',
			'.font-style', '.text-decoration', '.vertical-align', '.background', '.border'
		],
		a : ['id', 'class', 'href', 'target', 'name'],
		embed : ['id', 'class', 'src', 'width', 'height', 'type', 'loop', 'autostart', 'quality', '.width', '.height', 'align', 'allowscriptaccess'],
		img : ['id', 'class', 'src', 'width', 'height', 'border', 'alt', 'title', 'align', '.width', '.height', '.border'],
		'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6' : [
			'id', 'class', 'align', '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.background',
			'.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.text-indent', '.margin-left'
		],
		pre : ['id', 'class'],
		hr : ['id', 'class', '.page-break-after'],
		'br,tbody,tr,strong,b,sub,sup,em,i,u,strike,s,del' : ['id', 'class'],
		iframe : ['id', 'class', 'src', 'frameborder', 'width', 'height', '.width', '.height']
	},
	layout : '<div class="container"><div class="toolbar"></div><div class="edit"></div><div class="statusbar"></div></div>'
};
var _useCapture = false;
var _INPUT_KEY_MAP = _toMap('8,9,13,32,46,48..57,59,61,65..90,106,109..111,188,190..192,219..222');
var _CURSORMOVE_KEY_MAP = _toMap('33..40');
var _CHANGE_KEY_MAP = {};
_each(_INPUT_KEY_MAP, function(key, val) {
	_CHANGE_KEY_MAP[key] = val;
});
_each(_CURSORMOVE_KEY_MAP, function(key, val) {
	_CHANGE_KEY_MAP[key] = val;
});
function _bindEvent(el, type, fn) {
	if (el.addEventListener){
		el.addEventListener(type, fn, _useCapture);
	} else if (el.attachEvent){
		el.attachEvent('on' + type, fn);
	}
}
function _unbindEvent(el, type, fn) {
	if (el.removeEventListener){
		el.removeEventListener(type, fn, _useCapture);
	} else if (el.detachEvent){
		el.detachEvent('on' + type, fn);
	}
}
var _EVENT_PROPS = ('altKey,attrChange,attrName,bubbles,button,cancelable,charCode,clientX,clientY,ctrlKey,currentTarget,' +
	'data,detail,eventPhase,fromElement,handler,keyCode,metaKey,newValue,offsetX,offsetY,originalTarget,pageX,' +
	'pageY,prevValue,relatedNode,relatedTarget,screenX,screenY,shiftKey,srcElement,target,toElement,view,wheelDelta,which').split(',');
function KEvent(el, event) {
	this.init(el, event);
}
_extend(KEvent, {
	init : function(el, event) {
		var self = this, doc = el.ownerDocument || el.document || el;
		self.event = event;
		_each(_EVENT_PROPS, function(key, val) {
			self[val] = event[val];
		});
		if (!self.target) {
			self.target = self.srcElement || doc;
		}
		if (self.target.nodeType === 3) {
			self.target = self.target.parentNode;
		}
		if (!self.relatedTarget && self.fromElement) {
			self.relatedTarget = self.fromElement === self.target ? self.toElement : self.fromElement;
		}
		if (self.pageX == null && self.clientX != null) {
			var d = doc.documentElement, body = doc.body;
			self.pageX = self.clientX + (d && d.scrollLeft || body && body.scrollLeft || 0) - (d && d.clientLeft || body && body.clientLeft || 0);
			self.pageY = self.clientY + (d && d.scrollTop  || body && body.scrollTop  || 0) - (d && d.clientTop  || body && body.clientTop  || 0);
		}
		if (!self.which && ((self.charCode || self.charCode === 0) ? self.charCode : self.keyCode)) {
			self.which = self.charCode || self.keyCode;
		}
		if (!self.metaKey && self.ctrlKey) {
			self.metaKey = self.ctrlKey;
		}
		if (!self.which && self.button !== undefined) {
			self.which = (self.button & 1 ? 1 : (self.button & 2 ? 3 : (self.button & 4 ? 2 : 0)));
		}
		switch (self.which) {
		case 186 :
			self.which = 59;
			break;
		case 187 :
		case 107 :
		case 43 :
			self.which = 61;
			break;
		case 189 :
		case 45 :
			self.which = 109;
			break;
		case 42 :
			self.which = 106;
			break;
		case 47 :
			self.which = 111;
			break;
		case 78 :
			self.which = 110;
			break;
		}
		if (self.which >= 96 && self.which <= 105) {
			self.which -= 48;
		}
	},
	preventDefault : function() {
		var ev = this.event;
		if (ev.preventDefault) {
			ev.preventDefault();
		}
		ev.returnValue = false;
	},
	stopPropagation : function() {
		var ev = this.event;
		if (ev.stopPropagation) {
			ev.stopPropagation();
		}
		ev.cancelBubble = true;
	},
	stop : function() {
		this.preventDefault();
		this.stopPropagation();
	}
});
var _eventExpendo = 'kindeditor_' + _TIME, _eventId = 0, _eventData = {};
function _getId(el) {
	return el[_eventExpendo] || null;
}
function _setId(el) {
	el[_eventExpendo] = ++_eventId;
	return _eventId;
}
function _removeId(el) {
	try {
		delete el[_eventExpendo];
	} catch(e) {
		if (el.removeAttribute) {
			el.removeAttribute(_eventExpendo);
		}
	}
}
function _bind(el, type, fn) {
	if (type.indexOf(',') >= 0) {
		_each(type.split(','), function() {
			_bind(el, this, fn);
		});
		return;
	}
	var id = _getId(el);
	if (!id) {
		id = _setId(el);
	}
	if (_eventData[id] === undefined) {
		_eventData[id] = {};
	}
	var events = _eventData[id][type];
	if (events && events.length > 0) {
		_unbindEvent(el, type, events[0]);
	} else {
		_eventData[id][type] = [];
		_eventData[id].el = el;
	}
	events = _eventData[id][type];
	if (events.length === 0) {
		events[0] = function(e) {
			var kevent = e ? new KEvent(el, e) : undefined;
			_each(events, function(i, event) {
				if (i > 0 && event) {
					event.call(el, kevent);
				}
			});
		};
	}
	if (_inArray(fn, events) < 0) {
		events.push(fn);
	}
	_bindEvent(el, type, events[0]);
}
function _unbind(el, type, fn) {
	if (type && type.indexOf(',') >= 0) {
		_each(type.split(','), function() {
			_unbind(el, this, fn);
		});
		return;
	}
	var id = _getId(el);
	if (!id) {
		return;
	}
	if (type === undefined) {
		if (id in _eventData) {
			_each(_eventData[id], function(key, events) {
				if (key != 'el' && events.length > 0) {
					_unbindEvent(el, key, events[0]);
				}
			});
			delete _eventData[id];
			_removeId(el);
		}
		return;
	}
	if (!_eventData[id]) {
		return;
	}
	var events = _eventData[id][type];
	if (events && events.length > 0) {
		if (fn === undefined) {
			_unbindEvent(el, type, events[0]);
			delete _eventData[id][type];
		} else {
			_each(events, function(i, event) {
				if (i > 0 && event === fn) {
					events.splice(i, 1);
				}
			});
			if (events.length == 1) {

				_unbindEvent(el, type, events[0]);
				delete _eventData[id][type];
			}
		}
		var count = 0;
		_each(_eventData[id], function() {
			count++;
		});
		if (count < 2) {
			delete _eventData[id];
			_removeId(el);
		}
	}
}
function _fire(el, type) {
	if (type.indexOf(',') >= 0) {
		_each(type.split(','), function() {
			_fire(el, this);
		});
		return;
	}
	var id = _getId(el);
	if (!id) {
		return;
	}
	var events = _eventData[id][type];
	if (_eventData[id] && events && events.length > 0) {
		events[0]();
	}
}
function _ctrl(el, key, fn) {
	var self = this;
	key = /^\d{2,}$/.test(key) ? key : key.toUpperCase().charCodeAt(0);
	_bind(el, 'keydown', function(e) {
		if (e.ctrlKey && e.which == key && !e.shiftKey && !e.altKey) {
			fn.call(el);
			e.stop();
		}
	});
}
function _ready(fn) {
	var loaded = false;
	function readyFunc() {
		if (!loaded) {
			loaded = true;
			fn(KindEditor);
		}
	}
	function ieReadyFunc() {
		if (!loaded) {
			try {
				document.documentElement.doScroll('left');
			} catch(e) {
				setTimeout(ieReadyFunc, 100);
				return;
			}
			readyFunc();
		}
	}
	function ieReadyStateFunc() {
		if (document.readyState === 'complete') {
			readyFunc();
		}
	}
	if (document.addEventListener) {
		_bind(document, 'DOMContentLoaded', readyFunc);
	} else if (document.attachEvent) {
		_bind(document, 'readystatechange', ieReadyStateFunc);
		var toplevel = false;
		try {
			toplevel = window.frameElement == null;
		} catch(e) {}
		if (document.documentElement.doScroll && toplevel) {
			ieReadyFunc();
		}
	}
	_bind(window, 'load', readyFunc);
}
if (_IE) {
	window.attachEvent('onunload', function() {
		_each(_eventData, function(key, events) {
			if (events.el) {
				_unbind(events.el);
			}
		});
	});
}
K.ctrl = _ctrl;
K.ready = _ready;
function _getCssList(css) {
	var list = {},
		reg = /\s*([\w\-]+)\s*:([^;]*)(;|$)/g,
		match;
	while ((match = reg.exec(css))) {
		var key = _trim(match[1].toLowerCase()),
			val = _trim(_toHex(match[2]));
		list[key] = val;
	}
	return list;
}
function _getAttrList(tag) {
	var list = {},
		reg = /\s+(?:([\w\-:]+)|(?:([\w\-:]+)=([^\s"'<>]+))|(?:([\w\-:"]+)="([^"]*)")|(?:([\w\-:"]+)='([^']*)'))(?=(?:\s|\/|>)+)/g,
		match;
	while ((match = reg.exec(tag))) {
		var key = (match[1] || match[2] || match[4] || match[6]).toLowerCase(),
			val = (match[2] ? match[3] : (match[4] ? match[5] : match[7])) || '';
		list[key] = val;
	}
	return list;
}
function _addClassToTag(tag, className) {
	if (/\s+class\s*=/.test(tag)) {
		tag = tag.replace(/(\s+class=["']?)([^"']*)(["']?[\s>])/, function($0, $1, $2, $3) {
			if ((' ' + $2 + ' ').indexOf(' ' + className + ' ') < 0) {
				return $2 === '' ? $1 + className + $3 : $1 + $2 + ' ' + className + $3;
			} else {
				return $0;
			}
		});
	} else {
		tag = tag.substr(0, tag.length - 1) + ' class="' + className + '">';
	}
	return tag;
}
function _formatCss(css) {
	var str = '';
	_each(_getCssList(css), function(key, val) {
		str += key + ':' + val + ';';
	});
	return str;
}
function _formatUrl(url, mode, host, pathname) {
	mode = _undef(mode, '').toLowerCase();
	if (url.substr(0, 5) != 'data:') {
		url = url.replace(/([^:])\/\//g, '$1/');
	}
	if (_inArray(mode, ['absolute', 'relative', 'domain']) < 0) {
		return url;
	}
	host = host || location.protocol + '//' + location.host;
	if (pathname === undefined) {
		var m = location.pathname.match(/^(\/.*)\//);
		pathname = m ? m[1] : '';
	}
	var match;
	if ((match = /^(\w+:\/\/[^\/]*)/.exec(url))) {
		if (match[1] !== host) {
			return url;
		}
	} else if (/^\w+:/.test(url)) {
		return url;
	}
	function getRealPath(path) {
		var parts = path.split('/'), paths = [];
		for (var i = 0, len = parts.length; i < len; i++) {
			var part = parts[i];
			if (part == '..') {
				if (paths.length > 0) {
					paths.pop();
				}
			} else if (part !== '' && part != '.') {
				paths.push(part);
			}
		}
		return '/' + paths.join('/');
	}
	if (/^\//.test(url)) {

		url = host + getRealPath(url.substr(1));
	} else if (!/^\w+:\/\//.test(url)) {
		url = host + getRealPath(pathname + '/' + url);
	}
	function getRelativePath(path, depth) {
		if (url.substr(0, path.length) === path) {
			var arr = [];
			for (var i = 0; i < depth; i++) {
				arr.push('..');
			}
			var prefix = '.';
			if (arr.length > 0) {
				prefix += '/' + arr.join('/');
			}
			if (pathname == '/') {
				prefix += '/';
			}
			return prefix + url.substr(path.length);
		} else {
			if ((match = /^(.*)\//.exec(path))) {
				return getRelativePath(match[1], ++depth);
			}
		}
	}
	if (mode === 'relative') {
		url = getRelativePath(host + pathname, 0).substr(2);
	} else if (mode === 'absolute') {
		if (url.substr(0, host.length) === host) {
			url = url.substr(host.length);
		}
	}
	return url;
}
function _formatHtml(html, htmlTags, urlType, wellFormatted, indentChar) {
	urlType = urlType || '';
	wellFormatted = _undef(wellFormatted, false);
	indentChar = _undef(indentChar, '\t');
	var fontSizeList = 'xx-small,x-small,small,medium,large,x-large,xx-large'.split(',');
	html = html.replace(/(<(?:pre|pre\s[^>]*)>)([\s\S]*?)(<\/pre>)/ig, function($0, $1, $2, $3) {
		return $1 + $2.replace(/<(?:br|br\s[^>]*)>/ig, '\n') + $3;
	});
	html = html.replace(/<(?:br|br\s[^>]*)\s*\/?>\s*<\/p>/ig, '</p>');
	html = html.replace(/(<(?:p|p\s[^>]*)>)\s*(<\/p>)/ig, '$1<br />$2');
	html = html.replace(/\u200B/g, '');
	html = html.replace(/\u00A9/g, '&copy;');
	var htmlTagMap = {};
	if (htmlTags) {
		_each(htmlTags, function(key, val) {
			var arr = key.split(',');
			for (var i = 0, len = arr.length; i < len; i++) {
				htmlTagMap[arr[i]] = _toMap(val);
			}
		});
		if (!htmlTagMap.script) {
			html = html.replace(/(<(?:script|script\s[^>]*)>)([\s\S]*?)(<\/script>)/ig, '');
		}
		if (!htmlTagMap.style) {
			html = html.replace(/(<(?:style|style\s[^>]*)>)([\s\S]*?)(<\/style>)/ig, '');
		}
	}
	var re = /([ \t\n\r]*)<(\/)?([\w\-:]+)((?:\s+|(?:\s+[\w\-:]+)|(?:\s+[\w\-:]+=[^\s"'<>]+)|(?:\s+[\w\-:"]+="[^"]*")|(?:\s+[\w\-:"]+='[^']*'))*)(\/)?>([ \t\n\r]*)/g;
	var tagStack = [];
	html = html.replace(re, function($0, $1, $2, $3, $4, $5, $6) {
		var full = $0,
			startNewline = $1 || '',
			startSlash = $2 || '',
			tagName = $3.toLowerCase(),
			attr = $4 || '',
			endSlash = $5 ? ' ' + $5 : '',
			endNewline = $6 || '';
		if (htmlTags && !htmlTagMap[tagName]) {
			return '';
		}
		if (endSlash === '' && _SINGLE_TAG_MAP[tagName]) {
			endSlash = ' /';
		}
		if (_INLINE_TAG_MAP[tagName]) {
			if (startNewline) {
				startNewline = ' ';
			}
			if (endNewline) {
				endNewline = ' ';
			}
		}
		if (_PRE_TAG_MAP[tagName]) {
			if (startSlash) {
				endNewline = '\n';
			} else {
				startNewline = '\n';
			}
		}
		if (wellFormatted && tagName == 'br') {
			endNewline = '\n';
		}
		if (_BLOCK_TAG_MAP[tagName] && !_PRE_TAG_MAP[tagName]) {
			if (wellFormatted) {
				if (startSlash && tagStack.length > 0 && tagStack[tagStack.length - 1] === tagName) {
					tagStack.pop();
				} else {
					tagStack.push(tagName);
				}
				startNewline = '\n';
				endNewline = '\n';
				for (var i = 0, len = startSlash ? tagStack.length : tagStack.length - 1; i < len; i++) {
					startNewline += indentChar;
					if (!startSlash) {
						endNewline += indentChar;
					}
				}
				if (endSlash) {
					tagStack.pop();
				} else if (!startSlash) {
					endNewline += indentChar;
				}
			} else {
				startNewline = endNewline = '';
			}
		}
		if (attr !== '') {
			var attrMap = _getAttrList(full);
			if (tagName === 'font') {
				var fontStyleMap = {}, fontStyle = '';
				_each(attrMap, function(key, val) {
					if (key === 'color') {
						fontStyleMap.color = val;
						delete attrMap[key];
					}
					if (key === 'size') {
						fontStyleMap['font-size'] = fontSizeList[parseInt(val, 10) - 1] || '';
						delete attrMap[key];
					}
					if (key === 'face') {
						fontStyleMap['font-family'] = val;
						delete attrMap[key];
					}
					if (key === 'style') {
						fontStyle = val;
					}
				});
				if (fontStyle && !/;$/.test(fontStyle)) {
					fontStyle += ';';
				}
				_each(fontStyleMap, function(key, val) {
					if (val === '') {
						return;
					}
					if (/\s/.test(val)) {
						val = "'" + val + "'";
					}
					fontStyle += key + ':' + val + ';';
				});
				attrMap.style = fontStyle;
			}
			_each(attrMap, function(key, val) {
				if (_FILL_ATTR_MAP[key]) {
					attrMap[key] = key;
				}
				if (_inArray(key, ['src', 'href']) >= 0) {
					attrMap[key] = _formatUrl(val, urlType);
				}
				if (htmlTags && key !== 'style' && !htmlTagMap[tagName]['*'] && !htmlTagMap[tagName][key] ||
					tagName === 'body' && key === 'contenteditable' ||
					/^kindeditor_\d+$/.test(key)) {
					delete attrMap[key];
				}
				if (key === 'style' && val !== '') {
					var styleMap = _getCssList(val);
					_each(styleMap, function(k, v) {
						if (htmlTags && !htmlTagMap[tagName].style && !htmlTagMap[tagName]['.' + k]) {
							delete styleMap[k];
						}
					});
					var style = '';
					_each(styleMap, function(k, v) {
						style += k + ':' + v + ';';
					});
					attrMap.style = style;
				}
			});
			attr = '';
			_each(attrMap, function(key, val) {
				if (key === 'style' && val === '') {
					return;
				}
				val = val.replace(/"/g, '&quot;');
				attr += ' ' + key + '="' + val + '"';
			});
		}
		if (tagName === 'font') {
			tagName = 'span';
		}
		return startNewline + '<' + startSlash + tagName + attr + endSlash + '>' + endNewline;
	});
	html = html.replace(/(<(?:pre|pre\s[^>]*)>)([\s\S]*?)(<\/pre>)/ig, function($0, $1, $2, $3) {
		return $1 + $2.replace(/\n/g, '<span id="__kindeditor_pre_newline__">\n') + $3;
	});
	html = html.replace(/\n\s*\n/g, '\n');
	html = html.replace(/<span id="__kindeditor_pre_newline__">\n/g, '\n');
	return _trim(html);
}
function _clearMsWord(html, htmlTags) {
	html = html.replace(/<meta[\s\S]*?>/ig, '')
		.replace(/<![\s\S]*?>/ig, '')
		.replace(/<style[^>]*>[\s\S]*?<\/style>/ig, '')
		.replace(/<script[^>]*>[\s\S]*?<\/script>/ig, '')
		.replace(/<w:[^>]+>[\s\S]*?<\/w:[^>]+>/ig, '')
		.replace(/<o:[^>]+>[\s\S]*?<\/o:[^>]+>/ig, '')
		.replace(/<xml>[\s\S]*?<\/xml>/ig, '')
		.replace(/<(?:table|td)[^>]*>/ig, function(full) {
			return full.replace(/border-bottom:([#\w\s]+)/ig, 'border:$1');
		});
	return _formatHtml(html, htmlTags);
}
function _mediaType(src) {
	if (/\.(rm|rmvb)(\?|$)/i.test(src)) {
		return 'audio/x-pn-realaudio-plugin';
	}
	if (/\.(swf|flv)(\?|$)/i.test(src)) {
		return 'application/x-shockwave-flash';
	}
	return 'video/x-ms-asf-plugin';
}
function _mediaClass(type) {
	if (/realaudio/i.test(type)) {
		return 'ke-rm';
	}
	if (/flash/i.test(type)) {
		return 'ke-flash';
	}
	return 'ke-media';
}
function _mediaAttrs(srcTag) {
	return _getAttrList(unescape(srcTag));
}
function _mediaEmbed(attrs) {
	var html = '<embed ';
	_each(attrs, function(key, val) {
		html += key + '="' + val + '" ';
	});
	html += '/>';
	return html;
}
function _mediaImg(blankPath, attrs) {
	var width = attrs.width,
		height = attrs.height,
		type = attrs.type || _mediaType(attrs.src),
		srcTag = _mediaEmbed(attrs),
		style = '';
	if (width > 0) {
		style += 'width:' + width + 'px;';
	}
	if (height > 0) {
		style += 'height:' + height + 'px;';
	}
	var html = '<img class="' + _mediaClass(type) + '" src="' + blankPath + '" ';
	if (style !== '') {
		html += 'style="' + style + '" ';
	}
	html += 'data-ke-tag="' + escape(srcTag) + '" alt="" />';
	return html;
}
function _tmpl(str, data) {
	var fn = new Function("obj",
		"var p=[],print=function(){p.push.apply(p,arguments);};" +
		"with(obj){p.push('" +
		str.replace(/[\r\t\n]/g, " ")
			.split("<%").join("\t")
			.replace(/((^|%>)[^\t]*)'/g, "$1\r")
			.replace(/\t=(.*?)%>/g, "',$1,'")
			.split("\t").join("');")
			.split("%>").join("p.push('")
			.split("\r").join("\\'") + "');}return p.join('');");
	return data ? fn(data) : fn;
}
K.formatUrl = _formatUrl;
K.formatHtml = _formatHtml;
K.getCssList = _getCssList;
K.getAttrList = _getAttrList;
K.mediaType = _mediaType;
K.mediaAttrs = _mediaAttrs;
K.mediaEmbed = _mediaEmbed;
K.mediaImg = _mediaImg;
K.clearMsWord = _clearMsWord;
K.tmpl = _tmpl;
function _contains(nodeA, nodeB) {
	if (nodeA.nodeType == 9 && nodeB.nodeType != 9) {
		return true;
	}
	while ((nodeB = nodeB.parentNode)) {
		if (nodeB == nodeA) {
			return true;
		}
	}
	return false;
}
var _getSetAttrDiv = document.createElement('div');
_getSetAttrDiv.setAttribute('className', 't');
var _GET_SET_ATTRIBUTE = _getSetAttrDiv.className !== 't';
function _getAttr(el, key) {
	key = key.toLowerCase();
	var val = null;
	if (!_GET_SET_ATTRIBUTE && el.nodeName.toLowerCase() != 'script') {
		var div = el.ownerDocument.createElement('div');
		div.appendChild(el.cloneNode(false));
		var list = _getAttrList(_unescape(div.innerHTML));
		if (key in list) {
			val = list[key];
		}
	} else {
		try {
			val = el.getAttribute(key, 2);
		} catch(e) {
			val = el.getAttribute(key, 1);
		}
	}
	if (key === 'style' && val !== null) {
		val = _formatCss(val);
	}
	return val;
}
function _queryAll(expr, root) {
	var exprList = expr.split(',');
	if (exprList.length > 1) {
		var mergedResults = [];
		_each(exprList, function() {
			_each(_queryAll(this, root), function() {
				if (_inArray(this, mergedResults) < 0) {
					mergedResults.push(this);
				}
			});
		});
		return mergedResults;
	}
	root = root || document;
	function escape(str) {
		if (typeof str != 'string') {
			return str;
		}
		return str.replace(/([^\w\-])/g, '\\$1');
	}
	function stripslashes(str) {
		return str.replace(/\\/g, '');
	}
	function cmpTag(tagA, tagB) {
		return tagA === '*' || tagA.toLowerCase() === escape(tagB.toLowerCase());
	}
	function byId(id, tag, root) {
		var arr = [],
			doc = root.ownerDocument || root,
			el = doc.getElementById(stripslashes(id));
		if (el) {
			if (cmpTag(tag, el.nodeName) && _contains(root, el)) {
				arr.push(el);
			}
		}
		return arr;
	}
	function byClass(className, tag, root) {
		var doc = root.ownerDocument || root, arr = [], els, i, len, el;
		if (root.getElementsByClassName) {
			els = root.getElementsByClassName(stripslashes(className));
			for (i = 0, len = els.length; i < len; i++) {
				el = els[i];
				if (cmpTag(tag, el.nodeName)) {
					arr.push(el);
				}
			}
		} else if (doc.querySelectorAll) {
			els = doc.querySelectorAll((root.nodeName !== '#document' ? root.nodeName + ' ' : '') + tag + '.' + className);
			for (i = 0, len = els.length; i < len; i++) {
				el = els[i];
				if (_contains(root, el)) {
					arr.push(el);
				}
			}
		} else {
			els = root.getElementsByTagName(tag);
			className = ' ' + className + ' ';
			for (i = 0, len = els.length; i < len; i++) {
				el = els[i];
				if (el.nodeType == 1) {
					var cls = el.className;
					if (cls && (' ' + cls + ' ').indexOf(className) > -1) {
						arr.push(el);
					}
				}
			}
		}
		return arr;
	}
	function byName(name, tag, root) {
		var arr = [], doc = root.ownerDocument || root,
			els = doc.getElementsByName(stripslashes(name)), el;
		for (var i = 0, len = els.length; i < len; i++) {
			el = els[i];
			if (cmpTag(tag, el.nodeName) && _contains(root, el)) {
				if (el.getAttributeNode('name')) {
					arr.push(el);
				}
			}
		}
		return arr;
	}
	function byAttr(key, val, tag, root) {
		var arr = [], els = root.getElementsByTagName(tag), el;
		for (var i = 0, len = els.length; i < len; i++) {
			el = els[i];
			if (el.nodeType == 1) {
				if (val === null) {
					if (_getAttr(el, key) !== null) {
						arr.push(el);
					}
				} else {
					if (val === escape(_getAttr(el, key))) {
						arr.push(el);
					}
				}
			}
		}
		return arr;
	}
	function select(expr, root) {
		var arr = [], matches;
		matches = /^((?:\\.|[^.#\s\[<>])+)/.exec(expr);
		var tag = matches ? matches[1] : '*';
		if ((matches = /#((?:[\w\-]|\\.)+)$/.exec(expr))) {
			arr = byId(matches[1], tag, root);
		} else if ((matches = /\.((?:[\w\-]|\\.)+)$/.exec(expr))) {
			arr = byClass(matches[1], tag, root);
		} else if ((matches = /\[((?:[\w\-]|\\.)+)\]/.exec(expr))) {
			arr = byAttr(matches[1].toLowerCase(), null, tag, root);
		} else if ((matches = /\[((?:[\w\-]|\\.)+)\s*=\s*['"]?((?:\\.|[^'"]+)+)['"]?\]/.exec(expr))) {
			var key = matches[1].toLowerCase(), val = matches[2];
			if (key === 'id') {
				arr = byId(val, tag, root);
			} else if (key === 'class') {
				arr = byClass(val, tag, root);
			} else if (key === 'name') {
				arr = byName(val, tag, root);
			} else {
				arr = byAttr(key, val, tag, root);
			}
		} else {
			var els = root.getElementsByTagName(tag), el;
			for (var i = 0, len = els.length; i < len; i++) {
				el = els[i];
				if (el.nodeType == 1) {
					arr.push(el);
				}
			}
		}
		return arr;
	}
	var parts = [], arr, re = /((?:\\.|[^\s>])+|[\s>])/g;
	while ((arr = re.exec(expr))) {
		if (arr[1] !== ' ') {
			parts.push(arr[1]);
		}
	}
	var results = [];
	if (parts.length == 1) {
		return select(parts[0], root);
	}
	var isChild = false, part, els, subResults, val, v, i, j, k, length, len, l;
	for (i = 0, lenth = parts.length; i < lenth; i++) {
		part = parts[i];
		if (part === '>') {
			isChild = true;
			continue;
		}
		if (i > 0) {
			els = [];
			for (j = 0, len = results.length; j < len; j++) {
				val = results[j];
				subResults = select(part, val);
				for (k = 0, l = subResults.length; k < l; k++) {
					v = subResults[k];
					if (isChild) {
						if (val === v.parentNode) {
							els.push(v);
						}
					} else {
						els.push(v);
					}
				}
			}
			results = els;
		} else {
			results = select(part, root);
		}
		if (results.length === 0) {
			return [];
		}
	}
	return results;
}
function _query(expr, root) {
	var arr = _queryAll(expr, root);
	return arr.length > 0 ? arr[0] : null;
}
K.query = _query;
K.queryAll = _queryAll;
function _get(val) {
	return K(val)[0];
}
function _getDoc(node) {
	if (!node) {
		return document;
	}
	return node.ownerDocument || node.document || node;
}
function _getWin(node) {
	if (!node) {
		return window;
	}
	var doc = _getDoc(node);
	return doc.parentWindow || doc.defaultView;
}
function _setHtml(el, html) {
	if (el.nodeType != 1) {
		return;
	}
	var doc = _getDoc(el);
	try {
		el.innerHTML = '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + html;
		var temp = doc.getElementById('__kindeditor_temp_tag__');
		temp.parentNode.removeChild(temp);
	} catch(e) {
		K(el).empty();
		K('@' + html, doc).each(function() {
			el.appendChild(this);
		});
	}
}
function _hasClass(el, cls) {
	return _inString(cls, el.className, ' ');
}
function _setAttr(el, key, val) {
	if (_IE && _V < 8 && key.toLowerCase() == 'class') {
		key = 'className';
	}
	el.setAttribute(key, '' + val);
}
function _removeAttr(el, key) {
	if (_IE && _V < 8 && key.toLowerCase() == 'class') {
		key = 'className';
	}
	_setAttr(el, key, '');
	el.removeAttribute(key);
}
function _getNodeName(node) {
	if (!node || !node.nodeName) {
		return '';
	}
	return node.nodeName.toLowerCase();
}
function _computedCss(el, key) {
	var self = this, win = _getWin(el), camelKey = _toCamel(key), val = '';
	if (win.getComputedStyle) {
		var style = win.getComputedStyle(el, null);
		val = style[camelKey] || style.getPropertyValue(key) || el.style[camelKey];
	} else if (el.currentStyle) {
		val = el.currentStyle[camelKey] || el.style[camelKey];
	}
	return val;
}
function _hasVal(node) {
	return !!_VALUE_TAG_MAP[_getNodeName(node)];
}
function _docElement(doc) {
	doc = doc || document;
	return _QUIRKS ? doc.body : doc.documentElement;
}
function _docHeight(doc) {
	var el = _docElement(doc);
	return Math.max(el.scrollHeight, el.clientHeight);
}
function _docWidth(doc) {
	var el = _docElement(doc);
	return Math.max(el.scrollWidth, el.clientWidth);
}
function _getScrollPos(doc) {
	doc = doc || document;
	var x, y;

	if (_IE || _OPERA) {
		x = _docElement(doc).scrollLeft;
		y = _docElement(doc).scrollTop;
	} else {
		x = _getWin(doc).scrollX;
		y = _getWin(doc).scrollY;
	}
	return {x : x, y : y};
}
function KNode(node) {
	this.init(node);
}
_extend(KNode, {
	init : function(node) {
		var self = this;
		node = _isArray(node) ? node : [node];
		var length = 0;
		for (var i = 0, len = node.length; i < len; i++) {
			if (node[i]) {
				self[i] = node[i].constructor === KNode ? node[i][0] : node[i];
				length++;
			}
		}
		self.length = length;
		self.doc = _getDoc(self[0]);
		self.name = _getNodeName(self[0]);
		self.type = self.length > 0 ? self[0].nodeType : null;
		self.win = _getWin(self[0]);
	},
	each : function(fn) {
		var self = this;
		for (var i = 0; i < self.length; i++) {
			if (fn.call(self[i], i, self[i]) === false) {
				return self;
			}
		}
		return self;
	},
	bind : function(type, fn) {
		this.each(function() {
			_bind(this, type, fn);
		});
		return this;
	},
	unbind : function(type, fn) {
		this.each(function() {
			_unbind(this, type, fn);
		});
		return this;
	},
	fire : function(type) {
		if (this.length < 1) {
			return this;
		}
		_fire(this[0], type);
		return this;
	},
	hasAttr : function(key) {
		if (this.length < 1) {
			return false;
		}
		return !!_getAttr(this[0], key);
	},
	attr : function(key, val) {
		var self = this;
		if (key === undefined) {
			return _getAttrList(self.outer());
		}
		if (typeof key === 'object') {
			_each(key, function(k, v) {
				self.attr(k, v);
			});
			return self;
		}
		if (val === undefined) {
			val = self.length < 1 ? null : _getAttr(self[0], key);
			return val === null ? '' : val;
		}
		self.each(function() {
			_setAttr(this, key, val);
		});
		return self;
	},
	removeAttr : function(key) {
		this.each(function() {
			_removeAttr(this, key);
		});
		return this;
	},
	get : function(i) {
		if (this.length < 1) {
			return null;
		}
		return this[i || 0];
	},
	eq : function(i) {
		if (this.length < 1) {
			return null;
		}
		return this[i] ? new KNode(this[i]) : null;
	},
	hasClass : function(cls) {
		if (this.length < 1) {
			return false;
		}
		return _hasClass(this[0], cls);
	},
	addClass : function(cls) {
		this.each(function() {
			if (!_hasClass(this, cls)) {
				this.className = _trim(this.className + ' ' + cls);
			}
		});
		return this;
	},
	removeClass : function(cls) {
		this.each(function() {
			if (_hasClass(this, cls)) {
				this.className = _trim(this.className.replace(new RegExp('(^|\\s)' + cls + '(\\s|$)'), ' '));
			}
		});
		return this;
	},
	html : function(val) {
		var self = this;
		if (val === undefined) {
			if (self.length < 1 || self.type != 1) {
				return '';
			}
			return _formatHtml(self[0].innerHTML);
		}
		self.each(function() {
			_setHtml(this, val);
		});
		return self;
	},
	text : function() {
		var self = this;
		if (self.length < 1) {
			return '';
		}
		return _IE ? self[0].innerText : self[0].textContent;
	},
	hasVal : function() {
		if (this.length < 1) {
			return false;
		}
		return _hasVal(this[0]);
	},
	val : function(val) {
		var self = this;
		if (val === undefined) {
			if (self.length < 1) {
				return '';
			}
			return self.hasVal() ? self[0].value : self.attr('value');
		} else {
			self.each(function() {
				if (_hasVal(this)) {
					this.value = val;
				} else {
					_setAttr(this, 'value' , val);
				}
			});
			return self;
		}
	},
	css : function(key, val) {
		var self = this;
		if (key === undefined) {
			return _getCssList(self.attr('style'));
		}
		if (typeof key === 'object') {
			_each(key, function(k, v) {
				self.css(k, v);
			});
			return self;
		}
		if (val === undefined) {
			if (self.length < 1) {
				return '';
			}
			return self[0].style[_toCamel(key)] || _computedCss(self[0], key) || '';
		}
		self.each(function() {
			this.style[_toCamel(key)] = val;
		});
		return self;
	},
	width : function(val) {
		var self = this;
		if (val === undefined) {
			if (self.length < 1) {
				return 0;
			}
			return self[0].offsetWidth;
		}
		return self.css('width', _addUnit(val));
	},
	height : function(val) {
		var self = this;
		if (val === undefined) {
			if (self.length < 1) {
				return 0;
			}
			return self[0].offsetHeight;
		}
		return self.css('height', _addUnit(val));
	},
	opacity : function(val) {
		this.each(function() {
			if (this.style.opacity === undefined) {
				this.style.filter = val == 1 ? '' : 'alpha(opacity=' + (val * 100) + ')';
			} else {
				this.style.opacity = val == 1 ? '' : val;
			}
		});
		return this;
	},
	data : function(key, val) {
		var self = this;
		key = 'kindeditor_data_' + key;
		if (val === undefined) {
			if (self.length < 1) {
				return null;
			}
			return self[0][key];
		}
		this.each(function() {
			this[key] = val;
		});
		return self;
	},
	pos : function() {
		var self = this, node = self[0], x = 0, y = 0;
		if (node) {
			if (node.getBoundingClientRect) {
				var box = node.getBoundingClientRect(),
					pos = _getScrollPos(self.doc);
				x = box.left + pos.x;
				y = box.top + pos.y;
			} else {
				while (node) {
					x += node.offsetLeft;
					y += node.offsetTop;
					node = node.offsetParent;
				}
			}
		}
		return {x : _round(x), y : _round(y)};
	},
	clone : function(bool) {
		if (this.length < 1) {
			return new KNode([]);
		}
		return new KNode(this[0].cloneNode(bool));
	},
	append : function(expr) {
		this.each(function() {
			if (this.appendChild) {
				this.appendChild(_get(expr));
			}
		});
		return this;
	},
	appendTo : function(expr) {
		this.each(function() {
			_get(expr).appendChild(this);
		});
		return this;
	},
	before : function(expr) {
		this.each(function() {
			this.parentNode.insertBefore(_get(expr), this);
		});
		return this;
	},
	after : function(expr) {
		this.each(function() {
			if (this.nextSibling) {
				this.parentNode.insertBefore(_get(expr), this.nextSibling);
			} else {
				this.parentNode.appendChild(_get(expr));
			}
		});
		return this;
	},
	replaceWith : function(expr) {
		var nodes = [];
		this.each(function(i, node) {
			_unbind(node);
			var newNode = _get(expr);
			node.parentNode.replaceChild(newNode, node);
			nodes.push(newNode);
		});
		return K(nodes);
	},
	empty : function() {
		var self = this;
		self.each(function(i, node) {
			var child = node.firstChild;
			while (child) {
				if (!node.parentNode) {
					return;
				}
				var next = child.nextSibling;
				child.parentNode.removeChild(child);
				child = next;
			}
		});
		return self;
	},
	remove : function(keepChilds) {
		var self = this;
		self.each(function(i, node) {
			if (!node.parentNode) {
				return;
			}
			_unbind(node);
			if (keepChilds) {
				var child = node.firstChild;
				while (child) {
					var next = child.nextSibling;
					node.parentNode.insertBefore(child, node);
					child = next;
				}
			}
			node.parentNode.removeChild(node);
			delete self[i];
		});
		self.length = 0;
		return self;
	},
	show : function(val) {
		var self = this;
		if (val === undefined) {
			val = self._originDisplay || '';
		}
		if (self.css('display') != 'none') {
			return self;
		}
		return self.css('display', val);
	},
	hide : function() {
		var self = this;
		if (self.length < 1) {
			return self;
		}
		self._originDisplay = self[0].style.display;
		return self.css('display', 'none');
	},
	outer : function() {
		var self = this;
		if (self.length < 1) {
			return '';
		}
		var div = self.doc.createElement('div'), html;
		div.appendChild(self[0].cloneNode(true));
		html = _formatHtml(div.innerHTML);
		div = null;
		return html;
	},
	isSingle : function() {
		return !!_SINGLE_TAG_MAP[this.name];
	},
	isInline : function() {
		return !!_INLINE_TAG_MAP[this.name];
	},
	isBlock : function() {
		return !!_BLOCK_TAG_MAP[this.name];
	},
	isStyle : function() {
		return !!_STYLE_TAG_MAP[this.name];
	},
	isControl : function() {
		return !!_CONTROL_TAG_MAP[this.name];
	},
	contains : function(otherNode) {
		if (this.length < 1) {
			return false;
		}
		return _contains(this[0], _get(otherNode));
	},
	parent : function() {
		if (this.length < 1) {
			return null;
		}
		var node = this[0].parentNode;
		return node ? new KNode(node) : null;
	},
	children : function() {
		if (this.length < 1) {
			return new KNode([]);
		}
		var list = [], child = this[0].firstChild;
		while (child) {
			if (child.nodeType != 3 || _trim(child.nodeValue) !== '') {
				list.push(child);
			}
			child = child.nextSibling;
		}
		return new KNode(list);
	},
	first : function() {
		var list = this.children();
		return list.length > 0 ? list.eq(0) : null;
	},
	last : function() {
		var list = this.children();
		return list.length > 0 ? list.eq(list.length - 1) : null;
	},
	index : function() {
		if (this.length < 1) {
			return -1;
		}
		var i = -1, sibling = this[0];
		while (sibling) {
			i++;
			sibling = sibling.previousSibling;
		}
		return i;
	},
	prev : function() {
		if (this.length < 1) {
			return null;
		}
		var node = this[0].previousSibling;
		return node ? new KNode(node) : null;
	},
	next : function() {
		if (this.length < 1) {
			return null;
		}
		var node = this[0].nextSibling;
		return node ? new KNode(node) : null;
	},
	scan : function(fn, order) {
		if (this.length < 1) {
			return;
		}
		order = (order === undefined) ? true : order;
		function walk(node) {
			var n = order ? node.firstChild : node.lastChild;
			while (n) {
				var next = order ? n.nextSibling : n.previousSibling;
				if (fn(n) === false) {
					return false;
				}
				if (walk(n) === false) {
					return false;
				}
				n = next;
			}
		}
		walk(this[0]);
		return this;
	}
});
_each(('blur,focus,focusin,focusout,load,resize,scroll,unload,click,dblclick,' +
	'mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,' +
	'change,select,submit,keydown,keypress,keyup,error,contextmenu').split(','), function(i, type) {
	KNode.prototype[type] = function(fn) {
		return fn ? this.bind(type, fn) : this.fire(type);
	};
});
var _K = K;
K = function(expr, root) {
	if (expr === undefined || expr === null) {
		return;
	}
	function newNode(node) {
		if (!node[0]) {
			node = [];
		}
		return new KNode(node);
	}
	if (typeof expr === 'string') {
		if (root) {
			root = _get(root);
		}
		var length = expr.length;
		if (expr.charAt(0) === '@') {
			expr = expr.substr(1);
		}
		if (expr.length !== length || /<.+>/.test(expr)) {
			var doc = root ? root.ownerDocument || root : document,
				div = doc.createElement('div'), list = [];
			div.innerHTML = '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + expr;
			for (var i = 0, len = div.childNodes.length; i < len; i++) {
				var child = div.childNodes[i];
				if (child.id == '__kindeditor_temp_tag__') {
					continue;
				}
				list.push(child);
			}
			return newNode(list);
		}
		return newNode(_queryAll(expr, root));
	}
	if (expr && expr.constructor === KNode) {
		return expr;
	}
	if (expr.toArray) {
		expr = expr.toArray();
	}
	if (_isArray(expr)) {
		return newNode(expr);
	}
	return newNode(_toArray(arguments));
};
_each(_K, function(key, val) {
	K[key] = val;
});
K.NodeClass = KNode;
window.KindEditor = K;
var _START_TO_START = 0,
	_START_TO_END = 1,
	_END_TO_END = 2,
	_END_TO_START = 3,
	_BOOKMARK_ID = 0;
function _updateCollapsed(range) {
	range.collapsed = (range.startContainer === range.endContainer && range.startOffset === range.endOffset);
	return range;
}
function _copyAndDelete(range, isCopy, isDelete) {
	var doc = range.doc, nodeList = [];
	function splitTextNode(node, startOffset, endOffset) {
		var length = node.nodeValue.length, centerNode;
		if (isCopy) {
			var cloneNode = node.cloneNode(true);
			if (startOffset > 0) {
				centerNode = cloneNode.splitText(startOffset);
			} else {
				centerNode = cloneNode;
			}
			if (endOffset < length) {
				centerNode.splitText(endOffset - startOffset);
			}
		}
		if (isDelete) {
			var center = node;
			if (startOffset > 0) {
				center = node.splitText(startOffset);
				range.setStart(node, startOffset);
			}
			if (endOffset < length) {
				var right = center.splitText(endOffset - startOffset);
				range.setEnd(right, 0);
			}
			nodeList.push(center);
		}
		return centerNode;
	}
	function removeNodes() {
		if (isDelete) {
			range.up().collapse(true);
		}
		for (var i = 0, len = nodeList.length; i < len; i++) {
			var node = nodeList[i];
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}
	}
	var copyRange = range.cloneRange().down();
	var start = -1, incStart = -1, incEnd = -1, end = -1,
		ancestor = range.commonAncestor(), frag = doc.createDocumentFragment();
	if (ancestor.nodeType == 3) {
		var textNode = splitTextNode(ancestor, range.startOffset, range.endOffset);
		if (isCopy) {
			frag.appendChild(textNode);
		}
		removeNodes();
		return isCopy ? frag : range;
	}
	function extractNodes(parent, frag) {
		var node = parent.firstChild, nextNode;
		while (node) {
			var testRange = new KRange(doc).selectNode(node);
			start = testRange.compareBoundaryPoints(_START_TO_END, range);
			if (start >= 0 && incStart <= 0) {
				incStart = testRange.compareBoundaryPoints(_START_TO_START, range);
			}
			if (incStart >= 0 && incEnd <= 0) {
				incEnd = testRange.compareBoundaryPoints(_END_TO_END, range);
			}
			if (incEnd >= 0 && end <= 0) {
				end = testRange.compareBoundaryPoints(_END_TO_START, range);
			}
			if (end >= 0) {
				return false;
			}
			nextNode = node.nextSibling;
			if (start > 0) {
				if (node.nodeType == 1) {
					if (incStart >= 0 && incEnd <= 0) {
						if (isCopy) {
							frag.appendChild(node.cloneNode(true));
						}
						if (isDelete) {
							nodeList.push(node);
						}
					} else {
						var childFlag;
						if (isCopy) {
							childFlag = node.cloneNode(false);
							frag.appendChild(childFlag);
						}
						if (extractNodes(node, childFlag) === false) {
							return false;
						}
					}
				} else if (node.nodeType == 3) {
					var textNode;
					if (node == copyRange.startContainer) {
						textNode = splitTextNode(node, copyRange.startOffset, node.nodeValue.length);
					} else if (node == copyRange.endContainer) {
						textNode = splitTextNode(node, 0, copyRange.endOffset);
					} else {
						textNode = splitTextNode(node, 0, node.nodeValue.length);
					}
					if (isCopy) {
						try {
							frag.appendChild(textNode);
						} catch(e) {}
					}
				}
			}
			node = nextNode;
		}
	}
	extractNodes(ancestor, frag);
	if (isDelete) {
		range.up().collapse(true);
	}
	for (var i = 0, len = nodeList.length; i < len; i++) {
		var node = nodeList[i];
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}
	return isCopy ? frag : range;
}
function _moveToElementText(range, el) {
	var node = el;
	while (node) {
		var knode = K(node);
		if (knode.name == 'marquee' || knode.name == 'select') {
			return;
		}
		node = node.parentNode;
	}
	try {
		range.moveToElementText(el);
	} catch(e) {}
}
function _getStartEnd(rng, isStart) {
	var doc = rng.parentElement().ownerDocument,
		pointRange = rng.duplicate();
	pointRange.collapse(isStart);
	var parent = pointRange.parentElement(),
		nodes = parent.childNodes;
	if (nodes.length === 0) {
		return {node: parent.parentNode, offset: K(parent).index()};
	}
	var startNode = doc, startPos = 0, cmp = -1;
	var testRange = rng.duplicate();
	_moveToElementText(testRange, parent);
	for (var i = 0, len = nodes.length; i < len; i++) {
		var node = nodes[i];
		cmp = testRange.compareEndPoints('StartToStart', pointRange);
		if (cmp === 0) {
			return {node: node.parentNode, offset: i};
		}
		if (node.nodeType == 1) {
			var nodeRange = rng.duplicate(), dummy, knode = K(node), newNode = node;
			if (knode.isControl()) {
				dummy = doc.createElement('span');
				knode.after(dummy);
				newNode = dummy;
				startPos += knode.text().replace(/\r\n|\n|\r/g, '').length;
			}
			_moveToElementText(nodeRange, newNode);
			testRange.setEndPoint('StartToEnd', nodeRange);
			if (cmp > 0) {
				startPos += nodeRange.text.replace(/\r\n|\n|\r/g, '').length;
			} else {
				startPos = 0;
			}
			if (dummy) {
				K(dummy).remove();
			}
		} else if (node.nodeType == 3) {
			testRange.moveStart('character', node.nodeValue.length);
			startPos += node.nodeValue.length;
		}
		if (cmp < 0) {
			startNode = node;
		}
	}
	if (cmp < 0 && startNode.nodeType == 1) {
		return {node: parent, offset: K(parent.lastChild).index() + 1};
	}
	if (cmp > 0) {
		while (startNode.nextSibling && startNode.nodeType == 1) {
			startNode = startNode.nextSibling;
		}
	}
	testRange = rng.duplicate();
	_moveToElementText(testRange, parent);
	testRange.setEndPoint('StartToEnd', pointRange);
	startPos -= testRange.text.replace(/\r\n|\n|\r/g, '').length;
	if (cmp > 0 && startNode.nodeType == 3) {
		var prevNode = startNode.previousSibling;
		while (prevNode && prevNode.nodeType == 3) {
			startPos -= prevNode.nodeValue.length;
			prevNode = prevNode.previousSibling;
		}
	}
	return {node: startNode, offset: startPos};
}
function _getEndRange(node, offset) {
	var doc = node.ownerDocument || node,
		range = doc.body.createTextRange();
	if (doc == node) {
		range.collapse(true);
		return range;
	}
	if (node.nodeType == 1 && node.childNodes.length > 0) {
		var children = node.childNodes, isStart, child;
		if (offset === 0) {
			child = children[0];
			isStart = true;
		} else {
			child = children[offset - 1];
			isStart = false;
		}
		if (!child) {
			return range;
		}
		if (K(child).name === 'head') {
			if (offset === 1) {
				isStart = true;
			}
			if (offset === 2) {
				isStart = false;
			}
			range.collapse(isStart);
			return range;
		}
		if (child.nodeType == 1) {
			var kchild = K(child), span;
			if (kchild.isControl()) {
				span = doc.createElement('span');
				if (isStart) {
					kchild.before(span);
				} else {
					kchild.after(span);
				}
				child = span;
			}
			_moveToElementText(range, child);
			range.collapse(isStart);
			if (span) {
				K(span).remove();
			}
			return range;
		}
		node = child;
		offset = isStart ? 0 : child.nodeValue.length;
	}
	var dummy = doc.createElement('span');
	K(node).before(dummy);
	_moveToElementText(range, dummy);
	range.moveStart('character', offset);
	K(dummy).remove();
	return range;
}
function _toRange(rng) {
	var doc, range;
	function tr2td(start) {
		if (K(start.node).name == 'tr') {
			start.node = start.node.cells[start.offset];
			start.offset = 0;
		}
	}
	if (_IE) {
		if (rng.item) {
			doc = _getDoc(rng.item(0));
			range = new KRange(doc);
			range.selectNode(rng.item(0));
			return range;
		}
		doc = rng.parentElement().ownerDocument;
		var start = _getStartEnd(rng, true),
			end = _getStartEnd(rng, false);
		tr2td(start);
		tr2td(end);
		range = new KRange(doc);
		range.setStart(start.node, start.offset);
		range.setEnd(end.node, end.offset);
		return range;
	}
	var startContainer = rng.startContainer;
	doc = startContainer.ownerDocument || startContainer;
	range = new KRange(doc);
	range.setStart(startContainer, rng.startOffset);
	range.setEnd(rng.endContainer, rng.endOffset);
	return range;
}
function KRange(doc) {
	this.init(doc);
}
_extend(KRange, {
	init : function(doc) {
		var self = this;
		self.startContainer = doc;
		self.startOffset = 0;
		self.endContainer = doc;
		self.endOffset = 0;
		self.collapsed = true;
		self.doc = doc;
	},
	commonAncestor : function() {
		function getParents(node) {
			var parents = [];
			while (node) {
				parents.push(node);
				node = node.parentNode;
			}
			return parents;
		}
		var parentsA = getParents(this.startContainer),
			parentsB = getParents(this.endContainer),
			i = 0, lenA = parentsA.length, lenB = parentsB.length, parentA, parentB;
		while (++i) {
			parentA = parentsA[lenA - i];
			parentB = parentsB[lenB - i];
			if (!parentA || !parentB || parentA !== parentB) {
				break;
			}
		}
		return parentsA[lenA - i + 1];
	},
	setStart : function(node, offset) {
		var self = this, doc = self.doc;
		self.startContainer = node;
		self.startOffset = offset;
		if (self.endContainer === doc) {
			self.endContainer = node;
			self.endOffset = offset;
		}
		return _updateCollapsed(this);
	},
	setEnd : function(node, offset) {
		var self = this, doc = self.doc;
		self.endContainer = node;
		self.endOffset = offset;
		if (self.startContainer === doc) {
			self.startContainer = node;
			self.startOffset = offset;
		}
		return _updateCollapsed(this);
	},
	setStartBefore : function(node) {
		return this.setStart(node.parentNode || this.doc, K(node).index());
	},
	setStartAfter : function(node) {
		return this.setStart(node.parentNode || this.doc, K(node).index() + 1);
	},
	setEndBefore : function(node) {
		return this.setEnd(node.parentNode || this.doc, K(node).index());
	},
	setEndAfter : function(node) {
		return this.setEnd(node.parentNode || this.doc, K(node).index() + 1);
	},
	selectNode : function(node) {
		return this.setStartBefore(node).setEndAfter(node);
	},
	selectNodeContents : function(node) {
		var knode = K(node);
		if (knode.type == 3 || knode.isSingle()) {
			return this.selectNode(node);
		}
		var children = knode.children();
		if (children.length > 0) {
			return this.setStartBefore(children[0]).setEndAfter(children[children.length - 1]);
		}
		return this.setStart(node, 0).setEnd(node, 0);
	},
	collapse : function(toStart) {
		if (toStart) {
			return this.setEnd(this.startContainer, this.startOffset);
		}
		return this.setStart(this.endContainer, this.endOffset);
	},
	compareBoundaryPoints : function(how, range) {
		var rangeA = this.get(), rangeB = range.get();
		if (_IE) {
			var arr = {};
			arr[_START_TO_START] = 'StartToStart';
			arr[_START_TO_END] = 'EndToStart';
			arr[_END_TO_END] = 'EndToEnd';
			arr[_END_TO_START] = 'StartToEnd';
			var cmp = rangeA.compareEndPoints(arr[how], rangeB);
			if (cmp !== 0) {
				return cmp;
			}
			var nodeA, nodeB, nodeC, posA, posB;
			if (how === _START_TO_START || how === _END_TO_START) {
				nodeA = this.startContainer;
				posA = this.startOffset;
			}
			if (how === _START_TO_END || how === _END_TO_END) {
				nodeA = this.endContainer;
				posA = this.endOffset;
			}
			if (how === _START_TO_START || how === _START_TO_END) {
				nodeB = range.startContainer;
				posB = range.startOffset;
			}
			if (how === _END_TO_END || how === _END_TO_START) {
				nodeB = range.endContainer;
				posB = range.endOffset;
			}
			if (nodeA === nodeB) {
				var diff = posA - posB;
				return diff > 0 ? 1 : (diff < 0 ? -1 : 0);
			}
			nodeC = nodeB;
			while (nodeC && nodeC.parentNode !== nodeA) {
				nodeC = nodeC.parentNode;
			}
			if (nodeC) {
				return K(nodeC).index() >= posA ? -1 : 1;
			}
			nodeC = nodeA;
			while (nodeC && nodeC.parentNode !== nodeB) {
				nodeC = nodeC.parentNode;
			}
			if (nodeC) {
				return K(nodeC).index() >= posB ? 1 : -1;
			}
			nodeC = K(nodeB).next();
			if (nodeC && nodeC.contains(nodeA)) {
				return 1;
			}
			nodeC = K(nodeA).next();
			if (nodeC && nodeC.contains(nodeB)) {
				return -1;
			}
		} else {
			return rangeA.compareBoundaryPoints(how, rangeB);
		}
	},
	cloneRange : function() {
		return new KRange(this.doc).setStart(this.startContainer, this.startOffset).setEnd(this.endContainer, this.endOffset);
	},
	toString : function() {
		var rng = this.get(), str = _IE ? rng.text : rng.toString();
		return str.replace(/\r\n|\n|\r/g, '');
	},
	cloneContents : function() {
		return _copyAndDelete(this, true, false);
	},
	deleteContents : function() {
		return _copyAndDelete(this, false, true);
	},
	extractContents : function() {
		return _copyAndDelete(this, true, true);
	},
	insertNode : function(node) {
		var self = this,
			sc = self.startContainer, so = self.startOffset,
			ec = self.endContainer, eo = self.endOffset,
			firstChild, lastChild, c, nodeCount = 1;
		if (node.nodeName.toLowerCase() === '#document-fragment') {
			firstChild = node.firstChild;
			lastChild = node.lastChild;
			nodeCount = node.childNodes.length;
		}
		if (sc.nodeType == 1) {
			c = sc.childNodes[so];
			if (c) {
				sc.insertBefore(node, c);
				if (sc === ec) {
					eo += nodeCount;
				}
			} else {
				sc.appendChild(node);
			}
		} else if (sc.nodeType == 3) {
			if (so === 0) {
				sc.parentNode.insertBefore(node, sc);
				if (sc.parentNode === ec) {
					eo += nodeCount;
				}
			} else if (so >= sc.nodeValue.length) {
				if (sc.nextSibling) {
					sc.parentNode.insertBefore(node, sc.nextSibling);
				} else {
					sc.parentNode.appendChild(node);
				}
			} else {
				if (so > 0) {
					c = sc.splitText(so);
				} else {
					c = sc;
				}
				sc.parentNode.insertBefore(node, c);
				if (sc === ec) {
					ec = c;
					eo -= so;
				}
			}
		}
		if (firstChild) {
			self.setStartBefore(firstChild).setEndAfter(lastChild);
		} else {
			self.selectNode(node);
		}
		if (self.compareBoundaryPoints(_END_TO_END, self.cloneRange().setEnd(ec, eo)) >= 1) {
			return self;
		}
		return self.setEnd(ec, eo);
	},
	surroundContents : function(node) {
		node.appendChild(this.extractContents());
		return this.insertNode(node).selectNode(node);
	},
	isControl : function() {
		var self = this,
			sc = self.startContainer, so = self.startOffset,
			ec = self.endContainer, eo = self.endOffset, rng;
		return sc.nodeType == 1 && sc === ec && so + 1 === eo && K(sc.childNodes[so]).isControl();
	},
	get : function(hasControlRange) {
		var self = this, doc = self.doc, node, rng;
		if (!_IE) {
			rng = doc.createRange();
			try {
				rng.setStart(self.startContainer, self.startOffset);
				rng.setEnd(self.endContainer, self.endOffset);
			} catch (e) {}
			return rng;
		}
		if (hasControlRange && self.isControl()) {
			rng = doc.body.createControlRange();
			rng.addElement(self.startContainer.childNodes[self.startOffset]);
			return rng;
		}
		var range = self.cloneRange().down();
		rng = doc.body.createTextRange();
		rng.setEndPoint('StartToStart', _getEndRange(range.startContainer, range.startOffset));
		rng.setEndPoint('EndToStart', _getEndRange(range.endContainer, range.endOffset));
		return rng;
	},
	html : function() {
		return K(this.cloneContents()).outer();
	},
	down : function() {
		var self = this;
		function downPos(node, pos, isStart) {
			if (node.nodeType != 1) {
				return;
			}
			var children = K(node).children();
			if (children.length === 0) {
				return;
			}
			var left, right, child, offset;
			if (pos > 0) {
				left = children.eq(pos - 1);
			}
			if (pos < children.length) {
				right = children.eq(pos);
			}
			if (left && left.type == 3) {
				child = left[0];
				offset = child.nodeValue.length;
			}
			if (right && right.type == 3) {
				child = right[0];
				offset = 0;
			}
			if (!child) {
				return;
			}
			if (isStart) {
				self.setStart(child, offset);
			} else {
				self.setEnd(child, offset);
			}
		}
		downPos(self.startContainer, self.startOffset, true);
		downPos(self.endContainer, self.endOffset, false);
		return self;
	},
	up : function() {
		var self = this;
		function upPos(node, pos, isStart) {
			if (node.nodeType != 3) {
				return;
			}
			if (pos === 0) {
				if (isStart) {
					self.setStartBefore(node);
				} else {
					self.setEndBefore(node);
				}
			} else if (pos == node.nodeValue.length) {
				if (isStart) {
					self.setStartAfter(node);
				} else {
					self.setEndAfter(node);
				}
			}
		}
		upPos(self.startContainer, self.startOffset, true);
		upPos(self.endContainer, self.endOffset, false);
		return self;
	},
	enlarge : function(toBlock) {
		var self = this;
		self.up();
		function enlargePos(node, pos, isStart) {
			var knode = K(node), parent;
			if (knode.type == 3 || _NOSPLIT_TAG_MAP[knode.name] || !toBlock && knode.isBlock()) {
				return;
			}
			if (pos === 0) {
				while (!knode.prev()) {
					parent = knode.parent();
					if (!parent || _NOSPLIT_TAG_MAP[parent.name] || !toBlock && parent.isBlock()) {
						break;
					}
					knode = parent;
				}
				if (isStart) {
					self.setStartBefore(knode[0]);
				} else {
					self.setEndBefore(knode[0]);
				}
			} else if (pos == knode.children().length) {
				while (!knode.next()) {
					parent = knode.parent();
					if (!parent || _NOSPLIT_TAG_MAP[parent.name] || !toBlock && parent.isBlock()) {
						break;
					}
					knode = parent;
				}
				if (isStart) {
					self.setStartAfter(knode[0]);
				} else {
					self.setEndAfter(knode[0]);
				}
			}
		}
		enlargePos(self.startContainer, self.startOffset, true);
		enlargePos(self.endContainer, self.endOffset, false);
		return self;
	},
	shrink : function() {
		var self = this, child, collapsed = self.collapsed;
		while (self.startContainer.nodeType == 1 && (child = self.startContainer.childNodes[self.startOffset]) && child.nodeType == 1 && !K(child).isSingle()) {
			self.setStart(child, 0);
		}
		if (collapsed) {
			return self.collapse(collapsed);
		}
		while (self.endContainer.nodeType == 1 && self.endOffset > 0 && (child = self.endContainer.childNodes[self.endOffset - 1]) && child.nodeType == 1 && !K(child).isSingle()) {
			self.setEnd(child, child.childNodes.length);
		}
		return self;
	},
	createBookmark : function(serialize) {
		var self = this, doc = self.doc, endNode,
			startNode = K('<span style="display:none;"></span>', doc)[0];
		startNode.id = '__kindeditor_bookmark_start_' + (_BOOKMARK_ID++) + '__';
		if (!self.collapsed) {
			endNode = startNode.cloneNode(true);
			endNode.id = '__kindeditor_bookmark_end_' + (_BOOKMARK_ID++) + '__';
		}
		if (endNode) {
			self.cloneRange().collapse(false).insertNode(endNode).setEndBefore(endNode);
		}
		self.insertNode(startNode).setStartAfter(startNode);
		return {
			start : serialize ? '#' + startNode.id : startNode,
			end : endNode ? (serialize ? '#' + endNode.id : endNode) : null
		};
	},
	moveToBookmark : function(bookmark) {
		var self = this, doc = self.doc,
			start = K(bookmark.start, doc), end = bookmark.end ? K(bookmark.end, doc) : null;
		if (!start || start.length < 1) {
			return self;
		}
		self.setStartBefore(start[0]);
		start.remove();
		if (end && end.length > 0) {
			self.setEndBefore(end[0]);
			end.remove();
		} else {
			self.collapse(true);
		}
		return self;
	},
	dump : function() {
		console.log('--------------------');
		console.log(this.startContainer.nodeType == 3 ? this.startContainer.nodeValue : this.startContainer, this.startOffset);
		console.log(this.endContainer.nodeType == 3 ? this.endContainer.nodeValue : this.endContainer, this.endOffset);
	}
});
function _range(mixed) {
	if (!mixed.nodeName) {
		return mixed.constructor === KRange ? mixed : _toRange(mixed);
	}
	return new KRange(mixed);
}
K.RangeClass = KRange;
K.range = _range;
K.START_TO_START = _START_TO_START;
K.START_TO_END = _START_TO_END;
K.END_TO_END = _END_TO_END;
K.END_TO_START = _END_TO_START;
function _nativeCommand(doc, key, val) {
	try {
		doc.execCommand(key, false, val);
	} catch(e) {}
}
function _nativeCommandValue(doc, key) {
	var val = '';
	try {
		val = doc.queryCommandValue(key);
	} catch (e) {}
	if (typeof val !== 'string') {
		val = '';
	}
	return val;
}
function _getSel(doc) {
	var win = _getWin(doc);
	return doc.selection || win.getSelection();
}
function _getRng(doc) {
	var sel = _getSel(doc), rng;
	try {
		if (sel.rangeCount > 0) {
			rng = sel.getRangeAt(0);
		} else {
			rng = sel.createRange();
		}
	} catch(e) {}
	if (_IE && (!rng || (!rng.item && rng.parentElement().ownerDocument !== doc))) {
		return null;
	}
	return rng;
}
function _singleKeyMap(map) {
	var newMap = {}, arr, v;
	_each(map, function(key, val) {
		arr = key.split(',');
		for (var i = 0, len = arr.length; i < len; i++) {
			v = arr[i];
			newMap[v] = val;
		}
	});
	return newMap;
}
function _hasAttrOrCss(knode, map) {
	return _hasAttrOrCssByKey(knode, map, '*') || _hasAttrOrCssByKey(knode, map);
}
function _hasAttrOrCssByKey(knode, map, mapKey) {
	mapKey = mapKey || knode.name;
	if (knode.type !== 1) {
		return false;
	}
	var newMap = _singleKeyMap(map);
	if (!newMap[mapKey]) {
		return false;
	}
	var arr = newMap[mapKey].split(',');
	for (var i = 0, len = arr.length; i < len; i++) {
		var key = arr[i];
		if (key === '*') {
			return true;
		}
		var match = /^(\.?)([^=]+)(?:=([^=]*))?$/.exec(key);
		var method = match[1] ? 'css' : 'attr';
		key = match[2];
		var val = match[3] || '';
		if (val === '' && knode[method](key) !== '') {
			return true;
		}
		if (val !== '' && knode[method](key) === val) {
			return true;
		}
	}
	return false;
}
function _removeAttrOrCss(knode, map) {
	if (knode.type != 1) {
		return;
	}
	_removeAttrOrCssByKey(knode, map, '*');
	_removeAttrOrCssByKey(knode, map);
}
function _removeAttrOrCssByKey(knode, map, mapKey) {
	mapKey = mapKey || knode.name;
	if (knode.type !== 1) {
		return;
	}
	var newMap = _singleKeyMap(map);
	if (!newMap[mapKey]) {
		return;
	}
	var arr = newMap[mapKey].split(','), allFlag = false;
	for (var i = 0, len = arr.length; i < len; i++) {
		var key = arr[i];
		if (key === '*') {
			allFlag = true;
			break;
		}
		var match = /^(\.?)([^=]+)(?:=([^=]*))?$/.exec(key);
		key = match[2];
		if (match[1]) {
			key = _toCamel(key);
			if (knode[0].style[key]) {
				knode[0].style[key] = '';
			}
		} else {
			knode.removeAttr(key);
		}
	}
	if (allFlag) {
		knode.remove(true);
	}
}
function _getInnerNode(knode) {
	var inner = knode;
	while (inner.first()) {
		inner = inner.first();
	}
	return inner;
}
function _isEmptyNode(knode) {
	if (knode.type != 1 || knode.isSingle()) {
		return false;
	}
	return knode.html().replace(/<[^>]+>/g, '') === '';
}
function _mergeWrapper(a, b) {
	a = a.clone(true);
	var lastA = _getInnerNode(a), childA = a, merged = false;
	while (b) {
		while (childA) {
			if (childA.name === b.name) {
				_mergeAttrs(childA, b.attr(), b.css());
				merged = true;
			}
			childA = childA.first();
		}
		if (!merged) {
			lastA.append(b.clone(false));
		}
		merged = false;
		b = b.first();
	}
	return a;
}
function _wrapNode(knode, wrapper) {
	wrapper = wrapper.clone(true);
	if (knode.type == 3) {
		_getInnerNode(wrapper).append(knode.clone(false));
		knode.replaceWith(wrapper);
		return wrapper;
	}
	var nodeWrapper = knode, child;
	while ((child = knode.first()) && child.children().length == 1) {
		knode = child;
	}
	child = knode.first();
	var frag = knode.doc.createDocumentFragment();
	while (child) {
		frag.appendChild(child[0]);
		child = child.next();
	}
	wrapper = _mergeWrapper(nodeWrapper, wrapper);
	if (frag.firstChild) {
		_getInnerNode(wrapper).append(frag);
	}
	nodeWrapper.replaceWith(wrapper);
	return wrapper;
}
function _mergeAttrs(knode, attrs, styles) {
	_each(attrs, function(key, val) {
		if (key !== 'style') {
			knode.attr(key, val);
		}
	});
	_each(styles, function(key, val) {
		knode.css(key, val);
	});
}
function _inPreElement(knode) {
	while (knode && knode.name != 'body') {
		if (_PRE_TAG_MAP[knode.name] || knode.name == 'div' && knode.hasClass('ke-script')) {
			return true;
		}
		knode = knode.parent();
	}
	return false;
}
function KCmd(range) {
	this.init(range);
}
_extend(KCmd, {
	init : function(range) {
		var self = this, doc = range.doc;
		self.doc = doc;
		self.win = _getWin(doc);
		self.sel = _getSel(doc);
		self.range = range;
	},
	selection : function(forceReset) {
		var self = this, doc = self.doc, rng = _getRng(doc);
		self.sel = _getSel(doc);
		if (rng) {
			self.range = _range(rng);
			if (K(self.range.startContainer).name == 'html') {
				self.range.selectNodeContents(doc.body).collapse(false);
			}
			return self;
		}
		if (forceReset) {
			self.range.selectNodeContents(doc.body).collapse(false);
		}
		return self;
	},
	select : function(hasDummy) {
		hasDummy = _undef(hasDummy, true);
		var self = this, sel = self.sel, range = self.range.cloneRange().shrink(),
			sc = range.startContainer, so = range.startOffset,
			ec = range.endContainer, eo = range.endOffset,
			doc = _getDoc(sc), win = self.win, rng, hasU200b = false;
		if (hasDummy && sc.nodeType == 1 && range.collapsed) {
			if (_IE) {
				var dummy = K('<span>&nbsp;</span>', doc);
				range.insertNode(dummy[0]);
				rng = doc.body.createTextRange();
				try {
					rng.moveToElementText(dummy[0]);
				} catch(ex) {}
				rng.collapse(false);
				rng.select();
				dummy.remove();
				win.focus();
				return self;
			}
			if (_WEBKIT) {
				var children = sc.childNodes;
				if (K(sc).isInline() || so > 0 && K(children[so - 1]).isInline() || children[so] && K(children[so]).isInline()) {
					range.insertNode(doc.createTextNode('\u200B'));
					hasU200b = true;
				}
			}
		}
		if (_IE) {
			try {
				rng = range.get(true);
				rng.select();
			} catch(e) {}
		} else {
			if (hasU200b) {
				range.collapse(false);
			}
			rng = range.get(true);
			sel.removeAllRanges();
			sel.addRange(rng);
			if (doc !== document) {
				var pos = K(rng.endContainer).pos();
				win.scrollTo(pos.x, pos.y);
			}
		}
		win.focus();
		return self;
	},
	wrap : function(val) {
		var self = this, doc = self.doc, range = self.range, wrapper;
		wrapper = K(val, doc);
		if (range.collapsed) {
			range.shrink();
			range.insertNode(wrapper[0]).selectNodeContents(wrapper[0]);
			return self;
		}
		if (wrapper.isBlock()) {
			var copyWrapper = wrapper.clone(true), child = copyWrapper;
			while (child.first()) {
				child = child.first();
			}
			child.append(range.extractContents());
			range.insertNode(copyWrapper[0]).selectNode(copyWrapper[0]);
			return self;
		}
		range.enlarge();
		var bookmark = range.createBookmark(), ancestor = range.commonAncestor(), isStart = false;
		K(ancestor).scan(function(node) {
			if (!isStart && node == bookmark.start) {
				isStart = true;
				return;
			}
			if (isStart) {
				if (node == bookmark.end) {
					return false;
				}
				var knode = K(node);
				if (_inPreElement(knode)) {
					return;
				}
				if (knode.type == 3 && _trim(node.nodeValue).length > 0) {
					var parent;
					while ((parent = knode.parent()) && parent.isStyle() && parent.children().length == 1) {
						knode = parent;
					}
					_wrapNode(knode, wrapper);
				}
			}
		});
		range.moveToBookmark(bookmark);
		return self;
	},
	split : function(isStart, map) {
		var range = this.range, doc = range.doc;
		var tempRange = range.cloneRange().collapse(isStart);
		var node = tempRange.startContainer, pos = tempRange.startOffset,
			parent = node.nodeType == 3 ? node.parentNode : node,
			needSplit = false, knode;
		while (parent && parent.parentNode) {
			knode = K(parent);
			if (map) {
				if (!knode.isStyle()) {
					break;
				}
				if (!_hasAttrOrCss(knode, map)) {
					break;
				}
			} else {
				if (_NOSPLIT_TAG_MAP[knode.name]) {
					break;
				}
			}
			needSplit = true;
			parent = parent.parentNode;
		}
		if (needSplit) {
			var dummy = doc.createElement('span');
			range.cloneRange().collapse(!isStart).insertNode(dummy);
			if (isStart) {
				tempRange.setStartBefore(parent.firstChild).setEnd(node, pos);
			} else {
				tempRange.setStart(node, pos).setEndAfter(parent.lastChild);
			}
			var frag = tempRange.extractContents(),
				first = frag.firstChild, last = frag.lastChild;
			if (isStart) {
				tempRange.insertNode(frag);
				range.setStartAfter(last).setEndBefore(dummy);
			} else {
				parent.appendChild(frag);
				range.setStartBefore(dummy).setEndBefore(first);
			}
			var dummyParent = dummy.parentNode;
			if (dummyParent == range.endContainer) {
				var prev = K(dummy).prev(), next = K(dummy).next();
				if (prev && next && prev.type == 3 && next.type == 3) {
					range.setEnd(prev[0], prev[0].nodeValue.length);
				} else if (!isStart) {
					range.setEnd(range.endContainer, range.endOffset - 1);
				}
			}
			dummyParent.removeChild(dummy);
		}
		return this;
	},
	remove : function(map) {
		var self = this, doc = self.doc, range = self.range;
		range.enlarge();
		if (range.startOffset === 0) {
			var ksc = K(range.startContainer), parent;
			while ((parent = ksc.parent()) && parent.isStyle() && parent.children().length == 1) {
				ksc = parent;
			}
			range.setStart(ksc[0], 0);
			ksc = K(range.startContainer);
			if (ksc.isBlock()) {
				_removeAttrOrCss(ksc, map);
			}
			var kscp = ksc.parent();
			if (kscp && kscp.isBlock()) {
				_removeAttrOrCss(kscp, map);
			}
		}
		var sc, so;
		if (range.collapsed) {
			self.split(true, map);
			sc = range.startContainer;
			so = range.startOffset;
			if (so > 0) {
				var sb = K(sc.childNodes[so - 1]);
				if (sb && _isEmptyNode(sb)) {
					sb.remove();
					range.setStart(sc, so - 1);
				}
			}
			var sa = K(sc.childNodes[so]);
			if (sa && _isEmptyNode(sa)) {
				sa.remove();
			}
			if (_isEmptyNode(sc)) {
				range.startBefore(sc);
				sc.remove();
			}
			range.collapse(true);
			return self;
		}
		self.split(true, map);
		self.split(false, map);
		var startDummy = doc.createElement('span'), endDummy = doc.createElement('span');
		range.cloneRange().collapse(false).insertNode(endDummy);
		range.cloneRange().collapse(true).insertNode(startDummy);
		var nodeList = [], cmpStart = false;
		K(range.commonAncestor()).scan(function(node) {
			if (!cmpStart && node == startDummy) {
				cmpStart = true;
				return;
			}
			if (node == endDummy) {
				return false;
			}
			if (cmpStart) {
				nodeList.push(node);
			}
		});
		K(startDummy).remove();
		K(endDummy).remove();
		sc = range.startContainer;
		so = range.startOffset;
		var ec = range.endContainer, eo = range.endOffset;
		if (so > 0) {
			var startBefore = K(sc.childNodes[so - 1]);
			if (startBefore && _isEmptyNode(startBefore)) {
				startBefore.remove();
				range.setStart(sc, so - 1);
				if (sc == ec) {
					range.setEnd(ec, eo - 1);
				}
			}
			var startAfter = K(sc.childNodes[so]);
			if (startAfter && _isEmptyNode(startAfter)) {
				startAfter.remove();
				if (sc == ec) {
					range.setEnd(ec, eo - 1);
				}
			}
		}
		var endAfter = K(ec.childNodes[range.endOffset]);
		if (endAfter && _isEmptyNode(endAfter)) {
			endAfter.remove();
		}
		var bookmark = range.createBookmark(true);
		_each(nodeList, function(i, node) {
			_removeAttrOrCss(K(node), map);
		});
		range.moveToBookmark(bookmark);
		return self;
	},
	commonNode : function(map) {
		var range = this.range;
		var ec = range.endContainer, eo = range.endOffset,
			node = (ec.nodeType == 3 || eo === 0) ? ec : ec.childNodes[eo - 1];
		function find(node) {
			var child = node, parent = node;
			while (parent) {
				if (_hasAttrOrCss(K(parent), map)) {
					return K(parent);
				}
				parent = parent.parentNode;
			}
			while (child && (child = child.lastChild)) {
				if (_hasAttrOrCss(K(child), map)) {
					return K(child);
				}
			}
			return null;
		}
		var cNode = find(node);
		if (cNode) {
			return cNode;
		}
		if (node.nodeType == 1 || (ec.nodeType == 3 && eo === 0)) {
			var prev = K(node).prev();
			if (prev) {
				return find(prev);
			}
		}
		return null;
	},
	commonAncestor : function(tagName) {
		var range = this.range,
			sc = range.startContainer, so = range.startOffset,
			ec = range.endContainer, eo = range.endOffset,
			startNode = (sc.nodeType == 3 || so === 0) ? sc : sc.childNodes[so - 1],
			endNode = (ec.nodeType == 3 || eo === 0) ? ec : ec.childNodes[eo - 1];
		function find(node) {
			while (node) {
				if (node.nodeType == 1) {
					if (node.tagName.toLowerCase() === tagName) {
						return node;
					}
				}
				node = node.parentNode;
			}
			return null;
		}
		var start = find(startNode), end = find(endNode);
		if (start && end && start === end) {
			return K(start);
		}
		return null;
	},
	state : function(key) {
		var self = this, doc = self.doc, bool = false;
		try {
			bool = doc.queryCommandState(key);
		} catch (e) {}
		return bool;
	},
	val : function(key) {
		var self = this, doc = self.doc, range = self.range;
		function lc(val) {
			return val.toLowerCase();
		}
		key = lc(key);
		var val = '', knode;
		if (key === 'fontfamily' || key === 'fontname') {
			val = _nativeCommandValue(doc, 'fontname');
			val = val.replace(/['"]/g, '');
			return lc(val);
		}
		if (key === 'formatblock') {
			val = _nativeCommandValue(doc, key);
			if (val === '') {
				knode = self.commonNode({'h1,h2,h3,h4,h5,h6,p,div,pre,address' : '*'});
				if (knode) {
					val = knode.name;
				}
			}
			if (val === 'Normal') {
				val = 'p';
			}
			return lc(val);
		}
		if (key === 'fontsize') {
			knode = self.commonNode({'*' : '.font-size'});
			if (knode) {
				val = knode.css('font-size');
			}
			return lc(val);
		}
		if (key === 'forecolor') {
			knode = self.commonNode({'*' : '.color'});
			if (knode) {
				val = knode.css('color');
			}
			val = _toHex(val);
			if (val === '') {
				val = 'default';
			}
			return lc(val);
		}
		if (key === 'hilitecolor') {
			knode = self.commonNode({'*' : '.background-color'});
			if (knode) {
				val = knode.css('background-color');
			}
			val = _toHex(val);
			if (val === '') {
				val = 'default';
			}
			return lc(val);
		}
		return val;
	},
	toggle : function(wrapper, map) {
		var self = this;
		if (self.commonNode(map)) {
			self.remove(map);
		} else {
			self.wrap(wrapper);
		}
		return self.select();
	},
	bold : function() {
		return this.toggle('<strong></strong>', {
			span : '.font-weight=bold',
			strong : '*',
			b : '*'
		});
	},
	italic : function() {
		return this.toggle('<em></em>', {
			span : '.font-style=italic',
			em : '*',
			i : '*'
		});
	},
	underline : function() {
		return this.toggle('<u></u>', {
			span : '.text-decoration=underline',
			u : '*'
		});
	},
	strikethrough : function() {
		return this.toggle('<s></s>', {
			span : '.text-decoration=line-through',
			s : '*'
		});
	},
	forecolor : function(val) {
		return this.toggle('<span style="color:' + val + ';"></span>', {
			span : '.color=' + val,
			font : 'color'
		});
	},
	hilitecolor : function(val) {
		return this.toggle('<span style="background-color:' + val + ';"></span>', {
			span : '.background-color=' + val
		});
	},
	fontsize : function(val) {
		return this.toggle('<span style="font-size:' + val + ';"></span>', {
			span : '.font-size=' + val,
			font : 'size'
		});
	},
	fontname : function(val) {
		return this.fontfamily(val);
	},
	fontfamily : function(val) {
		return this.toggle('<span style="font-family:' + val + ';"></span>', {
			span : '.font-family=' + val,
			font : 'face'
		});
	},
	removeformat : function() {
		var map = {
			'*' : '.font-weight,.font-style,.text-decoration,.color,.background-color,.font-size,.font-family,.text-indent'
		},
		tags = _STYLE_TAG_MAP;
		_each(tags, function(key, val) {
			map[key] = '*';
		});
		this.remove(map);
		return this.select();
	},
	inserthtml : function(val, quickMode) {
		var self = this, range = self.range;
		if (val === '') {
			return self;
		}
		function pasteHtml(range, val) {
			val = '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + val;
			var rng = range.get();
			if (rng.item) {
				rng.item(0).outerHTML = val;
			} else {
				rng.pasteHTML(val);
			}
			var temp = range.doc.getElementById('__kindeditor_temp_tag__');
			temp.parentNode.removeChild(temp);
			var newRange = _toRange(rng);
			range.setEnd(newRange.endContainer, newRange.endOffset);
			range.collapse(false);
			self.select(false);
		}
		function insertHtml(range, val) {
			var doc = range.doc,
				frag = doc.createDocumentFragment();
			K('@' + val, doc).each(function() {
				frag.appendChild(this);
			});
			range.deleteContents();
			range.insertNode(frag);
			range.collapse(false);
			self.select(false);
		}
		if (_IE && quickMode) {
			try {
				pasteHtml(range, val);
			} catch(e) {
				insertHtml(range, val);
			}
			return self;
		}
		insertHtml(range, val);
		return self;
	},
	hr : function() {
		return this.inserthtml('<hr />');
	},
	print : function() {
		this.win.print();
		return this;
	},
	insertimage : function(url, title, width, height, border, align) {
		title = _undef(title, '');
		border = _undef(border, 0);
		var html = '<img src="' + _escape(url) + '" data-ke-src="' + _escape(url) + '" ';
		if (width) {
			html += 'width="' + _escape(width) + '" ';
		}
		if (height) {
			html += 'height="' + _escape(height) + '" ';
		}
		if (title) {
			html += 'title="' + _escape(title) + '" ';
		}
		if (align) {
			html += 'align="' + _escape(align) + '" ';
		}
		html += 'alt="' + _escape(title) + '" ';
		html += '/>';
		return this.inserthtml(html);
	},
	createlink : function(url, type) {
		var self = this, doc = self.doc, range = self.range;
		self.select();
		var a = self.commonNode({ a : '*' });
		if (a && !range.isControl()) {
			range.selectNode(a.get());
			self.select();
		}
		var html = '<a href="' + _escape(url) + '" data-ke-src="' + _escape(url) + '" ';
		if (type) {
			html += ' target="' + _escape(type) + '"';
		}
		if (range.collapsed) {
			html += '>' + _escape(url) + '</a>';
			return self.inserthtml(html);
		}
		if (range.isControl()) {
			var node = K(range.startContainer.childNodes[range.startOffset]);
			html += '></a>';
			node.after(K(html, doc));
			node.next().append(node);
			range.selectNode(node[0]);
			return self.select();
		}
		_nativeCommand(doc, 'createlink', '__kindeditor_temp_url__');
		K('a[href="__kindeditor_temp_url__"]', doc).each(function() {
			K(this).attr('href', url).attr('data-ke-src', url);
			if (type) {
				K(this).attr('target', type);
			} else {
				K(this).removeAttr('target');
			}
		});
		return self;
	},
	unlink : function() {
		var self = this, doc = self.doc, range = self.range;
		self.select();
		if (range.collapsed) {
			var a = self.commonNode({ a : '*' });
			if (a) {
				range.selectNode(a.get());
				self.select();
			}
			_nativeCommand(doc, 'unlink', null);
			if (_WEBKIT && K(range.startContainer).name === 'img') {
				var parent = K(range.startContainer).parent();
				if (parent.name === 'a') {
					parent.remove(true);
				}
			}
		} else {
			_nativeCommand(doc, 'unlink', null);
		}
		return self;
	}
});
_each(('formatblock,selectall,justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,' +
	'insertunorderedlist,indent,outdent,subscript,superscript').split(','), function(i, name) {
	KCmd.prototype[name] = function(val) {
		var self = this;
		self.select();
		_nativeCommand(self.doc, name, val);
		if (!_IE || _inArray(name, 'formatblock,selectall,insertorderedlist,insertunorderedlist'.split(',')) >= 0) {
			self.selection();
		}
		return self;
	};
});
_each('cut,copy,paste'.split(','), function(i, name) {
	KCmd.prototype[name] = function() {
		var self = this;
		if (!self.doc.queryCommandSupported(name)) {
			throw 'not supported';
		}
		self.select();
		_nativeCommand(self.doc, name, null);
		return self;
	};
});
function _cmd(mixed) {
	if (mixed.nodeName) {
		var doc = _getDoc(mixed);
		mixed = _range(doc).selectNodeContents(doc.body).collapse(false);
	}
	return new KCmd(mixed);
}
K.CmdClass = KCmd;
K.cmd = _cmd;
function _drag(options) {
	var moveEl = options.moveEl,
		moveFn = options.moveFn,
		clickEl = options.clickEl || moveEl,
		beforeDrag = options.beforeDrag,
		iframeFix = options.iframeFix === undefined ? true : options.iframeFix;
	var docs = [document];
	if (iframeFix) {
		K('iframe').each(function() {
			var src = _formatUrl(this.src || '', 'absolute');
			if (/^https?:\/\//.test(src)) {
				return;
			}
			var doc;
			try {
				doc = _iframeDoc(this);
			} catch(e) {}
			if (doc) {
				var pos = K(this).pos();
				K(doc).data('pos-x', pos.x);
				K(doc).data('pos-y', pos.y);
				docs.push(doc);
			}
		});
	}
	clickEl.mousedown(function(e) {
		e.stopPropagation();
		var self = clickEl.get(),
			x = _removeUnit(moveEl.css('left')),
			y = _removeUnit(moveEl.css('top')),
			width = moveEl.width(),
			height = moveEl.height(),
			pageX = e.pageX,
			pageY = e.pageY;
		if (beforeDrag) {
			beforeDrag();
		}
		function moveListener(e) {
			e.preventDefault();
			var kdoc = K(_getDoc(e.target));
			var diffX = _round((kdoc.data('pos-x') || 0) + e.pageX - pageX);
			var diffY = _round((kdoc.data('pos-y') || 0) + e.pageY - pageY);
			moveFn.call(clickEl, x, y, width, height, diffX, diffY);
		}
		function selectListener(e) {
			e.preventDefault();
		}
		function upListener(e) {
			e.preventDefault();
			K(docs).unbind('mousemove', moveListener)
				.unbind('mouseup', upListener)
				.unbind('selectstart', selectListener);
			if (self.releaseCapture) {
				self.releaseCapture();
			}
		}
		K(docs).mousemove(moveListener)
			.mouseup(upListener)
			.bind('selectstart', selectListener);
		if (self.setCapture) {
			self.setCapture();
		}
	});
}
function KWidget(options) {
	this.init(options);
}
_extend(KWidget, {
	init : function(options) {
		var self = this;
		self.name = options.name || '';
		self.doc = options.doc || document;
		self.win = _getWin(self.doc);
		self.x = _addUnit(options.x);
		self.y = _addUnit(options.y);
		self.z = options.z;
		self.width = _addUnit(options.width);
		self.height = _addUnit(options.height);
		self.div = K('<div style="display:block;"></div>');
		self.options = options;
		self._alignEl = options.alignEl;
		if (self.width) {
			self.div.css('width', self.width);
		}
		if (self.height) {
			self.div.css('height', self.height);
		}
		if (self.z) {
			self.div.css({
				position : 'absolute',
				left : self.x,
				top : self.y,
				'z-index' : self.z
			});
		}
		if (self.z && (self.x === undefined || self.y === undefined)) {
			self.autoPos(self.width, self.height);
		}
		if (options.cls) {
			self.div.addClass(options.cls);
		}
		if (options.shadowMode) {
			self.div.addClass('ke-shadow');
		}
		if (options.css) {
			self.div.css(options.css);
		}
		if (options.src) {
			K(options.src).replaceWith(self.div);
		} else {
			K(self.doc.body).append(self.div);
		}
		if (options.html) {
			self.div.html(options.html);
		}
		if (options.autoScroll) {
			if (_IE && _V < 7 || _QUIRKS) {
				var scrollPos = _getScrollPos();
				K(self.win).bind('scroll', function(e) {
					var pos = _getScrollPos(),
						diffX = pos.x - scrollPos.x,
						diffY = pos.y - scrollPos.y;
					self.pos(_removeUnit(self.x) + diffX, _removeUnit(self.y) + diffY, false);
				});
			} else {
				self.div.css('position', 'fixed');
			}
		}
	},
	pos : function(x, y, updateProp) {
		var self = this;
		updateProp = _undef(updateProp, true);
		if (x !== null) {
			x = x < 0 ? 0 : _addUnit(x);
			self.div.css('left', x);
			if (updateProp) {
				self.x = x;
			}
		}
		if (y !== null) {
			y = y < 0 ? 0 : _addUnit(y);
			self.div.css('top', y);
			if (updateProp) {
				self.y = y;
			}
		}
		return self;
	},
	autoPos : function(width, height) {
		var self = this,
			w = _removeUnit(width) || 0,
			h = _removeUnit(height) || 0,
			scrollPos = _getScrollPos();
		if (self._alignEl) {
			var knode = K(self._alignEl),
				pos = knode.pos(),
				diffX = _round(knode[0].clientWidth / 2 - w / 2),
				diffY = _round(knode[0].clientHeight / 2 - h / 2);
			x = diffX < 0 ? pos.x : pos.x + diffX;
			y = diffY < 0 ? pos.y : pos.y + diffY;
		} else {
			var docEl = _docElement(self.doc);
			x = _round(scrollPos.x + (docEl.clientWidth - w) / 2);
			y = _round(scrollPos.y + (docEl.clientHeight - h) / 2);
		}
		if (!(_IE && _V < 7 || _QUIRKS)) {
			x -= scrollPos.x;
			y -= scrollPos.y;
		}
		return self.pos(x, y);
	},
	remove : function() {
		var self = this;
		if (_IE && _V < 7 || _QUIRKS) {
			K(self.win).unbind('scroll');
		}
		self.div.remove();
		_each(self, function(i) {
			self[i] = null;
		});
		return this;
	},
	show : function() {
		this.div.show();
		return this;
	},
	hide : function() {
		this.div.hide();
		return this;
	},
	draggable : function(options) {
		var self = this;
		options = options || {};
		options.moveEl = self.div;
		options.moveFn = function(x, y, width, height, diffX, diffY) {
			if ((x = x + diffX) < 0) {
				x = 0;
			}
			if ((y = y + diffY) < 0) {
				y = 0;
			}
			self.pos(x, y);
		};
		_drag(options);
		return self;
	}
});
function _widget(options) {
	return new KWidget(options);
}
K.WidgetClass = KWidget;
K.widget = _widget;
function _iframeDoc(iframe) {
	iframe = _get(iframe);
	return iframe.contentDocument || iframe.contentWindow.document;
}
var html, _direction = '';
if ((html = document.getElementsByTagName('html'))) {
	_direction = html[0].dir;
}
function _getInitHtml(themesPath, bodyClass, cssPath, cssData) {
	var arr = [
		(_direction === '' ? '<html>' : '<html dir="' + _direction + '">'),
		'<head><meta charset="utf-8" /><title></title>',
		'<style>',
		'html {margin:0;padding:0;}',
		'body {margin:0;padding:5px;}',
		'body, td {font:12px/1.5 "sans serif",tahoma,verdana,helvetica;}',
		'body, p, div {word-wrap: break-word;}',
		'p {margin:5px 0;}',
		'table {border-collapse:collapse;}',
		'img {border:0;}',
		'noscript {display:none;}',
		'table.ke-zeroborder td {border:1px dotted #AAA;}',
		'img.ke-flash {',
		'	border:1px solid #AAA;',
		'	background-image:url(' + themesPath + 'common/flash.gif);',
		'	background-position:center center;',
		'	background-repeat:no-repeat;',
		'	width:100px;',
		'	height:100px;',
		'}',
		'img.ke-rm {',
		'	border:1px solid #AAA;',
		'	background-image:url(' + themesPath + 'common/rm.gif);',
		'	background-position:center center;',
		'	background-repeat:no-repeat;',
		'	width:100px;',
		'	height:100px;',
		'}',
		'img.ke-media {',
		'	border:1px solid #AAA;',
		'	background-image:url(' + themesPath + 'common/media.gif);',
		'	background-position:center center;',
		'	background-repeat:no-repeat;',
		'	width:100px;',
		'	height:100px;',
		'}',
		'img.ke-anchor {',
		'	border:1px dashed #666;',
		'	width:16px;',
		'	height:16px;',
		'}',
		'.ke-script, .ke-noscript, .ke-display-none {',
		'	display:none;',
		'	font-size:0;',
		'	width:0;',
		'	height:0;',
		'}',
		'.ke-pagebreak {',
		'	border:1px dotted #AAA;',
		'	font-size:0;',
		'	height:2px;',
		'}',
		'</style>'
	];
	if (!_isArray(cssPath)) {
		cssPath = [cssPath];
	}
	_each(cssPath, function(i, path) {
		if (path) {
			arr.push('<link href="' + path + '" rel="stylesheet" />');
		}
	});
	if (cssData) {
		arr.push('<style>' + cssData + '</style>');
	}
	arr.push('</head><body ' + (bodyClass ? 'class="' + bodyClass + '"' : '') + '></body></html>');
	return arr.join('\n');
}
function _elementVal(knode, val) {
	if (knode.hasVal()) {
		if (val === undefined) {
			var html = knode.val();
			html = html.replace(/(<(?:p|p\s[^>]*)>) *(<\/p>)/ig, '');
			return html;
		}
		return knode.val(val);
	}
	return knode.html(val);
}
function KEdit(options) {
	this.init(options);
}
_extend(KEdit, KWidget, {
	init : function(options) {
		var self = this;
		KEdit.parent.init.call(self, options);
		self.srcElement = K(options.srcElement);
		self.div.addClass('ke-edit');
		self.designMode = _undef(options.designMode, true);
		self.beforeGetHtml = options.beforeGetHtml;
		self.beforeSetHtml = options.beforeSetHtml;
		self.afterSetHtml = options.afterSetHtml;
		var themesPath = _undef(options.themesPath, ''),
			bodyClass = options.bodyClass,
			cssPath = options.cssPath,
			cssData = options.cssData,
			isDocumentDomain = location.host.replace(/:\d+/, '') !== document.domain,
			srcScript = ('document.open();' +
				(isDocumentDomain ? 'document.domain="' + document.domain + '";' : '') +
				'document.close();'),
			iframeSrc = _IE ? ' src="javascript:void(function(){' + encodeURIComponent(srcScript) + '}())"' : '';
		self.iframe = K('<iframe class="ke-edit-iframe" hidefocus="true" frameborder="0"' + iframeSrc + '></iframe>').css('width', '100%');
		self.textarea = K('<textarea class="ke-edit-textarea" hidefocus="true"></textarea>').css('width', '100%');
		if (self.width) {
			self.setWidth(self.width);
		}
		if (self.height) {
			self.setHeight(self.height);
		}
		if (self.designMode) {
			self.textarea.hide();
		} else {
			self.iframe.hide();
		}
		function ready() {
			var doc = _iframeDoc(self.iframe);
			doc.open();
			if (isDocumentDomain) {
				doc.domain = document.domain;
			}
			doc.write(_getInitHtml(themesPath, bodyClass, cssPath, cssData));
			doc.close();
			self.win = self.iframe[0].contentWindow;
			self.doc = doc;
			var cmd = _cmd(doc);
			self.afterChange(function(e) {
				cmd.selection();
			});
			if (_WEBKIT) {
				K(doc).click(function(e) {
					if (K(e.target).name === 'img') {
						cmd.selection(true);
						cmd.range.selectNode(e.target);
						cmd.select();
					}
				});
			}
			if (_IE) {
				self._mousedownHandler = function() {
					var newRange = cmd.range.cloneRange();
					newRange.shrink();
					if (newRange.isControl()) {
						self.blur();
					}
				};
				K(document).mousedown(self._mousedownHandler);
				K(doc).keydown(function(e) {
					if (e.which == 8) {
						cmd.selection();
						var rng = cmd.range;
						if (rng.isControl()) {
							rng.collapse(true);
							K(rng.startContainer.childNodes[rng.startOffset]).remove();
							e.preventDefault();
						}
					}
				});
			}
			self.cmd = cmd;
			self.html(_elementVal(self.srcElement));
			if (_IE) {
				doc.body.disabled = true;
				doc.body.contentEditable = true;
				doc.body.removeAttribute('disabled');
			} else {
				doc.designMode = 'on';
			}
			if (options.afterCreate) {
				options.afterCreate.call(self);
			}
		}
		if (isDocumentDomain) {
			self.iframe.bind('load', function(e) {
				self.iframe.unbind('load');
				if (_IE) {
					ready();
				} else {
					setTimeout(ready, 0);
				}
			});
		}
		self.div.append(self.iframe);
		self.div.append(self.textarea);
		self.srcElement.hide();
		!isDocumentDomain && ready();
	},
	setWidth : function(val) {
		this.div.css('width', _addUnit(val));
		return this;
	},
	setHeight : function(val) {
		var self = this;
		val = _addUnit(val);
		self.div.css('height', val);
		self.iframe.css('height', val);
		if ((_IE && _V < 8) || _QUIRKS) {
			val = _addUnit(_removeUnit(val) - 2);
		}
		self.textarea.css('height', val);
		return self;
	},
	remove : function() {
		var self = this, doc = self.doc;
		K(doc.body).unbind();
		K(doc).unbind();
		K(self.win).unbind();
		if (self._mousedownHandler) {
			K(document).unbind('mousedown', self._mousedownHandler);
		}
		_elementVal(self.srcElement, self.html());
		self.srcElement.show();
		doc.write('');
		self.iframe.unbind();
		self.textarea.unbind();
		KEdit.parent.remove.call(self);
	},
	html : function(val, isFull) {
		var self = this, doc = self.doc;
		if (self.designMode) {
			var body = doc.body;
			if (val === undefined) {
				if (isFull) {
					val = '<!doctype html><html>' + body.parentNode.innerHTML + '</html>';
				} else {
					val = body.innerHTML;
				}
				if (self.beforeGetHtml) {
					val = self.beforeGetHtml(val);
				}
				if (_GECKO && val == '<br />') {
					val = '';
				}
				return val;
			}
			if (self.beforeSetHtml) {
				val = self.beforeSetHtml(val);
			}
			if (_IE && _V >= 9) {
				val = val.replace(/(<.*?checked=")checked(".*>)/ig, '$1$2');
			}
			K(body).html(val);
			if (self.afterSetHtml) {
				self.afterSetHtml();
			}
			return self;
		}
		if (val === undefined) {
			return self.textarea.val();
		}
		self.textarea.val(val);
		return self;
	},
	design : function(bool) {
		var self = this, val;
		if (bool === undefined ? !self.designMode : bool) {
			if (!self.designMode) {
				val = self.html();
				self.designMode = true;
				self.html(val);
				self.textarea.hide();
				self.iframe.show();
			}
		} else {
			if (self.designMode) {
				val = self.html();
				self.designMode = false;
				self.html(val);
				self.iframe.hide();
				self.textarea.show();
			}
		}
		return self.focus();
	},
	focus : function() {
		var self = this;
		self.designMode ? self.win.focus() : self.textarea[0].focus();
		return self;
	},
	blur : function() {
		var self = this;
		if (_IE) {
			var input = K('<input type="text" style="float:left;width:0;height:0;padding:0;margin:0;border:0;" value="" />', self.div);
			self.div.append(input);
			input[0].focus();
			input.remove();
		} else {
			self.designMode ? self.win.blur() : self.textarea[0].blur();
		}
		return self;
	},
	afterChange : function(fn) {
		var self = this, doc = self.doc, body = doc.body;
		K(doc).keyup(function(e) {
			if (!e.ctrlKey && !e.altKey && _CHANGE_KEY_MAP[e.which]) {
				fn(e);
			}
		});
		K(doc).mouseup(fn).contextmenu(fn);
		K(self.win).blur(fn);
		function timeoutHandler(e) {
			setTimeout(function() {
				fn(e);
			}, 1);
		}
		K(body).bind('paste', timeoutHandler);
		K(body).bind('cut', timeoutHandler);
		return self;
	}
});
function _edit(options) {
	return new KEdit(options);
}
K.EditClass = KEdit;
K.edit = _edit;
K.iframeDoc = _iframeDoc;
function _selectToolbar(name, fn) {
	var self = this,
		knode = self.get(name);
	if (knode) {
		if (knode.hasClass('ke-disabled')) {
			return;
		}
		fn(knode);
	}
}
function KToolbar(options) {
	this.init(options);
}
_extend(KToolbar, KWidget, {
	init : function(options) {
		var self = this;
		KToolbar.parent.init.call(self, options);
		self.disableMode = _undef(options.disableMode, false);
		self.noDisableItemMap = _toMap(_undef(options.noDisableItems, []));
		self._itemMap = {};
		self.div.addClass('ke-toolbar').bind('contextmenu,mousedown,mousemove', function(e) {
			e.preventDefault();
		}).attr('unselectable', 'on');
		function find(target) {
			var knode = K(target);
			if (knode.hasClass('ke-outline')) {
				return knode;
			}
			if (knode.hasClass('ke-toolbar-icon')) {
				return knode.parent();
			}
		}
		function hover(e, method) {
			var knode = find(e.target);
			if (knode) {
				if (knode.hasClass('ke-disabled')) {
					return;
				}
				if (knode.hasClass('ke-selected')) {
					return;
				}
				knode[method]('ke-on');
			}
		}
		self.div.mouseover(function(e) {
			hover(e, 'addClass');
		})
		.mouseout(function(e) {
			hover(e, 'removeClass');
		})
		.click(function(e) {
			var knode = find(e.target);
			if (knode) {
				if (knode.hasClass('ke-disabled')) {
					return;
				}
				self.options.click.call(this, e, knode.attr('data-name'));
			}
		});
	},
	get : function(name) {
		if (this._itemMap[name]) {
			return this._itemMap[name];
		}
		return (this._itemMap[name] = K('span.ke-icon-' + name, this.div).parent());
	},
	select : function(name) {
		_selectToolbar.call(this, name, function(knode) {
			knode.addClass('ke-selected');
		});
		return self;
	},
	unselect : function(name) {
		_selectToolbar.call(this, name, function(knode) {
			knode.removeClass('ke-selected').removeClass('ke-on');
		});
		return self;
	},
	enable : function(name) {
		var self = this,
			knode = name.get ? name : self.get(name);
		if (knode) {
			knode.removeClass('ke-disabled');
			knode.opacity(1);
		}
		return self;
	},
	disable : function(name) {
		var self = this,
			knode = name.get ? name : self.get(name);
		if (knode) {
			knode.removeClass('ke-selected').addClass('ke-disabled');
			knode.opacity(0.5);
		}
		return self;
	},
	disableAll : function(bool, noDisableItems) {
		var self = this, map = self.noDisableItemMap, item;
		if (noDisableItems) {
			map = _toMap(noDisableItems);
		}
		if (bool === undefined ? !self.disableMode : bool) {
			K('span.ke-outline', self.div).each(function() {
				var knode = K(this),
					name = knode[0].getAttribute('data-name', 2);
				if (!map[name]) {
					self.disable(knode);
				}
			});
			self.disableMode = true;
		} else {
			K('span.ke-outline', self.div).each(function() {
				var knode = K(this),
					name = knode[0].getAttribute('data-name', 2);
				if (!map[name]) {
					self.enable(knode);
				}
			});
			self.disableMode = false;
		}
		return self;
	}
});
function _toolbar(options) {
	return new KToolbar(options);
}
K.ToolbarClass = KToolbar;
K.toolbar = _toolbar;
function KMenu(options) {
	this.init(options);
}
_extend(KMenu, KWidget, {
	init : function(options) {
		var self = this;
		options.z = options.z || 811213;
		KMenu.parent.init.call(self, options);
		self.centerLineMode = _undef(options.centerLineMode, true);
		self.div.addClass('ke-menu').bind('click,mousedown', function(e){
			e.stopPropagation();
		}).attr('unselectable', 'on');
	},
	addItem : function(item) {
		var self = this;
		if (item.title === '-') {
			self.div.append(K('<div class="ke-menu-separator"></div>'));
			return;
		}
		var itemDiv = K('<div class="ke-menu-item" unselectable="on"></div>'),
			leftDiv = K('<div class="ke-inline-block ke-menu-item-left"></div>'),
			rightDiv = K('<div class="ke-inline-block ke-menu-item-right"></div>'),
			height = _addUnit(item.height),
			iconClass = _undef(item.iconClass, '');
		self.div.append(itemDiv);
		if (height) {
			itemDiv.css('height', height);
			rightDiv.css('line-height', height);
		}
		var centerDiv;
		if (self.centerLineMode) {
			centerDiv = K('<div class="ke-inline-block ke-menu-item-center"></div>');
			if (height) {
				centerDiv.css('height', height);
			}
		}
		itemDiv.mouseover(function(e) {
			K(this).addClass('ke-menu-item-on');
			if (centerDiv) {
				centerDiv.addClass('ke-menu-item-center-on');
			}
		})
		.mouseout(function(e) {
			K(this).removeClass('ke-menu-item-on');
			if (centerDiv) {
				centerDiv.removeClass('ke-menu-item-center-on');
			}
		})
		.click(function(e) {
			item.click.call(K(this));
			e.stopPropagation();
		})
		.append(leftDiv);
		if (centerDiv) {
			itemDiv.append(centerDiv);
		}
		itemDiv.append(rightDiv);
		if (item.checked) {
			iconClass = 'ke-icon-checked';
		}
		if (iconClass !== '') {
			leftDiv.html('<span class="ke-inline-block ke-toolbar-icon ke-toolbar-icon-url ' + iconClass + '"></span>');
		}
		rightDiv.html(item.title);
		return self;
	},
	remove : function() {
		var self = this;
		if (self.options.beforeRemove) {
			self.options.beforeRemove.call(self);
		}
		K('.ke-menu-item', self.div[0]).unbind();
		KMenu.parent.remove.call(self);
		return self;
	}
});
function _menu(options) {
	return new KMenu(options);
}
K.MenuClass = KMenu;
K.menu = _menu;
function KColorPicker(options) {
	this.init(options);
}
_extend(KColorPicker, KWidget, {
	init : function(options) {
		var self = this;
		options.z = options.z || 811213;
		KColorPicker.parent.init.call(self, options);
		var colors = options.colors || [
			['#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500'],
			['#009900', '#006600', '#99BB00', '#B8D100', '#60D978', '#00D5FF'],
			['#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE'],
			['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000']
		];
		self.selectedColor = (options.selectedColor || '').toLowerCase();
		self._cells = [];
		self.div.addClass('ke-colorpicker').bind('click,mousedown', function(e){
			e.stopPropagation();
		}).attr('unselectable', 'on');
		var table = self.doc.createElement('table');
		self.div.append(table);
		table.className = 'ke-colorpicker-table';
		table.cellPadding = 0;
		table.cellSpacing = 0;
		table.border = 0;
		var row = table.insertRow(0), cell = row.insertCell(0);
		cell.colSpan = colors[0].length;
		self._addAttr(cell, '', 'ke-colorpicker-cell-top');
		for (var i = 0; i < colors.length; i++) {
			row = table.insertRow(i + 1);
			for (var j = 0; j < colors[i].length; j++) {
				cell = row.insertCell(j);
				self._addAttr(cell, colors[i][j], 'ke-colorpicker-cell');
			}
		}
	},
	_addAttr : function(cell, color, cls) {
		var self = this;
		cell = K(cell).addClass(cls);
		if (self.selectedColor === color.toLowerCase()) {
			cell.addClass('ke-colorpicker-cell-selected');
		}
		cell.attr('title', color || self.options.noColor);
		cell.mouseover(function(e) {
			K(this).addClass('ke-colorpicker-cell-on');
		});
		cell.mouseout(function(e) {
			K(this).removeClass('ke-colorpicker-cell-on');
		});
		cell.click(function(e) {
			e.stop();
			self.options.click.call(K(this), color);
		});
		if (color) {
			cell.append(K('<div class="ke-colorpicker-cell-color" unselectable="on"></div>').css('background-color', color));
		} else {
			cell.html(self.options.noColor);
		}
		K(cell).attr('unselectable', 'on');
		self._cells.push(cell);
	},
	remove : function() {
		var self = this;
		_each(self._cells, function() {
			this.unbind();
		});
		KColorPicker.parent.remove.call(self);
		return self;
	}
});
function _colorpicker(options) {
	return new KColorPicker(options);
}
K.ColorPickerClass = KColorPicker;
K.colorpicker = _colorpicker;
function KUploadButton(options) {
	this.init(options);
}
_extend(KUploadButton, {
	init : function(options) {
		var self = this,
			button = K(options.button),
			fieldName = options.fieldName || 'file',
			url = options.url || '',
			title = button.val(),
			extraParams = options.extraParams || {},
			cls = button[0].className || '',
			target = options.target || 'kindeditor_upload_iframe_' + new Date().getTime();
		options.afterError = options.afterError || function(str) {
			alert(str);
		};
		var hiddenElements = [];
		for(var k in extraParams){
			hiddenElements.push('<input type="hidden" name="' + k + '" value="' + extraParams[k] + '" />');
		}
		var html = [
			'<div class="ke-inline-block ' + cls + '">',
			(options.target ? '' : '<iframe name="' + target + '" style="display:none;"></iframe>'),
			(options.form ? '<div class="ke-upload-area">' : '<form class="ke-upload-area ke-form" method="post" enctype="multipart/form-data" target="' + target + '" action="' + url + '">'),
			'<span class="ke-button-common">',
			hiddenElements.join(''),
			'<input type="button" class="ke-button-common ke-button" value="' + title + '" />',
			'</span>',
			'<input type="file" class="ke-upload-file" name="' + fieldName + '" tabindex="-1" />',
			(options.form ? '</div>' : '</form>'),
			'</div>'].join('');
		var div = K(html, button.doc);
		button.hide();
		button.before(div);
		self.div = div;
		self.button = button;
		self.iframe = options.target ? K('iframe[name="' + target + '"]') : K('iframe', div);
		self.form = options.form ? K(options.form) : K('form', div);
		var width = options.width || K('.ke-button-common', div).width();
		self.fileBox = K('.ke-upload-file', div).width(width);
		self.options = options;
	},
	submit : function() {
		var self = this,
			iframe = self.iframe;
		iframe.bind('load', function() {
			iframe.unbind();
			var tempForm = document.createElement('form');
			self.fileBox.before(tempForm);
			K(tempForm).append(self.fileBox);
			tempForm.reset();
			K(tempForm).remove(true);
			var doc = K.iframeDoc(iframe),
				pre = doc.getElementsByTagName('pre')[0],
				str = '', data;
			if (pre) {
				str = pre.innerHTML;
			} else {
				str = doc.body.innerHTML;
			}
			str = _unescape(str);
			iframe[0].src = 'javascript:false';
			try {
				data = K.json(str);
			} catch (e) {
				self.options.afterError.call(self, '<!doctype html><html>' + doc.body.parentNode.innerHTML + '</html>');
			}
			if (data) {
				self.options.afterUpload.call(self, data);
			}
		});
		self.form[0].submit();
		return self;
	},
	remove : function() {
		var self = this;
		if (self.fileBox) {
			self.fileBox.unbind();
		}
		self.iframe.remove();
		self.div.remove();
		self.button.show();
		return self;
	}
});
function _uploadbutton(options) {
	return new KUploadButton(options);
}
K.UploadButtonClass = KUploadButton;
K.uploadbutton = _uploadbutton;
function _createButton(arg) {
	arg = arg || {};
	var name = arg.name || '',
		span = K('<span class="ke-button-common ke-button-outer" title="' + name + '"></span>'),
		btn = K('<input class="ke-button-common ke-button" type="button" value="' + name + '" />');
	if (arg.click) {
		btn.click(arg.click);
	}
	span.append(btn);
	return span;
}
function KDialog(options) {
	this.init(options);
}
_extend(KDialog, KWidget, {
	init : function(options) {
		var self = this;
		var shadowMode = _undef(options.shadowMode, true);
		options.z = options.z || 811213;
		options.shadowMode = false;
		options.autoScroll = _undef(options.autoScroll, true);
		KDialog.parent.init.call(self, options);
		var title = options.title,
			body = K(options.body, self.doc),
			previewBtn = options.previewBtn,
			yesBtn = options.yesBtn,
			noBtn = options.noBtn,
			closeBtn = options.closeBtn,
			showMask = _undef(options.showMask, true);
		self.div.addClass('ke-dialog').bind('click,mousedown', function(e){
			e.stopPropagation();
		});
		var contentDiv = K('<div class="ke-dialog-content"></div>').appendTo(self.div);
		if (_IE && _V < 7) {
			self.iframeMask = K('<iframe src="about:blank" class="ke-dialog-shadow"></iframe>').appendTo(self.div);
		} else if (shadowMode) {
			K('<div class="ke-dialog-shadow"></div>').appendTo(self.div);
		}
		var headerDiv = K('<div class="ke-dialog-header"></div>');
		contentDiv.append(headerDiv);
		headerDiv.html(title);
		self.closeIcon = K('<span class="ke-dialog-icon-close" title="' + closeBtn.name + '"></span>').click(closeBtn.click);
		headerDiv.append(self.closeIcon);
		self.draggable({
			clickEl : headerDiv,
			beforeDrag : options.beforeDrag
		});
		var bodyDiv = K('<div class="ke-dialog-body"></div>');
		contentDiv.append(bodyDiv);
		bodyDiv.append(body);
		var footerDiv = K('<div class="ke-dialog-footer"></div>');
		if (previewBtn || yesBtn || noBtn) {
			contentDiv.append(footerDiv);
		}
		_each([
			{ btn : previewBtn, name : 'preview' },
			{ btn : yesBtn, name : 'yes' },
			{ btn : noBtn, name : 'no' }
		], function() {
			if (this.btn) {
				var button = _createButton(this.btn);
				button.addClass('ke-dialog-' + this.name);
				footerDiv.append(button);
			}
		});
		if (self.height) {
			bodyDiv.height(_removeUnit(self.height) - headerDiv.height() - footerDiv.height());
		}
		self.div.width(self.div.width());
		self.div.height(self.div.height());
		self.mask = null;
		if (showMask) {
			var docEl = _docElement(self.doc),
				docWidth = Math.max(docEl.scrollWidth, docEl.clientWidth),
				docHeight = Math.max(docEl.scrollHeight, docEl.clientHeight);
			self.mask = _widget({
				x : 0,
				y : 0,
				z : self.z - 1,
				cls : 'ke-dialog-mask',
				width : docWidth,
				height : docHeight
			});
		}
		self.autoPos(self.div.width(), self.div.height());
		self.footerDiv = footerDiv;
		self.bodyDiv = bodyDiv;
		self.headerDiv = headerDiv;
		self.isLoading = false;
	},
	setMaskIndex : function(z) {
		var self = this;
		self.mask.div.css('z-index', z);
	},
	showLoading : function(msg) {
		msg = _undef(msg, '');
		var self = this, body = self.bodyDiv;
		self.loading = K('<div class="ke-dialog-loading"><div class="ke-inline-block ke-dialog-loading-content" >' + msg + '</div></div>')
			.width(body.width()).height(body.height())
			.css('top', self.headerDiv.height() + 'px');
		body.css('visibility', 'hidden').after(self.loading);
		self.isLoading = true;
		return self;
	},
	hideLoading : function() {
		this.loading && this.loading.remove();
		this.bodyDiv.css('visibility', 'visible');
		this.isLoading = false;
		return this;
	},
	remove : function() {
		var self = this;
		if (self.options.beforeRemove) {
			self.options.beforeRemove.call(self);
		}
		self.mask && self.mask.remove();
		self.iframeMask && self.iframeMask.remove();
		self.closeIcon.unbind();
		K('input', self.div).unbind();
		K('button', self.div).unbind();
		self.footerDiv.unbind();
		self.bodyDiv.unbind();
		self.headerDiv.unbind();
		K('iframe', self.div).each(function() {
			K(this).remove();
		});
		KDialog.parent.remove.call(self);
		return self;
	}
});
function _dialog(options) {
	return new KDialog(options);
}
K.DialogClass = KDialog;
K.dialog = _dialog;
function _tabs(options) {
	var self = _widget(options),
		remove = self.remove,
		afterSelect = options.afterSelect,
		div = self.div,
		liList = [];
	div.addClass('ke-tabs')
		.bind('contextmenu,mousedown,mousemove', function(e) {
			e.preventDefault();
		});
	var ul = K('<ul class="ke-tabs-ul ke-clearfix"></ul>');
	div.append(ul);
	self.add = function(tab) {
		var li = K('<li class="ke-tabs-li">' + tab.title + '</li>');
		li.data('tab', tab);
		liList.push(li);
		ul.append(li);
	};
	self.selectedIndex = 0;
	self.select = function(index) {
		self.selectedIndex = index;
		_each(liList, function(i, li) {
			li.unbind();
			if (i === index) {
				li.addClass('ke-tabs-li-selected');
				K(li.data('tab').panel).show('');
			} else {
				li.removeClass('ke-tabs-li-selected').removeClass('ke-tabs-li-on')
				.mouseover(function() {
					K(this).addClass('ke-tabs-li-on');
				})
				.mouseout(function() {
					K(this).removeClass('ke-tabs-li-on');
				})
				.click(function() {
					self.select(i);
				});
				K(li.data('tab').panel).hide();
			}
		});
		if (afterSelect) {
			afterSelect.call(self, index);
		}
	};
	self.remove = function() {
		_each(liList, function() {
			this.remove();
		});
		ul.remove();
		remove.call(self);
	};
	return self;
}
K.tabs = _tabs;
function _loadScript(url, fn) {
	var head = document.getElementsByTagName('head')[0] || (_QUIRKS ? document.body : document.documentElement),
		script = document.createElement('script');
	head.appendChild(script);
	script.src = url;
	script.charset = 'utf-8';
	script.onload = script.onreadystatechange = function() {
		if (!this.readyState || this.readyState === 'loaded') {
			if (fn) {
				fn();
			}
			script.onload = script.onreadystatechange = null;
			head.removeChild(script);
		}
	};
}
function _chopQuery(url) {
	var index = url.indexOf('?');
	return index > 0 ? url.substr(0, index) : url;
}
function _loadStyle(url) {
	var head = document.getElementsByTagName('head')[0] || (_QUIRKS ? document.body : document.documentElement),
		link = document.createElement('link'),
		absoluteUrl = _chopQuery(_formatUrl(url, 'absolute'));
	var links = K('link[rel="stylesheet"]', head);
	for (var i = 0, len = links.length; i < len; i++) {
		if (_chopQuery(_formatUrl(links[i].href, 'absolute')) === absoluteUrl) {
			return;
		}
	}
	head.appendChild(link);
	link.href = url;
	link.rel = 'stylesheet';
}
function _ajax(url, fn, method, param, dataType) {
	method = method || 'GET';
	dataType = dataType || 'json';
	var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xhr.open(method, url, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			if (fn) {
				var data = _trim(xhr.responseText);
				if (dataType == 'json') {
					data = _json(data);
				}
				fn(data);
			}
		}
	};
	if (method == 'POST') {
		var params = [];
		_each(param, function(key, val) {
			params.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
		});
		try {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		} catch (e) {}
		xhr.send(params.join('&'));
	} else {
		xhr.send(null);
	}
}
K.loadScript = _loadScript;
K.loadStyle = _loadStyle;
K.ajax = _ajax;
var _plugins = {};
function _plugin(name, fn) {
	if (name === undefined) {
		return _plugins;
	}
	if (!fn) {
		return _plugins[name];
	}
	_plugins[name] = fn;
}
var _language = {};
function _parseLangKey(key) {
	var match, ns = 'core';
	if ((match = /^(\w+)\.(\w+)$/.exec(key))) {
		ns = match[1];
		key = match[2];
	}
	return { ns : ns, key : key };
}
function _lang(mixed, langType) {
	langType = langType === undefined ? K.options.langType : langType;
	if (typeof mixed === 'string') {
		if (!_language[langType]) {
			return 'no language';
		}
		var pos = mixed.length - 1;
		if (mixed.substr(pos) === '.') {
			return _language[langType][mixed.substr(0, pos)];
		}
		var obj = _parseLangKey(mixed);
		return _language[langType][obj.ns][obj.key];
	}
	_each(mixed, function(key, val) {
		var obj = _parseLangKey(key);
		if (!_language[langType]) {
			_language[langType] = {};
		}
		if (!_language[langType][obj.ns]) {
			_language[langType][obj.ns] = {};
		}
		_language[langType][obj.ns][obj.key] = val;
	});
}
function _getImageFromRange(range, fn) {
	if (range.collapsed) {
		return;
	}
	range = range.cloneRange().up();
	var sc = range.startContainer, so = range.startOffset;
	if (!_WEBKIT && !range.isControl()) {
		return;
	}
	var img = K(sc.childNodes[so]);
	if (!img || img.name != 'img') {
		return;
	}
	if (fn(img)) {
		return img;
	}
}
function _bindContextmenuEvent() {
	var self = this, doc = self.edit.doc;
	K(doc).contextmenu(function(e) {
		if (self.menu) {
			self.hideMenu();
		}
		if (!self.useContextmenu) {
			e.preventDefault();
			return;
		}
		if (self._contextmenus.length === 0) {
			return;
		}
		var maxWidth = 0, items = [];
		_each(self._contextmenus, function() {
			if (this.title == '-') {
				items.push(this);
				return;
			}
			if (this.cond && this.cond()) {
				items.push(this);
				if (this.width && this.width > maxWidth) {
					maxWidth = this.width;
				}
			}
		});
		while (items.length > 0 && items[0].title == '-') {
			items.shift();
		}
		while (items.length > 0 && items[items.length - 1].title == '-') {
			items.pop();
		}
		var prevItem = null;
		_each(items, function(i) {
			if (this.title == '-' && prevItem.title == '-') {
				delete items[i];
			}
			prevItem = this;
		});
		if (items.length > 0) {
			e.preventDefault();
			var pos = K(self.edit.iframe).pos(),
				menu = _menu({
					x : pos.x + e.clientX,
					y : pos.y + e.clientY,
					width : maxWidth,
					css : { visibility: 'hidden' },
					shadowMode : self.shadowMode
				});
			_each(items, function() {
				if (this.title) {
					menu.addItem(this);
				}
			});
			var docEl = _docElement(menu.doc),
				menuHeight = menu.div.height();
			if (e.clientY + menuHeight >= docEl.clientHeight - 100) {
				menu.pos(menu.x, _removeUnit(menu.y) - menuHeight);
			}
			menu.div.css('visibility', 'visible');
			self.menu = menu;
		}
	});
}
function _bindNewlineEvent() {
	var self = this, doc = self.edit.doc, newlineTag = self.newlineTag;
	if (_IE && newlineTag !== 'br') {
		return;
	}
	if (_GECKO && _V < 3 && newlineTag !== 'p') {
		return;
	}
	if (_OPERA && _V < 9) {
		return;
	}
	var brSkipTagMap = _toMap('h1,h2,h3,h4,h5,h6,pre,li'),
		pSkipTagMap = _toMap('p,h1,h2,h3,h4,h5,h6,pre,li,blockquote');
	function getAncestorTagName(range) {
		var ancestor = K(range.commonAncestor());
		while (ancestor) {
			if (ancestor.type == 1 && !ancestor.isStyle()) {
				break;
			}
			ancestor = ancestor.parent();
		}
		return ancestor.name;
	}
	K(doc).keydown(function(e) {
		if (e.which != 13 || e.shiftKey || e.ctrlKey || e.altKey) {
			return;
		}
		self.cmd.selection();
		var tagName = getAncestorTagName(self.cmd.range);
		if (tagName == 'marquee' || tagName == 'select') {
			return;
		}
		if (newlineTag === 'br' && !brSkipTagMap[tagName]) {
			e.preventDefault();
			self.insertHtml('<br />' + (_IE && _V < 9 ? '' : '\u200B'));
			return;
		}
		if (!pSkipTagMap[tagName]) {
			_nativeCommand(doc, 'formatblock', '<p>');
		}
	});
	K(doc).keyup(function(e) {
		if (e.which != 13 || e.shiftKey || e.ctrlKey || e.altKey) {
			return;
		}
		if (newlineTag == 'br') {
			return;
		}
		if (_GECKO) {
			var root = self.cmd.commonAncestor('p');
			var a = self.cmd.commonAncestor('a');
			if (a && a.text() == '') {
				a.remove(true);
				self.cmd.range.selectNodeContents(root[0]).collapse(true);
				self.cmd.select();
			}
			return;
		}
		self.cmd.selection();
		var tagName = getAncestorTagName(self.cmd.range);
		if (tagName == 'marquee' || tagName == 'select') {
			return;
		}
		if (!pSkipTagMap[tagName]) {
			_nativeCommand(doc, 'formatblock', '<p>');
		}
		var div = self.cmd.commonAncestor('div');
		if (div) {
			var p = K('<p></p>'),
				child = div[0].firstChild;
			while (child) {
				var next = child.nextSibling;
				p.append(child);
				child = next;
			}
			div.before(p);
			div.remove();
			self.cmd.range.selectNodeContents(p[0]);
			self.cmd.select();
		}
	});
}
function _bindTabEvent() {
	var self = this, doc = self.edit.doc;
	K(doc).keydown(function(e) {
		if (e.which == 9) {
			e.preventDefault();
			if (self.afterTab) {
				self.afterTab.call(self, e);
				return;
			}
			var cmd = self.cmd, range = cmd.range;
			range.shrink();
			if (range.collapsed && range.startContainer.nodeType == 1) {
				range.insertNode(K('@&nbsp;', doc)[0]);
				cmd.select();
			}
			self.insertHtml('&nbsp;&nbsp;&nbsp;&nbsp;');
		}
	});
}
function _bindFocusEvent() {
	var self = this;
	K(self.edit.textarea[0], self.edit.win).focus(function(e) {
		if (self.afterFocus) {
			self.afterFocus.call(self, e);
		}
	}).blur(function(e) {
		if (self.afterBlur) {
			self.afterBlur.call(self, e);
		}
	});
}
function _removeBookmarkTag(html) {
	return _trim(html.replace(/<span [^>]*id="?__kindeditor_bookmark_\w+_\d+__"?[^>]*><\/span>/ig, ''));
}
function _removeTempTag(html) {
	return html.replace(/<div[^>]+class="?__kindeditor_paste__"?[^>]*>[\s\S]*?<\/div>/ig, '');
}
function _addBookmarkToStack(stack, bookmark) {
	if (stack.length === 0) {
		stack.push(bookmark);
		return;
	}
	var prev = stack[stack.length - 1];
	if (_removeBookmarkTag(bookmark.html) !== _removeBookmarkTag(prev.html)) {
		stack.push(bookmark);
	}
}
function _undoToRedo(fromStack, toStack) {
	var self = this, edit = self.edit,
		body = edit.doc.body,
		range, bookmark;
	if (fromStack.length === 0) {
		return self;
	}
	if (edit.designMode) {
		range = self.cmd.range;
		bookmark = range.createBookmark(true);
		bookmark.html = body.innerHTML;
	} else {
		bookmark = {
			html : body.innerHTML
		};
	}
	_addBookmarkToStack(toStack, bookmark);
	var prev = fromStack.pop();
	if (_removeBookmarkTag(bookmark.html) === _removeBookmarkTag(prev.html) && fromStack.length > 0) {
		prev = fromStack.pop();
	}
	if (edit.designMode) {
		edit.html(prev.html);
		if (prev.start) {
			range.moveToBookmark(prev);
			self.select();
		}
	} else {
		K(body).html(_removeBookmarkTag(prev.html));
	}
	return self;
}
function KEditor(options) {
	var self = this;
	self.options = {};
	function setOption(key, val) {
		if (KEditor.prototype[key] === undefined) {
			self[key] = val;
		}
		self.options[key] = val;
	}
	_each(options, function(key, val) {
		setOption(key, options[key]);
	});
	_each(K.options, function(key, val) {
		if (self[key] === undefined) {
			setOption(key, val);
		}
	});
	var se = K(self.srcElement || '<textarea/>');
	if (!self.width) {
		self.width = se[0].style.width || se.width();
	}
	if (!self.height) {
		self.height = se[0].style.height || se.height();
	}
	setOption('width', _undef(self.width, self.minWidth));
	setOption('height', _undef(self.height, self.minHeight));
	setOption('width', _addUnit(self.width));
	setOption('height', _addUnit(self.height));
	if (_MOBILE && (!_IOS || _V < 534)) {
		self.designMode = false;
	}
	self.srcElement = se;
	self.initContent = '';
	self.plugin = {};
	self.isCreated = false;
	self.isLoading = false;
	self._handlers = {};
	self._contextmenus = [];
	self._undoStack = [];
	self._redoStack = [];
	self._calledPlugins = {};
	self._firstAddBookmark = true;
	self.menu = self.contextmenu = null;
	self.dialogs = [];
}
KEditor.prototype = {
	lang : function(mixed) {
		return _lang(mixed, this.langType);
	},
	loadPlugin : function(name, fn) {
		var self = this;
		if (_plugins[name]) {
			if (self._calledPlugins[name]) {
				if (fn) {
					fn.call(self);
				}
				return self;
			}
			_plugins[name].call(self, KindEditor);
			if (fn) {
				fn.call(self);
			}
			self._calledPlugins[name] = true;
			return self;
		}
		if (self.isLoading) {
			return self;
		}
		self.isLoading = true;
		_loadScript(self.pluginsPath + name + '/' + name + '.js?ver=' + encodeURIComponent(K.DEBUG ? _TIME : _VERSION), function() {
			self.isLoading = false;
			if (_plugins[name]) {
				self.loadPlugin(name, fn);
			}
		});
		return self;
	},
	handler : function(key, fn) {
		var self = this;
		if (!self._handlers[key]) {
			self._handlers[key] = [];
		}
		if (_isFunction(fn)) {
			self._handlers[key].push(fn);
			return self;
		}
		_each(self._handlers[key], function() {
			fn = this.call(self, fn);
		});
		return fn;
	},
	clickToolbar : function(name, fn) {
		var self = this, key = 'clickToolbar' + name;
		if (fn === undefined) {
			if (self._handlers[key]) {
				return self.handler(key);
			}
			self.loadPlugin(name, function() {
				self.handler(key);
			});
			return self;
		}
		return self.handler(key, fn);
	},
	updateState : function() {
		var self = this;
		_each(('justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,' +
			'subscript,superscript,bold,italic,underline,strikethrough').split(','), function(i, name) {
			self.cmd.state(name) ? self.toolbar.select(name) : self.toolbar.unselect(name);
		});
		return self;
	},
	addContextmenu : function(item) {
		this._contextmenus.push(item);
		return this;
	},
	afterCreate : function(fn) {
		return this.handler('afterCreate', fn);
	},
	beforeRemove : function(fn) {
		return this.handler('beforeRemove', fn);
	},
	beforeGetHtml : function(fn) {
		return this.handler('beforeGetHtml', fn);
	},
	beforeSetHtml : function(fn) {
		return this.handler('beforeSetHtml', fn);
	},
	afterSetHtml : function(fn) {
		return this.handler('afterSetHtml', fn);
	},
	create : function() {
		var self = this, fullscreenMode = self.fullscreenMode;
		if (self.isCreated) {
			return self;
		}
		if (self.srcElement.data('kindeditor')) {
			return self;
		}
		self.srcElement.data('kindeditor', 'true');
		if (fullscreenMode) {
			_docElement().style.overflow = 'hidden';
		} else {
			_docElement().style.overflow = '';
		}
		var width = fullscreenMode ? _docElement().clientWidth + 'px' : self.width,
			height = fullscreenMode ? _docElement().clientHeight + 'px' : self.height;
		if ((_IE && _V < 8) || _QUIRKS) {
			height = _addUnit(_removeUnit(height) + 2);
		}
		var container = self.container = K(self.layout);
		if (fullscreenMode) {
			K(document.body).append(container);
		} else {
			self.srcElement.before(container);
		}
		var toolbarDiv = K('.toolbar', container),
			editDiv = K('.edit', container),
			statusbar = self.statusbar = K('.statusbar', container);
		container.removeClass('container')
			.addClass('ke-container ke-container-' + self.themeType).css('width', width);
		if (fullscreenMode) {
			container.css({
				position : 'absolute',
				left : 0,
				top : 0,
				'z-index' : 811211
			});
			if (!_GECKO) {
				self._scrollPos = _getScrollPos();
			}
			window.scrollTo(0, 0);
			K(document.body).css({
				//'height' : '1px',
			//	'overflow' : 'hidden'
			});
			K(document.body.parentNode).css('overflow', 'hidden');
			self._fullscreenExecuted = true;
		} else {
			if (self._fullscreenExecuted) {
				K(document.body).css({
					'height' : '',
					'overflow' : ''
				});
				K(document.body.parentNode).css('overflow', '');
			}
			if (self._scrollPos) {
				window.scrollTo(self._scrollPos.x, self._scrollPos.y);
			}
		}
		var htmlList = [];
		K.each(self.items, function(i, name) {
			if (name == '|') {
				htmlList.push('<span class="ke-inline-block ke-separator"></span>');
			} else if (name == '/') {
				htmlList.push('<div class="ke-hr"></div>');
			} else {
				htmlList.push('<span class="ke-outline" data-name="' + name + '" title="' + self.lang(name) + '" unselectable="on">');
				htmlList.push('<span class="ke-toolbar-icon ke-toolbar-icon-url ke-icon-' + name + '" unselectable="on"></span></span>');
			}
		});
		var toolbar = self.toolbar = _toolbar({
			src : toolbarDiv,
			html : htmlList.join(''),
			noDisableItems : self.noDisableItems,
			click : function(e, name) {
				e.stop();
				if (self.menu) {
					var menuName = self.menu.name;
					self.hideMenu();
					if (menuName === name) {
						return;
					}
				}
				self.clickToolbar(name);
			}
		});
		var editHeight = _removeUnit(height) - toolbar.div.height();
		var edit = self.edit = _edit({
			height : editHeight > 0 && _removeUnit(height) > self.minHeight ? editHeight : self.minHeight,
			src : editDiv,
			srcElement : self.srcElement,
			designMode : self.designMode,
			themesPath : self.themesPath,
			bodyClass : self.bodyClass,
			cssPath : self.cssPath,
			cssData : self.cssData,
			beforeGetHtml : function(html) {
				html = self.beforeGetHtml(html);
				return _formatHtml(html, self.filterMode ? self.htmlTags : null, self.urlType, self.wellFormatMode, self.indentChar);
			},
			beforeSetHtml : function(html) {
				html = _formatHtml(html, self.filterMode ? self.htmlTags : null, '', false);
				return self.beforeSetHtml(html);
			},
			afterSetHtml : function() {
				self.edit = edit = this;
				self.afterSetHtml();
			},
			afterCreate : function() {
				self.edit = edit = this;
				self.cmd = edit.cmd;
				self._docMousedownFn = function(e) {
					if (self.menu) {
						self.hideMenu();
					}
				};
				K(edit.doc, document).mousedown(self._docMousedownFn);
				_bindContextmenuEvent.call(self);
				_bindNewlineEvent.call(self);
				_bindTabEvent.call(self);
				_bindFocusEvent.call(self);
				edit.afterChange(function(e) {
					if (!edit.designMode) {
						return;
					}
					self.updateState();
					self.addBookmark();
					if (self.options.afterChange) {
						self.options.afterChange.call(self);
					}
				});
				edit.textarea.keyup(function(e) {
					if (!e.ctrlKey && !e.altKey && _INPUT_KEY_MAP[e.which]) {
						if (self.options.afterChange) {
							self.options.afterChange.call(self);
						}
					}
				});
				if (self.readonlyMode) {
					self.readonly();
				}
				self.isCreated = true;
				if (self.initContent === '') {
					self.initContent = self.html();
				}
				self.afterCreate();
				if (self.options.afterCreate) {
					self.options.afterCreate.call(self);
				}
			}
		});
		statusbar.removeClass('statusbar').addClass('ke-statusbar')
			.append('<span class="ke-inline-block ke-statusbar-center-icon"></span>')
			.append('<span class="ke-inline-block ke-statusbar-right-icon"></span>');
		if (self._fullscreenResizeHandler) {
			K(window).unbind('resize', self._fullscreenResizeHandler);
			self._fullscreenResizeHandler = null;
		}
		function initResize() {
			if (statusbar.height() === 0) {
				setTimeout(initResize, 100);
				return;
			}
			self.resize(width, height, false);
		}
		initResize();
		if (fullscreenMode) {
			self._fullscreenResizeHandler = function(e) {
				if (self.isCreated) {
					self.resize(_docElement().clientWidth, _docElement().clientHeight, false);
				}
			};
			K(window).bind('resize', self._fullscreenResizeHandler);
			toolbar.select('fullscreen');
			statusbar.first().css('visibility', 'hidden');
			statusbar.last().css('visibility', 'hidden');
		} else {
			if (_GECKO) {
				K(window).bind('scroll', function(e) {
					self._scrollPos = _getScrollPos();
				});
			}
			if (self.resizeType > 0) {
				_drag({
					moveEl : container,
					clickEl : statusbar,
					moveFn : function(x, y, width, height, diffX, diffY) {
						height += diffY;
						self.resize(null, height);
					}
				});
			} else {
				statusbar.first().css('visibility', 'hidden');
			}
			if (self.resizeType === 2) {
				_drag({
					moveEl : container,
					clickEl : statusbar.last(),
					moveFn : function(x, y, width, height, diffX, diffY) {
						width += diffX;
						height += diffY;
						self.resize(width, height);
					}
				});
			} else {
				statusbar.last().css('visibility', 'hidden');
			}
		}
		return self;
	},
	remove : function() {
		var self = this;
		if (!self.isCreated) {
			return self;
		}
		self.beforeRemove();
		self.srcElement.data('kindeditor', '');
		if (self.menu) {
			self.hideMenu();
		}
		_each(self.dialogs, function() {
			self.hideDialog();
		});
		K(document).unbind('mousedown', self._docMousedownFn);
		self.toolbar.remove();
		self.edit.remove();
		self.statusbar.last().unbind();
		self.statusbar.unbind();
		self.container.remove();
		self.container = self.toolbar = self.edit = self.menu = null;
		self.dialogs = [];
		self.isCreated = false;
		return self;
	},
	resize : function(width, height, updateProp) {
		var self = this;
		updateProp = _undef(updateProp, true);
		if (width) {
			if (!/%/.test(width)) {
				width = _removeUnit(width);
				width = width < self.minWidth ? self.minWidth : width;
			}
			self.container.css('width', _addUnit(width));
			if (updateProp) {
				self.width = _addUnit(width);
			}
		}
		if (height) {
			height = _removeUnit(height);
			editHeight = _removeUnit(height) - self.toolbar.div.height() - self.statusbar.height();
			editHeight = editHeight < self.minHeight ? self.minHeight : editHeight;
			self.edit.setHeight(editHeight);
			if (updateProp) {
				self.height = _addUnit(height);
			}
		}
		return self;
	},
	select : function() {
		this.isCreated && this.cmd.select();
		return this;
	},
	html : function(val) {
		var self = this;
		if (val === undefined) {
			return self.isCreated ? self.edit.html() : _elementVal(self.srcElement);
		}
		self.isCreated ? self.edit.html(val) : _elementVal(self.srcElement, val);
		if (self.isCreated) {
			self.cmd.selection();
		}
		return self;
	},
	fullHtml : function() {
		return this.isCreated ? this.edit.html(undefined, true) : '';
	},
	text : function(val) {
		var self = this;
		if (val === undefined) {
			return _trim(self.html().replace(/<(?!img|embed).*?>/ig, '').replace(/&nbsp;/ig, ' '));
		} else {
			return self.html(_escape(val));
		}
	},
	isEmpty : function() {
		return _trim(this.text().replace(/\r\n|\n|\r/, '')) === '';
	},
	isDirty : function() {
		return _trim(this.initContent.replace(/\r\n|\n|\r|t/g, '')) !== _trim(this.html().replace(/\r\n|\n|\r|t/g, ''));
	},
	selectedHtml : function() {
		return this.isCreated ? this.cmd.range.html() : '';
	},
	count : function(mode) {
		var self = this;
		mode = (mode || 'html').toLowerCase();
		if (mode === 'html') {
			return _removeBookmarkTag(_removeTempTag(self.html())).length;
		}
		if (mode === 'text') {
			return self.text().replace(/<(?:img|embed).*?>/ig, 'K').replace(/\r\n|\n|\r/g, '').length;
		}
		return 0;
	},
	exec : function(key) {
		key = key.toLowerCase();
		var self = this, cmd = self.cmd,
			changeFlag = _inArray(key, 'selectall,copy,paste,print'.split(',')) < 0;
		if (changeFlag) {
			self.addBookmark(false);
		}
		cmd[key].apply(cmd, _toArray(arguments, 1));
		if (changeFlag) {
			self.updateState();
			self.addBookmark(false);
			if (self.options.afterChange) {
				self.options.afterChange.call(self);
			}
		}
		return self;
	},
	insertHtml : function(val, quickMode) {
		if (!this.isCreated) {
			return this;
		}
		val = this.beforeSetHtml(val);
		this.exec('inserthtml', val, quickMode);
		return this;
	},
	appendHtml : function(val) {
		this.html(this.html() + val);
		if (this.isCreated) {
			var cmd = this.cmd;
			cmd.range.selectNodeContents(cmd.doc.body).collapse(false);
			cmd.select();
		}
		return this;
	},
	sync : function() {
		_elementVal(this.srcElement, this.html());
		return this;
	},
	focus : function() {
		this.isCreated ? this.edit.focus() : this.srcElement[0].focus();
		return this;
	},
	blur : function() {
		this.isCreated ? this.edit.blur() : this.srcElement[0].blur();
		return this;
	},
	addBookmark : function(checkSize) {
		checkSize = _undef(checkSize, true);
		var self = this, edit = self.edit,
			body = edit.doc.body,
			html = _removeTempTag(body.innerHTML), bookmark;
		if (checkSize && self._undoStack.length > 0) {
			var prev = self._undoStack[self._undoStack.length - 1];
			if (Math.abs(html.length - _removeBookmarkTag(prev.html).length) < self.minChangeSize) {
				return self;
			}
		}
		if (edit.designMode && !self._firstAddBookmark) {
			var range = self.cmd.range;
			bookmark = range.createBookmark(true);
			bookmark.html = _removeTempTag(body.innerHTML);
			range.moveToBookmark(bookmark);
		} else {
			bookmark = {
				html : html
			};
		}
		self._firstAddBookmark = false;
		_addBookmarkToStack(self._undoStack, bookmark);
		return self;
	},
	undo : function() {
		return _undoToRedo.call(this, this._undoStack, this._redoStack);
	},
	redo : function() {
		return _undoToRedo.call(this, this._redoStack, this._undoStack);
	},
	fullscreen : function(bool) {
		this.fullscreenMode = (bool === undefined ? !this.fullscreenMode : bool);
		return this.remove().create();
	},
	readonly : function(isReadonly) {
		isReadonly = _undef(isReadonly, true);
		var self = this, edit = self.edit, doc = edit.doc;
		if (self.designMode) {
			self.toolbar.disableAll(isReadonly, []);
		} else {
			_each(self.noDisableItems, function() {
				self.toolbar[isReadonly ? 'disable' : 'enable'](this);
			});
		}
		if (_IE) {
			doc.body.contentEditable = !isReadonly;
		} else {
			doc.designMode = isReadonly ? 'off' : 'on';
		}
		edit.textarea[0].disabled = isReadonly;
	},
	createMenu : function(options) {
		var self = this,
			name = options.name,
			knode = self.toolbar.get(name),
			pos = knode.pos();
		options.x = pos.x;
		options.y = pos.y + knode.height();
		options.z = self.options.zIndex;
		options.shadowMode = _undef(options.shadowMode, self.shadowMode);
		if (options.selectedColor !== undefined) {
			options.cls = 'ke-colorpicker-' + self.themeType;
			options.noColor = self.lang('noColor');
			self.menu = _colorpicker(options);
		} else {
			options.cls = 'ke-menu-' + self.themeType;
			options.centerLineMode = false;
			self.menu = _menu(options);
		}
		return self.menu;
	},
	hideMenu : function() {
		this.menu.remove();
		this.menu = null;
		return this;
	},
	hideContextmenu : function() {
		this.contextmenu.remove();
		this.contextmenu = null;
		return this;
	},
	createDialog : function(options) {
		var self = this, name = options.name;
		options.z = self.options.zIndex;
		options.shadowMode = _undef(options.shadowMode, self.shadowMode);
		options.closeBtn = _undef(options.closeBtn, {
			name : self.lang('close'),
			click : function(e) {
				self.hideDialog();
				if (_IE && self.cmd) {
					self.cmd.select();
				}
			}
		});
		options.noBtn = _undef(options.noBtn, {
			name : self.lang(options.yesBtn ? 'no' : 'close'),
			click : function(e) {
				self.hideDialog();
				if (_IE && self.cmd) {
					self.cmd.select();
				}
			}
		});
		if (self.dialogAlignType != 'page') {
			options.alignEl = self.container;
		}
		options.cls = 'ke-dialog-' + self.themeType;
		if (self.dialogs.length > 0) {
			var firstDialog = self.dialogs[0],
				parentDialog = self.dialogs[self.dialogs.length - 1];
			firstDialog.setMaskIndex(parentDialog.z + 2);
			options.z = parentDialog.z + 3;
			options.showMask = false;
		}
		var dialog = _dialog(options);
		self.dialogs.push(dialog);
		return dialog;
	},
	hideDialog : function() {
		var self = this;
		if (self.dialogs.length > 0) {
			self.dialogs.pop().remove();
		}
		if (self.dialogs.length > 0) {
			var firstDialog = self.dialogs[0],
				parentDialog = self.dialogs[self.dialogs.length - 1];
			firstDialog.setMaskIndex(parentDialog.z - 1);
		}
		return self;
	},
	errorDialog : function(html) {
		var self = this;
		var dialog = self.createDialog({
			width : 750,
			title : self.lang('uploadError'),
			body : '<div style="padding:10px 20px;"><iframe frameborder="0" style="width:708px;height:400px;"></iframe></div>'
		});
		var iframe = K('iframe', dialog.div), doc = K.iframeDoc(iframe);
		doc.open();
		doc.write(html);
		doc.close();
		K(doc.body).css('background-color', '#FFF');
		iframe[0].contentWindow.focus();
		return self;
	}
};
function _editor(options) {
	return new KEditor(options);
}
_instances = [];
function _create(expr, options) {
	options = options || {};
	options.basePath = _undef(options.basePath, K.basePath);
	options.themesPath = _undef(options.themesPath, options.basePath + 'themes/');
	options.langPath = _undef(options.langPath, options.basePath + 'lang/');
	options.pluginsPath = _undef(options.pluginsPath, options.basePath + 'plugins/');
	if (_undef(options.loadStyleMode, K.options.loadStyleMode)) {
		var themeType = _undef(options.themeType, K.options.themeType);
		_loadStyle(options.themesPath + 'default/default.css');
		_loadStyle(options.themesPath + themeType + '/' + themeType + '.css');
	}
	function create(editor) {
		_each(_plugins, function(name, fn) {
			fn.call(editor, KindEditor);
		});
		return editor.create();
	}
	var knode = K(expr);
	if (!knode || knode.length === 0) {
		return;
	}
	if (knode.length > 1) {
		knode.each(function() {
			_create(this, options);
		});
		return _instances[0];
	}
	options.srcElement = knode[0];
	var editor = new KEditor(options);
	_instances.push(editor);
	if (_language[editor.langType]) {
		return create(editor);
	}
	_loadScript(editor.langPath + editor.langType + '.js?ver=' + encodeURIComponent(K.DEBUG ? _TIME : _VERSION), function() {
		create(editor);
	});
	return editor;
}
function _eachEditor(expr, fn) {
	K(expr).each(function(i, el) {
		K.each(_instances, function(j, editor) {
			if (editor && editor.srcElement[0] == el) {
				fn.call(editor, j, editor);
				return false;
			}
		});
	});
}
K.remove = function(expr) {
	_eachEditor(expr, function(i) {
		this.remove();
		_instances.splice(i, 1);
	});
};
K.sync = function(expr) {
	_eachEditor(expr, function() {
		this.sync();
	});
};
if (_IE && _V < 7) {
	_nativeCommand(document, 'BackgroundImageCache', true);
}
K.EditorClass = KEditor;
K.editor = _editor;
K.create = _create;
K.instances = _instances;
K.plugin = _plugin;
K.lang = _lang;
_plugin('core', function(K) {
	var self = this,
		shortcutKeys = {
			undo : 'Z', redo : 'Y', bold : 'B', italic : 'I', underline : 'U', print : 'P', selectall : 'A'
		};
	self.afterSetHtml(function() {
		if (self.options.afterChange) {
			self.options.afterChange.call(self);
		}
	});
	self.afterCreate(function() {
		if (self.syncType != 'form') {
			return;
		}
		var el = K(self.srcElement), hasForm = false;
		while ((el = el.parent())) {
			if (el.name == 'form') {
				hasForm = true;
				break;
			}
		}
		if (hasForm) {
			el.bind('submit', function(e) {
				self.sync();
				K(window).bind('unload', function() {
					self.edit.textarea.remove();
				});
			});
			var resetBtn = K('[type="reset"]', el);
			resetBtn.click(function() {
				self.html(self.initContent);
				self.cmd.selection();
			});
			self.beforeRemove(function() {
				el.unbind();
				resetBtn.unbind();
			});
		}
	});
	self.clickToolbar('source', function() {
		if (self.edit.designMode) {
			self.toolbar.disableAll(true);
			self.edit.design(false);
			self.toolbar.select('source');
		} else {
			self.toolbar.disableAll(false);
			self.edit.design(true);
			self.toolbar.unselect('source');
			self.cmd.selection();
		}
		self.designMode = self.edit.designMode;
	});
	self.afterCreate(function() {
		if (!self.designMode) {
			self.toolbar.disableAll(true).select('source');
		}
	});
	self.clickToolbar('fullscreen', function() {
		self.fullscreen();
	});
	if (self.fullscreenShortcut) {
		var loaded = false;
		self.afterCreate(function() {
			K(self.edit.doc, self.edit.textarea).keyup(function(e) {
				if (e.which == 27) {
					setTimeout(function() {
						self.fullscreen();
					}, 0);
				}
			});
			if (loaded) {
				if (_IE && !self.designMode) {
					return;
				}
				self.focus();
			}
			if (!loaded) {
				loaded = true;
			}
		});
	}
	_each('undo,redo'.split(','), function(i, name) {
		if (shortcutKeys[name]) {
			self.afterCreate(function() {
				_ctrl(this.edit.doc, shortcutKeys[name], function() {
					self.clickToolbar(name);
				});
			});
		}
		self.clickToolbar(name, function() {
			self[name]();
		});
	});
	self.clickToolbar('formatblock', function() {
		var blocks = self.lang('formatblock.formatBlock'),
			heights = {
				h1 : 28,
				h2 : 24,
				h3 : 18,
				H4 : 14,
				p : 12
			},
			curVal = self.cmd.val('formatblock'),
			menu = self.createMenu({
				name : 'formatblock',
				width : self.langType == 'en' ? 200 : 150
			});
		_each(blocks, function(key, val) {
			var style = 'font-size:' + heights[key] + 'px;';
			if (key.charAt(0) === 'h') {
				style += 'font-weight:bold;';
			}
			menu.addItem({
				title : '<span style="' + style + '" unselectable="on">' + val + '</span>',
				height : heights[key] + 12,
				checked : (curVal === key || curVal === val),
				click : function() {
					self.select().exec('formatblock', '<' + key + '>').hideMenu();
				}
			});
		});
	});
	self.clickToolbar('fontname', function() {
		var curVal = self.cmd.val('fontname'),
			menu = self.createMenu({
				name : 'fontname',
				width : 150
			});
		_each(self.lang('fontname.fontName'), function(key, val) {
			menu.addItem({
				title : '<span style="font-family: ' + key + ';" unselectable="on">' + val + '</span>',
				checked : (curVal === key.toLowerCase() || curVal === val.toLowerCase()),
				click : function() {
					self.exec('fontname', key).hideMenu();
				}
			});
		});
	});
	self.clickToolbar('fontsize', function() {
		var curVal = self.cmd.val('fontsize'),
			menu = self.createMenu({
				name : 'fontsize',
				width : 150
			});
		_each(self.fontSizeTable, function(i, val) {
			menu.addItem({
				title : '<span style="font-size:' + val + ';" unselectable="on">' + val + '</span>',
				height : _removeUnit(val) + 12,
				checked : curVal === val,
				click : function() {
					self.exec('fontsize', val).hideMenu();
				}
			});
		});
	});
	_each('forecolor,hilitecolor'.split(','), function(i, name) {
		self.clickToolbar(name, function() {
			self.createMenu({
				name : name,
				selectedColor : self.cmd.val(name) || 'default',
				colors : self.colorTable,
				click : function(color) {
					self.exec(name, color).hideMenu();
				}
			});
		});
	});
	_each(('cut,copy,paste').split(','), function(i, name) {
		self.clickToolbar(name, function() {
			self.focus();
			try {
				self.exec(name, null);
			} catch(e) {
				alert(self.lang(name + 'Error'));
			}
		});
	});
	self.clickToolbar('about', function() {
		var html = '<div style="margin:20px;">' +
			'<div>KindEditor ' + _VERSION + '</div>' +
			'<div>Copyright &copy; <a href="http://www.kindsoft.net/" target="_blank">kindsoft.net</a> All rights reserved.</div>' +
			'</div>';
		self.createDialog({
			name : 'about',
			width : 350,
			title : self.lang('about'),
			body : html
		});
	});
	self.plugin.getSelectedLink = function() {
		return self.cmd.commonAncestor('a');
	};
	self.plugin.getSelectedImage = function() {
		return _getImageFromRange(self.edit.cmd.range, function(img) {
			return !/^ke-\w+$/i.test(img[0].className);
		});
	};
	self.plugin.getSelectedFlash = function() {
		return _getImageFromRange(self.edit.cmd.range, function(img) {
			return img[0].className == 'ke-flash';
		});
	};
	self.plugin.getSelectedMedia = function() {
		return _getImageFromRange(self.edit.cmd.range, function(img) {
			return img[0].className == 'ke-media' || img[0].className == 'ke-rm';
		});
	};
	self.plugin.getSelectedAnchor = function() {
		return _getImageFromRange(self.edit.cmd.range, function(img) {
			return img[0].className == 'ke-anchor';
		});
	};
	_each('link,image,flash,media,anchor'.split(','), function(i, name) {
		var uName = name.charAt(0).toUpperCase() + name.substr(1);
		_each('edit,delete'.split(','), function(j, val) {
			self.addContextmenu({
				title : self.lang(val + uName),
				click : function() {
					self.loadPlugin(name, function() {
						self.plugin[name][val]();
						self.hideMenu();
					});
				},
				cond : self.plugin['getSelected' + uName],
				width : 150,
				iconClass : val == 'edit' ? 'ke-icon-' + name : undefined
			});
		});
		self.addContextmenu({ title : '-' });
	});
	self.plugin.getSelectedTable = function() {
		return self.cmd.commonAncestor('table');
	};
	self.plugin.getSelectedRow = function() {
		return self.cmd.commonAncestor('tr');
	};
	self.plugin.getSelectedCell = function() {
		return self.cmd.commonAncestor('td');
	};
	_each(('prop,cellprop,colinsertleft,colinsertright,rowinsertabove,rowinsertbelow,rowmerge,colmerge,' +
	'rowsplit,colsplit,coldelete,rowdelete,insert,delete').split(','), function(i, val) {
		var cond = _inArray(val, ['prop', 'delete']) < 0 ? self.plugin.getSelectedCell : self.plugin.getSelectedTable;
		self.addContextmenu({
			title : self.lang('table' + val),
			click : function() {
				self.loadPlugin('table', function() {
					self.plugin.table[val]();
					self.hideMenu();
				});
			},
			cond : cond,
			width : 170,
			iconClass : 'ke-icon-table' + val
		});
	});
	self.addContextmenu({ title : '-' });
	_each(('selectall,justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,' +
		'insertunorderedlist,indent,outdent,subscript,superscript,hr,print,' +
		'bold,italic,underline,strikethrough,removeformat,unlink').split(','), function(i, name) {
		if (shortcutKeys[name]) {
			self.afterCreate(function() {
				_ctrl(this.edit.doc, shortcutKeys[name], function() {
					self.cmd.selection();
					self.clickToolbar(name);
				});
			});
		}
		self.clickToolbar(name, function() {
			self.focus().exec(name, null);
		});
	});
	self.afterCreate(function() {
		var doc = self.edit.doc, cmd, bookmark, div,
			cls = '__kindeditor_paste__', pasting = false;
		function movePastedData() {
			cmd.range.moveToBookmark(bookmark);
			cmd.select();
			if (_WEBKIT) {
				K('div.' + cls, div).each(function() {
					K(this).after('<br />').remove(true);
				});
				K('span.Apple-style-span', div).remove(true);
				K('span.Apple-tab-span', div).remove(true);
				K('span[style]', div).each(function() {
					if (K(this).css('white-space') == 'nowrap') {
						K(this).remove(true);
					}
				});
				K('meta', div).remove();
			}
			var html = div[0].innerHTML;
			div.remove();
			if (html === '') {
				return;
			}
			if (_WEBKIT) {
				html = html.replace(/(<br>)\1/ig, '$1');
			}
			if (self.pasteType === 2) {
				html = html.replace(/(<(?:p|p\s[^>]*)>) *(<\/p>)/ig, '');
				if (/schemas-microsoft-com|worddocument|mso-\w+/i.test(html)) {
					html = _clearMsWord(html, self.filterMode ? self.htmlTags : K.options.htmlTags);
				} else {
					html = _formatHtml(html, self.filterMode ? self.htmlTags : null);
					html = self.beforeSetHtml(html);
				}
			}
			if (self.pasteType === 1) {
				html = html.replace(/&nbsp;/ig, ' ');
				html = html.replace(/\n\s*\n/g, '\n');
				html = html.replace(/<br[^>]*>/ig, '\n');
				html = html.replace(/<\/p><p[^>]*>/ig, '\n');
				html = html.replace(/<[^>]+>/g, '');
				html = html.replace(/ {2}/g, ' &nbsp;');
				if (self.newlineTag == 'p') {
					if (/\n/.test(html)) {
						html = html.replace(/^/, '<p>').replace(/$/, '<br /></p>').replace(/\n/g, '<br /></p><p>');
					}
				} else {
					html = html.replace(/\n/g, '<br />$&');
				}
			}
			self.insertHtml(html, true);
		}
		K(doc.body).bind('paste', function(e){
			if (self.pasteType === 0) {
				e.stop();
				return;
			}
			if (pasting) {
				return;
			}
			pasting = true;
			K('div.' + cls, doc).remove();
			cmd = self.cmd.selection();
			bookmark = cmd.range.createBookmark();
			div = K('<div class="' + cls + '"></div>', doc).css({
				position : 'absolute',
				width : '1px',
				height : '1px',
				overflow : 'hidden',
				left : '-1981px',
				top : K(bookmark.start).pos().y + 'px',
				'white-space' : 'nowrap'
			});
			K(doc.body).append(div);
			if (_IE) {
				var rng = cmd.range.get(true);
				rng.moveToElementText(div[0]);
				rng.select();
				rng.execCommand('paste');
				e.preventDefault();
			} else {
				cmd.range.selectNodeContents(div[0]);
				cmd.select();
			}
			setTimeout(function() {
				movePastedData();
				pasting = false;
			}, 0);
		});
	});
	self.beforeGetHtml(function(html) {
		if (_IE && _V <= 8) {
			html = html.replace(/<div\s+[^>]*data-ke-input-tag="([^"]*)"[^>]*>([\s\S]*?)<\/div>/ig, function(full, tag) {
				return unescape(tag);
			});
			html = html.replace(/(<input)((?:\s+[^>]*)?>)/ig, function($0, $1, $2) {
				if (!/\s+type="[^"]+"/i.test($0)) {
					return $1 + ' type="text"' + $2;
				}
				return $0;
			});
		}
		return html.replace(/(<(?:noscript|noscript\s[^>]*)>)([\s\S]*?)(<\/noscript>)/ig, function($0, $1, $2, $3) {
			return $1 + _unescape($2).replace(/\s+/g, ' ') + $3;
		})
		.replace(/<img[^>]*class="?ke-(flash|rm|media)"?[^>]*>/ig, function(full) {
			var imgAttrs = _getAttrList(full),
				styles = _getCssList(imgAttrs.style || ''),
				attrs = _mediaAttrs(imgAttrs['data-ke-tag']);
			attrs.width = _undef(imgAttrs.width, _removeUnit(_undef(styles.width, '')));
			attrs.height = _undef(imgAttrs.height, _removeUnit(_undef(styles.height, '')));
			return _mediaEmbed(attrs);
		})
		.replace(/<img[^>]*class="?ke-anchor"?[^>]*>/ig, function(full) {
			var imgAttrs = _getAttrList(full);
			return '<a name="' + unescape(imgAttrs['data-ke-name']) + '"></a>';
		})
		.replace(/<div\s+[^>]*data-ke-script-attr="([^"]*)"[^>]*>([\s\S]*?)<\/div>/ig, function(full, attr, code) {
			return '<script' + unescape(attr) + '>' + unescape(code) + '</script>';
		})
		.replace(/<div\s+[^>]*data-ke-noscript-attr="([^"]*)"[^>]*>([\s\S]*?)<\/div>/ig, function(full, attr, code) {
			return '<noscript' + unescape(attr) + '>' + unescape(code) + '</noscript>';
		})
		.replace(/(<[^>]*)data-ke-src="([^"]*)"([^>]*>)/ig, function(full, start, src, end) {
			full = full.replace(/(\s+(?:href|src)=")[^"]*(")/i, function($0, $1, $2) {
				return $1 + _unescape(src) + $2;
			});
			full = full.replace(/\s+data-ke-src="[^"]*"/i, '');
			return full;
		})
		.replace(/(<[^>]+\s)data-ke-(on\w+="[^"]*"[^>]*>)/ig, function(full, start, end) {
			return start + end;
		});
	});
	self.beforeSetHtml(function(html) {
		if (_IE && _V <= 8) {
			html = html.replace(/<input[^>]*>|<(select|button)[^>]*>[\s\S]*?<\/\1>/ig, function(full) {
				var attrs = _getAttrList(full);
				var styles = _getCssList(attrs.style || '');
				if (styles.display == 'none') {
					return '<div class="ke-display-none" data-ke-input-tag="' + escape(full) + '"></div>';
				}
				return full;
			});
		}
		return html.replace(/<embed[^>]*type="([^"]+)"[^>]*>(?:<\/embed>)?/ig, function(full) {
			var attrs = _getAttrList(full);
			attrs.src = _undef(attrs.src, '');
			attrs.width = _undef(attrs.width, 0);
			attrs.height = _undef(attrs.height, 0);
			return _mediaImg(self.themesPath + 'common/blank.gif', attrs);
		})
		.replace(/<a[^>]*name="([^"]+)"[^>]*>(?:<\/a>)?/ig, function(full) {
			var attrs = _getAttrList(full);
			if (attrs.href !== undefined) {
				return full;
			}
			return '<img class="ke-anchor" src="' + self.themesPath + 'common/anchor.gif" data-ke-name="' + escape(attrs.name) + '" />';
		})
		.replace(/<script([^>]*)>([\s\S]*?)<\/script>/ig, function(full, attr, code) {
			return '<div class="ke-script" data-ke-script-attr="' + escape(attr) + '">' + escape(code) + '</div>';
		})
		.replace(/<noscript([^>]*)>([\s\S]*?)<\/noscript>/ig, function(full, attr, code) {
			return '<div class="ke-noscript" data-ke-noscript-attr="' + escape(attr) + '">' + escape(code) + '</div>';
		})
		.replace(/(<[^>]*)(href|src)="([^"]*)"([^>]*>)/ig, function(full, start, key, src, end) {
			if (full.match(/\sdata-ke-src="[^"]*"/i)) {
				return full;
			}
			full = start + key + '="' + src + '"' + ' data-ke-src="' + _escape(src) + '"' + end;
			return full;
		})
		.replace(/(<[^>]+\s)(on\w+="[^"]*"[^>]*>)/ig, function(full, start, end) {
			return start + 'data-ke-' + end;
		})
		.replace(/<table[^>]*\s+border="0"[^>]*>/ig, function(full) {
			if (full.indexOf('ke-zeroborder') >= 0) {
				return full;
			}
			return _addClassToTag(full, 'ke-zeroborder');
		});
	});
});
})(window);


var editor;
(function ($) {
	$.fn.editor = function (options, params) {
		if (typeof options == "string") {
			return $.fn.editor.methods[options](this, params);
		}
		options = options || {};
		return this.each(function () {
			var data = $.data(this, "editor");
			var newOptions;
			if (data) {
				newOptions = $.extend(data.options, options);
				data.opts = newOptions;
			} else {
				newOptions = $.extend({}, $.fn.editor.defaults, $.fn.editor.parseOptions(this), options);
				$.data(this, "editor", {
					options : newOptions
				});
			}
			var _this=$(this);
			setTimeout(function(){
				KindEditor.create(_this,newOptions);
			},500);
			
		});
	};
	$.fn.editor.methods = {
		setValue : function (target, params) {
			KindEditor.instances[0].html(params);
		},
		getValue : function (target) {
			return KindEditor.instances[0].html();
		},
		clearValue : function (target) {
			if(KindEditor.instances[0].html()!="请填写内容"){
				KindEditor.instances[0].html('');
			}
		}
	};
	$.fn.editor.parseOptions = function (target) {
		return $.extend({}, $.parser.parseOptions(target, ["width", "height", "designMode", "resizeType"]));
	};
	$.fn.editor.defaults = {
		basePath: '/assets/js/libs/kindeditor/',
		allowPreviewEmoticons : false,
		filterMode:true,
		imageUploadJson:'kindeditor/php/upload_json.php',
		resizeType:1,
		allowFileManager:true,
		useContextmenu:false,
		htmlTags:{
		font : ['color', 'size', 'face', '.background-color'],
		span : ['style'],
		div : ['class', 'align', 'style'],
		table: ['class', 'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'style'],
		'td,th': ['class', 'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor', 'style'],
		a : ['class', 'href', 'target', 'name', 'style','onclick'],
		embed : ['src', 'width', 'height', 'type', 'loop', 'autostart', 'quality',
		'style', 'align', 'allowscriptaccess', '/'],
		img : ['src', 'width', 'height', 'border', 'alt', 'title', 'align', 'style', '/'],
		hr : ['class', '/'],
		br : ['/'],
		'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6' : ['align', 'style'],
		'tbody,tr,strong,b,sub,sup,em,i,u,strike' : []
		},
		items : [
		'source','fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
		'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
		'insertunorderedlist','table', '|','image','flash', 'link','fullscreen']
		};

	$.parser.plugins.push('editor');
})(jQuery);
(function($) {
	
  function init(target) {
			var opts = $.data(target, 'iptsearch').options;
			var _clickFn = opts.clickFn;
			var _width = opts.width;
			var _disabled=opts.disabled;
			if(opts.readonly || opts.disabled){
			$(target).attr('readonly', 'readonly');
			}
			$(target).width(_width);
			var _div = $('<div>').addClass("ipt-search-box").width(_width + 26);
			var _i = $('<i>');
			$(target).wrap(_div).after(_i);
			if(_disabled){
				$(target).addClass('disabled');
			}
			_i.bind('click', function() {
				if(typeof _clickFn=="function" && !opts.disabled){
					_clickFn();
					top.iptSearchInputObj=target;
					}
					return false;
			});
  }

 $.fn.iptSearch=$.fn.iptsearch = function(options, param) {

    if (typeof options === 'string') {
      return $.fn.iptsearch.methods[options](this, param);
    }
		
    options = options || {};
    return this.each(function() {
      var _this = this;
      var opt = $.data(_this, "iptsearch");
      if (opt) {
        $.extend(opt.options, options);
      } else {
        $.data(_this, "iptsearch", {
          options: $.extend({},
          $.fn.iptsearch.defaults, $.fn.iptsearch.parseOptions(_this), options)
        });
        init(_this);
      }
    });
  };


	$.fn.iptsearch.methods = {
		options: function(jq){
			return $.data(jq[0], 'iptsearch').options;
		},
		disable:function(jq){
			$(jq).addClass('disabled');
			var opts=jq.iptsearch('options');
			opts.disabled=true;
		},
		enable:function(jq){
			jq.removeClass('disabled');
			var opts=jq.iptsearch('options');
			opts.disabled=false;
		}
	};

  $.fn.iptsearch.parseOptions = function(target) {
    var t = $(target);
    return $.extend({},
    $.parser.parseOptions(target, ['width','disabled']));
  };

  $.fn.iptsearch.defaults = {
    width:134,
		disabled:false,
		readonly:true,
		clickFn:{}
  };
  if ($.parser) {
    $.parser.plugins.push('iptsearch');
  }

})(jQuery);
if(window.jQuery){
	if ($.fn.pagination){
		$.fn.pagination.defaults.beforePageText = '第';
		$.fn.pagination.defaults.afterPageText = '共{pages}页';
		$.fn.pagination.defaults.displayMsg = '显示{from}到{to},共{total}记录';
	}
	if ($.fn.datagrid){
		$.fn.datagrid.defaults.loadMsg = '正在处理，请稍待。。。';
	}
	if ($.fn.treegrid && $.fn.datagrid){
		$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
	}
	if ($.messager){
		$.messager.defaults.ok = '确定';
		$.messager.defaults.cancel = '取消';
	}
	if ($.fn.validatebox){
		$.fn.validatebox.defaults.missingMessage = '该输入项为必输项';
		$.fn.validatebox.defaults.rules.email.message = '请输入有效的电子邮件地址';
		$.fn.validatebox.defaults.rules.url.message = '请输入有效的URL地址';
		$.fn.validatebox.defaults.rules.length.message = '输入内容长度必须介于{0}和{1}之间';
		$.fn.validatebox.defaults.rules.remote.message = '请修正该字段';
	}
	if ($.fn.numberbox){
		$.fn.numberbox.defaults.missingMessage = '该输入项为必输项';
	}
	if ($.fn.combobox){
		$.fn.combobox.defaults.missingMessage = '该输入项为必输项';
	}
	if ($.fn.combotree){
		$.fn.combotree.defaults.missingMessage = '该输入项为必输项';
	}
	if ($.fn.combogrid){
		$.fn.combogrid.defaults.missingMessage = '该输入项为必输项';
	}
	/*if ($.fn.calendar){
		$.fn.calendar.defaults.weeks = ['日','一','二','三','四','五','六'];
		$.fn.calendar.defaults.months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
	}*/
	/*if ($.fn.datebox){
		$.fn.datebox.defaults.currentText = '今天';
		$.fn.datebox.defaults.closeText = '关闭';
		$.fn.datebox.defaults.okText = '确定';
		$.fn.datebox.defaults.missingMessage = '该输入项为必输项';
		$.fn.datebox.defaults.formatter = function(date){
			var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
		};
		$.fn.datebox.defaults.parser = function(s){
			if (!s) return new Date();
			var ss = s.split('-');
			var y = parseInt(ss[0],10);
			var m = parseInt(ss[1],10);
			var d = parseInt(ss[2],10);
			if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
				return new Date(y,m-1,d);
			} else {
				return new Date();
			}
		};
	}
	if ($.fn.datetimebox && $.fn.datebox){
		$.extend($.fn.datetimebox.defaults,{
			currentText: $.fn.datebox.defaults.currentText,
			closeText: $.fn.datebox.defaults.closeText,
			okText: $.fn.datebox.defaults.okText,
			missingMessage: $.fn.datebox.defaults.missingMessage
		});
	}*/

}

(function ($, undefined) {


    $.fn.panel.extensions = {};


    //  easyui-panel、easyui-window、easyui-dialog 卸载时回收内存，主要用于 layout、panel(及其继承组件) 使用 iframe 嵌入网页时的内存泄漏问题
    var onBeforeDestroy = function () {
        $("iframe,frame", this).each(function () {
            try {
                if (this.contentWindow && this.contentWindow.document && this.contentWindow.close) {
                    this.contentWindow.document.write("");
                    this.contentWindow.close();
                }
                if ($.isFunction(window.CollectGarbage)) { window.CollectGarbage(); }
            } catch (ex) { }
        }).remove();
    };
    $.fn.panel.defaults.onBeforeDestroy = onBeforeDestroy;
    $.fn.window.defaults.onBeforeDestroy = onBeforeDestroy;
    $.fn.dialog.defaults.onBeforeDestroy = onBeforeDestroy;
    $.fn.datagrid.defaults.onBeforeDestroy = onBeforeDestroy;
    $.fn.propertygrid.defaults.onBeforeDestroy = onBeforeDestroy;
    $.fn.treegrid.defaults.onBeforeDestroy = onBeforeDestroy;


    var _onResize = {
        panel: $.fn.panel.defaults.onResize,
        window: $.fn.window.defaults.onResize,
        dialog: $.fn.dialog.defaults.onResize
    };
    var onResize = function (width, height) {
        var p = $.util.parseJquery(this), isWin = p.panel("isWindow"), isDia = p.panel("isDialog"),
            plugin = isDia ? "dialog" : (isWin ? "window" : "panel"),
            _onResizeFn = _onResize[plugin];
        if ($.isFunction(_onResizeFn)) { _onResizeFn.apply(this, arguments); }
        if (!p.panel("inLayout")) {
            var opts = p.panel("options");
            opts.minWidth = $.isNumeric(opts.minWidth) ? opts.minWidth : defaults.minHeight;
            opts.maxWidth = $.isNumeric(opts.maxWidth) ? opts.maxWidth : defaults.maxWidth;
            opts.minHeight = $.isNumeric(opts.minHeight) ? opts.minHeight : defaults.minHeight;
            opts.maxHeight = $.isNumeric(opts.maxHeight) ? opts.maxHeight : defaults.maxHeight;
            var resizable = false;
            if (width > opts.maxWidth) { width = opts.maxWidth; resizable = true; }
            if (width < opts.minWidth) { width = opts.minWidth; resizable = true; }
            if (height > opts.maxHeight) { height = opts.maxHeight; resizable = true; }
            if (height < opts.minHeight) { height = opts.minHeight; resizable = true; }
            if (resizable && !opts.fit) {
                p[plugin]("resize", { width: width, height: height });
            }
        }
    };

    var _onMove = {
        panel: $.fn.panel.defaults.onMove,
        window: $.fn.window.defaults.onMove,
        dialog: $.fn.dialog.defaults.onMove
    };
    var onMove = function (left, top) {
        var p = $.util.parseJquery(this), isWin = p.panel("isWindow"), isDia = p.panel("isDialog"),
            plugin = isDia ? "dialog" : (isWin ? "window" : "panel"),
            _onMoveFn = _onMove[plugin], opts = p.panel("options");
        if ($.isFunction(_onMoveFn)) { _onMoveFn.apply(this, arguments); }
        if (opts.maximized) { return p[plugin]("restore"); }
        if (!opts.inContainer) { return; }
        var panel = p.panel("panel"), parent = panel.parent(), isRoot = parent.is("body"),
            scope = $.extend({}, isRoot ? $.util.windowSize() : { width: parent.innerWidth(), height: parent.innerHeight() }),
            width = $.isNumeric(opts.width) ? opts.width : panel.outerWidth(),
            height = $.isNumeric(opts.height) ? opts.height : panel.outerHeight(),
            moveable = false;
        if (left < 0) { left = 0; moveable = true; }
        if (top < 0) { top = 0; moveable = true; }
        if (moveable) { return p[plugin]("move", { left: left, top: top }); }
        if (left + width > scope.width && left > 0) { left = scope.width - width; moveable = true; }
        if (top + height > scope.height && top > 0) { top = scope.height - height; moveable = true; }
        if (moveable) { return p[plugin]("move", { left: left, top: top }); }
    };



    var inLayout = function (target) {
        var t = $.util.parseJquery(target), body = t.panel("body"), panel = t.panel("panel");
        return body.hasClass("layout-body") && panel.hasClass("layout-panel");
    };

    var inTabs = function (target) {
        var t = $.util.parseJquery(target), panel = t.panel("panel"), panels = panel.parent(), container = panels.parent();
        return panels.hasClass("tabs-panels") && container.hasClass("tabs-container");
    };

    var inAccordion = function (target) {
        var t = $.util.parseJquery(target), panel = t.panel("panel"), container = panel.parent();
        return (container.hasClass("accordion") && $.data(container[0], "accordion")) ? true : false;
    };

    var isWindow = function (target) {
        var t = $.util.parseJquery(target), body = t.panel("body");
        return body.hasClass("window-body") && body.parent().hasClass("window");
    };

    var isDialog = function (target) {
        var t = $.util.parseJquery(target), body = t.panel("body");
        return isWindow(target) && (body.children("div.panel").children("div.panel-body.dialog-content").length ? true : false);
    };





    function parseExtensionsBegin(options) {
        options._extensionsPanel = { href: options.href, content: options.content};
        if (!options.iniframe) { return; }
        options.href = null;
        options.content = null;
    };
    function parseExtensionsEnd(target) {
        var panel = $(target), opts = panel.panel("options"),
                exts = opts._extensionsPanel ? opts._extensionsPanel : opts._extensionsPanel = { href: opts.href, content: opts.content};
        opts.href = exts.href; opts.content = exts.content;
				if(opts.plain || opts.fieldset){
					panel.addClass('plain clearfix');
					var pp=$(panel.parent(0));
					pp.addClass('plain');
					$('div.panel-tool:first',pp).addClass('plain');
					$('div.panel-header:first',pp).addClass('plain');
					$('div.panel-title:first',pp).addClass('plain');
					$('div.panel-header:first',pp).append('<div class="panel-header-line"></div>');
				}
				if(opts.plain&&!opts.fieldset){
					opts.collapsible=true;
				}
				if(opts.fieldset){
					pp.addClass('fieldset clearfix');
					panel.addClass('fieldset clearfix');
				}

				if(opts.fieldset&&opts.collapsible==false){
					$('div.panel-title:first',pp).css({'padding-left':'5px'});
					$('div.panel-tool:first',pp).remove();
				}
				
				if(opts.fitWidth&& !opts.fit){
					panel.addClass('fit-width');
				}
				
        		if (opts.iniframe) { 
					 refresh(target, opts.href);
				 }
    };
		
		function init(target){
			var panel = $(target), opts = panel.panel("options"),
                exts = opts._extensionsPanel ? opts._extensionsPanel : opts._extensionsPanel = { plain: opts.plain, fieldset: opts.fieldset };
        opts.plain = exts.plain; opts.fieldset = exts.fieldset;
				
		}

    var _panel = $.fn.panel;
    $.fn.panel = function (options, param) {
        if (typeof options == "string") { return _panel.apply(this, arguments); }
        options = options || {};
        return this.each(function () {
            var jq = $.util.parseJquery(this), opts = $.extend({}, $.fn.panel.parseOptions(this), options);
			if(opts.plain){
				opts.collapsible=true;
			}
            parseExtensionsBegin(opts);
            _panel.call(jq, opts);
			
            parseExtensionsEnd(this);
        });
    };
    $.union($.fn.panel, _panel);


    var _refresh = $.fn.panel.methods.refresh;
    function refresh(target, href) {
        var p = $.util.parseJquery(target), opts = p.panel("options");
        href = href ? opts.href = href : opts.href;
        if (opts.iniframe) {
            var exts = opts._extensionsPanel ? opts._extensionsPanel : opts._extensionsPanel = { href: opts.href, content: opts.content };
            exts.href = opts.href; exts.content = opts.content;
            opts.href = null;
            opts.content = "<iframe class='panel-iframe' frameborder='0' width='100%' height='100%' marginwidth='0px' marginheight='0px' scrolling='auto'></iframe>";
            _refresh.call(p, p);
            opts.href = exts.href; opts.content = exts.content;
						getIframe(target).attr("src", href);
            //$.util.call(function () { getIframe(target).attr("src", href); });
        } else {
            _refresh.call(p, p, href);
        }
    };

    function getIframe(target) {
        var p = $.util.parseJquery(target), body = p.panel("body");
        var loadMsg = loadMsg || $.fn.datagrid.defaults.loadMsg;
				body.css('position', 'relative');
				var mask = $("<div class=\"datagrid-mask\" style=\"display:block;\"></div>").appendTo(body);
				var msg = $("<div class=\"datagrid-mask-msg\" style=\"display:none; left: 50%;\"></div>").html(loadMsg).appendTo(body);
				msg.css("marginLeft", -msg.outerWidth() / 2).show();
				var iframe=body.children("iframe.panel-iframe");
				iframe.bind('load', function(){
						p.panel('body').children("div.datagrid-mask-msg").remove();
  					p.panel('body').children("div.datagrid-mask").remove();
						iframe.css({'visibility':'visible'});
        });
				
        return iframe;
    };

    var _header = $.fn.panel.methods.header;
    function getHeader(target) {
        var t = $.util.parseJquery(target);
        if (!inTabs(target)) { return _header.call(t, t); }
        var panel = t.panel("panel"), index = panel.index(), tabs = panel.closest(".tabs-container");
        return tabs.find(">div.tabs-header>div.tabs-wrap>ul.tabs>li").eq(index);
    };

    var _setTitle = $.fn.panel.methods.setTitle;
    function setTitle(target, title) {
        var t = $.util.parseJquery(target);
        if (!inTabs(target)) { return _setTitle.call(t, t, title); }
        if (!title) { return; }
        var opts = t.panel("options"), header = t.panel("header");
        opts.title = title;
        header.find(">a.tabs-inner>span.tabs-title").text(title);
    };


    var methods = $.fn.panel.extensions.methods = {
        //  判断当前 easyui-panel 是否为 easyui-layout 的 panel 部件；
        //  返回值：如果当前 easyui-panel 是 easyui-layout 的 panel 部件，则返回 true，否则返回 false。
        inLayout: function (jq) { return inLayout(jq[0]); },

        //  判断当前 easyui-panel 是否为 easyui-tabs 的选项卡。
        inTabs: function (jq) { return inTabs(jq[0]); },

        //  判断当前 easyui-panel 是否为 easyui-accordion 中的一个折叠面板。
        inAccordion: function (jq) { return inAccordion(jq[0]); },

        //  判断当前 easyui-panel 是否为 easyui-window 组件；
        isWindow: function (jq) { return isWindow(jq[0]); },

        //  判断当前 easyui-panel 是否为 easyui-dialog 组件；
        isDialog: function (jq) { return isDialog(jq[0]); },

        //  增加 easyui-panel 控件的扩展方法；该方法用于获取当前在 iniframe: true 时当前 panel 控件中的 iframe 容器对象；
        //  备注：如果 inirame: false，则该方法返回一个空的 jQuery 对象。
        iframe: function (jq) { return getIframe(jq[0]); },

        //  重写 easyui-panel 控件的 refresh 方法，用于支持 iniframe 属性。
        refresh: function (jq, href) { return jq.each(function () { refresh(this, href); }); },

        //  重写 easyui-panel 控件的 header 方法，支持位于 easyui-tabs 中的 tab-panel 部件获取 header 对象；
        //  备注：如果该 panel 位于 easyui-tabs 中，则该方法返回 easyui-tabs 的 div.tabs-header div.tabs-wrap ul.tabs 中对应该 tab-panel 的 li 对象。
        header: function (jq) { return getHeader(jq[0]); },

        //  重写 easyui-panel 控件的 setTitle 方法，支持位于 easyui-tabs 中的 tab-panel 部件设置 title 操作；
        //  返回值：返回当前选项卡控件 easyui-panel 的 jQuery 链式对象。
        setTitle: function (jq, title) { return jq.each(function () { setTitle(this, title); }); }
    };
    var defaults = $.fn.panel.extensions.defaults = {
				//增加plain属性
				plain:false,
				
				//增加fieldset属性
				fieldset:false,
				
        //  增加 easyui-panel 控件的自定义属性，该属性表示 href 加载的远程页面是否装载在一个 iframe 中。
        iniframe: false,
				
				//panel自适应宽度
				fitWidth:false,

        //  增加 easyui-panel 控件的自定义属性，表示 easyui-panel 面板的最小宽度。
        minWidth: 0,

        //  增加 easyui-panel 控件的自定义属性，表示 easyui-panel 面板的最大宽度。
        maxWidth: 10000,

        //  增加 easyui-panel 控件的自定义属性，表示 easyui-panel 面板的最小高度。
        minHeight: 0,

        //  增加 easyui-panel 控件的自定义属性，表示 easyui-panel 面板的最大高度。
        maxHeight: 10000,

        //  增加 easyui-panel 控件的自定义属性，重新定义的 onResize 事件。用于扩展四个新增属性 minWidth、maxWidth、minHeight、maxHeight 的功能。
        onResize: onResize,

        //  扩展 easyui-panel、easyui-window 以及 easyui-dialog 控件的自定义属性，表示该窗口是否无法移除父级对象边界，默认为 true。
        inContainer: true,

        //  重写 easyui-panel、easyui-window 以及 easyui-dialog 控件的原生事件 onMove，以支持相应扩展功能。
        onMove: onMove
    };

    $.extend($.fn.panel.defaults, defaults);
    $.extend($.fn.panel.methods, methods);


    var css =
        "iframe.panel-iframe { margin: 0px; padding: 0px; width: 100%; height: 100%; border: 0px; overflow: auto; }"
    $.util.addCss(css);

})(jQuery);
(function($, undefined) {

/*		$.extend($.fn.layout.defaults, {show:true});
	 var _layout = $.fn.layout;
	 $.fn.layout = function (options, param) {
        if (typeof options == "string") { return _layout.apply(this, arguments); }
        return _layout.apply(this, arguments).each(function () {
            initialize(this);
        });
    };
    $.union($.fn.layout, _layout);*/

	$.extend($.fn.layout.methods, {
		/**  
			 * 面板是否存在和可见  
			 * @param {Object} jq  
			 * @param {Object} params  
			 */
		isVisible: function(jq, params) {
			var panels = $.data(jq[0], 'layout').panels;
			var pp = panels[params];
			if (!pp) {
				return false;
			}
			if (pp.length) {
				return pp.panel('panel').is(':visible');
			} else {
				return false;
			}
		},
		hidden: function(jq, params) {
			return jq.each(function() {
				var opts = $.data(this, 'layout').options;
				var panels = $.data(this, 'layout').panels;
				if (!opts.regionState) {
					opts.regionState = {};
				}
				var region = params;
				function hide(dom, region, doResize) {
					var first = region.substring(0, 1);
					var others = region.substring(1);
					var expand = 'expand' + first.toUpperCase() + others;
					if (panels[expand]) {
						if ($(dom).layout('isVisible', expand)) {
							opts.regionState[region] = 1;
							panels[expand].panel('close');
						} else if ($(dom).layout('isVisible', region)) {
							opts.regionState[region] = 0;
							panels[region].panel('close');
						}
					} else {
						panels[region].panel('close');
					}
					if (doResize) {
						$(dom).layout('resize');
					}
				};
				if (region.toLowerCase() == 'all') {
					hide(this, 'east', false);
					hide(this, 'north', false);
					hide(this, 'west', false);
					hide(this, 'south', true);
				} else {
					hide(this, region, true);
				}
			});
		},
		/**  
     * 显示某个region，center除外。  
     * @param {Object} jq  
     * @param {Object} params  
     */
		show: function(jq, params) {
			return jq.each(function() {
				var opts = $.data(this, 'layout').options;
				var panels = $.data(this, 'layout').panels;
				var region = params;

				function show(dom, region, doResize) {
					var first = region.substring(0, 1);
					var others = region.substring(1);
					var expand = 'expand' + first.toUpperCase() + others;
					if (panels[expand]) {
						if (!$(dom).layout('isVisible', expand)) {
							if (!$(dom).layout('isVisible', region)) {
								if (opts.regionState[region] == 1) {
									panels[expand].panel('open');
								} else {
									panels[region].panel('open');
								}
							}
						}
					} else {
						panels[region].panel('open');
					}
					if (doResize) {
						$(dom).layout('resize');
					}
				};
				if (region.toLowerCase() == 'all') {
					show(this, 'east', false);
					show(this, 'north', false);
					show(this, 'west', false);
					show(this, 'south', true);
				} else {
					show(this, region, true);
				}
			});
		}
	});

})(jQuery);
(function($){
    function addCss(id, content){
        if($('#' + id).length > 0) return;
        return $('<style>' + content + '</style>').attr('id', id).attr('type', 'text/css').appendTo('head');
    }

    $.extend({
        mask: function(opts){
            opts = opts || {};
            var options = $.extend({}, {target: 'body', loadMsg: $.fn.datagrid.defaults.loadMsg}, opts);
            this.unmask(options);

            if(options.target != 'body' && $(options.target).css('position') == 'static'){
                $(options.target).addClass('mask-relative');
            }

            var mask = $("<div class=\"datagrid-mask\" style=\"display:block;\"></div>").appendTo(options.target);
            var msg = $("<div class=\"datagrid-mask-msg\" style=\"display:none; left: 50%;\"></div>").html(options.loadMsg).appendTo(options.target);
            setTimeout(function(){
                msg.css("marginLeft", -msg.outerWidth() / 2).show();
            }, 5);

            var css = '.mask-relative {position: relative !important;}';
            addCss('mask_css', css);
        },
        unmask: function(options){
            var target = options.target || 'body';
            $(">div.datagrid-mask-msg", target).remove();
            $(">div.datagrid-mask", target).remove();
            $(options.target).removeClass('mask-relative');
        }
    });
})(jQuery);
(function ($, undefined) {


    $.fn.tabs.extensions = {};
		
		
    function initTabsPanelPaddingTopLine(target) {
        var tabs = $.util.parseJquery(target), opts = tabs.tabs("options"), position = opts.tabPosition;
        if ($.isNumeric(opts.lineHeight) && opts.lineHeight > 0) {
            if (!$.array.contains(["top", "bottom", "left", "right"], position)) { position = "top"; }
            tabs.children("div.tabs-panels").css("padding-" + position, opts.lineHeight.toString() + "px").children().children().css("border-" + position + "-width", "1px");
        }
    };

    var _onContextMenu = $.fn.tabs.defaults.onContextMenu;
    var onContextMenu = function (e, title, index) {
        if ($.isFunction(_onContextMenu)) { _onContextMenu.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.tabs("options");
        if (opts.enableConextMenu) {
            e.preventDefault();
            var panel = t.tabs("getTab", index),
                panelOpts = panel.panel("options"),
                leftTabs = t.tabs("leftClosableTabs", index),
                rightTabs = t.tabs("rightClosableTabs", index),
                otherTabs = t.tabs("otherClosableTabs", index),
                allTabs = t.tabs("closableTabs"),
                selected = t.tabs("isSelected", index),
                m1 = { text: "显示选项卡的 option", iconCls: "icon-standard-application-form", disabled: !opts.showOption, handler: function () { t.tabs("showOption", index); } },
                m2 = { text: "关闭选项卡", iconCls: "icon-standard-application-form-delete", disabled: !panelOpts.closable, handler: function () { t.tabs("closeClosable", index); } },
                m3 = { text: "关闭其他选项卡", iconCls: "icon-standard-cancel", disabled: !otherTabs.length, handler: function () { t.tabs("closeOtherClosable", index); } },
                m4 = { text: "刷新选项卡", iconCls: "icon-standard-table-refresh", disabled: !panelOpts.refreshable, handler: function () { t.tabs("refresh", index); } },
                m5 = { text: "关闭左侧选项卡", iconCls: "icon-standard-tab-close-left", disabled: !leftTabs.length, handler: function () { t.tabs("closeLeftClosable", index); } },
                m6 = { text: "关闭右侧选项卡", iconCls: "icon-standard-tab-close-right", disabled: !rightTabs.length, handler: function () { t.tabs("closeRightClosable", index); } },
                m7 = { text: "关闭所有选项卡", iconCls: "icon-standard-cross", disabled: !allTabs.length, handler: function () { t.tabs("closeAllClosable"); } },
                m8 = { text: "新建选项卡", iconCls: "icon-standard-tab-add", disabled: !opts.enableNewTabMenu, handler: function () { t.tabs("newTab", index); } },
                m9 = { text: "重复选项卡", iconCls: "icon-standard-control-repeat", disabled: !panelOpts.repeatable, handler: function () { t.tabs("repeat", index); } };
            var items = [];
            if ($.array.likeArray(opts.contextMenu) && !$.util.isString(opts.contextMenu)) { $.array.merge(items, opts.contextMenu); }
            if (opts.showOption) { $.array.merge(items, "-", m1); }
            $.array.merge(items, panelOpts.closable ? ["-", m2, m3] : ["-", m3]);
            if (panelOpts.refreshable) { $.array.merge(items, "-", m4); }
            $.array.merge(items, "-", m5, m6, m7);
            if (panelOpts.repeatable || opts.enableNewTabMenu) {
                var mm = [];
                if (opts.enableNewTabMenu) { mm.push(m8); }
                if (panelOpts.repeatable) { mm.push(m9); }
                $.array.merge(items, "-", mm);
            }
            items = parseContextMenuMap(e, title, index, items, t);
            if (items[0] == "-") { $.array.removeAt(items, 0); }
            $.easyui.showMenu({ left: e.pageX, top: e.pageY, items: items });
        }
    };
    function parseContextMenuMap(e, title, index, menus, tabs) {
        return $.array.map(menus, function (value) {
            if (!value || $.util.isString(value)) { return value; }
            var ret = $.extend({}, value);
            ret.id = $.isFunction(value.id) ? value.id.call(ret, e, title, index, tabs) : value.id;
            ret.text = $.isFunction(value.text) ? value.text.call(ret, e, title, index, tabs) : value.text;
            ret.iconCls = $.isFunction(value.iconCls) ? value.iconCls.call(ret, e, title, index, tabs) : value.iconCls;
            ret.disabled = $.isFunction(value.disabled) ? value.disabled.call(ret, e, title, index, tabs) : value.disabled;
            ret.hideOnClick = $.isFunction(value.hideOnClick) ? value.hideOnClick.call(ret, e, title, index, tabs) : value.hideOnClick;
            ret.onclick = $.isFunction(value.onclick) ? function (e, item, menu) { value.onclick.call(this, e, title, index, tabs, item, menu); } : value.onclick;
            ret.handler = $.isFunction(value.handler) ? function (e, item, menu) { value.handler.call(this, e, title, index, tabs, item, menu); } : value.handler;
            if (ret.children && ret.children.length) { ret.children = parseContextMenuMap(e, title, index, ret.children, tabs); }
            return ret;
        });
    };


    var _updateTab = $.fn.tabs.methods.update;
    function updateTab(target, param) {
			
        param = $.extend({ tab: null, options: null }, param);
        var tabs = $.util.parseJquery(target), opts = tabs.tabs("options"),
            index = tabs.tabs("getTabIndex", param.tab),
            panelOpts = $.union({}, param.options, $.fn.tabs.extensions.panelOptions),
            tools = panelOpts.tools,
            onLoad = panelOpts.onLoad,
            refreshButton = {
                iconCls: "icon-mini-refresh", handler: function () {
                    var title = $(this).parent().prev().find("span.tabs-title").text();
                    if (title) { $.util.call(function () {tabs.tabs("refresh", title); }); }
                }
            };
        if (panelOpts.refreshable &&panelOpts.refreshButton) {
            if ($.array.likeArray(panelOpts.tools)) {
                panelOpts.tools = $.array.merge([], panelOpts.tools, refreshButton);
            } else {
                panelOpts.tools = [refreshButton];
            }
        }
				

				
        if ((!$.string.isNullOrWhiteSpace(panelOpts.href) || !$.string.isNullOrWhiteSpace(panelOpts.content)) && (panelOpts.selected || tabs.tabs("getSelected") == param.tab) && !panelOpts.iniframe) {
            $.easyui.messager.progress({ title: "操作提醒", msg: "正在加载...", interval: 100 });
            panelOpts.onLoad = function () {
                if ($.isFunction(onLoad)) { onLoad.apply(this, arguments); }
                $.util.call(function () {
                    $.easyui.messager.progress("close");
                });
                $.util.parseJquery(this).panel("options").onLoad = onLoad;
            };
        }
        var ret = _updateTab.call(tabs, tabs, { tab: param.tab, options: panelOpts });
        panelOpts = tabs.tabs("getTab", index).panel("options");
        panelOpts.tools = tools;
        initTabsPanelPaddingTopLine(target);
        var li = tabs.find(">div.tabs-header>div.tabs-wrap>ul.tabs>li").eq(index).off("dblclick.closeOnDblClick").on("dblclick.closeOnDblClick", function () {
            if (panelOpts.closeOnDblClick && panelOpts.closable) { tabs.tabs("close", panelOpts.title); }
        });
        if (panelOpts.closeOnDblClick && panelOpts.closable) { li.attr("title", "双击此选项卡标题可以将其关闭"); }
        return ret;
    };
		
		

    function refreshTab(target, which) {
        var tabs = $.util.parseJquery(target), opts = tabs.tabs("options"),
            panel = tabs.tabs("getTab", which), panelOpts = panel.panel("options"),
            index = tabs.tabs("getTabIndex", panel);
        if ($.string.isNullOrWhiteSpace(panelOpts.href) && $.string.isNullOrWhiteSpace(panelOpts.content)) { 
					var iframe=panel.find('iframe');
					var url=iframe.attr('src');
					iframe.attr('src',url);
					return;
			  }
        tabs.tabs("update", { tab: panel, options: panelOpts });
        if ($.isFunction(opts.onRefresh)) { opts.onRefresh.call(target, opts.title, index); }
    };

    function isSelected(target, which) {
        var tabs = $.util.parseJquery(target), selected = tabs.tabs("getSelected"), index = tabs.tabs("getTabIndex", selected);
        var thisTab = tabs.tabs("getTab", which), thisIndex = tabs.tabs("getTabIndex", thisTab);
        return thisIndex == index;
    };

    function isClosable(target, which) {
        var tabs = $.util.parseJquery(target), panel = tabs.tabs("getTab", which), panelOpts = panel.panel("options");
        return panelOpts.closable;
    };

    function newTab(target, which) {
        var content = $("<table></table>").css({ width: "95%", height: "100%" }),
            txtTitle = $("<input type='text' style='width: 98%;'/>"),
            txtHref = $("<input type='text' style='width: 98%;'/>"),
            ckRefreshable = $("<input id='refreshable' type='checkbox' checked='true' />"),
            ckIniframe = $("<input id='iniframe' type='checkbox' />"),
            lblRefreshable = $("<label>是否可刷新</label>"),
            lblIniframe = $("<label>是否嵌至 IFRAME(浏览器内部窗体) 中</label>");

        var tr1 = $("<tr></tr>").append("<td width='24%' align='right'>选项卡标题：</td>").appendTo(content);
        var tr2 = $("<tr></tr>").append("<td width='24%' align='right'>路径(href)：</td>").appendTo(content);
        var tr3 = $("<tr></tr>").appendTo(content);
        $("<td></td>").append(txtTitle).appendTo(tr1);
        $("<td></td>").append(txtHref).appendTo(tr2);
        $("<td width='24%' align='right'></td>").append(ckRefreshable).append(lblRefreshable).appendTo(tr3);
        $("<td align='right'></td>").append(ckIniframe).append(lblIniframe).appendTo(tr3);

        which = which || 0;
        var tabs = $.util.parseJquery(target),
            index = $.isNumeric(which) ? which : tabs.tabs("getTabIndex", tabs.tabs("getTab", which)),
            header = tabs.find(">div.tabs-header>div.tabs-wrap>ul.tabs>li:eq(" + index + ")"),
            offset = header.offset(), position = $.extend({}, { left: offset.left + 10, top: offset.top + 10 });
        var dialogOptions = $.extend({
            iconCls: "icon-standard-application-form",
            title: "新建选项卡 - 设置参数",
            width: 400,
            height: 165,
            maximizable: false,
            resizable: false,
            autoVCenter: false,
            autoHCenter: false,
            enableSaveButton: false,
            topMost: false,
            applyButtonText: "打开",
            onApply: function (dia) {
                var title = txtTitle.val(), href = txtHref.val();
                href = href || $.fn.tabs.extensions.panelOptions.href;
                if ($.string.isNullOrWhiteSpace(title)) { title = "新建选项卡"; }
                var i = 0; while (tabs.tabs("getTab", title = title + (i ? i : ""))) { i++; }
                if ($.string.isNullOrWhiteSpace(href)) { $.easyui.messager.show("操作提醒", "请输入要创建的选项卡的路径！", "info"); txtHref.focus(); return; }
                var iniframe = ckIniframe.prop("checked"), refreshable = ckRefreshable.prop("checked");
                tabs.tabs("add", { title: title, href: href, refreshable: refreshable, closable: true, iniframe: iniframe });
                dia.dialog("close");
            },
            content: content
        }, position);
        var dia = $.easyui.showDialog(dialogOptions);
        $.util.call(function () {
            var enter = dia.find(">div.dialog-button>a:first");
            txtTitle.keydown(function (e) { if (e.which == 13) { txtHref.focus(); } });
            txtHref.keydown(function (e) { if (e.which == 13) { ckRefreshable.focus(); } });
            ckRefreshable.keydown(function (e) { if (e.which == 13) { ckIniframe.focus(); } });
            ckIniframe.keydown(function (e) { if (e.which == 13) { enter.focus(); } });
            lblRefreshable.click(function () { ckRefreshable.click(); });
            lblIniframe.click(function () { ckIniframe.click(); });
            enter.focus();
            txtTitle.focus();
        });
    };

    function repeatTab(target, which) {
        var tabs = $.util.parseJquery(target), panel = tabs.tabs("getTab", which), panelOpts = panel.panel("options");
        var opts = $.extend({}, panelOpts, { selected: true, closable: true }), i = 2, title = opts.title;
        while (tabs.tabs("getTab", opts.title = title + "-" + i.toString())) { i++; }
        tabs.tabs("add", opts);
    };

    function getTabOption(target, which) {
        var t = $.util.parseJquery(target), tab = tabs.tabs("getTab", which), tabOpts = tab.panel("options");
        return tabOpts;
    };

    function getSelectedOption(target) {
        var t = $.util.parseJquery(target), tab = t.tabs("getSelected"), tabOpts = tab.panel("options");
        return tabOpts;
    };

    function getSelectedIndex(target) {
        var t = $.util.parseJquery(target), tab = t.tabs("getSelected"), index = t.tabs("getTabIndex", tab);
        return index;
    };

    function getSelectedTitle(target) {
        var t = $.util.parseJquery(target), tabOpts = t.tabs("getSelectedOption"), title = tabOpts.title;
        return title;
    };

    function leftTabs(target, which) {
        var tabs = $.util.parseJquery(target), index = $.isNumeric(which) ? which : tabs.tabs("getTabIndex", tabs.tabs("getTab", which)),
            panels = tabs.tabs("tabs");
        return $.array.range(panels, 0, index);
    };

    function rightTabs(target, which) {
        var tabs = $.util.parseJquery(target), index = $.isNumeric(which) ? which : tabs.tabs("getTabIndex", tabs.tabs("getTab", which)),
            panels = tabs.tabs("tabs");
        return $.array.range(panels, index + 1);
    };

    function otherTabs(target, which) {
        var tabs = $.util.parseJquery(target), index = $.isNumeric(which) ? which : tabs.tabs("getTabIndex", tabs.tabs("getTab", which)),
            panels = tabs.tabs("tabs");
        return $.array.merge($.array.range(panels, 0, index), $.array.range(panels, index + 1));
    };

    var closableFinder = function (val) {
        if ($.util.isJqueryObject(val) && val.length) {
            var state = $.data(val[0], "panel");
            return state && state.options && state.options.closable;
        } else { return false; }
    };

    function closableTabs(target) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("tabs");
        return $.array.filter(panels, closableFinder);
    };

    function leftClosableTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("leftTabs", which);
        return $.array.filter(panels, closableFinder);
    };

    function rightClosableTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("rightTabs", which);
        return $.array.filter(panels, closableFinder);
    };

    function otherClosableTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("otherTabs", which);
        return $.array.filter(panels, closableFinder);
    };

    function closeLeftTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("leftTabs", which);
        $.each(panels, function () { tabs.tabs("close", tabs.tabs("getTabIndex", this)); });
    };

    function closeRightTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("rightTabs", which);
        $.each(panels, function () { tabs.tabs("close", tabs.tabs("getTabIndex", this)); });
    };

    function closeOtherTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("otherTabs", which);
        $.each(panels, function () { tabs.tabs("close", tabs.tabs("getTabIndex", this)); });
    };

    function closeAllTabs(target) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("tabs");
        $.each($.array.clone(panels), function () { tabs.tabs("close", tabs.tabs("getTabIndex", this)); });
    };

    function closeClosableTab(target, which) {
        var tabs = $.util.parseJquery(target), panel = tabs.tabs("getTab", which);
        if (panel && panel.panel("options").closable) {
            var index = $.isNumeric(which) ? which : tabs.tabs("getTabIndex", panel);
            tabs.tabs("close", index);
        }
    };

    function closeLeftClosableTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("leftClosableTabs", which);
        $.each($.array.clone(panels), function () { tabs.tabs("close", tabs.tabs("getTabIndex", this)); });
    };

    function closeRightClosableTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("rightClosableTabs", which);
        $.each($.array.clone(panels), function () { tabs.tabs("close", tabs.tabs("getTabIndex", this)); });
    };

    function closeOtherClosableTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("otherClosableTabs", which);
        $.each($.array.clone(panels), function () { tabs.tabs("close", tabs.tabs("getTabIndex", this)); });
    };

    function closeAllClosableTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("closableTabs", which);
        $.each($.array.clone(panels), function () { tabs.tabs("close", tabs.tabs("getTabIndex", this)); });
    };

    function showOption(target, which) {
        which = which || 0;
        var tabs = $.util.parseJquery(target), panel = tabs.tabs("getTab", which), panelOpts = panel.panel("options");
        var index = $.isNumeric(which) ? which : tabs.tabs("getTabIndex", panel),
            header = tabs.find(">div.tabs-header>div.tabs-wrap>ul.tabs>li:eq(" + index + ")"),
            offset = header.offset(), position = $.extend({}, { left: offset.left + 10, top: offset.top + 10 });
        $.easyui.showOption(panelOpts, {
            iconCls: "icon-standard-application-form", title: "显示选项卡 " + panelOpts.title + " 的 option 值",
            left: position.left, top: position.top, topMost: false
        });
    };

    function moveTab(tabTarget, param) {
        if (!param || param.source == undefined || param.target == undefined || !param.point) { return; }
        var source = param.source, target = param.target,
            point = $.array.contains(["before", "after"], param.point) ? param.point : "before",
            t = $.util.parseJquery(tabTarget), tabs = t.tabs("tabs"),
            sourcePanel = t.tabs("getTab", source), targetPanel = t.tabs("getTab", target),
            sourceIndex = t.tabs("getTabIndex", sourcePanel),
            sourceHeader = sourcePanel.panel("header"), targetHeader = targetPanel.panel("header");
        if (!sourcePanel || !targetPanel) { return; }

        $.array.removeAt(tabs, sourceIndex);
        var targetIndex = $.array.indexOf(tabs, targetPanel);
        $.array.insert(tabs, point == "before" ? targetIndex : targetIndex + 1, sourcePanel);

        sourcePanel = sourcePanel.panel("panel"); targetPanel = targetPanel.panel("panel");
        targetPanel[point](sourcePanel); targetHeader[point](sourceHeader);
    };

    function insertTab(tabTarget, options) {
        var target = options.target, t = $.util.parseJquery(tabTarget);
        options.target = undefined;
        t.tabs("add", options);
        var tabs = t.tabs("tabs");
        t.tabs("move", { source: tabs.length - 1, target: target, point: "before" });
    };

    function setTitle(target, param) {
        if (!param || !(param.which || $.isNumeric(param.which)) || !param.title) { return; }
        var t = $.util.parseJquery(target), tab = t.tabs("getTab", param.which);
        tab.panel("setTitle", param.title);
    };

    var panelOptions = $.fn.tabs.extensions.panelOptions = {

        //  该选项卡的 href 是否在 iframe 中打开。
        iniframe: false,

        //  该选项卡是否具有重复打开功能
        repeatable: false,
				
				//显示刷新按钮
				refreshButton:false,
				
				//懒加载，主要用于iframe
				lazyload:false,

        //  该选项卡是否具有刷新功能。
        refreshable: true,

        //  双击选项卡标题是否能将其关闭，当该选项卡 closable: true 时，该属性有效。
        closeOnDblClick: true,

        href: null
    };
    var methods = $.fn.tabs.extensions.methods = {
        //  覆盖 easyui-tabs 的原生方法 update，以支持扩展的功能；
        update: function (jq, param) { return jq.each(function () { updateTab(this, param);}); },

        //  刷新指定的选项卡；该方法定义如下参数：
        //      which:  表示被刷新的选项卡的 索引号 或者 标题。
        //  返回值：返回当前选项卡控件 easyui-tabs 的 jQuery 对象。
        refresh: function (jq, which) { return jq.each(function () { refreshTab(this, which); }); },

        //  判断指定的选项卡是否被选中；该方法定义如下参数：
        //      which:  要判断的选项卡的 索引号 或者 标题。
        //  返回值：如果指定的选项卡被选中，则返回 true，否则返回 false。
        isSelected: function (jq, which) { return isSelected(jq[0], which); },

        //  判断指定的选项卡是否可关闭(closable:true)；该方法定义如下参数：
        //      which:  要判断的选项卡的 索引号 或者 标题。
        //  返回值：如果指定的选项卡可被关闭(closable:true)，则返回 true，否则返回 false。
        isClosable: function (jq, which) { return isClosable(jq[0], which); },

        //  弹出一个 easyui-dialog，可以在该 dialog 中输入参数以在当前选项卡组件中创建一个新的选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题，可选，默认为 0；该参数用于指示弹出的 easyui-dialog 出现的位置。
        //  返回值：返回当前选项卡控件 easyui-tabs 的 jQuery 对象。
        newTab: function (jq, which) { return jq.each(function () { newTab(this, which); }); },

        //  创建一个和指定选项卡相同内容的新选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回当前选项卡控件 easyui-tabs 的 jQuery 对象。
        repeat: function (jq, which) { return jq.each(function () { repeatTab(this, which); }); },

        //  获取指定选项卡的属性值集合(option)；
        getTabOption: function (jq, which) { return getTabOption(jq[0], which); },

        //  获取当前选中的选项卡的属性值集合 (option)；
        getSelectedOption: function (jq) { return getSelectedOption(jq[0]); },

        //  获取当前选中的选项卡的索引号；
        getSelectedIndex: function (jq) { return getSelectedIndex(jq[0]); },

        //  获取当前选中的选项卡的标题。
        getSelectedTitle: function (jq) { return getSelectedTitle(jq[0]); },

        //  获取指定选项卡的左侧所有选项卡元素；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回一个数组，数组中的每一项都是一个表示选项卡页的 panel(jQuery) 对象；
        //      如果指定选项卡左侧没有其他选项卡，则返回一个空数组。
        leftTabs: function (jq, which) { return leftTabs(jq[0], which); },

        //  获取指定选项卡的右侧所有选项卡元素；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回一个数组，数组中的每一项都是一个表示选项卡页的 panel(jQuery) 对象；
        //      如果指定选项卡右侧没有其他选项卡，则返回一个空数组。
        rightTabs: function (jq, which) { return rightTabs(jq[0], which); },

        //  获取当前选项卡控件中除指定选项卡页在的其他所有选项卡元素；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回一个数组，数组中的每一项都是一个表示选项卡页的 panel(jQuery) 对象；
        //      如果当前选项卡控件除指定的选项卡页外没有其他选项卡，则返回一个空数组。
        otherTabs: function (jq, which) { return otherTabs(jq[0], which); },

        //  获取所有可关闭的选项卡页元素集合；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回一个数组，数组中的每一项都是一个表示选项卡页的 panel(jQuery) 对象；
        //      如果没有可关闭的选项卡，则返回一个空数组。
        closableTabs: function (jq) { return closableTabs(jq[0]); },

        //  获取指定选项卡左侧的所有可关闭的选项卡元素；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回一个数组，数组中的每一项都是一个表示选项卡页的 panel(jQuery) 对象；
        //      如果指定选项卡左侧没有可关闭的选项卡，则返回一个空数组。
        leftClosableTabs: function (jq, which) { return leftClosableTabs(jq[0], which); },

        //  获取指定选项卡右侧的所有可关闭的选项卡元素；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回一个数组，数组中的每一项都是一个表示选项卡页的 panel(jQuery) 对象；
        //      如果指定选项卡右侧没有可关闭的选项卡，则返回一个空数组。
        rightClosableTabs: function (jq, which) { return rightClosableTabs(jq[0], which); },

        //  获取当前选项卡控件中除指定选项卡页在的其他所有可关闭的选项卡元素；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回一个数组，数组中的每一项都是一个表示选项卡页的 panel(jQuery) 对象；
        //      如果当前选项卡控件除指定的选项卡页外没有其他可关闭的选项卡，则返回一个空数组。
        otherClosableTabs: function (jq, which) { return otherClosableTabs(jq[0], which); },

        //  关闭指定选项卡左侧的所有选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回当前选项卡控件 easyui-tabs 的 jQuery 对象。
        closeLeft: function (jq, which) { return jq.each(function () { closeLeftTabs(this, which); }); },

        //  关闭指定选项卡右侧的所有选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回当前选项卡控件 easyui-tabs 的 jQuery 对象。
        closeRight: function (jq, which) { return jq.each(function () { closeRightTabs(this, which); }); },

        //  关闭除指定选项卡外的其他所有选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回当前选项卡控件 easyui-tabs 的 jQuery 对象。
        closeOther: function (jq, which) { return jq.each(function () { closeOtherTabs(this, which); }); },

        //  关闭所有选项卡；
        //  返回值：返回当前选项卡控件 easyui-tabs 的 jQuery 对象。
        closeAll: function (jq) { return jq.each(function () { closeAllTabs(this); }); },

        //  指定指定的选项卡，但是如果该选项卡不可被关闭(closable:false)，则不执行任何动作；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回当前选项卡控件 easyui-tabs 的 jQuery 对象。
        closeClosable: function (jq, which) { return jq.each(function () { closeClosableTab(this, which); }); },

        //  指定指定的选项卡左侧的所有可关闭的选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回当前选项卡控件 easyui-tabs 的 jQuery 对象。
        closeLeftClosable: function (jq, which) { return jq.each(function () { closeLeftClosableTabs(this, which); }); },

        //  指定指定的选项卡右侧的所有可关闭的选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回当前选项卡控件 easyui-tabs 的 jQuery 对象。
        closeRightClosable: function (jq, which) { return jq.each(function () { closeRightClosableTabs(this, which); }); },

        //  指定除指定选项卡外的所有可关闭的选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回当前选项卡控件 easyui-tabs 的 jQuery 对象。
        closeOtherClosable: function (jq, which) { return jq.each(function () { closeOtherClosableTabs(this, which); }); },

        //  指定所有可关闭的选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回当前选项卡控件 easyui-tabs 的 jQuery 对象。
        closeAllClosable: function (jq) { return jq.each(function () { closeAllClosableTabs(this); }); },

        //  以 easyui-dialog 的方式弹出一个 dialog 对话框窗体，该窗体中显示指定选项卡的所有属性值(options)；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回当前选项卡控件 easyui-tabs 的 jQuery 对象。
        showOption: function (jq, which) { return jq.each(function () { showOption(this, which); }); },

        //  将指定的 easyui-tabs tab-panel 选项卡页移动至另一位置；该方法定义如下参数：
        //      param:  这是一个 JSON-Object 对象，该对象定义如下属性：
        //          source: Integer 或 String 类型值，表示要移动的 tab-panel 的索引号或者标题 title 值；
        //          target: Integer 或 String 类型值，表示移动目标位置的 tab-panel 的索引号或者标题 title 值；
        //          point:  移动到目标位置的方式，String 类型值，仅限于定义为如下值：
        //              "before":   表示把 source 选项卡移动至 target 选项卡的前面，默认值；
        //              "after":    表示把 source 选项卡移动至 target 选项卡的后面；
        //  返回值：返回当前选项卡控件 easyui-tabs 的 jQuery 对象。
        move: function (jq, param) { return jq.each(function () { moveTab(this, param); }); },

        //  在当前 easyui-tabs 组件上创建一个新的选项卡，并将其移动至指定选项卡的前一格位置；该方法定义如下参数：
        //      options:  表示要创建的新选项卡的属性；是一个 JSON-Object 对象；
        //          该对象的各项属性参考 easyui-tabs 中 add 方法的参数 options，并在此基础上增加了如下属性：
        //          target: Integer 或 String 类型值，表示移动位置的 tab-panel 的索引号或者标题 title 值；
        //  返回值：返回当前选项卡控件 easyui-tabs 的 jQuery 对象。
        insert: function (jq, options) { return jq.each(function () { insertTab(this, options); }); },

        //  重设指定选项卡的标题名；该方法定义如下参数：
        //      param:  这是一个 JSON-Object 对象，该对象定义如下属性：
        //          which: 需要重设标题名的选项卡的 索引号(index) 或者原标题名(title)；
        //          title: 新的标题名；
        //  返回值：返回当前选项卡控件 easyui-tabs 的 jQuery 对象。
        setTitle: function (jq, param) { return jq.each(function () { setTitle(this, param); }); }
    };
    var defaults = $.fn.tabs.extensions.defaults = {
        //  增加 easyui-tabs 的自定义扩展属性，该属性表示当前选项卡标题栏和选项卡的 pane-body 之间的空白区域高(宽)度(px)；
        //  该参数是一个 Number 数值，默认为 2.
        lineHeight: 0,

        //  是否启用点击选项卡头的右键菜单。
        enableConextMenu: true,

        //  是否启用 “创建新选项卡” 的右键菜单。
        enableNewTabMenu: false,

        //  定义 easyui-tabs 的 onRefresh 事件，当调用 easyui-tabs 的 refresh 方法后，将触发该事件。
        onRefresh: function (title, index) { },

        //  定义当 enableContextMenu 为 true 时，右键点击选项卡标题时候弹出的自定义右键菜单项内容；
        //  这是一个数组格式对象，数组中的每一项都是一个 menu-item 元素；该 menu-item 元素格式定义如下：
        //      id:         表示菜单项的 id；
        //      text:       表示菜单项的显示文本；
        //      iconCls:    表示菜单项的左侧显示图标；
        //      disabled:   表示菜单项是否被禁用(禁用的菜单项点击无效)；
        //      hideOnClick:    表示该菜单项点击后整个右键菜单是否立即自动隐藏；
        //      bold:           Boolean 类型值，默认为 false；表示该菜单项是否字体加粗；
        //      style:          JSON-Object 类型值，默认为 null；表示要附加到该菜单项的样式；
        //      handler:    表示菜单项的点击事件，该事件函数格式为 function(e, title, index, tabs, item, menu)，其中 this 指向菜单项本身
        contextMenu: null,

        //  覆盖 easyui-tabs 的原生事件属性 onContextMenu，以支持相应扩展功能。
        onContextMenu: onContextMenu,

        //  增加 easyui-tabs 的自定义扩展属性；该属性表示当右键点击选项卡头时，是否显示 "显示该选项卡的 option" 菜单项。
        //  Boolean 类型值，默认为 false。
        showOption: false
    };

    $.extend($.fn.tabs.defaults, defaults);
    $.extend($.fn.tabs.methods, methods);




    function closeCurrentTab(target, iniframe) {
        iniframe = iniframe && !$.util.isTopMost ? true : false;
        var current = $.util.parseJquery(target),
            currentTabs = current.currentTabs(),
            index;
        if (!iniframe && currentTabs.length) {
            index = current.currentTabIndex();
            if (index > -1) { currentTabs.tabs("close", index); }
        } else {
            var jq = $.util.parent.$;
            current = jq.util.parseJquery($.util.currentFrame);
            currentTabs = current.currentTabs();
            if (currentTabs.length) {
                index = current.currentTabIndex();
                if (index > -1) { currentTabs.tabs("close", index); }
            }
        }
    };

    $.fn.extend({
        //  扩展 jQuery 对象的实例方法；用于关闭当前对象所在的 easyui-tabs 当前选项卡(支持当前选项卡页面为 iframe 加载的情况)。
        //  该方法定义如下参数：
        //      iniframe: Boolean 类型值，表示是否为关闭当前对象所在的父级页面的选项卡；默认为 false。
        //          如果当前页面为顶级页面，
        //          或者当前对象在 iframe 中但是不在当前iframe中的某个 easyui-tabs 内，则参数参数 inframe 无效。
        //  返回值：返回当前 jQuery 链式对象(实际上返回的 jQuery 对象中，所包含的元素已经被销毁，因为其容器 tab-panel 被关闭销毁了)。
        closeCurrentTab: function (iniframe) { return this.each(function () { closeCurrentTab(this, iniframe); }); }
    });


})(jQuery);
(function ($, undefined) {
    $.fn.form.extensions = {};
    var getData = function (target, param) {
        var form = $.util.parseJquery(target);
        return form.serializeObject(param);
    };
		

    var _submit = $.fn.form.methods.submit;
    var submit = function (target, options) {
        var form = $.util.parseJquery(target);
        if (/^(?:form)$/i.test(this.nodeName)) { return _submit.call(form, form, options); }
        var opts = $.extend({}, $.fn.form.defaults, options || {});
        if (opts.onSubmit && opts.onSubmit.call(target, param) == false) { return; }
        if (!opts.url) { return; }
        var param = form.form("getData");
        $.post(opts.url, param, function (data) { if (opts.success) { opts.success(data); } });
    };

		var isChanged=function(target){
				var el = target;
        var els = el.elements, l = els.length, i = 0, j = 0, el, opts;
        for (; i < l ; ++ i, j = 0) {
                el = els[i];
                switch (el.type) {
                    case "text":
                    case "hidden":
                    case "password":
                    case "textarea":
										if($(el).val()!=$(el).attr('defaultValue')&&$(el).hasClass('combo-value')){
											return true;
										}
										if (el.defaultValue != el.value ){
											 if(!$(el).hasClass('combo-text')){
													return true;
											 	}
										}
										break;
                    case "radio":
                    case "checkbox":
                        if (el.defaultChecked != el.checked) return true;
                        break;
                    case "select-one":
                        j = 1;
                    case "select-multiple":
                        opts = el.options;
                        for (; j < opts.length ; ++ j) {
                            if (opts[j].defaultSelected != opts[j].selected) return true;
                        }
                        break;
                }
            }
            return false;
		};

    var load = function (target, data) {
        var form = $.util.parseJquery(target);
        if (!$.data(target, 'form')) {
            $.data(target, 'form', { options: $.extend({}, $.fn.form.defaults) });
        }
        var opts = $.data(target, 'form').options;
        if (typeof data == 'string') {
            var param = {};
            if (opts.onBeforeLoad.call(target, param) == false) return;
            $.ajax({
                url: data,
                data: param,
                dataType: 'json',
                success: function (data) { _load(data); },
                error: function () { opts.onLoadError.apply(target, arguments); }
            });
        } else {
            _load(data);
        }
        function _load(data) {
            for (var name in data) {
                var val = data[name];
                var rr = _checkField(name, val);
                if (!rr.length) {
                    var f = form.find('input[numberboxName="' + name + '"]');
                    if (f.length) {
                        f.numberbox('setValue', val); // set numberbox value
                    } else {
                        $('input[name="' + name + '"]', form).val(val);
                        $('textarea[name="' + name + '"]', form).val(val);
                        $('select[name="' + name + '"]', form).val(val);
                        $('span[name="' + name + '"]', form).text(val);
                        $('label[name="' + name + '"]', form).text(val);
                        $('div[name="' + name + '"]', form).text(val);
                    }
                }
                _loadCombo(name, val);
            }
            opts.onLoadSuccess.call(target, data);
            form.form("validate");
        }
        //  check the checkbox and radio fields
        function _checkField(name, val) {
            var rr = form.find('input[name="' + name + '"][type=radio], input[name="' + name + '"][type=checkbox]');
            rr._propAttr('checked', false);
            rr.each(function () {
                var f = $(this);
                if (f.val() == String(val) || $.inArray(f.val(), val) >= 0) {
                    f._propAttr('checked', true);
                }
            });
            return rr;
        }
        function _loadCombo(name, val) {
            var cc = $.fn.form.comboList;
            var c = form.find('[comboName="' + name + '"]');
            if (c.length) {
                for (var i = 0; i < cc.length; i++) {
                    var type = cc[i];
                    if (c.hasClass(type + '-f')) {
                        if (c[type]('options').multiple) {
                            c[type]('setValues', val);
                        } else {
                            c[type]('setValue', val);
                        }
                        return;
                    }
                }
            }
        }
    }


    var methods = $.fn.form.extensions.methods = {
        //  获取 easyui-form 控件容器内所有表单控件的 JSON 序列化数据；该方法的参数 param 可以定义为如下格式：
        //      1、JSON-Object  ：该对象定义如下属性：
        //          onlyEnabled:    表示返回的结果数据中是否仅包含启用(disabled == false)的 HTML 表单控件；Boolean 类型值，默认为 false。
        //          transcript :    表示当范围内存在重名(name 相同时)的 DOM 元素时，对重复元素的取值规则；
        ///                 这是一个 String 类型值，可选的值限定在以下范围：
        //              cover  :    覆盖方式，只取后面元素 的值，丢弃前面元素的值；默认值；
        //              discard:    丢弃后面元素的值，只取前面元素的值；
        //              overlay:    将所有元素的值进行叠加；
        //          overtype   :    元素叠加方式，当 transcript 的值定义为 "overlay" 时，此属性方有效；
        //                  这是一个 String 类型值，可选的值限定在以下范围：
        //              array  :    将所有重复的元素叠加为一个数组；
        //              append :    将所有的重复元素叠加为一个字符串；默认值；
        //          separator  :    元素叠加的分隔符，定义将所有重名元素叠加为一个字符串时用于拼接字符串的分隔符；
        //                  这是一个 String 类型值，默认为 ","；当 transcript 的值定义为 "overlay" 且 overtype 的值定义为 "append" 时，此属性方有效。
        //      2、String 类型值:   表示当范围内存在重名(name 相同时)的 DOM 元素时，对重复元素的取值规则；
        //              其取值范围和当参数格式为 JSON-Object 时的属性 transcript 一样。
        //  返回值：该方法返回一个 JSON Object，返回对象中的每个数据都表示一个表单控件值。
        getData: function (jq, param) { return getData(jq[0], param); },
				
				isChanged:function(jq){return isChanged(jq[0]);},

        //  重写 easyui-form 控件的 submit 方法，使之除了支持 form 标签提交外，还支持 div 等其他容器标签的提交。
       // submit: function (jq, options) { return jq.each(function () { submit(this, options); }); },

        //  重写 easyui-form 控件的 load 方法。
        load: function (jq, data) { return jq.each(function () { load(this, data); }); }
    };
    var defaults = $.fn.form.extensions.defaults = {};

    $.extend($.fn.form.defaults, defaults);
    $.extend($.fn.form.methods, methods);

    $.fn.form.comboList = ['combobox', 'combotree', 'combogrid', 'datetimebox', 'datebox', 'combo'];
})(jQuery);

(function ($, undefined) {


    $.fn.validatebox.extensions = {};


    var rules = {
        //  只允许输入英文字母或数字
        engNum: {
            validator: function (value) {
                return /^[0-9a-zA-Z]*$/.test(value);
            },
            message: '请输入英文字母或数字'
        },
        //  只允许汉字、英文字母或数字
        chsEngNum: {
            validator: function (value, param) {
                return /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/.test(value);
            },
            message: '只允许汉字、英文字母或数字。'
        },
        //  只允许汉字、英文字母、数字及下划线
        code: {
            validator: function (value, param) {
                return /^[\u0391-\uFFE5\w]+$/.test(value);
            },
            message: '只允许汉字、英文字母、数字及下划线.'
        },
        //  验证是否为合法的用户名
        name: {
            validator: function (value) { return value.isUserName(); },
            message: "用户名不合法(字母开头，允许6-16字节，允许字母数字下划线)"
        },
        //  指定字符最小长度
        minLength: {
            validator: function (value, param) { return rules.length.validator(value, [param[0]]); },
            message: "最少输入 {0} 个字符."
        },
        //  指定字符最大长度
        maxLength: {
            validator: function (value, param) { return rules.length.validator(value, [0, param[0]]); },
            message: "最多输入 {0} 个字符."
        },
        //  指定字符的长度范围
        length: {
            validator: function (value, param) {
                var len = $.trim(value).length;
                var min = param[0], max = param[1];
                return (!min || len >= min) && (!max || len <= max);
            },
            message: "输入内容长度必须介于 {0} 和 {1} 个字符数之间."
        },
        //  必须包含指定的内容
        contains: {
            validator: function (value, param) { return $.string.contains(value, param[0]); },
            message: "输入的内容必须包含 {0}."
        },
        //  以指定的字符开头
        startsWith: {
            validator: function (value, param) { return $.string.startsWith(value, param[0]); },
            message: "输入的内容必须以 {0} 作为起始字符."
        },
        //  以指定的字符结束
        endsWith: {
            validator: function (value, param) { return $.string.endsWith(value, param[0]); },
            message: "输入的内容必须以 {0} 作为起始字符."
        },
        //  长日期时间(yyyy-MM-dd hh:mm:ss)格式
        longDate: {
            validator: function (value) { return $.string.isLongDate(value); },
            message: "输入的内容必须是长日期时间(yyyy-MM-dd hh:mm:ss)格式."
        },
        //  短日期(yyyy-MM-dd)格式
        shortDate: {
            validator: function (value) { return $.string.isShortDate(value); },
            message: "输入的内容必须是短日期(yyyy-MM-dd)格式."
        },
        //  长日期时间(yyyy-MM-dd hh:mm:ss)或短日期(yyyy-MM-dd)格式
        date: {
            validator: function (value) { return $.string.isDate(value); },
            message: "输入的内容必须是长日期时间(yyyy-MM-dd hh:mm:ss)或短日期(yyyy-MM-dd)格式."
        },
        //  电话号码(中国)格式
        tel: {
            validator: function (value) { return $.string.isTel(value); },
            message: "输入的内容必须是电话号码(中国)格式."
        },
        //  移动电话号码(中国)格式
        mobile: {
            validator: function (value) { return $.string.isMobile(value); },
            message: "输入的内容必须是移动电话号码(中国)格式."
        },
        //  电话号码(中国)或移动电话号码(中国)格式
        telOrMobile: {
            validator: function (value) { return $.string.isTelOrMobile(value); },
            message: "输入的内容必须是电话号码(中国)或移动电话号码(中国)格式."
        },
        //  传真号码(中国)格式
        fax: {
            validator: function (value) { return $.string.isFax(value); },
            message: "输入的内容必须是传真号码(中国)格式."
        },
        //  电子邮箱(Email)地址格式
        email: {
            validator: function (value) { return $.string.isEmail(value); },
            message: "输入的内容必须是电子邮箱(Email)地址格式."
        },
        //  邮政编码(中国)格式
        zipCode: {
            validator: function (value) { return $.string.isZipCode(value); },
            message: "输入的内容必须是邮政编码(中国)格式."
        },
        //  必须包含中文汉字
        existChinese: {
            validator: function (value) { return $.string.existChinese(value); },
            message: "输入的内容必须是包含中文汉字."
        },
        //  必须是纯中文汉字
        chinese: {
            validator: function (value) { return $.string.isChinese(value); },
            message: "输入的内容必须是纯中文汉字."
        },
        //  必须是纯英文字母
        english: {
            validator: function (value) { return $.string.isEnglish(value); },
            message: "输入的内容必须是纯英文字母."
        },
        //  必须是合法的文件名(不能包含字符 \\/:*?\"<>|)
        fileName: {
            validator: function (value) { return $.string.isFileName(value); },
            message: "输入的内容必须是合法的文件名(不能包含字符 \\/:*?\"<>|)."
        },
        //  必须是正确的 IP地址v4 格式
        ipv4: {
            validator: function (value) { return $.string.isIPv4(value); },
            message: "输入的内容必须是正确的 IP地址v4 格式."
        },
        //  必须是正确的 url 格式
        url: {
            validator: function (value) { return $.string.isUrl(value); },
            message: "输入的内容必须是正确的 url 格式."
        },
        //  必须是正确的 IP地址v4 或 url 格式
        ipv4url: {
            validator: function (value) { return $.string.isUrlOrIPv4(value); },
            message: "输入的内容必须是正确的 IP地址v4 或 url 格式."
        },
        //  必须是正确的货币金额(阿拉伯数字表示法)格式
        currency: {
            validator: function (value) { return $.string.isCurrency(value); },
            message: "输入的内容必须是正确的货币金额(阿拉伯数字表示法)格式."
        },
        //  必须是正确 QQ 号码格式
        qq: {
            validator: function (value) { return $.string.isQQ(value); },
            message: "输入的内容必须是正确 QQ 号码格式."
        },
        //  必须是正确 MSN 账户名格式
        msn: {
            validator: function (value) { return $.string.isMSN(value); },
            message: "输入的内容必须是正确 MSN 账户名格式."
        },
        unNormal: {
            validator: function (value) { return $.string.isUnNormal(value); },
            message: "输入的内容必须是不包含空格和非法字符Z."
        },
        //  必须是合法的汽车车牌号码格式
        carNo: {
            validator: function (value) { return $.string.isCarNo(value); },
            message: "输入的内容必须是合法的汽车车牌号码格式."
        },
        //  必须是合法的汽车发动机序列号格式
        carEngineNo: {
            validator: function (value) { return $.string.isCarEngineNo(value); },
            message: "输入的内容必须是合法的汽车发动机序列号格式."
        },
        //  必须是合法的身份证号码(中国)格式
        idCard: {
            validator: function (value) { return $.string.isIDCard(value); },
            message: "输入的内容必须是合法的身份证号码(中国)格式."
        },
        //  必须是合法的整数格式
        integer: {
            validator: function (value) { return $.string.isInteger(value); },
            message: "输入的内容必须是合法的整数格式."
        },
        //  必须是合法的整数格式且值介于 {0} 与 {1} 之间
        integerRange: {
            validator: function (value, param) {
                return $.string.isInteger(value) && ((param[0] || value >= param[0]) && (param[1] || value <= param[1]));
            },
            message: "输入的内容必须是合法的整数格式且值介于 {0} 与 {1} 之间."
        },
        //  必须是指定类型的数字格式
        numeric: {
            validator: function (value, param) { return $.string.isNumeric(value, param ? param[0] : undefined); },
            message: "输入的内容必须是指定类型的数字格式."
        },
        //  必须是指定类型的数字格式且介于 {0} 与 {1} 之间
        numericRange: {
            validator: function (value, param) {
                return $.string.isNumeric(value, param ? param[2] : undefined) && ((param[0] || value >= param[0]) && (param[1] || value <= param[1]));
            },
            message: "输入的内容必须是指定类型的数字格式且介于 {0} 与 {1} 之间."
        },
        //  必须是正确的 颜色(#FFFFFF形式) 格式
        color: {
            validator: function (value) { return $.string.isColor(value); },
            message: "输入的内容必须是正确的 颜色(#FFFFFF形式) 格式."
        },
        //  必须是安全的密码字符(由字符和数字组成，至少 6 位)格式
        password: {
            validator: function (value) { return $.string.isSafePassword(value); },
            message: "输入的内容必须是安全的密码字符(由字符和数字组成，至少 6 位)格式."
        },
        //  输入的字符必须是指定的内容相同
        equals: {
            validator: function (value, param) {
                var val = param[0], type = param[1];
                if (type) {
                    switch (String(type).toLowerCase()) {
                        case "jquery":
                        case "dom":
                            val = $.util.parseJquery(val).val();
                            break;
                        case "id":
                            val = $.util.parseJquery("#" + val).val();
                            break;
                        case "string":
                        default:
                            break;
                    }
                }
                return value === val;
            },
            message: "输入的内容不匹配."
        }
    };
    $.extend($.fn.validatebox.defaults.rules, rules);




    function initialize(target) {
        var t = $.util.parseJquery(target);
        var opts = t.validatebox("options");
        if (!opts._initialized) {
            setPrompt(target, opts.prompt, opts);
            if (opts.autoFocus) {
                $.util.call(function () { t.focus(); });
            }
            opts._initialized = true;
        }
    };

    function setPrompt(target, prompt, opts) {
        var t = $.util.parseJquery(target);
        opts = opts || t.validatebox("options");
        opts.prompt = prompt;
        if ($.html5.testProp("placeholder", t[0].nodeName)) {
            t.attr("placeholder", prompt);
        } else {
            if (!$.isFunction(!opts.promptFocus)) {
                opts.promptFocus = function () {
                    if (t.hasClass("validatebox-prompt")) {
                        t.removeClass("validatebox-prompt");
                        if (t.val() == opts.prompt) { t.val(""); }
                    }
                };
                t.focus(opts.promptFocus);
            }
            if (!$.isFunction(!opts.promptBlur)) {
                opts.promptBlur = function () {
                    if ($.string.isNullOrEmpty(t.val())) { t.addClass("validatebox-prompt").val(opts.prompt); }
                }
                t.blur(opts.promptBlur);
            }
            if ($.string.isNullOrEmpty(t.val())) {
                t.addClass("validatebox-prompt").val(opts.prompt);
            }
        }
    }

    var _validate = $.fn.validatebox.methods.isValid;
    function validate(target) {
        var t = $.util.parseJquery(target);
        if (t.hasClass("validatebox-prompt")) { t.removeClass("validatebox-prompt").val(""); }
        return _validate.call(t, t);
    };


    var _validatebox = $.fn.validatebox;
    $.fn.validatebox = function (options, param) {
        if (typeof options == "string") { return _validatebox.apply(this, arguments); }
        options = options || {};
        return this.each(function () {
            var jq = $.util.parseJquery(this), opts = $.extend({}, $.fn.validatebox.parseOptions(this), options);
            _validatebox.call(jq, opts);
            initialize(this);
        });
    };
    $.union($.fn.validatebox, _validatebox);


    var methods = $.fn.validatebox.extensions.methods = {
        //  扩展 easyui-validatebox 的自定义扩展方法；设置当前 easyui-validatebox 控件的 prompt 值；该方法的参数 prompt 表示将被设置的 prompt 值；
        //  返回值：返回表示当前 easyui-validatebox 的 jQuery 链式对象。
        setPrompt: function (jq, prompt) { return jq.each(function () { setPrompt(this, prompt); }); },

        //  重写 easyui-validatebox 的原生方法；以支持相应扩展功能或属性。
        //  返回值：返回表示当前 easyui-validatebox 的 jQuery 链式对象。
        validate: function (jq) { return jq.each(function () { validate(this); }) },

        //  重写 easyui-validatebox 的原生方法；以支持相应扩展功能或属性。
        isValid: function (jq) { return validate(jq[0]); }
    };
    var defaults = $.fn.validatebox.extensions.defaults = {
        //  增加 easyui-validatebox 的扩展属性 prompt，该属性功能类似于 easyui-searchbox 的 prompt 属性。
        //  表示该验证输入框的提示文本；String 类型值，默认为 null。
        prompt: null,

        //  增加 easyui-validatebox 的扩展属性 autoFocus，该属性表示在当前页面加载完成后，该 easyui-validatebox 控件是否自动获得焦点。
        //  Boolean 类型值，默认为 false。
        autoFocus: false
    };

    $.extend($.fn.validatebox.defaults, defaults);
    $.extend($.fn.validatebox.methods, methods);

    var css =
        ".validatebox-prompt{ color: #ccc; }";
    $.util.addCss(css);



    //  修改 jQuery 本身的成员方法 val；使之支持 easyui-validatebox 的扩展属性 prompt。
    var core_val = $.fn.val;
    $.fn.val = function (value) {
        var val, opts;
        if (this.length > 0 && this.is(".validatebox-text.validatebox-prompt") && !$.html5.testProp("placeholder", this[0].nodeName)) {
            opts = this.validatebox("options");
            if (arguments.length == 0) {
                val = core_val.apply(this, arguments);
                return val == opts.prompt ? "" : val;
            }
            if (value && value != opts.prompt) { this.removeClass("validatebox-prompt"); }
        }
        return core_val.apply(this, arguments);
    };


})(jQuery);
(function ($, undefined) {

    $.fn.combo.extensions = {};

    function setPrompt(target, prompt) {
        var t = $.util.parseJquery(target), opts = t.combo("options"), textbox = t.combo("textbox");
        opts.prompt = prompt;
        textbox.validatebox("setPrompt", prompt);
    };

    function setIcon(target, iconCls) {
        var t = $.util.parseJquery(target), state = $.data(target, "combo"), combo = state.combo;
        var arrow = combo.find("span.combo-arrow").removeAttr("class").addClass("combo-arrow");
        if (iconCls) { arrow.addClass(iconCls); }
        t.combo("options").iconCls = iconCls;
    }

    function setRequired(target, required) {
        var t = $.util.parseJquery(target), opts = t.combo("options"), textbox = t.combo("textbox");
        opts.required = textbox.validatebox("options").required = required;
    };

    var _destroy = $.fn.combo.methods.destroy;
    function destroy(target) {
        var t = $(target), opts = t.combo("options");
        if ($.isFunction(opts.onBeforeDestroy) && opts.onBeforeDestroy.call(target) == false) { return; }
        _destroy.call(target, t);
        if ($.isFunction(opts.onDestroy)) { opts.onDestroy.call(target); }
    };

    function getCombo(target) {
        return $.data(target, "combo").combo;
    };




    function initialize(target) {
        var t = $.util.parseJquery(target), state = $.data(target, "combo"),
            opts = t.combo("options"), panel = state.panel,
            combo = state.combo, arrow = combo.find(".combo-arrow"),
            exts = opts.extensions ? opts.extensions : opts.extensions = {};
        if (!exts._initialized) {
            t.combo("textbox").focus(function () {
                if (opts.autoShowPanel && panel.is(":hidden")) { t.combo("showPanel"); }
            });
            arrow.unbind("click.combo").bind("click.combo", function () {
                if (panel.is(":visible")) {
                    t.combo("hidePanel");
                } else {
                    $("div.combo-panel:visible").panel("close");
                    t.combo("showPanel");
                    t.combo("textbox").focus();
                }
            });
            if (opts.iconCls) { t.combo("setIcon", opts.iconCls); }
            if ($.util.browser.msie && combo._outerWidth() != opts.width) {
                $.util.call(function () { t.combo("resize", opts.width); });
            }
            exts._initialized = true;
        }
    }


    var _combo = $.fn.combo;
    $.fn.combo = function (options, param) {
        if (typeof options == "string") { return _combo.apply(this, arguments); }
        return _combo.apply(this, arguments).each(function () {
            initialize(this);
        });
    };
    $.union($.fn.combo, _combo);


    var defaults = $.fn.combo.extensions.defaults = {
        //  增加 easyui-combo 的自定义扩展属性；表示该 combo 组件的 iconCls 图标样式类；
        //  String 类型值，默认为 null。
        iconCls: null,

        //  增加 easyui-combo 的自定义扩展属性；表示该 combox 组件是否在 textbox 文本显示框获取焦点时自动执行 showPanel 方法显示下拉 panel 面板；
        //  Boolean 类型值，默认为 true。
        autoShowPanel: true,

        onBeforeDestroy: function () { },

        onDestroy: function () { }
    };

    var methods = $.fn.combo.extensions.methods = {
        //  扩展 easyui-combo 组件的自定义方法；用于设置 easyui-combo 控件的右侧显示图标，该方法定义如下参数：
        //      iconCls:    String 类型的值，表示需要设置的图标的 css 类样式名，例如 "icon-ok", "icon-save"
        //  返回值：返回表示当前 easyui-combo 控件的 jQuery 链式对象。
        setIcon: function (jq, iconCls) { return jq.each(function () { setIcon(this, iconCls); }); },

        //  扩展 easyui-combo 组件的自定义方法；用于设置启用或者禁用 easyui-combo 控件的表单验证功能，该方法定义如下参数：
        //      required:   Boolean 类型的值，表示启用或者禁用 easyui-combo 控件的表单验证功能。
        //  返回值：返回表示当前 easyui-combo 控件的 jQuery 链式对象。
        setRequired: function (jq, required) { return jq.each(function () { setRequired(this, required); }); },

        //  扩展 easyui-combo 组件的自定义方法；用于设置该 combo 的 textbox 输入框的 prompt(输入提示文字) 值；该方法定义如下参数：
        //      prompt: String 类型值，表示要被设置的 prompt 值；
        //  返回值：返回表示当前 easyui-combo 控件的 jQuery 链式对象。
       // setPrompt: function (jq, prompt) { return jq.each(function () { setPrompt(this, prompt); }); },

        destroy: function (jq) { return jq.each(function () { destroy(this); }); },

        combo: function (jq) { return getCombo(jq[0]); }
    };
    $.extend($.fn.combo.defaults, defaults);
    $.extend($.fn.combo.methods, methods);

})(jQuery);
(function ($, undefined) {


    $.fn.window.extensions = {};


    var initialize = function (target) {
        var t = $.util.parseJquery(target);
        var state = $.data(target, "window"), opts = t.window("options");
        if (!opts._initialized) {
            t.window("header").on({
                dblclick: function () {
                    var opts = t.window("options");
                    if (opts.autoRestore) { if (opts.maximized) { t.window("restore"); } else if (opts.maximizable) { t.window("maximize"); } }
                },
                contextmenu: function (e) {
                    var opts = t.window("options");
                    if (opts.enableHeaderContextMenu) {
                        e.preventDefault();
                        var items = [
                            { text: "最大化", iconCls: "panel-tool-max", disabled: !opts.maximized && opts.maximizable ? false : true, onclick: function () { t.window("maximize"); } },
                            { text: "恢复", iconCls: "panel-tool-restore", disabled: opts.maximized ? false : true, onclick: function () { t.window("restore"); } },
                            "-",
                            { text: "关闭", iconCls: "panel-tool-close", disabled: !opts.closable, onclick: function () { t.window("close"); } }
                        ];
                        var headerContextMenu = $.array.likeArray(opts.headerContextMenu) ? opts.headerContextMenu : [];
                        if (headerContextMenu.length) { $.array.insertRange(items, 0, $.util.merge([], headerContextMenu, "-")); }
                        items = parseContextMenuMap(e, items, t);
                        $.easyui.showMenu({ items: items, left: e.pageX, top: e.pageY });
                    }
                }
            });
            opts._initialized = true;
        }
        if (opts.draggable) {
            var dragOpts = state.window.draggable("options");
            var _onStartDrag = dragOpts.onStartDrag, _onStopDrag = dragOpts.onStopDrag;
            dragOpts.onStartDrag = function () { _onStartDrag.apply(this, arguments); t.window("body").addClass("window-body-hidden").children().addClass("window-body-hidden-proxy"); };
            dragOpts.onStopDrag = function () { _onStopDrag.apply(this, arguments); t.window("body").removeClass("window-body-hidden").children().removeClass("window-body-hidden-proxy"); };
        }
    };

    function parseContextMenuMap(e, menus, win) {
        return $.array.map(menus, function (value, index) {
            if (!value || $.util.isString(value)) { return value; }
            var ret = $.extend({}, value);
            ret.id = $.isFunction(value.id) ? value.id.call(ret, e, win) : value.id;
            ret.text = $.isFunction(value.text) ? value.text.call(ret, e, win) : value.text;
            ret.iconCls = $.isFunction(value.iconCls) ? value.iconCls.call(ret, e, win) : value.iconCls;
            ret.disabled = $.isFunction(value.disabled) ? value.disabled.call(ret, e, win) : value.disabled;
            ret.hideOnClick = $.isFunction(value.hideOnClick) ? value.hideOnClick.call(ret, e, win) : value.hideOnClick;
            ret.onclick = $.isFunction(value.onclick) ? function (e, item, menu) { value.onclick.call(this, e, win, item, menu); } : value.onclick;
            ret.handler = $.isFunction(value.handler) ? function (e, item, menu) { value.handler.call(this, e, win, item, menu); } : value.handler;
            if (ret.children && ret.children.length) { ret.children = parseContextMenuMap(e, ret.children, win); }
            return ret;
        });
    };


    var _window = $.fn.window;
    $.fn.window = function (options, param) {
        if (typeof options == "string") { return _window.apply(this, arguments); }
        options = options || {};
        return this.each(function () {
            var jq = $.util.parseJquery(this);
            _window.call(jq, options);
            initialize(this);
        });
    };
    $.union($.fn.window, _window);



    var methods = $.fn.window.extensions.methods = {};
    var defaults = $.fn.window.extensions.defaults = $.extend({}, {

        //  扩展 easyui-window 以及 easyui-dialog 控件的自定义属性，表示该窗口对象是否在屏幕大小调整的情况下自动进行左右居中，默认为 true。
        autoHCenter: true,

        //  扩展 easyui-window 以及 easyui-dialog 控件的自定义属性，表示该窗口对象是否在屏幕大小调整的情况下自动进行上下居中，默认为 true。
        autoVCenter: true,

        //  扩展 easyui-window 以及 easyui-dialog 控件的自定义属性，表示该窗口对象是否在按下 ESC，默认为 true。
        autoCloseOnEsc: true,

        //  扩展 easyui-window 以及 easyui-dialog 控件的自定义属性，表示该窗口是否在双击头部时自动最大化。
        autoRestore: true,

        //  扩展 easyui-window 以及 easyui-dialog 控件的自定义属性，表示是否启用该窗口的右键菜单。
        enableHeaderContextMenu: true,

        //  扩展 easyui-window 以及 easyui-dialog 控件的自定义属性，表示该窗口的右键菜单；
        //  这是一个数组格式对象，数组中的每一项都是一个 menu-item 元素；该 menu-item 元素格式定义如下：
        //      id:         表示菜单项的 id；
        //      text:       表示菜单项的显示文本；
        //      iconCls:    表示菜单项的左侧显示图标；
        //      disabled:   表示菜单项是否被禁用(禁用的菜单项点击无效)；
        //      hideOnClick:    表示该菜单项点击后整个右键菜单是否立即自动隐藏；
        //      bold:           Boolean 类型值，默认为 false；表示该菜单项是否字体加粗；
        //      style:          JSON-Object 类型值，默认为 null；表示要附加到该菜单项的样式；
        //      handler:    表示菜单项的点击事件，该事件函数格式为 function(e, win, item, menu)，其中 this 指向菜单项本身
        headerContextMenu: null
    });
	
    $.extend($.fn.window.defaults, defaults);
    $.extend($.fn.window.methods, methods);

    $(function () {
        //  设置当屏幕大小调整时，所有 easyui-window 或 easyui-dialog 窗口在属性 autoHCenter: true 或 autoVCenter: true 的情况下自动居中。
        $(window).resize(function () {
            $(".panel-body.window-body").each(function () {
                var win = $(this), opts = win.window("options");
                if (opts && opts.draggable) {
                    if (opts.autoHCenter || opts.autoVCenter) {
                        var method = opts.autoHCenter && opts.autoVCenter ? "center" : (opts.autoHCenter ? "hcenter" : "vcenter");
                        win.window(method);
                    } else if (opts.inContainer) { win.window("move"); }
                }
            });
        });

        //  在当前打开 modal:true 的 easyui-window 或者 easyui-dialog 时，按 ESC 键关闭顶层的 easyui-window 或者 easyui-dialog 对象。
        $(document).keydown(function (e) {
            if (e.which == 27) {
                $("div.window-mask:last").prevAll("div.panel.window:first").children(".panel-body.window-body").each(function () {
                    var win = $(this), opts = win.window("options");
                    if (opts && opts.closable && opts.autoCloseOnEsc && !win.window("header").find(".panel-tool a").attr("disabled")) {
                        $.util.call(function () { win.window("close"); });
                    }
                });
            }
        });

        //  点击模式对话框（例如 easyui-messager、easyui-window、easyui-dialog）的背景遮蔽层使窗口闪动
        $("body").on("click", "div.window-mask:last", function (e) {
            $(this).prevAll("div.panel.window:first").shine();
        });
    });


    var css =
        ".window-body-hidden { background-color: #95b8e7; filter: alpha(opacity=60); opacity: 0.6; }" +
        ".window-body-hidden-proxy { visibility: hidden; }" +
        ".window-proxy { background-color: #0e2d5f; filter: alpha(opacity=60); opacity: 0.6; }";
    $.util.addCss(css);

})(jQuery);
(function ($, undefined) {

    $.fn.datagrid.extensions = {};

    /************************  initExtend Methods Begin  ************************/

    var _updateRow = $.fn.datagrid.methods.updateRow;
    var _appendRow = $.fn.datagrid.methods.appendRow;
    var _insertRow = $.fn.datagrid.methods.insertRow;
    var updateRow = function (target, param) {
        if (!param || !param.row || !$.isNumeric(param.index)) { return; }
        var t = $.util.parseJquery(target), opts = t.datagrid("options");
        if ($.isFunction(opts.onBeforeUpdateRow) && opts.onBeforeUpdateRow.call(target, param.index, param.row) == false) { return; }
        _updateRow.call(t, t, param);
        initHeaderColumnFilterContainer(t, opts);
        initRowDndExtensions(t, opts);
        initColumnRowTooltip(t, opts, param.index, param.row);
        if ($.isFunction(opts.onUpdateRow)) { opts.onUpdateRow.call(target, param.index, param.row); }
    };
    var appendRow = function (target, row) {
        if (!row) { return; }
        var t = $.util.parseJquery(target), opts = t.datagrid("options");
        if ($.isFunction(opts.onBeforeAppendRow) && opts.onBeforeAppendRow.call(target, row) == false) { return; }
        _appendRow.call(t, t, row);
        var rows = t.datagrid("getRows"), index = rows.length - 1;
        initHeaderColumnFilterContainer(t, opts);
        initRowDndExtensions(t, opts);
        initColumnRowTooltip(t, opts, index, row);
        if ($.isFunction(opts.onAppendRow)) { opts.onAppendRow.call(target, row); }
    };
    var insertRow = function (target, param) {
        if (!param || !param.row || !$.isNumeric(param.index)) { return; }
        var t = $.util.parseJquery(target), opts = t.datagrid("options");
        if ($.isFunction(opts.onBeforeInsertRow) && opts.onBeforeInsertRow.call(target, param.index, param.row) == false) { return; }
        _insertRow.call(t, t, param);
        initHeaderColumnFilterContainer(t, opts);
        initRowDndExtensions(t, opts);
        initColumnRowTooltip(t, opts, param.index, param.row);
        if ($.isFunction(opts.onInsertRow)) { opts.onInsertRow.call(target, param.index, param.row); }
    };

    var isChecked = function (target, index) {
        var t = $.util.parseJquery(target), rows = t.datagrid("getChecked"),
            list = $.array.map(rows, function (val) { return t.datagrid("getRowIndex", val); });
        return $.array.contains(list, index);
    };

    var isSelected = function (target, index) {
        var t = $.util.parseJquery(target), rows = t.datagrid("getSelections"),
            list = $.array.map(rows, function (val) { return t.datagrid("getRowIndex", val); });
        return $.array.contains(list, index);
    };

    var freezeColumn = function (target, field) {
        var t = $.util.parseJquery(target), fields = t.datagrid("getColumnFields"), frozenFields = t.datagrid("getColumnFields", true);
        if (!frozenFields || !frozenFields.length || !$.array.contains(fields, field) || $.array.contains(frozenFields, field)) { return; }
        t.datagrid("moveColumn", { source: field, target: frozenFields[frozenFields.length - 1], point: "after" });
    };

    var unfreezeColumn = function (target, field) {
        var t = $.util.parseJquery(target), fields = t.datagrid("getColumnFields"), frozenFields = t.datagrid("getColumnFields", true);
        if (!fields || !fields.length || $.array.contains(fields, field) || !$.array.contains(frozenFields, field)) { return; }
        t.datagrid("moveColumn", { source: field, target: fields[0], point: "before" });
    };

    var moveRow = function (target, param) {
        if (!param || !$.isNumeric(param.source) || !$.isNumeric(param.target) || param.source == param.target || !param.point) { return; }
        if (!$.array.contains(["top", "bottom"], param.point)) { param.point = "top"; }
        var t = $.util.parseJquery(target), opts = t.datagrid("options"), rows = t.datagrid("getRows"),
            sourceRow = rows[param.source], targetRow = rows[param.target];
        if (!sourceRow || !targetRow) { return; }
        if ($.isFunction(opts.onBeforeDrop) && opts.onBeforeDrop.call(target, targetRow, sourceRow, param.point) == false) { return; }
        var row = t.datagrid("popRow", param.source), index = t.datagrid("getRowIndex", targetRow);
        rows = t.datagrid("getRows");
        switch (param.point) {
            case "top": t.datagrid("insertRow", { index: index, row: row }); break;
            case "bottom":
                if (index++ >= rows.length) {
                    t.datagrid("appendRow", row);
                } else {
                    t.datagrid("insertRow", { index: index, row: row });
                }
                break;
            default: break;
        }
        if (row && $.isFunction(opts.onDrop)) { opts.onDrop.call(target, targetRow, sourceRow, param.point); }
    };

    var shiftRow = function (target, param) {
        if (!param || !$.isNumeric(param.index) || !param.point || !$.array.contains(["up", "down"], param.point)) { return; }
        var t = $.util.parseJquery(target), opts = t.datagrid("options"), index = param.point == "up" ? param.index - 1 : param.index + 1,
            point = param.point == "up" ? "top" : "bottom";
        t.datagrid("moveRow", { source: param.index, target: index, point: point });
    };

    var getNextRow = function (target, index) {
        var t = $.util.parseJquery(target), rows = t.datagrid("getRows"), i = index + 1;
        return rows[i] ? rows[i] : null;
    };

    var getPrevRow = function (target, index) {
        var t = $.util.parseJquery(target), rows = t.datagrid("getRows"), i = index - 1;
        return rows[i] ? rows[i] : null;
    };

    var popRow = function (target, index) {
        var t = $.util.parseJquery(target), rows = t.datagrid("getRows"), row = rows[index];
        if (!row) { return null; }
        t.datagrid("deleteRow", index);
        return row;
    };

    var enableRowDnd = function (target) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options");
        t.datagrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").draggable({
            disabled: false, revert: true, cursor: "default", deltaX: 10, deltaY: 5,
            proxy: function (source) {
                var tr = $.util.parseJquery(source), index = parseInt(tr.attr("datagrid-row-index")),
                    dom = t.datagrid("getRowDom", index).clone(),
                    temp = $("<tr></tr>").addClass("datagrid-row datagrid-row-selected");
                $("<td><span class='tree-dnd-icon tree-dnd-no' ></span></td>").appendTo(temp);
                var td = dom.find("td").each(function (i) { if (i < 6) { temp.append(this); } });
                if (td.length > 6) { $("<td>...</td>").css("width", "40px").appendTo(temp); }
                return $("<table></table>").addClass("tree-node-proxy").appendTo("body").append(temp).hide();
            }, onBeforeDrag: function (e) {
                var tr = $.util.parseJquery(this), index = parseInt(tr.attr("datagrid-row-index")), row = t.datagrid("getRowData", index);
                if ($.isFunction(opts.onBeforeDrag) && opts.onBeforeDrag.call(target, index, row) == false) { return false; }
                if (e.which != 1) { return false; }
                if (e.target.type == "checkbox") { return false; }
            }, onStartDrag: function () {
                var tr = $.util.parseJquery(this), index = parseInt(tr.attr("datagrid-row-index")), row = t.datagrid("getRowData", index);
                tr.draggable("proxy").css({ left: -10000, top: -10000 });
                if ($.isFunction(opts.onBeforeDrag)) { opts.onStartDrag.call(target, index, row); }
            }, onStopDrag: function () {
                var tr = $.util.parseJquery(this), index = parseInt(tr.attr("datagrid-row-index")), row = t.datagrid("getRowData", index);
                if ($.isFunction(opts.onStopDrag)) { opts.onStopDrag.call(target, index, row); }
            }, onDrag: function (e) {
                var x1 = e.pageX, y1 = e.pageY, x2 = e.data.startX, y2 = e.data.startY;
                var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                if (d > 15) { $(this).draggable("proxy").show(); }
                this.pageY = e.pageY;
            }
        }).droppable({
            accept: "tr.datagrid-row",
            onDragEnter: function (e, source) {
                var droper = $.util.parseJquery(this), drager = $.util.parseJquery(source),
                    droperIndex = parseInt(droper.attr("datagrid-row-index")),
                    dragerIndex = parseInt(drager.attr("datagrid-row-index")),
                    droperRow = t.datagrid("getRowData", droperIndex), dragerRow = t.datagrid("getRowData", dragerIndex),
                    droperRowDom = t.datagrid("getRowDom", droperIndex),
                    mark = droperRowDom.find("td");
                var dnd = droper.data("dnd"), data = {
                    droper: droper, drager: drager, droperIndex: droperIndex, dragerIndex: dragerIndex,
                    droperRow: droperRow, dragerRow: dragerRow, droperRowDom: droperRowDom, mark: mark
                };
                if (!dnd) { droper.data("dnd", data); } else { $.extend(dnd, data); }
                if ($.isFunction(opts.onDragEnter) && opts.onDragEnter.call(target, droperRow, dragerRow) == false) {
                    setDroppableStatus(drager, false);
                    mark.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom");
                    droper.droppable("disable");
                }
            },
            onDragOver: function (e, source) {
                var droper = $.util.parseJquery(this), dnd = droper.data("dnd"), drager = dnd.drager,
                    droperRow = dnd.droperRow, dragerRow = dnd.dragerRow, mark = dnd.mark;
                if (droper.droppable("options").disabled) { return; }
                var pageY = source.pageY, top = droper.offset().top, height = top + droper.outerHeight();
                setDroppableStatus(drager, true);
                mark.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom");
                if (pageY > top + (height - top) / 2) {
                    mark.addClass("datagrid-header-cell-bottom");
                } else {
                    mark.addClass("datagrid-header-cell-top");
                }
                if (opts.onDragOver.call(target, droperRow, dragerRow) == false) {
                    setDroppableStatus(drager, false);
                    mark.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom");
                    droper.droppable("disable");
                }
            },
            onDragLeave: function (e, source) {
                var droper = $.util.parseJquery(this), dnd = droper.data("dnd"), drager = dnd.drager,
                    droperRow = dnd.droperRow, dragerRow = dnd.dragerRow, mark = dnd.mark;
                setDroppableStatus(drager, false);
                mark.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom");
                if ($.isFunction(opts.onDragLeave)) { opts.onDragLeave.call(target, droperRow, dragerRow); }
            },

            onDrop: function (e, source) {
                var droper = $.util.parseJquery(this), dnd = droper.data("dnd"),
                    droperIndex = dnd.droperIndex, dragerIndex = dnd.dragerIndex, mark = dnd.mark,
                    point = mark.hasClass("datagrid-header-cell-top") ? "top" : "bottom";
                t.datagrid("moveRow", { target: droperIndex, source: dragerIndex, point: point });
                mark.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom");
            }
        });
        opts.dndRow = true;
        function setDroppableStatus(source, state) {
            var icon = source.draggable("proxy").find("span.tree-dnd-icon");
            icon.removeClass("tree-dnd-yes tree-dnd-no").addClass(state ? "tree-dnd-yes" : "tree-dnd-no");
        };
    };

    var disableRowDnd = function (target) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options");
        t.datagrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").draggable("disable");
        opts.dndRow = false;
    };



    var getNextColumn = function (target, field) {
        var t = $.util.parseJquery(target),
            fields = $.array.merge([], t.datagrid("getColumnFields", true), t.datagrid("getColumnFields", false)),
            index = $.array.indexOf(fields, field);
        if (index == -1 || index + 1 >= fields.length) { return null; }
        return t.datagrid("getColumnOption", fields[index + 1]);
    };

    var getPrevColumn = function (target, field) {
        var t = $.util.parseJquery(target),
            fields = $.array.merge([], t.datagrid("getColumnFields", true), t.datagrid("getColumnFields", false)),
            index = $.array.indexOf(fields, field);
        if (index < 1) { return null; }
        return t.datagrid("getColumnOption", fields[index - 1]);
    };


    var moveColumn = function (target, param) {
        if (!param || !param.source || !param.target || param.source == param.target || !param.point) { return; };
        if (!$.array.contains(["before", "after"], param.point)) { param.point = "before"; }
        var t = $.util.parseJquery(target);
        if (t.datagrid("hasMuliRowHeader")) { return; }
        var opts = t.datagrid("options"), sourceFrozen, targetFrozen,
            fields = t.datagrid("getColumnFields"), frozenFields = t.datagrid("getColumnFields", true);
        if ($.array.contains(fields, param.source)) { sourceFrozen = false; }
        if (sourceFrozen == undefined && $.array.contains(frozenFields, param.source)) { sourceFrozen = true; }
        if ($.array.contains(fields, param.target)) { targetFrozen = false; }
        if (targetFrozen == undefined && $.array.contains(frozenFields, param.target)) { targetFrozen = true; }
        if (sourceFrozen == undefined || targetFrozen == undefined) { return; }
        if ($.isFunction(opts.onBeforeMoveColumn) && opts.onBeforeMoveColumn.call(target, param.source, param.target, param.point) == false) { return; }
        var panel = t.datagrid("getPanel"), view = panel.find("div.datagrid-view"),
            view1 = view.find("div.datagrid-view1"), view2 = view.find("div.datagrid-view2"),
            headerRow1 = view1.find("table.datagrid-htable tr.datagrid-header-row"),
            headerRow2 = view2.find("table.datagrid-htable tr.datagrid-header-row"),
            borderRow1 = view1.find("table.datagrid-btable tr.datagrid-row"),
            borderRow2 = view2.find("table.datagrid-btable tr.datagrid-row"),
            sourceHeaderTd = sourceFrozen ? headerRow1.find("td[field=" + param.source + "]") : headerRow2.find("td[field=" + param.source + "]"),
            targetHeaderTd = targetFrozen ? headerRow1.find("td[field=" + param.target + "]") : headerRow2.find("td[field=" + param.target + "]"),
            sourceRow = sourceFrozen ? borderRow1 : borderRow2,
            targetRow = targetFrozen ? borderRow1 : borderRow2;
        if (sourceRow.length != targetRow.length) { return; }
        targetHeaderTd[param.point](sourceHeaderTd);
        targetRow.each(function (i, n) {
            var targetBodyTd = $(this).find("td[field=" + param.target + "]"), sourceBodyTd = $(sourceRow[i]).find("td[field=" + param.source + "]");
            targetBodyTd[param.point](sourceBodyTd);
        });
        var sourceOpts = t.datagrid("getColumnOption", param.source), targetOpts = t.datagrid("getColumnOption", param.target),
            sourceColumns = sourceFrozen ? opts.frozenColumns[0] : opts.columns[0],
            targetColumns = targetFrozen ? opts.frozenColumns[0] : opts.columns[0],
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        $.array.remove(sourceColumns, sourceOpts);
        var index = $.array.indexOf(targetColumns, targetOpts);
        if (index > -1) { $.array.insert(targetColumns, param.point == "before" ? index : index + 1, sourceOpts); }
        t.datagrid("fixColumnSize");
        if (sourceFrozen) {
            if (!targetFrozen) {
                index = $.array.indexOf(exts.fields, param.target);
                $.array.insert(exts.fields, param.point == "before" ? index : index + 1, param.source);
                $.array.insert(exts.fieldOptions, param.point == "before" ? index : index + 1, sourceOpts);
                $.array.insert(exts.fieldOptionsBackup, param.point == "before" ? index : index + 1, $.extend({}, sourceOpts));
            }
        }
        if (!sourceFrozen) {
            index = $.array.indexOf(exts.fields, param.source);
            if (targetFrozen) {
                $.array.removeAt(exts.fields, index);
                $.array.removeAt(exts.fieldOptions, index);
                $.array.removeAt(exts.fieldOptionsBackup, index);
            } else {
                var fieldOpts = exts.fieldOptions[index], fieldOptsBak = exts.fieldOptionsBackup[index];
                $.array.removeAt(exts.fields, index);
                $.array.removeAt(exts.fieldOptions, index);
                $.array.removeAt(exts.fieldOptionsBackup, index);
                index = $.array.indexOf(exts.fields, param.target);
                $.array.insert(exts.fields, param.point == "before" ? index : index + 1, param.source);
                $.array.insert(exts.fieldOptions, param.point == "before" ? index : index + 1, fieldOpts);
                $.array.insert(exts.fieldOptionsBackup, param.point == "before" ? index : index + 1, fieldOptsBak);
            }
        }
        if ($.isFunction(opts.onMoveColumn)) { opts.onMoveColumn.call(target, param.source, param.target, param.point); }
    }

    var shiftColumn = function (target, param) {
        if (!param || !param.field || !param.point) { return; };
        if (!$.array.contains(["before", "after"], param.point)) { param.point = "before"; }
        var t = $.util.parseJquery(target), fields = t.datagrid("getColumnFields", "all"),
            index = $.array.indexOf(fields, param.field);
        if (index == -1 || (param.point == "before" && index == 0) || (param.point == "after" && index == fields.length - 1)) { return; }
        var target = fields[param.point == "before" ? index - 1 : index + 1];
        t.datagrid("moveColumn", { source: param.field, target: target, point: param.point });
    };


    var deleteColumn = function (target, field) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options"),
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        if ($.isFunction(opts.onBeforeDeleteColumn) && opts.onBeforeDeleteColumn.call(target, field) == false) { return; }
        removeField(opts, field, exts);
        t.datagrid("getColumnDom", { field: field, header: true }).remove();
        if ($.isFunction(opts.onDeleteColumn)) { opts.onDeleteColumn.call(target, field); }
    };

    var popColumn = function (target, field) {
        var t = $.util.parseJquery(target), colOpts = t.datagrid("getColumnOption", field);
        if (colOpts) { t.datagrid("deleteColumn", field); }
        return colOpts
    };

    var removeField = $.fn.datagrid.extensions.removeField = function (opts, field, exts) {
        var columns, frozen, i = -1, j = -1;
        if ($.array.likeArray(opts.frozenColumns)) {
            $.each(opts.frozenColumns, function (m, x) {
                if ($.array.likeArray(this)) {
                    $.each(this, function (n, y) {
                        if (y.field == field) { j = n; return false; }
                    });
                } else { if (x.field == field) { j = m; return false; } }
                if (j > -1) { i = m; return false; }
            });
            if (j > -1) { frozen = true; }
        }
        if (frozen == undefined && $.array.likeArray(opts.columns)) {
            $.each(opts.columns, function (m, x) {
                if ($.array.likeArray(this)) {
                    $.each(this, function (n, y) {
                        if (y.field == field) { j = n; return false; }
                    });
                } else { if (x.field == field) { j = m; return false; } }
                if (j > -1) { i = m; return false; }
            });
            if (j > -1) { frozen = false; }
        }
        if (j > -1) {
            columns = (frozen ? opts.frozenColumns : opts.columns);
            columns = i > -1 ? columns[i] : columns;
            $.array.removeAt(columns, j);
            index = $.array.indexOf(exts.fields, field);
            $.array.remove(exts.fields, field);
            $.array.removeAt(exts.fieldOptions, index);
            $.array.removeAt(exts.fieldOptionsBackup, index);
        }
    };






    var hasMuliRowHeader = function (target) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options");
        return (opts.columns && opts.columns.length > 1 && opts.columns[1].length > 0)
            || (opts.frozenColumns && opts.frozenColumns.length > 1 && opts.frozenColumns[1].length > 0);
    };

    var findRows = function (target, param) {
        var t = $.util.parseJquery(target), rows = t.datagrid("getRows"), ret;
        if ($.isFunction(param)) {
            ret = $.array.filter(rows, param);
        } else if ($.array.likeArray(param) && !$.util.isString(param)) {
            ret = $.array.map(param, function (val) { return findRow(target, val, t, rows); });
            ret = $.array.filter(ret, function (val) { return val != undefined && val != null; });
        } else {
            ret = [findRow(target, param, t, rows)];
        }
        return ret;
    };

    var findRow = function (target, param, grid, rows) {
        var t = grid || $.util.parseJquery(target), data = rows || t.datagrid("getRows"), opts = t.datagrid("options");
        return $.array.first(rows, $.isFunction(param) ? param : function (val) { return val[opts.idField] == param; });
    };

    var _deleteRow = $.fn.datagrid.methods.deleteRow;
    var deleteRow = function (target, param) {
        var t = $.util.parseJquery(target), isFunc = $.isFunction(param), index;
        if (isFunc) {
            var rows = t.datagrid("getRows"), row = $.array.first(rows, param);
            if (row) { _deleteRow.call(t, t, row); }
        } else {
            index = $.isNumeric(param) ? param : t.datagrid("getRowIndex", param);
            if ($.isNumeric(index) && index > -1) { _deleteRow.call(t, t, index); }
        }
    };

    var deleteRows = function (target, param) {
        var isArray = $.array.likeArray(param) && !$.util.isString(param);
        if (isArray) { $.each(param, function (index, val) { deleteRow(target, val); }); return; }
        if ($.isFunction(param)) {
            var t = $.util.parseJquery(target), rows = t.datagrid("getRows");
            $.each(rows, function (index, row) {
                if (param.call(this, this, index, rows) == true) {
                    var i = t.datagrid("getRowIndex", this);
                    _deleteRow.call(t, t, i);
                }
            });
        }
    };

    var setColumnTitle = function (target, param) {
        if (param && param.field && param.title) {
            var t = $.util.parseJquery(target), colOpts = t.datagrid("getColumnOption", param.field),
                field = param.field, title = param.title,
                panel = t.datagrid("getPanel"),
                td = panel.find("div.datagrid-view div.datagrid-header tr.datagrid-header-row td[field=" + field + "]");
            if (td.length) { td.find("div.datagrid-cell span:first").html(title); colOpts.title = title; }
        }
    };

    var setColumnWidth = function (target, param) {
        if (param && param.field && param.width && $.isNumeric(param.width)) {
            var state = $.data(target, "datagrid"),
                t = $.util.parseJquery(target),
                opts = t.datagrid("options"),
                colOpts = t.datagrid("getColumnOption", param.field),
                field = param.field, width = param.width,
                cell = t.datagrid("getPanel").find("div.datagrid-view div.datagrid-header tr.datagrid-header-row td[field=" + field + "] div.datagrid-cell");
            if (cell.length) {
                var diff = cell._outerWidth() - parseInt(cell[0].style.width);
                cell.css("height", "");
                colOpts.width = width;
                colOpts.boxWidth = width - diff;
                colOpts.auto = undefined;
                cell.width(colOpts.boxWidth);
                t.datagrid("fixColumnSize", field);
                t.datagrid("fitColumns");
                opts.onResizeColumn.call(target, field, width);
            }
        }
    };

    var sortGrid = function (target, options) {
        options = options || {};
        options = $.extend({ sortName: null, sortOrder: "asc" }, options);
        var t = $.util.parseJquery(target),
            state = $.data(target, "datagrid"),
            opts = t.datagrid("options"),
            col = t.datagrid("getColumnOption", options.sortName);
        if (!col || $.isEmptyObject(col) || !col.sortable || state.resizing) { return; }
        opts.sortName = options.sortName;
        opts.sortOrder = options.sortOrder;
        var cls = "datagrid-sort-" + opts.sortOrder;
        var cells = t.datagrid("getPanel").find(".datagrid-view .datagrid-header td div.datagrid-cell");
        var cell = t.datagrid("getPanel").find(".datagrid-view .datagrid-header td[field='" + options.sortName + "'] div.datagrid-cell");
        if (!cells.length || !cell.length) { return; }
        cells.removeClass("datagrid-sort-asc datagrid-sort-desc");
        cell.addClass(cls);
        if (opts.remoteSort) { t.datagrid("reload"); } else { var data = $.data(target, "datagrid").data; t.datagrid("loadData", data); }
        opts.onSortColumn.call(target, opts.sortName, opts.sortOrder);
    };

    $.fn.datagrid.extensions.parseOffset = function (offset) {
        var o = { enable: offset ? true : false };
        if (o.enable) { $.extend(o, offset); }
        o.width = $.isNumeric(o.width) ? o.width : 0;
        o.height = $.isNumeric(o.height) ? o.height : 0;
        return o;
    };
    var setOffset = function (target, offset) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options"),
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        opts.offset = exts.offset = $.fn.datagrid.extensions.parseOffset(offset);
        if (exts.offset && exts.offset.enable) {
            if (!$.isFunction(exts.offsetFunction)) {
                exts.offsetFunction = function () {
                    if (!exts.offset.enable) { return; }
                    var size = $.util.windowSize();
                    t.datagrid("resize", { width: size.width + exts.offset.width, height: size.height + exts.offset.height });
                };
                $(window).resize(exts.offsetFunction);
            }
            exts.offsetFunction();
        }
    };

    var getColumnDom = function (target, param) {
        if ($.string.isNullOrEmpty(param)) { return $(); }
        var t = $.util.parseJquery(target), panel = t.datagrid("getPanel"),
            isObject = !$.string.isString(param),
            field = isObject ? param.field : param,
            header = isObject ? param.header : false,
            dom = panel.find("div.datagrid-view tr.datagrid-row td[field=" + field + "]");
        if (header) { dom = dom.add(panel.find("div.datagrid-view tr.datagrid-header-row td[field=" + field + "]")); }
        return dom;
    };

    var getColumnData = function (target, field) {
        var t = $.util.parseJquery(target), rows = t.datagrid("getRows");
        return $.array.map(rows, function (val) { return val[field]; });
    };

    var getRowDom = function (target, index) {
        if (!$.isNumeric(index) || index < 0) { return $(); }
        var t = $.util.parseJquery(target), panel = t.datagrid("getPanel");
        return panel.find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row[datagrid-row-index=" + index + "]");
    };

    var getRowData = function (target, index) {
        if (!$.isNumeric(index) || index < 0) { return undefined; }
        var t = $.util.parseJquery(target), rows = t.datagrid("getRows");
        return rows[index];
    };

    var getCellDom = function (target, pos) {
        if (!pos || !pos.field || !$.isNumeric(pos.index) || pos.index < 0) { return $(); }
        var t = $.util.parseJquery(target), tr = t.datagrid("getRowDom", pos.index);
        return tr.find("td[field=" + pos.field + "] .datagrid-cell");
    };
    var getCellData = function (target, pos) {
        if (!pos || !pos.field || !$.isNumeric(pos.index) || pos.index < 0) { return; }
        var t = $.util.parseJquery(target), row = t.datagrid("getRowData", pos.index);
        return row[pos.field];
    };
    var getCellDisplay = function (target, pos) {
        var t = $.util.parseJquery(target), td = t.datagrid("getCellDom", pos);
        return td && td.length ? td.text() : undefined;
    };

    var _getColumnFields = $.fn.datagrid.methods.getColumnFields;
    var getColumnFields = function (target, frozen) {
        var t = $.util.parseJquery(target);
        if (frozen == null || frozen == undefined || $.util.isBoolean(frozen)) { return _getColumnFields.call(t, t, frozen); }
        if ($.util.isString(frozen)) {
            return $.array.merge([], _getColumnFields.call(t, t, true), _getColumnFields.call(t, t, false));
        }
    };

    var getDistinctRows = function (target, field) {
        var t = $.util.parseJquery(target), fields = t.datagrid("getColumnFields", "all");
        if (!$.array.contains(fields, field)) { return []; }
        var rows = t.datagrid("getRows"), data = $.array.clone(rows);
        $.array.distinct(data, function (a, b) { return a[field] == b[field]; });
        return data;
    };

    var getDistinctColumnData = function (target, field) {
        var t = $.util.parseJquery(target), fields = t.datagrid("getColumnFields", "all");
        if (!$.array.contains(fields, field)) { return []; }
        var data = t.datagrid("getColumnData", field);
        $.array.distinct(data, function (a, b) { return a == b; });
        return data;
    };

    var getColumns = function (target, frozen) {
        var t = $.util.parseJquery(target), fields = getColumnFields(target, frozen);
        return $.array.map(fields, function (val) { return t.datagrid("getColumnOption", val); });
    };

    var getHiddenColumns = function (target, frozen) {
        var cols = getColumns(target, frozen);
        return $.array.filter(cols, function (val) { return val.hidden ? true : false; });
    };

    var getVisibleColumns = function (target, frozen) {
        var cols = getColumns(target, frozen);
        return $.array.filter(cols, function (val) { return !val.hidden ? true : false; });
    };

    var getHiddenColumnFields = function (target, frozen) {
        var cols = getHiddenColumns(target, frozen);
        return $.array.map(cols, function (val) { return val.field; });
    };

    var getVisibleColumnFields = function (target, frozen) {
        var cols = getVisibleColumns(target, frozen);
        return $.array.map(cols, function (val) { return val.field; });
    };

    var showRow = function (target, param, grid, options, data, extensions, refreshable) {
        var t = grid || $.util.parseJquery(target), rows = data || t.datagrid("getRows"),
            row = $.isFunction(param) ? findRow(target, param, t, rows) : param, index = t.datagrid("getRowIndex", row),
            refreshable = (refreshable == null || refreshable == undefined || refreshable == true) ? true : false;
        if (index > -1) {
            var opts = options || t.datagrid("options"), rowData = t.datagrid("getRowData", index),
                exts = extensions || (opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {}));
            exts.filterData = $.isArray(exts.filterData) ? exts.filterData : exts.filterData = [];
            t.datagrid("getRowDom", index).show();
            $.array.remove(exts.filterData, rowData);
            if (refreshable) { refreshColumnFilterStatus(t, opts, exts, rows); }
        }
    };

    var hideRow = function (target, param, grid, options, data, extensions, refreshable) {
        var t = grid || $.util.parseJquery(target), rows = data || t.datagrid("getRows"),
            row = $.isFunction(param) ? findRow(target, param, t, rows) : param, index = t.datagrid("getRowIndex", row),
            refreshable = refreshable == null || refreshable == undefined || refreshable == true ? true : false;
        if (index > -1) {
            var opts = options || t.datagrid("options"), rowData = t.datagrid("getRowData", index),
                exts = extensions || (opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {}));
            exts.filterData = $.isArray(exts.filterData) ? exts.filterData : [];
            t.datagrid("unselectRow", index).datagrid("uncheckRow", index).datagrid("getRowDom", index).hide();
            $.array.attach(exts.filterData, rowData);
            if (refreshable) { refreshColumnFilterStatus(t, opts, exts, rows); }
        }
    };

    var showRows = function (target, param) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options"), rows = t.datagrid("getRows"), array,
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        if (param === true) {
            exts.filterData = [];
            var panel = t.datagrid("getPanel"), icons = panel.find("div.datagrid-header-filter-item-icon");
            panel.find(".datagrid-view .datagrid-body tr.datagrid-row").show();
            setItemIconCls(icons, "tree-checkbox1");
        } else if ($.isFunction(param)) {
            array = $.array.filter(rows, param);
        } else if ($.array.likeArray(param) && !$.util.isString(param)) {
            array = param;
        } else { array = [param]; }
        if (array) {
            $.each(array, function (index, val) { showRow(target, val, t, opts, rows, exts, false); });
            refreshColumnFilterStatus(t, opts, exts, rows);
        }
    };

    var hideRows = function (target, param) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options"), rows = t.datagrid("getRows"), array,
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        if (param === true) {
            t.datagrid("unselectAll").datagrid("uncheckAll");
            exts.filterData = $.array.clone(rows);
            var panel = t.datagrid("getPanel"), icons = panel.find("div.datagrid-header-filter-item-icon");
            panel.find(".datagrid-view .datagrid-body tr.datagrid-row").hide();
            setItemIconCls(icons, "tree-checkbox0");
        } else if ($.isFunction(param)) {
            array = $.array.filter(rows, param);
        } else if ($.array.likeArray(param) && !$.util.isString(param)) {
            array = param;
        } else { array = [param]; }
        if (array) {
            $.each(array, function (index, val) { hideRow(target, val, t, opts, rows, exts, false); });
            refreshColumnFilterStatus(t, opts, exts, rows);
        }
    };

    var getHiddenRows = function (target) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options"),
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        return exts.filterData;
    };

    var getVisibleRows = function (target) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options"), rows = t.datagrid("getRows"),
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {}),
            filterData = $.isArray(exts.filterData) ? exts.filterData : [];
        return $.array.filter(rows, function (val) { return $.array.contains(filterData, val) ? false : true; });
    };

    var setColumnFilter = function (target, columnFilter) {
        var t = $.util.parseJquery(target),
            opts = t.datagrid("options"), exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {}),
            panel = t.datagrid("getPanel"),
            selector = "div.datagrid-view div.datagrid-header tr.datagrid-header-row div.datagrid-header-filter-container";
        if (!columnFilter) {
            var headerFields = panel.find(selector),
                length = headerFields.length, i = 0;
            headerFields.slideUp("slow", function () {
                if (++i == length) {
                    clearHeaderColumnFilter(t, opts);
                    opts.columnFilter = columnFilter;
                }
            });
        } else {
            opts.columnFilter = columnFilter;
            initHeaderColumnFilterContainer(t, opts, exts);
            $.util.call(function () {
                panel.find(selector).hide().slideDown("slow");
            });
        }
    };

    var columnFilterSelect = function (target, param) {
        var t = $.util.parseJquery(target);
        if ($.util.isBoolean(param)) { t.datagrid(param ? "showRows" : "hideRows", true); return; }
        if (!param || !param.field) { return; }
        var field = param.field, value = param.value, isArray = $.array.likeArray(value) && !$.util.isString(value),
            finder = isArray ? function (val) { return $.array.contains(value, val[field]); } : function (val) { return value == val[field]; },
            rows = t.datagrid("findRows", finder);
        t.datagrid(param.selected ? "showRows" : "hideRows", rows);
    };




    var highlightColumn = function (target, field) {
        var t = $.util.parseJquery(target);
        var state = $.data(t[0], "datagrid"), opts = state.options;
        if (state.highlightField) {
            t.datagrid("getColumnDom", { field: state.highlightField, header: true }).removeClass("datagrid-row-over");
        }
        t.datagrid("getColumnDom", { field: field, header: true }).filter(function () {
            return !$(this).parent().hasClass("datagrid-row-selected");
        }).addClass("datagrid-row-over");
        state.highlightField = field;
    };

    var livesearch = function (target, param) {
        var t = $.util.parseJquery(target), panel = t.datagrid("getPanel"), cells, field, value = param, regular = false, ignoreCase = true, regexp;
        if ($.isPlainObject(param)) {
            value = param.value;
            field = param.field;
            regular = param.regular;
            ignoreCase = param.ignoreCase;
            cells = panel.find("div.datagrid-body tr.datagrid-row td[" + (field ? "field=" + field : "field") + "] div.datagrid-cell");
        } else {
            cells = panel.find("div.datagrid-body tr.datagrid-row td[field] div.datagrid-cell");
        }
        regexp = regular ? new RegExp(value, ignoreCase ? "gm" : "igm") : value;
        cells.each(function () {
            var cell = $(this);
            cell.find("span.datagrid-cell-hightlight").replaceWith(function () { return $(this).text(); });
            if (!value) { return; }
            var text = cell.html(); if (!text) { return; }
            cell.html($.string.replaceAll(text, value, "<span class='datagrid-cell-hightlight'>" + value + "</span>"));
        });
    };

    var exportGrid = function (target, isAll) {
        isAll = $.string.toBoolean(isAll);
        alert("导出" + (isAll ? "全部" : "当前页") + "数据");
    };

    /************************  initExtend Methods   End  ************************/


    var initColumnExtendProperty = $.fn.datagrid.extensions.initColumnExtendProperty = function (colOpts) {
        if (colOpts.tooltip == null || colOpts.tooltip == undefined) { colOpts.tooltip = false; }
        if (colOpts.filterable == null || colOpts.filterable == undefined || !$.util.isBoolean(colOpts.filterable)) { colOpts.filterable = true; }
        if (colOpts.hidable == null || colOpts.hidable == undefined || !$.util.isBoolean(colOpts.hidable)) { colOpts.hidable = true; }
        if (colOpts.filter == null || colOpts.filter == undefined || !$.util.isString(colOpts.filter)) { colOpts.filter = "checkbox"; }
        if (colOpts.precision == null || colOpts.precision == undefined || !$.isNumeric(colOpts.precision)) { colOpts.precision = 1; }
        if (colOpts.step == null || colOpts.step == undefined || !$.isNumeric(colOpts.step)) { colOpts.step = 1; }
    };

    var initColumnExtendProperties = $.fn.datagrid.extensions.initColumnExtendProperties = function (t, exts) {
        if (exts._initializedExtendProperties) { return; }
        var cols = t.datagrid("getColumns", "all");
        $.each(cols, function () { initColumnExtendProperty(this); });
        exts._initializedExtendProperties = true;
    };

    var initRowDndExtensions = $.fn.datagrid.extensions.initRowDndExtensions = function (t, opts) {
        opts = opts || t.datagrid("options");
        if (opts.dndRow) { t.datagrid("enableRowDnd"); }
    };


    /************************  initExtend ColumnFilter Begin  ************************/
    function initHeaderColumnFilterContainer(t, opts, exts) {
        exts = exts || (opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {}));
        initColumnExtendProperties(t, exts);
        var data = t.datagrid("getData"), oldData = exts.oldData;
        if (data != oldData) { exts.filterData = []; }
        clearHeaderColumnFilter(t, opts);
        if (!opts.columnFilter) { return; }
        exts.oldData = data;
        var header = t.datagrid("getPanel").find("div.datagrid-view div.datagrid-header"),
            headerRows = header.find("table.datagrid-htable tr.datagrid-header-row"),
            headerFields = headerRows.find("td[field]").filter(function () {
                var td = $(this), colspan = td.attr("colspan");
                return (!colspan || colspan == "1") && !td.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? true : false;
            }),
            columnFilter = opts.columnFilter = $.extend({ panelHeight: 100, position: "top" }, opts.columnFilter),
            position = $.array.contains(["top", "bottom"], columnFilter.position) ? columnFilter.position : "top",
            panelHeight = columnFilter.panelHeight = $.isNumeric(columnFilter.panelHeight) && columnFilter.panelHeight >= 60 ? columnFilter.panelHeight : 60,
            height = header.height(), rows = t.datagrid("getRows");
        headerFields.each(function () {
            var td = $(this).addClass("datagrid-header-filter").removeClass("datagrid-header-filter-top datagrid-header-filter-bottom"),
                cell = td.find("div.datagrid-cell").addClass("datagrid-header-filter-cell"),
                field = td.attr("field"), colOpts = t.datagrid("getColumnOption", field), colWidth = colOpts.width,
                line = $("<hr />").addClass("datagrid-header-filter-line")[position == "top" ? "prependTo" : "appendTo"](this),
                container = $("<div></div>").attr("field", field).addClass("datagrid-header-filter-container").css({
                    height: columnFilter.panelHeight, width: colWidth
                })[position == "top" ? "prependTo" : "appendTo"](this);
            td.addClass(position == "top" ? "datagrid-header-filter-top" : "datagrid-header-filter-bottom");
            if (field) { initColumnFilterField(t, opts, exts, container, colOpts, rows, headerFields); }
        });
        if (exts.filterData && exts.filterData.length) {
            t.datagrid("hideRows", exts.filterData);
        } else {
            refreshColumnFilterStatus(t, opts, exts, rows, headerFields);
        }
    };

    function clearHeaderColumnFilter(t, opts) {
        if (!opts.columnFilter) { return; }
        var headerFields = t.datagrid("getPanel").find("div.datagrid-view div.datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function () {
            var td = $(this), colspan = td.attr("colspan");
            return (!colspan || colspan == "1") && !td.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? true : false;
        });
        headerFields.removeClass("datagrid-header-filter datagrid-header-filter-top datagrid-header-filter-bottom").find("div.datagrid-cell").removeClass("datagrid-header-filter-cell");
        headerFields.find("hr.datagrid-header-filter-line,div.datagrid-header-filter-container").remove();
        var fields = t.datagrid("getColumnFields", "all");
        t.datagrid("fixColumnSize", fields[fields.length - 1]);
    };

    function initColumnFilterField(t, opts, exts, container, colOpts, rows, headerFields) {
        if (!colOpts.filterable) { return; }
        var field = colOpts.field, distinctVals = t.datagrid("getDistinctColumnData", field),
            filter = $.array.contains(["checkbox", "livebox", "caps", "lower", "none"], colOpts.filter) ? colOpts.filter : "checkbox",
            precision = colOpts.precision, step = colOpts.step;
        switch (filter) {
            case "checkbox": initColumnFilterFieldCheckBox(t, exts, container, field, rows, distinctVals); break;
            case "livebox": initColumnFilterFieldLiveBox(t, container, field, rows); break;
            case "caps":
                initColumnFilerFieldSlider(t, container, field, step, precision, rows, distinctVals, "<=", opts.columnFilter.panelHeight, headerFields);
                break;
            case "lower":
                initColumnFilerFieldSlider(t, container, field, step, precision, rows, distinctVals, ">=", opts.columnFilter.panelHeight, headerFields);
                break;
            case "none": break;
        }
    };

    function initColumnFilterFieldCheckBox(t, exts, container, field, rows, distinctVals) {
        $.each(distinctVals, function (index, text) {
            var item = $("<div></div>").addClass("datagrid-header-filter-item").attr("text", text).appendTo(container),
                itemText = $("<div></div>").addClass("datagrid-header-filter-item-text").text(text).appendTo(item),
                icon = $("<div></div>").addClass("datagrid-header-filter-item-icon").appendTo(item),
                handler = function () {
                    var filterRows = $.array.filter(rows, function (value) { return value[field] == text; }),
                        hiddenRows = $.array.filter(exts.filterData, function (value) { return value[field] == text; });
                    t.datagrid(hiddenRows.length ? "showRows" : "hideRows", filterRows);
                };
            item.click(handler);
        });
    };

    function initColumnFilterFieldLiveBox(t, container, field, rows) {
        $("<div></div>").addClass("datagrid-header-filter-livebox-text").text("模糊过滤：").appendTo(container);
        var input = $("<input />").addClass("datagrid-header-filter-livebox").appendTo(container);
        var btn = $("<a />").linkbutton({ plain: true, iconCls: "icon-search" }).appendTo(container).click(function () {
            t.datagrid("showRows", true);
            var val = input.val();
            if ($.string.isNullOrEmpty(val)) { input.focus(); return; }
            var filterRows = $.array.filter(rows, function (value) { return String(value[field]).indexOf(val) == -1; });
            t.datagrid("hideRows", filterRows);
            input.focus();
        });
        $("<a />").linkbutton({ plain: true, iconCls: "icon-undo" }).appendTo(container).click(function () {
            var val = input.val();
            if (val) { input.val("").focus(); btn.click(); } else { input.focus(); }
        });
        input.keypress(function (e) { if (e.which == 13) { btn.click(); } });
    };

    function initColumnFilerFieldSlider(t, container, field, step, precision, rows, distinctVals, type, panelHeight, headerFileds) {
        var array = $.array.map(distinctVals, function (val) { val = parseFloat(val); return $.isNumeric(val) ? val : 0; }),
            min = array.length ? $.array.min(array) : 0, max = array.length ? $.array.max(array) : 0,
            maxPrecisionVal = array.length ? $.array.max(array, function (a, b) {
                return $.util.compare($.number.precision(a), $.number.precision(b));
            }) : 0,
            maxPrecision = array.length ? $.number.precision(maxPrecisionVal) : 0,
            height = panelHeight - 45,
            itemWrap = $("<div></div>").addClass("datagrid-header-filter-itemwrap").text(type).appendTo(container),
            sliderWrap = $("<div></div>").addClass("datagrid-header-filter-sliderwrap").css({
                height: height + 10
            })[type == "<=" ? "appendTo" : "prependTo"](container),
            input = $("<input />").addClass("datagrid-header-filter-numeric").appendTo(itemWrap),
            slider = $("<input />").addClass("datagrid-header-filter-slider").appendTo(sliderWrap),
            handler = function (newValue, oldValue) {
                changeSliderValue(t, field, rows, newValue, type, input, slider, headerFileds);
            };
        input.numberbox({ value: type == "<=" ? max : min, min: min, max: max, precision: precision, onChange: handler });
        input.keypress(function (e) { if (e.which == 13) { var val = input.val(); input.numberbox("setValue", $.isNumeric(val) ? val : 0); } });
        slider.slider({
            height: height, mode: "v", showTip: true, value: type == "<=" ? max : min,
            min: min, max: max, rule: [min, "|", max], step: step, onSlideEnd: handler,
            tipFormatter: function (val) { return $.number.round(val || 0, maxPrecision); }
        });
    };

    function changeSliderValue(t, field, rows, value, type, input, slider, headerFileds) {
        var headerFields = headerFileds || t.datagrid("getPanel").find("div.datagrid-view div.datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function () {
            var td = $(this), colspan = td.attr("colspan");
            return (!colspan || colspan == "1") && !td.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? true : false;
        });
        var headerField = headerFields.filter(function () { return $(this).attr("field") == field; });
        input = input ? input : headerField.find(".datagrid-header-filter-numeric");
        slider = slider ? slider : headerField.find(".datagrid-header-filter-slider");
        var filterRows = $.array.filter(rows, function (val) {
            val = parseFloat(val[field]);
            val = $.isNumeric(val) ? val : 0;
            return type == ">=" ? (val < value) : (val > value);
        });
        t.datagrid("showRows", true).datagrid("hideRows", filterRows);
        input.numberbox("setValue", value);
        slider.slider("setValue", value);
    };



    function refreshColumnFilterStatus(t, opts, exts, rows, headerFields) {
        if (!opts.columnFilter) { return; }
        headerFields = headerFields || t.datagrid("getPanel").find("div.datagrid-view div.datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function () {
            var td = $(this), colspan = td.attr("colspan");
            return (!colspan || colspan == "1") && !td.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? true : false;
        });
        headerFields.each(function () {
            var td = $(this), field = td.attr("field");
            refreshColumnFilterCellStatus(t, exts, rows, td, field);
        });
    };

    function refreshColumnFilterCellStatus(t, exts, rows, td, field) {
        var colOpts = colOpts = t.datagrid("getColumnOption", field), precision = colOpts.precision,
            filter = $.array.contains(["checkbox", "livebox", "caps", "lower", "none"], colOpts.filter) ? colOpts.filter : "checkbox";
        switch (filter) {
            case "checkbox": refreshColumnFilterCheckbox(t, exts, rows, td, field); break;
            case "livebox": refreshColumnFilterLiveBox(t, exts, rows, td, field); break;
            case "caps": refreshColumnFilterCaps(t, exts, rows, td, field); break;
            case "lower": refreshColumnFilterLower(t, exts, rows, td, field); break;
            case "none": break;
        };
    };


    function refreshColumnFilterCheckbox(t, exts, rows, td, field) {
        td.find("div.datagrid-header-filter-item").each(function () {
            var item = $(this), text = item.attr("text"), icon = item.find("div.datagrid-header-filter-item-icon");
            var length = $.array.sum(rows, function (val) { return val[field] == text ? 1 : 0; }),
                hiddenLength = $.array.sum(exts.filterData, function (val) { return val[field] == text ? 1 : 0; }),
                iconCls = hiddenLength == 0 ? "tree-checkbox1" : (hiddenLength >= length ? "tree-checkbox0" : "tree-checkbox2");
            $.easyui.tooltip.init(item, { content: ($.string.isNullOrEmpty(text) ? "空白" : text) + ": 共" + length + "个元素" });
            setItemIconCls(icon, iconCls);
        });
    };
    function setItemIconCls(icon, iconCls) { icon.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2").addClass(iconCls); };

    //  当过滤器组件进行值筛选操作后，livebox 以及 slider 不更新，所以下面这三个方法未实现。
    function refreshColumnFilterLiveBox(t, exts, rows, td, field) { };
    function refreshColumnFilterCaps(t, exts, rows, td, field) { };
    function refreshColumnFilterLower(t, exts, rows, td, field) { };


    /************************  initExtend ColumnFilter   End  ************************/



    /************************  initExtend initContextMenu & initDblClickRow Begin  ************************/
    function initHeaderContextMenu(t, opts, exts) {
        exts.onHeaderContextMenuBak = opts.onHeaderContextMenu;
        opts.onHeaderContextMenu = function (e, field) {
            if ($.isFunction(exts.onHeaderContextMenuBak)) { exts.onHeaderContextMenuBak.apply(this, arguments); }
            if (!opts.enableHeaderContextMenu) { return; }
            var eventData = $.fn.datagrid.extensions.parseContextMenuEventData(t, opts, e),
                items = parseHeaderContextMenuItems(t, opts, exts, e, field, eventData);
            $.easyui.showMenu({ items: items, left: e.pageX, top: e.pageY, hideDisabledMenu: opts.hideDisabledMenu });
            e.preventDefault();
        };
    };

    function initRowContextMenu(t, opts, exts) {
        exts.onRowContextMenuBak = opts.onRowContextMenu;
        opts.onRowContextMenu = function (e, rowIndex, rowData) {
            if ($.isFunction(exts.onRowContextMenuBak)) { exts.onRowContextMenuBak.apply(this, arguments); }
            if (opts.selectOnRowContextMenu) { t.datagrid("selectRow", rowIndex); }
            if (!opts.enableRowContextMenu) { return; }
            var eventData = $.fn.datagrid.extensions.parseContextMenuEventData(t, opts, e),
                items = parseRowContextMenuItems(t, opts, exts, e, rowIndex, rowData, eventData);
            if (opts.autoBindDblClickRow && opts.dblClickRowMenuIndex >= 0 && $.util.likeArray(opts.rowContextMenu) && !$.util.isString(opts.rowContextMenu)
                && opts.rowContextMenu.length > opts.dblClickRowMenuIndex) {
                items[opts.dblClickRowMenuIndex].bold = true;
            }
            $.easyui.showMenu({ items: items, left: e.pageX, top: e.pageY, hideDisabledMenu: opts.hideDisabledMenu });
            e.preventDefault();
        };
    };

    function initHeaderClickMenu(t, opts, exts) {
        if (!opts.enableHeaderClickMenu) { return; }
        t.datagrid("getPanel").find(".datagrid-view .datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function () {
            var td = $(this), colspan = td.attr("colspan");
            return (!colspan || colspan == "1") && !td.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? true : false;
        }).find("div.datagrid-cell").each(function () { initHeaderCellClickMenu(t, opts, exts, this); });
    };

    function initHeaderCellClickMenu(t, opts, exts, cell) {
        cell = $.util.parseJquery(cell); cell.off(".hoverArrow");
        var arrow = $("<span class='s-btn-downarrow datagrid-header-cell-arrow'>&nbsp;</span>").click(function (e) {
            var span = $(this), offset = span.offset(), height = span.outerHeight(),
                    field = span.parent().parent().attr("field"),
                    eventData = $.fn.datagrid.extensions.parseContextMenuEventData(t, opts, e),
                    items = parseHeaderContextMenuItems(t, opts, exts, e, field, eventData);
            var mm = $.easyui.showMenu({ items: items, left: offset.left, top: offset.top + height }),
                    mmOpts = mm.menu("options"), onHide = mmOpts.onHide;
            arrow.hidable = false;
            mmOpts.onHide = function () {
                arrow.hidable = true;
                arrow.removeClass("datagrid-header-cell-arrow-show");
                onHide.apply(this, arguments);
            };
            return false;
        }).prependTo(cell);
        cell.on({
            "mouseenter.hoverArrow": function () { arrow.addClass("datagrid-header-cell-arrow-show"); },
            "mouseleave.hoverArrow": function () { if (!$.util.isBoolean(arrow.hidable) || arrow.hidable) { arrow.removeClass("datagrid-header-cell-arrow-show"); } }
        });
    };


    function initDblClickRowEvent(t, opts, exts) {
        exts.onDblClickRowBak = opts.onDblClickRow;
        opts.onDblClickRow = function (rowIndex, rowData) {
            if ($.isFunction(exts.onDblClickRowBak)) { exts.onDblClickRowBak.apply(this, arguments); }
            //  t.datagrid("selectRow", rowIndex);
            var eventData = $.fn.datagrid.extensions.parseContextMenuEventData(t, opts, null);
            items = parseRowContextMenuItems(t, opts, exts, null, rowIndex, rowData, eventData);
            if (opts.autoBindDblClickRow && opts.dblClickRowMenuIndex >= 0 && $.util.likeArray(opts.rowContextMenu)
                && !$.util.isString(opts.rowContextMenu) && opts.rowContextMenu.length > opts.dblClickRowMenuIndex) {
                var item = items[opts.dblClickRowMenuIndex], handler = item.handler || item.onclick;
                return handler(null, rowIndex, rowData, eventData, t, item, null);
            }
            if (opts.autoEditing) { t.datagrid("beginEdit", rowIndex); }
        };
    };


    function parseHeaderContextMenuItems(t, opts, exts, e, field, eventData) {
        var items = [], contextMenu = $.util.likeArray(opts.headerContextMenu) && !$.util.isString(opts.headerContextMenu) ? opts.headerContextMenu : [];
        if (contextMenu.length) { $.array.merge(items, contextMenu); }
        var baseItems = parseHeaderBaseContextMenuItems(t, opts, exts, e, field, eventData);
        if (baseItems.length) { $.array.merge(items, "-", baseItems); }
        items = $.fn.datagrid.extensions.parseHeaderContextMenuMap(e, field, eventData, items, t);
        if (items[0] == "-") { $.array.removeAt(items, 0); }
        return items;
    }

    function parseRowContextMenuItems(t, opts, exts, e, rowIndex, rowData, eventData) {
        var items = [], contextMenu = $.util.likeArray(opts.rowContextMenu) && !$.util.isString(opts.rowContextMenu) ? opts.rowContextMenu : [];
        if (contextMenu.length) { $.array.merge(items, contextMenu); }
        var baseItems = parseRowBaseContextMenuItems(t, opts, exts, e, rowIndex, rowData, eventData);
        if (baseItems.length) { $.array.merge(items, "-", baseItems); }
        items = $.fn.datagrid.extensions.parseRowContextMenuMap(e, rowIndex, rowData, eventData, items, t);
        if (items[0] == "-") { $.array.removeAt(items, 0); }
        return items;
    }



    function parseHeaderBaseContextMenuItems(t, opts, exts, e, field, eventData) {
        var mm = [], exp = opts.exportMenu,
            colOpts = t.datagrid("getColumnOption", field), sortable = t.datagrid("getColumnOption", field).sortable;
        if (typeof exp == "object") { exp = $.extend({ current: false, all: false, submenu: true }, exp); }
        var m1 = {
            text: "升序", iconCls: "icon-standard-hmenu-asc", disabled: sortable != true,
            handler: function () { return t.datagrid("sort", { sortName: field, sortOrder: "asc" }); }
        };
        var m2 = {
            text: "降序", iconCls: "icon-standard-hmenu-desc", disabled: sortable != true,
            handler: function () { return t.datagrid("sort", { sortName: field, sortOrder: "desc" }); }
        };
        var m3 = {
            text: "显示/隐藏列", iconCls: "icon-standard-application-view-columns", disabled: false, children: [
                {
                    text: "显示全部列", iconCls: function () {
                        var len = exts.fields ? exts.fields.length : 0;
                        var count = $.array.sum(exts.fieldOptions, function (val) { return val.hidden ? 0 : 1; });
                        return count >= len ? "tree-checkbox1" : (count == 0 ? "tree-checkbox0" : "tree-checkbox2");
                    }, hideOnClick: false, handler: function (e, field, eventData, t, item, menu) {
                        $.each(exts.fields, function () { t.datagrid("showColumn", this); });
                        $(this).parent().children("div.menu-item:not(:eq(1))").each(function () {
                            menu.menu("setIcon", { target: this, iconCls: "tree-checkbox1" });
                            menu.menu("enableItem", this);
                        });
                    }
                },
                {
                    text: "还原默认", iconCls: "icon-standard-application-view-tile", hideOnClick: false, handler: function (e, field, eventData, t, item, menu) {
                        $.each(exts.fieldOptionsBackup, function () { t.datagrid(this.hidden == true ? "hideColumn" : "showColumn", this.field); });
                        var mm = $(this).parent();
                        mm.children("div.menu-item:gt(1)").each(function () {
                            var title = $(this).text(), colOpts = $.array.first(exts.fieldOptions, function (val) { return val.title == title; });
                            if (colOpts) { menu.menu("setIcon", { target: this, iconCls: colOpts.hidden ? "tree-checkbox0" : "tree-checkbox1" }); }
                            menu.menu("enableItem", this);
                        });
                        mm.children("div.menu-item:first").each(function () {
                            var len = exts.fields ? exts.fields.length : 0;
                            var count = $.array.sum(exts.fieldOptions, function (val) { return val.hidden ? 0 : 1; });
                            menu.menu("setIcon", { target: this, iconCls: count >= len ? "tree-checkbox1" : (count == 0 ? "tree-checkbox0" : "tree-checkbox2") });
                        });
                    }
                },
                "-"
            ]
        };
        var m4 = { text: "过滤/显示", iconCls: "icon-standard-application-view-list", disabled: !colOpts.filterable, children: [] };
        var m5 = { text: "导出当前页", iconCls: "icon-standard-page-white-put", disabled: !(exp == true || exp.current == true), handler: function () { return t.datagrid("exportExcel", false); } };
        var m6 = { text: "导出全部", iconCls: "icon-standard-page-white-stack", disabled: !(exp == true || exp.all == true), handler: function () { return t.datagrid("exportExcel", true); } };
        $.util.merge(m3.children, parseHeaderColumnsShowHideMenu(t, opts, exts, e, field, eventData));
        if (colOpts.filterable) { $.util.merge(m4.children, parseHeaderRowsShowHideMenu(t, opts, exts, e, field, eventData)); }
        $.util.merge(mm, [m1, m2, "-", m3, m4]);
        var expMenu = [m5, m6];
        if (exp) { $.array.merge(mm, "-", typeof exp == "object" && !exp.submenu ? expMenu : { text: "导出数据", iconCls: "icon-standard-page-save", children: expMenu }); }
        return mm;
    };

    function parseHeaderColumnsShowHideMenu(t, opts, exts, e, field, eventData) {
        return $.array.map(exts.fieldOptions, function (val) {
            var handler = function (e, field, eventData, t, item, menu) {
                var m = $.util.parseJquery(this),
                    count = m.parent().find(".menu-item:gt(1) .tree-checkbox1").length;
                if ((count == 1 && !val.hidden) || !val.hidable) { return; }
                t.datagrid(val.hidden ? "showColumn" : "hideColumn", val.field);
                menu.menu("setIcon", { target: this, iconCls: val.hidden ? "tree-checkbox0" : "tree-checkbox1" });
                count = $.array.sum(exts.fieldOptions, function (val) { return val.hidden ? 0 : 1; });
                var len = exts.fields ? exts.fields.length : 0;
                menu.menu("setIcon", {
                    target: m.parent().children("div.menu-item:first"),
                    iconCls: count >= len ? "tree-checkbox1" : (count == 0 ? "tree-checkbox0" : "tree-checkbox2")
                });
                var mm = m.parent().find(".menu-item:gt(1)").filter(function () { return $(".tree-checkbox1", this).length ? true : false; });
                mm.each(function () { menu.menu(mm.length > 1 ? "enableItem" : "disableItem", this); });
            };
            return {
                text: val.title || val.field, iconCls: val.hidden ? "tree-checkbox0" : "tree-checkbox1", hideOnClick: false,
                disabled: !val.hidable ? true : false, handler: handler
            };
        });
    };

    function parseHeaderRowsShowHideMenu(t, opts, exts, e, field, eventData) {
        var rows = t.datagrid("getRows"), distinctVals = t.datagrid("getDistinctColumnData", field),
            mm = [
                {
                    text: "全部", hideOnClick: false,
                    iconCls: (!exts.filterData || !exts.filterData.length) ? "tree-checkbox1" : (exts.filterData.length >= rows.length ? "tree-checkbox0" : "tree-checkbox2"),
                    handler: function (e, field, eventData, t, item, menu) {
                        if (exts.filterData && exts.filterData.length) {
                            t.datagrid("showRows", true);
                        } else {
                            t.datagrid("hideRows", true);
                        }
                        $(this).parent().children("div.menu-item[hideOnClick=false]").each(function () {
                            menu.menu("setIcon", { target: this, iconCls: exts.filterData && exts.filterData.length ? "tree-checkbox0" : "tree-checkbox1" });
                        });
                    }
                }, "-"
            ];
        var hasMore = distinctVals.length >= 15, data = hasMore ? $.array.left(distinctVals, 10) : distinctVals;
        var items = $.array.map(data, function (val) {
            var filterRows = $.array.filter(rows, function (value) { return value[field] == val; }),
                filterLength = filterRows.length,
                hiddenLength = $.array.sum(exts.filterData, function (value) { return value[field] == val ? 1 : 0; }),
                iconCls = !hiddenLength ? "tree-checkbox1" : (hiddenLength >= filterLength ? "tree-checkbox0" : "tree-checkbox2");
            var handler = function (e, field, eventData, t, item, menu) {
                var hiddenLength = $.array.sum(exts.filterData, function (value) { return value[field] == val ? 1 : 0; });
                t.datagrid(hiddenLength ? "showRows" : "hideRows", filterRows);
                menu.menu("setIcon", { target: this, iconCls: hiddenLength ? "tree-checkbox1" : "tree-checkbox0" });
                $(this).parent().children("div.menu-item:first").each(function () {
                    menu.menu("setIcon", {
                        target: this,
                        iconCls: (!exts.filterData || !exts.filterData.length) ? "tree-checkbox1" : (exts.filterData.length >= rows.length ? "tree-checkbox0" : "tree-checkbox2")
                    });
                });
            };
            return { text: val, iconCls: iconCls, hideOnClick: false, handler: handler };
        });
        $.array.merge(mm, items);
        if (hasMore) {
            var colOpt = t.datagrid("getColumnOption", field), title = colOpt.title ? colOpt.title : colOpt.field, handler = function () {
                var checkAll = $("<input />").attr({ type: "button", value: "全部选择" }).click(function () {
                    t.datagrid("showRows", true);
                    $(this).parent().find(":checkbox").each(function () { this.checked = true; });
                })
                var uncheckAll = $("<input />").attr({ type: "button", value: "全部不选" }).click(function () {
                    t.datagrid("hideRows", true);
                    $(this).parent().find(":checkbox").each(function () { this.checked = false; });
                });
                $("<div></div>").append("<div>列：" + title + "，共" + distinctVals.length + "项</div><hr />").css({
                    padding: "10px"
                }).append(checkAll).append(uncheckAll).append("<hr />").each(function () {
                    var win = $(this), ul = $("<ul></ul>").css({ "list-style-type": "decimal", "padding-left": "40px", "line-height": "18px" }).appendTo(win);
                    $.each(distinctVals, function (index, text) {
                        var id = "itemCheckbox_" + $.util.guid("N"),
                            checked = !$.array.some(exts.filterData, function (val) { return val[field] == text; }),
                            itemWrap = $("<li></li>").appendTo(ul),
                            item = $("<input />").attr({ type: "checkbox", id: id, checked: checked }).appendTo(itemWrap),
                            itemText = $("<label></label>").attr("for", id).text(text).appendTo(itemWrap),
                            handler = function () {
                                var filterRows = $.array.filter(rows, function (val) { return val[field] == text; }),
                                    hiddenLength = $.array.sum(exts.filterData, function (val) { return val[field] == text ? 1 : 0; });
                                t.datagrid(hiddenLength ? "showRows" : "hideRows", filterRows);
                            };
                        item.click(handler);
                    });
                }).dialog({
                    title: "过滤/显示", iconCls: "icon-standard-application-view-detail", height: 260, width: 220, left: e.pageX, top: e.pageY,
                    collapsible: false, minimizable: false, maximizable: false, closable: true, modal: true, resizable: true,
                    onClose: function () { $.util.parseJquery(this).dialog("destroy"); }
                }).dialog("open");
            };
            $.array.merge(mm, ["-", { text: "处理更多(共" + distinctVals.length + "项)...", iconCls: "icon-standard-application-view-detail", handler: handler}]);
        }
        return mm;
    };



    function parseRowBaseContextMenuItems(t, opts, exts, e, rowIndex, rowData, eventData) {
        var mm = [], paging = opts.pagingMenu, move = opts.moveMenu, exp = opts.exportMenu;
        if (typeof paging == "object") { paging = $.extend({ disabled: false, submenu: true }, paging); }
        if (typeof move == "object") { move = $.extend({ up: false, down: false, submenu: true }, move); }
        if (typeof exp == "object") { exp = $.extend({ current: false, all: false, submenu: true }, exp); }
        var m1 = {
            text: "刷新当前页", iconCls: "pagination-load", disabled: !opts.refreshMenu,
            handler: function () { t.datagrid("reload"); }
        };
        var m2 = {
            text: "首页", iconCls: "pagination-first", disabled: function () { return !opts.pagination || eventData.page <= 1; },
            handler: function () { if (eventData.page > 1) { eventData.pager.pagination("select", 1); } }
        };
        var m3 = {
            text: "上一页", iconCls: "pagination-prev", disabled: function () { return !opts.pagination || eventData.page <= 1; },
            handler: function () { if (eventData.page > 1) { eventData.pager.pagination("select", eventData.page - 1); } }
        };
        var m4 = {
            text: "下一页", iconCls: "pagination-next", disabled: function () { return !opts.pagination || eventData.page >= eventData.pageCount; },
            handler: function () { if (eventData.page < eventData.pageCount) { eventData.pager.pagination("select", eventData.page + 1); } }
        };
        var m5 = {
            text: "末页", iconCls: "pagination-last", disabled: function () { return !opts.pagination || eventData.page >= eventData.pageCount; },
            handler: function () { if (eventData.page < eventData.pageCount) { eventData.pager.pagination("select", eventData.pageCount); } }
        };
        var m6 = { text: "移至最上", iconCls: "icon-standard-arrow-up", disabled: !(move == true || move.top == true), handler: function () { t.datagrid("moveRow", { source: rowIndex, target: 0, point: "top" }); } };
        var m7 = { text: "上移", iconCls: "icon-standard-up", disabled: !(move == true || move.up == true), handler: function () { t.datagrid("shiftRow", { point: "up", index: rowIndex }); } };
        var m8 = { text: "下移", iconCls: "icon-standard-down", disabled: !(move == true || move.down == true), handler: function () { t.datagrid("shiftRow", { point: "down", index: rowIndex }); } };
        var m9 = { text: "移至最下", iconCls: "icon-standard-arrow-down", disabled: !(move == true || move.bottom == true), handler: function () {
            var rows = t.datagrid("getRows");
            t.datagrid("moveRow", { source: rowIndex, target: rows.length - 1, point: "bottom" });
        }
        };
        var m10 = { text: "导出当前页", iconCls: "icon-standard-page-white-put", disabled: !(exp == true || exp.current == true), handler: function () { return t.datagrid("exportExcel", false); } };
        var m11 = { text: "导出全部", iconCls: "icon-standard-page-white-stack", disabled: !(exp == true || exp.all == true), handler: function () { return t.datagrid("exportExcel", true); } };
        mm.push(m1);
        var pagingMenu = [m2, m3, m4, m5], moveMenu = [m6, m7, "-", m8, m9], expMenu = [m10, m11];
        if (paging) { $.array.merge(mm, "-", typeof paging == "object" && !paging.submenu ? pagingMenu : { text: "翻页", iconCls: "", disabled: !(paging == true || !paging.disabled), children: pagingMenu }); }
        if (move) { $.array.merge(mm, "-", typeof move == "object" && !move.submenu ? moveMenu : { text: "上/下移动", iconCls: "", disabled: !move, children: moveMenu }); }
        if (exp) { $.array.merge(mm, "-", typeof exp == "object" && !exp.submenu ? expMenu : { text: "导出数据", iconCls: "icon-standard-page-save", disabled: !exp, children: expMenu }); }
        return mm;
    };


    $.fn.datagrid.extensions.parseHeaderContextMenuMap = function (e, field, eventData, contextMenu, t) {
        return $.array.map(contextMenu, function (value, index) {
            if (!value || $.util.isString(value)) { return value; }
            var ret = $.extend({}, value);
            ret.id = $.isFunction(value.id) ? value.id.call(ret, e, field, eventData, t) : value.id;
            ret.text = $.isFunction(value.text) ? value.text.call(ret, e, field, eventData, t) : value.text;
            ret.iconCls = $.isFunction(value.iconCls) ? value.iconCls.call(ret, e, field, eventData, t) : value.iconCls;
            ret.disabled = $.isFunction(value.disabled) ? value.disabled.call(ret, e, field, eventData, t) : value.disabled;
            ret.hideOnClick = $.isFunction(value.hideOnClick) ? value.hideOnClick.call(ret, e, field, eventData, t) : value.hideOnClick;
            ret.onclick = $.isFunction(value.onclick) ? function (e, item, menu) { value.onclick.call(this, e, field, eventData, t, item, menu); } : value.onclick;
            ret.handler = $.isFunction(value.handler) ? function (e, item, menu) { value.handler.call(this, e, field, eventData, t, item, menu); } : value.handler;
            if (ret.children && ret.children.length) { ret.children = $.fn.datagrid.extensions.parseHeaderContextMenuMap(e, field, eventData, ret.children, t); }
            return ret;
        });
    };

    $.fn.datagrid.extensions.parseRowContextMenuMap = function (e, rowIndex, rowData, eventData, contextMenu, t) {
        return $.array.map(contextMenu, function (value, index) {
            if (!value || $.util.isString(value)) { return value; }
            var ret = $.extend({}, value);
            ret.id = $.isFunction(value.id) ? value.id.call(ret, e, rowIndex, rowData, eventData, t) : value.id;
            ret.text = $.isFunction(value.text) ? value.text.call(ret, e, rowIndex, rowData, eventData, t) : value.text;
            ret.iconCls = $.isFunction(value.iconCls) ? value.iconCls.call(ret, e, rowIndex, rowData, eventData, t) : value.iconCls;
            ret.disabled = $.isFunction(value.disabled) ? value.disabled.call(ret, e, rowIndex, rowData, eventData, t) : value.disabled;
            ret.hideOnClick = $.isFunction(value.hideOnClick) ? value.hideOnClick.call(ret, e, rowIndex, rowData, eventData, t) : value.hideOnClick;
            ret.onclick = $.isFunction(value.onclick) ? function (e, item, menu) { value.onclick.call(this, e, rowIndex, rowData, eventData, t, item, menu); } : value.onclick;
            ret.handler = $.isFunction(value.handler) ? function (e, item, menu) { value.handler.call(this, e, rowIndex, rowData, eventData, t, item, menu); } : value.handler;
            if (ret.children && ret.children.length) { ret.children = $.fn.datagrid.extensions.parseRowContextMenuMap(e, rowIndex, rowData, eventData, ret.children, t); }
            return ret;
        });
    };


    $.fn.datagrid.extensions.parseContextMenuEventData = function (t, opts, e) {
        var queryParams = $.fn.datagrid.extensions.parseRemoteQueryParams(opts);
        var pagingParams = $.fn.datagrid.extensions.parsePaginationParams(t, opts);
        return $.extend({}, queryParams, pagingParams, { e: e, grid: t });
    };

    $.fn.datagrid.extensions.parsePaginationParams = function (t, opts) {
        var ret = {};
        if (opts.pagination) {
					try{
            var pager = t.datagrid("getPager");
            var pagerOptions = pager.pagination("options");
            var total = pagerOptions.total;
            var pageCount = Math.ceil(parseFloat(total) / parseFloat(pagerOptions.pageSize));
            $.extend(ret, { pager: pager, total: total, pageCount: pageCount });
					}catch(e){}
        }
        return ret;
    };

    $.fn.datagrid.extensions.parseRemoteQueryParams = function (opts) {
        var ret = $.extend({}, opts.queryParams);
        if (opts.pagination) { $.extend(ret, { page: opts.pageNumber, rows: opts.pageSize }); }
        if (opts.sortName) { $.extend(ret, { sort: opts.sortName, order: opts.sortOrder }); }
        ret = $.fn.datagrid.extensions.parsePagingQueryParams(opts, ret);
        return ret;
    };
    /************************  initExtend initContextMenu & initDblClickRow   End  ************************/



    /************************  initExtend initColumnTooltip Begin  ************************/
    var initColumnTooltip = function (t, opts) {
        var rows = t.datagrid("getRows");
        t.datagrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").each(function () {
            var tr = $(this), index = parseInt(tr.attr("datagrid-row-index")), row = rows[index];
            initColumnRowTooltip(t, opts, index, row, tr);
        });
    };

    var initColumnRowTooltip = function (t, opts, index, row, tr) {
        tr = tr || t.datagrid("getRowDom", index);
        if (opts.rowTooltip) {
            var onShow = function (e) {
                var tt = $(this), text = $.isFunction(opts.rowTooltip) ? opts.rowTooltip.call(tr, index, row) : buildText(row);
                tt.tooltip("update", text);
            };
            tr.each(function () { $.easyui.tooltip.init(this, { onShow: onShow }); });
        } else {
            tr.children("td[field]").each(function () {
                var td = $(this), field = td.attr("field"), colOpts = t.datagrid("getColumnOption", field);
                if (!colOpts || !colOpts.tooltip) { return; }
                var cell = td.find("div.datagrid-cell"), onShow = function (e) {
                    var tt = $(this), text = $.isFunction(colOpts.tooltip) ? colOpts.tooltip.call(cell, row[field], index, row) : row[field];
                    tt.tooltip("update", text);
                };
                $.easyui.tooltip.init(cell, { onShow: onShow });
            });
        }
        function buildText(row) {
            var cols = t.datagrid("getColumns", "all"), content = $("<table></table>").css({ padding: "5px" }); ;
            $.each(cols, function (i, colOpts) {
                if (!colOpts || !colOpts.field || !colOpts.title) { return; }
                var msg = t.datagrid("getCellDisplay", { field: colOpts.field, index: index });
                content.append("<tr><td style='text-align: right; width: 150px;'>" + colOpts.title + ":</td><td style='width: 250px;'>" + msg + "</td></tr>");
            });
            return content;
        };
    };


    /************************  initExtend initColumnTooltip   End  ************************/
    var initializeRowExtEditor = function (t, opts, index) {
        if (!opts.extEditing) { return; }
        var tr = t.datagrid("getRowDom", index);
        if (!tr.length) { return; }
        var view = t.datagrid("getPanel").find("div.datagrid-view"),
            view1 = view.find("div.datagrid-view1"),
            view2 = view.find("div.datagrid-view2"),
            body = view2.find("div.datagrid-body"),
            width = view1.outerWidth(), pos = view.position(),
            left = diff > 0 ? diff : 0;
        body.css("position", "relative");
        var height = tr.outerHeight(),
            top = tr.position().top + height + body.scrollTop() - view2.find("div.datagrid-header").outerHeight();
        var p = $("<div></div>").addClass("dialog-button datagrid-rowediting-panel").appendTo(body).css("top", top).attr("datagrid-row-index", index);
        $("<a></a>").linkbutton({ plain: false, iconCls: "icon-ok", text: "保存" }).appendTo(p).click(function () { t.datagrid("endEdit", index); });
        $("<a></a>").linkbutton({ plain: false, iconCls: "icon-cancel", text: "取消" }).appendTo(p).click(function () { t.datagrid("cancelEdit", index); });
        var diff = (opts.width - p.outerWidth()) / 2 - width, left = diff > 0 ? diff : 0;
        p.css("left", left);
    };

    var removeRowExtEditor = function (t, body, index) {
        body = body || t.datagrid("getPanel").find("div.datagrid-view div.datagrid-view2 div.datagrid-body");
        body.find("div.datagrid-rowediting-panel[datagrid-row-index=" + index + "]").remove();
    };

    var disposeRowExtEditor = function (t, opts, index) {
        if (!opts.extEditing) { return; }
        body = t.datagrid("getPanel").find("div.datagrid-view div.datagrid-view2 div.datagrid-body");
        removeRowExtEditor(t, body, index);
    };

    var initSingleEditing = function (t, opts, index) {
        var exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        if (opts.singleEditing) { t.datagrid("endEdit", exts.lastEditingIndex); }
        exts.lastEditingIndex = index;
    };
    /************************  initExtend ExtEditor Begin  ************************/


    /************************  initExtend ExtEditor   End  ************************/




    /************************  initExtend Base Begin  ************************/
    var initExtensions = $.fn.datagrid.extensions.initExtensions = function (t, opts) {
        var exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        if (exts._initialized) { return; }

        var fields = t.datagrid("getColumnFields", false);
        exts.fields = $.array.filter(fields, function (val) { return t.datagrid("getColumnOption", val).title ? true : false; });
        exts.fieldOptions = $.array.map(exts.fields, function (val) { return t.datagrid("getColumnOption", val); });
        exts.fieldOptionsBackup = $.array.map(exts.fieldOptions, function (val) { return $.extend({}, val); });
        exts.filterData = [];

        initColumnExtensions();
        initOffset();
        initContextMenu();
        initDblClickRow();
        function initColumnExtensions() { initColumnExtendProperties(t, exts); };
        function initOffset() { t.datagrid("setOffset", opts.offset); };
        function initContextMenu() { initHeaderContextMenu(t, opts, exts); initRowContextMenu(t, opts, exts); initHeaderClickMenu(t, opts, exts); };
        function initDblClickRow() { initDblClickRowEvent(t, opts, exts); };

        var rows = t.datagrid("getRows");
        if (!rows || !rows.length) { initHeaderColumnFilterContainer(t, opts, exts); }

        exts._initialized = true;
    };

    $.fn.datagrid.extensions.parseOrderbyParams = function (sortName, sortOrder) {
        sortName = $.string.isNullOrWhiteSpace(sortName) ? "" : $.trim(sortName);
        sortOrder = $.string.isNullOrWhiteSpace(sortOrder) ? "" : $.trim(sortOrder);
        sortOrder = sortOrder.toLowerCase();
        if (sortOrder != "asc" && sortOrder != "desc") { sortOrder = "asc"; }
        return $.trim(sortName + " " + sortOrder);
    };

    $.fn.datagrid.extensions.parsePagingQueryParams = function (opts, param) {
        var ret = $.util.parseMapFunction(param);
        if (opts.pagination) {
            ret.pageNumber = ret.page;
            ret.pageSize = ret.rows;
            ret.pageIndex = ret.pageNumber - 1;
        }
        ret.orderby = $.fn.datagrid.extensions.parseOrderbyParams(ret.sort, ret.order);
        return ret;
    };

    var clearFilterData = $.fn.datagrid.extensions.clearFilterData = function (opts) {
        var exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        exts.filterData = [];
    };

    var loader = $.fn.datagrid.extensions.loader = function (param, success, error) {
        var t = $.util.parseJquery(this), opts = t.datagrid("options");
        initExtensions(t, opts);
        if (!opts.url) { return false; }
        param = $.fn.datagrid.extensions.parsePagingQueryParams(opts, param);
        $.ajax({
            type: opts.method, url: opts.url, data: param, dataType: "json",
            success: function (data) { clearFilterData(opts); success(data); },
            error: function () { error.apply(this, arguments); }
        });
    };

    var loadFilter = function (data) {
        return data ? ($.isArray(data) ? { total: data.length, rows: data} : data) : { total: 0, rows: [] };
    };

    var _onLoadSuccess = $.fn.datagrid.defaults.onLoadSuccess;
    var onLoadSuccess = $.fn.datagrid.extensions.onLoadSuccess = function (data) {
        if ($.isFunction(_onLoadSuccess)) { _onLoadSuccess.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.datagrid("options"),
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        initHeaderColumnFilterContainer(t, opts, exts);
        initRowDndExtensions(t, opts);
        initColumnTooltip(t, opts);
    };

    var _onResizeColumn = $.fn.datagrid.defaults.onResizeColumn;
    var onResizeColumn = $.fn.datagrid.extensions.onResizeColumn = function (field, width) {
        if ($.isFunction(_onResizeColumn)) { _onResizeColumn.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.datagrid("options");
        if (opts.columnFilter) {
            var panel = t.datagrid("getPanel"), colOpts = t.datagrid("getColumnOption", field),
                container = panel.find("div.datagrid-header-filter-container[field=" + field + "]");
            container.width(colOpts.width);
        }
    };

    var _onBeforeEdit = $.fn.datagrid.defaults.onBeforeEdit;
    var onBeforeEdit = $.fn.datagrid.extensions.onBeforeEdit = function (index, row) {
        if ($.isFunction(_onBeforeEdit)) { _onBeforeEdit.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.datagrid("options");
        initializeRowExtEditor(t, opts, index);
        initSingleEditing(t, opts, index);
        t.datagrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").draggable("disable");
    }

    var _onAfterEdit = $.fn.datagrid.defaults.onAfterEdit;
    var onAfterEdit = $.fn.datagrid.extensions.onAfterEdit = function (index, row, changes) {
        if ($.isFunction(_onAfterEdit)) { _onAfterEdit.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.datagrid("options"),
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        disposeRowExtEditor(t, opts, index);
        initHeaderColumnFilterContainer(t, opts, exts);
        initRowDndExtensions(t, opts);
        initColumnRowTooltip(t, opts, index, row);
    }

    var _onCancelEdit = $.fn.datagrid.defaults.onCancelEdit;
    var onCancelEdit = $.fn.datagrid.extensions.onCancelEdit = function (index, row) {
        if ($.isFunction(_onCancelEdit)) { _onCancelEdit.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.datagrid("options");
        disposeRowExtEditor(t, opts, index);
        initRowDndExtensions(t, opts);
        initColumnRowTooltip(t, opts, index, row);
    };


    /************************  initExtend Base   End  ************************/





    var methods = $.fn.datagrid.extensions.methods = {

        //  覆盖 easyui-datagrid 的原生方法，以支持相应属性、事件和扩展功能；
        updateRow: function (jq, param) { return jq.each(function () { updateRow(this, param); }); },

        //  覆盖 easyui-datagrid 的原生方法，以支持相应属性、事件和扩展功能；
        appendRow: function (jq, row) { return jq.each(function () { appendRow(this, row); }); },

        //  覆盖 easyui-datagrid 的原生方法，以支持相应属性、事件和扩展功能；
        insertRow: function (jq, param) { return jq.each(function () { insertRow(this, param); }); },

        //  扩展 easyui-datagrid 的自定义方法；判断指定的 data-row(数据行) 是否被 check；该方法的参数 index 表示要判断的行的索引号，从 0 开始计数；
        //  返回值：如果参数 index 所表示的 data-row(数据行) 被 check，则返回 true，否则返回 false。
        isChecked: function (jq, index) { return isChecked(jq[0], index); },

        //  扩展 easyui-datagrid 的自定义方法；判断指定的 data-row(数据行) 是否被 select；该方法的参数 index 表示要判断的行的索引号，从 0 开始计数；
        //  返回值：如果参数 index 所表示的 data-row(数据行) 被 select，则返回 true，否则返回 false。
        isSelected: function (jq, index) { return isSelected(jq[0], index); },

        //  扩展 easyui-datagrid 的自定义方法；冻结指定的列；该方法的参数 field 表示要冻结的列的 field 值。
        //  返回值：返回表示当前 easyui-datagrid 的 jQuery 链式对象。
        //  注意：此方法在多行表头情况下无效。
        //      当前表格在执行此方法前必须存在至少一个冻结列，否则此方法无效；
        freezeColumn: function (jq, field) { return jq.each(function () { freezeColumn(this, field); }); },

        //  扩展 easyui-datagrid 的自定义方法；取消冻结指定的列；该方法的参数 field 表示要取消冻结的列的 field 值。
        //  返回值：返回表示当前 easyui-datagrid 的 jQuery 链式对象。
        //  注意：此方法在多行表头情况下无效。
        //      当前表格在执行此方法前必须存在至少一个非冻结列，否则此方法无效；
        unfreezeColumn: function (jq, field) { return jq.each(function () { unfreezeColumn(this, field); }); },

        //  扩展 easyui-datagrid 的自定义方法；移动 easyui-datagrid 中的指定 data-row(数据行) ；该方法的参数 param 为 JSON-Object 类型，包含如下属性定义：
        //      target: 表示目标位置的 data-row(数据行) 索引号(从 0 开始计数)；
        //      source: 表示要移动的 data-row(数据行) 索引号(从 0 开始计数)；
        //      point:  表示移动到目标节点 target 的位置，String 类型，可能的值包括：
        //          "top":      表示移动到目标位置 target 的上一格位置；
        //          "bottom":   表示追加为目标位置 target 的下一格位置；
        //  返回值：返回表示当前 easyui-datagrid 的 jQuery 链式对象。
        //  备注：该方法会触发移动行数据的相应事件；
        moveRow: function (jq, param) { return jq.each(function () { moveRow(this, param); }); },

        //  扩展 easyui-datagrid 的自定义方法；移动 easyui-datagrid 中的指定 data-row(数据行) 一行位置；该方法的参数 param 为 JSON-Object 类型，包含如下属性定义：
        //      index: 表示要移动的 data-row(数据行) 索引号(从 0 开始计数)；
        //      point:  表示移动到目标节点 target 的位置，String 类型，可能的值包括：
        //          "up":      表示移动到目标位置 target 的上一格位置；
        //          "down":   表示追加为目标位置 target 的下一格位置；
        //  返回值：返回表示当前 easyui-datagrid 的 jQuery 链式对象。
        //  备注：该方法会触发移动行数据的相应事件；
        shiftRow: function (jq, param) { return jq.each(function () { shiftRow(this, param); }); },

        //  扩展 easyui-datagrid 的自定义方法；获取指定行的下一行数据；该方法的参数 index 表示指定行的行号(从 0 开始)；
        //  返回值：返回指定行的下一行数据，返回值是一个 JSON-Object 对象；
        //      如果指定的行没有下一行数据 (例如该行为最后一行的情况下)，则返回 null。
        nextRow: function (jq, index) { return getNextRow(jq[0], index); },

        //  扩展 easyui-datagrid 的自定义方法；获取指定行的上一行数据；该方法的参数 index 表示指定行的行号(从 0 开始)；
        //  返回值：返回指定行的上一行数据，返回值是一个 JSON-Object 对象；
        //      如果指定的行没有上一行数据 (例如该行为第一行的情况下)，则返回 null。
        prevRow: function (jq, index) { return getPrevRow(jq[0], index); },

        //  扩展 easyui-datagrid 的自定义方法；从 easyui-datagrid 当前页中删除指定的行，并返回该行数据；
        //  该方法的参数 index 表示指定行的行号(从 0 开始)；
        //  返回值：返回 index 所表示的行的数据，返回值是一个 JSON-Object 对象；
        //      如果不存在指定的行(例如 easyui-datagrid 当前页没有数据或者 index 超出范围)，则返回 null。
        popRow: function (jq, index) { return popRow(jq[0], index); },


        //  扩展 easyui-datagrid 的自定义方法；启用当前表格的行拖动功能；该方法无参数；
        //  返回值：返回表示当前 easyui-datagrid 的 jQuery 链式对象。
        enableRowDnd: function (jq) { return jq.each(function () { enableRowDnd(this); }); },

        //  扩展 easyui-datagrid 的自定义方法；禁用当前表格的行拖动功能；该方法无参数；
        //  返回值：返回表示当前 easyui-datagrid 的 jQuery 链式对象。
        disableRowDnd: function (jq) { return jq.each(function () { disableRowDnd(this); }); },

        //  扩展 easyui-datagrid 的自定义方法；移动指定的列到另一位置；该方法的参数 param 为一个 JSON-Object，定义包含如下属性：
        //      target: 表示目标位置列的 field 值；
        //      source: 表示要移动的列的 field 值；
        //      point:  表示移动到目标列的位置，String 类型，可选的值包括：
        //          before: 表示将 source 列移动至 target 列的左侧；
        //          after:  表示将 source 列移动值 target 列的右侧；
        //  返回值：返回表示当前 easyui-datagrid 的 jQuery 链式对象。
        //  注意：此方法在多行表头情况下无效。
        moveColumn: function (jq, param) { return jq.each(function () { moveColumn(this, param); }); },

        //  扩展 easyui-datagrid 的自定义方法；移动指定的列挪动一格位置；该方法的参数 param 为一个 JSON-Object，定义包含如下属性：
        //      field:  表示要挪动的列的 field 值；
        //      porint: 表示挪动 field 列的方式，String 类型，可选的值包括：
        //          before: 表示将该列向左挪动一格；
        //          after:  表示将该列向右挪动一格；
        //  返回值：返回表示当前 easyui-datagrid 的 jQuery 链式对象。
        //  注意：此方法在多行表头情况下无效。
        shiftColumn: function (jq, param) { return jq.each(function () { shiftColumn(this, param); }); },

        //  扩展 easyui-datagrid 的自定义方法；获取指定列的下一格位置列的 列属性(columnOption) 信息；该方法的参数 field 表示指定列的 field 值。
        //  返回值：当前指定列的下一格位置的列的 列属性(columnOption) 信息。
        //      如果不存在指定的列，或者指定列的下一格位置没有其他列，则返回 null。
        nextColumn: function (jq, field) { return getNextColumn(jq[0], field); },

        //  扩展 easyui-datagrid 的自定义方法；获取指定列的上一格位置列的 列属性(columnOption) 信息；该方法的参数 field 表示指定列的 field 值。
        //  返回值：当前指定列的上一格位置的列的 列属性(columnOption) 信息。
        //      如果不存在指定的列，或者指定列的上一格位置没有其他列，则返回 null。
        prevColumn: function (jq, field) { return getPrevColumn(jq[0], field); },

        //  扩展 easyui-datagrid 的自定义方法；删除指定的列；该方法的参数 field 表示要删除的列的 field 值；
        //  返回值：返回表示当前 easyui-datagrid 的 jQuery 链式对象。
        deleteColumn: function (jq, field) { return jq.each(function () { deleteColumn(this, field); }); },

        //  扩展 easyui-datagrid 的自定义方法；删除指定的列并返回该列的 ColumnOption 值；该方法的参数 field 表示要删除的列的 field 值；
        //  返回值：返回参数 field 值所表示的列的 ColumnOption 值。如果当前 easyui-datagrid 不存在该列，则返回 null。
        popColumn: function (jq, field) { return popColumn(jq[0], param); },


        //  获取 easyui-datagrid 中当前页指定列的 DOM-jQuery 元素对象；该函数定义如下参数：
        //      param: 该参数可以定位以下类型：
        //          String 类型：表示要获取的 DOM-jQuery 元素所在的列的 field 名；
        //          JSON-Object 类型：如果定义为该类型，则该参数定义如下属性：
        //              field:  表示要获取的 DOM-jQuery 元素所在的列的 field 名；
        //              header: Boolean 类型值，默认为 false，表示返回的 DOM-jQuery 对象中是否包含 field 表示的列的表头；
        //  返回值：如果当前页存在 field 值指定的列，则返回该列中指定行的 DOM-jQuery 对象，该对象中包含的 DOM 节点级别为一个 td[field=field] 对象；
        //          否则返回一个空的 jQuery 对象。
        //          如果 param 参数定义为 JSON-Object 类型，且 param.header = true，则返回的 DOM-jQuery 对象中将会包含列的表头元素；
        //          如果 param 参数定义为 String 类型或者即使定义为 JSON-Object 类型但 param.header = false，则返回的 DOM-jQuery 对象中不包含列的表头元素。
        getColumnDom: function (jq, param) { return getColumnDom(jq[0], param); },

        //  获取 easyui-datagrid 中当前也指定列所有行的单元格数据所构成的一个数组；该函数定义如下参数：
        //      field: 要获取的数据的列的 field 名；
        //  返回值：返回一个数组，数组中每一个元素都是其数据行的该列的值，数组的长度等于 grid.datagrid("getRows") 的长度；
        //          如果传入的列名不存在，则返回数组的长度同样等于 grid.datagrid("getRows") 的长度，只是每个元素的值都为 undefined.
        getColumnData: function (jq, field) { return getColumnData(jq[0], field); },

        //  获取 easyui-datagrid 中当前页指定行的 DOM-jQuery 对象元素集合；该函数定义如下参数：
        //      index: 表示要获取的 DOM-Jquery 对象元素集合所在当前页的行索引号；
        //  返回值：如果当前页存在 index 指示的行，则返回该行的 DOM-jQuery 对象集合，该集合中包含的 DOM 节点级别为一组 tr class="datagrid-row" 对象；
        //          否则返回一个空的 jQuery 对象。
        getRowDom: function (jq, index) { return getRowDom(jq[0], index); },

        //  获取 easyui-datagrid 中当前页指定行的 rowData；该函数定义如下参数：
        //      index: 表示要获取的 rowData 所在当前页的行索引号，从 0 开始；
        //  返回值：如果当前页存在 index 指示的行，则返回该行的行数据对象（JSON Object 格式）；否则返回 undefined。
        getRowData: function (jq, index) { return getRowData(jq[0], index); },

        //  获取 easyui-datagrid 中当前页指定单元格的 Dom-jQuery 对象元素；该函数定义如下参数：
        //      pos：表示单元格的位置，为一个 JSON-Object 对象，该 JSON 定义如下属性：
        //          field:  表示要获取的单元格位于哪个列；
        //          index:  表示要获取的单元格位于哪个行的行索引号，从 0 开始；
        //  返回值：如果当前页存在指定列的指定行，则返回该列中指定行的 DOM-jQuery 对象，该对象中包含的 DOM 节点级别为一个 div class="datagrid-cell" 对象；
        //          否则返回一个空的 jQuery 对象。
        getCellDom: function (jq, pos) { return getCellDom(jq[0], pos); },

        //  获取 easyui-datagrid 中当前页指定单元格的数据；该函数定义如下参数：
        //  pos：表示单元格的位置，为一个 JSON-Object 对象，该 JSON 定义如下属性：
        //          field:  表示要获取的单元格位于哪个列；
        //          index:  表示要获取的单元格位于哪个行的行索引号，从 0 开始；
        //  返回值：如果当前页存在指定列的指定行，则返回该列中指定行及指定列的单元格数据；否则返回 undefined。
        getCellData: function (jq, pos) { return getCellData(jq[0], pos); },

        //  获取 easyui-datagrid 中当前页指定单元格的显示数据(经过 formatter 格式化后的显示数据)；该函数定义如下参数：
        //  pos：表示单元格的位置，为一个 JSON-Object 对象，该 JSON 定义如下属性：
        //          field:  表示要获取的单元格位于哪个列；
        //          index:  表示要获取的单元格位于哪个行的行索引号，从 0 开始；
        //  返回值：如果当前页存在指定列的指定行，则返回该列中指定行的单元格的显示数据(经过 formatter 格式化后的显示数据)；否则返回 undefined。
        getCellDisplay: function (jq, pos) { return getCellDisplay(jq[0], pos); },

        //  获取 easyui-datagrid 所有列的 field 所组成的一个数组集合；参数 frozen 可以定义为如下格式：
        //      Boolean 类型值：如果是 true，则表示返回的结果集中包含 frozen(冻结)列，如果是 false 则表示返回的结果集中不包含 frozen(冻结)列；
        //      String 类型值：如果该参数定义为任意 String 类型值，则返回所有列信息(包括 frozen 冻结列和非冻结列)；
        //  返回值：如果 frozen 参数定义为 Boolean 且为 true，则返回所有 frozen(冻结) 列的 field 所构成的一个 Array 数组对象；
        //      如果 frozen 参数定义为 false，则返回所有非 frozen(非冻结) 列的 field 所构成的一个 Array 数组对象；
        //      如果 frozen 定义为任意的 String 类型值，则返回所有列的 field 所构成的一个 Array 数组对象。
        getColumnFields: function (jq, frozen) { return getColumnFields(jq[0], frozen); },

        //  获取 easyui-datagrid 按指定列的去重复项后的行数据集合；该函数定义如下参数：
        //      field:  要获取的数据的列的 field 名；
        //  返回值：返回一个数组，数组中每一个元素都表示一个行数据；
        //      其结果相当于当前 easyui-datagrid 控件调用 getRows 返回后并经过对指定列去重复项后的结果；
        //      如果传入的列名不存在，则返回一个长度为 0 的数组对象.
        getDistinctRows: function (jq, field) { return getDistinctRows(jq[0], field); },

        //  获取 easyui-datagrid 指定列的值去重复项后的数据集合；该函数定义如下参数；
        //      field:  要获取的数据的列的 field 名；
        //  返回值：返回一个数组，数组中的每一个元素都表示某一行的相应 field 属性的值；
        //      其结果相当于当前 easyui-datagrid 控件调用 getColumnData 返回后并经过对指定列去重复项后的结果；
        //      如果传入的列名不存在，则返回一个长度为 0 的数组对象.
        getDistinctColumnData: function (jq, field) { return getDistinctColumnData(jq[0], field); },

        //  获取 easyui-datagrid 所有列的 columnOption 所组成的一个数组集合；参数 frozen 可以定义为如下格式：
        //      Boolean 类型值：如果是 true，则表示返回的结果集中包含 frozen(冻结)列，如果是 false 则表示返回的结果集中不包含 frozen(冻结)列；
        //      String 类型值：如果该参数定义为任意 String 类型值，则返回所有列信息(包括 frozen 冻结列和非冻结列)；
        //  返回值：如果 frozen 参数定义为 Boolean 且为 true，则返回所有 frozen(冻结) 列的 columnOption 所构成的一个 Array 数组对象；
        //      如果 frozen 参数定义为 false，则返回所有非 frozen(非冻结) 列的 columnOption 所构成的一个 Array 数组对象；
        //      如果 frozen 定义为任意的 String 类型值，则返回所有列的 columnOption 所构成的一个 Array 数组对象。
        getColumns: function (jq, frozen) { return getColumns(jq[0], frozen); },

        //  同 getColumns 方法，但是仅返回列的 columnOption.hidden 值为 true 的列。
        getHiddenColumns: function (jq, frozen) { return getHiddenColumns(jq[0], frozen); },

        //  同 getColumns 方法，但是仅返回列的 columnOption.hidden 值为 false 的列。
        getVisibleColumns: function (jq, frozen) { return getVisibleColumns(jq[0], frozen); },

        //  同 getColumnFields 方法，但是仅返回列的 columnOption.hidden 值为 true 的列。
        getHiddenColumnFields: function (jq, frozen) { return getHiddenColumnFields(jq[0], frozen); },

        //  同 getColumnFields 方法，但是仅返回列的 columnOption.hidden 值为 false 的列。
        getVisibleColumnFields: function (jq, frozen) { return getVisibleColumnFields(jq[0], frozen); },

        //  显示当前 easyui-datagrid 当前页数据中指定行的数据；该方法的参数 param 可以是以下两种类型：
        //      待查找的行数据的 idField(主键) 字段值；
        //      function 类型，该回调函数签名为 function(row, index, rows)，其中 row 表示行数据对象、index 表示行索引号、rows 表示当前 easyui-datagrid 调用 getRows 返回的结果集；
        //          如果 param 参数为 function 类型，则 findRow 方法会对当前 easyui-datagrid 的当前页的每一行数据调用该回调函数；
        //          当回调函数返回 true 时，则表示找到需要查找的结果，立即停止循环调用并显示该行数据；
        //          如果回调函数始终未返回 true，则该回调函数会一直遍历 rows 直到最后。
        //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
        showRow: function (jq, param) { return jq.each(function () { showRow(this, param); }); },

        //  隐藏当前 easyui-datagrid 当前页数据中指定行的数据；该方法的参数 param 可以是以下两种类型：
        //      待查找的行数据的 idField(主键) 字段值；
        //      function 类型，该回调函数签名为 function(row, index, rows)，其中 row 表示行数据对象、index 表示行索引号、rows 表示当前 easyui-datagrid 调用 getRows 返回的结果集；
        //          如果 param 参数为 function 类型，则 findRow 方法会对当前 easyui-datagrid 的当前页的每一行数据调用该回调函数；
        //          当回调函数返回 true 时，则表示找到需要查找的结果，立即停止循环调用并隐藏该行数据；
        //          如果回调函数始终未返回 true，则该回调函数会一直遍历 rows 直到最后。
        //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
        hideRow: function (jq, param) { return jq.each(function () { hideRow(this, param); }); },

        //  显示当前 easyui-datagrid 当前页数据中指定多行的数据；该方法的参数 param 可以是以下三种类型：
        //      Function 类型，该回调函数签名为 function(row, index, rows)，其中 row 表示行数据对象、index 表示行索引号、rows 表示当前 easyui-datagrid 调用 getRows 返回的结果集；
        //          如果 param 参数为 Function 类型，则 showRows 方法会对当前 easyui-datagrid 的当前页的每一行数据调用该回调函数；
        //          当回调函数返回 true 时，则该行数据将会被显示；
        //      Array 类型，数组中的每一项都可以定义为如下类型：
        //          待查找的行数据的 idField(主键) 字段值；
        //          Function 类型；具体回调函数签名参考 showRow 方法中 param 参数为 function 类型时的定义；
        //          当 param 参数定义为 Array 类型时，则 showRows 方法会对数组中的每一项循环调用 showRow 方法；
        //      Boolean 类型且为 true：则 showRows 将会显示 easyui-datagrid 当前页的所有数据。
        //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
        showRows: function (jq, param) { return jq.each(function () { showRows(this, param); }); },

        //  隐藏当前 easyui-datagrid 当前页数据中指定多行的数据；该方法的参数 param 可以是以下三种类型：
        //      Function 类型，该回调函数签名为 function(row, index, rows)，其中 row 表示行数据对象、index 表示行索引号、rows 表示当前 easyui-datagrid 调用 getRows 返回的结果集；
        //          如果 param 参数为 Function 类型，则 hideRows 方法会对当前 easyui-datagrid 的当前页的每一行数据调用该回调函数；
        //          当回调函数返回 true 时，则该行数据将会被隐藏；
        //      Array 类型，数组中的每一项都可以定义为如下类型：
        //          待查找的行数据的 idField(主键) 字段值；
        //          Function 类型；具体回调函数签名参考 hideRow 方法中 param 参数为 function 类型时的定义；
        //          当 param 参数定义为 Array 类型时，则 hideRows 方法会对数组中的每一项循环调用 hideRow 方法；
        //      Boolean 类型且为 true：则 hideRows 将会隐藏 easyui-datagrid 当前页的所有数据。
        //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
        hideRows: function (jq, param) { return jq.each(function () { hideRows(this, param); }); },

        //  获取当前 easyui-datagrid 当前页所有隐藏的行数据所构成的一个 Array 对象。
        getHiddenRows: function (jq) { return getHiddenRows(jq[0]); },

        //  获取当前 easyui-datagrid 当前页所有显示的行数据所构成的一个 Array 对象。
        getVisibleRows: function (jq) { return getVisibleRows(jq[0]); },

        //  使当前 easyui-datagrid 中指定的列 DOM 对象高亮显示；该函数定义如下参数：
        //      field: 要高亮显示的列的 field 名；
        //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
        highlightColumn: function (jq, field) { return jq.each(function () { highlightColumn(this, field); }); },

        //  对当前 easyui-datagrid 中进行高亮关键词查询；该方法的 param 可以定义为如下两种类型：
        //      1、String 类型值：表示要对所有列进行的高亮查询关键词；
        //      2、JSON-Object：表示对特定列进行高亮查询的参数，该对象类型参数包含如下属性：
        //          field:      表示要进行高亮查询的列；
        //          value:      表示要进行高亮查询的关键词；
        //          regular:    Boolean 类型值，默认为 false；指示该关键词是否为正则表达式；
        //          ignoreCase: Boolean 类型值，默认为 true；指示高亮查询时是否忽略大小写。
        //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
        livesearch: function (jq, param) { return jq.each(function () { livesearch(this, param); }); },

        //  检测当前 easyui-datagrid 控件是否存在多行表头；
        //  返回值：如果当前 easyui-datagrid 控件设置了多行表头，则返回 true，否则返回 false。
        hasMuliRowHeader: function (jq) { return hasMuliRowHeader(jq[0]); },

        //  查找当前数据页上的行数据，返回的是一个 JSON 对象；参数 param 表示查找的内容；该方法的参数 param 可以是以下两种类型：
        //      待查找的行数据的 idField(主键) 字段值；
        //      function 类型，该回调函数签名为 function(row, index, rows)，其中 row 表示行数据对象、index 表示行索引号、rows 表示当前 easyui-datagrid 调用 getRows 返回的结果集；
        //          如果 param 参数为 function 类型，则 findRow 方法会对当前 easyui-datagrid 的当前页的每一行数据调用该回调函数；
        //          当回调函数返回 true 时，则表示找到需要查找的结果，立即停止循环调用并返回该行数据；
        //          如果回调函数始终未返回 true，则该回调函数会一直遍历 rows 直到最后并返回 null。
        //  返回值：返回一个 JSON-Object，表示一个行数据对象；如果未找到相应数据，则返回 null。
        findRow: function (jq, param) { return findRow(jq[0], param); },

        //  查找当前数据页上的行数据；该方法的参数 param 可以是以下两种类型：
        //      Function 类型，该回调函数签名为 function(row, index, rows)，其中 row 表示行数据对象、index 表示行索引号、rows 表示当前 easyui-datagrid 调用 getRows 返回的结果集；
        //          如果 param 参数为 Function 类型，则 findRows 方法会对当前 easyui-datagrid 的当前页的每一行数据调用该回调函数；
        //          当回调函数返回 true 时，则返回的结果集中将会包含该行数据；
        //          如果该回调函数始终未返回 true，则该方法最终返回一个长度为 0 的数组对象。
        //      Array 类型，数组中的每一项都可以定义为如下类型：
        //          待查找的行数据的 idField(主键) 字段值；
        //          Function 类型；具体回调函数签名参考 findRow 方法中 param 参数为 function 类型时的定义；
        //          当 param 参数定义为 Array 类型时，则 findRows 方法会对数组中的每一项循环调用 findRow 方法，并过滤掉 findRow 方法返回 null 的结果行；
        //  返回值：返回一个 Array 数组对象；数组中的每一项都是 JSON-Object 类型，表示一个行数据对象；如果未找到相应数据，则返回一个长度为 0 的数组对象。
        findRows: function (jq, param) { return findRows(jq[0], param); },

        //  删除一行数据，重写 easyui-datagrid 本身的 deleteRow 方法；参数 param 表示要删除的项目；该参数可以是以下三种类型：
        //      Number 类型，表示要删除的行索引号；
        //      表示要删除的行数据的 idField(主键) 字段值，或者行数据对象；
        //      Function 类型，该回调函数签名为 function(row, index, rows)，其中 row 表示行数据对象、index 表示行索引号、rows 表示当前 easyui-datagrid 调用 getRows 返回的结果集；
        //          如果 param 参数为 Function 类型，则 deleteRow 方法会对当前 easyui-datagrid 的当前页的每一行数据调用该回调函数；
        //          当回调函数返回 true 时，则表示查找到了需要被删除的行，deleteRow 方法将会删除该行数据并立即停止和跳出循环操作；
        //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
        deleteRow: function (jq, param) { return jq.each(function () { deleteRow(this, param); }); },

        //  删除多行数据，参数 param 表示要删除的项目；该参数可以是以下两种类型：
        //      Function 类型，该回调函数签名为 function(row, index, rows)，其中 row 表示行数据对象、index 表示行索引号、rows 表示当前 easyui-datagrid 调用 getRows 返回的结果集；
        //          如果 param 参数为 Function 类型，则 deleteRows 方法会对当前 easyui-datagrid 的当前页的每一行数据调用该回调函数；
        //          当回调函数返回 true 时，则表示查找到了需要被删除的行，deleteRows 方法将会删除该行数据，并遍历下一行数据直至数数据集的末尾；
        //      Array 类型，数组中的每一项目均表示要删除的行的行索引号或者 idField(主键) 字段值或者行数据对象
        //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
        deleteRows: function (jq, param) { return jq.each(function () { deleteRows(this, param); }); },

        //  对数据列进行排序，参数 options 是一个 JSON 格式对象，该对象定义了如下属性：
        //      sortName: String 类型，执行排序的字段名，必须是存在于 columns 或者 frozenColumns 中某项的 field 值。
        //      sortOrder: String 类型，排序方式，可设定的值限定为 "asc" 或 "desc"，默认为 "asc"
        //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
        sort: function (jq, options) { return jq.each(function () { sortGrid(this, options); }); },

        //  设置 easyui-datagrid 中列的标题；参数 param 是一个 json 对象，包含如下属性：
        //      field: 列字段名称
        //      title: 列的新标题
        //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
        setColumnTitle: function (jq, param) { return jq.each(function () { setColumnTitle(this, param); }); },

        //  设置 easyui-datagrid 中列的宽度；参数 param 是一个 JSON 对象，该 JSON 对象定义如下属性：
        //      field: 要设置列宽的的列 field 值；
        //      width: 要设置的列宽度，Number 类型值。
        //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
        setColumnWidth: function (jq, param) { return jq.each(function () { setColumnWidth(this, param); }); },

        //  设置当前 easyui-datagrid 控件的 offset 属性；该操作能让 offset 即可随浏览器窗口大小调整而生效或禁用；
        //  备注： 参数 offset 格式参考扩展属性 offset。
        //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
        setOffset: function (jq, offset) { return jq.each(function () { setOffset(this, offset); }); },

        //  设置当前 easyui-datagrid 控件的表头过滤器；该函数提供如下参数：
        //      columnFilter: 参见属性 columnFilter
        //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
        setColumnFilter: function (jq, columnFilter) { return jq.each(function () { setColumnFilter(this, columnFilter); }); },

        //  对当前 easyui-datagrid 控件按特定条件进行行过滤/显示操作；该方法的参数 param 可以定义为如下两种类型：
        //      1、Boolean 类型：如果定义为该类型，则：
        //          如果值定义为 true，则表示选中所有的数据全部不过滤；
        //          如果值定义为 false，则表示清空所有的数据全部过滤掉而不显示；
        //      2、JSON-Object 类型：如果定义为该类型，则该参数定义包含如下属性：
        //          field:  String 类型，表示要操作的列的 field 值；
        //          selected：Boolean，表示要对 field 所指示的列进行过滤操作的类型：
        //              如果定义为 true，则表示进行选中操作；
        //              如果定义为 false，则表示进行过滤操作；
        //          value:  表示要对 field 所指示的列进行过滤操作的值，该参数可以定义为如下类型：
        //              Array 类型：表示一组要进行过滤操作的值；
        //              非 Array 类型：表示要进行过滤操作的值；
        //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
        columnFilterSelect: function (jq, param) { return jq.each(function () { columnFilterSelect(this, param); }); },

        //  将当前表格数据导出为 excel 文件；该函数定义了一个参数 isAll；
        //  参数 isAll 指示是否导出全部而非仅当前页数据，如果不传入该参数默认为 false 即导出当前页数据。
        //  当参数 isAll 为 true 并且 remotePaging 为 true 时，需要当前 easyui-datagrid 控件的 url 属性指示的服务器数据源支持查询所有数据
        //      （以 rows: 0 方式不分页查询所有数据）。
        //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
        exportExcel: function (jq, isAll) { return jq.each(function () { exportGrid(this, isAll); }); }

    };
    var defaults = $.fn.datagrid.extensions.defaults = {

        //  增加 easyui-datagrid 的自定义扩展属性，该属性表示当屏幕大小调整时候随屏幕大小尺寸调整而自身大小调整的偏移量；
        //  该参数为一个 JSON 格式对象，该对象定义如下属性：
        //      width: 表示相对于浏览器窗口宽度的偏移量，如果是正数则其宽度比浏览器窗口大，反之则其宽度比浏览器窗口小，int类型；
        //      height: 表示相对于浏览器窗口高度的偏移量，如果是正数则其高度比浏览器窗口大，反之则其高度比浏览器窗口小，int类型；
        //  备注：该参数默认为 null，表示不随屏幕尺寸大小调整而调整；
        //      如果未定义 width 或者 width: 0，则表示屏幕大小调整时 easyui-datagrid 的 width 属性撑满屏幕宽度；
        //      如果未定义 height 或者 height: 0，则表示屏幕大小调整时 easyui-datagrid 的 height 属性撑满屏幕宽度；
        offset: null,

        //  覆盖 easyui-datagrid 的原生属性 loadFilter，以支持相应扩展功能。
        loadFilter: loadFilter,

        //  增加 easyui-datagrid 的自定义扩展属性；
        //      该属性表示当设定了属性 rowContextMenu 时，是否将双击数据行 onDblClickRow 事件的响应函数
        //      设置为 rowContextMenu 的第 "dblClickRowMenuIndex" 个菜单项的点击响应函数，并将该菜单项的字体加粗；
        //  Boolean 类型值，默认为 true；
        //  备注：当设置了有效的属性 rowContextMenu 时候，该功能方有效。
        //      自动绑定的 onDblClickRow 的回调函数中将会调用 rowContextMenu 的第 "dblClickRowMenuIndex" 个菜单项的点击响应函数，但是回调函数中不能用到参数 e 和 menu。
        autoBindDblClickRow: true,

        //  增加 easyui-datagrid 的自定义扩展属性；
        //  该属性表示当设定了属性 autoBindDblClickRow: true，双击行数据触发的右键菜单项事件的索引号；
        //      意即触发第几个右键菜单项上的事件。
        //  Number 类型值，从 0 开始计数，默认为 0；
        //  备注：当设置了自定义属性 autoBindDblClickRow: true并且设置了有效的属性 rowContextMenu 时，该功能方有效；
        //      如果此索引值超出菜单数量范围，则无效。
        dblClickRowMenuIndex: 0,

        //  增加 easyui-datagrid 的自定义扩展属性，该属性表示是否启用右键点击表头或者行数据时候弹出菜单中具有 "导出数据" 菜单的功能；
        //  该属性可以定义为以下类型：
        //      Boolean 类型值，表示是否启用右键菜单中的“导出数据”菜单项功能，默认为 false。
        //      JSON-Object 类型，该 JSON-Object 可以包含如下属性：
        //          current:   Boolean 类型值，表示是否启用“导出当前页”的菜单项，默认为 true；
        //          all:   Boolean 类型值，表示是否启用“导出全部”的菜单项，默认为 true；
        //          submenu:    表示这四个菜单项是否以子菜单方式呈现，默认为 true；
        //  备注：当 enableRowContextMenu 属性设置为 true 时，该属性才有效。
        //  导出数据功能的方法尚未实现，所以...就让它保持默认为 false 吧。
        exportMenu: false,

        //  增加 easyui-datagrid 的自定义扩展属性，Boolean 类型值，该属性表示是否启用：
        //      当右键单击行数据时选择右键当前单击的行的功能，默认为 true；
        //  注意：当此参数设置为 true 时，右键点击行会对性能产生一定影响；当时数据量大(单页数据超过 100 行)时不建议使用。
        selectOnRowContextMenu: false,

        //  增加 easyui-datagrid 的自定义扩展属性，Boolean 类型值，该属性表示是否启用：
        //      右键(表头右键或行右键)点击时弹出的菜单项，如果是 disabled: true ，则不显示的功能，默认为 false；
        hideDisabledMenu: false,

        //  增加 easyui-datagrid 的自定义扩展属性，该属性表示表列头右键菜单，为一个 Array 对象；数组中的每一个元素都具有如下属性:
        //      id:         表示菜单项的 id；
        //      text:       表示菜单项的显示文本；
        //      iconCls:    表示菜单项的左侧显示图标；
        //      disabled:   表示菜单项是否被禁用(禁用的菜单项点击无效)；
        //      hideOnClick:    表示该菜单项点击后整个右键菜单是否立即自动隐藏；
        //      bold:           Boolean 类型值，默认为 false；表示该菜单项是否字体加粗；
        //      style:          JSON-Object 类型值，默认为 null；表示要附加到该菜单项的样式；
        //      handler:    表示菜单项的点击事件，该事件函数格式为 function(e, field, eventData, grid, item, menu)，其中 this 指向菜单项本身
        //  备注：具体格式参考 easyui-datagrid 的 toolbar 属性为 Array 对象类型的格式；
        headerContextMenu: null,

        //  增加 easyui-datagrid 的自定义扩展属性，该属性表示数据行右键菜单，为一个 Array 对象；；数组中的每一个元素都具有如下属性:
        //      id:         表示菜单项的 id；
        //      text:       表示菜单项的显示文本；
        //      iconCls:    表示菜单项的左侧显示图标；
        //      disabled:   表示菜单项是否被禁用(禁用的菜单项点击无效)；
        //      hideOnClick:    表示该菜单项点击后整个右键菜单是否立即自动隐藏；
        //      bold:           Boolean 类型值，默认为 false；表示该菜单项是否字体加粗；
        //      style:          JSON-Object 类型值，默认为 null；表示要附加到该菜单项的样式；
        //      handler:    表示菜单项的点击事件，该事件函数格式为 function(e, rowIndex, rowData, eventData, grid, item, menu)，其中 this 指向菜单项本身
        //  备注：具体格式参考 easyui-datagrid 的 toolbar 属性为 Array 对象类型的格式；
        rowContextMenu: null,

        //  增加 easyui-datagrid 的自定义扩展属性，该属性表示是否启用 easyui-datagrid 的表头列点击按钮菜单；
        //  Boolean 类型值，默认为 true。 
        enableHeaderClickMenu: true,

        //  增加 easyui-datagrid 的自定义扩展属性，该属性表示是否启用 easyui-datagrid 的表头右键菜单；
        //  Boolean 类型值，默认为 true。
        enableHeaderContextMenu: true,

        //  增加 easyui-datagrid 的自定义扩展属性，该属性表示是否启用 easyui-datagrid 的行右键菜单；
        //  Boolean 类型值，默认为 true。
        enableRowContextMenu: true,

        //  扩展 easyui-datagrid 的自定义属性，表示是否启用右键菜单中的“上移、下移”菜单项的功能；
        //  该属性可以定义为以下类型：
        //      Boolean 类型，表示是否启用这四个菜单项，默认为 false；
        //      JSON-Object 类型，该 JSON-Object 可以包含如下属性：
        //          top:        布尔类型的值，也可是一个返回布尔值的函数，表示是否显示“移至最上”菜单；
        //          up:         布尔类型的值，也可是一个返回布尔值的函数，表示是否显示“上移”菜单；
        //          down:       布尔类型的值，也可是一个返回布尔值的函数，表示是否显示“下移”菜单；
        //          bottom:     布尔类型的值，也可是一个返回布尔值的函数，表示是否显示“移至最上”菜单；
        //          submenu:    表示这四个菜单项是否以子菜单方式呈现，默认为 true；
        //          上面四个属性，如果参数的值为函数，则函数的签名为 function(e, node, datagrid, item, menu)。
        //  备注：当 enableRowContextMenu 属性设置为 true 时，该属性才有效。
        //      这四个菜单点击时，会自动触发 easyui-datagrid 的 onDrop 事件。
        moveMenu: false,

        //  增加 easyui-datagrid 的自定义扩展属性，该属性表示是否启用右键菜单中的“翻页”菜单项的功能；
        //  该属性可以定义为以下类型：
        //      Boolean 类型值，表示是否启用右键菜单中的“翻页”菜单项功能，默认为 true。
        //      JSON-Object 类型，该 JSON-Object 可以包含如下属性：
        //          disabled:   Boolean 类型值，表示是否禁用右键菜单中的“翻页”菜单项功能，默认为 false；
        //          submenu:    表示这四个菜单项是否以子菜单方式呈现，默认为 true；
        //  备注：当 enableRowContextMenu 属性设置为 true 时，该属性才有效。
        pagingMenu: false,

        //  增加 easyui-datagrid 的自定义扩展属性，该属性表示是否启用右键菜单中的“刷新当前页”菜单项的功能；
        //  Boolean 类型值，默认为 true。
        refreshMenu: true,

        //  增加 easyui-datagrid 的自定义扩展属性，该属性表示是否启用表格的行节点拖动功能；
        //  Boolean 类型值，默认为 false。
        dndRow: false,

        //  增加 easyui-datagrid 的自定义扩展属性，该属性表示是否启用行数据的 tooltip 功能；
        //  该属性可以是一个 Boolean 类型值；也可以是一个格式为 function(rowIndex, rowData) 的回调函数；
        //  如果该参数是一个回调函数，则表示启用行数据的 tooltip 功能，并且该函数的返回值为 tooltip 的 content 值。
        //  默认为 Boolean 类型，值为 false。
        //  注意：当启用该配置属性后，所有列的 tootip 属性就会自动失效。
        rowTooltip: false,

        //  增加 easyui-datagrid 的自定义扩展属性，该属性表示在触发 beginEdit 事件后，是否构建仿 ext-grid-rowediting 行编辑的“保存”和“取消”按钮面板；
        //  Boolean 类型值，默认为 true。
        extEditing: false,

        //  增加 easyui-datagrid 的自定义扩展属性，该属性表示在双击 data-row(数据行) 时，是否自动启用该行的编辑功能(执行 beginEdit 操作)；
        //  Boolean 类型值，默认为 false。
        //  注意：当 autoBindDblClickRow 属性设置为 true 且菜单项满足其触发条件时，autoEditing 的双击行时自动启用编辑效果将不会触发。
        autoEditing: false,

        //  增加 easyui-datagrid 的自定义扩展属性，该属性表示是否在一个时刻只允许一行数据开启编辑状态(当某行数据开启编辑状态时，其他正在编辑的行将会被自动执行 endEdit 操作)；
        //  Boolean 类型值，默认为 true。
        singleEditing: true,

        //  增加 easyui-datagrid 的自定义扩展属性，该属性表示当前表格的列过滤器设置参数；该参数是一个 JSON 格式的对象，该对象定义如下属性：
        //      panelHeight: 列过滤器控件面板的高度，默认为 100，该值最小为 60；
        //      position:   表示列过滤器的位置，String 类型，可以填入的值限定在以下范围：
        //          "top":  表示列过滤器被放置在表头的上方；
        //          "bottom":   表示列过滤器被放置在表头的下方；默认值。
        //  备注：关于列过滤器组件中每个列具体的过滤效果设置，参见扩展的 ColumnOption 属性(见本源码文件后面注释)；
        //  注意：
        //      1、如果不定义该参数，则表示当前 easyui-datagrid 控件不启用列过滤器功能；该参数不影响表头右键过滤功能；
        //      2、该功能支持多行表头；但不保证在多行表头情况下布局不会出现排版错误；
        //      3、该功能仅实现本地数据过滤，也就是说该插件不会在处理远程数据请求时将过滤参数信息发送到远程服务器；
        //      4、当启用该功能时，easyui-datagrid 的属性 fitColumns 请保持默认值为 false，否则列头过滤器组件可能导致表头列不能对齐而布局混乱。
        columnFilter: null,

        //  覆盖 easyui-datagrid 的原生属性 loader，以支持相应扩展功能。调用者请勿在自己的代码中使用该属性，否则扩展功能无效。
        loader: loader,

        //  覆盖 easyui-datagrid 的原生属性事件 onLoadSuccess，以支持相应扩展功能。
        //  注意：如果调用者需要在自己的代码中使用该事件，请以覆盖方式重写，而非直接重写。
        //  覆盖方式重写示例：
        //      grid.datagrid({
        //          onLoadSuccess: function(data) {
        //              $.fn.datagrid.extensions.onLoadSuccess.apply(this, arguments);  //这句一定要加上。
        //              ...                                     //这里是调用者的其他附加逻辑代码
        //          }
        //      });
        onLoadSuccess: onLoadSuccess,

        //  覆盖 easyui-datagrid 的原生属性事件 onResizeColumn，以支持相应扩展功能。
        //  注意：如果调用者需要在自己的代码中使用该事件，请以覆盖方式重写，而非直接重写。
        //  覆盖方式重写示例：
        //      grid.datagrid({
        //          onResizeColumn: function(data) {
        //              $.fn.datagrid.extensions.onResizeColumn.apply(this, arguments);  //这句一定要加上。
        //              ...                                     //这里是调用者的其他附加逻辑代码
        //          }
        //      });
        onResizeColumn: onResizeColumn,

        //  覆盖 easyui-datagrid 的原生属性事件 onBeforeEdit，以支持相应扩展功能。
        onBeforeEdit: onBeforeEdit,

        //  覆盖 easyui-datagrid 的原生属性事件 onAfterEdit，以支持相应扩展功能。
        //  注意：如果调用者需要在自己的代码中使用该事件，请以覆盖方式重写，而非直接重写。
        //  覆盖方式重写示例：
        //      grid.datagrid({
        //          onAfterEdit: function(data) {
        //              $.fn.datagrid.extensions.onAfterEdit.apply(this, arguments);  //这句一定要加上。
        //              ...                                     //这里是调用者的其他附加逻辑代码
        //          }
        //      });
        onAfterEdit: onAfterEdit,

        //  覆盖 easyui-datagrid 的原生属性事件 onCancelEdit，以支持相应扩展功能。
        onCancelEdit: onCancelEdit,

        //  扩展 easyui-datagrid 的自定义事件；该事件表示删除指定的列前触发的动作；该事件回调函数提供如下参数：
        //      field:  表示要被删除的列的 field 值。
        //  备注：如果该事件回调函数返回 false，则不进行删除列的操作。
        //  该事件函数中的 this 指向当前 easyui-datagrid 的 DOM 对象(非 jQuery 对象)；
        onBeforeDeleteColumn: function (field) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示删除指定的列后触发的动作；该事件回调函数提供如下参数：
        //      field:  表示要被删除的列的 field 值。
        //  该事件函数中的 this 指向当前 easyui-datagrid 的 DOM 对象(非 jQuery 对象)；
        onDeleteColumn: function (field) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示移动指定的列前触发的动作；该事件回调函数提供如下参数：
        //      source:  表示要被移动的列的 field 值。
        //      target:  表示目标位置的列的 field 值。
        //      point :  表示移动的方式；这是一个 String 类型值，可能的值包括：
        //          "before":   表示将列 source 移动至列 target 的前一格位置；
        //          "after" :   表示将列 source 移动至列 target 的后一格位置；
        //  备注：如果该事件回调函数返回 false，则不进行删除列的操作。
        //  该事件函数中的 this 指向当前 easyui-datagrid 的 DOM 对象(非 jQuery 对象)；
        onBeforeMoveColumn: function (source, target, point) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示移动指定的列后触发的动作；该事件回调函数提供如下参数：
        //      source:  表示要被移动的列的 field 值。
        //      target:  表示目标位置的列的 field 值。
        //      point :  表示移动的方式；这是一个 String 类型值，可能的值包括：
        //          "before":   表示将列 source 移动至列 target 的前一格位置；
        //          "after" :   表示将列 source 移动至列 target 的后一格位置；
        //  该事件函数中的 this 指向当前 easyui-datagrid 的 DOM 对象(非 jQuery 对象)；
        onMoveColumn: function (source, target, point) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示移动 data-row(数据行) 之前触发的动作；该事件回调函数提供如下三个参数：
        //      target: 表示目标位置的 data-row(数据行) 索引号(从 0 开始计数)；
        //      source: 表示要移动的 data-row(数据行) 索引号(从 0 开始计数)；
        //      point:  表示移动到目标节点 target 的位置，String 类型，可能的值包括：
        //          "top":      表示移动到目标位置 target 的上一格位置；
        //          "bottom":   表示追加为目标位置 target 的下一格位置；
        //  该事件函数中的 this 指向当前 easyui-datagrid 的 DOM 对象(非 jQuery 对象)；
        //  如果该事件函数返回 false，则会立即停止移动数据行操作；
        onBeforeDrop: function (target, source, point) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示移动 data-row(数据行) 之后触发的动作；该事件回调函数提供如下三个参数：
        //      target: 表示目标位置的 data-row(数据行) 索引号(从 0 开始计数)；
        //      source: 表示要移动的 data-row(数据行) 索引号(从 0 开始计数)；
        //      point:  表示移动到目标节点 target 的位置，String 类型，可能的值包括：
        //          "top":      表示移动到目标位置 target 的上一格位置；
        //          "bottom":   表示追加为目标位置 target 的下一格位置；
        //  该事件函数中的 this 指向当前 easyui-datagrid 的 DOM 对象(非 jQuery 对象)；
        onDrop: function (target, source, point) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示拖动 data-row(数据行) 之前触发的动作；该事件回调函数提供如下两个参数：
        //      index:  表示被拖动的 data-row(数据行) 的索引号，从 0 开始计数；
        //      row:    表示被拖动的 data-row(数据行) 的行数据对象，是一个 JSON-Object。
        //  该事件函数中的 this 指向当前 easyui-datagrid 的 DOM 对象(非 jQuery 对象)；
        //  备注：如果该事件函数返回 false，则取消当前的拖动 data-row(数据行) 操作。
        onBeforeDrag: function (index, row) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示开始拖动 data-row(数据行) 时触发的动作；该事件回调函数提供如下两个参数：
        //      index:  表示被拖动的 data-row(数据行) 的索引号，从 0 开始计数；
        //      row:    表示被拖动的 data-row(数据行) 的行数据对象，是一个 JSON-Object。
        //  该事件函数中的 this 指向当前 easyui-datagrid 的 DOM 对象(非 jQuery 对象)；
        onStartDrag: function (index, row) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示结束拖动 data-row(数据行) 时触发的动作；该事件回调函数提供如下两个参数：
        //      index:  表示被拖动的 data-row(数据行) 的索引号，从 0 开始计数；
        //      row:    表示被拖动的 data-row(数据行) 的行数据对象，是一个 JSON-Object。
        //  该事件函数中的 this 指向当前 easyui-datagrid 的 DOM 对象(非 jQuery 对象)；
        onStopDrag: function (index, row) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示当有其他的 data-row(数据行) 被拖动至当前 data-row(数据行) 时所触发的动作；该事件回调函数提供如下两个参数：
        //      target: 表示当前 data-row(数据行) 的行数据对象，是一个 JSON-Object；
        //      source: 表示拖动过来的 data-row(数据行) 行数据对象，是一个 JSON-Object。
        //  该事件函数中的 this 指向当前 easyui-datagrid 的 DOM 对象(非 jQuery 对象)；
        //  备注：如果该事件函数返回 false，则立即取消当前的 data-row(数据行) 接收拖动过来对象的操作，并禁用当前 data-row(数据行) 的 droppable 效果；
        onDragEnter: function (target, source) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示当有其他的 data-row(数据行) 被拖动至当前 data-row(数据行) 后并在上面移动时所触发的动作；该事件回调函数提供如下两个参数：
        //      target: 表示当前 data-row(数据行) 的行数据对象，是一个 JSON-Object；
        //      source: 表示拖动过来的 data-row(数据行) 行数据对象，是一个 JSON-Object。
        //  该事件函数中的 this 指向当前 easyui-datagrid 的 DOM 对象(非 jQuery 对象)；
        //  备注：如果该事件函数返回 false，则立即取消当前的 data-row(数据行) 接收拖动过来对象的操作，并禁用当前 data-row(数据行) 的 droppable 效果；
        onDragOver: function (target, source) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示当有其他的 data-row(数据行) 被拖动至当前 data-row(数据行) 后并拖动离开时所触发的动作；该事件回调函数提供如下两个参数：
        //      target: 表示当前 data-row(数据行) 的行数据对象，是一个 JSON-Object；
        //      source: 表示拖动过来的 data-row(数据行) 行数据对象，是一个 JSON-Object。
        //  该事件函数中的 this 指向当前 easyui-datagrid 的 DOM 对象(非 jQuery 对象)；
        onDragLeave: function (target, source) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示执行 updateRow 方法前所触发的动作；该事件回调函数提供如下两个参数：
        //      index:  表示要进行 updateRow 的行的索引号，从 0 开始计数；
        //      row:    表示要进行更新操作的新的行数据对象；
        //  该事件函数中的 this 指向当前 easyui-datarid 的 DOM 对象(非 jQuery 对象)；
        //  备注：如果该事件回调函数返回 false，则立即取消即将要执行的 updateRow 操作。
        onBeforeUpdateRow: function (index, row) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示执行 updateRow 方法后所触发的动作；该事件回调函数提供如下两个参数：
        //      index:  表示要进行 updateRow 的行的索引号，从 0 开始计数；
        //      row:    表示要进行更新操作的新的行数据对象；
        //  该事件函数中的 this 指向当前 easyui-datarid 的 DOM 对象(非 jQuery 对象)；
        onUpdateRow: function (index, row) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示执行 appendRow 方法前所触发的动作；该事件回调函数提供如下参数：
        //      row:    表示要进行添加行操作的新的行数据对象；
        //  该事件函数中的 this 指向当前 easyui-datarid 的 DOM 对象(非 jQuery 对象)；
        //  备注：如果该事件回调函数返回 false，则立即取消即将要执行的 appendRow 操作。
        onBeforeAppendRow: function (row) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示执行 appendRow 方法后所触发的动作；该事件回调函数提供如下参数：
        //      row:    表示要进行添加行操作的新的行数据对象；
        //  该事件函数中的 this 指向当前 easyui-datarid 的 DOM 对象(非 jQuery 对象)；
        onAppendRow: function (row) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示执行 insertRow 方法前所触发的动作；该事件回调函数提供如下两个参数：
        //      index:  表示要进行 insertRow 的行的索引号，从 0 开始计数；
        //      row:    表示要进行插入行操作的新的行数据对象；
        //  该事件函数中的 this 指向当前 easyui-datarid 的 DOM 对象(非 jQuery 对象)；
        //  备注：如果该事件回调函数返回 false，则立即取消即将要执行的 insertRow 操作。
        onBeforeInsertRow: function (index, row) { },

        //  扩展 easyui-datagrid 的自定义事件；该事件表示执行 insertRow 方法后所触发的动作；该事件回调函数提供如下两个参数：
        //      index:  表示要进行 insertRow 的行的索引号，从 0 开始计数；
        //      row:    表示要进行插入行操作的新的行数据对象；
        //  该事件函数中的 this 指向当前 easyui-datarid 的 DOM 对象(非 jQuery 对象)；
        onBeforeRow: function (index, row) { }
    };

    //  另，增加了 easyui-datagrid 中列 columnOption 的部分自定义扩展属性：
    //      tooltip:    可以是一个 Boolean 类型，也可以是一个回调函数类型，表示是否启用该列的 tooptip 效果；
    //          如果该属性为 Boolean 类型，表示是否启用该列的 tooltip；
    //          如果该属性为 Function 类型，则其格式为 function (value, rowIndex, rowData)，表示为该列启用 tooltip 的方式；
    //              该回调函数返回一个 String 类型值，表示 tooltip 的 content 内容。
    //          默认为 Boolean 类型值为 false。
    //      filterable: Boolean 类型，默认为 true；表示是否禁用该列右键菜单中的 "过滤/显示" 菜单；
    //      hidable:    Boolean 类型，默认为 true；表示该列是否可隐藏。
    //      filter:     String 类型；表示该列的过滤器组件的类型；可选的值限定在以下范围：
    //          "none":     表示过滤器为空，即该列无过滤器效果。
    //          "checkbox": 表示过滤器的类型为一组 checkbox 复选框，默认值。
    //          "livebox":  表示过滤器的类型为模糊查询过滤方式；即过滤器组件为一个输入框，改变该输入框的值后，对该列进行按输入值的过滤匹配。
    //          "caps":     表示过滤器的类型为 slider 拖动条控件，且过滤的结果为只显示小于或等于 slider 选定的值；只有该列全部为数值数据时，才能设置为该类型。
    //          "lower":    表示过滤器的类型为 slider 拖动条控件，且过滤的结果为只显示大于或等于 slider 选定的值；只有该列全部为数值数据时，才能设置为该类型。
    //      precision:  Number 类型，默认为 1；表示过滤器类型(filter)为 caps 或 lower 时候，slider 组合控件的输入框的改变值的精度(保留的小数位数)。
    //      step:       Number 类型，默认为 1；表示过滤器类型(filter)为 caps 或 lower 时候，移动 slider 控件时值的改变值的精度(最小改变的刻度)。
    //
    //  备注： 当 filterable 的值设置为 true 时，参数 filter 方有效；
    //         当 filterable 的值设置为 true 且 filter 的值为 "caps" 或 "lower" 时，参数 precision 和 step 方有效。

    $.extend($.fn.datagrid.defaults, defaults);
    $.extend($.fn.datagrid.methods, methods);

    //  增加扩展插件中要用到的自定义样式
    var css =
        ".datagrid-rowediting-panel { position: absolute; display: block; border: 1px solid #ddd; padding: 5px 5px; }" +
        ".datagrid-body td.datagrid-header-cell-top { border-top-color: red; border-top-width: 2px; border-top-style: dotted; }" +
        ".datagrid-body td.datagrid-header-cell-bottom { border-bottom-color: red; border-bottom-width: 2px; border-bottom-style: dotted; }" +
        ".datagrid-cell-hightlight { font-weight: bold; background-color: Yellow; }" +
        ".datagrid-header-cell-arrow { float: right; cursor: pointer; border-left-style: dotted; display: none; border-left-width: 0px; }" +
        ".datagrid-header-cell-arrow-show { display: inline; border-left-width: 1px; }" +
        ".datagrid-header-filter { text-align: center; overflow: auto; }" +
        ".datagrid-header-filter-top { vertical-align: top; }" +
        ".datagrid-header-filter-bottom { vertical-align: bottom; }" +
        ".datagrid-header-filter-cell { white-space: nowrap; }" +
        ".datagrid-header-filter-line { border-width: 0px; border-top-width: 1px; border-style: dotted; border-color: #ccc; margin-top: 3px; margin-bottom: 3px; }" +
        ".datagrid-header-filter-container { padding-top: 5px; overflow: auto; font-size: 11px; text-align: left; }" +
        ".datagrid-header-filter-livebox-text { margin-left: 10px; margin-top: 10px; overflow: auto; font-size: 11px; text-align: left; }" +
        ".datagrid-header-filter-livebox { margin-left: 10px; width: 60px; height: 12px; font-size: 11px; }" +
        ".datagrid-header-filter-item { overflow: hidden; padding: 0px; margin: 0px; cursor: pointer; white-space: nowrap; margin: 2px; }" +
        ".datagrid-header-filter-item:hover { filter: alpha(opacity=60); opacity: 0.6; }" +
        ".datagrid-header-filter-item-text { padding-left: 20px; float: left; }" +
        ".datagrid-header-filter-item-icon { left: 2px; top: 50%; width: 16px; height: 16px; margin-top: -3px; }" +
        ".datagrid-header-filter-itemwrap { overflow: hidden; padding-left: 5px; white-space: nowrap; height: 20px; }" +
        ".datagrid-header-filter-slider { }" +
        ".datagrid-header-filter-sliderwrap { overflow: hidden; padding-left: 30px; padding-top: 15px; }" +
        ".datagrid-header-filter-sliderwrap .slider-rulelabel span { font-size: 11px; }" +
        ".datagrid-header-filter-numeric { width: 60px; height: 12px; font-size: 11px; }"
    $.util.addCss(css);
})(jQuery);


/**
 * 按钮事件请自定义openTargetDialog()方法实现
 */
$.extend($.fn.datagrid.defaults.editors, {    
    textbutton: {    
        init: function(container, options){
            var input = $('<input type="text" class="datagrid-editable-input" />');
						input.appendTo(container);
						input.iptSearch({
							disabled:options.disabled,
							clickFn:function(){
								if(typeof options.clickFn=="function"){
									options.clickFn();
								}
							}
						});
            return input;    
        },    
        getValue: function(target){ 
            return $(target).val();    
        },    
        setValue: function(target, value){
        	$(target).val(value);  
        },    
        resize: function(target, width){    
					$(target)._outerWidth(width)._outerHeight(22);
					$(target).parent()._outerWidth(width);
        }    
    },   
	combogrid: {
			init: function(container, options){
				var input = $('<input type="text" class="datagrid-editable-input">').appendTo(container); 
				input.combogrid(options);
				return input;
			},
			destroy: function(target){
				$(target).combogrid('destroy');
			},
			getValue: function(target){
				return $(target).combogrid('getValue');
			},
			setValue: function(target, value){
				$(target).combogrid('setValue', value);
			},
			resize: function(target, width){
				$(target).combogrid('resize',width);
			}
		},
readonlytext: {    
    init: function(container, options){
        var input = $('<input type="text" class="datagrid-editable-input  readonly" readOnly="readOnly">').appendTo(container);    
        return input;    
    },    
    getValue: function(target){ 
        return $(target).val();    
    },    
    setValue: function(target, value){
    	$(target).val(value);  
    },    
    resize: function(target, width){    
    }    
}
});
(function ($, undefined) {

    var coreEasyui = {},
        coreJquery = function () { return $.apply(this, arguments); };

    coreJquery.fn = coreJquery.prototype = {};
    coreJquery.easyui = coreEasyui;

    coreEasyui.getTopEasyuiMessager = function () {
        if ($.util.isTopMost) { return $.messager; }
        return $.util.$ && $.util.$.messager ? $.util.$.messager : $.messager;
    };
    coreEasyui.messager = coreEasyui.getTopEasyuiMessager();

    coreEasyui.getTopEasyuiTooltip = function () {
        if ($.util.isTopMost) { return $.fn.tooltip; }
        return $.util.$ && $.util.$.fn && $.util.$.fn.tooltip ? $.util.$.fn.tooltip : $.fn.tooltip;
    };
    coreEasyui.tooltip = $.fn.tooltip;
    //  对某个元素设置 easyui-tooltip 属性；该函数定义如下参数：
    //      target:     表示要设置 easyui-tooltip 的元素，可以是一个 jQuery 选择器字符串，也可以是一个 DOM 对象或者 jQuery 对象。
    //      options:    表示初始化 easyui-tooltip 的参数信息，为一个 JSON-Object；
    //  备注：通过该方法设置的 easyui-tooltip 属性，在触发 mouseover 事件时，加载 easyui-tooltip，在 tooltip-tip 隐藏时，easyui-tooltip 自动调用 destroy 销毁；
    coreEasyui.tooltip.init = function (target, options) {
        var t = $.util.parseJquery(target);
        t.mouseover(function () {
            t.tooltip($.extend({ trackMouse: true }, options, { onHide: function () {
                if ($.isFunction(options.onHide)) { options.onHide.apply(this, arguments); }
                t.tooltip("destroy");
            }
            })).tooltip("show");
        });
    };

    var icons = { "error": "messager-error", "info": "messager-info", "question": "messager-question", "warning": "messager-warning" },
        _show = $.messager.show, _alert = $.messager.alert, _confirm = $.messager.confirm, _prompt = $.messager.prompt,
        defaults = { title: "操作提醒", confirm: "您确认要进行该操作？", prompt: "请输入相应内容：", icon: "info", loading: "正在加载，请稍等..."};

    //  重写 $.messager.show 方法，使其支持图标以及默认的单个字符串参数的重载；该方法定义如下参数：
    //      options:    表示需要弹出消息的内容、图标和方式等信息，该参数类型可以为如下：
    //          JSON Object: 兼容 $.messager.show 官方默认 API 的所有属性，并在此基础上增加如下参数：
    //              icon: 表示弹出消息的图标，为一个 String 类型值，该值可选的内容与 $.messager.alert 方法的第三个参数可选内容相同；
    //                  包括："error", "info", "question", "warning"；
    //                  具体内容参见 $.messager.alert 该方法的官方默认 API 中第三个参数可选内容。
    //              position: 表示弹出消息的位置，为一个 String 类型值，该值可选的内容定义如下：
    //                  topLeft: 屏幕左上角, topCenter: 屏幕上方中间，topRight: 屏幕右上角
    //                  centerLeft: 屏幕左侧中间，center: 屏幕正中间，centerRight: 屏幕右侧中间
    //                  bottomLeft: 屏幕左下角，bottomCenter: 屏幕下方中间，bottomRight: 屏幕右下角
    //          String: 以 icon: "info"、title: "操作提醒"、msg: options 为默认的方式调用上一重载。
    //  返回值：返回弹出的消息框 easyui-window 对象
    $.messager.show = function (options) {
        var isString = $.util.isString(options) || $.util.isBoolean(options) || $.isNumeric(options);
        if (isString) {
            return arguments.length == 1 ? $.messager.show({ msg: String(options) }) : $.messager.show({ title: options, msg: arguments[1], icon: arguments[2], position: arguments[3] });
        }
        var defaults = $.extend({}, $.messager.defaults, { title: "操作提醒", timeout: 4000, showType: "slide" });
        var position = {
            topLeft: { right: "", left: 0, top: document.body.scrollTop + document.documentElement.scrollTop, bottom: "" },
            topCenter: { right: "", top: document.body.scrollTop + document.documentElement.scrollTop, bottom: "" },
            topRight: { left: "", right: 0, top: document.body.scrollTop + document.documentElement.scrollTop, bottom: "" },
            centerLeft: { left: 0, right: "", bottom: "" },
            center: { right: "", bottom: "" },
            centerRight: { left: "", right: 0, bottom: "" },
            bottomLeft: { left: 0, right: "", top: "", bottom: -document.body.scrollTop - document.documentElement.scrollTop },
            bottomCenter: { right: "", top: "", bottom: -document.body.scrollTop - document.documentElement.scrollTop },
            bottomRight: { left: "", right: 0, top: "", bottom: -document.body.scrollTop - document.documentElement.scrollTop }
        };
        var opts = $.extend({}, defaults, options);
        opts.style = position[options.position] ? position[options.position] : position.topCenter;
        var iconCls = icons[opts.icon] ? icons[opts.icon] : icons.info;
        opts.msg = "<div class='messager-icon " + iconCls + "'></div>" + "<div>" + opts.msg + "</div>";
        return _show(opts);
    };
    $.union($.messager.show, _show);

    //  重写 $.messager.alert 方法，使其支持如下的多种重载方式：
    //      function (message)
    //      function (message, callback)
    //      function (title, message, callback)
    //      function (title, message, icon)
    //      function (title, message, icon, callback)
    //  返回值：返回弹出的消息框 easyui-window 对象
    $.messager.alert = function (title, msg, icon, fn) {
        if (arguments.length == 1) { return _alert(defaults.title, arguments[0], defaults.icon); }
        if (arguments.length == 2) {
            if ($.isFunction(arguments[1])) { return _alert(defaults.title, arguments[0], defaults.icon, arguments[1]); }
            if (arguments[1] in icons) { return _alert(defaults.title, arguments[0], arguments[1]); }
            return _alert.apply(this, arguments);
        }
        if (arguments.length == 3) {
            if ($.isFunction(arguments[2])) {
                return (arguments[1] in icons) ? _alert(defaults.title, arguments[0], arguments[1], arguments[2])
                    : _alert(arguments[0], arguments[1], defaults.icon, arguments[2]);
            }
            return _alert.apply(this, arguments);
        }
        return _alert.apply(this, arguments);
    };

    //  重写 $.messager.confirm 方法，使其支持如下的多种重载方式：
    //      function (message)
    //      function (callback)
    //      function (message, callback)
    //      function (title, message)
    //  返回值：返回弹出的消息框 easyui-window 对象
    $.messager.confirm = function (title, msg, fn) {
        if (arguments.length == 1) {
            return $.isFunction(arguments[0]) ? _confirm(defaults.title, defaults.confirm, arguments[0]) : _confirm(defaults.title, arguments[0]);
        }
        if (arguments.length == 2) {
            return $.isFunction(arguments[1]) ? _confirm(defaults.title, arguments[0], arguments[1]) : _confirm(arguments[0], arguments[1]);
        }
        return _confirm.apply(this, arguments);
    };

    //  增加 $.messager.solicit 方法，该方法弹出一个包含三个按钮("是"、"否" 和 "取消")的对话框，点击任意按钮或者关闭对话框时，执行指定的回调函数；
    //      该函数提供如下重载方式：
    //      function (message, callback)
    //      function (title, message, callback)
    //  返回值：返回弹出的消息框 easyui-window 对象
    $.messager.solicit = function (title, msg, fn) {
        var options = $.extend({}, (arguments.length == 2) ? { title: defaults.title, msg: arguments[0], callback: arguments[1] }
            : { title: arguments[0], msg: arguments[1], callback: arguments[2] });
        var win = $.messager.confirm(options.title, options.msg, options.fn), opts = win.window("options"), onClose = opts.onClose;
        opts.onClose = function () {
            if ($.isFunction(onClose)) { onClose.apply(this, arguments); }
            if ($.isFunction(options.fn)) { options.fn.call(this, undefined); }
        };
        var button = win.find(">div.messager-button").empty();
        $("<a></a>").linkbutton({ text: "是" }).css("margin-left", "10px").click(function () {
            opts.onClose = onClose; win.window("close"); if ($.isFunction(options.fn)) { options.fn.call(this, true); }
        }).appendTo(button);
        $("<a></a>").linkbutton({ text: "否" }).css("margin-left", "10px").click(function () {
            opts.onClose = onClose; win.window("close"); if ($.isFunction(options.fn)) { options.fn.call(this, false); }
        }).appendTo(button);
        $("<a></a>").linkbutton({ text: "取消" }).css("margin-left", "10px").click(function () {
            opts.onClose = onClose; win.window("close"); if ($.isFunction(options.fn)) { options.fn.call(this, undefined); }
        }).appendTo(button);
        return win;
    };

    //  重写 $.messager.prompt 方法，使其支持如下的多种重载方式：
    //      function (callback)
    //      function (message, callback)
    //      function (title, message)
    //      function (title, message, callback)
    //  返回值：返回弹出的消息框 easyui-window 对象
    $.messager.prompt = function (title, msg, fn) {
        if (arguments.length == 1) {
            return $.isFunction(arguments[0]) ? _prompt(defaults.title, defaults.prompt, arguments[0]) : _prompt(defaults.title, defaults.prompt);
        }
        if (arguments.length == 2) {
            return $.isFunction(arguments[1]) ? _prompt(defaults.title, arguments[0], arguments[1]) : _prompt(arguments[0], arguments[1]);
        }
        return _prompt.apply(this, arguments);
    };


    //  显示类似于 easyui-datagrid 在加载远程数据时显示的 mask 状态层；该函数定义如下重载方式：
    //      function ()
    //      function (options)，其中 options 为一个格式为 { msg, locale, topMost } 的 JSON-Object；
    //  上述参数中：
    //      msg 表示加载显示的消息文本内容，默认为 "正在加载，请稍等..."；
    //      locale 表示加载的区域，可以是一个 jQuery 对象选择器字符串，也可以是一个 jQuery 对象或者 HTML-DOM 对象；默认为字符串 "body"。
    //      topMost 为一个布尔类型参数，默认为 false，表示是否在顶级页面加载此 mask 状态层。
    //  返回值：返回表示弹出的数据加载框和层的 jQuery 对象。
    coreEasyui.loading = function (options) {
        var opts = { msg: defaults.loading, locale: "body", topMost: false };
        options = options || {};
        $.extend(opts, options);
        var jq = opts.topMost ? $.util.$ : $, locale = jq.util.parseJquery(opts.locale), array = locale.children().map(function () {
            var zindex = $(this).css("z-index");
            return $.isNumeric(zindex) ? parseInt(zindex) : 0;
        }), zindex = $.array.max(array);
        locale.addClass("mask-container");
        var mask = jq("<div></div>").addClass("datagrid-mask").css({ display: "block", "z-index": ++zindex }).appendTo(locale);
        var msg = jq("<div></div>").addClass("datagrid-mask-msg").css({ display: "block", left: "50%", "z-index": ++zindex }).html(opts.msg).appendTo(locale);
        msg.css("marginLeft", -msg.outerWidth() / 2);
        return mask.add(msg);
    };

    //  关闭由 $.easyui.loading 方法显示的 "正在加载..." 状态层；该函数定义如下重载方式：
    //      function ()
    //      function (locale)
    //      function (locale, topMost)
    //      function (topMost, locale)
    //      function (options)，其中 options 为一个格式为 { locale, topMost } 的 JSON-Object
    coreEasyui.loaded = function (locale, topMost) {
        var opts = { locale: "body", topMost: false };
        if (arguments.length == 1) {
            if ($.isPlainObject(arguments[0])) {
                $.extend(opts, arguments[0]);
            } else if ($.util.isBoolean(arguments[0])) {
                opts.topMost = arguments[0];
            } else {
                opts.locale = arguments[0];
            }
        }
        if (arguments.length == 2) {
            if ($.util.isBoolean(arguments[0])) {
                $.extend(opts, { locale: arguments[1], topMost: arguments[0] });
            } else {
                $.extend(opts, { locale: arguments[0], topMost: arguments[1] });
            }
        }
        var jq = opts.topMost ? $.util.$ : $, locale = jq.util.parseJquery(opts.locale);
        locale.removeClass("mask-container");
        locale.children("div.datagrid-mask-msg,div.datagrid-mask").remove();
    };


    //  备注： $.messager 表示当前页面的 easyui-messager 对象；
    //         $.easyui.messager 表示可控顶级页面的 easyui-messager 对象；



    //  更改 jQuery EasyUI 中部分控件的国际化语言显示。
    $.extend($.fn.panel.defaults, { loadingMessage: defaults.loading });
    $.extend($.fn.window.defaults, { loadingMessage: defaults.loading });
    $.extend($.fn.dialog.defaults, { loadingMessage: defaults.loading });

    //  更改 jeasyui-combo 组件的非空验证提醒消息语言。
    $.extend($.fn.combo.defaults, { missingMessage: $.fn.validatebox.defaults.missingMessage });



    //  获取或更改 jQuery EasyUI 部分组件的通用错误提示函数；该方法定义如下重载方式：
    //      function():         获取 jQuery EasyUI 部分组件的通用错误提示函数；
    //      function(callback): 更改 jQuery EasyUI 部分组件的通用错误提示函数；
    //  备注：该方法会设置如下组件的 onLoadError 事件；
    //          easyui-form
    //          easyui-combobox
    //          easyui-combotree
    //          easyui-combogrid
    //          easyui-datagrid
    //          easyui-propertygrid
    //          easyui-tree
    //          easyui-treegrid
    //      同时还会设置 jQuery-ajax 的通用错误事件 error。
    coreEasyui.ajaxError = function (callback) {
      	if (!arguments.length) { return $.fn.form.defaults.onLoadError; }
        $.fn.form.defaults.onLoadError = callback;
        $.fn.combobox.defaults.onLoadError = callback;
        $.fn.combotree.defaults.onLoadError = callback;
        $.fn.combogrid.defaults.onLoadError = callback;
        $.fn.datagrid.defaults.onLoadError = callback;
        $.fn.propertygrid.defaults.onLoadError = callback;
        $.fn.tree.defaults.onLoadError = callback;
        $.fn.treegrid.defaults.onLoadError = callback;
        $.ajaxSetup({ error: callback });
    };

    var onLoadError = function (XMLHttpRequest, textStatus, errorThrown) {
				console.log(textStatus);
        $.messager.progress("close");
        if (coreEasyui.messager != $.messager) { coreEasyui.messager.progress("close"); }
        var msg = (XMLHttpRequest && !$.string.isNullOrWhiteSpace(XMLHttpRequest.responseText) ?
                "如果该问题重复出现，请联系您的系统管理员并反馈该故障。<br />" +
                "错误号：" + XMLHttpRequest.status + "(" + XMLHttpRequest.statusText + ")；<hr />" + XMLHttpRequest.responseText :
                "系统出现了一个未指明的错误，如果该问题重复出现，请联系您的系统管理员并反馈该故障。");
				if(msg.indexOf('lgn-form')>=0){
					coreEasyui.messager.alert("错误提醒", '登录超时，请重新登录！', "error");
					top.location.href=location.href;
					return;
				}
        var win = coreEasyui.messager.alert("错误提醒", msg, "error"),
            opts = win.window("options"), panel = win.window("panel"), width = panel.outerWidth(), height = panel.outerHeight()
						_w=$(window).width()-20,_h=$(window).height()-20;
        if (width<800 || height > _h) { win.window("resize", { width: width < 800 ? 800 : width, height: height > _h ? _h : height }); }
        win.window("center");
    };

    //  更改 jQuery EasyUI 部分组件的通用错误提示。
    coreEasyui.ajaxError(onLoadError);

    //  更改 jQuery.ajax 函数的部分默认属性。
    $.ajaxSetup({
        dataFilter: function (data, type) {
            return $.util.isString(type) && type.toLowerCase(type) == "json" ? $.string.toJSONString(data) : data;
        }
    });


    //  判断当前 jQuery 对象是否是指定名称的已经初始化好的 easyui 插件；该方法定义如下参数：
    //      pluginName：要判断的插件名称，例如 "panel"、"dialog"、"datagrid" 等；
    //  返回值：如果当前 jQuery 对象中的第一个 DOM 元素为 pluginName 参数所示的 easyui 插件且已经被初始化，则返回 true，否则返回 false。
    coreJquery.fn.isEasyUI = function (pluginName) {
        if (!$.array.contains($.parser.plugins, pluginName)) { $.error($.string.format("传入的参数 pluginName: {0} 不是 easyui 插件名。")); }
        if (!this.length) { return false; }
        var state = $.data(this[0], pluginName);
        return state && state.options ? true : false;
    };

    //  判断当前 jQuery 对象是否是指定名称的已经初始化好的 easyui 插件；该方法定义如下参数：
    //      selector:   jQuery 对象选择器，或者 DOM 对象，或者 jQuery 对象均可；
    //      pluginName：要判断的插件名称，例如 "panel"、"dialog"、"datagrid" 等；
    //  返回值：如果 selector 所表示的 jQuery 对象中的第一个 DOM 元素为 pluginName 参数所示的 easyui 插件且已经被初始化，则返回 true，否则返回 false。
    coreEasyui.isEasyUI = function (selector, pluginName) {
        return $.util.parseJquery(selector).isEasyUI(pluginName);
    };



    coreJquery.fn.currentPagination = function () {
        var p = this.closest(".pagination");
        while (p.length && !$.data(p[0], "pagination")) { p = p.parent().closest(".pagination"); }
        return p;
    };

    coreJquery.fn.currentProgressbar = function () {
        var p = this.closest(".progressbar");
        while (p.length && !$.data(p[0], "progressbar")) { p = p.parent().closest(".progressbar"); }
        return p;
    };

    coreJquery.fn.currentPanel = function () {
        var p = this.closest(".panel-body");
        while (p.length && !$.data(p[0], "panel")) { p = p.parent().closest(".panel-body"); }
        return p;
    };

    coreJquery.fn.currentTabPanel = function () {
        var p = this.closest(".panel-body"), panel = p.parent(), panels = panel.parent(), container = panels.parent();
        while (p.length && !($.data(p[0], "panel") && panel.hasClass("panel") && panels.hasClass("tabs-panels") && container.hasClass("tabs-container"))) {
            p = p.parent().closest(".panel-body");
            panel = p.parent();
            panels = panel.parent();
            container = panels.parent();
        }
        return p;
    };

    coreJquery.fn.currentTabIndex = function () {
        var panel = this.currentTabPanel();
        return panel.length ? panel.panel("panel").index() : -1;
    };

    coreJquery.fn.currentTabs = function () {
        var p = this.closest(".tabs-container");
        while (p.length && !$.data(p[0], "tabs")) { p = p.parent().closest(".tabs-container"); }
        return p;
    };

    coreJquery.fn.currentAccordion = function () {
        var p = this.closest(".accordion");
        while (p.length && !$.data(p[0], "accordion")) { p = p.parent().closest(".accordion"); }
        return p;
    };

    coreJquery.fn.currentAccPanel = function () {
        var p = this.closest(".panel-body"), panel = p.parent(), container = panels.parent();
        while (p.length && !($.data(p[0], "panel") && panel.hasClass("panel") && container.hasClass("accordion") && $.data(container[0], "accordion"))) {
            p = p.parent().closest(".panel-body");
            panel = p.parent();
            container = panels.parent();
        }
        return p;
    };

    coreJquery.fn.currentLayout = function () {
        var layout = this.closest(".layout");
        while (layout.length && !$.data(layout[0], "layout")) { layout = layout.closest(".layout"); }
        return layout;
    };

    coreJquery.fn.currentRegion = function () {
        var p = this.closest(".panel.layout-panel"), layout = p.parent(), body = p.children(".panel-body");
        while (p.length && !(layout.hasClass("layout") && $.data(body[0], "panel"))) {
            p = p.parent().closest(".panel.layout-panel");
            layout = p.parent();
            body = p.children(".panel-body");
        }
        return body;
    };

    coreJquery.fn.currentLinkbutton = function () {
        var btn = this.closest(".l-btn");
        while (btn.length && !$.data(btn[0], "linkbutton")) { btn = btn.parent().closest(".layout"); }
        return btn;
    };

    coreJquery.fn.currentCalendar = function () {
        var c = this.closest(".calendar");
        while (c.length && !$.data(c[0], "calendar")) { c = c.parent().closest(".calendar"); }
        return c;
    };

    coreJquery.fn.currentWindow = function () {
        var p = this.closest(".panel-body.window-body");
        while (p.length && !$.data(p[0], "window")) { p = c.parent().closest(".panel-body.window-body"); }
        return p;
    };

    coreJquery.fn.currentDialog = function () {
        var p = this.closest(".panel-body.window-body");
        while (p.length && !$.data(p[0], "dialog")) { p = c.parent().closest(".panel-body.window-body"); }
        return p;
    };

    coreJquery.fn.currentDatagrid = function () {
        var p = this.closest(".datagrid-wrap.panel-body"), dg = p.find(">.datagrid-view>eq(2)");
        while (p.length && !$.data(dg[0], "datagrid")) {
            p = p.parent().closest(".datagrid-wrap.panel-body");
            dg = p.find(">.datagrid-view>eq(2)");
        }
        return dg;
    };

    coreJquery.fn.currentPropertygrid = function () {
        var p = this.closest(".datagrid-wrap.panel-body"), pg = p.find(">.datagrid-view>eq(2)");
        while (p.length && !$.data(pg[0], "propertygrid")) {
            p = p.parent().closest(".datagrid-wrap.panel-body");
            pg = p.find(">.datagrid-view>eq(2)");
        }
        return pg;
    };

    coreJquery.fn.currentTree = function () {
        var t = this.closest(".tree");
        while (t.length && !$.data(t[0], "tree")) { t = t.parent().closest(".tree"); }
        return t;
    };

    coreJquery.fn.currentTreegrid = function () {
        var p = this.closest(".datagrid-wrap.panel-body"), tg = p.find(">.datagrid-view>eq(2)");
        while (p.length && !$.data(tg[0], "treegrid")) {
            p = p.parent().closest(".datagrid-wrap.panel-body");
            tg = p.find(">.datagrid-view>eq(2)");
        }
        return tg;
    };



    $.union(coreJquery);
    $.fn.union(coreJquery.fn);

    var css =
        ".mask-container { position: relative; }";
    $.util.addCss(css);
})(jQuery);

(function ($, undefined) {

    /**
    * initialize the target menu, the function can be invoked only once
    */
    function init(target) {
        var t = $(target).appendTo('body').addClass('menu-top');

        $(document).unbind('.menu').bind('mousedown.menu', function (e) {
            var allMenu = $('body>div.menu:visible');
            var m = $(e.target).closest('div.menu', allMenu);
            if (m.length) { return }
            $('body>div.menu-top:visible').menu('hide');
        });

        var menus = splitMenu(t);
        for (var i = 0; i < menus.length; i++) { createMenu(menus[i]); }

        function splitMenu(menu) {
            var menus = [];
            menu.addClass('menu');
            menus.push(menu);
            if (!menu.hasClass('menu-content')) {
                menu.children('div').each(function () {
                    var submenu = $(this).children('div');
                    if (submenu.length) {
                        submenu.insertAfter(target);
                        this.submenu = submenu; 	// point to the sub menu
                        var mm = splitMenu(submenu);
                        menus = menus.concat(mm);
                    }
                });
            }
            return menus;
        }

        function createMenu(menu) {
            var width = $.parser.parseOptions(menu[0], ['width']).width;
            if (menu.hasClass('menu-content')) {
                menu[0].originalWidth = width || menu._outerWidth();
            } else {
                menu[0].originalWidth = width || 0;
                menu.children('div').each(function () {
                    var item = $(this);
                    if (item.hasClass('menu-sep')) {
                        //item.html('&nbsp;');
                    } else {
                        //var itemOpts = $.extend({}, $.parser.parseOptions(this, ['name', 'iconCls', 'href']), {
                        //  注释掉上一行代码，并添加了下一行代码，以实现获取 menu-item 的属性 hideOnClick，该参数表示是否在点击菜单项后菜单自动隐藏
                        var itemOpts = $.extend({ hideOnClick: true }, $.parser.parseOptions(this, ['name', 'iconCls', 'href', { hideOnClick: 'boolean'}]), {
                            disabled: (item.attr('disabled') ? true : undefined)
                        });
                        item[0].itemName = itemOpts.name || '';
                        item[0].itemHref = itemOpts.href || '';

                        //  添加了下一行代码，以实现将 menu-item 的 hideOnClick 绑定到菜单项上
                        item[0].hideOnClick = (itemOpts.hideOnClick == undefined || itemOpts.hideOnClick == null ? true : itemOpts.hideOnClick);

                        var text = item.addClass('menu-item').html();
                        item.empty().append($('<div class="menu-text"></div>').html(text));
                        if (itemOpts.iconCls) {
                            $('<div class="menu-icon"></div>').addClass(itemOpts.iconCls).appendTo(item);
                        }
                        if (itemOpts.disabled) {
                            setDisabled(target, item[0], true);
                        }
                        if (item[0].submenu) {
                            $('<div class="menu-rightarrow"></div>').appendTo(item); // has sub menu
                        }

                        bindMenuItemEvent(target, item);
                    }
                });
                $('<div class="menu-line"></div>').prependTo(menu);
            }
            setMenuWidth(target, menu);
            menu.hide();

            bindMenuEvent(target, menu);
        }
    }

    function setMenuWidth(target, menu) {
        var opts = $.data(target, 'menu').options;
        var d = menu.css('display');
        menu.css({
            display: 'block',
            left: -10000
        });

        //  menu.find('div.menu-item')._outerHeight(22);
        var width = 0;
        menu.find('div.menu-text').each(function () {
            var item = $(this);
            if (width < item._outerWidth()) {
                width = item._outerWidth();
            }
            item.closest('div.menu-item')._outerHeight(item._outerHeight() + 2);
        });
        width += 65;
        menu._outerWidth(Math.max((menu[0].originalWidth || 0), width, opts.minWidth));

        menu.css('display', d);
    }

    /**
    * bind menu event
    */
    function bindMenuEvent(target, menu) {
        //var state = $.data(target, 'menu');
        //  注释掉上一行代码代码，并添加下面两行代码，以实现当菜单的 hideOnMouseLeave: true 时，鼠标移出菜单控件时才自动隐藏，否则则是在菜单失去焦点后才隐藏。
        var state = $.data(target, 'menu'), opts = state.options;
        if (!opts.hideOnMouseLeave) { return; };

        menu.unbind('.menu').bind('mouseenter.menu', function () {
            if (state.timer) {
                clearTimeout(state.timer);
                state.timer = null;
            }
        }).bind('mouseleave.menu', function () {
            state.timer = setTimeout(function () {
                hideAll(target);
            }, 100);
        });
    }

    /**
    * bind menu item event
    */
    function bindMenuItemEvent(target, item) {
        item.unbind('.menu');
        item.bind('click.menu', function () {
            var t = $(this);
            if (t.hasClass('menu-item-disabled')) { return; }
            // only the sub menu clicked can hide all menus
            if (!this.submenu) {
                //hideAll(target);
                //  注释掉上面一行代码，并添加下面一行代码，以实现当 menu-item 的属性 hideOnClick 为 false 的情况下，点击菜单项不自动隐藏菜单控件。
                if (this.hideOnClick) { hideAll(target); }

                var href = t.attr('href');
                if (href) {
                    location.href = href;
                }
            }
            var item = $(target).menu('getItem', this);
            $.data(target, 'menu').options.onClick.call(target, item);
        }).bind('mouseenter.menu', function (e) {
            // hide other menu
            item.siblings().each(function () {
                if (this.submenu) {
                    hideMenu(this.submenu);
                }
                $(this).removeClass('menu-active');
            });
            // show this menu
            item.addClass('menu-active');

            if ($(this).hasClass('menu-item-disabled')) {
                item.addClass('menu-active-disabled');
                return;
            }

            var submenu = item[0].submenu;
            if (submenu) {
                $(target).menu('show', {
                    menu: submenu,
                    parent: item
                });
            }
        }).bind('mouseleave.menu', function (e) {
            item.removeClass('menu-active menu-active-disabled');
            var submenu = item[0].submenu;
            if (submenu) {
                if (e.pageX >= parseInt(submenu.css('left'))) {
                    item.addClass('menu-active');
                } else {
                    hideMenu(submenu);
                }

            } else {
                item.removeClass('menu-active');
            }
        });
    }

    /**
    * hide top menu and it's all sub menus
    */
    function hideAll(target) {
        var state = $.data(target, 'menu');
        if (state) {
            if ($(target).is(':visible')) {
                hideMenu($(target));
                state.options.onHide.call(target);
            }
        }
        return false;
    }

    /**
    * show the menu, the 'param' object has one or more properties:
    * left: the left position to display
    * top: the top position to display
    * menu: the menu to display, if not defined, the 'target menu' is used
    * parent: the parent menu item to align to
    * alignTo: the element object to align to
    */
    function showMenu(target, param) {
        var left, top;
        param = param || {};
        var menu = $(param.menu || target);
        if (menu.hasClass('menu-top')) {
            var opts = $.data(target, 'menu').options;
            $.extend(opts, param);
            left = opts.left;
            top = opts.top;
            if (opts.alignTo) {
                var at = $(opts.alignTo);
                left = at.offset().left;
                top = at.offset().top + at._outerHeight();
            }
            //  if (param.left != undefined) { left = param.left }
            //  if (param.top != undefined) { top = param.top }
            if (left + menu.outerWidth() > $(window)._outerWidth() + $(document)._scrollLeft()) {
                left = $(window)._outerWidth() + $(document).scrollLeft() - menu.outerWidth() - 5;
            }
            if (top + menu.outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                top -= menu.outerHeight();
            }
        } else {
            var parent = param.parent; // the parent menu item
            left = parent.offset().left + parent.outerWidth() - 2;
            if (left + menu.outerWidth() + 5 > $(window)._outerWidth() + $(document).scrollLeft()) {
                left = parent.offset().left - menu.outerWidth() + 2;
            }
            var top = parent.offset().top - 3;
            if (top + menu.outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                top = $(window)._outerHeight() + $(document).scrollTop() - menu.outerHeight() - 5;
            }
        }
        menu.css({ left: left, top: top });
        menu.show(0, function () {
            if (!menu[0].shadow) {
                menu[0].shadow = $('<div class="menu-shadow"></div>').insertAfter(menu);
            }
            menu[0].shadow.css({
                display: 'block',
                zIndex: $.fn.menu.defaults.zIndex++,
                left: menu.css('left'),
                top: menu.css('top'),
                width: menu.outerWidth(),
                height: menu.outerHeight()
            });
            menu.css('z-index', $.fn.menu.defaults.zIndex++);
            if (menu.hasClass('menu-top')) {
                $.data(menu[0], 'menu').options.onShow.call(menu[0]);
            }
        });
    }

    function hideMenu(menu) {
        if (!menu) return;

        hideit(menu);
        menu.find('div.menu-item').each(function () {
            if (this.submenu) {
                hideMenu(this.submenu);
            }
            $(this).removeClass('menu-active');
        });

        function hideit(m) {
            m.stop(true, true);
            if (m[0].shadow) {
                m[0].shadow.hide();
            }
            m.hide();
        }
    }

    function findItem(target, text) {
        var result = null;
        var tmp = $('<div></div>');
        function find(menu) {
            menu.children('div.menu-item').each(function () {
                var item = $(target).menu('getItem', this);
                var s = tmp.empty().html(item.text).text();
                if (text == $.trim(s)) {
                    result = item;
                } else if (this.submenu && !result) {
                    find(this.submenu);
                }
            });
        }
        find($(target));
        tmp.remove();
        return result;
    }

    function setDisabled(target, itemEl, disabled) {
        var t = $(itemEl);

        if (disabled) {
            t.addClass('menu-item-disabled');
            if (itemEl.onclick) {
                itemEl.onclick1 = itemEl.onclick;
                itemEl.onclick = null;
            }
        } else {
            t.removeClass('menu-item-disabled');
            if (itemEl.onclick1) {
                itemEl.onclick = itemEl.onclick1;
                itemEl.onclick1 = null;
            }
        }
    }

    function appendItem(target, param) {
        var menu = $(target);
        if (param.parent) {
            if (!param.parent.submenu) {
                var submenu = $('<div class="menu"><div class="menu-line"></div></div>').appendTo('body');
                submenu.hide();
                param.parent.submenu = submenu;
                $('<div class="menu-rightarrow"></div>').appendTo(param.parent);
            }
            menu = param.parent.submenu;
        }
        var item = $('<div class="menu-item"></div>').appendTo(menu);
        $('<div class="menu-text"></div>').html(param.text).appendTo(item);
        if (param.iconCls) $('<div class="menu-icon"></div>').addClass(param.iconCls).appendTo(item);
        if (param.id) item.attr('id', param.id);
        //  if (param.href) item.attr('href', param.href);
        //  if (param.name) item.attr('name', param.name);
        if (param.name) { item[0].itemName = param.name }
        if (param.href) { item[0].itemHref = param.href }
        if (param.onclick) {
            if (typeof param.onclick == 'string') {
                item.attr('onclick', param.onclick);
            } else {
                item[0].onclick = eval(param.onclick);
            }
        }
        if (param.handler) item[0].onclick = eval(param.handler);

        bindMenuItemEvent(target, item);

        if (param.disabled) {
            setDisabled(target, item[0], true);
        }
        bindMenuEvent(target, menu);
        setMenuWidth(target, menu);
    }

    function removeItem(target, itemEl) {
        function removeit(el) {
            if (el.submenu) {
                el.submenu.children('div.menu-item').each(function () {
                    removeit(this);
                });
                var shadow = el.submenu[0].shadow;
                if (shadow) shadow.remove();
                el.submenu.remove();
            }
            $(el).remove();
        }
        removeit(itemEl);
    }

    function destroyMenu(target) {
        $(target).children('div.menu-item').each(function () {
            removeItem(target, this);
        });
        if (target.shadow) target.shadow.remove();
        $(target).remove();
    }

    $.fn.menu = function (options, param) {
        if (typeof options == 'string') { return $.fn.menu.methods[options](this, param); }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, 'menu');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'menu', { options: $.extend({}, $.fn.menu.defaults, $.fn.menu.parseOptions(this), options) });
                init(this);
            }
            $(this).css({ left: state.options.left, top: state.options.top });
        });
    };

    $.fn.menu.methods = {
        options: function (jq) { return $.data(jq[0], 'menu').options; },
        show: function (jq, pos) { return jq.each(function () { showMenu(this, pos); }); },
        hide: function (jq) { return jq.each(function () { hideAll(this); }); },
        destroy: function (jq) { return jq.each(function () { destroyMenu(this); }); },
        setText: function (jq, param) { return jq.each(function () { $(param.target).children('div.menu-text').html(param.text); }); },
        setIcon: function (jq, param) {
            return jq.each(function () {
                var item = $(this).menu('getItem', param.target);
                if (item.iconCls) {
                    $(item.target).children('div.menu-icon').removeClass(item.iconCls).addClass(param.iconCls);
                } else {
                    $('<div class="menu-icon"></div>').addClass(param.iconCls).appendTo(param.target);
                }
            });
        },
        getItem: function (jq, itemEl) {
            var t = $(itemEl);
            var item = {
                target: itemEl,
                id: t.attr('id'),
                text: $.trim(t.children('div.menu-text').html()),
                disabled: t.hasClass('menu-item-disabled'),
                //  href: t.attr('href'),
                //  name: t.attr('name'),
                name: itemEl.itemName,
                href: itemEl.itemHref,
                //  增加下面一行代码，使得通过 getItem 方法返回的 menu-item 中包含其 hideOnClick 属性
                hideOnClick: itemEl.hideOnClick,
                onclick: itemEl.onclick
            }
            var icon = t.children('div.menu-icon');
            if (icon.length) {
                var cc = [];
                var aa = icon.attr('class').split(' ');
                for (var i = 0; i < aa.length; i++) {
                    if (aa[i] != 'menu-icon') {
                        cc.push(aa[i]);
                    }
                }
                item.iconCls = cc.join(' ');
            }
            return item;
        },
        findItem: function (jq, text) { return findItem(jq[0], text); },
        appendItem: function (jq, param) { return jq.each(function () { appendItem(this, param); }); },
        removeItem: function (jq, itemEl) { return jq.each(function () { removeItem(this, itemEl); }); },
        enableItem: function (jq, itemEl) { return jq.each(function () { setDisabled(this, itemEl, false); }); },
        disableItem: function (jq, itemEl) { return jq.each(function () { setDisabled(this, itemEl, true); }); }
    };

    $.fn.menu.parseOptions = function (target) {
        return $.extend({}, $.parser.parseOptions(target, ['left', 'top', { minWidth: 'number', hideOnMouseLeave: "boolean"}]));
    };

    $.fn.menu.defaults = {
        zIndex: 110000, left: 0, top: 0, minWidth: 120,
        onShow: function () { },
        onHide: function () { },
        onClick: function (item) { },

        //  添加 easyui-menu 的自定义扩展属性；表示是否当鼠标移出菜单时，才菜单自动隐藏，默认为 true。
        hideOnMouseLeave: true
    };












    var buildMenu = function (options) {
        var guid = $.util.guid("N", 12), id = "easyui_menu_id_" + guid, name = "easyui_menu_name_" + guid;
        var opts = $.extend({}, $.fn.menu.defaults, {
            id: id, name: name, left: window.event ? window.event.clientX : 0, top: window.event ? window.event.clientY : 0,
            items: null, hideDisabledMenu: false, hideOnMouseLeave: false, minWidth: 140
        }, options || {});
        opts.items = $.array.isArray(opts.items) ? opts.items : [];
        var menu = $("<div></div>").attr({ id: id, name: name }).appendTo("body");
        if (!opts.items.length) { opts.items.push({ text: "当前无菜单项", disabled: true }); }
        $.each(opts.items, function (i, item) {
            if (opts.hideDisabledMenu && item.disabled) { return; } appendItemToMenu(menu, item, id, menu);
        });
        return { menu: menu, options: opts };
    };

    var appendItemToMenu = function (menu, item, id, menus) {
        if ($.util.isString(item) && $.trim(item) == "-") { $("<div></div>").addClass("menu-sep").appendTo(menu); return; }
        var guid = $.util.guid("N", 12), itemId = id + "_" + guid;
        item = item || {};
        item = $.extend({
            id: itemId, text: "", iconCls: null, href: null, disabled: false,
            onclick: null, handler: null, bold: false, style: null,
            children: null, hideDisabledMenu: false, hideOnClick: true
        }, item);
        var onclick = item.onclick, handler = item.handler;
        item.onclick = undefined; item.handler = undefined;
        item = $.util.parseMapFunction(item);
        item.onclick = onclick; item.handler = handler;
        if (item.hideDisabledMenu && item.disabled) { return; }
        var itemEle = $("<div></div>").attr({
            id: item.id, iconCls: item.iconCls, href: item.href, disabled: item.disabled, hideOnClick: item.hideOnClick
        }).appendTo(menu);
        if (item.style) { itemEle.css(item.style); }
        if ($.isFunction(item.handler)) {
            var handler = item.handler;
            item.onclick = function (e, item, menus) { handler.call(this, e, item, menus); };
        }
        if ($.isFunction(item.onclick)) {
            itemEle.click(function (e) {
                if (itemEle.hasClass("menu-item-disabled")) { return; }
                item.onclick.call(this, e, item, menus);
            });
        }
        var hasChild = item.children && item.children.length ? true : false, span = $("<span></span>").text(item.text).appendTo(itemEle);
        if (item.bold) { span.css("font-weight", "bold"); }
        if (hasChild) {
            var itemNode = $("<div></div>").appendTo(itemEle);
            $.each(item.children, function (i, n) {
                var val = $.util.isString(n) && $.trim(n) == "-" ? n : $.extend({ hideDisabledMenu: item.hideDisabledMenu }, n);
                appendItemToMenu(itemNode, val, itemId, menus);
            });
        }
    };



    $.extend($.easyui, {

        //  根据指定的属性创建 easyui-menu 对象；该方法定义如下参数：
        //      options: JSON 对象类型，参数属性继承 easyui-menu 控件的所有属性和事件（参考官方 API 文档），并在此基础上增加了如下参数：
        //          id: 一个 String 对象，表示创建的菜单对象的 ID 属性，如果不定义该参数，将会分配一个随机值。
        //          name: 一个 String 对象，表示创建的菜单对象的 name 属性，如果不定义该参数，将会分配一个随机值。
        //          hideDisabledMenu: 一个 Boolean 值，默认为 false；该属性表示当菜单项的 disabled: true，是否自动隐藏该菜单项；
        //          items: 一个 Array 对象，该数组对象中的每一个元素都是一个 JSON 格式对象用于表示一个 menu item （关于 menu item 对象属性，参考官方 API）；
        //                  该数组中每个元素的属性，除 easyui-menu 中 menu item 官方 API 定义的属性外，还增加了如下属性：
        //              hideDisabledMenu: 该属性表示在当前子菜单级别下当菜单项的 disabled: true，是否自动隐藏该菜单项；一个 Boolean 值，取上一级的 hideDisabledMenu 值；
        //              handler: 一个回调函数，表示点击菜单项时触发的事件；
        //                  回调函数 handler 和回调函数 onclick 的签名都为 function(e, item, menu)，其中：
        //                      e:  表示动作事件；
        //                      item:   表示当前点击的菜单项的 options 选项；
        //                      menu:   表示整个菜单控件的 jQuery 对象。
        //                      函数中 this 指向触发事件的对象本身
        //                  另，如果同时定义了 onclick 和 handler，则只处理 handler 而不处理 onclick，所以请不要两个回调函数属性同时使用。
        //              children: 同上一级对象的 items 属性，为一个 Array 对象；
        //  返回值：返回一个 JSON 格式对象，该返回的对象中具有如下属性：
        //      menu: 依据于传入参数 options 构建出的菜单 DOM 元素对象，这是一个 jQuery 对象，该对象未初始化为 easyui-menu 控件，而只是具有该控件的 DOM 结构；
        //      options: 传入参数 options 解析后的结果，该结果尚未用于但可用于初始化 menu 元素。
        createMenu: buildMenu,

        //  根据指定的属性创建 easyui-menu 对象并立即显示出来；该方法定义的参数和本插件文件中的插件方法 createMenu 相同：
        //  注意：本方法与 createMenu 方法不同之处在于：
        //      createMenu: 仅根据传入的 options 参数创建出符合 easyui-menu DOM 结构要求的 jQuery DOM 对象，但是该对象并未初始化为 easyui-menu 控件；
        //      showMenu: 该方法在 createMenu 方法的基础上，对创建出来的 jQuery DOM 对象立即进行 easyui-menu 结构初始化，并显示出来。
        //  返回值：返回一个 jQuery 对象，该对象表示创建并显示出的 easyui-menu 元素，该返回的元素已经被初始化为 easyui-menu 控件。
        showMenu: function (options) {
            var opts = options || {};
            var onHide1 = $.fn.menu.defaults.onHide, onHide2 = opts.onHide;
            opts.onHide = function () {
                var m = $.util.parseJquery(this);
                if ($.isFunction(onHide1)) { onHide1.apply(this, arguments); }
                if ($.isFunction(onHide2)) { onHide2.apply(this, arguments); }
                $.util.call(function () { m.menu("destroy"); });
            };
            var m = buildMenu(opts);
            m.menu.menu(m.options).menu("show", { left: m.options.left, top: m.options.top });
            return m.menu;
        }
    });

    //  另，增加 easyui-menu 控件中 menu-item 的如下自定义扩展属性:
    //      hideOnClick:    Boolean 类型值，默认为 true；表示点击该菜单项后整个菜单是否会自动隐藏；
    //      bold:           Boolean 类型值，默认为 false；表示该菜单项是否字体加粗；
    //      style:          JSON-Object 类型值，默认为 null；表示要附加到该菜单项的样式；
    //  备注：上述增加的 menu-item 的自定义扩展属性，只有通过 $.easyui.createMenu 或者 $.easyui.showMenu 生成菜单时，才有效。

})(jQuery);