import { IDisconnectMessage, IMessage } from "../interfaces";
import { IGames } from "../interfaces";
import { WebSocket } from "ws";

export function disconnectHandler(games: IGames, ws: WebSocket, msg: IDisconnectMessage) {
   if (games.hasOwnProperty(msg.room)) {
      const game = games[msg.room];
      game.players = game.players.filter(player => player.username !== msg.username);
      if (game.players.length === 0) { 
         delete games[msg.room];
      }
   }
}
