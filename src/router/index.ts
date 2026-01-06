import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import { setI18nLanguage } from '@/i18n'

const routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', name: 'Login', component: Login },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard }
]

const router = createRouter({ history: createWebHistory(), routes })

// 全局路由守卫：未登录跳转到 /login，已登录访问 /login 则重定向到 /dashboard
router.beforeEach(async (to, from, next) => {
    const lang = localStorage.getItem('lang') || 'zh-cn'
    try {
        await setI18nLanguage(lang)
    } catch (e) {
        // ignore language load errors
    }
    const token = localStorage.getItem('token')
    if (to.path === '/login') {
        if (token) return next('/dashboard')
        return next()
    }
    if (!token) return next('/login')
    next()
})

export default router
