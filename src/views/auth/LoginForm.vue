<script setup lang="ts">
    import { useQuasar, QForm, QBtn, QIntersection } from 'quasar';
    import axios from 'axios';
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';

    import { FormGroup } from 'src/components';
    import { useAuthStore } from '@/stores/auth';

    interface Emits {
        (e: 'toggle'): void;
    }

    interface Props {
        isRegistering: boolean;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();

    const router = useRouter();
    const $q = useQuasar();
    const auth = useAuthStore();

    const loginModel = reactive({
        username: '',
        password: '',
    });

    async function login() {
        try {
            await auth.login(loginModel.username, loginModel.password);
            router.push('/play');
        } catch (err: unknown) {
            let errorMessage = '';
            if (axios.isAxiosError(err) && err.response) {
                // err — это AxiosError, здесь уже можно безопасно обращаться к response
                console.error('Ошибка авторизации:', err.response);

                // Типизируйте тело ответа, чтобы избежать any
                type ErrorBody = { error?: { userMessage?: string } };
                const data = err.response.data as ErrorBody;

                errorMessage = data.error?.userMessage ?? 'Не удалось авторизоваться';
            } else {
                console.error('Неизвестная ошибка:', err);
                errorMessage = 'Не удалось авторизоваться';
            }

            $q.notify({
                type: 'negative',
                message: errorMessage,
                position: 'top',
                timeout: 4000,
            });
        }
    }
</script>

<template>
    <div class="left-pane flex-center column">
        <QIntersection v-if="props.isRegistering" transition="fade" key="registration">
            <div class="switch-link">
                <a href="#" @click.prevent="emit('toggle')">Авторизация</a>
            </div>
        </QIntersection>
        <QIntersection v-else transition="fade" key="login">
            <h1 class="title text-size-h2 text-shadow-strong mb-md">Добро пожаловать, путник</h1>
            <QForm class="login-form q-mx-auto" @submit.prevent="login">
                <FormGroup id="username" label="Email" v-model="loginModel.username" required />
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
</template>

<style scoped lang="scss">
    .left-pane {
        flex: 1;
    }

    .login-form {
        width: 100%;
        max-width: 400px;
    }

    .form-group {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;

        label {
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
        }

        input {
            padding: 0.5rem;
            font-size: 1rem;
            border: 2px solid #6b4f1d;
            background-color: #f9f1e7;
        }
    }

    .login-button {
        width: 100%;
        padding: 0.75rem;
        font-size: 1.2rem;
        border: 3px solid #6b4f1d;
        background-color: #d9b382;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #c49c6e;
        }
    }
</style>
