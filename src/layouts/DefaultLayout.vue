<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <Topbar @toggle-menu="$emit('toggle-menu')" @toggle-full="$emit('toggle-full')" />

        <div class="flex flex-1">
            <Sidebar />

            <main class="flex-1 p-4">
                <slot />
            </main>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Topbar from '@/components/Topbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default defineComponent({
    name: 'DefaultLayout',
    components: { Topbar, Sidebar }
})
</script>
