import "@/assets/style/common.scss";
import "@/utils/mobileUtil";
import "@/assets/js/common";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Mock from "mockjs";
import packages from "./packages";
// import "./registerServiceWorker";

global.axios = axios;

Mock.mock('/user/userInfo', 'get', {
    a: 23
});


global.mobileUtil.fixScreen();

var $html = document.querySelector("html"),
    htmlSize = $html.getAttribute("style");
var $viewport = document.querySelector("meta[name=viewport]"),
    viewport = $viewport.getAttribute("content");
var dpr = $html.dataset.dpr,
    htmlFontSize = $html.style.fontSize.split("px")[0];
$viewport.setAttribute("content", 'initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no');
$html.setAttribute("style", 'font-size: ' + htmlFontSize / dpr + 'px!important;');

Vue.config.productionTip = false;

let AppVueData = {
    // 与RouterHistory同步记录当前处于缓存的组件名称，用于处理前进不缓存，后退缓存
    // router文件配置的meta.componentName字段定义是否需要缓存页面级别组件
    // page-index为导航整个首页的组件名称
    keepAlive: ['page-index'],

    // 用来控制变换前进后退的过渡效果
    tName: "slide-next",
};
global.keepAlive = AppVueData.keepAlive;

function unKeepAlive(name) {
    for (let i = 0; i < AppVueData.keepAlive.length; i++) {

        if (AppVueData.keepAlive[i] == "page-index") {
            // 确保首页组件不被清空缓存
            continue;
        }

        if (AppVueData.keepAlive[i] == name) {
            AppVueData.keepAlive.splice(i, 1)
            break;
        }
    }
}

function addKeepAlive(name) {
    for (let i = 0; i < AppVueData.keepAlive.length; i++) {
        if (AppVueData.keepAlive[i] == name) {
            return;
        }
    }
    AppVueData.keepAlive.push(name)

}

// 记录当前路由跳转的完整路径，用以判断是否前进后退切换换页过度效果
// 增加/home为了兼容首次打开页面进入其他（二级）页面返回异常
let RouterHistory = ["/home"];

let routerFalg = false;
router.beforeEach(function (to, from, next) {

    // console.error("before")
    // console.log("beforeEach");
    // console.log(to);
    if (to.meta && to.meta.pageTitle) {
        window.document.title = to.meta.pageTitle
    } else {
        window.document.title = "something";
    }

    // if (to.path === '/home') {
    //     RouterHistory = []
    // }

    let index = RouterHistory.indexOf(to.fullPath)
    // if (to.path === '/') {
    //   next('/TabHome')
    //   return false
    // }

    if (index !== -1) {
        RouterHistory = RouterHistory.slice(0, index + 1)
        console.log('后')
        AppVueData.tName = 'slide-prev';

        if (from.meta.componentName) {
            // 后退设置上一页不缓存
            unKeepAlive(from.meta.componentName);
        }
    } else {
        RouterHistory.push(to.fullPath)
        console.log('前进')
        AppVueData.tName = 'slide-next';

        if (to.meta.componentName) {
            // 前进设置下一页的缓存
            addKeepAlive(to.meta.componentName)
        }
    }
    global.RouterHistory = RouterHistory
    console.log(RouterHistory)

    // 以下为了处理多个transition标签延迟
    if (!routerFalg) {
        // 首次进入页面立刻执行，不然会引起过度效果
        next();
        routerFalg = true;
    } else {
        // 多个transition标签情况下，会出现过度混乱，故增加延迟
        setTimeout(function () {
            next();
        }, 10)
    }

});

router.afterEach((to, from) => {
    // console.error("after")
    // from.meta.keepAlive = false;

    // console.log("afterEach");
    // console.log(from);
    // console.log(to);
});

if (packages.install && !packages.install.installed) {
    Vue.use(packages);
}

window.vm = new Vue({
    router,
    store,
    data: AppVueData,
    components: {
        App
    },
    template: `<App :tName="tName" :keepAlive="keepAlive"></App>`,
    // render: h => h(App)
}).$mount("#app");