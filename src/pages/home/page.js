import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "page-home",
    data: () => {
        return {
            a: Math.random()
        };
    },
    created(){
        console.warn("home 初始化")

    },
    components: {
        HelloWorld
    }
};