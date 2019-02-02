<template>
    <div id="app">
        <!-- <div id="nav">
            <router-link to="/home">Home</router-link> |
            <router-link :to="{path:'/about/1', query:{tt:44}}">About1</router-link> |
            <router-link :to="{path:'/about2/2', query:{tt:44}}">About2</router-link>
            <router-link :to="{path:'/found', query:{id:44}}">found2</router-link>
        </div> -->
        <transition name="slide-prev">
            <keep-alive v-if="$route.meta.keepAlive">
                <router-view class="router-view"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive" class="router-view"></router-view>
            <!-- <keep-alive>
                <router-view class="router-view" />
            </keep-alive> -->
        </transition>
    </div>
</template>

<script>
    export default {
        name: "App",
        components: {}
    };
</script>

<style lang="scss">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        font-size: 28px;
    }

    .page {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #ffffff;
    }

    $slideDuration: 0.3s;

    /* Enter and leave animations can use different */
    /* durations and timing functions.              */
    .slide-next {

        // 进入页过渡前的class，可用以设置过渡前初始样式状态
        &-enter {
            transform: translateX(100%);
            // max-height: 100%;
            // overflow: hidden;
        }

        // 进入页过渡中持续存在的class
        &-enter-active {
            transition: all $slideDuration cubic-bezier(1.0, 0.5, 0.8, 1.0);
            // max-height: 100%;
            // overflow: hidden;
            // background-color: white;
        }

        // 进入页过渡中持续存在的class
        &-enter-to {
            // transform: translateX(0%);
            z-index: 1;
        }

        // 退出页过渡中持续存在的class
        &-leave-active {
            transition: all $slideDuration cubic-bezier(1.0, 0.5, 0.8, 1.0);
            z-index: 0;
            // max-height: 100%;
        }

        // 退出页过渡中持续存在的class
        &-leave-to {
            transform: translateX(-30%);
            // opacity: 0;
            // max-height: 100%;
            overflow: hidden;
        }
    }

    .slide-prev {
        &-enter {
            transform: translateX(-30%);
            // opacity: 0;
            // max-height: 100%;
            overflow: hidden;
        }

        &-enter-active {
            transition: all $slideDuration cubic-bezier(1.0, 0.5, 0.8, 1.0);
            // max-height: 100%;
            overflow: hidden;
        }

        &-enter-to {
            z-index: 0;
        }

        &-leave-active {
            transition: all $slideDuration cubic-bezier(1.0, 0.5, 0.8, 1.0);
            // max-height: 100%;
            overflow: hidden;
            z-index: 1;
        }

        &-leave-to {
            transform: translateX(100%);
            // opacity: 0;
        }
    }

</style>