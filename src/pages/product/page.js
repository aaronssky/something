export default {
    name: "page-product",
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
        this.id = this.$route.params.id || this.$route.query.tt;
        this.ajaxGetDetail();
        console.warn("product 初始化");
    },
    beforeRouteUpdate(to, from, next) {
        // 用以同一个路由，但动态参数或者query参数修改刷新组件
        // 在当前路由改变，但是改组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        this.id = to.query.tt;
        this.a = Math.random();

        next() // 注：若去掉会导致url上切换其他id值，再切回当前$route记录的id值，会阻拦路由切换事件
    },
    // eslint-disable-next-line
    beforeRouteEnter(to, from, next) {
        // console.log("beforeRouteEnter")
        next(vm => {
            // console.log("导航被确认后回调，mounted之后")
        });
    },
    activated() {
        // 用以keep-alive的组件刷新事件
        //   this.queryId = this.$router.history.current.query.id
        console.log('钩子事件：activated - ' + this.$router.history.current.fullPath)
        //   this.initDetail(this.queryId)
    },
    deactivated() {
        // keep-alive 组件停用时调用。
        console.log('钩子事件：deactivated - ' + this.$router.history.current.fullPath)
    },
    methods: {
        ajaxGetDetail() {
            // console.log("about");
            // console.log(this.id);
        }
    },
    components: {},
    watch: {
        '$route'(to, from) {
            //这样就可以获取到变化的参数了，然后执行参数变化后相应的逻辑就行了
            // console.log(this.$route);
            // this.id = this.$route.params.id;
            // this.ajaxGetDetail();
            console.log(12313)
        }
    }
};