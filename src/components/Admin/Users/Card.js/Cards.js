import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import AppService from "../../../../Service/ApiService";
import "./cards.css"

const Cards = ({ users, handleDelete }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <div className="score-card-container">

           <div className="scoreboard-list">
            <div className="user-list-name">
                {users.name}
            </div>
            <div className="user-list-btn">
                <Button colorScheme="teal" onClick={onOpen}>View</Button>
            </div>
            <div className="user-list-btn">
                <Button color="red" onClick={() => handleDelete(users._id)}>Delete</Button>
            </div>
           </div>

           <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>User Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text><b>Name:</b> {users.name}</Text>
                        <Text><b>Email:</b> {users.email}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>

        </div>
    )
}


export default Cards;