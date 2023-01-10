import { RedisClientType } from '@redis/client';
import sample from 'lodash/sample';

import { Char, IConnectMessage, IPlayer, IRoom, MessageTypes } from 'common';

export function connectHandler(client: RedisClientType) {
   return async function (message: IConnectMessage, wsID: string) {
      const room: IRoom = JSON.parse(await client.get(message.roomID) || '');
      let player: IPlayer;
      if (room) {
         if (room.players.length === 2) {
            return {
               type: MessageTypes.ERROR,
               message: 'Room is full'
            };
         }
         const candidate = room.players.find(player => player?.username === message.username);
         if (candidate) {
            return {
               type: MessageTypes.ERROR,
               message: 'You already joined'
            };
         }

         player = {
            username: message.username,
            char: room.players[0]?.char === 'x' ? 'o' : 'x',
            confirmed: false,
         };
         room.players.push(player);
         room.wsIDs.push(wsID);
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
      }
   };
}
