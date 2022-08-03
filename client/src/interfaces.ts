import { Player } from "./types";

export interface IMessage {
   type:
      | "connected"
      | "confirmed"
      | "opponent_connected"
      | "get_opponent"
      | "opponent_disconnected"
      | "opponent_confirmed"
      | "game_started"
      | "your_turn"
      | "opponent_turn";
}
export interface IConnectedMessage extends IMessage { 
   type: 'connected';
   player: Player;
}
