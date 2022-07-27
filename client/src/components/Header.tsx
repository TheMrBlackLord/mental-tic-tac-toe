import React from 'react';
import { Container, Navbar, Row } from 'react-bootstrap';
import styles from '../styles/Header.module.css';

const Header = () => {
   return (
      <Navbar bg="light">
         <Container>
            <Row className="w-100">
               <div className={styles.username}>sdf</div>
            </Row>
         </Container>
      </Navbar>
   );
};

export default Header;
