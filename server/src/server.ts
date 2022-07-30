import dotenv from 'dotenv';
import express from 'express';
import expressWs from 'express-ws';
import { WebSocket } from 'ws';
import { IConnectMessage, IDisconnectMessage, IConfirmMessage, IGames, IMessage } from './interfaces';
import { connectHandler, disconnectHandler, confirmHandler } from "./handlers";

dotenv.config();

const PORT = process.env.PORT || 5000;
const { app, getWss } = expressWs(express());
const GAMES: IGames = {};
const WSMap: Map<string, WebSocket> = new Map();

app.ws('/', (ws) => {
   ws.on('message', (msg) => { 
      const message: IMessage = JSON.parse(msg.toString());
      switch (message.type) { 
         case 'connect':
            WSMap.set((message as IConnectMessage).username, ws);
            connectHandler(GAMES, ws, message as IConnectMessage, WSMap);
            break;
         case 'disconnect':
            disconnectHandler(GAMES, ws, message as IDisconnectMessage, WSMap);
            WSMap.delete((message as IDisconnectMessage).username);
            break;
         case 'confirm':
            confirmHandler(GAMES, ws, message as IConfirmMessage, WSMap);
            break;
      }
      ws.send(JSON.stringify(GAMES));
   })
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
