
import { json } from "@graphprotocol/graph-ts";
import { Action } from "../../generated/schema";
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


        if (actionType == constants.NEW_POST_TYPE) {
            return createTextAction(contentId, textContent, constants.NEW_POST_TYPE)
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

    export function createGenericAction(contentId: string, type: string): Action {
        let action = new Action(contentId)
        action.type = type
        action.save()
        return action as Action;
    }
}