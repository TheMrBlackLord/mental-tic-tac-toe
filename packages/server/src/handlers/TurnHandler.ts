import { IGames, ITurnMessage } from "../interfaces";
import { WebSocket } from "ws";

export function turnHandler(
   games: IGames,
   msg: ITurnMessage,
   WSMap: Map<string, WebSocket>
) {
   const {players, fieldState: field} = games[msg.room];
   if (players.length === 2) {
      const ws1 = WSMap.get(players[0].username) as WebSocket;
      const ws2 = WSMap.get(players[1].username) as WebSocket;
      if (field[msg.x][msg.y] === "") {  
         const turnedPlayer = players[0].char === msg.char ? ws1 : ws2;
         turnedPlayer.send(JSON.stringify({ type: "opponent_turn" }));
         const opponentTurning = players[0].char !== msg.char ? ws1 : ws2;
         opponentTurning.send(JSON.stringify({ type: "your_turn" }));
      } else {
         const winner = players[0].char === msg.char ? ws2 : ws1;
         winner.send(JSON.stringify({ type: "victory" }));
         const loser = players[0].char === msg.char ? ws1 : ws2;
         loser.send(JSON.stringify({ type: "defeat" }));
      }

      field[msg.x][msg.y] = msg.char;
   }
}
