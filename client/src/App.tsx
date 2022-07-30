import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import ChangeUsernameModal from "./components/UsernameModal";
import TicTacToeComponent from "./components/TicTacToeComponent";
import { useAppSelector } from "./hooks";
import styles from "./styles/App.module.css";
import { useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Players } from "./types";
import { IMessage, IConnectedMessage } from "./interfaces";

function App() {
   const username = useAppSelector((state) => state.username);
   const params = useParams();
   const [showModal, setShowModal] = useState<boolean>(!Boolean(username));
   const [players, setPlayers] = useState<Players>({
      me: null,
      opponent: null,
   });
   const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
   const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
      process.env.REACT_APP_SOCKET_URL as string
   );

   const confirmHandler = () => { 
      sendJsonMessage({
         type: "confirm",
         room: params.id,
         confirmFrom: username
      });
   }

   const disconnectHandler = () => {
      const data = {
         type: "disconnect",
         username,
         room: params.id,
      };
      sendJsonMessage(data);
   };

   useEffect(() => {
      if (readyState === ReadyState.OPEN && username) {
         const data = {
            type: "connect",
            username,
            room: params.id,
         };
         sendJsonMessage(data);
         return disconnectHandler;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [readyState, username]);

   useEffect(() => {
      if (lastJsonMessage) {
         const message = lastJsonMessage as unknown as IMessage;
         switch (message.type) {
            case "connected":
               setPlayers({
                  ...players,
                  me: (message as IConnectedMessage).player,
               });
               break;
            case "opponent_connected":
            case "get_opponent":
               setPlayers({
                  ...players,
                  opponent: (message as IConnectedMessage).player,
               });
               break;
            case "opponent_disconnected":
               setPlayers({...players, opponent: null});
               break;
            case "confirmed":
               if (players.me) {
                  setPlayers({
                     ...players,
                     me: { ...players.me, confirmed: true },
                  });
               }
               break;
            case "opponent_confirmed":
               if (players.opponent) {
                  setPlayers({
                     ...players,
                     opponent: { ...players.opponent, confirmed: true },
                  });
               }
               break;
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [lastJsonMessage]);

   window.onbeforeunload = disconnectHandler;

   return (
      <>
         <main className={styles.main}>
            <Container fluid>
               <Row>
                  <Col sm={3} className={styles.column}>
                     <span>You ({username})</span>
                     {players.me && (
                        <>
                           {isGameStarted && (
                              <span
                                 className={
                                    players.me.char === "x"
                                       ? styles.charX
                                       : styles.charO
                                 }
                              >
                                 {players.me.char}
                              </span>
                           )}
                           <Button
                              variant={players.me?.confirmed ? "success" : "danger"}
                              disabled={!players.opponent || players.me?.confirmed}
                              onClick={confirmHandler}
                           >
                              {players.me?.confirmed ? "Confirmed" : "Confirm"}
                           </Button>
                        </>
                     )}
                  </Col>
                  <Col sm={6} className={styles.column}>
                     <TicTacToeComponent />
                  </Col>
                  <Col sm={3} className={styles.column}>
                     {players.opponent ? (
                        <>
                           <span>{players.opponent.username}</span>
                           {isGameStarted && (
                              <span
                                 className={
                                    players.opponent.char === "x"
                                       ? styles.charX
                                       : styles.charO
                                 }
                              >
                                 {players.opponent.char}
                              </span>
                           )}
                           <span
                              className={
                                 players.opponent?.confirmed
                                    ? styles.confirmed
                                    : styles.unconfirmed
                              }
                           >
                              {players.opponent?.confirmed ? "Confirmed" : "Unconfirmed"}
                           </span>
                        </>
                     ) : (
                        <>
                           <Spinner animation="border" variant="primary" />
                        </>
                     )}
                  </Col>
               </Row>
            </Container>
         </main>
         <ChangeUsernameModal
            showModal={showModal}
            setShowModal={setShowModal}
         />
      </>
   );
}

export default App;
