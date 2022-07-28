import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ChangeUsernameModal from "./components/ChangeUsernameModal";
import TicTacToeComponent from "./components/TicTacToeComponent";
import Header from "./components/Header";
import { useAppSelector } from "./hooks";
import styles from "./styles/App.module.css";

function App() {
   const { username, socket } = useAppSelector((state) => state);
   const [showModal, setShowModal] = useState<boolean>(!Boolean(username));

   return (
      <>
         <Header />
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
            canCancel={false}
         />
      </>
   );
}

export default App;
