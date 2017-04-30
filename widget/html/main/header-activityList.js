define(function(require, exports, module) {
	api.removeLaunchView();
    var headerHeight = 0;
    var footerHeight = 0;
    var windowHeight = window.innerHeight;
    var UserInfo = _g.getLS('UserInfo');
    var Http = require('U/http');
    var header = new Vue({
        el: '#header',
        template: _g.getTemplate('main/header-active-V'),
        data: {
            active: 0,
            title: '活动列表',
            number: 5,
        },
        methods: {
            onTapLeftMenu: function() {
                api && api.sendEvent({
                    name: 'active-activityList-menu',
                });
            },
            onTapRightRemind: function() {
                api && api.sendEvent({
                    name: 'active-activityList-remind',
                });
            },
        }
    });
    function openFrameGroup() {
        headerHeight = $('#header').offset().height;
        // footerHeight = $('#footer').height();
        _g.setLS('appH', {
            'header': headerHeight,
            // 'footer': footerHeight,
            'win': windowHeight
        });
        api && api.openFrameGroup({
            name: 'active-group',
            scrollEnabled: false,
            rect: {
                x: 0,
                y: headerHeight,
                w: 'auto',
                h: windowHeight - headerHeight
            },
            index: 0,
            preload: 1,
            frames: [{
                name: 'active-activityList-frame',
                url: '../active/activityList.html',
                bounces: false,
                bgColor: '',
            }],
        }, function(ret, err) {
            // footer.active = ret.index;
        });
    }
    //新增活动提醒
        var getNewAlert=function(){
            if (UserInfo) {
                Http.ajax({
                data: {
                    memberid: UserInfo.member.id,
                    querytype: 'newdynamic',
                    queryvalue:'all'
                },
                isSync: true,
                lock: false,
                url: '/activity/queryall.php',
                success: function(ret) {
                    if (ret.code == 200) {
                         header.number=ret.data.length;
                        _g.toast(ret.msg);
                    }
                },
                error: function(err) {}
            });
            }
            else{
                return
            }
        }
      getNewAlert();  
    api.addEventListener({
        name:'activeList-hidden'
    },function(ret,err){
        if(ret.value.hidden == true) {
            api && api.setFrameGroupAttr({
                name: 'active-group',
                hidden:true
            });
        } else {
            api && api.setFrameGroupAttr({
                name: 'active-group',
                hidden:false
            });
        }
    });
    setTimeout(function() {
        openFrameGroup();
        api && api.setFrameGroupAttr({
            name: 'active-group',
            hidden:true
        });
    }, 0);
    module.exports = {};

});