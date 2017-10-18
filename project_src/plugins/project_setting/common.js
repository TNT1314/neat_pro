/** 主界面处理 auther:wormer **/

/** 字符 处理类 **/
var CharTools = {
    /** 字符串转List方法 **/
    str2array:function(chars){
        return eval(chars);
    },
    /** 字符串转Json方法 **/
    str2json:function(chars){
        return JSON.parse(chars);
    },
    /** 字符串转Json方法 **/
    json2str:function(josno){
        return JSON.stringify(josno);
    },
    /** 格式化INT类型 **/
    parse_int:function(ints){
        return parseInt(ints);
    },
    isString:function (str){
        var valid_result = false
        if(str.length!=0){    
            reg=/^[a-zA-Z0-9_]+$/;     
            if(reg.test(str)){valid_result = true;}
        }
        return valid_result;
    }
};

/** 表单处理类 **/
var FormTools = {
    
    /** 表单类工具 **/
    group_checked:function(form_id){
        $('#'+form_id).find($(":checkbox")).on('click', function(){
            if($(this).is(':checked')){ 
                $(this).siblings().attr('checked', false).attr('checked',true);
            }
        });
    }
};


/** 模态窗口处理类 **/
var OpenModal = {
    
    /** 弹出层，处理单据明细页面**/
    open:function(listener){
        "use strict"

        $('#modal_div').addClass("modal_div_show");
        $('#modal_div').find(".close").on('click',function(){OpenModal.close();});
        $('#modal_div').find("#modal_cancel").on('click',function(){OpenModal.close();});
        
        var modal_title = null;
        if(listener.option === "info"){
            modal_title = '<div style="color:#00c0ef;"><i class="fa fa-search"></i>查看信息</div>';
        }else if(listener.option === "add"){
            modal_title = '<div style="color:#00a65a;"><i class="fa fa-plus"></i>添加信息</div>';
        }else if(listener.option === 'edit'){
            modal_title = '<div style="color:#3c8dbc;"><i class="fa fa-edit"></i>修改信息</div>';
        }else{
            modal_title = listener.title;
        }
        $('#modal_div').find(".modal-title").empty().html(modal_title);
        $('#modal_div').find(".modal-body").empty().html(listener.body);
        $("#modal_submit").html(listener.sure_show).on('click',
            function(){ if(typeof listener.sure === "function"){ listener.sure();}}
        );
    },

    /** 收起处理单据明细页面 **/
    close:function(){
        "use strict"
        
        $('#modal_div').find(".modal-title").empty().html("模态窗口");
        $('#modal_div').find(".modal-body").empty().html("等待添加");
        $("#modal_div").removeClass("modal_div_show");
        $("#modal_submit").off("click");
    },
    
    /** 处理选择类 确认框 **/
    open_confirm:function(listener){
        "use strict"

        $('#modal_content_div').addClass("modal_content_div_show");
        $('#modal_content_div').find(".close").on('click',function(){OpenModal.close_confirm();});
        $('#modal_content_div').find("#modal_content_cancel").on('click',function(){OpenModal.close_confirm();});

        var confirm_title = null;
        if(listener.option === 'confirm'){
            confirm_title = '<div style="color:#f39c12;"><i class="fa fa-check-square-o"></i>确认提交</div>';
        }else if(listener.option === 'audit'){
            confirm_title = '<div style="color:#f39c12;"><i class="fa fa-check-square-o"></i>审批确认</div>';
        }else if(listener.option === 'delete'){
            confirm_title = '<div style="color:#dd4b39;"><i class="fa fa-trash-o"></i>删除确认</div>';
        }else if(listener.option === 'edit'){
            confirm_title = '<div style="color:#dd4b39;"><i class="fa fa-edit"></i>确认修改</div>';
        }else{
            confirm_title = listener.title;
        }
        $('#modal_content_div').find(".modal-title").empty().html(confirm_title);
        $('#modal_content_div').find(".modal-body").empty().html(listener.body);
        $("#modal_content_submit").html(listener.sure_show).on('click',
            function(){ if(typeof listener.sure === "function"){listener.sure();}}
        );
    },
    
    /** 关闭选择类 确认框 **/
    close_confirm:function(){
        "use strict"
        
        $('#modal_content_div').find(".modal-title").empty().html("弹出窗口");
        $('#modal_content_div').find(".modal-body").empty().html("等待添加");
        $("#modal_content_div").removeClass("modal_content_div_show");
        $("#modal_content_submit").off("click");
    },
    
    /** 处理所有的确认框.类似alert **/
    open_alert:function(listener){
        "use strict"

        var show = function(htmltext){

            if($('#modal_alert_div').length == 0 ){

                var html = template.render(htmltext, listener);

                $('body').append(html);

                $('#modal_alert_div').find($(".alert_colose")).on(
                    'click',
                    function(){

                        if(typeof listener.sure === 'function'){  listener.sure(); }

                        OpenModal.close_alert();
                });
            }

        };

        AjaxRequest.ajax_widget('widget/modal_alert.html', show);
    },
    /** 关闭 处理所有的确认框**/
    close_alert:function(){
        "use strict"

        $('#modal_alert_div').remove();
    },

    /** 处理耗时的请求或页面类加载时显示 **/
    open_loading:function(content){
        "use strict"
        
        if(!ValidData(content)){
            content = "加载文件中，请稍后......"
        }

        var show = function(htmltext){

            if($('#modal_loading_div').length == 0 ){

                var html = template.render(htmltext, {'content': content});

                $('body').append(html);
            }

        };

        AjaxRequest.ajax_widget('widget/modal_loading.html', show);
    },
    /** 关闭处理耗时的请求或页面类加载时显示 **/
    close_loading:function(){
        "use strict"

        $("#modal_loading_div").remove();
    }
};

/*
 *
 * 联想控件处理
 *
 */
var AutoInput = function (option){
    var element_id = option.id;
    var element = $("#"+element_id);
    var query = option.query;
    var query_length = option.query_length;

    element.autocomplete({
        minLength: query_length,//最小联想长度，当输入内容长度达到这个长度时才进行联想
        width: '100%',
        source: function(request, response){
            if(typeof query === "function"){
                var results = search(request.term);
                response(
                    $.map(results, function(item){
                        return { label: item.name, value: item.id }
                    })
                );
            }else{
                Tools.group("option query is not function.", "option:" + option);
            }
        },
        select: function(event, ui) {
            obj.val(ui.item.label);
            if($("#menu_"+ui.item.value).parent().parent().hasClass("treeview-menu") && !$("#menu_"+ui.item.value).parent().parent().parent().hasClass("active")){
                $("#menu_"+ui.item.value).parent().parent().parent().children().first().click();
            }
            $("#menu_"+ui.item.value).click();
            return false;
        },
        focus: function(event, ui){ obj.val(ui.item.label); return false; }
    });

    element.on("keydown",function(event){ if(event.keyCode===8) obj.val(""); });
};


/*
 *
 * ajax 全局对象，用于加载文件，数据，及其他。
 *
 */
var AjaxRequest = {
    /** 加载出错网页信息 **/
    html_str: '<div class="nav-tab-content-null">加载文件出错!</div>',
    /** 缓存局部页面 **/
    cached_tp: [],
    /** 缓存js **/
    cached_js: [],
    
    /** 判断局部文件是否已经加载 **/
    cache_tp_has:function(url){
        "use strict"
        
        var result = {had:false, html_str: null}
        for(var _cahced in AjaxRequest.cached_tp){
            if(AjaxRequest.cached_tp[_cahced].url == url){
                result.had = true;
                result.html_str = AjaxRequest.cached_tp[_cahced].html_str;
                break;
            }
        }
        return result;
    },
    
    /** 判断js文件是否已经缓存 **/
    cache_js_has:function(url){
        "use strict"
        
        var v_had = false;
        for(var v_url in this.cached_js){
            if(v_url == url){v_had = true;break;}
        }
        if(!v_had) this.cached_js.push(url)
        return v_had
    },
    
    /** ajax加载js插件方法 **/
    ajax_file_script:function(url, method, options){
        "use strict"
        
        if(AjaxRequest.cache_js_has(url)){
            Tools.info("Loading Cache Js File Finished.");
            if(typeof method=='function') method();
        }else{
            options = $.extend( options || {}, {dataType: "script",url: url,cache: true}); 
            return $.ajax(options).done(
                function(){
                    Tools.info("Loading Ajax Js File Finished.");
                    if(typeof method=='function') method();
                });
            
        }
    },
    
    /** 网络请求局部模版文件方法: **/
    ajax_file:function(url, listener, content){
        "use strict"

        var tp_cached = AjaxRequest.cache_tp_has(url);

        if(tp_cached.had){

            Tools.info("Loading Cached File Success.");

            if(typeof listener === "function"){ listener(tp_cached.html_str); }

        }else{

            OpenModal.open_loading(content);

            var load_html_done =  function(responseTxt, statusTxt, xhr){

                OpenModal.close_loading();

                if(statusTxt === "success"){

                    AjaxRequest.cached_tp.push({url: url, html_str: responseTxt});

                    Tools.info("Loading File Success.");

                }else{

                    Tools.error("Loading File Error.", url, responseTxt, xhr);

                }

                if(typeof listener === "function"){ listener(responseTxt); }
            };

            $("<div></div>").load(url, load_html_done);
        }
    },

    /** 网络请求控件方法: **/
    ajax_widget:function(url, listener){
        "use strict"

        var tp_cached = AjaxRequest.cache_tp_has(url);

        if(tp_cached.had){

            Tools.info("Loading Cached File Success.");

            if(typeof listener === "function"){ listener(tp_cached.html_str);}

        }else{
            var load_file_listenser =  function(responseTxt, statusTxt, xhr){

                if(statusTxt === "success"){

                    Tools.info("Ajax Loading File Success.");

                    if(typeof listener === "function"){ listener(responseTxt); }

                    AjaxRequest.cached_tp.push({url: url, html_str: responseTxt});

                }else{
                    Tools.error("Ajax Loading File Error.", url, responseTxt);
                }
            };
            $("<div></div>").load(url, load_file_listenser);
        }
    },
    
    /**
     * 网络请求jsonp数据方法:
     * type: 请求方式
     * url: 请求地址(相对地址 说明:)
     * data: 请求数据
     * listener: 监听方法包括 success，error
     */
    ajax_jsonp: function (type, url, data, listener, timeout, content) {
        "use strict"
        
        // 默认超时时间
        timeout = timeout===undefined || timeout==null ? 3*60*1000 : timeout;
        
        // 默认正在加载内容
        content = content===undefined || content==null ? '正在努力加载中，请稍候...' : content;
        
        // 如果正在加载需要加入文字，则加入文字显示
        OpenModal.open_loading(content);
        
        // 定义数据格式化形式
        if(Settings.ajax_format == 'jsonp'){
            data.format = Settings.ajax_format;
        }
        
        $.ajax({
            type: type,
            url: url,
            data: data,
            dataType: Settings.ajax_format,
            timeout: timeout,
            context: $('body'),
            success: function (data) {
                if(data.code === 0){
                    if(typeof listener.success === "function"){
                        listener.success(data);
                    }
                }else if(data.code === 10001 || data.code === 10002){
                    $(location).attr('href', 'index.html');
                }else{
                    Tools.group("Ajax Request Business Error.", data);
                    if(typeof listener.error === "function"){
                        listener.error(data.code, data.code_desc);
                    }else{
                        var error_mess = "请求错误！ 错误代码:" + data.code + " 错误原因:" + data.code_desc;
                        OpenModal.open_alert({option: 'error', body: error_mess});
                    }     
                }   
            },
            error: function (xhr, htl) {
                OpenModal.open_alert({option: 'error', body: "网络错误，请稍候重试！"});

                Tools.error("Request Error", type, url, Settings, data, xhr, htl);
            },
            complete: function(){
                OpenModal.close_loading();
                if(typeof listener.complete === "function"){ listener.complete();}
            }
        });
    }
}

/** 测试页面跳转 **/
var NavOpenAction = {

    action:{},
    //存储action
    set_cached_action:function (data) {
        "use strict"
        var s_data = data;
        if(s_data != null){
            NavOpenAction.action = null;
            NavOpenAction.action = s_data;
        }
    },
    //判断action类型，执行对应操作
    get_cached_action:function(){
        "use strict"
        if (NavOpenAction.action != null){
            var action = NavOpenAction.action;
            NavOpenAction.action = null;
            return  action;
        }else {
            return null;
        }
    },
    /** do_some_action **/
    do_some_action:function () {
        "use strict"
        //页面跳转
        if (NavOpenAction.action != null){
            var action = NavOpenAction.action;
            $("#"+action.model+"_"+action.action).click();
        }
    }
}

/**
* 面板切换类，控制菜单打开
*/
var NavTable = {
    
    /** 存放所有菜单 **/
    cache_menus: [],
    
    /** 从接口数据抽取数据 **/
    set_cached_menus: function(menus_data){
        "use strict"
        
        for(var i=0;i<menus_data.length;i++){
            var menu_data = menus_data[i];
            NavTable.cache_menus.push(menu_data);
            if (menu_data.childs.length > 0 ){ NavTable.set_cached_menus(menu_data.childs);}
        }
    },
    
    /** 从缓存中进行检索 **/
    search_cached_menu:function(condition){
        "use strict"
        
        var like_list = [];
        for(var i = 0 ; i < NavTable.cache_menus.length; i++){
            var one_menu = NavTable.cache_menus[i];
            if(one_menu.name.indexOf(condition) >= 0){ like_list.push(one_menu);}
        }
        return like_list;
    },

    /** 初始化菜单 **/
    menu_init:function(data){
        "use strict"

        if(!ValidData(data)){
            data = { menus: [] };
        }
        data.server = Settings.server;

        if(Settings.debug){
            var help = {
                id: 100000,
                perm_url: '/help?',
                model_name: 'help',
                name: "开发帮助",
                perm_icon: "fa-question-circle",
                childs: [],
            };
            data.menus.push(help);
        }

        NavTable.set_cached_menus(data.menus);

        var temp_ready = function(htmltext){
            var html_str = template.render(htmltext, data);
            $(".sidebar-menu").append(html_str);
            $('.click_menu').on('click', function(e){
                if($(e.target).attr('data-click') == 'on'){
                    NavTable.addTab(e.target);
                }
            });
            $(".nav-click-lable").on('click',function(){
               $(this).next().click();
            });

            NavTable.open_menu_by_name("开发帮助");
            Tools.info("Init Menus Success.");
        };

        AjaxRequest.ajax_widget("widget/menu.html", temp_ready);
    },
    
    /** 根据菜单名称打开菜单 **/
    open_menu_by_name:function(condition){
        "use strict"
        
        var menu = null;
        for(var i = 0; i < NavTable.cache_menus.length; i++){
            var one_menu = NavTable.cache_menus[i];
            if(one_menu.name == condition){  menu=one_menu; break;}
        }
        if(menu!=null){ NavTable.open_menu(menu);}
    },

    /** 测试页面跳转 **/
    open_menu_by_name_new:function(condition,data){
        "use strict"

        var menu = null;
        for(var i = 0; i < NavTable.cache_menus.length; i++){
            var one_menu = NavTable.cache_menus[i];
            if(one_menu.name == condition){  menu=one_menu; break;}
        }
        if(menu!=null){
            if (data != null){
                NavOpenAction.set_cached_action(data);
            }
            NavTable.open_menu(menu);
        }
    },

    /**
    * 打开菜单
    */
    open_menu:function(menu){
        "use strict"
        
        if($("#menu_"+menu.id).parent().parent().hasClass('treeview-menu')){
            $("#menu_"+menu.id).parent().parent().parent().children().first().click();
        }
        $("#menu_"+menu.id).click();
    },
    
    /** 点击菜单添加lab */
	addTab:function(menu){
        "use strict"
        
        var m_id =  $(menu).attr("data-id");
        var m_model = $(menu).attr("data-model");
        var m_name = $(menu).attr("data-name");

        var m_close = m_model === 'dashboard' ? false : true;
        var load_file_content = "正在加载文件中，请稍等......";
    
		var id = "tab_seed_" + m_id;
		var container = "tab_container_" + m_id;

		$("li[id^=tab_seed_]").removeClass("active");
		$("div[id^=tab_container_]").removeClass("active");
            
		if(!$('#'+id)[0]){
            /** 添加页签 **/
            var dom_i = m_close ? '<img src="images/close2.gif" class="nav-tab-close" id="close_'+ id +'" tabclose="'+ id +'" ></img>':'';
            var dom_a = '<a class="nav-tab-a" href="#'+ container +'" role="tab" data-toggle="tab" >'+ m_name + dom_i +'</a>';
            $('#main-nav-tab').append('<li role="presentation" class="" id="'+id+'">' + dom_a + '</li>');

            /** 添加容器 **/
			$('#page_container').append('<div role="tabpanel" class="tab-pane nav-panel-self" id="'+ container +'"></div>');

			/** 添加关闭菜单 **/
            if(m_close){ $('#close_'+id).on( "click", function(){ NavTable.closeTab(this);});}

            var load_html = function(htmltext){

                $('#'+container).html(htmltext);

                $("#"+id).addClass("active");

                $("#"+container).addClass("active");

                var load_js_down = function(){

                    Tools.info("Add NavTab Success.");

                };

                var jss = [];

                var js_input = $('#'+container).find($(".ajax_load_plugs"));

                if(js_input){

                    var js_str = js_input.val();

                    if(ValidData(js_str)){ jss = js_str.split(',');}

                }

                //加载页面js,放到加载最后，等待插件加载完成
                if(ValidData(m_model)){ jss.push(m_model+".js"); }
                
                /** 加载所有需要的js **/
                NavTable.loading_plugs(jss, load_js_down);
            };
            AjaxRequest.ajax_file("pages/"+m_model+".html", load_html, load_file_content);
		}else{

            $("#"+id).addClass("active");

            $("#"+container).addClass("active");

            NavOpenAction.do_some_action();
        }
	},

	/** 关闭tab面板 **/
	closeTab:function(item){
        "use strict"

        try{
            var val = $(item).attr('tabclose');

            var containerId = "tab_container_" + val.substring(9);

            if($('#'+containerId).hasClass('active')){

                $('#'+val).siblings().first().addClass('active');

                $('#'+containerId).siblings().first().addClass('active');
            }

            $("#"+val).remove();
            $("#"+containerId).remove();

        }catch(e){
            Tools.error("error", e);
        }
	},
    
    /** 添加插件 **/
    loading_plugs:function(url_list, listen){
        "use strict"
        
        Tools.info("Page Dependens Page:" + url_list.length);

        for(var i=0;i<url_list.length;i++){

            if(i+1 == url_list.length){

                AjaxRequest.ajax_file_script('js/' + url_list[i], listen);

            }else{

                AjaxRequest.ajax_file_script('plugins/' + url_list[i]);
            }
        }
    }
    
}

/** 列表方法类 **/
var TableTools = {
    /** 请求方式 **/
    ajax_type: 'GET',
    
    /** 数据返回格式 **/
    ajax_format: Settings.ajax_format,
    
    /** 获取选中纪录的值 **/
    get_table_selected:function(table, column){
        "use strict"
        
        /** 获取选中纪录某个字段 **/
        return table.rows('.selected').data().length==1 ? table.rows('.selected').data()[0][column] : null;
    },
    
    /** table list 获取请求地址 **/
    get_url:function(url){
        "use strict"
        
        return Settings.ajax_format=='jsonp' ? Settings.server + url + '?format=jsonp' : Settings.server + url;
    },
    
    /** table list 单选监听 **/
    selected_listener:function(table, table_name){
        $('#'+table_name+' tbody').on('click', 'tr', function () {
            if($(this).hasClass('selected') ) {
                $(this).removeClass('selected');
            }else{
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
    }
}

/** 业务请求方法类 **/
var PageRequest = {
    /** 安全退出接口 **/
    login_out:function(listener){
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
        
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
        "use strict"
        
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
        "use strict"
        
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/firesafety/image/upload';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = "正在提交图片数据，请稍等......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    sub_firesafety:function(data, listener){
        "use strict"
        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/firesafety/submit';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = "正在提交工单数据，请稍等......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    del_firesafety:function(data, listener){
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
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
        "use strict"
        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/statistics/tar/get';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = "正在请求打包，请稍候......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
    get_worker_targzfile_reult:function(data, listener){
        "use strict"
        var s_type = 'POST';
        var s_url = Settings.server + '/fmap/api/statistics/worker/tar/get';
        var s_data = data;
        var s_listener = listener;
        var s_timeout = 60000;
        var s_content = "正在请求打包，请稍候......";
        AjaxRequest.ajax_jsonp(s_type, s_url, s_data, s_listener, s_timeout, s_content);
    },
}

/**
 * 自定义正则表达示验证方法
 */
//电话号码
$.validator.addMethod("isMobile", function(value, element) {
    var length = value.length;
    var mobile = /^1[3,5,7,8]\d{9}$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写电话号码");
//邮箱
$.validator.addMethod("isEmail", function(value, element) {
    var length = value.length;
    var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return this.optional(element) || email.test(value);
}, "请正确填写邮箱");
//商户名称
$.validator.addMethod("isValidity",function(value, element) {
    var validity = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
    return this.optional(element) || validity.test(value);
},"请正确填写信息");
//信用代码
$.validator.addMethod("isSocialRedit", function(value, element) {
    var socialRegex = /^[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}$/;
    return this.optional(element) || socialRegex.test(value);
}, "请正确填写营业执照编码");
//整数
$.validator.addMethod("isPositive",function(value, element) {
    var validity = /^\d+(?=\.{0,1}\d+$|$)/;
    return this.optional(element) || validity.test(value);
},"请正确填写信息");
//身份证
$.validator.addMethod("isIdentityCard",function(value, element) {
    var validity = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
    return this.optional(element) || validity.test(value);
},"请正确填写信息");
//账号密码
$.validator.addMethod("isPWD",function(value, element) {
    var validity = /^.{3,}$/;
    return this.optional(element) || validity.test(value);
},"请正确填写密码");

//resize of div
(function($, h, c) {
    var a = $([]),
        e = $.resize = $.extend($.resize, {}),
        i,
        k = "setTimeout",
        j = "resize",
        d = j + "-special-event",
        b = "delay",
        f = "throttleWindow";
    e[b] = 250;
    e[f] = true;
    $.event.special[j] = {
        setup: function() {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {
                w: l.width(),
                h: l.height()
            });
            if (a.length === 1) {
                g();
            }
        },
        teardown: function() {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length) {
                clearTimeout(i);
            }
        },
        add: function(l) {
            if (!e[f] && this[k]) {
                return false;
            }
            var n;
            function m(s, o, p) {
                var q = $(this),
                    r = $.data(this, d);
                r.w = o !== c ? o: q.width();
                r.h = p !== c ? p: q.height();
                n.apply(this, arguments);
            }
            if ($.isFunction(l)) {
                n = l;
                return m;
            } else {
                n = l.handler;
                l.handler = m;
            }
        }
    };
    function g() {
        i = h[k](function() {
                a.each(function() {
                    var n = $(this),
                        m = n.width(),
                        l = n.height(),
                        o = $.data(this, d);
                    if (m !== o.w || l !== o.h) {
                        n.trigger(j, [o.w = m, o.h = l]);
                    }
                });
                g();
            },
            e[b]);
    }
})(jQuery, this);