define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');
    var headerHeight = _g.getLS('appH').header;
    var windowHeight = window.innerHeight;
    var goodID = api.pageParam.goodID;
    var price = api.pageParam.price;
    // alert(goodID)
    var list = new Vue({
        el: '#main',
        template: _g.getTemplate('distribute/list-body-V'),
        data: {
            chooseID: 0,
            list: [{
                id: 0,
                name: '',
                phone: '',
                province: '',
                city: '',
                area: '',
                detail: '',
            }],
            msg: '',
            hasLocation: true,
        },
        created: function() {
            this.list = [];

        },
        // ready: function() {
        //     if (this.list.length == 0) {
        //         this.hasLocation = false;
        //     } else {
        //         this.hasLocation = true;
        //     }
        // },
        methods: {
            onFinishTap: function() {
                api && api.openFrame({
                    name: 'pay-frame',
                    url: '../distribute/pay.html',
                    rect: {
                        x: 0,
                        y: headerHeight,
                        w: 'auto',
                        h: windowHeight
                    },
                    pageParam: {
                        distributeID: list.chooseID,
                        goodID: goodID,
                        msg: list.msg,
                        price: price
                    }
                })
            },
            onChooseTap: function(index) {
                list.chooseID = list.list[index].id;
            },
            addNewLocation: function() {
                // alert(1111);
                _g.openWin({
                    header: {
                        data: {
                            title: '新建配送地址'
                        }
                    },
                    name: 'distribute-create-win',
                    url: '../distribute/create.html',
                    pageParam: {
                        // goodID: id
                    }
                });
            },
            onEditTap: function(index) {
                _g.openWin({
                    header: {
                        data: {
                            title: '编辑配送地址'
                        }
                    },
                    name: 'distribute-edit-win',
                    url: '../distribute/edit.html',
                    pageParam: {
                        id: list.list[index].id
                    }
                });
            },
            onDelTap: function(index) {
                Http.ajax({
                    data: {
                        id: list.list[index].id
                    },
                    isSync: true,
                    url: '/location/del.do',
                    success: function(ret) {
                        if (ret.code == 200) {
                            _g.toast("删除成功");
                            api.sendEvent({
                                name: 'location-create'
                            });
                        } else {
                            _g.toast(ret.msg);
                            api.sendEvent({
                                name: 'location-create'
                            });

                        }
                    },
                    error: function(err) {}
                })
            }
        },
    });

    function getData() {
        Http.ajax({
            data: {},
            url: '/location/list.do',
            success: function(ret) {
                // alert('enter~~~')
                if (ret.code == 200) {
                    var data = ret.data;
                    list.list = getDataValue(data);
                    // alert(list.list.length);
                    if (data == null) {
                        list.hasLocation = false;
                    } else {
                        list.hasLocation = true;
                    }
                } else {
                    _g.toast(ret.msg);
                    if (data == null) {
                        list.hasLocation = false;
                    } else {
                        list.hasLocation = true;
                    }
                }
            },
            error: function(err) {}
        })
    }

    function getDataValue(result) {
        var list = result || [];
        return _.map(list, function(item, index) {
            return {
                id: item._id || '',
                name: item.name || '',
                phone: item.phone || '',
                province: item.province || '',
                city: item.city || '',
                area: item.area || '',
                detail: item.detail || '',
            }
        });
    }

    getData();

    api.addEventListener({
        name: 'location-create'
    }, function(ret, err) {
        getData();
    })
    api.addEventListener({
        name: 'refresh-goodList',
    }, function() {
        setTimeout(function() {
            api.closeWin();
            api.sendEvent({
                name: 'close-goodDetail',
            })
        }, 500);
    })

    module.exports = {};

});
