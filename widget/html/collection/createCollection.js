define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');

    var createCollection = new Vue({
        el: '#main',
        template: _g.getTemplate('collection/createCollection-body-V'),
        data: {
            type: 0,
            amount: 0,
            requirement: '', //要求
            name: '', //活动名称
            describe: '', //活动描述
            institution: '', //机构名字
            insAddress: '', //机构地址
            insPhone: '', //联系电话
            donateTo: '', //受捐对象
            donateAddr: '', //受捐地址
            evidenceImg: [], //相关证明图片
            img1: '',
            img2: '',
            img3: '',
            img4: '',
            img5: '',
            img6: '',
        },
        created: function() {

        },
        methods: {
            onFinishTap: function() {
                 if (this.img1 == '' || this.img2 == '' || this.img3 == '' || this.img4 == '' || this.img5 == ''|| this.img6 == '') {
                    _g.toast('必须上传6张图片');
                    return;
                }
                this.evidenceImg.push(this.img1, this.img2, this.img3, this.img4, this.img5, this.img6);        
                Http.ajax({
                    data: {
                        type: createCollection.type,
                        amount: createCollection.amount,
                        requirement: createCollection.requirement,
                        name: createCollection.name,
                        describe: createCollection.describe,
                        institution: createCollection.institution,
                        insAddress: createCollection.insAddress,
                        insPhone: createCollection.insPhone,
                        donateTo: createCollection.donateTo,
                        donateAddr: createCollection.donateAddr,
                        evidenceImg: createCollection.evidenceImg,
                        
                    },
                    isSync: true,
                    url: '/collection/create.do',
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
                            url: '/collection/collectionPic.do',
                            success: function(ret) {
                                if (ret.code == 200) {

                                    createCollection.img1 = CONFIG.HOST + ret.data;
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
                            url: '/collection/collectionPic.do',
                            success: function(ret) {
                                if (ret.code == 200) {

                                    createCollection.img2 = CONFIG.HOST + ret.data;
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
                            url: '/collection/collectionPic.do',
                            success: function(ret) {
                                if (ret.code == 200) {

                                    createCollection.img3 = CONFIG.HOST + ret.data;
                                } else {
                                    _g.toast(ret.msg);
                                }
                            },
                            error: function(err) {}
                        });

                    }
                });
            },
            onUploadPic4: function() {
                _g.openPicActionSheet({
                    allowEdit: true,
                    suc: function(ret) {
                        Http.ajax({
                            data: {
                                Base64: ret.base64Data.split(',')[1]
                            },
                            isSync: true,
                            url: '/collection/collectionPic.do',
                            success: function(ret) {
                                if (ret.code == 200) {

                                    createCollection.img4 = CONFIG.HOST + ret.data;
                                } else {
                                    _g.toast(ret.msg);
                                }
                            },
                            error: function(err) {}
                        });

                    }
                });
            },
            onUploadPic5: function() {
                _g.openPicActionSheet({
                    allowEdit: true,
                    suc: function(ret) {
                        Http.ajax({
                            data: {
                                Base64: ret.base64Data.split(',')[1]
                            },
                            isSync: true,
                            url: '/collection/collectionPic.do',
                            success: function(ret) {
                                if (ret.code == 200) {

                                    createCollection.img5 = CONFIG.HOST + ret.data;
                                } else {
                                    _g.toast(ret.msg);
                                }
                            },
                            error: function(err) {}
                        });

                    }
                });
            },
            onUploadPic6: function() {
                _g.openPicActionSheet({
                    allowEdit: true,
                    suc: function(ret) {
                        Http.ajax({
                            data: {
                                Base64: ret.base64Data.split(',')[1]
                            },
                            isSync: true,
                            url: '/collection/collectionPic.do',
                            success: function(ret) {
                                if (ret.code == 200) {

                                    createCollection.img6 = CONFIG.HOST + ret.data;
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
