<template>
    <div id="app">
        <!-- <div>134567889</div> -->
        <!-- <div id="nav">
            <router-link to="/home">Home</router-link> |
            <router-link :to="{path:'/about/1', query:{tt:44}}">About1</router-link> |
            <router-link :to="{path:'/about2/2', query:{tt:44}}">About2</router-link>
            <router-link :to="{path:'/found', query:{id:44}}">found2</router-link>
    </div>-->
        <!-- 使用多个transition，为了处理路由页面缓存 -->
        <!-- <transition :name="tName">
            <keep-alive>
                <router-view class="router-view" v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition :name="tName">
            <router-view v-if="!$route.meta.keepAlive" class="router-view"></router-view>
    </transition>-->
        <transition :name="tName">
            <keep-alive :include="keepAlive">
                <router-view class="router-view"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "App",
        props: {
            tName: {
                type: String
            },
            keepAlive: {
                type: Array
            }
        },
        data: () => {
            return {
                // tName: "slide-next",
                // routerHistory: global.routerHistory || [],
            };
        },
        created() {
            // global.routerHistory = this.routerHistory;

            console.log(2222);
        },
        components: {}
    };
</script>

<style lang="scss">
    // @font-face {
    //     font-family: 'iconfont';
    //     /* project id 234229 */
    //     src: url('//at.alicdn.com/t/font_234229_u7qk27kx94.eot');
    //     src: url('//at.alicdn.com/t/font_234229_u7qk27kx94.eot?#iefix') format('embedded-opentype'),
    //         url('//at.alicdn.com/t/font_234229_u7qk27kx94.woff2') format('woff2'),
    //         url('//at.alicdn.com/t/font_234229_u7qk27kx94.woff') format('woff'),
    //         url('//at.alicdn.com/t/font_234229_u7qk27kx94.ttf') format('truetype'),
    //         url('//at.alicdn.com/t/font_234229_u7qk27kx94.svg#iconfont') format('svg');
    // }

    body {
        overflow: hidden;
    }

    .iconfont {
        font-size: 24px;
    }

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        font-size: 28px;
        max-width: 100%;
        width: 100%;
        display: inline-block;
        overflow: hidden;
    }

    .page {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #ffffff;
        overflow: hidden;
        overflow-y: auto;
    }

    $slideDuration: .6s;

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
            transition: all $slideDuration cubic-bezier(1, 0.3, 0.5, 1);
            position: fixed;
            z-index: 1;
            overflow: hidden;
            overflow-y: auto;
            // max-height: 100%;
            // overflow: hidden;
            // background-color: white;
        }

        // 进入页过渡中持续存在的class
        &-enter-to {
            // 这个在此可加可不加
            transform: translateX(0);
        }

        // 退出页过渡中持续存在的class
        &-leave-active {
            transition: all $slideDuration cubic-bezier(1, 0.3, 0.5, 1);
            position: fixed;
            // max-height: 100%;
            z-index: 0;
            overflow: hidden;
            overflow-y: auto;
        }

        // 退出页过渡中持续存在的class
        &-leave-to {
            transform: translateX(-30%);
            // opacity: 0;
            // max-height: 100%;
        }
    }

    .slide-prev {
        &-enter {
            transform: translateX(-30%);
            // opacity: 0;
            // max-height: 100%;
            overflow: hidden;
            z-index: 0;
        }

        &-enter-active {
            transition: all $slideDuration cubic-bezier(1, 0.3, 0.5, 1);
            // max-height: 100%;
            overflow: hidden;
            position: fixed;
            z-index: 0;
        }

        &-enter-to {
            // 这个在此可加可不加
            transform: translate3d(0, 0, 0);
        }

        &-leave-active {
            transition: all $slideDuration cubic-bezier(1, 0.3, 0.5, 1);
            // max-height: 100%;
            overflow: hidden;
            position: fixed;
            z-index: 1000;
        }

        &-leave-to {
            transform: translate3d(100%, 0, 0);

            // opacity: 0;
        }
    }

    .overflow-hidden-temp {
        overflow: hidden !important;
    }
</style>