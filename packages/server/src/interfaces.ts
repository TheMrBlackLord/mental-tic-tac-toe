import { Chars } from "./types";

export interface IMessage {
   type: "connect" | "disconnect" | "confirm" | "turn";
}
export interface IConnectMessage extends IMessage { 
   type: 'connect';
   username: string;
   room: string;
}
export interface IDisconnectMessage extends IConnectMessage { }
export interface IConfirmMessage extends IMessage {
   type: 'confirm';
   room: string;
   confirmFrom: string;
}
export interface ITurnMessage extends IMessage {
   type: 'turn';
   room: string;
   char: Chars;
   x: number;
   y: number;
}
export interface IGames {
   [id: string]: {
      players: IPlayer[];
      fieldState: string[][];
   };
}
export interface IPlayer { 
   char: Chars;
   username: string;
   confirmed: boolean;
}
