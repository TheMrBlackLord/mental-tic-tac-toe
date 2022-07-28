import React, { useState } from 'react';
import { Container, Navbar, Row, Button } from 'react-bootstrap';
import { useAppSelector } from '../hooks';
import styles from '../styles/Header.module.css';
import ChangeUsernameModal from './ChangeUsernameModal';

const Header = () => {
   const username = useAppSelector((state) => state.username);
   const [isEditing, setIsEditing] = useState<boolean>(false);

   const handleEdit = () => setIsEditing(true);

   return (
      <>
         <Navbar bg="light">
            <Container>
               <Row className="w-100">
                  <div className={styles.username}>
                     <span>{username}</span>
                     &nbsp;
                     <Button variant="outline-info" size="sm" onClick={handleEdit} className={styles.editBtn}>
                        Edit
                     </Button>
                  </div>
               </Row>
            </Container>
         </Navbar>
         <ChangeUsernameModal showModal={isEditing} setShowModal={setIsEditing} canCancel />
      </>
   );
};

export default Header;
