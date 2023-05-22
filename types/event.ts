export interface SocketEvent {
    name: string;
    type: EventType;
    joinKey: string
    emitEvent?: string
}

export enum EventType {
    unicast, broadcast
}
