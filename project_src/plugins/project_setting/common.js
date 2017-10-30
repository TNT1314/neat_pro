/** 主界面处理 auther:wormer **/

/** 字符 处理类 **/
var CharTools = {
    /** 字符串转List方法 **/
    str2array:function(chars){
        "use strict";

        return eval(chars);
    },
    /** 字符串转Json方法 **/
    str2json:function(chars){
        "use strict";

        return JSON.parse(chars);
    },
    /** 字符串转Json方法 **/
    json2str:function(josno){
        "use strict";

        return JSON.stringify(josno);
    },
    /** 格式化INT类型 **/
    parse_int:function(ints){
        "use strict";

        return parseInt(ints);
    },
    isString:function (str){
        "use strict";

        var valid_result = false;
        if(str.length!==0){
            var reg = /^[a-zA-Z0-9_]+$/;
            if(reg.test(str)){valid_result = true;}
        }
        return valid_result;
    },
    addplus:function (arg1, arg2){
        "use strict";

        if (isNaN(arg1)) {
            arg1 = 0;
        }
        if (isNaN(arg2)) {
            arg2 = 0;
        }
        arg1 = Number(arg1);
        arg2 = Number(arg2);
        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m;
    },
    multify:function(arg1, arg2) {
        "use strict";

        if (isNaN(arg1)) {
            arg1 = 0;
        }
        if (isNaN(arg2)) {
            arg2 = 0;
        }
        arg1 = Number(arg1);
        arg2 = Number(arg2);

        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        }
        catch (e) {
        }
        try {
            m += s2.split(".")[1].length;
        }
        catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    }
};

/** 表单处理类 **/
var FormTools = {
    
    /** 表单类工具 **/
    group_checked:function(form_id){
        "use strict";

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
        "use strict";

        var load_ready = function(html_text){

            if( $('#modal_div').length === 0){

                var html = template.render(html_text, listener);

                $('body').append(html);

                if(typeof listener.done === "function"){ listener.done(); }

                $('#modal_div').find(".close").on('click', function(){ OpenModal.close(); });

                $('#modal_div').find("#modal_cancel").on('click',function(){ OpenModal.close();});

                $('#modal_div').find("#modal_submit").on('click',function(){

                    if(typeof listener.sure === "function"){
                        listener.sure();
                        OpenModal.close();
                    }
                });
            }

        };

        AjaxRequest.ajax_widget('widget/modal.html', load_ready);
    },

    /** 收起处理单据明细页面 **/
    close:function(){
        "use strict";

        $("#modal_div").remove();
    },
    
    /** 处理选择类 确认框 **/
    open_confirm:function(listener){
        "use strict";

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
        "use strict";
        
        $('#modal_content_div').find(".modal-title").empty().html("弹出窗口");
        $('#modal_content_div').find(".modal-body").empty().html("等待添加");
        $("#modal_content_div").removeClass("modal_content_div_show");
        $("#modal_content_submit").off("click");
    },
    
    /** 处理所有的确认框.类似alert **/
    open_alert:function(listener){
        "use strict";

        var show = function(htmltext){

            if($('#modal_alert_div').length === 0 ){

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
        "use strict";

        $('#modal_alert_div').remove();
    },

    /** 处理耗时的请求或页面类加载时显示 **/
    open_loading:function(content){
        "use strict";
        
        if(!ValidData(content)){
            content = "加载文件中，请稍后......";
        }

        var show = function(htmltext){

            if($('#modal_loading_div').length === 0 ){

                var html = template.render(htmltext, {'content': content});

                $('body').append(html);
            }

        };

        AjaxRequest.ajax_widget('widget/modal_loading.html', show);
    },
    /** 关闭处理耗时的请求或页面类加载时显示 **/
    close_loading:function(){
        "use strict";

        $("#modal_loading_div").remove();
    }
};



/*
 *
 * 联想控件处理
 *
 */
var AutoInput = function (option){
    "use strict";

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
        "use strict";
        
        var result = {had:false, html_str: null};

        for(var _cahced in AjaxRequest.cached_tp){

            if(AjaxRequest.cached_tp[_cahced].url === url){

                result.had = true;

                result.html_str = AjaxRequest.cached_tp[_cahced].html_str;

                break;

            }

        }

        return result;

    },
    
    /** 判断js文件是否已经缓存 **/
    cache_js_has:function(url){
        "use strict";
        
        var v_had = false;

        for(var v_url in this.cached_js){

            if(v_url === url){v_had = true;break;}

        }
        if(!v_had) { this.cached_js.push(url); }

        return v_had;
    },
    
    /** ajax加载js插件方法 **/
    ajax_file_script:function(url, method, options){
        "use strict";
        
        if(AjaxRequest.cache_js_has(url)){

            Tools.info("Loading Cache Js File Finished.");

            if(typeof method==='function'){method();}

        }else{
            options = $.extend( options || {}, {dataType: "script",url: url,cache: true});

            return $.ajax(options).done(

                function(){
                    Tools.info("Loading Ajax Js File Finished.");

                    if(typeof method==='function'){method();}

                });
            
        }

    },
    
    /** 网络请求局部模版文件方法: **/
    ajax_file:function(url, listener, content){
        "use strict";

        var tp_cached = AjaxRequest.cache_tp_has(url);

        if(tp_cached.had){

            Tools.info("Loading Cached File Success.");

            if(typeof listener === "function"){

                listener(tp_cached.html_str);

            }

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

                if(typeof listener === "function"){

                    listener(responseTxt);

                }
            };

            $("<div></div>").load(url, load_html_done);
        }
    },

    ajax_form:function(pagename, listener){
        "use strict";

        var content = "加载模版中，请稍等...";

        var url = "pages/form/"+ pagename +".html";

        this.ajax_file(url, listener, content);
    },

    /** 网络请求控件方法: **/
    ajax_widget:function(url, listener){
        "use strict";

        var tp_cached = AjaxRequest.cache_tp_has(url);

        if(tp_cached.had){

            Tools.info("Loading Cached File Success.");

            if(typeof listener === "function"){ listener(tp_cached.html_str);}

        }else{
            var load_file_listenser =  function(responseTxt, statusTxt, xhr){

                if(statusTxt === "success"){

                    AjaxRequest.cached_tp.push({url: url, html_str: responseTxt});

                    Tools.info("Ajax Loading File Success.");

                    if(typeof listener === "function"){ listener(responseTxt); }

                }else{
                    Tools.error("Ajax Loading File Error.", url, responseTxt, xhr);
                }
            };
            try{
                $("<div></div>").load(url, load_file_listenser);
            }catch (e){
                Tools.error("Error", e);
                console.trace();
            }

        }
    },
    
    /**
     * 网络请求jsonp数据方法:
     * type: 请求方式
     * url: 请求地址(相对地址 说明:)
     * data: 请求数据
     * listener: 监听方法包括 success，error
     */
    ajax_jsonp: function (type, url, data, listener, timeout, content, show) {
        "use strict";
        
        // 默认超时时间
        timeout = timeout===undefined || timeout===null ? 3*60*1000 : timeout;
        
        // 默认正在加载内容
        content = content===undefined || content===null ? '正在努力加载中，请稍候...' : content;

        // 展示遮罩
        show = show===undefined || show===null ? true: show;
        
        // 如果正在加载需要加入文字，则加入文字显示
        if(show){
            OpenModal.open_loading(content);
        }

        
        // 定义数据格式化形式
        if(Settings.ajax_format === 'jsonp'){
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
                if(data.code === 10000){
                    if(typeof listener.success === "function"){
                        listener.success(data);
                    }
                }else if(data.code === 10001 || data.code === 10002){
                    $(location).attr('href', 'index.html');
                }else{
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
                if(show){ OpenModal.close_loading(); }
                if(typeof listener.complete === "function"){ listener.complete(); }
            }
        });
    }
}

/** 测试页面跳转 **/
var NavOpenAction = {

    action:{},
    //存储action
    set_cached_action:function (data) {
        "use strict";

        var s_data = data;
        if(s_data !== null){
            NavOpenAction.action = null;
            NavOpenAction.action = s_data;
        }
    },
    //判断action类型，执行对应操作
    get_cached_action:function(){
        "use strict";

        if (NavOpenAction.action !== null){
            var action = NavOpenAction.action;
            NavOpenAction.action = null;
            return  action;
        }else {
            return null;
        }
    },
    /** do_some_action **/
    do_some_action:function () {
        "use strict";

        //页面跳转
        if (NavOpenAction.action !== null){
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
        "use strict";
        
        for(var i=0;i<menus_data.length;i++){
            NavTable.cache_menus.push(menus_data[i]);
            if (menus_data[i].childs.length > 0 ){
                for(var j=0;j<menus_data[i].childs.length;i++){
                    NavTable.cache_menus.push(menus_data[i].childs[j]);
                }
            }
        }
    },
    
    /** 从缓存中进行检索 **/
    search_cached_menu:function(condition){
        "use strict";
        
        var like_list = [];
        for(var i = 0 ; i < NavTable.cache_menus.length; i++){
            var one_menu = NavTable.cache_menus[i];
            if(one_menu.name.indexOf(condition) >= 0){ like_list.push(one_menu);}
        }
        return like_list;
    },

    /** 变更皮肤方法 **/
    change_threme:function(){
        "use strict";

        $(".full-opacity-hover").on("click",function(){
            var theme = $(this).attr("data-skin");
            $("body").removeClass().addClass(theme + " sidebar-mini");
        });

    },
    
    /** 根据菜单名称打开菜单 **/
    open_menu_by_name:function(condition){
        "use strict";
        
        var menu = null;
        for(var i = 0; i < NavTable.cache_menus.length; i++){
            var one_menu = NavTable.cache_menus[i];
            if(one_menu.name == condition){  menu=one_menu; break;}
        }
        if(menu!=null){ NavTable.open_menu(menu);}
    },

    /** 测试页面跳转 **/
    open_menu_by_name_new:function(condition,data){
        "use strict";

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
        "use strict";
        
        if($("#menu_"+menu.id).parent().parent().hasClass('treeview-menu')){
            $("#menu_"+menu.id).parent().parent().parent().children().first().click();
        }
        $("#menu_"+menu.id).click();
    },
    
    /** 点击菜单添加lab */
	addTab:function(menu){
        "use strict";
        
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

            var load_html = function(html_text){

                var renderd = template.render(html_text, {modal: m_model});

                $('#'+ container).html(renderd);

                $("#"+ id).addClass("active");

                $("#"+ container).addClass("active");

                var jss = [];

                var js_input = $('#'+ container).find($(".ajax_load_plugs"));

                if(js_input){

                    var js_str = js_input.val();

                    if(ValidData(js_str)){ jss = js_str.split(',');}

                }

                //加载页面js,放到加载最后，等待插件加载完成
                if(ValidData(m_model)){ jss.push(m_model+".js"); }
                
                /** 加载所有需要的js **/
                NavTable.loading_plugs(jss, function(){ Tools.info("Add NavTab Success."); });

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
        "use strict";

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
        "use strict";

        Tools.info("Page Dependens Page:" + url_list.length);

        for(var i=0;i<url_list.length;i++){

            if((i+1) === url_list.length){

                AjaxRequest.ajax_file_script('js/' + url_list[i], listen);

            }else{

                AjaxRequest.ajax_file_script('plugins/' + url_list[i]);
            }
        }
    }
    
};

/** 常用弹出框！ **/
var CommonUse = {

    /** 初始化用户 **/
    init_user:function(data){
        "use strict";

        if(!ValidData(data) && Settings.debug){
            data = {
                username: "Wormer",
                name: "wormer.cn",
                company_name: "建设者家园网络科技有限公司"
            };
        }

        // // 加载左侧用户信息
        // AjaxRequest.ajax_widget(
        //     "widget/user_left.html",
        //     function(html_text){
        //         var html_str = template.render(html_text, data);
        //         $(html_str).insertBefore($("#menu_search"));
        //     }
        // );

        // 加载顶部用户信息
        AjaxRequest.ajax_widget(
            "widget/user_top.html",
            function(html_text){
                if($("#user_top").length === 0 ){
                    var html_str = template.render(html_text, data);
                    $(html_str).insertBefore($("#menus_setting"));

                    $(".neat-login-out").on('click', function(){
                        PageRequest.login_out({
                           success:function(data){
                               if(data.code === 10000){
                                   $(location).attr('href', 'neat_login.html');
                               }else{
                                   OpenModal.open_alert({
                                       option: "error",
                                       body:data.code_desc
                                   });
                               }
                           }
                        });
                    });
                }
            }
        );
    },

    /** 初始化菜单 **/
    init_menu:function(data){
        "use strict";

        if(!ValidData(data)){
            data = { menus: [] };
        }
        data.server = Settings.server;

        if(Settings.debug){
            var help = {
                id: 100000,
                code: "HELP",
                modal: 'help',
                name: "开发帮助",
                icon: "fa-question-circle",
                childs: []
            };
            data.menus.push(help);
        }

        NavTable.set_cached_menus(data.menus);

        var temp_ready = function(html_text){

            if($(".sidebar-menu").find('a').length===0){

                var html_str = template.render(html_text, data);
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

                NavTable.set_cached_menus(data.menus);
            }
            Tools.info("Init Menus Success.");
        };

        AjaxRequest.ajax_widget("widget/menu.html", temp_ready);
    },
    select_row_warn:function(){
        "use strict";

        OpenModal.open_alert({
            option: "warn",
            body: "请选择一条数据进行操作!"
        });
    },
    get_toolbar_render:function(modal, action, powers){
        "use strict";

        if(Settings.debug === true){
            powers = {
                inf:true,
                add:true,
                edi:true,
                aud:true,
                del:true
            };
        }

        var toolbar_ready = function(html_text){

            var data = {};
            data.modal = modal;
            data.powers = powers;

            var html_str = template.render(html_text, data);

            $("#"+ modal).find($(".temp_toolbar_left")).html(html_str);

            if(typeof action === 'function'){ action(modal); }
        };

        AjaxRequest.ajax_widget("widget/toolbar.html", toolbar_ready);
    }
};

/**
 * 自定义正则表达示验证方法
 */
//电话号码
$.validator.addMethod("isMobile", function(value, element) {
    "use strict";

    var length = value.length;
    var mobile = /^1[3,5,7,8]\d{9}$/;
    return this.optional(element) || (length === 11 && mobile.test(value));
}, "请正确填写电话号码");
//邮箱
$.validator.addMethod("isEmail", function(value, element) {
    "use strict";

    var length = value.length;
    var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return this.optional(element) || email.test(value);
}, "请正确填写邮箱");
//商户名称
$.validator.addMethod("isValidity",function(value, element) {
    "use strict";

    var validity = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
    return this.optional(element) || validity.test(value);
},"请正确填写信息");
//信用代码
$.validator.addMethod("isSocialRedit", function(value, element) {
    "use strict";

    var socialRegex = /^[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}$/;
    return this.optional(element) || socialRegex.test(value);
}, "请正确填写营业执照编码");
//整数
$.validator.addMethod("isPositive",function(value, element) {
    "use strict";

    var validity = /^\d+(?=\.{0,1}\d+$|$)/;
    return this.optional(element) || validity.test(value);
},"请正确填写信息");
//身份证
$.validator.addMethod("isIdentityCard",function(value, element) {
    "use strict";

    var validity = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
    return this.optional(element) || validity.test(value);
},"请正确填写信息");
//账号密码
$.validator.addMethod("isPWD",function(value, element) {
    "use strict";

    var validity = /^.{3,}$/;
    return this.optional(element) || validity.test(value);
},"请正确填写密码");

//resize of div
(function($, h, c) {
    "use strict";

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