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

router.beforeEach((to, from, next)=>{
    // console.log("beforeEach");
    // console.log(to);
    next();
});

router.afterEach((to, from)=>{
    // console.log("afterEach");
    // console.log(from);
    // console.log(to);
});

window.vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");