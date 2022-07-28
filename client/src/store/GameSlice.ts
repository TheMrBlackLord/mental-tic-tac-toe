import { createSlice } from '@reduxjs/toolkit';

export interface GameState {
   username: string;
   socket: WebSocket;
}

const initialState: GameState = {
   username: localStorage.getItem('username') || '',
   socket: new WebSocket(process.env.REACT_APP_SOCKET_URL as string),
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
