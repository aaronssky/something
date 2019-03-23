import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "page-home",
    data: () => {
        return {
            a: Math.random(),
            i: 0
        };
    },
    created() {
        console.warn("home 初始化")

    },
    methods: {
        aa() {
            $(".page-scroller-transition").css({});
        },
        onReachTop() {
            ++this.i;
            console.log("home 到达顶部");
        },
        onTriggerTop(fn_loadFinished) {
            console.log("home 页面 TriggerTop 触发");
            setTimeout(() => {
                console.log("home 页面 TriggerTop load finished");

                // 执行回调通知滚动组件顶部异步刷新已经完成
                fn_loadFinished();
            }, 1000)
        },
        onReachBottom() {
            console.log("home 页面 到达底部触发");
        }
    },
    components: {
        HelloWorld
    }
};