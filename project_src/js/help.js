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
                url: Settings.server + '/api/test/list/get',
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
            var tmp_form = template.render(html_text, { modal: modal});
            var open_ready = {
                title: "add",
                body: tmp_form,
                done: modal_done,
                sure: modal_sure,
                sure_show: "添加用户"
            };
            OpenModal.open(open_ready);
        });

        /** 提交方法 **/
        function modal_sure(){
            var item_grid = $("#"+ modal + "_item_list");
            var item_data = item_grid.jqxGrid('getrows');

            Tools.group("item_data:", item_data);
        }

        /** 加载完成监听 **/
        function modal_done(){
            var item_grid = $("#"+ modal + "_item_list");

            var theme = "";
            var data = [];
            var source = {
                localdata: data,
                datatype: "json",
                datafields:
                    [
                        { name: 'w_id', type: 'string' },
                        { name: 'w_name', type: 'string' },
                        { name: 'w_unit', type: 'string' },
                        { name: 'w_price', type: 'number' },
                        { name: 'w_count', type: 'number' },
                        { name: 'w_total', type: 'number' }
                    ],
                updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };

            var dataAdapter = new $.jqx.dataAdapter(source);

            item_grid.jqxGrid({
                width: '100%',
                theme: theme,
                editable: true,
                showstatusbar: true,
                source: dataAdapter,
                ready: function(){
                    item_grid.jqxGrid('hidecolumn', 'w_id');
                },
                renderstatusbar: function (status_bar) {

                    var container = $("<div class='table_tool_div'></div>");
                    var addButton = $("<div class='table_tool_btn'><span><i class='fa fa-plus'></i>添加</span></div>");
                    var delButton = $("<div class='table_tool_btn'><span><i class='fa fa-trash-o'></i>删除</span></div>");

                    var total_span = $("<div class='table_tool_total'>合计：¥<span class='table_total_edit'>0.00</span></div>");

                    container.append(addButton);
                    container.append(delButton);
                    container.append(total_span);

                    status_bar.append(container);

                    addButton.jqxButton({ theme: theme, width: 60, height: 20 });
                    delButton.jqxButton({ theme: theme, width: 65, height: 20 });

                    addButton.click(function() {
                        var row = {w_name:"", w_unit:"", w_price: 0, w_count: 1, w_total: 0.00};
                        item_grid.jqxGrid('addrow', 0, row);
                        var row_count = item_grid.jqxGrid('getdatainformation').rowscount;
                        item_grid.jqxGrid('selectrow', (row_count-1));
                        item_grid.jqxGrid('begincelledit', (row_count-1), "w_name");
                    });
                    delButton.click(function() {
                        var row_index = item_grid.jqxGrid('getselectedrowindex');
                        var row_count = item_grid.jqxGrid('getdatainformation').rowscount;
                        if (row_index >= 0 && row_index < row_count) {
                            item_grid.jqxGrid('deleterow', row_index);
                            total_plus();
                        }
                    });
                },
                columns: [
                    { text: '工序编号', datafield: 'w_id', columntype: 'numberinput', cellsalign: 'right', editable: false },
                    {
                        text: '工序名称',
                        datafield: 'w_name',
                        cellsalign: 'left',
                        columntype: 'combobox',
                        createeditor: function (row, column, editor) {
                            // assign a new data source to the combobox.
                            var d_set = {
                                url: Settings.server + '/api/test/list/name/get',
                                data: {},
                                async: true,
                                datatype: "json",
                                root: 'DataRows',
                                datafields: [
                                    { name: 'id' },
                                    { name: 'username' }
                                ]
                            };
                            // prepare the data
                            var edit_adapter = new $.jqx.dataAdapter(d_set,
                                {
                                    formatData: function (data) {
                                        data.username = editor.jqxComboBox('searchString');
                                        return data;
                                    }
                                });

                            editor.jqxComboBox({
                                width: '100%',
                                source: edit_adapter,
                                minLength: 2,
                                valueMember: "id",
                                displayMember: "username",
                                selectedIndex: 0,
                                autoOpen: true,
                                remoteAutoComplete: true,
                                promptText: "请填写工序名称",
                                search: function(text){
                                    edit_adapter.dataBind(text);
                                }
                            });

                            editor.bind('select', function(event){
                                var work_id = event.args.item.value;
                                var row_index = item_grid.jqxGrid('getselectedrowindex');

                                item_grid.jqxGrid('setcellvalue', row_index, 'w_id', work_id);

                                var resquest_callback = {
                                    success:function(data){

                                        item_grid.jqxGrid('setcellvalue', row_index, 'w_unit', data.json.is_superuser);
                                        item_grid.jqxGrid('setcellvalue', row_index, 'w_price', 0.36);

                                        var price = item_grid.jqxGrid('getcellvalue', row_index, 'w_price');
                                        var count = item_grid.jqxGrid('getcellvalue', row_index, 'w_count');

                                        var row_total = CharTools.multify(price,count);
                                        item_grid.jqxGrid('setcellvalue', row_index, 'w_total', row_total);

                                        total_plus();

                                        item_grid.jqxGrid('begincelledit', row_index, "w_price");
                                    }
                                };
                                PageRequest.get_user_by_id({id: work_id}, resquest_callback);
                            });
                        },
                        cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                            if (!ValidData(newvalue)) {
                                return oldvalue;
                            }
                        }
                    },
                    { text: '计量单位', datafield: 'w_unit', columntype: 'numberinput', cellsalign: 'left', editable: false },
                    {
                        text: '单位价格',
                        datafield: 'w_price',
                        columntype: 'numberinput',
                        createeditor: function (row, cellvalue, editor) {
                            editor.jqxNumberInput({ decimalDigits: 2, digits: 6});
                            editor.bind("valuechanged", function(event){
                                var price = event.args.value;
                                var row_index = item_grid.jqxGrid('getselectedrowindex');
                                var count = item_grid.jqxGrid('getcellvalue', row_index, 'w_count');

                                var row_total = CharTools.multify(price, count);
                                item_grid.jqxGrid('setcellvalue', row_index, 'w_total', row_total);

                                total_plus();
                            });
                        },
                        cellsalign: 'right',
                        cellsformat: 'c2'
                    },
                    {
                        text: '计件数量',
                        datafield: 'w_count',
                        columntype: 'numberinput',
                        createeditor: function (row, cellvalue, editor) {
                            editor.jqxNumberInput({ decimalDigits: 0, digits: 6});
                            editor.bind("valuechanged", function(event){
                                var row_index = item_grid.jqxGrid('getselectedrowindex');
                                var count = event.args.value;
                                var price = item_grid.jqxGrid('getcellvalue', row_index, 'w_price');

                                var row_total = CharTools.multify(price,count);
                                item_grid.jqxGrid('setcellvalue', row_index, 'w_total', row_total);

                                total_plus();
                            });
                        },
                        cellsalign: 'right'},
                    {
                        text: '总计价格',
                        datafield: 'w_total',
                        editable: false,
                        cellsalign: 'right',
                        cellsformat: 'c2'}
                ]
            });

            function total_plus(){
                var all_rows = item_grid.jqxGrid('getrows');
                var result_total = 0;
                for(var i=0; i< all_rows.length;i++){
                    result_total += all_rows[i].w_total;
                }
                var result_show = result_total.format(2);

                $(".table_total_edit").html(result_show);
            }
        }
    }
})();