import type { Server } from 'http'
import { BroadcastOperator, ServerOptions, Server as WebSocketServer } from 'socket.io'
import logger from '../utils/logger'
import config, { wsConfig } from '../utils/config'
import { EventType } from '../types/event'
import { instrument } from '@socket.io/admin-ui'
import { SocketMessage } from '../types/message'
import generifyMessage from '../utils/generifyMessage'
import { DecorateAcknowledgementsWithMultipleResponses, DefaultEventsMap } from 'socket.io/dist/typed-events'
import _ from 'lodash'

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
