import Vue from "vue";
import Router from "vue-router";
import index from "./pages/index.vue";
import Home from "./pages/home";

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [{
        path: "/",
        name: "index",
        redirect: '/home',
        component: index,
        // 使用children路由作为导航载体
        children: [{
            path: '/home',
            name: 'home',
            components: {
                home: Home
            },
            meta: {
                pageTitle: "主页",
                // 导航页与至二级页面相互切换时候应用
                keepAlive: true,
            }
        }, {
            path: '/found/:id?',
            name: "found",
            components: {
                found: () => import("./pages/found")
            },
            meta: {
                pageTitle: "发现",
                // 导航页与至二级页面相互切换时候应用
                keepAlive: true,
            }
        }]
    }, {
        path: "/about/:id",
        name: "about",
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "about" */ "./pages/about")
    }, {
        path: "/about2/:id",
        name: "about2",
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: (resolve) => {
            require(["./pages/about"], resolve)
        },
        meta: {
            pageTitle: "关于",
            keepAlive: false,
        }
    }]
});