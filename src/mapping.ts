import { BigInt } from "@graphprotocol/graph-ts"
import { Poster, NewPost } from "../generated/Poster/Poster"
import { Post } from "../generated/schema"

import * as utils from "./utils"

export function handleNewPost(event: NewPost): void {

  let tx = utils.transactions.log(event)
  let poster = utils.accounts.getAccount(event.transaction.from);

  let post = new Post(event.transaction.hash.toHexString().concat("-").concat(event.transactionLogIndex.toHexString()))

  post.poster = poster.id
  post.content = event.params.content
  post.tx = tx.id

  post.save();

}
