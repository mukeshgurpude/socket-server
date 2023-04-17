import { SocketEvent } from './event'

export interface Room {
    name: string
    events: SocketEvent[]
}
