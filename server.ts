import { createServer } from 'http'
import app from './routes/app'
import { SERVER_PORT } from './utils/env'
import logger from './utils/logger'
import config from './utils/config'
import connectSocket from './routes/socket'

const server = createServer(app)

connectSocket(server)

server.listen(SERVER_PORT, () => {
    logger.debug(`${config.name} running on ${SERVER_PORT}`)
})
