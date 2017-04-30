define(function(require, exports, module) {

    // baseWin头部操作事件

    function Func() {
        this['account-myInfos'] = {
            onTapRightEdit: function() {
                this.isEdit = false;
                api.sendEvent({
                    name: 'account-myInfos-edit',
                });
            },
            onTapRightSave: function() {
                this.isEdit = true;
                api.sendEvent({
                    name: 'account-myInfos-save',
                });
            },
        },
        this['active-activityDetail'] = {
            onTapLeftMenu: function() {
                api.sendEvent({
                    name: 'active-activityDetail-menu',
                });
            },
            onTapRightRemind: function() {
                api.sendEvent({
                    name: 'active-activityDetail-openMsg',
                });
            },
        },
        this['fans-myFans'] = {
            onTapRightRemind: function() {
                api.sendEvent({
                    name: 'fans-myFans-openMsg',
                });
            }
        },
        this['follow-follow'] = {
            onTapRightRemind: function() {
                api.sendEvent({
                    name: 'follow-follow-openMsg',
                });
            }
        },
        this['myFollow-myFollow'] = {
            onTapRightRemind: function() {
                api.sendEvent({
                    name: 'myFollow-myFollow-openMsg',
                });
            }
        },
        this['release-myRelease'] = {
            onTapRightRemind: function() {
                api.sendEvent({
                    name: 'release-myRelease-openMsg',
                });
            }
        },
        this['collection-myCollection'] = {
            onTapRightRemind: function() {
                api.sendEvent({
                    name: 'collection-myCollection-openMsg',
                });
            }
        },
        this['active-myActivity'] = {
            onTapRightRemind: function() {
                api.sendEvent({
                    name: 'active-myActivity-openMsg',
                });
            }
        },
        this['search-index'] = {
            onSearchInput: function() {
                this.isSearchInput = !!this.searchText;
                if (!this.isSearchInput) return;
                // api && api.sendEvent({
                //     name: 'index-search-nameList',
                //     extra: {
                //         goods_name: this.searchText
                //     }
                // });
            },
            onSearchClearTap: function() {
                this.searchText = '';
                this.isSearchInput = false;
            },
            onTapRightBtn: function() {
                if (!this.isSearchInput) return;
                api && api.sendEvent({
                    name: 'search-index-search',
                    extra: {
                        searchText: this.searchText
                    }
                });
            }
        };
        this['setting-user'] = {
            onTapRightBtn: function() {
                api.sendEvent({
                    name: 'setting-user-save',
                });
            }
        };
        this['message-index'] = {
            onTapRightBtn: function() {
                api.sendEvent({
                    name: 'message-index-edit',
                });
            }
        };
        this['me-answer'] = {
            onTapRightBtn: function() {
                api.sendEvent({
                    name: 'me-answer-edit',
                });
            }
        };
    }

    Func.prototype = {
        get: function(page) {
            return this[page] || {}
        }
    };

    Func.prototype.constructor = Func;

    module.exports = new Func();

});
