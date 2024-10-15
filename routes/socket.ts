import { instrument } from '@socket.io/admin-ui'
import type { Server } from 'http'
import _ from 'lodash'
import { Server as WebSocketServer } from 'socket.io'
import { EventType } from '../types/event'
import { SocketMessage } from '../types/message'
import config, { wsConfig } from '../utils/config'
import generifyMessage from '../utils/generifyMessage'
import logger from '../utils/logger'

/**
 * Establishes a WebSocket connection to the specified server and sets up event handling for connected sockets.
 *
 * This function initializes a WebSocket server using the provided server instance. It configures the server based on the application settings, including enabling admin instrumentation and handling socket events such as connection, disconnection, and custom events defined in the configuration.
 *
 * @param {Server} server - The server instance to which the WebSocket server will be attached.
 * @throws {Error} Throws an error if the server is not valid or if there are issues initializing the WebSocket server.
 *
 * @returns {WebSocketServer} The initialized WebSocket server instance.
 *
 * @example
 * import connectSocket from './path/to/connectSocket';
 *
 * const server = createServer();
 * const io = connectSocket(server);
 *
 * io.on('connection', (socket) => {
 *     console.log('New client connected:', socket.id);
 * });
 */
export default function connectSocket(server: Server) {
    const io = new WebSocketServer(server, wsConfig)

    if (config.enableAdmin) {
        instrument(io, {
            auth: false
        })
    }

    io.on('connection', (socket) => {
        logger.debug(`A user connected: ${socket.id}`)

        if (config.joinOnConnection) {
            socket.join(config.joinOnConnection)
        }

        socket.on('disconnect', () => {
            logger.debug(`${socket.id} disconnected`)
        })

        config.events.forEach(event => {
            socket.on(event.name, (incomingMessage: SocketMessage) => {
                const message = generifyMessage(incomingMessage)

                if (message.join?.length) {
                    socket.join(message.join)
                }

                if (event.joinKey) {
                    const roomsToJoin : string[] = _.get(message, event.joinKey)
                    if (roomsToJoin && roomsToJoin.length > 0) {
                        socket.join(roomsToJoin)
                    }
                }

                (message.leave as string[])
                    ?.forEach(roomName => socket.leave(roomName))


                const rooms: string[] = []

                if (event.type == EventType.unicast) rooms.push(message.to)
                else if (message.broadcastTo) rooms.push(...message.broadcastTo)

                socket
                    // In case of no to or broadcastTo, event will be sent to all rooms where sender is joined
                    .to(rooms)
                    // send emitEvent or current event
                    .emit(event.emitEvent ?? event.name, message.message)
            })

            logger.debug(`Setup ${event.name}`)
        })
    })

    return io
}
