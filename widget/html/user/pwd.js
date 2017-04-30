define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');

    var pwd = new Vue({
        el: '#main',
        template: _g.getTemplate('user/pwd-body-V'),
        data: {
            sure: false,
            password: '',
            newPassword: ''
        },
        created: function() {

        },
        methods: {
           onSubmitTap: function() {
                Http.ajax({
                    data:{
                        password: pwd.password,
                        newPassword: pwd.newPassword
                    },
                    url: '/user/changePwd.do',
                    success: function(ret) {
                         if (ret.code == 200) {
                                _g.toast(ret.msg);
                                setTimeout(function() {
                                    api.closeWin();
                                }, 500);
                                
                            } else {
                                _g.toast(ret.msg);
                            }
                    },
                    error: function(err) {}
                })
           },
        },


    });
    module.exports = {};

});
