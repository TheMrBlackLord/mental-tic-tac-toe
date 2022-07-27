import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TicTacToeComponent from "./components/TicTacToeComponent";
import styles from "./styles/App.module.css";

function App() {
   return (
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
   );
}

export default App;
