import AxiosMockAdapter from 'axios-mock-adapter';
import { http } from './httpClient';
import { v4 as uuid } from 'uuid';
import type { Location } from '@/types';

export function installMocks() {
    const mock = new AxiosMockAdapter(http, { delayResponse: Math.round(Math.random() * 500) });
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

    const mockLocations: Location[] = [
        {
            id: 'forest',
            name: 'Таинственный лес',
            description: 'Темный лес, полный загадок',
            monsters: [
                {
                    id: 'goblin',
                    name: 'Гоблин',
                    health: 30,
                    attack: 5,
                    picture: '/images/monsters/goblin.png',
                },
                {
                    id: 'big-goblin',
                    name: 'Большой гоблин',
                    health: 50,
                    attack: 7,
                    picture: '/images/monsters/big-goblin.png',
                },
            ],
            npcs: [
                {
                    id: 'sage',
                    name: 'Мудрец',
                    picture: '/images/npc/sage.png',
                    dialogue: ['Приветствую, герой.'],
                },
            ],
        },
        {
            id: 'village',
            name: 'Деревня',
            description: 'Мирное место',
            monsters: [],
            npcs: [
                {
                    id: 'villager',
                    name: 'Житель',
                    picture: '/images/npc/villager.png',
                    dialogue: ['Привет!'],
                },
            ],
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

    mock.onGet('/auth/user-profile').reply(({ headers }) => {
        const authHeader = headers?.Authorization || headers?.authorization;
        const token = authHeader?.replace(/Bearer\s+/i, '') ?? '';
        const user = mockUsers.find(u => `fake.${u.id}.token` === token);
        if (!user) return [401, { message: 'Unauthorized' }];
        const { id, email, name } = user;
        return [200, { profile: { id, email, name } }];
    });

    mock.onGet('/locations').reply(200, { locations: mockLocations });

    mock.onGet(/\/locations\/[^/]+/).reply(config => {
        const id = config.url?.split('/').pop() || '';
        const location = mockLocations.find(l => l.id === id);
        return location ? [200, { location }] : [404, { message: 'Not found' }];
    });
}
