import { Bytes, log, JSONValue, JSONValueKind, TypedMap, json, ByteArray } from "@graphprotocol/graph-ts"

class JsonStringResult {
    data: string;
    error: string;
}
class JsonResult {
    object: TypedMap<string, JSONValue>;
    error: string;
}

export namespace parser {
    export function getResultFromJson(content: string): JsonResult {
        let result: JsonResult
        result.error = "none"
        let jsonResult = json.try_fromBytes(
            ByteArray.fromUTF8(content) as Bytes
        )
        if (jsonResult.isError) {
            result.error = "Failed to parse JSON"
            return result
        }
        result.object = jsonResult.value.toObject()
        return result
    }
    export function getStringFromJson(
        object: TypedMap<string, JSONValue>,
        key: string
    ): JsonStringResult {
        let result: JsonStringResult
        result.error = "none"
        let value = object.get(key)
        if (value.kind != JSONValueKind.STRING) {
            result.error = "Missing valid Poster field: " + key
            return result
        }
        result.data = value.toString()
        return result
    }
}