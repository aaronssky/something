import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "page",
    data: () => {
        return {
            a: Math.random()
        };
    },
    components: {
        HelloWorld
    }
};