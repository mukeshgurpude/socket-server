export interface SocketEvent {
    name: string;
    type: EventType;
    emitEvent?: string
}

export enum EventType {
    unicast, broadcast
}
