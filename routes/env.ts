import { config } from 'dotenv'

config()

export const SERVER_PORT = process.env.PORT ?? 8000
