<script setup>
// TODO: convertir a typescript
import { io } from 'socket.io-client';
import { onBeforeMount, ref } from 'vue';

const socket = io('http://localhost:3001');

const messages = ref([]);
const messageText = ref('');
const joined = ref(false);
const name = ref('');
const typingDisplay = ref('');

onBeforeMount(() => {
  socket.emit('findAllMessages', {}, (response) => {
    console.log(typeof response)
    messages.value = response;
  });

  socket.on('message', (message) => {
    messages.value.push(message);
  });
});

const join = () => {
  socket.emit('join', { name: name.value }, () => {
    joined.value = true;
  });
};

const sendMessage = () => {
  socket.emit('createMessage', { text: messageText.value }, () => {
    messageText.value = '';
  });
};

let timeout;
const emitTyping = () => {
  socket.emit('typing', {isTyping: true});
  timeout = setTimeout(() => {
    socket.emit('typing', {isTyping:false});
  }, 2000);
};
</script>

<template>
  <div class="chat">
    <div class="chat-container">
      <div class="messages-container">
        <div v-for="message in messages" :key="message.id">
          [{{ message.name }}]: {{ message.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './assets/base.css';
</style>
