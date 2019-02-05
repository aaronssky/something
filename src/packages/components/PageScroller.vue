<template>
    <div class="page-scroller">
        {{msg}}
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "PageScroller",
        props: {
            msg: String
        },
        mounted() {
            console.log("初始化PageScroller组件");

        },
        watch: {
            '$route'(to, from) {
                //这样就可以获取到变化的参数了，然后执行参数变化后相应的逻辑就行了
                // console.log(this.$route);
                // this.ajaxGetDetail();
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    
</style>