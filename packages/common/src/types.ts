import { IConnectMessage, IDisconnectMessage } from "./interfaces/messageInterfaces";

export type Char = 'x' | 'o';

export type CharField = [
   [Char | '', Char | '', Char | ''],
   [Char | '', Char | '', Char | ''],
   [Char | '', Char | '', Char | '']
];

export type Message = IConnectMessage | IDisconnectMessage
