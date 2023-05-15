import { isString } from 'lodash'
import { SocketMessage } from '../types/message'

const STRING_OR_ARRAY_FIELDS: (keyof SocketMessage)[] = [ 'broadcastTo', 'join', 'leave' ]

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
