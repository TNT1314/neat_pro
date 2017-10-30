$(function() {

    "use strict";

    try {

        /** 初始化皮肤事件 **/
        NavTable.change_threme();

        /** 初始化用户资料 **/
        program_init_user();

        /** 初始化菜单 **/
        program_init_menu();

    } catch (e) {
        Tools.group("Inint Main Error.", e);
    }


    /*
     * 初始化菜单
     */
    function program_init_user(){
        var listener = {
            success:function(data){
                Tools.error("program_init_user", data);
                CommonUse.init_user(data.json);
            },
            complete:function(){
                if(Settings.debug){
                    CommonUse.init_user();
                }
            }
        };
        PageRequest.get_user_info(listener);
    }

    /*
     * 初始化菜单
     */
    function program_init_menu(){
        var listener = {
            success:function(data){
                Tools.error("program_init_menu", data);
                CommonUse.init_menu(data.json);
            }
        };
        PageRequest.get_menus(listener);
    }

});