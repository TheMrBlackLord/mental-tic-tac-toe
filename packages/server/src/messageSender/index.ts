import { IMessageToClient } from "common";
import { WebSocket } from 'ws';
import { findSocketById } from "./wsFinder";

export function senderFactory(clients: Set<WebSocket>) {
   const sockets = Array.from(clients);
   return function (wsID: number, payload: IMessageToClient): void {
      const socket = findSocketById(sockets, wsID);
      if (socket) {
         socket.send(JSON.stringify(payload));
      }
   };
}

export type SenderType = ReturnType<typeof senderFactory>;
