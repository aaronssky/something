<template>
    <div class="page-scroller" :id="id || `PageScroller-${scrollerKey}`" :data-key="scrollerKey">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "PageScroller",
        data() {
            return {
                scrollerKey: ""
            };
        },
        props: {
            // 记录当前容器的唯一标记，用来创建key:value数据记录容器标记
            // 若不传入，会默认获取当前的$route.fullPath
            uniqueKey: {
                type: String,
                default: "",
            },
            id: {
                type: String,
                default: "",
            }
        },
        mounted() {

            let createUniqueKey = () => {
                if (this.$route.meta && ~~this.$route.meta.PageScrollerIndex >= 0) {
                    this.$route.meta.PageScrollerIndex = ~~this.$route.meta.PageScrollerIndex + 1;
                }
                let index = this.$route.meta.PageScrollerIndex;
                return this.$route.fullPath + `-${index}`;
            }

            this.scrollerKey = this.uniqueKey || createUniqueKey();

            // 初始化全局变量
            window.PageScroller = window.PageScroller || {};
            window.PageScroller[this.scrollerKey] = {};

            this.addEvent();

        },
        methods: {
            // 添加滚动监听事件
            addEvent() {
                let that = this;
                this.$el.addEventListener("scroll", function (e) {
                    // console.log(this.scrollTop)
                    let PageScroller = window.PageScroller;
                    let scrollerKey = that.scrollerKey;
                    let scrollerObj = PageScroller[scrollerKey] || {};
                    scrollerObj["x"] = this.scrollLeft;
                    scrollerObj["y"] = this.scrollTop;
                    scrollerObj["el"] = this;
                    window.PageScroller[scrollerKey] = scrollerObj;

                })
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

            }
        },
        watch: {
            '$route'(to, from) {
                this.resetScroll(this.scrollerKey);
            }
        },
        inheritAttrs: true
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>