import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import Home from '@/views/Home.vue'

const routes = [
    { path: '/api/auth/login', name: "login", component: LoginView },
    { path: '/api/home', name: "home", component: Home }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
