define(function(require, exports, module) {
    var Http = require('U/http');
    var UserInfo = _g.getLS('UserInfo');
    var sessionID = _g.getLS('sessionID');
    // _g.rmLS('userInfo');
    // alert(_g.j2s(UserInfo));
    var about = new Vue({
        el: '#main',
        template: _g.getTemplate('user/about-body-V'),
        data: {

        },
        created: function() {

        },
        methods: {
            onLogoutTap: function() {
                _g.rmLS('UserInfo');
                _g.rmLS('sessionID');
                api.sendEvent({
                    name: 'clear-user',
                });
                api.openWin({
                    name: 'user-login-win',
                    url: '../user/login.html',
                    pageParam: {}
                });
                _g.closeWins(['main-index-win', 'user-logout-win']);
            }
        },

    });

    module.exports = {};

});
