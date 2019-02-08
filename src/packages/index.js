// 全局组件库
/* eslint-disable */
import PageScroller from "./components/PageScroller.vue";

const components = [
    PageScroller,
]

const install = function (Vue) {
    if (install.installed) {
        return;
    }
    components.map(component => Vue.component(component.name, component));
    install.installed = true;
    // MetaInfo.install(Vue)
    // Vue.prototype.$loading = WLoadingBar
}

// 若单独打包引用，加载打包出的js文件后自动执行vue.use
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

/**
 * 若已经install，则不需 Vue.use(packages);
 */

export default {
    install,
    // WButton,
    // YcfImage,
}