import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Players, Player, UsernamePayload, Turning } from "../types";

export interface GameState {
   username: string;
   players: Players;
   turning: Turning;
}

const initialState: GameState = {
   username: localStorage.getItem("username") || "",
   players: {
      me: null,
      opponent: null,
   },
   turning: null
};

export const gameSlice = createSlice({
   name: "game",
   initialState,
   reducers: {
      setUsername: (state, action: PayloadAction<UsernamePayload>) => {
         state.username = action.payload.username;
         if (action.payload.remember) {
            localStorage.setItem("username", action.payload.username);
         }
      },
      setPlayersMe(state, action: PayloadAction<Player | null>) {
         state.players.me = action.payload;
      },
      setPlayersOpponent(state, action: PayloadAction<Player | null>) {
         state.players.opponent = action.payload;
      },
      setTurning(state, action: PayloadAction<Turning>) { 
         state.turning = action.payload;
      }
   },
});

export const { setUsername, setPlayersMe, setPlayersOpponent, setTurning } =
   gameSlice.actions; 

export default gameSlice.reducer;
