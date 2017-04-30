define(function(require, exports, module) {
    var Http = require('U/http');
    var headerHeight = 0;
    var footerHeight = 0;
    var windowHeight = window.innerHeight;
    // var messageRead = setInterval(getMessageRead, 300000);
    var UserInfo = _g.getLS('UserInfo');
    var pageIndex = 1;
    var pageSize = 10;
    var unReadMsg = new Array();
    var header = new Vue({
        el: '#header',
        template: _g.getTemplate('main/header-search-V'),
        data: {
            isHome: true,
            isAllMatch: false,
            isPersonal: false,
            active: 0,
            title: '足球推荐',
            isHome: 1,
            list: [
                '足球推荐',
                '全部赛事',
                '个人中心',
            ],
        },
        methods: {
            onTapRightSelect:function(){
                  _g.openWin({
                    header: {
                        data: {
                            title: '赛事筛选',
                        },
                        template: 'common/header-searchMatch-V',
                    },
                    name: 'match-eventFifter',
                    url: '../match/eventFifter.html',
                    bounces: false,
                    slidBackEnabled: false,
                    pageParam: {
                        
                    }
                });
            },
            onTapRightSearch:function(){
                _g.openWin({
                    header: {
                        data: {
                            title: '赛事筛选',
                        },
                        template: 'common/header-searchMatch-V',
                    },
                    name: 'match-eventFifter',
                    url: '../match/eventFifter.html',
                    bounces: false,
                    slidBackEnabled: false,
                    pageParam: {
                        
                    }
                });
            },
            onTapRightSetUp:function(){
                  _g.openWin({
                    header: {
                        data: {
                            title: '设置',
                        },
                        template: '',
                    },
                    name: 'personal-setUp',
                    url: '../personal/setUp.html',
                    bounces: false,
                    slidBackEnabled: false,
                    pageParam: {

                    }
                });
            }
        }
    });
    // var header = new Vue({
    //     el: '#header',
    //     template: _g.getTemplate('main/header-search-V'),
    //     data: {
    //         title: '足球推荐',
    //     },
    //     methods: {

    //     }
    // });
    var footer = new Vue({
        el: '#footer',
        template: _g.getTemplate('main/footer-V'),
        data: {
            show: true,
            active: 0,
            list: [{
                title: '首页',
                tag: 'home',
            }, {
                title: '全部赛事',
                tag: 'allMatch'
            }, {
                title: '个人中心',
                tag: 'personal'
            }]
        },
        methods: {
            onItemTap: function(index) {
                if (this.active == index) return;
                if(index == 0) {
                    header.isHome = true;
                    header.isAllMatch = false;
                    header.isPersonal = false;
                    api.sendEvent({
                        name:'home-home-refresh'
                    })
                } else if(index == 1) {
                    header.isHome = false;
                    header.isAllMatch = true;
                    header.isPersonal = false;
                    api.sendEvent({
                        name:'home-allMatch-refresh'
                    })

                } else if(index == 2) {
                    header.isHome = false;
                    header.isAllMatch = false;
                    header.isPersonal = true;
                    api.sendEvent({
                        name:'home-personal-refresh'
                    })
                } else 
                header.title = this.list[index].title;
                setFrameGroupIndex(index);
            },
        }
    });

    function setFrameGroupIndex(index) {
        api && api.setFrameGroupIndex({
            name: 'main-group',
            index: index,
            scroll: false
        });
    }

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
                h: windowHeight- headerHeight - footerHeight
            },
            index: 0,
            preload: 1,
            frames: [{
                name: 'home-home-frame',
                url: '../home/home.html?mod=dev',
                bounces: true,
                bgColor: '#ededed',
            }, {
                name: 'home-allMatch-frame',
                url: '../home/allMatch.html?mod=dev',
                bounces: true,
                bgColor: '#ededed',
            }, {
                name: 'home-personal-frame',
                url: '../home/personal.html',
                bounces: true,
                bgColor: '#ededed',
            }]
        }, function(ret, err) {
            // var isAllMatch = true;
            // var isPersonal = true;
            // if(ret.index == 0){
            //     isAllMatch = true;
            //     isPersonal = true;
            // } else if(ret.index == 1){
            //     isAllMatch = false;
            //     isPersonal = true;
            // } else if(ret.index == 2){
            //     isAllMatch = true;
            //     isPersonal = false;
            // }
            // api.sendEvent({
            //     name:'allMatch-hidden',
            //     extra: {
            //         isAllMatch: isAllMatch
            //     }
            // });
            // api.sendEvent({
            //     name:'personal-hidden',
            //     extra: {
            //         isPersonal: isPersonal
            //     }
            // });
            footer.active = ret.index;
        });
    }
    
    setTimeout(function() {
        openFrameGroup()
    }, 0);

    module.exports = {};

});
