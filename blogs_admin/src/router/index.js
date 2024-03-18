import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: "/",
        name: "layout",
        component: () => import("../views/Layout.vue"),
        children: [
            {
                path: "/",
                component: () => import("../views/home/Home.vue")
            },
            {
                path: "/user/userlist",
                component: () => import("../views/user/UserList.vue")
            },
            {
                path: "/user/useradd",
                component: () => import("../views/user/UserAdd.vue")
            },
            {
                path: "/article/articlelist",
                component: () => import("../views/article/ArticleList.vue")
            },
            {
                path: "/article/articleadd",
                component: () => import("../views/article/ArticleAdd.vue")
            },
            {
                path: "/article/articleedit/:id",
                component: () => import("../views/article/ArticleEdit.vue")
            },
            {
                path: "/archive/category",
                component: () => import("../views/archive/Category.vue")
            },
            {
                path: "/archive/tag",
                component: () => import("../views/archive/Tag.vue")
            },
            {
                path: "/settings/center",
                component: () => import("../views/settings/Center.vue")
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/Login.vue")
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login' || localStorage.getItem('token')) {
        next()
    } else {
        next('/login')
    }
})

export default router