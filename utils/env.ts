import { config } from 'dotenv'

config()

export const SERVER_PORT = process.env.PORT ?? 8000
export const ROUTES_CONFIG_PATH = 'configs/' + (process.env.ROUTES_CONFIG_PATH ?? 'local.yml')
