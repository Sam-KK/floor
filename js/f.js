define("//misc.360buyimg.com/mtd/pc/components/carousel/1.0.0/carousel.js", [], function() {
    "use strict";
    var t = _.Class.extend({
        construct: function(t) {
            $.extend(this, {
                container: null,
                itemSelector: null,
                itemWidth: 0,
                activeClass: "active",
                startIndex: 0,
                duration: 500,
                delay: 2e3,
                switchType: "fade",
                isAuto: !0,
                zIndex: 5,
                onFirstSwitch: function() {},
                onBeforeSwitch: function() {},
                onAfterSwitch: function() {}
            }, t), this.$container = $(this.container), this.init()
        },
        init: function() {
            this.initElements(), this.initEvent(), this.hasSwitched = [], this.setCurrent(this.startIndex), this.isAuto && this.start()
        },
        initElements: function() {
            switch (this.$items = this.$container.find(this.itemSelector), this.length = this.$items.length, this.switchType) {
                case "fade":
                    this.$items.css({
                        opacity: 0,
                        zIndex: 0,
                        position: "absolute"
                    });
                    break;
                case "slide":
                    var t = this.$items,
                        i = $(t.get(0)).clone(),
                        s = $(t.get(this.length - 1)).clone();
                    this.$container.append(i).prepend(s), this.$items = this.$container.find(this.itemSelector), this.$container.css({
                        width: (this.length + 2) * this.itemWidth,
                        position: "absolute",
                        top: 0,
                        left: -this.itemWidth
                    })
            }
            return this
        },
        initEvent: function() {
            return this.$container.bind("mouseenter", $.proxy(this.stop, this)).bind("mouseleave", $.proxy(this.start, this)), this
        },
        setCurrent: function(t) {
            this.currentIndex = t, $.inArray(t, this.hasSwitched) < 0 && $.isFunction(this.onFirstSwitch) && (this.onFirstSwitch(t), this.hasSwitched.push(t));
            var i = this.$items,
                s = $(i.get(t));
            switch (i.removeClass(this.activeClass), s.addClass(this.activeClass), this.switchType) {
                case "fade":
                    $(i.get(t)).css({
                        opacity: 1,
                        zIndex: this.zIndex
                    })
            }
            return this
        },
        getCurrent: function() {
            return this.currentIndex
        },
        switchTo: function(t) {
            switch (this.switchType) {
                case "fade":
                    var i = this.$items,
                        s = this.currentIndex,
                        e = $(i.get(s)),
                        n = null;
                    t >= this.length ? t = 0 : t <= -1 && (t = this.length - 1), n = $(i.get(t)), $.isFunction(this.onBeforeSwitch) && this.onBeforeSwitch.call(this, s, t), i.each(function(t) {
                        var i = $(this);
                        parseFloat(i.css("opacity")) > 0 && t !== s && i.stop().fadeTo(this.duration, 0).css("zIndex", "0")
                    }), e.stop().fadeTo(this.duration, 0, $.proxy(function() {
                        e.css("zIndex", "0")
                    }, this)), n.stop().fadeTo(this.duration, 1, $.proxy(function() {
                        this.setCurrent(t), n.css({
                            opacity: 1,
                            zIndex: this.zIndex
                        }), $.isFunction(this.onAfterSwitch) && this.onAfterSwitch.call(this, this.currentIndex)
                    }, this));
                    break;
                case "slide":
                    var i = this.$items,
                        e = $(i.get(this.currentIndex));
                    $.isFunction(this.onBeforeSwitch) && this.onBeforeSwitch.call(this, this.currentIndex, t), this.$container.animate({
                        left: -(t + 1) * this.itemWidth
                    }, this.duration, $.proxy(function() {
                        t >= this.length ? (t = 0, this.$container.css("left", -this.itemWidth * (t + 1))) : t <= -1 && (t = this.length - 1, this.$container.css("left", -this.itemWidth * (t + 1))), this.setCurrent(t), $.isFunction(this.onAfterSwitch) && this.onAfterSwitch.call(this, this.currentIndex)
                    }, this))
            }
            return this
        },
        switchToPrev: function() {
            var t = this.currentIndex - 1;
            return this.switchTo(t), this
        },
        switchToNext: function() {
            var t = this.currentIndex + 1;
            return this.switchTo(t), this
        },
        start: function() {
            return clearTimeout(this.autoTimer), this.autoTimer = setTimeout($.proxy(function() {
                this.switchToNext().start()
            }, this), this.delay), this
        },
        stop: function() {
            return clearTimeout(this.autoTimer), this
        },
        destroy: function() {
            this.unbind(), this.$container.remove()
        },
        unbind: function() {
            return this.$container.unbind(), this
        }
    });
    return t
});
define("//misc.360buyimg.com/mtd/pc/components/util/1.0.0/util.js", [], function() {
    "use strict";
    return {
        throttle: function(e, t, n) {
            var a, u, i, r = null,
                l = 0;
            n || (n = {});
            var c = function() {
                l = n.leading === !1 ? 0 : (new Date).getTime(), r = null, i = e.apply(a, u), r || (a = u = null)
            };
            return function() {
                var s = (new Date).getTime();
                l || n.leading !== !1 || (l = s);
                var o = t - (s - l);
                return a = this, u = arguments, o <= 0 || o > t ? (clearTimeout(r), r = null, l = s, i = e.apply(a, u), r || (a = u = null)) : r || n.trailing === !1 || (r = setTimeout(c, o)), i
            }
        },
        debounce: function(e, t, n) {
            var a, u, i, r, l, c = function() {
                var s = (new Date).getTime() - r;
                s < t && s > 0 ? a = setTimeout(c, t - s) : (a = null, n || (l = e.apply(i, u), a || (i = u = null)))
            };
            return function() {
                i = this, u = arguments, r = (new Date).getTime();
                var s = n && !a;
                return a || (a = setTimeout(c, t)), s && (l = e.apply(i, u), i = u = null), l
            }
        },
        indexOf: function(e, t) {
            var n = e.length,
                a = Number(arguments[2]) || 0;
            for (a < 0 && (a += n); a < n;) {
                if (a in e && e[a] === t) return a;
                a++
            }
            return -1
        },
        getCalendar: function(e, t) {
            if (!(!e instanceof Date)) {
                var n = e.getMonth() + 1,
                    a = e.getFullYear(),
                    u = e.getDate() + (t || 0);
                switch (0 === u && (n -= 1, 0 === n && (n = 12, a -= 1)), n) {
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                    case 8:
                    case 10:
                    case 12:
                        u = 0 === u ? 31 : u, u > 31 && (n += 1, u = 1);
                        break;
                    case 4:
                    case 6:
                    case 9:
                    case 11:
                        u = 0 === u ? 30 : u, u > 30 && (n += 1, u = 1);
                        break;
                    case 2:
                        a % 4 == 0 ? (u = 0 === u ? 29 : u, u > 29 && (n += 1, u = 1)) : (u = 0 === u ? 28 : u, u > 28 && (n += 1, u = 1))
                }
                return n > 12 && (n = 1, a += 1), a + "/" + n + "/" + u
            }
        }
    }
});
define("//misc.360buyimg.com/mtd/pc/components/tab/1.0.0/tab.js", [], function() {
    "use strict";
    var t = _.Class.extend({
        construct: function(t) {
            this.conf = $.extend({
                container: null,
                head: null,
                headItems: null,
                content: null,
                contentItems: null,
                startAt: 0,
                activeClass: "active",
                hash: !1,
                hoverToSwitch: !1,
                onBeforeSwitch: function() {},
                onAfterSwitch: function() {},
                onFirstShow: function() {}
            }, t), this.index = void 0;
            var e = this.conf;
            this.$el = $(e.container), this.$head = e.head ? $(e.head) : this.$el.children(".mod_tab_head, .J_tab_head"), this.$headItems = e.headItems ? "string" == typeof e.headItems ? this.$head.children(e.headItems) : $(e.headItems) : this.$head.children(".mod_tab_head_item, .J_tab_head_item"), this.$content = e.content ? $(e.content) : this.$el.children(".mod_tab_content, .J_tab_content"), this.$contentItems = e.contentItems ? "string" == typeof e.contentItems ? this.$content.children(e.contentItems) : $(e.contentItems) : this.$content.children(".mod_tab_content_item, .J_tab_content_item"), this.tabLength = this.$headItems.length;
            for (var i = 0, n = this.$headItems.length; i < n; i++) this.$headItems[i].hasShown = !1;
            this.init()
        },
        init: function() {
            var t = this.conf,
                e = -1,
                i = window.location.hash;
            t.hash && i.length > 1 ? this.switchTo(i) : ("string" == typeof t.startAt ? (this.$active = this.$headItems.filter(t.startAt), e = this.$active.length ? this.$active.index() : 0) : e = "number" == typeof t.startAt ? t.startAt : 0, this.switchTo(e)), this.initEvent()
        },
        initEvent: function() {
            var t = this,
                e = t.conf,
                i = "click";
            e.hoverToSwitch && (i = "mouseenter"), this.$head.delegate(".mod_tab_head_item, .J_tab_head_item", i, function(e) {
                e && e.preventDefault();
                var i = $(this).index();
                t.switchTo(i)
            })
        },
        switchTo: function(t) {
            var e = this.conf;
            if (e.hash) {
                var i;
                if ("string" == typeof t && (i = t.replace("#", ""), this.$active = this.$headItems.filter("[data-hash$=" + i + "]"), t = this.$active.index()), "number" == typeof t && (i = this.$headItems.eq(t).attr("data-hash")), t === -1) return -1;
                window.location.hash = i
            }
            if (t = parseInt(t, 10), t !== this.index) return this.index = t, "function" == typeof e.onBeforeSwitch && e.onBeforeSwitch.call(this, t, this), this.$headItems.removeClass(e.activeClass).eq(t).addClass(e.activeClass), this.$contentItems.hide().eq(t).show(), "function" == typeof e.onAfterSwitch && e.onAfterSwitch.call(this, t, this), this.$headItems[t].hasShown || "function" != typeof e.onFirstShow || (e.onFirstShow.call(this, t, this), this.$headItems[t].hasShown = !0), this
        },
        switchToNext: function() {
            var t = this.index + 1;
            return t >= this.tabLength && (t = 0), this.switchTo(t), this
        },
        switchToPrev: function() {
            var t = this.index - 1;
            return t <= 0 && (t = this.tabLength - 1), this.switchTo(t), this
        },
        destroy: function() {
            this.unbind(), this.$el.remove()
        },
        unbind: function() {
            return this.$head.undelegate(), this
        },
        setOptions: function(t) {
            return $.extend(this.conf, t), this
        }
    });
    return t
});
define("//misc.360buyimg.com/mtd/pc/components/lazyload/2.0.0/lazyload.js", [], function() {
    "use strict";
    ! function(window, $) {
        var $window = $(window),
            _height = $window.height(),
            _scrollTop = $window.scrollTop(),
            _event = new _.Events,
            _getWindowHeight = function() {
                return window.innerHeight ? function() {
                    return window.innerHeight
                } : function() {
                    return $window.height()
                }
            }();
        _.eventCenter.on("lazyload:DOMUpdate", function(e) {
            _height = _getWindowHeight(), _event.trigger("lazyload:load", e)
        }), $window.bind("scroll.o2-lazyload", function(e) {
            _scrollTop = $window.scrollTop(), _event.trigger("lazyload:load")
        }), $window.bind("resize.o2-lazyload", function(e) {
            _height = _getWindowHeight(), _scrollTop = $window.scrollTop(), _event.trigger("lazyload:load")
        });
        var Util = {
                setCookie: function(e, t, o, i) {
                    if (i || (i = location.hostname), arguments.length > 2) {
                        var n = new Date((new Date).getTime() + parseInt(60 * o * 60 * 24 * 30 * 1e3));
                        document.cookie = e + "=" + escape(t) + "; path=/; domain=" + i + "; expires=" + n.toGMTString()
                    } else document.cookie = e + "=" + escape(t) + "; path=/; domain=" + i
                },
                getCookie: function(e) {
                    try {
                        return null == document.cookie.match(new RegExp("(^" + e + "| " + e + ")=([^;]*)")) ? "" : decodeURIComponent(RegExp.$2)
                    } catch (t) {
                        return null == document.cookie.match(new RegExp("(^" + e + "| " + e + ")=([^;]*)")) ? "" : RegExp.$2
                    }
                },
                getUrlParams: function(key) {
                    var query = location.search,
                        reg = "/^.*[\\?|\\&]" + key + "\\=([^\\&]*)/";
                    reg = eval(reg);
                    var ret = query.match(reg);
                    return null != ret ? decodeURIComponent(ret[1]) : ""
                },
                inviewport: function() {
                    var e = function(e, t) {
                            return _height + _scrollTop <= e.top - t
                        },
                        t = function(e, t) {
                            return _scrollTop >= e.top + t + e.height
                        };
                    return function(o, i) {
                        return !e(o, i) && !t(o, i)
                    }
                }()
            },
            Lazyload = function(e) {
                this.$self = e.$self, this.webpSupported = !1, this.forceOpenWebP = !1, this._loadTimer = null, this._imgInfo = [], this._loaded = {}, this.settings = e.settings
            };
        Lazyload.prototype._setImg = function(e, t, o) {
            t.attr("src", o), e.onload = null
        }, Lazyload.prototype._loadImg = function(e) {
            var t = e.$el,
                o = e.src,
                i = o,
                n = e.webpDisable,
                a = this;
            if (!e.loading) {
                e.loading = !0;
                var r = new Image,
                    l = !1,
                    s = this.settings;
                this.webpSupported && s.webpReg.test(o) && n !== s.webpDisableValue || this.forceOpenWebP ? i = o + "!q" + s.webpQuality + s.webpSuffix : s.quality !== -1 && (i = o + "!q" + s.quality), r.onload = function() {
                    l = !0, e.loading = !1, e.done = !0, t.attr(s.source, "done"), a._setImg(r, t, i)
                }, r.onerror = function() {
                    e.webpDisable = "no", e.loading = !1
                }, r.src = i, 1 != r.complete || l || (l = !0, e.loading = !1, e.done = !0, t.attr(s.source, "done"), this._setImg(r, t, i))
            }
        }, Lazyload.prototype._loadImgs = function() {
            var e = this._imgInfo.length,
                t = this;
            for ($.each(this._imgInfo, function(e, o, i) {
                    var n = o.$el;
                    !o.done && Util.inviewport(o, t.settings.threshold) && (o.src || n.attr("src", t.settings.placeholder), t._loadImg(o))
                }); e--;) 1 == this._imgInfo[e].done && this._imgInfo.splice(e, 1)
        }, Lazyload.prototype._update = function() {
            clearTimeout(this._loadTimer), this._loadTimer = setTimeout($.proxy(this._loadImgs, this), this.settings.delay)
        }, Lazyload.prototype._refreshDOMEl = function(e) {
            if (1 != e.attr("data-inlazyqueue")) {
                e.attr("data-inlazyqueue", !0);
                var t = this;
                $("img", e).each(function(e, o) {
                    var i = $(o),
                        n = i.attr(t.settings.source);
                    n && "done" != n && t._imgInfo.push({
                        $el: i,
                        src: n,
                        done: !1,
                        top: i.offset().top,
                        height: i.height(),
                        loading: !1,
                        webpDisable: i.attr(t.settings.webpDisableKey)
                    })
                })
            }
        }, Lazyload.prototype._refreshDOMPos = function(e) {
            $.each(this._imgInfo, function(t, o, i) {
                i[t].top = e.offset().top, i[t].height = e.height()
            })
        }, Lazyload.prototype._initEvent = function() {
            $(document).ready($.proxy(this._update, this)), _.eventCenter.on("lazyload:DOMUpdate", $.proxy(this._refreshDOMEl, this)), _event.on("lazyload:load", $.proxy(this._update, this))
        }, Lazyload.prototype._isInit = function() {
            return "1" === this.$self.attr(this.settings.source + "-install") || (this.$self.attr(this.settings.source + "-install", "1"), !1)
        }, Lazyload.prototype.init = function(e) {
            if (!this._isInit()) {
                var t = Util.getUrlParams(this.settings.forceOpenOrCloseWebP);
                this.webpSupported = e, "1" === t && (this.forceOpenWebP = !0), this._initEvent()
            }
        }, $.fn.o2lazyload = function(e) {
            var t, o = this,
                i = $(o);
            t = $.extend({
                threshold: 200,
                delay: 100,
                source: "data-lazy-img",
                supportWebp: !0,
                cacheSupportWebp: !0,
                cacheSupportWebpKey: "o2-webp",
                quality: -1,
                webpReg: /\/\/img\d+.360buyimg.com\/.+\.(jpg|png)$/,
                webpSuffix: ".webp",
                webpQuality: 80,
                webpDisableKey: "data-webp",
                webpDisableValue: "no",
                forceOpenOrCloseWebP: "o2-webp",
                placeholder: "//misc.360buyimg.com/lib/img/e/blank.gif"
            }, e);
            var n = new Lazyload({
                    $self: i,
                    settings: t
                }),
                a = function(e) {
                    if ("0" === Util.getUrlParams(t.forceOpenOrCloseWebP)) return void e(!1);
                    if (!t.supportWebp) return void e(!1);
                    if (t.cacheSupportWebp) {
                        var o = Util.getCookie(t.cacheSupportWebpKey);
                        if ("" !== o) return void e("true" === o || o === !0)
                    }
                    var i = new Image;
                    i.onload = function() {
                        var o = i.width > 0 && i.height > 0;
                        e(o), t.cacheSupportWebp && Util.setCookie(t.cacheSupportWebpKey, o, 1)
                    }, i.onerror = function() {
                        e(!1), t.cacheSupportWebp && Util.setCookie(t.cacheSupportWebpKey, !1, 1)
                    }, i.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA"
                };
            return a(function(e) {
                n.init(e)
            }), this
        }
    }(window, jQuery)
});
define("home/widget/head", ["//misc.360buyimg.com/jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js", "//misc.360buyimg.com/jdf/1.0.0/ui/dialog/1.0.0/dialog.js", "//misc.360buyimg.com/jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js", "//misc.360buyimg.com/jdf/1.0.0/unit/login/3.0.0/login.js", "//misc.360buyimg.com/jdf/1.0.0/unit/event/1.0.0/event.js", "//misc.360buyimg.com/jdf/1.0.0/unit/hotkey/1.0.0/hotkey.js", "//misc.360buyimg.com/jdf/1.0.0/unit/globalReco/1.0.0/globalReco.js", "//misc.360buyimg.com/jdf/1.0.0/unit/cookie/1.0.0/cookie.js", "//misc.360buyimg.com/jdf/1.0.0/unit/search/1.0.0/search.js", "//misc.360buyimg.com/jdf/1.0.0/unit/localStorage/1.0.0/localStorage.js", "//misc.360buyimg.com/jdf/1.0.0/unit/shoppingcart/3.0.0/shoppingcart.js", "//misc.360buyimg.com/jdf/1.0.0/unit/log/1.0.0/log.js", "home/widget/head_areamini", "home/widget/head_myjd", "home/widget/head_setUserinfo"], function(require, exports, module) {
    var t = require("//misc.360buyimg.com/jdf/1.0.0/unit/hotkey/1.0.0/hotkey.js");
    require("//misc.360buyimg.com/jdf/1.0.0/unit/search/1.0.0/search.js");
    var a, i = require("//misc.360buyimg.com/jdf/1.0.0/unit/shoppingcart/3.0.0/shoppingcart.js"),
        e = require("jdf/1.0.0/unit/cookie/1.0.0/cookie.js"),
        n = function(t, a) {
            var i = !1,
                e = !1;
            return function() {
                return i ? void(e = !0) : (i = !0, setTimeout(function() {
                    i = !1, e && (t(), e = !1)
                }, a), void t())
            }
        },
        s = require("conf"),
        o = function() {
            var t = (e("__jda") || "").split(".");
            t = t.length >= 2 ? t[1] : "-1", $.ajax({
                url: s.INTERFACE.HOT_WORDS,
                data: {
                    pin: e("pin") || 0,
                    uuid: t
                },
                dataType: "jsonp",
                scriptCharset: "utf-8",
                cache: !0,
                jsonpCallback: "cathot",
                success: function(t) {
                    if (t && "object" == typeof t) {
                        t = t.data;
                        var a = "",
                            i = [],
                            e = 0;
                        if ($.each(t, function(t, n) {
                                var s = "h|keycount|2016|03b" + (t < 9 ? "0" : "") + (1 + t);
                                if (n.n)
                                    if (2 == n.c) i.push(n.n);
                                    else if (e < 9) {
                                    var o = 1 == n.c ? 'class="style-red"' : "";
                                    a += '<a href="' + n.u + '" target="_blank" ' + o + ' clstag="' + s + '">' + n.n + "</a>", e++
                                }
                            }), i.length) {
                            var n = Math.floor(i.length * Math.random()),
                                s = i[n];
                            $("#search #key").val(s).bind("focus", function() {
                                var t = this;
                                t.value == s && (t.value = "", t.style.color = "#333")
                            }).bind("blur", function() {
                                var t = this;
                                t.value || (t.value = s, t.style.color = "#999")
                            })
                        }
                        $("#hotwords").html(a)
                    }
                }
            })
        },
        d = function() {
            var t = $("#ttbar-mycity .ui-areamini-text-wrap");
            t.prepend('<i class="iconfont">&#xe604;</i>')
        },
        c = $(window);
    a = function() {
        this.opts = {}, this.$el, this._state = 0
    }, a.prototype._judge = function() {
        c.scrollTop() > this.opts.offset && 0 == this._state ? (this._state = 1, this.$el.addClass("search-fix")) : c.scrollTop() <= this.opts.offset && 1 == this._state && (this._state = 0, this.$el.removeClass("search-fix"))
    }, a.prototype._bind = function() {
        var t = this;
        c.bind("scroll.searchFix", n(function() {
            t._judge()
        }, 100))
    }, a.prototype.init = function(t) {
        $.extend(this.opts, {
            offset: 788
        }, t), this.$el = $(this.opts.el), this._judge(), this._bind()
    };
    var r = function() {
            var t = $("#key");
            $("#shortcut").bind("mouseenter", function() {
                t.blur()
            })
        },
        l = (require("jdf/1.0.0/unit/log/1.0.0/log.js"), require("jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js"), require("home/widget/head_areamini"), require("home/widget/head_setUserInfo")),
        u = require("home/widget/head_myjd"),
        m = require("jdf/1.0.0/unit/localStorage/1.0.0/localStorage.js"),
        e = require("jdf/1.0.0/unit/cookie/1.0.0/cookie.js"),
        h = '<div class="dd-spacer"></div><div class="dd-inner"><span class="loading"></span></div>',
        v = '    <div class="dt cw-icon ui-areamini-text-wrap" style="display:none;">      <i class="ci-right"><s>◇</s></i>      <i class="ci-left"></i>      <span class="ui-areamini-text"></span>     </div>    <div class="dd dorpdown-layer">      <div class="dd-spacer"></div>      <div class="ui-areamini-content-wrap">         <div class="ui-areamini-content"></div>       </div>     </div>  ';
    $("#ttbar-mycity").html(v).areamini({
        hasCssLink: !1,
        className: {
            hover: "hover",
            selected: "selected"
        },
        provinceList: [{
            name: "海外",
            tpl: '<div class="item"><a href="//en.jd.com/" target="_blank" data-onchange="1"><%=name%></a></div>'
        }],
        tplContentWrap: '<div class="ui-areamini-content-list"><%=list%></div>',
        tplContentItem: '<div class="item"><a data-id="<%=id%>" href="javascript:void(0)"><%=name%></a></div>',
        syncServer: !0,
        writeCookie: !1,
        threeWordDeal: function(t) {
            var a = t.find(".ui-areamini-text").html(),
                i = t.find(".dd-spacer");
            3 == a.length ? i.addClass("dd-spacer-extend") : i.removeClass("dd-spacer-extend")
        },
        onReady: function(t) {
            this.el.find(".ui-areamini-text-wrap").show();
            var a = e("areaId");
            if (m.check() && a) {
                var i = "areaId";
                m.get(i) ? m.get(i) != a && (m.set(i, a), m.clearByReg("^jd_home_2015_")) : m.set(i, a)
            }
            this.options.threeWordDeal(this.el)
        },
        onChange: function(t, a, i) {
            this.options.threeWordDeal(this.el), "undefined" != typeof a && window.location.reload()
        }
    }), u();
    var f = '    <div class="dd dorpdown-layer">      <div class="dd-spacer"></div>      <div class="dd-inner" id="ttbar-apps-main">' + h + "      </div>    </div>  ";
    $("#ttbar-apps").append(f).attr("aid", "2_955_6342").dropdown({
        enterDelay: 50,
        trigger: !0,
        current: "hover",
        onchange: function(t) {
            t.attr("data-load") || (t.attr("data-load", 1), $.ajax({
                url: "//nfa.jd.com/loadFa.js?aid=2_955_6342",
                dataType: "script",
                success: function(t) {}
            }))
        }
    });
    var p = '    <div class="dd dorpdown-layer">      <div class="dd-spacer"></div>      <div class="dd-inner" id="ttbar-atte-main">' + h + "      </div>    </div>  ";
    $("#ttbar-atte").append(p).attr("aid", "2_955_6494").dropdown({
        enterDelay: 50,
        trigger: !0,
        current: "hover",
        onchange: function(t) {
            t.attr("data-load") || (t.attr("data-load", 1), $.ajax({
                url: "//nfa.jd.com/loadFa.js?aid=2_955_6494",
                dataType: "script",
                success: function(t) {}
            }))
        }
    }), $("#ttbar-serv .dd").html(h), $("#ttbar-serv").dropdown({
        enterDelay: 50,
        trigger: !0,
        current: "hover",
        onchange: function(t) {
            if (!t.attr("data-load")) {
                t.attr("data-load", 1);
                var a = setTimeout(function() {
                        i("//d.jd.com/client/get")
                    }, 3e3),
                    i = function(t) {
                        $.ajax({
                            url: t,
                            dataType: "jsonp",
                            scriptCharset: "gb2312",
                            cache: !0,
                            jsonpCallback: "getClientCallback",
                            success: function(t) {
                                if (t && "object" == typeof t) {
                                    clearTimeout(a), t = t.data;
                                    var i = '<div class="dd-spacer"></div>',
                                        e = ['<div class="item-client">客户</div>'],
                                        n = ['<div class="item-business">商户</div>'];
                                    $.each(t, function(a) {
                                        var i = t[a],
                                            s = !i.type;
                                        0 == i.c && e.push('<div class="item"><a href="' + i.u + '" target="_blank" ' + s + ">" + i.n + "</a></div>"), 1 == i.c && n.push('<div class="item"><a href="' + i.u + '" target="_blank" ' + s + ">" + i.n + "</a></div>")
                                    }), i += e.join(""), n.length > 1 && (i += n.join("")), $("#ttbar-serv .dd").html(i)
                                }
                            }
                        })
                    };
                i("//dc.3.cn/client/get")
            }
        }
    }), $("#ttbar-navs .dd").html(h), $("#ttbar-navs").dropdown({
        enterDelay: 50,
        trigger: !0,
        current: "hover",
        leaveDelay: 100,
        onchange: function(t) {
            if (!t.attr("data-load")) {
                t.attr("data-load", 1);
                var a = setTimeout(function() {
                        i("//d.jd.com/navigation/get")
                    }, 3e3),
                    i = function(t) {
                        $.ajax({
                            url: t,
                            dataType: "jsonp",
                            scriptCharset: "gb2312",
                            cache: !0,
                            jsonpCallback: "getNavigationCallback",
                            success: function(t) {
                                if (t && "object" == typeof t) {
                                    clearTimeout(a), t = t.data;
                                    var i = '<div class="dd-spacer"></div>';
                                    $.each(t, function(a) {
                                        var e = t[a],
                                            n = e.s,
                                            s = "";
                                        $.each(n, function(t) {
                                            var a = n[t],
                                                i = a.c ? 'class="' + a.c + '"' : "";
                                            s += '<div class="item"><a href="' + a.u + '" target="_blank" ' + i + ">" + a.n + "</a></div>"
                                        });
                                        var o = e.n,
                                            d = e.c ? 'class="' + e.c + '"' : "";
                                        e.u && (o = '<a href="' + e.u + '" target="_blank" ' + d + ">" + e.n + "</a>"), i += '<dl class="fore' + (a + 1) + '">                <dt>' + o + "</dt>                <dd>                  " + s + "                </dd>              </dl>"
                                    }), $("#ttbar-navs .dd").html(i)
                                }
                            }
                        })
                    };
                i("//dc.3.cn/navigation/get")
            }
        }
    }), ! function() {
        var t = $("#J_mobile"),
            a = $("#J_mobile_pop"),
            i = !1,
            e = null;
        t.bind("mouseenter", function(n) {
            clearTimeout(e), e = setTimeout(function() {
                t.addClass("mobile_on"), i || (i = !0, seajs.use("home/widget/mobile_pop", function(t) {
                    t({
                        $el: a
                    })
                }))
            }, 200)
        }), t.bind("mouseleave", function(a) {
            clearTimeout(e), t.removeClass("mobile_on")
        })
    }(), module.exports.init = function() {
        d(), new l({
            $userName: $("#ttbar-login")
        }).init(), t(), i(), o(), r()
    }, module.exports.searchFix = new a
});
define("home/widget/cate", function(require) {
    "use strict";
    var t = require("conf"),
        e = require("load_async"),
        a = _.Class.extend({
            statics: {
                NO_HTTPS_DOMAIN_REG: /^\/\/(car\.jd\.com|group\.jd\.com|huishou\.jd\.com|dujia\.jd\.com)/
            },
            construct: function(t) {
                this.conf = $.extend({
                    $el: null
                }, t), this.init()
            },
            init: function() {
                var e = this.conf,
                    a = e.$el.attr("data-type"),
                    i = pageConfig.leftCateABtestSwitch,
                    n = t.INTERFACE;
                e.type = a ? a : "home", e.isSubDataLoaded = !1, e.isPopMenuBinded = !1, e.dataUrl = n.CATE_A, e.dataBackupUrl = n.CATE_A_BACKUP_PC, e.scriptCharset = "gb2312";
                var l = readCookie("__jda"),
                    s = !0;
                if (i && "string" == typeof l) {
                    var o = pageConfig.leftCateABtestSection || {
                            start: 1e3,
                            end: 2e3
                        },
                        c = pageConfig.getHashProbability(l.split(".")[1], 1e4);
                    c > o.start && c <= o.end && (s = !1)
                }
                "boolean" == typeof pageConfig.isCateUseA ? pageConfig.isCateUseA || (e.dataUrl = n.CATE_B, e.dataBackupUrl = n.CATE_B_BACKUP_PC, e.scriptCharset = "utf-8") : s || (e.dataUrl = n.CATE_B, e.dataBackupUrl = n.CATE_B_BACKUP_PC, e.scriptCharset = "utf-8"), pageConfig.leftCateABtestUseA = s, e.imgIndex = 0, this.$popCtn = $(".JS_popCtn", this.conf.$el), this.loaded = !1, this.initEvent()
            },
            initEvent: function() {
                var t = this,
                    e = this.conf.$el,
                    a = null,
                    i = null,
                    n = null,
                    l = !1;
                e.bind("mouseenter", function() {
                    i && clearTimeout(i), i = setTimeout(function() {
                        l || (l = !0, t.initSubCate())
                    }, 200)
                }).one("mousemove", function() {
                    n && clearTimeout(n), n = setTimeout(function() {
                        l || (l = !0, t.initSubCate())
                    }, 200)
                }).one("mouseleave", function() {
                    e.find(".cate_menu_item").removeClass("hover")
                }).delegate(".cate_menu_item", "mouseenter", function(e) {
                    a && clearTimeout(a), a = setTimeout(function() {
                        t.conf.isPopMenuBinded || (t._hoverel = $(e.currentTarget), t.$popCtn.show())
                    }, 200)
                }).bind("mouseleave", function() {
                    a && clearTimeout(a), i && clearTimeout(i), t.conf.isPopMenuBinded || t.$popCtn.hide()
                })
            },
            initSubCate: function() {
                var t = this,
                    e = t.conf.$el;
                t.conf.isSubDataLoaded || t.getSubCateData(this.conf.type, function() {
                    var a = $("#J_popCtn");
                    $(".cate_part", a);
                    require.async("O2_COMPONENT/sidePopMenu/1.0.0/sidePopMenu.js", function(i) {
                        new i({
                            $container: e,
                            navItemHook: ".cate_menu_item",
                            navItemOn: "cate_menu_item_on",
                            popItemHook: ".cate_part",
                            itemEnterCallBack: function(t) {
                                var i = $(window).scrollTop(),
                                    n = e.offset().top,
                                    l = 0;
                                i > n && (l = i - n), a.css({
                                    top: l
                                }), _.eventCenter.trigger("lazyload:DOMUpdate", t.$displayEl)
                            }
                        });
                        t.$popCtn.is(":hidden") || t._hoverel.trigger("mouseenter.itemEnter"), t.conf.isPopMenuBinded = !0
                    })
                })
            },
            getSubCateData: function(a, i) {
                var n = this.conf;
                e({
                    url: n.dataUrl,
                    scriptCharset: n.scriptCharset,
                    cache: !0,
                    jsonpCallback: "getCategoryCallback",
                    backup: n.dataBackupUrl,
                    timeout: t.TIMEOUT,
                    dataCheck: function(t) {
                        return !!(t && t.data && t.data.length)
                    }
                }).then($.proxy(function(t) {
                    this.render(t), this.conf.isSubDataLoaded = !0, i && i()
                }, this))
            },
            padding: function(t) {
                return (t < 9 ? "0" : "") + (1 + t)
            },
            render: function(t) {
                var e, a, i, n, l, s, o, c, d, r, u, g, m, f, p, h, _, C, v, k, b = this,
                    x = t.data,
                    T = b.padding,
                    y = "",
                    A = function(t, e, a, i) {
                        return "h|keycount|2016|06" + Array.prototype.slice.call(arguments).join("")
                    },
                    $ = x.length;
                for (e = 0; e < $; e++) {
                    for (a = x[e], C = '<div class="cate_part_col1">', v = '<div class="cate_part_col2">', p = "", n = a.t.length, i = 0; i < n; i++) p += b.getLinkHtml({
                        str: a.t[i],
                        linkClass: "cate_channel_lk",
                        imagesWidth: null,
                        imagesHeight: 24,
                        level: null,
                        textPrefix: null,
                        textSuffix: '<i class="iconfont cate_channel_arrow">&#xe601;</i>'
                    });
                    for (p = '<div class="cate_channel" clstag="' + A(T(e), "b") + '">' + p + "</div>", C += p, f = "", n = a.s.length, i = 0; i < n; i++)
                        for (l = a.s[i], o = l.s.length, s = 0; s < o; s++) {
                            if (c = l.s[s].s, u = b.getLinkHtml({
                                    str: l.s[s].n,
                                    linkClass: "cate_detail_tit_lk",
                                    imagesWidth: null,
                                    imagesHeight: null,
                                    level: 2,
                                    textPrefix: null,
                                    textSuffix: '<i class="iconfont cate_detail_tit_arrow">&#xe601;</i>'
                                }), m = '<dt class="cate_detail_tit" clstag="' + A(T(e), "c", T(s)) + '">' + u + "</dt>", g = "", 0 != c)
                                for (r = c.length, d = 0; d < r; d++) g += b.getLinkHtml({
                                    str: c[d].n,
                                    linkClass: "cate_detail_con_lk",
                                    imagesWidth: null,
                                    imagesHeight: 16,
                                    level: 3,
                                    textPrefix: null,
                                    textSuffix: null,
                                    index: d
                                });
                            g = '<dd class="cate_detail_con" clstag="' + A(T(e), "d", T(s)) + '">' + g + "</dd>", f += '<dl class="cate_detail_item cate_detail_item' + (s + 1) + '">' + m + g + "</dl>"
                        }
                    for (f = '<div class="cate_detail">' + f + "</div>", C += f + "</div>", h = "", _ = 0, n = a.b.length, i = 0; i < n; i++) i < 8 && (h += b.getLinkHtml({
                        str: a.b[i],
                        linkClass: "cate_brand_lk",
                        imagesWidth: 83,
                        imagesHeight: 35
                    }), _ += 1);
                    for (_ > 0 && _ % 2 == 1 && (h += '<a><img data-lazy-img="//img10.360buyimg.com/da/jfs/t757/162/604852976/158/9ed36f8/54c8699bNc2cfc6a1.png" src="//misc.360buyimg.com/mtd/pc/common/img/blank.png" /></a>'), h = '<div class="cate_brand" clstag="' + A(T(e), "e") + '">' + h + "</div>", v += h, k = "", n = a.p.length, i = 0; i < n; i++) i < 2 && (k += b.getLinkHtml({
                        str: a.p[i],
                        linkClass: "cate_promotion_lk",
                        imagesWidth: 168,
                        imagesHeight: 134
                    }));
                    k = '<div class="cate_promotion" clstag="' + A(T(e), "f") + '">' + k + "</div>", v += k + "</div>", y += '<div class="cate_part clearfix" id="cate_item' + (e + 1) + '" data-id="' + a.id + '">' + C + v + "</div>"
                }
                this.$popCtn.html(y).removeClass("mod_loading")
            },
            getLinkHtml: function(t) {
                var e = t.str,
                    i = t.linkClass,
                    n = t.imagesWidth,
                    l = t.imagesHeight,
                    s = t.level,
                    o = t.textPrefix,
                    c = t.textSuffix,
                    d = t.index,
                    r = t.clstag ? ' clstag="' + t.clstag + '"' : "",
                    u = e.split("|"),
                    g = [],
                    m = "";
                u[0] = u[0].replace(/ /g, "");
                var f = /^\d.*\d$/.test(u[0]) ? u[0] : u[0].replace(/^(http\:\/\/|\/\/)/, "");
                "undefined" != typeof s && /^\d.*\d$/.test(u[0]) && (2 === s ? f = "channel.jd.com/" + u[0] + ".html" : 3 === s && (2 === u[0].split("-").length ? f = "channel.jd.com/" + u[0] + ".html" : 3 === u[0].split("-").length && (f = "list.jd.com/list.html?cat=" + u[0].replace(/\-/g, ",")))), f = "//" + f, "https:" === location.protocol && a.NO_HTTPS_DOMAIN_REG.test(f) && (f = "http:" + f), u[2], i && g.push(i), g.length > 0 && (m = 'class="' + g.join(" ") + '"');
                var p = "";
                return p = u[0] ? '<a href="' + f + '" ' + m + r + ' target="_blank">' : "<span " + m.replace(/lk/, "txt") + ">", u[2] ? (this.conf.imgIndex > 4 && (this.conf.imgIndex = 0), n = n ? ' width="' + n + '"' : "", l = l ? ' height="' + l + '"' : "", p += '<img data-lazy-img="//img1' + this.conf.imgIndex + ".360buyimg.com/" + u[2] + '"  ' + n + l + ' src="//misc.360buyimg.com/mtd/pc/common/img/blank.png" data-webp="no"/>', this.conf.imgIndex += 1) : p += (o || "") + u[1] + (c || ""), p += u[0] ? "</a>" : "</span>", 3 === s && 0 === d && 1 === parseInt(u[3], 10) && u[0] && (g.push(i + "_hot"), m = 'class="' + g.join(" ") + '"', p = '<a href="' + f + '" ' + m + ' target="_blank"><i class="cate_con_hot_l"></i>' + (o || "") + u[1] + (c || "") + '<i class="cate_con_hot_r"></i></a>'), p
            }
        });
    return a
});
define("home/widget/slider", ["O2_COMPONENT/carousel/1.0.0/carousel.js", "O2_COMPONENT/util/1.0.0/util.js"], function(require) {
    "use strict";
    var t = require("O2_COMPONENT/carousel/1.0.0/carousel.js"),
        e = require("O2_COMPONENT/util/1.0.0/util.js"),
        i = require("conf"),
        a = require("load_async"),
        r = _.Class.extend({
            construct: function(t) {
                this.conf = $.extend({
                    $el: null
                }, t), this.width = 790, this.isWide = pageConfig.compatible && pageConfig.wideVersion, this.init()
            },
            init: function() {
                this.buildCarouselDom(), this.buildBottom(), this.initEvent()
            },
            buildCarouselDom: function() {
                var t = this,
                    e = [],
                    r = window,
                    o = i.INTERFACE.FOCUS;
                a({
                    url: o,
                    needStore: !0,
                    times: 0,
                    timeout: 1e3,
                    backup: r.pageConfig.o2JSConfig.backupPathRule("focus"),
                    dataCheck: function(t) {
                        return !(!t.data || !$.isArray(t.data))
                    },
                    jsonpCallback: "jsonpCallbackFocus",
                    storeSign: r.sourceVersion.focus
                }).then(function(i) {
                    i.data && $.isArray(i.data) && (e = i.data, t.createCarsouelDom(e))
                })
            },
            createCarsouelDom: function(t) {
                for (var e = "", i = "", a = this.conf.$el, r = a.find(".J_slider_list"), o = 0; o < t.length; o++) {
                    var s = t[o];
                    if (s && s.length) {
                        var n = s.length;
                        if (n) {
                            s = pageConfig.FN_GetRandomData(s), pageConfig.clog.logDomain = s.logDomain, pageConfig.clog.logV = s.logV;
                            var l = this.isWide ? s.src : s.srcB;
                            e += '<li class="J_slider_item slider_item">                <a href="' + s.href + '" class="slider_item_lk mod_loading" fclog="' + s.clog + '" clstag="' + pageConfig.clstagPrefix + "08a" + (o > 10 ? o + 2 : "0" + (o + 2)) + '" target="_blank">                  <img data-lazy-src="' + l + '" alt="' + s.alt + '" src="//misc.360buyimg.com/mtd/pc/common/img/blank.png" class="J_slider_item_img slider_item_img" />                </a>              </li>'
                        }
                    }
                }
                var c = r.length > 0;
                c || (i = '<ul class="slider_list J_slider_list">' + e + '</ul>          <div class="J_slider_indicator slider_indicator"></div><a href="javascript:void(0)" clstag="" class="J_slider_control_prev slider_control_item slider_control_prev"><i class="iconfont">&#xe602;</i></a><a href="javascript:void(0)" clstag="" class="J_slider_control_next slider_control_item slider_control_next"><i class="iconfont">&#xe601;</i></a>', $(".J_slider_main", a).append(i).removeClass("mod_lazyload")), r.append(e), this.initCarousel(), this.initCarouselNav(), this.changeRTB();
                var d = r.find("[fclog]");
                d.length && _.eventCenter.on("home:load", function() {
                    pageConfig.sendClog(d)
                })
            },
            changeRTB: function() {
                var t = 2382;
                pageConfig.wideVersion || (t = 2433);
                var e = $(".J_slider_main .J_slider_item", this.conf.$el),
                    i = e.eq(e.length - 1);
                if (!i.length) return !1;
                var a = this;
                $.getJSON("//x.jd.com/focus?spread_type=1&ad_type=10&template=0&ad_ids=" + t + ":1&callback=?", function(r) {
                    if (r && $.isArray(r[t]) && r[t].length) {
                        var o = r[t][0];
                        $("a:eq(0)", i).attr("href", o.click_url.replace(/^http(s?):/, "")), o.image_url = "//img13.360buyimg.com/da/" + o.image_url;
                        var s = $("a:eq(0) img", i);
                        a.carousel.getCurrent() === e.length - 1 ? s.removeAttr("data-lazy-src").attr("src", o.image_url) : s.attr("data-lazy-src", o.image_url).attr("src", "//misc.360buyimg.com/mtd/pc/common/img/blank.png"),
                            function() {
                                var t = !1;
                                $(window).bind("load", function() {
                                    t || (t = !0, (new Image).src = o.exposal_url)
                                })
                            }()
                    }
                })
            },
            buildBottom: function() {
                var t = pageConfig.focusBottomData || [],
                    e = this;
                if (t.isTop) e.createBottomDom(t.data);
                else {
                    var r = readCookie("pin") || "";
                    r = decodeURIComponent(r), a({
                        url: i.INTERFACE.FOCUS_BOTTOM_REC,
                        params: {
                            pin: r,
                            uuid: readCookie("__jda") || -1,
                            lid: readCookie("areaId") || "1",
                            lim: 2,
                            ec: "utf-8"
                        },
                        jsonpCallback: "jsonpCallbackFocusBottomRec",
                        times: 0,
                        timeout: 1e3
                    }).then(function(i) {
                        if (i && i.success && i.data) {
                            var a = i.data,
                                r = t.data;
                            a && a.length ? a.length < 2 && r.length && a.push(r[0]) : a = r, e.createBottomDom(a), _.eventCenter.on("home:load", function() {
                                var t = i.impr;
                                if (t) {
                                    e.monitor(i.impr);
                                    var r = i.impr.indexOf("$csku=");
                                    r > -1 && (t = i.impr.substring(0, r + 6) + "{j_csku}", t += i.impr.substring(i.impr.indexOf("$", r + 6)));
                                    var o = [];
                                    if (a && a.length)
                                        for (var s = 0; s < a.length; s++) {
                                            var n = a[s].sku;
                                            $.trim(n) && o.push(a[s].sku)
                                        }
                                    if (o.length) {
                                        var l = t.replace("action=0", "action=2$index=0").replace("{j_csku}", o.join(","));
                                        e.monitor(l)
                                    }
                                }
                            })
                        } else e.createBottomDom(t.data);
                        _.eventCenter.on("home:load", function() {
                            e.errorMonitor(i)
                        })
                    }, function(i, a) {
                        e.createBottomDom(t.data), _.eventCenter.on("home:load", function() {
                            e.errorMonitor(null, a)
                        })
                    })
                }
            },
            createBottomDom: function(t) {
                var e = "",
                    i = this,
                    a = i.conf.$el;
                if (t && t.length)
                    for (var r = 0; r < 2; r++) {
                        var o = t[r],
                            s = o.t.replace(/^http(s?):/, ""),
                            n = ["b", "c"],
                            l = "";
                        if (/\/\//.test(o.img)) l = o.img;
                        else {
                            var c = String(o.sku).match(/(\d)$/) ? o.sku : "11";
                            l = pageConfig.FN_GetImageDomain(c) + o.img
                        }
                        l = pageConfig.processImageUrl(l, "780x260", "390x130"), /\!q/.test(l) || (l += "!q90"), e += '<div class="J_slider_bi slider_bi" clstag="' + pageConfig.clstagPrefix + "08" + n[r] + '" data-clk="' + o.clk + '" data-sku="' + o.sku + '">            <a href="' + s + '" class="slider_bi_lk mod_loading" target="_blank">              <img data-lazy-src="' + l + '" class="J_slider_bi_img slider_bi_img" title="" alt="" src="//misc.360buyimg.com/lib/img/e/blank.gif" >            </a>          </div>'
                    }
                $(".J_slider_extend", a).append(e).removeClass("mod_lazyload").find(".J_slider_bi_img").each(function() {
                    var t = $(this);
                    i.loadImage(t)
                })
            },
            monitor: function(t) {
                if (t) {
                    var e = new Image;
                    e.src = t + "&m=UA-J2011-1&ref=" + encodeURIComponent(document.referrer) + "&random=" + Math.random(), e = null
                }
            },
            errorMonitor: function(t, e) {
                var a = i.INTERFACE.FOCUS_BOTTOM_REC_ERR_LOG;
                t ? t.success ? t.data && t.data.length || this.monitor(a + "2") : this.monitor(a + "1") : "timeout" === e ? this.monitor(a + "3") : this.monitor(a + "4")
            },
            initCarousel: function() {
                var e = this.conf.$el,
                    i = e.find(".slider_list"),
                    a = i.children().length;
                this.carousel = new t({
                    container: i,
                    itemSelector: ".slider_item",
                    activeClass: "slider_item_active",
                    startIndex: 0,
                    duration: 300,
                    delay: 3e3,
                    zIndex: 1,
                    switchType: "fade",
                    onFirstSwitch: $.proxy(function(t) {
                        var e = $(".J_slider_item", i).eq(t).find(".J_slider_item_img"),
                            r = t + 1;
                        r === a && (r = 0);
                        var o = $(".J_slider_item", i).eq(r).find(".J_slider_item_img");
                        this.loadImage(e), this.loadImage(o)
                    }, this),
                    onBeforeSwitch: $.proxy(function(t, e) {
                        this.switchCarouselNav(e)
                    }, this)
                })
            },
            loadImage: function(t) {
                if (t.length) {
                    var e = t.data("lazy-src");
                    e && e.length && t.attr("src", e).one("load", function() {
                        $(this).removeAttr("data-lazy-src").parent().removeClass("mod_loading")
                    }).each(function() {
                        this.complete && $(this).load()
                    })
                }
            },
            initEvent: function() {
                var t = this;
                this.conf.$el.delegate(".slider_indicator_btn", "mouseenter", e.throttle(function() {
                    var e = t.carousel,
                        i = $(this).index();
                    e.stop(), i !== e.getCurrent() && ($(this).siblings().removeClass("slider_indicator_btn_active").end().addClass("slider_indicator_btn_active"), e.switchTo(i))
                }, 500)).delegate(".J_slider_bottom_btn[data-clk]", "click", function() {
                    var e = $(this);
                    t.monitor(e.data("clk"))
                }).delegate(".J_slider_control_prev", "click", $.proxy(this.prevCarousel, this)).delegate(".J_slider_control_prev", "mouseenter", function() {
                    var e = t.carousel;
                    e.stop(), t.restartCarousel()
                }).delegate(".J_slider_control_next", "click", $.proxy(this.nextCarousel, this)).delegate(".J_slider_control_next", "mouseenter", function() {
                    var e = t.carousel;
                    e.stop(), t.restartCarousel()
                })
            },
            prevCarousel: function(t) {
                t && t.preventDefault(), this.carousel.stop().switchToPrev(), this.restartCarousel()
            },
            nextCarousel: function(t) {
                t && t.preventDefault();
                this.carousel;
                this.carousel.stop().switchToNext(), this.restartCarousel()
            },
            restartCarousel: function() {
                var t = this.carousel;
                clearTimeout(this.restartTimer), this.restartTimer = setTimeout(function() {
                    t.start()
                }, 4e3)
            },
            initCarouselNav: function() {
                for (var t = this.carousel.length, e = [], i = 0; i < t; i++) {
                    var a = null,
                        r = "";
                    i === t - 1 ? a = "slider_indicator_btn_last" : 0 === i && (a = "slider_indicator_btn_active"), a = "string" == typeof a ? " " + a : "", r = '<i class="slider_indicator_btn' + a + '"></i>', e.push(r)
                }
                var o = this.conf.$el.find(".J_slider_indicator");
                o.html(e.join("")).css("marginLeft", -o.outerWidth() / 2 + "px").show()
            },
            switchCarouselNav: function(t) {
                var e = $(this.conf.$el.find(".slider_indicator_btn").get(t));
                e.siblings().removeClass("slider_indicator_btn_active").end().addClass("slider_indicator_btn_active")
            }
        });
    return r
});
define("home/widget/userinfo", function(require, exports, module) {
    "use strict";
    var e = require("conf"),
        i = require("load_async"),
        r = _.Class.extend({
            construct: function(e) {
                this.conf = $.extend({
                    $el: null
                }, e), this.init()
            },
            init: function() {
                this.loginDeferred = new $.Deferred, this.getTpl(), this.checkUser(), this.initEvent()
            },
            renderDefer: new $.Deferred,
            initEvent: function() {
                _.eventCenter.on("home:load", $.proxy(function() {
                    $.when(this.loginDeferred).then($.proxy(function() {
                        this.isLogin && $.when(pageConfig.userInfoDefer, this.renderDefer).done($.proxy(function(e) {
                            var i = e;
                            if (i && i.imgUrl) {
                                var r = i.imgUrl;
                                $(".J_user_info_avatar_img", this.conf.$el).attr("src", r)
                            }
                        }, this))
                    }, this))
                }, this))
            },
            getTpl: function() {
                var e = '        {% var clstagPrefix = pageConfig.clstagPrefix + "09"; %}        <div class="user_info" clstag="{%= clstagPrefix + "a" %}">          <div class="J_user_info_avatar user_info_avatar">              <a href="{%= o.homeUrl %}"><img class="J_user_info_avatar_img" src="{%= o.imgUrl %}" /></a>          </div>          {% if (o.isLogin && o.nickName && o.nickName.length) { %}          <div class="user_info_show">              <p>Hi，<a href="{%= o.homeUrl %}">{%= o.nickName %}</a></p>              <p>                  <a href="{%= o.logoutUrl %}">退出</a>              </p>          </div>          {% } else { %}          <div class="user_info_show">              {% if (o.nickName && o.nickName.length) { %}              <p>Hi，<a href="{%= o.homeUrl %}">{%= o.nickName %}</a></p>              {% } else { %}              <p class="user_info_tip">Hi，欢迎来到京东！</p>              {% } %}              <p>                  <a href="javascript:login();" class="user_info_login">登录</a>                  <a href="javascript:regist();" class="user_info_reg">注册</a>              </p>          </div>          {% } %}      </div>      <div class="user_profit">        {% if (o.isNew || !o.isLogin) { %}        <a href="{%= o.xinrenUrl %}" target="_blank" clstag="{%= clstagPrefix + "b" %}">新人福利</a>        {% } else { %}        <a href="{%= o.vipUrl %}" target="_blank" clstag="{%= clstagPrefix + "d" %}">京东会员</a>        {% } %}        <a href="{%= o.plusUrl %}" target="_blank" clstag="{%= clstagPrefix + "c" %}">PLUS会员</a>      </div>';
                return e
            },
            checkNewUser: function() {
                var r = e.INTERFACE.NEW_USER;
                return i({
                    url: r,
                    timeout: 1e3,
                    jsonpCallback: "jsonpCallbackIsNewuser"
                })
            },
            checkUser: function() {
                function i(e) {
                    var i = require("o2tpl"),
                        o = i(r.getTpl(), e);
                    n.removeClass("mod_loading").html(o), _.eventCenter.trigger("render:userinfo"), t.resolve()
                }
                var r = this,
                    n = r.conf.$el,
                    o = e.URLS,
                    t = this.renderDefer,
                    s = {
                        homeUrl: o.HOME,
                        loginUrl: o.LOGIN,
                        logoutUrl: o.LOGOUT,
                        registUrl: o.REGIST,
                        xinrenUrl: o.XINREN,
                        vipUrl: o.VIP,
                        isLogin: !1,
                        isNew: !1,
                        plusUrl: o.PLUS,
                        nickName: decodeURIComponent(readCookie("pin") || ""),
                        imgUrl: "//misc.360buyimg.com/mtd/pc/common/img/no_login.jpg"
                    };
                pageConfig.loginDefer.then(function(e) {
                    if (e && e.Identity) {
                        var n = e.Identity,
                            o = n.IsAuthenticated;
                        if (o) {
                            var t = n.Unick || n.Name;
                            s.isLogin = o, r.isLogin = o, r.loginDeferred.resolve(), r.checkNewUser().then(function(e) {
                                if (e) {
                                    "string" == typeof t && t.length && (s.nickName = t);
                                    var r = e;
                                    "10000" === r.STATE && (s.isNew = r.isNew), pageConfig.isNewUser = s.isNew, i(s)
                                } else i(s)
                            }, function() {
                                i(s)
                            })
                        } else r.loginDeferred.reject(), i(s)
                    } else r.loginDeferred.reject(), i(s)
                }, function() {
                    r.loginDeferred.reject(), i(s)
                })
            }
        });
    return r
});
define("home/widget/news", ["O2_COMPONENT/tab/1.0.0/tab.js"], function(require) {
    "use strict";
    var t = _.Class.extend({
        construct: function(t) {
            this.conf = $.extend({
                $el: null
            }, t), this.conf.$el && (this.supportTransform = o2.detect.css3test("transform"), this.initTab())
        },
        initTab: function() {
            var t = this.conf.$el,
                n = $(".J_news_tab", t),
                s = require("O2_COMPONENT/tab/1.0.0/tab.js");
            new s({
                container: n,
                startAt: 0,
                hash: !1,
                activeClass: "mod_tab_head_item_on",
                hoverToSwitch: !0,
                onBeforeSwitch: function() {},
                onAfterSwitch: $.proxy(function(t) {
                    var s = 0,
                        a = n.find(".J_news_tab_active");
                    this.supportTransform ? (s = 52 * t, a.css({
                        transform: "translateX(" + s + "px)",
                        "-webkit-transform": "translateX(" + s + "px)",
                        "-moz-transform": "translateX(" + s + "px)",
                        "-ms-transform": "translateX(" + s + "px)"
                    })) : (s = 50 * t, 0 === t && (s = -2), a.css("left", s + "px"))
                }, this),
                onFirstShow: function() {}
            })
        }
    });
    return t
});
define("home/widget/service", ["mtd/pc/components/tab/1.0.0/tab.js"], function(require, t, module) {
    "use strict";
    var e = require("mtd/pc/components/tab/1.0.0/tab.js"),
        n = !0,
        o = _.Class.extend({
            construct: function(t) {
                var e = this;
                this.opts = $.extend({
                    container: null,
                    head: null,
                    content: null,
                    close: null,
                    hoverToSwitch: !0,
                    activeClass: "service_ind_active",
                    afterSwitch: null,
                    data: [],
                    onAfterSwitch: function(t, n) {
                        var o = n.$contentItems.eq(t),
                            s = e.opts.data[t];
                        o[0].loaded || (s.isIframe ? (o.removeClass("mod_loading"), o.html($('<iframe width="190" height="185" frameborder="0" scrolling="no" src="' + s.url + '">'))) : seajs.use(s.url, function(t) {
                            o.removeClass("mod_loading"), t.init({
                                el: o
                            })
                        }), o[0].loaded = !0)
                    }
                }, t), this.bind()
            },
            bind: function() {
                var t = !1,
                    o = !1,
                    s = this,
                    a = null;
                this.opts.head.delegate(".mod_tab_head_item", "mouseenter", function(i) {
                    n && (n = !1, s.opts.startAt = $(i.currentTarget).index(), s.tab = new e(s.opts)), clearTimeout(a), a = setTimeout(function() {
                        t || o || (s.opts.container.addClass(s.opts.expandClass), t = !0)
                    }, 200)
                }), this.opts.container.delegate(".mod_tab_head_item, .J_tab_head", "mouseleave", function(t) {
                    o = !1, clearTimeout(a)
                }), this.opts.close.bind("click", function(e) {
                    clearTimeout(a), t = !1, o = !0, s.opts.container.removeClass(s.opts.expandClass)
                })
            }
        });
    return o
});
define("home/widget/patch", function(require, exports, module) {
    "use strict";
    var e = require("conf"),
        t = _.Class.extend({
            construct: function() {
                this.init()
            },
            init: function() {
                this.setCheckEptArea(), this.showIpadBanner()
            },
            setCheckEptArea: function() {
                setTimeout(function() {
                    $.ajax({
                        url: e.INTERFACE.USER_IP_INFO,
                        dataType: "jsonp",
                        jsonpCallback: "jsonpCallbackUserIpInfo",
                        success: function(e) {
                            if (void 0 !== e && 0 !== e.type) {
                                var t = $('<div class="inter" id="inter_enter" style="position: relative; z-index: 30; width: 100%; height: 49px; overflow: hidden; background:#4d4e62;"></div>'),
                                    i = "//en.jd.com/",
                                    n = '<a href="' + i + '" target="_blank" class="inter_link" style="display: block; width:100%; height: 49px; text-align: center;" clstag="h|keycount|2016|00b"><div class="grid_c1"><img src="//img30.360buyimg.com/ads/jfs/t463/311/1350191938/18754/313404d9/54cef1e3N796d7688.jpg" alt="" width="792" height="49" style="vertical-align: top;"></div></a>';
                                t.html(n), $("body").prepend(t), _.eventCenter.trigger("render:floorChange")
                            }
                        }
                    })
                }, 3e3)
            },
            showIpadBanner: function() {
                var e = window.navigator.userAgent;
                /iPad/i.test(e) && seajs.use("//nfa.jd.com/loadFa.js?aid=2_955_8766")
            }
        });
    return t
});
define("home/widget/elevator", ["O2_COMPONENT/util/1.0.0/util.js"], function(require, exports, module) {
    "use strict";
    var t = _.Class.extend({
        construct: function(t) {
            this.conf = $.extend({
                $el: null
            }, t), this.init()
        },
        init: function() {
            this.w = window, this.elevatorPos = 50, this.$elevatorEles = $(".J_f_lift"), this.elevatorElesId = this.$elevatorEles.map(function() {
                return $(this).attr("id")
            }).toArray(), this.$firstElevatorFloor = this.$elevatorEles.eq(0), this.setStyle(), this.initEvent(), this.scrollTimer = null
        },
        initEvent: function() {
            var t = this.conf.$el;
            require("O2_COMPONENT/util/1.0.0/util.js");
            t.delegate(".J_lift_item", "click", $.proxy(this.go, this)), $(this.w).bind("scroll.elevator", $.proxy(this.onScroll, this)), _.eventCenter.on("home:resize", $.proxy(function() {
                var e = $(this.w),
                    i = e.scrollTop(),
                    o = this.$firstElevatorFloor.offset().top;
                this.setStyle(), i >= o - e.height() / 2 + 5 && t.show()
            }, this)), _.eventCenter.on("render:floorChange", $.proxy(function(t) {
                var e = this.elevatorElesId,
                    i = $.inArray(t, e);
                i >= 0 && (this.elevatorElesId.splice(i, 1), $("#" + t).removeClass("J_f_lift"), this.$elevatorEles = $(".J_f_lift"), this.conf.$el.find(".J_lift_item").eq(i).remove())
            }, this))
        },
        setStyle: function() {
            var t = this.conf.$el,
                e = document.documentElement.clientWidth,
                i = 1190,
                o = parseInt(.5 * document.documentElement.clientHeight - .5 * t.height(), 10);
            t.css({
                left: (e - i) / 2 - t.width() - 40,
                top: o
            }), e < 1380 && t.css({
                left: "10px"
            })
        },
        go: function(t) {
            t && t.preventDefault();
            var e = $(t.currentTarget),
                i = e.index(),
                o = 0;
            e.hasClass("J_lift_item_top") || (this.clicked = !0, o = this.$elevatorEles.eq(i).offset().top - this.elevatorPos, this.conf.$el.find(".J_lift_item").removeClass("lift_item_on").eq(i).addClass("lift_item_on")), $("body,html").stop(!1, !0).animate({
                scrollTop: o
            }, 600, $.proxy(function() {
                this.clicked = !1
            }, this))
        },
        onScroll: function(t) {
            var e = this,
                i = $(document);
            e.clicked || (clearTimeout(e.scrollTimer), e.scrollTimer = setTimeout(function() {
                var t = i.scrollTop(),
                    o = e.conf.$el,
                    l = -1,
                    s = $(e.w).height() / 2;
                t + s >= e.$firstElevatorFloor.offset().top ? (o.fadeIn(), e.$elevatorEles.each(function() {
                    t + s >= $(this).offset().top && (l += 1)
                }), o.find(".J_lift_item").removeClass("lift_item_on").eq(l).addClass("lift_item_on")) : o.fadeOut()
            }, 200))
        }
    });
    return t
});