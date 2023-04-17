export interface SocketEvent {
    name: string;
    type: EventType;
}

enum EventType {
    unicast, broadcast
}
