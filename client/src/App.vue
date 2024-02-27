<script setup lang="ts">
import { io } from 'socket.io-client';
import { onBeforeMount, ref } from 'vue';

const socket = io('http://localhost:3001');

const messages = ref([]);

onBeforeMount(() => {
  socket.emit('findAllMessages', {}, (response: any) => {
    messages.value = response;
  })
});
</script>

<template>
  <div class="chat"></div>
</template>

<style scoped>
@import './assets/base.css';
</style>
