import { Chars } from "./types";

export interface IMessage { 
   type: 'connect' | 'disconnect' | 'message';
}
export interface IConnectMessage extends IMessage { 
   type: 'connect';
   username: string;
   room: number;
}
export interface IDisconnectMessage extends IConnectMessage { };
export interface IGames {
   [id: number]: {
      players: IPlayer[];
      fieldState: string[][];
   };
}
export interface IPlayer { 
   char: Chars;
   username: string;
   confirmed: boolean;
}
