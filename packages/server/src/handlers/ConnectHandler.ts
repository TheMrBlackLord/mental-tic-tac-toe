import { RedisClientType } from '@redis/client';
import { Char, IConnectMessage, IPlayer, IRoom, MessageTypes } from 'common';
import sample from 'lodash/sample';
import { SenderType } from '../messageSender';

export function connectHandler(redisClient: RedisClientType, messageSender: SenderType) {
   return async function (message: IConnectMessage, wsID: number) {
      const room: IRoom = JSON.parse(await redisClient.get(message.roomID) || 'null');
      let player: IPlayer;
      // room.players[0] is first player
      if (room) {
         if (room.players.length >= 2) {
            const payload = {
               type: MessageTypes.ERROR,
               message: 'Room is full',
            };
            return messageSender(wsID, payload);
         }
         const candidate = room.players.find(player => player.username === message.username);
         if (candidate) {
            const payload = {
               type: MessageTypes.ERROR,
               message: 'You already joined',
            };
            return messageSender(wsID, payload);
         }

         player = {
            username: message.username,
            char: room.players[0]?.char === 'x' ? 'o' : 'x',
            confirmed: false,
         };
         messageSender(room.wsIDs[0], { type: MessageTypes.OPPONENT_CONNECTED });
      } else {
         player = {
            username: message.username,
            char: sample(['x', 'o']) as Char,
            confirmed: false,
         };
         const newRoom: IRoom = {
            players: [player],
            wsIDs: [wsID],
            gameStarted: false,
            currentChar: null,
            field: [
               ['', '', ''],
               ['', '', ''],
               ['', '', '']
            ]
         };
         await redisClient.set(message.roomID, JSON.stringify(newRoom));
      }
      if (player) {
         const payload = {
            type: MessageTypes.CONNECTED,
            player
         }
         messageSender(wsID, payload);
         room.players.push(player);
         room.wsIDs.push(wsID);
      }
   };
}
