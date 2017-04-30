define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');

    var editOne = new Vue({
        el: '#main',
        template: _g.getTemplate('user/editOne-body-V'),
        data: {
            name: '',
            mail: '',
            pwd: '',
            // IDcard: '',
            // birth: '',
            // sex: '',
            // location: ''
        },
        created: function() {

        },
        methods: {
            onOneTap: function(data) {
                _g.openWin({
                    header: {
                        data: {
                            title: '修改' + data
                        }
                    },
                    name: 'user-modify-win',
                    url: '../user/modify.html',
                    pageParam: {
                        type: data
                    }
                });
            },
            onTwoTap: function() {
                _g.openWin({
                    header: {
                        data: {
                            title: '修改密码'
                        }
                    },
                    name: 'user-pwd-win',
                    url: '../user/pwd.html',
                    pageParam: {}
                })
            },
           
        },
    });

    module.exports = {};

});
