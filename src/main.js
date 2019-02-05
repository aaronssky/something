import "@/assets/style/common.scss";
import "@/utils/mobileUtil";
import "@/assets/js/common";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import packages from "./packages";
import "./registerServiceWorker";

window.mobileUtil.fixScreen();
Vue.config.productionTip = false;

let AppVueData = {
    // 与routerHistory同步记录当前处于缓存的组件名称，用于处理前进不缓存，后退缓存
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
let routerHistory = ["/home"];

let routerFalg = false;
router.beforeEach(function (to, from, next) {

    // console.log("beforeEach");
    // console.log(to);
    if (to.meta && to.meta.pageTitle) {
        window.document.title = to.meta.pageTitle
    } else {
        window.document.title = "something";
    }

    // if (to.path === '/home') {
    //     routerHistory = []
    // }

    let index = routerHistory.indexOf(to.fullPath)
    // if (to.path === '/') {
    //   next('/TabHome')
    //   return false
    // }

    if (index !== -1) {
        routerHistory = routerHistory.slice(0, index + 1)
        console.log('后')
        AppVueData.tName = 'slide-prev';
        // setTimeout(function () {
        //     console.log(from,"设置false")
        //     from.meta.keepAlive = false;
        // }, 400);
        // to.meta.keepAlive = true;
        // from.meta.keepAlive = false;

        unKeepAlive(from.meta.componentName);
    } else {
        routerHistory.push(to.fullPath)
        console.log('前进')
        AppVueData.tName = 'slide-next';
        // from.meta.keepAlive = true;
        // 先设置好true再next，才会被首次缓存
        to.meta.keepAlive = true;

        if (to.meta.componentName) {
            addKeepAlive(to.meta.componentName)
        }
    }
    global.routerHistory = routerHistory
    console.log(routerHistory)

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