<template>
    <p>商品列表</p>

    <Detail :themeProps="theme" />

    <input type="text" v-model="theme.color">

</template>

<script setup>
import Detail from './Detail.vue'
import { ref, provide } from 'vue';

const theme = ref({
    color: 'green',
    fontSize: '16px'
})

provide('theme', theme)

</script>