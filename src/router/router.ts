import { createWebHistory, createRouter } from 'vue-router'

import AuthPage from './../view/AuthPage.vue'
import MainPage from './../view/MainPage.vue'
import LoginForm from './../components/auth/LoginForm.vue'
import RegisterForm from './../components/auth/RegisterForm.vue'
import AuthConfirm from './../components/auth/AuthConfirm.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthPage,
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginForm
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterForm
      },
      {
        path: 'confirm',
        name: 'confirm',
        component: AuthConfirm
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})