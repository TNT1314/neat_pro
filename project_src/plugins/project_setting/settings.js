/**
* settings js
* author:wormer
*/


/** 全局调试信息 **/
if(!window.console){ window.console = {}; }
var console = window.console;  
var cons_funcs = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml',  
    'error', 'exception', 'group', 'groupCollapsed', 'groupEnd',  
    'info', 'log', 'markTimeline', 'profile', 'profileEnd',  
    'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'
];
for(var i=0,l=cons_funcs.length;i<l;i++) {  
    var func = cons_funcs[i];  
    if(!console[func]){
        console[func] = function(){};
    }
}
if(!console.memory){ console.memory = {};}
console.clear();

Date.prototype.Format = function (fmt) { //author: meizz 
    "use strict";
    
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace( RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    } 
    for(var k in o){
        if (new RegExp("(" + k + ")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        } 
    }
    return fmt;
};


Number.prototype.format=function(decimals, dec_point, thousands_sep){
    "use strict";

    var num = (this + '').replace(/[^0-9+\-Ee.]/g, '');

    var n = !isFinite(+num) ? 0 : +num;
    var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    var sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
    var dec = (typeof dec_point === 'undefined') ? '.' : dec_point;

    var toFixedFix = function(n, prec) {
        var fix_k = Math.pow(10, prec);
        return '' + (Math.round(n * fix_k) / fix_k).toFixed(prec);
    };

    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    var rlt_s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (rlt_s[0].length > 3) {
        rlt_s[0] = rlt_s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }

    if ((rlt_s[1] || '').length < prec) {
        rlt_s[1] = rlt_s[1] || '';
        rlt_s[1] += new Array(prec - rlt_s[1].length + 1).join('0');
    }
    return rlt_s.join(dec);
};
 
$.fn.serializeObject = function(){
    "use strict";

    var o = {};  
    var a = this.serializeArray();  
    $.each(a, function() {  
        if (o[this.name]) {  
            if (!o[this.name].push) { o[this.name] = [ o[this.name] ]; }  
            o[this.name].push(this.value || '');  
        } else {  
            o[this.name] = this.value || '';  
        }
    });  
    return o;  
};

/** 验证数据是否有效**/
var ValidData = function(val){
    "use strict";

    return val !== null && val !== undefined && val !== '' ? true : false;
};

/** 时间格式化 **/
var OutTime = function(){
    "use strict";

    return new Date().Format('yyyy-MM-dd hh:mm:ss');
};

/** 输出工具类 */
var Tools = {
    info:function(){
        "use strict";
        
        if(Settings.debug === true){
            var con_char = OutTime() + ": ";
            for(var i=0;i<arguments.length;i++){
                con_char += arguments[i];
            }
            console.log("%c" + con_char, "color:#4e82e2;");
        }
    },
    /** 分组打印,可以输出对象 **/
    group:function(){
        "use strict";
        
        if(Settings.debug === true){
            if(arguments.length>=1){
                var group_title = OutTime() + ": " + arguments[0];
                console.group("%c" + group_title, "color:#4e82e2;");
                for(var i=1;i<arguments.length;i++){ console.log(arguments[i]);}
                console.groupEnd();
            }
        }
    },
    error:function(){
        "use strict";

        if(Settings.debug === true){
            var con_char = OutTime() + ": " + arguments[0];

            console.group("%c" + con_char, "color:red;");
            for(var i=1;i<arguments.length;i++){
                if(typeof arguments[i] == 'object'){
                    console.info(arguments[i]);
                }else{
                    console.error(arguments[i]);
                }
            }
            console.groupEnd();
        }
    },
    noshow:function(){
        "use strict";

        return false;
    },
    generatedata:function(rowscount, hasNullValues) {
        "use strict";

        // prepare the data
        var data = new Array();

        if (rowscount === undefined) {
            rowscount = 100;
        }

        var firstNames =
            [
                "孙", "钱", "王", "李", "刘",
                "司马", "欧阳", "成", "薛", "沈", "赵"
            ];

        var lastNames =
            [
                "孙", "钱", "王", "李", "刘",
                "司马", "欧阳", "成", "薛", "沈", "赵"
            ];

        var productNames =
            [
                "佳百丽", "富程", "汽车抱枕", "车用抱枕", "靠垫腰靠靠枕腰垫", "汽车用品",
                "富程", "车牌架新交规", "汽车个性牌照框", "航空铝", "可拆卸", "大众科鲁兹",
                "苹果iphone"
            ];

        var priceValues =
            [
                "2.25", "1.5", "3.0", "3.3", "4.5", "3.6", "3.8", "2.5", "5.0", "1.75", "3.25", "4.0"
            ];

        for (var i = 0; i < rowscount; i++) {
            var row = {};
            var productindex = Math.floor(Math.random() * productNames.length);
            var price = parseFloat(priceValues[productindex]);
            var quantity = 1 + Math.round(Math.random() * 10);

            row["id"] = i;
            row["available"] = productindex % 2 == 0;
            if (hasNullValues == true) {
                if (productindex % 2 != 0) {
                    var random = Math.floor(Math.random() * rowscount);
                    row["available"] = i % random == 0 ? null : false;
                }
            }
            row["firstname"] = firstNames[Math.floor(Math.random() * firstNames.length)];
            row["lastname"] = lastNames[Math.floor(Math.random() * lastNames.length)];
            row["name"] = row["firstname"] + " " + row["lastname"];
            row["productname"] = productNames[productindex];
            row["price"] = price;
            row["quantity"] = quantity;
            row["total"] = price * quantity;

            var date = new Date();
            date.setFullYear(2012, Math.floor(Math.random() * 11), Math.floor(Math.random() * 27));
            date.setHours(0, 0, 0, 0);
            row["date"] = date;

            data[i] = row;
        }

        return data;
    }
};

/** 全局定义内容 **/
var Settings = {
    /** soket使用 **/
    Socket: undefined,
    
    /** 是否开启调试 **/
    debug: true,

    /** 模版目录 **/
    temp_path: window.location.host,

    /** 服务请求路径 **/
    // server: 'http://192.168.1.20:8000',
    server: '/service',
    
    /** Websoket请求路径 **/
    ws_server: 'ws://'+window.location.host+'/ws/',


    /** 数据请求格式 **/
    ajax_format: 'json',
    
    /** 列表配置选项 **/
    paging: { 
        autoWidth: false,
        searching: false,
        ordering: false,
        lengthChange: false,
        processing: true,
        serverSide: true,
        lengthMenu: false,
        pageLength: 10,
        displayStart: 0,
        columnDefs: [
            {
                "targets": [0],
                "visible": false,
                "searchable": false
            }
        ],
        language: {
            sProcessing: "查询中...",
            sLengthMenu: "显示 _MENU_ 项结果",
            sZeroRecords: "没有匹配结果",
            sInfo: "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            sInfoEmpty: "显示第 0 至 0 项结果，共 0 项",
            sInfoFiltered: "(由 _MAX_ 项结果过滤)",
            sInfoPostFix: "",
            sSearch: "搜索:",
            sUrl: "",
            sEmptyTable: "表中数据为空",
            sLoadingRecords: "查询中...",
            sInfoThousands: ",",
            oPaginate: {
                sFirst: "首页",
                sPrevious: "上页",
                sNext: "下页",
                sLast: "末页"
            },
            oAria: {
                sSortAscending: ": 以升序排列此列",
                sSortDescending: ": 以降序排列此列"
            }
        }
    },
    areaChartOptions:{
      //Boolean - If we should show the scale at all
      showScale: true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: false,
      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.05)",
      //Number - Width of the grid lines
      scaleGridLineWidth: 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: true,
      //Boolean - Whether the line is curved between points
      bezierCurve: true,
      //Number - Tension of the bezier curve between points
      bezierCurveTension: 0.3,
      //Boolean - Whether to show a dot for each point
      pointDot: false,
      //Number - Radius of each point dot in pixels
      pointDotRadius: 4,
      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth: 1,
      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius: 20,
      //Boolean - Whether to show a stroke for datasets
      datasetStroke: true,
      //Number - Pixel width of dataset stroke
      datasetStrokeWidth: 2,
      //Boolean - Whether to fill the dataset with a color
      datasetFill: true,
      //String - A legend template
      legendTemplate: "",
      //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio: true,
      //Boolean - whether to make the chart responsive to window resizing
      responsive: true
    },
    barChartOptions:{
      //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
      scaleBeginAtZero: true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: true,
      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.05)",
      //Number - Width of the grid lines
      scaleGridLineWidth: 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: true,
      //Boolean - If there is a stroke on each bar
      barShowStroke: true,
      //Number - Pixel width of the bar stroke
      barStrokeWidth: 2,
      //Number - Spacing between each of the X value sets
      barValueSpacing: 5,
      //Number - Spacing between data sets within X values
      barDatasetSpacing: 1,
      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
      //Boolean - whether to make the chart responsive
      responsive: true,
      maintainAspectRatio: true
    }
};