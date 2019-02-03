<template>
    <PageScroller class="page">
        <div class="page-index">
            <div>{{($route.meta)}}</div>
            <!-- <keep-alive v-if="$route.meta.keepAlive">
                <router-view name="home"></router-view>
            </keep-alive>
            <router-view name="home" v-if="!$route.meta.keepAlive"></router-view> -->
            <!-- 导航级组件强制缓存 -->
            <keep-alive>
                <router-view name="home"></router-view>
            </keep-alive>
            <keep-alive>
                <router-view name="found"></router-view>
            </keep-alive>

            <!-- 底部导航栏组件 -->
            <main-nav />

        </div>

    </PageScroller>
</template>

<script>
    import MainNav from "@/components/MainNav.vue";
    export default {
        data() {
            return {
                msg: '这是首页1'
            }
        },
        created() {
            console.log('初始化应用首页')

        },
        mounted() {},
        components: {
            MainNav
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .page {
        .page-index {
            // position: absolute;
            // left: 0;
            // right: 0;
            // bottom: 100px;
            // top: 0;
            overflow: hidden;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 100px;
            height: 100%;
            // height: 400px;
        }
    }
</style>