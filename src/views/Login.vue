<template>
    <div class="login-bg min-h-screen flex items-center justify-center">
        <div class="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
            <div
                class="h-36 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 relative flex items-center justify-center">
                <div class="absolute -bottom-12">
                    <div class="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md">
                        <svg class="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" fill="#cbd5e1" />
                            <path d="M4 20a8 8 0 0116 0" fill="#e2e8f0" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="px-8 pt-16 pb-8">
                <h2 class="text-center text-2xl font-medium mb-4">{{ t('login.title') }}</h2>
                <form @submit.prevent="onSubmit">
                    <div class="mb-4">
                        <div class="flex items-center border rounded overflow-hidden">
                            <div class="px-3 text-gray-400">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" fill="#94a3b8" />
                                </svg>
                            </div>
                            <input v-model="username" class="flex-1 p-3 outline-none"
                                :placeholder="t('login.username')" />
                        </div>
                    </div>

                    <div class="mb-4">
                        <div class="flex items-center border rounded overflow-hidden">
                            <div class="px-3 text-gray-400">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="11" width="18" height="10" rx="2" fill="#94a3b8" />
                                    <path d="M7 11V8a5 5 0 0110 0v3" fill="#94a3b8" />
                                </svg>
                            </div>
                            <input v-model="password" type="password" class="flex-1 p-3 outline-none"
                                :placeholder="t('login.password')" />
                        </div>
                    </div>

                    <div class="flex items-center justify-between mb-4 text-sm text-gray-600">
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2" /> {{ t('keep_session') }}
                        </label>
                    </div>

                    <div class="mb-2 text-red-500 text-sm" v-if="error">{{ error }}</div>
                    <button :disabled="loading"
                        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full">
                        <span v-if="!loading">{{ t('login.submit') }}</span>
                        <span v-else>{{ t('login.logging') }}</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import { login } from '@/api/auth'

export default defineComponent({
    setup() {
        const username = ref('')
        const password = ref('')
        const router = useRouter()
        const userStore = useUserStore()
        const loading = ref(false)
        const error = ref('')

        const onSubmit = async () => {
            error.value = ''
            if (!username.value || !password.value) {
                error.value = '用户名和密码不能为空'
                return
            }
            loading.value = true
            try {
                const res = await login({ username: username.value, password: password.value })
                // 支持常见返回结构：{ token } 或 { data: { token } } 或 { accessToken }
                const data = res.data || {}
                const token = data.token || data.access_token || (data.data && data.data.token)
                if (!token) {
                    error.value = '登录成功，但未返回 token，请检查接口返回'
                    loading.value = false
                    return
                }
                userStore.setToken(token)
                localStorage.setItem('token', token)
                router.push('/dashboard')
            } catch (e: any) {
                error.value = e?.response?.data?.message || e.message || '登录失败'
            } finally {
                loading.value = false
            }
        }
        const { t } = useI18n()
        return { username, password, onSubmit, loading, error, t }
    }
})
</script>
