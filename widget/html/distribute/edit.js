define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');
    var id = api.pageParam.id;

    var edit = new Vue({
        el: '#main',
        template: _g.getTemplate('distribute/edit-body-V'),
        data: {
            UIActionSelector: '',
            name: '',
            phone: '',
            province: '',
            city: '',
            area: '',
            detail: '',
        },
        created: function() {

        },
        methods: {
            onFinishTap: function() {
                Http.ajax({
                    data: {
                        id: id,
                        name: edit.name,
                        phone: edit.phone,
                        province: edit.province,
                        city: edit.city,
                        area: edit.area,
                        detail: edit.detail,
                    },
                    isSync: true,
                    url: '/location/edit.do',
                    success: function (ret) {
                        if(ret.code == 200){
                            _g.toast(ret.msg);
                            api.sendEvent({
                                name: 'location-del'
                            });
                            api.closeWin();
                        } else{
                            _g.toast(ret.msg);
                        }
                    },
                    error: function(err){}
                })
            },
            onSelectLocation: function() {
                getAddress();
            },
            onCancelTap: function() {
                api.closeWin();
            }
        },
    });

    function getAddress() {
        var UIActionSelector = api.require('UIActionSelector');
        UIActionSelector.open({
            datas: 'widget://res/Regions.json',
            layout: {
                row: 5,
                col: 3,
                height: 30,
                size: 12,
                sizeActive: 14,
                rowSpacing: 5,
                colSpacing: 10,
                maskBg: 'rgba(0,0,0,0.2)',
                bg: '#fff',
                color: '#888',
                colorActive: '#f00',
                colorSelected: '#f00'
            },
            animation: true,
            cancel: {
                text: '取消',
                size: 12,
                w: 90,
                h: 35,
                bg: '#fff',
                bgActive: '#ccc',
                color: '#888',
                colorActive: '#fff'
            },
            ok: {
                text: '确定',
                size: 12,
                w: 90,
                h: 35,
                bg: '#fff',
                bgActive: '#ccc',
                color: '#888',
                colorActive: '#fff'
            },
            title: {
                text: '请选择',
                size: 12,
                h: 44,
                bg: '#eee',
                color: '#888'
            },
            fixedOn: api.frameName
        }, function(ret, err) {
            if (ret) {
                // alert(JSON.stringify(ret));
                var address = new Array(3);
                address[0] = ret.level1;
                address[1] = ret.level2;
                address[2] = ret.level3;
                if (address[0] == address[1]) {
                    edit.province = address[0];
                    edit.city = address[2];
                } else {
                    edit.province = address[0];
                    edit.city = address[1];
                    edit.area = address[2];
                }
            } else {
                // alert(JSON.stringify(err));
            }
        });
    }

    function getData() {
        Http.ajax({
            data: {
                id: id
            },
            isSync: true,
            url: '/location/detail.do',
            success: function(ret) {
                if (ret.code == 200) {
                    var data = ret.data;
                    edit.name = data.name;
                    edit.phone = data.phone;
                    edit.province = data.province;
                    edit.city = data.city;
                    edit.area = data.area;
                    edit.detail = data.detail;
                } else {
                    _g.toast(ret.msg);
                }
            },
            error: function(err) {}
        })
    }
    getData();
    module.exports = {};

});
