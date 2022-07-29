import { IConnectMessage, IGames, IPlayer } from "../interfaces";
import { WebSocket } from 'ws';
import _ from "lodash";
import { Chars } from "../types";

export function connectHandler(games: IGames, ws: WebSocket, msg: IConnectMessage) {
   if (games.hasOwnProperty(msg.room)) {
      const game = games[msg.room];
      if (game.players.length === 2) {
         ws.send(JSON.stringify({ type: 'error', message: 'Game is full' }));
         return;
      }
      const candidate = game.players.find(player => player.username === msg.username);
      if (candidate) {
         ws.send(
            JSON.stringify({ type: 'error', message: 'You already joined' })
         );
         return;
      }
      const player: IPlayer = {
         char: game.players[0].char === 'x' ? 'o' : 'x',
         username: msg.username,
         confirmed: false
      };
      game.players.push(player);
   } else {
      const player: IPlayer = {
         char: _.sample(['x', 'o']) as Chars,
         username: msg.username,
         confirmed: false
      };
      games[+msg.room] = {
         players: [player],
         fieldState: _.chunk(Array(9).fill(''), 3)
      };
   }
}
