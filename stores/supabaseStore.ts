import { NFTStorage } from 'nft.storage'

export const supabaseStore = defineStore('supabaseStore', () => {
  const { addSuccess, addError} = $(notificationStore())
  const supabase = useSupabaseClient()
  const user = $(useSupabaseUser())
  const userId = $computed(() => user?.id || '')
  // console.log(`====> userId :`, userId)
  const metadata = $computed(() => user?.user_metadata || {})
  const avatar = $computed(() => {
    if (metadata.avatar_url) {
      return metadata.avatar_url.replace('_normal', '')
    }
    
    return '/favicon.ico'
  }) 
  const name = $computed(() => metadata.user_name || '') 
  const fullName = $computed(() => metadata.full_name || '') 
  const email = $computed(() => metadata.email || '') 

  const shareLink = $computed(() => `${location.origin}${location.pathname}?ref=${userId}`)

  const { auth } = useSupabaseClient()
  const isLogin = $computed(() => user?.id || false)

  const getFileUrl = cid => supabase.storage.from('file').getPublicUrl(cid.replace('ipfs://', ''))
  const doUpload = async (content) => {
    if (content.startsWith && content.startsWith('http')) {
      content = await fetch(content).then(r => r.blob())
    }
    // https://supabase.com/docs/guides/storage/uploads/standard-uploads
    if (!(content instanceof Blob)) {
      content = new Blob([JSON.stringify(content)], {
        type: 'application/json',
      })
    }

    let { cid } = await NFTStorage.encodeBlob(content)
    cid = cid.toString()

    const { error } = await supabase.storage.from('file').upload(cid, content)
    if (error && error.error!== 'Duplicate') {
      console.log('====> error :', error)
      throw new Error(error.message)
    }

    const url = getFileUrl(cid)
    return { cid: `ipfs://${cid}`, url }
  }

  const getJson = async (cid) => {
    if (!cid)
      return false
    if (!(cid.startsWith('ipfs://') || cid.startsWith('http')))
      cid = `ipfs://${cid}`

    let data = getLsItem(cid, false)

    if (data)
      return data
    const { data: { publicUrl } } = getFileUrl(cid)
    const response = await fetch(publicUrl)
    data = await response.json()
    setLsItem(cid, data)
    return data
  }

  const doSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    removeLsItem('privateKey')
    if (error) {
      // 
      addError(error)
    } else {
      addSuccess('Sign Out Succeed!')
    }
  }

  const updateUserRef = async () => {
    const ref = getLsItem('ref')
    const hasSaveRef = getLsItem('hasSaveRef', 'no')
    if (hasSaveRef !== 'yes' && ref) {
      await useFetch('/api/airdrop/updateRef', {
        headers: useRequestHeaders(['cookie']),
        method: 'POST',
        body: {
          ref,
        },
      })
      setLsItem('hasSaveRef', 'yes')
    }
  }

  return $$({ shareLink, supabase, doUpload, user, fullName, userId, doSignOut, metadata, auth, getJson, isLogin, avatar, name, email, getFileUrl, updateUserRef})
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(supabaseStore, import.meta.hot))
