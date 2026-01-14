import { defineStore } from 'pinia'
import type { UserInfo } from './../store/types.ts'
import http from './../store/api'

export const useAuthStore = defineStore('auth', {
  state: () => {
    let token: string | null = null
    let user: UserInfo | null = null

    const authString = localStorage.getItem("auth")
    if (authString) {
      try {
        const parsed = JSON.parse(authString) as { token?: string, user?: UserInfo }
        token = parsed.token ?? null
        user = parsed.user ?? null
      } catch (e) {
        token = null
        user = null
      }
    }
    return {
      user,
      token,
    }
  },
  actions: {
    async register(payload: { username: string; email: string; password: string }) {
      const res = await http.post('/auth', payload)
      return res.data
    },

    async login(payload: { email: string; password: string }) {
      const { data } = await http.post('/login', payload)
      this.token = data.token
      this.user = data.user
    },

    async update(username?: string, password?: string) {
      const payload = {
        id: this.user?.id,
        username,
        password
      }
      try {
        const { data } = await http.patch('/user/update', payload)
        this.user = data
      } catch (e) {
        console.error('Failed to update user:', e)
        throw e
      }      
    },

    async logout() {
      this.token = null
      this.user = null
      localStorage.clear()
    }
  },
  persist: {
    key: 'auth',
    storage: localStorage,
  }
})
