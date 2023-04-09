import express from 'express'
import healthcheckRoutes from './routes/healthcheck'
import { SERVER_PORT } from './routes/env'
import logger from './routes/logger'

const app = express()

healthcheckRoutes(app)

app.listen(SERVER_PORT, () => {
    logger.debug(`Server running on ${SERVER_PORT}`)
})
