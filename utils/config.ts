import { readFileSync } from 'fs'
import { parse } from 'yaml'
import { ROUTES_CONFIG_PATH } from './env'
import { Config, defaults } from '../types/config'


const CONFIG_FILE = readFileSync(ROUTES_CONFIG_PATH, 'utf-8')

export default {
    ...defaults,
    ...parse(CONFIG_FILE) as Config
}
