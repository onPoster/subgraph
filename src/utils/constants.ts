import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export namespace constants {
	export let BIGINT_ZERO = BigInt.fromI32(0)
	export let BIGINT_ONE = BigInt.fromI32(1)
	export let BIGDECIMAL_ZERO = new BigDecimal(constants.BIGINT_ZERO)
	export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
	export const BYTES32_ZERO = '0x0000000000000000000000000000000000000000000000000000000000000000'
	export const MICROBLOG_POST_TYPE = 'microblog'
	export const INVALID_POST_TYPE = 'invalid'
	export const UNSUPPORTED_POST_TYPE = 'unsupported'
}