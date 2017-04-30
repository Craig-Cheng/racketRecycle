define(function(require, exports, module) {
    var Http = require('U/http');
    // var UserInfo = _g.getLS('UserInfo');

    var register = new Vue({
        el: '#main',
        template: _g.getTemplate('user/register-body-V'),
        data: {
            account: '',
            pwd1: '',
            pwd2: '',
        },
        created: function() {

        },
        methods: {
            onFinishTap: function() {
                if (!this.account || !this.pwd1 || !this.pwd2) {
                    _g.toast('手机或密码不能为空');
                    return;
                }
                if (this.pwd1 != this.pwd2) {
                    _g.toast('2次密码不一致');
                    return;
                }
                Http.ajax({
                    data: {
                        account: register.account,
                        password: register.pwd2
                    },
                    isSync: true,
                    url: '/user/register.do',
                    success: function(ret) {
                        if (ret.code == 200) {
                            _g.toast(ret.msg);
                            var data = ret.data;
                            _g.setLS('UserInfo', data.UserInfo);
                            _g.setLS('sessionID', data.sessionID);
                            _g.openWin({
                                header: {
                                    data: {
                                        title: '补全信息'
                                    }
                                },
                                name: 'user-edit-win',
                                url: '../user/edit.html',
                                pageparam: {}
                            });
                        } else {
                            _g.toast(ret.msg);
                        }
                    },
                    error: function(err) {}
                })

            },
            onClearTap1: function() {
                this.pwd1 = '';
            },
            onClearTap2: function() {
                this.pwd2 = '';
            }
        },
    });

    module.exports = {};

});
