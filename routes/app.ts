import express from 'express'
import { errorHandler, healthcheck, notFound, responseLogger } from './common'


const app = express()

app.get('/ping', healthcheck)
app.use(notFound, responseLogger, errorHandler)

export default app
