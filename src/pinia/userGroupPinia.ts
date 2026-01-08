import { defineStore } from 'pinia'
import http from './../store/api'

export const useUserGroupStore = defineStore('userGroup', {
  state: () => {
    return {
    }
  },
  actions: {
    async addUserToGroup(payload: { userId: number[]; groupId: number }) {
      const { data } = await http.post('/user-group', payload)
      return data
    }
  }
})