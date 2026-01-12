import { defineStore } from 'pinia'
import http from './../store/api'
import type { GroupInfo } from '../store/types'
import { useAuthStore } from './authPinia'

export const useGroupStore = defineStore('group', {
  state: () => {
    return {
      groups: [] as GroupInfo[],
      selectedGroupId: null as number | null,
      groupByUser: [] as GroupInfo[],
    }
  },
  getters: {
    selectedGroup(state) {
      return state.groupByUser.find(group => group.id === state.selectedGroupId) || null
    },
  },
  actions: {
    selectGroup(id: number) {
      this.selectedGroupId = id
    },

    unselectGroup() {
      this.selectedGroupId = null
    },

    async getGroups() {
      try {
        const { data } = await http.get('/group')
        this.groups = data
      } catch (e) {
        this.groups = []
        console.error('Failed to fetch groups:', e)
      }
    },

    async addGroup(payload: { name: string }) {
      const { data } = await http.post('/group', payload)
      return data
    },

    async deleteGroup() {
      const { data } = await http.delete('/group', { data: { delete_ids: [this.selectedGroupId] } })
      return data
    },

    async getGroupsByUserId() {
      this.groupByUser = []
      const authStore = useAuthStore() 
      const userId = authStore.user?.id
      if (!userId) {
        return
      }
      const { data } = await http.get(`/group?user_id=${userId}`)
      this.groupByUser = data
    },
  }
})