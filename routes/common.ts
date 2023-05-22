import { ErrorRequestHandler, RequestHandler } from "express";
import logger from "../utils/logger";

export const notFound: RequestHandler = (req, res, next) => {
    if (res.headersSent) {
        return next()
    }
    logger.error(`${req.method} ${req.path} Not found`)
    res.status(404).json({ message: `No ${req.method} handler for ${req.path}` })
}

export const healthcheck: RequestHandler = (_, res, next) =>  {
    res.status(200).send('pong')
    next()
}

/** Log response */
export const responseLogger: RequestHandler = (req, res, next) => {
    logger.info(`${req.method} ${req.path} ${res.statusCode}`)
}

/** Error Handler */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    logger.error(`${req.method} ${req.path} 500 ${err.message}`)
    if (!res.headersSent)
        res.status(500).json({ error: err.message })
}
