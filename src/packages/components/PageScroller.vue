<template>
    <div class="page-scroller" :class="{'page-scroller-overflow-hidden':overflowHidden}" :id="id || `PageScroller-${scrollerKey}`"
        :data-key="scrollerKey">

        <!-- begin 容器顶端滑动展示内容（固定在正文最顶端） -->
        <div class="page-scroller-top-placeholder" v-if="scrollMode=='absolute'">
            <div class="page-scroller-top-placeholder-container">
                <slot name="scroll-top-container" :scrollerStatus="scrollerStatus">
                    {{style}}
                    <br>
                    {{tips}}
                    <h1>下拉刷新</h1>
                </slot>
            </div>
        </div>
        <!-- endof 容器顶端滑动展示内容（固定在正文最顶端） -->

        <div class="page-scroller-container" :class="{'page-scroller-transition':touches.length==0}" :style="style">

            <!-- begin 容器顶端滑动展示内容（相对正文顶端跟随滚动） -->
            <div class="page-scroller-inner-top" v-if="scrollMode=='relative'">
                <slot name="scroll-top-container" :scroller-status="scrollerStatus">
                    <div v-show="scrollerStatus.triggerTopLoading">加载中...</div>
                    <div v-show="!scrollerStatus.triggerTopLoading">
                        <div class="" v-show="scrollerStatus.topTriggerPercent < 100">下拉更新def</div>
                        <div class="" v-show="scrollerStatus.topTriggerPercent >= 100">松开更新def</div>
                    </div>

                </slot>
            </div>
            <!-- endof 容器顶端滑动展示内容（相对正文顶端跟随滚动） -->

            <!-- begin 容器正文内容 -->
            <div class="page-scroller-container-content">
                <div style="    word-wrap: break-word;" v-html="browser">
                </div>
                <div style="height:100px;  word-wrap: break-word;" v-html="scrollerStatus"></div>
                <slot></slot>
            </div>
            <!-- endof 容器正文内容 -->

            <!-- begin 容器低端滑动展示内容（相对正文低端跟随滚动） -->
            <div class="page-scroller-inner-bottom-placeholder">
                <div class="page-scroller-inner-bottom-container">
                    底部
                    <div style="    word-wrap: break-word;" v-html="browser"></div>
                </div>
            </div>
            <!-- begin 容器低端滑动展示内容（相对正文低端跟随滚动） -->
        </div>

        <!-- begin 容器低端滑动展示内容（固定在正文最低端） -->
        <div class="page-scroller-bottom-placeholder">
            <div class="page-scroller-bottom-placeholder-container">
                {{style}}
                <h1>上拉加载</h1>
            </div>
        </div>
        <!-- endof 容器低端滑动展示内容（固定在正文最低端） -->

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
                isTrueIos: undefined, // 是否IOS真机，区分chrome等模拟器
                compatibleMode: false, // 低端机型用户体验向下兼容模式
                scrollerStatus: {
                    triggerTopLoading: false, // 顶部是否处于loading中
                    topTriggerPercent: 0 // 顶部滚动到达触发事件的百分比
                },
                touchStartEvents: [],
                touchMoveEvents: [],
                touchEndEvents: [],
                scrollEvents: [],
                tips: "",
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
            },
            onReachTop: {
                type: Function,
                default: function () {
                    console.log("default onReachTop")
                }
            },
            onTriggerTop: {
                type: Function,
                default: function () {
                    console.log("default onTriggerTop")
                }
            },

            // 顶端滚动时候背景的位置
            // relative:跟随滚动， absolute:固定在顶部，底部
            scrollMode: {
                type: String,
                default: "relative",
            }
        },
        mounted() {

            this.init();
        },
        methods: {
            init() {

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
                            qq: u.indexOf('QBWebView') > -1, // QQ内置浏览器（暂未严谨测试）
                            x5Browser: u.indexOf('MQQBrowser') > -1, // 腾讯X5内核浏览器
                            trueIos: (function () {
                                // 在ios safir、UIWebView 、WKWebView里是有兼容问题的
                                // 但在chrome（PC版和移动端版），android webview及andrid上各国产浏览器是正常的。
                                // 故可用来区分IOS真机与chrome模拟器
                                if (new Date('2016-11-11 11:11:11').getTime() > 0) {
                                    return false;
                                } else {
                                    // NaN
                                    return true;
                                }
                            })()
                        };
                    }()
                };


                this.browser = JSON.stringify(browser) + " <br> <br> " + navigator.userAgent;

                this.isWX = browser.feature.wx;
                this.isIos = browser.feature.ios;
                this.isTrueIos = browser.feature.trueIos;
                this.isAndroid = browser.feature.android;
                this.x5Browser = browser.feature.x5Browser;

                // 安卓低版本向下兼容，需要加安卓系统版本判断
                this.compatibleMode = this.x5Browser;

                this.bindEvents();

            },
            _initOnReachTop() {
                let that = this;
                this.scrollEvents.push(function (e) {
                    if (this.scrollTop == 0) {
                        that.onReachTop();
                    }
                });
            },
            _initOnTriggerTop() {

                let that = this;

                let _onTriggerTop = () => {
                    this.scrollerStatus.triggerTopLoading = true;

                    let timer;
                    let fn_loadFinisthed = () => {
                        clearTimeout(timer);
                        // console.log("顶部刷新完成");
                        this.scrollerStatus.triggerTopLoading = false;
                        this.setTransform(0, 0, 0);
                    };

                    // 超时机制
                    let fn_loadTimeout = () => {
                        timer = setTimeout(() => {
                            console.warn("default warning: trigger top timeout");
                            fn_loadFinisthed();
                        }, 5000);
                    }

                    this.onTriggerTop(fn_loadFinisthed);

                    fn_loadTimeout();
                }

                this.touchEndEvents.push(function (e) {
                    if (e.touches && e.touches.length == 0 && that.scrollerStatus && that.scrollerStatus.topTriggerPercent >=
                        100) {
                        _onTriggerTop();
                    }
                });
            },
            // 设置偏移值统一入口
            setTransform(x = 0, y = 0, z = 0) {

                if (this.scrollerStatus.triggerTopLoading) {
                    y = 50;
                }

                let topTriggerHeight = 150; // 顶部下拉触发事件高度

                let maxScrollHeight = 0; // 上下拉滚动距离最大阈值

                let topMaxScrollHeight = 600 || maxScrollHeight;

                let bottomMaxScrollHeight = 0 || maxScrollHeight;

                // y = y / 2; // 滑动比例

                // 顶部下拉设置最大高度阈值
                if (topMaxScrollHeight > 0) {
                    if (y >= topMaxScrollHeight) {
                        // 顶端下拉到达阈值
                        y = topMaxScrollHeight;
                    }
                }

                // 底部上拉设置最大高度阈值
                if (bottomMaxScrollHeight > 0) {
                    if (y <= -bottomMaxScrollHeight) {
                        // 低端上拉到达阈值
                        y = -bottomMaxScrollHeight;
                    }
                }

                this.tips = y / topTriggerHeight;
                this.scrollerStatus.topTriggerPercent = y / topTriggerHeight * 100;
                if (this.scrollerStatus.topTriggerPercent > 100) {
                    this.scrollerStatus.topTriggerPercent = 100;
                }

                // 转成rem
                y = y / 75;
                this.style = `transform:translate3d(${x},${y}rem,${z})`;
            },
            // 初始化自动记录滚动位置，当有切换router跳页时候自动回到原先位置
            _initRecordOffset() {
                let that = this;

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

                this.scrollEvents.push(function (e) {
                    let PageScroller = window.PageScroller;
                    let scrollerKey = that.scrollerKey;
                    let scrollerObj = PageScroller[scrollerKey] || {};
                    scrollerObj["x"] = this.scrollLeft;
                    scrollerObj["y"] = this.scrollTop;
                    scrollerObj["el"] = this;
                    window.PageScroller[scrollerKey] = scrollerObj;
                })
            },
            // 初始化基础事件（仅限组件最基础事件 + 设备兼容）
            _initBaseEvents() {
                let that = this;

                let touchStartY, touchStartScrollTop;

                this.touchStartEvents.push(function (e) {
                    let touches = e.touches || [],
                        touchOne = touches[0],
                        touchOneX = touchOne.pageX,
                        touchOneY = touchOne.pageY;

                    that.overflowHidden = false;
                    that.touches = touches;

                    touchStartScrollTop = this.scrollTop;
                    touchStartY = touchOneY;

                    // 用以体验兼容模式
                    that.touchStartIsAtScrollTop = that.isAtScrollTop;
                });

                this.touchMoveEvents.push(function (e) {
                    let touches = e.touches || [],
                        touchOne = touches[0],
                        touchOneX = touchOne.pageX,
                        touchOneY = touchOne.pageY,
                        touchOneDist = touchOneY - touchStartY;

                    if (that.isAtScrollTop) {
                        // 当前滑动状态是在顶端时候

                        if (touchOneDist > 0) {
                            // 手指向下滑动时候

                            if (that.compatibleMode) {
                                // 安卓低端版本微信端或QQ浏览器交互处理，用户体验向下兼容

                                // 用以禁止顶端下拉时候会把页面也拉下，故牺牲用户体验，向下兼容
                                e.preventDefault();

                                // 当本来已经处于顶端时候才允许触发下拉
                                if (that.touchStartIsAtScrollTop) {
                                    if (touchOneDist - touchStartScrollTop < 0) {
                                        that.setTransform(0, 0, 0);
                                    } else {
                                        that.setTransform(0, touchOneDist - touchStartScrollTop, 0);
                                    }
                                }

                            } else {
                                if (touchOneDist - touchStartScrollTop < 0) {
                                    that.setTransform(0, 0, 0);

                                } else {
                                    that.setTransform(0, touchOneDist - touchStartScrollTop, 0);
                                }
                            }

                        } else {
                            // 手指向上滑动时候

                            // 体验兼容模式使用
                            that.touchStartIsAtScrollTop = false;

                            // 体验优化，处理快速向上滑动时候
                            that.setTransform(0, 0, 0);
                        }

                    } else {

                        // 貌似可以不用
                        if (that.overflowHidden) {
                            that.overflowHidden = false;
                            that.setTransform(0, 0, 0);
                        }
                    }

                    if (that.isAtScrollBottom) {
                        // 当前滑动状态是在底端时候

                        if (touchOneDist < 0) {
                            // 手指向上滑动

                            // 点击时候相对底部的位置
                            let touchStartOffsetBottom = this.scrollHeight - touchStartScrollTop - this.clientHeight;

                            if (that.compatibleMode) {
                                // 安卓低端版本微信端才需要这样，用户体验向下兼容
                                e.preventDefault();
                                if (touchOneDist + touchStartOffsetBottom > 0) {
                                    that.setTransform(0, 0, 0);
                                } else {
                                    that.setTransform(0, touchOneDist + touchStartOffsetBottom, 0);
                                }
                            } else {

                                if (touchOneDist + touchStartOffsetBottom > 0) {
                                    that.setTransform(0, 0, 0);
                                } else {
                                    that.setTransform(0, touchOneDist + touchStartOffsetBottom, 0);
                                }
                            }

                        } else {
                            // 手指向下滑动

                            // 体验优化，处理快速向下滑动时候
                            that.setTransform(0, 0, 0);
                        }

                    } else {
                        // 貌似可以不用
                        // if (that.overflowHidden) {
                        //     that.overflowHidden = false;
                        //     // that.style = `transform:translate3d(0,0,0)`;
                        //     setTransform(0, 0, 0);
                        // }
                    }
                });

                this.touchEndEvents.push(function (e) {

                    // 松开手指参数复位相关数据
                    if (e.touches && e.touches.length == 0) {

                        // 使用延迟，避免先执行，导致triggerTop等依赖的变量被复位
                        that.$nextTick(() => {
                            that.setTransform(0, 0, 0);
                            that.overflowHidden = false;
                            that.touches = [];
                        });
                    }
                });

                this.scrollEvents.push(function (e) {
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
                });

            },
            // 浏览器设备交互差异兼容
            _initCompatibility() {

                let that = this;

                if (that.isAndroid) {
                    // 增加暂时禁止滚动的元素，用来处理滚动父子级穿透
                    this.touchStartEvents.push(function (e) {
                        let $curScrollEl = $(that.$el);
                        let $parents = $curScrollEl.parents() || [];
                        $parents.addClass("overflow-hidden-temp");
                    });
                }

                // PC端模拟器下兼容滚动穿透
                if (that.isIos && !that.isTrueIos) {
                    this.touchStartEvents.push(function (e) {
                        // 增加暂时禁止滚动的元素，用来处理滚动父子级穿透
                        let $curScrollEl = $(that.$el);
                        let $parents = $curScrollEl.parents() || [];
                        $parents.addClass("overflow-hidden-temp");
                    });
                }

                this.touchEndEvents.push(function (e) {
                    // 移除暂时禁止滚动的元素
                    $(".overflow-hidden-temp").removeClass("overflow-hidden-temp");

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
                        });
                    }
                });


                // 兼容IOS的顶端滚动拖动页面溢出的坑
                if (that.isIos && that.isTrueIos) {

                    setTimeout(() => {
                        this.$el.scrollTop = 1;
                    }, 1);

                    let scrollTimer;

                    this.scrollEvents.push(function (e) {
                        // 到达顶部，兼容IOS的顶端滚动bug
                        if (this.scrollTop == 0) {
                            // console.log("到达顶部");
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
                    });
                }
            },
            // 整个组件事件绑定入口
            bindEvents() {

                // 若当前scroller没滚动条（容器不够高度，无滚动条），则不绑定相关事件
                if (this.$el.offsetHeight >= this.$el.scrollHeight) {
                    return;
                }

                this._initRecordOffset();

                this._initBaseEvents();

                this._initCompatibility();

                this._initOnReachTop();

                this._initOnTriggerTop();

                let that = this;

                let touchStartY, touchStartScrollTop;

                this.setTransform(0, 0, 0);

                this.$el.addEventListener("touchstart", function (e) {

                    let eventFn;
                    for (let i = 0; i < that.touchStartEvents.length; i++) {
                        eventFn = that.touchStartEvents[i];
                        eventFn.call(this, e);
                    }

                    e.stopPropagation();
                });

                this.$el.addEventListener("touchmove", function (e) {

                    let eventFn;
                    for (let i = 0; i < that.touchMoveEvents.length; i++) {
                        eventFn = that.touchMoveEvents[i];
                        eventFn.call(this, e);
                    }

                    // 兼容IOS和PC，安卓微信内置浏览器不可使用（未详细测试）
                    e.stopPropagation();
                });

                this.$el.addEventListener("touchend", function (e) {

                    // 绑定相关组件提供的事件
                    let eventFn;
                    for (let i = 0; i < that.touchEndEvents.length; i++) {
                        eventFn = that.touchEndEvents[i];
                        eventFn.call(this, e);
                    }

                    // e.preventDefault();
                    e.stopPropagation();
                });


                // 监听滚动到顶端
                this.$el.addEventListener("scroll", function (e) {

                    // 绑定相关组件提供的事件
                    let eventFn;
                    for (let i = 0; i < that.scrollEvents.length; i++) {
                        eventFn = that.scrollEvents[i];
                        eventFn.call(this, e);
                    }

                    e.stopPropagation();
                });
            },
            // 添加滚动监听事件，记录当前el滚动坐标
            // addScrollEvent() {

            //     let that = this;

            //     this.$el.addEventListener("scroll", function (e) {
            //         // console.log(this.scrollTop)

            //         let PageScroller = window.PageScroller;
            //         let scrollerKey = that.scrollerKey;
            //         let scrollerObj = PageScroller[scrollerKey] || {};
            //         scrollerObj["x"] = this.scrollLeft;
            //         scrollerObj["y"] = this.scrollTop;
            //         scrollerObj["el"] = this;
            //         window.PageScroller[scrollerKey] = scrollerObj;




            //         e.stopPropagation();
            //     });
            // },
            // 根据key值进行定位
            resetScrollOffset(scrollerKey) {
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
                this.resetScrollOffset(this.scrollerKey);
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

            .page-scroller-top-placeholder-container {
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

            .page-scroller-bottom-placeholder-container {
                background: inherit;
                position: relative;
                width: 100%;
                top: 0;
            }
        }

        .page-scroller-container {
            position: relative;
            z-index: 1;
            background: inherit;
            // will-change: transform;

            &.page-scroller-transition {
                transition: all 0.3s;
            }

            .page-scroller-inner-top {
                position: absolute;
                display: inline-block;
                width: 100%;
                transform: translate3d(0, -100%, 0);
                top: 0;
                left: 0;
            }

            .page-scroller-inner-bottom-placeholder {
                position: fixed;
                display: inline-block;
                width: 100%;
                bottom: 0;
                left: 0;
                height: 0;

                .page-scroller-inner-bottom-container {
                    position: relative;
                }
            }
        }
    }
</style>