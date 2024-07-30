import { createAvatar } from '@dicebear/core'
// import { botttsNeutral } from '@dicebear/collection'
import { bottts } from '@dicebear/collection';


export const dicebearStore = defineStore('dicebearStore', () => {
  let state = $ref({})
  onMounted(() => {
    const t = getLsItem('dicebearStore', false)
    if (t) {
      state = t
    }
  })
  const getAvatar = seed => {
    if (state[seed]) {
      return state[seed]
    }

    const avatar = createAvatar(bottts, {
      seed,
      size: 96,
      baseColor: ['00acc1','1e88e5','5e35b1'],
      backgroundColor: ['a3e635', '34d399', '2dd4bf', '38bdf8', '818cf8', 'fb7185'],
    })
    console.log(`====> avatar :`, avatar)
    state[seed] = avatar.toDataUri(); 
    setLsItem('dicebearStore', state)
    return state[seed]
  }

  return $$({ getAvatar })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(dicebearStore, import.meta.hot))
