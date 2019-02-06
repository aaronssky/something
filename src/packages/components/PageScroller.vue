<template>
    <div class="page-scroller">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "PageScroller",
        data() {
            return {
                scrollerkey: ""
            };
        },
        props: {
            // 记录当前容器的唯一标记，用来创建key:value数据记录容器标记
            // 若不传入，会默认获取当前的$route.fullPath
            uniqueKey: {
                type: String,
                default: "",
            },
        },
        mounted() {
            // console.log("初始化PageScroller组件");
            // console.log(this.$el);
            this.scrollerkey = this.uniqueKey || this.$route.fullPath;

            // 初始化全局变量
            window.PageScroller = window.PageScroller || {};
            window.PageScroller[this.scrollerkey] = {};

            this.addEvent();

        },
        methods: {
            // 添加滚动监听事件
            addEvent() {
                let that = this;
                this.$el.addEventListener("scroll", function (e) {
                    // console.log(this.scrollTop)
                    let PageScroller = window.PageScroller;
                    let scrollerkey = that.scrollerkey;
                    let scrollerObj = PageScroller[scrollerkey] || {};
                    scrollerObj["x"] = this.scrollLeft;
                    scrollerObj["y"] = this.scrollTop;
                    scrollerObj["el"] = this;
                    window.PageScroller[scrollerkey] = scrollerObj;

                })
            },
            // 根据key值进行定位
            resetScroll(scrollerkey) {
                let PageScroller = window.PageScroller;
                let scrollerObj = PageScroller[scrollerkey];
                if (scrollerObj) {
                    let el = scrollerObj["el"] || this.$el;
                    el.scrollLeft = scrollerObj["x"] || 0;
                    el.scrollTop = scrollerObj["y"] || 0;
                }

            }
        },
        watch: {
            '$route'(to, from) {
                //这样就可以获取到变化的参数了，然后执行参数变化后相应的逻辑就行了
                // console.warn("update");
                // console.warn(to);
                this.resetScroll(this.scrollerkey || to.fullPath);

                // this.ajaxGetDetail();
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>