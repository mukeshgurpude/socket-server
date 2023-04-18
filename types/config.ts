import { Room } from './room'

export interface Config {
    name: string
    enableAdmin: boolean
    rooms: Room[]
}

export const defaults: Pick<Config, 'enableAdmin'> = {
    enableAdmin: false
}
