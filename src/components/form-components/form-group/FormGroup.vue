<script setup lang="ts">
    import { QInput } from 'quasar';
    import { useAttrs, computed } from 'vue';

    interface Props {
        id: string;
        modelValue: string;
        required?: boolean;
    }
    const props = withDefaults(defineProps<Props>(), {
        modelValue: '',
        required: false,
    });

    interface Emits {
        (e: 'update:modelValue', v: Props['modelValue']): void;
    }

    const attrs = useAttrs();
    const emit = defineEmits<Emits>();

    const model = computed({
        get() {
            return props.modelValue;
        },
        set(v) {
            emit('update:modelValue', v);
        },
    });
</script>

<template>
    <div class="form-group">
        <label for="props.id">Имя пользователя</label>
        <QInput
            ref="inputComponent"
            id="props.id"
            v-bind="attrs"
            v-model="model"
            :required="props.required"
        />
    </div>
</template>
