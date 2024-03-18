import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: "/",
        name: "layout",
        component: () => import("../views/Layout.vue"),
        children: [
            {
                path: "/",
                name: "home",
                component: () => import("../views/Home.vue"),
            },
            {
                path: "/article/:id",
                name: "article",
                component: () => import("../views/Article.vue"),
            },
        ]
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router