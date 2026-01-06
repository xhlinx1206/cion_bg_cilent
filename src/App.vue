<template>
    <router-view v-slot="{ Component }">
        <DefaultLayout v-if="!isLogin">
            <component :is="Component" />
        </DefaultLayout>
        <component v-else :is="Component" />
    </router-view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

export default defineComponent({
    name: 'App',
    components: { DefaultLayout },
    setup() {
        const route = useRoute()
        const isLogin = computed(() => route.path === '/login')
        return { isLogin }
    }
})
</script>
