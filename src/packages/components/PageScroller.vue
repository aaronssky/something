<template>
    <div class="page page-scroller">
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
            console.log(345)
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .main-nav {
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

                &.router-link-exact-active {
                    color: #42b983;
                }
            }
        }

    }
</style>