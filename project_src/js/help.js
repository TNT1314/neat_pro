$(function() {

    "use strict"

    try {

        /** 初始化 **/
        init_model();

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