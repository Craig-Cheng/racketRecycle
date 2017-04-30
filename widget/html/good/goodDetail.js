define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');
    var id = api.pageParam.id;
    // alert(id);
    if (_g.checkUser()) {
        var goodDetail = new Vue({
            el: '#main',
            template: _g.getTemplate('good/goodDetail-body-V'),
            data: {
                type: 0,
                brand: '',
                phone: 0,
                up: 0,
                describe: '',
                // images: [{
                //     index: ''
                // }],
                rate_New: '',
                time: '',
                price: 0,
                name: '',
                model: '',
                favNum: 0,
                img1: '',
                img2: '',
                img3: '',
                sellID: '',
                isComment: false,
                isColleced: false

            },
            created: function() {

            },
            methods: {
                onBuyTap: function() {
                    if (UserInfo.userID == this.sellID) {
                        _g.toast('禁止购买本人出售的商品!');
                    } else {
                        _g.openWin({
                            header: {
                                data: {
                                    title: '确认收货地址'
                                }
                            },
                            name: 'distribute-list-win',
                            url: '../distribute/list.html',
                            pageParam: {
                                goodID: id,
                                price: goodDetail.price
                            }
                        });
                    }
                },
                onCommentTap: function() {
                    Http.ajax({
                        data: {
                            id: id
                        },
                        isSync: true,
                        url: '/good/comment.do',
                        success: function(ret) {
                            if (ret.code == 200) {
                                _g.toast(ret.msg);
                                goodDetail.up += 1;
                            } else {
                                _g.toast(ret.msg);
                            }
                        },
                        error: function(err) {}
                    });
                },
                onCollecteTap: function() {
                    Http.ajax({
                        data: {
                            id: id
                        },
                        isSync: true,
                        url: '/good/collect.do',
                        success: function(ret) {
                            if (ret.code == 200) {
                                _g.toast(ret.msg);
                                if (goodDetail.isColleced == true) {
                                    goodDetail.isColleced = false;
                                    goodDetail.favNum -= 1;
                                } else {
                                    goodDetail.isColleced = true;
                                    goodDetail.favNum += 1;
                                }

                            } else {
                                _g.toast(ret.msg);
                            }
                        },
                        error: function(err) {}
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
                }
            },
        });

        function getDetail() {
            Http.ajax({
                data: {
                    id: id
                },
                isSync: true,
                url: '/good/detail.do',
                success: function(ret) {
                    if (ret.code == 200) {
                        _g.toast(ret.msg);
                        goodDetail.type = ret.data.type || 0;
                        goodDetail.brand = ret.data.brand || '';
                        goodDetail.phone = ret.data.addUserID.phone || 0;
                        goodDetail.up = ret.data.up || 0;
                        goodDetail.describe = ret.data.describe || '';
                        goodDetail.rate_New = ret.data.rate_New || '';
                        goodDetail.time = ret.data.time || '';
                        goodDetail.price = ret.data.price || 0;
                        goodDetail.name = ret.data.name || '';
                        goodDetail.model = ret.data.model || '';
                        goodDetail.favNum = ret.data.favNum || 0;
                        goodDetail.img1 = ret.data.images[0] || '';
                        goodDetail.img2 = ret.data.images[1] || '';
                        goodDetail.img3 = ret.data.images[2] || '';
                        goodDetail.sellID = ret.data.addUserID._id || '';
                        _.each(ret.data.comment, function(item, index) {
                            if (UserInfo.userID == item.userID) {
                                goodDetail.isComment = true;
                            }
                        });
                        _.each(ret.data.favObj, function(item, index) {
                            if (UserInfo.userID == item.userID) {
                                goodDetail.isColleced = true;
                            }
                        })
                    } else {
                        _g.toast(ret.msg);
                    }
                },
                error: function(err) {}
            })
        }
        getDetail();
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            autoplay: 3000,
            speed: 1000,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            pagination: '.swiper-pagination',
            paginationType: 'progress',
            // scrollbar: '.swiper-scrollbar',
        });

        api.addEventListener({
            name: 'close-goodDetail',
        }, function() {
            setTimeout(function() {
                api.closeWin();
            }, 500);
        })
        module.exports = {};
    }
});
