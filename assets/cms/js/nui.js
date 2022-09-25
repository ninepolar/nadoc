'use strict';
(function ($, window, document, undefined) {
    var pluginName = "nui"
        , defaults = {
            lssinfo: "不支持LocalStorage",
            //api base url
            apiBaseUrl: "http://localhost:8080/api/"
            //loadfile base url
            , base: '/ins/' //静态文件基址
            //temple
            , templateRule: /\{\{([^\}\}]+)?\}\}/g
            , templateReExp: /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g
            , username: ''
            , password: ''
        };
    function Plugin(element, options) {
        this.element = $(element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this._version = '1.0';
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            console.info(this._name + " V" + this._version + " From:" + this.settings.base)
            //页右菜单
            if ("undefined" != typeof this.settings.minimenu && this.settings.minimenu == true) {
                this.mmenu();
            }
            this.doscroll();
            this.codelight();
            this.cap();
            this.qrc();
        },

        //动态加载js/css文件
        nload: function (file, callback) {
            var obj = this
                , files = typeof file == "string" ? [file] : file
                , fp = /[(\\)(\/)(\)]+/;
            files.forEach(ff => {
                var m = RegExp(fp).test(ff);//是否包含/\,true 表示使用了绝去路径 false表示是相对路径，需要要自已拼接
                var name = ff.replace(/^\s|\s$/g, "")
                    , att = name.split('.')
                    , ext = att[att.length - 1].toLowerCase()
                    , isCSS = ext == "css"
                    , tag = isCSS ? "link" : "script"
                    , attr = isCSS ? " rel='stylesheet' " : " "
                    , link = m ? ((isCSS ? "href" : "src") + "='" + name + "'") : ((isCSS ? "href" : "src") + "='" + obj.settings.base + att[0] + "/" + name + "'");
                if ($(tag + "[" + link + "]").length == 0) $("head").append("<" + tag + attr + link + "></" + tag + ">");
            });
            if (callback) {
                callback();
            }

        },
        //提示框
        msg: function (value = 'NUI') {
            var timer = null;
            clearTimeout(timer); //清楚定时器
            $('[name="msg"]').remove(); //移除提示框
            var tip = //设置提示框内容
                `<div name="msg"  style="z-index:999999999;width: 100%;position: fixed;top: 40%;left:0;text-align: center;">
                <span style="display: inline-block;background-color: #333;font-size: 14px;color: #fff;padding: 6px 15px;border-radius: 10px;padding:15px 20px;max-width:200px">
                ${value}</span></div>`;
            $('body').append(tip);//添加提示框
            timer = setTimeout(function () {
                $('[name="msg"]').fadeOut(1000, function () {
                    $('[name="msg"]').remove();//移除提示框
                });
            }, 1500);
        },
        //ajax封装
        njax: function (d) {
            var self = this
                , url = self.settings.apiBaseUrl + d.url        //api地址
                , async = d.async || false                       //异步                         
                , type = d.type || "get"                        //请求类型
                , dataType = d.dataType || 'json'               //数据类型
                , timeout = d.timeout || 10000                  //超时时间
                , data = d.param || {}                          //参数
                , callback = d.callback || function () { }      //回调函数
                , du = d.username || self.settings.username     //用户名
                , dp = d.password || self.settings.password     //密码
            console.log("post data", d);
            $.ajax({
                url: url,
                data: data,
                type: type,
                cache: true,
                async: async,
                dataType: dataType,
                timeout: timeout,
                beforseSend: function (xhr) {
                    if (du.length > 0 && dp.length > 0) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(du + ":" + dp));
                    }
                },
                success: function (res) {
                    callback(res);
                },
                error: function (err) {
                    console.log("njax_error", err);
                },
                complete: function (xhr, status) {
                    console.log("njax_complete", xhr, status);
                }
            });
        },

        //html编码
        nhtml: function (str, m = 'e') {
            if (str) {
                switch (m) {
                    case 'e':
                        return $('<div />').text(str).html();
                        break;
                    case 'd':
                        return $('<div />').html(str).text();
                        break;
                    default:
                        return '';
                        break;
                }
            } else {
                return '';
            }
        },

        //模板
        ntpl: function (tpl, options) {
            var tt = this
                , reRule = tt.settings.templateRule
                , reExp = tt.settings.templateReExp
                , code = 'var r=[];\n'
                , cursor = 0
                , match
                , adds = function (line, js) {
                    js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                        (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
                    return adds;
                }
            while (match = reRule.exec(tpl)) {
                adds(tpl.slice(cursor, match.index))(match[1], true);
                cursor = match.index + match[0].length;
            }
            adds(tpl.substr(cursor, tpl.length - cursor));
            code += 'return r.join("");';
            console.info(code);
            return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
        },

        //读取url参数
        nparam: function (key, mode = false) {
            let url = window.location.href

            let p = url.split('?')[1]

            let params = new URLSearchParams(p)
            return params.get(key)
        },

        //GUID
        guid: function () {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        },

        //localStroreage
        _lSS: function () {
            return (('localStorage' in window) && window['localStorage'] !== null)
        },
        readLS: function (el) {
            if (this._lSS) {
                localStorage.getItem(el)
            }
        },
        wirteLSS: function (el, val) {
            if (this._lSS) {
                localStorage.setItem(el, val)
            }
        },
        removeLSS: function (el) {
            if (this._lSS) {
                localStorage.removeItem(el)
            }
        },
        clearLSS: function (el) {
            if (this._lSS) {
                localStorage.clear()
            }
        },
        //执行双击滚屏
        dbscroll: function () {
            var t;
            $('html body').on('dblclick', function () {
                t = setInterval('scrollBy(0,1)', 35)
            })
            $('html body').on('click', function () {
                clearInterval(t)
            })
        },

        //清除所有定时器
        clearAllInterval: function () {
            var highestTimeoutId = setInterval(";");
            for (var i = 0; i < highestTimeoutId; i++) {
                console.log(highestTimeoutId)
                clearInterval(i);
            }
        },

        //迷你菜单
        mmenu: function () {
            if ($('#minimenu').length <= 0) {
                var menutpl = `<div id="minimenu" class="position-fixed bottom-0 end-0 me-3 mb-5" style="z-index:9999999999"></div >`;
                $('body').prepend(menutpl);
            }
        },

        //代码高亮
        codelight: function () {
            if ("undefined" != typeof this.settings.prettify && this.settings.prettify == true) {
                this.nload(['prettify.css', 'prettify.js'])
                $('pre').addClass('prettyprint linenums'); prettyPrint()
                $('nocode').addClass('badge bg-light border border-secondary px-2')
            }
        },

        //生成二维码
        qrc: function () {
            if ("undefined" != typeof this.settings.qrcode && this.settings.qrcode == true) {
                if ($('#minimenu').length <= 0) {
                    mmenu()
                }
                this.nload(['qrcode.js']);
                if ($('#qrcode').length <= 0) {
                    var qrcodetpl = `<div class="mb-1"><a href="javascript:;" class="btn btn-outline-secondary btn-sm" id="qrcode" title="二维码"><i class="bi bi-qr-code"></i></a></div>`;
                    var qc = `<div id="qrcodebody" class="mx-3 sticky-top end-0 z-index-1500 "></div>`;
                    $('#minimenu').prepend(qrcodetpl);
                    $('#minimenu').prepend(qc);
                }
                $('#qrcodebody').qrcode({
                    width: 100,
                    height: 100,
                    text: window.location.href
                }).hide().addClass('position-absolute end-0 me-5 z-index-1500');
                $('#qrcode').click(function () {
                    $('#qrcodebody').toggle();
                })
            }

        },
        //整页截图
        cap: function () {
            if ("undefined" != typeof this.settings.capture && this.settings.capture == true) {
                if ($('#minimenu').length <= 0) {
                    this.mmenu
                }

                if ($('#capture').length <= 0) {
                    var capturetpl = `<div class="mb-1">
            <a href="javascript:;" class="btn btn-outline-secondary btn-sm" id="capture" title="截图"> <i class="bi bi-camera"></i></i></a>
            </div>`;
                    $('#minimenu').prepend(capturetpl);
                }
                this.nload(['/vendor/canvas/html2canvas.min.js', '/vendor/canvas/canvas2image.js'])
                $("#capture").on('click', function () {
                    var filename = "__capture__" + Math.ceil(Math.random() * 1000);
                    var domel = $('#htmlcapture').length > 0 ? $('#htmlcapture')[0] : $('body')[0];
                    $('*').removeClass('shadow')
                    var opts = {
                        // scale: 1, // 添加的scale 参数
                        //canvas: canvas, //自定义 canvas
                        logging: false, //日志开关，便于查看html2canvas的内部执行流程
                        //width: width, //dom 原始宽度
                        //height: height,
                        useCORS: true, // 【重要】开启跨域配置
                        // width: domel.offsetWidth,
                        // height: domel.offsetHeight,
                        allowTaint: true, // 【重要】开启画布污染
                    };

                    html2canvas(domel, opts).then(canvas => {
                        //document.body.appendChild(canvas)
                        // canvas宽度
                        var canvasWidth = domel.offsetWidth;
                        // canvas高度
                        var canvasHeight = domel.offsetHeight;
                        console.log(canvasHeight, canvasWidth);

                        // 调用Canvas2Image插件
                        // var img = Canvas2Image.convertToImage(canvas, canvasWidth, canvasHeight);
                        // 调用Canvas2Image插件
                        Canvas2Image.saveAsImage(canvas, canvasWidth, canvasHeight, 'png', filename);
                        console.log('ok');
                    });
                })
            }
        },

        //双击滚屏
        doscroll: function () {
            var db = this.settings.dbscroll, on = false, that = this;
            if ("undefined" != typeof db && db == true) {
                if ($('#minimenu').length <= 0) {
                    this.mmenu()
                }
                if ($('#dbscroll').length <= 0) {
                    var dbtpl = `<div class="mb-1">
    <input type = "checkbox" class="btn-check" id = "dbscroll" autocomplete = "off" >
        <label class="btn btn-outline-secondary btn-sm" for="dbscroll" id="dbtxt" title="滚屏"><i class="bi bi-chevron-double-down"></i></label>
    </div >`;
                    $('#minimenu').prepend(dbtpl);
                }
                $("#dbscroll").on('click', function () {
                    var dt = on == true ? '<i class="bi bi-chevron-double-down"></i>' : '<i class="bi bi-circle"></i>'
                    if (on) {
                        db = on = false
                        $('html body').unbind('dblclick', that.dbscroll()).removeClass("noselect");
                    } else {
                        db = on = true
                        $('html body').addClass("noselect");
                        that.dbscroll()
                    }
                    $("#dbscroll").next().html(dt)
                });
            }
        },
        GenerateList: function () {
            var tth = this;
            var num = 0;//第x个目录 用于jquery跳转实现
            var target = $("#content");
            var content = "<div id='quick' class='p-3'>页内导航<hr>";//创建的目录的dom结构
            content += '<ul class="nav flex-column">';
            $("h2").each(function () {//遍历内容中的所有h2标签 作为一级目录
                content += "<li>" + tth.GenerateA(num, $(this).text());
                $(this).before(tth.GenerateLabel(num));
                num++;
                var second = $(this).nextUntil("h2", "h3");
                if (second) {
                    content += "<ul>";
                    second.each(function () {//变量内容中的所有h3标签 作为二级目录
                        content += "<li>" + tth.GenerateA(num, $(this).text()) + "</li>";
                        $(this).before(tth.GenerateLabel(num));
                        num++;
                    });
                    content += "</ul>";
                };
                content += "</li>";
            });
            content += "</ul></div>";
            target.append(content);//插入目录到页面中
        },
        GenerateLabel: function (num) {
            var a = "<a name = 'label" + num + "'></a>";
            return a;
        },
        GenerateA: function (num, text) {
            var ss = "<a data-i='" + num + "'>" + text + "</a>";
            return ss;
        }
    }
    $.fn[pluginName] = function (options) {
        let pluginName = new Plugin(this, options);
        return pluginName;
    };

})(jQuery, window, document);
