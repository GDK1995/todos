import { defineStore } from 'pinia'
import http from './../store/api'
import type { GroupInfo } from '../store/types'

export const useGroupStore = defineStore('group', {
  state: () => {
    return {
      groups: [] as GroupInfo[],
      selectedGroupId: null as number | null
    }
  },
  getters: {
    selectedGroup(state) {
      return state.groups.find(group => group.id === state.selectedGroupId) || null
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
    }
  }
})