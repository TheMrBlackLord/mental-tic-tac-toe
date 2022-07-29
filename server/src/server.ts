import dotenv from 'dotenv';
import express from 'express';
import expressWs from 'express-ws';
import { IConnectMessage, IDisconnectMessage, IGames, IMessage } from './interfaces';
import { connectHandler, disconnectHandler } from "./handlers";

dotenv.config();

const PORT = process.env.PORT || 5000;
const { app, getWss } = expressWs(express());
const GAMES: IGames = {};

app.ws('/', (ws, req) => {
   ws.on('message', (msg) => { 
      const message: IMessage = JSON.parse(msg.toString());
      switch (message.type) { 
         case 'connect':
            connectHandler(GAMES, ws, message as IConnectMessage);
            break;
         case 'disconnect':
            disconnectHandler(GAMES, ws, message as IDisconnectMessage);
            break;
      }
      ws.send(JSON.stringify(GAMES));
   })
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
