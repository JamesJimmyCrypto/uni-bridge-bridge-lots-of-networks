import _ from 'lodash'
import contractAddressMap from './contractAddressMap.json'

// import DiamondLoupeFacet from './abis/DiamondLoupeFacet.json'
// import OwnershipFacet from './abis/OwnershipFacet.json'
import UNIBridgeStaking from './abis/UNIBridgeStaking.json'

const allABIJsons = {
  // DiamondLoupeFacet,
  // OwnershipFacet,
  UNIBridgeStaking,
}
const allABIs = {}
_.map(allABIJsons, (val, key) => {
  key = key.replace('./abis/', '').replace('.json', '')
  allABIs[key] = val
})

export const CONTRACT_ADDRESS_MAP = contractAddressMap

export const CHAIN_CONTRACT_ABI_MAP = {
  ...allABIs,
}