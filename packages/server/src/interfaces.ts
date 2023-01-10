import { WebSocket } from 'ws';

export interface WebSocketWithID extends WebSocket {
   id: string;
}
