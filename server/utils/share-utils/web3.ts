import { camelCase } from 'lodash-es';
import _ from 'lodash'

import { getAddress } from 'viem'

export const getContractInfo = (name, network = import.meta.env.VITE_NETWORK) => {
  network = _.camelCase(network)
  if (!CONTRACT_ADDRESS_MAP[network]) {
    const error = `====> network ${network} do not exists :`
    console.error(error)
    return {error}
  }

  const address = CONTRACT_ADDRESS_MAP[network][name] || `address on network ${network} for ${name} not exist`
  
  const abi = CHAIN_CONTRACT_ABI_MAP[name]
  return {
    address,
    abi,
  }
}

export const getContractAddress = (name, network = import.meta.env.VITE_NETWORK) => getContractInfo(name, network).address


export const getAddress0 = () => {
  const address0 = getAddress(
    "0x" +
      "a5cc3c03994db5b0d9a5eEdD10Cabab0813678ac"
        .split("")
        .map(() => {
          return "0";
        })
        .join("")
  )

  return address0
}
