import { defineStore } from 'pinia'
import http from './../store/api'
import type { TaskInfo } from '../store/types'

export const useTaskStore = defineStore('task', {
  state: () => {
    return {
      tasks: [] as TaskInfo[]
    }
  },
  actions: {
    async getTaskByGroupId(id: number) {
      const { data } = await http.get(`/task?group_id=${id}`)
      this.tasks = data
    }
  }
})