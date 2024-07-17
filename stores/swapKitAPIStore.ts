export const swapKitAPIStore = defineStore("swapKitAPIStore", () => {
  const headers = {
    "Referer": "UNI-Bridge",
    "x-api-key": "26c88c10-0b01-4ef1-afe1-60c2435da704"
  }
  const getSupportedChains = async () => {
    const { data } = $(await useGetRequest("https://api.thorswap.net/aggregator/chains", {}, headers));
    return data;
  };

  const getSupportedProviders = async () => {
    const { data } = $(await useGetRequest("https://api.thorswap.net/aggregator/providers/supportedProviders", {}, headers));
    return data;
  };

  const getQuote = async (sellAsset, buyAsset, sellAmount, senderAddress, recipientAddress) => {
    const { data } =  $(await useGetRequest("https://api.thorswap.net/aggregator/tokens/quote", {
        sellAsset,
        buyAsset,
        sellAmount,
        senderAddress,
        recipientAddress,
    }, headers))
    return data;
  };

  const getGasPrice = async (chainId) => {
    const {data} = $(await useGetRequest('https://api.thorswap.net/resource-worker/gasHistory/get', {
            chainId
    }, headers));
    return data;
  }
  
  return $$({ getSupportedChains, getSupportedProviders, getQuote, getGasPrice });
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(swapKitAPIStore, import.meta.hot));
