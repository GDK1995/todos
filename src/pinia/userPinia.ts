import { defineStore } from 'pinia'
import http from './../store/api'
import type { UserInfo } from '../store/types' 

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      users: [] as UserInfo[],
      selectedUser: null as UserInfo | null
    }
  },
  actions: {
    async getAllUsers() {
      const { data } = await http.get('/user')
      this.users = data
      return data
    },

    async getUserById(id: number) {
      const { data } = await http.get(`/user?user_id=${id}`)
      this.selectedUser = data
    },
  }
})