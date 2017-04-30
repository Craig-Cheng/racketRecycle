define(function(require, exports, module) {

    // api.actionSheet({
    //     title: '底部弹出框测试',
    //     cancelTitle: '这里是取消按钮',
    //     destructiveTitle: '红色警告按钮',
    //     buttons: ['1', '2', '3']
    // }, function(ret, err) {
    //     var index = ret.buttonIndex;
    //     alert(index)
    // });
    var $iosActionsheet = $('#iosActionsheet');
    var $iosMask = $('#iosMask');

    function hideActionSheet() {
        $iosActionsheet.removeClass('weui-actionsheet_toggle');
        $iosMask.fadeOut(200);
    }
    $iosMask.on('click', hideActionSheet);
    $('#iosActionsheetCancel').on('click', hideActionSheet);
    $("#showIOSActionSheet").on("click", function() {
        $iosActionsheet.addClass('weui-actionsheet_toggle');
        $iosMask.fadeIn(200);
    });

    _g.viewAppear(function() {
        alert(1)
        api.openWin({
            name: 'main-index-win',
            url: 'index.html',
            pageParam: {
                name: 'value'
            }
        });
    })

    // alert(new Date('10 28,2016 11:11:11'))

    module.exports = {};

});
