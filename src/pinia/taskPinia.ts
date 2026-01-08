import { defineStore } from 'pinia'
import http from './../store/api'

export const useTaskStore = defineStore('task', {
  state: () => {
    return {
    }
  },
  actions: {
    async getTaskByGroupId(id: number) {
      const { data } = await http.get(`/task?group_id=${id}`)
      return data
    }
  }
})