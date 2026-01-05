<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-md p-6 bg-white rounded shadow">
            <h2 class="text-2xl mb-4">登录</h2>
            <form @submit.prevent="onSubmit">
                <div class="mb-3">
                    <input v-model="username" class="w-full border p-2 rounded" placeholder="用户名" />
                </div>
                <div class="mb-3">
                    <input v-model="password" type="password" class="w-full border p-2 rounded" placeholder="密码" />
                </div>
                <button class="w-full bg-blue-600 text-white p-2 rounded">登录</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

export default defineComponent({
    setup() {
        const username = ref('')
        const password = ref('')
        const router = useRouter()
        const userStore = useUserStore()
        const onSubmit = () => {
            // 简单示例：模拟登录，保存 token 到 Pinia 与 localStorage
            const fakeToken = 'demo-token'
            userStore.setToken(fakeToken)
            localStorage.setItem('token', fakeToken)
            router.push('/dashboard')
        }
        return { username, password, onSubmit }
    }
})
</script>
