define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');
    var id = api.pageParam.id;
    // alert(id);
    if (_g.checkUser()) {
        var goodDetail = new Vue({
            el: '#main',
            template: _g.getTemplate('admin/goodDetail-body-V'),
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
                onRefuseTap: function() {
                    if (confirm('确认拒绝?')) {
                        Http.ajax({
                            data: {
                                id: id,
                                type: 0
                            },
                            isSync: true,
                            url: '/admin/auditGood.do',
                            success: function(ret) {
                                if (ret.code == 200) {
                                    _g.toast(ret.msg);
                                    api.sendEvent({
                                        name: 'reload-goodist',
                                    });
                                    api.closeWin();
                                } else {
                                    _g.toast(ret.msg);
                                }
                            },
                            error: function(err) {}
                        })
                    }
                },
                onOKTap: function() {
                    if (confirm('确认通过审核?')) {
                        Http.ajax({
                            data: {
                                id: id,
                                type: 1
                            },
                            isSync: true,
                            url: '/admin/auditGood.do',
                            success: function(ret) {
                                if (ret.code == 200) {
                                    _g.toast(ret.msg);
                                     api.sendEvent({
                                        name: 'reload-goodList',
                                    });
                                    api.closeWin();
                                } else {
                                    _g.toast(ret.msg);
                                }
                            },
                            error: function(err) {}
                        })
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
                }
            },
        });

        function getDetail(id) {
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
        getDetail(id);
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
        module.exports = {};
    }
});
