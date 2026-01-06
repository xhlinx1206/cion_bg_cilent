<template>
    <header class="h-14 bg-white border-b flex items-center justify-between px-4">
        <div class="flex items-center gap-3">
            <button class="p-2 rounded hover:bg-gray-100" aria-label="menu" @click="$emit('toggle-menu')">
                <svg class="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </button>
        </div>

        <div class="flex items-center gap-3">
            <!--切换语言-->
            <div class="relative topbar-lang">
                <button class="p-2 rounded hover:bg-gray-100" title="切换语言" @click="toggleLangMenu">
                    <svg class="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20" stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <div v-if="langMenu"
                    class="absolute right-0 mt-2 w-44 bg-white border rounded shadow-md z-20 overflow-hidden">
                    <ul>
                        <li v-for="l in languages" :key="l.code">
                            <button class="w-full flex items-center justify-between px-3 py-2 text-sm"
                                :class="locale === l.code ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-700'"
                                @click="changeLang(l.code)">
                                <span>{{ l.label }}</span>
                                <svg v-if="locale === l.code" class="w-4 h-4 text-blue-600" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- <button class="p-2 rounded hover:bg-gray-100" title="全屏" @click="$emit('toggle-full')">
                <svg class="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M16 21h3a2 2 0 002-2v-3"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button> -->

            <div class="w-px h-6 bg-gray-200 mx-2"></div>

            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center"><img
                        src="https://i.pravatar.cc/40" alt="avatar" /></div>
                <div class="text-sm">RAJAOKX</div>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { setI18nLanguage } from '@/i18n'

export default defineComponent({
    name: 'Topbar',
    emits: ['toggle-menu', 'toggle-full'],
    setup() {
        const langMenu = ref(false)
        const { locale } = useI18n()
        const languages = [
            { code: 'zh-cn', label: '中文简体' },
            { code: 'en', label: 'English' },
        ]

        const toggleLangMenu = (e?: Event) => {
            if (e) e.stopPropagation()
            langMenu.value = !langMenu.value
        }

        const changeLang = async (l: string) => {
            langMenu.value = false
            await setI18nLanguage(l)
        }

        const outsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (!target.closest('.topbar-lang')) langMenu.value = false
        }

        onMounted(() => window.addEventListener('click', outsideClick))
        onBeforeUnmount(() => window.removeEventListener('click', outsideClick))

        return {
            langMenu,
            toggleLangMenu,
            changeLang,
            languages,
            locale: (locale as any)
        }
    }
})
</script>
