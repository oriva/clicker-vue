import AxiosMockAdapter from 'axios-mock-adapter';
import { http } from './httpClient';
import { v4 as uuid } from 'uuid';

export function installMocks() {
    const mock = new AxiosMockAdapter(http, { delayResponse: 600 });
    const mockUsers: {
        id: string;
        email: string;
        password: string;
        name: string;
        token?: string;
    }[] = [
        {
            id: '1',
            email: 'test@test.ru',
            password: 'test',
            name: 'Тестовый Пользователь',
            token: 'fake.1.token',
        },
    ];

    mock.onPost('/auth/login').reply(({ data }) => {
        const { email, password } = JSON.parse(data);
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (!user)
            return [401, { error: { userMessage: 'Неверный логин или пароль', status: 401 } }];
        return [
            200,
            {
                accessToken: `fake.${user.id}.token`,
                profile: { id: user.id, email: user.email, name: user.name },
            },
        ];
    });

    mock.onPost('/auth/register').reply(({ data }) => {
        const { email, password, name } = JSON.parse(data);
        if (mockUsers.find(u => u.email === email))
            return [409, { message: 'User already exists' }];

        const id = uuid();
        mockUsers.push({ id, email, password, name });
        return [200, { accessToken: `fake.${id}.token`, profile: { id, email, name } }];
    });

    mock.onPost('/auth/user-profile').reply(({ data }) => {
        const { token } = JSON.parse(data);
        const user = mockUsers.find(u => `fake.${u.id}.token` === token);
        if (!user) return [401, { message: 'Unauthorized' }];
        const { id, email, name } = user;
        return [200, { profile: { id, email, name } }];
    });
}
