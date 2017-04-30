define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');

    var myCollection = new Vue({
        el: '#main',
        template: _g.getTemplate('user/myCollection-body-V'),
        data: {
            show: false,
            mainList: [{
                id: 0,
                type: 1,
                name: '11',
                brand: '',
                price: 0,
                rate_New: '',
                up: 0,
                favNum: 0,
                images: [],
            }]
        },
        created: function() {
            this.mainList = []
        },
        methods: {
            onDetailTap: function(index) {
                _g.openWin({
                    header: {
                        data: {
                            title: '商品详情'
                        }
                    },
                    name: 'good-goodDetail-win',
                    url: '../good/goodDetail.html',
                    pageParam: {
                        id: myCollection.mainList[index].id
                    }
                });
            },
        },
        filters: {
            'typeChange': function(goodType) {
                switch (goodType) {
                    case '1':
                        return '羽毛球'
                        break;
                    case '2':
                        return '乒乓球'
                        break;
                    case '3':
                        return '棒球'
                        break;
                    case '4':
                        return '网球'
                        break;
                    case '5':
                        return '高尔夫球'
                        break;
                    case '6':
                        return '其他'
                        break;

                    default:
                        break;
                }
            },
            'time': function(data) {
                var time = new Date(data);
                return time.Format("yyyy-M-d hh:mm:ss");
            }
        },

    });

    function getList() {
        Http.ajax({
            data: {

            },
            url: '/user/myCollection.do',
            success: function(ret) {
                if (ret.code == 200) {
                    var data = ret.data;
                    myCollection.mainList = getListValue(data);
                } else {
                    _g.toast(ret.msg);
                }
            }
        })
    }

    function getListValue(result) {
        var list = result || [];
        return _.map(list, function(item, index) {
            return {
                id: item._id || 0,
                type: item.type || 0,
                name: item.name || '',
                brand: item.brand || '',
                price: item.price || 0,
                rate_New: item.rate_New || '',
                up: item.up || 0,
                favNum: item.favNum || 0,
                images: item.images || [],
            }
        });
    }
    getList();

    module.exports = {};

});
