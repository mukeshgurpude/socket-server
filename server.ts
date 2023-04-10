import express from 'express'
import healthcheckRoutes from './routes/healthcheck'
import { SERVER_PORT } from './utils/env'
import logger from './utils/logger'
import config from './utils/config'

const app = express()

healthcheckRoutes(app)

app.listen(SERVER_PORT, () => {
    logger.debug(`${config.name} running on ${SERVER_PORT}`)
})
