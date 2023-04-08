import { Application } from 'express'

export default function healthcheckRoutes(app: Application) {
    app.get("/healthcheck", (_, res) => {
        return res.send("ok")
    })
}
