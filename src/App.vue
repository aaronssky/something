<template>
    <div id="app">
        <!-- <div id="nav">
            <router-link to="/home">Home</router-link> |
            <router-link :to="{path:'/about/1', query:{tt:44}}">About1</router-link> |
            <router-link :to="{path:'/about2/2', query:{tt:44}}">About2</router-link>
            <router-link :to="{path:'/found', query:{id:44}}">found2</router-link>
        </div> -->
        <transition name="slide-next">
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
    }

    #nav {
        background-color: pink;
        height: 100px;
        line-height: 100px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;

        a {
            font-weight: bold;
            color: #a8b8c9;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    $slideDuration: .5s;

    /* Enter and leave animations can use different */
    /* durations and timing functions.              */
    .slide-next-enter-active {
        transition: all $slideDuration cubic-bezier(1.0, 0.5, 0.8, 1.0);
        max-height: 100%;
        // overflow: hidden;
        background-color: white;
    }

    .slide-next-leave-active {
        transition: all $slideDuration cubic-bezier(1.0, 0.5, 0.8, 1.0);
        max-height: 100%;
        // overflow: hidden;
        // background-color: red;
    }

    .slide-next-enter

    /* .slide-fade-leave-active for <2.1.8 */
        {
        transform: translateX(100%);
        max-height: 100%;
        overflow: hidden;
        // opacity: 0;
        // background-color: blue;
    }

    .slide-next-leave-to {
        transform: translateX(-100%);
        // opacity: 0;
        max-height: 100%;
        // overflow: hidden;
    }

    .slide-prev-enter-active {
        transition: all $slideDuration cubic-bezier(1.0, 0.5, 0.8, 1.0);
        max-height: 100%;
        overflow: hidden;
        /*transition: all 1s ease;*/
        // background-color: green;
    }

    .slide-prev-leave-active {
        transition: all $slideDuration cubic-bezier(1.0, 0.5, 0.8, 1.0);
        max-height: 100%;
        overflow: hidden;
        /*background-color: red;*/
    }

    .slide-prev-enter

    /* .slide-fade-leave-active for <2.1.8 */
        {
        transform: translateX(-100%);
        opacity: 0;
        max-height: 100%;
        overflow: hidden;
    }

    .slide-prev-leave-to {
        transform: translateX(100%);
        opacity: 0;
    }
</style>