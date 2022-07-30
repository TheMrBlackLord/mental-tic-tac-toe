import { IConfirmMessage, IGames, IPlayer } from "../interfaces";
import { WebSocket } from "ws";

export function confirmHandler(
   games: IGames,
   ws: WebSocket,
   msg: IConfirmMessage,
   WSMap: Map<string, WebSocket>
) {
   const game = games[msg.room];
   const player = game.players.find(p => p.username === msg.confirmFrom);
   if (player) {
      player.confirmed = true;
      ws.send(JSON.stringify({
         type: "confirmed"
      }));
      const opponent = game.players.find(p => p.username !== msg.confirmFrom);
      if (opponent) {
         const opponentWS = WSMap.get(opponent.username) as WebSocket;
         opponentWS.send(JSON.stringify({
            type: "opponent_confirmed"
         }));
      }
   }
}
