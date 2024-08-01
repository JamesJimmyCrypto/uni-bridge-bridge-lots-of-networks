export const swapKitAPIStore = defineStore("swapKitAPIStore", () => {
  const { addError } = $(notificationStore());

  const headers = {
    Referer: "UNI-Bridge",
    "x-api-key": "26c88c10-0b01-4ef1-afe1-60c2435da704",
  };
  const getSupportedChains = async () => {
    // const { data, error } = $(await useGetRequest("https://api.thorswap.net/aggregator/chains", {}, headers));
    // console.log(`====> data :`, data, error)
    // return data;
    return {
      ETH: "1",
      AVAX: "43114",
      THOR: "thorchain-mainnet-v1",
      BTC: "bitcoin",
      LTC: "litecoin",
      BNB: "Binance-Chain-Tigris",
      BSC: "56",
      BCH: "bitcoincash",
      GAIA: "cosmoshub-4",
      DOGE: "dogecoin",
    };
  };

  const getSupportedProviders = async () => {
    const { data } = $(await useGetRequest("https://api.thorswap.net/aggregator/providers/supportedProviders", {}, headers));
    return data;
  };

  const getQuote = async (sellAsset, buyAsset, sellAmount, senderAddress, recipientAddress) => {
    try {
      const data = await getRequest(
        "https://api.thorswap.net/aggregator/tokens/quote",
        {
          sellAsset,
          buyAsset,
          sellAmount,
          senderAddress,
          recipientAddress,
        },
        headers
      );
      return data;
    } catch (error) {
      console.log(`====> error :`, error)
      return {error: error?.data?.message}
    }
  };

  const getGasPrice = async (chainId) => {
    const { data } = $(
      await useGetRequest(
        "https://api.thorswap.net/resource-worker/gasHistory/get",
        {
          chainId,
        },
        headers
      )
    );
    return data;
  };

  return $$({ getSupportedChains, getSupportedProviders, getQuote, getGasPrice });
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(swapKitAPIStore, import.meta.hot));
