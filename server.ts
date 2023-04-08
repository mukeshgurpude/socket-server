import express from 'express'
import healthcheckRoutes from './healthcheck'

const PORT = process.env.PORT ?? 8000
const app = express()

healthcheckRoutes(app)

app.listen(PORT, () => {
    console.debug(`Server running on ${PORT}`)
})
