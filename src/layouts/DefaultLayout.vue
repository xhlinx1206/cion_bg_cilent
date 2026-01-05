<template>
    <div class="min-h-screen flex">
        <aside class="w-64 bg-white border-r">侧边栏</aside>
        <main class="flex-1 bg-gray-50">
            <slot />
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'DefaultLayout' })
</script>
