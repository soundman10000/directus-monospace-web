<template>
  <div class="chat-container">
    <div
      v-if="!isExpanded"
      class="minimized-chat"
      @click="toggleExpanded"
    >
      <img :src="aiIcon" alt="AI Chat" class="ai-icon" />
    </div>

    <Transition name="slide">
      <div v-if="isExpanded" class="expanded-chat">
        <div class="chat-header">
          <button @click="toggleExpanded" class="close-btn">×</button>
          <h3>AI Chat</h3>
        </div>
        <div class="chat-messages">
          <div class="message ai">Hello! How can I help you today?</div>
        </div>
        <div class="chat-input">
          <input v-model="message" @keyup.enter="sendMessage" placeholder="Type your message..." />
          <button @click="sendMessage">Send</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import aiIcon from '@@/app/assets/images/ai-icon-active.png'

const { isExpanded, toggleExpanded } = useChat()
const message = ref('')

const sendMessage = () => {
  if (message.value.trim()) {
    // TODO: Send message logic
    console.log('Sending:', message.value)
    message.value = ''
  }
}
</script>

<style scoped>
.chat-container {
  position: fixed;
  top: var(--top-bar-height);
  right: 0;
  z-index: 1000;
}

.minimized-chat {
  width: 120px; /* padding around icon */
  height: calc(100vh - var(--top-bar-height));
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-right: none;
  border-radius: 8px 0 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding-bottom: 20px;
}

.ai-icon {
  width: 64px;
  height: 64px;
  transition: transform 0.3s ease;
}

.ai-icon:hover {
  transform: rotate(360deg);
}

.expanded-chat {
  width: 25vw;
  height: 80vh;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-right: none;
  border-radius: 8px 0 0 8px;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 10px rgba(0,0,0,0.1);
}

.chat-header {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text);
}

.chat-messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.message {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
}

.message.ai {
  background-color: var(--color-bg-secondary);
  align-self: flex-start;
}

.chat-input {
  padding: 1rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  gap: 0.5rem;
}

.chat-input input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-bg);
  color: var(--color-text);
}

.chat-input button {
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>