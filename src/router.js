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
        children: [{
            path: '/home',
            name: 'home',
            components: {
                home: Home
            }
        }, {
            path: '/found/:id?',
            name: "found",
            components: {
                found: () => import("./pages/found")
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
        }
    }]
});