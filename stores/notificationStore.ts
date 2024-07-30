export const notificationStore = defineStore('notificationStore', () => {
  const toast = useToast()
  const addSuccess = (title: string, description?: string) => {
    toast.add({ title, description, icon: 'heroicons:check-solid' })
  }
  
  const addError = (title: string, description?: string) => {
    toast.add({ title, description, icon: 'heroicons:x-mark-20-solid', color: 'red' })
  }
  const addWarning = (title: string, description?: string) => {
    toast.add({ title, description, icon: 'heroicons:exclamation-triangle', color: 'amber',   })
  }

  return $$({ addSuccess, addError, addWarning })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(notificationStore, import.meta.hot))
