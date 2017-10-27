/** 业务请求方法类 **/

var PageRequest = {
    /** 安全退出接口 **/
    login_out:function(listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/api/user/logout';
        var s_data = {};
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = "正在登出，请稍候.....";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 获取账号信息 **/
    get_user_info:function(listener){
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/api/user/info/get';
        var s_data = {};
        var s_listener = listener;
        var s_timeout = 3000;
        var s_content = "";

        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 请求菜单接口 **/
    get_menus:function(listener){
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/account/permission/list/get';
        var s_data = {};
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = "";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 获取菜单权限接口 **/
    get_model_permision:function(r_data, listener){
        "use strict";
        
        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/account/model/permission/get';
        var s_data = r_data;
        var s_listener = listener;
        var s_timeout = 30000;
        var s_content = "";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    get_user_by_id:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/api/test/get/id';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 10000;
        var s_content = "";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content, false);
    }
};