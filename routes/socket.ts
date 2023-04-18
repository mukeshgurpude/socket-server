import type { Server } from 'http'
import { ServerOptions, Server as WebSocketServer } from 'socket.io'
import logger from '../utils/logger'
import config from '../utils/config'
import { instrument } from '@socket.io/admin-ui'

export default function connectSocket(server: Server) {
    // TODO: move to some constants file
    const wsConfig: Partial<ServerOptions> = config.enableAdmin ? {
        cors: {
            origin: ['https://admin.socket.io'],
            credentials: true
        }
    } : {}

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

        // TODO: add events as per configuration
    })

    return io
}
