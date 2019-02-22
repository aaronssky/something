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
        }
    },
    components: {
        HelloWorld
    }
};