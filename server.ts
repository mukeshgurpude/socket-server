import express from 'express'
import healthcheckRoutes from './routes/healthcheck'
import { SERVER_PORT } from './utils/env'
import logger from './utils/logger'

const app = express()

healthcheckRoutes(app)

app.listen(SERVER_PORT, () => {
    logger.debug(`Server running on ${SERVER_PORT}`)
})
