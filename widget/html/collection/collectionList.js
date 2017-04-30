define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');

    var collectionList = new Vue({
        el: '#main',
        template: _g.getTemplate('collection/collectionList-body-V'),
        data: {
            show: false,
            sortIndex: 0,
            sortList: [{
                item: 0,
                content: "默认排序",
            }, {
                item: 1,
                content: "发布时间",
            }],
            mainList: [{
                id: 0,
                type: 0,
                amount: 0,
                name: '',
                institution: '',
                donateAddr: '',
                insPhone: '',
                endTime: '',
                evidenceImg: '',
            }]
        },
        created: function() {

        },
        methods: {
            onDetailTap: function(index) {
                _g.openWin({
                    header: {
                        data: {
                            title: '募捐表详情'
                        }
                    },
                    name: 'collection-collectionDetail-win',
                    url: '../collection/collectionDetail.html',
                    pageParam: {
                        id: collectionList.mainList[index].id
                    }
                });
            },
            onSortTap: function(index) {
                this.sortIndex = this.sortList[index].item;
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
            'time': function(data){
                var time = new Date(data);
                return time.Format("yyyy-M-d hh:mm:ss");
            }
        },

    });

    function getList() {
        Http.ajax({
            data: {

            },
            url: '/collection/list.do',
            success: function(ret) {
                if (ret.code == 200) {
                    var data = ret.data;
                    collectionList.mainList = getListValue(data);
                    // alert(_g.j2s(collectionList.mainList));
                } else {
                    _g.toast(ret.msg);
                }
            }
        })
    }

    function getListValue(result) {
        var list = result || [];
        return _.map(list, function(item, index) {
            return {
                id: item._id || 0,
                type: item.type || 0,
                amount: item.amount || 0,
                name: item.name || '',
                institution: item.institution || '',
                donateAddr: item.donateAddr || '',
                insPhone: item.insPhone || '',
                endTime: item.endTime || '',
                evidenceImg: item.evidenceImg[0] || '',
            }
        });
    }
    getList();
    // var mySwiper = new Swiper('.swiper-container', {
    //     direction: 'horizontal',
    //     loop: true,
    //     autoplay: 1500,
    //     speed: 1000,
    //     watchSlidesProgress: true,
    //     watchSlidesVisibility: true,
    //     pagination: '.swiper-pagination',
    //     paginationType: 'progress',
    // });
    module.exports = {};

});
