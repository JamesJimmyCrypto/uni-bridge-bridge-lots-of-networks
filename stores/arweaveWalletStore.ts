export const arweaveWalletStore = defineStore('arweaveWalletStore', () => {
  let address = $(lsItemRef('arweave-address', ''))
  
  const doConnect = async () => {
    await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'ACCESS_ALL_ADDRESSES']);
  }

  const doDisconnect = async () => {
    await window.arweaveWallet.disconnect();
  }

  const getActiveAddress = async () => {
    await doConnect()
    address = await window.arweaveWallet.getActiveAddress()
  } 

  return $$({ doConnect, doDisconnect, getActiveAddress, address })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(arweaveWalletStore, import.meta.hot))
