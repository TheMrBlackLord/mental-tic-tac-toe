import { WebSocket } from 'ws';

export function findSocketById(sockets: WebSocket[], id: number) {
   let mid: number;
   let low: number = 0;
   let high: number = sockets.length - 1;

   while (sockets[low].id < id && sockets[high].id > id) {
      mid =
         low +
         Math.floor(
            ((id - sockets[low].id) * (high - low)) /
               (sockets[high].id - sockets[low].id)
         );
      if (sockets[mid].id < id) low = mid + 1;
      else if (sockets[mid].id > id) high = mid - 1;
      else return sockets[mid];
   }

   if (sockets[low].id === id) return sockets[low];
   else if (sockets[high].id === id) return sockets[high];
   else return null;
}
