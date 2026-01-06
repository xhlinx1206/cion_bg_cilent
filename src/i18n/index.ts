import { createI18n } from 'vue-i18n'

type Messages = Record<string, any>

const DEFAULT_LANG = localStorage.getItem('lang') || 'zh-cn'

// 动态导入所有 src/lang 下的语言文件
const modules = import.meta.glob('../lang/**/*.ts', { eager: false })

function isObj(v: any) {
    return v && typeof v === 'object' && !Array.isArray(v)
}

function mergeMessage(target: Messages, source: Messages) {
    Object.keys(source).forEach((key) => {
        const sv = source[key]
        if (isObj(sv)) {
            if (!isObj(target[key])) target[key] = {}
            mergeMessage(target[key], sv)
        } else {
            target[key] = sv
        }
    })
}

async function loadLocaleMessages(lang: string) {
    const messages: Messages = {}
    const imports = [] as Array<Promise<any>>

    Object.keys(modules).forEach((path) => {
        // path like ../lang/zh-cn/user.ts
        if (path.includes(`/${lang}/`)) {
            imports.push(modules[path]())
        }
    })

    const mods = await Promise.all(imports)
    mods.forEach((m) => {
        const res = m.default || m
        mergeMessage(messages, res)
    })

    return messages
}

const i18n = createI18n({
    legacy: false,
    locale: DEFAULT_LANG,
    fallbackLocale: 'en',
    messages: { [DEFAULT_LANG]: {} }
})

async function setI18nLanguage(lang: string) {
    const msgs = await loadLocaleMessages(lang)
    // @ts-ignore
    i18n.global.setLocaleMessage(lang, msgs)
    i18n.global.locale.value = lang
    localStorage.setItem('lang', lang)
    // 如果注册了第三方组件库的语言切换处理函数，则调用它
    try {
        if (localeHandler) await localeHandler(lang)
    } catch (e) {
        // ignore
    }
    return lang
}

let localeHandler: ((lang: string) => Promise<void>) | null = null

function registerLocaleHandler(fn: (lang: string) => Promise<void>) {
    localeHandler = fn
}

export { i18n, setI18nLanguage, loadLocaleMessages, registerLocaleHandler }
