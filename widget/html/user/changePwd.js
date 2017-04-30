define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');

    var changePwd = new Vue({
        el: '#main',
        template: _g.getTemplate('user/changePwd-body-V'),
        data: {
            sure: false,
            account: '',
            mail: '',
            password: '',
        },
        created: function() {

        },
        methods: {
            onSubmitTap: function() {
                Http.ajax({
                    data: {
                        account: changePwd.account,
                        mail: changePwd.mail,
                        password: changePwd.password
                    },
                    url: "/user/updatePwd.do",
                    success: function(ret) {
                        if (ret.code == 200) {
                            _g.toast('重置成功!');
                            changePwd.account = '';
                            changePwd.mail = '';
                            changePwd.password = '';
                            api.closeWin();
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
