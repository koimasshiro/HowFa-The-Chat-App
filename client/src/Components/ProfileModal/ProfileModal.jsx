import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    IconButton,
    Text,
    Image,
  } from "@chakra-ui/react";
  import { FaRegUser } from "react-icons/fa6";
  import { FaEnvelope } from "react-icons/fa";
  import "./ProfileModal.css";
  
  const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
        {children ? (
          <span onClick={onOpen}>{children}</span>
        ) : (
          <FaRegUser onClick={onOpen} />
        )}
        <Modal size="xl" onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent h="300px">
            <ModalBody padding="0px">
              {/* <ModalCloseButton /> */}
              <figure className="snip1336">
                <p style={{ backgroundColor: "whitesmoke" }}></p>
                <figcaption>
                  <img src={user.image} alt={user.name} className="profile" />
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                </figcaption>
              </figure>
              <Button onClick={onClose} className="close">
                Close
              </Button>
            </ModalBody>
            <ModalFooter>
    
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ProfileModal;
  
  