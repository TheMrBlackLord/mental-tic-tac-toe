import React, {
   FC,
   Dispatch,
   SetStateAction,
   ChangeEvent,
   useState,
   MouseEvent
} from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setUsername } from "../store/GameSlice";

interface ChangeUsernameModalProps {
   showModal: boolean;
   setShowModal: Dispatch<SetStateAction<boolean>>;
   canCancel: boolean;
}

const ChangeUsernameModal: FC<ChangeUsernameModalProps> = ({
   showModal,
   setShowModal,
   canCancel
}) => {
   const dispatch = useAppDispatch();
   const handleCancel = () => setShowModal(false);
   const username = useAppSelector((state) => state.username);
   const [usernameInput, setUsernameInput] = useState<string>(username);

   const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
      setUsernameInput(e.target.value);
   };
   const handleSaveUsername = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setShowModal(false);
      dispatch(setUsername(usernameInput));
   };

   return (
      <Modal show={showModal} onHide={handleCancel}>
         <Modal.Header closeButton={canCancel}>
            <Modal.Title>Enter username</Modal.Title>
         </Modal.Header>
         <Form>
            <Modal.Body>
               <Form.Group>
                  <Form.Control
                     type="text"
                     placeholder="Username"
                     value={usernameInput}
                     onChange={handleUsernameChange}
                  />
               </Form.Group>
            </Modal.Body>
            <Modal.Footer>
               {canCancel && (
                  <Button
                     variant="primary"
                     type="button"
                     onClick={handleCancel}
                  >
                     Cancel
                  </Button>
               )}
               <Button
                  variant="success"
                  type="submit"
                  onClick={handleSaveUsername}
                  disabled={!usernameInput}
               >
                  Save
               </Button>
            </Modal.Footer>
         </Form>
      </Modal>
   );
};

export default ChangeUsernameModal;
