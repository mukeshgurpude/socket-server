import express from 'express'
import healthcheckRoutes from './routes/healthcheck'
import { SERVER_PORT } from './routes/env'

const app = express()

healthcheckRoutes(app)

app.listen(SERVER_PORT, () => {
    console.debug(`Server running on ${SERVER_PORT}`)
})
