import { ref, onMounted } from 'vue';
import { createSwordCursor, createDialogCursor } from '@/utils/canvas/cursorCanvases';

export function useCursorMixin() {
    const swordCursor = ref('pointer');
    const dialogCursor = ref('pointer');

    onMounted(() => {
        swordCursor.value = `url(${createSwordCursor()}) 16 16, pointer`;
        dialogCursor.value = `url(${createDialogCursor()}) 16 16, pointer`;
    });

    return { swordCursor, dialogCursor };
}
