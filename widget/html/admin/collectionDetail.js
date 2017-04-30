define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');
    var id = api.pageParam.id;
    var collectionDetail = new Vue({
        el: '#main',
        template: _g.getTemplate('admin/collectionDetail-body-V'),
        data: {
            show: false,
            name: '',
            startTime: '',
            endTime: '',
            up: 0,
            favNum: 0,
            institution: '',
            insPhone: '',
            type: '',
            requirement: '',
            amount: 0,
            describe: '',
            donateTo: '',
            donateAddr: '',
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
            onRefuseTap: function() {
                if (confirm('确认拒绝?')) {
                    Http.ajax({
                        data: {
                            id: id,
                            type: 0
                        },
                        isSync: true,
                        url: '/admin/auditCollection.do',
                        success: function(ret) {
                            if (ret.code == 200) {
                                _g.toast(ret.msg);
                                api.sendEvent({
                                    name: 'reload-collectionList',
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
                        url: '/admin/auditCollection.do',
                        success: function(ret) {
                            if (ret.code == 200) {
                                _g.toast(ret.msg);
                                api.sendEvent({
                                    name: 'reload-collectionList',
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
            },
            'time': function(data) {
                var time = new Date(data);
                return time.Format("yyyy-M-d hh:mm:ss");
            }
        },

    });

    function getData(index) {
        Http.ajax({
            data: {
                id: index
            },
            isSync: true,
            url: '/collection/detail.do',
            success: function(ret) {
                if (ret.code == 200) {
                    var data = ret.data;
                    collectionDetail.name = data.name || '';
                    collectionDetail.startTime = data.startTime || '';
                    collectionDetail.endTime = data.endTime || '';
                    collectionDetail.up = data.up || 0;
                    collectionDetail.favNum = data.favNum || 0;
                    collectionDetail.institution = data.institution || '';
                    collectionDetail.insPhone = data.insPhone || '';
                    collectionDetail.type = data.type || '';
                    collectionDetail.requirement = data.requirement || '';
                    collectionDetail.amount = data.amount || '';
                    collectionDetail.describe = data.describe || '';
                    collectionDetail.donateTo = data.donateTo || '';
                    collectionDetail.donateAddr = data.donateAddr || '';
                    // collectionDetail.evidenceImg = data.evidenceImg || [];
                    collectionDetail.img1 = data.evidenceImg[0] || '';
                    collectionDetail.img2 = data.evidenceImg[1] || '';
                    collectionDetail.img3 = data.evidenceImg[2] || '';
                    collectionDetail.img4 = data.evidenceImg[3] || '';
                    collectionDetail.img5 = data.evidenceImg[4] || '';
                    collectionDetail.img6 = data.evidenceImg[5] || '';
                    // for (var i = 0; i < data.evidenceImg.length; i++) {
                    //     collectionDetail.evidenceImg.push({
                    //         index: data.evidenceImg[i]
                    //     });
                    // }
                    // collectionDetail.evidenceImg.shift();
                    // alert(collectionDetail.evidenceImg);
                } else {
                    _g.toast(ret.msg);
                }
            },
            error: function(err) {}
        })
    }
    getData(id);

    module.exports = {};

});
