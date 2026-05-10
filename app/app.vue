<template>
  <div class="min-h-screen bg-bg text-text">
    <TopBar />
    <main :class="{ 'main-with-chat': marginApplied }">
      <NuxtPage />
    </main>
    <ChatComponent />
  </div>
</template>

<script setup lang="ts">
const { isExpanded: chatExpanded } = useChat()
</script>

<style scoped>
.main-with-chat {
  margin-right: 25vw;
  transition: margin-right 0.3s ease;
}
</style>
