$(function() {

    "use strict"

    try {

        /** 初始化 **/
        init_model();

        /** **/
        init_server_paging();

        init_paging();

        init_grid();
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


    /*
     * 带条件的分页查询
     */

    function init_server_paging(){
        var theme = '';
        var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'id', type:'int'},
                    { name: 'last_login', type:'string'},
                    { name: 'username', type:'string' },
                    { name: 'email', type:'string' },
                    { name: 'is_staff', type:'string' },
                    { name: 'is_active', type:'string' },
                    { name: 'is_superuser', type:'string' },
                    { name: 'date_joined', type:'string' }
                ],
                url: Settings.server + '/api/user/list/get',
                data: {},
                root: 'DataRows',
                processdata:function(data){//对data属性的扩展
                    var username = $("#username").val();
                    data.username = username;
                    var email = $("#email").val();
                    data.email = email;
                },
                beforeprocessing: function (data) {
                    source.totalrecords = data.TotalRows;
                },
                sort: function() {
                    $("#serving").jqxGrid('updatebounddata','sort');
                }
            };

        var dataAdapter = new $.jqx.dataAdapter(source);

        $("#serving").jqxGrid(
            {
                width: '100%',
                source: dataAdapter,
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
                        { text: '默认状态', datafield: 'is_superuser', cellsalign:"center", align: 'center' },
                        { text: '加入日期', datafield: 'date_joined', cellsalign:"center", align: 'center'}
                    ]
            }
        );


        $("#serving_search").click(function () {
            $("#serving").jqxGrid('updatebounddata');
        });

        $("#serving").bind("bindingcomplete", function () {
            $(".jqx-dropdownlist-state-normal").css("height", "19px");
        });
    }

    /*
     * 初始化分页表格
     */

    function init_paging(){
        var url = "images/testdata/beverages.txt";

        // prepare the data
        var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'name', type: 'string' },
                    { name: 'type', type: 'string' },
                    { name: 'calories', type: 'int' },
                    { name: 'totalfat', type: 'string' },
                    { name: 'protein', type: 'string' }
                ],
                id: 'id',
                url: url
            };

        var dataAdapter = new $.jqx.dataAdapter(source);

        $("#paging").jqxGrid(
            {
                width: "100%",
                height: 500,
                source: dataAdapter,
                theme: "",
                selectionmode: 'multiplerowsextended',
                sortable: true,
                pageable: true,
                autoheight: true,
                columnsresize: true,
                columns: [
                    { text: 'Name', datafield: 'name', width: 250 },
                    { text: 'Beverage Type', datafield: 'type', width: 250 },
                    { text: 'Calories', datafield: 'calories', width: 180 },
                    { text: 'Total Fat', datafield: 'totalfat', width: 120 },
                    { text: 'Protein', datafield: 'protein', minwidth: 120 }
                ]
            }
        );
    }


    /*
     * 初始化表格
     */
    function init_grid(){

        var data = Tools.generatedata(100, false);

        var theme = "";

        var source =
            {
                localdata: data,
                datatype: "array",
                updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                },
                datafields:
                    [
                        { name: 'firstname', type: 'string' },
                        { name: 'lastname', type: 'string' },
                        { name: 'productname', type: 'string' },
                        { name: 'available', type: 'bool' },
                        { name: 'quantity', type: 'number' },
                        { name: 'price', type: 'number' }
                    ]
            };

        var dataAdapter = new $.jqx.dataAdapter(source);

        // initialize jqxGrid
        $("#jqxgrid").jqxGrid(
            {
                width: '100%',
                source: dataAdapter,
                theme: theme,
                showstatusbar: true,
                statusbarheight: 50,
                editable: true,
                columnsresize: true,
                showaggregates: true,
                selectionmode: 'singlecell',
                columns: [
                    {
                        text: '姓', columntype: 'textbox', datafield: 'firstname', width: 90,
                        aggregatesrenderer: function (aggregates, column, element) {
                            Tools.noshow(aggregates, column, element);
                            var renderstring = "<div class='jqx-widget-content jqx-widget-content-" + theme + "' style='float: left; width: 100%; height: 100%; '/>";
                            return renderstring;
                        }
                    },
                    {
                        text: '名', datafield: 'lastname', columntype: 'textbox', width: 90,
                        aggregatesrenderer: function (aggregates, column, element) {
                            Tools.noshow( aggregates, column, element);
                            var renderstring = "<div class='jqx-widget-content jqx-widget-content-" + theme + "' style='float: left; width: 100%; height: 100%; '/>";
                            return renderstring;
                        }
                    },
                    {
                        text: '产品', datafield: 'productname', width: 170,
                        aggregatesrenderer: function (aggregates, column, element) {
                            Tools.noshow( aggregates, column, element);
                            var renderstring = "<div class='jqx-widget-content jqx-widget-content-" + theme + "' style='float: left; width: 100%; height: 100%; '/>";
                            return renderstring;
                        }
                    },
                    {
                        text: '数量',
                        datafield: 'quantity',
                        width: 85,
                        cellsalign: 'right',
                        cellsformat: 'n2',
                        aggregates: ['min', 'max'],
                        aggregatesrenderer: function (aggregates, column, element) {
                            Tools.noshow(aggregates, column, element);
                            var renderstring = "<div class='jqx-widget-content jqx-widget-content-" + theme + "' style='float: left; width: 100%; height: 100%; '>";
                            $.each(aggregates, function (key, value) {
                                var name = key === 'min' ? 'Min' : 'Max';
                                var color = key === 'max' ? 'green' : 'red';
                                renderstring += '<div style="color: ' + color + '; position: relative; margin: 6px; text-align: right; overflow: hidden;">' + name + ': ' + value + '</div>';
                            });
                            renderstring += "</div>";
                            return renderstring;
                        }
                    },
                    { text: '价格', datafield: 'price', cellsalign: 'right', cellsformat: 'c2', aggregates: ['sum', 'avg'],
                        aggregatesrenderer: function (aggregates, column, element, summaryData) {
                            var renderstring = "<div class='jqx-widget-content jqx-widget-content-" + theme + "' style='float: left; width: 100%; height: 100%;'>";
                            $.each(aggregates, function (key, value) {
                                var name = key === 'sum' ? 'Sum' : 'Avg';
                                var color = 'green';
                                if (key === 'sum' && summaryData.sum < 650) {
                                    color = 'red';
                                }
                                if (key === 'avg' && summaryData.avg < 4) {
                                    color = 'red';
                                }
                                renderstring += '<div style="color: ' + color + '; position: relative; margin: 6px; text-align: right; overflow: hidden;">' + name + ': ' + value + '</div>';
                            });
                            renderstring += "</div>";
                            return renderstring;
                        }
                    }
                ]
            }
        );
    }
})();