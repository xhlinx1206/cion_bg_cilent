import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/assets/styles/index.css'
import { i18n, setI18nLanguage, registerLocaleHandler } from '@/i18n'
import registerTwLocale from '@/tw-locale'

async function bootstrap() {
    const app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.use(i18n)
    // 先加载默认语言包
    const lang = localStorage.getItem('lang') || 'zh-cn'
    await setI18nLanguage(lang)
    // 注册 Tailwind 组件库语言适配器
    registerTwLocale(registerLocaleHandler)
    app.mount('#app')
}

bootstrap()
