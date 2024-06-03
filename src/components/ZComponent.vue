<template>
    <p :style="[theme]">inject</p>
    <p :style="[themeProps]">props theme</p>
</template>


<script setup>

import { inject } from 'vue'




const theme = inject('theme')


defineProps(['themeProps'])

</script>