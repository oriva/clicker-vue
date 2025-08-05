<script setup lang="ts">
    import LeftPanel from './LeftPanel.vue';
</script>

<template>
    <div class="app-container">
        <LeftPanel class="left-pane" />
    </div>
</template>

<style scoped lang="scss">
    .left-pane {
        min-width: 20%;
    }
</style>
