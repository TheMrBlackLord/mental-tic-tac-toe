import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ChangeUsernameModal from "./components/ChangeUsernameModal";
import TicTacToeComponent from "./components/TicTacToeComponent";
import Header from "./components/Header";
import { useAppSelector } from "./hooks";
import styles from "./styles/App.module.css";

function App() {
   const username = useAppSelector((state) => state.username);
   const [showModal, setShowModal] = useState<boolean>(!Boolean(username));
   
   return (
      <>
         <Header />
         <Container fluid>
            <Row>
               <Col sm={3}>Player 1</Col>
               <Col sm={6}>
                  <main className={styles.main}>
                     <TicTacToeComponent />
                  </main>
               </Col>
               <Col sm={3}> Player 2</Col>
            </Row>
         </Container>
         <ChangeUsernameModal
            showModal={showModal}
            setShowModal={setShowModal}
            canCancel={false}
         />
      </>
   );
}

export default App;
