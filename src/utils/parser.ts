import { Bytes, log } from "@graphprotocol/graph-ts"

export namespace parser {
    export function stringToBytes(str: string): Bytes {
        let codePoints = new Bytes(str.length)
        for (let i = 0; i < str.length; i++) {
            codePoints[i] = str.codePointAt(i)
        }
        log.info(
            "string and bytes-to-string: {} {}",
            [
                str,
                codePoints.toString()
            ]
        )
        return codePoints
    }
}