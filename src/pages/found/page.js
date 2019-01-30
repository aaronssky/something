export default {
    name: "page",
    data() {
        return {
            id: ""
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
        this.id = this.$route.params.id || this.$route.query.id;
        this.ajaxGetDetail();
    },
    // eslint-disable-next-line
    beforeRouteEnter(to, from, next) {
        // console.log("beforeRouteEnter")
        next(vm => {
            // console.log("导航被确认后回调，mounted之后")
        });
    },
    methods: {
        ajaxGetDetail() {
            console.log("found");
            console.log(this.id);
        }
    },
    components: {},
    watch: {
        '$route'(to, from) {
            //这样就可以获取到变化的参数了，然后执行参数变化后相应的逻辑就行了
            // console.log(this.$route);
            this.id = this.$route.params.id || this.$route.query.id;
            this.ajaxGetDetail();
        }
    }
};