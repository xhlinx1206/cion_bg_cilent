import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        token: ''
    }),
    actions: {
        setToken(t: string) {
            this.token = t
        }
    }
})
