<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const username = ref('')
  const password = ref('')

  function login() {
    // Здесь будет логика аутентификации
    router.push({ name: 'Game' })
  }
</script>

<template>
  <div class="app-container">
    <div class="left-pane">
      <h1 class="title">Добро пожаловать, путник</h1>
      <form class="login-form" @submit.prevent="login">
        <div class="form-group">
          <label for="username">Имя пользователя</label>
          <input id="username" v-model="username" type="text" required />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input id="password" v-model="password" type="password" required />
        </div>
        <button class="login-button" type="submit">Войти</button>
      </form>
    </div>

    <div class="right-pane">
      <h2>Защита королевства</h2>
      <p>Авторизуйтесь, чтобы защищать свои владения и продолжить своё величие.</p>
      <ul>
        <li>Храните тайны в секрете</li>
        <li>Берегите свой пароль</li>
        <li>Используйте магические символы</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .app-container {
    display: flex;
    height: 100vh;
    background: url('/images/parchment-bg.jpg') center center / cover no-repeat;
    font-family: 'Cinzel Decorative', serif;
    color: #3b2c02;
  }

  .left-pane, .right-pane {
    flex: 1;
    padding: 2rem;
    background-color: rgba(255, 248, 230, 0.85);
    border: 4px solid #6b4f1d;
    box-shadow: inset 0 0 10px #6b4f1d;
  }

  .left-pane {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px #6b4f1d;
  }

  .login-form {
    width: 100%;
    max-width: 400px;
  }

  .form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .form-group input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 2px solid #6b4f1d;
    background-color: #f9f1e7;
  }

  .login-button {
    width: 100%;
    padding: 0.75rem;
    font-size: 1.2rem;
    border: 3px solid #6b4f1d;
    background-color: #d9b382;
    cursor: pointer;
    text-shadow: 1px 1px #6b4f1d;
    transition: background-color 0.3s ease;
  }

  .login-button:hover {
    background-color: #c49c6e;
  }

  .right-pane h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-shadow: 1px 1px #6b4f1d;
  }

  .right-pane p {
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  .right-pane ul {
    list-style: disc inside;
    padding-left: 0;
  }
</style>
