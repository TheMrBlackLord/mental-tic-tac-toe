import { RedisClientType } from "@redis/client";
import { SenderType } from "../messageSender";
import { connectHandler } from "./connectHandler";

export function handlerFactory(client: RedisClientType, messageSender: SenderType) {
   return {
      connectHandler: connectHandler(client, messageSender),
   }
}
