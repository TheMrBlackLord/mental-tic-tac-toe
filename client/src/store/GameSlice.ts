import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsernamePayload } from '../types';

export interface GameState {
   username: string;
}

const initialState: GameState = {
   username: localStorage.getItem('username') || ''
};

export const gameSlice = createSlice({
   name: 'game',
   initialState,
   reducers: {
      setUsername: (state, action: PayloadAction<UsernamePayload>) => { 
         state.username = action.payload.username;
         if (action.payload.remember) { 
            localStorage.setItem('username', action.payload.username);
         }
      }
   }
});

export const { setUsername } = gameSlice.actions; 

export default gameSlice.reducer;
