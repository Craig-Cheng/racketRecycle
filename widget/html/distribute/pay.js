define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');
    var goodID = api.pageParam.goodID;
    var distributeID = api.pageParam.distributeID;
    var msg = api.pageParam.msg;
    var price = api.pageParam.price;
    // alert(goodID+'-----'+distributeID+'-----'+msg);
    var pay = new Vue({
        el: '#main',
        template: _g.getTemplate('distribute/pay-body-V'),
        data: {
            isShow: true,
            pwd: '',
            isFir: false,
            isSec: false,
            isThr: false,
            isFou: false,
            isFif: false,
            isSix: false,
            numberList: [{
                number: '1',
            }, {
                number: '2',
            }, {
                number: '3',
            }, {
                number: '4',
            }, {
                number: '5',
            }, {
                number: '6',
            }, {
                number: '7',
            }, {
                number: '8',
            }, {
                number: '9',
            }, {
                number: '',
            }, {
                number: '0',
            }, ]
        },
        created: function() {

        },
        methods: {
            onCancelTap: function() {
                api.setFrameAttr({
                    name: api.frameName,
                    hidden: true,
                });
            },
            onsumbitTap: function() {
                Http.ajax({
                    data: {
                        goodID: goodID,
                        locationID: distributeID,
                        leavingMsg: msg,
                        payPwd: pay.pwd,
                        price: price
                    },
                    isSync: true,
                    url: '/order/create.do',
                    success: function(ret) {
                        if (ret.code == 200) {
                            _g.toast(ret.msg);
                            api.setFrameAttr({
                                name: api.frameName,
                                hidden: true,
                            });
                           
                            api.sendEvent({
                              name: 'refresh-goodList'
                            });
                        } else {

                        }
                    },
                    error: function(err) {

                    }
                })
            },
            onOpenTap: function() {
                this.isShow = true;
            },
            onCloseTap: function() {
                this.isShow = false;
            },
            onDeleteTap: function() {
                if (this.pwd.length == 0) return;
                this.pwd = this.pwd.substring(0, this.pwd.length - 1);
                if (this.pwd != '') {
                    if (this.pwd.length < 2) {
                        this.isFir = true;
                        this.isSec = false;
                        this.isThr = false;
                        this.isFou = false;
                        this.isFif = false;
                        this.isSix = false;
                    } else if (this.pwd.length < 3) {
                        this.isFir = true;
                        this.isSec = true;
                        this.isThr = false;
                        this.isFou = false;
                        this.isFif = false;
                        this.isSix = false;
                    } else if (this.pwd.length < 4) {
                        this.isFir = true;
                        this.isSec = true;
                        this.isThr = true;
                        this.isFou = false;
                        this.isFif = false;
                        this.isSix = false;
                    } else if (this.pwd.length < 5) {
                        this.isFir = true;
                        this.isSec = true;
                        this.isThr = true;
                        this.isFou = true;
                        this.isFif = false;
                        this.isSix = false;
                    } else if (this.pwd.length < 6) {
                        this.isFir = true;
                        this.isSec = true;
                        this.isThr = true;
                        this.isFou = true;
                        this.isFif = true;
                        this.isSix = false;
                    } else if (this.pwd.length < 7) {
                        this.isFir = true;
                        this.isSec = true;
                        this.isThr = true;
                        this.isFou = true;
                        this.isFif = true;
                        this.isSix = true;
                    }
                } else {
                    this.isFir = false;
                    this.isSec = false;
                    this.isThr = false;
                    this.isFou = false;
                    this.isFif = false;
                    this.isSix = false;
                }
            },
            onPasswordInput: function(index) {
                if (this.pwd.length == 6) return;
                if (index == 0) {
                    this.pwd += '1';
                }
                if (index == 1) {
                    this.pwd += '2';
                }
                if (index == 2) {
                    this.pwd += '3';
                }
                if (index == 3) {
                    this.pwd += '4';
                }
                if (index == 4) {
                    this.pwd += '5';
                }
                if (index == 5) {
                    this.pwd += '6';
                }
                if (index == 6) {
                    this.pwd += '7';
                }
                if (index == 7) {
                    this.pwd += '8';
                }
                if (index == 8) {
                    this.pwd += '9';
                }
                if (index == 10) {
                    this.pwd += '0';
                }
                if (this.pwd != '') {
                    if (this.pwd.length < 2) {
                        this.isFir = true;
                        this.isSec = false;
                        this.isThr = false;
                        this.isFou = false;
                        this.isFif = false;
                        this.isSix = false;
                    } else if (this.pwd.length < 3) {
                        this.isFir = true;
                        this.isSec = true;
                        this.isThr = false;
                        this.isFou = false;
                        this.isFif = false;
                        this.isSix = false;
                    } else if (this.pwd.length < 4) {
                        this.isFir = true;
                        this.isSec = true;
                        this.isThr = true;
                        this.isFou = false;
                        this.isFif = false;
                        this.isSix = false;
                    } else if (this.pwd.length < 5) {
                        this.isFir = true;
                        this.isSec = true;
                        this.isThr = true;
                        this.isFou = true;
                        this.isFif = false;
                        this.isSix = false;
                    } else if (this.pwd.length < 6) {
                        this.isFir = true;
                        this.isSec = true;
                        this.isThr = true;
                        this.isFou = true;
                        this.isFif = true;
                        this.isSix = false;
                    } else if (this.pwd.length < 7) {
                        this.isFir = true;
                        this.isSec = true;
                        this.isThr = true;
                        this.isFou = true;
                        this.isFif = true;
                        this.isSix = true;
                    }
                } else {
                    this.isFir = false;
                    this.isSec = false;
                    this.isThr = false;
                    this.isFou = false;
                    this.isFif = false;
                    this.isSix = false;
                }
            },
        },
    });
    module.exports = {};

});
