import type { Ref } from 'vue';

export type propsMaybeRef<T> = T | Ref<T>;
