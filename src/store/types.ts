export interface UserInfo {
  id: number
  username: string
  email: string
}

export interface LoginResponse {
  token: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface GroupInfo {
  id: number
  name: string
}

export interface TaskInfo {
  id: number
  name: string
  description: string | null
  group_id: number
  isDone: boolean
  deadline: string | null
}

export interface TaskAddInfo {
  name: string
  description: string | null
  group_id: number
  isDone: boolean
  deadline: string | null
}