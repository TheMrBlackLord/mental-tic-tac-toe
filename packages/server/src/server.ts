import { createClient, RedisClientType } from '@redis/client';
import { Message, MessageTypes } from 'common';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import uniqueId from 'lodash/uniqueId';
import { Server, WebSocket } from 'ws';
import { handlerFactory } from './handlers';
import { senderFactory } from './messageSender';

dotenv.config();

const PORT = process.env.PORT || 5000;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const server = createServer(express());
const wss = new Server({ server });
const redisClient: RedisClientType = createClient({
   url: REDIS_URL
});
redisClient.on('error', err => { throw err });

const messageSender = senderFactory(wss.clients);
const { connectHandler } = handlerFactory(redisClient, messageSender);

wss.on('connection', (ws: WebSocket) => {
   ws.id = +uniqueId();
   ws.on('message', async msg => {
      const message: Message = JSON.parse(msg.toString());
      switch (message.type) {
         case MessageTypes.CONNECT:
            await connectHandler(message, ws.id);
            break;
         
         default:
            const payload = {
               type: MessageTypes.ERROR,
               message: 'Invalid message type'
            }
            ws.send(JSON.stringify(payload));
            break;
      }
   });
});

bootstrap();

async function bootstrap() {
   server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
   await redisClient.connect();
   // redisClient.set('3', '234');
}
