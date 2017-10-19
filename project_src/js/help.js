$(function() {

    "use strict"

    try {

        /** 初始化 **/
        init_model();


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
     * 初始化表格
     */
    function init_grid(){

        Tools.error("function", typeof  Tools.generatedata());
        var data = Tools.generatedata(100, false);

        Tools.group("data", data);

        var theme = "";

        var source =
            {
                localdata: data,
                datatype: "array",
                updaterow: function (rowid, rowdata, commit) {
                    // synchronize with the server - send update command
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
                        text: 'First Name', columntype: 'textbox', datafield: 'firstname', width: 90,
                        aggregatesrenderer: function (aggregates, column, element) {
                            Tools.group("params", aggregates, column, element);
                            var renderstring = "<div class='jqx-widget-content jqx-widget-content-" + theme + "' style='float: left; width: 100%; height: 100%; '/>";
                            return renderstring;
                        }
                    },
                    {
                        text: 'Last Name', datafield: 'lastname', columntype: 'textbox', width: 90,
                        aggregatesrenderer: function (aggregates, column, element) {
                            Tools.group("params", aggregates, column, element);
                            var renderstring = "<div class='jqx-widget-content jqx-widget-content-" + theme + "' style='float: left; width: 100%; height: 100%; '/>";
                            return renderstring;
                        }
                    },
                    {
                        text: 'Product', datafield: 'productname', width: 170,
                        aggregatesrenderer: function (aggregates, column, element) {
                            Tools.group("params", aggregates, column, element);
                            var renderstring = "<div class='jqx-widget-content jqx-widget-content-" + theme + "' style='float: left; width: 100%; height: 100%; '/>";
                            return renderstring;
                        }
                    },
                    { text: 'Quantity', datafield: 'quantity', width: 85, cellsalign: 'right', cellsformat: 'n2', aggregates: ['min', 'max'],
                        aggregatesrenderer: function (aggregates, column, element) {
                            Tools.group("params", aggregates, column, element);
                            var renderstring = "<div class='jqx-widget-content jqx-widget-content-" + theme + "' style='float: left; width: 100%; height: 100%; '>";
                            $.each(aggregates, function (key, value) {
                                var name = key == 'min' ? 'Min' : 'Max';
                                var color = key == 'max' ? 'green' : 'red';
                                renderstring += '<div style="color: ' + color + '; position: relative; margin: 6px; text-align: right; overflow: hidden;">' + name + ': ' + value + '</div>';
                            });
                            renderstring += "</div>";
                            return renderstring;
                        }
                    },
                    { text: 'Price', datafield: 'price', cellsalign: 'right', cellsformat: 'c2', aggregates: ['sum', 'avg'],
                        aggregatesrenderer: function (aggregates, column, element, summaryData) {
                            var renderstring = "<div class='jqx-widget-content jqx-widget-content-" + theme + "' style='float: left; width: 100%; height: 100%;'>";
                            $.each(aggregates, function (key, value) {
                                var name = key == 'sum' ? 'Sum' : 'Avg';
                                var color = 'green';
                                if (key == 'sum' && summaryData.sum < 650) {
                                    color = 'red';
                                }
                                if (key == 'avg' && summaryData.avg < 4) {
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

        Tools.info("begin to  resize");
        $('#jqxgrid').jqxGrid('autoresizecolumns');
        Tools.info("over to  resize");
    }
});