export const tplStore = defineStore('tplStore', () => {
  const items = $ref([
    {
      id: 334,
      score: 100,
    },
    {
      id: 223,
      score: 20,
    },
  ])

  return $$({ items })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(tplStore, import.meta.hot))
