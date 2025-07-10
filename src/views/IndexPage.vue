<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function startGame() {
  router.push('/login')
}
</script>

<template>
  <div class="app-container row">
    <!-- Левая часть: приглашение начать -->
    <div class="col left-pane flex column flex-center">
      <h1 class="title text-center text-h2">Готовы ли вы к приключению?</h1>
      <button class="start-button" @click="startGame">Начать приключение</button>
    </div>

    <div class="col right-pane">
      <h2>О игре</h2>
      <p>
        В этой игре вы будете кликать, чтобы собирать драгоценные золоты и расширять своё
        королевство. Каждый клик приближает вас к величию!
      </p>
      <ul>
        <li>Зарабатывайте золото кликами</li>
        <li>Улучшайте здания</li>
        <li>Расширяйте свои владения</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  display: flex;
  height: 100vh;
  background: url('/images/parchment-bg.jpg') center center / cover no-repeat;
  font-family: 'Cinzel Decorative', serif;
  color: #3b2c02;
}

.left-pane,
.right-pane {
  padding: 2rem;
  background-color: rgba(255, 248, 230, 0.85);
  border: 4px solid #6b4f1d;
  box-shadow: inset 0 0 10px #6b4f1d;
}

.right-pane h2 {
  font-size: 2.5rem;
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

.title {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px #6b4f1d;
}

.start-button {
  font-size: 1.5rem;
  padding: 0.75rem 1.5rem;
  border: 3px solid #6b4f1d;
  background-color: #d9b382;
  cursor: pointer;
  font-family: inherit;
  text-shadow: 1px 1px #6b4f1d;
  transition: background-color 0.3s ease;
}

.start-button:hover {
  background-color: #c49c6e;
}
</style>
