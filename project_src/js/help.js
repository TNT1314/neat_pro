$(function() {
    "use strict";
    var modal = "help";

    try {

        /** 初始化工具栏 **/
        init_toolbar(modal);

        /** **/
        init_server_paging();

    } catch (e) {
        Tools.group("Inint "+ modal +" Error.", e);
    }


    /*
     * 带条件的分页查询
     */

    function init_server_paging(){
        var theme = '';
        var source =
            {
                url: Settings.server + '/api/user/list/get',
                datatype: "json",
                root: 'DataRows',
                data: {},
                processdata:function(data){
                    var username = $("#"+ modal +"_search_username").val();
                    data.username = username;
                    var email = $("#"+ modal +"_search_email").val();
                    data.email = email;
                },
                beforeprocessing: function (data) {
                    source.totalrecords = data.TotalRows;
                },
                sort: function() {
                    $("#"+ modal +"_list").jqxGrid('updatebounddata','sort');
                },
                datafields: [
                    { name: 'id', type:'int'},
                    { name: 'last_login', type:'string'},
                    { name: 'username', type:'string' },
                    { name: 'email', type:'string' },
                    { name: 'is_staff', type:'string' },
                    { name: 'is_active', type:'string' },
                    { name: 'is_superuser', type:'string' },
                    { name: 'date_joined', type:'string' }
                ]
            };

        var adapter = new $.jqx.dataAdapter(source);

        $("#"+ modal +"_list").jqxGrid(
            {
                width: '100%',
                source: adapter,
                theme: theme,
                sortable: true,
                pageable: true,
                pagesize: 10,
                pagesizeoptions: [10],
                columnsresize: true,
                virtualmode: true,
                rendergridrows: function (params) {
                    return params.data;
                },
                columns:
                    [
                        { text: '唯一编号', datafield: 'id', cellsalign:"right", align: 'center' },
                        { text: '最近登录', datafield: 'last_login', cellsalign:"center", align: 'center'},
                        { text: '登录用户', datafield: 'username', cellsalign:"left", align: 'center' },
                        { text: '邮件地址', datafield: 'email', cellsalign:"left", align: 'center' },
                        { text: '后台登录', datafield: 'is_staff', cellsalign:"center", align: 'center' },
                        { text: '是否有效', datafield: 'is_active', cellsalign:"center", align: 'center' },
                        { text: '用户级别', datafield: 'is_superuser', cellsalign:"center", align: 'center' },
                        { text: '加入日期', datafield: 'date_joined', cellsalign:"center", align: 'center'}
                    ]
            }
        );

        $("#"+ modal +"_search").click(function () {
            $("#"+ modal +"_list").jqxGrid('updatebounddata');
        });

        $("#"+ modal +"_list").bind("bindingcomplete", function () {
            $(".jqx-dropdownlist-state-normal").css("height", "19px");
        });
    }


    /**
     * 初始化工具栏
     */
    function init_toolbar(modal){
        var listener = {
            success:function(data){
                CommonUse.get_toolbar_render(modal, toolbar_listenler, data.json.power);
            },
            complete:function(){
                CommonUse.get_toolbar_render(modal, toolbar_listenler);
            }
        };
        PageRequest.get_model_permision({'modal':modal}, listener);
    }

    function toolbar_listenler(modal){
        $("#"+ modal +"_inf").on("click", click_inf);
        $("#"+ modal +"_add").on("click", click_add);
    }

    /**
     * 查看方法
     */
    function click_inf(){
        var row_index = $("#"+ modal +"_list").jqxGrid('getselectedrowindex');

        if(ValidData(row_index) && row_index !== -1 ){

            var row_data = $("#"+ modal +"_list").jqxGrid('getrowdata', row_index);

            Tools.info("选中纪录数据:" + row_data);

        }else{
            CommonUse.select_row_warn();
        }
    }

    /**
     * 新增方法
     */
    function click_add(){
        AjaxRequest.ajax_form("help_change", function(html_text){
            var tmp_form = template.render(html_text,{modal: modal});
            var open_ready = {
                option: "add",
                body: tmp_form,
                sure: function(){
                    Tools.info("click_add");
                },
                sure_show: "添加用户"
            };
            OpenModal.open(open_ready);
        });
    }

})();