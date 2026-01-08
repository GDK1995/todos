import axios from "axios"
import { useAuthStore } from './../pinia/authPinia'

const http = axios.create({
  baseURL: 'http://localhost:7070',
  withCredentials: true,
})

http.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

export default http
