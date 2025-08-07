<script setup lang="ts">
    import LeftPanel from './LeftPanel.vue';
</script>

<template>
    <div class="app-container">
        <LeftPanel class="left-pane col-3" />
        <router-view class="col" />
    </div>
</template>
