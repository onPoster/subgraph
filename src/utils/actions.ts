
import { json } from "@graphprotocol/graph-ts";
import { Action, Transaction } from "../../generated/schema";
import { constants } from "./constants";
import { parser } from "./parser";


export namespace actions {

    export function getAction(contentId: string, content: string): Action {
        let bytes = parser.stringToBytes(content)
        let result = json.try_fromBytes(bytes)
        if (result.isError) {
            return createGenericAction(contentId, constants.INVALID_POST_TYPE)
        }
        let object = result.value.toObject()

        let action = object.get("type")
        let actionType = action.toString()

        let text = object.get("text")
        let textContent = text.toString()


        if (actionType == constants.MICROBLOG_POST_TYPE) {
            let replyTo = object.get("replyTo")
            let image = object.get("image")
            if (replyTo != null) {
                let replyToTransactionId = replyTo.toString()
                let tx = Transaction.load(replyToTransactionId)
                if (tx != null) {
                    return createReplyToAction(contentId, textContent, replyToTransactionId, constants.MICROBLOG_POST_TYPE)
                }
            }
            // @TODO For now replies are not able to have images.
            if (image != null) {
                let ipfsHash = image.toString()
                if (ipfsHash != null) {
                    return createNewPostWithImage(contentId, textContent, ipfsHash, constants.MICROBLOG_POST_TYPE)
                }
            }
            return createTextAction(contentId, textContent, constants.MICROBLOG_POST_TYPE)
        }

        return createGenericAction(contentId, constants.UNSUPPORTED_POST_TYPE)
    }

    export function createTextAction(contentId: string, text: string, type: string): Action {
        let action = new Action(contentId)
        action.type = type
        action.text = text
        action.save()
        return action as Action;
    }

    export function createReplyToAction(contentId: string, text: string, transaction: string, type: string): Action {
        let action = new Action(contentId)
        action.type = type
        action.text = text
        action.replyTo = transaction
        action.save()
        return action as Action;
    }

    export function createNewPostWithImage(contentId: string, text: string, image: string, type: string): Action {
        let action = new Action(contentId)
        action.type = type
        action.text = text
        action.image = image
        action.save()
        return action as Action;
    }

    export function createGenericAction(contentId: string, type: string): Action {
        let action = new Action(contentId)
        action.type = type
        action.save()
        return action as Action;
    }
}