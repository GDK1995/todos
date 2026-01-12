import { defineStore } from 'pinia'
import http from './../store/api'
import type { UserInfo } from '../store/types'
import { useGroupStore } from './groupPinia'

export const useUserGroupStore = defineStore('userGroup', {
  state: () => {
    return {
        groupUsers: [] as UserInfo[],
        groupUsersIds: [] as number[]
    }
  },
  actions: {
    async addUserToGroup(payload: { userId: number[]; groupId: number }) {
      const { data } = await http.post('/user-group', payload)
      return data
    },

    async deleteUserFromGroup(userId: number) {
      const payload = { user_id: userId, group_id: useGroupStore().selectedGroupId }
      const { data } = await http.delete('/user-group', { data: payload })
      return data
    },

    async getUserByGroupId() {
        this.groupUsers = []
        const groupStore = useGroupStore()
        const { data } = await http.get(`/user?group_id=${groupStore.selectedGroupId}`)
        this.groupUsers = data
    },

    async getUserIdsByGroupId() {
        this.groupUsersIds = []
        const groupStore = useGroupStore()
        const { data } = await http.get(`/user?id=${groupStore.selectedGroupId}`)
        this.groupUsersIds = data
    }
  }
})