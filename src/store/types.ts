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