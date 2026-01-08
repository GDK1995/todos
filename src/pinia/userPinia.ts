import { defineStore } from 'pinia'
import http from './../store/api'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
    }
  },
  actions: {
    async getAllUsers() {
      const { data } = await http.get('/user')
      return data
    }
  }
})