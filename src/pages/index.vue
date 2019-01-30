<template>
    <div class="page">
        <div class="index-container">
            <keep-alive>
                <router-view name="home"></router-view>
            </keep-alive>
            <keep-alive>
                <router-view name="found"></router-view>
            </keep-alive>
            <main-nav />

        </div>

    </div>
</template>

<script>
    import MainNav from "@/components/MainNav.vue";
    export default {
        data() {
            return {
                msg: '这是首页1'
            }
        },
        mounted() {
            console.log('初始化应用首页')
        },
        components: {
            MainNav
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .page {
        .index-container {
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