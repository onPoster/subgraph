
import { ByteArray, Bytes, json, log } from "@graphprotocol/graph-ts";
import { Action, Transaction } from "../../generated/schema";
import { constants } from "./constants";
import { parser } from "./parser";


export namespace actions {

    export function getAction(contentId: string, content: string): Action {
        let result = parser.getResultFromJson(content);
        if (result.error) {
            return createGenericAction(contentId, constants.INVALID_POST_TYPE)
        }
        let object = result.object;

        // L#20-27 Valid JSON objects will pass this, but trigger an error when
        // they are missing a JSON parameter that is then tried to be casted.
        let action = parser.getStringFromJson(object, "type")
        if (action == null || action.error != 'none') {
            log.error('Post with content ID {} errored on "type" parameter', [contentId])
            return createGenericAction(contentId, constants.UNSUPPORTED_POST_TYPE)
        }
        let actionType = action.data

        let text = parser.getStringFromJson(object, "type")
        if (text == null || text.error != 'none') {
            log.error('Post with content ID {} errored on "text" parameter', [contentId])
            return createGenericAction(contentId, constants.UNSUPPORTED_POST_TYPE)
        }
        let textContent = text.data

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