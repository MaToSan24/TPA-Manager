import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/visualization/:courseId?/:projectId?",
        name: "visualization",
        component: () => import("@/views/TpaDetails.vue"),
    },
    {
        path: "/edition/:courseId?/:projectId?",
        name: "edition",
        component: () => import("@/views/TpaDetails.vue"),
    },
    {
        path: "/catalogue",
        name: "catalogue",
        component: () => import("@/views/Catalogue.vue"),
    },
    {
        path: "/:catchAll(.*)",
        name: "notFound",
        component: () => import("@/views/NotFound.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(), // Since this is a SPA, we need to manage this in the server by redirecting all the routes to index.html.
    routes,
})

export default router;