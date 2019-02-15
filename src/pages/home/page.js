import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "page-home",
    data: () => {
        return {
            a: Math.random(),
            i: 1
        };
    },
    created() {
        console.warn("home 初始化")

    },
    methods: {
        aa() {
            $(".page-scroller-transition").css({
            });
        }
    },
    components: {
        HelloWorld
    }
};