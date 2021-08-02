import {
	ethereum,
} from '@graphprotocol/graph-ts'

import { getAccount } from './accounts'

import {
	Transaction,
} from '../../generated/schema'

export namespace transactions {
	export function log(event: ethereum.Event): Transaction {
		let tx = new Transaction(event.transaction.hash.toHex())

		let account = getAccount(event.transaction.from);

		tx.timestamp   = event.block.timestamp
		tx.blockNumber = event.block.number
		tx.from = account.id
		tx.value = event.transaction.value

		tx.save()
		return tx as Transaction
	}
	export type Tx = Transaction
}
