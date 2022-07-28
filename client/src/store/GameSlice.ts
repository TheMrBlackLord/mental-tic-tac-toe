import { createSlice } from '@reduxjs/toolkit';

export interface GameState {
   username: string;
}

const initialState: GameState = {
   username: localStorage.getItem('username') || '',
};

export const gameSlice = createSlice({
   name: 'game',
   initialState,
   reducers: {
      setUsername: (state, action) => { 
         state.username = action.payload;
         localStorage.setItem('username', action.payload);
      }
   }
});

export const { setUsername } = gameSlice.actions; 

export default gameSlice.reducer;
