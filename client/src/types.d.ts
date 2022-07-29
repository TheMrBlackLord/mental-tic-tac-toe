export type UsernamePayload = {
   username: string;
   remember: boolean;
}
export type Player = {
   username: string;
   char: 'x' | 'o';
   confirmed: boolean;
}
