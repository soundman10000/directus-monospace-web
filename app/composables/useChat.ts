export const useChat = () => {
  const isExpanded = ref(false)

  const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value
  }

  return {
    isExpanded: readonly(isExpanded),
    toggleExpanded
  }
}