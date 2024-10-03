import { ErrorRequestHandler, RequestHandler } from "express";
import logger from "../utils/logger";

/**
 * Middleware function that handles requests for routes that are not found.
 * It checks if the response headers have already been sent; if so, it calls the next middleware.
 * If the headers have not been sent, it logs an error message and responds with a 404 status code.
 *
 * @param {Request} req - The request object representing the HTTP request.
 * @param {Response} res - The response object used to send a response to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 *
 * @returns {void} This function does not return a value.
 *
 * @throws {Error} Throws an error if logging fails (if logger is not defined).
 *
 * @example
 * // Usage in an Express application
 * app.use(notFound);
 */
export const notFound: RequestHandler = (req, res, next) => {
    if (res.headersSent) {
        return next()
    }
    logger.error(`${req.method} ${req.path} Not found`)
    res.status(404).json({ message: `No ${req.method} handler for ${req.path}` })
}

/**
 * Middleware function for health check endpoint.
 *
 * This function responds with a status code of 200 and a message 'pong'.
 * It is typically used to verify that the server is running and responsive.
 *
 * @param {Request} _ - The request object (not used in this function).
 * @param {Response} res - The response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the stack.
 *
 * @returns {void} This function does not return a value.
 *
 * @example
 * // Example usage in an Express application:
 * app.get('/health', healthcheck);
 *
 * @throws {Error} If there is an issue with sending the response.
 */
export const healthcheck: RequestHandler = (_, res, next) =>  {
    res.status(200).send('pong')
    next()
}

/**
 * Middleware function that logs the HTTP response details.
 *
 * This function logs the HTTP method, request path, and response status code
 * whenever a request is processed. It is intended to be used as a middleware
 * in an Express.js application to help with monitoring and debugging.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 *
 * @returns {void} This function does not return a value.
 *
 * @example
 * // Usage in an Express application
 * app.use(responseLogger);
 *
 * @throws {Error} Throws an error if logging fails.
 */
export const responseLogger: RequestHandler = (req, res, next) => {
    logger.info(`${req.method} ${req.path} ${res.statusCode}`)
}

/**
 * Middleware function to handle errors in the application.
 * This function logs the error details and sends a JSON response
 * with the error message to the client if headers have not been sent.
 *
 * @param {Error} err - The error object that was thrown.
 * @param {Request} req - The request object representing the HTTP request.
 * @param {Response} res - The response object used to send a response to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 *
 * @returns {void} This function does not return a value.
 *
 * @throws {Error} Throws an error if logging fails (not handled in this function).
 *
 * @example
 * // Example usage in an Express application
 * app.use(errorHandler);
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    logger.error(`${req.method} ${req.path} 500 ${err.message}`)
    if (!res.headersSent)
        res.status(500).json({ error: err.message })
}
