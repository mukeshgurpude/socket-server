import { isString } from 'lodash'
import { SocketMessage } from '../types/message'

const STRING_OR_ARRAY_FIELDS: (keyof SocketMessage)[] = [ 'broadcastTo', 'join', 'leave' ]

/**
 * Transforms specific fields of a SocketMessage into an array format if they are strings.
 *
 * This function takes an incoming SocketMessage object and checks certain fields.
 * If the field is a string and is not 'message' or 'to', it converts that field's value
 * into an array containing that string.
 *
 * @param {SocketMessage} incomingMessage - The SocketMessage object to be transformed.
 * @returns {SocketMessage} The transformed SocketMessage object with specified fields as arrays.
 *
 * @example
 * const message = {
 *   message: "Hello",
 *   to: "User",
 *   from: "Sender"
 * };
 * const result = generifyMessage(message);
 * // result will be:
 * // {
 * //   message: "Hello",
 * //   to: "User",
 * //   from: ["Sender"]
 * // }
 *
 * @throws {TypeError} Throws an error if incomingMessage is not of type SocketMessage.
 */
export default function generifyMessage(incomingMessage: SocketMessage) {
    const parsedMessage: SocketMessage = incomingMessage

    STRING_OR_ARRAY_FIELDS
        .forEach(key => {
            if (key == 'message' || key == 'to') return

            if (isString(incomingMessage[key])) {
                parsedMessage[key] = [ incomingMessage[key] as string ]
            }
        })

    return parsedMessage
}
