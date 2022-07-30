import { IDisconnectMessage } from "../interfaces";
import { IGames } from "../interfaces";
import { WebSocket } from "ws";

export function disconnectHandler(
   games: IGames,
   ws: WebSocket,
   msg: IDisconnectMessage,
   WSMap: Map<string, WebSocket>
) {
   if (games.hasOwnProperty(msg.room)) {
      const game = games[msg.room];
      game.players = game.players.filter(
         (player) => player.username !== msg.username
      );
      if (game.players.length === 1) { 
         const opponentWS = WSMap.get(game.players[0].username) as WebSocket;
         opponentWS.send(
            JSON.stringify({
               type: "opponent_disconnected"
            })
         );
      } else {
         delete games[msg.room];
      }
   }
}
