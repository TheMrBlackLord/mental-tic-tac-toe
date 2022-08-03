import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import ChangeUsernameModal from "./components/UsernameModal";
import TicTacToeComponent from "./components/TicTacToeComponent";
import { useAppSelector, useAppDispatch } from "./hooks";
import styles from "./styles/App.module.css";
import { useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { IMessage, IConnectedMessage } from "./interfaces";
import { setPlayersMe, setPlayersOpponent, setTurning } from "./store/GameSlice";

function App() {
   const dispatch = useAppDispatch();
   const { username, players, turning } = useAppSelector((state) => state);
   const params = useParams();
   const [showModal, setShowModal] = useState<boolean>(!Boolean(username));
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
   }
   const turnHandler = (x: number, y: number) => { 
      if (players.me) { 
         sendJsonMessage({
            type: "turn",
            room: params.id,
            char: players.me.char,
            x,
            y,
         });
      }
   }

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
               dispatch(setPlayersMe((message as IConnectedMessage).player));
               break;
            case "opponent_connected":
            case "get_opponent":
               dispatch(
                  setPlayersOpponent((message as IConnectedMessage).player)
               );
               break;
            case "opponent_disconnected":
               dispatch(setPlayersOpponent(null));
               break;
            case "confirmed":
               if (players.me) {
                  dispatch(setPlayersMe({ ...players.me, confirmed: true }));
               }
               break;
            case "opponent_confirmed":
               if (players.opponent) {
                  dispatch(
                     setPlayersOpponent({
                        ...players.opponent,
                        confirmed: true,
                     })
                  );
               }
               break;
            case "game_started":
               setIsGameStarted(true);
               break;
            case "your_turn":
               if (players.me) {
                  dispatch(setTurning("me"));
               }
               break;
            case "opponent_turn":
               if (players.opponent) {
                  dispatch(setTurning("opponent"));
               }
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
                              <>
                                 {turning === "me" && (
                                    <span className={styles.turn}>TURN</span>
                                 )}
                                 <span
                                    className={
                                       players.me.char === "x"
                                          ? styles.charX
                                          : styles.charO
                                    }
                                 ></span>
                              </>
                           )}
                           <Button
                              variant={
                                 players.me?.confirmed ? "success" : "danger"
                              }
                              disabled={
                                 !players.opponent || players.me?.confirmed
                              }
                              onClick={confirmHandler}
                           >
                              {players.me?.confirmed ? "Confirmed" : "Confirm"}
                           </Button>
                        </>
                     )}
                  </Col>
                  <Col sm={6} className={styles.column}>
                     <TicTacToeComponent turnHandler={turnHandler} />
                  </Col>
                  <Col sm={3} className={styles.column}>
                     {players.opponent ? (
                        <>
                           <span>{players.opponent.username}</span>
                           {isGameStarted && (
                              <>
                                 {turning === "opponent" && (
                                    <span className={styles.turn}>TURN</span>
                                 )}
                                 <span
                                    className={
                                       players.opponent.char === "x"
                                          ? styles.charX
                                          : styles.charO
                                    }
                                 ></span>
                              </>
                           )}
                           <span
                              className={
                                 players.opponent?.confirmed
                                    ? styles.confirmed
                                    : styles.unconfirmed
                              }
                           >
                              {players.opponent?.confirmed
                                 ? "Confirmed"
                                 : "Unconfirmed"}
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
