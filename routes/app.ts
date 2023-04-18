import express from 'express'
import healthcheckRoutes from './healthcheck'


const app = express()

healthcheckRoutes(app)

export default app
