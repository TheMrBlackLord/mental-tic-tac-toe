import { IGames, IPlayer } from "../interfaces";
import { WebSocket } from "ws";

export function victoryHandler(games: IGames, room: string, WSMap: Map<string, WebSocket>) {
   const { players, fieldState: field } = games[room];
   let isVictory: boolean = false;
   let winChar: string = "";

   // check rows
   for (let i = 0; i < field.length; i++) {
      const row = field[i];
      if (row.every(cell => cell === row[0] && cell !== "")) {
         isVictory = true;
         winChar = row[0];
         break;
      }
   }

   // check columns
   if (!isVictory) { 
      for (let i = 0; i < field.length; i++) {
         const column = field.map(row => row[i]);
         if (column.every(cell => cell === column[0] && cell !== "")) {
            isVictory = true;
            winChar = column[0];
            break;
         }
      }
   }

   // check diagonal 1
   if (!isVictory) { 
      const diagonal1 = field.map((row, i) => row[i]);
      if (diagonal1.every(cell => cell === diagonal1[0] && cell !== "")) {
         isVictory = true;
         winChar = diagonal1[0];
      }
   }

   // check diagonal 2
   if (!isVictory) {
      const diagonal2 = field.map((row, i) => row[field.length - i - 1]);
      if (diagonal2.every(cell => cell === diagonal2[0] && cell !== "")) {
         isVictory = true;
         winChar = diagonal2[0];
      }
   }

   if (isVictory) { 
      const winner = players.find(player => player.char === winChar) as IPlayer;
      const loser = players.find(player => player.char !== winChar) as IPlayer;
      const winnerWs = WSMap.get(winner.username) as WebSocket;
      const loserWs = WSMap.get(loser.username) as WebSocket;
      winnerWs.send(JSON.stringify({ type: "victory" }));
      loserWs.send(JSON.stringify({ type: "defeat" }));
   }
}
