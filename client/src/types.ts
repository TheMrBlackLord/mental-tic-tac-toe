export type UsernamePayload = {
   username: string;
   remember: boolean;
}
export type Player = {
   username: string;
   char: 'x' | 'o';
   confirmed: boolean;
}
export type Players = {
   me: Player | null;
   opponent: Player | null;
}
export type Turning = 'me' | 'opponent' | null;
