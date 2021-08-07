import { BigInt } from "@graphprotocol/graph-ts"
import { Poster, NewPost } from "../generated/Poster/Poster"
import { Account, Post, Transaction } from "../generated/schema"

import { transactions, accounts } from "./utils"


export function handleNewPost(event: NewPost): void {

  let tx = transactions.log(event) as Transaction
  let poster = accounts.getAccount(event.transaction.from) as Account
  let post = new Post(event.transaction.hash.toHexString().concat("-").concat(event.transactionLogIndex.toHexString())) as Post

  post.poster = poster.id
  post.rawContent = event.params.content
  post.tx = tx.id

  if (post.rawContent.length <= 300) {
    post.save();
  }
}
