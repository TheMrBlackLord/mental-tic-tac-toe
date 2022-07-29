import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ChangeUsernameModal from "./components/UsernameModal";
import TicTacToeComponent from "./components/TicTacToeComponent";
import { useAppSelector } from "./hooks";
import styles from "./styles/App.module.css";
import { useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Player } from "./types";

function App() {
   const username = useAppSelector((state) => state.username);
   const params = useParams();
   const [showModal, setShowModal] = useState<boolean>(!Boolean(username));
   const [opponent, setOpponent] = useState<Player | null>(null);
   const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(process.env.REACT_APP_SOCKET_URL as string);

   useEffect(() => {
      if (readyState === ReadyState.OPEN && username) {
         const data = {
            type: "connect",
            username,
            room: params.id,
         };
         sendJsonMessage(data);
      }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [readyState, username]);

   useEffect(() => {
      console.log(lastJsonMessage);
   }, [lastJsonMessage]);

   return (
      <>
         <main className={styles.main}>
            <Container fluid>
               <Row>
                  <Col sm={3} className={styles.column}>
                     You ({username})
                  </Col>
                  <Col sm={6} className={styles.column}>
                     <TicTacToeComponent />
                  </Col>
                  <Col sm={3} className={styles.column}>
                     Player 2
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
