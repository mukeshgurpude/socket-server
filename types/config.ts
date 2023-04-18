import { SocketEvent } from './event'

export interface Config {
    name: string
    enableAdmin: boolean
    events: SocketEvent[]
}

export const defaults: Pick<Config, 'enableAdmin'> = {
    enableAdmin: false
}
