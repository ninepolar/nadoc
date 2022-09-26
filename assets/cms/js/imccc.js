; (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.imccc = factory());
})(this, (function () {
    'use strict';
    const VERSION = '1.0.0'
        , NAME = 'imccc'
        , toType = obj => {
            if (obj === null || obj === undefined) {
                return `${obj}`;
            }
            return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
        }
        , getjQuery = () => {
            const { jQuery } = window;
            if (jQuery && !document.body.hasAttribute('data-imccc-no-jquery')) {
                return jQuery;
            }
            return null;
        }
        , execute = callback => {
            if (typeof callback === 'function') {
                callback();
            }
        };

    /*  */
    //冻结对象，一个被冻结的对象再也不能被修改。可以使用Object.freeze提升性能
    var emptyObject = Object.freeze({});

    //判断未定义
    function isUndef(v) {
        return v === undefined || v === null
    }
    //判断已定义
    function isDef(v) {
        return v !== undefined && v !== null
    }

    function isTrue(v) {
        return v === true
    }

    function isFalse(v) {
        return v === false
    }

    /**
     *  判断为原始类型
     */
    function isPrimitive(value) {
        return (
            typeof value === 'string' ||
            typeof value === 'number' ||
            // $flow-disable-line
            typeof value === 'symbol' ||
            typeof value === 'boolean'
        )
    }

    // 判断为对象
    function isObject(obj) {
        return obj !== null && typeof obj === 'object'
    }

    /**
     * 获取值的原始类型字符串，例如，[对象]
     */
    var _toString = Object.prototype.toString;
    // 切割引用类型得到后面的基本类型，例如：[object RegExp] 得到的就是 RegExp
    function toRawType(value) {
        return _toString.call(value).slice(8, -1)
    }

    //判断纯粹的对象："纯粹的对象"，就是通过 {}、new Object()、Object.create(null) 创建的对象
    function isPlainObject(obj) {
        return _toString.call(obj) === '[object Object]'
    }
    // 判断原生引用类型
    function isRegExp(v) {
        return _toString.call(v) === '[object RegExp]'
    }

    /**
     * 检查val是否是有效的数组索引，验证是否是一个非无穷大的正整数。
     */
    function isValidArrayIndex(val) {
        var n = parseFloat(String(val));
        return n >= 0 && Math.floor(n) === n && isFinite(val)
    }
    // 判断是否是Promise
    function isPromise(val) {
        return (
            isDef(val) &&
            typeof val.then === 'function' &&
            typeof val.catch === 'function'
        )
    }
    /**
     * 将类似数组的对象转换为实数组
     */
    function toArray(list, start) {
        start = start || 0;
        var i = list.length - start;
        var ret = new Array(i);
        while (i--) {
            ret[i] = list[i + start];
        }
        return ret
    }

    /**
     *  将多个属性插入目标的对象
     */
    function extend(to, _from) {
        for (var key in _from) {
            to[key] = _from[key];
        }
        return to
    }
    class imccc {


    }

}));

// var $ = function (selector) {
//     return document.querySelectorAll(selector);
// }
// 'use strict';
// (function ($, window, document, undefined) {
//     var pluginName = "imccc"
//         , defaults = {  
//         };
//     function Plugin(element, options) {
//         this.element = $(element);
//         this.settings = $.extend({}, defaults, options);
//         this._defaults = defaults;
//         this._name = pluginName;
//         this.init();
//     }

//     Plugin.prototype = {};

//     $.fn[pluginName] = function (options) {
//         let pluginName = new Plugin(this, options);
//         return pluginName;
//     };

// })(jQuery, window, document);


// $.when(

// ).done(function () {

// });