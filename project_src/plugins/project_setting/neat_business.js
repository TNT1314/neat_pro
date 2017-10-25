/** 业务请求方法类 **/

var PageRequest = {
    /** 安全退出接口 **/
    login_out:function(listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/account/logout';
        var s_data = {};
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = "正在登出，请稍候.....";
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
    /** 获取账号信息 **/
    get_account_info:function(listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/account/info/get';
        var s_data = {};
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = "";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 查看 **/
    get_dashbord_data:function(listener) {
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/statistics/dashborad/get';
        var s_data = {};
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = '正在提交数据，请稍候...';
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 查询用户信息 **/
    get_account_lenovo:function(data, listener){
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/base/account/list/get';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 30000;
        var s_content = "";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 查询商铺信息 **/
    get_shop_lenovo:function(data, listener){
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/base/shop/list/get';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 30000;
        var s_content = "";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /* 修改用户信息 */
    account_info_modify:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/account/info/modify';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = '正在提交数据，请稍候...';
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /* 修改用户信息密码验证 */
    account_info_verify:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/account/info/verify';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = '正在提交数据，请稍候...';
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 添加区域 **/
    get_region_area_list:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/region/areas/get';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = '正在加载区域数据，请稍候...';
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 添加区域 **/
    add_region:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/region/add';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = '正在提交数据，请稍候...';
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 修改区域 **/
    edi_region:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/region/modify';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = '正在提交数据，请稍候...';
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 审核区域 **/
    aud_region:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/region/review';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = '正在提交数据，请稍候...';
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 删除区域 **/
    del_region:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/region/disable';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = '正在提交数据，请稍候...';
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 根据区域id获取区域的详细信息 **/
    get_region_by_id:function(data, listener){
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/region/get';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = '正在查询数据中，请稍候......';
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 获取增加商品时需要的选择列表 **/
    get_shop_choice:function(listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/base/shop/choice/get';
        var s_data = {};
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = "加载行业信息中，请稍候......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 根据商品ID获取商品详细信息 **/
    get_shop_by_id:function(data, listener){
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/shop/get';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 120000;
        var s_content = "正在查询数据，请稍候......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 添加货修改商铺信息 **/
    change_shop:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/shop/change';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 120000;
        var s_content = "正在提交数据，请稍候......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 审核商铺信息 **/
    aud_shop:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/shop/audit';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 120000;
        var s_content = "正在提交数据，请稍候......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 删除商铺信息 **/
    del_shop:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/shop/delete';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 120000;
        var s_content = "正在提交数据，请稍候......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 地图获取区域信息 **/
    map_get_regions:function(listener){
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/map/regions/list/get';
        var s_data = {};
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = '正在查询数据中，请稍候......';
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 地图获取商铺信息 **/
    map_get_shops:function(listener){
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/map/shops/list/get';
        var s_data = {};
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = '正在查询数据中，请稍候......';
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 地图获取商铺信息 **/
    map_get_shop:function(data, listener){
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/map/shop/get';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = '正在查询数据中，请稍候......';
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** map打印接口 **/
    map_print_image:function(listener, r_data, content){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/map/image2pdf';
        var s_data = r_data;
        var s_listener = listener;
        var s_timeout = 30000;
        var s_content = content;
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 消防工单检查项配置 **/
    get_firesafety_setting:function(listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/firesafety/setting/get';
        var s_data = {};
        var s_listener = listener;
        var s_timeout = 30000;
        var s_content = "获取消防工单配置中，请稍等...";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 消防工单列表 **/
    get_firesafety_list:function(listener, r_data, content){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/firesafety/list/get';
        var s_data = r_data;
        var s_listener = listener;
        var s_timeout = 30000;
        var s_content = content;
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 增加消防工单列表 **/
    change_firesafety:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/firesafety/update';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 30000;
        var s_content = "正在提交工单数据，请稍等......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 根据消防工单主表ID获取信息 **/
    get_firesafety_by_id:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/firesafety/get';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 30000;
        var s_content = "正在获取工单数据，请稍等......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 根据消防工单主表ID获取信息 **/
    get_firesafety_query_by_id:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/firesafety/query/get';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 30000;
        var s_content = "正在获取工单数据，请稍等......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 根据消防工单主表ID获取信息 **/
    upload_firesafety_images:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/firesafety/image/upload';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = "正在提交图片数据，请稍等......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    sub_firesafety:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/firesafety/submit';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = "正在提交工单数据，请稍等......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    del_firesafety:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/firesafety/delete';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = "正在删除工单数据，请稍等......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 测试接口 **/
    get_shows:function(listener,content){
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/app/show';
        var s_data = {};
        var s_listener = listener;
        var s_timeout = 30000;
        var s_content = content;
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 模糊查询人员信息 **/
    get_base_role_list:function(data, listener){
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/base/role/list/get';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 120000;
        var s_content = "正在查询数据，请稍候......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 获取用户创建基础信息 **/
    get_account_choice:function( listener){
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/account/choice/get';
        var s_data = {};
        var s_listener = listener;
        var s_timeout = 120000;
        var s_content = "正在查询数据，请稍候......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 获取用户信息 **/
    get_account_by_id:function(data, listener){
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/account/get';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 120000;
        var s_content = "正在查询数据，请稍候......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 添加用户信息 **/
    change_account:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/account/change';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 120000;
        var s_content = "正在提交数据，请稍候......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 删除用户信息 **/
    del_account:function(data, listener){
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/account/delete';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 120000;
        var s_content = "正在提交数据，请稍候......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 获取权限列表 **/
    get_permission_info_list:function (listener) {
        "use strict";

        var s_type = 'GET';
        var s_data = {};
        var s_url = Settings.server + '/fmap/api/base/permission/list/get';
        var s_listener = listener;
        var s_timeout = 120000;
        var s_content = "正在获取权限信息数据，请稍候......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 查询角色 **/
    get_role_by_id:function(data, listener){
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/role/get';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 30000;
        var s_content = "正在获取角色信息，请稍等......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 新增、修改角色 **/
    add_role:function(data, listener) {
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/role/change';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = '正在提交数据，请稍候...';
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 根据区域id获取消息的详细信息 **/
    get_push_message_by_id:function(data, listener){
        "use strict";

        var s_type = 'GET';
        var s_url = Settings.server + '/fmap/api/push_message/get';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = '正在查询数据中，请稍候......';
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 添加消息 **/
    add_push_message:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/push_message/add';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = '正在提交数据，请稍候...';
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 删除消息 **/
    del_push_message:function(data, listener) {
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/push_message/disable';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = '正在提交数据，请稍候...';
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 获取商铺检测状态列表、行业列表 **/
    get_map_base_chioce:function(listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/base/map/choice/get';
        var s_data = {};
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = "加载基础数据中，请稍候......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    /** 获取商铺检测状态列表、行业列表 **/
    get_targzfile_reult:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/statistics/tar/get';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = "正在请求打包，请稍候......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    get_worker_targzfile_reult:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/statistics/worker/tar/get';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = "正在请求打包，请稍候......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    get_user_by_id:function(data, listener){
        "use strict";

        var s_type = 'POST';
        var s_url = Settings.server + '/api/user/get/id';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 10000;
        var s_content = "";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content, false);
    }
};