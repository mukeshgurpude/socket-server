import type { Server } from 'http'
import { BroadcastOperator, ServerOptions, Server as WebSocketServer } from 'socket.io'
import logger from '../utils/logger'
import config, { wsConfig } from '../utils/config'
import { EventType } from '../types/event'
import { instrument } from '@socket.io/admin-ui'
import { SocketMessage } from '../types/message'
import generifyMessage from '../utils/generifyMessage'
import { DecorateAcknowledgementsWithMultipleResponses, DefaultEventsMap } from 'socket.io/dist/typed-events'

export default function connectSocket(server: Server) {
    const io = new WebSocketServer(server, wsConfig)

    if (config.enableAdmin) {
        instrument(io, {
            auth: false
        })
    }

    io.on('connection', (socket) => {
        logger.debug(`A user connected: ${socket.id}`)

        socket.on('disconnect', () => {
            logger.debug(`${socket.id} disconnected`)
        })

        config.events.forEach(event => {
            socket.on(event.name, (incomingMessage: SocketMessage) => {
                const message = generifyMessage(incomingMessage)

                if (message.join?.length) {
                    socket.join(message.join)
                }
                (message.leave as string[])
                    ?.forEach(roomName => socket.leave(roomName))

                const rooms: string[] = []

                if (event.type == EventType.unicast) rooms.push(message.to)
                else if (message.broadcastTo) rooms.push(...message.broadcastTo)

                let currentSocket: BroadcastOperator<DecorateAcknowledgementsWithMultipleResponses<DefaultEventsMap>, unknown> = null
                rooms.forEach(room => currentSocket = currentSocket == null ? socket.to(room) : currentSocket.to(room))

                currentSocket?.emit(event.emitEvent, message.message)
            })
        })
    })

    return io
}
