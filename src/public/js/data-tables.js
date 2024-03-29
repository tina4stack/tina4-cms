/*
 * This combined file was created by the DataTables downloader builder:
 *   https://datatables.net/download
 *
 * To rebuild or modify this file with the latest versions of the included
 * software please visit:
 *   https://datatables.net/download/#bs5/jszip-3.10.1/dt-1.13.6/af-2.6.0/b-2.4.2/b-colvis-2.4.2/b-html5-2.4.2/b-print-2.4.2/cr-1.7.0/date-1.5.1/fc-4.3.0/fh-3.4.0/kt-2.10.0/r-2.5.0/rg-1.4.0/rr-1.4.1/sc-2.2.0/sb-1.6.0/sp-2.2.0/sl-1.7.0/sr-1.3.0
 *
 * Included libraries:
 *  JSZip 3.10.1, DataTables 1.13.6, AutoFill 2.6.0, Buttons 2.4.2, Column visibility 2.4.2, HTML5 export 2.4.2, Print view 2.4.2, ColReorder 1.7.0, DateTime 1.5.1, FixedColumns 4.3.0, FixedHeader 3.4.0, KeyTable 2.10.0, Responsive 2.5.0, RowGroup 1.4.0, RowReorder 1.4.1, Scroller 2.2.0, SearchBuilder 1.6.0, SearchPanes 2.2.0, Select 1.7.0, StateRestore 1.3.0
 */

/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).JSZip = e()
    }
}(function() {
    return function s(a, o, h) {
        function u(r, e) {
            if (!o[r]) {
                if (!a[r]) {
                    var t = "function" == typeof require && require;
                    if (!e && t)
                        return t(r, !0);
                    if (l)
                        return l(r, !0);
                    var n = new Error("Cannot find module '" + r + "'");
                    throw n.code = "MODULE_NOT_FOUND", n
                }
                var i = o[r] = {
                    exports: {}
                };
                a[r][0].call(i.exports, function(e) {
                    var t = a[r][1][e];
                    return u(t || e)
                }, i, i.exports, s, a, o, h)
            }
            return o[r].exports
        }
        for (var l = "function" == typeof require && require, e = 0; e < h.length; e++)
            u(h[e]);
        return u
    }({
        1: [function(e, t, r) {
            "use strict";
            var d = e("./utils"),
                c = e("./support"),
                p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            r.encode = function(e) {
                for (var t, r, n, i, s, a, o, h = [], u = 0, l = e.length, f = l, c = "string" !== d.getTypeOf(e); u < e.length;)
                    f = l - u,
                        n = c ? (t = e[u++], r = u < l ? e[u++] : 0, u < l ? e[u++] : 0) : (t = e.charCodeAt(u++), r = u < l ? e.charCodeAt(u++) : 0, u < l ? e.charCodeAt(u++) : 0),
                        i = t >> 2,
                        s = (3 & t) << 4 | r >> 4,
                        a = 1 < f ? (15 & r) << 2 | n >> 6 : 64,
                        o = 2 < f ? 63 & n : 64,
                        h.push(p.charAt(i) + p.charAt(s) + p.charAt(a) + p.charAt(o));
                return h.join("")
            },
                r.decode = function(e) {
                    var t,
                        r,
                        n,
                        i,
                        s,
                        a,
                        o = 0,
                        h = 0,
                        u = "data:";
                    if (e.substr(0, u.length) === u)
                        throw new Error("Invalid base64 input, it looks like a data url.");
                    var l,
                        f = 3 * (e = e.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
                    if (e.charAt(e.length - 1) === p.charAt(64) && f--, e.charAt(e.length - 2) === p.charAt(64) && f--, f % 1 != 0)
                        throw new Error("Invalid base64 input, bad content length.");
                    for (l = c.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); o < e.length;)
                        t = p.indexOf(e.charAt(o++)) << 2 | (i = p.indexOf(e.charAt(o++))) >> 4,
                            r = (15 & i) << 4 | (s = p.indexOf(e.charAt(o++))) >> 2,
                            n = (3 & s) << 6 | (a = p.indexOf(e.charAt(o++))),
                            l[h++] = t,
                        64 !== s && (l[h++] = r),
                        64 !== a && (l[h++] = n);
                    return l
                }
        }, {
            "./support": 30,
            "./utils": 32
        }],
        2: [function(e, t, r) {
            "use strict";
            var n = e("./external"),
                i = e("./stream/DataWorker"),
                s = e("./stream/Crc32Probe"),
                a = e("./stream/DataLengthProbe");
            function o(e, t, r, n, i) {
                this.compressedSize = e,
                    this.uncompressedSize = t,
                    this.crc32 = r,
                    this.compression = n,
                    this.compressedContent = i
            }
            o.prototype = {
                getContentWorker: function() {
                    var e = new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),
                        t = this;
                    return e.on("end", function() {
                        if (this.streamInfo.data_length !== t.uncompressedSize)
                            throw new Error("Bug : uncompressed data size mismatch")
                    }), e
                },
                getCompressedWorker: function() {
                    return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression)
                }
            },
                o.createWorkerFrom = function(e, t, r) {
                    return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression", t)
                },
                t.exports = o
        }, {
            "./external": 6,
            "./stream/Crc32Probe": 25,
            "./stream/DataLengthProbe": 26,
            "./stream/DataWorker": 27
        }],
        3: [function(e, t, r) {
            "use strict";
            var n = e("./stream/GenericWorker");
            r.STORE = {
                magic: "\0\0",
                compressWorker: function() {
                    return new n("STORE compression")
                },
                uncompressWorker: function() {
                    return new n("STORE decompression")
                }
            },
                r.DEFLATE = e("./flate")
        }, {
            "./flate": 7,
            "./stream/GenericWorker": 28
        }],
        4: [function(e, t, r) {
            "use strict";
            var n = e("./utils");
            var o = function() {
                for (var e, t = [], r = 0; r < 256; r++) {
                    e = r;
                    for (var n = 0; n < 8; n++)
                        e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                    t[r] = e
                }
                return t
            }();
            t.exports = function(e, t) {
                return void 0 !== e && e.length ? "string" !== n.getTypeOf(e) ? function(e, t, r, n) {
                    var i = o,
                        s = n + r;
                    e ^= -1;
                    for (var a = n; a < s; a++)
                        e = e >>> 8 ^ i[255 & (e ^ t[a])];
                    return -1 ^ e
                }(0 | t, e, e.length, 0) : function(e, t, r, n) {
                    var i = o,
                        s = n + r;
                    e ^= -1;
                    for (var a = n; a < s; a++)
                        e = e >>> 8 ^ i[255 & (e ^ t.charCodeAt(a))];
                    return -1 ^ e
                }(0 | t, e, e.length, 0) : 0
            }
        }, {
            "./utils": 32
        }],
        5: [function(e, t, r) {
            "use strict";
            r.base64 = !1,
                r.binary = !1,
                r.dir = !1,
                r.createFolders = !0,
                r.date = null,
                r.compression = null,
                r.compressionOptions = null,
                r.comment = null,
                r.unixPermissions = null,
                r.dosPermissions = null
        }, {}],
        6: [function(e, t, r) {
            "use strict";
            var n = null;
            n = "undefined" != typeof Promise ? Promise : e("lie"),
                t.exports = {
                    Promise: n
                }
        }, {
            lie: 37
        }],
        7: [function(e, t, r) {
            "use strict";
            var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array,
                i = e("pako"),
                s = e("./utils"),
                a = e("./stream/GenericWorker"),
                o = n ? "uint8array" : "array";
            function h(e, t) {
                a.call(this, "FlateWorker/" + e),
                    this._pako = null,
                    this._pakoAction = e,
                    this._pakoOptions = t,
                    this.meta = {}
            }
            r.magic = "\b\0",
                s.inherits(h, a),
                h.prototype.processChunk = function(e) {
                    this.meta = e.meta,
                    null === this._pako && this._createPako(),
                        this._pako.push(s.transformTo(o, e.data), !1)
                },
                h.prototype.flush = function() {
                    a.prototype.flush.call(this),
                    null === this._pako && this._createPako(),
                        this._pako.push([], !0)
                },
                h.prototype.cleanUp = function() {
                    a.prototype.cleanUp.call(this),
                        this._pako = null
                },
                h.prototype._createPako = function() {
                    this._pako = new i[this._pakoAction]({
                        raw: !0,
                        level: this._pakoOptions.level || -1
                    });
                    var t = this;
                    this._pako.onData = function(e) {
                        t.push({
                            data: e,
                            meta: t.meta
                        })
                    }
                },
                r.compressWorker = function(e) {
                    return new h("Deflate", e)
                },
                r.uncompressWorker = function() {
                    return new h("Inflate", {})
                }
        }, {
            "./stream/GenericWorker": 28,
            "./utils": 32,
            pako: 38
        }],
        8: [function(e, t, r) {
            "use strict";
            function A(e, t) {
                var r,
                    n = "";
                for (r = 0; r < t; r++)
                    n += String.fromCharCode(255 & e),
                        e >>>= 8;
                return n
            }
            function n(e, t, r, n, i, s) {
                var a,
                    o,
                    h = e.file,
                    u = e.compression,
                    l = s !== O.utf8encode,
                    f = I.transformTo("string", s(h.name)),
                    c = I.transformTo("string", O.utf8encode(h.name)),
                    d = h.comment,
                    p = I.transformTo("string", s(d)),
                    m = I.transformTo("string", O.utf8encode(d)),
                    _ = c.length !== h.name.length,
                    g = m.length !== d.length,
                    b = "",
                    v = "",
                    y = "",
                    w = h.dir,
                    k = h.date,
                    x = {
                        crc32: 0,
                        compressedSize: 0,
                        uncompressedSize: 0
                    };
                t && !r || (x.crc32 = e.crc32, x.compressedSize = e.compressedSize, x.uncompressedSize = e.uncompressedSize);
                var S = 0;
                t && (S |= 8),
                l || !_ && !g || (S |= 2048);
                var z = 0,
                    C = 0;
                w && (z |= 16),
                    "UNIX" === i ? (C = 798, z |= function(e, t) {
                        var r = e;
                        return e || (r = t ? 16893 : 33204), (65535 & r) << 16
                    }(h.unixPermissions, w)) : (C = 20, z |= function(e) {
                        return 63 & (e || 0)
                    }(h.dosPermissions)),
                    a = k.getUTCHours(),
                    a <<= 6,
                    a |= k.getUTCMinutes(),
                    a <<= 5,
                    a |= k.getUTCSeconds() / 2,
                    o = k.getUTCFullYear() - 1980,
                    o <<= 4,
                    o |= k.getUTCMonth() + 1,
                    o <<= 5,
                    o |= k.getUTCDate(),
                _ && (v = A(1, 1) + A(B(f), 4) + c, b += "up" + A(v.length, 2) + v),
                g && (y = A(1, 1) + A(B(p), 4) + m, b += "uc" + A(y.length, 2) + y);
                var E = "";
                return E += "\n\0", E += A(S, 2), E += u.magic, E += A(a, 2), E += A(o, 2), E += A(x.crc32, 4), E += A(x.compressedSize, 4), E += A(x.uncompressedSize, 4), E += A(f.length, 2), E += A(b.length, 2), {
                    fileRecord: R.LOCAL_FILE_HEADER + E + f + b,
                    dirRecord: R.CENTRAL_FILE_HEADER + A(C, 2) + E + A(p.length, 2) + "\0\0\0\0" + A(z, 4) + A(n, 4) + f + b + p
                }
            }
            var I = e("../utils"),
                i = e("../stream/GenericWorker"),
                O = e("../utf8"),
                B = e("../crc32"),
                R = e("../signature");
            function s(e, t, r, n) {
                i.call(this, "ZipFileWorker"),
                    this.bytesWritten = 0,
                    this.zipComment = t,
                    this.zipPlatform = r,
                    this.encodeFileName = n,
                    this.streamFiles = e,
                    this.accumulate = !1,
                    this.contentBuffer = [],
                    this.dirRecords = [],
                    this.currentSourceOffset = 0,
                    this.entriesCount = 0,
                    this.currentFile = null,
                    this._sources = []
            }
            I.inherits(s, i),
                s.prototype.push = function(e) {
                    var t = e.meta.percent || 0,
                        r = this.entriesCount,
                        n = this._sources.length;
                    this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, i.prototype.push.call(this, {
                        data: e.data,
                        meta: {
                            currentFile: this.currentFile,
                            percent: r ? (t + 100 * (r - n - 1)) / r : 100
                        }
                    }))
                },
                s.prototype.openedSource = function(e) {
                    this.currentSourceOffset = this.bytesWritten,
                        this.currentFile = e.file.name;
                    var t = this.streamFiles && !e.file.dir;
                    if (t) {
                        var r = n(e, t, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                        this.push({
                            data: r.fileRecord,
                            meta: {
                                percent: 0
                            }
                        })
                    } else
                        this.accumulate = !0
                },
                s.prototype.closedSource = function(e) {
                    this.accumulate = !1;
                    var t = this.streamFiles && !e.file.dir,
                        r = n(e, t, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                    if (this.dirRecords.push(r.dirRecord), t)
                        this.push({
                            data: function(e) {
                                return R.DATA_DESCRIPTOR + A(e.crc32, 4) + A(e.compressedSize, 4) + A(e.uncompressedSize, 4)
                            }(e),
                            meta: {
                                percent: 100
                            }
                        });
                    else
                        for (this.push({
                            data: r.fileRecord,
                            meta: {
                                percent: 0
                            }
                        }); this.contentBuffer.length;)
                            this.push(this.contentBuffer.shift());
                    this.currentFile = null
                },
                s.prototype.flush = function() {
                    for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++)
                        this.push({
                            data: this.dirRecords[t],
                            meta: {
                                percent: 100
                            }
                        });
                    var r = this.bytesWritten - e,
                        n = function(e, t, r, n, i) {
                            var s = I.transformTo("string", i(n));
                            return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(e, 2) + A(e, 2) + A(t, 4) + A(r, 4) + A(s.length, 2) + s
                        }(this.dirRecords.length, r, e, this.zipComment, this.encodeFileName);
                    this.push({
                        data: n,
                        meta: {
                            percent: 100
                        }
                    })
                },
                s.prototype.prepareNextSource = function() {
                    this.previous = this._sources.shift(),
                        this.openedSource(this.previous.streamInfo),
                        this.isPaused ? this.previous.pause() : this.previous.resume()
                },
                s.prototype.registerPrevious = function(e) {
                    this._sources.push(e);
                    var t = this;
                    return e.on("data", function(e) {
                        t.processChunk(e)
                    }), e.on("end", function() {
                        t.closedSource(t.previous.streamInfo),
                            t._sources.length ? t.prepareNextSource() : t.end()
                    }), e.on("error", function(e) {
                        t.error(e)
                    }), this
                },
                s.prototype.resume = function() {
                    return !!i.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0))
                },
                s.prototype.error = function(e) {
                    var t = this._sources;
                    if (!i.prototype.error.call(this, e))
                        return !1;
                    for (var r = 0; r < t.length; r++)
                        try {
                            t[r].error(e)
                        } catch (e) {}
                    return !0
                },
                s.prototype.lock = function() {
                    i.prototype.lock.call(this);
                    for (var e = this._sources, t = 0; t < e.length; t++)
                        e[t].lock()
                },
                t.exports = s
        }, {
            "../crc32": 4,
            "../signature": 23,
            "../stream/GenericWorker": 28,
            "../utf8": 31,
            "../utils": 32
        }],
        9: [function(e, t, r) {
            "use strict";
            var u = e("../compressions"),
                n = e("./ZipFileWorker");
            r.generateWorker = function(e, a, t) {
                var o = new n(a.streamFiles, t, a.platform, a.encodeFileName),
                    h = 0;
                try {
                    e.forEach(function(e, t) {
                        h++;
                        var r = function(e, t) {
                                var r = e || t,
                                    n = u[r];
                                if (!n)
                                    throw new Error(r + " is not a valid compression method !");
                                return n
                            }(t.options.compression, a.compression),
                            n = t.options.compressionOptions || a.compressionOptions || {},
                            i = t.dir,
                            s = t.date;
                        t._compressWorker(r, n).withStreamInfo("file", {
                            name: e,
                            dir: i,
                            date: s,
                            comment: t.comment || "",
                            unixPermissions: t.unixPermissions,
                            dosPermissions: t.dosPermissions
                        }).pipe(o)
                    }),
                        o.entriesCount = h
                } catch (e) {
                    o.error(e)
                }
                return o
            }
        }, {
            "../compressions": 3,
            "./ZipFileWorker": 8
        }],
        10: [function(e, t, r) {
            "use strict";
            function n() {
                if (!(this instanceof n))
                    return new n;
                if (arguments.length)
                    throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
                this.files = Object.create(null),
                    this.comment = null,
                    this.root = "",
                    this.clone = function() {
                        var e = new n;
                        for (var t in this)
                            "function" != typeof this[t] && (e[t] = this[t]);
                        return e
                    }
            }
            (n.prototype = e("./object")).loadAsync = e("./load"),
                n.support = e("./support"),
                n.defaults = e("./defaults"),
                n.version = "3.10.1",
                n.loadAsync = function(e, t) {
                    return (new n).loadAsync(e, t)
                },
                n.external = e("./external"),
                t.exports = n
        }, {
            "./defaults": 5,
            "./external": 6,
            "./load": 11,
            "./object": 15,
            "./support": 30
        }],
        11: [function(e, t, r) {
            "use strict";
            var u = e("./utils"),
                i = e("./external"),
                n = e("./utf8"),
                s = e("./zipEntries"),
                a = e("./stream/Crc32Probe"),
                l = e("./nodejsUtils");
            function f(n) {
                return new i.Promise(function(e, t) {
                    var r = n.decompressed.getContentWorker().pipe(new a);
                    r.on("error", function(e) {
                        t(e)
                    }).on("end", function() {
                        r.streamInfo.crc32 !== n.decompressed.crc32 ? t(new Error("Corrupted zip : CRC32 mismatch")) : e()
                    }).resume()
                })
            }
            t.exports = function(e, o) {
                var h = this;
                return o = u.extend(o || {}, {
                    base64: !1,
                    checkCRC32: !1,
                    optimizedBinaryString: !1,
                    createFolders: !1,
                    decodeFileName: n.utf8decode
                }), l.isNode && l.isStream(e) ? i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : u.prepareContent("the loaded zip file", e, !0, o.optimizedBinaryString, o.base64).then(function(e) {
                    var t = new s(o);
                    return t.load(e), t
                }).then(function(e) {
                    var t = [i.Promise.resolve(e)],
                        r = e.files;
                    if (o.checkCRC32)
                        for (var n = 0; n < r.length; n++)
                            t.push(f(r[n]));
                    return i.Promise.all(t)
                }).then(function(e) {
                    for (var t = e.shift(), r = t.files, n = 0; n < r.length; n++) {
                        var i = r[n],
                            s = i.fileNameStr,
                            a = u.resolve(i.fileNameStr);
                        h.file(a, i.decompressed, {
                            binary: !0,
                            optimizedBinaryString: !0,
                            date: i.date,
                            dir: i.dir,
                            comment: i.fileCommentStr.length ? i.fileCommentStr : null,
                            unixPermissions: i.unixPermissions,
                            dosPermissions: i.dosPermissions,
                            createFolders: o.createFolders
                        }),
                        i.dir || (h.file(a).unsafeOriginalName = s)
                    }
                    return t.zipComment.length && (h.comment = t.zipComment), h
                })
            }
        }, {
            "./external": 6,
            "./nodejsUtils": 14,
            "./stream/Crc32Probe": 25,
            "./utf8": 31,
            "./utils": 32,
            "./zipEntries": 33
        }],
        12: [function(e, t, r) {
            "use strict";
            var n = e("../utils"),
                i = e("../stream/GenericWorker");
            function s(e, t) {
                i.call(this, "Nodejs stream input adapter for " + e),
                    this._upstreamEnded = !1,
                    this._bindStream(t)
            }
            n.inherits(s, i),
                s.prototype._bindStream = function(e) {
                    var t = this;
                    (this._stream = e).pause(),
                        e.on("data", function(e) {
                            t.push({
                                data: e,
                                meta: {
                                    percent: 0
                                }
                            })
                        }).on("error", function(e) {
                            t.isPaused ? this.generatedError = e : t.error(e)
                        }).on("end", function() {
                            t.isPaused ? t._upstreamEnded = !0 : t.end()
                        })
                },
                s.prototype.pause = function() {
                    return !!i.prototype.pause.call(this) && (this._stream.pause(), !0)
                },
                s.prototype.resume = function() {
                    return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0)
                },
                t.exports = s
        }, {
            "../stream/GenericWorker": 28,
            "../utils": 32
        }],
        13: [function(e, t, r) {
            "use strict";
            var i = e("readable-stream").Readable;
            function n(e, t, r) {
                i.call(this, t),
                    this._helper = e;
                var n = this;
                e.on("data", function(e, t) {
                    n.push(e) || n._helper.pause(),
                    r && r(t)
                }).on("error", function(e) {
                    n.emit("error", e)
                }).on("end", function() {
                    n.push(null)
                })
            }
            e("../utils").inherits(n, i),
                n.prototype._read = function() {
                    this._helper.resume()
                },
                t.exports = n
        }, {
            "../utils": 32,
            "readable-stream": 16
        }],
        14: [function(e, t, r) {
            "use strict";
            t.exports = {
                isNode: "undefined" != typeof Buffer,
                newBufferFrom: function(e, t) {
                    if (Buffer.from && Buffer.from !== Uint8Array.from)
                        return Buffer.from(e, t);
                    if ("number" == typeof e)
                        throw new Error('The "data" argument must not be a number');
                    return new Buffer(e, t)
                },
                allocBuffer: function(e) {
                    if (Buffer.alloc)
                        return Buffer.alloc(e);
                    var t = new Buffer(e);
                    return t.fill(0), t
                },
                isBuffer: function(e) {
                    return Buffer.isBuffer(e)
                },
                isStream: function(e) {
                    return e && "function" == typeof e.on && "function" == typeof e.pause && "function" == typeof e.resume
                }
            }
        }, {}],
        15: [function(e, t, r) {
            "use strict";
            function s(e, t, r) {
                var n,
                    i = u.getTypeOf(t),
                    s = u.extend(r || {}, f);
                s.date = s.date || new Date,
                null !== s.compression && (s.compression = s.compression.toUpperCase()),
                "string" == typeof s.unixPermissions && (s.unixPermissions = parseInt(s.unixPermissions, 8)),
                s.unixPermissions && 16384 & s.unixPermissions && (s.dir = !0),
                s.dosPermissions && 16 & s.dosPermissions && (s.dir = !0),
                s.dir && (e = g(e)),
                s.createFolders && (n = _(e)) && b.call(this, n, !0);
                var a = "string" === i && !1 === s.binary && !1 === s.base64;
                r && void 0 !== r.binary || (s.binary = !a),
                (t instanceof c && 0 === t.uncompressedSize || s.dir || !t || 0 === t.length) && (s.base64 = !1, s.binary = !0, t = "", s.compression = "STORE", i = "string");
                var o = null;
                o = t instanceof c || t instanceof l ? t : p.isNode && p.isStream(t) ? new m(e, t) : u.prepareContent(e, t, s.binary, s.optimizedBinaryString, s.base64);
                var h = new d(e, o, s);
                this.files[e] = h
            }
            var i = e("./utf8"),
                u = e("./utils"),
                l = e("./stream/GenericWorker"),
                a = e("./stream/StreamHelper"),
                f = e("./defaults"),
                c = e("./compressedObject"),
                d = e("./zipObject"),
                o = e("./generate"),
                p = e("./nodejsUtils"),
                m = e("./nodejs/NodejsStreamInputAdapter"),
                _ = function(e) {
                    "/" === e.slice(-1) && (e = e.substring(0, e.length - 1));
                    var t = e.lastIndexOf("/");
                    return 0 < t ? e.substring(0, t) : ""
                },
                g = function(e) {
                    return "/" !== e.slice(-1) && (e += "/"), e
                },
                b = function(e, t) {
                    return t = void 0 !== t ? t : f.createFolders, e = g(e), this.files[e] || s.call(this, e, null, {
                        dir: !0,
                        createFolders: t
                    }), this.files[e]
                };
            function h(e) {
                return "[object RegExp]" === Object.prototype.toString.call(e)
            }
            var n = {
                load: function() {
                    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                },
                forEach: function(e) {
                    var t,
                        r,
                        n;
                    for (t in this.files)
                        n = this.files[t],
                        (r = t.slice(this.root.length, t.length)) && t.slice(0, this.root.length) === this.root && e(r, n)
                },
                filter: function(r) {
                    var n = [];
                    return this.forEach(function(e, t) {
                        r(e, t) && n.push(t)
                    }), n
                },
                file: function(e, t, r) {
                    if (1 !== arguments.length)
                        return e = this.root + e, s.call(this, e, t, r), this;
                    if (h(e)) {
                        var n = e;
                        return this.filter(function(e, t) {
                            return !t.dir && n.test(e)
                        })
                    }
                    var i = this.files[this.root + e];
                    return i && !i.dir ? i : null
                },
                folder: function(r) {
                    if (!r)
                        return this;
                    if (h(r))
                        return this.filter(function(e, t) {
                            return t.dir && r.test(e)
                        });
                    var e = this.root + r,
                        t = b.call(this, e),
                        n = this.clone();
                    return n.root = t.name, n
                },
                remove: function(r) {
                    r = this.root + r;
                    var e = this.files[r];
                    if (e || ("/" !== r.slice(-1) && (r += "/"), e = this.files[r]), e && !e.dir)
                        delete this.files[r];
                    else
                        for (var t = this.filter(function(e, t) {
                            return t.name.slice(0, r.length) === r
                        }), n = 0; n < t.length; n++)
                            delete this.files[t[n].name];
                    return this
                },
                generate: function() {
                    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                },
                generateInternalStream: function(e) {
                    var t,
                        r = {};
                    try {
                        if ((r = u.extend(e || {}, {
                            streamFiles: !1,
                            compression: "STORE",
                            compressionOptions: null,
                            type: "",
                            platform: "DOS",
                            comment: null,
                            mimeType: "application/zip",
                            encodeFileName: i.utf8encode
                        })).type = r.type.toLowerCase(), r.compression = r.compression.toUpperCase(), "binarystring" === r.type && (r.type = "string"), !r.type)
                            throw new Error("No output type specified.");
                        u.checkSupport(r.type),
                        "darwin" !== r.platform && "freebsd" !== r.platform && "linux" !== r.platform && "sunos" !== r.platform || (r.platform = "UNIX"),
                        "win32" === r.platform && (r.platform = "DOS");
                        var n = r.comment || this.comment || "";
                        t = o.generateWorker(this, r, n)
                    } catch (e) {
                        (t = new l("error")).error(e)
                    }
                    return new a(t, r.type || "string", r.mimeType)
                },
                generateAsync: function(e, t) {
                    return this.generateInternalStream(e).accumulate(t)
                },
                generateNodeStream: function(e, t) {
                    return (e = e || {}).type || (e.type = "nodebuffer"), this.generateInternalStream(e).toNodejsStream(t)
                }
            };
            t.exports = n
        }, {
            "./compressedObject": 2,
            "./defaults": 5,
            "./generate": 9,
            "./nodejs/NodejsStreamInputAdapter": 12,
            "./nodejsUtils": 14,
            "./stream/GenericWorker": 28,
            "./stream/StreamHelper": 29,
            "./utf8": 31,
            "./utils": 32,
            "./zipObject": 35
        }],
        16: [function(e, t, r) {
            "use strict";
            t.exports = e("stream")
        }, {
            stream: void 0
        }],
        17: [function(e, t, r) {
            "use strict";
            var n = e("./DataReader");
            function i(e) {
                n.call(this, e);
                for (var t = 0; t < this.data.length; t++)
                    e[t] = 255 & e[t]
            }
            e("../utils").inherits(i, n),
                i.prototype.byteAt = function(e) {
                    return this.data[this.zero + e]
                },
                i.prototype.lastIndexOfSignature = function(e) {
                    for (var t = e.charCodeAt(0), r = e.charCodeAt(1), n = e.charCodeAt(2), i = e.charCodeAt(3), s = this.length - 4; 0 <= s; --s)
                        if (this.data[s] === t && this.data[s + 1] === r && this.data[s + 2] === n && this.data[s + 3] === i)
                            return s - this.zero;
                    return -1
                },
                i.prototype.readAndCheckSignature = function(e) {
                    var t = e.charCodeAt(0),
                        r = e.charCodeAt(1),
                        n = e.charCodeAt(2),
                        i = e.charCodeAt(3),
                        s = this.readData(4);
                    return t === s[0] && r === s[1] && n === s[2] && i === s[3]
                },
                i.prototype.readData = function(e) {
                    if (this.checkOffset(e), 0 === e)
                        return [];
                    var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
                    return this.index += e, t
                },
                t.exports = i
        }, {
            "../utils": 32,
            "./DataReader": 18
        }],
        18: [function(e, t, r) {
            "use strict";
            var n = e("../utils");
            function i(e) {
                this.data = e,
                    this.length = e.length,
                    this.index = 0,
                    this.zero = 0
            }
            i.prototype = {
                checkOffset: function(e) {
                    this.checkIndex(this.index + e)
                },
                checkIndex: function(e) {
                    if (this.length < this.zero + e || e < 0)
                        throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?")
                },
                setIndex: function(e) {
                    this.checkIndex(e),
                        this.index = e
                },
                skip: function(e) {
                    this.setIndex(this.index + e)
                },
                byteAt: function() {},
                readInt: function(e) {
                    var t,
                        r = 0;
                    for (this.checkOffset(e), t = this.index + e - 1; t >= this.index; t--)
                        r = (r << 8) + this.byteAt(t);
                    return this.index += e, r
                },
                readString: function(e) {
                    return n.transformTo("string", this.readData(e))
                },
                readData: function() {},
                lastIndexOfSignature: function() {},
                readAndCheckSignature: function() {},
                readDate: function() {
                    var e = this.readInt(4);
                    return new Date(Date.UTC(1980 + (e >> 25 & 127), (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (31 & e) << 1))
                }
            },
                t.exports = i
        }, {
            "../utils": 32
        }],
        19: [function(e, t, r) {
            "use strict";
            var n = e("./Uint8ArrayReader");
            function i(e) {
                n.call(this, e)
            }
            e("../utils").inherits(i, n),
                i.prototype.readData = function(e) {
                    this.checkOffset(e);
                    var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
                    return this.index += e, t
                },
                t.exports = i
        }, {
            "../utils": 32,
            "./Uint8ArrayReader": 21
        }],
        20: [function(e, t, r) {
            "use strict";
            var n = e("./DataReader");
            function i(e) {
                n.call(this, e)
            }
            e("../utils").inherits(i, n),
                i.prototype.byteAt = function(e) {
                    return this.data.charCodeAt(this.zero + e)
                },
                i.prototype.lastIndexOfSignature = function(e) {
                    return this.data.lastIndexOf(e) - this.zero
                },
                i.prototype.readAndCheckSignature = function(e) {
                    return e === this.readData(4)
                },
                i.prototype.readData = function(e) {
                    this.checkOffset(e);
                    var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
                    return this.index += e, t
                },
                t.exports = i
        }, {
            "../utils": 32,
            "./DataReader": 18
        }],
        21: [function(e, t, r) {
            "use strict";
            var n = e("./ArrayReader");
            function i(e) {
                n.call(this, e)
            }
            e("../utils").inherits(i, n),
                i.prototype.readData = function(e) {
                    if (this.checkOffset(e), 0 === e)
                        return new Uint8Array(0);
                    var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
                    return this.index += e, t
                },
                t.exports = i
        }, {
            "../utils": 32,
            "./ArrayReader": 17
        }],
        22: [function(e, t, r) {
            "use strict";
            var n = e("../utils"),
                i = e("../support"),
                s = e("./ArrayReader"),
                a = e("./StringReader"),
                o = e("./NodeBufferReader"),
                h = e("./Uint8ArrayReader");
            t.exports = function(e) {
                var t = n.getTypeOf(e);
                return n.checkSupport(t), "string" !== t || i.uint8array ? "nodebuffer" === t ? new o(e) : i.uint8array ? new h(n.transformTo("uint8array", e)) : new s(n.transformTo("array", e)) : new a(e)
            }
        }, {
            "../support": 30,
            "../utils": 32,
            "./ArrayReader": 17,
            "./NodeBufferReader": 19,
            "./StringReader": 20,
            "./Uint8ArrayReader": 21
        }],
        23: [function(e, t, r) {
            "use strict";
            r.LOCAL_FILE_HEADER = "PK",
                r.CENTRAL_FILE_HEADER = "PK",
                r.CENTRAL_DIRECTORY_END = "PK",
                r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK",
                r.ZIP64_CENTRAL_DIRECTORY_END = "PK",
                r.DATA_DESCRIPTOR = "PK\b"
        }, {}],
        24: [function(e, t, r) {
            "use strict";
            var n = e("./GenericWorker"),
                i = e("../utils");
            function s(e) {
                n.call(this, "ConvertWorker to " + e),
                    this.destType = e
            }
            i.inherits(s, n),
                s.prototype.processChunk = function(e) {
                    this.push({
                        data: i.transformTo(this.destType, e.data),
                        meta: e.meta
                    })
                },
                t.exports = s
        }, {
            "../utils": 32,
            "./GenericWorker": 28
        }],
        25: [function(e, t, r) {
            "use strict";
            var n = e("./GenericWorker"),
                i = e("../crc32");
            function s() {
                n.call(this, "Crc32Probe"),
                    this.withStreamInfo("crc32", 0)
            }
            e("../utils").inherits(s, n),
                s.prototype.processChunk = function(e) {
                    this.streamInfo.crc32 = i(e.data, this.streamInfo.crc32 || 0),
                        this.push(e)
                },
                t.exports = s
        }, {
            "../crc32": 4,
            "../utils": 32,
            "./GenericWorker": 28
        }],
        26: [function(e, t, r) {
            "use strict";
            var n = e("../utils"),
                i = e("./GenericWorker");
            function s(e) {
                i.call(this, "DataLengthProbe for " + e),
                    this.propName = e,
                    this.withStreamInfo(e, 0)
            }
            n.inherits(s, i),
                s.prototype.processChunk = function(e) {
                    if (e) {
                        var t = this.streamInfo[this.propName] || 0;
                        this.streamInfo[this.propName] = t + e.data.length
                    }
                    i.prototype.processChunk.call(this, e)
                },
                t.exports = s
        }, {
            "../utils": 32,
            "./GenericWorker": 28
        }],
        27: [function(e, t, r) {
            "use strict";
            var n = e("../utils"),
                i = e("./GenericWorker");
            function s(e) {
                i.call(this, "DataWorker");
                var t = this;
                this.dataIsReady = !1,
                    this.index = 0,
                    this.max = 0,
                    this.data = null,
                    this.type = "",
                    this._tickScheduled = !1,
                    e.then(function(e) {
                        t.dataIsReady = !0,
                            t.data = e,
                            t.max = e && e.length || 0,
                            t.type = n.getTypeOf(e),
                        t.isPaused || t._tickAndRepeat()
                    }, function(e) {
                        t.error(e)
                    })
            }
            n.inherits(s, i),
                s.prototype.cleanUp = function() {
                    i.prototype.cleanUp.call(this),
                        this.data = null
                },
                s.prototype.resume = function() {
                    return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, n.delay(this._tickAndRepeat, [], this)), !0)
                },
                s.prototype._tickAndRepeat = function() {
                    this._tickScheduled = !1,
                    this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0))
                },
                s.prototype._tick = function() {
                    if (this.isPaused || this.isFinished)
                        return !1;
                    var e = null,
                        t = Math.min(this.max, this.index + 16384);
                    if (this.index >= this.max)
                        return this.end();
                    switch (this.type) {
                        case "string":
                            e = this.data.substring(this.index, t);
                            break;
                        case "uint8array":
                            e = this.data.subarray(this.index, t);
                            break;
                        case "array":
                        case "nodebuffer":
                            e = this.data.slice(this.index, t)
                    }
                    return this.index = t, this.push({
                        data: e,
                        meta: {
                            percent: this.max ? this.index / this.max * 100 : 0
                        }
                    })
                },
                t.exports = s
        }, {
            "../utils": 32,
            "./GenericWorker": 28
        }],
        28: [function(e, t, r) {
            "use strict";
            function n(e) {
                this.name = e || "default",
                    this.streamInfo = {},
                    this.generatedError = null,
                    this.extraStreamInfo = {},
                    this.isPaused = !0,
                    this.isFinished = !1,
                    this.isLocked = !1,
                    this._listeners = {
                        data: [],
                        end: [],
                        error: []
                    },
                    this.previous = null
            }
            n.prototype = {
                push: function(e) {
                    this.emit("data", e)
                },
                end: function() {
                    if (this.isFinished)
                        return !1;
                    this.flush();
                    try {
                        this.emit("end"),
                            this.cleanUp(),
                            this.isFinished = !0
                    } catch (e) {
                        this.emit("error", e)
                    }
                    return !0
                },
                error: function(e) {
                    return !this.isFinished && (this.isPaused ? this.generatedError = e : (this.isFinished = !0, this.emit("error", e), this.previous && this.previous.error(e), this.cleanUp()), !0)
                },
                on: function(e, t) {
                    return this._listeners[e].push(t), this
                },
                cleanUp: function() {
                    this.streamInfo = this.generatedError = this.extraStreamInfo = null,
                        this._listeners = []
                },
                emit: function(e, t) {
                    if (this._listeners[e])
                        for (var r = 0; r < this._listeners[e].length; r++)
                            this._listeners[e][r].call(this, t)
                },
                pipe: function(e) {
                    return e.registerPrevious(this)
                },
                registerPrevious: function(e) {
                    if (this.isLocked)
                        throw new Error("The stream '" + this + "' has already been used.");
                    this.streamInfo = e.streamInfo,
                        this.mergeStreamInfo(),
                        this.previous = e;
                    var t = this;
                    return e.on("data", function(e) {
                        t.processChunk(e)
                    }), e.on("end", function() {
                        t.end()
                    }), e.on("error", function(e) {
                        t.error(e)
                    }), this
                },
                pause: function() {
                    return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0)
                },
                resume: function() {
                    if (!this.isPaused || this.isFinished)
                        return !1;
                    var e = this.isPaused = !1;
                    return this.generatedError && (this.error(this.generatedError), e = !0), this.previous && this.previous.resume(), !e
                },
                flush: function() {},
                processChunk: function(e) {
                    this.push(e)
                },
                withStreamInfo: function(e, t) {
                    return this.extraStreamInfo[e] = t, this.mergeStreamInfo(), this
                },
                mergeStreamInfo: function() {
                    for (var e in this.extraStreamInfo)
                        Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e) && (this.streamInfo[e] = this.extraStreamInfo[e])
                },
                lock: function() {
                    if (this.isLocked)
                        throw new Error("The stream '" + this + "' has already been used.");
                    this.isLocked = !0,
                    this.previous && this.previous.lock()
                },
                toString: function() {
                    var e = "Worker " + this.name;
                    return this.previous ? this.previous + " -> " + e : e
                }
            },
                t.exports = n
        }, {}],
        29: [function(e, t, r) {
            "use strict";
            var h = e("../utils"),
                i = e("./ConvertWorker"),
                s = e("./GenericWorker"),
                u = e("../base64"),
                n = e("../support"),
                a = e("../external"),
                o = null;
            if (n.nodestream)
                try {
                    o = e("../nodejs/NodejsStreamOutputAdapter")
                } catch (e) {}
            function l(e, o) {
                return new a.Promise(function(t, r) {
                    var n = [],
                        i = e._internalType,
                        s = e._outputType,
                        a = e._mimeType;
                    e.on("data", function(e, t) {
                        n.push(e),
                        o && o(t)
                    }).on("error", function(e) {
                        n = [],
                            r(e)
                    }).on("end", function() {
                        try {
                            var e = function(e, t, r) {
                                switch (e) {
                                    case "blob":
                                        return h.newBlob(h.transformTo("arraybuffer", t), r);
                                    case "base64":
                                        return u.encode(t);
                                    default:
                                        return h.transformTo(e, t)
                                }
                            }(s, function(e, t) {
                                var r,
                                    n = 0,
                                    i = null,
                                    s = 0;
                                for (r = 0; r < t.length; r++)
                                    s += t[r].length;
                                switch (e) {
                                    case "string":
                                        return t.join("");
                                    case "array":
                                        return Array.prototype.concat.apply([], t);
                                    case "uint8array":
                                        for (i = new Uint8Array(s), r = 0; r < t.length; r++)
                                            i.set(t[r], n),
                                                n += t[r].length;
                                        return i;
                                    case "nodebuffer":
                                        return Buffer.concat(t);
                                    default:
                                        throw new Error("concat : unsupported type '" + e + "'")
                                }
                            }(i, n), a);
                            t(e)
                        } catch (e) {
                            r(e)
                        }
                        n = []
                    }).resume()
                })
            }
            function f(e, t, r) {
                var n = t;
                switch (t) {
                    case "blob":
                    case "arraybuffer":
                        n = "uint8array";
                        break;
                    case "base64":
                        n = "string"
                }
                try {
                    this._internalType = n,
                        this._outputType = t,
                        this._mimeType = r,
                        h.checkSupport(n),
                        this._worker = e.pipe(new i(n)),
                        e.lock()
                } catch (e) {
                    this._worker = new s("error"),
                        this._worker.error(e)
                }
            }
            f.prototype = {
                accumulate: function(e) {
                    return l(this, e)
                },
                on: function(e, t) {
                    var r = this;
                    return "data" === e ? this._worker.on(e, function(e) {
                        t.call(r, e.data, e.meta)
                    }) : this._worker.on(e, function() {
                        h.delay(t, arguments, r)
                    }), this
                },
                resume: function() {
                    return h.delay(this._worker.resume, [], this._worker), this
                },
                pause: function() {
                    return this._worker.pause(), this
                },
                toNodejsStream: function(e) {
                    if (h.checkSupport("nodestream"), "nodebuffer" !== this._outputType)
                        throw new Error(this._outputType + " is not supported by this method");
                    return new o(this, {
                        objectMode: "nodebuffer" !== this._outputType
                    }, e)
                }
            },
                t.exports = f
        }, {
            "../base64": 1,
            "../external": 6,
            "../nodejs/NodejsStreamOutputAdapter": 13,
            "../support": 30,
            "../utils": 32,
            "./ConvertWorker": 24,
            "./GenericWorker": 28
        }],
        30: [function(e, t, r) {
            "use strict";
            if (r.base64 = !0, r.array = !0, r.string = !0, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer)
                r.blob = !1;
            else {
                var n = new ArrayBuffer(0);
                try {
                    r.blob = 0 === new Blob([n], {
                        type: "application/zip"
                    }).size
                } catch (e) {
                    try {
                        var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
                        i.append(n),
                            r.blob = 0 === i.getBlob("application/zip").size
                    } catch (e) {
                        r.blob = !1
                    }
                }
            }
            try {
                r.nodestream = !!e("readable-stream").Readable
            } catch (e) {
                r.nodestream = !1
            }
        }, {
            "readable-stream": 16
        }],
        31: [function(e, t, s) {
            "use strict";
            for (var o = e("./utils"), h = e("./support"), r = e("./nodejsUtils"), n = e("./stream/GenericWorker"), u = new Array(256), i = 0; i < 256; i++)
                u[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;
            u[254] = u[254] = 1;
            function a() {
                n.call(this, "utf-8 decode"),
                    this.leftOver = null
            }
            function l() {
                n.call(this, "utf-8 encode")
            }
            s.utf8encode = function(e) {
                return h.nodebuffer ? r.newBufferFrom(e, "utf-8") : function(e) {
                    var t,
                        r,
                        n,
                        i,
                        s,
                        a = e.length,
                        o = 0;
                    for (i = 0; i < a; i++)
                        55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++),
                            o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
                    for (t = h.uint8array ? new Uint8Array(o) : new Array(o), i = s = 0; s < o; i++)
                        55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++),
                            r < 128 ? t[s++] = r : (r < 2048 ? t[s++] = 192 | r >>> 6 : (r < 65536 ? t[s++] = 224 | r >>> 12 : (t[s++] = 240 | r >>> 18, t[s++] = 128 | r >>> 12 & 63), t[s++] = 128 | r >>> 6 & 63), t[s++] = 128 | 63 & r);
                    return t
                }(e)
            },
                s.utf8decode = function(e) {
                    return h.nodebuffer ? o.transformTo("nodebuffer", e).toString("utf-8") : function(e) {
                        var t,
                            r,
                            n,
                            i,
                            s = e.length,
                            a = new Array(2 * s);
                        for (t = r = 0; t < s;)
                            if ((n = e[t++]) < 128)
                                a[r++] = n;
                            else if (4 < (i = u[n]))
                                a[r++] = 65533,
                                    t += i - 1;
                            else {
                                for (n &= 2 === i ? 31 : 3 === i ? 15 : 7; 1 < i && t < s;)
                                    n = n << 6 | 63 & e[t++],
                                        i--;
                                1 < i ? a[r++] = 65533 : n < 65536 ? a[r++] = n : (n -= 65536, a[r++] = 55296 | n >> 10 & 1023, a[r++] = 56320 | 1023 & n)
                            }
                        return a.length !== r && (a.subarray ? a = a.subarray(0, r) : a.length = r), o.applyFromCharCode(a)
                    }(e = o.transformTo(h.uint8array ? "uint8array" : "array", e))
                },
                o.inherits(a, n),
                a.prototype.processChunk = function(e) {
                    var t = o.transformTo(h.uint8array ? "uint8array" : "array", e.data);
                    if (this.leftOver && this.leftOver.length) {
                        if (h.uint8array) {
                            var r = t;
                            (t = new Uint8Array(r.length + this.leftOver.length)).set(this.leftOver, 0),
                                t.set(r, this.leftOver.length)
                        } else
                            t = this.leftOver.concat(t);
                        this.leftOver = null
                    }
                    var n = function(e, t) {
                            var r;
                            for ((t = t || e.length) > e.length && (t = e.length), r = t - 1; 0 <= r && 128 == (192 & e[r]);)
                                r--;
                            return r < 0 ? t : 0 === r ? t : r + u[e[r]] > t ? r : t
                        }(t),
                        i = t;
                    n !== t.length && (h.uint8array ? (i = t.subarray(0, n), this.leftOver = t.subarray(n, t.length)) : (i = t.slice(0, n), this.leftOver = t.slice(n, t.length))),
                        this.push({
                            data: s.utf8decode(i),
                            meta: e.meta
                        })
                },
                a.prototype.flush = function() {
                    this.leftOver && this.leftOver.length && (this.push({
                        data: s.utf8decode(this.leftOver),
                        meta: {}
                    }), this.leftOver = null)
                },
                s.Utf8DecodeWorker = a,
                o.inherits(l, n),
                l.prototype.processChunk = function(e) {
                    this.push({
                        data: s.utf8encode(e.data),
                        meta: e.meta
                    })
                },
                s.Utf8EncodeWorker = l
        }, {
            "./nodejsUtils": 14,
            "./stream/GenericWorker": 28,
            "./support": 30,
            "./utils": 32
        }],
        32: [function(e, t, a) {
            "use strict";
            var o = e("./support"),
                h = e("./base64"),
                r = e("./nodejsUtils"),
                u = e("./external");
            function n(e) {
                return e
            }
            function l(e, t) {
                for (var r = 0; r < e.length; ++r)
                    t[r] = 255 & e.charCodeAt(r);
                return t
            }
            e("setimmediate"),
                a.newBlob = function(t, r) {
                    a.checkSupport("blob");
                    try {
                        return new Blob([t], {
                            type: r
                        })
                    } catch (e) {
                        try {
                            var n = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
                            return n.append(t), n.getBlob(r)
                        } catch (e) {
                            throw new Error("Bug : can't construct the Blob.")
                        }
                    }
                };
            var i = {
                stringifyByChunk: function(e, t, r) {
                    var n = [],
                        i = 0,
                        s = e.length;
                    if (s <= r)
                        return String.fromCharCode.apply(null, e);
                    for (; i < s;)
                        "array" === t || "nodebuffer" === t ? n.push(String.fromCharCode.apply(null, e.slice(i, Math.min(i + r, s)))) : n.push(String.fromCharCode.apply(null, e.subarray(i, Math.min(i + r, s)))),
                            i += r;
                    return n.join("")
                },
                stringifyByChar: function(e) {
                    for (var t = "", r = 0; r < e.length; r++)
                        t += String.fromCharCode(e[r]);
                    return t
                },
                applyCanBeUsed: {
                    uint8array: function() {
                        try {
                            return o.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length
                        } catch (e) {
                            return !1
                        }
                    }(),
                    nodebuffer: function() {
                        try {
                            return o.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length
                        } catch (e) {
                            return !1
                        }
                    }()
                }
            };
            function s(e) {
                var t = 65536,
                    r = a.getTypeOf(e),
                    n = !0;
                if ("uint8array" === r ? n = i.applyCanBeUsed.uint8array : "nodebuffer" === r && (n = i.applyCanBeUsed.nodebuffer), n)
                    for (; 1 < t;)
                        try {
                            return i.stringifyByChunk(e, r, t)
                        } catch (e) {
                            t = Math.floor(t / 2)
                        }
                return i.stringifyByChar(e)
            }
            function f(e, t) {
                for (var r = 0; r < e.length; r++)
                    t[r] = e[r];
                return t
            }
            a.applyFromCharCode = s;
            var c = {};
            c.string = {
                string: n,
                array: function(e) {
                    return l(e, new Array(e.length))
                },
                arraybuffer: function(e) {
                    return c.string.uint8array(e).buffer
                },
                uint8array: function(e) {
                    return l(e, new Uint8Array(e.length))
                },
                nodebuffer: function(e) {
                    return l(e, r.allocBuffer(e.length))
                }
            },
                c.array = {
                    string: s,
                    array: n,
                    arraybuffer: function(e) {
                        return new Uint8Array(e).buffer
                    },
                    uint8array: function(e) {
                        return new Uint8Array(e)
                    },
                    nodebuffer: function(e) {
                        return r.newBufferFrom(e)
                    }
                },
                c.arraybuffer = {
                    string: function(e) {
                        return s(new Uint8Array(e))
                    },
                    array: function(e) {
                        return f(new Uint8Array(e), new Array(e.byteLength))
                    },
                    arraybuffer: n,
                    uint8array: function(e) {
                        return new Uint8Array(e)
                    },
                    nodebuffer: function(e) {
                        return r.newBufferFrom(new Uint8Array(e))
                    }
                },
                c.uint8array = {
                    string: s,
                    array: function(e) {
                        return f(e, new Array(e.length))
                    },
                    arraybuffer: function(e) {
                        return e.buffer
                    },
                    uint8array: n,
                    nodebuffer: function(e) {
                        return r.newBufferFrom(e)
                    }
                },
                c.nodebuffer = {
                    string: s,
                    array: function(e) {
                        return f(e, new Array(e.length))
                    },
                    arraybuffer: function(e) {
                        return c.nodebuffer.uint8array(e).buffer
                    },
                    uint8array: function(e) {
                        return f(e, new Uint8Array(e.length))
                    },
                    nodebuffer: n
                },
                a.transformTo = function(e, t) {
                    if (t = t || "", !e)
                        return t;
                    a.checkSupport(e);
                    var r = a.getTypeOf(t);
                    return c[r][e](t)
                },
                a.resolve = function(e) {
                    for (var t = e.split("/"), r = [], n = 0; n < t.length; n++) {
                        var i = t[n];
                        "." === i || "" === i && 0 !== n && n !== t.length - 1 || (".." === i ? r.pop() : r.push(i))
                    }
                    return r.join("/")
                },
                a.getTypeOf = function(e) {
                    return "string" == typeof e ? "string" : "[object Array]" === Object.prototype.toString.call(e) ? "array" : o.nodebuffer && r.isBuffer(e) ? "nodebuffer" : o.uint8array && e instanceof Uint8Array ? "uint8array" : o.arraybuffer && e instanceof ArrayBuffer ? "arraybuffer" : void 0
                },
                a.checkSupport = function(e) {
                    if (!o[e.toLowerCase()])
                        throw new Error(e + " is not supported by this platform")
                },
                a.MAX_VALUE_16BITS = 65535,
                a.MAX_VALUE_32BITS = -1,
                a.pretty = function(e) {
                    var t,
                        r,
                        n = "";
                    for (r = 0; r < (e || "").length; r++)
                        n += "\\x" + ((t = e.charCodeAt(r)) < 16 ? "0" : "") + t.toString(16).toUpperCase();
                    return n
                },
                a.delay = function(e, t, r) {
                    setImmediate(function() {
                        e.apply(r || null, t || [])
                    })
                },
                a.inherits = function(e, t) {
                    function r() {}
                    r.prototype = t.prototype,
                        e.prototype = new r
                },
                a.extend = function() {
                    var e,
                        t,
                        r = {};
                    for (e = 0; e < arguments.length; e++)
                        for (t in arguments[e])
                            Object.prototype.hasOwnProperty.call(arguments[e], t) && void 0 === r[t] && (r[t] = arguments[e][t]);
                    return r
                },
                a.prepareContent = function(r, e, n, i, s) {
                    return u.Promise.resolve(e).then(function(n) {
                        return o.blob && (n instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n))) && "undefined" != typeof FileReader ? new u.Promise(function(t, r) {
                            var e = new FileReader;
                            e.onload = function(e) {
                                t(e.target.result)
                            },
                                e.onerror = function(e) {
                                    r(e.target.error)
                                },
                                e.readAsArrayBuffer(n)
                        }) : n
                    }).then(function(e) {
                        var t = a.getTypeOf(e);
                        return t ? ("arraybuffer" === t ? e = a.transformTo("uint8array", e) : "string" === t && (s ? e = h.decode(e) : n && !0 !== i && (e = function(e) {
                            return l(e, o.uint8array ? new Uint8Array(e.length) : new Array(e.length))
                        }(e))), e) : u.Promise.reject(new Error("Can't read the data of '" + r + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))
                    })
                }
        }, {
            "./base64": 1,
            "./external": 6,
            "./nodejsUtils": 14,
            "./support": 30,
            setimmediate: 54
        }],
        33: [function(e, t, r) {
            "use strict";
            var n = e("./reader/readerFor"),
                i = e("./utils"),
                s = e("./signature"),
                a = e("./zipEntry"),
                o = e("./support");
            function h(e) {
                this.files = [],
                    this.loadOptions = e
            }
            h.prototype = {
                checkSignature: function(e) {
                    if (!this.reader.readAndCheckSignature(e)) {
                        this.reader.index -= 4;
                        var t = this.reader.readString(4);
                        throw new Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t) + ", expected " + i.pretty(e) + ")")
                    }
                },
                isSignature: function(e, t) {
                    var r = this.reader.index;
                    this.reader.setIndex(e);
                    var n = this.reader.readString(4) === t;
                    return this.reader.setIndex(r), n
                },
                readBlockEndOfCentral: function() {
                    this.diskNumber = this.reader.readInt(2),
                        this.diskWithCentralDirStart = this.reader.readInt(2),
                        this.centralDirRecordsOnThisDisk = this.reader.readInt(2),
                        this.centralDirRecords = this.reader.readInt(2),
                        this.centralDirSize = this.reader.readInt(4),
                        this.centralDirOffset = this.reader.readInt(4),
                        this.zipCommentLength = this.reader.readInt(2);
                    var e = this.reader.readData(this.zipCommentLength),
                        t = o.uint8array ? "uint8array" : "array",
                        r = i.transformTo(t, e);
                    this.zipComment = this.loadOptions.decodeFileName(r)
                },
                readBlockZip64EndOfCentral: function() {
                    this.zip64EndOfCentralSize = this.reader.readInt(8),
                        this.reader.skip(4),
                        this.diskNumber = this.reader.readInt(4),
                        this.diskWithCentralDirStart = this.reader.readInt(4),
                        this.centralDirRecordsOnThisDisk = this.reader.readInt(8),
                        this.centralDirRecords = this.reader.readInt(8),
                        this.centralDirSize = this.reader.readInt(8),
                        this.centralDirOffset = this.reader.readInt(8),
                        this.zip64ExtensibleData = {};
                    for (var e, t, r, n = this.zip64EndOfCentralSize - 44; 0 < n;)
                        e = this.reader.readInt(2),
                            t = this.reader.readInt(4),
                            r = this.reader.readData(t),
                            this.zip64ExtensibleData[e] = {
                                id: e,
                                length: t,
                                value: r
                            }
                },
                readBlockZip64EndOfCentralLocator: function() {
                    if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount)
                        throw new Error("Multi-volumes zip are not supported")
                },
                readLocalFiles: function() {
                    var e,
                        t;
                    for (e = 0; e < this.files.length; e++)
                        t = this.files[e],
                            this.reader.setIndex(t.localHeaderOffset),
                            this.checkSignature(s.LOCAL_FILE_HEADER),
                            t.readLocalPart(this.reader),
                            t.handleUTF8(),
                            t.processAttributes()
                },
                readCentralDir: function() {
                    var e;
                    for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)
                        (e = new a({
                            zip64: this.zip64
                        }, this.loadOptions)).readCentralPart(this.reader),
                            this.files.push(e);
                    if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length)
                        throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length)
                },
                readEndOfCentral: function() {
                    var e = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
                    if (e < 0)
                        throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
                    this.reader.setIndex(e);
                    var t = e;
                    if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
                        if (this.zip64 = !0, (e = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0)
                            throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
                        if (this.reader.setIndex(e), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0))
                            throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                        this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),
                            this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),
                            this.readBlockZip64EndOfCentral()
                    }
                    var r = this.centralDirOffset + this.centralDirSize;
                    this.zip64 && (r += 20, r += 12 + this.zip64EndOfCentralSize);
                    var n = t - r;
                    if (0 < n)
                        this.isSignature(t, s.CENTRAL_FILE_HEADER) || (this.reader.zero = n);
                    else if (n < 0)
                        throw new Error("Corrupted zip: missing " + Math.abs(n) + " bytes.")
                },
                prepareReader: function(e) {
                    this.reader = n(e)
                },
                load: function(e) {
                    this.prepareReader(e),
                        this.readEndOfCentral(),
                        this.readCentralDir(),
                        this.readLocalFiles()
                }
            },
                t.exports = h
        }, {
            "./reader/readerFor": 22,
            "./signature": 23,
            "./support": 30,
            "./utils": 32,
            "./zipEntry": 34
        }],
        34: [function(e, t, r) {
            "use strict";
            var n = e("./reader/readerFor"),
                s = e("./utils"),
                i = e("./compressedObject"),
                a = e("./crc32"),
                o = e("./utf8"),
                h = e("./compressions"),
                u = e("./support");
            function l(e, t) {
                this.options = e,
                    this.loadOptions = t
            }
            l.prototype = {
                isEncrypted: function() {
                    return 1 == (1 & this.bitFlag)
                },
                useUTF8: function() {
                    return 2048 == (2048 & this.bitFlag)
                },
                readLocalPart: function(e) {
                    var t,
                        r;
                    if (e.skip(22), this.fileNameLength = e.readInt(2), r = e.readInt(2), this.fileName = e.readData(this.fileNameLength), e.skip(r), -1 === this.compressedSize || -1 === this.uncompressedSize)
                        throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
                    if (null === (t = function(e) {
                        for (var t in h)
                            if (Object.prototype.hasOwnProperty.call(h, t) && h[t].magic === e)
                                return h[t];
                        return null
                    }(this.compressionMethod)))
                        throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
                    this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, t, e.readData(this.compressedSize))
                },
                readCentralPart: function(e) {
                    this.versionMadeBy = e.readInt(2),
                        e.skip(2),
                        this.bitFlag = e.readInt(2),
                        this.compressionMethod = e.readString(2),
                        this.date = e.readDate(),
                        this.crc32 = e.readInt(4),
                        this.compressedSize = e.readInt(4),
                        this.uncompressedSize = e.readInt(4);
                    var t = e.readInt(2);
                    if (this.extraFieldsLength = e.readInt(2), this.fileCommentLength = e.readInt(2), this.diskNumberStart = e.readInt(2), this.internalFileAttributes = e.readInt(2), this.externalFileAttributes = e.readInt(4), this.localHeaderOffset = e.readInt(4), this.isEncrypted())
                        throw new Error("Encrypted zip are not supported");
                    e.skip(t),
                        this.readExtraFields(e),
                        this.parseZIP64ExtraField(e),
                        this.fileComment = e.readData(this.fileCommentLength)
                },
                processAttributes: function() {
                    this.unixPermissions = null,
                        this.dosPermissions = null;
                    var e = this.versionMadeBy >> 8;
                    this.dir = !!(16 & this.externalFileAttributes),
                    0 == e && (this.dosPermissions = 63 & this.externalFileAttributes),
                    3 == e && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535),
                    this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = !0)
                },
                parseZIP64ExtraField: function() {
                    if (this.extraFields[1]) {
                        var e = n(this.extraFields[1].value);
                        this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)),
                        this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)),
                        this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)),
                        this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4))
                    }
                },
                readExtraFields: function(e) {
                    var t,
                        r,
                        n,
                        i = e.index + this.extraFieldsLength;
                    for (this.extraFields || (this.extraFields = {}); e.index + 4 < i;)
                        t = e.readInt(2),
                            r = e.readInt(2),
                            n = e.readData(r),
                            this.extraFields[t] = {
                                id: t,
                                length: r,
                                value: n
                            };
                    e.setIndex(i)
                },
                handleUTF8: function() {
                    var e = u.uint8array ? "uint8array" : "array";
                    if (this.useUTF8())
                        this.fileNameStr = o.utf8decode(this.fileName),
                            this.fileCommentStr = o.utf8decode(this.fileComment);
                    else {
                        var t = this.findExtraFieldUnicodePath();
                        if (null !== t)
                            this.fileNameStr = t;
                        else {
                            var r = s.transformTo(e, this.fileName);
                            this.fileNameStr = this.loadOptions.decodeFileName(r)
                        }
                        var n = this.findExtraFieldUnicodeComment();
                        if (null !== n)
                            this.fileCommentStr = n;
                        else {
                            var i = s.transformTo(e, this.fileComment);
                            this.fileCommentStr = this.loadOptions.decodeFileName(i)
                        }
                    }
                },
                findExtraFieldUnicodePath: function() {
                    var e = this.extraFields[28789];
                    if (e) {
                        var t = n(e.value);
                        return 1 !== t.readInt(1) ? null : a(this.fileName) !== t.readInt(4) ? null : o.utf8decode(t.readData(e.length - 5))
                    }
                    return null
                },
                findExtraFieldUnicodeComment: function() {
                    var e = this.extraFields[25461];
                    if (e) {
                        var t = n(e.value);
                        return 1 !== t.readInt(1) ? null : a(this.fileComment) !== t.readInt(4) ? null : o.utf8decode(t.readData(e.length - 5))
                    }
                    return null
                }
            },
                t.exports = l
        }, {
            "./compressedObject": 2,
            "./compressions": 3,
            "./crc32": 4,
            "./reader/readerFor": 22,
            "./support": 30,
            "./utf8": 31,
            "./utils": 32
        }],
        35: [function(e, t, r) {
            "use strict";
            function n(e, t, r) {
                this.name = e,
                    this.dir = r.dir,
                    this.date = r.date,
                    this.comment = r.comment,
                    this.unixPermissions = r.unixPermissions,
                    this.dosPermissions = r.dosPermissions,
                    this._data = t,
                    this._dataBinary = r.binary,
                    this.options = {
                        compression: r.compression,
                        compressionOptions: r.compressionOptions
                    }
            }
            var s = e("./stream/StreamHelper"),
                i = e("./stream/DataWorker"),
                a = e("./utf8"),
                o = e("./compressedObject"),
                h = e("./stream/GenericWorker");
            n.prototype = {
                internalStream: function(e) {
                    var t = null,
                        r = "string";
                    try {
                        if (!e)
                            throw new Error("No output type specified.");
                        var n = "string" === (r = e.toLowerCase()) || "text" === r;
                        "binarystring" !== r && "text" !== r || (r = "string"),
                            t = this._decompressWorker();
                        var i = !this._dataBinary;
                        i && !n && (t = t.pipe(new a.Utf8EncodeWorker)),
                        !i && n && (t = t.pipe(new a.Utf8DecodeWorker))
                    } catch (e) {
                        (t = new h("error")).error(e)
                    }
                    return new s(t, r, "")
                },
                async: function(e, t) {
                    return this.internalStream(e).accumulate(t)
                },
                nodeStream: function(e, t) {
                    return this.internalStream(e || "nodebuffer").toNodejsStream(t)
                },
                _compressWorker: function(e, t) {
                    if (this._data instanceof o && this._data.compression.magic === e.magic)
                        return this._data.getCompressedWorker();
                    var r = this._decompressWorker();
                    return this._dataBinary || (r = r.pipe(new a.Utf8EncodeWorker)), o.createWorkerFrom(r, e, t)
                },
                _decompressWorker: function() {
                    return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new i(this._data)
                }
            };
            for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function() {
                throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
            }, f = 0; f < u.length; f++)
                n.prototype[u[f]] = l;
            t.exports = n
        }, {
            "./compressedObject": 2,
            "./stream/DataWorker": 27,
            "./stream/GenericWorker": 28,
            "./stream/StreamHelper": 29,
            "./utf8": 31
        }],
        36: [function(e, l, t) {
            (function(t) {
                "use strict";
                var r,
                    n,
                    e = t.MutationObserver || t.WebKitMutationObserver;
                if (e) {
                    var i = 0,
                        s = new e(u),
                        a = t.document.createTextNode("");
                    s.observe(a, {
                        characterData: !0
                    }),
                        r = function() {
                            a.data = i = ++i % 2
                        }
                } else if (t.setImmediate || void 0 === t.MessageChannel)
                    r = "document" in t && "onreadystatechange" in t.document.createElement("script") ? function() {
                        var e = t.document.createElement("script");
                        e.onreadystatechange = function() {
                            u(),
                                e.onreadystatechange = null,
                                e.parentNode.removeChild(e),
                                e = null
                        },
                            t.document.documentElement.appendChild(e)
                    } : function() {
                        setTimeout(u, 0)
                    };
                else {
                    var o = new t.MessageChannel;
                    o.port1.onmessage = u,
                        r = function() {
                            o.port2.postMessage(0)
                        }
                }
                var h = [];
                function u() {
                    var e,
                        t;
                    n = !0;
                    for (var r = h.length; r;) {
                        for (t = h, h = [], e = -1; ++e < r;)
                            t[e]();
                        r = h.length
                    }
                    n = !1
                }
                l.exports = function(e) {
                    1 !== h.push(e) || n || r()
                }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        37: [function(e, t, r) {
            "use strict";
            var i = e("immediate");
            function u() {}
            var l = {},
                s = ["REJECTED"],
                a = ["FULFILLED"],
                n = ["PENDING"];
            function o(e) {
                if ("function" != typeof e)
                    throw new TypeError("resolver must be a function");
                this.state = n,
                    this.queue = [],
                    this.outcome = void 0,
                e !== u && d(this, e)
            }
            function h(e, t, r) {
                this.promise = e,
                "function" == typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled),
                "function" == typeof r && (this.onRejected = r, this.callRejected = this.otherCallRejected)
            }
            function f(t, r, n) {
                i(function() {
                    var e;
                    try {
                        e = r(n)
                    } catch (e) {
                        return l.reject(t, e)
                    }
                    e === t ? l.reject(t, new TypeError("Cannot resolve promise with itself")) : l.resolve(t, e)
                })
            }
            function c(e) {
                var t = e && e.then;
                if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof t)
                    return function() {
                        t.apply(e, arguments)
                    }
            }
            function d(t, e) {
                var r = !1;
                function n(e) {
                    r || (r = !0, l.reject(t, e))
                }
                function i(e) {
                    r || (r = !0, l.resolve(t, e))
                }
                var s = p(function() {
                    e(i, n)
                });
                "error" === s.status && n(s.value)
            }
            function p(e, t) {
                var r = {};
                try {
                    r.value = e(t),
                        r.status = "success"
                } catch (e) {
                    r.status = "error",
                        r.value = e
                }
                return r
            }
            (t.exports = o).prototype.finally = function(t) {
                if ("function" != typeof t)
                    return this;
                var r = this.constructor;
                return this.then(function(e) {
                    return r.resolve(t()).then(function() {
                        return e
                    })
                }, function(e) {
                    return r.resolve(t()).then(function() {
                        throw e
                    })
                })
            },
                o.prototype.catch = function(e) {
                    return this.then(null, e)
                },
                o.prototype.then = function(e, t) {
                    if ("function" != typeof e && this.state === a || "function" != typeof t && this.state === s)
                        return this;
                    var r = new this.constructor(u);
                    this.state !== n ? f(r, this.state === a ? e : t, this.outcome) : this.queue.push(new h(r, e, t));
                    return r
                },
                h.prototype.callFulfilled = function(e) {
                    l.resolve(this.promise, e)
                },
                h.prototype.otherCallFulfilled = function(e) {
                    f(this.promise, this.onFulfilled, e)
                },
                h.prototype.callRejected = function(e) {
                    l.reject(this.promise, e)
                },
                h.prototype.otherCallRejected = function(e) {
                    f(this.promise, this.onRejected, e)
                },
                l.resolve = function(e, t) {
                    var r = p(c, t);
                    if ("error" === r.status)
                        return l.reject(e, r.value);
                    var n = r.value;
                    if (n)
                        d(e, n);
                    else {
                        e.state = a,
                            e.outcome = t;
                        for (var i = -1, s = e.queue.length; ++i < s;)
                            e.queue[i].callFulfilled(t)
                    }
                    return e
                },
                l.reject = function(e, t) {
                    e.state = s,
                        e.outcome = t;
                    for (var r = -1, n = e.queue.length; ++r < n;)
                        e.queue[r].callRejected(t);
                    return e
                },
                o.resolve = function(e) {
                    if (e instanceof this)
                        return e;
                    return l.resolve(new this(u), e)
                },
                o.reject = function(e) {
                    var t = new this(u);
                    return l.reject(t, e)
                },
                o.all = function(e) {
                    var r = this;
                    if ("[object Array]" !== Object.prototype.toString.call(e))
                        return this.reject(new TypeError("must be an array"));
                    var n = e.length,
                        i = !1;
                    if (!n)
                        return this.resolve([]);
                    var s = new Array(n),
                        a = 0,
                        t = -1,
                        o = new this(u);
                    for (; ++t < n;)
                        h(e[t], t);
                    return o;
                    function h(e, t) {
                        r.resolve(e).then(function(e) {
                            s[t] = e,
                            ++a !== n || i || (i = !0, l.resolve(o, s))
                        }, function(e) {
                            i || (i = !0, l.reject(o, e))
                        })
                    }
                },
                o.race = function(e) {
                    var t = this;
                    if ("[object Array]" !== Object.prototype.toString.call(e))
                        return this.reject(new TypeError("must be an array"));
                    var r = e.length,
                        n = !1;
                    if (!r)
                        return this.resolve([]);
                    var i = -1,
                        s = new this(u);
                    for (; ++i < r;)
                        a = e[i],
                            t.resolve(a).then(function(e) {
                                n || (n = !0, l.resolve(s, e))
                            }, function(e) {
                                n || (n = !0, l.reject(s, e))
                            });
                    var a;
                    return s
                }
        }, {
            immediate: 36
        }],
        38: [function(e, t, r) {
            "use strict";
            var n = {};
            (0, e("./lib/utils/common").assign)(n, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")),
                t.exports = n
        }, {
            "./lib/deflate": 39,
            "./lib/inflate": 40,
            "./lib/utils/common": 41,
            "./lib/zlib/constants": 44
        }],
        39: [function(e, t, r) {
            "use strict";
            var a = e("./zlib/deflate"),
                o = e("./utils/common"),
                h = e("./utils/strings"),
                i = e("./zlib/messages"),
                s = e("./zlib/zstream"),
                u = Object.prototype.toString,
                l = 0,
                f = -1,
                c = 0,
                d = 8;
            function p(e) {
                if (!(this instanceof p))
                    return new p(e);
                this.options = o.assign({
                    level: f,
                    method: d,
                    chunkSize: 16384,
                    windowBits: 15,
                    memLevel: 8,
                    strategy: c,
                    to: ""
                }, e || {});
                var t = this.options;
                t.raw && 0 < t.windowBits ? t.windowBits = -t.windowBits : t.gzip && 0 < t.windowBits && t.windowBits < 16 && (t.windowBits += 16),
                    this.err = 0,
                    this.msg = "",
                    this.ended = !1,
                    this.chunks = [],
                    this.strm = new s,
                    this.strm.avail_out = 0;
                var r = a.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
                if (r !== l)
                    throw new Error(i[r]);
                if (t.header && a.deflateSetHeader(this.strm, t.header), t.dictionary) {
                    var n;
                    if (n = "string" == typeof t.dictionary ? h.string2buf(t.dictionary) : "[object ArrayBuffer]" === u.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary, (r = a.deflateSetDictionary(this.strm, n)) !== l)
                        throw new Error(i[r]);
                    this._dict_set = !0
                }
            }
            function n(e, t) {
                var r = new p(t);
                if (r.push(e, !0), r.err)
                    throw r.msg || i[r.err];
                return r.result
            }
            p.prototype.push = function(e, t) {
                var r,
                    n,
                    i = this.strm,
                    s = this.options.chunkSize;
                if (this.ended)
                    return !1;
                n = t === ~~t ? t : !0 === t ? 4 : 0,
                    "string" == typeof e ? i.input = h.string2buf(e) : "[object ArrayBuffer]" === u.call(e) ? i.input = new Uint8Array(e) : i.input = e,
                    i.next_in = 0,
                    i.avail_in = i.input.length;
                do {
                    if (0 === i.avail_out && (i.output = new o.Buf8(s), i.next_out = 0, i.avail_out = s), 1 !== (r = a.deflate(i, n)) && r !== l)
                        return this.onEnd(r), !(this.ended = !0);
                    0 !== i.avail_out && (0 !== i.avail_in || 4 !== n && 2 !== n) || ("string" === this.options.to ? this.onData(h.buf2binstring(o.shrinkBuf(i.output, i.next_out))) : this.onData(o.shrinkBuf(i.output, i.next_out)))
                } while ((0 < i.avail_in || 0 === i.avail_out) && 1 !== r);
                return 4 === n ? (r = a.deflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === l) : 2 !== n || (this.onEnd(l), !(i.avail_out = 0))
            },
                p.prototype.onData = function(e) {
                    this.chunks.push(e)
                },
                p.prototype.onEnd = function(e) {
                    e === l && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)),
                        this.chunks = [],
                        this.err = e,
                        this.msg = this.strm.msg
                },
                r.Deflate = p,
                r.deflate = n,
                r.deflateRaw = function(e, t) {
                    return (t = t || {}).raw = !0, n(e, t)
                },
                r.gzip = function(e, t) {
                    return (t = t || {}).gzip = !0, n(e, t)
                }
        }, {
            "./utils/common": 41,
            "./utils/strings": 42,
            "./zlib/deflate": 46,
            "./zlib/messages": 51,
            "./zlib/zstream": 53
        }],
        40: [function(e, t, r) {
            "use strict";
            var c = e("./zlib/inflate"),
                d = e("./utils/common"),
                p = e("./utils/strings"),
                m = e("./zlib/constants"),
                n = e("./zlib/messages"),
                i = e("./zlib/zstream"),
                s = e("./zlib/gzheader"),
                _ = Object.prototype.toString;
            function a(e) {
                if (!(this instanceof a))
                    return new a(e);
                this.options = d.assign({
                    chunkSize: 16384,
                    windowBits: 0,
                    to: ""
                }, e || {});
                var t = this.options;
                t.raw && 0 <= t.windowBits && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)),
                !(0 <= t.windowBits && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32),
                15 < t.windowBits && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15),
                    this.err = 0,
                    this.msg = "",
                    this.ended = !1,
                    this.chunks = [],
                    this.strm = new i,
                    this.strm.avail_out = 0;
                var r = c.inflateInit2(this.strm, t.windowBits);
                if (r !== m.Z_OK)
                    throw new Error(n[r]);
                this.header = new s,
                    c.inflateGetHeader(this.strm, this.header)
            }
            function o(e, t) {
                var r = new a(t);
                if (r.push(e, !0), r.err)
                    throw r.msg || n[r.err];
                return r.result
            }
            a.prototype.push = function(e, t) {
                var r,
                    n,
                    i,
                    s,
                    a,
                    o,
                    h = this.strm,
                    u = this.options.chunkSize,
                    l = this.options.dictionary,
                    f = !1;
                if (this.ended)
                    return !1;
                n = t === ~~t ? t : !0 === t ? m.Z_FINISH : m.Z_NO_FLUSH,
                    "string" == typeof e ? h.input = p.binstring2buf(e) : "[object ArrayBuffer]" === _.call(e) ? h.input = new Uint8Array(e) : h.input = e,
                    h.next_in = 0,
                    h.avail_in = h.input.length;
                do {
                    if (0 === h.avail_out && (h.output = new d.Buf8(u), h.next_out = 0, h.avail_out = u), (r = c.inflate(h, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l && (o = "string" == typeof l ? p.string2buf(l) : "[object ArrayBuffer]" === _.call(l) ? new Uint8Array(l) : l, r = c.inflateSetDictionary(this.strm, o)), r === m.Z_BUF_ERROR && !0 === f && (r = m.Z_OK, f = !1), r !== m.Z_STREAM_END && r !== m.Z_OK)
                        return this.onEnd(r), !(this.ended = !0);
                    h.next_out && (0 !== h.avail_out && r !== m.Z_STREAM_END && (0 !== h.avail_in || n !== m.Z_FINISH && n !== m.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i = p.utf8border(h.output, h.next_out), s = h.next_out - i, a = p.buf2string(h.output, i), h.next_out = s, h.avail_out = u - s, s && d.arraySet(h.output, h.output, i, s, 0), this.onData(a)) : this.onData(d.shrinkBuf(h.output, h.next_out)))),
                    0 === h.avail_in && 0 === h.avail_out && (f = !0)
                } while ((0 < h.avail_in || 0 === h.avail_out) && r !== m.Z_STREAM_END);
                return r === m.Z_STREAM_END && (n = m.Z_FINISH), n === m.Z_FINISH ? (r = c.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === m.Z_OK) : n !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h.avail_out = 0))
            },
                a.prototype.onData = function(e) {
                    this.chunks.push(e)
                },
                a.prototype.onEnd = function(e) {
                    e === m.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = d.flattenChunks(this.chunks)),
                        this.chunks = [],
                        this.err = e,
                        this.msg = this.strm.msg
                },
                r.Inflate = a,
                r.inflate = o,
                r.inflateRaw = function(e, t) {
                    return (t = t || {}).raw = !0, o(e, t)
                },
                r.ungzip = o
        }, {
            "./utils/common": 41,
            "./utils/strings": 42,
            "./zlib/constants": 44,
            "./zlib/gzheader": 47,
            "./zlib/inflate": 49,
            "./zlib/messages": 51,
            "./zlib/zstream": 53
        }],
        41: [function(e, t, r) {
            "use strict";
            var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
            r.assign = function(e) {
                for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
                    var r = t.shift();
                    if (r) {
                        if ("object" != typeof r)
                            throw new TypeError(r + "must be non-object");
                        for (var n in r)
                            r.hasOwnProperty(n) && (e[n] = r[n])
                    }
                }
                return e
            },
                r.shrinkBuf = function(e, t) {
                    return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e)
                };
            var i = {
                    arraySet: function(e, t, r, n, i) {
                        if (t.subarray && e.subarray)
                            e.set(t.subarray(r, r + n), i);
                        else
                            for (var s = 0; s < n; s++)
                                e[i + s] = t[r + s]
                    },
                    flattenChunks: function(e) {
                        var t,
                            r,
                            n,
                            i,
                            s,
                            a;
                        for (t = n = 0, r = e.length; t < r; t++)
                            n += e[t].length;
                        for (a = new Uint8Array(n), t = i = 0, r = e.length; t < r; t++)
                            s = e[t],
                                a.set(s, i),
                                i += s.length;
                        return a
                    }
                },
                s = {
                    arraySet: function(e, t, r, n, i) {
                        for (var s = 0; s < n; s++)
                            e[i + s] = t[r + s]
                    },
                    flattenChunks: function(e) {
                        return [].concat.apply([], e)
                    }
                };
            r.setTyped = function(e) {
                e ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, i)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s))
            },
                r.setTyped(n)
        }, {}],
        42: [function(e, t, r) {
            "use strict";
            var h = e("./common"),
                i = !0,
                s = !0;
            try {
                String.fromCharCode.apply(null, [0])
            } catch (e) {
                i = !1
            }
            try {
                String.fromCharCode.apply(null, new Uint8Array(1))
            } catch (e) {
                s = !1
            }
            for (var u = new h.Buf8(256), n = 0; n < 256; n++)
                u[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;
            function l(e, t) {
                if (t < 65537 && (e.subarray && s || !e.subarray && i))
                    return String.fromCharCode.apply(null, h.shrinkBuf(e, t));
                for (var r = "", n = 0; n < t; n++)
                    r += String.fromCharCode(e[n]);
                return r
            }
            u[254] = u[254] = 1,
                r.string2buf = function(e) {
                    var t,
                        r,
                        n,
                        i,
                        s,
                        a = e.length,
                        o = 0;
                    for (i = 0; i < a; i++)
                        55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++),
                            o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
                    for (t = new h.Buf8(o), i = s = 0; s < o; i++)
                        55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++),
                            r < 128 ? t[s++] = r : (r < 2048 ? t[s++] = 192 | r >>> 6 : (r < 65536 ? t[s++] = 224 | r >>> 12 : (t[s++] = 240 | r >>> 18, t[s++] = 128 | r >>> 12 & 63), t[s++] = 128 | r >>> 6 & 63), t[s++] = 128 | 63 & r);
                    return t
                },
                r.buf2binstring = function(e) {
                    return l(e, e.length)
                },
                r.binstring2buf = function(e) {
                    for (var t = new h.Buf8(e.length), r = 0, n = t.length; r < n; r++)
                        t[r] = e.charCodeAt(r);
                    return t
                },
                r.buf2string = function(e, t) {
                    var r,
                        n,
                        i,
                        s,
                        a = t || e.length,
                        o = new Array(2 * a);
                    for (r = n = 0; r < a;)
                        if ((i = e[r++]) < 128)
                            o[n++] = i;
                        else if (4 < (s = u[i]))
                            o[n++] = 65533,
                                r += s - 1;
                        else {
                            for (i &= 2 === s ? 31 : 3 === s ? 15 : 7; 1 < s && r < a;)
                                i = i << 6 | 63 & e[r++],
                                    s--;
                            1 < s ? o[n++] = 65533 : i < 65536 ? o[n++] = i : (i -= 65536, o[n++] = 55296 | i >> 10 & 1023, o[n++] = 56320 | 1023 & i)
                        }
                    return l(o, n)
                },
                r.utf8border = function(e, t) {
                    var r;
                    for ((t = t || e.length) > e.length && (t = e.length), r = t - 1; 0 <= r && 128 == (192 & e[r]);)
                        r--;
                    return r < 0 ? t : 0 === r ? t : r + u[e[r]] > t ? r : t
                }
        }, {
            "./common": 41
        }],
        43: [function(e, t, r) {
            "use strict";
            t.exports = function(e, t, r, n) {
                for (var i = 65535 & e | 0, s = e >>> 16 & 65535 | 0, a = 0; 0 !== r;) {
                    for (r -= a = 2e3 < r ? 2e3 : r; s = s + (i = i + t[n++] | 0) | 0, --a;)
                        ;
                    i %= 65521,
                        s %= 65521
                }
                return i | s << 16 | 0
            }
        }, {}],
        44: [function(e, t, r) {
            "use strict";
            t.exports = {
                Z_NO_FLUSH: 0,
                Z_PARTIAL_FLUSH: 1,
                Z_SYNC_FLUSH: 2,
                Z_FULL_FLUSH: 3,
                Z_FINISH: 4,
                Z_BLOCK: 5,
                Z_TREES: 6,
                Z_OK: 0,
                Z_STREAM_END: 1,
                Z_NEED_DICT: 2,
                Z_ERRNO: -1,
                Z_STREAM_ERROR: -2,
                Z_DATA_ERROR: -3,
                Z_BUF_ERROR: -5,
                Z_NO_COMPRESSION: 0,
                Z_BEST_SPEED: 1,
                Z_BEST_COMPRESSION: 9,
                Z_DEFAULT_COMPRESSION: -1,
                Z_FILTERED: 1,
                Z_HUFFMAN_ONLY: 2,
                Z_RLE: 3,
                Z_FIXED: 4,
                Z_DEFAULT_STRATEGY: 0,
                Z_BINARY: 0,
                Z_TEXT: 1,
                Z_UNKNOWN: 2,
                Z_DEFLATED: 8
            }
        }, {}],
        45: [function(e, t, r) {
            "use strict";
            var o = function() {
                for (var e, t = [], r = 0; r < 256; r++) {
                    e = r;
                    for (var n = 0; n < 8; n++)
                        e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                    t[r] = e
                }
                return t
            }();
            t.exports = function(e, t, r, n) {
                var i = o,
                    s = n + r;
                e ^= -1;
                for (var a = n; a < s; a++)
                    e = e >>> 8 ^ i[255 & (e ^ t[a])];
                return -1 ^ e
            }
        }, {}],
        46: [function(e, t, r) {
            "use strict";
            var h,
                c = e("../utils/common"),
                u = e("./trees"),
                d = e("./adler32"),
                p = e("./crc32"),
                n = e("./messages"),
                l = 0,
                f = 4,
                m = 0,
                _ = -2,
                g = -1,
                b = 4,
                i = 2,
                v = 8,
                y = 9,
                s = 286,
                a = 30,
                o = 19,
                w = 2 * s + 1,
                k = 15,
                x = 3,
                S = 258,
                z = S + x + 1,
                C = 42,
                E = 113,
                A = 1,
                I = 2,
                O = 3,
                B = 4;
            function R(e, t) {
                return e.msg = n[t], t
            }
            function T(e) {
                return (e << 1) - (4 < e ? 9 : 0)
            }
            function D(e) {
                for (var t = e.length; 0 <= --t;)
                    e[t] = 0
            }
            function F(e) {
                var t = e.state,
                    r = t.pending;
                r > e.avail_out && (r = e.avail_out),
                0 !== r && (c.arraySet(e.output, t.pending_buf, t.pending_out, r, e.next_out), e.next_out += r, t.pending_out += r, e.total_out += r, e.avail_out -= r, t.pending -= r, 0 === t.pending && (t.pending_out = 0))
            }
            function N(e, t) {
                u._tr_flush_block(e, 0 <= e.block_start ? e.block_start : -1, e.strstart - e.block_start, t),
                    e.block_start = e.strstart,
                    F(e.strm)
            }
            function U(e, t) {
                e.pending_buf[e.pending++] = t
            }
            function P(e, t) {
                e.pending_buf[e.pending++] = t >>> 8 & 255,
                    e.pending_buf[e.pending++] = 255 & t
            }
            function L(e, t) {
                var r,
                    n,
                    i = e.max_chain_length,
                    s = e.strstart,
                    a = e.prev_length,
                    o = e.nice_match,
                    h = e.strstart > e.w_size - z ? e.strstart - (e.w_size - z) : 0,
                    u = e.window,
                    l = e.w_mask,
                    f = e.prev,
                    c = e.strstart + S,
                    d = u[s + a - 1],
                    p = u[s + a];
                e.prev_length >= e.good_match && (i >>= 2),
                o > e.lookahead && (o = e.lookahead);
                do {
                    if (u[(r = t) + a] === p && u[r + a - 1] === d && u[r] === u[s] && u[++r] === u[s + 1]) {
                        s += 2,
                            r++;
                        do {} while (u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && s < c);
                        if (n = S - (c - s), s = c - S, a < n) {
                            if (e.match_start = t, o <= (a = n))
                                break;
                            d = u[s + a - 1],
                                p = u[s + a]
                        }
                    }
                } while ((t = f[t & l]) > h && 0 != --i);
                return a <= e.lookahead ? a : e.lookahead
            }
            function j(e) {
                var t,
                    r,
                    n,
                    i,
                    s,
                    a,
                    o,
                    h,
                    u,
                    l,
                    f = e.w_size;
                do {
                    if (i = e.window_size - e.lookahead - e.strstart, e.strstart >= f + (f - z)) {
                        for (c.arraySet(e.window, e.window, f, f, 0), e.match_start -= f, e.strstart -= f, e.block_start -= f, t = r = e.hash_size; n = e.head[--t], e.head[t] = f <= n ? n - f : 0, --r;)
                            ;
                        for (t = r = f; n = e.prev[--t], e.prev[t] = f <= n ? n - f : 0, --r;)
                            ;
                        i += f
                    }
                    if (0 === e.strm.avail_in)
                        break;
                    if (a = e.strm, o = e.window, h = e.strstart + e.lookahead, u = i, l = void 0, l = a.avail_in, u < l && (l = u), r = 0 === l ? 0 : (a.avail_in -= l, c.arraySet(o, a.input, a.next_in, l, h), 1 === a.state.wrap ? a.adler = d(a.adler, o, l, h) : 2 === a.state.wrap && (a.adler = p(a.adler, o, l, h)), a.next_in += l, a.total_in += l, l), e.lookahead += r, e.lookahead + e.insert >= x)
                        for (s = e.strstart - e.insert, e.ins_h = e.window[s], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[s + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[s + x - 1]) & e.hash_mask, e.prev[s & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = s, s++, e.insert--, !(e.lookahead + e.insert < x));)
                            ;
                } while (e.lookahead < z && 0 !== e.strm.avail_in)
            }
            function Z(e, t) {
                for (var r, n;;) {
                    if (e.lookahead < z) {
                        if (j(e), e.lookahead < z && t === l)
                            return A;
                        if (0 === e.lookahead)
                            break
                    }
                    if (r = 0, e.lookahead >= x && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + x - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 !== r && e.strstart - r <= e.w_size - z && (e.match_length = L(e, r)), e.match_length >= x)
                        if (n = u._tr_tally(e, e.strstart - e.match_start, e.match_length - x), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= x) {
                            for (e.match_length--; e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + x - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart, 0 != --e.match_length;)
                                ;
                            e.strstart++
                        } else
                            e.strstart += e.match_length,
                                e.match_length = 0,
                                e.ins_h = e.window[e.strstart],
                                e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
                    else
                        n = u._tr_tally(e, 0, e.window[e.strstart]),
                            e.lookahead--,
                            e.strstart++;
                    if (n && (N(e, !1), 0 === e.strm.avail_out))
                        return A
                }
                return e.insert = e.strstart < x - 1 ? e.strstart : x - 1, t === f ? (N(e, !0), 0 === e.strm.avail_out ? O : B) : e.last_lit && (N(e, !1), 0 === e.strm.avail_out) ? A : I
            }
            function W(e, t) {
                for (var r, n, i;;) {
                    if (e.lookahead < z) {
                        if (j(e), e.lookahead < z && t === l)
                            return A;
                        if (0 === e.lookahead)
                            break
                    }
                    if (r = 0, e.lookahead >= x && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + x - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = x - 1, 0 !== r && e.prev_length < e.max_lazy_match && e.strstart - r <= e.w_size - z && (e.match_length = L(e, r), e.match_length <= 5 && (1 === e.strategy || e.match_length === x && 4096 < e.strstart - e.match_start) && (e.match_length = x - 1)), e.prev_length >= x && e.match_length <= e.prev_length) {
                        for (i = e.strstart + e.lookahead - x, n = u._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - x), e.lookahead -= e.prev_length - 1, e.prev_length -= 2; ++e.strstart <= i && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + x - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 != --e.prev_length;)
                            ;
                        if (e.match_available = 0, e.match_length = x - 1, e.strstart++, n && (N(e, !1), 0 === e.strm.avail_out))
                            return A
                    } else if (e.match_available) {
                        if ((n = u._tr_tally(e, 0, e.window[e.strstart - 1])) && N(e, !1), e.strstart++, e.lookahead--, 0 === e.strm.avail_out)
                            return A
                    } else
                        e.match_available = 1,
                            e.strstart++,
                            e.lookahead--
                }
                return e.match_available && (n = u._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < x - 1 ? e.strstart : x - 1, t === f ? (N(e, !0), 0 === e.strm.avail_out ? O : B) : e.last_lit && (N(e, !1), 0 === e.strm.avail_out) ? A : I
            }
            function M(e, t, r, n, i) {
                this.good_length = e,
                    this.max_lazy = t,
                    this.nice_length = r,
                    this.max_chain = n,
                    this.func = i
            }
            function H() {
                this.strm = null,
                    this.status = 0,
                    this.pending_buf = null,
                    this.pending_buf_size = 0,
                    this.pending_out = 0,
                    this.pending = 0,
                    this.wrap = 0,
                    this.gzhead = null,
                    this.gzindex = 0,
                    this.method = v,
                    this.last_flush = -1,
                    this.w_size = 0,
                    this.w_bits = 0,
                    this.w_mask = 0,
                    this.window = null,
                    this.window_size = 0,
                    this.prev = null,
                    this.head = null,
                    this.ins_h = 0,
                    this.hash_size = 0,
                    this.hash_bits = 0,
                    this.hash_mask = 0,
                    this.hash_shift = 0,
                    this.block_start = 0,
                    this.match_length = 0,
                    this.prev_match = 0,
                    this.match_available = 0,
                    this.strstart = 0,
                    this.match_start = 0,
                    this.lookahead = 0,
                    this.prev_length = 0,
                    this.max_chain_length = 0,
                    this.max_lazy_match = 0,
                    this.level = 0,
                    this.strategy = 0,
                    this.good_match = 0,
                    this.nice_match = 0,
                    this.dyn_ltree = new c.Buf16(2 * w),
                    this.dyn_dtree = new c.Buf16(2 * (2 * a + 1)),
                    this.bl_tree = new c.Buf16(2 * (2 * o + 1)),
                    D(this.dyn_ltree),
                    D(this.dyn_dtree),
                    D(this.bl_tree),
                    this.l_desc = null,
                    this.d_desc = null,
                    this.bl_desc = null,
                    this.bl_count = new c.Buf16(k + 1),
                    this.heap = new c.Buf16(2 * s + 1),
                    D(this.heap),
                    this.heap_len = 0,
                    this.heap_max = 0,
                    this.depth = new c.Buf16(2 * s + 1),
                    D(this.depth),
                    this.l_buf = 0,
                    this.lit_bufsize = 0,
                    this.last_lit = 0,
                    this.d_buf = 0,
                    this.opt_len = 0,
                    this.static_len = 0,
                    this.matches = 0,
                    this.insert = 0,
                    this.bi_buf = 0,
                    this.bi_valid = 0
            }
            function G(e) {
                var t;
                return e && e.state ? (e.total_in = e.total_out = 0, e.data_type = i, (t = e.state).pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? C : E, e.adler = 2 === t.wrap ? 0 : 1, t.last_flush = l, u._tr_init(t), m) : R(e, _)
            }
            function K(e) {
                var t = G(e);
                return t === m && function(e) {
                    e.window_size = 2 * e.w_size,
                        D(e.head),
                        e.max_lazy_match = h[e.level].max_lazy,
                        e.good_match = h[e.level].good_length,
                        e.nice_match = h[e.level].nice_length,
                        e.max_chain_length = h[e.level].max_chain,
                        e.strstart = 0,
                        e.block_start = 0,
                        e.lookahead = 0,
                        e.insert = 0,
                        e.match_length = e.prev_length = x - 1,
                        e.match_available = 0,
                        e.ins_h = 0
                }(e.state), t
            }
            function Y(e, t, r, n, i, s) {
                if (!e)
                    return _;
                var a = 1;
                if (t === g && (t = 6), n < 0 ? (a = 0, n = -n) : 15 < n && (a = 2, n -= 16), i < 1 || y < i || r !== v || n < 8 || 15 < n || t < 0 || 9 < t || s < 0 || b < s)
                    return R(e, _);
                8 === n && (n = 9);
                var o = new H;
                return (e.state = o).strm = e, o.wrap = a, o.gzhead = null, o.w_bits = n, o.w_size = 1 << o.w_bits, o.w_mask = o.w_size - 1, o.hash_bits = i + 7, o.hash_size = 1 << o.hash_bits, o.hash_mask = o.hash_size - 1, o.hash_shift = ~~((o.hash_bits + x - 1) / x), o.window = new c.Buf8(2 * o.w_size), o.head = new c.Buf16(o.hash_size), o.prev = new c.Buf16(o.w_size), o.lit_bufsize = 1 << i + 6, o.pending_buf_size = 4 * o.lit_bufsize, o.pending_buf = new c.Buf8(o.pending_buf_size), o.d_buf = 1 * o.lit_bufsize, o.l_buf = 3 * o.lit_bufsize, o.level = t, o.strategy = s, o.method = r, K(e)
            }
            h = [new M(0, 0, 0, 0, function(e, t) {
                var r = 65535;
                for (r > e.pending_buf_size - 5 && (r = e.pending_buf_size - 5);;) {
                    if (e.lookahead <= 1) {
                        if (j(e), 0 === e.lookahead && t === l)
                            return A;
                        if (0 === e.lookahead)
                            break
                    }
                    e.strstart += e.lookahead,
                        e.lookahead = 0;
                    var n = e.block_start + r;
                    if ((0 === e.strstart || e.strstart >= n) && (e.lookahead = e.strstart - n, e.strstart = n, N(e, !1), 0 === e.strm.avail_out))
                        return A;
                    if (e.strstart - e.block_start >= e.w_size - z && (N(e, !1), 0 === e.strm.avail_out))
                        return A
                }
                return e.insert = 0, t === f ? (N(e, !0), 0 === e.strm.avail_out ? O : B) : (e.strstart > e.block_start && (N(e, !1), e.strm.avail_out), A)
            }), new M(4, 4, 8, 4, Z), new M(4, 5, 16, 8, Z), new M(4, 6, 32, 32, Z), new M(4, 4, 16, 16, W), new M(8, 16, 32, 32, W), new M(8, 16, 128, 128, W), new M(8, 32, 128, 256, W), new M(32, 128, 258, 1024, W), new M(32, 258, 258, 4096, W)],
                r.deflateInit = function(e, t) {
                    return Y(e, t, v, 15, 8, 0)
                },
                r.deflateInit2 = Y,
                r.deflateReset = K,
                r.deflateResetKeep = G,
                r.deflateSetHeader = function(e, t) {
                    return e && e.state ? 2 !== e.state.wrap ? _ : (e.state.gzhead = t, m) : _
                },
                r.deflate = function(e, t) {
                    var r,
                        n,
                        i,
                        s;
                    if (!e || !e.state || 5 < t || t < 0)
                        return e ? R(e, _) : _;
                    if (n = e.state, !e.output || !e.input && 0 !== e.avail_in || 666 === n.status && t !== f)
                        return R(e, 0 === e.avail_out ? -5 : _);
                    if (n.strm = e, r = n.last_flush, n.last_flush = t, n.status === C)
                        if (2 === n.wrap)
                            e.adler = 0,
                                U(n, 31),
                                U(n, 139),
                                U(n, 8),
                                n.gzhead ? (U(n, (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)), U(n, 255 & n.gzhead.time), U(n, n.gzhead.time >> 8 & 255), U(n, n.gzhead.time >> 16 & 255), U(n, n.gzhead.time >> 24 & 255), U(n, 9 === n.level ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), U(n, 255 & n.gzhead.os), n.gzhead.extra && n.gzhead.extra.length && (U(n, 255 & n.gzhead.extra.length), U(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (e.adler = p(e.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = 69) : (U(n, 0), U(n, 0), U(n, 0), U(n, 0), U(n, 0), U(n, 9 === n.level ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), U(n, 3), n.status = E);
                        else {
                            var a = v + (n.w_bits - 8 << 4) << 8;
                            a |= (2 <= n.strategy || n.level < 2 ? 0 : n.level < 6 ? 1 : 6 === n.level ? 2 : 3) << 6,
                            0 !== n.strstart && (a |= 32),
                                a += 31 - a % 31,
                                n.status = E,
                                P(n, a),
                            0 !== n.strstart && (P(n, e.adler >>> 16), P(n, 65535 & e.adler)),
                                e.adler = 1
                        }
                    if (69 === n.status)
                        if (n.gzhead.extra) {
                            for (i = n.pending; n.gzindex < (65535 & n.gzhead.extra.length) && (n.pending !== n.pending_buf_size || (n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), F(e), i = n.pending, n.pending !== n.pending_buf_size));)
                                U(n, 255 & n.gzhead.extra[n.gzindex]),
                                    n.gzindex++;
                            n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)),
                            n.gzindex === n.gzhead.extra.length && (n.gzindex = 0, n.status = 73)
                        } else
                            n.status = 73;
                    if (73 === n.status)
                        if (n.gzhead.name) {
                            i = n.pending;
                            do {
                                if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), F(e), i = n.pending, n.pending === n.pending_buf_size)) {
                                    s = 1;
                                    break
                                }
                                s = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0,
                                    U(n, s)
                            } while (0 !== s);
                            n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)),
                            0 === s && (n.gzindex = 0, n.status = 91)
                        } else
                            n.status = 91;
                    if (91 === n.status)
                        if (n.gzhead.comment) {
                            i = n.pending;
                            do {
                                if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), F(e), i = n.pending, n.pending === n.pending_buf_size)) {
                                    s = 1;
                                    break
                                }
                                s = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0,
                                    U(n, s)
                            } while (0 !== s);
                            n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)),
                            0 === s && (n.status = 103)
                        } else
                            n.status = 103;
                    if (103 === n.status && (n.gzhead.hcrc ? (n.pending + 2 > n.pending_buf_size && F(e), n.pending + 2 <= n.pending_buf_size && (U(n, 255 & e.adler), U(n, e.adler >> 8 & 255), e.adler = 0, n.status = E)) : n.status = E), 0 !== n.pending) {
                        if (F(e), 0 === e.avail_out)
                            return n.last_flush = -1, m
                    } else if (0 === e.avail_in && T(t) <= T(r) && t !== f)
                        return R(e, -5);
                    if (666 === n.status && 0 !== e.avail_in)
                        return R(e, -5);
                    if (0 !== e.avail_in || 0 !== n.lookahead || t !== l && 666 !== n.status) {
                        var o = 2 === n.strategy ? function(e, t) {
                            for (var r;;) {
                                if (0 === e.lookahead && (j(e), 0 === e.lookahead)) {
                                    if (t === l)
                                        return A;
                                    break
                                }
                                if (e.match_length = 0, r = u._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, r && (N(e, !1), 0 === e.strm.avail_out))
                                    return A
                            }
                            return e.insert = 0, t === f ? (N(e, !0), 0 === e.strm.avail_out ? O : B) : e.last_lit && (N(e, !1), 0 === e.strm.avail_out) ? A : I
                        }(n, t) : 3 === n.strategy ? function(e, t) {
                            for (var r, n, i, s, a = e.window;;) {
                                if (e.lookahead <= S) {
                                    if (j(e), e.lookahead <= S && t === l)
                                        return A;
                                    if (0 === e.lookahead)
                                        break
                                }
                                if (e.match_length = 0, e.lookahead >= x && 0 < e.strstart && (n = a[i = e.strstart - 1]) === a[++i] && n === a[++i] && n === a[++i]) {
                                    s = e.strstart + S;
                                    do {} while (n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && i < s);
                                    e.match_length = S - (s - i),
                                    e.match_length > e.lookahead && (e.match_length = e.lookahead)
                                }
                                if (e.match_length >= x ? (r = u._tr_tally(e, 1, e.match_length - x), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (r = u._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), r && (N(e, !1), 0 === e.strm.avail_out))
                                    return A
                            }
                            return e.insert = 0, t === f ? (N(e, !0), 0 === e.strm.avail_out ? O : B) : e.last_lit && (N(e, !1), 0 === e.strm.avail_out) ? A : I
                        }(n, t) : h[n.level].func(n, t);
                        if (o !== O && o !== B || (n.status = 666), o === A || o === O)
                            return 0 === e.avail_out && (n.last_flush = -1), m;
                        if (o === I && (1 === t ? u._tr_align(n) : 5 !== t && (u._tr_stored_block(n, 0, 0, !1), 3 === t && (D(n.head), 0 === n.lookahead && (n.strstart = 0, n.block_start = 0, n.insert = 0))), F(e), 0 === e.avail_out))
                            return n.last_flush = -1, m
                    }
                    return t !== f ? m : n.wrap <= 0 ? 1 : (2 === n.wrap ? (U(n, 255 & e.adler), U(n, e.adler >> 8 & 255), U(n, e.adler >> 16 & 255), U(n, e.adler >> 24 & 255), U(n, 255 & e.total_in), U(n, e.total_in >> 8 & 255), U(n, e.total_in >> 16 & 255), U(n, e.total_in >> 24 & 255)) : (P(n, e.adler >>> 16), P(n, 65535 & e.adler)), F(e), 0 < n.wrap && (n.wrap = -n.wrap), 0 !== n.pending ? m : 1)
                },
                r.deflateEnd = function(e) {
                    var t;
                    return e && e.state ? (t = e.state.status) !== C && 69 !== t && 73 !== t && 91 !== t && 103 !== t && t !== E && 666 !== t ? R(e, _) : (e.state = null, t === E ? R(e, -3) : m) : _
                },
                r.deflateSetDictionary = function(e, t) {
                    var r,
                        n,
                        i,
                        s,
                        a,
                        o,
                        h,
                        u,
                        l = t.length;
                    if (!e || !e.state)
                        return _;
                    if (2 === (s = (r = e.state).wrap) || 1 === s && r.status !== C || r.lookahead)
                        return _;
                    for (1 === s && (e.adler = d(e.adler, t, l, 0)), r.wrap = 0, l >= r.w_size && (0 === s && (D(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0), u = new c.Buf8(r.w_size), c.arraySet(u, t, l - r.w_size, r.w_size, 0), t = u, l = r.w_size), a = e.avail_in, o = e.next_in, h = e.input, e.avail_in = l, e.next_in = 0, e.input = t, j(r); r.lookahead >= x;) {
                        for (n = r.strstart, i = r.lookahead - (x - 1); r.ins_h = (r.ins_h << r.hash_shift ^ r.window[n + x - 1]) & r.hash_mask, r.prev[n & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = n, n++, --i;)
                            ;
                        r.strstart = n,
                            r.lookahead = x - 1,
                            j(r)
                    }
                    return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = x - 1, r.match_available = 0, e.next_in = o, e.input = h, e.avail_in = a, r.wrap = s, m
                },
                r.deflateInfo = "pako deflate (from Nodeca project)"
        }, {
            "../utils/common": 41,
            "./adler32": 43,
            "./crc32": 45,
            "./messages": 51,
            "./trees": 52
        }],
        47: [function(e, t, r) {
            "use strict";
            t.exports = function() {
                this.text = 0,
                    this.time = 0,
                    this.xflags = 0,
                    this.os = 0,
                    this.extra = null,
                    this.extra_len = 0,
                    this.name = "",
                    this.comment = "",
                    this.hcrc = 0,
                    this.done = !1
            }
        }, {}],
        48: [function(e, t, r) {
            "use strict";
            t.exports = function(e, t) {
                var r,
                    n,
                    i,
                    s,
                    a,
                    o,
                    h,
                    u,
                    l,
                    f,
                    c,
                    d,
                    p,
                    m,
                    _,
                    g,
                    b,
                    v,
                    y,
                    w,
                    k,
                    x,
                    S,
                    z,
                    C;
                r = e.state,
                    n = e.next_in,
                    z = e.input,
                    i = n + (e.avail_in - 5),
                    s = e.next_out,
                    C = e.output,
                    a = s - (t - e.avail_out),
                    o = s + (e.avail_out - 257),
                    h = r.dmax,
                    u = r.wsize,
                    l = r.whave,
                    f = r.wnext,
                    c = r.window,
                    d = r.hold,
                    p = r.bits,
                    m = r.lencode,
                    _ = r.distcode,
                    g = (1 << r.lenbits) - 1,
                    b = (1 << r.distbits) - 1;
                e:
                    do {
                        p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8),
                            v = m[d & g];
                        t:
                            for (;;) {
                                if (d >>>= y = v >>> 24, p -= y, 0 === (y = v >>> 16 & 255))
                                    C[s++] = 65535 & v;
                                else {
                                    if (!(16 & y)) {
                                        if (0 == (64 & y)) {
                                            v = m[(65535 & v) + (d & (1 << y) - 1)];
                                            continue t
                                        }
                                        if (32 & y) {
                                            r.mode = 12;
                                            break e
                                        }
                                        e.msg = "invalid literal/length code",
                                            r.mode = 30;
                                        break e
                                    }
                                    w = 65535 & v,
                                    (y &= 15) && (p < y && (d += z[n++] << p, p += 8), w += d & (1 << y) - 1, d >>>= y, p -= y),
                                    p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8),
                                        v = _[d & b];
                                    r:
                                        for (;;) {
                                            if (d >>>= y = v >>> 24, p -= y, !(16 & (y = v >>> 16 & 255))) {
                                                if (0 == (64 & y)) {
                                                    v = _[(65535 & v) + (d & (1 << y) - 1)];
                                                    continue r
                                                }
                                                e.msg = "invalid distance code",
                                                    r.mode = 30;
                                                break e
                                            }
                                            if (k = 65535 & v, p < (y &= 15) && (d += z[n++] << p, (p += 8) < y && (d += z[n++] << p, p += 8)), h < (k += d & (1 << y) - 1)) {
                                                e.msg = "invalid distance too far back",
                                                    r.mode = 30;
                                                break e
                                            }
                                            if (d >>>= y, p -= y, (y = s - a) < k) {
                                                if (l < (y = k - y) && r.sane) {
                                                    e.msg = "invalid distance too far back",
                                                        r.mode = 30;
                                                    break e
                                                }
                                                if (S = c, (x = 0) === f) {
                                                    if (x += u - y, y < w) {
                                                        for (w -= y; C[s++] = c[x++], --y;)
                                                            ;
                                                        x = s - k,
                                                            S = C
                                                    }
                                                } else if (f < y) {
                                                    if (x += u + f - y, (y -= f) < w) {
                                                        for (w -= y; C[s++] = c[x++], --y;)
                                                            ;
                                                        if (x = 0, f < w) {
                                                            for (w -= y = f; C[s++] = c[x++], --y;)
                                                                ;
                                                            x = s - k,
                                                                S = C
                                                        }
                                                    }
                                                } else if (x += f - y, y < w) {
                                                    for (w -= y; C[s++] = c[x++], --y;)
                                                        ;
                                                    x = s - k,
                                                        S = C
                                                }
                                                for (; 2 < w;)
                                                    C[s++] = S[x++],
                                                        C[s++] = S[x++],
                                                        C[s++] = S[x++],
                                                        w -= 3;
                                                w && (C[s++] = S[x++], 1 < w && (C[s++] = S[x++]))
                                            } else {
                                                for (x = s - k; C[s++] = C[x++], C[s++] = C[x++], C[s++] = C[x++], 2 < (w -= 3);)
                                                    ;
                                                w && (C[s++] = C[x++], 1 < w && (C[s++] = C[x++]))
                                            }
                                            break
                                        }
                                }
                                break
                            }
                    } while (n < i && s < o);
                n -= w = p >> 3,
                    d &= (1 << (p -= w << 3)) - 1,
                    e.next_in = n,
                    e.next_out = s,
                    e.avail_in = n < i ? i - n + 5 : 5 - (n - i),
                    e.avail_out = s < o ? o - s + 257 : 257 - (s - o),
                    r.hold = d,
                    r.bits = p
            }
        }, {}],
        49: [function(e, t, r) {
            "use strict";
            var I = e("../utils/common"),
                O = e("./adler32"),
                B = e("./crc32"),
                R = e("./inffast"),
                T = e("./inftrees"),
                D = 1,
                F = 2,
                N = 0,
                U = -2,
                P = 1,
                n = 852,
                i = 592;
            function L(e) {
                return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
            }
            function s() {
                this.mode = 0,
                    this.last = !1,
                    this.wrap = 0,
                    this.havedict = !1,
                    this.flags = 0,
                    this.dmax = 0,
                    this.check = 0,
                    this.total = 0,
                    this.head = null,
                    this.wbits = 0,
                    this.wsize = 0,
                    this.whave = 0,
                    this.wnext = 0,
                    this.window = null,
                    this.hold = 0,
                    this.bits = 0,
                    this.length = 0,
                    this.offset = 0,
                    this.extra = 0,
                    this.lencode = null,
                    this.distcode = null,
                    this.lenbits = 0,
                    this.distbits = 0,
                    this.ncode = 0,
                    this.nlen = 0,
                    this.ndist = 0,
                    this.have = 0,
                    this.next = null,
                    this.lens = new I.Buf16(320),
                    this.work = new I.Buf16(288),
                    this.lendyn = null,
                    this.distdyn = null,
                    this.sane = 0,
                    this.back = 0,
                    this.was = 0
            }
            function a(e) {
                var t;
                return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = P, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new I.Buf32(n), t.distcode = t.distdyn = new I.Buf32(i), t.sane = 1, t.back = -1, N) : U
            }
            function o(e) {
                var t;
                return e && e.state ? ((t = e.state).wsize = 0, t.whave = 0, t.wnext = 0, a(e)) : U
            }
            function h(e, t) {
                var r,
                    n;
                return e && e.state ? (n = e.state, t < 0 ? (r = 0, t = -t) : (r = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || 15 < t) ? U : (null !== n.window && n.wbits !== t && (n.window = null), n.wrap = r, n.wbits = t, o(e))) : U
            }
            function u(e, t) {
                var r,
                    n;
                return e ? (n = new s, (e.state = n).window = null, (r = h(e, t)) !== N && (e.state = null), r) : U
            }
            var l,
                f,
                c = !0;
            function j(e) {
                if (c) {
                    var t;
                    for (l = new I.Buf32(512), f = new I.Buf32(32), t = 0; t < 144;)
                        e.lens[t++] = 8;
                    for (; t < 256;)
                        e.lens[t++] = 9;
                    for (; t < 280;)
                        e.lens[t++] = 7;
                    for (; t < 288;)
                        e.lens[t++] = 8;
                    for (T(D, e.lens, 0, 288, l, 0, e.work, {
                        bits: 9
                    }), t = 0; t < 32;)
                        e.lens[t++] = 5;
                    T(F, e.lens, 0, 32, f, 0, e.work, {
                        bits: 5
                    }),
                        c = !1
                }
                e.lencode = l,
                    e.lenbits = 9,
                    e.distcode = f,
                    e.distbits = 5
            }
            function Z(e, t, r, n) {
                var i,
                    s = e.state;
                return null === s.window && (s.wsize = 1 << s.wbits, s.wnext = 0, s.whave = 0, s.window = new I.Buf8(s.wsize)), n >= s.wsize ? (I.arraySet(s.window, t, r - s.wsize, s.wsize, 0), s.wnext = 0, s.whave = s.wsize) : (n < (i = s.wsize - s.wnext) && (i = n), I.arraySet(s.window, t, r - n, i, s.wnext), (n -= i) ? (I.arraySet(s.window, t, r - n, n, 0), s.wnext = n, s.whave = s.wsize) : (s.wnext += i, s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += i))), 0
            }
            r.inflateReset = o,
                r.inflateReset2 = h,
                r.inflateResetKeep = a,
                r.inflateInit = function(e) {
                    return u(e, 15)
                },
                r.inflateInit2 = u,
                r.inflate = function(e, t) {
                    var r,
                        n,
                        i,
                        s,
                        a,
                        o,
                        h,
                        u,
                        l,
                        f,
                        c,
                        d,
                        p,
                        m,
                        _,
                        g,
                        b,
                        v,
                        y,
                        w,
                        k,
                        x,
                        S,
                        z,
                        C = 0,
                        E = new I.Buf8(4),
                        A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                    if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in)
                        return U;
                    12 === (r = e.state).mode && (r.mode = 13),
                        a = e.next_out,
                        i = e.output,
                        h = e.avail_out,
                        s = e.next_in,
                        n = e.input,
                        o = e.avail_in,
                        u = r.hold,
                        l = r.bits,
                        f = o,
                        c = h,
                        x = N;
                    e:
                        for (;;)
                            switch (r.mode) {
                                case P:
                                    if (0 === r.wrap) {
                                        r.mode = 13;
                                        break
                                    }
                                    for (; l < 16;) {
                                        if (0 === o)
                                            break e;
                                        o--,
                                            u += n[s++] << l,
                                            l += 8
                                    }
                                    if (2 & r.wrap && 35615 === u) {
                                        E[r.check = 0] = 255 & u,
                                            E[1] = u >>> 8 & 255,
                                            r.check = B(r.check, E, 2, 0),
                                            l = u = 0,
                                            r.mode = 2;
                                        break
                                    }
                                    if (r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & u) << 8) + (u >> 8)) % 31) {
                                        e.msg = "incorrect header check",
                                            r.mode = 30;
                                        break
                                    }
                                    if (8 != (15 & u)) {
                                        e.msg = "unknown compression method",
                                            r.mode = 30;
                                        break
                                    }
                                    if (l -= 4, k = 8 + (15 & (u >>>= 4)), 0 === r.wbits)
                                        r.wbits = k;
                                    else if (k > r.wbits) {
                                        e.msg = "invalid window size",
                                            r.mode = 30;
                                        break
                                    }
                                    r.dmax = 1 << k,
                                        e.adler = r.check = 1,
                                        r.mode = 512 & u ? 10 : 12,
                                        l = u = 0;
                                    break;
                                case 2:
                                    for (; l < 16;) {
                                        if (0 === o)
                                            break e;
                                        o--,
                                            u += n[s++] << l,
                                            l += 8
                                    }
                                    if (r.flags = u, 8 != (255 & r.flags)) {
                                        e.msg = "unknown compression method",
                                            r.mode = 30;
                                        break
                                    }
                                    if (57344 & r.flags) {
                                        e.msg = "unknown header flags set",
                                            r.mode = 30;
                                        break
                                    }
                                    r.head && (r.head.text = u >> 8 & 1),
                                    512 & r.flags && (E[0] = 255 & u, E[1] = u >>> 8 & 255, r.check = B(r.check, E, 2, 0)),
                                        l = u = 0,
                                        r.mode = 3;
                                case 3:
                                    for (; l < 32;) {
                                        if (0 === o)
                                            break e;
                                        o--,
                                            u += n[s++] << l,
                                            l += 8
                                    }
                                    r.head && (r.head.time = u),
                                    512 & r.flags && (E[0] = 255 & u, E[1] = u >>> 8 & 255, E[2] = u >>> 16 & 255, E[3] = u >>> 24 & 255, r.check = B(r.check, E, 4, 0)),
                                        l = u = 0,
                                        r.mode = 4;
                                case 4:
                                    for (; l < 16;) {
                                        if (0 === o)
                                            break e;
                                        o--,
                                            u += n[s++] << l,
                                            l += 8
                                    }
                                    r.head && (r.head.xflags = 255 & u, r.head.os = u >> 8),
                                    512 & r.flags && (E[0] = 255 & u, E[1] = u >>> 8 & 255, r.check = B(r.check, E, 2, 0)),
                                        l = u = 0,
                                        r.mode = 5;
                                case 5:
                                    if (1024 & r.flags) {
                                        for (; l < 16;) {
                                            if (0 === o)
                                                break e;
                                            o--,
                                                u += n[s++] << l,
                                                l += 8
                                        }
                                        r.length = u,
                                        r.head && (r.head.extra_len = u),
                                        512 & r.flags && (E[0] = 255 & u, E[1] = u >>> 8 & 255, r.check = B(r.check, E, 2, 0)),
                                            l = u = 0
                                    } else
                                        r.head && (r.head.extra = null);
                                    r.mode = 6;
                                case 6:
                                    if (1024 & r.flags && (o < (d = r.length) && (d = o), d && (r.head && (k = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), I.arraySet(r.head.extra, n, s, d, k)), 512 & r.flags && (r.check = B(r.check, n, d, s)), o -= d, s += d, r.length -= d), r.length))
                                        break e;
                                    r.length = 0,
                                        r.mode = 7;
                                case 7:
                                    if (2048 & r.flags) {
                                        if (0 === o)
                                            break e;
                                        for (d = 0; k = n[s + d++], r.head && k && r.length < 65536 && (r.head.name += String.fromCharCode(k)), k && d < o;)
                                            ;
                                        if (512 & r.flags && (r.check = B(r.check, n, d, s)), o -= d, s += d, k)
                                            break e
                                    } else
                                        r.head && (r.head.name = null);
                                    r.length = 0,
                                        r.mode = 8;
                                case 8:
                                    if (4096 & r.flags) {
                                        if (0 === o)
                                            break e;
                                        for (d = 0; k = n[s + d++], r.head && k && r.length < 65536 && (r.head.comment += String.fromCharCode(k)), k && d < o;)
                                            ;
                                        if (512 & r.flags && (r.check = B(r.check, n, d, s)), o -= d, s += d, k)
                                            break e
                                    } else
                                        r.head && (r.head.comment = null);
                                    r.mode = 9;
                                case 9:
                                    if (512 & r.flags) {
                                        for (; l < 16;) {
                                            if (0 === o)
                                                break e;
                                            o--,
                                                u += n[s++] << l,
                                                l += 8
                                        }
                                        if (u !== (65535 & r.check)) {
                                            e.msg = "header crc mismatch",
                                                r.mode = 30;
                                            break
                                        }
                                        l = u = 0
                                    }
                                    r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0),
                                        e.adler = r.check = 0,
                                        r.mode = 12;
                                    break;
                                case 10:
                                    for (; l < 32;) {
                                        if (0 === o)
                                            break e;
                                        o--,
                                            u += n[s++] << l,
                                            l += 8
                                    }
                                    e.adler = r.check = L(u),
                                        l = u = 0,
                                        r.mode = 11;
                                case 11:
                                    if (0 === r.havedict)
                                        return e.next_out = a, e.avail_out = h, e.next_in = s, e.avail_in = o, r.hold = u, r.bits = l, 2;
                                    e.adler = r.check = 1,
                                        r.mode = 12;
                                case 12:
                                    if (5 === t || 6 === t)
                                        break e;
                                case 13:
                                    if (r.last) {
                                        u >>>= 7 & l,
                                            l -= 7 & l,
                                            r.mode = 27;
                                        break
                                    }
                                    for (; l < 3;) {
                                        if (0 === o)
                                            break e;
                                        o--,
                                            u += n[s++] << l,
                                            l += 8
                                    }
                                    switch (r.last = 1 & u, l -= 1, 3 & (u >>>= 1)) {
                                        case 0:
                                            r.mode = 14;
                                            break;
                                        case 1:
                                            if (j(r), r.mode = 20, 6 !== t)
                                                break;
                                            u >>>= 2,
                                                l -= 2;
                                            break e;
                                        case 2:
                                            r.mode = 17;
                                            break;
                                        case 3:
                                            e.msg = "invalid block type",
                                                r.mode = 30
                                    }
                                    u >>>= 2,
                                        l -= 2;
                                    break;
                                case 14:
                                    for (u >>>= 7 & l, l -= 7 & l; l < 32;) {
                                        if (0 === o)
                                            break e;
                                        o--,
                                            u += n[s++] << l,
                                            l += 8
                                    }
                                    if ((65535 & u) != (u >>> 16 ^ 65535)) {
                                        e.msg = "invalid stored block lengths",
                                            r.mode = 30;
                                        break
                                    }
                                    if (r.length = 65535 & u, l = u = 0, r.mode = 15, 6 === t)
                                        break e;
                                case 15:
                                    r.mode = 16;
                                case 16:
                                    if (d = r.length) {
                                        if (o < d && (d = o), h < d && (d = h), 0 === d)
                                            break e;
                                        I.arraySet(i, n, s, d, a),
                                            o -= d,
                                            s += d,
                                            h -= d,
                                            a += d,
                                            r.length -= d;
                                        break
                                    }
                                    r.mode = 12;
                                    break;
                                case 17:
                                    for (; l < 14;) {
                                        if (0 === o)
                                            break e;
                                        o--,
                                            u += n[s++] << l,
                                            l += 8
                                    }
                                    if (r.nlen = 257 + (31 & u), u >>>= 5, l -= 5, r.ndist = 1 + (31 & u), u >>>= 5, l -= 5, r.ncode = 4 + (15 & u), u >>>= 4, l -= 4, 286 < r.nlen || 30 < r.ndist) {
                                        e.msg = "too many length or distance symbols",
                                            r.mode = 30;
                                        break
                                    }
                                    r.have = 0,
                                        r.mode = 18;
                                case 18:
                                    for (; r.have < r.ncode;) {
                                        for (; l < 3;) {
                                            if (0 === o)
                                                break e;
                                            o--,
                                                u += n[s++] << l,
                                                l += 8
                                        }
                                        r.lens[A[r.have++]] = 7 & u,
                                            u >>>= 3,
                                            l -= 3
                                    }
                                    for (; r.have < 19;)
                                        r.lens[A[r.have++]] = 0;
                                    if (r.lencode = r.lendyn, r.lenbits = 7, S = {
                                        bits: r.lenbits
                                    }, x = T(0, r.lens, 0, 19, r.lencode, 0, r.work, S), r.lenbits = S.bits, x) {
                                        e.msg = "invalid code lengths set",
                                            r.mode = 30;
                                        break
                                    }
                                    r.have = 0,
                                        r.mode = 19;
                                case 19:
                                    for (; r.have < r.nlen + r.ndist;) {
                                        for (; g = (C = r.lencode[u & (1 << r.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l);) {
                                            if (0 === o)
                                                break e;
                                            o--,
                                                u += n[s++] << l,
                                                l += 8
                                        }
                                        if (b < 16)
                                            u >>>= _,
                                                l -= _,
                                                r.lens[r.have++] = b;
                                        else {
                                            if (16 === b) {
                                                for (z = _ + 2; l < z;) {
                                                    if (0 === o)
                                                        break e;
                                                    o--,
                                                        u += n[s++] << l,
                                                        l += 8
                                                }
                                                if (u >>>= _, l -= _, 0 === r.have) {
                                                    e.msg = "invalid bit length repeat",
                                                        r.mode = 30;
                                                    break
                                                }
                                                k = r.lens[r.have - 1],
                                                    d = 3 + (3 & u),
                                                    u >>>= 2,
                                                    l -= 2
                                            } else if (17 === b) {
                                                for (z = _ + 3; l < z;) {
                                                    if (0 === o)
                                                        break e;
                                                    o--,
                                                        u += n[s++] << l,
                                                        l += 8
                                                }
                                                l -= _,
                                                    k = 0,
                                                    d = 3 + (7 & (u >>>= _)),
                                                    u >>>= 3,
                                                    l -= 3
                                            } else {
                                                for (z = _ + 7; l < z;) {
                                                    if (0 === o)
                                                        break e;
                                                    o--,
                                                        u += n[s++] << l,
                                                        l += 8
                                                }
                                                l -= _,
                                                    k = 0,
                                                    d = 11 + (127 & (u >>>= _)),
                                                    u >>>= 7,
                                                    l -= 7
                                            }
                                            if (r.have + d > r.nlen + r.ndist) {
                                                e.msg = "invalid bit length repeat",
                                                    r.mode = 30;
                                                break
                                            }
                                            for (; d--;)
                                                r.lens[r.have++] = k
                                        }
                                    }
                                    if (30 === r.mode)
                                        break;
                                    if (0 === r.lens[256]) {
                                        e.msg = "invalid code -- missing end-of-block",
                                            r.mode = 30;
                                        break
                                    }
                                    if (r.lenbits = 9, S = {
                                        bits: r.lenbits
                                    }, x = T(D, r.lens, 0, r.nlen, r.lencode, 0, r.work, S), r.lenbits = S.bits, x) {
                                        e.msg = "invalid literal/lengths set",
                                            r.mode = 30;
                                        break
                                    }
                                    if (r.distbits = 6, r.distcode = r.distdyn, S = {
                                        bits: r.distbits
                                    }, x = T(F, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, S), r.distbits = S.bits, x) {
                                        e.msg = "invalid distances set",
                                            r.mode = 30;
                                        break
                                    }
                                    if (r.mode = 20, 6 === t)
                                        break e;
                                case 20:
                                    r.mode = 21;
                                case 21:
                                    if (6 <= o && 258 <= h) {
                                        e.next_out = a,
                                            e.avail_out = h,
                                            e.next_in = s,
                                            e.avail_in = o,
                                            r.hold = u,
                                            r.bits = l,
                                            R(e, c),
                                            a = e.next_out,
                                            i = e.output,
                                            h = e.avail_out,
                                            s = e.next_in,
                                            n = e.input,
                                            o = e.avail_in,
                                            u = r.hold,
                                            l = r.bits,
                                        12 === r.mode && (r.back = -1);
                                        break
                                    }
                                    for (r.back = 0; g = (C = r.lencode[u & (1 << r.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l);) {
                                        if (0 === o)
                                            break e;
                                        o--,
                                            u += n[s++] << l,
                                            l += 8
                                    }
                                    if (g && 0 == (240 & g)) {
                                        for (v = _, y = g, w = b; g = (C = r.lencode[w + ((u & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l);) {
                                            if (0 === o)
                                                break e;
                                            o--,
                                                u += n[s++] << l,
                                                l += 8
                                        }
                                        u >>>= v,
                                            l -= v,
                                            r.back += v
                                    }
                                    if (u >>>= _, l -= _, r.back += _, r.length = b, 0 === g) {
                                        r.mode = 26;
                                        break
                                    }
                                    if (32 & g) {
                                        r.back = -1,
                                            r.mode = 12;
                                        break
                                    }
                                    if (64 & g) {
                                        e.msg = "invalid literal/length code",
                                            r.mode = 30;
                                        break
                                    }
                                    r.extra = 15 & g,
                                        r.mode = 22;
                                case 22:
                                    if (r.extra) {
                                        for (z = r.extra; l < z;) {
                                            if (0 === o)
                                                break e;
                                            o--,
                                                u += n[s++] << l,
                                                l += 8
                                        }
                                        r.length += u & (1 << r.extra) - 1,
                                            u >>>= r.extra,
                                            l -= r.extra,
                                            r.back += r.extra
                                    }
                                    r.was = r.length,
                                        r.mode = 23;
                                case 23:
                                    for (; g = (C = r.distcode[u & (1 << r.distbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l);) {
                                        if (0 === o)
                                            break e;
                                        o--,
                                            u += n[s++] << l,
                                            l += 8
                                    }
                                    if (0 == (240 & g)) {
                                        for (v = _, y = g, w = b; g = (C = r.distcode[w + ((u & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l);) {
                                            if (0 === o)
                                                break e;
                                            o--,
                                                u += n[s++] << l,
                                                l += 8
                                        }
                                        u >>>= v,
                                            l -= v,
                                            r.back += v
                                    }
                                    if (u >>>= _, l -= _, r.back += _, 64 & g) {
                                        e.msg = "invalid distance code",
                                            r.mode = 30;
                                        break
                                    }
                                    r.offset = b,
                                        r.extra = 15 & g,
                                        r.mode = 24;
                                case 24:
                                    if (r.extra) {
                                        for (z = r.extra; l < z;) {
                                            if (0 === o)
                                                break e;
                                            o--,
                                                u += n[s++] << l,
                                                l += 8
                                        }
                                        r.offset += u & (1 << r.extra) - 1,
                                            u >>>= r.extra,
                                            l -= r.extra,
                                            r.back += r.extra
                                    }
                                    if (r.offset > r.dmax) {
                                        e.msg = "invalid distance too far back",
                                            r.mode = 30;
                                        break
                                    }
                                    r.mode = 25;
                                case 25:
                                    if (0 === h)
                                        break e;
                                    if (d = c - h, r.offset > d) {
                                        if ((d = r.offset - d) > r.whave && r.sane) {
                                            e.msg = "invalid distance too far back",
                                                r.mode = 30;
                                            break
                                        }
                                        p = d > r.wnext ? (d -= r.wnext, r.wsize - d) : r.wnext - d,
                                        d > r.length && (d = r.length),
                                            m = r.window
                                    } else
                                        m = i,
                                            p = a - r.offset,
                                            d = r.length;
                                    for (h < d && (d = h), h -= d, r.length -= d; i[a++] = m[p++], --d;)
                                        ;
                                    0 === r.length && (r.mode = 21);
                                    break;
                                case 26:
                                    if (0 === h)
                                        break e;
                                    i[a++] = r.length,
                                        h--,
                                        r.mode = 21;
                                    break;
                                case 27:
                                    if (r.wrap) {
                                        for (; l < 32;) {
                                            if (0 === o)
                                                break e;
                                            o--,
                                                u |= n[s++] << l,
                                                l += 8
                                        }
                                        if (c -= h, e.total_out += c, r.total += c, c && (e.adler = r.check = r.flags ? B(r.check, i, c, a - c) : O(r.check, i, c, a - c)), c = h, (r.flags ? u : L(u)) !== r.check) {
                                            e.msg = "incorrect data check",
                                                r.mode = 30;
                                            break
                                        }
                                        l = u = 0
                                    }
                                    r.mode = 28;
                                case 28:
                                    if (r.wrap && r.flags) {
                                        for (; l < 32;) {
                                            if (0 === o)
                                                break e;
                                            o--,
                                                u += n[s++] << l,
                                                l += 8
                                        }
                                        if (u !== (4294967295 & r.total)) {
                                            e.msg = "incorrect length check",
                                                r.mode = 30;
                                            break
                                        }
                                        l = u = 0
                                    }
                                    r.mode = 29;
                                case 29:
                                    x = 1;
                                    break e;
                                case 30:
                                    x = -3;
                                    break e;
                                case 31:
                                    return -4;
                                case 32:
                                default:
                                    return U
                            }
                    return e.next_out = a, e.avail_out = h, e.next_in = s, e.avail_in = o, r.hold = u, r.bits = l, (r.wsize || c !== e.avail_out && r.mode < 30 && (r.mode < 27 || 4 !== t)) && Z(e, e.output, e.next_out, c - e.avail_out) ? (r.mode = 31, -4) : (f -= e.avail_in, c -= e.avail_out, e.total_in += f, e.total_out += c, r.total += c, r.wrap && c && (e.adler = r.check = r.flags ? B(r.check, i, c, e.next_out - c) : O(r.check, i, c, e.next_out - c)), e.data_type = r.bits + (r.last ? 64 : 0) + (12 === r.mode ? 128 : 0) + (20 === r.mode || 15 === r.mode ? 256 : 0), (0 == f && 0 === c || 4 === t) && x === N && (x = -5), x)
                },
                r.inflateEnd = function(e) {
                    if (!e || !e.state)
                        return U;
                    var t = e.state;
                    return t.window && (t.window = null), e.state = null, N
                },
                r.inflateGetHeader = function(e, t) {
                    var r;
                    return e && e.state ? 0 == (2 & (r = e.state).wrap) ? U : ((r.head = t).done = !1, N) : U
                },
                r.inflateSetDictionary = function(e, t) {
                    var r,
                        n = t.length;
                    return e && e.state ? 0 !== (r = e.state).wrap && 11 !== r.mode ? U : 11 === r.mode && O(1, t, n, 0) !== r.check ? -3 : Z(e, t, n, n) ? (r.mode = 31, -4) : (r.havedict = 1, N) : U
                },
                r.inflateInfo = "pako inflate (from Nodeca project)"
        }, {
            "../utils/common": 41,
            "./adler32": 43,
            "./crc32": 45,
            "./inffast": 48,
            "./inftrees": 50
        }],
        50: [function(e, t, r) {
            "use strict";
            var D = e("../utils/common"),
                F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                N = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                U = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                P = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
            t.exports = function(e, t, r, n, i, s, a, o) {
                var h,
                    u,
                    l,
                    f,
                    c,
                    d,
                    p,
                    m,
                    _,
                    g = o.bits,
                    b = 0,
                    v = 0,
                    y = 0,
                    w = 0,
                    k = 0,
                    x = 0,
                    S = 0,
                    z = 0,
                    C = 0,
                    E = 0,
                    A = null,
                    I = 0,
                    O = new D.Buf16(16),
                    B = new D.Buf16(16),
                    R = null,
                    T = 0;
                for (b = 0; b <= 15; b++)
                    O[b] = 0;
                for (v = 0; v < n; v++)
                    O[t[r + v]]++;
                for (k = g, w = 15; 1 <= w && 0 === O[w]; w--)
                    ;
                if (w < k && (k = w), 0 === w)
                    return i[s++] = 20971520, i[s++] = 20971520, o.bits = 1, 0;
                for (y = 1; y < w && 0 === O[y]; y++)
                    ;
                for (k < y && (k = y), b = z = 1; b <= 15; b++)
                    if (z <<= 1, (z -= O[b]) < 0)
                        return -1;
                if (0 < z && (0 === e || 1 !== w))
                    return -1;
                for (B[1] = 0, b = 1; b < 15; b++)
                    B[b + 1] = B[b] + O[b];
                for (v = 0; v < n; v++)
                    0 !== t[r + v] && (a[B[t[r + v]]++] = v);
                if (d = 0 === e ? (A = R = a, 19) : 1 === e ? (A = F, I -= 257, R = N, T -= 257, 256) : (A = U, R = P, -1), b = y, c = s, S = v = E = 0, l = -1, f = (C = 1 << (x = k)) - 1, 1 === e && 852 < C || 2 === e && 592 < C)
                    return 1;
                for (;;) {
                    for (p = b - S, _ = a[v] < d ? (m = 0, a[v]) : a[v] > d ? (m = R[T + a[v]], A[I + a[v]]) : (m = 96, 0), h = 1 << b - S, y = u = 1 << x; i[c + (E >> S) + (u -= h)] = p << 24 | m << 16 | _ | 0, 0 !== u;)
                        ;
                    for (h = 1 << b - 1; E & h;)
                        h >>= 1;
                    if (0 !== h ? (E &= h - 1, E += h) : E = 0, v++, 0 == --O[b]) {
                        if (b === w)
                            break;
                        b = t[r + a[v]]
                    }
                    if (k < b && (E & f) !== l) {
                        for (0 === S && (S = k), c += y, z = 1 << (x = b - S); x + S < w && !((z -= O[x + S]) <= 0);)
                            x++,
                                z <<= 1;
                        if (C += 1 << x, 1 === e && 852 < C || 2 === e && 592 < C)
                            return 1;
                        i[l = E & f] = k << 24 | x << 16 | c - s | 0
                    }
                }
                return 0 !== E && (i[c + E] = b - S << 24 | 64 << 16 | 0), o.bits = k, 0
            }
        }, {
            "../utils/common": 41
        }],
        51: [function(e, t, r) {
            "use strict";
            t.exports = {
                2: "need dictionary",
                1: "stream end",
                0: "",
                "-1": "file error",
                "-2": "stream error",
                "-3": "data error",
                "-4": "insufficient memory",
                "-5": "buffer error",
                "-6": "incompatible version"
            }
        }, {}],
        52: [function(e, t, r) {
            "use strict";
            var i = e("../utils/common"),
                o = 0,
                h = 1;
            function n(e) {
                for (var t = e.length; 0 <= --t;)
                    e[t] = 0
            }
            var s = 0,
                a = 29,
                u = 256,
                l = u + 1 + a,
                f = 30,
                c = 19,
                _ = 2 * l + 1,
                g = 15,
                d = 16,
                p = 7,
                m = 256,
                b = 16,
                v = 17,
                y = 18,
                w = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                k = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                z = new Array(2 * (l + 2));
            n(z);
            var C = new Array(2 * f);
            n(C);
            var E = new Array(512);
            n(E);
            var A = new Array(256);
            n(A);
            var I = new Array(a);
            n(I);
            var O,
                B,
                R,
                T = new Array(f);
            function D(e, t, r, n, i) {
                this.static_tree = e,
                    this.extra_bits = t,
                    this.extra_base = r,
                    this.elems = n,
                    this.max_length = i,
                    this.has_stree = e && e.length
            }
            function F(e, t) {
                this.dyn_tree = e,
                    this.max_code = 0,
                    this.stat_desc = t
            }
            function N(e) {
                return e < 256 ? E[e] : E[256 + (e >>> 7)]
            }
            function U(e, t) {
                e.pending_buf[e.pending++] = 255 & t,
                    e.pending_buf[e.pending++] = t >>> 8 & 255
            }
            function P(e, t, r) {
                e.bi_valid > d - r ? (e.bi_buf |= t << e.bi_valid & 65535, U(e, e.bi_buf), e.bi_buf = t >> d - e.bi_valid, e.bi_valid += r - d) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += r)
            }
            function L(e, t, r) {
                P(e, r[2 * t], r[2 * t + 1])
            }
            function j(e, t) {
                for (var r = 0; r |= 1 & e, e >>>= 1, r <<= 1, 0 < --t;)
                    ;
                return r >>> 1
            }
            function Z(e, t, r) {
                var n,
                    i,
                    s = new Array(g + 1),
                    a = 0;
                for (n = 1; n <= g; n++)
                    s[n] = a = a + r[n - 1] << 1;
                for (i = 0; i <= t; i++) {
                    var o = e[2 * i + 1];
                    0 !== o && (e[2 * i] = j(s[o]++, o))
                }
            }
            function W(e) {
                var t;
                for (t = 0; t < l; t++)
                    e.dyn_ltree[2 * t] = 0;
                for (t = 0; t < f; t++)
                    e.dyn_dtree[2 * t] = 0;
                for (t = 0; t < c; t++)
                    e.bl_tree[2 * t] = 0;
                e.dyn_ltree[2 * m] = 1,
                    e.opt_len = e.static_len = 0,
                    e.last_lit = e.matches = 0
            }
            function M(e) {
                8 < e.bi_valid ? U(e, e.bi_buf) : 0 < e.bi_valid && (e.pending_buf[e.pending++] = e.bi_buf),
                    e.bi_buf = 0,
                    e.bi_valid = 0
            }
            function H(e, t, r, n) {
                var i = 2 * t,
                    s = 2 * r;
                return e[i] < e[s] || e[i] === e[s] && n[t] <= n[r]
            }
            function G(e, t, r) {
                for (var n = e.heap[r], i = r << 1; i <= e.heap_len && (i < e.heap_len && H(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !H(t, n, e.heap[i], e.depth));)
                    e.heap[r] = e.heap[i],
                        r = i,
                        i <<= 1;
                e.heap[r] = n
            }
            function K(e, t, r) {
                var n,
                    i,
                    s,
                    a,
                    o = 0;
                if (0 !== e.last_lit)
                    for (; n = e.pending_buf[e.d_buf + 2 * o] << 8 | e.pending_buf[e.d_buf + 2 * o + 1], i = e.pending_buf[e.l_buf + o], o++, 0 === n ? L(e, i, t) : (L(e, (s = A[i]) + u + 1, t), 0 !== (a = w[s]) && P(e, i -= I[s], a), L(e, s = N(--n), r), 0 !== (a = k[s]) && P(e, n -= T[s], a)), o < e.last_lit;)
                        ;
                L(e, m, t)
            }
            function Y(e, t) {
                var r,
                    n,
                    i,
                    s = t.dyn_tree,
                    a = t.stat_desc.static_tree,
                    o = t.stat_desc.has_stree,
                    h = t.stat_desc.elems,
                    u = -1;
                for (e.heap_len = 0, e.heap_max = _, r = 0; r < h; r++)
                    0 !== s[2 * r] ? (e.heap[++e.heap_len] = u = r, e.depth[r] = 0) : s[2 * r + 1] = 0;
                for (; e.heap_len < 2;)
                    s[2 * (i = e.heap[++e.heap_len] = u < 2 ? ++u : 0)] = 1,
                        e.depth[i] = 0,
                        e.opt_len--,
                    o && (e.static_len -= a[2 * i + 1]);
                for (t.max_code = u, r = e.heap_len >> 1; 1 <= r; r--)
                    G(e, s, r);
                for (i = h; r = e.heap[1], e.heap[1] = e.heap[e.heap_len--], G(e, s, 1), n = e.heap[1], e.heap[--e.heap_max] = r, e.heap[--e.heap_max] = n, s[2 * i] = s[2 * r] + s[2 * n], e.depth[i] = (e.depth[r] >= e.depth[n] ? e.depth[r] : e.depth[n]) + 1, s[2 * r + 1] = s[2 * n + 1] = i, e.heap[1] = i++, G(e, s, 1), 2 <= e.heap_len;)
                    ;
                e.heap[--e.heap_max] = e.heap[1],
                    function(e, t) {
                        var r,
                            n,
                            i,
                            s,
                            a,
                            o,
                            h = t.dyn_tree,
                            u = t.max_code,
                            l = t.stat_desc.static_tree,
                            f = t.stat_desc.has_stree,
                            c = t.stat_desc.extra_bits,
                            d = t.stat_desc.extra_base,
                            p = t.stat_desc.max_length,
                            m = 0;
                        for (s = 0; s <= g; s++)
                            e.bl_count[s] = 0;
                        for (h[2 * e.heap[e.heap_max] + 1] = 0, r = e.heap_max + 1; r < _; r++)
                            p < (s = h[2 * h[2 * (n = e.heap[r]) + 1] + 1] + 1) && (s = p, m++),
                                h[2 * n + 1] = s,
                            u < n || (e.bl_count[s]++, a = 0, d <= n && (a = c[n - d]), o = h[2 * n], e.opt_len += o * (s + a), f && (e.static_len += o * (l[2 * n + 1] + a)));
                        if (0 !== m) {
                            do {
                                for (s = p - 1; 0 === e.bl_count[s];)
                                    s--;
                                e.bl_count[s]--,
                                    e.bl_count[s + 1] += 2,
                                    e.bl_count[p]--,
                                    m -= 2
                            } while (0 < m);
                            for (s = p; 0 !== s; s--)
                                for (n = e.bl_count[s]; 0 !== n;)
                                    u < (i = e.heap[--r]) || (h[2 * i + 1] !== s && (e.opt_len += (s - h[2 * i + 1]) * h[2 * i], h[2 * i + 1] = s), n--)
                        }
                    }(e, t),
                    Z(s, u, e.bl_count)
            }
            function X(e, t, r) {
                var n,
                    i,
                    s = -1,
                    a = t[1],
                    o = 0,
                    h = 7,
                    u = 4;
                for (0 === a && (h = 138, u = 3), t[2 * (r + 1) + 1] = 65535, n = 0; n <= r; n++)
                    i = a,
                        a = t[2 * (n + 1) + 1],
                    ++o < h && i === a || (o < u ? e.bl_tree[2 * i] += o : 0 !== i ? (i !== s && e.bl_tree[2 * i]++, e.bl_tree[2 * b]++) : o <= 10 ? e.bl_tree[2 * v]++ : e.bl_tree[2 * y]++, s = i, u = (o = 0) === a ? (h = 138, 3) : i === a ? (h = 6, 3) : (h = 7, 4))
            }
            function V(e, t, r) {
                var n,
                    i,
                    s = -1,
                    a = t[1],
                    o = 0,
                    h = 7,
                    u = 4;
                for (0 === a && (h = 138, u = 3), n = 0; n <= r; n++)
                    if (i = a, a = t[2 * (n + 1) + 1], !(++o < h && i === a)) {
                        if (o < u)
                            for (; L(e, i, e.bl_tree), 0 != --o;)
                                ;
                        else
                            0 !== i ? (i !== s && (L(e, i, e.bl_tree), o--), L(e, b, e.bl_tree), P(e, o - 3, 2)) : o <= 10 ? (L(e, v, e.bl_tree), P(e, o - 3, 3)) : (L(e, y, e.bl_tree), P(e, o - 11, 7));
                        s = i,
                            u = (o = 0) === a ? (h = 138, 3) : i === a ? (h = 6, 3) : (h = 7, 4)
                    }
            }
            n(T);
            var q = !1;
            function J(e, t, r, n) {
                P(e, (s << 1) + (n ? 1 : 0), 3),
                    function(e, t, r, n) {
                        M(e),
                        n && (U(e, r), U(e, ~r)),
                            i.arraySet(e.pending_buf, e.window, t, r, e.pending),
                            e.pending += r
                    }(e, t, r, !0)
            }
            r._tr_init = function(e) {
                q || (function() {
                    var e,
                        t,
                        r,
                        n,
                        i,
                        s = new Array(g + 1);
                    for (n = r = 0; n < a - 1; n++)
                        for (I[n] = r, e = 0; e < 1 << w[n]; e++)
                            A[r++] = n;
                    for (A[r - 1] = n, n = i = 0; n < 16; n++)
                        for (T[n] = i, e = 0; e < 1 << k[n]; e++)
                            E[i++] = n;
                    for (i >>= 7; n < f; n++)
                        for (T[n] = i << 7, e = 0; e < 1 << k[n] - 7; e++)
                            E[256 + i++] = n;
                    for (t = 0; t <= g; t++)
                        s[t] = 0;
                    for (e = 0; e <= 143;)
                        z[2 * e + 1] = 8,
                            e++,
                            s[8]++;
                    for (; e <= 255;)
                        z[2 * e + 1] = 9,
                            e++,
                            s[9]++;
                    for (; e <= 279;)
                        z[2 * e + 1] = 7,
                            e++,
                            s[7]++;
                    for (; e <= 287;)
                        z[2 * e + 1] = 8,
                            e++,
                            s[8]++;
                    for (Z(z, l + 1, s), e = 0; e < f; e++)
                        C[2 * e + 1] = 5,
                            C[2 * e] = j(e, 5);
                    O = new D(z, w, u + 1, l, g),
                        B = new D(C, k, 0, f, g),
                        R = new D(new Array(0), x, 0, c, p)
                }(), q = !0),
                    e.l_desc = new F(e.dyn_ltree, O),
                    e.d_desc = new F(e.dyn_dtree, B),
                    e.bl_desc = new F(e.bl_tree, R),
                    e.bi_buf = 0,
                    e.bi_valid = 0,
                    W(e)
            },
                r._tr_stored_block = J,
                r._tr_flush_block = function(e, t, r, n) {
                    var i,
                        s,
                        a = 0;
                    0 < e.level ? (2 === e.strm.data_type && (e.strm.data_type = function(e) {
                        var t,
                            r = 4093624447;
                        for (t = 0; t <= 31; t++, r >>>= 1)
                            if (1 & r && 0 !== e.dyn_ltree[2 * t])
                                return o;
                        if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26])
                            return h;
                        for (t = 32; t < u; t++)
                            if (0 !== e.dyn_ltree[2 * t])
                                return h;
                        return o
                    }(e)), Y(e, e.l_desc), Y(e, e.d_desc), a = function(e) {
                        var t;
                        for (X(e, e.dyn_ltree, e.l_desc.max_code), X(e, e.dyn_dtree, e.d_desc.max_code), Y(e, e.bl_desc), t = c - 1; 3 <= t && 0 === e.bl_tree[2 * S[t] + 1]; t--)
                            ;
                        return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t
                    }(e), i = e.opt_len + 3 + 7 >>> 3, (s = e.static_len + 3 + 7 >>> 3) <= i && (i = s)) : i = s = r + 5,
                        r + 4 <= i && -1 !== t ? J(e, t, r, n) : 4 === e.strategy || s === i ? (P(e, 2 + (n ? 1 : 0), 3), K(e, z, C)) : (P(e, 4 + (n ? 1 : 0), 3), function(e, t, r, n) {
                            var i;
                            for (P(e, t - 257, 5), P(e, r - 1, 5), P(e, n - 4, 4), i = 0; i < n; i++)
                                P(e, e.bl_tree[2 * S[i] + 1], 3);
                            V(e, e.dyn_ltree, t - 1),
                                V(e, e.dyn_dtree, r - 1)
                        }(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, a + 1), K(e, e.dyn_ltree, e.dyn_dtree)),
                        W(e),
                    n && M(e)
                },
                r._tr_tally = function(e, t, r) {
                    return e.pending_buf[e.d_buf + 2 * e.last_lit] = t >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, e.pending_buf[e.l_buf + e.last_lit] = 255 & r, e.last_lit++, 0 === t ? e.dyn_ltree[2 * r]++ : (e.matches++, t--, e.dyn_ltree[2 * (A[r] + u + 1)]++, e.dyn_dtree[2 * N(t)]++), e.last_lit === e.lit_bufsize - 1
                },
                r._tr_align = function(e) {
                    P(e, 2, 3),
                        L(e, m, z),
                        function(e) {
                            16 === e.bi_valid ? (U(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : 8 <= e.bi_valid && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8)
                        }(e)
                }
        }, {
            "../utils/common": 41
        }],
        53: [function(e, t, r) {
            "use strict";
            t.exports = function() {
                this.input = null,
                    this.next_in = 0,
                    this.avail_in = 0,
                    this.total_in = 0,
                    this.output = null,
                    this.next_out = 0,
                    this.avail_out = 0,
                    this.total_out = 0,
                    this.msg = "",
                    this.state = null,
                    this.data_type = 2,
                    this.adler = 0
            }
        }, {}],
        54: [function(e, t, r) {
            (function(e) {
                !function(r, n) {
                    "use strict";
                    if (!r.setImmediate) {
                        var i,
                            s,
                            t,
                            a,
                            o = 1,
                            h = {},
                            u = !1,
                            l = r.document,
                            e = Object.getPrototypeOf && Object.getPrototypeOf(r);
                        e = e && e.setTimeout ? e : r,
                            i = "[object process]" === {}.toString.call(r.process) ? function(e) {
                                process.nextTick(function() {
                                    c(e)
                                })
                            } : function() {
                                if (r.postMessage && !r.importScripts) {
                                    var e = !0,
                                        t = r.onmessage;
                                    return r.onmessage = function() {
                                        e = !1
                                    }, r.postMessage("", "*"), r.onmessage = t, e
                                }
                            }() ? (a = "setImmediate$" + Math.random() + "$", r.addEventListener ? r.addEventListener("message", d, !1) : r.attachEvent("onmessage", d), function(e) {
                                r.postMessage(a + e, "*")
                            }) : r.MessageChannel ? ((t = new MessageChannel).port1.onmessage = function(e) {
                                c(e.data)
                            }, function(e) {
                                t.port2.postMessage(e)
                            }) : l && "onreadystatechange" in l.createElement("script") ? (s = l.documentElement, function(e) {
                                var t = l.createElement("script");
                                t.onreadystatechange = function() {
                                    c(e),
                                        t.onreadystatechange = null,
                                        s.removeChild(t),
                                        t = null
                                },
                                    s.appendChild(t)
                            }) : function(e) {
                                setTimeout(c, 0, e)
                            },
                            e.setImmediate = function(e) {
                                "function" != typeof e && (e = new Function("" + e));
                                for (var t = new Array(arguments.length - 1), r = 0; r < t.length; r++)
                                    t[r] = arguments[r + 1];
                                var n = {
                                    callback: e,
                                    args: t
                                };
                                return h[o] = n, i(o), o++
                            },
                            e.clearImmediate = f
                    }
                    function f(e) {
                        delete h[e]
                    }
                    function c(e) {
                        if (u)
                            setTimeout(c, 0, e);
                        else {
                            var t = h[e];
                            if (t) {
                                u = !0;
                                try {
                                    !function(e) {
                                        var t = e.callback,
                                            r = e.args;
                                        switch (r.length) {
                                            case 0:
                                                t();
                                                break;
                                            case 1:
                                                t(r[0]);
                                                break;
                                            case 2:
                                                t(r[0], r[1]);
                                                break;
                                            case 3:
                                                t(r[0], r[1], r[2]);
                                                break;
                                            default:
                                                t.apply(n, r)
                                        }
                                    }(t)
                                } finally {
                                    f(e),
                                        u = !1
                                }
                            }
                        }
                    }
                    function d(e) {
                        e.source === r && "string" == typeof e.data && 0 === e.data.indexOf(a) && c(+e.data.slice(a.length))
                    }
                }("undefined" == typeof self ? void 0 === e ? this : e : self)
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}]
    }, {}, [10])(10)
});

/*! DataTables 1.13.6
 * ©2008-2023 SpryMedia Ltd - datatables.net/license
 */
!function(n) {
    "use strict";
    var a;
    "function" == typeof define && define.amd ? define(["jquery"], function(t) {
        return n(t, window, document)
    }) : "object" == typeof exports ? (a = require("jquery"), "undefined" == typeof window ? module.exports = function(t, e) {
        return t = t || window, e = e || a(t), n(e, t, t.document)
    } : n(a, window, window.document)) : window.DataTable = n(jQuery, window, document)
}(function(P, j, v, H) {
    "use strict";
    function d(t) {
        var e = parseInt(t, 10);
        return !isNaN(e) && isFinite(t) ? e : null
    }
    function l(t, e, n) {
        var a = typeof t,
            r = "string" == a;
        return "number" == a || "bigint" == a || !!h(t) || (e && r && (t = $(t, e)), n && r && (t = t.replace(q, "")), !isNaN(parseFloat(t)) && isFinite(t))
    }
    function a(t, e, n) {
        var a;
        return !!h(t) || (h(a = t) || "string" == typeof a) && !!l(t.replace(V, "").replace(/<script/i, ""), e, n) || null
    }
    function m(t, e, n, a) {
        var r = [],
            o = 0,
            i = e.length;
        if (a !== H)
            for (; o < i; o++)
                t[e[o]][n] && r.push(t[e[o]][n][a]);
        else
            for (; o < i; o++)
                r.push(t[e[o]][n]);
        return r
    }
    function f(t, e) {
        var n,
            a = [];
        e === H ? (e = 0, n = t) : (n = e, e = t);
        for (var r = e; r < n; r++)
            a.push(r);
        return a
    }
    function _(t) {
        for (var e = [], n = 0, a = t.length; n < a; n++)
            t[n] && e.push(t[n]);
        return e
    }
    function s(t, e) {
        return -1 !== this.indexOf(t, e = e === H ? 0 : e)
    }
    var p,
        e,
        t,
        w = function(t, v) {
            if (w.factory(t, v))
                return w;
            if (this instanceof w)
                return P(t).DataTable(v);
            v = t,
                this.$ = function(t, e) {
                    return this.api(!0).$(t, e)
                },
                this._ = function(t, e) {
                    return this.api(!0).rows(t, e).data()
                },
                this.api = function(t) {
                    return new B(t ? ge(this[p.iApiIndex]) : this)
                },
                this.fnAddData = function(t, e) {
                    var n = this.api(!0),
                        t = (Array.isArray(t) && (Array.isArray(t[0]) || P.isPlainObject(t[0])) ? n.rows : n.row).add(t);
                    return e !== H && !e || n.draw(), t.flatten().toArray()
                },
                this.fnAdjustColumnSizing = function(t) {
                    var e = this.api(!0).columns.adjust(),
                        n = e.settings()[0],
                        a = n.oScroll;
                    t === H || t ? e.draw(!1) : "" === a.sX && "" === a.sY || Qt(n)
                },
                this.fnClearTable = function(t) {
                    var e = this.api(!0).clear();
                    t !== H && !t || e.draw()
                },
                this.fnClose = function(t) {
                    this.api(!0).row(t).child.hide()
                },
                this.fnDeleteRow = function(t, e, n) {
                    var a = this.api(!0),
                        t = a.rows(t),
                        r = t.settings()[0],
                        o = r.aoData[t[0][0]];
                    return t.remove(), e && e.call(this, r, o), n !== H && !n || a.draw(), o
                },
                this.fnDestroy = function(t) {
                    this.api(!0).destroy(t)
                },
                this.fnDraw = function(t) {
                    this.api(!0).draw(t)
                },
                this.fnFilter = function(t, e, n, a, r, o) {
                    var i = this.api(!0);
                    (null === e || e === H ? i : i.column(e)).search(t, n, a, o),
                        i.draw()
                },
                this.fnGetData = function(t, e) {
                    var n,
                        a = this.api(!0);
                    return t !== H ? (n = t.nodeName ? t.nodeName.toLowerCase() : "", e !== H || "td" == n || "th" == n ? a.cell(t, e).data() : a.row(t).data() || null) : a.data().toArray()
                },
                this.fnGetNodes = function(t) {
                    var e = this.api(!0);
                    return t !== H ? e.row(t).node() : e.rows().nodes().flatten().toArray()
                },
                this.fnGetPosition = function(t) {
                    var e = this.api(!0),
                        n = t.nodeName.toUpperCase();
                    return "TR" == n ? e.row(t).index() : "TD" == n || "TH" == n ? [(n = e.cell(t).index()).row, n.columnVisible, n.column] : null
                },
                this.fnIsOpen = function(t) {
                    return this.api(!0).row(t).child.isShown()
                },
                this.fnOpen = function(t, e, n) {
                    return this.api(!0).row(t).child(e, n).show().child()[0]
                },
                this.fnPageChange = function(t, e) {
                    t = this.api(!0).page(t);
                    e !== H && !e || t.draw(!1)
                },
                this.fnSetColumnVis = function(t, e, n) {
                    t = this.api(!0).column(t).visible(e);
                    n !== H && !n || t.columns.adjust().draw()
                },
                this.fnSettings = function() {
                    return ge(this[p.iApiIndex])
                },
                this.fnSort = function(t) {
                    this.api(!0).order(t).draw()
                },
                this.fnSortListener = function(t, e, n) {
                    this.api(!0).order.listener(t, e, n)
                },
                this.fnUpdate = function(t, e, n, a, r) {
                    var o = this.api(!0);
                    return (n === H || null === n ? o.row(e) : o.cell(e, n)).data(t), r !== H && !r || o.columns.adjust(), a !== H && !a || o.draw(), 0
                },
                this.fnVersionCheck = p.fnVersionCheck;
            var e,
                y = this,
                D = v === H,
                _ = this.length;
            for (e in D && (v = {}), this.oApi = this.internal = p.internal, w.ext.internal)
                e && (this[e] = $e(e));
            return this.each(function() {
                var r = 1 < _ ? be({}, v, !0) : v,
                    o = 0,
                    t = this.getAttribute("id"),
                    i = !1,
                    e = w.defaults,
                    l = P(this);
                if ("table" != this.nodeName.toLowerCase())
                    W(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
                else {
                    K(e),
                        Q(e.column),
                        C(e, e, !0),
                        C(e.column, e.column, !0),
                        C(e, P.extend(r, l.data()), !0);
                    for (var n = w.settings, o = 0, s = n.length; o < s; o++) {
                        var a = n[o];
                        if (a.nTable == this || a.nTHead && a.nTHead.parentNode == this || a.nTFoot && a.nTFoot.parentNode == this) {
                            var u = (r.bRetrieve !== H ? r : e).bRetrieve,
                                c = (r.bDestroy !== H ? r : e).bDestroy;
                            if (D || u)
                                return a.oInstance;
                            if (c) {
                                a.oInstance.fnDestroy();
                                break
                            }
                            return void W(a, 0, "Cannot reinitialise DataTable", 3)
                        }
                        if (a.sTableId == this.id) {
                            n.splice(o, 1);
                            break
                        }
                    }
                    null !== t && "" !== t || (t = "DataTables_Table_" + w.ext._unique++, this.id = t);
                    var f,
                        d,
                        h = P.extend(!0, {}, w.models.oSettings, {
                            sDestroyWidth: l[0].style.width,
                            sInstance: t,
                            sTableId: t
                        }),
                        p = (h.nTable = this, h.oApi = y.internal, h.oInit = r, n.push(h), h.oInstance = 1 === y.length ? y : l.dataTable(), K(r), Z(r.oLanguage), r.aLengthMenu && !r.iDisplayLength && (r.iDisplayLength = (Array.isArray(r.aLengthMenu[0]) ? r.aLengthMenu[0] : r.aLengthMenu)[0]), r = be(P.extend(!0, {}, e), r), F(h.oFeatures, r, ["bPaginate", "bLengthChange", "bFilter", "bSort", "bSortMulti", "bInfo", "bProcessing", "bAutoWidth", "bSortClasses", "bServerSide", "bDeferRender"]), F(h, r, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", ["iCookieDuration", "iStateDuration"], ["oSearch", "oPreviousSearch"], ["aoSearchCols", "aoPreSearchCols"], ["iDisplayLength", "_iDisplayLength"]]), F(h.oScroll, r, [["sScrollX", "sX"], ["sScrollXInner", "sXInner"], ["sScrollY", "sY"], ["bScrollCollapse", "bCollapse"]]), F(h.oLanguage, r, "fnInfoCallback"), L(h, "aoDrawCallback", r.fnDrawCallback, "user"), L(h, "aoServerParams", r.fnServerParams, "user"), L(h, "aoStateSaveParams", r.fnStateSaveParams, "user"), L(h, "aoStateLoadParams", r.fnStateLoadParams, "user"), L(h, "aoStateLoaded", r.fnStateLoaded, "user"), L(h, "aoRowCallback", r.fnRowCallback, "user"), L(h, "aoRowCreatedCallback", r.fnCreatedRow, "user"), L(h, "aoHeaderCallback", r.fnHeaderCallback, "user"), L(h, "aoFooterCallback", r.fnFooterCallback, "user"), L(h, "aoInitComplete", r.fnInitComplete, "user"), L(h, "aoPreDrawCallback", r.fnPreDrawCallback, "user"), h.rowIdFn = A(r.rowId), tt(h), h.oClasses),
                        g = (P.extend(p, w.ext.classes, r.oClasses), l.addClass(p.sTable), h.iInitDisplayStart === H && (h.iInitDisplayStart = r.iDisplayStart, h._iDisplayStart = r.iDisplayStart), null !== r.iDeferLoading && (h.bDeferLoading = !0, t = Array.isArray(r.iDeferLoading), h._iRecordsDisplay = t ? r.iDeferLoading[0] : r.iDeferLoading, h._iRecordsTotal = t ? r.iDeferLoading[1] : r.iDeferLoading), h.oLanguage),
                        t = (P.extend(!0, g, r.oLanguage), g.sUrl ? (P.ajax({
                            dataType: "json",
                            url: g.sUrl,
                            success: function(t) {
                                C(e.oLanguage, t),
                                    Z(t),
                                    P.extend(!0, g, t, h.oInit.oLanguage),
                                    R(h, null, "i18n", [h]),
                                    Jt(h)
                            },
                            error: function() {
                                Jt(h)
                            }
                        }), i = !0) : R(h, null, "i18n", [h]), null === r.asStripeClasses && (h.asStripeClasses = [p.sStripeOdd, p.sStripeEven]), h.asStripeClasses),
                        b = l.children("tbody").find("tr").eq(0),
                        m = (-1 !== P.inArray(!0, P.map(t, function(t, e) {
                            return b.hasClass(t)
                        })) && (P("tbody tr", this).removeClass(t.join(" ")), h.asDestroyStripes = t.slice()), []),
                        t = this.getElementsByTagName("thead");
                    if (0 !== t.length && (wt(h.aoHeader, t[0]), m = Ct(h)), null === r.aoColumns)
                        for (f = [], o = 0, s = m.length; o < s; o++)
                            f.push(null);
                    else
                        f = r.aoColumns;
                    for (o = 0, s = f.length; o < s; o++)
                        nt(h, m ? m[o] : null);
                    st(h, r.aoColumnDefs, f, function(t, e) {
                        at(h, t, e)
                    }),
                    b.length && (d = function(t, e) {
                        return null !== t.getAttribute("data-" + e) ? e : null
                    }, P(b[0]).children("th, td").each(function(t, e) {
                        var n,
                            a = h.aoColumns[t];
                        a || W(h, 0, "Incorrect column count", 18),
                        a.mData === t && (n = d(e, "sort") || d(e, "order"), e = d(e, "filter") || d(e, "search"), null === n && null === e || (a.mData = {
                            _: t + ".display",
                            sort: null !== n ? t + ".@data-" + n : H,
                            type: null !== n ? t + ".@data-" + n : H,
                            filter: null !== e ? t + ".@data-" + e : H
                        }, a._isArrayHost = !0, at(h, t)))
                    }));
                    var S = h.oFeatures,
                        t = function() {
                            if (r.aaSorting === H) {
                                var t = h.aaSorting;
                                for (o = 0, s = t.length; o < s; o++)
                                    t[o][1] = h.aoColumns[o].asSorting[0]
                            }
                            ce(h),
                            S.bSort && L(h, "aoDrawCallback", function() {
                                var t,
                                    n;
                                h.bSorted && (t = I(h), n = {}, P.each(t, function(t, e) {
                                    n[e.src] = e.dir
                                }), R(h, null, "order", [h, t, n]), le(h))
                            }),
                                L(h, "aoDrawCallback", function() {
                                    (h.bSorted || "ssp" === E(h) || S.bDeferRender) && ce(h)
                                }, "sc");
                            var e = l.children("caption").each(function() {
                                    this._captionSide = P(this).css("caption-side")
                                }),
                                n = l.children("thead"),
                                a = (0 === n.length && (n = P("<thead/>").appendTo(l)), h.nTHead = n[0], l.children("tbody")),
                                n = (0 === a.length && (a = P("<tbody/>").insertAfter(n)), h.nTBody = a[0], l.children("tfoot"));
                            if (0 === (n = 0 === n.length && 0 < e.length && ("" !== h.oScroll.sX || "" !== h.oScroll.sY) ? P("<tfoot/>").appendTo(l) : n).length || 0 === n.children().length ? l.addClass(p.sNoFooter) : 0 < n.length && (h.nTFoot = n[0], wt(h.aoFooter, h.nTFoot)), r.aaData)
                                for (o = 0; o < r.aaData.length; o++)
                                    x(h, r.aaData[o]);
                            else
                                !h.bDeferLoading && "dom" != E(h) || ut(h, P(h.nTBody).children("tr"));
                            h.aiDisplay = h.aiDisplayMaster.slice(),
                            !(h.bInitialised = !0) === i && Jt(h)
                        };
                    L(h, "aoDrawCallback", de, "state_save"),
                        r.bStateSave ? (S.bStateSave = !0, he(h, 0, t)) : t()
                }
            }), y = null, this
        },
        c = {},
        U = /[\r\n\u2028]/g,
        V = /<.*?>/g,
        X = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,
        J = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^", "-"].join("|\\") + ")", "g"),
        q = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,
        h = function(t) {
            return !t || !0 === t || "-" === t
        },
        $ = function(t, e) {
            return c[e] || (c[e] = new RegExp(Ot(e), "g")), "string" == typeof t && "." !== e ? t.replace(/\./g, "").replace(c[e], ".") : t
        },
        N = function(t, e, n) {
            var a = [],
                r = 0,
                o = t.length;
            if (n !== H)
                for (; r < o; r++)
                    t[r] && t[r][e] && a.push(t[r][e][n]);
            else
                for (; r < o; r++)
                    t[r] && a.push(t[r][e]);
            return a
        },
        G = function(t) {
            if (!(t.length < 2))
                for (var e = t.slice().sort(), n = e[0], a = 1, r = e.length; a < r; a++) {
                    if (e[a] === n)
                        return !1;
                    n = e[a]
                }
            return !0
        },
        z = function(t) {
            if (G(t))
                return t.slice();
            var e,
                n,
                a,
                r = [],
                o = t.length,
                i = 0;
            t:
                for (n = 0; n < o; n++) {
                    for (e = t[n], a = 0; a < i; a++)
                        if (r[a] === e)
                            continue t;
                    r.push(e),
                        i++
                }
            return r
        },
        Y = function(t, e) {
            if (Array.isArray(e))
                for (var n = 0; n < e.length; n++)
                    Y(t, e[n]);
            else
                t.push(e);
            return t
        };
    function i(n) {
        var a,
            r,
            o = {};
        P.each(n, function(t, e) {
            (a = t.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ai ao as b fn i m o s ".indexOf(a[1] + " ") && (r = t.replace(a[0], a[2].toLowerCase()), o[r] = t, "o" === a[1]) && i(n[t])
        }),
            n._hungarianMap = o
    }
    function C(n, a, r) {
        var o;
        n._hungarianMap || i(n),
            P.each(a, function(t, e) {
                (o = n._hungarianMap[t]) === H || !r && a[o] !== H || ("o" === o.charAt(0) ? (a[o] || (a[o] = {}), P.extend(!0, a[o], a[t]), C(n[o], a[o], r)) : a[o] = a[t])
            })
    }
    function Z(t) {
        var e,
            n = w.defaults.oLanguage,
            a = n.sDecimal;
        a && Me(a),
        t && (e = t.sZeroRecords, !t.sEmptyTable && e && "No data available in table" === n.sEmptyTable && F(t, t, "sZeroRecords", "sEmptyTable"), !t.sLoadingRecords && e && "Loading..." === n.sLoadingRecords && F(t, t, "sZeroRecords", "sLoadingRecords"), t.sInfoThousands && (t.sThousands = t.sInfoThousands), e = t.sDecimal) && a !== e && Me(e)
    }
    Array.isArray || (Array.isArray = function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }),
    Array.prototype.includes || (Array.prototype.includes = s),
    String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    }),
    String.prototype.includes || (String.prototype.includes = s),
        w.util = {
            throttle: function(a, t) {
                var r,
                    o,
                    i = t !== H ? t : 200;
                return function() {
                    var t = this,
                        e = +new Date,
                        n = arguments;
                    r && e < r + i ? (clearTimeout(o), o = setTimeout(function() {
                        r = H,
                            a.apply(t, n)
                    }, i)) : (r = e, a.apply(t, n))
                }
            },
            escapeRegex: function(t) {
                return t.replace(J, "\\$1")
            },
            set: function(a) {
                var d;
                return P.isPlainObject(a) ? w.util.set(a._) : null === a ? function() {} : "function" == typeof a ? function(t, e, n) {
                    a(t, "set", e, n)
                } : "string" != typeof a || -1 === a.indexOf(".") && -1 === a.indexOf("[") && -1 === a.indexOf("(") ? function(t, e) {
                    t[a] = e
                } : (d = function(t, e, n) {
                    for (var a, r, o, i, l = dt(n), n = l[l.length - 1], s = 0, u = l.length - 1; s < u; s++) {
                        if ("__proto__" === l[s] || "constructor" === l[s])
                            throw new Error("Cannot set prototype values");
                        if (a = l[s].match(ft), r = l[s].match(g), a) {
                            if (l[s] = l[s].replace(ft, ""), t[l[s]] = [], (a = l.slice()).splice(0, s + 1), i = a.join("."), Array.isArray(e))
                                for (var c = 0, f = e.length; c < f; c++)
                                    d(o = {}, e[c], i),
                                        t[l[s]].push(o);
                            else
                                t[l[s]] = e;
                            return
                        }
                        r && (l[s] = l[s].replace(g, ""), t = t[l[s]](e)),
                        null !== t[l[s]] && t[l[s]] !== H || (t[l[s]] = {}),
                            t = t[l[s]]
                    }
                    n.match(g) ? t[n.replace(g, "")](e) : t[n.replace(ft, "")] = e
                }, function(t, e) {
                    return d(t, e, a)
                })
            },
            get: function(r) {
                var o,
                    d;
                return P.isPlainObject(r) ? (o = {}, P.each(r, function(t, e) {
                    e && (o[t] = w.util.get(e))
                }), function(t, e, n, a) {
                    var r = o[e] || o._;
                    return r !== H ? r(t, e, n, a) : t
                }) : null === r ? function(t) {
                    return t
                } : "function" == typeof r ? function(t, e, n, a) {
                    return r(t, e, n, a)
                } : "string" != typeof r || -1 === r.indexOf(".") && -1 === r.indexOf("[") && -1 === r.indexOf("(") ? function(t, e) {
                    return t[r]
                } : (d = function(t, e, n) {
                    var a,
                        r,
                        o;
                    if ("" !== n)
                        for (var i = dt(n), l = 0, s = i.length; l < s; l++) {
                            if (f = i[l].match(ft), a = i[l].match(g), f) {
                                if (i[l] = i[l].replace(ft, ""), "" !== i[l] && (t = t[i[l]]), r = [], i.splice(0, l + 1), o = i.join("."), Array.isArray(t))
                                    for (var u = 0, c = t.length; u < c; u++)
                                        r.push(d(t[u], e, o));
                                var f = f[0].substring(1, f[0].length - 1);
                                t = "" === f ? r : r.join(f);
                                break
                            }
                            if (a)
                                i[l] = i[l].replace(g, ""),
                                    t = t[i[l]]();
                            else {
                                if (null === t || null === t[i[l]])
                                    return null;
                                if (t === H || t[i[l]] === H)
                                    return H;
                                t = t[i[l]]
                            }
                        }
                    return t
                }, function(t, e) {
                    return d(t, e, r)
                })
            }
        };
    var r = function(t, e, n) {
        t[e] !== H && (t[n] = t[e])
    };
    function K(t) {
        r(t, "ordering", "bSort"),
            r(t, "orderMulti", "bSortMulti"),
            r(t, "orderClasses", "bSortClasses"),
            r(t, "orderCellsTop", "bSortCellsTop"),
            r(t, "order", "aaSorting"),
            r(t, "orderFixed", "aaSortingFixed"),
            r(t, "paging", "bPaginate"),
            r(t, "pagingType", "sPaginationType"),
            r(t, "pageLength", "iDisplayLength"),
            r(t, "searching", "bFilter"),
        "boolean" == typeof t.sScrollX && (t.sScrollX = t.sScrollX ? "100%" : ""),
        "boolean" == typeof t.scrollX && (t.scrollX = t.scrollX ? "100%" : "");
        var e = t.aoSearchCols;
        if (e)
            for (var n = 0, a = e.length; n < a; n++)
                e[n] && C(w.models.oSearch, e[n])
    }
    function Q(t) {
        r(t, "orderable", "bSortable"),
            r(t, "orderData", "aDataSort"),
            r(t, "orderSequence", "asSorting"),
            r(t, "orderDataType", "sortDataType");
        var e = t.aDataSort;
        "number" != typeof e || Array.isArray(e) || (t.aDataSort = [e])
    }
    function tt(t) {
        var e,
            n,
            a,
            r;
        w.__browser || (w.__browser = e = {}, r = (a = (n = P("<div/>").css({
            position: "fixed",
            top: 0,
            left: -1 * P(j).scrollLeft(),
            height: 1,
            width: 1,
            overflow: "hidden"
        }).append(P("<div/>").css({
            position: "absolute",
            top: 1,
            left: 1,
            width: 100,
            overflow: "scroll"
        }).append(P("<div/>").css({
            width: "100%",
            height: 10
        }))).appendTo("body")).children()).children(), e.barWidth = a[0].offsetWidth - a[0].clientWidth, e.bScrollOversize = 100 === r[0].offsetWidth && 100 !== a[0].clientWidth, e.bScrollbarLeft = 1 !== Math.round(r.offset().left), e.bBounding = !!n[0].getBoundingClientRect().width, n.remove()),
            P.extend(t.oBrowser, w.__browser),
            t.oScroll.iBarWidth = w.__browser.barWidth
    }
    function et(t, e, n, a, r, o) {
        var i,
            l = a,
            s = !1;
        for (n !== H && (i = n, s = !0); l !== r;)
            t.hasOwnProperty(l) && (i = s ? e(i, t[l], l, t) : t[l], s = !0, l += o);
        return i
    }
    function nt(t, e) {
        var n = w.defaults.column,
            a = t.aoColumns.length,
            n = P.extend({}, w.models.oColumn, n, {
                nTh: e || v.createElement("th"),
                sTitle: n.sTitle || (e ? e.innerHTML : ""),
                aDataSort: n.aDataSort || [a],
                mData: n.mData || a,
                idx: a
            }),
            n = (t.aoColumns.push(n), t.aoPreSearchCols);
        n[a] = P.extend({}, w.models.oSearch, n[a]),
            at(t, a, P(e).data())
    }
    function at(t, e, n) {
        function a(t) {
            return "string" == typeof t && -1 !== t.indexOf("@")
        }
        var e = t.aoColumns[e],
            r = t.oClasses,
            o = P(e.nTh),
            i = (!e.sWidthOrig && (e.sWidthOrig = o.attr("width") || null, u = (o.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/)) && (e.sWidthOrig = u[1]), n !== H && null !== n && (Q(n), C(w.defaults.column, n, !0), n.mDataProp === H || n.mData || (n.mData = n.mDataProp), n.sType && (e._sManualType = n.sType), n.className && !n.sClass && (n.sClass = n.className), n.sClass && o.addClass(n.sClass), u = e.sClass, P.extend(e, n), F(e, n, "sWidth", "sWidthOrig"), u !== e.sClass && (e.sClass = u + " " + e.sClass), n.iDataSort !== H && (e.aDataSort = [n.iDataSort]), F(e, n, "aDataSort"), e.ariaTitle || (e.ariaTitle = o.attr("aria-label"))), e.mData),
            l = A(i),
            s = e.mRender ? A(e.mRender) : null,
            u = (e._bAttrSrc = P.isPlainObject(i) && (a(i.sort) || a(i.type) || a(i.filter)), e._setter = null, e.fnGetData = function(t, e, n) {
                var a = l(t, e, H, n);
                return s && e ? s(a, e, t, n) : a
            }, e.fnSetData = function(t, e, n) {
                return b(i)(t, e, n)
            }, "number" == typeof i || e._isArrayHost || (t._rowReadObject = !0), t.oFeatures.bSort || (e.bSortable = !1, o.addClass(r.sSortableNone)), -1 !== P.inArray("asc", e.asSorting)),
            n = -1 !== P.inArray("desc", e.asSorting);
        e.bSortable && (u || n) ? u && !n ? (e.sSortingClass = r.sSortableAsc, e.sSortingClassJUI = r.sSortJUIAscAllowed) : !u && n ? (e.sSortingClass = r.sSortableDesc, e.sSortingClassJUI = r.sSortJUIDescAllowed) : (e.sSortingClass = r.sSortable, e.sSortingClassJUI = r.sSortJUI) : (e.sSortingClass = r.sSortableNone, e.sSortingClassJUI = "")
    }
    function O(t) {
        if (!1 !== t.oFeatures.bAutoWidth) {
            var e = t.aoColumns;
            ee(t);
            for (var n = 0, a = e.length; n < a; n++)
                e[n].nTh.style.width = e[n].sWidth
        }
        var r = t.oScroll;
        "" === r.sY && "" === r.sX || Qt(t),
            R(t, null, "column-sizing", [t])
    }
    function rt(t, e) {
        t = it(t, "bVisible");
        return "number" == typeof t[e] ? t[e] : null
    }
    function ot(t, e) {
        t = it(t, "bVisible"),
            e = P.inArray(e, t);
        return -1 !== e ? e : null
    }
    function T(t) {
        var n = 0;
        return P.each(t.aoColumns, function(t, e) {
            e.bVisible && "none" !== P(e.nTh).css("display") && n++
        }), n
    }
    function it(t, n) {
        var a = [];
        return P.map(t.aoColumns, function(t, e) {
            t[n] && a.push(e)
        }), a
    }
    function lt(t) {
        for (var e, n, a, r, o, i, l, s = t.aoColumns, u = t.aoData, c = w.ext.type.detect, f = 0, d = s.length; f < d; f++)
            if (l = [], !(o = s[f]).sType && o._sManualType)
                o.sType = o._sManualType;
            else if (!o.sType) {
                for (e = 0, n = c.length; e < n; e++) {
                    for (a = 0, r = u.length; a < r && (l[a] === H && (l[a] = S(t, a, f, "type")), (i = c[e](l[a], t)) || e === c.length - 1) && ("html" !== i || h(l[a])); a++)
                        ;
                    if (i) {
                        o.sType = i;
                        break
                    }
                }
                o.sType || (o.sType = "string")
            }
    }
    function st(t, e, n, a) {
        var r,
            o,
            i,
            l,
            s = t.aoColumns;
        if (e)
            for (r = e.length - 1; 0 <= r; r--)
                for (var u, c = (u = e[r]).target !== H ? u.target : u.targets !== H ? u.targets : u.aTargets, f = 0, d = (c = Array.isArray(c) ? c : [c]).length; f < d; f++)
                    if ("number" == typeof c[f] && 0 <= c[f]) {
                        for (; s.length <= c[f];)
                            nt(t);
                        a(c[f], u)
                    } else if ("number" == typeof c[f] && c[f] < 0)
                        a(s.length + c[f], u);
                    else if ("string" == typeof c[f])
                        for (i = 0, l = s.length; i < l; i++)
                            "_all" != c[f] && !P(s[i].nTh).hasClass(c[f]) || a(i, u);
        if (n)
            for (r = 0, o = n.length; r < o; r++)
                a(r, n[r])
    }
    function x(t, e, n, a) {
        for (var r = t.aoData.length, o = P.extend(!0, {}, w.models.oRow, {
            src: n ? "dom" : "data",
            idx: r
        }), i = (o._aData = e, t.aoData.push(o), t.aoColumns), l = 0, s = i.length; l < s; l++)
            i[l].sType = null;
        t.aiDisplayMaster.push(r);
        e = t.rowIdFn(e);
        return e !== H && (t.aIds[e] = o), !n && t.oFeatures.bDeferRender || St(t, r, n, a), r
    }
    function ut(n, t) {
        var a;
        return (t = t instanceof P ? t : P(t)).map(function(t, e) {
            return a = mt(n, e), x(n, a.data, e, a.cells)
        })
    }
    function S(t, e, n, a) {
        "search" === a ? a = "filter" : "order" === a && (a = "sort");
        var r = t.iDraw,
            o = t.aoColumns[n],
            i = t.aoData[e]._aData,
            l = o.sDefaultContent,
            s = o.fnGetData(i, a, {
                settings: t,
                row: e,
                col: n
            });
        if (s === H)
            return t.iDrawError != r && null === l && (W(t, 0, "Requested unknown parameter " + ("function" == typeof o.mData ? "{function}" : "'" + o.mData + "'") + " for row " + e + ", column " + n, 4), t.iDrawError = r), l;
        if (s !== i && null !== s || null === l || a === H) {
            if ("function" == typeof s)
                return s.call(i)
        } else
            s = l;
        return null === s && "display" === a ? "" : "filter" === a && (e = w.ext.type.search)[o.sType] ? e[o.sType](s) : s
    }
    function ct(t, e, n, a) {
        var r = t.aoColumns[n],
            o = t.aoData[e]._aData;
        r.fnSetData(o, a, {
            settings: t,
            row: e,
            col: n
        })
    }
    var ft = /\[.*?\]$/,
        g = /\(\)$/;
    function dt(t) {
        return P.map(t.match(/(\\.|[^\.])+/g) || [""], function(t) {
            return t.replace(/\\\./g, ".")
        })
    }
    var A = w.util.get,
        b = w.util.set;
    function ht(t) {
        return N(t.aoData, "_aData")
    }
    function pt(t) {
        t.aoData.length = 0,
            t.aiDisplayMaster.length = 0,
            t.aiDisplay.length = 0,
            t.aIds = {}
    }
    function gt(t, e, n) {
        for (var a = -1, r = 0, o = t.length; r < o; r++)
            t[r] == e ? a = r : t[r] > e && t[r]--;
        -1 != a && n === H && t.splice(a, 1)
    }
    function bt(n, a, t, e) {
        function r(t, e) {
            for (; t.childNodes.length;)
                t.removeChild(t.firstChild);
            t.innerHTML = S(n, a, e, "display")
        }
        var o,
            i,
            l = n.aoData[a];
        if ("dom" !== t && (t && "auto" !== t || "dom" !== l.src)) {
            var s = l.anCells;
            if (s)
                if (e !== H)
                    r(s[e], e);
                else
                    for (o = 0, i = s.length; o < i; o++)
                        r(s[o], o)
        } else
            l._aData = mt(n, l, e, e === H ? H : l._aData).data;
        l._aSortData = null,
            l._aFilterData = null;
        var u = n.aoColumns;
        if (e !== H)
            u[e].sType = null;
        else {
            for (o = 0, i = u.length; o < i; o++)
                u[o].sType = null;
            vt(n, l)
        }
    }
    function mt(t, e, n, a) {
        function r(t, e) {
            var n;
            "string" == typeof t && -1 !== (n = t.indexOf("@")) && (n = t.substring(n + 1), b(t)(a, e.getAttribute(n)))
        }
        function o(t) {
            n !== H && n !== f || (l = d[f], s = t.innerHTML.trim(), l && l._bAttrSrc ? (b(l.mData._)(a, s), r(l.mData.sort, t), r(l.mData.type, t), r(l.mData.filter, t)) : h ? (l._setter || (l._setter = b(l.mData)), l._setter(a, s)) : a[f] = s),
                f++
        }
        var i,
            l,
            s,
            u = [],
            c = e.firstChild,
            f = 0,
            d = t.aoColumns,
            h = t._rowReadObject;
        a = a !== H ? a : h ? {} : [];
        if (c)
            for (; c;)
                "TD" != (i = c.nodeName.toUpperCase()) && "TH" != i || (o(c), u.push(c)),
                    c = c.nextSibling;
        else
            for (var p = 0, g = (u = e.anCells).length; p < g; p++)
                o(u[p]);
        var e = e.firstChild ? e : e.nTr;
        return e && (e = e.getAttribute("id")) && b(t.rowId)(a, e), {
            data: a,
            cells: u
        }
    }
    function St(t, e, n, a) {
        var r,
            o,
            i,
            l,
            s,
            u,
            c = t.aoData[e],
            f = c._aData,
            d = [];
        if (null === c.nTr) {
            for (r = n || v.createElement("tr"), c.nTr = r, c.anCells = d, r._DT_RowIndex = e, vt(t, c), l = 0, s = t.aoColumns.length; l < s; l++)
                i = t.aoColumns[l],
                (o = (u = !n) ? v.createElement(i.sCellType) : a[l]) || W(t, 0, "Incorrect column count", 18),
                    o._DT_CellIndex = {
                        row: e,
                        column: l
                    },
                    d.push(o),
                !u && (!i.mRender && i.mData === l || P.isPlainObject(i.mData) && i.mData._ === l + ".display") || (o.innerHTML = S(t, e, l, "display")),
                i.sClass && (o.className += " " + i.sClass),
                    i.bVisible && !n ? r.appendChild(o) : !i.bVisible && n && o.parentNode.removeChild(o),
                i.fnCreatedCell && i.fnCreatedCell.call(t.oInstance, o, S(t, e, l), f, e, l);
            R(t, "aoRowCreatedCallback", null, [r, f, e, d])
        }
    }
    function vt(t, e) {
        var n = e.nTr,
            a = e._aData;
        n && ((t = t.rowIdFn(a)) && (n.id = t), a.DT_RowClass && (t = a.DT_RowClass.split(" "), e.__rowc = e.__rowc ? z(e.__rowc.concat(t)) : t, P(n).removeClass(e.__rowc.join(" ")).addClass(a.DT_RowClass)), a.DT_RowAttr && P(n).attr(a.DT_RowAttr), a.DT_RowData) && P(n).data(a.DT_RowData)
    }
    function yt(t) {
        var e,
            n,
            a,
            r = t.nTHead,
            o = t.nTFoot,
            i = 0 === P("th, td", r).length,
            l = t.oClasses,
            s = t.aoColumns;
        for (i && (n = P("<tr/>").appendTo(r)), c = 0, f = s.length; c < f; c++)
            a = s[c],
                e = P(a.nTh).addClass(a.sClass),
            i && e.appendTo(n),
            t.oFeatures.bSort && (e.addClass(a.sSortingClass), !1 !== a.bSortable) && (e.attr("tabindex", t.iTabIndex).attr("aria-controls", t.sTableId), ue(t, a.nTh, c)),
            a.sTitle != e[0].innerHTML && e.html(a.sTitle),
                ve(t, "header")(t, e, a, l);
        if (i && wt(t.aoHeader, r), P(r).children("tr").children("th, td").addClass(l.sHeaderTH), P(o).children("tr").children("th, td").addClass(l.sFooterTH), null !== o)
            for (var u = t.aoFooter[0], c = 0, f = u.length; c < f; c++)
                (a = s[c]) ? (a.nTf = u[c].cell, a.sClass && P(a.nTf).addClass(a.sClass)) : W(t, 0, "Incorrect column count", 18)
    }
    function Dt(t, e, n) {
        var a,
            r,
            o,
            i,
            l,
            s,
            u,
            c,
            f,
            d = [],
            h = [],
            p = t.aoColumns.length;
        if (e) {
            for (n === H && (n = !1), a = 0, r = e.length; a < r; a++) {
                for (d[a] = e[a].slice(), d[a].nTr = e[a].nTr, o = p - 1; 0 <= o; o--)
                    t.aoColumns[o].bVisible || n || d[a].splice(o, 1);
                h.push([])
            }
            for (a = 0, r = d.length; a < r; a++) {
                if (u = d[a].nTr)
                    for (; s = u.firstChild;)
                        u.removeChild(s);
                for (o = 0, i = d[a].length; o < i; o++)
                    if (f = c = 1, h[a][o] === H) {
                        for (u.appendChild(d[a][o].cell), h[a][o] = 1; d[a + c] !== H && d[a][o].cell == d[a + c][o].cell;)
                            h[a + c][o] = 1,
                                c++;
                        for (; d[a][o + f] !== H && d[a][o].cell == d[a][o + f].cell;) {
                            for (l = 0; l < c; l++)
                                h[a + l][o + f] = 1;
                            f++
                        }
                        P(d[a][o].cell).attr("rowspan", c).attr("colspan", f)
                    }
            }
        }
    }
    function y(t, e) {
        n = "ssp" == E(s = t),
        (l = s.iInitDisplayStart) !== H && -1 !== l && (s._iDisplayStart = !n && l >= s.fnRecordsDisplay() ? 0 : l, s.iInitDisplayStart = -1);
        var n = R(t, "aoPreDrawCallback", "preDraw", [t]);
        if (-1 !== P.inArray(!1, n))
            D(t, !1);
        else {
            var a = [],
                r = 0,
                o = t.asStripeClasses,
                i = o.length,
                l = t.oLanguage,
                s = "ssp" == E(t),
                u = t.aiDisplay,
                n = t._iDisplayStart,
                c = t.fnDisplayEnd();
            if (t.bDrawing = !0, t.bDeferLoading)
                t.bDeferLoading = !1,
                    t.iDraw++,
                    D(t, !1);
            else if (s) {
                if (!t.bDestroying && !e)
                    return void xt(t)
            } else
                t.iDraw++;
            if (0 !== u.length)
                for (var f = s ? t.aoData.length : c, d = s ? 0 : n; d < f; d++) {
                    var h,
                        p = u[d],
                        g = t.aoData[p],
                        b = (null === g.nTr && St(t, p), g.nTr);
                    0 !== i && (h = o[r % i], g._sRowStripe != h) && (P(b).removeClass(g._sRowStripe).addClass(h), g._sRowStripe = h),
                        R(t, "aoRowCallback", null, [b, g._aData, r, d, p]),
                        a.push(b),
                        r++
                }
            else {
                e = l.sZeroRecords;
                1 == t.iDraw && "ajax" == E(t) ? e = l.sLoadingRecords : l.sEmptyTable && 0 === t.fnRecordsTotal() && (e = l.sEmptyTable),
                    a[0] = P("<tr/>", {
                        class: i ? o[0] : ""
                    }).append(P("<td />", {
                        valign: "top",
                        colSpan: T(t),
                        class: t.oClasses.sRowEmpty
                    }).html(e))[0]
            }
            R(t, "aoHeaderCallback", "header", [P(t.nTHead).children("tr")[0], ht(t), n, c, u]),
                R(t, "aoFooterCallback", "footer", [P(t.nTFoot).children("tr")[0], ht(t), n, c, u]);
            s = P(t.nTBody);
            s.children().detach(),
                s.append(P(a)),
                R(t, "aoDrawCallback", "draw", [t]),
                t.bSorted = !1,
                t.bFiltered = !1,
                t.bDrawing = !1
        }
    }
    function u(t, e) {
        var n = t.oFeatures,
            a = n.bSort,
            n = n.bFilter;
        a && ie(t),
            n ? Rt(t, t.oPreviousSearch) : t.aiDisplay = t.aiDisplayMaster.slice(),
        !0 !== e && (t._iDisplayStart = 0),
            t._drawHold = e,
            y(t),
            t._drawHold = !1
    }
    function _t(t) {
        for (var e, n, a, r, o, i, l, s = t.oClasses, u = P(t.nTable), u = P("<div/>").insertBefore(u), c = t.oFeatures, f = P("<div/>", {
            id: t.sTableId + "_wrapper",
            class: s.sWrapper + (t.nTFoot ? "" : " " + s.sNoFooter)
        }), d = (t.nHolding = u[0], t.nTableWrapper = f[0], t.nTableReinsertBefore = t.nTable.nextSibling, t.sDom.split("")), h = 0; h < d.length; h++) {
            if (e = null, "<" == (n = d[h])) {
                if (a = P("<div/>")[0], "'" == (r = d[h + 1]) || '"' == r) {
                    for (o = "", i = 2; d[h + i] != r;)
                        o += d[h + i],
                            i++;
                    "H" == o ? o = s.sJUIHeader : "F" == o && (o = s.sJUIFooter),
                        -1 != o.indexOf(".") ? (l = o.split("."), a.id = l[0].substr(1, l[0].length - 1), a.className = l[1]) : "#" == o.charAt(0) ? a.id = o.substr(1, o.length - 1) : a.className = o,
                        h += i
                }
                f.append(a),
                    f = P(a)
            } else if (">" == n)
                f = f.parent();
            else if ("l" == n && c.bPaginate && c.bLengthChange)
                e = Gt(t);
            else if ("f" == n && c.bFilter)
                e = Lt(t);
            else if ("r" == n && c.bProcessing)
                e = Zt(t);
            else if ("t" == n)
                e = Kt(t);
            else if ("i" == n && c.bInfo)
                e = Ut(t);
            else if ("p" == n && c.bPaginate)
                e = zt(t);
            else if (0 !== w.ext.feature.length)
                for (var p = w.ext.feature, g = 0, b = p.length; g < b; g++)
                    if (n == p[g].cFeature) {
                        e = p[g].fnInit(t);
                        break
                    }
            e && ((l = t.aanFeatures)[n] || (l[n] = []), l[n].push(e), f.append(e))
        }
        u.replaceWith(f),
            t.nHolding = null
    }
    function wt(t, e) {
        var n,
            a,
            r,
            o,
            i,
            l,
            s,
            u,
            c,
            f,
            d = P(e).children("tr");
        for (t.splice(0, t.length), r = 0, l = d.length; r < l; r++)
            t.push([]);
        for (r = 0, l = d.length; r < l; r++)
            for (a = (n = d[r]).firstChild; a;) {
                if ("TD" == a.nodeName.toUpperCase() || "TH" == a.nodeName.toUpperCase())
                    for (u = (u = +a.getAttribute("colspan")) && 0 != u && 1 != u ? u : 1, c = (c = +a.getAttribute("rowspan")) && 0 != c && 1 != c ? c : 1, s = function(t, e, n) {
                        for (var a = t[e]; a[n];)
                            n++;
                        return n
                    }(t, r, 0), f = 1 == u, i = 0; i < u; i++)
                        for (o = 0; o < c; o++)
                            t[r + o][s + i] = {
                                cell: a,
                                unique: f
                            },
                                t[r + o].nTr = n;
                a = a.nextSibling
            }
    }
    function Ct(t, e, n) {
        var a = [];
        n || (n = t.aoHeader, e && wt(n = [], e));
        for (var r = 0, o = n.length; r < o; r++)
            for (var i = 0, l = n[r].length; i < l; i++)
                !n[r][i].unique || a[i] && t.bSortCellsTop || (a[i] = n[r][i].cell);
        return a
    }
    function Tt(r, t, n) {
        function e(t) {
            var e = r.jqXHR ? r.jqXHR.status : null;
            (null === t || "number" == typeof e && 204 == e) && Ft(r, t = {}, []),
            (e = t.error || t.sError) && W(r, 0, e),
                r.json = t,
                R(r, null, "xhr", [r, t, r.jqXHR]),
                n(t)
        }
        R(r, "aoServerParams", "serverParams", [t]),
        t && Array.isArray(t) && (a = {}, o = /(.*?)\[\]$/, P.each(t, function(t, e) {
            var n = e.name.match(o);
            n ? (n = n[0], a[n] || (a[n] = []), a[n].push(e.value)) : a[e.name] = e.value
        }), t = a);
        var a,
            o,
            i,
            l = r.ajax,
            s = r.oInstance,
            u = (P.isPlainObject(l) && l.data && (u = "function" == typeof (i = l.data) ? i(t, r) : i, t = "function" == typeof i && u ? u : P.extend(!0, t, u), delete l.data), {
                data: t,
                success: e,
                dataType: "json",
                cache: !1,
                type: r.sServerMethod,
                error: function(t, e, n) {
                    var a = R(r, null, "xhr", [r, null, r.jqXHR]);
                    -1 === P.inArray(!0, a) && ("parsererror" == e ? W(r, 0, "Invalid JSON response", 1) : 4 === t.readyState && W(r, 0, "Ajax error", 7)),
                        D(r, !1)
                }
            });
        r.oAjaxData = t,
            R(r, null, "preXhr", [r, t]),
            r.fnServerData ? r.fnServerData.call(s, r.sAjaxSource, P.map(t, function(t, e) {
                return {
                    name: e,
                    value: t
                }
            }), e, r) : r.sAjaxSource || "string" == typeof l ? r.jqXHR = P.ajax(P.extend(u, {
                url: l || r.sAjaxSource
            })) : "function" == typeof l ? r.jqXHR = l.call(s, t, e, r) : (r.jqXHR = P.ajax(P.extend(u, l)), l.data = i)
    }
    function xt(e) {
        e.iDraw++,
            D(e, !0);
        var n = e._drawHold;
        Tt(e, At(e), function(t) {
            e._drawHold = n,
                It(e, t),
                e._drawHold = !1
        })
    }
    function At(t) {
        for (var e, n, a, r = t.aoColumns, o = r.length, i = t.oFeatures, l = t.oPreviousSearch, s = t.aoPreSearchCols, u = [], c = I(t), f = t._iDisplayStart, d = !1 !== i.bPaginate ? t._iDisplayLength : -1, h = function(t, e) {
            u.push({
                name: t,
                value: e
            })
        }, p = (h("sEcho", t.iDraw), h("iColumns", o), h("sColumns", N(r, "sName").join(",")), h("iDisplayStart", f), h("iDisplayLength", d), {
            draw: t.iDraw,
            columns: [],
            order: [],
            start: f,
            length: d,
            search: {
                value: l.sSearch,
                regex: l.bRegex
            }
        }), g = 0; g < o; g++)
            n = r[g],
                a = s[g],
                e = "function" == typeof n.mData ? "function" : n.mData,
                p.columns.push({
                    data: e,
                    name: n.sName,
                    searchable: n.bSearchable,
                    orderable: n.bSortable,
                    search: {
                        value: a.sSearch,
                        regex: a.bRegex
                    }
                }),
                h("mDataProp_" + g, e),
            i.bFilter && (h("sSearch_" + g, a.sSearch), h("bRegex_" + g, a.bRegex), h("bSearchable_" + g, n.bSearchable)),
            i.bSort && h("bSortable_" + g, n.bSortable);
        i.bFilter && (h("sSearch", l.sSearch), h("bRegex", l.bRegex)),
        i.bSort && (P.each(c, function(t, e) {
            p.order.push({
                column: e.col,
                dir: e.dir
            }),
                h("iSortCol_" + t, e.col),
                h("sSortDir_" + t, e.dir)
        }), h("iSortingCols", c.length));
        f = w.ext.legacy.ajax;
        return null === f ? t.sAjaxSource ? u : p : f ? u : p
    }
    function It(t, n) {
        function e(t, e) {
            return n[t] !== H ? n[t] : n[e]
        }
        var a = Ft(t, n),
            r = e("sEcho", "draw"),
            o = e("iTotalRecords", "recordsTotal"),
            i = e("iTotalDisplayRecords", "recordsFiltered");
        if (r !== H) {
            if (+r < t.iDraw)
                return;
            t.iDraw = +r
        }
        a = a || [],
            pt(t),
            t._iRecordsTotal = parseInt(o, 10),
            t._iRecordsDisplay = parseInt(i, 10);
        for (var l = 0, s = a.length; l < s; l++)
            x(t, a[l]);
        t.aiDisplay = t.aiDisplayMaster.slice(),
            y(t, !0),
        t._bInitComplete || qt(t, n),
            D(t, !1)
    }
    function Ft(t, e, n) {
        t = P.isPlainObject(t.ajax) && t.ajax.dataSrc !== H ? t.ajax.dataSrc : t.sAjaxDataProp;
        if (!n)
            return "data" === t ? e.aaData || e[t] : "" !== t ? A(t)(e) : e;
        b(t)(e, n)
    }
    function Lt(n) {
        function e(t) {
            i.f;
            var e = this.value || "";
            o.return && "Enter" !== t.key || e != o.sSearch && (Rt(n, {
                sSearch: e,
                bRegex: o.bRegex,
                bSmart: o.bSmart,
                bCaseInsensitive: o.bCaseInsensitive,
                return: o.return
            }), n._iDisplayStart = 0, y(n))
        }
        var t = n.oClasses,
            a = n.sTableId,
            r = n.oLanguage,
            o = n.oPreviousSearch,
            i = n.aanFeatures,
            l = '<input type="search" class="' + t.sFilterInput + '"/>',
            s = (s = r.sSearch).match(/_INPUT_/) ? s.replace("_INPUT_", l) : s + l,
            l = P("<div/>", {
                id: i.f ? null : a + "_filter",
                class: t.sFilter
            }).append(P("<label/>").append(s)),
            t = null !== n.searchDelay ? n.searchDelay : "ssp" === E(n) ? 400 : 0,
            u = P("input", l).val(o.sSearch).attr("placeholder", r.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT", t ? ne(e, t) : e).on("mouseup.DT", function(t) {
                setTimeout(function() {
                    e.call(u[0], t)
                }, 10)
            }).on("keypress.DT", function(t) {
                if (13 == t.keyCode)
                    return !1
            }).attr("aria-controls", a);
        return P(n.nTable).on("search.dt.DT", function(t, e) {
            if (n === e)
                try {
                    u[0] !== v.activeElement && u.val(o.sSearch)
                } catch (t) {}
        }), l[0]
    }
    function Rt(t, e, n) {
        function a(t) {
            o.sSearch = t.sSearch,
                o.bRegex = t.bRegex,
                o.bSmart = t.bSmart,
                o.bCaseInsensitive = t.bCaseInsensitive,
                o.return = t.return
        }
        function r(t) {
            return t.bEscapeRegex !== H ? !t.bEscapeRegex : t.bRegex
        }
        var o = t.oPreviousSearch,
            i = t.aoPreSearchCols;
        if (lt(t), "ssp" != E(t)) {
            Ht(t, e.sSearch, n, r(e), e.bSmart, e.bCaseInsensitive),
                a(e);
            for (var l = 0; l < i.length; l++)
                jt(t, i[l].sSearch, l, r(i[l]), i[l].bSmart, i[l].bCaseInsensitive);
            Pt(t)
        } else
            a(e);
        t.bFiltered = !0,
            R(t, null, "search", [t])
    }
    function Pt(t) {
        for (var e, n, a = w.ext.search, r = t.aiDisplay, o = 0, i = a.length; o < i; o++) {
            for (var l = [], s = 0, u = r.length; s < u; s++)
                n = r[s],
                    e = t.aoData[n],
                a[o](t, e._aFilterData, n, e._aData, s) && l.push(n);
            r.length = 0,
                P.merge(r, l)
        }
    }
    function jt(t, e, n, a, r, o) {
        if ("" !== e) {
            for (var i, l = [], s = t.aiDisplay, u = Nt(e, a, r, o), c = 0; c < s.length; c++)
                i = t.aoData[s[c]]._aFilterData[n],
                u.test(i) && l.push(s[c]);
            t.aiDisplay = l
        }
    }
    function Ht(t, e, n, a, r, o) {
        var i,
            l,
            s,
            u = Nt(e, a, r, o),
            r = t.oPreviousSearch.sSearch,
            o = t.aiDisplayMaster,
            c = [];
        if (0 !== w.ext.search.length && (n = !0), l = Wt(t), e.length <= 0)
            t.aiDisplay = o.slice();
        else {
            for ((l || n || a || r.length > e.length || 0 !== e.indexOf(r) || t.bSorted) && (t.aiDisplay = o.slice()), i = t.aiDisplay, s = 0; s < i.length; s++)
                u.test(t.aoData[i[s]]._sFilterRow) && c.push(i[s]);
            t.aiDisplay = c
        }
    }
    function Nt(t, e, n, a) {
        return t = e ? t : Ot(t), n && (t = "^(?=.*?" + P.map(t.match(/["\u201C][^"\u201D]+["\u201D]|[^ ]+/g) || [""], function(t) {
            var e;
            return '"' === t.charAt(0) ? t = (e = t.match(/^"(.*)"$/)) ? e[1] : t : "“" === t.charAt(0) && (t = (e = t.match(/^\u201C(.*)\u201D$/)) ? e[1] : t), t.replace('"', "")
        }).join(")(?=.*?") + ").*$"), new RegExp(t, a ? "i" : "")
    }
    var Ot = w.util.escapeRegex,
        kt = P("<div>")[0],
        Mt = kt.textContent !== H;
    function Wt(t) {
        for (var e, n, a, r, o, i = t.aoColumns, l = !1, s = 0, u = t.aoData.length; s < u; s++)
            if (!(o = t.aoData[s])._aFilterData) {
                for (a = [], e = 0, n = i.length; e < n; e++)
                    i[e].bSearchable ? "string" != typeof (r = null === (r = S(t, s, e, "filter")) ? "" : r) && r.toString && (r = r.toString()) : r = "",
                    r.indexOf && -1 !== r.indexOf("&") && (kt.innerHTML = r, r = Mt ? kt.textContent : kt.innerText),
                    r.replace && (r = r.replace(/[\r\n\u2028]/g, "")),
                        a.push(r);
                o._aFilterData = a,
                    o._sFilterRow = a.join("  "),
                    l = !0
            }
        return l
    }
    function Et(t) {
        return {
            search: t.sSearch,
            smart: t.bSmart,
            regex: t.bRegex,
            caseInsensitive: t.bCaseInsensitive
        }
    }
    function Bt(t) {
        return {
            sSearch: t.search,
            bSmart: t.smart,
            bRegex: t.regex,
            bCaseInsensitive: t.caseInsensitive
        }
    }
    function Ut(t) {
        var e = t.sTableId,
            n = t.aanFeatures.i,
            a = P("<div/>", {
                class: t.oClasses.sInfo,
                id: n ? null : e + "_info"
            });
        return n || (t.aoDrawCallback.push({
            fn: Vt,
            sName: "information"
        }), a.attr("role", "status").attr("aria-live", "polite"), P(t.nTable).attr("aria-describedby", e + "_info")), a[0]
    }
    function Vt(t) {
        var e,
            n,
            a,
            r,
            o,
            i,
            l = t.aanFeatures.i;
        0 !== l.length && (i = t.oLanguage, e = t._iDisplayStart + 1, n = t.fnDisplayEnd(), a = t.fnRecordsTotal(), o = (r = t.fnRecordsDisplay()) ? i.sInfo : i.sInfoEmpty, r !== a && (o += " " + i.sInfoFiltered), o = Xt(t, o += i.sInfoPostFix), null !== (i = i.fnInfoCallback) && (o = i.call(t.oInstance, t, e, n, a, r, o)), P(l).html(o))
    }
    function Xt(t, e) {
        var n = t.fnFormatNumber,
            a = t._iDisplayStart + 1,
            r = t._iDisplayLength,
            o = t.fnRecordsDisplay(),
            i = -1 === r;
        return e.replace(/_START_/g, n.call(t, a)).replace(/_END_/g, n.call(t, t.fnDisplayEnd())).replace(/_MAX_/g, n.call(t, t.fnRecordsTotal())).replace(/_TOTAL_/g, n.call(t, o)).replace(/_PAGE_/g, n.call(t, i ? 1 : Math.ceil(a / r))).replace(/_PAGES_/g, n.call(t, i ? 1 : Math.ceil(o / r)))
    }
    function Jt(n) {
        var a,
            t,
            e,
            r = n.iInitDisplayStart,
            o = n.aoColumns,
            i = n.oFeatures,
            l = n.bDeferLoading;
        if (n.bInitialised) {
            for (_t(n), yt(n), Dt(n, n.aoHeader), Dt(n, n.aoFooter), D(n, !0), i.bAutoWidth && ee(n), a = 0, t = o.length; a < t; a++)
                (e = o[a]).sWidth && (e.nTh.style.width = M(e.sWidth));
            R(n, null, "preInit", [n]),
                u(n);
            i = E(n);
            "ssp" == i && !l || ("ajax" == i ? Tt(n, [], function(t) {
                var e = Ft(n, t);
                for (a = 0; a < e.length; a++)
                    x(n, e[a]);
                n.iInitDisplayStart = r,
                    u(n),
                    D(n, !1),
                    qt(n, t)
            }) : (D(n, !1), qt(n)))
        } else
            setTimeout(function() {
                Jt(n)
            }, 200)
    }
    function qt(t, e) {
        t._bInitComplete = !0,
        (e || t.oInit.aaData) && O(t),
            R(t, null, "plugin-init", [t, e]),
            R(t, "aoInitComplete", "init", [t, e])
    }
    function $t(t, e) {
        e = parseInt(e, 10);
        t._iDisplayLength = e,
            Se(t),
            R(t, null, "length", [t, e])
    }
    function Gt(a) {
        for (var t = a.oClasses, e = a.sTableId, n = a.aLengthMenu, r = Array.isArray(n[0]), o = r ? n[0] : n, i = r ? n[1] : n, l = P("<select/>", {
            name: e + "_length",
            "aria-controls": e,
            class: t.sLengthSelect
        }), s = 0, u = o.length; s < u; s++)
            l[0][s] = new Option("number" == typeof i[s] ? a.fnFormatNumber(i[s]) : i[s], o[s]);
        var c = P("<div><label/></div>").addClass(t.sLength);
        return a.aanFeatures.l || (c[0].id = e + "_length"), c.children().append(a.oLanguage.sLengthMenu.replace("_MENU_", l[0].outerHTML)), P("select", c).val(a._iDisplayLength).on("change.DT", function(t) {
            $t(a, P(this).val()),
                y(a)
        }), P(a.nTable).on("length.dt.DT", function(t, e, n) {
            a === e && P("select", c).val(n)
        }), c[0]
    }
    function zt(t) {
        function c(t) {
            y(t)
        }
        var e = t.sPaginationType,
            f = w.ext.pager[e],
            d = "function" == typeof f,
            e = P("<div/>").addClass(t.oClasses.sPaging + e)[0],
            h = t.aanFeatures;
        return d || f.fnInit(t, e, c), h.p || (e.id = t.sTableId + "_paginate", t.aoDrawCallback.push({
            fn: function(t) {
                if (d)
                    for (var e = t._iDisplayStart, n = t._iDisplayLength, a = t.fnRecordsDisplay(), r = -1 === n, o = r ? 0 : Math.ceil(e / n), i = r ? 1 : Math.ceil(a / n), l = f(o, i), s = 0, u = h.p.length; s < u; s++)
                        ve(t, "pageButton")(t, h.p[s], s, l, o, i);
                else
                    f.fnUpdate(t, c)
            },
            sName: "pagination"
        })), e
    }
    function Yt(t, e, n) {
        var a = t._iDisplayStart,
            r = t._iDisplayLength,
            o = t.fnRecordsDisplay(),
            o = (0 === o || -1 === r ? a = 0 : "number" == typeof e ? o < (a = e * r) && (a = 0) : "first" == e ? a = 0 : "previous" == e ? (a = 0 <= r ? a - r : 0) < 0 && (a = 0) : "next" == e ? a + r < o && (a += r) : "last" == e ? a = Math.floor((o - 1) / r) * r : W(t, 0, "Unknown paging action: " + e, 5), t._iDisplayStart !== a);
        return t._iDisplayStart = a, o ? (R(t, null, "page", [t]), n && y(t)) : R(t, null, "page-nc", [t]), o
    }
    function Zt(t) {
        return P("<div/>", {
            id: t.aanFeatures.r ? null : t.sTableId + "_processing",
            class: t.oClasses.sProcessing,
            role: "status"
        }).html(t.oLanguage.sProcessing).append("<div><div></div><div></div><div></div><div></div></div>").insertBefore(t.nTable)[0]
    }
    function D(t, e) {
        t.oFeatures.bProcessing && P(t.aanFeatures.r).css("display", e ? "block" : "none"),
            R(t, null, "processing", [t, e])
    }
    function Kt(t) {
        var e,
            n,
            a,
            r,
            o,
            i,
            l,
            s,
            u,
            c,
            f,
            d,
            h = P(t.nTable),
            p = t.oScroll;
        return "" === p.sX && "" === p.sY ? t.nTable : (e = p.sX, n = p.sY, a = t.oClasses, o = (r = h.children("caption")).length ? r[0]._captionSide : null, s = P(h[0].cloneNode(!1)), i = P(h[0].cloneNode(!1)), u = function(t) {
            return t ? M(t) : null
        }, (l = h.children("tfoot")).length || (l = null), s = P(f = "<div/>", {
            class: a.sScrollWrapper
        }).append(P(f, {
            class: a.sScrollHead
        }).css({
            overflow: "hidden",
            position: "relative",
            border: 0,
            width: e ? u(e) : "100%"
        }).append(P(f, {
            class: a.sScrollHeadInner
        }).css({
            "box-sizing": "content-box",
            width: p.sXInner || "100%"
        }).append(s.removeAttr("id").css("margin-left", 0).append("top" === o ? r : null).append(h.children("thead"))))).append(P(f, {
            class: a.sScrollBody
        }).css({
            position: "relative",
            overflow: "auto",
            width: u(e)
        }).append(h)), l && s.append(P(f, {
            class: a.sScrollFoot
        }).css({
            overflow: "hidden",
            border: 0,
            width: e ? u(e) : "100%"
        }).append(P(f, {
            class: a.sScrollFootInner
        }).append(i.removeAttr("id").css("margin-left", 0).append("bottom" === o ? r : null).append(h.children("tfoot"))))), u = s.children(), c = u[0], f = u[1], d = l ? u[2] : null, e && P(f).on("scroll.DT", function(t) {
            var e = this.scrollLeft;
            c.scrollLeft = e,
            l && (d.scrollLeft = e)
        }), P(f).css("max-height", n), p.bCollapse || P(f).css("height", n), t.nScrollHead = c, t.nScrollBody = f, t.nScrollFoot = d, t.aoDrawCallback.push({
            fn: Qt,
            sName: "scrolling"
        }), s[0])
    }
    function Qt(n) {
        function t(t) {
            (t = t.style).paddingTop = "0",
                t.paddingBottom = "0",
                t.borderTopWidth = "0",
                t.borderBottomWidth = "0",
                t.height = 0
        }
        var e,
            a,
            r,
            o,
            i,
            l = n.oScroll,
            s = l.sX,
            u = l.sXInner,
            c = l.sY,
            l = l.iBarWidth,
            f = P(n.nScrollHead),
            d = f[0].style,
            h = f.children("div"),
            p = h[0].style,
            h = h.children("table"),
            g = n.nScrollBody,
            b = P(g),
            m = g.style,
            S = P(n.nScrollFoot).children("div"),
            v = S.children("table"),
            y = P(n.nTHead),
            D = P(n.nTable),
            _ = D[0],
            w = _.style,
            C = n.nTFoot ? P(n.nTFoot) : null,
            T = n.oBrowser,
            x = T.bScrollOversize,
            A = (N(n.aoColumns, "nTh"), []),
            I = [],
            F = [],
            L = [],
            R = g.scrollHeight > g.clientHeight;
        n.scrollBarVis !== R && n.scrollBarVis !== H ? (n.scrollBarVis = R, O(n)) : (n.scrollBarVis = R, D.children("thead, tfoot").remove(), C && (R = C.clone().prependTo(D), i = C.find("tr"), a = R.find("tr"), R.find("[id]").removeAttr("id")), R = y.clone().prependTo(D), y = y.find("tr"), e = R.find("tr"), R.find("th, td").removeAttr("tabindex"), R.find("[id]").removeAttr("id"), s || (m.width = "100%", f[0].style.width = "100%"), P.each(Ct(n, R), function(t, e) {
            r = rt(n, t),
                e.style.width = n.aoColumns[r].sWidth
        }), C && k(function(t) {
            t.style.width = ""
        }, a), f = D.outerWidth(), "" === s ? (w.width = "100%", x && (D.find("tbody").height() > g.offsetHeight || "scroll" == b.css("overflow-y")) && (w.width = M(D.outerWidth() - l)), f = D.outerWidth()) : "" !== u && (w.width = M(u), f = D.outerWidth()), k(t, e), k(function(t) {
            var e = j.getComputedStyle ? j.getComputedStyle(t).width : M(P(t).width());
            F.push(t.innerHTML),
                A.push(e)
        }, e), k(function(t, e) {
            t.style.width = A[e]
        }, y), P(e).css("height", 0), C && (k(t, a), k(function(t) {
            L.push(t.innerHTML),
                I.push(M(P(t).css("width")))
        }, a), k(function(t, e) {
            t.style.width = I[e]
        }, i), P(a).height(0)), k(function(t, e) {
            t.innerHTML = '<div class="dataTables_sizing">' + F[e] + "</div>",
                t.childNodes[0].style.height = "0",
                t.childNodes[0].style.overflow = "hidden",
                t.style.width = A[e]
        }, e), C && k(function(t, e) {
            t.innerHTML = '<div class="dataTables_sizing">' + L[e] + "</div>",
                t.childNodes[0].style.height = "0",
                t.childNodes[0].style.overflow = "hidden",
                t.style.width = I[e]
        }, a), Math.round(D.outerWidth()) < Math.round(f) ? (o = g.scrollHeight > g.offsetHeight || "scroll" == b.css("overflow-y") ? f + l : f, x && (g.scrollHeight > g.offsetHeight || "scroll" == b.css("overflow-y")) && (w.width = M(o - l)), "" !== s && "" === u || W(n, 1, "Possible column misalignment", 6)) : o = "100%", m.width = M(o), d.width = M(o), C && (n.nScrollFoot.style.width = M(o)), c || x && (m.height = M(_.offsetHeight + l)), R = D.outerWidth(), h[0].style.width = M(R), p.width = M(R), y = D.height() > g.clientHeight || "scroll" == b.css("overflow-y"), p[i = "padding" + (T.bScrollbarLeft ? "Left" : "Right")] = y ? l + "px" : "0px", C && (v[0].style.width = M(R), S[0].style.width = M(R), S[0].style[i] = y ? l + "px" : "0px"), D.children("colgroup").insertBefore(D.children("thead")), b.trigger("scroll"), !n.bSorted && !n.bFiltered || n._drawHold || (g.scrollTop = 0))
    }
    function k(t, e, n) {
        for (var a, r, o = 0, i = 0, l = e.length; i < l;) {
            for (a = e[i].firstChild, r = n ? n[i].firstChild : null; a;)
                1 === a.nodeType && (n ? t(a, r, o) : t(a, o), o++),
                    a = a.nextSibling,
                    r = n ? r.nextSibling : null;
            i++
        }
    }
    var te = /<.*?>/g;
    function ee(t) {
        var e,
            n,
            a = t.nTable,
            r = t.aoColumns,
            o = t.oScroll,
            i = o.sY,
            l = o.sX,
            o = o.sXInner,
            s = r.length,
            u = it(t, "bVisible"),
            c = P("th", t.nTHead),
            f = a.getAttribute("width"),
            d = a.parentNode,
            h = !1,
            p = t.oBrowser,
            g = p.bScrollOversize,
            b = a.style.width;
        for (b && -1 !== b.indexOf("%") && (f = b), D = 0; D < u.length; D++)
            null !== (e = r[u[D]]).sWidth && (e.sWidth = ae(e.sWidthOrig, d), h = !0);
        if (g || !h && !l && !i && s == T(t) && s == c.length)
            for (D = 0; D < s; D++) {
                var m = rt(t, D);
                null !== m && (r[m].sWidth = M(c.eq(D).width()))
            }
        else {
            var b = P(a).clone().css("visibility", "hidden").removeAttr("id"),
                S = (b.find("tbody tr").remove(), P("<tr/>").appendTo(b.find("tbody")));
            for (b.find("thead, tfoot").remove(), b.append(P(t.nTHead).clone()).append(P(t.nTFoot).clone()), b.find("tfoot th, tfoot td").css("width", ""), c = Ct(t, b.find("thead")[0]), D = 0; D < u.length; D++)
                e = r[u[D]],
                    c[D].style.width = null !== e.sWidthOrig && "" !== e.sWidthOrig ? M(e.sWidthOrig) : "",
                e.sWidthOrig && l && P(c[D]).append(P("<div/>").css({
                    width: e.sWidthOrig,
                    margin: 0,
                    padding: 0,
                    border: 0,
                    height: 1
                }));
            if (t.aoData.length)
                for (D = 0; D < u.length; D++)
                    e = r[n = u[D]],
                        P(re(t, n)).clone(!1).append(e.sContentPadding).appendTo(S);
            P("[name]", b).removeAttr("name");
            for (var v = P("<div/>").css(l || i ? {
                position: "absolute",
                top: 0,
                left: 0,
                height: 1,
                right: 0,
                overflow: "hidden"
            } : {}).append(b).appendTo(d), y = (l && o ? b.width(o) : l ? (b.css("width", "auto"), b.removeAttr("width"), b.width() < d.clientWidth && f && b.width(d.clientWidth)) : i ? b.width(d.clientWidth) : f && b.width(f), 0), D = 0; D < u.length; D++) {
                var _ = P(c[D]),
                    w = _.outerWidth() - _.width(),
                    _ = p.bBounding ? Math.ceil(c[D].getBoundingClientRect().width) : _.outerWidth();
                y += _,
                    r[u[D]].sWidth = M(_ - w)
            }
            a.style.width = M(y),
                v.remove()
        }
        f && (a.style.width = M(f)),
        !f && !l || t._reszEvt || (o = function() {
            P(j).on("resize.DT-" + t.sInstance, ne(function() {
                O(t)
            }))
        }, g ? setTimeout(o, 1e3) : o(), t._reszEvt = !0)
    }
    var ne = w.util.throttle;
    function ae(t, e) {
        return t ? (e = (t = P("<div/>").css("width", M(t)).appendTo(e || v.body))[0].offsetWidth, t.remove(), e) : 0
    }
    function re(t, e) {
        var n,
            a = oe(t, e);
        return a < 0 ? null : (n = t.aoData[a]).nTr ? n.anCells[e] : P("<td/>").html(S(t, a, e, "display"))[0]
    }
    function oe(t, e) {
        for (var n, a = -1, r = -1, o = 0, i = t.aoData.length; o < i; o++)
            (n = (n = (n = S(t, o, e, "display") + "").replace(te, "")).replace(/&nbsp;/g, " ")).length > a && (a = n.length, r = o);
        return r
    }
    function M(t) {
        return null === t ? "0px" : "number" == typeof t ? t < 0 ? "0px" : t + "px" : t.match(/\d$/) ? t + "px" : t
    }
    function I(t) {
        function e(t) {
            t.length && !Array.isArray(t[0]) ? h.push(t) : P.merge(h, t)
        }
        var n,
            a,
            r,
            o,
            i,
            l,
            s,
            u = [],
            c = t.aoColumns,
            f = t.aaSortingFixed,
            d = P.isPlainObject(f),
            h = [];
        for (Array.isArray(f) && e(f), d && f.pre && e(f.pre), e(t.aaSorting), d && f.post && e(f.post), n = 0; n < h.length; n++)
            for (r = (o = c[s = h[n][a = 0]].aDataSort).length; a < r; a++)
                l = c[i = o[a]].sType || "string",
                h[n]._idx === H && (h[n]._idx = P.inArray(h[n][1], c[i].asSorting)),
                    u.push({
                        src: s,
                        col: i,
                        dir: h[n][1],
                        index: h[n]._idx,
                        type: l,
                        formatter: w.ext.type.order[l + "-pre"]
                    });
        return u
    }
    function ie(t) {
        var e,
            n,
            a,
            r,
            c,
            f = [],
            u = w.ext.type.order,
            d = t.aoData,
            o = (t.aoColumns, 0),
            i = t.aiDisplayMaster;
        for (lt(t), e = 0, n = (c = I(t)).length; e < n; e++)
            (r = c[e]).formatter && o++,
                fe(t, r.col);
        if ("ssp" != E(t) && 0 !== c.length) {
            for (e = 0, a = i.length; e < a; e++)
                f[i[e]] = e;
            o === c.length ? i.sort(function(t, e) {
                for (var n, a, r, o, i = c.length, l = d[t]._aSortData, s = d[e]._aSortData, u = 0; u < i; u++)
                    if (0 != (r = (n = l[(o = c[u]).col]) < (a = s[o.col]) ? -1 : a < n ? 1 : 0))
                        return "asc" === o.dir ? r : -r;
                return (n = f[t]) < (a = f[e]) ? -1 : a < n ? 1 : 0
            }) : i.sort(function(t, e) {
                for (var n, a, r, o = c.length, i = d[t]._aSortData, l = d[e]._aSortData, s = 0; s < o; s++)
                    if (n = i[(r = c[s]).col], a = l[r.col], 0 !== (r = (u[r.type + "-" + r.dir] || u["string-" + r.dir])(n, a)))
                        return r;
                return (n = f[t]) < (a = f[e]) ? -1 : a < n ? 1 : 0
            })
        }
        t.bSorted = !0
    }
    function le(t) {
        for (var e = t.aoColumns, n = I(t), a = t.oLanguage.oAria, r = 0, o = e.length; r < o; r++) {
            var i = e[r],
                l = i.asSorting,
                s = i.ariaTitle || i.sTitle.replace(/<.*?>/g, ""),
                u = i.nTh;
            u.removeAttribute("aria-sort"),
                i = i.bSortable ? s + ("asc" === (0 < n.length && n[0].col == r && (u.setAttribute("aria-sort", "asc" == n[0].dir ? "ascending" : "descending"), l[n[0].index + 1]) || l[0]) ? a.sSortAscending : a.sSortDescending) : s,
                u.setAttribute("aria-label", i)
        }
    }
    function se(t, e, n, a) {
        function r(t, e) {
            var n = t._idx;
            return (n = n === H ? P.inArray(t[1], s) : n) + 1 < s.length ? n + 1 : e ? null : 0
        }
        var o,
            i = t.aoColumns[e],
            l = t.aaSorting,
            s = i.asSorting;
        "number" == typeof l[0] && (l = t.aaSorting = [l]),
            n && t.oFeatures.bSortMulti ? -1 !== (i = P.inArray(e, N(l, "0"))) ? null === (o = null === (o = r(l[i], !0)) && 1 === l.length ? 0 : o) ? l.splice(i, 1) : (l[i][1] = s[o], l[i]._idx = o) : (l.push([e, s[0], 0]), l[l.length - 1]._idx = 0) : l.length && l[0][0] == e ? (o = r(l[0]), l.length = 1, l[0][1] = s[o], l[0]._idx = o) : (l.length = 0, l.push([e, s[0]]), l[0]._idx = 0),
            u(t),
        "function" == typeof a && a(t)
    }
    function ue(e, t, n, a) {
        var r = e.aoColumns[n];
        me(t, {}, function(t) {
            !1 !== r.bSortable && (e.oFeatures.bProcessing ? (D(e, !0), setTimeout(function() {
                se(e, n, t.shiftKey, a),
                "ssp" !== E(e) && D(e, !1)
            }, 0)) : se(e, n, t.shiftKey, a))
        })
    }
    function ce(t) {
        var e,
            n,
            a,
            r = t.aLastSort,
            o = t.oClasses.sSortColumn,
            i = I(t),
            l = t.oFeatures;
        if (l.bSort && l.bSortClasses) {
            for (e = 0, n = r.length; e < n; e++)
                a = r[e].src,
                    P(N(t.aoData, "anCells", a)).removeClass(o + (e < 2 ? e + 1 : 3));
            for (e = 0, n = i.length; e < n; e++)
                a = i[e].src,
                    P(N(t.aoData, "anCells", a)).addClass(o + (e < 2 ? e + 1 : 3))
        }
        t.aLastSort = i
    }
    function fe(t, e) {
        for (var n, a, r, o = t.aoColumns[e], i = w.ext.order[o.sSortDataType], l = (i && (n = i.call(t.oInstance, t, e, ot(t, e))), w.ext.type.order[o.sType + "-pre"]), s = 0, u = t.aoData.length; s < u; s++)
            (a = t.aoData[s])._aSortData || (a._aSortData = []),
            a._aSortData[e] && !i || (r = i ? n[s] : S(t, s, e, "sort"), a._aSortData[e] = l ? l(r) : r)
    }
    function de(n) {
        var t;
        n._bLoadingState || (t = {
            time: +new Date,
            start: n._iDisplayStart,
            length: n._iDisplayLength,
            order: P.extend(!0, [], n.aaSorting),
            search: Et(n.oPreviousSearch),
            columns: P.map(n.aoColumns, function(t, e) {
                return {
                    visible: t.bVisible,
                    search: Et(n.aoPreSearchCols[e])
                }
            })
        }, n.oSavedState = t, R(n, "aoStateSaveParams", "stateSaveParams", [n, t]), n.oFeatures.bStateSave && !n.bDestroying && n.fnStateSaveCallback.call(n.oInstance, n, t))
    }
    function he(e, t, n) {
        var a;
        if (e.oFeatures.bStateSave)
            return (a = e.fnStateLoadCallback.call(e.oInstance, e, function(t) {
                pe(e, t, n)
            })) !== H && pe(e, a, n), !0;
        n()
    }
    function pe(n, t, e) {
        var a,
            r,
            o = n.aoColumns,
            i = (n._bLoadingState = !0, n._bInitComplete ? new w.Api(n) : null);
        if (t && t.time) {
            var l = R(n, "aoStateLoadParams", "stateLoadParams", [n, t]);
            if (-1 !== P.inArray(!1, l))
                n._bLoadingState = !1;
            else {
                l = n.iStateDuration;
                if (0 < l && t.time < +new Date - 1e3 * l)
                    n._bLoadingState = !1;
                else if (t.columns && o.length !== t.columns.length)
                    n._bLoadingState = !1;
                else {
                    if (n.oLoadedState = P.extend(!0, {}, t), t.length !== H && (i ? i.page.len(t.length) : n._iDisplayLength = t.length), t.start !== H && (null === i ? (n._iDisplayStart = t.start, n.iInitDisplayStart = t.start) : Yt(n, t.start / n._iDisplayLength)), t.order !== H && (n.aaSorting = [], P.each(t.order, function(t, e) {
                        n.aaSorting.push(e[0] >= o.length ? [0, e[1]] : e)
                    })), t.search !== H && P.extend(n.oPreviousSearch, Bt(t.search)), t.columns) {
                        for (a = 0, r = t.columns.length; a < r; a++) {
                            var s = t.columns[a];
                            s.visible !== H && (i ? i.column(a).visible(s.visible, !1) : o[a].bVisible = s.visible),
                            s.search !== H && P.extend(n.aoPreSearchCols[a], Bt(s.search))
                        }
                        i && i.columns.adjust()
                    }
                    n._bLoadingState = !1,
                        R(n, "aoStateLoaded", "stateLoaded", [n, t])
                }
            }
        } else
            n._bLoadingState = !1;
        e()
    }
    function ge(t) {
        var e = w.settings,
            t = P.inArray(t, N(e, "nTable"));
        return -1 !== t ? e[t] : null
    }
    function W(t, e, n, a) {
        if (n = "DataTables warning: " + (t ? "table id=" + t.sTableId + " - " : "") + n, a && (n += ". For more information about this error, please see http://datatables.net/tn/" + a), e)
            j.console && console.log && console.log(n);
        else {
            e = w.ext,
                e = e.sErrMode || e.errMode;
            if (t && R(t, null, "error", [t, a, n]), "alert" == e)
                alert(n);
            else {
                if ("throw" == e)
                    throw new Error(n);
                "function" == typeof e && e(t, a, n)
            }
        }
    }
    function F(n, a, t, e) {
        Array.isArray(t) ? P.each(t, function(t, e) {
            Array.isArray(e) ? F(n, a, e[0], e[1]) : F(n, a, e)
        }) : (e === H && (e = t), a[t] !== H && (n[e] = a[t]))
    }
    function be(t, e, n) {
        var a,
            r;
        for (r in e)
            e.hasOwnProperty(r) && (a = e[r], P.isPlainObject(a) ? (P.isPlainObject(t[r]) || (t[r] = {}), P.extend(!0, t[r], a)) : n && "data" !== r && "aaData" !== r && Array.isArray(a) ? t[r] = a.slice() : t[r] = a);
        return t
    }
    function me(e, t, n) {
        P(e).on("click.DT", t, function(t) {
            P(e).trigger("blur"),
                n(t)
        }).on("keypress.DT", t, function(t) {
            13 === t.which && (t.preventDefault(), n(t))
        }).on("selectstart.DT", function() {
            return !1
        })
    }
    function L(t, e, n, a) {
        n && t[e].push({
            fn: n,
            sName: a
        })
    }
    function R(n, t, e, a) {
        var r = [];
        return t && (r = P.map(n[t].slice().reverse(), function(t, e) {
            return t.fn.apply(n.oInstance, a)
        })), null !== e && (t = P.Event(e + ".dt"), (e = P(n.nTable)).trigger(t, a), 0 === e.parents("body").length && P("body").trigger(t, a), r.push(t.result)), r
    }
    function Se(t) {
        var e = t._iDisplayStart,
            n = t.fnDisplayEnd(),
            a = t._iDisplayLength;
        n <= e && (e = n - a),
            e -= e % a,
            t._iDisplayStart = e = -1 === a || e < 0 ? 0 : e
    }
    function ve(t, e) {
        var t = t.renderer,
            n = w.ext.renderer[e];
        return P.isPlainObject(t) && t[e] ? n[t[e]] || n._ : "string" == typeof t && n[t] || n._
    }
    function E(t) {
        return t.oFeatures.bServerSide ? "ssp" : t.ajax || t.sAjaxSource ? "ajax" : "dom"
    }
    function ye(t, n) {
        var a;
        return Array.isArray(t) ? P.map(t, function(t) {
            return ye(t, n)
        }) : "number" == typeof t ? [n[t]] : (a = P.map(n, function(t, e) {
            return t.nTable
        }), P(a).filter(t).map(function(t) {
            var e = P.inArray(this, a);
            return n[e]
        }).toArray())
    }
    function De(r, o, t) {
        var e,
            n;
        t && (e = new B(r)).one("draw", function() {
            t(e.ajax.json())
        }),
            "ssp" == E(r) ? u(r, o) : (D(r, !0), (n = r.jqXHR) && 4 !== n.readyState && n.abort(), Tt(r, [], function(t) {
                pt(r);
                for (var e = Ft(r, t), n = 0, a = e.length; n < a; n++)
                    x(r, e[n]);
                u(r, o),
                    D(r, !1)
            }))
    }
    function _e(t, e, n, a, r) {
        for (var o, i, l, s, u = [], c = typeof e, f = 0, d = (e = e && "string" != c && "function" != c && e.length !== H ? e : [e]).length; f < d; f++)
            for (l = 0, s = (i = e[f] && e[f].split && !e[f].match(/[\[\(:]/) ? e[f].split(",") : [e[f]]).length; l < s; l++)
                (o = n("string" == typeof i[l] ? i[l].trim() : i[l])) && o.length && (u = u.concat(o));
        var h = p.selector[t];
        if (h.length)
            for (f = 0, d = h.length; f < d; f++)
                u = h[f](a, r, u);
        return z(u)
    }
    function we(t) {
        return (t = t || {}).filter && t.search === H && (t.search = t.filter), P.extend({
            search: "none",
            order: "current",
            page: "all"
        }, t)
    }
    function Ce(t) {
        for (var e = 0, n = t.length; e < n; e++)
            if (0 < t[e].length)
                return t[0] = t[e], t[0].length = 1, t.length = 1, t.context = [t.context[e]], t;
        return t.length = 0, t
    }
    function Te(o, t, e, n) {
        function i(t, e) {
            var n;
            if (Array.isArray(t) || t instanceof P)
                for (var a = 0, r = t.length; a < r; a++)
                    i(t[a], e);
            else
                t.nodeName && "tr" === t.nodeName.toLowerCase() ? l.push(t) : (n = P("<tr><td></td></tr>").addClass(e), P("td", n).addClass(e).html(t)[0].colSpan = T(o), l.push(n[0]))
        }
        var l = [];
        i(e, n),
        t._details && t._details.detach(),
            t._details = P(l),
        t._detailsShow && t._details.insertAfter(t.nTr)
    }
    function xe(t, e) {
        var n = t.context;
        if (n.length && t.length) {
            var a = n[0].aoData[t[0]];
            if (a._details) {
                (a._detailsShow = e) ? (a._details.insertAfter(a.nTr), P(a.nTr).addClass("dt-hasChild")) : (a._details.detach(), P(a.nTr).removeClass("dt-hasChild")),
                    R(n[0], null, "childRow", [e, t.row(t[0])]);
                var s = n[0],
                    r = new B(s),
                    a = ".dt.DT_details",
                    e = "draw" + a,
                    t = "column-sizing" + a,
                    a = "destroy" + a,
                    u = s.aoData;
                if (r.off(e + " " + t + " " + a), N(u, "_details").length > 0) {
                    r.on(e, function(t, e) {
                        if (s !== e)
                            return;
                        r.rows({
                            page: "current"
                        }).eq(0).each(function(t) {
                            var e = u[t];
                            if (e._detailsShow)
                                e._details.insertAfter(e.nTr)
                        })
                    });
                    r.on(t, function(t, e, n, a) {
                        if (s !== e)
                            return;
                        var r,
                            o = T(e);
                        for (var i = 0, l = u.length; i < l; i++) {
                            r = u[i];
                            if (r._details)
                                r._details.children("td[colspan]").attr("colspan", o)
                        }
                    });
                    r.on(a, function(t, e) {
                        if (s !== e)
                            return;
                        for (var n = 0, a = u.length; n < a; n++)
                            if (u[n]._details)
                                Re(r, n)
                    })
                }
                Le(n)
            }
        }
    }
    function Ae(t, e, n, a, r) {
        for (var o = [], i = 0, l = r.length; i < l; i++)
            o.push(S(t, r[i], e));
        return o
    }
    var Ie = [],
        o = Array.prototype,
        B = function(t, e) {
            if (!(this instanceof B))
                return new B(t, e);
            function n(t) {
                var e,
                    n,
                    a,
                    r;
                t = t,
                    a = w.settings,
                    r = P.map(a, function(t, e) {
                        return t.nTable
                    }),
                (t = t ? t.nTable && t.oApi ? [t] : t.nodeName && "table" === t.nodeName.toLowerCase() ? -1 !== (e = P.inArray(t, r)) ? [a[e]] : null : t && "function" == typeof t.settings ? t.settings().toArray() : ("string" == typeof t ? n = P(t) : t instanceof P && (n = t), n ? n.map(function(t) {
                    return -1 !== (e = P.inArray(this, r)) ? a[e] : null
                }).toArray() : void 0) : []) && o.push.apply(o, t)
            }
            var o = [];
            if (Array.isArray(t))
                for (var a = 0, r = t.length; a < r; a++)
                    n(t[a]);
            else
                n(t);
            this.context = z(o),
            e && P.merge(this, e),
                this.selector = {
                    rows: null,
                    cols: null,
                    opts: null
                },
                B.extend(this, this, Ie)
        },
        Fe = (w.Api = B, P.extend(B.prototype, {
            any: function() {
                return 0 !== this.count()
            },
            concat: o.concat,
            context: [],
            count: function() {
                return this.flatten().length
            },
            each: function(t) {
                for (var e = 0, n = this.length; e < n; e++)
                    t.call(this, this[e], e, this);
                return this
            },
            eq: function(t) {
                var e = this.context;
                return e.length > t ? new B(e[t], this[t]) : null
            },
            filter: function(t) {
                var e = [];
                if (o.filter)
                    e = o.filter.call(this, t, this);
                else
                    for (var n = 0, a = this.length; n < a; n++)
                        t.call(this, this[n], n, this) && e.push(this[n]);
                return new B(this.context, e)
            },
            flatten: function() {
                var t = [];
                return new B(this.context, t.concat.apply(t, this.toArray()))
            },
            join: o.join,
            indexOf: o.indexOf || function(t, e) {
                for (var n = e || 0, a = this.length; n < a; n++)
                    if (this[n] === t)
                        return n;
                return -1
            },
            iterator: function(t, e, n, a) {
                var r,
                    o,
                    i,
                    l,
                    s,
                    u,
                    c,
                    f,
                    d = [],
                    h = this.context,
                    p = this.selector;
                for ("string" == typeof t && (a = n, n = e, e = t, t = !1), o = 0, i = h.length; o < i; o++) {
                    var g = new B(h[o]);
                    if ("table" === e)
                        (r = n.call(g, h[o], o)) !== H && d.push(r);
                    else if ("columns" === e || "rows" === e)
                        (r = n.call(g, h[o], this[o], o)) !== H && d.push(r);
                    else if ("column" === e || "column-rows" === e || "row" === e || "cell" === e)
                        for (c = this[o], "column-rows" === e && (u = Fe(h[o], p.opts)), l = 0, s = c.length; l < s; l++)
                            f = c[l],
                            (r = "cell" === e ? n.call(g, h[o], f.row, f.column, o, l) : n.call(g, h[o], f, o, l, u)) !== H && d.push(r)
                }
                return d.length || a ? ((t = (a = new B(h, t ? d.concat.apply([], d) : d)).selector).rows = p.rows, t.cols = p.cols, t.opts = p.opts, a) : this
            },
            lastIndexOf: o.lastIndexOf || function(t, e) {
                return this.indexOf.apply(this.toArray.reverse(), arguments)
            },
            length: 0,
            map: function(t) {
                var e = [];
                if (o.map)
                    e = o.map.call(this, t, this);
                else
                    for (var n = 0, a = this.length; n < a; n++)
                        e.push(t.call(this, this[n], n));
                return new B(this.context, e)
            },
            pluck: function(t) {
                var e = w.util.get(t);
                return this.map(function(t) {
                    return e(t)
                })
            },
            pop: o.pop,
            push: o.push,
            reduce: o.reduce || function(t, e) {
                return et(this, t, e, 0, this.length, 1)
            },
            reduceRight: o.reduceRight || function(t, e) {
                return et(this, t, e, this.length - 1, -1, -1)
            },
            reverse: o.reverse,
            selector: null,
            shift: o.shift,
            slice: function() {
                return new B(this.context, this)
            },
            sort: o.sort,
            splice: o.splice,
            toArray: function() {
                return o.slice.call(this)
            },
            to$: function() {
                return P(this)
            },
            toJQuery: function() {
                return P(this)
            },
            unique: function() {
                return new B(this.context, z(this))
            },
            unshift: o.unshift
        }), B.extend = function(t, e, n) {
            if (n.length && e && (e instanceof B || e.__dt_wrapper))
                for (var a, r = 0, o = n.length; r < o; r++)
                    e[(a = n[r]).name] = "function" === a.type ? function(e, n, a) {
                        return function() {
                            var t = n.apply(e, arguments);
                            return B.extend(t, t, a.methodExt), t
                        }
                    }(t, a.val, a) : "object" === a.type ? {} : a.val,
                        e[a.name].__dt_wrapper = !0,
                        B.extend(t, e[a.name], a.propExt)
        }, B.register = e = function(t, e) {
            if (Array.isArray(t))
                for (var n = 0, a = t.length; n < a; n++)
                    B.register(t[n], e);
            else
                for (var r = t.split("."), o = Ie, i = 0, l = r.length; i < l; i++) {
                    var s,
                        u,
                        c = function(t, e) {
                            for (var n = 0, a = t.length; n < a; n++)
                                if (t[n].name === e)
                                    return t[n];
                            return null
                        }(o, u = (s = -1 !== r[i].indexOf("()")) ? r[i].replace("()", "") : r[i]);
                    c || o.push(c = {
                        name: u,
                        val: {},
                        methodExt: [],
                        propExt: [],
                        type: "object"
                    }),
                        i === l - 1 ? (c.val = e, c.type = "function" == typeof e ? "function" : P.isPlainObject(e) ? "object" : "other") : o = s ? c.methodExt : c.propExt
                }
        }, B.registerPlural = t = function(t, e, n) {
            B.register(t, n),
                B.register(e, function() {
                    var t = n.apply(this, arguments);
                    return t === this ? this : t instanceof B ? t.length ? Array.isArray(t[0]) ? new B(t.context, t[0]) : t[0] : H : t
                })
        }, e("tables()", function(t) {
            return t !== H && null !== t ? new B(ye(t, this.context)) : this
        }), e("table()", function(t) {
            var t = this.tables(t),
                e = t.context;
            return e.length ? new B(e[0]) : t
        }), t("tables().nodes()", "table().node()", function() {
            return this.iterator("table", function(t) {
                return t.nTable
            }, 1)
        }), t("tables().body()", "table().body()", function() {
            return this.iterator("table", function(t) {
                return t.nTBody
            }, 1)
        }), t("tables().header()", "table().header()", function() {
            return this.iterator("table", function(t) {
                return t.nTHead
            }, 1)
        }), t("tables().footer()", "table().footer()", function() {
            return this.iterator("table", function(t) {
                return t.nTFoot
            }, 1)
        }), t("tables().containers()", "table().container()", function() {
            return this.iterator("table", function(t) {
                return t.nTableWrapper
            }, 1)
        }), e("draw()", function(e) {
            return this.iterator("table", function(t) {
                "page" === e ? y(t) : u(t, !1 === (e = "string" == typeof e ? "full-hold" !== e : e))
            })
        }), e("page()", function(e) {
            return e === H ? this.page.info().page : this.iterator("table", function(t) {
                Yt(t, e)
            })
        }), e("page.info()", function(t) {
            var e,
                n,
                a,
                r,
                o;
            return 0 === this.context.length ? H : (n = (e = this.context[0])._iDisplayStart, a = e.oFeatures.bPaginate ? e._iDisplayLength : -1, r = e.fnRecordsDisplay(), {
                page: (o = -1 === a) ? 0 : Math.floor(n / a),
                pages: o ? 1 : Math.ceil(r / a),
                start: n,
                end: e.fnDisplayEnd(),
                length: a,
                recordsTotal: e.fnRecordsTotal(),
                recordsDisplay: r,
                serverSide: "ssp" === E(e)
            })
        }), e("page.len()", function(e) {
            return e === H ? 0 !== this.context.length ? this.context[0]._iDisplayLength : H : this.iterator("table", function(t) {
                $t(t, e)
            })
        }), e("ajax.json()", function() {
            var t = this.context;
            if (0 < t.length)
                return t[0].json
        }), e("ajax.params()", function() {
            var t = this.context;
            if (0 < t.length)
                return t[0].oAjaxData
        }), e("ajax.reload()", function(e, n) {
            return this.iterator("table", function(t) {
                De(t, !1 === n, e)
            })
        }), e("ajax.url()", function(e) {
            var t = this.context;
            return e === H ? 0 === t.length ? H : (t = t[0]).ajax ? P.isPlainObject(t.ajax) ? t.ajax.url : t.ajax : t.sAjaxSource : this.iterator("table", function(t) {
                P.isPlainObject(t.ajax) ? t.ajax.url = e : t.ajax = e
            })
        }), e("ajax.url().load()", function(e, n) {
            return this.iterator("table", function(t) {
                De(t, !1 === n, e)
            })
        }), function(t, e) {
            var n,
                a = [],
                r = t.aiDisplay,
                o = t.aiDisplayMaster,
                i = e.search,
                l = e.order,
                e = e.page;
            if ("ssp" == E(t))
                return "removed" === i ? [] : f(0, o.length);
            if ("current" == e)
                for (u = t._iDisplayStart, c = t.fnDisplayEnd(); u < c; u++)
                    a.push(r[u]);
            else if ("current" == l || "applied" == l) {
                if ("none" == i)
                    a = o.slice();
                else if ("applied" == i)
                    a = r.slice();
                else if ("removed" == i) {
                    for (var s = {}, u = 0, c = r.length; u < c; u++)
                        s[r[u]] = null;
                    a = P.map(o, function(t) {
                        return s.hasOwnProperty(t) ? null : t
                    })
                }
            } else if ("index" == l || "original" == l)
                for (u = 0, c = t.aoData.length; u < c; u++)
                    ("none" == i || -1 === (n = P.inArray(u, r)) && "removed" == i || 0 <= n && "applied" == i) && a.push(u);
            return a
        }),
        Le = (e("rows()", function(e, n) {
            e === H ? e = "" : P.isPlainObject(e) && (n = e, e = ""),
                n = we(n);
            var t = this.iterator("table", function(t) {
                return _e("row", e, function(n) {
                    var t = d(n),
                        a = r.aoData;
                    if (null !== t && !o)
                        return [t];
                    if (i = i || Fe(r, o), null !== t && -1 !== P.inArray(t, i))
                        return [t];
                    if (null === n || n === H || "" === n)
                        return i;
                    if ("function" == typeof n)
                        return P.map(i, function(t) {
                            var e = a[t];
                            return n(t, e._aData, e.nTr) ? t : null
                        });
                    if (n.nodeName)
                        return t = n._DT_RowIndex, e = n._DT_CellIndex, t !== H ? a[t] && a[t].nTr === n ? [t] : [] : e ? a[e.row] && a[e.row].nTr === n.parentNode ? [e.row] : [] : (t = P(n).closest("*[data-dt-row]")).length ? [t.data("dt-row")] : [];
                    if ("string" == typeof n && "#" === n.charAt(0)) {
                        var e = r.aIds[n.replace(/^#/, "")];
                        if (e !== H)
                            return [e.idx]
                    }
                    t = _(m(r.aoData, i, "nTr"));
                    return P(t).filter(n).map(function() {
                        return this._DT_RowIndex
                    }).toArray()
                }, r = t, o = n);
                var r,
                    o,
                    i
            }, 1);
            return t.selector.rows = e, t.selector.opts = n, t
        }), e("rows().nodes()", function() {
            return this.iterator("row", function(t, e) {
                return t.aoData[e].nTr || H
            }, 1)
        }), e("rows().data()", function() {
            return this.iterator(!0, "rows", function(t, e) {
                return m(t.aoData, e, "_aData")
            }, 1)
        }), t("rows().cache()", "row().cache()", function(n) {
            return this.iterator("row", function(t, e) {
                t = t.aoData[e];
                return "search" === n ? t._aFilterData : t._aSortData
            }, 1)
        }), t("rows().invalidate()", "row().invalidate()", function(n) {
            return this.iterator("row", function(t, e) {
                bt(t, e, n)
            })
        }), t("rows().indexes()", "row().index()", function() {
            return this.iterator("row", function(t, e) {
                return e
            }, 1)
        }), t("rows().ids()", "row().id()", function(t) {
            for (var e = [], n = this.context, a = 0, r = n.length; a < r; a++)
                for (var o = 0, i = this[a].length; o < i; o++) {
                    var l = n[a].rowIdFn(n[a].aoData[this[a][o]]._aData);
                    e.push((!0 === t ? "#" : "") + l)
                }
            return new B(n, e)
        }), t("rows().remove()", "row().remove()", function() {
            var f = this;
            return this.iterator("row", function(t, e, n) {
                var a,
                    r,
                    o,
                    i,
                    l,
                    s,
                    u = t.aoData,
                    c = u[e];
                for (u.splice(e, 1), a = 0, r = u.length; a < r; a++)
                    if (s = (l = u[a]).anCells, null !== l.nTr && (l.nTr._DT_RowIndex = a), null !== s)
                        for (o = 0, i = s.length; o < i; o++)
                            s[o]._DT_CellIndex.row = a;
                gt(t.aiDisplayMaster, e),
                    gt(t.aiDisplay, e),
                    gt(f[n], e, !1),
                0 < t._iRecordsDisplay && t._iRecordsDisplay--,
                    Se(t);
                n = t.rowIdFn(c._aData);
                n !== H && delete t.aIds[n]
            }), this.iterator("table", function(t) {
                for (var e = 0, n = t.aoData.length; e < n; e++)
                    t.aoData[e].idx = e
            }), this
        }), e("rows.add()", function(o) {
            var t = this.iterator("table", function(t) {
                    for (var e, n = [], a = 0, r = o.length; a < r; a++)
                        (e = o[a]).nodeName && "TR" === e.nodeName.toUpperCase() ? n.push(ut(t, e)[0]) : n.push(x(t, e));
                    return n
                }, 1),
                e = this.rows(-1);
            return e.pop(), P.merge(e, t), e
        }), e("row()", function(t, e) {
            return Ce(this.rows(t, e))
        }), e("row().data()", function(t) {
            var e,
                n = this.context;
            return t === H ? n.length && this.length ? n[0].aoData[this[0]]._aData : H : ((e = n[0].aoData[this[0]])._aData = t, Array.isArray(t) && e.nTr && e.nTr.id && b(n[0].rowId)(t, e.nTr.id), bt(n[0], this[0], "data"), this)
        }), e("row().node()", function() {
            var t = this.context;
            return t.length && this.length && t[0].aoData[this[0]].nTr || null
        }), e("row.add()", function(e) {
            e instanceof P && e.length && (e = e[0]);
            var t = this.iterator("table", function(t) {
                return e.nodeName && "TR" === e.nodeName.toUpperCase() ? ut(t, e)[0] : x(t, e)
            });
            return this.row(t[0])
        }), P(v).on("plugin-init.dt", function(t, e) {
            var n = new B(e),
                a = "on-plugin-init",
                r = "stateSaveParams." + a,
                o = "destroy. " + a,
                a = (n.on(r, function(t, e, n) {
                    for (var a = e.rowIdFn, r = e.aoData, o = [], i = 0; i < r.length; i++)
                        r[i]._detailsShow && o.push("#" + a(r[i]._aData));
                    n.childRows = o
                }), n.on(o, function() {
                    n.off(r + " " + o)
                }), n.state.loaded());
            a && a.childRows && n.rows(P.map(a.childRows, function(t) {
                return t.replace(/:/g, "\\:")
            })).every(function() {
                R(e, null, "requestChild", [this])
            })
        }), w.util.throttle(function(t) {
            de(t[0])
        }, 500)),
        Re = function(t, e) {
            var n = t.context;
            n.length && (e = n[0].aoData[e !== H ? e : t[0]]) && e._details && (e._details.remove(), e._detailsShow = H, e._details = H, P(e.nTr).removeClass("dt-hasChild"), Le(n))
        },
        Pe = "row().child",
        je = Pe + "()",
        He = (e(je, function(t, e) {
            var n = this.context;
            return t === H ? n.length && this.length ? n[0].aoData[this[0]]._details : H : (!0 === t ? this.child.show() : !1 === t ? Re(this) : n.length && this.length && Te(n[0], n[0].aoData[this[0]], t, e), this)
        }), e([Pe + ".show()", je + ".show()"], function(t) {
            return xe(this, !0), this
        }), e([Pe + ".hide()", je + ".hide()"], function() {
            return xe(this, !1), this
        }), e([Pe + ".remove()", je + ".remove()"], function() {
            return Re(this), this
        }), e(Pe + ".isShown()", function() {
            var t = this.context;
            return t.length && this.length && t[0].aoData[this[0]]._detailsShow || !1
        }), /^([^:]+):(name|visIdx|visible)$/),
        Ne = (e("columns()", function(n, a) {
            n === H ? n = "" : P.isPlainObject(n) && (a = n, n = ""),
                a = we(a);
            var t = this.iterator("table", function(t) {
                return e = n, l = a, s = (i = t).aoColumns, u = N(s, "sName"), c = N(s, "nTh"), _e("column", e, function(n) {
                    var a,
                        t = d(n);
                    if ("" === n)
                        return f(s.length);
                    if (null !== t)
                        return [0 <= t ? t : s.length + t];
                    if ("function" == typeof n)
                        return a = Fe(i, l), P.map(s, function(t, e) {
                            return n(e, Ae(i, e, 0, 0, a), c[e]) ? e : null
                        });
                    var r = "string" == typeof n ? n.match(He) : "";
                    if (r)
                        switch (r[2]) {
                            case "visIdx":
                            case "visible":
                                var e,
                                    o = parseInt(r[1], 10);
                                return o < 0 ? [(e = P.map(s, function(t, e) {
                                    return t.bVisible ? e : null
                                }))[e.length + o]] : [rt(i, o)];
                            case "name":
                                return P.map(u, function(t, e) {
                                    return t === r[1] ? e : null
                                });
                            default:
                                return []
                        }
                    return n.nodeName && n._DT_CellIndex ? [n._DT_CellIndex.column] : (t = P(c).filter(n).map(function() {
                        return P.inArray(this, c)
                    }).toArray()).length || !n.nodeName ? t : (t = P(n).closest("*[data-dt-column]")).length ? [t.data("dt-column")] : []
                }, i, l);
                var i,
                    e,
                    l,
                    s,
                    u,
                    c
            }, 1);
            return t.selector.cols = n, t.selector.opts = a, t
        }), t("columns().header()", "column().header()", function(t, e) {
            return this.iterator("column", function(t, e) {
                return t.aoColumns[e].nTh
            }, 1)
        }), t("columns().footer()", "column().footer()", function(t, e) {
            return this.iterator("column", function(t, e) {
                return t.aoColumns[e].nTf
            }, 1)
        }), t("columns().data()", "column().data()", function() {
            return this.iterator("column-rows", Ae, 1)
        }), t("columns().dataSrc()", "column().dataSrc()", function() {
            return this.iterator("column", function(t, e) {
                return t.aoColumns[e].mData
            }, 1)
        }), t("columns().cache()", "column().cache()", function(o) {
            return this.iterator("column-rows", function(t, e, n, a, r) {
                return m(t.aoData, r, "search" === o ? "_aFilterData" : "_aSortData", e)
            }, 1)
        }), t("columns().nodes()", "column().nodes()", function() {
            return this.iterator("column-rows", function(t, e, n, a, r) {
                return m(t.aoData, r, "anCells", e)
            }, 1)
        }), t("columns().visible()", "column().visible()", function(f, n) {
            var e = this,
                t = this.iterator("column", function(t, e) {
                    if (f === H)
                        return t.aoColumns[e].bVisible;
                    var n,
                        a,
                        r = e,
                        e = f,
                        o = t.aoColumns,
                        i = o[r],
                        l = t.aoData;
                    if (e === H)
                        i.bVisible;
                    else if (i.bVisible !== e) {
                        if (e)
                            for (var s = P.inArray(!0, N(o, "bVisible"), r + 1), u = 0, c = l.length; u < c; u++)
                                a = l[u].nTr,
                                    n = l[u].anCells,
                                a && a.insertBefore(n[r], n[s] || null);
                        else
                            P(N(t.aoData, "anCells", r)).detach();
                        i.bVisible = e
                    }
                });
            return f !== H && this.iterator("table", function(t) {
                Dt(t, t.aoHeader),
                    Dt(t, t.aoFooter),
                t.aiDisplay.length || P(t.nTBody).find("td[colspan]").attr("colspan", T(t)),
                    de(t),
                    e.iterator("column", function(t, e) {
                        R(t, null, "column-visibility", [t, e, f, n])
                    }),
                n !== H && !n || e.columns.adjust()
            }), t
        }), t("columns().indexes()", "column().index()", function(n) {
            return this.iterator("column", function(t, e) {
                return "visible" === n ? ot(t, e) : e
            }, 1)
        }), e("columns.adjust()", function() {
            return this.iterator("table", function(t) {
                O(t)
            }, 1)
        }), e("column.index()", function(t, e) {
            var n;
            if (0 !== this.context.length)
                return n = this.context[0], "fromVisible" === t || "toData" === t ? rt(n, e) : "fromData" === t || "toVisible" === t ? ot(n, e) : void 0
        }), e("column()", function(t, e) {
            return Ce(this.columns(t, e))
        }), e("cells()", function(g, t, b) {
            var a,
                r,
                o,
                i,
                l,
                s,
                e;
            return P.isPlainObject(g) && (g.row === H ? (b = g, g = null) : (b = t, t = null)), P.isPlainObject(t) && (b = t, t = null), null === t || t === H ? this.iterator("table", function(t) {
                return a = t, t = g, e = we(b), f = a.aoData, d = Fe(a, e), n = _(m(f, d, "anCells")), h = P(Y([], n)), p = a.aoColumns.length, _e("cell", t, function(t) {
                    var e,
                        n = "function" == typeof t;
                    if (null === t || t === H || n) {
                        for (o = [], i = 0, l = d.length; i < l; i++)
                            for (r = d[i], s = 0; s < p; s++)
                                u = {
                                    row: r,
                                    column: s
                                },
                                (!n || (c = f[r], t(u, S(a, r, s), c.anCells ? c.anCells[s] : null))) && o.push(u);
                        return o
                    }
                    return P.isPlainObject(t) ? t.column !== H && t.row !== H && -1 !== P.inArray(t.row, d) ? [t] : [] : (e = h.filter(t).map(function(t, e) {
                        return {
                            row: e._DT_CellIndex.row,
                            column: e._DT_CellIndex.column
                        }
                    }).toArray()).length || !t.nodeName ? e : (c = P(t).closest("*[data-dt-row]")).length ? [{
                        row: c.data("dt-row"),
                        column: c.data("dt-column")
                    }] : []
                }, a, e);
                var a,
                    e,
                    r,
                    o,
                    i,
                    l,
                    s,
                    u,
                    c,
                    f,
                    d,
                    n,
                    h,
                    p
            }) : (e = b ? {
                page: b.page,
                order: b.order,
                search: b.search
            } : {}, a = this.columns(t, e), r = this.rows(g, e), e = this.iterator("table", function(t, e) {
                var n = [];
                for (o = 0, i = r[e].length; o < i; o++)
                    for (l = 0, s = a[e].length; l < s; l++)
                        n.push({
                            row: r[e][o],
                            column: a[e][l]
                        });
                return n
            }, 1), e = b && b.selected ? this.cells(e, b) : e, P.extend(e.selector, {
                cols: t,
                rows: g,
                opts: b
            }), e)
        }), t("cells().nodes()", "cell().node()", function() {
            return this.iterator("cell", function(t, e, n) {
                t = t.aoData[e];
                return t && t.anCells ? t.anCells[n] : H
            }, 1)
        }), e("cells().data()", function() {
            return this.iterator("cell", function(t, e, n) {
                return S(t, e, n)
            }, 1)
        }), t("cells().cache()", "cell().cache()", function(a) {
            return a = "search" === a ? "_aFilterData" : "_aSortData", this.iterator("cell", function(t, e, n) {
                return t.aoData[e][a][n]
            }, 1)
        }), t("cells().render()", "cell().render()", function(a) {
            return this.iterator("cell", function(t, e, n) {
                return S(t, e, n, a)
            }, 1)
        }), t("cells().indexes()", "cell().index()", function() {
            return this.iterator("cell", function(t, e, n) {
                return {
                    row: e,
                    column: n,
                    columnVisible: ot(t, n)
                }
            }, 1)
        }), t("cells().invalidate()", "cell().invalidate()", function(a) {
            return this.iterator("cell", function(t, e, n) {
                bt(t, e, a, n)
            })
        }), e("cell()", function(t, e, n) {
            return Ce(this.cells(t, e, n))
        }), e("cell().data()", function(t) {
            var e = this.context,
                n = this[0];
            return t === H ? e.length && n.length ? S(e[0], n[0].row, n[0].column) : H : (ct(e[0], n[0].row, n[0].column, t), bt(e[0], n[0].row, "data", n[0].column), this)
        }), e("order()", function(e, t) {
            var n = this.context;
            return e === H ? 0 !== n.length ? n[0].aaSorting : H : ("number" == typeof e ? e = [[e, t]] : e.length && !Array.isArray(e[0]) && (e = Array.prototype.slice.call(arguments)), this.iterator("table", function(t) {
                t.aaSorting = e.slice()
            }))
        }), e("order.listener()", function(e, n, a) {
            return this.iterator("table", function(t) {
                ue(t, e, n, a)
            })
        }), e("order.fixed()", function(e) {
            var t;
            return e ? this.iterator("table", function(t) {
                t.aaSortingFixed = P.extend(!0, {}, e)
            }) : (t = (t = this.context).length ? t[0].aaSortingFixed : H, Array.isArray(t) ? {
                pre: t
            } : t)
        }), e(["columns().order()", "column().order()"], function(a) {
            var r = this;
            return this.iterator("table", function(t, e) {
                var n = [];
                P.each(r[e], function(t, e) {
                    n.push([e, a])
                }),
                    t.aaSorting = n
            })
        }), e("search()", function(e, n, a, r) {
            var t = this.context;
            return e === H ? 0 !== t.length ? t[0].oPreviousSearch.sSearch : H : this.iterator("table", function(t) {
                t.oFeatures.bFilter && Rt(t, P.extend({}, t.oPreviousSearch, {
                    sSearch: e + "",
                    bRegex: null !== n && n,
                    bSmart: null === a || a,
                    bCaseInsensitive: null === r || r
                }), 1)
            })
        }), t("columns().search()", "column().search()", function(a, r, o, i) {
            return this.iterator("column", function(t, e) {
                var n = t.aoPreSearchCols;
                if (a === H)
                    return n[e].sSearch;
                t.oFeatures.bFilter && (P.extend(n[e], {
                    sSearch: a + "",
                    bRegex: null !== r && r,
                    bSmart: null === o || o,
                    bCaseInsensitive: null === i || i
                }), Rt(t, t.oPreviousSearch, 1))
            })
        }), e("state()", function() {
            return this.context.length ? this.context[0].oSavedState : null
        }), e("state.clear()", function() {
            return this.iterator("table", function(t) {
                t.fnStateSaveCallback.call(t.oInstance, t, {})
            })
        }), e("state.loaded()", function() {
            return this.context.length ? this.context[0].oLoadedState : null
        }), e("state.save()", function() {
            return this.iterator("table", function(t) {
                de(t)
            })
        }), w.use = function(t, e) {
            "lib" === e || t.fn ? P = t : "win" == e || t.document ? v = (j = t).document : "datetime" !== e && "DateTime" !== t.type || (w.DateTime = t)
        }, w.factory = function(t, e) {
            var n = !1;
            return t && t.document && (v = (j = t).document), e && e.fn && e.fn.jquery && (P = e, n = !0), n
        }, w.versionCheck = w.fnVersionCheck = function(t) {
            for (var e, n, a = w.version.split("."), r = t.split("."), o = 0, i = r.length; o < i; o++)
                if ((e = parseInt(a[o], 10) || 0) !== (n = parseInt(r[o], 10) || 0))
                    return n < e;
            return !0
        }, w.isDataTable = w.fnIsDataTable = function(t) {
            var r = P(t).get(0),
                o = !1;
            return t instanceof w.Api || (P.each(w.settings, function(t, e) {
                var n = e.nScrollHead ? P("table", e.nScrollHead)[0] : null,
                    a = e.nScrollFoot ? P("table", e.nScrollFoot)[0] : null;
                e.nTable !== r && n !== r && a !== r || (o = !0)
            }), o)
        }, w.tables = w.fnTables = function(e) {
            var t = !1,
                n = (P.isPlainObject(e) && (t = e.api, e = e.visible), P.map(w.settings, function(t) {
                    if (!e || P(t.nTable).is(":visible"))
                        return t.nTable
                }));
            return t ? new B(n) : n
        }, w.camelToHungarian = C, e("$()", function(t, e) {
            e = this.rows(e).nodes(),
                e = P(e);
            return P([].concat(e.filter(t).toArray(), e.find(t).toArray()))
        }), P.each(["on", "one", "off"], function(t, n) {
            e(n + "()", function() {
                var t = Array.prototype.slice.call(arguments),
                    e = (t[0] = P.map(t[0].split(/\s/), function(t) {
                        return t.match(/\.dt\b/) ? t : t + ".dt"
                    }).join(" "), P(this.tables().nodes()));
                return e[n].apply(e, t), this
            })
        }), e("clear()", function() {
            return this.iterator("table", function(t) {
                pt(t)
            })
        }), e("settings()", function() {
            return new B(this.context, this.context)
        }), e("init()", function() {
            var t = this.context;
            return t.length ? t[0].oInit : null
        }), e("data()", function() {
            return this.iterator("table", function(t) {
                return N(t.aoData, "_aData")
            }).flatten()
        }), e("destroy()", function(c) {
            return c = c || !1, this.iterator("table", function(e) {
                var n,
                    t = e.oClasses,
                    a = e.nTable,
                    r = e.nTBody,
                    o = e.nTHead,
                    i = e.nTFoot,
                    l = P(a),
                    r = P(r),
                    s = P(e.nTableWrapper),
                    u = P.map(e.aoData, function(t) {
                        return t.nTr
                    }),
                    i = (e.bDestroying = !0, R(e, "aoDestroyCallback", "destroy", [e]), c || new B(e).columns().visible(!0), s.off(".DT").find(":not(tbody *)").off(".DT"), P(j).off(".DT-" + e.sInstance), a != o.parentNode && (l.children("thead").detach(), l.append(o)), i && a != i.parentNode && (l.children("tfoot").detach(), l.append(i)), e.aaSorting = [], e.aaSortingFixed = [], ce(e), P(u).removeClass(e.asStripeClasses.join(" ")), P("th, td", o).removeClass(t.sSortable + " " + t.sSortableAsc + " " + t.sSortableDesc + " " + t.sSortableNone), r.children().detach(), r.append(u), e.nTableWrapper.parentNode),
                    o = c ? "remove" : "detach",
                    u = (l[o](), s[o](), !c && i && (i.insertBefore(a, e.nTableReinsertBefore), l.css("width", e.sDestroyWidth).removeClass(t.sTable), n = e.asDestroyStripes.length) && r.children().each(function(t) {
                        P(this).addClass(e.asDestroyStripes[t % n])
                    }), P.inArray(e, w.settings));
                -1 !== u && w.settings.splice(u, 1)
            })
        }), P.each(["column", "row", "cell"], function(t, s) {
            e(s + "s().every()", function(o) {
                var i = this.selector.opts,
                    l = this;
                return this.iterator(s, function(t, e, n, a, r) {
                    o.call(l[s](e, "cell" === s ? n : i, "cell" === s ? i : H), e, n, a, r)
                })
            })
        }), e("i18n()", function(t, e, n) {
            var a = this.context[0],
                t = A(t)(a.oLanguage);
            return t === H && (t = e), "string" == typeof (t = n !== H && P.isPlainObject(t) ? t[n] !== H ? t[n] : t._ : t) ? t.replace("%d", n) : t
        }), w.version = "1.13.6", w.settings = [], w.models = {}, w.models.oSearch = {
            bCaseInsensitive: !0,
            sSearch: "",
            bRegex: !1,
            bSmart: !0,
            return: !1
        }, w.models.oRow = {
            nTr: null,
            anCells: null,
            _aData: [],
            _aSortData: null,
            _aFilterData: null,
            _sFilterRow: null,
            _sRowStripe: "",
            src: null,
            idx: -1
        }, w.models.oColumn = {
            idx: null,
            aDataSort: null,
            asSorting: null,
            bSearchable: null,
            bSortable: null,
            bVisible: null,
            _sManualType: null,
            _bAttrSrc: !1,
            fnCreatedCell: null,
            fnGetData: null,
            fnSetData: null,
            mData: null,
            mRender: null,
            nTh: null,
            nTf: null,
            sClass: null,
            sContentPadding: null,
            sDefaultContent: null,
            sName: null,
            sSortDataType: "std",
            sSortingClass: null,
            sSortingClassJUI: null,
            sTitle: null,
            sType: null,
            sWidth: null,
            sWidthOrig: null
        }, w.defaults = {
            aaData: null,
            aaSorting: [[0, "asc"]],
            aaSortingFixed: [],
            ajax: null,
            aLengthMenu: [10, 25, 50, 100],
            aoColumns: null,
            aoColumnDefs: null,
            aoSearchCols: [],
            asStripeClasses: null,
            bAutoWidth: !0,
            bDeferRender: !1,
            bDestroy: !1,
            bFilter: !0,
            bInfo: !0,
            bLengthChange: !0,
            bPaginate: !0,
            bProcessing: !1,
            bRetrieve: !1,
            bScrollCollapse: !1,
            bServerSide: !1,
            bSort: !0,
            bSortMulti: !0,
            bSortCellsTop: !1,
            bSortClasses: !0,
            bStateSave: !1,
            fnCreatedRow: null,
            fnDrawCallback: null,
            fnFooterCallback: null,
            fnFormatNumber: function(t) {
                return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands)
            },
            fnHeaderCallback: null,
            fnInfoCallback: null,
            fnInitComplete: null,
            fnPreDrawCallback: null,
            fnRowCallback: null,
            fnServerData: null,
            fnServerParams: null,
            fnStateLoadCallback: function(t) {
                try {
                    return JSON.parse((-1 === t.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + t.sInstance + "_" + location.pathname))
                } catch (t) {
                    return {}
                }
            },
            fnStateLoadParams: null,
            fnStateLoaded: null,
            fnStateSaveCallback: function(t, e) {
                try {
                    (-1 === t.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + t.sInstance + "_" + location.pathname, JSON.stringify(e))
                } catch (t) {}
            },
            fnStateSaveParams: null,
            iStateDuration: 7200,
            iDeferLoading: null,
            iDisplayLength: 10,
            iDisplayStart: 0,
            iTabIndex: 0,
            oClasses: {},
            oLanguage: {
                oAria: {
                    sSortAscending: ": activate to sort column ascending",
                    sSortDescending: ": activate to sort column descending"
                },
                oPaginate: {
                    sFirst: "First",
                    sLast: "Last",
                    sNext: "Next",
                    sPrevious: "Previous"
                },
                sEmptyTable: "No data available in table",
                sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                sInfoEmpty: "Showing 0 to 0 of 0 entries",
                sInfoFiltered: "(filtered from _MAX_ total entries)",
                sInfoPostFix: "",
                sDecimal: "",
                sThousands: ",",
                sLengthMenu: "Show _MENU_ entries",
                sLoadingRecords: "Loading...",
                sProcessing: "",
                sSearch: "Search:",
                sSearchPlaceholder: "",
                sUrl: "",
                sZeroRecords: "No matching records found"
            },
            oSearch: P.extend({}, w.models.oSearch),
            sAjaxDataProp: "data",
            sAjaxSource: null,
            sDom: "lfrtip",
            searchDelay: null,
            sPaginationType: "simple_numbers",
            sScrollX: "",
            sScrollXInner: "",
            sScrollY: "",
            sServerMethod: "GET",
            renderer: null,
            rowId: "DT_RowId"
        }, i(w.defaults), w.defaults.column = {
            aDataSort: null,
            iDataSort: -1,
            asSorting: ["asc", "desc"],
            bSearchable: !0,
            bSortable: !0,
            bVisible: !0,
            fnCreatedCell: null,
            mData: null,
            mRender: null,
            sCellType: "td",
            sClass: "",
            sContentPadding: "",
            sDefaultContent: null,
            sName: "",
            sSortDataType: "std",
            sTitle: null,
            sType: null,
            sWidth: null
        }, i(w.defaults.column), w.models.oSettings = {
            oFeatures: {
                bAutoWidth: null,
                bDeferRender: null,
                bFilter: null,
                bInfo: null,
                bLengthChange: null,
                bPaginate: null,
                bProcessing: null,
                bServerSide: null,
                bSort: null,
                bSortMulti: null,
                bSortClasses: null,
                bStateSave: null
            },
            oScroll: {
                bCollapse: null,
                iBarWidth: 0,
                sX: null,
                sXInner: null,
                sY: null
            },
            oLanguage: {
                fnInfoCallback: null
            },
            oBrowser: {
                bScrollOversize: !1,
                bScrollbarLeft: !1,
                bBounding: !1,
                barWidth: 0
            },
            ajax: null,
            aanFeatures: [],
            aoData: [],
            aiDisplay: [],
            aiDisplayMaster: [],
            aIds: {},
            aoColumns: [],
            aoHeader: [],
            aoFooter: [],
            oPreviousSearch: {},
            aoPreSearchCols: [],
            aaSorting: null,
            aaSortingFixed: [],
            asStripeClasses: null,
            asDestroyStripes: [],
            sDestroyWidth: 0,
            aoRowCallback: [],
            aoHeaderCallback: [],
            aoFooterCallback: [],
            aoDrawCallback: [],
            aoRowCreatedCallback: [],
            aoPreDrawCallback: [],
            aoInitComplete: [],
            aoStateSaveParams: [],
            aoStateLoadParams: [],
            aoStateLoaded: [],
            sTableId: "",
            nTable: null,
            nTHead: null,
            nTFoot: null,
            nTBody: null,
            nTableWrapper: null,
            bDeferLoading: !1,
            bInitialised: !1,
            aoOpenRows: [],
            sDom: null,
            searchDelay: null,
            sPaginationType: "two_button",
            iStateDuration: 0,
            aoStateSave: [],
            aoStateLoad: [],
            oSavedState: null,
            oLoadedState: null,
            sAjaxSource: null,
            sAjaxDataProp: null,
            jqXHR: null,
            json: H,
            oAjaxData: H,
            fnServerData: null,
            aoServerParams: [],
            sServerMethod: null,
            fnFormatNumber: null,
            aLengthMenu: null,
            iDraw: 0,
            bDrawing: !1,
            iDrawError: -1,
            _iDisplayLength: 10,
            _iDisplayStart: 0,
            _iRecordsTotal: 0,
            _iRecordsDisplay: 0,
            oClasses: {},
            bFiltered: !1,
            bSorted: !1,
            bSortCellsTop: null,
            oInit: null,
            aoDestroyCallback: [],
            fnRecordsTotal: function() {
                return "ssp" == E(this) ? +this._iRecordsTotal : this.aiDisplayMaster.length
            },
            fnRecordsDisplay: function() {
                return "ssp" == E(this) ? +this._iRecordsDisplay : this.aiDisplay.length
            },
            fnDisplayEnd: function() {
                var t = this._iDisplayLength,
                    e = this._iDisplayStart,
                    n = e + t,
                    a = this.aiDisplay.length,
                    r = this.oFeatures,
                    o = r.bPaginate;
                return r.bServerSide ? !1 === o || -1 === t ? e + a : Math.min(e + t, this._iRecordsDisplay) : !o || a < n || -1 === t ? a : n
            },
            oInstance: null,
            sInstance: null,
            iTabIndex: 0,
            nScrollHead: null,
            nScrollFoot: null,
            aLastSort: [],
            oPlugins: {},
            rowIdFn: null,
            rowId: null
        }, w.ext = p = {
            buttons: {},
            classes: {},
            builder: "bs5/jszip-3.10.1/dt-1.13.6/af-2.6.0/b-2.4.2/b-colvis-2.4.2/b-html5-2.4.2/b-print-2.4.2/cr-1.7.0/date-1.5.1/fc-4.3.0/fh-3.4.0/kt-2.10.0/r-2.5.0/rg-1.4.0/rr-1.4.1/sc-2.2.0/sb-1.6.0/sp-2.2.0/sl-1.7.0/sr-1.3.0",
            errMode: "alert",
            feature: [],
            search: [],
            selector: {
                cell: [],
                column: [],
                row: []
            },
            internal: {},
            legacy: {
                ajax: null
            },
            pager: {},
            renderer: {
                pageButton: {},
                header: {}
            },
            order: {},
            type: {
                detect: [],
                search: {},
                order: {}
            },
            _unique: 0,
            fnVersionCheck: w.fnVersionCheck,
            iApiIndex: 0,
            oJUIClasses: {},
            sVersion: w.version
        }, P.extend(p, {
            afnFiltering: p.search,
            aTypes: p.type.detect,
            ofnSearch: p.type.search,
            oSort: p.type.order,
            afnSortData: p.order,
            aoFeatures: p.feature,
            oApi: p.internal,
            oStdClasses: p.classes,
            oPagination: p.pager
        }), P.extend(w.ext.classes, {
            sTable: "dataTable",
            sNoFooter: "no-footer",
            sPageButton: "paginate_button",
            sPageButtonActive: "current",
            sPageButtonDisabled: "disabled",
            sStripeOdd: "odd",
            sStripeEven: "even",
            sRowEmpty: "dataTables_empty",
            sWrapper: "dataTables_wrapper",
            sFilter: "dataTables_filter",
            sInfo: "dataTables_info",
            sPaging: "dataTables_paginate paging_",
            sLength: "dataTables_length",
            sProcessing: "dataTables_processing",
            sSortAsc: "sorting_asc",
            sSortDesc: "sorting_desc",
            sSortable: "sorting",
            sSortableAsc: "sorting_desc_disabled",
            sSortableDesc: "sorting_asc_disabled",
            sSortableNone: "sorting_disabled",
            sSortColumn: "sorting_",
            sFilterInput: "",
            sLengthSelect: "",
            sScrollWrapper: "dataTables_scroll",
            sScrollHead: "dataTables_scrollHead",
            sScrollHeadInner: "dataTables_scrollHeadInner",
            sScrollBody: "dataTables_scrollBody",
            sScrollFoot: "dataTables_scrollFoot",
            sScrollFootInner: "dataTables_scrollFootInner",
            sHeaderTH: "",
            sFooterTH: "",
            sSortJUIAsc: "",
            sSortJUIDesc: "",
            sSortJUI: "",
            sSortJUIAscAllowed: "",
            sSortJUIDescAllowed: "",
            sSortJUIWrapper: "",
            sSortIcon: "",
            sJUIHeader: "",
            sJUIFooter: ""
        }), w.ext.pager);
    function Oe(t, e) {
        var n = [],
            a = Ne.numbers_length,
            r = Math.floor(a / 2);
        return e <= a ? n = f(0, e) : t <= r ? ((n = f(0, a - 2)).push("ellipsis"), n.push(e - 1)) : ((e - 1 - r <= t ? n = f(e - (a - 2), e) : ((n = f(t - r + 2, t + r - 1)).push("ellipsis"), n.push(e - 1), n)).splice(0, 0, "ellipsis"), n.splice(0, 0, 0)), n.DT_el = "span", n
    }
    P.extend(Ne, {
        simple: function(t, e) {
            return ["previous", "next"]
        },
        full: function(t, e) {
            return ["first", "previous", "next", "last"]
        },
        numbers: function(t, e) {
            return [Oe(t, e)]
        },
        simple_numbers: function(t, e) {
            return ["previous", Oe(t, e), "next"]
        },
        full_numbers: function(t, e) {
            return ["first", "previous", Oe(t, e), "next", "last"]
        },
        first_last_numbers: function(t, e) {
            return ["first", Oe(t, e), "last"]
        },
        _numbers: Oe,
        numbers_length: 7
    }),
        P.extend(!0, w.ext.renderer, {
            pageButton: {
                _: function(u, t, c, e, f, d) {
                    function h(t, e) {
                        for (var n, a = b.sPageButtonDisabled, r = function(t) {
                            Yt(u, t.data.action, !0)
                        }, o = 0, i = e.length; o < i; o++)
                            if (n = e[o], Array.isArray(n)) {
                                var l = P("<" + (n.DT_el || "div") + "/>").appendTo(t);
                                h(l, n)
                            } else {
                                var s = !1;
                                switch (p = null, g = n) {
                                    case "ellipsis":
                                        t.append('<span class="ellipsis">&#x2026;</span>');
                                        break;
                                    case "first":
                                        p = m.sFirst,
                                        0 === f && (s = !0);
                                        break;
                                    case "previous":
                                        p = m.sPrevious,
                                        0 === f && (s = !0);
                                        break;
                                    case "next":
                                        p = m.sNext,
                                        0 !== d && f !== d - 1 || (s = !0);
                                        break;
                                    case "last":
                                        p = m.sLast,
                                        0 !== d && f !== d - 1 || (s = !0);
                                        break;
                                    default:
                                        p = u.fnFormatNumber(n + 1),
                                            g = f === n ? b.sPageButtonActive : ""
                                }
                                null !== p && (l = u.oInit.pagingTag || "a", s && (g += " " + a), me(P("<" + l + ">", {
                                    class: b.sPageButton + " " + g,
                                    "aria-controls": u.sTableId,
                                    "aria-disabled": s ? "true" : null,
                                    "aria-label": S[n],
                                    role: "link",
                                    "aria-current": g === b.sPageButtonActive ? "page" : null,
                                    "data-dt-idx": n,
                                    tabindex: s ? -1 : u.iTabIndex,
                                    id: 0 === c && "string" == typeof n ? u.sTableId + "_" + n : null
                                }).html(p).appendTo(t), {
                                    action: n
                                }, r))
                            }
                    }
                    var p,
                        g,
                        n,
                        b = u.oClasses,
                        m = u.oLanguage.oPaginate,
                        S = u.oLanguage.oAria.paginate || {};
                    try {
                        n = P(t).find(v.activeElement).data("dt-idx")
                    } catch (t) {}
                    h(P(t).empty(), e),
                    n !== H && P(t).find("[data-dt-idx=" + n + "]").trigger("focus")
                }
            }
        }),
        P.extend(w.ext.type.detect, [function(t, e) {
            e = e.oLanguage.sDecimal;
            return l(t, e) ? "num" + e : null
        }, function(t, e) {
            var n;
            return (!t || t instanceof Date || X.test(t)) && (null !== (n = Date.parse(t)) && !isNaN(n) || h(t)) ? "date" : null
        }, function(t, e) {
            e = e.oLanguage.sDecimal;
            return l(t, e, !0) ? "num-fmt" + e : null
        }, function(t, e) {
            e = e.oLanguage.sDecimal;
            return a(t, e) ? "html-num" + e : null
        }, function(t, e) {
            e = e.oLanguage.sDecimal;
            return a(t, e, !0) ? "html-num-fmt" + e : null
        }, function(t, e) {
            return h(t) || "string" == typeof t && -1 !== t.indexOf("<") ? "html" : null
        }]),
        P.extend(w.ext.type.search, {
            html: function(t) {
                return h(t) ? t : "string" == typeof t ? t.replace(U, " ").replace(V, "") : ""
            },
            string: function(t) {
                return !h(t) && "string" == typeof t ? t.replace(U, " ") : t
            }
        });
    function ke(t, e, n, a) {
        var r;
        return 0 === t || t && "-" !== t ? "number" == (r = typeof t) || "bigint" == r ? t : +(t = (t = e ? $(t, e) : t).replace && (n && (t = t.replace(n, "")), a) ? t.replace(a, "") : t) : -1 / 0
    }
    function Me(n) {
        P.each({
            num: function(t) {
                return ke(t, n)
            },
            "num-fmt": function(t) {
                return ke(t, n, q)
            },
            "html-num": function(t) {
                return ke(t, n, V)
            },
            "html-num-fmt": function(t) {
                return ke(t, n, V, q)
            }
        }, function(t, e) {
            p.type.order[t + n + "-pre"] = e,
            t.match(/^html\-/) && (p.type.search[t + n] = p.type.search.html)
        })
    }
    P.extend(p.type.order, {
        "date-pre": function(t) {
            t = Date.parse(t);
            return isNaN(t) ? -1 / 0 : t
        },
        "html-pre": function(t) {
            return h(t) ? "" : t.replace ? t.replace(/<.*?>/g, "").toLowerCase() : t + ""
        },
        "string-pre": function(t) {
            return h(t) ? "" : "string" == typeof t ? t.toLowerCase() : t.toString ? t.toString() : ""
        },
        "string-asc": function(t, e) {
            return t < e ? -1 : e < t ? 1 : 0
        },
        "string-desc": function(t, e) {
            return t < e ? 1 : e < t ? -1 : 0
        }
    }),
        Me(""),
        P.extend(!0, w.ext.renderer, {
            header: {
                _: function(r, o, i, l) {
                    P(r.nTable).on("order.dt.DT", function(t, e, n, a) {
                        r === e && (e = i.idx, o.removeClass(l.sSortAsc + " " + l.sSortDesc).addClass("asc" == a[e] ? l.sSortAsc : "desc" == a[e] ? l.sSortDesc : i.sSortingClass))
                    })
                },
                jqueryui: function(r, o, i, l) {
                    P("<div/>").addClass(l.sSortJUIWrapper).append(o.contents()).append(P("<span/>").addClass(l.sSortIcon + " " + i.sSortingClassJUI)).appendTo(o),
                        P(r.nTable).on("order.dt.DT", function(t, e, n, a) {
                            r === e && (e = i.idx, o.removeClass(l.sSortAsc + " " + l.sSortDesc).addClass("asc" == a[e] ? l.sSortAsc : "desc" == a[e] ? l.sSortDesc : i.sSortingClass), o.find("span." + l.sSortIcon).removeClass(l.sSortJUIAsc + " " + l.sSortJUIDesc + " " + l.sSortJUI + " " + l.sSortJUIAscAllowed + " " + l.sSortJUIDescAllowed).addClass("asc" == a[e] ? l.sSortJUIAsc : "desc" == a[e] ? l.sSortJUIDesc : i.sSortingClassJUI))
                        })
                }
            }
        });
    function We(t) {
        return "string" == typeof (t = Array.isArray(t) ? t.join(",") : t) ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : t
    }
    function Ee(t, e, n, a, r) {
        return j.moment ? t[e](r) : j.luxon ? t[n](r) : a ? t[a](r) : t
    }
    var Be = !1;
    function Ue(t, e, n) {
        var a;
        if (j.moment) {
            if (!(a = j.moment.utc(t, e, n, !0)).isValid())
                return null
        } else if (j.luxon) {
            if (!(a = e && "string" == typeof t ? j.luxon.DateTime.fromFormat(t, e) : j.luxon.DateTime.fromISO(t)).isValid)
                return null;
            a.setLocale(n)
        } else
            e ? (Be || alert("DataTables warning: Formatted date without Moment.js or Luxon - https://datatables.net/tn/17"), Be = !0) : a = new Date(t);
        return a
    }
    function Ve(s) {
        return function(a, r, o, i) {
            0 === arguments.length ? (o = "en", a = r = null) : 1 === arguments.length ? (o = "en", r = a, a = null) : 2 === arguments.length && (o = r, r = a, a = null);
            var l = "datetime-" + r;
            return w.ext.type.order[l] || (w.ext.type.detect.unshift(function(t) {
                return t === l && l
            }), w.ext.type.order[l + "-asc"] = function(t, e) {
                t = t.valueOf(),
                    e = e.valueOf();
                return t === e ? 0 : t < e ? -1 : 1
            }, w.ext.type.order[l + "-desc"] = function(t, e) {
                t = t.valueOf(),
                    e = e.valueOf();
                return t === e ? 0 : e < t ? -1 : 1
            }), function(t, e) {
                var n;
                return null !== t && t !== H || (t = "--now" === i ? (n = new Date, new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds()))) : ""), "type" === e ? l : "" === t ? "sort" !== e ? "" : Ue("0000-01-01 00:00:00", null, o) : !(null === r || a !== r || "sort" === e || "type" === e || t instanceof Date) || null === (n = Ue(t, a, o)) ? t : "sort" === e ? n : (t = null === r ? Ee(n, "toDate", "toJSDate", "")[s]() : Ee(n, "format", "toFormat", "toISOString", r), "display" === e ? We(t) : t)
            }
        }
    }
    var Xe = ",",
        Je = ".";
    if (j.Intl !== H)
        try {
            for (var qe = (new Intl.NumberFormat).formatToParts(100000.1), n = 0; n < qe.length; n++)
                "group" === qe[n].type ? Xe = qe[n].value : "decimal" === qe[n].type && (Je = qe[n].value)
        } catch (t) {}
    function $e(e) {
        return function() {
            var t = [ge(this[w.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
            return w.ext.internal[e].apply(this, t)
        }
    }
    return w.datetime = function(n, a) {
        var r = "datetime-detect-" + n;
        a = a || "en",
        w.ext.type.order[r] || (w.ext.type.detect.unshift(function(t) {
            var e = Ue(t, n, a);
            return !("" !== t && !e) && r
        }), w.ext.type.order[r + "-pre"] = function(t) {
            return Ue(t, n, a) || 0
        })
    }, w.render = {
        date: Ve("toLocaleDateString"),
        datetime: Ve("toLocaleString"),
        time: Ve("toLocaleTimeString"),
        number: function(a, r, o, i, l) {
            return null !== a && a !== H || (a = Xe), null !== r && r !== H || (r = Je), {
                display: function(t) {
                    if ("number" != typeof t && "string" != typeof t)
                        return t;
                    if ("" === t || null === t)
                        return t;
                    var e = t < 0 ? "-" : "",
                        n = parseFloat(t);
                    if (isNaN(n))
                        return We(t);
                    n = n.toFixed(o),
                        t = Math.abs(n);
                    n = parseInt(t, 10),
                        t = o ? r + (t - n).toFixed(o).substring(2) : "";
                    return (e = 0 === n && 0 === parseFloat(t) ? "" : e) + (i || "") + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) + t + (l || "")
                }
            }
        },
        text: function() {
            return {
                display: We,
                filter: We
            }
        }
    }, P.extend(w.ext.internal, {
        _fnExternApiFunc: $e,
        _fnBuildAjax: Tt,
        _fnAjaxUpdate: xt,
        _fnAjaxParameters: At,
        _fnAjaxUpdateDraw: It,
        _fnAjaxDataSrc: Ft,
        _fnAddColumn: nt,
        _fnColumnOptions: at,
        _fnAdjustColumnSizing: O,
        _fnVisibleToColumnIndex: rt,
        _fnColumnIndexToVisible: ot,
        _fnVisbleColumns: T,
        _fnGetColumns: it,
        _fnColumnTypes: lt,
        _fnApplyColumnDefs: st,
        _fnHungarianMap: i,
        _fnCamelToHungarian: C,
        _fnLanguageCompat: Z,
        _fnBrowserDetect: tt,
        _fnAddData: x,
        _fnAddTr: ut,
        _fnNodeToDataIndex: function(t, e) {
            return e._DT_RowIndex !== H ? e._DT_RowIndex : null
        },
        _fnNodeToColumnIndex: function(t, e, n) {
            return P.inArray(n, t.aoData[e].anCells)
        },
        _fnGetCellData: S,
        _fnSetCellData: ct,
        _fnSplitObjNotation: dt,
        _fnGetObjectDataFn: A,
        _fnSetObjectDataFn: b,
        _fnGetDataMaster: ht,
        _fnClearTable: pt,
        _fnDeleteIndex: gt,
        _fnInvalidate: bt,
        _fnGetRowElements: mt,
        _fnCreateTr: St,
        _fnBuildHead: yt,
        _fnDrawHead: Dt,
        _fnDraw: y,
        _fnReDraw: u,
        _fnAddOptionsHtml: _t,
        _fnDetectHeader: wt,
        _fnGetUniqueThs: Ct,
        _fnFeatureHtmlFilter: Lt,
        _fnFilterComplete: Rt,
        _fnFilterCustom: Pt,
        _fnFilterColumn: jt,
        _fnFilter: Ht,
        _fnFilterCreateSearch: Nt,
        _fnEscapeRegex: Ot,
        _fnFilterData: Wt,
        _fnFeatureHtmlInfo: Ut,
        _fnUpdateInfo: Vt,
        _fnInfoMacros: Xt,
        _fnInitialise: Jt,
        _fnInitComplete: qt,
        _fnLengthChange: $t,
        _fnFeatureHtmlLength: Gt,
        _fnFeatureHtmlPaginate: zt,
        _fnPageChange: Yt,
        _fnFeatureHtmlProcessing: Zt,
        _fnProcessingDisplay: D,
        _fnFeatureHtmlTable: Kt,
        _fnScrollDraw: Qt,
        _fnApplyToChildren: k,
        _fnCalculateColumnWidths: ee,
        _fnThrottle: ne,
        _fnConvertToWidth: ae,
        _fnGetWidestNode: re,
        _fnGetMaxLenString: oe,
        _fnStringToCss: M,
        _fnSortFlatten: I,
        _fnSort: ie,
        _fnSortAria: le,
        _fnSortListener: se,
        _fnSortAttachListener: ue,
        _fnSortingClasses: ce,
        _fnSortData: fe,
        _fnSaveState: de,
        _fnLoadState: he,
        _fnImplementState: pe,
        _fnSettingsFromNode: ge,
        _fnLog: W,
        _fnMap: F,
        _fnBindAction: me,
        _fnCallbackReg: L,
        _fnCallbackFire: R,
        _fnLengthOverflow: Se,
        _fnRenderer: ve,
        _fnDataSource: E,
        _fnRowAttributes: vt,
        _fnExtend: be,
        _fnCalculateEnd: function() {}
    }), ((P.fn.dataTable = w).$ = P).fn.dataTableSettings = w.settings, P.fn.dataTableExt = w.ext, P.fn.DataTable = function(t) {
        return P(this).dataTable(t).api()
    }, P.each(w, function(t, e) {
        P.fn.DataTable[t] = e
    }), w
});

/*! DataTables Bootstrap 5 integration
 * 2020 SpryMedia Ltd - datatables.net/license
 */
!function(t) {
    var n,
        r;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(e) {
        return t(e, window, document)
    }) : "object" == typeof exports ? (n = require("jquery"), r = function(e, a) {
        a.fn.dataTable || require("datatables.net")(e, a)
    }, "undefined" == typeof window ? module.exports = function(e, a) {
        return e = e || window, a = a || n(e), r(e, a), t(a, 0, e.document)
    } : (r(window, n), module.exports = t(n, window, window.document))) : t(jQuery, window, document)
}(function(x, e, r, o) {
    "use strict";
    var i = x.fn.dataTable;
    return x.extend(!0, i.defaults, {
        dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row dt-row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        renderer: "bootstrap"
    }), x.extend(i.ext.classes, {
        sWrapper: "dataTables_wrapper dt-bootstrap5",
        sFilterInput: "form-control form-control-sm",
        sLengthSelect: "form-select form-select-sm",
        sProcessing: "dataTables_processing card",
        sPageButton: "paginate_button page-item"
    }), i.ext.renderer.pageButton.bootstrap = function(d, e, s, a, l, c) {
        function u(e, a) {
            for (var t, n, r = function(e) {
                e.preventDefault(),
                x(e.currentTarget).hasClass("disabled") || b.page() == e.data.action || b.page(e.data.action).draw("page")
            }, o = 0, i = a.length; o < i; o++)
                if (t = a[o], Array.isArray(t))
                    u(e, t);
                else {
                    switch (f = p = "", t) {
                        case "ellipsis":
                            p = "&#x2026;",
                                f = "disabled";
                            break;
                        case "first":
                            p = g.sFirst,
                                f = t + (0 < l ? "" : " disabled");
                            break;
                        case "previous":
                            p = g.sPrevious,
                                f = t + (0 < l ? "" : " disabled");
                            break;
                        case "next":
                            p = g.sNext,
                                f = t + (l < c - 1 ? "" : " disabled");
                            break;
                        case "last":
                            p = g.sLast,
                                f = t + (l < c - 1 ? "" : " disabled");
                            break;
                        default:
                            p = t + 1,
                                f = l === t ? "active" : ""
                    }
                    p && (n = -1 !== f.indexOf("disabled"), n = x("<li>", {
                        class: m.sPageButton + " " + f,
                        id: 0 === s && "string" == typeof t ? d.sTableId + "_" + t : null
                    }).append(x("<a>", {
                        href: n ? null : "#",
                        "aria-controls": d.sTableId,
                        "aria-disabled": n ? "true" : null,
                        "aria-label": w[t],
                        role: "link",
                        "aria-current": "active" === f ? "page" : null,
                        "data-dt-idx": t,
                        tabindex: n ? -1 : d.iTabIndex,
                        class: "page-link"
                    }).html(p)).appendTo(e), d.oApi._fnBindAction(n, {
                        action: t
                    }, r))
                }
        }
        var p,
            f,
            t,
            b = new i.Api(d),
            m = d.oClasses,
            g = d.oLanguage.oPaginate,
            w = d.oLanguage.oAria.paginate || {},
            e = x(e);
        try {
            t = e.find(r.activeElement).data("dt-idx")
        } catch (e) {}
        var n = e.children("ul.pagination");
        n.length ? n.empty() : n = e.html("<ul/>").children("ul").addClass("pagination"),
            u(n, a),
        t !== o && e.find("[data-dt-idx=" + t + "]").trigger("focus")
    }, i
});

/*! AutoFill 2.6.0
 * ©2008-2023 SpryMedia Ltd - datatables.net/license
 */
!function(o) {
    var i,
        n;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return o(t, window, document)
    }) : "object" == typeof exports ? (i = require("jquery"), n = function(t, e) {
        e.fn.dataTable || require("datatables.net")(t, e)
    }, "undefined" == typeof window ? module.exports = function(t, e) {
        return t = t || window, e = e || i(t), n(t, e), o(e, t, t.document)
    } : (n(window, i), module.exports = o(i, window, window.document))) : o(jQuery, window, document)
}(function(m, d, p, b) {
    "use strict";
    function r(t, e) {
        if (!l.versionCheck || !l.versionCheck("1.10.8"))
            throw "Warning: AutoFill requires DataTables 1.10.8 or greater";
        this.c = m.extend(!0, {}, l.defaults.autoFill, r.defaults, e),
            this.s = {
                dt: new l.Api(t),
                namespace: ".autoFill" + o++,
                scroll: {},
                scrollInterval: null,
                handle: {
                    height: 0,
                    width: 0
                },
                enabled: !1
            },
            this.dom = {
                closeButton: m('<div class="dtaf-popover-close">&times;</div>'),
                handle: m('<div class="dt-autofill-handle"/>'),
                select: {
                    top: m('<div class="dt-autofill-select top"/>'),
                    right: m('<div class="dt-autofill-select right"/>'),
                    bottom: m('<div class="dt-autofill-select bottom"/>'),
                    left: m('<div class="dt-autofill-select left"/>')
                },
                background: m('<div class="dt-autofill-background"/>'),
                list: m('<div class="dt-autofill-list">' + this.s.dt.i18n("autoFill.info", "") + "</div>").attr("aria-modal", !0).attr("role", "dialog").append('<div class="dt-autofill-list-items"></div>'),
                dtScroll: null,
                offsetParent: null
            },
            this._constructor()
    }
    var l = m.fn.dataTable,
        o = 0,
        t = (m.extend(r.prototype, {
            enabled: function() {
                return this.s.enabled
            },
            enable: function(t) {
                var e = this;
                if (!1 === t)
                    return this.disable();
                this.s.enabled = !0,
                    this._focusListener(),
                    this.dom.handle.on("mousedown touchstart", function(t) {
                        return e._mousedown(t), !1
                    }),
                    m(d).on("resize", function() {
                        0 < m("div.dt-autofill-handle").length && e.dom.attachedTo !== b && e._attach(e.dom.attachedTo)
                    });
                function o() {
                    e.s.handle = {
                        height: !1,
                        width: !1
                    },
                        m(e.dom.handle).css({
                            height: "",
                            width: ""
                        }),
                    e.dom.attachedTo !== b && e._attach(e.dom.attachedTo)
                }
                return m(d).on("orientationchange", function() {
                    setTimeout(function() {
                        o(),
                            setTimeout(o, 150)
                    }, 50)
                }), this
            },
            disable: function() {
                return this.s.enabled = !1, this._focusListenerRemove(), this
            },
            _constructor: function() {
                var t = this,
                    e = this.s.dt,
                    o = m("div.dataTables_scrollBody", this.s.dt.table().container());
                e.settings()[0].autoFill = this,
                o.length && "static" === (this.dom.dtScroll = o).css("position") && o.css("position", "relative"),
                !1 !== this.c.enable && this.enable(),
                    e.on("destroy.autoFill", function() {
                        t._focusListenerRemove()
                    })
            },
            _attach: function(t) {
                var e = this.s.dt,
                    o = e.cell(t).index(),
                    i = this.dom.handle,
                    n = this.s.handle;
                o && -1 !== e.columns(this.c.columns).indexes().indexOf(o.column) ? (this.dom.offsetParent || (this.dom.offsetParent = m(e.table().node()).offsetParent()), n.height && n.width || (i.appendTo("body"), n.height = i.outerHeight(), n.width = i.outerWidth()), o = this._getPosition(t, this.dom.offsetParent), this.dom.attachedTo = t, i.css({
                    top: o.top + t.offsetHeight - n.height,
                    left: o.left + t.offsetWidth - n.width
                }).appendTo(this.dom.offsetParent)) : this._detach()
            },
            _actionSelector: function(o) {
                var t,
                    i,
                    n = this,
                    l = this.s.dt,
                    s = r.actions,
                    a = [];
                m.each(s, function(t, e) {
                    e.available(l, o) && a.push(t)
                }),
                    1 === a.length && !1 === this.c.alwaysAsk ? (t = s[a[0]].execute(l, o), this._update(t, o)) : (1 < a.length || this.c.alwaysAsk) && (i = this.dom.list.children("div.dt-autofill-list-items").empty(), a.push("cancel"), m.each(a, function(t, e) {
                        i.append(m("<button/>").html(s[e].option(l, o)).append(m('<span class="dt-autofill-button"/>').html(l.i18n("autoFill.button", "&gt;"))).on("click", function() {
                            var t = s[e].execute(l, o, m(this).closest("li"));
                            n._update(t, o),
                                n.dom.background.remove(),
                                n.dom.list.remove()
                        }))
                    }), this.dom.background.appendTo("body"), this.dom.background.one("click", function() {
                        n.dom.background.remove(),
                            n.dom.list.remove()
                    }), this.dom.list.appendTo("body"), this.c.closeButton && (this.dom.list.prepend(this.dom.closeButton).addClass(r.classes.closeable), this.dom.closeButton.on("click", function() {
                        return n.dom.background.click()
                    })), this.dom.list.css("margin-top", this.dom.list.outerHeight() / 2 * -1))
            },
            _detach: function() {
                this.dom.attachedTo = null,
                    this.dom.handle.detach()
            },
            _drawSelection: function(t, e) {
                var o,
                    i = this.s.dt,
                    n = this.s.start,
                    l = m(this.dom.start),
                    t = {
                        row: this.c.vertical ? i.rows({
                            page: "current"
                        }).nodes().indexOf(t.parentNode) : n.row,
                        column: this.c.horizontal ? m(t).index() : n.column
                    },
                    s = i.column.index("toData", t.column),
                    a = i.row(":eq(" + t.row + ")", {
                        page: "current"
                    }),
                    a = m(i.cell(a.index(), s).node());
                i.cell(a).any() && -1 !== i.columns(this.c.columns).indexes().indexOf(s) && -1 !== t.row && (this.s.end = t, i = n.row < t.row ? l : a, s = n.row < t.row ? a : l, o = n.column < t.column ? l : a, n = n.column < t.column ? a : l, i = this._getPosition(i.get(0)).top, o = this._getPosition(o.get(0)).left, t = this._getPosition(s.get(0)).top + s.outerHeight() - i, a = this._getPosition(n.get(0)).left + n.outerWidth() - o, (l = this.dom.select).top.css({
                    top: i,
                    left: o,
                    width: a
                }), l.left.css({
                    top: i,
                    left: o,
                    height: t
                }), l.bottom.css({
                    top: i + t,
                    left: o,
                    width: a
                }), l.right.css({
                    top: i,
                    left: o + a,
                    height: t
                }))
            },
            _editor: function(t) {
                var e = this.s.dt,
                    o = this.c.editor;
                if (o) {
                    for (var i = {}, n = [], l = o.fields(), s = 0, a = t.length; s < a; s++)
                        for (var r = 0, d = t[s].length; r < d; r++) {
                            var c = t[s][r],
                                u = e.settings()[0].aoColumns[c.index.column],
                                h = u.editField;
                            if (h === b)
                                for (var f = u.mData, m = 0, p = l.length; m < p; m++) {
                                    var v = o.field(l[m]);
                                    if (v.dataSrc() === f) {
                                        h = v.name();
                                        break
                                    }
                                }
                            if (!h)
                                throw "Could not automatically determine field data. Please see https://datatables.net/tn/11";
                            i[h] || (i[h] = {});
                            u = e.row(c.index.row).id();
                            i[h][u] = c.set,
                                n.push(c.index)
                        }
                    o.bubble(n, !1).multiSet(i).submit()
                }
            },
            _emitEvent: function(o, i) {
                this.s.dt.iterator("table", function(t, e) {
                    m(t.nTable).triggerHandler(o + ".dt", i)
                })
            },
            _focusListener: function() {
                var i = this,
                    e = this.s.dt,
                    t = this.s.namespace,
                    o = null !== this.c.focus ? this.c.focus : e.init().keys || e.settings()[0].keytable ? "focus" : "hover";
                "focus" === o ? e.on("key-focus.autoFill", function(t, e, o) {
                    i._attach(o.node())
                }).on("key-blur.autoFill", function(t, e, o) {
                    i._detach()
                }) : "click" === o ? (m(e.table().body()).on("click" + t, "td, th", function(t) {
                    i._attach(this)
                }), m(p.body).on("click" + t, function(t) {
                    m(t.target).parents().filter(e.table().body()).length || i._detach()
                })) : m(e.table().body()).on("mouseenter" + t + " touchstart" + t, "td, th", function(t) {
                    i._attach(this)
                }).on("mouseleave" + t + "touchend" + t, function(t) {
                    m(t.relatedTarget).hasClass("dt-autofill-handle") || i._detach()
                })
            },
            _focusListenerRemove: function() {
                var t = this.s.dt;
                t.off(".autoFill"),
                    m(t.table().body()).off(this.s.namespace),
                    m(p.body).off(this.s.namespace)
            },
            _getPosition: function(t, e) {
                var o = t,
                    i = 0,
                    n = 0;
                e = e || m(m(this.s.dt.table().node())[0].offsetParent);
                do {
                    var l = o.offsetTop,
                        s = o.offsetLeft,
                        a = m(o.offsetParent)
                } while ((i += l + +parseInt(a.css("border-top-width") || 0), n += s + +parseInt(a.css("border-left-width") || 0), "body" !== o.nodeName.toLowerCase()) && (o = a.get(0), a.get(0) !== e.get(0)));
                return {
                    top: i,
                    left: n
                }
            },
            _mousedown: function(t) {
                var e = this,
                    o = this.s.dt,
                    i = (this.dom.start = this.dom.attachedTo, this.s.start = {
                        row: o.rows({
                            page: "current"
                        }).nodes().indexOf(m(this.dom.start).parent()[0]),
                        column: m(this.dom.start).index()
                    }, m(p.body).on("mousemove.autoFill touchmove.autoFill", function(t) {
                        e._mousemove(t),
                        "touchmove" === t.type && m(p.body).one("touchend.autoFill", function() {
                            e._detach()
                        })
                    }).on("mouseup.autoFill touchend.autoFill", function(t) {
                        e._mouseup(t)
                    }), this.dom.select),
                    o = m(o.table().node()).offsetParent(),
                    i = (i.top.appendTo(o), i.left.appendTo(o), i.right.appendTo(o), i.bottom.appendTo(o), this._drawSelection(this.dom.start, t), this.dom.handle.css("display", "none"), this.dom.dtScroll);
                this.s.scroll = {
                    windowHeight: m(d).height(),
                    windowWidth: m(d).width(),
                    dtTop: i ? i.offset().top : null,
                    dtLeft: i ? i.offset().left : null,
                    dtHeight: i ? i.outerHeight() : null,
                    dtWidth: i ? i.outerWidth() : null
                }
            },
            _mousemove: function(t) {
                var e = t.touches && t.touches.length ? p.elementFromPoint(t.touches[0].clientX, t.touches[0].clientY) : t.target,
                    o = e.nodeName.toLowerCase();
                "td" !== o && "th" !== o || (this._drawSelection(e, t), this._shiftScroll(t))
            },
            _mouseup: function(t) {
                m(p.body).off(".autoFill");
                var e = this,
                    n = this.s.dt,
                    o = this.dom.select,
                    o = (o.top.remove(), o.left.remove(), o.right.remove(), o.bottom.remove(), this.dom.handle.css("display", "block"), this.s.start),
                    i = this.s.end;
                if (o.row !== i.row || o.column !== i.column) {
                    var l,
                        s = n.cell(":eq(" + o.row + ")", o.column + ":visible", {
                            page: "current"
                        });
                    if (m("div.DTE", s.node()).length)
                        (l = n.editor()).on("submitSuccess.dtaf close.dtaf", function() {
                            l.off(".dtaf"),
                                setTimeout(function() {
                                    e._mouseup(t)
                                }, 100)
                        }).on("submitComplete.dtaf preSubmitCancelled.dtaf close.dtaf", function() {
                            l.off(".dtaf")
                        }),
                            l.submit();
                    else {
                        for (var a = this._range(o.row, i.row), r = this._range(o.column, i.column), d = [], c = n.settings()[0], u = c.aoColumns, h = n.columns(this.c.columns).indexes(), f = 0; f < a.length; f++)
                            d.push(m.map(r, function(t) {
                                var e = n.row(":eq(" + a[f] + ")", {
                                        page: "current"
                                    }),
                                    e = n.cell(e.index(), t + ":visible"),
                                    t = e.data(),
                                    o = e.index(),
                                    i = u[o.column].editField;
                                if (i !== b && (t = c.oApi._fnGetObjectDataFn(i)(n.row(o.row).data())), -1 !== h.indexOf(o.column))
                                    return {
                                        cell: e,
                                        data: t,
                                        label: e.data(),
                                        index: o
                                    }
                            }));
                        this._actionSelector(d),
                            clearInterval(this.s.scrollInterval),
                            this.s.scrollInterval = null
                    }
                }
            },
            _range: function(t, e) {
                var o,
                    i = [];
                if (t <= e)
                    for (o = t; o <= e; o++)
                        i.push(o);
                else
                    for (o = t; e <= o; o--)
                        i.push(o);
                return i
            },
            _shiftScroll: function(t) {
                var e,
                    o,
                    i,
                    n,
                    l = this,
                    s = (this.s.dt, this.s.scroll),
                    a = !1,
                    r = t.type.includes("touch") ? t.touches[0].clientX : t.pageX - d.scrollX,
                    t = t.type.includes("touch") ? t.touches[0].clientY : t.pageY - d.scrollY;
                t < 65 ? e = -5 : t > s.windowHeight - 65 && (e = 5),
                    r < 65 ? o = -5 : r > s.windowWidth - 65 && (o = 5),
                    null !== s.dtTop && t < s.dtTop + 65 ? i = -5 : null !== s.dtTop && t > s.dtTop + s.dtHeight - 65 && (i = 5),
                    null !== s.dtLeft && r < s.dtLeft + 65 ? n = -5 : null !== s.dtLeft && r > s.dtLeft + s.dtWidth - 65 && (n = 5),
                    e || o || i || n ? (s.windowVert = e, s.windowHoriz = o, s.dtVert = i, s.dtHoriz = n, a = !0) : this.s.scrollInterval && (clearInterval(this.s.scrollInterval), this.s.scrollInterval = null),
                !this.s.scrollInterval && a && (this.s.scrollInterval = setInterval(function() {
                    var t;
                    d.scrollTo(d.scrollX + (s.windowHoriz || 0), d.scrollY + (s.windowVert || 0)),
                    (s.dtVert || s.dtHoriz) && (t = l.dom.dtScroll[0], s.dtVert && (t.scrollTop += s.dtVert), s.dtHoriz) && (t.scrollLeft += s.dtHoriz)
                }, 20))
            },
            _update: function(t, e) {
                if (!1 !== t) {
                    var o,
                        t = this.s.dt,
                        i = t.columns(this.c.columns).indexes();
                    if (this._emitEvent("preAutoFill", [t, e]), this._editor(e), null !== this.c.update ? this.c.update : !this.c.editor) {
                        for (var n = 0, l = e.length; n < l; n++)
                            for (var s = 0, a = e[n].length; s < a; s++)
                                o = e[n][s],
                                -1 !== i.indexOf(o.index.column) && o.cell.data(o.set);
                        t.draw(!1)
                    }
                    this._emitEvent("autoFill", [t, e])
                }
            }
        }), r.actions = {
            increment: {
                available: function(t, e) {
                    e = e[0][0].label;
                    return !isNaN(e - parseFloat(e))
                },
                option: function(t, e) {
                    return t.i18n("autoFill.increment", 'Increment / decrement each cell by: <input type="number" value="1">')
                },
                execute: function(t, e, o) {
                    for (var i = +e[0][0].data, n = +m("input", o).val(), l = 0, s = e.length; l < s; l++)
                        for (var a = 0, r = e[l].length; a < r; a++)
                            e[l][a].set = i,
                                i += n
                }
            },
            fill: {
                available: function(t, e) {
                    return !0
                },
                option: function(t, e) {
                    return t.i18n("autoFill.fill", "Fill all cells with <i>%d</i>", e[0][0].label)
                },
                execute: function(t, e, o) {
                    for (var i = e[0][0].data, n = 0, l = e.length; n < l; n++)
                        for (var s = 0, a = e[n].length; s < a; s++)
                            e[n][s].set = i
                }
            },
            fillHorizontal: {
                available: function(t, e) {
                    return 1 < e.length && 1 < e[0].length
                },
                option: function(t, e) {
                    return t.i18n("autoFill.fillHorizontal", "Fill cells horizontally")
                },
                execute: function(t, e, o) {
                    for (var i = 0, n = e.length; i < n; i++)
                        for (var l = 0, s = e[i].length; l < s; l++)
                            e[i][l].set = e[i][0].data
                }
            },
            fillVertical: {
                available: function(t, e) {
                    return 1 < e.length && 1 < e[0].length
                },
                option: function(t, e) {
                    return t.i18n("autoFill.fillVertical", "Fill cells vertically")
                },
                execute: function(t, e, o) {
                    for (var i = 0, n = e.length; i < n; i++)
                        for (var l = 0, s = e[i].length; l < s; l++)
                            e[i][l].set = e[0][l].data
                }
            },
            cancel: {
                available: function() {
                    return !1
                },
                option: function(t) {
                    return t.i18n("autoFill.cancel", "Cancel")
                },
                execute: function() {
                    return !1
                }
            }
        }, r.version = "2.6.0", r.defaults = {
            alwaysAsk: !1,
            closeButton: !0,
            focus: null,
            columns: "",
            enable: !0,
            update: null,
            editor: null,
            vertical: !0,
            horizontal: !0
        }, r.classes = {
            btn: "btn",
            closeable: "dtaf-popover-closeable"
        }, m.fn.dataTable.Api);
    return t.register("autoFill()", function() {
        return this
    }), t.register("autoFill().enabled()", function() {
        var t = this.context[0];
        return !!t.autoFill && t.autoFill.enabled()
    }), t.register("autoFill().enable()", function(e) {
        return this.iterator("table", function(t) {
            t.autoFill && t.autoFill.enable(e)
        })
    }), t.register("autoFill().disable()", function() {
        return this.iterator("table", function(t) {
            t.autoFill && t.autoFill.disable()
        })
    }), m(p).on("preInit.dt.autofill", function(t, e, o) {
        var i,
            n;
        "dt" === t.namespace && (t = e.oInit.autoFill, i = l.defaults.autoFill, t || i) && (n = m.extend({}, t, i), !1 !== t) && new r(e, n)
    }), l.AutoFill = r, m.fn.DataTable.AutoFill = r, l
});

/*! Bootstrap integration for DataTables' AutoFill
 * ©2015 SpryMedia Ltd - datatables.net/license
 */
!function(n) {
    var o,
        a;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs5", "datatables.net-autofill"], function(e) {
        return n(e, window, document)
    }) : "object" == typeof exports ? (o = require("jquery"), a = function(e, t) {
        t.fn.dataTable || require("datatables.net-bs5")(e, t),
        t.fn.dataTable.AutoFill || require("datatables.net-autofill")(e, t)
    }, "undefined" == typeof window ? module.exports = function(e, t) {
        return e = e || window, t = t || o(e), a(e, t), n(t, 0, e.document)
    } : (a(window, o), module.exports = n(o, window, window.document))) : n(jQuery, window, document)
}(function(e, t, n, o) {
    "use strict";
    e = e.fn.dataTable;
    return e.AutoFill.classes.btn = "btn btn-primary", e
});

/*! Buttons for DataTables 2.4.2
 * © SpryMedia Ltd - datatables.net/license
 */
!function(e) {
    var o,
        i;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return e(t, window, document)
    }) : "object" == typeof exports ? (o = require("jquery"), i = function(t, n) {
        n.fn.dataTable || require("datatables.net")(t, n)
    }, "undefined" == typeof window ? module.exports = function(t, n) {
        return t = t || window, n = n || o(t), i(t, n), e(n, t, t.document)
    } : (i(window, o), module.exports = e(o, window, window.document))) : e(jQuery, window, document)
}(function(y, v, x, w) {
    "use strict";
    var e = y.fn.dataTable,
        o = 0,
        C = 0,
        _ = e.ext.buttons,
        i = null;
    function A(t, n, e) {
        y.fn.animate ? t.stop().fadeIn(n, e) : (t.css("display", "block"), e && e.call(t))
    }
    function k(t, n, e) {
        y.fn.animate ? t.stop().fadeOut(n, e) : (t.css("display", "none"), e && e.call(t))
    }
    function B(n, t) {
        if (!(this instanceof B))
            return function(t) {
                return new B(t, n).container()
            };
        !0 === (t = void 0 === t ? {} : t) && (t = {}),
        Array.isArray(t) && (t = {
            buttons: t
        }),
            this.c = y.extend(!0, {}, B.defaults, t),
        t.buttons && (this.c.buttons = t.buttons),
            this.s = {
                dt: new e.Api(n),
                buttons: [],
                listenKeys: "",
                namespace: "dtb" + o++
            },
            this.dom = {
                container: y("<" + this.c.dom.container.tag + "/>").addClass(this.c.dom.container.className)
            },
            this._constructor()
    }
    y.extend(B.prototype, {
        action: function(t, n) {
            t = this._nodeToButton(t);
            return n === w ? t.conf.action : (t.conf.action = n, this)
        },
        active: function(t, n) {
            var t = this._nodeToButton(t),
                e = this.c.dom.button.active,
                o = y(t.node);
            return t.inCollection && this.c.dom.collection.button && this.c.dom.collection.button.active !== w && (e = this.c.dom.collection.button.active), n === w ? o.hasClass(e) : (o.toggleClass(e, n === w || n), this)
        },
        add: function(t, n, e) {
            var o = this.s.buttons;
            if ("string" == typeof n) {
                for (var i = n.split("-"), s = this.s, a = 0, r = i.length - 1; a < r; a++)
                    s = s.buttons[+i[a]];
                o = s.buttons,
                    n = +i[i.length - 1]
            }
            return this._expandButton(o, t, t !== w ? t.split : w, (t === w || t.split === w || 0 === t.split.length) && s !== w, !1, n), e !== w && !0 !== e || this._draw(), this
        },
        collectionRebuild: function(t, n) {
            var e = this._nodeToButton(t);
            if (n !== w) {
                for (var o = e.buttons.length - 1; 0 <= o; o--)
                    this.remove(e.buttons[o].node);
                for (e.conf.prefixButtons && n.unshift.apply(n, e.conf.prefixButtons), e.conf.postfixButtons && n.push.apply(n, e.conf.postfixButtons), o = 0; o < n.length; o++) {
                    var i = n[o];
                    this._expandButton(e.buttons, i, i !== w && i.config !== w && i.config.split !== w, !0, i.parentConf !== w && i.parentConf.split !== w, null, i.parentConf)
                }
            }
            this._draw(e.collection, e.buttons)
        },
        container: function() {
            return this.dom.container
        },
        disable: function(t) {
            t = this._nodeToButton(t);
            return y(t.node).addClass(this.c.dom.button.disabled).prop("disabled", !0), this
        },
        destroy: function() {
            y("body").off("keyup." + this.s.namespace);
            for (var t = this.s.buttons.slice(), n = 0, e = t.length; n < e; n++)
                this.remove(t[n].node);
            this.dom.container.remove();
            var o = this.s.dt.settings()[0];
            for (n = 0, e = o.length; n < e; n++)
                if (o.inst === this) {
                    o.splice(n, 1);
                    break
                }
            return this
        },
        enable: function(t, n) {
            return !1 === n ? this.disable(t) : (n = this._nodeToButton(t), y(n.node).removeClass(this.c.dom.button.disabled).prop("disabled", !1), this)
        },
        index: function(t, n, e) {
            n || (n = "", e = this.s.buttons);
            for (var o = 0, i = e.length; o < i; o++) {
                var s = e[o].buttons;
                if (e[o].node === t)
                    return n + o;
                if (s && s.length) {
                    s = this.index(t, o + "-", s);
                    if (null !== s)
                        return s
                }
            }
            return null
        },
        name: function() {
            return this.c.name
        },
        node: function(t) {
            return t ? (t = this._nodeToButton(t), y(t.node)) : this.dom.container
        },
        processing: function(t, n) {
            var e = this.s.dt,
                o = this._nodeToButton(t);
            return n === w ? y(o.node).hasClass("processing") : (y(o.node).toggleClass("processing", n), y(e.table().node()).triggerHandler("buttons-processing.dt", [n, e.button(t), e, y(t), o.conf]), this)
        },
        remove: function(t) {
            var n = this._nodeToButton(t),
                e = this._nodeToHost(t),
                o = this.s.dt;
            if (n.buttons.length)
                for (var i = n.buttons.length - 1; 0 <= i; i--)
                    this.remove(n.buttons[i].node);
            n.conf.destroying = !0,
            n.conf.destroy && n.conf.destroy.call(o.button(t), o, y(t), n.conf),
                this._removeKey(n.conf),
                y(n.node).remove();
            o = y.inArray(n, e);
            return e.splice(o, 1), this
        },
        text: function(t, n) {
            function e(t) {
                return "function" == typeof t ? t(i, s, o.conf) : t
            }
            var o = this._nodeToButton(t),
                t = o.textNode,
                i = this.s.dt,
                s = y(o.node);
            return n === w ? e(o.conf.text) : (o.conf.text = n, t.html(e(n)), this)
        },
        _constructor: function() {
            var e = this,
                t = this.s.dt,
                o = t.settings()[0],
                n = this.c.buttons;
            o._buttons || (o._buttons = []),
                o._buttons.push({
                    inst: this,
                    name: this.c.name
                });
            for (var i = 0, s = n.length; i < s; i++)
                this.add(n[i]);
            t.on("destroy", function(t, n) {
                n === o && e.destroy()
            }),
                y("body").on("keyup." + this.s.namespace, function(t) {
                    var n;
                    x.activeElement && x.activeElement !== x.body || (n = String.fromCharCode(t.keyCode).toLowerCase(), -1 !== e.s.listenKeys.toLowerCase().indexOf(n) && e._keypress(n, t))
                })
        },
        _addKey: function(t) {
            t.key && (this.s.listenKeys += (y.isPlainObject(t.key) ? t.key : t).key)
        },
        _draw: function(t, n) {
            t || (t = this.dom.container, n = this.s.buttons),
                t.children().detach();
            for (var e = 0, o = n.length; e < o; e++)
                t.append(n[e].inserter),
                    t.append(" "),
                n[e].buttons && n[e].buttons.length && this._draw(n[e].collection, n[e].buttons)
        },
        _expandButton: function(t, n, e, o, i, s, a) {
            for (var r, l = this.s.dt, c = this.c.dom.collection, u = Array.isArray(n) ? n : [n], d = 0, f = (u = n === w ? Array.isArray(e) ? e : [e] : u).length; d < f; d++) {
                var p = this._resolveExtends(u[d]);
                if (p)
                    if (r = !(!p.config || !p.config.split), Array.isArray(p))
                        this._expandButton(t, p, h !== w && h.conf !== w ? h.conf.split : w, o, a !== w && a.split !== w, s, a);
                    else {
                        var h = this._buildButton(p, o, p.split !== w || p.config !== w && p.config.split !== w, i);
                        if (h) {
                            if (s !== w && null !== s ? (t.splice(s, 0, h), s++) : t.push(h), h.conf.buttons && (h.collection = y("<" + c.container.content.tag + "/>"), h.conf._collection = h.collection, y(h.node).append(c.action.dropHtml), this._expandButton(h.buttons, h.conf.buttons, h.conf.split, !r, r, s, h.conf)), h.conf.split) {
                                h.collection = y("<" + c.container.tag + "/>"),
                                    h.conf._collection = h.collection;
                                for (var b = 0; b < h.conf.split.length; b++) {
                                    var g = h.conf.split[b];
                                    "object" == typeof g && (g.parent = a, g.collectionLayout === w && (g.collectionLayout = h.conf.collectionLayout), g.dropup === w && (g.dropup = h.conf.dropup), g.fade === w) && (g.fade = h.conf.fade)
                                }
                                this._expandButton(h.buttons, h.conf.buttons, h.conf.split, !r, r, s, h.conf)
                            }
                            h.conf.parent = a,
                            p.init && p.init.call(l.button(h.node), l, y(h.node), p)
                        }
                    }
            }
        },
        _buildButton: function(n, t, e, o) {
            function i(t) {
                return "function" == typeof t ? t(u, l, n) : t
            }
            var s,
                a,
                r,
                l,
                c = this.c.dom,
                u = this.s.dt,
                d = y.extend(!0, {}, c.button);
            if (t && e && c.collection.split ? y.extend(!0, d, c.collection.split.action) : o || t ? y.extend(!0, d, c.collection.button) : e && y.extend(!0, d, c.split.button), n.spacer)
                return c = y("<" + d.spacer.tag + "/>").addClass("dt-button-spacer " + n.style + " " + d.spacer.className).html(i(n.text)), {
                    conf: n,
                    node: c,
                    inserter: c,
                    buttons: [],
                    inCollection: t,
                    isSplit: e,
                    collection: null,
                    textNode: c
                };
            if (n.available && !n.available(u, n) && !n.hasOwnProperty("html"))
                return !1;
            n.hasOwnProperty("html") ? l = y(n.html) : (a = function(t, n, e, o) {
                o.action.call(n.button(e), t, n, e, o),
                    y(n.table().node()).triggerHandler("buttons-action.dt", [n.button(e), n, e, o])
            }, c = n.tag || d.tag, r = n.clickBlurs === w || n.clickBlurs, l = y("<" + c + "/>").addClass(d.className).attr("tabindex", this.s.dt.settings()[0].iTabIndex).attr("aria-controls", this.s.dt.table().node().id).on("click.dtb", function(t) {
                t.preventDefault(),
                !l.hasClass(d.disabled) && n.action && a(t, u, l, n),
                r && l.trigger("blur")
            }).on("keypress.dtb", function(t) {
                13 === t.keyCode && (t.preventDefault(), !l.hasClass(d.disabled)) && n.action && a(t, u, l, n)
            }), "a" === c.toLowerCase() && l.attr("href", "#"), "button" === c.toLowerCase() && l.attr("type", "button"), s = d.liner.tag ? (c = y("<" + d.liner.tag + "/>").html(i(n.text)).addClass(d.liner.className), "a" === d.liner.tag.toLowerCase() && c.attr("href", "#"), l.append(c), c) : (l.html(i(n.text)), l), !1 === n.enabled && l.addClass(d.disabled), n.className && l.addClass(n.className), n.titleAttr && l.attr("title", i(n.titleAttr)), n.attr && l.attr(n.attr), n.namespace || (n.namespace = ".dt-button-" + C++), n.config !== w && n.config.split && (n.split = n.config.split));
            var f,
                p,
                h,
                b,
                g,
                m,
                c = this.c.dom.buttonContainer,
                c = c && c.tag ? y("<" + c.tag + "/>").addClass(c.className).append(l) : l;
            return this._addKey(n), this.c.buttonCreated && (c = this.c.buttonCreated(n, c)), e && (p = (f = t ? y.extend(!0, this.c.dom.split, this.c.dom.collection.split) : this.c.dom.split).wrapper, h = y("<" + p.tag + "/>").addClass(p.className).append(l), b = y.extend(n, {
                align: f.dropdown.align,
                attr: {
                    "aria-haspopup": "dialog",
                    "aria-expanded": !1
                },
                className: f.dropdown.className,
                closeButton: !1,
                splitAlignClass: f.dropdown.splitAlignClass,
                text: f.dropdown.text
            }), this._addKey(b), g = function(t, n, e, o) {
                _.split.action.call(n.button(h), t, n, e, o),
                    y(n.table().node()).triggerHandler("buttons-action.dt", [n.button(e), n, e, o]),
                    e.attr("aria-expanded", !0)
            }, m = y('<button class="' + f.dropdown.className + ' dt-button"></button>').html(f.dropdown.dropHtml).on("click.dtb", function(t) {
                t.preventDefault(),
                    t.stopPropagation(),
                m.hasClass(d.disabled) || g(t, u, m, b),
                r && m.trigger("blur")
            }).on("keypress.dtb", function(t) {
                13 === t.keyCode && (t.preventDefault(), m.hasClass(d.disabled) || g(t, u, m, b))
            }), 0 === n.split.length && m.addClass("dtb-hide-drop"), h.append(m).attr(b.attr)), {
                conf: n,
                node: (e ? h : l).get(0),
                inserter: e ? h : c,
                buttons: [],
                inCollection: t,
                isSplit: e,
                inSplit: o,
                collection: null,
                textNode: s
            }
        },
        _nodeToButton: function(t, n) {
            for (var e = 0, o = (n = n || this.s.buttons).length; e < o; e++) {
                if (n[e].node === t)
                    return n[e];
                if (n[e].buttons.length) {
                    var i = this._nodeToButton(t, n[e].buttons);
                    if (i)
                        return i
                }
            }
        },
        _nodeToHost: function(t, n) {
            for (var e = 0, o = (n = n || this.s.buttons).length; e < o; e++) {
                if (n[e].node === t)
                    return n;
                if (n[e].buttons.length) {
                    var i = this._nodeToHost(t, n[e].buttons);
                    if (i)
                        return i
                }
            }
        },
        _keypress: function(s, a) {
            var r;
            a._buttonsHandled || (r = function(t) {
                for (var n, e, o = 0, i = t.length; o < i; o++)
                    n = t[o].conf,
                        e = t[o].node,
                    !n.key || n.key !== s && (!y.isPlainObject(n.key) || n.key.key !== s || n.key.shiftKey && !a.shiftKey || n.key.altKey && !a.altKey || n.key.ctrlKey && !a.ctrlKey || n.key.metaKey && !a.metaKey) || (a._buttonsHandled = !0, y(e).click()),
                    t[o].buttons.length && r(t[o].buttons)
            })(this.s.buttons)
        },
        _removeKey: function(t) {
            var n;
            t.key && (t = (y.isPlainObject(t.key) ? t.key : t).key, n = this.s.listenKeys.split(""), t = y.inArray(t, n), n.splice(t, 1), this.s.listenKeys = n.join(""))
        },
        _resolveExtends: function(e) {
            function t(t) {
                for (var n = 0; !y.isPlainObject(t) && !Array.isArray(t);) {
                    if (t === w)
                        return;
                    if ("function" == typeof t) {
                        if (!(t = t.call(i, s, e)))
                            return !1
                    } else if ("string" == typeof t) {
                        if (!_[t])
                            return {
                                html: t
                            };
                        t = _[t]
                    }
                    if (30 < ++n)
                        throw "Buttons: Too many iterations"
                }
                return Array.isArray(t) ? t : y.extend({}, t)
            }
            var n,
                o,
                i = this,
                s = this.s.dt;
            for (e = t(e); e && e.extend;) {
                if (!_[e.extend])
                    throw "Cannot extend unknown button type: " + e.extend;
                var a = t(_[e.extend]);
                if (Array.isArray(a))
                    return a;
                if (!a)
                    return !1;
                var r = a.className;
                e.config !== w && a.config !== w && (e.config = y.extend({}, a.config, e.config)),
                    e = y.extend({}, a, e),
                r && e.className !== r && (e.className = r + " " + e.className),
                    e.extend = a.extend
            }
            var l = e.postfixButtons;
            if (l)
                for (e.buttons || (e.buttons = []), n = 0, o = l.length; n < o; n++)
                    e.buttons.push(l[n]);
            var c = e.prefixButtons;
            if (c)
                for (e.buttons || (e.buttons = []), n = 0, o = c.length; n < o; n++)
                    e.buttons.splice(n, 0, c[n]);
            return e
        },
        _popover: function(o, t, n, e) {
            function i() {
                h = !0,
                    k(y(g), b.fade, function() {
                        y(this).detach()
                    }),
                    y(f.buttons('[aria-haspopup="dialog"][aria-expanded="true"]').nodes()).attr("aria-expanded", "false"),
                    y("div.dt-button-background").off("click.dtb-collection"),
                    B.background(!1, b.backgroundClassName, b.fade, m),
                    y(v).off("resize.resize.dtb-collection"),
                    y("body").off(".dtb-collection"),
                    f.off("buttons-action.b-internal"),
                    f.off("destroy")
            }
            var s,
                a,
                r,
                l,
                c,
                u,
                d,
                f = t,
                p = this.c,
                h = !1,
                b = y.extend({
                    align: "button-left",
                    autoClose: !1,
                    background: !0,
                    backgroundClassName: "dt-button-background",
                    closeButton: !0,
                    containerClassName: p.dom.collection.container.className,
                    contentClassName: p.dom.collection.container.content.className,
                    collectionLayout: "",
                    collectionTitle: "",
                    dropup: !1,
                    fade: 400,
                    popoverTitle: "",
                    rightAlignClassName: "dt-button-right",
                    tag: p.dom.collection.container.tag
                }, n),
                g = b.tag + "." + b.containerClassName.replace(/ /g, "."),
                m = t.node();
            !1 === o ? i() : ((p = y(f.buttons('[aria-haspopup="dialog"][aria-expanded="true"]').nodes())).length && (m.closest(g).length && (m = p.eq(0)), i()), n = y(".dt-button", o).length, p = "", 3 === n ? p = "dtb-b3" : 2 === n ? p = "dtb-b2" : 1 === n && (p = "dtb-b1"), s = y("<" + b.tag + "/>").addClass(b.containerClassName).addClass(b.collectionLayout).addClass(b.splitAlignClass).addClass(p).css("display", "none").attr({
                "aria-modal": !0,
                role: "dialog"
            }), o = y(o).addClass(b.contentClassName).attr("role", "menu").appendTo(s), m.attr("aria-expanded", "true"), m.parents("body")[0] !== x.body && (m = x.body.lastChild), b.popoverTitle ? s.prepend('<div class="dt-button-collection-title">' + b.popoverTitle + "</div>") : b.collectionTitle && s.prepend('<div class="dt-button-collection-title">' + b.collectionTitle + "</div>"), b.closeButton && s.prepend('<div class="dtb-popover-close">&times;</div>').addClass("dtb-collection-closeable"), A(s.insertAfter(m), b.fade), n = y(t.table().container()), d = s.css("position"), "container" !== b.span && "dt-container" !== b.align || (m = m.parent(), s.css("width", n.width())), "absolute" === d ? (p = y(m[0].offsetParent), t = m.position(), n = m.offset(), a = p.offset(), r = p.position(), l = v.getComputedStyle(p[0]), a.height = p.outerHeight(), a.width = p.width() + parseFloat(l.paddingLeft), a.right = a.left + a.width, a.bottom = a.top + a.height, p = t.top + m.outerHeight(), c = t.left, s.css({
                top: p,
                left: c
            }), l = v.getComputedStyle(s[0]), (u = s.offset()).height = s.outerHeight(), u.width = s.outerWidth(), u.right = u.left + u.width, u.bottom = u.top + u.height, u.marginTop = parseFloat(l.marginTop), u.marginBottom = parseFloat(l.marginBottom), b.dropup && (p = t.top - u.height - u.marginTop - u.marginBottom), "button-right" !== b.align && !s.hasClass(b.rightAlignClassName) || (c = t.left - u.width + m.outerWidth()), "dt-container" !== b.align && "container" !== b.align || (c = c < t.left ? -t.left : c) + u.width > a.width && (c = a.width - u.width), r.left + c + u.width > y(v).width() && (c = y(v).width() - u.width - r.left), n.left + c < 0 && (c = -n.left), r.top + p + u.height > y(v).height() + y(v).scrollTop() && (p = t.top - u.height - u.marginTop - u.marginBottom), r.top + p < y(v).scrollTop() && (p = t.top + m.outerHeight()), s.css({
                top: p,
                left: c
            })) : ((d = function() {
                var t = y(v).height() / 2,
                    n = s.height() / 2;
                s.css("marginTop", -1 * (n = t < n ? t : n))
            })(), y(v).on("resize.dtb-collection", function() {
                d()
            })), b.background && B.background(!0, b.backgroundClassName, b.fade, b.backgroundHost || m), y("div.dt-button-background").on("click.dtb-collection", function() {}), b.autoClose && setTimeout(function() {
                f.on("buttons-action.b-internal", function(t, n, e, o) {
                    o[0] !== m[0] && i()
                })
            }, 0), y(s).trigger("buttons-popover.dt"), f.on("destroy", i), setTimeout(function() {
                h = !1,
                    y("body").on("click.dtb-collection", function(t) {
                        var n,
                            e;
                        !h && (n = y.fn.addBack ? "addBack" : "andSelf", e = y(t.target).parent()[0], !y(t.target).parents()[n]().filter(o).length && !y(e).hasClass("dt-buttons") || y(t.target).hasClass("dt-button-background")) && i()
                    }).on("keyup.dtb-collection", function(t) {
                        27 === t.keyCode && i()
                    }).on("keydown.dtb-collection", function(t) {
                        var n = y("a, button", o),
                            e = x.activeElement;
                        9 === t.keyCode && (-1 === n.index(e) ? (n.first().focus(), t.preventDefault()) : t.shiftKey ? e === n[0] && (n.last().focus(), t.preventDefault()) : e === n.last()[0] && (n.first().focus(), t.preventDefault()))
                    })
            }, 0))
        }
    }),
        B.background = function(t, n, e, o) {
            e === w && (e = 400),
                o = o || x.body,
                t ? A(y("<div/>").addClass(n).css("display", "none").insertAfter(o), e) : k(y("div." + n), e, function() {
                    y(this).removeClass(n).remove()
                })
        },
        B.instanceSelector = function(t, i) {
            var s,
                a,
                r;
            return t === w || null === t ? y.map(i, function(t) {
                return t.inst
            }) : (s = [], a = y.map(i, function(t) {
                return t.name
            }), (r = function(t) {
                var n;
                if (Array.isArray(t))
                    for (var e = 0, o = t.length; e < o; e++)
                        r(t[e]);
                else
                    "string" == typeof t ? -1 !== t.indexOf(",") ? r(t.split(",")) : -1 !== (n = y.inArray(t.trim(), a)) && s.push(i[n].inst) : "number" == typeof t ? s.push(i[t].inst) : "object" == typeof t && s.push(t)
            })(t), s)
        },
        B.buttonSelector = function(t, n) {
            for (var c = [], u = function(t, n, e) {
                for (var o, i, s = 0, a = n.length; s < a; s++)
                    (o = n[s]) && (t.push({
                        node: o.node,
                        name: o.conf.name,
                        idx: i = e !== w ? e + s : s + ""
                    }), o.buttons) && u(t, o.buttons, i + "-")
            }, d = function(t, n) {
                var e = [],
                    o = (u(e, n.s.buttons), y.map(e, function(t) {
                        return t.node
                    }));
                if (Array.isArray(t) || t instanceof y)
                    for (s = 0, a = t.length; s < a; s++)
                        d(t[s], n);
                else if (null === t || t === w || "*" === t)
                    for (s = 0, a = e.length; s < a; s++)
                        c.push({
                            inst: n,
                            node: e[s].node
                        });
                else if ("number" == typeof t)
                    n.s.buttons[t] && c.push({
                        inst: n,
                        node: n.s.buttons[t].node
                    });
                else if ("string" == typeof t)
                    if (-1 !== t.indexOf(","))
                        for (var i = t.split(","), s = 0, a = i.length; s < a; s++)
                            d(i[s].trim(), n);
                    else if (t.match(/^\d+(\-\d+)*$/)) {
                        var r = y.map(e, function(t) {
                            return t.idx
                        });
                        c.push({
                            inst: n,
                            node: e[y.inArray(t, r)].node
                        })
                    } else if (-1 !== t.indexOf(":name")) {
                        var l = t.replace(":name", "");
                        for (s = 0, a = e.length; s < a; s++)
                            e[s].name === l && c.push({
                                inst: n,
                                node: e[s].node
                            })
                    } else
                        y(o).filter(t).each(function() {
                            c.push({
                                inst: n,
                                node: this
                            })
                        });
                else
                    "object" == typeof t && t.nodeName && -1 !== (r = y.inArray(t, o)) && c.push({
                        inst: n,
                        node: o[r]
                    })
            }, e = 0, o = t.length; e < o; e++) {
                var i = t[e];
                d(n, i)
            }
            return c
        },
        B.stripData = function(t, n) {
            return t = "string" == typeof t && (t = (t = t.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")).replace(/<!\-\-.*?\-\->/g, ""), n && !n.stripHtml || (t = t.replace(/<[^>]*>/g, "")), n && !n.trim || (t = t.replace(/^\s+|\s+$/g, "")), n && !n.stripNewlines || (t = t.replace(/\n/g, " ")), !n || n.decodeEntities) ? i ? i(t) : (c.innerHTML = t, c.value) : t
        },
        B.entityDecoder = function(t) {
            i = t
        },
        B.defaults = {
            buttons: ["copy", "excel", "csv", "pdf", "print"],
            name: "main",
            tabIndex: 0,
            dom: {
                container: {
                    tag: "div",
                    className: "dt-buttons"
                },
                collection: {
                    action: {
                        dropHtml: '<span class="dt-button-down-arrow">&#x25BC;</span>'
                    },
                    container: {
                        className: "dt-button-collection",
                        content: {
                            className: "",
                            tag: "div"
                        },
                        tag: "div"
                    }
                },
                button: {
                    tag: "button",
                    className: "dt-button",
                    active: "dt-button-active",
                    disabled: "disabled",
                    spacer: {
                        className: "dt-button-spacer",
                        tag: "span"
                    },
                    liner: {
                        tag: "span",
                        className: ""
                    }
                },
                split: {
                    action: {
                        className: "dt-button-split-drop-button dt-button",
                        tag: "button"
                    },
                    dropdown: {
                        align: "split-right",
                        className: "dt-button-split-drop",
                        dropHtml: '<span class="dt-button-down-arrow">&#x25BC;</span>',
                        splitAlignClass: "dt-button-split-left",
                        tag: "button"
                    },
                    wrapper: {
                        className: "dt-button-split",
                        tag: "div"
                    }
                }
            }
        },
        y.extend(_, {
            collection: {
                text: function(t) {
                    return t.i18n("buttons.collection", "Collection")
                },
                className: "buttons-collection",
                closeButton: !(B.version = "2.4.2"),
                init: function(t, n, e) {
                    n.attr("aria-expanded", !1)
                },
                action: function(t, n, e, o) {
                    o._collection.parents("body").length ? this.popover(!1, o) : this.popover(o._collection, o),
                    "keypress" === t.type && y("a, button", o._collection).eq(0).focus()
                },
                attr: {
                    "aria-haspopup": "dialog"
                }
            },
            split: {
                text: function(t) {
                    return t.i18n("buttons.split", "Split")
                },
                className: "buttons-split",
                closeButton: !1,
                init: function(t, n, e) {
                    return n.attr("aria-expanded", !1)
                },
                action: function(t, n, e, o) {
                    this.popover(o._collection, o)
                },
                attr: {
                    "aria-haspopup": "dialog"
                }
            },
            copy: function(t, n) {
                if (_.copyHtml5)
                    return "copyHtml5"
            },
            csv: function(t, n) {
                if (_.csvHtml5 && _.csvHtml5.available(t, n))
                    return "csvHtml5"
            },
            excel: function(t, n) {
                if (_.excelHtml5 && _.excelHtml5.available(t, n))
                    return "excelHtml5"
            },
            pdf: function(t, n) {
                if (_.pdfHtml5 && _.pdfHtml5.available(t, n))
                    return "pdfHtml5"
            },
            pageLength: function(t) {
                var n = t.settings()[0].aLengthMenu,
                    e = [],
                    o = [];
                if (Array.isArray(n[0]))
                    e = n[0],
                        o = n[1];
                else
                    for (var i = 0; i < n.length; i++) {
                        var s = n[i];
                        y.isPlainObject(s) ? (e.push(s.value), o.push(s.label)) : (e.push(s), o.push(s))
                    }
                return {
                    extend: "collection",
                    text: function(t) {
                        return t.i18n("buttons.pageLength", {
                            "-1": "Show all rows",
                            _: "Show %d rows"
                        }, t.page.len())
                    },
                    className: "buttons-page-length",
                    autoClose: !0,
                    buttons: y.map(e, function(s, t) {
                        return {
                            text: o[t],
                            className: "button-page-length",
                            action: function(t, n) {
                                n.page.len(s).draw()
                            },
                            init: function(t, n, e) {
                                function o() {
                                    i.active(t.page.len() === s)
                                }
                                var i = this;
                                t.on("length.dt" + e.namespace, o),
                                    o()
                            },
                            destroy: function(t, n, e) {
                                t.off("length.dt" + e.namespace)
                            }
                        }
                    }),
                    init: function(t, n, e) {
                        var o = this;
                        t.on("length.dt" + e.namespace, function() {
                            o.text(e.text)
                        })
                    },
                    destroy: function(t, n, e) {
                        t.off("length.dt" + e.namespace)
                    }
                }
            },
            spacer: {
                style: "empty",
                spacer: !0,
                text: function(t) {
                    return t.i18n("buttons.spacer", "")
                }
            }
        }),
        e.Api.register("buttons()", function(n, e) {
            e === w && (e = n, n = w),
                this.selector.buttonGroup = n;
            var t = this.iterator(!0, "table", function(t) {
                if (t._buttons)
                    return B.buttonSelector(B.instanceSelector(n, t._buttons), e)
            }, !0);
            return t._groupSelector = n, t
        }),
        e.Api.register("button()", function(t, n) {
            t = this.buttons(t, n);
            return 1 < t.length && t.splice(1, t.length), t
        }),
        e.Api.registerPlural("buttons().active()", "button().active()", function(n) {
            return n === w ? this.map(function(t) {
                return t.inst.active(t.node)
            }) : this.each(function(t) {
                t.inst.active(t.node, n)
            })
        }),
        e.Api.registerPlural("buttons().action()", "button().action()", function(n) {
            return n === w ? this.map(function(t) {
                return t.inst.action(t.node)
            }) : this.each(function(t) {
                t.inst.action(t.node, n)
            })
        }),
        e.Api.registerPlural("buttons().collectionRebuild()", "button().collectionRebuild()", function(e) {
            return this.each(function(t) {
                for (var n = 0; n < e.length; n++)
                    "object" == typeof e[n] && (e[n].parentConf = t);
                t.inst.collectionRebuild(t.node, e)
            })
        }),
        e.Api.register(["buttons().enable()", "button().enable()"], function(n) {
            return this.each(function(t) {
                t.inst.enable(t.node, n)
            })
        }),
        e.Api.register(["buttons().disable()", "button().disable()"], function() {
            return this.each(function(t) {
                t.inst.disable(t.node)
            })
        }),
        e.Api.register("button().index()", function() {
            var n = null;
            return this.each(function(t) {
                t = t.inst.index(t.node);
                null !== t && (n = t)
            }), n
        }),
        e.Api.registerPlural("buttons().nodes()", "button().node()", function() {
            var n = y();
            return y(this.each(function(t) {
                n = n.add(t.inst.node(t.node))
            })), n
        }),
        e.Api.registerPlural("buttons().processing()", "button().processing()", function(n) {
            return n === w ? this.map(function(t) {
                return t.inst.processing(t.node)
            }) : this.each(function(t) {
                t.inst.processing(t.node, n)
            })
        }),
        e.Api.registerPlural("buttons().text()", "button().text()", function(n) {
            return n === w ? this.map(function(t) {
                return t.inst.text(t.node)
            }) : this.each(function(t) {
                t.inst.text(t.node, n)
            })
        }),
        e.Api.registerPlural("buttons().trigger()", "button().trigger()", function() {
            return this.each(function(t) {
                t.inst.node(t.node).trigger("click")
            })
        }),
        e.Api.register("button().popover()", function(n, e) {
            return this.map(function(t) {
                return t.inst._popover(n, this.button(this[0].node), e)
            })
        }),
        e.Api.register("buttons().containers()", function() {
            var i = y(),
                s = this._groupSelector;
            return this.iterator(!0, "table", function(t) {
                if (t._buttons)
                    for (var n = B.instanceSelector(s, t._buttons), e = 0, o = n.length; e < o; e++)
                        i = i.add(n[e].container())
            }), i
        }),
        e.Api.register("buttons().container()", function() {
            return this.containers().eq(0)
        }),
        e.Api.register("button().add()", function(t, n, e) {
            var o = this.context;
            return o.length && (o = B.instanceSelector(this._groupSelector, o[0]._buttons)).length && o[0].add(n, t, e), this.button(this._groupSelector, t)
        }),
        e.Api.register("buttons().destroy()", function() {
            return this.pluck("inst").unique().each(function(t) {
                t.destroy()
            }), this
        }),
        e.Api.registerPlural("buttons().remove()", "buttons().remove()", function() {
            return this.each(function(t) {
                t.inst.remove(t.node)
            }), this
        }),
        e.Api.register("buttons.info()", function(t, n, e) {
            var o = this;
            return !1 === t ? (this.off("destroy.btn-info"), k(y("#datatables_buttons_info"), 400, function() {
                y(this).remove()
            }), clearTimeout(s), s = null) : (s && clearTimeout(s), y("#datatables_buttons_info").length && y("#datatables_buttons_info").remove(), t = t ? "<h2>" + t + "</h2>" : "", A(y('<div id="datatables_buttons_info" class="dt-button-info"/>').html(t).append(y("<div/>")["string" == typeof n ? "html" : "append"](n)).css("display", "none").appendTo("body")), e !== w && 0 !== e && (s = setTimeout(function() {
                o.buttons.info(!1)
            }, e)), this.on("destroy.btn-info", function() {
                o.buttons.info(!1)
            })), this
        }),
        e.Api.register("buttons.exportData()", function(t) {
            if (this.context.length)
                return u(new e.Api(this.context[0]), t)
        }),
        e.Api.register("buttons.exportInfo()", function(t) {
            return {
                filename: n(t = t || {}),
                title: r(t),
                messageTop: l(this, t.message || t.messageTop, "top"),
                messageBottom: l(this, t.messageBottom, "bottom")
            }
        });
    var s,
        n = function(t) {
            var n;
            return (n = "function" == typeof (n = "*" === t.filename && "*" !== t.title && t.title !== w && null !== t.title && "" !== t.title ? t.title : t.filename) ? n() : n) === w || null === n ? null : (n = (n = -1 !== n.indexOf("*") ? n.replace("*", y("head > title").text()).trim() : n).replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, "")) + (a(t.extension) || "")
        },
        a = function(t) {
            return null === t || t === w ? null : "function" == typeof t ? t() : t
        },
        r = function(t) {
            t = a(t.title);
            return null === t ? null : -1 !== t.indexOf("*") ? t.replace("*", y("head > title").text() || "Exported data") : t
        },
        l = function(t, n, e) {
            n = a(n);
            return null === n ? null : (t = y("caption", t.table().container()).eq(0), "*" === n ? t.css("caption-side") !== e ? null : t.length ? t.text() : "" : n)
        },
        c = y("<textarea/>")[0],
        u = function(e, t) {
            for (var o = y.extend(!0, {}, {
                rows: null,
                columns: "",
                modifier: {
                    search: "applied",
                    order: "applied"
                },
                orthogonal: "display",
                stripHtml: !0,
                stripNewlines: !0,
                decodeEntities: !0,
                trim: !0,
                format: {
                    header: function(t) {
                        return B.stripData(t, o)
                    },
                    footer: function(t) {
                        return B.stripData(t, o)
                    },
                    body: function(t) {
                        return B.stripData(t, o)
                    }
                },
                customizeData: null
            }, t), t = e.columns(o.columns).indexes().map(function(t) {
                var n = e.column(t).header();
                return o.format.header(n.innerHTML, t, n)
            }).toArray(), n = e.table().footer() ? e.columns(o.columns).indexes().map(function(t) {
                var n = e.column(t).footer();
                return o.format.footer(n ? n.innerHTML : "", t, n)
            }).toArray() : null, i = y.extend({}, o.modifier), i = (e.select && "function" == typeof e.select.info && i.selected === w && e.rows(o.rows, y.extend({
                selected: !0
            }, i)).any() && y.extend(i, {
                selected: !0
            }), e.rows(o.rows, i).indexes().toArray()), i = e.cells(i, o.columns), s = i.render(o.orthogonal).toArray(), a = i.nodes().toArray(), r = t.length, l = [], c = 0, u = 0, d = 0 < r ? s.length / r : 0; u < d; u++) {
                for (var f = [r], p = 0; p < r; p++)
                    f[p] = o.format.body(s[c], u, p, a[c]),
                        c++;
                l[u] = f
            }
            i = {
                header: t,
                footer: n,
                body: l
            };
            return o.customizeData && o.customizeData(i), i
        };
    function t(t, n) {
        t = new e.Api(t),
            n = n || t.init().buttons || e.defaults.buttons;
        return new B(t, n).container()
    }
    return y.fn.dataTable.Buttons = B, y.fn.DataTable.Buttons = B, y(x).on("init.dt plugin-init.dt", function(t, n) {
        "dt" === t.namespace && (t = n.oInit.buttons || e.defaults.buttons) && !n._buttons && new B(n, t).container()
    }), e.ext.feature.push({
        fnInit: t,
        cFeature: "B"
    }), e.ext.features && e.ext.features.register("buttons", t), e
});

/*! Bootstrap integration for DataTables' Buttons
 * © SpryMedia Ltd - datatables.net/license
 */
!function(o) {
    var e,
        a;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs5", "datatables.net-buttons"], function(t) {
        return o(t, window, document)
    }) : "object" == typeof exports ? (e = require("jquery"), a = function(t, n) {
        n.fn.dataTable || require("datatables.net-bs5")(t, n),
        n.fn.dataTable.Buttons || require("datatables.net-buttons")(t, n)
    }, "undefined" == typeof window ? module.exports = function(t, n) {
        return t = t || window, n = n || e(t), a(t, n), o(n, 0, t.document)
    } : (a(window, e), module.exports = o(e, window, window.document))) : o(jQuery, window, document)
}(function(o, t, n, e) {
    "use strict";
    var a = o.fn.dataTable;
    return o.extend(!0, a.Buttons.defaults, {
        dom: {
            container: {
                className: "dt-buttons btn-group flex-wrap"
            },
            button: {
                className: "btn btn-secondary",
                active: "active"
            },
            collection: {
                action: {
                    dropHtml: ""
                },
                container: {
                    tag: "div",
                    className: "dropdown-menu dt-button-collection"
                },
                closeButton: !1,
                button: {
                    tag: "a",
                    className: "dt-button dropdown-item",
                    active: "dt-button-active",
                    disabled: "disabled",
                    spacer: {
                        className: "dropdown-divider",
                        tag: "hr"
                    }
                }
            },
            split: {
                action: {
                    tag: "a",
                    className: "btn btn-secondary dt-button-split-drop-button",
                    closeButton: !1
                },
                dropdown: {
                    tag: "button",
                    dropHtml: "",
                    className: "btn btn-secondary dt-button-split-drop dropdown-toggle dropdown-toggle-split",
                    closeButton: !1,
                    align: "split-left",
                    splitAlignClass: "dt-button-split-left"
                },
                wrapper: {
                    tag: "div",
                    className: "dt-button-split btn-group",
                    closeButton: !1
                }
            }
        },
        buttonCreated: function(t, n) {
            return t.buttons ? o('<div class="btn-group"/>').append(n) : n
        }
    }), a.ext.buttons.collection.className += " dropdown-toggle", a.ext.buttons.collection.rightAlignClassName = "dropdown-menu-right", a
});

/*!
 * Column visibility buttons for Buttons and DataTables.
 * © SpryMedia Ltd - datatables.net/license
 */
!function(t) {
    var o,
        i;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net", "datatables.net-buttons"], function(n) {
        return t(n, window, document)
    }) : "object" == typeof exports ? (o = require("jquery"), i = function(n, e) {
        e.fn.dataTable || require("datatables.net")(n, e),
        e.fn.dataTable.Buttons || require("datatables.net-buttons")(n, e)
    }, "undefined" == typeof window ? module.exports = function(n, e) {
        return n = n || window, e = e || o(n), i(n, e), t(e, 0, n.document)
    } : (i(window, o), module.exports = t(o, window, window.document))) : t(jQuery, window, document)
}(function(n, e, t, l) {
    "use strict";
    var o = n.fn.dataTable;
    return n.extend(o.ext.buttons, {
        colvis: function(o, i) {
            var l = null,
                n = {
                    extend: "collection",
                    init: function(n, e) {
                        l = e
                    },
                    text: function(n) {
                        return n.i18n("buttons.colvis", "Column visibility")
                    },
                    className: "buttons-colvis",
                    closeButton: !1,
                    buttons: [{
                        extend: "columnsToggle",
                        columns: i.columns,
                        columnText: i.columnText
                    }]
                };
            return o.on("column-reorder.dt" + i.namespace, function(n, e, t) {
                o.button(null, o.button(null, l).node()).collectionRebuild([{
                    extend: "columnsToggle",
                    columns: i.columns,
                    columnText: i.columnText
                }])
            }), n
        },
        columnsToggle: function(n, e) {
            return n.columns(e.columns).indexes().map(function(n) {
                return {
                    extend: "columnToggle",
                    columns: n,
                    columnText: e.columnText
                }
            }).toArray()
        },
        columnToggle: function(n, e) {
            return {
                extend: "columnVisibility",
                columns: e.columns,
                columnText: e.columnText
            }
        },
        columnsVisibility: function(n, e) {
            return n.columns(e.columns).indexes().map(function(n) {
                return {
                    extend: "columnVisibility",
                    columns: n,
                    visibility: e.visibility,
                    columnText: e.columnText
                }
            }).toArray()
        },
        columnVisibility: {
            columns: l,
            text: function(n, e, t) {
                return t._columnText(n, t)
            },
            className: "buttons-columnVisibility",
            action: function(n, e, t, o) {
                var e = e.columns(o.columns),
                    i = e.visible();
                e.visible(o.visibility !== l ? o.visibility : !(i.length && i[0]))
            },
            init: function(o, n, i) {
                var l = this;
                n.attr("data-cv-idx", i.columns),
                    o.on("column-visibility.dt" + i.namespace, function(n, e) {
                        e.bDestroying || e.nTable != o.settings()[0].nTable || l.active(o.column(i.columns).visible())
                    }).on("column-reorder.dt" + i.namespace, function(n, e, t) {
                        i.destroying || 1 === o.columns(i.columns).count() && (l.text(i._columnText(o, i)), l.active(o.column(i.columns).visible()))
                    }),
                    this.active(o.column(i.columns).visible())
            },
            destroy: function(n, e, t) {
                n.off("column-visibility.dt" + t.namespace).off("column-reorder.dt" + t.namespace)
            },
            _columnText: function(n, e) {
                var t = n.column(e.columns).index(),
                    o = n.settings()[0].aoColumns[t].sTitle;
                return o = (o = o || n.column(t).header().innerHTML).replace(/\n/g, " ").replace(/<br\s*\/?>/gi, " ").replace(/<select(.*?)<\/select>/g, "").replace(/<!\-\-.*?\-\->/g, "").replace(/<.*?>/g, "").replace(/^\s+|\s+$/g, ""), e.columnText ? e.columnText(n, t, o) : o
            }
        },
        colvisRestore: {
            className: "buttons-colvisRestore",
            text: function(n) {
                return n.i18n("buttons.colvisRestore", "Restore visibility")
            },
            init: function(e, n, t) {
                t._visOriginal = e.columns().indexes().map(function(n) {
                    return e.column(n).visible()
                }).toArray()
            },
            action: function(n, e, t, o) {
                e.columns().every(function(n) {
                    n = e.colReorder && e.colReorder.transpose ? e.colReorder.transpose(n, "toOriginal") : n;
                    this.visible(o._visOriginal[n])
                })
            }
        },
        colvisGroup: {
            className: "buttons-colvisGroup",
            action: function(n, e, t, o) {
                e.columns(o.show).visible(!0, !1),
                    e.columns(o.hide).visible(!1, !1),
                    e.columns.adjust()
            },
            show: [],
            hide: []
        }
    }), o
});

/*!
 * HTML5 export buttons for Buttons and DataTables.
 * © SpryMedia Ltd - datatables.net/license
 *
 * FileSaver.js (1.3.3) - MIT license
 * Copyright © 2016 Eli Grey - http://eligrey.com
 */
!function(n) {
    var r,
        a;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net", "datatables.net-buttons"], function(t) {
        return n(t, window, document)
    }) : "object" == typeof exports ? (r = require("jquery"), a = function(t, e) {
        e.fn.dataTable || require("datatables.net")(t, e),
        e.fn.dataTable.Buttons || require("datatables.net-buttons")(t, e)
    }, "undefined" == typeof window ? module.exports = function(t, e, o, l) {
        return t = t || window, e = e || r(t), a(t, e), n(e, t, t.document)
    } : (a(window, r), module.exports = n(r, window, window.document))) : n(jQuery, window, document)
}(function(C, T, y, t, e, k) {
    "use strict";
    var o,
        l,
        n = C.fn.dataTable;
    function S() {
        return o || T.JSZip
    }
    function s() {
        return l || T.pdfMake
    }
    n.Buttons.pdfMake = function(t) {
        if (!t)
            return s();
        l = t
    },
        n.Buttons.jszip = function(t) {
            if (!t)
                return S();
            o = t
        };
    function N(t) {
        var e = "Sheet1";
        return e = t.sheetName ? t.sheetName.replace(/[\[\]\*\/\\\?\:]/g, "") : e
    }
    function u(t, e) {
        for (var o = c(e), l = t.buttons.exportData(e.exportOptions), n = e.fieldBoundary, r = e.fieldSeparator, a = new RegExp(n, "g"), d = e.escapeChar !== k ? e.escapeChar : "\\", p = function(t) {
            for (var e = "", o = 0, l = t.length; o < l; o++)
                0 < o && (e += r),
                    e += n ? n + ("" + t[o]).replace(a, d + n) + n : t[o];
            return e
        }, t = e.header ? p(l.header) + o : "", e = e.footer && l.footer ? o + p(l.footer) : "", i = [], s = 0, f = l.body.length; s < f; s++)
            i.push(p(l.body[s]));
        return {
            str: t + i.join(o) + e,
            rows: i.length
        }
    }
    function f() {
        var t;
        return -1 !== navigator.userAgent.indexOf("Safari") && -1 === navigator.userAgent.indexOf("Chrome") && -1 === navigator.userAgent.indexOf("Opera") && !!((t = navigator.userAgent.match(/AppleWebKit\/(\d+\.\d+)/)) && 1 < t.length && +t[1] < 603.1)
    }
    var O = function(d) {
            var p,
                i,
                s,
                f,
                m,
                y,
                e,
                u,
                c,
                l,
                t;
            if (!(void 0 === d || "undefined" != typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent)))
                return t = d.document, p = function() {
                    return d.URL || d.webkitURL || d
                }, i = t.createElementNS("http://www.w3.org/1999/xhtml", "a"), s = "download" in i, f = /constructor/i.test(d.HTMLElement) || d.safari, m = /CriOS\/[\d]+/.test(navigator.userAgent), y = function(t) {
                    (d.setImmediate || d.setTimeout)(function() {
                        throw t
                    }, 0)
                }, e = 4e4, u = function(t) {
                    setTimeout(function() {
                        "string" == typeof t ? p().revokeObjectURL(t) : t.remove()
                    }, e)
                }, c = function(t) {
                    return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type) ? new Blob([String.fromCharCode(65279), t], {
                        type: t.type
                    }) : t
                }, t = (l = function(t, o, e) {
                    e || (t = c(t));
                    var l,
                        n,
                        r = this,
                        e = "application/octet-stream" === t.type,
                        a = function() {
                            for (var t = r, e = "writestart progress write writeend".split(" "), o = void 0, l = (e = [].concat(e)).length; l--;) {
                                var n = t["on" + e[l]];
                                if ("function" == typeof n)
                                    try {
                                        n.call(t, o || t)
                                    } catch (t) {
                                        y(t)
                                    }
                            }
                        };
                    r.readyState = r.INIT,
                        s ? (l = p().createObjectURL(t), setTimeout(function() {
                            var t,
                                e;
                            i.href = l,
                                i.download = o,
                                t = i,
                                e = new MouseEvent("click"),
                                t.dispatchEvent(e),
                                a(),
                                u(l),
                                r.readyState = r.DONE
                        })) : (m || e && f) && d.FileReader ? ((n = new FileReader).onloadend = function() {
                            var t = m ? n.result : n.result.replace(/^data:[^;]*;/, "data:attachment/file;");
                            d.open(t, "_blank") || (d.location.href = t),
                                r.readyState = r.DONE,
                                a()
                        }, n.readAsDataURL(t), r.readyState = r.INIT) : (l = l || p().createObjectURL(t), !e && d.open(l, "_blank") || (d.location.href = l), r.readyState = r.DONE, a(), u(l))
                }).prototype, "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function(t, e, o) {
                    return e = e || t.name || "download", o || (t = c(t)), navigator.msSaveOrOpenBlob(t, e)
                } : (t.abort = function() {}, t.readyState = t.INIT = 0, t.WRITING = 1, t.DONE = 2, t.error = t.onwritestart = t.onprogress = t.onwrite = t.onabort = t.onerror = t.onwriteend = null, function(t, e, o) {
                    return new l(t, e || t.name || "download", o)
                })
        }("undefined" != typeof self && self || void 0 !== T && T || this.content),
        c = (n.fileSave = O, function(t) {
            return t.newline || (navigator.userAgent.match(/Windows/) ? "\r\n" : "\n")
        });
    function z(t) {
        for (var e = "A".charCodeAt(0), o = "Z".charCodeAt(0) - e + 1, l = ""; 0 <= t;)
            l = String.fromCharCode(t % o + e) + l,
                t = Math.floor(t / o) - 1;
        return l
    }
    try {
        var D,
            A = new XMLSerializer
    } catch (t) {}
    function E(t, e, o) {
        var l = t.createElement(e);
        return o && (o.attr && C(l).attr(o.attr), o.children && C.each(o.children, function(t, e) {
            l.appendChild(e)
        }), null !== o.text) && o.text !== k && l.appendChild(t.createTextNode(o.text)), l
    }
    var _ = {
            "_rels/.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
            "xl/_rels/workbook.xml.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
            "[Content_Types].xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml" /><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" /><Default Extension="jpeg" ContentType="image/jpeg" /><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" /><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" /><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" /></Types>',
            "xl/workbook.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/><workbookPr showInkAnnotation="0" autoCompressPictures="0"/><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/></bookViews><sheets><sheet name="Sheet1" sheetId="1" r:id="rId1"/></sheets><definedNames/></workbook>',
            "xl/worksheets/sheet1.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><sheetData/><mergeCells count="0"/></worksheet>',
            "xl/styles.xml": '<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><numFmts count="6"><numFmt numFmtId="164" formatCode="#,##0.00_- [$$-45C]"/><numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/><numFmt numFmtId="166" formatCode="[$€-2] #,##0.00"/><numFmt numFmtId="167" formatCode="0.0%"/><numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/><numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/></numFmts><fonts count="5" x14ac:knownFonts="1"><font><sz val="11" /><name val="Calibri" /></font><font><sz val="11" /><name val="Calibri" /><color rgb="FFFFFFFF" /></font><font><sz val="11" /><name val="Calibri" /><b /></font><font><sz val="11" /><name val="Calibri" /><i /></font><font><sz val="11" /><name val="Calibri" /><u /></font></fonts><fills count="6"><fill><patternFill patternType="none" /></fill><fill><patternFill patternType="none" /></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD9D9D9" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD99795" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6efce" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6cfef" /><bgColor indexed="64" /></patternFill></fill></fills><borders count="2"><border><left /><right /><top /><bottom /><diagonal /></border><border diagonalUp="false" diagonalDown="false"><left style="thin"><color auto="1" /></left><right style="thin"><color auto="1" /></right><top style="thin"><color auto="1" /></top><bottom style="thin"><color auto="1" /></bottom><diagonal /></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" /></cellStyleXfs><cellXfs count="68"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="left"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="center"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="right"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="fill"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment textRotation="90"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment wrapText="1"/></xf><xf numFmtId="9"   fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="165" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="1" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="2" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="14" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0" /></cellStyles><dxfs count="0" /><tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" /></styleSheet>'
        },
        R = [{
            match: /^\-?\d+\.\d%$/,
            style: 60,
            fmt: function(t) {
                return t / 100
            }
        }, {
            match: /^\-?\d+\.?\d*%$/,
            style: 56,
            fmt: function(t) {
                return t / 100
            }
        }, {
            match: /^\-?\$[\d,]+.?\d*$/,
            style: 57
        }, {
            match: /^\-?£[\d,]+.?\d*$/,
            style: 58
        }, {
            match: /^\-?€[\d,]+.?\d*$/,
            style: 59
        }, {
            match: /^\-?\d+$/,
            style: 65
        }, {
            match: /^\-?\d+\.\d{2}$/,
            style: 66
        }, {
            match: /^\([\d,]+\)$/,
            style: 61,
            fmt: function(t) {
                return -1 * t.replace(/[\(\)]/g, "")
            }
        }, {
            match: /^\([\d,]+\.\d{2}\)$/,
            style: 62,
            fmt: function(t) {
                return -1 * t.replace(/[\(\)]/g, "")
            }
        }, {
            match: /^\-?[\d,]+$/,
            style: 63
        }, {
            match: /^\-?[\d,]+\.\d{2}$/,
            style: 64
        }, {
            match: /^[\d]{4}\-[01][\d]\-[0123][\d]$/,
            style: 67,
            fmt: function(t) {
                return Math.round(25569 + Date.parse(t) / 864e5)
            }
        }];
    return n.ext.buttons.copyHtml5 = {
        className: "buttons-copy buttons-html5",
        text: function(t) {
            return t.i18n("buttons.copy", "Copy")
        },
        action: function(t, e, o, l) {
            this.processing(!0);
            var n = this,
                r = u(e, l),
                a = e.buttons.exportInfo(l),
                d = c(l),
                p = r.str,
                i = C("<div/>").css({
                    height: 1,
                    width: 1,
                    overflow: "hidden",
                    position: "fixed",
                    top: 0,
                    left: 0
                }),
                d = (a.title && (p = a.title + d + d + p), a.messageTop && (p = a.messageTop + d + d + p), a.messageBottom && (p = p + d + d + a.messageBottom), l.customize && (p = l.customize(p, l, e)), C("<textarea readonly/>").val(p).appendTo(i));
            if (y.queryCommandSupported("copy")) {
                i.appendTo(e.table().container()),
                    d[0].focus(),
                    d[0].select();
                try {
                    var s = y.execCommand("copy");
                    if (i.remove(), s)
                        return e.buttons.info(e.i18n("buttons.copyTitle", "Copy to clipboard"), e.i18n("buttons.copySuccess", {
                            1: "Copied one row to clipboard",
                            _: "Copied %d rows to clipboard"
                        }, r.rows), 2e3), void this.processing(!1)
                } catch (t) {}
            }
            function f() {
                m.off("click.buttons-copy"),
                    C(y).off(".buttons-copy"),
                    e.buttons.info(!1)
            }
            var a = C("<span>" + e.i18n("buttons.copyKeys", "Press <i>ctrl</i> or <i>⌘</i> + <i>C</i> to copy the table data<br>to your system clipboard.<br><br>To cancel, click this message or press escape.") + "</span>").append(i),
                m = (e.buttons.info(e.i18n("buttons.copyTitle", "Copy to clipboard"), a, 0), d[0].focus(), d[0].select(), C(a).closest(".dt-button-info"));
            m.on("click.buttons-copy", f),
                C(y).on("keydown.buttons-copy", function(t) {
                    27 === t.keyCode && (f(), n.processing(!1))
                }).on("copy.buttons-copy cut.buttons-copy", function() {
                    f(),
                        n.processing(!1)
                })
        },
        exportOptions: {},
        fieldSeparator: "\t",
        fieldBoundary: "",
        header: !0,
        footer: !1,
        title: "*",
        messageTop: "*",
        messageBottom: "*"
    }, n.ext.buttons.csvHtml5 = {
        bom: !1,
        className: "buttons-csv buttons-html5",
        available: function() {
            return T.FileReader !== k && T.Blob
        },
        text: function(t) {
            return t.i18n("buttons.csv", "CSV")
        },
        action: function(t, e, o, l) {
            this.processing(!0);
            var n = u(e, l).str,
                r = e.buttons.exportInfo(l),
                a = l.charset;
            l.customize && (n = l.customize(n, l, e)),
                a = !1 !== a ? (a = a || y.characterSet || y.charset) && ";charset=" + a : "",
            l.bom && (n = String.fromCharCode(65279) + n),
                O(new Blob([n], {
                    type: "text/csv" + a
                }), r.filename, !0),
                this.processing(!1)
        },
        filename: "*",
        extension: ".csv",
        exportOptions: {},
        fieldSeparator: ",",
        fieldBoundary: '"',
        escapeChar: '"',
        charset: null,
        header: !0,
        footer: !1
    }, n.ext.buttons.excelHtml5 = {
        className: "buttons-excel buttons-html5",
        available: function() {
            return T.FileReader !== k && S() !== k && !f() && A
        },
        text: function(t) {
            return t.i18n("buttons.excel", "Excel")
        },
        action: function(t, e, o, s) {
            this.processing(!0);
            function l(t) {
                return t = _[t], C.parseXML(t)
            }
            function n(t) {
                m = E(u, "row", {
                    attr: {
                        r: f = y + 1
                    }
                });
                for (var e = 0, o = t.length; e < o; e++) {
                    var l = z(e) + "" + f,
                        n = null;
                    if (null === t[e] || t[e] === k || "" === t[e]) {
                        if (!0 !== s.createEmptyCells)
                            continue;
                        t[e] = ""
                    }
                    var r = t[e];
                    t[e] = "function" == typeof t[e].trim ? t[e].trim() : t[e];
                    for (var a = 0, d = R.length; a < d; a++) {
                        var p = R[a];
                        if (t[e].match && !t[e].match(/^0\d+/) && t[e].match(p.match)) {
                            var i = t[e].replace(/[^\d\.\-]/g, "");
                            p.fmt && (i = p.fmt(i)),
                                n = E(u, "c", {
                                    attr: {
                                        r: l,
                                        s: p.style
                                    },
                                    children: [E(u, "v", {
                                        text: i
                                    })]
                                });
                            break
                        }
                    }
                    n = n || ("number" == typeof t[e] || t[e].match && t[e].match(/^-?\d+(\.\d+)?([eE]\-?\d+)?$/) && !t[e].match(/^0\d+/) ? E(u, "c", {
                        attr: {
                            t: "n",
                            r: l
                        },
                        children: [E(u, "v", {
                            text: t[e]
                        })]
                    }) : (r = r.replace ? r.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "") : r, E(u, "c", {
                        attr: {
                            t: "inlineStr",
                            r: l
                        },
                        children: {
                            row: E(u, "is", {
                                children: {
                                    row: E(u, "t", {
                                        text: r,
                                        attr: {
                                            "xml:space": "preserve"
                                        }
                                    })
                                }
                            })
                        }
                    }))),
                        m.appendChild(n)
                }
                c.appendChild(m),
                    y++
            }
            function r(t, e) {
                var o = C("mergeCells", u);
                o[0].appendChild(E(u, "mergeCell", {
                    attr: {
                        ref: "A" + t + ":" + z(e) + t
                    }
                })),
                    o.attr("count", parseFloat(o.attr("count")) + 1),
                    C("row:eq(" + (t - 1) + ") c", u).attr("s", "51")
            }
            var a,
                f,
                m,
                d = this,
                y = 0,
                u = l("xl/worksheets/sheet1.xml"),
                c = u.getElementsByTagName("sheetData")[0],
                p = {
                    _rels: {
                        ".rels": l("_rels/.rels")
                    },
                    xl: {
                        _rels: {
                            "workbook.xml.rels": l("xl/_rels/workbook.xml.rels")
                        },
                        "workbook.xml": l("xl/workbook.xml"),
                        "styles.xml": l("xl/styles.xml"),
                        worksheets: {
                            "sheet1.xml": u
                        }
                    },
                    "[Content_Types].xml": l("[Content_Types].xml")
                },
                i = e.buttons.exportData(s.exportOptions),
                I = (s.customizeData && s.customizeData(i), e.buttons.exportInfo(s));
            I.title && (n([I.title]), r(y, i.header.length - 1)),
            I.messageTop && (n([I.messageTop]), r(y, i.header.length - 1)),
            s.header && (n(i.header), C("row:last c", u).attr("s", "2"));
            for (var F = y, x = 0, h = i.body.length; x < h; x++)
                n(i.body[x]);
            a = y,
            s.footer && i.footer && (n(i.footer), C("row:last c", u).attr("s", "2")),
            I.messageBottom && (n([I.messageBottom]), r(y, i.header.length - 1));
            var b = E(u, "cols");
            C("worksheet", u).prepend(b);
            for (var g = 0, v = i.header.length; g < v; g++)
                b.appendChild(E(u, "col", {
                    attr: {
                        min: g + 1,
                        max: g + 1,
                        width: function(t, e) {
                            var o = t.header[e].length;
                            t.footer && t.footer[e].length > o && (o = t.footer[e].length);
                            for (var l = 0, n = t.body.length; l < n; l++) {
                                var r,
                                    a = t.body[l][e];
                                if (40 < (o = o < (r = (-1 !== (a = null !== a && a !== k ? a.toString() : "").indexOf("\n") ? ((r = a.split("\n")).sort(function(t, e) {
                                    return e.length - t.length
                                }), r[0]) : a).length) ? r : o))
                                    return 54
                            }
                            return 6 < (o *= 1.35) ? o : 6
                        }(i, g),
                        customWidth: 1
                    }
                }));
            var w = p.xl["workbook.xml"];
            C("sheets sheet", w).attr("name", N(s)),
            s.autoFilter && (C("mergeCells", u).before(E(u, "autoFilter", {
                attr: {
                    ref: "A" + F + ":" + z(i.header.length - 1) + a
                }
            })), C("definedNames", w).append(E(w, "definedName", {
                attr: {
                    name: "_xlnm._FilterDatabase",
                    localSheetId: "0",
                    hidden: 1
                },
                text: N(s) + "!$A$" + F + ":" + z(i.header.length - 1) + a
            }))),
            s.customize && s.customize(p, s, e),
            0 === C("mergeCells", u).children().length && C("mergeCells", u).remove();
            var w = new (S()),
                F = {
                    compression: "DEFLATE",
                    type: "blob",
                    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                },
                B = (!function s(f, t) {
                    D === k && (D = -1 === A.serializeToString((new T.DOMParser).parseFromString(_["xl/worksheets/sheet1.xml"], "text/xml")).indexOf("xmlns:r")),
                        C.each(t, function(t, e) {
                            if (C.isPlainObject(e))
                                s(f.folder(t), e);
                            else {
                                if (D) {
                                    for (var o, l = e.childNodes[0], n = [], r = l.attributes.length - 1; 0 <= r; r--) {
                                        var a = l.attributes[r].nodeName,
                                            d = l.attributes[r].nodeValue;
                                        -1 !== a.indexOf(":") && (n.push({
                                            name: a,
                                            value: d
                                        }), l.removeAttribute(a))
                                    }
                                    for (r = 0, o = n.length; r < o; r++) {
                                        var p = e.createAttribute(n[r].name.replace(":", "_dt_b_namespace_token_"));
                                        p.value = n[r].value,
                                            l.setAttributeNode(p)
                                    }
                                }
                                var i = A.serializeToString(e),
                                    i = (i = D ? (i = (i = -1 === i.indexOf("<?xml") ? '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + i : i).replace(/_dt_b_namespace_token_/g, ":")).replace(/xmlns:NS[\d]+="" NS[\d]+:/g, "") : i).replace(/<([^<>]*?) xmlns=""([^<>]*?)>/g, "<$1 $2>");
                                f.file(t, i)
                            }
                        })
                }(w, p), I.filename);
            175 < B && (B = B.substr(0, 175)),
                w.generateAsync ? w.generateAsync(F).then(function(t) {
                    O(t, B),
                        d.processing(!1)
                }) : (O(w.generate(F), B), this.processing(!1))
        },
        filename: "*",
        extension: ".xlsx",
        exportOptions: {},
        header: !0,
        footer: !1,
        title: "*",
        messageTop: "*",
        messageBottom: "*",
        createEmptyCells: !1,
        autoFilter: !1,
        sheetName: ""
    }, n.ext.buttons.pdfHtml5 = {
        className: "buttons-pdf buttons-html5",
        available: function() {
            return T.FileReader !== k && s()
        },
        text: function(t) {
            return t.i18n("buttons.pdf", "PDF")
        },
        action: function(t, e, o, l) {
            this.processing(!0);
            var n = e.buttons.exportData(l.exportOptions),
                r = e.buttons.exportInfo(l),
                a = [];
            l.header && a.push(C.map(n.header, function(t) {
                return {
                    text: "string" == typeof t ? t : t + "",
                    style: "tableHeader"
                }
            }));
            for (var d = 0, p = n.body.length; d < p; d++)
                a.push(C.map(n.body[d], function(t) {
                    return {
                        text: "string" == typeof (t = null !== t && t !== k ? t : "") ? t : t + "",
                        style: d % 2 ? "tableBodyEven" : "tableBodyOdd"
                    }
                }));
            l.footer && n.footer && a.push(C.map(n.footer, function(t) {
                return {
                    text: "string" == typeof t ? t : t + "",
                    style: "tableFooter"
                }
            }));
            var i = {
                    pageSize: l.pageSize,
                    pageOrientation: l.orientation,
                    content: [{
                        table: {
                            headerRows: 1,
                            body: a
                        },
                        layout: "noBorders"
                    }],
                    styles: {
                        tableHeader: {
                            bold: !0,
                            fontSize: 11,
                            color: "white",
                            fillColor: "#2d4154",
                            alignment: "center"
                        },
                        tableBodyEven: {},
                        tableBodyOdd: {
                            fillColor: "#f3f3f3"
                        },
                        tableFooter: {
                            bold: !0,
                            fontSize: 11,
                            color: "white",
                            fillColor: "#2d4154"
                        },
                        title: {
                            alignment: "center",
                            fontSize: 15
                        },
                        message: {}
                    },
                    defaultStyle: {
                        fontSize: 10
                    }
                },
                e = (r.messageTop && i.content.unshift({
                    text: r.messageTop,
                    style: "message",
                    margin: [0, 0, 0, 12]
                }), r.messageBottom && i.content.push({
                    text: r.messageBottom,
                    style: "message",
                    margin: [0, 0, 0, 12]
                }), r.title && i.content.unshift({
                    text: r.title,
                    style: "title",
                    margin: [0, 0, 0, 12]
                }), l.customize && l.customize(i, l, e), s().createPdf(i));
            "open" !== l.download || f() ? e.download(r.filename) : e.open(),
                this.processing(!1)
        },
        title: "*",
        filename: "*",
        extension: ".pdf",
        exportOptions: {},
        orientation: "portrait",
        pageSize: "A4",
        header: !0,
        footer: !1,
        messageTop: "*",
        messageBottom: "*",
        customize: null,
        download: "download"
    }, n
});

/*!
 * Print button for Buttons and DataTables.
 * © SpryMedia Ltd - datatables.net/license
 */
!function(n) {
    var o,
        r;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net", "datatables.net-buttons"], function(t) {
        return n(t, window, document)
    }) : "object" == typeof exports ? (o = require("jquery"), r = function(t, e) {
        e.fn.dataTable || require("datatables.net")(t, e),
        e.fn.dataTable.Buttons || require("datatables.net-buttons")(t, e)
    }, "undefined" == typeof window ? module.exports = function(t, e) {
        return t = t || window, e = e || o(t), r(t, e), n(e, t, t.document)
    } : (r(window, o), module.exports = n(o, window, window.document))) : n(jQuery, window, document)
}(function(m, b, t, p) {
    "use strict";
    function h(t) {
        return n.href = t, -1 === (t = n.host).indexOf("/") && 0 !== n.pathname.indexOf("/") && (t += "/"), n.protocol + "//" + t + n.pathname + n.search
    }
    var e = m.fn.dataTable,
        n = t.createElement("a");
    return e.ext.buttons.print = {
        className: "buttons-print",
        text: function(t) {
            return t.i18n("buttons.print", "Print")
        },
        action: function(t, e, n, o) {
            function r(t, e) {
                for (var n = "<tr>", o = 0, r = t.length; o < r; o++) {
                    var i = null === t[o] || t[o] === p ? "" : t[o];
                    n += "<" + e + " " + (s[o] ? 'class="' + s[o] + '"' : "") + ">" + i + "</" + e + ">"
                }
                return n + "</tr>"
            }
            var i = e.buttons.exportData(m.extend({
                    decodeEntities: !1
                }, o.exportOptions)),
                a = e.buttons.exportInfo(o),
                s = e.columns(o.exportOptions.columns).flatten().map(function(t) {
                    return e.settings()[0].aoColumns[e.column(t).index()].sClass
                }).toArray(),
                u = '<table class="' + e.table().node().className + '">';
            o.header && (u += "<thead>" + r(i.header, "th") + "</thead>"),
                u += "<tbody>";
            for (var d = 0, c = i.body.length; d < c; d++)
                u += r(i.body[d], "td");
            u += "</tbody>",
            o.footer && i.footer && (u += "<tfoot>" + r(i.footer, "th") + "</tfoot>"),
                u += "</table>";
            var l = b.open("", "");
            if (l) {
                l.document.close();
                var f = "<title>" + a.title + "</title>";
                m("style, link").each(function() {
                    f += function(t) {
                        t = m(t).clone()[0];
                        return "link" === t.nodeName.toLowerCase() && (t.href = h(t.href)), t.outerHTML
                    }(this)
                });
                try {
                    l.document.head.innerHTML = f
                } catch (t) {
                    m(l.document.head).html(f)
                }
                l.document.body.innerHTML = "<h1>" + a.title + "</h1><div>" + (a.messageTop || "") + "</div>" + u + "<div>" + (a.messageBottom || "") + "</div>",
                    m(l.document.body).addClass("dt-print-view"),
                    m("img", l.document.body).each(function(t, e) {
                        e.setAttribute("src", h(e.getAttribute("src")))
                    }),
                o.customize && o.customize(l, o, e);
                a = function() {
                    o.autoPrint && (l.print(), l.close())
                };
                navigator.userAgent.match(/Trident\/\d.\d/) ? a() : l.setTimeout(a, 1e3)
            } else
                e.buttons.info(e.i18n("buttons.printErrorTitle", "Unable to open print view"), e.i18n("buttons.printErrorMsg", "Please allow popups in your browser for this site to be able to view the print view."), 5e3)
        },
        title: "*",
        messageTop: "*",
        messageBottom: "*",
        exportOptions: {},
        header: !0,
        footer: !1,
        autoPrint: !0,
        customize: null
    }, e
});

/*! ColReorder 1.7.0
 * © SpryMedia Ltd - datatables.net/license
 */
!function(o) {
    var n,
        s;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return o(t, window, document)
    }) : "object" == typeof exports ? (n = require("jquery"), s = function(t, e) {
        e.fn.dataTable || require("datatables.net")(t, e)
    }, "undefined" == typeof window ? module.exports = function(t, e) {
        return t = t || window, e = e || n(t), s(t, e), o(e, 0, t.document)
    } : (s(window, n), module.exports = o(n, window, window.document))) : o(jQuery, window, document)
}(function(R, t, s, b) {
    "use strict";
    var r = R.fn.dataTable;
    function T(t) {
        for (var e = [], o = 0, n = t.length; o < n; o++)
            e[t[o]] = o;
        return e
    }
    function v(t, e, o) {
        e = t.splice(e, 1)[0];
        t.splice(o, 0, e)
    }
    function S(t, e, o) {
        for (var n = [], s = 0, r = t.childNodes.length; s < r; s++)
            1 == t.childNodes[s].nodeType && n.push(t.childNodes[s]);
        e = n[e];
        null !== o ? t.insertBefore(e, n[o]) : t.appendChild(e)
    }
    R.fn.dataTableExt.oApi.fnColReorder = function(o, t, e, n, s) {
        function r(t, e, o) {
            var n,
                s;
            t[e] && "function" != typeof t[e] && (s = (n = t[e].split(".")).shift(), isNaN(+s) || (t[e] = o[+s] + "." + n.join(".")))
        }
        var i,
            a,
            l,
            d,
            f,
            u,
            h = o.aoColumns.length;
        if (t != e)
            if (t < 0 || h <= t)
                this.oApi._fnLog(o, 1, "ColReorder 'from' index is out of bounds: " + t);
            else if (e < 0 || h <= e)
                this.oApi._fnLog(o, 1, "ColReorder 'to' index is out of bounds: " + e);
            else {
                var c = [];
                for (p = 0, i = h; p < i; p++)
                    c[p] = p;
                v(c, t, e);
                var g = T(c);
                for (p = 0, i = o.aaSorting.length; p < i; p++)
                    o.aaSorting[p][0] = g[o.aaSorting[p][0]];
                if (null !== o.aaSortingFixed)
                    for (p = 0, i = o.aaSortingFixed.length; p < i; p++)
                        o.aaSortingFixed[p][0] = g[o.aaSortingFixed[p][0]];
                for (p = 0, i = h; p < i; p++) {
                    for (a = 0, l = (u = o.aoColumns[p]).aDataSort.length; a < l; a++)
                        u.aDataSort[a] = g[u.aDataSort[a]];
                    u.idx = g[u.idx]
                }
                for (R.each(o.aLastSort, function(t, e) {
                    o.aLastSort[t].src = g[e.src]
                }), p = 0, i = h; p < i; p++)
                    "number" == typeof (u = o.aoColumns[p]).mData ? u.mData = g[u.mData] : R.isPlainObject(u.mData) && (r(u.mData, "_", g), r(u.mData, "filter", g), r(u.mData, "sort", g), r(u.mData, "type", g));
                if (o.aoColumns[t].bVisible) {
                    for (var m = this.oApi._fnColumnIndexToVisible(o, t), C = null, p = e < t ? e : e + 1; null === C && p < h;)
                        C = this.oApi._fnColumnIndexToVisible(o, p),
                            p++;
                    for (p = 0, i = (f = o.nTHead.getElementsByTagName("tr")).length; p < i; p++)
                        S(f[p], m, C);
                    if (null !== o.nTFoot)
                        for (p = 0, i = (f = o.nTFoot.getElementsByTagName("tr")).length; p < i; p++)
                            S(f[p], m, C);
                    for (p = 0, i = o.aoData.length; p < i; p++)
                        null !== o.aoData[p].nTr && S(o.aoData[p].nTr, m, C)
                }
                for (v(o.aoColumns, t, e), p = 0, i = h; p < i; p++)
                    o.oApi._fnColumnOptions(o, p, {});
                for (v(o.aoPreSearchCols, t, e), p = 0, i = o.aoData.length; p < i; p++) {
                    var _ = o.aoData[p],
                        x = _.anCells;
                    if (x)
                        for (v(x, t, e), a = 0, d = x.length; a < d; a++)
                            x[a] && x[a]._DT_CellIndex && (x[a]._DT_CellIndex.column = a);
                    Array.isArray(_._aData) && v(_._aData, t, e)
                }
                for (p = 0, i = o.aoHeader.length; p < i; p++)
                    v(o.aoHeader[p], t, e);
                if (null !== o.aoFooter)
                    for (p = 0, i = o.aoFooter.length; p < i; p++)
                        v(o.aoFooter[p], t, e);
                for (!s && s !== b || R.fn.dataTable.Api(o).rows().invalidate("data"), p = 0, i = h; p < i; p++)
                    R(o.aoColumns[p].nTh).off(".DT"),
                        this.oApi._fnSortAttachListener(o, o.aoColumns[p].nTh, p);
                R(o.oInstance).trigger("column-reorder.dt", [o, {
                    from: t,
                    to: e,
                    mapping: g,
                    drop: n,
                    iFrom: t,
                    iTo: e,
                    aiInvertMapping: g
                }])
            }
    };
    function i(t, e) {
        if ((t = new R.fn.dataTable.Api(t).settings()[0])._colReorder)
            return t._colReorder;
        !0 === e && (e = {});
        var o = R.fn.dataTable.camelToHungarian;
        return o && (o(i.defaults, i.defaults, !0), o(i.defaults, e || {})), this.s = {
            dt: null,
            enable: null,
            init: R.extend(!0, {}, i.defaults, e),
            fixed: 0,
            fixedRight: 0,
            reorderCallback: null,
            mouse: {
                startX: -1,
                startY: -1,
                offsetX: -1,
                offsetY: -1,
                target: -1,
                targetIndex: -1,
                fromIndex: -1
            },
            aoTargets: []
        }, this.dom = {
            drag: null,
            pointer: null
        }, this.s.enable = this.s.init.bEnable, this.s.dt = t, (this.s.dt._colReorder = this)._fnConstruct(), this
    }
    return R.extend(i.prototype, {
        fnEnable: function(t) {
            if (!1 === t)
                return this.fnDisable();
            this.s.enable = !0
        },
        fnDisable: function() {
            this.s.enable = !1
        },
        fnReset: function() {
            return this._fnOrderColumns(this.fnOrder()), this
        },
        fnGetCurrentOrder: function() {
            return this.fnOrder()
        },
        fnOrder: function(t, e) {
            var o = [],
                n = this.s.dt.aoColumns;
            if (t === b) {
                for (r = 0, i = n.length; r < i; r++)
                    o.push(n[r]._ColReorder_iOrigCol);
                return o
            }
            if (e) {
                for (var s = this.fnOrder(), r = 0, i = t.length; r < i; r++)
                    o.push(R.inArray(t[r], s));
                t = o
            }
            return this._fnOrderColumns(T(t)), this
        },
        fnTranspose: function(t, e) {
            e = e || "toCurrent";
            var o = this.fnOrder(),
                n = this.s.dt.aoColumns;
            return "toCurrent" === e ? Array.isArray(t) ? R.map(t, function(t) {
                return R.inArray(t, o)
            }) : R.inArray(t, o) : Array.isArray(t) ? R.map(t, function(t) {
                return n[t]._ColReorder_iOrigCol
            }) : n[t]._ColReorder_iOrigCol
        },
        _fnConstruct: function() {
            var t,
                o = this,
                e = this.s.dt.aoColumns.length,
                n = this.s.dt.nTable;
            for (this.s.init.iFixedColumns && (this.s.fixed = this.s.init.iFixedColumns), this.s.init.iFixedColumnsLeft && (this.s.fixed = this.s.init.iFixedColumnsLeft), this.s.fixedRight = this.s.init.iFixedColumnsRight || 0, this.s.init.fnReorderCallback && (this.s.reorderCallback = this.s.init.fnReorderCallback), t = 0; t < e; t++)
                t > this.s.fixed - 1 && t < e - this.s.fixedRight && this._fnMouseListener(t, this.s.dt.aoColumns[t].nTh),
                    this.s.dt.aoColumns[t]._ColReorder_iOrigCol = t;
            this.s.dt.oApi._fnCallbackReg(this.s.dt, "aoStateSaveParams", function(t, e) {
                o._fnStateSave.call(o, e)
            }, "ColReorder_State"),
                this.s.dt.oApi._fnCallbackReg(this.s.dt, "aoStateLoadParams", function(t, e) {
                    o.s.dt._colReorder.fnOrder(e.ColReorder, !0)
                });
            var s,
                r,
                i = null;
            this.s.init.aiOrder && (i = this.s.init.aiOrder.slice()),
                (i = this.s.dt.oLoadedState && void 0 !== this.s.dt.oLoadedState.ColReorder && this.s.dt.oLoadedState.ColReorder.length == this.s.dt.aoColumns.length ? this.s.dt.oLoadedState.ColReorder : i) ? o.s.dt._bInitComplete ? (s = T(i), o._fnOrderColumns.call(o, s)) : (r = !1, R(n).on("draw.dt.colReorder", function() {
                    var t;
                    o.s.dt._bInitComplete || r || (r = !0, t = T(i), o._fnOrderColumns.call(o, t))
                })) : this._fnSetColumnIndexes(),
                R(n).on("destroy.dt.colReorder", function() {
                    o.fnReset(),
                        R(n).off("destroy.dt.colReorder draw.dt.colReorder"),
                        R.each(o.s.dt.aoColumns, function(t, e) {
                            R(e.nTh).off(".ColReorder"),
                                R(e.nTh).removeAttr("data-column-index")
                        }),
                        o.s.dt._colReorder = null,
                        o.s = null
                })
        },
        _fnOrderColumns: function(t) {
            var e = !1;
            if (t.length != this.s.dt.aoColumns.length)
                this.s.dt.oInstance.oApi._fnLog(this.s.dt, 1, "ColReorder - array reorder does not match known number of columns. Skipping.");
            else {
                for (var o = 0, n = t.length; o < n; o++) {
                    var s = R.inArray(o, t);
                    o != s && (v(t, s, o), this.s.dt.oInstance.fnColReorder(s, o, !0, !1), e = !0)
                }
                this._fnSetColumnIndexes(),
                e && (R.fn.dataTable.Api(this.s.dt).rows().invalidate("data"), "" === this.s.dt.oScroll.sX && "" === this.s.dt.oScroll.sY || this.s.dt.oInstance.fnAdjustColumnSizing(!1), this.s.dt.oInstance.oApi._fnSaveState(this.s.dt), null !== this.s.reorderCallback) && this.s.reorderCallback.call(this)
            }
        },
        _fnStateSave: function(t) {
            if (null !== this.s) {
                var e,
                    o = this.s.dt.aoColumns;
                if (t.ColReorder = [], t.aaSorting) {
                    for (s = 0; s < t.aaSorting.length; s++)
                        t.aaSorting[s][0] = o[t.aaSorting[s][0]]._ColReorder_iOrigCol;
                    for (var n = R.extend(!0, [], t.aoSearchCols), s = 0, r = o.length; s < r; s++)
                        e = o[s]._ColReorder_iOrigCol,
                            t.aoSearchCols[e] = n[s],
                            t.abVisCols[e] = o[s].bVisible,
                            t.ColReorder.push(e)
                } else if (t.order) {
                    for (s = 0; s < t.order.length; s++)
                        t.order[s][0] = o[t.order[s][0]]._ColReorder_iOrigCol;
                    var i = R.extend(!0, [], t.columns);
                    for (s = 0, r = o.length; s < r; s++)
                        e = o[s]._ColReorder_iOrigCol,
                            t.columns[e] = i[s],
                            t.ColReorder.push(e)
                }
            }
        },
        _fnMouseListener: function(t, e) {
            var o = this;
            R(e).on("mousedown.ColReorder", function(t) {
                o.s.enable && 1 === t.which && o._fnMouseDown.call(o, t, e)
            }).on("touchstart.ColReorder", function(t) {
                o.s.enable && o._fnMouseDown.call(o, t, e)
            })
        },
        _fnMouseDown: function(t, e) {
            var o = this,
                n = R(t.target).closest("th, td").offset(),
                e = parseInt(R(e).attr("data-column-index"), 10);
            e !== b && (this.s.mouse.startX = this._fnCursorPosition(t, "pageX"), this.s.mouse.startY = this._fnCursorPosition(t, "pageY"), this.s.mouse.offsetX = this._fnCursorPosition(t, "pageX") - n.left, this.s.mouse.offsetY = this._fnCursorPosition(t, "pageY") - n.top, this.s.mouse.target = this.s.dt.aoColumns[e].nTh, this.s.mouse.targetIndex = e, this.s.mouse.fromIndex = e, this._fnRegions(), R(s).on("mousemove.ColReorder touchmove.ColReorder", function(t) {
                o._fnMouseMove.call(o, t)
            }).on("mouseup.ColReorder touchend.ColReorder", function(t) {
                o._fnMouseUp.call(o, t)
            }))
        },
        _fnMouseMove: function(t) {
            var e,
                o = this;
            if (null === this.dom.drag) {
                if (Math.pow(Math.pow(this._fnCursorPosition(t, "pageX") - this.s.mouse.startX, 2) + Math.pow(this._fnCursorPosition(t, "pageY") - this.s.mouse.startY, 2), .5) < 5)
                    return;
                this._fnCreateDragNode()
            }
            this.dom.drag.css({
                left: this._fnCursorPosition(t, "pageX") - this.s.mouse.offsetX,
                top: this._fnCursorPosition(t, "pageY") - this.s.mouse.offsetY
            });
            for (var n = this.s.mouse.toIndex, s = this._fnCursorPosition(t, "pageX"), t = function() {
                for (var t = o.s.aoTargets.length - 1; 0 < t; t--)
                    if (o.s.aoTargets[t].x !== o.s.aoTargets[t - 1].x)
                        return o.s.aoTargets[t]
            }, r = 1; r < this.s.aoTargets.length; r++) {
                var i = function(t) {
                        for (; 0 <= t;) {
                            if (--t <= 0)
                                return null;
                            if (o.s.aoTargets[t + 1].x !== o.s.aoTargets[t].x)
                                return o.s.aoTargets[t]
                        }
                    }(r),
                    a = (i = i || function() {
                        for (var t = 0; t < o.s.aoTargets.length - 1; t++)
                            if (o.s.aoTargets[t].x !== o.s.aoTargets[t + 1].x)
                                return o.s.aoTargets[t]
                    }()).x + (this.s.aoTargets[r].x - i.x) / 2;
                if (this._fnIsLtr()) {
                    if (s < a) {
                        e = i;
                        break
                    }
                } else if (a < s) {
                    e = i;
                    break
                }
            }
            e ? (this.dom.pointer.css("left", e.x), this.s.mouse.toIndex = e.to) : (this.dom.pointer.css("left", t().x), this.s.mouse.toIndex = t().to),
            this.s.init.bRealtime && n !== this.s.mouse.toIndex && (this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex, this.s.mouse.toIndex), this.s.mouse.fromIndex = this.s.mouse.toIndex, "" === this.s.dt.oScroll.sX && "" === this.s.dt.oScroll.sY || this.s.dt.oInstance.fnAdjustColumnSizing(!1), this._fnRegions())
        },
        _fnMouseUp: function(t) {
            R(s).off(".ColReorder"),
            null !== this.dom.drag && (this.dom.drag.remove(), this.dom.pointer.remove(), this.dom.drag = null, this.dom.pointer = null, this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex, this.s.mouse.toIndex, !0), this._fnSetColumnIndexes(), "" === this.s.dt.oScroll.sX && "" === this.s.dt.oScroll.sY || this.s.dt.oInstance.fnAdjustColumnSizing(!1), this.s.dt.oInstance.oApi._fnSaveState(this.s.dt), null !== this.s.reorderCallback) && this.s.reorderCallback.call(this)
        },
        _fnRegions: function() {
            var t = this.s.dt.aoColumns,
                n = this._fnIsLtr(),
                s = (this.s.aoTargets.splice(0, this.s.aoTargets.length), R(this.s.dt.nTable).offset().left),
                r = [],
                e = (R.each(t, function(t, e) {
                    var o;
                    e.bVisible && "none" !== e.nTh.style.display ? (o = (e = R(e.nTh)).offset().left, n && (o += e.outerWidth()), r.push({
                        index: t,
                        bound: o
                    }), s = o) : r.push({
                        index: t,
                        bound: s
                    })
                }), r[0]),
                t = R(t[e.index].nTh).outerWidth();
            this.s.aoTargets.push({
                to: 0,
                x: e.bound - t
            });
            for (var o = 0; o < r.length; o++) {
                var i = r[o],
                    a = i.index;
                i.index < this.s.mouse.fromIndex && a++,
                    this.s.aoTargets.push({
                        to: a,
                        x: i.bound
                    })
            }
            0 !== this.s.fixedRight && this.s.aoTargets.splice(this.s.aoTargets.length - this.s.fixedRight),
            0 !== this.s.fixed && this.s.aoTargets.splice(0, this.s.fixed)
        },
        _fnCreateDragNode: function() {
            var t = "" !== this.s.dt.oScroll.sX || "" !== this.s.dt.oScroll.sY,
                e = this.s.dt.aoColumns[this.s.mouse.targetIndex].nTh,
                o = e.parentNode,
                n = o.parentNode,
                s = n.parentNode,
                r = R(e).clone();
            this.dom.drag = R(s.cloneNode(!1)).addClass("DTCR_clonedTable").append(R(n.cloneNode(!1)).append(R(o.cloneNode(!1)).append(r[0]))).css({
                position: "absolute",
                top: 0,
                left: 0,
                width: R(e).outerWidth(),
                height: R(e).outerHeight()
            }).appendTo("body"),
                this.dom.pointer = R("<div></div>").addClass("DTCR_pointer").css({
                    position: "absolute",
                    top: R(t ? R(this.s.dt.nScrollBody).parent() : this.s.dt.nTable).offset().top,
                    height: R(t ? R(this.s.dt.nScrollBody).parent() : this.s.dt.nTable).height()
                }).appendTo("body")
        },
        _fnSetColumnIndexes: function() {
            R.each(this.s.dt.aoColumns, function(t, e) {
                R(e.nTh).attr("data-column-index", t)
            })
        },
        _fnCursorPosition: function(t, e) {
            return (-1 !== t.type.indexOf("touch") ? t.originalEvent.touches[0] : t)[e]
        },
        _fnIsLtr: function() {
            return "rtl" !== R(this.s.dt.nTable).css("direction")
        }
    }), i.defaults = {
        aiOrder: null,
        bEnable: !0,
        bRealtime: !0,
        iFixedColumnsLeft: 0,
        iFixedColumnsRight: 0,
        fnReorderCallback: null
    }, i.version = "1.7.0", R.fn.dataTable.ColReorder = i, R.fn.DataTable.ColReorder = i, "function" == typeof R.fn.dataTable && "function" == typeof R.fn.dataTableExt.fnVersionCheck && R.fn.dataTableExt.fnVersionCheck("1.10.8") ? R.fn.dataTableExt.aoFeatures.push({
        fnInit: function(t) {
            var e = t.oInstance;
            return t._colReorder ? e.oApi._fnLog(t, 1, "ColReorder attempted to initialise twice. Ignoring second") : (e = (e = t.oInit).colReorder || e.oColReorder || {}, new i(t, e)), null
        },
        cFeature: "R",
        sFeature: "ColReorder"
    }) : alert("Warning: ColReorder requires DataTables 1.10.8 or greater - www.datatables.net/download"), R(s).on("preInit.dt.colReorder", function(t, e) {
        var o,
            n;
        "dt" === t.namespace && (t = e.oInit.colReorder, o = r.defaults.colReorder, t || o) && (n = R.extend({}, t, o), !1 !== t) && new i(e, n)
    }), R.fn.dataTable.Api.register("colReorder.reset()", function() {
        return this.iterator("table", function(t) {
            t._colReorder.fnReset()
        })
    }), R.fn.dataTable.Api.register("colReorder.order()", function(e, o) {
        return e ? this.iterator("table", function(t) {
            t._colReorder.fnOrder(e, o)
        }) : this.context.length ? this.context[0]._colReorder.fnOrder() : null
    }), R.fn.dataTable.Api.register("colReorder.transpose()", function(t, e) {
        return this.context.length && this.context[0]._colReorder ? this.context[0]._colReorder.fnTranspose(t, e) : t
    }), R.fn.dataTable.Api.register("colReorder.move()", function(t, e, o, n) {
        return this.context.length && (this.context[0]._colReorder.s.dt.oInstance.fnColReorder(t, e, o, n), this.context[0]._colReorder._fnSetColumnIndexes()), this
    }), R.fn.dataTable.Api.register("colReorder.enable()", function(e) {
        return this.iterator("table", function(t) {
            t._colReorder && t._colReorder.fnEnable(e)
        })
    }), R.fn.dataTable.Api.register("colReorder.disable()", function() {
        return this.iterator("table", function(t) {
            t._colReorder && t._colReorder.fnDisable()
        })
    }), r
});

/*! Bootstrap 5 styling wrapper for ColReorder
 * © SpryMedia Ltd - datatables.net/license
 */
!function(t) {
    var o,
        d;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs5", "datatables.net-colreorder"], function(e) {
        return t(e, window, document)
    }) : "object" == typeof exports ? (o = require("jquery"), d = function(e, n) {
        n.fn.dataTable || require("datatables.net-bs5")(e, n),
        n.fn.dataTable.ColReorder || require("datatables.net-colreorder")(e, n)
    }, "undefined" == typeof window ? module.exports = function(e, n) {
        return e = e || window, n = n || o(e), d(e, n), t(n, 0, e.document)
    } : (d(window, o), module.exports = t(o, window, window.document))) : t(jQuery, window, document)
}(function(e, n, t, o) {
    "use strict";
    return e.fn.dataTable
});

/*! DateTime picker for DataTables.net v1.5.1
 *
 * © SpryMedia Ltd, all rights reserved.
 * License: MIT datatables.net/license/mit
 */
!function(s) {
    var i;
    "function" == typeof define && define.amd ? define(["jquery"], function(t) {
        return s(t, window, document)
    }) : "object" == typeof exports ? (i = require("jquery"), "undefined" == typeof window ? module.exports = function(t, e) {
        return t = t || window, e = e || i(t), s(e, t, t.document)
    } : module.exports = s(i, window, window.document)) : s(jQuery, window, document)
}(function(g, o, i, n) {
    "use strict";
    function a(t, e) {
        if (a.factory(t, e))
            return a;
        if (void 0 === r && (r = o.moment || o.dayjs || o.luxon || null), this.c = g.extend(!0, {}, a.defaults, e), e = this.c.classPrefix, this.c.i18n, !r && "YYYY-MM-DD" !== this.c.format)
            throw "DateTime: Without momentjs, dayjs or luxon only the format 'YYYY-MM-DD' can be used";
        "string" == typeof this.c.minDate && (this.c.minDate = new Date(this.c.minDate)),
        "string" == typeof this.c.maxDate && (this.c.maxDate = new Date(this.c.maxDate));
        var s = g('<div class="' + e + '"><div class="' + e + '-date"><div class="' + e + '-title"><div class="' + e + '-iconLeft"><button type="button"></button></div><div class="' + e + '-iconRight"><button type="button"></button></div><div class="' + e + '-label"><span></span><select class="' + e + '-month"></select></div><div class="' + e + '-label"><span></span><select class="' + e + '-year"></select></div></div><div class="' + e + '-buttons"><a class="' + e + '-clear"></a><a class="' + e + '-today"></a></div><div class="' + e + '-calendar"></div></div><div class="' + e + '-time"><div class="' + e + '-hours"></div><div class="' + e + '-minutes"></div><div class="' + e + '-seconds"></div></div><div class="' + e + '-error"></div></div>');
        this.dom = {
            container: s,
            date: s.find("." + e + "-date"),
            title: s.find("." + e + "-title"),
            calendar: s.find("." + e + "-calendar"),
            time: s.find("." + e + "-time"),
            error: s.find("." + e + "-error"),
            buttons: s.find("." + e + "-buttons"),
            clear: s.find("." + e + "-clear"),
            today: s.find("." + e + "-today"),
            previous: s.find("." + e + "-iconLeft"),
            next: s.find("." + e + "-iconRight"),
            input: g(t)
        },
            this.s = {
                d: null,
                display: null,
                minutesRange: null,
                secondsRange: null,
                namespace: "dateime-" + a._instance++,
                parts: {
                    date: null !== this.c.format.match(/[YMD]|L(?!T)|l/),
                    time: null !== this.c.format.match(/[Hhm]|LT|LTS/),
                    seconds: -1 !== this.c.format.indexOf("s"),
                    hours12: null !== this.c.format.match(/[haA]/)
                }
            },
            this.dom.container.append(this.dom.date).append(this.dom.time).append(this.dom.error),
            this.dom.date.append(this.dom.title).append(this.dom.buttons).append(this.dom.calendar),
            this.dom.input.addClass("dt-datetime"),
            this._constructor()
    }
    var r;
    return g.extend(a.prototype, {
        destroy: function() {
            this._hide(!0),
                this.dom.container.off().empty(),
                this.dom.input.removeClass("dt-datetime").removeAttr("autocomplete").off(".datetime")
        },
        display: function(t, e) {
            return t !== n && this.s.display.setUTCFullYear(t), e !== n && this.s.display.setUTCMonth(e - 1), t !== n || e !== n ? (this._setTitle(), this._setCalander(), this) : {
                month: this.s.display.getUTCMonth() + 1,
                year: this.s.display.getUTCFullYear()
            }
        },
        errorMsg: function(t) {
            var e = this.dom.error;
            return t ? e.html(t) : e.empty(), this
        },
        hide: function() {
            return this._hide(), this
        },
        max: function(t) {
            return this.c.maxDate = "string" == typeof t ? new Date(t) : t, this._optionsTitle(), this._setCalander(), this
        },
        min: function(t) {
            return this.c.minDate = "string" == typeof t ? new Date(t) : t, this._optionsTitle(), this._setCalander(), this
        },
        owns: function(t) {
            return 0 < g(t).parents().filter(this.dom.container).length
        },
        val: function(t, e) {
            return t === n ? this.s.d : (t instanceof Date ? this.s.d = this._dateToUtc(t) : null === t || "" === t ? this.s.d = null : "--now" === t ? this.s.d = this._dateToUtc(new Date) : "string" == typeof t && (this.s.d = this._dateToUtc(this._convert(t, this.c.format, null))), !e && e !== n || (this.s.d ? this._writeOutput() : this.dom.input.val(t)), this.s.display = this.s.d ? new Date(this.s.d.toString()) : new Date, this.s.display.setUTCDate(1), this._setTitle(), this._setCalander(), this._setTime(), this)
        },
        valFormat: function(t, e) {
            return e ? (this.val(this._convert(e, t, null)), this) : this._convert(this.val(), null, t)
        },
        _constructor: function() {
            function a() {
                var t = o.dom.input.val();
                t !== e && (o.c.onChange.call(o, t, o.s.d, o.dom.input), e = t)
            }
            var o = this,
                r = this.c.classPrefix,
                e = this.dom.input.val();
            this.s.parts.date || this.dom.date.css("display", "none"),
            this.s.parts.time || this.dom.time.css("display", "none"),
            this.s.parts.seconds || (this.dom.time.children("div." + r + "-seconds").remove(), this.dom.time.children("span").eq(1).remove()),
            this.c.buttons.clear || this.dom.clear.css("display", "none"),
            this.c.buttons.today || this.dom.today.css("display", "none"),
                this._optionsTitle(),
                g(i).on("i18n.dt", function(t, e) {
                    e.oLanguage.datetime && (g.extend(!0, o.c.i18n, e.oLanguage.datetime), o._optionsTitle())
                }),
            "hidden" === this.dom.input.attr("type") && (this.dom.container.addClass("inline"), this.c.attachTo = "input", this.val(this.dom.input.val(), !1), this._show()),
            e && this.val(e, !1),
                this.dom.input.attr("autocomplete", "off").on("focus.datetime click.datetime", function() {
                    o.dom.container.is(":visible") || o.dom.input.is(":disabled") || (o.val(o.dom.input.val(), !1), o._show())
                }).on("keyup.datetime", function() {
                    o.dom.container.is(":visible") && o.val(o.dom.input.val(), !1)
                }),
                this.dom.container[0].addEventListener("focusin", function(t) {
                    t.stopPropagation()
                }),
                this.dom.container.on("change", "select", function() {
                    var t,
                        e,
                        s = g(this),
                        i = s.val();
                    s.hasClass(r + "-month") ? (o._correctMonth(o.s.display, i), o._setTitle(), o._setCalander()) : s.hasClass(r + "-year") ? (o.s.display.setUTCFullYear(i), o._setTitle(), o._setCalander()) : s.hasClass(r + "-hours") || s.hasClass(r + "-ampm") ? (o.s.parts.hours12 ? (t = +g(o.dom.container).find("." + r + "-hours").val(), e = "pm" === g(o.dom.container).find("." + r + "-ampm").val(), o.s.d.setUTCHours(12 != t || e ? e && 12 != t ? 12 + t : t : 0)) : o.s.d.setUTCHours(i), o._setTime(), o._writeOutput(!0), a()) : s.hasClass(r + "-minutes") ? (o.s.d.setUTCMinutes(i), o._setTime(), o._writeOutput(!0), a()) : s.hasClass(r + "-seconds") && (o.s.d.setSeconds(i), o._setTime(), o._writeOutput(!0), a()),
                        o.dom.input.focus(),
                        o._position()
                }).on("click", function(t) {
                    var e = o.s.d,
                        s = "span" === t.target.nodeName.toLowerCase() ? t.target.parentNode : t.target,
                        i = s.nodeName.toLowerCase();
                    if ("select" !== i)
                        if (t.stopPropagation(), "a" === i && (t.preventDefault(), g(s).hasClass(r + "-clear") ? (o.s.d = null, o.dom.input.val(""), o._writeOutput(), o._setCalander(), o._setTime(), a()) : g(s).hasClass(r + "-today") && (o.s.display = new Date, o._setTitle(), o._setCalander())), "button" === i) {
                            t = g(s),
                                i = t.parent();
                            if (i.hasClass("disabled") && !i.hasClass("range"))
                                t.blur();
                            else if (i.hasClass(r + "-iconLeft"))
                                o.s.display.setUTCMonth(o.s.display.getUTCMonth() - 1),
                                    o._setTitle(),
                                    o._setCalander(),
                                    o.dom.input.focus();
                            else if (i.hasClass(r + "-iconRight"))
                                o._correctMonth(o.s.display, o.s.display.getUTCMonth() + 1),
                                    o._setTitle(),
                                    o._setCalander(),
                                    o.dom.input.focus();
                            else {
                                if (t.parents("." + r + "-time").length) {
                                    var s = t.data("value"),
                                        n = t.data("unit"),
                                        e = o._needValue();
                                    if ("minutes" === n) {
                                        if (i.hasClass("disabled") && i.hasClass("range"))
                                            return o.s.minutesRange = s, void o._setTime();
                                        o.s.minutesRange = null
                                    }
                                    if ("seconds" === n) {
                                        if (i.hasClass("disabled") && i.hasClass("range"))
                                            return o.s.secondsRange = s, void o._setTime();
                                        o.s.secondsRange = null
                                    }
                                    if ("am" === s) {
                                        if (!(12 <= e.getUTCHours()))
                                            return;
                                        s = e.getUTCHours() - 12
                                    } else if ("pm" === s) {
                                        if (!(e.getUTCHours() < 12))
                                            return;
                                        s = e.getUTCHours() + 12
                                    }
                                    e["hours" === n ? "setUTCHours" : "minutes" === n ? "setUTCMinutes" : "setSeconds"](s),
                                        o._setCalander(),
                                        o._setTime(),
                                        o._writeOutput(!0)
                                } else
                                    (e = o._needValue()).setUTCDate(1),
                                        e.setUTCFullYear(t.data("year")),
                                        e.setUTCMonth(t.data("month")),
                                        e.setUTCDate(t.data("day")),
                                        o._writeOutput(!0),
                                        o.s.parts.time ? (o._setCalander(), o._setTime()) : setTimeout(function() {
                                            o._hide()
                                        }, 10);
                                a()
                            }
                        } else
                            o.dom.input.focus()
                })
        },
        _compareDates: function(t, e) {
            return this._isLuxon() ? r.DateTime.fromJSDate(t).toUTC().toISODate() === r.DateTime.fromJSDate(e).toUTC().toISODate() : this._dateToUtcString(t) === this._dateToUtcString(e)
        },
        _convert: function(t, e, s) {
            var i;
            return t && (r ? this._isLuxon() ? (i = t instanceof Date ? r.DateTime.fromJSDate(t).toUTC() : r.DateTime.fromFormat(t, e)).isValid ? s ? i.toFormat(s) : i.toJSDate() : null : (i = t instanceof Date ? r.utc(t, n, this.c.locale, this.c.strict) : r(t, e, this.c.locale, this.c.strict)).isValid() ? s ? i.format(s) : i.toDate() : null : !e && !s || e && s ? t : e ? (i = t.match(/(\d{4})\-(\d{2})\-(\d{2})/)) ? new Date(i[1], i[2] - 1, i[3]) : null : t.getUTCFullYear() + "-" + this._pad(t.getUTCMonth() + 1) + "-" + this._pad(t.getUTCDate()))
        },
        _correctMonth: function(t, e) {
            var s = this._daysInMonth(t.getUTCFullYear(), e),
                i = t.getUTCDate() > s;
            t.setUTCMonth(e),
            i && (t.setUTCDate(s), t.setUTCMonth(e))
        },
        _daysInMonth: function(t, e) {
            return [31, t % 4 == 0 && (t % 100 != 0 || t % 400 == 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
        },
        _dateToUtc: function(t) {
            return t && new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds()))
        },
        _dateToUtcString: function(t) {
            return this._isLuxon() ? r.DateTime.fromJSDate(t).toUTC().toISODate() : t.getUTCFullYear() + "-" + this._pad(t.getUTCMonth() + 1) + "-" + this._pad(t.getUTCDate())
        },
        _hide: function(t) {
            !t && "hidden" === this.dom.input.attr("type") || (t = this.s.namespace, this.dom.container.detach(), g(o).off("." + t), g(i).off("keydown." + t), g("div.dataTables_scrollBody").off("scroll." + t), g("div.DTE_Body_Content").off("scroll." + t), g("body").off("click." + t), g(this.dom.input[0].offsetParent).off("." + t))
        },
        _hours24To12: function(t) {
            return 0 === t ? 12 : 12 < t ? t - 12 : t
        },
        _htmlDay: function(t) {
            var e,
                s;
            return t.empty ? '<td class="empty"></td>' : (e = ["selectable"], s = this.c.classPrefix, t.disabled && e.push("disabled"), t.today && e.push("now"), t.selected && e.push("selected"), '<td data-day="' + t.day + '" class="' + e.join(" ") + '"><button class="' + s + "-button " + s + '-day" type="button" data-year="' + t.year + '" data-month="' + t.month + '" data-day="' + t.day + '"><span>' + t.day + "</span></button></td>")
        },
        _htmlMonth: function(t, e) {
            for (var s = this._dateToUtc(new Date), i = this._daysInMonth(t, e), n = new Date(Date.UTC(t, e, 1)).getUTCDay(), a = [], o = [], r = (0 < this.c.firstDay && (n -= this.c.firstDay) < 0 && (n += 7), i + n), d = r; 7 < d;)
                d -= 7;
            r += 7 - d;
            var l = this.c.minDate,
                h = this.c.maxDate;
            l && (l.setUTCHours(0), l.setUTCMinutes(0), l.setSeconds(0)),
            h && (h.setUTCHours(23), h.setUTCMinutes(59), h.setSeconds(59));
            for (var u = 0, c = 0; u < r; u++) {
                var m = new Date(Date.UTC(t, e, u - n + 1)),
                    f = !!this.s.d && this._compareDates(m, this.s.d),
                    p = this._compareDates(m, s),
                    y = u < n || i + n <= u,
                    T = l && m < l || h && h < m,
                    _ = this.c.disableDays,
                    f = {
                        day: u - n + 1,
                        month: e,
                        year: t,
                        selected: f,
                        today: p,
                        disabled: T = Array.isArray(_) && -1 !== g.inArray(m.getUTCDay(), _) || "function" == typeof _ && !0 === _(m) ? !0 : T,
                        empty: y
                    };
                o.push(this._htmlDay(f)),
                7 == ++c && (this.c.showWeekNumber && o.unshift(this._htmlWeekOfYear(u - n, e, t)), a.push("<tr>" + o.join("") + "</tr>"), o = [], c = 0)
            }
            var v,
                D = this.c.classPrefix,
                C = D + "-table";
            return this.c.showWeekNumber && (C += " weekNumber"), l && (v = l >= new Date(Date.UTC(t, e, 1, 0, 0, 0)), this.dom.title.find("div." + D + "-iconLeft").css("display", v ? "none" : "block")), h && (v = h < new Date(Date.UTC(t, e + 1, 1, 0, 0, 0)), this.dom.title.find("div." + D + "-iconRight").css("display", v ? "none" : "block")), '<table class="' + C + '"><thead>' + this._htmlMonthHead() + "</thead><tbody>" + a.join("") + "</tbody></table>"
        },
        _htmlMonthHead: function() {
            var t = [],
                e = this.c.firstDay,
                s = this.c.i18n;
            this.c.showWeekNumber && t.push("<th></th>");
            for (var i = 0; i < 7; i++)
                t.push("<th>" + function(t) {
                    for (t += e; 7 <= t;)
                        t -= 7;
                    return s.weekdays[t]
                }(i) + "</th>");
            return t.join("")
        },
        _htmlWeekOfYear: function(t, e, s) {
            e = new Date(s, e, t, 0, 0, 0, 0),
                e.setDate(e.getDate() + 4 - (e.getDay() || 7)),
                t = new Date(s, 0, 1),
                s = Math.ceil(((e - t) / 864e5 + 1) / 7);
            return '<td class="' + this.c.classPrefix + '-week">' + s + "</td>"
        },
        _isLuxon: function() {
            return !!(r && r.DateTime && r.Duration && r.Settings)
        },
        _needValue: function() {
            return this.s.d || (this.s.d = this._dateToUtc(new Date), this.s.parts.time) || (this.s.d.setUTCHours(0), this.s.d.setUTCMinutes(0), this.s.d.setSeconds(0), this.s.d.setMilliseconds(0)), this.s.d
        },
        _options: function(t, e, s) {
            s = s || e;
            var i = this.dom.container.find("select." + this.c.classPrefix + "-" + t);
            i.empty();
            for (var n = 0, a = e.length; n < a; n++)
                i.append('<option value="' + e[n] + '">' + s[n] + "</option>")
        },
        _optionSet: function(t, e) {
            var t = this.dom.container.find("select." + this.c.classPrefix + "-" + t),
                s = t.parent().children("span"),
                e = (t.val(e), t.find("option:selected"));
            s.html(0 !== e.length ? e.text() : this.c.i18n.unknown)
        },
        _optionsTime: function(n, a, o, r, t) {
            var e,
                d = this.c.classPrefix,
                s = this.dom.container.find("div." + d + "-" + n),
                i = 12 === a ? function(t) {
                    return t
                } : this._pad,
                l = (d = this.c.classPrefix) + "-table",
                h = this.c.i18n;
            if (s.length) {
                var u = "",
                    c = 10,
                    m = function(t, e, s) {
                        12 === a && "number" == typeof t && (12 <= o && (t += 12), 12 == t ? t = 0 : 24 == t && (t = 12));
                        var i = o === t || "am" === t && o < 12 || "pm" === t && 12 <= o ? "selected" : "";
                        return "number" == typeof t && r && -1 === g.inArray(t, r) && (i += " disabled"), s && (i += " " + s), '<td class="selectable ' + i + '"><button class="' + d + "-button " + d + '-day" type="button" data-unit="' + n + '" data-value="' + t + '"><span>' + e + "</span></button></td>"
                    };
                if (12 === a) {
                    for (u += "<tr>", e = 1; e <= 6; e++)
                        u += m(e, i(e));
                    for (u = (u += m("am", h.amPm[0])) + "</tr>" + "<tr>", e = 7; e <= 12; e++)
                        u += m(e, i(e));
                    u = u + m("pm", h.amPm[1]) + "</tr>",
                        c = 7
                } else {
                    if (24 === a)
                        for (var f = 0, p = 0; p < 4; p++) {
                            for (u += "<tr>", e = 0; e < 6; e++)
                                u += m(f, i(f)),
                                    f++;
                            u += "</tr>"
                        }
                    else {
                        for (u += "<tr>", p = 0; p < 60; p += 10)
                            u += m(p, i(p), "range");
                        var u = u + "</tr>" + ('</tbody></thead><table class="' + l + " " + l + '-nospace"><tbody>'),
                            y = null !== t ? t : -1 === o ? 0 : 10 * Math.floor(o / 10);
                        for (u += "<tr>", p = y + 1; p < y + 10; p++)
                            u += m(p, i(p));
                        u += "</tr>"
                    }
                    c = 6
                }
                s.empty().append('<table class="' + l + '"><thead><tr><th colspan="' + c + '">' + h[n] + "</th></tr></thead><tbody>" + u + "</tbody></table>")
            }
        },
        _optionsTitle: function() {
            var t = this.c.i18n,
                e = this.c.minDate,
                s = this.c.maxDate,
                e = e ? e.getFullYear() : null,
                s = s ? s.getFullYear() : null,
                e = null !== e ? e : (new Date).getFullYear() - this.c.yearRange,
                s = null !== s ? s : (new Date).getFullYear() + this.c.yearRange;
            this._options("month", this._range(0, 11), t.months),
                this._options("year", this._range(e, s)),
                this.dom.today.text(t.today).text(t.today),
                this.dom.clear.text(t.clear).text(t.clear),
                this.dom.previous.attr("title", t.previous).children("button").text(t.previous),
                this.dom.next.attr("title", t.next).children("button").text(t.next)
        },
        _pad: function(t) {
            return t < 10 ? "0" + t : t
        },
        _position: function() {
            var t,
                e,
                s,
                i = "input" === this.c.attachTo ? this.dom.input.position() : this.dom.input.offset(),
                n = this.dom.container,
                a = this.dom.input.outerHeight();
            n.hasClass("inline") ? n.insertAfter(this.dom.input) : (this.s.parts.date && this.s.parts.time && 550 < g(o).width() ? n.addClass("horizontal") : n.removeClass("horizontal"), "input" === this.c.attachTo ? n.css({
                top: i.top + a,
                left: i.left
            }).insertAfter(this.dom.input) : n.css({
                top: i.top + a,
                left: i.left
            }).appendTo("body"), t = n.outerHeight(), e = n.outerWidth(), s = g(o).scrollTop(), i.top + a + t - s > g(o).height() && (a = i.top - t, n.css("top", a < 0 ? 0 : a)), e + i.left > g(o).width() && (s = g(o).width() - e, "input" === this.c.attachTo && (s -= g(n).offsetParent().offset().left), n.css("left", s < 0 ? 0 : s)))
        },
        _range: function(t, e, s) {
            var i = [];
            s = s || 1;
            for (var n = t; n <= e; n += s)
                i.push(n);
            return i
        },
        _setCalander: function() {
            this.s.display && this.dom.calendar.empty().append(this._htmlMonth(this.s.display.getUTCFullYear(), this.s.display.getUTCMonth()))
        },
        _setTitle: function() {
            this._optionSet("month", this.s.display.getUTCMonth()),
                this._optionSet("year", this.s.display.getUTCFullYear())
        },
        _setTime: function() {
            function t(t) {
                return e.c[t + "Available"] || e._range(0, 59, e.c[t + "Increment"])
            }
            var e = this,
                s = this.s.d,
                i = null,
                n = null != (i = this._isLuxon() ? r.DateTime.fromJSDate(s).toUTC() : i) ? i.hour : s ? s.getUTCHours() : -1;
            this._optionsTime("hours", this.s.parts.hours12 ? 12 : 24, n, this.c.hoursAvailable),
                this._optionsTime("minutes", 60, null != i ? i.minute : s ? s.getUTCMinutes() : -1, t("minutes"), this.s.minutesRange),
                this._optionsTime("seconds", 60, null != i ? i.second : s ? s.getSeconds() : -1, t("seconds"), this.s.secondsRange)
        },
        _show: function() {
            var e = this,
                t = this.s.namespace,
                s = (this._position(), g(o).on("scroll." + t + " resize." + t, function() {
                    e._position()
                }), g("div.DTE_Body_Content").on("scroll." + t, function() {
                    e._position()
                }), g("div.dataTables_scrollBody").on("scroll." + t, function() {
                    e._position()
                }), this.dom.input[0].offsetParent);
            s !== i.body && g(s).on("scroll." + t, function() {
                e._position()
            }),
                g(i).on("keydown." + t, function(t) {
                    9 !== t.keyCode && 27 !== t.keyCode && 13 !== t.keyCode || e._hide()
                }),
                setTimeout(function() {
                    g("body").on("click." + t, function(t) {
                        g(t.target).parents().filter(e.dom.container).length || t.target === e.dom.input[0] || e._hide()
                    })
                }, 10)
        },
        _writeOutput: function(t) {
            var e = this.s.d,
                s = "",
                i = this.dom.input,
                e = (e && (s = this._convert(e, null, this.c.format)), i.val(s), new Event("change", {
                    bubbles: !0
                }));
            i[0].dispatchEvent(e),
            "hidden" === i.attr("type") && this.val(s, !1),
            t && i.focus()
        }
    }), a.use = function(t) {
        r = t
    }, a._instance = 0, a.type = "DateTime", a.defaults = {
        attachTo: "body",
        buttons: {
            clear: !1,
            today: !1
        },
        classPrefix: "dt-datetime",
        disableDays: null,
        firstDay: 1,
        format: "YYYY-MM-DD",
        hoursAvailable: null,
        i18n: {
            clear: "Clear",
            previous: "Previous",
            next: "Next",
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            amPm: ["am", "pm"],
            hours: "Hour",
            minutes: "Minute",
            seconds: "Second",
            unknown: "-",
            today: "Today"
        },
        maxDate: null,
        minDate: null,
        minutesAvailable: null,
        minutesIncrement: 1,
        strict: !0,
        locale: "en",
        onChange: function() {},
        secondsAvailable: null,
        secondsIncrement: 1,
        showWeekNumber: !1,
        yearRange: 25
    }, a.version = "1.5.1", a.factory = function(t, e) {
        var s = !1;
        return t && t.document && (i = (o = t).document), e && e.fn && e.fn.jquery && (g = e, s = !0), s
    }, o.DateTime || (o.DateTime = a), o.DataTable && (o.DataTable.DateTime = a), g.fn.dtDateTime = function(t) {
        return this.each(function() {
            new a(this, t)
        })
    }, g.fn.dataTable && (g.fn.dataTable.DateTime = a, g.fn.DataTable.DateTime = a, g.fn.dataTable.Editor) && (g.fn.dataTable.Editor.DateTime = a), a
});

/*! FixedColumns 4.3.0
 * © SpryMedia Ltd - datatables.net/license
 */
!function(e) {
    var i,
        o;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return e(t, window, document)
    }) : "object" == typeof exports ? (i = require("jquery"), o = function(t, s) {
        s.fn.dataTable || require("datatables.net")(t, s)
    }, "undefined" == typeof window ? module.exports = function(t, s) {
        return t = t || window, s = s || i(t), o(t, s), e(s, 0, t.document)
    } : (o(window, i), module.exports = e(i, window, window.document))) : e(jQuery, window, document)
}(function(o, t, s, F) {
    "use strict";
    var A,
        i,
        e,
        l,
        d = o.fn.dataTable;
    function r(t, s) {
        var e = this;
        if (i && i.versionCheck && i.versionCheck("1.10.0"))
            return t = new i.Api(t), this.classes = A.extend(!0, {}, r.classes), this.c = A.extend(!0, {}, r.defaults, s), s && s.left !== F || this.c.leftColumns === F || (this.c.left = this.c.leftColumns), s && s.right !== F || this.c.rightColumns === F || (this.c.right = this.c.rightColumns), this.s = {
                barWidth: 0,
                dt: t,
                rtl: "rtl" === A("body").css("direction")
            }, s = {
                bottom: "0px",
                display: "block",
                position: "absolute",
                width: this.s.barWidth + 1 + "px"
            }, this.dom = {
                leftBottomBlocker: A("<div>").css(s).css("left", 0).addClass(this.classes.leftBottomBlocker),
                leftTopBlocker: A("<div>").css(s).css({
                    left: 0,
                    top: 0
                }).addClass(this.classes.leftTopBlocker),
                rightBottomBlocker: A("<div>").css(s).css("right", 0).addClass(this.classes.rightBottomBlocker),
                rightTopBlocker: A("<div>").css(s).css({
                    right: 0,
                    top: 0
                }).addClass(this.classes.rightTopBlocker)
            }, this.s.dt.settings()[0]._bInitComplete ? (this._addStyles(), this._setKeyTableListener()) : t.one("init.dt.dtfc", function() {
                e._addStyles(),
                    e._setKeyTableListener()
            }), t.on("column-sizing.dt.dtfc", function() {
                return e._addStyles()
            }), t.settings()[0]._fixedColumns = this, t.on("destroy", function() {
                return e._destroy()
            }), this;
        throw new Error("FixedColumns requires DataTables 1.10 or newer")
    }
    function h(t, s) {
        void 0 === s && (s = null);
        t = new d.Api(t),
            s = s || t.init().fixedColumns || d.defaults.fixedColumns;
        new e(t, s)
    }
    return r.prototype.left = function(t) {
        return t !== F ? (0 <= t && t <= this.s.dt.columns().count() && (this.c.left = t, this._addStyles()), this) : this.c.left
    }, r.prototype.right = function(t) {
        return t !== F ? (0 <= t && t <= this.s.dt.columns().count() && (this.c.right = t, this._addStyles()), this) : this.c.right
    }, r.prototype._addStyles = function() {
        this.s.dt.settings()[0].oScroll.sY && (s = A(this.s.dt.table().node()).closest("div.dataTables_scrollBody")[0], e = this.s.dt.settings()[0].oBrowser.barWidth, s.offsetWidth - s.clientWidth >= e ? this.s.barWidth = e : this.s.barWidth = 0, this.dom.rightTopBlocker.css("width", this.s.barWidth + 1), this.dom.leftTopBlocker.css("width", this.s.barWidth + 1), this.dom.rightBottomBlocker.css("width", this.s.barWidth + 1), this.dom.leftBottomBlocker.css("width", this.s.barWidth + 1));
        for (var t = null, s = this.s.dt.column(0).header(), e = null, i = (null !== s && (e = (s = A(s)).outerHeight() + 1, t = A(s.closest("div.dataTables_scroll")).css("position", "relative")), this.s.dt.column(0).footer()), o = null, l = (null !== i && (o = (i = A(i)).outerHeight(), null === t) && (t = A(i.closest("div.dataTables_scroll")).css("position", "relative")), this.s.dt.columns().data().toArray().length), d = 0, r = 0, h = A(this.s.dt.table().node()).children("tbody").children("tr"), n = 0, a = new Map, c = 0; c < l; c++) {
            var f = this.s.dt.column(c);
            if (0 < c && a.set(c - 1, n), f.visible()) {
                var u = A(f.header()),
                    m = A(f.footer());
                if (c - n < this.c.left) {
                    if (A(this.s.dt.table().node()).addClass(this.classes.tableFixedLeft), t.addClass(this.classes.tableFixedLeft), 0 < c - n)
                        for (var g = c; g + 1 < l;) {
                            if ((S = this.s.dt.column(g - 1, {
                                page: "current"
                            })).visible()) {
                                d += A(S.nodes()[0]).outerWidth(),
                                    r += S.header() || S.footer() ? A(S.header()).outerWidth() : 0;
                                break
                            }
                            g--
                        }
                    for (var C = 0, p = h; C < p.length; C++) {
                        var x = p[C];
                        A(A(x).children()[c - n]).css(this._getCellCSS(!1, d, "left")).addClass(this.classes.fixedLeft)
                    }
                    u.css(this._getCellCSS(!0, r, "left")).addClass(this.classes.fixedLeft),
                        m.css(this._getCellCSS(!0, r, "left")).addClass(this.classes.fixedLeft)
                } else {
                    for (var b = 0, v = h; b < v.length; b++) {
                        x = v[b];
                        (R = A(A(x).children()[c - n])).hasClass(this.classes.fixedLeft) && R.css(this._clearCellCSS("left")).removeClass(this.classes.fixedLeft)
                    }
                    u.hasClass(this.classes.fixedLeft) && u.css(this._clearCellCSS("left")).removeClass(this.classes.fixedLeft),
                    m.hasClass(this.classes.fixedLeft) && m.css(this._clearCellCSS("left")).removeClass(this.classes.fixedLeft)
                }
            } else
                n++
        }
        for (var B = 0, k = 0, y = 0, c = l - 1; 0 <= c; c--)
            if ((f = this.s.dt.column(c)).visible()) {
                var u = A(f.header()),
                    m = A(f.footer()),
                    _ = a.get(c);
                if (_ === F && (_ = n), c + y >= l - this.c.right) {
                    if (A(this.s.dt.table().node()).addClass(this.classes.tableFixedRight), t.addClass(this.classes.tableFixedRight), c + 1 + y < l)
                        for (var S, g = c; g + 1 < l;) {
                            if ((S = this.s.dt.column(g + 1, {
                                page: "current"
                            })).visible()) {
                                B += A(S.nodes()[0]).outerWidth(),
                                    k += S.header() || S.footer() ? A(S.header()).outerWidth() : 0;
                                break
                            }
                            g++
                        }
                    for (var w = 0, T = h; w < T.length; w++) {
                        x = T[w];
                        A(A(x).children()[c - _]).css(this._getCellCSS(!1, B, "right")).addClass(this.classes.fixedRight)
                    }
                    u.css(this._getCellCSS(!0, k, "right")).addClass(this.classes.fixedRight),
                        m.css(this._getCellCSS(!0, k, "right")).addClass(this.classes.fixedRight)
                } else {
                    for (var L = 0, W = h; L < W.length; L++) {
                        var R,
                            x = W[L];
                        (R = A(A(x).children()[c - _])).hasClass(this.classes.fixedRight) && R.css(this._clearCellCSS("right")).removeClass(this.classes.fixedRight)
                    }
                    u.hasClass(this.classes.fixedRight) && u.css(this._clearCellCSS("right")).removeClass(this.classes.fixedRight),
                    m.hasClass(this.classes.fixedRight) && m.css(this._clearCellCSS("right")).removeClass(this.classes.fixedRight)
                }
            } else
                y++;
        s && (this.s.rtl ? (this.dom.leftTopBlocker.outerHeight(e), t.append(this.dom.leftTopBlocker)) : (this.dom.rightTopBlocker.outerHeight(e), t.append(this.dom.rightTopBlocker))),
        i && (this.s.rtl ? (this.dom.leftBottomBlocker.outerHeight(o), t.append(this.dom.leftBottomBlocker)) : (this.dom.rightBottomBlocker.outerHeight(o), t.append(this.dom.rightBottomBlocker)))
    }, r.prototype._destroy = function() {
        this.s.dt.off(".dtfc"),
            this.dom.leftBottomBlocker.remove(),
            this.dom.leftTopBlocker.remove(),
            this.dom.rightBottomBlocker.remove(),
            this.dom.rightTopBlocker.remove()
    }, r.prototype._getCellCSS = function(t, s, e) {
        return "left" === e ? this.s.rtl ? {
            position: "sticky",
            right: s + "px"
        } : {
            left: s + "px",
            position: "sticky"
        } : this.s.rtl ? {
            left: s + (t ? this.s.barWidth : 0) + "px",
            position: "sticky"
        } : {
            position: "sticky",
            right: s + (t ? this.s.barWidth : 0) + "px"
        }
    }, r.prototype._clearCellCSS = function(t) {
        return "left" === t ? this.s.rtl ? {
            position: "",
            right: ""
        } : {
            left: "",
            position: ""
        } : this.s.rtl ? {
            left: "",
            position: ""
        } : {
            position: "",
            right: ""
        }
    }, r.prototype._setKeyTableListener = function() {
        var h = this;
        this.s.dt.on("key-focus.dt.dtfc", function(t, s, e) {
            var i,
                o,
                l,
                d = A(e.node()).offset(),
                r = A(A(h.s.dt.table().node()).closest("div.dataTables_scrollBody"));
            0 < h.c.left && (i = (o = A(h.s.dt.column(h.c.left - 1).header())).offset(), o = o.outerWidth(), d.left < i.left + o) && (l = r.scrollLeft(), r.scrollLeft(l - (i.left + o - d.left))),
            0 < h.c.right && (i = h.s.dt.columns().data().toArray().length, o = A(e.node()).outerWidth(), e = A(h.s.dt.column(i - h.c.right).header()).offset(), d.left + o > e.left) && (l = r.scrollLeft(), r.scrollLeft(l - (e.left - (d.left + o))))
        }),
            this.s.dt.on("draw.dt.dtfc", function() {
                h._addStyles()
            }),
            this.s.dt.on("column-reorder.dt.dtfc", function() {
                h._addStyles()
            }),
            this.s.dt.on("column-visibility.dt.dtfc", function(t, s, e, i, o) {
                o && !s.bDestroying && setTimeout(function() {
                    h._addStyles()
                }, 50)
            })
    }, r.version = "4.3.0", r.classes = {
        fixedLeft: "dtfc-fixed-left",
        fixedRight: "dtfc-fixed-right",
        leftBottomBlocker: "dtfc-left-bottom-blocker",
        leftTopBlocker: "dtfc-left-top-blocker",
        rightBottomBlocker: "dtfc-right-bottom-blocker",
        rightTopBlocker: "dtfc-right-top-blocker",
        tableFixedLeft: "dtfc-has-left",
        tableFixedRight: "dtfc-has-right"
    }, r.defaults = {
        i18n: {
            button: "FixedColumns"
        },
        left: 1,
        right: 0
    }, e = r, i = (A = o).fn.dataTable, o.fn.dataTable.FixedColumns = e, o.fn.DataTable.FixedColumns = e, (l = d.Api.register)("fixedColumns()", function() {
        return this
    }), l("fixedColumns().left()", function(t) {
        var s = this.context[0];
        return t !== F ? (s._fixedColumns.left(t), this) : s._fixedColumns.left()
    }), l("fixedColumns().right()", function(t) {
        var s = this.context[0];
        return t !== F ? (s._fixedColumns.right(t), this) : s._fixedColumns.right()
    }), d.ext.buttons.fixedColumns = {
        action: function(t, s, e, i) {
            o(e).attr("active") ? (o(e).removeAttr("active").removeClass("active"), s.fixedColumns().left(0), s.fixedColumns().right(0)) : (o(e).attr("active", "true").addClass("active"), s.fixedColumns().left(i.config.left), s.fixedColumns().right(i.config.right))
        },
        config: {
            left: 1,
            right: 0
        },
        init: function(t, s, e) {
            t.settings()[0]._fixedColumns === F && h(t.settings(), e),
                o(s).attr("active", "true").addClass("active"),
                t.button(s).text(e.text || t.i18n("buttons.fixedColumns", t.settings()[0]._fixedColumns.c.i18n.button))
        },
        text: null
    }, o(s).on("plugin-init.dt", function(t, s) {
        "dt" !== t.namespace || !s.oInit.fixedColumns && !d.defaults.fixedColumns || s._fixedColumns || h(s, null)
    }), d
});

/*! Bootstrap 5 integration for DataTables' FixedColumns
 * © SpryMedia Ltd - datatables.net/license
 */
!function(t) {
    var d,
        o;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs5", "datatables.net-fixedcolumns"], function(e) {
        return t(e, window, document)
    }) : "object" == typeof exports ? (d = require("jquery"), o = function(e, n) {
        n.fn.dataTable || require("datatables.net-bs5")(e, n),
        n.fn.dataTable.FixedColumns || require("datatables.net-fixedcolumns")(e, n)
    }, "undefined" == typeof window ? module.exports = function(e, n) {
        return e = e || window, n = n || d(e), o(e, n), t(n, 0, e.document)
    } : (o(window, d), module.exports = t(d, window, window.document))) : t(jQuery, window, document)
}(function(e, n, t, d) {
    "use strict";
    return e.fn.dataTable
});

/*! FixedHeader 3.4.0
 * © SpryMedia Ltd - datatables.net/license
 */
!function(o) {
    var i,
        s;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return o(t, window, document)
    }) : "object" == typeof exports ? (i = require("jquery"), s = function(t, e) {
        e.fn.dataTable || require("datatables.net")(t, e)
    }, "undefined" == typeof window ? module.exports = function(t, e) {
        return t = t || window, e = e || i(t), s(t, e), o(e, t, t.document)
    } : (s(window, i), module.exports = o(i, window, window.document))) : o(jQuery, window, document)
}(function(m, H, x, v) {
    "use strict";
    function s(t, e) {
        if (!(this instanceof s))
            throw "FixedHeader must be initialised with the 'new' keyword.";
        if (!0 === e && (e = {}), t = new n.Api(t), this.c = m.extend(!0, {}, s.defaults, e), this.s = {
            dt: t,
            position: {
                theadTop: 0,
                tbodyTop: 0,
                tfootTop: 0,
                tfootBottom: 0,
                width: 0,
                left: 0,
                tfootHeight: 0,
                theadHeight: 0,
                windowHeight: m(H).height(),
                visible: !0
            },
            headerMode: null,
            footerMode: null,
            autoWidth: t.settings()[0].oFeatures.bAutoWidth,
            namespace: ".dtfc" + o++,
            scrollLeft: {
                header: -1,
                footer: -1
            },
            enable: !0,
            autoDisable: !1
        }, this.dom = {
            floatingHeader: null,
            thead: m(t.table().header()),
            tbody: m(t.table().body()),
            tfoot: m(t.table().footer()),
            header: {
                host: null,
                floating: null,
                floatingParent: m('<div class="dtfh-floatingparent">'),
                placeholder: null
            },
            footer: {
                host: null,
                floating: null,
                floatingParent: m('<div class="dtfh-floatingparent">'),
                placeholder: null
            }
        }, this.dom.header.host = this.dom.thead.parent(), this.dom.footer.host = this.dom.tfoot.parent(), (e = t.settings()[0])._fixedHeader)
            throw "FixedHeader already initialised on table " + e.nTable.id;
        (e._fixedHeader = this)._constructor()
    }
    var n = m.fn.dataTable,
        o = 0;
    return m.extend(s.prototype, {
        destroy: function() {
            var t = this.dom;
            this.s.dt.off(".dtfc"),
                m(H).off(this.s.namespace),
            t.header.rightBlocker && t.header.rightBlocker.remove(),
            t.header.leftBlocker && t.header.leftBlocker.remove(),
            t.footer.rightBlocker && t.footer.rightBlocker.remove(),
            t.footer.leftBlocker && t.footer.leftBlocker.remove(),
            this.c.header && this._modeChange("in-place", "header", !0),
            this.c.footer && t.tfoot.length && this._modeChange("in-place", "footer", !0)
        },
        enable: function(t, e, o) {
            this.s.enable = t,
                this.s.enableType = o,
            !e && e !== v || (this._positions(), this._scroll(!0))
        },
        enabled: function() {
            return this.s.enable
        },
        headerOffset: function(t) {
            return t !== v && (this.c.headerOffset = t, this.update()), this.c.headerOffset
        },
        footerOffset: function(t) {
            return t !== v && (this.c.footerOffset = t, this.update()), this.c.footerOffset
        },
        update: function(t) {
            var e = this.s.dt.table().node();
            (this.s.enable || this.s.autoDisable) && (m(e).is(":visible") ? (this.s.autoDisable = !1, this.enable(!0, !1)) : (this.s.autoDisable = !0, this.enable(!1, !1)), 0 !== m(e).children("thead").length) && (this._positions(), this._scroll(t === v || t))
        },
        _constructor: function() {
            var o = this,
                i = this.s.dt,
                t = (m(H).on("scroll" + this.s.namespace, function() {
                    o._scroll()
                }).on("resize" + this.s.namespace, n.util.throttle(function() {
                    o.s.position.windowHeight = m(H).height(),
                        o.update()
                }, 50)), m(".fh-fixedHeader")),
                t = (!this.c.headerOffset && t.length && (this.c.headerOffset = t.outerHeight()), m(".fh-fixedFooter"));
            !this.c.footerOffset && t.length && (this.c.footerOffset = t.outerHeight()),
                i.on("column-reorder.dt.dtfc column-visibility.dt.dtfc column-sizing.dt.dtfc responsive-display.dt.dtfc", function(t, e) {
                    o.update()
                }).on("draw.dt.dtfc", function(t, e) {
                    o.update(e !== i.settings()[0])
                }),
                i.on("destroy.dtfc", function() {
                    o.destroy()
                }),
                this._positions(),
                this._scroll()
        },
        _clone: function(t, e) {
            var o,
                i,
                s = this,
                n = this.s.dt,
                r = this.dom[t],
                d = "header" === t ? this.dom.thead : this.dom.tfoot;
            "footer" === t && this._scrollEnabled() || (!e && r.floating ? r.floating.removeClass("fixedHeader-floating fixedHeader-locked") : (r.floating && (null !== r.placeholder && r.placeholder.remove(), this._unsize(t), r.floating.children().detach(), r.floating.remove()), e = m(n.table().node()), o = m(e.parent()), i = this._scrollEnabled(), r.floating = m(n.table().node().cloneNode(!1)).attr("aria-hidden", "true").css({
                "table-layout": "fixed",
                top: 0,
                left: 0
            }).removeAttr("id").append(d), r.floatingParent.css({
                width: o.width(),
                overflow: "hidden",
                height: "fit-content",
                position: "fixed",
                left: i ? e.offset().left + o.scrollLeft() : 0
            }).css("header" === t ? {
                top: this.c.headerOffset,
                bottom: ""
            } : {
                top: "",
                bottom: this.c.footerOffset
            }).addClass("footer" === t ? "dtfh-floatingparentfoot" : "dtfh-floatingparenthead").append(r.floating).appendTo("body"), this._stickyPosition(r.floating, "-"), (n = function() {
                var t = o.scrollLeft();
                s.s.scrollLeft = {
                    footer: t,
                    header: t
                },
                    r.floatingParent.scrollLeft(s.s.scrollLeft.header)
            })(), o.off("scroll.dtfh").on("scroll.dtfh", n), r.placeholder = d.clone(!1), r.placeholder.find("*[id]").removeAttr("id"), r.host.prepend(r.placeholder), this._matchWidths(r.placeholder, r.floating)))
        },
        _stickyPosition: function(t, i) {
            var s,
                n;
            this._scrollEnabled() && (n = "rtl" === m((s = this).s.dt.table().node()).css("direction"), t.find("th").each(function() {
                var t,
                    e,
                    o;
                "sticky" === m(this).css("position") && (t = m(this).css("right"), e = m(this).css("left"), "auto" === t || n ? "auto" !== e && n && (o = +e.replace(/px/g, "") + ("-" === i ? -1 : 1) * s.s.dt.settings()[0].oBrowser.barWidth, m(this).css("left", 0 < o ? o : 0)) : (o = +t.replace(/px/g, "") + ("-" === i ? -1 : 1) * s.s.dt.settings()[0].oBrowser.barWidth, m(this).css("right", 0 < o ? o : 0)))
            }))
        },
        _matchWidths: function(e, o) {
            function t(t) {
                return m(t, e).map(function() {
                    return +m(this).css("width").replace(/[^\d\.]/g, "")
                }).toArray()
            }
            function i(t, e) {
                m(t, o).each(function(t) {
                    m(this).css({
                        width: e[t],
                        minWidth: e[t]
                    })
                })
            }
            var s = t("th"),
                n = t("td");
            i("th", s),
                i("td", n)
        },
        _unsize: function(t) {
            var e = this.dom[t].floating;
            e && ("footer" === t || "header" === t && !this.s.autoWidth) ? m("th, td", e).css({
                width: "",
                minWidth: ""
            }) : e && "header" === t && m("th, td", e).css("min-width", "")
        },
        _horizontal: function(t, e) {
            var o,
                i = this.dom[t],
                s = (this.s.position, this.s.scrollLeft);
            i.floating && s[t] !== e && (this._scrollEnabled() && (o = m(m(this.s.dt.table().node()).parent()).scrollLeft(), i.floating.scrollLeft(o), i.floatingParent.scrollLeft(o)), s[t] = e)
        },
        _modeChange: function(t, e, o) {
            this.s.dt;
            var i,
                s,
                n,
                r,
                d,
                a,
                h,
                f = this.dom[e],
                l = this.s.position,
                c = this._scrollEnabled();
            "footer" === e && c || (i = function(o) {
                f.floating.attr("style", function(t, e) {
                    return (e || "") + "width: " + o + "px !important;"
                }),
                c || f.floatingParent.attr("style", function(t, e) {
                    return (e || "") + "width: " + o + "px !important;"
                })
            }, r = this.dom["footer" === e ? "tfoot" : "thead"], s = m.contains(r[0], x.activeElement) ? x.activeElement : null, d = m(m(this.s.dt.table().node()).parent()), "in-place" === t ? (f.placeholder && (f.placeholder.remove(), f.placeholder = null), this._unsize(e), "header" === e ? f.host.prepend(r) : f.host.append(r), f.floating && (f.floating.remove(), f.floating = null, this._stickyPosition(f.host, "+")), f.floatingParent && f.floatingParent.remove(), m(m(f.host.parent()).parent()).scrollLeft(d.scrollLeft())) : "in" === t ? (this._clone(e, o), r = d.offset(), h = (n = m(x).scrollTop()) + m(H).height(), a = c ? r.top : l.tbodyTop, r = c ? r.top + d.outerHeight() : l.tfootTop, d = "footer" === e ? h < a ? l.tfootHeight : a + l.tfootHeight - h : n + this.c.headerOffset + l.theadHeight - r, a = "header" === e ? "top" : "bottom", h = this.c[e + "Offset"] - (0 < d ? d : 0), f.floating.addClass("fixedHeader-floating"), f.floatingParent.css(a, h).css({
                left: l.left,
                height: "header" === e ? l.theadHeight : l.tfootHeight,
                "z-index": 2
            }).append(f.floating), i(l.width), "footer" === e && f.floating.css("top", "")) : "below" === t ? (this._clone(e, o), f.floating.addClass("fixedHeader-locked"), f.floatingParent.css({
                position: "absolute",
                top: l.tfootTop - l.theadHeight,
                left: l.left + "px"
            }), i(l.width)) : "above" === t && (this._clone(e, o), f.floating.addClass("fixedHeader-locked"), f.floatingParent.css({
                position: "absolute",
                top: l.tbodyTop,
                left: l.left + "px"
            }), i(l.width)), s && s !== x.activeElement && setTimeout(function() {
                s.focus()
            }, 10), this.s.scrollLeft.header = -1, this.s.scrollLeft.footer = -1, this.s[e + "Mode"] = t)
        },
        _positions: function() {
            var t = this.s.dt,
                e = t.table(),
                o = this.s.position,
                i = this.dom,
                e = m(e.node()),
                s = this._scrollEnabled(),
                n = m(t.table().header()),
                t = m(t.table().footer()),
                i = i.tbody,
                r = e.parent();
            o.visible = e.is(":visible"),
                o.width = e.outerWidth(),
                o.left = e.offset().left,
                o.theadTop = n.offset().top,
                o.tbodyTop = (s ? r : i).offset().top,
                o.tbodyHeight = (s ? r : i).outerHeight(),
                o.theadHeight = n.outerHeight(),
                o.theadBottom = o.theadTop + o.theadHeight,
                t.length ? (o.tfootTop = o.tbodyTop + o.tbodyHeight, o.tfootBottom = o.tfootTop + t.outerHeight(), o.tfootHeight = t.outerHeight()) : (o.tfootTop = o.tbodyTop + i.outerHeight(), o.tfootBottom = o.tfootTop, o.tfootHeight = o.tfootTop)
        },
        _scroll: function(t) {
            var e,
                o,
                i,
                s,
                n,
                r,
                d,
                a,
                h,
                f,
                l,
                c,
                u,
                p,
                g,
                b;
            this.s.dt.settings()[0].bDestroying || (e = this._scrollEnabled(), o = (f = m(this.s.dt.table().node()).parent()).offset(), c = f.outerHeight(), i = m(x).scrollLeft(), s = m(x).scrollTop(), a = (l = m(H).height()) + s, u = this.s.position, b = e ? o.top : u.tbodyTop, r = (e ? o : u).left, c = e ? o.top + c : u.tfootTop, d = e ? f.outerWidth() : u.tbodyWidth, a = s + l, this.c.header && (!this.s.enable || !u.visible || s + this.c.headerOffset + u.theadHeight <= b ? h = "in-place" : s + this.c.headerOffset + u.theadHeight > b && s + this.c.headerOffset + u.theadHeight < c ? (h = "in", f = m(m(this.s.dt.table().node()).parent()), s + this.c.headerOffset + u.theadHeight > c || this.dom.header.floatingParent === v ? t = !0 : this.dom.header.floatingParent.css({
                top: this.c.headerOffset,
                position: "fixed"
            }).append(this.dom.header.floating)) : h = "below", !t && h === this.s.headerMode || this._modeChange(h, "header", t), this._horizontal("header", i)), p = {
                offset: {
                    top: 0,
                    left: 0
                },
                height: 0
            }, g = {
                offset: {
                    top: 0,
                    left: 0
                },
                height: 0
            }, this.c.footer && this.dom.tfoot.length && (!this.s.enable || !u.visible || u.tfootBottom + this.c.footerOffset <= a ? n = "in-place" : c + u.tfootHeight + this.c.footerOffset > a && b + this.c.footerOffset < a ? (n = "in", t = !0) : n = "above", !t && n === this.s.footerMode || this._modeChange(n, "footer", t), this._horizontal("footer", i), l = function(t) {
                return {
                    offset: t.offset(),
                    height: t.outerHeight()
                }
            }, p = this.dom.header.floating ? l(this.dom.header.floating) : l(this.dom.thead), g = this.dom.footer.floating ? l(this.dom.footer.floating) : l(this.dom.tfoot), e) && g.offset.top > s && (u = a + ((c = s - o.top) > -p.height ? c : 0) - (p.offset.top + (c < -p.height ? p.height : 0) + g.height), f.outerHeight(u = u < 0 ? 0 : u), Math.round(f.outerHeight()) >= Math.round(u) ? m(this.dom.tfoot.parent()).addClass("fixedHeader-floating") : m(this.dom.tfoot.parent()).removeClass("fixedHeader-floating")), this.dom.header.floating && this.dom.header.floatingParent.css("left", r - i), this.dom.footer.floating && this.dom.footer.floatingParent.css("left", r - i), this.s.dt.settings()[0]._fixedColumns !== v && (this.dom.header.rightBlocker = (b = function(t, e, o) {
                var i;
                return null !== (o = o === v ? 0 === (i = m("div.dtfc-" + t + "-" + e + "-blocker")).length ? null : i.clone().css("z-index", 1) : o) && ("in" === h || "below" === h ? o.appendTo("body").css({
                    top: ("top" === e ? p : g).offset.top,
                    left: "right" === t ? r + d - o.width() : r
                }) : o.detach()), o
            })("right", "top", this.dom.header.rightBlocker), this.dom.header.leftBlocker = b("left", "top", this.dom.header.leftBlocker), this.dom.footer.rightBlocker = b("right", "bottom", this.dom.footer.rightBlocker), this.dom.footer.leftBlocker = b("left", "bottom", this.dom.footer.leftBlocker)))
        },
        _scrollEnabled: function() {
            var t = this.s.dt.settings()[0].oScroll;
            return "" !== t.sY || "" !== t.sX
        }
    }), s.version = "3.4.0", s.defaults = {
        header: !0,
        footer: !1,
        headerOffset: 0,
        footerOffset: 0
    }, m.fn.dataTable.FixedHeader = s, m.fn.DataTable.FixedHeader = s, m(x).on("init.dt.dtfh", function(t, e, o) {
        var i;
        "dt" === t.namespace && (t = e.oInit.fixedHeader, i = n.defaults.fixedHeader, t || i) && !e._fixedHeader && (i = m.extend({}, i, t), !1 !== t) && new s(e, i)
    }), n.Api.register("fixedHeader()", function() {}), n.Api.register("fixedHeader.adjust()", function() {
        return this.iterator("table", function(t) {
            t = t._fixedHeader;
            t && t.update()
        })
    }), n.Api.register("fixedHeader.enable()", function(e) {
        return this.iterator("table", function(t) {
            t = t._fixedHeader;
            e = e === v || e,
            t && e !== t.enabled() && t.enable(e)
        })
    }), n.Api.register("fixedHeader.enabled()", function() {
        if (this.context.length) {
            var t = this.context[0]._fixedHeader;
            if (t)
                return t.enabled()
        }
        return !1
    }), n.Api.register("fixedHeader.disable()", function() {
        return this.iterator("table", function(t) {
            t = t._fixedHeader;
            t && t.enabled() && t.enable(!1)
        })
    }), m.each(["header", "footer"], function(t, o) {
        n.Api.register("fixedHeader." + o + "Offset()", function(e) {
            var t = this.context;
            return e === v ? t.length && t[0]._fixedHeader ? t[0]._fixedHeader[o + "Offset"]() : v : this.iterator("table", function(t) {
                t = t._fixedHeader;
                t && t[o + "Offset"](e)
            })
        })
    }), n
});

/*! Bootstrap 5 styling wrapper for FixedHeader
 * © SpryMedia Ltd - datatables.net/license
 */
!function(t) {
    var d,
        a;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs5", "datatables.net-fixedheader"], function(e) {
        return t(e, window, document)
    }) : "object" == typeof exports ? (d = require("jquery"), a = function(e, n) {
        n.fn.dataTable || require("datatables.net-bs5")(e, n),
        n.fn.dataTable.FixedHeader || require("datatables.net-fixedheader")(e, n)
    }, "undefined" == typeof window ? module.exports = function(e, n) {
        return e = e || window, n = n || d(e), a(e, n), t(n, 0, e.document)
    } : (a(window, d), module.exports = t(d, window, window.document))) : t(jQuery, window, document)
}(function(e, n, t, d) {
    "use strict";
    return e.fn.dataTable
});

/*! KeyTable 2.10.0
 * © SpryMedia Ltd - datatables.net/license
 */
!function(n) {
    var i,
        s;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(e) {
        return n(e, window, document)
    }) : "object" == typeof exports ? (i = require("jquery"), s = function(e, t) {
        t.fn.dataTable || require("datatables.net")(e, t)
    }, "undefined" == typeof window ? module.exports = function(e, t) {
        return e = e || window, t = t || i(e), s(e, t), n(t, e, e.document)
    } : (s(window, i), module.exports = n(i, window, window.document))) : n(jQuery, window, document)
}(function(c, u, d, f) {
    "use strict";
    function o(e, t) {
        if (!l.versionCheck || !l.versionCheck("1.10.8"))
            throw "KeyTable requires DataTables 1.10.8 or newer";
        if (this.c = c.extend(!0, {}, l.defaults.keyTable, o.defaults, t), this.s = {
            dt: new l.Api(e),
            enable: !0,
            focusDraw: !1,
            waitingForDraw: !1,
            lastFocus: null,
            namespace: ".keyTable-" + n++,
            tabInput: null
        }, this.dom = {}, t = this.s.dt.settings()[0], e = t.keytable)
            return e;
        (t.keytable = this)._constructor()
    }
    var l = c.fn.dataTable,
        n = 0,
        h = 0;
    return c.extend(o.prototype, {
        blur: function() {
            this._blur()
        },
        enable: function(e) {
            this.s.enable = e
        },
        enabled: function() {
            return this.s.enable
        },
        focus: function(e, t) {
            this._focus(this.s.dt.cell(e, t))
        },
        focused: function(e) {
            var t;
            return !!this.s.lastFocus && (t = this.s.lastFocus.cell.index(), e.row === t.row) && e.column === t.column
        },
        _constructor: function() {
            this._tabInput();
            var i,
                o = this,
                s = this.s.dt,
                e = c(s.table().node()),
                l = this.s.namespace,
                t = !1,
                n = ("static" === e.css("position") && e.css("position", "relative"), c(s.table().body()).on("click" + l, "th, td", function(e) {
                    var t;
                    !1 !== o.s.enable && (t = s.cell(this)).any() && o._focus(t, null, !1, e)
                }), c(d).on("keydown" + l, function(e) {
                    t || o._key(e)
                }), this.c.blurable && c(d).on("mousedown" + l, function(e) {
                    c(e.target).parents(".dataTables_filter").length && o._blur(),
                    c(e.target).parents().filter(s.table().container()).length || c(e.target).parents("div.DTE").length || c(e.target).parents("div.editor-datetime").length || c(e.target).parents("div.dt-datetime").length || c(e.target).parents().filter(".DTFC_Cloned").length || o._blur()
                }), this.c.editor && ((i = this.c.editor).on("open.keyTableMain", function(e, t, n) {
                    "inline" !== t && o.s.enable && (o.enable(!1), i.one("close" + l, function() {
                        o.enable(!0)
                    }))
                }), this.c.editOnFocus && s.on("key-focus" + l + " key-refocus" + l, function(e, t, n, i) {
                    o._editor(null, i, !0)
                }), s.on("key" + l, function(e, t, n, i, s) {
                    o._editor(n, s, !1)
                }), c(s.table().body()).on("dblclick" + l, "th, td", function(e) {
                    !1 === o.s.enable || !s.cell(this).any() || o.s.lastFocus && this !== o.s.lastFocus.cell.node() || o._editor(null, e, !0)
                }), i.on("preSubmit", function() {
                    t = !0
                }).on("preSubmitCancelled", function() {
                    t = !1
                }).on("submitComplete", function() {
                    t = !1
                })), s.on("stateSaveParams" + l, function(e, t, n) {
                    n.keyTable = o.s.lastFocus ? o.s.lastFocus.cell.index() : null
                }), s.on("column-visibility" + l, function(e) {
                    o._tabInput()
                }), s.on("column-reorder" + l, function(e, t, n) {
                    var i,
                        s = o.s.lastFocus;
                    s && s.cell && (i = s.relative.column, s.cell[0][0].column = n.mapping.indexOf(i), s.relative.column = n.mapping.indexOf(i))
                }), s.on("draw" + l, function(e) {
                    var t,
                        n,
                        i;
                    o._tabInput(),
                    o.s.focusDraw || o.s.lastFocus && (t = o.s.lastFocus.relative, n = s.page.info(), i = t.row + n.start, 0 !== n.recordsDisplay) && (i >= n.recordsDisplay && (i = n.recordsDisplay - 1), o._focus(i, t.column, !0, e))
                }), this.c.clipboard && this._clipboard(), s.on("destroy" + l, function() {
                    o._blur(!0),
                        s.off(l),
                        c(s.table().body()).off("click" + l, "th, td").off("dblclick" + l, "th, td"),
                        c(d).off("mousedown" + l).off("keydown" + l).off("copy" + l).off("paste" + l)
                }), s.state.loaded());
            n && n.keyTable ? s.one("init", function() {
                var e = s.cell(n.keyTable);
                e.any() && e.focus()
            }) : this.c.focus && s.cell(this.c.focus).focus()
        },
        _blur: function(e) {
            var t;
            this.s.enable && this.s.lastFocus && (t = this.s.lastFocus.cell, c(t.node()).removeClass(this.c.className), this.s.lastFocus = null, e || (this._updateFixedColumns(t.index().column), this._emitEvent("key-blur", [this.s.dt, t])))
        },
        _clipboard: function() {
            var o = this.s.dt,
                l = this,
                e = this.s.namespace;
            u.getSelection && (c(d).on("copy" + e, function(e) {
                var e = e.originalEvent,
                    t = u.getSelection().toString(),
                    n = l.s.lastFocus;
                !t && n && (e.clipboardData.setData("text/plain", n.cell.render(l.c.clipboardOrthogonal)), e.preventDefault())
            }), c(d).on("paste" + e, function(e) {
                var t,
                    e = e.originalEvent,
                    n = l.s.lastFocus,
                    i = d.activeElement,
                    s = l.c.editor;
                !n || i && "body" !== i.nodeName.toLowerCase() || (e.preventDefault(), u.clipboardData && u.clipboardData.getData ? t = u.clipboardData.getData("Text") : e.clipboardData && e.clipboardData.getData && (t = e.clipboardData.getData("text/plain")), s ? (i = l._inlineOptions(n.cell.index()), s.inline(i.cell, i.field, i.options).set(s.displayed()[0], t).submit()) : (n.cell.data(t), o.draw(!1)))
            }))
        },
        _columns: function() {
            var e = this.s.dt,
                t = e.columns(this.c.columns).indexes(),
                n = [];
            return e.columns(":visible").every(function(e) {
                -1 !== t.indexOf(e) && n.push(e)
            }), n
        },
        _editor: function(e, t, n) {
            var i,
                s,
                o,
                l,
                a,
                r;
            !this.s.lastFocus || t && "draw" === t.type || (s = (i = this).s.dt, o = this.c.editor, l = this.s.lastFocus.cell, a = this.s.namespace + "e" + h++, c("div.DTE", l.node()).length) || null !== e && (0 <= e && e <= 9 || 11 === e || 12 === e || 14 <= e && e <= 31 || 112 <= e && e <= 123 || 127 <= e && e <= 159) || (t && (t.stopPropagation(), 13 === e) && t.preventDefault(), r = function() {
                var e = i._inlineOptions(l.index());
                o.one("open" + a, function() {
                    o.off("cancelOpen" + a),
                    n || c("div.DTE_Field_InputControl input, div.DTE_Field_InputControl textarea").select(),
                        s.keys.enable(n ? "tab-only" : "navigation-only"),
                        s.on("key-blur.editor", function(e, t, n) {
                            "submit" !== o.s.editOpts.onBlur && o.displayed() && n.node() === l.node() && o.submit()
                        }),
                    n && c(s.table().container()).addClass("dtk-focus-alt"),
                        o.on("preSubmitCancelled" + a, function() {
                            setTimeout(function() {
                                i._focus(l, null, !1)
                            }, 50)
                        }),
                        o.on("submitUnsuccessful" + a, function() {
                            i._focus(l, null, !1)
                        }),
                        o.one("close" + a, function() {
                            s.keys.enable(!0),
                                s.off("key-blur.editor"),
                                o.off(a),
                                c(s.table().container()).removeClass("dtk-focus-alt"),
                            i.s.returnSubmit && (i.s.returnSubmit = !1, i._emitEvent("key-return-submit", [s, l]))
                        })
                }).one("cancelOpen" + a, function() {
                    o.off(a)
                }).inline(e.cell, e.field, e.options)
            }, 13 === e ? (n = !0, c(d).one("keyup", function() {
                r()
            })) : r())
        },
        _inlineOptions: function(e) {
            return this.c.editorOptions ? this.c.editorOptions(e) : {
                cell: e,
                field: f,
                options: f
            }
        },
        _emitEvent: function(n, i) {
            return this.s.dt.iterator("table", function(e, t) {
                return c(e.nTable).triggerHandler(n, i)
            })
        },
        _focus: function(e, t, n, i) {
            var s = this,
                o = this.s.dt,
                l = o.page.info(),
                a = this.s.lastFocus;
            if (i = i || null, this.s.enable) {
                if ("number" != typeof e) {
                    if (!e.any())
                        return;
                    var r = e.index();
                    if (t = r.column, (e = o.rows({
                        filter: "applied",
                        order: "applied"
                    }).indexes().indexOf(r.row)) < 0)
                        return;
                    l.serverSide && (e += l.start)
                }
                if (-1 !== l.length && (e < l.start || e >= l.start + l.length))
                    this.s.focusDraw = !0,
                        this.s.waitingForDraw = !0,
                        o.one("draw", function() {
                            s.s.focusDraw = !1,
                                s.s.waitingForDraw = !1,
                                s._focus(e, t, f, i)
                        }).page(Math.floor(e / l.length)).draw(!1);
                else if (-1 !== c.inArray(t, this._columns())) {
                    l.serverSide && (e -= l.start);
                    r = o.cells(null, t, {
                        search: "applied",
                        order: "applied"
                    }).flatten(),
                        l = o.cell(r[e]),
                        r = this._emitEvent("key-prefocus", [this.s.dt, l, i || null]);
                    if (-1 === r.indexOf(!1)) {
                        if (a) {
                            if (a.node === l.node())
                                return void this._emitEvent("key-refocus", [this.s.dt, l, i || null]);
                            this._blur()
                        }
                        this._removeOtherFocus();
                        r = c(l.node());
                        r.addClass(this.c.className),
                            this._updateFixedColumns(t),
                        n !== f && !0 !== n || (this._scroll(c(u), c(d.body), r, "offset"), (a = o.table().body().parentNode) !== o.table().header().parentNode && (n = c(a.parentNode), this._scroll(n, n, r, "position"))),
                            this.s.lastFocus = {
                                cell: l,
                                node: l.node(),
                                relative: {
                                    row: o.rows({
                                        page: "current"
                                    }).indexes().indexOf(l.index().row),
                                    column: l.index().column
                                }
                            },
                            this._emitEvent("key-focus", [this.s.dt, l, i || null]),
                            o.state.save()
                    }
                }
            }
        },
        _key: function(n) {
            if (this.s.waitingForDraw)
                n.preventDefault();
            else {
                var e = this.s.enable,
                    t = (this.s.returnSubmit = ("navigation-only" === e || "tab-only" === e) && 13 === n.keyCode, !0 === e || "navigation-only" === e);
                if (e && (!(0 === n.keyCode || n.ctrlKey || n.metaKey || n.altKey) || n.ctrlKey && n.altKey)) {
                    var i = this.s.lastFocus;
                    if (i)
                        if (this.s.dt.cell(i.node).any()) {
                            var s = this,
                                o = this.s.dt,
                                l = !!this.s.dt.settings()[0].oScroll.sY;
                            if (!this.c.keys || -1 !== c.inArray(n.keyCode, this.c.keys))
                                switch (n.keyCode) {
                                    case 9:
                                        n.preventDefault(),
                                            this._keyAction(function() {
                                                s._shift(n, n.shiftKey ? "left" : "right", !0)
                                            });
                                        break;
                                    case 27:
                                        this.c.blurable && !0 === e && this._blur();
                                        break;
                                    case 33:
                                    case 34:
                                        t && !l && (n.preventDefault(), this._keyAction(function() {
                                            o.page(33 === n.keyCode ? "previous" : "next").draw(!1)
                                        }));
                                        break;
                                    case 35:
                                    case 36:
                                        t && (n.preventDefault(), this._keyAction(function() {
                                            var e = o.cells({
                                                    page: "current"
                                                }).indexes(),
                                                t = s._columns();
                                            s._focus(o.cell(e[35 === n.keyCode ? e.length - 1 : t[0]]), null, !0, n)
                                        }));
                                        break;
                                    case 37:
                                        t && this._keyAction(function() {
                                            s._shift(n, "left")
                                        });
                                        break;
                                    case 38:
                                        t && this._keyAction(function() {
                                            s._shift(n, "up")
                                        });
                                        break;
                                    case 39:
                                        t && this._keyAction(function() {
                                            s._shift(n, "right")
                                        });
                                        break;
                                    case 40:
                                        t && this._keyAction(function() {
                                            s._shift(n, "down")
                                        });
                                        break;
                                    case 113:
                                        if (this.c.editor) {
                                            this._editor(null, n, !0);
                                            break
                                        }
                                    default:
                                        !0 === e && this._emitEvent("key", [o, n.keyCode, this.s.lastFocus.cell, n])
                                }
                        } else
                            this.s.lastFocus = null
                }
            }
        },
        _keyAction: function(e) {
            var t = this.c.editor;
            t && t.mode() ? t.submit(e) : e()
        },
        _removeOtherFocus: function() {
            var t = this.s.dt.table().node();
            c.fn.dataTable.tables({
                api: !0
            }).iterator("table", function(e) {
                this.table().node() !== t && this.cell.blur()
            })
        },
        _scroll: function(e, t, n, i) {
            var s = n[i](),
                o = n.outerHeight(),
                l = n.outerWidth(),
                a = t.scrollTop(),
                r = t.scrollLeft(),
                c = e.height(),
                e = e.width();
            "position" === i && (s.top += parseInt(n.closest("table").css("top"), 10)),
            s.top < a && s.top + o > a - 5 && t.scrollTop(s.top),
            s.left < r && t.scrollLeft(s.left),
            s.top + o > a + c && s.top < a + c + 5 && o < c && t.scrollTop(s.top + o - c),
            s.left + l > r + e && l < e && t.scrollLeft(s.left + l - e)
        },
        _shift: function(e, t, n) {
            var i,
                s = this.s.dt,
                o = s.page.info(),
                l = o.recordsDisplay,
                a = this._columns(),
                r = this.s.lastFocus;
            r && (r = r.cell) && (i = s.rows({
                filter: "applied",
                order: "applied"
            }).indexes().indexOf(r.index().row), o.serverSide && (i += o.start), o = i, r = a[i = s.columns(a).indexes().indexOf(r.index().column)], "rtl" === c(s.table().node()).css("direction") && ("right" === t ? t = "left" : "left" === t && (t = "right")), "right" === t ? r = i >= a.length - 1 ? (o++, a[0]) : a[i + 1] : "left" === t ? r = 0 === i ? (o--, a[a.length - 1]) : a[i - 1] : "up" === t ? o-- : "down" === t && o++, 0 <= o && o < l && -1 !== c.inArray(r, a) ? (e && e.preventDefault(), this._focus(o, r, !0, e)) : n && this.c.blurable ? this._blur() : e && e.preventDefault())
        },
        _tabInput: function() {
            var n = this,
                i = this.s.dt,
                e = null !== this.c.tabIndex ? this.c.tabIndex : i.settings()[0].iTabIndex;
            -1 != e && (this.s.tabInput || ((e = c('<div><input type="text" tabindex="' + e + '"/></div>').css({
                position: "absolute",
                height: 1,
                width: 0,
                overflow: "hidden"
            })).children().on("focus", function(e) {
                var t = i.cell(":eq(0)", n._columns(), {
                    page: "current"
                });
                t.any() && n._focus(t, null, !0, e)
            }), this.s.tabInput = e), e = this.s.dt.cell(":eq(0)", "0:visible", {
                page: "current",
                order: "current"
            }).node()) && c(e).prepend(this.s.tabInput)
        },
        _updateFixedColumns: function(e) {
            var t,
                n = this.s.dt,
                i = n.settings()[0];
            i._oFixedColumns && (t = i._oFixedColumns.s.iLeftColumns, i = i.aoColumns.length - i._oFixedColumns.s.iRightColumns, e < t || i <= e) && n.fixedColumns().update()
        }
    }), o.defaults = {
        blurable: !0,
        className: "focus",
        clipboard: !0,
        clipboardOrthogonal: "display",
        columns: "",
        editor: null,
        editOnFocus: !1,
        editorOptions: null,
        focus: null,
        keys: null,
        tabIndex: null
    }, o.version = "2.10.0", c.fn.dataTable.KeyTable = o, c.fn.DataTable.KeyTable = o, l.Api.register("cell.blur()", function() {
        return this.iterator("table", function(e) {
            e.keytable && e.keytable.blur()
        })
    }), l.Api.register("cell().focus()", function() {
        return this.iterator("cell", function(e, t, n) {
            e.keytable && e.keytable.focus(t, n)
        })
    }), l.Api.register("keys.disable()", function() {
        return this.iterator("table", function(e) {
            e.keytable && e.keytable.enable(!1)
        })
    }), l.Api.register("keys.enable()", function(t) {
        return this.iterator("table", function(e) {
            e.keytable && e.keytable.enable(t === f || t)
        })
    }), l.Api.register("keys.enabled()", function(e) {
        var t = this.context;
        return !!t.length && !!t[0].keytable && t[0].keytable.enabled()
    }), l.Api.register("keys.move()", function(t) {
        return this.iterator("table", function(e) {
            e.keytable && e.keytable._shift(null, t, !1)
        })
    }), l.ext.selector.cell.push(function(e, t, n) {
        var i = t.focused,
            s = e.keytable,
            o = [];
        if (!s || i === f)
            return n;
        for (var l = 0, a = n.length; l < a; l++)
            (!0 === i && s.focused(n[l]) || !1 === i && !s.focused(n[l])) && o.push(n[l]);
        return o
    }), c(d).on("preInit.dt.dtk", function(e, t, n) {
        var i,
            s;
        "dt" === e.namespace && (e = t.oInit.keys, i = l.defaults.keys, e || i) && (s = c.extend({}, i, e), !1 !== e) && new o(t, s)
    }), l
});

/*! Bootstrap 5 styling wrapper for KeyTable
 * © SpryMedia Ltd - datatables.net/license
 */
!function(n) {
    var a,
        d;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs5", "datatables.net-keytable"], function(e) {
        return n(e, window, document)
    }) : "object" == typeof exports ? (a = require("jquery"), d = function(e, t) {
        t.fn.dataTable || require("datatables.net-bs5")(e, t),
        t.fn.dataTable.KeyTable || require("datatables.net-keytable")(e, t)
    }, "undefined" == typeof window ? module.exports = function(e, t) {
        return e = e || window, t = t || a(e), d(e, t), n(t, 0, e.document)
    } : (d(window, a), module.exports = n(a, window, window.document))) : n(jQuery, window, document)
}(function(e, t, n, a) {
    "use strict";
    return e.fn.dataTable
});

/*! Responsive 2.5.0
 * © SpryMedia Ltd - datatables.net/license
 */
!function(n) {
    var i,
        r;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(e) {
        return n(e, window, document)
    }) : "object" == typeof exports ? (i = require("jquery"), r = function(e, t) {
        t.fn.dataTable || require("datatables.net")(e, t)
    }, "undefined" == typeof window ? module.exports = function(e, t) {
        return e = e || window, t = t || i(e), r(e, t), n(t, e, e.document)
    } : (r(window, i), module.exports = n(i, window, window.document))) : n(jQuery, window, document)
}(function(f, m, d, h) {
    "use strict";
    function a(e, t) {
        if (!r.versionCheck || !r.versionCheck("1.10.10"))
            throw "DataTables Responsive requires DataTables 1.10.10 or newer";
        this.s = {
            childNodeStore: {},
            columns: [],
            current: [],
            dt: new r.Api(e)
        },
        this.s.dt.settings()[0].responsive || (t && "string" == typeof t.details ? t.details = {
            type: t.details
        } : t && !1 === t.details ? t.details = {
            type: !1
        } : t && !0 === t.details && (t.details = {
            type: "inline"
        }), this.c = f.extend(!0, {}, a.defaults, r.defaults.responsive, t), (e.responsive = this)._constructor())
    }
    var r = f.fn.dataTable,
        e = (f.extend(a.prototype, {
            _constructor: function() {
                var s = this,
                    i = this.s.dt,
                    e = i.settings()[0],
                    t = f(m).innerWidth(),
                    e = (i.settings()[0]._responsive = this, f(m).on("resize.dtr orientationchange.dtr", r.util.throttle(function() {
                        var e = f(m).innerWidth();
                        e !== t && (s._resize(), t = e)
                    })), e.oApi._fnCallbackReg(e, "aoRowCreatedCallback", function(e, t, n) {
                        -1 !== f.inArray(!1, s.s.current) && f(">td, >th", e).each(function(e) {
                            e = i.column.index("toData", e);
                            !1 === s.s.current[e] && f(this).css("display", "none")
                        })
                    }), i.on("destroy.dtr", function() {
                        i.off(".dtr"),
                            f(i.table().body()).off(".dtr"),
                            f(m).off("resize.dtr orientationchange.dtr"),
                            i.cells(".dtr-control").nodes().to$().removeClass("dtr-control"),
                            f.each(s.s.current, function(e, t) {
                                !1 === t && s._setColumnVis(e, !0)
                            })
                    }), this.c.breakpoints.sort(function(e, t) {
                        return e.width < t.width ? 1 : e.width > t.width ? -1 : 0
                    }), this._classLogic(), this._resizeAuto(), this.c.details);
                !1 !== e.type && (s._detailsInit(), i.on("column-visibility.dtr", function() {
                    s._timer && clearTimeout(s._timer),
                        s._timer = setTimeout(function() {
                            s._timer = null,
                                s._classLogic(),
                                s._resizeAuto(),
                                s._resize(!0),
                                s._redrawChildren()
                        }, 100)
                }), i.on("draw.dtr", function() {
                    s._redrawChildren()
                }), f(i.table().node()).addClass("dtr-" + e.type)),
                    i.on("column-reorder.dtr", function(e, t, n) {
                        s._classLogic(),
                            s._resizeAuto(),
                            s._resize(!0)
                    }),
                    i.on("column-sizing.dtr", function() {
                        s._resizeAuto(),
                            s._resize()
                    }),
                    i.on("column-calc.dt", function(e, t) {
                        for (var n = s.s.current, i = 0; i < n.length; i++) {
                            var r = t.visible.indexOf(i);
                            !1 === n[i] && 0 <= r && t.visible.splice(r, 1)
                        }
                    }),
                    i.on("preXhr.dtr", function() {
                        var e = [];
                        i.rows().every(function() {
                            this.child.isShown() && e.push(this.id(!0))
                        }),
                            i.one("draw.dtr", function() {
                                s._resizeAuto(),
                                    s._resize(),
                                    i.rows(e).every(function() {
                                        s._detailsDisplay(this, !1)
                                    })
                            })
                    }),
                    i.on("draw.dtr", function() {
                        s._controlClass()
                    }).on("init.dtr", function(e, t, n) {
                        "dt" === e.namespace && (s._resizeAuto(), s._resize(), f.inArray(!1, s.s.current)) && i.columns.adjust()
                    }),
                    this._resize()
            },
            _childNodes: function(e, t, n) {
                var i = t + "-" + n;
                if (this.s.childNodeStore[i])
                    return this.s.childNodeStore[i];
                for (var r = [], s = e.cell(t, n).node().childNodes, o = 0, d = s.length; o < d; o++)
                    r.push(s[o]);
                return this.s.childNodeStore[i] = r
            },
            _childNodesRestore: function(e, t, n) {
                var i = t + "-" + n;
                if (this.s.childNodeStore[i]) {
                    for (var r = e.cell(t, n).node(), s = this.s.childNodeStore[i][0].parentNode.childNodes, o = [], d = 0, a = s.length; d < a; d++)
                        o.push(s[d]);
                    for (var l = 0, c = o.length; l < c; l++)
                        r.appendChild(o[l]);
                    this.s.childNodeStore[i] = h
                }
            },
            _columnsVisiblity: function(n) {
                for (var i = this.s.dt, e = this.s.columns, t = e.map(function(e, t) {
                    return {
                        columnIdx: t,
                        priority: e.priority
                    }
                }).sort(function(e, t) {
                    return e.priority !== t.priority ? e.priority - t.priority : e.columnIdx - t.columnIdx
                }), r = f.map(e, function(e, t) {
                    return !1 === i.column(t).visible() ? "not-visible" : (!e.auto || null !== e.minWidth) && (!0 === e.auto ? "-" : -1 !== f.inArray(n, e.includeIn))
                }), s = 0, o = 0, d = r.length; o < d; o++)
                    !0 === r[o] && (s += e[o].minWidth);
                var a = i.settings()[0].oScroll,
                    a = a.sY || a.sX ? a.iBarWidth : 0,
                    l = i.table().container().offsetWidth - a - s;
                for (o = 0, d = r.length; o < d; o++)
                    e[o].control && (l -= e[o].minWidth);
                var c = !1;
                for (o = 0, d = t.length; o < d; o++) {
                    var u = t[o].columnIdx;
                    "-" === r[u] && !e[u].control && e[u].minWidth && (c || l - e[u].minWidth < 0 ? r[u] = !(c = !0) : r[u] = !0, l -= e[u].minWidth)
                }
                var h = !1;
                for (o = 0, d = e.length; o < d; o++)
                    if (!e[o].control && !e[o].never && !1 === r[o]) {
                        h = !0;
                        break
                    }
                for (o = 0, d = e.length; o < d; o++)
                    e[o].control && (r[o] = h),
                    "not-visible" === r[o] && (r[o] = !1);
                return -1 === f.inArray(!0, r) && (r[0] = !0), r
            },
            _classLogic: function() {
                function d(e, t, n, i) {
                    var r,
                        s,
                        o;
                    if (n) {
                        if ("max-" === n)
                            for (r = a._find(t).width, s = 0, o = l.length; s < o; s++)
                                l[s].width <= r && u(e, l[s].name);
                        else if ("min-" === n)
                            for (r = a._find(t).width, s = 0, o = l.length; s < o; s++)
                                l[s].width >= r && u(e, l[s].name);
                        else if ("not-" === n)
                            for (s = 0, o = l.length; s < o; s++)
                                -1 === l[s].name.indexOf(i) && u(e, l[s].name)
                    } else
                        c[e].includeIn.push(t)
                }
                var a = this,
                    l = this.c.breakpoints,
                    i = this.s.dt,
                    c = i.columns().eq(0).map(function(e) {
                        var t = this.column(e),
                            n = t.header().className,
                            e = i.settings()[0].aoColumns[e].responsivePriority,
                            t = t.header().getAttribute("data-priority");
                        return e === h && (e = t === h || null === t ? 1e4 : +t), {
                            className: n,
                            includeIn: [],
                            auto: !1,
                            control: !1,
                            never: !!n.match(/\b(dtr\-)?never\b/),
                            priority: e
                        }
                    }),
                    u = function(e, t) {
                        e = c[e].includeIn;
                        -1 === f.inArray(t, e) && e.push(t)
                    };
                c.each(function(e, r) {
                    for (var t = e.className.split(" "), s = !1, n = 0, i = t.length; n < i; n++) {
                        var o = t[n].trim();
                        if ("all" === o || "dtr-all" === o)
                            return s = !0, void (e.includeIn = f.map(l, function(e) {
                                return e.name
                            }));
                        if ("none" === o || "dtr-none" === o || e.never)
                            return void (s = !0);
                        if ("control" === o || "dtr-control" === o)
                            return s = !0, void (e.control = !0);
                        f.each(l, function(e, t) {
                            var n = t.name.split("-"),
                                i = new RegExp("(min\\-|max\\-|not\\-)?(" + n[0] + ")(\\-[_a-zA-Z0-9])?"),
                                i = o.match(i);
                            i && (s = !0, i[2] === n[0] && i[3] === "-" + n[1] ? d(r, t.name, i[1], i[2] + i[3]) : i[2] !== n[0] || i[3] || d(r, t.name, i[1], i[2]))
                        })
                    }
                    s || (e.auto = !0)
                }),
                    this.s.columns = c
            },
            _controlClass: function() {
                var e,
                    t,
                    n;
                "inline" === this.c.details.type && (e = this.s.dt, t = this.s.current, n = f.inArray(!0, t), e.cells(null, function(e) {
                    return e !== n
                }, {
                    page: "current"
                }).nodes().to$().filter(".dtr-control").removeClass("dtr-control"), e.cells(null, n, {
                    page: "current"
                }).nodes().to$().addClass("dtr-control"))
            },
            _detailsDisplay: function(t, n) {
                function e(e) {
                    f(t.node()).toggleClass("parent", !1 !== e),
                        f(s.table().node()).triggerHandler("responsive-display.dt", [s, t, e, n])
                }
                var i,
                    r = this,
                    s = this.s.dt,
                    o = this.c.details;
                o && !1 !== o.type && (i = "string" == typeof o.renderer ? a.renderer[o.renderer]() : o.renderer, "boolean" == typeof (o = o.display(t, n, function() {
                    return i.call(r, s, t[0], r._detailsObj(t[0]))
                }, function() {
                    e(!1)
                }))) && e(o)
            },
            _detailsInit: function() {
                var n = this,
                    i = this.s.dt,
                    e = this.c.details,
                    r = ("inline" === e.type && (e.target = "td.dtr-control, th.dtr-control"), i.on("draw.dtr", function() {
                        n._tabIndexes()
                    }), n._tabIndexes(), f(i.table().body()).on("keyup.dtr", "td, th", function(e) {
                        13 === e.keyCode && f(this).data("dtr-keyboard") && f(this).click()
                    }), e.target),
                    e = "string" == typeof r ? r : "td, th";
                r === h && null === r || f(i.table().body()).on("click.dtr mousedown.dtr mouseup.dtr", e, function(e) {
                    if (f(i.table().node()).hasClass("collapsed") && -1 !== f.inArray(f(this).closest("tr").get(0), i.rows().nodes().toArray())) {
                        if ("number" == typeof r) {
                            var t = r < 0 ? i.columns().eq(0).length + r : r;
                            if (i.cell(this).index().column !== t)
                                return
                        }
                        t = i.row(f(this).closest("tr"));
                        "click" === e.type ? n._detailsDisplay(t, !1) : "mousedown" === e.type ? f(this).css("outline", "none") : "mouseup" === e.type && f(this).trigger("blur").css("outline", "")
                    }
                })
            },
            _detailsObj: function(n) {
                var i = this,
                    r = this.s.dt;
                return f.map(this.s.columns, function(e, t) {
                    if (!e.never && !e.control)
                        return {
                            className: (e = r.settings()[0].aoColumns[t]).sClass,
                            columnIndex: t,
                            data: r.cell(n, t).render(i.c.orthogonal),
                            hidden: r.column(t).visible() && !i.s.current[t],
                            rowIndex: n,
                            title: null !== e.sTitle ? e.sTitle : f(r.column(t).header()).text()
                        }
                })
            },
            _find: function(e) {
                for (var t = this.c.breakpoints, n = 0, i = t.length; n < i; n++)
                    if (t[n].name === e)
                        return t[n]
            },
            _redrawChildren: function() {
                var n = this,
                    i = this.s.dt;
                i.rows({
                    page: "current"
                }).iterator("row", function(e, t) {
                    n._detailsDisplay(i.row(t), !0)
                })
            },
            _resize: function(n) {
                for (var e, i = this, t = this.s.dt, r = f(m).innerWidth(), s = this.c.breakpoints, o = s[0].name, d = this.s.columns, a = this.s.current.slice(), l = s.length - 1; 0 <= l; l--)
                    if (r <= s[l].width) {
                        o = s[l].name;
                        break
                    }
                var c = this._columnsVisiblity(o),
                    u = (this.s.current = c, !1);
                for (l = 0, e = d.length; l < e; l++)
                    if (!1 === c[l] && !d[l].never && !d[l].control && !1 == !t.column(l).visible()) {
                        u = !0;
                        break
                    }
                f(t.table().node()).toggleClass("collapsed", u);
                var h = !1,
                    p = 0;
                t.columns().eq(0).each(function(e, t) {
                    !0 === c[t] && p++,
                    !n && c[t] === a[t] || (h = !0, i._setColumnVis(e, c[t]))
                }),
                    this._redrawChildren(),
                h && (f(t.table().node()).trigger("responsive-resize.dt", [t, this.s.current]), 0 === t.page.info().recordsDisplay) && f("td", t.table().body()).eq(0).attr("colspan", p),
                    i._controlClass()
            },
            _resizeAuto: function() {
                var e,
                    t,
                    n,
                    i,
                    r,
                    s = this.s.dt,
                    o = this.s.columns,
                    d = this;
                this.c.auto && -1 !== f.inArray(!0, f.map(o, function(e) {
                    return e.auto
                })) && (f.isEmptyObject(this.s.childNodeStore) || f.each(this.s.childNodeStore, function(e) {
                    e = e.split("-");
                    d._childNodesRestore(s, +e[0], +e[1])
                }), s.table().node().offsetWidth, s.columns, e = s.table().node().cloneNode(!1), t = f(s.table().header().cloneNode(!1)).appendTo(e), i = f(s.table().body()).clone(!1, !1).empty().appendTo(e), e.style.width = "auto", n = s.columns().header().filter(function(e) {
                    return s.column(e).visible()
                }).to$().clone(!1).css("display", "table-cell").css("width", "auto").css("min-width", 0), f(i).append(f(s.rows({
                    page: "current"
                }).nodes()).clone(!1)).find("th, td").css("display", ""), (i = s.table().footer()) && (i = f(i.cloneNode(!1)).appendTo(e), r = s.columns().footer().filter(function(e) {
                    return s.column(e).visible()
                }).to$().clone(!1).css("display", "table-cell"), f("<tr/>").append(r).appendTo(i)), f("<tr/>").append(n).appendTo(t), "inline" === this.c.details.type && f(e).addClass("dtr-inline collapsed"), f(e).find("[name]").removeAttr("name"), f(e).css("position", "relative"), (r = f("<div/>").css({
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    clear: "both"
                }).append(e)).insertBefore(s.table().node()), n.each(function(e) {
                    e = s.column.index("fromVisible", e);
                    o[e].minWidth = this.offsetWidth || 0
                }), r.remove())
            },
            _responsiveOnlyHidden: function() {
                var n = this.s.dt;
                return f.map(this.s.current, function(e, t) {
                    return !1 === n.column(t).visible() || e
                })
            },
            _setColumnVis: function(e, t) {
                var n = this,
                    i = this.s.dt,
                    r = t ? "" : "none";
                f(i.column(e).header()).css("display", r).toggleClass("dtr-hidden", !t),
                    f(i.column(e).footer()).css("display", r).toggleClass("dtr-hidden", !t),
                    i.column(e).nodes().to$().css("display", r).toggleClass("dtr-hidden", !t),
                f.isEmptyObject(this.s.childNodeStore) || i.cells(null, e).indexes().each(function(e) {
                    n._childNodesRestore(i, e.row, e.column)
                })
            },
            _tabIndexes: function() {
                var e = this.s.dt,
                    t = e.cells({
                        page: "current"
                    }).nodes().to$(),
                    n = e.settings()[0],
                    i = this.c.details.target;
                t.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]"),
                    ("number" == typeof i ? e.cells(null, i, {
                        page: "current"
                    }).nodes().to$() : f(i = "td:first-child, th:first-child" === i ? ">td:first-child, >th:first-child" : i, e.rows({
                        page: "current"
                    }).nodes())).attr("tabIndex", n.iTabIndex).data("dtr-keyboard", 1)
            }
        }), a.defaults = {
            breakpoints: a.breakpoints = [{
                name: "desktop",
                width: 1 / 0
            }, {
                name: "tablet-l",
                width: 1024
            }, {
                name: "tablet-p",
                width: 768
            }, {
                name: "mobile-l",
                width: 480
            }, {
                name: "mobile-p",
                width: 320
            }],
            auto: !0,
            details: {
                display: (a.display = {
                    childRow: function(e, t, n) {
                        return t ? f(e.node()).hasClass("parent") ? (e.child(n(), "child").show(), !0) : void 0 : e.child.isShown() ? (e.child(!1), !1) : (e.child(n(), "child").show(), !0)
                    },
                    childRowImmediate: function(e, t, n) {
                        return !t && e.child.isShown() || !e.responsive.hasHidden() ? (e.child(!1), !1) : (e.child(n(), "child").show(), !0)
                    },
                    modal: function(o) {
                        return function(e, t, n, i) {
                            if (t) {
                                if (!(s = f("div.dtr-modal-content")).length || e.index() !== s.data("dtr-row-idx"))
                                    return null;
                                s.empty().append(n())
                            } else {
                                var r = function() {
                                        s.remove(),
                                            f(d).off("keypress.dtr"),
                                            f(e.node()).removeClass("parent"),
                                            i()
                                    },
                                    s = f('<div class="dtr-modal"/>').append(f('<div class="dtr-modal-display"/>').append(f('<div class="dtr-modal-content"/>').data("dtr-row-idx", e.index()).append(n())).append(f('<div class="dtr-modal-close">&times;</div>').click(function() {
                                        r()
                                    }))).append(f('<div class="dtr-modal-background"/>').click(function() {
                                        r()
                                    })).appendTo("body");
                                f(e.node()).addClass("parent"),
                                    f(d).on("keyup.dtr", function(e) {
                                        27 === e.keyCode && (e.stopPropagation(), r())
                                    })
                            }
                            return o && o.header && f("div.dtr-modal-content").prepend("<h2>" + o.header(e) + "</h2>"), !0
                        }
                    }
                }).childRow,
                renderer: (a.renderer = {
                    listHiddenNodes: function() {
                        return function(i, e, t) {
                            var r = this,
                                s = f('<ul data-dtr-index="' + e + '" class="dtr-details"/>'),
                                o = !1;
                            f.each(t, function(e, t) {
                                var n;
                                t.hidden && (n = t.className ? 'class="' + t.className + '"' : "", f("<li " + n + ' data-dtr-index="' + t.columnIndex + '" data-dt-row="' + t.rowIndex + '" data-dt-column="' + t.columnIndex + '"><span class="dtr-title">' + t.title + "</span> </li>").append(f('<span class="dtr-data"/>').append(r._childNodes(i, t.rowIndex, t.columnIndex))).appendTo(s), o = !0)
                            });
                            return !!o && s
                        }
                    },
                    listHidden: function() {
                        return function(e, t, n) {
                            n = f.map(n, function(e) {
                                var t = e.className ? 'class="' + e.className + '"' : "";
                                return e.hidden ? "<li " + t + ' data-dtr-index="' + e.columnIndex + '" data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><span class="dtr-title">' + e.title + '</span> <span class="dtr-data">' + e.data + "</span></li>" : ""
                            }).join("");
                            return !!n && f('<ul data-dtr-index="' + t + '" class="dtr-details"/>').append(n)
                        }
                    },
                    tableAll: function(i) {
                        return i = f.extend({
                            tableClass: ""
                        }, i), function(e, t, n) {
                            n = f.map(n, function(e) {
                                return "<tr " + (e.className ? 'class="' + e.className + '"' : "") + ' data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><td>' + e.title + ":</td> <td>" + e.data + "</td></tr>"
                            }).join("");
                            return f('<table class="' + i.tableClass + ' dtr-details" width="100%"/>').append(n)
                        }
                    }
                }).listHidden(),
                target: 0,
                type: "inline"
            },
            orthogonal: "display"
        }, f.fn.dataTable.Api);
    return e.register("responsive()", function() {
        return this
    }), e.register("responsive.index()", function(e) {
        return {
            column: (e = f(e)).data("dtr-index"),
            row: e.parent().data("dtr-index")
        }
    }), e.register("responsive.rebuild()", function() {
        return this.iterator("table", function(e) {
            e._responsive && e._responsive._classLogic()
        })
    }), e.register("responsive.recalc()", function() {
        return this.iterator("table", function(e) {
            e._responsive && (e._responsive._resizeAuto(), e._responsive._resize())
        })
    }), e.register("responsive.hasHidden()", function() {
        var e = this.context[0];
        return !!e._responsive && -1 !== f.inArray(!1, e._responsive._responsiveOnlyHidden())
    }), e.registerPlural("columns().responsiveHidden()", "column().responsiveHidden()", function() {
        return this.iterator("column", function(e, t) {
            return !!e._responsive && e._responsive._responsiveOnlyHidden()[t]
        }, 1)
    }), a.version = "2.5.0", f.fn.dataTable.Responsive = a, f.fn.DataTable.Responsive = a, f(d).on("preInit.dt.dtr", function(e, t, n) {
        "dt" === e.namespace && (f(t.nTable).hasClass("responsive") || f(t.nTable).hasClass("dt-responsive") || t.oInit.responsive || r.defaults.responsive) && !1 !== (e = t.oInit.responsive) && new a(t, f.isPlainObject(e) ? e : {})
    }), r
});

/*! Bootstrap 5 integration for DataTables' Responsive
 * © SpryMedia Ltd - datatables.net/license
 */
!function(n) {
    var o,
        a;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs5", "datatables.net-responsive"], function(e) {
        return n(e, window, document)
    }) : "object" == typeof exports ? (o = require("jquery"), a = function(e, d) {
        d.fn.dataTable || require("datatables.net-bs5")(e, d),
        d.fn.dataTable.Responsive || require("datatables.net-responsive")(e, d)
    }, "undefined" == typeof window ? module.exports = function(e, d) {
        return e = e || window, d = d || o(e), a(e, d), n(d, e, e.document)
    } : (a(window, o), module.exports = n(o, window, window.document))) : n(jQuery, window, document)
}(function(s, e, l, d) {
    "use strict";
    var r,
        n = s.fn.dataTable,
        o = n.Responsive.display,
        u = o.modal,
        f = s('<div class="modal fade dtr-bs-modal" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"/></div></div></div>'),
        a = e.bootstrap;
    return n.Responsive.bootstrap = function(e) {
        a = e
    }, o.modal = function(i) {
        return r = r || new a.Modal(f[0]), function(e, d, n, o) {
            if (s.fn.modal) {
                if (d) {
                    if (!s.contains(l, f[0]) || e.index() !== f.data("dtr-row-idx"))
                        return null;
                    f.find("div.modal-body").empty().append(n())
                } else {
                    var a,
                        t;
                    i && i.header && (t = (a = f.find("div.modal-header")).find("button").detach(), a.empty().append('<h4 class="modal-title">' + i.header(e) + "</h4>").append(t)),
                        f.find("div.modal-body").empty().append(n()),
                        f.data("dtr-row-idx", e.index()).one("hidden.bs.modal", o).appendTo("body").modal(),
                        r.show()
                }
                return !0
            }
            return u(e, d, n, o)
        }
    }, n
});

/*! RowGroup 1.4.0
 * © SpryMedia Ltd - datatables.net/license
 */
!function(e) {
    var n,
        o;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return e(t, window, document)
    }) : "object" == typeof exports ? (n = require("jquery"), o = function(t, r) {
        r.fn.dataTable || require("datatables.net")(t, r)
    }, "undefined" == typeof window ? module.exports = function(t, r) {
        return t = t || window, r = r || n(t), o(t, r), e(r, 0, t.document)
    } : (o(window, n), module.exports = e(n, window, window.document))) : e(jQuery, window, document)
}(function(a, t, r, l) {
    "use strict";
    function s(t, r) {
        if (!p.versionCheck || !p.versionCheck("1.10.8"))
            throw "RowGroup requires DataTables 1.10.8 or newer";
        if (this.c = a.extend(!0, {}, p.defaults.rowGroup, s.defaults, r), this.s = {
            dt: new p.Api(t)
        }, this.dom = {}, r = this.s.dt.settings()[0], t = r.rowGroup)
            return t;
        (r.rowGroup = this)._constructor()
    }
    var p = a.fn.dataTable;
    return a.extend(s.prototype, {
        dataSrc: function(t) {
            var r;
            return t === l ? this.c.dataSrc : (r = this.s.dt, this.c.dataSrc = t, a(r.table().node()).triggerHandler("rowgroup-datasrc.dt", [r, t]), this)
        },
        disable: function() {
            return this.c.enable = !1, this
        },
        enable: function(t) {
            return !1 === t ? this.disable() : (this.c.enable = !0, this)
        },
        enabled: function() {
            return this.c.enable
        },
        _constructor: function() {
            var e = this,
                t = this.s.dt,
                n = t.settings()[0];
            t.on("draw.dtrg", function(t, r) {
                e.c.enable && n === r && e._draw()
            }),
                t.on("column-visibility.dt.dtrg responsive-resize.dt.dtrg", function() {
                    e._adjustColspan()
                }),
                t.on("destroy", function() {
                    t.off(".dtrg")
                })
        },
        _adjustColspan: function() {
            a("tr." + this.c.className, this.s.dt.table().body()).find("td:visible").attr("colspan", this._colspan())
        },
        _colspan: function() {
            return this.s.dt.columns().visible().reduce(function(t, r) {
                return t + r
            }, 0)
        },
        _draw: function() {
            var t = this.s.dt,
                t = this._group(0, t.rows({
                    page: "current"
                }).indexes());
            this._groupDisplay(0, t)
        },
        _group: function(t, r) {
            for (var e, n = Array.isArray(this.c.dataSrc) ? this.c.dataSrc : [this.c.dataSrc], o = p.ext.oApi._fnGetObjectDataFn(n[t]), a = this.s.dt, s = [], i = 0, u = r.length; i < u; i++) {
                var d,
                    c = r[i];
                null !== (d = o(a.row(c).data())) && d !== l || (d = this.c.emptyDataGroup),
                e !== l && d === e || (s.push({
                    dataPoint: d,
                    rows: []
                }), e = d),
                    s[s.length - 1].rows.push(c)
            }
            if (n[t + 1] !== l)
                for (i = 0, u = s.length; i < u; i++)
                    s[i].children = this._group(t + 1, s[i].rows);
            return s
        },
        _groupDisplay: function(t, r) {
            for (var e, n = this.s.dt, o = 0, a = r.length; o < a; o++) {
                var s,
                    i = r[o],
                    u = i.dataPoint,
                    d = i.rows;
                this.c.startRender && (e = this.c.startRender.call(this, n.rows(d), u, t), s = this._rowWrap(e, this.c.startClassName, t)) && s.insertBefore(n.row(d[0]).node()),
                this.c.endRender && (e = this.c.endRender.call(this, n.rows(d), u, t), s = this._rowWrap(e, this.c.endClassName, t)) && s.insertAfter(n.row(d[d.length - 1]).node()),
                i.children && this._groupDisplay(t + 1, i.children)
            }
        },
        _rowWrap: function(t, r, e) {
            return (t = null !== t && "" !== t ? t : this.c.emptyDataGroup) === l || null === t ? null : ("object" == typeof t && t.nodeName && "tr" === t.nodeName.toLowerCase() ? a(t) : t instanceof a && t.length && "tr" === t[0].nodeName.toLowerCase() ? t : a("<tr/>").append(a("<th/>").attr("colspan", this._colspan()).attr("scope", "row").append(t))).addClass(this.c.className).addClass(r).addClass("dtrg-level-" + e)
        }
    }), s.defaults = {
        className: "dtrg-group",
        dataSrc: 0,
        emptyDataGroup: "No group",
        enable: !0,
        endClassName: "dtrg-end",
        endRender: null,
        startClassName: "dtrg-start",
        startRender: function(t, r) {
            return r
        }
    }, s.version = "1.4.0", a.fn.dataTable.RowGroup = s, a.fn.DataTable.RowGroup = s, p.Api.register("rowGroup()", function() {
        return this
    }), p.Api.register("rowGroup().disable()", function() {
        return this.iterator("table", function(t) {
            t.rowGroup && t.rowGroup.enable(!1)
        })
    }), p.Api.register("rowGroup().enable()", function(r) {
        return this.iterator("table", function(t) {
            t.rowGroup && t.rowGroup.enable(r === l || r)
        })
    }), p.Api.register("rowGroup().enabled()", function() {
        var t = this.context;
        return !(!t.length || !t[0].rowGroup) && t[0].rowGroup.enabled()
    }), p.Api.register("rowGroup().dataSrc()", function(r) {
        return r === l ? this.context[0].rowGroup.dataSrc() : this.iterator("table", function(t) {
            t.rowGroup && t.rowGroup.dataSrc(r)
        })
    }), a(r).on("preInit.dt.dtrg", function(t, r, e) {
        var n,
            o;
        "dt" === t.namespace && (t = r.oInit.rowGroup, n = p.defaults.rowGroup, t || n) && (o = a.extend({}, n, t), !1 !== t) && new s(r, o)
    }), p
});

/*! Bootstrap 5 styling wrapper for RowGroup
 * © SpryMedia Ltd - datatables.net/license
 */
!function(t) {
    var o,
        d;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs5", "datatables.net-rowgroup"], function(e) {
        return t(e, window, document)
    }) : "object" == typeof exports ? (o = require("jquery"), d = function(e, n) {
        n.fn.dataTable || require("datatables.net-bs5")(e, n),
        n.fn.dataTable.RowGroup || require("datatables.net-rowgroup")(e, n)
    }, "undefined" == typeof window ? module.exports = function(e, n) {
        return e = e || window, n = n || o(e), d(e, n), t(n, 0, e.document)
    } : (d(window, o), module.exports = t(o, window, window.document))) : t(jQuery, window, document)
}(function(e, n, t, o) {
    "use strict";
    return e.fn.dataTable
});

/*! RowReorder 1.4.1
 * © SpryMedia Ltd - datatables.net/license
 */
!function(o) {
    var r,
        n;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return o(t, window, document)
    }) : "object" == typeof exports ? (r = require("jquery"), n = function(t, e) {
        e.fn.dataTable || require("datatables.net")(t, e)
    }, "undefined" == typeof window ? module.exports = function(t, e) {
        return t = t || window, e = e || r(t), n(t, e), o(e, t, t.document)
    } : (n(window, r), module.exports = o(r, window, window.document))) : o(jQuery, window, document)
}(function(v, d, a, s) {
    "use strict";
    function i(t, e) {
        if (!l.versionCheck || !l.versionCheck("1.10.8"))
            throw "DataTables RowReorder requires DataTables 1.10.8 or newer";
        if (this.c = v.extend(!0, {}, l.defaults.rowReorder, i.defaults, e), this.s = {
            bodyTop: null,
            dt: new l.Api(t),
            getDataFn: l.ext.oApi._fnGetObjectDataFn(this.c.dataSrc),
            middles: null,
            scroll: {},
            scrollInterval: null,
            setDataFn: l.ext.oApi._fnSetObjectDataFn(this.c.dataSrc),
            start: {
                top: 0,
                left: 0,
                offsetTop: 0,
                offsetLeft: 0,
                nodes: [],
                rowIndex: 0
            },
            windowHeight: 0,
            documentOuterHeight: 0,
            domCloneOuterHeight: 0,
            dropAllowed: !0
        }, this.dom = {
            clone: null,
            cloneParent: null,
            dtScroll: v("div.dataTables_scrollBody", this.s.dt.table().container())
        }, e = this.s.dt.settings()[0], t = e.rowreorder)
            return t;
        this.dom.dtScroll.length || (this.dom.dtScroll = v(this.s.dt.table().container(), "tbody")),
            (e.rowreorder = this)._constructor()
    }
    var l = v.fn.dataTable,
        t = (v.extend(i.prototype, {
            _constructor: function() {
                var r = this,
                    n = this.s.dt,
                    t = v(n.table().node());
                "static" === t.css("position") && t.css("position", "relative"),
                    v(n.table().container()).on("mousedown.rowReorder touchstart.rowReorder", this.c.selector, function(t) {
                        var e,
                            o;
                        if (r.c.enable)
                            return !!v(t.target).is(r.c.excludedChildren) || (e = v(this).closest("tr"), (o = n.row(e)).any() ? (r._emitEvent("pre-row-reorder", {
                                node: o.node(),
                                index: o.index()
                            }), r._mouseDown(t, e), !1) : void 0)
                    }),
                    n.on("destroy.rowReorder", function() {
                        v(n.table().container()).off(".rowReorder"),
                            n.off(".rowReorder")
                    }),
                    this._keyup = this._keyup.bind(this)
            },
            _cachePositions: function() {
                var t = this.s.dt,
                    r = v(t.table().node()).find("thead").outerHeight(),
                    e = v.unique(t.rows({
                        page: "current"
                    }).nodes().toArray()),
                    e = v.map(e, function(t, e) {
                        var o = v(t).position().top - r;
                        return (o + o + v(t).outerHeight()) / 2
                    });
                this.s.middles = e,
                    this.s.bodyTop = v(t.table().body()).offset().top,
                    this.s.windowHeight = v(d).height(),
                    this.s.documentOuterHeight = v(a).outerHeight(),
                    this.s.bodyArea = this._calcBodyArea()
            },
            _clone: function(t) {
                var e = this.s.dt,
                    e = v(e.table().node().cloneNode(!1)).addClass("dt-rowReorder-float").append("<tbody/>").append(t.clone(!1)),
                    o = t.outerWidth(),
                    r = t.outerHeight(),
                    n = v(v(this.s.dt.table().node()).parent()),
                    s = n.width(),
                    n = n.scrollLeft(),
                    i = t.children().map(function() {
                        return v(this).width()
                    }),
                    t = (e.width(o).height(r).find("tr").children().each(function(t) {
                        this.style.width = i[t] + "px"
                    }), v("<div>").addClass("dt-rowReorder-float-parent").width(s).append(e).appendTo("body").scrollLeft(n));
                this.dom.clone = e,
                    this.dom.cloneParent = t,
                    this.s.domCloneOuterHeight = e.outerHeight()
            },
            _clonePosition: function(t) {
                var e = this.s.start,
                    o = this._eventToPage(t, "Y") - e.top,
                    t = this._eventToPage(t, "X") - e.left,
                    r = this.c.snapX,
                    o = o + e.offsetTop,
                    r = !0 === r ? e.offsetLeft : "number" == typeof r ? e.offsetLeft + r : t + e.offsetLeft + this.dom.cloneParent.scrollLeft();
                o < 0 ? o = 0 : o + this.s.domCloneOuterHeight > this.s.documentOuterHeight && (o = this.s.documentOuterHeight - this.s.domCloneOuterHeight),
                    this.dom.cloneParent.css({
                        top: o,
                        left: r
                    })
            },
            _emitEvent: function(o, r) {
                var n;
                return this.s.dt.iterator("table", function(t, e) {
                    t = v(t.nTable).triggerHandler(o + ".dt", r);
                    t !== s && (n = t)
                }), n
            },
            _eventToPage: function(t, e) {
                return (-1 !== t.type.indexOf("touch") ? t.originalEvent.touches[0] : t)["page" + e]
            },
            _mouseDown: function(t, e) {
                var o = this,
                    r = this.s.dt,
                    n = this.s.start,
                    s = this.c.cancelable,
                    i = e.offset(),
                    i = (n.top = this._eventToPage(t, "Y"), n.left = this._eventToPage(t, "X"), n.offsetTop = i.top, n.offsetLeft = i.left, n.nodes = v.unique(r.rows({
                        page: "current"
                    }).nodes().toArray()), this._cachePositions(), this._clone(e), this._clonePosition(t), this._eventToPage(t, "Y") - this.s.bodyTop),
                    r = (n.rowIndex = this._calcRowIndexByPos(i), (this.dom.target = e).addClass("dt-rowReorder-moving"), v(a).on("mouseup.rowReorder touchend.rowReorder", function(t) {
                        o._mouseUp(t)
                    }).on("mousemove.rowReorder touchmove.rowReorder", function(t) {
                        o._mouseMove(t)
                    }), v(d).width() === v(a).width() && v(a.body).addClass("dt-rowReorder-noOverflow"), this.dom.dtScroll);
                this.s.scroll = {
                    windowHeight: v(d).height(),
                    windowWidth: v(d).width(),
                    dtTop: r.length ? r.offset().top : null,
                    dtLeft: r.length ? r.offset().left : null,
                    dtHeight: r.length ? r.outerHeight() : null,
                    dtWidth: r.length ? r.outerWidth() : null
                },
                s && v(a).on("keyup", this._keyup)
            },
            _mouseMove: function(t) {
                this._clonePosition(t);
                for (var e, o, r = this.s.start, n = this.c.cancelable, s = (n && (e = this.s.bodyArea, o = this._calcCloneParentArea(), this.s.dropAllowed = this._rectanglesIntersect(e, o), this.s.dropAllowed ? v(this.dom.cloneParent).removeClass("drop-not-allowed") : v(this.dom.cloneParent).addClass("drop-not-allowed")), this._eventToPage(t, "Y") - this.s.bodyTop), i = this.s.middles, d = null, a = 0, l = i.length; a < l; a++)
                    if (s < i[a]) {
                        d = a;
                        break
                    }
                null === d && (d = i.length),
                n && (this.s.dropAllowed || (d = r.rowIndex > this.s.lastInsert ? r.rowIndex + 1 : r.rowIndex), this.dom.target.toggleClass("dt-rowReorder-moving", this.s.dropAllowed)),
                    this._moveTargetIntoPosition(d),
                    this._shiftScroll(t)
            },
            _mouseUp: function(t) {
                var e = this,
                    o = this.s.dt,
                    r = this.c.dataSrc;
                if (this.s.dropAllowed) {
                    for (var n, s, i, d = this.s.start.nodes, a = v.unique(o.rows({
                        page: "current"
                    }).nodes().toArray()), l = {}, c = [], h = [], u = this.s.getDataFn, f = this.s.setDataFn, w = 0, p = d.length; w < p; w++)
                        d[w] !== a[w] && (n = o.row(a[w]).id(), s = o.row(a[w]).data(), i = o.row(d[w]).data(), n && (l[n] = u(i)), c.push({
                            node: a[w],
                            oldData: u(s),
                            newData: u(i),
                            newPosition: w,
                            oldPosition: v.inArray(a[w], d)
                        }), h.push(a[w]));
                    var g,
                        m = [c, {
                            dataSrc: r,
                            nodes: h,
                            values: l,
                            triggerRow: o.row(this.dom.target),
                            originalEvent: t
                        }];
                    !1 === this._emitEvent("row-reorder", m) ? e._cancel() : (this._cleanupDragging(), g = function() {
                        if (e.c.update) {
                            for (w = 0, p = c.length; w < p; w++) {
                                var t = o.row(c[w].node).data();
                                f(t, c[w].newData),
                                    o.columns().every(function() {
                                        this.dataSrc() === r && o.cell(c[w].node, this.index()).invalidate("data")
                                    })
                            }
                            e._emitEvent("row-reordered", m),
                                o.draw(!1)
                        }
                    }, this.c.editor ? (this.c.enable = !1, this.c.editor.edit(h, !1, v.extend({
                        submit: "changed"
                    }, this.c.formOptions)).multiSet(r, l).one("preSubmitCancelled.rowReorder", function() {
                        e.c.enable = !0,
                            e.c.editor.off(".rowReorder"),
                            o.draw(!1)
                    }).one("submitUnsuccessful.rowReorder", function() {
                        o.draw(!1)
                    }).one("submitSuccess.rowReorder", function() {
                        g()
                    }).one("submitComplete", function() {
                        e.c.enable = !0,
                            e.c.editor.off(".rowReorder")
                    }).submit()) : g())
                } else
                    e._cancel()
            },
            _moveTargetIntoPosition: function(t) {
                var e,
                    o,
                    r = this.s.dt;
                null !== this.s.lastInsert && this.s.lastInsert === t || (e = v.unique(r.rows({
                    page: "current"
                }).nodes().toArray()), o = "", o = t > this.s.lastInsert ? (this.dom.target.insertAfter(e[t - 1]), "after") : (this.dom.target.insertBefore(e[t]), "before"), this._cachePositions(), this.s.lastInsert = t, this._emitEvent("row-reorder-changed", {
                    insertPlacement: o,
                    insertPoint: t,
                    row: r.row(this.dom.target)
                }))
            },
            _cleanupDragging: function() {
                var t = this.c.cancelable;
                this.dom.clone.remove(),
                    this.dom.cloneParent.remove(),
                    this.dom.clone = null,
                    this.dom.cloneParent = null,
                    this.dom.target.removeClass("dt-rowReorder-moving"),
                    v(a).off(".rowReorder"),
                    v(a.body).removeClass("dt-rowReorder-noOverflow"),
                    clearInterval(this.s.scrollInterval),
                    this.s.scrollInterval = null,
                t && v(a).off("keyup", this._keyup)
            },
            _shiftScroll: function(t) {
                var e,
                    o,
                    r = this,
                    n = (this.s.dt, this.s.scroll),
                    s = !1,
                    i = t.pageY - a.body.scrollTop;
                i < v(d).scrollTop() + 65 ? e = -5 : i > n.windowHeight + v(d).scrollTop() - 65 && (e = 5),
                    null !== n.dtTop && t.pageY < n.dtTop + 65 ? o = -5 : null !== n.dtTop && t.pageY > n.dtTop + n.dtHeight - 65 && (o = 5),
                    e || o ? (n.windowVert = e, n.dtVert = o, s = !0) : this.s.scrollInterval && (clearInterval(this.s.scrollInterval), this.s.scrollInterval = null),
                !this.s.scrollInterval && s && (this.s.scrollInterval = setInterval(function() {
                    var t;
                    n.windowVert && (t = v(a).scrollTop(), v(a).scrollTop(t + n.windowVert), t !== v(a).scrollTop()) && (t = parseFloat(r.dom.cloneParent.css("top")), r.dom.cloneParent.css("top", t + n.windowVert)),
                    n.dtVert && (t = r.dom.dtScroll[0], n.dtVert) && (t.scrollTop += n.dtVert)
                }, 20))
            },
            _calcBodyArea: function(t) {
                var e = this.s.dt,
                    o = v(e.table().body()).offset();
                return {
                    left: o.left,
                    top: o.top,
                    right: o.left + v(e.table().body()).width(),
                    bottom: o.top + v(e.table().body()).height()
                }
            },
            _calcCloneParentArea: function(t) {
                this.s.dt;
                var e = v(this.dom.cloneParent).offset();
                return {
                    left: e.left,
                    top: e.top,
                    right: e.left + v(this.dom.cloneParent).width(),
                    bottom: e.top + v(this.dom.cloneParent).height()
                }
            },
            _rectanglesIntersect: function(t, e) {
                return !(t.left >= e.right || e.left >= t.right || t.top >= e.bottom || e.top >= t.bottom)
            },
            _calcRowIndexByPos: function(r) {
                var t = this.s.dt,
                    e = v.unique(t.rows({
                        page: "current"
                    }).nodes().toArray()),
                    n = -1,
                    s = v(t.table().node()).find("thead").outerHeight();
                return v.each(e, function(t, e) {
                    var o = v(e).position().top - s,
                        e = o + v(e).outerHeight();
                    o <= r && r <= e && (n = t)
                }), n
            },
            _keyup: function(t) {
                this.c.cancelable && 27 === t.which && (t.preventDefault(), this._cancel())
            },
            _cancel: function() {
                var t = this.s.start,
                    t = t.rowIndex > this.s.lastInsert ? t.rowIndex + 1 : t.rowIndex;
                this._moveTargetIntoPosition(t),
                    this._cleanupDragging(),
                    this._emitEvent("row-reorder-canceled", [this.s.start.rowIndex])
            }
        }), i.defaults = {
            dataSrc: 0,
            editor: null,
            enable: !0,
            formOptions: {},
            selector: "td:first-child",
            snapX: !1,
            update: !0,
            excludedChildren: "a",
            cancelable: !1
        }, v.fn.dataTable.Api);
    return t.register("rowReorder()", function() {
        return this
    }), t.register("rowReorder.enable()", function(e) {
        return e === s && (e = !0), this.iterator("table", function(t) {
            t.rowreorder && (t.rowreorder.c.enable = e)
        })
    }), t.register("rowReorder.disable()", function() {
        return this.iterator("table", function(t) {
            t.rowreorder && (t.rowreorder.c.enable = !1)
        })
    }), i.version = "1.4.1", v.fn.dataTable.RowReorder = i, v.fn.DataTable.RowReorder = i, v(a).on("init.dt.dtr", function(t, e, o) {
        var r,
            n;
        "dt" === t.namespace && (t = e.oInit.rowReorder, r = l.defaults.rowReorder, t || r) && (n = v.extend({}, t, r), !1 !== t) && new i(e, n)
    }), l
});

/*! Bootstrap 5 styling wrapper for RowReorder
 * © SpryMedia Ltd - datatables.net/license
 */
!function(t) {
    var o,
        r;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs5", "datatables.net-rowreorder"], function(e) {
        return t(e, window, document)
    }) : "object" == typeof exports ? (o = require("jquery"), r = function(e, n) {
        n.fn.dataTable || require("datatables.net-bs5")(e, n),
        n.fn.dataTable.RowReorder || require("datatables.net-rowreorder")(e, n)
    }, "undefined" == typeof window ? module.exports = function(e, n) {
        return e = e || window, n = n || o(e), r(e, n), t(n, 0, e.document)
    } : (r(window, o), module.exports = t(o, window, window.document))) : t(jQuery, window, document)
}(function(e, n, t, o) {
    "use strict";
    return e.fn.dataTable
});

/*! Scroller 2.2.0
 * © SpryMedia Ltd - datatables.net/license
 */
!function(o) {
    var e,
        l;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(s) {
        return o(s, window, document)
    }) : "object" == typeof exports ? (e = require("jquery"), l = function(s, t) {
        t.fn.dataTable || require("datatables.net")(s, t)
    }, "undefined" == typeof window ? module.exports = function(s, t) {
        return s = s || window, t = t || e(s), l(s, t), o(t, s, s.document)
    } : (l(window, e), module.exports = o(e, window, window.document))) : o(jQuery, window, document)
}(function(f, i, o, a) {
    "use strict";
    function l(s, t) {
        this instanceof l ? (t === a && (t = {}), s = f.fn.dataTable.Api(s), this.s = {
            dt: s.settings()[0],
            dtApi: s,
            tableTop: 0,
            tableBottom: 0,
            redrawTop: 0,
            redrawBottom: 0,
            autoHeight: !0,
            viewportRows: 0,
            stateTO: null,
            stateSaveThrottle: function() {},
            drawTO: null,
            heights: {
                jump: null,
                page: null,
                virtual: null,
                scroll: null,
                row: null,
                viewport: null,
                labelHeight: 0,
                xbar: 0
            },
            topRowFloat: 0,
            scrollDrawDiff: null,
            loaderVisible: !1,
            forceReposition: !1,
            baseRowTop: 0,
            baseScrollTop: 0,
            mousedown: !1,
            lastScrollTop: 0
        }, this.s = f.extend(this.s, l.oDefaults, t), this.s.heights.row = this.s.rowHeight, this.dom = {
            force: o.createElement("div"),
            label: f('<div class="dts_label">0</div>'),
            scroller: null,
            table: null,
            loader: null
        }, this.s.dt.oScroller || (this.s.dt.oScroller = this).construct()) : alert("Scroller warning: Scroller must be initialised with the 'new' keyword.")
    }
    var r = f.fn.dataTable,
        s = (f.extend(l.prototype, {
            measure: function(s) {
                this.s.autoHeight && this._calcRowHeight();
                var t = this.s.heights,
                    o = (t.row && (t.viewport = this._parseHeight(f(this.dom.scroller).css("max-height")), this.s.viewportRows = parseInt(t.viewport / t.row, 10) + 1, this.s.dt._iDisplayLength = this.s.viewportRows * this.s.displayBuffer), this.dom.label.outerHeight());
                t.xbar = this.dom.scroller.offsetHeight - this.dom.scroller.clientHeight,
                    t.labelHeight = o,
                s !== a && !s || this.s.dt.oInstance.fnDraw(!1)
            },
            pageInfo: function() {
                var s = this.s.dt,
                    t = this.dom.scroller.scrollTop,
                    s = s.fnRecordsDisplay(),
                    o = Math.ceil(this.pixelsToRow(t + this.s.heights.viewport, !1, this.s.ani));
                return {
                    start: Math.floor(this.pixelsToRow(t, !1, this.s.ani)),
                    end: s < o ? s - 1 : o - 1
                }
            },
            pixelsToRow: function(s, t, o) {
                s -= this.s.baseScrollTop,
                    o = o ? (this._domain("physicalToVirtual", this.s.baseScrollTop) + s) / this.s.heights.row : s / this.s.heights.row + this.s.baseRowTop;
                return t || t === a ? parseInt(o, 10) : o
            },
            rowToPixels: function(s, t, o) {
                s -= this.s.baseRowTop,
                    o = o ? this._domain("virtualToPhysical", this.s.baseScrollTop) : this.s.baseScrollTop;
                return o += s * this.s.heights.row, t || t === a ? parseInt(o, 10) : o
            },
            scrollToRow: function(s, t) {
                var o = this,
                    e = !1,
                    l = this.rowToPixels(s),
                    r = s - (this.s.displayBuffer - 1) / 2 * this.s.viewportRows;
                r < 0 && (r = 0),
                    (t = (l > this.s.redrawBottom || l < this.s.redrawTop) && this.s.dt._iDisplayStart !== r && (e = !0, l = this._domain("virtualToPhysical", s * this.s.heights.row), this.s.redrawTop < l) && l < this.s.redrawBottom ? !(this.s.forceReposition = !0) : t) === a || t ? (this.s.ani = e, f(this.dom.scroller).animate({
                        scrollTop: l
                    }, function() {
                        setTimeout(function() {
                            o.s.ani = !1
                        }, 250)
                    })) : f(this.dom.scroller).scrollTop(l)
            },
            construct: function() {
                var e,
                    l,
                    r = this,
                    s = this.s.dtApi;
                this.s.dt.oFeatures.bPaginate ? (this.dom.force.style.position = "relative", this.dom.force.style.top = "0px", this.dom.force.style.left = "0px", this.dom.force.style.width = "1px", this.dom.scroller = f("div." + this.s.dt.oClasses.sScrollBody, this.s.dt.nTableWrapper)[0], this.dom.scroller.appendChild(this.dom.force), this.dom.scroller.style.position = "relative", this.dom.table = f(">table", this.dom.scroller)[0], this.dom.table.style.position = "absolute", this.dom.table.style.top = "0px", this.dom.table.style.left = "0px", f(s.table().container()).addClass("dts DTS"), this.s.loadingIndicator && (this.dom.loader = f('<div class="dataTables_processing dts_loading">' + this.s.dt.oLanguage.sLoadingRecords + "</div>").css("display", "none"), f(this.dom.scroller.parentNode).css("position", "relative").append(this.dom.loader)), this.dom.label.appendTo(this.dom.scroller), this.s.heights.row && "auto" != this.s.heights.row && (this.s.autoHeight = !1), this.s.ingnoreScroll = !0, f(this.dom.scroller).on("scroll.dt-scroller", function(s) {
                    r._scroll.call(r)
                }), f(this.dom.scroller).on("touchstart.dt-scroller", function() {
                    r._scroll.call(r)
                }), f(this.dom.scroller).on("mousedown.dt-scroller", function() {
                    r.s.mousedown = !0
                }).on("mouseup.dt-scroller", function() {
                    r.s.labelVisible = !1,
                        r.s.mousedown = !1,
                        r.dom.label.css("display", "none")
                }), f(i).on("resize.dt-scroller", function() {
                    r.measure(!1),
                        r._info()
                }), e = !0, l = s.state.loaded(), s.on("stateSaveParams.scroller", function(s, t, o) {
                    e && l ? (o.scroller = l.scroller, e = !1, o.scroller && (r.s.lastScrollTop = o.scroller.scrollTop)) : o.scroller = {
                        topRow: r.s.topRowFloat,
                        baseScrollTop: r.s.baseScrollTop,
                        baseRowTop: r.s.baseRowTop,
                        scrollTop: r.s.lastScrollTop
                    }
                }), s.on("stateLoadParams.scroller", function(s, t, o) {
                    o.scroller !== a && r.scrollToRow(o.scroller.topRow)
                }), l && l.scroller && (this.s.topRowFloat = l.scroller.topRow, this.s.baseScrollTop = l.scroller.baseScrollTop, this.s.baseRowTop = l.scroller.baseRowTop), this.measure(!1), r.s.stateSaveThrottle = r.s.dt.oApi._fnThrottle(function() {
                    r.s.dtApi.state.save()
                }, 500), s.on("init.scroller", function() {
                    r.measure(!1),
                        r.s.scrollType = "jump",
                        r._draw(),
                        s.on("draw.scroller", function() {
                            r._draw()
                        })
                }), s.on("preDraw.dt.scroller", function() {
                    r._scrollForce()
                }), s.on("destroy.scroller", function() {
                    f(i).off("resize.dt-scroller"),
                        f(r.dom.scroller).off(".dt-scroller"),
                        f(r.s.dt.nTable).off(".scroller"),
                        f(r.s.dt.nTableWrapper).removeClass("DTS"),
                        f("div.DTS_Loading", r.dom.scroller.parentNode).remove(),
                        r.dom.table.style.position = "",
                        r.dom.table.style.top = "",
                        r.dom.table.style.left = ""
                })) : this.s.dt.oApi._fnLog(this.s.dt, 0, "Pagination must be enabled for Scroller")
            },
            _calcRowHeight: function() {
                var s = this.s.dt,
                    t = s.nTable,
                    o = t.cloneNode(!1),
                    e = f("<tbody/>").appendTo(o),
                    l = f('<div class="' + s.oClasses.sWrapper + ' DTS"><div class="' + s.oClasses.sScrollWrapper + '"><div class="' + s.oClasses.sScrollBody + '"></div></div></div>'),
                    r = (f("tbody tr:lt(4)", t).clone().appendTo(e), f("tr", e).length);
                if (1 === r)
                    e.prepend("<tr><td>&#160;</td></tr>"),
                        e.append("<tr><td>&#160;</td></tr>");
                else
                    for (; r < 3; r++)
                        e.append("<tr><td>&#160;</td></tr>");
                f("div." + s.oClasses.sScrollBody, l).append(o);
                s = this.s.dt.nHolding || t.parentNode;
                f(s).is(":visible") || (s = "body"),
                    l.find("input").removeAttr("name"),
                    l.appendTo(s),
                    this.s.heights.row = f("tr", e).eq(1).outerHeight(),
                    l.remove()
            },
            _draw: function() {
                var s = this,
                    t = this.s.heights,
                    o = this.dom.scroller.scrollTop,
                    e = f(this.s.dt.nTable).height(),
                    l = this.s.dt._iDisplayStart,
                    r = this.s.dt._iDisplayLength,
                    i = this.s.dt.fnRecordsDisplay(),
                    a = o + t.viewport,
                    n = (this.s.skip = !0, !this.s.dt.bSorted && !this.s.dt.bFiltered || 0 !== l || this.s.dt._drawHold || (this.s.topRowFloat = 0), o = "jump" === this.s.scrollType ? this._domain("virtualToPhysical", this.s.topRowFloat * t.row) : o, this.s.baseScrollTop = o, this.s.baseRowTop = this.s.topRowFloat, o - (this.s.topRowFloat - l) * t.row),
                    l = (0 === l ? n = 0 : i <= l + r ? n = t.scroll - e : n + e < a && (this.s.baseScrollTop += 1 + ((i = a - e) - n), n = i), this.dom.table.style.top = n + "px", this.s.tableTop = n, this.s.tableBottom = e + this.s.tableTop, (o - this.s.tableTop) * this.s.boundaryScale);
                this.s.redrawTop = o - l,
                    this.s.redrawBottom = o + l > t.scroll - t.viewport - t.row ? t.scroll - t.viewport - t.row : o + l,
                    this.s.skip = !1,
                s.s.ingnoreScroll && (this.s.dt.oFeatures.bStateSave && null !== this.s.dt.oLoadedState && void 0 !== this.s.dt.oLoadedState.scroller ? ((r = !(!this.s.dt.sAjaxSource && !s.s.dt.ajax || this.s.dt.oFeatures.bServerSide)) && 2 <= this.s.dt.iDraw || !r && 1 <= this.s.dt.iDraw) && setTimeout(function() {
                    f(s.dom.scroller).scrollTop(s.s.dt.oLoadedState.scroller.scrollTop),
                        setTimeout(function() {
                            s.s.ingnoreScroll = !1
                        }, 0)
                }, 0) : s.s.ingnoreScroll = !1),
                this.s.dt.oFeatures.bInfo && setTimeout(function() {
                    s._info.call(s)
                }, 0),
                    f(this.s.dt.nTable).triggerHandler("position.dts.dt", n),
                this.dom.loader && this.s.loaderVisible && (this.dom.loader.css("display", "none"), this.s.loaderVisible = !1)
            },
            _domain: function(s, t) {
                var o,
                    e = this.s.heights,
                    l = 1e4;
                return e.virtual === e.scroll || t < l ? t : "virtualToPhysical" === s && t >= e.virtual - l ? (o = e.virtual - t, e.scroll - o) : "physicalToVirtual" === s && t >= e.scroll - l ? (o = e.scroll - t, e.virtual - o) : (e = l - (o = (e.virtual - l - l) / (e.scroll - l - l)) * l, "virtualToPhysical" === s ? (t - e) / o : o * t + e)
            },
            _info: function() {
                if (this.s.dt.oFeatures.bInfo) {
                    var s = this.s.dt,
                        t = s.oLanguage,
                        o = this.dom.scroller.scrollTop,
                        e = Math.floor(this.pixelsToRow(o, !1, this.s.ani) + 1),
                        l = s.fnRecordsTotal(),
                        r = s.fnRecordsDisplay(),
                        o = Math.ceil(this.pixelsToRow(o + this.s.heights.viewport, !1, this.s.ani)),
                        o = r < o ? r : o,
                        i = s.fnFormatNumber(e),
                        a = s.fnFormatNumber(o),
                        n = s.fnFormatNumber(l),
                        h = s.fnFormatNumber(r),
                        c = 0 === s.fnRecordsDisplay() && s.fnRecordsDisplay() == s.fnRecordsTotal() ? t.sInfoEmpty + t.sInfoPostFix : 0 === s.fnRecordsDisplay() ? t.sInfoEmpty + " " + t.sInfoFiltered.replace("_MAX_", n) + t.sInfoPostFix : s.fnRecordsDisplay() == s.fnRecordsTotal() ? t.sInfo.replace("_START_", i).replace("_END_", a).replace("_MAX_", n).replace("_TOTAL_", h) + t.sInfoPostFix : t.sInfo.replace("_START_", i).replace("_END_", a).replace("_MAX_", n).replace("_TOTAL_", h) + " " + t.sInfoFiltered.replace("_MAX_", s.fnFormatNumber(s.fnRecordsTotal())) + t.sInfoPostFix,
                        i = t.fnInfoCallback,
                        d = (i && (c = i.call(s.oInstance, s, e, o, l, r, c)), s.aanFeatures.i);
                    if (void 0 !== d)
                        for (var p = 0, u = d.length; p < u; p++)
                            f(d[p]).html(c);
                    f(s.nTable).triggerHandler("info.dt")
                }
            },
            _parseHeight: function(s) {
                var t,
                    o,
                    s = /^([+-]?(?:\d+(?:\.\d+)?|\.\d+))(px|em|rem|vh)$/.exec(s);
                return null !== s && (o = parseFloat(s[1]), "px" === (s = s[2]) ? t = o : "vh" === s ? t = o / 100 * f(i).height() : "rem" === s ? t = o * parseFloat(f(":root").css("font-size")) : "em" === s && (t = o * parseFloat(f("body").css("font-size"))), t) || 0
            },
            _scroll: function() {
                var s,
                    t = this,
                    o = this.s.heights,
                    e = this.dom.scroller.scrollTop;
                this.s.skip || this.s.ingnoreScroll || e !== this.s.lastScrollTop && (this.s.dt.bFiltered || this.s.dt.bSorted ? this.s.lastScrollTop = 0 : (this._info(), clearTimeout(this.s.stateTO), this.s.stateTO = setTimeout(function() {
                    t.s.dtApi.state.save()
                }, 250), this.s.scrollType = Math.abs(e - this.s.lastScrollTop) > o.viewport ? "jump" : "cont", this.s.topRowFloat = "cont" === this.s.scrollType ? this.pixelsToRow(e, !1, !1) : this._domain("physicalToVirtual", e) / o.row, this.s.topRowFloat < 0 && (this.s.topRowFloat = 0), this.s.forceReposition || e < this.s.redrawTop || e > this.s.redrawBottom ? (s = Math.ceil((this.s.displayBuffer - 1) / 2 * this.s.viewportRows), s = parseInt(this.s.topRowFloat, 10) - s, this.s.forceReposition = !1, s <= 0 ? s = 0 : s + this.s.dt._iDisplayLength > this.s.dt.fnRecordsDisplay() ? (s = this.s.dt.fnRecordsDisplay() - this.s.dt._iDisplayLength) < 0 && (s = 0) : s % 2 != 0 && s++, (this.s.targetTop = s) != this.s.dt._iDisplayStart && (this.s.tableTop = f(this.s.dt.nTable).offset().top, this.s.tableBottom = f(this.s.dt.nTable).height() + this.s.tableTop, s = function() {
                    t.s.dt._iDisplayStart = t.s.targetTop,
                        t.s.dt.oApi._fnDraw(t.s.dt)
                }, this.s.dt.oFeatures.bServerSide ? (this.s.forceReposition = !0, clearTimeout(this.s.drawTO), this.s.drawTO = setTimeout(s, this.s.serverWait)) : s(), this.dom.loader) && !this.s.loaderVisible && (this.dom.loader.css("display", "block"), this.s.loaderVisible = !0)) : this.s.topRowFloat = this.pixelsToRow(e, !1, !0), this.s.lastScrollTop = e, this.s.stateSaveThrottle(), "jump" === this.s.scrollType && this.s.mousedown && (this.s.labelVisible = !0), this.s.labelVisible && (s = (o.viewport - o.labelHeight - o.xbar) / o.scroll, this.dom.label.html(this.s.dt.fnFormatNumber(parseInt(this.s.topRowFloat, 10) + 1)).css("top", e + e * s).css("display", "block"))))
            },
            _scrollForce: function() {
                var s = this.s.heights;
                s.virtual = s.row * this.s.dt.fnRecordsDisplay(),
                    s.scroll = s.virtual,
                1e6 < s.scroll && (s.scroll = 1e6),
                    this.dom.force.style.height = s.scroll > this.s.heights.row ? s.scroll + "px" : this.s.heights.row + "px"
            }
        }), l.oDefaults = l.defaults = {
            boundaryScale: .5,
            displayBuffer: 9,
            loadingIndicator: !1,
            rowHeight: "auto",
            serverWait: 200
        }, l.version = "2.2.0", f(o).on("preInit.dt.dtscroller", function(s, t) {
            var o,
                e;
            "dt" === s.namespace && (s = t.oInit.scroller, o = r.defaults.scroller, s || o) && (e = f.extend({}, s, o), !1 !== s) && new l(t, e)
        }), f.fn.dataTable.Scroller = l, f.fn.DataTable.Scroller = l, f.fn.dataTable.Api);
    return s.register("scroller()", function() {
        return this
    }), s.register("scroller().rowToPixels()", function(s, t, o) {
        var e = this.context;
        if (e.length && e[0].oScroller)
            return e[0].oScroller.rowToPixels(s, t, o)
    }), s.register("scroller().pixelsToRow()", function(s, t, o) {
        var e = this.context;
        if (e.length && e[0].oScroller)
            return e[0].oScroller.pixelsToRow(s, t, o)
    }), s.register(["scroller().scrollToRow()", "scroller.toPosition()"], function(t, o) {
        return this.iterator("table", function(s) {
            s.oScroller && s.oScroller.scrollToRow(t, o)
        }), this
    }), s.register("row().scrollTo()", function(o) {
        var e = this;
        return this.iterator("row", function(s, t) {
            s.oScroller && (t = e.rows({
                order: "applied",
                search: "applied"
            }).indexes().indexOf(t), s.oScroller.scrollToRow(t, o))
        }), this
    }), s.register("scroller.measure()", function(t) {
        return this.iterator("table", function(s) {
            s.oScroller && s.oScroller.measure(t)
        }), this
    }), s.register("scroller.page()", function() {
        var s = this.context;
        if (s.length && s[0].oScroller)
            return s[0].oScroller.pageInfo()
    }), r
});

/*! Bootstrap 5 styling wrapper for Scroller
 * © SpryMedia Ltd - datatables.net/license
 */
!function(t) {
    var o,
        d;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs5", "datatables.net-scroller"], function(e) {
        return t(e, window, document)
    }) : "object" == typeof exports ? (o = require("jquery"), d = function(e, n) {
        n.fn.dataTable || require("datatables.net-bs5")(e, n),
        n.fn.dataTable.Scroller || require("datatables.net-scroller")(e, n)
    }, "undefined" == typeof window ? module.exports = function(e, n) {
        return e = e || window, n = n || o(e), d(e, n), t(n, 0, e.document)
    } : (d(window, o), module.exports = t(o, window, window.document))) : t(jQuery, window, document)
}(function(e, n, t, o) {
    "use strict";
    return e.fn.dataTable
});

/*! SearchBuilder 1.6.0
 * ©SpryMedia Ltd - datatables.net/license/mit
 */
!function(e) {
    var n,
        s;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return e(t, window, document)
    }) : "object" == typeof exports ? (n = require("jquery"), s = function(t, i) {
        i.fn.dataTable || require("datatables.net")(t, i)
    }, "undefined" == typeof window ? module.exports = function(t, i) {
        return t = t || window, i = i || n(t), s(t, i), e(i, t, t.document)
    } : (s(window, n), module.exports = e(n, window, window.document))) : e(jQuery, window, document)
}(function(s, u, t, V) {
    "use strict";
    var I,
        c,
        a,
        d,
        l,
        h,
        p,
        m,
        e,
        i,
        r = s.fn.dataTable;
    function o() {
        return u.moment
    }
    function f() {
        return u.luxon
    }
    function w(t, i, e, n, s, r, o) {
        void 0 === n && (n = 0),
        void 0 === s && (s = 1),
        void 0 === r && (r = V),
        void 0 === o && (o = !1);
        var a = this;
        if (!c || !c.versionCheck || !c.versionCheck("1.10.0"))
            throw new Error("SearchPane requires DataTables 1.10 or newer");
        this.classes = I.extend(!0, {}, w.classes),
            this.c = I.extend(!0, {}, w.defaults, I.fn.dataTable.ext.searchBuilder, i);
        i = this.c.i18n;
        if (this.s = {
            condition: V,
            conditions: {},
            data: V,
            dataIdx: -1,
            dataPoints: [],
            dateFormat: !1,
            depth: s,
            dt: t,
            filled: !1,
            index: n,
            liveSearch: o,
            origData: V,
            preventRedraw: !1,
            serverData: r,
            topGroup: e,
            type: "",
            value: []
        }, this.dom = {
            buttons: I("<div/>").addClass(this.classes.buttonContainer),
            condition: I("<select disabled/>").addClass(this.classes.condition).addClass(this.classes.dropDown).addClass(this.classes.italic).attr("autocomplete", "hacking"),
            conditionTitle: I('<option value="" disabled selected hidden/>').html(this.s.dt.i18n("searchBuilder.condition", i.condition)),
            container: I("<div/>").addClass(this.classes.container),
            data: I("<select/>").addClass(this.classes.data).addClass(this.classes.dropDown).addClass(this.classes.italic),
            dataTitle: I('<option value="" disabled selected hidden/>').html(this.s.dt.i18n("searchBuilder.data", i.data)),
            defaultValue: I("<select disabled/>").addClass(this.classes.value).addClass(this.classes.dropDown).addClass(this.classes.select).addClass(this.classes.italic),
            delete: I("<button/>").html(this.s.dt.i18n("searchBuilder.delete", i.delete)).addClass(this.classes.delete).addClass(this.classes.button).attr("title", this.s.dt.i18n("searchBuilder.deleteTitle", i.deleteTitle)).attr("type", "button"),
            inputCont: I("<div/>").addClass(this.classes.inputCont),
            left: I("<button/>").html(this.s.dt.i18n("searchBuilder.left", i.left)).addClass(this.classes.left).addClass(this.classes.button).attr("title", this.s.dt.i18n("searchBuilder.leftTitle", i.leftTitle)).attr("type", "button"),
            right: I("<button/>").html(this.s.dt.i18n("searchBuilder.right", i.right)).addClass(this.classes.right).addClass(this.classes.button).attr("title", this.s.dt.i18n("searchBuilder.rightTitle", i.rightTitle)).attr("type", "button"),
            value: [I("<select disabled/>").addClass(this.classes.value).addClass(this.classes.dropDown).addClass(this.classes.italic).addClass(this.classes.select)],
            valueTitle: I('<option value="--valueTitle--" disabled selected hidden/>').html(this.s.dt.i18n("searchBuilder.value", i.value))
        }, this.c.greyscale) {
            this.dom.data.addClass(this.classes.greyscale),
                this.dom.condition.addClass(this.classes.greyscale),
                this.dom.defaultValue.addClass(this.classes.greyscale);
            for (var d = 0, l = this.dom.value; d < l.length; d++)
                l[d].addClass(this.classes.greyscale)
        }
        return I(u).on("resize.dtsb", c.util.throttle(function() {
            a.s.topGroup.trigger("dtsb-redrawLogic")
        })), this._buildCriteria(), this
    }
    function g(t, i, e, n, s, r, o) {
        if (void 0 === n && (n = 0), void 0 === s && (s = !1), void 0 === r && (r = 1), void 0 === o && (o = V), d && d.versionCheck && d.versionCheck("1.10.0"))
            return this.classes = a.extend(!0, {}, g.classes), this.c = a.extend(!0, {}, g.defaults, i), this.s = {
                criteria: [],
                depth: r,
                dt: t,
                index: n,
                isChild: s,
                logic: V,
                opts: i,
                preventRedraw: !1,
                serverData: o,
                toDrop: V,
                topGroup: e
            }, this.dom = {
                add: a("<button/>").addClass(this.classes.add).addClass(this.classes.button).attr("type", "button"),
                clear: a("<button>&times</button>").addClass(this.classes.button).addClass(this.classes.clearGroup).attr("type", "button"),
                container: a("<div/>").addClass(this.classes.group),
                logic: a("<button><div/></button>").addClass(this.classes.logic).addClass(this.classes.button).attr("type", "button"),
                logicContainer: a("<div/>").addClass(this.classes.logicContainer),
                search: a("<button/>").addClass(this.classes.search).addClass(this.classes.button).attr("type", "button").css("display", "none")
            }, this.s.topGroup === V && (this.s.topGroup = this.dom.container), this._setup(), this;
        throw new Error("SearchBuilder requires DataTables 1.10 or newer")
    }
    function n(t, i) {
        var s = this;
        if (!p || !p.versionCheck || !p.versionCheck("1.10.0"))
            throw new Error("SearchBuilder requires DataTables 1.10 or newer");
        t = new p.Api(t);
        if (this.classes = h.extend(!0, {}, n.classes), this.c = h.extend(!0, {}, n.defaults, i), this.dom = {
            clearAll: h('<button type="button">' + t.i18n("searchBuilder.clearAll", this.c.i18n.clearAll) + "</button>").addClass(this.classes.clearAll).addClass(this.classes.button).attr("type", "button"),
            container: h("<div/>").addClass(this.classes.container),
            title: h("<div/>").addClass(this.classes.title),
            titleRow: h("<div/>").addClass(this.classes.titleRow),
            topGroup: V
        }, this.s = {
            dt: t,
            opts: i,
            search: V,
            serverData: V,
            topGroup: V
        }, t.settings()[0]._searchBuilder === V)
            return (t.settings()[0]._searchBuilder = this).s.dt.page.info().serverSide && (this.s.dt.on("preXhr.dtsb", function(t, i, e) {
                var n = s.s.dt.state.loaded();
                n && n.searchBuilder && (e.searchBuilder = s._collapseArray(n.searchBuilder))
            }), this.s.dt.on("xhr.dtsb", function(t, i, e) {
                e && e.searchBuilder && e.searchBuilder.options && (s.s.serverData = e.searchBuilder.options)
            })), this.s.dt.settings()[0]._bInitComplete ? this._setUp() : t.one("init.dt", function() {
                s._setUp()
            }), this
    }
    function v(t, i) {
        t = new r.Api(t),
            i = i || t.init().searchBuilder || r.defaults.searchBuilder;
        return new e(t, i).getNode()
    }
    return w._escapeHTML = function(t) {
        return t.toString().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    }, w.prototype.doSearch = function() {
        this.c.liveSearch && this.s.dt.draw()
    }, w.parseNumFmt = function(t) {
        return +t.replace(/(?!^-)[^0-9.]/g, "")
    }, w.prototype.updateArrows = function(t) {
        void 0 === t && (t = !1),
            this.dom.container.children().detach(),
            this.dom.container.append(this.dom.data).append(this.dom.condition).append(this.dom.inputCont),
            this.setListeners(),
        this.dom.value[0] !== V && this.dom.value[0].trigger("dtsb-inserted");
        for (var i = 1; i < this.dom.value.length; i++)
            this.dom.inputCont.append(this.dom.value[i]),
                this.dom.value[i].trigger("dtsb-inserted");
        1 < this.s.depth && this.dom.buttons.append(this.dom.left),
            (!1 === this.c.depthLimit || this.s.depth < this.c.depthLimit) && t ? this.dom.buttons.append(this.dom.right) : this.dom.right.remove(),
            this.dom.buttons.append(this.dom.delete),
            this.dom.container.append(this.dom.buttons)
    }, w.prototype.destroy = function() {
        this.dom.data.off(".dtsb"),
            this.dom.condition.off(".dtsb"),
            this.dom.delete.off(".dtsb");
        for (var t = 0, i = this.dom.value; t < i.length; t++)
            i[t].off(".dtsb");
        this.dom.container.remove()
    }, w.prototype.search = function(t, i) {
        var e = this.s.conditions[this.s.condition];
        if (this.s.condition !== V && e !== V) {
            var n = t[this.s.dataIdx];
            if (this.s.type.includes("num") && ("" !== this.s.dt.settings()[0].oLanguage.sDecimal || "" !== this.s.dt.settings()[0].oLanguage.sThousands)) {
                var s = [t[this.s.dataIdx]];
                if ("" !== this.s.dt.settings()[0].oLanguage.sDecimal && (s = t[this.s.dataIdx].split(this.s.dt.settings()[0].oLanguage.sDecimal)), "" !== this.s.dt.settings()[0].oLanguage.sThousands)
                    for (var r = 0; r < s.length; r++)
                        s[r] = s[r].replace(this.s.dt.settings()[0].oLanguage.sThousands, ",");
                n = s.join(".")
            }
            if ("filter" !== this.c.orthogonal.search && (n = (t = this.s.dt.settings()[0]).oApi._fnGetCellData(t, i, this.s.dataIdx, "string" == typeof this.c.orthogonal ? this.c.orthogonal : this.c.orthogonal.search)), "array" === this.s.type) {
                (n = Array.isArray(n) ? n : [n]).sort();
                for (var o = 0, a = n; o < a.length; o++) {
                    var d = a[o];
                    d && "string" == typeof d && (d = d.replace(/[\r\n\u2028]/g, " "))
                }
            } else
                null !== n && "string" == typeof n && (n = n.replace(/[\r\n\u2028]/g, " "));
            return this.s.type.includes("html") && "string" == typeof n && (n = n.replace(/(<([^>]+)>)/gi, "")), e.search(n = null === n ? "" : n, this.s.value, this)
        }
    }, w.prototype.getDetails = function(t) {
        if (void 0 === t && (t = !1), null === this.s.type || !this.s.type.includes("num") || "" === this.s.dt.settings()[0].oLanguage.sDecimal && "" === this.s.dt.settings()[0].oLanguage.sThousands) {
            if (null !== this.s.type && t)
                if (this.s.type.includes("date") || this.s.type.includes("time"))
                    for (i = 0; i < this.s.value.length; i++)
                        null === this.s.value[i].match(/^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/g) && (this.s.value[i] = "");
                else if (this.s.type.includes("moment"))
                    for (i = 0; i < this.s.value.length; i++)
                        this.s.value[i] && 0 < this.s.value[i].length && o()(this.s.value[i], this.s.dateFormat, !0).isValid() && (this.s.value[i] = o()(this.s.value[i], this.s.dateFormat).format("YYYY-MM-DD HH:mm:ss"));
                else if (this.s.type.includes("luxon"))
                    for (i = 0; i < this.s.value.length; i++)
                        this.s.value[i] && 0 < this.s.value[i].length && null === f().DateTime.fromFormat(this.s.value[i], this.s.dateFormat).invalid && (this.s.value[i] = f().DateTime.fromFormat(this.s.value[i], this.s.dateFormat).toFormat("yyyy-MM-dd HH:mm:ss"))
        } else
            for (var i = 0; i < this.s.value.length; i++) {
                var e = [this.s.value[i].toString()];
                if ("" !== this.s.dt.settings()[0].oLanguage.sDecimal && (e = this.s.value[i].split(this.s.dt.settings()[0].oLanguage.sDecimal)), "" !== this.s.dt.settings()[0].oLanguage.sThousands)
                    for (var n = 0; n < e.length; n++)
                        e[n] = e[n].replace(this.s.dt.settings()[0].oLanguage.sThousands, ",");
                this.s.value[i] = e.join(".")
            }
        if (this.s.type.includes("num") && this.s.dt.page.info().serverSide)
            for (i = 0; i < this.s.value.length; i++)
                this.s.value[i] = this.s.value[i].replace(/[^0-9.\-]/g, "");
        return {
            condition: this.s.condition,
            data: this.s.data,
            origData: this.s.origData,
            type: this.s.type,
            value: this.s.value.map(function(t) {
                return null !== t && t !== V ? t.toString() : t
            })
        }
    }, w.prototype.getNode = function() {
        return this.dom.container
    }, w.prototype.populate = function() {
        this._populateData(),
        -1 !== this.s.dataIdx && (this._populateCondition(), this.s.condition !== V) && this._populateValue()
    }, w.prototype.rebuild = function(t) {
        var i,
            e,
            n,
            s = !1;
        if (this._populateData(), t.data !== V && (e = this.classes.italic, n = this.dom.data, this.dom.data.children("option").each(function() {
            !s && (I(this).text() === t.data || t.origData && I(this).prop("origData") === t.origData) ? (I(this).prop("selected", !0), n.removeClass(e), s = !0, i = parseInt(I(this).val(), 10)) : I(this).removeProp("selected")
        })), s) {
            this.s.data = t.data,
                this.s.origData = t.origData,
                this.s.dataIdx = i,
                this.c.orthogonal = this._getOptions().orthogonal,
                this.dom.dataTitle.remove(),
                this._populateCondition(),
                this.dom.conditionTitle.remove();
            for (var r = void 0, o = this.dom.condition.children("option"), a = 0; a < o.length; a++) {
                var d = I(o[a]);
                t.condition !== V && d.val() === t.condition && "string" == typeof t.condition ? (d.prop("selected", !0), r = d.val()) : d.removeProp("selected")
            }
            if (this.s.condition = r, this.s.condition !== V) {
                this.dom.conditionTitle.removeProp("selected"),
                    this.dom.conditionTitle.remove(),
                    this.dom.condition.removeClass(this.classes.italic);
                for (a = 0; a < o.length; a++)
                    (d = I(o[a])).val() !== this.s.condition && d.removeProp("selected");
                this._populateValue(t)
            } else
                this.dom.conditionTitle.prependTo(this.dom.condition).prop("selected", !0)
        }
    }, w.prototype.setListeners = function() {
        var l = this;
        this.dom.data.unbind("change").on("change.dtsb", function() {
            l.dom.dataTitle.removeProp("selected");
            for (var t = l.dom.data.children("option." + l.classes.option), i = 0; i < t.length; i++) {
                var e = I(t[i]);
                e.val() === l.dom.data.val() ? (l.dom.data.removeClass(l.classes.italic), e.prop("selected", !0), l.s.dataIdx = +e.val(), l.s.data = e.text(), l.s.origData = e.prop("origData"), l.c.orthogonal = l._getOptions().orthogonal, l._clearCondition(), l._clearValue(), l._populateCondition(), l.s.filled && (l.s.filled = !1, l.doSearch(), l.setListeners()), l.s.dt.state.save()) : e.removeProp("selected")
            }
        }),
            this.dom.condition.unbind("change").on("change.dtsb", function() {
                l.dom.conditionTitle.removeProp("selected");
                for (var t = l.dom.condition.children("option." + l.classes.option), i = 0; i < t.length; i++) {
                    var e = I(t[i]);
                    if (e.val() === l.dom.condition.val()) {
                        l.dom.condition.removeClass(l.classes.italic),
                            e.prop("selected", !0);
                        for (var n = e.val(), s = 0, r = Object.keys(l.s.conditions); s < r.length; s++)
                            if (r[s] === n) {
                                l.s.condition = n;
                                break
                            }
                        l._clearValue(),
                            l._populateValue();
                        for (var o = 0, a = l.dom.value; o < a.length; o++) {
                            var d = a[o];
                            l.s.filled && d !== V && 0 !== l.dom.inputCont.has(d[0]).length && (l.s.filled = !1, l.doSearch(), l.setListeners())
                        }
                        (0 === l.dom.value.length || 1 === l.dom.value.length && l.dom.value[0] === V) && l.doSearch()
                    } else
                        e.removeProp("selected")
                }
            })
    }, w.prototype.setupButtons = function() {
        550 < u.innerWidth ? (this.dom.container.removeClass(this.classes.vertical), this.dom.buttons.css("left", null), this.dom.buttons.css("top", null)) : (this.dom.container.addClass(this.classes.vertical), this.dom.buttons.css("left", this.dom.data.innerWidth()), this.dom.buttons.css("top", this.dom.data.position().top))
    }, w.prototype._buildCriteria = function() {
        this.dom.data.append(this.dom.dataTitle),
            this.dom.condition.append(this.dom.conditionTitle),
            this.dom.container.append(this.dom.data).append(this.dom.condition),
            this.dom.inputCont.empty();
        for (var t = 0, i = this.dom.value; t < i.length; t++) {
            var e = i[t];
            e.append(this.dom.valueTitle),
                this.dom.inputCont.append(e)
        }
        this.dom.buttons.append(this.dom.delete).append(this.dom.right),
            this.dom.container.append(this.dom.inputCont).append(this.dom.buttons),
            this.setListeners()
    }, w.prototype._clearCondition = function() {
        this.dom.condition.empty(),
            this.dom.conditionTitle.prop("selected", !0).attr("disabled", "true"),
            this.dom.condition.prepend(this.dom.conditionTitle).prop("selectedIndex", 0),
            this.s.conditions = {},
            this.s.condition = V
    }, w.prototype._clearValue = function() {
        if (this.s.condition !== V) {
            if (0 < this.dom.value.length && this.dom.value[0] !== V)
                for (var t = 0, i = this.dom.value; t < i.length; t++)
                    !function(t) {
                        t !== V && setTimeout(function() {
                            t.remove()
                        }, 50)
                    }(i[t]);
            if (this.dom.value = [].concat(this.s.conditions[this.s.condition].init(this, w.updateListener)), 0 < this.dom.value.length && this.dom.value[0] !== V) {
                this.dom.inputCont.empty().append(this.dom.value[0]).insertAfter(this.dom.condition),
                    this.dom.value[0].trigger("dtsb-inserted");
                for (var e = 1; e < this.dom.value.length; e++)
                    this.dom.inputCont.append(this.dom.value[e]),
                        this.dom.value[e].trigger("dtsb-inserted")
            }
        } else {
            for (var n = 0, s = this.dom.value; n < s.length; n++)
                !function(t) {
                    t !== V && setTimeout(function() {
                        t.remove()
                    }, 50)
                }(s[n]);
            this.dom.valueTitle.prop("selected", !0),
                this.dom.defaultValue.append(this.dom.valueTitle).insertAfter(this.dom.condition)
        }
        this.s.value = [],
            this.dom.value = [I("<select disabled/>").addClass(this.classes.value).addClass(this.classes.dropDown).addClass(this.classes.italic).addClass(this.classes.select).append(this.dom.valueTitle.clone())]
    }, w.prototype._getOptions = function() {
        var t = this.s.dt;
        return I.extend(!0, {}, w.defaults, t.settings()[0].aoColumns[this.s.dataIdx].searchBuilder)
    }, w.prototype._populateCondition = function() {
        var t = [],
            i = Object.keys(this.s.conditions).length,
            e = this.s.dt.settings()[0].aoColumns,
            n = +this.dom.data.children("option:selected").val();
        if (0 === i) {
            this.s.type = this.s.dt.columns().type().toArray()[n],
            e !== V && ((s = e[n]).searchBuilderType !== V && null !== s.searchBuilderType ? this.s.type = s.searchBuilderType : this.s.type !== V && null !== this.s.type || (this.s.type = s.sType)),
            null !== this.s.type && this.s.type !== V || (I.fn.dataTable.ext.oApi._fnColumnTypes(this.s.dt.settings()[0]), this.s.type = this.s.dt.columns().type().toArray()[n]),
                this.dom.condition.removeAttr("disabled").empty().append(this.dom.conditionTitle).addClass(this.classes.italic),
                this.dom.conditionTitle.prop("selected", !0);
            var s = this.s.dt.settings()[0].oLanguage.sDecimal,
                r = ("" !== s && this.s.type.indexOf(s) === this.s.type.length - s.length && (this.s.type.includes("num-fmt") || this.s.type.includes("num")) && (this.s.type = this.s.type.replace(s, "")), this.c.conditions[this.s.type] !== V ? this.c.conditions[this.s.type] : this.s.type.includes("moment") ? this.c.conditions.moment : this.s.type.includes("luxon") ? this.c.conditions.luxon : this.c.conditions.string);
            this.s.type.includes("moment") ? this.s.dateFormat = this.s.type.replace(/moment-/g, "") : this.s.type.includes("luxon") && (this.s.dateFormat = this.s.type.replace(/luxon-/g, ""));
            for (var o, a = 0, d = Object.keys(r); a < d.length; a++)
                null !== r[c = d[a]] && (this.s.dt.page.info().serverSide && r[c].init === w.initSelect && (o = e[n], this.s.serverData && this.s.serverData[o.data] ? (r[c].init = w.initSelectSSP, r[c].inputValue = w.inputValueSelect, r[c].isInputValid = w.isInputValidSelect) : (r[c].init = w.initInput, r[c].inputValue = w.inputValueInput, r[c].isInputValid = w.isInputValidInput)), this.s.conditions[c] = r[c], "function" == typeof (y = r[c].conditionName) && (y = y(this.s.dt, this.c.i18n)), t.push(I("<option>", {
                    text: y,
                    value: c
                }).addClass(this.classes.option).addClass(this.classes.notItalic)))
        } else {
            if (!(0 < i))
                return void this.dom.condition.attr("disabled", "true").addClass(this.classes.italic);
            this.dom.condition.empty().removeAttr("disabled").addClass(this.classes.italic);
            for (var l = 0, u = Object.keys(this.s.conditions); l < u.length; l++) {
                var c = u[l],
                    h = ("function" == typeof (y = this.s.conditions[c].conditionName) && (y = y(this.s.dt, this.c.i18n)), I("<option>", {
                        text: y,
                        value: c
                    }).addClass(this.classes.option).addClass(this.classes.notItalic));
                this.s.condition !== V && this.s.condition === y && (h.prop("selected", !0), this.dom.condition.removeClass(this.classes.italic)),
                    t.push(h)
            }
        }
        for (var p = 0, m = t; p < m.length; p++)
            this.dom.condition.append(m[p]);
        if (e[n].searchBuilder && e[n].searchBuilder.defaultCondition) {
            var f = e[n].searchBuilder.defaultCondition;
            if ("number" == typeof f)
                this.dom.condition.prop("selectedIndex", f),
                    this.dom.condition.trigger("change");
            else if ("string" == typeof f)
                for (var g = 0; g < t.length; g++)
                    for (var v = 0, b = Object.keys(this.s.conditions); v < b.length; v++) {
                        var y,
                            C = b[v];
                        if (("string" == typeof (y = this.s.conditions[C].conditionName) ? y : y(this.s.dt, this.c.i18n)) === t[g].text() && C === f) {
                            this.dom.condition.prop("selectedIndex", this.dom.condition.children().toArray().indexOf(t[g][0])).removeClass(this.classes.italic),
                                this.dom.condition.trigger("change"),
                                g = t.length;
                            break
                        }
                    }
        } else
            this.dom.condition.prop("selectedIndex", 0)
    }, w.prototype._populateData = function() {
        var t = this.s.dt.settings()[0].aoColumns,
            i = this.s.dt.columns(this.c.columns).indexes().toArray();
        this.dom.data.empty().append(this.dom.dataTitle);
        for (var e, n, s = 0; s < t.length; s++)
            !0 !== this.c.columns && !i.includes(s) || (n = {
                index: s,
                origData: (e = t[s]).data,
                text: (e.searchBuilderTitle || e.sTitle).replace(/(<([^>]+)>)/gi, "")
            }, this.dom.data.append(I("<option>", {
                text: n.text,
                value: n.index
            }).addClass(this.classes.option).addClass(this.classes.notItalic).prop("origData", e.data).prop("selected", this.s.dataIdx === n.index)), this.s.dataIdx !== n.index) || this.dom.dataTitle.removeProp("selected")
    }, w.prototype._populateValue = function(i) {
        for (var e = this, t = this.s.filled, n = (this.s.filled = !1, setTimeout(function() {
            e.dom.defaultValue.remove()
        }, 50), 0), s = this.dom.value; n < s.length; n++)
            !function(t) {
                setTimeout(function() {
                    t !== V && t.remove()
                }, 50)
            }(s[n]);
        var r = this.dom.inputCont.children();
        if (1 < r.length)
            for (var o = 0; o < r.length; o++)
                I(r[o]).remove();
        i !== V && this.s.dt.columns().every(function(t) {
            e.s.dt.settings()[0].aoColumns[t].sTitle === i.data && (e.s.dataIdx = t)
        }),
            this.dom.value = [].concat(this.s.conditions[this.s.condition].init(this, w.updateListener, i !== V ? i.value : V)),
        i !== V && i.value !== V && (this.s.value = i.value),
            this.dom.inputCont.empty(),
        this.dom.value[0] !== V && this.dom.value[0].appendTo(this.dom.inputCont).trigger("dtsb-inserted");
        for (o = 1; o < this.dom.value.length; o++)
            this.dom.value[o].insertAfter(this.dom.value[o - 1]).trigger("dtsb-inserted");
        this.s.filled = this.s.conditions[this.s.condition].isInputValid(this.dom.value, this),
            this.setListeners(),
        this.s.preventRedraw || t === this.s.filled || (this.s.dt.page.info().serverSide || this.doSearch(), this.setListeners())
    }, w.prototype._throttle = function(n, s) {
        var r = null,
            o = null,
            a = this;
        return null === (s = void 0 === s ? 200 : s) && (s = 200), function() {
            for (var t = [], i = 0; i < arguments.length; i++)
                t[i] = arguments[i];
            var e = +new Date;
            null !== r && e < r + s ? clearTimeout(o) : r = e,
                o = setTimeout(function() {
                    r = null,
                        n.apply(a, t)
                }, s)
        }
    }, w.version = "1.1.0", w.classes = {
        button: "dtsb-button",
        buttonContainer: "dtsb-buttonContainer",
        condition: "dtsb-condition",
        container: "dtsb-criteria",
        data: "dtsb-data",
        delete: "dtsb-delete",
        dropDown: "dtsb-dropDown",
        greyscale: "dtsb-greyscale",
        input: "dtsb-input",
        inputCont: "dtsb-inputCont",
        italic: "dtsb-italic",
        joiner: "dtsp-joiner",
        left: "dtsb-left",
        notItalic: "dtsb-notItalic",
        option: "dtsb-option",
        right: "dtsb-right",
        select: "dtsb-select",
        value: "dtsb-value",
        vertical: "dtsb-vertical"
    }, w.initSelect = function(e, t, n, i) {
        void 0 === n && (n = null),
        void 0 === i && (i = !1);
        for (var s = e.dom.data.children("option:selected").val(), r = e.s.dt.rows().indexes().toArray(), o = e.s.dt.settings()[0], a = (e.dom.valueTitle.prop("selected", !0), I("<select/>").addClass(w.classes.value).addClass(w.classes.dropDown).addClass(w.classes.italic).addClass(w.classes.select).append(e.dom.valueTitle).on("change.dtsb", function() {
            I(this).removeClass(w.classes.italic),
                t(e, this)
        })), d = (e.c.greyscale && a.addClass(w.classes.greyscale), []), l = [], u = 0, c = r; u < c.length; u++) {
            var h = c[u],
                p = o.oApi._fnGetCellData(o, h, s, "string" == typeof e.c.orthogonal ? e.c.orthogonal : e.c.orthogonal.search),
                m = {
                    filter: "string" == typeof p ? p.replace(/[\r\n\u2028]/g, " ") : p,
                    index: h,
                    text: o.oApi._fnGetCellData(o, h, s, "string" == typeof e.c.orthogonal ? e.c.orthogonal : e.c.orthogonal.display)
                },
                f = ("array" === e.s.type && (m.filter = Array.isArray(m.filter) ? m.filter : [m.filter], m.text = Array.isArray(m.text) ? m.text : [m.text]), function(t, i) {
                    e.s.type.includes("html") && null !== t && "string" == typeof t && t.replace(/(<([^>]+)>)/gi, "");
                    t = I("<option>", {
                        type: Array.isArray(t) ? "Array" : "String",
                        value: t
                    }).data("sbv", t).addClass(e.classes.option).addClass(e.classes.notItalic).html("string" == typeof i ? i.replace(/(<([^>]+)>)/gi, "") : i),
                        i = t.val();
                    -1 === d.indexOf(i) && (d.push(i), l.push(t), null !== n && Array.isArray(n[0]) && (n[0] = n[0].sort().join(",")), null !== n) && t.val() === n[0] && (t.prop("selected", !0), a.removeClass(w.classes.italic), e.dom.valueTitle.removeProp("selected"))
                });
            if (i)
                for (var g = 0; g < m.filter.length; g++)
                    f(m.filter[g], m.text[g]);
            else
                f(m.filter, Array.isArray(m.text) ? m.text.join(", ") : m.text)
        }
        l.sort(function(t, i) {
            return "array" === e.s.type || "string" === e.s.type || "html" === e.s.type ? t.val() < i.val() ? -1 : t.val() > i.val() ? 1 : 0 : "num" === e.s.type || "html-num" === e.s.type ? +t.val().replace(/(<([^>]+)>)/gi, "") < +i.val().replace(/(<([^>]+)>)/gi, "") ? -1 : +t.val().replace(/(<([^>]+)>)/gi, "") > +i.val().replace(/(<([^>]+)>)/gi, "") ? 1 : 0 : "num-fmt" === e.s.type || "html-num-fmt" === e.s.type ? +t.val().replace(/[^0-9.]/g, "") < +i.val().replace(/[^0-9.]/g, "") ? -1 : +t.val().replace(/[^0-9.]/g, "") > +i.val().replace(/[^0-9.]/g, "") ? 1 : 0 : void 0
        });
        for (var v = 0, b = l; v < b.length; v++)
            a.append(b[v]);
        return a
    }, w.initSelectSSP = function(t, i, e) {
        void 0 === e && (e = null),
            t.dom.valueTitle.prop("selected", !0);
        for (var n = I("<select/>").addClass(w.classes.value).addClass(w.classes.dropDown).addClass(w.classes.italic).addClass(w.classes.select).append(t.dom.valueTitle).on("change.dtsb", function() {
            I(this).removeClass(w.classes.italic),
                i(t, this)
        }), s = (t.c.greyscale && n.addClass(w.classes.greyscale), []), r = 0, o = t.s.serverData[t.s.origData]; r < o.length; r++) {
            var a = o[r],
                d = a.value,
                a = a.label;
            t.s.type.includes("html") && null !== d && "string" == typeof d && d.replace(/(<([^>]+)>)/gi, ""),
                d = I("<option>", {
                    type: Array.isArray(d) ? "Array" : "String",
                    value: d
                }).data("sbv", d).addClass(t.classes.option).addClass(t.classes.notItalic).html("string" == typeof a ? a.replace(/(<([^>]+)>)/gi, "") : a),
                s.push(d),
            null !== e && d.val() === e[0] && (d.prop("selected", !0), n.removeClass(w.classes.italic), t.dom.valueTitle.removeProp("selected"))
        }
        for (var l = 0, u = s; l < u.length; l++)
            n.append(u[l]);
        return n
    }, w.initSelectArray = function(t, i, e) {
        return w.initSelect(t, i, e = void 0 === e ? null : e, !0)
    }, w.initInput = function(i, e, t) {
        void 0 === t && (t = null);
        var n = i.s.dt.settings()[0].searchDelay,
            n = I("<input/>").addClass(w.classes.value).addClass(w.classes.input).on("input.dtsb keypress.dtsb", i._throttle(function(t) {
                t = t.keyCode || t.which;
                return e(i, this, t)
            }, null === n ? 100 : n));
        return i.c.greyscale && n.addClass(w.classes.greyscale), null !== t && n.val(t[0]), i.s.dt.one("draw.dtsb", function() {
            i.s.topGroup.trigger("dtsb-redrawLogic")
        }), n
    }, w.init2Input = function(i, e, t) {
        void 0 === t && (t = null);
        var n = i.s.dt.settings()[0].searchDelay,
            n = [I("<input/>").addClass(w.classes.value).addClass(w.classes.input).on("input.dtsb keypress.dtsb", i._throttle(function(t) {
                t = t.keyCode || t.which;
                return e(i, this, t)
            }, null === n ? 100 : n)), I("<span>").addClass(i.classes.joiner).html(i.s.dt.i18n("searchBuilder.valueJoiner", i.c.i18n.valueJoiner)), I("<input/>").addClass(w.classes.value).addClass(w.classes.input).on("input.dtsb keypress.dtsb", i._throttle(function(t) {
                t = t.keyCode || t.which;
                return e(i, this, t)
            }, null === n ? 100 : n))];
        return i.c.greyscale && (n[0].addClass(w.classes.greyscale), n[2].addClass(w.classes.greyscale)), null !== t && (n[0].val(t[0]), n[2].val(t[1])), i.s.dt.one("draw.dtsb", function() {
            i.s.topGroup.trigger("dtsb-redrawLogic")
        }), n
    }, w.initDate = function(e, n, t) {
        void 0 === t && (t = null);
        var s = e.s.dt.settings()[0].searchDelay,
            i = e.s.dt.i18n("datetime", {}),
            i = I("<input/>").addClass(w.classes.value).addClass(w.classes.input).dtDateTime({
                attachTo: "input",
                format: e.s.dateFormat || V,
                i18n: i
            }).on("change.dtsb", e._throttle(function() {
                return n(e, this)
            }, null === s ? 100 : s)).on("input.dtsb keypress.dtsb", function(i) {
                e._throttle(function() {
                    var t = i.keyCode || i.which;
                    return n(e, this, t)
                }, null === s ? 100 : s)
            });
        return e.c.greyscale && i.addClass(w.classes.greyscale), null !== t && i.val(t[0]), e.s.dt.one("draw.dtsb", function() {
            e.s.topGroup.trigger("dtsb-redrawLogic")
        }), i
    }, w.initNoValue = function(t) {
        return t.s.dt.one("draw.dtsb", function() {
            t.s.topGroup.trigger("dtsb-redrawLogic")
        }), []
    }, w.init2Date = function(e, n, t) {
        var i = this,
            s = (void 0 === t && (t = null), e.s.dt.settings()[0].searchDelay),
            r = e.s.dt.i18n("datetime", {}),
            r = [I("<input/>").addClass(w.classes.value).addClass(w.classes.input).dtDateTime({
                attachTo: "input",
                format: e.s.dateFormat || V,
                i18n: r
            }).on("change.dtsb", null !== s ? e.s.dt.settings()[0].oApi._fnThrottle(function() {
                return n(e, this)
            }, s) : function() {
                n(e, i)
            }).on("input.dtsb keypress.dtsb", function(i) {
                e.s.dt.settings()[0].oApi._fnThrottle(function() {
                    var t = i.keyCode || i.which;
                    return n(e, this, t)
                }, null === s ? 0 : s)
            }), I("<span>").addClass(e.classes.joiner).html(e.s.dt.i18n("searchBuilder.valueJoiner", e.c.i18n.valueJoiner)), I("<input/>").addClass(w.classes.value).addClass(w.classes.input).dtDateTime({
                attachTo: "input",
                format: e.s.dateFormat || V,
                i18n: r
            }).on("change.dtsb", null !== s ? e.s.dt.settings()[0].oApi._fnThrottle(function() {
                return n(e, this)
            }, s) : function() {
                n(e, i)
            }).on("input.dtsb keypress.dtsb", e.c.enterSearch || e.s.dt.settings()[0].oInit.search !== V && e.s.dt.settings()[0].oInit.search.return || null === s ? function(t) {
                t = t.keyCode || t.which;
                n(e, i, t)
            } : e.s.dt.settings()[0].oApi._fnThrottle(function() {
                return n(e, this)
            }, s))];
        return e.c.greyscale && (r[0].addClass(w.classes.greyscale), r[2].addClass(w.classes.greyscale)), null !== t && 0 < t.length && (r[0].val(t[0]), r[2].val(t[1])), e.s.dt.one("draw.dtsb", function() {
            e.s.topGroup.trigger("dtsb-redrawLogic")
        }), r
    }, w.isInputValidSelect = function(t) {
        for (var i = !0, e = 0, n = t; e < n.length; e++) {
            var s = n[e];
            s.children("option:selected").length === s.children("option").length - s.children("option." + w.classes.notItalic).length && 1 === s.children("option:selected").length && s.children("option:selected")[0] === s.children("option")[0] && (i = !1)
        }
        return i
    }, w.isInputValidInput = function(t) {
        for (var i = !0, e = 0, n = t; e < n.length; e++) {
            var s = n[e];
            s.is("input") && 0 === s.val().length && (i = !1)
        }
        return i
    }, w.inputValueSelect = function(t) {
        for (var i = [], e = 0, n = t; e < n.length; e++) {
            var s = n[e];
            s.is("select") && i.push(w._escapeHTML(s.children("option:selected").data("sbv")))
        }
        return i
    }, w.inputValueInput = function(t) {
        for (var i = [], e = 0, n = t; e < n.length; e++) {
            var s = n[e];
            s.is("input") && i.push(w._escapeHTML(s.val()))
        }
        return i
    }, w.updateListener = function(t, i, e) {
        var n = t.s.conditions[t.s.condition];
        if (t.s.filled = n.isInputValid(t.dom.value, t), t.s.value = n.inputValue(t.dom.value, t), t.s.filled) {
            Array.isArray(t.s.value) || (t.s.value = [t.s.value]);
            for (var s = 0; s < t.s.value.length; s++)
                if (Array.isArray(t.s.value[s]))
                    t.s.value[s].sort();
                else if (t.s.type.includes("num") && ("" !== t.s.dt.settings()[0].oLanguage.sDecimal || "" !== t.s.dt.settings()[0].oLanguage.sThousands)) {
                    var r = [t.s.value[s].toString()];
                    if ("" !== t.s.dt.settings()[0].oLanguage.sDecimal && (r = t.s.value[s].split(t.s.dt.settings()[0].oLanguage.sDecimal)), "" !== t.s.dt.settings()[0].oLanguage.sThousands)
                        for (var o = 0; o < r.length; o++)
                            r[o] = r[o].replace(t.s.dt.settings()[0].oLanguage.sThousands, ",");
                    t.s.value[s] = r.join(".")
                }
            for (var a = null, d = null, s = 0; s < t.dom.value.length; s++)
                i === t.dom.value[s][0] && (a = s, i.selectionStart !== V) && (d = i.selectionStart);
            (t.c.enterSearch || t.s.dt.settings()[0].oInit.search !== V && t.s.dt.settings()[0].oInit.search.return) && 13 !== e || t.doSearch(),
            null !== a && (t.dom.value[a].removeClass(t.classes.italic), t.dom.value[a].focus(), null !== d) && t.dom.value[a][0].setSelectionRange(d, d)
        } else
            (t.c.enterSearch || t.s.dt.settings()[0].oInit.search !== V && t.s.dt.settings()[0].oInit.search.return) && 13 !== e || t.doSearch()
    }, w.dateConditions = {
        "=": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.equals", i.conditions.date.equals)
            },
            init: w.initDate,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return (t = t.replace(/(\/|-|,)/g, "-")) === i[0]
            }
        },
        "!=": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.not", i.conditions.date.not)
            },
            init: w.initDate,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return (t = t.replace(/(\/|-|,)/g, "-")) !== i[0]
            }
        },
        "<": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.before", i.conditions.date.before)
            },
            init: w.initDate,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return (t = t.replace(/(\/|-|,)/g, "-")) < i[0]
            }
        },
        ">": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.after", i.conditions.date.after)
            },
            init: w.initDate,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return (t = t.replace(/(\/|-|,)/g, "-")) > i[0]
            }
        },
        between: {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.between", i.conditions.date.between)
            },
            init: w.init2Date,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return t = t.replace(/(\/|-|,)/g, "-"), i[0] < i[1] ? i[0] <= t && t <= i[1] : i[1] <= t && t <= i[0]
            }
        },
        "!between": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.notBetween", i.conditions.date.notBetween)
            },
            init: w.init2Date,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return t = t.replace(/(\/|-|,)/g, "-"), i[0] < i[1] ? !(i[0] <= t && t <= i[1]) : !(i[1] <= t && t <= i[0])
            }
        },
        null: {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.empty", i.conditions.date.empty)
            },
            init: w.initNoValue,
            inputValue: function() {},
            isInputValid: function() {
                return !0
            },
            search: function(t) {
                return null === t || t === V || 0 === t.length
            }
        },
        "!null": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.notEmpty", i.conditions.date.notEmpty)
            },
            init: w.initNoValue,
            inputValue: function() {},
            isInputValid: function() {
                return !0
            },
            search: function(t) {
                return !(null === t || t === V || 0 === t.length)
            }
        }
    }, w.momentDateConditions = {
        "=": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.equals", i.conditions.date.equals)
            },
            init: w.initDate,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i, e) {
                return o()(t, e.s.dateFormat).valueOf() === o()(i[0], e.s.dateFormat).valueOf()
            }
        },
        "!=": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.not", i.conditions.date.not)
            },
            init: w.initDate,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i, e) {
                return o()(t, e.s.dateFormat).valueOf() !== o()(i[0], e.s.dateFormat).valueOf()
            }
        },
        "<": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.before", i.conditions.date.before)
            },
            init: w.initDate,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i, e) {
                return o()(t, e.s.dateFormat).valueOf() < o()(i[0], e.s.dateFormat).valueOf()
            }
        },
        ">": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.after", i.conditions.date.after)
            },
            init: w.initDate,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i, e) {
                return o()(t, e.s.dateFormat).valueOf() > o()(i[0], e.s.dateFormat).valueOf()
            }
        },
        between: {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.between", i.conditions.date.between)
            },
            init: w.init2Date,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i, e) {
                var t = o()(t, e.s.dateFormat).valueOf(),
                    n = o()(i[0], e.s.dateFormat).valueOf(),
                    i = o()(i[1], e.s.dateFormat).valueOf();
                return n < i ? n <= t && t <= i : i <= t && t <= n
            }
        },
        "!between": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.notBetween", i.conditions.date.notBetween)
            },
            init: w.init2Date,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i, e) {
                var t = o()(t, e.s.dateFormat).valueOf(),
                    n = o()(i[0], e.s.dateFormat).valueOf(),
                    i = o()(i[1], e.s.dateFormat).valueOf();
                return n < i ? !(+n <= +t && +t <= +i) : !(+i <= +t && +t <= +n)
            }
        },
        null: {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.empty", i.conditions.date.empty)
            },
            init: w.initNoValue,
            inputValue: function() {},
            isInputValid: function() {
                return !0
            },
            search: function(t) {
                return null === t || t === V || 0 === t.length
            }
        },
        "!null": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.notEmpty", i.conditions.date.notEmpty)
            },
            init: w.initNoValue,
            inputValue: function() {},
            isInputValid: function() {
                return !0
            },
            search: function(t) {
                return !(null === t || t === V || 0 === t.length)
            }
        }
    }, w.luxonDateConditions = {
        "=": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.equals", i.conditions.date.equals)
            },
            init: w.initDate,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i, e) {
                return f().DateTime.fromFormat(t, e.s.dateFormat).ts === f().DateTime.fromFormat(i[0], e.s.dateFormat).ts
            }
        },
        "!=": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.not", i.conditions.date.not)
            },
            init: w.initDate,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i, e) {
                return f().DateTime.fromFormat(t, e.s.dateFormat).ts !== f().DateTime.fromFormat(i[0], e.s.dateFormat).ts
            }
        },
        "<": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.before", i.conditions.date.before)
            },
            init: w.initDate,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i, e) {
                return f().DateTime.fromFormat(t, e.s.dateFormat).ts < f().DateTime.fromFormat(i[0], e.s.dateFormat).ts
            }
        },
        ">": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.after", i.conditions.date.after)
            },
            init: w.initDate,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i, e) {
                return f().DateTime.fromFormat(t, e.s.dateFormat).ts > f().DateTime.fromFormat(i[0], e.s.dateFormat).ts
            }
        },
        between: {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.between", i.conditions.date.between)
            },
            init: w.init2Date,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i, e) {
                var t = f().DateTime.fromFormat(t, e.s.dateFormat).ts,
                    n = f().DateTime.fromFormat(i[0], e.s.dateFormat).ts,
                    i = f().DateTime.fromFormat(i[1], e.s.dateFormat).ts;
                return n < i ? n <= t && t <= i : i <= t && t <= n
            }
        },
        "!between": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.notBetween", i.conditions.date.notBetween)
            },
            init: w.init2Date,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i, e) {
                var t = f().DateTime.fromFormat(t, e.s.dateFormat).ts,
                    n = f().DateTime.fromFormat(i[0], e.s.dateFormat).ts,
                    i = f().DateTime.fromFormat(i[1], e.s.dateFormat).ts;
                return n < i ? !(+n <= +t && +t <= +i) : !(+i <= +t && +t <= +n)
            }
        },
        null: {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.empty", i.conditions.date.empty)
            },
            init: w.initNoValue,
            inputValue: function() {},
            isInputValid: function() {
                return !0
            },
            search: function(t) {
                return null === t || t === V || 0 === t.length
            }
        },
        "!null": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.date.notEmpty", i.conditions.date.notEmpty)
            },
            init: w.initNoValue,
            inputValue: function() {},
            isInputValid: function() {
                return !0
            },
            search: function(t) {
                return !(null === t || t === V || 0 === t.length)
            }
        }
    }, w.numConditions = {
        "=": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.equals", i.conditions.number.equals)
            },
            init: w.initSelect,
            inputValue: w.inputValueSelect,
            isInputValid: w.isInputValidSelect,
            search: function(t, i) {
                return +t == +i[0]
            }
        },
        "!=": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.not", i.conditions.number.not)
            },
            init: w.initSelect,
            inputValue: w.inputValueSelect,
            isInputValid: w.isInputValidSelect,
            search: function(t, i) {
                return +t != +i[0]
            }
        },
        "<": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.lt", i.conditions.number.lt)
            },
            init: w.initInput,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return +t < +i[0]
            }
        },
        "<=": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.lte", i.conditions.number.lte)
            },
            init: w.initInput,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return +t <= +i[0]
            }
        },
        ">=": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.gte", i.conditions.number.gte)
            },
            init: w.initInput,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return +t >= +i[0]
            }
        },
        ">": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.gt", i.conditions.number.gt)
            },
            init: w.initInput,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return +t > +i[0]
            }
        },
        between: {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.between", i.conditions.number.between)
            },
            init: w.init2Input,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return +i[0] < +i[1] ? +i[0] <= +t && +t <= +i[1] : +i[1] <= +t && +t <= +i[0]
            }
        },
        "!between": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.notBetween", i.conditions.number.notBetween)
            },
            init: w.init2Input,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return +i[0] < +i[1] ? !(+i[0] <= +t && +t <= +i[1]) : !(+i[1] <= +t && +t <= +i[0])
            }
        },
        null: {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.empty", i.conditions.number.empty)
            },
            init: w.initNoValue,
            inputValue: function() {},
            isInputValid: function() {
                return !0
            },
            search: function(t) {
                return null === t || t === V || 0 === t.length
            }
        },
        "!null": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.notEmpty", i.conditions.number.notEmpty)
            },
            init: w.initNoValue,
            inputValue: function() {},
            isInputValid: function() {
                return !0
            },
            search: function(t) {
                return !(null === t || t === V || 0 === t.length)
            }
        }
    }, w.numFmtConditions = {
        "=": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.equals", i.conditions.number.equals)
            },
            init: w.initSelect,
            inputValue: w.inputValueSelect,
            isInputValid: w.isInputValidSelect,
            search: function(t, i) {
                return w.parseNumFmt(t) === w.parseNumFmt(i[0])
            }
        },
        "!=": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.not", i.conditions.number.not)
            },
            init: w.initSelect,
            inputValue: w.inputValueSelect,
            isInputValid: w.isInputValidSelect,
            search: function(t, i) {
                return w.parseNumFmt(t) !== w.parseNumFmt(i[0])
            }
        },
        "<": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.lt", i.conditions.number.lt)
            },
            init: w.initInput,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return w.parseNumFmt(t) < w.parseNumFmt(i[0])
            }
        },
        "<=": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.lte", i.conditions.number.lte)
            },
            init: w.initInput,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return w.parseNumFmt(t) <= w.parseNumFmt(i[0])
            }
        },
        ">=": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.gte", i.conditions.number.gte)
            },
            init: w.initInput,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return w.parseNumFmt(t) >= w.parseNumFmt(i[0])
            }
        },
        ">": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.gt", i.conditions.number.gt)
            },
            init: w.initInput,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return w.parseNumFmt(t) > w.parseNumFmt(i[0])
            }
        },
        between: {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.between", i.conditions.number.between)
            },
            init: w.init2Input,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                var t = w.parseNumFmt(t),
                    e = w.parseNumFmt(i[0]),
                    i = w.parseNumFmt(i[1]);
                return +e < +i ? +e <= +t && +t <= +i : +i <= +t && +t <= +e
            }
        },
        "!between": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.notBetween", i.conditions.number.notBetween)
            },
            init: w.init2Input,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                var t = w.parseNumFmt(t),
                    e = w.parseNumFmt(i[0]),
                    i = w.parseNumFmt(i[1]);
                return +e < +i ? !(+e <= +t && +t <= +i) : !(+i <= +t && +t <= +e)
            }
        },
        null: {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.empty", i.conditions.number.empty)
            },
            init: w.initNoValue,
            inputValue: function() {},
            isInputValid: function() {
                return !0
            },
            search: function(t) {
                return null === t || t === V || 0 === t.length
            }
        },
        "!null": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.number.notEmpty", i.conditions.number.notEmpty)
            },
            init: w.initNoValue,
            inputValue: function() {},
            isInputValid: function() {
                return !0
            },
            search: function(t) {
                return !(null === t || t === V || 0 === t.length)
            }
        }
    }, w.stringConditions = {
        "=": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.string.equals", i.conditions.string.equals)
            },
            init: w.initSelect,
            inputValue: w.inputValueSelect,
            isInputValid: w.isInputValidSelect,
            search: function(t, i) {
                return t === i[0]
            }
        },
        "!=": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.string.not", i.conditions.string.not)
            },
            init: w.initSelect,
            inputValue: w.inputValueSelect,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return t !== i[0]
            }
        },
        starts: {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.string.startsWith", i.conditions.string.startsWith)
            },
            init: w.initInput,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return 0 === t.toLowerCase().indexOf(i[0].toLowerCase())
            }
        },
        "!starts": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.string.notStartsWith", i.conditions.string.notStartsWith)
            },
            init: w.initInput,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return 0 !== t.toLowerCase().indexOf(i[0].toLowerCase())
            }
        },
        contains: {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.string.contains", i.conditions.string.contains)
            },
            init: w.initInput,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return t.toLowerCase().includes(i[0].toLowerCase())
            }
        },
        "!contains": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.string.notContains", i.conditions.string.notContains)
            },
            init: w.initInput,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return !t.toLowerCase().includes(i[0].toLowerCase())
            }
        },
        ends: {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.string.endsWith", i.conditions.string.endsWith)
            },
            init: w.initInput,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return t.toLowerCase().endsWith(i[0].toLowerCase())
            }
        },
        "!ends": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.string.notEndsWith", i.conditions.string.notEndsWith)
            },
            init: w.initInput,
            inputValue: w.inputValueInput,
            isInputValid: w.isInputValidInput,
            search: function(t, i) {
                return !t.toLowerCase().endsWith(i[0].toLowerCase())
            }
        },
        null: {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.string.empty", i.conditions.string.empty)
            },
            init: w.initNoValue,
            inputValue: function() {},
            isInputValid: function() {
                return !0
            },
            search: function(t) {
                return null === t || t === V || 0 === t.length
            }
        },
        "!null": {
            conditionName: function(t, i) {
                return t.i18n("searchBuilder.conditions.string.notEmpty", i.conditions.string.notEmpty)
            },
            init: w.initNoValue,
            inputValue: function() {},
            isInputValid: function() {
                return !0
            },
            search: function(t) {
                return !(null === t || t === V || 0 === t.length)
            }
        }
    }, w.defaults = {
        columns: !0,
        conditions: {
            array: w.arrayConditions = {
                contains: {
                    conditionName: function(t, i) {
                        return t.i18n("searchBuilder.conditions.array.contains", i.conditions.array.contains)
                    },
                    init: w.initSelectArray,
                    inputValue: w.inputValueSelect,
                    isInputValid: w.isInputValidSelect,
                    search: function(t, i) {
                        return t.includes(i[0])
                    }
                },
                without: {
                    conditionName: function(t, i) {
                        return t.i18n("searchBuilder.conditions.array.without", i.conditions.array.without)
                    },
                    init: w.initSelectArray,
                    inputValue: w.inputValueSelect,
                    isInputValid: w.isInputValidSelect,
                    search: function(t, i) {
                        return -1 === t.indexOf(i[0])
                    }
                },
                "=": {
                    conditionName: function(t, i) {
                        return t.i18n("searchBuilder.conditions.array.equals", i.conditions.array.equals)
                    },
                    init: w.initSelect,
                    inputValue: w.inputValueSelect,
                    isInputValid: w.isInputValidSelect,
                    search: function(t, i) {
                        if (t.length !== i[0].length)
                            return !1;
                        for (var e = 0; e < t.length; e++)
                            if (t[e] !== i[0][e])
                                return !1;
                        return !0
                    }
                },
                "!=": {
                    conditionName: function(t, i) {
                        return t.i18n("searchBuilder.conditions.array.not", i.conditions.array.not)
                    },
                    init: w.initSelect,
                    inputValue: w.inputValueSelect,
                    isInputValid: w.isInputValidSelect,
                    search: function(t, i) {
                        if (t.length !== i[0].length)
                            return !0;
                        for (var e = 0; e < t.length; e++)
                            if (t[e] !== i[0][e])
                                return !0;
                        return !1
                    }
                },
                null: {
                    conditionName: function(t, i) {
                        return t.i18n("searchBuilder.conditions.array.empty", i.conditions.array.empty)
                    },
                    init: w.initNoValue,
                    inputValue: function() {},
                    isInputValid: function() {
                        return !0
                    },
                    search: function(t) {
                        return null === t || t === V || 0 === t.length
                    }
                },
                "!null": {
                    conditionName: function(t, i) {
                        return t.i18n("searchBuilder.conditions.array.notEmpty", i.conditions.array.notEmpty)
                    },
                    init: w.initNoValue,
                    inputValue: function() {},
                    isInputValid: function() {
                        return !0
                    },
                    search: function(t) {
                        return null !== t && t !== V && 0 !== t.length
                    }
                }
            },
            date: w.dateConditions,
            html: w.stringConditions,
            "html-num": w.numConditions,
            "html-num-fmt": w.numFmtConditions,
            luxon: w.luxonDateConditions,
            moment: w.momentDateConditions,
            num: w.numConditions,
            "num-fmt": w.numFmtConditions,
            string: w.stringConditions
        },
        depthLimit: !1,
        enterSearch: !1,
        filterChanged: V,
        greyscale: !1,
        i18n: {
            add: "Add Condition",
            button: {
                0: "Search Builder",
                _: "Search Builder (%d)"
            },
            clearAll: "Clear All",
            condition: "Condition",
            data: "Data",
            delete: "&times",
            deleteTitle: "Delete filtering rule",
            left: "<",
            leftTitle: "Outdent criteria",
            logicAnd: "And",
            logicOr: "Or",
            right: ">",
            rightTitle: "Indent criteria",
            search: "Search",
            title: {
                0: "Custom Search Builder",
                _: "Custom Search Builder (%d)"
            },
            value: "Value",
            valueJoiner: "and"
        },
        logic: "AND",
        orthogonal: {
            display: "display",
            search: "filter"
        },
        preDefined: !1
    }, l = w, g.prototype.destroy = function() {
        this.dom.add.off(".dtsb"),
            this.dom.logic.off(".dtsb"),
            this.dom.search.off(".dtsb"),
            this.dom.container.trigger("dtsb-destroy").remove(),
            this.s.criteria = []
    }, g.prototype.getDetails = function(t) {
        if (void 0 === t && (t = !1), 0 === this.s.criteria.length)
            return {};
        for (var i = {
            criteria: [],
            logic: this.s.logic
        }, e = 0, n = this.s.criteria; e < n.length; e++) {
            var s = n[e];
            i.criteria.push(s.criteria.getDetails(t))
        }
        return i
    }, g.prototype.getNode = function() {
        return this.dom.container
    }, g.prototype.rebuild = function(t) {
        if (!(t.criteria === V || null === t.criteria || Array.isArray(t.criteria) && 0 === t.criteria.length)) {
            if (this.s.logic = t.logic, this.dom.logic.children().first().html("OR" === this.s.logic ? this.s.dt.i18n("searchBuilder.logicOr", this.c.i18n.logicOr) : this.s.dt.i18n("searchBuilder.logicAnd", this.c.i18n.logicAnd)), Array.isArray(t.criteria))
                for (var i = 0, e = t.criteria; i < e.length; i++)
                    (n = e[i]).logic !== V ? this._addPrevGroup(n) : n.logic === V && this._addPrevCriteria(n);
            for (var n, s = 0, r = this.s.criteria; s < r.length; s++)
                (n = r[s]).criteria instanceof l && (n.criteria.updateArrows(1 < this.s.criteria.length), this._setCriteriaListeners(n.criteria))
        }
    }, g.prototype.redrawContents = function() {
        if (!this.s.preventRedraw) {
            this.dom.container.children().detach(),
                this.dom.container.append(this.dom.logicContainer).append(this.dom.add).append(this.dom.search),
                this.s.criteria.sort(function(t, i) {
                    return t.criteria.s.index < i.criteria.s.index ? -1 : t.criteria.s.index > i.criteria.s.index ? 1 : 0
                }),
                this.setListeners();
            for (var t = 0; t < this.s.criteria.length; t++) {
                var i = this.s.criteria[t].criteria;
                i instanceof l ? (this.s.criteria[t].index = t, this.s.criteria[t].criteria.s.index = t, this.s.criteria[t].criteria.dom.container.insertBefore(this.dom.add), this._setCriteriaListeners(i), this.s.criteria[t].criteria.s.preventRedraw = this.s.preventRedraw, this.s.criteria[t].criteria.rebuild(this.s.criteria[t].criteria.getDetails()), this.s.criteria[t].criteria.s.preventRedraw = !1) : i instanceof g && 0 < i.s.criteria.length ? (this.s.criteria[t].index = t, this.s.criteria[t].criteria.s.index = t, this.s.criteria[t].criteria.dom.container.insertBefore(this.dom.add), i.s.preventRedraw = this.s.preventRedraw, i.redrawContents(), i.s.preventRedraw = !1, this._setGroupListeners(i)) : (this.s.criteria.splice(t, 1), t--)
            }
            this.setupLogic()
        }
    }, g.prototype.redrawLogic = function() {
        for (var t = 0, i = this.s.criteria; t < i.length; t++) {
            var e = i[t];
            e.criteria instanceof g && e.criteria.redrawLogic()
        }
        this.setupLogic()
    }, g.prototype.search = function(t, i) {
        return "AND" === this.s.logic ? this._andSearch(t, i) : "OR" !== this.s.logic || this._orSearch(t, i)
    }, g.prototype.setupLogic = function() {
        if (this.dom.logicContainer.remove(), this.dom.clear.remove(), this.s.criteria.length < 1)
            this.s.isChild || (this.dom.container.trigger("dtsb-destroy"), this.dom.container.css("margin-left", 0)),
                this.dom.search.css("display", "none");
        else {
            this.dom.clear.height("0px"),
                this.dom.logicContainer.append(this.dom.clear),
            this.s.isChild || this.dom.search.css("display", "inline-block"),
                this.dom.container.prepend(this.dom.logicContainer);
            for (var t = 0, i = this.s.criteria; t < i.length; t++) {
                var e = i[t];
                e.criteria instanceof l && e.criteria.setupButtons()
            }
            var n = this.dom.container.outerHeight() - 1,
                n = (this.dom.logicContainer.width(n), this._setLogicListener(), this.dom.container.css("margin-left", this.dom.logicContainer.outerHeight(!0)), this.dom.logicContainer.offset()),
                s = n.left,
                s = s - (s - this.dom.container.offset().left) - this.dom.logicContainer.outerHeight(!0),
                s = (this.dom.logicContainer.offset({
                    left: s
                }), this.dom.logicContainer.next()),
                n = n.top,
                s = a(s).offset().top;
            this.dom.logicContainer.offset({
                top: n - (n - s)
            }),
                this.dom.clear.outerHeight(this.dom.logicContainer.height()),
                this._setClearListener()
        }
    }, g.prototype.setListeners = function() {
        var t = this;
        this.dom.add.unbind("click"),
            this.dom.add.on("click.dtsb", function() {
                return t.s.isChild || t.dom.container.prepend(t.dom.logicContainer), t.addCriteria(), t.dom.container.trigger("dtsb-add"), t.s.dt.state.save(), !1
            }),
            this.dom.search.on("click.dtsb", function() {
                t.s.dt.draw()
            });
        for (var i = 0, e = this.s.criteria; i < e.length; i++)
            e[i].criteria.setListeners();
        this._setClearListener(),
            this._setLogicListener()
    }, g.prototype.addCriteria = function(t) {
        for (var i = null === (t = void 0 === t ? null : t) ? this.s.criteria.length : t.s.index, e = new l(this.s.dt, this.s.opts, this.s.topGroup, i, this.s.depth, this.s.serverData, this.c.liveSearch), n = (null !== t && (e.c = t.c, e.s = t.s, e.s.depth = this.s.depth, e.classes = t.classes), e.populate(), !1), s = 0; s < this.s.criteria.length; s++)
            0 === s && this.s.criteria[s].criteria.s.index > e.s.index ? (e.getNode().insertBefore(this.s.criteria[s].criteria.dom.container), n = !0) : s < this.s.criteria.length - 1 && this.s.criteria[s].criteria.s.index < e.s.index && this.s.criteria[s + 1].criteria.s.index > e.s.index && (e.getNode().insertAfter(this.s.criteria[s].criteria.dom.container), n = !0);
        n || e.getNode().insertBefore(this.dom.add),
            this.s.criteria.push({
                criteria: e,
                index: i
            }),
            this.s.criteria = this.s.criteria.sort(function(t, i) {
                return t.criteria.s.index - i.criteria.s.index
            });
        for (var r = 0, o = this.s.criteria; r < o.length; r++) {
            var a = o[r];
            a.criteria instanceof l && a.criteria.updateArrows(1 < this.s.criteria.length)
        }
        this._setCriteriaListeners(e),
            e.setListeners(),
            this.setupLogic()
    }, g.prototype.checkFilled = function() {
        for (var t = 0, i = this.s.criteria; t < i.length; t++) {
            var e = i[t];
            if (e.criteria instanceof l && e.criteria.s.filled || e.criteria instanceof g && e.criteria.checkFilled())
                return !0
        }
        return !1
    }, g.prototype.count = function() {
        for (var t = 0, i = 0, e = this.s.criteria; i < e.length; i++) {
            var n = e[i];
            n.criteria instanceof g ? t += n.criteria.count() : t++
        }
        return t
    }, g.prototype._addPrevGroup = function(t) {
        var i = this.s.criteria.length,
            e = new g(this.s.dt, this.c, this.s.topGroup, i, !0, this.s.depth + 1, this.s.serverData);
        this.s.criteria.push({
            criteria: e,
            index: i,
            logic: e.s.logic
        }),
            e.rebuild(t),
            this.s.criteria[i].criteria = e,
            this.s.topGroup.trigger("dtsb-redrawContents"),
            this._setGroupListeners(e)
    }, g.prototype._addPrevCriteria = function(t) {
        var i = this.s.criteria.length,
            e = new l(this.s.dt, this.s.opts, this.s.topGroup, i, this.s.depth, this.s.serverData);
        e.populate(),
            this.s.criteria.push({
                criteria: e,
                index: i
            }),
            e.s.preventRedraw = this.s.preventRedraw,
            e.rebuild(t),
            e.s.preventRedraw = !1,
            this.s.criteria[i].criteria = e,
        this.s.preventRedraw || this.s.topGroup.trigger("dtsb-redrawContents")
    }, g.prototype._andSearch = function(t, i) {
        if (0 !== this.s.criteria.length)
            for (var e = 0, n = this.s.criteria; e < n.length; e++) {
                var s = n[e];
                if ((!(s.criteria instanceof l) || s.criteria.s.filled) && !s.criteria.search(t, i))
                    return !1
            }
        return !0
    }, g.prototype._orSearch = function(t, i) {
        if (0 === this.s.criteria.length)
            return !0;
        for (var e = !1, n = 0, s = this.s.criteria; n < s.length; n++) {
            var r = s[n];
            if (r.criteria instanceof l && r.criteria.s.filled) {
                if (e = !0, r.criteria.search(t, i))
                    return !0
            } else if (r.criteria instanceof g && r.criteria.checkFilled() && (e = !0, r.criteria.search(t, i)))
                return !0
        }
        return !e
    }, g.prototype._removeCriteria = function(t, i) {
        if (void 0 === i && (i = !1), this.s.criteria.length <= 1 && this.s.isChild)
            this.destroy();
        else {
            for (var e = void 0, n = 0; n < this.s.criteria.length; n++)
                this.s.criteria[n].index === t.s.index && (!i || this.s.criteria[n].criteria instanceof g) && (e = n);
            e !== V && this.s.criteria.splice(e, 1);
            for (n = 0; n < this.s.criteria.length; n++)
                this.s.criteria[n].index = n,
                    this.s.criteria[n].criteria.s.index = n
        }
    }, g.prototype._setCriteriaListeners = function(n) {
        var s = this;
        n.dom.delete.unbind("click").on("click.dtsb", function() {
            s._removeCriteria(n),
                n.dom.container.remove();
            for (var t = 0, i = s.s.criteria; t < i.length; t++) {
                var e = i[t];
                e.criteria instanceof l && e.criteria.updateArrows(1 < s.s.criteria.length)
            }
            return n.destroy(), s.s.dt.draw(), s.s.topGroup.trigger("dtsb-redrawContents"), !1
        }),
            n.dom.right.unbind("click").on("click.dtsb", function() {
                var t = n.s.index,
                    i = new g(s.s.dt, s.s.opts, s.s.topGroup, n.s.index, !0, s.s.depth + 1, s.s.serverData);
                return i.addCriteria(n), s.s.criteria[t].criteria = i, s.s.criteria[t].logic = "AND", s.s.topGroup.trigger("dtsb-redrawContents"), s._setGroupListeners(i), !1
            }),
            n.dom.left.unbind("click").on("click.dtsb", function() {
                s.s.toDrop = new l(s.s.dt, s.s.opts, s.s.topGroup, n.s.index, V, s.s.serverData),
                    s.s.toDrop.s = n.s,
                    s.s.toDrop.c = n.c,
                    s.s.toDrop.classes = n.classes,
                    s.s.toDrop.populate();
                var t = s.s.toDrop.s.index;
                return s.dom.container.trigger("dtsb-dropCriteria"), n.s.index = t, s._removeCriteria(n), s.s.topGroup.trigger("dtsb-redrawContents"), s.s.dt.draw(), !1
            })
    }, g.prototype._setClearListener = function() {
        var t = this;
        this.dom.clear.unbind("click").on("click.dtsb", function() {
            return t.s.isChild ? (t.destroy(), t.s.topGroup.trigger("dtsb-redrawContents")) : t.dom.container.trigger("dtsb-clearContents"), !1
        })
    }, g.prototype._setGroupListeners = function(i) {
        var e = this;
        i.dom.add.unbind("click").on("click.dtsb", function() {
            return e.setupLogic(), e.dom.container.trigger("dtsb-add"), !1
        }),
            i.dom.container.unbind("dtsb-add").on("dtsb-add.dtsb", function() {
                return e.setupLogic(), e.dom.container.trigger("dtsb-add"), !1
            }),
            i.dom.container.unbind("dtsb-destroy").on("dtsb-destroy.dtsb", function() {
                return e._removeCriteria(i, !0), i.dom.container.remove(), e.setupLogic(), !1
            }),
            i.dom.container.unbind("dtsb-dropCriteria").on("dtsb-dropCriteria.dtsb", function() {
                var t = i.s.toDrop;
                return t.s.index = i.s.index, t.updateArrows(1 < e.s.criteria.length), e.addCriteria(t), !1
            }),
            i.setListeners()
    }, g.prototype._setup = function() {
        this.setListeners(),
            this.dom.add.html(this.s.dt.i18n("searchBuilder.add", this.c.i18n.add)),
            this.dom.search.html(this.s.dt.i18n("searchBuilder.search", this.c.i18n.search)),
            this.dom.logic.children().first().html("OR" === this.c.logic ? this.s.dt.i18n("searchBuilder.logicOr", this.c.i18n.logicOr) : this.s.dt.i18n("searchBuilder.logicAnd", this.c.i18n.logicAnd)),
            this.s.logic = "OR" === this.c.logic ? "OR" : "AND",
        this.c.greyscale && this.dom.logic.addClass(this.classes.greyscale),
            this.dom.logicContainer.append(this.dom.logic).append(this.dom.clear),
        this.s.isChild && this.dom.container.append(this.dom.logicContainer),
            this.dom.container.append(this.dom.add).append(this.dom.search)
    }, g.prototype._setLogicListener = function() {
        var e = this;
        this.dom.logic.unbind("click").on("click.dtsb", function() {
            e._toggleLogic(),
                e.s.dt.draw();
            for (var t = 0, i = e.s.criteria; t < i.length; t++)
                i[t].criteria.setListeners()
        })
    }, g.prototype._toggleLogic = function() {
        "OR" === this.s.logic ? (this.s.logic = "AND", this.dom.logic.children().first().html(this.s.dt.i18n("searchBuilder.logicAnd", this.c.i18n.logicAnd))) : "AND" === this.s.logic && (this.s.logic = "OR", this.dom.logic.children().first().html(this.s.dt.i18n("searchBuilder.logicOr", this.c.i18n.logicOr)))
    }, g.version = "1.1.0", g.classes = {
        add: "dtsb-add",
        button: "dtsb-button",
        clearGroup: "dtsb-clearGroup",
        greyscale: "dtsb-greyscale",
        group: "dtsb-group",
        inputButton: "dtsb-iptbtn",
        logic: "dtsb-logic",
        logicContainer: "dtsb-logicContainer",
        search: "dtsb-search"
    }, g.defaults = {
        columns: !0,
        conditions: {
            date: l.dateConditions,
            html: l.stringConditions,
            "html-num": l.numConditions,
            "html-num-fmt": l.numFmtConditions,
            luxon: l.luxonDateConditions,
            moment: l.momentDateConditions,
            num: l.numConditions,
            "num-fmt": l.numFmtConditions,
            string: l.stringConditions
        },
        depthLimit: !1,
        enterSearch: !1,
        filterChanged: V,
        greyscale: !1,
        liveSearch: !0,
        i18n: {
            add: "Add Condition",
            button: {
                0: "Search Builder",
                _: "Search Builder (%d)"
            },
            clearAll: "Clear All",
            condition: "Condition",
            data: "Data",
            delete: "&times",
            deleteTitle: "Delete filtering rule",
            left: "<",
            leftTitle: "Outdent criteria",
            logicAnd: "And",
            logicOr: "Or",
            right: ">",
            rightTitle: "Indent criteria",
            search: "Search",
            title: {
                0: "Custom Search Builder",
                _: "Custom Search Builder (%d)"
            },
            value: "Value",
            valueJoiner: "and"
        },
        logic: "AND",
        orthogonal: {
            display: "display",
            search: "filter"
        },
        preDefined: !1
    }, m = g, n.prototype.getDetails = function(t) {
        return this.s.topGroup.getDetails(t = void 0 === t ? !1 : t)
    }, n.prototype.getNode = function() {
        return this.dom.container
    }, n.prototype.rebuild = function(t) {
        return this.dom.clearAll.click(), t !== V && null !== t && (this.s.topGroup.s.preventRedraw = !0, this.s.topGroup.rebuild(t), this.s.topGroup.s.preventRedraw = !1, this._checkClear(), this._updateTitle(this.s.topGroup.count()), this.s.topGroup.redrawContents(), this.s.dt.draw(!1), this.s.topGroup.setListeners()), this
    }, n.prototype._applyPreDefDefaults = function(t) {
        for (var e = this, n = (t.criteria !== V && t.logic === V && (t.logic = "AND"), this), i = 0, s = t.criteria; i < s.length; i++)
            !function(i) {
                i.criteria !== V ? i = n._applyPreDefDefaults(i) : n.s.dt.columns().every(function(t) {
                    e.s.dt.settings()[0].aoColumns[t].sTitle === i.data && (i.dataIdx = t)
                })
            }(s[i]);
        return t
    }, n.prototype._setUp = function(t) {
        var n = this;
        if (void 0 === t && (t = !0), h.fn.DataTable.Api.registerPlural("columns().type()", "column().type()", function() {
            return this.iterator("column", function(t, i) {
                return t.aoColumns[i].sType
            }, 1)
        }), !p.DateTime) {
            if ((i = this.s.dt.columns().type().toArray()) === V || i.includes(V) || i.includes(null))
                for (var i = [], e = 0, s = this.s.dt.settings()[0].aoColumns; e < s.length; e++) {
                    var r = s[e];
                    i.push(r.searchBuilderType !== V ? r.searchBuilderType : r.sType)
                }
            var o = this.s.dt.columns().toArray();
            (i === V || i.includes(V) || i.includes(null)) && (h.fn.dataTable.ext.oApi._fnColumnTypes(this.s.dt.settings()[0]), i = this.s.dt.columns().type().toArray());
            for (var a = 0; a < o[0].length; a++) {
                var d = i[o[0][a]];
                if ((!0 === this.c.columns || Array.isArray(this.c.columns) && this.c.columns.includes(a)) && (d.includes("date") || d.includes("moment") || d.includes("luxon")))
                    throw alert("SearchBuilder Requires DateTime when used with dates."), new Error("SearchBuilder requires DateTime")
            }
        }
        this.s.topGroup = new m(this.s.dt, this.c, V, V, V, V, this.s.serverData),
            this._setClearListener(),
            this.s.dt.on("stateSaveParams.dtsb", function(t, i, e) {
                e.searchBuilder = n.getDetails(),
                    e.scroller ? e.start = n.s.dt.state().start : e.page = n.s.dt.page()
            }),
            this.s.dt.on("stateLoadParams.dtsb", function(t, i, e) {
                n.rebuild(e.searchBuilder)
            }),
            this._build(),
            this.s.dt.on("preXhr.dtsb", function(t, i, e) {
                n.s.dt.page.info().serverSide && (e.searchBuilder = n._collapseArray(n.getDetails(!0)))
            }),
            this.s.dt.on("column-reorder", function() {
                n.rebuild(n.getDetails())
            }),
        t && (null !== (t = this.s.dt.state.loaded()) && t.searchBuilder !== V ? (this.s.topGroup.rebuild(t.searchBuilder), this.s.topGroup.dom.container.trigger("dtsb-redrawContents"), this.s.dt.page.info().serverSide || (t.page ? this.s.dt.page(t.page).draw("page") : this.s.dt.scroller && t.scroller && this.s.dt.scroller().scrollToRow(t.scroller.topRow)), this.s.topGroup.setListeners()) : !1 !== this.c.preDefined && (this.c.preDefined = this._applyPreDefDefaults(this.c.preDefined), this.rebuild(this.c.preDefined))),
            this._setEmptyListener(),
            this.s.dt.state.save()
    }, n.prototype._collapseArray = function(t) {
        if (t.logic === V)
            t.value !== V && (t.value.sort(function(t, i) {
                return isNaN(+t) || (t = +t, i = +i), t < i ? -1 : i < t ? 1 : 0
            }), t.value1 = t.value[0], t.value2 = t.value[1]);
        else
            for (var i = 0; i < t.criteria.length; i++)
                t.criteria[i] = this._collapseArray(t.criteria[i]);
        return t
    }, n.prototype._updateTitle = function(t) {
        this.dom.title.html(this.s.dt.i18n("searchBuilder.title", this.c.i18n.title, t))
    }, n.prototype._build = function() {
        var n = this,
            t = (this.dom.clearAll.remove(), this.dom.container.empty(), this.s.topGroup.count()),
            s = (this._updateTitle(t), this.dom.titleRow.append(this.dom.title), this.dom.container.append(this.dom.titleRow), this.dom.topGroup = this.s.topGroup.getNode(), this.dom.container.append(this.dom.topGroup), this._setRedrawListener(), this.s.dt.table(0).node());
        h.fn.dataTable.ext.search.includes(this.s.search) || (this.s.search = function(t, i, e) {
            return t.nTable !== s || n.s.topGroup.search(i, e)
        }, h.fn.dataTable.ext.search.push(this.s.search)),
            this.s.dt.on("destroy.dtsb", function() {
                n.dom.container.remove(),
                    n.dom.clearAll.remove();
                for (var t = h.fn.dataTable.ext.search.indexOf(n.s.search); -1 !== t;)
                    h.fn.dataTable.ext.search.splice(t, 1),
                        t = h.fn.dataTable.ext.search.indexOf(n.s.search);
                n.s.dt.off(".dtsb"),
                    h(n.s.dt.table().node()).off(".dtsb")
            })
    }, n.prototype._checkClear = function() {
        0 < this.s.topGroup.s.criteria.length ? (this.dom.clearAll.insertAfter(this.dom.title), this._setClearListener()) : this.dom.clearAll.remove()
    }, n.prototype._filterChanged = function(t) {
        var i = this.c.filterChanged;
        "function" == typeof i && i(t, this.s.dt.i18n("searchBuilder.button", this.c.i18n.button, t))
    }, n.prototype._setClearListener = function() {
        var t = this;
        this.dom.clearAll.unbind("click"),
            this.dom.clearAll.on("click.dtsb", function() {
                return t.s.topGroup = new m(t.s.dt, t.c, V, V, V, V, t.s.serverData), t._build(), t.s.dt.draw(), t.s.topGroup.setListeners(), t.dom.clearAll.remove(), t._setEmptyListener(), t._filterChanged(0), !1
            })
    }, n.prototype._setRedrawListener = function() {
        var i = this;
        this.s.topGroup.dom.container.unbind("dtsb-redrawContents"),
            this.s.topGroup.dom.container.on("dtsb-redrawContents.dtsb", function() {
                i._checkClear(),
                    i.s.topGroup.redrawContents(),
                    i.s.topGroup.setupLogic(),
                    i._setEmptyListener();
                var t = i.s.topGroup.count();
                i._updateTitle(t),
                    i._filterChanged(t),
                i.s.dt.page.info().serverSide || i.s.dt.draw(),
                    i.s.dt.state.save()
            }),
            this.s.topGroup.dom.container.unbind("dtsb-redrawContents-noDraw"),
            this.s.topGroup.dom.container.on("dtsb-redrawContents-noDraw.dtsb", function() {
                i._checkClear(),
                    i.s.topGroup.s.preventRedraw = !0,
                    i.s.topGroup.redrawContents(),
                    i.s.topGroup.s.preventRedraw = !1,
                    i.s.topGroup.setupLogic(),
                    i._setEmptyListener();
                var t = i.s.topGroup.count();
                i._updateTitle(t),
                    i._filterChanged(t)
            }),
            this.s.topGroup.dom.container.unbind("dtsb-redrawLogic"),
            this.s.topGroup.dom.container.on("dtsb-redrawLogic.dtsb", function() {
                i.s.topGroup.redrawLogic();
                var t = i.s.topGroup.count();
                i._updateTitle(t),
                    i._filterChanged(t)
            }),
            this.s.topGroup.dom.container.unbind("dtsb-add"),
            this.s.topGroup.dom.container.on("dtsb-add.dtsb", function() {
                var t = i.s.topGroup.count();
                i._updateTitle(t),
                    i._filterChanged(t),
                    i._checkClear()
            }),
            this.s.dt.on("postEdit.dtsb postCreate.dtsb postRemove.dtsb", function() {
                i.s.topGroup.redrawContents()
            }),
            this.s.topGroup.dom.container.unbind("dtsb-clearContents"),
            this.s.topGroup.dom.container.on("dtsb-clearContents.dtsb", function() {
                i._setUp(!1),
                    i._filterChanged(0),
                    i.s.dt.draw()
            })
    }, n.prototype._setEmptyListener = function() {
        var t = this;
        this.s.topGroup.dom.add.on("click.dtsb", function() {
            t._checkClear()
        }),
            this.s.topGroup.dom.container.on("dtsb-destroy.dtsb", function() {
                t.dom.clearAll.remove()
            })
    }, n.version = "1.6.0", n.classes = {
        button: "dtsb-button",
        clearAll: "dtsb-clearAll",
        container: "dtsb-searchBuilder",
        inputButton: "dtsb-iptbtn",
        title: "dtsb-title",
        titleRow: "dtsb-titleRow"
    }, n.defaults = {
        columns: !0,
        conditions: {
            date: l.dateConditions,
            html: l.stringConditions,
            "html-num": l.numConditions,
            "html-num-fmt": l.numFmtConditions,
            luxon: l.luxonDateConditions,
            moment: l.momentDateConditions,
            num: l.numConditions,
            "num-fmt": l.numFmtConditions,
            string: l.stringConditions
        },
        depthLimit: !1,
        enterSearch: !1,
        filterChanged: V,
        greyscale: !1,
        liveSearch: !0,
        i18n: {
            add: "Add Condition",
            button: {
                0: "Search Builder",
                _: "Search Builder (%d)"
            },
            clearAll: "Clear All",
            condition: "Condition",
            conditions: {
                array: {
                    contains: "Contains",
                    empty: "Empty",
                    equals: "Equals",
                    not: "Not",
                    notEmpty: "Not Empty",
                    without: "Without"
                },
                date: {
                    after: "After",
                    before: "Before",
                    between: "Between",
                    empty: "Empty",
                    equals: "Equals",
                    not: "Not",
                    notBetween: "Not Between",
                    notEmpty: "Not Empty"
                },
                number: {
                    between: "Between",
                    empty: "Empty",
                    equals: "Equals",
                    gt: "Greater Than",
                    gte: "Greater Than Equal To",
                    lt: "Less Than",
                    lte: "Less Than Equal To",
                    not: "Not",
                    notBetween: "Not Between",
                    notEmpty: "Not Empty"
                },
                string: {
                    contains: "Contains",
                    empty: "Empty",
                    endsWith: "Ends With",
                    equals: "Equals",
                    not: "Not",
                    notContains: "Does Not Contain",
                    notEmpty: "Not Empty",
                    notEndsWith: "Does Not End With",
                    notStartsWith: "Does Not Start With",
                    startsWith: "Starts With"
                }
            },
            data: "Data",
            delete: "&times",
            deleteTitle: "Delete filtering rule",
            left: "<",
            leftTitle: "Outdent criteria",
            logicAnd: "And",
            logicOr: "Or",
            right: ">",
            rightTitle: "Indent criteria",
            search: "Search",
            title: {
                0: "Custom Search Builder",
                _: "Custom Search Builder (%d)"
            },
            value: "Value",
            valueJoiner: "and"
        },
        logic: "AND",
        orthogonal: {
            display: "display",
            search: "filter"
        },
        preDefined: !1
    }, e = n, p = (h = s).fn.DataTable, d = (a = s).fn.dataTable, c = (I = s).fn.dataTable, i = s.fn.dataTable, r.SearchBuilder = e, i.SearchBuilder = e, r.Group = m, i.Group = m, r.Criteria = l, i.Criteria = l, i = r.Api.register, r.ext.searchBuilder = {
        conditions: {}
    }, r.ext.buttons.searchBuilder = {
        action: function(t, i, e, n) {
            this.popover(n._searchBuilder.getNode(), {
                align: "container",
                span: "container"
            });
            n = n._searchBuilder.s.topGroup;
            n !== V && n.dom.container.trigger("dtsb-redrawContents-noDraw"),
            0 === n.s.criteria.length && s("." + s.fn.dataTable.Group.classes.add.replace(/ /g, ".")).click()
        },
        config: {},
        init: function(e, n, t) {
            var i = new r.SearchBuilder(e, s.extend({
                filterChanged: function(t, i) {
                    e.button(n).text(i)
                }
            }, t.config));
            e.button(n).text(t.text || e.i18n("searchBuilder.button", i.c.i18n.button, 0)),
                t._searchBuilder = i
        },
        text: null
    }, i("searchBuilder.getDetails()", function(t) {
        void 0 === t && (t = !1);
        var i = this.context[0];
        return i._searchBuilder ? i._searchBuilder.getDetails(t) : null
    }), i("searchBuilder.rebuild()", function(t) {
        var i = this.context[0];
        return i._searchBuilder === V ? null : (i._searchBuilder.rebuild(t), this)
    }), i("searchBuilder.container()", function() {
        var t = this.context[0];
        return t._searchBuilder ? t._searchBuilder.getNode() : null
    }), s(t).on("preInit.dt.dtsp", function(t, i) {
        "dt" !== t.namespace || !i.oInit.searchBuilder && !r.defaults.searchBuilder || i._searchBuilder || v(i)
    }), r.ext.feature.push({
        cFeature: "Q",
        fnInit: v
    }), r.ext.features && r.ext.features.register("searchBuilder", v), r
});

/*! Bootstrap 5 ui integration for DataTables' SearchBuilder
 * © SpryMedia Ltd - datatables.net/license
 */
!function(n) {
    var d,
        r;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs5", "datatables.net-searchbuilder"], function(e) {
        return n(e, window, document)
    }) : "object" == typeof exports ? (d = require("jquery"), r = function(e, t) {
        t.fn.dataTable || require("datatables.net-bs5")(e, t),
        t.fn.dataTable.SearchBuilder || require("datatables.net-searchbuilder")(e, t)
    }, "undefined" == typeof window ? module.exports = function(e, t) {
        return e = e || window, t = t || d(e), r(e, t), n(t, 0, e.document)
    } : (r(window, d), module.exports = n(d, window, window.document))) : n(jQuery, window, document)
}(function(e, t, n, d) {
    "use strict";
    var r = e.fn.dataTable;
    return e.extend(!0, r.SearchBuilder.classes, {
        clearAll: "btn btn-secondary dtsb-clearAll"
    }), e.extend(!0, r.Group.classes, {
        add: "btn btn-secondary dtsb-add",
        clearGroup: "btn btn-secondary dtsb-clearGroup",
        logic: "btn btn-secondary dtsb-logic"
    }), e.extend(!0, r.Criteria.classes, {
        condition: "form-select dtsb-condition",
        data: "dtsb-data form-select",
        delete: "btn btn-secondary dtsb-delete",
        input: "form-control dtsb-input",
        left: "btn btn-secondary dtsb-left",
        right: "btn btn-secondary dtsb-right",
        select: "form-select",
        value: "dtsb-value"
    }), r
});

/*! SearchPanes 2.2.0
 * © SpryMedia Ltd - datatables.net/license
 */
!function(e) {
    var a,
        i;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return e(t, window, document)
    }) : "object" == typeof exports ? (a = require("jquery"), i = function(t, s) {
        s.fn.dataTable || require("datatables.net")(t, s)
    }, "undefined" == typeof window ? module.exports = function(t, s) {
        return t = t || window, s = s || a(t), i(t, s), e(s, t, t.document)
    } : (i(window, a), module.exports = e(a, window, window.document))) : e(jQuery, window, document)
}(function(i, o, j, b) {
    "use strict";
    var _,
        C,
        n,
        a,
        r,
        l,
        h,
        t,
        d,
        c,
        p,
        u,
        f,
        g,
        m,
        w,
        v,
        P,
        y,
        S,
        O,
        x,
        N,
        A,
        D,
        B = i.fn.dataTable;
    function T(t, s, e, a, i) {
        var n,
            o = this;
        if (void 0 === i && (i = null), !C || !C.versionCheck || !C.versionCheck("1.10.0"))
            throw new Error("SearchPane requires DataTables 1.10 or newer");
        if (C.select)
            return t = new C.Api(t), this.classes = _.extend(!0, {}, T.classes), this.c = _.extend(!0, {}, T.defaults, s, i), s && s.hideCount && s.viewCount === b && (this.c.viewCount = !this.c.hideCount), s = t.columns().eq(0).toArray().length, this.s = {
                colExists: e < s,
                colOpts: b,
                customPaneSettings: i,
                displayed: !1,
                dt: t,
                dtPane: b,
                firstSet: !0,
                index: e,
                indexes: [],
                listSet: !1,
                name: b,
                rowData: {
                    arrayFilter: [],
                    arrayOriginal: [],
                    bins: {},
                    binsOriginal: {},
                    filterMap: new Map,
                    totalOptions: 0
                },
                scrollTop: 0,
                searchFunction: b,
                selections: [],
                serverSelect: [],
                serverSelecting: !1,
                tableLength: null,
                updating: !1
            }, this.s.colOpts = this.s.colExists ? this._getOptions() : this._getBonusOptions(), this.dom = {
                buttonGroup: _("<div/>").addClass(this.classes.buttonGroup),
                clear: _('<button type="button">&#215;</button>').attr("disabled", "true").addClass(this.classes.disabledButton).addClass(this.classes.paneButton).addClass(this.classes.clearButton).html(this.s.dt.i18n("searchPanes.clearPane", this.c.i18n.clearPane)),
                collapseButton: _('<button type="button"><span class="' + this.classes.caret + '">&#x5e;</span></button>').addClass(this.classes.paneButton).addClass(this.classes.collapseButton),
                container: _("<div/>").addClass(this.classes.container).addClass(this.s.colOpts.className).addClass(this.classes.layout + (parseInt(this.c.layout.split("-")[1], 10) < 10 ? this.c.layout : this.c.layout.split("-")[0] + "-9")).addClass(this.s.customPaneSettings && this.s.customPaneSettings.className ? this.s.customPaneSettings.className : ""),
                countButton: _('<button type="button"><span></span></button>').addClass(this.classes.paneButton).addClass(this.classes.countButton),
                dtP: _("<table><thead><tr><th>" + (this.s.colExists ? _(this.s.dt.column(this.s.index).header()).text() : this.s.customPaneSettings.header || "Custom Pane") + "</th><th/></tr></thead></table>"),
                lower: _("<div/>").addClass(this.classes.subRow2).addClass(this.classes.narrowButton),
                nameButton: _('<button type="button"><span></span></button>').addClass(this.classes.paneButton).addClass(this.classes.nameButton),
                panesContainer: _(a),
                searchBox: _("<input/>").addClass(this.classes.paneInputButton).addClass(this.classes.search),
                searchButton: _('<button type="button"><span></span></button>').addClass(this.classes.searchIcon).addClass(this.classes.paneButton),
                searchCont: _("<div/>").addClass(this.classes.searchCont),
                searchLabelCont: _("<div/>").addClass(this.classes.searchLabelCont),
                topRow: _("<div/>").addClass(this.classes.topRow),
                upper: _("<div/>").addClass(this.classes.subRow1).addClass(this.classes.narrowSearch)
            }, this.s.colOpts.name ? this.s.name = this.s.colOpts.name : this.s.customPaneSettings && this.s.customPaneSettings.name ? this.s.name = this.s.customPaneSettings.name : this.s.name = this.s.colExists ? _(this.s.dt.column(this.s.index).header()).text() : this.s.customPaneSettings.header || "Custom Pane", n = this.s.dt.table(0).node(), this.s.searchFunction = function(t, s, e) {
                return 0 === o.s.selections.length || t.nTable !== n || (t = null, o.s.colExists && (t = s[o.s.index], "filter" !== o.s.colOpts.orthogonal.filter) && (t = o.s.rowData.filterMap.get(e)) instanceof _.fn.dataTable.Api && (t = t.toArray()), o._search(t, e))
            }, _.fn.dataTable.ext.search.push(this.s.searchFunction), this.c.clear && this.dom.clear.on("click.dtsp", function() {
                o.dom.container.find("." + o.classes.search.replace(/\s+/g, ".")).each(function() {
                    _(this).val("").trigger("input")
                }),
                    o.clearPane()
            }), this.s.dt.on("draw.dtsp", function() {
                return o.adjustTopRow()
            }), this.s.dt.on("buttons-action.dtsp", function() {
                return o.adjustTopRow()
            }), this.s.dt.on("column-reorder.dtsp", function(t, s, e) {
                o.s.index = e.mapping[o.s.index]
            }), this;
        throw new Error("SearchPane requires Select")
    }
    function s(t, s, e, a, i) {
        return r.call(this, t, s, e, a, i) || this
    }
    function e(t, s, e, a, i) {
        return d.call(this, t, h.extend({
            i18n: {
                countFiltered: "{shown} ({total})"
            }
        }, s), e, a, i) || this
    }
    function L(t, s, e, a, i) {
        return f.call(this, t, p.extend({
            i18n: {
                count: "{shown}"
            }
        }, s), e, a, i) || this
    }
    function R(t, s, e, a, i) {
        return v.call(this, t, m.extend({
            i18n: {
                count: "{total}",
                countFiltered: "{shown} ({total})"
            }
        }, s), e, a, i) || this
    }
    function M(t, s, e, a) {
        var l = this;
        if (void 0 === e && (e = !1), void 0 === a && (a = n), !y || !y.versionCheck || !y.versionCheck("1.10.0"))
            throw new Error("SearchPane requires DataTables 1.10 or newer");
        if (!y.select)
            throw new Error("SearchPane requires Select");
        var h,
            i = new y.Api(t);
        if (this.classes = P.extend(!0, {}, M.classes), this.c = P.extend(!0, {}, M.defaults, s), this.dom = {
            clearAll: P('<button type="button"/>').addClass(this.classes.clearAll).html(i.i18n("searchPanes.clearMessage", this.c.i18n.clearMessage)),
            collapseAll: P('<button type="button"/>').addClass(this.classes.collapseAll).html(i.i18n("searchPanes.collapseMessage", this.c.i18n.collapseMessage)),
            container: P("<div/>").addClass(this.classes.panes).html(i.i18n("searchPanes.loadMessage", this.c.i18n.loadMessage)),
            emptyMessage: P("<div/>").addClass(this.classes.emptyMessage),
            panes: P("<div/>").addClass(this.classes.container),
            showAll: P('<button type="button"/>').addClass(this.classes.showAll).addClass(this.classes.disabledButton).attr("disabled", "true").html(i.i18n("searchPanes.showMessage", this.c.i18n.showMessage)),
            title: P("<div/>").addClass(this.classes.title),
            titleRow: P("<div/>").addClass(this.classes.titleRow)
        }, this.s = {
            colOpts: [],
            dt: i,
            filterCount: 0,
            minPaneWidth: 260,
            page: 0,
            paging: !1,
            pagingST: !1,
            paneClass: a,
            panes: [],
            selectionList: [],
            serverData: {},
            stateRead: !1,
            updating: !1
        }, !i.settings()[0]._searchPanes)
            return this._getState(), this.s.dt.page.info().serverSide && (h = this.s.dt.settings()[0], this.s.dt.on("preXhr.dtsps", function(t, s, e) {
                if (h === s) {
                    e.searchPanes === b && (e.searchPanes = {}),
                    e.searchPanes_null === b && (e.searchPanes_null = {});
                    for (var a = 0, i = l.s.selectionList; a < i.length; a++) {
                        var n = i[a],
                            o = l.s.dt.column(n.column).dataSrc();
                        e.searchPanes[o] === b && (e.searchPanes[o] = {}),
                        e.searchPanes_null[o] === b && (e.searchPanes_null[o] = {});
                        for (var r = 0; r < n.rows.length; r++)
                            e.searchPanes[o][r] = n.rows[r],
                            null === e.searchPanes[o][r] && (e.searchPanes_null[o][r] = !0)
                    }
                    0 < l.s.selectionList.length && (e.searchPanesLast = o),
                        e.searchPanes_options = {
                            cascade: l.c.cascadePanes,
                            viewCount: l.c.viewCount,
                            viewTotal: l.c.viewTotal
                        }
                }
            })), this._setXHR(), (i.settings()[0]._searchPanes = this).s.dt.settings()[0]._bInitComplete || e ? this._paneDeclare(i, t, s) : i.one("preInit.dtsps", function() {
                l._paneDeclare(i, t, s)
            }), this
    }
    function k(t, s, e) {
        function a() {
            return n._initSelectionListeners(!0, o && o.searchPanes && o.searchPanes.selectionList ? o.searchPanes.selectionList : n.c.preSelect)
        }
        var i,
            n = this,
            t = (s.cascadePanes && s.viewTotal ? i = S : s.cascadePanes ? i = w : s.viewTotal && (i = u), (n = N.call(this, t, s, e = void 0 === e ? !1 : e, i) || this).s.dt),
            o = t.state.loaded();
        return t.settings()[0]._bInitComplete ? a() : t.off("init.dtsps").on("init.dtsps", a), n
    }
    function E(s, e, t) {
        var a = i.extend({
                filterChanged: function(t) {
                    s.button(e).text(s.i18n("searchPanes.collapse", (s.context[0].oLanguage.searchPanes !== b ? s.context[0].oLanguage.searchPanes : s.context[0]._searchPanes.c.i18n).collapse, t))
                }
            }, t.config),
            a = new (a && (a.cascadePanes || a.viewTotal) ? B.SearchPanesST : B.SearchPanes)(s, a);
        s.button(e).text(t.text || s.i18n("searchPanes.collapse", a.c.i18n.collapse, 0)),
            t._panes = a
    }
    function F(t, s, e) {
        void 0 === s && (s = null),
        void 0 === e && (e = !1);
        t = new D.Api(t),
            s = s || t.init().searchPanes || D.defaults.searchPanes;
        return new (s && (s.cascadePanes || s.viewTotal) ? A : O)(t, s, e).getNode()
    }
    return T.prototype.addRow = function(t, s, e, a, i, n, o) {
        var r;
        n = n || this.s.rowData.bins[s] || 0,
            o = o || this._getShown(s);
        for (var l = 0, h = this.s.indexes; l < h.length; l++) {
            var d = h[l];
            d.filter === s && (r = d.index)
        }
        return r === b && (r = this.s.indexes.length, this.s.indexes.push({
            filter: s,
            index: r
        })), this.s.dtPane.row.add({
            className: i,
            display: "" !== t ? t : this.emptyMessage(),
            filter: s,
            index: r,
            shown: o,
            sort: e,
            total: n,
            type: a
        })
    }, T.prototype.adjustTopRow = function() {
        var t = this.dom.container.find("." + this.classes.subRowsContainer.replace(/\s+/g, ".")),
            s = this.dom.container.find("." + this.classes.subRow1.replace(/\s+/g, ".")),
            e = this.dom.container.find("." + this.classes.subRow2.replace(/\s+/g, ".")),
            a = this.dom.container.find("." + this.classes.topRow.replace(/\s+/g, "."));
        (_(t[0]).width() < 252 || _(a[0]).width() < 252) && 0 !== _(t[0]).width() ? (_(t[0]).addClass(this.classes.narrow), _(s[0]).addClass(this.classes.narrowSub).removeClass(this.classes.narrowSearch), _(e[0]).addClass(this.classes.narrowSub).removeClass(this.classes.narrowButton)) : (_(t[0]).removeClass(this.classes.narrow), _(s[0]).removeClass(this.classes.narrowSub).addClass(this.classes.narrowSearch), _(e[0]).removeClass(this.classes.narrowSub).addClass(this.classes.narrowButton))
    }, T.prototype.clearData = function() {
        this.s.rowData = {
            arrayFilter: [],
            arrayOriginal: [],
            bins: {},
            binsOriginal: {},
            filterMap: new Map,
            totalOptions: 0
        }
    }, T.prototype.clearPane = function() {
        return this.s.dtPane.rows({
            selected: !0
        }).deselect(), this.updateTable(), this
    }, T.prototype.collapse = function() {
        var t = this;
        this.s.displayed && (this.c.collapse || !0 === this.s.colOpts.collapse) && !1 !== this.s.colOpts.collapse && (_(this.s.dtPane.table().container()).addClass(this.classes.hidden), this.dom.topRow.addClass(this.classes.bordered), this.dom.nameButton.addClass(this.classes.disabledButton), this.dom.countButton.addClass(this.classes.disabledButton), this.dom.searchButton.addClass(this.classes.disabledButton), this.dom.collapseButton.addClass(this.classes.rotated), this.dom.topRow.one("click.dtsp", function() {
            return t.show()
        }), this.dom.topRow.trigger("collapse.dtsps"))
    }, T.prototype.destroy = function() {
        this.s.dtPane && this.s.dtPane.off(".dtsp"),
            this.s.dt.off(".dtsp"),
            this.dom.clear.off(".dtsp"),
            this.dom.nameButton.off(".dtsp"),
            this.dom.countButton.off(".dtsp"),
            this.dom.searchButton.off(".dtsp"),
            this.dom.collapseButton.off(".dtsp"),
            _(this.s.dt.table().node()).off(".dtsp"),
            this.dom.container.detach();
        for (var t = _.fn.dataTable.ext.search.indexOf(this.s.searchFunction); -1 !== t;)
            _.fn.dataTable.ext.search.splice(t, 1),
                t = _.fn.dataTable.ext.search.indexOf(this.s.searchFunction);
        this.s.dtPane && this.s.dtPane.destroy(),
            this.s.listSet = !1
    }, T.prototype.emptyMessage = function() {
        var t = this.c.i18n.emptyMessage;
        return this.c.emptyMessage && (t = this.c.emptyMessage), !1 !== this.s.colOpts.emptyMessage && null !== this.s.colOpts.emptyMessage && (t = this.s.colOpts.emptyMessage), this.s.dt.i18n("searchPanes.emptyMessage", t)
    }, T.prototype.getPaneCount = function() {
        return this.s.dtPane ? this.s.dtPane.rows({
            selected: !0
        }).data().toArray().length : 0
    }, T.prototype.rebuildPane = function(t, s) {
        void 0 === t && (t = null),
        void 0 === s && (s = !1),
            this.clearData();
        var e = [],
            a = (this.s.serverSelect = [], null);
        return this.s.dtPane && (s && (this.s.dt.page.info().serverSide ? this.s.serverSelect = this.s.dtPane.rows({
            selected: !0
        }).data().toArray() : e = this.s.dtPane.rows({
            selected: !0
        }).data().toArray()), this.s.dtPane.clear().destroy(), a = this.dom.container.prev(), this.destroy(), this.s.dtPane = b, _.fn.dataTable.ext.search.push(this.s.searchFunction)), this.dom.container.removeClass(this.classes.hidden), this.s.displayed = !1, this._buildPane(this.s.dt.page.info().serverSide ? this.s.serverSelect : e, t, a), this
    }, T.prototype.resize = function(t) {
        this.c.layout = t,
            this.dom.container.removeClass().addClass(this.classes.show).addClass(this.classes.container).addClass(this.s.colOpts.className).addClass(this.classes.layout + (parseInt(t.split("-")[1], 10) < 10 ? t : t.split("-")[0] + "-9")).addClass(null !== this.s.customPaneSettings && this.s.customPaneSettings.className ? this.s.customPaneSettings.className : ""),
            this.adjustTopRow()
    }, T.prototype.setListeners = function() {
        var d = this;
        this.s.dtPane && (this.s.dtPane.off("select.dtsp").on("select.dtsp", function() {
            clearTimeout(d.s.deselectTimeout),
                d._updateSelection(!d.s.updating),
                d.dom.clear.removeClass(d.classes.disabledButton).removeAttr("disabled")
        }), this.s.dtPane.off("deselect.dtsp").on("deselect.dtsp", function() {
            d.s.deselectTimeout = setTimeout(function() {
                d._updateSelection(!0),
                0 === d.s.dtPane.rows({
                    selected: !0
                }).data().toArray().length && d.dom.clear.addClass(d.classes.disabledButton).attr("disabled", "true")
            }, 50)
        }), this.s.firstSet && (this.s.firstSet = !1, this.s.dt.on("stateSaveParams.dtsp", function(t, s, e) {
            if (_.isEmptyObject(e))
                d.s.dtPane.state.clear();
            else {
                var a,
                    i,
                    n,
                    o,
                    r,
                    l = [];
                d.s.dtPane && (l = d.s.dtPane.rows({
                    selected: !0
                }).data().map(function(t) {
                    return t.filter.toString()
                }).toArray(), o = d.dom.searchBox.val(), i = d.s.dtPane.order(), a = d.s.rowData.binsOriginal, r = d.s.rowData.arrayOriginal, n = d.dom.collapseButton.hasClass(d.classes.rotated)),
                e.searchPanes === b && (e.searchPanes = {}),
                e.searchPanes.panes === b && (e.searchPanes.panes = []);
                for (var h = 0; h < e.searchPanes.panes.length; h++)
                    e.searchPanes.panes[h].id === d.s.index && (e.searchPanes.panes.splice(h, 1), h--);
                e.searchPanes.panes.push({
                    arrayFilter: r,
                    bins: a,
                    collapsed: n,
                    id: d.s.index,
                    order: i,
                    searchTerm: o,
                    selected: l
                })
            }
        })), this.s.dtPane.off("user-select.dtsp").on("user-select.dtsp", function(t, s, e, a, i) {
            i.stopPropagation()
        }), this.s.dtPane.off("draw.dtsp").on("draw.dtsp", function() {
            return d.adjustTopRow()
        }), this.dom.nameButton.off("click.dtsp").on("click.dtsp", function() {
            var t = d.s.dtPane.order()[0][1];
            d.s.dtPane.order([0, "asc" === t ? "desc" : "asc"]).draw(),
                d.s.dt.state.save()
        }), this.dom.countButton.off("click.dtsp").on("click.dtsp", function() {
            var t = d.s.dtPane.order()[0][1];
            d.s.dtPane.order([1, "asc" === t ? "desc" : "asc"]).draw(),
                d.s.dt.state.save()
        }), this.dom.collapseButton.off("click.dtsp").on("click.dtsp", function(t) {
            t.stopPropagation();
            t = _(d.s.dtPane.table().container());
            t.toggleClass(d.classes.hidden),
                d.dom.topRow.toggleClass(d.classes.bordered),
                d.dom.nameButton.toggleClass(d.classes.disabledButton),
                d.dom.countButton.toggleClass(d.classes.disabledButton),
                d.dom.searchButton.toggleClass(d.classes.disabledButton),
                d.dom.collapseButton.toggleClass(d.classes.rotated),
                t.hasClass(d.classes.hidden) ? d.dom.topRow.on("click.dtsp", function() {
                    return d.dom.collapseButton.click()
                }) : d.dom.topRow.off("click.dtsp"),
                d.s.dt.state.save(),
                d.dom.topRow.trigger("collapse.dtsps")
        }), this.dom.clear.off("click.dtsp").on("click.dtsp", function() {
            d.dom.container.find("." + d.classes.search.replace(/ /g, ".")).each(function() {
                _(this).val("").trigger("input")
            }),
                d.clearPane()
        }), this.dom.searchButton.off("click.dtsp").on("click.dtsp", function() {
            return d.dom.searchBox.focus()
        }), this.dom.searchBox.off("click.dtsp").on("input.dtsp", function() {
            var t = d.dom.searchBox.val();
            d.s.dtPane.search(t).draw(),
                "string" == typeof t && (0 < t.length || 0 === t.length && 0 < d.s.dtPane.rows({
                    selected: !0
                }).data().toArray().length) ? d.dom.clear.removeClass(d.classes.disabledButton).removeAttr("disabled") : d.dom.clear.addClass(d.classes.disabledButton).attr("disabled", "true"),
                d.s.dt.state.save()
        }), this.s.dtPane.select.style(this.s.colOpts.dtOpts && this.s.colOpts.dtOpts.select && this.s.colOpts.dtOpts.select.style ? this.s.colOpts.dtOpts.select.style : this.c.dtOpts && this.c.dtOpts.select && this.c.dtOpts.select.style ? this.c.dtOpts.select.style : "os"))
    }, T.prototype._serverPopulate = function(t) {
        t.tableLength ? (this.s.tableLength = t.tableLength, this.s.rowData.totalOptions = this.s.tableLength) : (null === this.s.tableLength || this.s.dt.rows()[0].length > this.s.tableLength) && (this.s.tableLength = this.s.dt.rows()[0].length, this.s.rowData.totalOptions = this.s.tableLength);
        var s = this.s.dt.column(this.s.index).dataSrc();
        if (t.searchPanes.options[s])
            for (var e = 0, a = t.searchPanes.options[s]; e < a.length; e++) {
                var i = a[e];
                this.s.rowData.arrayFilter.push({
                    display: i.label,
                    filter: i.value,
                    sort: i.label,
                    type: i.label
                }),
                    this.s.rowData.bins[i.value] = i.total
            }
        t = Object.keys(this.s.rowData.bins).length,
            s = this._uniqueRatio(t, this.s.tableLength);
        !1 === this.s.displayed && ((this.s.colOpts.show === b && null === this.s.colOpts.threshold ? s > this.c.threshold : s > this.s.colOpts.threshold) || !0 !== this.s.colOpts.show && t <= 1) ? (this.dom.container.addClass(this.classes.hidden), this.s.displayed = !1) : (this.s.rowData.arrayOriginal = this.s.rowData.arrayFilter, this.s.rowData.binsOriginal = this.s.rowData.bins, this.s.displayed = !0)
    }, T.prototype.show = function() {
        this.s.displayed && (this.dom.topRow.removeClass(this.classes.bordered), this.dom.nameButton.removeClass(this.classes.disabledButton), this.dom.countButton.removeClass(this.classes.disabledButton), this.dom.searchButton.removeClass(this.classes.disabledButton), this.dom.collapseButton.removeClass(this.classes.rotated), _(this.s.dtPane.table().container()).removeClass(this.classes.hidden), this.dom.topRow.trigger("collapse.dtsps"))
    }, T.prototype._uniqueRatio = function(t, s) {
        return 0 < s && (0 < this.s.rowData.totalOptions && !this.s.dt.page.info().serverSide || this.s.dt.page.info().serverSide && 0 < this.s.tableLength) ? t / this.s.rowData.totalOptions : 1
    }, T.prototype.updateTable = function() {
        var t = this.s.dtPane.rows({
            selected: !0
        }).data().toArray().map(function(t) {
            return t.filter
        });
        this.s.selections = t,
            this._searchExtras()
    }, T.prototype._getComparisonRows = function() {
        var t = this.s.colOpts.options || (this.s.customPaneSettings && this.s.customPaneSettings.options ? this.s.customPaneSettings.options : b);
        if (t !== b) {
            var s = this.s.dt.rows(),
                e = s.data().toArray(),
                a = [];
            this.s.dtPane.clear(),
                this.s.indexes = [];
            for (var i = 0, n = t; i < n.length; i++) {
                var o = n[i],
                    r = "" !== o.label ? o.label : this.emptyMessage(),
                    l = {
                        className: o.className,
                        display: r,
                        filter: "function" == typeof o.value ? o.value : [],
                        sort: r,
                        total: 0,
                        type: r
                    };
                if ("function" == typeof o.value) {
                    for (var h = 0; h < e.length; h++)
                        o.value.call(this.s.dt, e[h], s[0][h]) && l.total++;
                    "function" != typeof l.filter && l.filter.push(o.filter)
                }
                a.push(this.addRow(l.display, l.filter, l.sort, l.type, l.className, l.total))
            }
            return a
        }
    }, T.prototype._getMessage = function(t) {
        return this.s.dt.i18n("searchPanes.count", this.c.i18n.count).replace(/{total}/g, t.total)
    }, T.prototype._getShown = function(t) {
        return b
    }, T.prototype._getPaneConfig = function() {
        var a = this,
            t = C.Scroller,
            s = this.s.dt.settings()[0].oLanguage;
        return s.url = b, s.sUrl = b, {
            columnDefs: [{
                className: "dtsp-nameColumn",
                data: "display",
                render: function(t, s, e) {
                    return "sort" === s ? e.sort : "type" === s ? e.type : (e = a._getMessage(e), e = '<span class="' + a.classes.pill + '">' + e + "</span>", a.c.viewCount && a.s.colOpts.viewCount || (e = ""), "filter" === s ? "string" == typeof t && null !== t.match(/<[^>]*>/) ? t.replace(/<[^>]*>/g, "") : t : '<div class="' + a.classes.nameCont + '"><span title="' + ("string" == typeof t && null !== t.match(/<[^>]*>/) ? t.replace(/<[^>]*>/g, "") : t) + '" class="' + a.classes.name + '">' + t + "</span>" + e + "</div>")
                },
                targets: 0,
                type: this.s.dt.settings()[0].aoColumns[this.s.index] ? this.s.dt.settings()[0].aoColumns[this.s.index]._sManualType : null
            }, {
                className: "dtsp-countColumn " + this.classes.badgePill,
                data: "total",
                searchable: !1,
                targets: 1,
                visible: !1
            }],
            deferRender: !0,
            dom: "t",
            info: !1,
            language: s,
            paging: !!t,
            scrollX: !1,
            scrollY: "200px",
            scroller: !!t,
            select: !0,
            stateSave: !!this.s.dt.settings()[0].oFeatures.bStateSave
        }
    }, T.prototype._makeSelection = function() {
        this.updateTable(),
            this.s.updating = !0,
            this.s.dt.draw(!1),
            this.s.updating = !1
    }, T.prototype._populatePaneArray = function(t, s, e, a) {
        var i;
        void 0 === a && (a = this.s.rowData.bins),
            "string" == typeof this.s.colOpts.orthogonal ? (i = e.oApi._fnGetCellData(e, t, this.s.index, this.s.colOpts.orthogonal), this.s.rowData.filterMap.set(t, i), this._addOption(i, i, i, i, s, a)) : ("string" == typeof (i = null === (i = e.oApi._fnGetCellData(e, t, this.s.index, this.s.colOpts.orthogonal.search)) ? "" : i) && (i = i.replace(/<[^>]*>/g, "")), this.s.rowData.filterMap.set(t, i), a[i] ? a[i]++ : (a[i] = 1, this._addOption(i, e.oApi._fnGetCellData(e, t, this.s.index, this.s.colOpts.orthogonal.display), e.oApi._fnGetCellData(e, t, this.s.index, this.s.colOpts.orthogonal.sort), e.oApi._fnGetCellData(e, t, this.s.index, this.s.colOpts.orthogonal.type), s, a))),
            this.s.rowData.totalOptions++
    }, T.prototype._reloadSelect = function(t) {
        if (t !== b) {
            for (var s, e = 0; e < t.searchPanes.panes.length; e++)
                if (t.searchPanes.panes[e].id === this.s.index) {
                    s = e;
                    break
                }
            if (s)
                for (var a = this.s.dtPane, i = a.rows({
                    order: "index"
                }).data().map(function(t) {
                    return null !== t.filter ? t.filter.toString() : null
                }).toArray(), n = 0, o = t.searchPanes.panes[s].selected; n < o.length; n++) {
                    var r = o[n],
                        l = -1;
                    -1 < (l = null !== r ? i.indexOf(r.toString()) : l) && (this.s.serverSelecting = !0, a.row(l).select(), this.s.serverSelecting = !1)
                }
        }
    }, T.prototype._updateSelection = function(t) {
        function s() {
            e.s.scrollTop = _(e.s.dtPane.table().node()).parent()[0].scrollTop,
                e.s.dt.page.info().serverSide && !e.s.updating ? e.s.serverSelecting || (e.s.serverSelect = e.s.dtPane.rows({
                    selected: !0
                }).data().toArray(), e.s.dt.draw(!1)) : t && e._makeSelection(),
                i._fnProcessingDisplay(a, !1)
        }
        var e = this,
            a = this.s.dt.settings()[0],
            i = a.oApi;
        a.oFeatures.bProcessing ? (i._fnProcessingDisplay(a, !0), setTimeout(s, 1)) : s()
    }, T.prototype._addOption = function(t, s, e, a, i, n) {
        if (Array.isArray(t) || t instanceof C.Api) {
            if (t instanceof C.Api && (t = t.toArray(), s = s.toArray()), t.length !== s.length)
                throw new Error("display and filter not the same length");
            for (var o = 0; o < t.length; o++)
                n[t[o]] ? n[t[o]]++ : (n[t[o]] = 1, i.push({
                    display: s[o],
                    filter: t[o],
                    sort: e[o],
                    type: a[o]
                })),
                    this.s.rowData.totalOptions++
        } else
            "string" == typeof this.s.colOpts.orthogonal ? (n[t] ? n[t]++ : (n[t] = 1, i.push({
                display: s,
                filter: t,
                sort: e,
                type: a
            })), this.s.rowData.totalOptions++) : i.push({
                display: s,
                filter: t,
                sort: e,
                type: a
            })
    }, T.prototype._buildPane = function(t, s, e) {
        var a = this,
            i = (void 0 === t && (t = []), void 0 === s && (s = null), void 0 === e && (e = null), this.s.selections = [], this.s.dt.state.loaded());
        if (this.s.listSet && (i = this.s.dt.state()), this.s.colExists) {
            var n = -1;
            if (i && i.searchPanes && i.searchPanes.panes)
                for (var o = 0; o < i.searchPanes.panes.length; o++)
                    if (i.searchPanes.panes[o].id === this.s.index) {
                        n = o;
                        break
                    }
            if ((!1 === this.s.colOpts.show || this.s.colOpts.show !== b && !0 !== this.s.colOpts.show) && -1 === n)
                return this.dom.container.addClass(this.classes.hidden), this.s.displayed = !1;
            if (!0 !== this.s.colOpts.show && -1 === n || (this.s.displayed = !0), this.s.dt.page.info().serverSide || s && s.searchPanes && s.searchPanes.options)
                s && s.searchPanes && s.searchPanes.options && this._serverPopulate(s);
            else {
                0 === this.s.rowData.arrayFilter.length && (this.s.rowData.totalOptions = 0, this._populatePane(), this.s.rowData.arrayOriginal = this.s.rowData.arrayFilter, this.s.rowData.binsOriginal = this.s.rowData.bins);
                var r = Object.keys(this.s.rowData.binsOriginal).length,
                    l = this._uniqueRatio(r, this.s.dt.rows()[0].length);
                if (!1 === this.s.displayed && ((this.s.colOpts.show === b && null === this.s.colOpts.threshold ? l > this.c.threshold : l > this.s.colOpts.threshold) || !0 !== this.s.colOpts.show && r <= 1))
                    return this.dom.container.addClass(this.classes.hidden), void (this.s.displayed = !1);
                this.dom.container.addClass(this.classes.show),
                    this.s.displayed = !0
            }
        } else
            this.s.displayed = !0;
        this._displayPane(),
        this.s.listSet || this.dom.dtP.on("stateLoadParams.dtsp", function(t, s, e) {
            _.isEmptyObject(a.s.dt.state.loaded()) && _.each(e, function(t) {
                delete e[t]
            })
        }),
            null !== e && 0 < this.dom.panesContainer.has(e).length ? this.dom.container.insertAfter(e) : this.dom.panesContainer.prepend(this.dom.container);
        l = _.fn.dataTable.ext.errMode,
            _.fn.dataTable.ext.errMode = "none",
            this.s.dtPane = this.dom.dtP.DataTable(_.extend(!0, this._getPaneConfig(), this.c.dtOpts, this.s.colOpts ? this.s.colOpts.dtOpts : {}, this.s.colOpts.options || !this.s.colExists ? {
                createdRow: function(t, s) {
                    _(t).addClass(s.className)
                }
            } : b, null !== this.s.customPaneSettings && this.s.customPaneSettings.dtOpts ? this.s.customPaneSettings.dtOpts : {}, _.fn.dataTable.versionCheck("2") ? {
                layout: {
                    bottomLeft: null,
                    bottomRight: null,
                    topLeft: null,
                    topRight: null
                }
            } : {})),
            this.dom.dtP.addClass(this.classes.table),
            r = "Custom Pane";
        if (this.s.customPaneSettings && this.s.customPaneSettings.header ? r = this.s.customPaneSettings.header : this.s.colOpts.header ? r = this.s.colOpts.header : this.s.colExists && (r = _.fn.dataTable.versionCheck("2") ? this.s.dt.column(this.s.index).title() : this.s.dt.settings()[0].aoColumns[this.s.index].sTitle), r = this._escapeHTML(r), this.dom.searchBox.attr("placeholder", r), _.fn.dataTable.select.init(this.s.dtPane), _.fn.dataTable.ext.errMode = l, this.s.colExists)
            for (var o = 0, h = this.s.rowData.arrayFilter.length; o < h; o++)
                if (this.s.dt.page.info().serverSide)
                    for (var d = this.addRow(this.s.rowData.arrayFilter[o].display, this.s.rowData.arrayFilter[o].filter, this.s.rowData.arrayFilter[o].sort, this.s.rowData.arrayFilter[o].type), c = 0, p = this.s.serverSelect; c < p.length; c++)
                        p[c].filter === this.s.rowData.arrayFilter[o].filter && (this.s.serverSelecting = !0, d.select(), this.s.serverSelecting = !1);
                else
                    !this.s.dt.page.info().serverSide && this.s.rowData.arrayFilter[o] ? this.addRow(this.s.rowData.arrayFilter[o].display, this.s.rowData.arrayFilter[o].filter, this.s.rowData.arrayFilter[o].sort, this.s.rowData.arrayFilter[o].type) : this.s.dt.page.info().serverSide || this.addRow("", "", "", "");
        C.select.init(this.s.dtPane),
        (this.s.colOpts.options || this.s.customPaneSettings && this.s.customPaneSettings.options) && this._getComparisonRows(),
            this.s.dtPane.draw(),
            this.s.dtPane.table().node().parentNode.scrollTop = this.s.scrollTop,
            this.adjustTopRow(),
            this.setListeners(),
            this.s.listSet = !0;
        for (var u = 0, f = t; u < f.length; u++) {
            var g = f[u];
            if (g)
                for (var m = 0, w = this.s.dtPane.rows().indexes().toArray(); m < w.length; m++) {
                    d = w[m];
                    this.s.dtPane.row(d).data() && g.filter === this.s.dtPane.row(d).data().filter && (this.s.dt.page.info().serverSide ? (this.s.serverSelecting = !0, this.s.dtPane.row(d).select(), this.s.serverSelecting = !1) : this.s.dtPane.row(d).select())
                }
        }
        if (this.s.dt.page.info().serverSide && this.s.dtPane.search(this.dom.searchBox.val()).draw(), (this.c.initCollapsed && !1 !== this.s.colOpts.initCollapsed || this.s.colOpts.initCollapsed) && (this.c.collapse && !1 !== this.s.colOpts.collapse || this.s.colOpts.collapse) && (this.s.dtPane.settings()[0]._bInitComplete ? this.collapse() : this.s.dtPane.one("init", function() {
            return a.collapse()
        })), i && i.searchPanes && i.searchPanes.panes && (!s || 1 === s.draw)) {
            this._reloadSelect(i);
            for (var v = 0, P = i.searchPanes.panes; v < P.length; v++) {
                var y = P[v];
                y.id === this.s.index && (y.searchTerm && 0 < y.searchTerm.length && this.dom.searchBox.val(y.searchTerm).trigger("input"), y.order && this.s.dtPane.order(y.order).draw(), y.collapsed ? this.collapse() : this.show())
            }
        }
        return !0
    }, T.prototype._displayPane = function() {
        this.dom.dtP.empty(),
            this.dom.topRow.empty().addClass(this.classes.topRow),
        3 < parseInt(this.c.layout.split("-")[1], 10) && this.dom.container.addClass(this.classes.smallGap),
            this.dom.topRow.addClass(this.classes.subRowsContainer).append(this.dom.upper.append(this.dom.searchCont)).append(this.dom.lower.append(this.dom.buttonGroup)),
        (!1 === this.c.dtOpts.searching || this.s.colOpts.dtOpts && !1 === this.s.colOpts.dtOpts.searching || !this.c.controls || !this.s.colOpts.controls || this.s.customPaneSettings && this.s.customPaneSettings.dtOpts && this.s.customPaneSettings.dtOpts.searching !== b && !this.s.customPaneSettings.dtOpts.searching) && this.dom.searchBox.removeClass(this.classes.paneInputButton).addClass(this.classes.disabledButton).attr("disabled", "true"),
            this.dom.searchBox.appendTo(this.dom.searchCont),
            this._searchContSetup(),
        this.c.clear && this.c.controls && this.s.colOpts.controls && this.dom.clear.appendTo(this.dom.buttonGroup),
        this.c.orderable && this.s.colOpts.orderable && this.c.controls && this.s.colOpts.controls && this.dom.nameButton.appendTo(this.dom.buttonGroup),
        this.c.viewCount && this.s.colOpts.viewCount && this.c.orderable && this.s.colOpts.orderable && this.c.controls && this.s.colOpts.controls && this.dom.countButton.appendTo(this.dom.buttonGroup),
        (this.c.collapse && !1 !== this.s.colOpts.collapse || this.s.colOpts.collapse) && this.c.controls && this.s.colOpts.controls && this.dom.collapseButton.appendTo(this.dom.buttonGroup),
            this.dom.container.prepend(this.dom.topRow).append(this.dom.dtP).show()
    }, T.prototype._escapeHTML = function(t) {
        return t.toString().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    }, T.prototype._getBonusOptions = function() {
        return _.extend(!0, {}, T.defaults, {
            threshold: null
        }, this.c || {})
    }, T.prototype._getOptions = function() {
        var t = this.s.dt.settings()[0].aoColumns[this.s.index].searchPanes,
            s = _.extend(!0, {}, T.defaults, {
                collapse: null,
                emptyMessage: !1,
                initCollapsed: null,
                threshold: null
            }, t);
        return t && t.hideCount && t.viewCount === b && (s.viewCount = !t.hideCount), s
    }, T.prototype._populatePane = function() {
        this.s.rowData.arrayFilter = [],
            this.s.rowData.bins = {};
        var t = this.s.dt.settings()[0];
        if (!this.s.dt.page.info().serverSide)
            for (var s = 0, e = this.s.dt.rows().indexes().toArray(); s < e.length; s++) {
                var a = e[s];
                this._populatePaneArray(a, this.s.rowData.arrayFilter, t)
            }
    }, T.prototype._search = function(t, s) {
        for (var e = this.s.colOpts, a = this.s.dt, i = 0, n = this.s.selections; i < n.length; i++) {
            var o = n[i];
            if ("string" == typeof o && "string" == typeof t && (o = this._escapeHTML(o)), Array.isArray(t)) {
                if ("and" === e.combiner) {
                    if (!t.includes(o))
                        return !1
                } else if (t.includes(o))
                    return !0
            } else if ("function" == typeof o) {
                if (o.call(a, a.row(s).data(), s)) {
                    if ("or" === e.combiner)
                        return !0
                } else if ("and" === e.combiner)
                    return !1
            } else if (t === o || ("string" != typeof t || 0 !== t.length) && t == o || null === o && "string" == typeof t && "" === t)
                return !0
        }
        return "and" === e.combiner
    }, T.prototype._searchContSetup = function() {
        this.c.controls && this.s.colOpts.controls && this.dom.searchButton.appendTo(this.dom.searchLabelCont),
        !1 === this.c.dtOpts.searching || !1 === this.s.colOpts.dtOpts.searching || this.s.customPaneSettings && this.s.customPaneSettings.dtOpts && this.s.customPaneSettings.dtOpts.searching !== b && !this.s.customPaneSettings.dtOpts.searching || this.dom.searchLabelCont.appendTo(this.dom.searchCont)
    }, T.prototype._searchExtras = function() {
        var t = this.s.updating,
            s = (this.s.updating = !0, this.s.dtPane.rows({
                selected: !0
            }).data().pluck("filter").toArray()),
            e = s.indexOf(this.emptyMessage()),
            a = _(this.s.dtPane.table().container());
        -1 < e && (s[e] = ""),
            0 < s.length ? a.addClass(this.classes.selected) : 0 === s.length && a.removeClass(this.classes.selected),
            this.s.updating = t
    }, T.version = "2.1.2", T.classes = {
        bordered: "dtsp-bordered",
        buttonGroup: "dtsp-buttonGroup",
        buttonSub: "dtsp-buttonSub",
        caret: "dtsp-caret",
        clear: "dtsp-clear",
        clearAll: "dtsp-clearAll",
        clearButton: "clearButton",
        collapseAll: "dtsp-collapseAll",
        collapseButton: "dtsp-collapseButton",
        container: "dtsp-searchPane",
        countButton: "dtsp-countButton",
        disabledButton: "dtsp-disabledButton",
        hidden: "dtsp-hidden",
        hide: "dtsp-hide",
        layout: "dtsp-",
        name: "dtsp-name",
        nameButton: "dtsp-nameButton",
        nameCont: "dtsp-nameCont",
        narrow: "dtsp-narrow",
        paneButton: "dtsp-paneButton",
        paneInputButton: "dtsp-paneInputButton",
        pill: "dtsp-pill",
        rotated: "dtsp-rotated",
        search: "dtsp-search",
        searchCont: "dtsp-searchCont",
        searchIcon: "dtsp-searchIcon",
        searchLabelCont: "dtsp-searchButtonCont",
        selected: "dtsp-selected",
        smallGap: "dtsp-smallGap",
        subRow1: "dtsp-subRow1",
        subRow2: "dtsp-subRow2",
        subRowsContainer: "dtsp-subRowsContainer",
        title: "dtsp-title",
        topRow: "dtsp-topRow"
    }, T.defaults = {
        clear: !0,
        collapse: !0,
        combiner: "or",
        container: function(t) {
            return t.table().container()
        },
        controls: !0,
        dtOpts: {},
        emptyMessage: null,
        hideCount: !1,
        i18n: {
            clearPane: "&times;",
            count: "{total}",
            emptyMessage: "<em>No data</em>"
        },
        initCollapsed: !1,
        layout: "auto",
        name: b,
        orderable: !0,
        orthogonal: {
            display: "display",
            filter: "filter",
            hideCount: !1,
            search: "filter",
            show: b,
            sort: "sort",
            threshold: .6,
            type: "type",
            viewCount: !0
        },
        preSelect: [],
        threshold: .6,
        viewCount: !0
    }, n = T, (o && o.__extends || (a = function(t, s) {
        return (a = Object.setPrototypeOf || ({
            __proto__: []
        } instanceof Array ? function(t, s) {
            t.__proto__ = s
        } : function(t, s) {
            for (var e in s)
                s.hasOwnProperty(e) && (t[e] = s[e])
        }))(t, s)
    }, function(t, s) {
        function e() {
            this.constructor = t
        }
        a(t, s),
            t.prototype = null === s ? Object.create(s) : (e.prototype = s.prototype, new e)
    }))(s, r = n), s.prototype._serverPopulate = function(t) {
        this.s.rowData.binsShown = {},
            this.s.rowData.arrayFilter = [],
            t.tableLength !== b ? (this.s.tableLength = t.tableLength, this.s.rowData.totalOptions = this.s.tableLength) : (null === this.s.tableLength || this.s.dt.rows()[0].length > this.s.tableLength) && (this.s.tableLength = this.s.dt.rows()[0].length, this.s.rowData.totalOptions = this.s.tableLength);
        var s = this.s.dt.column(this.s.index).dataSrc();
        if (t.searchPanes.options[s] !== b)
            for (var e = 0, a = t.searchPanes.options[s]; e < a.length; e++) {
                var i = a[e];
                this.s.rowData.arrayFilter.push({
                    display: i.label,
                    filter: i.value,
                    shown: +i.count,
                    sort: i.label,
                    total: +i.total,
                    type: i.label
                }),
                    this.s.rowData.binsShown[i.value] = +i.count,
                    this.s.rowData.bins[i.value] = +i.total
            }
        t = Object.keys(this.s.rowData.bins).length,
            s = this._uniqueRatio(t, this.s.tableLength);
        if (!this.s.colOpts.show && !1 === this.s.displayed && ((this.s.colOpts.show === b && null === this.s.colOpts.threshold ? s > this.c.threshold : s > this.s.colOpts.threshold) || !0 !== this.s.colOpts.show && t <= 1))
            this.dom.container.addClass(this.classes.hidden),
                this.s.displayed = !1;
        else if (this.s.rowData.arrayOriginal = this.s.rowData.arrayFilter, this.s.rowData.binsOriginal = this.s.rowData.bins, this.s.displayed = !0, this.s.dtPane) {
            var n = this.s.serverSelect;
            this.s.dtPane.rows().remove();
            for (var o = 0, r = this.s.rowData.arrayFilter; o < r.length; o++) {
                var l = r[o];
                if (this._shouldAddRow(l))
                    for (var h = this.addRow(l.display, l.filter, l.sort, l.type), d = 0; d < n.length; d++)
                        if ((u = n[d]).filter === l.filter) {
                            this.s.serverSelecting = !0,
                                h.select(),
                                this.s.serverSelecting = !1,
                                n.splice(d, 1),
                                this.s.selections.push(l.filter);
                            break
                        }
            }
            for (var c = 0, p = n; c < p.length; c++)
                for (var u = p[c], f = 0, g = this.s.rowData.arrayOriginal; f < g.length; f++)
                    (l = g[f]).filter === u.filter && (h = this.addRow(l.display, l.filter, l.sort, l.type), this.s.serverSelecting = !0, h.select(), this.s.serverSelecting = !1, this.s.selections.push(l.filter));
            this.s.serverSelect = this.s.dtPane.rows({
                selected: !0
            }).data().toArray(),
                this.s.dtPane.draw()
        }
    }, s.prototype.updateRows = function() {
        if (!this.s.dt.page.info().serverSide) {
            this.s.rowData.binsShown = {};
            for (var t = 0, s = this.s.dt.rows({
                search: "applied"
            }).indexes().toArray(); t < s.length; t++) {
                var e = s[t];
                this._updateShown(e, this.s.dt.settings()[0], this.s.rowData.binsShown)
            }
        }
        for (var a = 0, i = this.s.dtPane.rows().data().toArray(); a < i.length; a++) {
            var n = i[a];
            n.shown = "number" == typeof this.s.rowData.binsShown[n.filter] ? this.s.rowData.binsShown[n.filter] : 0,
                this.s.dtPane.row(n.index).data(n)
        }
        this.s.dtPane.draw(),
            this.s.dtPane.table().node().parentNode.scrollTop = this.s.scrollTop
    }, s.prototype._makeSelection = function() {}, s.prototype._reloadSelect = function() {}, s.prototype._shouldAddRow = function(t) {
        return !0
    }, s.prototype._updateSelection = function() {
        !this.s.dt.page.info().serverSide || this.s.updating || this.s.serverSelecting || (this.s.serverSelect = this.s.dtPane.rows({
            selected: !0
        }).data().toArray())
    }, s.prototype._updateShown = function(t, s, e) {
        void 0 === e && (e = this.s.rowData.binsShown);
        function a(t) {
            e[t] ? e[t]++ : e[t] = 1
        }
        var i = "string" == typeof this.s.colOpts.orthogonal ? this.s.colOpts.orthogonal : this.s.colOpts.orthogonal.search,
            s = s.oApi._fnGetCellData(s, t, this.s.index, i);
        if (Array.isArray(s))
            for (var n = 0, o = s; n < o.length; n++)
                a(o[n]);
        else
            a(s)
    }, t = s, (o && o.__extends || (l = function(t, s) {
        return (l = Object.setPrototypeOf || ({
            __proto__: []
        } instanceof Array ? function(t, s) {
            t.__proto__ = s
        } : function(t, s) {
            for (var e in s)
                s.hasOwnProperty(e) && (t[e] = s[e])
        }))(t, s)
    }, function(t, s) {
        function e() {
            this.constructor = t
        }
        l(t, s),
            t.prototype = null === s ? Object.create(s) : (e.prototype = s.prototype, new e)
    }))(e, d = t), e.prototype._getMessage = function(t) {
        var s = this.s.dt.i18n("searchPanes.count", this.c.i18n.count),
            e = this.s.dt.i18n("searchPanes.countFiltered", this.c.i18n.countFiltered);
        return (this.s.filteringActive ? e : s).replace(/{total}/g, t.total).replace(/{shown}/g, t.shown)
    }, e.prototype._getShown = function(t) {
        return this.s.rowData.binsShown && this.s.rowData.binsShown[t] ? this.s.rowData.binsShown[t] : 0
    }, u = e, (o && o.__extends || (c = function(t, s) {
        return (c = Object.setPrototypeOf || ({
            __proto__: []
        } instanceof Array ? function(t, s) {
            t.__proto__ = s
        } : function(t, s) {
            for (var e in s)
                s.hasOwnProperty(e) && (t[e] = s[e])
        }))(t, s)
    }, function(t, s) {
        function e() {
            this.constructor = t
        }
        c(t, s),
            t.prototype = null === s ? Object.create(s) : (e.prototype = s.prototype, new e)
    }))(L, f = t), L.prototype.updateRows = function() {
        var t = this.s.dtPane.rows({
            selected: !0
        }).data().toArray();
        if (this.s.colOpts.options || this.s.customPaneSettings && this.s.customPaneSettings.options) {
            this._getComparisonRows();
            for (var s = this.s.dtPane.rows().toArray()[0], e = 0; e < s.length; e++) {
                var a = (u = this.s.dtPane.row(s[e])).data();
                if (a !== b)
                    if (0 === a.shown)
                        u.remove(),
                            s = this.s.dtPane.rows().toArray()[0],
                            e--;
                    else
                        for (var i = 0, n = t; i < n.length; i++) {
                            var o = n[i];
                            if (a.filter === o.filter) {
                                u.select(),
                                    t.splice(e, 1),
                                    this.s.selections.push(a.filter);
                                break
                            }
                        }
            }
        } else {
            if (!this.s.dt.page.info().serverSide) {
                this._activePopulatePane(),
                    this.s.rowData.binsShown = {};
                for (var r = 0, l = this.s.dt.rows({
                    search: "applied"
                }).indexes().toArray(); r < l.length; r++) {
                    var h = l[r];
                    this._updateShown(h, this.s.dt.settings()[0], this.s.rowData.binsShown)
                }
            }
            this.s.dtPane.rows().remove();
            for (var d = 0, c = this.s.rowData.arrayFilter; d < c.length; d++) {
                var p = c[d];
                if (0 !== p.shown)
                    for (var u = this.addRow(p.display, p.filter, p.sort, p.type, b), e = 0; e < t.length; e++)
                        if ((o = t[e]).filter === p.filter) {
                            u.select(),
                                t.splice(e, 1),
                                this.s.selections.push(p.filter);
                            break
                        }
            }
            for (var f = 0, g = t; f < g.length; f++)
                for (var o = g[f], m = 0, w = this.s.rowData.arrayOriginal; m < w.length; m++)
                    (p = w[m]).filter === o.filter && ((u = this.addRow(p.display, p.filter, p.sort, p.type, b)).select(), this.s.selections.push(p.filter))
        }
        this.s.dtPane.draw(),
            this.s.dtPane.table().node().parentNode.scrollTop = this.s.scrollTop,
        this.s.dt.page.info().serverSide || this.s.dt.draw(!1)
    }, L.prototype._activePopulatePane = function() {
        this.s.rowData.arrayFilter = [],
            this.s.rowData.bins = {};
        var t = this.s.dt.settings()[0];
        if (!this.s.dt.page.info().serverSide)
            for (var s = 0, e = this.s.dt.rows({
                search: "applied"
            }).indexes().toArray(); s < e.length; s++) {
                var a = e[s];
                this._populatePaneArray(a, this.s.rowData.arrayFilter, t)
            }
    }, L.prototype._getComparisonRows = function() {
        var t = this.s.colOpts.options || (this.s.customPaneSettings && this.s.customPaneSettings.options ? this.s.customPaneSettings.options : b);
        if (t !== b) {
            var s = this.s.dt.rows(),
                e = this.s.dt.rows({
                    search: "applied"
                }),
                a = s.data().toArray(),
                i = e.data().toArray(),
                n = [];
            this.s.dtPane.clear(),
                this.s.indexes = [];
            for (var o = 0, r = t; o < r.length; o++) {
                var l = r[o],
                    h = "" !== l.label ? l.label : this.emptyMessage(),
                    d = {
                        className: l.className,
                        display: h,
                        filter: "function" == typeof l.value ? l.value : [],
                        shown: 0,
                        sort: h,
                        total: 0,
                        type: h
                    };
                if ("function" == typeof l.value) {
                    for (var c = 0; c < a.length; c++)
                        l.value.call(this.s.dt, a[c], s[0][c]) && d.total++;
                    for (c = 0; c < i.length; c++)
                        l.value.call(this.s.dt, i[c], e[0][c]) && d.shown++;
                    "function" != typeof d.filter && d.filter.push(l.filter)
                }
                n.push(this.addRow(d.display, d.filter, d.sort, d.type, d.className, d.total, d.shown))
            }
            return n
        }
    }, L.prototype._getMessage = function(t) {
        return this.s.dt.i18n("searchPanes.count", this.c.i18n.count).replace(/{total}/g, t.total).replace(/{shown}/g, t.shown)
    }, L.prototype._getShown = function(t) {
        return this.s.rowData.binsShown && this.s.rowData.binsShown[t] ? this.s.rowData.binsShown[t] : 0
    }, L.prototype._shouldAddRow = function(t) {
        return 0 < t.shown
    }, w = L, (o && o.__extends || (g = function(t, s) {
        return (g = Object.setPrototypeOf || ({
            __proto__: []
        } instanceof Array ? function(t, s) {
            t.__proto__ = s
        } : function(t, s) {
            for (var e in s)
                s.hasOwnProperty(e) && (t[e] = s[e])
        }))(t, s)
    }, function(t, s) {
        function e() {
            this.constructor = t
        }
        g(t, s),
            t.prototype = null === s ? Object.create(s) : (e.prototype = s.prototype, new e)
    }))(R, v = w), R.prototype._activePopulatePane = function() {
        this.s.rowData.arrayFilter = [],
            this.s.rowData.binsShown = {};
        var t = this.s.dt.settings()[0];
        if (!this.s.dt.page.info().serverSide)
            for (var s = 0, e = this.s.dt.rows({
                search: "applied"
            }).indexes().toArray(); s < e.length; s++) {
                var a = e[s];
                this._populatePaneArray(a, this.s.rowData.arrayFilter, t, this.s.rowData.binsShown)
            }
    }, R.prototype._getMessage = function(t) {
        var s = this.s.dt.i18n("searchPanes.count", this.c.i18n.count),
            e = this.s.dt.i18n("searchPanes.countFiltered", this.c.i18n.countFiltered);
        return (this.s.filteringActive ? e : s).replace(/{total}/g, t.total).replace(/{shown}/g, t.shown)
    }, S = R, M.prototype.clearSelections = function() {
        for (var t = 0, s = this.s.panes; t < s.length; t++)
            (e = s[t]).s.dtPane && (e.s.scrollTop = e.s.dtPane.table().node().parentNode.scrollTop);
        this.dom.container.find("." + this.classes.search.replace(/\s+/g, ".")).each(function() {
            P(this).val("").trigger("input")
        }),
            this.s.selectionList = [];
        for (var e, a = [], i = 0, n = this.s.panes; i < n.length; i++)
            (e = n[i]).s.dtPane && a.push(e.clearPane());
        return a
    }, M.prototype.getNode = function() {
        return this.dom.container
    }, M.prototype.rebuild = function(t, s) {
        void 0 === t && (t = !1),
        void 0 === s && (s = !1),
            this.dom.emptyMessage.detach(),
        !1 === t && this.dom.panes.empty();
        for (var e = [], a = 0, i = this.s.panes; a < i.length; a++) {
            var n = i[a];
            !1 !== t && n.s.index !== t || (n.clearData(), n.rebuildPane(this.s.dt.page.info().serverSide ? this.s.serverData : b, s), this.dom.panes.append(n.dom.container), e.push(n))
        }
        return this._updateSelection(), this._updateFilterCount(), this._attachPaneContainer(), this._initSelectionListeners(!1), this.s.dt.draw(!s), this.resizePanes(), 1 === e.length ? e[0] : e
    }, M.prototype.resizePanes = function() {
        if ("auto" === this.c.layout) {
            for (var t = P(this.s.dt.searchPanes.container()).width(), t = Math.floor(t / this.s.minPaneWidth), s = 1, e = 0, a = [], i = 0, n = this.s.panes; i < n.length; i++)
                (d = n[i]).s.displayed && a.push(d.s.index);
            var o = a.length;
            if (t === o)
                s = t;
            else
                for (var r = t; 1 < r; r--) {
                    var l = o % r;
                    if (0 == l) {
                        s = r,
                            e = 0;
                        break
                    }
                    e < l && (s = r, e = l)
                }
            var h = 0 !== e ? a.slice(a.length - e, a.length) : [];
            this.s.panes.forEach(function(t) {
                t.s.displayed && t.resize("columns-" + (h.includes(t.s.index) ? e : s))
            })
        } else
            for (var d, c = 0, p = this.s.panes; c < p.length; c++)
                (d = p[c]).adjustTopRow();
        return this
    }, M.prototype._initSelectionListeners = function(t) {}, M.prototype._serverTotals = function() {}, M.prototype._setXHR = function() {
        function a(t) {
            t && t.searchPanes && t.searchPanes.options && (s.s.serverData = t, s.s.serverData.tableLength = t.recordsTotal, s._serverTotals())
        }
        var s = this,
            i = this.s.dt.settings()[0];
        this.s.dt.on("xhr.dtsps", function(t, s, e) {
            i === s && a(e)
        }),
            a(this.s.dt.ajax.json())
    }, M.prototype._stateLoadListener = function() {
        var h = this,
            d = this.s.dt.settings()[0];
        this.s.dt.on("stateLoadParams.dtsps", function(t, s, e) {
            if (e.searchPanes !== b && s === d) {
                if (h.clearSelections(), h.s.selectionList = e.searchPanes.selectionList || [], e.searchPanes.panes)
                    for (var a = 0, i = e.searchPanes.panes; a < i.length; a++)
                        for (var n = i[a], o = 0, r = h.s.panes; o < r.length; o++) {
                            var l = r[o];
                            n.id === l.s.index && l.s.dtPane && (l.dom.searchBox.val(n.searchTerm), l.s.dtPane.order(n.order))
                        }
                h._makeSelections(h.s.selectionList)
            }
        })
    }, M.prototype._updateSelection = function() {
        this.s.selectionList = [];
        for (var t = 0, s = this.s.panes; t < s.length; t++) {
            var e,
                a = s[t];
            a.s.dtPane && (e = a.s.dtPane.rows({
                selected: !0
            }).data().toArray().map(function(t) {
                return t.filter
            })).length && this.s.selectionList.push({
                column: a.s.index,
                rows: e
            })
        }
    }, M.prototype._attach = function() {
        var t = this;
        this.dom.titleRow.removeClass(this.classes.hide).detach().append(this.dom.title),
        this.c.clear && this.dom.clearAll.appendTo(this.dom.titleRow).on("click.dtsps", function() {
            return t.clearSelections()
        }),
        this.c.collapse && (this.dom.showAll.appendTo(this.dom.titleRow), this.dom.collapseAll.appendTo(this.dom.titleRow), this._setCollapseListener());
        for (var s = 0, e = this.s.panes; s < e.length; s++) {
            var a = e[s];
            this.dom.panes.append(a.dom.container)
        }
        this.dom.container.text("").removeClass(this.classes.hide).append(this.dom.titleRow).append(this.dom.panes),
            this.s.panes.forEach(function(t) {
                return t.setListeners()
            }),
        0 === P("div." + this.classes.container).length && this.dom.container.prependTo(this.s.dt)
    }, M.prototype._attachMessage = function() {
        var s;
        try {
            s = this.s.dt.i18n("searchPanes.emptyPanes", this.c.i18n.emptyPanes)
        } catch (t) {
            s = null
        }
        null === s ? (this.dom.container.addClass(this.classes.hide), this.dom.titleRow.removeClass(this.classes.hide)) : (this.dom.container.removeClass(this.classes.hide), this.dom.titleRow.addClass(this.classes.hide), this.dom.emptyMessage.html(s).appendTo(this.dom.container))
    }, M.prototype._attachPaneContainer = function() {
        for (var t = 0, s = this.s.panes; t < s.length; t++)
            if (!0 === s[t].s.displayed)
                return void this._attach();
        this._attachMessage()
    }, M.prototype._checkCollapse = function() {
        for (var t = !0, s = !0, e = 0, a = this.s.panes; e < a.length; e++) {
            var i = a[e];
            i.s.displayed && (i.dom.collapseButton.hasClass(i.classes.rotated) ? (this.dom.showAll.removeClass(this.classes.disabledButton).removeAttr("disabled"), s = !1) : (this.dom.collapseAll.removeClass(this.classes.disabledButton).removeAttr("disabled"), t = !1))
        }
        t && this.dom.collapseAll.addClass(this.classes.disabledButton).attr("disabled", "true"),
        s && this.dom.showAll.addClass(this.classes.disabledButton).attr("disabled", "true")
    }, M.prototype._checkMessage = function() {
        for (var t = 0, s = this.s.panes; t < s.length; t++)
            if (!0 === s[t].s.displayed)
                return this.dom.emptyMessage.detach(), void this.dom.titleRow.removeClass(this.classes.hide);
        this._attachMessage()
    }, M.prototype._collapseAll = function() {
        for (var t = 0, s = this.s.panes; t < s.length; t++)
            s[t].collapse()
    }, M.prototype._findPane = function(t) {
        for (var s = 0, e = this.s.panes; s < e.length; s++) {
            var a = e[s];
            if (t === a.s.name)
                return a
        }
    }, M.prototype._getState = function() {
        var t = this.s.dt.state.loaded();
        t && t.searchPanes && t.searchPanes.selectionList && (this.s.selectionList = t.searchPanes.selectionList)
    }, M.prototype._makeSelections = function(t) {
        for (var s = 0, e = t; s < e.length; s++) {
            for (var a = e[s], i = void 0, n = 0, o = this.s.panes; n < o.length; n++) {
                var r = o[n];
                if (r.s.index === a.column) {
                    i = r;
                    break
                }
            }
            if (i && i.s.dtPane) {
                for (var l = 0; l < i.s.dtPane.rows().data().toArray().length; l++)
                    a.rows.includes("function" == typeof i.s.dtPane.row(l).data().filter ? i.s.dtPane.cell(l, 0).data() : i.s.dtPane.row(l).data().filter) && i.s.dtPane.row(l).select();
                i.updateTable()
            }
        }
    }, M.prototype._paneDeclare = function(t, s, e) {
        for (var a = this, i = (t.columns(0 < this.c.columns.length ? this.c.columns : b).eq(0).each(function(t) {
            a.s.panes.push(new a.s.paneClass(s, e, t, a.dom.panes))
        }), t.columns().eq(0).toArray().length), n = 0; n < this.c.panes.length; n++)
            this.s.panes.push(new this.s.paneClass(s, e, i + n, this.dom.panes, this.c.panes[n]));
        0 < this.c.order.length && (this.s.panes = this.c.order.map(function(t) {
            return a._findPane(t)
        })),
            this.s.dt.settings()[0]._bInitComplete ? this._startup(t) : this.s.dt.settings()[0].aoInitComplete.push({
                fn: function() {
                    return a._startup(t)
                }
            })
    }, M.prototype._setCollapseListener = function() {
        var t = this;
        this.dom.collapseAll.on("click.dtsps", function() {
            t._collapseAll(),
                t.dom.collapseAll.addClass(t.classes.disabledButton).attr("disabled", "true"),
                t.dom.showAll.removeClass(t.classes.disabledButton).removeAttr("disabled"),
                t.s.dt.state.save()
        }),
            this.dom.showAll.on("click.dtsps", function() {
                t._showAll(),
                    t.dom.showAll.addClass(t.classes.disabledButton).attr("disabled", "true"),
                    t.dom.collapseAll.removeClass(t.classes.disabledButton).removeAttr("disabled"),
                    t.s.dt.state.save()
            });
        for (var s = 0, e = this.s.panes; s < e.length; s++)
            e[s].dom.topRow.on("collapse.dtsps", function() {
                return t._checkCollapse()
            });
        this._checkCollapse()
    }, M.prototype._showAll = function() {
        for (var t = 0, s = this.s.panes; t < s.length; t++)
            s[t].show()
    }, M.prototype._startup = function(i) {
        for (var d = this, c = (this._attach(), this.dom.panes.empty(), this.s.dt.settings()[0]), t = 0, s = this.s.panes; t < s.length; t++) {
            var e = s[t];
            e.rebuildPane(0 < Object.keys(this.s.serverData).length ? this.s.serverData : b),
                this.dom.panes.append(e.dom.container)
        }
        "auto" === this.c.layout && this.resizePanes();
        var a = this.s.dt.state.loaded(),
            n = (!this.s.stateRead && a && this.s.dt.page(a.start / this.s.dt.page.len()).draw("page"), this.s.stateRead = !0, this._checkMessage(), i.on("preDraw.dtsps", function() {
                d.s.updating || d.s.paging || (d._updateFilterCount(), d._updateSelection()),
                    d.s.paging = !1
            }), P(o).on("resize.dtsps", y.util.throttle(function() {
                return d.resizePanes()
            })), this.s.dt.on("stateSaveParams.dtsps", function(t, s, e) {
                s === c && (e.searchPanes === b && (e.searchPanes = {}), e.searchPanes.selectionList = d.s.selectionList)
            }), this._stateLoadListener(), i.off("page.dtsps page-nc.dtsps").on("page.dtsps page-nc.dtsps", function(t, s) {
                d.s.paging = !0,
                    d.s.pagingST = !0,
                    d.s.page = d.s.dt.page()
            }), this.s.dt.page.info().serverSide ? i.off("preXhr.dtsps").on("preXhr.dtsps", function(t, s, e) {
                if (s === c) {
                    e.searchPanes || (e.searchPanes = {}),
                    e.searchPanes_null || (e.searchPanes_null = {});
                    for (var a = 0, i = 0, n = d.s.panes; i < n.length; i++) {
                        var o = n[i],
                            r = d.s.dt.column(o.s.index).dataSrc();
                        if (e.searchPanes[r] || (e.searchPanes[r] = {}), e.searchPanes_null[r] || (e.searchPanes_null[r] = {}), o.s.dtPane)
                            for (var l = o.s.dtPane.rows({
                                selected: !0
                            }).data().toArray(), h = 0; h < l.length; h++)
                                e.searchPanes[r][h] = l[h].filter,
                                e.searchPanes[r][h] || (e.searchPanes_null[r][h] = !0),
                                    a++
                    }
                    0 < a && (a !== d.s.filterCount ? (e.start = 0, d.s.page = 0) : e.start = d.s.page * d.s.dt.page.len(), d.s.dt.page(d.s.page), d.s.filterCount = a),
                    0 < d.s.selectionList.length && (e.searchPanesLast = d.s.dt.column(d.s.selectionList[d.s.selectionList.length - 1].column).dataSrc()),
                        e.searchPanes_options = {
                            cascade: d.c.cascadePanes,
                            viewCount: d.c.viewCount,
                            viewTotal: d.c.viewTotal
                        }
                }
            }) : i.on("preXhr.dtsps", function() {
                return d.s.panes.forEach(function(t) {
                    return t.clearData()
                })
            }), this.s.dt.on("xhr.dtsps", function(t, s) {
                var i;
                s.nTable !== d.s.dt.table().node() || d.s.dt.page.info().serverSide || (i = !1, d.s.dt.one("preDraw.dtsps", function() {
                    if (!i) {
                        var t = d.s.dt.page();
                        i = !0,
                            d.s.updating = !0,
                            d.dom.panes.empty();
                        for (var s = 0, e = d.s.panes; s < e.length; s++) {
                            var a = e[s];
                            a.clearData(),
                                a.rebuildPane(b, !0),
                                d.dom.panes.append(a.dom.container)
                        }
                        d.s.dt.page.info().serverSide || d.s.dt.draw(),
                            d.s.updating = !1,
                            d._updateSelection(),
                            d._checkMessage(),
                            d.s.dt.one("draw.dtsps", function() {
                                d.s.updating = !0,
                                    d.s.dt.page(t).draw(!1),
                                    d.s.updating = !1
                            })
                    }
                }))
            }), this.c.preSelect);
        a && a.searchPanes && a.searchPanes.selectionList && (n = a.searchPanes.selectionList),
            this._makeSelections(n),
            this._updateFilterCount(),
            i.on("destroy.dtsps", function(t, s) {
                if (s === c) {
                    for (var e = 0, a = d.s.panes; e < a.length; e++)
                        a[e].destroy();
                    i.off(".dtsps"),
                        d.dom.showAll.off(".dtsps"),
                        d.dom.clearAll.off(".dtsps"),
                        d.dom.collapseAll.off(".dtsps"),
                        P(i.table().node()).off(".dtsps"),
                        d.dom.container.detach(),
                        d.clearSelections()
                }
            }),
        this.c.collapse && this._setCollapseListener(),
        this.c.clear && this.dom.clearAll.on("click.dtsps", function() {
            return d.clearSelections()
        }),
            (c._searchPanes = this).s.dt.state.save()
    }, M.prototype._updateFilterCount = function() {
        for (var t = 0, s = 0, e = this.s.panes; s < e.length; s++) {
            var a = e[s];
            a.s.dtPane && (t += a.getPaneCount())
        }
        this.dom.title.html(this.s.dt.i18n("searchPanes.title", this.c.i18n.title, t)),
        this.c.filterChanged && "function" == typeof this.c.filterChanged && this.c.filterChanged.call(this.s.dt, t),
            0 === t ? this.dom.clearAll.addClass(this.classes.disabledButton).attr("disabled", "true") : this.dom.clearAll.removeClass(this.classes.disabledButton).removeAttr("disabled")
    }, M.version = "2.2.0", M.classes = {
        clear: "dtsp-clear",
        clearAll: "dtsp-clearAll",
        collapseAll: "dtsp-collapseAll",
        container: "dtsp-searchPanes",
        disabledButton: "dtsp-disabledButton",
        emptyMessage: "dtsp-emptyMessage",
        hide: "dtsp-hidden",
        panes: "dtsp-panesContainer",
        search: "dtsp-search",
        showAll: "dtsp-showAll",
        title: "dtsp-title",
        titleRow: "dtsp-titleRow"
    }, M.defaults = {
        cascadePanes: !1,
        clear: !0,
        collapse: !0,
        columns: [],
        container: function(t) {
            return t.table().container()
        },
        filterChanged: b,
        i18n: {
            clearMessage: "Clear All",
            clearPane: "&times;",
            collapse: {
                0: "SearchPanes",
                _: "SearchPanes (%d)"
            },
            collapseMessage: "Collapse All",
            count: "{total}",
            emptyMessage: "<em>No data</em>",
            emptyPanes: "No SearchPanes",
            loadMessage: "Loading Search Panes...",
            showMessage: "Show All",
            title: "Filters Active - %d"
        },
        layout: "auto",
        order: [],
        panes: [],
        preSelect: [],
        viewCount: !0,
        viewTotal: !1
    }, O = M, (o && o.__extends || (x = function(t, s) {
        return (x = Object.setPrototypeOf || ({
            __proto__: []
        } instanceof Array ? function(t, s) {
            t.__proto__ = s
        } : function(t, s) {
            for (var e in s)
                s.hasOwnProperty(e) && (t[e] = s[e])
        }))(t, s)
    }, function(t, s) {
        function e() {
            this.constructor = t
        }
        x(t, s),
            t.prototype = null === s ? Object.create(s) : (e.prototype = s.prototype, new e)
    }))(k, N = O), k.prototype._initSelectionListeners = function(t, s) {
        void 0 === s && (s = []),
        (t = void 0 === t ? !0 : t) && (this.s.selectionList = s);
        for (var e = 0, a = this.s.panes; e < a.length; e++) {
            var i = a[e];
            i.s.displayed && i.s.dtPane.off("select.dtsp").on("select.dtsp", this._update(i)).off("deselect.dtsp").on("deselect.dtsp", this._updateTimeout(i))
        }
        this.s.dt.off("draw.dtsps").on("draw.dtsps", this._update()),
            this._updateSelectionList()
    }, k.prototype._serverTotals = function() {
        for (var t = 0, s = this.s.panes; t < s.length; t++) {
            var e = s[t];
            if (e.s.colOpts.show) {
                var a = this.s.dt.column(e.s.index).dataSrc(),
                    i = !0;
                if (this.s.serverData.searchPanes.options[a])
                    for (var n = 0, o = this.s.serverData.searchPanes.options[a]; n < o.length; n++) {
                        var r = o[n];
                        if (r.total !== r.count) {
                            i = !1;
                            break
                        }
                    }
                e.s.filteringActive = !i,
                    e._serverPopulate(this.s.serverData)
            }
        }
    }, k.prototype._stateLoadListener = function() {
        function t(t, s, e) {
            if (e.searchPanes !== b) {
                if (h.s.selectionList = e.searchPanes.selectionList || [], e.searchPanes.panes)
                    for (var a = 0, i = e.searchPanes.panes; a < i.length; a++)
                        for (var n = i[a], o = 0, r = h.s.panes; o < r.length; o++) {
                            var l = r[o];
                            n.id === l.s.index && l.s.dtPane && (l.dom.searchBox.val(n.searchTerm), l.s.dtPane.order(n.order))
                        }
                h._updateSelectionList()
            }
        }
        var h = this;
        this.s.dt.off("stateLoadParams.dtsps", t).on("stateLoadParams.dtsps", t)
    }, k.prototype._updateSelection = function() {}, k.prototype._update = function(t) {
        var s = this;
        return void 0 === t && (t = b), function() {
            t && clearTimeout(t.s.deselectTimeout),
                s._updateSelectionList(t)
        }
    }, k.prototype._updateTimeout = function(t) {
        var s = this;
        return void 0 === t && (t = b), function() {
            return t ? t.s.deselectTimeout = setTimeout(function() {
                return s._updateSelectionList(t)
            }, 50) : s._updateSelectionList()
        }
    }, k.prototype._updateSelectionList = function(s) {
        var t;
        void 0 === s && (s = b),
            this.s.pagingST ? this.s.pagingST = !1 : this.s.updating || s && s.s.serverSelecting || (s !== b && (this.s.dt.page.info().serverSide && s._updateSelection(), t = s.s.dtPane.rows({
                selected: !0
            }).data().toArray().map(function(t) {
                return t.filter
            }), this.s.selectionList = this.s.selectionList.filter(function(t) {
                return t.column !== s.s.index
            }), 0 < t.length ? (this.s.selectionList.push({
                column: s.s.index,
                rows: t
            }), s.dom.clear.removeClass(this.classes.disabledButton).removeAttr("disabled")) : s.dom.clear.addClass(this.classes.disabledButton).attr("disabled", "true"), this.s.dt.page.info().serverSide) && this.s.dt.draw(!1), this._remakeSelections(), this._updateFilterCount())
    }, k.prototype._remakeSelections = function() {
        if (this.s.updating = !0, this.s.dt.page.info().serverSide) {
            h = void 0;
            0 < this.s.selectionList.length && (h = this.s.panes[this.s.selectionList[this.s.selectionList.length - 1].column]);
            for (var t = 0, s = this.s.panes; t < s.length; t++)
                !(O = s[t]).s.displayed || h && O.s.index === h.s.index || O.updateRows()
        } else {
            var e = this.s.selectionList,
                a = !1;
            this.clearSelections(),
                this.s.dt.draw(!1),
            this.s.dt.rows().toArray()[0].length > this.s.dt.rows({
                search: "applied"
            }).toArray()[0].length && (a = !0),
                this.s.selectionList = e;
            for (var i = 0, n = this.s.panes; i < n.length; i++)
                (h = n[i]).s.displayed && (h.s.filteringActive = a, h.updateRows());
            for (var o = 0, r = this.s.selectionList; o < r.length; o++) {
                for (var l = r[o], h = void 0, d = 0, c = this.s.panes; d < c.length; d++) {
                    var p = c[d];
                    if (p.s.index === l.column) {
                        h = p;
                        break
                    }
                }
                if (h.s.dtPane) {
                    for (var u = h.s.dtPane.rows().indexes().toArray(), f = 0; f < l.rows.length; f++) {
                        for (var g = !1, m = 0, w = u; m < w.length; m++) {
                            var v = w[m],
                                v = h.s.dtPane.row(v),
                                P = v.data();
                            l.rows[f] === P.filter && (v.select(), g = !0)
                        }
                        g || (l.rows.splice(f, 1), f--)
                    }
                    if (h.s.selections = l.rows, 0 !== l.rows.length) {
                        this.s.dt.draw(!1);
                        for (var y = 0, b = 0, _ = 0, C = 0, S = this.s.panes; C < S.length; C++)
                            (O = S[C]).s.dtPane && b < (y += O.getPaneCount()) && (_++, b = y);
                        for (var O, x = 0 < y, A = 0, D = this.s.panes; A < D.length; A++)
                            (O = D[A]).s.displayed && (a || h.s.index !== O.s.index || !x ? O.s.filteringActive = x || a : 1 === _ && (O.s.filteringActive = !1), O.s.index !== h.s.index) && O.updateRows()
                    }
                }
            }
            this.s.dt.draw(!1)
        }
        this.s.updating = !1
    }, A = k, C = (_ = i).fn.dataTable, y = (P = i).fn.dataTable, (D = (m = p = h = i).fn.dataTable).SearchPanes = O, B.SearchPanes = O, D.SearchPanesST = A, B.SearchPanesST = A, D.SearchPane = n, B.SearchPane = n, D.SearchPaneViewTotal = u, B.SearchPaneViewTotal = u, D.SearchPaneCascade = w, B.SearchPaneCascade = w, D.SearchPaneCascadeViewTotal = S, B.SearchPaneCascadeViewTotal = S, (t = i.fn.dataTable.Api.register)("searchPanes()", function() {
        return this
    }), t("searchPanes.clearSelections()", function() {
        return this.iterator("table", function(t) {
            t._searchPanes && t._searchPanes.clearSelections()
        })
    }), t("searchPanes.rebuildPane()", function(s, e) {
        return this.iterator("table", function(t) {
            t._searchPanes && t._searchPanes.rebuild(s, e)
        })
    }), t("searchPanes.resizePanes()", function() {
        var t = this.context[0];
        return t._searchPanes ? t._searchPanes.resizePanes() : null
    }), t("searchPanes.container()", function() {
        var t = this.context[0];
        return t._searchPanes ? t._searchPanes.getNode() : null
    }), B.ext.buttons.searchPanesClear = {
        action: function(t, s) {
            s.searchPanes.clearSelections()
        },
        text: "Clear Panes"
    }, B.ext.buttons.searchPanes = {
        action: function(t, s, e, a) {
            var i = this;
            a._panes ? (this.popover(a._panes.getNode(), {
                align: "container",
                span: "container"
            }), a._panes.rebuild(b, !0)) : (this.processing(!0), setTimeout(function() {
                E(s, e, a),
                    i.popover(a._panes.getNode(), {
                        align: "container",
                        span: "container"
                    }),
                    a._panes.rebuild(b, !0),
                    i.processing(!1)
            }, 10))
        },
        init: function(t, s, e) {
            t.button(s).text(e.text || t.i18n("searchPanes.collapse", "SearchPanes", 0)),
            t.init().stateSave && E(t, s, e)
        },
        config: {},
        text: ""
    }, i(j).on("preInit.dt.dtsp", function(t, s) {
        "dt" !== t.namespace || !s.oInit.searchPanes && !B.defaults.searchPanes || s._searchPanes || F(s, null, !0)
    }), B.ext.feature.push({
        cFeature: "P",
        fnInit: F
    }), B.ext.features && B.ext.features.register("searchPanes", F), B
});

/*! Bootstrap 5 integration for DataTables' SearchPanes
 * © SpryMedia Ltd - datatables.net/license
 */
!function(n) {
    var a,
        s;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs5", "datatables.net-searchpanes"], function(e) {
        return n(e, window, document)
    }) : "object" == typeof exports ? (a = require("jquery"), s = function(e, t) {
        t.fn.dataTable || require("datatables.net-bs5")(e, t),
        t.fn.dataTable.SearchPanes || require("datatables.net-searchpanes")(e, t)
    }, "undefined" == typeof window ? module.exports = function(e, t) {
        return e = e || window, t = t || a(e), s(e, t), n(t, 0, e.document)
    } : (s(window, a), module.exports = n(a, window, window.document))) : n(jQuery, window, document)
}(function(e, t, n, a) {
    "use strict";
    var s = e.fn.dataTable;
    return e.extend(!0, s.SearchPane.classes, {
        buttonGroup: "btn-group",
        disabledButton: "disabled",
        narrow: "col",
        pane: {
            container: "table"
        },
        paneButton: "btn btn-subtle",
        pill: "badge rounded-pill bg-secondary",
        search: "form-control search",
        table: "table table-sm table-borderless",
        topRow: "dtsp-topRow"
    }), e.extend(!0, s.SearchPanes.classes, {
        clearAll: "dtsp-clearAll btn btn-subtle",
        collapseAll: "dtsp-collapseAll btn btn-subtle",
        container: "dtsp-searchPanes",
        disabledButton: "disabled",
        panes: "dtsp-panes dtsp-panesContainer",
        search: s.SearchPane.classes.search,
        showAll: "dtsp-showAll btn btn-subtle",
        title: "dtsp-title",
        titleRow: "dtsp-titleRow"
    }), s
});

/*! Select for DataTables 1.7.0
 * © SpryMedia Ltd - datatables.net/license/mit
 */
!function(l) {
    var s,
        c;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(e) {
        return l(e, window, document)
    }) : "object" == typeof exports ? (s = require("jquery"), c = function(e, t) {
        t.fn.dataTable || require("datatables.net")(e, t)
    }, "undefined" == typeof window ? module.exports = function(e, t) {
        return e = e || window, t = t || s(e), c(e, t), l(t, e, e.document)
    } : (c(window, s), module.exports = l(s, window, window.document))) : l(jQuery, window, document)
}(function(m, i, e, h) {
    "use strict";
    var _ = m.fn.dataTable;
    function r(n, e, t) {
        function l(t, l) {
            l < t && (e = l, l = t, t = e);
            var e,
                s = !1;
            return n.columns(":visible").indexes().filter(function(e) {
                return e === t && (s = !0), e === l ? !(s = !1) : s
            })
        }
        function s(t, l) {
            var e,
                s = n.rows({
                    search: "applied"
                }).indexes(),
                c = (s.indexOf(t) > s.indexOf(l) && (e = l, l = t, t = e), !1);
            return s.filter(function(e) {
                return e === t && (c = !0), e === l ? !(c = !1) : c
            })
        }
        var c,
            t = n.cells({
                selected: !0
            }).any() || t ? (c = l(t.column, e.column), s(t.row, e.row)) : (c = l(0, e.column), s(0, e.row)),
            t = n.cells(t, c).flatten();
        n.cells(e, {
            selected: !0
        }).any() ? n.cells(t).deselect() : n.cells(t).select()
    }
    function s(e) {
        var t = e.settings()[0]._select.selector;
        m(e.table().container()).off("mousedown.dtSelect", t).off("mouseup.dtSelect", t).off("click.dtSelect", t),
            m("body").off("click.dtSelect" + p(e.table().node()))
    }
    function c(o) {
        var a,
            t = m(o.table().container()),
            l = o.settings()[0],
            s = l._select.selector;
        t.on("mousedown.dtSelect", s, function(e) {
            (e.shiftKey || e.metaKey || e.ctrlKey) && t.css("-moz-user-select", "none").one("selectstart.dtSelect", s, function() {
                return !1
            }),
            i.getSelection && (a = i.getSelection())
        }).on("mouseup.dtSelect", s, function() {
            t.css("-moz-user-select", "")
        }).on("click.dtSelect", s, function(e) {
            var t,
                l = o.select.items();
            if (a) {
                var s = i.getSelection();
                if ((!s.anchorNode || m(s.anchorNode).closest("table")[0] === o.table().node()) && s !== a)
                    return
            }
            var c,
                s = o.settings()[0],
                n = o.settings()[0].oClasses.sWrapper.trim().replace(/ +/g, ".");
            m(e.target).closest("div." + n)[0] == o.table().container() && (n = o.cell(m(e.target).closest("td, th"))).any() && (c = m.Event("user-select.dt"), u(o, c, [l, n, e]), c.isDefaultPrevented() || (c = n.index(), "row" === l ? (t = c.row, w(e, o, s, "row", t)) : "column" === l ? (t = n.index().column, w(e, o, s, "column", t)) : "cell" === l && (t = n.index(), w(e, o, s, "cell", t)), s._select_lastCell = c))
        }),
            m("body").on("click.dtSelect" + p(o.table().node()), function(e) {
                var t;
                !l._select.blurable || m(e.target).parents().filter(o.table().container()).length || 0 === m(e.target).parents("html").length || m(e.target).parents("div.DTE").length || (t = m.Event("select-blur.dt"), u(o, t, [e.target, e]), t.isDefaultPrevented()) || f(l, !0)
            })
    }
    function u(e, t, l, s) {
        s && !e.flatten().length || ("string" == typeof t && (t += ".dt"), l.unshift(e), m(e.table().node()).trigger(t, l))
    }
    function n(o) {
        var i = new _.Api(o);
        o._select_init = !0,
            o.aoRowCreatedCallback.push({
                fn: function(e, t, l) {
                    var s,
                        c,
                        n = o.aoData[l];
                    for (n._select_selected && m(e).addClass(o._select.className), s = 0, c = o.aoColumns.length; s < c; s++)
                        (o.aoColumns[s]._select_selected || n._selected_cells && n._selected_cells[s]) && m(n.anCells[s]).addClass(o._select.className)
                },
                sName: "select-deferRender"
            }),
            i.on("preXhr.dt.dtSelect", function(e, t) {
                var l,
                    s;
                t === i.settings()[0] && (l = i.rows({
                    selected: !0
                }).ids(!0).filter(function(e) {
                    return e !== h
                }), s = i.cells({
                    selected: !0
                }).eq(0).map(function(e) {
                    var t = i.row(e.row).id(!0);
                    return t ? {
                        row: t,
                        column: e.column
                    } : h
                }).filter(function(e) {
                    return e !== h
                }), i.one("draw.dt.dtSelect", function() {
                    i.rows(l).select(),
                    s.any() && s.each(function(e) {
                        i.cells(e.row, e.column).select()
                    })
                }))
            }),
            i.on("draw.dtSelect.dt select.dtSelect.dt deselect.dtSelect.dt info.dt", function() {
                var s,
                    c,
                    n,
                    o,
                    a,
                    e;
                (e = (s = i).settings()[0])._select.info && e.aanFeatures.i && "api" !== s.select.style() && (c = s.rows({
                    selected: !0
                }).flatten().length, n = s.columns({
                    selected: !0
                }).flatten().length, o = s.cells({
                    selected: !0
                }).flatten().length, a = function(e, t, l) {
                    e.append(m('<span class="select-item"/>').append(s.i18n("select." + t + "s", {
                        _: "%d " + t + "s selected",
                        0: "",
                        1: "1 " + t + " selected"
                    }, l)))
                }, m.each(e.aanFeatures.i, function(e, t) {
                    t = m(t);
                    var l = m('<span class="select-info"/>'),
                        s = (a(l, "row", c), a(l, "column", n), a(l, "cell", o), t.children("span.select-info"));
                    s.length && s.remove(),
                    "" !== l.text() && t.append(l)
                })),
                    i.state.save()
            }),
            i.on("destroy.dtSelect", function() {
                m(i.rows({
                    selected: !0
                }).nodes()).removeClass(i.settings()[0]._select.className),
                    s(i),
                    i.off(".dtSelect"),
                    m("body").off(".dtSelect" + p(i.table().node()))
            })
    }
    function d(e, t, l, s) {
        var c,
            n = e[t + "s"]({
                search: "applied"
            }).indexes(),
            s = m.inArray(s, n),
            o = m.inArray(l, n);
        e[t + "s"]({
            selected: !0
        }).any() || -1 !== s ? (o < s && (c = o, o = s, s = c), n.splice(o + 1, n.length), n.splice(0, s)) : n.splice(m.inArray(l, n) + 1, n.length),
            e[t](l, {
                selected: !0
            }).any() ? (n.splice(m.inArray(l, n), 1), e[t + "s"](n).deselect()) : e[t + "s"](n).select()
    }
    function f(e, t) {
        !t && "single" !== e._select.style || ((t = new _.Api(e)).rows({
            selected: !0
        }).deselect(), t.columns({
            selected: !0
        }).deselect(), t.cells({
            selected: !0
        }).deselect())
    }
    function w(e, t, l, s, c) {
        var n = t.select.style(),
            o = t.select.toggleable(),
            a = t[s](c, {
                selected: !0
            }).any();
        a && !o || ("os" === n ? e.ctrlKey || e.metaKey ? t[s](c).select(!a) : e.shiftKey ? "cell" === s ? r(t, c, l._select_lastCell || null) : d(t, s, c, l._select_lastCell ? l._select_lastCell[s] : null) : (o = t[s + "s"]({
            selected: !0
        }), a && 1 === o.flatten().length ? t[s](c).deselect() : (o.deselect(), t[s](c).select())) : "multi+shift" == n && e.shiftKey ? "cell" === s ? r(t, c, l._select_lastCell || null) : d(t, s, c, l._select_lastCell ? l._select_lastCell[s] : null) : t[s](c).select(!a))
    }
    function p(e) {
        return e.id.replace(/[^a-zA-Z0-9\-\_]/g, "-")
    }
    _.select = {},
        _.select.version = "1.7.0",
        _.select.init = function(c) {
            var e,
                t,
                l,
                s,
                n,
                o,
                a,
                i,
                r,
                u,
                d,
                f = c.settings()[0];
            f._select || (e = c.state.loaded(), t = function(e, t, l) {
                if (null !== l && l.select !== h) {
                    if (c.rows({
                        selected: !0
                    }).any() && c.rows().deselect(), l.select.rows !== h && c.rows(l.select.rows).select(), c.columns({
                        selected: !0
                    }).any() && c.columns().deselect(), l.select.columns !== h && c.columns(l.select.columns).select(), c.cells({
                        selected: !0
                    }).any() && c.cells().deselect(), l.select.cells !== h)
                        for (var s = 0; s < l.select.cells.length; s++)
                            c.cell(l.select.cells[s].row, l.select.cells[s].column).select();
                    c.state.save()
                }
            }, c.on("stateSaveParams", function(e, t, l) {
                l.select = {},
                    l.select.rows = c.rows({
                        selected: !0
                    }).ids(!0).toArray(),
                    l.select.columns = c.columns({
                        selected: !0
                    })[0],
                    l.select.cells = c.cells({
                        selected: !0
                    })[0].map(function(e) {
                        return {
                            row: c.row(e.row).id(!0),
                            column: e.column
                        }
                    })
            }).on("stateLoadParams", t).one("init", function() {
                t(0, 0, e)
            }), s = f.oInit.select, l = _.defaults.select, l = s === h ? l : s, s = "row", i = a = !(o = !(n = "api")), r = "td, th", d = !(u = "selected"), f._select = {}, !0 === l ? (n = "os", d = !0) : "string" == typeof l ? (n = l, d = !0) : m.isPlainObject(l) && (l.blurable !== h && (o = l.blurable), l.toggleable !== h && (a = l.toggleable), l.info !== h && (i = l.info), l.items !== h && (s = l.items), d = (n = l.style !== h ? l.style : "os", !0), l.selector !== h && (r = l.selector), l.className !== h) && (u = l.className), c.select.selector(r), c.select.items(s), c.select.style(n), c.select.blurable(o), c.select.toggleable(a), c.select.info(i), f._select.className = u, m.fn.dataTable.ext.order["select-checkbox"] = function(t, e) {
                return this.api().column(e, {
                    order: "index"
                }).nodes().map(function(e) {
                    return "row" === t._select.items ? m(e).parent().hasClass(t._select.className) : "cell" === t._select.items && m(e).hasClass(t._select.className)
                })
            }, !d && m(c.table().node()).hasClass("selectable") && c.select.style("os"))
        },
        m.each([{
            type: "row",
            prop: "aoData"
        }, {
            type: "column",
            prop: "aoColumns"
        }], function(e, i) {
            _.ext.selector[i.type].push(function(e, t, l) {
                var s,
                    c = t.selected,
                    n = [];
                if (!0 !== c && !1 !== c)
                    return l;
                for (var o = 0, a = l.length; o < a; o++)
                    s = e[i.prop][l[o]],
                    (!0 === c && !0 === s._select_selected || !1 === c && !s._select_selected) && n.push(l[o]);
                return n
            })
        }),
        _.ext.selector.cell.push(function(e, t, l) {
            var s,
                c = t.selected,
                n = [];
            if (c === h)
                return l;
            for (var o = 0, a = l.length; o < a; o++)
                s = e.aoData[l[o].row],
                (!0 !== c || !s._selected_cells || !0 !== s._selected_cells[l[o].column]) && (!1 !== c || s._selected_cells && s._selected_cells[l[o].column]) || n.push(l[o]);
            return n
        });
    var t = _.Api.register,
        l = _.Api.registerPlural;
    function o(t, l) {
        return function(e) {
            return e.i18n("buttons." + t, l)
        }
    }
    function a(e) {
        e = e._eventNamespace;
        return "draw.dt.DT" + e + " select.dt.DT" + e + " deselect.dt.DT" + e
    }
    t("select()", function() {
        return this.iterator("table", function(e) {
            _.select.init(new _.Api(e))
        })
    }),
        t("select.blurable()", function(t) {
            return t === h ? this.context[0]._select.blurable : this.iterator("table", function(e) {
                e._select.blurable = t
            })
        }),
        t("select.toggleable()", function(t) {
            return t === h ? this.context[0]._select.toggleable : this.iterator("table", function(e) {
                e._select.toggleable = t
            })
        }),
        t("select.info()", function(t) {
            return t === h ? this.context[0]._select.info : this.iterator("table", function(e) {
                e._select.info = t
            })
        }),
        t("select.items()", function(t) {
            return t === h ? this.context[0]._select.items : this.iterator("table", function(e) {
                e._select.items = t,
                    u(new _.Api(e), "selectItems", [t])
            })
        }),
        t("select.style()", function(l) {
            return l === h ? this.context[0]._select.style : this.iterator("table", function(e) {
                e._select || _.select.init(new _.Api(e)),
                e._select_init || n(e),
                    e._select.style = l;
                var t = new _.Api(e);
                s(t),
                "api" !== l && c(t),
                    u(new _.Api(e), "selectStyle", [l])
            })
        }),
        t("select.selector()", function(t) {
            return t === h ? this.context[0]._select.selector : this.iterator("table", function(e) {
                s(new _.Api(e)),
                    e._select.selector = t,
                "api" !== e._select.style && c(new _.Api(e))
            })
        }),
        l("rows().select()", "row().select()", function(e) {
            var l = this;
            return !1 === e ? this.deselect() : (this.iterator("row", function(e, t) {
                f(e),
                    e.aoData[t]._select_selected = !0,
                    m(e.aoData[t].nTr).addClass(e._select.className)
            }), this.iterator("table", function(e, t) {
                u(l, "select", ["row", l[t]], !0)
            }), this)
        }),
        t("row().selected()", function() {
            var e = this.context[0];
            return !!(e && this.length && e.aoData[this[0]] && e.aoData[this[0]]._select_selected)
        }),
        l("columns().select()", "column().select()", function(e) {
            var l = this;
            return !1 === e ? this.deselect() : (this.iterator("column", function(e, t) {
                f(e),
                    e.aoColumns[t]._select_selected = !0;
                t = new _.Api(e).column(t);
                m(t.header()).addClass(e._select.className),
                    m(t.footer()).addClass(e._select.className),
                    t.nodes().to$().addClass(e._select.className)
            }), this.iterator("table", function(e, t) {
                u(l, "select", ["column", l[t]], !0)
            }), this)
        }),
        t("column().selected()", function() {
            var e = this.context[0];
            return !!(e && this.length && e.aoColumns[this[0]] && e.aoColumns[this[0]]._select_selected)
        }),
        l("cells().select()", "cell().select()", function(e) {
            var l = this;
            return !1 === e ? this.deselect() : (this.iterator("cell", function(e, t, l) {
                f(e);
                t = e.aoData[t];
                t._selected_cells === h && (t._selected_cells = []),
                    t._selected_cells[l] = !0,
                t.anCells && m(t.anCells[l]).addClass(e._select.className)
            }), this.iterator("table", function(e, t) {
                u(l, "select", ["cell", l.cells(l[t]).indexes().toArray()], !0)
            }), this)
        }),
        t("cell().selected()", function() {
            var e = this.context[0];
            if (e && this.length) {
                e = e.aoData[this[0][0].row];
                if (e && e._selected_cells && e._selected_cells[this[0][0].column])
                    return !0
            }
            return !1
        }),
        l("rows().deselect()", "row().deselect()", function() {
            var l = this;
            return this.iterator("row", function(e, t) {
                e.aoData[t]._select_selected = !1,
                    e._select_lastCell = null,
                    m(e.aoData[t].nTr).removeClass(e._select.className)
            }), this.iterator("table", function(e, t) {
                u(l, "deselect", ["row", l[t]], !0)
            }), this
        }),
        l("columns().deselect()", "column().deselect()", function() {
            var l = this;
            return this.iterator("column", function(s, e) {
                s.aoColumns[e]._select_selected = !1;
                var t = new _.Api(s),
                    l = t.column(e);
                m(l.header()).removeClass(s._select.className),
                    m(l.footer()).removeClass(s._select.className),
                    t.cells(null, e).indexes().each(function(e) {
                        var t = s.aoData[e.row],
                            l = t._selected_cells;
                        !t.anCells || l && l[e.column] || m(t.anCells[e.column]).removeClass(s._select.className)
                    })
            }), this.iterator("table", function(e, t) {
                u(l, "deselect", ["column", l[t]], !0)
            }), this
        }),
        l("cells().deselect()", "cell().deselect()", function() {
            var l = this;
            return this.iterator("cell", function(e, t, l) {
                t = e.aoData[t];
                t._selected_cells !== h && (t._selected_cells[l] = !1),
                t.anCells && !e.aoColumns[l]._select_selected && m(t.anCells[l]).removeClass(e._select.className)
            }), this.iterator("table", function(e, t) {
                u(l, "deselect", ["cell", l[t]], !0)
            }), this
        });
    var v = 0;
    return m.extend(_.ext.buttons, {
        selected: {
            text: o("selected", "Selected"),
            className: "buttons-selected",
            limitTo: ["rows", "columns", "cells"],
            init: function(l, e, s) {
                var c = this;
                s._eventNamespace = ".select" + v++,
                    l.on(a(s), function() {
                        var e,
                            t;
                        c.enable((e = l, t = s, !(-1 === m.inArray("rows", t.limitTo) || !e.rows({
                            selected: !0
                        }).any()) || !(-1 === m.inArray("columns", t.limitTo) || !e.columns({
                            selected: !0
                        }).any()) || !(-1 === m.inArray("cells", t.limitTo) || !e.cells({
                            selected: !0
                        }).any())))
                    }),
                    this.disable()
            },
            destroy: function(e, t, l) {
                e.off(l._eventNamespace)
            }
        },
        selectedSingle: {
            text: o("selectedSingle", "Selected single"),
            className: "buttons-selected-single",
            init: function(t, e, l) {
                var s = this;
                l._eventNamespace = ".select" + v++,
                    t.on(a(l), function() {
                        var e = t.rows({
                            selected: !0
                        }).flatten().length + t.columns({
                            selected: !0
                        }).flatten().length + t.cells({
                            selected: !0
                        }).flatten().length;
                        s.enable(1 === e)
                    }),
                    this.disable()
            },
            destroy: function(e, t, l) {
                e.off(l._eventNamespace)
            }
        },
        selectAll: {
            text: o("selectAll", "Select all"),
            className: "buttons-select-all",
            action: function(e, t, l, s) {
                var c = this.select.items(),
                    n = s.selectorModifier;
                (n ? ("function" == typeof n && (n = n.call(t, e, t, l, s)), this[c + "s"](n)) : this[c + "s"]()).select()
            }
        },
        selectNone: {
            text: o("selectNone", "Deselect all"),
            className: "buttons-select-none",
            action: function() {
                f(this.settings()[0], !0)
            },
            init: function(t, e, l) {
                var s = this;
                l._eventNamespace = ".select" + v++,
                    t.on(a(l), function() {
                        var e = t.rows({
                            selected: !0
                        }).flatten().length + t.columns({
                            selected: !0
                        }).flatten().length + t.cells({
                            selected: !0
                        }).flatten().length;
                        s.enable(0 < e)
                    }),
                    this.disable()
            },
            destroy: function(e, t, l) {
                e.off(l._eventNamespace)
            }
        },
        showSelected: {
            text: o("showSelected", "Show only selected"),
            className: "buttons-show-selected",
            action: function(e, s, t, l) {
                var c;
                l._filter ? (-1 !== (c = _.ext.search.indexOf(l._filter)) && (_.ext.search.splice(c, 1), l._filter = null), this.active(!1)) : (l._filter = c = function(e, t, l) {
                    return e !== s.settings()[0] || e.aoData[l]._select_selected
                }, _.ext.search.push(c), this.active(!0)),
                    s.draw()
            }
        }
    }), m.each(["Row", "Column", "Cell"], function(e, t) {
        var c = t.toLowerCase();
        _.ext.buttons["select" + t + "s"] = {
            text: o("select" + t + "s", "Select " + c + "s"),
            className: "buttons-select-" + c + "s",
            action: function() {
                this.select.items(c)
            },
            init: function(e) {
                var s = this;
                e.on("selectItems.dt.DT", function(e, t, l) {
                    s.active(l === c)
                })
            }
        }
    }), m.fn.DataTable.select = _.select, m(e).on("preInit.dt.dtSelect", function(e, t) {
        "dt" === e.namespace && _.select.init(new _.Api(t))
    }), _
});

/*! Bootstrap 5 styling wrapper for Select
 * © SpryMedia Ltd - datatables.net/license
 */
!function(n) {
    var d,
        o;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs5", "datatables.net-select"], function(e) {
        return n(e, window, document)
    }) : "object" == typeof exports ? (d = require("jquery"), o = function(e, t) {
        t.fn.dataTable || require("datatables.net-bs5")(e, t),
        t.fn.dataTable.select || require("datatables.net-select")(e, t)
    }, "undefined" == typeof window ? module.exports = function(e, t) {
        return e = e || window, t = t || d(e), o(e, t), n(t, 0, e.document)
    } : (o(window, d), module.exports = n(d, window, window.document))) : n(jQuery, window, document)
}(function(e, t, n, d) {
    "use strict";
    return e.fn.dataTable
});

/*! StateRestore 1.3.0
 * © SpryMedia Ltd - datatables.net/license
 */
!function(s) {
    var o,
        a;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(e) {
        return s(e, window, document)
    }) : "object" == typeof exports ? (o = require("jquery"), a = function(e, t) {
        t.fn.dataTable || require("datatables.net")(e, t)
    }, "undefined" == typeof window ? module.exports = function(e, t) {
        return e = e || window, t = t || o(e), a(e, t), s(t, 0, e.document)
    } : (a(window, o), module.exports = s(o, window, window.document))) : s(jQuery, window, document)
}(function(R, e, g, k) {
    "use strict";
    var u,
        m,
        f,
        i,
        p,
        s,
        t,
        c = R.fn.dataTable;
    function n(e, t, s, o, a, i) {
        if (void 0 === o && (o = k), void 0 === a && (a = !1), void 0 === i && (i = function() {
            return null
        }), !m || !m.versionCheck || !m.versionCheck("1.10.0"))
            throw new Error("StateRestore requires DataTables 1.10 or newer");
        if (!m.Buttons)
            throw new Error("StateRestore requires Buttons");
        e = new m.Api(e);
        this.classes = u.extend(!0, {}, n.classes),
            this.c = u.extend(!0, {}, n.defaults, t),
            this.s = {
                dt: e,
                identifier: s,
                isPreDefined: a,
                savedState: null,
                tableId: o && o.stateRestore ? o.stateRestore.tableId : k
            },
            this.dom = {
                background: u('<div class="' + this.classes.background + '"/>'),
                closeButton: u('<div class="' + this.classes.closeButton + '">&times;</div>'),
                confirmation: u('<div class="' + this.classes.confirmation + '"/>'),
                confirmationButton: u('<button class="' + this.classes.confirmationButton + " " + this.classes.dtButton + '">'),
                confirmationTitleRow: u('<div class="' + this.classes.confirmationTitleRow + '"></div>'),
                dtContainer: u(this.s.dt.table().container()),
                duplicateError: u('<span class="' + this.classes.modalError + '">' + this.s.dt.i18n("stateRestore.duplicateError", this.c.i18n.duplicateError) + "</span>"),
                emptyError: u('<span class="' + this.classes.modalError + '">' + this.s.dt.i18n("stateRestore.emptyError", this.c.i18n.emptyError) + "</span>"),
                removeContents: u('<div class="' + this.classes.confirmationText + '"><span>' + this.s.dt.i18n("stateRestore.removeConfirm", this.c.i18n.removeConfirm).replace(/%s/g, this.s.identifier) + "</span></div>"),
                removeError: u('<span class="' + this.classes.modalError + '">' + this.s.dt.i18n("stateRestore.removeError", this.c.i18n.removeError) + "</span>"),
                removeTitle: u('<h2 class="' + this.classes.confirmationTitle + '">' + this.s.dt.i18n("stateRestore.removeTitle", this.c.i18n.removeTitle) + "</h2>"),
                renameContents: u('<div class="' + this.classes.confirmationText + " " + this.classes.renameModal + '"><label class="' + this.classes.confirmationMessage + '">' + this.s.dt.i18n("stateRestore.renameLabel", this.c.i18n.renameLabel).replace(/%s/g, this.s.identifier) + "</label></div>"),
                renameInput: u('<input class="' + this.classes.input + '" type="text"></input>'),
                renameTitle: u('<h2 class="' + this.classes.confirmationTitle + '">' + this.s.dt.i18n("stateRestore.renameTitle", this.c.i18n.renameTitle) + "</h2>")
            },
            this.save(o, i)
    }
    function r(e, t) {
        var o = this;
        if (!i || !i.versionCheck || !i.versionCheck("1.10.0"))
            throw new Error("StateRestore requires DataTables 1.10 or newer");
        if (!i.Buttons)
            throw new Error("StateRestore requires Buttons");
        var s,
            a,
            e = new i.Api(e);
        if (this.classes = f.extend(!0, {}, r.classes), e.settings()[0]._stateRestore === k)
            return this.c = f.extend(!0, {}, r.defaults, t), this.s = {
                dt: e,
                hasColReorder: i.ColReorder !== k,
                hasScroller: i.Scroller !== k,
                hasSearchBuilder: i.SearchBuilder !== k,
                hasSearchPanes: i.SearchPanes !== k,
                hasSelect: i.select !== k,
                states: []
            }, this.s.dt.on("xhr", function(e, t, s) {
                s && s.stateRestore && o._addPreDefined(s.stateRestore)
            }), this.dom = {
                background: f('<div class="' + this.classes.background + '"/>'),
                closeButton: f('<div class="' + this.classes.closeButton + '">x</div>'),
                colReorderToggle: f('<div class="' + this.classes.formRow + " " + this.classes.checkRow + '"><input type="checkbox" class="' + this.classes.colReorderToggle + " " + this.classes.checkBox + '" checked><label class="' + this.classes.checkLabel + '">' + this.s.dt.i18n("stateRestore.creationModal.colReorder", this.c.i18n.creationModal.colReorder) + "</label></div>"),
                columnsSearchToggle: f('<div class="' + this.classes.formRow + " " + this.classes.checkRow + '"><input type="checkbox" class="' + this.classes.columnsSearchToggle + " " + this.classes.checkBox + '" checked><label class="' + this.classes.checkLabel + '">' + this.s.dt.i18n("stateRestore.creationModal.columns.search", this.c.i18n.creationModal.columns.search) + "</label></div>"),
                columnsVisibleToggle: f('<div class="' + this.classes.formRow + " " + this.classes.checkRow + ' "><input type="checkbox" class="' + this.classes.columnsVisibleToggle + " " + this.classes.checkBox + '" checked><label class="' + this.classes.checkLabel + '">' + this.s.dt.i18n("stateRestore.creationModal.columns.visible", this.c.i18n.creationModal.columns.visible) + "</label></div>"),
                confirmation: f('<div class="' + this.classes.confirmation + '"/>'),
                confirmationTitleRow: f('<div class="' + this.classes.confirmationTitleRow + '"></div>'),
                createButtonRow: f('<div class="' + this.classes.formRow + " " + this.classes.modalFoot + '"><button class="' + this.classes.creationButton + " " + this.classes.dtButton + '">' + this.s.dt.i18n("stateRestore.creationModal.button", this.c.i18n.creationModal.button) + "</button></div>"),
                creation: f('<div class="' + this.classes.creation + '"/>'),
                creationForm: f('<div class="' + this.classes.creationForm + '"/>'),
                creationTitle: f('<div class="' + this.classes.creationText + '"><h2 class="' + this.classes.creationTitle + '">' + this.s.dt.i18n("stateRestore.creationModal.title", this.c.i18n.creationModal.title) + "</h2></div>"),
                dtContainer: f(this.s.dt.table().container()),
                duplicateError: f('<span class="' + this.classes.modalError + '">' + this.s.dt.i18n("stateRestore.duplicateError", this.c.i18n.duplicateError) + "</span>"),
                emptyError: f('<span class="' + this.classes.modalError + '">' + this.s.dt.i18n("stateRestore.emptyError", this.c.i18n.emptyError) + "</span>"),
                lengthToggle: f('<div class="' + this.classes.formRow + " " + this.classes.checkRow + '"><input type="checkbox" class="' + this.classes.lengthToggle + " " + this.classes.checkBox + '" checked><label class="' + this.classes.checkLabel + '">' + this.s.dt.i18n("stateRestore.creationModal.length", this.c.i18n.creationModal.length) + "</label></div>"),
                nameInputRow: f('<div class="' + this.classes.formRow + '"><label class="' + this.classes.nameLabel + '">' + this.s.dt.i18n("stateRestore.creationModal.name", this.c.i18n.creationModal.name) + '</label><input class="' + this.classes.nameInput + '" type="text"></div>'),
                orderToggle: f('<div class="' + this.classes.formRow + " " + this.classes.checkRow + '"><input type="checkbox" class="' + this.classes.orderToggle + " " + this.classes.checkBox + '" checked><label class="' + this.classes.checkLabel + '">' + this.s.dt.i18n("stateRestore.creationModal.order", this.c.i18n.creationModal.order) + "</label></div>"),
                pagingToggle: f('<div class="' + this.classes.formRow + " " + this.classes.checkRow + '"><input type="checkbox" class="' + this.classes.pagingToggle + " " + this.classes.checkBox + '" checked><label class="' + this.classes.checkLabel + '">' + this.s.dt.i18n("stateRestore.creationModal.paging", this.c.i18n.creationModal.paging) + "</label></div>"),
                removeContents: f('<div class="' + this.classes.confirmationText + '"><span></span></div>'),
                removeTitle: f('<div class="' + this.classes.creationText + '"><h2 class="' + this.classes.creationTitle + '">' + this.s.dt.i18n("stateRestore.removeTitle", this.c.i18n.removeTitle) + "</h2></div>"),
                scrollerToggle: f('<div class="' + this.classes.formRow + " " + this.classes.checkRow + '"><input type="checkbox" class="' + this.classes.scrollerToggle + " " + this.classes.checkBox + '" checked><label class="' + this.classes.checkLabel + '">' + this.s.dt.i18n("stateRestore.creationModal.scroller", this.c.i18n.creationModal.scroller) + "</label></div>"),
                searchBuilderToggle: f('<div class="' + this.classes.formRow + " " + this.classes.checkRow + '"><input type="checkbox" class="' + this.classes.searchBuilderToggle + " " + this.classes.checkBox + '" checked><label class="' + this.classes.checkLabel + '">' + this.s.dt.i18n("stateRestore.creationModal.searchBuilder", this.c.i18n.creationModal.searchBuilder) + "</label></div>"),
                searchPanesToggle: f('<div class="' + this.classes.formRow + " " + this.classes.checkRow + '"><input type="checkbox" class="' + this.classes.searchPanesToggle + " " + this.classes.checkBox + '" checked><label class="' + this.classes.checkLabel + '">' + this.s.dt.i18n("stateRestore.creationModal.searchPanes", this.c.i18n.creationModal.searchPanes) + "</label></div>"),
                searchToggle: f('<div class="' + this.classes.formRow + " " + this.classes.checkRow + '"><input type="checkbox" class="' + this.classes.searchToggle + " " + this.classes.checkBox + '" checked><label class="' + this.classes.checkLabel + '">' + this.s.dt.i18n("stateRestore.creationModal.search", this.c.i18n.creationModal.search) + "</label></div>"),
                selectToggle: f('<div class="' + this.classes.formRow + " " + this.classes.checkRow + '"><input type="checkbox" class="' + this.classes.selectToggle + " " + this.classes.checkBox + '" checked><label class="' + this.classes.checkLabel + '">' + this.s.dt.i18n("stateRestore.creationModal.select", this.c.i18n.creationModal.select) + "</label></div>"),
                toggleLabel: f('<label class="' + this.classes.nameLabel + " " + this.classes.toggleLabel + '">' + this.s.dt.i18n("stateRestore.creationModal.toggleLabel", this.c.i18n.creationModal.toggleLabel) + "</label>")
            }, (e.settings()[0]._stateRestore = this)._searchForStates(), this._addPreDefined(this.c.preDefined), a = {
                action: "load"
            }, "function" == typeof this.c.ajax ? s = function() {
                "function" == typeof o.c.ajax && o.c.ajax.call(o.s.dt, a, function(e) {
                    return o._addPreDefined(e)
                })
            } : "string" == typeof this.c.ajax && (s = function() {
                f.ajax({
                    data: a,
                    success: function(e) {
                        o._addPreDefined(e)
                    },
                    type: "POST",
                    url: o.c.ajax
                })
            }), "function" == typeof s && (this.s.dt.settings()[0]._bInitComplete ? s() : this.s.dt.one("preInit.dtsr", function() {
                s()
            })), this.s.dt.on("destroy.dtsr", function() {
                o.destroy()
            }), this.s.dt.on("draw.dtsr buttons-action.dtsr", function() {
                return o.findActive()
            }), this
    }
    function o(e, t) {
        l(e, new c.StateRestoreCollection(e, t.config))
    }
    function l(e, t) {
        var s = e.stateRestore.states(),
            o = e.button("SaveStateRestore:name"),
            a = [];
        if (o[0])
            for (var i = o.index().split("-"), a = o[0].inst.c.buttons, n = 0; n < i.length; n++) {
                if (!a[i[n]].buttons) {
                    a = [];
                    break
                }
                a = a[i[n]].buttons
            }
        for (var r = e.settings()[0]._stateRestore.c, n = 0; n < a.length; n++)
            "stateRestore" === a[n].extend && (a.splice(n, 1), n--);
        if (r._createInSaved && a.push("createState"), s === k || 0 === s.length)
            a.push('<span class="' + t.classes.emptyStates + '">' + e.i18n("stateRestore.emptyStates", t.c.i18n.emptyStates) + "</span>");
        else
            for (var c = 0, l = s; c < l.length; c++) {
                var d = l[c],
                    h = Object.assign([], r.splitSecondaries);
                h.includes("updateState") && !r.save && h.splice(h.indexOf("updateState"), 1),
                !h.includes("renameState") || r.save && r.rename || h.splice(h.indexOf("renameState"), 1),
                h.includes("removeState") && !r.remove && h.splice(h.indexOf("removeState"), 1),
                0 < h.length && !h.includes("<h3>" + d.s.identifier + "</h3>") && h.unshift("<h3>" + d.s.identifier + "</h3>"),
                    a.push({
                        _stateRestore: d,
                        attr: {
                            title: d.s.identifier
                        },
                        config: {
                            split: h
                        },
                        extend: "stateRestore",
                        text: d.s.identifier
                    })
            }
        e.button("SaveStateRestore:name").collectionRebuild(a);
        for (var u = 0, m = e.buttons(); u < m.length; u++) {
            var g = m[u];
            R(g.node).hasClass("dtsr-removeAllStates") && (0 === s.length ? e.button(g.node).disable() : e.button(g.node).enable())
        }
    }
    return n.prototype.remove = function(e) {
        var t,
            s,
            o,
            a,
            i = this;
        return void 0 === e && (e = !1), !!this.c.remove && (o = {
            action: "remove",
            stateRestore: ((t = {})[this.s.identifier] = this.s.savedState, t)
        }, a = function() {
            i.dom.confirmation.trigger("dtsr-remove"),
                u(i.s.dt.table().node()).trigger("stateRestore-change"),
                i.dom.background.click(),
                i.dom.confirmation.remove(),
                u(g).unbind("keyup", function(e) {
                    return i._keyupFunction(e)
                }),
                i.dom.confirmationButton.off("click")
        }, this.c.ajax ? "string" == typeof this.c.ajax && this.s.dt.settings()[0]._bInitComplete ? s = function() {
            return u.ajax({
                data: o,
                success: a,
                type: "POST",
                url: i.c.ajax
            }), !0
        } : "function" == typeof this.c.ajax && (s = function() {
            return "function" == typeof i.c.ajax && i.c.ajax.call(i.s.dt, o, a), !0
        }) : s = function() {
            try {
                localStorage.removeItem("DataTables_stateRestore_" + i.s.identifier + "_" + location.pathname + (i.s.tableId ? "_" + i.s.tableId : "")),
                    a()
            } catch (e) {
                return i.dom.confirmation.children("." + i.classes.modalError).remove(), i.dom.confirmation.append(i.dom.removeError), "remove"
            }
            return !0
        }, e ? (this.dom.confirmation.appendTo(this.dom.dtContainer), u(this.s.dt.table().node()).trigger("dtsr-modal-inserted"), s(), this.dom.confirmation.remove()) : this._newModal(this.dom.removeTitle, this.s.dt.i18n("stateRestore.removeSubmit", this.c.i18n.removeSubmit), s, this.dom.removeContents), !0)
    }, n.prototype.compare = function(e) {
        if (this.c.saveState.order || (e.order = k), this.c.saveState.search || (e.search = k), this.c.saveState.columns && e.columns)
            for (var t = 0, s = e.columns.length; t < s; t++)
                "boolean" == typeof this.c.saveState.columns || this.c.saveState.columns.visible || (e.columns[t].visible = k),
                "boolean" == typeof this.c.saveState.columns || this.c.saveState.columns.search || (e.columns[t].search = k);
        else
            this.c.saveState.columns || (e.columns = k);
        this.c.saveState.paging || (e.page = k),
        this.c.saveState.searchBuilder || (e.searchBuilder = k),
        this.c.saveState.searchPanes || (e.searchPanes = k),
        this.c.saveState.select || (e.select = k),
        this.c.saveState.colReorder || (e.ColReorder = k),
        this.c.saveState.scroller || (e.scroller = k, m.Scroller !== k && (e.start = 0)),
        this.c.saveState.paging || (e.start = 0),
        this.c.saveState.length || (e.length = k),
            delete e.time;
        var o = this.s.savedState;
        return delete o.time, delete o.c, delete o.stateRestore, this._deepCompare(e, o)
    }, n.prototype.destroy = function() {
        Object.values(this.dom).forEach(function(e) {
            return e.off().remove()
        })
    }, n.prototype.load = function() {
        var o = this,
            a = this.s.savedState,
            e = this.s.dt.settings()[0];
        return a.time = +new Date, e.oLoadedState = u.extend(!0, {}, a), u("div.dt-button-background").click(), u.fn.dataTable.ext.oApi._fnImplementState(e, a, function() {
            o.s.dt.one("preDraw", function(e, s) {
                setTimeout(function() {
                    var e = s._iDisplayStart / s._iDisplayLength,
                        t = a.start / a.length;
                    0 <= e && 0 <= t && e != t && o.s.dt.page(t).draw(!1)
                }, 50)
            }),
                o.s.dt.draw(!1)
        }), a
    }, n.prototype.rename = function(s, o) {
        var a = this;
        if (void 0 === s && (s = null), this.c.rename) {
            var e = function() {
                if (null === s) {
                    var e = u("input." + a.classes.input.replace(/ /g, ".")).val();
                    if (0 === e.length)
                        return a.dom.confirmation.children("." + a.classes.modalError).remove(), a.dom.confirmation.append(a.dom.emptyError), "empty";
                    if (o.includes(e))
                        return a.dom.confirmation.children("." + a.classes.modalError).remove(), a.dom.confirmation.append(a.dom.duplicateError), "duplicate";
                    s = e
                }
                function t() {
                    a.s.identifier = s,
                        a.save(a.s.savedState, function() {
                            return null
                        }, !1),
                        a.dom.removeContents = u('<div class="' + a.classes.confirmationText + '"><span>' + a.s.dt.i18n("stateRestore.removeConfirm", a.c.i18n.removeConfirm).replace(/%s/g, a.s.identifier) + "</span></div>"),
                        a.dom.confirmation.trigger("dtsr-rename"),
                        a.dom.background.click(),
                        a.dom.confirmation.remove(),
                        u(g).unbind("keyup", function(e) {
                            return a._keyupFunction(e)
                        }),
                        a.dom.confirmationButton.off("click")
                }
                e = {
                    action: "rename",
                    stateRestore: ((e = {})[a.s.identifier] = s, e)
                };
                if (a.c.ajax)
                    "string" == typeof a.c.ajax && a.s.dt.settings()[0]._bInitComplete ? u.ajax({
                        data: e,
                        success: t,
                        type: "POST",
                        url: a.c.ajax
                    }) : "function" == typeof a.c.ajax && a.c.ajax.call(a.s.dt, e, t);
                else
                    try {
                        localStorage.removeItem("DataTables_stateRestore_" + a.s.identifier + "_" + location.pathname + (a.s.tableId ? "_" + a.s.tableId : "")),
                            t()
                    } catch (e) {
                        return a.dom.confirmation.children("." + a.classes.modalError).remove(), a.dom.confirmation.append(a.dom.removeError), !1
                    }
                return !0
            };
            if (null !== s) {
                if (o.includes(s))
                    throw new Error(this.s.dt.i18n("stateRestore.duplicateError", this.c.i18n.duplicateError));
                if (0 === s.length)
                    throw new Error(this.s.dt.i18n("stateRestore.emptyError", this.c.i18n.emptyError));
                this.dom.confirmation.appendTo(this.dom.dtContainer),
                    u(this.s.dt.table().node()).trigger("dtsr-modal-inserted"),
                    e(),
                    this.dom.confirmation.remove()
            } else
                this.dom.renameInput.val(this.s.identifier),
                    this.dom.renameContents.append(this.dom.renameInput),
                    this._newModal(this.dom.renameTitle, this.s.dt.i18n("stateRestore.renameButton", this.c.i18n.renameButton), e, this.dom.renameContents)
        }
    }, n.prototype.save = function(e, t, s) {
        var o,
            a,
            i,
            n = this;
        if (void 0 === s && (s = !0), this.c.save) {
            if (this.s.dt.state.save(), e === k)
                o = this.s.dt.state();
            else {
                if ("object" != typeof e)
                    return;
                o = e
            }
            if (o.stateRestore ? (o.stateRestore.isPreDefined = this.s.isPreDefined, o.stateRestore.state = this.s.identifier, o.stateRestore.tableId = this.s.tableId) : o.stateRestore = {
                isPreDefined: this.s.isPreDefined,
                state: this.s.identifier,
                tableId: this.s.tableId
            }, this.s.savedState = o, this.c.saveState.order || (this.s.savedState.order = k), this.c.saveState.search || (this.s.savedState.search = k), this.c.saveState.columns && this.s.savedState.columns)
                for (var r = 0, c = this.s.savedState.columns.length; r < c; r++)
                    "boolean" == typeof this.c.saveState.columns || this.c.saveState.columns.visible || (this.s.savedState.columns[r].visible = k),
                    "boolean" == typeof this.c.saveState.columns || this.c.saveState.columns.search || (this.s.savedState.columns[r].search = k);
            else
                this.c.saveState.columns || (this.s.savedState.columns = k);
            if (this.c.saveState.searchBuilder || (this.s.savedState.searchBuilder = k), this.c.saveState.searchPanes || (this.s.savedState.searchPanes = k), this.c.saveState.select || (this.s.savedState.select = k), this.c.saveState.colReorder || (this.s.savedState.ColReorder = k), this.c.saveState.scroller || (this.s.savedState.scroller = k, m.Scroller !== k && (this.s.savedState.start = 0)), this.c.saveState.paging || (this.s.savedState.start = 0), this.c.saveState.length || (this.s.savedState.length = k), this.s.savedState.c = this.c, this.s.savedState.c.splitSecondaries.length)
                for (var l = 0, d = this.s.savedState.c.splitSecondaries; l < d.length; l++) {
                    var h = d[l];
                    h.parent && (h.parent = k)
                }
            this.s.isPreDefined ? t && t.call(this) : (a = {
                action: "save",
                stateRestore: ((e = {})[this.s.identifier] = this.s.savedState, e)
            }, i = function() {
                t && t.call(n),
                    n.dom.confirmation.trigger("dtsr-save"),
                    u(n.s.dt.table().node()).trigger("stateRestore-change")
            }, this.c.ajax ? "string" == typeof this.c.ajax && s ? this.s.dt.settings()[0]._bInitComplete ? u.ajax({
                data: a,
                success: i,
                type: "POST",
                url: this.c.ajax
            }) : this.s.dt.one("init", function() {
                u.ajax({
                    data: a,
                    success: i,
                    type: "POST",
                    url: n.c.ajax
                })
            }) : "function" == typeof this.c.ajax && s && this.c.ajax.call(this.s.dt, a, i) : (localStorage.setItem("DataTables_stateRestore_" + this.s.identifier + "_" + location.pathname + (this.s.tableId ? "_" + this.s.tableId : ""), JSON.stringify(this.s.savedState)), i()))
        } else
            t && t.call(this)
    }, n.prototype._deepCompare = function(e, t) {
        var s,
            o = [e, t],
            a = [Object.keys(e).sort(), Object.keys(t).sort()];
        a[0].includes("scroller") && (s = a[0].indexOf("start")) && a[0].splice(s, 1),
        a[1].includes("scroller") && (s = a[1].indexOf("start")) && a[1].splice(s, 1);
        for (var i = 0; i < a[0].length; i++)
            0 !== a[0][i].indexOf("_") && "baseRowTop" !== a[0][i] && "baseScrollTop" !== a[0][i] && "scrollTop" !== a[0][i] && (this.c.saveState.paging || "page" !== a[0][i]) || (a[0].splice(i, 1), i--);
        for (i = 0; i < a[1].length; i++)
            0 !== a[1][i].indexOf("_") && "baseRowTop" !== a[1][i] && "baseScrollTop" !== a[1][i] && "scrollTop" !== a[1][i] && (this.c.saveState.paging || "page" !== a[0][i]) || (a[1].splice(i, 1), i--);
        if (0 === a[0].length && 0 < a[1].length || 0 === a[1].length && 0 < a[0].length)
            return !1;
        for (i = 0; i < a[0].length; i++)
            a[1].includes(a[0][i]) || (a[0].splice(i, 1), i--);
        for (i = 0; i < a[1].length; i++)
            a[0].includes(a[1][i]) || (a[1].splice(i, 1), i--);
        for (i = 0; i < a[0].length; i++) {
            if (a[0][i] !== a[1][i] || typeof o[0][a[0][i]] != typeof o[1][a[1][i]])
                return !1;
            if ("object" == typeof o[0][a[0][i]]) {
                if (!this._deepCompare(o[0][a[0][i]], o[1][a[1][i]]))
                    return !1
            } else if ("number" == typeof o[0][a[0][i]] && "number" == typeof o[1][a[1][i]]) {
                if (Math.round(o[0][a[0][i]]) !== Math.round(o[1][a[1][i]]))
                    return !1
            } else if (o[0][a[0][i]] !== o[1][a[1][i]])
                return !1
        }
        return !0
    }, n.prototype._keyupFunction = function(e) {
        "Enter" === e.key ? this.dom.confirmationButton.click() : "Escape" === e.key && u("div." + this.classes.background.replace(/ /g, ".")).click()
    }, n.prototype._newModal = function(e, t, s, o) {
        var a = this,
            e = (this.dom.background.appendTo(this.dom.dtContainer), this.dom.confirmationTitleRow.empty().append(e), this.dom.confirmationButton.html(t), this.dom.confirmation.empty().append(this.dom.confirmationTitleRow).append(o).append(u('<div class="' + this.classes.confirmationButtons + '"></div>').append(this.dom.confirmationButton)).appendTo(this.dom.dtContainer), u(this.s.dt.table().node()).trigger("dtsr-modal-inserted"), o.children("input")),
            i = ((0 < e.length ? u(e[0]) : this.dom.confirmationButton).focus(), u("div." + this.classes.background.replace(/ /g, ".")));
        this.c.modalCloseButton && (this.dom.confirmation.append(this.dom.closeButton), this.dom.closeButton.on("click", function() {
            return i.click()
        })),
            this.dom.confirmationButton.on("click", function() {
                return s()
            }),
            this.dom.confirmation.on("click", function(e) {
                e.stopPropagation()
            }),
            i.one("click", function() {
                a.dom.background.remove(),
                    a.dom.confirmation.remove(),
                    u(g).unbind("keyup", function(e) {
                        return a._keyupFunction(e)
                    })
            }),
            u(g).on("keyup", function(e) {
                return a._keyupFunction(e)
            })
    }, n.prototype._searchToHung = function(e) {
        return {
            bCaseInsensitive: e.caseInsensitive,
            bRegex: e.regex,
            bSmart: e.smart,
            sSearch: e.search
        }
    }, n.version = "1.3.0", n.classes = {
        background: "dtsr-background",
        closeButton: "dtsr-popover-close",
        confirmation: "dtsr-confirmation",
        confirmationButton: "dtsr-confirmation-button",
        confirmationButtons: "dtsr-confirmation-buttons",
        confirmationMessage: "dtsr-confirmation-message dtsr-name-label",
        confirmationText: "dtsr-confirmation-text",
        confirmationTitle: "dtsr-confirmation-title",
        confirmationTitleRow: "dtsr-confirmation-title-row",
        dtButton: "dt-button",
        input: "dtsr-input",
        modalError: "dtsr-modal-error",
        renameModal: "dtsr-rename-modal"
    }, n.defaults = {
        _createInSaved: !1,
        ajax: !1,
        create: !0,
        creationModal: !1,
        i18n: {
            creationModal: {
                button: "Create",
                colReorder: "Column Order:",
                columns: {
                    search: "Column Search:",
                    visible: "Column Visibility:"
                },
                length: "Page Length:",
                name: "Name:",
                order: "Sorting:",
                paging: "Paging:",
                scroller: "Scroll Position:",
                search: "Search:",
                searchBuilder: "SearchBuilder:",
                searchPanes: "SearchPanes:",
                select: "Select:",
                title: "Create New State",
                toggleLabel: "Includes:"
            },
            duplicateError: "A state with this name already exists.",
            emptyError: "Name cannot be empty.",
            emptyStates: "No saved states",
            removeConfirm: "Are you sure you want to remove %s?",
            removeError: "Failed to remove state.",
            removeJoiner: " and ",
            removeSubmit: "Remove",
            removeTitle: "Remove State",
            renameButton: "Rename",
            renameLabel: "New Name for %s:",
            renameTitle: "Rename State"
        },
        modalCloseButton: !0,
        remove: !0,
        rename: !0,
        save: !0,
        saveState: {
            colReorder: !0,
            columns: {
                search: !0,
                visible: !0
            },
            length: !0,
            order: !0,
            paging: !0,
            scroller: !0,
            search: !0,
            searchBuilder: !0,
            searchPanes: !0,
            select: !0
        },
        splitSecondaries: ["updateState", "renameState", "removeState"],
        toggle: {
            colReorder: !1,
            columns: {
                search: !1,
                visible: !1
            },
            length: !1,
            order: !1,
            paging: !1,
            scroller: !1,
            search: !1,
            searchBuilder: !1,
            searchPanes: !1,
            select: !1
        }
    }, p = n, r.prototype.addState = function(e, l, d) {
        var h = this;
        if (this.c.create && this.c.save) {
            var t = function(e, t) {
                if (0 === e.length)
                    return "empty";
                if (l.includes(e))
                    return "duplicate";
                h.s.dt.state.save();
                var s = h,
                    o = h.s.dt.state();
                if (o.stateRestore = {
                    isPredefined: !1,
                    state: e,
                    tableId: h.s.dt.table().node().id
                }, t.saveState) {
                    for (var a = h.c.saveState, i = 0, n = Object.keys(t.saveState); i < n.length; i++) {
                        var r = n[i];
                        t.saveState[r] || (a[r] = !1)
                    }
                    h.c.saveState = a
                }
                var c = new p(h.s.dt.settings()[0], f.extend(!0, {}, h.c, d), e, o, !1, function() {
                    s.s.states.push(this),
                        s._collectionRebuild()
                });
                return f(h.s.dt.table().node()).on("dtsr-modal-inserted", function() {
                    c.dom.confirmation.one("dtsr-remove", function() {
                        return h._removeCallback(c.s.identifier)
                    }),
                        c.dom.confirmation.one("dtsr-rename", function() {
                            return h._collectionRebuild()
                        }),
                        c.dom.confirmation.one("dtsr-save", function() {
                            return h._collectionRebuild()
                        })
                }), !0
            };
            if (null !== this.getState(e))
                throw new Error(this.s.dt.i18n("stateRestore.duplicateError", this.c.i18n.duplicateError));
            if (this.c.creationModal || d !== k && d.creationModal)
                this._creationModal(t, e, d);
            else {
                t = t(e, {});
                if ("empty" === t)
                    throw new Error(this.s.dt.i18n("stateRestore.emptyError", this.c.i18n.emptyError));
                if ("duplicate" === t)
                    throw new Error(this.s.dt.i18n("stateRestore.duplicateError", this.c.i18n.duplicateError))
            }
        }
    }, r.prototype.removeAll = function(e) {
        var t,
            s;
        0 !== this.s.states.length && (s = (t = this.s.states.map(function(e) {
            return e.s.identifier
        }))[0], 1 < t.length && (s = t.slice(0, -1).join(", ") + this.s.dt.i18n("stateRestore.removeJoiner", this.c.i18n.removeJoiner) + t.slice(-1)), f(this.dom.removeContents.children("span")).html(this.s.dt.i18n("stateRestore.removeConfirm", this.c.i18n.removeConfirm).replace(/%s/g, s)), this._newModal(this.dom.removeTitle, this.s.dt.i18n("stateRestore.removeSubmit", this.c.i18n.removeSubmit), e, this.dom.removeContents))
    }, r.prototype.destroy = function() {
        for (var e = 0, t = this.s.states; e < t.length; e++)
            t[e].destroy();
        Object.values(this.dom).forEach(function(e) {
            e.off(),
                e.remove()
        }),
            this.s.states = [],
            this.s.dt.off(".dtsr"),
            f(this.s.dt.table().node()).off(".dtsr")
    }, r.prototype.findActive = function() {
        this.s.dt.state.save();
        for (var e = this.s.dt.state(), t = f("button." + f.fn.DataTable.Buttons.defaults.dom.button.className.replace(/ /g, ".")), s = 0, o = t = 0 === t.length ? f("a." + f.fn.DataTable.Buttons.defaults.dom.button.className.replace(/ /g, ".")) : t; s < o.length; s++) {
            var a = o[s];
            this.s.dt.button(f(a).parent()[0]).active(!1)
        }
        for (var i = [], n = 0, r = this.s.states; n < r.length; n++) {
            var c = r[n];
            if (c.compare(e)) {
                i.push({
                    data: c.s.savedState,
                    name: c.s.identifier
                });
                for (var l = 0, d = t; l < d.length; l++) {
                    a = d[l];
                    if (f(a).text() === c.s.identifier) {
                        this.s.dt.button(f(a).parent()[0]).active(!0);
                        break
                    }
                }
            }
        }
        return i
    }, r.prototype.getState = function(e) {
        for (var t = 0, s = this.s.states; t < s.length; t++) {
            var o = s[t];
            if (o.s.identifier === e)
                return o
        }
        return null
    }, r.prototype.getStates = function(e) {
        if (e === k)
            return this.s.states;
        for (var t = [], s = 0, o = e; s < o.length; s++) {
            for (var a = o[s], i = !1, n = 0, r = this.s.states; n < r.length; n++) {
                var c = r[n];
                if (a === c.s.identifier) {
                    t.push(c),
                        i = !0;
                    break
                }
            }
            i || t.push(k)
        }
        return t
    }, r.prototype._addPreDefined = function(i) {
        for (var n = this, e = Object.keys(i).sort(function(e, t) {
            return t < e ? 1 : e < t ? -1 : 0
        }), r = this, t = 0, s = e; t < s.length; t++)
            !function(e) {
                for (var t = 0; t < r.s.states.length; t++)
                    r.s.states[t].s.identifier === e && r.s.states.splice(t, 1);
                var s = r,
                    o = i[e],
                    a = new p(r.s.dt, f.extend(!0, {}, r.c, o.c !== k ? {
                        saveState: o.c.saveState
                    } : k, !0), e, o, !0, function() {
                        s.s.states.push(this),
                            s._collectionRebuild()
                    });
                a.s.savedState = o,
                    f(r.s.dt.table().node()).on("dtsr-modal-inserted", function() {
                        a.dom.confirmation.one("dtsr-remove", function() {
                            return n._removeCallback(a.s.identifier)
                        }),
                            a.dom.confirmation.one("dtsr-rename", function() {
                                return n._collectionRebuild()
                            }),
                            a.dom.confirmation.one("dtsr-save", function() {
                                return n._collectionRebuild()
                            })
                    })
            }(s[t])
    }, r.prototype._collectionRebuild = function() {
        var e = this.s.dt.button("SaveStateRestore:name"),
            t = [];
        if (e[0])
            for (var s = e.index().split("-"), t = e[0].inst.c.buttons, o = 0; o < s.length; o++) {
                if (!t[s[o]].buttons) {
                    t = [];
                    break
                }
                t = t[s[o]].buttons
            }
        for (o = 0; o < t.length; o++)
            "stateRestore" === t[o].extend && (t.splice(o, 1), o--);
        this.c._createInSaved && t.push("createState");
        var a = '<span class="' + this.classes.emptyStates + '">' + this.s.dt.i18n("stateRestore.emptyStates", this.c.i18n.emptyStates) + "</span>";
        if (0 === this.s.states.length)
            t.includes(a) || t.push(a);
        else {
            for (; t.includes(a);)
                t.splice(t.indexOf(a), 1);
            this.s.states = this.s.states.sort(function(e, t) {
                e = e.s.identifier,
                    t = t.s.identifier;
                return t < e ? 1 : e < t ? -1 : 0
            });
            for (var i = 0, n = this.s.states; i < n.length; i++) {
                var r = n[i],
                    c = Object.assign([], this.c.splitSecondaries);
                !c.includes("updateState") || this.c.save && r.c.save || c.splice(c.indexOf("updateState"), 1),
                !c.includes("renameState") || this.c.save && r.c.save && this.c.rename && r.c.rename || c.splice(c.indexOf("renameState"), 1),
                !c.includes("removeState") || this.c.remove && r.c.remove || c.splice(c.indexOf("removeState"), 1),
                0 < c.length && !c.includes("<h3>" + r.s.identifier + "</h3>") && c.unshift("<h3>" + r.s.identifier + "</h3>"),
                    t.push({
                        _stateRestore: r,
                        attr: {
                            title: r.s.identifier
                        },
                        config: {
                            split: c
                        },
                        extend: "stateRestore",
                        text: r.s.identifier
                    })
            }
        }
        e.collectionRebuild(t);
        for (var l = 0, d = this.s.dt.buttons(); l < d.length; l++) {
            var h = d[l];
            f(h.node).hasClass("dtsr-removeAllStates") && (0 === this.s.states.length ? this.s.dt.button(h.node).disable() : this.s.dt.button(h.node).enable())
        }
    }, r.prototype._creationModal = function(t, e, s) {
        var o = this,
            e = (this.dom.creation.empty(), this.dom.creationForm.empty(), this.dom.nameInputRow.children("input").val(e), this.dom.creationForm.append(this.dom.nameInputRow), this.s.dt.settings()[0].oInit),
            a = [],
            i = s !== k && s.toggle !== k;
        ((!i || s.toggle.order === k) && this.c.toggle.order || i && s.toggle.order) && this.c.saveState.order && (e.ordering === k || e.ordering) && a.push(this.dom.orderToggle),
        ((!i || s.toggle.search === k) && this.c.toggle.search || i && s.toggle.search) && this.c.saveState.search && (e.searching === k || e.searching) && a.push(this.dom.searchToggle),
        ((!i || s.toggle.paging === k) && this.c.toggle.paging || i && s.toggle.paging) && this.c.saveState.paging && (e.paging === k || e.paging) && a.push(this.dom.pagingToggle),
        ((!i || s.toggle.length === k) && this.c.toggle.length || i && s.toggle.length) && this.c.saveState.length && (e.length === k || e.length) && a.push(this.dom.lengthToggle),
        this.s.hasColReorder && ((!i || s.toggle.colReorder === k) && this.c.toggle.colReorder || i && s.toggle.colReorder) && this.c.saveState.colReorder && a.push(this.dom.colReorderToggle),
        this.s.hasScroller && ((!i || s.toggle.scroller === k) && this.c.toggle.scroller || i && s.toggle.scroller) && this.c.saveState.scroller && a.push(this.dom.scrollerToggle),
        this.s.hasSearchBuilder && ((!i || s.toggle.searchBuilder === k) && this.c.toggle.searchBuilder || i && s.toggle.searchBuilder) && this.c.saveState.searchBuilder && a.push(this.dom.searchBuilderToggle),
        this.s.hasSearchPanes && ((!i || s.toggle.searchPanes === k) && this.c.toggle.searchPanes || i && s.toggle.searchPanes) && this.c.saveState.searchPanes && a.push(this.dom.searchPanesToggle),
        this.s.hasSelect && ((!i || s.toggle.select === k) && this.c.toggle.select || i && s.toggle.select) && this.c.saveState.select && a.push(this.dom.selectToggle),
            "boolean" == typeof this.c.toggle.columns && ((!i || s.toggle.order === k) && this.c.toggle.columns || i && s.toggle.order) && this.c.saveState.columns ? (a.push(this.dom.columnsSearchToggle), a.push(this.dom.columnsVisibleToggle)) : (i && s.toggle.columns !== k || "boolean" == typeof this.c.toggle.columns) && "boolean" == typeof s.toggle.order || ("boolean" != typeof this.c.saveState.columns && this.c.saveState.columns ? ((i && s.toggle.columns !== k && "boolean" != typeof s.toggle.columns && s.toggle.columns.search || (!i || s.toggle.columns === k || "boolean" != typeof s.toggle.columns && s.toggle.columns.search === k) && "boolean" != typeof this.c.toggle.columns && this.c.toggle.columns.search) && this.c.saveState.columns.search && a.push(this.dom.columnsSearchToggle), (i && s.toggle.columns !== k && "boolean" != typeof s.toggle.columns && s.toggle.columns.visible || (!i || s.toggle.columns === k || "boolean" != typeof s.toggle.columns && s.toggle.columns.visible === k) && "boolean" != typeof this.c.toggle.columns && this.c.toggle.columns.visible) && this.c.saveState.columns.visible && a.push(this.dom.columnsVisibleToggle)) : this.c.saveState.columns && (a.push(this.dom.columnsSearchToggle), a.push(this.dom.columnsVisibleToggle))),
            a.sort(function(e, t) {
                e = e.children("label.dtsr-check-label")[0].innerHTML,
                    t = t.children("label.dtsr-check-label")[0].innerHTML;
                return e < t ? -1 : t < e ? 1 : 0
            });
        for (var n = 0, r = a; n < r.length; n++) {
            var c = r[n];
            this.dom.creationForm.append(c)
        }
        f(this.dom.creationForm.children("div." + this.classes.checkRow)[0]).prepend(this.dom.toggleLabel),
            this.dom.background.appendTo(this.dom.dtContainer),
            this.dom.creation.append(this.dom.creationTitle).append(this.dom.creationForm).append(this.dom.createButtonRow).appendTo(this.dom.dtContainer),
            f(this.s.dt.table().node()).trigger("dtsr-modal-inserted");
        for (var l = 0, d = a; l < d.length; l++)
            !function(e) {
                f(e.children("label:last-child")).on("click", function() {
                    e.children("input").prop("checked", !e.children("input").prop("checked"))
                })
            }(c = d[l]);
        function h(e) {
            "Enter" === e.key ? u.click() : "Escape" === e.key && m.click()
        }
        var u = f("button." + this.classes.creationButton.replace(/ /g, ".")),
            e = this.dom.creationForm.find("input"),
            m = ((0 < e.length ? f(e[0]) : u).focus(), f("div." + this.classes.background.replace(/ /g, ".")));
        this.c.modalCloseButton && (this.dom.creation.append(this.dom.closeButton), this.dom.closeButton.on("click", function() {
            return m.click()
        })),
            u.on("click", function() {
                var e = {
                        colReorder: o.dom.colReorderToggle.children("input").is(":checked"),
                        columns: {
                            search: o.dom.columnsSearchToggle.children("input").is(":checked"),
                            visible: o.dom.columnsVisibleToggle.children("input").is(":checked")
                        },
                        length: o.dom.lengthToggle.children("input").is(":checked"),
                        order: o.dom.orderToggle.children("input").is(":checked"),
                        paging: o.dom.pagingToggle.children("input").is(":checked"),
                        scroller: o.dom.scrollerToggle.children("input").is(":checked"),
                        search: o.dom.searchToggle.children("input").is(":checked"),
                        searchBuilder: o.dom.searchBuilderToggle.children("input").is(":checked"),
                        searchPanes: o.dom.searchPanesToggle.children("input").is(":checked"),
                        select: o.dom.selectToggle.children("input").is(":checked")
                    },
                    e = t(f("input." + o.classes.nameInput.replace(/ /g, ".")).val(), {
                        saveState: e
                    });
                !0 === e ? (o.dom.background.remove(), o.dom.creation.remove(), f(g).unbind("keyup", h)) : (o.dom.creation.children("." + o.classes.modalError).remove(), o.dom.creation.append(o.dom[e + "Error"]))
            }),
            m.one("click", function() {
                o.dom.background.remove(),
                    o.dom.creation.remove(),
                    f(g).unbind("keyup", h),
                    o._collectionRebuild()
            }),
            f(g).on("keyup", h),
            this.s.dt.state.save()
    }, r.prototype._removeCallback = function(e) {
        for (var t = 0; t < this.s.states.length; t++)
            this.s.states[t].s.identifier === e && (this.s.states.splice(t, 1), t--);
        return this._collectionRebuild(), !0
    }, r.prototype._newModal = function(e, t, s, o) {
        function a(e) {
            "Enter" === e.key ? n.click() : "Escape" === e.key && r.click()
        }
        var i = this,
            n = (this.dom.background.appendTo(this.dom.dtContainer), this.dom.confirmationTitleRow.empty().append(e), f('<button class="' + this.classes.confirmationButton + " " + this.classes.dtButton + '">' + t + "</button>")),
            e = (this.dom.confirmation.empty().append(this.dom.confirmationTitleRow).append(o).append(f('<div class="' + this.classes.confirmationButtons + '"></div>').append(n)).appendTo(this.dom.dtContainer), f(this.s.dt.table().node()).trigger("dtsr-modal-inserted"), o.children("input")),
            r = ((0 < e.length ? f(e[0]) : n).focus(), f("div." + this.classes.background.replace(/ /g, ".")));
        n.on("click", function() {
            var e = s(!0);
            !0 === e ? (i.dom.background.remove(), i.dom.confirmation.remove(), f(g).unbind("keyup", a), n.off("click")) : (i.dom.confirmation.children("." + i.classes.modalError).remove(), i.dom.confirmation.append(i.dom[e + "Error"]))
        }),
            this.dom.confirmation.on("click", function(e) {
                e.stopPropagation()
            }),
            r.one("click", function() {
                i.dom.background.remove(),
                    i.dom.confirmation.remove(),
                    f(g).unbind("keyup", a)
            }),
            f(g).on("keyup", a)
    }, r.prototype._searchForStates = function() {
        for (var a = this, e = Object.keys(localStorage), i = this, t = 0, s = e; t < s.length; t++)
            !function(e) {
                if (e.match(new RegExp("^DataTables_stateRestore_.*_" + location.pathname.replace(/\//g, "/") + "$")) || e.match(new RegExp("^DataTables_stateRestore_.*_" + location.pathname.replace(/\//g, "/") + "_" + i.s.dt.table().node().id + "$"))) {
                    var t = JSON.parse(localStorage.getItem(e));
                    if (t.stateRestore.isPreDefined || t.stateRestore.tableId && t.stateRestore.tableId !== i.s.dt.table().node().id)
                        return;
                    var s = i,
                        o = new p(i.s.dt, f.extend(!0, {}, i.c, {
                            saveState: t.c.saveState
                        }), t.stateRestore.state, t, !1, function() {
                            this.s.savedState = t,
                                s.s.states.push(this),
                                s._collectionRebuild()
                        });
                    f(i.s.dt.table().node()).on("dtsr-modal-inserted", function() {
                        o.dom.confirmation.one("dtsr-remove", function() {
                            return a._removeCallback(o.s.identifier)
                        }),
                            o.dom.confirmation.one("dtsr-rename", function() {
                                return a._collectionRebuild()
                            }),
                            o.dom.confirmation.one("dtsr-save", function() {
                                return a._collectionRebuild()
                            })
                    })
                }
            }(s[t])
    }, r.version = "1.0.0", r.classes = {
        background: "dtsr-background",
        checkBox: "dtsr-check-box",
        checkLabel: "dtsr-check-label",
        checkRow: "dtsr-check-row",
        closeButton: "dtsr-popover-close",
        colReorderToggle: "dtsr-colReorder-toggle",
        columnsSearchToggle: "dtsr-columns-search-toggle",
        columnsVisibleToggle: "dtsr-columns-visible-toggle",
        confirmation: "dtsr-confirmation",
        confirmationButton: "dtsr-confirmation-button",
        confirmationButtons: "dtsr-confirmation-buttons",
        confirmationMessage: "dtsr-confirmation-message dtsr-name-label",
        confirmationText: "dtsr-confirmation-text",
        confirmationTitle: "dtsr-confirmation-title",
        confirmationTitleRow: "dtsr-confirmation-title-row",
        creation: "dtsr-creation",
        creationButton: "dtsr-creation-button",
        creationForm: "dtsr-creation-form",
        creationText: "dtsr-creation-text",
        creationTitle: "dtsr-creation-title",
        dtButton: "dt-button",
        emptyStates: "dtsr-emptyStates",
        formRow: "dtsr-form-row",
        leftSide: "dtsr-left",
        lengthToggle: "dtsr-length-toggle",
        modalError: "dtsr-modal-error",
        modalFoot: "dtsr-modal-foot",
        nameInput: "dtsr-name-input",
        nameLabel: "dtsr-name-label",
        orderToggle: "dtsr-order-toggle",
        pagingToggle: "dtsr-paging-toggle",
        rightSide: "dtsr-right",
        scrollerToggle: "dtsr-scroller-toggle",
        searchBuilderToggle: "dtsr-searchBuilder-toggle",
        searchPanesToggle: "dtsr-searchPanes-toggle",
        searchToggle: "dtsr-search-toggle",
        selectToggle: "dtsr-select-toggle",
        toggleLabel: "dtsr-toggle-title"
    }, r.defaults = {
        _createInSaved: !1,
        ajax: !1,
        create: !0,
        creationModal: !1,
        i18n: {
            creationModal: {
                button: "Create",
                colReorder: "Column Order",
                columns: {
                    search: "Column Search",
                    visible: "Column Visibility"
                },
                length: "Page Length",
                name: "Name:",
                order: "Sorting",
                paging: "Paging",
                scroller: "Scroll Position",
                search: "Search",
                searchBuilder: "SearchBuilder",
                searchPanes: "SearchPanes",
                select: "Select",
                title: "Create New State",
                toggleLabel: "Includes:"
            },
            duplicateError: "A state with this name already exists.",
            emptyError: "Name cannot be empty.",
            emptyStates: "No saved states",
            removeConfirm: "Are you sure you want to remove %s?",
            removeError: "Failed to remove state.",
            removeJoiner: " and ",
            removeSubmit: "Remove",
            removeTitle: "Remove State",
            renameButton: "Rename",
            renameLabel: "New Name for %s:",
            renameTitle: "Rename State"
        },
        modalCloseButton: !0,
        preDefined: {},
        remove: !0,
        rename: !0,
        save: !0,
        saveState: {
            colReorder: !0,
            columns: {
                search: !0,
                visible: !0
            },
            length: !0,
            order: !0,
            paging: !0,
            scroller: !0,
            search: !0,
            searchBuilder: !0,
            searchPanes: !0,
            select: !0
        },
        splitSecondaries: ["updateState", "renameState", "removeState"],
        toggle: {
            colReorder: !1,
            columns: {
                search: !1,
                visible: !1
            },
            length: !1,
            order: !1,
            paging: !1,
            scroller: !1,
            search: !1,
            searchBuilder: !1,
            searchPanes: !1,
            select: !1
        }
    }, s = r, m = (u = R).fn.dataTable, i = (f = R).fn.dataTable, R.fn.dataTable.StateRestore = p, R.fn.DataTable.StateRestore = p, R.fn.dataTable.StateRestoreCollection = s, R.fn.DataTable.StateRestoreCollection = s, (t = c.Api.register)("stateRestore()", function() {
        return this
    }), t("stateRestore.state()", function(e) {
        var t,
            s = this.context[0];
        return s._stateRestore || l(t = c.Api(s), new c.StateRestoreCollection(t, {})), this[0] = s._stateRestore.getState(e), this
    }), t("stateRestore.state.add()", function(e, t) {
        var s,
            o = this.context[0];
        if (o._stateRestore || l(s = c.Api(o), new c.StateRestoreCollection(s, {})), !o._stateRestore.c.create)
            return this;
        if (o._stateRestore.addState) {
            for (var a = [], i = 0, n = o._stateRestore.s.states; i < n.length; i++) {
                var r = n[i];
                a.push(r.s.identifier)
            }
            return o._stateRestore.addState(e, a, t), this
        }
    }), t("stateRestore.states()", function(e) {
        var t,
            s = this.context[0];
        return s._stateRestore || l(t = c.Api(s), new c.StateRestoreCollection(t, {})), this.length = 0, this.push.apply(this, s._stateRestore.getStates(e)), this
    }), t("stateRestore.state().save()", function() {
        var e = this[0];
        return e.c.save && e.save(), this
    }), t("stateRestore.state().rename()", function(e) {
        var t = this.context[0],
            s = this[0];
        if (s.c.save) {
            for (var o = [], a = 0, i = t._stateRestore.s.states; a < i.length; a++) {
                var n = i[a];
                o.push(n.s.identifier)
            }
            s.rename(e, o)
        }
        return this
    }), t("stateRestore.state().load()", function() {
        return this[0].load(), this
    }), t("stateRestore.state().remove()", function(e) {
        var t = this[0];
        return t.c.remove && t.remove(e), this
    }), t("stateRestore.states().remove()", function(e) {
        function t(e) {
            for (var t = !0, s = a.toArray(); 0 < s.length;) {
                var o = s[0];
                if (o === k || !o.c.remove)
                    break;
                o = o.remove(e);
                !0 !== o ? t = o : s.splice(0, 1)
            }
            return t
        }
        var a = this;
        return this.context[0]._stateRestore && this.context[0]._stateRestore.c.remove && (e ? t(e) : this.context[0]._stateRestore.removeAll(t)), this
    }), t("stateRestore.activeStates()", function() {
        var e,
            t = this.context[0];
        return this.length = 0, t._stateRestore || l(e = c.Api(t), new c.StateRestoreCollection(e, {})), t._stateRestore && this.push.apply(this, t._stateRestore.findActive()), this
    }), c.ext.buttons.stateRestore = {
        action: function(e, t, s, o) {
            o._stateRestore.load(),
                s.blur()
        },
        config: {
            split: ["updateState", "renameState", "removeState"]
        },
        text: function(e) {
            return e.i18n("buttons.stateRestore", "State %d", e.stateRestore.states()[0].length + 1)
        }
    }, c.ext.buttons.updateState = {
        action: function(e, t, s, o) {
            R("div.dt-button-background").click(),
                o.parent._stateRestore.save()
        },
        text: function(e) {
            return e.i18n("buttons.updateState", "Update")
        }
    }, c.ext.buttons.savedStates = {
        buttons: [],
        extend: "collection",
        init: function(e, t, s) {
            e.on("stateRestore-change", function() {
                e.button(t).text(e.i18n("buttons.savedStates", "Saved States", e.stateRestore.states().length))
            }),
            e.settings()[0]._stateRestore === k && o(e, s)
        },
        name: "SaveStateRestore",
        text: function(e) {
            return e.i18n("buttons.savedStates", "Saved States", 0)
        }
    }, c.ext.buttons.savedStatesCreate = {
        buttons: [],
        extend: "collection",
        init: function(e, t, s) {
            e.on("stateRestore-change", function() {
                e.button(t).text(e.i18n("buttons.savedStates", "Saved States", e.stateRestore.states().length))
            }),
            e.settings()[0]._stateRestore === k && (s.config === k && (s.config = {}), s.config._createInSaved = !0, o(e, s))
        },
        name: "SaveStateRestore",
        text: function(e) {
            return e.i18n("buttons.savedStates", "Saved States", 0)
        }
    }, c.ext.buttons.createState = {
        action: function(e, t, s, o) {
            e.stopPropagation();
            var a = t.settings()[0]._stateRestore.c,
                e = t.settings()[0].oLanguage;
            if (a.create && a.save) {
                var i = t.stateRestore.states().toArray(),
                    e = e.buttons !== k && e.buttons.stateRestore !== k ? e.buttons.stateRestore : "State ";
                if (e.indexOf("%d") === e.length - 3)
                    n = new RegExp(e.replace(/%d/g, ""));
                else
                    for (var e = e.split("%d"), n = [], r = 0, c = e; r < c.length; r++) {
                        var l = c[r];
                        n.push(new RegExp(l))
                    }
                for (var d = function(e) {
                    if (Array.isArray(n)) {
                        a = e;
                        for (var t = 0, s = n; t < s.length; t++)
                             var o = s[t],
                                 a = a.replace(o, "")
                    } else
                        a = e.replace(n, "");
                    return isNaN(+a) || a.length === e ? 0 : +a
                }, e = i.map(function(e) {
                    return d(e.s.identifier)
                }).sort(function(e, t) {
                    return +e < +t ? 1 : +t < +e ? -1 : 0
                })[0], h = (t.stateRestore.state.add(t.i18n("buttons.stateRestore", "State %d", e !== k ? e + 1 : 1), o.config), t.stateRestore.states().sort(function(e, t) {
                    e = +d(e.s.identifier),
                        t = +d(t.s.identifier);
                    return t < e ? 1 : e < t ? -1 : 0
                })), i = t.button("SaveStateRestore:name"), u = i[0] !== k && i[0].inst.c.buttons[0].buttons !== k ? i[0].inst.c.buttons[0].buttons : [], m = 0; m < u.length; m++)
                    "stateRestore" === u[m].extend && (u.splice(m, 1), m--);
                a._createInSaved && (u.push("createState"), u.push(""));
                for (var g = 0, f = h; g < f.length; g++) {
                    var p = f[g];
                    (l = Object.assign([], a.splitSecondaries)).includes("updateState") && !a.save && l.splice(l.indexOf("updateState"), 1),
                    !l.includes("renameState") || a.save && a.rename || l.splice(l.indexOf("renameState"), 1),
                    l.includes("removeState") && !a.remove && l.splice(l.indexOf("removeState"), 1),
                    0 < l.length && !l.includes("<h3>" + p.s.identifier + "</h3>") && l.unshift("<h3>" + p.s.identifier + "</h3>"),
                        u.push({
                            _stateRestore: p,
                            attr: {
                                title: p.s.identifier
                            },
                            config: {
                                split: l
                            },
                            extend: "stateRestore",
                            text: p.s.identifier
                        })
                }
                t.button("SaveStateRestore:name").collectionRebuild(u),
                    s.blur();
                for (var v = 0, b = t.buttons(); v < b.length; v++) {
                    var S = b[v];
                    R(S.node).hasClass("dtsr-removeAllStates") && (0 === h.length ? t.button(S.node).disable() : t.button(S.node).enable())
                }
            }
        },
        init: function(e, t, s) {
            e.settings()[0]._stateRestore === k && 1 < e.button("SaveStateRestore:name").length && o(e, s)
        },
        text: function(e) {
            return e.i18n("buttons.createState", "Create State")
        }
    }, c.ext.buttons.removeState = {
        action: function(e, t, s, o) {
            o.parent._stateRestore.remove(),
                s.blur()
        },
        text: function(e) {
            return e.i18n("buttons.removeState", "Remove")
        }
    }, c.ext.buttons.removeAllStates = {
        action: function(e, t, s) {
            t.stateRestore.states().remove(!0),
                s.blur()
        },
        className: "dt-button dtsr-removeAllStates",
        init: function(e, t) {
            e.settings()[0]._stateRestore && 0 !== e.stateRestore.states().length || R(t).addClass("disabled")
        },
        text: function(e) {
            return e.i18n("buttons.removeAllStates", "Remove All States")
        }
    }, c.ext.buttons.renameState = {
        action: function(e, t, s, o) {
            for (var a = [], i = 0, n = t.settings()[0]._stateRestore.s.states; i < n.length; i++) {
                var r = n[i];
                a.push(r.s.identifier)
            }
            o.parent._stateRestore.rename(k, a),
                s.blur()
        },
        text: function(e) {
            return e.i18n("buttons.renameState", "Rename")
        }
    }, R(g).on("preInit.dt.dtsr", function(e, t) {
        "dt" !== e.namespace || !t.oInit.stateRestore && !c.defaults.stateRestore || t._stateRestore || (e = t, void 0 === (t = null) && (t = null), e = new c.Api(e), t = t || e.init().stateRestore || c.defaults.stateRestore, t = new s(e, t), l(e, t))
    }), c
});

/*! Bootstrap integration for DataTables' StateRestore
 * © SpryMedia Ltd - datatables.net/license
 */
!function(n) {
    var o,
        r;
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs5", "datatables.net-staterestore"], function(e) {
        return n(e, window, document)
    }) : "object" == typeof exports ? (o = require("jquery"), r = function(e, t) {
        t.fn.dataTable || require("datatables.net-bs5")(e, t),
        t.fn.dataTable.StateRestore || require("datatables.net-staterestore")(e, t)
    }, "undefined" == typeof window ? module.exports = function(e, t) {
        return e = e || window, t = t || o(e), r(e, t), n(t, 0, e.document)
    } : (r(window, o), module.exports = n(o, window, window.document))) : n(jQuery, window, document)
}(function(e, t, n, o) {
    "use strict";
    var r = e.fn.dataTable;
    return e.extend(!0, r.StateRestoreCollection.classes, {
        checkBox: "dtsr-check-box form-check-input",
        checkLabel: "dtsr-check-label form-check-label",
        checkRow: "dtsr-check-row form-check",
        creationButton: "dtsr-creation-button btn btn-secondary",
        creationForm: "dtsr-creation-form modal-body",
        creationText: "dtsr-creation-text modal-header",
        creationTitle: "dtsr-creation-title modal-title",
        nameInput: "dtsr-name-input form-control",
        nameLabel: "dtsr-name-label form-label"
    }), e.extend(!0, r.StateRestore.classes, {
        confirmationButton: "dtsr-confirmation-button btn btn-secondary",
        input: "dtsr-input form-control"
    }), r
});
