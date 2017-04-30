define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');

    var collectionList = new Vue({
        el: '#main',
        template: _g.getTemplate('admin/collectionList-body-V'),
        data: {
            sure: false,
            amount: [{
                id: 0,
            }]
        },
        created: function() {
            this.amount.length = 0;
        },
        ready: function() {
        },
        methods: {
            onDetailTap: function(index) {
                _g.openWin({
                    header: {
                        data: {
                            title: '待审核募捐详情'
                        }
                    },
                    name: 'admin-collectionDetail-win',
                    url: '../admin/collectionDetail.html',
                    pageParam: {
                        id: collectionList.amount[index].id
                    }
                });
            }
        },


    });

    function getData() {
        Http.ajax({
            data: {},
            isSync: true,
            url: '/admin/auditCollectionList.do',
            success: function(ret) {
                if (ret.code == 200) {
                    var data = ret.data;
                    collectionList.amount = getListValue(data);
                    _g.toast(ret.msg);
                } else {
                    _g.toast(ret.msg);
                }
            },
            error: function(err) {}
        })
    }

    function getListValue(data) {
        var list = data || [];
        return _.map(list, function(item, index) {
            return {
                id: item._id || 0,
            }
        });

    }
        api.addEventListener({
        name: 'reload-collectionList'
    }, function(){
        getData();
    });
    getData();
    module.exports = {};

});
