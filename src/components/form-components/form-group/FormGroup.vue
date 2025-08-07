<script setup lang="ts">
    import { QInput } from 'quasar';
    import { useAttrs, computed } from 'vue';

    interface Props {
        id: string;
        modelValue: string | number;
        label?: string;
        required?: boolean;
        rules?: ((val: string | number) => boolean | string)[];
    }

    const { modelValue = '', required = false } = defineProps<Props>();

    interface Emits {
        (e: 'update:modelValue', v: Props['modelValue']): void;
    }

    const attrs = useAttrs();
    const emit = defineEmits<Emits>();

    const model = computed({
        get() {
            return modelValue;
        },
        set(v) {
            emit('update:modelValue', v);
        },
    });
</script>

<template>
    <div class="form-group">
        <label for="props.id" class="text-size-normal mb-xxs">{{ label }}</label>
        <QInput
            ref="inputComponent"
            id="props.id"
            no-error-icon
            v-bind="attrs"
            v-model="model"
            dense
            outlined
            lazy-rules
            :rules="rules"
            :required="required"
        />
    </div>
</template>

<style scoped lang="scss">
    .base-input {
        width: 100%;
        max-width: 400px;
        margin-bottom: 1rem;
    }

    :deep(.q-field__label) {
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }

    :deep(.q-field__control) {
        padding: 0;
    }

    :deep(.q-field__native) {
        padding: 0.5rem;
        font-size: 1rem;
        background-color: #f9f1e7;
        color: #3b2c02;
    }
</style>
