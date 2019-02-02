import "@/assets/style/common.scss";
import "@/utils/mobileUtil";
import "@/assets/js/common";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

window.mobileUtil.fixScreen();
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {

    // console.log("beforeEach");
    // console.log(to);
    if (to.meta && to.meta.pageTitle) {
        window.document.title = to.meta.pageTitle
    } else {
        window.document.title = "something";
    }
    next();
});

router.afterEach((to, from) => {
    // console.log("afterEach");
    // console.log(from);
    // console.log(to);
});

window.vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");