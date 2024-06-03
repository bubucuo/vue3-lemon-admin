<template>

    <p>商品详情</p>

    <ZComponent :themeProps="themeProps" />
</template>

<script setup>
import ZComponent from '../../components/ZComponent.vue'

defineProps(['themeProps'])
</script>