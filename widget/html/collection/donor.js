define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');
    var id = api.pageParam.id;
    var donor = new Vue({
        el: '#main',
        template: _g.getTemplate('collection/donor-body-V'),
        data: {
            sure: false,
            list: [{
                donorID: 0,
                collectionID: 0,
                name: '',
                phone: 0,
                describe: '',
                amount: 0,
                type: 0,
                isReceive: 0,
            }]
        },
        created: function() {
            this.list = [];
        },
        methods: {
            onSureTap: function(index) {
                Http.ajax({
                    data:{
                        donationID: donor.list[index].donorID,
                        collectionID: id
                    },
                    url: '/collection/donorStatus.do',
                    success: function(ret) {
                        if(ret.code == 200) {
                            _g.toast(ret.msg);
                            getData(id);
                        } else{
                            _g.toast(ret.msg);
                        }
                    },
                    error: function(err){}
                })
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
            url: '/collection/donorList.do',
            success: function(ret) {
                if (ret.code == 200) {
                    var data = ret.data;
                    donor.list = getListValue(data);
                    _g.toast(ret.msg);
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
                donorID: item.donationID._id  ||0,
                collectionID: item.donationID.collectionID  ||0,
                name: item.donationID.name  ||'',
                phone: item.donationID.phone  ||0,
                describe: item.donationID.describe ||'',
                amount: item.donationID.amount  ||0,
                type: item.donationID.type  ||0,
                isReceive: item.isReceive  ||0,
            }
        });

    }
    getData(id);
    module.exports = {};

});
