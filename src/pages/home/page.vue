<template>
    <div class="page-home">
        <PageScroller b="23" :on-reach-top="onReachTop" scroll-mode="relative" :on-trigger-top="onTriggerTop">
            <!-- begin 完整头部 -->
            <!-- <template slot="trigger-top-container" slot-scope="sData">
                <div class="trigger-top-area">
                    <div class="trigger-top-container-loading" style="height:4rem" v-show="sData.scrollerStatus.triggerTopLoading">加载中home...</div>
                    <div v-show="!sData.scrollerStatus.triggerTopLoading">
                        <div class="" v-show="sData.scrollerStatus.topTriggerPercent < 100">下拉更新home</div>
                        <div class="" v-show="sData.scrollerStatus.topTriggerPercent >= 100">松开更新home</div>
                    </div>
                </div>
            </template> -->
            <!-- endof 完整头部 -->

            <!-- <template slot="trigger-top-container-loading">
                <div style="height:1rem;">4444</div>
            </template>

            <template slot="trigger-top-container-area" slot-scope="sData">
                <div>{{sData}}</div>
            </template> -->
            <!-- <img alt="Vue logo" src="@/assets/logo.png"> -->
            <div>{{a}}</div>
            <div>{{i}}</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <PageScroller unique-key="home-test" id="aaa" class="home-test">
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>111</p>
                <p>1333</p>
                <p>144</p>
                <p>155</p>
                <p>1</p>
                <p>144</p>
                <p>166</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
            </PageScroller>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <input type="text">
            <div>111</div>
            <div>111</div>
            <div @click="aa">111</div>
            <div @click="aa">111</div>
            <div @click="aa">111</div>
            <div @click="aa">111</div>
            <div @click="aa">111</div>
            <div @click="aa">111</div>
            <div @click="aa">111</div>
            <div @click="aa">bottom</div>
        </PageScroller>
    </div>
</template>

<script>
    // @ is an alias to /src
    import page from "./page";

    export default page;
</script>

<style scoped lang="scss">
    @import "./page.scss";
</style>