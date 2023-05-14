import { readFileSync } from 'fs'
import { parse } from 'yaml'
import { ROUTES_CONFIG_PATH } from './env'
import { Config, defaults } from '../types/config'
import { ServerOptions } from 'socket.io'


const CONFIG_FILE = readFileSync(ROUTES_CONFIG_PATH, 'utf-8')

const config  = {
    ...defaults,
    ...parse(CONFIG_FILE) as Config
}

export const wsConfig: Partial<ServerOptions> = config.enableAdmin ? {
    cors: {
        origin: ['https://admin.socket.io'],
        credentials: true
    }
} : {}

export default config;
