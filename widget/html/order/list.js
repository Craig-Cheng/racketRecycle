define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');
    var list = new Vue({
        el: '#main',
        template: _g.getTemplate('order/list-body-V'),
        data: {
            show: false,
            notAllItem: 0,
            // expand: 'fade',
            buyTap: true,
            itemIndex: 0,
            itemList: [{
                item: 0,
                content: '购买记录',
            }, {
                item: 1,
                content: '出售记录',
            }],
            buyList: [{
                orderID: 0,
                good: {
                    goodID: 0,
                    images: '',
                },
                sellID: 0,
                buyID: 0,
                status: 0,
                receiveTime: '',
                deliveryTime: '',
                leavingMsg: '',
                price: 0,
                goodName: '',
                addDate: '',
                location: {
                    id: 0,
                    name: '',
                    phone: '',
                    province: '',
                    city: '',
                    area: '',
                    detail: '',
                }
            }],
            name: UserInfo.name,
            avatar: CONFIG.HOST+UserInfo.avatar,
            sellList: [{
                orderID: 0,
                good: {
                    goodID: 0,
                    images: '',
                },
                sellID: 0,
                buyID: 0,
                status: 0,
                receiveTime: '',
                deliveryTime: '',
                leavingMsg: '',
                price: 0,
                goodName: '',
                addDate: '',
                location: {
                    id: 0,
                    name: '',
                    phone: '',
                    province: '',
                    city: '',
                    area: '',
                    detail: '',
                }
            }],

        },
        created: function() {
            this.buyList = [];
            this.sellList = [];
        },
        methods: {
            onChooseItemTap: function(index) {
                this.itemIndex = this.itemList[index].item;
                this.notAllItem = this.itemList[index].item;
                if (this.buyTap == false) {
                    this.buyTap = true;
                } else {
                    this.buyTap = false;
                }
            },
            deliverTap: function(index) {
                if (confirm('确认发货?')) {
                    Http.ajax({
                        data: {
                            type: 0,
                            orderID: list.sellList[index].orderID
                        },
                        url: '/order/status.do',
                        success: function(ret) {
                            if (ret.code == 200) {
                                _g.toast(ret.msg);
                            } else {
                                _g.toast(ret.msg);
                            }
                        },
                        error: function(err) {}
                    });
                } else {
                    return
                }

            },
            receiveTap: function(index) {
                if (confirm('确认发货?')) {
                    Http.ajax({
                        data: {
                            type: 1,
                            orderID: list.buyList[index].orderID
                        },
                        url: '/order/status.do',
                        success: function(ret) {
                            if (ret.code == 200) {
                                _g.toast(ret.msg);
                            } else {
                                _g.toast(ret.msg);
                            }
                        },
                        error: function(err) {}
                    });
                } else {
                    return
                }
            }
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
                return time.Format("yyyy-M-d");
            }
        },
    });

    function getData(type) {
        Http.ajax({
            data: {
                type: type
            },
            url: '/order/list.do',
            success: function(ret) {
                if (ret.code == 200) {
                    var data = ret.data;
                    if (type == 0) {
                        list.sellList = getDateValue(data);
                        // alert(_g.j2s(getDateValue(list)))
                    } else if (type == 1) {
                        list.buyList = getDateValue(data);
                        // alert(_g.j2s(list.buyList) + "------->")
                    }
                } else {
                    _g.toast(ret.msg);
                }
            },
            error: function(err) {}
        })
    }

    function getDateValue(data) {
        var list = data || [];
        return _.map(list, function(item, index) {
            return {
                orderID: item._id || 0,
                good: {
                    goodID: item.goodID._id || 0,
                    images: item.goodID.images[0] || ''
                },
                sellID: item.sellID || 0,
                buyID: item.addUserID || 0,
                status: item.status || 0,
                receiveTime: item.receiveTime || '',
                deliveryTime: item.deliveryTime || '',
                leavingMsg: item.leavingMsg || '',
                price: item.price || 0,
                goodName: item.goodName || '',
                addDate: item.addDate || '',
                location: {
                    id: item.locationID._id || 0,
                    name: item.locationID.name || '',
                    phone: item.locationID.phone || '',
                    province: item.locationID.province || '',
                    city: item.locationID.city || '',
                    area: item.locationID.area || '',
                    detail: item.locationID.detail || '',
                }
            }
        })
    }

    getData(1);
    module.exports = {};

});
