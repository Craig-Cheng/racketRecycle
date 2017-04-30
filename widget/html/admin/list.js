define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');

    var list = new Vue({
        el: '#main',
        template: _g.getTemplate('admin/list-body-V'),
        data: {
            sure: false,
        },
        created: function() {

        },
        methods: {
            onGoodsTap: function() {
                _g.openWin({
                    header:{
                        data:{
                            title: '待审核商品列表'
                        }
                    },
                    name: 'admin-goodList-win',
                    url: '../admin/goodList.html'
                })
            },
             onCollectionsTap: function() {
                _g.openWin({
                    header:{
                        data:{
                            title: '待审核募捐活动列表'
                        }
                    },
                    name: 'admin-collectionList-win',
                    url: '../admin/collectionList.html'
                })
            },
            onLogoutTap: function() {
                _g.openWin({
                    header:{
                        data:{
                            title: '退出'
                        }
                    },
                    name: 'user-about-win',
                    url: '../user/about.html'
                })
            }
        },


    });
    module.exports = {};

});
