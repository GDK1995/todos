<template>
  <div class="auth_form">
    <h4>Поздравляем! Вы успешно прошли регистрацию!</h4>
    <p>Необходимо пройти авторизацию</p>
    <router-link :to="{ name: 'login' }">
      Войти
    </router-link>
  </div>
</template>
