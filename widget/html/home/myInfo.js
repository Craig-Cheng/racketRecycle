define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');

    var myInfo = new Vue({
        el: '#main',
        template: _g.getTemplate('home/myInfo-body-V'),
        data: {
            name: '',
            avatar: '',
            account: '',
            birthday: '',
            sex: '',
            phone: '',
            mail: ''

        },
        created: function() {

        },
        methods: {
            onListTap: function() {
                _g.openWin({
                    header: {
                        data: {
                            title: '订单列表'
                        }
                    },
                    name: 'order-list-win',
                    url: '../order/list.html',
                    pageparam: {}
                });
            },
            onSellTap: function() {
                _g.openWin({
                    header: {
                        data: {
                            title: '新建出售商品'
                        }
                    },
                    name: 'good-create-win',
                    url: '../good/create.html',
                    pageparam: {}
                });
            },
            onCreateCollectionTap: function(){
                 _g.openWin({
                    header: {
                        data: {
                            title: '发起募捐'
                        }
                    },
                    name: 'collection-createCollection-win',
                    url: '../collection/createCollection.html',
                    pageparam: {}
                });
            },
            onVerifyTap: function() {
                _g.openWin({
                    header: {
                        data: {
                            title: '身份验证'
                        }
                    },
                    name: 'user-identity-win',
                    url: '../user/identity.html',
                    pageparam: {}
                });
            },
            onEditTap: function() {
                _g.openWin({
                    header: {
                        data: {
                            title: '编辑个人信息'
                        }
                    },
                    name: 'user-editOne-win',
                    url: '../user/editOne.html',
                    pageparam: {}
                });
            },
            onAboutTap: function() {
                _g.openWin({
                    header: {
                        data: {
                            title: '关于'
                        }
                    },
                    name: 'user-about-win',
                    url: '../user/about.html',
                    pageparam: {}
                });
            },
             onMyCLTap: function() {
                 _g.openWin({
                    header: {
                        data: {
                            title: '我的募捐'
                        }
                    },
                    name: 'collection-myCL-win',
                    url: '../collection/myCL.html',
                    pageParam: {}
                })
            },
            onChangeAvatar: function() {
                _g.openPicActionSheet({
                    allowEdit: true,
                    suc: function(ret) {
                        Http.ajax({
                            data: {
                                Base64: ret.base64Data.split(',')[1]
                            },
                            isSync: true,
                            url: '/user/uploadPic.do',
                            success: function(ret) {
                                if (ret.code == 200) {
                                    var UserInfo = _g.getLS('UserInfo');

                                    myInfo.avatar = CONFIG.HOST + ret.data.avatar;
                                    _g.setLS('UserInfo', UserInfo);
                                } else {
                                    _g.toast(ret.msg);
                                }
                            },
                            error: function(err) {}
                        });
                
                    }
                });
            },
        },
        filters:{
            'sex': function(data){
                return data == 1? '男':'女';
            }
        }
    });

    function getData() {
        Http.ajax({
            data: {

            },
            url: '/user/info.do',
            success: function(ret) {
                if (ret.code == 200) {
                    var data = ret.data;
                    var Email = '***' + data.mail.substring(3);
                    myInfo.name = data.name || "";
                    myInfo.account = data.account || "";
                    myInfo.phone = data.phone || "";
                    myInfo.sex = data.sex || 0;
                    myInfo.birthday = data.birthday || "";
                    myInfo.mail = Email || "";
                    myInfo.avatar = CONFIG.HOST +data.avatar || "";
                } else {
                    _g.toast(ret.msg);
                }
            },
            error: function(err) {}
        });
    }
    getData();
    api.addEventListener({
        name: 'info-modify'
    }, function(){
        getData();
    })
    module.exports = {};

});
