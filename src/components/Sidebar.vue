<template>
    <aside class="w-64 bg-white border-r p-4">
        <div class="flex flex-col items-start gap-4">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-cover bg-center"
                    style="background-image: url('https://i.pravatar.cc/100')"></div>
                <div>
                    <div class="font-semibold text-blue-600">CION</div>
                </div>
            </div>

            <nav class="mt-4 w-full">
                <ul class="space-y-2">
                    <li>
                        <router-link to="/dashboard"
                            class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
                            <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z"
                                    fill="currentColor" />
                            </svg>
                            <span>控制台</span>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue'


</script>
