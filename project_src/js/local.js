(function (b) {
    "use strict";

    console.log("grid plugs");

    b.extend(b.jqx._jqxGrid.prototype, {
        localizestrings: function(){
            this.gridlocalization = {
                "/": "/",
                ":": ":",
                firstDay: 0,
                days: {
                    names: ["星期日","星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                    namesAbbr: ["日", "一", "二", "三", "四", "五", "六"],
                    namesShort: ["日", "一", "二", "三", "四", "五", "六"]
                },
                months: {
                    names: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""],
                    namesAbbr: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""]
                },
                AM: ["AM", "am", "AM"],
                PM: ["PM", "pm", "PM"],
                eras: [{name: "A.D.", start: null, offset: 0}],
                twoDigitYearMax: 2029,
                patterns: {
                    d: "yyyy-M-d",
                    D: "dddd, MMMM dd, yyyy",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    f: "dddd, yyyy MMMM dd, h:mm tt",
                    F: "dddd, yyyy MMMM dd,  h:mm:ss tt",
                    M: "MMMM dd",
                    Y: "yyyy MMMM",
                    S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
                    ISO: "yyyy-MM-dd hh:mm:ss",
                    ISO2: "yyyy-MM-dd HH:mm:ss",
                    d1: "yyyy.dd.MM",
                    d2: "yyyy-MM-dd",
                    d3: "yyyy-MM-dd",
                    d4: "yy-MM-dd",
                    d5: "H:mm",
                    d6: "HH:mm",
                    d7: "HH:mm tt",
                    d8: "yyyy/MMMM/dd",
                    d9: "MMMM-dd",
                    d10: "MM-dd",
                    d11: "yyyy-MM-dd"
                },
                percentsymbol: "%",
                currencysymbol: "¥",
                currencysymbolposition: "before",
                decimalseparator: ".",
                thousandsseparator: ",",
                pagergotopagestring: "跳转到",
                pagershowrowsstring: "展示条数:",
                pagerrangestring: "  共 ",
                pagerpreviousbuttonstring: "上一页",
                pagernextbuttonstring: "下一页",
                groupsheaderstring: "Drag a column and drop it here to group by that column",
                sortascendingstring: "升序排列",
                sortdescendingstring: "降序排列",
                sortremovestring: "取消排序",
                groupbystring: "根据当前列分组",
                groupremovestring: "从当前组移除",
                filterclearstring: "清空",
                filterstring: "过滤",
                filtershowrowstring: "展示行数:",
                filterorconditionstring: "或",
                filterandconditionstring: "且",
                filterselectallstring: "(全选)",
                filterchoosestring: "请选择:",
                filterstringcomparisonoperators: ["empty", "not empty", "contains", "contains(match case)", "does not contain", "does not contain(match case)", "starts with", "starts with(match case)", "ends with", "ends with(match case)", "equal", "equal(match case)", "null", "not null"],
                filternumericcomparisonoperators: ["equal", "not equal", "less than", "less than or equal", "greater than", "greater than or equal", "null", "not null"],
                filterdatecomparisonoperators: ["equal", "not equal", "less than", "less than or equal", "greater than", "greater than or equal", "null", "not null"],
                filterbooleancomparisonoperators: ["equal", "not equal"],
                validationstring: "输入内容错误",
                emptydatastring: "没有查询到数据",
                filterselectstring: "请选择过滤条件",
                loadtext: "加载中..."
            };
        }
    });
})(jQuery);