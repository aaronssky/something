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
                fn_loadFinished();
            }, 1000)
        }
    },
    components: {
        HelloWorld
    }
};