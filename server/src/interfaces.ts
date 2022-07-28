export interface IMessage { 
   type: 'connect' | 'disconnect' | 'message';
}
export interface IGame {
   [id: number]: {
      players: [IPlayer?, IPlayer?];
      fieldState: string[][];
   };
}
export interface IPlayer { 
   char: 'x' | 'o';
   username: string;
}
