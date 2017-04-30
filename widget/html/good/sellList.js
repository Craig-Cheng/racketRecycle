define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');

    if (_g.checkUser()) {
        var sellList = new Vue({
            el: '#main',
            template: _g.getTemplate('good/sellList-body-V'),
            data: {
                sortIndex: 0,
                sortList: [{
                    item: 0,
                    content: "默认排序",
                }, {
                    item: 1,
                    content: "价格高低",
                }, {
                    item: 2,
                    content: "发布时间",
                }],
                goodList: [{
                    id: 0,
                    type: 1,
                    name: '',
                    brand: '',
                    price: 0,
                    rate_New: '',
                    up: 0,
                    favNum: 0,
                    images: [],
                }],
                mainImages: [{
                    image: '',
                }],
            },
            created: function() {
                this.goodList = [];
            },
            ready: function() {
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
                            id: sellList.goodList[index].id
                        }
                    });
                },
                onSortTap: function(index) {
                    if (sellList.sortIndex == index) return;
                    sellList.sortIndex = sellList.sortList[index].item;
                    getList(index);
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
                }
            },
        });

        function getList(index) {
            Http.ajax({
                data: {
                    type: index
                },
                isSync: true,
                url: '/good/list.do',
                success: function(ret) {
                    if (ret.code == 200) {
                        var data = ret.data;
                        sellList.goodList = getListValue(data);
                        // alert(_g.j2s(getListValue(data)));
                        if (index == 0) {


                            var img = [];
                            _.each(sellList.goodList, function(item, index) {
                                img.push({
                                    image: item.images
                                });
                            });
                            sellList.mainImages = img;
                        }
                        // alert(_g.j2s(sellList.mainImages));
                        // _g.toast(ret.msg);
                        initSwiper();
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
                    id: item.id || 0,
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
        getList(0);

        function initSwiper() {
            var mySwiper = new Swiper('.swiper-container', {
                direction: 'horizontal',
                // loop: true,
                pagination: '.swiper-pagination',
                speed: 1000,
                autoplay: 2500, //可选选项，自动滑动


            });
        }
        api && api.addEventListener({
            name: 'refresh-goodList',
        }, function(ret, err) {
            getList(0);
        })
        module.exports = {};
    }
});
