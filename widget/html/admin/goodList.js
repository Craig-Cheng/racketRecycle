define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');
    var goodList = new Vue({
        el: '#main',
        template: _g.getTemplate('admin/goodList-body-V'),
        data: {
            sure: false,
            amount: [{
                id: 0,
            }]
        },
        created: function() {
            this.amount.length = 0;
        },
        ready: function(){
        },
        methods: {
            onDetailTap: function(index) {
                _g.openWin({
                    header: {
                        data: {
                            title: '商品详情'
                        }
                    },
                    name: 'admin-goodDetail-win',
                    url: '../admin/goodDetail.html',
                    pageParam: {
                        id: goodList.amount[index].id
                    }
                });
            }
        },

    });

    function getData() {
        Http.ajax({
            data: {},
            isSync: true,
            url: '/admin/auditGoodList.do',
            success: function(ret) {
                if (ret.code == 200) {
                    var data = ret.data;
                    goodList.amount = getListValue(data);
                    _g.toast(ret.msg);
                    alert(_g.j2s(goodList.amount))
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
        name: 'reload-goodList'
    }, function(){
        getData();
    });
    getData();
    module.exports = {};

});
