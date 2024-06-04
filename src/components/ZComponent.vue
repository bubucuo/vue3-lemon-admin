<template>
    <div class="border">
        <h1>ZComponent</h1>

        <p :style="[theme]">inject</p>

        <p :style="[themeProps]">props theme</p>
    </div>

</template>


<script setup>

import { inject } from 'vue'

const theme = inject('theme')

defineProps(['themeProps'])

</script>

<style scoped>
.border {
    margin: 10px;
    padding: 10px;
    border: red 1px solid;
}
</style>