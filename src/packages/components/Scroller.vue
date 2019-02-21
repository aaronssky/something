<template>
    <div class="page-scroller" :class="{'page-scroller-overflow-hidden':overflowHidden}" :id="id || `PageScroller-${scrollerKey}`"
        :data-key="scrollerKey">
        <div class="page-scroller-top-placeholder">
            <div class="page-scroller-top-placeholder-contain">
                {{style}}
                <h1>下拉刷新</h1>
            </div>
        </div>
        <div class="page-scroller-contain" :class="{'page-scroller-transition':touches.length==0}" :style="style">
            <div style="    word-wrap: break-word;">{{browser}}</div>
            <slot></slot>
        </div>
        <div class="page-scroller-bottom-placeholder">
            <div class="page-scroller-bottom-placeholder-contain">
                {{style}}
                <h1>上拉加载</h1>
            </div>
        </div>
        <div class="pp"></div>
    </div>
</template>

<script>
    export default {
        name: "PageScroller",
        data() {
            return {
                scrollerKey: "",
                isAtScrollTop: true, //是否滚动条到达顶部，继续下拉刷新
                isAtScrollBottom: false,
                style: "",
                overflowHidden: false,
                touches: [],
                browser: "",
                isAndroid: false,
                isIos: false,
                isWX: false,
                compatibleMode: false, // 低端机型用户体验向下兼容模式
            };
        },
        props: {
            // 记录当前容器的唯一标记，用来创建key:value数据记录容器标记
            // 若不传入，会默认获取当前的$route.fullPath
            uniqueKey: {
                type: String,
                default: ""
            },
            id: {
                type: String,
                default: ""
            }
        },
        mounted() {
            this.init();

            // 创建唯一key
            let createUniqueKey = () => {
                if (this.$route.meta && ~~this.$route.meta.PageScrollerIndex >= 0) {
                    this.$route.meta.PageScrollerIndex = ~~this.$route.meta.PageScrollerIndex + 1;
                }
                let index = this.$route.meta.PageScrollerIndex;
                return this.$route.fullPath + `-${index}`;
            };

            this.scrollerKey = this.uniqueKey || createUniqueKey();

            // 初始化全局变量
            window.PageScroller = window.PageScroller || {};
            window.PageScroller[this.scrollerKey] = {};

            this.addScrollEvent();

            this.addTouchEvent();
        },
        methods: {
            init() {
                function isWX() {
                    var ua = navigator.userAgent.toLowerCase();
                    return /micromessenger/.test(ua) ? true : false;
                }

                function isIos() {
                    var ua = navigator.userAgent.toLowerCase();
                    if (/iphone|ipad|ipod/.test(ua)) {
                        return true;
                    } else if (/android/.test(ua)) {
                        return false
                    }
                }

                function isAndroid() {
                    var ua = navigator.userAgent.toLowerCase();
                    if (/android/.test(ua)) {
                        return true;
                    }
                    return false;
                }

                function isQQBrowser() {
                    var ua = navigator.userAgent.toLowerCase();
                    return /qqbrowser/.test(ua) ? true : false;
                }



                let browser = {
                    feature: function () {
                        var u = navigator.userAgent;
                        return {
                            trident: u.indexOf('Trident') > -1, //IE内核
                            presto: u.indexOf('Presto') > -1, //opera内核
                            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                            gecko: u.indexOf('Firefox') > -1, //火狐内核Gecko
                            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
                            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android
                            iPhone: u.indexOf('iPhone') > -1, //iPhone
                            iPad: u.indexOf('iPad') > -1, //iPad
                            webApp: u.indexOf('Safari') > -1, //【待定】是否第三方浏览器Safari（QQ，微信内置浏览器没该属性）
                            wx: u.indexOf('MicroMessenger') > -1, // 微信内置浏览器
                            qq: u.indexOf('QBWebView') > -1, // QQ内置浏览器
                            qqBrowser: u.indexOf('MQQBrowser') > -1, // QQ浏览器（非QQ内置浏览器）
                        };
                    }()
                };

                this.browser = JSON.stringify(browser) + " ================= " + navigator.userAgent;

                this.isWX = browser.feature.wx;
                this.isIos = browser.feature.ios;
                this.isAndroid = browser.feature.android;
                this.isQQBrowser = browser.feature.qqBrowser;

                // 安卓低版本向下兼容，需要加安卓系统版本判断
                this.compatibleMode = (this.isWX || this.isQQBrowser) && this.isAndroid;
            },
            addTouchEvent() {
                let that = this;

                let touchStartY, touchStartScrollTop;

                this.style = `transform:translate3d(0,0,0)`;

                this.$el.addEventListener("touchstart", function (e) {
                    let touches = e.touches || [],
                        touchOne = touches[0],
                        touchOneX = touchOne.pageX,
                        touchOneY = touchOne.pageY;

                    that.overflowHidden = false;
                    that.touches = touches;

                    touchStartScrollTop = this.scrollTop;
                    touchStartY = touchOneY;

                    that.touchStartIsAtScrollTop = that.isAtScrollTop;


                    if (that.isAndroid) {
                        // 增加暂时禁止滚动的元素，用来处理滚动父子级穿透
                        let $curScrollEl = $(that.$el);
                        let $parents = $curScrollEl.parents() || [];
                        $parents.addClass("overflow-hidden-temp");
                    }


                    // console.log(touchOneY);
                    // e.preventDefault();
                    e.stopPropagation();
                });

                this.$el.addEventListener("touchmove", function (e) {

                    if (that.isIos) {
                        // 增加暂时禁止滚动的元素，用来处理滚动父子级穿透
                        let $curScrollEl = $(that.$el);
                        let $parents = $curScrollEl.parents() || [];
                        // $parents.addClass("overflow-hidden-temp");
                    }
                    // setTimeout(() => {
                    //     $parents.removeClass("overflow-hidden-temp");
                    // },100)

                    let touches = e.touches || [],
                        touchOne = touches[0],
                        touchOneX = touchOne.pageX,
                        touchOneY = touchOne.pageY,
                        touchOneDist = touchOneY - touchStartY;

                    // if (that.isAtScrollTop) {

                    //     e._isScroller = true;
                    // }

                    // if (touchOneDist < 0) {

                    //     e._isScroller = false;
                    // }

                    if (touchOneDist > 0 && that.isAtScrollTop) {

                        if (that.compatibleMode) {
                            // 安卓低端版本微信端或QQ浏览器交互处理，用户体验向下兼容

                            // 用以禁止顶端下拉时候会把页面也拉下，故牺牲用户体验，向下兼容
                            e.preventDefault();

                            // 当本来已经处于顶端时候才允许触发下拉
                            if (that.touchStartIsAtScrollTop) {
                                if (touchOneDist - touchStartScrollTop < 0) {
                                    that.style = `transform:translate3d(0,0,0)`;
                                } else {
                                    that.style =
                                        `transform:translate3d(0,${touchOneDist - touchStartScrollTop}px,0)`;
                                }
                            }

                        } else {
                            if (touchOneDist - touchStartScrollTop < 0) {
                                that.style = `transform:translate3d(0,0,0)`;
                            } else {
                                that.style =
                                    `transform:translate3d(0,${touchOneDist - touchStartScrollTop}px,0)`;
                            }
                        }

                    } else {
                        that.touchStartIsAtScrollTop = false;
                        if (that.overflowHidden && touchOneDist > 0) {
                            that.overflowHidden = false;
                            that.style = `transform:translate3d(0,0,0)`;
                        }
                    }


                    if (touchOneDist < 0 && that.isAtScrollBottom) {
                        // 点击时候相对底部的位置
                        let touchStartOffsetBottom = this.scrollHeight - touchStartScrollTop - this.clientHeight;

                        if (that.compatibleMode) {
                            // 安卓低端版本微信端才需要这样，用户体验向下兼容
                            e.preventDefault();
                            if (touchOneDist + touchStartOffsetBottom > 0) {
                                that.style = `transform:translate3d(0,0,0)`;
                            } else {
                                that.style =
                                    `transform:translate3d(0,${touchOneDist+touchStartOffsetBottom}px,0)`;
                            }
                        } else {
                            console.log(touchOneDist, touchStartOffsetBottom)

                            if (touchOneDist + touchStartOffsetBottom > 0) {
                                that.style = `transform:translate3d(0,0,0)`;
                            } else {
                                that.style =
                                    `transform:translate3d(0,${touchOneDist+touchStartOffsetBottom}px,0)`;
                            }
                        }

                    } else {
                        if (that.overflowHidden && touchOneDist < 0) {
                            that.overflowHidden = false;
                            that.style = `transform:translate3d(0,0,0)`;
                        }
                    }

                    // 兼容IOS和PC，安卓微信内置浏览器不可使用（未详细测试）
                    e.stopPropagation();
                });

                this.$el.addEventListener("touchend", function (e) {
                    if (e.touches && e.touches.length == 0) {
                        // 松开手指参数复位
                        that.style = `transform:translate3d(0,0,0)`;
                        that.overflowHidden = false;
                        that.touches = [];

                        // IOS体验兼容
                        // 下拉时候，transition元素移动会引起滚动条变高，从而底部产生奇葩的空间，故通过元素高度改动，触发重绘
                        if (that.isIos) {
                            $(that.$el).find(".pp").css({
                                "padding-bottom": "1px"
                            });

                            setTimeout(() => {
                                $(that.$el).find(".pp").css({
                                    "padding-bottom": "0"
                                });
                            })
                        }
                    }

                    // 移除暂时禁止滚动的元素
                    $(".overflow-hidden-temp").removeClass("overflow-hidden-temp");

                    // e.preventDefault();
                    e.stopPropagation();
                });

                // document.body.addEventListener("touchmove1", function (e) {
                //     //In this case, the default behavior is scrolling the body, which
                //     //would result in an overflow.  Since we don't want that, we preventDefault.
                //     if (e._isScroller) {
                //         e.preventDefault();
                //     }
                //     // that.tips = evt._isScroller;

                //     // e.stopPropagation();
                // });

                // 监听滚动到顶端
                this.$el.addEventListener("scroll", function (e) {
                    // 到达了滚动条顶部
                    if (this.scrollTop <= 1) {
                        that.isAtScrollTop = true;

                        if (that.touches && that.touches.length > 0) {
                            // 触摸状态上下滑动滚动条会滚动影响体验，故禁止滚动
                            that.overflowHidden = true;
                        } else {
                            // 松开手指后的滚动条持续滚动
                        }
                    } else {
                        that.isAtScrollTop = false;
                    }

                    if (this.scrollHeight <= this.clientHeight + this.scrollTop + 1) {
                        that.isAtScrollBottom = true;

                        if (that.touches && that.touches.length > 0) {
                            // 触摸状态上下滑动滚动条会滚动影响体验，故禁止滚动
                            that.overflowHidden = true;
                        } else {
                            // 松开手指后的滚动条持续滚动
                        }
                    } else {
                        that.isAtScrollBottom = false;
                    }

                    e.stopPropagation();
                });
            },
            // 添加滚动监听事件，记录当前el滚动坐标
            addScrollEvent() {
                // 兼容IOS的顶端滚动bug
                setTimeout(() => {
                    this.$el.scrollTop = 1;
                }, 1);

                console.log(this);

                let that = this;

                let scrollTimer;
                this.$el.addEventListener("scroll", function (e) {
                    // console.log(this.scrollTop)
                    let PageScroller = window.PageScroller;
                    let scrollerKey = that.scrollerKey;
                    let scrollerObj = PageScroller[scrollerKey] || {};
                    scrollerObj["x"] = this.scrollLeft;
                    scrollerObj["y"] = this.scrollTop;
                    scrollerObj["el"] = this;
                    window.PageScroller[scrollerKey] = scrollerObj;

                    // 到达顶部，兼容IOS的顶端滚动bug
                    if (this.scrollTop == 0) {
                        console.log("到达顶部");
                        clearTimeout(scrollTimer);
                        scrollTimer = setTimeout(() => {
                            this.scrollTop = 1;
                        }, 0);
                    }

                    // 到达底部，兼容IOS的顶端滚动bug
                    if (this.scrollHeight <= this.clientHeight + this.scrollTop) {
                        console.log("到达底部");
                        clearTimeout(scrollTimer);
                        scrollTimer = setTimeout(() => {
                            this.scrollTop = this.scrollHeight - this.clientHeight - 1;
                        }, 0);
                    }

                    e.stopPropagation();
                });
            },
            // 根据key值进行定位
            resetScroll(scrollerKey) {
                let PageScroller = window.PageScroller;
                let scrollerObj = PageScroller[scrollerKey];
                if (scrollerObj) {
                    let el = scrollerObj["el"] || this.$el;
                    el.scrollLeft = scrollerObj["x"] || 0;
                    el.scrollTop = scrollerObj["y"] || 0;
                }

                /*
                var weights = [1, 2, 3, 4, 5, 6];
                var values = [2, 5, 31, 3, 56, 8];
                var bagWeight = 10;

                function getMax(weights, values, bagWeight) {
                    var arr = [];
                    for (var i = 0; i < weights.length; i++) {
                        arr.push({
                            value: values[i],
                            weight: weights[i],
                            v: values[i] / weights[i]
                        });
                    }
                    let weight, value, maxWeight = 0,
                        maxValue = 0;
                    // for (var i = 0; i < arr.length; i++) {
                    //     weight = arr[i].weight;
                    //     value = arr[i].value;
                    //     arr[i].v = value / weight;
                    // }
                    arr = arr.sort((a, b) => b.v - a.v);
                    console.log(arr);
                    for (var i = 0; i < arr.length; i++) {

                        if (maxWeight + arr[i].weight <= bagWeight) {
                            maxWeight += arr[i].weight;
                            maxValue += arr[i].value;
                        }
                    }
                    return {
                        maxWeight: maxWeight,
                        maxValue: maxValue
                    }
                }

                function knapsack(weights, values, w) {
                    var n = weights.length - 1; //获取物品个数
                    var f = [
                        []
                    ]; //定义f的矩阵
                    for (var j = 0; j <= w; j++) {
                        if (j < weights[0]) { //容量当不下物品0的重量，价值为0
                            f[0][j] = 0;
                        } else {
                            f[0][j] = values[0]; //否则容量为物品0的价值
                        }
                    }
                    for (var j = 0; j <= w; j++) {
                        for (var i = 1; i <= n; i++) {
                            if (!f[i]) { //创建新的一行
                                f[i] = [];
                            }
                            if (j < weights[i]) { //等于之前的最优值
                                f[i][j] = f[i - 1][j];
                            } else {
                                f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - weights[i]] + values[i]);
                            }
                        }
                    }
                    return f[n][w];
                }

                console.log(getMax(weights, values, bagWeight));
                console.log(knapsack(weights, values, bagWeight));
                */
            }
        },
        watch: {
            $route(to, from) {
                this.resetScroll(this.scrollerKey);
            }
        },
        inheritAttrs: true
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope lang="scss">
    .page-scroller {
        position: relative;
        max-height: 100%;
        overflow: auto;
        background: inherit;

        &.page-scroller-overflow-hidden {
            overflow: hidden !important;
        }

        .page-scroller-top-placeholder {
            width: 100%;
            top: 0;
            left: 0;
            // overflow: hidden;
            position: relative;

            .page-scroller-top-placeholder-contain {
                background: inherit;
                position: absolute;
                width: 100%;
                top: 0;
            }
        }

        .page-scroller-bottom-placeholder {
            width: 100%;
            // bottom: 0;
            // left: 0;
            // overflow: hidden;
            position: absolute;
            transform: translateY(-100%);

            .page-scroller-bottom-placeholder-contain {
                background: inherit;
                position: relative;
                width: 100%;
                top: 0;
            }
        }

        .page-scroller-contain {
            position: relative;
            z-index: 1;
            background: inherit;
            // will-change: transform;

            &.page-scroller-transition {
                transition: all 0.3s;
            }
        }
    }
</style>