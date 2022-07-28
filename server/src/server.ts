import dotenv from 'dotenv';
import express from 'express';
import expressWs from 'express-ws';
import { IGame, IMessage } from './interfaces';

dotenv.config();

const PORT = process.env.PORT || 5000;
const { app, getWss } = expressWs(express());

const GAMES: IGame = {};

app.ws('/', (ws, req) => {
   ws.on('message', (msg) => { 
      const message: IMessage = JSON.parse(msg.toString());
      switch (message.type) { 
         case 'connect':
            console.log(message);
            break;
      }
   })
   ws.on('custom', (msg) => console.log(msg));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
