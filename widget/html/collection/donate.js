define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');
    var id = api.pageParam.id;
    var donate = new Vue({
        el: '#main',
        template: _g.getTemplate('collection/donate-body-V'),
        data: {
            type: '',
            amount: '',
            name: '',
            phone: '',
            describe: '',
        },
        created: function() {

        },
        methods: {
            onFinishTap: function() {
                Http.ajax({
                    data: {
                        collectionID: id,
                        type: donate.type,
                        amount: donate.amount,
                        name: donate.name,
                        phone: donate.phone,
                        describe: donate.describe
                    },
                    url: '/donation/create.do',
                    success: function(ret) {
                        if (ret.code == 200) {
                            _g.toast(ret.msg);
                            setTimeout(function() {
                               _g.closeWins['collection-donate-win','collection-collectionDetail-win'];
                            }, 500)
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
            },
            'time': function(data) {
                var time = new Date(data);
                return time.Format("yyyy-M-d hh:mm:ss");
            }
        },

    });
    module.exports = {};

});
