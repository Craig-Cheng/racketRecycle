(function() {

    // 常用函数库

    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    Date.prototype.Format = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") // ==> 2016-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      // ==> 2016-7-2 8:9:4.18

    function Common() {
        this.isAndroid = (/android/gi).test(navigator.appVersion);
        this.isIOS = (/mac/gi).test(navigator.appVersion);
    }

    Common.prototype = {
        uzStorage: function() {
            var ls = window.localStorage;
            if (this.isAndroid && !window.location.host) ls = os.localStorage();
            return ls;
        },
        setLS: function(key, value) {
            if (arguments.length === 2) {
                var v = value;
                if (typeof v == 'object') {
                    v = JSON.stringify(v);
                    v = 'obj-' + v;
                } else {
                    v = 'str-' + v;
                }
                var ls = this.uzStorage();
                if (ls) {
                    ls.setItem(key, v);
                }
            }
        },
        getLS: function(key) {
            var ls = this.uzStorage();
            if (ls) {
                var v = ls.getItem(key);
                if (!v) {
                    return;
                }
                if (v.indexOf('obj-') === 0) {
                    v = v.slice(4);
                    return JSON.parse(v);
                } else if (v.indexOf('str-') === 0) {
                    return v.slice(4);
                }
            }
        },
        rmLS: function(key) {
            var ls = this.uzStorage();
            if (ls && key) ls.removeItem(key);
        },
        clearLS: function() {
            var ls = this.uzStorage();
            if (ls) ls.clear();
        },
        fixStatusBar: function() {
            var header = $('#header')[0];
            if (!api) return;
            if (!header) return;
            if (api.systemType == 'ios') {
                var strSV = api.systemVersion;
                var numSV = parseInt(strSV, 10);
                var fullScreen = api.fullScreen;
                var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
                if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
                    header.style.paddingTop = '20px';
                }
            } else if (api.systemType == 'android') {
                var ver = api.systemVersion;
                ver = parseFloat(ver);
                if (ver >= 4.4) {
                    header.style.paddingTop = '25px';
                }
            }
        },
        isElement: function(obj) {
            return !!(obj && obj.nodeType == 1);
        },
        isArray: function(obj) {
            if (Array.isArray) {
                return Array.isArray(obj);
            } else {
                return obj instanceof Array;
            }
        },
        isEmptyObject: function(obj) {
            if (JSON.stringify(obj) === '{}') {
                return true;
            }
            return false;
        },
        toast: function(msg, duration, location) {
            if (typeof duration == 'string') location = duration;
            api && api.toast({
                msg: msg || '',
                duration: duration || 2000,
                location: location || 'middle'
            });
        },
        addHeader: function(opts) {
            var header = new Vue({
                el: opts.el || '#header',
                template: _g.getTemplate(opts.template || 'common/header-base-V'),
                data: opts.data || {},
                methods: (function() {
                    return $.extend(true, {
                        onTapLeftBtn: function() {
                            if (this.frameName) {
                                api.sendEvent({
                                    name: api.winName + '-closeFrame'
                                })
                                return
                            }
                            api && api.closeWin();
                        }
                    }, opts.methods);
                })(),
                ready: function() {
                    setTimeout(function() {
                        $('body')[0].style.paddingTop = $('#header').height() + 'px';
                    }, 0);
                }
            });
            return header;
        },
        addContent: function(opts) {
            if (!opts.name) return;
            if (!opts.url) return;
            setTimeout(function() {
                var headerHeight = $('#header').height();
                if (opts.name == 'search-result') headerHeight += 44;
                if (opts.name == 'order-index') headerHeight += 46;
                api && api.openFrame({
                    name: opts.name + '-frame',
                    url: opts.url,
                    bounces: opts.bounces !== false,
                    rect: {
                        x: 0,
                        y: headerHeight,
                        w: 'auto',
                        h: window.innerHeight - headerHeight
                    },
                    pageParam: opts.pageParam || {}
                });
            }, 0);
            setTimeout(function() {
                var headerHeight = $('#header').height();
                api.setFrameAttr({
                    name: opts.name + '-frame',
                    rect: {
                        x: 0,
                        y: headerHeight,
                        w: 'auto',
                        h: api.winHeight - headerHeight
                    },
                });
            }, 500);
        },
        openWin: function(opts) {
            var startTime = new Date().getTime();
            _g.setLS('LastTime', startTime);
            if (!opts.name) return;
            if (!opts.url) return;
            api.openWin({
                name: opts.name + '-win',
                url: '../baseWin/index.html',
                bounces: false,
                slidBackEnabled: opts.slidBackEnabled || false,
                pageParam: { opts: opts }
            });
        },
        closeWins: function(winNames) {
            _.each(winNames, function(winName) {
                api.closeWin({
                    name: winName,
                    animation: { type: "none" }
                });
            });
        },
        showProgress: function(opts) {
            opts = $.extend(true, {
                style: 'default',
                animationType: 'fade',
                modal: true
            }, opts);
            api && api.showProgress(opts);
        },
        hideProgress: function() {
            api && api.hideProgress();
        },
        viewAppear: function(callback) {
            api && api.addEventListener({
                name: 'viewappear'
            }, function(ret, err) {
                callback && callback();
            });
        },
        openPicActionSheet: function(opt) {
            api.actionSheet({
                cancelTitle: '取消',
                buttons: ['拍照', '从相册选择']
            }, function(ret, err) {
                switch (Number(ret.buttonIndex)) {
                    case 1:
                        _g.getPhoto(2, opt);
                        break; //camera
                    case 2:
                        _g.getPhoto(1, opt);
                        break; //相册
                    case 3:
                        // window.isAllow = true; // 允许启动
                        break; //相册
                }
            });
        },
        getPhoto: function(type, opt) {
            var sourceType, destinationType = 'base64';
            switch (Number(type)) {
                case 1:
                    sourceType = 'library';
                    break;
                case 2:
                    sourceType = 'camera';
                    break;
                case 3:
                    sourceType = 'album';
                    break;
            }

            api.getPicture({
                sourceType: sourceType,
                encodingType: 'jpg',
                mediaValue: 'pic',
                destinationType: destinationType,
                allowEdit: !!opt.allowEdit,
                quality: 85,
                targetWidth: 640,
                targetHeight: 640,
                saveToPhotoAlbum: false
            }, function(ret, err) {
                if (ret) {
                    if (opt.suc) opt.suc(ret);
                } else {
                    if (opt.err) opt.err(err);
                };
            });
        },
        checkUser: function() {
            if (_g.getLS('sessionID')) {
                return true;
            } else {
                api && api.openWin({
                    name: 'user-login-win',
                    url: '../user/login.html',
                    bounces: false,
                    slidBackEnabled: false,
                    softInputMode: 'resize',
                    pageParam: { key: 'value' }
                });
                _g.closeWins();
                return false;
            }
        },
        setPullDownRefresh: function(callback) {
            api && api.setRefreshHeaderInfo({
                visible: true,
                loadingImg: 'widget://image/refresh.png',
                bgColor: '#ccc',
                textColor: '#fff',
                textDown: '下拉刷新...',
                textUp: '松开刷新...',
                showTime: true
            }, function(ret, err) {
                window.isNoMore = false;
                callback && callback();
            });
        },
        openMenuFrame: function(opts) {
            window.isMenuOpen = true;
            var headerHeight = opts.headerHeight;
            api.openFrame({
                name: 'leftMenu-leftMenu-frame',
                url: '../leftMenu/leftMenu.html',
                rect: {
                    x: 0,
                    y: headerHeight,
                    w: api.winWidth,
                    h: api.winHeight - headerHeight,
                },
                bgColor: 'rgba(0,0,0,0)',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false,
                pageParam: {
                    list: opts.list
                },
            });
        },
        setLoadmore: function(callback) {
            api && api.addEventListener && api.addEventListener({
                name: 'scrolltobottom',
                extra: {
                    threshold: 200
                }
            }, function(ret, err) {
                if (window.isNoMore) return;
                if (!window.isLoading) {
                    $('body').append('<div id="loadmore"></div>');
                    window.isLoading = true;
                    callback();
                }
            });
        },
        refreshDone: function() {
            var loadmore = document.getElementById('loadmore');
            if (loadmore) document.body.removeChild(loadmore);
            api && api.refreshHeaderLoadDone();
            window.isLoading = false;
        },
        transData: function(data) {
            for (var d in data) {
                if (typeof data[d] == 'object') data[d] = JSON.stringify(data[d]);
            }
            return data;
        },
        avatar: function(avatar) {
            return avatar ? (CONFIG.HOST + avatar) : CONFIG.DEFAULT_AVATAR;
        },
        sex: function(sex) {
            return sex ? '男' : '女';
        },
        j2s: function(obj) {
            return JSON.stringify(obj);
        },
        s2j: function(s) {
            return JSON.parse(s);
        },
        log: function(msg) {
            $('body').attr('title', msg);
        },
        getTemplate: function(url) {
            var template = '';
            $.ajax({
                url: '../' + url + '.html',
                async: false,
                success: function(result) {
                    template = result;
                },
                error: function(msg) {
                    console.log('找不到:' + url + '模板,请检查');
                }
            });
            return template
        }
    };

    Common.prototype.constructor = Common;

    window._g = new Common();

})();
