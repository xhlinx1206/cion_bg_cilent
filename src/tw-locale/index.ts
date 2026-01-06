// Tailwind 组件库语言适配器
// - 在语言切换时设置 document.documentElement.lang
// - 触发全局 `languagechange` 自定义事件，供任意组件监听
// - 如果项目中使用 dayjs，则尝试同步 dayjs 的语言包

export default function registerTwLocale(registerLocaleHandler: (fn: (lang: string) => Promise<void>) => void) {
    registerLocaleHandler(async (lang: string) => {
        try {
            document.documentElement.setAttribute('lang', lang)
                // 也设置 data-lang，方便 CSS 选择
                ; (document.documentElement as any).dataset.lang = lang
            // 触发事件，组件可以监听 window 的 languagechange
            window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }))

            // 若存在 dayjs，尝试加载其 locale 并设置
            try {
                // 使用间接动态 import 避免被 Vite 在构建时静态解析，若项目未安装 dayjs 则运行时捕获并忽略
                const short = lang.split('-')[0]
                const dynamicImport = new Function('m', 'return import(m)')
                const dayjsModule = await dynamicImport('dayjs')
                const dayjs = dayjsModule.default || dayjsModule
                // 动态加载 locale 文件（多数 dayjs locale 命名为例如 zh-cn 或 zh）
                try {
                    await dynamicImport(`dayjs/locale/${lang}`)
                    dayjs.locale(lang)
                } catch (e) {
                    try {
                        await dynamicImport(`dayjs/locale/${short}`)
                        dayjs.locale(short)
                    } catch (e2) {
                        // ignore if dayjs locale not found
                    }
                }
            } catch (e) {
                // dayjs not installed or failed — ignore
            }
        } catch (e) {
            // ignore any adapter errors
        }
    })
}
