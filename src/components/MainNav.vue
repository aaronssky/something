<template>
    <div class="main-nav">
        <div class="item">
            <router-link to="/home">
                <div class="router-text">
                    <i class="iconfont icon-home"></i>
                    <span>首页</span>
                </div>
            </router-link>
        </div>
        <div class="item">
            <router-link :to="{path:'/found', query:{id:44}}">
                <div class="router-text">
                    <i class="iconfont icon-home"></i>
                    <span>发现</span>
                </div>
            </router-link>
        </div>
        <div class="item">
            <router-link :to="{path:'/about2/2', query:{tt:44}}">About2</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MainNav",
        props: {
            msg: String
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .main-nav {
        // transform:translateZ(0);
        position: fixed;
        bottom: 0;
        height: 100px;
        width: 100%;
        display: flex;
        background-color: rgb(230, 230, 230);

        .item {
            flex: 1;

            a {
                font-weight: bold;
                color: #a8b8c9;
                display: block;
                height: 100%;

                &.router-link-exact-active {
                    color: #42b983;
                }
            }
        }

    }

    // 以下兼容切换页面过度时候导航的样式兼容
    // 未测试安卓
    .slide-next {
        &-leave-active {
            .main-nav {
                transform: translateZ(0);
            }
        }
    }

    .slide-prev {
        &-enter-active {
            .main-nav {
                transform: translateZ(0);
            }
        }
    }
</style>