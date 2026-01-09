import { defineStore } from 'pinia'
import http from './../store/api'
import type { TaskInfo, TaskAddInfo } from '../store/types'

export const useTaskStore = defineStore('task', {
  state: () => {
    return {
      tasks: [] as TaskInfo[],
      selectedTaskId: null as number | null
    }
  },
  getters: {
    selectedTask(state) {
        return state.tasks.find(task => task.id === state.selectedTaskId) || null
    },
  },
  actions: {
    selectTask (id: number) {
      this.selectedTaskId = id
    },

    unselectTask () {
      this.selectedTaskId = null
    },

    async getTaskByGroupId(id: number) {
      this.tasks = []
      const { data } = await http.get(`/task?group_id=${id}`)
      this.tasks = data
    },

    async addTask(payload: TaskAddInfo) {
      try {
        const { data } = await http.post('/task', payload)
        return data
      } catch (e) {
        console.error('Failed to add task:', e)
        throw e
      }
    },

    async deleteTask() {
      try {
        const { data } = await http.delete(`/task?id=${this.selectedTaskId}`)
        return data
      } catch (e) {
        console.error('Failed to delete task:', e)
        throw e
      }
    },
  }
})