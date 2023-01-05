import React, {
   FC,
   Dispatch,
   SetStateAction,
   ChangeEvent,
   useState,
   MouseEvent,
} from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setUsername } from "../store/GameSlice";
import { UsernamePayload } from "../types";

interface ChangeUsernameModalProps {
   showModal: boolean;
   setShowModal: Dispatch<SetStateAction<boolean>>;
}

const ChangeUsernameModal: FC<ChangeUsernameModalProps> = ({
   showModal,
   setShowModal,
}) => {
   const dispatch = useAppDispatch();
   const username = useAppSelector((state) => state.username);
   const [formData, setFormData] = useState<UsernamePayload>({
      username,
      remember: false,
   });

   const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, username: e.target.value });
   };
   const handleRememberChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, remember: e.target.checked });
   };
   const handleSaveUsername = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setShowModal(false);
      dispatch(setUsername(formData));
   };

   return (
      <Modal show={showModal}>
         <Modal.Header>
            <Modal.Title>Enter username</Modal.Title>
         </Modal.Header>
         <Form>
            <Modal.Body>
               <Form.Group>
                  <Form.Control
                     type="text"
                     placeholder="Username"
                     value={formData.username}
                     onChange={handleUsernameChange}
                  />
               </Form.Group>
               <Form.Group className="mt-3">
                  <Form.Check
                     type="checkbox"
                     label="Remember me"
                     checked={formData.remember}
                     onChange={handleRememberChange}
                  />
               </Form.Group>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  variant="success"
                  type="submit"
                  onClick={handleSaveUsername}
                  disabled={!formData.username}
               >
                  Save
               </Button>
            </Modal.Footer>
         </Form>
      </Modal>
   );
};

export default ChangeUsernameModal;
