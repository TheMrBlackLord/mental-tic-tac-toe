import dotenv from 'dotenv';
import express from 'express';
import expressWs from 'express-ws';
import { RedisClientType, createClient } from '@redis/client';
import { MessageTypes } from 'common';
import uniqueId from 'lodash/uniqueId';
import { WebSocketWithID } from './interfaces';
import { handlerFactory } from './handlers';
import { Message } from 'common';

dotenv.config();

const PORT = process.env.PORT || 5000;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const { app, getWss } = expressWs(express());
const redisClient: RedisClientType = createClient({
   url: REDIS_URL
});
redisClient.on('error', err => { throw err });

const { connectHandler } = handlerFactory(redisClient);

app.ws('/', (ws: WebSocketWithID) => {
   ws.id = uniqueId();
   ws.on('message', async (msg) => {
      const message: Message = JSON.parse(msg.toString());
      switch (message.type) {
         case MessageTypes.CONNECT:
            await connectHandler(message, ws.id);
            break;
      }
   });
});

bootstrap();

async function bootstrap() {
   app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
   await redisClient.connect();
   // redisClient.set('3', '234');
}
