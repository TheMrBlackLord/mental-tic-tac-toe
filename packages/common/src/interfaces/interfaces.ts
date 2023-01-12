import { Char, CharField } from '../types';

export interface IPlayer {
   username: string,
   char: Char,
   confirmed: boolean
}

export interface IRoom {
   players: IPlayer[],
   wsIDs: number[],
   gameStarted: boolean, // TODO:
   currentChar: Char | null,
   field: CharField
}
