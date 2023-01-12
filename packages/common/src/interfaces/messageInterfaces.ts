import { MessageType } from '../messageTypes';
import { IPlayer } from './interfaces';

export interface IMessage {
   type: MessageType;
}

export interface IMessageToClient extends IMessage {
   [key: string]: string | number | IPlayer; 
}

export interface IConnectMessage extends IMessage {
   username: string;
   roomID: string;
}

export interface IDisconnectMessage extends IConnectMessage {}
