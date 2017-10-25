/*
jQWidgets v2.6.0 (2012-Dec-27)
Copyright (c) 2011-2013 jQWidgets.
License: http://jqwidgets.com/license/
*/

(function (a) {
    a.jqx.dataAdapter = function (e, b) {
        this._source = e;
        this._options = b || {};
        this.records = new Array();
        this._downloadComplete = new Array();
        this._bindingUpdate = new Array();
        if (this._options.autoBind == true) {
            this.dataBind()
        }
        if (e != undefined && e.localdata != null && typeof e.localdata == "function") {
            var d = e.localdata();
            if (d != null) {
                e._localdata = e.localdata;
                var c = this;
                if (e._localdata.subscribe) {
                    c._oldlocaldata = [];
                    e._localdata.subscribe(function (f) {
                        var g = function (h) {
                            if (jQuery.isArray(h)) {
                                return jQuery.makeArray(g(a(h)))
                            }
                            return jQuery.extend(true, {}, h)
                        };
                        c._oldlocaldata = g(f)
                    }, e._localdata, "beforeChange");
                    e._localdata.subscribe(function (g) {
                        if (c.suspendKO == false || c.suspendKO == undefined) {
                            var f = "";
                            c._oldrecords = c.records;
                            if (c._oldlocaldata.length == 0) {
                                e.localdata = e._localdata()
                            }
                            if (c._oldlocaldata.length == 0) {
                                f = "change"
                            } else {
                                if (c._oldlocaldata.length == g.length) {
                                    f = "update"
                                }
                                if (c._oldlocaldata.length > g.length) {
                                    f = "remove"
                                }
                                if (c._oldlocaldata.length < g.length) {
                                    f = "add"
                                }
                            }
                            c.dataBind(null, f)
                        }
                    }, e._localdata, "change");
                    c._knockoutdatasource = true
                }
                e.localdata = d
            }
        }
    };
    a.jqx.dataAdapter.prototype = {
        getrecords: function () {
            return this.records
        }, beginUpdate: function () {
            this.isUpdating = true
        }, endUpdate: function (b) {
            this.isUpdating = false;
            if (b != false) {
                this.dataBind(null, "")
            }
        }, dataBind: function (m, r) {
            if (this.isUpdating == true) {
                return
            }
            var o = this._source;
            if (!o) {
                return
            }
            if (o.dataFields != null) {
                o.datafields = o.dataFields
            }
            if (o.recordstartindex == undefined) {
                o.recordstartindex = 0
            }
            if (o.recordendindex == undefined) {
                o.recordendindex = 0
            }
            if (o.loadallrecords == undefined) {
                o.loadallrecords = true
            }
            if (o.sort != undefined) {
                this.sort = o.sort
            }
            if (o.filter != undefined) {
                this.filter = o.filter
            } else {
                this.filter = null
            }
            if (o.sortcolumn != undefined) {
                this.sortcolumn = o.sortcolumn
            }
            if (o.sortdirection != undefined) {
                this.sortdirection = o.sortdirection
            }
            if (o.sortcomparer != undefined) {
                this.sortcomparer = o.sortcomparer
            }
            this.records = new Array();
            var f = this._options || {};
            this.virtualmode = f.virtualmode != undefined ? f.virtualmode : false;
            this.totalrecords = f.totalrecords != undefined ? f.totalrecords : 0;
            this.pageable = f.pageable != undefined ? f.pageable : false;
            this.pagesize = f.pagesize != undefined ? f.pagesize : 0;
            this.pagenum = f.pagenum != undefined ? f.pagenum : 0;
            this.cachedrecords = f.cachedrecords != undefined ? f.cachedrecords : new Array();
            this.originaldata = new Array();
            this.recordids = new Array();
            this.updaterow = f.updaterow != undefined ? f.updaterow : null;
            this.addrow = f.addrow != undefined ? f.addrow : null;
            this.deleterow = f.deleterow != undefined ? f.deleterow : null;
            this.cache = f.cache != undefined ? f.cache : true;
            this.unboundmode = false;
            if (o.mapchar != undefined) {
                this.mapChar = o.mapchar ? o.mapchar : ">"
            } else {
                this.mapChar = f.mapChar ? f.mapChar : ">"
            }
            if (f.unboundmode || o.unboundmode) {
                this.unboundmode = f.unboundmode || o.unboundmode
            }
            if (o.cache != undefined) {
                this.cache = o.cache
            }
            if (this.koSubscriptions) {
                for (var t = 0; t < this.koSubscriptions.length; t++) {
                    this.koSubscriptions[t].dispose()
                }
            }
            this.koSubscriptions = new Array();
            if (this.pagenum < 0) {
                this.pagenum = 0
            }
            var y = this;
            var l = o.datatype;
            if (o.datatype === "csv" || o.datatype === "tab" || o.datatype == "text") {
                l = "text"
            }
            var h = f.async != undefined ? f.async : true;
            if (o.async != undefined) {
                h = o.async
            }
            switch (l) {
                case"local":
                case"array":
                case"observablearray":
                default:
                    if (o.localdata == undefined && o.length) {
                        o.localdata = new Array();
                        for (var q = 0; q < o.length; q++) {
                            o.localdata[o.localdata.length] = o[q]
                        }
                    }
                    var g = o.localdata.length;
                    this.totalrecords = this.virtualmode ? (o.totalrecords || g) : g;
                    if (this.unboundmode) {
                        this.totalrecords = this.unboundmode ? (o.totalrecords || g) : g;
                        var u = o.datafields ? o.datafields.length : 0;
                        if (u > 0) {
                            for (var q = 0; q < this.totalrecords; q++) {
                                var d = {};
                                for (var p = 0; p < u; p++) {
                                    d[o.datafields[p].name] = ""
                                }
                                o.localdata[o.localdata.length] = d
                            }
                        }
                    }
                    if (this.totalrecords == undefined) {
                        this.totalrecords = 0
                    }
                    var u = o.datafields ? o.datafields.length : 0;
                    var c = function (D, F) {
                        var E = {};
                        for (var B = 0; B < F; B++) {
                            var A = o.datafields[B];
                            var G = "";
                            if (undefined == A || A == null) {
                                continue
                            }
                            if (A.map) {
                                var i = A.map.split(y.mapChar);
                                if (i.length > 0) {
                                    var C = D;
                                    for (var z = 0; z < i.length; z++) {
                                        C = C[i[z]]
                                    }
                                    G = C
                                } else {
                                    G = D[A.map]
                                }
                                if (G != undefined && G != null) {
                                    G = G.toString()
                                } else {
                                    G = ""
                                }
                            }
                            if (G == "") {
                                G = D[A.name];
                                if (G != undefined && G != null) {
                                    if (o._localdata && G.subscribe) {
                                        G = G()
                                    } else {
                                        G = G.toString()
                                    }
                                } else {
                                    G = ""
                                }
                            }
                            G = y.getvaluebytype(G, A);
                            if (A.displayname != undefined) {
                                E[A.displayname] = G
                            } else {
                                E[A.name] = G
                            }
                        }
                        return E
                    };
                    if (o._localdata) {
                        this._changedrecords = [];
                        this.records = new Array();
                        var x = o._localdata();
                        a.each(x, function (I, N) {
                            if (typeof N === "string") {
                                y.records.push(N)
                            } else {
                                var K = {};
                                var L = 0;
                                for (var H in this) {
                                    var B = null;
                                    var M = "string";
                                    if (u > 0) {
                                        var O = false;
                                        for (var F = 0; F < u; F++) {
                                            var E = o.datafields[F];
                                            if (E != undefined && E.name == H) {
                                                O = true;
                                                B = E.map;
                                                M = E.type;
                                                break
                                            }
                                        }
                                        if (!O) {
                                            continue
                                        }
                                    }
                                    var D = a.isFunction(this[H]);
                                    if (D) {
                                        var N = this[H]();
                                        if (M != "string") {
                                            N = y.getvaluebytype(N, {type: M})
                                        }
                                        K[H] = N;
                                        if (this[H].subscribe) {
                                            y.koSubscriptions[y.koSubscriptions.length] = this[H].subscribe(function (i) {
                                                y.dataBind(null, null);
                                                return false
                                            })
                                        }
                                    } else {
                                        var N = this[H];
                                        if (B != null) {
                                            var A = B.split(y.mapChar);
                                            if (A.length > 0) {
                                                var J = this;
                                                for (var C = 0; C < A.length; C++) {
                                                    J = J[A[C]]
                                                }
                                                N = J
                                            } else {
                                                N = this[B]
                                            }
                                        }
                                        if (M != "string") {
                                            N = y.getvaluebytype(N, {type: M})
                                        }
                                        K[H] = N;
                                        if (K[H] != undefined) {
                                            L += K[H].toString().length + K[H].toString().substr(0, 1)
                                        }
                                    }
                                }
                                y.records.push(K);
                                K._koindex = L;
                                if (y._oldrecords) {
                                    var G = y.records.length - 1;
                                    if (r == "update") {
                                        if (y._oldrecords[G]._koindex != L) {
                                            var z = {index: G, oldrecord: y._oldrecords[G], record: K};
                                            y._changedrecords.push(z)
                                        }
                                    }
                                }
                            }
                        });
                        if (r == "add") {
                            var g = y.records.length;
                            for (var q = 0; q < g; q++) {
                                var d = y.records[q];
                                if (!y._oldrecords[q]) {
                                    y._changedrecords.push({index: q, oldrecord: null, record: d})
                                } else {
                                    if (y._oldrecords[q]._koindex != d._koindex) {
                                        y._changedrecords.push({index: q, oldrecord: null, record: d})
                                    }
                                }
                            }
                        } else {
                            if (r == "remove") {
                                var g = y._oldrecords.length;
                                for (var q = 0; q < g; q++) {
                                    var k = y._oldrecords[q];
                                    if (!y.records[q]) {
                                        y._changedrecords.push({index: q, oldrecord: k, record: null})
                                    } else {
                                        if (y.records[q]._koindex != k._koindex) {
                                            y._changedrecords.push({index: q, oldrecord: k, record: null})
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (!a.isArray(o.localdata)) {
                            this.records = new Array();
                            a.each(o.localdata, function (A) {
                                if (u > 0) {
                                    var z = this;
                                    var B = c(z, u);
                                    y.records[y.records.length] = B
                                } else {
                                    y.records[y.records.length] = this
                                }
                            })
                        } else {
                            if (u == 0) {
                                this.records = o.localdata
                            } else {
                                a.each(o.localdata, function (A) {
                                    var z = this;
                                    var B = c(z, u);
                                    y.records[y.records.length] = B
                                })
                            }
                        }
                    }
                    this.originaldata = o.localdata;
                    this.cachedrecords = this.records;
                    if (f.uniqueDataFields) {
                        var n = this.getUniqueRecords(this.records, f.uniqueDataFields);
                        this.records = n;
                        this.cachedrecords = n
                    }
                    if (f.beforeLoadComplete) {
                        var v = f.beforeLoadComplete(y.records, this.originaldata);
                        if (v != undefined) {
                            y.records = v;
                            y.cachedrecords = v
                        }
                    }
                    if (a.isFunction(f.loadComplete)) {
                        f.loadComplete(o.localdata)
                    }
                    break;
                case"json":
                case"jsonp":
                case"xml":
                case"xhtml":
                case"script":
                case"text":
                    if (o.localdata != null) {
                        if (a.isFunction(o.beforeprocessing)) {
                            o.beforeprocessing(o.localdata)
                        }
                        if (o.datatype === "xml") {
                            y.loadxml(o.localdata, o.localdata, o)
                        } else {
                            if (l === "text") {
                                y.loadtext(o.localdata, o)
                            } else {
                                y.loadjson(o.localdata, o.localdata, o)
                            }
                        }
                        if (f.uniqueDataFields) {
                            var n = y.getUniqueRecords(y.records, f.uniqueDataFields);
                            y.records = n;
                            y.cachedrecords = n
                        }
                        if (a.isFunction(f.loadComplete)) {
                            f.loadComplete(o.localdata)
                        }
                        return
                    }
                    var w = f.data != undefined ? f.data : {};
                    if (o.processdata) {
                        o.processdata(w)
                    }
                    if (a.isFunction(f.processData)) {
                        f.processData(w)
                    }
                    if (a.isFunction(f.formatData)) {
                        var b = f.formatData(w);
                        if (b != undefined) {
                            w = b
                        }
                    }
                    var s = "application/x-www-form-urlencoded";
                    if (f.contentType) {
                        s = f.contentType
                    }
                    var e = "GET";
                    if (o.type) {
                        e = o.type
                    }
                    if (f.type) {
                        e = f.type
                    }
                    if (o.url && o.url.length > 0) {
                        if (a.isFunction(f.loadServerData)) {
                            y._requestData(w, o, f)
                        } else {
                            this.xhr = a.ajax({
                                dataType: l,
                                cache: this.cache,
                                type: e,
                                url: o.url,
                                async: h,
                                contentType: s,
                                data: w,
                                success: function (I, G, P) {
                                    if (a.isFunction(o.beforeprocessing)) {
                                        var A = o.beforeprocessing(I, G, P);
                                        if (A != undefined) {
                                            I = A
                                        }
                                    }
                                    if (a.isFunction(f.downloadComplete)) {
                                        var A = f.downloadComplete(I, G, P);
                                        if (A != undefined) {
                                            I = A
                                        }
                                    }
                                    if (I == null) {
                                        y.records = new Array();
                                        y.cachedrecords = new Array();
                                        y.originaldata = new Array();
                                        y.callDownloadComplete();
                                        if (a.isFunction(f.loadComplete)) {
                                            f.loadComplete(new Array())
                                        }
                                        return
                                    }
                                    var D = I;
                                    if (I.records) {
                                        D = I.records
                                    }
                                    if (I.totalrecords != undefined) {
                                        o.totalrecords = I.totalrecords
                                    }
                                    if (o.datatype === "xml") {
                                        y.loadxml(null, D, o)
                                    } else {
                                        if (l === "text") {
                                            y.loadtext(D, o)
                                        } else {
                                            y.loadjson(null, D, o)
                                        }
                                    }
                                    var N = o.datafields ? o.datafields.length : 0;
                                    for (var F = 0; F < N; F++) {
                                        var C = o.datafields[F];
                                        if (C != undefined) {
                                            if (C.text != undefined && C.source != undefined && C.source.length != undefined) {
                                                var M = new Array();
                                                for (var H = 0; H < y.records.length; H++) {
                                                    var J = y.records[H];
                                                    var z = C.name;
                                                    if (C.displayname != undefined) {
                                                        z = C.displayname
                                                    }
                                                    var B = J[z];
                                                    if (M[B] != undefined) {
                                                        J[z] = M[B]
                                                    } else {
                                                        for (var F = 0; F < C.source.length; F++) {
                                                            var L = C.source[F];
                                                            var K = L[C.id];
                                                            if (K == undefined) {
                                                                K = L.uid
                                                            }
                                                            if (K == B) {
                                                                J[z] = L[C.text];
                                                                M[B] = L[C.text];
                                                                break
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (f.uniqueDataFields) {
                                        var O = y.getUniqueRecords(y.records, f.uniqueDataFields);
                                        y.records = O;
                                        y.cachedrecords = O
                                    }
                                    if (f.beforeLoadComplete) {
                                        var E = f.beforeLoadComplete(y.records, I);
                                        if (E != undefined) {
                                            y.records = E;
                                            y.cachedrecords = E
                                        }
                                    }
                                    y.callDownloadComplete();
                                    if (a.isFunction(f.loadComplete)) {
                                        f.loadComplete(I)
                                    }
                                },
                                error: function (A, i, z) {
                                    if (a.isFunction(o.loaderror)) {
                                        o.loaderror(A, i, z)
                                    }
                                    if (a.isFunction(f.loadError)) {
                                        f.loadError(A, i, z)
                                    }
                                    A = null;
                                    y.callDownloadComplete()
                                },
                                beforeSend: function (z, i) {
                                    if (a.isFunction(f.beforeSend)) {
                                        f.beforeSend(z, i)
                                    }
                                    if (a.isFunction(o.beforesend)) {
                                        o.beforesend(z, i)
                                    }
                                }
                            })
                        }
                    } else {
                        y.callDownloadComplete();
                        if (a.isFunction(f.loadComplete)) {
                            f.loadComplete(data)
                        }
                    }
                    break
            }
            this.callBindingUpdate(r)
        }, abort: function () {
            if (this.xhr && this.xhr.readyState != 4) {
                this.xhr.abort()
            }
        }, _requestData: function (c, e, b) {
            var d = this;
            var f = function (g) {
                if (g.totalrecords) {
                    e.totalrecords = g.totalrecords;
                    d.totalrecords = g.totalrecords
                }
                if (g.records) {
                    d.records = g.records;
                    d.cachedrecords = g.records
                }
                if (a.isFunction(b.loadComplete)) {
                    b.loadComplete(data)
                }
                d.callDownloadComplete()
            };
            b.loadServerData(c, e, f)
        }, getUniqueRecords: function (d, g) {
            if (d && g) {
                var b = d.length;
                var m = g.length;
                var i = new Array();
                var k = new Array();
                for (var l = 0; l < b; l++) {
                    var h = d[l];
                    var e = "";
                    if (h == undefined) {
                        continue
                    }
                    for (var f = 0; f < m; f++) {
                        var c = g[f];
                        e += h[c] + "_"
                    }
                    if (!k[e]) {
                        i[i.length] = h
                    }
                    k[e] = true
                }
            }
            return i
        }, getAggregatedData: function (n, h, f) {
            var e = f;
            if (!e) {
                e = this.records
            }
            var k = {};
            var d = e.length;
            if (d == 0) {
                return
            }
            if (d == undefined) {
                return
            }
            for (var l = 0; l < d; l++) {
                var m = e[l];
                for (var g = 0; g < n.length; g++) {
                    var c = n[g];
                    var p = m[c.name];
                    if (c.aggregates) {
                        k[c.name] = k[c.name] || {};
                        var b = function (i) {
                            for (obj in i) {
                                var q = k[c.name][obj];
                                if (q == null) {
                                    k[c.name][obj] = 0;
                                    q = 0
                                }
                                if (a.isFunction(i[obj])) {
                                    q = i[obj](q, p, c.name, m)
                                }
                                k[c.name][obj] = q
                            }
                        };
                        var o = parseFloat(p);
                        if (isNaN(o)) {
                            o = false
                        } else {
                            o = true
                        }
                        if (o) {
                            p = parseFloat(p)
                        }
                        if (typeof p === "number" && isFinite(p)) {
                            a.each(c.aggregates, function () {
                                var i = k[c.name][this];
                                if (i == null) {
                                    i = 0;
                                    if (this == "min") {
                                        i = 9999999999999
                                    }
                                }
                                if (this == "sum" || this == "avg" || this == "stdev" || this == "stdevp" || this == "var" || this == "varp") {
                                    i += parseFloat(p)
                                } else {
                                    if (this == "product") {
                                        if (l == 0) {
                                            i = parseFloat(p)
                                        } else {
                                            i *= parseFloat(p)
                                        }
                                    } else {
                                        if (this == "min") {
                                            i = Math.min(i, parseFloat(p))
                                        } else {
                                            if (this == "max") {
                                                i = Math.max(i, parseFloat(p))
                                            } else {
                                                if (this == "count") {
                                                    i++
                                                } else {
                                                    if (typeof(this) == "object") {
                                                        b(this);
                                                        return
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                k[c.name][this] = i
                            })
                        } else {
                            a.each(c.aggregates, function () {
                                if (this == "min" || this == "max" || this == "count" || this == "product" || this == "sum" || this == "avg" || this == "stdev" || this == "stdevp" || this == "var" || this == "varp") {
                                    k[c.name][this] = 0;
                                    return true
                                }
                                if (typeof(this) == "object") {
                                    b(this)
                                }
                            })
                        }
                    }
                }
            }
            for (var g = 0; g < n.length; g++) {
                var c = n[g];
                if (k[c.name]["avg"] != undefined) {
                    var p = k[c.name]["avg"];
                    k[c.name]["avg"] = p / e.length
                } else {
                    if (k[c.name]["count"] != undefined) {
                        k[c.name]["count"] = d
                    }
                }
                if (k[c.name]["stdev"] || k[c.name]["stdevp"] || k[c.name]["var"] || k[c.name]["varp"]) {
                    a.each(c.aggregates, function (w) {
                        if (this == "stdev" || this == "var" || this == "varp" || this == "stdevp") {
                            var x = k[c.name][this];
                            var v = d;
                            var q = (x / d);
                            var s = 0;
                            for (var t = 0; t < d; t++) {
                                var u = e[t];
                                var y = u[c.name];
                                s += (y - q) * (y - q)
                            }
                            var r = (this == "stdevp" || this == "varp") ? v : v - 1;
                            if (r == 0) {
                                r = 1
                            }
                            if (this == "var" || this == "varp") {
                                k[c.name][this] = s / r
                            } else {
                                if (this == "stdevp" || this == "stdev") {
                                    k[c.name][this] = Math.sqrt(s / r)
                                }
                            }
                        }
                    })
                }
                if (c.formatStrings) {
                    a.each(c.aggregates, function (q) {
                        var i = c.formatStrings[q];
                        if (i) {
                            if (this == "min" || this == "max" || this == "count" || this == "product" || this == "sum" || this == "avg" || this == "stdev" || this == "stdevp" || this == "var" || this == "varp") {
                                var r = k[c.name][this];
                                k[c.name][this] = a.jqx.dataFormat.formatnumber(r, i, h)
                            } else {
                                if (typeof this == "object") {
                                    for (obj in this) {
                                        var r = k[c.name][obj];
                                        k[c.name][obj] = a.jqx.dataFormat.formatnumber(r, i, h)
                                    }
                                }
                            }
                        }
                    })
                }
            }
            return k
        }, bindDownloadComplete: function (c, b) {
            this._downloadComplete[this._downloadComplete.length] = {id: c, func: b}
        }, unbindDownloadComplete: function (c) {
            for (var b = 0; b < this._downloadComplete.length; b++) {
                if (this._downloadComplete[b].id == c) {
                    this._downloadComplete[b].func = null;
                    this._downloadComplete.splice(b, 1);
                    break
                }
            }
        }, callDownloadComplete: function () {
            for (var b = 0; b < this._downloadComplete.length; b++) {
                var c = this._downloadComplete[b];
                if (c.func != null) {
                    c.func()
                }
            }
        }, setSource: function (b) {
            this._source = b
        }, generatekey: function () {
            var b = function () {
                return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
            };
            return (b() + b() + "-" + b() + "-" + b() + "-" + b() + "-" + b() + b() + b())
        }, getGroupedRecords: function (D, G, r, y, E, w) {
            var A = 0;
            var v = this;
            var d = new Array();
            for (var h = 0; h < D.length; h++) {
                d[h] = v.generatekey()
            }
            if (!G) {
                G = "items"
            }
            if (!r) {
                r = "group"
            }
            if (!E) {
                E = "record"
            }
            if (!w) {
                w = "value"
            }
            var m = new Array();
            var f = 0;
            var e = new Array();
            var l = D.length;
            var F = new Array();
            var H = this.records;
            var i = H.length;
            var z = function (q) {
                var I = q;
                if (y) {
                    a.each(y, function () {
                        if (this.name && this.map) {
                            I[this.map] = I[this.name]
                        }
                    })
                }
                return I
            };
            for (var p = 0; p < i; p++) {
                var C = z(H[p]);
                id = C[v.uniqueId];
                var c = new Array();
                var s = 0;
                for (h = 0; h < l; h++) {
                    var k = D[h];
                    var x = C[k];
                    if (null == x) {
                        continue
                    }
                    c[s++] = {value: x, hash: d[h]}
                }
                if (c.length != l) {
                    break
                }
                var t = null;
                var n = "";
                var b = -1;
                for (var u = 0; u < c.length; u++) {
                    b++;
                    var B = c[u].value;
                    var g = c[u].hash;
                    n = n + "_" + g + "_" + B;
                    if (e[n] != undefined && e[n] != null) {
                        t = e[n];
                        continue
                    }
                    if (t == null) {
                        t = {level: 0};
                        t[r] = B;
                        t[E] = C;
                        t[w] = C[w];
                        t[G] = new Array();
                        m[f++] = t
                    } else {
                        var o = {parentItem: t, level: t.level + 1};
                        o[r] = B;
                        o[G] = new Array();
                        o[E] = C;
                        o[w] = C[w];
                        t[G][t[G].length] = o;
                        t = o
                    }
                    e[n] = t
                }
                if (t != null) {
                    C.parentItem = t;
                    C.level = t.level + 1;
                    t[G][t[G].length] = C
                }
            }
            return m
        }, getRecordsHierarchy: function (f, d, u, p) {
            var b = new Array();
            var c = this.records;
            if (this.records.length == 0) {
                return null
            }
            var s = u != null ? u : "items";
            var m = [];
            var v = c;
            var k = v.length;
            var q = function (i) {
                var w = i;
                if (p) {
                    a.each(p, function () {
                        if (this.name && this.map) {
                            w[this.map] = w[this.name]
                        }
                    })
                }
                return w
            };
            for (var r = 0; r < k; r++) {
                var t = a.extend({}, v[r]);
                var o = t[d];
                var n = t[f];
                m[n] = {parentid: o, item: t}
            }
            for (var r = 0; r < k; r++) {
                var t = a.extend({}, v[r]);
                var o = t[d];
                var n = t[f];
                if (m[o] != undefined) {
                    var t = {parentid: o, item: m[n].item};
                    var l = m[o].item;
                    if (!l[s]) {
                        l[s] = []
                    }
                    var g = l[s].length;
                    var e = t.item;
                    var h = q(e);
                    l[s][g] = h;
                    m[o].item = l;
                    m[n] = t
                } else {
                    var e = m[n].item;
                    var h = q(e);
                    b[b.length] = h
                }
            }
            return b
        }, bindBindingUpdate: function (c, b) {
            this._bindingUpdate[this._bindingUpdate.length] = {id: c, func: b}
        }, unbindBindingUpdate: function (c) {
            for (var b = 0; b < this._bindingUpdate.length; b++) {
                if (this._bindingUpdate[b].id == c) {
                    this._bindingUpdate[b].func = null;
                    this._bindingUpdate.splice(b, 1);
                    break
                }
            }
        }, callBindingUpdate: function (b) {
            for (var d = 0; d < this._bindingUpdate.length; d++) {
                var c = this._bindingUpdate[d];
                if (c.func != null) {
                    c.func(b)
                }
            }
        }, getid: function (e, c, d) {
            if (a(e, c).length > 0) {
                return a(e, c).text()
            }
            if (e) {
                if (e.toString().length > 0) {
                    var b = a(c).attr(e);
                    if (b != null && b.toString().length > 0) {
                        return b
                    }
                }
            }
            return d
        }, loadjson: function (z, A, m) {
            if (typeof(z) == "string") {
                z = a.parseJSON(z)
            }
            if (m.root == undefined) {
                m.root = ""
            }
            if (m.record == undefined) {
                m.record = ""
            }
            var z = z || A;
            if (!z) {
                z = []
            }
            var y = this;
            if (m.root != "") {
                if (z[m.root] != undefined) {
                    z = z[m.root]
                } else {
                    a.each(z, function (B) {
                        var p = this;
                        if (this == m.root) {
                            z = this;
                            return false
                        } else {
                            if (this[m.root] != undefined) {
                                z = this[m.root]
                            }
                        }
                    })
                }
            } else {
                if (!z.length) {
                    for (obj in z) {
                        if (a.isArray(z[obj])) {
                            z = z[obj];
                            break
                        }
                    }
                }
            }
            if (z != null && z.length == undefined) {
                z = a.makeArray(z)
            }
            if (z == null || z.length == undefined) {
                alert("JSON Parse error.");
                return
            }
            if (z.length == 0) {
                this.totalrecords = 0;
                return
            }
            var e = z.length;
            this.totalrecords = this.virtualmode ? (m.totalrecords || e) : e;
            this.records = new Array();
            this.originaldata = new Array();
            var s = this.records;
            var o = !this.pageable ? m.recordstartindex : this.pagesize * this.pagenum;
            this.recordids = new Array();
            if (m.loadallrecords) {
                o = 0;
                e = this.totalrecords
            }
            var k = 0;
            if (this.virtualmode) {
                o = !this.pageable ? m.recordstartindex : this.pagesize * this.pagenum;
                k = o;
                o = 0;
                e = this.totalrecords
            }
            var u = m.datafields ? m.datafields.length : 0;
            if (u == 0) {
                var b = z[0];
                var w = new Array();
                for (obj in b) {
                    var c = obj;
                    w[w.length] = {name: c}
                }
                m.datafields = w;
                u = w.length
            }
            for (var r = o; r < e; r++) {
                var d = z[r];
                if (d == undefined) {
                    break
                }
                if (m.record && m.record != "") {
                    d = d[m.record];
                    if (d == undefined) {
                        continue
                    }
                }
                var x = this.getid(m.id, d, r);
                if (typeof(x) === "object") {
                    x = r
                }
                if (!this.recordids[x]) {
                    this.recordids[x] = d;
                    var g = {};
                    for (var q = 0; q < u; q++) {
                        var h = m.datafields[q];
                        var n = "";
                        if (undefined == h || h == null) {
                            continue
                        }
                        if (h.map) {
                            var f = h.map.split(y.mapChar);
                            if (f.length > 0) {
                                var v = d;
                                for (var l = 0; l < f.length; l++) {
                                    if (v != undefined) {
                                        v = v[f[l]]
                                    }
                                }
                                n = v
                            } else {
                                n = d[h.map]
                            }
                            if (n != undefined && n != null) {
                                n = n.toString()
                            } else {
                                n = ""
                            }
                        }
                        if (n == "") {
                            n = d[h.name];
                            if (n == undefined || n == null) {
                                n = ""
                            }
                            if (h.value != undefined) {
                                var t = n[h.value];
                                if (t != undefined) {
                                    n = t
                                }
                            }
                        }
                        n = this.getvaluebytype(n, h);
                        if (h.displayname != undefined) {
                            g[h.displayname] = n
                        } else {
                            g[h.name] = n
                        }
                    }
                    if (m.recordendindex <= 0 || o < m.recordendindex) {
                        s[k + r] = a.extend({}, g);
                        s[k + r].uid = x;
                        this.originaldata[k + r] = a.extend({}, s[r])
                    }
                }
            }
            this.records = s;
            this.cachedrecords = this.records
        }, loadxml: function (f, x, m) {
            if (typeof(f) == "string") {
                f = x = a(a.parseXML(f))
            }
            if (m.root == undefined) {
                m.root = ""
            }
            if (m.record == undefined) {
                m.record = ""
            }
            var f;
            if (a.browser.msie && x) {
                if (x.xml != undefined) {
                    f = a(m.root + " " + m.record, a.parseXML(x.xml))
                } else {
                    f = f || a(m.root + " " + m.record, x)
                }
            } else {
                f = f || a(m.root + " " + m.record, x)
            }
            if (!f) {
                f = []
            }
            var e = f.length;
            if (f.length == 0) {
                return
            }
            this.totalrecords = this.virtualmode ? (m.totalrecords || e) : e;
            this.records = new Array();
            this.originaldata = new Array();
            var t = this.records;
            var q = !this.pageable ? m.recordstartindex : this.pagesize * this.pagenum;
            this.recordids = new Array();
            if (m.loadallrecords) {
                q = 0;
                e = this.totalrecords
            }
            var k = 0;
            if (this.virtualmode) {
                q = !this.pageable ? m.recordstartindex : this.pagesize * this.pagenum;
                k = q;
                q = 0;
                e = this.totalrecords
            }
            var u = m.datafields ? m.datafields.length : 0;
            if (u == 0) {
                var b = f[0];
                var v = new Array();
                for (obj in b) {
                    var c = obj;
                    v[v.length] = {name: c}
                }
                m.datafields = v;
                u = v.length
            }
            var l = q;
            for (var s = q; s < e; s++) {
                var d = f[s];
                if (d == undefined) {
                    break
                }
                var w = this.getid(m.id, d, s);
                if (!this.recordids[w]) {
                    this.recordids[w] = d;
                    var g = {};
                    for (var r = 0; r < u; r++) {
                        var h = m.datafields[r];
                        var o = "";
                        if (undefined == h || h == null) {
                            continue
                        }
                        if (h.map) {
                            o = a(h.map, d).text()
                        }
                        if (o == "") {
                            o = a(h.name, d).text()
                        }
                        var n = o;
                        o = this.getvaluebytype(o, h);
                        if (h.displayname != undefined) {
                            g[h.displayname] = o
                        } else {
                            g[h.name] = o
                        }
                    }
                    if (m.recordendindex <= 0 || q < m.recordendindex) {
                        t[k + l] = a.extend({}, g);
                        t[k + l].uid = w;
                        this.originaldata[k + l] = a.extend({}, t[s]);
                        l++
                    }
                }
            }
            this.records = t;
            this.cachedrecords = this.records
        }, loadtext: function (t, m) {
            if (t == null) {
                return
            }
            var b = m.rowDelimiter || this.rowDelimiter || "\n";
            var g = t.split(b);
            var e = g.length;
            this.totalrecords = this.virtualmode ? (m.totalrecords || e) : e;
            this.records = new Array();
            this.originaldata = new Array();
            var q = this.records;
            var n = !this.pageable ? m.recordstartindex : this.pagesize * this.pagenum;
            this.recordids = new Array();
            if (m.loadallrecords) {
                n = 0;
                e = this.totalrecords
            }
            var k = 0;
            if (this.virtualmode) {
                n = !this.pageable ? m.recordstartindex : this.pagesize * this.pagenum;
                k = n;
                n = 0;
                e = this.totalrecords
            }
            var r = m.datafields.length;
            var l = m.columnDelimiter || this.columnDelimiter;
            if (!l) {
                l = (m.datatype === "tab") ? "\t" : ","
            }
            for (var p = n; p < e; p++) {
                var d = g[p];
                var s = this.getid(m.id, d, p);
                if (!this.recordids[s]) {
                    this.recordids[s] = d;
                    var f = {};
                    var c = g[p].split(l);
                    for (j = 0; j < r; j++) {
                        if (j >= c.lenght) {
                            continue
                        }
                        var h = m.datafields[j];
                        var o = c[j];
                        if (h.type) {
                            o = this.getvaluebytype(o, h)
                        }
                        var u = h.map || h.name || j.toSring();
                        f[u] = o
                    }
                    q[k + p] = a.extend({}, f);
                    q[k + p].uid = s;
                    this.originaldata[k + p] = a.extend({}, q[p])
                }
            }
            this.records = q;
            this.cachedrecords = this.records
        }, getvaluebytype: function (f, c) {
            var d = f;
            if (c.type == "date") {
                var e = new Date(f);
                if (typeof f == "string") {
                    if (c.format) {
                        var b = a.jqx.dataFormat.parsedate(f, c.format);
                        if (b != null) {
                            e = b
                        }
                    }
                }
                if (e.toString() == "NaN" || e.toString() == "Invalid Date") {
                    if (a.jqx.dataFormat) {
                        f = a.jqx.dataFormat.tryparsedate(f)
                    } else {
                        f = e
                    }
                } else {
                    f = e
                }
                if (f == null) {
                    f = d
                }
            } else {
                if (c.type == "float" || c.type == "number" || c.type == "decimal") {
                    if (f == "NaN") {
                        f = ""
                    } else {
                        var f = parseFloat(f);
                        if (isNaN(f)) {
                            f = d
                        }
                    }
                } else {
                    if (c.type == "int" || c.type == "integer") {
                        var f = parseInt(f);
                        if (isNaN(f)) {
                            f = d
                        }
                    } else {
                        if (c.type == "bool" || c.type == "boolean") {
                            if (f != null) {
                                if (f.toLowerCase != undefined) {
                                    if (f.toLowerCase() == "false") {
                                        f = false
                                    } else {
                                        if (f.toLowerCase() == "true") {
                                            f = true
                                        }
                                    }
                                }
                            }
                            if (f == 1) {
                                f = true
                            } else {
                                if (f == 0 && f !== "") {
                                    f = false
                                } else {
                                    f = ""
                                }
                            }
                        }
                    }
                }
            }
            return f
        }
    };
    a.jqx.dataFormat = {};
    a.extend(a.jqx.dataFormat, {
        regexTrim: /^\s+|\s+$/g,
        regexInfinity: /^[+-]?infinity$/i,
        regexHex: /^0x[a-f0-9]+$/i,
        regexParseFloat: /^[+-]?\d*\.?\d*(e[+-]?\d+)?$/,
        toString: Object.prototype.toString,
        isBoolean: function (b) {
            return typeof b === "boolean"
        },
        isObject: function (b) {
            return (b && (typeof b === "object" || a.isFunction(b))) || false
        },
        isDate: function (b) {
            return b instanceof Date
        },
        arrayIndexOf: function (e, d) {
            if (e.indexOf) {
                return e.indexOf(d)
            }
            for (var b = 0, c = e.length; b < c; b++) {
                if (e[b] === d) {
                    return b
                }
            }
            return -1
        },
        isString: function (b) {
            return typeof b === "string"
        },
        isNumber: function (b) {
            return typeof b === "number" && isFinite(b)
        },
        isNull: function (b) {
            return b === null
        },
        isUndefined: function (b) {
            return typeof b === "undefined"
        },
        isValue: function (b) {
            return (this.isObject(b) || this.isString(b) || this.isNumber(b) || this.isBoolean(b))
        },
        isEmpty: function (b) {
            if (!this.isString(b) && this.isValue(b)) {
                return false
            } else {
                if (!this.isValue(b)) {
                    return true
                }
            }
            b = a.trim(b).replace(/\&nbsp\;/ig, "").replace(/\&#160\;/ig, "");
            return b === ""
        },
        startsWith: function (c, b) {
            return c.indexOf(b) === 0
        },
        endsWith: function (c, b) {
            return c.substr(c.length - b.length) === b
        },
        trim: function (b) {
            return (b + "").replace(this.regexTrim, "")
        },
        isArray: function (b) {
            return this.toString.call(b) === "[object Array]"
        },
        defaultcalendar: function () {
            var b = {
                "/": "/",
                ":": ":",
                firstDay: 0,
                days: {
                    names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
                },
                months: {
                    names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                    namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
                },
                AM: ["AM", "am", "AM"],
                PM: ["PM", "pm", "PM"],
                eras: [{name: "A.D.", start: null, offset: 0}],
                twoDigitYearMax: 2029,
                patterns: {
                    d: "M/d/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    f: "dddd, MMMM dd, yyyy h:mm tt",
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    M: "MMMM dd",
                    Y: "yyyy MMMM",
                    S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
                    ISO: "yyyy-MM-dd hh:mm:ss",
                    ISO2: "yyyy-MM-dd HH:mm:ss",
                    d1: "dd.MM.yyyy",
                    d2: "dd-MM-yyyy",
                    zone1: "yyyy-MM-ddTHH:mm:ss-HH:mm",
                    zone2: "yyyy-MM-ddTHH:mm:ss+HH:mm"
                },
                percentsymbol: "%",
                currencysymbol: "$",
                currencysymbolposition: "before",
                decimalseparator: ".",
                thousandsseparator: ","
            };
            return b
        },
        expandFormat: function (f, e) {
            e = e || "F";
            var d, c = f.patterns, b = e.length;
            if (b === 1) {
                d = c[e];
                if (!d) {
                    throw"Invalid date format string '" + e + "'."
                }
                e = d
            } else {
                if (b === 2 && e.charAt(0) === "%") {
                    e = e.charAt(1)
                }
            }
            return e
        },
        getEra: function (d, c) {
            if (!c) {
                return 0
            }
            if (typeof d === "string") {
                return 0
            }
            var g, f = d.getTime();
            for (var e = 0, b = c.length; e < b; e++) {
                g = c[e].start;
                if (g === null || f >= g) {
                    return e
                }
            }
            return 0
        },
        toUpper: function (b) {
            return b.split("\u00A0").join(" ").toUpperCase()
        },
        toUpperArray: function (b) {
            var e = [];
            for (var d = 0, c = b.length; d < c; d++) {
                e[d] = this.toUpper(b[d])
            }
            return e
        },
        getEraYear: function (c, e, b, f) {
            var d = c.getFullYear();
            if (!f && e.eras) {
                d -= e.eras[b].offset
            }
            return d
        },
        getDayIndex: function (f, e, c) {
            var b, g = f.days, d = f._upperDays;
            if (!d) {
                f._upperDays = d = [this.toUpperArray(g.names), this.toUpperArray(g.namesAbbr), this.toUpperArray(g.namesShort)]
            }
            e = toUpper(e);
            if (c) {
                b = this.arrayIndexOf(d[1], e);
                if (b === -1) {
                    b = this.arrayIndexOf(d[2], e)
                }
            } else {
                b = this.arrayIndexOf(d[0], e)
            }
            return b
        },
        getMonthIndex: function (k, h, d) {
            var b = k.months, c = k.monthsGenitive || k.months, f = k._upperMonths, g = k._upperMonthsGen;
            if (!f) {
                k._upperMonths = f = [this.toUpperArray(b.names), this.toUpperArray(b.namesAbbr)];
                k._upperMonthsGen = g = [this.toUpperArray(c.names), this.toUpperArray(c.namesAbbr)]
            }
            h = this.toUpper(h);
            var e = this.arrayIndexOf(d ? f[1] : f[0], h);
            if (e < 0) {
                e = this.arrayIndexOf(d ? g[1] : g[0], h)
            }
            return e
        },
        appendPreOrPostMatch: function (f, b) {
            var e = 0, h = false;
            for (var g = 0, d = f.length; g < d; g++) {
                var k = f.charAt(g);
                switch (k) {
                    case"'":
                        if (h) {
                            b.push("'")
                        } else {
                            e++
                        }
                        h = false;
                        break;
                    case"\\":
                        if (h) {
                            b.push("\\")
                        }
                        h = !h;
                        break;
                    default:
                        b.push(k);
                        h = false;
                        break
                }
            }
            return e
        },
        getTokenRegExp: function () {
            return /\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g
        },
        formatlink: function (b, d) {
            var c = "";
            if (d && d.target) {
                c = "target=" + d.target
            }
            if (c != "") {
                return "<a " + c + ' href="' + b + '">' + b + "</a>"
            }
            return '<a href="' + b + '">' + b + "</a>"
        },
        formatemail: function (b) {
            return '<a href="mailto:' + b + '">' + b + "</a>"
        },
        formatnumber: function (q, p, l) {
            if (l == undefined || l == null) {
                l = this.defaultcalendar()
            }
            if (!this.isNumber(q)) {
                q *= 1
            }
            var m;
            if (p.length > 1) {
                m = parseInt(p.slice(1), 10)
            }
            var s = {};
            var n = p.charAt(0).toUpperCase();
            s.thousandsSeparator = l.thousandsseparator;
            s.decimalSeparator = l.decimalseparator;
            switch (n) {
                case"D":
                case"d":
                case"F":
                case"f":
                    s.decimalPlaces = m;
                    break;
                case"N":
                case"n":
                    s.decimalPlaces = 0;
                    break;
                case"C":
                case"c":
                    s.decimalPlaces = m;
                    if (l.currencysymbolposition == "before") {
                        s.prefix = l.currencysymbol
                    } else {
                        s.suffix = l.currencysymbol
                    }
                    break;
                case"P":
                case"p":
                    s.suffix = l.percentsymbol;
                    s.decimalPlaces = m;
                    break;
                default:
                    throw"Bad number format specifier: " + n
            }
            if (this.isNumber(q)) {
                var f = (q < 0);
                var d = q + "";
                var o = (s.decimalSeparator) ? s.decimalSeparator : ".";
                var b;
                if (this.isNumber(s.decimalPlaces)) {
                    var g = s.decimalPlaces;
                    var k = Math.pow(10, g);
                    d = Math.round(q * k) / k + "";
                    b = d.lastIndexOf(".");
                    if (g > 0) {
                        if (b < 0) {
                            d += o;
                            b = d.length - 1
                        } else {
                            if (o !== ".") {
                                d = d.replace(".", o)
                            }
                        }
                        while ((d.length - 1 - b) < g) {
                            d += "0"
                        }
                    }
                }
                if (s.thousandsSeparator) {
                    var r = s.thousandsSeparator;
                    b = d.lastIndexOf(o);
                    b = (b > -1) ? b : d.length;
                    var e = d.substring(b);
                    var c = -1;
                    for (var h = b; h > 0; h--) {
                        c++;
                        if ((c % 3 === 0) && (h !== b) && (!f || (h > 1))) {
                            e = r + e
                        }
                        e = d.charAt(h - 1) + e
                    }
                    d = e
                }
                d = (s.prefix) ? s.prefix + d : d;
                d = (s.suffix) ? d + s.suffix : d;
                return d
            } else {
                return q
            }
        },
        tryparsedate: function (q, h) {
            if (h == undefined || h == null) {
                h = this.defaultcalendar()
            }
            var n = this;
            if (q == "") {
                return null
            }
            if (q != null && q.substring(0, 6) == "/Date(") {
                var o = /^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/;
                var e = new Date(+q.replace(/\/Date\((\d+)\)\//, "$1"));
                if (e == "Invalid Date") {
                    var f = q.match(/^\/Date\((\d+)([-+]\d\d)(\d\d)\)\/$/);
                    var e = null;
                    if (f) {
                        e = new Date(1 * f[1] + 3600000 * f[2] + 60000 * f[3])
                    }
                }
                if (e == null || e == "Invalid Date" || isNaN(e)) {
                    var i = o.exec(q);
                    if (i) {
                        var r = new Date(parseInt(i[1]));
                        if (i[2]) {
                            var b = parseInt(i[3]);
                            if (i[2] === "-") {
                                b = -b
                            }
                            var l = r.getUTCMinutes();
                            r.setUTCMinutes(l - b)
                        }
                        if (!isNaN(r.valueOf())) {
                            return r
                        }
                    }
                }
                return e
            }
            patterns = h.patterns;
            for (prop in patterns) {
                e = n.parsedate(q, patterns[prop], h);
                if (e) {
                    return e
                }
            }
            if (q != null) {
                var d = null;
                var p = [":", "/", "-"];
                var k = true;
                for (var c = 0; c < p.length; c++) {
                    if (q.indexOf(p[c]) != -1) {
                        k = false
                    }
                }
                if (k) {
                    var g = new Number(q);
                    if (!isNaN(g)) {
                        return new Date(g)
                    }
                }
            }
            return null
        },
        getparseregexp: function (b, o) {
            var q = b._parseRegExp;
            if (!q) {
                b._parseRegExp = q = {}
            } else {
                var f = q[o];
                if (f) {
                    return f
                }
            }
            var n = this.expandFormat(b, o).replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g, "\\\\$1"), k = ["^"], c = [],
                i = 0, e = 0, t = this.getTokenRegExp(), g;
            while ((g = t.exec(n)) !== null) {
                var s = n.slice(i, g.index);
                i = t.lastIndex;
                e += this.appendPreOrPostMatch(s, k);
                if (e % 2) {
                    k.push(g[0]);
                    continue
                }
                var d = g[0], h = d.length, p;
                switch (d) {
                    case"dddd":
                    case"ddd":
                    case"MMMM":
                    case"MMM":
                    case"gg":
                    case"g":
                        p = "(\\D+)";
                        break;
                    case"tt":
                    case"t":
                        p = "(\\D*)";
                        break;
                    case"yyyy":
                    case"fff":
                    case"ff":
                    case"f":
                        p = "(\\d{" + h + "})";
                        break;
                    case"dd":
                    case"d":
                    case"MM":
                    case"M":
                    case"yy":
                    case"y":
                    case"HH":
                    case"H":
                    case"hh":
                    case"h":
                    case"mm":
                    case"m":
                    case"ss":
                    case"s":
                        p = "(\\d\\d?)";
                        break;
                    case"zzz":
                        p = "([+-]?\\d\\d?:\\d{2})";
                        break;
                    case"zz":
                    case"z":
                        p = "([+-]?\\d\\d?)";
                        break;
                    case"/":
                        p = "(\\" + b["/"] + ")";
                        break;
                    default:
                        throw"Invalid date format pattern '" + d + "'.";
                        break
                }
                if (p) {
                    k.push(p)
                }
                c.push(g[0])
            }
            this.appendPreOrPostMatch(n.slice(i), k);
            k.push("$");
            var r = k.join("").replace(/\s+/g, "\\s+"), l = {regExp: r, groups: c};
            return q[o] = l
        },
        outOfRange: function (d, b, c) {
            return d < b || d > c
        },
        expandYear: function (g, e) {
            var c = new Date(), b = getEra(c);
            if (e < 100) {
                var d = g.twoDigitYearMax;
                d = typeof d === "string" ? new Date().getFullYear() % 100 + parseInt(d, 10) : d;
                var f = this.getEraYear(c, g, b);
                e += f - (f % 100);
                if (e > d) {
                    e -= 100
                }
            }
            return e
        },
        parsedate: function (z, G, u) {
            if (u == undefined || u == null) {
                u = this.defaultcalendar()
            }
            z = this.trim(z);
            var r = u, L = this.getparseregexp(r, G), k = new RegExp(L.regExp).exec(z);
            if (k === null) {
                return null
            }
            var H = L.groups, x = null, p = null, K = null, J = null, q = null, g = 0, C, B = 0, I = 0, b = 0, d = null,
                s = false;
            for (var D = 0, F = H.length; D < F; D++) {
                var c = k[D + 1];
                if (c) {
                    var y = H[D], f = y.length, h = parseInt(c, 10);
                    switch (y) {
                        case"dd":
                        case"d":
                            J = h;
                            if (this.outOfRange(J, 1, 31)) {
                                return null
                            }
                            break;
                        case"MMM":
                        case"MMMM":
                            K = this.getMonthIndex(r, c, f === 3);
                            if (this.outOfRange(K, 0, 11)) {
                                return null
                            }
                            break;
                        case"M":
                        case"MM":
                            K = h - 1;
                            if (this.outOfRange(K, 0, 11)) {
                                return null
                            }
                            break;
                        case"y":
                        case"yy":
                        case"yyyy":
                            p = f < 4 ? this.expandYear(r, h) : h;
                            if (this.outOfRange(p, 0, 9999)) {
                                return null
                            }
                            break;
                        case"h":
                        case"hh":
                            g = h;
                            if (g === 12) {
                                g = 0
                            }
                            if (this.outOfRange(g, 0, 11)) {
                                return null
                            }
                            break;
                        case"H":
                        case"HH":
                            g = h;
                            if (this.outOfRange(g, 0, 23)) {
                                return null
                            }
                            break;
                        case"m":
                        case"mm":
                            B = h;
                            if (this.outOfRange(B, 0, 59)) {
                                return null
                            }
                            break;
                        case"s":
                        case"ss":
                            I = h;
                            if (this.outOfRange(I, 0, 59)) {
                                return null
                            }
                            break;
                        case"tt":
                        case"t":
                            s = r.PM && (c === r.PM[0] || c === r.PM[1] || c === r.PM[2]);
                            if (!s && (!r.AM || (c !== r.AM[0] && c !== r.AM[1] && c !== r.AM[2]))) {
                                return null
                            }
                            break;
                        case"f":
                        case"ff":
                        case"fff":
                            b = h * Math.pow(10, 3 - f);
                            if (this.outOfRange(b, 0, 999)) {
                                return null
                            }
                            break;
                        case"ddd":
                        case"dddd":
                            q = this.getDayIndex(r, c, f === 3);
                            if (this.outOfRange(q, 0, 6)) {
                                return null
                            }
                            break;
                        case"zzz":
                            var e = c.split(/:/);
                            if (e.length !== 2) {
                                return null
                            }
                            C = parseInt(e[0], 10);
                            if (this.outOfRange(C, -12, 13)) {
                                return null
                            }
                            var n = parseInt(e[1], 10);
                            if (this.outOfRange(n, 0, 59)) {
                                return null
                            }
                            d = (C * 60) + (startsWith(c, "-") ? -n : n);
                            break;
                        case"z":
                        case"zz":
                            C = h;
                            if (this.outOfRange(C, -12, 13)) {
                                return null
                            }
                            d = C * 60;
                            break;
                        case"g":
                        case"gg":
                            var t = c;
                            if (!t || !r.eras) {
                                return null
                            }
                            t = trim(t.toLowerCase());
                            for (var E = 0, A = r.eras.length; E < A; E++) {
                                if (t === r.eras[E].name.toLowerCase()) {
                                    x = E;
                                    break
                                }
                            }
                            if (x === null) {
                                return null
                            }
                            break
                    }
                }
            }
            var o = new Date(), w, m = r.convert;
            w = o.getFullYear();
            if (p === null) {
                p = w
            } else {
                if (r.eras) {
                    p += r.eras[(x || 0)].offset
                }
            }
            if (K === null) {
                K = 0
            }
            if (J === null) {
                J = 1
            }
            if (m) {
                o = m.toGregorian(p, K, J);
                if (o === null) {
                    return null
                }
            } else {
                o.setFullYear(p, K, J);
                if (o.getDate() !== J) {
                    return null
                }
                if (q !== null && o.getDay() !== q) {
                    return null
                }
            }
            if (s && g < 12) {
                g += 12
            }
            o.setHours(g, B, I, b);
            if (d !== null) {
                var v = o.getMinutes() - (d + o.getTimezoneOffset());
                o.setHours(o.getHours() + parseInt(v / 60, 10), v % 60)
            }
            return o
        },
        cleardatescache: function () {
            this.datescache = new Array()
        },
        formatdate: function (v, z, q) {
            if (q == undefined || q == null) {
                q = this.defaultcalendar()
            }
            if (typeof v === "string") {
                return v
            }
            var e = v.toString() + "_" + z;
            if (this.datescache && this.datescache[e]) {
                return this.datescache[e]
            }
            if (!z || !z.length || z === "i") {
                var B;
                B = this.formatDate(v, q.patterns.F, culture);
                return B
            }
            var w = q.eras, c = z === "s";
            z = this.expandFormat(q, z);
            B = [];
            var h, x = ["0", "00", "000"], m, n, b = /([^d]|^)(d|dd)([^d]|$)/g, A = 0, s = this.getTokenRegExp(), d;

            function k(C, F) {
                var E, D = C + "";
                if (F > 1 && D.length < F) {
                    E = (x[F - 2] + D);
                    return E.substr(E.length - F, F)
                } else {
                    E = D
                }
                return E
            }

            function y() {
                if (m || n) {
                    return m
                }
                m = b.test(z);
                n = true;
                return m
            }

            function f(D, C) {
                if (d) {
                    return d[C]
                }
                if (D.getMonth != undefined) {
                    switch (C) {
                        case 0:
                            return D.getFullYear();
                        case 1:
                            return D.getMonth();
                        case 2:
                            return D.getDate()
                    }
                }
            }

            for (; ;) {
                var i = s.lastIndex, r = s.exec(z);
                var o = z.slice(i, r ? r.index : z.length);
                A += this.appendPreOrPostMatch(o, B);
                if (!r) {
                    break
                }
                if (A % 2) {
                    B.push(r[0]);
                    continue
                }
                var t = r[0], g = t.length;
                switch (t) {
                    case"ddd":
                    case"dddd":
                        var p = (g === 3) ? q.days.namesAbbr : q.days.names;
                        B.push(p[v.getDay()]);
                        break;
                    case"d":
                    case"dd":
                        m = true;
                        B.push(k(f(v, 2), g));
                        break;
                    case"MMM":
                    case"MMMM":
                        var u = f(v, 1);
                        B.push(q.months[g === 3 ? "namesAbbr" : "names"][u]);
                        break;
                    case"M":
                    case"MM":
                        B.push(k(f(v, 1) + 1, g));
                        break;
                    case"y":
                    case"yy":
                    case"yyyy":
                        u = this.getEraYear(v, q, this.getEra(v, w), c);
                        if (g < 4) {
                            u = u % 100
                        }
                        B.push(k(u, g));
                        break;
                    case"h":
                    case"hh":
                        h = v.getHours() % 12;
                        if (h === 0) {
                            h = 12
                        }
                        B.push(k(h, g));
                        break;
                    case"H":
                    case"HH":
                        B.push(k(v.getHours(), g));
                        break;
                    case"m":
                    case"mm":
                        B.push(k(v.getMinutes(), g));
                        break;
                    case"s":
                    case"ss":
                        B.push(k(v.getSeconds(), g));
                        break;
                    case"t":
                    case"tt":
                        u = v.getHours() < 12 ? (q.AM ? q.AM[0] : " ") : (q.PM ? q.PM[0] : " ");
                        B.push(g === 1 ? u.charAt(0) : u);
                        break;
                    case"f":
                    case"ff":
                    case"fff":
                        B.push(k(v.getMilliseconds(), 3).substr(0, g));
                        break;
                    case"z":
                    case"zz":
                        h = v.getTimezoneOffset() / 60;
                        B.push((h <= 0 ? "+" : "-") + k(Math.floor(Math.abs(h)), g));
                        break;
                    case"zzz":
                        h = v.getTimezoneOffset() / 60;
                        B.push((h <= 0 ? "+" : "-") + k(Math.floor(Math.abs(h)), 2) + ":" + k(Math.abs(v.getTimezoneOffset() % 60), 2));
                        break;
                    case"g":
                    case"gg":
                        if (q.eras) {
                            B.push(q.eras[getEra(v, w)].name)
                        }
                        break;
                    case"/":
                        B.push(q["/"]);
                        break;
                    default:
                        throw"Invalid date format pattern '" + t + "'.";
                        break
                }
            }
            var l = B.join("");
            if (!this.datescache) {
                this.datescache = new Array()
            }
            this.datescache[e] = l;
            return l
        }
    })
})(jQuery);