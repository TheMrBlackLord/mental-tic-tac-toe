import { RedisClientType } from "@redis/client";
import { connectHandler } from "./connectHandler";

export function handlerFactory(client: RedisClientType) {
   return {
      connectHandler: connectHandler(client),
   }
}
