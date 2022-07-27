import dotenv from 'dotenv';
import express from 'express';
import expressWs from 'express-ws';

dotenv.config();

const PORT = process.env.PORT || 5000;
const { app } = expressWs(express());

app.ws('/', (ws, req) => {
   ws.on('open', () => {
      ws.send('Hello World!');
   })
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
