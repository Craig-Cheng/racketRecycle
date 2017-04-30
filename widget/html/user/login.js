define(function(require, exports, module) {
    var Http = require('U/http');
    // var UserInfo = _g.getLS('UserInfo');
    var login = new Vue({
        el: '#main',
        template: _g.getTemplate('user/login-body-V'),
        data: {
            account: '',
            pwd: ''
        },
        created: function() {

        },
        methods: {
            onLoginTap: function() {
                // alert(1231231);
                if (!this.account || !this.pwd) {
                    _g.toast('账号或密码不能为空');
                    return
                } else {
                    Http.ajax({
                        data: {
                            account: login.account,
                            password: login.pwd
                        },
                        isSync: true,
                        url: "/user/login.do",
                        success: function(ret) {
                            if (ret.code == 200) {
                                var data = ret.data;
                                _g.setLS('UserInfo', data.UserInfo);
                                _g.setLS('sessionID', data.sessionID);
                                if (login.account == '18826275548') {
                                    _g.openWin({
                                        header:{
                                            title: '待审核信息'
                                        },
                                        name: 'admin-list-win',
                                        url: '../admin/list.html',
                                        pageparam: {}
                                    })
                                    // api.openWin({
                                    //     name: 'admin-list-win',
                                    //     url: '../admin/list.html',
                                    //     pageparam: {}
                                    // })
                                } else {
                                    api.openWin({
                                        name: 'main-index-win',
                                        url: '../main/index.html',
                                        pageparam: {}
                                    });
                                }
                                _g.closeWins(['user-login']);
                            } else {
                                _g.toast(ret.msg);
                            }
                        },
                        error: function(err) {
                            _g.toast(err.msg);
                        }
                    });
                }

            },
            onRegisterTap: function() {
                _g.openWin({
                    header: {
                        data: {
                            title: '注册'
                        }
                    },
                    name: 'user-register-win',
                    url: '../user/register.html',
                    pageparam: {}
                })
            },
            clearPwdTap: function() {
                this.pwd = '';
            },
            forgetPwdTap: function() {
                 _g.openWin({
                    header: {
                        data: {
                            title: '忘记密码'
                        }
                    },
                    name: 'user-changePwd-win',
                    url: '../user/changePwd.html',
                    pageparam: {}
                })
            }
        },
    });
    api && api.addEventListener({
        name: 'keyback'
    }, function(ret, err) {
        api.closeWidget();
    });

    api.addEventListener({
        name: 'clear-user'
    }, function(){
        login.account = '';
        login.pwd = '';
    })
    module.exports = {};

});
