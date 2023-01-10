enum ToServer {
   CONNECT = 'connect',
   DISCONNECT = 'disconnect',
   CONFIRM = 'confirm',
   TURN = 'turn',
};
enum FromServer {
   CONNECTED = 'connected',
   OPPONENT_CONNECTED = 'opponent_connected',
   GET_OPPONENT = 'get_opponent',
   OPPONENT_DISCONNECTED = 'opponent_disconnected',
   CONFIRMED = 'confirmed',
   UNCONFIRMED = 'unconfirmed',
   GAME_STARTED = 'game_started',
   YOUR_TURN = 'your_turn',
   OPPONENT_TURN = 'opponent_turn',
   VICTORY = 'victory',
   DEFEAT = 'defeat',
   ERROR = 'error'
};
export const MessageTypes = { ...FromServer, ...ToServer };
export type MessageType = FromServer | ToServer
