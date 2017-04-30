define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');
    var myCL = new Vue({
        el: '#main',
        template: _g.getTemplate('collection/myCL-body-V'),
        data: {
            sure: false,
            amount: [{
                id: 0,
                name: '',
            }]
        },
        created: function() {
            this.amount.length = [];
        },
        ready: function(){
        },
        methods: {
            onDetailTap: function(index) {
                _g.openWin({
                    header: {
                        data: {
                            title: '捐赠人列表'
                        }
                    },
                    name: 'collection-donor-win',
                    url: '../collection/donor.html',
                    pageParam: {
                        id: myCL.amount[index].id
                    }
                });
            }
        },

    });

    function getData() {
        Http.ajax({
            data: {},
            isSync: true,
            url: '/collection/myList.do',
            success: function(ret) {
                if (ret.code == 200) {
                    var data = ret.data;
                    myCL.amount = getListValue(data);
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
                name: item.name || '',
            }
        });

    }

    getData();
    module.exports = {};

});
