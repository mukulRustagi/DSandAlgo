/*
 Highmaps JS v6.1.1 (2018-06-27)

 (c) 2011-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(T, K) { "object" === typeof module && module.exports ? module.exports = T.document ? K(T) : K : T.Highcharts = K(T) })("undefined" !== typeof window ? window : this, function(T) {
    var K = function() {
        var a = "undefined" === typeof T ? window : T,
            A = a.document,
            y = a.navigator && a.navigator.userAgent || "",
            C = A && A.createElementNS && !!A.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            n = /(edge|msie|trident)/i.test(y) && !a.opera,
            d = -1 !== y.indexOf("Firefox"),
            l = -1 !== y.indexOf("Chrome"),
            v = d && 4 > parseInt(y.split("Firefox/")[1],
                10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highmaps",
            version: "6.1.1",
            deg2rad: 2 * Math.PI / 360,
            doc: A,
            hasBidiBug: v,
            hasTouch: A && void 0 !== A.documentElement.ontouchstart,
            isMS: n,
            isWebKit: -1 !== y.indexOf("AppleWebKit"),
            isFirefox: d,
            isChrome: l,
            isSafari: !l && -1 !== y.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(y),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: C,
            win: a,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {},
            charts: []
        }
    }();
    (function(a) {
        a.timers = [];
        var A = a.charts,
            y = a.doc,
            C = a.win;
        a.error = function(n, d) {
            n = a.isNumber(n) ? "Highcharts error #" + n + ": www.highcharts.com/errors/" + n : n;
            if (d) throw Error(n);
            C.console && console.log(n)
        };
        a.Fx = function(a, d, l) {
            this.options = d;
            this.elem = a;
            this.prop = l
        };
        a.Fx.prototype = {
            dSetter: function() {
                var a = this.paths[0],
                    d = this.paths[1],
                    l = [],
                    v = this.now,
                    u = a.length,
                    t;
                if (1 === v) l = this.toD;
                else if (u === d.length && 1 > v)
                    for (; u--;) t = parseFloat(a[u]), l[u] = isNaN(t) ? d[u] : v * parseFloat(d[u] - t) + t;
                else l = d;
                this.elem.attr("d",
                    l, null, !0)
            },
            update: function() {
                var a = this.elem,
                    d = this.prop,
                    l = this.now,
                    v = this.options.step;
                if (this[d + "Setter"]) this[d + "Setter"]();
                else a.attr ? a.element && a.attr(d, l, null, !0) : a.style[d] = l + this.unit;
                v && v.call(a, l, this)
            },
            run: function(n, d, l) {
                var v = this,
                    u = v.options,
                    t = function(a) { return t.stopped ? !1 : v.step(a) },
                    k = C.requestAnimationFrame || function(a) { setTimeout(a, 13) },
                    g = function() {
                        for (var f = 0; f < a.timers.length; f++) a.timers[f]() || a.timers.splice(f--, 1);
                        a.timers.length && k(g)
                    };
                n !== d || this.elem["forceAnimate:" +
                    this.prop] ? (this.startTime = +new Date, this.start = n, this.end = d, this.unit = l, this.now = this.start, this.pos = 0, t.elem = this.elem, t.prop = this.prop, t() && 1 === a.timers.push(t) && k(g)) : (delete u.curAnim[this.prop], u.complete && 0 === a.keys(u.curAnim).length && u.complete.call(this.elem))
            },
            step: function(n) {
                var d = +new Date,
                    l, v = this.options,
                    u = this.elem,
                    t = v.complete,
                    k = v.duration,
                    g = v.curAnim;
                u.attr && !u.element ? n = !1 : n || d >= k + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), l = g[this.prop] = !0, a.objectEach(g, function(a) {
                    !0 !==
                        a && (l = !1)
                }), l && t && t.call(u), n = !1) : (this.pos = v.easing((d - this.startTime) / k), this.now = this.start + (this.end - this.start) * this.pos, this.update(), n = !0);
                return n
            },
            initPath: function(n, d, l) {
                function v(a) { var b, e; for (c = a.length; c--;) b = "M" === a[c] || "L" === a[c], e = /[a-zA-Z]/.test(a[c + 3]), b && e && a.splice(c + 1, 0, a[c + 1], a[c + 2], a[c + 1], a[c + 2]) }

                function u(a, b) {
                    for (; a.length < e;) {
                        a[0] = b[e - a.length];
                        var f = a.slice(0, q);
                        [].splice.apply(a, [0, 0].concat(f));
                        m && (f = a.slice(a.length - q), [].splice.apply(a, [a.length, 0].concat(f)), c--)
                    }
                    a[0] =
                        "M"
                }

                function t(a, c) { for (var f = (e - a.length) / q; 0 < f && f--;) b = a.slice().splice(a.length / B - q, q * B), b[0] = c[e - q - f * q], h && (b[q - 6] = b[q - 2], b[q - 5] = b[q - 1]), [].splice.apply(a, [a.length / B, 0].concat(b)), m && f-- }
                d = d || "";
                var k, g = n.startX,
                    f = n.endX,
                    h = -1 < d.indexOf("C"),
                    q = h ? 7 : 3,
                    e, b, c;
                d = d.split(" ");
                l = l.slice();
                var m = n.isArea,
                    B = m ? 2 : 1,
                    I;
                h && (v(d), v(l));
                if (g && f) {
                    for (c = 0; c < g.length; c++)
                        if (g[c] === f[0]) { k = c; break } else if (g[0] === f[f.length - g.length + c]) {
                        k = c;
                        I = !0;
                        break
                    }
                    void 0 === k && (d = [])
                }
                d.length && a.isNumber(k) && (e = l.length + k * B * q,
                    I ? (u(d, l), t(l, d)) : (u(l, d), t(d, l)));
                return [d, l]
            }
        };
        a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function() { this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0) };
        a.merge = function() {
            var n, d = arguments,
                l, v = {},
                u = function(l, k) {
                    "object" !== typeof l && (l = {});
                    a.objectEach(k, function(g, f) {!a.isObject(g, !0) || a.isClass(g) || a.isDOMElement(g) ? l[f] = k[f] : l[f] = u(l[f] || {}, g) });
                    return l
                };
            !0 === d[0] && (v = d[1], d = Array.prototype.slice.call(d, 2));
            l = d.length;
            for (n = 0; n < l; n++) v = u(v,
                d[n]);
            return v
        };
        a.pInt = function(a, d) { return parseInt(a, d || 10) };
        a.isString = function(a) { return "string" === typeof a };
        a.isArray = function(a) { a = Object.prototype.toString.call(a); return "[object Array]" === a || "[object Array Iterator]" === a };
        a.isObject = function(n, d) { return !!n && "object" === typeof n && (!d || !a.isArray(n)) };
        a.isDOMElement = function(n) { return a.isObject(n) && "number" === typeof n.nodeType };
        a.isClass = function(n) {
            var d = n && n.constructor;
            return !(!a.isObject(n, !0) || a.isDOMElement(n) || !d || !d.name || "Object" ===
                d.name)
        };
        a.isNumber = function(a) { return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a };
        a.erase = function(a, d) {
            for (var l = a.length; l--;)
                if (a[l] === d) { a.splice(l, 1); break }
        };
        a.defined = function(a) { return void 0 !== a && null !== a };
        a.attr = function(n, d, l) {
            var v;
            a.isString(d) ? a.defined(l) ? n.setAttribute(d, l) : n && n.getAttribute && ((v = n.getAttribute(d)) || "class" !== d || (v = n.getAttribute(d + "Name"))) : a.defined(d) && a.isObject(d) && a.objectEach(d, function(a, l) { n.setAttribute(l, a) });
            return v
        };
        a.splat = function(n) {
            return a.isArray(n) ?
                n : [n]
        };
        a.syncTimeout = function(a, d, l) {
            if (d) return setTimeout(a, d, l);
            a.call(0, l)
        };
        a.clearTimeout = function(n) { a.defined(n) && clearTimeout(n) };
        a.extend = function(a, d) {
            var l;
            a || (a = {});
            for (l in d) a[l] = d[l];
            return a
        };
        a.pick = function() {
            var a = arguments,
                d, l, v = a.length;
            for (d = 0; d < v; d++)
                if (l = a[d], void 0 !== l && null !== l) return l
        };
        a.css = function(n, d) {
            a.isMS && !a.svg && d && void 0 !== d.opacity && (d.filter = "alpha(opacity\x3d" + 100 * d.opacity + ")");
            a.extend(n.style, d)
        };
        a.createElement = function(n, d, l, v, u) {
            n = y.createElement(n);
            var t =
                a.css;
            d && a.extend(n, d);
            u && t(n, { padding: 0, border: "none", margin: 0 });
            l && t(n, l);
            v && v.appendChild(n);
            return n
        };
        a.extendClass = function(n, d) {
            var l = function() {};
            l.prototype = new n;
            a.extend(l.prototype, d);
            return l
        };
        a.pad = function(a, d, l) { return Array((d || 2) + 1 - String(a).replace("-", "").length).join(l || 0) + a };
        a.relativeLength = function(a, d, l) { return /%$/.test(a) ? d * parseFloat(a) / 100 + (l || 0) : parseFloat(a) };
        a.wrap = function(a, d, l) {
            var n = a[d];
            a[d] = function() {
                var a = Array.prototype.slice.call(arguments),
                    d = arguments,
                    k = this;
                k.proceed = function() { n.apply(k, arguments.length ? arguments : d) };
                a.unshift(n);
                a = l.apply(this, a);
                k.proceed = null;
                return a
            }
        };
        a.formatSingle = function(n, d, l) {
            var v = /\.([0-9])/,
                u = a.defaultOptions.lang;
            /f$/.test(n) ? (l = (l = n.match(v)) ? l[1] : -1, null !== d && (d = a.numberFormat(d, l, u.decimalPoint, -1 < n.indexOf(",") ? u.thousandsSep : ""))) : d = (l || a.time).dateFormat(n, d);
            return d
        };
        a.format = function(n, d, l) {
            for (var v = "{", u = !1, t, k, g, f, h = [], q; n;) {
                v = n.indexOf(v);
                if (-1 === v) break;
                t = n.slice(0, v);
                if (u) {
                    t = t.split(":");
                    k = t.shift().split(".");
                    f = k.length;
                    q = d;
                    for (g = 0; g < f; g++) q && (q = q[k[g]]);
                    t.length && (q = a.formatSingle(t.join(":"), q, l));
                    h.push(q)
                } else h.push(t);
                n = n.slice(v + 1);
                v = (u = !u) ? "}" : "{"
            }
            h.push(n);
            return h.join("")
        };
        a.getMagnitude = function(a) { return Math.pow(10, Math.floor(Math.log(a) / Math.LN10)) };
        a.normalizeTickInterval = function(n, d, l, v, u) {
            var t, k = n;
            l = a.pick(l, 1);
            t = n / l;
            d || (d = u ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === v && (1 === l ? d = a.grep(d, function(a) { return 0 === a % 1 }) : .1 >= l && (d = [1 / l])));
            for (v = 0; v < d.length && !(k = d[v], u && k * l >= n ||
                    !u && t <= (d[v] + (d[v + 1] || d[v])) / 2); v++);
            return k = a.correctFloat(k * l, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function(a, d) {
            var l = a.length,
                n, u;
            for (u = 0; u < l; u++) a[u].safeI = u;
            a.sort(function(a, k) { n = d(a, k); return 0 === n ? a.safeI - k.safeI : n });
            for (u = 0; u < l; u++) delete a[u].safeI
        };
        a.arrayMin = function(a) { for (var d = a.length, l = a[0]; d--;) a[d] < l && (l = a[d]); return l };
        a.arrayMax = function(a) { for (var d = a.length, l = a[0]; d--;) a[d] > l && (l = a[d]); return l };
        a.destroyObjectProperties = function(n, d) {
            a.objectEach(n, function(a,
                v) {
                a && a !== d && a.destroy && a.destroy();
                delete n[v]
            })
        };
        a.discardElement = function(n) {
            var d = a.garbageBin;
            d || (d = a.createElement("div"));
            n && d.appendChild(n);
            d.innerHTML = ""
        };
        a.correctFloat = function(a, d) { return parseFloat(a.toPrecision(d || 14)) };
        a.setAnimation = function(n, d) { d.renderer.globalAnimation = a.pick(n, d.options.chart.animation, !0) };
        a.animObject = function(n) { return a.isObject(n) ? a.merge(n) : { duration: n ? 500 : 0 } };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function(n, d, l, v) {
            n = +n || 0;
            d = +d;
            var u = a.defaultOptions.lang,
                t = (n.toString().split(".")[1] || "").split("e")[0].length,
                k, g, f = n.toString().split("e"); - 1 === d ? d = Math.min(t, 20) : a.isNumber(d) ? d && f[1] && 0 > f[1] && (k = d + +f[1], 0 <= k ? (f[0] = (+f[0]).toExponential(k).split("e")[0], d = k) : (f[0] = f[0].split(".")[0] || 0, n = 20 > d ? (f[0] * Math.pow(10, f[1])).toFixed(d) : 0, f[1] = 0)) : d = 2;
            g = (Math.abs(f[1] ? f[0] : n) + Math.pow(10, -Math.max(d, t) - 1)).toFixed(d);
            t = String(a.pInt(g));
            k = 3 < t.length ? t.length % 3 : 0;
            l = a.pick(l,
                u.decimalPoint);
            v = a.pick(v, u.thousandsSep);
            n = (0 > n ? "-" : "") + (k ? t.substr(0, k) + v : "");
            n += t.substr(k).replace(/(\d{3})(?=\d)/g, "$1" + v);
            d && (n += l + g.slice(-d));
            f[1] && 0 !== +n && (n += "e" + f[1]);
            return n
        };
        Math.easeInOutSine = function(a) { return -.5 * (Math.cos(Math.PI * a) - 1) };
        a.getStyle = function(n, d, l) {
            if ("width" === d) return Math.max(0, Math.min(n.offsetWidth, n.scrollWidth) - a.getStyle(n, "padding-left") - a.getStyle(n, "padding-right"));
            if ("height" === d) return Math.max(0, Math.min(n.offsetHeight, n.scrollHeight) - a.getStyle(n, "padding-top") -
                a.getStyle(n, "padding-bottom"));
            C.getComputedStyle || a.error(27, !0);
            if (n = C.getComputedStyle(n, void 0)) n = n.getPropertyValue(d), a.pick(l, "opacity" !== d) && (n = a.pInt(n));
            return n
        };
        a.inArray = function(n, d, l) { return (a.indexOfPolyfill || Array.prototype.indexOf).call(d, n, l) };
        a.grep = function(n, d) { return (a.filterPolyfill || Array.prototype.filter).call(n, d) };
        a.find = Array.prototype.find ? function(a, d) { return a.find(d) } : function(a, d) {
            var l, n = a.length;
            for (l = 0; l < n; l++)
                if (d(a[l], l)) return a[l]
        };
        a.some = function(n, d, l) {
            return (a.somePolyfill ||
                Array.prototype.some).call(n, d, l)
        };
        a.map = function(a, d) { for (var l = [], n = 0, u = a.length; n < u; n++) l[n] = d.call(a[n], a[n], n, a); return l };
        a.keys = function(n) { return (a.keysPolyfill || Object.keys).call(void 0, n) };
        a.reduce = function(n, d, l) { return (a.reducePolyfill || Array.prototype.reduce).apply(n, 2 < arguments.length ? [d, l] : [d]) };
        a.offset = function(a) {
            var d = y.documentElement;
            a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : { top: 0, left: 0 };
            return {
                top: a.top + (C.pageYOffset || d.scrollTop) - (d.clientTop || 0),
                left: a.left +
                    (C.pageXOffset || d.scrollLeft) - (d.clientLeft || 0)
            }
        };
        a.stop = function(n, d) { for (var l = a.timers.length; l--;) a.timers[l].elem !== n || d && d !== a.timers[l].prop || (a.timers[l].stopped = !0) };
        a.each = function(n, d, l) { return (a.forEachPolyfill || Array.prototype.forEach).call(n, d, l) };
        a.objectEach = function(a, d, l) { for (var n in a) a.hasOwnProperty(n) && d.call(l || a[n], a[n], n, a) };
        a.addEvent = function(n, d, l, v) {
            var u, t = n.addEventListener || a.addEventListenerPolyfill;
            u = "function" === typeof n && n.prototype ? n.prototype.protoEvents = n.prototype.protoEvents || {} : n.hcEvents = n.hcEvents || {};
            a.Point && n instanceof a.Point && n.series && n.series.chart && (n.series.chart.runTrackerClick = !0);
            t && t.call(n, d, l, !1);
            u[d] || (u[d] = []);
            u[d].push(l);
            v && a.isNumber(v.order) && (l.order = v.order, u[d].sort(function(a, g) { return a.order - g.order }));
            return function() { a.removeEvent(n, d, l) }
        };
        a.removeEvent = function(n, d, l) {
            function v(g, f) {
                var k = n.removeEventListener || a.removeEventListenerPolyfill;
                k && k.call(n, g, f, !1)
            }

            function u(g) {
                var f, k;
                n.nodeName && (d ? (f = {}, f[d] = !0) : f = g, a.objectEach(f, function(a,
                    e) {
                    if (g[e])
                        for (k = g[e].length; k--;) v(e, g[e][k])
                }))
            }
            var t, k;
            a.each(["protoEvents", "hcEvents"], function(g) {
                var f = n[g];
                f && (d ? (t = f[d] || [], l ? (k = a.inArray(l, t), -1 < k && (t.splice(k, 1), f[d] = t), v(d, l)) : (u(f), f[d] = [])) : (u(f), n[g] = {}))
            })
        };
        a.fireEvent = function(n, d, l, v) {
            var u, t, k, g, f;
            l = l || {};
            y.createEvent && (n.dispatchEvent || n.fireEvent) ? (u = y.createEvent("Events"), u.initEvent(d, !0, !0), a.extend(u, l), n.dispatchEvent ? n.dispatchEvent(u) : n.fireEvent(d, u)) : a.each(["protoEvents", "hcEvents"], function(h) {
                if (n[h])
                    for (t = n[h][d] || [], k = t.length, l.target || a.extend(l, { preventDefault: function() { l.defaultPrevented = !0 }, target: n, type: d }), g = 0; g < k; g++)(f = t[g]) && !1 === f.call(n, l) && l.preventDefault()
            });
            v && !l.defaultPrevented && v.call(n, l)
        };
        a.animate = function(n, d, l) {
            var v, u = "",
                t, k, g;
            a.isObject(l) || (g = arguments, l = { duration: g[2], easing: g[3], complete: g[4] });
            a.isNumber(l.duration) || (l.duration = 400);
            l.easing = "function" === typeof l.easing ? l.easing : Math[l.easing] || Math.easeInOutSine;
            l.curAnim = a.merge(d);
            a.objectEach(d, function(f, g) {
                a.stop(n, g);
                k = new a.Fx(n, l, g);
                t = null;
                "d" === g ? (k.paths = k.initPath(n, n.d, d.d), k.toD = d.d, v = 0, t = 1) : n.attr ? v = n.attr(g) : (v = parseFloat(a.getStyle(n, g)) || 0, "opacity" !== g && (u = "px"));
                t || (t = f);
                t && t.match && t.match("px") && (t = t.replace(/px/g, ""));
                k.run(v, t, u)
            })
        };
        a.seriesType = function(n, d, l, v, u) {
            var t = a.getOptions(),
                k = a.seriesTypes;
            t.plotOptions[n] = a.merge(t.plotOptions[d], l);
            k[n] = a.extendClass(k[d] || function() {}, v);
            k[n].prototype.type = n;
            u && (k[n].prototype.pointClass = a.extendClass(a.Point, u));
            return k[n]
        };
        a.uniqueKey = function() {
            var a =
                Math.random().toString(36).substring(2, 9),
                d = 0;
            return function() { return "highcharts-" + a + "-" + d++ }
        }();
        C.jQuery && (C.jQuery.fn.highcharts = function() { var n = [].slice.call(arguments); if (this[0]) return n[0] ? (new(a[a.isString(n[0]) ? n.shift() : "Chart"])(this[0], n[0], n[1]), this) : A[a.attr(this[0], "data-highcharts-chart")] })
    })(K);
    (function(a) {
        var A = a.each,
            y = a.isNumber,
            C = a.map,
            n = a.merge,
            d = a.pInt;
        a.Color = function(l) {
            if (!(this instanceof a.Color)) return new a.Color(l);
            this.init(l)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(a) { return [d(a[1]), d(a[2]), d(a[3]), parseFloat(a[4], 10)] }
            }, { regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function(a) { return [d(a[1]), d(a[2]), d(a[3]), 1] } }],
            names: { none: "rgba(255,255,255,0)", white: "#ffffff", black: "#000000" },
            init: function(d) {
                var l, n, t, k;
                if ((this.input = d = this.names[d && d.toLowerCase ? d.toLowerCase() : ""] || d) && d.stops) this.stops = C(d.stops, function(g) { return new a.Color(g[1]) });
                else if (d && d.charAt && "#" === d.charAt() && (l = d.length, d = parseInt(d.substr(1),
                        16), 7 === l ? n = [(d & 16711680) >> 16, (d & 65280) >> 8, d & 255, 1] : 4 === l && (n = [(d & 3840) >> 4 | (d & 3840) >> 8, (d & 240) >> 4 | d & 240, (d & 15) << 4 | d & 15, 1])), !n)
                    for (t = this.parsers.length; t-- && !n;) k = this.parsers[t], (l = k.regex.exec(d)) && (n = k.parse(l));
                this.rgba = n || []
            },
            get: function(a) {
                var d = this.input,
                    l = this.rgba,
                    t;
                this.stops ? (t = n(d), t.stops = [].concat(t.stops), A(this.stops, function(k, g) { t.stops[g] = [t.stops[g][0], k.get(a)] })) : t = l && y(l[0]) ? "rgb" === a || !a && 1 === l[3] ? "rgb(" + l[0] + "," + l[1] + "," + l[2] + ")" : "a" === a ? l[3] : "rgba(" + l.join(",") + ")" : d;
                return t
            },
            brighten: function(a) {
                var l, n = this.rgba;
                if (this.stops) A(this.stops, function(d) { d.brighten(a) });
                else if (y(a) && 0 !== a)
                    for (l = 0; 3 > l; l++) n[l] += d(255 * a), 0 > n[l] && (n[l] = 0), 255 < n[l] && (n[l] = 255);
                return this
            },
            setOpacity: function(a) { this.rgba[3] = a; return this },
            tweenTo: function(a, d) {
                var l = this.rgba,
                    t = a.rgba;
                t.length && l && l.length ? (a = 1 !== t[3] || 1 !== l[3], d = (a ? "rgba(" : "rgb(") + Math.round(t[0] + (l[0] - t[0]) * (1 - d)) + "," + Math.round(t[1] + (l[1] - t[1]) * (1 - d)) + "," + Math.round(t[2] + (l[2] - t[2]) * (1 - d)) + (a ? "," + (t[3] + (l[3] -
                    t[3]) * (1 - d)) : "") + ")") : d = a.input || "none";
                return d
            }
        };
        a.color = function(d) { return new a.Color(d) }
    })(K);
    (function(a) {
        var A = a.defined,
            y = a.each,
            C = a.extend,
            n = a.merge,
            d = a.pick,
            l = a.timeUnits,
            v = a.win;
        a.Time = function(a) { this.update(a, !1) };
        a.Time.prototype = {
            defaultOptions: {},
            update: function(l) {
                var t = d(l && l.useUTC, !0),
                    k = this;
                this.options = l = n(!0, this.options || {}, l);
                this.Date = l.Date || v.Date;
                this.timezoneOffset = (this.useUTC = t) && l.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                (this.variableTimezone = !(t && !l.getTimezoneOffset && !l.timezone)) || this.timezoneOffset ? (this.get = function(a, f) {
                    var g = f.getTime(),
                        q = g - k.getTimezoneOffset(f);
                    f.setTime(q);
                    a = f["getUTC" + a]();
                    f.setTime(g);
                    return a
                }, this.set = function(g, f, h) {
                    var q;
                    if (-1 !== a.inArray(g, ["Milliseconds", "Seconds", "Minutes"])) f["set" + g](h);
                    else q = k.getTimezoneOffset(f), q = f.getTime() - q, f.setTime(q), f["setUTC" + g](h), g = k.getTimezoneOffset(f), q = f.getTime() + g, f.setTime(q)
                }) : t ? (this.get = function(a, f) { return f["getUTC" + a]() }, this.set = function(a, f, k) {
                    return f["setUTC" +
                        a](k)
                }) : (this.get = function(a, f) { return f["get" + a]() }, this.set = function(a, f, k) { return f["set" + a](k) })
            },
            makeTime: function(l, t, k, g, f, h) {
                var q, e, b;
                this.useUTC ? (q = this.Date.UTC.apply(0, arguments), e = this.getTimezoneOffset(q), q += e, b = this.getTimezoneOffset(q), e !== b ? q += b - e : e - 36E5 !== this.getTimezoneOffset(q - 36E5) || a.isSafari || (q -= 36E5)) : q = (new this.Date(l, t, d(k, 1), d(g, 0), d(f, 0), d(h, 0))).getTime();
                return q
            },
            timezoneOffsetFunction: function() {
                var d = this,
                    l = this.options,
                    k = v.moment;
                if (!this.useUTC) return function(a) {
                    return 6E4 *
                        (new Date(a)).getTimezoneOffset()
                };
                if (l.timezone) {
                    if (k) return function(a) { return 6E4 * -k.tz(a, l.timezone).utcOffset() };
                    a.error(25)
                }
                return this.useUTC && l.getTimezoneOffset ? function(a) { return 6E4 * l.getTimezoneOffset(a) } : function() { return 6E4 * (d.timezoneOffset || 0) }
            },
            dateFormat: function(d, l, k) {
                if (!a.defined(l) || isNaN(l)) return a.defaultOptions.lang.invalidDate || "";
                d = a.pick(d, "%Y-%m-%d %H:%M:%S");
                var g = this,
                    f = new this.Date(l),
                    h = this.get("Hours", f),
                    q = this.get("Day", f),
                    e = this.get("Date", f),
                    b = this.get("Month",
                        f),
                    c = this.get("FullYear", f),
                    m = a.defaultOptions.lang,
                    B = m.weekdays,
                    I = m.shortWeekdays,
                    x = a.pad,
                    f = a.extend({ a: I ? I[q] : B[q].substr(0, 3), A: B[q], d: x(e), e: x(e, 2, " "), w: q, b: m.shortMonths[b], B: m.months[b], m: x(b + 1), o: b + 1, y: c.toString().substr(2, 2), Y: c, H: x(h), k: h, I: x(h % 12 || 12), l: h % 12 || 12, M: x(g.get("Minutes", f)), p: 12 > h ? "AM" : "PM", P: 12 > h ? "am" : "pm", S: x(f.getSeconds()), L: x(Math.round(l % 1E3), 3) }, a.dateFormats);
                a.objectEach(f, function(a, b) {
                    for (; - 1 !== d.indexOf("%" + b);) d = d.replace("%" + b, "function" === typeof a ? a.call(g, l) :
                        a)
                });
                return k ? d.substr(0, 1).toUpperCase() + d.substr(1) : d
            },
            getTimeTicks: function(a, t, k, g) {
                var f = this,
                    h = [],
                    q = {},
                    e, b = new f.Date(t),
                    c = a.unitRange,
                    m = a.count || 1,
                    B;
                if (A(t)) {
                    f.set("Milliseconds", b, c >= l.second ? 0 : m * Math.floor(f.get("Milliseconds", b) / m));
                    c >= l.second && f.set("Seconds", b, c >= l.minute ? 0 : m * Math.floor(f.get("Seconds", b) / m));
                    c >= l.minute && f.set("Minutes", b, c >= l.hour ? 0 : m * Math.floor(f.get("Minutes", b) / m));
                    c >= l.hour && f.set("Hours", b, c >= l.day ? 0 : m * Math.floor(f.get("Hours", b) / m));
                    c >= l.day && f.set("Date", b, c >=
                        l.month ? 1 : m * Math.floor(f.get("Date", b) / m));
                    c >= l.month && (f.set("Month", b, c >= l.year ? 0 : m * Math.floor(f.get("Month", b) / m)), e = f.get("FullYear", b));
                    c >= l.year && f.set("FullYear", b, e - e % m);
                    c === l.week && f.set("Date", b, f.get("Date", b) - f.get("Day", b) + d(g, 1));
                    e = f.get("FullYear", b);
                    g = f.get("Month", b);
                    var I = f.get("Date", b),
                        x = f.get("Hours", b);
                    t = b.getTime();
                    f.variableTimezone && (B = k - t > 4 * l.month || f.getTimezoneOffset(t) !== f.getTimezoneOffset(k));
                    b = b.getTime();
                    for (t = 1; b < k;) h.push(b), b = c === l.year ? f.makeTime(e + t * m, 0) : c ===
                        l.month ? f.makeTime(e, g + t * m) : !B || c !== l.day && c !== l.week ? B && c === l.hour && 1 < m ? f.makeTime(e, g, I, x + t * m) : b + c * m : f.makeTime(e, g, I + t * m * (c === l.day ? 1 : 7)), t++;
                    h.push(b);
                    c <= l.hour && 1E4 > h.length && y(h, function(a) { 0 === a % 18E5 && "000000000" === f.dateFormat("%H%M%S%L", a) && (q[a] = "day") })
                }
                h.info = C(a, { higherRanks: q, totalRange: c * m });
                return h
            }
        }
    })(K);
    (function(a) {
        var A = a.color,
            y = a.merge;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond",
                "square", "triangle", "triangle-down"
            ],
            lang: { loading: "Loading...", months: "January February March April May June July August September October November December".split(" "), shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), decimalPoint: ".", numericSymbols: "kMGTPE".split(""), resetZoom: "Reset zoom", resetZoomTitle: "Reset zoom level 1:1", thousandsSep: " " },
            global: {},
            time: a.Time.prototype.defaultOptions,
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: { text: "Chart title", align: "center", margin: 15, widthAdjust: -44 },
            subtitle: { text: "", align: "center", widthAdjust: -44 },
            plotOptions: {},
            labels: { style: { position: "absolute", color: "#333333" } },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function() { return this.name },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: { activeColor: "#003399", inactiveColor: "#cccccc" },
                itemStyle: { color: "#333333", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis" },
                itemHoverStyle: { color: "#000000" },
                itemHiddenStyle: { color: "#cccccc" },
                shadow: !1,
                itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: { style: { fontWeight: "bold" } }
            },
            loading: {
                labelStyle: { fontWeight: "bold", position: "relative", top: "45%" },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: { millisecond: "%A, %b %e, %H:%M:%S.%L", second: "%A, %b %e, %H:%M:%S", minute: "%A, %b %e, %H:%M", hour: "%A, %b %e, %H:%M", day: "%A, %b %e, %Y", week: "Week from %A, %b %e, %Y", month: "%B %Y", year: "%Y" },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: A("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                shadow: !0,
                style: { color: "#333333", cursor: "default", fontSize: "12px", pointerEvents: "none", whiteSpace: "nowrap" }
            },
            credits: { enabled: !0, href: "http://www.highcharts.com", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "9px" }, text: "Highcharts.com" }
        };
        a.setOptions = function(C) {
            a.defaultOptions = y(!0, a.defaultOptions, C);
            a.time.update(y(a.defaultOptions.global,
                a.defaultOptions.time), !1);
            return a.defaultOptions
        };
        a.getOptions = function() { return a.defaultOptions };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        a.time = new a.Time(y(a.defaultOptions.global, a.defaultOptions.time));
        a.dateFormat = function(y, n, d) { return a.time.dateFormat(y, n, d) }
    })(K);
    (function(a) {
        var A, y, C = a.addEvent,
            n = a.animate,
            d = a.attr,
            l = a.charts,
            v = a.color,
            u = a.css,
            t = a.createElement,
            k = a.defined,
            g = a.deg2rad,
            f = a.destroyObjectProperties,
            h = a.doc,
            q = a.each,
            e = a.extend,
            b = a.erase,
            c = a.grep,
            m = a.hasTouch,
            B =
            a.inArray,
            I = a.isArray,
            x = a.isFirefox,
            M = a.isMS,
            w = a.isObject,
            F = a.isString,
            p = a.isWebKit,
            G = a.merge,
            D = a.noop,
            J = a.objectEach,
            H = a.pick,
            r = a.pInt,
            z = a.removeEvent,
            N = a.stop,
            S = a.svg,
            L = a.SVG_NS,
            P = a.symbolSizes,
            O = a.win;
        A = a.SVGElement = function() { return this };
        e(A.prototype, {
            opacity: 1,
            SVG_NS: L,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
            init: function(a, b) {
                this.element = "span" === b ? t(b) : h.createElementNS(this.SVG_NS,
                    b);
                this.renderer = a
            },
            animate: function(b, c, e) {
                c = a.animObject(H(c, this.renderer.globalAnimation, !0));
                0 !== c.duration ? (e && (c.complete = e), n(this, b, c)) : (this.attr(b, null, e), c.step && c.step.call(this));
                return this
            },
            complexColor: function(b, c, e) {
                var E = this.renderer,
                    r, z, p, m, f, L, g, Q, B, h, d, D = [],
                    w;
                a.fireEvent(this.renderer, "complexColor", { args: arguments }, function() {
                    b.radialGradient ? z = "radialGradient" : b.linearGradient && (z = "linearGradient");
                    z && (p = b[z], f = E.gradients, g = b.stops, h = e.radialReference, I(p) && (b[z] = p = {
                        x1: p[0],
                        y1: p[1],
                        x2: p[2],
                        y2: p[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === z && h && !k(p.gradientUnits) && (m = p, p = G(p, E.getRadialAttr(h, m), { gradientUnits: "userSpaceOnUse" })), J(p, function(a, b) { "id" !== b && D.push(b, a) }), J(g, function(a) { D.push(a) }), D = D.join(","), f[D] ? d = f[D].attr("id") : (p.id = d = a.uniqueKey(), f[D] = L = E.createElement(z).attr(p).add(E.defs), L.radAttr = m, L.stops = [], q(g, function(b) {
                        0 === b[1].indexOf("rgba") ? (r = a.color(b[1]), Q = r.get("rgb"), B = r.get("a")) : (Q = b[1], B = 1);
                        b = E.createElement("stop").attr({
                            offset: b[0],
                            "stop-color": Q,
                            "stop-opacity": B
                        }).add(L);
                        L.stops.push(b)
                    })), w = "url(" + E.url + "#" + d + ")", e.setAttribute(c, w), e.gradient = D, b.toString = function() { return w })
                })
            },
            applyTextOutline: function(E) {
                var c = this.element,
                    e, r, z, p, m; - 1 !== E.indexOf("contrast") && (E = E.replace(/contrast/g, this.renderer.getContrast(c.style.fill)));
                E = E.split(" ");
                r = E[E.length - 1];
                if ((z = E[0]) && "none" !== z && a.svg) {
                    this.fakeTS = !0;
                    E = [].slice.call(c.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    z = z.replace(/(^[\d\.]+)(.*?)$/g, function(a,
                        b, c) { return 2 * b + c });
                    for (m = E.length; m--;) e = E[m], "highcharts-text-outline" === e.getAttribute("class") && b(E, c.removeChild(e));
                    p = c.firstChild;
                    q(E, function(a, b) {
                        0 === b && (a.setAttribute("x", c.getAttribute("x")), b = c.getAttribute("y"), a.setAttribute("y", b || 0), null === b && c.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        d(a, { "class": "highcharts-text-outline", fill: r, stroke: r, "stroke-width": z, "stroke-linejoin": "round" });
                        c.insertBefore(a, p)
                    })
                }
            },
            attr: function(a, b, c, e) {
                var E, r = this.element,
                    z, p = this,
                    m, f;
                "string" === typeof a &&
                    void 0 !== b && (E = a, a = {}, a[E] = b);
                "string" === typeof a ? p = (this[a + "Getter"] || this._defaultGetter).call(this, a, r) : (J(a, function(b, c) {
                    m = !1;
                    e || N(this, c);
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(c) && (z || (this.symbolAttr(a), z = !0), m = !0);
                    !this.rotation || "x" !== c && "y" !== c || (this.doTransform = !0);
                    m || (f = this[c + "Setter"] || this._defaultSetter, f.call(this, b, c, r), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) && this.updateShadows(c, b, f))
                }, this), this.afterSetters());
                c && c.call(this);
                return p
            },
            afterSetters: function() { this.doTransform && (this.updateTransform(), this.doTransform = !1) },
            updateShadows: function(a, b, c) { for (var e = this.shadows, E = e.length; E--;) c.call(e[E], "height" === a ? Math.max(b - (e[E].cutHeight || 0), 0) : "d" === a ? this.d : b, a, e[E]) },
            addClass: function(a, b) { var c = this.attr("class") || ""; - 1 === c.indexOf(a) && (b || (a = (c + (c ? " " : "") + a).replace("  ", " ")), this.attr("class", a)); return this },
            hasClass: function(a) { return -1 !== B(a, (this.attr("class") || "").split(" ")) },
            removeClass: function(a) {
                return this.attr("class",
                    (this.attr("class") || "").replace(a, ""))
            },
            symbolAttr: function(a) {
                var b = this;
                q("x y r start end width height innerR anchorX anchorY".split(" "), function(c) { b[c] = H(a[c], b[c]) });
                b.attr({ d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b) })
            },
            clip: function(a) { return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none") },
            crisp: function(a, b) {
                var c;
                b = b || a.strokeWidth || 0;
                c = Math.round(b) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + c;
                a.y = Math.floor(a.y || this.y || 0) + c;
                a.width = Math.floor((a.width ||
                    this.width || 0) - 2 * c);
                a.height = Math.floor((a.height || this.height || 0) - 2 * c);
                k(a.strokeWidth) && (a.strokeWidth = b);
                return a
            },
            css: function(a) {
                var b = this.styles,
                    c = {},
                    E = this.element,
                    z, p = "",
                    m, f = !b,
                    L = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                b && J(a, function(a, e) { a !== b[e] && (c[e] = a, f = !0) });
                f && (b && (a = e(b, c)), a && (null === a.width || "auto" === a.width ? delete this.textWidth : "text" === E.nodeName.toLowerCase() && a.width && (z = this.textWidth = r(a.width))), this.styles = a, z && !S && this.renderer.forExport &&
                    delete a.width, E.namespaceURI === this.SVG_NS ? (m = function(a, b) { return "-" + b.toLowerCase() }, J(a, function(a, b) {-1 === B(b, L) && (p += b.replace(/([A-Z])/g, m) + ":" + a + ";") }), p && d(E, "style", p)) : u(E, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            strokeWidth: function() { return this["stroke-width"] || 0 },
            on: function(a, b) {
                var c = this,
                    e = c.element;
                m && "click" === a ? (e.ontouchstart = function(a) {
                    c.touchEventFired = Date.now();
                    a.preventDefault();
                    b.call(e, a)
                }, e.onclick = function(a) {
                    (-1 === O.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (c.touchEventFired || 0)) && b.call(e, a)
                }) : e["on" + a] = b;
                return this
            },
            setRadialReference: function(a) {
                var b = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr));
                return this
            },
            translate: function(a, b) { return this.attr({ translateX: a, translateY: b }) },
            invert: function(a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function() {
                var a =
                    this.translateX || 0,
                    b = this.translateY || 0,
                    c = this.scaleX,
                    e = this.scaleY,
                    r = this.inverted,
                    z = this.rotation,
                    p = this.matrix,
                    m = this.element;
                r && (a += this.width, b += this.height);
                a = ["translate(" + a + "," + b + ")"];
                k(p) && a.push("matrix(" + p.join(",") + ")");
                r ? a.push("rotate(90) scale(-1,1)") : z && a.push("rotate(" + z + " " + H(this.rotationOriginX, m.getAttribute("x"), 0) + " " + H(this.rotationOriginY, m.getAttribute("y") || 0) + ")");
                (k(c) || k(e)) && a.push("scale(" + H(c, 1) + " " + H(e, 1) + ")");
                a.length && m.setAttribute("transform", a.join(" "))
            },
            toFront: function() {
                var a =
                    this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function(a, c, e) {
                var r, E, z, p, m = {};
                E = this.renderer;
                z = E.alignedObjects;
                var f, L;
                if (a) { if (this.alignOptions = a, this.alignByTranslate = c, !e || F(e)) this.alignTo = r = e || "renderer", b(z, this), z.push(this), e = null } else a = this.alignOptions, c = this.alignByTranslate, r = this.alignTo;
                e = H(e, E[r], E);
                r = a.align;
                E = a.verticalAlign;
                z = (e.x || 0) + (a.x || 0);
                p = (e.y || 0) + (a.y || 0);
                "right" === r ? f = 1 : "center" === r && (f = 2);
                f && (z += (e.width - (a.width || 0)) / f);
                m[c ? "translateX" : "x"] = Math.round(z);
                "bottom" === E ? L = 1 : "middle" === E && (L = 2);
                L && (p += (e.height - (a.height || 0)) / L);
                m[c ? "translateY" : "y"] = Math.round(p);
                this[this.placed ? "animate" : "attr"](m);
                this.placed = !0;
                this.alignAttr = m;
                return this
            },
            getBBox: function(a, b) {
                var c, r = this.renderer,
                    z, E = this.element,
                    p = this.styles,
                    m, f = this.textStr,
                    L, B = r.cache,
                    D = r.cacheKeys,
                    h;
                b = H(b, this.rotation);
                z = b * g;
                m = p && p.fontSize;
                k(f) && (h = f.toString(), -1 === h.indexOf("\x3c") && (h = h.replace(/[0-9]/g, "0")), h += ["", b || 0, m, this.textWidth, p && p.textOverflow].join());
                h && !a && (c = B[h]);
                if (!c) {
                    if (E.namespaceURI ===
                        this.SVG_NS || r.forExport) {
                        try {
                            (L = this.fakeTS && function(a) { q(E.querySelectorAll(".highcharts-text-outline"), function(b) { b.style.display = a }) }) && L("none"), c = E.getBBox ? e({}, E.getBBox()) : { width: E.offsetWidth, height: E.offsetHeight }, L && L("")
                        } catch (X) {}
                        if (!c || 0 > c.width) c = { width: 0, height: 0 }
                    } else c = this.htmlGetBBox();
                    r.isSVG && (a = c.width, r = c.height, p && "11px" === p.fontSize && 17 === Math.round(r) && (c.height = r = 14), b && (c.width = Math.abs(r * Math.sin(z)) + Math.abs(a * Math.cos(z)), c.height = Math.abs(r * Math.cos(z)) + Math.abs(a *
                        Math.sin(z))));
                    if (h && 0 < c.height) {
                        for (; 250 < D.length;) delete B[D.shift()];
                        B[h] || D.push(h);
                        B[h] = c
                    }
                }
                return c
            },
            show: function(a) { return this.attr({ visibility: a ? "inherit" : "visible" }) },
            hide: function() { return this.attr({ visibility: "hidden" }) },
            fadeOut: function(a) {
                var b = this;
                b.animate({ opacity: 0 }, { duration: a || 150, complete: function() { b.attr({ y: -9999 }) } })
            },
            add: function(a) {
                var b = this.renderer,
                    c = this.element,
                    e;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && b.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) e = this.zIndexSetter();
                e || (a ? a.element : b.box).appendChild(c);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function(a) {
                var b = a.parentNode;
                b && b.removeChild(a)
            },
            destroy: function() {
                var a = this,
                    c = a.element || {},
                    e = a.renderer.isSVG && "SPAN" === c.nodeName && a.parentGroup,
                    r = c.ownerSVGElement,
                    z = a.clipPath;
                c.onclick = c.onmouseout = c.onmouseover = c.onmousemove = c.point = null;
                N(a);
                z && r && (q(r.querySelectorAll("[clip-path],[CLIP-PATH]"), function(a) {
                    var b = a.getAttribute("clip-path"),
                        c = z.element.id;
                    (-1 < b.indexOf("(#" + c + ")") || -1 < b.indexOf('("#' + c + '")')) && a.removeAttribute("clip-path")
                }), a.clipPath = z.destroy());
                if (a.stops) {
                    for (r = 0; r < a.stops.length; r++) a.stops[r] = a.stops[r].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(c);
                for (a.destroyShadows(); e && e.div && 0 === e.div.childNodes.length;) c = e.parentGroup, a.safeRemoveChild(e.div), delete e.div, e = c;
                a.alignTo && b(a.renderer.alignedObjects, a);
                J(a, function(b, c) { delete a[c] });
                return null
            },
            shadow: function(a, b, c) {
                var e = [],
                    r, z, E = this.element,
                    p, m, f, L;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    m = H(a.width, 3);
                    f = (a.opacity || .15) / m;
                    L = this.parentInverted ? "(-1,-1)" : "(" + H(a.offsetX, 1) + ", " + H(a.offsetY, 1) + ")";
                    for (r = 1; r <= m; r++) z = E.cloneNode(0), p = 2 * m + 1 - 2 * r, d(z, { isShadow: "true", stroke: a.color || "#000000", "stroke-opacity": f * r, "stroke-width": p, transform: "translate" + L, fill: "none" }), c && (d(z, "height", Math.max(d(z, "height") - p, 0)), z.cutHeight = p), b ? b.element.appendChild(z) : E.parentNode && E.parentNode.insertBefore(z, E), e.push(z);
                    this.shadows = e
                }
                return this
            },
            destroyShadows: function() {
                q(this.shadows || [], function(a) { this.safeRemoveChild(a) }, this);
                this.shadows = void 0
            },
            xGetter: function(a) { "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy")); return this._defaultGetter(a) },
            _defaultGetter: function(a) { a = H(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0); /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a)); return a },
            dSetter: function(a, b, c) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[b] !== a && (c.setAttribute(b,
                    a), this[b] = a)
            },
            dashstyleSetter: function(a) {
                var b, c = this["stroke-width"];
                "inherit" === c && (c = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (b = a.length; b--;) a[b] = r(a[b]) * c;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function(a) {
                this.alignValue =
                    a;
                this.element.setAttribute("text-anchor", { left: "start", center: "middle", right: "end" }[a])
            },
            opacitySetter: function(a, b, c) {
                this[b] = a;
                c.setAttribute(b, a)
            },
            titleSetter: function(a) {
                var b = this.element.getElementsByTagName("title")[0];
                b || (b = h.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
                b.firstChild && b.removeChild(b.firstChild);
                b.appendChild(h.createTextNode(String(H(a), "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            },
            textSetter: function(a) {
                a !== this.textStr &&
                    (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function(a, b, c) { "string" === typeof a ? c.setAttribute(b, a) : a && this.complexColor(a, b, c) },
            visibilitySetter: function(a, b, c) {
                "inherit" === a ? c.removeAttribute(b) : this[b] !== a && c.setAttribute(b, a);
                this[b] = a
            },
            zIndexSetter: function(a, b) {
                var c = this.renderer,
                    e = this.parentGroup,
                    z = (e || c).element || c.box,
                    p, m = this.element,
                    f, L, c = z === c.box;
                p = this.added;
                var E;
                k(a) ? (m.setAttribute("data-z-index", a), a = +a, this[b] === a && (p = !1)) : k(this[b]) &&
                    m.removeAttribute("data-z-index");
                this[b] = a;
                if (p) {
                    (a = this.zIndex) && e && (e.handleZ = !0);
                    b = z.childNodes;
                    for (E = b.length - 1; 0 <= E && !f; E--)
                        if (e = b[E], p = e.getAttribute("data-z-index"), L = !k(p), e !== m)
                            if (0 > a && L && !c && !E) z.insertBefore(m, b[E]), f = !0;
                            else if (r(p) <= a || L && (!k(a) || 0 <= a)) z.insertBefore(m, b[E + 1] || null), f = !0;
                    f || (z.insertBefore(m, b[c ? 3 : 0] || null), f = !0)
                }
                return f
            },
            _defaultSetter: function(a, b, c) { c.setAttribute(b, a) }
        });
        A.prototype.yGetter = A.prototype.xGetter;
        A.prototype.translateXSetter = A.prototype.translateYSetter =
            A.prototype.rotationSetter = A.prototype.verticalAlignSetter = A.prototype.rotationOriginXSetter = A.prototype.rotationOriginYSetter = A.prototype.scaleXSetter = A.prototype.scaleYSetter = A.prototype.matrixSetter = function(a, b) {
                this[b] = a;
                this.doTransform = !0
            };
        A.prototype["stroke-widthSetter"] = A.prototype.strokeSetter = function(a, b, c) {
            this[b] = a;
            this.stroke && this["stroke-width"] ? (A.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" ===
                b && 0 === a && this.hasStroke && (c.removeAttribute("stroke"), this.hasStroke = !1)
        };
        y = a.SVGRenderer = function() { this.init.apply(this, arguments) };
        e(y.prototype, {
            Element: A,
            SVG_NS: L,
            init: function(a, b, c, e, r, z) {
                var m;
                e = this.createElement("svg").attr({ version: "1.1", "class": "highcharts-root" }).css(this.getStyle(e));
                m = e.element;
                a.appendChild(m);
                d(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") && d(m, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = m;
                this.boxWrapper = e;
                this.alignedObjects = [];
                this.url = (x || p) && h.getElementsByTagName("base").length ?
                    O.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(h.createTextNode("Created with Highmaps 6.1.1"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = z;
                this.forExport = r;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, c, !1);
                var f;
                x && a.getBoundingClientRect && (b = function() {
                    u(a, { left: 0, top: 0 });
                    f = a.getBoundingClientRect();
                    u(a, {
                        left: Math.ceil(f.left) -
                            f.left + "px",
                        top: Math.ceil(f.top) - f.top + "px"
                    })
                }, b(), this.unSubPixelFix = C(O, "resize", b))
            },
            getStyle: function(a) { return this.style = e({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px" }, a) },
            setStyle: function(a) { this.boxWrapper.css(this.getStyle(a)) },
            isHidden: function() { return !this.boxWrapper.getBBox().width },
            destroy: function() {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                f(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function(a) {
                var b = new this.Element;
                b.init(this, a);
                return b
            },
            draw: D,
            getRadialAttr: function(a, b) { return { cx: a[0] - a[2] / 2 + b.cx * a[2], cy: a[1] - a[2] / 2 + b.cy * a[2], r: b.r * a[2] } },
            getSpanWidth: function(a) { return a.getBBox(!0).width },
            applyEllipsis: function(a, b, c, e) {
                var r = a.rotation,
                    z = c,
                    p, m = 0,
                    f = c.length,
                    L = function(a) {
                        b.removeChild(b.firstChild);
                        a && b.appendChild(h.createTextNode(a))
                    },
                    g;
                a.rotation = 0;
                z = this.getSpanWidth(a, b);
                if (g =
                    z > e) {
                    for (; m <= f;) p = Math.ceil((m + f) / 2), z = c.substring(0, p) + "\u2026", L(z), z = this.getSpanWidth(a, b), m === f ? m = f + 1 : z > e ? f = p - 1 : m = p;
                    0 === f && L("")
                }
                a.rotation = r;
                return g
            },
            escapes: { "\x26": "\x26amp;", "\x3c": "\x26lt;", "\x3e": "\x26gt;", "'": "\x26#39;", '"': "\x26quot;" },
            buildText: function(a) {
                var b = a.element,
                    e = this,
                    z = e.forExport,
                    p = H(a.textStr, "").toString(),
                    m = -1 !== p.indexOf("\x3c"),
                    f = b.childNodes,
                    g, k = d(b, "x"),
                    E = a.styles,
                    D = a.textWidth,
                    w = E && E.lineHeight,
                    G = E && E.textOutline,
                    x = E && "ellipsis" === E.textOverflow,
                    N = E && "nowrap" ===
                    E.whiteSpace,
                    l = E && E.fontSize,
                    I, t, P = f.length,
                    E = D && !a.added && this.box,
                    F = function(a) {
                        var c;
                        c = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : l || e.style.fontSize || 12;
                        return w ? r(w) : e.fontMetrics(c, a.getAttribute("style") ? a : b).h
                    },
                    n = function(a, b) { J(e.escapes, function(c, e) { b && -1 !== B(c, b) || (a = a.toString().replace(new RegExp(c, "g"), e)) }); return a },
                    O = function(a, b) {
                        var c;
                        c = a.indexOf("\x3c");
                        a = a.substring(c, a.indexOf("\x3e") - c);
                        c = a.indexOf(b + "\x3d");
                        if (-1 !== c && (c = c + b.length + 1, b = a.charAt(c), '"' === b || "'" ===
                                b)) return a = a.substring(c + 1), a.substring(0, a.indexOf(b))
                    };
                I = [p, x, N, w, G, l, D].join();
                if (I !== a.textCache) {
                    for (a.textCache = I; P--;) b.removeChild(f[P]);
                    m || G || x || D || -1 !== p.indexOf(" ") ? (E && E.appendChild(b), p = m ? p.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [p], p = c(p, function(a) { return "" !== a }), q(p, function(c, r) {
                        var p, m = 0;
                        c = c.replace(/^\s+|\s+$/g,
                            "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                        p = c.split("|||");
                        q(p, function(c) {
                            if ("" !== c || 1 === p.length) {
                                var f = {},
                                    E = h.createElementNS(e.SVG_NS, "tspan"),
                                    q, B;
                                (q = O(c, "class")) && d(E, "class", q);
                                if (q = O(c, "style")) q = q.replace(/(;| |^)color([ :])/, "$1fill$2"), d(E, "style", q);
                                (B = O(c, "href")) && !z && (d(E, "onclick", 'location.href\x3d"' + B + '"'), d(E, "class", "highcharts-anchor"), u(E, { cursor: "pointer" }));
                                c = n(c.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                if (" " !== c) {
                                    E.appendChild(h.createTextNode(c));
                                    m ? f.dx = 0 : r && null !== k && (f.x = k);
                                    d(E, f);
                                    b.appendChild(E);
                                    !m && t && (!S && z && u(E, { display: "block" }), d(E, "dy", F(E)));
                                    if (D) {
                                        f = c.replace(/([^\^])-/g, "$1- ").split(" ");
                                        B = 1 < p.length || r || 1 < f.length && !N;
                                        var w = [],
                                            G, l = F(E),
                                            I = a.rotation;
                                        for (x && (g = e.applyEllipsis(a, E, c, D)); !x && B && (f.length || w.length);) a.rotation = 0, G = e.getSpanWidth(a, E), c = G > D, void 0 === g && (g = c), c && 1 !== f.length ? (E.removeChild(E.firstChild), w.unshift(f.pop())) : (f = w, w = [], f.length && !N && (E = h.createElementNS(L, "tspan"), d(E, { dy: l, x: k }), q && d(E, "style", q), b.appendChild(E)),
                                            G > D && (D = G + 1)), f.length && E.appendChild(h.createTextNode(f.join(" ").replace(/- /g, "-")));
                                        a.rotation = I
                                    }
                                    m++
                                }
                            }
                        });
                        t = t || b.childNodes.length
                    }), x && g && a.attr("title", n(a.textStr, ["\x26lt;", "\x26gt;"])), E && E.removeChild(b), G && a.applyTextOutline && a.applyTextOutline(G)) : b.appendChild(h.createTextNode(n(p)))
                }
            },
            getContrast: function(a) { a = v(a).rgba; return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF" },
            button: function(a, b, c, r, z, p, m, f, L) {
                var g = this.label(a, b, c, L, null, null, null, null, "button"),
                    E = 0;
                g.attr(G({ padding: 8, r: 2 },
                    z));
                var k, q, D, B;
                z = G({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontWeight: "normal" } }, z);
                k = z.style;
                delete z.style;
                p = G(z, { fill: "#e6e6e6" }, p);
                q = p.style;
                delete p.style;
                m = G(z, { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "bold" } }, m);
                D = m.style;
                delete m.style;
                f = G(z, { style: { color: "#cccccc" } }, f);
                B = f.style;
                delete f.style;
                C(g.element, M ? "mouseover" : "mouseenter", function() { 3 !== E && g.setState(1) });
                C(g.element, M ? "mouseout" : "mouseleave", function() { 3 !== E && g.setState(E) });
                g.setState = function(a) {
                    1 !== a && (g.state = E = a);
                    g.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    g.attr([z, p, m, f][a || 0]).css([k, q, D, B][a || 0])
                };
                g.attr(z).css(e({ cursor: "default" }, k));
                return g.on("click", function(a) { 3 !== E && r.call(g, a) })
            },
            crispLine: function(a, b) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2);
                return a
            },
            path: function(a) {
                var b = { fill: "none" };
                I(a) ? b.d =
                    a : w(a) && e(b, a);
                return this.createElement("path").attr(b)
            },
            circle: function(a, b, c) {
                a = w(a) ? a : { x: a, y: b, r: c };
                b = this.createElement("circle");
                b.xSetter = b.ySetter = function(a, b, c) { c.setAttribute("c" + b, a) };
                return b.attr(a)
            },
            arc: function(a, b, c, e, r, z) {
                w(a) ? (e = a, b = e.y, c = e.r, a = e.x) : e = { innerR: e, start: r, end: z };
                a = this.symbol("arc", a, b, c, c, e);
                a.r = c;
                return a
            },
            rect: function(a, b, c, e, r, z) {
                r = w(a) ? a.r : r;
                var p = this.createElement("rect");
                a = w(a) ? a : void 0 === a ? {} : { x: a, y: b, width: Math.max(c, 0), height: Math.max(e, 0) };
                void 0 !== z &&
                    (a.strokeWidth = z, a = p.crisp(a));
                a.fill = "none";
                r && (a.r = r);
                p.rSetter = function(a, b, c) { d(c, { rx: a, ry: a }) };
                return p.attr(a)
            },
            setSize: function(a, b, c) {
                var e = this.alignedObjects,
                    r = e.length;
                this.width = a;
                this.height = b;
                for (this.boxWrapper.animate({ width: a, height: b }, { step: function() { this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") }) }, duration: H(c, !0) ? void 0 : 0 }); r--;) e[r].align()
            },
            g: function(a) { var b = this.createElement("g"); return a ? b.attr({ "class": "highcharts-" + a }) : b },
            image: function(a, b, c, r,
                z, p) {
                var m = { preserveAspectRatio: "none" },
                    f, L = function(a, b) { a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", b) : a.setAttribute("hc-svg-href", b) },
                    g = function(b) {
                        L(f.element, a);
                        p.call(f, b)
                    };
                1 < arguments.length && e(m, { x: b, y: c, width: r, height: z });
                f = this.createElement("image").attr(m);
                p ? (L(f.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"), m = new O.Image, C(m, "load", g), m.src = a, m.complete && g({})) : L(f.element, a);
                return f
            },
            symbol: function(a, b, c, r,
                z, p) {
                var m = this,
                    f, L = /^url\((.*?)\)$/,
                    g = L.test(a),
                    D = !g && (this.symbols[a] ? a : "circle"),
                    B = D && this.symbols[D],
                    d = k(b) && B && B.call(this.symbols, Math.round(b), Math.round(c), r, z, p),
                    w, E;
                B ? (f = this.path(d), f.attr("fill", "none"), e(f, { symbolName: D, x: b, y: c, width: r, height: z }), p && e(f, p)) : g && (w = a.match(L)[1], f = this.image(w), f.imgwidth = H(P[w] && P[w].width, p && p.width), f.imgheight = H(P[w] && P[w].height, p && p.height), E = function() { f.attr({ width: f.width, height: f.height }) }, q(["width", "height"], function(a) {
                    f[a + "Setter"] = function(a,
                        b) {
                        var c = {},
                            e = this["img" + b],
                            r = "width" === b ? "translateX" : "translateY";
                        this[b] = a;
                        k(e) && (this.element && this.element.setAttribute(b, e), this.alignByTranslate || (c[r] = ((this[b] || 0) - e) / 2, this.attr(c)))
                    }
                }), k(b) && f.attr({ x: b, y: c }), f.isImg = !0, k(f.imgwidth) && k(f.imgheight) ? E() : (f.attr({ width: 0, height: 0 }), t("img", {
                    onload: function() {
                        var a = l[m.chartIndex];
                        0 === this.width && (u(this, { position: "absolute", top: "-999em" }), h.body.appendChild(this));
                        P[w] = { width: this.width, height: this.height };
                        f.imgwidth = this.width;
                        f.imgheight =
                            this.height;
                        f.element && E();
                        this.parentNode && this.parentNode.removeChild(this);
                        m.imgCount--;
                        if (!m.imgCount && a && a.onload) a.onload()
                    },
                    src: w
                }), this.imgCount++));
                return f
            },
            symbols: {
                circle: function(a, b, c, e) { return this.arc(a + c / 2, b + e / 2, c / 2, e / 2, { start: 0, end: 2 * Math.PI, open: !1 }) },
                square: function(a, b, c, e) { return ["M", a, b, "L", a + c, b, a + c, b + e, a, b + e, "Z"] },
                triangle: function(a, b, c, e) { return ["M", a + c / 2, b, "L", a + c, b + e, a, b + e, "Z"] },
                "triangle-down": function(a, b, c, e) { return ["M", a, b, "L", a + c, b, a + c / 2, b + e, "Z"] },
                diamond: function(a,
                    b, c, e) { return ["M", a + c / 2, b, "L", a + c, b + e / 2, a + c / 2, b + e, a, b + e / 2, "Z"] },
                arc: function(a, b, c, e, r) {
                    var z = r.start,
                        p = r.r || c,
                        f = r.r || e || c,
                        m = r.end - .001;
                    c = r.innerR;
                    e = H(r.open, .001 > Math.abs(r.end - r.start - 2 * Math.PI));
                    var L = Math.cos(z),
                        g = Math.sin(z),
                        q = Math.cos(m),
                        m = Math.sin(m);
                    r = .001 > r.end - z - Math.PI ? 0 : 1;
                    p = ["M", a + p * L, b + f * g, "A", p, f, 0, r, 1, a + p * q, b + f * m];
                    k(c) && p.push(e ? "M" : "L", a + c * q, b + c * m, "A", c, c, 0, r, 0, a + c * L, b + c * g);
                    p.push(e ? "" : "Z");
                    return p
                },
                callout: function(a, b, c, e, r) {
                    var z = Math.min(r && r.r || 0, c, e),
                        p = z + 6,
                        f = r && r.anchorX;
                    r =
                        r && r.anchorY;
                    var m;
                    m = ["M", a + z, b, "L", a + c - z, b, "C", a + c, b, a + c, b, a + c, b + z, "L", a + c, b + e - z, "C", a + c, b + e, a + c, b + e, a + c - z, b + e, "L", a + z, b + e, "C", a, b + e, a, b + e, a, b + e - z, "L", a, b + z, "C", a, b, a, b, a + z, b];
                    f && f > c ? r > b + p && r < b + e - p ? m.splice(13, 3, "L", a + c, r - 6, a + c + 6, r, a + c, r + 6, a + c, b + e - z) : m.splice(13, 3, "L", a + c, e / 2, f, r, a + c, e / 2, a + c, b + e - z) : f && 0 > f ? r > b + p && r < b + e - p ? m.splice(33, 3, "L", a, r + 6, a - 6, r, a, r - 6, a, b + z) : m.splice(33, 3, "L", a, e / 2, f, r, a, e / 2, a, b + z) : r && r > e && f > a + p && f < a + c - p ? m.splice(23, 3, "L", f + 6, b + e, f, b + e + 6, f - 6, b + e, a + z, b + e) : r && 0 > r && f > a + p && f < a + c -
                        p && m.splice(3, 3, "L", f - 6, b, f, b - 6, f + 6, b, c - z, b);
                    return m
                }
            },
            clipRect: function(b, c, e, r) {
                var z = a.uniqueKey(),
                    p = this.createElement("clipPath").attr({ id: z }).add(this.defs);
                b = this.rect(b, c, e, r, 0).add(p);
                b.id = z;
                b.clipPath = p;
                b.count = 0;
                return b
            },
            text: function(a, b, c, e) {
                var r = {};
                if (e && (this.allowHTML || !this.forExport)) return this.html(a, b, c);
                r.x = Math.round(b || 0);
                c && (r.y = Math.round(c));
                if (a || 0 === a) r.text = a;
                a = this.createElement("text").attr(r);
                e || (a.xSetter = function(a, b, c) {
                    var e = c.getElementsByTagName("tspan"),
                        r,
                        z = c.getAttribute(b),
                        p;
                    for (p = 0; p < e.length; p++) r = e[p], r.getAttribute(b) === z && r.setAttribute(b, a);
                    c.setAttribute(b, a)
                });
                return a
            },
            fontMetrics: function(a, b) {
                a = a || b && b.style && b.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? r(a) : /em/.test(a) ? parseFloat(a) * (b ? this.fontMetrics(null, b.parentNode).f : 16) : 12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return { h: b, b: Math.round(.8 * b), f: a }
            },
            rotCorr: function(a, b, c) {
                var e = a;
                b && c && (e = Math.max(e * Math.cos(b * g), 4));
                return { x: -a / 3 * Math.sin(b * g), y: e }
            },
            label: function(b,
                c, r, p, f, m, L, g, D) {
                var B = this,
                    h = B.g("button" !== D && "label"),
                    w = h.text = B.text("", 0, 0, L).attr({ zIndex: 1 }),
                    d, x, S = 0,
                    N = 3,
                    l = 0,
                    I, H, t, P, E, F = {},
                    n, O, J = /^url\((.*?)\)$/.test(p),
                    M = J,
                    u, v, Q, U;
                D && h.addClass("highcharts-" + D);
                M = J;
                u = function() { return (n || 0) % 2 / 2 };
                v = function() {
                    var a = w.element.style,
                        b = {};
                    x = (void 0 === I || void 0 === H || E) && k(w.textStr) && w.getBBox();
                    h.width = (I || x.width || 0) + 2 * N + l;
                    h.height = (H || x.height || 0) + 2 * N;
                    O = N + B.fontMetrics(a && a.fontSize, w).b;
                    M && (d || (h.box = d = B.symbols[p] || J ? B.symbol(p) : B.rect(), d.addClass(("button" ===
                        D ? "" : "highcharts-label-box") + (D ? " highcharts-" + D + "-box" : "")), d.add(h), a = u(), b.x = a, b.y = (g ? -O : 0) + a), b.width = Math.round(h.width), b.height = Math.round(h.height), d.attr(e(b, F)), F = {})
                };
                Q = function() {
                    var a = l + N,
                        b;
                    b = g ? 0 : O;
                    k(I) && x && ("center" === E || "right" === E) && (a += { center: .5, right: 1 }[E] * (I - x.width));
                    if (a !== w.x || b !== w.y) w.attr("x", a), w.hasBoxWidthChanged && (x = w.getBBox(!0), v()), void 0 !== b && w.attr("y", b);
                    w.x = a;
                    w.y = b
                };
                U = function(a, b) { d ? d.attr(a, b) : F[a] = b };
                h.onAdd = function() {
                    w.add(h);
                    h.attr({
                        text: b || 0 === b ? b : "",
                        x: c,
                        y: r
                    });
                    d && k(f) && h.attr({ anchorX: f, anchorY: m })
                };
                h.widthSetter = function(b) { I = a.isNumber(b) ? b : null };
                h.heightSetter = function(a) { H = a };
                h["text-alignSetter"] = function(a) { E = a };
                h.paddingSetter = function(a) { k(a) && a !== N && (N = h.padding = a, Q()) };
                h.paddingLeftSetter = function(a) { k(a) && a !== l && (l = a, Q()) };
                h.alignSetter = function(a) {
                    a = { left: 0, center: .5, right: 1 }[a];
                    a !== S && (S = a, x && h.attr({ x: t }))
                };
                h.textSetter = function(a) {
                    void 0 !== a && w.textSetter(a);
                    v();
                    Q()
                };
                h["stroke-widthSetter"] = function(a, b) {
                    a && (M = !0);
                    n = this["stroke-width"] =
                        a;
                    U(b, a)
                };
                h.strokeSetter = h.fillSetter = h.rSetter = function(a, b) {
                    "r" !== b && ("fill" === b && a && (M = !0), h[b] = a);
                    U(b, a)
                };
                h.anchorXSetter = function(a, b) {
                    f = h.anchorX = a;
                    U(b, Math.round(a) - u() - t)
                };
                h.anchorYSetter = function(a, b) {
                    m = h.anchorY = a;
                    U(b, a - P)
                };
                h.xSetter = function(a) {
                    h.x = a;
                    S && (a -= S * ((I || x.width) + 2 * N), h["forceAnimate:x"] = !0);
                    t = Math.round(a);
                    h.attr("translateX", t)
                };
                h.ySetter = function(a) {
                    P = h.y = Math.round(a);
                    h.attr("translateY", P)
                };
                var R = h.css;
                return e(h, {
                    css: function(a) {
                        if (a) {
                            var b = {};
                            a = G(a);
                            q(h.textProps, function(c) {
                                void 0 !==
                                    a[c] && (b[c] = a[c], delete a[c])
                            });
                            w.css(b);
                            "width" in b && v()
                        }
                        return R.call(h, a)
                    },
                    getBBox: function() { return { width: x.width + 2 * N, height: x.height + 2 * N, x: x.x - N, y: x.y - N } },
                    shadow: function(a) { a && (v(), d && d.shadow(a)); return h },
                    destroy: function() {
                        z(h.element, "mouseenter");
                        z(h.element, "mouseleave");
                        w && (w = w.destroy());
                        d && (d = d.destroy());
                        A.prototype.destroy.call(h);
                        h = B = v = Q = U = null
                    }
                })
            }
        });
        a.Renderer = y
    })(K);
    (function(a) {
        var A = a.attr,
            y = a.createElement,
            C = a.css,
            n = a.defined,
            d = a.each,
            l = a.extend,
            v = a.isFirefox,
            u = a.isMS,
            t = a.isWebKit,
            k = a.pick,
            g = a.pInt,
            f = a.SVGRenderer,
            h = a.win,
            q = a.wrap;
        l(a.SVGElement.prototype, {
            htmlCss: function(a) {
                var b = this.element;
                if (b = a && "SPAN" === b.tagName && a.width) delete a.width, this.textWidth = b, this.htmlUpdateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = l(this.styles, a);
                C(this.element, a);
                return this
            },
            htmlGetBBox: function() { var a = this.element; return { x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight } },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var a =
                        this.renderer,
                        b = this.element,
                        c = this.translateX || 0,
                        f = this.translateY || 0,
                        h = this.x || 0,
                        k = this.y || 0,
                        q = this.textAlign || "left",
                        l = { left: 0, center: .5, right: 1 }[q],
                        w = this.styles,
                        t = w && w.whiteSpace;
                    C(b, { marginLeft: c, marginTop: f });
                    this.shadows && d(this.shadows, function(a) { C(a, { marginLeft: c + 1, marginTop: f + 1 }) });
                    this.inverted && d(b.childNodes, function(c) { a.invertChild(c, b) });
                    if ("SPAN" === b.tagName) {
                        var w = this.rotation,
                            p = this.textWidth && g(this.textWidth),
                            G = [w, q, b.innerHTML, this.textWidth, this.textAlign].join(),
                            D;
                        (D = p !==
                            this.oldTextWidth) && !(D = p > this.oldTextWidth) && ((D = this.textPxLength) || (C(b, { width: "", whiteSpace: t || "nowrap" }), D = b.offsetWidth), D = D > p);
                        D && /[ \-]/.test(b.textContent || b.innerText) ? (C(b, { width: p + "px", display: "block", whiteSpace: t || "normal" }), this.oldTextWidth = p, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                        G !== this.cTT && (t = a.fontMetrics(b.style.fontSize).b, n(w) && w !== (this.oldRotation || 0) && this.setSpanRotation(w, l, t), this.getSpanCorrection(!n(w) && this.textPxLength || b.offsetWidth, t, l, w, q));
                        C(b, { left: h + (this.xCorr || 0) + "px", top: k + (this.yCorr || 0) + "px" });
                        this.cTT = G;
                        this.oldRotation = w
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(a, b, c) {
                var e = {},
                    f = this.renderer.getTransformKey();
                e[f] = e.transform = "rotate(" + a + "deg)";
                e[f + (v ? "Origin" : "-origin")] = e.transformOrigin = 100 * b + "% " + c + "px";
                C(this.element, e)
            },
            getSpanCorrection: function(a, b, c) {
                this.xCorr = -a * c;
                this.yCorr = -b
            }
        });
        l(f.prototype, {
            getTransformKey: function() {
                return u && !/Edge/.test(h.navigator.userAgent) ? "-ms-transform" : t ? "-webkit-transform" :
                    v ? "MozTransform" : h.opera ? "-o-transform" : ""
            },
            html: function(a, b, c) {
                var e = this.createElement("span"),
                    f = e.element,
                    g = e.renderer,
                    h = g.isSVG,
                    t = function(a, b) {
                        d(["opacity", "visibility"], function(c) {
                            q(a, c + "Setter", function(a, c, e, p) {
                                a.call(this, c, e, p);
                                b[e] = c
                            })
                        });
                        a.addedSetters = !0
                    };
                e.textSetter = function(a) {
                    a !== f.innerHTML && delete this.bBox;
                    this.textStr = a;
                    f.innerHTML = k(a, "");
                    e.doTransform = !0
                };
                h && t(e, e.element.style);
                e.xSetter = e.ySetter = e.alignSetter = e.rotationSetter = function(a, b) {
                    "align" === b && (b = "textAlign");
                    e[b] =
                        a;
                    e.doTransform = !0
                };
                e.afterSetters = function() { this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1) };
                e.attr({ text: a, x: Math.round(b), y: Math.round(c) }).css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize, position: "absolute" });
                f.style.whiteSpace = "nowrap";
                e.css = e.htmlCss;
                h && (e.add = function(a) {
                    var b, c = g.box.parentNode,
                        m = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;) m.push(a), a = a.parentGroup;
                            d(m.reverse(), function(a) {
                                function p(b, c) {
                                    a[c] = b;
                                    "translateX" === c ? f.left = b + "px" : f.top =
                                        b + "px";
                                    a.doTransform = !0
                                }
                                var f, r = A(a.element, "class");
                                r && (r = { className: r });
                                b = a.div = a.div || y("div", r, { position: "absolute", left: (a.translateX || 0) + "px", top: (a.translateY || 0) + "px", display: a.display, opacity: a.opacity, pointerEvents: a.styles && a.styles.pointerEvents }, b || c);
                                f = b.style;
                                l(a, {
                                    classSetter: function(a) {
                                        return function(b) {
                                            this.element.setAttribute("class", b);
                                            a.className = b
                                        }
                                    }(b),
                                    on: function() { m[0].div && e.on.apply({ element: m[0].div }, arguments); return a },
                                    translateXSetter: p,
                                    translateYSetter: p
                                });
                                a.addedSetters ||
                                    t(a, f)
                            })
                        }
                    } else b = c;
                    b.appendChild(f);
                    e.added = !0;
                    e.alignOnAdd && e.htmlUpdateTransform();
                    return e
                });
                return e
            }
        })
    })(K);
    (function(a) {
        var A = a.correctFloat,
            y = a.defined,
            C = a.destroyObjectProperties,
            n = a.fireEvent,
            d = a.isNumber,
            l = a.merge,
            v = a.pick,
            u = a.deg2rad;
        a.Tick = function(a, k, g, f) {
            this.axis = a;
            this.pos = k;
            this.type = g || "";
            this.isNewLabel = this.isNew = !0;
            g || f || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function() {
                var a = this.axis,
                    k = a.options,
                    g = a.chart,
                    f = a.categories,
                    h = a.names,
                    q = this.pos,
                    e = k.labels,
                    b = a.tickPositions,
                    c = q === b[0],
                    m = q === b[b.length - 1],
                    h = f ? v(f[q], h[q], q) : q,
                    f = this.label,
                    b = b.info,
                    B;
                a.isDatetimeAxis && b && (B = k.dateTimeLabelFormats[b.higherRanks[q] || b.unitName]);
                this.isFirst = c;
                this.isLast = m;
                k = a.labelFormatter.call({ axis: a, chart: g, isFirst: c, isLast: m, dateTimeLabelFormat: B, value: a.isLog ? A(a.lin2log(h)) : h, pos: q });
                if (y(f)) f && f.attr({ text: k });
                else {
                    if (this.label = f = y(k) && e.enabled ? g.renderer.text(k, 0, 0, e.useHTML).css(l(e.style)).add(a.labelGroup) : null) f.textPxLength = f.getBBox().width;
                    this.rotation = 0
                }
            },
            getLabelSize: function() {
                return this.label ?
                    this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function(a) {
                var k = this.axis,
                    g = k.options.labels,
                    f = a.x,
                    h = k.chart.chartWidth,
                    q = k.chart.spacing,
                    e = v(k.labelLeft, Math.min(k.pos, q[3])),
                    q = v(k.labelRight, Math.max(k.isRadial ? 0 : k.pos + k.len, h - q[1])),
                    b = this.label,
                    c = this.rotation,
                    m = { left: 0, center: .5, right: 1 }[k.labelAlign || b.attr("align")],
                    B = b.getBBox().width,
                    d = k.getSlotWidth(this),
                    x = d,
                    l = 1,
                    w, t = {};
                if (c || !1 === g.overflow) 0 > c && f - m * B < e ? w = Math.round(f / Math.cos(c * u) - e) : 0 < c && f + m * B > q && (w = Math.round((h -
                    f) / Math.cos(c * u)));
                else if (h = f + (1 - m) * B, f - m * B < e ? x = a.x + x * (1 - m) - e : h > q && (x = q - a.x + x * m, l = -1), x = Math.min(d, x), x < d && "center" === k.labelAlign && (a.x += l * (d - x - m * (d - Math.min(B, x)))), B > x || k.autoRotation && (b.styles || {}).width) w = x;
                w && (t.width = w, (g.style || {}).textOverflow || (t.textOverflow = "ellipsis"), b.css(t))
            },
            getPosition: function(d, k, g, f) {
                var h = this.axis,
                    q = h.chart,
                    e = f && q.oldChartHeight || q.chartHeight;
                d = {
                    x: d ? a.correctFloat(h.translate(k + g, null, null, f) + h.transB) : h.left + h.offset + (h.opposite ? (f && q.oldChartWidth || q.chartWidth) -
                        h.right - h.left : 0),
                    y: d ? e - h.bottom + h.offset - (h.opposite ? h.height : 0) : a.correctFloat(e - h.translate(k + g, null, null, f) - h.transB)
                };
                n(this, "afterGetPosition", { pos: d });
                return d
            },
            getLabelPosition: function(a, k, g, f, h, q, e, b) {
                var c = this.axis,
                    m = c.transA,
                    d = c.reversed,
                    l = c.staggerLines,
                    x = c.tickRotCorr || { x: 0, y: 0 },
                    t = h.y,
                    w = f || c.reserveSpaceDefault ? 0 : -c.labelOffset * ("center" === c.labelAlign ? .5 : 1),
                    F = {};
                y(t) || (t = 0 === c.side ? g.rotation ? -8 : -g.getBBox().height : 2 === c.side ? x.y + 8 : Math.cos(g.rotation * u) * (x.y - g.getBBox(!1, 0).height /
                    2));
                a = a + h.x + w + x.x - (q && f ? q * m * (d ? -1 : 1) : 0);
                k = k + t - (q && !f ? q * m * (d ? 1 : -1) : 0);
                l && (g = e / (b || 1) % l, c.opposite && (g = l - g - 1), k += c.labelOffset / l * g);
                F.x = a;
                F.y = Math.round(k);
                n(this, "afterGetLabelPosition", { pos: F });
                return F
            },
            getMarkPath: function(a, k, g, f, h, q) { return q.crispLine(["M", a, k, "L", a + (h ? 0 : -g), k + (h ? g : 0)], f) },
            renderGridLine: function(a, k, g) {
                var f = this.axis,
                    h = f.options,
                    q = this.gridLine,
                    e = {},
                    b = this.pos,
                    c = this.type,
                    m = f.tickmarkOffset,
                    d = f.chart.renderer,
                    l = c ? c + "Grid" : "grid",
                    x = h[l + "LineWidth"],
                    t = h[l + "LineColor"],
                    h = h[l +
                        "LineDashStyle"];
                q || (e.stroke = t, e["stroke-width"] = x, h && (e.dashstyle = h), c || (e.zIndex = 1), a && (e.opacity = 0), this.gridLine = q = d.path().attr(e).addClass("highcharts-" + (c ? c + "-" : "") + "grid-line").add(f.gridGroup));
                if (!a && q && (a = f.getPlotLinePath(b + m, q.strokeWidth() * g, a, !0))) q[this.isNew ? "attr" : "animate"]({ d: a, opacity: k })
            },
            renderMark: function(a, k, g) {
                var f = this.axis,
                    h = f.options,
                    q = f.chart.renderer,
                    e = this.type,
                    b = e ? e + "Tick" : "tick",
                    c = f.tickSize(b),
                    m = this.mark,
                    d = !m,
                    l = a.x;
                a = a.y;
                var x = v(h[b + "Width"], !e && f.isXAxis ? 1 :
                        0),
                    h = h[b + "Color"];
                c && (f.opposite && (c[0] = -c[0]), d && (this.mark = m = q.path().addClass("highcharts-" + (e ? e + "-" : "") + "tick").add(f.axisGroup), m.attr({ stroke: h, "stroke-width": x })), m[d ? "attr" : "animate"]({ d: this.getMarkPath(l, a, c[0], m.strokeWidth() * g, f.horiz, q), opacity: k }))
            },
            renderLabel: function(a, k, g, f) {
                var h = this.axis,
                    q = h.horiz,
                    e = h.options,
                    b = this.label,
                    c = e.labels,
                    m = c.step,
                    h = h.tickmarkOffset,
                    B = !0,
                    l = a.x;
                a = a.y;
                b && d(l) && (b.xy = a = this.getLabelPosition(l, a, b, q, c, h, f, m), this.isFirst && !this.isLast && !v(e.showFirstLabel,
                    1) || this.isLast && !this.isFirst && !v(e.showLastLabel, 1) ? B = !1 : !q || c.step || c.rotation || k || 0 === g || this.handleOverflow(a), m && f % m && (B = !1), B && d(a.y) ? (a.opacity = g, b[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (b.attr("y", -9999), this.isNewLabel = !0))
            },
            render: function(d, k, g) {
                var f = this.axis,
                    h = f.horiz,
                    q = this.getPosition(h, this.pos, f.tickmarkOffset, k),
                    e = q.x,
                    b = q.y,
                    f = h && e === f.pos + f.len || !h && b === f.pos ? -1 : 1;
                g = v(g, 1);
                this.isActive = !0;
                this.renderGridLine(k, g, f);
                this.renderMark(q, g, f);
                this.renderLabel(q,
                    k, g, d);
                this.isNew = !1;
                a.fireEvent(this, "afterRender")
            },
            destroy: function() { C(this, this.axis) }
        }
    })(K);
    var W = function(a) {
        var A = a.addEvent,
            y = a.animObject,
            C = a.arrayMax,
            n = a.arrayMin,
            d = a.color,
            l = a.correctFloat,
            v = a.defaultOptions,
            u = a.defined,
            t = a.deg2rad,
            k = a.destroyObjectProperties,
            g = a.each,
            f = a.extend,
            h = a.fireEvent,
            q = a.format,
            e = a.getMagnitude,
            b = a.grep,
            c = a.inArray,
            m = a.isArray,
            B = a.isNumber,
            I = a.isString,
            x = a.merge,
            M = a.normalizeTickInterval,
            w = a.objectEach,
            F = a.pick,
            p = a.removeEvent,
            G = a.splat,
            D = a.syncTimeout,
            J = a.Tick,
            H = function() { this.init.apply(this, arguments) };
        a.extend(H.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: { millisecond: "%H:%M:%S.%L", second: "%H:%M:%S", minute: "%H:%M", hour: "%H:%M", day: "%e. %b", week: "%e. %b", month: "%b '%y", year: "%Y" },
                endOnTick: !1,
                labels: { enabled: !0, style: { color: "#666666", cursor: "default", fontSize: "11px" }, x: 0 },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: { align: "middle", style: { color: "#666666" } },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: { x: -8 },
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: { rotation: 270, text: "Values" },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    formatter: function() { return a.numberFormat(this.total, -1) },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "#000000",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: { labels: { x: -15 }, title: { rotation: 270 } },
            defaultRightAxisOptions: { labels: { x: 15 }, title: { rotation: 90 } },
            defaultBottomAxisOptions: { labels: { autoRotation: [-45], x: 0 }, title: { rotation: 0 } },
            defaultTopAxisOptions: { labels: { autoRotation: [-45], x: 0 }, title: { rotation: 0 } },
            init: function(a, b) {
                var e = b.isX,
                    r = this;
                r.chart = a;
                r.horiz = a.inverted && !r.isZAxis ? !e : e;
                r.isXAxis = e;
                r.coll = r.coll || (e ? "xAxis" : "yAxis");
                h(this,
                    "init", { userOptions: b });
                r.opposite = b.opposite;
                r.side = b.side || (r.horiz ? r.opposite ? 0 : 2 : r.opposite ? 1 : 3);
                r.setOptions(b);
                var z = this.options,
                    f = z.type;
                r.labelFormatter = z.labels.formatter || r.defaultLabelFormatter;
                r.userOptions = b;
                r.minPixelPadding = 0;
                r.reversed = z.reversed;
                r.visible = !1 !== z.visible;
                r.zoomEnabled = !1 !== z.zoomEnabled;
                r.hasNames = "category" === f || !0 === z.categories;
                r.categories = z.categories || r.hasNames;
                r.names || (r.names = [], r.names.keys = {});
                r.plotLinesAndBandsGroups = {};
                r.isLog = "logarithmic" === f;
                r.isDatetimeAxis =
                    "datetime" === f;
                r.positiveValuesOnly = r.isLog && !r.allowNegativeLog;
                r.isLinked = u(z.linkedTo);
                r.ticks = {};
                r.labelEdge = [];
                r.minorTicks = {};
                r.plotLinesAndBands = [];
                r.alternateBands = {};
                r.len = 0;
                r.minRange = r.userMinRange = z.minRange || z.maxZoom;
                r.range = z.range;
                r.offset = z.offset || 0;
                r.stacks = {};
                r.oldStacks = {};
                r.stacksTouched = 0;
                r.max = null;
                r.min = null;
                r.crosshair = F(z.crosshair, G(a.options.tooltip.crosshairs)[e ? 0 : 1], !1);
                b = r.options.events; - 1 === c(r, a.axes) && (e ? a.axes.splice(a.xAxis.length, 0, r) : a.axes.push(r), a[r.coll].push(r));
                r.series = r.series || [];
                a.inverted && !r.isZAxis && e && void 0 === r.reversed && (r.reversed = !0);
                w(b, function(a, b) { A(r, b, a) });
                r.lin2log = z.linearToLogConverter || r.lin2log;
                r.isLog && (r.val2lin = r.log2lin, r.lin2val = r.lin2log);
                h(this, "afterInit")
            },
            setOptions: function(a) {
                this.options = x(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], x(v[this.coll], a));
                h(this, "afterSetOptions", { userOptions: a })
            },
            defaultLabelFormatter: function() {
                var b = this.axis,
                    c = this.value,
                    e = b.chart.time,
                    f = b.categories,
                    p = this.dateTimeLabelFormat,
                    m = v.lang,
                    g = m.numericSymbols,
                    m = m.numericSymbolMagnitude || 1E3,
                    h = g && g.length,
                    k, d = b.options.labels.format,
                    b = b.isLog ? Math.abs(c) : b.tickInterval;
                if (d) k = q(d, this, e);
                else if (f) k = c;
                else if (p) k = e.dateFormat(p, c);
                else if (h && 1E3 <= b)
                    for (; h-- && void 0 === k;) e = Math.pow(m, h + 1), b >= e && 0 === 10 * c % e && null !== g[h] && 0 !== c && (k = a.numberFormat(c / e, -1) + g[h]);
                void 0 === k && (k = 1E4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, ""));
                return k
            },
            getSeriesExtremes: function() {
                var a = this,
                    c = a.chart;
                h(this, "getSeriesExtremes", null, function() {
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.buildStacks && a.buildStacks();
                    g(a.series, function(e) {
                        if (e.visible || !c.options.chart.ignoreHiddenSeries) {
                            var r = e.options,
                                z = r.threshold,
                                f;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= z && (z = null);
                            if (a.isXAxis) r = e.xData, r.length && (e = n(r), f = C(r), B(e) || e instanceof Date || (r = b(r,
                                B), e = n(r), f = C(r)), r.length && (a.dataMin = Math.min(F(a.dataMin, r[0], e), e), a.dataMax = Math.max(F(a.dataMax, r[0], f), f)));
                            else if (e.getExtremes(), f = e.dataMax, e = e.dataMin, u(e) && u(f) && (a.dataMin = Math.min(F(a.dataMin, e), e), a.dataMax = Math.max(F(a.dataMax, f), f)), u(z) && (a.threshold = z), !r.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                        }
                    })
                });
                h(this, "afterGetSeriesExtremes")
            },
            translate: function(a, b, c, e, f, p) {
                var r = this.linkedParent || this,
                    z = 1,
                    m = 0,
                    g = e ? r.oldTransA : r.transA;
                e = e ? r.oldMin : r.min;
                var h = r.minPixelPadding;
                f = (r.isOrdinal || r.isBroken || r.isLog && f) && r.lin2val;
                g || (g = r.transA);
                c && (z *= -1, m = r.len);
                r.reversed && (z *= -1, m -= z * (r.sector || r.len));
                b ? (a = (a * z + m - h) / g + e, f && (a = r.lin2val(a))) : (f && (a = r.val2lin(a)), a = B(e) ? z * (a - e) * g + m + z * h + (B(p) ? g * p : 0) : void 0);
                return a
            },
            toPixels: function(a, b) { return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos) },
            toValue: function(a, b) { return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0) },
            getPlotLinePath: function(a, b, c, e, f) {
                var r = this.chart,
                    z = this.left,
                    p = this.top,
                    m, g, h = c &&
                    r.oldChartHeight || r.chartHeight,
                    k = c && r.oldChartWidth || r.chartWidth,
                    L;
                m = this.transB;
                var q = function(a, b, c) { if (a < b || a > c) e ? a = Math.min(Math.max(b, a), c) : L = !0; return a };
                f = F(f, this.translate(a, null, null, c));
                f = Math.min(Math.max(-1E5, f), 1E5);
                a = c = Math.round(f + m);
                m = g = Math.round(h - f - m);
                B(f) ? this.horiz ? (m = p, g = h - this.bottom, a = c = q(a, z, z + this.width)) : (a = z, c = k - this.right, m = g = q(m, p, p + this.height)) : (L = !0, e = !1);
                return L && !e ? null : r.renderer.crispLine(["M", a, m, "L", c, g], b || 1)
            },
            getLinearTickPositions: function(a, b, c) {
                var e,
                    r = l(Math.floor(b / a) * a);
                c = l(Math.ceil(c / a) * a);
                var z = [],
                    f;
                l(r + a) === r && (f = 20);
                if (this.single) return [b];
                for (b = r; b <= c;) {
                    z.push(b);
                    b = l(b + a, f);
                    if (b === e) break;
                    e = b
                }
                return z
            },
            getMinorTickInterval: function() { var a = this.options; return !0 === a.minorTicks ? F(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval },
            getMinorTickPositions: function() {
                var a = this,
                    b = a.options,
                    c = a.tickPositions,
                    e = a.minorTickInterval,
                    f = [],
                    p = a.pointRangePadding || 0,
                    m = a.min - p,
                    p = a.max + p,
                    h = p - m;
                if (h && h / e < a.len / 3)
                    if (a.isLog) g(this.paddedTicks,
                        function(b, c, r) { c && f.push.apply(f, a.getLogTickPositions(e, r[c - 1], r[c], !0)) });
                    else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) f = f.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e), m, p, b.startOfWeek));
                else
                    for (b = m + (c[0] - m) % e; b <= p && b !== f[0]; b += e) f.push(b);
                0 !== f.length && a.trimTicks(f);
                return f
            },
            adjustForMinRange: function() {
                var a = this.options,
                    b = this.min,
                    c = this.max,
                    e, f, p, m, h, k, q, d;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (u(a.min) || u(a.max) ? this.minRange = null : (g(this.series,
                    function(a) {
                        k = a.xData;
                        for (m = q = a.xIncrement ? 1 : k.length - 1; 0 < m; m--)
                            if (h = k[m] - k[m - 1], void 0 === p || h < p) p = h
                    }), this.minRange = Math.min(5 * p, this.dataMax - this.dataMin)));
                c - b < this.minRange && (f = this.dataMax - this.dataMin >= this.minRange, d = this.minRange, e = (d - c + b) / 2, e = [b - e, F(a.min, b - e)], f && (e[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = C(e), c = [b + d, F(a.max, b + d)], f && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), c = n(c), c - b < d && (e[0] = c - d, e[1] = F(a.min, c - d), b = C(e)));
                this.min = b;
                this.max = c
            },
            getClosest: function() {
                var a;
                this.categories ? a = 1 : g(this.series, function(b) {
                    var c = b.closestPointRange,
                        e = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
                    !b.noSharedTooltip && u(c) && e && (a = u(a) ? Math.min(a, c) : c)
                });
                return a
            },
            nameToX: function(a) {
                var b = m(this.categories),
                    e = b ? this.categories : this.names,
                    r = a.options.x,
                    f;
                a.series.requireSorting = !1;
                u(r) || (r = !1 === this.options.uniqueNames ? a.series.autoIncrement() : b ? c(a.name, e) : F(e.keys[a.name], -1)); - 1 === r ? b || (f = e.length) : f = r;
                void 0 !== f && (this.names[f] = a.name, this.names.keys[a.name] = f);
                return f
            },
            updateNames: function() {
                var b = this,
                    c = this.names;
                0 < c.length && (g(a.keys(c.keys), function(a) { delete c.keys[a] }), c.length = 0, this.minRange = this.userMinRange, g(this.series || [], function(a) {
                    a.xIncrement = null;
                    if (!a.points || a.isDirtyData) a.processData(), a.generatePoints();
                    g(a.points, function(c, e) {
                        var r;
                        c.options && (r = b.nameToX(c), void 0 !== r && r !== c.x && (c.x = r, a.xData[e] = r))
                    })
                }))
            },
            setAxisTranslation: function(a) {
                var b = this,
                    c = b.max - b.min,
                    e = b.axisPointRange || 0,
                    r, f = 0,
                    p = 0,
                    m = b.linkedParent,
                    k = !!b.categories,
                    d = b.transA,
                    q = b.isXAxis;
                if (q || k || e) r = b.getClosest(), m ? (f = m.minPointOffset, p = m.pointRangePadding) : g(b.series, function(a) {
                    var c = k ? 1 : q ? F(a.options.pointRange, r, 0) : b.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    e = Math.max(e, c);
                    b.single || (f = Math.max(f, I(a) ? 0 : c / 2), p = Math.max(p, "on" === a ? 0 : c))
                }), m = b.ordinalSlope && r ? b.ordinalSlope / r : 1, b.minPointOffset = f *= m, b.pointRangePadding = p *= m, b.pointRange = Math.min(e, c), q && (b.closestPointRange = r);
                a && (b.oldTransA = d);
                b.translationSlope = b.transA = d = b.options.staticScale || b.len / (c + p ||
                    1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = d * f;
                h(this, "afterSetAxisTranslation")
            },
            minFromRange: function() { return this.max - this.range },
            setTickInterval: function(b) {
                var c = this,
                    r = c.chart,
                    f = c.options,
                    p = c.isLog,
                    m = c.isDatetimeAxis,
                    k = c.isXAxis,
                    d = c.isLinked,
                    q = f.maxPadding,
                    D = f.minPadding,
                    w = f.tickInterval,
                    x = f.tickPixelInterval,
                    G = c.categories,
                    H = B(c.threshold) ? c.threshold : null,
                    I = c.softThreshold,
                    n, t, J, v;
                m || G || d || this.getTickAmount();
                J = F(c.userMin, f.min);
                v = F(c.userMax, f.max);
                d ? (c.linkedParent = r[c.coll][f.linkedTo],
                    r = c.linkedParent.getExtremes(), c.min = F(r.min, r.dataMin), c.max = F(r.max, r.dataMax), f.type !== c.linkedParent.options.type && a.error(11, 1)) : (!I && u(H) && (c.dataMin >= H ? (n = H, D = 0) : c.dataMax <= H && (t = H, q = 0)), c.min = F(J, n, c.dataMin), c.max = F(v, t, c.dataMax));
                p && (c.positiveValuesOnly && !b && 0 >= Math.min(c.min, F(c.dataMin, c.min)) && a.error(10, 1), c.min = l(c.log2lin(c.min), 15), c.max = l(c.log2lin(c.max), 15));
                c.range && u(c.max) && (c.userMin = c.min = J = Math.max(c.dataMin, c.minFromRange()), c.userMax = v = c.max, c.range = null);
                h(c, "foundExtremes");
                c.beforePadding && c.beforePadding();
                c.adjustForMinRange();
                !(G || c.axisPointRange || c.usePercentage || d) && u(c.min) && u(c.max) && (r = c.max - c.min) && (!u(J) && D && (c.min -= r * D), !u(v) && q && (c.max += r * q));
                B(f.softMin) && !B(c.userMin) && (c.min = Math.min(c.min, f.softMin));
                B(f.softMax) && !B(c.userMax) && (c.max = Math.max(c.max, f.softMax));
                B(f.floor) && (c.min = Math.max(c.min, f.floor));
                B(f.ceiling) && (c.max = Math.min(c.max, f.ceiling));
                I && u(c.dataMin) && (H = H || 0, !u(J) && c.min < H && c.dataMin >= H ? c.min = H : !u(v) && c.max > H && c.dataMax <= H && (c.max =
                    H));
                c.tickInterval = c.min === c.max || void 0 === c.min || void 0 === c.max ? 1 : d && !w && x === c.linkedParent.options.tickPixelInterval ? w = c.linkedParent.tickInterval : F(w, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, G ? 1 : (c.max - c.min) * x / Math.max(c.len, x));
                k && !b && g(c.series, function(a) { a.processData(c.min !== c.oldMin || c.max !== c.oldMax) });
                c.setAxisTranslation(!0);
                c.beforeSetTickPositions && c.beforeSetTickPositions();
                c.postProcessTickInterval && (c.tickInterval = c.postProcessTickInterval(c.tickInterval));
                c.pointRange && !w && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
                b = F(f.minTickInterval, c.isDatetimeAxis && c.closestPointRange);
                !w && c.tickInterval < b && (c.tickInterval = b);
                m || p || w || (c.tickInterval = M(c.tickInterval, null, e(c.tickInterval), F(f.allowDecimals, !(.5 < c.tickInterval && 5 > c.tickInterval && 1E3 < c.max && 9999 > c.max)), !!this.tickAmount));
                this.tickAmount || (c.tickInterval = c.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function() {
                var a = this.options,
                    b, c = a.tickPositions;
                b = this.getMinorTickInterval();
                var e = a.tickPositioner,
                    f = a.startOnTick,
                    p = a.endOnTick;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === b && this.tickInterval ? this.tickInterval / 5 : b;
                this.single = this.min === this.max && u(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = b = c && c.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max,
                    a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()], b[0] === b[1] && (b.length = 1)), this.tickPositions = b, e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = b = e);
                this.paddedTicks = b.slice(0);
                this.trimTicks(b, f, p);
                this.isLinked || (this.single && 2 > b.length && (this.min -= .5, this.max += .5), c || e || this.adjustTickAmount());
                h(this, "afterSetTickPositions")
            },
            trimTicks: function(a, b, c) {
                var e = a[0],
                    r = a[a.length - 1],
                    f = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (b && -Infinity !== e) this.min = e;
                    else
                        for (; this.min - f > a[0];) a.shift();
                    if (c) this.max = r;
                    else
                        for (; this.max + f < a[a.length - 1];) a.pop();
                    0 === a.length && u(e) && !this.options.tickPositions && a.push((r + e) / 2)
                }
            },
            alignToOthers: function() {
                var a = {},
                    b, c = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || !1 === c.startOnTick || !1 === c.endOnTick || this.isLog || g(this.chart[this.coll],
                    function(c) {
                        var e = c.options,
                            e = [c.horiz ? e.left : e.top, e.width, e.height, e.pane].join();
                        c.series.length && (a[e] ? b = !0 : a[e] = 1)
                    });
                return b
            },
            getTickAmount: function() {
                var a = this.options,
                    b = a.tickAmount,
                    c = a.tickPixelInterval;
                !u(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function() {
                var a = this.tickInterval,
                    b = this.tickPositions,
                    c = this.tickAmount,
                    e = this.finalTickAmt,
                    f = b && b.length,
                    p = F(this.threshold, this.softThreshold ? 0 : null);
                if (this.hasData()) {
                    if (f < c) {
                        for (; b.length < c;) b.length % 2 || this.min === p ? b.push(l(b[b.length - 1] + a)) : b.unshift(l(b[0] - a));
                        this.transA *= (f - 1) / (c - 1);
                        this.min = b[0];
                        this.max = b[b.length - 1]
                    } else f > c && (this.tickInterval *= 2, this.setTickPositions());
                    if (u(e)) {
                        for (a = c = b.length; a--;)(3 === e && 1 === a % 2 || 2 >= e && 0 < a && a < c - 1) && b.splice(a, 1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function() {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength =
                    this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                g(this.series, function(b) { if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0 });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) :
                    this.cleanStacks && this.cleanStacks();
                h(this, "afterSetScale")
            },
            setExtremes: function(a, b, c, e, p) {
                var r = this,
                    m = r.chart;
                c = F(c, !0);
                g(r.series, function(a) { delete a.kdTree });
                p = f(p, { min: a, max: b });
                h(r, "setExtremes", p, function() {
                    r.userMin = a;
                    r.userMax = b;
                    r.eventArgs = p;
                    c && m.redraw(e)
                })
            },
            zoom: function(a, b) {
                var c = this.dataMin,
                    e = this.dataMax,
                    f = this.options,
                    r = Math.min(c, F(f.min, c)),
                    f = Math.max(e, F(f.max, e));
                if (a !== this.min || b !== this.max) this.allowZoomOutside || (u(c) && (a < r && (a = r), a > f && (a = f)), u(e) && (b < r && (b = r), b > f && (b =
                    f))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, { trigger: "zoom" });
                return !0
            },
            setAxisSize: function() {
                var b = this.chart,
                    c = this.options,
                    e = c.offsets || [0, 0, 0, 0],
                    f = this.horiz,
                    p = this.width = Math.round(a.relativeLength(F(c.width, b.plotWidth - e[3] + e[1]), b.plotWidth)),
                    m = this.height = Math.round(a.relativeLength(F(c.height, b.plotHeight - e[0] + e[2]), b.plotHeight)),
                    g = this.top = Math.round(a.relativeLength(F(c.top, b.plotTop + e[0]), b.plotHeight, b.plotTop)),
                    c = this.left = Math.round(a.relativeLength(F(c.left,
                        b.plotLeft + e[3]), b.plotWidth, b.plotLeft));
                this.bottom = b.chartHeight - m - g;
                this.right = b.chartWidth - p - c;
                this.len = Math.max(f ? p : m, 0);
                this.pos = f ? c : g
            },
            getExtremes: function() { var a = this.isLog; return { min: a ? l(this.lin2log(this.min)) : this.min, max: a ? l(this.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax } },
            getThreshold: function(a) {
                var b = this.isLog,
                    c = b ? this.lin2log(this.min) : this.min,
                    b = b ? this.lin2log(this.max) : this.max;
                null === a || -Infinity === a ? a = c : Infinity ===
                    a ? a = b : c > a ? a = c : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function(a) { a = (F(a, 0) - 90 * this.side + 720) % 360; return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center" },
            tickSize: function(a) {
                var b = this.options,
                    c = b[a + "Length"],
                    e = F(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (e && c) return "inside" === b[a + "Position"] && (c = -c), [c, e]
            },
            labelMetrics: function() {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize,
                    this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function() {
                var a = this.options.labels,
                    b = this.horiz,
                    c = this.tickInterval,
                    e = c,
                    f = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
                    p, m = a.rotation,
                    h = this.labelMetrics(),
                    k, d = Number.MAX_VALUE,
                    q, w = function(a) {
                        a /= f || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return l(a * c)
                    };
                b ? (q = !a.staggerLines && !a.step && (u(m) ? [m] : f < F(a.autoRotationLimit, 80) && a.autoRotation)) && g(q, function(a) {
                    var b;
                    if (a === m || a && -90 <= a && 90 >= a) k = w(Math.abs(h.h / Math.sin(t * a))), b = k + Math.abs(a / 360), b < d && (d = b, p = a, e =
                        k)
                }) : a.step || (e = w(h.h));
                this.autoRotation = q;
                this.labelRotation = F(p, m);
                return e
            },
            getSlotWidth: function() {
                var a = this.chart,
                    b = this.horiz,
                    c = this.options.labels,
                    e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    f = a.margin[3];
                return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * this.len / e || !b && (c.style && parseInt(c.style.width, 10) || f && f - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function() {
                var a = this.chart,
                    b = a.renderer,
                    c = this.tickPositions,
                    e = this.ticks,
                    f = this.options.labels,
                    p = f &&
                    f.style || {},
                    m = this.horiz,
                    h = this.getSlotWidth(),
                    k = Math.max(1, Math.round(h - 2 * (f.padding || 5))),
                    d = {},
                    q = this.labelMetrics(),
                    w = f.style && f.style.textOverflow,
                    D, B, x = 0,
                    G;
                I(f.rotation) || (d.rotation = f.rotation || 0);
                g(c, function(a) {
                    (a = e[a]) && a.label && a.label.textPxLength > x && (x = a.label.textPxLength)
                });
                this.maxLabelLength = x;
                if (this.autoRotation) x > k && x > q.h ? d.rotation = this.labelRotation : this.labelRotation = 0;
                else if (h && (D = k, !w))
                    for (B = "clip", k = c.length; !m && k--;)
                        if (G = c[k], G = e[G].label) G.styles && "ellipsis" === G.styles.textOverflow ?
                            G.css({ textOverflow: "clip" }) : G.textPxLength > h && G.css({ width: h + "px" }), G.getBBox().height > this.len / c.length - (q.h - q.f) && (G.specificTextOverflow = "ellipsis");
                d.rotation && (D = x > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight, w || (B = "ellipsis"));
                if (this.labelAlign = f.align || this.autoLabelAlign(this.labelRotation)) d.align = this.labelAlign;
                g(c, function(a) {
                    var b = (a = e[a]) && a.label,
                        c = p.width,
                        f = {};
                    b && (b.attr(d), D && !c && "nowrap" !== p.whiteSpace && (D < b.textPxLength || "SPAN" === b.element.tagName) ? (f.width = D, w || (f.textOverflow =
                        b.specificTextOverflow || B), b.css(f)) : b.styles && b.styles.width && !f.width && !c && b.css({ width: null }), delete b.specificTextOverflow, a.rotation = d.rotation)
                });
                this.tickRotCorr = b.rotCorr(q.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function() { return this.hasVisibleSeries || u(this.min) && u(this.max) && this.tickPositions && 0 < this.tickPositions.length },
            addTitle: function(a) {
                var b = this.chart.renderer,
                    c = this.horiz,
                    e = this.opposite,
                    f = this.options.title,
                    p;
                this.axisTitle || ((p = f.textAlign) || (p = (c ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : { low: e ? "right" : "left", middle: "center", high: e ? "left" : "right" })[f.align]), this.axisTitle = b.text(f.text, 0, 0, f.useHTML).attr({ zIndex: 7, rotation: f.rotation || 0, align: p }).addClass("highcharts-axis-title").css(x(f.style)).add(this.axisGroup), this.axisTitle.isNew = !0);
                f.style.width || this.isRadial || this.axisTitle.css({ width: this.len });
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function(a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() : b[a] = new J(this, a)
            },
            getOffset: function() {
                var a = this,
                    b = a.chart,
                    c = b.renderer,
                    e = a.options,
                    f = a.tickPositions,
                    p = a.ticks,
                    m = a.horiz,
                    h = a.side,
                    k = b.inverted && !a.isZAxis ? [1, 0, 3, 2][h] : h,
                    d, q, D = 0,
                    B, x = 0,
                    G = e.title,
                    l = e.labels,
                    H = 0,
                    I = b.axisOffset,
                    b = b.clipOffset,
                    n = [-1, 1, 1, -1][h],
                    t = e.className,
                    J = a.axisParent,
                    M = this.tickSize("tick");
                d = a.hasData();
                a.showAxis = q = d || F(e.showEmpty, !0);
                a.staggerLines = a.horiz && l.staggerLines;
                a.axisGroup || (a.gridGroup = c.g("grid").attr({ zIndex: e.gridZIndex || 1 }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (t || "")).add(J), a.axisGroup = c.g("axis").attr({
                    zIndex: e.zIndex ||
                        2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (t || "")).add(J), a.labelGroup = c.g("axis-labels").attr({ zIndex: l.zIndex || 7 }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (t || "")).add(J));
                d || a.isLinked ? (g(f, function(b, c) { a.generateTick(b, c) }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === h || 2 === h || { 1: "left", 3: "right" }[h] === a.labelAlign, F(l.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && g(f, function(a) { H = Math.max(p[a].getLabelSize(), H) }), a.staggerLines && (H *= a.staggerLines),
                    a.labelOffset = H * (a.opposite ? -1 : 1)) : w(p, function(a, b) {
                    a.destroy();
                    delete p[b]
                });
                G && G.text && !1 !== G.enabled && (a.addTitle(q), q && !1 !== G.reserveSpace && (a.titleOffset = D = a.axisTitle.getBBox()[m ? "height" : "width"], B = G.offset, x = u(B) ? 0 : F(G.margin, m ? 5 : 10)));
                a.renderLine();
                a.offset = n * F(e.offset, I[h]);
                a.tickRotCorr = a.tickRotCorr || { x: 0, y: 0 };
                c = 0 === h ? -a.labelMetrics().h : 2 === h ? a.tickRotCorr.y : 0;
                x = Math.abs(H) + x;
                H && (x = x - c + n * (m ? F(l.y, a.tickRotCorr.y + 8 * n) : l.x));
                a.axisTitleMargin = F(B, x);
                I[h] = Math.max(I[h], a.axisTitleMargin +
                    D + n * a.offset, x, d && f.length && M ? M[0] + n * a.offset : 0);
                e = e.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[k] = Math.max(b[k], e)
            },
            getLinePath: function(a) {
                var b = this.chart,
                    c = this.opposite,
                    e = this.offset,
                    f = this.horiz,
                    p = this.left + (c ? this.width : 0) + e,
                    e = b.chartHeight - this.bottom - (c ? this.height : 0) + e;
                c && (a *= -1);
                return b.renderer.crispLine(["M", f ? this.left : p, f ? e : this.top, "L", f ? b.chartWidth - this.right : p, f ? e : b.chartHeight - this.bottom], a)
            },
            renderLine: function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                    this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }))
            },
            getTitlePosition: function() {
                var a = this.horiz,
                    b = this.left,
                    c = this.top,
                    e = this.len,
                    f = this.options.title,
                    p = a ? b : c,
                    m = this.opposite,
                    h = this.offset,
                    g = f.x || 0,
                    k = f.y || 0,
                    d = this.axisTitle,
                    q = this.chart.renderer.fontMetrics(f.style && f.style.fontSize, d),
                    d = Math.max(d.getBBox(null, 0).height - q.h - 1, 0),
                    e = { low: p + (a ? 0 : e), middle: p + e / 2, high: p + (a ? e : 0) }[f.align],
                    b = (a ? c + this.height : b) + (a ? 1 : -1) * (m ? -1 : 1) * this.axisTitleMargin + [-d,
                        d, q.f, -d
                    ][this.side];
                return { x: a ? e + g : b + (m ? this.width : 0) + h + g, y: a ? b + k - (m ? this.height : 0) + h : e + k }
            },
            renderMinorTick: function(a) {
                var b = this.chart.hasRendered && B(this.oldMin),
                    c = this.minorTicks;
                c[a] || (c[a] = new J(this, a, "minor"));
                b && c[a].isNew && c[a].render(null, !0);
                c[a].render(null, !1, 1)
            },
            renderTick: function(a, b) {
                var c = this.isLinked,
                    e = this.ticks,
                    f = this.chart.hasRendered && B(this.oldMin);
                if (!c || a >= this.min && a <= this.max) e[a] || (e[a] = new J(this, a)), f && e[a].isNew && e[a].render(b, !0, .1), e[a].render(b)
            },
            render: function() {
                var b =
                    this,
                    c = b.chart,
                    e = b.options,
                    f = b.isLog,
                    p = b.isLinked,
                    m = b.tickPositions,
                    k = b.axisTitle,
                    d = b.ticks,
                    q = b.minorTicks,
                    x = b.alternateBands,
                    G = e.stackLabels,
                    l = e.alternateGridColor,
                    H = b.tickmarkOffset,
                    I = b.axisLine,
                    n = b.showAxis,
                    t = y(c.renderer.globalAnimation),
                    F, M;
                b.labelEdge.length = 0;
                b.overlap = !1;
                g([d, q, x], function(a) { w(a, function(a) { a.isActive = !1 }) });
                if (b.hasData() || p) b.minorTickInterval && !b.categories && g(b.getMinorTickPositions(), function(a) { b.renderMinorTick(a) }), m.length && (g(m, function(a, c) { b.renderTick(a, c) }),
                    H && (0 === b.min || b.single) && (d[-1] || (d[-1] = new J(b, -1, null, !0)), d[-1].render(-1))), l && g(m, function(e, p) {
                    M = void 0 !== m[p + 1] ? m[p + 1] + H : b.max - H;
                    0 === p % 2 && e < b.max && M <= b.max + (c.polar ? -H : H) && (x[e] || (x[e] = new a.PlotLineOrBand(b)), F = e + H, x[e].options = { from: f ? b.lin2log(F) : F, to: f ? b.lin2log(M) : M, color: l }, x[e].render(), x[e].isActive = !0)
                }), b._addedPlotLB || (g((e.plotLines || []).concat(e.plotBands || []), function(a) { b.addPlotBandOrLine(a) }), b._addedPlotLB = !0);
                g([d, q, x], function(a) {
                    var b, e = [],
                        f = t.duration;
                    w(a, function(a,
                        b) { a.isActive || (a.render(b, !1, 0), a.isActive = !1, e.push(b)) });
                    D(function() { for (b = e.length; b--;) a[e[b]] && !a[e[b]].isActive && (a[e[b]].destroy(), delete a[e[b]]) }, a !== x && c.hasRendered && f ? f : 0)
                });
                I && (I[I.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(I.strokeWidth()) }), I.isPlaced = !0, I[n ? "show" : "hide"](!0));
                k && n && (e = b.getTitlePosition(), B(e.y) ? (k[k.isNew ? "attr" : "animate"](e), k.isNew = !1) : (k.attr("y", -9999), k.isNew = !0));
                G && G.enabled && b.renderStackTotals();
                b.isDirty = !1;
                h(this, "afterRender")
            },
            redraw: function() {
                this.visible &&
                    (this.render(), g(this.plotLinesAndBands, function(a) { a.render() }));
                g(this.series, function(a) { a.isDirty = !0 })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function(a) {
                var b = this,
                    e = b.stacks,
                    f = b.plotLinesAndBands,
                    m;
                h(this, "destroy", { keepEvents: a });
                a || p(b);
                w(e, function(a, b) {
                    k(a);
                    e[b] = null
                });
                g([b.ticks, b.minorTicks, b.alternateBands], function(a) { k(a) });
                if (f)
                    for (a = f.length; a--;) f[a].destroy();
                g("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),
                    function(a) { b[a] && (b[a] = b[a].destroy()) });
                for (m in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[m] = b.plotLinesAndBandsGroups[m].destroy();
                w(b, function(a, e) {-1 === c(e, b.keepProps) && delete b[e] })
            },
            drawCrosshair: function(a, b) {
                var c, e = this.crosshair,
                    f = F(e.snap, !0),
                    p, m = this.cross;
                h(this, "drawCrosshair", { e: a, point: b });
                a || (a = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (u(b) || !f)) {
                    f ? u(b) && (p = F(b.crosshairPos, this.isXAxis ? b.plotX : this.len - b.plotY)) : p = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY +
                        this.pos);
                    u(p) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : F(b.stackY, b.y)), null, null, null, p) || null);
                    if (!u(c)) { this.hideCrosshair(); return }
                    f = this.categories && !this.isRadial;
                    m || (this.cross = m = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (f ? "category " : "thin ") + e.className).attr({ zIndex: F(e.zIndex, 2) }).add(), m.attr({ stroke: e.color || (f ? d("#ccd6eb").setOpacity(.25).get() : "#cccccc"), "stroke-width": F(e.width, 1) }).css({ "pointer-events": "none" }), e.dashStyle && m.attr({ dashstyle: e.dashStyle }));
                    m.show().attr({ d: c });
                    f && !e.width && m.attr({ "stroke-width": this.transA });
                    this.cross.e = a
                } else this.hideCrosshair();
                h(this, "afterDrawCrosshair", { e: a, point: b })
            },
            hideCrosshair: function() { this.cross && this.cross.hide() }
        });
        return a.Axis = H
    }(K);
    (function(a) {
        var A = a.Axis,
            y = a.getMagnitude,
            C = a.map,
            n = a.normalizeTickInterval,
            d = a.pick;
        A.prototype.getLogTickPositions = function(a, v, u, t) {
            var k = this.options,
                g = this.len,
                f = [];
            t || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), f = this.getLinearTickPositions(a, v, u);
            else if (.08 <= a)
                for (var g = Math.floor(v), h, q, e, b, c, k = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; g < u + 1 && !c; g++)
                    for (q = k.length, h = 0; h < q && !c; h++) e = this.log2lin(this.lin2log(g) * k[h]), e > v && (!t || b <= u) && void 0 !== b && f.push(b), b > u && (c = !0), b = e;
            else v = this.lin2log(v), u = this.lin2log(u), a = t ? this.getMinorTickInterval() : k.tickInterval, a = d("auto" === a ? null : a, this._minorAutoInterval, k.tickPixelInterval / (t ? 5 : 1) * (u - v) / ((t ? g / this.tickPositions.length : g) || 1)), a = n(a, null, y(a)), f = C(this.getLinearTickPositions(a, v, u),
                this.log2lin), t || (this._minorAutoInterval = a / 5);
            t || (this.tickInterval = a);
            return f
        };
        A.prototype.log2lin = function(a) { return Math.log(a) / Math.LN10 };
        A.prototype.lin2log = function(a) { return Math.pow(10, a) }
    })(K);
    (function(a, A) {
        var y = a.arrayMax,
            C = a.arrayMin,
            n = a.defined,
            d = a.destroyObjectProperties,
            l = a.each,
            v = a.erase,
            u = a.merge,
            t = a.pick;
        a.PlotLineOrBand = function(a, g) {
            this.axis = a;
            g && (this.options = g, this.id = g.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function() {
                var k = this,
                    g = k.axis,
                    f = g.horiz,
                    h = k.options,
                    d = h.label,
                    e = k.label,
                    b = h.to,
                    c = h.from,
                    m = h.value,
                    B = n(c) && n(b),
                    l = n(m),
                    x = k.svgElem,
                    M = !x,
                    w = [],
                    F = h.color,
                    p = t(h.zIndex, 0),
                    G = h.events,
                    w = { "class": "highcharts-plot-" + (B ? "band " : "line ") + (h.className || "") },
                    D = {},
                    J = g.chart.renderer,
                    H = B ? "bands" : "lines";
                g.isLog && (c = g.log2lin(c), b = g.log2lin(b), m = g.log2lin(m));
                l ? (w.stroke = F, w["stroke-width"] = h.width, h.dashStyle && (w.dashstyle = h.dashStyle)) : B && (F && (w.fill = F), h.borderWidth && (w.stroke = h.borderColor, w["stroke-width"] = h.borderWidth));
                D.zIndex = p;
                H += "-" + p;
                (F = g.plotLinesAndBandsGroups[H]) ||
                (g.plotLinesAndBandsGroups[H] = F = J.g("plot-" + H).attr(D).add());
                M && (k.svgElem = x = J.path().attr(w).add(F));
                if (l) w = g.getPlotLinePath(m, x.strokeWidth());
                else if (B) w = g.getPlotBandPath(c, b, h);
                else return;
                M && w && w.length ? (x.attr({ d: w }), G && a.objectEach(G, function(a, b) { x.on(b, function(a) { G[b].apply(k, [a]) }) })) : x && (w ? (x.show(), x.animate({ d: w })) : (x.hide(), e && (k.label = e = e.destroy())));
                d && n(d.text) && w && w.length && 0 < g.width && 0 < g.height && !w.isFlat ? (d = u({
                    align: f && B && "center",
                    x: f ? !B && 4 : 10,
                    verticalAlign: !f && B && "middle",
                    y: f ? B ? 16 : 10 : B ? 6 : -4,
                    rotation: f && !B && 90
                }, d), this.renderLabel(d, w, B, p)) : e && e.hide();
                return k
            },
            renderLabel: function(a, g, f, h) {
                var d = this.label,
                    e = this.axis.chart.renderer;
                d || (d = { align: a.textAlign || a.align, rotation: a.rotation, "class": "highcharts-plot-" + (f ? "band" : "line") + "-label " + (a.className || "") }, d.zIndex = h, this.label = d = e.text(a.text, 0, 0, a.useHTML).attr(d).add(), d.css(a.style));
                h = g.xBounds || [g[1], g[4], f ? g[6] : g[1]];
                g = g.yBounds || [g[2], g[5], f ? g[7] : g[2]];
                f = C(h);
                e = C(g);
                d.align(a, !1, {
                    x: f,
                    y: e,
                    width: y(h) - f,
                    height: y(g) -
                        e
                });
                d.show()
            },
            destroy: function() {
                v(this.axis.plotLinesAndBands, this);
                delete this.axis;
                d(this)
            }
        };
        a.extend(A.prototype, {
            getPlotBandPath: function(a, d) {
                var f = this.getPlotLinePath(d, null, null, !0),
                    h = this.getPlotLinePath(a, null, null, !0),
                    g = [],
                    e = this.horiz,
                    b = 1,
                    c;
                a = a < this.min && d < this.min || a > this.max && d > this.max;
                if (h && f)
                    for (a && (c = h.toString() === f.toString(), b = 0), a = 0; a < h.length; a += 6) e && f[a + 1] === h[a + 1] ? (f[a + 1] += b, f[a + 4] += b) : e || f[a + 2] !== h[a + 2] || (f[a + 2] += b, f[a + 5] += b), g.push("M", h[a + 1], h[a + 2], "L", h[a + 4], h[a + 5], f[a +
                        4], f[a + 5], f[a + 1], f[a + 2], "z"), g.isFlat = c;
                return g
            },
            addPlotBand: function(a) { return this.addPlotBandOrLine(a, "plotBands") },
            addPlotLine: function(a) { return this.addPlotBandOrLine(a, "plotLines") },
            addPlotBandOrLine: function(d, g) {
                var f = (new a.PlotLineOrBand(this, d)).render(),
                    h = this.userOptions;
                f && (g && (h[g] = h[g] || [], h[g].push(d)), this.plotLinesAndBands.push(f));
                return f
            },
            removePlotBandOrLine: function(a) {
                for (var d = this.plotLinesAndBands, f = this.options, h = this.userOptions, q = d.length; q--;) d[q].id === a && d[q].destroy();
                l([f.plotLines || [], h.plotLines || [], f.plotBands || [], h.plotBands || []], function(e) { for (q = e.length; q--;) e[q].id === a && v(e, e[q]) })
            },
            removePlotBand: function(a) { this.removePlotBandOrLine(a) },
            removePlotLine: function(a) { this.removePlotBandOrLine(a) }
        })
    })(K, W);
    (function(a) {
        var A = a.doc,
            y = a.each,
            C = a.extend,
            n = a.format,
            d = a.isNumber,
            l = a.map,
            v = a.merge,
            u = a.pick,
            t = a.splat,
            k = a.syncTimeout,
            g = a.timeUnits;
        a.Tooltip = function() { this.init.apply(this, arguments) };
        a.Tooltip.prototype = {
            init: function(a, d) {
                this.chart = a;
                this.options =
                    d;
                this.crosshairs = [];
                this.now = { x: 0, y: 0 };
                this.isHidden = !0;
                this.split = d.split && !a.inverted;
                this.shared = d.shared || this.split;
                this.outside = d.outside && !this.split
            },
            cleanSplit: function(a) {
                y(this.chart.series, function(f) {
                    var d = f && f.tt;
                    d && (!d.isActive || a ? f.tt = d.destroy() : d.isActive = !1)
                })
            },
            getLabel: function() {
                var f = this.chart.renderer,
                    d = this.options,
                    g;
                this.label || (this.outside && (this.container = g = a.doc.createElement("div"), g.className = "highcharts-tooltip-container", a.css(g, { position: "absolute", top: "1px", pointerEvents: "none" }),
                    a.doc.body.appendChild(g), this.renderer = f = new a.Renderer(g, 0, 0)), this.split ? this.label = f.g("tooltip") : (this.label = f.label("", 0, 0, d.shape || "callout", null, null, d.useHTML, null, "tooltip").attr({ padding: d.padding, r: d.borderRadius }), this.label.attr({ fill: d.backgroundColor, "stroke-width": d.borderWidth }).css(d.style).shadow(d.shadow)), this.outside && (this.label.attr({ x: this.distance, y: this.distance }), this.label.xSetter = function(a) { g.style.left = a + "px" }, this.label.ySetter = function(a) { g.style.top = a + "px" }), this.label.attr({ zIndex: 8 }).add());
                return this.label
            },
            update: function(a) {
                this.destroy();
                v(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, v(!0, this.options, a))
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(), a.discardElement(this.container));
                a.clearTimeout(this.hideTimer);
                a.clearTimeout(this.tooltipTimeout)
            },
            move: function(f, d, g, e) {
                var b = this,
                    c = b.now,
                    m = !1 !== b.options.animation &&
                    !b.isHidden && (1 < Math.abs(f - c.x) || 1 < Math.abs(d - c.y)),
                    h = b.followPointer || 1 < b.len;
                C(c, { x: m ? (2 * c.x + f) / 3 : f, y: m ? (c.y + d) / 2 : d, anchorX: h ? void 0 : m ? (2 * c.anchorX + g) / 3 : g, anchorY: h ? void 0 : m ? (c.anchorY + e) / 2 : e });
                b.getLabel().attr(c);
                m && (a.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() { b && b.move(f, d, g, e) }, 32))
            },
            hide: function(f) {
                var d = this;
                a.clearTimeout(this.hideTimer);
                f = u(f, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = k(function() {
                    d.getLabel()[f ? "fadeOut" : "hide"]();
                    d.isHidden = !0
                }, f))
            },
            getAnchor: function(a, d) {
                var f, e = this.chart,
                    b = e.inverted,
                    c = e.plotTop,
                    m = e.plotLeft,
                    g = 0,
                    h = 0,
                    k, n;
                a = t(a);
                f = a[0].tooltipPos;
                this.followPointer && d && (void 0 === d.chartX && (d = e.pointer.normalize(d)), f = [d.chartX - e.plotLeft, d.chartY - c]);
                f || (y(a, function(a) {
                    k = a.series.yAxis;
                    n = a.series.xAxis;
                    g += a.plotX + (!b && n ? n.left - m : 0);
                    h += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!b && k ? k.top - c : 0)
                }), g /= a.length, h /= a.length, f = [b ? e.plotWidth - h : g, this.shared && !b && 1 < a.length && d ? d.chartY - c : b ? e.plotHeight - g : h]);
                return l(f,
                    Math.round)
            },
            getPosition: function(a, d, g) {
                var e = this.chart,
                    b = this.distance,
                    c = {},
                    f = e.inverted && g.h || 0,
                    h, k = this.outside,
                    q = k ? A.documentElement.clientWidth - 2 * b : e.chartWidth,
                    l = k ? Math.max(A.body.scrollHeight, A.documentElement.scrollHeight, A.body.offsetHeight, A.documentElement.offsetHeight, A.documentElement.clientHeight) : e.chartHeight,
                    w = e.pointer.chartPosition,
                    n = ["y", l, d, (k ? w.top - b : 0) + g.plotY + e.plotTop, k ? 0 : e.plotTop, k ? l : e.plotTop + e.plotHeight],
                    p = ["x", q, a, (k ? w.left - b : 0) + g.plotX + e.plotLeft, k ? 0 : e.plotLeft, k ?
                        q : e.plotLeft + e.plotWidth
                    ],
                    G = !this.followPointer && u(g.ttBelow, !e.inverted === !!g.negative),
                    D = function(a, e, p, m, d, g) {
                        var h = p < m - b,
                            r = m + b + p < e,
                            k = m - b - p;
                        m += b;
                        if (G && r) c[a] = m;
                        else if (!G && h) c[a] = k;
                        else if (h) c[a] = Math.min(g - p, 0 > k - f ? k : k - f);
                        else if (r) c[a] = Math.max(d, m + f + p > e ? m : m + f);
                        else return !1
                    },
                    t = function(a, e, f, p) {
                        var m;
                        p < b || p > e - b ? m = !1 : c[a] = p < f / 2 ? 1 : p > e - f / 2 ? e - f - 2 : p - f / 2;
                        return m
                    },
                    H = function(a) {
                        var b = n;
                        n = p;
                        p = b;
                        h = a
                    },
                    r = function() {!1 !== D.apply(0, n) ? !1 !== t.apply(0, p) || h || (H(!0), r()) : h ? c.x = c.y = 0 : (H(!0), r()) };
                (e.inverted ||
                    1 < this.len) && H();
                r();
                return c
            },
            defaultFormatter: function(a) {
                var f = this.points || t(this),
                    d;
                d = [a.tooltipFooterHeaderFormatter(f[0])];
                d = d.concat(a.bodyFormatter(f));
                d.push(a.tooltipFooterHeaderFormatter(f[0], !0));
                return d
            },
            refresh: function(f, d) {
                var g, e = this.options,
                    b, c = f,
                    m, h = {},
                    k = [];
                g = e.formatter || this.defaultFormatter;
                var h = this.shared,
                    x;
                e.enabled && (a.clearTimeout(this.hideTimer), this.followPointer = t(c)[0].series.tooltipOptions.followPointer, m = this.getAnchor(c, d), d = m[0], b = m[1], !h || c.series && c.series.noSharedTooltip ?
                    h = c.getLabelConfig() : (y(c, function(a) {
                        a.setState("hover");
                        k.push(a.getLabelConfig())
                    }), h = { x: c[0].category, y: c[0].y }, h.points = k, c = c[0]), this.len = k.length, h = g.call(h, this), x = c.series, this.distance = u(x.tooltipOptions.distance, 16), !1 === h ? this.hide() : (g = this.getLabel(), this.isHidden && g.attr({ opacity: 1 }).show(), this.split ? this.renderSplit(h, t(f)) : (e.style.width || g.css({ width: this.chart.spacingBox.width }), g.attr({ text: h && h.join ? h.join("") : h }), g.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" +
                        u(c.colorIndex, x.colorIndex)), g.attr({ stroke: e.borderColor || c.color || x.color || "#666666" }), this.updatePosition({ plotX: d, plotY: b, negative: c.negative, ttBelow: c.ttBelow, h: m[2] || 0 })), this.isHidden = !1))
            },
            renderSplit: function(f, d) {
                var g = this,
                    e = [],
                    b = this.chart,
                    c = b.renderer,
                    m = !0,
                    h = this.options,
                    k = 0,
                    x = this.getLabel();
                a.isString(f) && (f = [!1, f]);
                y(f.slice(0, d.length + 1), function(a, f) {
                    if (!1 !== a) {
                        f = d[f - 1] || { isHeader: !0, plotX: d[0].plotX };
                        var q = f.series || g,
                            p = q.tt,
                            G = f.series || {},
                            D = "highcharts-color-" + u(f.colorIndex,
                                G.colorIndex, "none");
                        p || (q.tt = p = c.label(null, null, null, "callout", null, null, h.useHTML).addClass("highcharts-tooltip-box " + D).attr({ padding: h.padding, r: h.borderRadius, fill: h.backgroundColor, stroke: h.borderColor || f.color || G.color || "#333333", "stroke-width": h.borderWidth }).add(x));
                        p.isActive = !0;
                        p.attr({ text: a });
                        p.css(h.style).shadow(h.shadow);
                        a = p.getBBox();
                        G = a.width + p.strokeWidth();
                        f.isHeader ? (k = a.height, G = Math.max(0, Math.min(f.plotX + b.plotLeft - G / 2, b.chartWidth - G))) : G = f.plotX + b.plotLeft - u(h.distance, 16) -
                            G;
                        0 > G && (m = !1);
                        a = (f.series && f.series.yAxis && f.series.yAxis.pos) + (f.plotY || 0);
                        a -= b.plotTop;
                        e.push({ target: f.isHeader ? b.plotHeight + k : a, rank: f.isHeader ? 1 : 0, size: q.tt.getBBox().height + 1, point: f, x: G, tt: p })
                    }
                });
                this.cleanSplit();
                a.distribute(e, b.plotHeight + k);
                y(e, function(a) {
                    var c = a.point,
                        e = c.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: m || c.isHeader ? a.x : c.plotX + b.plotLeft + u(h.distance, 16),
                        y: a.pos + b.plotTop,
                        anchorX: c.isHeader ? c.plotX + b.plotLeft : c.plotX + e.xAxis.pos,
                        anchorY: c.isHeader ? a.pos +
                            b.plotTop - 15 : c.plotY + e.yAxis.pos
                    })
                })
            },
            updatePosition: function(a) {
                var f = this.chart,
                    d = this.getLabel(),
                    e = (this.options.positioner || this.getPosition).call(this, d.width, d.height, a),
                    b = a.plotX + f.plotLeft;
                a = a.plotY + f.plotTop;
                var c;
                this.outside && (c = (this.options.borderWidth || 0) + 2 * this.distance, this.renderer.setSize(d.width + c, d.height + c, !1), b += f.pointer.chartPosition.left - e.x, a += f.pointer.chartPosition.top - e.y);
                this.move(Math.round(e.x), Math.round(e.y || 0), b, a)
            },
            getDateFormat: function(a, d, k, e) {
                var b = this.chart.time,
                    c = b.dateFormat("%m-%d %H:%M:%S.%L", d),
                    f, h, q = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
                    x = "millisecond";
                for (h in g) { if (a === g.week && +b.dateFormat("%w", d) === k && "00:00:00.000" === c.substr(6)) { h = "week"; break } if (g[h] > a) { h = x; break } if (q[h] && c.substr(q[h]) !== "01-01 00:00:00.000".substr(q[h])) break; "week" !== h && (x = h) }
                h && (f = e[h]);
                return f
            },
            getXDateFormat: function(a, d, g) { d = d.dateTimeLabelFormats; var e = g && g.closestPointRange; return (e ? this.getDateFormat(e, a.x, g.options.startOfWeek, d) : d.day) || d.year },
            tooltipFooterHeaderFormatter: function(a,
                g) {
                g = g ? "footer" : "header";
                var f = a.series,
                    e = f.tooltipOptions,
                    b = e.xDateFormat,
                    c = f.xAxis,
                    m = c && "datetime" === c.options.type && d(a.key),
                    h = e[g + "Format"];
                m && !b && (b = this.getXDateFormat(a, e, c));
                m && b && y(a.point && a.point.tooltipDateKeys || ["key"], function(a) { h = h.replace("{point." + a + "}", "{point." + a + ":" + b + "}") });
                return n(h, { point: a, series: f }, this.chart.time)
            },
            bodyFormatter: function(a) {
                return l(a, function(a) {
                    var f = a.series.tooltipOptions;
                    return (f[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point,
                        f[(a.point.formatPrefix || "point") + "Format"])
                })
            }
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.attr,
            C = a.charts,
            n = a.color,
            d = a.css,
            l = a.defined,
            v = a.each,
            u = a.extend,
            t = a.find,
            k = a.fireEvent,
            g = a.isNumber,
            f = a.isObject,
            h = a.offset,
            q = a.pick,
            e = a.splat,
            b = a.Tooltip;
        a.Pointer = function(a, b) { this.init(a, b) };
        a.Pointer.prototype = {
            init: function(a, e) {
                this.options = e;
                this.chart = a;
                this.runChartClick = e.chart.events && !!e.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                b && (a.tooltip = new b(a, e.tooltip), this.followTouchMove =
                    q(e.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function(a) {
                var b = this.chart,
                    c = b.options.chart,
                    e = c.zoomType || "",
                    b = b.inverted;
                /touch/.test(a.type) && (e = q(c.pinchType, e));
                this.zoomX = a = /x/.test(e);
                this.zoomY = e = /y/.test(e);
                this.zoomHor = a && !b || e && b;
                this.zoomVert = e && !b || a && b;
                this.hasZoom = a || e
            },
            normalize: function(a, b) {
                var c;
                c = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                b || (this.chartPosition = b = h(this.chart.container));
                return u(a, {
                    chartX: Math.round(c.pageX - b.left),
                    chartY: Math.round(c.pageY -
                        b.top)
                })
            },
            getCoordinates: function(a) {
                var b = { xAxis: [], yAxis: [] };
                v(this.chart.axes, function(c) { b[c.isXAxis ? "xAxis" : "yAxis"].push({ axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"]) }) });
                return b
            },
            findNearestKDPoint: function(a, b, e) {
                var c;
                v(a, function(a) {
                    var m = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(e, m);
                    if ((m = f(a, !0)) && !(m = !f(c, !0))) var m = c.distX - a.distX,
                        d = c.dist - a.dist,
                        g = (a.series.group && a.series.group.zIndex) - (c.series.group && c.series.group.zIndex),
                        m = 0 <
                        (0 !== m && b ? m : 0 !== d ? d : 0 !== g ? g : c.series.index > a.series.index ? -1 : 1);
                    m && (c = a)
                });
                return c
            },
            getPointFromEvent: function(a) { a = a.target; for (var b; a && !b;) b = a.point, a = a.parentNode; return b },
            getChartCoordinatesFromPoint: function(a, b) {
                var c = a.series,
                    e = c.xAxis,
                    c = c.yAxis,
                    f = q(a.clientX, a.plotX),
                    m = a.shapeArgs;
                if (e && c) return b ? { chartX: e.len + e.pos - f, chartY: c.len + c.pos - a.plotY } : { chartX: f + e.pos, chartY: a.plotY + c.pos };
                if (m && m.x && m.y) return { chartX: m.x, chartY: m.y }
            },
            getHoverData: function(b, e, d, g, h, k, w) {
                var c, p = [],
                    m = w && w.isBoosting;
                g = !(!g || !b);
                w = e && !e.stickyTracking ? [e] : a.grep(d, function(a) { return a.visible && !(!h && a.directTouch) && q(a.options.enableMouseTracking, !0) && a.stickyTracking });
                e = (c = g ? b : this.findNearestKDPoint(w, h, k)) && c.series;
                c && (h && !e.noSharedTooltip ? (w = a.grep(d, function(a) { return a.visible && !(!h && a.directTouch) && q(a.options.enableMouseTracking, !0) && !a.noSharedTooltip }), v(w, function(a) {
                    var b = t(a.points, function(a) { return a.x === c.x && !a.isNull });
                    f(b) && (m && (b = a.getPoint(b)), p.push(b))
                })) : p.push(c));
                return {
                    hoverPoint: c,
                    hoverSeries: e,
                    hoverPoints: p
                }
            },
            runPointActions: function(b, e) {
                var c = this.chart,
                    f = c.tooltip && c.tooltip.options.enabled ? c.tooltip : void 0,
                    m = f ? f.shared : !1,
                    d = e || c.hoverPoint,
                    g = d && d.series || c.hoverSeries,
                    g = this.getHoverData(d, g, c.series, !!e || g && g.directTouch && this.isDirectTouch, m, b, { isBoosting: c.isBoosting }),
                    h, d = g.hoverPoint;
                h = g.hoverPoints;
                e = (g = g.hoverSeries) && g.tooltipOptions.followPointer;
                m = m && g && !g.noSharedTooltip;
                if (d && (d !== c.hoverPoint || f && f.isHidden)) {
                    v(c.hoverPoints || [], function(b) {
                        -1 === a.inArray(b,
                            h) && b.setState()
                    });
                    v(h || [], function(a) { a.setState("hover") });
                    if (c.hoverSeries !== g) g.onMouseOver();
                    c.hoverPoint && c.hoverPoint.firePointEvent("mouseOut");
                    if (!d.series) return;
                    d.firePointEvent("mouseOver");
                    c.hoverPoints = h;
                    c.hoverPoint = d;
                    f && f.refresh(m ? h : d, b)
                } else e && f && !f.isHidden && (d = f.getAnchor([{}], b), f.updatePosition({ plotX: d[0], plotY: d[1] }));
                this.unDocMouseMove || (this.unDocMouseMove = A(c.container.ownerDocument, "mousemove", function(b) { var c = C[a.hoverChartIndex]; if (c) c.pointer.onDocumentMouseMove(b) }));
                v(c.axes, function(c) {
                    var e = q(c.crosshair.snap, !0),
                        f = e ? a.find(h, function(a) { return a.series[c.coll] === c }) : void 0;
                    f || !e ? c.drawCrosshair(b, f) : c.hideCrosshair()
                })
            },
            reset: function(a, b) {
                var c = this.chart,
                    f = c.hoverSeries,
                    d = c.hoverPoint,
                    m = c.hoverPoints,
                    g = c.tooltip,
                    h = g && g.shared ? m : d;
                a && h && v(e(h), function(b) { b.series.isCartesian && void 0 === b.plotX && (a = !1) });
                if (a) g && h && (g.refresh(h), d && (d.setState(d.state, !0), v(c.axes, function(a) { a.crosshair && a.drawCrosshair(null, d) })));
                else {
                    if (d) d.onMouseOut();
                    m && v(m, function(a) { a.setState() });
                    if (f) f.onMouseOut();
                    g && g.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    v(c.axes, function(a) { a.hideCrosshair() });
                    this.hoverX = c.hoverPoints = c.hoverPoint = null
                }
            },
            scaleGroups: function(a, b) {
                var c = this.chart,
                    e;
                v(c.series, function(f) {
                    e = a || f.getPlotBox();
                    f.xAxis && f.xAxis.zoomEnabled && f.group && (f.group.attr(e), f.markerGroup && (f.markerGroup.attr(e), f.markerGroup.clip(b ? c.clipRect : null)), f.dataLabelsGroup && f.dataLabelsGroup.attr(e))
                });
                c.clipRect.attr(b || c.clipBox)
            },
            dragStart: function(a) {
                var b =
                    this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function(a) {
                var b = this.chart,
                    c = b.options.chart,
                    e = a.chartX,
                    f = a.chartY,
                    d = this.zoomHor,
                    g = this.zoomVert,
                    h = b.plotLeft,
                    p = b.plotTop,
                    k = b.plotWidth,
                    D = b.plotHeight,
                    q, l = this.selectionMarker,
                    r = this.mouseDownX,
                    z = this.mouseDownY,
                    t = c.panKey && a[c.panKey + "Key"];
                l && l.touch || (e < h ? e = h : e > h + k && (e = h + k), f < p ? f = p : f > p + D && (f = p + D), this.hasDragged = Math.sqrt(Math.pow(r - e, 2) + Math.pow(z - f, 2)), 10 < this.hasDragged &&
                    (q = b.isInsidePlot(r - h, z - p), b.hasCartesianSeries && (this.zoomX || this.zoomY) && q && !t && !l && (this.selectionMarker = l = b.renderer.rect(h, p, d ? 1 : k, g ? 1 : D, 0).attr({ fill: c.selectionMarkerFill || n("#335cad").setOpacity(.25).get(), "class": "highcharts-selection-marker", zIndex: 7 }).add()), l && d && (e -= r, l.attr({ width: Math.abs(e), x: (0 < e ? 0 : e) + r })), l && g && (e = f - z, l.attr({ height: Math.abs(e), y: (0 < e ? 0 : e) + z })), q && !l && c.panning && b.pan(a, c.panning)))
            },
            drop: function(a) {
                var b = this,
                    c = this.chart,
                    e = this.hasPinched;
                if (this.selectionMarker) {
                    var f = { originalEvent: a, xAxis: [], yAxis: [] },
                        h = this.selectionMarker,
                        q = h.attr ? h.attr("x") : h.x,
                        n = h.attr ? h.attr("y") : h.y,
                        p = h.attr ? h.attr("width") : h.width,
                        G = h.attr ? h.attr("height") : h.height,
                        D;
                    if (this.hasDragged || e) v(c.axes, function(c) {
                        if (c.zoomEnabled && l(c.min) && (e || b[{ xAxis: "zoomX", yAxis: "zoomY" }[c.coll]])) {
                            var d = c.horiz,
                                m = "touchend" === a.type ? c.minPixelPadding : 0,
                                g = c.toValue((d ? q : n) + m),
                                d = c.toValue((d ? q + p : n + G) - m);
                            f[c.coll].push({ axis: c, min: Math.min(g, d), max: Math.max(g, d) });
                            D = !0
                        }
                    }), D && k(c, "selection", f, function(a) {
                        c.zoom(u(a,
                            e ? { animation: !1 } : null))
                    });
                    g(c.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    e && this.scaleGroups()
                }
                c && g(c.index) && (d(c.container, { cursor: c._cursor }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(a) {
                a = this.normalize(a);
                2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            },
            onDocumentMouseUp: function(b) { C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(b) },
            onDocumentMouseMove: function(a) {
                var b =
                    this.chart,
                    c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function(b) {
                var c = C[a.hoverChartIndex];
                c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
            },
            onContainerMouseMove: function(b) {
                var c = this.chart;
                l(a.hoverChartIndex) && C[a.hoverChartIndex] && C[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === c.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
            },
            inClass: function(a, b) {
                for (var c; a;) {
                    if (c = y(a, "class")) { if (-1 !== c.indexOf(b)) return !0; if (-1 !== c.indexOf("highcharts-container")) return !1 }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function(a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") ||
                        this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function(a) {
                var b = this.chart,
                    c = b.hoverPoint,
                    e = b.plotLeft,
                    f = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (k(c.series, "click", u(a, { point: c })), b.hoverPoint && c.firePointEvent("click", a)) : (u(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - e, a.chartY - f) && k(b, "click", a)))
            },
            setDOMEvents: function() {
                var b = this,
                    e = b.chart.container,
                    f = e.ownerDocument;
                e.onmousedown = function(a) { b.onContainerMouseDown(a) };
                e.onmousemove = function(a) { b.onContainerMouseMove(a) };
                e.onclick = function(a) { b.onContainerClick(a) };
                this.unbindContainerMouseLeave = A(e, "mouseleave", b.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = A(f, "mouseup", b.onDocumentMouseUp));
                a.hasTouch && (e.ontouchstart = function(a) { b.onContainerTouchStart(a) }, e.ontouchmove = function(a) { b.onContainerTouchMove(a) }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = A(f, "touchend", b.onDocumentTouchEnd)))
            },
            destroy: function() {
                var b = this;
                b.unDocMouseMove && b.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function(a, c) { b[c] = null })
            }
        }
    })(K);
    (function(a) {
        var A = a.charts,
            y = a.each,
            C = a.extend,
            n = a.map,
            d = a.noop,
            l = a.pick;
        C(a.Pointer.prototype, {
            pinchTranslate: function(a, d, l, k, g, f) {
                this.zoomHor &&
                    this.pinchTranslateDirection(!0, a, d, l, k, g, f);
                this.zoomVert && this.pinchTranslateDirection(!1, a, d, l, k, g, f)
            },
            pinchTranslateDirection: function(a, d, l, k, g, f, h, q) {
                var e = this.chart,
                    b = a ? "x" : "y",
                    c = a ? "X" : "Y",
                    m = "chart" + c,
                    n = a ? "width" : "height",
                    t = e["plot" + (a ? "Left" : "Top")],
                    x, v, w = q || 1,
                    F = e.inverted,
                    p = e.bounds[a ? "h" : "v"],
                    G = 1 === d.length,
                    D = d[0][m],
                    J = l[0][m],
                    H = !G && d[1][m],
                    r = !G && l[1][m],
                    z;
                l = function() {
                    !G && 20 < Math.abs(D - H) && (w = q || Math.abs(J - r) / Math.abs(D - H));
                    v = (t - J) / w + D;
                    x = e["plot" + (a ? "Width" : "Height")] / w
                };
                l();
                d = v;
                d < p.min ?
                    (d = p.min, z = !0) : d + x > p.max && (d = p.max - x, z = !0);
                z ? (J -= .8 * (J - h[b][0]), G || (r -= .8 * (r - h[b][1])), l()) : h[b] = [J, r];
                F || (f[b] = v - t, f[n] = x);
                f = F ? 1 / w : w;
                g[n] = x;
                g[b] = d;
                k[F ? a ? "scaleY" : "scaleX" : "scale" + c] = w;
                k["translate" + c] = f * t + (J - f * D)
            },
            pinch: function(a) {
                var u = this,
                    t = u.chart,
                    k = u.pinchDown,
                    g = a.touches,
                    f = g.length,
                    h = u.lastValidTouch,
                    q = u.hasZoom,
                    e = u.selectionMarker,
                    b = {},
                    c = 1 === f && (u.inClass(a.target, "highcharts-tracker") && t.runTrackerClick || u.runChartClick),
                    m = {};
                1 < f && (u.initiated = !0);
                q && u.initiated && !c && a.preventDefault();
                n(g, function(a) { return u.normalize(a) });
                "touchstart" === a.type ? (y(g, function(a, b) { k[b] = { chartX: a.chartX, chartY: a.chartY } }), h.x = [k[0].chartX, k[1] && k[1].chartX], h.y = [k[0].chartY, k[1] && k[1].chartY], y(t.axes, function(a) {
                        if (a.zoomEnabled) {
                            var b = t.bounds[a.horiz ? "h" : "v"],
                                c = a.minPixelPadding,
                                e = a.toPixels(l(a.options.min, a.dataMin)),
                                f = a.toPixels(l(a.options.max, a.dataMax)),
                                d = Math.max(e, f);
                            b.min = Math.min(a.pos, Math.min(e, f) - c);
                            b.max = Math.max(a.pos + a.len, d + c)
                        }
                    }), u.res = !0) : u.followTouchMove && 1 === f ? this.runPointActions(u.normalize(a)) :
                    k.length && (e || (u.selectionMarker = e = C({ destroy: d, touch: !0 }, t.plotBox)), u.pinchTranslate(k, g, b, e, m, h), u.hasPinched = q, u.scaleGroups(b, m), u.res && (u.res = !1, this.reset(!1, 0)))
            },
            touch: function(d, n) {
                var t = this.chart,
                    k, g;
                if (t.index !== a.hoverChartIndex) this.onContainerMouseLeave({ relatedTarget: !0 });
                a.hoverChartIndex = t.index;
                1 === d.touches.length ? (d = this.normalize(d), (g = t.isInsidePlot(d.chartX - t.plotLeft, d.chartY - t.plotTop)) && !t.openMenu ? (n && this.runPointActions(d), "touchmove" === d.type && (n = this.pinchDown, k = n[0] ?
                    4 <= Math.sqrt(Math.pow(n[0].chartX - d.chartX, 2) + Math.pow(n[0].chartY - d.chartY, 2)) : !1), l(k, !0) && this.pinch(d)) : n && this.reset()) : 2 === d.touches.length && this.pinch(d)
            },
            onContainerTouchStart: function(a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function(a) { this.touch(a) },
            onDocumentTouchEnd: function(d) { A[a.hoverChartIndex] && A[a.hoverChartIndex].pointer.drop(d) }
        })
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.charts,
            C = a.css,
            n = a.doc,
            d = a.extend,
            l = a.noop,
            v = a.Pointer,
            u = a.removeEvent,
            t = a.win,
            k = a.wrap;
        if (!a.hasTouch && (t.PointerEvent || t.MSPointerEvent)) {
            var g = {},
                f = !!t.PointerEvent,
                h = function() {
                    var e = [];
                    e.item = function(a) { return this[a] };
                    a.objectEach(g, function(a) { e.push({ pageX: a.pageX, pageY: a.pageY, target: a.target }) });
                    return e
                },
                q = function(e, b, c, f) { "touch" !== e.pointerType && e.pointerType !== e.MSPOINTER_TYPE_TOUCH || !y[a.hoverChartIndex] || (f(e), f = y[a.hoverChartIndex].pointer, f[b]({ type: c, target: e.currentTarget, preventDefault: l, touches: h() })) };
            d(v.prototype, {
                onContainerPointerDown: function(a) {
                    q(a, "onContainerTouchStart",
                        "touchstart",
                        function(a) { g[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget } })
                },
                onContainerPointerMove: function(a) {
                    q(a, "onContainerTouchMove", "touchmove", function(a) {
                        g[a.pointerId] = { pageX: a.pageX, pageY: a.pageY };
                        g[a.pointerId].target || (g[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function(a) { q(a, "onDocumentTouchEnd", "touchend", function(a) { delete g[a.pointerId] }) },
                batchMSEvents: function(a) {
                    a(this.chart.container, f ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, f ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(n, f ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            k(v.prototype, "init", function(a, b, c) {
                a.call(this, b, c);
                this.hasZoom && C(b.container, { "-ms-touch-action": "none", "touch-action": "none" })
            });
            k(v.prototype, "setDOMEvents", function(a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(A)
            });
            k(v.prototype, "destroy", function(a) {
                this.batchMSEvents(u);
                a.call(this)
            })
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.css,
            C = a.discardElement,
            n = a.defined,
            d = a.each,
            l = a.fireEvent,
            v = a.isFirefox,
            u = a.marginNames,
            t = a.merge,
            k = a.pick,
            g = a.setAnimation,
            f = a.stableSort,
            h = a.win,
            q = a.wrap;
        a.Legend = function(a, b) { this.init(a, b) };
        a.Legend.prototype = {
            init: function(a, b) {
                this.chart = a;
                this.setOptions(b);
                b.enabled && (this.render(), A(this.chart, "endResize", function() { this.legend.positionCheckboxes() }), this.proximate ? this.unchartrender = A(this.chart, "render", function() {
                        this.legend.proximatePositions();
                        this.legend.positionItems()
                    }) : this.unchartrender &&
                    this.unchartrender())
            },
            setOptions: function(a) {
                var b = k(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = t(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = b;
                this.initialItemY = b - 5;
                this.symbolWidth = k(a.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === a.layout && !this.chart.inverted
            },
            update: function(a, b) {
                var c = this.chart;
                this.setOptions(t(!0, this.options, a));
                this.destroy();
                c.isDirtyLegend = c.isDirtyBox = !0;
                k(b, !0) && c.redraw();
                l(this,
                    "afterUpdate")
            },
            colorizeItem: function(a, b) {
                a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var c = this.options,
                    e = a.legendItem,
                    f = a.legendLine,
                    d = a.legendSymbol,
                    g = this.itemHiddenStyle.color,
                    c = b ? c.itemStyle.color : g,
                    h = b ? a.color || g : g,
                    k = a.options && a.options.marker,
                    q = { fill: h };
                e && e.css({ fill: c, color: c });
                f && f.attr({ stroke: h });
                d && (k && d.isMarker && (q = a.pointAttribs(), b || (q.stroke = q.fill = g)), d.attr(q));
                l(this, "afterColorizeItem", { item: a, visible: b })
            },
            positionItems: function() {
                d(this.allItems,
                    this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            },
            positionItem: function(a) {
                var b = this.options,
                    c = b.symbolPadding,
                    b = !b.rtl,
                    e = a._legendItemPos,
                    f = e[0],
                    e = e[1],
                    d = a.checkbox;
                if ((a = a.legendGroup) && a.element) a[n(a.translateY) ? "animate" : "attr"]({ translateX: b ? f : this.legendWidth - f - 2 * c - 4, translateY: e });
                d && (d.x = f, d.y = e)
            },
            destroyItem: function(a) {
                var b = a.checkbox;
                d(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) { a[b] && (a[b] = a[b].destroy()) });
                b && C(a.checkbox)
            },
            destroy: function() {
                function a(a) {
                    this[a] &&
                        (this[a] = this[a].destroy())
                }
                d(this.getAllItems(), function(b) { d(["legendItem", "legendGroup"], a, b) });
                d("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null
            },
            positionCheckboxes: function() {
                var a = this.group && this.group.alignAttr,
                    b, c = this.clipHeight || this.legendHeight,
                    f = this.titleHeight;
                a && (b = a.translateY, d(this.allItems, function(e) {
                    var d = e.checkbox,
                        g;
                    d && (g = b + f + d.y + (this.scrollOffset || 0) + 3, y(d, {
                        left: a.translateX + e.checkboxOffset + d.x - 20 + "px",
                        top: g + "px",
                        display: g > b - 6 && g < b + c - 6 ?
                            "" : "none"
                    }))
                }, this))
            },
            renderTitle: function() {
                var a = this.options,
                    b = this.padding,
                    c = a.title,
                    f = 0;
                c.text && (this.title || (this.title = this.chart.renderer.label(c.text, b - 3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({ zIndex: 1 }).css(c.style).add(this.group)), a = this.title.getBBox(), f = a.height, this.offsetWidth = a.width, this.contentGroup.attr({ translateY: f }));
                this.titleHeight = f
            },
            setText: function(e) {
                var b = this.options;
                e.legendItem.attr({ text: b.labelFormat ? a.format(b.labelFormat, e, this.chart.time) : b.labelFormatter.call(e) })
            },
            renderItem: function(a) {
                var b = this.chart,
                    c = b.renderer,
                    e = this.options,
                    f = this.symbolWidth,
                    d = e.symbolPadding,
                    g = this.itemStyle,
                    h = this.itemHiddenStyle,
                    q = "horizontal" === e.layout ? k(e.itemDistance, 20) : 0,
                    l = !e.rtl,
                    p = a.legendItem,
                    G = !a.series,
                    D = !G && a.series.drawLegendSymbol ? a.series : a,
                    n = D.options,
                    n = this.createCheckboxForItem && n && n.showCheckbox,
                    q = f + d + q + (n ? 20 : 0),
                    H = e.useHTML,
                    r = a.options.className;
                p || (a.legendGroup = c.g("legend-item").addClass("highcharts-" + D.type + "-series highcharts-color-" + a.colorIndex + (r ? " " + r :
                    "") + (G ? " highcharts-series-" + a.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), a.legendItem = p = c.text("", l ? f + d : -d, this.baseline || 0, H).css(t(a.visible ? g : h)).attr({ align: l ? "left" : "right", zIndex: 2 }).add(a.legendGroup), this.baseline || (f = g.fontSize, this.fontMetrics = c.fontMetrics(f, p), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, p.attr("y", this.baseline)), this.symbolHeight = e.symbolHeight || this.fontMetrics.f, D.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, p, H), n && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                g.width || p.css({ width: (e.itemWidth || e.width || b.spacingBox.width) - q });
                this.setText(a);
                b = p.getBBox();
                a.itemWidth = a.checkboxOffset = e.itemWidth || a.legendItemWidth || b.width + q;
                this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                this.totalItemWidth += a.itemWidth;
                this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || b.height || this.symbolHeight)
            },
            layoutItem: function(a) {
                var b = this.options,
                    c = this.padding,
                    e = "horizontal" === b.layout,
                    f = a.itemHeight,
                    d = b.itemMarginBottom ||
                    0,
                    g = this.itemMarginTop,
                    h = e ? k(b.itemDistance, 20) : 0,
                    q = b.width,
                    l = q || this.chart.spacingBox.width - 2 * c - b.x,
                    b = b.alignColumns && this.totalItemWidth > l ? this.maxItemWidth : a.itemWidth;
                e && this.itemX - c + b > l && (this.itemX = c, this.itemY += g + this.lastLineHeight + d, this.lastLineHeight = 0);
                this.lastItemY = g + this.itemY + d;
                this.lastLineHeight = Math.max(f, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                e ? this.itemX += b : (this.itemY += g + f + d, this.lastLineHeight = f);
                this.offsetWidth = q || Math.max((e ? this.itemX - c - (a.checkbox ?
                    0 : h) : b) + c, this.offsetWidth)
            },
            getAllItems: function() {
                var a = [];
                d(this.chart.series, function(b) {
                    var c = b && b.options;
                    b && k(c.showInLegend, n(c.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
                });
                l(this, "afterGetAllItems", { allItems: a });
                return a
            },
            getAlignment: function() { var a = this.options; return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0) },
            adjustMargins: function(a, b) {
                var c = this.chart,
                    e = this.options,
                    f = this.getAlignment();
                f && d([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(d, g) { d.test(f) && !n(a[g]) && (c[u[g]] = Math.max(c[u[g]], c.legend[(g + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][g] * e[g % 2 ? "x" : "y"] + k(e.margin, 12) + b[g] + (0 === g && void 0 !== c.options.title.margin ? c.titleOffset + c.options.title.margin : 0))) })
            },
            proximatePositions: function() {
                var e = this.chart,
                    b = [],
                    c = "left" === this.options.align;
                d(this.allItems, function(f) {
                    var d, g;
                    d = c;
                    f.xAxis && f.points && (f.xAxis.options.reversed && (d = !d), d = a.find(d ? f.points : f.points.slice(0).reverse(), function(b) { return a.isNumber(b.plotY) }), g = f.legendGroup.getBBox().height, b.push({ target: f.visible ? d.plotY - .3 * g : e.plotHeight, size: g, item: f }))
                }, this);
                a.distribute(b, e.plotHeight);
                d(b, function(a) { a.item._legendItemPos[1] = e.plotTop - e.spacing[0] + a.pos })
            },
            render: function() {
                var a = this.chart,
                    b = a.renderer,
                    c = this.group,
                    g, h, k, q = this.box,
                    l = this.options,
                    w = this.padding;
                this.itemX = w;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth = 0;
                c || (this.group =
                    c = b.g("legend").attr({ zIndex: 7 }).add(), this.contentGroup = b.g().attr({ zIndex: 1 }).add(c), this.scrollGroup = b.g().add(this.contentGroup));
                this.renderTitle();
                g = this.getAllItems();
                f(g, function(a, b) { return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0) });
                l.reversed && g.reverse();
                this.allItems = g;
                this.display = h = !!g.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                d(g, this.renderItem, this);
                d(g, this.layoutItem, this);
                g = (l.width || this.offsetWidth) + w;
                k = this.lastItemY + this.lastLineHeight + this.titleHeight;
                k = this.handleOverflow(k);
                k += w;
                q || (this.box = q = b.rect().addClass("highcharts-legend-box").attr({ r: l.borderRadius }).add(c), q.isNew = !0);
                q.attr({ stroke: l.borderColor, "stroke-width": l.borderWidth || 0, fill: l.backgroundColor || "none" }).shadow(l.shadow);
                0 < g && 0 < k && (q[q.isNew ? "attr" : "animate"](q.crisp.call({}, { x: 0, y: 0, width: g, height: k }, q.strokeWidth())), q.isNew = !1);
                q[h ? "show" : "hide"]();
                this.legendWidth = g;
                this.legendHeight = k;
                h && (b = a.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) &&
                    (b = t(b, { y: b.y + a.titleOffset + a.options.title.margin })), c.align(t(l, { width: g, height: k, verticalAlign: this.proximate ? "top" : l.verticalAlign }), !0, b));
                this.proximate || this.positionItems()
            },
            handleOverflow: function(a) {
                var b = this,
                    c = this.chart,
                    e = c.renderer,
                    f = this.options,
                    g = f.y,
                    h = this.padding,
                    c = c.spacingBox.height + ("top" === f.verticalAlign ? -g : g) - h,
                    g = f.maxHeight,
                    q, l = this.clipRect,
                    n = f.navigation,
                    p = k(n.animation, !0),
                    G = n.arrowSize || 12,
                    D = this.nav,
                    t = this.pages,
                    H, r = this.allItems,
                    z = function(a) {
                        "number" === typeof a ? l.attr({ height: a }) :
                            l && (b.clipRect = l.destroy(), b.contentGroup.clip());
                        b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + h + "px,9999px," + (h + a) + "px,0)" : "auto")
                    };
                "horizontal" !== f.layout || "middle" === f.verticalAlign || f.floating || (c /= 2);
                g && (c = Math.min(c, g));
                t.length = 0;
                a > c && !1 !== n.enabled ? (this.clipHeight = q = Math.max(c - 20 - this.titleHeight - h, 0), this.currentPage = k(this.currentPage, 1), this.fullHeight = a, d(r, function(a, b) {
                    var c = a._legendItemPos[1],
                        e = Math.round(a.legendItem.getBBox().height),
                        f = t.length;
                    if (!f || c - t[f - 1] > q &&
                        (H || c) !== t[f - 1]) t.push(H || c), f++;
                    a.pageIx = f - 1;
                    H && (r[b - 1].pageIx = f - 1);
                    b === r.length - 1 && c + e - t[f - 1] > q && (t.push(c), a.pageIx = f);
                    c !== H && (H = c)
                }), l || (l = b.clipRect = e.clipRect(0, h, 9999, 0), b.contentGroup.clip(l)), z(q), D || (this.nav = D = e.g().attr({ zIndex: 1 }).add(this.group), this.up = e.symbol("triangle", 0, 0, G, G).on("click", function() { b.scroll(-1, p) }).add(D), this.pager = e.text("", 15, 10).addClass("highcharts-legend-navigation").css(n.style).add(D), this.down = e.symbol("triangle-down", 0, 0, G, G).on("click", function() {
                    b.scroll(1,
                        p)
                }).add(D)), b.scroll(0), a = c) : D && (z(), this.nav = D.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0);
                return a
            },
            scroll: function(a, b) {
                var c = this.pages,
                    e = c.length;
                a = this.currentPage + a;
                var f = this.clipHeight,
                    d = this.options.navigation,
                    h = this.pager,
                    k = this.padding;
                a > e && (a = e);
                0 < a && (void 0 !== b && g(b, this.chart), this.nav.attr({ translateX: k, translateY: f + this.padding + 7 + this.titleHeight, visibility: "visible" }), this.up.attr({ "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }),
                    h.attr({ text: a + "/" + e }), this.down.attr({ x: 18 + this.pager.getBBox().width, "class": a === e ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }), this.up.attr({ fill: 1 === a ? d.inactiveColor : d.activeColor }).css({ cursor: 1 === a ? "default" : "pointer" }), this.down.attr({ fill: a === e ? d.inactiveColor : d.activeColor }).css({ cursor: a === e ? "default" : "pointer" }), this.scrollOffset = -c[a - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = a, this.positionCheckboxes())
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function(a, b) {
                var c = a.symbolHeight,
                    e = a.options.squareSymbol;
                b.legendSymbol = this.chart.renderer.rect(e ? (a.symbolWidth - c) / 2 : 0, a.baseline - c + 1, e ? c : a.symbolWidth, c, k(a.options.symbolRadius, c / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(b.legendGroup)
            },
            drawLineMarker: function(a) {
                var b = this.options,
                    c = b.marker,
                    e = a.symbolWidth,
                    f = a.symbolHeight,
                    d = f / 2,
                    g = this.chart.renderer,
                    h = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var q;
                q = { "stroke-width": b.lineWidth || 0 };
                b.dashStyle &&
                    (q.dashstyle = b.dashStyle);
                this.legendLine = g.path(["M", 0, a, "L", e, a]).addClass("highcharts-graph").attr(q).add(h);
                c && !1 !== c.enabled && e && (b = Math.min(k(c.radius, d), d), 0 === this.symbol.indexOf("url") && (c = t(c, { width: f, height: f }), b = 0), this.legendSymbol = c = g.symbol(this.symbol, e / 2 - b, a - b, 2 * b, 2 * b, c).addClass("highcharts-point").add(h), c.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(h.navigator.userAgent) || v) && q(a.Legend.prototype, "positionItem", function(a, b) {
            var c = this,
                e = function() { b._legendItemPos && a.call(c, b) };
            e();
            setTimeout(e)
        })
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.animate,
            C = a.animObject,
            n = a.attr,
            d = a.doc,
            l = a.Axis,
            v = a.createElement,
            u = a.defaultOptions,
            t = a.discardElement,
            k = a.charts,
            g = a.css,
            f = a.defined,
            h = a.each,
            q = a.extend,
            e = a.find,
            b = a.fireEvent,
            c = a.grep,
            m = a.isNumber,
            B = a.isObject,
            I = a.isString,
            x = a.Legend,
            M = a.marginNames,
            w = a.merge,
            F = a.objectEach,
            p = a.Pointer,
            G = a.pick,
            D = a.pInt,
            J = a.removeEvent,
            H = a.seriesTypes,
            r = a.splat,
            z = a.syncTimeout,
            N = a.win,
            S = a.Chart = function() { this.getArgs.apply(this, arguments) };
        a.chart = function(a,
            b, c) { return new S(a, b, c) };
        q(S.prototype, {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                if (I(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function(c, e) {
                var f, d, p = c.series,
                    g = c.plotOptions || {};
                b(this, "init", { args: arguments }, function() {
                    c.series = null;
                    f = w(u, c);
                    for (d in f.plotOptions) f.plotOptions[d].tooltip = g[d] && w(g[d].tooltip) || void 0;
                    f.tooltip.userOptions = c.chart && c.chart.forExport && c.tooltip.userOptions || c.tooltip;
                    f.series = c.series = p;
                    this.userOptions = c;
                    var h =
                        f.chart,
                        r = h.events;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = { h: {}, v: {} };
                    this.labelCollectors = [];
                    this.callback = e;
                    this.isResizing = 0;
                    this.options = f;
                    this.axes = [];
                    this.series = [];
                    this.time = c.time && a.keys(c.time).length ? new a.Time(c.time) : a.time;
                    this.hasCartesianSeries = h.showAxes;
                    var m = this;
                    m.index = k.length;
                    k.push(m);
                    a.chartCount++;
                    r && F(r, function(a, b) { A(m, b, a) });
                    m.xAxis = [];
                    m.yAxis = [];
                    m.pointCount = m.colorCounter = m.symbolCounter = 0;
                    b(m, "afterInit");
                    m.firstRender()
                })
            },
            initSeries: function(b) {
                var c = this.options.chart;
                (c = H[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            },
            orderSeries: function(a) { var b = this.series; for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName()) },
            isInsidePlot: function(a, b, c) {
                var e = c ? b : a;
                a = c ? a : b;
                return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function(c) {
                b(this, "beforeRedraw");
                var e = this.axes,
                    f = this.series,
                    d = this.pointer,
                    p = this.legend,
                    g = this.isDirtyLegend,
                    k, r, m = this.hasCartesianSeries,
                    l = this.isDirtyBox,
                    D, G = this.renderer,
                    n = G.isHidden(),
                    H = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(c, this);
                n && this.temporaryDisplay();
                this.layOutTitles();
                for (c = f.length; c--;)
                    if (D = f[c], D.options.stacking && (k = !0, D.isDirty)) { r = !0; break }
                if (r)
                    for (c = f.length; c--;) D = f[c], D.options.stacking && (D.isDirty = !0);
                h(f, function(a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), g = !0);
                    a.isDirtyData && b(a, "updatedData")
                });
                g && p.options.enabled && (p.render(), this.isDirtyLegend = !1);
                k && this.getStacks();
                m && h(e, function(a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                m && (h(e, function(a) { a.isDirty && (l = !0) }), h(e, function(a) {
                    var c = a.min + "," + a.max;
                    a.extKey !== c && (a.extKey = c, H.push(function() {
                        b(a, "afterSetExtremes", q(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (l || k) && a.redraw()
                }));
                l && this.drawChartBox();
                b(this, "predraw");
                h(f, function(a) {
                    (l || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                d && d.reset(!0);
                G.draw();
                b(this, "redraw");
                b(this, "render");
                n && this.temporaryDisplay(!0);
                h(H, function(a) { a.call() })
            },
            get: function(a) {
                function b(b) {
                    return b.id ===
                        a || b.options && b.options.id === a
                }
                var c, f = this.series,
                    d;
                c = e(this.axes, b) || e(this.series, b);
                for (d = 0; !c && d < f.length; d++) c = e(f[d].points || [], b);
                return c
            },
            getAxes: function() {
                var a = this,
                    c = this.options,
                    e = c.xAxis = r(c.xAxis || {}),
                    c = c.yAxis = r(c.yAxis || {});
                b(this, "getAxes");
                h(e, function(a, b) {
                    a.index = b;
                    a.isX = !0
                });
                h(c, function(a, b) { a.index = b });
                e = e.concat(c);
                h(e, function(b) { new l(a, b) });
                b(this, "afterGetAxes")
            },
            getSelectedPoints: function() {
                var a = [];
                h(this.series, function(b) { a = a.concat(c(b.data || [], function(a) { return a.selected })) });
                return a
            },
            getSelectedSeries: function() { return c(this.series, function(a) { return a.selected }) },
            setTitle: function(a, b, c) {
                var e = this,
                    f = e.options,
                    d;
                d = f.title = w({ style: { color: "#333333", fontSize: f.isStock ? "16px" : "18px" } }, f.title, a);
                f = f.subtitle = w({ style: { color: "#666666" } }, f.subtitle, b);
                h([
                    ["title", a, d],
                    ["subtitle", b, f]
                ], function(a, b) {
                    var c = a[0],
                        f = e[c],
                        d = a[1];
                    a = a[2];
                    f && d && (e[c] = f = f.destroy());
                    a && !f && (e[c] = e.renderer.text(a.text, 0, 0, a.useHTML).attr({ align: a.align, "class": "highcharts-" + c, zIndex: a.zIndex || 4 }).add(),
                        e[c].update = function(a) { e.setTitle(!b && a, b && a) }, e[c].css(a.style))
                });
                e.layOutTitles(c)
            },
            layOutTitles: function(a) {
                var b = 0,
                    c, e = this.renderer,
                    f = this.spacingBox;
                h(["title", "subtitle"], function(a) {
                    var c = this[a],
                        d = this.options[a];
                    a = "title" === a ? -3 : d.verticalAlign ? 0 : b + 2;
                    var p;
                    c && (p = d.style.fontSize, p = e.fontMetrics(p, c).b, c.css({ width: (d.width || f.width + d.widthAdjust) + "px" }).align(q({ y: a + p }, d), !1, "spacingBox"), d.floating || d.verticalAlign || (b = Math.ceil(b + c.getBBox(d.useHTML).height)))
                }, this);
                c = this.titleOffset !==
                    b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = this.isDirtyLegend = c, this.hasRendered && G(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var b = this.options.chart,
                    c = b.width,
                    b = b.height,
                    e = this.renderTo;
                f(c) || (this.containerWidth = a.getStyle(e, "width"));
                f(b) || (this.containerHeight = a.getStyle(e, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            },
            temporaryDisplay: function(b) {
                var c = this.renderTo;
                if (b)
                    for (; c && c.style;) c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (d.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
                else
                    for (; c && c.style;) {
                        d.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, d.body.appendChild(c));
                        if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = { display: c.style.display, height: c.style.height, overflow: c.style.overflow }, b = { display: "block", overflow: "hidden" }, c !== this.renderTo &&
                            (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
                        c = c.parentNode;
                        if (c === d.body) break
                    }
            },
            setClassName: function(a) { this.container.className = "highcharts-container " + (a || "") },
            getContainer: function() {
                var c, e = this.options,
                    f = e.chart,
                    p, g;
                c = this.renderTo;
                var h = a.uniqueKey(),
                    r;
                c || (this.renderTo = c = f.renderTo);
                I(c) && (this.renderTo = c = d.getElementById(c));
                c || a.error(13, !0);
                p = D(n(c, "data-highcharts-chart"));
                m(p) && k[p] && k[p].hasRendered && k[p].destroy();
                n(c, "data-highcharts-chart",
                    this.index);
                c.innerHTML = "";
                f.skipClone || c.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                p = this.chartWidth;
                g = this.chartHeight;
                r = q({ position: "relative", overflow: "hidden", width: p + "px", height: g + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)" }, f.style);
                this.container = c = v("div", { id: h }, r, c);
                this._cursor = c.style.cursor;
                this.renderer = new(a[f.renderer] || a.Renderer)(c, p, g, null, f.forExport, e.exporting && e.exporting.allowHTML);
                this.setClassName(f.className);
                this.renderer.setStyle(f.style);
                this.renderer.chartIndex = this.index;
                b(this, "afterGetContainer")
            },
            getMargins: function(a) {
                var c = this.spacing,
                    e = this.margin,
                    d = this.titleOffset;
                this.resetMargins();
                d && !f(e[0]) && (this.plotTop = Math.max(this.plotTop, d + this.options.title.margin + c[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(e, c);
                b(this, "getMargins");
                a || this.getAxisMargins()
            },
            getAxisMargins: function() {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    c = a.margin;
                a.hasCartesianSeries && h(a.axes, function(a) {
                    a.visible &&
                        a.getOffset()
                });
                h(M, function(e, d) { f(c[d]) || (a[e] += b[d]) });
                a.setChartSize()
            },
            reflow: function(b) {
                var c = this,
                    e = c.options.chart,
                    p = c.renderTo,
                    g = f(e.width) && f(e.height),
                    h = e.width || a.getStyle(p, "width"),
                    e = e.height || a.getStyle(p, "height"),
                    p = b ? b.target : N;
                if (!g && !c.isPrinting && h && e && (p === N || p === d)) {
                    if (h !== c.containerWidth || e !== c.containerHeight) a.clearTimeout(c.reflowTimeout), c.reflowTimeout = z(function() { c.container && c.setSize(void 0, void 0, !1) }, b ? 100 : 0);
                    c.containerWidth = h;
                    c.containerHeight = e
                }
            },
            setReflow: function(a) {
                var b =
                    this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = A(N, "resize", function(a) { b.reflow(a) }), A(this, "destroy", this.unbindReflow))
            },
            setSize: function(c, e, f) {
                var d = this,
                    p = d.renderer;
                d.isResizing += 1;
                a.setAnimation(f, d);
                d.oldChartHeight = d.chartHeight;
                d.oldChartWidth = d.chartWidth;
                void 0 !== c && (d.options.chart.width = c);
                void 0 !== e && (d.options.chart.height = e);
                d.getChartSize();
                c = p.globalAnimation;
                (c ? y : g)(d.container, {
                    width: d.chartWidth + "px",
                    height: d.chartHeight +
                        "px"
                }, c);
                d.setChartSize(!0);
                p.setSize(d.chartWidth, d.chartHeight, f);
                h(d.axes, function(a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                d.isDirtyLegend = !0;
                d.isDirtyBox = !0;
                d.layOutTitles();
                d.getMargins();
                d.redraw(f);
                d.oldChartHeight = null;
                b(d, "resize");
                z(function() { d && b(d, "endResize", null, function() {--d.isResizing }) }, C(c).duration)
            },
            setChartSize: function(a) {
                var c = this.inverted,
                    e = this.renderer,
                    f = this.chartWidth,
                    d = this.chartHeight,
                    p = this.options.chart,
                    g = this.spacing,
                    k = this.clipOffset,
                    r, m, q, l;
                this.plotLeft = r = Math.round(this.plotLeft);
                this.plotTop = m = Math.round(this.plotTop);
                this.plotWidth = q = Math.max(0, Math.round(f - r - this.marginRight));
                this.plotHeight = l = Math.max(0, Math.round(d - m - this.marginBottom));
                this.plotSizeX = c ? l : q;
                this.plotSizeY = c ? q : l;
                this.plotBorderWidth = p.plotBorderWidth || 0;
                this.spacingBox = e.spacingBox = { x: g[3], y: g[0], width: f - g[3] - g[1], height: d - g[0] - g[2] };
                this.plotBox = e.plotBox = { x: r, y: m, width: q, height: l };
                f = 2 * Math.floor(this.plotBorderWidth / 2);
                c = Math.ceil(Math.max(f, k[3]) / 2);
                e = Math.ceil(Math.max(f, k[0]) / 2);
                this.clipBox = {
                    x: c,
                    y: e,
                    width: Math.floor(this.plotSizeX - Math.max(f, k[1]) / 2 - c),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(f, k[2]) / 2 - e))
                };
                a || h(this.axes, function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                });
                b(this, "afterSetChartSize", { skipAxes: a })
            },
            resetMargins: function() {
                var a = this,
                    b = a.options.chart;
                h(["margin", "spacing"], function(c) {
                    var e = b[c],
                        f = B(e) ? e : [e, e, e, e];
                    h(["Top", "Right", "Bottom", "Left"], function(e, d) { a[c][d] = G(b[c + e], f[d]) })
                });
                h(M, function(b, c) { a[b] = G(a.margin[c], a.spacing[c]) });
                a.axisOffset = [0, 0, 0,
                    0
                ];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var a = this.options.chart,
                    c = this.renderer,
                    e = this.chartWidth,
                    f = this.chartHeight,
                    d = this.chartBackground,
                    p = this.plotBackground,
                    g = this.plotBorder,
                    h, k = this.plotBGImage,
                    r = a.backgroundColor,
                    m = a.plotBackgroundColor,
                    q = a.plotBackgroundImage,
                    l, D = this.plotLeft,
                    G = this.plotTop,
                    n = this.plotWidth,
                    H = this.plotHeight,
                    w = this.plotBox,
                    t = this.clipRect,
                    z = this.clipBox,
                    x = "animate";
                d || (this.chartBackground = d = c.rect().addClass("highcharts-background").add(), x = "attr");
                h = a.borderWidth ||
                    0;
                l = h + (a.shadow ? 8 : 0);
                r = { fill: r || "none" };
                if (h || d["stroke-width"]) r.stroke = a.borderColor, r["stroke-width"] = h;
                d.attr(r).shadow(a.shadow);
                d[x]({ x: l / 2, y: l / 2, width: e - l - h % 2, height: f - l - h % 2, r: a.borderRadius });
                x = "animate";
                p || (x = "attr", this.plotBackground = p = c.rect().addClass("highcharts-plot-background").add());
                p[x](w);
                p.attr({ fill: m || "none" }).shadow(a.plotShadow);
                q && (k ? k.animate(w) : this.plotBGImage = c.image(q, D, G, n, H).add());
                t ? t.animate({ width: z.width, height: z.height }) : this.clipRect = c.clipRect(z);
                x = "animate";
                g || (x = "attr", this.plotBorder = g = c.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add());
                g.attr({ stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none" });
                g[x](g.crisp({ x: D, y: G, width: n, height: H }, -g.strokeWidth()));
                this.isDirtyBox = !1;
                b(this, "afterDrawChartBox")
            },
            propFromSeries: function() {
                var a = this,
                    b = a.options.chart,
                    c, e = a.options.series,
                    f, d;
                h(["inverted", "angular", "polar"], function(p) {
                    c = H[b.type || b.defaultSeriesType];
                    d = b[p] || c && c.prototype[p];
                    for (f = e && e.length; !d && f--;)(c =
                        H[e[f].type]) && c.prototype[p] && (d = !0);
                    a[p] = d
                })
            },
            linkSeries: function() {
                var a = this,
                    c = a.series;
                h(c, function(a) { a.linkedSeries.length = 0 });
                h(c, function(b) {
                    var c = b.options.linkedTo;
                    I(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = G(b.options.visible, c.options.visible, b.visible))
                });
                b(this, "afterLinkSeries")
            },
            renderSeries: function() {
                h(this.series, function(a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function() {
                var a = this,
                    b = a.options.labels;
                b.items && h(b.items, function(c) {
                    var e = q(b.style, c.style),
                        f = D(e.left) + a.plotLeft,
                        d = D(e.top) + a.plotTop + 12;
                    delete e.left;
                    delete e.top;
                    a.renderer.text(c.html, f, d).attr({ zIndex: 2 }).css(e).add()
                })
            },
            render: function() {
                var a = this.axes,
                    b = this.renderer,
                    c = this.options,
                    e, f, d;
                this.setTitle();
                this.legend = new x(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                e = this.plotHeight = Math.max(this.plotHeight - 21, 0);
                h(a, function(a) { a.setScale() });
                this.getAxisMargins();
                f = 1.1 < c / this.plotWidth;
                d = 1.05 < e / this.plotHeight;
                if (f || d) h(a, function(a) {
                    (a.horiz && f || !a.horiz && d) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && h(a, function(a) { a.visible && a.render() });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({ zIndex: 3 }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function(a) {
                var b = this;
                a = w(!0, this.options.credits, a);
                a.enabled &&
                    !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() { a.href && (N.location.href = a.href) }).attr({ align: a.position.align, zIndex: 8 }).css(a.style).add().align(a.position), this.credits.update = function(a) {
                        b.credits = b.credits.destroy();
                        b.addCredits(a)
                    })
            },
            destroy: function() {
                var c = this,
                    e = c.axes,
                    f = c.series,
                    d = c.container,
                    p, g = d && d.parentNode;
                b(c, "destroy");
                c.renderer.forExport ? a.erase(k, c) : k[c.index] = void 0;
                a.chartCount--;
                c.renderTo.removeAttribute("data-highcharts-chart");
                J(c);
                for (p = e.length; p--;) e[p] = e[p].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (p = f.length; p--;) f[p] = f[p].destroy();
                h("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function(a) {
                    var b = c[a];
                    b && b.destroy && (c[a] = b.destroy())
                });
                d && (d.innerHTML = "", J(d), g && t(d));
                F(c, function(a, b) { delete c[b] })
            },
            firstRender: function() {
                var a = this,
                    c = a.options;
                if (!a.isReadyToRender ||
                    a.isReadyToRender()) {
                    a.getContainer();
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    h(c.series || [], function(b) { a.initSeries(b) });
                    a.linkSeries();
                    b(a, "beforeRender");
                    p && (a.pointer = new p(a, c));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.temporaryDisplay(!0)
                }
            },
            onload: function() {
                h([this.callback].concat(this.callbacks), function(a) { a && void 0 !== this.index && a.apply(this, [this]) }, this);
                b(this, "load");
                b(this, "render");
                f(this.index) && this.setReflow(this.options.chart.reflow);
                this.onload = null
            }
        })
    })(K);
    (function(a) {
        var A, y = a.each,
            C = a.extend,
            n = a.erase,
            d = a.fireEvent,
            l = a.format,
            v = a.isArray,
            u = a.isNumber,
            t = a.pick,
            k = a.removeEvent;
        a.Point = A = function() {};
        a.Point.prototype = {
            init: function(a, f, h) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(f, h);
                a.options.colorByPoint ? (f = a.options.colors || a.chart.options.colors, this.color = this.color || f[a.colorCounter], f = f.length, h = a.colorCounter, a.colorCounter++, a.colorCounter === f && (a.colorCounter = 0)) : h = a.colorIndex;
                this.colorIndex = t(this.colorIndex,
                    h);
                a.chart.pointCount++;
                d(this, "afterInit");
                return this
            },
            applyOptions: function(a, f) {
                var d = this.series,
                    g = d.options.pointValKey || d.pointValKey;
                a = A.prototype.optionsToObject.call(this, a);
                C(this, a);
                this.options = this.options ? C(this.options, a) : a;
                a.group && delete this.group;
                g && (this.y = this[g]);
                this.isNull = t(this.isValid && !this.isValid(), null === this.x || !u(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === f && d.xAxis && d.xAxis.hasNames && (this.x = d.xAxis.nameToX(this));
                void 0 === this.x && d &&
                    (this.x = void 0 === f ? d.autoIncrement(this) : f);
                return this
            },
            setNestedProperty: function(d, f, h) {
                h = h.split(".");
                a.reduce(h, function(d, e, b, c) { d[e] = c.length - 1 === b ? f : a.isObject(d[e], !0) ? d[e] : {}; return d[e] }, d);
                return d
            },
            optionsToObject: function(d) {
                var f = {},
                    g = this.series,
                    k = g.options.keys,
                    e = k || g.pointArrayMap || ["y"],
                    b = e.length,
                    c = 0,
                    m = 0;
                if (u(d) || null === d) f[e[0]] = d;
                else if (v(d))
                    for (!k && d.length > b && (g = typeof d[0], "string" === g ? f.name = d[0] : "number" === g && (f.x = d[0]), c++); m < b;) k && void 0 === d[c] || (0 < e[m].indexOf(".") ?
                        a.Point.prototype.setNestedProperty(f, d[c], e[m]) : f[e[m]] = d[c]), c++, m++;
                else "object" === typeof d && (f = d, d.dataLabels && (g._hasPointLabels = !0), d.marker && (g._hasPointMarkers = !0));
                return f
            },
            getClassName: function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ?
                    " " + this.zone.className.replace("highcharts-negative", "") : "")
            },
            getZone: function() {
                var a = this.series,
                    f = a.zones,
                    a = a.zoneAxis || "y",
                    d = 0,
                    k;
                for (k = f[d]; this[a] >= k.value;) k = f[++d];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = k && k.color && !this.options.color ? k.color : this.nonZonedColor;
                return k
            },
            destroy: function() {
                var a = this.series.chart,
                    f = a.hoverPoints,
                    d;
                a.pointCount--;
                f && (this.setState(), n(f, this), f.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) k(this),
                    this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (d in this) this[d] = null
            },
            destroyElements: function() { for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], f, d = 6; d--;) f = a[d], this[f] && (this[f] = this[f].destroy()) },
            getLabelConfig: function() { return { x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal } },
            tooltipFormatter: function(a) {
                var f =
                    this.series,
                    d = f.tooltipOptions,
                    g = t(d.valueDecimals, ""),
                    e = d.valuePrefix || "",
                    b = d.valueSuffix || "";
                y(f.pointArrayMap || ["y"], function(c) {
                    c = "{point." + c;
                    if (e || b) a = a.replace(RegExp(c + "}", "g"), e + c + "}" + b);
                    a = a.replace(RegExp(c + "}", "g"), c + ":,." + g + "f}")
                });
                return l(a, { point: this, series: this.series }, f.chart.time)
            },
            firePointEvent: function(a, f, h) {
                var g = this,
                    e = this.series.options;
                (e.point.events[a] || g.options && g.options.events && g.options.events[a]) && this.importEvents();
                "click" === a && e.allowPointSelect && (h = function(a) {
                    g.select &&
                        g.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                d(this, a, f, h)
            },
            visible: !0
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.animObject,
            C = a.arrayMax,
            n = a.arrayMin,
            d = a.correctFloat,
            l = a.defaultOptions,
            v = a.defaultPlotOptions,
            u = a.defined,
            t = a.each,
            k = a.erase,
            g = a.extend,
            f = a.fireEvent,
            h = a.grep,
            q = a.isArray,
            e = a.isNumber,
            b = a.isString,
            c = a.merge,
            m = a.objectEach,
            B = a.pick,
            I = a.removeEvent,
            x = a.splat,
            M = a.SVGElement,
            w = a.syncTimeout,
            F = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: { duration: 1E3 },
            events: {},
            marker: { lineWidth: 0, lineColor: "#ffffff", enabledThreshold: 2, radius: 4, states: { normal: { animation: !0 }, hover: { animation: { duration: 50 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } } },
            point: { events: {} },
            dataLabels: { align: "center", formatter: function() { return null === this.y ? "" : a.numberFormat(this.y, -1) }, style: { fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0, padding: 5 },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: { normal: { animation: !0 }, hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: .25 } }, select: { marker: {} } },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function(a, b) {
                var c = this,
                    e, d = a.series,
                    p;
                c.chart = a;
                c.options = b = c.setOptions(b);
                c.linkedSeries = [];
                c.bindAxes();
                g(c, { name: b.name, state: "", visible: !1 !== b.visible, selected: !0 === b.selected });
                e = b.events;
                m(e, function(a, b) { A(c, b, a) });
                if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                c.getColor();
                c.getSymbol();
                t(c.parallelArrays, function(a) { c[a + "Data"] = [] });
                c.setData(b.data, !1);
                c.isCartesian && (a.hasCartesianSeries = !0);
                d.length && (p = d[d.length - 1]);
                c._i = B(p && p._i, -1) + 1;
                a.orderSeries(this.insert(d));
                f(this, "afterInit")
            },
            insert: function(a) {
                var b = this.options.index,
                    c;
                if (e(b)) {
                    for (c =
                        a.length; c--;)
                        if (b >= B(a[c].options.index, a[c]._i)) { a.splice(c + 1, 0, this); break } - 1 === c && a.unshift(this);
                    c += 1
                } else a.push(this);
                return B(c, a.length - 1)
            },
            bindAxes: function() {
                var b = this,
                    c = b.options,
                    e = b.chart,
                    f;
                t(b.axisTypes || [], function(d) {
                    t(e[d], function(a) { f = a.options; if (c[d] === f.index || void 0 !== c[d] && c[d] === f.id || void 0 === c[d] && 0 === f.index) b.insert(a.series), b[d] = a, a.isDirty = !0 });
                    b[d] || b.optionalAxis === d || a.error(18, !0)
                })
            },
            updateParallelArrays: function(a, b) {
                var c = a.series,
                    f = arguments,
                    d = e(b) ? function(e) {
                        var f =
                            "y" === e && c.toYData ? c.toYData(a) : a[e];
                        c[e + "Data"][b] = f
                    } : function(a) { Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(f, 2)) };
                t(c.parallelArrays, d)
            },
            autoIncrement: function() {
                var a = this.options,
                    b = this.xIncrement,
                    c, e = a.pointIntervalUnit,
                    f = this.chart.time,
                    b = B(b, a.pointStart, 0);
                this.pointInterval = c = B(this.pointInterval, a.pointInterval, 1);
                e && (a = new f.Date(b), "day" === e ? f.set("Date", a, f.get("Date", a) + c) : "month" === e ? f.set("Month", a, f.get("Month", a) + c) : "year" === e && f.set("FullYear", a, f.get("FullYear",
                    a) + c), c = a.getTime() - b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function(a) {
                var b = this.chart,
                    e = b.options,
                    d = e.plotOptions,
                    p = (b.userOptions || {}).plotOptions || {},
                    g = d[this.type];
                this.userOptions = a;
                b = c(g, d.series, a);
                this.tooltipOptions = c(l.tooltip, l.plotOptions.series && l.plotOptions.series.tooltip, l.plotOptions[this.type].tooltip, e.tooltip.userOptions, d.series && d.series.tooltip, d[this.type].tooltip, a.tooltip);
                this.stickyTracking = B(a.stickyTracking, p[this.type] && p[this.type].stickyTracking, p.series && p.series.stickyTracking,
                    this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);
                null === g.marker && delete b.marker;
                this.zoneAxis = b.zoneAxis;
                a = this.zones = (b.zones || []).slice();
                !b.negativeColor && !b.negativeFillColor || b.zones || a.push({ value: b[this.zoneAxis + "Threshold"] || b.threshold || 0, className: "highcharts-negative", color: b.negativeColor, fillColor: b.negativeFillColor });
                a.length && u(a[a.length - 1].value) && a.push({ color: this.color, fillColor: this.fillColor });
                f(this, "afterSetOptions", { options: b });
                return b
            },
            getName: function() {
                return this.name ||
                    "Series " + (this.index + 1)
            },
            getCyclic: function(a, b, c) {
                var e, f = this.chart,
                    d = this.userOptions,
                    p = a + "Index",
                    g = a + "Counter",
                    h = c ? c.length : B(f.options.chart[a + "Count"], f[a + "Count"]);
                b || (e = B(d[p], d["_" + p]), u(e) || (f.series.length || (f[g] = 0), d["_" + p] = e = f[g] % h, f[g] += 1), c && (b = c[e]));
                void 0 !== e && (this[p] = e);
                this[a] = b
            },
            getColor: function() { this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || v[this.type].color, this.chart.options.colors) },
            getSymbol: function() {
                this.getCyclic("symbol",
                    this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            updateData: function(b) {
                var c = this.options,
                    f = this.points,
                    d = [],
                    p, g, h, k = this.requireSorting;
                t(b, function(b) {
                    var g;
                    g = a.defined(b) && this.pointClass.prototype.optionsToObject.call({ series: this }, b).x;
                    e(g) && (g = a.inArray(g, this.xData, h), -1 === g ? d.push(b) : b !== c.data[g] ? (f[g].update(b, !1, null, !1), f[g].touched = !0, k && (h = g)) : f[g] && (f[g].touched = !0), p = !0)
                }, this);
                if (p)
                    for (b = f.length; b--;) g = f[b], g.touched || g.remove(!1),
                        g.touched = !1;
                else if (b.length === f.length) t(b, function(a, b) { f[b].update && a !== c.data[b] && f[b].update(a, !1, null, !1) });
                else return !1;
                t(d, function(a) { this.addPoint(a, !1) }, this);
                return !0
            },
            setData: function(c, f, d, g) {
                var p = this,
                    h = p.points,
                    k = h && h.length || 0,
                    m, l = p.options,
                    G = p.chart,
                    n = null,
                    w = p.xAxis,
                    D = l.turboThreshold,
                    x = this.xData,
                    F = this.yData,
                    u = (m = p.pointArrayMap) && m.length,
                    J;
                c = c || [];
                m = c.length;
                f = B(f, !0);
                !1 !== g && m && k && !p.cropped && !p.hasGroupedData && p.visible && (J = this.updateData(c));
                if (!J) {
                    p.xIncrement = null;
                    p.colorCounter =
                        0;
                    t(this.parallelArrays, function(a) { p[a + "Data"].length = 0 });
                    if (D && m > D) {
                        for (d = 0; null === n && d < m;) n = c[d], d++;
                        if (e(n))
                            for (d = 0; d < m; d++) x[d] = this.autoIncrement(), F[d] = c[d];
                        else if (q(n))
                            if (u)
                                for (d = 0; d < m; d++) n = c[d], x[d] = n[0], F[d] = n.slice(1, u + 1);
                            else
                                for (d = 0; d < m; d++) n = c[d], x[d] = n[0], F[d] = n[1];
                        else a.error(12)
                    } else
                        for (d = 0; d < m; d++) void 0 !== c[d] && (n = { series: p }, p.pointClass.prototype.applyOptions.apply(n, [c[d]]), p.updateParallelArrays(n, d));
                    F && b(F[0]) && a.error(14, !0);
                    p.data = [];
                    p.options.data = p.userOptions.data =
                        c;
                    for (d = k; d--;) h[d] && h[d].destroy && h[d].destroy();
                    w && (w.minRange = w.userMinRange);
                    p.isDirty = G.isDirtyBox = !0;
                    p.isDirtyData = !!h;
                    d = !1
                }
                "point" === l.legendType && (this.processData(), this.generatePoints());
                f && G.redraw(d)
            },
            processData: function(b) {
                var c = this.xData,
                    e = this.yData,
                    f = c.length,
                    d;
                d = 0;
                var p, g, h = this.xAxis,
                    k, m = this.options;
                k = m.cropThreshold;
                var l = this.getExtremesFromAll || m.getExtremesFromAll,
                    q = this.isCartesian,
                    m = h && h.val2lin,
                    n = h && h.isLog,
                    w = this.requireSorting,
                    x, t;
                if (q && !this.isDirty && !h.isDirty && !this.yAxis.isDirty &&
                    !b) return !1;
                h && (b = h.getExtremes(), x = b.min, t = b.max);
                if (q && this.sorted && !l && (!k || f > k || this.forceCrop))
                    if (c[f - 1] < x || c[0] > t) c = [], e = [];
                    else if (c[0] < x || c[f - 1] > t) d = this.cropData(this.xData, this.yData, x, t), c = d.xData, e = d.yData, d = d.start, p = !0;
                for (k = c.length || 1; --k;) f = n ? m(c[k]) - m(c[k - 1]) : c[k] - c[k - 1], 0 < f && (void 0 === g || f < g) ? g = f : 0 > f && w && (a.error(15), w = !1);
                this.cropped = p;
                this.cropStart = d;
                this.processedXData = c;
                this.processedYData = e;
                this.closestPointRange = g
            },
            cropData: function(a, b, c, e, f) {
                var d = a.length,
                    p = 0,
                    g = d,
                    h;
                f =
                    B(f, this.cropShoulder, 1);
                for (h = 0; h < d; h++)
                    if (a[h] >= c) { p = Math.max(0, h - f); break }
                for (c = h; c < d; c++)
                    if (a[c] > e) { g = c + f; break }
                return { xData: a.slice(p, g), yData: b.slice(p, g), start: p, end: g }
            },
            generatePoints: function() {
                var a = this.options,
                    b = a.data,
                    c = this.data,
                    e, f = this.processedXData,
                    d = this.processedYData,
                    g = this.pointClass,
                    h = f.length,
                    k = this.cropStart || 0,
                    m, l = this.hasGroupedData,
                    a = a.keys,
                    q, n = [],
                    w;
                c || l || (c = [], c.length = b.length, c = this.data = c);
                a && l && (this.options.keys = !1);
                for (w = 0; w < h; w++) m = k + w, l ? (q = (new g).init(this, [f[w]].concat(x(d[w]))),
                    q.dataGroup = this.groupMap[w]) : (q = c[m]) || void 0 === b[m] || (c[m] = q = (new g).init(this, b[m], f[w])), q && (q.index = m, n[w] = q);
                this.options.keys = a;
                if (c && (h !== (e = c.length) || l))
                    for (w = 0; w < e; w++) w !== k || l || (w += h), c[w] && (c[w].destroyElements(), c[w].plotX = void 0);
                this.data = c;
                this.points = n
            },
            getExtremes: function(a) {
                var b = this.yAxis,
                    c = this.processedXData,
                    f, d = [],
                    p = 0;
                f = this.xAxis.getExtremes();
                var g = f.min,
                    h = f.max,
                    k, m, l = this.requireSorting ? 1 : 0,
                    w, x;
                a = a || this.stackedYData || this.processedYData || [];
                f = a.length;
                for (x = 0; x < f; x++)
                    if (m =
                        c[x], w = a[x], k = (e(w, !0) || q(w)) && (!b.positiveValuesOnly || w.length || 0 < w), m = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[x + l] || m) >= g && (c[x - l] || m) <= h, k && m)
                        if (k = w.length)
                            for (; k--;) "number" === typeof w[k] && (d[p++] = w[k]);
                        else d[p++] = w;
                this.dataMin = n(d);
                this.dataMax = C(d)
            },
            translate: function() {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    b = a.stacking,
                    c = this.xAxis,
                    g = c.categories,
                    h = this.yAxis,
                    k = this.points,
                    m = k.length,
                    l = !!this.modifyValue,
                    q = a.pointPlacement,
                    w = "between" === q || e(q),
                    n = a.threshold,
                    x = a.startFromThreshold ? n : 0,
                    t, F, v, I, M = Number.MAX_VALUE;
                "between" === q && (q = .5);
                e(q) && (q *= B(a.pointRange || c.pointRange));
                for (a = 0; a < m; a++) {
                    var y = k[a],
                        C = y.x,
                        A = y.y;
                    F = y.low;
                    var K = b && h.stacks[(this.negStacks && A < (x ? 0 : n) ? "-" : "") + this.stackKey],
                        V;
                    h.positiveValuesOnly && null !== A && 0 >= A && (y.isNull = !0);
                    y.plotX = t = d(Math.min(Math.max(-1E5, c.translate(C, 0, 0, 0, 1, q, "flags" === this.type)), 1E5));
                    b && this.visible && !y.isNull && K && K[C] && (I = this.getStackIndicator(I, C, this.index), V = K[C], A = V.points[I.key],
                        F = A[0], A = A[1], F === x && I.key === K[C].base && (F = B(e(n) && n, h.min)), h.positiveValuesOnly && 0 >= F && (F = null), y.total = y.stackTotal = V.total, y.percentage = V.total && y.y / V.total * 100, y.stackY = A, V.setOffset(this.pointXOffset || 0, this.barW || 0));
                    y.yBottom = u(F) ? Math.min(Math.max(-1E5, h.translate(F, 0, 1, 0, 1)), 1E5) : null;
                    l && (A = this.modifyValue(A, y));
                    y.plotY = F = "number" === typeof A && Infinity !== A ? Math.min(Math.max(-1E5, h.translate(A, 0, 1, 0, 1)), 1E5) : void 0;
                    y.isInside = void 0 !== F && 0 <= F && F <= h.len && 0 <= t && t <= c.len;
                    y.clientX = w ? d(c.translate(C,
                        0, 0, 0, 1, q)) : t;
                    y.negative = y.y < (n || 0);
                    y.category = g && void 0 !== g[y.x] ? g[y.x] : y.x;
                    y.isNull || (void 0 !== v && (M = Math.min(M, Math.abs(t - v))), v = t);
                    y.zone = this.zones.length && y.getZone()
                }
                this.closestPointRangePx = M;
                f(this, "afterTranslate")
            },
            getValidPoints: function(a, b) { var c = this.chart; return h(a || this.points || [], function(a) { return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull }) },
            setClip: function(a) {
                var b = this.chart,
                    c = this.options,
                    e = b.renderer,
                    f = b.inverted,
                    d = this.clipBox,
                    g = d || b.clipBox,
                    p = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(),
                    h = b[p],
                    k = b[p + "m"];
                h || (a && (g.width = 0, f && (g.x = b.plotSizeX), b[p + "m"] = k = e.clipRect(f ? b.plotSizeX + 99 : -99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), b[p] = h = e.clipRect(g), h.count = { length: 0 });
                a && !h.count[this.index] && (h.count[this.index] = !0, h.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || d ? h : b.clipRect), this.markerGroup.clip(k), this.sharedClipKey = p);
                a || (h.count[this.index] && (delete h.count[this.index], --h.count.length),
                    0 === h.count.length && p && b[p] && (d || (b[p] = b[p].destroy()), b[p + "m"] && (b[p + "m"] = b[p + "m"].destroy())))
            },
            animate: function(a) {
                var b = this.chart,
                    c = y(this.options.animation),
                    e;
                a ? this.setClip(c) : (e = this.sharedClipKey, (a = b[e]) && a.animate({ width: b.plotSizeX, x: 0 }, c), b[e + "m"] && b[e + "m"].animate({ width: b.plotSizeX + 99, x: 0 }, c), this.animate = null)
            },
            afterAnimate: function() {
                this.setClip();
                f(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function() {
                var a = this.points,
                    b = this.chart,
                    c, e, f, d, g = this.options.marker,
                    h, k, m, l = this[this.specialGroup] || this.markerGroup,
                    q, w = B(g.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= g.enabledThreshold * g.radius);
                if (!1 !== g.enabled || this._hasPointMarkers)
                    for (c = 0; c < a.length; c++) e = a[c], d = e.graphic, h = e.marker || {}, k = !!e.marker, f = w && void 0 === h.enabled || h.enabled, m = e.isInside, f && !e.isNull ? (f = B(h.symbol, this.symbol), q = this.markerAttribs(e, e.selected && "select"), d ? d[m ? "show" : "hide"](!0).animate(q) : m && (0 < q.width || e.hasImage) && (e.graphic = d = b.renderer.symbol(f, q.x, q.y, q.width,
                        q.height, k ? h : g).add(l)), d && d.attr(this.pointAttribs(e, e.selected && "select")), d && d.addClass(e.getClassName(), !0)) : d && (e.graphic = d.destroy())
            },
            markerAttribs: function(a, b) {
                var c = this.options.marker,
                    e = a.marker || {},
                    f = e.symbol || c.symbol,
                    d = B(e.radius, c.radius);
                b && (c = c.states[b], b = e.states && e.states[b], d = B(b && b.radius, c && c.radius, d + (c && c.radiusPlus || 0)));
                a.hasImage = f && 0 === f.indexOf("url");
                a.hasImage && (d = 0);
                a = { x: Math.floor(a.plotX) - d, y: a.plotY - d };
                d && (a.width = a.height = 2 * d);
                return a
            },
            pointAttribs: function(a,
                b) {
                var c = this.options.marker,
                    e = a && a.options,
                    f = e && e.marker || {},
                    d = this.color,
                    g = e && e.color,
                    p = a && a.color,
                    e = B(f.lineWidth, c.lineWidth);
                a = a && a.zone && a.zone.color;
                d = g || a || p || d;
                a = f.fillColor || c.fillColor || d;
                d = f.lineColor || c.lineColor || d;
                b && (c = c.states[b], b = f.states && f.states[b] || {}, e = B(b.lineWidth, c.lineWidth, e + B(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, d = b.lineColor || c.lineColor || d);
                return { stroke: d, "stroke-width": e, fill: a }
            },
            destroy: function() {
                var b = this,
                    c = b.chart,
                    e = /AppleWebKit\/533/.test(F.navigator.userAgent),
                    d, g, h = b.data || [],
                    q, l;
                f(b, "destroy");
                I(b);
                t(b.axisTypes || [], function(a) {
                    (l = b[a]) && l.series && (k(l.series, b), l.isDirty = l.forceRedraw = !0)
                });
                b.legendItem && b.chart.legend.destroyItem(b);
                for (g = h.length; g--;)(q = h[g]) && q.destroy && q.destroy();
                b.points = null;
                a.clearTimeout(b.animationTimeout);
                m(b, function(a, b) { a instanceof M && !a.survive && (d = e && "group" === b ? "hide" : "destroy", a[d]()) });
                c.hoverSeries === b && (c.hoverSeries = null);
                k(c.series, b);
                c.orderSeries();
                m(b, function(a, c) { delete b[c] })
            },
            getGraphPath: function(a, b,
                c) {
                var e = this,
                    f = e.options,
                    d = f.step,
                    g, h = [],
                    p = [],
                    k;
                a = a || e.points;
                (g = a.reversed) && a.reverse();
                (d = { right: 1, center: 2 }[d] || d && 3) && g && (d = 4 - d);
                !f.connectNulls || b || c || (a = this.getValidPoints(a));
                t(a, function(g, m) {
                    var l = g.plotX,
                        q = g.plotY,
                        r = a[m - 1];
                    (g.leftCliff || r && r.rightCliff) && !c && (k = !0);
                    g.isNull && !u(b) && 0 < m ? k = !f.connectNulls : g.isNull && !b ? k = !0 : (0 === m || k ? m = ["M", g.plotX, g.plotY] : e.getPointSpline ? m = e.getPointSpline(a, g, m) : d ? (m = 1 === d ? ["L", r.plotX, q] : 2 === d ? ["L", (r.plotX + l) / 2, r.plotY, "L", (r.plotX + l) / 2, q] : ["L", l,
                        r.plotY
                    ], m.push("L", l, q)) : m = ["L", l, q], p.push(g.x), d && (p.push(g.x), 2 === d && p.push(g.x)), h.push.apply(h, m), k = !1)
                });
                h.xMap = p;
                return e.graphPath = h
            },
            drawGraph: function() {
                var a = this,
                    b = this.options,
                    c = (this.gappedPath || this.getGraphPath).call(this),
                    e = [
                        ["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]
                    ],
                    e = a.getZonesGraphs(e);
                t(e, function(e, f) {
                    var d = e[0],
                        g = a[d];
                    g ? (g.endX = a.preventGraphAnimation ? null : c.xMap, g.animate({ d: c })) : c.length && (a[d] = a.chart.renderer.path(c).addClass(e[1]).attr({ zIndex: 1 }).add(a.group),
                        g = { stroke: e[2], "stroke-width": b.lineWidth, fill: a.fillGraph && a.color || "none" }, e[3] ? g.dashstyle = e[3] : "square" !== b.linecap && (g["stroke-linecap"] = g["stroke-linejoin"] = "round"), g = a[d].attr(g).shadow(2 > f && b.shadow));
                    g && (g.startX = c.xMap, g.isArea = c.isArea)
                })
            },
            getZonesGraphs: function(a) { t(this.zones, function(b, c) { a.push(["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className || ""), b.color || this.color, b.dashStyle || this.options.dashStyle]) }, this); return a },
            applyZones: function() {
                var a = this,
                    b = this.chart,
                    c = b.renderer,
                    e = this.zones,
                    f, d, g = this.clips || [],
                    h, k = this.graph,
                    m = this.area,
                    l = Math.max(b.chartWidth, b.chartHeight),
                    q = this[(this.zoneAxis || "y") + "Axis"],
                    w, n, x = b.inverted,
                    F, u, v, I, M = !1;
                e.length && (k || m) && q && void 0 !== q.min && (n = q.reversed, F = q.horiz, k && !this.showLine && k.hide(), m && m.hide(), w = q.getExtremes(), t(e, function(e, p) {
                    f = n ? F ? b.plotWidth : 0 : F ? 0 : q.toPixels(w.min);
                    f = Math.min(Math.max(B(d, f), 0), l);
                    d = Math.min(Math.max(Math.round(q.toPixels(B(e.value, w.max), !0)), 0), l);
                    M && (f = d = q.toPixels(w.max));
                    u = Math.abs(f - d);
                    v = Math.min(f, d);
                    I = Math.max(f, d);
                    q.isXAxis ? (h = { x: x ? I : v, y: 0, width: u, height: l }, F || (h.x = b.plotHeight - h.x)) : (h = { x: 0, y: x ? I : v, width: l, height: u }, F && (h.y = b.plotWidth - h.y));
                    x && c.isVML && (h = q.isXAxis ? { x: 0, y: n ? v : I, height: h.width, width: b.chartWidth } : { x: h.y - b.plotLeft - b.spacingBox.x, y: 0, width: h.height, height: b.chartHeight });
                    g[p] ? g[p].animate(h) : (g[p] = c.clipRect(h), k && a["zone-graph-" + p].clip(g[p]), m && a["zone-area-" + p].clip(g[p]));
                    M = e.value > w.max;
                    a.resetZones && 0 === d && (d = void 0)
                }), this.clips = g)
            },
            invertGroups: function(a) {
                function b() {
                    t(["group",
                        "markerGroup"
                    ], function(b) { c[b] && (e.renderer.isVML && c[b].attr({ width: c.yAxis.len, height: c.xAxis.len }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a)) })
                }
                var c = this,
                    e = c.chart,
                    f;
                c.xAxis && (f = A(e, "resize", b), A(c, "destroy", f), b(a), c.invertGroups = b)
            },
            plotGroup: function(a, b, c, e, f) {
                var d = this[a],
                    g = !d;
                g && (this[a] = d = this.chart.renderer.g().attr({ zIndex: e || .1 }).add(f));
                d.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (u(this.colorIndex) ? "highcharts-color-" +
                    this.colorIndex + " " : "") + (this.options.className || "") + (d.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                d.attr({ visibility: c })[g ? "attr" : "animate"](this.getPlotBox());
                return d
            },
            getPlotBox: function() {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return { translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1 }
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    c, e = a.options,
                    d = !!a.animate && b.renderer.isSVG && y(e.animation).duration,
                    g = a.visible ? "inherit" :
                    "hidden",
                    h = e.zIndex,
                    k = a.hasRendered,
                    m = b.seriesGroup,
                    q = b.inverted;
                c = a.plotGroup("group", "series", g, h, m);
                a.markerGroup = a.plotGroup("markerGroup", "markers", g, h, m);
                d && a.animate(!0);
                c.inverted = a.isCartesian ? q : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(q);
                !1 === e.clip || a.sharedClipKey || k || c.clip(b.clipRect);
                d && a.animate();
                k || (a.animationTimeout = w(function() { a.afterAnimate() },
                    d));
                a.isDirty = !1;
                a.hasRendered = !0;
                f(a, "afterRender")
            },
            redraw: function() {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    c = this.group,
                    e = this.xAxis,
                    f = this.yAxis;
                c && (a.inverted && c.attr({ width: a.plotWidth, height: a.plotHeight }), c.animate({ translateX: B(e && e.left, a.plotLeft), translateY: B(f && f.top, a.plotTop) }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function(a, b) {
                var c = this.xAxis,
                    e = this.yAxis,
                    f = this.chart.inverted;
                return this.searchKDTree({
                    clientX: f ?
                        c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: f ? e.len - a.chartX + e.pos : a.chartY - e.pos
                }, b)
            },
            buildKDTree: function() {
                function a(c, e, f) { var d, g; if (g = c && c.length) return d = b.kdAxisArray[e % f], c.sort(function(a, b) { return a[d] - b[d] }), g = Math.floor(g / 2), { point: c[g], left: a(c.slice(0, g), e + 1, f), right: a(c.slice(g + 1), e + 1, f) } }
                this.buildingKdTree = !0;
                var b = this,
                    c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete b.kdTree;
                w(function() {
                        b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
                        b.buildingKdTree = !1
                    }, b.options.kdNow ?
                    0 : 1)
            },
            searchKDTree: function(a, b) {
                function c(a, b, h, k) {
                    var p = b.point,
                        m = e.kdAxisArray[h % k],
                        q, l, w = p;
                    l = u(a[f]) && u(p[f]) ? Math.pow(a[f] - p[f], 2) : null;
                    q = u(a[d]) && u(p[d]) ? Math.pow(a[d] - p[d], 2) : null;
                    q = (l || 0) + (q || 0);
                    p.dist = u(q) ? Math.sqrt(q) : Number.MAX_VALUE;
                    p.distX = u(l) ? Math.sqrt(l) : Number.MAX_VALUE;
                    m = a[m] - p[m];
                    q = 0 > m ? "left" : "right";
                    l = 0 > m ? "right" : "left";
                    b[q] && (q = c(a, b[q], h + 1, k), w = q[g] < w[g] ? q : p);
                    b[l] && Math.sqrt(m * m) < w[g] && (a = c(a, b[l], h + 1, k), w = a[g] < w[g] ? a : w);
                    return w
                }
                var e = this,
                    f = this.kdAxisArray[0],
                    d = this.kdAxisArray[1],
                    g = b ? "distX" : "dist";
                b = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, b, b)
            }
        })
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.animate,
            C = a.Axis,
            n = a.createElement,
            d = a.css,
            l = a.defined,
            v = a.each,
            u = a.erase,
            t = a.extend,
            k = a.fireEvent,
            g = a.inArray,
            f = a.isNumber,
            h = a.isObject,
            q = a.isArray,
            e = a.merge,
            b = a.objectEach,
            c = a.pick,
            m = a.Point,
            B = a.Series,
            I = a.seriesTypes,
            x = a.setAnimation,
            M = a.splat;
        t(a.Chart.prototype, {
            addSeries: function(a, b, e) {
                var f,
                    d = this;
                a && (b = c(b, !0), k(d, "addSeries", { options: a }, function() {
                    f = d.initSeries(a);
                    d.isDirtyLegend = !0;
                    d.linkSeries();
                    k(d, "afterAddSeries");
                    b && d.redraw(e)
                }));
                return f
            },
            addAxis: function(a, b, f, d) {
                var g = b ? "xAxis" : "yAxis",
                    h = this.options;
                a = e(a, { index: this[g].length, isX: b });
                b = new C(this, a);
                h[g] = M(h[g] || {});
                h[g].push(a);
                c(f, !0) && this.redraw(d);
                return b
            },
            showLoading: function(a) {
                var b = this,
                    c = b.options,
                    e = b.loadingDiv,
                    f = c.loading,
                    g = function() {
                        e && d(e, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                e || (b.loadingDiv = e = n("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, b.container), b.loadingSpan = n("span", { className: "highcharts-loading-inner" }, null, e), A(b, "redraw", g));
                e.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                d(e, t(f.style, { zIndex: 10 }));
                d(b.loadingSpan, f.labelStyle);
                b.loadingShown || (d(e, { opacity: 0, display: "" }), y(e, { opacity: f.style.opacity || .5 }, { duration: f.showDuration || 0 }));
                b.loadingShown = !0;
                g()
            },
            hideLoading: function() {
                var a =
                    this.options,
                    b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", y(b, { opacity: 0 }, { duration: a.loading.hideDuration || 100, complete: function() { d(b, { display: "none" }) } }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            update: function(a, d, h, m) {
                var p = this,
                    q = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle" },
                    n = a.chart,
                    r, w, x = [];
                k(p, "update", { options: a });
                if (n) {
                    e(!0, p.options.chart, n);
                    "className" in n && p.setClassName(n.className);
                    "reflow" in n && p.setReflow(n.reflow);
                    if ("inverted" in n || "polar" in n || "type" in n) p.propFromSeries(), r = !0;
                    "alignTicks" in n && (r = !0);
                    b(n, function(a, b) {
                        -1 !==
                            g("chart." + b, p.propsRequireUpdateSeries) && (w = !0); - 1 !== g(b, p.propsRequireDirtyBox) && (p.isDirtyBox = !0)
                    });
                    "style" in n && p.renderer.setStyle(n.style)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && e(!0, this.options.plotOptions, a.plotOptions);
                b(a, function(a, b) {
                    if (p[b] && "function" === typeof p[b].update) p[b].update(a, !1);
                    else if ("function" === typeof p[q[b]]) p[q[b]](a);
                    "chart" !== b && -1 !== g(b, p.propsRequireUpdateSeries) && (w = !0)
                });
                v("xAxis yAxis zAxis series colorAxis pane".split(" "), function(b) {
                    var c;
                    a[b] && ("series" === b && (c = [], v(p[b], function(a, b) { a.options.isInternal || c.push(b) })), v(M(a[b]), function(a, e) {
                        (e = l(a.id) && p.get(a.id) || p[b][c ? c[e] : e]) && e.coll === b && (e.update(a, !1), h && (e.touched = !0));
                        if (!e && h)
                            if ("series" === b) p.addSeries(a, !1).touched = !0;
                            else if ("xAxis" === b || "yAxis" === b) p.addAxis(a, "xAxis" === b, !1).touched = !0
                    }), h && v(p[b], function(a) { a.touched || a.options.isInternal ? delete a.touched : x.push(a) }))
                });
                v(x, function(a) { a.remove(!1) });
                r && v(p.axes, function(a) { a.update({}, !1) });
                w && v(p.series, function(a) {
                    a.update({}, !1)
                });
                a.loading && e(!0, p.options.loading, a.loading);
                r = n && n.width;
                n = n && n.height;
                f(r) && r !== p.chartWidth || f(n) && n !== p.chartHeight ? p.setSize(r, n, m) : c(d, !0) && p.redraw(m);
                k(p, "afterUpdate", { options: a })
            },
            setSubtitle: function(a) { this.setTitle(void 0, a) }
        });
        t(m.prototype, {
            update: function(a, b, e, f) {
                function d() {
                    g.applyOptions(a);
                    null === g.y && k && (g.graphic = k.destroy());
                    h(a, !0) && (k && k.element && a && a.marker && void 0 !== a.marker.symbol && (g.graphic = k.destroy()), a && a.dataLabels && g.dataLabel && (g.dataLabel = g.dataLabel.destroy()),
                        g.connector && (g.connector = g.connector.destroy()));
                    m = g.index;
                    p.updateParallelArrays(g, m);
                    l.data[m] = h(l.data[m], !0) || h(a, !0) ? g.options : c(a, l.data[m]);
                    p.isDirty = p.isDirtyData = !0;
                    !p.fixedBox && p.hasCartesianSeries && (q.isDirtyBox = !0);
                    "point" === l.legendType && (q.isDirtyLegend = !0);
                    b && q.redraw(e)
                }
                var g = this,
                    p = g.series,
                    k = g.graphic,
                    m, q = p.chart,
                    l = p.options;
                b = c(b, !0);
                !1 === f ? d() : g.firePointEvent("update", { options: a }, d)
            },
            remove: function(a, b) { this.series.removePoint(g(this, this.series.data), a, b) }
        });
        t(B.prototype, {
            addPoint: function(a, b, e, f) {
                var d = this.options,
                    g = this.data,
                    h = this.chart,
                    p = this.xAxis,
                    p = p && p.hasNames && p.names,
                    k = d.data,
                    m, q, l = this.xData,
                    n, w;
                b = c(b, !0);
                m = { series: this };
                this.pointClass.prototype.applyOptions.apply(m, [a]);
                w = m.x;
                n = l.length;
                if (this.requireSorting && w < l[n - 1])
                    for (q = !0; n && l[n - 1] > w;) n--;
                this.updateParallelArrays(m, "splice", n, 0, 0);
                this.updateParallelArrays(m, n);
                p && m.name && (p[w] = m.name);
                k.splice(n, 0, a);
                q && (this.data.splice(n, 0, null), this.processData());
                "point" === d.legendType && this.generatePoints();
                e && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), this.updateParallelArrays(m, "shift"), k.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && h.redraw(f)
            },
            removePoint: function(a, b, e) {
                var f = this,
                    d = f.data,
                    g = d[a],
                    h = f.points,
                    p = f.chart,
                    k = function() {
                        h && h.length === d.length && h.splice(a, 1);
                        d.splice(a, 1);
                        f.options.data.splice(a, 1);
                        f.updateParallelArrays(g || { series: f }, "splice", a, 1);
                        g && g.destroy();
                        f.isDirty = !0;
                        f.isDirtyData = !0;
                        b && p.redraw()
                    };
                x(e, p);
                b = c(b, !0);
                g ? g.firePointEvent("remove", null, k) : k()
            },
            remove: function(a,
                b, e) {
                function f() {
                    d.destroy();
                    g.isDirtyLegend = g.isDirtyBox = !0;
                    g.linkSeries();
                    c(a, !0) && g.redraw(b)
                }
                var d = this,
                    g = d.chart;
                !1 !== e ? k(d, "remove", null, f) : f()
            },
            update: function(b, f) {
                var d = this,
                    h = d.chart,
                    m = d.userOptions,
                    q = d.oldType || d.type,
                    l = b.type || m.type || h.options.chart.type,
                    n = I[q].prototype,
                    x, w = ["group", "markerGroup", "dataLabelsGroup"],
                    B = ["navigatorSeries", "baseSeries"],
                    u = d.finishedAnimating && { animation: !1 },
                    F = ["data", "name", "turboThreshold"],
                    M = a.keys(b),
                    y = 0 < M.length;
                v(M, function(a) {-1 === g(a, F) && (y = !1) });
                if (y) b.data && this.setData(b.data, !1), b.name && this.setName(b.name, !1);
                else {
                    B = w.concat(B);
                    v(B, function(a) {
                        B[a] = d[a];
                        delete d[a]
                    });
                    b = e(m, u, { index: d.index, pointStart: c(m.pointStart, d.xData[0]) }, { data: d.options.data }, b);
                    d.remove(!1, null, !1);
                    for (x in n) d[x] = void 0;
                    I[l || q] ? t(d, I[l || q].prototype) : a.error(17, !0);
                    v(B, function(a) { d[a] = B[a] });
                    d.init(h, b);
                    b.zIndex !== m.zIndex && v(w, function(a) { d[a] && d[a].attr({ zIndex: b.zIndex }) });
                    d.oldType = q;
                    h.linkSeries()
                }
                k(this, "afterUpdate");
                c(f, !0) && h.redraw(!1)
            },
            setName: function(a) {
                this.name =
                    this.options.name = this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            }
        });
        t(C.prototype, {
            update: function(a, f) {
                var d = this.chart,
                    g = a && a.events || {};
                a = e(this.userOptions, a);
                d.options[this.coll].indexOf && (d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)] = a);
                b(d.options[this.coll].events, function(a, b) { "undefined" === typeof g[b] && (g[b] = void 0) });
                this.destroy(!0);
                this.init(d, t(a, { events: g }));
                d.isDirtyBox = !0;
                c(f, !0) && d.redraw()
            },
            remove: function(a) {
                for (var b = this.chart, e = this.coll, f = this.series,
                        d = f.length; d--;) f[d] && f[d].remove(!1);
                u(b.axes, this);
                u(b[e], this);
                q(b.options[e]) ? b.options[e].splice(this.options.index, 1) : delete b.options[e];
                v(b[e], function(a, b) { a.options.index = a.userOptions.index = b });
                this.destroy();
                b.isDirtyBox = !0;
                c(a, !0) && b.redraw()
            },
            setTitle: function(a, b) { this.update({ title: a }, b) },
            setCategories: function(a, b) { this.update({ categories: a }, b) }
        })
    })(K);
    (function(a) {
        var A = a.animObject,
            y = a.color,
            C = a.each,
            n = a.extend,
            d = a.isNumber,
            l = a.merge,
            v = a.pick,
            u = a.Series,
            t = a.seriesType,
            k = a.svg;
        t("column",
            "line", { borderRadius: 0, crisp: !0, groupPadding: .2, marker: null, pointPadding: .1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: !1, brightness: .1 }, select: { color: "#cccccc", borderColor: "#000000" } }, dataLabels: { align: null, verticalAlign: null, y: null }, softThreshold: !1, startFromThreshold: !0, stickyTracking: !1, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff" }, {
                cropShoulder: 0,
                directTouch: !0,
                trackerGroups: ["group", "dataLabelsGroup"],
                negStacks: !0,
                init: function() {
                    u.prototype.init.apply(this,
                        arguments);
                    var a = this,
                        f = a.chart;
                    f.hasRendered && C(f.series, function(f) { f.type === a.type && (f.isDirty = !0) })
                },
                getColumnMetrics: function() {
                    var a = this,
                        f = a.options,
                        d = a.xAxis,
                        k = a.yAxis,
                        e = d.options.reversedStacks,
                        e = d.reversed && !e || !d.reversed && e,
                        b, c = {},
                        m = 0;
                    !1 === f.grouping ? m = 1 : C(a.chart.series, function(e) {
                        var f = e.options,
                            d = e.yAxis,
                            g;
                        e.type !== a.type || !e.visible && a.chart.options.chart.ignoreHiddenSeries || k.len !== d.len || k.pos !== d.pos || (f.stacking ? (b = e.stackKey, void 0 === c[b] && (c[b] = m++), g = c[b]) : !1 !== f.grouping &&
                            (g = m++), e.columnIndex = g)
                    });
                    var l = Math.min(Math.abs(d.transA) * (d.ordinalSlope || f.pointRange || d.closestPointRange || d.tickInterval || 1), d.len),
                        n = l * f.groupPadding,
                        x = (l - 2 * n) / (m || 1),
                        f = Math.min(f.maxPointWidth || d.len, v(f.pointWidth, x * (1 - 2 * f.pointPadding)));
                    a.columnMetrics = { width: f, offset: (x - f) / 2 + (n + ((a.columnIndex || 0) + (e ? 1 : 0)) * x - l / 2) * (e ? -1 : 1) };
                    return a.columnMetrics
                },
                crispCol: function(a, f, d, k) {
                    var e = this.chart,
                        b = this.borderWidth,
                        c = -(b % 2 ? .5 : 0),
                        b = b % 2 ? .5 : 1;
                    e.inverted && e.renderer.isVML && (b += 1);
                    this.options.crisp &&
                        (d = Math.round(a + d) + c, a = Math.round(a) + c, d -= a);
                    k = Math.round(f + k) + b;
                    c = .5 >= Math.abs(f) && .5 < k;
                    f = Math.round(f) + b;
                    k -= f;
                    c && k && (--f, k += 1);
                    return { x: a, y: f, width: d, height: k }
                },
                translate: function() {
                    var a = this,
                        f = a.chart,
                        d = a.options,
                        k = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                        k = a.borderWidth = v(d.borderWidth, k ? 0 : 1),
                        e = a.yAxis,
                        b = d.threshold,
                        c = a.translatedThreshold = e.getThreshold(b),
                        m = v(d.minPointLength, 5),
                        l = a.getColumnMetrics(),
                        n = l.width,
                        x = a.barW = Math.max(n, 1 + 2 * k),
                        t = a.pointXOffset = l.offset;
                    f.inverted && (c -= .5);
                    d.pointPadding &&
                        (x = Math.ceil(x));
                    u.prototype.translate.apply(a);
                    C(a.points, function(d) {
                        var g = v(d.yBottom, c),
                            h = 999 + Math.abs(g),
                            h = Math.min(Math.max(-h, d.plotY), e.len + h),
                            k = d.plotX + t,
                            l = x,
                            q = Math.min(h, g),
                            w, r = Math.max(h, g) - q;
                        m && Math.abs(r) < m && (r = m, w = !e.reversed && !d.negative || e.reversed && d.negative, d.y === b && a.dataMax <= b && e.min < b && (w = !w), q = Math.abs(q - c) > m ? g - m : c - (w ? m : 0));
                        d.barX = k;
                        d.pointWidth = n;
                        d.tooltipPos = f.inverted ? [e.len + e.pos - f.plotLeft - h, a.xAxis.len - k - l / 2, r] : [k + l / 2, h + e.pos - f.plotTop, r];
                        d.shapeType = "rect";
                        d.shapeArgs =
                            a.crispCol.apply(a, d.isNull ? [k, c, l, 0] : [k, q, l, r])
                    })
                },
                getSymbol: a.noop,
                drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
                drawGraph: function() { this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data") },
                pointAttribs: function(a, f) {
                    var d = this.options,
                        g, e = this.pointAttrToOptions || {};
                    g = e.stroke || "borderColor";
                    var b = e["stroke-width"] || "borderWidth",
                        c = a && a.color || this.color,
                        k = a && a[g] || d[g] || this.color || c,
                        n = a && a[b] || d[b] || this[b] || 0,
                        e = d.dashStyle;
                    a && this.zones.length && (c = a.getZone(), c = a.options.color ||
                        c && c.color || this.color);
                    f && (a = l(d.states[f], a.options.states && a.options.states[f] || {}), f = a.brightness, c = a.color || void 0 !== f && y(c).brighten(a.brightness).get() || c, k = a[g] || k, n = a[b] || n, e = a.dashStyle || e);
                    g = { fill: c, stroke: k, "stroke-width": n };
                    e && (g.dashstyle = e);
                    return g
                },
                drawPoints: function() {
                    var a = this,
                        f = this.chart,
                        h = a.options,
                        k = f.renderer,
                        e = h.animationLimit || 250,
                        b;
                    C(a.points, function(c) {
                        var g = c.graphic,
                            q = g && f.pointCount < e ? "animate" : "attr";
                        if (d(c.plotY) && null !== c.y) {
                            b = c.shapeArgs;
                            if (g) g[q](l(b));
                            else c.graphic =
                                g = k[c.shapeType](b).add(c.group || a.group);
                            h.borderRadius && g.attr({ r: h.borderRadius });
                            g[q](a.pointAttribs(c, c.selected && "select")).shadow(h.shadow, null, h.stacking && !h.borderRadius);
                            g.addClass(c.getClassName(), !0)
                        } else g && (c.graphic = g.destroy())
                    })
                },
                animate: function(a) {
                    var f = this,
                        d = this.yAxis,
                        g = f.options,
                        e = this.chart.inverted,
                        b = {},
                        c = e ? "translateX" : "translateY",
                        m;
                    k && (a ? (b.scaleY = .001, a = Math.min(d.pos + d.len, Math.max(d.pos, d.toPixels(g.threshold))), e ? b.translateX = a - d.len : b.translateY = a, f.group.attr(b)) :
                        (m = f.group.attr(c), f.group.animate({ scaleY: 1 }, n(A(f.options.animation), {
                            step: function(a, e) {
                                b[c] = m + e.pos * (d.pos - m);
                                f.group.attr(b)
                            }
                        })), f.animate = null))
                },
                remove: function() {
                    var a = this,
                        f = a.chart;
                    f.hasRendered && C(f.series, function(f) { f.type === a.type && (f.isDirty = !0) });
                    u.prototype.remove.apply(a, arguments)
                }
            })
    })(K);
    (function(a) {
        var A = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            marker: { enabled: !0 },
            tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, { sorted: !1, requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], takeOrdinalPosition: !1, drawGraph: function() { this.options.lineWidth && A.prototype.drawGraph.call(this) } })
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.arrayMax,
            C = a.defined,
            n = a.each,
            d = a.extend,
            l = a.format,
            v = a.map,
            u = a.merge,
            t = a.noop,
            k = a.pick,
            g = a.relativeLength,
            f = a.Series,
            h = a.seriesTypes,
            q = a.some,
            e = a.stableSort;
        a.distribute = function(b, c, f) {
            function d(a, b) { return a.target - b.target }
            var g, h = !0,
                m = b,
                l = [],
                t;
            t = 0;
            var p = m.reducedLen || c;
            for (g = b.length; g--;) t += b[g].size;
            if (t > p) {
                e(b, function(a, b) { return (b.rank || 0) - (a.rank || 0) });
                for (t = g = 0; t <= p;) t += b[g].size, g++;
                l = b.splice(g - 1, b.length)
            }
            e(b, d);
            for (b = v(b, function(a) { return { size: a.size, targets: [a.target], align: k(a.align, .5) } }); h;) {
                for (g = b.length; g--;) h = b[g], t = (Math.min.apply(0, h.targets) + Math.max.apply(0, h.targets)) / 2, h.pos = Math.min(Math.max(0, t - h.size * h.align), c - h.size);
                g = b.length;
                for (h = !1; g--;) 0 < g && b[g - 1].pos + b[g - 1].size > b[g].pos && (b[g - 1].size += b[g].size, b[g - 1].targets = b[g - 1].targets.concat(b[g].targets), b[g - 1].align = .5, b[g - 1].pos + b[g - 1].size > c && (b[g - 1].pos = c - b[g - 1].size), b.splice(g, 1), h = !0)
            }
            m.push.apply(m, l);
            g = 0;
            q(b, function(b) {
                var e = 0;
                if (q(b.targets, function() {
                        m[g].pos = b.pos + e;
                        if (Math.abs(m[g].pos - m[g].target) > f) return n(m.slice(0, g + 1), function(a) { delete a.pos }), m.reducedLen = (m.reducedLen || c) - .1 * c, m.reducedLen > .1 * c && a.distribute(m, c, f), !0;
                        e += m[g].size;
                        g++
                    })) return !0
            });
            e(m, d)
        };
        f.prototype.drawDataLabels = function() {
            function b(a, b) { var c = b.filter; return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b && a > c || "\x3c" === b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0 }
            var c = this,
                e = c.chart,
                f = c.options,
                d = f.dataLabels,
                g = c.points,
                h, q, t = c.hasRendered || 0,
                p, v, D = k(d.defer, !!f.animation),
                y = e.renderer;
            if (d.enabled || c._hasPointLabels) c.dlProcessOptions && c.dlProcessOptions(d), v = c.plotGroup("dataLabelsGroup", "data-labels",
                D && !t ? "hidden" : "visible", d.zIndex || 6), D && (v.attr({ opacity: +t }), t || A(c, "afterAnimate", function() {
                c.visible && v.show(!0);
                v[f.animation ? "animate" : "attr"]({ opacity: 1 }, { duration: 200 })
            })), q = d, n(g, function(g) {
                var m, n = g.dataLabel,
                    t, x, w = g.connector,
                    B = !n,
                    F;
                h = g.dlOptions || g.options && g.options.dataLabels;
                (m = k(h && h.enabled, q.enabled) && !g.isNull) && (m = !0 === b(g, h || d));
                m && (d = u(q, h), t = g.getLabelConfig(), F = d[g.formatPrefix + "Format"] || d.format, p = C(F) ? l(F, t, e.time) : (d[g.formatPrefix + "Formatter"] || d.formatter).call(t, d),
                    F = d.style, t = d.rotation, F.color = k(d.color, F.color, c.color, "#000000"), "contrast" === F.color && (g.contrastColor = y.getContrast(g.color || c.color), F.color = d.inside || 0 > k(g.labelDistance, d.distance) || f.stacking ? g.contrastColor : "#000000"), f.cursor && (F.cursor = f.cursor), x = { fill: d.backgroundColor, stroke: d.borderColor, "stroke-width": d.borderWidth, r: d.borderRadius || 0, rotation: t, padding: d.padding, zIndex: 1 }, a.objectEach(x, function(a, b) { void 0 === a && delete x[b] }));
                !n || m && C(p) ? m && C(p) && (n ? x.text = p : (n = g.dataLabel = t ? y.text(p,
                    0, -9999).addClass("highcharts-data-label") : y.label(p, 0, -9999, d.shape, null, null, d.useHTML, null, "data-label"), n.addClass(" highcharts-data-label-color-" + g.colorIndex + " " + (d.className || "") + (d.useHTML ? " highcharts-tracker" : ""))), n.attr(x), n.css(F).shadow(d.shadow), n.added || n.add(v), c.alignDataLabel(g, n, d, null, B)) : (g.dataLabel = n = n.destroy(), w && (g.connector = w.destroy()))
            });
            a.fireEvent(this, "afterDrawDataLabels")
        };
        f.prototype.alignDataLabel = function(a, c, e, f, g) {
            var b = this.chart,
                h = b.inverted,
                m = k(a.dlBox &&
                    a.dlBox.centerX, a.plotX, -9999),
                l = k(a.plotY, -9999),
                p = c.getBBox(),
                q, n = e.rotation,
                t = e.align,
                u = this.visible && (a.series.forceDL || b.isInsidePlot(m, Math.round(l), h) || f && b.isInsidePlot(m, h ? f.x + 1 : f.y + f.height - 1, h)),
                r = "justify" === k(e.overflow, "justify");
            if (u && (q = e.style.fontSize, q = b.renderer.fontMetrics(q, c).b, f = d({ x: h ? this.yAxis.len - l : m, y: Math.round(h ? this.xAxis.len - m : l), width: 0, height: 0 }, f), d(e, { width: p.width, height: p.height }), n ? (r = !1, m = b.renderer.rotCorr(q, n), m = {
                    x: f.x + e.x + f.width / 2 + m.x,
                    y: f.y + e.y + {
                        top: 0,
                        middle: .5,
                        bottom: 1
                    }[e.verticalAlign] * f.height
                }, c[g ? "attr" : "animate"](m).attr({ align: t }), l = (n + 720) % 360, l = 180 < l && 360 > l, "left" === t ? m.y -= l ? p.height : 0 : "center" === t ? (m.x -= p.width / 2, m.y -= p.height / 2) : "right" === t && (m.x -= p.width, m.y -= l ? 0 : p.height), c.placed = !0, c.alignAttr = m) : (c.align(e, null, f), m = c.alignAttr), r ? a.isLabelJustified = this.justifyDataLabel(c, e, m, p, f, g) : k(e.crop, !0) && (u = b.isInsidePlot(m.x, m.y) && b.isInsidePlot(m.x + p.width, m.y + p.height)), e.shape && !n)) c[g ? "attr" : "animate"]({
                anchorX: h ? b.plotWidth - a.plotY : a.plotX,
                anchorY: h ? b.plotHeight - a.plotX : a.plotY
            });
            u || (c.attr({ y: -9999 }), c.placed = !1)
        };
        f.prototype.justifyDataLabel = function(a, c, e, f, d, g) {
            var b = this.chart,
                h = c.align,
                k = c.verticalAlign,
                m, l, q = a.box ? 0 : a.padding || 0;
            m = e.x + q;
            0 > m && ("right" === h ? c.align = "left" : c.x = -m, l = !0);
            m = e.x + f.width - q;
            m > b.plotWidth && ("left" === h ? c.align = "right" : c.x = b.plotWidth - m, l = !0);
            m = e.y + q;
            0 > m && ("bottom" === k ? c.verticalAlign = "top" : c.y = -m, l = !0);
            m = e.y + f.height - q;
            m > b.plotHeight && ("top" === k ? c.verticalAlign = "bottom" : c.y = b.plotHeight - m, l = !0);
            l && (a.placed = !g, a.align(c, null, d));
            return l
        };
        h.pie && (h.pie.prototype.drawDataLabels = function() {
            var b = this,
                c = b.data,
                e, d = b.chart,
                g = b.options.dataLabels,
                h = k(g.connectorPadding, 10),
                l = k(g.connectorWidth, 1),
                q = d.plotWidth,
                t = d.plotHeight,
                p = Math.round(d.chartWidth / 3),
                u, v = b.center,
                A = v[2] / 2,
                H = v[1],
                r, z, N, K, L = [
                    [],
                    []
                ],
                P, O, E, Q, R = [0, 0, 0, 0];
            b.visible && (g.enabled || b._hasPointLabels) && (n(c, function(a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }),
                    a.dataLabel.shortened = !1)
            }), f.prototype.drawDataLabels.apply(b), n(c, function(a) { a.dataLabel && (a.visible ? (L[a.half].push(a), a.dataLabel._pos = null, !C(g.style.width) && !C(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > p && (a.dataLabel.css({ width: .7 * p }), a.dataLabel.shortened = !0)) : a.dataLabel = a.dataLabel.destroy()) }), n(L, function(c, f) {
                var m, l, p = c.length,
                    x = [],
                    w;
                if (p)
                    for (b.sortByAngle(c, f - .5), 0 < b.maxLabelDistance && (m = Math.max(0, H - A - b.maxLabelDistance),
                            l = Math.min(H + A + b.maxLabelDistance, d.plotHeight), n(c, function(a) { 0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, H - A - a.labelDistance), a.bottom = Math.min(H + A + a.labelDistance, d.plotHeight), w = a.dataLabel.getBBox().height || 21, a.distributeBox = { target: a.labelPos[1] - a.top + w / 2, size: w, rank: a.y }, x.push(a.distributeBox)) }), m = l + w - m, a.distribute(x, m, m / 5)), Q = 0; Q < p; Q++) e = c[Q], N = e.labelPos, r = e.dataLabel, E = !1 === e.visible ? "hidden" : "inherit", O = m = N[1], x && C(e.distributeBox) && (void 0 === e.distributeBox.pos ? E = "hidden" : (K =
                        e.distributeBox.size, O = e.top + e.distributeBox.pos)), delete e.positionIndex, P = g.justify ? v[0] + (f ? -1 : 1) * (A + e.labelDistance) : b.getX(O < e.top + 2 || O > e.bottom - 2 ? m : O, f, e), r._attr = { visibility: E, align: N[6] }, r._pos = { x: P + g.x + ({ left: h, right: -h }[N[6]] || 0), y: O + g.y - 10 }, N.x = P, N.y = O, k(g.crop, !0) && (z = r.getBBox().width, m = null, P - z < h && 1 === f ? (m = Math.round(z - P + h), R[3] = Math.max(m, R[3])) : P + z > q - h && 0 === f && (m = Math.round(P + z - q + h), R[1] = Math.max(m, R[1])), 0 > O - K / 2 ? R[0] = Math.max(Math.round(-O + K / 2), R[0]) : O + K / 2 > t && (R[2] = Math.max(Math.round(O +
                        K / 2 - t), R[2])), r.sideOverflow = m)
            }), 0 === y(R) || this.verifyDataLabelOverflow(R)) && (this.placeDataLabels(), l && n(this.points, function(a) {
                var c;
                u = a.connector;
                if ((r = a.dataLabel) && r._pos && a.visible && 0 < a.labelDistance) {
                    E = r._attr.visibility;
                    if (c = !u) a.connector = u = d.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ? " " + a.className : "")).add(b.dataLabelsGroup), u.attr({ "stroke-width": l, stroke: g.connectorColor || a.color || "#666666" });
                    u[c ? "attr" : "animate"]({ d: b.connectorPath(a.labelPos) });
                    u.attr("visibility", E)
                } else u && (a.connector = u.destroy())
            }))
        }, h.pie.prototype.connectorPath = function(a) {
            var b = a.x,
                e = a.y;
            return k(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), e, "C", b, e, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), e, "L", a[2], a[3], "L", a[4], a[5]]
        }, h.pie.prototype.placeDataLabels = function() {
            n(this.points, function(a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
                    width: b._attr.width +
                        "px",
                    textOverflow: this.options.dataLabels.style.textOverflow || "ellipsis"
                }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({ y: -9999 }))
            }, this)
        }, h.pie.prototype.alignDataLabel = t, h.pie.prototype.verifyDataLabelOverflow = function(a) {
            var b = this.center,
                e = this.options,
                f = e.center,
                d = e.minSize || 80,
                h, k = null !== e.size;
            k || (null !== f[0] ? h = Math.max(b[2] - Math.max(a[1], a[3]), d) : (h = Math.max(b[2] - a[1] - a[3], d), b[0] += (a[3] - a[1]) / 2), null !== f[1] ? h = Math.max(Math.min(h, b[2] - Math.max(a[0],
                a[2])), d) : (h = Math.max(Math.min(h, b[2] - a[0] - a[2]), d), b[1] += (a[0] - a[2]) / 2), h < b[2] ? (b[2] = h, b[3] = Math.min(g(e.innerSize || 0, h), h), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : k = !0);
            return k
        });
        h.column && (h.column.prototype.alignDataLabel = function(a, c, e, d, g) {
            var b = this.chart.inverted,
                h = a.series,
                m = a.dlBox || a.shapeArgs,
                l = k(a.below, a.plotY > k(this.translatedThreshold, h.yAxis.len)),
                p = k(e.inside, !!this.options.stacking);
            m && (d = u(m), 0 > d.y && (d.height += d.y, d.y = 0), m = d.y + d.height - h.yAxis.len, 0 < m && (d.height -=
                m), b && (d = { x: h.yAxis.len - d.y - d.height, y: h.xAxis.len - d.x - d.width, width: d.height, height: d.width }), p || (b ? (d.x += l ? 0 : d.width, d.width = 0) : (d.y += l ? d.height : 0, d.height = 0)));
            e.align = k(e.align, !b || p ? "center" : l ? "right" : "left");
            e.verticalAlign = k(e.verticalAlign, b || p ? "middle" : l ? "top" : "bottom");
            f.prototype.alignDataLabel.call(this, a, c, e, d, g);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({ color: a.contrastColor })
        })
    })(K);
    (function(a) {
        var A = a.Chart,
            y = a.each,
            C = a.objectEach,
            n = a.pick;
        a = a.addEvent;
        a(A, "render", function() {
            var a = [];
            y(this.labelCollectors || [], function(d) { a = a.concat(d()) });
            y(this.yAxis || [], function(d) { d.options.stackLabels && !d.options.stackLabels.allowOverlap && C(d.stacks, function(d) { C(d, function(d) { a.push(d.label) }) }) });
            y(this.series || [], function(d) {
                var l = d.options.dataLabels,
                    u = d.dataLabelCollections || ["dataLabel"];
                (l.enabled || d._hasPointLabels) && !l.allowOverlap && d.visible && y(u, function(l) { y(d.points, function(d) { d[l] && (d[l].labelrank = n(d.labelrank, d.shapeArgs && d.shapeArgs.height), a.push(d[l])) }) })
            });
            this.hideOverlappingLabels(a)
        });
        A.prototype.hideOverlappingLabels = function(a) {
            var d = a.length,
                n, u, t, k, g, f, h = function(a, e, b, c, d, f, g, h) { return !(d > a + b || d + g < a || f > e + c || f + h < e) };
            t = function(a) { var e, b, c, d = 2 * (a.box ? 0 : a.padding || 0); if (a && (!a.alignAttr || a.placed)) return e = a.alignAttr || { x: a.attr("x"), y: a.attr("y") }, b = a.parentGroup, a.width || (c = a.getBBox(), a.width = c.width, a.height = c.height), { x: e.x + (b.translateX || 0), y: e.y + (b.translateY || 0), width: a.width - d, height: a.height - d } };
            for (u = 0; u < d; u++)
                if (n = a[u]) n.oldOpacity = n.opacity, n.newOpacity = 1, n.absoluteBox =
                    t(n);
            a.sort(function(a, e) { return (e.labelrank || 0) - (a.labelrank || 0) });
            for (u = 0; u < d; u++)
                for (f = (t = a[u]) && t.absoluteBox, n = u + 1; n < d; ++n)
                    if (g = (k = a[n]) && k.absoluteBox, f && g && t !== k && 0 !== t.newOpacity && 0 !== k.newOpacity && (g = h(f.x, f.y, f.width, f.height, g.x, g.y, g.width, g.height)))(t.labelrank < k.labelrank ? t : k).newOpacity = 0;
            y(a, function(a) {
                var e, b;
                a && (b = a.newOpacity, a.oldOpacity !== b && (a.alignAttr && a.placed ? (b ? a.show(!0) : e = function() { a.hide() }, a.alignAttr.opacity = b, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, e)) : a.attr({ opacity: b })),
                    a.isOld = !0)
            })
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.Chart,
            C = a.createElement,
            n = a.css,
            d = a.defaultOptions,
            l = a.defaultPlotOptions,
            v = a.each,
            u = a.extend,
            t = a.fireEvent,
            k = a.hasTouch,
            g = a.inArray,
            f = a.isObject,
            h = a.Legend,
            q = a.merge,
            e = a.pick,
            b = a.Point,
            c = a.Series,
            m = a.seriesTypes,
            B = a.svg,
            I;
        I = a.TrackerMixin = {
            drawTrackerPoint: function() {
                var a = this,
                    b = a.chart.pointer,
                    c = function(a) {
                        var c = b.getPointFromEvent(a);
                        void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
                    };
                v(a.points, function(a) {
                    a.graphic && (a.graphic.element.point =
                        a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (v(a.trackerGroups, function(e) {
                    if (a[e]) {
                        a[e].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function(a) { b.onTrackerMouseOut(a) });
                        if (k) a[e].on("touchstart", c);
                        a.options.cursor && a[e].css(n).css({ cursor: a.options.cursor })
                    }
                }), a._hasTracking = !0);
                t(this, "afterDrawTracker")
            },
            drawTrackerGraph: function() {
                var a = this,
                    b = a.options,
                    c = b.trackByArea,
                    e = [].concat(c ? a.areaPath : a.graphPath),
                    d = e.length,
                    f = a.chart,
                    g = f.pointer,
                    h = f.renderer,
                    m = f.options.tooltip.snap,
                    l = a.tracker,
                    q, n = function() { if (f.hoverSeries !== a) a.onMouseOver() },
                    u = "rgba(192,192,192," + (B ? .0001 : .002) + ")";
                if (d && !c)
                    for (q = d + 1; q--;) "M" === e[q] && e.splice(q + 1, 0, e[q + 1] - m, e[q + 2], "L"), (q && "M" === e[q] || q === d) && e.splice(q, 0, "L", e[q - 2] + m, e[q - 1]);
                l ? l.attr({ d: e }) : a.graph && (a.tracker = h.path(e).attr({ "stroke-linejoin": "round", visibility: a.visible ? "visible" : "hidden", stroke: u, fill: c ? u : "none", "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * m), zIndex: 2 }).add(a.group),
                    v([a.tracker, a.markerGroup], function(a) {
                        a.addClass("highcharts-tracker").on("mouseover", n).on("mouseout", function(a) { g.onTrackerMouseOut(a) });
                        b.cursor && a.css({ cursor: b.cursor });
                        if (k) a.on("touchstart", n)
                    }));
                t(this, "afterDrawTracker")
            }
        };
        m.column && (m.column.prototype.drawTracker = I.drawTrackerPoint);
        m.pie && (m.pie.prototype.drawTracker = I.drawTrackerPoint);
        m.scatter && (m.scatter.prototype.drawTracker = I.drawTrackerPoint);
        u(h.prototype, {
            setItemEvents: function(a, c, e) {
                var d = this,
                    f = d.chart.renderer.boxWrapper,
                    g = "highcharts-legend-" + (a instanceof b ? "point" : "series") + "-active";
                (e ? c : a.legendGroup).on("mouseover", function() {
                    a.setState("hover");
                    f.addClass(g);
                    c.css(d.options.itemHoverStyle)
                }).on("mouseout", function() {
                    c.css(q(a.visible ? d.itemStyle : d.itemHiddenStyle));
                    f.removeClass(g);
                    a.setState()
                }).on("click", function(b) {
                    var c = function() { a.setVisible && a.setVisible() };
                    f.removeClass(g);
                    b = { browserEvent: b };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : t(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function(a) {
                a.checkbox =
                    C("input", { type: "checkbox", checked: a.selected, defaultChecked: a.selected }, this.options.itemCheckboxStyle, this.chart.container);
                A(a.checkbox, "click", function(b) { t(a.series || a, "checkboxClick", { checked: b.target.checked, item: a }, function() { a.select() }) })
            }
        });
        d.legend.itemStyle.cursor = "pointer";
        u(y.prototype, {
            showResetZoom: function() {
                function a() { b.zoomOut() }
                var b = this,
                    c = d.lang,
                    e = b.options.chart.resetZoomButton,
                    f = e.theme,
                    g = f.states,
                    h = "chart" === e.relativeTo ? null : "plotBox";
                t(this, "beforeShowResetZoom", null,
                    function() { b.resetZoomButton = b.renderer.button(c.resetZoom, null, null, a, f, g && g.hover).attr({ align: e.position.align, title: c.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(e.position, !1, h) })
            },
            zoomOut: function() { t(this, "selection", { resetSelection: !0 }, this.zoom) },
            zoom: function(a) {
                var b, c = this.pointer,
                    d = !1,
                    g;
                !a || a.resetSelection ? (v(this.axes, function(a) { b = a.zoom() }), c.initiated = !1) : v(a.xAxis.concat(a.yAxis), function(a) {
                    var e = a.axis;
                    c[e.isXAxis ? "zoomX" : "zoomY"] && (b = e.zoom(a.min, a.max), e.displayBtn &&
                        (d = !0))
                });
                g = this.resetZoomButton;
                d && !g ? this.showResetZoom() : !d && f(g) && (this.resetZoomButton = g.destroy());
                b && this.redraw(e(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function(a, b) {
                var c = this,
                    e = c.hoverPoints,
                    d;
                e && v(e, function(a) { a.setState() });
                v("xy" === b ? [1, 0] : [1], function(b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var e = b.horiz,
                        f = a[e ? "chartX" : "chartY"],
                        e = e ? "mouseDownX" : "mouseDownY",
                        g = c[e],
                        h = (b.pointRange || 0) / 2,
                        k = b.reversed && !c.inverted || !b.reversed && c.inverted ? -1 : 1,
                        m = b.getExtremes(),
                        l = b.toValue(g - f, !0) + h * k,
                        k = b.toValue(g + b.len - f, !0) - h * k,
                        p = k < l,
                        g = p ? k : l,
                        l = p ? l : k,
                        k = Math.min(m.dataMin, h ? m.min : b.toValue(b.toPixels(m.min) - b.minPixelPadding)),
                        h = Math.max(m.dataMax, h ? m.max : b.toValue(b.toPixels(m.max) + b.minPixelPadding)),
                        p = k - g;
                    0 < p && (l += p, g = k);
                    p = l - h;
                    0 < p && (l = h, g -= p);
                    b.series.length && g !== m.min && l !== m.max && (b.setExtremes(g, l, !1, !1, { trigger: "pan" }), d = !0);
                    c[e] = f
                });
                d && c.redraw(!1);
                n(c.container, { cursor: "move" })
            }
        });
        u(b.prototype, {
            select: function(a, b) {
                var c = this,
                    d = c.series,
                    f = d.chart;
                a = e(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", { accumulate: b }, function() {
                    c.selected = c.options.selected = a;
                    d.options.data[g(c, d.data)] = c.options;
                    c.setState(a && "select");
                    b || v(f.getSelectedPoints(), function(a) { a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[g(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect")) })
                })
            },
            onMouseOver: function(a) {
                var b = this.series.chart,
                    c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            },
            onMouseOut: function() {
                var a =
                    this.series.chart;
                this.firePointEvent("mouseOut");
                v(a.hoverPoints || [], function(a) { a.setState() });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var b = this,
                        c = q(b.series.options.point, b.options).events;
                    b.events = c;
                    a.objectEach(c, function(a, c) { A(b, c, a) });
                    this.hasImportedEvents = !0
                }
            },
            setState: function(a, b) {
                var c = Math.floor(this.plotX),
                    d = this.plotY,
                    f = this.series,
                    g = f.options.states[a || "normal"] || {},
                    h = l[f.type].marker && f.options.marker,
                    k = h && !1 === h.enabled,
                    m = h && h.states &&
                    h.states[a || "normal"] || {},
                    q = !1 === m.enabled,
                    n = f.stateMarkerGraphic,
                    x = this.marker || {},
                    v = f.chart,
                    B = f.halo,
                    y, A = h && f.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === g.enabled || a && (q || k && !1 === m.enabled) || a && x.states && x.states[a] && !1 === x.states[a].enabled)) {
                    A && (y = f.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.animate(f.pointAttribs(this, a), e(v.options.chart.animation,
                        g.animation)), y && this.graphic.animate(y, e(v.options.chart.animation, m.animation, h.animation)), n && n.hide();
                    else {
                        if (a && m) {
                            h = x.symbol || f.symbol;
                            n && n.currentSymbol !== h && (n = n.destroy());
                            if (n) n[b ? "animate" : "attr"]({ x: y.x, y: y.y });
                            else h && (f.stateMarkerGraphic = n = v.renderer.symbol(h, y.x, y.y, y.width, y.height).add(f.markerGroup), n.currentSymbol = h);
                            n && n.attr(f.pointAttribs(this, a))
                        }
                        n && (n[a && v.isInsidePlot(c, d, v.inverted) ? "show" : "hide"](), n.element.point = this)
                    }(c = g.halo) && c.size ? (B || (f.halo = B = v.renderer.path().add((this.graphic ||
                        n).parentGroup)), B.show()[b ? "animate" : "attr"]({ d: this.haloPath(c.size) }), B.attr({ "class": "highcharts-halo highcharts-color-" + e(this.colorIndex, f.colorIndex) + (this.className ? " " + this.className : ""), zIndex: -1 }), B.point = this, B.attr(u({ fill: this.color || f.color, "fill-opacity": c.opacity }, c.attributes))) : B && B.point && B.point.haloPath && B.animate({ d: B.point.haloPath(0) }, null, B.hide);
                    this.state = a;
                    t(this, "afterSetState")
                }
            },
            haloPath: function(a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) -
                    a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        u(c.prototype, {
            onMouseOver: function() {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && t(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function() {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    e = b.hoverPoint;
                b.hoverSeries = null;
                if (e) e.onMouseOut();
                this && a.events.mouseOut && t(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function(a) {
                var b = this,
                    c = b.options,
                    d = b.graph,
                    f = c.states,
                    g = c.lineWidth,
                    c = 0;
                a = a || "";
                if (b.state !== a && (v([b.group, b.markerGroup, b.dataLabelsGroup], function(c) { c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a)) }), b.state = a, !f[a] || !1 !== f[a].enabled) && (a && (g = f[a].lineWidth || g + (f[a].lineWidthPlus || 0)), d && !d.dashstyle))
                    for (g = { "stroke-width": g }, d.animate(g, e(f[a || "normal"] && f[a || "normal"].animation, b.chart.options.chart.animation)); b["zone-graph-" + c];) b["zone-graph-" + c].attr(g), c += 1
            },
            setVisible: function(a, b) {
                var c = this,
                    e = c.chart,
                    d = c.legendItem,
                    f, g = e.options.chart.ignoreHiddenSeries,
                    h = c.visible;
                f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !h : a) ? "show" : "hide";
                v(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function(a) { if (c[a]) c[a][f]() });
                if (e.hoverSeries === c || (e.hoverPoint && e.hoverPoint.series) === c) c.onMouseOut();
                d && e.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && v(e.series, function(a) { a.options.stacking && a.visible && (a.isDirty = !0) });
                v(c.linkedSeries,
                    function(b) { b.setVisible(a, !1) });
                g && (e.isDirtyBox = !0);
                t(c, f);
                !1 !== b && e.redraw()
            },
            show: function() { this.setVisible(!0) },
            hide: function() { this.setVisible(!1) },
            select: function(a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                t(this, a ? "select" : "unselect")
            },
            drawTracker: I.drawTrackerGraph
        })
    })(K);
    (function(a) {
        var A = a.Chart,
            y = a.each,
            C = a.inArray,
            n = a.isArray,
            d = a.isObject,
            l = a.pick,
            v = a.splat;
        A.prototype.setResponsive = function(d) {
            var l = this.options.responsive,
                k = [],
                g = this.currentResponsive;
            l && l.rules && y(l.rules, function(f) {
                void 0 === f._id && (f._id = a.uniqueKey());
                this.matchResponsiveRule(f, k, d)
            }, this);
            var f = a.merge.apply(0, a.map(k, function(d) { return a.find(l.rules, function(a) { return a._id === d }).chartOptions })),
                k = k.toString() || void 0;
            k !== (g && g.ruleIds) && (g && this.update(g.undoOptions, d), k ? (this.currentResponsive = { ruleIds: k, mergedOptions: f, undoOptions: this.currentOptions(f) }, this.update(f, d)) : this.currentResponsive = void 0)
        };
        A.prototype.matchResponsiveRule = function(a, d) {
            var k = a.condition;
            (k.callback || function() { return this.chartWidth <= l(k.maxWidth, Number.MAX_VALUE) && this.chartHeight <= l(k.maxHeight, Number.MAX_VALUE) && this.chartWidth >= l(k.minWidth, 0) && this.chartHeight >= l(k.minHeight, 0) }).call(this) && d.push(a._id)
        };
        A.prototype.currentOptions = function(l) {
            function t(g, f, h, k) {
                var e;
                a.objectEach(g, function(a, c) {
                    if (!k && -1 < C(c, ["series", "xAxis", "yAxis"]))
                        for (a = v(a), h[c] = [], e = 0; e < a.length; e++) f[c][e] && (h[c][e] = {}, t(a[e], f[c][e], h[c][e], k + 1));
                    else d(a) ? (h[c] = n(a) ? [] : {}, t(a, f[c] || {}, h[c], k + 1)) :
                        h[c] = f[c] || null
                })
            }
            var k = {};
            t(l, this.options, k, 0);
            return k
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.Axis,
            C = a.each,
            n = a.pick;
        A(y, "getSeriesExtremes", function() {
            var a = [];
            this.isXAxis && (C(this.series, function(d, n) { d.useMapGeometry && (a[n] = d.xData, d.xData = []) }), this.seriesXData = a)
        });
        A(y, "afterGetSeriesExtremes", function() {
            var a = this.seriesXData,
                l, v, u;
            this.isXAxis && (l = n(this.dataMin, Number.MAX_VALUE), v = n(this.dataMax, -Number.MAX_VALUE), C(this.series, function(d, k) {
                d.useMapGeometry && (l = Math.min(l, n(d.minX, l)),
                    v = Math.max(v, n(d.maxX, v)), d.xData = a[k], u = !0)
            }), u && (this.dataMin = l, this.dataMax = v), delete this.seriesXData)
        });
        A(y, "afterSetAxisTranslation", function() {
            var a = this.chart,
                l;
            l = a.plotWidth / a.plotHeight;
            var a = a.xAxis[0],
                n;
            "yAxis" === this.coll && void 0 !== a.transA && C(this.series, function(a) { a.preserveAspectRatio && (n = !0) });
            if (n && (this.transA = a.transA = Math.min(this.transA, a.transA), l /= (a.max - a.min) / (this.max - this.min), l = 1 > l ? this : a, a = (l.max - l.min) * l.transA, l.pixelPadding = l.len - a, l.minPixelPadding = l.pixelPadding /
                    2, a = l.fixTo)) {
                a = a[1] - l.toValue(a[0], !0);
                a *= l.transA;
                if (Math.abs(a) > l.minPixelPadding || l.min === l.dataMin && l.max === l.dataMax) a = 0;
                l.minPixelPadding -= a
            }
        });
        A(y, "render", function() { this.fixTo = null })
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.Axis,
            C = a.Chart,
            n = a.color,
            d, l = a.each,
            v = a.extend,
            u = a.isNumber,
            t = a.Legend,
            k = a.LegendSymbolMixin,
            g = a.noop,
            f = a.merge,
            h = a.pick;
        a.ColorAxis || (d = a.ColorAxis = function() { this.init.apply(this, arguments) }, v(d.prototype, y.prototype), v(d.prototype, {
            defaultColorAxisOptions: {
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                startOnTick: !0,
                endOnTick: !0,
                offset: 0,
                marker: { animation: { duration: 50 }, width: .01, color: "#999999" },
                labels: { overflow: "justify", rotation: 0 },
                minColor: "#e6ebf5",
                maxColor: "#003399",
                tickLength: 5,
                showInLegend: !0
            },
            keepProps: ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"].concat(y.prototype.keepProps),
            init: function(a, e) {
                var b = "vertical" !== a.options.legend.layout,
                    c;
                this.coll = "colorAxis";
                c = f(this.defaultColorAxisOptions, { side: b ? 2 : 1, reversed: !b }, e, { opposite: !b, showEmpty: !1, title: null, visible: a.options.legend.enabled });
                y.prototype.init.call(this, a, c);
                e.dataClasses && this.initDataClasses(e);
                this.initStops();
                this.horiz = b;
                this.zoomEnabled = !1;
                this.defaultLegendLength = 200
            },
            initDataClasses: function(a) {
                var e = this.chart,
                    b, c = 0,
                    d = e.options.chart.colorCount,
                    g = this.options,
                    h = a.dataClasses.length;
                this.dataClasses = b = [];
                this.legendItems = [];
                l(a.dataClasses, function(a, k) {
                    a = f(a);
                    b.push(a);
                    a.color || ("category" === g.dataClassColor ? (k = e.options.colors,
                        d = k.length, a.color = k[c], a.colorIndex = c, c++, c === d && (c = 0)) : a.color = n(g.minColor).tweenTo(n(g.maxColor), 2 > h ? .5 : k / (h - 1)))
                })
            },
            setTickPositions: function() { if (!this.dataClasses) return y.prototype.setTickPositions.call(this) },
            initStops: function() {
                this.stops = this.options.stops || [
                    [0, this.options.minColor],
                    [1, this.options.maxColor]
                ];
                l(this.stops, function(a) { a.color = n(a[1]) })
            },
            setOptions: function(a) {
                y.prototype.setOptions.call(this, a);
                this.options.crosshair = this.options.marker
            },
            setAxisSize: function() {
                var a = this.legendSymbol,
                    e = this.chart,
                    b = e.options.legend || {},
                    c, d;
                a ? (this.left = b = a.attr("x"), this.top = c = a.attr("y"), this.width = d = a.attr("width"), this.height = a = a.attr("height"), this.right = e.chartWidth - b - d, this.bottom = e.chartHeight - c - a, this.len = this.horiz ? d : a, this.pos = this.horiz ? b : c) : this.len = (this.horiz ? b.symbolWidth : b.symbolHeight) || this.defaultLegendLength
            },
            normalizedValue: function(a) { this.isLog && (a = this.val2lin(a)); return 1 - (this.max - a) / (this.max - this.min || 1) },
            toColor: function(a, e) {
                var b = this.stops,
                    c, d, f = this.dataClasses,
                    g, h;
                if (f)
                    for (h = f.length; h--;) {
                        if (g = f[h], c = g.from, b = g.to, (void 0 === c || a >= c) && (void 0 === b || a <= b)) {
                            d = g.color;
                            e && (e.dataClass = h, e.colorIndex = g.colorIndex);
                            break
                        }
                    } else {
                        a = this.normalizedValue(a);
                        for (h = b.length; h-- && !(a > b[h][0]););
                        c = b[h] || b[h + 1];
                        b = b[h + 1] || c;
                        a = 1 - (b[0] - a) / (b[0] - c[0] || 1);
                        d = c.color.tweenTo(b.color, a)
                    }
                return d
            },
            getOffset: function() {
                var a = this.legendGroup,
                    e = this.chart.axisOffset[this.side];
                a && (this.axisParent = a, y.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight =
                    this.width), this.chart.axisOffset[this.side] = e)
            },
            setLegendColor: function() {
                var a, e = this.reversed;
                a = e ? 1 : 0;
                e = e ? 0 : 1;
                a = this.horiz ? [a, 0, e, 0] : [0, e, 0, a];
                this.legendColor = { linearGradient: { x1: a[0], y1: a[1], x2: a[2], y2: a[3] }, stops: this.stops }
            },
            drawLegendSymbol: function(a, e) {
                var b = a.padding,
                    c = a.options,
                    d = this.horiz,
                    f = h(c.symbolWidth, d ? this.defaultLegendLength : 12),
                    g = h(c.symbolHeight, d ? 12 : this.defaultLegendLength),
                    k = h(c.labelPadding, d ? 16 : 30),
                    c = h(c.itemDistance, 10);
                this.setLegendColor();
                e.legendSymbol = this.chart.renderer.rect(0,
                    a.baseline - 11, f, g).attr({ zIndex: 1 }).add(e.legendGroup);
                this.legendItemWidth = f + b + (d ? c : k);
                this.legendItemHeight = g + b + (d ? k : 0)
            },
            setState: function(a) { l(this.series, function(e) { e.setState(a) }) },
            visible: !0,
            setVisible: g,
            getSeriesExtremes: function() {
                var a = this.series,
                    e = a.length;
                this.dataMin = Infinity;
                for (this.dataMax = -Infinity; e--;) a[e].getExtremes(), void 0 !== a[e].valueMin && (this.dataMin = Math.min(this.dataMin, a[e].valueMin), this.dataMax = Math.max(this.dataMax, a[e].valueMax))
            },
            drawCrosshair: function(a, e) {
                var b =
                    e && e.plotX,
                    c = e && e.plotY,
                    d, f = this.pos,
                    g = this.len;
                e && (d = this.toPixels(e[e.series.colorKey]), d < f ? d = f - 2 : d > f + g && (d = f + g + 2), e.plotX = d, e.plotY = this.len - d, y.prototype.drawCrosshair.call(this, a, e), e.plotX = b, e.plotY = c, this.cross && !this.cross.addedToColorAxis && this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.addedToColorAxis = !0, this.cross.attr({ fill: this.crosshair.color })))
            },
            getPlotLinePath: function(a, e, b, c, d) {
                return u(d) ? this.horiz ? ["M", d - 4, this.top - 6, "L",
                    d + 4, this.top - 6, d, this.top, "Z"
                ] : ["M", this.left, d, "L", this.left - 6, d + 6, this.left - 6, d - 6, "Z"] : y.prototype.getPlotLinePath.call(this, a, e, b, c)
            },
            update: function(a, e) {
                var b = this.chart,
                    c = b.legend;
                l(this.series, function(a) { a.isDirtyData = !0 });
                a.dataClasses && c.allItems && (l(c.allItems, function(a) { a.isDataClass && a.legendGroup && a.legendGroup.destroy() }), b.isDirtyLegend = !0);
                b.options[this.coll] = f(this.userOptions, a);
                y.prototype.update.call(this, a, e);
                this.legendItem && (this.setLegendColor(), c.colorizeItem(this, !0))
            },
            remove: function() {
                this.legendItem && this.chart.legend.destroyItem(this);
                y.prototype.remove.call(this)
            },
            getDataClassLegendSymbols: function() {
                var d = this,
                    e = this.chart,
                    b = this.legendItems,
                    c = e.options.legend,
                    f = c.valueDecimals,
                    h = c.valueSuffix || "",
                    n;
                b.length || l(this.dataClasses, function(c, m) {
                    var q = !0,
                        t = c.from,
                        p = c.to;
                    n = "";
                    void 0 === t ? n = "\x3c " : void 0 === p && (n = "\x3e ");
                    void 0 !== t && (n += a.numberFormat(t, f) + h);
                    void 0 !== t && void 0 !== p && (n += " - ");
                    void 0 !== p && (n += a.numberFormat(p, f) + h);
                    b.push(v({
                        chart: e,
                        name: n,
                        options: {},
                        drawLegendSymbol: k.drawRectangle,
                        visible: !0,
                        setState: g,
                        isDataClass: !0,
                        setVisible: function() {
                            q = this.visible = !q;
                            l(d.series, function(a) { l(a.points, function(a) { a.dataClass === m && a.setVisible(q) }) });
                            e.legend.colorizeItem(this, q)
                        }
                    }, c))
                });
                return b
            },
            name: ""
        }), l(["fill", "stroke"], function(d) { a.Fx.prototype[d + "Setter"] = function() { this.elem.attr(d, n(this.start).tweenTo(n(this.end), this.pos), null, !0) } }), A(C, "afterGetAxes", function() {
            var a = this.options.colorAxis;
            this.colorAxis = [];
            a && new d(this, a)
        }), A(t, "afterGetAllItems",
            function(d) {
                var e = [],
                    b = this.chart.colorAxis[0];
                b && b.options && b.options.showInLegend && (b.options.dataClasses ? e = b.getDataClassLegendSymbols() : e.push(b), l(b.series, function(b) { a.erase(d.allItems, b) }));
                for (b = e.length; b--;) d.allItems.unshift(e[b])
            }), A(t, "afterColorizeItem", function(a) { a.visible && a.item.legendColor && a.item.legendSymbol.attr({ fill: a.item.legendColor }) }), A(t, "afterUpdate", function(a, e, b) { this.chart.colorAxis[0] && this.chart.colorAxis[0].update({}, b) }))
    })(K);
    (function(a) {
        var A = a.defined,
            y =
            a.each,
            C = a.noop,
            n = a.seriesTypes;
        a.colorPointMixin = {
            isValid: function() { return null !== this.value && Infinity !== this.value && -Infinity !== this.value },
            setVisible: function(a) {
                var d = this,
                    n = a ? "show" : "hide";
                y(["graphic", "dataLabel"], function(a) { if (d[a]) d[a][n]() })
            },
            setState: function(d) {
                a.Point.prototype.setState.call(this, d);
                this.graphic && this.graphic.attr({ zIndex: "hover" === d ? 1 : 0 })
            }
        };
        a.colorSeriesMixin = {
            pointArrayMap: ["value"],
            axisTypes: ["xAxis", "yAxis", "colorAxis"],
            optionalAxis: "colorAxis",
            trackerGroups: ["group",
                "markerGroup", "dataLabelsGroup"
            ],
            getSymbol: C,
            parallelArrays: ["x", "y", "value"],
            colorKey: "value",
            pointAttribs: n.column.prototype.pointAttribs,
            translateColors: function() {
                var a = this,
                    l = this.options.nullColor,
                    n = this.colorAxis,
                    u = this.colorKey;
                y(this.data, function(d) { var k = d[u]; if (k = d.options.color || (d.isNull ? l : n && void 0 !== k ? n.toColor(k, d) : d.color || a.color)) d.color = k })
            },
            colorAttribs: function(a) {
                var d = {};
                A(a.color) && (d[this.colorProp || "fill"] = a.color);
                return d
            }
        }
    })(K);
    (function(a) {
        function A(a) {
            a && (a.preventDefault &&
                a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }

        function y(a) { this.init(a) }
        var C = a.addEvent,
            n = a.Chart,
            d = a.doc,
            l = a.each,
            v = a.extend,
            u = a.merge,
            t = a.pick;
        y.prototype.init = function(a) {
            this.chart = a;
            a.mapNavButtons = []
        };
        y.prototype.update = function(d) {
            var g = this.chart,
                f = g.options.mapNavigation,
                h, k, e, b, c, m = function(a) {
                    this.handler.call(g, a);
                    A(a)
                },
                l = g.mapNavButtons;
            d && (f = g.options.mapNavigation = u(g.options.mapNavigation, d));
            for (; l.length;) l.pop().destroy();
            t(f.enableButtons, f.enabled) &&
                !g.renderer.forExport && a.objectEach(f.buttons, function(a, d) {
                    h = u(f.buttonOptions, a);
                    k = h.theme;
                    k.style = u(h.theme.style, h.style);
                    b = (e = k.states) && e.hover;
                    c = e && e.select;
                    a = g.renderer.button(h.text, 0, 0, m, k, b, c, 0, "zoomIn" === d ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation").attr({ width: h.width, height: h.height, title: g.options.lang[d], padding: h.padding, zIndex: 5 }).add();
                    a.handler = h.onclick;
                    a.align(v(h, { width: a.width, height: 2 * a.height }), null, h.alignTo);
                    C(a.element, "dblclick", A);
                    l.push(a)
                });
            this.updateEvents(f)
        };
        y.prototype.updateEvents = function(a) {
            var g = this.chart;
            t(a.enableDoubleClickZoom, a.enabled) || a.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick || C(g.container, "dblclick", function(a) { g.pointer.onContainerDblClick(a) }) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick());
            t(a.enableMouseWheelZoom, a.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel || C(g.container, void 0 === d.onmousewheel ? "DOMMouseScroll" : "mousewheel", function(a) {
                    g.pointer.onContainerMouseWheel(a);
                    A(a);
                    return !1
                }) :
                this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
        };
        v(n.prototype, {
            fitToBox: function(a, d) {
                l([
                    ["x", "width"],
                    ["y", "height"]
                ], function(f) {
                    var g = f[0];
                    f = f[1];
                    a[g] + a[f] > d[g] + d[f] && (a[f] > d[f] ? (a[f] = d[f], a[g] = d[g]) : a[g] = d[g] + d[f] - a[f]);
                    a[f] > d[f] && (a[f] = d[f]);
                    a[g] < d[g] && (a[g] = d[g])
                });
                return a
            },
            mapZoom: function(a, d, f, h, l) {
                var e = this.xAxis[0],
                    b = e.max - e.min,
                    c = t(d, e.min + b / 2),
                    g = b * a,
                    b = this.yAxis[0],
                    k = b.max - b.min,
                    n = t(f, b.min + k / 2),
                    k = k * a,
                    c = this.fitToBox({
                        x: c - g * (h ? (h - e.pos) / e.len : .5),
                        y: n - k * (l ? (l -
                            b.pos) / b.len : .5),
                        width: g,
                        height: k
                    }, { x: e.dataMin, y: b.dataMin, width: e.dataMax - e.dataMin, height: b.dataMax - b.dataMin }),
                    g = c.x <= e.dataMin && c.width >= e.dataMax - e.dataMin && c.y <= b.dataMin && c.height >= b.dataMax - b.dataMin;
                h && (e.fixTo = [h - e.pos, d]);
                l && (b.fixTo = [l - b.pos, f]);
                void 0 === a || g ? (e.setExtremes(void 0, void 0, !1), b.setExtremes(void 0, void 0, !1)) : (e.setExtremes(c.x, c.x + c.width, !1), b.setExtremes(c.y, c.y + c.height, !1));
                this.redraw()
            }
        });
        C(n, "beforeRender", function() {
            this.mapNavigation = new y(this);
            this.mapNavigation.update()
        })
    })(K);
    (function(a) {
        var A = a.extend,
            y = a.pick,
            C = a.Pointer;
        a = a.wrap;
        A(C.prototype, {
            onContainerDblClick: function(a) {
                var d = this.chart;
                a = this.normalize(a);
                d.options.mapNavigation.enableDoubleClickZoomTo ? d.pointer.inClass(a.target, "highcharts-tracker") && d.hoverPoint && d.hoverPoint.zoomTo() : d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop) && d.mapZoom(.5, d.xAxis[0].toValue(a.chartX), d.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
            },
            onContainerMouseWheel: function(a) {
                var d = this.chart,
                    l;
                a = this.normalize(a);
                l = a.detail ||
                    -(a.wheelDelta / 120);
                d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop) && d.mapZoom(Math.pow(d.options.mapNavigation.mouseWheelSensitivity, l), d.xAxis[0].toValue(a.chartX), d.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
            }
        });
        a(C.prototype, "zoomOption", function(a) {
            var d = this.chart.options.mapNavigation;
            y(d.enableTouchZoom, d.enabled) && (this.chart.options.chart.pinchType = "xy");
            a.apply(this, [].slice.call(arguments, 1))
        });
        a(C.prototype, "pinchTranslate", function(a, d, l, v, u, t, k) {
            a.call(this, d, l, v, u, t, k);
            "map" ===
            this.chart.options.chart.type && this.hasZoom && (a = v.scaleX > v.scaleY, this.pinchTranslateDirection(!a, d, l, v, u, t, k, a ? v.scaleX : v.scaleY))
        })
    })(K);
    (function(a) {
        var A = a.colorPointMixin,
            y = a.each,
            C = a.extend,
            n = a.isNumber,
            d = a.map,
            l = a.merge,
            v = a.noop,
            u = a.pick,
            t = a.isArray,
            k = a.Point,
            g = a.Series,
            f = a.seriesType,
            h = a.seriesTypes,
            q = a.splat;
        f("map", "scatter", {
            allAreas: !0,
            animation: !1,
            nullColor: "#f7f7f7",
            borderColor: "#cccccc",
            borderWidth: 1,
            marker: null,
            stickyTracking: !1,
            joinBy: "hc-key",
            dataLabels: {
                formatter: function() { return this.point.value },
                inside: !0,
                verticalAlign: "middle",
                crop: !1,
                overflow: !1,
                padding: 0
            },
            turboThreshold: 0,
            tooltip: { followPointer: !0, pointFormat: "{point.name}: {point.value}\x3cbr/\x3e" },
            states: { normal: { animation: !0 }, hover: { halo: null, brightness: .2 }, select: { color: "#cccccc" } }
        }, l(a.colorSeriesMixin, {
            type: "map",
            getExtremesFromAll: !0,
            useMapGeometry: !0,
            forceDL: !0,
            searchPoint: v,
            directTouch: !0,
            preserveAspectRatio: !0,
            pointArrayMap: ["value"],
            getBox: function(e) {
                var b = Number.MAX_VALUE,
                    c = -b,
                    d = b,
                    f = -b,
                    g = b,
                    h = b,
                    k = this.xAxis,
                    l = this.yAxis,
                    q;
                y(e || [], function(e) {
                    if (e.path) {
                        "string" === typeof e.path && (e.path = a.splitPath(e.path));
                        var k = e.path || [],
                            l = k.length,
                            m = !1,
                            p = -b,
                            t = b,
                            w = -b,
                            v = b,
                            x = e.properties;
                        if (!e._foundBox) {
                            for (; l--;) n(k[l]) && (m ? (p = Math.max(p, k[l]), t = Math.min(t, k[l])) : (w = Math.max(w, k[l]), v = Math.min(v, k[l])), m = !m);
                            e._midX = t + (p - t) * u(e.middleX, x && x["hc-middle-x"], .5);
                            e._midY = v + (w - v) * u(e.middleY, x && x["hc-middle-y"], .5);
                            e._maxX = p;
                            e._minX = t;
                            e._maxY = w;
                            e._minY = v;
                            e.labelrank = u(e.labelrank, (p - t) * (w - v));
                            e._foundBox = !0
                        }
                        c = Math.max(c, e._maxX);
                        d = Math.min(d,
                            e._minX);
                        f = Math.max(f, e._maxY);
                        g = Math.min(g, e._minY);
                        h = Math.min(e._maxX - e._minX, e._maxY - e._minY, h);
                        q = !0
                    }
                });
                q && (this.minY = Math.min(g, u(this.minY, b)), this.maxY = Math.max(f, u(this.maxY, -b)), this.minX = Math.min(d, u(this.minX, b)), this.maxX = Math.max(c, u(this.maxX, -b)), k && void 0 === k.options.minRange && (k.minRange = Math.min(5 * h, (this.maxX - this.minX) / 5, k.minRange || b)), l && void 0 === l.options.minRange && (l.minRange = Math.min(5 * h, (this.maxY - this.minY) / 5, l.minRange || b)))
            },
            getExtremes: function() {
                g.prototype.getExtremes.call(this,
                    this.valueData);
                this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                this.dataMin = this.minY;
                this.dataMax = this.maxY
            },
            translatePath: function(a) {
                var b = !1,
                    c = this.xAxis,
                    e = this.yAxis,
                    d = c.min,
                    f = c.transA,
                    c = c.minPixelPadding,
                    g = e.min,
                    h = e.transA,
                    e = e.minPixelPadding,
                    k, l = [];
                if (a)
                    for (k = a.length; k--;) n(a[k]) ? (l[k] = b ? (a[k] - d) * f + c : (a[k] - g) * h + e, b = !b) : l[k] = a[k];
                return l
            },
            setData: function(e, b, c, f) {
                var h = this.options,
                    k = this.chart.options.chart,
                    m = k && k.map,
                    u = h.mapData,
                    v = h.joinBy,
                    A = null === v,
                    p = h.keys || this.pointArrayMap,
                    C = [],
                    D = {},
                    J = this.chart.mapTransforms;
                !u && m && (u = "string" === typeof m ? a.maps[m] : m);
                A && (v = "_i");
                v = this.joinBy = q(v);
                v[1] || (v[1] = v[0]);
                e && y(e, function(b, c) {
                    var d = 0;
                    if (n(b)) e[c] = { value: b };
                    else if (t(b)) { e[c] = {};!h.keys && b.length > p.length && "string" === typeof b[0] && (e[c]["hc-key"] = b[0], ++d); for (var f = 0; f < p.length; ++f, ++d) p[f] && void 0 !== b[d] && (0 < p[f].indexOf(".") ? a.Point.prototype.setNestedProperty(e[c], b[d], p[f]) : e[c][p[f]] = b[d]) }
                    A && (e[c]._i =
                        c)
                });
                this.getBox(e);
                (this.chart.mapTransforms = J = k && k.mapTransforms || u && u["hc-transform"] || J) && a.objectEach(J, function(a) { a.rotation && (a.cosAngle = Math.cos(a.rotation), a.sinAngle = Math.sin(a.rotation)) });
                if (u) {
                    "FeatureCollection" === u.type && (this.mapTitle = u.title, u = a.geojson(u, this.type, this));
                    this.mapData = u;
                    this.mapMap = {};
                    for (J = 0; J < u.length; J++) k = u[J], m = k.properties, k._i = J, v[0] && m && m[v[0]] && (k[v[0]] = m[v[0]]), D[k[v[0]]] = k;
                    this.mapMap = D;
                    e && v[1] && y(e, function(a) { D[a[v[1]]] && C.push(D[a[v[1]]]) });
                    h.allAreas ?
                        (this.getBox(u), e = e || [], v[1] && y(e, function(a) { C.push(a[v[1]]) }), C = "|" + d(C, function(a) { return a && a[v[0]] }).join("|") + "|", y(u, function(a) { v[0] && -1 !== C.indexOf("|" + a[v[0]] + "|") || (e.push(l(a, { value: null })), f = !1) })) : this.getBox(C)
                }
                g.prototype.setData.call(this, e, b, c, f)
            },
            drawGraph: v,
            drawDataLabels: v,
            doFullTranslate: function() { return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans },
            translate: function() {
                var a = this,
                    b = a.xAxis,
                    c = a.yAxis,
                    d = a.doFullTranslate();
                a.generatePoints();
                y(a.data, function(e) {
                    e.plotX = b.toPixels(e._midX, !0);
                    e.plotY = c.toPixels(e._midY, !0);
                    d && (e.shapeType = "path", e.shapeArgs = { d: a.translatePath(e.path) })
                });
                a.translateColors()
            },
            pointAttribs: function(a, b) {
                b = h.column.prototype.pointAttribs.call(this, a, b);
                b["stroke-width"] = u(a.options[this.pointAttrToOptions && this.pointAttrToOptions["stroke-width"] || "borderWidth"], "inherit");
                return b
            },
            drawPoints: function() {
                var a = this,
                    b = a.xAxis,
                    c = a.yAxis,
                    d = a.group,
                    f = a.chart,
                    g = f.renderer,
                    k, l, n, q, p = this.baseTrans,
                    t, u, v, A, r;
                a.transformGroup ||
                    (a.transformGroup = g.g().attr({ scaleX: 1, scaleY: 1 }).add(d), a.transformGroup.survive = !0);
                a.doFullTranslate() ? (f.hasRendered && y(a.points, function(b) { b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill) }), a.group = a.transformGroup, h.column.prototype.drawPoints.apply(a), a.group = d, y(a.points, function(a) { a.graphic && (a.name && a.graphic.addClass("highcharts-name-" + a.name.replace(/ /g, "-").toLowerCase()), a.properties && a.properties["hc-key"] && a.graphic.addClass("highcharts-key-" + a.properties["hc-key"].toLowerCase())) }),
                    this.baseTrans = { originX: b.min - b.minPixelPadding / b.transA, originY: c.min - c.minPixelPadding / c.transA + (c.reversed ? 0 : c.len / c.transA), transAX: b.transA, transAY: c.transA }, this.transformGroup.animate({ translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 })) : (k = b.transA / p.transAX, l = c.transA / p.transAY, n = b.toPixels(p.originX, !0), q = c.toPixels(p.originY, !0), .99 < k && 1.01 > k && .99 < l && 1.01 > l && (l = k = 1, n = Math.round(n), q = Math.round(q)), t = this.transformGroup, f.renderer.globalAnimation ? (u = t.attr("translateX"), v = t.attr("translateY"),
                    A = t.attr("scaleX"), r = t.attr("scaleY"), t.attr({ animator: 0 }).animate({ animator: 1 }, { step: function(a, b) { t.attr({ translateX: u + (n - u) * b.pos, translateY: v + (q - v) * b.pos, scaleX: A + (k - A) * b.pos, scaleY: r + (l - r) * b.pos }) } })) : t.attr({ translateX: n, translateY: q, scaleX: k, scaleY: l }));
                d.element.setAttribute("stroke-width", (a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"] || 1) / (k || 1));
                this.drawMapDataLabels()
            },
            drawMapDataLabels: function() {
                g.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup &&
                    this.dataLabelsGroup.clip(this.chart.clipRect)
            },
            render: function() {
                var a = this,
                    b = g.prototype.render;
                a.chart.renderer.isVML && 3E3 < a.data.length ? setTimeout(function() { b.call(a) }) : b.call(a)
            },
            animate: function(a) {
                var b = this.options.animation,
                    c = this.group,
                    e = this.xAxis,
                    d = this.yAxis,
                    f = e.pos,
                    g = d.pos;
                this.chart.renderer.isSVG && (!0 === b && (b = { duration: 1E3 }), a ? c.attr({ translateX: f + e.len / 2, translateY: g + d.len / 2, scaleX: .001, scaleY: .001 }) : (c.animate({ translateX: f, translateY: g, scaleX: 1, scaleY: 1 }, b), this.animate = null))
            },
            animateDrilldown: function(a) {
                var b = this.chart.plotBox,
                    c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    e = c.bBox,
                    d = this.chart.options.drilldown.animation;
                a || (a = Math.min(e.width / b.width, e.height / b.height), c.shapeArgs = { scaleX: a, scaleY: a, translateX: e.x, translateY: e.y }, y(this.points, function(a) { a.graphic && a.graphic.attr(c.shapeArgs).animate({ scaleX: 1, scaleY: 1, translateX: 0, translateY: 0 }, d) }), this.animate = null)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            animateDrillupFrom: function(a) {
                h.column.prototype.animateDrillupFrom.call(this,
                    a)
            },
            animateDrillupTo: function(a) { h.column.prototype.animateDrillupTo.call(this, a) }
        }), C({
            applyOptions: function(a, b) {
                a = k.prototype.applyOptions.call(this, a, b);
                b = this.series;
                var c = b.joinBy;
                b.mapData && ((c = void 0 !== a[c[1]] && b.mapMap[a[c[1]]]) ? (b.xyFromShape && (a.x = c._midX, a.y = c._midY), C(a, c)) : a.value = a.value || null);
                return a
            },
            onMouseOver: function(e) {
                a.clearTimeout(this.colorInterval);
                if (null !== this.value || this.series.options.nullInteraction) k.prototype.onMouseOver.call(this, e);
                else this.series.onMouseOut(e)
            },
            zoomTo: function() {
                var a = this.series;
                a.xAxis.setExtremes(this._minX, this._maxX, !1);
                a.yAxis.setExtremes(this._minY, this._maxY, !1);
                a.chart.redraw()
            }
        }, A))
    })(K);
    (function(a) {
        var A = a.seriesType,
            y = a.seriesTypes;
        A("mapline", "map", { lineWidth: 1, fillColor: "none" }, {
            type: "mapline",
            colorProp: "stroke",
            pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" },
            pointAttribs: function(a, n) {
                a = y.map.prototype.pointAttribs.call(this, a, n);
                a.fill = this.options.fillColor;
                return a
            },
            drawLegendSymbol: y.line.prototype.drawLegendSymbol
        })
    })(K);
    (function(a) {
        var A = a.merge,
            y = a.Point;
        a = a.seriesType;
        a("mappoint", "scatter", { dataLabels: { enabled: !0, formatter: function() { return this.point.name }, crop: !1, defer: !1, overflow: !1, style: { color: "#000000" } } }, { type: "mappoint", forceDL: !0 }, { applyOptions: function(a, n) { a = void 0 !== a.lat && void 0 !== a.lon ? A(a, this.series.chart.fromLatLonToPoint(a)) : a; return y.prototype.applyOptions.call(this, a, n) } })
    })(K);
    (function(a) {
        var A = a.arrayMax,
            y = a.arrayMin,
            C = a.Axis,
            n = a.color,
            d = a.each,
            l = a.isNumber,
            v = a.noop,
            u = a.pick,
            t = a.pInt,
            k = a.Point,
            g = a.Series,
            f = a.seriesType,
            h = a.seriesTypes;
        f("bubble", "scatter", { dataLabels: { formatter: function() { return this.point.z }, inside: !0, verticalAlign: "middle" }, animationLimit: 250, marker: { lineColor: null, lineWidth: 1, fillOpacity: .5, radius: null, states: { hover: { radiusPlus: 0 } }, symbol: "circle" }, minSize: 8, maxSize: "20%", softThreshold: !1, states: { hover: { halo: { size: 5 } } }, tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" }, turboThreshold: 0, zThreshold: 0, zoneAxis: "z" }, {
            pointArrayMap: ["y", "z"],
            parallelArrays: ["x",
                "y", "z"
            ],
            trackerGroups: ["group", "dataLabelsGroup"],
            specialGroup: "group",
            bubblePadding: !0,
            zoneAxis: "z",
            directTouch: !0,
            pointAttribs: function(a, e) {
                var b = this.options.marker.fillOpacity;
                a = g.prototype.pointAttribs.call(this, a, e);
                1 !== b && (a.fill = n(a.fill).setOpacity(b).get("rgba"));
                return a
            },
            getRadii: function(a, e, b, c) {
                var d, f, g, h = this.zData,
                    k = [],
                    n = this.options,
                    q = "width" !== n.sizeBy,
                    p = n.zThreshold,
                    t = e - a;
                f = 0;
                for (d = h.length; f < d; f++) g = h[f], n.sizeByAbsoluteValue && null !== g && (g = Math.abs(g - p), e = t = Math.max(e - p, Math.abs(a -
                    p)), a = 0), l(g) ? g < a ? g = b / 2 - 1 : (g = 0 < t ? (g - a) / t : .5, q && 0 <= g && (g = Math.sqrt(g)), g = Math.ceil(b + g * (c - b)) / 2) : g = null, k.push(g);
                this.radii = k
            },
            animate: function(a) {
                !a && this.points.length < this.options.animationLimit && (d(this.points, function(a) {
                    var b = a.graphic,
                        c;
                    b && b.width && (c = { x: b.x, y: b.y, width: b.width, height: b.height }, b.attr({ x: a.plotX, y: a.plotY, width: 1, height: 1 }), b.animate(c, this.options.animation))
                }, this), this.animate = null)
            },
            translate: function() {
                var d, e = this.data,
                    b, c, f = this.radii;
                h.scatter.prototype.translate.call(this);
                for (d = e.length; d--;) b = e[d], c = f ? f[d] : 0, l(c) && c >= this.minPxSize / 2 ? (b.marker = a.extend(b.marker, { radius: c, width: 2 * c, height: 2 * c }), b.dlBox = { x: b.plotX - c, y: b.plotY - c, width: 2 * c, height: 2 * c }) : b.shapeArgs = b.plotY = b.dlBox = void 0
            },
            alignDataLabel: h.column.prototype.alignDataLabel,
            buildKDTree: v,
            applyZones: v
        }, { haloPath: function(a) { return k.prototype.haloPath.call(this, 0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a) }, ttBelow: !1 });
        C.prototype.beforePadding = function() {
            var f = this,
                e = this.len,
                b = this.chart,
                c = 0,
                g = e,
                h = this.isXAxis,
                k = h ? "xData" : "yData",
                n = this.min,
                v = {},
                w = Math.min(b.plotWidth, b.plotHeight),
                C = Number.MAX_VALUE,
                p = -Number.MAX_VALUE,
                G = this.max - n,
                D = e / G,
                J = [];
            d(this.series, function(c) {
                var e = c.options;
                !c.bubblePadding || !c.visible && b.options.chart.ignoreHiddenSeries || (f.allowZoomOutside = !0, J.push(c), h && (d(["minSize", "maxSize"], function(a) {
                    var b = e[a],
                        c = /%$/.test(b),
                        b = t(b);
                    v[a] = c ? w * b / 100 : b
                }), c.minPxSize = v.minSize, c.maxPxSize = Math.max(v.maxSize, v.minSize), c = a.grep(c.zData, a.isNumber), c.length && (C = u(e.zMin, Math.min(C, Math.max(y(c), !1 === e.displayNegative ? e.zThreshold : -Number.MAX_VALUE))), p = u(e.zMax, Math.max(p, A(c))))))
            });
            d(J, function(a) {
                var b = a[k],
                    d = b.length,
                    e;
                h && a.getRadii(C, p, a.minPxSize, a.maxPxSize);
                if (0 < G)
                    for (; d--;) l(b[d]) && f.dataMin <= b[d] && b[d] <= f.dataMax && (e = a.radii[d], c = Math.min((b[d] - n) * D - e, c), g = Math.max((b[d] - n) * D + e, g))
            });
            J.length && 0 < G && !this.isLog && (g -= e, D *= (e + c - g) / e, d([
                ["min", "userMin", c],
                ["max", "userMax", g]
            ], function(a) { void 0 === u(f.options[a[0]], f[a[1]]) && (f[a[0]] += a[2] / D) }))
        }
    })(K);
    (function(a) {
        var A = a.merge,
            y =
            a.Point,
            C = a.seriesType,
            n = a.seriesTypes;
        n.bubble && C("mapbubble", "bubble", { animationLimit: 500, tooltip: { pointFormat: "{point.name}: {point.z}" } }, { xyFromShape: !0, type: "mapbubble", pointArrayMap: ["z"], getMapData: n.map.prototype.getMapData, getBox: n.map.prototype.getBox, setData: n.map.prototype.setData }, {
            applyOptions: function(a, l) {
                return a && void 0 !== a.lat && void 0 !== a.lon ? y.prototype.applyOptions.call(this, A(a, this.series.chart.fromLatLonToPoint(a)), l) : n.map.prototype.pointClass.prototype.applyOptions.call(this,
                    a, l)
            },
            isValid: function() { return "number" === typeof this.z },
            ttBelow: !1
        })
    })(K);
    (function(a) {
        var A = a.colorPointMixin,
            y = a.each,
            C = a.merge,
            n = a.noop,
            d = a.pick,
            l = a.Series,
            v = a.seriesType,
            u = a.seriesTypes;
        v("heatmap", "scatter", {
            animation: !1,
            borderWidth: 0,
            nullColor: "#f7f7f7",
            dataLabels: { formatter: function() { return this.point.value }, inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0 },
            marker: null,
            pointRange: null,
            tooltip: { pointFormat: "{point.x}, {point.y}: {point.value}\x3cbr/\x3e" },
            states: {
                hover: {
                    halo: !1,
                    brightness: .2
                }
            }
        }, C(a.colorSeriesMixin, {
            pointArrayMap: ["y", "value"],
            hasPointSpecificOptions: !0,
            getExtremesFromAll: !0,
            directTouch: !0,
            init: function() {
                var a;
                u.scatter.prototype.init.apply(this, arguments);
                a = this.options;
                a.pointRange = d(a.pointRange, a.colsize || 1);
                this.yAxis.axisPointRange = a.rowsize || 1
            },
            translate: function() {
                var a = this.options,
                    k = this.xAxis,
                    g = this.yAxis,
                    f = a.pointPadding || 0,
                    h = function(a, d, b) { return Math.min(Math.max(d, a), b) };
                this.generatePoints();
                y(this.points, function(l) {
                    var e = (a.colsize ||
                            1) / 2,
                        b = (a.rowsize || 1) / 2,
                        c = h(Math.round(k.len - k.translate(l.x - e, 0, 1, 0, 1)), -k.len, 2 * k.len),
                        e = h(Math.round(k.len - k.translate(l.x + e, 0, 1, 0, 1)), -k.len, 2 * k.len),
                        m = h(Math.round(g.translate(l.y - b, 0, 1, 0, 1)), -g.len, 2 * g.len),
                        b = h(Math.round(g.translate(l.y + b, 0, 1, 0, 1)), -g.len, 2 * g.len),
                        n = d(l.pointPadding, f);
                    l.plotX = l.clientX = (c + e) / 2;
                    l.plotY = (m + b) / 2;
                    l.shapeType = "rect";
                    l.shapeArgs = { x: Math.min(c, e) + n, y: Math.min(m, b) + n, width: Math.abs(e - c) - 2 * n, height: Math.abs(b - m) - 2 * n }
                });
                this.translateColors()
            },
            drawPoints: function() {
                u.column.prototype.drawPoints.call(this);
                y(this.points, function(a) { a.graphic.attr(this.colorAttribs(a)) }, this)
            },
            animate: n,
            getBox: n,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            alignDataLabel: u.column.prototype.alignDataLabel,
            getExtremes: function() {
                l.prototype.getExtremes.call(this, this.valueData);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                l.prototype.getExtremes.call(this)
            }
        }), a.extend({
            haloPath: function(a) {
                if (!a) return [];
                var d = this.shapeArgs;
                return ["M", d.x - a, d.y - a, "L", d.x - a, d.y + d.height + a, d.x + d.width + a, d.y + d.height + a, d.x +
                    d.width + a, d.y - a, "Z"
                ]
            }
        }, A))
    })(K);
    (function(a) {
        function A(a, d) {
            var g, f, h, k = !1,
                e = a.x,
                b = a.y;
            a = 0;
            for (g = d.length - 1; a < d.length; g = a++) f = d[a][1] > b, h = d[g][1] > b, f !== h && e < (d[g][0] - d[a][0]) * (b - d[a][1]) / (d[g][1] - d[a][1]) + d[a][0] && (k = !k);
            return k
        }
        var y = a.Chart,
            C = a.each,
            n = a.extend,
            d = a.format,
            l = a.merge,
            v = a.win,
            u = a.wrap;
        y.prototype.transformFromLatLon = function(d, k) {
            if (void 0 === v.proj4) return a.error(21), { x: 0, y: null };
            d = v.proj4(k.crs, [d.lon, d.lat]);
            var g = k.cosAngle || k.rotation && Math.cos(k.rotation),
                f = k.sinAngle || k.rotation &&
                Math.sin(k.rotation);
            d = k.rotation ? [d[0] * g + d[1] * f, -d[0] * f + d[1] * g] : d;
            return { x: ((d[0] - (k.xoffset || 0)) * (k.scale || 1) + (k.xpan || 0)) * (k.jsonres || 1) + (k.jsonmarginX || 0), y: (((k.yoffset || 0) - d[1]) * (k.scale || 1) + (k.ypan || 0)) * (k.jsonres || 1) - (k.jsonmarginY || 0) }
        };
        y.prototype.transformToLatLon = function(d, k) {
            if (void 0 === v.proj4) a.error(21);
            else {
                d = { x: ((d.x - (k.jsonmarginX || 0)) / (k.jsonres || 1) - (k.xpan || 0)) / (k.scale || 1) + (k.xoffset || 0), y: ((-d.y - (k.jsonmarginY || 0)) / (k.jsonres || 1) + (k.ypan || 0)) / (k.scale || 1) + (k.yoffset || 0) };
                var g =
                    k.cosAngle || k.rotation && Math.cos(k.rotation),
                    f = k.sinAngle || k.rotation && Math.sin(k.rotation);
                k = v.proj4(k.crs, "WGS84", k.rotation ? { x: d.x * g + d.y * -f, y: d.x * f + d.y * g } : d);
                return { lat: k.y, lon: k.x }
            }
        };
        y.prototype.fromPointToLatLon = function(d) {
            var k = this.mapTransforms,
                g;
            if (k) {
                for (g in k)
                    if (k.hasOwnProperty(g) && k[g].hitZone && A({ x: d.x, y: -d.y }, k[g].hitZone.coordinates[0])) return this.transformToLatLon(d, k[g]);
                return this.transformToLatLon(d, k["default"])
            }
            a.error(22)
        };
        y.prototype.fromLatLonToPoint = function(d) {
            var k =
                this.mapTransforms,
                g, f;
            if (!k) return a.error(22), { x: 0, y: null };
            for (g in k)
                if (k.hasOwnProperty(g) && k[g].hitZone && (f = this.transformFromLatLon(d, k[g]), A({ x: f.x, y: -f.y }, k[g].hitZone.coordinates[0]))) return f;
            return this.transformFromLatLon(d, k["default"])
        };
        a.geojson = function(a, k, g) {
            var f = [],
                h = [],
                l = function(a) {
                    var b, c = a.length;
                    h.push("M");
                    for (b = 0; b < c; b++) 1 === b && h.push("L"), h.push(a[b][0], -a[b][1])
                };
            k = k || "map";
            C(a.features, function(a) {
                var b = a.geometry,
                    c = b.type,
                    b = b.coordinates;
                a = a.properties;
                var d;
                h = [];
                "map" ===
                k || "mapbubble" === k ? ("Polygon" === c ? (C(b, l), h.push("Z")) : "MultiPolygon" === c && (C(b, function(a) { C(a, l) }), h.push("Z")), h.length && (d = { path: h })) : "mapline" === k ? ("LineString" === c ? l(b) : "MultiLineString" === c && C(b, l), h.length && (d = { path: h })) : "mappoint" === k && "Point" === c && (d = { x: b[0], y: -b[1] });
                d && f.push(n(d, { name: a.name || a.NAME, properties: a }))
            });
            g && a.copyrightShort && (g.chart.mapCredits = d(g.chart.options.credits.mapText, { geojson: a }), g.chart.mapCreditsFull = d(g.chart.options.credits.mapTextFull, { geojson: a }));
            return f
        };
        u(y.prototype, "addCredits", function(a, d) {
            d = l(!0, this.options.credits, d);
            this.mapCredits && (d.href = null);
            a.call(this, d);
            this.credits && this.mapCreditsFull && this.credits.attr({ title: this.mapCreditsFull })
        })
    })(K);
    (function(a) {
        function A(a, d, h, k, e, b, c, l) { return ["M", a + e, d, "L", a + h - b, d, "C", a + h - b / 2, d, a + h, d + b / 2, a + h, d + b, "L", a + h, d + k - c, "C", a + h, d + k - c / 2, a + h - c / 2, d + k, a + h - c, d + k, "L", a + l, d + k, "C", a + l / 2, d + k, a, d + k - l / 2, a, d + k - l, "L", a, d + e, "C", a, d + e / 2, a + e / 2, d, a + e, d, "Z"] }
        var y = a.Chart,
            C = a.defaultOptions,
            n = a.each,
            d = a.extend,
            l =
            a.merge,
            v = a.pick,
            u = a.Renderer,
            t = a.SVGRenderer,
            k = a.VMLRenderer;
        d(C.lang, { zoomIn: "Zoom in", zoomOut: "Zoom out" });
        C.mapNavigation = { buttonOptions: { alignTo: "plotBox", align: "left", verticalAlign: "top", x: 0, width: 18, height: 18, padding: 5, style: { fontSize: "15px", fontWeight: "bold" }, theme: { "stroke-width": 1, "text-align": "center" } }, buttons: { zoomIn: { onclick: function() { this.mapZoom(.5) }, text: "+", y: 0 }, zoomOut: { onclick: function() { this.mapZoom(2) }, text: "-", y: 28 } }, mouseWheelSensitivity: 1.1 };
        a.splitPath = function(a) {
            var d;
            a = a.replace(/([A-Za-z])/g, " $1 ");
            a = a.replace(/^\s*/, "").replace(/\s*$/, "");
            a = a.split(/[ ,]+/);
            for (d = 0; d < a.length; d++) /[a-zA-Z]/.test(a[d]) || (a[d] = parseFloat(a[d]));
            return a
        };
        a.maps = {};
        t.prototype.symbols.topbutton = function(a, d, h, k, e) { return A(a - 1, d - 1, h, k, e.r, e.r, 0, 0) };
        t.prototype.symbols.bottombutton = function(a, d, h, k, e) { return A(a - 1, d - 1, h, k, 0, 0, e.r, e.r) };
        u === k && n(["topbutton", "bottombutton"], function(a) { k.prototype.symbols[a] = t.prototype.symbols[a] });
        a.Map = a.mapChart = function(d, f, h) {
            var g = "string" ===
                typeof d || d.nodeName,
                e = arguments[g ? 1 : 0],
                b = { endOnTick: !1, visible: !1, minPadding: 0, maxPadding: 0, startOnTick: !1 },
                c, k = a.getOptions().credits;
            c = e.series;
            e.series = null;
            e = l({ chart: { panning: "xy", type: "map" }, credits: { mapText: v(k.mapText, ' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'), mapTextFull: v(k.mapTextFull, "{geojson.copyright}") }, tooltip: { followTouchMove: !1 }, xAxis: b, yAxis: l(b, { reversed: !0 }) }, e, { chart: { inverted: !1, alignTicks: !1 } });
            e.series = c;
            return g ? new y(d, e, h) :
                new y(e, f)
        }
    })(K);
    return K
});