import { SocketEvent } from './event'

export interface Config {
    name: string
    enableAdmin: boolean
    events: SocketEvent[]
    joinOnConnection: string[]
}

export const defaults: Pick<Config, 'enableAdmin'> = {
    enableAdmin: false
}
