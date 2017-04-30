define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');

    var create = new Vue({
        el: '#main',
        template: _g.getTemplate('good/create-body-V'),
        data: {
            type: 0,
            brand: '',
            model: '',
            name: '',
            price: 0,
            time: '',
            rate_New: '',
            describe: '',
            images: [],
            img1: '',
            img2: '',
            img3: '',
        },
        created: function() {

        },
        methods: {
            onFinishTap: function() {
                if (this.img1 == '' || this.img2 == '' || this.img3 == '') {
                    _g.toast('必须上传3张图片');
                    return;
                }
                this.images.push(this.img1, this.img2, this.img3);        
                Http.ajax({
                    data: {
                        type: create.type,
                        brand: create.brand,
                        model: create.model,
                        name: create.name,
                        price: create.price,
                        time: create.time,
                        rate_New: create.rate_New,
                        images: create.images,
                        describe: create.describe,
                    },
                    isSync: true,
                    url: '/good/sell.do',
                    success: function(ret) {
                        if (ret.code == 200) {
                            _g.toast(ret.msg);
                            api.closeWin();
                        } else {
                            _g.toast(ret.msg);
                        }
                    },
                    error: function(err) {}
                })
            },
            onUploadPic1: function() {
                _g.openPicActionSheet({
                    allowEdit: true,
                    suc: function(ret) {
                        Http.ajax({
                            data: {
                                Base64: ret.base64Data.split(',')[1]
                            },
                            isSync: true,
                            url: '/good/goodPic.do',
                            success: function(ret) {
                                if (ret.code == 200) {

                                    create.img1 = CONFIG.HOST + ret.data;
                                } else {
                                    _g.toast(ret.msg);
                                }
                            },
                            error: function(err) {}
                        });

                    }
                });
            },
            onUploadPic2: function() {
                _g.openPicActionSheet({
                    allowEdit: true,
                    suc: function(ret) {
                        Http.ajax({
                            data: {
                                Base64: ret.base64Data.split(',')[1]
                            },
                            isSync: true,
                            url: '/good/goodPic.do',
                            success: function(ret) {
                                if (ret.code == 200) {

                                    create.img2 = CONFIG.HOST + ret.data;
                                } else {
                                    _g.toast(ret.msg);
                                }
                            },
                            error: function(err) {}
                        });

                    }
                });
            },
            onUploadPic3: function() {
                _g.openPicActionSheet({
                    allowEdit: true,
                    suc: function(ret) {
                        Http.ajax({
                            data: {
                                Base64: ret.base64Data.split(',')[1]
                            },
                            isSync: true,
                            url: '/good/goodPic.do',
                            success: function(ret) {
                                if (ret.code == 200) {

                                    create.img3 = CONFIG.HOST + ret.data;
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
    });
    module.exports = {};

});
