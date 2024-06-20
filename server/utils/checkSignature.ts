import { camelCase } from 'lodash-es';
import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'
import { SiweMessage } from 'siwe'
import _ from 'lodash'

export const checkSignature = async event => {
  const { message, signature, appaddress } = await readBody(event)
  const adminClient = serverSupabaseServiceRole(event)
  const user = await serverSupabaseUser(event)

  const siweMessage = new SiweMessage(message)
  const validateRz = await siweMessage.validate(signature)
  const address = validateRz.address
  const chain = chainMapById[validateRz.chainId]
  const network = _.camelCase(chain.name)
  const { data, error } = await adminClient.from('nonce').select()
    .eq('address', address)
    .eq('network', network)
    .eq('appaddress', appaddress)
    .single()

  if (error)
    throw error

  if (validateRz.nonce !== data.nonce)
    throw new Error('Invalid nonce.')

  await adminClient.from('nonce')
    .delete()
    .eq('nonce', data.nonce)

  const name = _.get(user, 'user_metadata.user_name', '')
  const addressBindRz = await adminClient.from('addressBind').upsert({
    id: `${user.id}-${appaddress}`,
    network,
    userId: user?.id,
    address,
    name,
    appAddress: appaddress,
  })

  if (addressBindRz.error) {
    throw addressBindRz.error
  }

  return {
    ...validateRz,
    network,
    chain,
  }
}