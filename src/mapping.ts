import { BigInt } from "@graphprotocol/graph-ts"
import { Poster, NewPost } from "../generated/Poster/Poster"
import { Account, Action, Post, Transaction } from "../generated/schema"

import { transactions, accounts } from "./utils"
import { actions } from "./utils/actions"


export function handleNewPost(event: NewPost): void {

  let tx = transactions.log(event) as Transaction
  let poster = accounts.getAccount(event.transaction.from) as Account
  let contentId = event.transaction.hash.toHexString().concat("-").concat(event.transactionLogIndex.toHexString())
  let action = actions.getAction(contentId, event.params.content) as Action
  let post = new Post(contentId) as Post

  post.poster = poster.id
  post.rawContent = event.params.content
  post.tx = tx.id
  post.action = action.id

  if (post.rawContent.length <= 300) {
    post.save();
  }
}
