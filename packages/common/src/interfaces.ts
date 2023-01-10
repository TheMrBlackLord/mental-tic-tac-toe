import { MessageType } from './messageTypes';
import { Char, CharField } from './types';

interface IMessage {
   type: MessageType
}

export interface IConnectMessage extends IMessage {
   username: string,
   roomID: string
}

export interface IDisconnectMessage extends IConnectMessage { }

export interface IPlayer {
   username: string,
   char: Char,
   confirmed: boolean
}

export interface IRoom {
   players: [IPlayer?, IPlayer?],
   wsIDs: [string?, string?],
   gameStarted: boolean, // TODO:
   currentChar: Char | null,
   field: CharField
}
