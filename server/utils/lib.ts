import ld from 'lodash'
export const _ = ld
export { $fetch } from 'ofetch'

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};