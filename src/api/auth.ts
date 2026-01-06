import axios from 'axios'

// Read Vite env variable in a safe way — some environments may not have import.meta available
function resolveBaseUrl() {
    try {
        // `import.meta.env` is provided by Vite in the browser during dev/build
        const env = (import.meta as any).env
        const val = env && env.VITE_API_BASE
        return val ? String(val) : 'http://127.0.0.1:4000'
    } catch (err) {
        return 'http://127.0.0.1:4000'
    }
}

const BASE_URL = resolveBaseUrl()

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export interface LoginParams {
    username: string
    password: string
}

export async function login(params: LoginParams) {
    return api.post('/admin/login', params)
}

export default api
