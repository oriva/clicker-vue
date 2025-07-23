<script setup lang="ts">
    import { QForm, QBtn, QIntersection } from 'quasar';
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';

    import { FormGroup } from 'src/components';

    const router = useRouter();
    const isRegistering = ref(false);
    const loginModel = reactive({
        username: '',
        password: '',
    });

    function toggleRegister() {
        isRegistering.value = !isRegistering.value;
    }

    function login() {
        console.log('Авторизация:', loginModel.username, loginModel.password);
        router.push('/game');
    }
</script>

<template>
    <div class="app-container">
        <div class="left-pane flex-center column">
            <QIntersection v-if="isRegistering" transition="fade" key="registration">
                <div class="switch-link">
                    <a href="#" @click.prevent="toggleRegister">Авторизация</a>
                </div>
            </QIntersection>
            <QIntersection v-else transition="fade" key="login">
                <h1 class="title text-size-h2 text-shadow-strong mb-md"
                    >Добро пожаловать, путник</h1
                >
                <QForm class="login-form q-mx-auto" @submit.prevent="login">
                    <FormGroup
                        id="username"
                        label="Имя пользователя"
                        v-model="loginModel.username"
                        required
                    />
                    <FormGroup
                        id="password"
                        type="password"
                        label="Пароль"
                        v-model="loginModel.password"
                        required
                    />
                    <QBtn label="Войти" class="login-button text-shadow" type="submit" />
                </QForm>
            </QIntersection>
        </div>

        <div class="right-pane flex-center column">
            <transition name="fade" mode="out-in">
                <div v-if="!isRegistering" class="switch-link" key="login">
                    <a href="#" @click.prevent="toggleRegister">Регистрация</a>
                </div>
                <div v-else key="registration">
                    <h2 class="text-shadow">Защита королевства</h2>
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

<style scoped>
    .left-pane,
    .right-pane {
        flex: 1;
        padding: 2rem;
        background-color: rgba(255, 248, 230, 0.85);
        border: 4px solid #6b4f1d;
        box-shadow: inset 0 0 10px #6b4f1d;
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
        transition: background-color 0.3s ease;
    }

    .login-button:hover {
        background-color: #c49c6e;
    }

    .right-pane h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .right-pane p {
        margin-bottom: 1rem;
        line-height: 1.5;
    }

    .right-pane ul {
        list-style: disc inside;
        padding-left: 0;
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
