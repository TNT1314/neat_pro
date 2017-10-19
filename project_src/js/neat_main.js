$(function() {

    "use strict"

    try {

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
                NavTable.init_user(data);
            },
            complete:function(){
                NavTable.init_user();
            }
        };
        PageRequest.get_account_info(listener);
    }

    /*
     * 初始化菜单
     */
    function program_init_menu(){
        var listener = {
            success:function(data){
                NavTable.menu_init(data);
            },
            complete:function(){
                NavTable.menu_init();
            }
        };
        PageRequest.get_menus(listener);
    }

});