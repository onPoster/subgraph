
import { Address } from "@graphprotocol/graph-ts";
import { Account } from "../../generated/schema";


export namespace accounts {

  export function getAccount(address: Address): Account {
    let account = Account.load(address.toHexString());

    if (account == null) {
      account = new Account(address.toHexString());
      account.save();
    }

    return account as Account;
  }
}