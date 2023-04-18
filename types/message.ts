export interface SocketMessage {
    to?: string // Send to single socket
    broadcastTo?: string[] | string // send to group of rooms
    join?: string | string[] // join these rooms
    leave?: string | string[] // leave these rooms
    message: unknown // Message can be anything
}
