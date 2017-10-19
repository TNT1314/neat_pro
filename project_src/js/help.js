$(function() {

    "use strict"

    try {

        /** 初始化 **/
        init_model();

    } catch (e) {
        Tools.group("Inint Main Error.", e);
    }


    /*
     * 初始化菜单
     */
    function init_model(){

        var open_listenler = {
            option: "info",
            body: "this is model body",
            sure_show: "提交",
            sure:function(){
                Tools.info("这是模态窗口！");
            }
        };

        $("#openmodel").on("click", function(){
            OpenModal.open(open_listenler);
        });
    }

});