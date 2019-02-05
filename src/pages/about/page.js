export default {
    name: "page-about",
    data() {
        return {
            id: "",
            a: Math.random()
        }
    },
    props: {
        // id: {
        //     type: String,
        //     required: true,
        //     default: ""
        // }
    },
    created() {
        this.id = this.$route.params.id;
        this.ajaxGetDetail();
        console.warn("about 初始化");
        console.error(this.a)
    },
    // eslint-disable-next-line
    beforeRouteEnter(to, from, next) {
        // console.log("beforeRouteEnter")
        next(vm => {
            // console.log("导航被确认后回调，mounted之后")
        });
    },
    beforeRouteLeave(to, from, next) {
        console.warn(to)
        console.warn(from)
        let routerHistory = global.routerHistory;
        let index = routerHistory.indexOf(to.fullPath)
        // if (to.path === '/') {
        //   next('/TabHome')
        //   return false
        // }

        if (index !== -1) {
            console.log("hou2")
            // this.$destroy();

        } else {
            console.log("qian2")
            // this.$route.meta.keepAlive = 11;
        }
        // this.$destroy();
        next();
    },
    methods: {
        ajaxGetDetail() {
            // console.log("about");
            // console.log(this.id);
        },
        toPageProduct(productId) {
            this.$router.push(`/product?tt=${productId}`);
            console.log("跳转到产品详情页", productId);
        }
    },
    components: {},
    watch: {
        '$route'(to, from) {
            //这样就可以获取到变化的参数了，然后执行参数变化后相应的逻辑就行了
            // console.log(this.$route);
            this.id = this.$route.params.id;
            this.ajaxGetDetail();
        }
    }
};