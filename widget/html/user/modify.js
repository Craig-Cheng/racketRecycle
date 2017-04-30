define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');
    var data = api.pageParam.type;
    var modify = new Vue({
        el: '#main',
        template: _g.getTemplate('user/modify-body-V'),
        data: {
            sure: false,
            placeH: '请输入',
            changeData: '',
        },
        created: function() {},
        methods: {
            onSubmitTap: function() {
                if (data == "昵称") {
                    Http.ajax({
                        data: {
                            name: modify.changeData
                        },
                        url: '/user/updateInfo.do',
                        success: function(ret) {
                            if (ret.code == 200) {
                                _g.toast(ret.msg);
                                setTimeout(function() {
                                    api.closeWin();
                                }, 500);
                                api.sendEvent({
                                    name: 'info-modify'
                                });
                            } else {

                            }
                        },
                        error: function(err) {}
                    })
                } else if (data == "邮箱") {
                    Http.ajax({
                        data: {
                            mail: modify.changeData
                        },
                        url: '/user/updateInfo.do',
                        success: function(ret) {
                            if (ret.code == 200) {
                                _g.toast(ret.msg);
                                setTimeout(function() {
                                    api.closeWin();
                                }, 500);
                                api.sendEvent({
                                    name: 'info-modify'
                                });
                            } else {

                            }
                        },
                        error: function(err) {}
                    })
                }
            },
        },
    });
    module.exports = {};
});
