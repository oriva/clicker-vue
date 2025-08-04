<script setup lang="ts">
    import { ref } from 'vue';

    import LoginForm from './LoginForm.vue';

    const isRegistering = ref(false);

    function toggleRegister() {
        isRegistering.value = !isRegistering.value;
    }
</script>

<template>
    <div class="app-container">
        <LoginForm :is-registering="isRegistering" @toggle="toggleRegister" />

        <div class="right-pane flex-center column">
            <transition name="fade" mode="out-in">
                <div v-if="!isRegistering" class="switch-link" key="login">
                    <a href="#" @click.prevent="toggleRegister">Регистрация</a>
                </div>
                <div v-else key="registration">
                    <h2 class="text-size-h3 text-shadow">Защита королевства</h2>
                    <p>Авторизуйтесь, чтобы защищать свои владения и продолжить своё величие.</p>
                    <ul>
                        <li>Храните тайны в секрете</li>
                        <li>Берегите свой пароль</li>
                        <li>Используйте магические символы</li>
                    </ul>
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .right-pane {
        flex: 1;
    }

    .right-pane {
        h2 {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        p {
            margin-bottom: 1rem;
            line-height: 1.5;
        }
        ul {
            list-style: disc inside;
            padding-left: 0;
        }
    }

    .switch-link a {
        display: inline-block;
        padding: 0.5rem 1rem;
        font-size: 1.2rem;
        color: #fff;
        background-color: #6b4f1d;
        border: 2px solid #3b2c02;
        text-decoration: none;
        box-shadow: 2px 2px 0 #3b2c02;
        transition:
            background-color 0.3s ease,
            transform 0.1s ease;
    }

    .switch-link a:hover {
        background-color: #543b14;
        transform: translateY(-2px);
    }

    .switch-link a:active {
        transform: translateY(0);
        box-shadow: 1px 1px 0 #3b2c02;
    }
</style>
