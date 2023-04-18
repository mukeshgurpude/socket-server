import { createServer } from 'http'
import app from './routes/app'
import { SERVER_PORT } from './utils/env'
import logger from './utils/logger'
import config from './utils/config'

const server = createServer(app)

server.listen(SERVER_PORT, () => {
    logger.debug(`${config.name} running on ${SERVER_PORT}`)
})
