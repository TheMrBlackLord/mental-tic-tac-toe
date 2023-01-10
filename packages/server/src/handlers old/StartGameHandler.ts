import { IGames } from "../interfaces";
import { WebSocket } from "ws";

export function startGameHandler(games: IGames, room: string, WSMap: Map<string, WebSocket>) {
   const players = games[room].players;
   if (players.length === 2 && players.every(player => player.confirmed)) {
      const ws1 = WSMap.get(players[0].username) as WebSocket;
      const ws2 = WSMap.get(players[1].username) as WebSocket;
      ws1.send(JSON.stringify({ type: 'game_started' }));
      ws2.send(JSON.stringify({ type: 'game_started' }));
      const firstTurn = players[0].char === 'x' ? ws1 : ws2;
      firstTurn.send(JSON.stringify({ type: 'your_turn' }));
      const opponent = players[0].char === 'o' ? ws1 : ws2;
      opponent.send(JSON.stringify({ type: 'opponent_turn' }));
   }
}
