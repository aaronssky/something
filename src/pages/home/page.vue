<template>
    <div class="page-home">
        <PageScroller b="23" :on-reach-top="onReachTop" scroll-mode="relative" :on-trigger-top="onTriggerTop">
            <template slot="scroll-top-container" slot-scope="sData">
                <div class="trigger-top-area">
                    <div class="" v-show="sData.scrollerStatus.topTriggerPercent < 100">hoome下拉更新</div>
                    <div class="" v-show="sData.scrollerStatus.topTriggerPercent >= 100">home松开更新</div>
                </div>
            </template>
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