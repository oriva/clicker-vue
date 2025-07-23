import MockAdapter from 'axios-mock-adapter';
import { http } from './httpClient';

export function installMocks() {
    const mock = new MockAdapter(http, { delayResponse: 600 });
}
