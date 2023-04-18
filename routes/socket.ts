import type { Server } from 'http'
import { Server as WebSocketServer } from 'socket.io'
import logger from '../utils/logger'

export default function connectSocket(server: Server) {
    const io = new WebSocketServer(server)

    io.on('connection', (socket) => {
        logger.debug(`A user connected: ${socket.id}`)

        socket.on('disconnect', () => {
            logger.debug(`${socket.id} disconnected`)
        })
    })

    return io
}
