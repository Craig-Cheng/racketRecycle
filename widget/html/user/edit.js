define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');
    var edit = new Vue({
        el: '#main',
        template: _g.getTemplate('user/edit-body-V'),
        data: {
            name: '',
            mail: '',
            IDcard: '',
            birth: '',
            sex: '',
            payPwd: '',
        },
        created: function() {

        },
        methods: {
            onFinishTap: function() {
              if(edit.name == '') _g.toast('请输入昵称!');
              if(edit.mail == '') _g.toast('请输入邮箱!');
              if(edit.IDcard == '') _g.toast('请输入身份证号码!');
              if(edit.birth == '') _g.toast('请输入出生年月!');
              if(edit.sex == '') _g.toast('请输入性别!');
              if(edit.payPwd == '') _g.toast('请输入支付密码!');
                Http.ajax({
                    data: {
                        name: edit.name,
                        mail: edit.mail,
                        IDcard: edit.IDcard,
                        birth: edit.birth,
                        sex: edit.sex,
                        payPwd: edit.payPwd
                    },
                    isSync: true,
                    url: '/user/updateInfo.do',
                    success: function(ret) {
                        if (ret.code == 200) {
                            _g.toast(ret.msg);
                            api && api.openWin({
                                name: 'main-index-win',
                                url: '../main/index.html',
                            });
                        } else {
                            _g.toast(ret.msg);
                        }
                    },
                    error: function(err) {}
                })
            }
        },
        filters: {
          'sex': function(data){
            return data == '1' ? '男':'女'; 
          }
        }
    });

    module.exports = {};

});
