define(function(require, exports, module) {
    api.removeLaunchView();
    var headerHeight = 0;
    var footerHeight = 0;
    var windowHeight = window.innerHeight;
    var UserInfo = _g.getLS('UserInfo');
    var Http = require('U/http');
    var header = new Vue({
        el: '#header',
        template: _g.getTemplate('common/header-base-V'),
        data: {
            active: 0,
            title: '在售商品',
            // isHome: 1,
            list: [
                '在售商品',
                '募捐',
                '收藏',
                '个人中心'
            ],
        },
        methods: {

        }
    });

    var footer = new Vue({
        el: '#footer',
        template: _g.getTemplate('main/footer-V'),
        data: {
            show: true,
            active: 0,
            list: [{

                title: '在售商品',
                tag: 'goods'
            }, {
                title: '募捐',
                tag: 'collection'
            }, {
                title: '收藏',
                tag: 'myCollection'
            }, {
                title: '个人中心',
                tag: 'home'
            }]
        },
        created: function() {

        },
        methods: {
            onItemTap: function(index) {
                if (this.active == index) return;
                this.active = index;
                // alert(header.list[index]);
                header.title = header.list[index];

                setFrameGroupIndex(index);
            },
        },
    });

    function openFrameGroup() {
        headerHeight = $('#header').offset().height;
        footerHeight = $('#footer').height();
        _g.setLS('appH', {
            'header': headerHeight,
            'footer': footerHeight,
            'win': windowHeight
        });
        api && api.openFrameGroup({
            name: 'main-group',
            scrollEnabled: false,
            rect: {
                x: 0,
                y: headerHeight,
                w: 'auto',
                h: windowHeight - headerHeight - footerHeight
            },
            index: 0,
            preload: 1,
            frames: [{
                name: 'good-sellList-frame',
                url: '../good/sellList.html?mod=dev',
                bounces: false,
                bgColor: '',
            }, {
                name: 'collection-collectionList-frame',
                url: '../collection/collectionList.html?mod=dev',
                bounces: false,
                bgColor: '',
            }, {
                name: 'user-myCollection-frame',
                url: '../user/myCollection.html?mod=dev',
                bounces: false,
                bgColor: '',
            }, {
                name: 'home-myInfo-frame',
                url: '../home/myInfo.html?mod=dev',
                bounces: false,
                bgColor: '',
            }],
        }, function(ret, err) {
            // var hidden = true;
            // if(ret.index == 1){
            //     hidden = true;
            // } else {
            //     hidden = false;
            // }

            //     api.sendEvent({
            //         name:'activeList-hidden',
            //         extra: {
            //             hidden: hidden
            //         }
            //     });
            footer.active = ret.index;
        });
    }

    function setFrameGroupIndex(index) {
        api && api.setFrameGroupIndex({
            name: 'main-group',
            index: index,
            scroll: false
        });
    }
    // 监听安卓返回按钮事件
    api && api.addEventListener({
        name: 'keyback'
    }, function(ret, err) {
        api.closeWidget();
    });

    setTimeout(function() {
        openFrameGroup();
    }, 0);

    api && api.addEventListener({
        name: 'main-index-openHome'
    }, function(ret, err) {
        setFrameGroupIndex(1);
    });

    module.exports = {};

});
